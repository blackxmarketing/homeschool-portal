import { K5_SUBJECTS, type K5Subject } from "@/content/courses/k5/base";
import type { ThemeId, WorldDef } from "./worlds";

/**
 * Builds the walkable map for a K-5 world (docs/WORLDS.md). Pure and
 * deterministic: the same world always gives the same map, so the server can
 * check that a spark or chest really is where the kid says it is.
 *
 * Layout: a village plaza in the middle, the five subject zones around it
 * (each with a lantern, lesson stones in a ring and an arcade), a gate to the
 * other worlds at the top, paths between them, and the theme's scenery, with
 * sparks, quest items and chests hidden off the paths.
 */

export const MAP_W = 56;
export const MAP_H = 42;

export const T = {
  GROUND: 0,
  PATH: 1,
  WATER: 2,
  BLOCK: 3,
  FLOWERS: 4,
  BRIDGE: 5,
  PLAZA: 6,
  VOID: 7,
  TALL: 8,
} as const;
export type Terrain = (typeof T)[keyof typeof T];

const WALKABLE = new Set<number>([T.GROUND, T.PATH, T.FLOWERS, T.BRIDGE, T.PLAZA, T.TALL]);

export type ExploreObject =
  | { kind: "lantern"; id: string; zone: K5Subject; x: number; y: number }
  | { kind: "stone"; id: string; zone: K5Subject; index: number; x: number; y: number }
  | { kind: "arcade"; id: string; zone: K5Subject; x: number; y: number }
  | { kind: "guide"; id: string; zone: K5Subject; x: number; y: number }
  | { kind: "npc"; id: string; x: number; y: number }
  | { kind: "pip"; id: "pip"; x: number; y: number }
  | { kind: "home"; id: "home"; x: number; y: number }
  | { kind: "wardrobe"; id: "wardrobe"; x: number; y: number }
  | { kind: "sign"; id: string; zone: K5Subject | null; x: number; y: number }
  | { kind: "gate"; id: "gate"; x: number; y: number }
  | { kind: "landmark"; id: "landmark"; x: number; y: number }
  | { kind: "chest"; id: string; x: number; y: number }
  | { kind: "spark"; id: string; x: number; y: number }
  | { kind: "item"; id: string; x: number; y: number };

export interface ExploreMap {
  w: number;
  h: number;
  /** Terrain per tile, row by row. */
  tiles: number[];
  /** Which zone each tile belongs to (for coloring it in as lessons are done), or null for the village and wilds. */
  zoneOf: (K5Subject | null)[];
  objects: ExploreObject[];
  spawn: { x: number; y: number };
}

/** Objects that take up their tiles (the rest are picked up by walking over them). Buildings are 2x2. */
export function footprint(o: ExploreObject): [number, number][] {
  if (o.kind === "spark" || o.kind === "item") return [];
  if (o.kind === "home" || o.kind === "arcade" || o.kind === "gate" || o.kind === "landmark")
    return [
      [o.x, o.y],
      [o.x + 1, o.y],
      [o.x, o.y + 1],
      [o.x + 1, o.y + 1],
    ];
  return [[o.x, o.y]];
}

export const HUB = { x: 28, y: 20 };
export const ZONE_AT: Record<K5Subject, { x: number; y: number }> = {
  ela: { x: 12, y: 10 },
  math: { x: 44, y: 10 },
  soc: { x: 12, y: 31 },
  sci: { x: 44, y: 31 },
  span: { x: 28, y: 35 },
};
const GATE = { x: 27, y: 3 };
const SPOTS = Object.values(ZONE_AT);

/** Each world puts its five zones in a different arrangement, so no two worlds feel the same. */
export function zonesFor(world: WorldDef): Record<K5Subject, { x: number; y: number }> {
  const order = [...K5_SUBJECTS];
  const r = rng(world.seed * 7 + 3);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return Object.fromEntries(order.map((s, i) => [s, SPOTS[i]])) as Record<K5Subject, { x: number; y: number }>;
}
const ZONE_R = 6.5;

