import type { GameEvidence, MiniGame, MiniLevel } from "./index";
import { Grid, shade } from "../pixel/grid";
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
  grades: [0, 1, 2, 3, 4, 5],
  // Drill: three stars on a level before the next one opens. Knowing the
  // facts is the point, so running ahead of them is not allowed.
  unlockAt: 3,
  blurb: "Eat every number that fits the rule, and don't let the Grumbles catch you.",
};

// ---------------- The board ----------------

export const COLS = 6;
export const ROWS = 5;
export const CELLS = COLS * ROWS;
/** Right answers on every board, so no seed is easier than another. */
export const CORRECT_PER_BOARD = 10;
/**
 * Three tries at every board.
 *
 * Three stars opens the next rung of the ladder, so a level that can be lost
 * to bad luck two boards ago is a locked door, not a challenge. Each board is
 * its own go, and the clock is what applies the pressure.
 */
export const LIVES = 3;

/**
 * Strikes a try is worth. A wrong answer and being caught both cost one, in
 * any mix: three of them between them and the try is over - back to the
 * start of the board with one fewer left.
 */
export const STRIKES = 3;

/**
 * Lives on a third go at a level a kid has not got yet. Same idea as the
 * clock turning into a stopwatch: after two honest attempts the game stops
 * being the obstacle, because what is in the way by then is the maths.
 */
export const EASY_LIVES = 5;
/** Points for clearing a board of its right answers. */
export const CLEAR_BONUS = 5;
/** Most moves replayed per board, so a junk move list can't tie up the server. */
export const MAX_ACTS = 400;
/**
 * How long a board gets. The clock is what turns this from a puzzle into
 * drill: a kid who has to work out 7 x 8 on their fingers runs out of time,
 * and a kid who knows it does not.
 *
 * It is pacing, not scoring. The board stops when it runs out and the points
 * already earned are kept - nobody loses a life to the clock.
 */
export const BOARD_SECONDS = 90;

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
  | "evaluates"
  /** Splits into two equal piles. */
  | "even"
  /** Does not. */
  | "odd"
  /** Has `target` in the `of` place: "Has 4 tens" is target 4, of 10. */
  | "digitIs";

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
  | "variable"
  /** A group of dots to count, for kids who do not read numerals yet. */
  | "dots"
  /** A handful of coins to add up. */
  | "coins";

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
/**
 * A cell drawn rather than written, for kids who are still learning numerals.
 * The picture is what a sighted kid counts; `Cell.text` is the same thing in
 * words, which is all a screen reader can offer.
 */
export interface CellArt {
  kind: "dots" | "coins";
  /** Dots: how many. Coins: the coins in it, biggest first, in cents. */
  parts: number[];
}

export interface Cell {
  /** What the kid reads, and what a screen reader is told. */
  text: string;
  /** Drawn instead of the text, when the board is a picture board. */
  art?: CellArt;
  /** What the rule judges. */
  value: number;
  /** The fraction behind it, when the cell is one. Simplest form needs it. */
  frac?: Frac;
  /** Whether it fits the rule. Worked out on the server when the board is built. */
  ok: boolean;
}

/**
 * The three kinds of Grumble.
 *
 *   plodder - walks a straight line and turns when it hits the edge, so it
 *             works its way around the whole board rather than one row.
 *   rover   - the same, but changes its mind now and then.
 *   chaser  - comes straight after the Chomper, every other turn.
 *
 * There is never more than one chaser, and it moves at half pace. A hunter
 * that matched the Chomper step for step was tried and measured: on a board
 * six squares wide it always runs you into a wall in the end, so every board
 * carrying one was unclearable however well it was played - not hard,
 * impossible. At half pace it still hunts you down if you dawdle, and you can
 * still get away by keeping moving, which is the difference between tense and
 * unfair.
 */
export type GrumbleKind = "plodder" | "rover" | "chaser";

export interface Grumble {
  kind: GrumbleKind;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface Board {
  rule: Rule;
  /** The rule, written for a kid. */
  label: string;
  cells: Cell[];
  /** Where the Grumbles start. Where they are now lives in the play state. */
  grumbles: Grumble[];
  /** The board's seed, which is also what decides a rover's turns. */
  seed: number;
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
    case "even":
      return Number.isInteger(value) && value % 2 === 0;
    case "odd":
      return Number.isInteger(value) && Math.abs(value % 2) === 1;
    case "digitIs":
      return Number.isInteger(value) && value >= 0 && Math.floor(value / (rule.of ?? 1)) % 10 === rule.target;
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
    case "even":
      return "Even numbers";
    case "odd":
      return "Odd numbers";
    case "digitIs":
      return `Has ${rule.target} ${placeName(rule.of ?? 1)}`;
  }
}

/** "ones", "tens", "hundreds" - what a place is called. */
export const placeName = (place: number) => (place >= 100 ? "hundreds" : place >= 10 ? "tens" : "ones");

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
    case "even":
      return `${shown} is odd. Share ${cell.value} into two piles and one is left over.`;
    case "odd":
      return `${shown} is even. ${cell.value} shares into two piles of ${cell.value / 2} with nothing left over.`;
    case "digitIs": {
      const place = rule.of ?? 1;
      const has = Math.floor(cell.value / place) % 10;
      return `${shown} has ${has} ${placeName(place)}, not ${t}.`;
    }
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
  /** A picture to draw instead of the text. */
  art?: CellArt;
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

/** Two ten frames is as many dots as a kid can take in at a glance. */
const MOST_DOTS = 20;

/**
 * Dots to count, and the numerals for the same numbers. Mixing them is the
 * point: a kid matching a drawn 14 against the numeral 9 is doing the thing
 * kindergarten is for, and it gives the board enough squares to fill.
 */
function dotsPool(lo: number, hi: number): Cand[] {
  const out: Cand[] = [];
  for (let n = Math.max(1, lo); n <= hi; n++) {
    out.push({ value: n, text: String(n) });
    if (n <= MOST_DOTS) out.push({ value: n, text: `${n} dots`, art: { kind: "dots", parts: [n] } });
  }
  return out;
}

/** Every coin is drawn on this many pixels square, whatever size the coin is. */
export const COIN_CANVAS = 16;

