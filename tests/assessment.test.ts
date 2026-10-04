import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import type { Probe } from "@/content/courses/types";
import { gradeProbe, leverPush, northernSeason, probeSolution, probeSolvable, publicProbe, yearsToReach } from "@/lib/probes";
import { adapt, buildProfile, conceptMastery, whatHelps, type LearningEvent } from "@/lib/learner";
import { sanitizeProbe } from "@/lib/courseContent";

describe("probe grading", () => {
  it("grades fill-in-the-blank with synonyms, case and spacing forgiven", () => {
    const p: Probe = { type: "cloze", text: "The {0} branch makes laws and the {1} enforces them.", blanks: [{ answers: ["legislative", "congress"] }, { answers: ["executive", "president"] }], mistakes: [{ match: "judicial", coach: "Courts interpret laws." }] };
    expect(gradeProbe(p, ["  Legislative ", "PRESIDENT"]).correct).toBe(true);
    const wrong = gradeProbe(p, ["judicial", "executive"]);
    expect(wrong).toMatchObject({ correct: false, score: 0.5, parts: [false, true], coach: "Courts interpret laws." });
  });

  it("doesn't let one word fill two blanks", () => {
    const p: Probe = { type: "cloze", text: "Energy became {0} and {1}.", blanks: [{ answers: ["heat", "sound"] }, { answers: ["heat", "sound"] }] };
    expect(gradeProbe(p, ["heat", "heat"]).correct).toBe(false);
    expect(gradeProbe(p, ["sound", "heat"]).correct).toBe(true);
  });

  it("grades numbers with tolerance and money formatting", () => {
    const p: Probe = { type: "number", prompt: "?", answer: 157.63, tolerance: 0.01, mistakes: [{ match: "150", coach: "That's simple interest." }] };
    expect(gradeProbe(p, "$157.63").correct).toBe(true);
    expect(gradeProbe(p, "157.6").correct).toBe(false);
    expect(gradeProbe(p, "150").coach).toBe("That's simple interest.");
  });

  it("grades placing, matching and building with partial credit", () => {
    const place: Probe = { type: "place", prompt: "", min: 1700, max: 1800, step: 1, tolerance: 1, items: [{ label: "Declaration", value: 1776 }, { label: "Constitution", value: 1787 }] };
    expect(gradeProbe(place, [1777, 1790]).parts).toEqual([true, false]);
    const match: Probe = { type: "match", prompt: "", pairs: [{ left: "a", right: "1" }, { left: "b", right: "2" }, { left: "c", right: "3" }] };
    expect(gradeProbe(match, [0, 1, 2]).correct).toBe(true);
    expect(gradeProbe(match, [1, 0, 2]).score).toBeCloseTo(1 / 3);
    const build: Probe = { type: "build", prompt: "", tiles: ["Revenue", "minus", "costs"], distractors: ["plus"] };
    expect(gradeProbe(build, [0, 1, 2]).correct).toBe(true);
    expect(gradeProbe(build, [0, 3, 2]).correct).toBe(false);
  });

  it("grades simulation goals with the same math as the visuals", () => {
    expect(leverPush(40, 50)).toBeCloseTo(40);
    expect(gradeProbe({ type: "target", prompt: "", goal: { sim: "lever", load: 40, maxPush: 10 } }, 23).correct).toBe(true);
    expect(gradeProbe({ type: "target", prompt: "", goal: { sim: "lever", load: 40, maxPush: 10 } }, 50).correct).toBe(false);
    expect(yearsToReach(1000, 10, 1500)).toBe(5);
    expect(gradeProbe({ type: "target", prompt: "", goal: { sim: "compound", principal: 1000, rate: 10, target: 1500 } }, 5).correct).toBe(true);
    expect(gradeProbe({ type: "target", prompt: "", goal: { sim: "profit", cost: 1, fixed: 10, units: 20, minProfit: 30 } }, 3).correct).toBe(true);
    expect(northernSeason(6)).toBe("summer");
    expect(northernSeason(0)).toBe("winter");
  });

  it("never shows answers in what the browser gets", () => {
    const p: Probe = { type: "cloze", text: "A {0}", blanks: [{ answers: ["secretword"] }], hint: "h", mistakes: [{ match: "x", coach: "y" }] };
    const json = JSON.stringify(publicProbe(p, "seed"));
    expect(json).not.toContain("secretword");
    expect(json).not.toContain("mistakes");
    const n: Probe = { type: "number", prompt: "How many?", answer: 4242 };
    expect(JSON.stringify(publicProbe(n, "s"))).not.toContain("4242");
  });
});

