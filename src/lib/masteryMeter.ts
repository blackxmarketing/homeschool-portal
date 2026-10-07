import type { Probe } from "@/content/courses/types";

/**
 * The hidden mastery meter.
 *
 * A kid never sees this. It decides when they have actually got an idea and
 * can move on, instead of asking four familiar questions and taking 80%.
 *
 * An idea is mastered when all three are true:
 *   1. the estimate is at the bar (they get it right, unaided and promptly),
 *   2. they have shown it from several different angles, not the same shape
 *      of question over and over, and
 *   3. they have taught it back - caught the teacher's mistake and said why.
 *
 * Being shown the answer never counts as knowing it, and an idea left alone
 * for months fades until they confirm it again.
 */

/** Where the estimate has to get to. */
export const MASTERY_BAR = 0.85;

/** How many different angles an idea has to be shown from. */
export const MIN_ANGLES = 3;

/** Every estimate starts here, and fades back towards here. */
export const PRIOR = 0.3;

/** Days for the distance above the prior to halve, if an idea is never revisited. */
export const DECAY_HALFLIFE_DAYS = 45;

/** Taking this much longer than expected (or more) earns the least credit. */
const SLOW_RATIO = 2.5;
/** At or under this, speed costs nothing. */
const QUICK_RATIO = 0.8;
/** A correct but slow answer still counts for this much of the gain. */
const SLOWEST_CREDIT = 0.5;

const DAY_MS = 86_400_000;
const clamp01 = (v: number) => Math.min(0.99, Math.max(0.01, v));

/**
 * The angle a probe asks from, when the author hasn't named one. The probe's
 * shape is a decent stand-in: a kid who can compute it, place it on a line
 * and build the rule for it has genuinely shown it three ways.
 */
export const ANGLE_BY_TYPE: Record<Probe["type"], string> = {
  number: "symbolic",
  place: "visual",
  match: "match",
  build: "build-the-rule",
  target: "real-world",
  cloze: "explain",
  sort: "classify",
  sequence: "order",
  highlight: "spot",
};

export function angleOf(probe: Pick<Probe, "type"> & { angle?: string }): string {
  return probe.angle || ANGLE_BY_TYPE[probe.type] || "other";
}

/**
 * Which idea a probe is about.
 *
 * By default that is the lesson: a lesson teaches one idea and asks about it
 * several ways, and those ways are exactly the angles the meter wants. An
 * author who wants a lesson split into separate ideas names them with `tests`.
 */
export function conceptOf(lessonId: string, probe: { tests?: string } | undefined): string {
  return probe?.tests ? `${lessonId}#${probe.tests}` : lessonId;
}

/** How learning_events has always named a probe's slot. Kept for reading old rows back. */
export function legacyConcept(lessonId: string, slot: string): string {
  return `${lessonId}#${slot}`;
}

/** One answered question, as the meter sees it. */
export interface Evidence {
  concept: string;
  angle: string;
  /** Right in the end. */
  correct: boolean;
  /** Right on the very first try. */
  firstTry: boolean;
  /** How far up the coaching ladder they went: 0 none, 1 hint, 2 analogy, 3 example, 4 answer shown. */
  rung: number;
  ms: number;
  expectedMs: number;
  at: number;
}

export interface Meter {
  /** The estimate, 0-1. */
  p: number;
  /** Angles they have answered correctly without being shown the answer. */
  angles: string[];
  /** When this idea was last worked. */
  lastSeen: number;
  /** Whether they have taught it back. */
  taught: boolean;
}

export const emptyMeter = (): Meter => ({ p: PRIOR, angles: [], lastSeen: 0, taught: false });

/**
 * How much of the gain a given answer earns for its speed. Being quick is
 * worth full credit; being slow still counts for half, because taking your
 * time is not the same as not knowing it.
 */
