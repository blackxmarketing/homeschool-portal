import { describe, expect, it } from "vitest";
import { gameById, levelsForKid, levelsKidMayPlay, GAMES } from "@/lib/minigames";
import { GAME_UI } from "@/components/minigames/registry";
import { SKILL_BY_ID } from "@/lib/curriculum/skills";
import { COURSES } from "@/content/courses";
import { applyEvidence, blockers, emptyMeter, isMastered } from "@/lib/masteryMeter";
import {
  ALL_CHOMPER_LEVELS,
  BAND_ONLY_LEVELS,
  CELLS,
  CHOMPER_LEVELS,
  CLEAR_BONUS,
  COLS,
  CORRECT_PER_BOARD,
  LIVES,
  MAX_PER_BOARD,
  MOST_COINS,
  maxFor,
  maxForLevel,
  ROWS,
  money,
  SHAPES,
  buildBoard,
  chomperGrid,
  chompers,
  cleanMoves,
  coinWords,
  coinsGrid,
  dotsGrid,
  evidenceFor,
  fits,
  grumbleStep,
  bestMove,
  GAME_WEIGHT,
  grumbleGrid,
  levelById,
  perfectMoves,
  placeFrom,
  placementQuestions,
  PLACEMENT_CELLS,
  PLACEMENT_QUESTIONS,
  PLACEMENT_RIGHT,
  publicPlacement,
  playBoard,
  MONSTER_EVERY,
  percentValue,
  replay,
  rightOn,
  ruleLabel,
  placeName,
  starsFor,
  STRIKES,
  trySeed,
  startState,
  step,
  tick,
  teachFor,
  type Act,
  type ChomperLevel,
  type ChomperState,
} from "@/lib/minigames/chompers";

/** The content rule from CLAUDE.md, as a test. */
const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

const everyBoard = (fn: (level: ChomperLevel, boardIndex: number, seed: number) => void, seeds = [1, 2, 3]) => {
  for (const level of ALL_CHOMPER_LEVELS) for (let i = 0; i < level.boards.length; i++) for (const s of seeds) fn(level, i, s);
};

