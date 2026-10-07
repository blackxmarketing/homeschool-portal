import { Grid, shade } from "./grid";

/**
 * Little animated scenes for the teaching board, drawn in the same pixel art
 * as the rest of the game.
 *
 * A scene is a function of where the teacher has got to, not just a clock: it
 * is handed `progress` (0 to 1 through the words this picture belongs to) and
 * `frame` (a slow tick for idle movement). So the picture builds as the teacher
 * explains it, which is the difference between a video and a slideshow.
 *
 * Content refers to a scene by name (`art: "redi-jars"`); the drawing lives
 * here, where it can be worked on without touching any lesson.
 */

export const SCENE_W = 96;
export const SCENE_H = 54;

export interface SceneCtx {
  /** 0 to 1 through the narration this picture belongs to. */
  progress: number;
  /** Slow tick, for idle movement that should not depend on the words. */
  frame: number;
}

const INK = "#1b1530";
const SKY = "#dfe7ff";
const FLOOR = "#c8b89d";

/** Eases a value in over a slice of the scene, so things arrive rather than blink. */
function at(p: number, from: number, to = from + 0.12): number {
  if (p <= from) return 0;
  if (p >= to) return 1;
  return (p - from) / (to - from);
}

function backdrop(g: Grid, floor = true): void {
  g.rect(0, 0, SCENE_W, SCENE_H, SKY);
  if (floor) g.rect(0, SCENE_H - 8, SCENE_W, 8, FLOOR).rect(0, SCENE_H - 8, SCENE_W, 1, shade(FLOOR, -0.25));
}

// ---------------- Props, reused across scenes ----------------

function jar(g: Grid, x: number, y: number, cover: "open" | "sealed" | "gauze"): void {
  const glass = "#cfe8f5";
  g.rect(x, y + 4, 14, 18, glass).rect(x + 1, y + 5, 3, 16, "#eaf6ff");
  g.rect(x, y + 4, 14, 1, shade(glass, -0.2));
  // Meat inside.
  g.rect(x + 3, y + 15, 8, 5, "#c2504f").rect(x + 4, y + 16, 4, 2, "#e07a79");
  if (cover === "sealed") g.rect(x - 1, y + 1, 16, 4, "#8d6a4a").rect(x - 1, y + 1, 16, 1, "#a8815c");
  if (cover === "gauze") {
    g.rect(x - 1, y + 2, 16, 3, "#efe6cf");
    for (let i = 0; i < 16; i += 2) g.set(x - 1 + i, y + 3, shade("#efe6cf", -0.25));
  }
  g.rect(x, y + 22, 14, 1, shade(glass, -0.35));
}

function fly(g: Grid, x: number, y: number, frame: number): void {
  const wing = frame % 2 === 0 ? 1 : 0;
  g.rect(x, y, 2, 2, "#2f2b3a");
  g.set(x - 1, y - wing, "#9aa7c7").set(x + 2, y - wing, "#9aa7c7");
}

function cup(g: Grid, x: number, y: number, warm: boolean, fullness: number): void {
  const body = "#f3f5ff";
  g.rect(x, y, 16, 20, body).rect(x, y, 16, 1, shade(body, -0.2)).rect(x, y + 19, 16, 1, shade(body, -0.3));
  const water = warm ? "#ff9e6b" : "#7cc4ff";
  const h = Math.round(14 * 0.9);
  g.rect(x + 2, y + 20 - 2 - h, 12, h, water);
  // Sugar still undissolved sinks to the bottom and shrinks as it goes.
  const grains = Math.max(0, Math.round(5 * (1 - fullness)));
  for (let i = 0; i < grains; i++) g.set(x + 4 + i * 2, y + 16, "#ffffff");
  if (warm) for (let i = 0; i < 3; i++) g.set(x + 4 + i * 4, y - 2, "#ffd9c2");
}

function tick(g: Grid, x: number, y: number): void {
  g.rect(x, y + 3, 2, 2, "#2b8a3e").rect(x + 2, y + 5, 2, 2, "#2b8a3e");
  g.rect(x + 4, y + 3, 2, 2, "#2b8a3e").rect(x + 6, y + 1, 2, 2, "#2b8a3e").rect(x + 8, y - 1, 2, 2, "#2b8a3e");
}

function cross(g: Grid, x: number, y: number): void {
  for (let i = 0; i < 8; i++) {
    g.set(x + i, y + i, "#c92a2a").set(x + i + 1, y + i, "#c92a2a");
    g.set(x + 7 - i, y + i, "#c92a2a").set(x + 8 - i, y + i, "#c92a2a");
  }
}

function block(g: Grid, x: number, y: number, w: number, h: number, c: string): void {
  g.rect(x, y, w, h, c).rect(x, y, w, 1, shade(c, 0.25)).rect(x, y + h - 1, w, 1, shade(c, -0.25));
}

function towel(g: Grid, x: number, y: number, w: number, h: number, c: string, wet: number): void {
  g.rect(x, y, w, h, c).rect(x, y, w, 1, shade(c, 0.2));
  const soaked = Math.round(h * wet);
  if (soaked > 0) g.rect(x, y + h - soaked, w, soaked, shade(c, -0.35));
}

function bar(g: Grid, x: number, y: number, h: number, c: string): void {
  g.rect(x, y - h, 8, h, c).rect(x, y - h, 8, 1, shade(c, 0.25));
}

// ---------------- The scenes ----------------

