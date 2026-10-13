import type { GameEvidence, MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";
import { dec, divisors, fracToString, gcd, int, isPrime, lcm, pick, seededRng, shuffle, simplify, type Frac, type Rng } from "../curriculum/math";

/**
 * Number Chompers (math, grades 3-5 so far). A 6 x 5 board of numbers with a
 * rule across the top - "Multiples of 7", "Equals 42", "Less than 60". The kid
 * steers a Chomper around the board with the arrow keys (or the on-screen pad)
 * and eats the cells that fit the rule, while Grumbles patrol.
 *
 * Rules, which are the six things this kind of board teaches well:
 *
 *   multiples  - whole-number multiples of the target (3.OA.C.7)
 *   factors    - numbers that divide the target evenly (4.OA.B.4)
 *   primes     - and `composites`, its opposite (4.OA.B.4)
 *   equals     - cells are expressions; eat the ones worth the target
 *                (3.OA.C.7, 3.OA.B.6, 4.NBT.B.5, 5.OA.A.1)
 *   less       - and `greater`: inequalities (3.NBT.A.2)
 *
 * Arithmetic rides on top of all of them: a cell can be "9 x 4" instead of
 * "36", so the kid works the fact out and then judges it.
 *
 * Every level names the curriculum skill it drills (`skill`), and the same id
 * is what the mastery meter records, so fluency earned here shows up in the
 * same place as fluency shown in a lesson.
 *
 * Turn-based, which is what makes it safe to score: Grumbles step once each
 * time the Chomper steps, so a whole game is a list of moves plus the board
 * seed, and the server rebuilds the identical board and replays it. Every
 * board has exactly CORRECT_PER_BOARD right answers, so no seed is a luckier
 * seed than another.
 *
 * Scoring, per board: 1 point for each correct cell eaten, +5 for clearing the
 * board. Three boards a level, so 45 points. A wrong munch or being caught
 * costs one of three lives (shared across the level) and sends the Chomper
 * back to the middle; out of lives ends the level where it stands.
 */

export const chompersInfo = {
  id: "chompers",
  title: "Number Chompers",
  icon: "👾",
  land: "math" as const,
  subject: "math" as const,
  grades: [3, 4, 5],
  blurb: "Eat every number that fits the rule, and don't let the Grumbles catch you.",
};

// ---------------- The board ----------------

export const COLS = 6;
export const ROWS = 5;
export const CELLS = COLS * ROWS;
/** Right answers on every board, so no seed is easier than another. */
export const CORRECT_PER_BOARD = 10;
/** Lives for a whole level (three boards). */
export const LIVES = 3;
/** Points for clearing a board of its right answers. */
export const CLEAR_BONUS = 5;
/** Most moves replayed per board, so a junk move list can't tie up the server. */
export const MAX_ACTS = 400;
/** Where the Chomper starts, and goes back to after losing a life. */
export const START = { x: 2, y: 2 };

export type RuleKind =
  | "multiples"
  | "factors"
  | "primes"
  | "composites"
  | "equals"
  | "less"
  | "greater"
  /** Worth the same as the target, however it is written: 3/4, 0.75, 75%, 6/8. */
  | "equivalent"
  /** A fraction that cannot be written with smaller numbers. */
  | "simplest"
  /** Worth `target` percent of `of`: "Equals 25% of 80". */
  | "percentOf"
  /** A number something times itself makes: 1, 4, 9, 16. */
  | "squares"
  /** A multiple of both `target` and `of`. */
  | "commonMultiples"
  /** A factor of both `target` and `of`. */
  | "commonFactors"
  /** Worth `target` once x is `of`: "With x = 5, equals 20". */
  | "evaluates";

export interface Rule {
  kind: RuleKind;
  /** What the rule is about: 7 in "Multiples of 7", 42 in "Equals 42". Ignored by primes. */
  target: number;
  /** The whole a percent is taken of: 80 in "25% of 80". */
  of?: number;
  /** The target written as a fraction, when it is one. Gives the rule its
   *  name ("Worth the same as 3/4") and lets a wrong munch be explained by
   *  cross-multiplying rather than by comparing long decimals. */
  frac?: Frac;
  /** How to write the target when a decimal would read badly: "1/2" for 0.5. */
  show?: string;
}

/** Rounds off floating-point dust, so 3/6 and 0.5 really do match. */
const q = (v: number) => Math.round(v * 1e9) / 1e9;

/** What a percent rule comes to. */
export const percentValue = (rule: Rule) => q((rule.target / 100) * (rule.of ?? 0));

/** How the numbers on a board are written. */
export type CellStyle =
  /** Plain numbers: 12, 35, 44. */
  | "plain"
  /** One operation to work out first: "9 x 4". */
  | "fact"
  /** Two operations, so the order matters: "4 + 2 x 8". */
  | "twostep"
  /** Fractions: 3/4, 6/8, 5/3. */
  | "fraction"
  /** The same numbers written every which way: 3/4, 0.75, 75%. This is the one
   *  that teaches converting, because all three forms sit on one board. */
  | "mixed"
  /** Ratios: 3:4, 6:8. The same numbers as a fraction, said the other way. */
  | "ratio"
  /** Arithmetic that crosses zero: "-8 + 3", "5 - 12", "3 x (-4)". */
  | "signed"
  /** Powers: 2^5, 4^3. Two cells can be the same number written two ways. */
  | "power"
  /** Expressions in x, worked out with the x the rule gives: "4x", "x + 15". */
  | "variable";

export interface BoardSpec {
  rule: Rule;
  style: CellStyle;
  /** The range the numbers come from; for fractions, the biggest denominator. */
  lo: number;
  hi: number;
  /** Right answers on this board. Only drops below the usual ten when there
   *  genuinely are not ten ways to write the same number. */
  right?: number;
}

/** One square of the board. */
export interface Cell {
  /** What the kid reads. */
  text: string;
  /** What the rule judges. */
  value: number;
  /** The fraction behind it, when the cell is one. Simplest form needs it. */
  frac?: Frac;
  /** Whether it fits the rule. Worked out on the server when the board is built. */
  ok: boolean;
}

export interface Grumble {
  kind: GrumbleKind;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

/** Grumbles walk in straight lines and come back on the far side. */
export type GrumbleKind = "plodder" | "pacer";

export interface Board {
  rule: Rule;
  /** The rule, written for a kid. */
  label: string;
  cells: Cell[];
  grumbles: Grumble[];
}

// ---------------- The rules ----------------

/** Whether a value fits the rule. The one place "right answer" is decided. */
export function fits(rule: Rule, cell: number | { value: number; frac?: Frac }): boolean {
  const c = typeof cell === "number" ? { value: cell, frac: undefined } : cell;
  const value = c.value;
  switch (rule.kind) {
    case "multiples":
      return Number.isInteger(value) && value > 0 && value % rule.target === 0;
    case "factors":
      return Number.isInteger(value) && value > 0 && rule.target % value === 0;
    case "primes":
      return isPrime(value);
    case "composites":
      return Number.isInteger(value) && value > 1 && !isPrime(value);
    case "equals":
      return q(value) === q(rule.target);
    case "less":
      return q(value) < q(rule.target);
    case "greater":
      return q(value) > q(rule.target);
    case "equivalent":
      return q(value) === q(rule.target);
    case "simplest":
      // A whole number is not a fraction in its simplest form, it is a whole
      // number - so 4/2 and 6/3 are out whichever way you write them.
      return !!c.frac && c.frac.d > 1 && gcd(c.frac.n, c.frac.d) === 1;
    case "percentOf":
      return q(value) === percentValue(rule);
    case "squares":
      return Number.isInteger(value) && value >= 0 && Number.isInteger(Math.round(Math.sqrt(value))) && Math.round(Math.sqrt(value)) ** 2 === value;
    case "commonMultiples":
      return Number.isInteger(value) && value > 0 && value % rule.target === 0 && value % (rule.of ?? 1) === 0;
    case "commonFactors":
      return Number.isInteger(value) && value > 0 && rule.target % value === 0 && (rule.of ?? 0) % value === 0;
    case "evaluates":
      return q(value) === q(rule.target);
  }
}

/** The rule across the top of the board. */
export function ruleLabel(rule: Rule): string {
  switch (rule.kind) {
    case "multiples":
      return `Multiples of ${rule.target}`;
    case "factors":
      return `Factors of ${rule.target}`;
    case "primes":
      return "Prime numbers";
    case "composites":
      return "Composite numbers";
    case "equals":
      return `Equals ${rule.target}`;
    case "less":
      return `Less than ${rule.show ?? rule.target}`;
    case "greater":
      return `Greater than ${rule.show ?? rule.target}`;
    case "equivalent":
      return `Worth the same as ${rule.show ?? (rule.frac ? fracToString(rule.frac) : rule.target)}`;
    case "simplest":
      return "Already in simplest form";
    case "percentOf":
      return `Equals ${rule.target}% of ${rule.of}`;
    case "squares":
      return "Square numbers";
    case "commonMultiples":
      return `Multiples of both ${rule.target} and ${rule.of}`;
    case "commonFactors":
      return `Factors of both ${rule.target} and ${rule.of}`;
    case "evaluates":
      return `With x = ${rule.of}, equals ${rule.target}`;
  }
}

/** The one line a kid gets when they eat something that does not fit. */
export function teachFor(rule: Rule, cell: Cell): string {
  // Say what it is worth, unless the cell already says so. Three places is
  // plenty: a kid does not need 2/13 to nine decimals.
  const worth = dec(cell.value, 3);
  const shown = cell.text === worth ? worth : `${cell.text} is ${worth}, and it`;
  const t = rule.target;
  switch (rule.kind) {
    case "multiples": {
      const below = Math.floor(cell.value / t) * t;
      return `${shown} is not a multiple of ${t}. Count by ${t}s: ${[1, 2, 3].map((i) => i * t).join(", ")}... you land on ${below}, then ${below + t}, never ${cell.value}.`;
    }
    case "factors":
      return `${shown} does not divide ${t} evenly: ${t} ÷ ${cell.value} leaves a remainder. The factors of ${t} are ${divisors(t).join(", ")}.`;
    case "primes": {
      if (cell.value <= 1) return `${shown} is not prime. A prime is bigger than 1 and can only be made by 1 times itself.`;
      const d = divisors(cell.value).filter((x) => x !== 1 && x !== cell.value);
      return `${shown} is not prime: ${cell.value} = ${d[0]} × ${cell.value / d[0]}, so it has a factor besides 1 and itself.`;
    }
    case "composites":
      return `${shown} is not composite. ${cell.value} is prime - the only way to make it is 1 × ${cell.value}.`;
    case "equals":
      return `${cell.text} is ${cell.value}, not ${t}.`;
    case "less":
      return `${shown} is not less than ${rule.show ?? t}.`;
    case "greater":
      return `${shown} is not greater than ${rule.show ?? t}.`;
    case "equivalent": {
      const want = rule.show ?? (rule.frac ? fracToString(rule.frac) : dec(t, 3));
      if (rule.frac && cell.frac) {
        const a = cell.frac.n * rule.frac.d;
        const b = rule.frac.n * cell.frac.d;
        return `${cell.text} is not the same as ${want}. Cross-multiply to check: ${cell.frac.n} × ${rule.frac.d} = ${a}, and ${rule.frac.n} × ${cell.frac.d} = ${b}. They would have to match.`;
      }
      return `${cell.text} is worth ${dec(cell.value, 3)}, and ${want} is worth ${dec(t, 3)}.`;
    }
    case "simplest": {
      if (!cell.frac) return `${cell.text} is not a fraction in its simplest form.`;
      const g = gcd(cell.frac.n, cell.frac.d);
      if (cell.frac.d === 1) return `${cell.text} is a whole number, not a fraction in simplest form.`;
      return `${cell.text} can still be made smaller: ${cell.frac.n} and ${cell.frac.d} both divide by ${g}, so it is really ${fracToString(cell.frac)}.`;
    }
    case "percentOf":
      return `${shown} is not ${t}% of ${rule.of}. Find 1% first: ${rule.of} ÷ 100 = ${dec((rule.of ?? 0) / 100)}, then take ${t} of those, which is ${dec(percentValue(rule))}.`;
    case "squares": {
      const root = Math.floor(Math.sqrt(Math.max(0, cell.value)));
      return `${shown} is not a square number: ${root} × ${root} = ${root * root} and ${root + 1} × ${root + 1} = ${(root + 1) ** 2}, so nothing times itself lands on ${cell.value}.`;
    }
    case "commonMultiples": {
      const other = rule.of ?? 1;
      const missesFirst = cell.value % t !== 0;
      const bad = missesFirst ? t : other;
      return `${shown} is not a multiple of ${bad}. A number has to be a multiple of both - the first one that is, is ${lcm(t, other)}.`;
    }
    case "commonFactors": {
      const other = rule.of ?? 0;
      const bad = t % cell.value !== 0 ? t : other;
      return `${shown} does not divide ${bad} evenly. The factors they share are ${divisors(gcd(t, other)).join(", ")}.`;
    }
    case "evaluates":
      return `${cell.text} comes to ${dec(cell.value, 3)} when x is ${rule.of}, not ${t}. Put ${rule.of} where the x is and work it out.`;
  }
}

// ---------------- Writing a number as a problem ----------------

/** Every way of writing `v` as one operation: "9 x 4", "50 - 8", "84 / 2". */
function factWays(v: number, hi: number): string[] {
  const ways: string[] = [];
  if (v > 1) {
    for (const d of divisors(v).filter((d) => d > 1 && d <= 12 && v / d <= 12)) ways.push(`${d} × ${v / d}`);
    for (const d of divisors(v).filter((d) => d > 1 && d <= 12)) ways.push(`${v * d} ÷ ${d}`);
  }
  for (let b = 1; b <= 20; b++) {
    if (v - b >= 0) ways.push(`${v - b} + ${b}`);
    if (v + b <= hi + 60) ways.push(`${v + b} − ${b}`);
  }
  return ways.length ? ways : [`${v} + 0`];
}

/** How a number reads inside a sum: 4, or (-4) when it is negative. */
const signed = (n: number) => (n < 0 ? `(−${Math.abs(n)})` : String(n));

/** Every way of writing `v` as one operation when the numbers can go below zero. */
function signedWays(v: number): string[] {
  const ways: string[] = [];
  for (let b = 1; b <= 15; b++) {
    ways.push(`${signed(v - b)} + ${b}`);
    ways.push(`${signed(v + b)} − ${b}`);
  }
  if (v !== 0) for (const d of divisors(Math.abs(v)).filter((d) => d > 1 && d <= 12 && Math.abs(v) / d <= 12)) ways.push(`${signed(-d)} × ${signed(-v / d)}`);
  for (const d of divisors(Math.abs(v)).filter((d) => d > 1 && d <= 12 && Math.abs(v) / d <= 12)) ways.push(`${d} × ${signed(v / d)}`);
  return ways.length ? ways : [`${signed(v)} + 0`];
}

/** Every way of writing `v` as an expression in x, for the x the rule gives. */
function variableWays(v: number, x: number): string[] {
  const ways: string[] = [];
  if (x !== 0 && v % x === 0 && Math.abs(v / x) <= 12 && v / x !== 1) ways.push(`${v / x}x`);
  for (let k = 1; k <= 6; k++) {
    const term = k === 1 ? "x" : `${k}x`;
    // "3x + 5" and "3x - 5", skipping the ones that would read "3x + 0".
    if (v - k * x > 0) ways.push(`${term} + ${v - k * x}`);
    if (k * x - v > 0) ways.push(`${term} − ${k * x - v}`);
    // "40 - 2x", the other way round.
    if (v + k * x > 0) ways.push(`${v + k * x} − ${term}`);
  }
  return ways.length ? ways : [String(v)];
}

/** Every way of writing `v` as two operations, so the order decides it: "4 + 2 x 8". */
function twoStepWays(v: number): string[] {
  const ways: string[] = [];
  for (let b = 2; b <= 9; b++)
    for (let c = 2; c <= 9; c++) {
      const a = v - b * c;
      if (a >= 0 && a <= 40) ways.push(`${a} + ${b} × ${c}`);
    }
  for (let b = 2; b <= 9; b++) {
    const a = Math.ceil((v + 1) / b);
    const back = a * b - v;
    if (back > 0 && back <= 40) ways.push(`${a} × ${b} − ${back}`);
  }
  return ways.length ? ways : [`${v} + 0`];
}

/**
 * How this cell is written. Picks a way the board has not used yet, so ten
 * squares all worth 42 read as ten different questions rather than the same
 * one twice.
 */
function cellText(r: Rng, v: number, spec: BoardSpec, used: Set<string>): string {
  if (spec.style === "plain") return v < 0 ? `−${Math.abs(v)}` : String(v);
  const ways =
    spec.style === "twostep" ? twoStepWays(v) : spec.style === "signed" ? signedWays(v) : spec.style === "variable" ? variableWays(v, spec.rule.of ?? 1) : factWays(v, spec.hi);
  for (const w of shuffle(r, ways)) if (!used.has(w)) return w;
  return ways[0];
}

// ---------------- Building a board ----------------

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** One number a board could show, and how it would be written. */
interface Cand {
  value: number;
  frac?: Frac;
  /** Already-written forms (fractions, decimals, percents). Worked out otherwise. */
  text?: string;
}

/** Every fraction up to a denominator, both reduced and not. */
function fractionPool(maxDen: number): Cand[] {
  const out: Cand[] = [];
  for (let d = 2; d <= maxDen; d++)
    for (let n = 1; n <= d * 2; n++) {
      if (n === d) continue; // 1 written as a fraction is a distraction, not a lesson
      out.push({ value: q(n / d), frac: { n, d }, text: `${n}/${d}` });
    }
  return out;
}

/** The same fractions written the other way round: 3:4 rather than 3/4. */
function ratioPool(maxDen: number): Cand[] {
  return fractionPool(maxDen).map((c) => ({ ...c, text: `${c.frac!.n}:${c.frac!.d}` }));
}

/** Every power in range, both ways round where there are two: 16 is 2^4 and 4^2. */
function powerPool(lo: number, hi: number): Cand[] {
  const out: Cand[] = [];
  for (let a = 2; a <= 31; a++)
    for (let b = 2; b <= 6; b++) {
      const v = a ** b;
      if (v < lo || v > hi) continue;
      out.push({ value: v, text: `${a}^${b}` });
    }
  return out;
}

/** The same fractions, plus the ones that also write neatly as a decimal or a percent. */
function mixedPool(maxDen: number): Cand[] {
  const out = fractionPool(maxDen);
  const seen = new Set(out.map((c) => c.text));
  for (const c of [...out]) {
    const asDec = dec(c.value, 4);
    if (asDec.replace(/[^0-9]/g, "").length <= 4 && q(Number(asDec)) === c.value && !seen.has(asDec)) {
      seen.add(asDec);
      out.push({ value: c.value, frac: c.frac, text: asDec });
    }
    const pct = q(c.value * 100);
    const asPct = `${dec(pct)}%`;
    if (Number.isInteger(pct) && !seen.has(asPct)) {
      seen.add(asPct);
      out.push({ value: c.value, frac: c.frac, text: asPct });
    }
  }
  return out;
}

/** Everything a board could show, split into the ones that fit and the ones that do not. */
function split(spec: BoardSpec): { yes: Cand[]; no: Cand[] } {
  const pool: Cand[] =
    spec.style === "fraction"
      ? fractionPool(spec.hi)
      : spec.style === "mixed"
        ? mixedPool(spec.hi)
        : spec.style === "ratio"
          ? ratioPool(spec.hi)
          : spec.style === "power"
            ? powerPool(spec.lo, spec.hi)
            : Array.from({ length: spec.hi - spec.lo + 1 }, (_, i) => ({ value: spec.lo + i }));
  const yes: Cand[] = [];
  const no: Cand[] = [];
  for (const c of pool) (fits(spec.rule, c) ? yes : no).push(c);
  return { yes, no };
}

/** The Grumbles for a board: one more on each board of the level. */
function buildGrumbles(r: Rng, count: number): Grumble[] {
  const out: Grumble[] = [];
  for (let i = 0; i < count; i++) {
    // Alternate walkers across and down, so they cross each other's paths.
    const across = i % 2 === 0;
    out.push({
      kind: across ? "plodder" : "pacer",
      x: across ? int(r, 0, COLS - 1) : i % 4 === 1 ? 0 : COLS - 1,
      y: across ? (i % 4 === 0 ? 0 : ROWS - 1) : int(r, 0, ROWS - 1),
      dx: across ? 0 : i % 4 === 1 ? 1 : -1,
      dy: across ? (i % 4 === 0 ? 1 : -1) : 0,
    });
  }
  // Never start on top of the Chomper.
  return out.map((g) => (g.x === START.x && g.y === START.y ? { ...g, x: mod(g.x + 1, COLS) } : g));
}

/**
 * Builds a board. Pure: the same spec, board number and seed always give the
 * same board, which is how the server can re-score what the kid played.
 */
/**
 * Styles where the cell writes itself a different way each time. An "Equals
 * 42" board is ten cells all worth 42 - 6 x 7, 50 - 8, 84 / 2 - so one value
 * is enough to fill it. A board of plain numbers or fractions cannot do that:
 * two cells reading "12" is not a question, so those boards hold as many right
 * answers as there genuinely are.
 */
const WRITES_ITSELF: CellStyle[] = ["fact", "twostep", "signed", "variable"];

/** How many right answers a board holds. The same for every seed, by design. */
export function rightOn(spec: BoardSpec): number {
  const want = spec.right ?? CORRECT_PER_BOARD;
  return WRITES_ITSELF.includes(spec.style) ? want : Math.min(want, split(spec).yes.length);
}

export function buildBoard(spec: BoardSpec, boardIndex: number, seed: number): Board {
  const r = seededRng((seed >>> 0) * 31 + boardIndex * 7919 + 1);
  const { yes, no } = split(spec);
  const want = rightOn(spec);
  const right = shuffle(r, yes).slice(0, want);
  while (right.length < want && yes.length) right.push(yes[right.length % yes.length]);
  const wrong = shuffle(r, no).slice(0, CELLS - right.length);
  while (wrong.length < CELLS - right.length && no.length) wrong.push(no[wrong.length % no.length]);

  const used = new Set<string>();
  const picked = shuffle(r, [...right, ...wrong]);
  const cells: Cell[] = picked.map((c) => {
    const text = c.text ?? cellText(r, c.value, spec, used);
    used.add(text);
    return { text, value: c.value, frac: c.frac, ok: fits(spec.rule, c) };
  });
  return { rule: spec.rule, label: ruleLabel(spec.rule), cells, grumbles: buildGrumbles(r, boardIndex + 1) };
}

/** Where a Grumble stands after `phase` turns. Walks straight and reappears on the far side. */
export function grumbleAt(g: Grumble, phase: number): { x: number; y: number } {
  return { x: mod(g.x + g.dx * phase, COLS), y: mod(g.y + g.dy * phase, ROWS) };
}

// ---------------- Playing ----------------

export type Act = "up" | "down" | "left" | "right" | "munch";

const ACTS: Act[] = ["up", "down", "left", "right", "munch"];
export const DIRS: Record<Exclude<Act, "munch">, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

export interface ChomperState {
  x: number;
  y: number;
  /** Turns taken on this board. */
  turn: number;
  /** Turns since the Chomper last went back to the middle - what the Grumbles walk by. */
  phase: number;
  eaten: boolean[];
  lives: number;
  points: number;
  wrong: number;
  caught: number;
  cleared: boolean;
  /** Out of lives. */
  over: boolean;
  /** What just happened, for the screen to show. */
  last: { kind: "right" | "wrong" | "caught"; cell?: number } | null;
}

export function startState(lives = LIVES): ChomperState {
  return { x: START.x, y: START.y, turn: 0, phase: 0, eaten: Array(CELLS).fill(false), lives, points: 0, wrong: 0, caught: 0, cleared: false, over: false, last: null };
}

/** Whether every right answer has been eaten. */
const allEaten = (board: Board, eaten: boolean[]) => board.cells.every((c, i) => !c.ok || eaten[i]);

function respawn(s: ChomperState): void {
  s.lives--;
  s.x = START.x;
  s.y = START.y;
  s.phase = 0;
}

/**
 * One turn. The screen calls this to play and the server calls it to score, so
 * the two can never disagree about what happened.
 */
export function step(board: Board, st: ChomperState, act: Act): ChomperState {
  if (st.over || st.cleared) return st;
  const s: ChomperState = { ...st, eaten: [...st.eaten], last: null };
  s.turn++;
  s.phase++;
  const from = { x: st.x, y: st.y };
  let lostLife = false;

  if (act === "munch") {
    const i = s.y * COLS + s.x;
    if (!s.eaten[i]) {
      if (board.cells[i].ok) {
        s.eaten[i] = true;
        s.points++;
        s.last = { kind: "right", cell: i };
      } else {
        s.wrong++;
        s.last = { kind: "wrong", cell: i };
        respawn(s);
        lostLife = true;
      }
    }
  } else {
    const [dx, dy] = DIRS[act];
    const nx = s.x + dx;
    const ny = s.y + dy;
    // Walking into the edge stays put, but the turn still passes - which is how
    // a kid waits for a Grumble to walk by.
    if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
      s.x = nx;
      s.y = ny;
    }
  }

  // Eating the last right answer ends the board there and then: a Grumble
  // walking onto you on the very turn you finish it does not take it away.
  if (!lostLife && allEaten(board, s.eaten)) {
    s.cleared = true;
    s.points += CLEAR_BONUS;
    return s;
  }

  // The Grumbles move with the Chomper. Just respawned means a turn's grace.
  if (!lostLife && s.lives > 0) {
    for (const g of board.grumbles) {
      const now = grumbleAt(g, s.phase);
      const was = grumbleAt(g, s.phase - 1);
      const walkedInto = now.x === s.x && now.y === s.y;
      const passedThrough = was.x === s.x && was.y === s.y && now.x === from.x && now.y === from.y;
      if (walkedInto || passedThrough) {
        s.caught++;
        s.last = { kind: "caught" };
        respawn(s);
        break;
      }
    }
  }

  if (s.lives <= 0) {
    s.lives = 0;
    s.over = true;
  }
  return s;
}

// ---------------- Levels ----------------

export interface ChomperLevel extends MiniLevel {
  grade: number;
  /**
   * The curriculum skill this drills: a Skill.id from lib/curriculum/skills.ts
   * for grades 3-8, or a K-5 lesson id. Checked by the tests, so the game can
   * never drift away from what the lessons teach.
   */
  skill: string;
  boards: BoardSpec[];
}

const board = (kind: RuleKind, target: number, style: CellStyle, lo: number, hi: number, extra: Partial<BoardSpec> & Partial<Rule> = {}): BoardSpec => {
  const { of, show, frac, right } = extra;
  return {
    rule: { kind, target, ...(of !== undefined && { of }), ...(show !== undefined && { show }), ...(frac !== undefined && { frac }) },
    style,
    lo,
    hi,
    ...(right !== undefined && { right }),
  };
};

const lvl = (grade: number, id: string, title: string, skill: string, intro: string, boards: BoardSpec[]): ChomperLevel => ({ grade, id, title, skill, intro, boards });

export const CHOMPER_LEVELS: Record<number, ChomperLevel[]> = {
  3: [
    lvl(3, "g3-1", "Times Table Trail", "g3.mult-facts", "Skill: knowing your times tables by heart. Every square is a multiplication to work out. Eat the ones worth the number at the top.", [
      board("equals", 24, "fact", 2, 60),
      board("equals", 36, "fact", 2, 72),
      board("equals", 42, "fact", 2, 84),
    ]),
    lvl(3, "g3-2", "Multiple Marsh", "g3.mult-facts", "Skill: spotting multiples. A multiple of 4 is a number you land on when you count by 4s: 4, 8, 12, 16...", [
      board("multiples", 3, "plain", 2, 40),
      board("multiples", 4, "plain", 2, 48),
      board("multiples", 6, "plain", 3, 72),
    ]),
    lvl(3, "g3-3", "Division Dell", "g3.div-facts", "Skill: division facts. Work out each sharing problem, then eat the ones that come to the number at the top.", [
      board("equals", 6, "fact", 2, 30),
      board("equals", 8, "fact", 2, 40),
      board("equals", 9, "fact", 2, 45),
    ]),
    lvl(3, "g3-5", "Fraction Fields", "g3.equiv-fractions", "Skill: equal fractions. 1/2 and 2/4 are the same amount of pie, just cut into different numbers of slices.", [
      board("equivalent", 0.5, "fraction", 2, 20, { frac: { n: 1, d: 2 } }),
      board("equivalent", 0.25, "fraction", 2, 24, { frac: { n: 1, d: 4 } }),
      board("equivalent", 1 / 3, "fraction", 2, 24, { frac: { n: 1, d: 3 } }),
    ]),
    lvl(3, "g3-4", "More or Less", "g3.add-sub-1000", "Skill: adding, subtracting and comparing. Work out each sum first, then decide whether it is small enough to eat.", [
      board("less", 50, "fact", 10, 99),
      board("greater", 120, "fact", 60, 200),
      board("less", 300, "fact", 150, 480),
    ]),
  ],
  4: [
    lvl(4, "g4-5", "Three Ways to Say It", "g4.decimal-fractions", "Skill: the same number written as a fraction, a decimal and a percent. 3/4, 0.75 and 75% are all the same amount.", [
      board("equivalent", 0.5, "mixed", 2, 20, { frac: { n: 1, d: 2 } }),
      board("equivalent", 0.75, "mixed", 2, 24, { frac: { n: 3, d: 4 } }),
      board("equivalent", 0.2, "mixed", 2, 20, { frac: { n: 1, d: 5 } }),
    ]),
    lvl(4, "g4-6", "Bigger or Smaller Than a Half", "g4.compare-fractions", "Skill: comparing fractions, decimals and percents. If the top is more than half the bottom, the fraction is more than a half.", [
      board("greater", 0.5, "mixed", 2, 16, { show: "1/2" }),
      board("less", 0.25, "mixed", 2, 16, { show: "1/4" }),
      board("greater", 1, "fraction", 2, 16),
    ]),
    lvl(4, "g4-1", "Factor Forest", "g4.factors-primes", "Skill: finding factors. A factor divides the number at the top with nothing left over. 6 is a factor of 24 because 24 ÷ 6 = 4.", [
      board("factors", 24, "plain", 1, 30),
      board("factors", 36, "plain", 1, 40),
      board("factors", 48, "plain", 1, 50),
    ]),
    lvl(4, "g4-2", "Prime Peaks", "g4.factors-primes", "Skill: prime numbers. A prime is bigger than 1 and can only be made by 1 times itself. Eat only the primes.", [
      board("primes", 0, "plain", 2, 40),
      board("primes", 0, "plain", 2, 60),
      board("primes", 0, "plain", 2, 80),
    ]),
    lvl(4, "g4-3", "Composite Cavern", "g4.factors-primes", "Skill: telling composite from prime. A composite number can be split into a rectangle: 12 is 3 × 4, so it is composite.", [
      board("composites", 0, "plain", 2, 80),
      board("composites", 0, "plain", 2, 100),
      board("composites", 0, "plain", 2, 120),
    ]),
    lvl(4, "g4-4", "Product Pass", "g4.mult-multidigit", "Skill: multiplying bigger numbers. Work out each product, then eat the ones that match the number at the top.", [
      board("equals", 60, "fact", 10, 120),
      board("equals", 84, "fact", 10, 170),
      board("equals", 96, "fact", 10, 200),
    ]),
  ],
  5: [
    lvl(5, "g5-1", "Multiple Mountain", "g3.mult-facts", "Skill: the harder times tables. Count by 7s, 8s and 12s and eat every number you land on.", [
      board("multiples", 7, "plain", 5, 90),
      board("multiples", 8, "plain", 5, 100),
      board("multiples", 12, "plain", 5, 144),
    ]),
    lvl(5, "g5-2", "Factor Falls", "g4.factors-primes", "Skill: factors of bigger numbers. Try each one: does it divide the number at the top with nothing left over?", [
      board("factors", 60, "plain", 1, 64),
      board("factors", 72, "plain", 1, 76),
      board("factors", 84, "plain", 1, 88),
    ]),
    lvl(5, "g5-5", "Simplest Form", "g4.equiv-fractions", "Skill: simplest form. A fraction is in simplest form when nothing but 1 divides into both numbers - 6/8 is not, because both halve to 3/4.", [
      board("simplest", 0, "fraction", 2, 12),
      board("simplest", 0, "fraction", 2, 16),
      board("simplest", 0, "fraction", 2, 20),
    ]),
    lvl(5, "g5-6", "Percent Pursuit", "g6.percent", "Skill: finding a percent of a number. To find 25% of 80, find 1% first - that is 80 ÷ 100 - then take 25 of them.", [
      board("percentOf", 25, "fact", 1, 60, { of: 80 }),
      board("percentOf", 10, "fact", 1, 90, { of: 300 }),
      board("percentOf", 50, "fact", 1, 90, { of: 90 }),
    ]),
    lvl(5, "g5-3", "Order of Operations", "g5.order-of-operations", "Skill: the order of operations. Multiply and divide before you add and subtract, so 4 + 2 × 8 is 20, not 48.", [
      board("equals", 20, "twostep", 5, 60),
      board("equals", 30, "twostep", 5, 80),
      board("equals", 45, "twostep", 5, 99),
    ]),
    lvl(5, "g5-4", "Prime Hunt", "g4.factors-primes", "Skill: primes up to 100. The sneaky ones are 51, 57, 87 and 91 - they look prime but they are not.", [
      board("primes", 0, "plain", 2, 100),
      board("composites", 0, "plain", 20, 160),
      board("primes", 0, "plain", 20, 120),
    ]),
  ],
};


/**
 * Grades 6-12. Their own levels, not the younger ones turned up: integers that
 * cross zero, ratios, powers, common multiples and factors, expressions with
 * an x in them, and percents of awkward numbers.
 */
export const BAND_ONLY_LEVELS: ChomperLevel[] = [
  lvl(6, "b-integers", "Integer Island", "g7.integer-add-sub", "Skill: adding, subtracting and comparing numbers below zero. On the number line, -12 sits further left than -5, so it is the smaller one.", [
    board("greater", -5, "signed", -40, 40),
    board("less", 0, "signed", -40, 40),
    board("equals", -12, "signed", -60, 60),
  ]),
  lvl(6, "b-ratios", "Ratio Road", "g6.ratios", "Skill: equal ratios. 3:4 and 6:8 are the same mix - double both sides and nothing changes.", [
    board("equivalent", 0.5, "ratio", 2, 20, { frac: { n: 1, d: 2 } }),
    board("equivalent", 2 / 3, "ratio", 3, 24, { frac: { n: 2, d: 3 } }),
    board("equivalent", 0.75, "ratio", 4, 28, { frac: { n: 3, d: 4 } }),
  ]),
  lvl(6, "b-powers", "Power Peaks", "g6.exponents", "Skill: squares and powers. 4^3 means 4 × 4 × 4, which is 64 - not 4 × 3.", [
    board("squares", 0, "plain", 1, 150),
    board("squares", 0, "plain", 1, 400),
    board("less", 100, "power", 4, 1000),
  ]),
  lvl(6, "b-common", "Common Ground", "g6.gcf-lcm", "Skill: common multiples and common factors. A number has to work for both, not just one of them.", [
    board("commonMultiples", 4, "plain", 1, 130, { of: 6 }),
    board("commonFactors", 48, "plain", 1, 50, { of: 72 }),
    board("commonMultiples", 6, "plain", 1, 250, { of: 8 }),
  ]),
  lvl(7, "b-xmarks", "X Marks the Spot", "g6.evaluate-expressions", "Skill: working out an expression once you know what x is. Put the number where the x is, then do the sum.", [
    board("evaluates", 20, "variable", 1, 60, { of: 5 }),
    board("evaluates", 24, "variable", 1, 80, { of: 3 }),
    board("evaluates", 36, "variable", 1, 90, { of: 6 }),
  ]),
  lvl(7, "b-percent", "Percent Problems", "g7.percent-problems", "Skill: percents of harder numbers. 15% is 10% plus half of it again, which beats reaching for a calculator.", [
    board("percentOf", 15, "fact", 1, 120, { of: 240 }),
    board("percentOf", 80, "fact", 1, 200, { of: 45 }),
    board("percentOf", 12.5, "fact", 1, 100, { of: 64 }),
  ]),
];

export const ALL_CHOMPER_LEVELS: ChomperLevel[] = [...Object.values(CHOMPER_LEVELS).flat(), ...BAND_ONLY_LEVELS];

export const levelById = (id: string): ChomperLevel | undefined => ALL_CHOMPER_LEVELS.find((l) => l.id === id);

/**
 * What grades 6-12 play: two of the grade 5 boards as a warm-up, then their
 * own. Order of operations and primes are worth revisiting at any age.
 */
const BAND_LEVELS: ChomperLevel[] = [
  CHOMPER_LEVELS[5].find((l) => l.id === "g5-3")!,
  CHOMPER_LEVELS[5].find((l) => l.id === "g5-4")!,
  ...BAND_ONLY_LEVELS,
];

// ---------------- Scoring ----------------

/** One board's worth of what the kid did. The seed is what the board was built from. */
export interface BoardMove {
  seed: number;
  acts: Act[];
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): BoardMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 8).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const n = Number(o.seed);
    const seed = Number.isFinite(n) ? Math.abs(Math.trunc(n)) % 2147483647 : 0;
    const acts = Array.isArray(o.acts) ? (o.acts.slice(0, MAX_ACTS).filter((a): a is Act => typeof a === "string" && (ACTS as string[]).includes(a))) : [];
    return { seed, acts };
  });
}

