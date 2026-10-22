import { Grid } from "./grid";

/**
 * The Miacademy buddies (Emme's panda, Bryce's wolf) in the same pixel style
 * as Lumina's heroes and pets: simple shapes on a small grid, outlined.
 * `buddyHead` faces you (greetings, bank, check-ins); `buddyWalk` faces right
 * with two walking frames (the break screen).
 */

export type BuddyKind = "panda" | "wolf";

const OUTLINE = "#1b1530";
const EYE = "#1b1530";

const PANDA = { fur: "#f7f7f4", shade: "#e2e2dc", black: "#2b2b2f", blush: "#ffb3c1" };
const WOLF = { fur: "#8a9099", dark: "#6a7079", light: "#dfe2e6", ear: "#e7c1b4", eye: "#f2b134" };

/** The face, 18x18. */
export function buddyHead(kind: BuddyKind): Grid {
  const g = new Grid(18, 18);
  if (kind === "panda") {
    g.disc(4, 4, 2.2, PANDA.black).disc(13, 4, 2.2, PANDA.black);
    g.disc(8.5, 9.5, 6.5, PANDA.fur).rect(4, 14, 10, 1, PANDA.shade);
    // Eye patches with a shine, the nose and a smile.
    g.rect(4, 7, 3, 4, PANDA.black).set(4, 7, PANDA.fur).rect(11, 7, 3, 4, PANDA.black).set(13, 7, PANDA.fur);
    g.set(5, 8, "#ffffff").set(12, 8, "#ffffff");
    g.rect(8, 11, 2, 1, PANDA.black).set(7, 13, PANDA.black).set(10, 13, PANDA.black).rect(8, 13, 2, 1, PANDA.shade);
    g.set(3, 12, PANDA.blush).set(14, 12, PANDA.blush);
  } else {
    g.tri(4, 1, 6, 2, WOLF.dark).tri(13, 1, 6, 2, WOLF.dark).set(4, 4, WOLF.ear).set(13, 4, WOLF.ear).rect(4, 5, 1, 1, WOLF.ear).rect(13, 5, 1, 1, WOLF.ear);
    g.disc(8.5, 9.5, 6.5, WOLF.fur);
    // Light cheeks and muzzle, amber eyes, a black nose.
    g.rect(3, 11, 3, 3, WOLF.light).rect(12, 11, 3, 3, WOLF.light).rect(6, 10, 6, 5, WOLF.light).rect(7, 15, 4, 1, WOLF.light);
    g.rect(5, 8, 2, 2, WOLF.eye).set(6, 9, EYE).rect(11, 8, 2, 2, WOLF.eye).set(11, 9, EYE);
    g.rect(8, 7, 2, 3, WOLF.dark);
    g.rect(8, 11, 2, 2, EYE).set(7, 14, EYE).set(10, 14, EYE).rect(8, 14, 2, 1, WOLF.dark);
  }
  return g.outline(OUTLINE);
}

/** The whole animal walking right, 34x20; frame 0 or 1. */
export function buddyWalk(kind: BuddyKind, frame = 0): Grid {
  const g = new Grid(34, 20);
  const bob = frame;
  const legs = (c: string) => {
    const xs = frame === 0 ? [7, 11, 18, 22] : [6, 12, 17, 23];
    for (const x of xs) g.rect(x, 14, 3, 4, c);
  };
  if (kind === "panda") {
    legs(PANDA.black);
    g.rect(5, 6 + bob, 4, 3, PANDA.fur); // little tail
    g.rect(7, 5 + bob, 18, 9, PANDA.fur).rect(8, 4 + bob, 16, 1, PANDA.fur).rect(8, 14, 16, 1, PANDA.fur).rect(8, 13, 16, 1, PANDA.shade);
    g.rect(18, 4 + bob, 5, 11 - bob, PANDA.black); // the band over the shoulders
    g.disc(24, 1.5 + bob, 1.6, PANDA.black).disc(30, 1.5 + bob, 1.6, PANDA.black);
    g.disc(27, 6 + bob, 4.6, PANDA.fur);
    g.rect(27, 4 + bob, 2, 3, PANDA.black).set(28, 5 + bob, "#ffffff");
    g.rect(30, 7 + bob, 2, 2, PANDA.shade).set(31, 7 + bob, PANDA.black).set(29, 9 + bob, PANDA.black);
    g.set(25, 8 + bob, PANDA.blush);
  } else {
    legs(WOLF.dark);
    g.rect(2, 3 + bob, 3, 2, WOLF.dark).rect(4, 5 + bob, 4, 2, WOLF.dark).rect(1, 2 + bob, 2, 1, WOLF.light); // bushy tail
    g.rect(7, 5 + bob, 17, 8, WOLF.fur).rect(8, 4 + bob, 15, 1, WOLF.fur).rect(8, 13, 15, 1, WOLF.fur).rect(11, 11 + bob, 10, 2, WOLF.light);
    g.rect(9, 4 + bob, 10, 2, WOLF.dark); // darker back
    g.tri(24, 0 + bob, 3 + bob, 1, WOLF.dark).tri(28, 0 + bob, 3 + bob, 1, WOLF.dark).set(24, 2 + bob, WOLF.ear).set(28, 2 + bob, WOLF.ear);
    g.disc(26, 6.5 + bob, 4, WOLF.fur);
    g.rect(28, 7 + bob, 4, 3, WOLF.light).rect(24, 9 + bob, 4, 2, WOLF.light);
    g.rect(27, 5 + bob, 2, 1, WOLF.eye).set(28, 5 + bob, EYE);
    g.set(31, 7 + bob, EYE).set(30, 10 + bob, EYE);
  }
  return g.outline(OUTLINE);
}
