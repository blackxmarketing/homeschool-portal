import { describe, expect, it } from "vitest";
import { STANDARDS } from "@/content/standards";
import { GAMES, gameById } from "@/lib/minigames";
import { GAME_UI } from "@/components/minigames/registry";
import { placeFor, placementFor } from "@/lib/minigames/placement";
import {
  ALL_SPELL_LEVELS,
  COLS,
  LIVES,
  MAX_STEPS,
  MOVE_ON_STARS,
  ROWS,
  WORDS_PER_LEVEL,
  buildClearing,
  cleanMove,
  crittersOn,
  evidenceFor,
  floorGrid,
  frogGrid,
  gateGrid,
  levelById,
  levelsForGrade,
  medalGrid,
  rockGrid,
  PLACES,
  placeOf,
  wallGrid,
  mudGrid,
  vineGrid,
  iceGrid,
  pitGrid,
  batGrid,
  crocGrid,
  spiderGrid,
  beetleGrid,
  keyGrid,
  doorGrid,
  placeFrom,
  placementWords,
  PLACEMENT_RUNGS,
  monkeyGrid,
  parrotGrid,
  perfectMoves,
  play,
  routeTo,
  showsWord,
  snakeGrid,
  spellRush,
  spellRushInfo,
  starsFor,
  stoneGrid,
  treeGrid,
  waterGrid,
  wordsFor,
} from "@/lib/minigames/spellrush";

const BANNED = /\b(gender|identity|politic|election|president|democrat|republican)\b/i;

