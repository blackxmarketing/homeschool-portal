import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Map Quest (History Hills, grades K-4). Each round shows a pixel map and
 * the kid either:
 *   - taps a place ("Tap the ball NEAR the bed", "Go to square C-4"),
 *   - plans a walk with arrow buttons and presses Go (the hero follows the
 *     plan, bumping into water, mountains or buildings),
 *   - taps a continent, ocean or U.S. region, or
 *   - drops a pin at a latitude and longitude.
 * K: position words. 1: map keys and N/S/E/W. 2: compass rose, counting
 * squares, continents and oceans. 3: grid maps, map scale, landforms.
 * 4: intermediate directions, latitude and longitude, U.S. regions.
 * (C3 D2.Geo.1-3.K-2 and 3-5.)
 *
 * Up to 3 tries a round: right on the first try = 2 points, later = 1.
 * Pure (no randomness), so the server can replay the kid's moves.
 */

export const mapQuestInfo = {
  id: "mapquest",
  title: "Map Quest",
  icon: "🗺️",
  land: "history" as const,
  subject: "soc" as const,
  grades: [0, 1, 2, 3, 4],
  blurb: "Read the map, follow directions and use the compass to find your way.",
};

export const MAX_TRIES = 3;

// ---------------- Directions ----------------

export type Dir = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";
export const DELTA: Record<Dir, [number, number]> = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0],
  NE: [1, -1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [-1, 1],
};
export const DIR_WORD: Record<Dir, string> = { N: "north", S: "south", E: "east", W: "west", NE: "northeast", NW: "northwest", SE: "southeast", SW: "southwest" };
/** Kindergarten picture maps use left/right/up/down instead of compass words. */
export const KID_WORD: Partial<Record<Dir, string>> = { N: "up", S: "down", E: "right", W: "left" };

export type DirSet = "lr" | "lrud" | "nesw" | "eight";
export const DIRS: Record<DirSet, Dir[]> = {
  lr: ["W", "E"],
  lrud: ["N", "W", "E", "S"],
  nesw: ["N", "W", "E", "S"],
  eight: ["NW", "N", "NE", "W", "E", "SW", "S", "SE"],
};
const isDir = (s: unknown): s is Dir => typeof s === "string" && s in DELTA;

// ---------------- Maps ----------------

export type Cell = [number, number];

export type ThingKind =
  | "bed" | "ball" | "cat" | "teddy" | "lamp" | "toybox" | "window" | "clock" | "books" | "plant"
  | "slide" | "swing" | "tree" | "bench" | "bird" | "sun" | "cloud" | "kite" | "dog" | "flower" | "nest"
  | "house" | "school" | "store" | "library" | "firehouse" | "barn"
  | "hut" | "palm" | "well" | "boat" | "chest" | "rock" | "cave" | "flag"
  | "tent" | "cabin" | "mine" | "windmill" | "lighthouse" | "castle";

export const THING_NAME: Record<ThingKind, string> = {
  bed: "the bed", ball: "the ball", cat: "the cat", teddy: "the teddy bear", lamp: "the lamp", toybox: "the toy box", window: "the window",
  clock: "the clock", books: "the bookshelf", plant: "the plant", slide: "the slide", swing: "the swing", tree: "the tree", bench: "the bench",
  bird: "the bird", sun: "the sun", cloud: "the cloud", kite: "the kite", dog: "the dog", flower: "the flower", nest: "the nest",
  house: "the house", school: "the school", store: "the store", library: "the library", firehouse: "the fire station", barn: "the farm",
  hut: "the hut", palm: "the palm tree", well: "the well", boat: "the boat", chest: "the treasure chest", rock: "the big rock", cave: "the cave",
  flag: "the flag", tent: "the camp", cabin: "the cabin", mine: "the mine", windmill: "the windmill", lighthouse: "the lighthouse", castle: "the castle",
};

/** Terrain letters: g grass, r road, w ocean/pond, l lake, v river, s sand, m mountain, h hill, b bridge, W wall, F floor, K sky, G ground. */
export const TERRAIN_NAME: Record<string, string> = {
  g: "grassland", r: "the road", w: "the water", l: "the lake", v: "the river", s: "the sand", m: "a mountain", h: "a hill", b: "the bridge",
};
/** Terrain worth naming on maps where only pictures can be tapped. */
const NAMED_TERRAIN = new Set(["r", "w", "l", "v", "m", "h", "b"]);
const BLOCKED_TERRAIN = new Set(["w", "l", "v", "m"]);

export interface Thing {
  k: ThingKind;
  x: number;
  y: number;
}

export interface Area {
  name: string;
  cells: Cell[];
}

export interface TileMap {
  /** room / park: side-view picture maps (K). top: a map seen from above. */
  scene: "room" | "park" | "top";
  w: number;
  h: number;
  terrain: string[];
  things: Thing[];
  /** Named places made of terrain (the pond, the valley...). */
  areas?: Area[];
  /** Columns A, B, C... across the top and rows 1, 2, 3... down the side. */
  grid?: boolean;
  /** Every square can be tapped (otherwise only pictures and named places). */
  open?: boolean;
  /** Each square is 1 mile (shown as a scale bar). */
  miles?: boolean;
  /** Compass rose: 4 or 8 points (none for picture maps). */
  compass?: 4 | 8;
  /** Show a map key under the map. */
  key?: boolean;
}

const sideScene = (scene: "room" | "park", things: Thing[]): TileMap => ({
  scene,
  w: 6,
  h: 5,
  terrain: scene === "room" ? ["WWWWWW", "WWWWWW", "WWWWWW", "WWWWWW", "FFFFFF"] : ["KKKKKK", "KKKKKK", "KKKKKK", "KKKKKK", "GGGGGG"],
  things,
});

const t = (k: ThingKind, x: number, y: number): Thing => ({ k, x, y });
const withThings = (m: TileMap, extra: Thing[]): TileMap => ({ ...m, things: [...m.things, ...extra] });

export const terrainAt = (m: TileMap, x: number, y: number) => m.terrain[y]?.[x] ?? "";
export const thingAt = (m: TileMap, x: number, y: number) => m.things.find((o) => o.x === x && o.y === y);
export const inside = (m: TileMap, x: number, y: number) => x >= 0 && y >= 0 && x < m.w && y < m.h;
export const coordName = (x: number, y: number) => `${"ABCDEFGHIJ"[x] ?? "?"}-${y + 1}`;
const sameCell = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];

/** What a square is called ("the school", "the pond"), or null for plain floor, wall or grass on a picture map. */
export function nameAt(m: TileMap, x: number, y: number): string | null {
  if (!inside(m, x, y)) return null;
  const th = thingAt(m, x, y);
  if (th) return THING_NAME[th.k];
  const area = m.areas?.find((a) => a.cells.some((c) => c[0] === x && c[1] === y));
  if (area) return area.name;
  const tr = terrainAt(m, x, y);
  if (NAMED_TERRAIN.has(tr) || (m.open && TERRAIN_NAME[tr])) return TERRAIN_NAME[tr];
  return null;
}

/** Can the kid tap this square (does it count as a try)? */
export const tappable = (m: TileMap, x: number, y: number) => inside(m, x, y) && (!!m.open || nameAt(m, x, y) !== null);

// ---------------- World and U.S. maps ----------------

export type Continent = "NA" | "SA" | "EU" | "AF" | "AS" | "AU" | "AN";
export type Ocean = "PAC" | "ATL" | "IND" | "ARC" | "SOU";
export type UsRegion = "WEST" | "SWEST" | "MWEST" | "SEAST" | "NEAST";
export type RegionId = Continent | Ocean | UsRegion;

export const REGION_NAME: Record<RegionId, string> = {
  NA: "North America", SA: "South America", EU: "Europe", AF: "Africa", AS: "Asia", AU: "Australia", AN: "Antarctica",
  PAC: "the Pacific Ocean", ATL: "the Atlantic Ocean", IND: "the Indian Ocean", ARC: "the Arctic Ocean", SOU: "the Southern Ocean",
  WEST: "the West", SWEST: "the Southwest", MWEST: "the Midwest", SEAST: "the Southeast", NEAST: "the Northeast",
};

/**
 * A simple world map: 36 columns of 10° longitude (180°W to 180°E) by 18
 * rows of 10° latitude (90°N to 90°S). N North America, S South America,
 * E Europe, F Africa, A Asia, U Australia, X Antarctica, . ocean.
 */
export const WORLD = [
  ".............NNN....................",
  ".....NNNNNNNNNNN........AAAAAAAAAA..",
  ".NNNNNNNNNNN.NN.E.EEEEEEAAAAAAAAAAAA",
  "..N.NNNNN.NNN....EEEEEEEAAAAAAAA.A..",
  ".....NNNNNNN.....EEEEEEAAAAAAAAAA...",
  "......NNNNN......FFFFAAAAAAAAAAAA...",
  ".......NN.......FFFFFFAAAAAAAAA.....",
  ".......NNN......FFFFFFFA.A.AA.A.....",
  "..........SSSS...FFFFFFF...AAAA.....",
  "..........SSSSS...FFFF......AAA.....",
  "..........SSSSS....FFFF.......UUU...",
  "...........SSS.....FFFF......UUUUU..",
  "...........SS......FFF.......UUUUU..",
  "...........SS...................U...",
  "...........S........................",
  "...........XX.........XXXXXXXXXXXXX.",
  "..XXXXXXXXXXX...XXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
];
export const WORLD_W = 36;
export const WORLD_H = 18;
const LAND: Record<string, Continent> = { N: "NA", S: "SA", E: "EU", F: "AF", A: "AS", U: "AU", X: "AN" };

function oceanAt(c: number, r: number): Ocean {
  if (r <= 1) return "ARC";
  if (r >= 15) return "SOU";
  const lon = c * 10 - 175;
  if (r === 2) return lon < -150 || lon > 150 ? "PAC" : lon > 20 ? "ARC" : "ATL";
  const westAtlantic = r <= 6 ? 9 : r === 7 ? 10 : r <= 13 ? 11 : 12;
  if (c >= westAtlantic && lon < 20) return "ATL";
  if (r >= 6 && lon > 20 && lon < (r <= 9 ? 105 : 147)) return "IND";
  return "PAC";
}

