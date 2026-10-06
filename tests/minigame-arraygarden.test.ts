import { describe, expect, it } from "vitest";
import {
  ALL_GARDEN_LEVELS,
  GARDEN_LEVELS,
  MAX_TRIES,
  arrayGarden,
  arrayGardenInfo,
  asksFor,
  buildOk,
  cleanMoves,
  factorPairs,
  flowerGrid,
  gridOf,
  isPrime,
  levelById,
  miniArrayGrid,
  perfectMoves,
  playRound,
  promptFor,
  replay,
  starsFor,
  targetOf,
  teachFor,
  tensSplit,
  wrongPlantNote,
  type RoundMove,
} from "@/lib/minigames/arraygarden";
import { gameById, levelsForKid } from "@/lib/minigames";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

describe("array garden levels", () => {
  it("has 3 levels for grades 2, 3 and 4 with unique ids, 5-8 rounds and the skill named", () => {
    expect(arrayGarden.grades).toEqual([2, 3, 4]);
    for (const g of arrayGardenInfo.grades) {
      expect(GARDEN_LEVELS[g]).toHaveLength(3);
      expect(arrayGarden.levelsForGrade!(g)).toHaveLength(3);
      for (const l of GARDEN_LEVELS[g]) {
        expect(l.id.startsWith(`g${g}-`)).toBe(true);
        expect(l.grade).toBe(g);
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/^Skill/);
        expect(l.intro).toMatch(/\d\.[A-Z]{1,3}\./); // names the standard
        expect(l.intro + l.title).not.toMatch(BANNED);
      }
    }
    expect(new Set(ALL_GARDEN_LEVELS.map((l) => l.id)).size).toBe(ALL_GARDEN_LEVELS.length);
    expect(arrayGarden.levelsForGrade!(5)).toEqual([]);
    expect(arrayGarden.levels("sprout")).toEqual([]);
    expect(gameById("arraygarden")).toBe(arrayGarden);
    expect(levelsForKid(arrayGarden, 3).map((l) => l.id)).toEqual(["g3-1", "g3-2", "g3-3"]);
  });

  it("every array fits its garden, divides evenly, and grade 2 stays within 5 by 5", () => {
    for (const l of ALL_GARDEN_LEVELS)
      for (const r of l.rounds) {
        const t = targetOf(r);
        const g = gridOf(l, r);
        if (t) {
          expect(Number.isInteger(t.cols), l.id).toBe(true);
          expect(t.rows).toBeLessThanOrEqual(g.h);
          expect(t.cols).toBeLessThanOrEqual(g.w);
          if (l.grade === 2) expect(Math.max(t.rows, t.cols)).toBeLessThanOrEqual(5);
        }
        if (r.kind === "factors") for (const [a, b] of factorPairs(r.n)) expect(a <= g.h && b <= g.w).toBe(true);
        if (r.kind === "model") {
          expect(r.cols).toBeGreaterThanOrEqual(10);
          expect(r.cols).toBeLessThan(100);
          expect(r.rows).toBeLessThan(10);
          expect(r.cols % 10).not.toBe(0);
        }
        expect(promptFor(l, r).length).toBeGreaterThan(10);
        expect(promptFor(l, r)).not.toMatch(BANNED);
      }
  });

  it("gets harder: bigger products each grade", () => {
    const biggest = (g: number) =>
      Math.max(
        ...GARDEN_LEVELS[g].flatMap((l) =>
          l.rounds.map((r) => (r.kind === "factors" ? r.n : r.kind === "share" ? r.total : r.kind === "side" ? r.area : r.rows * r.cols)),
        ),
      );
    expect(biggest(3)).toBeGreaterThan(biggest(2));
    expect(biggest(4)).toBeGreaterThan(biggest(3));
  });
});