/** The coins, by what they are worth in cents. */
export const COINS: { cents: number; one: string; many: string }[] = [
  { cents: 25, one: "a quarter", many: "quarters" },
  { cents: 10, one: "a dime", many: "dimes" },
  { cents: 5, one: "a nickel", many: "nickels" },
  { cents: 1, one: "a penny", many: "pennies" },
];

/** Names a handful of coins the way a kid would say it: "a quarter and 2 dimes". */
export function coinWords(parts: number[]): string {
  const bits = COINS.filter((c) => parts.includes(c.cents)).map((c) => {
    const n = parts.filter((p) => p === c.cents).length;
    return n === 1 ? c.one : `${n} ${c.many}`;
  });
  if (bits.length === 1) return bits[0];
  return `${bits.slice(0, -1).join(", ")} and ${bits[bits.length - 1]}`;
}

/**
 * Handfuls of coins. Enumerated as handfuls rather than as totals, so one
 * board can hold a quarter, two dimes and a nickel, and five nickels, and ask
 * which of them is worth more than 25 cents.
 *
 * Five at most: a sixth coin in a square sixty pixels across is too small to
 * tell a dime from a nickel, and a picture a kid cannot read is not a
 * question. That is also why these boards compare rather than match exactly -
 * there are only four ways to make 25 cents out of five coins, which is not
 * enough right answers for a board.
 */
export const MOST_COINS = 5;

function coinPool(maxCents: number): Cand[] {
  const out: Cand[] = [];
  const seen = new Set<string>();
  for (let q = 0; q <= 4; q++)
    for (let d = 0; d <= 5; d++)
      for (let n = 0; n <= 5; n++)
        for (let pn = 0; pn <= 5; pn++) {
          const coins = q + d + n + pn;
          if (coins < 1 || coins > MOST_COINS) continue;
          const cents = q * 25 + d * 10 + n * 5 + pn;
          if (cents < 1 || cents > maxCents) continue;
          const parts = [...Array(q).fill(25), ...Array(d).fill(10), ...Array(n).fill(5), ...Array(pn).fill(1)];
          const text = coinWords(parts);
          if (seen.has(text)) continue;
          seen.add(text);
          out.push({ value: cents, text, art: { kind: "coins", parts } });
        }
  return out;
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
            : spec.style === "dots"
              ? dotsPool(spec.lo, spec.hi)
              : spec.style === "coins"
                ? coinPool(spec.hi)
                : Array.from({ length: spec.hi - spec.lo + 1 }, (_, i) => ({ value: spec.lo + i }));
  const yes: Cand[] = [];
  const no: Cand[] = [];
  for (const c of pool) (fits(spec.rule, c) ? yes : no).push(c);
  return { yes, no };
}

/** Who turns up on each board of a level: a roamer, then a hunter, then both. */
const LINE_UP: GrumbleKind[][] = [["plodder"], ["chaser"], ["rover", "chaser"]];

/** The four ways a Grumble can face, in turning order. */
const FACES: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

/**
 * The Grumbles a board starts with: one more on each board of the level, and
 * from the second board on, one of them hunts. They come in at the corners,
 * as far from the middle as the board allows.
 */
function buildGrumbles(r: Rng, kinds: GrumbleKind[]): Grumble[] {
  const count = kinds.length;
  const corners: [number, number][] = [
    [0, 0],
    [COLS - 1, ROWS - 1],
    [COLS - 1, 0],
    [0, ROWS - 1],
  ];
  return Array.from({ length: count }, (_, i) => {
    const [x, y] = corners[i % corners.length];
    const [dx, dy] = FACES[int(r, 0, 3)];
    return { kind: kinds[i] ?? "plodder", x, y, dx, dy };
  });
}

/** Whether a square is on the board at all. */
const onBoard = (x: number, y: number) => x >= 0 && x < COLS && y >= 0 && y < ROWS;

/**
 * Where a Grumble goes next. Pure: the same Grumble, the same step and the
 * same Chomper always give the same answer, which is the whole reason the
 * server can replay a game it never watched.
 */
/** The hunter's rhythm: HUNT steps after you, then WANDER steps minding its own business. */
const HUNT = 8;
const WANDER = 6;

/**
 * The hunter moves on one in this many of the Grumble steps, so it is always
 * the slower of the two things on the board - a roamer you can see coming,
 * and a hunter that gets there eventually.
 */
export const CHASER_PACE = 2;

/** Whether the hunter is hunting right now, or taking a breather. */
export const hunting = (step: number) => step % (HUNT + WANDER) < HUNT;

export function grumbleStep(g: Grumble, board: Board, step: number, i: number, to: { x: number; y: number }): Grumble {
  if (g.kind === "chaser") {
    // It gathers itself between strides.
    if (step % CHASER_PACE !== 0) return g;
    if (hunting(step)) {
      // Straight at the Chomper, closing the bigger gap first.
      const gx = to.x - g.x;
      const gy = to.y - g.y;
      const [dx, dy] = Math.abs(gx) >= Math.abs(gy) ? [Math.sign(gx), 0] : [0, Math.sign(gy)];
      if (dx !== 0 || dy !== 0) return { ...g, dx, dy, x: g.x + dx, y: g.y + dy };
      return g;
    }
    // Off the scent for a while, which is what gives a kid room to work the
    // far side of the board. Without it the hunter camps the last few
    // squares and the board cannot be finished at all.
  }

  let [dx, dy] = [g.dx, g.dy];
  // A rover changes its mind about one step in five. Which steps is decided by
  // the board's seed, so it is the same wander every time this board is played.
  const whim = g.kind === "rover" && seededRng(board.seed * 7919 + i * 131 + step)() < 0.2;
  if (whim || !onBoard(g.x + dx, g.y + dy)) {
    // Turn: both quarter turns before doubling back. Trying the reverse
    // second is what kept a Grumble bouncing up and down one column for
    // ever - at the left-hand edge, turning left is always into the wall.
    const from = FACES.findIndex(([fx, fy]) => fx === dx && fy === dy);
    const order = whim ? [1, 3, 2, 0][int(seededRng(board.seed * 104729 + i * 31 + step), 0, 2)] : 0;
    const tries = order === 0 ? [1, 3, 2, 0] : [3, 1, 2, 0];
    for (const t of tries) {
      const [tx, ty] = FACES[(from + t) % 4];
      if (onBoard(g.x + tx, g.y + ty)) {
        [dx, dy] = [tx, ty];
        break;
      }
    }
  }
  return onBoard(g.x + dx, g.y + dy) ? { ...g, dx, dy, x: g.x + dx, y: g.y + dy } : { ...g, dx, dy };
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
    return { text, value: c.value, frac: c.frac, ...(c.art && { art: c.art }), ok: fits(spec.rule, c) };
  });
  // Board one a roamer, board two a hunter, board three one of each. Never
  // three: on a board six squares wide that leaves nowhere to stand.
  return { rule: spec.rule, label: ruleLabel(spec.rule), cells, grumbles: buildGrumbles(r, LINE_UP[Math.min(boardIndex, LINE_UP.length - 1)]), seed: (seed >>> 0) * 31 + boardIndex * 7919 + 1 };
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
  /** Turns taken on this try. */
  turn: number;
  /** Wrong answers and catches on this try, in any mix. STRIKES of them ends it. */
  strikes: number;
  /** The best this board has been played across the tries so far. */
  best: number;
  /** Steps the Grumbles have taken since the Chomper last went back to the middle. */
  phase: number;
  /** Where the Grumbles are right now. */
  foes: Grumble[];
  /** Squares eaten on this try, oldest first - a catch gives the last one back. */
  ate: number[];
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

