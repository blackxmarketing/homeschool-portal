import { Grid, noise2, shade } from "./grid";
import { propGrid } from "./objects";
import { PALETTES, type Band, type LandDef } from "./world";

/**
 * Quest scenes (Phase C, docs/GAME.md): every challenge in a lesson is a
 * little scene in that land, with the hero facing an obstacle that solving
 * the problem overcomes. The boss challenge is a Shade to turn back into light.
 */

const OUT = "#1b1530";

export const SCENE_W = 160;
export const SCENE_H = 60;
export const GROUND_Y = 42;

const SKIES: Record<Band, [string, string, string]> = {
  sprout: ["#7cc4ff", "#a5d8ff", "#d0ebff"],
  adventurer: ["#5aa9f0", "#86c1f2", "#bcdcf5"],
  strategist: ["#1c2b52", "#2b3f70", "#3d568c"],
};

/** The land's scenery: sky, far hills, ground and a few of its props. */
export function sceneBackground(L: LandDef, band: Band, seed = 3): Grid {
  const g = new Grid(SCENE_W, SCENE_H);
  const [s1, s2, s3] = SKIES[band];
  for (let y = 0; y < GROUND_Y; y++) g.rect(0, y, SCENE_W, 1, y < 14 ? s1 : y < 28 ? s2 : s3);
  // Far hills.
  const hill = shade(PALETTES[band][L.terrain === "sand" ? "grass" : L.terrain], band === "strategist" ? -0.35 : -0.15);
  for (let x = 0; x < SCENE_W; x++) {
    const h = Math.round(6 + noise2(x / 18, 1, seed + L.cx) * 12);
    g.rect(x, GROUND_Y - h, 1, h, hill);
  }
  // Ground.
  const ground = PALETTES[band][L.terrain];
  for (let y = GROUND_Y; y < SCENE_H; y++)
    for (let x = 0; x < SCENE_W; x++) {
      const n = noise2(x * 0.9, y * 0.9, seed) * 1000;
      const r = n - Math.floor(n);
      g.set(x, y, y === GROUND_Y ? shade(ground, 0.12) : r > 0.9 ? shade(ground, -0.1) : r < 0.07 ? shade(ground, 0.1) : ground);
    }
  // A few of the land's props behind the action.
  const props = L.props.filter((p) => p !== "house" && p !== "stall");
  [6, 52, 80, 142].forEach((x, i) => {
    const p = props[i % props.length];
    if (p) g.draw(propGrid(p), x, GROUND_Y - 14);
  });
  return g;
}

export type Obstacle = "gate" | "chest" | "bridge" | "target" | "portal" | "crystal" | "machine";

/** Which obstacle each kind of challenge is. */
export function obstacleFor(probeType: string): Obstacle {
  switch (probeType) {
    case "cloze":
      return "gate";
    case "number":
      return "target";
    case "place":
      return "crystal";
    case "match":
      return "portal";
    case "build":
      return "bridge";
    case "target":
      return "machine";
    default:
      return "chest";
  }
}

export const OBSTACLE_TEXT: Record<Obstacle, { goal: string; win: string }> = {
  gate: { goal: "Unlock the rune gate!", win: "The gate swings open!" },
  chest: { goal: "Crack the treasure chest!", win: "Treasure!" },
  bridge: { goal: "Build the bridge across!", win: "The bridge holds. Across you go!" },
  target: { goal: "Hit the target!", win: "Bullseye!" },
  portal: { goal: "Link up the portals!", win: "The portals light up!" },
  crystal: { goal: "Charge the crystal!", win: "The crystal blazes with light!" },
  machine: { goal: "Get the machine working!", win: "It's running!" },
};

