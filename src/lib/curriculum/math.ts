// Small math helpers shared by question generators and answer checking.

export type Rng = () => number;

export function seededRng(seed: number): Rng {
  // mulberry32
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Inclusive random integer in [lo, hi]. */
export function int(r: Rng, lo: number, hi: number): number {
  return lo + Math.floor(r() * (hi - lo + 1));
}

export function pick<T>(r: Rng, items: readonly T[]): T {
  return items[Math.floor(r() * items.length)];
}

export function shuffle<T>(r: Rng, items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export interface Frac {
  n: number;
  d: number;
}

export function simplify(f: Frac): Frac {
  if (f.d === 0) throw new Error("zero denominator");
  const g = gcd(f.n, f.d) || 1;
  const sign = f.d < 0 ? -1 : 1;
  return { n: (sign * f.n) / g, d: (sign * f.d) / g };
}

export function fracToString(f: Frac): string {
  const s = simplify(f);
  return s.d === 1 ? String(s.n) : `${s.n}/${s.d}`;
}

/** Formats a decimal without floating-point noise (0.1 + 0.2 -> "0.3"). */
export function dec(x: number, maxPlaces = 6): string {
  const s = Number(x.toFixed(maxPlaces)).toString();
  return s === "-0" ? "0" : s;
}

export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
