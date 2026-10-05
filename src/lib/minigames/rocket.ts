import type { MiniGame, MiniLevel } from "./index";
import type { Band } from "../pixel/world";

/**
 * Rocket Launch (Science Isles). The kid sets the engine thrust (and, from
 * grades 6-8, the payload mass) and launches. The rocket burns its engine for
 * a few seconds, then coasts upward until gravity stops it. The peak height
 * must land inside the mission's altitude band.
 *
 * The physics (a simple, correct model: constant mass, no air resistance):
 *   weight W = m·g
 *   net force F = T − W          (if F ≤ 0 the rocket stays on the pad)
 *   a = F / m                    (Newton's second law, F = m·a)
 *   burn for t seconds:  v = a·t,  h_burn = ½·a·t²
 *   coast after burnout: h_coast = v² / (2g)
 *   peak = h_burn + h_coast = ½·a·t²·(1 + a/g)
 *
 * Stars by attempts: hit the band on the 1st launch = 3, 2nd = 2, 3rd-5th = 1.
 * Pure and repeatable, so the server can replay the kid's launches.
 */

export interface Range {
  min: number;
  max: number;
  step: number;
}

export interface RocketLevel extends MiniLevel {
  /** Gravity in m/s² (10 for grades 4-5, 9.8 on Earth, 1.62 on the Moon). */
  g: number;
  /** Rocket mass without payload, kg. */
  dryMass: number;
  /** Payload choices in kg (min = max when it's fixed). */
  payload: Range;
  /** Engine thrust choices in newtons (min = max when it's fixed). */
  thrust: Range;
  /** Engine burn time, seconds. */
  burn: number;
  /** Target altitude band, metres (inclusive). */
  lo: number;
  hi: number;
  /** What's being launched, for the story. */
  cargo: string;
  /** Where it happens (for the scene). */
  world: "earth" | "moon";
}

export interface Launch {
  thrust: number;
  payload: number;
}

export const MAX_ATTEMPTS = 5;

const L = (l: RocketLevel) => l;

export const ROCKET_LEVELS: Record<Band, RocketLevel[]> = {
  sprout: [
    L({ id: "s1", title: "First Launch", g: 10, dryMass: 2, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 80, step: 10 }, burn: 2, lo: 30, hi: 50, cargo: "a little camera", world: "earth", intro: "Your rocket has a mass of 2 kg, so gravity pulls it down with 20 newtons (N). Pick how hard the engine pushes up and send the camera between 30 and 50 m high." }),
    L({ id: "s2", title: "Weather Satellite", g: 10, dryMass: 4, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 150, step: 10 }, burn: 2, lo: 80, hi: 100, cargo: "the weather satellite", world: "earth", intro: "A heavier rocket (4 kg) needs more push. Deliver the weather satellite between 80 and 100 m." }),
    L({ id: "s3", title: "Long Burn", g: 10, dryMass: 5, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 150, step: 10 }, burn: 3, lo: 80, hi: 100, cargo: "a radio beacon", world: "earth", intro: "This 5 kg rocket's engine burns for 3 seconds instead of 2. A longer push goes higher! Reach 80 to 100 m." }),
  ],
  adventurer: [
    L({ id: "a1", title: "Weather Satellite", g: 9.8, dryMass: 6, payload: { min: 4, max: 4, step: 1 }, thrust: { min: 0, max: 400, step: 10 }, burn: 2, lo: 80, hi: 100, cargo: "a 4 kg weather satellite", world: "earth", intro: "Rocket 6 kg + satellite 4 kg = 10 kg. Weight = m·g. Choose the thrust so the net force F = T − W gives the right acceleration (a = F/m) to reach 80–100 m." }),
    L({ id: "a2", title: "Fixed Engine", g: 9.8, dryMass: 8, payload: { min: 0, max: 20, step: 1 }, thrust: { min: 300, max: 300, step: 10 }, burn: 2, lo: 70, hi: 90, cargo: "supply crates", world: "earth", intro: "This engine only has one setting: 300 N. Change the mass instead! How many kilograms of supplies can it lift to the 70–90 m ledge? More mass means less acceleration." }),
    L({ id: "a3", title: "Supply Drop", g: 9.8, dryMass: 8, payload: { min: 6, max: 20, step: 1 }, thrust: { min: 100, max: 500, step: 10 }, burn: 2, lo: 150, hi: 170, cargo: "rescue supplies", world: "earth", intro: "The rescue team needs at least 6 kg of supplies at 150–170 m. The engine tops out at 500 N. Balance thrust and mass." }),
  ],
  strategist: [
    L({ id: "h1", title: "Sounding Rocket", g: 9.8, dryMass: 20, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 2000, step: 1 }, burn: 4, lo: 545, hi: 555, cargo: "an air-sampling probe", world: "earth", intro: "m = 20 kg, burn time 4 s, g = 9.8 m/s². Target: 550 ± 5 m. Solve for the thrust before you launch (constant mass, no air resistance)." }),
    L({ id: "h2", title: "Heavy Lift", g: 9.8, dryMass: 150, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 15000, step: 1 }, burn: 5, lo: 1995, hi: 2005, cargo: "a research balloon module", world: "earth", intro: "m = 150 kg, burn time 5 s, g = 9.8 m/s². Target: 2000 ± 5 m. One newton off can matter, so compute it exactly." }),
    L({ id: "h3", title: "Lunar Hop", g: 1.62, dryMass: 40, payload: { min: 0, max: 0, step: 1 }, thrust: { min: 0, max: 1000, step: 1 }, burn: 5, lo: 295, hi: 305, cargo: "a survey lander", world: "moon", intro: "On the Moon g = 1.62 m/s². Lander m = 40 kg, burn time 5 s. Hop to 300 ± 5 m. Weaker gravity changes both the weight and the coast." }),
  ],
};

