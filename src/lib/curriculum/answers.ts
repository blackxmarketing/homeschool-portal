import { simplify, type Frac } from "./math";

export type AnswerKind = "number" | "fraction" | "choice" | "remainder" | "pair" | "expr";

/**
 * A picture drawn alongside a question (see components/Visual.tsx). It shows
 * the setup of the problem, never the answer.
 */
export type Visual =
  | { type: "fraction-bars"; bars: { n: number; d: number; label?: string }[] }
  | { type: "percent-grid"; percent: number; label: string }
  | { type: "tape"; parts: { label: string; units: number; color: "a" | "b" | "c" }[]; caption?: string }
  | { type: "number-line"; min: number; max: number; marks: { value: number; label?: string }[]; jump?: number }
  | { type: "coord"; points: { x: number; y: number; label: string }[]; line?: boolean }
  | { type: "shape"; shape: "triangle" | "parallelogram" | "rectangle"; base: string; height: string }
  | { type: "right-triangle"; a: string; b: string; c: string }
  | { type: "circle"; radius: string }
  | { type: "marbles"; groups: { color: "red" | "blue" | "green"; count: number }[] }
  | { type: "bars"; values: number[] }
  | { type: "balance"; left: string; right: string }
  | { type: "price-tag"; price: number; badge: string }
  | { type: "groups"; groups: number; each: number; icon: string }
  | { type: "power"; base: number; exp: number };

/** A generated question. `answer` is the canonical correct answer. */
export interface Question {
  prompt: string;
  /** Optional picture of the problem's setup. */
  visual?: Visual;
  kind: AnswerKind;
  answer: string;
  choices?: string[];
  /** Nudge toward the method without giving the answer away. */
  hint: string;
  /** Worked solution shown after the kid answers. */
  explanation: string;
  /** Allowed absolute error for "number" answers (e.g. rounding with pi). */
  tolerance?: number;
  /** For "fraction" answers: require lowest terms. */
  simplest?: boolean;
}

export type CheckResult =
  | { ok: true; correct: boolean }
  | { ok: false; formatError: string };

const FORMAT_HELP: Record<AnswerKind, string> = {
  number: "Type a number, like 42 or 3.5.",
  fraction: "Type a fraction like 3/4, a mixed number like 1 1/2, or a whole number.",
  choice: "Pick one of the choices.",
  remainder: "Type the quotient and remainder like 12 R 3 (use R 0 if nothing is left over).",
  pair: "Type an ordered pair like (3, 5).",
  expr: "Type an expression like 4x + 7.",
};

export function formatHelp(kind: AnswerKind): string {
  return FORMAT_HELP[kind];
}

function clean(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

export function parseNumber(raw: string): number | null {
  const s = clean(raw).replace(/,/g, "").replace(/^\$/, "").replace(/%$/, "");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return Number(s);
}

/** Parses "3/4", "-3/4", "1 1/2", "5", or "0.75" into a fraction. */
export function parseFraction(raw: string): Frac | null {
  const s = clean(raw);
  let m = s.match(/^([-+]?)(\d+) (\d+)\/(\d+)$/);
  if (m) {
    const [, sign, w, n, d] = m;
    if (Number(d) === 0) return null;
    const val = Number(w) * Number(d) + Number(n);
    return { n: sign === "-" ? -val : val, d: Number(d) };
  }
  m = s.match(/^([-+]?\d+) ?\/ ?(\d+)$/);
  if (m) {
    if (Number(m[2]) === 0) return null;
    return { n: Number(m[1]), d: Number(m[2]) };
  }
  const num = parseNumber(s);
  if (num === null) return null;
  // Accept terminating decimals as fractions (0.75 -> 75/100).
  const places = (s.split(".")[1] ?? "").length;
  const d = 10 ** places;
  return { n: Math.round(num * d), d };
}

function parseRemainder(raw: string): [number, number] | null {
  const m = clean(raw).toLowerCase().match(/^(\d+) ?r ?(\d+)$/);
  if (m) return [Number(m[1]), Number(m[2])];
  const whole = parseNumber(raw);
  if (whole !== null && Number.isInteger(whole)) return [whole, 0];
  return null;
}

function parsePair(raw: string): [number, number] | null {
  const m = clean(raw).match(/^\(? ?([-+]?\d+(?:\.\d+)?) ?, ?([-+]?\d+(?:\.\d+)?) ?\)?$/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/**
 * Parses a linear expression in x (e.g. "5x - 3", "-x+2", "7") into
 * [coefficient, constant]. Returns null if it isn't a linear expression.
 */
export function parseLinear(raw: string): [number, number] | null {
  const s = raw.replace(/\s+/g, "").replace(/−/g, "-").toLowerCase();
  if (!s || !/^[-+]?[0-9x.+-]+$/.test(s)) return null;
  const terms = s.match(/[+-]?[^+-]+/g);
  if (!terms) return null;
  let a = 0;
  let b = 0;
  for (const t of terms) {
    if (t.endsWith("x")) {
      const c = t.slice(0, -1);
      if (c === "" || c === "+") a += 1;
      else if (c === "-") a -= 1;
      else if (/^[-+]?\d+(\.\d+)?$/.test(c)) a += Number(c);
      else return null;
    } else if (/^[-+]?\d+(\.\d+)?$/.test(t)) {
      b += Number(t);
    } else {
      return null;
    }
  }
  return [a, b];
}

function sameFrac(a: Frac, b: Frac): boolean {
  return a.n * b.d === b.n * a.d;
}

export function checkAnswer(q: Question, input: string): CheckResult {
  const bad = { ok: false as const, formatError: FORMAT_HELP[q.kind] };
  if (!input || !input.trim()) return bad;

  switch (q.kind) {
    case "number": {
      const got = parseNumber(input);
      const want = parseNumber(q.answer);
      if (got === null || want === null) return bad;
      return { ok: true, correct: Math.abs(got - want) <= (q.tolerance ?? 1e-9) };
    }
    case "fraction": {
      const got = parseFraction(input);
      const want = parseFraction(q.answer);
      if (!got || !want) return bad;
      if (!sameFrac(got, want)) return { ok: true, correct: false };
      if (q.simplest) {
        const s = simplify(got);
        // Must be written in lowest terms (decimals are not accepted here).
        const typed = clean(input);
        const lowest = Math.abs(s.n) === Math.abs(got.n) && s.d === got.d;
        if (!lowest || typed.includes(".")) return { ok: true, correct: false };
      }
      return { ok: true, correct: true };
    }
    case "choice": {
      const choices = q.choices ?? [];
      const typed = clean(input);
      if (!choices.includes(typed)) return bad;
      return { ok: true, correct: typed === q.answer };
    }
    case "remainder": {
      const got = parseRemainder(input);
      const want = parseRemainder(q.answer);
      if (!got || !want) return bad;
      return { ok: true, correct: got[0] === want[0] && got[1] === want[1] };
    }
    case "pair": {
      const got = parsePair(input);
      const want = parsePair(q.answer);
      if (!got || !want) return bad;
      return { ok: true, correct: got[0] === want[0] && got[1] === want[1] };
    }
    case "expr": {
      const got = parseLinear(input);
      const want = parseLinear(q.answer);
      if (!got || !want) return bad;
      return { ok: true, correct: got[0] === want[0] && got[1] === want[1] };
    }
  }
}
