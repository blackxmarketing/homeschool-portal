import { describe, expect, it } from "vitest";
import { fly, levelById, replay, rocketLaunch, ROCKET_LEVELS, solve, starsFor, thrustFor } from "@/lib/minigames/rocket";
import { gameById } from "@/lib/minigames";

const all = Object.values(ROCKET_LEVELS).flat();

describe("rocket launch", () => {
  it("is registered with 3 levels per band", () => {
    expect(gameById("rocket")).toBeTruthy();
    for (const band of ["sprout", "adventurer", "strategist"] as const) expect(rocketLaunch.levels(band)).toHaveLength(3);
  });

  it("uses correct physics", () => {
    const s1 = levelById("s1")!;
    // m = 2 kg, g = 10: W = 20 N; T = 40 N → F = 20 N, a = 10 m/s²; 2 s burn → 20 m at 20 m/s, coast 20 m.
    const f = fly(s1, 40, 0);
    expect(f.weight).toBe(20);
    expect(f.accel).toBe(10);
    expect(f.hBurn).toBe(20);
    expect(f.hCoast).toBe(20);
    expect(f.peak).toBe(40);
    expect(fly(s1, 20, 0).liftoff).toBe(false);
    expect(fly(s1, 10, 0).peak).toBe(0);
  });

  it("thrustFor inverts the flight model", () => {
    for (const l of all) {
      const target = (l.lo + l.hi) / 2;
      const p = l.payload.min;
      const T = thrustFor(l, p, target);
      expect(fly(l, T, p).peak).toBeCloseTo(target, 0);
    }
  });

  it("every level can reach 3 stars on the first launch", () => {
    for (const l of all) {
      const s = solve(l);
      expect(s, l.id).not.toBeNull();
      expect(rocketLaunch.score(l.id, [s])).toEqual({ stars: 3, best: 5 });
    }
  });

  it("strategist levels are solvable by rounding the computed thrust", () => {
    for (const l of ROCKET_LEVELS.strategist) {
      const T = Math.round(thrustFor(l, 0, (l.lo + l.hi) / 2));
      expect(rocketLaunch.score(l.id, [{ thrust: T, payload: 0 }])!.stars, l.id).toBe(3);
    }
  });

  it("stars follow the attempts rule", () => {
    expect([1, 2, 3, 4, 5, 6, null].map((n) => starsFor(n))).toEqual([3, 2, 1, 1, 1, 0, 0]);
    const l = levelById("s2")!;
    const hit = solve(l)!;
    const miss = { thrust: 50, payload: 0 };
    expect(rocketLaunch.score("s2", [miss, hit])!.stars).toBe(2);
    expect(rocketLaunch.score("s2", [miss, miss, hit])!.stars).toBe(1);
    expect(rocketLaunch.score("s2", [miss, miss, miss, miss, hit])!.stars).toBe(1);
    expect(rocketLaunch.score("s2", [miss, miss, miss, miss, miss, hit])!.stars).toBe(0);
    // Launches after the first hit don't matter.
    expect(rocketLaunch.score("s2", [hit, miss, miss])!.stars).toBe(3);
  });

  it("enforces the mission's mass rules", () => {
    // a3 needs at least 6 kg: a lighter payload is raised to the minimum.
    const l = levelById("a3")!;
    expect(fly(l, 300, 0).payload).toBe(0);
    expect(replay(l, [{ thrust: 300, payload: 0 }]).flights[0]!.payload).toBe(6);
    // a2's engine is fixed at 300 N whatever is sent.
    expect(replay(levelById("a2")!, [{ thrust: 9999, payload: 4 }]).flights[0]!.thrust).toBe(300);
  });

  it("replays are deterministic", () => {
    for (const l of all) {
      const moves = [{ thrust: l.thrust.max / 3, payload: l.payload.max }, solve(l)];
      expect(replay(l, moves)).toEqual(replay(l, JSON.parse(JSON.stringify(moves))));
    }
  });

  it("garbage moves score 0 without throwing", () => {
    const junk: unknown[] = [null, undefined, 42, "boom", {}, [], [null], [{ thrust: "abc" }], [{ thrust: NaN, payload: Infinity }], [{ thrust: -5 }], [{ thrust: 1e12 }], [[1, 2]], [{ thrust: {} }]];
    for (const l of all)
      for (const m of junk) {
        const r = rocketLaunch.score(l.id, m);
        expect(r, `${l.id} ${JSON.stringify(m)}`).toEqual({ stars: 0, best: 0 });
      }
    expect(rocketLaunch.score("nope", [])).toBeNull();
  });
});
