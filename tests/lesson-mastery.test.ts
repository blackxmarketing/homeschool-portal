import { beforeEach, describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { getDb, openDb, setDb } from "@/lib/db";
import { COURSES } from "@/content/courses";
import type { Lesson, Probe } from "@/content/courses/types";
import { probeSolution } from "@/lib/probes";
import { MIN_ANGLES, angleOf, conceptOf } from "@/lib/masteryMeter";
import {
  STUCK_AFTER_ROUNDS,
  addKid,
  answerActivity,
  answerMasteryItem,
  answerProbe,
  createFamily,
  lessonBlockers,
  lessonIdeas,
  lessonMeters,
  lessonView,
  markTaught,
  meterFor,
  recordExplain,
  retryMastery,
  submitTask,
  teachProgress,
} from "@/lib/store";

/**
 * The first tests that drive the real store against a real database. The
 * lesson-completion gate had none, and it is the rule that decides whether a
 * kid has actually learned something.
 */

// A course lesson that walks the full path - teaching parts, an activity,
// explain-it-back and a mastery set - and whose field mission is written work,
// so turning it in finishes it without waiting on a parent's approval.
const full = (l: Lesson) => !!(l.teach?.length && l.activity && l.explain && l.mastery?.length && l.task?.kind === "write");
const course = COURSES.find((c) => c.lessons.some(full))!;
const lesson: Lesson = course.lessons.find(full)!;

let kid = 0;

function freshKid(): number {
  const conn = openDb(":memory:") as unknown as Database.Database;
  setDb(conn);
  const family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
  return addKid(family, { name: "Kid", avatar: "🙂", grade: 7, pin: "1111", dailyGoal: 45 });
}

/** The answer a kid who knows it would give. */
const right = (p: Probe) => probeSolution(p);

function doTeachingParts(): void {
  (lesson.teach ?? []).forEach((seg, i) => {
    if (seg.probe) answerProbe(kid, course.id, lesson.id, i, right(seg.probe), 5_000);
  });
}

function doActivity(): void {
  const w = lesson.activity!;
  const answer = w.type === "sort" ? w.items.map((it) => it.bucket) : w.type === "sequence" ? w.steps.map((_, i) => i) : w.type === "highlight" ? w.correct : [];
  answerActivity(kid, course.id, lesson.id, answer);
}

/** Answers the whole mastery set correctly, first time. */
function doMasterySet(): void {
  (lesson.mastery ?? []).forEach((p, i) => answerMasteryItem(kid, course.id, lesson.id, i, right(p), 5_000, false));
}

/** Turns in the lesson's field mission, which has always been part of finishing. */
function doTask(): void {
  submitTask(kid, course.id, lesson.id, "A written response long enough to count as real work on the mission.");
}

const WRONG = "definitely not the answer";

/** Misses every teaching part until the answer is shown: a kid who is not getting it. */
function strugglesThroughParts(): void {
  (lesson.teach ?? []).forEach((seg, i) => {
    if (!seg.probe) return;
    for (let miss = 0; miss < 5 && !teachProgress(kid, course.id, lesson.id).segments[i].done; miss++) {
      answerProbe(kid, course.id, lesson.id, i, WRONG, 60_000);
    }
  });
}

/** Gets every mastery question wrong, twice each, so the answers are shown. */
function failsMasterySet(): void {
  (lesson.mastery ?? []).forEach((_, i) => {
    answerMasteryItem(kid, course.id, lesson.id, i, WRONG, 60_000, false);
    answerMasteryItem(kid, course.id, lesson.id, i, WRONG, 60_000, false);
  });
}

const completed = () => lessonView(kid, course.id, lesson.id)?.status === "done";

beforeEach(() => {
  kid = freshKid();
});

describe("the lesson we test against", () => {
  it("has the full path: parts, an activity, explain-it-back and a mastery set", () => {
    expect(lesson.teach?.length).toBeGreaterThan(0);
    expect(lesson.mastery?.length).toBeGreaterThanOrEqual(3);
    expect(lesson.activity).toBeDefined();
    expect(lesson.explain).toBeDefined();
  });

  it("offers enough angles for the meter to be satisfiable", () => {
    const angles = new Set((lesson.mastery ?? []).map(angleOf));
    expect(angles.size).toBeGreaterThanOrEqual(MIN_ANGLES);
  });
});

describe("the mastery meter fills up as a kid works", () => {
  it("starts with every idea unproven", () => {
    const meters = lessonMeters(kid, course.id, lesson, lesson.id);
    expect(meters.length).toBeGreaterThan(0);
    expect(meters.every((m) => m.angles.length === 0 && !m.taught)).toBe(true);
  });

  it("records the angle a question was answered from", () => {
    const seg = lesson.teach![0];
    answerProbe(kid, course.id, lesson.id, 0, right(seg.probe!), 5_000);
    const m = meterFor(kid, course.id, conceptOf(lesson.id, seg.probe!));
    expect(m.angles).toEqual([angleOf(seg.probe!)]);
    expect(m.p).toBeGreaterThan(0.3);
  });

  it("does not credit an idea when the answer had to be shown", () => {
    const p = lesson.mastery![0];
    const wrong = "definitely not the answer";
    answerMasteryItem(kid, course.id, lesson.id, 0, wrong, 5_000, false);
    answerMasteryItem(kid, course.id, lesson.id, 0, wrong, 5_000, false);
    const m = meterFor(kid, course.id, conceptOf(lesson.id, p));
    expect(m.angles).toEqual([]);
    expect(m.p).toBeLessThan(0.3);
  });
});

describe("finishing a lesson", () => {
  it("does not finish just because the motions are done", () => {
    doTeachingParts();
    doActivity();
    doTask();
    // Explain-it-back runs out of tries without ever being understood.
    for (let i = 0; i < 3; i++) recordExplain(kid, course.id, lesson.id, false, "not really");
    expect(teachProgress(kid, course.id, lesson.id).explain.done).toBe(true);
    expect(completed()).toBe(false);
  });

  it("needs the teach-back, not three tries at it", () => {
    doTeachingParts();
    doActivity();
    doTask();
    doMasterySet();
    for (let i = 0; i < 3; i++) recordExplain(kid, course.id, lesson.id, false, "not really");
    expect(completed()).toBe(false);
    expect(lessonBlockers(kid, course.id, lesson, lesson.id).some((b) => b.blockers.includes("teach-back"))).toBe(true);

    recordExplain(kid, course.id, lesson.id, true, "here is why");
    expect(completed()).toBe(true);
  });

  it("finishes when every idea is mastered from enough angles and taught back", () => {
    doTeachingParts();
    doActivity();
    doTask();
    doMasterySet();
    recordExplain(kid, course.id, lesson.id, true, "here is why");
    expect(lessonBlockers(kid, course.id, lesson, lesson.id)).toEqual([]);
    expect(completed()).toBe(true);
  });

  it("moves a kid on who clearly has it, without making them sit the mastery set", () => {
    // Every teaching part right first time, unaided, across enough angles, and
    // explained back. That is mastery; asking four more questions would be
    // testing, not teaching.
    doTeachingParts();
    doActivity();
    doTask();
    recordExplain(kid, course.id, lesson.id, true, "here is why");
    expect(completed()).toBe(true);
    expect(teachProgress(kid, course.id, lesson.id).masteryItems).toBeUndefined();
  });

  it("will not finish on answers that were all revealed", () => {
    doTeachingParts();
    doActivity();
    doTask();
    const wrong = "definitely not the answer";
    (lesson.mastery ?? []).forEach((_, i) => {
      answerMasteryItem(kid, course.id, lesson.id, i, wrong, 5_000, false);
      answerMasteryItem(kid, course.id, lesson.id, i, wrong, 5_000, false);
    });
    markTaught(kid, course.id, [conceptOf(lesson.id, lesson.mastery![0])]);
    recordExplain(kid, course.id, lesson.id, true, "here is why");
    expect(completed()).toBe(false);
  });
});

describe("a kid who cannot get there is let through, not left grinding", () => {
  it("lets them move on after enough rounds, and marks the lesson as stuck", () => {
    strugglesThroughParts();
    doActivity();
    doTask();
    recordExplain(kid, course.id, lesson.id, true, "here is why");

    for (let round = 0; round <= STUCK_AFTER_ROUNDS; round++) {
      failsMasterySet();
      if (round < STUCK_AFTER_ROUNDS) {
        expect(completed(), `round ${round} should not finish the lesson`).toBe(false);
        retryMastery(kid, course.id, lesson.id);
      }
    }

    expect(completed()).toBe(true);
    expect(teachProgress(kid, course.id, lesson.id).stuck).toBe(true);
  });

  it("does not mark a kid stuck who simply mastered it", () => {
    doTeachingParts();
    doActivity();
    doTask();
    doMasterySet();
    recordExplain(kid, course.id, lesson.id, true, "here is why");
    expect(completed()).toBe(true);
    expect(teachProgress(kid, course.id, lesson.id).stuck).toBe(false);
  });
});

describe("kids already part-way through keep their progress", () => {
  it("rebuilds the meter from answers given before the meter existed", () => {
    const seg = lesson.teach![0];
    const concept = conceptOf(lesson.id, seg.probe!);
    answerProbe(kid, course.id, lesson.id, 0, right(seg.probe!), 5_000);
    const earned = meterFor(kid, course.id, concept);

    // Wipe the meter rows, as if those answers predated the feature.
    getDb().prepare("DELETE FROM concept_mastery").run();

    const rebuilt = meterFor(kid, course.id, concept, lessonIdeas(lesson, lesson.id).get(concept));
    expect(rebuilt.p).toBeCloseTo(earned.p, 6);
    expect(rebuilt.angles).toEqual(earned.angles);
  });
});
