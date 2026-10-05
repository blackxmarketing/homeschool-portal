import { describe, expect, it } from "vitest";
import { bestPossible, demand, forecast, LEMONADE_LEVELS, replay, starsFor } from "@/lib/minigames/lemonade";
import { gameById } from "@/lib/minigames";

const ALL = Object.values(LEMONADE_LEVELS).flat();

/** The greedy best plan: each day, the price and cups that earn the most. */
function bestMoves(level: (typeof ALL)[number]) {
  const moves: { made: number; price: number }[] = [];
  for (let d = 0; d < level.days; d++) {
    let best = { profit: -Infinity, made: 0, price: 0 };
    for (let cents = 5; cents <= level.maxPrice * 100; cents += 5) {
      const price = cents / 100;
      const made = demand(forecast(level)[d], price, level.maxPrice);
      const r = replay(level, [...moves, { made, price }]).days[d];
      if (r.profit > best.profit) best = { profit: r.profit, made, price };
    }
    moves.push({ made: best.made, price: best.price });
  }
  return moves;
}

describe("Lemonade Stand", () => {
  it("has 3 levels per band", () => {
    for (const band of ["sprout", "adventurer", "strategist"] as const) expect(LEMONADE_LEVELS[band]).toHaveLength(3);
  });

  it("every level can reach 3 stars", () => {
    for (const level of ALL) {
      expect(starsFor(bestPossible(level), level.goal), level.id).toBe(3);
      expect(replay(level, bestMoves(level)).stars, level.id).toBe(3);
    }
  });

  it("replays are deterministic", () => {
    for (const level of ALL) {
      const m = bestMoves(level);
      expect(replay(level, m)).toEqual(replay(level, m));
    }
  });

  it("server scoring treats garbage as no sales and never throws", () => {
    const game = gameById("lemonade")!;
    const id = ALL[0].id;
    for (const junk of [null, "x", 42, {}, [null, "a", { made: "lots" }], [{ made: NaN, price: Infinity }], Array(500).fill({ made: 1e9, price: -5 })]) {
      const r = game.score(id, junk);
      expect(r).not.toBeNull();
      expect(r!.stars).toBe(0);
    }
    expect(game.score("nope", [])).toBeNull();
  });

  it("stars follow the goal multiples", () => {
    expect(starsFor(9.99, 10)).toBe(0);
    expect(starsFor(10, 10)).toBe(1);
    expect(starsFor(13.5, 10)).toBe(2);
    expect(starsFor(18, 10)).toBe(3);
  });
});
