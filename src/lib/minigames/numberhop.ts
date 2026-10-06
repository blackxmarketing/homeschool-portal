import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Number Hop (K-5 math, grades 1 and 2). A pixel frog sits on a number line
 * of lily pads. The kid taps hop buttons (+1, +10, -1, -10, +5, +100, or
 * sets a jump) to move the frog. Round kinds:
 *
 *   math - "36 + 23": the fly hides. Hop the problem, then tap "Catch!" on
 *          the pad you think is the answer. (1.OA.C.5-6, 1.NBT.C.4-5,
 *          2.NBT.B.5, 2.NBT.B.7-8, 2.MD.B.6)
 *   fly  - the fly sits on a pad: find the jumps from the frog to the fly.
 *          Hop to it; the hops make the number sentence (missing addend /
 *          difference: start + ? = target).
 *   skip - flies sit on every 5th (10th, 100th) pad: eat them all by skip
 *          counting (2.NBT.A.2).
 *
 * Fewer hops is a smarter strategy: every round has a "par" (the fewest
 * hops, worked out by search, e.g. 48 + 27 is +10 +10 +10 -1 -1 -1), and
 * the feedback shows the number sentence the kid's hops made.
 *
 * Scoring (3 points a round):
 *   math       - 1 for catching the fly, +1 if the first "Catch!" was right,
 *                +1 for using par hops or fewer.
 *   fly / skip - 1 for reaching the fly (all the flies), +2 at par or
 *                fewer, +1 within 2 hops of par.
 * Stars from the share of points. Pure (no randomness), so the server can
 * replay the kid's moves.
 */

export const numberHopInfo = {
  id: "numberhop",
  title: "Number Hop",
  icon: "🐸",
  land: "math" as const,
  subject: "math" as const,
  grades: [1, 2],
  blurb: "Hop the frog along the number line to add, subtract and skip count.",
};

export type HopRound =
  | { kind: "math"; a: number; op: "+" | "-"; b: number; lo: number; hi: number; hops: number[] }
  | { kind: "fly"; start: number; target: number; lo: number; hi: number; hops: number[] }
  | { kind: "skip"; start: number; by: number; end: number; lo: number; hi: number; hops: number[] };

export interface HopLevel extends MiniLevel {
  grade: number;
  rounds: HopRound[];
  /** The biggest "set a jump" allowed (0 = no jump setter). */
  jump: number;
  /** Say each landing number aloud (counting on). */
  sayHops: boolean;
}

/** Wrong "Catch!" taps before the fly shows itself. */
export const MAX_TRIES = 3;
/** Most actions replayed per round (keeps the server work small). */
export const MAX_ACTS = 120;

type Spec = ["math", number, "+" | "-", number] | ["fly", number, number] | ["skip", number, number, number];

const ONES = [1, -1];
const TENS = [10, 1, -1, -10];
const HUNDREDS = [100, 10, 1, -1, -10, -100];
const SKIPS = [100, 10, 5, 1, -1, -5, -10, -100];

function round(spec: Spec, lo: number, hi: number, hops: number[]): HopRound {
  switch (spec[0]) {
    case "math":
      return { kind: "math", a: spec[1], op: spec[2], b: spec[3], lo, hi, hops };
    case "fly":
      return { kind: "fly", start: spec[1], target: spec[2], lo, hi, hops };
    case "skip":
      return { kind: "skip", start: spec[1], by: spec[2], end: spec[3], lo, hi, hops };
  }
}

const lvl = (grade: number, id: string, title: string, intro: string, lo: number, hi: number, hops: number[], specs: Spec[], extra: Partial<HopLevel> = {}): HopLevel => ({
  grade,
  id,
  title,
  intro,
  rounds: specs.map((s) => round(s, lo, hi, hops)),
  jump: 0,
  sayHops: grade === 1,
  ...extra,
});

const skipRound = (start: number, by: number, end: number, lo: number, hi: number): HopRound => ({ kind: "skip", start, by, end, lo, hi, hops: SKIPS });