export function startState(board: Board, lives = LIVES): ChomperState {
  return {
    x: START.x,
    y: START.y,
    turn: 0,
    strikes: 0,
    best: 0,
    phase: 0,
    foes: board.grumbles.map((g) => ({ ...g })),
    ate: [],
    eaten: Array(CELLS).fill(false),
    lives,
    points: 0,
    wrong: 0,
    caught: 0,
    cleared: false,
    over: false,
    last: null,
  };
}

/** Whether every right answer has been eaten. */
const allEaten = (board: Board, eaten: boolean[]) => board.cells.every((c, i) => !c.ok || eaten[i]);

/**
 * A wrong answer or a Grumble. Back to the middle, and the Grumbles go back
 * to their corners so the next move is made on a board you can read rather
 * than wherever the chase had got to. Three of these and the try is over.
 */
function strike(board: Board, s: ChomperState, giveBack: boolean): void {
  s.strikes++;
  s.x = START.x;
  s.y = START.y;
  s.phase = 0;
  s.foes = board.grumbles.map((g) => ({ ...g }));

  // Caught: the last square you ate goes back on the board. Knowing the
  // answer is half of it; getting away with it is the other half.
  if (giveBack && s.ate.length) {
    const back = s.ate[s.ate.length - 1];
    s.ate = s.ate.slice(0, -1);
    s.eaten = s.eaten.map((e, i) => (i === back ? false : e));
    s.points = Math.max(0, s.points - 1);
    s.last = { kind: "caught", cell: back };
  }

  if (s.strikes < STRIKES) return;

  // Out of strikes: that try is spent, and the board starts again. The score
  // from the try is kept as the best so far, so nobody is worse off for
  // having another go.
  s.lives--;
  s.strikes = 0;
  s.best = Math.max(s.best, s.points);
  s.points = 0;
  s.eaten = Array(CELLS).fill(false);
  s.ate = [];
}

/**
 * Moves the Grumbles on one step and sees whether one of them walked into the
 * Chomper - either onto its square, or straight past it the other way.
 */
function advance(board: Board, s: ChomperState): void {
  s.foes = s.foes.map((g, i) => grumbleStep(g, board, s.phase, i, { x: s.x, y: s.y }));
  s.phase++;
  for (const now of s.foes) {
    if (now.x === s.x && now.y === s.y) {
      s.caught++;
      s.last = { kind: "caught" };
      strike(board, s, true);
      return;
    }
  }
}

/** One Grumble step on its own, for the tests. In a game, step() does this. */
export function tick(board: Board, st: ChomperState): ChomperState {
  if (st.over || st.cleared) return st;
  const s: ChomperState = { ...st, eaten: [...st.eaten], ate: [...st.ate], last: null };
  advance(board, s);
  if (s.lives <= 0) {
    s.lives = 0;
    s.over = true;
  }
  return s;
}

/**
 * One turn. The screen calls this to play and the server calls it to score, so
 * the two can never disagree about what happened.
 *
 * The Grumbles move with it, one step of theirs to every MONSTER_EVERY of
 * the Chomper's - so nothing happens while a kid is working an answer out,
 * and the board is the same whether they take two seconds or twenty.
 */
