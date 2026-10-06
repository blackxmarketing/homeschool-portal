import { describe, expect, it } from "vitest";
import {
  ALL_CRITTER_LEVELS,
  CRITTER_LEVELS,
  CRITTER_KINDS,
  FIRST,
  SAME,
  SECOND,
  answerFor,
  biggest,
  cleanMoves,
  critterGrid,
  critters,
  crittersInfo,
  equationFor,
  hintFor,
  meadowSize,
  meadowSpots,
  perfectMoves,
  promptFor,
  replay,
  starsFor,
  teachFor,
} from "@/lib/minigames/critters";
import { gameById, levelsForKid } from "@/lib/minigames";

describe("counting critters levels", () => {
  it("has 3 levels for each grade, unique ids with the grade in them, 5-8 rounds each", () => {
    expect(critters.grades).toEqual([0, 1]);
    for (const g of crittersInfo.grades) {
      expect(CRITTER_LEVELS[g]).toHaveLength(3);
      expect(critters.levelsForGrade!(g)).toHaveLength(3);
      for (const l of CRITTER_LEVELS[g]) {
        expect(l.id.startsWith(g === 0 ? "k-" : `g${g}-`)).toBe(true);
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/Skill/);
      }
    }
    expect(new Set(ALL_CRITTER_LEVELS.map((l) => l.id)).size).toBe(ALL_CRITTER_LEVELS.length);
    expect(critters.levelsForGrade!(2)).toEqual([]);
    expect(gameById("critters")).toBe(critters);
    expect(levelsForKid(critters, 0).map((l) => l.id)).toEqual(["k-1", "k-2", "k-3"]);
  });

  it("every round fits the board: numbers 1-20, answers on the number tiles, one or two ten frames", () => {
    for (const l of ALL_CRITTER_LEVELS)
      for (const r of l.rounds) {
        const a = answerFor(r);
        expect(biggest(r)).toBeLessThanOrEqual(20);
        if (r.kind === "compare") expect([FIRST, SECOND, SAME]).toContain(a);
        else {
          expect(a, `${l.id} ${r.kind}`).toBeGreaterThanOrEqual(1);
          expect(a).toBeLessThanOrEqual(20);
        }
        if (r.kind === "make10") expect(r.n).toBeLessThan(10);
        if (r.kind === "maketen") {
          expect(r.a).toBeLessThanOrEqual(10);
          expect(r.b).toBeLessThanOrEqual(10);
          expect(r.a + r.b).toBeGreaterThan(10);
        }
        if (r.kind === "compare") expect(Math.max(r.a, r.b)).toBeLessThanOrEqual(10);
        // Kindergarten stays within 20 counting; grade 1 within 20 adding and subtracting.
        expect(promptFor(r).length).toBeGreaterThan(5);
        expect(teachFor(r)).toMatch(/^Yes/);
        expect(hintFor(r, a + 1).length).toBeGreaterThan(5);
      }
  });

  it("gets harder: kindergarten counts to 10 then 20; grade 1 adds and subtracts within 10 then 20", () => {
    const k = CRITTER_LEVELS[0];
    expect(Math.max(...k[0].rounds.map(biggest))).toBe(10);
    expect(Math.max(...k[1].rounds.map(biggest))).toBeGreaterThan(10);
    expect(k[2].rounds.some((r) => r.kind === "make10")).toBe(true);
    const g1 = CRITTER_LEVELS[1];
    expect(Math.max(...g1[0].rounds.map(biggest))).toBeLessThanOrEqual(10);
    expect(g1[1].rounds.every((r) => r.kind === "maketen")).toBe(true);
    expect(g1[2].rounds.some((r) => r.kind === "missingAdd")).toBe(true);
    expect(g1[2].rounds.some((r) => r.kind === "missingSub")).toBe(true);
  });

  it("the math is right", () => {
    expect(answerFor({ kind: "make10", n: 7, critter: "frog", other: "duck" })).toBe(3);
    expect(answerFor({ kind: "maketen", a: 8, b: 5, critter: "frog", other: "duck" })).toBe(13);
    expect(answerFor({ kind: "missingAdd", a: 8, total: 13, critter: "frog", other: "duck" })).toBe(5);
    expect(answerFor({ kind: "missingSub", total: 14, left: 9, critter: "frog" })).toBe(5);
    expect(answerFor({ kind: "sub", a: 15, b: 7, critter: "frog" })).toBe(8);
    expect(answerFor({ kind: "compare", a: 5, b: 7, critter: "frog", other: "duck" })).toBe(SECOND);
    expect(answerFor({ kind: "compare", a: 8, b: 6, critter: "frog", other: "duck" })).toBe(FIRST);
    expect(answerFor({ kind: "compare", a: 9, b: 9, critter: "frog", other: "duck" })).toBe(SAME);
    expect(equationFor({ kind: "compare", a: 5, b: 7, critter: "frog", other: "duck" })).toBe("5 < 7");
    expect(equationFor({ kind: "missingSub", total: 14, left: 9, critter: "frog" })).toBe("14 − 5 = 9");
  });
});

