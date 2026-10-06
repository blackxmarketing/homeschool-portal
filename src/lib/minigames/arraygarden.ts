import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Array Garden (K-5 math, grades 2, 3, 4). A pixel garden grid: the kid
 * plants flowers in rows and columns by dragging (or tapping) the corner of
 * the array, or with the row / column steppers, then taps "Plant!". Round
 * kinds:
 *
 *   build   - "Plant 3 rows of 4": then how many? (2.OA.C.4, 3.OA.A.1)
 *   fill    - fill a garden bed with same-size squares: how many squares /
 *             what is the area? (2.G.A.2, 3.MD.C.5-7)
 *   share   - share 12 flowers into 3 equal rows: how many in each row?
 *             (3.OA.A.2, 3.OA.B.6)
 *   turn    - here is 2 rows of 6: turn it into 6 rows of 2 (3.OA.B.5)
 *   split   - plant 6 x 7, then split it into two smaller arrays
 *             (distributive property, 3.OA.B.5, 3.MD.C.7c)
 *   factors - find every rectangle for n flowers; some rounds then ask
 *             "prime or composite?" (4.OA.B.4)
 *   fence   - plant a bed, then find its area and the fence around it
 *             (4.MD.A.3)
 *   side    - a bed with a known area and width: plant it to find the
 *             missing side, then the fence (4.MD.A.3)
 *   model   - 4 x 23 is too big to plant: split the area model into tens
 *             and ones (4.NBT.B.5)
 *
 * Moves per round: { plants: [rows, cols][], split?, answers: number[], shown? }.
 * score() replays them, so the server can check the stars. Scoring (3 points
 * a round):
 *   build kinds - 1 if the first planting was right, 2 if every question
 *                 was right on the first try (1 if right within 3 tries).
 *   model       - 1 for splitting into tens and ones, 2 for the questions.
 *   factors     - 2 for finding every factor pair (1 for half of them),
 *                 +1 for "prime or composite?" on the first try, or (with
 *                 no question) for 3 or fewer plantings that didn't work.
 * Pure (no randomness), so replays are deterministic.
 */

export const arrayGardenInfo = {
  id: "arraygarden",
  title: "Array Garden",
  icon: "🌷",
  land: "math" as const,
  subject: "math" as const,
  grades: [2, 3, 4],
  blurb: "Plant flowers in rows and columns to multiply, divide and find area.",
};

export type GardenRound =
  | { kind: "build"; rows: number; cols: number }
  | { kind: "fill"; rows: number; cols: number }
  | { kind: "share"; total: number; rows: number }
  | { kind: "turn"; rows: number; cols: number }
  | { kind: "split"; rows: number; cols: number }
  | { kind: "factors"; n: number; prime: boolean }
  | { kind: "fence"; rows: number; cols: number }
  | { kind: "side"; area: number; rows: number }
  | { kind: "model"; rows: number; cols: number };

export interface GardenLevel extends MiniLevel {
  grade: number;
  rounds: GardenRound[];
  /** The garden grid (columns x rows) for planting rounds. */
  gridW: number;
  gridH: number;
  /** Show the repeated-addition / multiplication sentence as a helper while answering. */
  scaffold: boolean;
  /** Fill rounds use area words (square units) instead of "squares". */
  area: boolean;
}

/** Tries per question (and wrong plantings) before the garden shows the answer. */
export const MAX_TRIES = 3;
/** Most plantings replayed per round. */
export const MAX_PLANTS = 40;
/** Factor rounds: how many rows the garden has. */
export const FACTOR_ROWS = 6;

const L = (grade: number, n: number, title: string, intro: string, rounds: GardenRound[], o: { gridW: number; gridH: number; scaffold?: boolean; area?: boolean }): GardenLevel => ({
  id: `g${grade}-${n}`,
  title,
  intro,
  grade,
  rounds,
  gridW: o.gridW,
  gridH: o.gridH,
  scaffold: o.scaffold ?? false,
  area: o.area ?? false,
});