/** A question science can answer, and one it cannot. */
function testableOrNot({ progress }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  // Left: a matter of taste.
  g.disc(24, 20, 7, "#f3c9d8").disc(22, 18, 2.4, "#ffe3ec");
  g.tri(24, 27, 38, 5, "#d9a05b");
  if (at(progress, 0.2) > 0.6) cross(g, 20, 34);
  // Right: something you can measure.
  cup(g, 60, 14, true, 0.5);
  g.disc(82, 20, 5, "#e9ecf7").disc(82, 20, 4, "#ffffff").rect(82, 17, 1, 4, INK).rect(82, 20, 3, 1, "#c92a2a");
  if (at(progress, 0.55) > 0.6) tick(g, 62, 36);
  return g.outline(INK);
}

/** The three parts of a hypothesis, arriving one at a time. */
function ifThenBecause({ progress }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g, false);
  const cols = ["#2340ff", "#16a3b8", "#f2a516"];
  [0.05, 0.35, 0.65].forEach((start, i) => {
    const a = at(progress, start, start + 0.2);
    if (a <= 0) return;
    const h = Math.round(16 * a);
    block(g, 8 + i * 29, 34 - h, 24, h, cols[i]);
    if (a > 0.9) g.rect(8 + i * 29 + 4, 38, 16, 2, shade(cols[i], -0.4));
  });
  // The arrow that joins them, once all three are up.
  if (at(progress, 0.85) > 0.5) {
    g.rect(10, 46, 76, 2, INK);
    g.tri(88, 44, 50, 3, INK);
  }
  return g.outline(INK);
}

/** Warm water dissolves the sugar first: the whole point of the test. */
function warmVsCold(ctx: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  const p = ctx.progress;
  // Warm gets there about twice as fast as cold.
  cup(g, 18, 22, true, Math.min(1, p * 2));
  cup(g, 62, 22, false, Math.min(1, p));
  if (at(p, 0.6) > 0.5) tick(g, 20, 14);
  return g.outline(INK);
}

/** Redi's jars: flies reach the open meat, and nothing else. */
function rediJars(ctx: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  jar(g, 8, 20, "open");
  jar(g, 40, 20, "sealed");
  jar(g, 72, 20, "gauze");
  const p = ctx.progress;
  // Flies circle, then settle on the open jar only.
  const n = Math.round(at(p, 0.1, 0.5) * 3);
  for (let i = 0; i < n; i++) {
    const bob = (ctx.frame + i) % 2;
    fly(g, 12 + i * 4, 18 - bob - Math.round(at(p, 0.5, 0.9) * 2), ctx.frame + i);
  }
  if (at(p, 0.75) > 0.5) {
    tick(g, 10, 48);
    cross(g, 44, 46);
    cross(g, 76, 46);
  }
  return g.outline(INK);
}

/** Two things changed at once, so the result proves nothing. */
function unfairTowels(ctx: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  const p = ctx.progress;
  const wet = at(p, 0.2, 0.7);
  towel(g, 12, 16, 26, 28, "#8fd3ff", wet);
  towel(g, 58, 28, 14, 16, "#ffd9a0", wet * 0.8);
  if (at(p, 0.7) > 0.5) {
    // Two labels of difference, which is exactly the problem.
    g.rect(10, 46, 30, 3, "#c92a2a");
    g.rect(56, 46, 18, 3, "#c92a2a");
  }
  return g.outline(INK);
}

/** Three trials, then the average of them. */
function threeTrials({ progress }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g);
  const base = SCENE_H - 8;
  const hs = [16, 24, 32];
  hs.forEach((h, i) => {
    const a = at(progress, 0.08 + i * 0.18, 0.08 + i * 0.18 + 0.14);
    if (a > 0) bar(g, 16 + i * 20, base, Math.round(h * a), "#2340ff");
  });
  if (at(progress, 0.7) > 0.4) {
    const avg = base - 24;
    for (let x = 10; x < 80; x += 4) g.rect(x, avg, 2, 1, "#f2a516");
    g.rect(82, avg - 2, 6, 5, "#f2a516");
  }
  return g.outline(INK);
}

/** One knob turned, one thing measured, the rest locked still. */
function threeVariables({ progress }: SceneCtx): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  backdrop(g, false);
  // The knob you turn.
  if (at(progress, 0.02) > 0.3) {
    g.disc(18, 22, 9, "#e9ecf7").disc(18, 22, 7, "#ffffff");
    const angle = at(progress, 0.05, 0.35);
    g.rect(18, 22 - 6, 2, 6, "#2340ff");
    if (angle > 0.5) g.rect(22, 20, 4, 2, "#2340ff");
  }
  // The thing you measure.
  if (at(progress, 0.35) > 0.3) {
    g.disc(48, 22, 9, "#e9ecf7").disc(48, 22, 7, "#ffffff");
    g.rect(48, 17, 1, 5, INK).rect(48, 22, 4, 1, "#c92a2a");
  }
  // Everything else, locked.
  if (at(progress, 0.65) > 0.3) {
    for (let i = 0; i < 3; i++) {
      const x = 72 + (i % 2) * 12;
      const y = 14 + Math.floor(i / 2) * 16;
      g.rect(x, y + 4, 8, 7, "#f2a516").rect(x + 2, y, 4, 5, shade("#f2a516", -0.3)).set(x + 3, y + 7, INK);
    }
  }
  return g.outline(INK);
}

export const LESSON_SCENES: Record<string, (ctx: SceneCtx) => Grid> = {
  "testable-or-not": testableOrNot,
  "if-then-because": ifThenBecause,
  "warm-vs-cold": warmVsCold,
  "redi-jars": rediJars,
  "unfair-towels": unfairTowels,
  "three-trials": threeTrials,
  "three-variables": threeVariables,
};

export const sceneNames = () => Object.keys(LESSON_SCENES);
export const hasScene = (name: string) => name in LESSON_SCENES;
