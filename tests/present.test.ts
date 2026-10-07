import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import type { Lesson, Scene } from "@/content/courses/types";
import { sanitizeScene } from "@/lib/courseContent";
import { probeSolvable } from "@/lib/probes";
import { buildSteps } from "@/lib/tutorFlow";
import { lessonObjectives, lessonPlan } from "@/lib/lessonPlan";
import { MIN_ANGLES, angleOf } from "@/lib/masteryMeter";
import { cuesFound } from "@/lib/storyboard";

/**
 * Rules for a lesson the teacher presents. A scene is about half a minute of
 * talking: short enough that a kid stays with it, long enough to actually
 * explain something.
 */
const WORDS_MIN = 40;
const WORDS_MAX = 140;

const words = (s: string) => s.trim().split(/\s+/).length;

const presented: { lesson: Lesson; course: string }[] = COURSES.flatMap((c) =>
  c.lessons.filter((l) => l.teach?.some((s) => s.present?.length)).map((lesson) => ({ lesson, course: c.id })),
);

describe("presented lessons exist", () => {
  it("at least one lesson is presented, or this whole file is asleep", () => {
    expect(presented.length).toBeGreaterThan(0);
  });
});

describe.each(presented)("$course / $lesson.id", ({ lesson }) => {
  const scenes: Scene[] = (lesson.teach ?? []).flatMap((s) => s.present ?? []);

  it("says its goals in the kid's own words", () => {
    const objectives = lessonObjectives(lesson);
    expect(objectives.length).toBeGreaterThanOrEqual(2);
    expect(objectives.length).toBeLessThanOrEqual(4);
    for (const o of objectives) {
      expect(o.length, o).toBeGreaterThan(15);
      expect(o.length, o).toBeLessThan(120);
    }
  });

  it("gives every scene enough to say, and not too much", () => {
    for (const sc of scenes) {
      expect(words(sc.say), `"${sc.heading}" is ${words(sc.say)} words`).toBeGreaterThanOrEqual(WORDS_MIN);
      expect(words(sc.say), `"${sc.heading}" is ${words(sc.say)} words`).toBeLessThanOrEqual(WORDS_MAX);
      expect(sc.heading.length, sc.heading).toBeGreaterThan(5);
    }
  });

  it("breaks each part into a sensible number of scenes", () => {
    for (const seg of lesson.teach ?? []) {
      if (!seg.present?.length) continue;
      expect(seg.present.length, seg.title).toBeGreaterThanOrEqual(2);
      expect(seg.present.length, seg.title).toBeLessThanOrEqual(5);
    }
  });

  it("adds up to a real lesson's worth of teaching", () => {
    const total = scenes.reduce((t, sc) => t + words(sc.say), 0);
    // Roughly 4 to 10 minutes at reading pace.
    expect(total).toBeGreaterThanOrEqual(600);
    expect(total).toBeLessThanOrEqual(1500);
  });

  it("gives the kid something to do at least every other scene", () => {
    for (const seg of lesson.teach ?? []) {
      if (!seg.present?.length) continue;
      let since = 0;
      for (const sc of seg.present) {
        since = sc.check || sc.visual ? 0 : since + 1;
        expect(since, `${seg.title}: too long without doing anything`).toBeLessThanOrEqual(2);
      }
    }
  });

  it("asks check-in questions that can actually be answered", () => {
    for (const sc of scenes) {
      if (!sc.check) continue;
      expect(probeSolvable(sc.check), `"${sc.heading}" check`).toBe(true);
      expect((sc.check.seconds ?? 45) <= 45, `"${sc.heading}" check should be quick`).toBe(true);
    }
  });

  it("still offers enough angles for the meter", () => {
    expect(new Set((lesson.mastery ?? []).map(angleOf)).size).toBeGreaterThanOrEqual(MIN_ANGLES);
  });

  it("has slides on its scenes, so the board is not bare while the teacher talks", () => {
    for (const seg of lesson.teach ?? []) {
      for (const [j, sc] of (seg.present ?? []).entries()) {
        expect(sc.show?.length ?? 0, `${seg.title} scene ${j + 1} has slides`).toBeGreaterThan(0);
      }
    }
  });

  it("cues every slide to words the teacher actually says", () => {
    for (const seg of lesson.teach ?? []) {
      for (const [j, sc] of (seg.present ?? []).entries()) {
        // A cue that isn't in the narration silently collapses onto the slide
        // before it, so the slide never appears. Catch it here instead.
        const { ok, missing } = cuesFound(sc.say, sc.show ?? []);
        expect(ok, `${seg.title} scene ${j + 1}: cue not in the narration -> ${missing.join(" | ")}`).toBe(true);
      }
    }
  });

  it("changes the slide often enough that nothing sits still for long", () => {
    for (const seg of lesson.teach ?? []) {
      for (const [j, sc] of (seg.present ?? []).entries()) {
        const perSlide = words(sc.say) / (sc.show?.length ?? 1);
        // ~140 words a minute, so 60 words is roughly 25 seconds on one picture.
        expect(perSlide, `${seg.title} scene ${j + 1} words per slide`).toBeLessThanOrEqual(60);
      }
    }
  });

  it("survives a parent saving the lesson editor", () => {
    for (const sc of scenes) expect(sanitizeScene(sc), sc.heading).toEqual(sc);
  });

  it("plays as a presentation, with a brief and a recap", () => {
    const steps = buildSteps({
      segments: (lesson.teach ?? []).map((s) => ({
        title: s.title,
        teach: s.teach,
        present: s.present?.map((sc) => ({ heading: sc.heading, say: sc.say, check: sc.check ? { type: "number", prompt: "x" } : undefined })),
        think: { q: s.think.q, choices: s.think.choices },
        probe: s.probe ? { type: "number", prompt: "x" } : undefined,
      })) as never,
      initial: { segmentsDone: (lesson.teach ?? []).map(() => false), activityDone: false, explainDone: false },
      objectives: lessonObjectives(lesson),
      keyIdeas: lesson.keyIdeas,
      plan: lessonPlan(lesson),
      lessonTitle: lesson.title,
      hasMastery: !!lesson.mastery?.length,
    });
    expect(steps[0]?.kind).toBe("brief");
    expect(steps[steps.length - 1]?.kind).toBe("recap");
    expect(steps.filter((s) => s.kind === "present").length).toBe(scenes.length);
    // Never more than two scenes back to back without something to do.
    let run = 0;
    for (const s of steps) {
      run = s.kind === "present" ? run + 1 : 0;
      expect(run, "too many scenes in a row").toBeLessThanOrEqual(2);
    }
  });
});