const build = (rows: number, cols: number): GardenRound => ({ kind: "build", rows, cols });
const fill = (rows: number, cols: number): GardenRound => ({ kind: "fill", rows, cols });
const share = (total: number, rows: number): GardenRound => ({ kind: "share", total, rows });
const turn = (rows: number, cols: number): GardenRound => ({ kind: "turn", rows, cols });
const split = (rows: number, cols: number): GardenRound => ({ kind: "split", rows, cols });
const factors = (n: number, prime = false): GardenRound => ({ kind: "factors", n, prime });
const fence = (rows: number, cols: number): GardenRound => ({ kind: "fence", rows, cols });
const side = (area: number, rows: number): GardenRound => ({ kind: "side", area, rows });
const model = (rows: number, cols: number): GardenRound => ({ kind: "model", rows, cols });

export const GARDEN_LEVELS: Record<number, GardenLevel[]> = {
  2: [
    L(2, 1, "Rows of Flowers", "Skill: arrays and repeated addition (2.OA.C.4). Plant flowers in equal rows, then add the rows to find how many.", [build(2, 3), build(3, 2), build(2, 5), build(4, 2), build(3, 3)], { gridW: 5, gridH: 5, scaffold: true }),
    L(2, 2, "Square by Square", "Skill: split a rectangle into rows and columns of same-size squares (2.G.A.2). Fill each garden bed, then count the squares.", [fill(2, 2), fill(2, 4), fill(3, 3), fill(3, 5), fill(4, 4), fill(5, 3)], { gridW: 5, gridH: 5, scaffold: true }),
    L(2, 3, "Garden Planner", "Skill: arrays up to 5 by 5 (2.OA.C.4, 2.G.A.2). Plant and fill bigger gardens, then add the equal rows.", [build(4, 3), fill(3, 4), build(5, 4), fill(4, 5), build(4, 4), build(5, 5)], { gridW: 5, gridH: 5 }),
  ],
  3: [
    L(3, 1, "Equal Rows", "Skill: multiplication as equal rows and division as sharing into rows (3.OA.A.1, 3.OA.A.2). Plant the arrays and write the number sentence.", [build(3, 4), build(4, 5), share(12, 3), build(6, 3), share(20, 4), share(18, 3)], { gridW: 10, gridH: 9, scaffold: true }),
    L(3, 2, "Turn and Measure", "Skill: the commutative property (turn the array) and area in square units (3.OA.B.5, 3.MD.C.5, 3.MD.C.6, 3.MD.C.7). Turning a garden never changes how many!", [turn(2, 6), fill(4, 6), turn(3, 7), fill(5, 7), turn(4, 9), fill(6, 8)], { gridW: 10, gridH: 9, area: true }),
    L(3, 3, "Split the Garden", "Skill: the distributive property (3.OA.B.5, 3.MD.C.7c). Split a big array into two smaller ones you know, then add them.", [split(6, 7), split(4, 8), share(42, 6), split(7, 9), fill(7, 8), split(8, 7)], { gridW: 10, gridH: 9, area: true }),
  ],
  4: [
    L(4, 1, "Factor Pairs", "Skill: find all factor pairs of a number (4.OA.B.4). Every rectangle you can plant with all the flowers is a factor pair.", [factors(12), factors(16), factors(18), factors(20), factors(24)], { gridW: 24, gridH: FACTOR_ROWS }),
    L(4, 2, "Prime or Composite", "Skill: prime and composite numbers (4.OA.B.4). A prime number makes only one rectangle: 1 row. A composite number makes more.", [factors(7, true), factors(9, true), factors(13, true), factors(15, true), factors(17, true), factors(21, true)], { gridW: 21, gridH: FACTOR_ROWS }),
    L(4, 3, "Fences and Big Gardens", "Skill: area and perimeter (4.MD.A.3) and multiplying with an area model (4.NBT.B.5). Fence the beds, then split big gardens into tens and ones.", [fence(4, 6), fence(5, 8), side(36, 4), side(48, 6), model(4, 23), model(6, 47), model(7, 38)], { gridW: 10, gridH: 8 }),
  ],
};

