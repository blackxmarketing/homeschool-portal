import { describe, expect, it } from "vitest";
import {
  ALL_TG_LEVELS,
  MAX_TRIES,
  TG_LEVELS,
  backdropGrid,
  checkStep,
  chestGrid,
  cleanMoves,
  cubesGrid,
  explorerGrid,
  flagGrid,
  gemGrid,
  levelById,
  maxPoints,
  patternPairs,
  perfectMoves,
  replay,
  scopeGrid,
  snap,
  solveStep,
  starsFor,
  treasureGrid,
  treasureGridInfo,
  walkEnd,
  type Step,
} from "@/lib/minigames/treasuregrid";
import { gameById, levelsForKid } from "@/lib/minigames";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

const wrongFor = (s: Step) => {
  if (s.kind === "plot" || s.kind === "pair") return { x: s.at.x === 0 ? 1 : 0, y: s.at.y === 0 ? 1 : 0 };
  if (s.kind === "num") return { n: s.n + 1 };
  return { l: 1, w: 1, h: 1 };
};

describe("treasure grid levels", () => {
  it("has 3 grade-5 levels with unique ids, 6-8 rounds and the skill named", () => {
    expect(treasureGrid.grades).toEqual([5]);
    expect(treasureGrid.id).toBe(treasureGridInfo.id);
    expect(TG_LEVELS[5]).toHaveLength(3);
    expect(new Set(ALL_TG_LEVELS.map((l) => l.id)).size).toBe(ALL_TG_LEVELS.length);
    for (const l of ALL_TG_LEVELS) {
      expect(l.id.startsWith("g5-")).toBe(true);
      expect(l.rounds.length).toBeGreaterThanOrEqual(6);
      expect(l.rounds.length).toBeLessThanOrEqual(8);
      expect(l.intro).toMatch(/^Skill/);
      expect(l.intro).toMatch(/5\.(G|OA|MD)\./);
      const text = JSON.stringify(l);
      expect(text).not.toMatch(BANNED);
    }
    expect(treasureGrid.levelsForGrade!(5).map((l) => l.id)).toEqual(["g5-1", "g5-2", "g5-3"]);
    expect(treasureGrid.levelsForGrade!(4)).toEqual([]);
    expect(treasureGrid.levels("sprout")).toEqual([]);
    expect(gameById("treasuregrid")).toBe(treasureGrid);
    expect(levelsForKid(treasureGrid, 5)).toHaveLength(3);
    expect(levelsForKid(treasureGrid, 3)).toEqual([]);
  });

  it("every plotted point is on the map's grid and every mark fits", () => {
    for (const l of ALL_TG_LEVELS)
      for (const r of l.rounds) {
        const pts = [...r.steps.flatMap((s) => (s.kind === "plot" || s.kind === "pair" ? [s.at] : [])), ...(r.marks ?? []).map((m) => m.at)];
        if (pts.length) expect(r.board, `${l.id} ${r.title}`).toBeDefined();
        for (const p of pts) {
          const b = r.board!;
          expect(p.x % b.xStep, `${r.title} x`).toBe(0);
          expect(p.y % b.yStep, `${r.title} y`).toBe(0);
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.y).toBeGreaterThanOrEqual(0);
          expect(p.x).toBeLessThanOrEqual(b.xMax);
          expect(p.y).toBeLessThanOrEqual(b.yMax);
          expect(snap(b, p.x + 0.3 * b.xStep, p.y - 0.3 * b.yStep)).toEqual(p);
        }
        if (r.board) {
          expect(r.board.xMax / r.board.xStep).toBeLessThanOrEqual(12);
          expect(r.board.yMax / r.board.yStep).toBeLessThanOrEqual(12);
        }
      }
  });

  it("the math in every round is right", () => {
    for (const l of ALL_TG_LEVELS)
      for (const r of l.rounds) {
        if (r.kind === "walk") expect(walkEnd(r.start!, r.legs!)).toEqual((r.steps[0] as { at: unknown }).at);
        if (r.kind === "pattern") {
          const pairs = patternPairs(r.rules!);
          const plots = r.steps.filter((s) => s.kind === "plot").map((s) => (s as { at: unknown }).at);
          expect(pairs.slice(pairs.length - plots.length)).toEqual(plots);
          const n = r.steps.find((s) => s.kind === "num") as { n: number };
          // the relationship: every y is n times x (or every x is n times y)
          expect(pairs.every((p) => p.y === n.n * p.x) || pairs.every((p) => p.x === n.n * p.y)).toBe(true);
        }
      }
    // spot checks of the story numbers
    const l3 = levelById("g5-3")!;
    const joined = l3.rounds.find((r) => r.title === "Joined chests")!;
    expect(joined.prisms!.reduce((t, p) => t + p.l * p.w * p.h, 0)).toBe(42);
    const vault = l3.rounds.find((r) => r.title === "Tower and vault")!;
    expect((vault.steps[0] as { n: number }).n).toBe(vault.prisms!.reduce((t, p) => t + p.l * p.w * p.h, 0));
    const tall = l3.rounds.find((r) => r.title === "How tall?")!;
    const [a, b] = tall.prisms!;
    expect(a.l * a.w * a.h + b.l * b.w * b.h).toBe(64);
    expect((tall.steps[1] as { n: number }).n).toBe(b.h);
  });

  it("every build step has a solution that obeys its rules", () => {
    for (const l of ALL_TG_LEVELS)
      for (const r of l.rounds)
        for (const s of r.steps) {
          const a = solveStep(s);
          expect(checkStep(s, a).correct, `${l.id} ${r.title}`).toBe(true);
          expect(checkStep(s, wrongFor(s)).correct).toBe(false);
        }
    const build = levelById("g5-3")!.rounds[1].steps[0];
    expect(checkStep(build, { l: 4, w: 3, h: 2 }).correct).toBe(true);
    expect(checkStep(build, { l: 6, w: 2, h: 2 }).correct).toBe(true);
    expect(checkStep(build, { l: 3, w: 4, h: 2 }).correct).toBe(true);
    expect(checkStep(build, { l: 2, w: 3, h: 4 }).note).toMatch(/height has to be 2/);
    expect(checkStep(build, { l: 4, w: 4, h: 2 }).note).toMatch(/4 × 4 × 2 = 32/);
  });

  it("feedback teaches: swapped pairs and the formula with numbers", () => {
    const plot = levelById("g5-1")!.rounds[0].steps[0];
    expect(checkStep(plot, { x: 5, y: 3 }).note).toMatch(/x comes first/);
    expect(checkStep(plot, { x: 3, y: 2 }).note).toMatch(/x \(3\) is right/);
    expect(checkStep(plot, { x: 3, y: 5 }).correct).toBe(true);
    expect(levelById("g5-3")!.rounds[2].teach).toContain("15 × 4 = 60");
    expect(checkStep(plot, undefined).correct).toBe(false);
  });
});

