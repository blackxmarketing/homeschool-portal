import { describe, expect, it } from "vitest";
import {
  ALL_COIN_LEVELS,
  COIN_LEVELS,
  MAX_TRIES,
  awningGrid,
  billGrid,
  budgetPicks,
  checkTry,
  cleanMoves,
  coinGrid,
  coinShop,
  coinShopInfo,
  countUp,
  countUpLine,
  counterGrid,
  fewestCoins,
  fmt,
  levelById,
  perfectMoves,
  priceOf,
  promptFor,
  replay,
  solveRound,
  speakable,
  starsFor,
  sum,
  sumLine,
  targetOf,
  teachFor,
  type RoundMove,
} from "@/lib/minigames/coinshop";
import { gameById, levelsForKid } from "@/lib/minigames";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

describe("coin shop levels", () => {
  it("has 3 levels for grades 2 and 3, unique ids with the grade, 5-8 rounds, skill named", () => {
    expect(coinShop.grades).toEqual([2, 3]);
    for (const g of coinShopInfo.grades) {
      expect(COIN_LEVELS[g]).toHaveLength(3);
      expect(coinShop.levelsForGrade!(g)).toHaveLength(3);
      for (const l of COIN_LEVELS[g]) {
        expect(l.id.startsWith(`g${g}-`)).toBe(true);
        expect(l.grade).toBe(g);
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/^Skill/);
        expect(l.intro).toMatch(/\d\.(MD|NBT|OA)\./);
        for (const r of l.rounds) expect(promptFor(l, r) + l.intro + l.title).not.toMatch(BANNED);
      }
    }
    expect(new Set(ALL_COIN_LEVELS.map((l) => l.id)).size).toBe(ALL_COIN_LEVELS.length);
    expect(coinShop.levelsForGrade!(4)).toEqual([]);
    expect(coinShop.levels("sprout")).toEqual([]);
    expect(gameById("coinshop")).toBe(coinShop);
    expect(levelsForKid(coinShop, 3).map((l) => l.id)).toEqual(["g3-1", "g3-2", "g3-3"]);
  });

  it("grade 2 uses coins and $1 bills only; grade 3 adds change from $1, $5 and $10", () => {
    for (const l of COIN_LEVELS[2]) {
      expect(l.money.every((d) => [1, 5, 10, 25, 100].includes(d))).toBe(true);
      expect(l.rounds.every((r) => r.kind === "pay" || r.kind === "count")).toBe(true);
    }
    const g3 = COIN_LEVELS[3].flatMap((l) => l.rounds);
    const paids = new Set(g3.flatMap((r) => (r.kind === "change" ? [r.paid] : [])));
    expect([...paids].sort((a, b) => a - b)).toEqual(expect.arrayContaining([100, 500, 1000]));
    for (const k of ["change", "add", "compare", "budget"]) expect(g3.some((r) => r.kind === k)).toBe(true);
  });

  it("every round is solvable with the level's money, and gets harder each grade", () => {
    for (const l of ALL_COIN_LEVELS)
      for (const r of l.rounds) {
        if (r.kind === "pay") expect(fewestCoins(priceOf(r.items), l.money).length).toBeGreaterThan(0);
        if (r.kind === "count") expect(r.coins.every((c) => l.money.includes(c))).toBe(true);
        if (r.kind === "change") {
          expect(r.paid).toBeGreaterThan(priceOf(r.items));
          expect(fewestCoins(r.paid, l.money).every((d) => d >= 100)).toBe(true);
          expect(fewestCoins(targetOf(r), l.money).length).toBeGreaterThan(0);
        }
        if (r.kind === "compare") expect(priceOf(r.a)).not.toBe(priceOf(r.b));
        if (r.kind === "budget") {
          expect(budgetPicks(r).length).toBeGreaterThan(0);
          // some picks don't fit, so the kid has to think
          const all = r.shelf.map((s) => s.price).sort((a, b) => b - a);
          expect(sum(all.slice(0, r.need))).toBeGreaterThan(r.budget);
        }
      }
    const biggest = (g: number) => Math.max(...COIN_LEVELS[g].flatMap((l) => l.rounds.map(targetOf)));
    expect(biggest(2)).toBeLessThanOrEqual(300);
    expect(biggest(3)).toBeGreaterThan(biggest(2));
  });
});

