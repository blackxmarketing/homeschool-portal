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
 * Rules for a lesson the teacher presents.
 *
 * A scene is one idea, and it lasts exactly as long as that idea takes to
 * explain - the player moves on the moment the teacher stops talking, so a
 * short idea is short and one that needs longer gets longer. There is
 * deliberately no target length here.
 *
 * What is guarded instead is that something is always happening: the rules
 * below are about motion and about a kid having something to do, not about
 * word counts.
 */
/** Below this it is a fragment, not an idea. */
const WORDS_MIN = 15;

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

  it("says something real in every scene", () => {
    // No upper limit: a scene runs for as long as the idea takes, and the
    // player moves on the moment the teacher stops talking.
    for (const sc of scenes) {
      expect(words(sc.say), `"${sc.heading}" is ${words(sc.say)} words`).toBeGreaterThanOrEqual(WORDS_MIN);
      expect(sc.heading.length, sc.heading).toBeGreaterThan(5);
    }
  });

  it("breaks each part into scenes rather than one long speech", () => {
    for (const seg of lesson.teach ?? []) {
      if (!seg.present?.length) continue;
      expect(seg.present.length, seg.title).toBeGreaterThanOrEqual(1);
      expect(seg.present.length, seg.title).toBeLessThanOrEqual(8);
    }
  });

  it("teaches enough to be worth a lesson", () => {
    // A floor only. How much longer a lesson needs to be is the lesson's call.
    const total = scenes.reduce((t, sc) => t + words(sc.say), 0);
    expect(total).toBeGreaterThanOrEqual(500);
  });

  it("never leaves the kid listening for too long without doing something", () => {
    // Counted in words, not scenes: now that a scene is as long as its idea,
    // "every other scene" could still be three minutes of talking. ~200 words
    // is about a minute and a half before the kid is asked to do something -
    // a check-in, a model to play with, or the part's problem at the end.
    const MAX_WORDS_LISTENING = 200;
    for (const seg of lesson.teach ?? []) {
      if (!seg.present?.length) continue;
      let since = 0;
      for (const sc of seg.present) {
        since += words(sc.say);
        expect(since, `${seg.title}: ${since} words before the kid does anything`).toBeLessThanOrEqual(MAX_WORDS_LISTENING);
        if (sc.check || sc.visual) since = 0;
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

  it("never leaves a still picture up for long", () => {
    for (const seg of lesson.teach ?? []) {
      for (const [j, sc] of (seg.present ?? []).entries()) {
        // An animated scene builds the whole way through its stretch of the
        // words, so it is allowed to cover more of them. A still picture is
        // not: ~140 words a minute means 60 words is about 25 seconds of
        // staring at the same thing.
        const still = (sc.show ?? []).filter((b) => !b.art).length;
        if (!still) continue;
        const animated = (sc.show ?? []).length - still;
        const perStill = words(sc.say) / (still + animated * 2);
        expect(perStill, `${seg.title} scene ${j + 1} words per still picture`).toBeLessThanOrEqual(60);
      }
    }
  });

  it("uses an animated scene wherever one picture has to carry a whole scene", () => {
    for (const seg of lesson.teach ?? []) {
      for (const [j, sc] of (seg.present ?? []).entries()) {
        if ((sc.show?.length ?? 0) !== 1) continue;
        expect(sc.show![0].art, `${seg.title} scene ${j + 1} is one picture, so it should move`).toBeTruthy();
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
