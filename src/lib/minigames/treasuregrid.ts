import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Treasure Grid (K-5 math, grade 5). A pixel treasure map of Starpeak
 * Frontier drawn on the first quadrant of a coordinate plane: snowy peaks,
 * the old observatory, and a buried chest. Each round has one or more steps,
 * and every step is solved by doing, not by picking from a list:
 *
 *   plot  - tap a point on the map (or walk the explorer there with the
 *           arrow buttons) and dig.                         (5.G.A.1)
 *   pair  - read a marked point and write its ordered pair (x, y).
 *   num   - work out a number: a pattern's rule, a value read off a graph,
 *           a layer of cubes, a volume.     (5.OA.B.3, 5.G.A.2, 5.MD.C.3-5)
 *   build - set the length, width and height of a chest made of unit cubes
 *           so it holds an exact volume (with a size rule).  (5.MD.C.5b)
 *
 * Scoring: each step is worth 2 points on the first try and 1 point on the
 * second or third try (3 tries per step). Stars from the share of points.
 * No randomness at all, so the server can replay the kid's moves.
 */

export const treasureGridInfo = {
  id: "treasuregrid",
  title: "Treasure Grid",
  icon: "🗝️",
  land: "math" as const,
  subject: "math" as const,
  grades: [5],
  blurb: "Use coordinates and volume to find buried treasure on the grid.",
};

export interface Pt {
  x: number;
  y: number;
}

export interface Dims {
  l: number;
  w: number;
  h: number;
}

/** The map's axes: 0..max, with grid lines every `step` units. */
export interface Board {
  xMax: number;
  yMax: number;
  xStep: number;
  yStep: number;
  xLabel?: string;
  yLabel?: string;
}

export type MarkIcon = "chest" | "flag" | "scope" | "gem" | "dot" | "explorer";

export interface Mark {
  at: Pt;
  icon: MarkIcon;
  label?: string;
}

export interface Prism extends Dims {
  /** Which part of a joined chest ("A" or "B"). */
  name?: string;
  /** Draw just the bottom layer and hide the height (a "how tall?" puzzle). */
  hideHeight?: boolean;
}

export type Step =
  | { kind: "plot"; at: Pt; ask: string; hint: string }
  | { kind: "pair"; at: Pt; ask: string; hint: string }
  | { kind: "num"; n: number; ask: string; hint: string; unit?: string }
  | { kind: "build"; volume: number; ask: string; hint: string; fixed?: Partial<Dims>; base?: number; max: number };

export interface TGRound {
  kind: "map" | "walk" | "pattern" | "story" | "chest";
  title: string;
  /** The round's story / instructions (read aloud on request). */
  story: string;
  board?: Board;
  marks?: Mark[];
  /** Connect the shown marks with a line (a graph of a pattern). */
  line?: boolean;
  /** Walk rounds: where the explorer starts, and the moves (dx, dy). */
  start?: Pt;
  legs?: Pt[];
  /** Pattern rounds: the two rules. */
  rules?: { x: { start: number; add: number }; y: { start: number; add: number }; terms: number };
  prisms?: Prism[];
  steps: Step[];
  /** What the round teaches, with the numbers filled in (shown after the round). */
  teach: string;
}

export interface TGLevel extends MiniLevel {
  grade: number;
  rounds: TGRound[];
}

export const MAX_TRIES = 3;
export const BUILD_MAX = 8;

// ---------------- Helpers to write rounds ----------------

const MAP: Board = { xMax: 10, yMax: 10, xStep: 1, yStep: 1 };
const pt = (x: number, y: number): Pt => ({ x, y });
export const pairText = (p: Pt) => `(${p.x}, ${p.y})`;
const moveWord = (d: Pt) =>
  [d.x ? `${Math.abs(d.x)} ${d.x > 0 ? "right" : "left"}` : "", d.y ? `${Math.abs(d.y)} ${d.y > 0 ? "up" : "down"}` : ""].filter(Boolean).join(" and ");

/** Where a walk ends. */
export const walkEnd = (start: Pt, legs: Pt[]): Pt => legs.reduce((p, d) => pt(p.x + d.x, p.y + d.y), start);

const plotStep = (p: Pt, ask = `Dig at ${pairText(p)}.`, hint = `Start at the origin (0, 0). Go ${p.x} right along the x-axis first, then ${p.y} up.`): Step => ({
  kind: "plot",
  at: p,
  ask,
  hint,
});