describe("the levels", () => {
  it("gives every kid the same ladder, starting at kindergarten", () => {
    expect(chompers.grades).toEqual([0, 1, 2, 3, 4, 5]);
    expect(chompers.unlockAt).toBe(3);
    const ladder = ALL_CHOMPER_LEVELS.map((l) => l.id);
    const grades = ALL_CHOMPER_LEVELS.map((l) => l.grade);
    expect(grades, "the ladder should get harder, never easier").toEqual([...grades].sort((a, b) => a - b));
    expect(ladder[0]).toBe("k-1");
    expect(ALL_CHOMPER_LEVELS.at(-1)!.grade).toBeGreaterThanOrEqual(7);
    // A kindergartner and an eleventh-grader get the same list, and the
    // server will score any rung either of them reaches.
    for (const grade of [0, 2, 5, 6, 8, 11]) {
      expect(levelsForKid(chompers, grade).map((l) => l.id), `grade ${grade}`).toEqual(ladder);
      expect(levelsKidMayPlay(chompers, grade).map((l) => l.id), `grade ${grade} scoring`).toEqual(expect.arrayContaining(ladder));
    }
  });

  it("works all the way up to grade 8 maths", () => {
    const kinds = new Set(BAND_ONLY_LEVELS.flatMap((l) => l.boards.map((b) => b.rule.kind)));
    for (const k of ["squares", "commonMultiples", "commonFactors", "evaluates"]) expect(kinds.has(k as never), `no top level uses "${k}"`).toBe(true);
    const styles = new Set(BAND_ONLY_LEVELS.flatMap((l) => l.boards.map((b) => b.style)));
    for (const st of ["signed", "ratio", "power", "variable"]) expect(styles.has(st as never), `no top level uses "${st}"`).toBe(true);
  });

  it("names a real curriculum skill on every level, so the game can't drift from the lessons", () => {
    // Grades 3-8 name a skill from the practice curriculum; K-2, which has
    // none, names the lesson in its own course that teaches the same thing.
    const lessons = new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
    for (const l of ALL_CHOMPER_LEVELS) {
      expect(SKILL_BY_ID.has(l.skill) || lessons.has(l.skill), `${l.id} -> ${l.skill} is not a real skill or lesson`).toBe(true);
    }
  });

  it("has levels for all six kinds of board", () => {
    const kinds = new Set(ALL_CHOMPER_LEVELS.flatMap((l) => l.boards.map((b) => b.rule.kind)));
    for (const k of ["multiples", "factors", "primes", "composites", "equals", "less", "greater"]) {
      expect(kinds.has(k as never), `no level uses "${k}"`).toBe(true);
    }
  });

  it("gives the youngest kids something they can play before they read numerals", () => {
    const k = CHOMPER_LEVELS[0].flatMap((l) => l.boards);
    expect(k.every((b) => b.style === "count")).toBe(true);
    // The same number written down, counted in a ten frame, scratched in
    // tallies and rolled on dice - all on one board, which is the whole of
    // early counting.
    const b = buildBoard(k[0], 0, 1);
    const drawn = b.cells.filter((c) => c.art);
    expect(drawn.length).toBeGreaterThan(5);
    expect(b.cells.length - drawn.length, "no numerals on the board").toBeGreaterThan(0);
    for (const c of drawn) {
      expect(["dots", "tally", "dice"]).toContain(c.art!.kind);
      // Whatever it is, the picture is worth what the cell says it is.
      expect(c.art!.parts.reduce((t, n) => t + n, 0), c.text).toBe(c.value);
    }
    // And the right answers really do turn up in all four forms.
    for (const spec of CHOMPER_LEVELS[0][0].boards) {
      const board = buildBoard(spec, 0, 2);
      const forms = new Set(board.cells.filter((c) => c.ok).map((c) => c.art?.kind ?? "numeral"));
      for (const want of ["numeral", "dots", "tally", "dice"]) expect(forms, `${board.label} never shows ${want}`).toContain(want);
    }
    // And the coin boards add up to what they say they do.
    const coins = ALL_CHOMPER_LEVELS.flatMap((l) => l.boards).filter((bd) => bd.style === "coins");
    expect(coins.length).toBeGreaterThan(0);
    for (const spec of coins) {
      const cb = buildBoard(spec, 0, 2);
      for (const c of cb.cells) {
        expect(c.art?.kind).toBe("coins");
        expect(c.art!.parts.reduce((t, n) => t + n, 0), c.text).toBe(c.value);
        expect(c.art!.parts.length).toBeLessThanOrEqual(MOST_COINS);
      }
    }
  });

  it("knows even from odd and which column a digit is in", () => {
    for (const n of [2, 10, 48, 100]) expect(fits({ kind: "even", target: 0 }, n), `${n}`).toBe(true);
    for (const n of [1, 7, 49, 101]) expect(fits({ kind: "even", target: 0 }, n), `${n}`).toBe(false);
    for (const n of [1, 7, 49, 101]) expect(fits({ kind: "odd", target: 0 }, n), `${n}`).toBe(true);
    const tens = { kind: "digitIs" as const, target: 4, of: 10 };
    for (const n of [40, 47, 142]) expect(fits(tens, n), `${n}`).toBe(true);
    for (const n of [4, 54, 104]) expect(fits(tens, n), `${n}`).toBe(false);
    expect(ruleLabel({ kind: "digitIs", target: 3, of: 100 })).toBe("Has 3 hundreds");
    expect(placeName(1)).toBe("ones");
  });

  it("says a handful of coins the way a kid would", () => {
    expect(coinWords([25])).toBe("a quarter");
    expect(coinWords([25, 10, 10])).toBe("a quarter and 2 dimes");
    expect(coinWords([10, 5, 1, 1])).toBe("a dime, a nickel and 2 pennies");
    expect(coinWords([1])).toBe("a penny");
  });

  it("teaches fractions, decimals and percents too", () => {
    const kinds = new Set(ALL_CHOMPER_LEVELS.flatMap((l) => l.boards.map((b) => b.rule.kind)));
    for (const k of ["equivalent", "simplest", "percentOf"]) expect(kinds.has(k as never), `no level uses "${k}"`).toBe(true);
    // And at least one board puts all three forms of a number side by side.
    expect(ALL_CHOMPER_LEVELS.some((l) => l.boards.some((b) => b.style === "mixed"))).toBe(true);
  });

  it("never sets a sum a level did not ask for", () => {
    // "Adding Up" was quietly setting multiplication and division, because
    // every board shared one writer that used whatever it liked.
    const SIGN: Record<string, string> = { "+": "+", "-": "\u2212", x: "\u00d7", "/": "\u00f7" };
    for (const level of ALL_CHOMPER_LEVELS)
      level.boards.forEach((spec, i) => {
        if (!spec.ops) return;
        for (const seed of [1, 2, 3, 9]) {
          const b = buildBoard(spec, i, seed);
          for (const c of b.cells) {
            for (const [op, sign] of Object.entries(SIGN)) {
              if (!c.text.includes(sign)) continue;
              expect(spec.ops, `${level.id} board ${i} set "${c.text}" but only allows ${spec.ops.join(", ")}`).toContain(op);
            }
          }
        }
      });
  });

  it("has a section for each of the four, and one that mixes them", () => {
    const only = (op: string) => ALL_CHOMPER_LEVELS.filter((l) => l.boards.every((b) => b.ops?.length === 1 && b.ops[0] === op));
    for (const op of ["+", "-", "x", "/"]) expect(only(op).length, `nothing drills "${op}" on its own`).toBeGreaterThan(0);
    // And a level where all four turn up, once the four are behind them.
    const mixed = ALL_CHOMPER_LEVELS.filter((l) => l.boards.every((b) => b.ops?.length === 4));
    expect(mixed.length, "nothing puts all four together").toBeGreaterThan(0);
    // The mix comes after all four have been met. Later levels may go back to
    // one operation - Product Pass is nothing but multiplication, and harder
    // than the mix - so this is about where each one is introduced, not where
    // it was last used.
    const at = (l: (typeof ALL_CHOMPER_LEVELS)[number]) => ALL_CHOMPER_LEVELS.indexOf(l);
    const introduced = ["+", "-", "x", "/"].map((op) => Math.min(...only(op).map(at)));
    expect(Math.min(...mixed.map(at)), "the mix should come after all four are met").toBeGreaterThan(Math.max(...introduced));
  });

  it("makes the kid work out arithmetic, not just read numbers", () => {
    const styles = new Set(ALL_CHOMPER_LEVELS.flatMap((l) => l.boards.map((b) => b.style)));
    expect(styles.has("fact")).toBe(true);
    expect(styles.has("twostep")).toBe(true);
    expect(styles.has("fraction")).toBe(true);
    expect(styles.has("mixed")).toBe(true);
  });

  it("starts small and works up, round by round and rung by rung", () => {
    // How far a board reaches: the biggest number in play, plus what the rule
    // asks about. It is a rough measure and it is meant to be - the point is
    // that a level never goes backwards, and that the first rung asks about
    // single digits rather than opening with "less than fifteen".
    const reach = (spec: { hi: number; rule: { target: number; of?: number } }) =>
      Math.max(spec.hi, Math.abs(spec.rule.target), Math.abs(spec.rule.of ?? 0)) + Math.abs(spec.rule.target);
    for (const l of ALL_CHOMPER_LEVELS) {
      // Geometry boards have no number range to get bigger - three sides,
      // four sides, square corners is a climb in ideas, not in digits.
      if (l.boards.every((b) => b.hi === 0)) continue;
      const r = l.boards.map(reach);
      for (let i = 1; i < r.length; i++) {
        expect(r[i], `${l.id} board ${i + 1} is easier than the one before it: ${r.map(Math.round).join(" -> ")}`).toBeGreaterThanOrEqual(r[i - 1]);
      }
    }
    // The ladder itself climbs by grade, which the ordering test covers; the
    // first rung is the one that has to be gentle enough for a five-year-old.
    const first = ALL_CHOMPER_LEVELS[0];
    for (const spec of first.boards) expect(Math.abs(spec.rule.target), `${first.id} asks about a big number`).toBeLessThanOrEqual(10);
  });

  it("has unique ids, three boards a level, and an intro that says the skill", () => {
    const ids = ALL_CHOMPER_LEVELS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const l of ALL_CHOMPER_LEVELS) {
      expect(l.boards, l.id).toHaveLength(3);
      expect(l.intro, l.id).toMatch(/^Skill/);
      expect(levelById(l.id)).toBe(l);
      expect(l.title + l.intro).not.toMatch(BANNED);
    }
  });

  it("is registered, and has a screen to render it", () => {
    expect(gameById("chompers")).toBe(chompers);
    expect(GAME_UI.chompers).toBeTruthy();
  });

  it("leaves no game registered without a screen, which renders blank", () => {
    for (const g of GAMES) expect(GAME_UI[g.id], `${g.id} has no screen`).toBeTruthy();
  });
});

