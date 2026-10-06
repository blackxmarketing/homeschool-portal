import { describe, expect, it } from "vitest";
import { buildSteps, chunkLines, compress, lineShow, type TutorInput } from "@/lib/tutorFlow";
import { inFlow, isFastGuess, nextMove, priorRiskFor, struggleScore, type Signals } from "@/lib/struggle";
import { COURSES } from "@/content/courses";
import { publicThink, publicWidget } from "@/lib/teaching";
import { publicProbe } from "@/lib/probes";
import type { PublicSegment } from "@/components/TeachPlayer";

const teach = "First idea here. Second idea here. Third idea here. Fourth idea here. Fifth idea here.";

describe("tutor lines", () => {
  it("speaks in short lines: one sentence in support mode, two normally, three in challenge", () => {
    expect(chunkLines(teach, "support")).toHaveLength(5);
    expect(chunkLines(teach, "standard").map((l) => l.text)).toEqual(["First idea here. Second idea here.", "Third idea here. Fourth idea here.", "Fifth idea here."]);
    expect(chunkLines(teach, "challenge")).toHaveLength(2);
  });

  it("every line keeps its place in the text", () => {
    for (const l of chunkLines(teach)) expect(teach.slice(l.start, l.end).trim()).toBe(l.text);
  });

  it("shows the slide that's up when the line starts, plus slides cued inside it", () => {
    const show = { beats: [{ caption: "a", big: "A" }, { at: "Third idea", caption: "b", big: "B" }, { at: "Fifth", caption: "c", big: "C" }] };
    const lines = chunkLines(teach);
    expect(lineShow(teach, show, lines[0].start, lines[0].end)?.beats.map((b) => b.caption)).toEqual(["a"]);
    expect(lineShow(teach, show, lines[1].start, lines[1].end)?.beats.map((b) => b.caption)).toEqual(["b"]);
    expect(lineShow(teach, undefined, 0, 10)).toBeUndefined();
  });
});

function inputFor(courseIndex = 1, lessonIndex = 0): TutorInput {
  const L = COURSES[courseIndex].lessons[lessonIndex];
  const segments: PublicSegment[] = L.teach!.map((s, i) => ({
    title: s.title,
    teach: s.teach,
    visual: s.visual ? publicWidget(s.visual, `t:${i}`) : undefined,
    think: publicThink(s.think),
    ...(s.probe ? { probe: publicProbe(s.probe, `t:p${i}`) } : {}),
  }));
  return {
    hook: L.hook ? { text: L.hook.text } : undefined,
    segments,
    activity: L.activity ? publicWidget(L.activity, "t:a") : undefined,
    explain: L.explain ? { prompt: L.explain.prompt } : undefined,
    initial: { segmentsDone: segments.map(() => false), activityDone: false, explainDone: false },
  };
}