export interface BoardResult {
  points: number;
  max: number;
  cleared: boolean;
  wrong: number;
  caught: number;
  eaten: number;
}

/** The most a full board is worth. Thinner boards are worth less - see maxFor. */
export const MAX_PER_BOARD = CORRECT_PER_BOARD + CLEAR_BONUS;

/**
 * The most this board can score: a point for each right answer on it, plus the
 * bonus for clearing. Boards where there are honestly only seven ways to write
 * the same number are worth seven and five, not ten and five - otherwise three
 * stars would be out of reach however well it was played.
 */
export const maxFor = (spec: BoardSpec) => rightOn(spec) + CLEAR_BONUS;

/** The most a whole level can score. */
export const maxForLevel = (level: ChomperLevel) => level.boards.reduce((t, b) => t + maxFor(b), 0);

/** What a board is worth to the mastery meter next to a question in a lesson. */
export const GAME_WEIGHT = 0.35;

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole level (the server uses this to check the score). */
export function replay(level: ChomperLevel, raw: unknown): { boards: BoardResult[]; points: number; max: number; stars: number; lives: number } {
  const moves = cleanMoves(raw);
  let lives = LIVES;
  const boards = level.boards.map((spec, i) => {
    const mv = moves[i];
    if (lives <= 0 || !mv) return { points: 0, max: maxFor(spec), cleared: false, wrong: 0, caught: 0, eaten: 0 };
    const b = buildBoard(spec, i, mv.seed);
    let st = startState(lives);
    for (const a of mv.acts) {
      st = step(b, st, a);
      if (st.over || st.cleared) break;
    }
    lives = st.lives;
    return { points: st.points, max: maxFor(spec), cleared: st.cleared, wrong: st.wrong, caught: st.caught, eaten: st.eaten.filter(Boolean).length };
  });
  const points = boards.reduce((t, b) => t + b.points, 0);
  const max = maxForLevel(level);
  return { boards, points, max, stars: starsFor(points, max), lives };
}

