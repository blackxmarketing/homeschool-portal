import { describe, expect, it } from "vitest";
import {
  ANGLE_BY_TYPE,
  DECAY_HALFLIFE_DAYS,
  MASTERY_BAR,
  MIN_ANGLES,
  PRIOR,
  type Evidence,
  type Meter,
  angleOf,
  anglesWanted,
  applyEvidence,
  blockers,
  climbing,
  conceptOf,
  decayed,
  emptyMeter,
  helpCredit,
  isMastered,
  lessonMastered,
  metersFrom,
  speedCredit,
} from "@/lib/masteryMeter";

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 0, 1);

/** One answer. Clean and prompt unless told otherwise. */
const ev = (over: Partial<Evidence> = {}): Evidence => ({
  concept: "money.earning#0",
  angle: "symbolic",
  correct: true,
  firstTry: true,
  rung: 0,
  ms: 20_000,
  expectedMs: 40_000,
  at: T0,
  ...over,
});

/** Walks a run of answers through the meter. */
const run = (evs: Evidence[]): Meter => evs.reduce(applyEvidence, emptyMeter());

/** A clean run from n different angles, one per day. */
const cleanRun = (n: number) =>
  Array.from({ length: n }, (_, i) => ev({ angle: `angle-${i}`, at: T0 + i * 1000 }));

describe("what an answer is worth", () => {
  it("rewards being quick, but never punishes slow-and-right by much", () => {
    expect(speedCredit(10_000, 40_000)).toBe(1);
    expect(speedCredit(32_000, 40_000)).toBe(1);
    expect(speedCredit(200_000, 40_000)).toBe(0.5);
    const middling = speedCredit(60_000, 40_000);
    expect(middling).toBeGreaterThan(0.5);
    expect(middling).toBeLessThan(1);
  });

  it("treats a missing expectation as no speed penalty", () => {
    expect(speedCredit(99_000, 0)).toBe(1);
    expect(speedCredit(0, 40_000)).toBe(1);
  });

  it("charges more for more help, and everything for being shown the answer", () => {
    expect(helpCredit(0)).toBe(1);
    expect(helpCredit(1)).toBeGreaterThan(helpCredit(2));
    expect(helpCredit(2)).toBeGreaterThan(helpCredit(3));
    expect(helpCredit(4)).toBe(0);
    expect(helpCredit(9)).toBe(0);
  });
});

describe("the estimate", () => {
  it("starts at the prior and climbs on clean answers", () => {
    expect(emptyMeter().p).toBe(PRIOR);
    const m = run(cleanRun(3));
    expect(m.p).toBeGreaterThanOrEqual(MASTERY_BAR);
  });

  it("does not move when the answer was revealed", () => {
    const before = run(cleanRun(1));
    const after = applyEvidence(before, ev({ rung: 4, at: T0 + 5000 }));
    expect(after.p).toBe(before.p);
  });

  it("never lets a kid reach the bar by having answers shown to them", () => {
    const m = run(Array.from({ length: 20 }, (_, i) => ev({ angle: `angle-${i}`, rung: 4, at: T0 + i * 1000 })));
    expect(m.p).toBeLessThan(MASTERY_BAR);
    expect(isMastered({ ...m, taught: true }, T0)).toBe(false);
  });

  it("falls back on a miss", () => {
    const up = run(cleanRun(2));
    const down = applyEvidence(up, ev({ correct: false, firstTry: false, at: T0 + 5000 }));
    expect(down.p).toBeLessThan(up.p);
  });

  it("takes longer to climb when they keep needing hints", () => {
    const clean = run(Array.from({ length: 3 }, (_, i) => ev({ angle: `a${i}`, at: T0 + i * 1000 })));
    const hinted = run(Array.from({ length: 3 }, (_, i) => ev({ angle: `a${i}`, rung: 1, at: T0 + i * 1000 })));
    expect(hinted.p).toBeLessThan(clean.p);
  });

  it("stays inside its bounds whatever happens", () => {
    const wild = run(Array.from({ length: 50 }, (_, i) => ev({ correct: i % 3 !== 0, firstTry: i % 2 === 0, rung: i % 5, at: T0 + i * 1000 })));
    expect(wild.p).toBeGreaterThan(0);
    expect(wild.p).toBeLessThan(1);
  });
});

describe("different angles", () => {
  it("will not call it mastered from one angle, however many times they nail it", () => {
    const m = run(Array.from({ length: 12 }, (_, i) => ev({ at: T0 + i * 1000 })));
    expect(m.p).toBeGreaterThanOrEqual(MASTERY_BAR);
    expect(m.angles).toEqual(["symbolic"]);
    expect(blockers({ ...m, taught: true }, T0)).toEqual(["angles"]);
  });

  it("counts an angle once they get it right unaided", () => {
    const m = run([ev({ angle: "visual" }), ev({ angle: "symbolic", at: T0 + 1000 })]);
    expect(m.angles).toEqual(["visual", "symbolic"]);
  });

  it("does not count an angle they were shown the answer to", () => {
    const m = run([ev({ angle: "visual", rung: 4 })]);
    expect(m.angles).toEqual([]);
  });

  it("does not count an angle they got wrong", () => {
    const m = run([ev({ angle: "visual", correct: false })]);
    expect(m.angles).toEqual([]);
  });

  it("knows which angles are still untried", () => {
    const m = run([ev({ angle: "symbolic" })]);
    expect(anglesWanted(m, ["symbolic", "visual", "real-world"])).toEqual(["visual", "real-world"]);
  });
});