describe("lessons become tutoring conversations", () => {
  for (const c of COURSES)
    it(`${c.id}: every lesson turns into short lines with something to do every few lines`, () => {
      for (const L of c.lessons) {
        if (!L.teach?.length) continue;
        const steps = buildSteps(inputFor(COURSES.indexOf(c), c.lessons.indexOf(L)));
        let run = 0;
        let longest = 0;
        for (const s of steps) {
          run = s.kind === "say" ? run + 1 : 0;
          longest = Math.max(longest, run);
        }
        expect(longest, `${L.id}: too many lines in a row`).toBeLessThanOrEqual(6);
        expect(steps.filter((s) => s.kind !== "say").length, L.id).toBeGreaterThanOrEqual(L.teach.length);
        // Every teaching part ends with a hands-on problem, and nothing is multiple choice.
        L.teach.forEach((_, i) => expect(steps.some((s) => s.kind === "probe" && s.seg === i), `${L.id} part ${i + 1}`).toBe(true));
        expect(steps.some((s) => s.kind === "think"), `${L.id}: multiple choice`).toBe(false);
      }
    });

  it("picks up where the kid left off", () => {
    const input = inputFor();
    input.initial.segmentsDone = input.segments.map((_, i) => i === 0);
    const steps = buildSteps(input);
    expect(steps.some((s) => s.key.startsWith("hook"))).toBe(false);
    expect(steps.some((s) => s.key.startsWith("s0:"))).toBe(false);
    expect(steps[0].key.startsWith("s1:")).toBe(true);
  });

  it("support mode adds worked examples and shorter lines; challenge mode uses longer lines", () => {
    const base = inputFor();
    const support = buildSteps({ ...base, adaptation: { mode: "support", message: "", offerTestOut: false }, segments: base.segments.map((s) => ({ ...s, example: "Worked example." })) });
    const challenge = buildSteps({ ...base, adaptation: { mode: "challenge", message: "", offerTestOut: true } });
    expect(support.some((s) => s.kind === "say" && s.label === "Watch me do one first")).toBe(true);
    expect(support.filter((s) => s.kind === "say").length).toBeGreaterThan(challenge.filter((s) => s.kind === "say").length);
  });

  it("the hands-on model comes halfway through each part", () => {
    const steps = buildSteps(inputFor());
    const part = steps.filter((s) => s.part === 1);
    const model = part.findIndex((s) => s.kind === "explore");
    expect(model).toBeGreaterThan(0);
    expect(part.slice(model + 1).some((s) => s.kind === "say")).toBe(true);
  });

  it("the fast lane skips extra models but never the real problems", () => {
    const steps = buildSteps(inputFor());
    const fast = compress(steps, 0);
    expect(fast.some((s) => s.kind === "explore" && s.seg !== null)).toBe(false);
    expect(fast.filter((s) => s.kind === "probe").length).toBe(steps.filter((s) => s.kind === "probe").length);
  });
});

const calm: Signals = { elapsedMs: 5000, expectedMs: 30_000, firstActionMs: 1500, idleMs: 1000, wrong: 0, fastWrong: 0, hints: 0, replays: 0, priorRisk: 0.2 };

describe("predicting struggle", () => {
  it("stays quiet while a kid is working normally", () => {
    expect(struggleScore(calm)).toBeLessThan(0.2);
    expect(nextMove(calm, new Set())).toBeNull();
  });

  it("offers a hint when a kid goes quiet well past the expected time, before any wrong answer", () => {
    const stuck = { ...calm, elapsedMs: 42_000, firstActionMs: null, idleMs: 42_000 };
    expect(nextMove(stuck, new Set())).toBe("nudge");
  });

  it("scaffolds when wrong answers pile up and time runs long", () => {
    const s = { ...calm, elapsedMs: 70_000, wrong: 3, idleMs: 20_000 };
    expect(nextMove(s, new Set(["nudge"]))).toBe("scaffold");
    expect(nextMove(s, new Set(["nudge", "scaffold"]))).toBeNull();
  });

  it("slows down fast guessers", () => {
    expect(nextMove({ ...calm, fastWrong: 2, wrong: 2 }, new Set())).toBe("slow-down");
    expect(isFastGuess(2000, 30_000)).toBe(true);
    expect(isFastGuess(15_000, 30_000)).toBe(false);
  });

  it("kids who've been slipping in a subject get help sooner", () => {
    const s = { ...calm, elapsedMs: 32_000, firstActionMs: null, idleMs: 30_000 };
    expect(struggleScore({ ...s, priorRisk: priorRiskFor("support") })).toBeGreaterThan(struggleScore({ ...s, priorRisk: priorRiskFor("challenge") }));
  });

  it("spots flow: three quick right answers in a row", () => {
    expect(inFlow([{ firstTry: true, ratio: 0.4 }, { firstTry: true, ratio: 0.5 }, { firstTry: true, ratio: 0.7 }])).toBe(true);
    expect(inFlow([{ firstTry: true, ratio: 0.4 }, { firstTry: false, ratio: 0.5 }, { firstTry: true, ratio: 0.7 }])).toBe(false);
    expect(inFlow([{ firstTry: true, ratio: 0.4 }, { firstTry: true, ratio: 0.5 }])).toBe(false);
  });
});
