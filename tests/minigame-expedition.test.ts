import { describe, expect, it } from "vitest";
import { EVENTS, EXPEDITION_LEVELS, eventsFor, expedition, levelById, replay, starsFor, type ExpLevel } from "../src/lib/minigames/expedition";
import { gameById } from "../src/lib/minigames";

const LEVELS = Object.values(EXPEDITION_LEVELS).flat();

/** Depth-first search for a move list that earns 3 stars (stops at the first one). */
function solve(level: ExpLevel): number[] | null {
  const events = eventsFor(level);
  const seq: number[] = [];
  const rec = (d: number): boolean => {
    if (d === level.days) return replay(level, seq).stars === 3;
    for (let c = 0; c < events[d].choices.length; c++) {
      seq[d] = c;
      const partial = replay(level, seq.slice(0, d + 1));
      if (!partial.failed && rec(d + 1)) return true;
    }
    seq.length = d;
    return false;
  };
  return rec(0) ? [...seq] : null;
}

describe("Expedition Leader", () => {
  it("is registered with 3 levels per band", () => {
    expect(expedition).not.toBeNull();
    expect(gameById("expedition")?.land).toBe("summit");
    for (const band of ["sprout", "adventurer", "strategist"] as const) {
      const levels = expedition!.levels(band);
      expect(levels).toHaveLength(3);
      for (const l of levels) expect(l.intro.length).toBeGreaterThan(20);
    }
    expect(new Set(LEVELS.map((l) => l.id)).size).toBe(LEVELS.length);
  });

  it("uses the right number of days per band, with 2-3 choices each day", () => {
    const days = { sprout: 5, adventurer: 8, strategist: 10 };
    for (const l of LEVELS) {
      expect(l.days).toBe(days[l.band]);
      const ev = eventsFor(l);
      expect(ev).toHaveLength(l.days);
      expect(new Set(ev.map((e) => e.id)).size).toBe(l.days);
      for (const e of ev) {
        expect(e.bands).toContain(l.band);
        expect(e.choices.length).toBeGreaterThanOrEqual(2);
        expect(e.choices.length).toBeLessThanOrEqual(3);
      }
    }
  });

  it("every event teaches: a lesson and feedback on every choice", () => {
    for (const e of EVENTS) {
      expect(e.lesson.length).toBeGreaterThan(20);
      for (const c of e.choices) expect(c.why.length).toBeGreaterThan(20);
    }
  });

  it("only the strategist band has delayed consequences and gambles", () => {
    for (const l of LEVELS) expect(l.delayed).toBe(l.band === "strategist");
    for (const e of EVENTS.filter((e) => e.bands.includes("sprout"))) for (const c of e.choices) expect(c.gamble).toBeUndefined();
  });

  it.each(LEVELS.map((l) => [l.id, l] as const))("level %s can reach 3 stars, and score() agrees", (_id, level) => {
    const moves = solve(level);
    expect(moves).not.toBeNull();
    const r = replay(level, moves!);
    expect(r.finished).toBe(true);
    expect(r.stars).toBe(3);
    expect(expedition!.score(level.id, moves)).toEqual({ stars: 3, best: r.best });
  });

  it("not every path earns 3 stars (choices matter)", () => {
    for (const l of LEVELS) {
      const results = [0, 1, 2].map((c) => replay(l, Array.from({ length: l.days }, (_, d) => Math.min(c, eventsFor(l)[d].choices.length - 1))));
      expect(results.some((r) => r.stars < 3)).toBe(true);
    }
  });

  it("strategist delayed consequences show up on a later day", () => {
    const l = levelById("x-h1")!;
    const ev = eventsFor(l);
    const d = ev.findIndex((e) => e.choices.some((c) => c.later));
    expect(d).toBeGreaterThanOrEqual(0);
    const c = ev[d].choices.findIndex((c) => c.later);
    const moves = Array.from({ length: l.days }, (_, i) => (i === d ? c : 0));
    const r = replay(l, moves);
    const due = d + ev[d].choices[c].later!.days;
    if (!r.failed && due < l.days) {
      expect(r.days[d].lines.some((x) => x.kind === "later")).toBe(false);
      expect(r.days[due].lines.some((x) => x.kind === "later")).toBe(true);
    }
  });

  it("replays are deterministic", () => {
    for (const l of LEVELS) {
      const moves = Array.from({ length: l.days }, (_, d) => (d * 7 + 1) % eventsFor(l)[d].choices.length);
      expect(replay(l, moves)).toEqual(replay(l, moves));
      expect(expedition!.score(l.id, moves)).toEqual(expedition!.score(l.id, [...moves]));
    }
  });

  it("garbage moves score 0 without throwing", () => {
    const garbage: unknown[] = [null, undefined, "hi", 42, {}, [], [-1], [99], [0.5], ["0"], [null], [NaN], [Infinity], new Array(50).fill(0), [{ a: 1 }], [[0]]];
    for (const l of LEVELS) for (const g of garbage) expect(expedition!.score(l.id, g)).toEqual({ stars: 0, best: 0 });
    expect(expedition!.score("nope", [0, 0, 0])).toBeNull();
  });

  it("an unfinished expedition scores 0", () => {
    for (const l of LEVELS) expect(expedition!.score(l.id, [0, 0])).toEqual({ stars: 0, best: 0 });
  });

  it("stars follow the rules: weakest final meter against the level's targets", () => {
    const l = levelById("x-s1")!;
    const m = (low: number) => ({ s: 90, h: 90, m: 90, t: low });
    expect(starsFor(l, m(l.three), true)).toBe(3);
    expect(starsFor(l, m(l.three - 1), true)).toBe(2);
    expect(starsFor(l, m(l.two), true)).toBe(2);
    expect(starsFor(l, m(l.two - 1), true)).toBe(1);
    expect(starsFor(l, m(1), true)).toBe(1);
    expect(starsFor(l, m(99), false)).toBe(0);
    for (const lv of LEVELS) {
      const moves = Array.from({ length: lv.days }, () => 0);
      const r = replay(lv, moves);
      const low = Math.min(r.meters.s, r.meters.h, r.meters.m, r.meters.t);
      const want = !r.finished ? 0 : low >= lv.three ? 3 : low >= lv.two ? 2 : 1;
      expect(r.stars).toBe(want);
    }
  });

  it("running out of a meter stops the expedition with 0 stars", () => {
    let found = false;
    for (const l of LEVELS.filter((l) => l.band !== "sprout")) {
      for (const pick of [1, 2]) {
        const moves = Array.from({ length: l.days }, (_, d) => Math.min(pick, eventsFor(l)[d].choices.length - 1));
        const r = replay(l, moves);
        if (r.failed) {
          found = true;
          expect(r.stars).toBe(0);
          expect(r.days.length).toBeLessThanOrEqual(l.days);
          expect(expedition!.score(l.id, moves.slice(0, r.days.length))).toEqual({ stars: 0, best: 0 });
        }
      }
    }
    expect(found).toBe(true);
  });

  it("meters stay between 0 and 100", () => {
    for (const l of LEVELS) {
      const r = replay(l, Array.from({ length: l.days }, (_, d) => d % eventsFor(l)[d].choices.length));
      for (const d of r.days) for (const v of Object.values(d.after)) expect(v >= 0 && v <= 100).toBe(true);
    }
  });
});
