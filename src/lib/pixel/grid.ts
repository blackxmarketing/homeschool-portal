/**
 * A tiny pixel-art toolkit. Sprites are drawn from simple shapes on a small
 * grid, then outlined automatically, so every hero, tree and castle in Lumina
 * shares one consistent look. Pure (no browser needed), so it can be tested
 * and drawn on a canvas or as SVG.
 */

export type Px = string | null;

export class Grid {
  readonly px: Px[];
  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.px = new Array(w * h).fill(null);
  }

  get(x: number, y: number): Px {
    return x < 0 || y < 0 || x >= this.w || y >= this.h ? null : this.px[y * this.w + x];
  }

  set(x: number, y: number, c: Px): this {
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.px[y * this.w + Math.floor(x)] = c;
    return this;
  }

  rect(x: number, y: number, w: number, h: number, c: Px): this {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, c);
    return this;
  }

  /** Filled circle (good for tree tops and bushes). */
  disc(cx: number, cy: number, r: number, c: Px): this {
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r + 0.25) this.set(x, y, c);
    return this;
  }

  /** Filled triangle with a flat base: apex at (cx, top), base from left to right at bottom. */
  tri(cx: number, top: number, bottom: number, halfBase: number, c: Px): this {
    const hgt = Math.max(1, bottom - top);
    for (let y = top; y <= bottom; y++) {
      const half = Math.round(((y - top) / hgt) * halfBase);
      for (let x = cx - half; x <= cx + half; x++) this.set(x, y, c);
    }
    return this;
  }

  /** Every empty pixel touching a filled one becomes the outline color. */
  outline(c: string): this {
    const add: [number, number][] = [];
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        if (this.get(x, y) !== null) continue;
        if (this.get(x - 1, y) || this.get(x + 1, y) || this.get(x, y - 1) || this.get(x, y + 1)) add.push([x, y]);
      }
    for (const [x, y] of add) this.set(x, y, c);
    return this;
  }

  /** Copies another grid on top (empty pixels don't overwrite). */
  draw(g: Grid, ox: number, oy: number): this {
    for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) {
      const c = g.get(x, y);
      if (c !== null) this.set(ox + x, oy + y, c);
    }
    return this;
  }

  flipX(): Grid {
    const g = new Grid(this.w, this.h);
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) g.set(this.w - 1 - x, y, this.get(x, y));
    return g;
  }

  /** Runs of same-colored pixels per row (for compact SVG). */
  runs(): { x: number; y: number; w: number; c: string }[] {
    const out: { x: number; y: number; w: number; c: string }[] = [];
    for (let y = 0; y < this.h; y++) {
      let x = 0;
      while (x < this.w) {
        const c = this.get(x, y);
        if (c === null) {
          x++;
          continue;
        }
        let w = 1;
        while (this.get(x + w, y) === c) w++;
        out.push({ x, y, w, c });
        x += w;
      }
    }
    return out;
  }
}

// ---------------- Color helpers ----------------

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}

/** Lighter (amt > 0) or darker (amt < 0) version of a color. */
export function shade(hex: string, amt: number): string {
  const [r, g, b] = hexToRgb(hex);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
}

/** Washes a color toward grey (for parts of the world that are still dark). */
export function dim(hex: string, amount = 0.75): string {
  const [r, g, b] = hexToRgb(hex);
  const grey = (r * 0.3 + g * 0.59 + b * 0.11) * 0.62 + 18;
  return rgbToHex(r + (grey - r) * amount, g + (grey - g) * amount, b + (grey - b) * amount + 6 * amount);
}

/** A repeatable pseudo-random number generator, so the world looks the same every visit. */
export function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

/** Smooth-ish value noise in [0, 1) for natural-looking coastlines. */
export function noise2(x: number, y: number, seed: number): number {
  const h = (i: number, j: number) => {
    let n = (i * 374761393 + j * 668265263 + seed * 1442695041) >>> 0;
    n = ((n ^ (n >>> 13)) * 1274126177) >>> 0;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  };
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const s = (t: number) => t * t * (3 - 2 * t);
  const a = h(xi, yi);
  const b = h(xi + 1, yi);
  const c = h(xi, yi + 1);
  const d = h(xi + 1, yi + 1);
  return a + (b - a) * s(xf) + (c - a) * s(yf) + (a - b - c + d) * s(xf) * s(yf);
}
