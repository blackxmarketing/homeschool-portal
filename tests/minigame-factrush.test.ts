import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import { SKILL_BY_ID } from "@/lib/curriculum/skills";
import { GAMES, gameById } from "@/lib/minigames";
import { GAME_UI } from "@/components/minigames/registry";
import {
  ALL_FACT_LEVELS,
  MAX_ASKS,
  NEED,
  TOP,
  afterAnswer,
  blockGrid,
  cageGrid,
  cloudGrid,
  evidenceFor,
  factRush,
  familyFacts,
  hillGrid,
  levelById,
  maxPoints,
  openingPile,
  paceOf,
  perfectMoves,
  pipeGrid,
  play,
  postsOn,
  replay,
  starsFor,
  workedCard,
  type FactLevel,
} from "@/lib/minigames/factrush";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

describe("the cards", () => {
  it("gets every fact in the family right", () => {
    for (const op of ["+", "-", "x", "/"] as const) {
      for (let n = 1; n <= TOP; n++) {
        const cards = familyFacts(op, n);
        expect(cards.length, `${op} ${n}s`).toBe(TOP);
        for (const c of cards) {
          const want = c.op === "+" ? c.a + c.b : c.op === "-" ? c.a - c.b : c.op === "x" ? c.a * c.b : c.a / c.b;
          expect(c.answer, `${c.text}`).toBe(want);
          // A drill card a kid cannot answer in whole numbers is a bug.
          expect(Number.isInteger(c.answer), `${c.text} = ${c.answer}`).toBe(true);
          expect(c.answer, `${c.text} goes negative`).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it("never asks anyone to divide by nothing", () => {
    for (const l of ALL_FACT_LEVELS) for (const c of l.cards) if (c.op === "/") expect(c.b).toBeGreaterThan(0);
  });

  it("turns the taking away and the sharing round the right way", () => {
    // The 3s of subtraction should undo the 3s of addition.
    const add = familyFacts("+", 3);
    const sub = familyFacts("-", 3);
    for (let i = 0; i < add.length; i++) expect(sub[i].answer).toBe(add[i].b);
    const times = familyFacts("x", 4);
    const share = familyFacts("/", 4);
    for (let i = 0; i < times.length; i++) expect(share[i].a).toBe(times[i].answer);
  });

  it("counts coins up to a dollar and no further", () => {
    for (const l of ALL_FACT_LEVELS.filter((x) => x.skill === "math-2.time-money")) {
      for (const c of l.cards) {
        expect(c.answer, `${l.id}: "${c.text}" is ${c.answer}`).toBeGreaterThan(0);
        expect(c.answer, `${l.id}: "${c.text}" is over a dollar`).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("the ladder", () => {
  it("has a level for every family of all four operations, plus the coins", () => {
    const ids = ALL_FACT_LEVELS.map((l) => l.id);
    for (const p of ["a", "s", "x", "d"]) for (let n = 1; n <= TOP; n++) expect(ids, `missing ${p}${n}`).toContain(`fr-${p}${n}`);
    expect(ids).toContain("fr-cmix");
  });

  it("has unique ids and an intro on every level", () => {
    expect(new Set(ALL_FACT_LEVELS.map((l) => l.id)).size).toBe(ALL_FACT_LEVELS.length);
    for (const l of ALL_FACT_LEVELS) {
      expect(l.intro.length, `${l.id} has no intro`).toBeGreaterThan(20);
      expect(l.cards.length, `${l.id} has no cards`).toBeGreaterThan(0);
    }
  });

  it("climbs: the ones before the twos, and adding before times", () => {
    const grades = ALL_FACT_LEVELS.map((l) => l.grade);
    expect(grades).toEqual([...grades].sort((a, b) => a - b));
  });

  it("names a real curriculum skill on every level, so the drill can't drift from the lessons", () => {
    const lessons = new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
    for (const l of ALL_FACT_LEVELS) {
      expect(SKILL_BY_ID.has(l.skill) || lessons.has(l.skill), `${l.id} -> ${l.skill} is not a real skill or lesson`).toBe(true);
    }
  });

  it("keeps the family rule in every word it shows a kid", () => {
    for (const l of ALL_FACT_LEVELS) {
      expect(l.title + l.intro).not.toMatch(BANNED);
      expect(workedCard(l).say).not.toMatch(BANNED);
    }
  });

  it("is registered, and has a screen to render it", () => {
    expect(gameById("factrush")).toBe(factRush);
    expect(GAME_UI.factrush).toBeTruthy();
    for (const g of GAMES) expect(GAME_UI[g.id], `${g.id} has no screen`).toBeTruthy();
  });
});

describe("the pile", () => {
  const level = levelById("fr-a3")!;

  it("starts with every card once, mixed up", () => {
    const pile = openingPile(level, 7);
    expect(pile.length).toBe(level.cards.length);
    expect(new Set(pile.map((s) => s.i)).size).toBe(level.cards.length);
  });

  it("deals the same pile from the same seed, and a different one from another", () => {
    expect(openingPile(level, 7).map((s) => s.i)).toEqual(openingPile(level, 7).map((s) => s.i));
    expect(openingPile(level, 7).map((s) => s.i)).not.toEqual(openingPile(level, 8).map((s) => s.i));
  });

  it("keeps a card until it has come up right twice", () => {
    let pile = openingPile(level, 1);
    const first = pile[0].i;
    pile = afterAnswer(pile, true);
    expect(pile.map((s) => s.i)).toContain(first);
    expect(pile[pile.length - 1]).toEqual({ i: first, got: 1 });
    // Round it comes again, and this time it is done with.
    while (pile[0].i !== first) pile = afterAnswer(pile, true);
    pile = afterAnswer(pile, true);
    expect(pile.map((s) => s.i)).not.toContain(first);
  });

  it("wipes what a card had banked when it is missed", () => {
    let pile = openingPile(level, 1);
    const first = pile[0].i;
    pile = afterAnswer(pile, true);
    while (pile[0].i !== first) pile = afterAnswer(pile, true);
    pile = afterAnswer(pile, false);
    expect(pile[pile.length - 1], "a missed card goes back to nothing banked").toEqual({ i: first, got: 0 });
  });
});

describe("the run", () => {
  const level = levelById("fr-x6")!;

  it("gives three stars for a clean quick run, and the finish bonus", () => {
    const r = replay(level, perfectMoves(level));
    expect(r.finished).toBe(true);
    expect(r.wrong).toBe(0);
    expect(r.posts).toBe(postsOn(level));
    expect(r.points).toBe(maxPoints(level));
    expect(r.stars).toBe(3);
  });

  it("does not move them on a wrong answer", () => {
    const pile = openingPile(level, 1);
    const right = level.cards[pile[0].i].answer;
    const r = play(level, { seed: 1, answers: [{ a: right + 1, ms: 500 }] });
    expect(r.posts).toBe(0);
    expect(r.wrong).toBe(1);
    expect(r.points).toBe(0);
  });

  it("pays more for a quick answer than a slow one", () => {
    const quick = replay(level, perfectMoves(level, 3));
    const slow = replay(level, { ...perfectMoves(level, 3), answers: perfectMoves(level, 3).answers.map((a) => ({ ...a, ms: 9000 })) });
    expect(quick.points).toBeGreaterThan(slow.points);
    expect(paceOf(500)).toBe("sprint");
    expect(paceOf(4000)).toBe("run");
    expect(paceOf(9000)).toBe("trot");
  });

  it("replays the same from the same answers, through a JSON round trip", () => {
    const moves = perfectMoves(level, 42);
    const a = replay(level, moves);
    const b = replay(level, JSON.parse(JSON.stringify(moves)));
    expect(b).toEqual(a);
  });

  it("will not be talked into stars by junk", () => {
    const junk: unknown[] = [
      null,
      undefined,
      0,
      "run",
      [],
      {},
      { seed: NaN, answers: null },
      { seed: Infinity, answers: [{ a: Infinity, ms: -5 }] },
      { seed: 1, answers: Array.from({ length: 10000 }, () => ({ a: 1, ms: 1 })) },
      { seed: -1, answers: [{ a: "12", ms: "0" }] },
    ];
    for (const j of junk) {
      const r = replay(level, j);
      expect(r.stars, `${JSON.stringify(j)?.slice(0, 40)} earned stars`).toBe(0);
      expect(r.points).toBe(0);
    }
  });

  it("stops rather than running forever when a kid never gets one right", () => {
    const wrong = Array.from({ length: 10000 }, () => ({ a: -1, ms: 100 }));
    const r = play(level, { seed: 1, answers: wrong });
    expect(r.finished).toBe(false);
    expect(r.wrong).toBeLessThanOrEqual(MAX_ASKS);
  });

  it("scores through the game's own entry point, the way the server does", () => {
    const got = factRush.score(level.id, perfectMoves(level));
    expect(got?.stars).toBe(3);
    expect(factRush.score("no-such-level", perfectMoves(level))).toBeNull();
    expect(factRush.score(level.id, { seed: 1, answers: "nope" })?.stars).toBe(0);
  });

  it("asks every card at least twice over a finished run", () => {
    const moves = perfectMoves(level, 5);
    expect(moves.answers.length).toBe(level.cards.length * NEED);
  });

  it("uses the usual star curve", () => {
    expect(starsFor(100, 100)).toBe(3);
    expect(starsFor(70, 100)).toBe(2);
    expect(starsFor(10, 100)).toBe(1);
    expect(starsFor(0, 100)).toBe(0);
    expect(starsFor(5, 0)).toBe(0);
  });
});

describe("what it tells the mastery meter", () => {
  const level = levelById("fr-a2")!;

  it("writes one row per card, under the skill the lessons use", () => {
    const ev = evidenceFor(level.id, perfectMoves(level));
    expect(ev.length).toBe(level.cards.length);
    for (const e of ev) {
      expect(e.concept).toBe(level.skill);
      expect(e.subject).toBe("math");
      expect(e.angle).toBe("fluency");
      expect(e.correct).toBe(true);
      expect(e.firstTry).toBe(true);
      // A game answer counts for less than a graded lesson answer.
      expect(e.weight).toBeLessThan(1);
    }
  });

  it("marks a card that was missed as not first try", () => {
    const pile = openingPile(level, 9);
    const first = pile[0].i;
    const moves = { seed: 9, answers: [{ a: -1, ms: 400 }, ...perfectMoves(level, 9).answers] };
    const ev = evidenceFor(level.id, moves);
    expect(ev.some((e) => !e.firstTry), "a missed card should show as not first try").toBe(true);
    expect(level.cards[first]).toBeTruthy();
  });

  it("says nothing at all about a level that does not exist, or junk", () => {
    expect(evidenceFor("no-such-level", perfectMoves(level))).toEqual([]);
    expect(evidenceFor(level.id, null)).toEqual([]);
    expect(factRush.evidence?.(level.id, "rubbish")).toEqual([]);
  });
});

describe("the art", () => {
  it("draws something in every piece of the scene", () => {
    const grids = [cloudGrid(false), cloudGrid(true), hillGrid(), blockGrid("brick"), blockGrid("prize"), pipeGrid(), cageGrid(false), cageGrid(true)];
    for (const g of grids) {
      expect(g.w).toBeGreaterThan(0);
      expect(g.h).toBeGreaterThan(0);
      let filled = 0;
      for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.get(x, y)) filled++;
      expect(filled, "a sprite with nothing drawn in it").toBeGreaterThan(4);
    }
  });

  it("opens the cage when the run is finished", () => {
    const shut = cageGrid(false);
    const open = cageGrid(true);
    const count = (g: ReturnType<typeof cageGrid>) => {
      let n = 0;
      for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.get(x, y)) n++;
      return n;
    };
    expect(count(open), "the open cage should have fewer bars than the shut one").toBeLessThan(count(shut));
  });
});

describe("the coach's example", () => {
  it("works a card out for every level, without giving them the first question", () => {
    for (const l of ALL_FACT_LEVELS as FactLevel[]) {
      const { card, say } = workedCard(l);
      expect(l.cards).toContain(card);
      expect(say).toContain(String(card.answer));
      expect(say, `${l.id}: "${say}"`).not.toMatch(/undefined|NaN|\[object/);
    }
  });
});
