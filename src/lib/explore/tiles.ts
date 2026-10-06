import { Grid, shade } from "../pixel/grid";
import { T } from "./map";
import type { ThemeId } from "./worlds";

/**
 * The look of each K-5 world, drawn in code like the rest of the pixel art:
 * 16x16 ground tiles per theme (with a few variants so the ground doesn't
 * look like wallpaper) and the sprites for lanterns, lesson stones, arcades,
 * houses, chests, sparks and quest items.
 */

export const TILE = 16;
const OUT = "#1b1530";

interface Palette {
  ground: string;
  ground2: string;
  path: string;
  path2: string;
  water: string;
  water2: string;
  plaza: string;
  plaza2: string;
  bridge: string;
  flowers: string[];
  tall: string;
  void: string;
  void2: string;
  /** Tree or rock colors. */
  leaf: string;
  leaf2: string;
  trunk: string;
  rock: string;
}

export const THEMES: Record<ThemeId, Palette> = {
  meadow: { ground: "#7ed957", ground2: "#6cc94a", path: "#e8c98a", path2: "#d9b677", water: "#4dabf7", water2: "#74c0fc", plaza: "#f1dfb6", plaza2: "#e6d09f", bridge: "#b07a4a", flowers: ["#ff8fab", "#ffd43b", "#ffffff", "#b197fc"], tall: "#5fbf3c", void: "#a5d8ff", void2: "#d0ebff", leaf: "#40a832", leaf2: "#5fd04a", trunk: "#8b5a2b", rock: "#adb5bd" },
  forest: { ground: "#4f9e3a", ground2: "#468f33", path: "#b98b5a", path2: "#a77b4d", water: "#3b8fd1", water2: "#5aa9e6", plaza: "#c9a77a", plaza2: "#b8966a", bridge: "#8b5a2b", flowers: ["#ffd43b", "#ff8787", "#ffffff"], tall: "#3f8a2e", void: "#a5d8ff", void2: "#d0ebff", leaf: "#1f6b2a", leaf2: "#2f8a3a", trunk: "#6b4423", rock: "#868e96" },
  river: { ground: "#8fd16a", ground2: "#80c35c", path: "#d6b98a", path2: "#c7a978", water: "#2f9ae0", water2: "#5bb6f0", plaza: "#d9cdb8", plaza2: "#c9bca5", bridge: "#a0703f", flowers: ["#ffd43b", "#ff922b", "#ffffff"], tall: "#6fb84c", void: "#a5d8ff", void2: "#d0ebff", leaf: "#2f9e44", leaf2: "#51cf66", trunk: "#7a4f22", rock: "#adb5bd" },
  sky: { ground: "#b2f2bb", ground2: "#a3e4ac", path: "#f8f0e3", path2: "#ece2d0", water: "#74c0fc", water2: "#a5d8ff", plaza: "#fff4e6", plaza2: "#f3e6d3", bridge: "#d4a373", flowers: ["#ffd43b", "#f783ac", "#b197fc"], tall: "#8ce99a", void: "#74c0fc", void2: "#e7f5ff", leaf: "#40c057", leaf2: "#8ce99a", trunk: "#a0703f", rock: "#ced4da" },
  canyon: { ground: "#e07a4f", ground2: "#d06d43", path: "#f2c48d", path2: "#e3b47c", water: "#4dabf7", water2: "#74c0fc", plaza: "#f6d7a7", plaza2: "#ebc894", bridge: "#8b5a2b", flowers: ["#ffd43b", "#f783ac", "#ffffff"], tall: "#c8a165", void: "#a5d8ff", void2: "#d0ebff", leaf: "#7c9a3a", leaf2: "#94b84a", trunk: "#6b4423", rock: "#a8442a" },
  peaks: { ground: "#eef3f8", ground2: "#dfe7f0", path: "#c9b79c", path2: "#b9a78c", water: "#a5d8ff", water2: "#d0ebff", plaza: "#d6cfc4", plaza2: "#c7bfb3", bridge: "#8b5a2b", flowers: ["#74c0fc", "#ffffff"], tall: "#c3d0de", void: "#a5d8ff", void2: "#d0ebff", leaf: "#1e5a3a", leaf2: "#2b7a4f", trunk: "#5c3d1e", rock: "#8a94a6" },
};

