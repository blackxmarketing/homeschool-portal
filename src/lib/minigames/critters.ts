import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Counting Critters (K-5 math, grades K and 1). Pixel critters wander a
 * meadow and hop into ten frames. Every round is hands-on first (tap each
 * critter to count it, put critters into a ten frame, send some hopping
 * away, line two groups up), then the kid records the number by tapping a
 * big number tile (or, for comparing, by tapping the longer line).
 *
 * Round kinds:
 *   count   - tap each critter once, then tap how many (K.CC.B.4, K.CC.B.5)
 *   build   - put N critters in the ten frames (K.CC.B.5 "count out")
 *   compare - line up two kinds of critters to see which group has more (K.CC.C.6)
 *   make10  - fill the ten frame, then tap how many more made 10 (K.OA.A.4)
 *   add     - a critters, put in b more, how many in all? (1.OA.A.1, 1.OA.C.6)
 *   sub     - a critters, b hop away, how many are left? (1.OA.A.1, 1.OA.C.6)
 *   maketen - 8 + 5: move critters to fill the first frame, 10 + 3 (1.OA.C.6, 1.OA.B.3)
 *   missingAdd - a + ? = total (1.OA.D.8, 1.OA.B.4)
 *   missingSub - total - ? = left (1.OA.D.8, 1.OA.B.4)
 *
 * Scoring: 2 points for a round answered right on the first try, 1 point
 * when it's right on a later try (up to 3 tries), else 0. Stars from the
 * share of points. Pure (no randomness), so the server can replay moves.
 */

export const crittersInfo = {
  id: "critters",
  title: "Counting Critters",
  icon: "🐞",
  land: "math" as const,
  subject: "math" as const,
  grades: [0,1],
  blurb: "Count the critters, fill the ten frames, and find how many more make ten.",
};

export type CritterKind = "ladybug" | "frog" | "duck" | "bee" | "snail";
export const CRITTER_KINDS: CritterKind[] = ["ladybug", "frog", "duck", "bee", "snail"];
export const CRITTER_NAMES: Record<CritterKind, { one: string; many: string; emoji: string }> = {
  ladybug: { one: "ladybug", many: "ladybugs", emoji: "🐞" },
  frog: { one: "frog", many: "frogs", emoji: "🐸" },
  duck: { one: "duck", many: "ducks", emoji: "🦆" },
  bee: { one: "bee", many: "bees", emoji: "🐝" },
  snail: { one: "snail", many: "snails", emoji: "🐌" },
};

export type CritterRound =
  | { kind: "count"; n: number; critter: CritterKind }
  | { kind: "build"; n: number; critter: CritterKind }
  | { kind: "compare"; a: number; b: number; critter: CritterKind; other: CritterKind }
  | { kind: "make10"; n: number; critter: CritterKind; other: CritterKind }
  | { kind: "add"; a: number; b: number; critter: CritterKind; other: CritterKind }
  | { kind: "sub"; a: number; b: number; critter: CritterKind }
  | { kind: "maketen"; a: number; b: number; critter: CritterKind; other: CritterKind }
  | { kind: "missingAdd"; a: number; total: number; critter: CritterKind; other: CritterKind }
  | { kind: "missingSub"; total: number; left: number; critter: CritterKind };

export interface CritterLevel extends MiniLevel {
  grade: number;
  rounds: CritterRound[];
  /** Counting rounds number each critter and say the number as it's tapped (the first level). */
  countAloud: boolean;
}

export const MAX_TRIES = 3;
/** Compare answers: which group has more. */
export const FIRST = 0;
export const SECOND = 1;
export const SAME = 2;

const C = CRITTER_KINDS;
const kind = (i: number) => C[i % C.length];
const other = (i: number) => C[(i + 2) % C.length];

type Spec =
  | ["count" | "build", number]
  | ["compare", number, number]
  | ["make10", number]
  | ["add" | "sub" | "maketen", number, number]
  | ["missingAdd", number, number]
  | ["missingSub", number, number];

