import type { MiniGame, MiniLevel } from "./index";
import type { Band } from "../pixel/world";

/**
 * Voyage of Discovery (History Kingdom). The kid navigates a ship across a
 * sea chart, leg by leg, the way Age-of-Exploration sailors did with a
 * compass and dead reckoning: pick a heading, pick a distance, sail. Land,
 * reefs and the edge of the chart stop a leg early. Every leg costs supplies
 * (one day per league sailed, plus a day to take a fix and turn the ship),
 * so a good navigator plans short, safe legs. Strategist levels add a
 * current that sets the ship off course after every leg (set and drift).
 *
 * Pure and repeatable, so the server can replay the kid's legs and check
 * the stars.
 */

export type Mode = "cardinal" | "compass8" | "bearing";

/** A cell on the chart. */
export type Cell = "sea" | "land" | "reef" | "port" | "dest" | "edge";

export interface VoyageLevel extends MiniLevel {
  band: Band;
  mode: Mode;
  /** Rows from north to south: "." sea, "#" land, "*" reef, "P" home port, "D" destination. */
  chart: string[];
  /** Days of supplies at the start. */
  supplies: number;
  /** Where the current pushes the ship after each leg, in leagues (east +, north +). */
  current: { east: number; north: number };
  /** Supplies left needed for 3 and 2 stars (reaching port at all is 1 star). */
  stars3: number;
  stars2: number;
  /** Longest leg allowed. */
  maxLeg: number;
  /** A short, factual note from the history of exploration. */
  history: string;
  /** Names for the start and the goal, shown on the chart. */
  from: string;
  to: string;
}

/** The moves the kid sends: one per leg. Heading is a compass point ("N", "NE"...) or a bearing in degrees. */
export interface Leg {
  h: string | number;
  d: number;
}

export const POINTS4 = ["N", "E", "S", "W"] as const;
export const POINTS8 = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const POINT_DEG: Record<string, number> = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
/** One step for each compass point (x east, y south on the chart). */
const POINT_STEP: Record<string, [number, number]> = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };
export const POINT_NAME: Record<string, string> = { N: "north", NE: "northeast", E: "east", SE: "southeast", S: "south", SW: "southwest", W: "west", NW: "northwest" };

/** One day for each league sailed, plus this many for every leg (taking a fix and turning the ship). */
export const FIX_COST = 1;
/** Striking a reef costs days of repairs. */
export const REEF_COST = 2;
const MAX_LEGS = 40;
const SAMPLE = 0.05;
/** Shortest leg on bearing levels (stops tiny legs that only ride the current). */
export const MIN_BEARING_LEG = 1;