const pairStep = (p: Pt, ask: string): Step => ({
  kind: "pair",
  at: p,
  ask,
  hint: "Look straight down to the x-axis for x (how far right), then straight across to the y-axis for y (how far up).",
});

/** A pattern: the terms of rule x and rule y, paired up. */
export function patternPairs(rules: NonNullable<TGRound["rules"]>): Pt[] {
  return Array.from({ length: rules.terms }, (_, i) => pt(rules.x.start + rules.x.add * i, rules.y.start + rules.y.add * i));
}

function walkRound(title: string, start: Pt, legs: Pt[], startName: string): TGRound {
  const end = walkEnd(start, legs);
  const moves = legs.map(moveWord).join(", then ");
  let p = start;
  const path = legs
    .map((d) => {
      const q = pt(p.x + d.x, p.y + d.y);
      const s = `${pairText(p)} → ${pairText(q)}`;
      p = q;
      return s;
    })
    .join(", ");
  return {
    kind: "walk",
    title,
    story: `Start at the ${startName} at ${pairText(start)}. Go ${moves}. Walk the explorer there (or tap the spot) and dig!`,
    board: MAP,
    start,
    legs,
    marks: [{ at: start, icon: startName.includes("observatory") ? "scope" : "flag", label: startName }],
    steps: [
      {
        kind: "plot",
        at: end,
        ask: `From ${pairText(start)}, go ${moves}. Where is the treasure?`,
        hint: "Moving right or left changes x. Moving up or down changes y. Take one move at a time.",
      },
    ],
    teach: `${path}. Right adds to x, left subtracts from x; up adds to y, down subtracts from y. The treasure is at ${pairText(end)}.`,
  };
}

function patternRound(title: string, xr: [number, number], yr: [number, number], terms: number, shown: number, board: Board, askTimes: "y" | "x"): TGRound {
  const rules = { x: { start: xr[0], add: xr[1] }, y: { start: yr[0], add: yr[1] }, terms };
  const pairs = patternPairs(rules);
  const factor = askTimes === "y" ? yr[1] / xr[1] : xr[1] / yr[1];
  const xs = pairs.map((p) => p.x).join(", ");
  const ys = pairs.map((p) => p.y).join(", ");
  return {
    kind: "pattern",
    title,
    story: `Two trail patterns, both starting at 0. Rule x: add ${xr[1]}. Rule y: add ${yr[1]}. Pair the terms up as (x, y) and plot the next points.`,
    board,
    rules,
    marks: pairs.slice(0, shown).map((p) => ({ at: p, icon: "dot" as const })),
    line: true,
    steps: [
      ...pairs.slice(shown).map((p, i) => ({
        kind: "plot" as const,
        at: p,
        ask: `Term ${shown + i + 1}: plot the next ordered pair (x, y).`,
        hint: `Keep going: x adds ${xr[1]} each time, and y adds ${yr[1]} each time. Watch the scale: lines are every ${board.xStep} on x and every ${board.yStep} on y.`,
      })),
      {
        kind: "num" as const,
        n: factor,
        ask: askTimes === "y" ? "Look at the pairs. Each y is how many times its x?" : "Look at the pairs. Each x is how many times its y?",
        hint:
          askTimes === "y"
            ? `Pick a pair like ${pairText(pairs[1])} and divide: ${pairs[1].y} ÷ ${pairs[1].x} = ?`
            : `Pick a pair like ${pairText(pairs[1])} and divide: ${pairs[1].x} ÷ ${pairs[1].y} = ?`,
      },
    ],
    teach:
      `x: ${xs}. y: ${ys}. ` +
      (askTimes === "y"
        ? `Rule y adds ${yr[1]}, which is ${factor} × ${xr[1]}, so every y is ${factor} times its x (like ${pairs[2].y} = ${factor} × ${pairs[2].x}).`
        : `Rule x adds ${xr[1]}, which is ${factor} × ${yr[1]}, so every x is ${factor} times its y (like ${pairs[2].x} = ${factor} × ${pairs[2].y}).`),
  };
}

const vol = (d: Dims) => d.l * d.w * d.h;
const times = (d: Dims) => `${d.l} × ${d.w} × ${d.h}`;

// ---------------- Levels ----------------