export function levelById(id: string): RocketLevel | undefined {
  return Object.values(ROCKET_LEVELS).flat().find((l) => l.id === id);
}

const fixed = (r: Range) => r.min === r.max;
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Snaps a value onto a range's steps (null if it isn't a usable number). */
export function snap(v: unknown, r: Range): number | null {
  if (fixed(r)) return r.min;
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return null;
  const c = Math.max(r.min, Math.min(r.max, n));
  return Math.round(Math.round((c - r.min) / r.step) * r.step + r.min);
}

export interface Flight {
  thrust: number;
  payload: number;
  mass: number;
  weight: number;
  net: number;
  /** Acceleration during the burn (0 if it never lifts off). */
  accel: number;
  /** Speed and height when the engine cuts off. */
  vBurnout: number;
  hBurn: number;
  hCoast: number;
  /** Peak height, rounded to 0.1 m. */
  peak: number;
  /** Seconds from launch to the top. */
  tPeak: number;
  liftoff: boolean;
  hit: boolean;
  verdict: "pad" | "low" | "hit" | "high";
}

/** Flies one launch (the settings are assumed already snapped). */
export function fly(level: RocketLevel, thrust: number, payload: number): Flight {
  const mass = level.dryMass + payload;
  const weight = mass * level.g;
  const net = thrust - weight;
  const liftoff = net > 0;
  const accel = liftoff ? net / mass : 0;
  const vBurnout = accel * level.burn;
  const hBurn = 0.5 * accel * level.burn ** 2;
  const hCoast = liftoff ? vBurnout ** 2 / (2 * level.g) : 0;
  const peak = r1(hBurn + hCoast);
  const hit = liftoff && peak >= level.lo && peak <= level.hi;
  return {
    thrust,
    payload,
    mass,
    weight,
    net,
    accel,
    vBurnout,
    hBurn,
    hCoast,
    peak,
    tPeak: liftoff ? level.burn + vBurnout / level.g : 0,
    liftoff,
    hit,
    verdict: !liftoff ? "pad" : hit ? "hit" : peak < level.lo ? "low" : "high",
  };
}

/** Thrust needed for a given peak height (solves a² + g·a − 2gh/t² = 0, then T = m(g + a)). */
export function thrustFor(level: RocketLevel, payload: number, height: number): number {
  const g = level.g;
  const t = level.burn;
  const a = (-g + Math.sqrt(g * g + (8 * g * height) / (t * t))) / 2;
  return (level.dryMass + payload) * (g + a);
}

export function starsFor(hitOnAttempt: number | null): number {
  if (hitOnAttempt === null) return 0;
  return hitOnAttempt === 1 ? 3 : hitOnAttempt === 2 ? 2 : hitOnAttempt <= MAX_ATTEMPTS ? 1 : 0;
}

/** Replays the kid's launches (untrusted): the first hit within 5 tries ends the mission. */
export function replay(level: RocketLevel, moves: unknown): { flights: (Flight | null)[]; hitOnAttempt: number | null; stars: number } {
  const list = Array.isArray(moves) ? moves.slice(0, MAX_ATTEMPTS) : [];
  const flights: (Flight | null)[] = [];
  let hitOnAttempt: number | null = null;
  for (const m of list) {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const thrust = snap(o.thrust, level.thrust);
    const payload = snap(o.payload, level.payload);
    const f = thrust === null || payload === null ? null : fly(level, thrust, payload);
    flights.push(f);
    if (f?.hit) {
      hitOnAttempt = flights.length;
      break;
    }
  }
  return { flights, hitOnAttempt, stars: starsFor(hitOnAttempt) };
}

/** A setting that hits the band (for tests and hints), or null. */
export function solve(level: RocketLevel): Launch | null {
  for (let p = level.payload.min; p <= level.payload.max; p += level.payload.step)
    for (let t = level.thrust.min; t <= level.thrust.max; t += level.thrust.step) if (fly(level, t, p).hit) return { thrust: t, payload: p };
  return null;
}

export const rocketLaunchInfo = { id: "rocket", title: "Rocket Launch", icon: "🚀", land: "science" as const, blurb: "Pick thrust and mass to reach the target height. Force, mass and acceleration in action." };

export const rocketLaunch: MiniGame = {
  ...rocketLaunchInfo,
  levels: (band) => (ROCKET_LEVELS[band] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      // "best": 5 for a first-try hit down to 1 for a fifth-try hit, 0 for no hit.
      return { stars: r.stars, best: r.hitOnAttempt ? MAX_ATTEMPTS + 1 - r.hitOnAttempt : 0 };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
