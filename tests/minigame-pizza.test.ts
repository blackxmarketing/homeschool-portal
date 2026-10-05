import { describe, expect, it } from "vitest";
import {
  PIZZA_LEVELS,
  pizzaParty,
  levelById,
  replay,
  perfectMoves,
  parseNumber,
  checkAnswer,
  simplestCut,
  cutWorks,
  shareOf,
  mixed,
  starsFor,
  pizzaGrid,
  type RoundMove,
} from "@/lib/minigames/pizza";

const all = Object.values(PIZZA_LEVELS).flat();

describe("pizza party levels", () => {
  it("has 3 levels per band, unique ids, and every round has a simplest cut", () => {
    for (const band of ["sprout", "adventurer", "strategist"] as const) {
      expect(PIZZA_LEVELS[band]).toHaveLength(3);
      expect(pizzaParty.levels(band)).toHaveLength(3);
    }
    expect(new Set(all.map((l) => l.id)).size).toBe(all.length);
    for (const l of all)
      for (const r of l.rounds) {
        expect(simplestCut(r), `${l.id} ${r.pizzas}/${r.friends}`).toBeDefined();
        // the share is never a whole number (there's always something to cut)
        expect(shareOf(r).d).toBeGreaterThan(1);
      }
  });

  it("every level can reach 3 stars", () => {
    for (const l of all) {
      const r = pizzaParty.score(l.id, perfectMoves(l));
      expect(r, l.id).toEqual({ stars: 3, best: l.rounds.length * 3 });
    }
  });

  it("replays are deterministic", () => {
    for (const l of all) {
      const m = perfectMoves(l);
      expect(replay(l, m)).toEqual(replay(l, JSON.parse(JSON.stringify(m))));
    }
  });

  it("garbage moves score 0 without throwing", () => {
    const junk: unknown[] = [null, undefined, 42, "hi", {}, [], [null], [{ cut: "4" }], [{ cut: 4, plates: "x", answers: 7 }], [{ cut: 1e9, plates: [1e9], answers: [{ fraction: {} }] }], [[[[]]]]];
    for (const l of all)
      for (const j of junk) {
        expect(() => pizzaParty.score(l.id, j)).not.toThrow();
        expect(pizzaParty.score(l.id, j)!.stars).toBe(0);
      }
    expect(pizzaParty.score("nope", [])).toBeNull();
  });

  it("unfair plates or a cut that doesn't divide evenly earn nothing", () => {
    const l = levelById("s1")!;
    const good = perfectMoves(l);
    const unfair: RoundMove[] = good.map((m) => ({ ...m, plates: m.plates.map((n, i) => (i === 0 ? n + 1 : n)) }));
    expect(replay(l, unfair).points).toBe(0);
    // 1 pizza for 4 friends cut in thirds: 3 slices can't be shared by 4
    expect(cutWorks({ pizzas: 1, friends: 4 }, 3)).toBe(false);
    const badCut = [...good];
    badCut[1] = { cut: 3, plates: [1, 1, 1, 0], answers: [{ fraction: "1/4" }] };
    expect(replay(l, badCut).rounds[1].points).toBe(0);
  });
});

