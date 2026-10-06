import { describe, expect, it } from "vitest";
import {
  MAP_LEVELS,
  answerTry,
  checkTry,
  levelById,
  mapQuest,
  nameAt,
  perfectMoves,
  replay,
  simulate,
  solvePath,
  starsFor,
  tappable,
  usAt,
  worldAt,
  US_H,
  US_W,
  WORLD,
  type Round,
  type RoundMove,
  type Try,
  type UsRegion,
} from "@/lib/minigames/mapquest";

const wrongTry = (r: Round): Try => {
  switch (r.kind) {
    case "tap": {
      for (let y = 0; y < r.map.h; y++)
        for (let x = 0; x < r.map.w; x++) if (tappable(r.map, x, y) && !r.targets.some((c) => c[0] === x && c[1] === y)) return { at: [x, y] };
      return { at: [-1, -1] };
    }
    case "walk":
      return { path: [] };
    case "region":
      return { at: [-5, -5] };
    case "pin":
      return { at: [r.lon === 0 ? 30 : 0, r.lat] };
  }
};

describe("Map Quest levels", () => {
  it("has 3 levels for each grade K-4 with unique ids that name the grade", () => {
    expect(new Set(MAP_LEVELS.map((l) => l.id)).size).toBe(MAP_LEVELS.length);
    for (const g of [0, 1, 2, 3, 4]) {
      const ls = mapQuest.levelsForGrade!(g);
      expect(ls, `grade ${g}`).toHaveLength(3);
      for (const l of ls) {
        expect(l.id).toMatch(g === 0 ? /^k-\d$/ : new RegExp(`^g${g}-\\d$`));
        expect(l.intro).toMatch(/^Skill:/);
      }
    }
    expect(mapQuest.levelsForGrade!(5)).toEqual([]);
    expect(mapQuest.grades).toEqual([0, 1, 2, 3, 4]);
    expect(mapQuest.levels("sprout")).toEqual([]);
  });

  it("every level has 5-8 rounds, and things stay on the map", () => {
    for (const l of MAP_LEVELS) {
      expect(l.rounds.length, l.id).toBeGreaterThanOrEqual(5);
      expect(l.rounds.length, l.id).toBeLessThanOrEqual(8);
      for (const r of l.rounds) {
        if (r.kind !== "tap" && r.kind !== "walk") continue;
        expect(r.map.terrain).toHaveLength(r.map.h);
        for (const row of r.map.terrain) expect(row).toHaveLength(r.map.w);
        for (const th of r.map.things) expect(th.x >= 0 && th.y >= 0 && th.x < r.map.w && th.y < r.map.h, `${l.id} ${th.k}`).toBe(true);
        if (r.kind === "tap") for (const [x, y] of r.targets) expect(tappable(r.map, x, y), `${l.id}: target ${x},${y} must be tappable`).toBe(true);
      }
    }
  });

  it("every walk can be solved, and the shortest way fits the step limit", () => {
    for (const l of MAP_LEVELS)
      for (const r of l.rounds) {
        if (r.kind !== "walk") continue;
        const p = solvePath(r);
        expect(p, `${l.id}: ${r.say}`).not.toBeNull();
        expect(p!.length).toBeGreaterThan(0);
        const sim = simulate(r, p!);
        expect(sim.bump).toBe(-1);
        expect(sim.end).toEqual(r.goal);
      }
  });

  it("intermediate directions need diagonals to be shortest", () => {
    const l = levelById("g4-1")!;
    const walks = l.rounds.filter((r) => r.kind === "walk");
    for (const r of walks) if (r.kind === "walk") expect(solvePath(r)!.some((d) => d.length === 2)).toBe(true);
  });

  it("the world map has every continent and ocean in the right places", () => {
    expect(WORLD).toHaveLength(18);
    for (const row of WORLD) expect(row).toHaveLength(36);
    const at = (lat: number, lon: number) => worldAt(Math.floor((lon + 180) / 10), Math.floor((90 - lat) / 10));
    expect(at(40, -100)).toBe("NA");
    expect(at(-10, -55)).toBe("SA");
    expect(at(50, 10)).toBe("EU");
    expect(at(5, 20)).toBe("AF");
    expect(at(45, 100)).toBe("AS");
    expect(at(-25, 135)).toBe("AU");
    expect(at(-85, 0)).toBe("AN");
    expect(at(0, -150)).toBe("PAC");
    expect(at(0, 170)).toBe("PAC");
    expect(at(35, -40)).toBe("ATL");
    expect(at(-20, -20)).toBe("ATL");
    expect(at(-15, 75)).toBe("IND");
    expect(at(85, 60)).toBe("ARC");
    expect(at(-65, -100)).toBe("SOU");
  });

  it("the U.S. map has all five regions in the right places", () => {
    const at = (lon: number, lat: number) => usAt(Math.floor(((lon + 125) / 59) * US_W), Math.floor(((49.5 - lat) / 25) * US_H));
    expect(at(-120, 44)).toBe("WEST"); // Oregon
    expect(at(-105.5, 39)).toBe("WEST"); // Colorado
    expect(at(-111.5, 34)).toBe("SWEST"); // Arizona
    expect(at(-99, 31)).toBe("SWEST"); // Texas
    expect(at(-98, 41.5)).toBe("MWEST"); // Nebraska
    expect(at(-89, 40)).toBe("MWEST"); // Illinois
    expect(at(-84, 33)).toBe("SEAST"); // Georgia
    expect(at(-81.5, 28)).toBe("SEAST"); // Florida
    expect(at(-75, 42.5)).toBe("NEAST"); // New York
    expect(at(-69, 45.3)).toBe("NEAST"); // Maine
    expect(at(-130, 30)).toBeNull(); // the Pacific
    const counts = new Map<UsRegion, number>();
    for (let r = 0; r < US_H; r++) for (let c = 0; c < US_W; c++) {
      const g = usAt(c, r);
      if (g) counts.set(g, (counts.get(g) ?? 0) + 1);
    }
    expect(counts.size).toBe(5);
    for (const n of counts.values()) expect(n).toBeGreaterThan(8);
  });
});