export const HOP_LEVELS: Record<number, HopLevel[]> = {
  1: [
    lvl(
      1,
      "g1-1",
      "Count On to 20",
      "Skill: adding and subtracting within 20 by counting on and counting back. Start on the first number and hop one at a time.",
      0,
      20,
      ONES,
      [
        ["math", 5, "+", 3],
        ["math", 9, "+", 4],
        ["math", 11, "-", 3],
        ["fly", 7, 12],
        ["math", 14, "+", 5],
        ["math", 16, "-", 4],
      ],
    ),
    lvl(
      1,
      "g1-2",
      "Make a Ten",
      "Skill: making a ten to add and subtract within 20. Set a jump that lands right on 10, then jump the rest. 8 + 5 is 8 + 2 = 10, then 10 + 3 = 13!",
      0,
      20,
      ONES,
      [
        ["math", 8, "+", 5],
        ["math", 9, "+", 6],
        ["math", 13, "-", 4],
        ["fly", 6, 15],
        ["math", 15, "-", 7],
        ["math", 7, "+", 8],
      ],
      { jump: 10 },
    ),
    lvl(
      1,
      "g1-3",
      "Tens and Ones to 100",
      "Skill: adding tens and ones within 100. A +10 hop jumps a whole ten. Use tens for the big part, ones for the little part.",
      0,
      100,
      TENS,
      [
        ["math", 34, "+", 10],
        ["math", 67, "-", 10],
        ["math", 25, "+", 30],
        ["math", 46, "+", 8],
        ["fly", 52, 82],
        ["math", 57, "+", 9],
      ],
    ),
  ],
  2: [
    lvl(
      2,
      "g2-1",
      "Jumps of Tens and Ones",
      "Skill: adding and subtracting within 100 on a number line. Hop the tens, then the ones. Sometimes hopping one ten too far and back a few ones is faster!",
      0,
      100,
      TENS,
      [
        ["math", 36, "+", 23],
        ["math", 75, "-", 32],
        ["math", 48, "+", 27],
        ["fly", 29, 71],
        ["math", 63, "-", 28],
        ["fly", 82, 45],
      ],
    ),
    {
      grade: 2,
      id: "g2-2",
      title: "Skip Count by 5s, 10s and 100s",
      intro: "Skill: skip counting by 5s, 10s and 100s. A fly sits on every pad in the pattern. Pick the right hop so you land on every fly!",
      rounds: [skipRound(0, 5, 35, 0, 40), skipRound(0, 10, 90, 0, 100), skipRound(45, 5, 80, 40, 90), skipRound(0, 100, 600, 0, 1000), skipRound(130, 10, 200, 100, 200), skipRound(250, 100, 850, 0, 1000)],
      jump: 0,
      sayHops: true,
    },
    lvl(
      2,
      "g2-3",
      "Jumps to 1000",
      "Skill: adding and subtracting within 1000 with hundreds, tens and ones. Hop the hundreds, then the tens, then the ones.",
      0,
      1000,
      HUNDREDS,
      [
        ["math", 367, "+", 100],
        ["math", 482, "-", 10],
        ["math", 356, "+", 213],
        ["fly", 120, 450],
        ["math", 734, "-", 312],
        ["math", 498, "+", 205],
        ["fly", 905, 680],
      ],
    ),
  ],
};

export const ALL_HOP_LEVELS: HopLevel[] = Object.values(HOP_LEVELS).flat();

export const levelById = (id: string): HopLevel | undefined => ALL_HOP_LEVELS.find((l) => l.id === id);

// ---------------- Round math ----------------

export const startOf = (r: HopRound) => (r.kind === "math" ? r.a : r.start);

/** Where the round ends: the answer, the fly, or the last fly. */
export const goalOf = (r: HopRound) => (r.kind === "math" ? (r.op === "+" ? r.a + r.b : r.a - r.b) : r.kind === "fly" ? r.target : r.end);

/** Skip rounds: the pads with flies on them (not the start). */
export const fliesOf = (r: HopRound): number[] => {
  if (r.kind !== "skip") return [goalOf(r)];
  const out: number[] = [];
  for (let n = r.start + r.by; n <= r.end; n += r.by) out.push(n);
  return out;
};

/** Is a hop allowed this round: one of the hop buttons, or a set jump up to the level's limit. */
export function hopAllowed(level: HopLevel, r: HopRound, d: number): boolean {
  if (!Number.isInteger(d) || d === 0) return false;
  if (r.hops.includes(d)) return true;
  return level.jump > 0 && Math.abs(d) <= level.jump;
}