function round(spec: Spec, i: number): CritterRound {
  const critter = kind(i);
  const o = other(i);
  switch (spec[0]) {
    case "count":
    case "build":
      return { kind: spec[0], n: spec[1], critter };
    case "compare":
      return { kind: "compare", a: spec[1], b: spec[2], critter, other: o };
    case "make10":
      return { kind: "make10", n: spec[1], critter, other: o };
    case "add":
      return { kind: "add", a: spec[1], b: spec[2], critter, other: o };
    case "sub":
      return { kind: "sub", a: spec[1], b: spec[2], critter };
    case "maketen":
      return { kind: "maketen", a: spec[1], b: spec[2], critter, other: o };
    case "missingAdd":
      return { kind: "missingAdd", a: spec[1], total: spec[2], critter, other: o };
    case "missingSub":
      return { kind: "missingSub", total: spec[1], left: spec[2], critter };
  }
}

const lvl = (grade: number, id: string, title: string, intro: string, specs: Spec[], countAloud = false): CritterLevel => ({
  grade,
  id,
  title,
  intro,
  rounds: specs.map(round),
  countAloud,
});

export const CRITTER_LEVELS: Record<number, CritterLevel[]> = {
  0: [
    lvl(
      0,
      "k-1",
      "Count to 10",
      "Skill: counting to 10. Touch each critter one time and count out loud. The last number you say tells how many!",
      [["count", 4], ["build", 3], ["count", 6], ["build", 5], ["count", 8], ["build", 7], ["count", 10]],
      true,
    ),
    lvl(
      0,
      "k-2",
      "Count to 20 and Compare",
      "Skills: counting to 20 and comparing groups. Teen numbers are a full ten frame and some more. Line critters up to see which group has more.",
      [["count", 12], ["build", 11], ["compare", 5, 7], ["count", 15], ["build", 14], ["compare", 8, 6], ["count", 18]],
    ),
    lvl(
      0,
      "k-3",
      "Make 10",
      "Skill: making 10. Fill the ten frame and find how many more make 10. 7 and 3 make 10!",
      [["make10", 7], ["make10", 4], ["compare", 9, 9], ["make10", 9], ["count", 20], ["make10", 2], ["build", 16]],
    ),
  ],
  1: [
    lvl(
      1,
      "g1-1",
      "Add and Take Away to 10",
      "Skill: adding and subtracting within 10. Put critters in to add, send critters hopping away to take away.",
      [["add", 4, 3], ["sub", 9, 4], ["add", 5, 5], ["sub", 7, 2], ["add", 6, 3], ["sub", 10, 6]],
    ),
    lvl(
      1,
      "g1-2",
      "Make a Ten",
      "Skill: the make-a-ten strategy for adding within 20. Move critters to fill the first ten frame, then add: 8 + 5 is 10 + 3.",
      [["maketen", 9, 3], ["maketen", 8, 5], ["maketen", 9, 6], ["maketen", 7, 5], ["maketen", 8, 7], ["maketen", 6, 7]],
    ),
    lvl(
      1,
      "g1-3",
      "Missing Numbers to 20",
      "Skills: finding the missing number and subtracting within 20. 8 + ? = 13: add critters until there are 13, then count how many you added.",
      [["missingAdd", 8, 13], ["sub", 15, 7], ["missingSub", 14, 9], ["missingAdd", 6, 15], ["sub", 17, 9], ["missingSub", 18, 10], ["add", 9, 8]],
    ),
  ],
};

export const ALL_CRITTER_LEVELS: CritterLevel[] = Object.values(CRITTER_LEVELS).flat();

export function levelById(id: string): CritterLevel | undefined {
  return ALL_CRITTER_LEVELS.find((l) => l.id === id);
}

// ---------------- The math ----------------

/** The right answer for a round (compare: FIRST, SECOND or SAME). */
export function answerFor(r: CritterRound): number {
  switch (r.kind) {
    case "count":
    case "build":
      return r.n;
    case "compare":
      return r.a > r.b ? FIRST : r.b > r.a ? SECOND : SAME;
    case "make10":
      return 10 - r.n;
    case "add":
    case "maketen":
      return r.a + r.b;
    case "sub":
      return r.a - r.b;
    case "missingAdd":
      return r.total - r.a;
    case "missingSub":
      return r.total - r.left;
  }
}

