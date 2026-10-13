import type { GameEvidence, MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";
import { divisors, int, isPrime, lcm, pick, seededRng, shuffle, type Rng } from "../curriculum/math";

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

export type RuleKind = "multiples" | "factors" | "primes" | "composites" | "equals" | "less" | "greater";

export interface Rule {
  kind: RuleKind;
  /** What the rule is about: 7 in "Multiples of 7", 42 in "Equals 42". Ignored by primes. */
  target: number;
}

/** How the numbers on a board are written. */
export type CellStyle =
  /** Plain numbers: 12, 35, 44. */
  | "plain"
  /** One operation to work out first: "9 x 4". */
  | "fact"
  /** Two operations, so the order matters: "4 + 2 x 8". */
  | "twostep";

export interface BoardSpec {
  rule: Rule;
  style: CellStyle;
  /** The range the numbers on the board come from. */
  lo: number;
  hi: number;
}

/** One square of the board. */
export interface Cell {
  /** What the kid reads. */
  text: string;
  /** What the rule judges. */
  value: number;
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
export function fits(rule: Rule, value: number): boolean {
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
      return value === rule.target;
    case "less":
      return value < rule.target;
    case "greater":
      return value > rule.target;
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
      return `Less than ${rule.target}`;
    case "greater":
      return `Greater than ${rule.target}`;
  }
}

/** The one line a kid gets when they eat something that does not fit. */
export function teachFor(rule: Rule, cell: Cell): string {
  const shown = cell.text === String(cell.value) ? `${cell.value}` : `${cell.text} is ${cell.value}, and it`;
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
      return `${shown} is not less than ${t}.`;
    case "greater":
      return `${shown} is not greater than ${t}.`;
  }
}

// ---------------- Writing a number as a problem ----------------

/** Writes `v` as something to work out: "9 x 4", "50 - 8", "84 ÷ 2". */
function factText(r: Rng, v: number, lo: number, hi: number): string {
  const ways: string[] = [];
  if (v > 1) {
    const pairs = divisors(v).filter((d) => d > 1 && d <= 12 && v / d <= 12);
    for (const d of pairs) ways.push(`${d} × ${v / d}`);
    for (const d of divisors(v).filter((d) => d > 1 && d <= 12)) ways.push(`${v * d} ÷ ${d}`);
  }
  const b = int(r, 1, Math.max(1, Math.min(20, hi - v)));
  ways.push(`${v - b} + ${b}`);
  if (v + b <= hi + 40) ways.push(`${v + b} − ${b}`);
  return pick(r, ways.length ? ways : [`${v} + 0`]);
}

/** Writes `v` as two operations, so the order of operations decides it: "4 + 2 x 8". */
function twoStepText(r: Rng, v: number): string {
  // v = a + b x c, or v = a x b - c, both of which go wrong if you work left to right.
  if (r() < 0.5) {
    const b = int(r, 2, 9);
    const c = int(r, 2, 9);
    const a = v - b * c;
    if (a >= 0) return `${a} + ${b} × ${c}`;
  }
  const b = int(r, 2, 9);
  const a = Math.ceil((v + 1) / b);
  return `${a} × ${b} − ${a * b - v}`;
}

function cellText(r: Rng, v: number, style: CellStyle, lo: number, hi: number): string {
  if (style === "plain") return String(v);
  if (style === "twostep") return twoStepText(r, v);
  return factText(r, v, lo, hi);
}

// ---------------- Building a board ----------------

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Every value in the range that fits, and every value that does not. */
function split(spec: BoardSpec): { yes: number[]; no: number[] } {
  const yes: number[] = [];
  const no: number[] = [];
  for (let v = spec.lo; v <= spec.hi; v++) (fits(spec.rule, v) ? yes : no).push(v);
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
export function buildBoard(spec: BoardSpec, boardIndex: number, seed: number): Board {
  const r = seededRng((seed >>> 0) * 31 + boardIndex * 7919 + 1);
  const { yes, no } = split(spec);
  const right = shuffle(r, yes).slice(0, CORRECT_PER_BOARD);
  // If the range is thin on right answers, top up by repeating - the board must
  // always hold the same number of them.
  while (right.length < CORRECT_PER_BOARD && yes.length) right.push(yes[right.length % yes.length]);
  const wrong = shuffle(r, no).slice(0, CELLS - right.length);
  while (wrong.length < CELLS - right.length && no.length) wrong.push(no[wrong.length % no.length]);

  const values = shuffle(r, [...right, ...wrong]);
  const cells = values.map((v) => ({ text: cellText(r, v, spec.style, spec.lo, spec.hi), value: v, ok: fits(spec.rule, v) }));
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

const board = (kind: RuleKind, target: number, style: CellStyle, lo: number, hi: number): BoardSpec => ({ rule: { kind, target }, style, lo, hi });

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
    lvl(3, "g3-4", "More or Less", "g3.add-sub-1000", "Skill: adding, subtracting and comparing. Work out each sum first, then decide whether it is small enough to eat.", [
      board("less", 50, "fact", 10, 99),
      board("greater", 120, "fact", 60, 200),
      board("less", 300, "fact", 150, 480),
    ]),
  ],
  4: [
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
      board("composites", 0, "plain", 2, 30),
      board("composites", 0, "plain", 2, 45),
      board("composites", 0, "plain", 2, 60),
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
    lvl(5, "g5-3", "Order of Operations", "g5.order-of-operations", "Skill: the order of operations. Multiply and divide before you add and subtract, so 4 + 2 × 8 is 20, not 48.", [
      board("equals", 20, "twostep", 5, 60),
      board("equals", 30, "twostep", 5, 80),
      board("equals", 45, "twostep", 5, 99),
    ]),
    lvl(5, "g5-4", "Prime Hunt", "g4.factors-primes", "Skill: primes up to 100. The sneaky ones are 51, 57, 87 and 91 - they look prime but they are not.", [
      board("primes", 0, "plain", 2, 100),
      board("composites", 0, "plain", 40, 100),
      board("primes", 0, "plain", 20, 120),
    ]),
  ],
};


/**
 * Grades 6-12 play the hardest of these for now. Their own levels - integers,
 * ratios, exponents, equations - land with the rest of the 6-8 content; until
 * then the older kids get a game rather than an empty arcade.
 */
const BAND_LEVELS: ChomperLevel[] = [...CHOMPER_LEVELS[4].slice(1), ...CHOMPER_LEVELS[5]];
export const ALL_CHOMPER_LEVELS: ChomperLevel[] = Object.values(CHOMPER_LEVELS).flat();

export const levelById = (id: string): ChomperLevel | undefined => ALL_CHOMPER_LEVELS.find((l) => l.id === id);

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

export const MAX_PER_BOARD = CORRECT_PER_BOARD + CLEAR_BONUS;

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
    if (lives <= 0 || !mv) return { points: 0, max: MAX_PER_BOARD, cleared: false, wrong: 0, caught: 0, eaten: 0 };
    const b = buildBoard(spec, i, mv.seed);
    let st = startState(lives);
    for (const a of mv.acts) {
      st = step(b, st, a);
      if (st.over || st.cleared) break;
    }
    lives = st.lives;
    return { points: st.points, max: MAX_PER_BOARD, cleared: st.cleared, wrong: st.wrong, caught: st.caught, eaten: st.eaten.filter(Boolean).length };
  });
  const points = boards.reduce((t, b) => t + b.points, 0);
  const max = level.boards.length * MAX_PER_BOARD;
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
