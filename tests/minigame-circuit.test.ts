import { describe, expect, it } from "vitest";
import {
  ALL_CIRCUIT_LEVELS,
  CIRCUIT_LEVELS,
  KINDS,
  MAX_TRIES,
  TELEGRAPH,
  boardFor,
  checkTry,
  circuitBuilder,
  circuitBuilderInfo,
  cleanMoves,
  encode,
  levelById,
  partGrid,
  pathOf,
  perfectMoves,
  replay,
  simulate,
  slotsOf,
  starsFor,
  type Board,
  type CircuitRound,
} from "@/lib/minigames/circuit";
import { gameById, levelsForKid } from "@/lib/minigames";

const g4 = CIRCUIT_LEVELS[4];
const round = (lvl: number, r: number): CircuitRound => g4[lvl].rounds[r];

describe("circuit builder levels", () => {
  it("has 3 grade-4 levels with 6-8 rounds, unique ids and a named skill", () => {
    expect(circuitBuilder.grades).toEqual([4]);
    expect(circuitBuilderInfo.id).toBe("circuit");
    expect(g4).toHaveLength(3);
    expect(circuitBuilder.levelsForGrade!(4).map((l) => l.id)).toEqual(["g4-1", "g4-2", "g4-3"]);
    expect(circuitBuilder.levelsForGrade!(3)).toEqual([]);
    expect(new Set(ALL_CIRCUIT_LEVELS.map((l) => l.id)).size).toBe(ALL_CIRCUIT_LEVELS.length);
    for (const l of g4) {
      expect(l.rounds.length).toBeGreaterThanOrEqual(6);
      expect(l.rounds.length).toBeLessThanOrEqual(8);
      expect(l.intro).toMatch(/Skill:.*4-PS/);
    }
    expect(gameById("circuit")).toBe(circuitBuilder);
    expect(levelsForKid(circuitBuilder, 4)).toHaveLength(3);
  });

  it("every board fits its grid and every fixed part sits on a real slot", () => {
    for (const l of ALL_CIRCUIT_LEVELS)
      for (const r of l.rounds) {
        const slots = slotsOf(r.cols, r.rows);
        expect(r.cols).toBeLessThanOrEqual(4);
        expect(r.rows).toBeLessThanOrEqual(3);
        for (const s of Object.keys(r.fixed)) expect(slots).toContain(s);
        for (const [s] of r.start ?? []) expect(slots).toContain(s);
      }
  });

  it("every worked solution passes on the first test, so every level can reach 3 stars", () => {
    for (const l of ALL_CIRCUIT_LEVELS) {
      for (const r of l.rounds) expect(checkTry(r, r.solution), `${l.id} ${r.title}: ${checkTry(r, r.solution).note}`).toMatchObject({ ok: true });
      const res = replay(l, perfectMoves(l));
      expect(res.stars).toBe(3);
      expect(res.points).toBe(res.max);
      expect(circuitBuilder.score(l.id, perfectMoves(l))).toEqual({ stars: 3, best: res.max });
    }
  });

  it("the starting board of each build round does not already meet the goal", () => {
    for (const l of ALL_CIRCUIT_LEVELS)
      for (const r of l.rounds)
        if (r.kind === "build") expect(checkTry(r, { parts: r.start ?? [] }).ok, `${l.id} ${r.title}`).toBe(false);
  });

  it("replays are deterministic", () => {
    const l = g4[2];
    const moves = perfectMoves(l);
    expect(replay(l, moves)).toEqual(replay(l, JSON.parse(JSON.stringify(moves))));
  });

  it("garbage moves score 0 without throwing, unknown levels return null", () => {
    for (const junk of [null, undefined, 42, "x", {}, [null], [{ tries: "no" }], [{ tries: [{ parts: [[1, 2], ["h01", "laser"], "zz"], on: [5], code: 7 }] }]]) {
      for (const l of ALL_CIRCUIT_LEVELS) expect(circuitBuilder.score(l.id, junk)).toEqual({ stars: 0, best: 0 });
    }
    expect(circuitBuilder.score("nope", [])).toBeNull();
    expect(circuitBuilder.score("g4-9", perfectMoves(g4[0]))).toBeNull();
    expect(cleanMoves(Array(50).fill({ tries: [] }))).toHaveLength(10);
  });

  it("stars: first test earns 3, later tests fewer, more than 3 tests are ignored", () => {
    const l = g4[0];
    const bad = { parts: [] };
    const late = l.rounds.map((r) => ({ tries: [bad, r.solution] }));
    const r2 = replay(l, late);
    expect(r2.points).toBe(l.rounds.length * 2);
    expect(r2.stars).toBe(starsFor(r2.points, r2.max));
    expect(r2.stars).toBe(2);
    const tooLate = l.rounds.map((r) => ({ tries: [bad, bad, bad, r.solution] }));
    expect(replay(l, tooLate).points).toBe(0);
    expect(MAX_TRIES).toBe(3);
    // one round on the second try still keeps 3 stars
    const oneMiss = l.rounds.map((r, i) => ({ tries: i ? [r.solution] : [bad, r.solution] }));
    expect(replay(l, oneMiss).stars).toBe(3);
  });

  it("tray limits and fixed parts can't be cheated", () => {
    const r = round(0, 0); // one wire in the tray
    const b = boardFor(r, { parts: [["h01", "wire"], ["v10", "wire"], ["h10", "wire"], ["v00", "wire"]] });
    expect(b.h10.k).toBe("bulb");
    expect(b.v00.k).toBe("battery");
    expect(b.v10).toBeUndefined();
    expect(boardFor(r, { parts: [["h01", "battery"]] }).h01).toBeUndefined();
  });
});