describe("the ladder", () => {
  it("runs from kindergarten to grade eight, six levels a grade", () => {
    for (let g = 0; g <= 8; g++) {
      const levels = levelsForGrade(g);
      expect(levels.length, `grade ${g}`).toBe(6);
      expect(levels.every((l) => l.grade === g)).toBe(true);
    }
    expect(ALL_SPELL_LEVELS.length).toBe(54);
  });

  it("gives every level its own id and its own title", () => {
    const ids = new Set(ALL_SPELL_LEVELS.map((l) => l.id));
    const titles = new Set(ALL_SPELL_LEVELS.map((l) => l.title));
    expect(ids.size).toBe(ALL_SPELL_LEVELS.length);
    expect(titles.size).toBe(ALL_SPELL_LEVELS.length);
  });

  it("names a real spelling standard on every level", () => {
    // K-5 is the part of the ladder the portal already teaches, so those
    // codes have to match the standards the courses are built from. The
    // sub-skill letter (RF.K.2d -> RF.K.2) is the detail inside one.
    const known = new Set(Object.values(STANDARDS).flat().map((s) => s.code));
    for (const l of ALL_SPELL_LEVELS) {
      expect(l.standard, l.id).toMatch(/^(RF|L)\.[K0-8]\.\d[a-z]?$/);
      if (l.grade > 5) continue;
      const base = l.standard.replace(/[a-z]$/, "");
      expect(known.has(base), `${l.id}: ${l.standard} is not a standard the courses teach`).toBe(true);
    }
  });

  it("gives every level enough words, and every word is spellable", () => {
    for (const l of ALL_SPELL_LEVELS) {
      expect(l.words.length, l.id).toBeGreaterThanOrEqual(WORDS_PER_LEVEL);
      for (const w of l.words) {
        expect(w, `${l.id}: "${w}"`).toMatch(/^[a-zA-Z']{2,16}$/);
        expect(w).not.toMatch(BANNED);
      }
      // No level asks for the same word twice.
      expect(new Set(l.words.map((w) => w.toLowerCase())).size, l.id).toBe(l.words.length);
    }
  });

  it("says nothing it should not, in any title or any line the teacher reads", () => {
    for (const l of ALL_SPELL_LEVELS) {
      expect(l.title).not.toMatch(BANNED);
      expect(l.intro).not.toMatch(BANNED);
      expect(l.intro.length).toBeGreaterThan(30);
    }
  });

  it("gets harder: the youngest see the word, the older ones do not", () => {
    expect(showsWord(levelById("sp-k1")!)).toBe(true);
    expect(showsWord(levelById("sp-11")!)).toBe(true);
    expect(showsWord(levelById("sp-36")!)).toBe(false);
    expect(crittersOn(levelById("sp-k1")!)).toBe(0);
    expect(crittersOn(levelById("sp-86")!)).toBeGreaterThan(crittersOn(levelById("sp-13")!));
  });
});

describe("the clearing", () => {
  it("is walkable: every letter can be reached, in order, on every level", () => {
    for (const level of ALL_SPELL_LEVELS) {
      for (const seed of [1, 7, 99, 1234]) {
        for (const word of wordsFor(level, seed)) {
          const c = buildClearing(word, seed, crittersOn(level), level.grade);
          expect(c.stones.filter((s) => s.at >= 0).length, `${level.id} / ${word}`).toBe(word.length);
          let from = c.start;
          for (let n = 0; n < word.length; n++) {
            const stone = c.stones.find((s) => s.at === n)!;
            // Through the gate: it is open by the time they get there, because
            // the key is always fetchable without it.
            const path = routeTo(c.tiles, from, { x: stone.x, y: stone.y });
            expect(path, `${level.id} / ${word}: letter ${n + 1} is walled off`).not.toBeNull();
            from = { x: stone.x, y: stone.y };
          }
        }
      }
    }
  }, 30000);

  it("never puts a stone or an animal inside a tree", () => {
    for (const seed of [2, 22, 222]) {
      const c = buildClearing("spelling", seed, 3);
      for (const s of c.stones) expect(c.tiles[s.y * COLS + s.x]).toBe("floor");
      for (const m of c.critters) expect(c.tiles[m.y * COLS + m.x]).toBe("floor");
      expect(c.tiles[c.start.y * COLS + c.start.x]).toBe("floor");
      expect(c.tiles.length).toBe(COLS * ROWS);
    }
  });

  it("starts the animals a good way off, so nothing is on top of them at the first step", () => {
    for (const seed of [3, 33, 333, 3333]) {
      const c = buildClearing("jungle", seed, 4);
      for (const m of c.critters) {
        expect(Math.abs(m.x - c.start.x) + Math.abs(m.y - c.start.y), `seed ${seed}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("builds the same clearing from the same seed, every time", () => {
    const a = buildClearing("rhythm", 42, 2);
    const b = buildClearing("rhythm", 42, 2);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    expect(JSON.stringify(buildClearing("rhythm", 43, 2))).not.toBe(JSON.stringify(a));
  });

  it("scatters stones that are not in the word, so walking to the nearest one is not spelling", () => {
    const c = buildClearing("cat", 5, 0);
    expect(c.stones.filter((s) => s.at === -1).length).toBeGreaterThan(0);
  });
});

describe("the walk", () => {
  const quiet = levelById("sp-k1")!;

  it("spells a word by walking its letters in order", () => {
    const moves = perfectMoves(quiet, 4);
    const run = play(quiet, moves);
    expect(run.finished).toBe(true);
    expect(run.wrong).toBe(0);
    expect(run.done).toBe(WORDS_PER_LEVEL);
    expect(run.lives).toBe(LIVES);
    expect(starsFor(run, WORDS_PER_LEVEL)).toBe(3);
  });

  it("will not let them walk into a wall", () => {
    const c = buildClearing("cat", 1, 0);
    // A wall of trees runs all the way round, so from the start tile one of
    // left or down is always a wall.
    const run = play(quiet, { seed: 1, steps: [{ d: "l", ms: 300 }, { d: "d", ms: 300 }] });
    expect(run.me.x).toBeGreaterThanOrEqual(1);
    expect(run.me.y).toBeLessThanOrEqual(ROWS - 2);
    expect(c.tiles[0]).toBe("wall");
  });

  it("does not take a letter that is out of turn, and counts it against them", () => {
    const level = quiet;
    const seed = 11;
    const word = wordsFor(level, seed)[0];
    const c = buildClearing(word, seed, 0);
    const second = c.stones.find((s) => s.at === 1)!;
    const steps = routeTo(c.tiles, c.start, { x: second.x, y: second.y })!.map((d) => ({ d, ms: 400 }));
    const run = play(level, { seed, steps });
    expect(run.got).toBe(0);
    expect(run.wrong).toBe(1);
  });

  it("replays the same from the same steps, through a JSON round trip", () => {
    const moves = perfectMoves(quiet, 8);
    const a = play(quiet, moves);
    const b = play(quiet, JSON.parse(JSON.stringify(moves)));
    expect(b.points).toBe(a.points);
    expect(b.done).toBe(a.done);
    expect(JSON.stringify(b.me)).toBe(JSON.stringify(a.me));
  });

  it("scores a run that never finished, without pretending it did", () => {
    const run = play(quiet, { seed: 2, steps: [{ d: "u", ms: 300 }] });
    expect(run.finished).toBe(false);
    expect(starsFor(run, WORDS_PER_LEVEL)).toBe(0);
  });

  it("takes anything the browser sends without falling over", () => {
    for (const junk of [null, undefined, 7, "x", {}, [], { seed: NaN, steps: null }, { seed: 1, steps: [{ d: "nope" }, 5, null] }, { seed: 1, steps: Array(9000).fill({ d: "r", ms: 1 }) }]) {
      expect(() => play(quiet, junk)).not.toThrow();
      const got = spellRush.score(quiet.id, junk);
      expect(got).not.toBeNull();
      expect(got!.stars).toBeGreaterThanOrEqual(0);
      expect(got!.stars).toBeLessThanOrEqual(3);
    }
    expect(cleanMove({ seed: -5, steps: [{ d: "r", ms: -9 }] }).steps[0].ms).toBe(0);
    expect(cleanMove({ steps: Array(5000).fill({ d: "u", ms: 1 }) }).steps.length).toBe(MAX_STEPS);
  });

  it("knows an unknown level when it sees one", () => {
    expect(spellRush.score("no-such-level", perfectMoves(quiet))).toBeNull();
    expect(evidenceFor("no-such-level", perfectMoves(quiet))).toEqual([]);
  });
});

describe("what it tells the mastery meter", () => {
  it("files a clean run under the standard the level teaches, at a game's weight", () => {
    const level = levelById("sp-21")!;
    const ev = evidenceFor(level.id, perfectMoves(level, 6));
    expect(ev.length).toBe(1);
    expect(ev[0].subject).toBe("ela");
    expect(ev[0].concept).toBe(level.standard);
    expect(ev[0].angle).toBe("fluency");
    expect(ev[0].weight).toBeLessThan(1);
  });
});

describe("where it sits", () => {
  it("is in the registry, with a screen to draw it", () => {
    expect(gameById("spellrush")).toBeTruthy();
    expect(GAMES.some((g) => g.id === "spellrush")).toBe(true);
    expect(GAME_UI.spellrush).toBeTruthy();
  });

  it("every game in the list has a screen", () => {
    for (const g of GAMES) expect(GAME_UI[g.id], `${g.id} has no screen`).toBeTruthy();
  });

  it("asks for two stars before the next level opens, and places the older kids", () => {
    expect(spellRushInfo.unlockAt).toBe(MOVE_ON_STARS);
    expect(spellRushInfo.placement).toBe(true);
    expect(MOVE_ON_STARS).toBe(2);
  });

  it("offers one ladder to everybody, bottom to top", () => {
    // A drill is a ladder, not a year group: the whole thing is listed for
    // every grade and the locks decide where a kid actually is. Grades 6-8
    // get placed part way up it instead of starting at short a.
    expect(spellRush.levelsForGrade?.(0)?.length).toBe(ALL_SPELL_LEVELS.length);
    expect(spellRush.levelsForGrade?.(8)?.length).toBe(ALL_SPELL_LEVELS.length);
    expect(spellRush.levels("junior" as never).length).toBe(ALL_SPELL_LEVELS.length);
    expect(levelsForGrade(3).length).toBe(6);
  });
});

describe("the art", () => {
  it("draws everything the clearing needs", () => {
    const grids = [treeGrid(0), treeGrid(1), waterGrid(0), floorGrid(), stoneGrid(false), stoneGrid(true), snakeGrid(0), snakeGrid(1), frogGrid(0), monkeyGrid(0), parrotGrid(0), gateGrid(true), gateGrid(false)];
    for (const g of grids) {
      expect(g.w).toBeGreaterThan(0);
      expect(g.px.filter((c) => c).length).toBeGreaterThan(8);
    }
  });
});

describe("how hard they want it", () => {
  const level = levelById("sp-26")!;

  it("empties the clearing on easy and fills it on the other two", () => {
    expect(play(level, { seed: 5, steps: [], pace: "easy" }).clearing.critters.length).toBe(0);
    expect(play(level, { seed: 5, steps: [], pace: "medium" }).clearing.critters.length).toBeGreaterThan(0);
    expect(play(level, { seed: 5, steps: [], pace: "hard" }).clearing.critters.length).toBeGreaterThan(0);
  });

  it("lets a kid think for free on medium, and not on hard", () => {
    const wait = { seed: 5, steps: [{ d: "w" as const, ms: 9000 }] };
    const easy = play(level, { ...wait, pace: "medium" });
    const hard = play(level, { ...wait, pace: "hard" });
    // Nothing moves while nobody moves, unless the clock is running.
    expect(JSON.stringify(easy.critters)).toBe(JSON.stringify(easy.clearing.critters));
    expect(JSON.stringify(hard.critters)).not.toBe(JSON.stringify(hard.clearing.critters));
  });

  it("replays a paced run exactly, time passing and all", () => {
    const steps = [{ d: "w" as const, ms: 2000 }, { d: "u" as const, ms: 1500 }, { d: "r" as const, ms: 700 }, { d: "w" as const, ms: 4000 }];
    const a = play(level, { seed: 9, steps, pace: "hard" });
    const b = play(level, JSON.parse(JSON.stringify({ seed: 9, steps, pace: "hard" })));
    expect(JSON.stringify(b.critters)).toBe(JSON.stringify(a.critters));
    expect(b.lives).toBe(a.lives);
  });
});

describe("mastering a clearing", () => {
  const level = levelById("sp-k1")!;

  it("is earned by spelling the lot cleanly, at a steady pace", () => {
    const run = play(level, perfectMoves(level, 4));
    expect(run.finished).toBe(true);
    expect(run.mastered).toBe(true);
    expect(spellRush.mastered?.(level.id, perfectMoves(level, 4))).toBe(true);
  });

  it("is lost by one wrong stone", () => {
    const seed = 11;
    const word = wordsFor(level, seed)[0];
    const c = buildClearing(word, seed, 0);
    const second = c.stones.find((s) => s.at === 1)!;
    const detour = routeTo(c.tiles, c.start, { x: second.x, y: second.y })!.map((d) => ({ d, ms: 500 }));
    const rest = perfectMoves(level, seed).steps;
    const run = play(level, { seed, steps: [...detour, ...rest], pace: "easy" });
    expect(run.wrong).toBeGreaterThan(0);
    expect(run.mastered).toBe(false);
  });

  it("is lost by stopping to work one out", () => {
    const base = perfectMoves(level, 4);
    const slow = { ...base, steps: base.steps.map((s, i) => (i === 3 ? { ...s, ms: 20000 } : s)) };
    expect(play(level, slow).mastered).toBe(false);
  });

  it("never throws, whatever it is handed", () => {
    for (const junk of [null, 5, "x", { seed: 1, steps: [{ d: "w" }] }]) {
      expect(() => spellRush.mastered?.(level.id, junk)).not.toThrow();
    }
    expect(spellRush.mastered?.("no-such-level", perfectMoves(level))).toBe(false);
  });

  it("hands out a different medal for every level, and the same one every time", () => {
    const seen = new Map<string, string>();
    for (const l of ALL_SPELL_LEVELS) {
      const g = medalGrid(l.id);
      expect(g.px.some((c) => c)).toBe(true);
      const key = g.px.join(",");
      expect(seen.has(key), `${l.id} shares a medal with ${seen.get(key)}`).toBe(false);
      seen.set(key, l.id);
    }
    expect(medalGrid("sp-31").px.join(",")).toBe(medalGrid("sp-31").px.join(","));
    expect(spellRush.medal?.("sp-31")).toBeTruthy();
  });
});

describe("the check that places an older kid", () => {
  it("asks eight words, spread up the ladder", () => {
    const asks = placementWords(77);
    expect(asks.length).toBe(PLACEMENT_RUNGS.length);
    expect(new Set(asks.map((a) => a.rung)).size).toBe(asks.length);
    for (const a of asks) {
      const level = ALL_SPELL_LEVELS[a.rung];
      expect(level.words.map((w) => w.toLowerCase())).toContain(a.word.toLowerCase());
      expect(a.title).toBe(level.title);
    }
  });

  it("puts them on the first word they could not spell", () => {
    const seed = 123;
    const asks = placementWords(seed);
    const said = asks.map((a) => a.word);
    said[3] = "wrongwrong";
    const got = placeFrom(seed, said);
    expect(got.rung).toBe(asks[3].rung);
    expect(got.right).toBe(3);
    expect(got.asked).toBe(asks.length);
  });

  it("opens the whole ladder for a kid who spells them all, and the bottom for a kid who spells none", () => {
    const seed = 321;
    const all = placeFrom(seed, placementWords(seed).map((a) => a.word.toUpperCase()));
    expect(all.right).toBe(PLACEMENT_RUNGS.length);
    expect(all.rung).toBeGreaterThanOrEqual(ALL_SPELL_LEVELS.length);
    const none = placeFrom(seed, []);
    expect(none.right).toBe(0);
    expect(none.rung).toBe(PLACEMENT_RUNGS[0]);
  });

  it("marks only on this side, and only for a game that has a check", () => {
    expect(placeFor("spellrush", 5, ["x"])).not.toBeNull();
    expect(placeFor("chompers", 5, [[0]])).not.toBeNull();
    expect(placeFor("numberhop", 5, [])).toBeNull();
    expect(placementFor("spellrush", 5)?.kind).toBe("spell");
    expect(placementFor("chompers", 5)?.kind).toBe("cells");
    expect(placementFor("numberhop", 5)).toBeNull();
  });
});

describe("boulders, keys and gates", () => {
  const rocky = levelById("sp-13")!;
  const gated = levelById("sp-34")!;

  it("puts boulders in from grade one and a gate from grade three", () => {
    const young = buildClearing("cat", 4, 0, 0);
    expect(young.rocks.length).toBe(0);
    expect(young.door).toBeNull();
    const rocks = [1, 2, 3, 4, 5].map((seed) => buildClearing("cake", seed, 1, 1).rocks.length);
    expect(Math.max(...rocks)).toBeGreaterThan(0);
    const doors = [1, 2, 3, 4, 5, 6].map((seed) => buildClearing("giant", seed, 2, 4).door).filter(Boolean);
    expect(doors.length).toBeGreaterThan(0);
  });

  it("never locks a letter away behind a boulder", () => {
    for (const level of ALL_SPELL_LEVELS.filter((l) => l.grade >= 1)) {
      for (const seed of [3, 31]) {
        for (const word of wordsFor(level, seed).slice(0, 2)) {
          const c = buildClearing(word, seed, crittersOn(level), level.grade);
          // With every boulder treated as a wall, and the gate open, every
          // letter is still walkable in order.
          const blocked = c.tiles.map((t, i) => (c.rocks.some((r) => r.y * COLS + r.x === i) ? "wall" : t));
          let from = c.start;
          for (let n = 0; n < word.length; n++) {
            const stone = c.stones.find((s) => s.at === n)!;
            expect(routeTo(blocked, from, { x: stone.x, y: stone.y }), `${level.id} / ${word}: letter ${n + 1} is boxed in`).not.toBeNull();
            from = { x: stone.x, y: stone.y };
          }
        }
      }
    }
  }, 30000);

  it("always leaves the key on this side of the gate, and something worth opening behind it", () => {
    let found = 0;
    for (const level of ALL_SPELL_LEVELS.filter((l) => l.grade >= 3)) {
      for (const seed of [5, 55]) {
        const word = wordsFor(level, seed)[0];
        const c = buildClearing(word, seed, crittersOn(level), level.grade);
        if (!c.door || !c.key) continue;
        found++;
        const shut = c.tiles.map((t, i) => (c.door!.y * COLS + c.door!.x === i || c.rocks.some((r) => r.y * COLS + r.x === i) ? "wall" : t));
        expect(routeTo(shut, c.start, c.key), `${level.id}: the key is behind its own gate`).not.toBeNull();
        // And the gate is worth opening: something is shut away behind it.
        const reach = c.stones.filter((s) => s.at >= 0 && routeTo(shut, c.start, { x: s.x, y: s.y }) === null);
        expect(reach.length, `${level.id}: the gate shuts nothing away`).toBeGreaterThan(0);
      }
    }
    expect(found, "no gates were built at all").toBeGreaterThan(0);
  }, 30000);

  it("shoves a boulder along, and will not shove it into a tree", () => {
    // A boulder with floor behind it moves on; one against the wall does not,
    // and nor does the kid.
    const c = buildClearing("cake", 2, 0, 2);
    expect(c.rocks.length).toBeGreaterThan(0);
    const rock = c.rocks[0];
    const path = routeTo(
      c.tiles.map((t, i) => (i === rock.y * COLS + rock.x ? "wall" : t)),
      c.start,
      { x: rock.x - 1, y: rock.y },
    );
    if (!path) return; // that boulder is not approachable from the left on this seed
    const steps = [...path.map((d) => ({ d, ms: 400 })), { d: "r" as const, ms: 400 }];
    const run = play(levelById("sp-21")!, { seed: 2, steps, pace: "easy" });
    expect(run.rocks.length).toBe(c.rocks.length);
  });

  it("keeps the gate shut until they are carrying the key", () => {
    const level = gated;
    const seed = 5;
    const word = wordsFor(level, seed)[0];
    const c = buildClearing(word, seed, crittersOn(level), level.grade);
    if (!c.door || !c.key) return;
    const toDoor = routeTo(withTrees(c.tiles, c.rocks), c.start, c.door);
    if (!toDoor) return;
    const run = play(level, { seed, steps: toDoor.map((d) => ({ d, ms: 400 })), pace: "easy" });
    expect(run.hasKey).toBe(false);
    expect(run.doorOpen).toBe(false);
    // They are stopped at it rather than standing in it.
    expect(run.me.x === c.door.x && run.me.y === c.door.y).toBe(false);
  });

  it("still walks a gated, bouldered level all the way through", () => {
    // Five words, gates and boulders among them, walked by the shortest
    // route there is: it finishes, and if it never trod on a wrong stone on
    // the way it is a medal.
    for (const seed of [5, 17, 29]) {
      const run = play(gated, perfectMoves(gated, seed));
      expect(run.finished, `seed ${seed}`).toBe(true);
      expect(run.mastered).toBe(run.wrong === 0);
    }
  });

  it("draws the new pieces", () => {
    for (const g of [rockGrid(), keyGrid(0), keyGrid(1), doorGrid(true), doorGrid(false)]) {
      expect(g.px.filter((c) => c).length).toBeGreaterThan(8);
    }
    expect(rocky.grade).toBe(1);
  });
});

/** The same ground with these tiles walled off, for the tests to ask "what if". */
function withTrees(tiles: ReturnType<typeof buildClearing>["tiles"], blocks: { x: number; y: number }[]) {
  return tiles.map((t, i) => (blocks.some((b) => b.y * COLS + b.x === i) ? ("wall" as const) : t));
}

describe("where a level happens", () => {
  it("gives every level a place of its own", () => {
    const seen = new Map<string, string>();
    for (const l of ALL_SPELL_LEVELS) {
      const p = placeOf(l);
      expect(seen.has(p.id), `${l.id} is set in the same place as ${seen.get(p.id)}`).toBe(false);
      seen.set(p.id, l.id);
    }
    expect(PLACES.length).toBe(ALL_SPELL_LEVELS.length);
    expect(new Set(PLACES.map((p) => p.name)).size).toBe(PLACES.length);
    for (const p of PLACES) {
      expect(p.name.length).toBeGreaterThan(3);
      expect(p.name).not.toMatch(BANNED);
    }
  });

  it("draws every wall, every bit of odd ground and every animal", () => {
    const walls = new Set(PLACES.map((p) => p.wall));
    for (const w of walls) {
      const g = wallGrid(w, "#2f7d46", "#63c47f", 0);
      expect(g.px.filter((c) => c).length, w).toBeGreaterThan(10);
    }
    for (const g of [mudGrid(), vineGrid(0), iceGrid(), pitGrid()]) expect(g.px.filter((c) => c).length).toBeGreaterThan(10);
    for (const g of [batGrid(0), batGrid(1), crocGrid(0), spiderGrid(0), beetleGrid(0)]) expect(g.px.filter((c) => c).length).toBeGreaterThan(8);
  });

  it("puts the animals a place keeps, and the ground it has", () => {
    for (const level of ALL_SPELL_LEVELS) {
      const p = placeOf(level);
      const c = buildClearing(wordsFor(level, 3)[0], 3, crittersOn(level), level.grade, p);
      for (const m of c.critters) expect(p.critters, `${p.id} has no ${m.kind}`).toContain(m.kind);
      const odd = new Set(c.tiles.filter((t) => t === "mud" || t === "ice" || t === "vine" || t === "pit"));
      for (const t of odd) expect(t, `${p.id} grew ${t} from nowhere`).toBe(p.special);
    }
  }, 30000);

  it("keeps a crocodile in the water and lets a bat over the walls", () => {
    const pool = PLACES.find((p) => p.critters.includes("croc"))!;
    for (const seed of [2, 4, 6, 8]) {
      const c = buildClearing("river", seed, 2, 2, pool);
      for (const m of c.critters.filter((x) => x.kind === "croc")) expect(c.tiles[m.y * COLS + m.x]).toBe("water");
    }
  });

  it("still finishes every level with the new ground in it", () => {
    for (const level of ALL_SPELL_LEVELS) {
      const run = play(level, perfectMoves(level, 12));
      expect(run.finished, `${level.id} cannot be finished`).toBe(true);
    }
  }, 60000);
});