describe("existing games still get the same levels", () => {
  // The levelsForKid change lets one game serve both K-5 grades and 6-12 bands.
  // These are the before-and-after values for the games that were there first.
  it("keeps the K-5 games to their own grades", () => {
    const hop = gameById("numberhop")!;
    expect(levelsForKid(hop, 2).map((l) => l.id)).toEqual(["g2-1", "g2-2", "g2-3"]);
    for (const grade of [0, 3, 4, 5, 6, 9]) expect(levelsForKid(hop, grade), `numberhop grade ${grade}`).toEqual([]);
    const garden = gameById("arraygarden")!;
    expect(levelsForKid(garden, 3).length).toBeGreaterThan(0);
    for (const grade of [0, 1, 5, 6, 9]) expect(levelsForKid(garden, grade), `arraygarden grade ${grade}`).toEqual([]);
  });

  it("keeps the band games to grades 4 and up", () => {
    const rocket = gameById("rocket")!;
    for (const grade of [0, 1, 2, 3]) expect(levelsForKid(rocket, grade), `rocket grade ${grade}`).toEqual([]);
    for (const grade of [4, 7, 11]) expect(levelsForKid(rocket, grade).length, `rocket grade ${grade}`).toBeGreaterThan(0);
  });
});

describe("the rules", () => {
  it("knows a multiple from a factor", () => {
    expect(fits({ kind: "multiples", target: 7 }, 21)).toBe(true);
    expect(fits({ kind: "multiples", target: 7 }, 27)).toBe(false);
    expect(fits({ kind: "factors", target: 36 }, 9)).toBe(true);
    expect(fits({ kind: "factors", target: 36 }, 8)).toBe(false);
    // 1 and the number itself are factors; 0 is a multiple of nothing here.
    expect(fits({ kind: "factors", target: 36 }, 1)).toBe(true);
    expect(fits({ kind: "factors", target: 36 }, 36)).toBe(true);
    expect(fits({ kind: "multiples", target: 7 }, 0)).toBe(false);
  });

  it("knows the primes, including the ones that only look prime", () => {
    for (const n of [2, 3, 13, 29, 41, 97]) expect(fits({ kind: "primes", target: 0 }, n), `${n}`).toBe(true);
    for (const n of [0, 1, 51, 57, 87, 91, 100]) expect(fits({ kind: "primes", target: 0 }, n), `${n}`).toBe(false);
    for (const n of [51, 57, 87, 91]) expect(fits({ kind: "composites", target: 0 }, n), `${n}`).toBe(true);
    for (const n of [0, 1, 2, 13]) expect(fits({ kind: "composites", target: 0 }, n), `${n}`).toBe(false);
  });

  it("judges equalities and inequalities", () => {
    expect(fits({ kind: "equals", target: 42 }, 42)).toBe(true);
    expect(fits({ kind: "equals", target: 42 }, 41)).toBe(false);
    expect(fits({ kind: "less", target: 50 }, 49)).toBe(true);
    expect(fits({ kind: "less", target: 50 }, 50)).toBe(false);
    expect(fits({ kind: "greater", target: 50 }, 51)).toBe(true);
    expect(fits({ kind: "greater", target: 50 }, 50)).toBe(false);
  });

  it("knows squares, common multiples and common factors", () => {
    for (const n of [0, 1, 4, 9, 100, 144, 961]) expect(fits({ kind: "squares", target: 0 }, n), `${n}`).toBe(true);
    for (const n of [2, 3, 8, 99, 127, 300]) expect(fits({ kind: "squares", target: 0 }, n), `${n}`).toBe(false);
    const cm = { kind: "commonMultiples" as const, target: 4, of: 6 };
    for (const n of [12, 24, 36, 120]) expect(fits(cm, n), `${n}`).toBe(true);
    for (const n of [4, 6, 8, 18, 0]) expect(fits(cm, n), `${n}`).toBe(false);
    const cf = { kind: "commonFactors" as const, target: 48, of: 72 };
    for (const n of [1, 2, 3, 4, 6, 8, 12, 24]) expect(fits(cf, n), `${n}`).toBe(true);
    for (const n of [5, 16, 48, 72]) expect(fits(cf, n), `${n}`).toBe(false);
  });

  it("works out a percent of a number", () => {
    expect(percentValue({ kind: "percentOf", target: 25, of: 80 })).toBe(20);
    expect(percentValue({ kind: "percentOf", target: 12.5, of: 64 })).toBe(8);
    expect(fits({ kind: "percentOf", target: 15, of: 240 }, 36)).toBe(true);
    expect(fits({ kind: "percentOf", target: 15, of: 240 }, 35)).toBe(false);
  });

  it("handles numbers below zero", () => {
    expect(fits({ kind: "greater", target: -5 }, -4)).toBe(true);
    expect(fits({ kind: "greater", target: -5 }, -12)).toBe(false);
    expect(fits({ kind: "less", target: 0 }, -1)).toBe(true);
    expect(fits({ kind: "less", target: 0 }, 0)).toBe(false);
    expect(fits({ kind: "equals", target: -12 }, -12)).toBe(true);
  });

  it("reads as a rule a kid understands", () => {
    expect(ruleLabel({ kind: "multiples", target: 7 })).toBe("Multiples of 7");
    expect(ruleLabel({ kind: "primes", target: 0 })).toBe("Prime numbers");
    expect(ruleLabel({ kind: "less", target: 60 })).toBe("Less than 60");
    expect(ruleLabel({ kind: "squares", target: 0 })).toBe("Square numbers");
    expect(ruleLabel({ kind: "commonMultiples", target: 4, of: 6 })).toBe("Multiples of both 4 and 6");
    expect(ruleLabel({ kind: "evaluates", target: 20, of: 5 })).toBe("With x = 5, equals 20");
    expect(ruleLabel({ kind: "equivalent", target: 0.75, frac: { n: 3, d: 4 } })).toBe("Worth the same as 3/4");
  });

  it("explains a wrong munch without giving the board away", () => {
    const t = teachFor({ kind: "multiples", target: 5 }, { text: "12", value: 12, ok: false });
    expect(t).toContain("12");
    expect(t).toContain("5");
    expect(teachFor({ kind: "primes", target: 0 }, { text: "51", value: 51, ok: false })).toContain("51 = 3 × 17");
    expect(teachFor({ kind: "equals", target: 42 }, { text: "6 × 8", value: 48, ok: false })).toBe("6 × 8 is 48, not 42.");
    // Every rule has something to say about every cell it could be eaten on.
    for (const level of ALL_CHOMPER_LEVELS)
      for (let i = 0; i < level.boards.length; i++) {
        const b = buildBoard(level.boards[i], i, 7);
        for (const c of b.cells.filter((c) => !c.ok)) {
          const line = teachFor(b.rule, c);
          expect(line.length, `${level.id} / ${c.text}`).toBeGreaterThan(10);
          expect(line).not.toMatch(BANNED);
          expect(line).not.toContain("undefined");
          expect(line).not.toContain("NaN");
        }
      }
  });
});