/** The continent or ocean in a cell of the world map. */
export function worldAt(c: number, r: number): Continent | Ocean | null {
  if (!Number.isInteger(c) || !Number.isInteger(r) || c < 0 || r < 0 || c >= WORLD_W || r >= WORLD_H) return null;
  return LAND[WORLD[r][c]] ?? oceanAt(c, r);
}

/** The lower 48 states, traced as (longitude, latitude) points. */
const US_OUTLINE: [number, number][] = [
  [-124.7, 48.4], [-123.0, 49.0], [-95.2, 49.0], [-89.6, 48.0], [-84.5, 46.5], [-82.4, 45.3], [-82.5, 43.0], [-83.1, 42.0], [-79.0, 42.8],
  [-76.3, 44.2], [-74.7, 45.0], [-71.5, 45.0], [-70.0, 46.7], [-69.2, 47.4], [-67.8, 47.1], [-67.0, 44.8], [-70.2, 43.6], [-70.6, 42.6],
  [-70.0, 41.7], [-71.5, 41.3], [-74.0, 40.5], [-74.0, 39.6], [-75.0, 38.5], [-76.0, 36.9], [-75.5, 35.3], [-77.9, 33.9], [-79.2, 33.2],
  [-81.0, 32.0], [-81.4, 30.4], [-80.1, 26.7], [-80.4, 25.2], [-81.2, 25.2], [-81.8, 26.5], [-82.8, 27.9], [-83.8, 29.9], [-85.4, 29.7],
  [-88.0, 30.4], [-89.6, 30.2], [-89.2, 29.1], [-91.0, 29.3], [-93.8, 29.7], [-94.7, 29.3], [-97.2, 27.6], [-97.4, 25.9], [-99.5, 27.5],
  [-101.4, 29.8], [-103.2, 29.0], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.3], [-111.1, 31.3], [-114.8, 32.5], [-117.1, 32.5],
  [-118.5, 34.0], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.4, 42.0], [-124.0, 46.2],
];

