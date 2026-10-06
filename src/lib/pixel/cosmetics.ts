import { HAIR_COLORS, HAIRS, HATS, OUTFITS, PETS, STARTER_HAIR_COLORS, STARTER_HAIRS, STARTER_HATS, STARTER_OUTFITS, STARTER_PETS, type Hero } from "./hero";

/**
 * Hero styles that are unlocked by playing (docs/WORLDS.md). An unlock id is
 * "<kind>:<value>", e.g. "pet:duckling", "hat:flower", "outfit:8",
 * "hairColor:9", "hair:braids". The hero stays the same; the kid just gets
 * more to choose from.
 */

export type CosmeticKind = "outfit" | "hairColor" | "hair" | "hat" | "pet";

export const HAT_NAMES: Record<string, string> = {
  none: "No hat", cap: "Cap", bandana: "Bandana", beanie: "Beanie", wizard: "Wizard hat", crown: "Crown", helmet: "Knight helmet", explorer: "Explorer hat",
  flower: "Flower crown", sunhat: "Sun hat", leafcrown: "Leaf crown", acorn: "Acorn cap", straw: "Straw hat", sailor: "Sailor cap",
  aviator: "Aviator cap", propeller: "Propeller cap", cowboy: "Cowboy hat", miner: "Miner's helmet", earmuffs: "Earmuffs", starcrown: "Star crown",
};

export const PET_NAMES: Record<string, string> = {
  none: "No pet", cat: "Cat", dog: "Pup", fox: "Fox", owl: "Owl", bunny: "Bunny", dragon: "Baby dragon",
  duckling: "Duckling", lamb: "Lamb", hedgehog: "Hedgehog", squirrel: "Squirrel", frog: "Frog", turtle: "Turtle",
  bluebird: "Bluebird", cloudpup: "Cloud pup", lizard: "Lizard", eagle: "Eagle", penguin: "Penguin", snowfox: "Snow fox",
};

export const HAIR_NAMES: Record<string, string> = { braids: "Braids", ponytail: "Ponytail", swoop: "Swoop" };

/** A readable name for an unlock id. */
export function unlockName(id: string): string {
  const [kind, value] = id.split(":");
  switch (kind) {
    case "pet":
      return `${PET_NAMES[value] ?? value} companion`;
    case "hat":
      return HAT_NAMES[value] ?? value;
    case "hair":
      return `${HAIR_NAMES[value] ?? value} hair`;
    case "hairColor":
      return "New hair color";
    case "outfit":
      return "New outfit color";
    default:
      return id;
  }
}

/** Every valid unlock id. */
export function isUnlockId(id: string): boolean {
  const [kind, value] = id.split(":");
  const n = Number(value);
  switch (kind) {
    case "pet":
      return (PETS as readonly string[]).includes(value);
    case "hat":
      return (HATS as readonly string[]).includes(value);
    case "hair":
      return (HAIRS as readonly string[]).includes(value);
    case "hairColor":
      return Number.isInteger(n) && n >= 0 && n < HAIR_COLORS.length;
    case "outfit":
      return Number.isInteger(n) && n >= 0 && n < OUTFITS.length;
    default:
      return false;
  }
}

/** What a kid can wear: the starter set plus their unlocks. */
export function ownsPart(unlocks: Set<string>, kind: CosmeticKind, value: string | number): boolean {
  switch (kind) {
    case "outfit":
      return Number(value) < STARTER_OUTFITS || unlocks.has(`outfit:${value}`);
    case "hairColor":
      return Number(value) < STARTER_HAIR_COLORS || unlocks.has(`hairColor:${value}`);
    case "hair":
      return STARTER_HAIRS.includes(String(value)) || unlocks.has(`hair:${value}`);
    case "hat":
      return (STARTER_HATS as string[]).includes(String(value)) || unlocks.has(`hat:${value}`);
    case "pet":
      return (STARTER_PETS as string[]).includes(String(value)) || unlocks.has(`pet:${value}`);
  }
}

/** Swaps anything the kid hasn't unlocked for what they had before (or the default). */
export function onlyOwned(hero: Hero, unlocks: Set<string>, fallback: Hero): Hero {
  return {
    skin: hero.skin,
    hair: ownsPart(unlocks, "hair", hero.hair) ? hero.hair : fallback.hair,
    hairColor: ownsPart(unlocks, "hairColor", hero.hairColor) ? hero.hairColor : fallback.hairColor,
    outfit: ownsPart(unlocks, "outfit", hero.outfit) ? hero.outfit : fallback.outfit,
    hat: ownsPart(unlocks, "hat", hero.hat) ? hero.hat : fallback.hat,
    pet: ownsPart(unlocks, "pet", hero.pet) ? hero.pet : fallback.pet,
  };
}
