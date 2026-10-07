import { seededRng, int, pick, shuffle, dec, fmt, type Rng } from "./curriculum/math";

/**
 * Lesson and game variations: a kid who does not master something gets a
 * genuinely different version of it next time, not the same questions again.
 *
 * Every version is built from a numbered seed, so version 3 is always the same
 * version 3: the browser and the server generate identical content without
 * sending it over the wire, and parents can read every version a kid might get.
 *
 * The seed includes the kid's id, so two kids working the same lesson get
 * different numbers and characters and can't trade answers.
 */

export { seededRng, int, pick, shuffle, dec, fmt };
export type { Rng };

/** Versions of each lesson and level before they start over. See docs: eight covers the kids who retry most. */
export const VARIANT_COUNT = 8;

/** Versions without the mastery meter moving before we drop to the easier tier. */
export const EASIER_AFTER = 3;

/** A variant is either the normal difficulty or a deliberately gentler run of the same idea. */
export type Tier = "standard" | "easier";

/** Turns any string into a stable 32-bit seed (FNV-1a style, same mixing as the shuffles below). */
export function hashSeed(s: string): number {
  return [...s].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 2166136261);
}

/**
 * The seed for one version of one piece of content, for one kid.
 * `contentId` is a lesson id, a level id, or either plus a suffix like ":m2".
 */
export function variantSeed(kidId: number, contentId: string, index: number): number {
  return hashSeed(`${kidId}:${contentId}:${index}`);
}

/** The random number generator for one version. */
export function variantRng(kidId: number, contentId: string, index: number): Rng {
  return seededRng(variantSeed(kidId, contentId, index));
}

/**
 * Which version comes next. A kid who mastered it keeps the version they beat
 * (replaying a 3-star level should feel the same); everyone else moves on.
 */
export function nextVariant(current: number, mastered: boolean, count = VARIANT_COUNT): number {
  if (mastered) return current;
  return (current + 1) % count;
}

/**
 * How hard this attempt should be. After a few versions with the meter not
 * climbing, the same idea comes back gentler rather than just different.
 */
export function tierFor(attempts: number, climbing: boolean): Tier {
  return !climbing && attempts >= EASIER_AFTER ? "easier" : "standard";
}

/**
 * A seeded shuffle of `n` items, never leaving them in their original order.
 * Shared by the probe and widget views so a question looks the same on reload.
 */
export function seededOrder(n: number, seed: string): number[] {
  let h = hashSeed(seed);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  // Never show a sequence already in order.
  if (n > 1 && idx.every((v, i) => v === i)) [idx[0], idx[1]] = [idx[1], idx[0]];
  return idx;
}