const hash = (x: number, y: number) => {
  let h = (x * 374761393 + y * 668265263) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return h;
};

/** One 16x16 ground tile. `frame` 0/1 animates water and the sky. */
export function tileGrid(theme: ThemeId, t: number, x: number, y: number, frame: number): Grid {
  const p = THEMES[theme];
  const g = new Grid(TILE, TILE);
  const h = hash(x, y);
  const speckle = (base: string, dot: string, n: number) => {
    g.rect(0, 0, TILE, TILE, base);
    for (let i = 0; i < n; i++) {
      const v = hash(x * 31 + i, y * 17 + i);
      g.set(v % 16, (v >> 4) % 16, dot);
    }
  };
  switch (t) {
    case T.PATH:
      speckle(p.path, p.path2, 10);
      break;
    case T.PLAZA:
      g.rect(0, 0, TILE, TILE, p.plaza);
      g.rect(0, 7, TILE, 1, p.plaza2).rect(0, 15, TILE, 1, p.plaza2).rect((y % 2) * 8, 0, 1, 7, p.plaza2).rect(((y + 1) % 2) * 8, 8, 1, 7, p.plaza2);
      break;
    case T.WATER: {
      g.rect(0, 0, TILE, TILE, p.water);
      const o = (frame + (h & 1)) % 2 ? 4 : 0;
      g.rect((2 + o) % 16, 4, 4, 1, p.water2).rect((9 + o) % 16, 11, 5, 1, p.water2);
      break;
    }
    case T.BRIDGE:
      g.rect(0, 0, TILE, TILE, p.bridge);
      for (let i = 0; i < TILE; i += 4) g.rect(0, i, TILE, 1, shade(p.bridge, -0.3));
      g.rect(0, 0, 1, TILE, shade(p.bridge, -0.45)).rect(15, 0, 1, TILE, shade(p.bridge, -0.45));
      break;
    case T.VOID: {
      g.rect(0, 0, TILE, TILE, p.void);
      if (h % 7 === 0) {
        const cx = (h >> 3) % 10;
        g.rect(cx + frame, 6, 6, 2, p.void2).rect(cx + 1 + frame, 5, 4, 1, p.void2);
      }
      break;
    }
    case T.FLOWERS:
      speckle(p.ground, p.ground2, 6);
      for (let i = 0; i < 3; i++) {
        const v = hash(x * 7 + i, y * 13 + i);
        const fx = 2 + (v % 12);
        const fy = 2 + ((v >> 4) % 12);
        const c = p.flowers[(v >> 8) % p.flowers.length];
        g.set(fx, fy, c).set(fx - 1, fy, c).set(fx + 1, fy, c).set(fx, fy - 1, c).set(fx, fy + 1, c).set(fx, fy, "#ffd43b");
      }
      break;
    case T.TALL:
      speckle(p.ground, p.ground2, 6);
      for (let i = 0; i < 5; i++) {
        const v = hash(x * 11 + i, y * 5 + i);
        const fx = 1 + (v % 14);
        const fy = 6 + ((v >> 4) % 8);
        g.rect(fx, fy - 3, 1, 4, p.tall).set(fx + 1, fy - 2, p.tall);
      }
      break;
    case T.BLOCK:
      speckle(p.ground, p.ground2, 6);
      g.draw(blocker(theme, h), 0, 0);
      break;
    default:
      speckle(p.ground, p.ground2, 8);
  }
  return g;
}

/** A tree, bush or rock (outlined), by theme. */
function blocker(theme: ThemeId, h: number): Grid {
  const p = THEMES[theme];
  const g = new Grid(TILE, TILE);
  const kind = h % 3;
  if (theme === "canyon" || (theme === "peaks" && kind === 0) || (theme === "sky" && kind === 0)) {
    // Rock / mesa
    g.rect(2, 5, 12, 10, p.rock).rect(3, 3, 9, 2, p.rock).rect(3, 5, 10, 2, shade(p.rock, 0.2)).rect(2, 11, 12, 1, shade(p.rock, -0.25));
    if (theme === "peaks") g.rect(3, 3, 9, 2, "#ffffff");
    return g.outline(OUT);
  }
  if (theme === "forest" || theme === "peaks") {
    // Pine
    g.tri(8, 0, 11, 6, p.leaf).tri(8, 3, 11, 5, p.leaf2).rect(7, 12, 2, 3, p.trunk);
    if (theme === "peaks") g.set(8, 0, "#ffffff").rect(7, 1, 3, 1, "#ffffff").rect(5, 5, 2, 1, "#ffffff").rect(10, 7, 2, 1, "#ffffff");
    return g.outline(OUT);
  }
  if (kind === 2 && theme === "meadow") {
    // Bush
    g.disc(8, 10, 5, p.leaf).disc(6, 9, 2, p.leaf2).set(10, 8, "#ff8787").set(5, 12, "#ff8787");
    return g.outline(OUT);
  }
  // Round tree
  g.disc(8, 6, 6, p.leaf).disc(6, 4, 2.5, p.leaf2).rect(7, 12, 2, 3, p.trunk);
  return g.outline(OUT);
}