describe("treasure grid scoring", () => {
  it("every level can reach 3 stars, and replays are deterministic", () => {
    for (const l of ALL_TG_LEVELS) {
      const moves = perfectMoves(l);
      const r = treasureGrid.score(l.id, moves);
      expect(r).toEqual({ stars: 3, best: maxPoints(l) });
      expect(treasureGrid.score(l.id, JSON.parse(JSON.stringify(moves)))).toEqual(r);
      expect(replay(l, moves)).toEqual(replay(l, moves));
    }
  });

  it("second tries earn less, and three misses earn nothing", () => {
    const l = levelById("g5-1")!;
    const second = l.rounds.map((r) => ({ tries: r.steps.map((s) => [wrongFor(s), solveStep(s)]) }));
    const r2 = replay(l, second);
    expect(r2.points).toBe(maxPoints(l) / 2);
    expect(r2.stars).toBe(starsFor(r2.points, r2.max));
    expect(r2.stars).toBe(1);
    const late = l.rounds.map((r) => ({ tries: r.steps.map((s) => [wrongFor(s), wrongFor(s), wrongFor(s), solveStep(s)]) }));
    expect(replay(l, late).points).toBe(0);
    expect(MAX_TRIES).toBe(3);
  });

  it("stars follow the share of points", () => {
    expect(starsFor(18, 20)).toBe(3);
    expect(starsFor(17, 20)).toBe(2);
    expect(starsFor(12, 20)).toBe(2);
    expect(starsFor(6, 20)).toBe(1);
    expect(starsFor(5, 20)).toBe(0);
    expect(starsFor(0, 0)).toBe(0);
    // mostly perfect but one round missed still gets the right stars
    const l = levelById("g5-2")!;
    const moves = perfectMoves(l);
    moves[0] = { tries: [] };
    const r = replay(l, moves);
    expect(r.stars).toBe(starsFor(r.points, r.max));
    expect(r.points).toBe(maxPoints(l) - l.rounds[0].steps.length * 2);
  });

  it("garbage moves score 0 without throwing; unknown levels are null", () => {
    const junk: unknown[] = [null, undefined, 5, "x", {}, [], [null], [{ tries: "no" }], [{ tries: [[{ x: "3", y: 5 }]] }], [{ tries: [[{ x: 3.5, y: 5 }]] }], [{ tries: [[{ x: -3, y: 5 }]] }], Array(500).fill({ tries: [[{ n: 1e9 }]] })];
    for (const j of junk) {
      expect(() => treasureGrid.score("g5-1", j)).not.toThrow();
      expect(treasureGrid.score("g5-1", j)).toEqual({ stars: 0, best: 0 });
    }
    expect(treasureGrid.score("nope", [])).toBeNull();
    expect(treasureGrid.score("k-1", perfectMoves(levelById("g5-1")!))).toBeNull();
    expect(cleanMoves([{ tries: [[{ x: 3, y: 5, z: 9 }]] }])).toEqual([{ tries: [[{ x: 3, y: 5 }]] }]);
    // extra tries past the limit are ignored
    const l = levelById("g5-1")!;
    const lots = l.rounds.map((r) => ({ tries: r.steps.map((s) => [wrongFor(s), wrongFor(s), wrongFor(s), wrongFor(s), solveStep(s)]) }));
    expect(replay(l, lots).points).toBe(0);
  });
});

describe("treasure grid art", () => {
  it("draws its sprites", () => {
    for (const g of [backdropGrid(), chestGrid(), flagGrid(), scopeGrid(), gemGrid(), explorerGrid(), cubesGrid([{ l: 3, w: 2, h: 2 }]), cubesGrid([{ l: 4, w: 4, h: 2 }, { l: 4, w: 2, h: 4, hideHeight: true }])]) {
      expect(g.w).toBeGreaterThan(0);
      expect(g.px.some((p) => p !== null)).toBe(true);
    }
    // a taller chest is a taller picture
    expect(cubesGrid([{ l: 2, w: 2, h: 4 }]).h).toBeGreaterThan(cubesGrid([{ l: 2, w: 2, h: 1 }]).h);
  });
});
