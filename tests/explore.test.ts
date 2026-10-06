import { describe, expect, it } from "vitest";
import { K5_SUBJECTS } from "@/content/courses/k5/base";
import { buildMap, findPath, footprint, MAP_W, reachable, solidTiles } from "@/lib/explore/map";
import { UNLOCK_SOURCES, WORLDS, worldRewards } from "@/lib/explore/worlds";
import { isUnlockId } from "@/lib/pixel/cosmetics";

const LESSONS = { math: 10, ela: 9, sci: 7, soc: 6, span: 6 };

describe("K-5 worlds", () => {
  it("one world per grade, K to 5", () => {
    expect(WORLDS.map((w) => w.grade)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(WORLDS.map((w) => w.chapter)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("every reward is a real hero style and only one world gives it", () => {
    const all = WORLDS.flatMap((w) => worldRewards(w).map((r) => r.id));
    for (const id of all) expect(isUnlockId(id), id).toBe(true);
    expect(new Set(all).size).toBe(all.length);
    expect(Object.keys(UNLOCK_SOURCES).length).toBe(all.length);
  });

  it("quest givers are villagers", () => {
    for (const w of WORLDS) expect(w.villagers.some((v) => v.id === w.quest.giver), w.name).toBe(true);
  });

  for (const w of WORLDS) {
    describe(w.name, () => {
      const map = buildMap(w, LESSONS);

      it("is the same every time", () => {
        expect(buildMap(w, LESSONS)).toEqual(map);
      });

      it("has a lantern, arcade and a stone per lesson in every zone", () => {
        for (const s of K5_SUBJECTS) {
          expect(map.objects.filter((o) => o.kind === "lantern" && o.zone === s)).toHaveLength(1);
          expect(map.objects.filter((o) => o.kind === "arcade" && o.zone === s)).toHaveLength(1);
          expect(map.objects.filter((o) => o.kind === "stone" && o.zone === s)).toHaveLength(LESSONS[s]);
        }
        expect(map.objects.filter((o) => o.kind === "spark")).toHaveLength(w.sparks);
        expect(map.objects.filter((o) => o.kind === "item")).toHaveLength(w.quest.count);
        expect(map.objects.filter((o) => o.kind === "chest")).toHaveLength(w.chests.length);
      });

      it("nothing overlaps", () => {
        const cells = map.objects.flatMap((o) => (footprint(o).length ? footprint(o) : [[o.x, o.y] as [number, number]]));
        expect(new Set(cells.map(([x, y]) => `${x},${y}`)).size).toBe(cells.length);
      });

      it("you can walk to everything from the start", () => {
        const solid = solidTiles(map.objects);
        const reach = reachable(map.tiles, solid, map.spawn.x, map.spawn.y);
        for (const o of map.objects) {
          const cells = footprint(o);
          if (!cells.length) {
            expect(reach.has(o.y * MAP_W + o.x), `${o.kind} ${o.id}`).toBe(true);
            continue;
          }
          const near = cells.some(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => reach.has((y + dy) * MAP_W + x + dx)));
          expect(near, `${o.kind} ${o.id}`).toBe(true);
        }
      });

      it("finds a walking path", () => {
        const spark = map.objects.find((o) => o.kind === "spark")!;
        const path = findPath(map, solidTiles(map.objects), map.spawn.x, map.spawn.y, spark.x, spark.y);
        expect(path?.at(-1)).toEqual({ x: spark.x, y: spark.y });
      });
    });
  }
});