export const VOYAGE_LEVELS: Record<Band, VoyageLevel[]> = {
  sprout: [
    {
      id: "vy-s1",
      band: "sprout",
      mode: "cardinal",
      title: "Find North",
      from: "Home port",
      to: "Treasure Bay",
      chart: [
        "..........",
        "....#.....",
        "P...##....",
        "....##....",
        "..........",
        ".........D",
      ],
      supplies: 20,
      current: { east: 0, north: 0 },
      stars3: 4,
      stars2: 2,
      maxLeg: 12,
      history:
        "Sailors in China used a magnetized needle to find north by about 1100, and European sailors had the compass by about 1200. A compass points north even when clouds hide the Sun and stars.",
      intro: "Pick a direction (N, E, S or W) and count the squares. Sail around the island to Treasure Bay.",
    },
    {
      id: "vy-s2",
      band: "sprout",
      mode: "cardinal",
      title: "Columbus Sails West",
      from: "Canary Islands",
      to: "The Bahamas",
      chart: [
        "............",
        "..*......#..",
        "..*......##P",
        "D.*....#....",
        "..*....##...",
        "............",
        ".*..........",
      ],
      supplies: 25,
      current: { east: 0, north: 0 },
      stars3: 4,
      stars2: 2,
      maxLeg: 12,
      history:
        "In 1492 Christopher Columbus sailed west with three ships, the Niña, the Pinta and the Santa María. They left the Canary Islands on September 6 and sighted an island in the Bahamas on October 12.",
      intro: "Sail west across the ocean, but watch for the rocky reef (the white splashes) near the islands!",
    },
    {
      id: "vy-s3",
      band: "sprout",
      mode: "cardinal",
      title: "Around the Cape",
      from: "Lisbon",
      to: "East Africa",
      chart: [
        "P.##........",
        "..###.......",
        "..####......",
        "..####.....D",
        "...###......",
        "...##..*....",
        "....#.*.....",
        "............",
      ],
      supplies: 32,
      current: { east: 0, north: 0 },
      stars3: 5,
      stars2: 2,
      maxLeg: 12,
      history:
        "In 1488 the Portuguese captain Bartolomeu Dias sailed around the southern tip of Africa, the Cape of Good Hope. It showed that ships could sail from the Atlantic into the Indian Ocean.",
      intro: "Africa is in the way! Sail south past the cape, then turn and head for East Africa. Fewer, smarter legs save supplies.",
    },
  ],
  adventurer: [
    {
      id: "vy-a1",
      band: "adventurer",
      mode: "compass8",
      title: "Dead Reckoning",
      from: "Port",
      to: "Spice Island",
      chart: [
        "............",
        ".P..........",
        "......#.....",
        "....####....",
        "....###.....",
        "..........*.",
        ".........*.D",
        "............",
      ],
      supplies: 22,
      current: { east: 0, north: 0 },
      stars3: 5,
      stars2: 2.5,
      maxLeg: 12,
      history:
        "Without satellites, navigators used dead reckoning: they wrote down their heading, speed and time in the log book to work out where the ship must be. Speed was measured with a 'chip log', a knotted rope counted against a sandglass, which is why ship speed is still measured in knots.",
      intro: "Now you have 8 compass points. A diagonal square is about 1.4 times longer than a straight one (√2), so it uses 1.4 days.",
    },
    {
      id: "vy-a2",
      band: "adventurer",
      mode: "compass8",
      title: "Magellan's Strait",
      from: "Atlantic",
      to: "Pacific",
      chart: [
        "############",
        "#######....P",
        "######..####",
        "#####.######",
        "##...*.#####",
        "#..#########",
        "D.##########",
        "############",
      ],
      supplies: 22,
      current: { east: 0, north: 0 },
      stars3: 4,
      stars2: 2,
      maxLeg: 12,
      history:
        "In 1520 Ferdinand Magellan's fleet found a narrow, twisting passage at the southern tip of South America. It took them 38 days to get through. They came out into calm water that Magellan named the Pacific, the peaceful ocean. The passage is now called the Strait of Magellan.",
      intro: "Thread the twisting strait from the Atlantic to the Pacific. One wrong turn and you'll run aground!",
    },
    {
      id: "vy-a3",
      band: "adventurer",
      mode: "compass8",
      title: "Vasco da Gama to India",
      from: "Mozambique",
      to: "Calicut",
      chart: [
        "P.............",
        "..##......*...",
        "..##...#......",
        "......###..*..",
        ".*.....#......",
        "....*.....##..",
        "..........##..",
        "......*.......",
        "...........*.D",
      ],
      supplies: 26,
      current: { east: 0, north: 0 },
      stars3: 4.5,
      stars2: 2,
      maxLeg: 12,
      history:
        "In 1498 Vasco da Gama crossed the Indian Ocean and reached Calicut in India, the first voyage by sea from Europe to India. Navigators then used the astrolabe to measure the height of the Sun or a star, which told them their latitude: how far north or south they were.",
      intro: "Open ocean with islands and hidden reefs. Plan diagonal legs to save days, but keep clear of the reefs.",
    },
  ],
  strategist: [
    {
      id: "vy-h1",
      band: "strategist",
      mode: "bearing",
      title: "Set and Drift",
      from: "Havana",
      to: "Cape Hatteras",
      chart: [
        "..............",
        ".............D",
        "..............",
        "......###.....",
        "......###.....",
        ".......#......",
        "..............",
        "..............",
        ".P............",
        "..............",
      ],
      supplies: 21,
      current: { east: 1, north: 0 },
      stars3: 5,
      stars2: 2.5,
      maxLeg: 20,
      history:
        "In 1513 Antón de Alaminos, pilot for Juan Ponce de León, noted a powerful current off Florida that carried ships north and east even against the wind. Around 1770 Benjamin Franklin and his cousin, the whaling captain Timothy Folger, printed a chart of this Gulf Stream for ship captains.",
      intro: "Bearings run clockwise from north: 000° north, 090° east, 180° south, 270° west. After each leg the current sets you 1.0 league east. Plan for it!",
    },
    {
      id: "vy-h2",
      band: "strategist",
      mode: "bearing",
      title: "Cook and the Great Barrier Reef",
      from: "Botany Bay",
      to: "Cape York",
      chart: [
        "D.............",
        "..............",
        "..***.******..",
        "..............",
        ".....*........",
        "#.............",
        "##..****.****.",
        "###...........",
        "####..........",
        "#####P........",
      ],
      supplies: 18,
      current: { east: -1, north: 0.5 },
      stars3: 6,
      stars2: 3,
      maxLeg: 20,
      history:
        "In 1770 James Cook charted the east coast of Australia aboard HMS Endeavour. On June 11 the ship struck the Great Barrier Reef. The crew threw cannons and ballast overboard to float her off, then spent about seven weeks repairing the hull on shore before sailing on.",
      intro: "A current sets you 1.0 league west and 0.5 north each leg, toward the reefs. Find the gaps and keep your hull in one piece.",
    },
    {
      id: "vy-h3",
      band: "strategist",
      mode: "bearing",
      title: "Longitude at Last",
      from: "Plymouth",
      to: "Tahiti",
      chart: [
        "P......#......",
        "......###.....",
        ".......#......",
        "..............",
        "###.......*...",
        "####.....***..",
        "..##......*...",
        "..............",
        "......##.....D",
        ".....####.....",
      ],
      supplies: 22,
      current: { east: 1, north: -0.5 },
      stars3: 5.5,
      stars2: 2.5,
      maxLeg: 20,
      history:
        "On his second voyage (1772–1775) Cook carried K1, Larcum Kendall's copy of John Harrison's sea clock. Comparing noon at sea with the time back home told Cook his longitude, how far east or west he was, more accurately than ever before.",
      intro: "The current sets you 1.0 league east and 0.5 south after every leg. Work out the vector you need, then subtract the current.",
    },
  ],
};