/** Fewest button hops from a to b (breadth-first search), and one such path. Big hops are tried first. */
export function shortestHops(from: number, to: number, hops: number[], lo: number, hi: number): number[] {
  if (from === to) return [];
  const order = [...hops].sort((x, y) => Math.abs(y) - Math.abs(x) || y - x);
  const prev = new Map<number, [number, number]>();
  prev.set(from, [from, 0]);
  let q = [from];
  while (q.length) {
    const nq: number[] = [];
    for (const p of q)
      for (const d of order) {
        const n = p + d;
        if (n < lo || n > hi || prev.has(n)) continue;
        prev.set(n, [p, d]);
        if (n === to) {
          const path: number[] = [];
          let c = n;
          while (c !== from) {
            const [pp, dd] = prev.get(c)!;
            path.unshift(dd);
            c = pp;
          }
          return path;
        }
        nq.push(n);
      }
    q = nq;
  }
  return [];
}

const crossesTen = (a: number, b: number) => (a < 10 && b > 10) || (a > 10 && b < 10);

/** The best way through a round: make-ten jumps on jump levels, otherwise the fewest button hops. */
export function bestPath(level: HopLevel, r: HopRound): number[] {
  const s = startOf(r);
  const g = goalOf(r);
  if (level.jump > 0 && r.kind !== "skip") {
    if (crossesTen(s, g)) return [10 - s, g - 10];
    return [g - s];
  }
  if (r.kind === "skip") {
    const out: number[] = [];
    let p = s;
    for (const f of fliesOf(r)) {
      out.push(...shortestHops(p, f, r.hops, r.lo, r.hi));
      p = f;
    }
    return out;
  }
  return shortestHops(s, g, r.hops, r.lo, r.hi);
}

/** The fewest hops for a round. */
export const parOf = (level: HopLevel, r: HopRound) => bestPath(level, r).length;

// ---------------- Words ----------------

const signed = (d: number) => (d > 0 ? `+${d}` : `−${-d}`);
export const hopLabel = signed;

/** "36 + 10 + 10 + 1 = 57" from the hops (long chains are shortened). */
export function sentence(start: number, hops: number[]): string {
  const end = hops.reduce((p, d) => p + d, start);
  if (!hops.length) return String(start);
  if (hops.length > 12) return `${start} → ${end} in ${hops.length} hops`;
  return `${start} ${hops.map((d) => (d > 0 ? `+ ${d}` : `− ${-d}`)).join(" ")} = ${end}`;
}

export const problemOf = (r: HopRound) =>
  r.kind === "math" ? `${r.a} ${r.op === "+" ? "+" : "−"} ${r.b}` : r.kind === "fly" ? `${r.start} → ${r.target}` : `${r.start}, ${r.start + r.by}, ${r.start + 2 * r.by} … ${r.end}`;

/** The round's prompt (read aloud when the round starts). */
export function promptFor(level: HopLevel, r: HopRound): string {
  if (r.kind === "math") {
    const verb = r.op === "+" ? "plus" : "minus";
    const how = level.jump > 0 ? "Make a ten with your jumps." : r.op === "+" ? "Hop forward." : "Hop back.";
    return `What is ${r.a} ${verb} ${r.b}? Frog is on ${r.a}. ${how} Then tap Catch!`;
  }
  if (r.kind === "fly") return `Frog is on ${r.start}. The fly is on ${r.target}. Hop to the fly in as few hops as you can!`;
  return `Count by ${r.by}s! Frog is on ${r.start}. Land on every fly, up to ${r.end}.`;
}

const placeWords = (n: number): string => {
  n = Math.abs(n);
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  const parts: string[] = [];
  if (h) parts.push(`${h} hundred${h > 1 ? "s" : ""}`);
  if (t) parts.push(`${t} ten${t > 1 ? "s" : ""}`);
  if (o) parts.push(`${o} one${o > 1 ? "s" : ""}`);
  return parts.join(", ").replace(/, ([^,]*)$/, " and $1") || "0";
};