/** Recolors a pixel toward gray: 1 = full color, 0 = gray. */
export function saturate(hex: string, s: number): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const k = Math.max(0, Math.min(1, s));
  const dim = 0.8 + 0.2 * k;
  return [Math.round((l + (r - l) * k) * dim), Math.round((l + (g - l) * k) * dim), Math.round((l + (b - l) * k) * dim)];
}

// ---------- Object sprites ----------

export function lanternGrid(lit: boolean, frame: number): Grid {
  const g = new Grid(16, 24);
  g.rect(7, 12, 2, 11, "#5c3d1e").rect(5, 22, 6, 2, "#5c3d1e");
  g.rect(4, 2, 8, 10, lit ? (frame ? "#ffe066" : "#ffd43b") : "#495057").rect(5, 3, 6, 8, lit ? "#fff3bf" : "#343a40");
  g.rect(3, 1, 10, 1, "#343a40").rect(3, 12, 10, 1, "#343a40").rect(6, 0, 4, 1, "#343a40");
  if (lit) g.rect(7, 5, 2, 4, "#ff922b");
  return g.outline(OUT);
}

export function stoneGrid(status: "done" | "open" | "waiting" | "locked", next: boolean, frame: number): Grid {
  const g = new Grid(16, 16);
  const base = status === "locked" ? "#868e96" : status === "done" ? "#f59f00" : "#4dabf7";
  g.rect(3, 4, 10, 11, base).rect(4, 2, 8, 2, base).rect(4, 4, 8, 1, shade(base, 0.3)).rect(3, 13, 10, 2, shade(base, -0.3));
  if (status === "done") g.rect(7, 6, 2, 5, "#fff3bf").rect(5, 8, 6, 1, "#fff3bf");
  else if (status === "locked") g.rect(6, 8, 4, 4, "#495057").rect(7, 6, 2, 2, "#495057");
  else g.rect(6, 6, 4, 6, next && frame ? "#ffffff" : "#d0ebff");
  return g.outline(OUT);
}

export function arcadeGrid(hue: string): Grid {
  const g = new Grid(32, 32);
  g.rect(3, 10, 26, 21, "#f8f0e3").rect(1, 6, 30, 5, hue).tri(16, 0, 6, 15, hue).rect(1, 10, 30, 1, shade(hue, -0.35));
  g.rect(12, 19, 8, 12, "#7a4f22").rect(13, 20, 6, 11, "#a0703f").set(17, 25, "#ffd43b");
  g.rect(5, 14, 5, 5, "#74c0fc").rect(22, 14, 5, 5, "#74c0fc").set(6, 15, "#ffffff").set(23, 15, "#ffffff");
  // A little star sign
  g.rect(13, 12, 6, 5, "#1b1530").set(16, 13, "#ffd43b").set(15, 14, "#ffd43b").set(16, 14, "#ffd43b").set(17, 14, "#ffd43b").set(16, 15, "#ffd43b");
  return g.outline(OUT);
}

export function homeGrid(): Grid {
  const g = new Grid(32, 32);
  g.rect(4, 13, 24, 18, "#fff3bf").tri(16, 1, 13, 15, "#e03131").rect(1, 13, 30, 1, "#a61e1e");
  g.rect(13, 20, 6, 11, "#8b5a2b").set(17, 25, "#ffd43b").rect(6, 17, 5, 5, "#74c0fc").rect(21, 17, 5, 5, "#74c0fc").rect(22, 4, 3, 6, "#868e96");
  return g.outline(OUT);
}