const ALL = Object.values(VOYAGE_LEVELS).flat();
export const levelById = (id: string) => ALL.find((l) => l.id === id);

const r6 = (n: number) => Math.round(n * 1e6) / 1e6;
export const round1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

export const chartW = (l: VoyageLevel) => l.chart[0].length;
export const chartH = (l: VoyageLevel) => l.chart.length;

export function cellAt(l: VoyageLevel, x: number, y: number): Cell {
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  if (cy < 0 || cy >= l.chart.length || cx < 0 || cx >= l.chart[0].length) return "edge";
  const c = l.chart[cy][cx];
  return c === "#" ? "land" : c === "*" ? "reef" : c === "P" ? "port" : c === "D" ? "dest" : "sea";
}

function find(l: VoyageLevel, ch: string): { x: number; y: number } {
  for (let y = 0; y < l.chart.length; y++) {
    const x = l.chart[y].indexOf(ch);
    if (x >= 0) return { x, y };
  }
  return { x: 0, y: 0 };
}
/** Start: the middle of the home-port square. */
export const startPos = (l: VoyageLevel) => {
  const p = find(l, "P");
  return { x: p.x + 0.5, y: p.y + 0.5 };
};
export const destCell = (l: VoyageLevel) => find(l, "D");

/** A cleaned-up leg, or null if it isn't a real leg for this level. */
export interface CleanLeg {
  /** "N".."NW" or a bearing like "045°". */
  label: string;
  bearing: number;
  dist: number;
}

export function cleanLeg(l: VoyageLevel, raw: unknown): CleanLeg | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const d = typeof o.d === "number" ? o.d : typeof o.d === "string" ? Number(o.d) : NaN;
  if (!Number.isFinite(d)) return null;
  if (l.mode === "bearing") {
    const h = typeof o.h === "number" ? o.h : typeof o.h === "string" && o.h.trim() !== "" ? Number(o.h) : NaN;
    if (!Number.isFinite(h) || h < 0 || h > 360) return null;
    const bearing = Math.round(h) % 360;
    const dist = round1(d);
    if (dist < MIN_BEARING_LEG || dist > l.maxLeg) return null;
    return { label: `${String(bearing).padStart(3, "0")}°`, bearing, dist };
  }
  if (typeof o.h !== "string") return null;
  const allowed: readonly string[] = l.mode === "cardinal" ? POINTS4 : POINTS8;
  if (!allowed.includes(o.h)) return null;
  const dist = Math.round(d);
  if (dist < 1 || dist > l.maxLeg || Math.abs(d - dist) > 1e-9) return null;
  return { label: o.h, bearing: POINT_DEG[o.h], dist };
}

export interface Pt {
  x: number;
  y: number;
}