describe("mastered, or not", () => {
  const ready = (): Meter => ({ ...run(cleanRun(MIN_ANGLES)), taught: true });

  it("needs the estimate, the angles and the teach-back together", () => {
    expect(isMastered(ready(), T0)).toBe(true);
    expect(blockers(ready(), T0)).toEqual([]);
  });

  it("is not mastered without teaching it back", () => {
    expect(blockers({ ...ready(), taught: false }, T0)).toEqual(["teach-back"]);
  });

  it("is not mastered on too few angles", () => {
    const thin = { ...run(Array.from({ length: 6 }, (_, i) => ev({ at: T0 + i * 1000 }))), taught: true };
    expect(blockers(thin, T0)).toContain("angles");
  });

  it("is not mastered while the estimate is low", () => {
    const shaky: Meter = { p: 0.5, angles: ["a", "b", "c"], lastSeen: T0, taught: true };
    expect(blockers(shaky, T0)).toEqual(["estimate"]);
  });

  it("reports every reason at once", () => {
    expect(blockers(emptyMeter(), T0).sort()).toEqual(["angles", "estimate", "teach-back"]);
  });

  it("a lesson is done when all of its ideas are", () => {
    const done = ready();
    expect(lessonMastered([done, done], T0)).toBe(true);
    expect(lessonMastered([done, emptyMeter()], T0)).toBe(false);
    expect(lessonMastered([], T0)).toBe(false);
  });
});

describe("fading, and getting it back", () => {
  it("holds steady over a day or two", () => {
    expect(decayed(0.9, T0, T0 + DAY * 0.5)).toBe(0.9);
  });

  it("halves the distance above the prior over the half-life", () => {
    const faded = decayed(0.9, T0, T0 + DAY * DECAY_HALFLIFE_DAYS);
    expect(faded).toBeCloseTo(PRIOR + (0.9 - PRIOR) / 2, 2);
  });

  it("fades towards the prior, never below it", () => {
    expect(decayed(0.99, T0, T0 + DAY * 4000)).toBeGreaterThanOrEqual(PRIOR - 0.01);
  });

  it("drops a long-untouched idea back below the bar", () => {
    const m = { ...run(cleanRun(MIN_ANGLES)), taught: true };
    expect(isMastered(m, T0)).toBe(true);
    expect(isMastered(m, T0 + DAY * 365)).toBe(false);
  });

  it("a review answer brings it back", () => {
    const m = { ...run(cleanRun(MIN_ANGLES)), taught: true };
    const later = T0 + DAY * 365;
    const revived = applyEvidence(m, ev({ angle: "symbolic", at: later }));
    expect(revived.p).toBeGreaterThan(decayed(m.p, m.lastSeen, later));
    expect(revived.lastSeen).toBe(later);
  });
});

describe("building meters from a kid's answers", () => {
  it("keeps each idea separate", () => {
    const meters = metersFrom([
      ev({ concept: "a", angle: "symbolic" }),
      ev({ concept: "a", angle: "visual", at: T0 + 1000 }),
      ev({ concept: "b", angle: "symbolic", correct: false, at: T0 + 2000 }),
    ]);
    expect(meters.get("a")!.angles).toEqual(["symbolic", "visual"]);
    expect(meters.get("b")!.p).toBeLessThan(PRIOR);
  });

  it("does not care what order the answers arrive in", () => {
    const evs = cleanRun(4);
    const forward = metersFrom(evs).get("money.earning#0")!;
    const backward = metersFrom([...evs].reverse()).get("money.earning#0")!;
    expect(backward.p).toBeCloseTo(forward.p, 10);
    expect(backward.angles).toEqual(forward.angles);
  });

  it("marks the ideas they have taught back", () => {
    const meters = metersFrom([ev({ concept: "a" }), ev({ concept: "b", at: T0 + 1000 })], new Set(["a"]));
    expect(meters.get("a")!.taught).toBe(true);
    expect(meters.get("b")!.taught).toBe(false);
  });
});

describe("whether they are getting anywhere", () => {
  it("counts real improvement as climbing", () => {
    expect(climbing([0.3, 0.45, 0.6])).toBe(true);
  });

  it("counts a flat run as stuck", () => {
    expect(climbing([0.42, 0.43, 0.42])).toBe(false);
  });

  it("counts going backwards as stuck", () => {
    expect(climbing([0.6, 0.4])).toBe(false);
  });

  it("gives a kid the benefit of the doubt before there is anything to judge", () => {
    expect(climbing([])).toBe(true);
    expect(climbing([0.3])).toBe(true);
  });
});

describe("naming the idea and the angle", () => {
  it("uses the author's angle when there is one", () => {
    expect(angleOf({ type: "number", angle: "estimate" })).toBe("estimate");
  });

  it("falls back to the shape of the question, so today's lessons already vary", () => {
    expect(angleOf({ type: "number" })).toBe("symbolic");
    expect(angleOf({ type: "place" })).toBe("visual");
    expect(new Set(Object.values(ANGLE_BY_TYPE)).size).toBe(Object.keys(ANGLE_BY_TYPE).length);
  });

  it("treats the lesson as the idea, so its questions are angles on one thing", () => {
    expect(conceptOf("money.earning", {})).toBe("money.earning");
    expect(conceptOf("money.earning", undefined)).toBe("money.earning");
  });

  it("splits a lesson into separate ideas when the author names them", () => {
    expect(conceptOf("money.earning", { tests: "hourly-rate" })).toBe("money.earning#hourly-rate");
    expect(conceptOf("money.earning", { tests: "value" })).not.toBe(conceptOf("money.earning", { tests: "hourly-rate" }));
  });
});