describe("stars follow the rules", () => {
  it("a bigger cut gives an equivalent share but loses the simplest-cut point", () => {
    const l = levelById("s1")!; // 1/2, 1/4, 3/4
    const m = perfectMoves(l);
    m[0] = { cut: 4, plates: [2, 2], answers: [{ fraction: "2/4" }] };
    const r = replay(l, m);
    expect(r.rounds[0]).toMatchObject({ fair: true, rightOn: 0, simplest: false, points: 2 });
    expect(r.points).toBe(8);
    expect(r.stars).toBe(2); // 8 of 9 is below 90%
  });

  it("answer tries: sprout gets 3 free tries, adventurer 2", () => {
    const s = levelById("s1")!;
    const m = perfectMoves(s);
    m[0].answers = [{ fraction: "1/3" }, { fraction: "2/1" }, { fraction: "1/2" }];
    expect(replay(s, m).rounds[0].points).toBe(3);
    const a = levelById("a1")!;
    const n = perfectMoves(a);
    n[0].answers = [{ fraction: "1/2" }, { fraction: "2/3" }, { fraction: "3/2" }];
    expect(replay(a, n).rounds[0]).toMatchObject({ rightOn: 2, points: 2 });
  });

  it("strategist needs simplest form and a decimal", () => {
    const h = levelById("h1")!; // 6 pizzas, 8 friends = 3/4
    const r = h.rounds[0];
    expect(checkAnswer(h, r, { fraction: "6/8", decimal: "0.75" }).correct).toBe(false);
    expect(checkAnswer(h, r, { fraction: "3/4" }).correct).toBe(false);
    expect(checkAnswer(h, r, { fraction: "3/4", decimal: "0.75" }).correct).toBe(true);
    expect(checkAnswer(h, r, { fraction: "0.75", decimal: "0.75" }).correct).toBe(false);
    const h2 = levelById("h2")!;
    const twoThirds = { pizzas: 8, friends: 12 };
    expect(checkAnswer(h2, twoThirds, { fraction: "2/3", decimal: "0.67" }).correct).toBe(true);
    expect(checkAnswer(h2, twoThirds, { fraction: "2/3", decimal: "0.667" }).correct).toBe(true);
    expect(checkAnswer(h2, twoThirds, { fraction: "2/3", decimal: "0.66" }).correct).toBe(false);
    expect(checkAnswer(h2, twoThirds, { fraction: "2/3", decimal: "0.7" }).correct).toBe(false);
    const sevenEighths = { pizzas: 7, friends: 8 };
    expect(checkAnswer(h2, sevenEighths, { fraction: "7/8", decimal: "0.875" }).correct).toBe(true);
    expect(checkAnswer(h2, sevenEighths, { fraction: "7/8", decimal: "0.88" }).correct).toBe(true);
    const elevenSixths = { pizzas: 11, friends: 6 };
    expect(checkAnswer(h2, elevenSixths, { fraction: "1 5/6", decimal: "1.83" }).correct).toBe(true);
    expect(checkAnswer(h2, elevenSixths, { fraction: "11/6", decimal: "1.83" }).correct).toBe(true);
  });

  it("star thresholds", () => {
    expect(starsFor(9, 9)).toBe(3);
    expect(starsFor(11, 12)).toBe(3);
    expect(starsFor(8, 9)).toBe(2);
    expect(starsFor(6, 9)).toBe(2);
    expect(starsFor(3, 9)).toBe(1);
    expect(starsFor(2, 9)).toBe(0);
  });
});

describe("fractions", () => {
  it("reads fractions, mixed numbers and decimals", () => {
    expect(parseNumber("3/4")).toMatchObject({ value: { n: 3, d: 4 }, form: "fraction", simplest: true });
    expect(parseNumber(" 1 2/3 ")).toMatchObject({ value: { n: 5, d: 3 }, form: "mixed", simplest: true });
    expect(parseNumber("1-2/4")).toMatchObject({ value: { n: 6, d: 4 }, simplest: false });
    expect(parseNumber("0.75")).toMatchObject({ value: { n: 75, d: 100 }, form: "decimal" });
    expect(parseNumber(".5")).toMatchObject({ value: { n: 5, d: 10 } });
    expect(parseNumber("1 5/3")).toBeNull();
    expect(parseNumber("1/0")).toBeNull();
    expect(parseNumber("pizza")).toBeNull();
    expect(parseNumber(12)).toBeNull();
  });

  it("accepts equivalent fractions and exact decimals in sprout and adventurer", () => {
    const a = levelById("a2")!;
    const r = { pizzas: 7, friends: 4 };
    for (const f of ["7/4", "1 3/4", "14/8", "1.75", "1 6/8"]) expect(checkAnswer(a, r, { fraction: f }).correct, f).toBe(true);
    for (const f of ["4/7", "1 1/4", "2", "1.7"]) expect(checkAnswer(a, r, { fraction: f }).correct, f).toBe(false);
    expect(checkAnswer(a, r, { fraction: "4/7" }).note).toMatch(/upside down/);
  });

  it("writes mixed numbers", () => {
    expect(mixed({ n: 7, d: 4 })).toBe("1 3/4");
    expect(mixed({ n: 6, d: 8 })).toBe("3/4");
    expect(mixed({ n: 4, d: 2 })).toBe("2");
  });

  it("draws a pizza with missing slices", () => {
    const full = pizzaGrid(4, 4).px.filter(Boolean).length;
    const half = pizzaGrid(4, 2, 26, false).px.filter(Boolean).length;
    expect(half).toBeLessThan(full);
    expect(half).toBeGreaterThan(full / 3);
  });
});
