import { describe, expect, it } from "vitest";
import { SKILLS, SKILL_BY_ID, allPrereqs } from "@/lib/curriculum/skills";
import { checkAnswer } from "@/lib/curriculum/answers";
import { seededRng } from "@/lib/curriculum/math";

describe("skill graph", () => {
  it("has unique ids", () => {
    expect(SKILL_BY_ID.size).toBe(SKILLS.length);
  });

  it("only references existing prerequisites at the same or a lower grade", () => {
    for (const s of SKILLS) {
      for (const p of s.prereqs) {
        const pre = SKILL_BY_ID.get(p);
        expect(pre, `${s.id} -> ${p}`).toBeDefined();
        expect(pre!.grade, `${s.id} -> ${p}`).toBeLessThanOrEqual(s.grade);
      }
    }
  });

  it("has no cycles", () => {
    for (const s of SKILLS) expect(allPrereqs(s.id).has(s.id), s.id).toBe(false);
  });
});

describe("question generators", () => {
  for (const skill of SKILLS) {
    it(`${skill.id} makes valid, self-consistent questions`, () => {
      const r = seededRng(skill.id.length * 7919);
      for (let i = 0; i < 300; i++) {
        const q = skill.generate(r);
        const ctx = `${skill.id}: ${q.prompt} -> ${q.answer}`;
        expect(q.prompt, ctx).not.toMatch(/NaN|undefined|Infinity/);
        expect(q.answer, ctx).not.toMatch(/NaN|undefined|Infinity/);
        expect(q.explanation, ctx).not.toMatch(/NaN|undefined|Infinity/);
        expect(q.hint.length, ctx).toBeGreaterThan(0);
        if (q.kind === "choice") expect(q.choices, ctx).toContain(q.answer);
        expect(checkAnswer(q, q.answer), ctx).toEqual({ ok: true, correct: true });
        // The hint must never contain the answer outright (skip tiny answers like "4").
        if (q.answer.length >= 3 && q.kind !== "choice") expect(q.hint.includes(q.answer), ctx).toBe(false);
      }
    });
  }
});

describe("answer checking", () => {
  const q = (kind: any, answer: string, extra = {}) =>
    ({ prompt: "", kind, answer, hint: "", explanation: "", ...extra }) as any;

  it("accepts numbers with commas and rejects junk", () => {
    expect(checkAnswer(q("number", "12345"), "12,345")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("number", "12"), "13")).toEqual({ ok: true, correct: false });
    expect(checkAnswer(q("number", "12"), "twelve").ok).toBe(false);
  });

  it("accepts equivalent fractions and mixed numbers", () => {
    expect(checkAnswer(q("fraction", "3/2"), "1 1/2")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("fraction", "3/2"), "6/4")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("fraction", "3/2"), "1.5")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("fraction", "3/4", { simplest: true }), "6/8")).toEqual({ ok: true, correct: false });
    expect(checkAnswer(q("fraction", "3/4", { simplest: true }), "3/4")).toEqual({ ok: true, correct: true });
  });

  it("handles remainders, pairs and expressions", () => {
    expect(checkAnswer(q("remainder", "12 R 3"), "12r3")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("remainder", "12 R 0"), "12")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("pair", "(3, 5)"), "3,5")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("expr", "5x − 3"), "-3 + 5x")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("expr", "x + 2"), "1x+2")).toEqual({ ok: true, correct: true });
    expect(checkAnswer(q("expr", "x + 2"), "2x+2")).toEqual({ ok: true, correct: false });
  });
});
