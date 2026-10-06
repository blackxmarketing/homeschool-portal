import { describe, expect, it } from "vitest";
import {
  ALL_HOP_LEVELS,
  HOP_LEVELS,
  MAX_TRIES,
  bestPath,
  cleanMoves,
  fliesOf,
  frogGrid,
  flyGrid,
  goalOf,
  hintFor,
  levelById,
  numberHop,
  numberHopInfo,
  padGrid,
  parOf,
  perfectMoves,
  playRound,
  promptFor,
  replay,
  sentence,
  shortestHops,
  startOf,
  starsFor,
  teachFor,
  type Act,
} from "@/lib/minigames/numberhop";
import { gameById, levelsForKid } from "@/lib/minigames";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

describe("number hop levels", () => {
  it("has 3 levels for grades 1 and 2, unique ids with the grade, 5-8 rounds, skill named", () => {
    expect(numberHop.grades).toEqual([1, 2]);
    for (const g of numberHopInfo.grades) {
      expect(HOP_LEVELS[g]).toHaveLength(3);
      expect(numberHop.levelsForGrade!(g)).toHaveLength(3);
      for (const l of HOP_LEVELS[g]) {
        expect(l.id.startsWith(`g${g}-`)).toBe(true);
        expect(l.grade).toBe(g);
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/^Skill/);
        expect(l.intro + l.title).not.toMatch(BANNED);
      }
    }
    expect(new Set(ALL_HOP_LEVELS.map((l) => l.id)).size).toBe(ALL_HOP_LEVELS.length);
    expect(numberHop.levelsForGrade!(3)).toEqual([]);
    expect(numberHop.levels("sprout")).toEqual([]);
    expect(gameById("numberhop")).toBe(numberHop);
    expect(levelsForKid(numberHop, 2).map((l) => l.id)).toEqual(["g2-1", "g2-2", "g2-3"]);
  });

  it("every round fits its number line and matches the grade's number range", () => {
    for (const l of ALL_HOP_LEVELS) {
      const limit = l.id === "g1-1" || l.id === "g1-2" ? 20 : l.grade === 1 ? 100 : 1000;
      for (const r of l.rounds) {
        const s = startOf(r);
        const g = goalOf(r);
        expect(r.lo).toBeLessThan(r.hi);
        expect(s).toBeGreaterThanOrEqual(r.lo);
        expect(g, l.id).toBeLessThanOrEqual(r.hi);
        expect(g).toBeGreaterThanOrEqual(r.lo);
        expect(r.hi).toBeLessThanOrEqual(limit);
        expect(s).not.toBe(g);
        if (r.kind === "skip") expect((r.end - r.start) % r.by).toBe(0);
        expect(promptFor(l, r).length).toBeGreaterThan(10);
      }
    }
  });

  it("gets harder: bigger numbers and longer best paths each grade", () => {
    const maxGoal = (g: number) => Math.max(...HOP_LEVELS[g].flatMap((l) => l.rounds.map(goalOf)));
    expect(maxGoal(2)).toBeGreaterThan(maxGoal(1));
    const avgPar = (id: string) => {
      const l = levelById(id)!;
      return l.rounds.reduce((s, r) => s + parOf(l, r), 0) / l.rounds.length;
    };
    expect(avgPar("g2-1")).toBeGreaterThan(avgPar("g1-3"));
  });
});

describe("number hop strategy", () => {
  it("finds the fewest hops with tens and ones (including hop past and back)", () => {
    expect(shortestHops(36, 59, [10, 1, -1, -10], 0, 100)).toEqual([10, 10, 1, 1, 1]);
    expect(shortestHops(48, 75, [10, 1, -1, -10], 0, 100)).toEqual([10, 10, 10, -1, -1, -1]);
    expect(shortestHops(46, 54, [10, 1, -1, -10], 0, 100)).toHaveLength(3);
    expect(shortestHops(356, 569, [100, 10, 1, -1, -10, -100], 0, 1000)).toHaveLength(6);
  });

  it("make-ten levels expect a jump to 10 and then the rest", () => {
    const l = levelById("g1-2")!;
    expect(bestPath(l, l.rounds[0])).toEqual([2, 3]); // 8 + 5
    expect(bestPath(l, l.rounds[2])).toEqual([-3, -1]); // 13 - 4
    expect(teachFor(l, l.rounds[0], [2, 3])).toMatch(/8 \+ 2 = 10, then 10 \+ 3 = 13/);
  });

  it("skip rounds put a fly on every pad of the pattern", () => {
    const l = levelById("g2-2")!;
    expect(fliesOf(l.rounds[0])).toEqual([5, 10, 15, 20, 25, 30, 35]);
    expect(parOf(l, l.rounds[0])).toBe(7);
    expect(parOf(l, l.rounds[3])).toBe(6); // 100s to 600
  });

  it("writes the number sentence the hops made", () => {
    expect(sentence(36, [10, 10, 1, 1, 1])).toBe("36 + 10 + 10 + 1 + 1 + 1 = 59");
    expect(sentence(75, [-10, -10, -10, -1, -1])).toBe("75 − 10 − 10 − 10 − 1 − 1 = 43");
  });

  it("hints kindly after a wrong catch and shows the fly after 3 misses", () => {
    const l = levelById("g2-1")!;
    const r = l.rounds[0]; // 36 + 23
    expect(hintFor(l, r, 57, 1)).toMatch(/2 tens and 3 ones/);
    expect(hintFor(l, r, 36, 1)).toMatch(/Hop forward/);
    expect(hintFor(l, r, 59, MAX_TRIES)).toMatch(/59/);
    const g1 = levelById("g1-1")!;
    expect(hintFor(g1, g1.rounds[0], 7, 1)).toMatch(/hop forward 1 more/);
  });
});