export function step(board: Board, st: ChomperState, act: Act, quick = false): ChomperState {
  if (st.over || st.cleared) return st;
  const s: ChomperState = { ...st, eaten: [...st.eaten], ate: [...st.ate], last: null };
  s.turn++;
  const from = { x: st.x, y: st.y };
  let lostLife = false;

  if (act === "munch") {
    const i = s.y * COLS + s.x;
    if (!s.eaten[i]) {
      if (board.cells[i].ok) {
        s.eaten[i] = true;
        s.ate = [...s.ate, i];
        s.points++;
        s.last = { kind: "right", cell: i };
      } else {
        s.wrong++;
        s.last = { kind: "wrong", cell: i };
        // A wrong answer costs a strike but not a square: you never had it.
        strike(board, s, false);
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
    s.best = Math.max(s.best, s.points);
    return s;
  }

  // Walking onto a Grumble is the same as one walking onto you.
  if (!lostLife && s.lives > 0 && s.foes.some((g) => g.x === s.x && g.y === s.y)) {
    s.caught++;
    s.last = { kind: "caught" };
    strike(board, s, true);
    lostLife = true;
  }

  // Their turn comes round every few of the Chomper's.
  if (!lostLife && s.lives > 0 && s.turn % monsterEvery(quick) === 0) advance(board, s);

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
   * for grades 3-8, or a lesson id from a K-5 course for the younger grades,
   * which have no entries in skills.ts. Checked by the tests, so the game can
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
  0: [
    lvl(0, "k-1", "Count the Dots", "math-k.how-many", "Skill: counting a group and matching it to its number. The dots sit in a ten frame, so a full row is five and a full frame is ten.", [
      board("less", 6, "dots", 1, 20),
      board("less", 8, "dots", 1, 22),
      board("less", 10, "dots", 1, 24),
    ]),
    lvl(0, "k-2", "More or Fewer", "math-k.compare", "Skill: saying which of two numbers is more. Count the dots, read the numbers, and eat every one that is bigger than the number at the top.", [
      board("less", 9, "dots", 1, 22),
      board("greater", 10, "dots", 1, 24),
      board("greater", 12, "dots", 1, 26),
    ]),
  ],
  1: [
    lvl(1, "g1-1", "Even and Odd", "math-2.skip-odd-even", "Skill: even and odd. An even number shares into two equal piles; an odd one always has one left over.", [
      board("even", 0, "plain", 1, 40),
      board("odd", 0, "plain", 1, 50),
      board("even", 0, "plain", 1, 99),
    ]),
    lvl(1, "g1-2", "Add and Take Away", "math-1.add20", "Skill: adding and taking away within ten. Work each one out, then eat the ones that come to the number at the top.", [
      board("equals", 5, "fact", 1, 20),
      board("equals", 7, "fact", 1, 20),
      board("equals", 10, "fact", 1, 20),
    ]),
    lvl(1, "g1-3", "Coin Counting", "math-2.time-money", "Skill: adding coins up. The big one with a cross is a quarter (25), the one with a bar is a nickel (5), the little plain one is a dime (10), and the copper one is a penny (1).", [
      board("less", 9, "coins", 1, 50),
      board("greater", 25, "coins", 1, 60),
      board("greater", 40, "coins", 1, 80),
    ]),
  ],
  2: [
    lvl(2, "g2-0", "Facts to Twenty", "math-2.facts-20", "Skill: adding and taking away within twenty. Same game, bigger numbers - and the ones that cross ten are the ones worth knowing.", [
      board("equals", 9, "fact", 1, 24),
      board("equals", 14, "fact", 1, 28),
      board("equals", 18, "fact", 1, 32),
    ]),
    lvl(2, "g2-1", "Skip Counting", "math-2.skip-odd-even", "Skill: counting by 2s, 5s and 10s. Every number you land on while skip counting is a multiple.", [
      board("multiples", 2, "plain", 1, 60),
      board("multiples", 5, "plain", 1, 100),
      board("multiples", 10, "plain", 1, 200),
    ]),
    lvl(2, "g2-2", "Tens and Ones", "math-2.place-value", "Skill: place value. In 47 the 4 is four tens and the 7 is seven ones.", [
      board("digitIs", 4, "plain", 10, 99, { of: 10 }),
      board("digitIs", 7, "plain", 10, 99, { of: 1 }),
      board("digitIs", 3, "plain", 100, 999, { of: 100 }),
    ]),
    lvl(2, "g2-3", "Fill the Purse", "math-2.time-money", "Skill: adding coins and comparing the totals. Quarter is the big one with a cross, nickel has a bar, the little plain one is a dime, copper is a penny - and five coins can be worth less than two.", [
      board("less", 9, "coins", 1, 90),
      board("less", 50, "coins", 1, 95),
      board("greater", 60, "coins", 1, 99),
    ]),
  ],
  3: [
    lvl(3, "g3-1", "Times Table Trail", "g3.mult-facts", "Skill: knowing your times tables by heart. Every square is a multiplication to work out. Eat the ones worth the number at the top.", [
      board("equals", 6, "fact", 2, 48),
      board("equals", 12, "fact", 2, 60),
      board("equals", 24, "fact", 2, 72),
    ]),
    lvl(3, "g3-2", "Multiple Marsh", "g3.mult-facts", "Skill: spotting multiples. A multiple of 4 is a number you land on when you count by 4s: 4, 8, 12, 16...", [
      board("multiples", 3, "plain", 2, 40),
      board("multiples", 4, "plain", 2, 48),
      board("multiples", 6, "plain", 3, 72),
    ]),
    lvl(3, "g3-3", "Division Dell", "g3.div-facts", "Skill: division facts. Work out each sharing problem, then eat the ones that come to the number at the top.", [
      board("equals", 4, "fact", 2, 30),
      board("equals", 6, "fact", 2, 36),
      board("equals", 9, "fact", 2, 45),
    ]),
    lvl(3, "g3-5", "Fraction Fields", "g3.equiv-fractions", "Skill: equal fractions. 1/2 and 2/4 are the same amount of pie, just cut into different numbers of slices.", [
      board("equivalent", 0.5, "fraction", 2, 20, { frac: { n: 1, d: 2 } }),
      board("equivalent", 0.25, "fraction", 2, 24, { frac: { n: 1, d: 4 } }),
      board("equivalent", 1 / 3, "fraction", 2, 24, { frac: { n: 1, d: 3 } }),
    ]),
    lvl(3, "g3-4", "More or Less", "g3.add-sub-1000", "Skill: adding, subtracting and comparing. Work out each sum first, then decide whether it is small enough to eat.", [
      board("less", 9, "fact", 1, 60),
      board("greater", 50, "fact", 10, 120),
      board("less", 100, "fact", 40, 220),
    ]),
  ],
  4: [
    lvl(4, "g4-5", "Three Ways to Say It", "g4.decimal-fractions", "Skill: the same number written as a fraction, a decimal and a percent. 3/4, 0.75 and 75% are all the same amount.", [
      board("equivalent", 0.5, "mixed", 2, 20, { frac: { n: 1, d: 2 } }),
      board("equivalent", 0.2, "mixed", 2, 24, { frac: { n: 1, d: 5 } }),
      board("equivalent", 0.75, "mixed", 2, 28, { frac: { n: 3, d: 4 } }),
    ]),
    lvl(4, "g4-6", "Bigger or Smaller Than a Half", "g4.compare-fractions", "Skill: comparing fractions, decimals and percents. If the top is more than half the bottom, the fraction is more than a half.", [
      board("greater", 0.5, "mixed", 2, 14, { show: "1/2" }),
      board("less", 0.25, "mixed", 2, 16, { show: "1/4" }),
      board("greater", 1, "fraction", 2, 18),
    ]),
    lvl(4, "g4-1", "Factor Forest", "g4.factors-primes", "Skill: finding factors. A factor divides the number at the top with nothing left over. 6 is a factor of 24 because 24 ÷ 6 = 4.", [
      board("multiples", 4, "plain", 1, 40),
      board("factors", 24, "plain", 1, 36),
      board("factors", 36, "plain", 1, 42),
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
      board("equals", 9, "fact", 5, 90),
      board("equals", 60, "fact", 10, 140),
      board("equals", 84, "fact", 10, 180),
    ]),
  ],
  5: [
    lvl(5, "g5-1", "Multiple Mountain", "g3.mult-facts", "Skill: the harder times tables. Count by 7s, 8s and 12s and eat every number you land on.", [
      board("multiples", 7, "plain", 5, 90),
      board("multiples", 8, "plain", 5, 100),
      board("multiples", 12, "plain", 5, 144),
    ]),
    lvl(5, "g5-2", "Factor Falls", "g4.factors-primes", "Skill: factors of bigger numbers. Try each one: does it divide the number at the top with nothing left over?", [
      board("multiples", 9, "plain", 1, 70),
      board("factors", 72, "plain", 1, 76),
      board("factors", 84, "plain", 1, 88),
    ]),
    lvl(5, "g5-5", "Simplest Form", "g4.equiv-fractions", "Skill: simplest form. A fraction is in simplest form when nothing but 1 divides into both numbers - 6/8 is not, because both halve to 3/4.", [
      board("simplest", 0, "fraction", 2, 12),
      board("simplest", 0, "fraction", 2, 16),
      board("simplest", 0, "fraction", 2, 20),
    ]),
    lvl(5, "g5-6", "Percent Pursuit", "g6.percent", "Skill: finding a percent of a number. To find 25% of 80, find 1% first - that is 80 ÷ 100 - then take 25 of them.", [
      board("percentOf", 50, "fact", 1, 50, { of: 16 }),
      board("percentOf", 25, "fact", 1, 60, { of: 80 }),
      board("percentOf", 10, "fact", 1, 90, { of: 300 }),
    ]),
    lvl(5, "g5-3", "Order of Operations", "g5.order-of-operations", "Skill: the order of operations. Multiply and divide before you add and subtract, so 4 + 2 × 8 is 20, not 48.", [
      board("equals", 9, "twostep", 5, 60),
      board("equals", 30, "twostep", 5, 80),
      board("equals", 45, "twostep", 5, 99),
    ]),
    lvl(5, "g5-4", "Prime Hunt", "g4.factors-primes", "Skill: primes up to 100. The sneaky ones are 51, 57, 87 and 91 - they look prime but they are not.", [
      board("primes", 0, "plain", 2, 100),
      board("primes", 0, "plain", 20, 130),
      board("composites", 0, "plain", 20, 160),
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
    board("less", 0, "signed", -36, 36),
    board("greater", -5, "signed", -40, 40),
    board("equals", -12, "signed", -60, 60),
  ]),
  lvl(6, "b-ratios", "Ratio Road", "g6.ratios", "Skill: equal ratios. 3:4 and 6:8 are the same mix - double both sides and nothing changes.", [
    board("equivalent", 0.5, "ratio", 2, 20, { frac: { n: 1, d: 2 }, show: "1:2" }),
    board("equivalent", 2 / 3, "ratio", 3, 24, { frac: { n: 2, d: 3 }, show: "2:3" }),
    board("equivalent", 0.75, "ratio", 4, 28, { frac: { n: 3, d: 4 }, show: "3:4" }),
  ]),
  lvl(6, "b-powers", "Power Peaks", "g6.exponents", "Skill: squares and powers. 4^3 means 4 × 4 × 4, which is 64 - not 4 × 3.", [
    board("squares", 0, "plain", 1, 150),
    board("squares", 0, "plain", 1, 400),
    board("less", 100, "power", 4, 1000),
  ]),
  lvl(6, "b-common", "Common Ground", "g6.gcf-lcm", "Skill: common multiples and common factors. A number has to work for both, not just one of them.", [
    board("commonMultiples", 2, "plain", 1, 70, { of: 3 }),
    board("commonFactors", 48, "plain", 1, 50, { of: 72 }),
    board("commonMultiples", 6, "plain", 1, 250, { of: 8 }),
  ]),
  lvl(7, "b-xmarks", "X Marks the Spot", "g6.evaluate-expressions", "Skill: working out an expression once you know what x is. Put the number where the x is, then do the sum.", [
    board("evaluates", 8, "variable", 1, 60, { of: 2 }),
    board("evaluates", 24, "variable", 1, 80, { of: 3 }),
    board("evaluates", 36, "variable", 1, 90, { of: 6 }),
  ]),
  lvl(7, "b-percent", "Percent Problems", "g7.percent-problems", "Skill: percents of harder numbers. 15% is 10% plus half of it again, which beats reaching for a calculator.", [
    board("percentOf", 12.5, "fact", 1, 100, { of: 64 }),
    board("percentOf", 15, "fact", 1, 120, { of: 240 }),
    board("percentOf", 80, "fact", 1, 200, { of: 45 }),
  ]),
];

/**
 * The ladder: every level there is, easiest first, kindergarten counting
 * through to expressions with an x in them.
 *
 * Everybody climbs the same ladder from the bottom, whatever grade they are
 * in. A kid who knows their facts goes through the early rungs in a couple of
 * minutes each and gets a refresher on the way; a kid who does not finds out
 * exactly where the gap is, which is the point of drill. Three stars on a
 * rung opens the next one.
 */
export const ALL_CHOMPER_LEVELS: ChomperLevel[] = [
  ...[0, 1, 2, 3, 4, 5].flatMap((g) => CHOMPER_LEVELS[g] ?? []),
  ...BAND_ONLY_LEVELS,
].sort((a, b) => a.grade - b.grade);

export const levelById = (id: string): ChomperLevel | undefined => ALL_CHOMPER_LEVELS.find((l) => l.id === id);


// ---------------- Scoring ----------------

/**
 * Moves the Chomper makes for every one the Grumbles make. They move with the
 * board, not against a clock: three steps of yours to one of theirs, so you
 * can always see them coming and nothing happens while you are thinking.
 *
 * The clock on the board is what does the hurrying. The Grumbles are what
 * punishes a careless route.
 */
export const MONSTER_EVERY = 3;
/** The same, for a kid who has three-starred the rung and wants it harder. */
export const QUICK_MONSTER_EVERY = 2;

export const monsterEvery = (quick: boolean) => (quick ? QUICK_MONSTER_EVERY : MONSTER_EVERY);

/** One board's worth of what the kid did. The seed is what the board was built from. */
export interface BoardMove {
  seed: number;
  acts: Act[];
  /** Quick mode: the Grumbles move oftener. Earned by three-starring the rung. */
  quick?: boolean;
  /** A third go at a level they have not got yet: more lives, no cut-off. */
  easy?: boolean;
}

/**
 * Plays one board through, in whichever mode the moves say.
 *
 * The clock in Quick mode is restarted by a life lost, and it restarts at the
 * exact moment the life was lost - which is a tick boundary worked out from
 * the numbers, never from when the browser happened to notice. That is what
 * lets the screen and the server, which see the game at completely different
 * moments, land on the same answer.
 */
/**
 * The seed for a given try at a board. Every try gets its own numbers: a kid
 * who has just lost one should be solving the thing again, not remembering
 * where the right squares were last time.
 */
export const trySeed = (seed: number, tryNo: number) => ((seed >>> 0) + tryNo * 7919) % 2147483647;

export function playBoard(spec: BoardSpec, boardIndex: number, mv: BoardMove, lives: number): ChomperState {
  const quick = !!mv.quick;
  let tryNo = 0;
  let board = buildBoard(spec, boardIndex, trySeed(mv.seed, tryNo));
  let st = startState(board, lives);
  for (const a of mv.acts) {
    const had = st.lives;
    st = step(board, st, a, quick);
    if (st.over || st.cleared) break;
    if (st.lives < had) {
      // A fresh set of numbers for the fresh try, and the Grumbles that come
      // with them.
      tryNo++;
      board = buildBoard(spec, boardIndex, trySeed(mv.seed, tryNo));
      st = { ...st, foes: board.grumbles.map((g) => ({ ...g })) };
    }
  }
  return st;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): BoardMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 8).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const n = Number(o.seed);
    const seed = Number.isFinite(n) ? Math.abs(Math.trunc(n)) % 2147483647 : 0;
    const acts = Array.isArray(o.acts) ? (o.acts.slice(0, MAX_ACTS).filter((a): a is Act => typeof a === "string" && (ACTS as string[]).includes(a))) : [];
    const out: BoardMove = { seed, acts };
    if (o.easy === true) out.easy = true;
    if (o.quick === true) out.quick = true;
    return out;
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
    if (!mv) return { points: 0, max: maxFor(spec), cleared: false, wrong: 0, caught: 0, eaten: 0 };
    // A fresh set of lives for every board.
    const st = playBoard(spec, i, mv, mv.easy ? EASY_LIVES : LIVES);
    lives = st.lives;
    // The best of the tries, so an earlier good run is never thrown away by
    // a worse one afterwards.
    return { points: Math.max(st.points, st.best), max: maxFor(spec), cleared: st.cleared, wrong: st.wrong, caught: st.caught, eaten: st.eaten.filter(Boolean).length };
  });
  const points = boards.reduce((t, b) => t + b.points, 0);
  const max = maxForLevel(level);
  return { boards, points, max, stars: starsFor(points, max), lives };
}