function insidePoly(lon: number, lat: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** The usual five regions (by state), drawn with simple lines of longitude and latitude. */
function usRegionOf(lon: number, lat: number): UsRegion {
  if (lon < -109) return lat < 37 && lon > -114.7 ? "SWEST" : "WEST";
  if (lon < -104) return lat >= 37 ? "WEST" : "SWEST";
  if (lon < -102) return lat >= 41 ? "MWEST" : lat >= 37 ? "WEST" : "SWEST";
  if (lon < -94.3) return lat >= 37 ? "MWEST" : "SWEST";
  if (lon < -89.5) return lat >= 36.5 ? "MWEST" : "SEAST";
  if (lon < -80.5) return lat >= 38.5 && !(lon > -82.6 && lat < 39.5) ? "MWEST" : "SEAST";
  if (lat >= 39.7) return "NEAST";
  return lat >= 38.5 && lon >= -79.5 ? "NEAST" : "SEAST";
}

export const US_W = 30;
export const US_H = 16;
const US_LON = [-125, -66] as const;
const US_LAT = [49.5, 24.5] as const;
export const usCellCenter = (c: number, r: number): [number, number] => [
  US_LON[0] + ((c + 0.5) * (US_LON[1] - US_LON[0])) / US_W,
  US_LAT[0] + ((r + 0.5) * (US_LAT[1] - US_LAT[0])) / US_H,
];
/** Lake Michigan is big enough to show (it sits inside the Midwest). */
export const US_LAKE: Cell = (() => {
  const c = Math.floor(((-87 - US_LON[0]) / (US_LON[1] - US_LON[0])) * US_W);
  const r = Math.floor(((43.8 - US_LAT[0]) / (US_LAT[1] - US_LAT[0])) * US_H);
  return [c, r];
})();

const US_CELLS: (UsRegion | null)[][] = Array.from({ length: US_H }, (_, r) =>
  Array.from({ length: US_W }, (_, c) => {
    const [lon, lat] = usCellCenter(c, r);
    if (c === US_LAKE[0] && r === US_LAKE[1]) return "MWEST";
    return insidePoly(lon, lat, US_OUTLINE) ? usRegionOf(lon, lat) : null;
  }),
);

/** The U.S. region in a cell of the U.S. map, or null outside the country. */
export function usAt(c: number, r: number): UsRegion | null {
  if (!Number.isInteger(c) || !Number.isInteger(r) || c < 0 || r < 0 || c >= US_W || r >= US_H) return null;
  return US_CELLS[r][c];
}

/** Latitude and longitude pins snap to the 30° lines. */
export const PIN_LATS = [60, 30, 0, -30, -60];
export const PIN_LONS = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
export const latName = (lat: number) => (lat === 0 ? "0°" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`);
export const lonName = (lon: number) => (lon === 0 ? "0°" : `${Math.abs(lon)}°${lon > 0 ? "E" : "W"}`);
export const pinName = (lat: number, lon: number) => `${latName(lat)}, ${lonName(lon)}`;

// ---------------- Rounds and levels ----------------

interface RoundBase {
  /** The task, read aloud. */
  say: string;
  /** One teaching sentence once it's right ({n} = steps walked). */
  learn: string;
}

export interface TapRound extends RoundBase {
  kind: "tap";
  map: TileMap;
  targets: Cell[];
  /** "...north of the store": wrong taps are described from here. */
  ref?: Cell;
  /** Why a wrong tap is wrong (a hint, not the answer). */
  why: string;
}

export interface WalkRound extends RoundBase {
  kind: "walk";
  map: TileMap;
  start: Cell;
  goal: Cell;
  dirs: DirSet;
  /** Extra steps allowed beyond the shortest way. */
  slack: number;
  who?: "hero" | "bird";
}

export interface RegionRound extends RoundBase {
  kind: "region";
  map: "world" | "usa";
  target: RegionId;
  why: string;
}

export interface PinRound extends RoundBase {
  kind: "pin";
  lat: number;
  lon: number;
}

export type Round = TapRound | WalkRound | RegionRound | PinRound;

export interface MapLevel extends MiniLevel {
  grade: number;
  /** K picture maps say left/right/up/down; the rest use compass words. */
  words: "kid" | "compass";
  rounds: Round[];
}

const tap = (map: TileMap, say: string, targets: Cell[], why: string, learn: string, ref?: Cell): TapRound => ({ kind: "tap", map, say, targets, why, learn, ref });
const walk = (map: TileMap, say: string, start: Cell, goal: Cell, dirs: DirSet, slack: number, learn: string, who?: "bird"): WalkRound => ({
  kind: "walk",
  map,
  say,
  start,
  goal,
  dirs,
  slack,
  learn,
  who,
});
const region = (map: "world" | "usa", say: string, target: RegionId, why: string, learn: string): RegionRound => ({ kind: "region", map, say, target, why, learn });
const pin = (lat: number, lon: number, say: string, learn: string): PinRound => ({ kind: "pin", lat, lon, say, learn });

// --- Kindergarten: picture maps ---

const room = (things: Thing[]) => sideScene("room", things);
const park = (things: Thing[]) => sideScene("park", things);

// --- Grade 1: a town seen from above ---

const TOWN_A: TileMap = {
  scene: "top",
  w: 6,
  h: 6,
  terrain: ["gggggg", "gggwwg", "rrrrrr", "ggrggg", "ggrggg", "ggrggg"],
  things: [t("house", 0, 0), t("tree", 2, 0), t("school", 5, 0), t("library", 2, 1), t("store", 0, 3), t("firehouse", 4, 3), t("tree", 4, 4), t("house", 0, 5), t("barn", 5, 5)],
  areas: [{ name: "the pond", cells: [[3, 1], [4, 1]] }],
  compass: 4,
  key: true,
};

const TOWN_B: TileMap = {
  scene: "top",
  w: 6,
  h: 6,
  terrain: ["gggwgg", "gggwgg", "rrrbrr", "gggwgg", "gggwgg", "gggwgg"],
  things: [t("house", 0, 0), t("tree", 1, 1), t("tree", 4, 1), t("school", 5, 0), t("store", 1, 4), t("library", 5, 4), t("firehouse", 5, 5), t("barn", 0, 5)],
  areas: [{ name: "the river", cells: [[3, 0], [3, 1], [3, 3], [3, 4], [3, 5]] }],
  compass: 4,
  key: true,
};

// --- Grade 2: an island and a lake ---

const ISLAND: TileMap = {
  scene: "top",
  w: 7,
  h: 7,
  terrain: ["wssggsw", "sgggggs", "sgggggs", "sgggggs", "sgggggs", "wsgggsw", "wwsssww"],
  things: [t("hut", 3, 3), t("well", 3, 1), t("cave", 5, 1), t("palm", 1, 1), t("chest", 1, 4), t("boat", 3, 6)],
  open: true,
  compass: 4,
  key: true,
};

const LAKE_LAND: TileMap = {
  scene: "top",
  w: 7,
  h: 7,
  terrain: ["ggggggg", "ggwwwgg", "ggwwwgg", "ggggwgg", "ggggggg", "ggggggg", "ggggggg"],
  things: [t("hut", 0, 3), t("well", 6, 3), t("tree", 6, 0), t("rock", 1, 6), t("tree", 5, 5)],
  areas: [{ name: "the lake", cells: [[2, 1], [3, 1], [4, 1], [2, 2], [3, 2], [4, 2], [4, 3]] }],
  open: true,
  compass: 4,
};

// --- Grade 3: grid maps ---

const GRID_1: TileMap = {
  scene: "top",
  w: 8,
  h: 7,
  terrain: ["gggmmggg", "gggmggww", "rrrrrgww", "ggggrggg", "gwwgrrrr", "gwwggggg", "gggggggg"],
  things: [t("tent", 1, 0), t("mine", 5, 0), t("tree", 7, 0), t("house", 6, 3), t("well", 3, 5), t("cabin", 0, 6), t("barn", 7, 6)],
  areas: [{ name: "the pond", cells: [[1, 4], [2, 4], [1, 5], [2, 5]] }, { name: "the bay", cells: [[6, 1], [7, 1], [6, 2], [7, 2]] }],
  grid: true,
  open: true,
  compass: 4,
};

const SCALE_MAP: TileMap = {
  scene: "top",
  w: 8,
  h: 7,
  terrain: ["ggggggmm", "gwwgggmm", "gwwggggg", "gggggggg", "gggmmggg", "gggmggwg", "gggggggg"],
  things: [t("tent", 0, 3), t("mine", 5, 0), t("well", 7, 3), t("barn", 7, 6), t("tree", 0, 6)],
  areas: [{ name: "the pond", cells: [[1, 1], [2, 1], [1, 2], [2, 2]] }, { name: "the pond", cells: [[6, 5]] }],
  grid: true,
  open: true,
  miles: true,
  compass: 4,
};
const SCALE_CABIN = withThings(SCALE_MAP, [t("cabin", 4, 3)]);

const LANDFORMS: TileMap = {
  scene: "top",
  w: 8,
  h: 7,
  terrain: ["mmgmmwww", "mhghmwgw", "hhghhwww", "ggggggww", "gggggggw", "ggglvvww", "ggggggww"],
  things: [],
  areas: [
    { name: "the valley", cells: [[2, 0], [2, 1], [2, 2]] },
    { name: "the island", cells: [[6, 1]] },
    { name: "the peninsula", cells: [[6, 4]] },
    { name: "the ocean", cells: [[5, 0], [6, 0], [7, 0], [5, 1], [7, 1], [5, 2], [6, 2], [7, 2], [6, 3], [7, 3], [7, 4], [6, 5], [7, 5], [6, 6], [7, 6]] },
  ],
  grid: true,
  open: true,
  compass: 4,
};
const PLAIN: Cell[] = [];
for (let y = 3; y < 7; y++) for (let x = 0; x <= 4; x++) if (LANDFORMS.terrain[y][x] === "g") PLAIN.push([x, y]);
LANDFORMS.areas!.push({ name: "the plain", cells: PLAIN });

// --- Grade 4: eight directions ---

const COUNTRYSIDE: TileMap = {
  scene: "top",
  w: 8,
  h: 7,
  terrain: ["ggggmmgg", "gwwgmggg", "gwwggggg", "ggggggww", "ggmgggww", "ggmggggg", "gggggggg"],
  things: [t("tree", 0, 0), t("castle", 6, 0), t("house", 3, 3), t("lighthouse", 7, 2), t("windmill", 0, 6), t("barn", 4, 6), t("well", 7, 6)],
  areas: [{ name: "the lake", cells: [[1, 1], [2, 1], [1, 2], [2, 2]] }, { name: "the bay", cells: [[6, 3], [7, 3], [6, 4], [7, 4]] }],
  open: true,
  compass: 8,
};

const lvl = (grade: number, id: string, title: string, intro: string, rounds: Round[]): MapLevel => ({ grade, id, title, intro, words: grade === 0 ? "kid" : "compass", rounds });

export const MAP_LEVELS: MapLevel[] = [
  // ---------- Kindergarten ----------
  lvl(0, "k-1", "Near and Far", "Skill: the position words NEAR and FAR. Near means close by. Far means a long way away. Tap the pictures and help your hero walk!", [
    tap(room([t("bed", 0, 4), t("ball", 1, 4), t("ball", 5, 4), t("window", 3, 1), t("clock", 5, 0)]), "Tap the ball that is NEAR the bed.", [[1, 4]], "Near means close by. Look right next to the bed.", "Yes! That ball is right next to the bed. It is near.", [0, 4]),
    tap(room([t("toybox", 5, 4), t("cat", 4, 4), t("cat", 0, 4), t("window", 2, 1)]), "Tap the cat that is FAR from the toy box.", [[0, 4]], "Far means a long way away. Look on the other side of the room.", "Right! That cat is all the way across the room. It is far from the toy box.", [5, 4]),
    walk(room([t("bed", 5, 4), t("window", 2, 1), t("clock", 0, 0)]), "Help your hero walk to the bed. Tap the arrows, then tap Go.", [1, 4], [5, 4], "lr", 2, "You walked {n} steps to the bed. Now the bed is near you!"),
    tap(room([t("lamp", 0, 4), t("teddy", 1, 4), t("plant", 5, 4), t("books", 3, 1)]), "Tap the thing on the floor that is FAR from the lamp.", [[5, 4]], "Far means a long way away. Look across the room from the lamp.", "Yes! The plant is far from the lamp. The teddy bear is near it.", [0, 4]),
    tap(room([t("toybox", 1, 4), t("teddy", 2, 4), t("teddy", 5, 4), t("clock", 4, 0)]), "Tap the teddy bear NEAR the toy box.", [[2, 4]], "Near means close by. Find the toy box, then look right beside it.", "Good! That teddy bear is right beside the toy box.", [1, 4]),
    walk(room([t("toybox", 1, 4), t("window", 3, 1), t("plant", 0, 4)]), "The toy box is far away. Walk to the toy box!", [5, 4], [1, 4], "lr", 2, "{n} steps! The toy box was far. Now it is near."),
  ]),
  lvl(0, "k-2", "Left and Right", "Skill: LEFT and RIGHT on a picture map. Left is the side of your left hand. Right is the other side. Look, tap and walk!", [
    tap(park([t("tree", 0, 4), t("tree", 5, 4), t("bench", 2, 4), t("sun", 3, 0)]), "Tap the tree on the RIGHT side.", [[5, 4]], "That is the left side. Right is the other side.", "Yes! That tree is on the right side of the playground.", [2, 4]),
    tap(park([t("dog", 2, 4), t("ball", 1, 4), t("ball", 3, 4), t("cloud", 4, 0)]), "Tap the ball to the LEFT of the dog.", [[1, 4]], "Find the dog. Left is the side of your left hand.", "Right! That ball is on the left side of the dog.", [2, 4]),
    walk(park([t("swing", 3, 4), t("slide", 5, 4), t("sun", 0, 0)]), "Walk RIGHT to the swing. Tap the arrows, then tap Go.", [0, 4], [3, 4], "lr", 2, "You walked {n} steps right to the swing. Wheee!"),
    tap(park([t("bench", 3, 4), t("flower", 2, 4), t("flower", 4, 4), t("bird", 1, 1)]), "Tap the flower to the RIGHT of the bench.", [[4, 4]], "Find the bench. Right is the side of your right hand.", "Yes! That flower is on the right side of the bench.", [3, 4]),
    walk(park([t("slide", 1, 4), t("dog", 0, 4), t("cloud", 3, 0)]), "Walk LEFT to the slide.", [5, 4], [1, 4], "lr", 2, "{n} steps left to the slide. Great walking!"),
    tap(park([t("kite", 1, 1), t("kite", 4, 1), t("tree", 2, 4), t("sun", 5, 0)]), "Tap the kite to the RIGHT of the tree.", [[4, 1]], "Find the tree. Then look for the kite on its right side.", "Yes! That kite is flying on the right side of the tree.", [2, 4]),
  ]),
  lvl(0, "k-3", "Above and Below", "Skill: ABOVE and BELOW, plus near, far, left and right. Above means higher up. Below means lower down.", [
    tap(park([t("tree", 2, 4), t("bird", 2, 2), t("bird", 4, 3), t("dog", 4, 4), t("sun", 5, 0)]), "Tap the bird ABOVE the tree.", [[2, 2]], "Find the tree first. Then look up, higher than the tree.", "Yes! That bird is above the tree, up high.", [2, 4]),
    tap(room([t("books", 1, 1), t("teddy", 1, 4), t("ball", 4, 4), t("clock", 4, 0)]), "Tap the toy BELOW the bookshelf.", [[1, 4]], "Below means lower down. Find the bookshelf, then look straight down.", "Right! The teddy bear is below the bookshelf.", [1, 1]),
    walk(park([t("tree", 3, 4), t("nest", 3, 3), t("flower", 5, 4)]), "Fly the bird to its nest. The nest is UP and to the RIGHT.", [0, 4], [3, 3], "lrud", 2, "You flew up and right to the nest in {n} moves!", "bird"),
    tap(park([t("cloud", 1, 0), t("cloud", 4, 0), t("slide", 4, 4), t("swing", 1, 4)]), "Tap the cloud ABOVE the slide.", [[4, 0]], "Find the slide first. Then look up to the sky above it.", "Yes! That cloud is above the slide.", [4, 4]),
    tap(room([t("window", 4, 1), t("cat", 4, 4), t("cat", 0, 4), t("lamp", 2, 4)]), "Tap the cat BELOW the window.", [[4, 4]], "Find the window, then look straight down to the floor.", "Right! That cat is below the window.", [4, 1]),
    walk(park([t("bench", 1, 4), t("tree", 5, 4), t("sun", 0, 0)]), "Fly the bird DOWN and to the LEFT to the bench.", [4, 1], [1, 4], "lrud", 2, "Down and left in {n} moves. The bird landed on the bench!", "bird"),
    tap(park([t("tree", 0, 4), t("tree", 5, 4), t("kite", 0, 1), t("kite", 5, 1)]), "Tap the kite ABOVE the tree on the LEFT.", [[0, 1]], "Find the tree on the left side first. Then look up.", "Super! That kite is above the tree on the left.", [0, 4]),
  ]),

  // ---------- Grade 1 ----------
  lvl(1, "g1-1", "Map Keys", "Skill: reading a map key. A map key shows what each little picture on a map means. Use the key to find places in town!", [
    tap(TOWN_A, "Look at the map key. Tap the school.", [[5, 0]], "Check the map key. The school has a bell on top.", "Yes! The map key showed you the school symbol."),
    tap(TOWN_A, "Use the map key. Tap the library.", [[2, 1]], "Check the map key. The library has books on it.", "Right! That symbol stands for the library."),
    tap(TOWN_A, "On maps, water is blue. Tap the pond.", [[3, 1], [4, 1]], "Look for the blue squares. Blue means water.", "Yes! Blue on a map means water."),
    walk(TOWN_A, "Walk to the store. Tap the arrows, then tap Go.", [2, 5], [0, 3], "nesw", 2, "You found the store in {n} steps using the map key!"),
    tap(TOWN_A, "Tap the fire station. Use the key!", [[4, 3]], "Check the map key. The fire station is red with a big door.", "Right! Map symbols are small pictures of real places."),
    walk(TOWN_A, "Walk from the house at the bottom to the library.", [0, 5], [2, 1], "nesw", 2, "You made it in {n} steps! Buildings and water are in the way, so plan around them."),
  ]),
  lvl(1, "g1-2", "North, South, East, West", "Skill: the four directions. On a map, north is up, south is down, east is right and west is left. Look for N, S, E and W on the compass rose!", [
    tap(TOWN_A, "Start at the store. Tap the building straight NORTH of it.", [[0, 0]], "North is up. From the store, look straight up the map.", "Yes! The house is north of the store.", [0, 3]),
    tap(TOWN_A, "What is right next to the library on its EAST side? Tap it.", [[3, 1], [4, 1]], "East is to the right. Look right from the library.", "Right! The pond is east of the library.", [2, 1]),
    tap(TOWN_A, "What is just SOUTH of the fire station? Tap it.", [[4, 4]], "South is down. Look straight down from the fire station.", "Yes! The tree is south of the fire station.", [4, 3]),
    walk(withThings(TOWN_A, [t("flag", 5, 2)]), "Walk NORTH 3 squares, then EAST 3 squares, to the flag.", [2, 5], [5, 2], "nesw", 2, "North 3, east 3. You followed the directions!"),
    tap(TOWN_A, "From the school, go WEST along the top. What is the first thing you reach? Tap it.", [[2, 0]], "West is to the left. From the school, look left along the top row.", "Yes! The tree is west of the school.", [5, 0]),
    walk(TOWN_A, "Walk from the school to the store. Go SOUTH, then WEST, then SOUTH.", [5, 0], [0, 3], "nesw", 2, "South, west, south: {n} steps to the store!"),
  ]),
  lvl(1, "g1-3", "Town Trip", "Skill: use the map key and N, S, E and W to plan a trip. A river runs through town, so find the bridge!", [
    tap(TOWN_B, "The river runs from north to south. Tap the bridge that crosses it.", [[3, 2]], "A bridge is where the road goes over the water.", "Yes! A bridge lets the road cross the river."),
    walk(TOWN_B, "Walk from the house to the school. Cross the river on the bridge.", [0, 0], [5, 0], "nesw", 2, "You crossed the bridge and reached the school in {n} steps!"),
    tap(TOWN_B, "What is just SOUTH of the library? Tap it.", [[5, 5]], "South is down. Look straight down from the library.", "Right! The fire station is south of the library.", [5, 4]),
    walk(TOWN_B, "Walk from the store to the library.", [1, 4], [5, 4], "nesw", 2, "{n} steps over the bridge to the library!"),
    tap(TOWN_B, "Tap the tree on the WEST side of the river.", [[1, 1]], "West is left. Look on the left side of the river.", "Yes! That tree is west of the river."),
    walk(TOWN_B, "Walk from the school all the way to the farm.", [5, 0], [0, 5], "nesw", 2, "A long trip: {n} steps from the school to the farm!"),
  ]),

  // ---------- Grade 2 ----------
  lvl(2, "g2-1", "Compass Rose", "Skill: using a compass rose. N, S, E and W show which way to go. Count the squares as you move, and use the fewest steps!", [
    tap(ISLAND, "Start at the hut. Go 2 squares NORTH. Tap where you land.", [[3, 1]], "North is up. Count 2 squares up from the hut.", "Yes! 2 squares north of the hut is the well.", [3, 3]),
    tap(ISLAND, "From the hut, go 3 squares SOUTH. Tap where you land.", [[3, 6]], "South is down. Count 3 squares down from the hut.", "Right! 3 squares south of the hut is the boat.", [3, 3]),
    walk(ISLAND, "Walk from the hut to the cave: 2 squares EAST and 2 squares NORTH.", [3, 3], [5, 1], "nesw", 0, "East 2 and north 2: {n} steps to the cave!"),
    tap(ISLAND, "From the well, go 2 squares WEST. What do you find? Tap it.", [[1, 1]], "West is left. Count 2 squares left from the well.", "Yes! The palm tree is 2 squares west of the well.", [3, 1]),
    walk(ISLAND, "Walk from the boat to the treasure chest in the fewest steps.", [3, 6], [1, 4], "nesw", 0, "Just {n} steps: 2 north and 2 west!"),
    walk(ISLAND, "Walk from the palm tree to the boat. Go around the chest!", [1, 1], [3, 6], "nesw", 0, "{n} steps from the palm tree to the boat."),
  ]),
  lvl(2, "g2-2", "Counting Squares", "Skill: counting squares to measure how far. Each square is one step. Plan the shortest way around the lake!", [
    tap(LAKE_LAND, "From the hut, count 3 squares EAST. Tap that square.", [[3, 3]], "East is right. Count 1, 2, 3 squares to the right of the hut.", "Yes! 1, 2, 3 squares east of the hut.", [0, 3]),
    walk(LAKE_LAND, "Walk from the hut to the well. Use the fewest steps!", [0, 3], [6, 3], "nesw", 0, "{n} steps! The lake made you go around."),
    tap(LAKE_LAND, "Start at the rock. Count 2 squares NORTH and 3 squares EAST. Tap that square.", [[4, 4]], "Count 2 squares up from the rock, then 3 squares right.", "Right! 2 north and 3 east of the rock.", [1, 6]),
    walk(LAKE_LAND, "Walk from the tree in the corner to the hut. Fewest steps!", [6, 0], [0, 3], "nesw", 0, "{n} squares: 6 west and 3 south."),
    tap(LAKE_LAND, "From the well, count 5 squares WEST. Tap that square.", [[1, 3]], "West is left. Count 5 squares to the left of the well. Water squares count too!", "Yes! 5 squares west of the well.", [6, 3]),
    walk(withThings(LAKE_LAND, [t("flag", 3, 0)]), "Walk from the rock to the flag. Fewest steps!", [1, 6], [3, 0], "nesw", 0, "{n} steps: 6 north and 2 east."),
  ]),
  lvl(2, "g2-3", "Continents and Oceans", "Skill: the continents and oceans on a world map. Earth has 7 continents (big pieces of land) and 5 oceans.", [
    region("world", "Tap North America.", "NA", "North America is at the top left, between the Pacific and Atlantic Oceans.", "Yes! North America is in the north and west of the map."),
    region("world", "Tap Africa.", "AF", "Africa is in the middle of the map. The Equator crosses it.", "Right! Africa is a huge continent with deserts and rain forests."),
    region("world", "Tap the Pacific Ocean, the biggest ocean on Earth.", "PAC", "The Pacific is so big it shows on both the left and right edges of the map.", "Yes! The Pacific Ocean covers about a third of Earth."),
    region("world", "Tap Asia, the biggest continent.", "AS", "Asia is the giant continent at the top right.", "Right! Asia is the biggest continent, with the most people."),
    region("world", "Tap the ocean between North America and Europe.", "ATL", "Find North America and Europe. The ocean between them is the one to tap.", "Yes! The Atlantic Ocean is between the Americas and Europe and Africa."),
    region("world", "Tap South America.", "SA", "South America is below North America, on the left side of the map.", "Right! South America has the Amazon rain forest."),
    region("world", "Tap the Indian Ocean. It is south of Asia.", "IND", "Find Asia, then look south of it, between Africa and Australia.", "Yes! The Indian Ocean is between Africa and Australia."),
    region("world", "Tap the continent where kangaroos live.", "AU", "Kangaroos live in Australia, at the bottom right of the map.", "Right! Australia is a continent and a country."),
  ]),

  // ---------- Grade 3 ----------
  lvl(3, "g3-1", "Grid Maps", "Skill: grid maps. Find a square by its letter (the column) and its number (the row), like C-4. Letter first, then number.", [
    tap(GRID_1, "Go to square E-4. Tap it.", [[4, 3]], "Find column E along the top, then go down to row 4.", "Yes! E-4: column E, row 4."),
    tap(GRID_1, "What is at B-1? Tap square B-1.", [[1, 0]], "Find column B along the top, then row 1 is the very first row.", "Right! The camp is at B-1."),
    tap(GRID_1, "Tap square G-4.", [[6, 3]], "Find column G along the top, then go down to row 4.", "Yes! The house is at G-4."),
    walk(GRID_1, "Walk the explorer from A-3 to the well at D-6.", [0, 2], [3, 5], "nesw", 0, "From A-3 to D-6 in {n} steps!"),
    tap(GRID_1, "Tap square C-6.", [[2, 5]], "Find column C along the top, then go down to row 6.", "Right! C-6 is in the pond."),
    walk(GRID_1, "Walk from E-4 to the mine at F-1. Go around the mountains!", [4, 3], [5, 0], "nesw", 0, "E-4 to F-1 in {n} steps."),
    walk(GRID_1, "Walk from the camp at B-1 to the house at G-4. Fewest steps!", [1, 0], [6, 3], "nesw", 0, "B-1 to G-4: {n} steps along the road."),
  ]),
  lvl(3, "g3-2", "Map Scale", "Skill: map scale. On this map, each square = 1 mile. Count squares to find how many miles it is from place to place.", [
    tap(SCALE_MAP, "The cabin is 4 miles EAST of the camp. Tap the cabin's square.", [[4, 3]], "Each square is 1 mile. Count 4 squares east (right) of the camp.", "Yes! 4 squares = 4 miles. The cabin is at E-4.", [0, 3]),
    walk(SCALE_CABIN, "Walk from the camp to the mine at F-1. Take the shortest trail.", [0, 3], [5, 0], "nesw", 0, "That trail is {n} squares = {n} miles."),
    tap(SCALE_CABIN, "From the cabin, go 3 miles SOUTH. Tap that square.", [[4, 6]], "3 miles = 3 squares. Count down (south) from the cabin.", "Right! 3 miles south of the cabin is E-7.", [4, 3]),
    walk(SCALE_CABIN, "Walk from the cabin to the farm at H-7. Fewest miles!", [4, 3], [7, 6], "nesw", 0, "{n} squares = {n} miles to the farm."),
    tap(SCALE_CABIN, "Start at the tree at A-7. Go 7 miles EAST. Tap where you land.", [[7, 6]], "Count 7 squares east (right) from the tree, 1 mile per square.", "Yes! 7 miles east of the tree is the farm at H-7.", [0, 6]),
    walk(SCALE_CABIN, "Walk from the mine to the well. Count the miles!", [5, 0], [7, 3], "nesw", 0, "Mine to well: {n} squares = {n} miles."),
    tap(SCALE_CABIN, "A lookout is 2 miles NORTH and 3 miles WEST of the well. Tap its square.", [[4, 1]], "Count 2 squares up from the well, then 3 squares left.", "Right! The lookout is at E-2.", [7, 3]),
  ]),
  lvl(3, "g3-3", "Landforms", "Skill: landforms and bodies of water. Find a mountain, valley, island, peninsula, lake, river and plain, and say where they are on the grid.", [
    tap(LANDFORMS, "A mountain is very high land with a peak. Tap a mountain.", [[0, 0], [1, 0], [3, 0], [4, 0], [0, 1], [4, 1]], "Mountains are tall and pointy with snow on top. Hills are lower and rounder.", "Yes! Mountains are the highest landforms."),
    tap(LANDFORMS, "An island is land with water all around it. Tap the island.", [[6, 1]], "Look in the ocean for land with water on every side.", "Right! The island at G-2 has water on all four sides."),
    tap(LANDFORMS, "A peninsula is land with water on three sides. Tap the peninsula.", [[6, 4]], "Count the water sides: a peninsula has water on 3 sides and land on 1.", "Yes! The peninsula at G-5 sticks out into the ocean."),
    tap(LANDFORMS, "A valley is low land between mountains or hills. Tap the valley.", [[2, 0], [2, 1], [2, 2]], "Look for the low, flat land between the mountains and hills.", "Right! The valley in column C sits between the hills and mountains."),
    tap(LANDFORMS, "A lake is a body of water with land around it. Tap the lake.", [[3, 5]], "A lake is not the ocean. Look for water inside the land.", "Yes! The lake is at D-6."),
    tap(LANDFORMS, "A river is water that flows across the land. Tap the river.", [[4, 5], [5, 5]], "A river flows from a lake or mountains toward the ocean.", "Right! This river flows from the lake to the ocean."),
    tap(LANDFORMS, "A plain is wide, flat land. Tap a square on the plain.", PLAIN, "Plains are flat and low, with no mountains or hills.", "Yes! Plains are great for farms."),
    walk(LANDFORMS, "Walk from the valley at C-3 to the peninsula. Go around the water!", [2, 2], [6, 4], "nesw", 0, "From the valley to the peninsula in {n} steps."),
  ]),

  // ---------- Grade 4 ----------
  lvl(4, "g4-1", "Intermediate Directions", "Skill: intermediate directions. Halfway between the cardinal directions are northeast (NE), southeast (SE), southwest (SW) and northwest (NW). A diagonal move counts as one step.", [
    tap(COUNTRYSIDE, "Start at the village house. Go 2 squares NORTHEAST. Tap where you land.", [[5, 1]], "Northeast is halfway between north and east: up and to the right at the same time.", "Yes! Northeast moves up and right together.", [3, 3]),
    tap(COUNTRYSIDE, "From the village house, go 3 squares SOUTHWEST. What is there? Tap it.", [[0, 6]], "Southwest is halfway between south and west: down and to the left.", "Right! The windmill is 3 squares southwest of the house.", [3, 3]),
    walk(COUNTRYSIDE, "Travel from the windmill to the castle in the fewest moves. Diagonals count as one!", [0, 6], [6, 0], "eight", 0, "Windmill to castle in {n} moves!"),
    tap(COUNTRYSIDE, "From the castle, go 3 squares SOUTHWEST. Tap where you land.", [[3, 3]], "Southwest is down and to the left at the same time.", "Yes! 3 squares southwest of the castle is the village.", [6, 0]),
    tap(COUNTRYSIDE, "Start at the well. Go 2 squares NORTHWEST, then 1 square NORTH. Tap where you land.", [[5, 3]], "Northwest is up and to the left. Do the 2 northwest moves first, then 1 up.", "Right! Two directions in a row, step by step.", [7, 6]),
    walk(COUNTRYSIDE, "Travel from the farm to the lighthouse. Go around the bay!", [4, 6], [7, 2], "eight", 0, "Farm to lighthouse in {n} moves."),
    walk(COUNTRYSIDE, "Travel from the lighthouse back to the windmill. Use diagonals to save moves!", [7, 2], [0, 6], "eight", 0, "Lighthouse to windmill in just {n} moves!"),
  ]),
  lvl(4, "g4-2", "Latitude and Longitude", "Skill: latitude and longitude. Latitude lines run east-west and tell how far north or south of the Equator. Longitude lines run north-south and tell how far east or west of the Prime Meridian. Latitude comes first.", [
    pin(0, 0, "Drop a pin where the Equator (0°) crosses the Prime Meridian (0°).", "0°, 0° is in the Atlantic Ocean, off the west coast of Africa."),
    pin(30, -90, "Drop a pin at 30°N, 90°W.", "30°N, 90°W is near the Gulf of Mexico in North America, close to New Orleans."),
    pin(-30, 150, "Drop a pin at 30°S, 150°E.", "30°S, 150°E is in eastern Australia."),
    pin(0, -60, "Drop a pin at 0°, 60°W.", "0°, 60°W is on the Equator in South America, in the Amazon rain forest."),
    pin(30, 30, "Drop a pin at 30°N, 30°E.", "30°N, 30°E is by the Nile River in Egypt, in Africa."),
    pin(60, -150, "Drop a pin at 60°N, 150°W.", "60°N, 150°W is in Alaska, far north in North America."),
    pin(0, 90, "Drop a pin at 0°, 90°E.", "0°, 90°E is in the Indian Ocean, south of Asia."),
  ]),
  lvl(4, "g4-3", "U.S. Regions", "Skill: the five regions of the United States: the West, Southwest, Midwest, Southeast and Northeast. Use NE, SE, SW and NW to move between them.", [
    region("usa", "Tap the Midwest region.", "MWEST", "The Midwest is in the middle and north, around the Great Lakes.", "Yes! The Midwest has wide farmland and the Great Lakes."),
    region("usa", "Tap the Southwest, home of the Grand Canyon and big deserts.", "SWEST", "The Southwest is in the south, west of the middle: Arizona, New Mexico, Texas and Oklahoma.", "Right! The Southwest is hot and dry, with deserts and canyons."),
    region("usa", "Tap the Northeast, in the top right corner of the map.", "NEAST", "The Northeast is the small region in the top right, by the Atlantic Ocean.", "Yes! The Northeast has old cities, forests and rocky coasts."),
    region("usa", "Start in the Midwest and travel SOUTHEAST. Tap the region you reach.", "SEAST", "Southeast is down and to the right of the Midwest.", "Right! The Southeast has warm weather and the Everglades in Florida."),
    region("usa", "Start in the Southwest and travel NORTHWEST. Tap the region you reach.", "WEST", "Northwest is up and to the left of the Southwest.", "Yes! The West has the Rocky Mountains and the Pacific coast."),
    region("usa", "Start in the Southeast and travel NORTHEAST. Tap the region you reach.", "NEAST", "Northeast is up and to the right of the Southeast.", "Right! The Northeast is northeast of the Southeast."),
    region("usa", "Which region is NORTHEAST of the Southwest? Tap it.", "MWEST", "Find the Southwest, then go up and to the right.", "Yes! The Midwest is northeast of the Southwest."),
  ]),
];

export const levelById = (id: string): MapLevel | undefined => MAP_LEVELS.find((l) => l.id === id);
export const levelsOfGrade = (grade: number) => MAP_LEVELS.filter((l) => l.grade === grade);

// ---------------- Walking ----------------

/** Is a square blocked for walking (water, mountains, and buildings on a map seen from above)? */
export function blocked(m: TileMap, x: number, y: number, goal: Cell, start: Cell): boolean {
  if (!inside(m, x, y)) return true;
  if ((x === goal[0] && y === goal[1]) || (x === start[0] && y === start[1])) return false;
  if (BLOCKED_TERRAIN.has(terrainAt(m, x, y))) return true;
  return m.scene === "top" && !!thingAt(m, x, y);
}

export interface WalkSim {
  /** Where the walker is after each step that worked. */
  cells: Cell[];
  /** The step (0-based) that bumped into something, or -1. */
  bump: number;
  bumpInto: string;
  end: Cell;
}

export function simulate(r: WalkRound, path: Dir[]): WalkSim {
  let [x, y] = r.start;
  const cells: Cell[] = [];
  for (let i = 0; i < path.length; i++) {
    const [dx, dy] = DELTA[path[i]];
    const nx = x + dx;
    const ny = y + dy;
    if (blocked(r.map, nx, ny, r.goal, r.start)) {
      const what = !inside(r.map, nx, ny) ? "the edge of the map" : (nameAt({ ...r.map, open: true }, nx, ny) ?? "something");
      return { cells, bump: i, bumpInto: what, end: [x, y] };
    }
    x = nx;
    y = ny;
    cells.push([x, y]);
  }
  return { cells, bump: -1, bumpInto: "", end: [x, y] };
}

/** The shortest way from start to goal (breadth-first search), or null. */
export function solvePath(r: WalkRound): Dir[] | null {
  const key = (x: number, y: number) => y * 100 + x;
  const prev = new Map<number, { from: number; d: Dir }>();
  const seen = new Set([key(...r.start)]);
  let q: Cell[] = [r.start];
  while (q.length) {
    const next: Cell[] = [];
    for (const [x, y] of q) {
      if (x === r.goal[0] && y === r.goal[1]) {
        const out: Dir[] = [];
        let k = key(x, y);
        while (prev.has(k)) {
          const p = prev.get(k)!;
          out.unshift(p.d);
          k = p.from;
        }
        return out;
      }
      for (const d of DIRS[r.dirs]) {
        const nx = x + DELTA[d][0];
        const ny = y + DELTA[d][1];
        const k = key(nx, ny);
        if (seen.has(k) || blocked(r.map, nx, ny, r.goal, r.start)) continue;
        seen.add(k);
        prev.set(k, { from: key(x, y), d });
        next.push([nx, ny]);
      }
    }
    q = next;
  }
  return null;
}

export const maxSteps = (r: WalkRound) => (solvePath(r)?.length ?? 0) + r.slack;

// ---------------- Words ----------------

/** "2 squares north and 1 square east" (or "2 up and 1 to the right" on picture maps). */
export function describeOffset(dx: number, dy: number, words: "kid" | "compass"): string {
  if (words === "kid") {
    const parts: string[] = [];
    if (dy) parts.push(`${Math.abs(dy)} ${dy < 0 ? "up" : "down"}`);
    if (dx) parts.push(`${Math.abs(dx)} to the ${dx < 0 ? "left" : "right"}`);
    return parts.join(" and ") || "right here";
  }
  const sq = (n: number) => `${n} square${n === 1 ? "" : "s"}`;
  if (dx && dy && Math.abs(dx) === Math.abs(dy)) return `${sq(Math.abs(dx))} ${dy < 0 ? "north" : "south"}${dx < 0 ? "west" : "east"}`;
  const parts: string[] = [];
  if (dy) parts.push(`${sq(Math.abs(dy))} ${dy < 0 ? "north" : "south"}`);
  if (dx) parts.push(`${sq(Math.abs(dx))} ${dx < 0 ? "west" : "east"}`);
  return parts.join(" and ") || "right here";
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------- Checking tries ----------------

export interface Try {
  at?: [number, number];
  path?: string[];
}

export interface TryCheck {
  ok: boolean;
  /** Teaching feedback for this try. */
  note: string;
}

const validCell = (v: unknown): v is [number, number] => Array.isArray(v) && v.length === 2 && v.every((n) => typeof n === "number" && Number.isInteger(n));

export function checkTap(level: MapLevel, r: TapRound, at: unknown): TryCheck {
  if (!validCell(at) || !inside(r.map, at[0], at[1])) return { ok: false, note: "Tap a place on the map." };
  const [x, y] = at;
  if (r.targets.some((c) => c[0] === x && c[1] === y)) return { ok: true, note: r.learn };
  const name = nameAt(r.map, x, y);
  let s = r.map.grid ? `That's ${coordName(x, y)}${name ? `, ${name}` : ""}.` : name ? `That's ${name}.` : "";
  if (r.ref && level.words === "compass") {
    const refName = nameAt({ ...r.map, open: true }, r.ref[0], r.ref[1]) ?? "the start";
    s += ` It's ${describeOffset(x - r.ref[0], y - r.ref[1], level.words)} of ${refName}.`;
  }
  return { ok: false, note: `${s} ${r.why}`.trim() };
}

