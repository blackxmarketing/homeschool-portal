import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
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
  LIVES,
  STRIKES,
  TOKEN_EVERY,
  familyFacts,
  hazardAt,
  holeGrid,
  mountainGrid,
  riverGrid,
  tokenGrid,
  tokenOn,
  hillGrid,
  drawOf,
  levelById,
  maxPoints,
  needOf,
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

describe("the dungeons", () => {
  const dungeons = ALL_FACT_LEVELS.filter((l) => l.dungeon);

  it("puts one at the end of each of the four sets", () => {
    expect(dungeons.map((l) => l.id)).toEqual(["fr-adun", "fr-sdun", "fr-xdun", "fr-ddun"]);
    // And each sits after the twelfth family of its own operation.
    for (const d of dungeons) {
      const twelfth = ALL_FACT_LEVELS.findIndex((l) => l.id === d.id.replace("dun", "12"));
      expect(twelfth, `${d.id} has no 12s before it`).toBeGreaterThan(-1);
      expect(ALL_FACT_LEVELS.indexOf(d)).toBe(twelfth + 1);
    }
  });

  it("holds every family of its operation, not just the last one", () => {
    for (const d of dungeons) {
      expect(d.cards.length, `${d.id}`).toBe(TOP * TOP);
      // The 1s and the 12s both have to be in there.
      const firsts = new Set(d.cards.map((c) => (c.op === "+" || c.op === "x" ? c.a : c.b)));
      for (let n = 1; n <= TOP; n++) expect(firsts.has(n), `${d.id} is missing the ${n}s`).toBe(true);
    }
  });

  it("deals two dozen at a time, wanted right once, so it asks rather than drills", () => {
    for (const d of dungeons) {
      expect(needOf(d)).toBe(1);
      expect(drawOf(d)).toBe(24);
      expect(postsOn(d)).toBe(24);
      expect(openingPile(d, 5).length).toBe(24);
      // A different draw next time: it cannot be learned by rote.
      expect(openingPile(d, 5).map((s) => s.i)).not.toEqual(openingPile(d, 6).map((s) => s.i));
    }
  });

  it("can be run clean for three stars, and scores through the server's door", () => {
    for (const d of dungeons) {
      const r = replay(d, perfectMoves(d));
      expect(r.finished, `${d.id} could not be finished`).toBe(true);
      expect(r.posts).toBe(24);
      expect(r.stars).toBe(3);
      expect(factRush.score(d.id, perfectMoves(d))?.stars).toBe(3);
    }
  });

  it("still stops them dead on a wrong answer", () => {
    const d = dungeons[0];
    const pile = openingPile(d, 2);
    const r = play(d, { seed: 2, answers: [{ a: d.cards[pile[0].i].answer + 1, ms: 400 }] });
    expect(r.posts).toBe(0);
    expect(r.wrong).toBe(1);
  });

  it("is drawn as a dungeon, and the drills are not", () => {
    for (const l of ALL_FACT_LEVELS) expect(!!l.dungeon).toBe(l.id.endsWith("dun"));
  });
});

describe("answering from the keyboard", () => {
  const screen = fs.readFileSync(path.join(process.cwd(), "src/components/minigames/FactRushGame.tsx"), "utf8");

  it("never answers from inside a setState updater", () => {
    // React runs updaters twice over in development, so answering inside one
    // sent two answers for one press of Enter: the second went against the
    // next card with the same number and came back as a miss in red.
    expect(screen, "answer() is being called inside a setTyped updater again").not.toMatch(/setTyped\(\([^)]*\)\s*=>\s*\{[^}]*answer\(/s);
  });

  it("reads what was typed from a ref, not from a render", () => {
    // A kid who hits Enter in the same instant as the last digit would lose
    // that digit if the handler read state instead.
    expect(screen).toContain("answer(Number(typedRef.current))");
    expect(screen).toContain("typedRef.current = next(typedRef.current)");
  });

  it("takes Enter and the space bar", () => {
    expect(screen).toContain(`e.key === "Enter" || e.key === " "`);
  });
});

describe("lives, tokens and what is in the way", () => {
  const level = levelById("fr-x6")!;
  /** Answers that are all wrong, so lives go in a straight line. */
  const misses = (n: number) => ({ seed: 1, answers: Array.from({ length: n }, () => ({ a: -1, ms: 500 })) });

  it("gives three lives and takes one every three misses", () => {
    expect(play(level, misses(1)).lives).toBe(LIVES);
    expect(play(level, misses(2)).lives).toBe(LIVES);
    expect(play(level, misses(3)).lives).toBe(LIVES - 1);
    expect(play(level, misses(6)).lives).toBe(LIVES - 2);
    expect(play(level, misses(9)).lives).toBe(0);
  });

  it("ends the run when the lives are gone, and stops counting after", () => {
    const r = play(level, misses(30));
    expect(r.over).toBe(true);
    expect(r.finished).toBe(false);
    // Nine misses took the three lives; nothing after that was looked at.
    expect(r.wrong).toBe(STRIKES * LIVES);
    expect(r.lives).toBe(0);
  });

  it("never goes over on a clean run", () => {
    const r = replay(level, perfectMoves(level));
    expect(r.over).toBe(false);
    expect(r.lives).toBe(LIVES);
    expect(r.finished).toBe(true);
  });

  it("grows them on a token, and spends the size instead of a life", () => {
    // Run cleanly to the first token, then miss three times.
    const clean = perfectMoves(level).answers.slice(0, TOKEN_EVERY);
    const r = play(level, { seed: 1, answers: [...clean, ...misses(3).answers] });
    expect(tokenOn(TOKEN_EVERY)).toBe(true);
    expect(r.posts).toBe(TOKEN_EVERY);
    // Three misses while big: the size went, the life did not.
    expect(r.lives).toBe(LIVES);
    expect(r.big).toBe(false);
  });

  it("puts a token every seventh block and nowhere else", () => {
    expect(tokenOn(0)).toBe(false);
    for (let i = 1; i <= 24; i++) expect(tokenOn(i), `block ${i}`).toBe(i % TOKEN_EVERY === 0);
  });

  it("lays the same ground every time, so a kid can see themselves getting further", () => {
    const first = Array.from({ length: 30 }, (_, i) => hazardAt(i));
    const again = Array.from({ length: 30 }, (_, i) => hazardAt(i));
    expect(again).toEqual(first);
    // And there is something of each kind in a level's worth of ground.
    const kinds = new Set(first.filter(Boolean));
    for (const k of ["hole", "river", "mountain"]) expect(kinds.has(k as never), `no ${k} in 30 blocks`).toBe(true);
  });

  it("draws everything the ground can hold", () => {
    for (const g of [tokenGrid(0), tokenGrid(1), mountainGrid(), riverGrid(), holeGrid()]) {
      let filled = 0;
      for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.get(x, y)) filled++;
      expect(filled, "a sprite with nothing drawn in it").toBeGreaterThan(4);
    }
  });
});