describe("array garden math", () => {
  it("knows factor pairs and primes", () => {
    expect(factorPairs(24)).toEqual([
      [1, 24],
      [2, 12],
      [3, 8],
      [4, 6],
    ]);
    expect(factorPairs(16)).toEqual([
      [1, 16],
      [2, 8],
      [4, 4],
    ]);
    expect([7, 13, 17].every(isPrime)).toBe(true);
    expect([9, 15, 21, 1].some(isPrime)).toBe(false);
  });

  it("checks plantings for each kind of round", () => {
    const g3 = levelById("g3-1")!;
    expect(buildOk(g3.rounds[0], 3, 4)).toBe(true); // 3 rows of 4
    expect(buildOk(g3.rounds[0], 4, 3)).toBe(false);
    expect(buildOk(g3.rounds[2], 3, 4)).toBe(true); // share 12 into 3 rows
    const turn = levelById("g3-2")!.rounds[0]; // 2 rows of 6 -> 6 rows of 2
    expect(buildOk(turn, 6, 2)).toBe(true);
    expect(buildOk(turn, 2, 6)).toBe(false);
    const side = levelById("g4-3")!.rounds[2]; // area 36, 4 rows
    expect(buildOk(side, 4, 9)).toBe(true);
    expect(asksFor(levelById("g4-3")!, side).map((a) => a.answer)).toEqual([9, 26]);
  });

  it("writes the sentence and why", () => {
    const g2 = levelById("g2-1")!;
    expect(asksFor(g2, g2.rounds[0])[0].q).toBe("3 + 3 = ?");
    expect(teachFor(g2, g2.rounds[1])).toBe("3 rows of 2: 2 + 2 + 2 = 6 flowers.");
    const g3 = levelById("g3-3")!;
    expect(teachFor(g3, g3.rounds[0], 5)).toBe("6 × 7 = (6 × 5) + (6 × 2) = 30 + 12 = 42.");
    expect(asksFor(g3, g3.rounds[0], 5).map((a) => a.answer)).toEqual([30, 12, 42]);
    const turn = levelById("g3-2")!;
    expect(teachFor(turn, turn.rounds[0])).toMatch(/2 × 6 = 12 and 6 × 2 = 12/);
    const g4 = levelById("g4-3")!;
    expect(tensSplit(23)).toBe(20);
    expect(teachFor(g4, g4.rounds[4], 20)).toMatch(/4 × 23 = \(4 × 20\) \+ \(4 × 3\) = 80 \+ 12 = 92\. Tens and ones/);
    expect(teachFor(g4, g4.rounds[0])).toMatch(/Perimeter = 6 \+ 4 \+ 6 \+ 4 = 20/);
    const p = levelById("g4-2")!;
    expect(teachFor(p, p.rounds[2])).toMatch(/13 is prime/);
    expect(teachFor(p, p.rounds[1])).toMatch(/9 is composite/);
    expect(wrongPlantNote(levelById("g4-1")!, levelById("g4-1")!.rounds[4], 5, 5)).toMatch(/5 is not a factor of 24/);
    for (const l of ALL_GARDEN_LEVELS) for (const r of l.rounds) for (const a of asksFor(l, r, 1)) expect(a.hint).not.toContain(String(a.answer) + ".");
  });

  it("draws the pixel sprites", () => {
    const f = flowerGrid("#ff6b6b");
    expect(f.w).toBe(10);
    expect(f.runs().length).toBeGreaterThan(5);
    expect(miniArrayGrid(2, 6).w).toBe(19);
  });
});