export const TG_LEVELS: Record<number, TGLevel[]> = {
  5: [
    {
      grade: 5,
      id: "g5-1",
      title: "Starpeak Map",
      intro:
        "Skill: plot and read ordered pairs on the coordinate plane (5.G.A.1). An ordered pair (x, y) means: from the origin (0, 0), go x right along the x-axis, then y up.",
      rounds: [
        {
          kind: "map",
          title: "Bury a lantern",
          story: "Bury a lantern at (3, 5). Tap the spot on the map, then dig.",
          board: MAP,
          steps: [plotStep(pt(3, 5))],
          teach: "(3, 5): start at the origin, go 3 right along the x-axis, then 5 up. The first number is always x.",
        },
        {
          kind: "map",
          title: "Find the chest",
          story: "Someone marked a chest on the map. Write its ordered pair.",
          board: MAP,
          marks: [{ at: pt(6, 2), icon: "chest" }],
          steps: [pairStep(pt(6, 2), "What is the chest's ordered pair (x, y)?")],
          teach: "The chest is 6 right of the origin and 2 up, so it is at (6, 2). (2, 6) would be a different spot!",
        },
        {
          kind: "map",
          title: "Signpost",
          story: "Plant the trail sign at (0, 4).",
          board: MAP,
          steps: [plotStep(pt(0, 4), "Plant the sign at (0, 4).")],
          teach: "(0, 4): x is 0, so you don't move right at all. Points with x = 0 sit right on the y-axis.",
        },
        {
          kind: "map",
          title: "Ice cave",
          story: "A flag marks the ice cave entrance. Write its ordered pair.",
          board: MAP,
          marks: [{ at: pt(7, 0), icon: "flag" }],
          steps: [pairStep(pt(7, 0), "What is the flag's ordered pair (x, y)?")],
          teach: "The flag is 7 right and 0 up: (7, 0). Points with y = 0 sit right on the x-axis.",
        },
        walkRound("First clue", pt(2, 3), [pt(4, 0), pt(0, 2)], "old flag"),
        walkRound("Downhill", pt(8, 7), [pt(-5, 0), pt(0, -3)], "pine flag"),
        walkRound("Three moves", pt(1, 2), [pt(6, 0), pt(0, 5), pt(-2, 0)], "observatory"),
        {
          kind: "map",
          title: "Ice bridge",
          story: "An ice bridge runs from (2, 8) to (9, 8). How many units long is it?",
          board: MAP,
          marks: [
            { at: pt(2, 8), icon: "flag" },
            { at: pt(9, 8), icon: "flag" },
          ],
          line: true,
          steps: [
            {
              kind: "num",
              n: 7,
              unit: "units",
              ask: "The bridge goes from (2, 8) to (9, 8). How long is it?",
              hint: "Both ends have y = 8, so the bridge is flat. Count the steps from x = 2 to x = 9.",
            },
          ],
          teach: "Both ends have the same y (8), so only x changes: 9 − 2 = 7 units.",
        },
      ],
    },
    {
      grade: 5,
      id: "g5-2",
      title: "Pattern Trails",
      intro:
        "Skill: make ordered pairs from two number patterns, graph them and explain the relationship (5.OA.B.3), and graph real-world problems (5.G.A.2).",
      rounds: [
        patternRound("Add 3, add 6", [0, 3], [0, 6], 4, 2, { xMax: 12, yMax: 24, xStep: 1, yStep: 2, xLabel: "x", yLabel: "y" }, "y"),
        patternRound("Add 2, add 8", [0, 2], [0, 8], 4, 2, { xMax: 8, yMax: 24, xStep: 1, yStep: 2, xLabel: "x", yLabel: "y" }, "y"),
        {
          kind: "story",
          title: "Snow cat climb",
          story: "A snow cat climbs Starpeak 3 km every hour, starting at 0 km. Hours go on the x-axis, km on the y-axis.",
          board: { xMax: 6, yMax: 18, xStep: 1, yStep: 3, xLabel: "hours", yLabel: "km" },
          marks: [
            { at: pt(0, 0), icon: "dot" },
            { at: pt(1, 3), icon: "dot" },
          ],
          line: true,
          steps: [
            plotStep(pt(2, 6), "Plot where the snow cat is after 2 hours.", "x is the hours (2). For y, add 3 km for each hour. Lines on y go up by 3."),
            plotStep(pt(4, 12), "Plot where it is after 4 hours.", "x is 4 hours. y is 4 groups of 3 km."),
            { kind: "num", n: 15, unit: "km", ask: "How high is it after 5 hours?", hint: "Each hour adds 3 km. 5 hours is 5 groups of 3." },
          ],
          teach: "Each hour adds 3 km, so km = 3 × hours: (2, 6), (4, 12), and after 5 hours 3 × 5 = 15 km.",
        },
        patternRound("Add 6, add 3", [0, 6], [0, 3], 4, 2, { xMax: 18, yMax: 10, xStep: 2, yStep: 1, xLabel: "x", yLabel: "y" }, "x"),
        {
          kind: "story",
          title: "Star map shop",
          story: "The observatory shop sells star maps for 4 coins each. Maps go on the x-axis, coins on the y-axis.",
          board: { xMax: 6, yMax: 24, xStep: 1, yStep: 4, xLabel: "maps", yLabel: "coins" },
          marks: [0, 1, 2].map((m) => ({ at: pt(m, 4 * m), icon: "dot" as const })),
          line: true,
          steps: [
            { kind: "num", n: 12, unit: "coins", ask: "How many coins do 3 maps cost?", hint: "Each map is 4 coins. 3 maps is 4 + 4 + 4." },
            plotStep(pt(5, 20), "Plot the point for 20 coins. How many maps is that?", "y is 20 coins. How many 4s make 20? That is x, the number of maps."),
          ],
          teach: "Coins = 4 × maps: 3 maps cost 4 × 3 = 12 coins, and 20 coins buy 20 ÷ 4 = 5 maps, the point (5, 20).",
        },
        {
          kind: "story",
          title: "Sunrise warm-up",
          story: "At sunrise the fort's thermometer reads 2 °C. It warms up 2 degrees every hour. Hours go on x, degrees on y.",
          board: { xMax: 6, yMax: 14, xStep: 1, yStep: 2, xLabel: "hours", yLabel: "°C" },
          marks: [
            { at: pt(0, 2), icon: "dot" },
            { at: pt(1, 4), icon: "dot" },
          ],
          line: true,
          steps: [
            plotStep(pt(3, 8), "Plot the temperature after 3 hours.", "x is 3 hours. Start at 2 °C and add 2 for each hour to find y."),
            { kind: "num", n: 12, unit: "°C", ask: "What will it read after 5 hours?", hint: "It started at 2 °C, not 0. Add 2 for each hour: 2 + 2 + 2 + ..." },
          ],
          teach: "It starts at 2 and adds 2 each hour: 2, 4, 6, 8 (hour 3), 10, 12. After 5 hours: 2 + 5 × 2 = 12 °C.",
        },
        patternRound("Add 4, add 12", [0, 4], [0, 12], 5, 2, { xMax: 16, yMax: 48, xStep: 2, yStep: 4, xLabel: "x", yLabel: "y" }, "y"),
      ],
    },
    {
      grade: 5,
      id: "g5-3",
      title: "The Treasure Chest",
      intro:
        "Skill: volume of rectangular prisms (5.MD.C.3-5). Count unit cubes in layers, use V = l × w × h (or base × height), and add the volumes of two prisms joined together.",
      rounds: [
        {
          kind: "chest",
          title: "Count the cubes",
          story: "The treasure chest is packed with 1-unit gold cubes, with no gaps. It is 3 long, 2 wide and 2 tall.",
          prisms: [{ l: 3, w: 2, h: 2 }],
          steps: [
            { kind: "num", n: 6, unit: "cubes", ask: "How many cubes are in the bottom layer?", hint: "The bottom layer is 3 long and 2 wide: 3 rows of 2, or 3 × 2." },
            { kind: "num", n: 12, unit: "cubic units", ask: "How many cubes fill the whole chest?", hint: "Each layer has the same number of cubes. How many layers are there?" },
          ],
          teach: "Bottom layer: 3 × 2 = 6 cubes. 2 layers: 6 × 2 = 12. V = 3 × 2 × 2 = 12 cubic units.",
        },
        {
          kind: "chest",
          title: "Build a chest",
          story: "Build a chest that holds exactly 24 unit cubes. It must be 2 cubes tall.",
          steps: [
            {
              kind: "build",
              volume: 24,
              fixed: { h: 2 },
              max: BUILD_MAX,
              ask: "Set the length and width so the volume is 24 (height 2).",
              hint: "With 2 layers, each layer needs 24 ÷ 2 = 12 cubes. What length × width makes 12?",
            },
          ],
          teach: "V = l × w × h. With h = 2, l × w must be 12: 4 × 3 × 2 = 24, 6 × 2 × 2 = 24 and 3 × 4 × 2 = 24 all work.",
        },
        {
          kind: "chest",
          title: "Base times height",
          story: "A bigger chest is 5 long, 3 wide and 4 tall.",
          prisms: [{ l: 5, w: 3, h: 4 }],
          steps: [
            { kind: "num", n: 15, unit: "square units", ask: "What is the area of the base (l × w)?", hint: "Base = length × width = 5 × 3." },
            { kind: "num", n: 60, unit: "cubic units", ask: "What is the volume?", hint: "V = base × height. The base is 15 and there are 4 layers." },
          ],
          teach: "Base B = 5 × 3 = 15. V = B × h = 15 × 4 = 60 cubic units (the same as 5 × 3 × 4).",
        },
        {
          kind: "chest",
          title: "Square base",
          story: "Build a chest with a volume of 36 cubic units. Its base must be 9 square units.",
          steps: [
            {
              kind: "build",
              volume: 36,
              base: 9,
              max: BUILD_MAX,
              ask: "Make the base 9 (l × w = 9) and the volume 36.",
              hint: "Which length × width makes 9? Then how many layers of 9 make 36?",
            },
          ],
          teach: "Base 3 × 3 = 9. V = B × h, so h = 36 ÷ 9 = 4: 3 × 3 × 4 = 36 cubic units.",
        },
        {
          kind: "chest",
          title: "Joined chests",
          story: "Two chests are pushed together. Part A is 4 × 3 × 2. Part B is 2 × 3 × 3.",
          prisms: [
            { l: 4, w: 3, h: 2, name: "A" },
            { l: 2, w: 3, h: 3, name: "B" },
          ],
          steps: [
            { kind: "num", n: 24, unit: "cubic units", ask: "What is the volume of part A?", hint: "V = l × w × h = 4 × 3 × 2." },
            { kind: "num", n: 42, unit: "cubic units", ask: "What is the total volume of both parts?", hint: "Find part B the same way (2 × 3 × 3), then add A + B." },
          ],
          teach: "A: 4 × 3 × 2 = 24. B: 2 × 3 × 3 = 18. Joined: 24 + 18 = 42 cubic units.",
        },
        {
          kind: "chest",
          title: "Sled crate",
          story: "Build a crate for the sled that holds exactly 30 unit cubes. No side can be longer than 5.",
          steps: [
            {
              kind: "build",
              volume: 30,
              max: 5,
              ask: "Set length, width and height (each 5 or less) so the volume is 30.",
              hint: "Find three numbers, each 5 or less, that multiply to 30. Try 5 for one side: then the other two multiply to 6.",
            },
          ],
          teach: "30 = 5 × 3 × 2 (in any order: 2 × 5 × 3, 3 × 2 × 5 ...). Changing the order of l, w and h doesn't change the volume.",
        },
        {
          kind: "chest",
          title: "Tower and vault",
          story: "The vault is two prisms joined: part A is 6 × 2 × 2 and part B is 3 × 2 × 5.",
          prisms: [
            { l: 6, w: 2, h: 2, name: "A" },
            { l: 3, w: 2, h: 5, name: "B" },
          ],
          steps: [
            { kind: "num", n: 54, unit: "cubic units", ask: "What is the total volume of the vault?", hint: "Find each part with V = l × w × h, then add the two volumes." },
          ],
          teach: "A: 6 × 2 × 2 = 24. B: 3 × 2 × 5 = 30. Total: 24 + 30 = 54 cubic units.",
        },
        {
          kind: "chest",
          title: "How tall?",
          story: "The whole treasure vault holds 64 cubic units. Part A is 4 × 4 × 2. Part B has a 4 × 2 base, but its height is hidden.",
          prisms: [
            { l: 4, w: 4, h: 2, name: "A" },
            { l: 4, w: 2, h: 4, name: "B", hideHeight: true },
          ],
          steps: [
            { kind: "num", n: 32, unit: "cubic units", ask: "What is the volume of part B?", hint: "Part A is 4 × 4 × 2. The total is 64. Total − A = B." },
            { kind: "num", n: 4, unit: "cubes tall", ask: "How tall is part B?", hint: "B's base is 4 × 2 = 8. How many layers of 8 make B's volume?" },
          ],
          teach: "A: 4 × 4 × 2 = 32, so B = 64 − 32 = 32. B's base is 4 × 2 = 8, so h = 32 ÷ 8 = 4 cubes tall.",
        },
      ],
    },
  ],
};

