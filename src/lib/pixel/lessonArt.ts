import { Grid, shade } from "./grid";

/**
 * Little animated scenes for the teaching board, drawn in the same pixel art
 * as the rest of the game.
 *
 * Two clocks drive a scene, and it needs both:
 *  - `t` is real time, always running: this is what makes it a moving picture.
 *  - `progress` is how far through the words it belongs to: this is what makes
 *    it teach, so the answer lands when it is explained and not before.
 *
 * Content refers to a scene by name (`art: "times-ten"`); the drawing lives
 * here, where it can be worked on without touching a lesson.
 */

export const SCENE_W = 112;
export const SCENE_H = 60;

export interface SceneCtx {
  /** 0 to 1 through the narration this picture belongs to. */
  progress: number;
  /** Seconds since this picture appeared. Always running. */
  t: number;
  /** Frame counter, for anything that just needs to alternate. */
  frame: number;
}

const INK = "#1b1530";
const PAPER = "#fffdf5";
const BLUE = "#2340ff";
const WARM = "#f2a516";
const GREEN = "#2b8a3e";
const MUTED = "#8d93a8";

/** Eases a value in over a slice of the scene, so things arrive rather than blink. */
function at(p: number, from: number, to = from + 0.12): number {
  if (p <= from) return 0;
  if (p >= to) return 1;
  const x = (p - from) / (to - from);
  return x * x * (3 - 2 * x);
}

// ---------------- A tiny pixel font, 3x5 ----------------

const GLYPHS: Record<string, string[]> = {
  "0": ["###", "# #", "# #", "# #", "###"],
  "1": [" # ", "## ", " # ", " # ", "###"],
  "2": ["###", "  #", "###", "#  ", "###"],
  "3": ["###", "  #", "###", "  #", "###"],
  "4": ["# #", "# #", "###", "  #", "  #"],
  "5": ["###", "#  ", "###", "  #", "###"],
  "6": ["###", "#  ", "###", "# #", "###"],
  "7": ["###", "  #", "  #", "  #", "  #"],
  "8": ["###", "# #", "###", "# #", "###"],
  "9": ["###", "# #", "###", "  #", "###"],
  ".": ["   ", "   ", "   ", "   ", " # "],
  ",": ["   ", "   ", "   ", " # ", "#  "],
  "x": ["   ", "# #", " # ", "# #", "   "],
  "=": ["   ", "###", "   ", "###", "   "],
  "?": ["###", "  #", " ##", "   ", " # "],
  " ": ["   ", "   ", "   ", "   ", "   "],
};

/** Draws one character. `s` scales each pixel into an s-by-s block. */
function glyph(g: Grid, ch: string, x: number, y: number, c: string, s = 1): void {
  const rows = GLYPHS[ch] ?? GLYPHS["?"];
  rows.forEach((row, ry) =>
    [...row].forEach((on, rx) => {
      if (on === "#") g.rect(x + rx * s, y + ry * s, s, s, c);
    }),
  );
}

/** Width of a string in pixels at scale `s`. */
const textW = (str: string, s = 1) => str.length * (3 * s + s) - s;

function text(g: Grid, str: string, x: number, y: number, c: string, s = 1): void {
  [...str].forEach((ch, i) => glyph(g, ch, x + i * (3 * s + s), y, c, s));
}

/** Centred text. */
function textC(g: Grid, str: string, cx: number, y: number, c: string, s = 1): void {
  text(g, str, Math.round(cx - textW(str, s) / 2), y, c, s);
}

function panel(g: Grid, x: number, y: number, w: number, h: number, fill = PAPER): void {
  g.rect(x, y, w, h, fill).rect(x, y, w, 1, shade(fill, -0.12)).rect(x, y + h - 1, w, 1, shade(fill, -0.2));
}

function backdrop(g: Grid): void {
  g.rect(0, 0, SCENE_W, SCENE_H, "#e7ecff");
}

/** A soft pulse, 0..1, for drawing attention without flashing. */
const pulse = (t: number, speed = 2) => (Math.sin(t * speed) + 1) / 2;

// ---------------- The scenes ----------------

const COLS = [
  { label: "100", x: 14 },
  { label: "10", x: 44 },
  { label: "1", x: 74 },
];

/**
 * 555: the same digit three times, worth something different in each column.
 * Each column lights in turn as the teacher names it, and the x10 arrows
 * between them appear once all three are up.
 */
function placeValue({ progress, t }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  const worth = ["500", "50", "5"];
  COLS.forEach((col, i) => {
    const shown = at(progress, 0.05 + i * 0.18, 0.05 + i * 0.18 + 0.12);
    const live = progress >= 0.05 + i * 0.18 && progress < 0.05 + (i + 1) * 0.18;
    panel(g, col.x - 12, 8, 24, 34, live ? "#fff3bf" : PAPER);
    textC(g, col.label, col.x, 11, MUTED, 1);
    // The digit itself, big.
    textC(g, "5", col.x, 18, live ? BLUE : INK, 2);
    if (shown > 0.5) textC(g, worth[i], col.x, 34, GREEN, 1);
    // A quiet pulse under whichever column is being talked about.
    if (live && pulse(t, 4) > 0.5) g.rect(col.x - 12, 42, 24, 1, WARM);
  });
  // x10 arrows, right to left, once the columns are all up.
  if (at(progress, 0.62) > 0.4) {
    [0, 1].forEach((i) => {
      const x0 = COLS[i].x + 13;
      const x1 = COLS[i + 1].x - 13;
      g.rect(x0, 50, x1 - x0, 1, INK);
      g.tri(x0, 48, 52, 2, INK);
      textC(g, "x10", (x0 + x1) / 2, 52, INK, 1);
    });
  }
  return g.outline(INK);
}