/** Small seeded random numbers (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const idx = (x: number, y: number) => y * MAP_W + x;
const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < MAP_W && y < MAP_H;
const dist = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);

/** Lesson stones go in a ring around the lantern, leaving the top free for the arcade. */
export function stoneSpots(cx: number, cy: number, n: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  const used = new Set<string>();
  const count = Math.max(0, Math.min(n, 14));
  for (let i = 0; i < count; i++) {
    // From just right of the top, clockwise around to just left of the top.
    const t = count === 1 ? 0.5 : i / (count - 1);
    const a = (-55 + t * 290) * (Math.PI / 180);
    const r = count > 10 ? 5 : 4.5;
    let x = Math.round(cx + r * 1.15 * Math.sin(a));
    const y = Math.round(cy - r * Math.cos(a));
    while (used.has(`${x},${y}`)) x += x >= cx ? 1 : -1;
    used.add(`${x},${y}`);
    out.push({ x, y });
  }
  return out;
}

function zoneTiles(at: Record<K5Subject, { x: number; y: number }>): (K5Subject | null)[] {
  const z: (K5Subject | null)[] = new Array(MAP_W * MAP_H).fill(null);
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++)
      for (const s of K5_SUBJECTS) if (dist(x, y, at[s].x, at[s].y) <= ZONE_R + 2.5) z[idx(x, y)] = s;
  return z;
}

/** Fills the theme's scenery before the clearings and paths are carved. */
function scenery(theme: ThemeId, tiles: number[], r: () => number) {
  const set = (x: number, y: number, t: number) => inside(x, y) && (tiles[idx(x, y)] = t);
  const scatter = (density: number, t: number) => {
    for (let y = 0; y < MAP_H; y++) for (let x = 0; x < MAP_W; x++) if (tiles[idx(x, y)] === T.GROUND && r() < density) tiles[idx(x, y)] = t;
  };
  const ellipse = (cx: number, cy: number, rx: number, ry: number, t: number) => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) set(x, y, t);
  };
  switch (theme) {
    case "meadow":
      ellipse(20, 22, 3.5, 2.5, T.WATER);
      ellipse(39, 22, 2.5, 1.8, T.WATER);
      scatter(0.08, T.BLOCK);
      scatter(0.1, T.FLOWERS);
      scatter(0.08, T.TALL);
      break;
    case "forest":
      for (let y = 0; y < MAP_H; y++) {
        const cx = 36 + Math.round(2 * Math.sin(y / 4.5));
        set(cx, y, T.WATER);
        set(cx + 1, y, T.WATER);
      }
      scatter(0.3, T.BLOCK);
      scatter(0.06, T.FLOWERS);
      scatter(0.1, T.TALL);
      break;
    case "river":
      for (let x = 0; x < MAP_W; x++) {
        const cy = 15 + Math.round(1.6 * Math.sin(x / 6));
        for (let d = 0; d < 3; d++) set(x, cy + d, T.WATER);
      }
      ellipse(44, 24, 2.5, 1.6, T.WATER);
      scatter(0.11, T.BLOCK);
      scatter(0.07, T.FLOWERS);
      scatter(0.06, T.TALL);
      break;
    case "sky": {
      tiles.fill(T.VOID);
      const disc = (cx: number, cy: number, rad: number) => ellipse(cx, cy, rad, rad * 0.85, T.GROUND);
      disc(HUB.x, HUB.y, 8.5);
      for (const s of K5_SUBJECTS) disc(ZONE_AT[s].x, ZONE_AT[s].y, ZONE_R + 1.5);
      disc(GATE.x + 0.5, GATE.y + 1, 3.5);
      // Little islands to explore.
      for (const [x, y, rad] of [
        [4, 20, 2.6],
        [51, 21, 2.6],
        [20, 4, 2.4],
        [38, 4, 2.4],
        [20, 39, 2.2],
        [37, 39, 2.2],
        [29, 27, 1.6],
      ] as const)
        disc(x, y, rad);
      scatter(0.06, T.BLOCK);
      scatter(0.08, T.FLOWERS);
      break;
    }
    case "canyon":
      for (let y = 0; y < MAP_H; y++)
        for (let x = 0; x < MAP_W; x++) {
          const n = Math.sin(x / 4.2) * Math.cos(y / 3.7) + Math.sin((x + y) / 6.3) * 0.6;
          if (n > 0.62) tiles[idx(x, y)] = T.BLOCK;
        }
      for (let x = 0; x < MAP_W; x++) set(x, 26 + Math.round(1.2 * Math.sin(x / 5)), T.TALL);
      scatter(0.08, T.BLOCK);
      scatter(0.05, T.FLOWERS);
      break;
    case "peaks":
      ellipse(19, 23, 3.6, 2.4, T.WATER);
      for (let y = 0; y < MAP_H; y++)
        for (let x = 0; x < MAP_W; x++) {
          const n = Math.sin(x / 3.1) * Math.sin(y / 3.9) + Math.cos((x - y) / 5.5) * 0.5;
          if (n > 0.95 && tiles[idx(x, y)] === T.GROUND) tiles[idx(x, y)] = T.BLOCK;
        }
      scatter(0.14, T.BLOCK);
      scatter(0.05, T.TALL);
      break;
  }
}