export interface LegResult {
  leg: CleanLeg;
  from: Pt;
  /** Where the sailing part of the leg ended (before the current). */
  sailedTo: Pt;
  /** Where the ship ended up after the current. */
  to: Pt;
  /** Leagues actually sailed. */
  sailed: number;
  /** What stopped the leg early, if anything (while sailing or while drifting). */
  hit: "land" | "reef" | "edge" | null;
  hitInDrift: boolean;
  /** Days used this leg (sailing + fix + repairs). */
  cost: number;
  arrived: boolean;
  suppliesAfter: number;
}

/** Moves the ship in small samples along a vector; stops on the destination or before a hazard. */
function travel(l: VoyageLevel, from: Pt, dx: number, dy: number, steps: number): { pos: Pt; done: number; hit: LegResult["hit"]; arrived: boolean } {
  let pos = from;
  for (let k = 1; k <= steps; k++) {
    const next = { x: r6(from.x + (dx * k) / steps), y: r6(from.y + (dy * k) / steps) };
    const c = cellAt(l, next.x, next.y);
    if (c === "dest") return { pos: next, done: k / steps, hit: null, arrived: true };
    if (c === "land" || c === "reef" || c === "edge") return { pos, done: (k - 1) / steps, hit: c, arrived: false };
    pos = next;
  }
  return { pos, done: 1, hit: null, arrived: false };
}

/** Sails one leg from a position, then lets the current set the ship. */
export function sailLeg(l: VoyageLevel, from: Pt, supplies: number, leg: CleanLeg): LegResult {
  let res: ReturnType<typeof travel>;
  let length: number;
  if (l.mode === "bearing") {
    const rad = (leg.bearing * Math.PI) / 180;
    const dx = r6(Math.sin(rad) * leg.dist);
    const dy = r6(-Math.cos(rad) * leg.dist);
    length = leg.dist;
    res = travel(l, from, dx, dy, Math.max(1, Math.ceil(leg.dist / SAMPLE)));
  } else {
    // Grid moves: one whole square per step, checking the square the ship lands in.
    const [sx, sy] = POINT_STEP[leg.label];
    length = leg.dist * Math.hypot(sx, sy);
    res = travel(l, from, sx * leg.dist, sy * leg.dist, leg.dist);
  }
  const sailed = r2(length * res.done);
  let cost = sailed + FIX_COST + (res.hit === "reef" ? REEF_COST : 0);
  let to = res.pos;
  let hit = res.hit;
  let hitInDrift = false;
  let arrived = res.arrived;
  const { east, north } = l.current;
  if (!arrived && (east !== 0 || north !== 0)) {
    const len = Math.hypot(east, north);
    const drift = travel(l, res.pos, east, -north, Math.max(1, Math.ceil(len / SAMPLE)));
    to = drift.pos;
    arrived = drift.arrived;
    if (drift.hit && drift.hit !== "edge") {
      // The current pushed the ship onto land or a reef.
      if (!hit) {
        hit = drift.hit;
        hitInDrift = true;
      }
      if (drift.hit === "reef") cost += REEF_COST;
    } else if (drift.hit === "edge" && !hit) {
      hit = "edge";
      hitInDrift = true;
    }
  }
  cost = r2(cost);
  return { leg, from, sailedTo: res.pos, to, sailed, hit, hitInDrift, cost, arrived, suppliesAfter: r2(supplies - cost) };
}

export interface VoyageResult {
  legs: LegResult[];
  arrived: boolean;
  /** Ran out of supplies (or legs) before reaching the destination. */
  lost: boolean;
  suppliesLeft: number;
  stars: number;
  best: number;
}

export function starsFor(l: VoyageLevel, arrived: boolean, left: number): number {
  if (!arrived || left < 0) return 0;
  return left >= l.stars3 - 1e-9 ? 3 : left >= l.stars2 - 1e-9 ? 2 : 1;
}

/** The game state after a list of legs (the server uses this to check the stars). */
export function replay(l: VoyageLevel, moves: unknown): VoyageResult {
  const list = Array.isArray(moves) ? moves.slice(0, MAX_LEGS * 2) : [];
  let pos = startPos(l);
  let supplies = l.supplies;
  const legs: LegResult[] = [];
  let arrived = false;
  let lost = false;
  for (const raw of list) {
    const leg = cleanLeg(l, raw);
    if (!leg) continue;
    const r = sailLeg(l, pos, supplies, leg);
    legs.push(r);
    pos = r.to;
    supplies = r.suppliesAfter;
    if (r.arrived) {
      arrived = supplies >= 0;
      lost = !arrived;
      break;
    }
    if (supplies <= 0 || legs.length >= MAX_LEGS) {
      lost = true;
      break;
    }
  }
  const left = Math.max(0, supplies);
  const stars = starsFor(l, arrived, supplies);
  return { legs, arrived, lost, suppliesLeft: round1(left), stars, best: arrived ? round1(left) : 0 };
}

