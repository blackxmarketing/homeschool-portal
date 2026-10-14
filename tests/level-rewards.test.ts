import { describe, expect, it } from "vitest";
import { LEVEL_REWARDS, levelInfo, rankFor, rewardsBetween, xpForLevel } from "@/lib/game";
import { isUnlockId, unlockName } from "@/lib/pixel/cosmetics";
import { STARTER_HAIRS, STARTER_HATS, STARTER_OUTFITS, STARTER_HAIR_COLORS, STARTER_PETS } from "@/lib/pixel/hero";

/**
 * Levels and ranks were already there and nothing happened at one. These hold
 * the part that was missing: that reaching a level hands over something real,
 * and that what it hands over is a thing the hero creator will actually show.
 */

describe("what a level gives", () => {
  it("names only unlocks the hero creator knows", () => {
    for (const [level, ids] of Object.entries(LEVEL_REWARDS)) {
      for (const id of ids) {
        expect(isUnlockId(id), `level ${level} gives "${id}", which is not a real unlock`).toBe(true);
        expect(unlockName(id), `level ${level}: "${id}" has no readable name`).toBeTruthy();
      }
    }
  });

  it("never gives them something they already start with", () => {
    const starters = new Set([
      ...STARTER_PETS.map((p) => `pet:${p}`),
      ...STARTER_HATS.map((h) => `hat:${h}`),
      ...STARTER_HAIRS.map((h) => `hair:${h}`),
      ...Array.from({ length: STARTER_OUTFITS }, (_, i) => `outfit:${i}`),
      ...Array.from({ length: STARTER_HAIR_COLORS }, (_, i) => `hairColor:${i}`),
    ]);
    for (const [level, ids] of Object.entries(LEVEL_REWARDS)) {
      for (const id of ids) expect(starters.has(id), `level ${level} gives "${id}", which they already have`).toBe(false);
    }
  });

  it("never gives the same thing twice", () => {
    const all = Object.values(LEVEL_REWARDS).flat();
    expect(new Set(all).size, "two levels give the same unlock").toBe(all.length);
  });

  it("has something at every level a kid can reach", () => {
    // All the XP in every game is a few thousand, which lands in the teens.
    for (let l = 2; l <= 15; l++) expect(LEVEL_REWARDS[l]?.length, `nothing happens at level ${l}`).toBeGreaterThan(0);
  });

  it("hands over everything when several levels go at once", () => {
    // A kid who banks a lot in one run should not be short-changed.
    expect(rewardsBetween(1, 4)).toEqual([...LEVEL_REWARDS[2], ...LEVEL_REWARDS[3], ...LEVEL_REWARDS[4]]);
    // Standing still gives nothing.
    expect(rewardsBetween(5, 5)).toEqual([]);
    expect(rewardsBetween(6, 3)).toEqual([]);
  });

  it("gives nothing for a level nobody has defined, rather than breaking", () => {
    expect(rewardsBetween(90, 95)).toEqual([]);
  });
});

describe("the ladder it hangs on", () => {
  it("climbs, and a rank comes with every level", () => {
    let last = -1;
    for (let l = 1; l <= 20; l++) {
      const at = xpForLevel(l);
      expect(at, `level ${l} is not above level ${l - 1}`).toBeGreaterThan(last);
      last = at;
      expect(rankFor(l).title).toBeTruthy();
    }
  });

  it("works out the level from the XP either side of a boundary", () => {
    for (let l = 2; l <= 12; l++) {
      expect(levelInfo(xpForLevel(l)).level, `${xpForLevel(l)} XP should be level ${l}`).toBe(l);
      expect(levelInfo(xpForLevel(l) - 1).level, `one XP short should still be level ${l - 1}`).toBe(l - 1);
    }
  });
});