describe("real circuit rules", () => {
  const loop: Board = { v00: { k: "battery" }, h00: { k: "wire" }, h10: { k: "bulb" }, v20: { k: "wire" }, h11: { k: "wire" }, h01: { k: "wire" } };

  it("a complete loop lights the bulb; a gap does not", () => {
    expect(simulate(3, 2, loop).level.h10).toBe(2);
    const open = { ...loop };
    delete open.h01;
    expect(simulate(3, 2, open).level.h10).toBe(0);
  });

  it("an open switch or an insulator breaks the loop; metal closes it", () => {
    expect(simulate(3, 2, { ...loop, h01: { k: "switch" } }).level.h10).toBe(0);
    expect(simulate(3, 2, { ...loop, h01: { k: "switch", on: true } }).level.h10).toBe(2);
    expect(simulate(3, 2, { ...loop, h01: { k: "band" } }).level.h10).toBe(0);
    expect(simulate(3, 2, { ...loop, h01: { k: "stick" } }).level.h10).toBe(0);
    expect(simulate(3, 2, { ...loop, h01: { k: "coin" } }).level.h10).toBe(2);
    expect(simulate(3, 2, { ...loop, h01: { k: "nail" } }).level.h10).toBe(2);
  });

  it("a wire across the battery is a short circuit", () => {
    const s = simulate(3, 2, { ...loop, v10: { k: "wire" } });
    expect(s.short).toBe(true);
    expect(checkTry(round(0, 5), { parts: round(0, 5).start }).note).toMatch(/Short circuit/);
  });

  it("two batteries the same way are brighter; opposite ways cancel", () => {
    const two = { ...loop, h00: { k: "battery" as const, flip: true } };
    expect(simulate(3, 2, two).level.h10).toBe(3);
    const fight = { ...loop, h00: { k: "battery" as const } };
    expect(simulate(3, 2, fight).level.h10).toBe(0);
    expect(checkTry(round(1, 3), { parts: [["h00", "battery"], ["h01", "wire"]] }).note).toMatch(/opposite ways/);
  });

  it("bulbs in series are dim, in parallel bright", () => {
    const series = checkTry(round(2, 1), round(2, 0).solution);
    expect(series.ok).toBe(false);
    expect(series.note).toMatch(/dim/);
  });

  it("design rules: series switches make AND, parallel switches make OR", () => {
    const and = round(2, 3);
    const or = round(2, 4);
    expect(checkTry(and, or.solution).ok).toBe(false);
    expect(checkTry(or, and.solution).ok).toBe(false);
    expect(checkTry(and, or.solution).note).toMatch(/series|one after the other/);
  });

  it("explains the path and the energy change", () => {
    const c = checkTry(round(1, 0), round(1, 0).solution);
    expect(c.note).toMatch(/\+ end.*motor.*− end/);
    expect(c.note).toMatch(/motion/);
    const wrong = checkTry(round(1, 0), { parts: [["h10", "bulb"]] });
    expect(wrong.ok).toBe(false);
    expect(wrong.note).toMatch(/needs motion/);
    expect(pathOf(boardFor(round(0, 1), round(0, 1).solution), simulate(3, 2, boardFor(round(0, 1), round(0, 1).solution)), 3)).toHaveLength(5);
  });

  it("the telegraph keys run the lamp and the buzzer separately", () => {
    const lamp = simulate(3, 2, { ...TELEGRAPH, h00: { k: "switch", on: true } });
    expect(lamp.level.v00).toBeGreaterThan(0);
    expect(lamp.level.v20).toBe(0);
    const buzz = simulate(3, 2, { ...TELEGRAPH, h10: { k: "switch", on: true } });
    expect(buzz.level.v20).toBeGreaterThan(0);
    expect(buzz.level.v00).toBe(0);
  });

  it("codes: Morse for SOS, and wrong letters get a hint", () => {
    expect(encode("SOS")).toBe("...|---|...");
    expect(checkTry(round(2, 5), { code: "...|...|..." }).note).toMatch(/Letter 2 should be O/);
    expect(checkTry(round(2, 6), { code: "tra" }).ok).toBe(false);
    expect(checkTry(round(2, 6), { code: "train" }).ok).toBe(true);
  });

  it("sort: coin, nail, clip conduct; band, stick, spoon insulate", () => {
    const r = round(0, 3);
    expect(checkTry(r, { sort: "cicici" }).ok).toBe(true);
    expect(checkTry(r, { sort: "ccccci" }).ok).toBe(false);
  });

  it("draws every part", () => {
    for (const k of KINDS) {
      const g = partGrid(k, { level: 2, on: true });
      expect(g.w).toBe(16);
      expect(g.px.some(Boolean)).toBe(true);
    }
  });

  it("level ids look up", () => {
    expect(levelById("g4-2")?.title).toBe("Energy on the Move");
  });
});