export const ALL_GARDEN_LEVELS: GardenLevel[] = Object.values(GARDEN_LEVELS).flat();
export const levelById = (id: string): GardenLevel | undefined => ALL_GARDEN_LEVELS.find((l) => l.id === id);

// ---------------- Round facts ----------------

/** The array the kid has to plant (null for factor and area-model rounds). */
export function targetOf(r: GardenRound): { rows: number; cols: number } | null {
  switch (r.kind) {
    case "share":
      return { rows: r.rows, cols: r.total / r.rows };
    case "side":
      return { rows: r.rows, cols: r.area / r.rows };
    case "turn":
      return { rows: r.cols, cols: r.rows };
    case "factors":
    case "model":
      return null;
    default:
      return { rows: r.rows, cols: r.cols };
  }
}

/** The garden size for a round. */
export function gridOf(level: GardenLevel, r: GardenRound): { w: number; h: number } {
  if (r.kind === "factors") return { w: r.n, h: Math.min(r.n, FACTOR_ROWS) };
  return { w: level.gridW, h: level.gridH };
}

/** Does planting rows x cols finish the build? */
export function buildOk(r: GardenRound, rows: number, cols: number): boolean {
  const t = targetOf(r);
  return !!t && rows === t.rows && cols === t.cols;
}

export const needsSplit = (r: GardenRound) => r.kind === "split" || r.kind === "model";
export const splitOk = (r: GardenRound, s: unknown): s is number => needsSplit(r) && typeof s === "number" && Number.isInteger(s) && s >= 1 && s < (r as { cols: number }).cols;
/** The "smart" split for an area model: tens and ones. */
export const tensSplit = (cols: number) => cols - (cols % 10);

/** Every factor pair of n (small factor first). */
export function factorPairs(n: number): [number, number][] {
  const out: [number, number][] = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) out.push([a, n / a]);
  return out;
}
export const isPrime = (n: number) => n > 1 && factorPairs(n).length === 1;
const pairKey = (a: number, b: number) => `${Math.min(a, b)}x${Math.max(a, b)}`;

export interface Ask {
  /** The question, shown and read aloud. */
  q: string;
  answer: number;
  /** "Prime or composite?" (1 = prime, 0 = composite). */
  prime?: boolean;
  /** A strategy hint after a wrong try (never the answer). */
  hint: string;
}

const plusRow = (rows: number, cols: number) => Array(rows).fill(cols).join(" + ");

