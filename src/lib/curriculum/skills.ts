import type { Question } from "./answers";
import {
  dec,
  fmt,
  fracToString,
  gcd,
  int,
  lcm,
  pick,
  shuffle,
  simplify,
  type Rng,
} from "./math";

/**
 * Math skill graph, grades 3-8.
 *
 * Each skill is a small, testable step tied to a grade-level standard code.
 * Colorado's math standards (Colorado Academic Standards) use these same
 * grade-level codes (e.g. 4.NBT.B.5). Descriptions here are written in our own
 * words; check the Colorado Department of Education's published standards
 * when you need the official wording.
 *
 * Every skill has a generator, so practice is unlimited and every answer is
 * checked by code rather than by an AI guess.
 */

export type Strand =
  | "whole-numbers"
  | "fractions"
  | "decimals"
  | "algebra"
  | "geometry"
  | "ratios"
  | "data";

export const STRANDS: { id: Strand; label: string }[] = [
  { id: "whole-numbers", label: "Whole numbers & operations" },
  { id: "fractions", label: "Fractions" },
  { id: "decimals", label: "Decimals" },
  { id: "ratios", label: "Ratios, rates & percents" },
  { id: "algebra", label: "Expressions & equations" },
  { id: "geometry", label: "Geometry & measurement" },
  { id: "data", label: "Data & probability" },
];

export interface Skill {
  id: string;
  grade: number;
  strand: Strand;
  title: string;
  /** Grade-level standard code, e.g. "4.NBT.B.5". */
  code: string;
  prereqs: string[];
  generate: (r: Rng) => Question;
}

const NAMES = ["Maya", "Leo", "Ava", "Eli", "Zoe", "Sam", "Nora", "Kai", "Ruby", "Finn"];

/** Builds a shuffled multiple-choice list containing the answer and unique distractors. */
function choices(r: Rng, answer: string, distractors: string[]): string[] {
  const set = new Set<string>([answer]);
  for (const d of distractors) if (set.size < 4) set.add(d);
  return shuffle(r, [...set]);
}

function multiDigit(r: Rng, digits: number): number {
  return int(r, 10 ** (digits - 1), 10 ** digits - 1);
}

function roundTo(n: number, place: number): number {
  return Math.round(n / place) * place;
}

const PLACE_NAMES: Record<number, string> = {
  10: "ten",
  100: "hundred",
  1000: "thousand",
  10000: "ten thousand",
  100000: "hundred thousand",
};