export function checkWalk(level: MapLevel, r: WalkRound, rawPath: unknown): TryCheck {
  const allowed = DIRS[r.dirs];
  if (!Array.isArray(rawPath) || rawPath.length === 0) return { ok: false, note: "Add some arrows to plan the walk." };
  if (rawPath.length > 40 || !rawPath.every((d) => isDir(d) && allowed.includes(d))) return { ok: false, note: "Use the arrow buttons to plan the walk." };
  const path = rawPath as Dir[];
  const sim = simulate(r, path);
  const goalName = nameAt({ ...r.map, open: true }, r.goal[0], r.goal[1]) ?? "the goal";
  const kid = level.words === "kid";
  if (sim.bump >= 0) {
    return { ok: false, note: `Bump! Step ${sim.bump + 1} runs into ${sim.bumpInto}. ${kid ? "Try another way." : "Plan a way around it."}` };
  }
  if (!sameCell(sim.end, r.goal)) {
    const passed = sim.cells.some((c) => sameCell(c, r.goal));
    const off = describeOffset(r.goal[0] - sim.end[0], r.goal[1] - sim.end[1], level.words);
    return {
      ok: false,
      note: `${passed ? "You walked right past it! " : ""}${cap(goalName)} is still ${off}${kid ? "" : " of where you stopped"}.`,
    };
  }
  const most = maxSteps(r);
  if (path.length > most) {
    const best = solvePath(r)?.length ?? most;
    return { ok: false, note: `You made it in ${path.length} steps, but there's a shorter way: ${best} steps${r.slack ? ` (or up to ${most})` : ""}. Try again!` };
  }
  return { ok: true, note: r.learn.replace(/\{n\}/g, String(path.length)) };
}