export function gateGrid(frame: number): Grid {
  const g = new Grid(32, 32);
  g.rect(2, 6, 6, 26, "#adb5bd").rect(24, 6, 6, 26, "#adb5bd").rect(2, 2, 28, 6, "#ced4da").rect(2, 7, 28, 1, "#868e96");
  g.rect(8, 8, 16, 24, frame ? "#9775fa" : "#845ef7").rect(11, 12, 10, 16, frame ? "#d0bfff" : "#b197fc").rect(14, 16, 4, 8, "#ffffff");
  g.set(15, 3, "#ffd43b").set(16, 3, "#ffd43b").set(15, 4, "#ffd43b").set(16, 4, "#ffd43b");
  return g.outline(OUT);
}

export function wardrobeGrid(): Grid {
  const g = new Grid(16, 16);
  g.rect(2, 1, 12, 15, "#a0703f").rect(3, 2, 5, 13, "#b07a4a").rect(8, 2, 5, 13, "#b07a4a").set(7, 8, "#ffd43b").set(8, 8, "#ffd43b").rect(2, 1, 12, 1, "#7a4f22");
  return g.outline(OUT);
}

export function signGrid(): Grid {
  const g = new Grid(16, 16);
  g.rect(7, 9, 2, 7, "#7a4f22").rect(2, 2, 12, 8, "#c8915a").rect(3, 4, 10, 1, "#7a4f22").rect(3, 6, 7, 1, "#7a4f22");
  return g.outline(OUT);
}

export function chestGrid(open: boolean): Grid {
  const g = new Grid(16, 16);
  if (open) {
    g.rect(2, 8, 12, 7, "#a0703f").rect(2, 3, 12, 4, "#8b5a2b").rect(3, 7, 10, 2, "#ffd43b").rect(2, 10, 12, 1, "#5c3d1e");
  } else {
    g.rect(2, 5, 12, 10, "#a0703f").rect(2, 5, 12, 3, "#8b5a2b").rect(2, 9, 12, 1, "#5c3d1e").rect(7, 8, 2, 3, "#ffd43b");
  }
  return g.outline(OUT);
}

export function sparkGrid(frame: number): Grid {
  const g = new Grid(10, 10);
  const c = frame ? "#fff3bf" : "#ffd43b";
  g.rect(4, 1, 2, 8, c).rect(1, 4, 8, 2, c).rect(3, 3, 4, 4, "#ffffff");
  if (frame) g.set(1, 1, "#ffe066").set(8, 8, "#ffe066");
  return g;
}

export function itemGrid(sprite: "duckling" | "acorn" | "float" | "feather" | "fossil" | "starmap"): Grid {
  const g = new Grid(12, 12);
  switch (sprite) {
    case "duckling":
      g.rect(2, 6, 7, 4, "#ffd43b").rect(6, 3, 4, 4, "#ffd43b").rect(10, 4, 2, 1, "#ff922b").set(8, 4, OUT);
      break;
    case "acorn":
      g.rect(3, 2, 6, 3, "#8b5a2b").rect(4, 5, 4, 5, "#c87533").set(6, 1, "#5c3d1e").set(6, 10, "#a0522d");
      break;
    case "float":
      g.disc(6, 6, 4, "#e03131").rect(2, 6, 9, 2, "#ffffff").rect(5, 0, 2, 2, "#495057");
      break;
    case "feather":
      g.rect(5, 1, 2, 10, "#339af0").rect(3, 2, 2, 6, "#74c0fc").rect(7, 3, 2, 6, "#1c7ed6").set(6, 11, "#f8f0e3");
      break;
    case "fossil":
      g.disc(6, 6, 5, "#ced4da");
      g.set(6, 6, "#868e96").set(7, 6, "#868e96").set(7, 5, "#868e96").set(6, 4, "#868e96").set(5, 5, "#868e96").set(4, 6, "#868e96").set(5, 8, "#868e96").set(8, 8, "#868e96");
      break;
    case "starmap":
      g.rect(1, 2, 10, 8, "#f4e4bc").rect(1, 2, 10, 1, "#d9b677").set(3, 5, "#1c2541").set(6, 4, "#1c2541").set(8, 7, "#1c2541").set(4, 7, "#1c2541");
      break;
  }
  return g.outline(OUT);
}