export const SKILLS: Skill[] = [
  // ---------------- Grade 3 ----------------
  {
    id: "g3.mult-facts",
    grade: 3,
    strand: "whole-numbers",
    title: "Multiplication facts to 10 × 10",
    code: "3.OA.C.7",
    prereqs: [],
    generate: (r) => {
      const a = int(r, 2, 10);
      const b = int(r, 2, 10);
      return {
        prompt: `${a} × ${b} = ?`,
        kind: "number",
        answer: String(a * b),
        hint: `Think of ${a} groups of ${b}. You can skip-count by ${b}.`,
        explanation: `${a} groups of ${b} is ${a * b}.`,
      };
    },
  },
  {
    id: "g3.div-facts",
    grade: 3,
    strand: "whole-numbers",
    title: "Division facts",
    code: "3.OA.C.7",
    prereqs: ["g3.mult-facts"],
    generate: (r) => {
      const a = int(r, 2, 10);
      const b = int(r, 2, 10);
      return {
        prompt: `${a * b} ÷ ${a} = ?`,
        kind: "number",
        answer: String(b),
        hint: `What number times ${a} makes ${a * b}?`,
        explanation: `${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = ${b}.`,
      };
    },
  },
  {
    id: "g3.round",
    grade: 3,
    strand: "whole-numbers",
    title: "Round to the nearest 10 or 100",
    code: "3.NBT.A.1",
    prereqs: [],
    generate: (r) => {
      const n = int(r, 101, 989);
      const place = pick(r, [10, 100]);
      const ans = roundTo(n, place);
      return {
        prompt: `Round ${n} to the nearest ${PLACE_NAMES[place]}.`,
        kind: "number",
        answer: String(ans),
        hint: `Look at the digit just to the right of the ${PLACE_NAMES[place]}s place. 5 or more rounds up.`,
        explanation: `${n} is closer to ${ans} than to the other ${PLACE_NAMES[place]}, so it rounds to ${ans}.`,
      };
    },
  },
  {
    id: "g3.add-sub-1000",
    grade: 3,
    strand: "whole-numbers",
    title: "Add and subtract within 1,000",
    code: "3.NBT.A.2",
    prereqs: [],
    generate: (r) => {
      const a = int(r, 120, 899);
      if (r() < 0.5) {
        const b = int(r, 25, 999 - a);
        return {
          prompt: `${a} + ${b} = ?`,
          kind: "number",
          answer: String(a + b),
          hint: "Line up the ones, tens and hundreds. Add each place, starting with the ones, and regroup if a place adds to 10 or more.",
          explanation: `${a} + ${b} = ${a + b}.`,
        };
      }
      const b = int(r, 25, a - 10);
      return {
        prompt: `${a} − ${b} = ?`,
        kind: "number",
        answer: String(a - b),
        hint: "Subtract the ones, then the tens, then the hundreds. Regroup (borrow) if the top digit is too small.",
        explanation: `${a} − ${b} = ${a - b}. Check: ${a - b} + ${b} = ${a}.`,
      };
    },
  },
  {
    id: "g3.mult-tens",
    grade: 3,
    strand: "whole-numbers",
    title: "Multiply by multiples of 10",
    code: "3.NBT.A.3",
    prereqs: ["g3.mult-facts"],
    generate: (r) => {
      const a = int(r, 2, 9);
      const b = int(r, 2, 9) * 10;
      return {
        prompt: `${a} × ${b} = ?`,
        kind: "number",
        answer: String(a * b),
        hint: `${b} is ${b / 10} tens. What is ${a} × ${b / 10} tens?`,
        explanation: `${a} × ${b / 10} = ${(a * b) / 10}, so ${a} × ${b} = ${a * b}.`,
      };
    },
  },
  {
    id: "g3.two-step",
    grade: 3,
    strand: "algebra",
    title: "Two-step word problems",
    code: "3.OA.D.8",
    prereqs: ["g3.mult-facts", "g3.add-sub-1000"],
    generate: (r) => {
      const name = pick(r, NAMES);
      const packs = int(r, 3, 9);
      const per = int(r, 4, 9);
      const extra = int(r, 3, 20);
      if (r() < 0.5) {
        return {
          prompt: `${name} buys ${packs} packs of stickers with ${per} stickers in each pack. A friend gives ${name} ${extra} more stickers. How many stickers does ${name} have now?`,
          kind: "number",
          answer: String(packs * per + extra),
          hint: "First find how many stickers are in all the packs. Then add the extra ones.",
          explanation: `${packs} × ${per} = ${packs * per}, then ${packs * per} + ${extra} = ${packs * per + extra}.`,
        };
      }
      const total = packs * per;
      const used = int(r, 1, total - 1);
      return {
        prompt: `${name} has ${packs} boxes with ${per} crayons in each box. ${name} gives away ${used} crayons. How many crayons are left?`,
        kind: "number",
        answer: String(total - used),
        hint: "First find the total number of crayons. Then take away the ones given away.",
        explanation: `${packs} × ${per} = ${total}, then ${total} − ${used} = ${total - used}.`,
      };
    },
  },
  {
    id: "g3.unit-fractions",
    grade: 3,
    strand: "fractions",
    title: "Understand fractions as parts of a whole",
    code: "3.NF.A.1",
    prereqs: [],
    generate: (r) => {
      const d = pick(r, [2, 3, 4, 6, 8]);
      const n = int(r, 1, d - 1);
      return {
        visual: { type: "fraction-bars", bars: [{ n, d, label: "pizza" }] },
        prompt: `A pizza is cut into ${d} equal slices. You eat ${n}. What fraction of the pizza did you eat?`,
        kind: "fraction",
        answer: `${n}/${d}`,
        hint: "The bottom number is how many equal parts in all. The top number is how many parts you are counting.",
        explanation: `${n} out of ${d} equal slices is ${n}/${d}.`,
      };
    },
  },
  {
    id: "g3.equiv-fractions",
    grade: 3,
    strand: "fractions",
    title: "Simple equivalent fractions",
    code: "3.NF.A.3",
    prereqs: ["g3.unit-fractions", "g3.mult-facts"],
    generate: (r) => {
      const d = pick(r, [2, 3, 4]);
      const n = int(r, 1, d - 1);
      const k = int(r, 2, 4);
      return {
        prompt: `Fill in the blank: ${n}/${d} = ?/${d * k}`,
        kind: "number",
        answer: String(n * k),
        hint: `The bottom number was multiplied by ${k}. Do the same thing to the top.`,
        explanation: `${d} × ${k} = ${d * k}, so multiply the top by ${k} too: ${n} × ${k} = ${n * k}.`,
      };
    },
  },
  {
    id: "g3.compare-fractions",
    grade: 3,
    strand: "fractions",
    title: "Compare fractions with same top or bottom",
    code: "3.NF.A.3.D",
    prereqs: ["g3.unit-fractions"],
    generate: (r) => {
      let a: [number, number];
      let b: [number, number];
      if (r() < 0.5) {
        const d = pick(r, [4, 6, 8, 10]);
        const n1 = int(r, 1, d - 1);
        let n2 = int(r, 1, d - 1);
        if (n2 === n1) n2 = n1 === 1 ? 2 : n1 - 1;
        a = [n1, d];
        b = [n2, d];
      } else {
        const n = int(r, 1, 3);
        const d1 = int(r, n + 1, 10);
        let d2 = int(r, n + 1, 10);
        if (d2 === d1) d2 = d1 === 10 ? 9 : d1 + 1;
        a = [n, d1];
        b = [n, d2];
      }
      const va = a[0] / a[1];
      const vb = b[0] / b[1];
      const ans = va > vb ? ">" : va < vb ? "<" : "=";
      return {
        prompt: `Which sign makes this true?  ${a[0]}/${a[1]}  ?  ${b[0]}/${b[1]}`,
        kind: "choice",
        choices: [">", "<", "="],
        answer: ans,
        hint:
          a[1] === b[1]
            ? "Same-size pieces: more pieces means a bigger fraction."
            : "Same number of pieces: smaller pieces (bigger bottom number) means a smaller fraction.",
        explanation: `${a[0]}/${a[1]} ${ans} ${b[0]}/${b[1]}.`,
      };
    },
  },
  {
    id: "g3.area-perimeter",
    grade: 3,
    strand: "geometry",
    title: "Area and perimeter of rectangles",
    code: "3.MD.C.7",
    prereqs: ["g3.mult-facts"],
    generate: (r) => {
      const l = int(r, 3, 12);
      const w = int(r, 2, 9);
      if (r() < 0.5) {
        return {
          visual: { type: "shape", shape: "rectangle", base: `${l} cm`, height: `${w} cm` },
          prompt: `A rectangle is ${l} cm long and ${w} cm wide. What is its area in square centimeters?`,
          kind: "number",
          answer: String(l * w),
          hint: "Area counts the squares inside. Multiply length × width.",
          explanation: `${l} × ${w} = ${l * w} square cm.`,
        };
      }
      return {
        visual: { type: "shape", shape: "rectangle", base: `${l} m`, height: `${w} m` },
        prompt: `A rectangle is ${l} m long and ${w} m wide. What is its perimeter in meters?`,
        kind: "number",
        answer: String(2 * (l + w)),
        hint: "Perimeter is the distance all the way around. Add all four sides.",
        explanation: `${l} + ${w} + ${l} + ${w} = ${2 * (l + w)} m.`,
      };
    },
  },
  {
    id: "g3.elapsed-time",
    grade: 3,
    strand: "geometry",
    title: "Elapsed time in minutes",
    code: "3.MD.A.1",
    prereqs: ["g3.add-sub-1000"],
    generate: (r) => {
      const startH = int(r, 8, 11);
      const startM = pick(r, [0, 5, 10, 15, 20, 25, 30, 35, 40]);
      const mins = int(r, 2, 11) * 5;
      const end = startH * 60 + startM + mins;
      const t = (m: number) => `${Math.floor(m / 60) > 12 ? Math.floor(m / 60) - 12 : Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
      return {
        prompt: `Practice starts at ${t(startH * 60 + startM)} and ends at ${t(end)}. How many minutes long is practice?`,
        kind: "number",
        answer: String(mins),
        hint: "Count up from the start time to the end time. Jump to the next hour first if it helps.",
        explanation: `From ${t(startH * 60 + startM)} to ${t(end)} is ${mins} minutes.`,
      };
    },
  },

  // ---------------- Grade 4 ----------------
  {
    id: "g4.round-multidigit",
    grade: 4,
    strand: "whole-numbers",
    title: "Round multi-digit numbers to any place",
    code: "4.NBT.A.3",
    prereqs: ["g3.round"],
    generate: (r) => {
      const n = int(r, 10_000, 999_999);
      const place = pick(r, [100, 1000, 10000, 100000]);
      const ans = roundTo(n, place);
      return {
        prompt: `Round ${fmt(n)} to the nearest ${PLACE_NAMES[place]}.`,
        kind: "number",
        answer: String(ans),
        hint: `Find the ${PLACE_NAMES[place]}s digit, then look one place to its right. 5 or more rounds up.`,
        explanation: `${fmt(n)} rounds to ${fmt(ans)}.`,
      };
    },
  },
  {
    id: "g4.add-sub-multidigit",
    grade: 4,
    strand: "whole-numbers",
    title: "Add and subtract multi-digit numbers",
    code: "4.NBT.B.4",
    prereqs: ["g3.add-sub-1000"],
    generate: (r) => {
      const a = int(r, 2_000, 98_000);
      if (r() < 0.5) {
        const b = int(r, 1_000, 99_999 - a);
        return {
          prompt: `${fmt(a)} + ${fmt(b)} = ?`,
          kind: "number",
          answer: String(a + b),
          hint: "Line up the places. Add from right to left and regroup when a column makes 10 or more.",
          explanation: `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}.`,
        };
      }
      const b = int(r, 500, a - 100);
      return {
        prompt: `${fmt(a)} − ${fmt(b)} = ?`,
        kind: "number",
        answer: String(a - b),
        hint: "Line up the places. Subtract from right to left, regrouping when needed.",
        explanation: `${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}. Check by adding back: ${fmt(a - b)} + ${fmt(b)} = ${fmt(a)}.`,
      };
    },
  },
  {
    id: "g4.mult-multidigit",
    grade: 4,
    strand: "whole-numbers",
    title: "Multiply up to 4 digits by 1 digit, or 2 digits by 2 digits",
    code: "4.NBT.B.5",
    prereqs: ["g3.mult-tens"],
    generate: (r) => {
      const [a, b] = r() < 0.5 ? [multiDigit(r, int(r, 3, 4)), int(r, 3, 9)] : [multiDigit(r, 2), multiDigit(r, 2)];
      return {
        prompt: `${fmt(a)} × ${b} = ?`,
        kind: "number",
        answer: String(a * b),
        hint: "Break a number into place values (like 40 + 7), multiply each part, then add the partial products.",
        explanation: `${fmt(a)} × ${b} = ${fmt(a * b)}.`,
      };
    },
  },
  {
    id: "g4.long-division",
    grade: 4,
    strand: "whole-numbers",
    title: "Divide with remainders",
    code: "4.NBT.B.6",
    prereqs: ["g3.div-facts", "g4.mult-multidigit"],
    generate: (r) => {
      const d = int(r, 3, 9);
      const q = int(r, 12, 250);
      const rem = int(r, 0, d - 1);
      const n = d * q + rem;
      return {
        prompt: `${n} ÷ ${d} = ?  (write it like 12 R 3)`,
        kind: "remainder",
        answer: `${q} R ${rem}`,
        hint: `How many groups of ${d} fit into ${n}? Divide one place at a time, and whatever is left over is the remainder.`,
        explanation: `${d} × ${q} = ${d * q}, and ${n} − ${d * q} = ${rem}, so the answer is ${q} R ${rem}.`,
      };
    },
  },
  {
    id: "g4.factors-primes",
    grade: 4,
    strand: "algebra",
    title: "Factors, multiples, prime and composite",
    code: "4.OA.B.4",
    prereqs: ["g3.div-facts"],
    generate: (r) => {
      if (r() < 0.5) {
        const n = int(r, 2, 99);
        let isPrime = n > 1;
        for (let i = 2; i * i <= n; i++) if (n % i === 0) isPrime = false;
        return {
          prompt: `Is ${n} prime or composite?`,
          kind: "choice",
          choices: ["prime", "composite"],
          answer: isPrime ? "prime" : "composite",
          hint: "A prime number has exactly two factors: 1 and itself. Try dividing by 2, 3, 5 and 7.",
          explanation: isPrime
            ? `${n} can only be divided evenly by 1 and ${n}, so it is prime.`
            : `${n} has other factors (for example ${[2, 3, 5, 7, 9, 11].find((f) => n % f === 0 && f !== n) ?? "more"}), so it is composite.`,
        };
      }
      const f = int(r, 2, 12);
      const n = f * int(r, 2, 12) + (r() < 0.4 ? int(r, 1, f - 1) : 0);
      const yes = n % f === 0;
      return {
        prompt: `Is ${f} a factor of ${n}?`,
        kind: "choice",
        choices: ["yes", "no"],
        answer: yes ? "yes" : "no",
        hint: `Does ${n} ÷ ${f} come out even, with nothing left over?`,
        explanation: yes ? `${n} ÷ ${f} = ${n / f} exactly, so yes.` : `${n} ÷ ${f} leaves a remainder of ${n % f}, so no.`,
      };
    },
  },
  {
    id: "g4.patterns",
    grade: 4,
    strand: "algebra",
    title: "Number patterns that follow a rule",
    code: "4.OA.C.5",
    prereqs: ["g3.add-sub-1000", "g3.mult-facts"],
    generate: (r) => {
      const start = int(r, 1, 20);
      if (r() < 0.6) {
        const step = int(r, 3, 15);
        const seq = [0, 1, 2, 3].map((i) => start + i * step);
        return {
          prompt: `What number comes next?  ${seq.join(", ")}, ?`,
          kind: "number",
          answer: String(start + 4 * step),
          hint: "How much does the pattern grow each time?",
          explanation: `The rule is "add ${step}". ${seq[3]} + ${step} = ${start + 4 * step}.`,
        };
      }
      const m = pick(r, [2, 3]);
      const s = int(r, 1, 5);
      const seq = [0, 1, 2, 3].map((i) => s * m ** i);
      return {
        prompt: `What number comes next?  ${seq.join(", ")}, ?`,
        kind: "number",
        answer: String(s * m ** 4),
        hint: "Is it adding the same amount each time, or multiplying?",
        explanation: `The rule is "multiply by ${m}". ${seq[3]} × ${m} = ${s * m ** 4}.`,
      };
    },
  },
  {
    id: "g4.equiv-fractions",
    grade: 4,
    strand: "fractions",
    title: "Equivalent fractions",
    code: "4.NF.A.1",
    prereqs: ["g3.equiv-fractions"],
    generate: (r) => {
      const d = pick(r, [3, 4, 5, 6, 8, 10, 12]);
      const n = int(r, 1, d - 1);
      const k = int(r, 2, 6);
      if (r() < 0.5) {
        return {
          prompt: `Fill in the blank: ${n}/${d} = ?/${d * k}`,
          kind: "number",
          answer: String(n * k),
          hint: `What was ${d} multiplied by to get ${d * k}? Multiply the top by the same number.`,
          explanation: `${d} × ${k} = ${d * k}, and ${n} × ${k} = ${n * k}.`,
        };
      }
      const s = simplify({ n: n * k, d: d * k });
      return {
        prompt: `Write ${n * k}/${d * k} in simplest form.`,
        kind: "fraction",
        simplest: true,
        answer: fracToString(s),
        hint: "Find the biggest number that divides evenly into both the top and the bottom.",
        explanation: `Divide top and bottom by ${gcd(n * k, d * k)}: ${n * k}/${d * k} = ${fracToString(s)}.`,
      };
    },
  },
  {
    id: "g4.compare-fractions",
    grade: 4,
    strand: "fractions",
    title: "Compare fractions with different denominators",
    code: "4.NF.A.2",
    prereqs: ["g4.equiv-fractions", "g3.compare-fractions"],
    generate: (r) => {
      const d1 = pick(r, [2, 3, 4, 5, 6, 8, 10, 12]);
      let d2 = pick(r, [2, 3, 4, 5, 6, 8, 10, 12]);
      if (d2 === d1) d2 = d1 === 12 ? 8 : 12;
      const n1 = int(r, 1, d1 - 1);
      const n2 = int(r, 1, d2 - 1);
      const diff = n1 * d2 - n2 * d1;
      const ans = diff > 0 ? ">" : diff < 0 ? "<" : "=";
      const c = lcm(d1, d2);
      return {
        prompt: `Which sign makes this true?  ${n1}/${d1}  ?  ${n2}/${d2}`,
        kind: "choice",
        choices: [">", "<", "="],
        answer: ans,
        hint: "Rewrite both fractions with the same denominator, or compare each one to 1/2.",
        explanation: `With denominator ${c}: ${n1}/${d1} = ${(n1 * c) / d1}/${c} and ${n2}/${d2} = ${(n2 * c) / d2}/${c}. So ${n1}/${d1} ${ans} ${n2}/${d2}.`,
      };
    },
  },
  {
    id: "g4.add-sub-fractions",
    grade: 4,
    strand: "fractions",
    title: "Add and subtract fractions with like denominators",
    code: "4.NF.B.3",
    prereqs: ["g3.unit-fractions"],
    generate: (r) => {
      const d = pick(r, [3, 4, 5, 6, 8, 10, 12]);
      const a = int(r, 1, d);
      const b = int(r, 1, d);
      if (r() < 0.5) {
        return {
          prompt: `${a}/${d} + ${b}/${d} = ?`,
          kind: "fraction",
          answer: `${a + b}/${d}`,
          hint: "When the bottoms match, add the tops and keep the bottom the same.",
          explanation: `${a} + ${b} = ${a + b}, so the answer is ${a + b}/${d}${(a + b) % d === 0 ? ` = ${(a + b) / d}` : ""}.`,
        };
      }
      const [hi, lo] = a >= b ? [a + d, b] : [b + d, a];
      return {
        prompt: `${hi}/${d} − ${lo}/${d} = ?`,
        kind: "fraction",
        answer: `${hi - lo}/${d}`,
        hint: "When the bottoms match, subtract the tops and keep the bottom the same.",
        explanation: `${hi} − ${lo} = ${hi - lo}, so the answer is ${hi - lo}/${d}.`,
      };
    },
  },
  {
    id: "g4.mult-fraction-whole",
    grade: 4,
    strand: "fractions",
    title: "Multiply a fraction by a whole number",
    code: "4.NF.B.4",
    prereqs: ["g4.add-sub-fractions", "g3.mult-facts"],
    generate: (r) => {
      const d = pick(r, [3, 4, 5, 6, 8, 10]);
      const n = int(r, 1, d - 1);
      const w = int(r, 2, 9);
      return {
        prompt: `${w} × ${n}/${d} = ?`,
        kind: "fraction",
        answer: `${w * n}/${d}`,
        hint: `${w} × ${n}/${d} means ${w} groups of ${n}/${d}. Multiply the whole number by the top.`,
        explanation: `${w} × ${n} = ${w * n}, so the answer is ${w * n}/${d}${(w * n) % d === 0 ? ` = ${(w * n) / d}` : ""}.`,
      };
    },
  },
  {
    id: "g4.decimal-fractions",
    grade: 4,
    strand: "decimals",
    title: "Tenths and hundredths as decimals",
    code: "4.NF.C.6",
    prereqs: ["g4.equiv-fractions"],
    generate: (r) => {
      const hundredths = r() < 0.6;
      const d = hundredths ? 100 : 10;
      const n = int(r, 1, d - 1);
      const decimal = dec(n / d);
      if (r() < 0.5) {
        return {
          prompt: `Write ${n}/${d} as a decimal.`,
          kind: "number",
          answer: decimal,
          hint: `${d === 10 ? "Tenths use one" : "Hundredths use two"} digit${d === 10 ? "" : "s"} after the decimal point.`,
          explanation: `${n}/${d} = ${decimal}.`,
        };
      }
      return {
        prompt: `Write ${decimal} as a fraction.`,
        kind: "fraction",
        answer: `${n}/${d}`,
        hint: "Read the decimal out loud: is it tenths or hundredths? That's your bottom number.",
        explanation: `${decimal} is ${n} ${d === 10 ? "tenths" : "hundredths"}, which is ${n}/${d}.`,
      };
    },
  },
  {
    id: "g4.compare-decimals",
    grade: 4,
    strand: "decimals",
    title: "Compare decimals to hundredths",
    code: "4.NF.C.7",
    prereqs: ["g4.decimal-fractions"],
    generate: (r) => {
      const a = int(r, 1, 99) / 100;
      let b = r() < 0.5 ? int(r, 1, 9) / 10 : int(r, 1, 99) / 100;
      if (b === a) b = Math.min(0.99, a + 0.01);
      const ans = a > b ? ">" : a < b ? "<" : "=";
      return {
        prompt: `Which sign makes this true?  ${dec(a)}  ?  ${dec(b)}`,
        kind: "choice",
        choices: [">", "<", "="],
        answer: ans,
        hint: "Write both with two digits after the point (0.5 = 0.50), then compare.",
        explanation: `${a.toFixed(2)} ${ans} ${b.toFixed(2)}.`,
      };
    },
  },
  {
    id: "g4.unit-conversion",
    grade: 4,
    strand: "geometry",
    title: "Convert measurement units",
    code: "4.MD.A.1",
    prereqs: ["g3.mult-tens"],
    generate: (r) => {
      const conv = pick(r, [
        { big: "kilometers", small: "meters", f: 1000 },
        { big: "meters", small: "centimeters", f: 100 },
        { big: "kilograms", small: "grams", f: 1000 },
        { big: "liters", small: "milliliters", f: 1000 },
        { big: "hours", small: "minutes", f: 60 },
        { big: "minutes", small: "seconds", f: 60 },
        { big: "feet", small: "inches", f: 12 },
        { big: "yards", small: "feet", f: 3 },
        { big: "pounds", small: "ounces", f: 16 },
      ]);
      const n = int(r, 2, 12);
      return {
        prompt: `${n} ${conv.big} = ? ${conv.small}`,
        kind: "number",
        answer: String(n * conv.f),
        hint: `1 ${conv.big.replace(/s$/, "")} is ${conv.f} ${conv.small}.`,
        explanation: `${n} × ${conv.f} = ${n * conv.f} ${conv.small}.`,
      };
    },
  },
  {
    id: "g4.angles",
    grade: 4,
    strand: "geometry",
    title: "Find a missing angle",
    code: "4.MD.C.7",
    prereqs: ["g3.add-sub-1000"],
    generate: (r) => {
      const total = pick(r, [90, 180, 360]);
      const known = int(r, 15, total - 15);
      const label = total === 90 ? "a right angle (90°)" : total === 180 ? "a straight line (180°)" : "a full turn (360°)";
      return {
        prompt: `Two angles together make ${label}. One angle is ${known}°. How many degrees is the other angle?`,
        kind: "number",
        answer: String(total - known),
        hint: `The two angles add up to ${total}°.`,
        explanation: `${total} − ${known} = ${total - known}°.`,
      };
    },
  },
  {
    id: "g4.area-perimeter-missing",
    grade: 4,
    strand: "geometry",
    title: "Area and perimeter problems with a missing side",
    code: "4.MD.A.3",
    prereqs: ["g3.area-perimeter", "g3.div-facts"],
    generate: (r) => {
      const l = int(r, 4, 15);
      const w = int(r, 2, 12);
      if (r() < 0.5) {
        return {
          prompt: `A rectangle has an area of ${l * w} square feet. Its width is ${w} feet. How long is it?`,
          kind: "number",
          answer: String(l),
          hint: "Area = length × width. What times the width gives the area?",
          explanation: `${l * w} ÷ ${w} = ${l} feet.`,
        };
      }
      return {
        prompt: `A rectangle has a perimeter of ${2 * (l + w)} meters. Its width is ${w} meters. How long is it?`,
        kind: "number",
        answer: String(l),
        hint: "Perimeter = 2 × (length + width). Half the perimeter is length + width.",
        explanation: `Half of ${2 * (l + w)} is ${l + w}. ${l + w} − ${w} = ${l} meters.`,
      };
    },
  },

  // ---------------- Grade 5 ----------------
  {
    id: "g5.powers-of-ten",
    grade: 5,
    strand: "decimals",
    title: "Multiply and divide by powers of 10",
    code: "5.NBT.A.2",
    prereqs: ["g4.decimal-fractions"],
    generate: (r) => {
      const n = int(r, 1, 999) / pick(r, [1, 10, 100]);
      const p = pick(r, [10, 100, 1000]);
      if (r() < 0.5) {
        return {
          prompt: `${dec(n)} × ${fmt(p)} = ?`,
          kind: "number",
          answer: dec(n * p),
          hint: `Multiplying by ${fmt(p)} moves every digit ${String(p).length - 1} place(s) to the left.`,
          explanation: `${dec(n)} × ${fmt(p)} = ${dec(n * p)}.`,
        };
      }
      return {
        prompt: `${dec(n)} ÷ ${fmt(p)} = ?`,
        kind: "number",
        answer: dec(n / p),
        hint: `Dividing by ${fmt(p)} moves every digit ${String(p).length - 1} place(s) to the right.`,
        explanation: `${dec(n)} ÷ ${fmt(p)} = ${dec(n / p)}.`,
      };
    },
  },
  {
    id: "g5.mult-multidigit",
    grade: 5,
    strand: "whole-numbers",
    title: "Multiply multi-digit whole numbers",
    code: "5.NBT.B.5",
    prereqs: ["g4.mult-multidigit"],
    generate: (r) => {
      const a = multiDigit(r, int(r, 3, 4));
      const b = multiDigit(r, 2);
      return {
        prompt: `${fmt(a)} × ${b} = ?`,
        kind: "number",
        answer: String(a * b),
        hint: `Multiply ${fmt(a)} by the ones digit, then by the tens digit (remember the zero), and add.`,
        explanation: `${fmt(a)} × ${b} = ${fmt(a * b)}.`,
      };
    },
  },
  {
    id: "g5.divide-2digit",
    grade: 5,
    strand: "whole-numbers",
    title: "Divide by 2-digit numbers",
    code: "5.NBT.B.6",
    prereqs: ["g4.long-division"],
    generate: (r) => {
      const d = int(r, 11, 49);
      const q = int(r, 12, 199);
      return {
        prompt: `${fmt(d * q)} ÷ ${d} = ?`,
        kind: "number",
        answer: String(q),
        hint: `Estimate first: about how many ${d}s fit? Round ${d} to a friendly number to guess.`,
        explanation: `${d} × ${q} = ${fmt(d * q)}, so the answer is ${q}.`,
      };
    },
  },
  {
    id: "g5.decimal-add-sub",
    grade: 5,
    strand: "decimals",
    title: "Add and subtract decimals",
    code: "5.NBT.B.7",
    prereqs: ["g4.compare-decimals", "g4.add-sub-multidigit"],
    generate: (r) => {
      const a = int(r, 100, 9999) / 100;
      const b = int(r, 10, 999) / pick(r, [10, 100]);
      if (r() < 0.5) {
        return {
          prompt: `${dec(a)} + ${dec(b)} = ?`,
          kind: "number",
          answer: dec(a + b),
          hint: "Line up the decimal points. Fill empty places with zeros.",
          explanation: `${dec(a)} + ${dec(b)} = ${dec(a + b)}.`,
        };
      }
      const [hi, lo] = a >= b ? [a, b] : [b, a];
      return {
        prompt: `${dec(hi)} − ${dec(lo)} = ?`,
        kind: "number",
        answer: dec(hi - lo),
        hint: "Line up the decimal points. Fill empty places with zeros, then subtract.",
        explanation: `${dec(hi)} − ${dec(lo)} = ${dec(hi - lo)}.`,
      };
    },
  },
  {
    id: "g5.decimal-mult-div",
    grade: 5,
    strand: "decimals",
    title: "Multiply and divide decimals",
    code: "5.NBT.B.7",
    prereqs: ["g5.decimal-add-sub", "g5.powers-of-ten"],
    generate: (r) => {
      if (r() < 0.5) {
        const a = int(r, 11, 99) / 10;
        const b = int(r, 2, 9);
        return {
          prompt: `${dec(a)} × ${b} = ?`,
          kind: "number",
          answer: dec(a * b),
          hint: `Multiply as if there were no decimal point, then put back the same number of decimal places.`,
          explanation: `${Math.round(a * 10)} × ${b} = ${Math.round(a * 10) * b}, with one decimal place: ${dec(a * b)}.`,
        };
      }
      const b = int(r, 2, 9);
      const q = int(r, 11, 99) / 10;
      const a = Number((q * b).toFixed(1));
      return {
        prompt: `${dec(a)} ÷ ${b} = ?`,
        kind: "number",
        answer: dec(q),
        hint: "Divide like whole numbers, and keep the decimal point lined up in the answer.",
        explanation: `${dec(q)} × ${b} = ${dec(a)}, so ${dec(a)} ÷ ${b} = ${dec(q)}.`,
      };
    },
  },
  {
    id: "g5.order-of-operations",
    grade: 5,
    strand: "algebra",
    title: "Order of operations with parentheses",
    code: "5.OA.A.1",
    prereqs: ["g3.mult-facts", "g3.add-sub-1000"],
    generate: (r) => {
      const a = int(r, 2, 12);
      const b = int(r, 2, 9);
      const c = int(r, 2, 9);
      const form = int(r, 0, 2);
      if (form === 0) {
        return {
          prompt: `${a} + ${b} × ${c} = ?`,
          kind: "number",
          answer: String(a + b * c),
          hint: "Multiply before you add.",
          explanation: `${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${a + b * c}.`,
        };
      }
      if (form === 1) {
        return {
          prompt: `(${a} + ${b}) × ${c} = ?`,
          kind: "number",
          answer: String((a + b) * c),
          hint: "Do what's inside the parentheses first.",
          explanation: `${a} + ${b} = ${a + b}, then ${a + b} × ${c} = ${(a + b) * c}.`,
        };
      }
      const big = b * c + a;
      return {
        prompt: `${big} − ${b} × ${c} = ?`,
        kind: "number",
        answer: String(big - b * c),
        hint: "Multiply before you subtract.",
        explanation: `${b} × ${c} = ${b * c}, then ${big} − ${b * c} = ${big - b * c}.`,
      };
    },
  },
  {
    id: "g5.add-sub-unlike",
    grade: 5,
    strand: "fractions",
    title: "Add and subtract fractions with unlike denominators",
    code: "5.NF.A.1",
    prereqs: ["g4.add-sub-fractions", "g4.equiv-fractions"],
    generate: (r) => {
      const d1 = pick(r, [2, 3, 4, 5, 6, 8]);
      let d2 = pick(r, [2, 3, 4, 5, 6, 8, 10, 12]);
      if (d2 === d1) d2 = d1 * 2;
      const n1 = int(r, 1, d1 - 1);
      const n2 = int(r, 1, d2 - 1);
      const c = lcm(d1, d2);
      const add = r() < 0.5 || n1 * d2 === n2 * d1;
      const [a, b] = add || n1 * d2 > n2 * d1 ? [[n1, d1], [n2, d2]] : [[n2, d2], [n1, d1]];
      const res = add
        ? simplify({ n: a[0] * b[1] + b[0] * a[1], d: a[1] * b[1] })
        : simplify({ n: a[0] * b[1] - b[0] * a[1], d: a[1] * b[1] });
      const sign = add ? "+" : "−";
      return {
        prompt: `${a[0]}/${a[1]} ${sign} ${b[0]}/${b[1]} = ?`,
        kind: "fraction",
        answer: fracToString(res),
        hint: `Rewrite both fractions with a common denominator, like ${c}. Then ${add ? "add" : "subtract"} the tops.`,
        explanation: `${a[0]}/${a[1]} = ${(a[0] * c) / a[1]}/${c} and ${b[0]}/${b[1]} = ${(b[0] * c) / b[1]}/${c}. ${(a[0] * c) / a[1]} ${sign} ${(b[0] * c) / b[1]} = ${add ? (a[0] * c) / a[1] + (b[0] * c) / b[1] : (a[0] * c) / a[1] - (b[0] * c) / b[1]}, so the answer is ${fracToString(res)}.`,
      };
    },
  },
  {
    id: "g5.mult-fractions",
    grade: 5,
    strand: "fractions",
    title: "Multiply fractions",
    code: "5.NF.B.4",
    prereqs: ["g4.mult-fraction-whole"],
    generate: (r) => {
      const a = { n: int(r, 1, 7), d: int(r, 2, 9) };
      const b = { n: int(r, 1, 7), d: int(r, 2, 9) };
      const res = simplify({ n: a.n * b.n, d: a.d * b.d });
      return {
        prompt: `${a.n}/${a.d} × ${b.n}/${b.d} = ?`,
        kind: "fraction",
        answer: fracToString(res),
        hint: "Multiply the tops together and the bottoms together. Simplify if you can.",
        explanation: `${a.n} × ${b.n} = ${a.n * b.n} and ${a.d} × ${b.d} = ${a.d * b.d}, so ${a.n * b.n}/${a.d * b.d} = ${fracToString(res)}.`,
      };
    },
  },
  {
    id: "g5.divide-unit-fractions",
    grade: 5,
    strand: "fractions",
    title: "Divide with unit fractions and whole numbers",
    code: "5.NF.B.7",
    prereqs: ["g5.mult-fractions"],
    generate: (r) => {
      const d = int(r, 2, 8);
      const w = int(r, 2, 9);
      if (r() < 0.5) {
        return {
          prompt: `${w} ÷ 1/${d} = ?`,
          kind: "number",
          answer: String(w * d),
          hint: `How many 1/${d}-size pieces fit in ${w} wholes? Each whole has ${d} of them.`,
          explanation: `Each whole has ${d} pieces, so ${w} wholes have ${w} × ${d} = ${w * d}.`,
        };
      }
      return {
        prompt: `1/${d} ÷ ${w} = ?`,
        kind: "fraction",
        answer: `1/${d * w}`,
        hint: `Split 1/${d} into ${w} equal parts. How big is each part?`,
        explanation: `1/${d} ÷ ${w} = 1/${d} × 1/${w} = 1/${d * w}.`,
      };
    },
  },
  {
    id: "g5.volume",
    grade: 5,
    strand: "geometry",
    title: "Volume of rectangular prisms",
    code: "5.MD.C.5",
    prereqs: ["g3.area-perimeter", "g4.mult-multidigit"],
    generate: (r) => {
      const l = int(r, 2, 12);
      const w = int(r, 2, 10);
      const h = int(r, 2, 10);
      return {
        prompt: `A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume in cubic centimeters?`,
        kind: "number",
        answer: String(l * w * h),
        hint: "Volume = length × width × height.",
        explanation: `${l} × ${w} × ${h} = ${l * w * h} cubic cm.`,
      };
    },
  },
  {
    id: "g5.coordinate-plane",
    grade: 5,
    strand: "geometry",
    title: "Points on the coordinate plane",
    code: "5.G.A.1",
    prereqs: ["g3.add-sub-1000"],
    generate: (r) => {
      const x = int(r, 0, 9);
      const y = int(r, 0, 9);
      const dx = int(r, 1, 6);
      const dy = int(r, 1, 6);
      return {
        visual: { type: "coord", points: [{ x, y, label: "start" }] },
        prompt: `Start at the point (${x}, ${y}). Move ${dx} right and ${dy} up. Where are you now?`,
        kind: "pair",
        answer: `(${x + dx}, ${y + dy})`,
        hint: "The first number is how far across (x). The second is how far up (y).",
        explanation: `${x} + ${dx} = ${x + dx} and ${y} + ${dy} = ${y + dy}, so (${x + dx}, ${y + dy}).`,
      };
    },
  },

  // ---------------- Grade 6 ----------------
  {
    id: "g6.ratios",
    grade: 6,
    strand: "ratios",
    title: "Equivalent ratios",
    code: "6.RP.A.3",
    prereqs: ["g4.equiv-fractions"],
    generate: (r) => {
      const a = int(r, 1, 9);
      const b = int(r, 2, 9);
      const k = int(r, 2, 8);
      const name = pick(r, NAMES);
      return {
        visual: { type: "tape", parts: [{ label: "flour", units: a, color: "a" }, { label: "milk", units: b, color: "b" }], caption: `Every batch: ${a} flour for ${b} milk` },
        prompt: `${name}'s recipe uses ${a} cups of flour for every ${b} cups of milk. How much flour goes with ${b * k} cups of milk?`,
        kind: "number",
        answer: String(a * k),
        hint: `How many times bigger is ${b * k} than ${b}? Scale the flour the same way.`,
        explanation: `${b * k} ÷ ${b} = ${k}, so use ${a} × ${k} = ${a * k} cups of flour.`,
      };
    },
  },
  {
    id: "g6.unit-rate",
    grade: 6,
    strand: "ratios",
    title: "Unit rates",
    code: "6.RP.A.2",
    prereqs: ["g6.ratios", "g5.divide-2digit"],
    generate: (r) => {
      const rate = int(r, 2, 15);
      const n = int(r, 3, 12);
      const item = pick(r, [
        { what: "dollars for", unit: "notebooks", ask: "How much does 1 notebook cost, in dollars?" },
        { what: "miles in", unit: "hours", ask: "How many miles per hour is that?" },
        { what: "pages in", unit: "days", ask: "How many pages per day is that?" },
      ]);
      return {
        visual: { type: "tape", parts: [{ label: `${rate * n} total`, units: n, color: "a" }], caption: `Split into ${n} equal parts` },
        prompt: `${rate * n} ${item.what} ${n} ${item.unit}. ${item.ask}`,
        kind: "number",
        answer: String(rate),
        hint: "A unit rate is the amount for 1. Divide the total by the number of units.",
        explanation: `${rate * n} ÷ ${n} = ${rate}.`,
      };
    },
  },
  {
    id: "g6.percent",
    grade: 6,
    strand: "ratios",
    title: "Find a percent of a number",
    code: "6.RP.A.3.C",
    prereqs: ["g6.ratios", "g5.decimal-mult-div"],
    generate: (r) => {
      const p = pick(r, [10, 20, 25, 30, 40, 50, 60, 75, 80, 5, 15]);
      const base = int(r, 2, 40) * (p % 10 === 0 ? 10 : 20);
      return {
        visual: { type: "percent-grid", percent: p, label: `${p} out of every 100` },
        prompt: `What is ${p}% of ${base}?`,
        kind: "number",
        answer: dec((p / 100) * base),
        hint: `${p}% means ${p} per hundred. Try finding 10% or 1% first.`,
        explanation: `${p}% of ${base} = ${p}/100 × ${base} = ${dec((p / 100) * base)}.`,
      };
    },
  },
  {
    id: "g6.divide-fractions",
    grade: 6,
    strand: "fractions",
    title: "Divide fractions by fractions",
    code: "6.NS.A.1",
    prereqs: ["g5.divide-unit-fractions"],
    generate: (r) => {
      const a = { n: int(r, 1, 8), d: int(r, 2, 9) };
      const b = { n: int(r, 1, 8), d: int(r, 2, 9) };
      const res = simplify({ n: a.n * b.d, d: a.d * b.n });
      return {
        visual: { type: "fraction-bars", bars: [{ ...a, label: "how much you have" }, { ...b, label: "size of each group" }] },
        prompt: `${a.n}/${a.d} ÷ ${b.n}/${b.d} = ?`,
        kind: "fraction",
        answer: fracToString(res),
        hint: "Keep the first fraction, change ÷ to ×, and flip the second fraction.",
        explanation: `${a.n}/${a.d} × ${b.d}/${b.n} = ${a.n * b.d}/${a.d * b.n} = ${fracToString(res)}.`,
      };
    },
  },
  {
    id: "g6.long-division",
    grade: 6,
    strand: "whole-numbers",
    title: "Fluent multi-digit division",
    code: "6.NS.B.2",
    prereqs: ["g5.divide-2digit"],
    generate: (r) => {
      const d = int(r, 12, 99);
      const q = int(r, 105, 999);
      return {
        prompt: `${fmt(d * q)} ÷ ${d} = ?`,
        kind: "number",
        answer: String(q),
        hint: "Use long division: divide, multiply, subtract, bring down. Repeat.",
        explanation: `${d} × ${q} = ${fmt(d * q)}, so the answer is ${q}.`,
      };
    },
  },
  {
    id: "g6.gcf-lcm",
    grade: 6,
    strand: "whole-numbers",
    title: "Greatest common factor and least common multiple",
    code: "6.NS.B.4",
    prereqs: ["g4.factors-primes"],
    generate: (r) => {
      const g = int(r, 2, 12);
      let a = int(r, 2, 9);
      let b = int(r, 2, 9);
      while (gcd(a, b) !== 1) b = int(r, 2, 9);
      if (a === b) a = b + 1;
      if (r() < 0.5) {
        const x = g * a;
        const y = g * b;
        return {
          prompt: `What is the greatest common factor of ${x} and ${y}?`,
          kind: "number",
          answer: String(gcd(x, y)),
          hint: "List the factors of each number, then find the biggest one they share.",
          explanation: `The biggest number that divides both ${x} and ${y} is ${gcd(x, y)}.`,
        };
      }
      const x = int(r, 2, 12);
      const y = int(r, 2, 12);
      return {
        prompt: `What is the least common multiple of ${x} and ${y}?`,
        kind: "number",
        answer: String(lcm(x, y)),
        hint: `List multiples of ${Math.max(x, y)} until you find one that ${Math.min(x, y)} also divides.`,
        explanation: `The smallest number that both ${x} and ${y} divide into is ${lcm(x, y)}.`,
      };
    },
  },
  {
    id: "g6.integers",
    grade: 6,
    strand: "whole-numbers",
    title: "Negative numbers and absolute value",
    code: "6.NS.C.7",
    prereqs: ["g3.add-sub-1000"],
    generate: (r) => {
      if (r() < 0.5) {
        const n = int(r, -50, 50);
        return {
          visual: { type: "number-line", min: -50, max: 50, marks: [{ value: n, label: String(n) }] },
          prompt: `What is the absolute value of ${n}?  ( |${n}| )`,
          kind: "number",
          answer: String(Math.abs(n)),
          hint: "Absolute value is how far a number is from 0. Distance is never negative.",
          explanation: `${n} is ${Math.abs(n)} away from 0, so |${n}| = ${Math.abs(n)}.`,
        };
      }
      const a = int(r, -20, 20);
      let b = int(r, -20, 20);
      if (b === a) b = a - 1;
      const ans = a > b ? ">" : "<";
      return {
        prompt: `Which sign makes this true?  ${a}  ?  ${b}`,
        kind: "choice",
        choices: [">", "<", "="],
        answer: ans,
        hint: "On a number line, numbers to the right are bigger. −2 is bigger than −8.",
        explanation: `${a} is to the ${ans === ">" ? "right" : "left"} of ${b} on the number line, so ${a} ${ans} ${b}.`,
      };
    },
  },
  {
    id: "g6.exponents",
    grade: 6,
    strand: "algebra",
    title: "Whole-number exponents",
    code: "6.EE.A.1",
    prereqs: ["g3.mult-facts"],
    generate: (r) => {
      const base = int(r, 2, 10);
      const exp = base <= 3 ? int(r, 2, 5) : base <= 5 ? int(r, 2, 4) : int(r, 2, 3);
      return {
        visual: { type: "power", base, exp },
        prompt: `${base}^${exp} = ?  (that's ${base} to the power of ${exp})`,
        kind: "number",
        answer: String(base ** exp),
        hint: `Multiply ${base} by itself ${exp} times.`,
        explanation: `${Array(exp).fill(base).join(" × ")} = ${base ** exp}.`,
      };
    },
  },
  {
    id: "g6.evaluate-expressions",
    grade: 6,
    strand: "algebra",
    title: "Evaluate expressions with variables",
    code: "6.EE.A.2.C",
    prereqs: ["g5.order-of-operations", "g6.exponents"],
    generate: (r) => {
      const x = int(r, 2, 9);
      const a = int(r, 2, 9);
      const b = int(r, 1, 20);
      if (r() < 0.6) {
        return {
          prompt: `If x = ${x}, what is ${a}x + ${b}?`,
          kind: "number",
          answer: String(a * x + b),
          hint: `${a}x means ${a} × x. Put ${x} in for x, multiply, then add.`,
          explanation: `${a} × ${x} + ${b} = ${a * x} + ${b} = ${a * x + b}.`,
        };
      }
      return {
        prompt: `If x = ${x}, what is x² − ${b}?`,
        kind: "number",
        answer: String(x * x - b),
        hint: "x² means x × x. Do the exponent first, then subtract.",
        explanation: `${x} × ${x} = ${x * x}, and ${x * x} − ${b} = ${x * x - b}.`,
      };
    },
  },
  {
    id: "g6.one-step-equations",
    grade: 6,
    strand: "algebra",
    title: "Solve one-step equations",
    code: "6.EE.B.7",
    prereqs: ["g6.evaluate-expressions"],
    generate: (r) => {
      const x = int(r, 2, 30);
      const a = int(r, 2, 12);
      if (r() < 0.5) {
        return {
          visual: { type: "balance", left: `x + ${a}`, right: String(x + a) },
          prompt: `Solve for x:  x + ${a} = ${x + a}`,
          kind: "number",
          answer: String(x),
          hint: `Undo the "+ ${a}" by subtracting ${a} from both sides.`,
          explanation: `x = ${x + a} − ${a} = ${x}.`,
        };
      }
      return {
        visual: { type: "balance", left: `${a}x`, right: String(a * x) },
        prompt: `Solve for x:  ${a}x = ${a * x}`,
        kind: "number",
        answer: String(x),
        hint: `Undo "× ${a}" by dividing both sides by ${a}.`,
        explanation: `x = ${a * x} ÷ ${a} = ${x}.`,
      };
    },
  },
  {
    id: "g6.area-triangles",
    grade: 6,
    strand: "geometry",
    title: "Area of triangles and parallelograms",
    code: "6.G.A.1",
    prereqs: ["g4.area-perimeter-missing"],
    generate: (r) => {
      const b = int(r, 2, 20);
      const h = int(r, 2, 15);
      if (r() < 0.6) {
        return {
          visual: { type: "shape", shape: "triangle", base: `${b} in`, height: `${h} in` },
          prompt: `A triangle has a base of ${b} in and a height of ${h} in. What is its area in square inches?`,
          kind: "number",
          answer: dec((b * h) / 2),
          hint: "A triangle is half of a rectangle. Area = ½ × base × height.",
          explanation: `½ × ${b} × ${h} = ${dec((b * h) / 2)} square inches.`,
        };
      }
      return {
        visual: { type: "shape", shape: "parallelogram", base: `${b} m`, height: `${h} m` },
        prompt: `A parallelogram has a base of ${b} m and a height of ${h} m. What is its area in square meters?`,
        kind: "number",
        answer: String(b * h),
        hint: "Cut off the slanted end and move it over: it becomes a rectangle. Area = base × height.",
        explanation: `${b} × ${h} = ${b * h} square meters.`,
      };
    },
  },
  {
    id: "g6.mean-median",
    grade: 6,
    strand: "data",
    title: "Mean, median and range",
    code: "6.SP.B.5",
    prereqs: ["g5.divide-2digit"],
    generate: (r) => {
      const count = pick(r, [5, 5, 7]);
      const vals = Array.from({ length: count }, () => int(r, 1, 30));
      const which = int(r, 0, 2);
      const sorted = [...vals].sort((a, b) => a - b);
      if (which === 0) {
        // Make the mean a whole number by adjusting the last value.
        const sum = vals.reduce((s, v) => s + v, 0);
        const fix = (count - (sum % count)) % count;
        vals[vals.length - 1] += fix;
        const mean = vals.reduce((s, v) => s + v, 0) / count;
        return {
          visual: { type: "bars", values: [...vals] },
          prompt: `Find the mean (average) of: ${vals.join(", ")}`,
          kind: "number",
          answer: String(mean),
          hint: "Add all the numbers, then divide by how many numbers there are.",
          explanation: `The sum is ${mean * count}. ${mean * count} ÷ ${count} = ${mean}.`,
        };
      }
      if (which === 1) {
        const med = sorted[(count - 1) / 2];
        return {
          visual: { type: "bars", values: [...vals] },
          prompt: `Find the median of: ${vals.join(", ")}`,
          kind: "number",
          answer: String(med),
          hint: "Put the numbers in order from least to greatest. The median is the middle one.",
          explanation: `In order: ${sorted.join(", ")}. The middle number is ${med}.`,
        };
      }
      return {
        visual: { type: "bars", values: [...vals] },
        prompt: `Find the range of: ${vals.join(", ")}`,
        kind: "number",
        answer: String(sorted[count - 1] - sorted[0]),
        hint: "Range = biggest number − smallest number.",
        explanation: `${sorted[count - 1]} − ${sorted[0]} = ${sorted[count - 1] - sorted[0]}.`,
      };
    },
  },

  // ---------------- Grade 7 ----------------
  {
    id: "g7.integer-add-sub",
    grade: 7,
    strand: "whole-numbers",
    title: "Add and subtract positive and negative numbers",
    code: "7.NS.A.1",
    prereqs: ["g6.integers"],
    generate: (r) => {
      const a = int(r, -25, 25);
      const b = int(r, -25, 25);
      const show = (n: number) => (n < 0 ? `(${n})` : String(n));
      if (r() < 0.5) {
        return {
          visual: { type: "number-line", min: -50, max: 50, marks: [{ value: a, label: "start" }] },
          prompt: `${a} + ${show(b)} = ?`,
          kind: "number",
          answer: String(a + b),
          hint: "Adding a negative is like moving left on the number line.",
          explanation: `${a} + ${show(b)} = ${a + b}.`,
        };
      }
      return {
        visual: { type: "number-line", min: -50, max: 50, marks: [{ value: a, label: "start" }] },
        prompt: `${a} − ${show(b)} = ?`,
        kind: "number",
        answer: String(a - b),
        hint: "Subtracting a number is the same as adding its opposite.",
        explanation: `${a} − ${show(b)} = ${a} + ${show(-b)} = ${a - b}.`,
      };
    },
  },
  {
    id: "g7.integer-mult-div",
    grade: 7,
    strand: "whole-numbers",
    title: "Multiply and divide positive and negative numbers",
    code: "7.NS.A.2",
    prereqs: ["g7.integer-add-sub", "g3.div-facts"],
    generate: (r) => {
      const a = int(r, 2, 12) * pick(r, [1, -1]);
      const b = int(r, 2, 12) * pick(r, [1, -1]);
      const show = (n: number) => (n < 0 ? `(${n})` : String(n));
      if (r() < 0.5) {
        return {
          prompt: `${a} × ${show(b)} = ?`,
          kind: "number",
          answer: String(a * b),
          hint: "Same signs give a positive answer. Different signs give a negative answer.",
          explanation: `${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}, and the sign is ${a * b > 0 ? "positive" : "negative"}: ${a * b}.`,
        };
      }
      return {
        prompt: `${a * b} ÷ ${show(b)} = ?`,
        kind: "number",
        answer: String(a),
        hint: "Same signs give a positive answer. Different signs give a negative answer.",
        explanation: `${Math.abs(a * b)} ÷ ${Math.abs(b)} = ${Math.abs(a)}, and the sign is ${a > 0 ? "positive" : "negative"}: ${a}.`,
      };
    },
  },
  {
    id: "g7.proportions",
    grade: 7,
    strand: "ratios",
    title: "Solve proportions",
    code: "7.RP.A.2",
    prereqs: ["g6.unit-rate"],
    generate: (r) => {
      const a = int(r, 2, 9);
      const b = int(r, 2, 12);
      const k = int(r, 2, 9);
      return {
        prompt: `Solve for x:  ${a}/${b} = x/${b * k}`,
        kind: "number",
        answer: String(a * k),
        hint: `What do you multiply ${b} by to get ${b * k}? Do the same to the top.`,
        explanation: `${b} × ${k} = ${b * k}, so x = ${a} × ${k} = ${a * k}.`,
      };
    },
  },
  {
    id: "g7.percent-problems",
    grade: 7,
    strand: "ratios",
    title: "Discounts, tax and percent change",
    code: "7.RP.A.3",
    prereqs: ["g6.percent"],
    generate: (r) => {
      const price = int(r, 2, 40) * 5;
      const p = pick(r, [10, 20, 25, 30, 40, 50]);
      if (r() < 0.5) {
        const sale = price - (price * p) / 100;
        return {
          visual: { type: "price-tag", price, badge: `${p}% OFF` },
          prompt: `A jacket costs $${price}. It is on sale for ${p}% off. What is the sale price, in dollars?`,
          kind: "number",
          answer: dec(sale),
          hint: `Find ${p}% of $${price}, then subtract it from the price.`,
          explanation: `${p}% of ${price} is ${dec((price * p) / 100)}. ${price} − ${dec((price * p) / 100)} = ${dec(sale)}.`,
        };
      }
      const t = pick(r, [5, 8, 10]);
      const total = price + (price * t) / 100;
      return {
        visual: { type: "price-tag", price, badge: `+${t}% tax` },
        prompt: `A game costs $${price}. Sales tax is ${t}%. What is the total cost, in dollars?`,
        kind: "number",
        answer: dec(total),
        hint: `Find ${t}% of $${price}, then add it to the price.`,
        explanation: `${t}% of ${price} is ${dec((price * t) / 100)}. ${price} + ${dec((price * t) / 100)} = ${dec(total)}.`,
      };
    },
  },
  {
    id: "g7.combine-like-terms",
    grade: 7,
    strand: "algebra",
    title: "Simplify expressions by combining like terms",
    code: "7.EE.A.1",
    prereqs: ["g6.evaluate-expressions", "g7.integer-add-sub"],
    generate: (r) => {
      const a = int(r, 1, 9);
      const b = int(r, 1, 9) * pick(r, [1, -1]);
      const c = int(r, 1, 15);
      const d = int(r, 1, 15) * pick(r, [1, -1]);
      const term = (n: number, x = "") => (n < 0 ? ` − ${Math.abs(n)}${x}` : ` + ${n}${x}`);
      const coef = a + b;
      const cons = c + d;
      const ans = `${coef === 0 ? "" : `${coef}x`}${cons === 0 ? "" : coef === 0 ? String(cons) : term(cons)}` || "0";
      return {
        prompt: `Simplify:  ${a}x + ${c}${term(b, "x")}${term(d)}`,
        kind: "expr",
        answer: ans,
        hint: "Put the x terms together and the plain numbers together.",
        explanation: `x terms: ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${coef}. Numbers: ${c} ${d < 0 ? "−" : "+"} ${Math.abs(d)} = ${cons}. Answer: ${ans}.`,
      };
    },
  },
  {
    id: "g7.two-step-equations",
    grade: 7,
    strand: "algebra",
    title: "Solve two-step equations",
    code: "7.EE.B.4.A",
    prereqs: ["g6.one-step-equations", "g7.integer-add-sub"],
    generate: (r) => {
      const x = int(r, -10, 15);
      const a = int(r, 2, 9);
      const b = int(r, -20, 20);
      const rhs = a * x + b;
      const bTxt = b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`;
      return {
        visual: { type: "balance", left: `${a}x ${bTxt}`, right: String(rhs) },
        prompt: `Solve for x:  ${a}x ${bTxt} = ${rhs}`,
        kind: "number",
        answer: String(x),
        hint: `First undo the ${b < 0 ? "subtraction" : "addition"}, then undo the multiplication.`,
        explanation: `${a}x = ${rhs} ${b < 0 ? "+" : "−"} ${Math.abs(b)} = ${a * x}, so x = ${a * x} ÷ ${a} = ${x}.`,
      };
    },
  },
  {
    id: "g7.circles",
    grade: 7,
    strand: "geometry",
    title: "Circumference and area of circles",
    code: "7.G.B.4",
    prereqs: ["g5.decimal-mult-div", "g6.exponents"],
    generate: (r) => {
      const rad = int(r, 1, 12);
      if (r() < 0.5) {
        const c = 2 * 3.14 * rad;
        return {
          visual: { type: "circle", radius: `${rad} cm` },
          prompt: `A circle has a radius of ${rad} cm. Using π ≈ 3.14, what is its circumference in cm?`,
          kind: "number",
          answer: dec(c),
          tolerance: 0.011,
          hint: "Circumference = 2 × π × radius.",
          explanation: `2 × 3.14 × ${rad} = ${dec(c)} cm.`,
        };
      }
      const a = 3.14 * rad * rad;
      return {
        visual: { type: "circle", radius: `${rad} cm` },
        prompt: `A circle has a radius of ${rad} cm. Using π ≈ 3.14, what is its area in square cm?`,
        kind: "number",
        answer: dec(a),
        tolerance: 0.011,
        hint: "Area = π × radius × radius.",
        explanation: `3.14 × ${rad} × ${rad} = ${dec(a)} square cm.`,
      };
    },
  },
  {
    id: "g7.probability",
    grade: 7,
    strand: "data",
    title: "Probability of simple events",
    code: "7.SP.C.5",
    prereqs: ["g4.equiv-fractions"],
    generate: (r) => {
      const red = int(r, 1, 8);
      const blue = int(r, 1, 8);
      const green = int(r, 0, 6);
      const total = red + blue + green;
      const color = pick(r, ["red", "blue"]);
      const n = color === "red" ? red : blue;
      return {
        visual: { type: "marbles", groups: [{ color: "red", count: red }, { color: "blue", count: blue }, { color: "green", count: green }] },
        prompt: `A bag has ${red} red, ${blue} blue${green ? ` and ${green} green` : ""} marbles. You pick one without looking. What is the probability it is ${color}? (Give a fraction.)`,
        kind: "fraction",
        answer: fracToString({ n, d: total }),
        hint: "Probability = (number of ways to get what you want) ÷ (total number of outcomes).",
        explanation: `There are ${n} ${color} marbles out of ${total}, so the probability is ${n}/${total}${gcd(n, total) > 1 ? ` = ${fracToString({ n, d: total })}` : ""}.`,
      };
    },
  },

  // ---------------- Grade 8 (stretch) ----------------
  {
    id: "g8.exponent-rules",
    grade: 8,
    strand: "algebra",
    title: "Exponent rules",
    code: "8.EE.A.1",
    prereqs: ["g6.exponents", "g7.integer-add-sub"],
    generate: (r) => {
      const base = int(r, 2, 9);
      const a = int(r, 2, 9);
      const b = int(r, 2, 9);
      if (r() < 0.5) {
        return {
          prompt: `${base}^${a} × ${base}^${b} = ${base}^?`,
          kind: "number",
          answer: String(a + b),
          hint: "When you multiply powers with the same base, add the exponents.",
          explanation: `${a} + ${b} = ${a + b}, so it's ${base}^${a + b}.`,
        };
      }
      const [hi, lo] = a >= b ? [a + 1, b] : [b + 1, a];
      return {
        prompt: `${base}^${hi} ÷ ${base}^${lo} = ${base}^?`,
        kind: "number",
        answer: String(hi - lo),
        hint: "When you divide powers with the same base, subtract the exponents.",
        explanation: `${hi} − ${lo} = ${hi - lo}, so it's ${base}^${hi - lo}.`,
      };
    },
  },
  {
    id: "g8.slope",
    grade: 8,
    strand: "algebra",
    title: "Slope from two points",
    code: "8.F.B.4",
    prereqs: ["g7.integer-mult-div", "g5.coordinate-plane", "g4.equiv-fractions"],
    generate: (r) => {
      const x1 = int(r, -5, 5);
      const y1 = int(r, -5, 5);
      let dx = int(r, -6, 6);
      if (dx === 0) dx = 2;
      const dy = int(r, -8, 8);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      const m = simplify({ n: dy, d: dx });
      return {
        visual: { type: "coord", points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], line: true },
        prompt: `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,
        kind: "fraction",
        answer: fracToString(m),
        hint: "Slope = (change in y) ÷ (change in x) = (y₂ − y₁) / (x₂ − x₁).",
        explanation: `(${y2} − ${y1}) / (${x2} − ${x1}) = ${dy}/${dx} = ${fracToString(m)}.`,
      };
    },
  },
  {
    id: "g8.pythagorean",
    grade: 8,
    strand: "geometry",
    title: "Pythagorean theorem",
    code: "8.G.B.7",
    prereqs: ["g6.exponents", "g6.one-step-equations"],
    generate: (r) => {
      const [a0, b0, c0] = pick(r, [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
      ]);
      const k = a0 === 3 ? int(r, 1, 4) : 1;
      const [a, b, c] = [a0 * k, b0 * k, c0 * k];
      if (r() < 0.6) {
        return {
          visual: { type: "right-triangle", a: String(a), b: String(b), c: "?" },
          prompt: `A right triangle has legs of ${a} and ${b}. How long is the hypotenuse?`,
          kind: "number",
          answer: String(c),
          hint: "a² + b² = c². Square both legs, add, then take the square root.",
          explanation: `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, and √${c * c} = ${c}.`,
        };
      }
      return {
        visual: { type: "right-triangle", a: String(a), b: "?", c: String(c) },
        prompt: `A right triangle has a hypotenuse of ${c} and one leg of ${a}. How long is the other leg?`,
        kind: "number",
        answer: String(b),
        hint: "a² + b² = c². Subtract the known leg squared from the hypotenuse squared.",
        explanation: `${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}, and √${b * b} = ${b}.`,
      };
    },
  },
  {
    id: "g8.multi-step-equations",
    grade: 8,
    strand: "algebra",
    title: "Equations with variables on both sides",
    code: "8.EE.C.7",
    prereqs: ["g7.two-step-equations", "g7.combine-like-terms"],
    generate: (r) => {
      const x = int(r, -8, 12);
      const a = int(r, 3, 9);
      let c = int(r, 1, 8);
      if (c === a) c = a - 1;
      const b = int(r, -15, 15);
      const d = a * x + b - c * x;
      const s = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);
      return {
        visual: { type: "balance", left: `${a}x ${s(b)}`, right: `${c}x ${s(d)}` },
        prompt: `Solve for x:  ${a}x ${s(b)} = ${c}x ${s(d)}`,
        kind: "number",
        answer: String(x),
        hint: "Move the x terms to one side and the numbers to the other, then divide.",
        explanation: `${a}x − ${c}x = ${d} − (${b}) → ${a - c}x = ${d - b} → x = ${x}.`,
      };
    },
  },
];

export const SKILL_BY_ID: Map<string, Skill> = new Map(SKILLS.map((s) => [s.id, s]));

export function getSkill(id: string): Skill | undefined {
  return SKILL_BY_ID.get(id);
}

/** All prerequisites of a skill, recursively. */
export function allPrereqs(id: string, seen = new Set<string>()): Set<string> {
  for (const p of SKILL_BY_ID.get(id)?.prereqs ?? []) {
    if (!seen.has(p)) {
      seen.add(p);
      allPrereqs(p, seen);
    }
  }
  return seen;
}

/** Skills in a strand, easiest first (by grade, then list order). */
export function strandChain(strand: Strand): Skill[] {
  return SKILLS.filter((s) => s.strand === strand).sort((a, b) => a.grade - b.grade);
}
