import { Grid, shade } from "./grid";

/** How a kid's hero looks. Saved per kid; every choice is a small id. */
export interface Hero {
  skin: number;
  hair: HairStyle;
  hairColor: number;
  outfit: number;
  hat: HatId;
  pet: PetId;
}

export const SKINS = ["#f6d3b3", "#eebf98", "#d9a274", "#b97f52", "#8d5a37", "#5e3b24"];
export const HAIR_COLORS = ["#2b1d14", "#5a3a22", "#9a5b2a", "#d8a23a", "#f2d27a", "#c0392b", "#e8e2d8", "#3b3b6d",
  // Unlocked in the K-5 worlds (lib/pixel/cosmetics.ts)
  "#ff8fab", "#38d9a9", "#ced4da"];
export const OUTFITS = ["#2340ff", "#e0453a", "#22a35a", "#f2a516", "#8e44ad", "#16a3b8", "#ec6aa0", "#3d4a5c",
  // Unlocked in the K-5 worlds (lib/pixel/cosmetics.ts)
  "#ffd43b", "#ff8fab", "#2b8a3e", "#c2255c", "#0ca678", "#ff922b", "#74c0fc", "#b197fc", "#c92a2a", "#e9c46a", "#1c2541", "#63e6be"];
/** Colors and styles everyone starts with; the rest are unlocked. */
export const STARTER_OUTFITS = 8;
export const STARTER_HAIR_COLORS = 8;
export const HAIRS = ["short", "spiky", "long", "bun", "curly", "bob", "braids", "ponytail", "swoop"] as const;
export const STARTER_HAIRS: string[] = ["short", "spiky", "long", "bun", "curly", "bob"];
export type HairStyle = (typeof HAIRS)[number];
export const HATS = ["none", "cap", "bandana", "beanie", "wizard", "crown", "helmet", "explorer",
  "flower", "sunhat", "leafcrown", "acorn", "straw", "sailor", "aviator", "propeller", "cowboy", "miner", "earmuffs", "starcrown"] as const;
export type HatId = (typeof HATS)[number];
export const PETS = ["none", "cat", "dog", "fox", "owl", "bunny", "dragon",
  "duckling", "lamb", "hedgehog", "squirrel", "frog", "turtle", "bluebird", "cloudpup", "lizard", "eagle", "penguin", "snowfox"] as const;
export type PetId = (typeof PETS)[number];

/** Free from the start; the rest come from the shop (Phase B). */
export const STARTER_HATS: HatId[] = ["none", "cap", "bandana", "beanie"];
export const STARTER_PETS: PetId[] = ["none", "cat", "dog"];

export const DEFAULT_HERO: Hero = { skin: 1, hair: "short", hairColor: 1, outfit: 0, hat: "none", pet: "none" };

const OUTLINE = "#1b1530";

/** Accepts anything and returns a valid hero (bad or missing parts fall back to defaults). */
export function cleanHero(raw: unknown): Hero {
  const r = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const idx = (v: unknown, n: number, d: number) => (Number.isInteger(v) && (v as number) >= 0 && (v as number) < n ? (v as number) : d);
  const pick = <T extends string>(v: unknown, list: readonly T[], d: T): T => (list.includes(v as T) ? (v as T) : d);
  return {
    skin: idx(r.skin, SKINS.length, DEFAULT_HERO.skin),
    hair: pick(r.hair, HAIRS, DEFAULT_HERO.hair),
    hairColor: idx(r.hairColor, HAIR_COLORS.length, DEFAULT_HERO.hairColor),
    outfit: idx(r.outfit, OUTFITS.length, DEFAULT_HERO.outfit),
    hat: pick(r.hat, HATS, DEFAULT_HERO.hat),
    pet: pick(r.pet, PETS, DEFAULT_HERO.pet),
  };
}