export function checkRegion(r: RegionRound, at: unknown): TryCheck {
  if (!validCell(at)) return { ok: false, note: "Tap a place on the map." };
  const got = r.map === "world" ? worldAt(at[0], at[1]) : usAt(at[0], at[1]);
  if (!got) return { ok: false, note: r.map === "usa" ? "Tap inside the United States." : "Tap a place on the map." };
  if (got === r.target) return { ok: true, note: r.learn };
  return { ok: false, note: `That's ${REGION_NAME[got]}. ${r.why}` };
}

export function checkPin(r: PinRound, at: unknown): TryCheck {
  if (!validCell(at)) return { ok: false, note: "Tap the map to place your pin." };
  const [lon, lat] = at;
  if (!PIN_LONS.includes(lon) || !PIN_LATS.includes(lat)) return { ok: false, note: "Pins go where the lines cross." };
  if (lat === r.lat && lon === r.lon) return { ok: true, note: r.learn };
  let s = `You picked ${pinName(lat, lon)}. `;
  if (lat !== r.lat) {
    const d = Math.abs(lat - r.lat);
    s += `Latitude first: ${latName(r.lat)} ${r.lat === 0 ? "is on the Equator" : `is ${r.lat > 0 ? "north" : "south"} of the Equator`}. Your pin is ${d}° too far ${lat > r.lat ? "north" : "south"}.`;
  } else {
    const d = Math.abs(lon - r.lon);
    s += `Your latitude is right! Now longitude: ${lonName(r.lon)} ${r.lon === 0 ? "is the Prime Meridian" : `is ${r.lon > 0 ? "east" : "west"} of the Prime Meridian`}. Your pin is ${d}° too far ${lon > r.lon ? "east" : "west"}.`;
  }
  return { ok: false, note: s };
}