describe("building a board", () => {
  it("always holds the same number of right answers, so no seed is a lucky seed", () => {
    for (const level of ALL_CHOMPER_LEVELS)
      for (let i = 0; i < level.boards.length; i++)
        for (let seed = 0; seed <= 200; seed++) {
          const b = buildBoard(level.boards[i], i, seed);
          expect(b.cells, `${level.id} board ${i} seed ${seed}`).toHaveLength(CELLS);
          expect(b.cells.filter((c) => c.ok).length, `${level.id} board ${i} seed ${seed}`).toBe(rightOn(level.boards[i]));
        }
    // Thousands of boards: slow enough to trip the default timeout when the
    // whole suite is running at once.
  }, 30000);

  it("writes money the way a kid says it", () => {
    // The dollar sign went missing once already and nothing failed: the rule
    // banner reads off its own label, so only the coach noticed.
    expect(money(5)).toBe("5¢");
    expect(money(99)).toBe("99¢");
    expect(money(100)).toBe("$1.00");
    expect(money(125)).toBe("$1.25");
    expect(money(250)).toBe("$2.50");
  });

  it("holds enough right answers to be worth playing", () => {
    for (const level of ALL_CHOMPER_LEVELS)
      for (const spec of level.boards) {
        expect(rightOn(spec), `${level.id} / ${spec.rule.kind}`).toBeGreaterThanOrEqual(6);
        expect(rightOn(spec)).toBeLessThanOrEqual(CORRECT_PER_BOARD);
      }
  });

  it("never shows the same thing on two squares, which would waste one", () => {
    // This is what caught the composite boards: too narrow a range left too few
    // primes to fill the wrong squares, so the board repeated itself.
    everyBoard((level, i, seed) => {
      // Money boards are the exception, and say so. There are at most six
      // ways to make an amount out of six coins, and a board wants ten right
      // answers - showing a handful twice is the lesser of the two evils.
      if (level.boards[i].dupes) return;
      const b = buildBoard(level.boards[i], i, seed);
      const texts = b.cells.map((c) => c.text);
      expect(new Set(texts).size, `${level.id} board ${i} seed ${seed} repeats a square`).toBe(CELLS);
    }, [0, 1, 2, 3, 7, 42, 99]);
  });

  it("still gives a money board several different ways to make its amount", () => {
    // The whole point of these two levels: the same amount, made more than one
    // way. A board whose ten right squares were all the same handful would be
    // a matching exercise, not a counting one.
    everyBoard((level, i, seed) => {
      if (!level.boards[i].dupes) return;
      const b = buildBoard(level.boards[i], i, seed);
      const ways = new Set(b.cells.filter((c) => c.ok).map((c) => c.text));
      expect(ways.size, `${level.id} board ${i} seed ${seed} only has ${ways.size} way(s) to make it`).toBeGreaterThanOrEqual(3);
      // And every right square really is worth the amount asked for.
      for (const c of b.cells.filter((x) => x.ok)) expect(c.value).toBe(level.boards[i].rule.target);
    }, [0, 1, 2, 3, 7, 42, 99]);
  });

  it("writes every cell as something worth what it says", () => {
    everyBoard((level, i, seed) => {
      const b = buildBoard(level.boards[i], i, seed);
      for (const c of b.cells) {
        expect(c.text.trim().length, `${level.id}: empty cell`).toBeGreaterThan(0);
        expect(Number.isFinite(c.value)).toBe(true);
        expect(c.ok, `${level.id}: "${c.text}"`).toBe(fits(b.rule, c));
        // The text is either the number or a sum that comes to it.
        // A picture cell is checked by its picture, not by reading its words -
        // and what the picture is worth depends on what it draws. Dots and
        // coins add up; a shape is worth its number of sides; an angle its
        // degrees; a pair of lines which pair it is.
        if (c.art) {
          const a = c.art;
          const worth =
            a.kind === "shape"
              ? b.rule.kind === "squareCorners"
                ? (SHAPES[a.parts[0]].corners ? 1 : 0)
                : SHAPES[a.parts[0]].sides
              : a.kind === "angle" || a.kind === "lines"
                ? a.parts[0]
                : a.parts.reduce((t, n) => t + n, 0);
          expect(worth, `${level.id}: "${c.text}"`).toBe(c.value);
        }
        else expect(evalCell(c.text, b.rule.of ?? 0), `${level.id}: "${c.text}" should be ${c.value}`).toBeCloseTo(c.value, 9);
      }
    });
  });

  it("is the same board every time, which is how the server re-scores it", () => {
    const a = buildBoard(ALL_CHOMPER_LEVELS[0].boards[0], 0, 42);
    const b = buildBoard(ALL_CHOMPER_LEVELS[0].boards[0], 0, 42);
    expect(a).toEqual(b);
    expect(buildBoard(ALL_CHOMPER_LEVELS[0].boards[0], 0, 43)).not.toEqual(a);
  });

  it("starts the Grumbles in the corners, never on the Chomper, and only ever one hunter", () => {
    everyBoard((level, i, seed) => {
      const b = buildBoard(level.boards[i], i, seed);
      expect(b.grumbles.filter((g) => g.kind === "chaser").length, `${level.id} board ${i} hunters`).toBeLessThanOrEqual(1);
      // A roamer, then a hunter, then one of each.
      expect(b.grumbles.map((g) => g.kind), `${level.id} board ${i} line-up`).toEqual([["plodder"], ["chaser"], ["rover", "chaser"]][i]);
      for (const g of b.grumbles) expect(g.x === 2 && g.y === 2, `${level.id} board ${i}`).toBe(false);
    }, [0, 5, 99]);
  });

  it("walks the Grumbles all over the board and keeps them on it", () => {
    const board = buildBoard(ALL_CHOMPER_LEVELS[0].boards[0], 0, 4);
    let st = startState(board);
    const seen = new Set<string>();
    for (let n = 0; n < 240; n++) {
      st = tick(board, { ...st, lives: LIVES, over: false, cleared: false });
      for (const g of st.foes) {
        expect(g.x >= 0 && g.x < COLS && g.y >= 0 && g.y < ROWS, "a Grumble left the board").toBe(true);
        seen.add(`${g.x},${g.y}`);
      }
    }
    // A Grumble that walked one line and wrapped could only ever reach six
    // squares, or five. Covering more than a row and a column put together
    // is the thing being asserted: it gets about the board.
    expect(seen.size, "the Grumbles stayed in their lanes").toBeGreaterThan(COLS + ROWS);
  });

  it("sends the hunter straight at the Chomper", () => {
    const board = { ...buildBoard(ALL_CHOMPER_LEVELS[0].boards[1], 1, 1), grumbles: [{ kind: "chaser" as const, x: 0, y: 0, dx: 1, dy: 0 }] };
    let st = { ...startState(board), x: 5, y: 4 };
    const gap = () => Math.abs(st.foes[0].x - st.x) + Math.abs(st.foes[0].y - st.y);
    const before = gap();
    // Stand perfectly still; its own clock brings it to you.
    for (let n = 0; n < 6; n++) st = tick(board, { ...st, x: 5, y: 4 });
    expect(gap()).toBeLessThan(before);
  });

  it("walks the same way every time, which is what lets the server replay it", () => {
    const board = buildBoard(ALL_CHOMPER_LEVELS[0].boards[2], 2, 9);
    const run = () => {
      let st = startState(board);
      for (let n = 0; n < 40; n++) st = tick(board, { ...st, lives: LIVES, over: false, cleared: false });
      return st.foes;
    };
    expect(run()).toEqual(run());
    const g = board.grumbles[0];
    expect(grumbleStep(g, board, 3, 0, { x: 1, y: 1 })).toEqual(grumbleStep(g, board, 3, 0, { x: 1, y: 1 }));
  });
});