describe("coin shop money math", () => {
  it("formats and counts U.S. money", () => {
    expect(fmt(45)).toBe("45¢");
    expect(fmt(135)).toBe("$1.35");
    expect(fmt(100)).toBe("$1.00");
    expect(sumLine([10, 25, 25])).toBe("25 + 25 + 10 = 60¢");
    expect(sumLine([10, 100, 25])).toBe("$1 + 25¢ + 10¢ = $1.35");
    expect(fewestCoins(41, [1, 5, 10, 25])).toEqual([25, 10, 5, 1]);
    expect(fewestCoins(90, [1, 5, 10, 25])).toEqual([25, 25, 25, 10, 5]);
    expect(fewestCoins(7, [5, 10])).toEqual([]);
  });

  it("counts up from the price, small coins first", () => {
    expect(countUp(65, 100, [1, 5, 10, 25, 100])).toEqual({ coins: [10, 25], steps: [65, 75, 100] });
    expect(countUp(37, 100, [1, 5, 10, 25])).toEqual({ coins: [1, 1, 1, 10, 25, 25], steps: [37, 38, 39, 40, 50, 75, 100] });
    expect(countUpLine(645, 1000, [1, 5, 10, 25, 100, 500])).toBe("Start at $6.45. +5¢ → $6.50, +25¢ → $6.75, +25¢ → $7.00, +$1 → $8.00, +$1 → $9.00, +$1 → $10.00. Change: $3.55.");
  });

  it("reads money aloud in words", () => {
    expect(speakable("The kite costs $1.35.")).toBe("The kite costs 1 dollar and 35 cents.");
    expect(speakable("Pay 45¢ with $5")).toBe("Pay 45 cents with 5 dollars");
    expect(speakable("$2.00")).toBe("2 dollars");
  });

  it("draws coins to scale and bills wider than coins", () => {
    const w = (d: number) => coinGrid(d).w;
    expect(w(10)).toBeLessThan(w(1));
    expect(w(1)).toBeLessThan(w(5));
    expect(w(5)).toBeLessThan(w(25));
    expect(billGrid(100).w).toBeGreaterThan(w(25));
    expect(awningGrid(64).w).toBe(64);
    expect(counterGrid(64).runs().length).toBeGreaterThan(0);
  });
});

describe("coin shop feedback", () => {
  const g22 = levelById("g2-2")!;
  const cookie = g22.rounds[1]; // pay 35¢, fewest coins

  it("explains too little, too much and not-fewest, and accepts the fewest coins", () => {
    expect(checkTry(g22, cookie, { coins: [25, 5] }).note).toMatch(/5¢ too little/);
    expect(checkTry(g22, cookie, { coins: [25, 25] }).note).toMatch(/15¢ too much/);
    const many = checkTry(g22, cookie, { coins: [10, 10, 10, 5] });
    expect(many.ok).toBe(false);
    expect(many.note).toMatch(/can be done with 2/);
    const best = checkTry(g22, cookie, { coins: [10, 25] });
    expect(best.ok).toBe(true);
    expect(best.note).toContain("25 + 10 = 35¢");
    // a quarter isn't in the grade 2 level 1 drawer
    const g21 = levelById("g2-1")!;
    expect(checkTry(g21, g21.rounds[3], { coins: [25] }).ok).toBe(false);
    // without the fewest rule, any exact pay works
    expect(checkTry(g21, g21.rounds[3], { coins: [10, 10, 1, 1, 1, 1, 1] }).ok).toBe(true);
  });

  it("teaches counting up for change", () => {
    const g31 = levelById("g3-1")!;
    const apple = g31.rounds[0]; // 65¢ from $1
    expect(checkTry(g31, apple, { coins: [25] }).note).toMatch(/65¢ \+ 25¢ = 90¢.*add 10¢ more/);
    expect(checkTry(g31, apple, { coins: [10, 10, 10, 5] }).ok).toBe(true);
    expect(teachFor(g31, apple)[0]).toBe("Start at 65¢. +10¢ → 75¢, +25¢ → $1.00. Change: 35¢.");
  });

  it("checks compare and budget rounds step by step", () => {
    const g32 = levelById("g3-2")!;
    const cmp = g32.rounds[3];
    expect(checkTry(g32, cmp, { pick: 1, amount: 15 }).ok).toBe(false);
    expect(checkTry(g32, cmp, { pick: 0, amount: 20 }).note).toMatch(/Right basket/);
    expect(checkTry(g32, cmp, { pick: 0, amount: 15 }).ok).toBe(true);
    const g33 = levelById("g3-3")!;
    const bud = g33.rounds[0];
    if (bud.kind !== "budget") throw new Error("expected budget");
    expect(checkTry(g33, bud, { items: [0, 1, 4], amount: 0 }).note).toMatch(/more than \$5\.00/);
    expect(checkTry(g33, bud, { items: [0, 0, 1], amount: 0 }).ok).toBe(false);
    expect(checkTry(g33, bud, { items: [1, 2, 3], amount: 80 }).ok).toBe(true); // 175 + 150 + 95 = 420
    expect(checkTry(g33, bud, { items: [1, 2, 3], amount: 70 }).note).toMatch(/that fits/);
  });
});

