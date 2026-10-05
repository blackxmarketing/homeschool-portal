import { beaconGrid, landmarkGrid, propGrid, type Landmark, type Prop } from "./objects";
import { dim, Grid, hexToRgb, noise2, rng, shade } from "./grid";

/**
 * Lumina: the world map and each land's own map, as tiles. Pure, so the same
 * code draws the canvas in the browser and the previews in tests.
 */

export const TILE = 8;

export type Terrain = "deep" | "water" | "shallow" | "grass" | "meadow" | "forest" | "snow" | "sand" | "stone" | "path" | "bridge";

export type Band = "sprout" | "adventurer" | "strategist";

/** Grades 4–5, 6–8 and 9–12 see the world in their own style. */
export function bandFor(grade: number): Band {
  return grade <= 5 ? "sprout" : grade <= 8 ? "adventurer" : "strategist";
}

/** Colors for each kind of ground, per grade band. */
export const PALETTES: Record<Band, Record<Terrain, string>> = {
  sprout: {
    deep: "#2f6fe0", water: "#3d8bff", shallow: "#7cc4ff", grass: "#5fd35f", meadow: "#7be07b", forest: "#3fb25a",
    snow: "#f4f8ff", sand: "#ffe08a", stone: "#c9b8a6", path: "#e6b877", bridge: "#b07a4a",
  },
  adventurer: {
    deep: "#1f4fae", water: "#2f6fd6", shallow: "#5ea6ea", grass: "#4caf50", meadow: "#68c26a", forest: "#2e8b47",
    snow: "#e8eef7", sand: "#f2cf7a", stone: "#a89a8a", path: "#d4a05f", bridge: "#9a6a3d",
  },
  strategist: {
    deep: "#14254d", water: "#1d3b74", shallow: "#3a6aa6", grass: "#3f8a55", meadow: "#4f9a62", forest: "#2a6a45",
    snow: "#d6dfec", sand: "#d9b876", stone: "#8c8378", path: "#b88b56", bridge: "#7d5634",
  },
};

export type LandId = "village" | "math" | "science" | "history" | "writing" | "harbor" | "summit";

export interface LandDef {
  id: LandId;
  name: string;
  /** Course ids this land teaches ("math" means the math worlds). */
  courses: string[];
  terrain: Terrain;
  cx: number;
  cy: number;
  r: number;
  landmark: Landmark;
  props: Prop[];
  /** Theme color for banners. */
  hue: number;
  blurb: string;
}

export const LANDS: LandDef[] = [
  { id: "village", name: "Home Village", courses: [], terrain: "grass", cx: 32, cy: 20, r: 6, landmark: "village", props: ["tree", "flowers", "bush"], hue: 140, blurb: "Your home base. Quests start here." },
  { id: "math", name: "Math Mountains", courses: ["math"], terrain: "snow", cx: 31, cy: 6, r: 8, landmark: "forge", props: ["mountain", "peak", "pine", "rock", "crystal"], hue: 210, blurb: "Seven worlds of numbers, from the Number Forge to the Data Lab." },
  { id: "science", name: "Science Isles", courses: ["science", "science-45", "science-hs"], terrain: "sand", cx: 54, cy: 13, r: 7, landmark: "lab", props: ["palm", "crystal", "rock", "bush"], hue: 190, blurb: "Experiments, forces, energy, cells and space." },
  { id: "history", name: "History Kingdom", courses: ["history", "history-45", "history-hs"], terrain: "meadow", cx: 10, cy: 12, r: 8, landmark: "castle", props: ["column", "tree", "flowers", "house"], hue: 265, blurb: "Ancient Greece and Rome, the founding of America, and the inventors who built the modern world." },
  { id: "writing", name: "Wordsmith Woods", courses: ["writing", "writing-45", "writing-hs"], terrain: "forest", cx: 12, cy: 30, r: 7, landmark: "booktower", props: ["pine", "tree", "bush", "flowers"], hue: 25, blurb: "Read closely, write great sentences, persuade, and tell stories." },
  { id: "harbor", name: "Merchant Harbor", courses: ["money", "business", "money-45", "business-45", "money-hs", "business-hs"], terrain: "sand", cx: 52, cy: 31, r: 7, landmark: "harbor", props: ["stall", "tent", "palm", "house"], hue: 45, blurb: "Earn, save and invest. Spot problems, build a business, make a profit." },
  { id: "summit", name: "Leaders' Summit", courses: ["leadership", "leadership-45", "leadership-hs"], terrain: "stone", cx: 33, cy: 34, r: 5, landmark: "summit", props: ["peak", "rock", "pine"], hue: 0, blurb: "Courage, integrity, teamwork and speaking up." },
];