/**
 * Works out what a cell says, the way a kid would. Only used to check the
 * boards: if this disagrees with the value the game stored, the cell is
 * lying about itself. `x` is the value the rule gives a variable board.
 */
function evalCell(text: string, x = 0): number {
  const round = (v: number) => Math.round(v * 1e9) / 1e9;
  if (text.endsWith("%")) return round(Number(text.slice(0, -1)) / 100);
  for (const sep of ["/", ":"]) {
    const two = text.split(sep);
    if (two.length === 2 && two.every((p) => p !== "" && Number.isFinite(Number(p)))) return round(Number(two[0]) / Number(two[1]));
  }
  const power = text.split("^");
  if (power.length === 2 && power.every((p) => Number.isFinite(Number(p)))) return Number(power[0]) ** Number(power[1]);

  /** One side of a sum: 7, (-4), 3x, or x. */
  const term = (raw: string): number => {
    const t = raw.replace(/[()]/g, "").replace(/−/g, "-");
    if (!t.includes("x")) return Number(t);
    const k = t.slice(0, t.indexOf("x"));
    return (k === "" || k === "-" ? Number(k + "1") : Number(k)) * x;
  };

  if (!text.includes(" ")) return round(term(text));
  const parts = text.replace(/×/g, "*").replace(/÷/g, "/").split(/\s+/);
  const nums: number[] = [];
  const ops: string[] = [];
  parts.forEach((p, i) => (i % 2 === 0 ? nums.push(term(p)) : ops.push(p)));
  // Multiply and divide first.
  for (let i = 0; i < ops.length; ) {
    if (ops[i] === "*" || ops[i] === "/") {
      nums.splice(i, 2, ops[i] === "*" ? nums[i] * nums[i + 1] : nums[i] / nums[i + 1]);
      ops.splice(i, 1);
    } else i++;
  }
  return round(ops.reduce((acc, op, i) => (op === "+" ? acc + nums[i + 1] : acc - nums[i + 1]), nums[0]));
}

describe("playing a board", () => {
  const level = levelById("g3-2")!;
  const board = buildBoard(level.boards[0], 0, 1);
  const firstOk = board.cells.findIndex((c) => c.ok);
  const firstBad = board.cells.findIndex((c) => !c.ok);

  /** The same board with nothing patrolling it, for the tests about munching. */
  const alone = (st: ChomperState): ChomperState => ({ ...st, foes: [] });

  /** Stands on a cell and munches it, so the test says what happens, not the Grumbles. */
  const munchAt = (index: number, lives = LIVES, times = 1) => {
    let st = alone(startState(board, lives));
    for (let i = 0; i < times; i++) {
      st = { ...st, x: index % COLS, y: Math.floor(index / COLS) };
      st = step(board, st, "munch");
    }
    return st;
  };

  const run = (acts: Act[], lives = LIVES) => acts.reduce((st, a) => step(board, st, a), alone(startState(board, lives)));

  it("scores a point for eating the right number", () => {
    const st = munchAt(firstOk);
    expect(st.eaten[firstOk]).toBe(true);
    expect(st.points).toBe(1);
    expect(st.last).toEqual({ kind: "right", cell: firstOk });
  });

  it("costs a strike for eating the wrong one, and the cell stays to come back to", () => {
    const st = munchAt(firstBad);
    expect(st.eaten[firstBad]).toBe(false);
    expect(st.wrong).toBe(1);
    expect(st.strikes).toBe(1);
    expect(st.lives, "one wrong answer is not a whole try").toBe(LIVES);
    expect({ x: st.x, y: st.y }).toEqual({ x: 2, y: 2 });
  });

  it("ends the board when the tries run out", () => {
    const st = munchAt(firstBad, LIVES, LIVES * STRIKES);
    expect(st.over).toBe(true);
    expect(st.lives).toBe(0);
    // And nothing more can happen.
    expect(step(board, st, "munch")).toBe(st);
  });

  it("counts walking into the edge as a turn without moving you", () => {
    let st = { ...startState(board), x: 0, y: 3 };
    st = step(board, st, "left");
    expect({ x: st.x, y: st.y }, "walking into the edge should not move you").toEqual({ x: 0, y: 3 });
    expect(st.turn).toBe(1);
  });

  it("gives the clear bonus only when every right answer is gone", () => {
    const right = board.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    let st = alone(startState(board, 99));
    for (const i of right) {
      st = { ...st, x: i % COLS, y: Math.floor(i / COLS) };
      st = step(board, st, "munch");
    }
    expect(st.cleared).toBe(true);
    expect(st.points).toBe(CORRECT_PER_BOARD + CLEAR_BONUS);
    expect(st.points).toBe(maxFor(level.boards[0]));
  });

  it("counts the board as cleared even if a Grumble arrives on the very last munch", () => {
    const right = board.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    let st = alone(startState(board, 1));
    for (const i of right) {
      st = { ...st, x: i % COLS, y: Math.floor(i / COLS) };
      st = step(board, st, "munch");
    }
    expect(st.cleared).toBe(true);
    expect(st.over).toBe(false);
    expect(st.points).toBe(maxFor(level.boards[0]));
  });

  it("sends the hunter after a kid shuffling on the spot", () => {
    const b2 = buildBoard(level.boards[1], 1, 4);
    let st = startState(b2);
    for (let i = 0; i < 200 && !st.caught; i++) st = step(b2, st, i % 2 ? "left" : "right");
    expect(st.caught, "the hunter never found a Chomper going nowhere").toBeGreaterThan(0);
    expect({ x: st.x, y: st.y }).toEqual({ x: 2, y: 2 });
    expect(st.foes).toEqual(b2.grumbles);
  });

  it("gives a square back when one catches you", () => {
    const b2 = buildBoard(level.boards[1], 1, 4);
    const good = b2.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0).slice(0, 2);
    let st = startState(b2);
    for (const i of good) {
      st = { ...st, x: i % COLS, y: Math.floor(i / COLS) };
      st = step(b2, st, "munch");
    }
    expect(st.points).toBe(2);
    for (let i = 0; i < 200 && !st.caught; i++) st = step(b2, st, i % 2 ? "left" : "right");
    expect(st.caught).toBe(1);
    // The one eaten most recently goes back on the board, and the point with it.
    expect(st.points).toBe(1);
    expect(st.eaten[good[1]]).toBe(false);
    expect(st.eaten[good[0]], "only the last one comes back").toBe(true);
    expect(st.last).toEqual({ kind: "caught", cell: good[1] });
  });

  it("does not take a square for a wrong answer - you never had it", () => {
    const good = board.cells.findIndex((c) => c.ok);
    let st = alone(startState(board));
    st = { ...st, x: good % COLS, y: Math.floor(good / COLS) };
    st = step(board, st, "munch");
    st = { ...st, x: firstBad % COLS, y: Math.floor(firstBad / COLS) };
    st = step(board, st, "munch");
    expect(st.wrong).toBe(1);
    expect(st.strikes).toBe(1);
    expect(st.points, "the right answer is still eaten").toBe(1);
  });

  it("costs a try after three mistakes, in any mix, and starts the board again", () => {
    const good = board.cells.findIndex((c) => c.ok);
    let st = alone(startState(board));
    st = { ...st, x: good % COLS, y: Math.floor(good / COLS) };
    st = step(board, st, "munch");
    expect(st.points).toBe(1);
    for (let n = 0; n < STRIKES; n++) {
      st = { ...st, x: firstBad % COLS, y: Math.floor(firstBad / COLS) };
      st = step(board, st, "munch");
    }
    expect(st.wrong).toBe(STRIKES);
    expect(st.lives).toBe(LIVES - 1);
    expect(st.strikes, "the strikes reset with the new try").toBe(0);
    expect(st.eaten.some(Boolean), "the board starts again").toBe(false);
    expect(st.points).toBe(0);
    expect(st.best, "what was earned on the try is kept as the best so far").toBe(1);
  });
});