// ---------------- Finding out where to start ----------------

/** Questions in the sit-down assessment. Short: it is a placement, not a test. */
export const PLACEMENT_QUESTIONS = 8;
/** Squares in each one, and how many of them fit the rule. */
export const PLACEMENT_CELLS = 6;
export const PLACEMENT_RIGHT = 2;

export interface PlacementQuestion {
  /** The rung this question came from, as an index into the ladder. */
  rung: number;
  /** What that rung is called, so the result can say what they are starting on. */
  title: string;
  label: string;
  cells: Cell[];
}

/** The rungs the assessment samples: evenly up the ladder, always ending at the top. */
export function placementRungs(total = ALL_CHOMPER_LEVELS.length): number[] {
  const n = Math.min(PLACEMENT_QUESTIONS, total);
  const out = Array.from({ length: n }, (_, i) => Math.round((i * (total - 1)) / (n - 1)));
  return [...new Set(out)];
}

/**
 * The assessment: a handful of one-row boards taken from up and down the
 * ladder, easiest first.
 *
 * It exists because everybody starts at the bottom of the ladder, which is
 * right for a six-year-old and insulting for a thirteen-year-old. Six squares
 * and a rule is the game in miniature, so it measures the thing the game
 * measures rather than something adjacent to it.
 */