/** The biggest number on the critter board (decides one or two ten frames, and the number tiles). */
export function biggest(r: CritterRound): number {
  switch (r.kind) {
    case "count":
    case "build":
      return r.n;
    case "compare":
      return Math.max(r.a, r.b);
    case "make10":
      return 10;
    case "add":
    case "maketen":
      return r.a + r.b;
    case "sub":
      return r.a;
    case "missingAdd":
      return r.total;
    case "missingSub":
      return r.total;
  }
}

const name = (k: CritterKind, n: number) => (n === 1 ? CRITTER_NAMES[k].one : CRITTER_NAMES[k].many);

/** What the round asks, short enough to read aloud. */
export function promptFor(r: CritterRound): string {
  switch (r.kind) {
    case "count":
      return `How many ${name(r.critter, 2)}? Touch each one as you count.`;
    case "build":
      return `Put ${r.n} ${name(r.critter, r.n)} in the ten frame${r.n > 10 ? "s" : ""}.`;
    case "compare":
      return `Line up the ${name(r.critter, 2)} and the ${name(r.other, 2)}. Which line has more?`;
    case "make10":
      return `${r.n} ${name(r.critter, r.n)}. Fill the ten frame. How many more make 10?`;
    case "add":
      return `${r.a} ${name(r.critter, r.a)}. Put in ${r.b} ${name(r.other, r.b)}. How many in all?`;
    case "sub":
      return `${r.a} ${name(r.critter, r.a)}. Make ${r.b} hop away. How many are left?`;
    case "maketen":
      return `${r.a} plus ${r.b}. Move ${name(r.other, 2)} up to fill the first ten frame.`;
    case "missingAdd":
      return `${r.a} plus what makes ${r.total}? Add ${name(r.other, 2)} until there are ${r.total}.`;
    case "missingSub":
      return `${r.total} minus what leaves ${r.left}? Make ${name(r.critter, 2)} hop away until ${r.left} are left.`;
  }
}

/** The question asked on the number tiles, after the hands-on part. */
export function askFor(r: CritterRound): string {
  switch (r.kind) {
    case "count":
      return `How many ${name(r.critter, 2)}?`;
    case "build":
      return "";
    case "compare":
      return "Which line has more? Tap it.";
    case "make10":
      return `How many more ${name(r.other, 2)} did you put in to make 10?`;
    case "add":
      return `${r.a} + ${r.b}. How many in all?`;
    case "sub":
      return `${r.a} − ${r.b}. How many are left?`;
    case "maketen":
      return `${r.a} + ${r.b} is 10 + ${r.a + r.b - 10}. How many in all?`;
    case "missingAdd":
      return `${r.a} + ? = ${r.total}. How many did you add?`;
    case "missingSub":
      return `${r.total} − ? = ${r.left}. How many hopped away?`;
  }
}

/** The equation for the round (grade 1 shows it; K hears it). */
export function equationFor(r: CritterRound): string {
  switch (r.kind) {
    case "count":
    case "build":
      return String(r.n);
    case "compare":
      return r.a === r.b ? `${r.a} = ${r.b}` : r.a > r.b ? `${r.a} > ${r.b}` : `${r.a} < ${r.b}`;
    case "make10":
      return `${r.n} + ${10 - r.n} = 10`;
    case "add":
    case "maketen":
      return `${r.a} + ${r.b} = ${r.a + r.b}`;
    case "sub":
      return `${r.a} − ${r.b} = ${r.a - r.b}`;
    case "missingAdd":
      return `${r.a} + ${r.total - r.a} = ${r.total}`;
    case "missingSub":
      return `${r.total} − ${r.total - r.left} = ${r.left}`;
  }
}