/** A kind hint after a wrong "Catch!". */
export function hintFor(level: HopLevel, r: HopRound, pos: number, misses: number): string {
  if (r.kind !== "math") return "";
  const ans = goalOf(r);
  if (misses >= MAX_TRIES) return `The fly was on ${ans}! ${r.a} ${r.op === "+" ? "+" : "−"} ${r.b} = ${ans}. Hop to ${ans} to catch it.`;
  const moved = pos - r.a;
  const want = r.op === "+" ? r.b : -r.b;
  const dir = r.op === "+" ? "forward" : "back";
  if (moved === 0) return `Not yet! Hop ${dir} ${r.b} first, then tap Catch.`;
  if ((moved > 0) !== (want > 0)) return `Not yet! ${r.op === "+" ? "Plus" : "Minus"} means hop ${dir}. Frog went the other way.`;
  if (level.jump > 0 || Math.abs(want) <= 10) {
    const off = Math.abs(want) - Math.abs(moved);
    return off > 0 ? `Not yet! Frog hopped ${Math.abs(moved)}. We need ${r.b}, so hop ${dir} ${off} more.` : `Too far! Frog hopped ${Math.abs(moved)}, but we only need ${r.b}. Hop back toward ${r.a}.`;
  }
  return `Not yet! ${r.b} is ${placeWords(r.b)}. Frog hopped ${placeWords(moved)}. Fix your hops, then catch.`;
}

/** Teaching feedback once the round is done: the number sentence, and a smarter way when there is one. */
export function teachFor(level: HopLevel, r: HopRound, hops: number[]): string {
  const s = startOf(r);
  const g = goalOf(r);
  const best = bestPath(level, r);
  let text: string;
  if (r.kind === "skip") {
    text = `${[r.start, ...fliesOf(r)].join(", ")}. You counted by ${r.by}s!`;
  } else {
    const made = hops.length && hops.length <= 12 ? `${sentence(s, hops)}. ` : "";
    const diff = g - s;
    if (r.kind === "math") text = `${made}So ${problemOf(r)} = ${g}.`;
    else text = `${made}From ${s} to ${g} is ${Math.abs(diff)}, so ${s} ${diff > 0 ? "+" : "−"} ${Math.abs(diff)} = ${g}.`;
    if (level.jump > 0 && crossesTen(s, g)) text += ` Make a ten: ${s} ${10 > s ? "+" : "−"} ${Math.abs(10 - s)} = 10, then 10 ${g > 10 ? "+" : "−"} ${Math.abs(g - 10)} = ${g}.`;
  }
  if (hops.length > best.length) {
    const way = best.length <= 10 ? `: ${best.map(signed).join(" ")}` : "";
    text += ` You used ${hops.length} hops. The fewest is ${best.length}${way}.`;
  } else text += ` ${best.length === 1 ? "One hop. Wow!" : `Only ${hops.length} hops. Smart hopping!`}`;
  return text;
}

// ---------------- Moves and scoring ----------------

/** One thing the kid did: a hop (+10, -1, a set jump of 3...) or "catch". */
export type Act = number | "catch";

export interface RoundMove {
  acts: Act[];
}

export interface RoundPlay {
  pos: number;
  hops: number[];
  misses: number;
  eaten: number[];
  solved: boolean;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const acts = Array.isArray(o.acts)
      ? o.acts.slice(0, MAX_ACTS).map((a): Act => (a === "catch" ? "catch" : typeof a === "number" && Number.isInteger(a) && Math.abs(a) <= 1000 ? a : 0))
      : [];
    return { acts };
  });
}

/** Plays a round's actions from the start (the screen uses this too, so it always agrees with the server). */
export function playRound(level: HopLevel, r: HopRound, acts: Act[]): RoundPlay {
  const goal = goalOf(r);
  const flies = fliesOf(r);
  const st: RoundPlay = { pos: startOf(r), hops: [], misses: 0, eaten: [], solved: false };
  for (const a of acts.slice(0, MAX_ACTS)) {
    if (st.solved) break;
    if (a === "catch") {
      if (r.kind !== "math") continue;
      if (st.pos === goal) st.solved = true;
      else st.misses++;
      continue;
    }
    if (typeof a !== "number" || !hopAllowed(level, r, a)) continue;
    const n = st.pos + a;
    if (n < r.lo || n > r.hi) continue;
    st.pos = n;
    st.hops.push(a);
    if (r.kind === "fly" && n === goal) st.solved = true;
    // After the fly shows itself, landing on it catches it.
    if (r.kind === "math" && st.misses >= MAX_TRIES && n === goal) st.solved = true;
    if (r.kind === "skip" && flies.includes(n) && !st.eaten.includes(n)) {
      st.eaten.push(n);
      if (st.eaten.length === flies.length) st.solved = true;
    }
  }
  return st;
}

