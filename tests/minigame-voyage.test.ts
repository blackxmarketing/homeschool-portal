import { describe, expect, it } from "vitest";
import { cellAt, cleanLeg, FIX_COST, levelById, REEF_COST, replay, solve, startPos, starsFor, voyage, VOYAGE_LEVELS } from "../src/lib/minigames/voyage";
import { gameById } from "../src/lib/minigames";

const ALL = Object.values(VOYAGE_LEVELS).flat();
const game = voyage!;

describe("Voyage of Discovery: levels", () => {
  it("has 3 levels per band with unique ids and well-formed charts", () => {
    for (const band of ["sprout", "adventurer", "strategist"] as const) {
      expect(game.levels(band)).toHaveLength(3);
    }
    expect(new Set(ALL.map((l) => l.id)).size).toBe(ALL.length);
    for (const l of ALL) {
      const w = l.chart[0].length;
      expect(l.chart.every((row) => row.length === w && /^[.#*PD]+$/.test(row))).toBe(true);
      expect(l.chart.join("").split("P")).toHaveLength(2);
      expect(l.chart.join("").split("D")).toHaveLength(2);
      expect(l.stars3).toBeGreaterThan(l.stars2);
      expect(l.history.length).toBeGreaterThan(40);
    }
  });

  it("is registered as a game in the History Kingdom", () => {
    expect(gameById("voyage")?.land).toBe("history");
  });

  it("every level can reach 3 stars (solver), and score() agrees", () => {
    for (const l of ALL) {
      const plan = solve(l);
      expect(plan, l.id).not.toBeNull();
      const r = replay(l, plan!.legs);
      expect(r.arrived, l.id).toBe(true);
      expect(r.stars, l.id).toBe(3);
      expect(game.score(l.id, plan!.legs)).toEqual({ stars: 3, best: r.best });
    }
  });

  it("strategist levels need the current: ignoring it misses or costs more", () => {
    for (const l of VOYAGE_LEVELS.strategist) expect(l.current.east !== 0 || l.current.north !== 0).toBe(true);
  });
});

describe("Voyage of Discovery: rules", () => {
  const s1 = levelById("vy-s1")!;

  it("charges a day per square plus a day per leg", () => {
    const r = replay(s1, [{ h: "S", d: 3 }, { h: "E", d: 9 }]);
    expect(r.arrived).toBe(true);
    expect(r.legs.map((x) => x.cost)).toEqual([3 + FIX_COST, 9 + FIX_COST]);
    expect(r.suppliesLeft).toBe(20 - 14);
    expect(r.stars).toBe(3);
  });

  it("wasted legs cost stars", () => {
    const r = replay(s1, [{ h: "S", d: 1 }, { h: "S", d: 1 }, { h: "S", d: 1 }, { h: "E", d: 9 }]);
    expect(r.suppliesLeft).toBe(4);
    expect(r.stars).toBe(3);
    const r2 = replay(s1, [{ h: "N", d: 1 }, { h: "S", d: 1 }, { h: "S", d: 3 }, { h: "E", d: 9 }]);
    expect(r2.suppliesLeft).toBe(2);
    expect(r2.stars).toBe(2);
  });

  it("land stops a leg early", () => {
    const r = replay(s1, [{ h: "E", d: 8 }]);
    expect(r.legs[0].hit).toBe("land");
    expect(r.legs[0].sailed).toBe(3);
    expect(r.legs[0].to).toEqual({ x: 3.5, y: 2.5 });
    expect(r.arrived).toBe(false);
    expect(r.stars).toBe(0);
  });

  it("the chart edge stops a leg early", () => {
    const r = replay(s1, [{ h: "W", d: 3 }]);
    expect(r.legs[0].hit).toBe("edge");
    expect(r.legs[0].sailed).toBe(0);
  });

  it("reefs cost repair days", () => {
    const s2 = levelById("vy-s2")!;
    // From the port at (11,2): south 4, then west runs onto the reef at (1,6).
    const start = startPos(s2);
    expect(cellAt(s2, start.x, start.y)).toBe("port");
    const r = replay(s2, [{ h: "S", d: 4 }, { h: "W", d: 11 }]);
    const reefLeg = r.legs.find((x) => x.hit === "reef");
    expect(reefLeg).toBeDefined();
    expect(reefLeg!.cost).toBe(reefLeg!.sailed + FIX_COST + REEF_COST);
  });

  it("diagonals cost √2 a square", () => {
    const a1 = levelById("vy-a1")!;
    const r = replay(a1, [{ h: "SE", d: 1 }]);
    expect(r.legs[0].cost).toBeCloseTo(Math.SQRT2 + FIX_COST, 2);
  });

  it("the current sets the ship after each leg", () => {
    const h1 = levelById("vy-h1")!;
    const p = startPos(h1);
    const r = replay(h1, [{ h: 0, d: 2 }]);
    expect(r.legs[0].sailedTo.x).toBeCloseTo(p.x, 5);
    expect(r.legs[0].sailedTo.y).toBeCloseTo(p.y - 2, 5);
    expect(r.legs[0].to.x).toBeCloseTo(p.x + h1.current.east, 5);
    expect(r.legs[0].to.y).toBeCloseTo(p.y - 2 - h1.current.north, 5);
  });

  it("running out of supplies ends the voyage with no stars", () => {
    const moves = Array.from({ length: 30 }, (_, i) => ({ h: i % 2 ? "N" : "S", d: 1 }));
    const r = replay(s1, moves);
    expect(r.lost).toBe(true);
    expect(r.arrived).toBe(false);
    expect(r.stars).toBe(0);
    expect(r.legs.length).toBe(10);
  });

  it("stars follow the thresholds", () => {
    for (const l of ALL) {
      expect(starsFor(l, false, 99)).toBe(0);
      expect(starsFor(l, true, -0.1)).toBe(0);
      expect(starsFor(l, true, 0)).toBe(1);
      expect(starsFor(l, true, l.stars2)).toBe(2);
      expect(starsFor(l, true, l.stars3)).toBe(3);
    }
  });

  it("legs must fit the band", () => {
    expect(cleanLeg(s1, { h: "NE", d: 2 })).toBeNull();
    expect(cleanLeg(s1, { h: 90, d: 2 })).toBeNull();
    expect(cleanLeg(s1, { h: "E", d: 2.5 })).toBeNull();
    expect(cleanLeg(levelById("vy-a1")!, { h: "NE", d: 2 })).not.toBeNull();
    const h1 = levelById("vy-h1")!;
    expect(cleanLeg(h1, { h: "N", d: 2 })).toBeNull();
    expect(cleanLeg(h1, { h: 45.4, d: 3.04 })).toMatchObject({ bearing: 45, dist: 3 });
    expect(cleanLeg(h1, { h: 360, d: 3 })).toMatchObject({ bearing: 0 });
    expect(cleanLeg(h1, { h: 400, d: 3 })).toBeNull();
    expect(cleanLeg(h1, { h: 10, d: 0.5 })).toBeNull();
    expect(cleanLeg(h1, { h: 10, d: 99 })).toBeNull();
  });
});

describe("Voyage of Discovery: replays and junk", () => {
  it("replays are deterministic", () => {
    for (const l of ALL) {
      const plan = solve(l)!.legs;
      expect(JSON.stringify(replay(l, plan))).toBe(JSON.stringify(replay(l, JSON.parse(JSON.stringify(plan)))));
      expect(game.score(l.id, plan)).toEqual(game.score(l.id, plan));
    }
  });

  it("garbage moves score 0 without throwing", () => {
    const junk: unknown[] = [
      null,
      undefined,
      42,
      "N5",
      {},
      [],
      [null, 1, "x", [], {}],
      [{ h: "Q", d: 3 }],
      [{ h: "N", d: "lots" }],
      [{ h: "N", d: Infinity }],
      [{ h: NaN, d: NaN }],
      [{ h: { toString: () => "N" }, d: 3 }],
      Array.from({ length: 5000 }, () => ({ h: "E", d: 1e9 })),
      Array.from({ length: 5000 }, () => ({ h: "N", d: 1 })),
    ];
    for (const l of ALL)
      for (const m of junk) {
        expect(() => game.score(l.id, m)).not.toThrow();
        expect(game.score(l.id, m)!.stars).toBe(0);
      }
    expect(game.score("nope", [])).toBeNull();
  });
});