describe("coin shop scoring", () => {
  it("every level can reach 3 stars, and replays are deterministic", () => {
    for (const l of ALL_COIN_LEVELS) {
      const moves = perfectMoves(l);
      for (let i = 0; i < l.rounds.length; i++) expect(checkTry(l, l.rounds[i], solveRound(l, l.rounds[i])).ok).toBe(true);
      const a = coinShop.score(l.id, moves);
      expect(a).toEqual({ stars: 3, best: l.rounds.length * 2 });
      expect(coinShop.score(l.id, JSON.parse(JSON.stringify(moves)))).toEqual(a);
    }
  });

  it("stars follow the rules: 2 points first try, 1 later, 0 after 3 misses", () => {
    const l = levelById("g2-1")!;
    const good = perfectMoves(l);
    const wrong = { amount: 99999 };
    // every round right on the second try: half points -> 1 star
    const second: RoundMove[] = good.map((m) => ({ tries: [wrong, ...m.tries] }));
    const r2 = replay(l, second);
    expect(r2.points).toBe(l.rounds.length);
    expect(r2.stars).toBe(starsFor(r2.points, r2.max));
    expect(r2.stars).toBe(1);
    // right only after MAX_TRIES misses doesn't count
    const late: RoundMove[] = good.map((m) => ({ tries: [...Array(MAX_TRIES).fill(wrong), ...m.tries] }));
    expect(replay(l, late).points).toBe(0);
    // one round on the second try still keeps 3 stars (11 of 12)
    const one = [...good];
    one[0] = second[0];
    expect(replay(l, one).stars).toBe(3);
    expect(starsFor(0, 0)).toBe(0);
  });

  it("garbage moves score 0 without throwing; unknown levels are null", () => {
    const l = levelById("g3-3")!;
    for (const junk of [null, undefined, 42, "x", {}, [null], [{ tries: "no" }], [{ tries: [{ coins: ["a", 1e9, -5], amount: "5", pick: 7, items: [1.5, -1] }] }], Array(500).fill({ tries: [{}] })]) {
      expect(() => coinShop.score(l.id, junk)).not.toThrow();
      expect(coinShop.score(l.id, junk)).toEqual({ stars: 0, best: 0 });
    }
    expect(cleanMoves([{ tries: [{ coins: [25, "x"] }] }])[0].tries[0].coins).toEqual([25, -1]);
    expect(coinShop.score("nope", [])).toBeNull();
    expect(coinShop.score("g4-1", perfectMoves(l))).toBeNull();
  });

  it("a fake 'right amount' with coins not in the drawer doesn't count", () => {
    const l = levelById("g2-1")!;
    const moves = perfectMoves(l).map((m, i) => (l.rounds[i].kind === "pay" ? { tries: [{ coins: [7, 5] }] } : m));
    expect(replay(l, moves).points).toBe(6); // only the 3 count rounds
  });
});