// ---------------- Finding a safe route (for tests, and the "show me" hint) ----------------

/** How often the Grumbles' whole pattern repeats: a plodder walks ROWS cells, a pacer COLS. */
const PERIOD = lcm(COLS, ROWS);

const hitsGrumble = (board: Board, x: number, y: number, phase: number, fromX: number, fromY: number): boolean =>
  board.grumbles.some((g) => {
    const now = grumbleAt(g, phase);
    const was = grumbleAt(g, phase - 1);
    return (now.x === x && now.y === y) || (was.x === x && was.y === y && now.x === fromX && now.y === fromY);
  });

/** Where the Chomper is and where the Grumbles are in their walk, as one number. */
const stateKey = (x: number, y: number, phase: number) => (y * COLS + x) * PERIOD + mod(phase, PERIOD);

/** The cells the Chomper can step to from here, edges included (walking into the edge waits). */
function nextCells(x: number, y: number): { x: number; y: number; act: Act }[] {
  return (["up", "down", "left", "right"] as const).map((act) => {
    const [dx, dy] = DIRS[act];
    const nx = x + dx;
    const ny = y + dy;
    return { x: nx >= 0 && nx < COLS ? nx : x, y: ny >= 0 && ny < ROWS ? ny : y, act };
  });
}

/**
 * The positions the Chomper can stand in and still have somewhere safe to go
 * next turn, and the turn after, for ever. Worked out by starting with every
 * position a Grumble is not standing on and throwing away the dead ends until
 * nothing changes.
 *
 * Without this a route can walk into a corner the Grumbles close off two moves
 * later - which is exactly the trap a kid would call unfair, and which made the
 * worked-example route lose a life it did not deserve.
 */