export const landById = (id: string) => LANDS.find((l) => l.id === id);

export interface Placed {
  x: number;
  y: number;
  grid: Grid;
  /** Tile used to decide if it's lit (in color) or still dark. */
  tx: number;
  ty: number;
}

export interface TileMap {
  w: number;
  h: number;
  t: Terrain[];
  /** Which land each tile belongs to (null = sea). */
  land: (LandId | null)[];
  props: Placed[];
}

const isWater = (t: Terrain) => t === "deep" || t === "water" || t === "shallow";

function line(ax: number, ay: number, bx: number, by: number, seed: number): [number, number][] {
  const pts: [number, number][] = [];
  const n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)) * 2;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const wob = (noise2(t * 4, seed, seed) - 0.5) * 3 * Math.sin(Math.PI * t);
    const x = Math.round(ax + (bx - ax) * t + wob * (by - ay !== 0 ? 1 : 0));
    const y = Math.round(ay + (by - ay) * t + wob * (bx - ax !== 0 ? 1 : 0));
    if (!pts.length || pts[pts.length - 1][0] !== x || pts[pts.length - 1][1] !== y) pts.push([x, y]);
  }
  return pts;
}

/** The whole world: 64 x 40 tiles. The same every time. */
export function worldMap(seed = 7): TileMap {
  const w = 64;
  const h = 40;
  const t: Terrain[] = new Array(w * h).fill("deep");
  const land: (LandId | null)[] = new Array(w * h).fill(null);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let best: LandDef | null = null;
      let bestD = Infinity;
      for (const L of LANDS) {
        const wobble = 0.72 + 0.56 * noise2(x / 3.2, y / 3.2, seed + L.cx);
        const d = Math.hypot(x - L.cx, (y - L.cy) * 1.15) / (L.r * wobble);
        if (d < bestD) {
          bestD = d;
          best = L;
        }
      }
      const i = y * w + x;
      if (best && bestD < 1) {
        t[i] = best.terrain;
        land[i] = best.id;
      } else if (bestD < 1.35) t[i] = "water";
    }
  // Shallow water along every coast.
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!isWater(t[i])) continue;
      const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
        const xx = x + dx;
        const yy = y + dy;
        return xx >= 0 && yy >= 0 && xx < w && yy < h && !isWater(t[yy * w + xx]);
      });
      if (near) t[i] = "shallow";
    }
  // Roads from the village to every land, with bridges over water.
  const village = LANDS[0];
  LANDS.slice(1).forEach((L, k) => {
    for (const [x, y] of line(village.cx, village.cy, L.cx, L.cy, seed + k)) {
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const i = y * w + x;
      t[i] = isWater(t[i]) ? "bridge" : "path";
      if (!land[i]) land[i] = isWater(t[i]) ? null : L.id;
    }
  });
  const props = scatter(w, h, t, land, LANDS, seed);
  return { w, h, t, land, props };
}

