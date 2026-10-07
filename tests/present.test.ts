import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import type { Lesson, Method } from "@/content/courses/types";
import { sanitizeMethod, sanitizeScene, sanitizeTeaching } from "@/lib/courseContent";
import { probeSolvable } from "@/lib/probes";
import { buildSteps } from "@/lib/tutorFlow";
import { lessonObjectives, lessonPlan } from "@/lib/lessonPlan";
import { cuesFound } from "@/lib/storyboard";

/**
 * Rules for a part the teacher actually shows you how to do.
 *
 * The shape is: show how, say what the practice wants, let them try it. Short -
 * about a minute - because a kid who is lost should find out on step one, not
 * after seven minutes. And every part keeps a second way in reserve: if the
 * practice does not land, the kid is taught a different route rather than the
 * same explanation again.
 */

/** Below this a scene is a fragment, not a step. */
const WORDS_MIN = 12;
/** About 85 seconds. A way of teaching something should be shorter than this. */
const METHOD_WORDS_MAX = 200;

const words = (s: string) => s.trim().split(/\s+/).length;
const methodWords = (m: Method) => m.scenes.reduce((t, sc) => t + words(sc.say), 0) + words(m.expect);

const taught: { lesson: Lesson; course: string }[] = COURSES.flatMap((c) =>
  c.lessons.filter((l) => l.teach?.some((s) => s.methods?.length)).map((lesson) => ({ lesson, course: c.id })),
);

describe("taught lessons exist", () => {
  it("at least one lesson is taught this way, or this whole file is asleep", () => {
    expect(taught.length).toBeGreaterThan(0);
  });
});