/** One teaching sentence after the round is solved (read aloud). */
export function teachFor(r: CritterRound): string {
  switch (r.kind) {
    case "count":
      return r.n > 10
        ? `Yes, ${r.n}! That's 10 and ${r.n - 10} more. The last number you say tells how many.`
        : `Yes, ${r.n} ${name(r.critter, r.n)}! The last number you say tells how many.`;
    case "build":
      return r.n > 10
        ? `Yes! ${r.n} is one full ten frame and ${r.n - 10} more.`
        : r.n > 5
          ? `Yes! ${r.n} is a full row of 5 and ${r.n - 5} more.`
          : `Yes! ${r.n} ${name(r.critter, r.n)} in the frame.`;
    case "compare":
      if (r.a === r.b) return `Yes! ${r.a} and ${r.b} are the same. Every critter has a partner.`;
      {
        const [big, bigK, small, smallK] = r.a > r.b ? [r.a, r.critter, r.b, r.other] : [r.b, r.other, r.a, r.critter];
        return `Yes! ${big} ${name(bigK, big)} is more than ${small} ${name(smallK, small)}. ${big - small} had no partner.`;
      }
    case "make10":
      return `Yes! ${r.n} and ${10 - r.n} make 10.`;
    case "add":
      return `Yes! ${r.a} plus ${r.b} equals ${r.a + r.b}.`;
    case "sub":
      return `Yes! ${r.a} take away ${r.b} leaves ${r.a - r.b}.`;
    case "maketen":
      return `Yes! ${r.a} plus ${r.b} is the same as 10 plus ${r.a + r.b - 10}. That's ${r.a + r.b}.`;
    case "missingAdd":
      return `Yes! ${r.a} plus ${r.total - r.a} makes ${r.total}, so the missing number is ${r.total - r.a}.`;
    case "missingSub":
      return `Yes! ${r.total} take away ${r.total - r.left} leaves ${r.left}, so the missing number is ${r.total - r.left}.`;
  }
}

/** A kind hint after a wrong try (never says the answer). */
export function hintFor(r: CritterRound, tried: number): string {
  const right = answerFor(r);
  if (r.kind === "compare") {
    return "Look for critters with no partner. The line with critters left over has more.";
  }
  const dir = tried < right ? "Too few." : "Too many.";
  switch (r.kind) {
    case "count":
      return `${dir} Count again slowly. Touch each critter just one time.`;
    case "build":
      return `${dir} Count the critters in the frame. We need ${r.n}.`;
    case "make10":
      return `${dir} Count the empty boxes you filled. A full ten frame has 10.`;
    case "add":
      return `${dir} Count all the critters in the frames. Start at ${r.a} and count on.`;
    case "sub":
      return `${dir} Count only the critters still in the frames.`;
    case "maketen":
      return `${dir} The first frame is full: that's 10. Count on from 10.`;
    case "missingAdd":
      return `${dir} Count only the new ${name(r.other, 2)} you added.`;
    case "missingSub":
      return `${dir} Count the empty boxes: those critters hopped away.`;
  }
}

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  /** The numbers the kid tapped (compare: FIRST, SECOND or SAME), in order. */
  tries: number[];
}

export interface RoundResult {
  /** Which try was right (0-based), or -1. */
  rightOn: number;
  points: number;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const tries = Array.isArray(o.tries)
      ? o.tries.slice(0, MAX_TRIES).map((n) => (typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 20 ? n : -1))
      : [];
    return { tries };
  });
}

export function scoreRound(r: CritterRound, move: RoundMove | undefined): RoundResult {
  if (!move) return { rightOn: -1, points: 0 };
  const right = answerFor(r);
  const rightOn = move.tries.findIndex((t) => t === right);
  const points = rightOn === 0 ? 2 : rightOn > 0 ? 1 : 0;
  return { rightOn, points };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: CritterLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests). */
export const perfectMoves = (level: CritterLevel): RoundMove[] => level.rounds.map((r) => ({ tries: [answerFor(r)] }));

// ---------------- Meadow layout ----------------

