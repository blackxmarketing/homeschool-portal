import { describe, expect, it } from "vitest";
import { accuracyBand, factsPerMinute, forecast, isStruggling, knowledgeGrade, wasteMeter } from "@/lib/engine/learningPlan";
import { BLOCKS, ideaFor, PORTAL_MATH_MINUTES } from "@/content/schedule";
import { SUBJECTS } from "@/lib/compliance";

const rows = [
  { grade: 3, mastered: 11, total: 11 },
  { grade: 4, mastered: 14, total: 15 },
  { grade: 5, mastered: 6, total: 11 },
  { grade: 6, mastered: 0, total: 12 },
];

describe("learning plan", () => {
  it("finds the knowledge grade (first grade under 90%)", () => {
    expect(knowledgeGrade(rows)).toBe(5);
    expect(knowledgeGrade(rows.map((r) => ({ ...r, mastered: r.total })))).toBe(7);
  });

  it("forecasts weeks to finish, faster with an extra hour", () => {
    // Grade 5 needs ceil(11 * 0.9) = 10 mastered: 4 left. 8 skills in 4 weeks = 2/week -> 2 weeks.
    const f = forecast(rows[2], 8, 600, 4);
    expect(f.remaining).toBe(4);
    expect(f.weeks).toBe(2);
    expect(f.weeksWithExtraHour!).toBeLessThan(f.weeks!);
    expect(forecast(rows[0], 8, 600, 4).weeks).toBe(0);
    expect(forecast(rows[2], 0, 0, 4).weeks).toBeNull();
  });

  it("puts accuracy in the learning zone", () => {
    expect(accuracyBand(19, 20)).toBe("on-target");
    expect(accuracyBand(20, 20)).toBe("too-easy");
    expect(accuracyBand(13, 20)).toBe("too-hard");
    expect(accuracyBand(5, 5)).toBe("not-enough-data");
  });

  it("measures wasted time", () => {
    const clean = Array(10).fill({ correct: true, responseMs: 20_000, reviewMs: 5000 });
    expect(wasteMeter(clean).pct).toBe(0);
    const messy = [
      ...clean,
      { correct: false, responseMs: 1500, reviewMs: 800 }, // rushed and skipped the explanation
      { correct: true, responseMs: 300_000, reviewMs: 4000 }, // walked away for 3 minutes
    ];
    const w = wasteMeter(messy);
    expect(w.rushed).toBe(1);
    expect(w.skippedExplanations).toBe(1);
    expect(w.idleMinutes).toBe(3);
    expect(w.pct).toBeGreaterThan(30);
    expect(wasteMeter([]).pct).toBe(0);
  });

  it("detects struggling", () => {
    const r = (c: boolean) => ({ correct: c });
    expect(isStruggling([r(true), r(false), r(false), r(false)], 4)).toBe(true);
    expect(isStruggling([r(false), r(false), r(true)], 3)).toBe(false);
    expect(isStruggling([...Array(6).fill(r(false)), ...Array(4).fill(r(true))], 12)).toBe(true);
    expect(isStruggling([...Array(6).fill(r(false)), ...Array(4).fill(r(true))], 10)).toBe(false);
  });

  it("counts facts per minute", () => {
    expect(factsPerMinute(30, 60)).toBe(30);
    expect(factsPerMinute(15, 30)).toBe(30);
    expect(factsPerMinute(5, 0)).toBe(0);
  });
});

describe("2-hour day schedule", () => {
  it("adds up to about two hours with valid subjects", () => {
    const total = BLOCKS.reduce((t, b) => t + b.minutes, 0);
    expect(total).toBeGreaterThanOrEqual(100);
    expect(total).toBeLessThanOrEqual(130);
    expect(new Set(BLOCKS.map((b) => b.id)).size).toBe(BLOCKS.length);
    for (const b of BLOCKS) {
      expect(SUBJECTS as readonly string[], b.id).toContain(b.subject);
      if (b.kind === "guided") expect(b.ideas.length, b.id).toBeGreaterThan(0);
    }
    expect(PORTAL_MATH_MINUTES).toBeGreaterThan(0);
  });

  it("suggests the same idea all day", () => {
    const reading = BLOCKS.find((b) => b.id === "reading")!;
    expect(ideaFor(reading, "2026-10-04")).toBe(ideaFor(reading, "2026-10-04"));
    expect(reading.ideas).toContain(ideaFor(reading, "2026-10-05"));
  });
});