/** Carves a 2-wide path that bends once; water becomes a bridge and the sky's void becomes a sky bridge. */
function carvePath(tiles: number[], ax: number, ay: number, bx: number, by: number) {
  const put = (x: number, y: number) => {
    if (!inside(x, y)) return;
    const t = tiles[idx(x, y)];
    if (t === T.PLAZA) return;
    tiles[idx(x, y)] = t === T.WATER || t === T.VOID || t === T.BRIDGE ? T.BRIDGE : T.PATH;
  };
  const sx = Math.sign(bx - ax);
  for (let x = ax; x !== bx; x += sx) {
    put(x, ay);
    put(x, ay + 1);
  }
  const sy = Math.sign(by - ay);
  for (let y = ay; y !== by + sy && sy !== 0; y += sy) {
    put(bx, y);
    put(bx + 1, y);
  }
}

/** Every tile you can reach from (sx, sy), given which tiles are blocked. */
export function reachable(tiles: number[], blocked: Set<number>, sx: number, sy: number): Set<number> {
  const seen = new Set<number>([idx(sx, sy)]);
  const q = [idx(sx, sy)];
  while (q.length) {
    const i = q.shift()!;
    const x = i % MAP_W;
    const y = Math.floor(i / MAP_W);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (!inside(nx, ny)) continue;
      const j = idx(nx, ny);
      if (seen.has(j) || blocked.has(j) || !WALKABLE.has(tiles[j])) continue;
      seen.add(j);
      q.push(j);
    }
  }
  return seen;
}

/** Tiles taken by solid objects. */
export function solidTiles(objects: ExploreObject[]): Set<number> {
  const s = new Set<number>();
  for (const o of objects) for (const [x, y] of footprint(o)) s.add(idx(x, y));
  return s;
}

export const isWalkable = (map: ExploreMap, blocked: Set<number>, x: number, y: number) =>
  inside(x, y) && WALKABLE.has(map.tiles[idx(x, y)]) && !blocked.has(idx(x, y));

/** Shortest walk from a to b (4 directions), or null. Used for tap-to-walk. */
export function findPath(map: ExploreMap, blocked: Set<number>, ax: number, ay: number, bx: number, by: number): { x: number; y: number }[] | null {
  if (!isWalkable(map, blocked, bx, by)) return null;
  const prev = new Map<number, number>();
  const start = idx(ax, ay);
  const goal = idx(bx, by);
  prev.set(start, -1);
  const q = [start];
  while (q.length) {
    const i = q.shift()!;
    if (i === goal) break;
    const x = i % MAP_W;
    const y = Math.floor(i / MAP_W);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (!isWalkable(map, blocked, nx, ny)) continue;
      const j = idx(nx, ny);
      if (prev.has(j)) continue;
      prev.set(j, i);
      q.push(j);
    }
  }
  if (!prev.has(goal)) return null;
  const out: { x: number; y: number }[] = [];
  for (let i = goal; i !== start; i = prev.get(i)!) out.unshift({ x: i % MAP_W, y: Math.floor(i / MAP_W) });
  return out;
}

