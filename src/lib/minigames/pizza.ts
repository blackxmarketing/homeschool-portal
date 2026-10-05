import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";
import type { Band } from "../pixel/world";

/**
 * Pizza Party (Math Mountains). Friends sit at a table with whole pizzas.
 * Each round the kid:
 *   1. picks how many equal slices to cut every pizza into (2, 3, 4, 6, 8, 12),
 *   2. deals the slices onto the plates so every friend gets the same share
 *      with nothing left over,
 *   3. names the share as a fraction (or mixed number) of a pizza.
 * Equivalent fractions are accepted; the simplest cut (fewest slices that
 * still share fairly) earns the extra point. Strategist rounds also ask for
 * the share in simplest form and as a decimal.
 *
 * Pure (no randomness at all), so the server can replay the kid's moves.
 */

export const pizzaPartyInfo = { id: "pizza", title: "Pizza Party", icon: "🍕", land: "math" as const, blurb: "Cut pizzas and share the slices so everyone gets an equal share, then name the fraction." };

export const CUTS = [2, 3, 4, 6, 8, 12] as const;

export interface PizzaRound {
  pizzas: number;
  friends: number;
}

export interface PizzaLevel extends MiniLevel {
  band: Band;
  rounds: PizzaRound[];
  /** Strategist: the share must be written in simplest form and as a decimal. */
  challenge: boolean;
  /** Answer tries that still earn the answer point. */
  freeTries: number;
}

export const MAX_TRIES = 3;

const lvl = (band: Band, id: string, title: string, intro: string, rounds: [number, number][]): PizzaLevel => ({
  band,
  id,
  title,
  intro,
  rounds: rounds.map(([pizzas, friends]) => ({ pizzas, friends })),
  challenge: band === "strategist",
  freeTries: band === "sprout" ? 3 : 2,
});

export const PIZZA_LEVELS: Record<Band, PizzaLevel[]> = {
  sprout: [
    lvl("sprout", "s1", "Halves and Fourths", "Cut each pizza into equal slices so every friend gets the same amount. Then say what part of a pizza each friend got!", [
      [1, 2],
      [1, 4],
      [3, 4],
    ]),
    lvl("sprout", "s2", "Thirds", "Three friends are hungry! Thirds are 3 equal parts of a whole. Share fairly and name each friend's part.", [
      [1, 3],
      [2, 3],
      [2, 4],
    ]),
    lvl("sprout", "s3", "Party Mix", "Bigger party! Pick a cut that shares evenly with nothing left over. Fewer slices is smarter.", [
      [2, 3],
      [3, 4],
      [2, 6],
      [3, 6],
    ]),
  ],
  adventurer: [
    lvl("adventurer", "a1", "More Than One Each", "More pizzas than friends! Everyone gets at least a whole pizza. Write the share as a mixed number like 1 1/2 (or an improper fraction like 3/2).", [
      [3, 2],
      [5, 4],
      [4, 3],
    ]),
    lvl("adventurer", "a2", "Mixed Numbers", "Pizzas ÷ friends = each friend's share. Cut, deal and name it as a fraction or mixed number.", [
      [5, 3],
      [7, 4],
      [5, 6],
      [4, 6],
    ]),
    lvl("adventurer", "a3", "Big Party", "A big table and lots of pizza. Find the cut with the fewest slices that still shares evenly.", [
      [3, 8],
      [7, 6],
      [9, 4],
      [6, 8],
      [10, 12],
    ]),
  ],
  strategist: [
    lvl("strategist", "h1", "Lowest Terms", "Each share is pizzas ÷ friends. Cut with the fewest slices, then write the share in simplest form and as a decimal.", [
      [6, 8],
      [9, 12],
      [10, 4],
    ]),
    lvl("strategist", "h2", "Twelfths", "Some shares make repeating decimals. Round those to at least 2 decimal places (2/3 ≈ 0.67).", [
      [5, 12],
      [7, 8],
      [11, 6],
      [8, 12],
    ]),
    lvl("strategist", "h3", "Grand Banquet", "A banquet with no waste allowed. Least slices, simplest form, and the decimal for every share.", [
      [15, 6],
      [10, 8],
      [14, 12],
      [9, 8],
      [16, 12],
    ]),
  ],
};

