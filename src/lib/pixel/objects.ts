import { Grid, shade } from "./grid";

/**
 * Things on the map, all 16x16 pixels (landmarks are bigger). Drawn from
 * shapes and outlined, in the same style as the heroes.
 */

const OUT = "#1b1530";

export type Prop =
  | "tree"
  | "pine"
  | "palm"
  | "mountain"
  | "peak"
  | "rock"
  | "flowers"
  | "bush"
  | "house"
  | "tent"
  | "ship"
  | "crystal"
  | "column"
  | "stall";

export function propGrid(p: Prop, frame = 0): Grid {
  const g = new Grid(16, 16);
  switch (p) {
    case "tree":
      g.rect(7, 10, 2, 5, "#7a4f22").disc(8, 7, 5, "#2f9e44").disc(6.5, 5.5, 2.5, "#51cf66").set(10, 9, "#237a33");
      break;
    case "pine":
      g.rect(7, 12, 2, 3, "#6b4423").tri(8, 1, 12, 6, "#1f7a4d").tri(8, 1, 7, 3, "#2b9a5f").set(8, 0, "#2b9a5f");
      break;
    case "palm":
      // Curved trunk, drooping fronds, coconuts.
      for (let y = 6; y < 15; y++) g.set(8 + (y > 11 ? 1 : 0) - (y < 8 ? 1 : 0), y, y % 2 ? "#a8743a" : "#8a5a2a").set(9 + (y > 11 ? 1 : 0) - (y < 8 ? 1 : 0), y, "#8a5a2a");
      for (const [x, y, w] of [[2, 5, 5], [9, 5, 5], [4, 4, 8], [1, 6, 2], [13, 6, 2], [0, 7, 1], [15, 7, 1], [6, 3, 4]] as const) g.rect(x, y, w, 1, "#2f9e44");
      g.rect(5, 4, 6, 1, "#51cf66").rect(3, 5, 2, 1, "#51cf66").set(7, 6, "#7a4f22").set(9, 6, "#7a4f22");
      break;
    case "mountain":
      g.tri(8, 2, 14, 7, "#7d8597").tri(8, 2, 6, 2, "#f1f3f5").rect(9, 7, 1, 7, "#5c6370");
      break;
    case "peak":
      g.tri(8, 0, 14, 7, "#6c757d").tri(8, 0, 5, 3, "#ffffff").rect(9, 6, 2, 8, "#495057").set(6, 4, "#dee2e6");
      break;
    case "rock":
      g.disc(8, 11, 4, "#868e96").disc(7, 10, 2, "#adb5bd");
      break;
    case "flowers":
      for (const [x, y, c] of [[4, 11, "#ff6b6b"], [8, 9, "#ffd43b"], [11, 12, "#cc5de8"], [6, 13, "#ffffff"]] as const) g.set(x, y, c).set(x, y + 1, "#2f9e44");
      break;
    case "bush":
      g.disc(8, 11, 4, "#37b24d").disc(6, 10, 2, "#69db7c");
      break;
    case "house":
      g.rect(3, 8, 10, 7, "#e9c46a").tri(8, 3, 8, 6, "#c0392b").rect(7, 11, 2, 4, "#7a4f22").rect(4, 10, 2, 2, "#74c0fc").rect(10, 10, 2, 2, "#74c0fc");
      break;
    case "tent":
      g.tri(8, 4, 14, 6, "#e67700").tri(8, 8, 14, 2, "#7a3a00");
      break;
    case "ship":
      // Hull narrows at the bottom; a big sail on the mast.
      g.rect(2, 10 + frame, 12, 2, "#8a5a2a").rect(3, 12 + frame, 10, 1, "#6b4423").rect(4, 13 + frame, 8, 1, "#5a3a22").rect(2, 10 + frame, 12, 1, "#a8743a");
      g.rect(7, 1 + frame, 1, 9, "#5a3a22");
      for (let y = 2; y < 9; y++) g.rect(8, y + frame, Math.max(1, Math.round((y - 1) * 0.8)), 1, "#f8f9fa");
      g.rect(4, 2 + frame, 3, 2, "#e03131");
      break;
    case "crystal":
      g.tri(8, 3, 13, 3, "#66d9e8").tri(5, 7, 13, 2, "#3bc9db").tri(11, 8, 13, 2, "#99e9f2");
      break;
    case "column":
      g.rect(6, 3, 4, 11, "#f1f3f5").rect(5, 2, 6, 1, "#dee2e6").rect(5, 14, 6, 1, "#dee2e6").rect(7, 4, 1, 9, "#ced4da");
      break;
    case "stall":
      g.rect(3, 9, 10, 6, "#a8743a").rect(2, 6, 12, 3, "#e03131").rect(2, 6, 2, 3, "#ffffff").rect(6, 6, 2, 3, "#ffffff").rect(10, 6, 2, 3, "#ffffff").rect(5, 10, 2, 2, "#ffd43b").rect(9, 10, 2, 2, "#69db7c");
      break;
  }
  return g.outline(OUT);
}