/** The questions after planting. `s` is the kid's split (split and model rounds). */
export function asksFor(level: GardenLevel, r: GardenRound, s?: number): Ask[] {
  const g2 = level.grade === 2;
  switch (r.kind) {
    case "build": {
      const total = r.rows * r.cols;
      if (g2)
        return [{ q: level.scaffold ? `${plusRow(r.rows, r.cols)} = ?` : "How many flowers in all?", answer: total, hint: `Count one row: ${r.cols}. Then add ${r.cols} more for every row.` }];
      return [{ q: `${r.rows} rows of ${r.cols}: ${r.rows} × ${r.cols} = ?`, answer: total, hint: `Skip count by ${r.cols}s, one row at a time.` }];
    }
    case "fill": {
      const total = r.rows * r.cols;
      if (level.area) return [{ q: "Area = ? square units", answer: total, hint: `Each flower is 1 square unit. Count one row (${r.cols}), then skip count the ${r.rows} rows.` }];
      return [{ q: level.scaffold ? `How many squares? ${plusRow(r.rows, r.cols)} = ?` : "How many squares in all?", answer: total, hint: `Count the squares in one row, then add a row at a time.` }];
    }
    case "share":
      return [{ q: `${r.total} ÷ ${r.rows} = ? in each row`, answer: r.total / r.rows, hint: `Count the flowers in one row. Check: ${r.rows} × that number should make ${r.total}.` }];
    case "turn":
      return [{ q: `${r.cols} rows of ${r.rows}: ${r.cols} × ${r.rows} = ?`, answer: r.rows * r.cols, hint: `Look back at the first garden: ${r.rows} × ${r.cols}. Did turning it add or take away any flowers?` }];
    case "split":
    case "model": {
      const a = s ?? 1;
      const b = r.cols - a;
      return [
        { q: `${r.rows} × ${a} = ?`, answer: r.rows * a, hint: r.kind === "model" && a % 10 === 0 ? `${r.rows} × ${a / 10} tens = ${r.rows * (a / 10)} tens.` : `Skip count by ${r.rows}s, ${a} time${a === 1 ? "" : "s"}.` },
        { q: `${r.rows} × ${b} = ?`, answer: r.rows * b, hint: `Skip count by ${r.rows}s, ${b} time${b === 1 ? "" : "s"}.` },
        { q: `${r.rows} × ${r.cols} = ${r.rows * a} + ${r.rows * b} = ?`, answer: r.rows * r.cols, hint: `Add the two smaller gardens together.` },
      ];
    }
    case "factors":
      return r.prime ? [{ q: `Is ${r.n} prime or composite?`, answer: isPrime(r.n) ? 1 : 0, prime: true, hint: `Count your rectangles. Prime numbers make only one: 1 row of ${r.n}.` }] : [];
    case "fence":
      return [
        { q: "Area = ? square units", answer: r.rows * r.cols, hint: `Area = rows × columns: ${r.rows} × ${r.cols}.` },
        { q: "Perimeter (the fence) = ? units", answer: 2 * (r.rows + r.cols), hint: `Walk around the bed: add all four sides, ${r.cols} + ${r.rows} + ${r.cols} + ${r.rows}.` },
      ];
    case "side": {
      const len = r.area / r.rows;
      return [
        { q: `Length: ${r.rows} × ? = ${r.area}`, answer: len, hint: `Count the flowers in one row of your bed.` },
        { q: "Perimeter (the fence) = ? units", answer: 2 * (r.rows + len), hint: `Add all four sides: ${len} + ${r.rows} + ${len} + ${r.rows}.` },
      ];
    }
  }
}

/** What to do this round (read aloud when the round starts). */
export function promptFor(level: GardenLevel, r: GardenRound): string {
  const g2 = level.grade === 2;
  switch (r.kind) {
    case "build":
      return g2 ? `Plant ${r.rows} rows of flowers, with ${r.cols} in each row.` : `Plant ${r.rows} rows of ${r.cols} tulips. That array shows ${r.rows} × ${r.cols}.`;
    case "fill":
      return level.area ? `Cover the garden bed with square units. Plant it from corner to corner.` : `Fill the garden bed with flower squares, all the same size. Plant it row by row.`;
    case "share":
      return `Share ${r.total} tulips into ${r.rows} equal rows. Plant all ${r.total}!`;
    case "turn":
      return `Here are ${r.rows} rows of ${r.cols}. Turn the garden: plant ${r.cols} rows of ${r.rows}.`;
    case "split":
      return `Plant ${r.rows} rows of ${r.cols}. Then split it into two smaller gardens that are easy to multiply.`;
    case "factors":
      return r.prime ? `Plant exactly ${r.n} flowers in a rectangle. Find every rectangle you can!` : `Find every rectangle you can plant with exactly ${r.n} flowers.`;
    case "fence":
      return `Plant a bed ${r.rows} rows by ${r.cols} columns. Then find its area and the fence around it.`;
    case "side":
      return `A bed has an area of ${r.area} square units and ${r.rows} rows. Plant it to find how long it is.`;
    case "model":
      return `${r.rows} rows of ${r.cols} is too big to plant one by one! Split ${r.cols} into tens and ones.`;
  }
}