describe("Map Quest scoring", () => {
  it("every level can reach 3 stars with the right answers", () => {
    for (const l of MAP_LEVELS) {
      const moves = perfectMoves(l);
      for (const [i, r] of l.rounds.entries()) expect(checkTry(l, r, moves[i].tries[0]).ok, `${l.id} round ${i + 1}`).toBe(true);
      const r = replay(l, moves);
      expect(r.stars, l.id).toBe(3);
      expect(r.points).toBe(r.max);
      expect(mapQuest.score(l.id, moves)).toEqual({ stars: 3, best: r.max });
    }
  });

  it("replays are deterministic and survive a JSON round trip", () => {
    for (const l of MAP_LEVELS) {
      const moves = JSON.parse(JSON.stringify(perfectMoves(l)));
      expect(mapQuest.score(l.id, moves)).toEqual(mapQuest.score(l.id, moves));
    }
  });

  it("a wrong try first, then the answer, earns 1 point instead of 2", () => {
    for (const l of MAP_LEVELS) {
      const moves: RoundMove[] = l.rounds.map((r) => ({ tries: [wrongTry(r), answerTry(r)] }));
      for (const [i, r] of l.rounds.entries()) expect(checkTry(l, r, moves[i].tries[0]).ok, `${l.id} round ${i + 1} wrong try`).toBe(false);
      const res = replay(l, moves);
      expect(res.points).toBe(l.rounds.length);
      expect(res.stars).toBe(starsFor(l.rounds.length, l.rounds.length * 2));
      expect(res.stars).toBe(1);
    }
  });

  it("stars follow the rules: 90% for 3, 60% for 2, 30% for 1", () => {
    expect(starsFor(12, 12)).toBe(3);
    expect(starsFor(11, 12)).toBe(3);
    expect(starsFor(10, 12)).toBe(2);
    expect(starsFor(8, 12)).toBe(2);
    expect(starsFor(7, 12)).toBe(1);
    expect(starsFor(4, 12)).toBe(1);
    expect(starsFor(3, 12)).toBe(0);
    expect(starsFor(0, 0)).toBe(0);
    // One round missed entirely (3 wrong tries) in a 6-round level: 10 of 12 = 2 stars.
    const l = levelById("k-1")!;
    const moves = perfectMoves(l);
    moves[0] = { tries: [wrongTry(l.rounds[0]), wrongTry(l.rounds[0]), wrongTry(l.rounds[0])] };
    expect(replay(l, moves).stars).toBe(2);
    // A right answer after 3 wrong tries doesn't count.
    moves[0] = { tries: [wrongTry(l.rounds[0]), wrongTry(l.rounds[0]), wrongTry(l.rounds[0]), answerTry(l.rounds[0])] };
    expect(replay(l, moves).points).toBe(10);
  });

  it("walks that bump, stop short or take too long are not right", () => {
    const l = levelById("g2-2")!;
    const r = l.rounds[1];
    if (r.kind !== "walk") throw new Error("expected a walk");
    expect(checkTry(l, r, { path: ["E", "E", "E", "E", "E", "E"] }).note).toMatch(/Bump!.*lake/);
    expect(checkTry(l, r, { path: ["S", "E"] }).ok).toBe(false);
    expect(checkTry(l, r, { path: ["S", "S", "E", "E", "E", "E", "N", "E", "E", "N"] }).note).toMatch(/shorter way/);
    expect(checkTry(l, r, { path: ["S", "E", "E", "E", "E", "E", "E", "N"] }).ok).toBe(true);
    // Diagonals aren't allowed before grade 4.
    expect(checkTry(l, r, { path: ["NE"] }).ok).toBe(false);
  });

  it("wrong answers get teaching feedback", () => {
    const k = levelById("k-1")!;
    expect(checkTry(k, k.rounds[0], { at: [5, 4] }).note).toMatch(/That's the ball\. Near means/);
    const g3 = levelById("g3-1")!;
    expect(checkTry(g3, g3.rounds[0], { at: [2, 3] }).note).toMatch(/^That's C-4/);
    const g2 = levelById("g2-1")!;
    expect(checkTry(g2, g2.rounds[0], { at: [3, 2] }).note).toMatch(/1 square north of the hut/);
    const pins = levelById("g4-2")!;
    expect(checkTry(pins, pins.rounds[1], { at: [-90, 60] }).note).toMatch(/30° too far north/);
    expect(checkTry(pins, pins.rounds[1], { at: [-60, 30] }).note).toMatch(/latitude is right.*30° too far east/);
    const us = levelById("g4-3")!;
    expect(checkTry(us, us.rounds[0], answerTry(us.rounds[1])).note).toMatch(/That's the Southwest/);
    const lf = levelById("g3-3")!.rounds[0];
    if (lf.kind !== "tap") throw new Error("expected a tap round");
    expect(nameAt(lf.map, 6, 4)).toBe("the peninsula");
    expect(nameAt(lf.map, 6, 1)).toBe("the island");
    expect(checkTry(levelById("g3-3")!, lf, { at: [1, 1] }).note).toMatch(/B-2, a hill/);
  });

  it("garbage moves score 0 without throwing", () => {
    const junk: unknown[] = [
      null,
      undefined,
      42,
      "hello",
      {},
      [null, 1, "x"],
      [{ tries: "nope" }],
      [{ tries: [{ at: "1,2" }, { at: [1.5, 2] }, { at: [1, 2, 3] }] }],
      [{ tries: [{ path: "NNEE" }, { path: [1, 2, 3] }, { path: Array(500).fill("N") }] }],
      [{ tries: [{ at: [1e9, -1e9] }, { at: [NaN, Infinity] }] }],
      Array(100).fill({ tries: [{ at: [99, 99] }] }),
    ];
    for (const l of MAP_LEVELS)
      for (const m of junk) {
        expect(() => mapQuest.score(l.id, m)).not.toThrow();
        expect(mapQuest.score(l.id, m)).toEqual({ stars: 0, best: 0 });
      }
  });

  it("unknown levels return null", () => {
    expect(mapQuest.score("nope", [])).toBeNull();
    expect(mapQuest.score("", perfectMoves(MAP_LEVELS[0]))).toBeNull();
  });
});
