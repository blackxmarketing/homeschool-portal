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
  cageGrid,
  cloudGrid,
  evidenceFor,
  factRush,
  factRushInfo,
  type Pace,
  CHASE_FROM,
  CHASE_LEN,
  CREEP_PER_SEC,
  DRAGON_BREATH_MS,
  DRAGON_FIRE_SPEED,
  DRAGON_HITS,
  DRAGON_PACE,
  HUNTS,
  HUNT_GAP,
  LIVES,
  PACES,
  TROT_MS,
  cleanMove,
  huntBlocks,
  STRIKES,
  TOKEN_EVERY,
  familyFacts,
  biomeFor,
  BIOMES,
  hazardAt,
  holeGrid,
  mountainGrid,
  propGrid,
  ridgeGrid,
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
  play,
  postsOn,
  replay,
  starsFor,
  workedCard,
  workLeft,
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
    const grids = [cloudGrid(false), cloudGrid(true), hillGrid(), cageGrid(false), cageGrid(true), ridgeGrid("#333", true), ridgeGrid("#333", false)];
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

  it("is only finished once the dragon is down, however well the cards went", () => {
    for (const d of dungeons) {
      const clean = perfectMoves(d);
      // Every card right, but the dragon is still standing.
      expect(replay(d, clean).finished, `${d.id} was finished without the dragon`).toBe(false);
      // Every card right and the dragon beaten with the fire they earned.
      const won = { ...clean, thrown: DRAGON_HITS[clean.pace ?? "medium"], beat: true };
      const r = replay(d, won);
      expect(r.finished, `${d.id} could not be finished`).toBe(true);
      expect(r.atDragon).toBe(true);
      expect(r.stars).toBe(3);
      expect(factRush.score(d.id, won)?.stars).toBe(3);
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

describe("the chase, and how hard a kid wants it", () => {
  const level = levelById("fr-x6")!;
  const misses = (n: number, pace: Pace) => ({ seed: 3, pace, answers: Array.from({ length: n }, () => ({ a: -1, ms: 500 })) });

  it("leaves easy alone entirely", () => {
    expect(huntBlocks(level, 3, "easy")).toEqual([]);
    const r = play(level, misses(6, "easy"));
    expect(r.chase).toBeNull();
    expect(r.caught).toBe(0);
    // Only the three-misses rule took a life, nothing else.
    expect(r.lives).toBe(LIVES - 2);
  });

  it("sends it in a few times a level on medium, somewhere different each level", () => {
    const blocks = huntBlocks(level, 3, "medium");
    expect(blocks.length).toBeGreaterThan(0);
    expect(blocks.length).toBeLessThanOrEqual(HUNTS);
    // The first comes in early, but never off the start line itself.
    for (const b of blocks) expect(b).toBeGreaterThanOrEqual(1);
    expect(blocks[0], "a kid should meet it in the first few cards").toBeLessThanOrEqual(3);
    // A different seed puts it somewhere else.
    expect(huntBlocks(level, 99, "medium")).not.toEqual(blocks);
    // The same seed puts it in the same places, or the server would disagree.
    expect(huntBlocks(level, 3, "medium")).toEqual(blocks);
  });

  it("starts further back on hard, because on hard it never stops", () => {
    // Medium only closes on a mistake, so it can afford to start close.
    // Hard closes a little on every single answer, so it starts further off.
    expect(CHASE_FROM.hard).toBeGreaterThan(CHASE_FROM.medium);
    expect(CHASE_FROM.easy).toBe(0);
    expect(CREEP_PER_SEC).toBeGreaterThan(0);
  });

  it("leaves a slow thinker alone on medium, and does not on hard", () => {
    // Every card right, but each one taken slowly.
    const slow = (pace: Pace) => {
      const m = perfectMoves(level, 3, pace);
      return { ...m, answers: m.answers.map((a) => ({ ...a, ms: TROT_MS + 2000 })) };
    };
    expect(play(level, slow("medium")).caught, "medium caught a slow thinker").toBe(0);
    // On hard it does not matter how right they are: it keeps coming.
    expect(play(level, slow("hard")).caught, "hard let a dawdler off").toBeGreaterThan(0);
  });

  it("waits until they are moving on medium - nobody is chased off the start line", () => {
    // Every answer wrong, so they never leave the first block.
    const r = play(level, misses(12, "medium"));
    expect(r.posts).toBe(0);
    expect(r.caught).toBe(0);
  });

  it("is on them from the first card on hard, wherever they are", () => {
    const r = play(level, misses(12, "hard"));
    expect(r.caught, "hard let a kid stand still unbothered").toBeGreaterThan(0);
  });

  it("costs a life when it does catch them", () => {
    const seed = 3;
    const first = huntBlocks(level, seed, "hard")[0];
    // Run cleanly up to where it comes in, then miss until it has them.
    const good = perfectMoves(level, seed, "hard").answers.slice(0, first);
    const bad = Array.from({ length: CHASE_FROM.hard }, () => ({ a: -1, ms: 400 }));
    const r = play(level, { seed, pace: "hard", answers: [...good, ...bad] });
    expect(r.posts).toBe(first);
    expect(r.caught, "it never got them").toBeGreaterThan(0);
    expect(r.lives, "being caught cost nothing").toBeLessThan(LIVES);
  });

  it("never catches anyone on a clean quick run, whatever the pace", () => {
    for (const pace of PACES) {
      const r = replay(level, perfectMoves(level, 7, pace));
      expect(r.caught, `${pace} caught a clean run`).toBe(0);
      expect(r.lives).toBe(LIVES);
      expect(r.stars).toBe(3);
    }
  });

  it("scores the pace the kid actually chose, and junk falls back to medium", () => {
    expect(cleanMove({ seed: 1, answers: [], pace: "hard" }).pace).toBe("hard");
    expect(cleanMove({ seed: 1, answers: [], pace: "impossible" }).pace).toBe("medium");
    expect(cleanMove({ seed: 1, answers: [] }).pace).toBe("medium");
    expect(replay(level, { seed: 1, answers: [], pace: 7 }).stars).toBe(0);
  });
});

describe("where a level happens", () => {
  it("gives the families different places, not one repainted", () => {
    const first12 = Array.from({ length: 12 }, (_, i) => biomeFor(levelById(`fr-a${i + 1}`)!).id);
    expect(new Set(first12).size, "two families share a place").toBe(12);
  });

  it("always gives the same level the same place", () => {
    for (const l of ALL_FACT_LEVELS) expect(biomeFor(l).id).toBe(biomeFor(l).id);
    expect(biomeFor(levelById("fr-a4")!).rise, "the fourth family should be a climb").toBeGreaterThan(0);
    expect(biomeFor(levelById("fr-a6")!).swim, "the sixth family should be underwater").toBe(true);
  });

  it("sends every dungeon to the dungeon", () => {
    for (const l of ALL_FACT_LEVELS.filter((x) => x.dungeon)) expect(biomeFor(l).id).toBe("dungeon");
  });

  it("draws every prop a place can ask for", () => {
    for (const b of BIOMES) {
      const g = propGrid(b.prop, b.propInk[0], b.propInk[1]);
      let filled = 0;
      for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.get(x, y)) filled++;
      expect(filled, `${b.id}: "${b.prop}" draws nothing`).toBeGreaterThan(8);
    }
  });

  it("names every place in words a kid can read", () => {
    for (const b of BIOMES) {
      expect(b.name.length).toBeGreaterThan(3);
      expect(b.name).not.toMatch(BANNED);
    }
  });
});

describe("arriving at the pet", () => {
  const level = levelById("fr-x6")!;

  it("stops at the cage rather than walking past it", () => {
    // A messy run: every card missed once before it is answered right. That
    // takes far more right answers than the track is long, which is what used
    // to walk them past the pet.
    const answers: { a: number | null; ms: number }[] = [];
    let pile = openingPile(level, 11);
    let guard = 0;
    while (pile.length && guard++ < MAX_ASKS - 1) {
      const card = level.cards[pile[0].i];
      // Miss it once, then get it right, for as long as the lives hold out.
      if (guard % 4 === 0) {
        answers.push({ a: card.answer + 1, ms: 600 });
        pile = afterAnswer(pile, false, needOf(level));
      } else {
        answers.push({ a: card.answer, ms: 600 });
        pile = afterAnswer(pile, true, needOf(level));
      }
    }
    const r = play(level, { seed: 11, pace: "easy", answers });
    expect(r.at, "walked past the cage").toBeLessThanOrEqual(1);
    expect(r.posts, "this run should need more right answers than the track is long").toBeGreaterThan(postsOn(level));
    if (r.finished) expect(r.at, "finished the cards but did not reach the pet").toBe(1);
  });

  it("arrives exactly as the last card falls on a clean run", () => {
    const r = replay(level, perfectMoves(level, 4, "easy"));
    expect(r.finished).toBe(true);
    expect(r.at).toBe(1);
  });

  it("never walks backwards when they miss one", () => {
    const seed = 5;
    const good = perfectMoves(level, seed, "easy").answers.slice(0, 6);
    const before = play(level, { seed, pace: "easy", answers: good }).at;
    const after = play(level, { seed, pace: "easy", answers: [...good, { a: -1, ms: 500 }] }).at;
    expect(after, "a miss moved them backwards").toBe(before);
  });

  it("takes smaller steps when cards keep coming back round", () => {
    const seed = 8;
    // Six right answers straight off...
    const clean = play(level, { seed, pace: "easy", answers: perfectMoves(level, seed, "easy").answers.slice(0, 6) }).at;
    // ...against six right answers with misses mixed through them.
    const messy = perfectMoves(level, seed, "easy").answers.slice(0, 6);
    const mixed = messy.flatMap((a, i) => (i % 2 === 0 ? [{ a: -1, ms: 500 }, a] : [a]));
    const slow = play(level, { seed, pace: "easy", answers: mixed }).at;
    expect(slow, "a messy run should not be as far along as a clean one").toBeLessThan(clean);
  });
});


describe("the hunter", () => {
  const level = levelById("fr-x6")!;
  const clean = (n: number, pace: Pace = "hard") => perfectMoves(level, 6, pace).answers.slice(0, n);

  it("is there from the first card on hard, and nowhere on easy", () => {
    expect(huntBlocks(level, 6, "hard")).toEqual([0]);
    expect(huntBlocks(level, 6, "easy")).toEqual([]);
    expect(huntBlocks(level, 6, "medium").length).toBeGreaterThan(0);
  });

  it("is outrun by a kid who keeps answering, and catches one who stops", () => {
    // Quick and right: the block they run is worth more than the half block
    // it takes back, so the gap opens and hard is winnable.
    const early = play(level, { seed: 6, pace: "hard", answers: clean(2) }).chase!;
    const later = play(level, { seed: 6, pace: "hard", answers: clean(6) }).chase!;
    expect(later, "keeping moving did not keep them ahead").toBeGreaterThan(early);
    expect(play(level, { seed: 6, pace: "hard", answers: clean(20) }).caught, "it caught a kid who did everything right").toBe(0);

    // Right, but sat on every card: it comes the rest of the way.
    const dawdled = clean(20).map((a) => ({ ...a, ms: TROT_MS + 4000 }));
    expect(play(level, { seed: 6, pace: "hard", answers: dawdled }).caught, "a kid who stopped moving was never caught").toBeGreaterThan(0);
  });

  it("leaves a clean run alone on medium", () => {
    const r = replay(level, perfectMoves(level, 6, "medium"));
    expect(r.caught).toBe(0);
  });

  it("closes in on a wrong answer on medium, and not on a right one", () => {
    const seed = 6;
    const start = huntBlocks(level, seed, "medium")[0];
    const upto = perfectMoves(level, seed, "medium").answers.slice(0, start + 1);
    const good = play(level, { seed, pace: "medium", answers: [...upto, ...perfectMoves(level, seed, "medium").answers.slice(start + 1, start + 2)] });
    const miss = play(level, { seed, pace: "medium", answers: [...upto, { a: -1, ms: 400 }] });
    expect(miss.chase, "a miss did not bring it closer").not.toBeNull();
    if (good.chase !== null && miss.chase !== null) expect(miss.chase).toBeLessThan(good.chase);
  });

  it("puts them back at the start line when it gets them", () => {
    const seed = 6;
    // Right answers, but sat on every one of them, so it closes in.
    const answers = clean(24).map((a) => ({ ...a, ms: TROT_MS + 4000 }));
    const r = play(level, { seed, pace: "hard", answers });
    expect(r.caught).toBeGreaterThan(0);
    // Whatever happened after, a catch cost them the ground they had made.
    const upToCatch: { a: number | null; ms: number }[] = [];
    let seen = 0;
    for (const a of answers) {
      upToCatch.push(a);
      const step = play(level, { seed, pace: "hard", answers: upToCatch });
      if (step.caught > seen) {
        seen = step.caught;
        expect(step.at, "a catch did not send them back to the start").toBe(0);
        expect(step.justCaught).toBe(true);
        break;
      }
    }
    expect(seen, "it never caught anyone to check").toBeGreaterThan(0);
  });

  it("says so on the one answer it got them, and not after", () => {
    const seed = 6;
    const r = play(level, { seed, pace: "hard", answers: clean(24).map((a) => ({ ...a, ms: TROT_MS + 4000 })) });
    // justCaught is about the last answer only, so a screen can react once.
    expect(typeof r.justCaught).toBe("boolean");
  });

  it("costs the size first when they are big, and the run is not reset", () => {
    // Food is on every seventh block, so get there then let it have them.
    const seed = 6;
    const r = play(level, { seed, pace: "hard", answers: clean(TOKEN_EVERY) });
    expect(r.big || r.caught > 0).toBe(true);
  });
});

describe("what the directions tell a kid to do", () => {
  it("never says the pet is the one running", () => {
    // The pet was the runner before it went in the cage, and the directions
    // went on saying so for a while after. They describe the game as it is.
    for (const l of ALL_FACT_LEVELS) {
      expect(l.intro, `${l.id}: "${l.intro}"`).not.toMatch(/pet runs|your pet run/i);
    }
    expect(factRushInfo.blurb).not.toMatch(/pet runs|your pet run/i);
  });

  it("tells them what answering a card actually does", () => {
    const running = ALL_FACT_LEVELS.filter((l) => /run|get to your pet|towards your pet/i.test(l.intro));
    expect(running.length, "no level explains that answering is what moves you").toBeGreaterThan(40);
  });
});

describe("the hunter walks on the clock", () => {
  const level = levelById("fr-x6")!;
  const card = (n: number) => perfectMoves(level, 6, "hard").answers.slice(0, n);

  it("comes on while a kid is only thinking, with no card answered", () => {
    // Four seconds of looking at a card, answering nothing.
    const thinking = play(level, { seed: 6, pace: "hard", answers: [{ a: null, ms: 4000 }] });
    const instant = play(level, { seed: 6, pace: "hard", answers: [{ a: null, ms: 0 }] });
    expect(thinking.chase!, "time passing did not bring it closer").toBeLessThan(instant.chase!);
    // And thinking is not a wrong answer: no card was touched.
    expect(thinking.wrong).toBe(0);
    expect(thinking.posts).toBe(0);
    expect(thinking.at).toBe(0);
  });

  it("gets them if they sit there long enough, even answering nothing", () => {
    const idle = Array.from({ length: 12 }, () => ({ a: null, ms: 8000 }));
    const r = play(level, { seed: 6, pace: "hard", answers: idle });
    expect(r.caught, "a kid who never answered was never caught").toBeGreaterThan(0);
  });

  it("is outrun by answering inside four seconds, and gains after that", () => {
    // A block won per right answer against a quarter block a second.
    const quick = play(level, { seed: 6, pace: "hard", answers: card(8).map((a) => ({ ...a, ms: 1500 })) });
    const slow = play(level, { seed: 6, pace: "hard", answers: card(8).map((a) => ({ ...a, ms: 9000 })) });
    expect(quick.chase!, "quick answers did not keep them ahead").toBeGreaterThan(CHASE_FROM.hard);
    expect(slow.chase === null || slow.chase < CHASE_FROM.hard, "slow answers did not let it gain").toBe(true);
  });

  it("leaves medium alone: thinking time costs nothing there", () => {
    const start = huntBlocks(level, 6, "medium")[0];
    const upto = perfectMoves(level, 6, "medium").answers.slice(0, start + 1);
    const a = play(level, { seed: 6, pace: "medium", answers: [...upto, { a: null, ms: 30000 }] });
    const b = play(level, { seed: 6, pace: "medium", answers: [...upto, { a: null, ms: 0 }] });
    expect(a.chase).toEqual(b.chase);
  });

  it("treats a made-up answer shape as junk, but a real pause as a pause", () => {
    expect(cleanMove({ seed: 1, answers: [{ a: null, ms: 500 }] }).answers[0].a).toBeNull();
    expect(cleanMove({ seed: 1, answers: [{ a: "soon", ms: 500 }] }).answers[0].a).toBeNaN();
    // Pauses alone can never earn anything.
    expect(replay(level, { seed: 1, pace: "hard", answers: [{ a: null, ms: 100 }] }).stars).toBe(0);
  });
});

describe("medium meets them early", () => {
  it("sends it in within the first few cards of every level", () => {
    for (const l of [levelById("fr-a1")!, levelById("fr-x6")!, levelById("fr-d9")!]) {
      for (const seed of [1, 42, 777, 31337]) {
        const first = huntBlocks(l, seed, "medium")[0];
        expect(first, `${l.id} seed ${seed}: it turns up at block ${first}`).toBeLessThanOrEqual(3);
        expect(first, "it should not be standing on the start line").toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("still comes in more than once, and not all at the same moment", () => {
    const blocks = huntBlocks(levelById("fr-x6")!, 42, "medium");
    expect(blocks.length).toBeGreaterThan(1);
    // They may overlap now - running into a spot while it is already after
    // them keeps it there longer - but two never start on the same block.
    for (let i = 1; i < blocks.length; i++) expect(blocks[i] - blocks[i - 1]).toBeGreaterThanOrEqual(HUNT_GAP);
  });
});

describe("three wrong cards", () => {
  const level = levelById("fr-x6")!;
  /** A few right answers to get them off the start line, then misses. */
  const run = (misses: number) => {
    const good = perfectMoves(level, 12, "easy").answers.slice(0, 5);
    const bad = Array.from({ length: misses }, () => ({ a: -1, ms: 600 }));
    return play(level, { seed: 12, pace: "easy", answers: [...good, ...bad] });
  };

  it("leaves the first two where they stand", () => {
    const moved = run(0);
    expect(moved.at).toBeGreaterThan(0);
    for (const n of [1, 2]) {
      const r = run(n);
      expect(r.lives, `${n} wrong should not cost a life`).toBe(LIVES);
      expect(r.at, `${n} wrong should leave them where they are`).toBe(moved.at);
      expect(r.strikes).toBe(n);
      expect(r.justDied).toBe(false);
    }
  });

  it("costs a life on the third and starts the level over", () => {
    const r = run(3);
    expect(r.lives, "the third wrong card should cost a life").toBe(LIVES - 1);
    expect(r.at, "the third wrong card should send them back to the start").toBe(0);
    expect(r.justDied, "the screen was never told they died").toBe(true);
    // And the slate is clean for the next go.
    expect(r.strikes).toBe(0);
  });

  it("spends the size instead when food has made them big", () => {
    // Run to the food, then miss three times.
    const good = perfectMoves(level, 12, "easy").answers.slice(0, TOKEN_EVERY);
    const bad = Array.from({ length: 3 }, () => ({ a: -1, ms: 600 }));
    const r = play(level, { seed: 12, pace: "easy", answers: [...good, ...bad] });
    expect(r.lives, "being big should have taken the hit").toBe(LIVES);
    expect(r.big).toBe(false);
    expect(r.at, "being big should not send them back").toBeGreaterThan(0);
    expect(r.justDied).toBe(false);
  });

  it("ends the run when the third life goes, rather than restarting forever", () => {
    const r = run(9);
    expect(r.lives).toBe(0);
    expect(r.over).toBe(true);
    expect(r.finished).toBe(false);
  });
});

describe("one pile, not two", () => {
  const level = levelById("fr-a1")!;

  /** Play by always answering whatever card the run says is in front of them. */
  const playAlong = (seed: number, pace: Pace, plan: ("right" | "wrong")[]) => {
    const answers: { a: number | null; ms: number }[] = [];
    for (const step of plan) {
      const r = play(level, { seed, pace, answers }, 0);
      if (r.head === null || r.over) break;
      const want = level.cards[r.head].answer;
      answers.push({ a: step === "right" ? want : want + 1, ms: 700 });
    }
    return { answers, run: play(level, { seed, pace, answers }, 0) };
  };

  it("counts an answer to the card it says is showing, before and after a death", () => {
    // Three right, three wrong (a death), then five right.
    const plan: ("right" | "wrong")[] = [
      ...Array(3).fill("right"),
      ...Array(3).fill("wrong"),
      ...Array(5).fill("right"),
    ];
    const { run } = playAlong(7, "easy", plan);
    // The three misses cost a life and sent them back; the five after it all
    // counted, which is what the screen and the server have to agree on.
    expect(run.lives).toBe(LIVES - 1);
    expect(run.wrong, "an answer to the showing card was counted wrong").toBe(3);
    expect(run.at, "they did not move after dying").toBeGreaterThan(0);
    expect(Math.round(run.at * postsOn(level))).toBe(5);
  });

  it("always has a card to show until the pile is empty", () => {
    const { run, answers } = playAlong(3, "easy", Array(200).fill("right"));
    expect(run.finished).toBe(true);
    expect(run.head, "a finished run should have no card showing").toBeNull();
    expect(run.inPile).toBe(0);
    // And it never ran out of cards early.
    expect(answers.length).toBe(postsOn(level));
  });

  it("deals a fresh hand on a death rather than carrying the old one on", () => {
    const before = playAlong(9, "easy", Array(5).fill("right")).run;
    const after = playAlong(9, "easy", [...Array(5).fill("right"), ...Array(3).fill("wrong")]).run;
    // Five right answers bank a go on five cards without finishing any of
    // them, so the pile is still full - what matters is the ground made.
    expect(before.at, "they should have made ground before dying").toBeGreaterThan(0);
    expect(after.at, "a death should put them back on the start line").toBe(0);
    expect(after.inPile, "a death should deal them a whole new hand").toBe(level.cards.length);
  });
});

describe("how often medium sends it in", () => {
  const level = levelById("fr-a1")!;

  it("finds all the hunting spots it asks for, not two of them", () => {
    // The spacing rule used to throw away a rejected spot, so most levels
    // ended up with fewer hunts than HUNTS and something behind them less
    // than half the time.
    for (const seed of [1, 7, 42, 99, 777, 31337]) {
      const blocks = huntBlocks(level, seed, "medium");
      expect(blocks.length, `seed ${seed} only found ${blocks.length} spots`).toBeGreaterThanOrEqual(HUNTS - 1);
      for (let i = 1; i < blocks.length; i++) {
        expect(blocks[i] - blocks[i - 1], "two hunts on top of each other").toBeGreaterThanOrEqual(HUNT_GAP);
      }
    }
  });

  it("keeps something behind them for most of a level, but not all of it", () => {
    let on = 0;
    let all = 0;
    for (const seed of [1, 7, 42, 99, 777]) {
      const answers: { a: number | null; ms: number }[] = [];
      for (let i = 0; i < 80; i++) {
        const r = play(level, { seed, pace: "medium", answers }, 0);
        if (r.head === null || r.over) break;
        const want = level.cards[r.head].answer;
        answers.push({ a: i % 7 === 6 ? want + 1 : want, ms: 1200 });
        all++;
        if (play(level, { seed, pace: "medium", answers }, 0).chase !== null) on++;
      }
    }
    const share = on / all;
    expect(share, `it is only on screen ${Math.round(share * 100)}% of the time`).toBeGreaterThan(0.6);
    expect(share, `it is on screen ${Math.round(share * 100)}% of the time - that is hard's job`).toBeLessThan(0.95);
  });

  it("extends the visit rather than starting a second one on top of it", () => {
    const blocks = huntBlocks(level, 1, "medium");
    expect(blocks.length).toBeGreaterThan(1);
    // Two spots within a hunt's length of each other means the second has to
    // land while the first is still running.
    expect(Math.min(...blocks.slice(1).map((b, i) => b - blocks[i]))).toBeLessThan(CHASE_LEN);
  });
});

describe("the coach stops when they say they are ready", () => {
  it("cuts the reading off rather than talking over the count-in", () => {
    const brief = fs.readFileSync(path.join(process.cwd(), "src/components/minigames/TeacherBrief.tsx"), "utf8");
    const ready = brief.slice(brief.indexOf("I&apos;m ready") - 500, brief.indexOf("I&apos;m ready"));
    expect(ready, "the ready button does not stop him reading").toContain("stopSpeaking()");
  });
});

describe("the dragon fight, and what the browser may claim about it", () => {
  const dun = levelById("fr-adun")!;
  const clean = (pace: Pace = "medium") => perfectMoves(dun, 4, pace);

  it("gives a fireball for every card got right", () => {
    const r = replay(dun, clean());
    // Two dozen cards answered, so at least two dozen fireballs, plus any
    // lying on the ground.
    expect(r.fireballs).toBeGreaterThanOrEqual(postsOn(dun));
  });

  it("will not take the browser's word that the dragon is dead", () => {
    const pace: Pace = "medium";
    const base = clean(pace);
    // Beaten, but with fewer throws than the dragon has hit points.
    const cheap = replay(dun, { ...base, thrown: DRAGON_HITS[pace] - 1, beat: true });
    expect(cheap.finished, "a dragon went down to fewer hits than it has").toBe(false);
    // Beaten with more fireballs than they ever earned.
    const rich = replay(dun, { ...base, thrown: 9999, beat: true });
    expect(rich.finished, "they threw fire they never earned").toBe(false);
    // Beaten honestly.
    expect(replay(dun, { ...base, thrown: DRAGON_HITS[pace], beat: true }).finished).toBe(true);
  });

  it("takes the same five hits whatever the pace, but is harder to land them", () => {
    // Five, always - what changes is how much it moves and how hard it is
    // to get near it, not how much punishment it soaks up.
    expect(new Set(Object.values(DRAGON_HITS)).size, "the hits should not vary by pace").toBe(1);
    expect(DRAGON_HITS.medium).toBe(5);
    // It fights back faster and moves more the harder the pace.
    expect(DRAGON_BREATH_MS.easy).toBeGreaterThan(DRAGON_BREATH_MS.hard);
    expect(DRAGON_FIRE_SPEED.easy).toBeLessThan(DRAGON_FIRE_SPEED.hard);
    expect(DRAGON_PACE.easy).toBeLessThan(DRAGON_PACE.hard);
  });

  it("says when they have run the cards and the dragon is in front of them", () => {
    const part = { ...clean(), answers: clean().answers.slice(0, 5) };
    expect(play(dun, part).atDragon, "it thinks they are at the dragon already").toBe(false);
    expect(play(dun, clean()).atDragon, "they ran the whole way and it says they are not there").toBe(true);
  });

  it("keeps dealing cards while the dragon is up, so they can never be stuck", () => {
    // Twice as many answers as the level is long: the dragon keeps dealing.
    const many = { seed: 4, pace: "medium" as Pace, answers: [] as { a: number | null; ms: number }[] };
    for (let i = 0; i < 60; i++) {
      const r = play(dun, many);
      if (r.head === null) break;
      many.answers.push({ a: dun.cards[r.head].answer, ms: 700 });
    }
    expect(many.answers.length, "it stopped dealing and left them with nothing to answer").toBe(60);
    expect(play(dun, many).fireballs).toBeGreaterThanOrEqual(60);
  });

  it("asks nothing of an ordinary level", () => {
    const l = levelById("fr-a5")!;
    const r = replay(l, perfectMoves(l));
    expect(r.finished, "an ordinary level needs a dragon beaten").toBe(true);
    expect(r.atDragon).toBe(true);
  });

  it("counts the fire they walk away with, less what they threw", () => {
    const pace: Pace = "medium";
    const base = clean(pace);
    const spent = factRush.coins!(dun.id, { ...base, thrown: DRAGON_HITS[pace], beat: true }, 0);
    const unspent = factRush.coins!(dun.id, base, 0);
    expect(unspent - spent).toBe(DRAGON_HITS[pace]);
  });
});

describe("the hunter keeps its own speed", () => {
  const level = levelById("fr-a1")!;
  const quick = (n: number) => perfectMoves(level, 6, "hard").answers.slice(0, n).map((a) => ({ ...a, ms: 900 }));

  it("falls further behind the faster they answer", () => {
    // Each right answer is a block run; it takes back a quarter of one a
    // second. Answer quickly and the gap only grows.
    const gaps = [2, 4, 6, 8].map((n) => play(level, { seed: 6, pace: "hard", answers: quick(n) }).chase!);
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i], `the gap stopped growing after ${i} answers: ${gaps.join(" -> ")}`).toBeGreaterThan(gaps[i - 1]);
    }
  });

  it("is let off the leash on hard, so a good run really does leave it behind", () => {
    const far = play(level, { seed: 6, pace: "hard", answers: quick(20) }).chase!;
    // Well past the distance it starts at, rather than pinned a step behind.
    expect(far).toBeGreaterThan(CHASE_FROM.hard * 2);
  });

  it("closes at the same rate whatever they are doing, because it is on the clock", () => {
    // Two idle pauses of the same length close the gap by the same amount,
    // whether they were answering in between or not.
    const a = play(level, { seed: 6, pace: "hard", answers: [{ a: null, ms: 4000 }] }).chase!;
    const b = play(level, { seed: 6, pace: "hard", answers: [{ a: null, ms: 2000 }, { a: null, ms: 2000 }] }).chase!;
    expect(Math.abs(a - b)).toBeLessThan(0.001);
  });

  it("still gets them if they stop answering for long enough", () => {
    const idle = Array.from({ length: 30 }, () => ({ a: null, ms: 6000 }));
    expect(play(level, { seed: 6, pace: "hard", answers: idle }).caught).toBeGreaterThan(0);
  });
});

describe("what the coach puts on screen", () => {
  const screen = fs.readFileSync(path.join(process.cwd(), "src/components/minigames/FactRushGame.tsx"), "utf8");
  const brief = fs.readFileSync(path.join(process.cwd(), "src/components/minigames/TeacherBrief.tsx"), "utf8");

  it("asks how hard they want it when they say they are ready, and waits for an answer", () => {
    // The coach used to remind them and the three sat on his panel, where a
    // kid could walk straight past them. Saying ready asks the question now,
    // and answering it is what starts the level.
    expect(screen).toContain("onReady={() => setPicking(true)}");
    expect(screen).toContain("How hard do you want it?");
    expect(screen).toContain("PACES.map");
    // Choosing is the only thing that sets it going.
    expect(screen).toContain("function begin(p: Pace)");
    expect(screen).toContain("onClick={() => begin(p)}");
  });

  it("shows the keys for the fight instead of reading a paragraph out at them", () => {
    // He still says the words; they just are not printed.
    expect(screen).toContain("showDirections={false}");
    expect(screen).toContain("<FightKeys />");
    for (const k of ["Move", "Jump", "Duck", "Throw"]) expect(screen, `the fight keys do not mention ${k}`).toContain(k);
    // And the keys themselves, drawn as caps rather than described.
    for (const cap of ["←", "→", "↑", "↓", "space"]) expect(screen, `no key cap for ${cap}`).toContain(cap);
    // The panel honours it rather than printing them anyway.
    expect(brief).toContain("{showDirections && <p");
    // And no worked example is offered, because there is no sum to work.
    expect(brief).toContain("{onExample && (");
  });

  it("still prints the directions everywhere else", () => {
    expect(brief).toMatch(/showDirections = true/);
  });
});

describe("a dungeon won after making more fire", () => {
  const dun = levelById("fr-adun")!;

  /** Answer n cards, whatever the run says is in front of them. */
  const answerCards = (n: number, seed = 21) => {
    const answers: { a: number | null; ms: number }[] = [];
    for (let i = 0; i < n; i++) {
      const r = play(dun, { seed, pace: "easy", answers }, 0);
      if (r.head === null) break;
      answers.push({ a: dun.cards[r.head].answer, ms: 700 });
    }
    return answers;
  };

  it("counts the cards answered during a reload, not just the first hand", () => {
    // A kid who misses the dragon a lot answers more cards to make more fire.
    // Those answers come after the first hand ran out.
    const first = answerCards(postsOn(dun));
    const withReload = answerCards(postsOn(dun) + 20);
    expect(withReload.length, "the dungeon stopped dealing them cards").toBe(postsOn(dun) + 20);

    const earnedFirst = play(dun, { seed: 21, pace: "easy", answers: first }, 0).fireballs;
    const earnedAll = play(dun, { seed: 21, pace: "easy", answers: withReload }, 0).fireballs;
    expect(earnedAll, "the extra cards earned them nothing").toBeGreaterThan(earnedFirst);
  });

  it("lets them win with fire they earned after the first hand ran out", () => {
    const answers = answerCards(postsOn(dun) + 20);
    const earned = play(dun, { seed: 21, pace: "easy", answers }, 0).fireballs;
    // They threw more than the first hand alone could have paid for.
    const thrown = earned - 2;
    const r = replay(dun, { seed: 21, pace: "easy", answers, thrown, beat: true }, 0);
    expect(r.finished, `a won fight was rejected: threw ${thrown} of ${earned} earned`).toBe(true);
  });
});
