import { Grid, hexToRgb, shade } from "./grid";
import { HAIR_COLORS, OUTFITS, SKINS, heroGrid, type HairStyle, type HatId, type Hero } from "./hero";
import type { AvatarLook } from "@/content/avatars";

/**
 * The teacher as a pixel character.
 *
 * Two sizes, same face: a head-and-shoulders bust for places that just need a
 * portrait, and a full body that stands on the slide and walks about while it
 * teaches. The kid's hero is 16x18 with a two-pixel mouth, which is right for
 * walking a map and useless for standing at the front of a class, so the
 * teacher gets its own drawing.
 *
 * Everything comes from the AvatarLook the teachers already have
 * (src/content/avatars.ts), so beards, glasses and hats carry over.
 */

const OUTLINE = "#1b1530";

/** How open the mouth is. Three shapes is plenty to read as talking. */
export type Viseme = "closed" | "open" | "wide";

export interface TeacherPose {
  mouth: Viseme;
  /** Eyes shut, for a blink. */
  blink?: boolean;
  /** "point" lifts the near arm towards the board. */
  arm?: "rest" | "point";
  mood?: "neutral" | "happy" | "thinking";
  /** Which way they face. Only the full body uses this. */
  facing?: "left" | "right";
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Rows inside the head, so the face parts never land on top of each other. */
const FACE = { brow: 4, eye: 5, nose: 8, mouth: 10, jaw: 12 };

const BUST = { w: 24, h: 30 };
const BUST_HEAD: Box = { x: 5, y: 6, w: 14, h: 14 };


function drawHair(g: Grid, look: AvatarLook, head: Box, behind: boolean): void {
  const c = look.hairColor;
  const d = shade(c, -0.25);
  const { x, y, w } = head;
  if (behind) {
    if (look.hair === "long") g.rect(x - 1, y + 1, w + 2, 16, c).rect(x - 1, y + 11, 2, 5, d).rect(x + w - 1, y + 11, 2, 5, d);
    if (look.hair === "ponytail") g.rect(x + w - 1, y + 3, 3, 9, c).rect(x + w, y + 10, 2, 3, d);
    return;
  }
  switch (look.hair) {
    case "bald":
      g.rect(x + 3, y, 6, 1, shade(look.skin, 0.18));
      break;
    case "short":
      g.rect(x, y - 1, w, 3, c).rect(x, y + 2, 2, 3, c).rect(x + w - 2, y + 2, 2, 3, c).rect(x + 2, y + 2, 4, 1, d);
      break;
    case "wavy":
      g.rect(x, y - 1, w, 3, c).rect(x, y + 2, 2, 4, c).rect(x + w - 2, y + 2, 2, 4, c);
      for (let i = 0; i < w; i += 4) g.rect(x + i, y + 2, 2, 1, d);
      break;
    case "curly":
      g.rect(x, y, w, 2, c);
      for (let i = 0; i < w; i += 3) g.disc(x + i + 1, y, 1.6, c);
      g.rect(x - 1, y + 2, 3, 4, c).rect(x + w - 2, y + 2, 3, 4, c).rect(x + 3, y + 1, 3, 1, d);
      break;
    case "bun":
      g.rect(x, y - 1, w, 3, c).rect(x, y + 2, 2, 3, c).rect(x + w - 2, y + 2, 2, 3, c);
      g.disc(x + w / 2, y - 3, 2.4, c).disc(x + w / 2 - 1, y - 4, 1, shade(c, 0.2));
      break;
    case "ponytail":
      g.rect(x, y - 1, w, 3, c).rect(x, y + 2, 2, 3, c).rect(x + w - 2, y + 2, 2, 3, c).rect(x + 2, y + 2, 4, 1, d);
      break;
    case "long":
      g.rect(x, y - 1, w, 3, c).rect(x + 2, y + 2, 4, 1, d);
      break;
  }
}

function drawHat(g: Grid, look: AvatarLook, head: Box): void {
  const { x, y, w } = head;
  const band = look.outfit;
  // Everything here lives in the rows above the head.
  switch (look.hat) {
    case "tophat":
      g.rect(x - 2, y - 2, w + 4, 2, "#241f33").rect(x + 2, y - 6, w - 4, 4, "#241f33").rect(x + 2, y - 3, w - 4, 1, band);
      break;
    case "captain":
      g.rect(x - 2, y - 2, w + 4, 2, "#1f2a44").rect(x + 2, y - 5, w - 4, 3, "#1f2a44").rect(x + 2, y - 3, w - 4, 1, "#f5d76e");
      g.rect(x + 6, y - 5, 2, 2, "#f5d76e");
      break;
    case "laurel":
      g.rect(x - 1, y + 2, 2, 2, "#2b8a3e").rect(x + w - 1, y + 2, 2, 2, "#2b8a3e");
      for (let i = 1; i < w - 1; i += 3) g.disc(x + i, y - 1, 1.3, "#40c057");
      break;
    case "cap":
      g.rect(x, y - 4, w, 4, band).rect(x - 3, y - 1, 7, 2, shade(band, -0.25)).rect(x + 3, y - 5, w - 6, 1, band);
      break;
    case "beret":
      g.rect(x + 1, y - 4, w - 2, 4, band).disc(x + 3, y - 3, 1.6, shade(band, 0.18)).rect(x + w - 4, y - 5, 2, 1, shade(band, -0.3));
      break;
  }
}

function drawBeard(g: Grid, look: AvatarLook, head: Box): void {
  if (!look.beard) return;
  const c = shade(look.hairColor, -0.08);
  const { x, y, w } = head;
  if (look.beard === "full") {
    g.rect(x + 1, y + FACE.nose + 1, w - 2, 5, c);
    g.rect(x, y + FACE.eye + 2, 2, 6, c).rect(x + w - 2, y + FACE.eye + 2, 2, 6, c);
    // The mouth row stays skin so it can still be seen moving.
    g.rect(x + 4, y + FACE.mouth, 6, 2, look.skin);
  }
  if (look.beard === "mustache") g.rect(x + 4, y + FACE.mouth - 1, 6, 1, c);
  if (look.beard === "chin") g.rect(x + 5, y + FACE.jaw, 4, 2, c);
}

function drawGlasses(g: Grid, look: AvatarLook, head: Box): void {
  if (!look.glasses) return;
  const { x, y } = head;
  const frame = "#3b3b4d";
  const eyeY = y + FACE.eye;
  g.rect(x + 2, eyeY - 1, 5, 1, frame).rect(x + 2, eyeY + 2, 5, 1, frame).rect(x + 2, eyeY, 1, 2, frame).rect(x + 6, eyeY, 1, 2, frame);
  g.rect(x + 8, eyeY - 1, 5, 1, frame).rect(x + 8, eyeY + 2, 5, 1, frame).rect(x + 8, eyeY, 1, 2, frame).rect(x + 12, eyeY, 1, 2, frame);
  g.rect(x + 7, eyeY, 1, 1, frame);
}

function drawMouth(g: Grid, look: AvatarLook, pose: TeacherPose, head: Box): void {
  const { x, y } = head;
  const my = y + FACE.mouth;
  const lip = shade(look.skin, -0.4);
  const inside = "#7a3b3b";
  if (pose.mouth === "closed") {
    g.rect(x + 5, my, 4, 1, lip);
    if (pose.mood === "happy") g.set(x + 4, my - 1, lip).set(x + 9, my - 1, lip);
    return;
  }
  if (pose.mouth === "open") {
    g.rect(x + 5, my, 4, 2, lip).rect(x + 6, my, 2, 1, inside);
    return;
  }
  g.rect(x + 4, my, 6, 3, lip).rect(x + 5, my, 4, 2, inside);
}

/** The whole face, drawn into any grid at the given head box. */
function drawFace(g: Grid, look: AvatarLook, pose: TeacherPose, head: Box): void {
  const { x, y, w, h } = head;
  const skin = look.skin;
  drawHair(g, look, head, true);
  g.rect(x, y, w, h, skin).rect(x + 1, y + h - 1, w - 2, 1, shade(skin, -0.14));
  g.rect(x - 1, y + FACE.eye + 1, 1, 3, shade(skin, -0.08)).rect(x + w, y + FACE.eye + 1, 1, 3, shade(skin, -0.08));

  const eyeY = y + FACE.eye;
  if (pose.blink) {
    g.rect(x + 3, eyeY + 1, 3, 1, OUTLINE).rect(x + 9, eyeY + 1, 3, 1, OUTLINE);
  } else {
    const off = pose.mood === "thinking" ? 1 : 0;
    g.rect(x + 3 + off, eyeY, 2, 2, OUTLINE).rect(x + 9 + off, eyeY, 2, 2, OUTLINE);
    g.set(x + 3 + off, eyeY, "#ffffff").set(x + 9 + off, eyeY, "#ffffff");
  }

  const brow = shade(look.hairColor, -0.1);
  const browY = y + FACE.brow;
  if (pose.mood === "happy") g.rect(x + 3, browY - 1, 3, 1, brow).rect(x + 9, browY - 1, 3, 1, brow);
  else if (pose.mood === "thinking") g.rect(x + 3, browY, 3, 1, brow).rect(x + 9, browY - 1, 3, 1, brow);
  else g.rect(x + 3, browY, 3, 1, brow).rect(x + 9, browY, 3, 1, brow);

  g.rect(x + 6, y + FACE.nose, 2, 2, shade(skin, -0.16));
  g.set(x + 2, y + FACE.nose + 1, shade(skin, -0.1)).set(x + 11, y + FACE.nose + 1, shade(skin, -0.1));

  drawBeard(g, look, head);
  drawMouth(g, look, pose, head);
  drawGlasses(g, look, head);
  drawHair(g, look, head, false);
  drawHat(g, look, head);
}

/** Head and shoulders, 24x30. For portraits: the brief, the recap, the voice bar. */
export function teacherBustGrid(look: AvatarLook, pose: TeacherPose): Grid {
  const g = new Grid(BUST.w, BUST.h);
  const skin = look.skin;
  const body = look.outfit;
  const neckY = BUST_HEAD.y + BUST_HEAD.h;
  const bodyY = neckY + 3;

  g.rect(2, bodyY, 20, BUST.h - bodyY, body).rect(2, bodyY, 20, 1, shade(body, 0.18));
  g.rect(9, bodyY, 6, 3, look.collar).rect(11, bodyY, 2, BUST.h - bodyY, shade(look.collar, -0.15));
  if (pose.arm === "point") g.rect(19, bodyY - 3, 3, 5, body).rect(20, bodyY - 5, 2, 3, skin);

  g.rect(10, neckY, 4, 4, shade(skin, -0.18));
  drawFace(g, look, pose, BUST_HEAD);
  return g.outline(OUTLINE);
}

// ---------------- The teacher as one of the game's own characters ----------

/** Swaps every pixel of one colour for another, in place. */
function repaint(g: Grid, from: string, to: string): void {
  if (from === to) return;
  for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.get(x, y) === from) g.set(x, y, to);
}

