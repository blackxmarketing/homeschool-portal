import { describe, expect, it } from "vitest";
import {
  COUNT_TRIES,
  HABITAT_LEVELS,
  habitatRescue,
  habitatRescueInfo,
  isSprite,
  kindsIn,
  levelById,
  moreKinds,
  perfectMoves,
  replay,
  scoreRound,
  spriteFor,
  SPRITE_IDS,
  SPRITE_NAMES,
  starsFor,
  trayOrder,
  type HabitatLevel,
} from "@/lib/minigames/habitat";
import { gamesForGrade, levelsForKid } from "@/lib/minigames";

const all = HABITAT_LEVELS;
const pics = (l: HabitatLevel) =>
  l.rounds.flatMap((r) =>
    r.kind === "needs" ? [r.who, ...r.needs.map((n) => n.pic), ...r.extras.map((x) => x.pic)] : r.kind === "sort" ? [...r.bins.map((b) => b.pic), ...r.pieces.map((x) => x.pic)] : r.places.flatMap((p) => p.things),
  );

describe("Habitat Rescue levels", () => {
  it("has 3 levels for each of grades K, 1 and 2, with unique ids that name the grade", () => {
    expect(habitatRescue.grades).toEqual([0, 1, 2]);
    for (const g of [0, 1, 2]) {
      const ls = habitatRescue.levelsForGrade!(g);
      expect(ls).toHaveLength(3);
      for (const l of ls) expect(l.id.startsWith(g === 0 ? "k-" : `g${g}-`)).toBe(true);
      expect(levelsForKid(habitatRescue, g)).toHaveLength(3);
      expect(gamesForGrade(g).some((x) => x.id === "habitat")).toBe(true);
    }
    expect(habitatRescue.levelsForGrade!(3)).toEqual([]);
    expect(new Set(all.map((l) => l.id)).size).toBe(all.length);
    expect(habitatRescue.id).toBe(habitatRescueInfo.id);
  });

  it("every level has 5-8 rounds, names its skill and standard, and its content is consistent", () => {
    for (const l of all) {
      expect(l.rounds.length, l.id).toBeGreaterThanOrEqual(5);
      expect(l.rounds.length, l.id).toBeLessThanOrEqual(8);
      expect(l.intro, l.id).toMatch(/Skill:/);
      expect(l.intro, l.id).toMatch(/[K12]-(LS|ESS)\d-\d/);
      for (const r of l.rounds) {
        expect(r.prompt.length).toBeGreaterThan(5);
        expect(r.done.length).toBeGreaterThan(5);
        if (r.kind === "needs") {
          expect(isSprite(r.who), `${l.id} ${r.who}`).toBe(true);
          expect(r.needs.length).toBeGreaterThan(0);
          expect(r.extras.length).toBeGreaterThan(0);
          const ids = [...r.needs, ...r.extras].map((x) => x.id);
          expect(new Set(ids).size, l.id).toBe(ids.length);
        } else if (r.kind === "sort") {
          const ids = r.pieces.map((x) => x.id);
          expect(new Set(ids).size, l.id).toBe(ids.length);
          for (const x of r.pieces) expect(r.bins.some((b) => b.id === x.bin), `${l.id} ${x.id}`).toBe(true);
          // Every bin gets used.
          for (const b of r.bins) expect(r.pieces.some((x) => x.bin === b.id), `${l.id} ${b.id}`).toBe(true);
        } else {
          for (const p of r.places) for (const t of p.things) expect(isSprite(t), t).toBe(true);
          // No ties, and the "done" line states the right counts.
          expect(kindsIn(r.places[0])).not.toBe(kindsIn(r.places[1]));
          expect(r.done).toContain(String(kindsIn(r.places[moreKinds(r)])));
        }
      }
    }
  });

  it("gets harder: grade 2 has the biggest sorts and the count rounds", () => {
    const biggestSort = (g: number) => Math.max(...all.filter((l) => l.grade === g).flatMap((l) => l.rounds.map((r) => (r.kind === "sort" ? r.bins.length : 0))));
    expect(biggestSort(0)).toBeLessThanOrEqual(3);
    expect(biggestSort(2)).toBe(5);
    expect(all.filter((l) => l.grade < 2).some((l) => l.rounds.some((r) => r.kind === "count"))).toBe(false);
  });

  it("draws every sprite it uses with the pixel kit", () => {
    for (const id of SPRITE_IDS) {
      const g = spriteFor(id)!;
      expect(g.runs().length, id).toBeGreaterThan(5);
      expect(SPRITE_NAMES[id], id).toBeTruthy();
    }
    for (const l of all) for (const pic of pics(l)) expect(pic.length, `${l.id} ${pic}`).toBeGreaterThan(0);
  });

  it("every level can reach 3 stars", () => {
    for (const l of all) expect(habitatRescue.score(l.id, perfectMoves(l)), l.id).toEqual({ stars: 3, best: l.rounds.length * 2 });
  });

  it("replays and tray orders are deterministic", () => {
    for (const l of all) {
      const m = perfectMoves(l);
      expect(replay(l, m)).toEqual(replay(l, JSON.parse(JSON.stringify(m))));
      l.rounds.forEach((_, i) => expect(trayOrder(l, i).map((x) => x.id)).toEqual(trayOrder(l, i).map((x) => x.id)));
    }
  });

  it("garbage moves score 0 without throwing, and unknown levels return null", () => {
    const junk: unknown[] = [
      null, undefined, 42, "hi", {}, [], [null], [[]], [{ picks: "water" }], [{ drops: [[1, 2]] }], [{ tries: [{ a: "4", b: 2, more: 0 }] }],
      [{ picks: [{}, null, 7] }], [{ drops: "x" }], [{ tries: [{ a: 1e9, b: -1, more: 5 }] }], [[[[]]]], Array(500).fill({ picks: ["x".repeat(1000)] }),
    ];
    for (const l of all)
      for (const j of junk) {
        expect(() => habitatRescue.score(l.id, j)).not.toThrow();
        expect(habitatRescue.score(l.id, j)!.stars, `${l.id} ${JSON.stringify(j)?.slice(0, 40)}`).toBe(0);
      }
    expect(habitatRescue.score("nope", perfectMoves(all[0]))).toBeNull();
    expect(levelById("nope")).toBeUndefined();
  });

  it("tapping everything in the tray finishes a needs round but costs its points", () => {
    for (const l of all)
      for (const r of l.rounds) {
        if (r.kind !== "needs") continue;
        const res = scoreRound(r, { picks: [...r.extras, ...r.needs].map((x) => x.id) });
        expect(res.complete).toBe(true);
        expect(res.points).toBe(r.extras.length === 1 ? 1 : 0);
      }
  });

  it("one wrong try costs a point, two cost the round's points, and the stars follow", () => {
    const l = levelById("k-3")!;
    const m = perfectMoves(l);
    const sortIdx = l.rounds.findIndex((r) => r.kind === "sort");
    const sr = l.rounds[sortIdx];
    if (sr.kind !== "sort") throw new Error("expected a sort round");
    const p0 = sr.pieces[0];
    const wrongBin = sr.bins.find((b) => b.id !== p0.bin)!.id;
    // A wrong drop first, then right.
    const oneMiss = m.map((x, i) => (i === sortIdx ? { drops: [[p0.id, wrongBin], ...sr.pieces.map((q) => [q.id, q.bin])] } : x));
    expect(replay(l, oneMiss).points).toBe(l.rounds.length * 2 - 1);
    expect(replay(l, oneMiss).stars).toBe(3); // 11 of 12
    // The same wrong drop twice still counts once.
    const twice = m.map((x, i) => (i === sortIdx ? { drops: [[p0.id, wrongBin], [p0.id, wrongBin], ...sr.pieces.map((q) => [q.id, q.bin])] } : x));
    expect(replay(l, twice).points).toBe(l.rounds.length * 2 - 1);
    // Two rounds with a miss each: 10 of 12 is 2 stars.
    const needsIdx = l.rounds.findIndex((r) => r.kind === "needs");
    const nr = l.rounds[needsIdx];
    if (nr.kind !== "needs") throw new Error("expected a needs round");
    const twoMiss = oneMiss.map((x, i) => (i === needsIdx ? { picks: [nr.extras[0].id, ...nr.needs.map((n) => n.id)] } : x));
    expect(replay(l, twoMiss).points).toBe(10);
    expect(replay(l, twoMiss).stars).toBe(2);
    // Unfinished rounds earn nothing.
    expect(replay(l, m.slice(0, 3)).points).toBe(6);
    expect(replay(l, m.slice(0, 3)).stars).toBe(1);
  });

  it("count rounds: right on try 1 = 2 points, try 2 = 1, never = 0; counting animals instead of kinds is wrong", () => {
    const l = levelById("g2-3")!;
    const r = l.rounds[1];
    if (r.kind !== "count") throw new Error("expected a count round");
    const good = { a: kindsIn(r.places[0]), b: kindsIn(r.places[1]), more: moreKinds(r) };
    const animals = { a: r.places[0].things.length, b: r.places[1].things.length, more: r.places[0].things.length > r.places[1].things.length ? 0 : 1 };
    expect(scoreRound(r, { tries: [good] }).points).toBe(2);
    expect(scoreRound(r, { tries: [animals, good] }).points).toBe(1);
    expect(scoreRound(r, { tries: [animals, animals, good] })).toEqual({ complete: true, mistakes: 2, points: 0 });
    expect(scoreRound(r, { tries: Array(COUNT_TRIES).fill(animals) }).complete).toBe(false);
    // The wrong "more" fails even with the right counts.
    expect(scoreRound(r, { tries: [{ ...good, more: 1 - good.more }] }).complete).toBe(false);
  });

  it("star thresholds", () => {
    expect(starsFor(12, 12)).toBe(3);
    expect(starsFor(11, 12)).toBe(3);
    expect(starsFor(10, 12)).toBe(2);
    expect(starsFor(8, 12)).toBe(2);
    expect(starsFor(4, 12)).toBe(1);
    expect(starsFor(3, 12)).toBe(0);
    expect(starsFor(0, 12)).toBe(0);
    expect(starsFor(9, 10)).toBe(3);
    expect(starsFor(8, 10)).toBe(2);
  });
});
