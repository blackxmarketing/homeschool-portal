import { Grid, shade } from "./grid";
import type { AvatarLook } from "@/content/avatars";

/**
 * The teacher as a pixel character, drawn head and shoulders so there is room
 * for a face that can talk. The kid's hero is 16x18 with a two-pixel mouth,
 * which is right for walking around a map and useless for standing at the
 * front of a class, so the presenter gets its own larger grid.
 *
 * Everything comes from the same AvatarLook the drawn teachers already use
 * (src/content/avatars.ts), so a teacher's beard, glasses and hat carry over.
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
}

const W = 24;
const H = 30;
/** The head box: 14 wide, 14 tall, with six rows above it for hats. */
const HEAD = { x: 5, y: 6, w: 14, h: 14 };
/** Rows inside the head, so the face parts never land on top of each other. */
const FACE = { brow: 4, eye: 5, nose: 8, mouth: 10, jaw: 12 };
const NECK_Y = HEAD.y + HEAD.h;
const BODY_Y = NECK_Y + 3;

function drawHair(g: Grid, look: AvatarLook, behind: boolean): void {
  const c = look.hairColor;
  const d = shade(c, -0.25);
  const { x, y, w } = HEAD;
  if (behind) {
    // The parts that fall behind the head, drawn before the face.
    if (look.hair === "long") g.rect(x - 1, y + 1, w + 2, 16, c).rect(x - 1, y + 11, 2, 5, d).rect(x + w - 1, y + 11, 2, 5, d);
    if (look.hair === "ponytail") g.rect(x + w - 1, y + 3, 3, 9, c).rect(x + w, y + 10, 2, 3, d);
    return;
  }
  switch (look.hair) {
    case "bald":
      // A little shine, so it reads as deliberate rather than missing.
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

function drawHat(g: Grid, look: AvatarLook): void {
  const { x, y, w } = HEAD;
  const band = look.outfit;
  // Everything here lives in the six rows above the head (y-6 .. y-1).
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

function drawBeard(g: Grid, look: AvatarLook): void {
  if (!look.beard) return;
  const c = shade(look.hairColor, -0.08);
  const { x, y, w } = HEAD;
  if (look.beard === "full") {
    // Jaw and chin, with the mouth row left as skin so it can still be seen moving.
    g.rect(x + 1, y + FACE.nose + 1, w - 2, 5, c);
    g.rect(x, y + FACE.eye + 2, 2, 6, c).rect(x + w - 2, y + FACE.eye + 2, 2, 6, c);
    g.rect(x + 4, y + FACE.mouth, 6, 2, look.skin);
  }
  if (look.beard === "mustache") g.rect(x + 4, y + FACE.mouth - 1, 6, 1, c);
  if (look.beard === "chin") g.rect(x + 5, y + FACE.jaw, 4, 2, c);
}

function drawGlasses(g: Grid, look: AvatarLook): void {
  if (!look.glasses) return;
  const { x, y } = HEAD;
  const frame = "#3b3b4d";
  const eyeY = y + FACE.eye;
  // Two rims and a bridge, sitting over the eyes.
  g.rect(x + 2, eyeY - 1, 5, 1, frame).rect(x + 2, eyeY + 2, 5, 1, frame).rect(x + 2, eyeY, 1, 2, frame).rect(x + 6, eyeY, 1, 2, frame);
  g.rect(x + 8, eyeY - 1, 5, 1, frame).rect(x + 8, eyeY + 2, 5, 1, frame).rect(x + 8, eyeY, 1, 2, frame).rect(x + 12, eyeY, 1, 2, frame);
  g.rect(x + 7, eyeY, 1, 1, frame);
}

function drawMouth(g: Grid, look: AvatarLook, pose: TeacherPose): void {
  const { x, y } = HEAD;
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
  // Wide: a taller, rounder opening so it reads clearly from across the room.
  g.rect(x + 4, my, 6, 3, lip).rect(x + 5, my, 4, 2, inside);
}

/** The presenter, head and shoulders, 24x28 pixels. */
export function teacherBustGrid(look: AvatarLook, pose: TeacherPose): Grid {
  const g = new Grid(W, H);
  const { x, y, w, h } = HEAD;
  const skin = look.skin;

  drawHair(g, look, true);

  // Shoulders and collar.
  const body = look.outfit;
  g.rect(2, BODY_Y, 20, H - BODY_Y, body).rect(2, BODY_Y, 20, 1, shade(body, 0.18));
  g.rect(9, BODY_Y, 6, 3, look.collar).rect(11, BODY_Y, 2, H - BODY_Y, shade(look.collar, -0.15));
  if (pose.arm === "point") {
    // The near arm lifts towards the board.
    g.rect(19, BODY_Y - 3, 3, 5, body).rect(20, BODY_Y - 5, 2, 3, skin);
  }

  // Neck, then head.
  g.rect(10, NECK_Y, 4, 4, shade(skin, -0.18));
  g.rect(x, y, w, h, skin).rect(x + 1, y + h - 1, w - 2, 1, shade(skin, -0.14));
  // Ears.
  g.rect(x - 1, y + FACE.eye + 1, 1, 3, shade(skin, -0.08)).rect(x + w, y + FACE.eye + 1, 1, 3, shade(skin, -0.08));

  // Eyes: 2x2 with a white catchlight, or a closed line when blinking.
  const eyeY = y + FACE.eye;
  if (pose.blink) {
    g.rect(x + 3, eyeY + 1, 3, 1, OUTLINE).rect(x + 9, eyeY + 1, 3, 1, OUTLINE);
  } else {
    const look2 = pose.mood === "thinking" ? 1 : 0;
    g.rect(x + 3 + look2, eyeY, 2, 2, OUTLINE).rect(x + 9 + look2, eyeY, 2, 2, OUTLINE);
    g.set(x + 3 + look2, eyeY, "#ffffff").set(x + 9 + look2, eyeY, "#ffffff");
  }
  // Brows lift when happy, draw in when thinking.
  const brow = shade(look.hairColor, -0.1);
  const browY = y + FACE.brow;
  if (pose.mood === "happy") g.rect(x + 3, browY - 1, 3, 1, brow).rect(x + 9, browY - 1, 3, 1, brow);
  else if (pose.mood === "thinking") g.rect(x + 3, browY, 3, 1, brow).rect(x + 9, browY - 1, 3, 1, brow);
  else g.rect(x + 3, browY, 3, 1, brow).rect(x + 9, browY, 3, 1, brow);

  // Nose and cheeks.
  g.rect(x + 6, y + FACE.nose, 2, 2, shade(skin, -0.16));
  g.set(x + 2, y + FACE.nose + 1, shade(skin, -0.1)).set(x + 11, y + FACE.nose + 1, shade(skin, -0.1));

  // The beard goes on before the mouth so the mouth stays visible inside it.
  drawBeard(g, look);
  drawMouth(g, look, pose);
  drawGlasses(g, look);
  drawHair(g, look, false);
  drawHat(g, look);
  return g.outline(OUTLINE);
}

type FrameKey = `${Viseme}${"" | ":blink"}`;

/**
 * The six grids a talking presenter needs, built once per look. Drawing on
 * every animation frame would rebuild and re-encode the sprite 16 times a
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

/**
 * The mouth shape for the character currently being spoken. Vowels open wide,
 * other letters part the lips, spaces and punctuation close them - which is
 * enough to read as speech when it tracks real audio.
 */
export function visemeAt(text: string, charIndex: number): Viseme {
  if (charIndex < 0 || charIndex >= text.length) return "closed";
  const c = text[charIndex];
  if (/[aeiouAEIOU]/.test(c)) return "wide";
  if (/[a-zA-Z0-9]/.test(c)) return "open";
  return "closed";
}

/** When the voice can't tell us where it is, flap the mouth on a clock instead. */
export function visemeAtTime(ms: number): Viseme {
  const step = Math.floor(ms / 140) % 3;
  return step === 0 ? "open" : step === 1 ? "wide" : "closed";
}

/** The size the bust is drawn at, so callers can lay out around it. */
export const BUST_SIZE = { w: W, h: H };