export const ALL_TG_LEVELS: TGLevel[] = Object.values(TG_LEVELS).flat();

export function levelById(id: string): TGLevel | undefined {
  return ALL_TG_LEVELS.find((l) => l.id === id);
}

/** A prism's volume (for the UI and tests). */
export const volumeOf = vol;
export const dimsText = times;

// ---------------- Checking answers ----------------

export interface Answer {
  x?: number;
  y?: number;
  n?: number;
  l?: number;
  w?: number;
  h?: number;
}

export interface Check {
  correct: boolean;
  /** Teaching feedback for this try. */
  note: string;
}

const isInt = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v);

/** Checks one try at one step. Never throws. */
export function checkStep(step: Step, a: Answer | undefined): Check {
  if (!a) return { correct: false, note: "Give an answer first." };
  if (step.kind === "plot" || step.kind === "pair") {
    if (!isInt(a.x) || !isInt(a.y)) return { correct: false, note: "An ordered pair needs two whole numbers: (x, y)." };
    const { x, y } = step.at;
    if (a.x === x && a.y === y) return { correct: true, note: `Yes! ${pairText(step.at)} is ${x} right and ${y} up.` };
    if (a.x === y && a.y === x)
      return { correct: false, note: `${pairText({ x: a.x, y: a.y })} is ${a.x} right and ${a.y} up. The x comes first (go right), then y (go up). Try swapping them.` };
    if (a.x === x) return { correct: false, note: `Your x (${a.x}) is right! Now check y: how far up?` };
    if (a.y === y) return { correct: false, note: `Your y (${a.y}) is right! Check x: how far right?` };
    return { correct: false, note: `${pairText({ x: a.x, y: a.y })} isn't it. ${step.hint}` };
  }
  if (step.kind === "num") {
    if (!isInt(a.n)) return { correct: false, note: "Type a whole number." };
    if (a.n === step.n) return { correct: true, note: `Yes! ${step.n}${step.unit ? ` ${step.unit}` : ""}.` };
    return { correct: false, note: `${a.n} isn't it: ${a.n < step.n ? "too small" : "too big"}. ${step.hint}` };
  }
  // build
  const d = { l: a.l, w: a.w, h: a.h };
  if (![d.l, d.w, d.h].every((v) => isInt(v) && v >= 1 && v <= step.max)) return { correct: false, note: `Each side must be 1 to ${step.max} cubes.` };
  const dims = d as Dims;
  const v = vol(dims);
  const fixedBad = step.fixed && (Object.keys(step.fixed) as (keyof Dims)[]).find((k) => step.fixed![k] !== dims[k]);
  if (fixedBad) {
    const word = fixedBad === "l" ? "length" : fixedBad === "w" ? "width" : "height";
    return { correct: false, note: `The ${word} has to be ${step.fixed![fixedBad]}. ${step.hint}` };
  }
  if (step.base !== undefined && dims.l * dims.w !== step.base)
    return { correct: false, note: `Your base is ${dims.l} × ${dims.w} = ${dims.l * dims.w}, but it has to be ${step.base}. ${step.hint}` };
  if (v !== step.volume) return { correct: false, note: `${times(dims)} = ${v} cubes, but the chest must hold ${step.volume}. ${step.hint}` };
  return { correct: true, note: `Yes! V = ${times(dims)} = ${v} cubic units.` };
}

