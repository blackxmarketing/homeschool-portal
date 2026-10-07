import { describe, expect, it } from "vitest";
import { AVATARS, type AvatarLook } from "@/content/avatars";
import { BUST_SIZE, bustFrames, teacherBustGrid, visemeAt, visemeAtTime, type Viseme } from "@/lib/pixel/teacher";
import type { Grid } from "@/lib/pixel/grid";

const OUTLINE = "#1b1530";
const ids = Object.keys(AVATARS);

/** Every pixel that got drawn, as a string, so two poses can be compared. */
const pixels = (g: Grid) => g.runs().map((r) => `${r.x},${r.y},${r.w},${r.c}`).join("|");
const filled = (g: Grid) => g.runs().reduce((t, r) => t + r.w, 0);

describe("the teacher sprite", () => {
  it("is the size everything else lays out against", () => {
    const g = teacherBustGrid(AVATARS.science, { mouth: "closed" });
    expect([g.w, g.h]).toEqual([BUST_SIZE.w, BUST_SIZE.h]);
  });

  it("draws every teacher in the portal without falling off the grid", () => {
    for (const id of ids) {
      const g = teacherBustGrid(AVATARS[id], { mouth: "open" });
      expect(g.w, id).toBe(BUST_SIZE.w);
      expect(g.h, id).toBe(BUST_SIZE.h);
      // A real character, not a few stray pixels or a solid block.
      const on = filled(g);
      expect(on, `${id} has a character`).toBeGreaterThan(200);
      expect(on, `${id} is not a solid block`).toBeLessThan(BUST_SIZE.w * BUST_SIZE.h);
    }
  });

  it("is outlined like every other sprite in the game", () => {
    for (const id of ids) {
      const g = teacherBustGrid(AVATARS[id], { mouth: "closed" });
      expect(g.runs().some((r) => r.c === OUTLINE), id).toBe(true);
    }
  });

  it("is the same every time, so the renderer can cache it", () => {
    const a = teacherBustGrid(AVATARS.history, { mouth: "wide", blink: true, mood: "happy" });
    const b = teacherBustGrid(AVATARS.history, { mouth: "wide", blink: true, mood: "happy" });
    expect(pixels(a)).toBe(pixels(b));
  });
});

describe("the mouth actually changes", () => {
  it("looks different in all three shapes, for every teacher", () => {
    for (const id of ids) {
      const shapes = (["closed", "open", "wide"] as Viseme[]).map((mouth) => pixels(teacherBustGrid(AVATARS[id], { mouth })));
      expect(new Set(shapes).size, `${id} mouth shapes differ`).toBe(3);
    }
  });

  it("opens wider than it parts", () => {
    // The inside of the mouth is a colour used nowhere else, so counting it
    // measures how open the mouth is rather than how much got drawn overall.
    const mouthPixels = (mouth: Viseme) =>
      teacherBustGrid(AVATARS.science, { mouth })
        .runs()
        .filter((r) => r.c === "#7a3b3b")
        .reduce((t, r) => t + r.w, 0);
    expect(mouthPixels("closed")).toBe(0);
    expect(mouthPixels("open")).toBeGreaterThan(0);
    expect(mouthPixels("wide")).toBeGreaterThan(mouthPixels("open"));
  });

  it("shows a blink as a different sprite", () => {
    const look = AVATARS.money;
    expect(pixels(teacherBustGrid(look, { mouth: "closed" }))).not.toBe(pixels(teacherBustGrid(look, { mouth: "closed", blink: true })));
  });

  it("changes when the teacher points at the board or changes mood", () => {
    const look = AVATARS.science;
    const rest = pixels(teacherBustGrid(look, { mouth: "closed" }));
    expect(pixels(teacherBustGrid(look, { mouth: "closed", arm: "point" }))).not.toBe(rest);
    expect(pixels(teacherBustGrid(look, { mouth: "closed", mood: "happy" }))).not.toBe(rest);
    expect(pixels(teacherBustGrid(look, { mouth: "closed", mood: "thinking" }))).not.toBe(rest);
  });
});

describe("the look a teacher was given actually shows up", () => {
  const base: AvatarLook = { skin: "#f1c6a2", hair: "short", hairColor: "#2b1d14", outfit: "#2340ff", collar: "#ffffff", bg: "#fff", voice: "male" };
  const draw = (over: Partial<AvatarLook>) => pixels(teacherBustGrid({ ...base, ...over }, { mouth: "closed" }));

  it("draws each hair style differently", () => {
    const styles: AvatarLook["hair"][] = ["short", "bun", "long", "curly", "bald", "wavy", "ponytail"];
    expect(new Set(styles.map((hair) => draw({ hair }))).size).toBe(styles.length);
  });

  it("draws each hat differently, and none of them the same as no hat", () => {
    const hats: NonNullable<AvatarLook["hat"]>[] = ["tophat", "captain", "laurel", "cap", "beret"];
    const none = draw({});
    const drawn = hats.map((hat) => draw({ hat }));
    expect(new Set(drawn).size).toBe(hats.length);
    for (const d of drawn) expect(d).not.toBe(none);
  });

  it("draws beards and glasses", () => {
    const none = draw({});
    for (const beard of ["full", "mustache", "chin"] as const) expect(draw({ beard }), beard).not.toBe(none);
    expect(draw({ glasses: true })).not.toBe(none);
  });

  it("uses the teacher's own colours", () => {
    const g = teacherBustGrid({ ...base, outfit: "#22a35a" }, { mouth: "closed" });
    expect(g.runs().some((r) => r.c === "#22a35a")).toBe(true);
    expect(g.runs().some((r) => r.c === "#f1c6a2")).toBe(true);
  });

  it("keeps the mouth visible through a full beard, so talking still reads", () => {
    const bearded = { ...base, beard: "full" as const };
    const shapes = (["closed", "open", "wide"] as Viseme[]).map((mouth) => pixels(teacherBustGrid(bearded, { mouth })));
    expect(new Set(shapes).size).toBe(3);
  });
});

describe("the frames the renderer picks between", () => {
  it("covers every mouth shape, open-eyed and blinking", () => {
    const frames = bustFrames(AVATARS.science);
    for (const key of ["closed", "open", "wide", "closed:blink", "open:blink", "wide:blink"]) {
      expect(frames[key as keyof typeof frames], key).toBeDefined();
    }
    expect(new Set(Object.values(frames).map(pixels)).size).toBe(6);
  });
});

describe("following the voice", () => {
  it("opens on vowels, parts on other letters, closes on gaps", () => {
    const text = "Hi there!";
    expect(visemeAt(text, 0)).toBe("open"); // H
    expect(visemeAt(text, 1)).toBe("wide"); // i
    expect(visemeAt(text, 2)).toBe("closed"); // space
    expect(visemeAt(text, 8)).toBe("closed"); // !
  });

  it("stays shut when the voice has not started or has run off the end", () => {
    expect(visemeAt("abc", -1)).toBe("closed");
    expect(visemeAt("abc", 99)).toBe("closed");
    expect(visemeAt("", 0)).toBe("closed");
  });

  it("falls back to a steady rhythm when the voice cannot say where it is", () => {
    const seen = new Set([0, 140, 280, 420].map(visemeAtTime));
    expect(seen.size).toBeGreaterThan(1);
  });
});
