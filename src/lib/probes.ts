import type { Probe } from "@/content/courses/types";
import { checkActivity, publicWidget, type PublicWidget } from "./teaching";

/**
 * Interactive questions ("probes"): what the browser may see, how answers
 * are graded (with partial credit), and the coaching for specific mistakes.
 * Answers never leave the server until a kid has used all their tries.
 */

// ---------------- Simulation math (shared with the widgets) ----------------

/** The lever beam runs 0-100: load at 5, push at 95, fulcrum between 8 and 90. */
export function leverPush(load: number, fulcrum: number): number {
  const f = Math.min(90, Math.max(8, fulcrum));
  return (load * (f - 5)) / (95 - f);
}

/** Whole years of yearly compounding until `principal` first reaches `target`. */
export function yearsToReach(principal: number, rate: number, target: number): number {
  let y = 0;
  let v = principal;
  while (v < target && y < 200) {
    v *= 1 + rate / 100;
    y++;
  }
  return y;
}

export function profitAt(price: number, cost: number, fixed: number, units: number): number {
  return (price - cost) * units - fixed;
}

const NH_SEASON = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "fall", "fall", "fall", "winter"];
export function northernSeason(month: number): string {
  return NH_SEASON[((Math.round(month) % 12) + 12) % 12];
}

// ---------------- What the browser sees ----------------

function seededOrder(n: number, seed: string): number[] {
  let h = [...seed].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 2166136261);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  if (n > 1 && idx.every((v, i) => v === i)) [idx[0], idx[1]] = [idx[1], idx[0]];
  return idx;
}

export type PublicProbe = (
  | { type: "cloze"; parts: string[]; blanks: number; bank?: string[] }
  | { type: "number"; prompt: string; unit?: string }
  | { type: "place"; prompt: string; min: number; max: number; step: number; items: string[] }
  | { type: "match"; prompt: string; left: string[]; right: { id: number; text: string }[] }
  | { type: "build"; prompt: string; tiles: { id: number; text: string }[]; length: number }
  | { type: "target"; prompt: string; sim: "lever"; load: number; maxPush: number }
  | { type: "target"; prompt: string; sim: "profit"; cost: number; fixed: number; units: number; minProfit: number }
  | { type: "target"; prompt: string; sim: "compound"; principal: number; rate: number; target: number }
  | { type: "target"; prompt: string; sim: "seasons"; season: string }
  | Extract<PublicWidget, { type: "sort" | "sequence" | "highlight" }>
) & { seconds: number };

/** Expected seconds by type when the content doesn't say. */
const DEFAULT_SECONDS: Record<string, number> = { cloze: 30, number: 40, place: 40, match: 45, build: 45, target: 60, sort: 60, sequence: 50, highlight: 35 };

export function expectedSeconds(p: Probe): number {
  return p.seconds ?? DEFAULT_SECONDS[p.type] ?? 45;
}

export function publicProbe(p: Probe, seed: string): PublicProbe {
  const seconds = expectedSeconds(p);
  switch (p.type) {
    case "cloze": {
      const parts = p.text.split(/\{\d+\}/);
      const bank = p.bank ? seededOrder(p.bank.length, seed).map((i) => p.bank![i]) : undefined;
      return { type: "cloze", parts, blanks: parts.length - 1, ...(bank ? { bank } : {}), seconds };
    }
    case "number":
      return { type: "number", prompt: p.prompt, ...(p.unit ? { unit: p.unit } : {}), seconds };
    case "place":
      return { type: "place", prompt: p.prompt, min: p.min, max: p.max, step: p.step, items: p.items.map((i) => i.label), seconds };
    case "match":
      return {
        type: "match",
        prompt: p.prompt,
        left: p.pairs.map((x) => x.left),
        right: seededOrder(p.pairs.length, seed).map((i) => ({ id: i, text: p.pairs[i].right })),
        seconds,
      };
    case "build": {
      const all = [...p.tiles, ...(p.distractors ?? [])];
      return { type: "build", prompt: p.prompt, tiles: seededOrder(all.length, seed).map((i) => ({ id: i, text: all[i] })), length: p.tiles.length, seconds };
    }
    case "target":
      return { type: "target", prompt: p.prompt, ...p.goal, seconds } as PublicProbe;
    default:
      return { ...(publicWidget(p, seed) as Extract<PublicWidget, { type: "sort" | "sequence" | "highlight" }>), seconds };
  }
}

// ---------------- Grading ----------------