describe("scoring a level", () => {
  it("can be three-starred on every rung by a sensible player", () => {
    // perfectMoves is a crude stand-in for a kid: it looks one step ahead
    // and has no idea what a corner is. Three stars opens the next rung, so
    // if even this clears nearly every level the gate is a bar to clear and
    // not a locked door - and a kid still stuck after two goes gets a
    // stopwatch and extra tries anyway.
    let three = 0;
    for (const level of ALL_CHOMPER_LEVELS) {
      const moves = perfectMoves(level);
      const r = replay(level, moves);
      expect(r.boards.every((b) => b.wrong === 0), `${level.id} ate a wrong one`).toBe(true);
      expect(r.stars, `${level.id} scored ${r.points}/${r.max}`).toBe(3);
      expect(chompers.score(level.id, moves)).toEqual({ stars: r.stars, best: r.points });
      if (r.stars === 3) three++;
    }
    expect(three, "every rung should be three-starrable").toBe(ALL_CHOMPER_LEVELS.length);
  });

  it("is always winnable: every board can be finished, whatever seed comes up", () => {
    // The Grumbles must never be able to seal off the last few answers. A
    // hunter that matched the Chomper step for step did exactly that and
    // made every board carrying one impossible; this is what caught it.
    for (const level of ALL_CHOMPER_LEVELS)
      for (let i = 0; i < level.boards.length; i++)
        for (let seed = 1; seed <= 3; seed++) {
          const board = buildBoard(level.boards[i], i, seed);
          let st = startState(board, 9);
          let eaten = 0;
          for (let n = 0; n < 1200 && !st.cleared && !st.over; n++) {
            const a = bestMove(board, st);
            if (!a) break;
            st = step(board, st, a);
            eaten = Math.max(eaten, st.eaten.filter(Boolean).length);
          }
          // Cleared, or well over half the answers eaten on some try. The
          // stand-in is poor at endgames, so the bar is "could clearly play
          // this", not "played it perfectly": a hunter that matched the
          // Chomper step for step left it fleeing with nothing eaten at all.
          const want = rightOn(level.boards[i]);
          // Cleared, or well over half the answers eaten on some try. The
          // bar is "could clearly play this", not "played it perfectly" - a
          // hunter that matched the Chomper step for step left the stand-in
          // fleeing with nothing eaten at all, and that is what this catches.
          // Three stars on every rung is asserted separately, and strictly.
          expect(st.cleared || eaten >= Math.ceil(want * 0.6), `${level.id} board ${i} seed ${seed}: best was ${eaten} of ${want}`).toBe(true);
        }
  });

  it("replays the same way through JSON, which is how it reaches the server", () => {
    for (const level of ALL_CHOMPER_LEVELS) {
      const moves = perfectMoves(level);
      expect(replay(level, JSON.parse(JSON.stringify(moves)))).toEqual(replay(level, moves));
    }
  });

  it("scores a half-finished run in between", () => {
    const level = ALL_CHOMPER_LEVELS[0];
    const moves = perfectMoves(level);
    const half = [moves[0], { seed: moves[1].seed, acts: [] }, { seed: moves[2].seed, acts: [] }];
    const r = replay(level, half);
    expect(r.points).toBe(maxFor(level.boards[0]));
    expect(r.stars).toBe(1);
  });

  it("asks for a share of what the board can give, not a flat ten", () => {
    // A board with only seven ways to write the same number is worth twelve,
    // not fifteen - otherwise three stars would be unreachable on it.
    for (const level of ALL_CHOMPER_LEVELS) {
      expect(maxForLevel(level)).toBe(level.boards.reduce((t, b) => t + rightOn(b) + CLEAR_BONUS, 0));
      expect(replay(level, perfectMoves(level)).max).toBe(maxForLevel(level));
    }
  });

  it("does not let a lost board take the rest of the level with it", () => {
    // Three stars opens the next rung, so a board lost to bad luck must
    // not lock the ladder behind it.
    const level = levelById("g4-2")!;
    const moves = perfectMoves(level);
    const r = replay(level, [{ seed: moves[0].seed, acts: [] }, ...moves.slice(1)]);
    expect(r.boards[0].points).toBe(0);
    expect(r.boards[0].cleared).toBe(false);
    expect(r.boards[1].points).toBeGreaterThan(0);
    expect(r.boards[2].points).toBeGreaterThan(0);
  });

  it("ends the board once every try is spent", () => {
    // Strikes land wherever the numbers fall - every try is a fresh board -
    // so this counts them as they happen rather than from a route worked
    // out in advance.
    const level = levelById("g4-2")!;
    let spent = 0;
    let board = buildBoard(level.boards[0], 0, trySeed(1, 0));
    let st = startState(board);
    for (let n = 0; n < 400 && !st.over; n++) {
      const bad = board.cells.findIndex((c, i) => !c.ok && !st.eaten[i]);
      st = { ...st, x: bad % COLS, y: Math.floor(bad / COLS) };
      const had = st.lives;
      st = step(board, st, "munch");
      if (st.lives < had) {
        spent++;
        board = buildBoard(level.boards[0], 0, trySeed(1, spent));
        st = { ...st, foes: board.grumbles.map((g) => ({ ...g })) };
      }
    }
    expect(st.over).toBe(true);
    expect(st.lives).toBe(0);
    expect(spent, "every try should have been spent").toBe(LIVES);
    expect(st.wrong).toBe(LIVES * STRIKES);
  });
  it("eases off for a kid who is still stuck on the third go", () => {
    const level = ALL_CHOMPER_LEVELS[0];
    const moves = perfectMoves(level).map((m) => ({ ...m, easy: true }));
    expect(replay(level, moves).stars).toBeGreaterThanOrEqual(2);
    expect(cleanMoves([{ seed: 1, acts: [], easy: true }])[0].easy).toBe(true);
    expect(cleanMoves([{ seed: 1, acts: [], easy: "yes" }])[0].easy).toBeUndefined();
  });

  it("uses the usual star curve", () => {
    expect(starsFor(45, 45)).toBe(3);
    expect(starsFor(41, 45)).toBe(3);
    expect(starsFor(27, 45)).toBe(2);
    expect(starsFor(14, 45)).toBe(1);
    expect(starsFor(0, 45)).toBe(0);
    expect(starsFor(5, 0)).toBe(0);
  });
});