describe.each(taught)("$course / $lesson.id", ({ lesson }) => {
  const parts = (lesson.teach ?? []).filter((s) => s.methods?.length);
  const methods = parts.flatMap((s) => s.methods ?? []);

  it("says what a kid will be able to do", () => {
    const objectives = lessonObjectives(lesson);
    expect(objectives.length).toBeGreaterThanOrEqual(2);
    for (const o of objectives) expect(o.length, o).toBeGreaterThan(15);
  });

  it("keeps every way of teaching it short", () => {
    for (const m of methods) {
      expect(methodWords(m), `"${m.name}" is ${methodWords(m)} words`).toBeLessThanOrEqual(METHOD_WORDS_MAX);
      for (const sc of m.scenes) expect(words(sc.say), `"${sc.heading}"`).toBeGreaterThanOrEqual(WORDS_MIN);
    }
  });

  it("tells the kid what the practice is going to ask before asking it", () => {
    for (const m of methods) expect(m.expect.length, m.name).toBeGreaterThan(20);
  });

  it("keeps a different way in reserve for a kid who does not get it", () => {
    for (const seg of parts) {
      expect(seg.methods!.length, `${seg.title} has an alternative`).toBeGreaterThanOrEqual(2);
      // Different names, so it reads as a different route and not a repeat.
      expect(new Set(seg.methods!.map((m) => m.name)).size, `${seg.title} method names`).toBe(seg.methods!.length);
    }
  });

  it("asks a different question on the retry, never the same one again", () => {
    for (const seg of parts) {
      const asked = seg.methods!.map((m) => JSON.stringify(m.probe));
      expect(new Set(asked).size, `${seg.title} asks something new each way`).toBe(asked.length);
    }
  });

  it("asks practice questions that can actually be answered", () => {
    for (const m of methods) {
      expect(probeSolvable(m.probe), `${m.name} practice`).toBe(true);
      for (const sc of m.scenes) if (sc.check) expect(probeSolvable(sc.check), `${m.name} check-in`).toBe(true);
    }
  });

  it("shows something on every step, and cues it to the words being said", () => {
    for (const m of methods) {
      for (const sc of m.scenes) {
        expect(sc.show?.length ?? 0, `${m.name} / "${sc.heading}" has a picture`).toBeGreaterThan(0);
        const { ok, missing } = cuesFound(sc.say, sc.show ?? []);
        expect(ok, `${m.name} / "${sc.heading}": cue not in the narration -> ${missing.join(" | ")}`).toBe(true);
      }
    }
  });

  it("never leaves a still picture up for long", () => {
    for (const m of methods) {
      for (const sc of m.scenes) {
        const still = (sc.show ?? []).filter((b) => !b.art).length;
        if (!still) continue;
        const animated = (sc.show ?? []).length - still;
        expect(words(sc.say) / (still + animated * 2), `${m.name} / "${sc.heading}"`).toBeLessThanOrEqual(60);
      }
    }
  });

  it("has the kid doing something inside the teaching, not only watching it", () => {
    // Something to touch or a quick check partway through, before the practice
    // at the end - so understanding is checked continuously rather than once.
    for (const m of methods) {
      const hands = m.scenes.filter((sc) => sc.visual || sc.check).length;
      expect(hands, `"${m.name}" is all talking`).toBeGreaterThanOrEqual(1);
    }
  });

  it("survives a parent saving the lesson editor", () => {
    const round = sanitizeTeaching({ objectives: lesson.objectives, teach: lesson.teach } as unknown as Record<string, unknown>);
    expect(round.teach?.filter((s) => s.methods?.length).length).toBe(parts.length);
    for (const m of methods) expect(sanitizeMethod(m)).toEqual(m);
  });

  it("plays as a lesson, with a brief and a recap", () => {
    const steps = buildSteps({
      segments: (lesson.teach ?? []).map((s) => ({
        title: s.title,
        teach: s.teach,
        methods: s.methods?.map((m) => ({ name: m.name, expect: m.expect, scenes: m.scenes.map((sc) => ({ heading: sc.heading, say: sc.say })), probe: { type: "number", prompt: "x" } })),
        think: { q: s.think.q, choices: s.think.choices },
      })) as never,
      initial: { segmentsDone: (lesson.teach ?? []).map(() => false), activityDone: false, explainDone: false },
      lessonTitle: lesson.title,
      objectives: lessonObjectives(lesson),
      keyIdeas: lesson.keyIdeas,
      plan: lessonPlan(lesson),
    } as never);
    expect(steps[0]?.kind).toBe("brief");
    expect(steps.some((s) => s.kind === "present")).toBe(true);
    expect(steps.at(-1)?.kind).toBe("recap");
  });
});

describe("a scene on its own", () => {
  const scene = { heading: "Move the digits", say: "Every digit shifts one column to the left, and the value gets ten times bigger." };

  it("keeps a good one exactly as written", () => {
    expect(sanitizeScene(scene)).toEqual(scene);
  });

  it("needs a heading and something to say", () => {
    expect(sanitizeScene({ heading: "", say: "words" })).toBeNull();
    expect(sanitizeScene({ heading: "Head", say: "  " })).toBeNull();
  });
});

describe("a method on its own", () => {
  const good: Method = {
    name: "Move the digits",
    expect: "You will be given a number and a power of ten, and asked for the answer.",
    scenes: [{ heading: "One column left", say: "Every digit shifts one column to the left, and the number gets ten times bigger." }],
    probe: { type: "number", prompt: "4.7 x 10 = ?", answer: 47, seconds: 20 },
  };

  it("keeps a good one exactly as written", () => {
    expect(sanitizeMethod(good)).toEqual(good);
  });

  it("is dropped if it cannot actually teach and practise", () => {
    expect(sanitizeMethod({ ...good, probe: undefined }), "no practice").toBeNull();
    expect(sanitizeMethod({ ...good, scenes: [] }), "nothing to show").toBeNull();
    expect(sanitizeMethod({ ...good, expect: "" }), "no expectation set").toBeNull();
    expect(sanitizeMethod({ ...good, name: "" }), "unnamed").toBeNull();
  });
});