describe("array garden scoring", () => {
  it("a perfect game earns 3 stars on every level", () => {
    for (const l of ALL_GARDEN_LEVELS) {
      const r = replay(l, perfectMoves(l));
      expect(r.rounds.every((x) => x.done), l.id).toBe(true);
      expect(r.points, l.id).toBe(r.max);
      expect(r.stars).toBe(3);
      expect(arrayGarden.score(l.id, perfectMoves(l))).toEqual({ stars: 3, best: r.max });
    }
  });

  it("replays are deterministic and survive a JSON round trip", () => {
    for (const l of ALL_GARDEN_LEVELS) {
      const m = JSON.parse(JSON.stringify(perfectMoves(l)));
      expect(arrayGarden.score(l.id, m)).toEqual(arrayGarden.score(l.id, m));
      expect(replay(l, m)).toEqual(replay(l, perfectMoves(l)));
    }
  });

  it("garbage moves score 0 without throwing; unknown levels return null", () => {
    const junk: unknown[] = [
      null,
      undefined,
      5,
      "x",
      {},
      [1, 2],
      [{ plants: "3x4" }],
      [{ plants: [[NaN, Infinity], [1e9, -3], "row", null, [2.5, 3]], answers: [NaN, "12", null, {}, 1e9], split: -1 }],
      [{ plants: Array(10000).fill([1, 1]), answers: Array(10000).fill(0) }],
    ];
    for (const l of ALL_GARDEN_LEVELS)
      for (const j of junk) {
        const s = arrayGarden.score(l.id, j);
        expect(s).not.toBeNull();
        expect(s!.stars).toBe(0);
      }
    expect(arrayGarden.score("nope", perfectMoves(ALL_GARDEN_LEVELS[0]))).toBeNull();
    expect(cleanMoves("bad")).toEqual([]);
  });

  it("stars follow the rules: right planting first +1, questions first try +2", () => {
    const l = levelById("g3-1")!; // round 0: 3 rows of 4
    const perfect = perfectMoves(l);
    const one = (m: RoundMove) => replay(l, [m, ...perfect.slice(1)]).rounds[0].points;
    expect(one({ plants: [[3, 4]], answers: [12] })).toBe(3);
    expect(one({ plants: [[4, 3], [3, 4]], answers: [12] })).toBe(2); // second planting
    expect(one({ plants: [[3, 4]], answers: [11, 12] })).toBe(2); // second try on the question
    expect(one({ plants: [[3, 4]], answers: [1, 2, 3] })).toBe(1); // answer shown
    expect(one({ plants: [[1, 1], [2, 2], [3, 3]], answers: [12] })).toBe(2); // planted for them after 3 misses
    expect(one({ plants: [[3, 4]], answers: [] })).toBe(0); // unfinished
    const p = playRound(l, l.rounds[0], { plants: [[1, 1], [2, 2], [3, 3], [3, 4]], answers: [12] });
    expect(p.buildDone && !p.firstBuild && p.wrongPlants).toBe(MAX_TRIES);
    // Whole-game stars.
    expect(starsFor(18, 18)).toBe(3);
    expect(starsFor(17, 18)).toBe(3);
    expect(starsFor(10, 18)).toBe(1);
    expect(starsFor(12, 18)).toBe(2);
    expect(starsFor(0, 18)).toBe(0);
    expect(replay(l, []).stars).toBe(0);
  });

  it("split rounds take any split; area models reward tens and ones", () => {
    const g3 = levelById("g3-3")!; // 6 x 7
    const r = g3.rounds[0];
    expect(playRound(g3, r, { plants: [[6, 7]], split: 3, answers: [18, 24, 42] }).points).toBe(3);
    expect(playRound(g3, r, { plants: [[6, 7]], split: 7, answers: [42, 0, 42] }).done).toBe(false); // not a split
    expect(playRound(g3, r, { plants: [[6, 7]], answers: [42] }).done).toBe(false);
    const g4 = levelById("g4-3")!;
    const m = g4.rounds[4]; // 4 x 23
    expect(playRound(g4, m, { plants: [], split: 20, answers: [80, 12, 92] }).points).toBe(3);
    expect(playRound(g4, m, { plants: [], split: 12, answers: [48, 44, 92] }).points).toBe(2);
  });

  it("factor rounds count each pair once, either way round", () => {
    const l = levelById("g4-1")!;
    const r = l.rounds[4]; // 24
    const p = playRound(l, r, { plants: [[2, 12], [12, 2], [5, 5], [3, 8], [4, 6], [1, 24]], answers: [] });
    expect(p.found).toHaveLength(4);
    expect(p.wrongPlants).toBe(1);
    expect(p.points).toBe(3);
    const half = playRound(l, r, { plants: [[2, 12], [3, 8]], answers: [], shown: true });
    expect(half.done).toBe(true);
    expect(half.points).toBe(1);
    expect(playRound(l, r, { plants: [[2, 12]], answers: [] }).done).toBe(false);
    const lots = playRound(l, r, { plants: [[5, 5], [5, 4], [6, 5], [6, 3], [1, 24], [2, 12], [3, 8], [4, 6]], answers: [] });
    expect(lots.points).toBe(2); // all found, but many plantings that didn't work
    const pr = levelById("g4-2")!;
    expect(playRound(pr, pr.rounds[2], { plants: [[1, 13]], answers: [1] }).points).toBe(3); // 13 is prime
    expect(playRound(pr, pr.rounds[2], { plants: [[1, 13]], answers: [0, 1] }).points).toBe(2);
    expect(playRound(pr, pr.rounds[1], { plants: [[1, 9], [3, 3]], answers: [0] }).points).toBe(3); // 9 is composite
  });
});
