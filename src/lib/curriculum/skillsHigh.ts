import type { Skill } from "./skills";
import { dec, fmt, fracToString, gcd, int, pick, shuffle, simplify, type Rng } from "./math";

/**
 * High school math skills (grades 9-12): Algebra I, Geometry, Algebra II and
 * statistics. Same format as skills.ts: every skill has a generator, so
 * practice is unlimited and answers are checked by code.
 */

// ---------- formatting helpers ----------

/** "+ 5" or "− 5", for the second term of an expression. */
function sgn(n: number): string {
  return n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`;
}

/** A coefficient in front of a variable: 1 -> "", -1 -> "−", 3 -> "3". */
function coef(n: number): string {
  if (n === 1) return "";
  if (n === -1) return "−";
  return n < 0 ? `−${Math.abs(n)}` : String(n);
}

/** Writes a polynomial from its coefficients, highest power first: [2, -3, 5] -> "2x² − 3x + 5". */
function poly(cs: number[], v = "x"): string {
  const sup = ["", "", "²", "³", "⁴"];
  const deg = cs.length - 1;
  let out = "";
  cs.forEach((c, i) => {
    if (c === 0) return;
    const p = deg - i;
    const body = p === 0 ? String(Math.abs(c)) : `${Math.abs(c) === 1 ? "" : Math.abs(c)}${v}${sup[p]}`;
    if (!out) out = (c < 0 ? "−" : "") + body;
    else out += c < 0 ? ` − ${body}` : ` + ${body}`;
  });
  return out || "0";
}

/** A linear expression as a typed answer, e.g. "-2x + 5" (ASCII minus so it parses). */
function linAnswer(m: number, b: number): string {
  const xs = m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;
  if (m === 0) return String(b);
  if (b === 0) return xs;
  return `${xs} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
}

/** x minus or plus a number: "x − 3" or "x + 3". */
function xPlus(n: number, v = "x"): string {
  return n < 0 ? `${v} − ${-n}` : `${v} + ${n}`;
}

/** A number wrapped in parentheses if negative: (−3). */
function par(n: number): string {
  return n < 0 ? `(−${-n})` : String(n);
}

function nonZero(r: Rng, lo: number, hi: number): number {
  let n = int(r, lo, hi);
  while (n === 0) n = int(r, lo, hi);
  return n;
}

const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
function subscript(n: number): string {
  return String(n)
    .split("")
    .map((d) => SUB[d] ?? d)
    .join("");
}

const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [6, 8, 10],
  [9, 12, 15],
  [20, 21, 29],
];

const NAMES = ["Maya", "Leo", "Ava", "Eli", "Zoe", "Sam", "Nora", "Kai", "Ruby", "Finn"];