/** Feedback for a planting that doesn't match. */
export function wrongPlantNote(level: GardenLevel, r: GardenRound, rows: number, cols: number): string {
  const made = level.grade === 2 ? `${rows} rows of ${cols}` : `${rows} × ${cols} = ${rows * cols}`;
  switch (r.kind) {
    case "factors": {
      const n = r.n;
      if (rows * cols === n) return "";
      if (n % rows !== 0) {
        const lo = rows * Math.floor(n / rows);
        const hi = lo + rows;
        return `${n} can't make ${rows} equal rows: ${rows} × ${Math.floor(n / rows)} = ${lo} and ${rows} × ${Math.floor(n / rows) + 1} = ${hi}. ${rows} is not a factor of ${n}.`;
      }
      return `${made}, not ${n}. Keep ${rows} rows and change how many are in each row.`;
    }
    case "share":
      if (rows !== r.rows) return `That's ${rows} rows. We need ${r.rows} equal rows.`;
      return `${made} flowers, but we have ${r.total}. Keep ${r.rows} rows and change how many are in each row.`;
    case "side":
      if (rows !== r.rows) return `The bed has ${r.rows} rows. Change the rows.`;
      return `${made} square units, but the area is ${r.area}. Make the rows longer or shorter.`;
    case "fill":
    case "fence":
      return `That's ${rows} rows of ${cols}. Make your flowers cover the whole bed, right to its edges.`;
    case "turn":
      return `That's ${rows} rows of ${cols}. Turn it: the ${r.rows} rows of ${r.cols} become ${r.cols} rows of ${r.rows}.`;
    default: {
      const t = targetOf(r)!;
      return `That's ${rows} rows of ${cols}. We need ${t.rows} rows with ${t.cols} in each row.`;
    }
  }
}

/** The teaching sentence for a finished round. */
export function teachFor(level: GardenLevel, r: GardenRound, s?: number): string {
  const g2 = level.grade === 2;
  switch (r.kind) {
    case "build":
      return g2 ? `${r.rows} rows of ${r.cols}: ${plusRow(r.rows, r.cols)} = ${r.rows * r.cols} flowers.` : `${r.rows} equal rows of ${r.cols}: ${r.rows} × ${r.cols} = ${r.rows * r.cols}.`;
    case "fill":
      return level.area
        ? `Area = ${r.rows} rows × ${r.cols} square units = ${r.rows * r.cols} square units. Multiplying is faster than counting!`
        : `The bed splits into ${r.rows} rows of ${r.cols} squares: ${plusRow(r.rows, r.cols)} = ${r.rows * r.cols} squares.`;
    case "share":
      return `${r.total} ÷ ${r.rows} = ${r.total / r.rows}, because ${r.rows} × ${r.total / r.rows} = ${r.total}.`;
    case "turn":
      return `${r.rows} × ${r.cols} = ${r.rows * r.cols} and ${r.cols} × ${r.rows} = ${r.rows * r.cols}. Turning an array doesn't change how many!`;
    case "split":
    case "model": {
      const a = s ?? tensSplit(r.cols);
      const b = r.cols - a;
      const why = r.kind === "model" ? (a === tensSplit(r.cols) ? " Tens and ones make it quick." : ` Splitting at ${tensSplit(r.cols)} (tens and ones) makes it quickest.`) : "";
      return `${r.rows} × ${r.cols} = (${r.rows} × ${a}) + (${r.rows} × ${b}) = ${r.rows * a} + ${r.rows * b} = ${r.rows * r.cols}.${why}`;
    }
    case "factors": {
      const pairs = factorPairs(r.n).map(([a, b]) => `${a} × ${b}`);
      if (!r.prime) return `${r.n} = ${pairs.join(" = ")}. Its factor pairs: ${factorPairs(r.n).map(([a, b]) => `${a} and ${b}`).join(", ")}.`;
      return isPrime(r.n)
        ? `${r.n} makes only one rectangle, ${pairs[0]}, so ${r.n} is prime.`
        : `${r.n} = ${pairs.join(" = ")}. It makes more than one rectangle, so ${r.n} is composite.`;
    }
    case "fence":
      return `Area = ${r.rows} × ${r.cols} = ${r.rows * r.cols} square units. Perimeter = ${r.cols} + ${r.rows} + ${r.cols} + ${r.rows} = ${2 * (r.rows + r.cols)} units of fence.`;
    case "side": {
      const len = r.area / r.rows;
      return `${r.area} ÷ ${r.rows} = ${len}, so the bed is ${len} long (${r.rows} × ${len} = ${r.area}). Perimeter = ${len} + ${r.rows} + ${len} + ${r.rows} = ${2 * (r.rows + len)} units.`;
    }
  }
}