function drawHair(g: Grid, style: HairStyle, c: string) {
  const d = shade(c, -0.25);
  switch (style) {
    case "short":
      g.rect(4, 2, 8, 2, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c).rect(5, 4, 3, 1, c);
      break;
    case "spiky":
      g.rect(4, 3, 8, 1, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c);
      for (const x of [4, 6, 8, 10]) g.rect(x, 1, 2, 2, c);
      g.rect(6, 4, 2, 1, c);
      break;
    case "long":
      g.rect(4, 2, 8, 2, c).rect(3, 4, 2, 7, c).rect(11, 4, 2, 7, c).rect(5, 4, 2, 1, c).rect(9, 4, 2, 1, c);
      g.rect(3, 9, 2, 2, d).rect(11, 9, 2, 2, d);
      break;
    case "bun":
      g.rect(4, 2, 8, 2, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c).rect(6, 0, 4, 2, c).rect(5, 4, 2, 1, c);
      break;
    case "curly":
      for (const [x, y] of [[4, 2], [6, 1], [8, 1], [10, 2], [3, 4], [12, 4], [3, 6], [12, 6]] as const) g.rect(x, y, 2, 2, c);
      g.rect(5, 2, 6, 2, c).rect(5, 4, 2, 1, d).rect(9, 4, 2, 1, d);
      break;
    case "bob":
      g.rect(4, 2, 8, 2, c).rect(3, 4, 2, 5, c).rect(11, 4, 2, 5, c).rect(5, 4, 6, 1, c);
      break;
    case "braids":
      g.rect(4, 2, 8, 2, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c).rect(5, 4, 6, 1, c);
      g.rect(3, 6, 1, 6, c).rect(12, 6, 1, 6, c).set(3, 8, d).set(3, 10, d).set(12, 8, d).set(12, 10, d).set(3, 12, "#ec6aa0").set(12, 12, "#ec6aa0");
      break;
    case "ponytail":
      g.rect(4, 2, 8, 2, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c).rect(5, 4, 4, 1, c).rect(12, 3, 2, 2, c).rect(13, 5, 2, 4, c).set(14, 8, d).set(12, 3, "#e0453a");
      break;
    case "swoop":
      g.rect(4, 2, 8, 2, c).rect(4, 4, 1, 2, c).rect(11, 4, 1, 2, c).rect(4, 4, 5, 1, c).rect(3, 3, 2, 1, c).set(5, 1, c).set(6, 1, c).set(7, 1, d);
      break;
  }
}