export function survivable(board: Board): Set<number> {
  const alive = new Set<number>();
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      for (let ph = 0; ph < PERIOD; ph++) if (!board.grumbles.some((g) => { const at = grumbleAt(g, ph); return at.x === x && at.y === y; })) alive.add(stateKey(x, y, ph));

  for (let pass = 0; pass < PERIOD * ROWS * COLS; pass++) {
    let dropped = false;
    for (const key of [...alive]) {
      const ph = key % PERIOD;
      const cell = Math.floor(key / PERIOD);
      const x = cell % COLS;
      const y = Math.floor(cell / COLS);
      const ok = nextCells(x, y).some((n) => !hitsGrumble(board, n.x, n.y, ph + 1, x, y) && alive.has(stateKey(n.x, n.y, ph + 1)));
      if (!ok) {
        alive.delete(key);
        dropped = true;
      }
    }
    if (!dropped) break;
  }
  return alive;
}

/**
 * The shortest run of moves that gets the Chomper safely onto one of `targets`,
 * is still safe on the turn it munches, and leaves it somewhere it can go on
 * surviving. Searches over where it is and where the Grumbles are in their
 * walk, so it is exact rather than a guess.
 */
export function safeRoute(board: Board, from: { x: number; y: number; phase: number }, targets: number[], alive = survivable(board)): Act[] | null {
  const want = new Set(targets);
  const canMunch = (x: number, y: number, phase: number) => !hitsGrumble(board, x, y, phase + 1, x, y) && alive.has(stateKey(x, y, phase + 1));
  if (want.has(from.y * COLS + from.x) && canMunch(from.x, from.y, from.phase)) return [];

  const seen = new Set([stateKey(from.x, from.y, from.phase)]);
  const queue: { x: number; y: number; phase: number; path: Act[] }[] = [{ ...from, path: [] }];
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur.path.length > PERIOD * 4) break;
    for (const n of nextCells(cur.x, cur.y)) {
      const phase = cur.phase + 1;
      if (hitsGrumble(board, n.x, n.y, phase, cur.x, cur.y)) continue;
      if (!alive.has(stateKey(n.x, n.y, phase))) continue;
      const key = stateKey(n.x, n.y, phase);
      if (seen.has(key)) continue;
      seen.add(key);
      const path = [...cur.path, n.act];
      if (want.has(n.y * COLS + n.x) && canMunch(n.x, n.y, phase)) return path;
      queue.push({ x: n.x, y: n.y, phase, path });
    }
  }
  return null;
}