/** Chart coordinates for people: east = x, north counted up from the bottom edge. */
export const toEN = (l: VoyageLevel, p: Pt) => ({ e: round1(p.x), n: round1(chartH(l) - p.y) });

/** What the kid can learn from a leg. */
export function legLesson(l: VoyageLevel, r: LegResult): string {
  if (r.arrived) return "Land ho! You reached your destination.";
  const where = r.hitInDrift ? "The current pushed you" : "You sailed";
  if (r.hit === "reef")
    return `${where} onto a reef! Reefs are rocks and coral hiding just under the water, and they rip open wooden hulls. Repairs cost ${REEF_COST} extra days. Navigators marked reefs on their charts and kept well clear.`;
  if (r.hit === "land")
    return `${where} into land and ran aground, so the leg ended early. Count the squares before you sail: your heading must pass clear of every island.`;
  if (r.hit === "edge") return "That's the edge of your chart! Beyond it, you'd be sailing into waters nobody has mapped yet. The leg ended early.";
  if (l.mode === "bearing" && (l.current.east || l.current.north))
    return "Leg complete. Notice the current moved you after you stopped: real navigators added this 'set and drift' to their dead reckoning.";
  return "Leg complete. Every leg costs a day to take a fix and turn the ship, so a few long, safe legs beat many short ones.";
}

// ---------------- Solver (for tests and checking that every level is fair) ----------------

/**
 * Cheapest plan found by a search over legs. Grid levels try every point and
 * distance; bearing levels aim at the middle of each square, correcting for
 * the current. Returns the legs and the supplies left.
 */
export function solve(l: VoyageLevel): { legs: Leg[]; left: number } | null {
  const W = chartW(l);
  const H = chartH(l);
  type Node = { pos: Pt; used: number; legs: Leg[] };
  const best = new Map<string, number>();
  const key = (p: Pt) => `${Math.floor(p.x)},${Math.floor(p.y)}`;
  let frontier: Node[] = [{ pos: startPos(l), used: 0, legs: [] }];
  best.set(key(frontier[0].pos), 0);
  let answer: { legs: Leg[]; left: number } | null = null;
  const candidates = (pos: Pt): Leg[] => {
    if (l.mode !== "bearing") {
      const pts = l.mode === "cardinal" ? POINTS4 : POINTS8;
      return pts.flatMap((h) => Array.from({ length: l.maxLeg }, (_, i) => ({ h, d: i + 1 })));
    }
    const out: Leg[] = [];
    for (let ty = 0; ty < H; ty++)
      for (let tx = 0; tx < W; tx++) {
        const goalE = tx + 0.5 - pos.x - l.current.east;
        const goalS = ty + 0.5 - pos.y + l.current.north;
        const d = round1(Math.hypot(goalE, goalS));
        if (d < MIN_BEARING_LEG || d > l.maxLeg) continue;
        let h = Math.round((Math.atan2(goalE, -goalS) * 180) / Math.PI);
        if (h < 0) h += 360;
        out.push({ h: h % 360, d });
      }
    return out;
  };
  for (let depth = 0; depth < 8 && frontier.length; depth++) {
    const next: Node[] = [];
    for (const node of frontier) {
      for (const leg of candidates(node.pos)) {
        const c = cleanLeg(l, leg);
        if (!c) continue;
        const r = sailLeg(l, node.pos, l.supplies - node.used, c);
        const used = r2(node.used + r.cost);
        if (used > l.supplies) continue;
        if (r.arrived) {
          const left = r2(l.supplies - used);
          if (!answer || left > answer.left) answer = { legs: [...node.legs, leg], left };
          continue;
        }
        if (r.hit) continue;
        const k = key(r.to);
        if ((best.get(k) ?? Infinity) <= used) continue;
        best.set(k, used);
        next.push({ pos: r.to, used, legs: [...node.legs, leg] });
      }
    }
    frontier = next;
  }
  return answer;
}

export function levelsFor(band: Band): MiniLevel[] {
  return VOYAGE_LEVELS[band].map(({ id, title, intro }) => ({ id, title, intro }));
}

export const voyageInfo = { id: "voyage", title: "Voyage of Discovery", icon: "⛵", land: "history" as const, blurb: "Steer your ship by compass and distance to reach new lands before supplies run out." };

export const voyage: MiniGame | null = {
  ...voyageInfo,
  levels: (band) => levelsFor(band),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.best };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