export function speedCredit(ms: number, expectedMs: number): number {
  if (!(expectedMs > 0) || !(ms > 0)) return 1;
  const ratio = ms / expectedMs;
  if (ratio <= QUICK_RATIO) return 1;
  if (ratio >= SLOW_RATIO) return SLOWEST_CREDIT;
  return 1 - ((ratio - QUICK_RATIO) / (SLOW_RATIO - QUICK_RATIO)) * (1 - SLOWEST_CREDIT);
}

/**
 * How much of the gain survives the help they needed. A nudge costs little;
 * having the answer revealed is worth nothing, because it is not evidence.
 */
export function helpCredit(rung: number): number {
  if (rung >= 4) return 0;
  return [1, 0.6, 0.4, 0.25][Math.max(0, Math.round(rung))] ?? 0;
}

/** What the estimate fades to after a stretch of not touching the idea. */
export function decayed(p: number, lastSeen: number, now: number): number {
  if (!lastSeen || now <= lastSeen) return p;
  const days = (now - lastSeen) / DAY_MS;
  if (days < 1) return p;
  const keep = 0.5 ** (days / DECAY_HALFLIFE_DAYS);
  return clamp01(PRIOR + (p - PRIOR) * keep);
}

/** Folds one answer into the meter for its idea. */
export function applyEvidence(meter: Meter, e: Evidence): Meter {
  const p0 = decayed(meter.p, meter.lastSeen, e.at);
  const shown = e.rung >= 4;
  let p = p0;

  if (!e.correct) {
    p = p0 * 0.6;
  } else if (shown) {
    // They saw the answer. Not evidence either way, so the estimate holds.
    p = p0;
  } else {
    const base = e.firstTry ? 0.45 : 0.18;
    p = p0 + (1 - p0) * base * helpCredit(e.rung) * speedCredit(e.ms, e.expectedMs);
  }

  // An angle counts once they get it right without being handed the answer.
  const earned = e.correct && !shown;
  const angles = earned && !meter.angles.includes(e.angle) ? [...meter.angles, e.angle] : meter.angles;

  return { ...meter, p: clamp01(p), angles, lastSeen: Math.max(meter.lastSeen, e.at) };
}

/** Builds a meter per idea from a kid's answers. */
export function metersFrom(events: Evidence[], taught: Set<string> = new Set()): Map<string, Meter> {
  const out = new Map<string, Meter>();
  for (const e of [...events].sort((a, b) => a.at - b.at)) {
    out.set(e.concept, applyEvidence(out.get(e.concept) ?? emptyMeter(), e));
  }
  for (const [concept, m] of out) if (taught.has(concept)) out.set(concept, { ...m, taught: true });
  return out;
}

/** Everything standing between a kid and moving on. Empty means mastered. */
export function blockers(meter: Meter, now = Date.now()): string[] {
  const out: string[] = [];
  if (decayed(meter.p, meter.lastSeen, now) < MASTERY_BAR) out.push("estimate");
  if (meter.angles.length < MIN_ANGLES) out.push("angles");
  if (!meter.taught) out.push("teach-back");
  return out;
}

export function isMastered(meter: Meter, now = Date.now()): boolean {
  return blockers(meter, now).length === 0;
}

/** Angles this idea has not been shown from yet, so the next version can ask those. */
export function anglesWanted(meter: Meter, available: string[]): string[] {
  return available.filter((a) => !meter.angles.includes(a));
}

/**
 * Is the kid actually getting somewhere? Used to decide when to stop giving
 * them more of the same and drop to the gentler tier instead.
 */
export function climbing(history: number[], minGain = 0.05): boolean {
  if (history.length < 2) return true;
  const first = history[0];
  const last = history[history.length - 1];
  return last - first >= minGain;
}

/** A whole lesson is done when every idea in it is mastered. */
export function lessonMastered(meters: Meter[], now = Date.now()): boolean {
  return meters.length > 0 && meters.every((m) => isMastered(m, now));
}