/** A clean run of a level: clears every board without a wrong munch or a scratch. */
export function perfectMoves(level: ChomperLevel): BoardMove[] {
  return level.boards.map((spec, i) => {
    const seed = i + 1;
    const b = buildBoard(spec, i, seed);
    const alive = survivable(b);
    const acts: Act[] = [];
    let st = startState();
    while (!st.cleared && !st.over && acts.length < MAX_ACTS - 1) {
      const left = b.cells.map((c, idx) => (c.ok && !st.eaten[idx] ? idx : -1)).filter((idx) => idx >= 0);
      const route = safeRoute(b, { x: st.x, y: st.y, phase: st.phase }, left, alive);
      if (!route) break;
      for (const a of [...route, "munch" as Act]) {
        acts.push(a);
        st = step(b, st, a);
      }
    }
    return { seed, acts };
  });
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const BODY = "#2bbf5a";
const BODY_D = "#17913f";
const BELLY = "#d8f8c8";
const EYE_W = "#ffffff";
const PUPIL = "#1b1530";
const MOUTH = "#8c1d3f";
const TOOTH = "#fffdf5";

/**
 * The Chomper: a round green eater. Frame 0 has its mouth shut, frame 1 wide
 * open mid-bite, frame 2 is the glum face it pulls after a wrong answer.
 */
export function chomperGrid(frame = 0): Grid {
  const g = new Grid(16, 16);
  g.disc(7.5, 8, 6.4, BODY);
  g.disc(7.5, 10, 4, BELLY);
  // feet
  g.rect(3, 14, 3, 2, BODY_D).rect(10, 14, 3, 2, BODY_D);

  if (frame === 1) {
    // A wedge bitten out of the right-hand side.
    for (let y = 2; y < 14; y++)
      for (let x = 8; x < 16; x++) if (Math.abs(y - 8) <= (x - 7) * 0.75) g.set(x, y, null);
    g.rect(9, 7, 2, 1, TOOTH).rect(9, 9, 2, 1, TOOTH);
  } else if (frame === 2) {
    // Glum: a flat frown.
    g.rect(5, 11, 5, 1, MOUTH).set(4, 12, MOUTH).set(10, 12, MOUTH);
  } else {
    g.rect(5, 11, 5, 1, MOUTH);
  }

  const lid = frame === 2 ? 1 : 0;
  g.disc(5.5, 6, 2, EYE_W).disc(9.5, 6, 2, EYE_W);
  g.set(5, 6 + lid, PUPIL).set(6, 6 + lid, PUPIL).set(9, 6 + lid, PUPIL).set(10, 6 + lid, PUPIL);
  return g.outline(OUT);
}

const GRUMBLE_SKIN: Record<GrumbleKind, string> = { plodder: "#b14bd8", pacer: "#f0803c" };

/** A Grumble: a lumpy little patroller. Frame 1 lifts its feet. */
export function grumbleGrid(kind: GrumbleKind = "plodder", frame = 0): Grid {
  const skin = GRUMBLE_SKIN[kind];
  const g = new Grid(14, 14);
  g.disc(6.5, 7, 5.4, skin);
  g.rect(1, 7, 11, 5, skin);
  // a row of blunt teeth along the bottom
  for (let x = 2; x < 12; x += 3) g.rect(x, 11, 2, 1, TOOTH);
  // horns
  g.tri(3, 0, 3, 2, skin).tri(10, 0, 3, 2, skin);
  // feet shuffle
  g.rect(frame ? 1 : 2, 12, 3, 2, skin).rect(frame ? 9 : 8, 12, 3, 2, skin);
  g.disc(4, 6, 1.6, EYE_W).disc(9, 6, 1.6, EYE_W);
  g.set(4, 6, PUPIL).set(9, 6, PUPIL);
  return g.outline(OUT);
}

// ---------------- The game ----------------

/**
 * What a board shows about the kid, for the hidden mastery meter.
 *
 * One piece of evidence per board played, filed under the level's curriculum
 * skill - the same name a lesson would use - so munching your times tables and
 * answering a times-table question in a lesson land in the same place.
 *
 * It comes in at GAME_WEIGHT, well under a graded lesson answer, and always
 * from the one angle: a game shows fluency and nothing else. The meter wants
 * MIN_ANGLES before it calls an idea mastered, so no amount of munching can
 * mark a skill learned on its own.
 */
export function evidenceFor(levelId: string, raw: unknown): GameEvidence[] {
  const level = levelById(levelId);
  if (!level) return [];
  const r = replay(level, raw);
  const at = Date.now();
  return r.boards
    .filter((b) => b.eaten > 0 || b.wrong > 0)
    .map((b) => ({
      subject: "math",
      concept: level.skill,
      angle: "fluency",
      correct: b.cleared,
      firstTry: b.cleared && b.wrong === 0,
      // No help is offered in a game, and no clock runs in a turn-based board,
      // so neither the coaching ladder nor speed has anything honest to say.
      rung: 0,
      ms: 0,
      expectedMs: 0,
      at,
      weight: GAME_WEIGHT,
    }));
}

export const chompers: MiniGame = {
  ...chompersInfo,
  levels: (band) => (band === "sprout" ? [] : BAND_LEVELS).map(({ id, title, intro }) => ({ id, title, intro })),
  levelsForGrade: (grade) => (CHOMPER_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
  evidence: (levelId, moves) => {
    try {
      return evidenceFor(levelId, moves);
    } catch {
      return [];
    }
  },
};
