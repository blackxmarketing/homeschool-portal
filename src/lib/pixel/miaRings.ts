import { Grid } from "./grid";

/**
 * The Miacademy weekly rings as pixel art (to match Lumina).
 * Pure, so the server and the browser draw exactly the same pixels.
 */

const TRACK = "#e4e9f7";

/** Angle of a cell from 12 o'clock, going counter-clockwise (0..1 of a turn). */
function turn(x: number, y: number, c: number): number {
  const a = Math.atan2(-(x + 0.5 - c), -(y + 0.5 - c));
  return (a < 0 ? a + 2 * Math.PI : a) / (2 * Math.PI);
}

/** A weekly ring, 22x22, filled clockwise from the top. */
export function ringGrid(color: string, progress: number): Grid {
  const n = 22;
  const c = n / 2;
  const p = Math.max(0, Math.min(1, progress));
  const g = new Grid(n, n);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const d = Math.hypot(x + 0.5 - c, y + 0.5 - c);
      if (d > 10.5 || d < 6.5) continue;
      const clockwise = 1 - turn(x, y, c);
      g.set(x, y, p >= 0.9999 || (p > 0 && clockwise % 1 <= p) ? color : TRACK);
    }
  return g;
}