/** Where the critters sit in the meadow: a jittered grid, seeded so it's the same every time. */
export function meadowSpots(n: number, seed: number): { col: number; row: number; dx: number; dy: number }[] {
  const { cols, rows } = meadowSize(n);
  const cells: [number, number][] = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) cells.push([col, row]);
  // Deterministic shuffle.
  let s = (seed * 2654435761 + n * 97) >>> 0 || 1;
  const rnd = () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells.slice(0, n).map(([col, row]) => ({ col, row, dx: rnd() * 0.5 - 0.25, dy: rnd() * 0.4 - 0.2 }));
}

/** Meadow grid: a few spare cells for small groups so they look scattered; big groups fill it. */
export function meadowSize(n: number) {
  const cols = n <= 6 ? 3 : n <= 12 ? 4 : 5;
  const rows = Math.max(2, Math.ceil((n + (n > 12 ? 0 : 2)) / cols));
  return { cols, rows };
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";

/** A 14x12 critter. Frame 1 lifts the feet a little (the wander step). */
export function critterGrid(k: CritterKind, frame = 0): Grid {
  const g = new Grid(14, 12);
  const f = frame ? 1 : 0;
  switch (k) {
    case "ladybug":
      // legs
      for (const x of [4, 7, 10]) g.set(x - f, 10, OUT).set(x + f, 10, OUT);
      g.disc(7, 6.5, 4.6, "#e03131").disc(6, 5.2, 1.6, "#ff6b6b");
      g.rect(7, 2, 1, 9, "#7a1010");
      for (const [x, y] of [[5, 5], [9, 5], [4, 8], [10, 8], [6, 9], [8, 9]] as const) g.set(x, y, "#1b1530");
      g.rect(5, 1, 5, 2, "#2b2b2b").set(5, 1, "#ffffff").set(9, 1, "#ffffff");
      break;
    case "frog":
      g.disc(7, 7, 4.5, "#40c057").rect(3, 9, 9, 2, "#40c057").disc(7, 8, 2.5, "#b2f2bb");
      g.disc(4.5, 3, 1.8, "#40c057").disc(9.5, 3, 1.8, "#40c057");
      g.set(4, 3, "#ffffff").set(5, 3, "#1b1530").set(9, 3, "#1b1530").set(10, 3, "#ffffff");
      g.rect(5, 6, 4, 1, "#2b8a3e");
      g.rect(1 + f, 10, 3, 1, "#2f9e44").rect(10 - f, 10, 3, 1, "#2f9e44");
      break;
    case "duck":
      g.disc(7, 7.5, 4, "#ffd43b").rect(3, 7, 9, 3, "#ffd43b").disc(9.5, 3.5, 2.6, "#ffd43b");
      g.rect(11, 4, 3, 1, "#f08c00").set(12, 5, "#f08c00");
      g.set(10, 3, "#1b1530");
      g.rect(4, 7, 4, 1, "#fab005");
      g.rect(5 - f, 11, 2, 1, "#f08c00").rect(8 + f, 11, 2, 1, "#f08c00");
      break;
    case "bee":
      g.disc(4.5, 2.5 - f * 0.5, 2, "#d0ebff").disc(9.5, 2.5 - f * 0.5, 2, "#d0ebff");
      g.disc(7, 7, 4, "#fcc419").rect(3, 6, 8, 3, "#fcc419");
      g.rect(6, 3, 1, 8, "#1b1530").rect(9, 4, 1, 7, "#1b1530");
      g.disc(2.5, 7, 1.8, "#2b2b2b").set(2, 6, "#ffffff");
      g.set(12, 7, "#1b1530");
      break;
    case "snail":
      g.rect(1, 9, 12, 2, "#e8c39e").rect(1 - f, 5, 2, 4, "#e8c39e").set(0, 4, OUT).set(3, 4, OUT);
      g.disc(8, 6, 4, "#c2703d").disc(8, 6, 2.6, "#e8a36a").disc(8, 6, 1.2, "#c2703d");
      g.set(1 - f, 6, "#1b1530");
      break;
  }
  return g.outline(OUT);
}

export const critters: MiniGame = {
  ...crittersInfo,
  levels: () => [],
  levelsForGrade: (grade) => (CRITTER_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
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