export function checkTry(level: MapLevel, r: Round, tr: Try | undefined): TryCheck {
  if (!tr) return { ok: false, note: "" };
  switch (r.kind) {
    case "tap":
      return checkTap(level, r, tr.at);
    case "walk":
      return checkWalk(level, r, tr.path);
    case "region":
      return checkRegion(r, tr.at);
    case "pin":
      return checkPin(r, tr.at);
  }
}

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  tries: Try[];
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const tries = Array.isArray(o.tries)
      ? o.tries.slice(0, MAX_TRIES).map((v) => {
          const tr = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
          const out: Try = {};
          if (Array.isArray(tr.at) && tr.at.length === 2 && tr.at.every((n) => typeof n === "number" && Number.isInteger(n) && Math.abs(n) <= 360)) out.at = [tr.at[0], tr.at[1]];
          if (Array.isArray(tr.path)) out.path = tr.path.slice(0, 41).map((d) => (typeof d === "string" ? d.slice(0, 2) : ""));
          return out;
        })
      : [];
    return { tries };
  });
}

export interface RoundResult {
  /** Which try was right (0-based), or -1. */
  rightOn: number;
  points: number;
}

/** 2 points for right on the first try, 1 for the second or third. */
export function scoreRound(level: MapLevel, r: Round, move: RoundMove | undefined): RoundResult {
  const tries = move?.tries ?? [];
  const rightOn = tries.findIndex((tr) => checkTry(level, r, tr).ok);
  return { rightOn, points: rightOn === 0 ? 2 : rightOn > 0 ? 1 : 0 };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: MapLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(level, r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** The answer to a round (used for tests, and shown after 3 tries). */
export function answerTry(r: Round): Try {
  switch (r.kind) {
    case "tap":
      return { at: r.targets[0] };
    case "walk":
      return { path: solvePath(r) ?? [] };
    case "region": {
      if (r.map === "world") {
        for (let y = 0; y < WORLD_H; y++) for (let x = 0; x < WORLD_W; x++) if (worldAt(x, y) === r.target) return { at: [x, y] };
      } else {
        for (let y = 0; y < US_H; y++) for (let x = 0; x < US_W; x++) if (usAt(x, y) === r.target) return { at: [x, y] };
      }
      return {};
    }
    case "pin":
      return { at: [r.lon, r.lat] };
  }
}

export const perfectMoves = (level: MapLevel): RoundMove[] => level.rounds.map((r) => ({ tries: [answerTry(r)] }));

// ---------------- Pixel art ----------------

export const TILE = 12;
const O = "#1b1530";
const WOOD = "#8a5a2b";
const GLASS = "#8fd0ff";

/** Little deterministic speckle so tiles don't look flat. */
const speck = (x: number, y: number, s: number) => ((x * 7 + y * 13 + s * 5) * 2654435761) % 97 < 9;

function building(wall: string, roof: string, door = WOOD): Grid {
  const g = new Grid(TILE, TILE);
  g.tri(5, 1, 5, 4, roof).tri(6, 1, 5, 4, roof);
  g.rect(2, 5, 8, 6, wall);
  g.rect(5, 8, 2, 3, door);
  g.rect(3, 6, 1, 2, GLASS).rect(8, 6, 1, 2, GLASS);
  return g;
}

const SPRITES: Record<ThingKind, () => Grid> = {
  bed: () => new Grid(TILE, TILE).rect(1, 3, 2, 8, WOOD).rect(3, 6, 8, 2, "#ffffff").rect(3, 5, 2, 1, "#ffffff").rect(5, 5, 6, 3, "#3b6fd8").rect(3, 8, 8, 1, WOOD).rect(10, 8, 1, 3, WOOD),
  ball: () => new Grid(TILE, TILE).disc(5.5, 7, 3.6, "#e0453a").rect(2, 7, 8, 1, "#ffffff").set(4, 5, "#ffd6d0"),
  cat: () =>
    new Grid(TILE, TILE)
      .rect(3, 7, 6, 4, "#f2a516")
      .rect(2, 4, 4, 4, "#f2a516")
      .set(2, 3, "#f2a516")
      .set(5, 3, "#f2a516")
      .set(3, 5, O)
      .set(5, 5, O)
      .rect(9, 5, 1, 4, "#f2a516")
      .rect(4, 8, 4, 1, "#d68a10"),
  teddy: () =>
    new Grid(TILE, TILE)
      .disc(2.5, 2.5, 1.2, "#9a5b2a")
      .disc(8.5, 2.5, 1.2, "#9a5b2a")
      .disc(5.5, 4, 2.6, "#9a5b2a")
      .disc(5.5, 8.5, 2.8, "#9a5b2a")
      .set(4, 4, O)
      .set(7, 4, O)
      .rect(5, 5, 2, 1, "#e8c49a")
      .rect(5, 8, 2, 2, "#c98a52"),
  lamp: () => new Grid(TILE, TILE).tri(6, 1, 4, 3, "#f2d27a").tri(5, 1, 4, 3, "#f2d27a").rect(5, 5, 2, 5, "#5b5b6b").rect(3, 10, 6, 1, "#5b5b6b"),
  toybox: () => new Grid(TILE, TILE).rect(1, 4, 10, 7, "#e0453a").rect(1, 3, 10, 2, "#c0392b").rect(1, 7, 10, 1, "#f2d27a").disc(5.5, 8.5, 0.8, "#f2d27a"),
  window: () => new Grid(TILE, TILE).rect(1, 1, 10, 10, "#ffffff").rect(2, 2, 8, 8, GLASS).rect(5, 2, 2, 8, "#ffffff").rect(2, 5, 8, 2, "#ffffff").set(3, 3, "#d6f0ff"),
  clock: () => new Grid(TILE, TILE).disc(5.5, 5.5, 4.4, "#ffffff").rect(5, 2, 1, 4, O).rect(5, 5, 3, 1, O).set(5, 1, "#e0453a"),
  books: () =>
    new Grid(TILE, TILE)
      .rect(1, 9, 10, 2, WOOD)
      .rect(2, 3, 2, 6, "#e0453a")
      .rect(4, 4, 2, 5, "#3b6fd8")
      .rect(6, 2, 2, 7, "#22a35a")
      .rect(8, 5, 2, 4, "#f2a516"),
  plant: () => new Grid(TILE, TILE).rect(3, 8, 6, 3, "#c0703a").rect(3, 8, 6, 1, "#a85a28").disc(6, 5, 2.6, "#22a35a").disc(3.5, 4, 1.6, "#4cc46e").disc(8.5, 4, 1.6, "#4cc46e"),
  slide: () => {
    const g = new Grid(TILE, TILE).rect(1, 2, 1, 9, "#3d4a5c").rect(3, 2, 1, 9, "#3d4a5c");
    for (let y = 3; y < 11; y += 2) g.rect(1, y, 3, 1, "#3d4a5c");
    for (let i = 0; i < 8; i++) g.rect(4 + i, 2 + i, 1, 2, "#e0453a");
    return g;
  },
  swing: () =>
    new Grid(TILE, TILE)
      .rect(1, 1, 10, 1, "#3d4a5c")
      .rect(1, 1, 1, 10, "#3d4a5c")
      .rect(10, 1, 1, 10, "#3d4a5c")
      .rect(4, 2, 1, 6, "#9aa3b5")
      .rect(7, 2, 1, 6, "#9aa3b5")
      .rect(3, 8, 6, 1, "#e0453a"),
  tree: () => new Grid(TILE, TILE).rect(5, 7, 2, 4, WOOD).disc(5.5, 4.5, 3.8, "#22a35a").disc(4.5, 3.5, 1.3, "#4cc46e"),
  bench: () => new Grid(TILE, TILE).rect(1, 4, 10, 2, "#b07a3e").rect(1, 7, 10, 2, "#b07a3e").rect(2, 9, 1, 2, "#5b5b6b").rect(9, 9, 1, 2, "#5b5b6b"),
  bird: () =>
    new Grid(TILE, TILE)
      .disc(5, 6.5, 2.6, "#3b8fd9")
      .disc(7.5, 4.5, 1.7, "#3b8fd9")
      .set(9, 4, "#f2a516")
      .set(10, 4, "#f2a516")
      .set(8, 4, O)
      .rect(3, 6, 3, 1, "#2466b0")
      .rect(5, 9, 1, 1, "#f2a516"),
  sun: () => {
    const g = new Grid(TILE, TILE).disc(5.5, 5.5, 3, "#ffd25a");
    for (const [x, y] of [[5, 0], [6, 0], [5, 11], [6, 11], [0, 5], [0, 6], [11, 5], [11, 6], [1, 1], [10, 1], [1, 10], [10, 10]]) g.set(x, y, "#f2a516");
    return g;
  },
  cloud: () => new Grid(TILE, TILE).disc(3.5, 7, 2.4, "#ffffff").disc(6.5, 5.5, 3, "#ffffff").disc(9, 7.5, 1.8, "#ffffff").rect(2, 7, 9, 2, "#ffffff"),
  kite: () => {
    const g = new Grid(TILE, TILE);
    for (let y = 1; y <= 8; y++) {
      const half = y <= 4 ? y - 1 : 8 - y;
      g.rect(6 - half, y, half * 2 + 1, 1, y <= 4 ? "#e0453a" : "#f2d27a");
    }
    return g.set(6, 9, "#5b5b6b").set(5, 10, "#5b5b6b").set(4, 10, "#3b6fd8").set(6, 10, "#3b6fd8");
  },
  dog: () =>
    new Grid(TILE, TILE)
      .rect(2, 5, 6, 3, "#c08a52")
      .rect(6, 2, 4, 4, "#c08a52")
      .rect(6, 2, 1, 3, "#7a4f28")
      .set(8, 3, O)
      .set(10, 4, O)
      .rect(2, 8, 1, 2, "#c08a52")
      .rect(7, 8, 1, 2, "#c08a52")
      .set(1, 4, "#c08a52"),
  flower: () => new Grid(TILE, TILE).rect(5, 6, 1, 5, "#22a35a").set(4, 8, "#22a35a").disc(5, 4, 2.2, "#ec6aa0").set(5, 4, "#ffd25a"),
  nest: () => new Grid(TILE, TILE).rect(1, 7, 10, 2, WOOD).rect(2, 9, 8, 1, WOOD).disc(4.5, 6, 1.2, "#bfe3ff").disc(7, 6, 1.2, "#bfe3ff").set(3, 7, "#b07a3e"),
  house: () => building("#f6e7c8", "#e0453a"),
  school: () => building("#f2d27a", "#c0392b").rect(5, 0, 2, 2, "#ffd25a").set(5, 2, "#c0392b"),
  store: () => {
    const g = building("#ffffff", "#3b6fd8");
    for (let x = 2; x < 10; x++) g.set(x, 5, x % 2 ? "#e0453a" : "#ffffff");
    return g.rect(3, 6, 2, 2, GLASS).rect(7, 6, 2, 2, GLASS);
  },
  library: () =>
    new Grid(TILE, TILE)
      .tri(5, 1, 4, 5, "#c9ced9")
      .tri(6, 1, 4, 5, "#c9ced9")
      .rect(1, 5, 10, 1, "#c9ced9")
      .rect(2, 6, 1, 4, "#ffffff")
      .rect(5, 6, 2, 4, "#3b6fd8")
      .rect(9, 6, 1, 4, "#ffffff")
      .rect(1, 10, 10, 1, "#c9ced9")
      .set(5, 7, "#ffffff")
      .set(6, 7, "#ffffff"),
  firehouse: () => new Grid(TILE, TILE).rect(1, 3, 10, 8, "#e0453a").rect(1, 2, 10, 1, "#a8261b").rect(3, 6, 6, 5, "#ffffff").rect(3, 8, 6, 1, "#c9ced9").rect(5, 3, 2, 2, "#ffd25a"),
  barn: () => {
    const g = building("#c0392b", "#7a2a20", "#ffffff");
    for (let i = 0; i < 4; i++) g.set(4 + i, 7 + i, "#ffffff").set(7 - i, 7 + i, "#ffffff");
    return g.rect(3, 6, 1, 2, "#ffffff").rect(8, 6, 1, 2, "#ffffff");
  },
  hut: () => new Grid(TILE, TILE).tri(5, 1, 6, 5, "#e8c25a").tri(6, 1, 6, 5, "#e8c25a").rect(2, 7, 8, 4, "#c08a52").rect(5, 8, 2, 3, "#5a3a22"),
  palm: () =>
    new Grid(TILE, TILE)
      .rect(6, 4, 1, 7, "#9a5b2a")
      .rect(5, 8, 1, 3, "#9a5b2a")
      .rect(2, 3, 8, 1, "#22a35a")
      .rect(4, 2, 4, 1, "#22a35a")
      .set(1, 4, "#22a35a")
      .set(10, 4, "#22a35a")
      .set(6, 1, "#4cc46e")
      .disc(6, 4, 0.8, "#7a4f28"),
  well: () => new Grid(TILE, TILE).rect(2, 6, 8, 5, "#9aa3b5").rect(3, 7, 6, 1, "#3b6fd8").rect(2, 2, 1, 4, WOOD).rect(9, 2, 1, 4, WOOD).rect(1, 1, 10, 2, "#c0392b").rect(5, 3, 1, 2, "#5b5b6b"),
  boat: () => new Grid(TILE, TILE).rect(5, 1, 1, 7, WOOD).tri(7, 1, 7, 3, "#ffffff").rect(1, 8, 10, 2, "#b07a3e").rect(2, 10, 8, 1, "#b07a3e"),
  chest: () => new Grid(TILE, TILE).rect(1, 4, 10, 7, "#b07a3e").rect(1, 4, 10, 2, "#8a5a2b").rect(1, 6, 10, 1, "#ffd25a").rect(5, 6, 2, 2, "#ffd25a"),
  rock: () => new Grid(TILE, TILE).disc(5.5, 7, 4, "#9aa3b5").disc(4, 6, 1.6, "#c9ced9").rect(1, 9, 10, 2, "#7d8496"),
  cave: () => new Grid(TILE, TILE).tri(5, 1, 10, 5, "#8d8f9e").tri(6, 1, 10, 5, "#8d8f9e").rect(4, 6, 4, 5, "#2a2438").rect(5, 5, 2, 1, "#2a2438"),
  flag: () => new Grid(TILE, TILE).rect(3, 1, 1, 10, "#5b5b6b").rect(4, 1, 6, 4, "#e0453a").rect(4, 3, 6, 1, "#c0392b").rect(2, 10, 3, 1, "#5b5b6b"),
  tent: () => new Grid(TILE, TILE).tri(5, 1, 10, 4, "#22a35a").tri(6, 1, 10, 4, "#22a35a").tri(5, 5, 10, 1, "#14532d").tri(6, 5, 10, 1, "#14532d"),
  cabin: () => {
    const g = building("#9a5b2a", "#5a3a22", "#3d2a18");
    for (let y = 6; y < 11; y += 2) g.rect(2, y, 8, 1, "#7a4f28");
    return g.rect(5, 8, 2, 3, "#3d2a18");
  },
  mine: () => new Grid(TILE, TILE).tri(5, 2, 10, 5, "#9a6b3e").tri(6, 2, 10, 5, "#9a6b3e").rect(3, 5, 6, 6, WOOD).rect(4, 6, 4, 5, "#1b1530").rect(3, 5, 6, 1, "#5a3a22"),
  windmill: () => {
    const g = new Grid(TILE, TILE).tri(5, 4, 10, 3, "#f6e7c8").tri(6, 4, 10, 3, "#f6e7c8").rect(5, 8, 2, 3, WOOD);
    for (let i = 0; i < 5; i++) g.set(3 + i, 0 + i, "#b07a3e").set(8 - i, 0 + i, "#b07a3e");
    return g;
  },
  lighthouse: () => {
    const g = new Grid(TILE, TILE).rect(4, 4, 4, 7, "#ffffff").rect(3, 10, 6, 1, "#9aa3b5");
    for (let y = 5; y < 10; y += 2) g.rect(4, y, 4, 1, "#e0453a");
    return g.rect(4, 2, 4, 2, "#ffd25a").rect(3, 1, 6, 1, "#c0392b");
  },
  castle: () => {
    const g = new Grid(TILE, TILE).rect(2, 4, 8, 7, "#9aa3b5").rect(1, 2, 3, 9, "#8d8f9e").rect(8, 2, 3, 9, "#8d8f9e");
    g.set(1, 1, "#8d8f9e").set(3, 1, "#8d8f9e").set(8, 1, "#8d8f9e").set(10, 1, "#8d8f9e");
    return g.rect(5, 7, 2, 4, "#5a3a22").rect(5, 5, 2, 1, "#2a2438").rect(9, 0, 1, 2, "#e0453a");
  },
};

const spriteCache = new Map<ThingKind, Grid>();
export function thingGrid(k: ThingKind): Grid {
  let g = spriteCache.get(k);
  if (!g) spriteCache.set(k, (g = SPRITES[k]().outline(O)));
  return g;
}

/** Paints one terrain square into a map picture. */
function paintTile(g: Grid, tr: string, ox: number, oy: number, tx: number, ty: number) {
  const fill = (c: string, dots?: string) => {
    for (let y = 0; y < TILE; y++)
      for (let x = 0; x < TILE; x++) g.set(ox + x, oy + y, dots && speck(tx * TILE + x, ty * TILE + y, 1) ? dots : c);
  };
  const wave = (base: string, hi: string) => {
    fill(base);
    for (let y = 2; y < TILE; y += 4) for (let x = (y / 2) % 4; x < TILE; x += 6) g.rect(ox + x, oy + y, 3, 1, hi);
  };
  switch (tr) {
    case "r":
      fill("#b8bcc8");
      g.rect(ox, oy, TILE, 1, "#a3a8b6").rect(ox + 5, oy + 5, 2, 2, "#f2f2f2");
      break;
    case "w":
      wave("#3b8fd9", "#7cc0f2");
      break;
    case "l":
      wave("#4aa3df", "#9fd4f5");
      break;
    case "v":
      fill("#4aa3df");
      for (let x = 1; x < TILE; x += 4) g.rect(ox + x, oy + 3, 2, 1, "#bfe3ff").rect(ox + x + 2, oy + 8, 2, 1, "#bfe3ff");
      break;
    case "s":
      fill("#f2d995", "#e0c070");
      break;
    case "b":
      wave("#3b8fd9", "#7cc0f2");
      g.rect(ox, oy + 2, TILE, 8, "#b07a3e");
      for (let x = 1; x < TILE; x += 3) g.rect(ox + x, oy + 2, 1, 8, "#8a5a2b");
      break;
    case "m":
      fill("#7cc95b", "#6ab84a");
      g.tri(ox + 5, oy + 1, oy + 10, 5, "#8d8f9e").tri(ox + 6, oy + 1, oy + 10, 5, "#7d8496");
      g.rect(ox + 5, oy + 1, 2, 2, "#ffffff").set(ox + 4, oy + 3, "#ffffff").set(ox + 7, oy + 3, "#ffffff");
      break;
    case "h":
      fill("#7cc95b", "#6ab84a");
      g.disc(ox + 5.5, oy + 9, 4.6, "#5aa845").disc(ox + 4.5, oy + 7, 1.2, "#8ad86a");
      for (let x = 0; x < TILE; x++) g.set(ox + x, oy + 11, "#7cc95b");
      break;
    case "W":
      fill("#fde7c8");
      if (tx % 2 === ty % 2) g.set(ox + 5, oy + 5, "#f6cf9a");
      break;
    case "F":
      fill("#c98a52");
      g.rect(ox, oy, TILE, 1, "#a8703f").rect(ox + (ty % 2 ? 3 : 8), oy + 1, 1, TILE - 1, "#b67a45");
      break;
    case "K":
      fill("#bfe7ff");
      break;
    case "G":
      fill("#7cc95b", "#5aa845");
      g.rect(ox, oy, TILE, 2, "#5aa845");
      break;
    default:
      fill("#7cc95b", "#6ab84a");
  }
}

/** The whole map as one picture (terrain and things). */
export function mapGrid(m: TileMap): Grid {
  const g = new Grid(m.w * TILE, m.h * TILE);
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) paintTile(g, terrainAt(m, x, y), x * TILE, y * TILE, x, y);
  for (const th of m.things) g.draw(thingGrid(th.k), th.x * TILE, th.y * TILE);
  return g;
}

/** A single terrain square (for the map key). */
export function terrainGrid(tr: string): Grid {
  const g = new Grid(TILE, TILE);
  paintTile(g, tr, 0, 0, 0, 0);
  return g;
}

export const CONTINENT_COLOR: Record<Continent, string> = { NA: "#6cc070", SA: "#a3d36b", EU: "#f2d27a", AF: "#f0a04b", AS: "#e2725b", AU: "#c08adf", AN: "#f4f7fb" };
export const US_COLOR: Record<UsRegion, string> = { WEST: "#f0a04b", SWEST: "#e2725b", MWEST: "#f2d27a", SEAST: "#6cc070", NEAST: "#7aa6e8" };
export const WORLD_PX = 3;
export const US_PX = 4;

/** The world map (3 pixels per 10° cell). With `lines`, latitude and longitude lines every 30°. */
export function worldGrid(lines = false): Grid {
  const P = WORLD_PX;
  const g = new Grid(WORLD_W * P, WORLD_H * P);
  for (let r = 0; r < WORLD_H; r++)
    for (let c = 0; c < WORLD_W; c++) {
      const land = LAND[WORLD[r][c]];
      const base = land ? CONTINENT_COLOR[land] : "#3b8fd9";
      for (let y = 0; y < P; y++)
        for (let x = 0; x < P; x++) {
          const px = c * P + x;
          const py = r * P + y;
          g.set(px, py, !land && speck(px, py, 3) ? "#4a9be0" : base);
        }
    }
  // A dark coastline where land meets water.
  for (let y = 0; y < g.h; y++)
    for (let x = 0; x < g.w; x++) {
      const isLand = !!LAND[WORLD[Math.floor(y / P)][Math.floor(x / P)]];
      if (!isLand) continue;
      const n = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].some(([a, b]) => a >= 0 && b >= 0 && a < g.w && b < g.h && !LAND[WORLD[Math.floor(b / P)][Math.floor(a / P)]]);
      if (n) g.set(x, y, "#2d5a3a");
    }
  if (lines) {
    for (let c = 3; c < WORLD_W; c += 3) for (let y = 0; y < g.h; y++) g.set(c * P, y, c === 18 ? "#ffd25a" : "#dfe9ff");
    for (let r = 3; r < WORLD_H; r += 3) for (let x = 0; x < g.w; x++) g.set(x, r * P, r === 9 ? "#ffd25a" : "#dfe9ff");
  }
  return g;
}