export const HIGH_SKILLS: Skill[] = [
  // ================= Grade 9: Algebra I =================
  {
    id: "g9.multi-step-equations",
    grade: 9,
    strand: "algebra",
    title: "Multi-step equations with parentheses",
    code: "A-REI.B.3",
    prereqs: ["g8.multi-step-equations"],
    generate: (r) => {
      const x = int(r, -9, 9);
      const a = int(r, 2, 6);
      const b = nonZero(r, -6, 6);
      if (r() < 0.5) {
        // a(x + b) = cx + e
        let c = int(r, 1, 9);
        if (c === a) c = a + 1;
        const e = a * (x + b) - c * x;
        return {
          visual: { type: "balance", left: `${a}(${xPlus(b)})`, right: `${coef(c)}x ${sgn(e)}` },
          prompt: `Solve for x:  ${a}(${xPlus(b)}) = ${coef(c)}x ${sgn(e)}`,
          kind: "number",
          answer: String(x),
          hint: "Distribute first to clear the parentheses. Then get the x terms on one side and the numbers on the other.",
          explanation: `${a}x ${sgn(a * b)} = ${coef(c)}x ${sgn(e)} → ${a}x − ${c}x = ${e} − ${par(a * b)} → ${a - c}x = ${e - a * b} → x = ${x}.`,
        };
      }
      // a(x + b) − c(x + d) = e
      let c = int(r, 2, 5);
      if (c === a) c = a + 1;
      const d = nonZero(r, -6, 6);
      const e = a * (x + b) - c * (x + d);
      return {
        prompt: `Solve for x:  ${a}(${xPlus(b)}) − ${c}(${xPlus(d)}) = ${e}`,
        kind: "number",
        answer: String(x),
        hint: "Distribute both numbers (watch the minus sign in front of the second one), combine like terms, then solve.",
        explanation: `${a}x ${sgn(a * b)} − ${c}x ${sgn(-c * d)} = ${e} → ${a - c}x ${sgn(a * b - c * d)} = ${e} → ${a - c}x = ${e - (a * b - c * d)} → x = ${x}.`,
      };
    },
  },
  {
    id: "g9.literal-equations",
    grade: 9,
    strand: "algebra",
    title: "Solve a formula for one variable",
    code: "A-CED.A.4",
    prereqs: ["g9.multi-step-equations"],
    generate: (r) => {
      const v = int(r, 0, 3);
      if (v === 0) {
        // ax + by = c  ->  y = mx + k
        const b = pick(r, [1, 2, 3, 4, -1, -2, -3]);
        const m = nonZero(r, -4, 4);
        const k = int(r, -6, 6);
        const a = -m * b;
        const c = k * b;
        const left = `${coef(a)}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y`;
        return {
          prompt: `Solve for y:  ${left} = ${c}.  Write it as y = mx + b. Type the right side, like 3x − 2.`,
          kind: "expr",
          answer: linAnswer(m, k),
          hint: "Move the x term to the other side, then divide every term by the number in front of y.",
          explanation: `${coef(b)}y = ${coef(-a)}x ${sgn(c)}. Divide everything by ${b}: y = ${linAnswer(m, k).replace(/-/g, "−")}.`,
        };
      }
      if (v === 1) {
        const l = int(r, 5, 30);
        const w = int(r, 2, 25);
        const P = 2 * l + 2 * w;
        return {
          visual: { type: "shape", shape: "rectangle", base: "l", height: "w" },
          prompt: `The perimeter of a rectangle is P = 2l + 2w. Solve the formula for w, then find w when P = ${P} and l = ${l}.`,
          kind: "number",
          answer: String(w),
          hint: "Subtract 2l from both sides, then divide by 2: w = (P − 2l) ÷ 2.",
          explanation: `w = (P − 2l) ÷ 2 = (${P} − ${2 * l}) ÷ 2 = ${P - 2 * l} ÷ 2 = ${w}.`,
        };
      }
      if (v === 2) {
        const rate = int(r, 3, 12) * 5;
        const t = int(r, 2, 9);
        const d = rate * t;
        const name = pick(r, NAMES);
        return {
          prompt: `Distance = rate × time, or d = rt. Solve for t. Then: ${name} drives ${d} miles at ${rate} miles per hour. How many hours does it take?`,
          kind: "number",
          answer: String(t),
          hint: "Divide both sides of d = rt by r to get t by itself.",
          explanation: `t = d ÷ r = ${d} ÷ ${rate} = ${t} hours.`,
        };
      }
      const base = int(r, 2, 15);
      const h = int(r, 2, 20);
      const A = (base * h) / 2;
      return {
        visual: { type: "shape", shape: "triangle", base: `${base}`, height: "h" },
        prompt: `The area of a triangle is A = ½bh. Solve for h, then find h when A = ${dec(A)} and b = ${base}.`,
        kind: "number",
        answer: String(h),
        hint: "Multiply both sides by 2, then divide by b: h = 2A ÷ b.",
        explanation: `h = 2A ÷ b = ${dec(2 * A)} ÷ ${base} = ${h}.`,
      };
    },
  },
  {
    id: "g9.linear-inequalities",
    grade: 9,
    strand: "algebra",
    title: "Solve linear inequalities",
    code: "A-REI.B.3",
    prereqs: ["g9.multi-step-equations"],
    generate: (r) => {
      const k = int(r, -8, 8);
      const a = pick(r, [2, 3, 4, 5, 6, -2, -3, -4, -5]);
      const b = int(r, -10, 10);
      const c = a * k + b;
      const strict = r() < 0.5;
      // Decide the final direction (x > k or x < k), then write the original
      // inequality so dividing by a negative flips it.
      const up = r() < 0.5;
      const flips = a < 0;
      const origUp = flips ? !up : up;
      const op = origUp ? (strict ? ">" : "≥") : strict ? "<" : "≤";
      const finalOp = up ? (strict ? ">" : "≥") : strict ? "<" : "≤";
      const ans = up ? (strict ? k + 1 : k) : strict ? k - 1 : k;
      const lhs = `${coef(a)}x ${b === 0 ? "" : sgn(b)}`.trim();
      return {
        prompt: `Solve:  ${lhs} ${op} ${c}.  Then type the ${up ? "smallest" : "largest"} integer that makes it true.`,
        kind: "number",
        answer: String(ans),
        hint: "Solve it like an equation. If you multiply or divide both sides by a negative number, flip the inequality sign. Then check whether the boundary itself counts.",
        explanation:
          `${coef(a)}x ${op} ${c} ${b < 0 ? "+" : "−"} ${Math.abs(b)} = ${c - b}. Divide by ${a}` +
          `${flips ? " (negative, so flip the sign)" : ""}: x ${finalOp} ${k}. ` +
          `The ${up ? "smallest" : "largest"} integer is ${ans}${strict ? ` (${k} itself does not count)` : ""}.`,
      };
    },
  },
  {
    id: "g9.slope-intercept",
    grade: 9,
    strand: "algebra",
    title: "Write a line in slope-intercept form",
    code: "A-CED.A.2",
    prereqs: ["g8.slope", "g8.multi-step-equations"],
    generate: (r) => {
      const m = nonZero(r, -4, 4);
      const b = int(r, -6, 6);
      const x1 = int(r, -4, 3);
      const y1 = m * x1 + b;
      if (r() < 0.5) {
        const x2 = x1 + int(r, 1, 3);
        const y2 = m * x2 + b;
        return {
          visual: { type: "coord", points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], line: true },
          prompt: `Write the equation of the line through (${x1}, ${y1}) and (${x2}, ${y2}) as y = mx + b. Type the right side, like 2x + 1.`,
          kind: "expr",
          answer: linAnswer(m, b),
          hint: "Find the slope m = (y₂ − y₁) / (x₂ − x₁) first. Then put one point into y = mx + b and solve for b.",
          explanation: `m = (${y2} − ${par(y1)}) / (${x2} − ${par(x1)}) = ${y2 - y1}/${x2 - x1} = ${m}. Then ${y1} = ${m}(${x1}) + b, so b = ${b}. y = ${linAnswer(m, b).replace(/-/g, "−")}.`,
        };
      }
      return {
        visual: { type: "coord", points: [{ x: x1, y: y1, label: "P" }] },
        prompt: `A line has slope ${m} and passes through (${x1}, ${y1}). Write it as y = mx + b. Type the right side, like 2x + 1.`,
        kind: "expr",
        answer: linAnswer(m, b),
        hint: "Put the slope and the point's x and y into y = mx + b, then solve for b.",
        explanation: `${y1} = ${m} × ${par(x1)} + b → ${y1} = ${m * x1} + b → b = ${b}. y = ${linAnswer(m, b).replace(/-/g, "−")}.`,
      };
    },
  },
  {
    id: "g9.systems",
    grade: 9,
    strand: "algebra",
    title: "Systems of two linear equations",
    code: "A-REI.C.6",
    prereqs: ["g9.slope-intercept"],
    generate: (r) => {
      const x = int(r, -6, 6);
      const y = int(r, -6, 6);
      const ans = `(${x}, ${y})`;
      const hint = "Use substitution or elimination to get an equation with only one variable. Solve it, then use it to find the other variable.";
      if (r() < 0.4) {
        // y = mx + k ; ax + by = c
        const m = nonZero(r, -3, 3);
        const k = y - m * x;
        let a = nonZero(r, -4, 4);
        const b = nonZero(r, -3, 3);
        if (a + b * m === 0) a += a > 0 ? 1 : -1;
        const c = a * x + b * y;
        return {
          prompt: `Solve the system:  y = ${coef(m)}x ${sgn(k)}  and  ${coef(a)}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y = ${c}.  Type the answer as (x, y).`,
          kind: "pair",
          answer: ans,
          hint,
          explanation: `Substitute: ${a}x + ${par(b)}(${m}x ${sgn(k)}) = ${c} → ${a + b * m}x ${sgn(b * k)} = ${c} → x = ${x}. Then y = ${m}(${par(x)}) ${sgn(k)} = ${y}. Solution ${ans}.`,
        };
      }
      let a1 = nonZero(r, -5, 5);
      const b1 = nonZero(r, -5, 5);
      const a2 = nonZero(r, -5, 5);
      let b2 = nonZero(r, -5, 5);
      if (a1 * b2 - a2 * b1 === 0) b2 = b2 === 5 ? -5 : b2 + 1;
      if (a1 * b2 - a2 * b1 === 0) a1 = a1 === 5 ? 4 : a1 + 1;
      if (b2 === 0) b2 = 2;
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x + b2 * y;
      const eq = (a: number, b: number, c: number) => `${coef(a)}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y = ${c}`;
      return {
        prompt: `Solve the system:  ${eq(a1, b1, c1)}  and  ${eq(a2, b2, c2)}.  Type the answer as (x, y).`,
        kind: "pair",
        answer: ans,
        hint,
        explanation: `Eliminate y: multiply the first equation by ${par(b2)} and the second by ${par(b1)}, then subtract: ${a1 * b2 - a2 * b1}x = ${c1 * b2 - c2 * b1}, so x = ${x}. Put x back in: ${a1}(${par(x)}) + ${par(b1)}y = ${c1}, so y = ${y}. Solution ${ans}.`,
      };
    },
  },
  {
    id: "g9.exponents-negative",
    grade: 9,
    strand: "algebra",
    title: "Zero and negative exponents",
    code: "N-RN.A.2",
    prereqs: ["g8.exponent-rules"],
    generate: (r) => {
      const v = int(r, 0, 3);
      if (v === 0) {
        const base = int(r, 2, 5);
        const n = base <= 3 ? int(r, 1, 4) : int(r, 1, 2);
        const p = base ** n;
        return {
          visual: { type: "power", base, exp: -n },
          prompt: `Write ${base}^−${n} as a fraction.`,
          kind: "fraction",
          answer: `1/${p}`,
          hint: "A negative exponent means \"one over\" the same power with a positive exponent.",
          explanation: `${base}^−${n} = 1 / ${base}^${n} = 1/${p}.`,
        };
      }
      if (v === 1) {
        const a = int(r, 2, 5);
        let b = int(r, 2, 5);
        if (gcd(a, b) !== 1 || a === b) b = a + 1;
        return {
          prompt: `Write (${a}/${b})^−2 as a fraction.`,
          kind: "fraction",
          answer: fracToString({ n: b * b, d: a * a }),
          hint: "A negative exponent flips the fraction. Then square the top and the bottom.",
          explanation: `(${a}/${b})^−2 = (${b}/${a})^2 = ${b * b}/${a * a}.`,
        };
      }
      if (v === 2) {
        const base = int(r, 2, 12);
        const coefN = int(r, 2, 9);
        return {
          prompt: `What is ${coefN} × ${base}^0?`,
          kind: "number",
          answer: String(coefN),
          hint: "Any nonzero number to the zero power is 1.",
          explanation: `${base}^0 = 1, so ${coefN} × 1 = ${coefN}.`,
        };
      }
      const a = int(r, 2, 9);
      const b = int(r, 2, 9);
      const c = int(r, 2, 9);
      const e = a - b - c;
      return {
        prompt: `Simplify  x^${a} · x^−${b} ÷ x^${c}  to a single power x^?. What is the exponent?`,
        kind: "number",
        answer: String(e),
        hint: "Multiplying adds exponents, dividing subtracts them. Keep careful track of the negative signs.",
        explanation: `${a} + (−${b}) − ${c} = ${e}, so it is x^${e}.`,
      };
    },
  },
  {
    id: "g9.polynomials",
    grade: 9,
    strand: "algebra",
    title: "Add, subtract and multiply polynomials",
    code: "A-APR.A.1",
    prereqs: ["g9.multi-step-equations", "g8.exponent-rules"],
    generate: (r) => {
      const v = int(r, 0, 3);
      if (v === 0) {
        // x² cancels -> linear answer
        const a = int(r, 1, 6);
        const b1 = int(r, -9, 9);
        const c1 = int(r, -9, 9);
        const b2 = int(r, -9, 9);
        const c2 = int(r, -9, 9);
        const m = b1 - b2;
        const k = c1 - c2;
        return {
          prompt: `Simplify:  (${poly([a, b1, c1])}) − (${poly([a, b2, c2])}).  Type it like 3x − 4.`,
          kind: "expr",
          answer: linAnswer(m, k),
          hint: "Subtracting means changing the sign of every term in the second polynomial. Then combine like terms.",
          explanation: `(${a}x² − ${a}x²) + (${b1} − ${par(b2)})x + (${c1} − ${par(c2)}) = ${poly([m, k])}.`,
        };
      }
      if (v === 1) {
        const p = nonZero(r, -5, 5);
        const d = nonZero(r, -6, 6);
        // a(x + d) ± |p|(cx + e)
        const a = int(r, 2, 6);
        const c = int(r, 2, 4);
        const e = nonZero(r, -6, 6);
        return {
          prompt: `Simplify:  ${a}(${xPlus(d)}) ${p < 0 ? "−" : "+"} ${Math.abs(p)}(${c}x ${sgn(e)}).  Type it like 3x − 4.`,
          kind: "expr",
          answer: linAnswer(a + p * c, a * d + p * e),
          hint: "Distribute each number across its parentheses, then combine the x terms and the plain numbers.",
          explanation: `${a}x ${sgn(a * d)} ${sgn(p * c)}x ${sgn(p * e)} = ${poly([a + p * c, a * d + p * e])}.`,
        };
      }
      if (v === 2) {
        const a = int(r, 1, 3);
        const p = nonZero(r, -7, 7);
        const c = int(r, 1, 3);
        const q = nonZero(r, -7, 7);
        const A = a * c;
        const B = a * q + p * c;
        const C = p * q;
        return {
          prompt: `Multiply:  (${coef(a)}x ${sgn(p)})(${coef(c)}x ${sgn(q)}) = ?x² + ?x + ?.  What number goes in front of x (the middle term)?`,
          kind: "number",
          answer: String(B),
          hint: "Use FOIL: First, Outer, Inner, Last. The middle term comes from adding the Outer and Inner products.",
          explanation: `First: ${poly([A, 0, 0])}. Outer: ${a * q}x. Inner: ${p * c}x. Last: ${C}. Outer + Inner = ${B}x, so the product is ${poly([A, B, C])}.`,
        };
      }
      const p = nonZero(r, -9, 9);
      const q = nonZero(r, -9, 9);
      return {
        prompt: `Multiply:  (${xPlus(p)})(${xPlus(q)}) = x² + ?x + ?.  What is the constant term (the plain number at the end)?`,
        kind: "number",
        answer: String(p * q),
        hint: "Use FOIL. The constant term comes from multiplying the two Last terms.",
        explanation: `Last × Last = ${par(p)} × ${par(q)} = ${p * q}. The full product is ${poly([1, p + q, p * q])}.`,
      };
    },
  },
  {
    id: "g9.factoring",
    grade: 9,
    strand: "algebra",
    title: "Factor quadratic expressions",
    code: "A-SSE.A.2",
    prereqs: ["g9.polynomials"],
    generate: (r) => {
      const v = int(r, 0, 2);
      if (v === 0) {
        const p = nonZero(r, -9, 9);
        let q = nonZero(r, -9, 9);
        if (q === -p) q = q + (q > 0 ? 1 : -1) || 2;
        return {
          prompt: `${poly([1, p + q, p * q])} factors as (x + p)(x + q). One of the two numbers is ${p}. What is the other?`,
          kind: "number",
          answer: String(q),
          hint: "Look for two numbers that multiply to the constant term and add to the x coefficient.",
          explanation: `${par(p)} × ${par(q)} = ${p * q} and ${par(p)} + ${par(q)} = ${p + q}, so it is (${xPlus(p)})(${xPlus(q)}).`,
        };
      }
      if (v === 1) {
        const n = int(r, 2, 12);
        return {
          prompt: `Factor the difference of squares:  x² − ${n * n} = (x + a)(x − a).  What is a?`,
          kind: "number",
          answer: String(n),
          hint: "x² − a² = (x + a)(x − a). Which number squared gives the constant?",
          explanation: `${n * n} = ${n}², so x² − ${n * n} = (x + ${n})(x − ${n}).`,
        };
      }
      const g = int(r, 2, 6);
      const k = nonZero(r, -9, 9);
      return {
        prompt: `Factor out the greatest common factor:  ${poly([g, g * k, 0])} = ${g}x(x + ?).  What number goes in the blank?`,
        kind: "number",
        answer: String(k),
        hint: "Divide each term by the common factor that is pulled out in front.",
        explanation: `${g * k}x ÷ ${g}x = ${k}, so ${poly([g, g * k, 0])} = ${g}x(${xPlus(k)}).`,
      };
    },
  },
  {
    id: "g9.quadratics-factoring",
    grade: 9,
    strand: "algebra",
    title: "Solve quadratic equations by factoring",
    code: "A-REI.B.4",
    prereqs: ["g9.factoring"],
    generate: (r) => {
      const r1 = int(r, -9, 9);
      let r2 = int(r, -9, 9);
      if (r2 === r1) r2 = r1 === 9 ? -9 : r1 + 1;
      const [lo, hi] = r1 < r2 ? [r1, r2] : [r2, r1];
      const a = r() < 0.25 ? 2 : 1;
      const cs = [a, -a * (r1 + r2), a * r1 * r2];
      return {
        prompt: `Solve  ${poly(cs)} = 0.  Type both solutions as (smaller, larger).`,
        kind: "pair",
        answer: `(${lo}, ${hi})`,
        hint: `${a === 2 ? "Divide every term by 2 first. " : ""}Factor into (x − p)(x − q) = 0. A product is zero only when one of the factors is zero.`,
        explanation: `${a === 2 ? `Divide by 2: ${poly([1, -(r1 + r2), r1 * r2])} = 0. ` : ""}Factor: (${xPlus(-lo)})(${xPlus(-hi)}) = 0, so x = ${lo} or x = ${hi}.`,
      };
    },
  },
  {
    id: "g9.arithmetic-sequences",
    grade: 9,
    strand: "algebra",
    title: "Arithmetic sequences",
    code: "F-BF.A.2",
    prereqs: ["g8.multi-step-equations"],
    generate: (r) => {
      const a1 = int(r, -10, 20);
      const d = nonZero(r, -7, 9);
      const seq = [0, 1, 2, 3].map((i) => a1 + i * d).join(", ");
      const v = int(r, 0, 2);
      if (v === 0) {
        const n = int(r, 10, 50);
        const an = a1 + (n - 1) * d;
        return {
          prompt: `The sequence ${seq}, … keeps adding the same amount. What is term number ${n}?`,
          kind: "number",
          answer: String(an),
          hint: "Find the common difference d. Then term n = first term + (n − 1) × d.",
          explanation: `d = ${d}. Term ${n} = ${a1} + (${n} − 1) × ${par(d)} = ${a1} + ${(n - 1) * d} = ${an}.`,
        };
      }
      if (v === 1) {
        const n = int(r, 8, 40);
        const an = a1 + (n - 1) * d;
        return {
          prompt: `In the sequence ${seq}, …, which term number has the value ${an}?`,
          kind: "number",
          answer: String(n),
          hint: "Set first term + (n − 1) × d equal to the value and solve for n.",
          explanation: `${a1} + (n − 1) × ${par(d)} = ${an} → (n − 1) × ${par(d)} = ${an - a1} → n − 1 = ${n - 1} → n = ${n}.`,
        };
      }
      const n = int(r, 5, 12);
      const an = a1 + (n - 1) * d;
      return {
        prompt: `An arithmetic sequence starts at ${a1}, and term ${n} is ${an}. What is the common difference?`,
        kind: "number",
        answer: String(d),
        hint: "Between term 1 and term n there are n − 1 equal steps. Divide the total change by the number of steps.",
        explanation: `(${an} − ${par(a1)}) ÷ (${n} − 1) = ${an - a1} ÷ ${n - 1} = ${d}.`,
      };
    },
  },

  // ================= Grade 10: Geometry =================
  {
    id: "g10.pythagorean-apps",
    grade: 10,
    strand: "geometry",
    title: "Pythagorean theorem word problems",
    code: "G-SRT.C.8",
    prereqs: ["g8.pythagorean"],
    generate: (r) => {
      const [a0, b0, c0] = pick(r, TRIPLES.slice(0, 4));
      const k = a0 === 3 ? int(r, 1, 5) : pick(r, [1, 2]);
      const [a, b, c] = [a0 * k, b0 * k, c0 * k];
      const name = pick(r, NAMES);
      const v = int(r, 0, 3);
      if (v === 0) {
        return {
          visual: { type: "right-triangle", a: "?", b: `${a} ft`, c: `${c} ft` },
          prompt: `A ${c}-foot ladder leans against a wall. Its foot is ${a} feet from the wall. How high up the wall does the ladder reach, in feet?`,
          kind: "number",
          answer: String(b),
          hint: "The ladder is the hypotenuse. Height² = ladder² − distance².",
          explanation: `${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}, and √${b * b} = ${b} feet.`,
        };
      }
      if (v === 1) {
        return {
          visual: { type: "right-triangle", a: `${a} mi`, b: `${b} mi`, c: "?" },
          prompt: `${name} bikes ${a} miles north, then ${b} miles east. How far is ${name} from the start in a straight line, in miles?`,
          kind: "number",
          answer: String(c),
          hint: "The two legs of the trip meet at a right angle. Use a² + b² = c².",
          explanation: `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, and √${c * c} = ${c} miles.`,
        };
      }
      if (v === 2) {
        return {
          visual: { type: "right-triangle", a: `${a} m`, b: `${b} m`, c: "?" },
          prompt: `A rectangular park is ${b} m long and ${a} m wide. How long is a path straight across it from corner to corner, in meters?`,
          kind: "number",
          answer: String(c),
          hint: "The diagonal splits the rectangle into two right triangles. The diagonal is the hypotenuse.",
          explanation: `√(${b}² + ${a}²) = √(${b * b} + ${a * a}) = √${c * c} = ${c} m.`,
        };
      }
      return {
        visual: { type: "right-triangle", a: "?", b: `${a} in`, c: `${c} in` },
        prompt: `A screen's diagonal is ${c} inches and its width is ${a} inches. What is its height in inches?`,
        kind: "number",
        answer: String(b),
        hint: "The diagonal is the hypotenuse. Subtract the square of the width from the square of the diagonal.",
        explanation: `${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}, and √${b * b} = ${b} inches.`,
      };
    },
  },
  {
    id: "g10.distance-midpoint",
    grade: 10,
    strand: "geometry",
    title: "Distance and midpoint on the coordinate plane",
    code: "G-GPE.B.7",
    prereqs: ["g8.pythagorean", "g8.slope"],
    generate: (r) => {
      const v = int(r, 0, 2);
      const x1 = int(r, -6, 6);
      const y1 = int(r, -6, 6);
      if (v === 0) {
        const [a, b, c] = pick(r, [
          [3, 4, 5],
          [6, 8, 10],
          [5, 12, 13],
          [8, 6, 10],
          [4, 3, 5],
        ]);
        const x2 = x1 + (r() < 0.5 ? a : -a);
        const y2 = y1 + (r() < 0.5 ? b : -b);
        return {
          visual: { type: "coord", points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], line: true },
          prompt: `What is the distance between A(${x1}, ${y1}) and B(${x2}, ${y2})?`,
          kind: "number",
          answer: String(c),
          hint: "Distance = √((x₂ − x₁)² + (y₂ − y₁)²). It is the Pythagorean theorem on the grid.",
          explanation: `Change in x = ${x2 - x1}, change in y = ${y2 - y1}. √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}) = √${c * c} = ${c}.`,
        };
      }
      const dx = 2 * int(r, -5, 5);
      const dy = 2 * int(r, -5, 5);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      const mx = x1 + dx / 2;
      const my = y1 + dy / 2;
      if (v === 1) {
        return {
          visual: { type: "coord", points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], line: true },
          prompt: `What is the midpoint of A(${x1}, ${y1}) and B(${x2}, ${y2})? Type it as (x, y).`,
          kind: "pair",
          answer: `(${mx}, ${my})`,
          hint: "Average the x-coordinates, then average the y-coordinates.",
          explanation: `x: (${x1} + ${par(x2)}) ÷ 2 = ${mx}. y: (${y1} + ${par(y2)}) ÷ 2 = ${my}. Midpoint (${mx}, ${my}).`,
        };
      }
      return {
        visual: { type: "coord", points: [{ x: x1, y: y1, label: "A" }, { x: mx, y: my, label: "M" }] },
        prompt: `M(${mx}, ${my}) is the midpoint of segment AB, and A is (${x1}, ${y1}). What are the coordinates of B? Type them as (x, y).`,
        kind: "pair",
        answer: `(${x2}, ${y2})`,
        hint: "B is as far past M as M is past A. Add the step from A to M again.",
        explanation: `From A to M, x changes by ${mx - x1} and y by ${my - y1}. Do it again from M: (${mx} + ${par(mx - x1)}, ${my} + ${par(my - y1)}) = (${x2}, ${y2}).`,
      };
    },
  },
  {
    id: "g10.similar-triangles",
    grade: 10,
    strand: "geometry",
    title: "Similar triangles and scale factor",
    code: "G-SRT.B.5",
    prereqs: ["g7.proportions"],
    generate: (r) => {
      if (r() < 0.6) {
        const s1 = int(r, 2, 12);
        const s2 = int(r, 2, 12);
        const [kn, kd] = pick(r, [
          [2, 1],
          [3, 1],
          [4, 1],
          [3, 2],
          [5, 2],
        ]);
        // Make both small sides divisible by kd so the big sides are whole numbers.
        const a = s1 * kd;
        const b = s2 * kd;
        const A = (a * kn) / kd;
        const B = (b * kn) / kd;
        return {
          prompt: `Triangle ABC is similar to triangle DEF. AB = ${a} and BC = ${b}. The matching side DE = ${A}. How long is EF?`,
          kind: "number",
          answer: String(B),
          hint: "Matching sides of similar triangles are in the same ratio. Find the scale factor from AB to DE, then use it on BC.",
          explanation: `Scale factor = ${A} ÷ ${a} = ${fracToString({ n: kn, d: kd })}. EF = ${b} × ${fracToString({ n: kn, d: kd })} = ${B}.`,
        };
      }
      const name = pick(r, NAMES);
      const h = int(r, 5, 6);
      const s = pick(r, [2, 3, 4, 5, 6, 8, 10, 12]);
      const mult = int(r, 3, 8);
      const S = s * mult;
      const H = h * mult;
      return {
        prompt: `${name} is ${h} feet tall and casts a ${s}-foot shadow. At the same time, a tree casts a ${S}-foot shadow. How tall is the tree, in feet?`,
        kind: "number",
        answer: String(H),
        hint: "The sun makes similar triangles. Height ÷ shadow is the same for the person and the tree.",
        explanation: `${h}/${s} = H/${S}, so H = ${h} × ${S} ÷ ${s} = ${H} feet.`,
      };
    },
  },
  {
    id: "g10.trig-ratios",
    grade: 10,
    strand: "geometry",
    title: "Sine, cosine and tangent",
    code: "G-SRT.C.6",
    prereqs: ["g8.pythagorean", "g10.similar-triangles"],
    generate: (r) => {
      const v = int(r, 0, 2);
      if (v === 0) {
        const [a, b, c] = pick(r, TRIPLES);
        const fn = pick(r, ["sin", "cos", "tan"] as const);
        const f = fn === "sin" ? { n: a, d: c } : fn === "cos" ? { n: b, d: c } : { n: a, d: b };
        const word = fn === "sin" ? "opposite ÷ hypotenuse" : fn === "cos" ? "adjacent ÷ hypotenuse" : "opposite ÷ adjacent";
        return {
          visual: { type: "right-triangle", a: String(a), b: String(b), c: String(c) },
          prompt: `In the right triangle, the vertical leg is ${a}, the bottom leg is ${b} and the hypotenuse is ${c}. Let θ be the angle at the bottom-right corner. What is ${fn} θ as a fraction?`,
          kind: "fraction",
          answer: fracToString(f),
          hint: "SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. The side across from θ is opposite.",
          explanation: `The side opposite θ is ${a}, adjacent is ${b}, hypotenuse is ${c}. ${fn} θ = ${word} = ${fracToString(f)}.`,
        };
      }
      if (v === 1) {
        const k = int(r, 2, 15);
        const hyp = 2 * k;
        return {
          visual: { type: "right-triangle", a: "?", b: "", c: String(hyp) },
          prompt: `A right triangle has a hypotenuse of ${hyp} and a 30° angle. The side opposite the 30° angle is x. Using sin 30° = 1/2, find x.`,
          kind: "number",
          answer: String(k),
          hint: "sin = opposite ÷ hypotenuse. Multiply the hypotenuse by sin 30°.",
          explanation: `x = ${hyp} × sin 30° = ${hyp} × 1/2 = ${k}.`,
        };
      }
      const [ang, fn, val] = pick(r, [
        [35, "sin", 0.5736],
        [40, "tan", 0.8391],
        [50, "cos", 0.6428],
        [25, "sin", 0.4226],
        [60, "tan", 1.7321],
        [20, "cos", 0.9397],
      ] as const);
      const side = int(r, 5, 30);
      const x = side * val;
      const ans = Math.round(x * 10) / 10;
      const known = fn === "tan" ? "adjacent leg" : "hypotenuse";
      const want = fn === "cos" ? "adjacent leg" : "opposite leg";
      return {
        prompt: `In a right triangle, one angle is ${ang}°. The ${known} is ${side}. Using ${fn} ${ang}° ≈ ${val}, how long is the ${want}? (Opposite and adjacent are measured from the ${ang}° angle.) Round to the nearest tenth.`,
        kind: "number",
        answer: dec(ans),
        tolerance: 0.051,
        hint: `Write ${fn} ${ang}° = ${fn === "sin" ? "opposite/hypotenuse" : fn === "cos" ? "adjacent/hypotenuse" : "opposite/adjacent"}, then multiply both sides by the side you know.`,
        explanation: `${want} = ${side} × ${val} = ${dec(x, 4)} ≈ ${dec(ans)}.`,
      };
    },
  },
  {
    id: "g10.circles",
    grade: 10,
    strand: "geometry",
    title: "Circle area, circumference and arcs",
    code: "G-C.B.5",
    prereqs: ["g7.circles"],
    generate: (r) => {
      const v = int(r, 0, 3);
      const rad = int(r, 2, 15);
      if (v === 0) {
        const useD = r() < 0.5;
        return {
          visual: { type: "circle", radius: useD ? "?" : `${rad}` },
          prompt: `A circle has a ${useD ? `diameter of ${2 * rad}` : `radius of ${rad}`}. Its area is ?π. Type the number that goes in front of π.`,
          kind: "number",
          answer: String(rad * rad),
          hint: `Area = πr².${useD ? " The radius is half the diameter." : ""}`,
          explanation: `${useD ? `r = ${2 * rad} ÷ 2 = ${rad}. ` : ""}Area = π × ${rad}² = ${rad * rad}π.`,
        };
      }
      if (v === 1) {
        return {
          visual: { type: "circle", radius: "?" },
          prompt: `A circle has an area of ${rad * rad}π square units. What is its radius?`,
          kind: "number",
          answer: String(rad),
          hint: "Area = πr². Divide out the π, then take the square root.",
          explanation: `πr² = ${rad * rad}π → r² = ${rad * rad} → r = ${rad}.`,
        };
      }
      if (v === 2) {
        return {
          visual: { type: "circle", radius: "?" },
          prompt: `A circle has a circumference of ${2 * rad}π. What is its radius?`,
          kind: "number",
          answer: String(rad),
          hint: "Circumference = 2πr. Divide by 2π.",
          explanation: `2πr = ${2 * rad}π → r = ${2 * rad} ÷ 2 = ${rad}.`,
        };
      }
      const ang = pick(r, [30, 45, 60, 90, 120, 180, 270]);
      const arc = simplify({ n: ang * 2 * rad, d: 360 });
      return {
        visual: { type: "circle", radius: `${rad}` },
        prompt: `A circle has radius ${rad}. A central angle of ${ang}° cuts off an arc. The arc length is ?π. Type the number in front of π (a fraction is fine).`,
        kind: "fraction",
        answer: fracToString(arc),
        hint: "Arc length = (angle ÷ 360) × 2πr. The arc is that fraction of the whole circumference.",
        explanation: `(${ang}/360) × 2π × ${rad} = (${ang}/360) × ${2 * rad}π = ${fracToString(arc)}π.`,
      };
    },
  },
  {
    id: "g10.volume",
    grade: 10,
    strand: "geometry",
    title: "Volume of prisms, cylinders, cones and spheres",
    code: "G-GMD.A.3",
    prereqs: ["g10.circles"],
    generate: (r) => {
      const v = int(r, 0, 4);
      if (v === 0) {
        const l = int(r, 2, 15);
        const w = int(r, 2, 12);
        const h = int(r, 2, 10);
        return {
          prompt: `A box (rectangular prism) is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume in cubic cm?`,
          kind: "number",
          answer: String(l * w * h),
          hint: "Volume of a prism = area of the base × height.",
          explanation: `${l} × ${w} × ${h} = ${l * w * h} cubic cm.`,
        };
      }
      if (v === 1) {
        const rad = int(r, 1, 10);
        const h = int(r, 2, 12);
        return {
          visual: { type: "circle", radius: `${rad}` },
          prompt: `A cylinder has radius ${rad} and height ${h}. Its volume is ?π. Type the number in front of π.`,
          kind: "number",
          answer: String(rad * rad * h),
          hint: "Volume of a cylinder = πr²h: the circle's area times the height.",
          explanation: `π × ${rad}² × ${h} = π × ${rad * rad} × ${h} = ${rad * rad * h}π.`,
        };
      }
      if (v === 2) {
        const rad = int(r, 1, 10);
        const h = 3 * int(r, 1, 6);
        return {
          visual: { type: "circle", radius: `${rad}` },
          prompt: `A cone has radius ${rad} and height ${h}. Its volume is ?π. Type the number in front of π.`,
          kind: "number",
          answer: String((rad * rad * h) / 3),
          hint: "A cone holds one third of a cylinder with the same base and height: V = ⅓πr²h.",
          explanation: `⅓ × π × ${rad}² × ${h} = ⅓ × ${rad * rad * h}π = ${(rad * rad * h) / 3}π.`,
        };
      }
      if (v === 3) {
        const rad = 3 * int(r, 1, 4);
        const V = (4 * rad ** 3) / 3;
        return {
          visual: { type: "circle", radius: `${rad}` },
          prompt: `A sphere has radius ${rad}. Its volume is ?π. Type the number in front of π.`,
          kind: "number",
          answer: String(V),
          hint: "Volume of a sphere = (4/3)πr³. Cube the radius first.",
          explanation: `(4/3) × π × ${rad}³ = (4/3) × ${rad ** 3}π = ${V}π.`,
        };
      }
      const s = int(r, 2, 12);
      const h = 3 * int(r, 1, 6);
      return {
        prompt: `A pyramid has a square base ${s} m on each side and a height of ${h} m. What is its volume in cubic meters?`,
        kind: "number",
        answer: String((s * s * h) / 3),
        hint: "A pyramid holds one third of a prism with the same base and height: V = ⅓ × base area × height.",
        explanation: `Base area = ${s} × ${s} = ${s * s}. V = ⅓ × ${s * s} × ${h} = ${(s * s * h) / 3} cubic meters.`,
      };
    },
  },
  {
    id: "g10.angles",
    grade: 10,
    strand: "geometry",
    title: "Angle relationships and proofs",
    code: "G-CO.C.9",
    prereqs: ["g4.angles", "g7.two-step-equations"],
    generate: (r) => {
      const v = int(r, 0, 4);
      if (v === 0) {
        // Vertical angles with algebra
        const x = int(r, 5, 25);
        const a = int(r, 2, 6);
        let c = int(r, 2, 6);
        if (c === a) c = a + 1;
        const angle = int(r, 40, 140);
        const b = angle - a * x;
        const d = angle - c * x;
        return {
          prompt: `Two vertical angles measure (${a}x ${sgn(b)})° and (${c}x ${sgn(d)})°. What is x?`,
          kind: "number",
          answer: String(x),
          hint: "Vertical angles are equal. Set the two expressions equal and solve.",
          explanation: `${a}x ${sgn(b)} = ${c}x ${sgn(d)} → ${a - c}x = ${d - b} → x = ${x}. (Each angle is ${angle}°.)`,
        };
      }
      if (v === 1) {
        const a = int(r, 25, 85);
        const b = int(r, 25, 150 - a);
        return {
          prompt: `Two angles of a triangle measure ${a}° and ${b}°. What is the third angle, in degrees?`,
          kind: "number",
          answer: String(180 - a - b),
          hint: "The three angles of any triangle add up to 180°.",
          explanation: `180 − ${a} − ${b} = ${180 - a - b}°.`,
        };
      }
      if (v === 2) {
        const a = int(r, 25, 80);
        const b = int(r, 25, 80);
        return {
          prompt: `Two angles of a triangle are ${a}° and ${b}°. What is the exterior angle at the third corner, in degrees?`,
          kind: "number",
          answer: String(a + b),
          hint: "An exterior angle equals the sum of the two interior angles that are not next to it.",
          explanation: `Exterior angle = ${a} + ${b} = ${a + b}°. (Check: third angle is ${180 - a - b}°, and 180 − ${180 - a - b} = ${a + b}.)`,
        };
      }
      if (v === 3) {
        const a = int(r, 35, 145);
        const kind = pick(r, ["alternate interior", "corresponding", "same-side interior"] as const);
        const ans = kind === "same-side interior" ? 180 - a : a;
        return {
          prompt: `Two parallel lines are cut by a transversal. One angle is ${a}°. What is the measure of its ${kind} angle, in degrees?`,
          kind: "number",
          answer: String(ans),
          hint: "With parallel lines, alternate interior and corresponding angles are equal. Same-side interior angles add to 180°.",
          explanation:
            kind === "same-side interior"
              ? `Same-side interior angles are supplementary: 180 − ${a} = ${ans}°.`
              : `${kind[0].toUpperCase() + kind.slice(1)} angles are equal, so it is ${ans}°.`,
        };
      }
      const n = int(r, 5, 12);
      return {
        prompt: `What is the sum of the interior angles of a polygon with ${n} sides, in degrees?`,
        kind: "number",
        answer: String((n - 2) * 180),
        hint: "Any polygon can be cut into triangles from one corner: there are (sides − 2) of them, each with 180°.",
        explanation: `(${n} − 2) × 180 = ${n - 2} × 180 = ${fmt((n - 2) * 180)}°.`,
      };
    },
  },

  // ================= Grade 11: Algebra II =================
  {
    id: "g11.functions",
    grade: 11,
    strand: "algebra",
    title: "Evaluate and compose functions",
    code: "F-BF.A.1",
    prereqs: ["g9.slope-intercept", "g9.polynomials"],
    generate: (r) => {
      const a = nonZero(r, -5, 5);
      const b = int(r, -9, 9);
      const c = int(r, -9, 9);
      const f = (x: number) => a * x + b;
      const g = (x: number) => x * x + c;
      const fs = `f(x) = ${poly([a, b])}`;
      const gs = `g(x) = ${poly([1, 0, c])}`;
      const k = int(r, -5, 5);
      const v = int(r, 0, 3);
      if (v === 0) {
        return {
          prompt: `${gs}. What is g(${k})?`,
          kind: "number",
          answer: String(g(k)),
          hint: "Replace every x with the number, using parentheses. Square before adding.",
          explanation: `g(${k}) = ${par(k)}² ${sgn(c)} = ${k * k} ${sgn(c)} = ${g(k)}.`,
        };
      }
      if (v === 1) {
        return {
          prompt: `${fs} and ${gs}. What is f(g(${k}))?`,
          kind: "number",
          answer: String(f(g(k))),
          hint: "Work from the inside out: find g of the number first, then put that answer into f.",
          explanation: `g(${k}) = ${g(k)}. f(${g(k)}) = ${a} × ${par(g(k))} ${sgn(b)} = ${f(g(k))}.`,
        };
      }
      if (v === 2) {
        return {
          prompt: `${fs} and ${gs}. What is g(f(${k}))?`,
          kind: "number",
          answer: String(g(f(k))),
          hint: "Work from the inside out: find f of the number first, then put that answer into g.",
          explanation: `f(${k}) = ${f(k)}. g(${f(k)}) = ${par(f(k))}² ${sgn(c)} = ${g(f(k))}.`,
        };
      }
      const p = nonZero(r, -4, 4);
      const q = int(r, -9, 9);
      return {
        prompt: `${fs} and h(x) = ${poly([p, q])}. Write f(h(x)) in the form mx + b. Type it like 3x − 4.`,
        kind: "expr",
        answer: linAnswer(a * p, a * q + b),
        hint: "Put the whole expression for h(x) in place of x inside f, then distribute and combine.",
        explanation: `f(h(x)) = ${a}(${poly([p, q])}) ${sgn(b)} = ${poly([a * p, a * q])} ${sgn(b)} = ${poly([a * p, a * q + b])}.`,
      };
    },
  },
  {
    id: "g11.quadratic-formula",
    grade: 11,
    strand: "algebra",
    title: "The quadratic formula",
    code: "A-REI.B.4",
    prereqs: ["g9.quadratics-factoring"],
    generate: (r) => {
      if (r() < 0.35) {
        const a = nonZero(r, -4, 5);
        const b = int(r, -10, 10);
        const c = int(r, -9, 9);
        const D = b * b - 4 * a * c;
        return {
          prompt: `For  ${poly([a, b, c])} = 0, what is the discriminant b² − 4ac?`,
          kind: "number",
          answer: String(D),
          hint: "Read off a, b and c (with their signs), then compute b² − 4ac carefully.",
          explanation: `a = ${a}, b = ${b}, c = ${c}. ${par(b)}² − 4(${a})(${c}) = ${b * b} − ${par(4 * a * c)} = ${D}. ${D > 0 ? "Positive: two real solutions." : D === 0 ? "Zero: one real solution." : "Negative: no real solutions."}`,
        };
      }
      // (m x − n)(x − k) = 0 has roots n/m and k.
      const m = pick(r, [2, 3, 4, 5]);
      let n = nonZero(r, -9, 9);
      if (gcd(n, m) !== 1) n = n > 0 ? n + 1 : n - 1;
      if (gcd(n, m) !== 1) n = 1;
      const k = int(r, -6, 6);
      const A = m;
      const B = -(n + m * k);
      const C = n * k;
      const r1 = { n, d: m };
      const larger = n / m > k ? fracToString(r1) : String(k);
      const smaller = n / m > k ? String(k) : fracToString(r1);
      const D = B * B - 4 * A * C;
      const sq = Math.round(Math.sqrt(D));
      const askLarger = r() < 0.5;
      return {
        prompt: `Use the quadratic formula to solve  ${poly([A, B, C])} = 0. What is the ${askLarger ? "larger" : "smaller"} solution? (A fraction is fine.)`,
        kind: "fraction",
        answer: askLarger ? larger : smaller,
        hint: "x = (−b ± √(b² − 4ac)) ÷ 2a. Find the discriminant first, take its square root, then try both + and −.",
        explanation: `a = ${A}, b = ${B}, c = ${C}. b² − 4ac = ${D}, √${D} = ${sq}. x = (${-B} ± ${sq}) ÷ ${2 * A}, so x = ${fracToString({ n: -B + sq, d: 2 * A })} or x = ${fracToString({ n: -B - sq, d: 2 * A })}. The ${askLarger ? "larger" : "smaller"} is ${askLarger ? larger : smaller}.`,
      };
    },
  },
  {
    id: "g11.exponential",
    grade: 11,
    strand: "algebra",
    title: "Exponential growth and decay",
    code: "F-LE.A.1",
    prereqs: ["g9.exponents-negative", "g6.percent"],
    generate: (r) => {
      const v = int(r, 0, 3);
      if (v === 0) {
        const p = int(r, 1, 9) * 100;
        const d = pick(r, [2, 3, 4, 5]);
        const n = int(r, 2, 5);
        const ans = p * 2 ** n;
        return {
          prompt: `A colony of ${fmt(p)} bacteria doubles every ${d} hours. How many bacteria are there after ${d * n} hours?`,
          kind: "number",
          answer: String(ans),
          hint: "Count how many doubling periods fit in the time. Then multiply the start by 2 that many times.",
          explanation: `${d * n} ÷ ${d} = ${n} doublings. ${fmt(p)} × 2^${n} = ${fmt(p)} × ${2 ** n} = ${fmt(ans)}.`,
        };
      }
      if (v === 1) {
        const n = int(r, 1, 4);
        const ans = int(r, 3, 25);
        const start = ans * 2 ** n;
        const h = pick(r, [3, 5, 6, 8, 10]);
        return {
          prompt: `A medicine has a half-life of ${h} hours: every ${h} hours, half of it is left. A patient starts with ${start} mg. How many mg are left after ${h * n} hours?`,
          kind: "number",
          answer: String(ans),
          hint: "Count the half-lives in the time, then cut the amount in half that many times.",
          explanation: `${h * n} ÷ ${h} = ${n} half-lives. ${start} × (1/2)^${n} = ${start} ÷ ${2 ** n} = ${ans} mg.`,
        };
      }
      if (v === 2) {
        const p = int(r, 1, 10) * 1000;
        const rate = pick(r, [5, 10, 20]);
        const t = int(r, 2, 3);
        const val = p * (1 + rate / 100) ** t;
        const ans = Math.round(val * 100) / 100;
        return {
          prompt: `You invest $${fmt(p)} at ${rate}% interest, compounded once a year. How much is it worth after ${t} years, in dollars? Round to the cent.`,
          kind: "number",
          answer: dec(ans, 2),
          tolerance: 0.011,
          hint: "Each year the money is multiplied by (1 + rate). Use A = P(1 + r)^t with r written as a decimal.",
          explanation: `A = ${fmt(p)} × ${dec(1 + rate / 100)}^${t} = ${fmt(p)} × ${dec((1 + rate / 100) ** t, 6)} = $${dec(ans, 2)}.`,
        };
      }
      const pct = pick(r, [3, 5, 8, 12, 15, 20, 25, 40]);
      const grow = r() < 0.5;
      const factor = grow ? 1 + pct / 100 : 1 - pct / 100;
      const start = int(r, 2, 9) * 100;
      return {
        prompt: `The function y = ${start}(${dec(factor)})^t models a quantity over t years. By what percent does it ${grow ? "grow" : "shrink"} each year?`,
        kind: "number",
        answer: String(pct),
        hint: "In y = a(b)^t, the growth factor b is 1 + rate (growth) or 1 − rate (decay). Compare b to 1.",
        explanation: `b = ${dec(factor)}, which is ${grow ? `1 + ${dec(pct / 100)}` : `1 − ${dec(pct / 100)}`}, so it ${grow ? "grows" : "shrinks"} ${pct}% per year.`,
      };
    },
  },
  {
    id: "g11.logarithms",
    grade: 11,
    strand: "algebra",
    title: "Logarithms",
    code: "F-LE.A.4",
    prereqs: ["g11.exponential"],
    generate: (r) => {
      const base = pick(r, [2, 3, 4, 5, 10]);
      const maxK = base === 2 ? 7 : base === 3 ? 5 : base === 10 ? 5 : 4;
      const v = int(r, 0, 3);
      const logb = (b: number) => (b === 10 ? "log" : `log${subscript(b)}`);
      if (v === 0) {
        const k = int(r, 0, maxK);
        const n = base ** k;
        return {
          prompt: `What is ${logb(base)}(${fmt(n).replace(/,/g, "")})?`,
          kind: "number",
          answer: String(k),
          hint: `A logarithm asks "what power?" Ask yourself: ${base} to what power gives this number?`,
          explanation: `${base}^${k} = ${n}, so ${logb(base)}(${n}) = ${k}.`,
        };
      }
      if (v === 1) {
        const k = int(r, 1, Math.min(maxK, 4));
        const n = base ** k;
        return {
          prompt: `What is ${logb(base)}(1/${n})?`,
          kind: "number",
          answer: String(-k),
          hint: "One over a power is the same as a negative exponent.",
          explanation: `1/${n} = ${base}^−${k}, so ${logb(base)}(1/${n}) = −${k}.`,
        };
      }
      if (v === 2) {
        const k = int(r, 1, maxK);
        return {
          prompt: `Solve for x:  ${base}^x = ${base ** k}.`,
          kind: "number",
          answer: String(k),
          hint: "Write the right side as a power of the same base, then match exponents (or use a logarithm).",
          explanation: `${base ** k} = ${base}^${k}, so x = ${k}. In log form, x = ${logb(base)}(${base ** k}) = ${k}.`,
        };
      }
      const j = int(r, 1, 3);
      const k = int(r, 1, Math.max(1, maxK - j));
      return {
        prompt: `What is ${logb(base)}(${base ** j}) + ${logb(base)}(${base ** k})?`,
        kind: "number",
        answer: String(j + k),
        hint: "Find each logarithm on its own (what power?), then add. Or use log(a) + log(b) = log(ab).",
        explanation: `${logb(base)}(${base ** j}) = ${j} and ${logb(base)}(${base ** k}) = ${k}, so the sum is ${j + k}. (Same as ${logb(base)}(${base ** (j + k)}).)`,
      };
    },
  },
  {
    id: "g11.geometric-sequences",
    grade: 11,
    strand: "algebra",
    title: "Geometric sequences and series",
    code: "F-BF.A.2",
    prereqs: ["g9.arithmetic-sequences", "g9.exponents-negative"],
    generate: (r) => {
      const ratio = pick(r, [2, 3, -2, 0.5]);
      const n = ratio === 3 ? int(r, 4, 6) : int(r, 5, 8);
      const a1 = ratio === 0.5 ? 128 * int(r, 1, 3) : int(r, 1, 6) * (r() < 0.2 ? -1 : 1);
      const term = (i: number) => a1 * ratio ** (i - 1);
      const seq = [1, 2, 3, 4].map((i) => dec(term(i))).join(", ");
      const rs = ratio === 0.5 ? "1/2" : String(ratio);
      const v = int(r, 0, 2);
      if (v === 0) {
        return {
          prompt: `The sequence ${seq}, … multiplies by the same number each time. What is term number ${n}?`,
          kind: "number",
          answer: dec(term(n)),
          hint: "Find the common ratio r (divide a term by the one before it). Term n = first term × r^(n − 1).",
          explanation: `r = ${rs}. Term ${n} = ${a1} × (${rs})^${n - 1} = ${dec(term(n))}.`,
        };
      }
      if (v === 1) {
        const i = int(r, 3, 6);
        return {
          prompt: `A geometric sequence has term ${i} = ${dec(term(i))} and term ${i + 1} = ${dec(term(i + 1))}. What is the common ratio? (A fraction is fine.)`,
          kind: "fraction",
          answer: rs,
          hint: "Divide any term by the term just before it.",
          explanation: `${dec(term(i + 1))} ÷ ${dec(term(i))} = ${rs}.`,
        };
      }
      const m = ratio === 3 ? int(r, 3, 5) : int(r, 3, 6);
      let sum = 0;
      for (let i = 1; i <= m; i++) sum += term(i);
      return {
        prompt: `Add the first ${m} terms of the geometric sequence ${seq}, …`,
        kind: "number",
        answer: dec(sum),
        tolerance: 1e-6,
        hint: "List the terms and add them, or use the sum formula S = a₁(1 − rⁿ) ÷ (1 − r).",
        explanation: `${Array.from({ length: m }, (_, i) => dec(term(i + 1))).join(" + ")} = ${dec(sum)}. Formula: ${a1} × (1 − (${rs})^${m}) ÷ (1 − ${rs}) = ${dec(sum)}.`,
      };
    },
  },

  // ================= Grade 12: Statistics and probability =================
  {
    id: "g12.center-spread",
    grade: 12,
    strand: "data",
    title: "Mean, median, range and IQR",
    code: "S-ID.A.2",
    prereqs: ["g6.mean-median"],
    generate: (r) => {
      const n = pick(r, [5, 6, 7]);
      const vals = Array.from({ length: n }, () => int(r, 10, 60));
      const total = vals.reduce((s, x) => s + x, 0);
      vals[n - 1] += (n - (total % n)) % n;
      const sorted = [...vals].sort((a, b) => a - b);
      const sum = sorted.reduce((s, x) => s + x, 0);
      const list = shuffle(r, vals).join(", ");
      const v = int(r, 0, 3);
      if (v === 0) {
        return {
          visual: { type: "bars", values: vals },
          prompt: `Find the mean of these test scores: ${list}.`,
          kind: "number",
          answer: String(sum / n),
          hint: "Add all the values, then divide by how many there are.",
          explanation: `Sum = ${sum}. ${sum} ÷ ${n} = ${sum / n}.`,
        };
      }
      if (v === 1) {
        const med = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
        return {
          visual: { type: "bars", values: vals },
          prompt: `Find the median of: ${list}.`,
          kind: "number",
          answer: dec(med),
          hint: "Put the values in order. The median is the middle one (or the average of the two middle ones).",
          explanation: `In order: ${sorted.join(", ")}. The median is ${dec(med)}.`,
        };
      }
      if (v === 2) {
        return {
          visual: { type: "bars", values: vals },
          prompt: `Find the range of: ${list}.`,
          kind: "number",
          answer: String(sorted[n - 1] - sorted[0]),
          hint: "Range = largest value − smallest value.",
          explanation: `${sorted[n - 1]} − ${sorted[0]} = ${sorted[n - 1] - sorted[0]}.`,
        };
      }
      // IQR with 7 values: Q1 is the 2nd value, Q3 the 6th (median of each half, middle value left out).
      const seven = Array.from({ length: 7 }, () => int(r, 10, 90)).sort((a, b) => a - b);
      const iqr = seven[5] - seven[1];
      return {
        prompt: `Find the interquartile range (IQR) of: ${shuffle(r, seven).join(", ")}.`,
        kind: "number",
        answer: String(iqr),
        hint: "Order the data and find the median. Q1 is the median of the lower half and Q3 of the upper half (leave the middle value out). IQR = Q3 − Q1.",
        explanation: `In order: ${seven.join(", ")}. Median ${seven[3]}. Lower half ${seven.slice(0, 3).join(", ")} → Q1 = ${seven[1]}. Upper half ${seven.slice(4).join(", ")} → Q3 = ${seven[5]}. IQR = ${seven[5]} − ${seven[1]} = ${iqr}.`,
      };
    },
  },
  {
    id: "g12.std-dev",
    grade: 12,
    strand: "data",
    title: "Standard deviation of a small data set",
    code: "S-ID.A.2",
    prereqs: ["g12.center-spread"],
    generate: (r) => {
      // Deviation patterns (mean 0) whose population standard deviation is a whole number.
      const [pattern, sd0] = pick(r, [
        [[-1, -1, 1, 1], 1],
        [[-1, -1, -1, -1, 4], 2],
        [[-7, -1, 1, 7], 5],
        [[-3, -3, 3, 3], 3],
      ] as const);
      const usable = pattern as readonly number[];
      const sd1: number = sd0;
      const k = sd1 === 5 ? int(r, 1, 2) : int(r, 1, 4);
      const mean = int(r, 20, 60);
      const vals = shuffle(
        r,
        usable.map((d) => mean + d * k),
      );
      const sd = sd1 * k;
      const n = vals.length;
      const sq = usable.map((d) => (d * k) ** 2);
      const ssum = sq.reduce((s, x) => s + x, 0);
      return {
        visual: { type: "bars", values: vals },
        prompt: `Find the standard deviation of: ${vals.join(", ")}. (Treat it as the whole population: divide by n.)`,
        kind: "number",
        answer: String(sd),
        hint: "Find the mean. Subtract it from each value and square the results. Average those squares (that is the variance), then take the square root.",
        explanation: `Mean = ${mean}. Squared distances: ${sq.join(", ")}. Their sum is ${ssum}; ÷ ${n} = ${ssum / n} (the variance). √${ssum / n} = ${sd}.`,
      };
    },
  },
  {
    id: "g12.probability",
    grade: 12,
    strand: "data",
    title: "Probability of compound events",
    code: "S-CP.B.8",
    prereqs: ["g7.probability"],
    generate: (r) => {
      const v = int(r, 0, 3);
      if (v === 0) {
        const red = int(r, 1, 6);
        const blue = int(r, 1, 6);
        const t = red + blue;
        const p = simplify({ n: red * red, d: t * t });
        return {
          visual: { type: "marbles", groups: [{ color: "red", count: red }, { color: "blue", count: blue }] },
          prompt: `A bag has ${red} red and ${blue} blue marbles. You draw one, put it back, and draw again. What is the probability both are red?`,
          kind: "fraction",
          answer: fracToString(p),
          hint: "Putting it back makes the draws independent. Multiply the probability for each draw.",
          explanation: `P(red) = ${red}/${t} each time. ${red}/${t} × ${red}/${t} = ${red * red}/${t * t}${red * red === p.n ? "" : ` = ${fracToString(p)}`}.`,
        };
      }
      if (v === 1) {
        const red = int(r, 2, 6);
        const blue = int(r, 1, 6);
        const t = red + blue;
        const p = simplify({ n: red * (red - 1), d: t * (t - 1) });
        return {
          visual: { type: "marbles", groups: [{ color: "red", count: red }, { color: "blue", count: blue }] },
          prompt: `A bag has ${red} red and ${blue} blue marbles. You draw two without putting the first one back. What is the probability both are red?`,
          kind: "fraction",
          answer: fracToString(p),
          hint: "Find the chance the first is red. For the second draw, one red marble and one marble total are gone. Multiply.",
          explanation: `${red}/${t} × ${red - 1}/${t - 1} = ${red * (red - 1)}/${t * (t - 1)} = ${fracToString(p)}.`,
        };
      }
      if (v === 2) {
        const face = int(r, 1, 6);
        const heads = r() < 0.5;
        return {
          prompt: `You flip a fair coin and roll a fair 6-sided die. What is the probability of ${heads ? "heads" : "tails"} and a number greater than ${face - 1}?`,
          kind: "fraction",
          answer: fracToString({ n: 7 - face, d: 12 }),
          hint: "The coin and the die don't affect each other. Find each probability, then multiply.",
          explanation: `P(${heads ? "heads" : "tails"}) = 1/2. Numbers greater than ${face - 1}: ${7 - face} of 6. 1/2 × ${7 - face}/6 = ${fracToString({ n: 7 - face, d: 12 })}.`,
        };
      }
      const n = int(r, 2, 4);
      const ans = fracToString({ n: 2 ** n - 1, d: 2 ** n });
      return {
        prompt: `You flip a fair coin ${n} times. What is the probability of getting at least one heads?`,
        kind: "fraction",
        answer: ans,
        hint: "\"At least one\" is the opposite of \"none\". Find the chance of no heads at all, then subtract from 1.",
        explanation: `P(no heads) = (1/2)^${n} = 1/${2 ** n}. P(at least one) = 1 − 1/${2 ** n} = ${ans}.`,
      };
    },
  },
  {
    id: "g12.expected-value",
    grade: 12,
    strand: "data",
    title: "Expected value",
    code: "S-MD.A.2",
    prereqs: ["g12.probability"],
    generate: (r) => {
      const v = int(r, 0, 2);
      if (v === 0) {
        const vals = Array.from({ length: 4 }, () => int(r, 1, 12));
        const sum = vals.reduce((s, x) => s + x, 0);
        const ev = fracToString({ n: sum, d: 4 });
        return {
          visual: { type: "bars", values: vals },
          prompt: `A spinner has 4 equal sections worth $${vals.join(", $")}. What is the expected value of one spin, in dollars? (A fraction or decimal is fine.)`,
          kind: "fraction",
          answer: ev,
          hint: "Multiply each prize by its probability and add. With equal sections, that is the average of the prizes.",
          explanation: `(${vals.join(" + ")}) × 1/4 = ${sum}/4 = ${ev} dollars (${dec(sum / 4)}).`,
        };
      }
      if (v === 1) {
        const p = pick(r, [20, 25, 40, 50, 60, 70, 75, 80]);
        const win = int(r, 2, 20) * 1000;
        const loss = int(r, 1, 10) * 1000;
        const ev = (p / 100) * win - (1 - p / 100) * loss;
        return {
          prompt: `A small business is thinking about a new product. The chance it earns a $${fmt(win)} profit is ${p}%, and the chance it loses $${fmt(loss)} is ${100 - p}%. What is the expected value, in dollars? (Use a minus sign for a loss.)`,
          kind: "number",
          answer: String(Math.round(ev)),
          hint: "Expected value = (chance of each outcome × its dollar amount), all added up. A loss counts as negative.",
          explanation: `${dec(p / 100)} × ${fmt(win)} + ${dec(1 - p / 100)} × (−${fmt(loss)}) = ${fmt(Math.round((p / 100) * win))} − ${fmt(Math.round((1 - p / 100) * loss))} = ${fmt(Math.round(ev))} dollars.`,
        };
      }
      const prize = pick(r, [6, 12, 18, 24, 30]);
      const cost = int(r, 1, 6);
      const ev = simplify({ n: prize - 6 * cost, d: 6 });
      return {
        prompt: `A game costs $${cost} to play. You roll a die and win $${prize} if it shows a 6 (nothing otherwise). What is your expected gain per game, counting the cost? (A fraction is fine; use a minus sign for a loss.)`,
        kind: "fraction",
        answer: fracToString(ev),
        hint: "Find the expected winnings (prize × chance of winning), then subtract what you pay to play.",
        explanation: `Expected winnings = ${prize} × 1/6 = ${dec(prize / 6)}. Minus the $${cost} cost: ${dec(prize / 6)} − ${cost} = ${fracToString(ev)} dollars.`,
      };
    },
  },
];