/**
 * The map for a world. `lessons` is how many lesson stones each zone has
 * (stones only sit inside zone clearings, so everything else stays put as
 * lessons are added).
 */
export function buildMap(world: WorldDef, lessons: Partial<Record<K5Subject, number>>): ExploreMap {
  const r = rng(world.seed);
  const Z = zonesFor(world);
  const tiles: number[] = new Array(MAP_W * MAP_H).fill(T.GROUND);
  scenery(world.theme, tiles, r);
  const isSky = world.theme === "sky";
  const wall = isSky ? T.VOID : T.BLOCK;

  // A border so nobody walks off the edge.
  for (let x = 0; x < MAP_W; x++) {
    tiles[idx(x, 0)] = wall;
    tiles[idx(x, MAP_H - 1)] = wall;
  }
  for (let y = 0; y < MAP_H; y++) {
    tiles[idx(0, y)] = wall;
    tiles[idx(MAP_W - 1, y)] = wall;
  }

  // Clearings: the village plaza and the five zones.
  for (let y = HUB.y - 4; y <= HUB.y + 4; y++) for (let x = HUB.x - 6; x <= HUB.x + 6; x++) tiles[idx(x, y)] = T.PLAZA;
  for (const s of K5_SUBJECTS) {
    const z = Z[s];
    for (let y = 0; y < MAP_H; y++)
      for (let x = 0; x < MAP_W; x++) {
        const d = dist(x, y, z.x, z.y);
        if (d <= ZONE_R) tiles[idx(x, y)] = d <= 1.5 ? T.PLAZA : T.GROUND;
      }
  }
  for (let y = GATE.y - 1; y <= GATE.y + 2; y++) for (let x = GATE.x - 2; x <= GATE.x + 3; x++) tiles[idx(x, y)] = isSky ? T.GROUND : T.PLAZA;

  // Paths from the village to every zone and to the gate.
  for (const s of K5_SUBJECTS) carvePath(tiles, HUB.x, HUB.y, Z[s].x, Z[s].y);
  carvePath(tiles, HUB.x - 1, HUB.y, GATE.x, GATE.y + 2);
  if (isSky)
    for (const [x, y] of [
      [4, 20],
      [51, 21],
      [20, 4],
      [38, 4],
      [20, 39],
      [37, 39],
    ])
      carvePath(tiles, x, y, x < HUB.x ? ZONE_AT.ela.x : ZONE_AT.math.x, y < HUB.y ? ZONE_AT.ela.y : ZONE_AT.soc.y);

  // The village and the zones.
  const objects: ExploreObject[] = [
    { kind: "pip", id: "pip", x: HUB.x, y: HUB.y - 1 },
    { kind: "home", id: "home", x: HUB.x - 5, y: HUB.y - 4 },
    { kind: "wardrobe", id: "wardrobe", x: HUB.x - 2, y: HUB.y - 3 },
    { kind: "sign", id: "sign-hub", zone: null, x: HUB.x + 2, y: HUB.y + 1 },
    { kind: "gate", id: "gate", x: GATE.x, y: GATE.y },
    { kind: "landmark", id: "landmark", x: HUB.x + 7, y: HUB.y - 8 },
  ];
  const villagerSpots = [
    [HUB.x - 4, HUB.y + 2],
    [HUB.x + 5, HUB.y - 2],
    [HUB.x + 4, HUB.y + 3],
    [HUB.x - 5, HUB.y - 1],
    [HUB.x + 2, HUB.y - 3],
  ];
  world.villagers.forEach((v, i) => {
    const [x, y] = villagerSpots[i % villagerSpots.length];
    objects.push({ kind: "npc", id: v.id, x, y });
  });
  for (const s of K5_SUBJECTS) {
    const z = Z[s];
    objects.push({ kind: "lantern", id: `lantern-${s}`, zone: s, x: z.x, y: z.y });
    objects.push({ kind: "arcade", id: `arcade-${s}`, zone: s, x: z.x - 1, y: z.y - 6 });
    objects.push({ kind: "guide", id: `guide-${s}`, zone: s, x: z.x + 2, y: z.y - 2 });
    objects.push({ kind: "sign", id: `sign-${s}`, zone: s, x: z.x - 2, y: z.y - 2 });
    stoneSpots(z.x, z.y, lessons[s] ?? 0).forEach((p, i) => objects.push({ kind: "stone", id: `stone-${s}-${i}`, zone: s, index: i, x: p.x, y: p.y }));
  }
  // Nothing grows under a building.
  for (const o of objects) for (const [x, y] of footprint(o)) if (inside(x, y) && !WALKABLE.has(tiles[idx(x, y)])) tiles[idx(x, y)] = T.GROUND;

  const spawn = { x: HUB.x, y: HUB.y + 1 };
  const zoneOf = zoneTiles(Z);

  // Make sure everything solid can be reached; if not, carve a path to it from the village.
  const fix = () => {
    for (let round = 0; round < 3; round++) {
      const reach = reachable(tiles, solidTiles(objects), spawn.x, spawn.y);
      let ok = true;
      for (const o of objects) {
        const cells = footprint(o);
        const near = cells.some(([x, y]) =>
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].some(([dx, dy]) => reach.has(idx(x + dx, y + dy))),
        );
        if (!near) {
          ok = false;
          const [x, y] = cells[0];
          carvePath(tiles, x, y + (cells.length > 1 ? 2 : 1), HUB.x, HUB.y);
        }
      }
      if (ok) return;
    }
  };
  fix();

  // Hidden things: sparks, quest items and chests, on reachable ground away from paths and clearings.
  const quiet = (i: number) => {
    const x = i % MAP_W;
    const y = Math.floor(i / MAP_W);
    if (tiles[i] === T.PATH || tiles[i] === T.PLAZA || tiles[i] === T.BRIDGE) return false;
    if (dist(x, y, HUB.x, HUB.y) < 8) return false;
    if (SPOTS.some((p) => dist(x, y, p.x, p.y) < ZONE_R + 0.5)) return false;
    if (dist(x, y, GATE.x, GATE.y) < 4) return false;
    return x > 1 && y > 1 && x < MAP_W - 2 && y < MAP_H - 2;
  };
  const taken = new Set<number>();
  const spread = (n: number, minGap: number, kind: "spark" | "item" | "chest", prefix: string) => {
    for (let k = 0; k < n; k++) {
      for (let tries = 0; tries < 400; tries++) {
        const reach = [...reachable(tiles, solidTiles(objects), spawn.x, spawn.y)].filter((i) => quiet(i) && !taken.has(i));
        if (!reach.length) return;
        const i = reach[Math.floor(r() * reach.length)];
        const x = i % MAP_W;
        const y = Math.floor(i / MAP_W);
        const gap = tries > 200 ? 2 : minGap;
        if (objects.some((o) => (o.kind === "spark" || o.kind === "item" || o.kind === "chest") && dist(o.x, o.y, x, y) < gap)) continue;
        const o = { kind, id: `${prefix}${k + 1}`, x, y } as ExploreObject;
        if (kind === "chest") {
          // A chest mustn't cut anything off.
          const before = reachable(tiles, solidTiles(objects), spawn.x, spawn.y).size;
          const after = reachable(tiles, solidTiles([...objects, o]), spawn.x, spawn.y).size;
          if (after < before - 1) continue;
        }
        objects.push(o);
        taken.add(i);
        break;
      }
    }
  };
  spread(world.chests.length, 12, "chest", "c");
  spread(world.quest.count, 9, "item", "item");
  spread(world.sparks, 6, "spark", "spark");

  return { w: MAP_W, h: MAP_H, tiles, zoneOf, objects, spawn };
}