// ---------------- Moves and replay ----------------

export interface RoundMove {
  plants: [number, number][];
  split?: number;
  answers: number[];
  /** Factor rounds: "show me the rest". */
  shown?: boolean;
}

const int = (v: unknown, max: number) => (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= max ? v : -1);

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 10).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const plants = Array.isArray(o.plants)
      ? o.plants.slice(0, MAX_PLANTS).map((p): [number, number] => (Array.isArray(p) ? [int(p[0], 99), int(p[1], 99)] : [-1, -1]))
      : [];
    const answers = Array.isArray(o.answers) ? o.answers.slice(0, 40).map((a) => int(a, 9999)) : [];
    const split = int(o.split, 99);
    return { plants, answers, split: split >= 0 ? split : undefined, shown: o.shown === true };
  });
}

export type AskResult = "first" | "later" | "shown";

export interface RoundPlay {
  /** The array is planted (right, or shown after MAX_TRIES wrong tries). */
  buildDone: boolean;
  firstBuild: boolean;
  wrongPlants: number;
  /** Factor rounds: the pairs found (small factor first). */
  found: [number, number][];
  /** Index of the last planting that counted (-1 if none). */
  lastPlant: number;
  /** Split chosen and valid (split / model rounds). */
  splitDone: boolean;
  asks: Ask[];
  /** The question being asked now (asks.length when all are done). */
  askAt: number;
  /** Wrong tries on the current question. */
  askMisses: number;
  askResults: AskResult[];
  done: boolean;
  points: number;
}