const norm = (s: unknown) =>
  String(s ?? "")
    .toLowerCase()
    // Punctuation doesn't matter, except a decimal point (2.5 is not 25). 1,000 is 1000.
    .replace(/(\d),(?=\d{3}\b)/g, "$1")
    .replace(/(\d)\.(?=\d)/g, "$1\u0000")
    .replace(/[“”"'’.,!?;:]/g, "")
    .replace(/\u0000/g, ".")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Answers by type:
 *  cloze:    string[] (one per blank)
 *  number:   number
 *  place:    number[] (value placed for each item)
 *  match:    number[] (for each left item, the id of the right item chosen)
 *  build:    number[] (tile ids in order)
 *  target:   number (fulcrum, price, years or month)
 *  sort/sequence/highlight: number[] as for activities
 */
export interface Graded {
  correct: boolean;
  /** 0-1, for partial credit. */
  score: number;
  parts: boolean[];
  /** Coaching for a specific recognised mistake. */
  coach: string | null;
  /** What the kid's answer produced (simulations), e.g. "push 12.5 kg". */
  detail?: string;
}

function mistakeCoach(p: Probe, given: string[]): string | null {
  for (const m of p.mistakes ?? []) if (given.some((g) => norm(g) === norm(m.match))) return m.coach;
  return null;
}

export function gradeProbe(p: Probe, answer: unknown): Graded {
  const arr = Array.isArray(answer) ? answer : [answer];
  const out = (parts: boolean[], coach: string | null = null, detail?: string): Graded => {
    const score = parts.length ? parts.filter(Boolean).length / parts.length : 0;
    return { correct: parts.length > 0 && parts.every(Boolean), score, parts, coach, ...(detail ? { detail } : {}) };
  };
  switch (p.type) {
    case "cloze": {
      const given = p.blanks.map((_, i) => String(arr[i] ?? ""));
      // Only blanks that accept exactly the same answers are interchangeable.
      const used = new Set<string>();
      const parts = p.blanks.map((b, i) => {
        const key = `${b.answers.map(norm).sort().join("|")}::${norm(given[i])}`;
        const ok = b.answers.some((a) => norm(a) === norm(given[i])) && !used.has(key);
        if (ok) used.add(key);
        return ok;
      });
      return out(parts, parts.every(Boolean) ? null : mistakeCoach(p, given.filter((_, i) => !parts[i])));
    }
    case "number": {
      const n = Number(String(arr[0] ?? "").replace(/[$,%\s]/g, ""));
      const ok = Number.isFinite(n) && Math.abs(n - p.answer) <= (p.tolerance ?? 0) + 1e-9;
      return out([ok], ok ? null : mistakeCoach(p, [String(arr[0] ?? ""), String(n)]));
    }
    case "place": {
      const parts = p.items.map((it, i) => Number.isFinite(Number(arr[i])) && Math.abs(Number(arr[i]) - it.value) <= p.tolerance);
      return out(parts);
    }
    case "match": {
      const parts = p.pairs.map((_, i) => Number(arr[i]) === i);
      return out(parts);
    }
    case "build": {
      const ids = arr.map(Number);
      const extra = ids.length !== p.tiles.length;
      // Another right order (or the same words from duplicate tiles) counts too.
      const all = [...p.tiles, ...(p.distractors ?? [])];
      const built = ids.map((i) => all[i]);
      const same = (want: string[]) => !extra && want.every((t, i) => built[i] === t);
      if (same(p.tiles) || (p.also ?? []).some(same)) return out(p.tiles.map(() => true));
      const parts = p.tiles.map((_, i) => ids[i] === i);
      const g = out(parts);
      return extra ? { ...g, correct: false } : g;
    }
    case "target": {
      const v = Number(arr[0]);
      if (!Number.isFinite(v)) return out([false]);
      const goal = p.goal;
      switch (goal.sim) {
        case "lever": {
          const push = leverPush(goal.load, v);
          return out([push <= goal.maxPush + 1e-9], null, `push ${Math.round(push * 10) / 10} kg`);
        }
        case "profit": {
          const profit = profitAt(v, goal.cost, goal.fixed, goal.units);
          return out([profit >= goal.minProfit - 1e-9], null, `profit $${Math.round(profit * 100) / 100}`);
        }
        case "compound":
          return out([Math.round(v) === yearsToReach(goal.principal, goal.rate, goal.target)]);
        case "seasons":
          return out([northernSeason(v) === goal.season], null, `${northernSeason(v)} in the north`);
      }
      return out([false]);
    }
    default: {
      const r = checkActivity(p, arr.map(Number));
      return out(r.parts);
    }
  }
}

/** The answer, shown once a kid has used all their tries (so they always see how it works). */
export function probeSolution(p: Probe): unknown {
  switch (p.type) {
    case "cloze":
      return p.blanks.map((b) => b.answers[0]);
    case "number":
      return p.answer;
    case "place":
      return p.items.map((i) => i.value);
    case "match":
      return p.pairs.map((_, i) => i);
    case "build":
      return p.tiles.map((_, i) => i);
    case "target": {
      const g = p.goal;
      if (g.sim === "compound") return yearsToReach(g.principal, g.rate, g.target);
      if (g.sim === "seasons") return g.season === "summer" ? 6 : 0;
      if (g.sim === "profit") return Math.ceil(((g.minProfit + g.fixed) / g.units + g.cost) * 2) / 2;
      // Lever: the farthest-left fulcrum position that works, rounded up.
      for (let f = 8; f <= 90; f++) if (leverPush(g.load, f) <= g.maxPush) return f;
      return 8;
    }
    case "sort":
      return p.items.map((i) => i.bucket);
    case "sequence":
      return p.steps.map((_, i) => i);
    case "highlight":
      return p.correct;
  }
}

/** Is this probe answerable at all? (used by content tests and the editor) */
export function probeSolvable(p: Probe): boolean {
  return gradeProbe(p, probeSolution(p)).correct;
}