function drawHat(g: Grid, hat: HatId, outfit: string) {
  switch (hat) {
    case "cap":
      g.rect(4, 1, 8, 2, outfit).rect(10, 3, 3, 1, shade(outfit, -0.3)).rect(7, 1, 2, 1, "#ffffff");
      break;
    case "bandana":
      g.rect(4, 2, 8, 2, "#d0312d").rect(3, 3, 1, 3, "#d0312d").rect(6, 2, 1, 1, "#ffffff").rect(9, 3, 1, 1, "#ffffff");
      break;
    case "beanie":
      g.rect(4, 1, 8, 3, "#f2a516").rect(4, 3, 8, 1, shade("#f2a516", -0.3)).rect(7, 0, 2, 1, "#ffffff");
      break;
    case "wizard":
      g.tri(8, -3, 2, 5, "#5b3fd1").rect(3, 2, 10, 1, "#5b3fd1").set(7, 0, "#f9d65c").set(9, 1, "#f9d65c");
      break;
    case "crown":
      g.rect(5, 1, 6, 2, "#f6c90e").set(5, 0, "#f6c90e").set(8, 0, "#f6c90e").set(10, 0, "#f6c90e").set(7, 1, "#e0453a");
      break;
    case "helmet":
      g.rect(4, 1, 8, 3, "#aab4c3").rect(4, 3, 8, 1, "#7b8798").rect(7, 0, 2, 1, "#e0453a");
      break;
    case "explorer":
      g.rect(2, 2, 12, 1, "#a8743a").rect(4, 0, 8, 2, "#c8915a").rect(4, 1, 8, 1, "#7a4f22");
      break;
    case "flower":
      g.rect(4, 2, 8, 1, "#2f9e44").rect(4, 1, 2, 1, "#ff8fab").rect(7, 1, 2, 1, "#ffd43b").rect(10, 1, 2, 1, "#ff8fab").set(8, 0, "#ffffff");
      break;
    case "sunhat":
      g.rect(2, 3, 12, 1, "#e9c46a").rect(5, 1, 6, 2, "#f4d58d").rect(5, 2, 6, 1, "#ff8fab");
      break;
    case "leafcrown":
      g.rect(4, 2, 8, 1, "#2b8a3e").set(5, 1, "#51cf66").set(8, 1, "#51cf66").set(11, 1, "#51cf66").set(4, 1, "#51cf66").set(9, 0, "#51cf66");
      break;
    case "acorn":
      g.rect(4, 1, 8, 3, "#8b5a2b").rect(4, 1, 8, 1, "#a47148").set(6, 2, "#a47148").set(9, 2, "#a47148").set(8, 0, "#5c3d1e");
      break;
    case "straw":
      g.rect(2, 3, 12, 1, "#e0b84f").rect(4, 1, 8, 2, "#f0cf6a").rect(4, 2, 8, 1, "#c92a2a");
      break;
    case "sailor":
      g.rect(4, 1, 8, 2, "#ffffff").rect(4, 3, 8, 1, "#1c2541").set(8, 1, "#1c7ed6");
      break;
    case "aviator":
      g.rect(4, 1, 8, 3, "#8b5a2b").rect(4, 1, 8, 1, "#a47148").rect(5, 3, 2, 1, "#74c0fc").rect(9, 3, 2, 1, "#74c0fc").rect(7, 3, 2, 1, "#5c3d1e");
      break;
    case "propeller":
      g.rect(4, 1, 8, 3, "#e03131").rect(4, 2, 8, 1, "#ffd43b").rect(5, 0, 7, 1, "#1c7ed6").set(8, 0, "#ffffff");
      break;
    case "cowboy":
      g.rect(2, 3, 12, 1, "#8b5a2b").rect(5, 0, 6, 3, "#a0522d").rect(5, 2, 6, 1, "#5c3d1e").set(7, 0, "#8b5a2b").set(8, 0, "#8b5a2b");
      break;
    case "miner":
      g.rect(4, 1, 8, 3, "#ffd43b").rect(4, 3, 8, 1, "#e0a800").rect(7, 1, 2, 1, "#fff3bf").set(7, 2, "#ffffff");
      break;
    case "earmuffs":
      g.rect(4, 1, 8, 1, "#adb5bd").rect(3, 2, 1, 2, "#adb5bd").rect(12, 2, 1, 2, "#adb5bd").rect(2, 4, 3, 3, "#ff8fab").rect(11, 4, 3, 3, "#ff8fab");
      break;
    case "starcrown":
      g.rect(5, 1, 6, 2, "#74c0fc").set(5, 0, "#ffd43b").set(8, 0, "#ffd43b").set(10, 0, "#ffd43b").set(8, 1, "#ffffff").set(6, 2, "#ffffff");
      break;
    default:
      break;
  }
}

/**
 * The hero, front-facing, 16x18 pixels. `frame` 0/1 swaps the legs for a
 * walking animation.
 */