export function levelById(id: string): PizzaLevel | undefined {
  return Object.values(PIZZA_LEVELS)
    .flat()
    .find((l) => l.id === id);
}

// ---------------- Fraction math ----------------

export const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

export interface Frac {
  n: number;
  d: number;
}

export const reduce = ({ n, d }: Frac): Frac => {
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
};

/** Each friend's share of a pizza: pizzas / friends, in lowest terms. */
export const shareOf = (r: PizzaRound): Frac => reduce({ n: r.pizzas, d: r.friends });

/** A cut works when the slices split evenly among the friends. */
export const cutWorks = (r: PizzaRound, cut: number) => (CUTS as readonly number[]).includes(cut) && (r.pizzas * cut) % r.friends === 0;

/** The smallest cut that shares evenly (the "simplest cut"). */
export const simplestCut = (r: PizzaRound): number | undefined => CUTS.find((c) => cutWorks(r, c));

/** "7/4" → "1 3/4", "1/2" stays, "2/1" → "2". */
export function mixed({ n, d }: Frac): string {
  const f = reduce({ n, d });
  if (f.d === 1) return String(f.n);
  const whole = Math.floor(f.n / f.d);
  const rest = f.n - whole * f.d;
  return whole ? `${whole} ${rest}/${f.d}` : `${rest}/${f.d}`;
}

export type FracForm = "whole" | "fraction" | "mixed" | "decimal";

export interface ParsedNumber {
  value: Frac;
  form: FracForm;
  /** Written in lowest terms (fractions and mixed numbers). */
  simplest: boolean;
  /** Digits after the decimal point (decimals only). */
  places: number;
}

/** Reads what the kid typed: "3/4", "1 2/3", "1-2/3", "2", "0.75". Never throws. */
export function parseNumber(raw: unknown): ParsedNumber | null {
  if (typeof raw !== "string" || raw.length > 24) return null;
  const s = raw.trim().replace(/[⁄÷]/g, "/").replace(/\s+/g, " ");
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(\d{1,4})$/))) return { value: { n: Number(m[1]), d: 1 }, form: "whole", simplest: true, places: 0 };
  if ((m = s.match(/^(\d{1,4}) ?\/ ?(\d{1,4})$/))) {
    const n = Number(m[1]);
    const d = Number(m[2]);
    if (d === 0) return null;
    return { value: { n, d }, form: "fraction", simplest: d > 1 && gcd(n, d) === 1, places: 0 };
  }
  if ((m = s.match(/^(\d{1,4})(?: |-| and )(\d{1,4}) ?\/ ?(\d{1,4})$/))) {
    const w = Number(m[1]);
    const n = Number(m[2]);
    const d = Number(m[3]);
    if (d === 0 || n === 0 || n >= d) return null;
    return { value: { n: w * d + n, d }, form: "mixed", simplest: gcd(n, d) === 1, places: 0 };
  }
  if ((m = s.match(/^(\d{0,4})\.(\d{1,6})$/))) {
    const places = m[2].length;
    const d = 10 ** places;
    return { value: { n: Number(m[1] || "0") * d + Number(m[2]), d }, form: "decimal", simplest: false, places };
  }
  return null;
}

const same = (a: Frac, b: Frac) => a.n * b.d === b.n * a.d;

export interface AnswerTry {
  fraction: string;
  decimal?: string;
}

export interface AnswerCheck {
  correct: boolean;
  /** Teaching feedback for this try. */
  note: string;
}

/** The decimal for a share, rounded to `places` (for feedback). */
export const decimalOf = (f: Frac, places = 3) => {
  const v = f.n / f.d;
  const s = v.toFixed(places).replace(/0+$/, "").replace(/\.$/, "");
  return s;
};

const exactDecimal = (f: Frac) => {
  let d = reduce(f).d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
};