function scatter(w: number, h: number, t: Terrain[], land: (LandId | null)[], lands: LandDef[], seed: number, tries = 900): Placed[] {
  const r = rng(seed * 31 + 5);
  const out: Placed[] = [];
  const taken = new Set<string>();
  const free = (x: number, y: number, size = 2) => {
    for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) if (taken.has(`${x + i},${y + j}`)) return false;
    return true;
  };
  const take = (x: number, y: number, size = 2) => {
    for (let j = -1; j < size + 1; j++) for (let i = -1; i < size + 1; i++) taken.add(`${x + i},${y + j}`);
  };
  // Landmarks first (4x4 tiles), at each land's center.
  for (const L of lands) {
    const x = L.cx - 2;
    const y = L.cy - 3;
    take(x, y, 4);
    out.push({ x: x * TILE, y: y * TILE, grid: landmarkGrid(L.landmark), tx: L.cx, ty: L.cy });
  }
  // Then props, two tiles each, on dry ground away from roads.
  for (let k = 0; k < tries; k++) {
    const x = Math.floor(r() * (w - 2));
    const y = Math.floor(r() * (h - 2));
    const i = y * w + x;
    const L = lands.find((l) => l.id === land[i]);
    if (!L || t[i] === "path" || t[i] === "bridge" || isWater(t[i])) continue;
    const nearRoad = [-1, 0, 1, 2].some((dy) => [-1, 0, 1, 2].some((dx) => t[(y + dy) * w + x + dx] === "path"));
    if (nearRoad || isWater(t[i + w + 1] ?? "deep")) continue;
    if (!free(x, y)) continue;
    take(x, y);
    const p = L.props[Math.floor(r() * L.props.length)];
    out.push({ x: x * TILE, y: y * TILE, grid: propGrid(p), tx: x, ty: y });
  }
  // Ships in the harbor water.
  const harbor = lands.find((l) => l.id === "harbor");
  if (harbor) {
    for (const [dx, dy] of [[8, -3], [7, 4]]) {
      const x = harbor.cx + dx;
      const y = harbor.cy + dy;
      if (x < w - 2 && y < h - 2) out.push({ x: x * TILE, y: y * TILE, grid: propGrid("ship"), tx: harbor.cx, ty: harbor.cy });
    }
  }
  return out.sort((a, b) => a.y + a.grid.h - (b.y + b.grid.h));
}

// ---------------- A land's own map, with the quest path ----------------

export interface QuestNode {
  /** Center of the beacon, in pixels. */
  x: number;
  y: number;
}

/** A land up close: its ground, a winding road and a beacon for each quest. */
export function landMap(L: LandDef, quests: number, lit: boolean[], seed = 11): TileMap & { nodes: QuestNode[] } {
  const w = 48;
  const h = 27;
  const t: Terrain[] = new Array(w * h).fill(L.terrain);
  const landIds: (LandId | null)[] = new Array(w * h).fill(L.id);
  // Sea along the edges, with a natural coast.
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const edge = Math.min(x, y, w - 1 - x, h - 1 - y);
      const n = noise2(x / 3, y / 3, seed + L.cx) * 2.6;
      if (edge < n) {
        t[y * w + x] = edge < n - 1.2 ? "water" : "shallow";
        landIds[y * w + x] = null;
      }
    }
  // A winding road from the bottom left to the top right, with a beacon for each quest.
  const n = Math.max(1, quests);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 200; i++) {
    const s = i / 200;
    const x = 5 + s * (w - 10);
    const y = h / 2 + Math.sin(s * Math.PI * 2.2 + seed) * (h / 2 - 6) * 0.75 + (0.5 - s) * 3;
    pts.push([Math.round(x), Math.round(y)]);
  }
  for (const [x, y] of pts) {
    t[y * w + x] = "path";
    t[(y + 1) * w + x] = "path";
  }
  const nodes: QuestNode[] = [];
  for (let k = 0; k < n; k++) {
    const [x, y] = pts[Math.round((k + 0.5) * (200 / n))];
    nodes.push({ x: x * TILE + TILE / 2, y: y * TILE + TILE });
  }
  const placed = scatter(w, h, t, landIds, [{ ...L, cx: -10, cy: -10 }], seed, 160).filter((p) => p.x >= 0 && p.y >= 0);
  // Keep the road and beacons clear.
  const props = placed.filter((p) => nodes.every((nd) => Math.hypot(p.x + 8 - nd.x, p.y + 8 - nd.y) > 18));
  nodes.forEach((nd, k) => props.push({ x: nd.x - 8, y: nd.y - 22, grid: beaconGrid(!!lit[k]), tx: Math.round(nd.x / TILE), ty: Math.round(nd.y / TILE) }));
  props.sort((a, b) => a.y + a.grid.h - (b.y + b.grid.h));
  return { w, h, t, land: landIds, props, nodes };
}