export function heroGrid(h: Hero, frame = 0): Grid {
  const g = new Grid(16, 18);
  const skin = SKINS[h.skin];
  const hair = HAIR_COLORS[h.hairColor];
  const outfit = OUTFITS[h.outfit];
  const pants = shade(outfit, -0.45);
  // Long hair falls behind the head, so draw it first.
  if (h.hair === "long" || h.hair === "bob") drawHair(g, h.hair, hair);
  // Head
  g.rect(4, 3, 8, 7, skin).rect(5, 9, 6, 1, shade(skin, -0.12));
  g.rect(6, 6, 1, 2, OUTLINE).rect(9, 6, 1, 2, OUTLINE).set(6, 6, "#ffffff").set(9, 6, "#ffffff");
  g.set(5, 8, shade(skin, -0.15)).set(10, 8, shade(skin, -0.15)).rect(7, 8, 2, 1, shade(skin, -0.3));
  if (h.hair !== "long" && h.hair !== "bob") drawHair(g, h.hair, hair);
  else g.rect(4, 2, 8, 2, hair);
  // Body and arms
  g.rect(5, 10, 6, 4, outfit).rect(5, 10, 6, 1, shade(outfit, 0.2)).rect(7, 11, 2, 2, shade(outfit, -0.15));
  g.rect(3, 10, 2, 3, outfit).rect(11, 10, 2, 3, outfit).rect(3, 13, 2, 1, skin).rect(11, 13, 2, 1, skin);
  // Legs (walk cycle)
  if (frame === 0) g.rect(5, 14, 2, 2, pants).rect(9, 14, 2, 2, pants).rect(5, 16, 2, 1, "#3a2a1e").rect(9, 16, 2, 1, "#3a2a1e");
  else g.rect(5, 14, 2, 1, pants).rect(9, 14, 2, 2, pants).rect(5, 15, 2, 1, "#3a2a1e").rect(9, 16, 2, 1, "#3a2a1e");
  drawHat(g, h.hat, outfit);
  return g.outline(OUTLINE);
}