/** One correct answer for a step (for tests and the "show me" after 3 tries). */
export function solveStep(step: Step): Answer {
  if (step.kind === "plot" || step.kind === "pair") return { x: step.at.x, y: step.at.y };
  if (step.kind === "num") return { n: step.n };
  for (let h = 1; h <= step.max; h++)
    for (let w = 1; w <= step.max; w++)
      for (let l = step.max; l >= 1; l--) {
        const a = { l, w, h };
        if (checkStep(step, a).correct) return a;
      }
  return { l: 1, w: 1, h: 1 };
}

// ---------------- Moves and scoring ----------------

/** A round's move: for every step, the tries in order. */
export interface RoundMove {
  tries: Answer[][];
}

const cleanNum = (v: unknown) => (isInt(v) && v >= 0 && v <= 999 ? v : undefined);

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const steps = Array.isArray(o.tries) ? o.tries.slice(0, 6) : [];
    return {
      tries: steps.map((s) =>
        (Array.isArray(s) ? s.slice(0, MAX_TRIES) : []).map((a) => {
          const t = (a && typeof a === "object" ? a : {}) as Record<string, unknown>;
          const out: Answer = {};
          for (const k of ["x", "y", "n", "l", "w", "h"] as const) {
            const v = cleanNum(t[k]);
            if (v !== undefined) out[k] = v;
          }
          return out;
        }),
      ),
    };
  });
}

