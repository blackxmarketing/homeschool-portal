import { describe, expect, it } from "vitest";
import {
  EASIER_AFTER,
  VARIANT_COUNT,
  hashSeed,
  nextVariant,
  seededOrder,
  seededRng,
  tierFor,
  variantRng,
  variantSeed,
} from "@/lib/variants";
import { sanitize } from "@/lib/content";
import { VARIANT_CONTENT, VARIANT_THEMES, castFor } from "@/content/variants";

const draw = (seed: number, n = 8) => {
  const r = seededRng(seed);
  return Array.from({ length: n }, () => r());
};

describe("variant seeds", () => {
  it("gives the same version the same content every time", () => {
    expect(variantSeed(1, "money.earning", 3)).toBe(variantSeed(1, "money.earning", 3));
    expect(draw(variantSeed(1, "money.earning", 3))).toEqual(draw(variantSeed(1, "money.earning", 3)));
  });

  it("gives a different version different content", () => {
    const seeds = Array.from({ length: VARIANT_COUNT }, (_, i) => variantSeed(1, "money.earning", i));
    expect(new Set(seeds).size).toBe(VARIANT_COUNT);
  });

  it("gives two kids different content on the same version, so they can't trade answers", () => {
    expect(variantSeed(1, "money.earning", 0)).not.toBe(variantSeed(2, "money.earning", 0));
  });

  it("keeps lessons apart", () => {
    expect(variantSeed(1, "money.earning", 0)).not.toBe(variantSeed(1, "money.pricing", 0));
  });

  it("variantRng is just the seeded generator for that version", () => {
    expect(draw(variantSeed(4, "sci.cells", 2))).toEqual(
      Array.from({ length: 8 }, (() => { const r = variantRng(4, "sci.cells", 2); return () => r(); })()),
    );
  });

  it("hashes anything to a usable 32-bit seed", () => {
    for (const s of ["", "a", "money.earning", "x".repeat(300)]) {
      const h = hashSeed(s);
      expect(Number.isInteger(h)).toBe(true);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThan(2 ** 32);
    }
  });
});

describe("picking the next version", () => {
  it("stays put once they have mastered it, so a replay feels the same", () => {
    expect(nextVariant(3, true)).toBe(3);
    expect(nextVariant(0, true)).toBe(0);
  });

  it("moves on when they have not", () => {
    expect(nextVariant(0, false)).toBe(1);
    expect(nextVariant(3, false)).toBe(4);
  });

  it("cycles instead of running out", () => {
    expect(nextVariant(VARIANT_COUNT - 1, false)).toBe(0);
  });

  it("walks every version before repeating one", () => {
    const seen = new Set<number>();
    let v = 0;
    for (let i = 0; i < VARIANT_COUNT; i++) {
      seen.add(v);
      v = nextVariant(v, false);
    }
    expect(seen.size).toBe(VARIANT_COUNT);
    expect(v).toBe(0);
  });
});

describe("dropping to the easier tier", () => {
  it("stays standard while the meter is climbing, however many tries it takes", () => {
    expect(tierFor(0, true)).toBe("standard");
    expect(tierFor(EASIER_AFTER + 5, true)).toBe("standard");
  });

  it("goes easier once a few versions have not moved it", () => {
    expect(tierFor(EASIER_AFTER - 1, false)).toBe("standard");
    expect(tierFor(EASIER_AFTER, false)).toBe("easier");
  });
});

describe("seededOrder", () => {
  it("is the same every time for the same seed", () => {
    expect(seededOrder(6, "lesson:p1")).toEqual(seededOrder(6, "lesson:p1"));
  });

  it("is a real permutation", () => {
    const idx = seededOrder(7, "x");
    expect([...idx].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("never leaves the items in their original order", () => {
    for (let n = 2; n <= 8; n++) {
      for (const seed of ["a", "b", "c", "d", "e"]) {
        expect(seededOrder(n, seed).every((v, i) => v === i)).toBe(false);
      }
    }
  });

  it("copes with nothing to shuffle", () => {
    expect(seededOrder(0, "x")).toEqual([]);
    expect(seededOrder(1, "x")).toEqual([0]);
  });
});

describe("the cast and setting pools", () => {
  it("every pool has enough in it to vary a story", () => {
    const c: Record<string, string[]> = { ...VARIANT_CONTENT.base };
    for (const [name, list] of Object.entries(c)) {
      expect(list.length, name).toBeGreaterThanOrEqual(10);
      expect(new Set(list).size, name).toBe(list.length);
      expect(list.every((s) => s.trim().length > 0), name).toBe(true);
    }
  });

  it("a themed lesson draws from the base pool plus its own", () => {
    const money = castFor(VARIANT_CONTENT, "money");
    expect(money.people).toEqual(expect.arrayContaining(VARIANT_CONTENT.base.people));
    expect(money.places).toEqual(expect.arrayContaining(["the lemonade stand"]));
    expect(money.places.length).toBeGreaterThan(VARIANT_CONTENT.base.places.length);
  });

  it("every theme produces a usable pool", () => {
    for (const t of VARIANT_THEMES) {
      const c: Record<string, string[]> = { ...castFor(VARIANT_CONTENT, t) };
      for (const [name, list] of Object.entries(c)) expect(list.length, `${t}.${name}`).toBeGreaterThan(0);
    }
  });
});

describe("a parent's edits to the pools", () => {
  it("keeps good edits", () => {
    const out = sanitize("variants", {
      base: { people: ["Ada", "Blaise"], creatures: ["moths"], places: ["the forge"], things: ["gears"] },
      byTheme: { money: { places: ["the tea cart"] } },
    });
    expect(out.base.people).toEqual(["Ada", "Blaise"]);
    expect(out.byTheme.money.places).toEqual(["the tea cart"]);
  });

  it("falls back to the defaults rather than leaving a pool a generator would break on", () => {
    const out = sanitize("variants", { base: { people: [], creatures: null, places: ["  "], things: 7 } });
    expect(out.base.people).toEqual(VARIANT_CONTENT.base.people);
    expect(out.base.creatures).toEqual(VARIANT_CONTENT.base.creatures);
    expect(out.base.places).toEqual(VARIANT_CONTENT.base.places);
    expect(out.base.things).toEqual(VARIANT_CONTENT.base.things);
  });

  it("drops junk, duplicates and overlong entries", () => {
    const out = sanitize("variants", {
      base: { people: ["Ada", "Ada", "", 42, null, "x".repeat(200)] },
    });
    expect(out.base.people).toEqual(["Ada", "x".repeat(60)]);
  });

  it("survives nonsense", () => {
    for (const junk of [null, undefined, 42, "x", [], { byTheme: 7 }]) {
      const out = sanitize("variants", junk);
      expect(out.base.people.length).toBeGreaterThan(0);
      for (const t of VARIANT_THEMES) expect(out.byTheme[t]).toBeDefined();
    }
  });

  it("every theme survives an edit that names only one of them", () => {
    const out = sanitize("variants", { byTheme: { science: { things: ["slides"] } } });
    expect(out.byTheme.science.things).toEqual(["slides"]);
    expect(castFor(out, "history").places.length).toBeGreaterThan(0);
  });
});