export function placementQuestions(seed: number): PlacementQuestion[] {
  return placementRungs().map((rung) => {
    const level = ALL_CHOMPER_LEVELS[rung];
    const spec = { ...level.boards[0], right: PLACEMENT_RIGHT };
    const r = seededRng((seed >>> 0) * 7919 + rung * 31 + 1);
    const { yes, no } = split(spec);
    // An "Equals 42" rung has one value written a dozen ways, so a row of six
    // squares has to draw on it more than once, exactly as a full board does.
    const take = (from: Cand[], n: number) => {
      const out = shuffle(r, from).slice(0, n);
      while (out.length < n && from.length) out.push(from[out.length % from.length]);
      return out;
    };
    const picked = shuffle(r, [...take(yes, PLACEMENT_RIGHT), ...take(no, PLACEMENT_CELLS - PLACEMENT_RIGHT)]);
    const used = new Set<string>();
    const cells: Cell[] = picked.map((c) => {
      const text = c.text ?? cellText(r, c.value, spec, used);
      used.add(text);
      return { text, value: c.value, frac: c.frac, ...(c.art && { art: c.art }), ok: fits(spec.rule, c) };
    });
    return { rung, title: level.title, label: ruleLabel(spec.rule), cells };
  });
}

/**
 * Where the assessment puts them: the first rung they got wrong.
 *
 * Everything below it is theirs already and opens up, so they can go back and
 * refresh whenever they like; the rung they tripped on is where the work is.
 * Getting the lot right opens the whole ladder.
 */
export function placeFrom(seed: number, picks: number[][]): { rung: number; title: string; right: number; asked: number } {
  const qs = placementQuestions(seed);
  let right = 0;
  for (let i = 0; i < qs.length; i++) {
    const want = new Set(qs[i].cells.map((c, n) => (c.ok ? n : -1)).filter((n) => n >= 0));
    const got = new Set((picks[i] ?? []).filter((n) => Number.isInteger(n) && n >= 0 && n < PLACEMENT_CELLS));
    const correct = got.size === want.size && [...want].every((n) => got.has(n));
    if (!correct) return { rung: qs[i].rung, title: qs[i].title, right, asked: qs.length };
    right++;
  }
  const last = ALL_CHOMPER_LEVELS.length - 1;
  return { rung: last, title: ALL_CHOMPER_LEVELS[last].title, right, asked: qs.length };
}