/**
 * Multiplying by ten: the digits physically slide one column to the left, and
 * the decimal point stays put. This is the whole idea, so it is the motion.
 */
function timesTen({ progress, t }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  // Column guides.
  for (let i = 0; i < 5; i++) g.rect(14 + i * 18, 14, 1, 26, "#cdd6f5");
  // The digits slide left by one column across the middle of the scene.
  const slide = at(progress, 0.25, 0.72);
  const shift = slide * 18;
  const digits = [
    { ch: "4", home: 20 },
    { ch: ".", home: 36 },
    { ch: "7", home: 44 },
  ];
  digits.forEach((d) => {
    // The point stays where it is; the digits move past it.
    const x = d.ch === "." ? d.home : d.home + shift;
    textC(g, d.ch, x, 20, d.ch === "." ? MUTED : BLUE, 2);
  });
  // A nudge arrow while they are moving.
  if (slide > 0 && slide < 1) {
    const wob = Math.round(pulse(t, 8) * 2);
    g.rect(30 + wob, 44, 14, 1, WARM);
    g.tri(30 + wob, 42, 46, 2, WARM);
  }
  textC(g, "x10", 90, 20, INK, 1);
  if (slide >= 1) textC(g, "47", 56, 44, GREEN, 2);
  return g.outline(INK);
}

/**
 * The exponent counts the zeros. Each zero lands as it is counted, and the
 * exponent ticks up with them.
 */
function exponentZeros({ progress, t }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  const n = Math.min(3, Math.floor(at(progress, 0.1, 0.8) * 4));
  // 10 with a small raised exponent.
  text(g, "10", 12, 14, INK, 2);
  if (n > 0) text(g, String(n), 12 + textW("10", 2) + 2, 11, BLUE, 1);
  textC(g, "=", 52, 18, MUTED, 2);
  // The 1, then a zero for each power counted.
  text(g, "1", 64, 14, INK, 2);
  for (let i = 0; i < n; i++) {
    const x = 64 + textW("1", 2) + 2 + i * 10;
    // The newest zero drops in.
    const age = at(progress, 0.1 + i * 0.2, 0.1 + i * 0.2 + 0.12);
    const drop = Math.round((1 - age) * 8);
    text(g, "0", x, 14 - drop, age > 0.9 ? GREEN : BLUE, 2);
  }
  if (n > 0) {
    const label = n === 1 ? "one zero" : n === 2 ? "two zeros" : "three zeros";
    textC(g, String(n), 20, 44, WARM, 1);
    textC(g, label.replace(/[a-z ]/g, "").length ? "" : "", 56, 44, INK, 1);
    // A tick under the exponent while it is being made.
    if (pulse(t, 3) > 0.5) g.rect(10, 40, 20, 1, WARM);
  }
  return g.outline(INK);
}

/**
 * Dividing by ten: the same slide, the other way, which is why it is the same
 * idea rather than a new rule to remember.
 */
function divideByTen({ progress, t }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  for (let i = 0; i < 5; i++) g.rect(14 + i * 18, 14, 1, 26, "#cdd6f5");
  const slide = at(progress, 0.25, 0.72);
  const shift = slide * 18;
  textC(g, "3", 38 - shift, 20, BLUE, 2);
  textC(g, "6", 56 - shift, 20, BLUE, 2);
  if (slide > 0.5) textC(g, ".", 56, 20, MUTED, 2);
  if (slide > 0 && slide < 1) {
    const wob = Math.round(pulse(t, 8) * 2);
    g.rect(60 - wob, 44, 14, 1, WARM);
    g.tri(74 - wob, 42, 46, 2, WARM);
  }
  textC(g, "10", 92, 20, INK, 1);
  if (slide >= 1) textC(g, "3.6", 50, 44, GREEN, 2);
  return g.outline(INK);
}

/** Each place is ten of the next one down: a stack that grows as it is said. */
function tenOfThese({ progress, t }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  // Ten ones stack up into one ten.
  const made = Math.floor(at(progress, 0.08, 0.6) * 10);
  for (let i = 0; i < made; i++) {
    const x = 10 + (i % 5) * 7;
    const y = 30 - Math.floor(i / 5) * 8;
    g.rect(x, y, 5, 6, WARM).rect(x, y, 5, 1, shade(WARM, 0.3));
  }
  textC(g, "1", 27, 40, MUTED, 1);
  if (made >= 10) {
    // They become a single ten-rod.
    const grow = at(progress, 0.62, 0.85);
    const h = Math.round(26 * grow);
    if (h > 0) {
      g.rect(78, 36 - h, 10, h, BLUE).rect(78, 36 - h, 10, 1, shade(BLUE, 0.3));
      for (let i = 1; i < 10; i++) {
        const yy = 36 - h + Math.round((h * i) / 10);
        g.rect(78, yy, 10, 1, shade(BLUE, -0.3));
      }
    }
    textC(g, "10", 83, 40, MUTED, 1);
    if (grow > 0.9 && pulse(t, 3) > 0.4) {
      g.rect(42, 20, 22, 1, GREEN);
      g.tri(64, 18, 48, 2, GREEN);
    }
  }
  return g.outline(INK);
}

export const LESSON_SCENES: Record<string, (ctx: SceneCtx) => Grid> = {
  "place-value": placeValue,
  "ten-of-these": tenOfThese,
  "times-ten": timesTen,
  "divide-by-ten": divideByTen,
  "exponent-zeros": exponentZeros,
};

export const sceneNames = () => Object.keys(LESSON_SCENES);
export const hasScene = (name: string) => name in LESSON_SCENES;