/** Replays one round's moves. Used by the screen (live) and the server (scoring). */
export function playRound(level: GardenLevel, r: GardenRound, move: RoundMove | undefined): RoundPlay {
  const m: RoundMove = move ?? { plants: [], answers: [] };
  let buildDone = false;
  let firstBuild = false;
  let wrongPlants = 0;
  let lastPlant = -1;
  const found: [number, number][] = [];

  if (r.kind === "factors") {
    const pairs = factorPairs(r.n);
    const keys = new Set<string>();
    for (let i = 0; i < m.plants.length && keys.size < pairs.length; i++) {
      const [a, b] = m.plants[i];
      lastPlant = i;
      if (a > 0 && b > 0 && a * b === r.n) {
        const k = pairKey(a, b);
        if (!keys.has(k)) {
          keys.add(k);
          found.push([Math.min(a, b), Math.max(a, b)]);
        }
      } else wrongPlants++;
    }
    found.sort((x, y) => x[0] - y[0]);
    buildDone = keys.size === pairs.length || !!m.shown;
  } else if (r.kind === "model") {
    buildDone = true;
  } else {
    for (let i = 0; i < m.plants.length; i++) {
      lastPlant = i;
      const [a, b] = m.plants[i];
      if (buildOk(r, a, b)) {
        buildDone = true;
        firstBuild = wrongPlants === 0;
        break;
      }
      if (++wrongPlants >= MAX_TRIES) {
        buildDone = true;
        break;
      }
    }
  }

  const sDone = !needsSplit(r) || (buildDone && splitOk(r, m.split));
  const asks = buildDone && sDone ? asksFor(level, r, m.split) : [];
  const askResults: AskResult[] = [];
  let askAt = 0;
  let askMisses = 0;
  for (const a of m.answers) {
    if (askAt >= asks.length) break;
    if (a === asks[askAt].answer) {
      askResults.push(askMisses === 0 ? "first" : "later");
      askAt++;
      askMisses = 0;
    } else if (++askMisses >= MAX_TRIES) {
      askResults.push("shown");
      askAt++;
      askMisses = 0;
    }
  }
  const done = buildDone && sDone && askAt >= asks.length;

  let points = 0;
  if (done) {
    if (r.kind === "factors") {
      const all = factorPairs(r.n).length;
      points += found.length === all ? 2 : found.length * 2 >= all ? 1 : 0;
      if (r.prime) points += askResults[0] === "first" ? 1 : 0;
      else points += found.length === all && wrongPlants <= 3 ? 1 : 0;
    } else {
      points += r.kind === "model" ? (m.split === tensSplit(r.cols) ? 1 : 0) : firstBuild ? 1 : 0;
      points += askResults.every((x) => x === "first") ? 2 : askResults.every((x) => x !== "shown") ? 1 : 0;
    }
  }
  return { buildDone, firstBuild, wrongPlants, found, lastPlant, splitDone: sDone, asks, askAt, askMisses, askResults, done, points };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: GardenLevel, raw: unknown): { rounds: RoundPlay[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => playRound(level, r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 3;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export function perfectMoves(level: GardenLevel): RoundMove[] {
  return level.rounds.map((r) => {
    if (r.kind === "factors") {
      const plants = factorPairs(r.n);
      return { plants, answers: asksFor(level, r).map((a) => a.answer) };
    }
    if (r.kind === "model") {
      const s = tensSplit(r.cols);
      return { plants: [], split: s, answers: asksFor(level, r, s).map((a) => a.answer) };
    }
    const t = targetOf(r)!;
    const s = r.kind === "split" ? Math.min(5, r.cols - 1) : undefined;
    return { plants: [[t.rows, t.cols]], split: s, answers: asksFor(level, r, s).map((a) => a.answer) };
  });
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const STEM = "#2f9e44";
const LEAF = "#51cf66";

export const PETALS = ["#ff6b6b", "#ffd43b", "#cc5de8", "#ff922b", "#f783ac", "#4dabf7"] as const;

/** A 10x10 tulip in the given petal color. */
export function flowerGrid(petal: string): Grid {
  const g = new Grid(10, 10);
  g.rect(4, 5, 2, 4, STEM).rect(2, 7, 2, 1, LEAF).rect(6, 6, 2, 1, LEAF).set(2, 6, LEAF).set(7, 5, LEAF);
  g.rect(3, 2, 4, 3, petal).set(3, 1, petal).set(5, 1, petal).set(6, 1, petal).set(4, 1, petal);
  g.set(2, 2, petal).set(7, 2, petal).set(4, 3, "#ffffff");
  return g.outline(OUT);
}

/** A tiny array picture (dots in rows), for "turn the garden" rounds. */
export function miniArrayGrid(rows: number, cols: number, petal = PETALS[0]): Grid {
  const g = new Grid(cols * 3 + 1, rows * 3 + 1);
  g.rect(0, 0, g.w, g.h, "#8a5a2a");
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) g.rect(x * 3 + 1, y * 3 + 1, 2, 2, petal);
  return g;
}

export const arrayGarden: MiniGame = {
  ...arrayGardenInfo,
  levels: () => [],
  levelsForGrade: (grade) => (GARDEN_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
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