/** The questions with the answers taken out, which is all the browser ever sees. */
export const publicPlacement = (qs: PlacementQuestion[]) =>
  qs.map((q) => ({ rung: q.rung, title: q.title, label: q.label, cells: q.cells.map(({ text, art }) => ({ text, ...(art && { art }) })) }));

// ---------------- Playing it well (the worked example the tests measure against) ----------------

/**
 * How a sensible player would move next.
 *
 * Grumbles that hunt cannot be planned around exactly the way straight-line
 * ones could - where they go depends on where the Chomper goes, so there is
 * no fixed pattern to search. This looks a few steps ahead instead: it works
 * out where every Grumble would be if it carried on, throws away any move
 * that walks into one, and of what is left takes the move that gets closest
 * to the nearest square still worth eating.
 *
 * It is the stand-in for a competent kid, and it is what the tests use to
 * check a board can actually be cleared.
 */
export function bestMove(board: Board, st: ChomperState): Act | null {
  const left = board.cells.map((c, i) => (c.ok && !st.eaten[i] ? i : -1)).filter((i) => i >= 0);
  if (!left.length) return null;
  const here = st.y * COLS + st.x;
  if (left.includes(here) && !threatened(board, st, st.x, st.y, LOOK_AHEAD_MUNCH)) return "munch";

  const near = left
    .map((i) => ({ x: i % COLS, y: Math.floor(i / COLS) }))
    .reduce((a, b) => (dist(a, st) <= dist(b, st) ? a : b));

  const tries = (["up", "down", "left", "right"] as const).map((act) => {
    const [dx, dy] = DIRS[act];
    const nx = st.x + dx;
    const ny = st.y + dy;
    const ok = onBoard(nx, ny);
    const to = { x: ok ? nx : st.x, y: ok ? ny : st.y };
    return { act, to, wall: !ok, danger: threatened(board, st, to.x, to.y, LOOK_AHEAD), gap: dist(to, near) };
  });

  // Somewhere safe that gets us closer; failing that, anywhere safe; failing
  // that, whatever keeps the most Grumbles at arm's length.
  // Closest to the next thing worth eating, with elbow room from the
  // Grumbles worth something too - a step nearer the answer is not worth
  // taking if it walks into a corner with a Grumble in it.
  const score = (t: (typeof tries)[number]) => t.gap * 2 - Math.min(roomAround(st, t.to), 4);
  const better = (a: (typeof tries)[number], b: (typeof tries)[number]) => (score(a) <= score(b) ? a : b);
  const safe = tries.filter((t) => !t.danger && !t.wall);
  if (safe.length) return safe.reduce(better).act;
  const anySafe = tries.filter((t) => !t.danger);
  if (anySafe.length) return anySafe.reduce(better).act;
  return tries.reduce((a, b) => (roomAround(st, a.to) >= roomAround(st, b.to) ? a : b)).act;
}

/** How far apart two squares are, counting only sideways and up-and-down steps. */
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

/** The nearest Grumble, for choosing between two bad options. */
const roomAround = (st: ChomperState, at: { x: number; y: number }) => Math.min(...st.foes.map((g) => dist(g, at)), 99);

/**
 * How far ahead to look before stepping somewhere. Two steps: far enough to
 * see the square a Grumble is about to arrive on, close enough that it still
 * commits to a move. One step walks into obvious traps; three has it hiding
 * in a corner, because a hunter is near you most of the time and a player
 * who waits for it to be far away never eats anything.
 */
const LOOK_AHEAD = 2;
/** Munching is a turn spent standing still, so it needs the same clearance. */
const LOOK_AHEAD_MUNCH = 2;

/**
 * Whether standing on a square is about to go wrong: a Grumble there now, or
 * one that reaches it within the next few of its steps if the Chomper stays
 * put. A chaser is assumed to keep coming, which is exactly what it does.
 */
function threatened(board: Board, st: ChomperState, x: number, y: number, ahead: number): boolean {
  if (st.foes.some((g) => g.x === x && g.y === y)) return true;
  let foes = st.foes;
  for (let n = 0; n < ahead; n++) {
    foes = foes.map((g, i) => grumbleStep(g, board, st.phase + n, i, { x, y }));
    if (foes.some((g) => g.x === x && g.y === y)) return true;
  }
  return false;
}

