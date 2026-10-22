import { describe, expect, it } from "vitest";
import { BREAK_ACTIVITIES, nextActivity } from "@/components/miacademy/BreakScene";

describe("the between-classes break", () => {
  it("never does the same activity twice in a row", () => {
    for (const last of BREAK_ACTIVITIES)
      for (const r of [0, 0.3, 0.6, 0.99]) {
        const next = nextActivity(last, () => r);
        expect(next).not.toBe(last);
        expect(BREAK_ACTIVITIES).toContain(next);
      }
  });

  it("can walk, swim, climb a mountain or a tree, and ride a bike", () => {
    expect(BREAK_ACTIVITIES).toEqual(["walk", "swim", "mountain", "tree", "bike"]);
  });
});
