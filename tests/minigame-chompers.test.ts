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
  buildBoard,
  chomperGrid,
  chompers,
  cleanMoves,
  coinWords,
  coinsGrid,
  dotsGrid,
  evidenceFor,
  fits,
  grumbleAt,
  GAME_WEIGHT,
  grumbleGrid,
  levelById,
  perfectMoves,
  percentValue,
  replay,
  rightOn,
  ruleLabel,
  safeRoute,
  placeName,
  starsFor,
  startState,
  step,
  survivable,
  teachFor,
  type Act,
  type ChomperLevel,
} from "@/lib/minigames/chompers";

/** The content rule from CLAUDE.md, as a test. */
const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

const everyBoard = (fn: (level: ChomperLevel, boardIndex: number, seed: number) => void, seeds = [1, 2, 3]) => {
  for (const level of ALL_CHOMPER_LEVELS) for (let i = 0; i < level.boards.length; i++) for (const s of seeds) fn(level, i, s);
};

describe("the levels", () => {
  it("covers every grade from kindergarten to 5", () => {
    expect(chompers.grades).toEqual([0, 1, 2, 3, 4, 5]);
    for (const g of [0, 1, 2]) {
      expect(CHOMPER_LEVELS[g].length, `grade ${g}`).toBeGreaterThanOrEqual(2);
      expect(levelsForKid(chompers, g).map((l) => l.id)).toEqual(CHOMPER_LEVELS[g].map((l) => l.id));
    }
    for (const g of [3, 4, 5]) {
      expect(CHOMPER_LEVELS[g].length, `grade ${g}`).toBeGreaterThanOrEqual(4);
      expect(levelsForKid(chompers, g).map((l) => l.id)).toEqual(CHOMPER_LEVELS[g].map((l) => l.id));
    }
  });

  it("gives grades 6-12 levels of their own, not the little kids' turned up", () => {
    for (const grade of [6, 7, 8, 10]) {
      const levels = levelsForKid(chompers, grade);
      expect(levels.length, `grade ${grade}`).toBeGreaterThan(0);
      // Most of what they play is written for them.
      const own = levels.filter((l) => BAND_ONLY_LEVELS.some((b) => b.id === l.id));
      expect(own.length, `grade ${grade} mostly plays younger levels`).toBeGreaterThanOrEqual(levels.length - 2);
      // And the server will let them score what it shows them.
      expect(levelsKidMayPlay(chompers, grade).map((l) => l.id)).toEqual(expect.arrayContaining(levels.map((l) => l.id)));
    }
    // Nothing written for grades 6+ leaks into a K-5 arcade.
    for (const grade of [3, 4, 5]) {
      const ids = levelsForKid(chompers, grade).map((l) => l.id);
      expect(ids.filter((id) => BAND_ONLY_LEVELS.some((b) => b.id === id)), `grade ${grade}`).toEqual([]);
    }
  });

  it("covers the grade 6-8 ground too", () => {
    const kinds = new Set(BAND_ONLY_LEVELS.flatMap((l) => l.boards.map((b) => b.rule.kind)));
    for (const k of ["squares", "commonMultiples", "commonFactors", "evaluates"]) expect(kinds.has(k as never), `no band level uses "${k}"`).toBe(true);
    const styles = new Set(BAND_ONLY_LEVELS.flatMap((l) => l.boards.map((b) => b.style)));
    for (const st of ["signed", "ratio", "power", "variable"]) expect(styles.has(st as never), `no band level uses "${st}"`).toBe(true);
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
    expect(k.every((b) => b.style === "dots")).toBe(true);
    // Dots and numerals share the board, which is the whole point: a kid has
    // to match a drawn 14 against a written 9.
    const b = buildBoard(k[0], 0, 1);
    const drawn = b.cells.filter((c) => c.art);
    expect(drawn.length).toBeGreaterThan(5);
    expect(b.cells.length - drawn.length).toBeGreaterThan(5);
    for (const c of drawn) {
      expect(c.art!.kind).toBe("dots");
      expect(c.art!.parts[0]).toBe(c.value);
      expect(c.text).toBe(`${c.value} dots`);
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

  it("makes the kid work out arithmetic, not just read numbers", () => {
    const styles = new Set(ALL_CHOMPER_LEVELS.flatMap((l) => l.boards.map((b) => b.style)));
    expect(styles.has("fact")).toBe(true);
    expect(styles.has("twostep")).toBe(true);
    expect(styles.has("fraction")).toBe(true);
    expect(styles.has("mixed")).toBe(true);
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
      const b = buildBoard(level.boards[i], i, seed);
      const texts = b.cells.map((c) => c.text);
      expect(new Set(texts).size, `${level.id} board ${i} seed ${seed} repeats a square`).toBe(CELLS);
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
        // A picture cell is checked by its picture, not by reading its words.
        if (c.art) expect(c.art.parts.reduce((t, n) => t + n, 0), `${level.id}: "${c.text}"`).toBe(c.value);
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

  it("never starts a Grumble on top of the Chomper", () => {
    everyBoard((level, i, seed) => {
      const b = buildBoard(level.boards[i], i, seed);
      expect(b.grumbles.length).toBe(i + 1);
      for (const g of b.grumbles) {
        const at = grumbleAt(g, 0);
        expect(at.x === 2 && at.y === 2, `${level.id} board ${i}`).toBe(false);
        // And it stays on the board forever.
        for (const phase of [1, 7, 30, 101]) {
          const p = grumbleAt(g, phase);
          expect(p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS).toBe(true);
        }
      }
    }, [0, 5, 99]);
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

  /** Stands on a cell and munches it, so the test says what happens, not the Grumbles. */
  const munchAt = (index: number, lives = LIVES, times = 1) => {
    let st = startState(lives);
    for (let i = 0; i < times; i++) {
      st = { ...st, x: index % COLS, y: Math.floor(index / COLS) };
      st = step(board, st, "munch");
    }
    return st;
  };

  const run = (acts: Act[], lives = LIVES) => acts.reduce((st, a) => step(board, st, a), startState(lives));

  it("scores a point for eating the right number", () => {
    const st = munchAt(firstOk);
    expect(st.eaten[firstOk]).toBe(true);
    expect(st.points).toBe(1);
    expect(st.last).toEqual({ kind: "right", cell: firstOk });
  });

  it("costs a life for eating the wrong one, and the cell stays to come back to", () => {
    const st = munchAt(firstBad);
    expect(st.eaten[firstBad]).toBe(false);
    expect(st.wrong).toBe(1);
    expect(st.lives).toBe(LIVES - 1);
    expect({ x: st.x, y: st.y }).toEqual({ x: 2, y: 2 });
  });

  it("ends the board when the lives run out", () => {
    const st = munchAt(firstBad, LIVES, 3);
    expect(st.over).toBe(true);
    expect(st.lives).toBe(0);
    // And nothing more can happen.
    expect(step(board, st, "munch")).toBe(st);
  });

  it("lets a kid wait for a Grumble to walk past by pressing into the wall", () => {
    const st = run(["up", "up", "up", "up", "up"]);
    expect(st.y).toBe(0);
    expect(st.turn).toBe(5);
    expect(st.phase).toBeGreaterThan(0);
  });

  it("gives the clear bonus only when every right answer is gone", () => {
    const right = board.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    let st = startState(99);
    for (const i of right) {
      st.x = i % COLS;
      st.y = Math.floor(i / COLS);
      st = step(board, st, "munch");
    }
    expect(st.cleared).toBe(true);
    expect(st.points).toBe(CORRECT_PER_BOARD + CLEAR_BONUS);
    expect(st.points).toBe(maxFor(level.boards[0]));
  });

  it("counts the board as cleared even if a Grumble arrives on the very last munch", () => {
    const right = board.cells.map((c, i) => (c.ok ? i : -1)).filter((i) => i >= 0);
    let st = startState(1);
    for (const i of right) {
      st = { ...st, x: i % COLS, y: Math.floor(i / COLS) };
      st = step(board, st, "munch");
    }
    expect(st.cleared).toBe(true);
    expect(st.over).toBe(false);
    expect(st.points).toBe(maxFor(level.boards[0]));
  });

  it("can be caught by a Grumble", () => {
    const b2 = buildBoard(level.boards[2], 2, 4);
    let st = startState();
    for (let i = 0; i < 60 && !st.caught; i++) st = step(b2, st, i % 2 ? "left" : "right");
    expect(st.caught).toBeGreaterThan(0);
    expect(st.lives).toBeLessThan(LIVES);
  });
});

describe("scoring a level", () => {
  it("gives three stars for a clean run of every level", () => {
    for (const level of ALL_CHOMPER_LEVELS) {
      const moves = perfectMoves(level);
      const r = replay(level, moves);
      expect(r.points, `${level.id} scored ${r.points}/${r.max}`).toBe(r.max);
      expect(r.boards.every((b) => b.cleared), level.id).toBe(true);
      expect(r.boards.every((b) => b.wrong === 0 && b.caught === 0), `${level.id} took damage`).toBe(true);
      expect(r.lives).toBe(LIVES);
      expect(chompers.score(level.id, moves)).toEqual({ stars: 3, best: r.max });
    }
  });

  it("is always winnable: a clean route exists on every board, whatever seed comes up", () => {
    // The Grumbles must never be able to seal off a right answer. If this ever
    // fails, that board is unfair however well the kid plays.
    for (const level of ALL_CHOMPER_LEVELS)
      for (let i = 0; i < level.boards.length; i++)
        for (let seed = 1; seed <= 10; seed++) {
          const b = buildBoard(level.boards[i], i, seed);
          const alive = survivable(b);
          expect(alive.size, `${level.id} board ${i} seed ${seed}: nowhere safe to stand`).toBeGreaterThan(0);
          const targets = b.cells.map((c, idx) => (c.ok ? idx : -1)).filter((idx) => idx >= 0);
          expect(safeRoute(b, { x: 2, y: 2, phase: 0 }, targets, alive), `${level.id} board ${i} seed ${seed}: no safe first move`).not.toBeNull();
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

  it("stops scoring once the lives are gone", () => {
    const level = levelById("g4-2")!;
    const b = buildBoard(level.boards[0], 0, 1);
    const bad = b.cells.findIndex((c) => !c.ok);
    const to: Act[] = [];
    for (let i = 0; i < Math.abs((bad % COLS) - 2); i++) to.push(bad % COLS > 2 ? "right" : "left");
    for (let i = 0; i < Math.abs(Math.floor(bad / COLS) - 2); i++) to.push(Math.floor(bad / COLS) > 2 ? "down" : "up");
    const kill = [...to, "munch" as Act, ...to, "munch" as Act, ...to, "munch" as Act];
    const r = replay(level, [{ seed: 1, acts: kill }, ...perfectMoves(level).slice(1)]);
    expect(r.lives).toBe(0);
    expect(r.boards[1].points).toBe(0);
    expect(r.boards[2].points).toBe(0);
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
    const bad = b.cells.findIndex((c) => !c.ok);
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

describe("the art", () => {
  it("draws a Chomper and a Grumble", () => {
    for (const g of [chomperGrid(0), chomperGrid(1), chomperGrid(2), grumbleGrid("plodder", 0), grumbleGrid("pacer", 1), dotsGrid(1), dotsGrid(7), dotsGrid(20), coinsGrid([25]), coinsGrid([25, 10, 5, 1])]) {
      expect(g.px.some(Boolean)).toBe(true);
    }
    // The bite frame really does take a bite out of it.
    expect(chomperGrid(1).px.filter(Boolean).length).toBeLessThan(chomperGrid(0).px.filter(Boolean).length);
  });
});