// ---------------- Drawing ----------------

function tileColor(base: string, terrain: Terrain, x: number, y: number, px: number, py: number, frame: number): string {
  const n = noise2(x * 8 + px, y * 8 + py, 3) * 1000;
  const r = n - Math.floor(n);
  switch (terrain) {
    case "deep":
    case "water":
    case "shallow": {
      const wave = ((px + py * 2 + x * 3 + y * 5 + frame * 2) % 11 === 0 && py % 3 === 0) || r > 0.985;
      return wave ? shade(base, 0.35) : base;
    }
    case "grass":
    case "forest":
      return r > 0.9 ? shade(base, 0.12) : r < 0.08 ? shade(base, -0.12) : base;
    case "meadow":
      return r > 0.97 ? (r > 0.985 ? "#ffd43b" : "#ffffff") : r > 0.85 ? shade(base, 0.1) : base;
    case "snow":
      return r > 0.9 ? shade(base, -0.06) : base;
    case "sand":
      return r > 0.88 ? shade(base, -0.08) : r < 0.05 ? shade(base, 0.15) : base;
    case "stone":
      return r > 0.85 ? shade(base, -0.12) : r < 0.1 ? shade(base, 0.1) : base;
    case "path":
      return r > 0.8 ? shade(base, -0.1) : base;
    case "bridge":
      return py % 3 === 0 ? shade(base, -0.25) : base;
  }
}

/**
 * Draws a map into an RGBA pixel buffer. `lit(tx, ty)` says whether that part
 * of the world is restored (in color) or still dark (grey).
 */
export function render(map: TileMap, band: Band, lit: (tx: number, ty: number) => boolean, frame = 0): Uint8ClampedArray {
  const W = map.w * TILE;
  const H = map.h * TILE;
  const buf = new Uint8ClampedArray(W * H * 4);
  const pal = PALETTES[band];
  const put = (x: number, y: number, hex: string) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const [r, g, b] = hexToRgb(hex);
    const p = (y * W + x) * 4;
    buf[p] = r;
    buf[p + 1] = g;
    buf[p + 2] = b;
    buf[p + 3] = 255;
  };
  for (let ty = 0; ty < map.h; ty++)
    for (let tx = 0; tx < map.w; tx++) {
      const terrain = map.t[ty * map.w + tx];
      const on = lit(tx, ty);
      for (let py = 0; py < TILE; py++)
        for (let px = 0; px < TILE; px++) {
          const c = tileColor(pal[terrain], terrain, tx, ty, px, py, frame);
          put(tx * TILE + px, ty * TILE + py, on ? c : dim(c));
        }
    }
  for (const p of map.props) {
    const on = lit(p.tx, p.ty);
    for (const { x, y, w, c } of p.grid.runs()) {
      const col = on ? c : dim(c);
      for (let i = 0; i < w; i++) put(p.x + x + i, p.y + y, col);
    }
  }
  return buf;
}

/**
 * Which tiles of the world are in color: the village always; each land from its
 * landmark outward as its lessons are mastered (0 to 1).
 */
export function litFor(map: TileMap, progress: Partial<Record<LandId, number>>) {
  return (tx: number, ty: number): boolean => {
    const id = map.land[ty * map.w + tx];
    if (!id) {
      // The sea is lit near any lit land.
      return LANDS.some((L) => (L.id === "village" || (progress[L.id] ?? 0) > 0) && Math.hypot(tx - L.cx, ty - L.cy) < L.r * (L.id === "village" ? 1.6 : 0.9 + 0.7 * (progress[L.id] ?? 0)));
    }
    if (id === "village") return true;
    const L = landById(id)!;
    const p = progress[id] ?? 0;
    const radius = p > 0 ? (0.35 + 0.9 * p) * L.r : 1.6;
    return Math.hypot(tx - L.cx, (ty - L.cy) * 1.15) <= radius;
  };
}