export interface StepResult {
  /** Which try was right (0-based), or -1. */
  rightOn: number;
  points: number;
}

export interface RoundResult {
  steps: StepResult[];
  points: number;
  max: number;
}

export const stepPoints = (rightOn: number) => (rightOn === 0 ? 2 : rightOn > 0 && rightOn < MAX_TRIES ? 1 : 0);

export function scoreRound(round: TGRound, move: RoundMove | undefined): RoundResult {
  const steps = round.steps.map((s, i) => {
    const tries = move?.tries[i] ?? [];
    const rightOn = tries.findIndex((a) => checkStep(s, a).correct);
    return { rightOn, points: stepPoints(rightOn) };
  });
  return { steps, points: steps.reduce((t, s) => t + s.points, 0), max: round.steps.length * 2 };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export const maxPoints = (level: TGLevel) => level.rounds.reduce((t, r) => t + r.steps.length * 2, 0);

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: TGLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((t, r) => t + r.points, 0);
  const max = maxPoints(level);
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export function perfectMoves(level: TGLevel): RoundMove[] {
  return level.rounds.map((r) => ({ tries: r.steps.map((s) => [solveStep(s)]) }));
}

/** Snaps a spot on the board to the nearest grid point (in map units). */
export function snap(board: Board, fx: number, fy: number): Pt {
  const sx = Math.round(fx / board.xStep) * board.xStep;
  const sy = Math.round(fy / board.yStep) * board.yStep;
  return { x: Math.max(0, Math.min(board.xMax, sx)), y: Math.max(0, Math.min(board.yMax, sy)) };
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";

/** The Starpeak backdrop: night sky, snowy peaks and the observatory dome. */
export function backdropGrid(w = 64, h = 64): Grid {
  const g = new Grid(w, h);
  // parchment ground
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) g.set(x, y, (x * 7 + y * 13) % 29 === 0 ? "#efe0b6" : "#f6ebcb");
  // far peaks
  const peaks: [number, number, number][] = [
    [10, 14, 14],
    [30, 6, 20],
    [52, 12, 16],
  ];
  for (const [cx, top, half] of peaks) {
    g.tri(cx, top, h - 1, half + 18, "#cdd6ea");
    g.tri(cx, top, top + 6, 5, "#ffffff");
  }
  // pines along the bottom
  for (let x = 3; x < w; x += 9) g.tri(x, h - 9, h - 3, 3, "#a9c8a6").rect(x, h - 3, 1, 2, "#b99a73");
  // observatory dome on the middle peak
  g.disc(30, 9, 3, "#e9e3d3").rect(27, 9, 7, 3, "#e9e3d3").rect(30, 6, 2, 2, "#c3bba6");
  return g;
}

/** A treasure chest. */
export function chestGrid(): Grid {
  const g = new Grid(12, 10);
  g.rect(1, 1, 10, 3, "#a0522d").rect(1, 4, 10, 5, "#8b4513");
  g.rect(1, 3, 10, 1, "#f2c94c").rect(5, 3, 2, 3, "#f2c94c").set(5, 5, OUT);
  g.rect(1, 1, 1, 8, "#f2c94c").rect(10, 1, 1, 8, "#f2c94c");
  return g.outline(OUT);
}

/** A little pennant flag. */
export function flagGrid(): Grid {
  const g = new Grid(9, 11);
  g.rect(1, 0, 1, 11, "#6b4f2a");
  g.rect(2, 1, 5, 4, "#e53935").rect(2, 2, 6, 2, "#e53935");
  return g.outline(OUT);
}

/** The observatory (a dome with a telescope slot). */
export function scopeGrid(): Grid {
  const g = new Grid(12, 11);
  g.disc(5.5, 4.5, 4, "#dfe6f3").rect(1, 5, 10, 5, "#b9c3d6").rect(5, 1, 2, 4, "#3b4a6b").rect(4, 7, 3, 3, "#6b4f2a");
  return g.outline(OUT);
}

/** A glowing star gem (a dug-up treasure). */
export function gemGrid(): Grid {
  const g = new Grid(9, 9);
  g.tri(4, 0, 4, 4, "#7fd3ff").tri(4, 0, 2, 2, "#d6f3ff");
  for (let y = 5; y < 9; y++) g.rect(4 - (8 - y), y, (8 - y) * 2 + 1, 1, "#3aa0e0");
  return g.outline(OUT);
}

/** The explorer: a small figure in a snow parka. */
export function explorerGrid(): Grid {
  const g = new Grid(8, 11);
  g.rect(2, 0, 4, 2, "#e53935").rect(1, 2, 6, 3, "#f1c27d").set(2, 3, OUT).set(5, 3, OUT);
  g.rect(1, 5, 6, 4, "#2340ff").rect(0, 6, 1, 2, "#2340ff").rect(7, 6, 1, 2, "#2340ff");
  g.rect(2, 9, 1, 2, "#3b2b1f").rect(5, 9, 1, 2, "#3b2b1f");
  return g.outline(OUT);
}

const CUBE = 7;
const DEPTH = 3;
const PALETTES = [
  { front: "#f2c94c", top: "#ffe39a", side: "#c9971f", edge: "#8a6410" },
  { front: "#7fb2ff", top: "#bcd6ff", side: "#4b7fd6", edge: "#2a4f99" },
];

/**
 * A stack of unit cubes in an oblique view (front face square, depth up and
 * to the right). Prisms sit side by side, front faces lined up; `hideHeight`
 * draws only one layer of that prism.
 */
export function cubesGrid(prisms: Prism[]): Grid {
  const cubes: { x: number; y: number; z: number; p: number }[] = [];
  let ox = 0;
  prisms.forEach((pr, p) => {
    const h = pr.hideHeight ? 1 : pr.h;
    for (let z = 0; z < pr.w; z++) for (let y = 0; y < h; y++) for (let x = 0; x < pr.l; x++) cubes.push({ x: ox + x, y, z, p });
    ox += pr.l;
  });
  const L = ox;
  const H = Math.max(1, ...prisms.map((p) => (p.hideHeight ? 1 : p.h)));
  const W = Math.max(1, ...prisms.map((p) => p.w));
  const g = new Grid(L * (CUBE - 1) + W * DEPTH + 3, H * (CUBE - 1) + W * DEPTH + 3);
  const baseY = g.h - CUBE - 1;
  // back to front, bottom to top, left to right
  cubes.sort((a, b) => b.z - a.z || a.y - b.y || a.x - b.x);
  for (const c of cubes) {
    const pal = PALETTES[c.p % PALETTES.length];
    const fx = 1 + c.x * (CUBE - 1) + c.z * DEPTH;
    const fy = baseY - c.y * (CUBE - 1) - c.z * DEPTH;
    // top face
    for (let i = 1; i <= DEPTH; i++) for (let x = fx + i; x < fx + CUBE + i; x++) g.set(x, fy - i, i === DEPTH ? pal.edge : pal.top);
    // right face
    for (let i = 1; i <= DEPTH; i++) for (let y = fy - i; y < fy + CUBE - i; y++) g.set(fx + CUBE - 1 + i, y, i === DEPTH || y === fy + CUBE - 1 - i ? pal.edge : pal.side);
    // front face with an edge line
    for (let y = 0; y < CUBE; y++)
      for (let x = 0; x < CUBE; x++) g.set(fx + x, fy + y, x === 0 || y === 0 || x === CUBE - 1 || y === CUBE - 1 ? pal.edge : pal.front);
  }
  return g;
}

// ---------------- The game ----------------

export const treasureGrid: MiniGame = {
  ...treasureGridInfo,
  levels: () => [],
  levelsForGrade: (grade) => (TG_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
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
