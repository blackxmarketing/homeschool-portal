import { describe, expect, it } from "vitest";
import { cleanHero, DEFAULT_HERO, heroGrid, HATS, PETS, petGrid } from "@/lib/pixel/hero";
import { beaconGrid, landmarkGrid, propGrid } from "@/lib/pixel/objects";
import { dim, Grid, shade } from "@/lib/pixel/grid";
import { bandFor, landMap, LANDS, litFor, render, TILE, worldMap } from "@/lib/pixel/world";
import { COURSES } from "@/content/courses";

describe("pixel art", () => {
  it("outlines shapes automatically", () => {
    const g = new Grid(5, 5).rect(2, 2, 1, 1, "#ff0000").outline("#000000");
    expect(g.get(2, 2)).toBe("#ff0000");
    expect(g.get(1, 2)).toBe("#000000");
    expect(g.get(0, 0)).toBeNull();
  });

  it("draws every hero option, hat and pet", () => {
    for (const hat of HATS) expect(heroGrid({ ...DEFAULT_HERO, hat }).runs().length).toBeGreaterThan(20);
    for (const pet of PETS) if (pet === "none") expect(petGrid(pet)).toBeNull(); else expect(petGrid(pet)!.runs().length).toBeGreaterThan(5);
    expect(heroGrid(DEFAULT_HERO, 0).runs()).not.toEqual(heroGrid(DEFAULT_HERO, 1).runs());
  });

  it("cleans saved heroes (bad values fall back to defaults)", () => {
    expect(cleanHero({ skin: 99, hair: "mohawk", hat: "crown", pet: "dragon", outfit: 2 })).toEqual({ ...DEFAULT_HERO, hat: "crown", pet: "dragon", outfit: 2 });
    expect(cleanHero(null)).toEqual(DEFAULT_HERO);
  });

  it("has props, beacons and landmarks", () => {
    expect(propGrid("palm").runs().length).toBeGreaterThan(5);
    expect(beaconGrid(true).runs()).not.toEqual(beaconGrid(false).runs());
    for (const L of LANDS) expect(landmarkGrid(L.landmark).runs().length).toBeGreaterThan(5);
  });

  it("dims and shades colors", () => {
    expect(shade("#808080", 1)).toBe("#ffffff");
    expect(shade("#808080", -1)).toBe("#000000");
    expect(dim("#ff0000")).not.toBe("#ff0000");
  });
});

describe("the world of Lumina", () => {
  const map = worldMap();

  it("is the same every visit", () => {
    expect(worldMap().t).toEqual(map.t);
  });

  it("every land has ground at its center and a road from the village", () => {
    for (const L of LANDS) expect(map.land[L.cy * map.w + L.cx], L.id).toBe(L.id);
    const roads = map.t.filter((t) => t === "path" || t === "bridge").length;
    expect(roads).toBeGreaterThan(60);
  });

  it("every course is a land", () => {
    const covered = LANDS.flatMap((L) => L.courses);
    for (const c of COURSES) expect(covered, c.id).toContain(c.id);
  });

  it("lands light up from their landmark as lessons are mastered", () => {
    const dark = litFor(map, {});
    const half = litFor(map, { science: 0.5 });
    const all = litFor(map, { science: 1 });
    const sci = LANDS.find((l) => l.id === "science")!;
    const edge = [sci.cx + sci.r - 2, sci.cy] as const;
    expect(dark(LANDS[0].cx, LANDS[0].cy)).toBe(true);
    expect(dark(...edge)).toBe(false);
    expect(half(sci.cx, sci.cy)).toBe(true);
    expect(all(...edge)).toBe(true);
  });

  it("renders a full picture", () => {
    const buf = render(map, "adventurer", () => true);
    expect(buf.length).toBe(map.w * TILE * map.h * TILE * 4);
    expect(buf[3]).toBe(255);
  });

  it("each land has a beacon for each quest", () => {
    const L = LANDS.find((l) => l.id === "history")!;
    const m = landMap(L, 6, [true, false]);
    expect(m.nodes).toHaveLength(6);
    expect(new Set(m.nodes.map((n) => n.x)).size).toBe(6);
  });

  it("looks different by grade: 4-5, 6-8, 9-12", () => {
    expect([4, 5].map(bandFor)).toEqual(["sprout", "sprout"]);
    expect([6, 7, 8].map(bandFor)).toEqual(["adventurer", "adventurer", "adventurer"]);
    expect([9, 12].map(bandFor)).toEqual(["strategist", "strategist"]);
  });
});

import { obstacleFor, obstacleGrid, OBSTACLE_TEXT, sceneBackground, shadeGrid, SCENE_H, SCENE_W } from "@/lib/pixel/scene";

describe("quest scenes and bosses", () => {
  it("every kind of challenge has an obstacle with a goal and a win", () => {
    for (const t of ["cloze", "number", "place", "match", "build", "target", "sort", "sequence", "highlight"]) {
      const o = obstacleFor(t);
      expect(OBSTACLE_TEXT[o].goal.length).toBeGreaterThan(5);
      expect(obstacleGrid(o, false).runs()).not.toEqual(obstacleGrid(o, true).runs());
    }
  });

  it("every land has its own scenery and Shade", () => {
    for (const L of LANDS) {
      const bg = sceneBackground(L, "adventurer");
      expect([bg.w, bg.h]).toEqual([SCENE_W, SCENE_H]);
      expect(bg.get(0, 0)).not.toBeNull();
      expect(shadeGrid(L, "idle").runs()).not.toEqual(shadeGrid(L, "gone").runs());
    }
  });

  it("night scenery for grades 9-12", () => {
    const L = LANDS[1];
    expect(sceneBackground(L, "strategist").get(0, 0)).not.toBe(sceneBackground(L, "sprout").get(0, 0));
  });
});