/** A beacon tower. Lit beacons burn; unlit ones are cold stone. `current` glows. */
export function beaconGrid(lit: boolean, frame = 0): Grid {
  const g = new Grid(16, 24);
  const stone = lit ? "#cfd4dc" : "#868e96";
  g.rect(5, 10, 6, 13, stone).rect(4, 21, 8, 2, shade(stone, -0.2)).rect(4, 8, 8, 2, shade(stone, -0.1));
  g.rect(7, 13, 2, 3, lit ? "#ffd43b" : "#495057").rect(6, 18, 1, 1, shade(stone, -0.25)).rect(9, 16, 1, 1, shade(stone, -0.25));
  if (lit) {
    const f = frame ? 1 : 0;
    g.tri(8, 1 + f, 8, 3, "#ff922b").tri(8, 3 + f, 8, 2, "#ffd43b").set(8, 6, "#fff3bf");
  } else g.rect(6, 6, 4, 2, "#495057");
  return g.outline(OUT);
}

export type Landmark = "village" | "castle" | "lab" | "booktower" | "harbor" | "summit" | "forge";

/** A land's big landmark, 32x32. */
export function landmarkGrid(l: Landmark, frame = 0): Grid {
  const g = new Grid(32, 32);
  switch (l) {
    case "village":
      g.draw(propGrid("house"), 2, 12).draw(propGrid("house"), 14, 8).draw(propGrid("tree"), 18, 16);
      g.rect(10, 26, 12, 2, "#e9c46a");
      break;
    case "castle":
      g.rect(6, 12, 20, 16, "#adb5bd").rect(3, 8, 6, 20, "#ced4da").rect(23, 8, 6, 20, "#ced4da");
      for (const x of [3, 6, 23, 26]) g.rect(x, 6, 2, 2, "#ced4da");
      g.rect(13, 19, 6, 9, "#5c3d1e").rect(4, 2, 1, 5, "#5c3d1e").rect(5, 2, 4, 3, "#2340ff").rect(15, 14, 2, 2, "#ffd43b");
      break;
    case "lab":
      g.disc(16, 18, 10, "#d0ebff").rect(5, 18, 22, 10, "#a5d8ff").rect(13, 22, 6, 6, "#1971c2").disc(16, 14, 3, "#74c0fc");
      g.rect(25, 4, 2, 14, "#868e96").disc(26, 4, 2, frame ? "#ffd43b" : "#ff6b6b");
      break;
    case "booktower":
      for (let i = 0; i < 6; i++) g.rect(7 + (i % 2), 26 - i * 4, 18 - (i % 2) * 2, 4, ["#c0392b", "#2340ff", "#22a35a", "#f2a516", "#8e44ad", "#16a3b8"][i]);
      g.rect(22, 2, 2, 8, "#f8f9fa").tri(23, 0, 2, 1, "#212529");
      break;
    case "harbor":
      g.rect(0, 20, 32, 3, "#a8743a").rect(4, 23, 2, 6, "#6b4423").rect(26, 23, 2, 6, "#6b4423");
      g.draw(propGrid("stall"), 2, 5).draw(propGrid("ship", frame), 15, 6);
      break;
    case "summit":
      g.tri(16, 4, 30, 15, "#6c757d").tri(16, 4, 12, 5, "#ffffff").rect(16, 0, 1, 6, "#5c3d1e").rect(17, 0, 7, 4, frame ? "#e0453a" : "#f2a516");
      break;
    case "forge":
      g.tri(16, 2, 30, 15, "#7d8597").tri(16, 2, 10, 5, "#f1f3f5").rect(11, 20, 10, 10, "#5c3d1e").rect(13, 23, 6, 7, frame ? "#ff922b" : "#ffd43b");
      break;
  }
  return g.outline(OUT);
}