export interface RoundResult extends RoundPlay {
  par: number;
  points: number;
}

export function scoreRound(level: HopLevel, r: HopRound, move: RoundMove | undefined): RoundResult {
  const p = playRound(level, r, move?.acts ?? []);
  const par = parOf(level, r);
  let points = 0;
  if (p.solved) {
    if (r.kind === "math") points = 1 + (p.misses === 0 ? 1 : 0) + (p.hops.length <= par ? 1 : 0);
    else points = 1 + (p.hops.length <= par ? 2 : p.hops.length <= par + 2 ? 1 : 0);
  }
  return { ...p, par, points };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: HopLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(level, r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 3;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export const perfectMoves = (level: HopLevel): RoundMove[] =>
  level.rounds.map((r) => ({ acts: [...bestPath(level, r), ...(r.kind === "math" ? (["catch"] as Act[]) : [])] }));

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const GREEN = "#4caf50";
const GREEN_D = "#2e7d32";
const GREEN_L = "#8bd17c";
const BELLY = "#e6f5c9";
const EYE_W = "#ffffff";
const PUPIL = "#1b1530";
const MOUTH = "#c2185b";

/** The frog: frame 0 sits, frame 1 leaps (legs out). 16 x 14. */
export function frogGrid(frame = 0): Grid {
  const g = new Grid(18, 15);
  if (frame === 0) {
    // body
    g.disc(9, 9, 5.2, GREEN).rect(4, 9, 11, 4, GREEN);
    g.disc(9, 10.5, 3, BELLY);
    // back legs
    g.disc(3.5, 12, 2.2, GREEN_D).disc(14.5, 12, 2.2, GREEN_D);
    g.rect(1, 13, 4, 1, GREEN_D).rect(13, 13, 4, 1, GREEN_D);
    // front feet
    g.rect(6, 13, 2, 1, GREEN_L).rect(10, 13, 2, 1, GREEN_L);
  } else {
    g.disc(9, 7, 5, GREEN).rect(5, 7, 9, 3, GREEN);
    g.disc(9, 8, 2.6, BELLY);
    // legs stretched out behind and below
    g.rect(1, 11, 4, 2, GREEN_D).rect(0, 13, 3, 1, GREEN_D);
    g.rect(13, 11, 4, 2, GREEN_D).rect(15, 13, 3, 1, GREEN_D);
    g.rect(6, 11, 2, 2, GREEN_L).rect(10, 11, 2, 2, GREEN_L);
  }
  const ey = frame === 0 ? 4 : 2;
  // eyes on top
  g.disc(6, ey, 2, GREEN).disc(12, ey, 2, GREEN);
  g.disc(6, ey, 1.2, EYE_W).disc(12, ey, 1.2, EYE_W);
  g.set(6, ey, PUPIL).set(12, ey, PUPIL);
  // smile
  g.rect(7, ey + 4, 4, 1, MOUTH);
  return g.outline(OUT);
}

/** The fly: a little body with see-through wings. */
export function flyGrid(frame = 0): Grid {
  const g = new Grid(11, 9);
  const wy = frame ? 1 : 2;
  g.disc(3, wy + 1, 1.8, "#d6f0ff").disc(7, wy + 1, 1.8, "#d6f0ff");
  g.rect(4, 4, 3, 3, "#3b3b4f").set(5, 3, "#3b3b4f");
  g.set(4, 4, "#e53935").set(6, 4, "#e53935");
  return g.outline(OUT);
}

/** A lily pad (with its little notch). */
export function padGrid(w = 20): Grid {
  const h = Math.round(w * 0.42);
  const g = new Grid(w, h);
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const e = ((x - cx) / (w / 2 - 0.8)) ** 2 + ((y - cy) / (h / 2 - 0.6)) ** 2;
      if (e > 1) continue;
      // notch: a wedge cut toward the top
      if (y < cy && Math.abs(x - cx) < (cy - y) * 0.6) continue;
      g.set(x, y, e > 0.6 ? GREEN_D : y > cy ? GREEN : GREEN_L);
    }
  return g.outline(OUT);
}

export const numberHop: MiniGame = {
  ...numberHopInfo,
  levels: () => [],
  levelsForGrade: (grade) => (HOP_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
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