describe("when the Grumbles get their turn", () => {
  const level = levelById("g3-2")!;
  const board = buildBoard(level.boards[1], 1, 1);

  it("moves them once for every few moves the Chomper makes", () => {
    let st = startState(board);
    const where = JSON.stringify(st.foes);
    for (let n = 1; n < MONSTER_EVERY; n++) {
      st = step(board, st, "left");
      expect(JSON.stringify(st.foes), "they moved too soon").toBe(where);
      expect(st.phase).toBe(0);
    }
    st = step(board, st, "left");
    expect(st.phase, "their turn should have come round").toBe(1);
  });

  it("gives them nothing at all while the kid sits and thinks", () => {
    // They move with the board, not against a clock. Working an answer out
    // costs nothing, which is what the clock on the board is for.
    const st = playBoard(level.boards[1], 1, { seed: 1, acts: [] }, LIVES);
    expect(st.phase).toBe(0);
    expect(st.foes).toEqual(buildBoard(level.boards[1], 1, 1).grumbles);
  });

  it("counts a munch and a step into the wall as turns, the same as a move", () => {
    // Standing in a corner pressing into it is still a way to let one go
    // past - it costs you turns, which is the price.
    let st = { ...startState(board), x: 0, y: 3 };
    for (let n = 0; n < MONSTER_EVERY; n++) st = step(board, st, "left");
    expect({ x: st.x, y: st.y }).toEqual({ x: 0, y: 3 });
    expect(st.turn).toBe(MONSTER_EVERY);
    expect(st.phase).toBe(1);
  });

  it("deals a fresh set of numbers for every try at a board", () => {
    // A kid who has just lost a try should be solving it again, not
    // remembering which squares were right last time.
    const spec = level.boards[0];
    const seeds = [0, 1, 2].map((t) => trySeed(5, t));
    expect(new Set(seeds).size, "every try should get its own seed").toBe(3);
    const boards = seeds.map((sd) => buildBoard(spec, 0, sd).cells.map((c) => c.text).join("|"));
    expect(new Set(boards).size, "every try should get its own numbers").toBe(3);
    // The rule, though, stays exactly the same - it is the same skill.
    const labels = seeds.map((sd) => buildBoard(spec, 0, sd).label);
    expect(new Set(labels).size).toBe(1);
  });

  it("moves them oftener in Quick mode, which is all it changes", () => {
    // Board one has a roamer and no hunter, so nothing resets the count.
    const acts = Array<Act>(12).fill("left");
    const quick = playBoard(level.boards[0], 0, { seed: 1, acts, quick: true }, LIVES);
    const steady = playBoard(level.boards[0], 0, { seed: 1, acts }, LIVES);
    expect(steady.phase).toBe(Math.floor(acts.length / MONSTER_EVERY));
    expect(quick.phase).toBeGreaterThan(steady.phase);
  });
});

describe("nothing the browser sends can break it", () => {
  const junk: unknown[] = [
    null,
    undefined,
    5,
    "x",
    {},
    [1, 2],
    [{ acts: "munch" }],
    [{ seed: NaN, acts: ["munch"] }],
    [{ seed: Infinity, acts: [null, {}, "fly", 3, "munch"] }],
    [{ seed: -1e9, acts: Array(10000).fill("munch") }],
    [{ seed: 1.5, acts: Array(10000).fill("up") }],
    Array(50).fill({ seed: 1, acts: ["munch"] }),
  ];

  it("scores garbage as nothing, and never throws", () => {
    for (const level of ALL_CHOMPER_LEVELS)
      for (const m of junk) {
        const s = chompers.score(level.id, m);
        expect(s, `${level.id} / ${JSON.stringify(m)?.slice(0, 40)}`).not.toBeNull();
        expect(s!.stars).toBe(0);
        expect(s!.best).toBeLessThanOrEqual(maxForLevel(level));
      }
    expect(chompers.score("nope", perfectMoves(ALL_CHOMPER_LEVELS[0]))).toBeNull();
  });

  it("throws away anything that is not a move", () => {
    expect(cleanMoves("bad")).toEqual([]);
    expect(cleanMoves([{ seed: "7", acts: ["up", "sideways", 4, "munch"] }])).toEqual([{ seed: 7, acts: ["up", "munch"] }]);
    expect(cleanMoves([{ seed: -3.7, acts: null }])).toEqual([{ seed: 3, acts: [] }]);
    expect(cleanMoves(Array(99).fill({ seed: 1, acts: [] })).length).toBe(8);
  });
});