/** A good run of a level: what a kid who knows the facts and keeps moving gets. */
export function perfectMoves(level: ChomperLevel): BoardMove[] {
  return level.boards.map((spec, i) => {
    const seed = i + 1;
    const b = buildBoard(spec, i, seed);
    const acts: Act[] = [];
    let st = startState(b);
    while (!st.cleared && !st.over && acts.length < MAX_ACTS - 1) {
      const a = bestMove(b, st);
      if (!a) break;
      acts.push(a);
      st = step(b, st, a);
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

const DOT = "#2340ff";
const FRAME = "#9aa7d6";
const SILVER = "#c9ced9";
const SILVER_D = "#8e94a3";
const COPPER = "#c87a3c";
const COPPER_D = "#96572a";

/**
 * A ten frame of dots, the way an infant classroom draws them: two rows of
 * five, filled left to right, so a kid learns to see 7 as "a full five and
 * two more" instead of counting one at a time. Over ten it uses two frames.
 */
export function dotsGrid(n: number): Grid {
  const frames = Math.min(2, Math.ceil(Math.max(1, n) / 10));
  const g = new Grid(27, frames === 1 ? 13 : 27);
  for (let f = 0; f < frames; f++) {
    const top = f * 14;
    g.rect(0, top, 27, 13, null);
    for (let i = 0; i < 10; i++) {
      const cx = 2 + (i % 5) * 5;
      const cy = top + 2 + Math.floor(i / 5) * 5;
      g.rect(cx, cy, 4, 4, FRAME);
      g.rect(cx + 1, cy + 1, 2, 2, null);
      if (f * 10 + i < n) g.disc(cx + 1.5, cy + 1.5, 1.6, DOT);
    }
  }
  return g.outline(OUT);
}

/**
 * One coin. On the board it gets a canvas that fits it snugly, so a handful
 * of them is drawn as big as the square allows. For the key at the top it
 * gets the same canvas as every other coin, so they can all be scaled to one
 * height and a quarter still looks bigger than a dime.
 */
export function coinGrid(cents: number, uniform = false): Grid {
  const r = cents === 25 ? 7 : cents === 5 ? 5.5 : cents === 1 ? 4.5 : 3.5;
  const face = cents === 1 ? COPPER : SILVER;
  const edge = cents === 1 ? COPPER_D : SILVER_D;
  const w = uniform ? COIN_CANVAS : Math.ceil(r * 2) + 2;
  const g = new Grid(w, w);
  const c = (w - 1) / 2;
  g.disc(c, c, r, edge).disc(c, c, r - 1.2, face);
  // A mark per coin: a quarter has a cross, a nickel a bar, a dime a dot, a
  // penny a ring. Four shapes a kid learns in one go - and in a much darker
  // ink than the coin's edge, because at the size these are drawn on the
  // board a faint mark is no mark at all.
  const mark = shade(face, -0.5);
  const m = Math.round(c);
  if (cents === 25) g.rect(m - 3, m - 1, 7, 2, mark).rect(m - 1, m - 3, 2, 7, mark);
  else if (cents === 5) g.rect(m - 2, m - 1, 5, 2, mark);
  else if (cents === 10) g.rect(m - 1, m - 1, 2, 2, mark);
  else g.disc(c, c, 2.4, mark).disc(c, c, 1.2, face);
  return g;
}

/**
 * A handful of coins, biggest first, in up to two rows so five of them still
 * read at the size of a board square. All of them are drawn: a picture that
 * left one out would be worth less than the cell says it is.
 */
export function coinsGrid(parts: number[]): Grid {
  const coins = [...parts].sort((a, b) => b - a).map((c) => coinGrid(c));
  const perRow = coins.length > 3 ? Math.ceil(coins.length / 2) : coins.length;
  const rows: Grid[][] = [];
  for (let i = 0; i < coins.length; i += perRow) rows.push(coins.slice(i, i + perRow));
  const rowW = rows.map((r) => r.reduce((t, c) => t + c.w + 1, -1));
  const rowH = rows.map((r) => Math.max(...r.map((c) => c.h)));
  const g = new Grid(Math.max(1, Math.max(...rowW)), Math.max(1, rowH.reduce((t, h) => t + h + 1, -1)));
  let y = 0;
  rows.forEach((row, ri) => {
    let x = 0;
    for (const c of row) {
      g.draw(c, x, y + rowH[ri] - c.h);
      x += c.w + 1;
    }
    y += rowH[ri] + 1;
  });
  return g.outline(OUT);
}

const GRUMBLE_SKIN: Record<GrumbleKind, string> = { plodder: "#b14bd8", rover: "#f0803c", chaser: "#d6202c" };
/** The hunter's eyes. Not black like the others - it is looking at you. */
const GLARE = "#ffd43b";

/** A Grumble: a lumpy little patroller. Frame 1 lifts its feet. */
/**
 * A Grumble. The hunter is drawn bigger and angrier than the roamers -
 * taller horns, a proper set of fangs, eyes narrowed and fixed forward -
 * because "it is the red one" is not something a kid should have to
 * remember while also working out whether 51 is prime.
 *
 * `calm` draws the hunter on its breather: eyes shut, horns down, mouth
 * closed. The rhythm of it coming for you and then losing interest is the
 * thing that makes the board playable, so it should be visible.
 */
export function grumbleGrid(kind: GrumbleKind = "plodder", frame = 0, calm = false): Grid {
  const hunter = kind === "chaser" && !calm;
  const skin = calm ? shade(GRUMBLE_SKIN[kind], 0.35) : GRUMBLE_SKIN[kind];
  const g = new Grid(14, 14);
  g.disc(6.5, hunter ? 6.6 : 7, hunter ? 6 : 5.4, skin);
  g.rect(hunter ? 0 : 1, 7, hunter ? 13 : 11, 5, skin);

  if (hunter) {
    // Fangs: pointed, and more of them.
    for (let x = 1; x < 13; x += 2) g.rect(x, 10, 1, 2, TOOTH);
    g.rect(1, 10, 12, 1, TOOTH);
    // Horns that mean it.
    g.tri(2, 0, 4, 2, skin).tri(11, 0, 4, 2, skin);
    g.tri(6, 1, 4, 1, skin);
  } else {
    for (let x = 2; x < 12; x += 3) g.rect(x, 11, 2, 1, TOOTH);
    g.tri(3, calm ? 2 : 0, 3, 2, skin).tri(10, calm ? 2 : 0, 3, 2, skin);
  }

  // Feet shuffle.
  g.rect(frame ? 1 : 2, 12, 3, 2, skin).rect(frame ? 9 : 8, 12, 3, 2, skin);

  if (calm) {
    // Eyes shut: it has lost you for the moment.
    g.rect(3, 6, 3, 1, OUT).rect(8, 6, 3, 1, OUT);
    g.rect(5, 9, 4, 1, shade(skin, -0.3));
    return g.outline(OUT);
  }

  g.disc(4, 6, hunter ? 2 : 1.6, EYE_W).disc(9, 6, hunter ? 2 : 1.6, EYE_W);
  if (hunter) {
    // A glare: brows down over the eyes, pupils forward.
    g.rect(2, 4, 4, 2, skin).rect(8, 4, 4, 2, skin);
    g.rect(4, 6, 2, 2, GLARE).rect(8, 6, 2, 2, GLARE);
  } else {
    g.set(4, 6, PUPIL).set(9, 6, PUPIL);
  }
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

/** The ladder, as the game host wants it. */
const ladder = () => ALL_CHOMPER_LEVELS.map(({ id, title, intro }) => ({ id, title, intro }));

export const chompers: MiniGame = {
  ...chompersInfo,
  // The same ladder for everybody, in both worlds: this is drill, and drill
  // starts at the bottom whatever it says on your birth certificate.
  levels: () => ladder(),
  levelsForGrade: () => ladder(),
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
