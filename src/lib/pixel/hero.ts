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
export const HAIR_COLORS = ["#2b1d14", "#5a3a22", "#9a5b2a", "#d8a23a", "#f2d27a", "#c0392b", "#e8e2d8", "#3b3b6d"];
export const OUTFITS = ["#2340ff", "#e0453a", "#22a35a", "#f2a516", "#8e44ad", "#16a3b8", "#ec6aa0", "#3d4a5c"];
export const HAIRS = ["short", "spiky", "long", "bun", "curly", "bob"] as const;
export type HairStyle = (typeof HAIRS)[number];
export const HATS = ["none", "cap", "bandana", "beanie", "wizard", "crown", "helmet", "explorer"] as const;
export type HatId = (typeof HATS)[number];
export const PETS = ["none", "cat", "dog", "fox", "owl", "bunny", "dragon"] as const;
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
    case "dragon":
      body("#22a35a");
      g.set(2, 2 + bob, "#f6c90e").set(7, 2 + bob, "#f6c90e").rect(0, 4 + bob, 2, 2, "#16a3b8").rect(8, 4 + bob, 2, 2, "#16a3b8").set(4, 5 + bob, "#1b1530").set(6, 5 + bob, "#1b1530");
      break;
  }
  return g.outline(OUTLINE);
}