/** The companion pet, 10x10 pixels. */
export function petGrid(pet: PetId, frame = 0): Grid | null {
  if (pet === "none") return null;
  const g = new Grid(10, 10);
  const bob = frame;
  const body = (c: string) => g.rect(2, 4 + bob, 6, 4, c).rect(3, 3 + bob, 4, 1, c);
  switch (pet) {
    case "cat":
      body("#f2a516");
      g.set(2, 2 + bob, "#f2a516").set(7, 2 + bob, "#f2a516").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530").rect(8, 5 + bob, 1, 2, "#f2a516");
      break;
    case "dog":
      body("#b07a4a");
      g.rect(1, 3 + bob, 1, 3, "#7a4f22").rect(8, 3 + bob, 1, 3, "#7a4f22").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530").set(5, 6 + bob, "#1b1530");
      break;
    case "fox":
      body("#e8692a");
      g.set(2, 2 + bob, "#e8692a").set(7, 2 + bob, "#e8692a").rect(3, 6 + bob, 4, 2, "#ffffff").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530");
      break;
    case "owl":
      body("#8a6a4a");
      g.rect(3, 4 + bob, 2, 2, "#f6e7b0").rect(5, 4 + bob, 2, 2, "#f6e7b0").set(4, 5 + bob, "#1b1530").set(5, 5 + bob, "#1b1530").set(5, 6 + bob, "#f2a516");
      break;
    case "bunny":
      body("#f4f1ec");
      g.rect(3, 0 + bob, 1, 3, "#f4f1ec").rect(6, 0 + bob, 1, 3, "#f4f1ec").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530").set(5, 6 + bob, "#ec6aa0");
      break;
    case "duckling":
      g.rect(2, 5 + bob, 6, 3, "#ffd43b").rect(5, 2 + bob, 3, 3, "#ffd43b").rect(8, 3 + bob, 2, 1, "#ff922b").set(6, 3 + bob, "#1b1530").set(2, 4 + bob, "#ffd43b");
      break;
    case "lamb":
      body("#f1f3f5");
      g.rect(2, 3 + bob, 6, 1, "#ffffff").rect(6, 3 + bob, 3, 3, "#495057").set(7, 4 + bob, "#ffffff").rect(3, 8 + bob, 1, 1, "#495057").rect(6, 8 + bob, 1, 1, "#495057");
      break;
    case "hedgehog":
      body("#8b5a2b");
      g.rect(2, 3 + bob, 5, 1, "#5c3d1e").set(1, 4 + bob, "#5c3d1e").set(3, 2 + bob, "#5c3d1e").set(5, 2 + bob, "#5c3d1e").rect(7, 5 + bob, 2, 2, "#e9c9a0").set(9, 6 + bob, "#1b1530").set(7, 5 + bob, "#1b1530");
      break;
    case "squirrel":
      body("#c87533");
      g.rect(0, 1 + bob, 2, 6, "#e8a15d").set(1, 0 + bob, "#e8a15d").set(5, 2 + bob, "#c87533").set(6, 5 + bob, "#1b1530").rect(4, 6 + bob, 3, 1, "#f2d2a9");
      break;
    case "frog":
      body("#51cf66");
      g.rect(2, 2 + bob, 2, 2, "#51cf66").rect(6, 2 + bob, 2, 2, "#51cf66").set(3, 2 + bob, "#1b1530").set(6, 2 + bob, "#1b1530").rect(3, 6 + bob, 4, 1, "#2b8a3e");
      break;
    case "turtle":
      g.disc(4.5, 5.5 + bob, 3, "#2b8a3e").set(3, 4 + bob, "#94d82d").set(5, 6 + bob, "#94d82d").rect(8, 5 + bob, 2, 2, "#94d82d").set(9, 5 + bob, "#1b1530").rect(2, 8 + bob, 1, 1, "#94d82d").rect(6, 8 + bob, 1, 1, "#94d82d");
      break;
    case "bluebird":
      body("#339af0");
      g.rect(3, 6 + bob, 4, 2, "#ffa94d").set(8, 4 + bob, "#f2a516").set(6, 4 + bob, "#1b1530").rect(0, 5 + bob, 2, 1, "#1c7ed6");
      break;
    case "cloudpup":
      body("#f1f3f5");
      g.rect(1, 3 + bob, 1, 3, "#a5d8ff").rect(8, 3 + bob, 1, 3, "#a5d8ff").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530").set(5, 6 + bob, "#74c0fc");
      break;
    case "lizard":
      g.rect(2, 6 + bob, 6, 2, "#94d82d").rect(7, 5 + bob, 3, 2, "#94d82d").rect(0, 7 + bob, 2, 1, "#94d82d").set(8, 5 + bob, "#1b1530").set(3, 8 + bob, "#5c940d").set(6, 8 + bob, "#5c940d").set(4, 6 + bob, "#c0eb75");
      break;
    case "eagle":
      body("#5c3d1e");
      g.rect(4, 2 + bob, 4, 3, "#ffffff").set(8, 4 + bob, "#f2a516").set(6, 3 + bob, "#1b1530").rect(0, 4 + bob, 2, 3, "#5c3d1e").rect(8, 6 + bob, 2, 2, "#5c3d1e");
      break;
    case "penguin":
      body("#212529");
      g.rect(3, 5 + bob, 4, 3, "#f8f9fa").set(4, 4 + bob, "#f8f9fa").set(5, 4 + bob, "#1b1530").set(5, 5 + bob, "#ff922b").rect(3, 8 + bob, 1, 1, "#ff922b").rect(6, 8 + bob, 1, 1, "#ff922b");
      break;
    case "snowfox":
      body("#f8f9fa");
      g.set(2, 2 + bob, "#f8f9fa").set(7, 2 + bob, "#f8f9fa").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530").set(5, 6 + bob, "#1b1530").rect(8, 6 + bob, 2, 2, "#e9ecef");
      break;
    case "dragon":
      body("#22a35a");
      g.set(2, 2 + bob, "#f6c90e").set(7, 2 + bob, "#f6c90e").rect(0, 4 + bob, 2, 2, "#16a3b8").rect(8, 4 + bob, 2, 2, "#16a3b8").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530");
      break;
  }
  return g.outline(OUTLINE);
}