describe("counting critters scoring", () => {
  it("every level can reach 3 stars", () => {
    for (const l of ALL_CRITTER_LEVELS) expect(critters.score(l.id, perfectMoves(l)), l.id).toEqual({ stars: 3, best: l.rounds.length * 2 });
  });

  it("replays are deterministic", () => {
    for (const l of ALL_CRITTER_LEVELS) {
      const m = perfectMoves(l);
      expect(replay(l, m)).toEqual(replay(l, JSON.parse(JSON.stringify(m))));
    }
  });

  it("garbage moves score 0 without throwing; unknown levels are null", () => {
    const junk: unknown[] = [null, undefined, 42, "hi", {}, [], [null], [{ tries: "4" }], [{ tries: [1e9, -3, 2.5, "7", null, {}] }], [[[[]]]], [{ tries: [NaN, Infinity] }]];
    for (const l of ALL_CRITTER_LEVELS)
      for (const j of junk) {
        expect(() => critters.score(l.id, j)).not.toThrow();
        expect(critters.score(l.id, j)!.stars).toBe(0);
      }
    expect(critters.score("nope", [])).toBeNull();
    expect(critters.score("k-9", perfectMoves(CRITTER_LEVELS[0][0]))).toBeNull();
  });

  it("first try earns 2, a later try earns 1, only 3 tries count, and stars follow the points", () => {
    const l = CRITTER_LEVELS[0][0]; // 7 rounds, max 14
    const right = l.rounds.map(answerFor);
    const wrong = (a: number) => (a === 1 ? 2 : a - 1);
    // One round on the second try: 13/14 still earns 3 stars.
    const oneSlip = right.map((a, i) => ({ tries: i === 0 ? [wrong(a), a] : [a] }));
    expect(replay(l, oneSlip).points).toBe(13);
    expect(replay(l, oneSlip).stars).toBe(3);
    // Every round on the second try: 7/14 = 1 star.
    const allSlips = right.map((a) => ({ tries: [wrong(a), a] }));
    expect(replay(l, allSlips)).toMatchObject({ points: 7, stars: 1 });
    // A fourth try is ignored.
    const late = right.map((a) => ({ tries: [wrong(a), wrong(a), wrong(a), a] }));
    expect(replay(l, late).points).toBe(0);
    // Extra rounds are ignored; missing rounds earn nothing.
    expect(replay(l, [...perfectMoves(l), { tries: [1] }]).points).toBe(14);
    expect(replay(l, perfectMoves(l).slice(0, 3))).toMatchObject({ points: 6, stars: 1 });
    expect(starsFor(14, 14)).toBe(3);
    expect(starsFor(9, 14)).toBe(2);
    expect(starsFor(0, 14)).toBe(0);
  });

  it("cleans moves to whole numbers 0-20", () => {
    expect(cleanMoves([{ tries: [3, 21, -1, 4.5] }])).toEqual([{ tries: [3, -1, -1] }]);
    expect(cleanMoves("x")).toEqual([]);
  });
});

describe("counting critters art and meadow", () => {
  it("draws every critter in both walk frames", () => {
    for (const k of CRITTER_KINDS)
      for (const f of [0, 1]) {
        const g = critterGrid(k, f);
        expect(g.runs().length).toBeGreaterThan(5);
      }
  });

  it("meadow spots are unique, inside the grid, and repeatable", () => {
    for (const n of [3, 4, 6, 8, 10, 12, 14, 15, 18, 20]) {
      const { cols, rows } = meadowSize(n);
      const s = meadowSpots(n, 5);
      expect(s).toHaveLength(n);
      expect(new Set(s.map((p) => `${p.col},${p.row}`)).size).toBe(n);
      for (const p of s) {
        expect(p.col).toBeLessThan(cols);
        expect(p.row).toBeLessThan(rows);
      }
      expect(meadowSpots(n, 5)).toEqual(s);
      expect(cols).toBeLessThanOrEqual(5);
    }
  });
});