/** Nearest colour in a palette, so a teacher's hex look maps onto the game's. */
function nearest(hex: string, palette: readonly string[]): number {
  const [cr, cg, cb] = hexToRgb(hex);
  let best = 0;
  let bestD = Infinity;
  palette.forEach((p, i) => {
    const [qr, qg, qb] = hexToRgb(p);
    const d = (cr - qr) ** 2 + (cg - qg) ** 2 + (cb - qb) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

const HAIR_MAP: Record<AvatarLook["hair"], HairStyle> = {
  short: "short",
  bun: "bun",
  long: "long",
  curly: "curly",
  ponytail: "ponytail",
  wavy: "swoop",
  // Nothing to draw: matching the hair to the skin reads as a bald head
  // without leaving an outline where the hair used to be.
  bald: "short",
};

const HAT_MAP: Record<NonNullable<AvatarLook["hat"]>, HatId> = {
  // The game has no top hat, so it is drawn on afterwards instead of snapping
  // to the wizard hat, which made the writing teacher look like a sorcerer.
  tophat: "none",
  captain: "sailor",
  laurel: "leafcrown",
  cap: "cap",
  beret: "beanie",
};

/** A teacher's look, expressed as one of the game's own characters. */
export function heroFromLook(look: AvatarLook): Hero {
  return {
    skin: nearest(look.skin, SKINS),
    hair: HAIR_MAP[look.hair],
    hairColor: look.hair === "bald" ? nearest(look.skin, HAIR_COLORS) : nearest(look.hairColor, HAIR_COLORS),
    outfit: nearest(look.outfit, OUTFITS),
    hat: look.hat ? HAT_MAP[look.hat] : "none",
    pet: "none",
  };
}

/**
 * The teacher standing, drawn as one of the game's characters.
 *
 * This is `heroGrid` - the exact sprite the villagers and the kid's own hero
 * are drawn with - so the teacher belongs to the same world. On top of it go
 * the few things that make them a teacher rather than a kid: glasses, a beard,
 * and a mouth that moves while they talk.
 *
 * `frame` 0/1 swaps the legs, so walking is free and matches every other
 * character in the game.
 */
export function teacherSprite(look: AvatarLook, pose: TeacherPose, frame = 0): Grid {
  const hero = heroFromLook(look);
  const g = heroGrid(hero, frame);

  // The game's palette has no white, so a lab coat would snap to lavender.
  // Same sprite, but painted in the teacher's own colours, so they stay
  // recognisably themselves while still being one of the game's characters.
  repaint(g, SKINS[hero.skin], look.skin);
  repaint(g, shade(SKINS[hero.skin], -0.12), shade(look.skin, -0.12));
  repaint(g, shade(SKINS[hero.skin], -0.15), shade(look.skin, -0.15));
  repaint(g, shade(SKINS[hero.skin], -0.3), shade(look.skin, -0.3));
  if (look.hair !== "bald") {
    repaint(g, HAIR_COLORS[hero.hairColor], look.hairColor);
    repaint(g, shade(HAIR_COLORS[hero.hairColor], -0.25), shade(look.hairColor, -0.25));
  }
  repaint(g, OUTFITS[hero.outfit], look.outfit);
  repaint(g, shade(OUTFITS[hero.outfit], 0.2), shade(look.outfit, 0.2));
  repaint(g, shade(OUTFITS[hero.outfit], -0.15), look.collar);
  repaint(g, shade(OUTFITS[hero.outfit], -0.45), shade(look.outfit, -0.45));

  const skin = look.skin;

  // heroGrid's face: head at x4..11 / y3..9, eyes at (6,6) and (9,6), mouth at (7,8).
  if (pose.blink) {
    g.rect(6, 6, 1, 2, skin).rect(9, 6, 1, 2, skin);
    g.rect(6, 7, 1, 1, OUTLINE).rect(9, 7, 1, 1, OUTLINE);
  }

  if (look.beard) {
    const c = shade(look.hairColor, -0.08);
    if (look.beard === "full") g.rect(5, 8, 6, 2, c).rect(4, 7, 1, 2, c).rect(11, 7, 1, 2, c);
    if (look.beard === "mustache") g.rect(6, 8, 4, 1, c);
    if (look.beard === "chin") g.rect(7, 9, 2, 1, c);
  }

  // The mouth goes on after the beard so it still shows through it.
  const lip = shade(look.skin, -0.42);
  if (pose.mouth === "closed") g.rect(7, 8, 2, 1, lip);
  else if (pose.mouth === "open") g.rect(7, 8, 2, 1, lip).rect(7, 9, 2, 1, "#7a3b3b");
  else g.rect(6, 8, 4, 1, lip).rect(7, 9, 2, 1, "#7a3b3b");

  if (look.glasses) {
    const f = "#3b3b4d";
    g.rect(5, 5, 3, 1, f).rect(8, 5, 3, 1, f).set(5, 6, f).set(7, 6, f).set(8, 6, f).set(10, 6, f);
  }

  // The one hat the game does not have.
  if (look.hat === "tophat") {
    const felt = "#241f33";
    g.rect(3, 2, 10, 1, felt).rect(4, 0, 8, 2, felt).rect(4, 1, 8, 1, look.outfit).rect(4, 0, 8, 1, felt);
  }

  // Pointing at the board: the near arm comes up.
  if (pose.arm === "point") {
    const outfit = OUTFITS[hero.outfit];
    if (pose.facing === "left") g.rect(2, 8, 2, 3, outfit).rect(2, 7, 2, 1, skin);
    else g.rect(12, 8, 2, 3, outfit).rect(12, 7, 2, 1, skin);
  }

  return g;
}

type FrameKey = `${Viseme}${"" | ":blink"}`;

/**
 * The six grids a talking presenter needs, built once per look. Drawing on
 * every animation frame would rebuild and re-encode the sprite many times a
 * second; this way the renderer just picks one.
 */
export function bustFrames(look: AvatarLook, arm: TeacherPose["arm"] = "rest", mood: TeacherPose["mood"] = "neutral"): Record<FrameKey, Grid> {
  const out = {} as Record<FrameKey, Grid>;
  for (const mouth of ["closed", "open", "wide"] as Viseme[]) {
    out[mouth] = teacherBustGrid(look, { mouth, arm, mood });
    out[`${mouth}:blink`] = teacherBustGrid(look, { mouth, blink: true, arm, mood });
  }
  return out;
}

/** The same six, full body, for one pose and walk frame. */
export function fullFrames(
  look: AvatarLook,
  arm: TeacherPose["arm"] = "rest",
  mood: TeacherPose["mood"] = "neutral",
  facing: TeacherPose["facing"] = "right",
  frame = 0,
): Record<FrameKey, Grid> {
  const out = {} as Record<FrameKey, Grid>;
  for (const mouth of ["closed", "open", "wide"] as Viseme[]) {
    out[mouth] = teacherSprite(look, { mouth, arm, mood, facing }, frame);
    out[`${mouth}:blink`] = teacherSprite(look, { mouth, blink: true, arm, mood, facing }, frame);
  }
  return out;
}

/**
 * The mouth shape for the character currently being spoken. Vowels open wide,
 * other letters part the lips, spaces and punctuation close them - enough to
 * read as speech when it tracks real audio.
 */
export function visemeAt(text: string, charIndex: number): Viseme {
  if (charIndex < 0 || charIndex >= text.length) return "closed";
  const c = text[charIndex];
  if (/[aeiouAEIOU]/.test(c)) return "wide";
  if (/[a-zA-Z0-9]/.test(c)) return "open";
  return "closed";
}

/** When the voice can't say where it is, flap the mouth on a clock instead. */
export function visemeAtTime(ms: number): Viseme {
  const step = Math.floor(ms / 140) % 3;
  return step === 0 ? "open" : step === 1 ? "wide" : "closed";
}

export const BUST_SIZE = { w: BUST.w, h: BUST.h };
export const SPRITE_SIZE = { w: 16, h: 18 };