/** The U.S. map (4 pixels per cell), each region its own color with a dark line between regions. */
export function usGrid(): Grid {
  const P = US_PX;
  const g = new Grid(US_W * P, US_H * P);
  for (let r = 0; r < US_H; r++)
    for (let c = 0; c < US_W; c++) {
      const reg = usAt(c, r);
      const lake = c === US_LAKE[0] && r === US_LAKE[1];
      for (let y = 0; y < P; y++)
        for (let x = 0; x < P; x++) {
          const px = c * P + x;
          const py = r * P + y;
          g.set(px, py, lake ? "#4aa3df" : reg ? US_COLOR[reg] : speck(px, py, 2) ? "#cfe6f7" : "#dcecf8");
        }
    }
  for (let y = 0; y < g.h; y++)
    for (let x = 0; x < g.w; x++) {
      const here = usAt(Math.floor(x / P), Math.floor(y / P));
      if (!here) continue;
      const edge = [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]].some(([a, b]) => usAt(Math.floor(a / P), Math.floor(b / P)) !== here);
      if (edge) g.set(x, y, "#1b1530");
    }
  return g;
}

// ---------------- The game ----------------

export const mapQuest: MiniGame = {
  ...mapQuestInfo,
  levels: () => [],
  levelsForGrade: (grade) => levelsOfGrade(grade).map(({ id, title, intro }) => ({ id, title, intro })),
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