/** Pip the firefly: a little glowing bug with flapping wings. */
export function pipGrid(frame: number): Grid {
  const g = new Grid(12, 12);
  g.rect(4, 4, 4, 5, "#495057").rect(4, 8, 4, 3, frame ? "#ffe066" : "#ffd43b").set(5, 5, "#ffffff").set(6, 5, "#ffffff");
  if (frame) g.rect(0, 2, 4, 3, "#d0ebff").rect(8, 2, 4, 3, "#d0ebff");
  else g.rect(1, 4, 3, 2, "#d0ebff").rect(8, 4, 3, 2, "#d0ebff");
  g.set(4, 3, OUT).set(7, 3, OUT).set(3, 2, OUT).set(8, 2, OUT);
  return g.outline(OUT);
}

/** Each world's landmark, 32x32. */
export function landmarkGrid(theme: ThemeId, frame: number): Grid {
  const g = new Grid(32, 32);
  switch (theme) {
    case "meadow": {
      g.rect(11, 12, 10, 19, "#f1e3c6").rect(12, 8, 8, 4, "#c92a2a").rect(14, 22, 4, 9, "#8b5a2b").set(16, 15, "#74c0fc");
      const blades = frame ? [[16, 10, 1, -1], [16, 10, -1, 1]] : [[16, 10, 1, 1], [16, 10, -1, -1]];
      for (const [x, y, dx, dy] of blades) for (let i = 1; i < 10; i++) g.set(x + dx * i, y + dy * i, "#5c3d1e").set(x + dx * i + 1, y + dy * i, "#e9ecef");
      break;
    }
    case "forest":
      g.disc(16, 11, 12, "#2b8a3e").disc(10, 8, 6, "#40c057").disc(22, 9, 5, "#37b24d").rect(12, 18, 8, 13, "#6b4423").rect(14, 23, 4, 6, "#3b2414").rect(9, 29, 14, 2, "#6b4423");
      break;
    case "river":
      g.rect(4, 10, 16, 21, "#d6b98a").tri(12, 2, 10, 10, "#a0522d").rect(9, 20, 5, 11, "#7a4f22").rect(6, 13, 4, 4, "#74c0fc");
      g.disc(24, 20, 8, "#8b5a2b").disc(24, 20, 5, "#a47148");
      for (let a = 0; a < 8; a++) {
        const ang = (a / 8) * Math.PI * 2 + (frame ? 0.4 : 0);
        g.set(24 + Math.round(Math.cos(ang) * 7), 20 + Math.round(Math.sin(ang) * 7), "#5c3d1e");
      }
      break;
    case "sky":
      g.disc(16, 11, 10, frame ? "#ff6b6b" : "#fa5252").rect(6, 10, 20, 2, "#ffd43b").rect(10, 4, 2, 14, "#ffffff").rect(20, 4, 2, 14, "#ffffff");
      g.rect(12, 21, 1, 4, "#5c3d1e").rect(19, 21, 1, 4, "#5c3d1e").rect(11, 25, 10, 6, "#a0703f").rect(11, 25, 10, 1, "#7a4f22");
      break;
    case "canyon":
      g.rect(0, 6, 32, 26, "#a8442a").rect(0, 6, 32, 3, "#c0582f").rect(3, 14, 8, 8, "#e6b38e").rect(14, 12, 10, 10, "#e6b38e").rect(26, 16, 5, 6, "#e6b38e");
      g.rect(5, 17, 2, 3, "#5c3d1e").rect(17, 15, 2, 3, "#5c3d1e").rect(21, 15, 2, 3, "#5c3d1e").rect(27, 18, 2, 3, "#5c3d1e").rect(2, 22, 30, 2, "#8a3520");
      break;
    case "peaks":
      g.rect(5, 16, 22, 15, "#e9ecef").disc(16, 16, 10, "#ced4da").rect(5, 16, 22, 1, "#868e96").rect(14, 7, 4, 9, "#495057").rect(15, 6, 2, 3, "#74c0fc");
      g.rect(13, 24, 6, 7, "#5c3d1e").set(17, 27, "#ffd43b");
      if (frame) g.set(25, 3, "#ffd43b").set(6, 5, "#ffffff");
      break;
  }
  return g.outline(OUT);
}