describe("course probes", () => {
  for (const course of COURSES) {
    for (const lesson of course.lessons) {
      it(`${lesson.id}: every interactive question is answerable and well formed`, () => {
        const all: [string, Probe][] = [
          ...(lesson.teach ?? []).map((s, i) => [`part ${i + 1}`, s.probe!] as [string, Probe]),
          ...(lesson.mastery ?? []).map((m, i) => [`mastery ${i + 1}`, m] as [string, Probe]),
        ];
        expect(lesson.teach?.every((s) => !!s.probe), "every part has a probe").toBe(true);
        expect(lesson.mastery?.length, "mastery set").toBeGreaterThanOrEqual(3);
        expect(new Set(lesson.mastery?.map((m) => m.type)).size, "mastery variety").toBeGreaterThanOrEqual(3);
        for (const [where, p] of all) {
          expect(probeSolvable(p), `${where} (${p.type}) is solvable`).toBe(true);
          expect(sanitizeProbe(p), `${where} survives editing`).toEqual(p);
          expect(p.hint?.length ?? 0, `${where} hint`).toBeGreaterThan(5);
          if (p.type === "cloze") {
            if (p.bank) for (const b of p.blanks) expect(p.bank.some((w) => b.answers.map((a) => a.toLowerCase()).includes(w.toLowerCase())), `${where} bank has an answer`).toBe(true);
          }
          if (p.type === "build") expect(new Set([...p.tiles, ...(p.distractors ?? [])]).size, `${where} unique tiles`).toBe(p.tiles.length + (p.distractors?.length ?? 0));
          if (p.type === "match") expect(new Set(p.pairs.map((x) => x.right)).size, `${where} unique matches`).toBe(p.pairs.length);
          if (p.type === "place") for (const it of p.items) expect(it.value >= p.min && it.value <= p.max, `${where} ${it.label} on the line`).toBe(true);
          // A wrong answer must not also count as right.
          if (p.type === "number") expect(gradeProbe(p, p.answer + (p.tolerance ?? 0) + 1000).correct).toBe(false);
          expect(probeSolution(p)).toBeDefined();
        }
      });
    }
  }
});

describe("learner model", () => {
  const ev = (i: number, firstTry: boolean, helped = false, ms = 20_000, concept = `c${i % 4}`): LearningEvent => ({
    concept,
    firstTry,
    score: firstTry ? 1 : helped ? 1 : 0,
    ms,
    expectedMs: 30_000,
    helped,
    at: i * 1000,
  });

  it("needs a few answers before judging", () => {
    expect(buildProfile([ev(1, true)]).status).toBe("new");
  });

  it("spots kids who are ahead", () => {
    const p = buildProfile(Array.from({ length: 24 }, (_, i) => ev(i, i % 10 !== 0, false, 15_000)));
    expect(p.status).toBe("ahead");
    expect(adapt(p, { best: null }).offerTestOut).toBe(true);
  });

  it("warns early when accuracy slides, before it fails", () => {
    const good = Array.from({ length: 20 }, (_, i) => ev(i, i % 7 !== 0));
    const slipping = Array.from({ length: 20 }, (_, i) => ev(20 + i, i % 3 !== 0, i % 3 === 0));
    const p = buildProfile([...good, ...slipping]);
    expect(p.status).toBe("watch");
    expect(p.accuracyTrend).toBeLessThan(-0.15);
    const a = adapt(p, { best: "analogy" });
    expect(a).toMatchObject({ mode: "support", reviewFirst: true, leadWith: "analogy" });
  });

  it("flags kids who are behind and adds worked examples first", () => {
    const p = buildProfile(Array.from({ length: 20 }, (_, i) => ev(i, i % 3 === 0, i % 3 !== 0, 60_000)));
    expect(p.status).toBe("behind");
    expect(adapt(p, { best: null })).toMatchObject({ mode: "support", exampleFirst: true, leadWith: "example" });
  });

  it("tracks mastery per concept and finds the weakest", () => {
    const m = conceptMastery([ev(1, true, false, 1, "easy"), ev(2, true, false, 1, "easy"), ev(3, false, false, 1, "hard"), ev(4, false, false, 1, "hard")]);
    expect(m.get("easy")!).toBeGreaterThan(0.6);
    expect(m.get("hard")!).toBeLessThan(0.2);
  });

  it("learns which help works for this kid", () => {
    expect(whatHelps([{ rungAtSuccess: 3 }, { rungAtSuccess: 3 }, { rungAtSuccess: 2 }]).best).toBe("example");
    expect(whatHelps([{ rungAtSuccess: 2 }]).best).toBeNull();
  });
});