describe("number hop scoring", () => {
  it("a perfect game earns 3 stars on every level", () => {
    for (const l of ALL_HOP_LEVELS) {
      const r = replay(l, perfectMoves(l));
      expect(r.rounds.every((x) => x.solved), l.id).toBe(true);
      expect(r.points).toBe(r.max);
      expect(r.stars).toBe(3);
      expect(numberHop.score(l.id, perfectMoves(l))).toEqual({ stars: 3, best: r.max });
    }
  });

  it("replays are deterministic and survive a JSON round trip", () => {
    for (const l of ALL_HOP_LEVELS) {
      const m = JSON.parse(JSON.stringify(perfectMoves(l)));
      expect(numberHop.score(l.id, m)).toEqual(numberHop.score(l.id, m));
      expect(replay(l, m)).toEqual(replay(l, perfectMoves(l)));
    }
  });

  it("garbage moves score 0 without throwing; unknown levels return null", () => {
    const junk: unknown[] = [null, undefined, 5, "x", {}, [1, 2], [{ acts: "catch" }], [{ acts: [NaN, Infinity, 1e9, "hop", null, {}, 2.5] }], [{ acts: Array(10000).fill(1) }]];
    for (const l of ALL_HOP_LEVELS)
      for (const j of junk) {
        const s = numberHop.score(l.id, j);
        expect(s).not.toBeNull();
        expect(s!.stars).toBe(0);
      }
    expect(numberHop.score("nope", perfectMoves(ALL_HOP_LEVELS[0]))).toBeNull();
    expect(cleanMoves("bad")).toEqual([]);
  });

  it("ignores hops that aren't allowed or leave the line", () => {
    const l = levelById("g1-1")!; // +1/-1 only, 0-20
    const r = l.rounds[0]; // 5 + 3
    const p = playRound(l, r, [10, 3, -100, 1, 1, 1, "catch"]);
    expect(p.hops).toEqual([1, 1, 1]);
    expect(p.solved).toBe(true);
    // A set jump isn't allowed here, but is on the make-ten level (up to 10).
    expect(playRound(l, r, [3, "catch"]).solved).toBe(false);
    const mt = levelById("g1-2")!;
    expect(playRound(mt, mt.rounds[0], [5, "catch"]).solved).toBe(true);
    expect(playRound(mt, mt.rounds[0], [11]).hops).toEqual([]);
  });

  it("stars follow the rules: catch +1, first try +1, fewest hops +1", () => {
    const l = levelById("g2-1")!;
    const perfect = perfectMoves(l);
    const one = (acts: Act[]) => replay(l, [{ acts }, ...perfect.slice(1)]).rounds[0].points;
    expect(one([10, 10, 1, 1, 1, "catch"])).toBe(3);
    expect(one([10, 10, 1, 1, "catch", 1, "catch"])).toBe(2); // second try
    expect(one([1, 1, 1, 10, 10, "catch"])).toBe(3); // any order, still 5 hops
    expect(one([10, 10, 1, 1, 1, 1, -1, "catch"])).toBe(2); // extra hops
    expect(one([10, 10, 1, 1, "catch", "catch", "catch", 1])).toBe(2); // fly shown after 3 misses: landing catches it
    expect(one([10, 10])).toBe(0); // never caught
    // Fly rounds: 3 at par, 2 within 2 hops of par, 1 after that.
    const fly = l.rounds[3]; // 29 -> 71
    const par = parOf(l, fly);
    const best = bestPath(l, fly);
    const flyPts = (acts: Act[]) => replay(l, [...perfect.slice(0, 3), { acts }, ...perfect.slice(4)]).rounds[3].points;
    expect(flyPts(best)).toBe(3);
    expect(flyPts([1, -1, ...best])).toBe(2);
    expect(flyPts([1, -1, 1, -1, ...best])).toBe(1);
    expect(par).toBe(best.length);
    // Whole-game stars.
    expect(starsFor(18, 18)).toBe(3);
    expect(starsFor(12, 18)).toBe(2);
    expect(starsFor(6, 18)).toBe(1);
    expect(starsFor(0, 18)).toBe(0);
    expect(replay(l, []).stars).toBe(0);
  });

  it("skip rounds count every fly eaten, in any order", () => {
    const l = levelById("g2-2")!;
    const r = l.rounds[0]; // 0 to 35 by 5s
    expect(playRound(l, r, [5, 5, 5, 5, 5, 5, 5]).solved).toBe(true);
    const skipped = playRound(l, r, [10, 10, 10, 5]); // lands 10, 20, 30, 35
    expect(skipped.eaten).toEqual([10, 20, 30, 35]);
    expect(skipped.solved).toBe(false);
  });
});

describe("number hop art", () => {
  it("draws the frog, the fly and a lily pad", () => {
    for (const g of [frogGrid(0), frogGrid(1), flyGrid(0), flyGrid(1), padGrid()]) expect(g.px.some(Boolean)).toBe(true);
  });
});
