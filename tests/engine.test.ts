import { describe, expect, it } from "vitest";
import { masteryProgress, reviewOutcome, detectFlags } from "@/lib/engine/mastery";
import {
  startPlacement,
  nextPlacementSkill,
  recordPlacementAnswer,
  placementFinished,
  placedSkills,
} from "@/lib/engine/placement";
import { buildPlan, frontier, type SkillState } from "@/lib/engine/planner";
import { SKILL_BY_ID, SKILLS } from "@/lib/curriculum/skills";
import { summarize, schoolYearStart } from "@/lib/compliance";

const att = (correct: boolean, usedHint = false) => ({ correct, usedHint });

describe("mastery", () => {
  it("needs 9 of the last 10 without hints", () => {
    expect(masteryProgress(Array(9).fill(att(true))).mastered).toBe(false);
    expect(masteryProgress([...Array(9).fill(att(true)), att(false)]).mastered).toBe(true);
    expect(masteryProgress([...Array(8).fill(att(true)), att(false), att(false)]).mastered).toBe(false);
    expect(masteryProgress([...Array(9).fill(att(true)), att(true, true)]).mastered).toBe(true);
    expect(masteryProgress([...Array(8).fill(att(true)), att(true, true), att(true, true)]).mastered).toBe(false);
  });

  it("only looks at the most recent window", () => {
    const old = Array(20).fill(att(false));
    expect(masteryProgress([...old, ...Array(10).fill(att(true))]).mastered).toBe(true);
  });

  it("spaces reviews out and resets on a failed review", () => {
    expect(reviewOutcome(0, 3, "2026-10-01")).toEqual({ passed: true, stage: 1, nextReview: "2026-10-08" });
    expect(reviewOutcome(3, 2, "2026-10-01").nextReview).toBe("2026-11-30");
    expect(reviewOutcome(2, 1, "2026-10-01")).toEqual({ passed: false, stage: 0, nextReview: null });
  });

  it("flags rushing and stuck skills", () => {
    const fast = Array(5).fill({ correct: false, usedHint: false, responseMs: 1500, skillId: "x" });
    expect(detectFlags(fast, []).map((f) => f.kind)).toEqual(["rushing"]);
    expect(detectFlags([], [{ skillId: "a", attempts: 16, recentAccuracy: 0.3 }])[0].kind).toBe("stuck");
    expect(detectFlags([], [{ skillId: "a", attempts: 12, recentAccuracy: 0.3 }])).toEqual([]);
  });
});

describe("placement", () => {
  function run(knows: (skillId: string) => boolean) {
    let s = startPlacement();
    let asked = 0;
    while (!placementFinished(s)) {
      const skill = nextPlacementSkill(s)!;
      s = recordPlacementAnswer(s, knows(skill));
      asked++;
      if (asked > 500) throw new Error("placement did not finish");
    }
    return { placed: new Set(placedSkills(s)), asked };
  }

  it("places a kid who knows everything through grade 5", () => {
    const { placed, asked } = run((id) => SKILL_BY_ID.get(id)!.grade <= 5);
    for (const s of SKILLS) expect(placed.has(s.id), s.id).toBe(s.grade <= 5);
    expect(asked).toBeLessThan(80);
  });

  it("places nothing for a kid who misses everything, quickly", () => {
    const { placed, asked } = run(() => false);
    expect(placed.size).toBe(0);
    expect(asked).toBeLessThan(30);
  });
});

describe("planner", () => {
  it("starts a brand-new kid on skills with no prerequisites", () => {
    const plan = buildPlan(new Map(), "2026-10-03");
    expect(plan.length).toBe(3);
    for (const p of plan) expect(SKILL_BY_ID.get(p.skillId)!.prereqs).toEqual([]);
    // Grade 3 starter skills span two strands; the plan should use both.
    expect(new Set(plan.map((p) => SKILL_BY_ID.get(p.skillId)!.strand)).size).toBe(2);
  });

  it("puts due reviews first and keeps in-progress skills", () => {
    const states = new Map<string, SkillState>([
      ["g3.mult-facts", { status: "mastered", nextReview: "2026-10-01" }],
      ["g3.round", { status: "mastered", nextReview: "2026-12-01" }],
      ["g3.div-facts", { status: "learning", nextReview: null }],
    ]);
    const plan = buildPlan(states, "2026-10-03");
    expect(plan[0]).toEqual({ type: "review", skillId: "g3.mult-facts" });
    expect(plan.some((p) => p.type === "review" && p.skillId === "g3.round")).toBe(false);
    expect(plan[1]).toEqual({ type: "learn", skillId: "g3.div-facts" });
  });

  it("unlocks a skill only when every prerequisite is mastered", () => {
    const states = new Map<string, SkillState>([["g3.mult-facts", { status: "mastered", nextReview: null }]]);
    const ids = frontier(states).map((s) => s.id);
    expect(ids).toContain("g3.div-facts");
    expect(ids).not.toContain("g3.two-step");
  });
});

describe("compliance", () => {
  it("summarizes days, hours and missing subjects", () => {
    const s = summarize([
      { date: "2026-09-01", subject: "Math", minutes: 120 },
      { date: "2026-09-01", subject: "Reading", minutes: 120 },
      { date: "2026-09-02", subject: "Science", minutes: 180 },
    ]);
    expect(s.days).toBe(2);
    expect(s.totalHours).toBe(7);
    expect(s.avgHoursPerDay).toBe(3.5);
    expect(s.missingSubjects).toContain("History");
    expect(s.missingSubjects).not.toContain("Math");
  });

  it("finds the school year start", () => {
    expect(schoolYearStart("2026-10-03")).toBe("2026-08-01");
    expect(schoolYearStart("2027-03-03")).toBe("2026-08-01");
  });
});