/** Is a typed decimal right: exact, or correctly rounded to 2+ places? */
function decimalOk(p: ParsedNumber, share: Frac): boolean {
  if (p.form !== "decimal" && p.form !== "whole") return false;
  if (same(p.value, share)) return true;
  if (p.places < 2) return false;
  // share rounded half-up to p.places, in whole units of 10^-places (integer math, no float error)
  const scale = 10 ** p.places;
  const target = Math.floor((2 * share.n * scale + share.d) / (2 * share.d));
  return p.form === "decimal" && p.value.n === target;
}

/** Checks one answer try for a round. */
export function checkAnswer(level: PizzaLevel, round: PizzaRound, t: AnswerTry): AnswerCheck {
  const share = shareOf(round);
  const p = parseNumber(t.fraction);
  if (!p) return { correct: false, note: "Type a fraction like 3/4 or a mixed number like 1 2/3." };
  if (!level.challenge) {
    if (same(p.value, share)) return { correct: true, note: "" };
    return { correct: false, note: wrongNote(p.value, round) };
  }
  // Strategist: simplest form and a decimal.
  if (p.form === "decimal") return { correct: false, note: "Write the first answer as a fraction or mixed number; the decimal goes in the second box." };
  if (!same(p.value, share)) return { correct: false, note: wrongNote(p.value, round) };
  if (!p.simplest) return { correct: false, note: `${t.fraction.trim()} is equal to the share, but it isn't in simplest form. Divide the top and bottom by their greatest common factor.` };
  const dp = parseNumber(t.decimal ?? "");
  if (!dp || !decimalOk(dp, share)) {
    return {
      correct: false,
      note: exactDecimal(share)
        ? `Fraction ✓. For the decimal, divide ${share.n} ÷ ${share.d}.`
        : `Fraction ✓. ${share.n} ÷ ${share.d} repeats forever, so round it to at least 2 decimal places.`,
    };
  }
  return { correct: true, note: "" };
}

function wrongNote(v: Frac, r: PizzaRound): string {
  const share = shareOf(r);
  const val = v.n / v.d;
  const target = share.n / share.d;
  if (same(v, { n: r.friends, d: r.pizzas })) return `That's upside down: it's ${r.pizzas} pizzas shared by ${r.friends} friends, so pizzas go on top (pizzas ÷ friends).`;
  if (val > target) return "Too much! If every friend got that, you'd need more pizza than is on the table.";
  return "Too little! There would be pizza left over. Count the slices on one plate and how many slices make a whole pizza.";
}

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  cut: number;
  plates: number[];
  answers: AnswerTry[];
}

export interface RoundResult {
  round: PizzaRound;
  cut: number;
  fair: boolean;
  /** Which try was right (0-based), or -1. */
  rightOn: number;
  simplest: boolean;
  points: number;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const plates = Array.isArray(o.plates) ? o.plates.slice(0, 20).map((n) => (typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 500 ? n : -1)) : [];
    const answers = Array.isArray(o.answers)
      ? o.answers.slice(0, MAX_TRIES).map((a) => {
          const t = (a && typeof a === "object" ? a : {}) as Record<string, unknown>;
          return { fraction: typeof t.fraction === "string" ? t.fraction.slice(0, 24) : "", decimal: typeof t.decimal === "string" ? t.decimal.slice(0, 24) : undefined };
        })
      : [];
    return { cut: typeof o.cut === "number" && Number.isInteger(o.cut) ? o.cut : 0, plates, answers };
  });
}