/** The obstacle, 32x32: still in the way, or overcome. */
export function obstacleGrid(o: Obstacle, solved: boolean, frame = 0): Grid {
  const g = new Grid(32, 32);
  switch (o) {
    case "gate":
      g.rect(4, 6, 24, 26, "#868e96").rect(4, 4, 24, 4, "#adb5bd").rect(10, 10, 12, 22, solved ? "#ffe066" : "#7a4f22");
      if (!solved) g.rect(10, 10, 12, 1, "#5a3a22").rect(15, 18, 2, 3, "#ffd43b").rect(12, 14, 2, 2, "#9775fa").rect(18, 14, 2, 2, "#9775fa");
      else g.rect(11, 11, 3, 21, "#7a4f22").rect(10, 10, 12, 1, "#fff3bf");
      break;
    case "chest":
      if (solved) g.rect(6, 12, 20, 4, "#ffd43b").rect(8, 8, 3, 4, "#ffe066").rect(18, 9, 3, 3, "#ffe066").rect(6, 4, 20, 6, "#a8743a");
      g.rect(6, 16, 20, 14, "#a8743a").rect(6, 16, 20, 2, "#7a4f22").rect(6, 22, 20, 2, "#7a4f22");
      if (!solved) g.rect(6, 10, 20, 6, "#c8915a").rect(14, 18, 4, 5, "#ffd43b").set(15, 20, OUT).set(16, 20, OUT);
      break;
    case "bridge":
      g.rect(0, 22, 8, 10, "#868e96").rect(24, 22, 8, 10, "#868e96");
      if (solved) for (let x = 6; x < 26; x += 3) g.rect(x, 22, 2, 3, "#a8743a");
      else g.rect(9, 24, 2, 2, "#a8743a").rect(20, 27, 2, 2, "#a8743a");
      g.rect(0, 20, 8, 2, "#5fd35f").rect(24, 20, 8, 2, "#5fd35f");
      break;
    case "target":
      g.rect(15, 18, 2, 14, "#7a4f22").disc(16, 12, 10, "#f8f9fa").disc(16, 12, 7, "#e03131").disc(16, 12, 4, "#f8f9fa").disc(16, 12, 2, "#e03131");
      if (solved) g.rect(16, 11, 10, 1, "#7a4f22").rect(25, 9, 2, 5, "#ffd43b");
      break;
    case "portal":
      for (const cx of [9, 23]) {
        g.disc(cx, 16, 7, solved ? (frame ? "#da77f2" : "#b197fc") : "#495057").disc(cx, 16, 4, solved ? "#f3d9fa" : "#212529");
      }
      if (solved) g.rect(13, 15, 6, 2, "#e599f7");
      break;
    case "crystal":
      g.tri(16, 2, 26, 7, solved ? "#66d9e8" : "#495057").tri(16, 6, 26, 3, solved ? "#c5f6fa" : "#343a40").rect(10, 26, 12, 4, "#868e96");
      if (solved) g.set(16, 0, "#fff3bf").set(8, 6, "#fff3bf").set(24, 8, "#fff3bf");
      break;
    case "machine":
      g.rect(4, 10, 24, 20, "#5c677d").rect(4, 10, 24, 3, "#7d8597").disc(11, 20, 4, "#adb5bd").disc(21, 20, 4, "#adb5bd");
      g.rect(8, 26, 16, 2, solved ? "#51cf66" : "#e03131").rect(14, 4, 4, 6, "#7d8597").disc(16, 3, 2, solved ? (frame ? "#ffd43b" : "#ffe066") : "#495057");
      break;
  }
  return g.outline(OUT);
}

/** Each land's Shade (the boss): a creature of darkness wearing a hint of its land. */
export function shadeGrid(L: LandDef, state: "idle" | "hit" | "gone", frame = 0): Grid {
  const g = new Grid(40, 40);
  if (state === "gone") {
    // Turned back into light.
    g.disc(20, 22, 6, "#fff3bf").disc(20, 22, 3, "#ffffff");
    for (const [x, y] of [[8, 10], [32, 12], [12, 32], [30, 30], [20, 6]] as const) g.set(x, y, "#ffd43b").set(x + 1, y, "#ffd43b").set(x, y + 1, "#ffd43b");
    return g;
  }
  const body = state === "hit" ? "#f8f0ff" : "#3b2a63";
  const dark = state === "hit" ? "#e5dbff" : "#2a1d4a";
  const bob = frame;
  g.disc(20, 22 + bob, 13, body).rect(7, 22 + bob, 27, 12, body);
  for (let x = 7; x < 34; x += 5) g.rect(x, 34 + bob, 3, 2, dark);
  g.disc(14, 20 + bob, 3, "#ffd43b").disc(26, 20 + bob, 3, "#ffd43b").set(14, 20 + bob, OUT).set(26, 20 + bob, OUT);
  g.rect(15, 28 + bob, 10, 2, dark);
  // A hint of the land it darkened.
  const hue = `hsl(${L.hue} 70% 55%)`;
  const accent = { math: "#adb5bd", science: "#66d9e8", history: "#ffd43b", writing: "#f8f9fa", harbor: "#e03131", summit: "#ffffff", village: hue }[L.id] ?? "#ffd43b";
  if (L.id === "history") g.rect(13, 6 + bob, 14, 3, accent).set(13, 5 + bob, accent).set(20, 5 + bob, accent).set(26, 5 + bob, accent);
  else if (L.id === "harbor") g.rect(10, 8 + bob, 20, 3, "#212529").rect(14, 4 + bob, 12, 4, "#212529").rect(18, 5 + bob, 4, 2, "#f8f9fa");
  else if (L.id === "science") g.rect(8, 16 + bob, 2, 2, accent).rect(31, 14 + bob, 2, 2, accent).rect(19, 7 + bob, 2, 3, accent);
  else if (L.id === "writing") g.rect(30, 24 + bob, 6, 1, accent).rect(34, 20 + bob, 1, 5, "#212529");
  else if (L.id === "math") g.tri(20, 4 + bob, 10 + bob, 4, accent);
  else g.rect(18, 6 + bob, 4, 4, accent);
  return g.outline(OUT);
}