describe("what the game tells the mastery meter", () => {
  const level = ALL_CHOMPER_LEVELS[0];

  it("files what it saw under the lesson's own skill, from the fluency angle", () => {
    const ev = evidenceFor(level.id, perfectMoves(level));
    expect(ev).toHaveLength(level.boards.length);
    for (const e of ev) {
      expect(e.subject).toBe("math");
      expect(e.concept).toBe(level.skill);
      expect(SKILL_BY_ID.has(e.concept) || COURSES.some((c) => c.lessons.some((l) => l.id === e.concept))).toBe(true);
      expect(e.angle).toBe("fluency");
      expect(e.correct).toBe(true);
      expect(e.firstTry).toBe(true);
      expect(e.rung).toBe(0);
      expect(e.weight).toBe(GAME_WEIGHT);
    }
  });

  it("says nothing about a board the kid never touched", () => {
    expect(evidenceFor(level.id, [])).toEqual([]);
    expect(evidenceFor(level.id, [{ seed: 1, acts: [] }])).toEqual([]);
    expect(evidenceFor("nope", perfectMoves(level))).toEqual([]);
    for (const m of [null, 5, "x", [{ acts: 1 }]]) expect(evidenceFor(level.id, m)).toEqual([]);
  });

  it("marks a board cleared the hard way as right, but not first try", () => {
    const b = buildBoard(level.boards[0], 0, 1);
    const near = (i: number) => Math.abs((i % COLS) - 2) + Math.abs(Math.floor(i / COLS) - 2);
    const bad = b.cells.map((c, i) => (c.ok ? -1 : i)).filter((i) => i >= 0).reduce((a, c) => (near(a) <= near(c) ? a : c));
    const right = b.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    // One wrong munch, then clear the board.
    const acts: Act[] = [];
    const goTo = (from: { x: number; y: number }, i: number) => {
      const tx = i % COLS;
      const ty = Math.floor(i / COLS);
      for (let n = 0; n < Math.abs(tx - from.x); n++) acts.push(tx > from.x ? "right" : "left");
      for (let n = 0; n < Math.abs(ty - from.y); n++) acts.push(ty > from.y ? "down" : "up");
      return { x: tx, y: ty };
    };
    let at = { x: 2, y: 2 };
    at = goTo(at, bad);
    acts.push("munch");
    at = { x: 2, y: 2 };
    for (const i of right) {
      at = goTo(at, i);
      acts.push("munch");
    }
    const ev = evidenceFor(level.id, [{ seed: 1, acts }]);
    expect(ev).toHaveLength(1);
    // It either cleared with a wrong munch on the way, or it did not clear -
    // both are honest, and neither is a first-try clear.
    expect(ev[0].firstTry).toBe(false);
  });

  it("cannot mark a skill mastered on its own, however much is munched", () => {
    let meter = emptyMeter();
    const ev = evidenceFor(level.id, perfectMoves(level));
    for (let round = 0; round < 50; round++) for (const e of ev) meter = applyEvidence(meter, { ...e, at: Date.now() + round });
    expect(meter.angles).toEqual(["fluency"]);
    expect(blockers(meter)).toContain("angles");
    expect(isMastered(meter)).toBe(false);
  });

  it("is worth less than the same answer given in a lesson", () => {
    const one = { concept: "x", angle: "fluency", correct: true, firstTry: true, rung: 0, ms: 0, expectedMs: 0, at: 1 };
    const fromGame = applyEvidence(emptyMeter(), { ...one, weight: GAME_WEIGHT });
    const fromLesson = applyEvidence(emptyMeter(), one);
    expect(fromGame.p).toBeGreaterThan(emptyMeter().p);
    expect(fromGame.p).toBeLessThan(fromLesson.p);
    // And a wrong answer in a game does not crater the estimate either.
    const wrong = { ...one, correct: false, firstTry: false };
    expect(applyEvidence(fromLesson, { ...wrong, weight: GAME_WEIGHT }).p).toBeGreaterThan(applyEvidence(fromLesson, wrong).p);
  });
});

describe("the assessment that says where to start", () => {
  const seed = 7;
  const qs = placementQuestions(seed);

  it("asks a handful of questions from up and down the ladder, easiest first", () => {
    expect(qs.length).toBe(PLACEMENT_QUESTIONS);
    const rungs = qs.map((q) => q.rung);
    expect(rungs, "the questions should get harder").toEqual([...rungs].sort((a, b) => a - b));
    expect(rungs[0]).toBe(0);
    expect(rungs.at(-1)).toBe(ALL_CHOMPER_LEVELS.length - 1);
    for (const q of qs) {
      expect(q.cells).toHaveLength(PLACEMENT_CELLS);
      expect(q.cells.filter((c) => c.ok).length, q.label).toBe(PLACEMENT_RIGHT);
      expect(new Set(q.cells.map((c) => c.text)).size, `${q.label} repeats a square`).toBe(PLACEMENT_CELLS);
      expect(q.title).toBe(ALL_CHOMPER_LEVELS[q.rung].title);
    }
  });

  it("is the same questions every time, which is how the server marks them", () => {
    expect(placementQuestions(seed)).toEqual(qs);
    expect(placementQuestions(seed + 1)).not.toEqual(qs);
  });

  it("never tells the browser which squares fit", () => {
    const sent = publicPlacement(qs);
    expect(JSON.stringify(sent)).not.toContain("ok");
    for (const q of sent) for (const c of q.cells) expect(Object.keys(c).sort()).toEqual(c.art ? ["art", "text"] : ["text"]);
  });

  it("starts them on the first rung they got wrong", () => {
    const right = (q: (typeof qs)[number]) => q.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    // All right: the whole ladder opens.
    const all = placeFrom(seed, qs.map(right));
    expect(all.rung).toBe(ALL_CHOMPER_LEVELS.length - 1);
    expect(all.right).toBe(qs.length);
    // Wrong on the fourth: start there, with the three below already open.
    const some = qs.map((q, i) => (i === 3 ? [] : right(q)));
    expect(placeFrom(seed, some).rung).toBe(qs[3].rung);
    expect(placeFrom(seed, some).right).toBe(3);
    expect(placeFrom(seed, some).title).toBe(qs[3].title);
    // Nothing right: the very bottom, same as a kindergartner.
    expect(placeFrom(seed, []).rung).toBe(0);
  });

  it("does not count a half-right answer, or extra squares, as right", () => {
    const q0 = qs[0];
    const right = q0.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    const wrongOne = q0.cells.findIndex((c) => !c.ok);
    expect(placeFrom(seed, [right.slice(0, 1)]).rung, "only one of the two").toBe(qs[0].rung);
    expect(placeFrom(seed, [[...right, wrongOne]]).rung, "both plus a wrong one").toBe(qs[0].rung);
  });

  it("shrugs off anything the browser sends", () => {
    for (const junk of [[], [[]], [[-1, 99, 1.5]], [[0, 0, 0]], Array(50).fill([0])]) {
      const r = placeFrom(seed, junk as number[][]);
      expect(r.rung).toBeGreaterThanOrEqual(0);
      expect(r.rung).toBeLessThan(ALL_CHOMPER_LEVELS.length);
    }
  });
});

describe("the art", () => {
  it("draws a Chomper and a Grumble", () => {
    for (const g of [chomperGrid(0), chomperGrid(1), chomperGrid(2), grumbleGrid("plodder", 0), grumbleGrid("rover", 1), grumbleGrid("chaser", 0), dotsGrid(1), dotsGrid(7), dotsGrid(20), coinsGrid([25]), coinsGrid([25, 10, 5, 1])]) {
      expect(g.px.some(Boolean)).toBe(true);
    }
    // The bite frame really does take a bite out of it.
    expect(chomperGrid(1).px.filter(Boolean).length).toBeLessThan(chomperGrid(0).px.filter(Boolean).length);
  });
});