/** Scores one round: 1 point for a fair share, 1 for naming it, 1 for the simplest cut. */
export function scoreRound(level: PizzaLevel, round: PizzaRound, move: RoundMove | undefined): RoundResult {
  const empty = { round, cut: move?.cut ?? 0, fair: false, rightOn: -1, simplest: false, points: 0 };
  if (!move || !cutWorks(round, move.cut)) return empty;
  const each = (round.pizzas * move.cut) / round.friends;
  const fair = move.plates.length === round.friends && move.plates.every((n) => n === each);
  if (!fair) return empty;
  const rightOn = move.answers.findIndex((a) => checkAnswer(level, round, a).correct);
  const simplest = move.cut === simplestCut(round);
  const points = 1 + (rightOn >= 0 && rightOn < level.freeTries ? 1 : 0) + (simplest ? 1 : 0);
  return { round, cut: move.cut, fair, rightOn, simplest, points };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: PizzaLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(level, r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 3;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export function perfectMoves(level: PizzaLevel): RoundMove[] {
  return level.rounds.map((r) => {
    const cut = simplestCut(r) ?? 12;
    const share = shareOf(r);
    return {
      cut,
      plates: Array.from({ length: r.friends }, () => (r.pizzas * cut) / r.friends),
      answers: [{ fraction: mixed(share), decimal: level.challenge ? decimalOf(share, 2) : undefined }],
    };
  });
}

// ---------------- Pixel art ----------------

const CRUST = "#d68a3a";
const CRUST_DARK = "#a8641f";
const CHEESE = "#ffd25a";
const SAUCE = "#e8a33a";
const PEPPERONI = "#c0392b";
const PAN = "#c9ced9";
const PAN_RIM = "#aab1c0";
const PIZZA_OUTLINE = "#1b1530";

/**
 * A round pizza cut into `cut` wedges with `present` of them still there
 * (the rest show the empty pan). `size` is the grid width in pixels.
 */
export function pizzaGrid(cut: number, present: number, size = 26, ghost = true): Grid {
  const g = new Grid(size, size);
  const c = (size - 1) / 2;
  const R = size / 2 - 1.2;
  const slices = Math.max(1, cut);
  const step = (Math.PI * 2) / slices;
  // Pepperoni positions (polar, in fractions of R) - the same on every pizza.
  const pepp: [number, number][] = [
    [0.3, 1.1],
    [0.62, 2.2],
    [0.66, 3.3],
    [0.35, 4.2],
    [0.65, 5.1],
    [0.7, 0.2],
    [0.25, 2.8],
    [0.6, 4.7],
  ];
  const pr = Math.max(1, size / 14);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = x - c;
      const dy = y - c;
      const dist = Math.hypot(dx, dy);
      if (dist > R + 0.3) continue;
      // angle from 12 o'clock, clockwise
      let a = Math.atan2(dx, -dy);
      if (a < 0) a += Math.PI * 2;
      const idx = Math.min(slices - 1, Math.floor(a / step));
      if (idx >= present) {
        if (ghost) g.set(x, y, dist > R - 1.5 ? PAN_RIM : PAN);
        continue;
      }
      // cut line: close to a wedge edge
      const off = Math.min(a - idx * step, (idx + 1) * step - a) * dist;
      if (cut > 1 && off < 0.55 && dist > 0.8) {
        g.set(x, y, CRUST_DARK);
        continue;
      }
      if (dist > R - 1.6) {
        g.set(x, y, CRUST);
        continue;
      }
      let col = dist > R - 2.6 ? SAUCE : CHEESE;
      for (const [pd, pa] of pepp) {
        const px = c + Math.sin(pa) * pd * R;
        const py = c - Math.cos(pa) * pd * R;
        if (Math.hypot(x - px, y - py) <= pr) col = PEPPERONI;
      }
      g.set(x, y, col);
    }
  return g.outline(PIZZA_OUTLINE);
}

/** A small plate (for a friend's place at the table). */
export function plateGrid(size = 22): Grid {
  const g = new Grid(size, Math.round(size * 0.5));
  const c = (size - 1) / 2;
  const cy = (g.h - 1) / 2;
  for (let y = 0; y < g.h; y++)
    for (let x = 0; x < size; x++) {
      const e = ((x - c) / (size / 2 - 1)) ** 2 + ((y - cy) / (g.h / 2 - 0.6)) ** 2;
      if (e <= 1) g.set(x, y, e > 0.55 ? "#e3e8f2" : "#ffffff");
    }
  return g.outline(PIZZA_OUTLINE);
}

export const pizzaParty: MiniGame = {
  ...pizzaPartyInfo,
  levels: (band) => PIZZA_LEVELS[band].map(({ id, title, intro }) => ({ id, title, intro })),
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
};
