import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Coin Shop (K-5 math, grades 2 and 3). The kid runs the village shop.
 * Each round is one customer:
 *   - pay:     tap pennies, nickels, dimes, quarters and bills into the tray
 *              to pay an exact price (some rounds: with the fewest coins),
 *   - count:   count a customer's mixed coins and type the total,
 *   - change:  a customer pays with $1, $5 or $10; count up from the price
 *              and put the change in the tray,
 *   - add:     add the prices of two or three things,
 *   - compare: tap the basket that costs more and say how much more,
 *   - budget:  pick things that fit what the customer has, then say what's left.
 * A try that's right the first time earns 2 points, a later try 1 point.
 * Wrong tries explain why and let the kid try again (up to MAX_TRIES).
 *
 * Pure (no randomness at all), so the server can replay the kid's moves.
 */

export const coinShopInfo = {
  id: "coinshop",
  title: "Coin Shop",
  icon: "🪙",
  land: "math" as const,
  subject: "math" as const,
  grades: [2,3],
  blurb: "Run the village shop: pay with the right coins and give back change.",
};

export const MAX_TRIES = 3;

/** U.S. coins and bills, in cents. */
export const COINS = [1, 5, 10, 25] as const;
export const BILLS = [100, 500, 1000] as const;
export const ALL_MONEY = [...COINS, ...BILLS] as const;

export const MONEY_NAME: Record<number, { one: string; many: string }> = {
  1: { one: "penny", many: "pennies" },
  5: { one: "nickel", many: "nickels" },
  10: { one: "dime", many: "dimes" },
  25: { one: "quarter", many: "quarters" },
  100: { one: "dollar bill", many: "dollar bills" },
  500: { one: "five-dollar bill", many: "five-dollar bills" },
  1000: { one: "ten-dollar bill", many: "ten-dollar bills" },
};

export interface Item {
  name: string;
  emoji: string;
  price: number;
}

export type CoinRound =
  | { kind: "pay"; items: Item[]; story?: string; fewest?: boolean }
  | { kind: "count"; coins: number[]; story?: string }
  | { kind: "change"; items: Item[]; paid: number; story?: string }
  | { kind: "add"; items: Item[]; story?: string }
  | { kind: "compare"; a: Item[]; b: Item[] }
  | { kind: "budget"; budget: number; need: number; shelf: Item[] };

export interface CoinLevel extends MiniLevel {
  grade: number;
  /** The coins and bills in the shop's cash drawer for this level. */
  money: number[];
  rounds: CoinRound[];
}

const it = (name: string, emoji: string, price: number): Item => ({ name, emoji, price });

const G2_COINS = [1, 5, 10];
const G2_QUARTERS = [1, 5, 10, 25];
const WITH_DOLLAR = [1, 5, 10, 25, 100];

export const COIN_LEVELS: Record<number, CoinLevel[]> = {
  2: [
    {
      grade: 2,
      id: "g2-1",
      title: "Pennies, Nickels, Dimes",
      intro: "Skill: count pennies (1¢), nickels (5¢) and dimes (10¢), and pay an exact price (2.MD.C.8). Count the big coins first, then count on!",
      money: G2_COINS,
      rounds: [
        { kind: "count", coins: [10, 5, 1, 1], story: "A customer pays with these coins. How much money is it?" },
        { kind: "pay", items: [it("apple", "🍎", 12)] },
        { kind: "count", coins: [10, 10, 5, 5, 1] },
        { kind: "pay", items: [it("pencil", "✏️", 25)] },
        { kind: "count", coins: [1, 10, 5, 10, 1, 10, 1] },
        { kind: "pay", items: [it("bunch of carrots", "🥕", 46)] },
      ],
    },
    {
      grade: 2,
      id: "g2-2",
      title: "Quarter Power",
      intro: "Skill: count mixed coins with quarters (25¢) and pay with the fewest coins (2.MD.C.8). One quarter is worth 25 pennies!",
      money: G2_QUARTERS,
      rounds: [
        { kind: "count", coins: [25, 10, 10, 5] },
        { kind: "pay", items: [it("cookie", "🍪", 35)], fewest: true },
        { kind: "count", coins: [25, 25, 10, 1, 1] },
        { kind: "pay", items: [it("juice box", "🧃", 60)], fewest: true },
        { kind: "count", coins: [10, 25, 5, 25, 1, 10], story: "These coins are all mixed up. Put the biggest first in your head, then count on." },
        { kind: "pay", items: [it("balloon", "🎈", 41)], fewest: true },
        { kind: "pay", items: [it("notebook", "📒", 90)], fewest: true },
      ],
    },
    {
      grade: 2,
      id: "g2-3",
      title: "Dollars and Cents",
      intro: "Skill: solve money word problems with dollar bills and coins, using $ and ¢ (2.MD.C.8). A dollar is 100¢.",
      money: WITH_DOLLAR,
      rounds: [
        { kind: "count", coins: [100, 25, 25, 10], story: "Count the money. A dollar bill is 100¢." },
        { kind: "pay", items: [it("juice box", "🧃", 45), it("cookie", "🍪", 30)], story: "Ben wants a juice box for 45¢ and a cookie for 30¢. Pay for both." },
        { kind: "count", coins: [100, 100, 25, 25, 25], story: "Sam has 2 dollar bills and 3 quarters. How much money does Sam have?" },
        { kind: "pay", items: [it("kite", "🪁", 135)], fewest: true },
        { kind: "count", coins: [10, 10, 10, 5, 5, 5, 5], story: "Lia has 3 dimes and 4 nickels. How much money does she have?" },
        { kind: "pay", items: [it("pencil", "✏️", 65), it("eraser", "🧽", 50)], story: "Max buys a pencil for 65¢ and an eraser for 50¢. Pay for both." },
        { kind: "pay", items: [it("storybook", "📘", 180)], fewest: true },
      ],
    },
  ],
  3: [
    {
      grade: 3,
      id: "g3-1",
      title: "Count Up for Change",
      intro: "Skill: make change from $1 by counting up from the price (3.NBT.A.2). Start at the price and add coins until you reach what the customer paid.",
      money: WITH_DOLLAR,
      rounds: [
        { kind: "change", items: [it("apple", "🍎", 65)], paid: 100 },
        { kind: "change", items: [it("juice box", "🧃", 80)], paid: 100 },
        { kind: "change", items: [it("pencil", "✏️", 45)], paid: 100 },
        { kind: "add", items: [it("cookie", "🍪", 35), it("juice box", "🧃", 40)] },
        { kind: "change", items: [it("pear", "🍐", 72)], paid: 100 },
        { kind: "change", items: [it("crayons", "🖍️", 37)], paid: 100 },
        { kind: "change", items: [it("yo-yo", "🪀", 115)], paid: 200, story: "A yo-yo costs $1.15. The customer pays with two dollar bills. Give the change." },
      ],
    },
    {
      grade: 3,
      id: "g3-2",
      title: "Add It Up",
      intro: "Skill: add prices and make change from $5 (3.NBT.A.2). Add the dollars, then the cents; 100¢ makes one more dollar.",
      money: [...WITH_DOLLAR, 500],
      rounds: [
        { kind: "add", items: [it("notebook", "📒", 125), it("paint set", "🎨", 250)] },
        { kind: "change", items: [it("notebook", "📒", 125), it("paint set", "🎨", 250)], paid: 500, story: "The notebook and paint set cost $3.75 together. The customer pays with a five-dollar bill. Give the change." },
        { kind: "add", items: [it("loaf of bread", "🍞", 145), it("cheese", "🧀", 210), it("apple", "🍎", 65)] },
        { kind: "compare", a: [it("ball", "⚽", 120), it("kite", "🪁", 85)], b: [it("storybook", "📘", 150), it("socks", "🧦", 40)] },
        { kind: "change", items: [it("socks", "🧦", 260)], paid: 500 },
        { kind: "add", items: [it("teddy bear", "🧸", 175), it("storybook", "📘", 225), it("pear", "🍐", 60)] },
        { kind: "change", items: [it("paint set", "🎨", 415)], paid: 500 },
      ],
    },
    {
      grade: 3,
      id: "g3-3",
      title: "Shopkeeper Pro",
      intro: "Skill: two-step money problems: budgets, comparing and change from $10 (3.OA.D.8). Find the total first, then subtract.",
      money: [...WITH_DOLLAR, 500, 1000],
      rounds: [
        {
          kind: "budget",
          budget: 500,
          need: 3,
          shelf: [it("ball", "⚽", 225), it("kite", "🪁", 175), it("storybook", "📘", 150), it("yo-yo", "🪀", 95), it("paint set", "🎨", 310)],
        },
        { kind: "change", items: [it("paint set", "🎨", 645)], paid: 1000 },
        { kind: "compare", a: [it("loaf of bread", "🍞", 235), it("cheese", "🧀", 340), it("carrots", "🥕", 90)], b: [it("storybook", "📘", 425), it("socks", "🧦", 175)] },
        { kind: "add", items: [it("teddy bear", "🧸", 425), it("crayons", "🖍️", 180), it("kite", "🪁", 295)] },
        { kind: "change", items: [it("kite", "🪁", 275), it("ball", "⚽", 430)], paid: 1000, story: "A kite costs $2.75 and a ball costs $4.30. The customer pays with a ten-dollar bill. Add first, then give the change." },
        {
          kind: "budget",
          budget: 1000,
          need: 4,
          shelf: [it("teddy bear", "🧸", 350), it("storybook", "📘", 275), it("kite", "🪁", 225), it("paint set", "🎨", 410), it("ball", "⚽", 195), it("crayons", "🖍️", 120)],
        },
        { kind: "change", items: [it("big atlas", "🗺️", 899)], paid: 1000 },
      ],
    },
  ],
};

export const ALL_COIN_LEVELS: CoinLevel[] = Object.values(COIN_LEVELS).flat();

export const levelById = (id: string): CoinLevel | undefined => ALL_COIN_LEVELS.find((l) => l.id === id);

// ---------------- Money math ----------------

export const sum = (xs: number[]) => xs.reduce((s, n) => s + n, 0);
export const priceOf = (items: Item[]) => sum(items.map((i) => i.price));

/** 45 → "45¢", 135 → "$1.35". */
export const fmt = (c: number) => (c < 100 ? `${c}¢` : `$${(c / 100).toFixed(2)}`);

/** One coin or bill as a label: "25¢", "$1". */
export const label = (d: number) => (d >= 100 ? `$${d / 100}` : `${d}¢`);

/** Fewest coins and bills for an amount (greedy works for U.S. money), biggest first. */
export function fewestCoins(amount: number, money: readonly number[]): number[] {
  const ds = [...money].sort((a, b) => b - a);
  const out: number[] = [];
  let left = amount;
  for (const d of ds)
    while (left >= d) {
      out.push(d);
      left -= d;
    }
  return left === 0 ? out : [];
}

/** "25 + 25 + 10 = 60¢", or with bills "$1 + 25¢ + 10¢ = $1.35". Biggest first. */
export function sumLine(coins: number[]): string {
  if (coins.length === 0) return "0¢";
  const s = [...coins].sort((a, b) => b - a);
  const bills = s.some((d) => d >= 100);
  const parts = s.map((d) => (bills ? label(d) : String(d)));
  return `${parts.join(" + ")} = ${fmt(sum(s))}`;
}

/** Counting up from the price to what was paid, small coins first: "65¢ → 75¢ → $1.00". */
export function countUp(price: number, paid: number, money: readonly number[]): { coins: number[]; steps: number[] } {
  const coins = fewestCoins(paid - price, money).reverse();
  const steps = [price];
  for (const c of coins) steps.push(steps[steps.length - 1] + c);
  return { coins, steps };
}

export function countUpLine(price: number, paid: number, money: readonly number[]): string {
  const { coins, steps } = countUp(price, paid, money);
  const hops = coins.map((c, i) => `+${label(c)} → ${fmt(steps[i + 1])}`);
  return `Start at ${fmt(price)}. ${hops.join(", ")}. Change: ${fmt(paid - price)}.`;
}

/** Every way to pick `need` different things from the shelf that fits the budget. */
export function budgetPicks(r: Extract<CoinRound, { kind: "budget" }>): number[][] {
  const out: number[][] = [];
  const walk = (start: number, chosen: number[]) => {
    if (chosen.length === r.need) {
      if (sum(chosen.map((i) => r.shelf[i].price)) <= r.budget) out.push(chosen);
      return;
    }
    for (let i = start; i < r.shelf.length; i++) walk(i + 1, [...chosen, i]);
  };
  walk(0, []);
  return out;
}

/** The total the kid works toward in this round (for add/count/pay/change). */
export function targetOf(r: CoinRound): number {
  switch (r.kind) {
    case "pay":
    case "add":
      return priceOf(r.items);
    case "count":
      return sum(r.coins);
    case "change":
      return r.paid - priceOf(r.items);
    case "compare":
      return Math.abs(priceOf(r.a) - priceOf(r.b));
    case "budget":
      return r.budget;
  }
}

/** Which basket costs more in a compare round (0 = A, 1 = B). */
export const moreOf = (r: Extract<CoinRound, { kind: "compare" }>) => (priceOf(r.a) > priceOf(r.b) ? 0 : 1);

// ---------------- Words (shown and read aloud) ----------------

const names = (items: Item[]) =>
  items.length === 1 ? `a ${items[0].name}` : items.length === 2 ? `a ${items[0].name} and a ${items[1].name}` : `${items.slice(0, -1).map((i) => `a ${i.name}`).join(", ")} and a ${items[items.length - 1].name}`;

/** The round's question. */
export function promptFor(_level: CoinLevel, r: CoinRound): string {
  switch (r.kind) {
    case "pay": {
      const p = priceOf(r.items);
      const base = r.story ?? `The ${r.items[0].name} costs ${fmt(p)}. Tap coins into the tray to pay exactly ${fmt(p)}.`;
      return r.fewest ? `${base} Use the fewest coins you can.` : base;
    }
    case "count":
      return r.story ?? "A customer pays with these coins. How much money is it? Count the biggest coins first.";
    case "change": {
      const p = priceOf(r.items);
      return r.story ?? `The ${r.items[0].name} costs ${fmt(p)}. The customer pays with ${r.paid === 100 ? "a dollar bill" : r.paid === 500 ? "a five-dollar bill" : r.paid === 1000 ? "a ten-dollar bill" : fmt(r.paid)}. Count up from ${fmt(p)} to ${fmt(r.paid)} to make the change.`;
    }
    case "add":
      return r.story ?? `A customer buys ${names(r.items)}. What is the total cost?`;
    case "compare":
      return "Which basket costs more? Tap it, then type how much more it costs.";
    case "budget":
      return `A customer has ${fmt(r.budget)} and wants ${r.need} different things. Pick ${r.need} things that fit the budget, then type how much money is left.`;
  }
}

/** Money written for reading aloud: "$1.35" → "1 dollar and 35 cents", "45¢" → "45 cents". */
export function speakable(text: string): string {
  return text
    .replace(/\$(\d+)\.(\d{2})/g, (_, d: string, c: string) => {
      const dn = Number(d);
      const cn = Number(c);
      const dw = dn ? `${dn} dollar${dn === 1 ? "" : "s"}` : "";
      const cw = cn ? `${cn} cent${cn === 1 ? "" : "s"}` : "";
      return dw && cw ? `${dw} and ${cw}` : dw || cw || "0 dollars";
    })
    .replace(/\$(\d+)/g, (_, d: string) => `${d} dollar${d === "1" ? "" : "s"}`)
    .replace(/(\d+)¢/g, (_, c: string) => `${c} cent${c === "1" ? "" : "s"}`)
    .replace(/→/g, "makes")
    .replace(/\+/g, "plus")
    .replace(/−/g, "minus");
}

/** The worked answer, shown when the round is over. */
export function teachFor(level: CoinLevel, r: CoinRound): string[] {
  switch (r.kind) {
    case "pay": {
      const p = priceOf(r.items);
      const lines = r.items.length > 1 ? [`${r.items.map((i) => fmt(i.price)).join(" + ")} = ${fmt(p)}`] : [];
      lines.push(`Fewest coins: ${sumLine(fewestCoins(p, level.money))}`);
      return lines;
    }
    case "count":
      return [`Biggest first, then count on: ${sumLine(r.coins)}`];
    case "change": {
      const p = priceOf(r.items);
      const lines = r.items.length > 1 ? [`${r.items.map((i) => fmt(i.price)).join(" + ")} = ${fmt(p)}`] : [];
      lines.push(countUpLine(p, r.paid, level.money));
      return lines;
    }
    case "add":
      return [`${r.items.map((i) => fmt(i.price)).join(" + ")} = ${fmt(priceOf(r.items))}`];
    case "compare": {
      const a = priceOf(r.a);
      const b = priceOf(r.b);
      const [hi, lo] = a > b ? [a, b] : [b, a];
      return [
        `Basket A: ${r.a.map((i) => fmt(i.price)).join(" + ")} = ${fmt(a)}`,
        `Basket B: ${r.b.map((i) => fmt(i.price)).join(" + ")} = ${fmt(b)}`,
        `${fmt(hi)} − ${fmt(lo)} = ${fmt(hi - lo)}. Basket ${a > b ? "A" : "B"} costs ${fmt(hi - lo)} more.`,
      ];
    }
    case "budget": {
      const pick = budgetPicks(r)[0] ?? [];
      const t = sum(pick.map((i) => r.shelf[i].price));
      return [`One way: ${pick.map((i) => fmt(r.shelf[i].price)).join(" + ")} = ${fmt(t)}. ${fmt(r.budget)} − ${fmt(t)} = ${fmt(r.budget - t)} left.`];
    }
  }
}

// ---------------- Tries ----------------

/** One answer from the kid. Which fields count depends on the round. */
export interface Try {
  /** Coins and bills in the tray (pay, change). */
  coins?: number[];
  /** A typed amount in cents (count, add, compare, budget). */
  amount?: number;
  /** The basket that costs more (compare): 0 = A, 1 = B. */
  pick?: number;
  /** Shelf items picked (budget). */
  items?: number[];
}

export interface RoundMove {
  tries: Try[];
}

export interface TryCheck {
  ok: boolean;
  /** Teaching feedback for this try. */
  note: string;
}

const okMoney = (level: CoinLevel, coins: number[] | undefined): coins is number[] => Array.isArray(coins) && coins.every((c) => level.money.includes(c));
const okAmount = (a: unknown): a is number => typeof a === "number" && Number.isInteger(a) && a >= 0 && a <= 100000;

function trayNote(have: number, want: number, coins: number[], what: string): string {
  if (coins.length === 0) return `The tray is empty. Tap coins to add ${fmt(want)}.`;
  if (have < want) return `${sumLine(coins)}. That's ${fmt(want - have)} too little; add ${fmt(want - have)} more to make ${what}.`;
  return `${sumLine(coins)}. That's ${fmt(have - want)} too much; tap a coin in the tray to take it back. You need ${what}.`;
}

/** Checks one try. Never throws. */
export function checkTry(level: CoinLevel, r: CoinRound, t: Try): TryCheck {
  switch (r.kind) {
    case "pay": {
      if (!okMoney(level, t.coins)) return { ok: false, note: "Use the coins and bills from the cash drawer." };
      const want = priceOf(r.items);
      const have = sum(t.coins);
      if (have !== want) return { ok: false, note: trayNote(have, want, t.coins, `exactly ${fmt(want)}`) };
      const best = fewestCoins(want, level.money).length;
      if (r.fewest && t.coins.length > best)
        return {
          ok: false,
          note: `${sumLine(t.coins)}: the right amount! But you used ${t.coins.length} coins, and it can be done with ${best}. Trade small coins for bigger ones (5 pennies = 1 nickel, 2 dimes + 1 nickel = 1 quarter).`,
        };
      return { ok: true, note: `${sumLine(t.coins)}. Exactly right!${r.fewest || t.coins.length === best ? " Fewest coins, too." : ""}` };
    }
    case "change": {
      if (!okMoney(level, t.coins)) return { ok: false, note: "Use the coins and bills from the cash drawer." };
      const p = priceOf(r.items);
      const want = r.paid - p;
      const have = sum(t.coins);
      if (have !== want) {
        const reached = p + have;
        const lead = t.coins.length === 0 ? "The tray is empty." : `Counting up: ${fmt(p)} + ${fmt(have)} = ${fmt(reached)}.`;
        return {
          ok: false,
          note: reached < r.paid ? `${lead} You still need to reach ${fmt(r.paid)}: add ${fmt(r.paid - reached)} more.` : `${lead} That goes past ${fmt(r.paid)} by ${fmt(reached - r.paid)}; take some back.`,
        };
      }
      return { ok: true, note: `${fmt(p)} + ${fmt(want)} = ${fmt(r.paid)}. The change is ${fmt(want)}!` };
    }
    case "count": {
      if (!okAmount(t.amount)) return { ok: false, note: "Type how much money it is." };
      const want = sum(r.coins);
      if (t.amount === want) return { ok: true, note: `${sumLine(r.coins)}. You counted it right!` };
      return {
        ok: false,
        note: `Not ${fmt(t.amount)}. Tap the coins biggest first and count on: ${[...r.coins].sort((a, b) => b - a).slice(0, 2).map(label).join(", then ")}…`,
      };
    }
    case "add": {
      if (!okAmount(t.amount)) return { ok: false, note: "Type the total cost." };
      const want = priceOf(r.items);
      if (t.amount === want) return { ok: true, note: `${r.items.map((i) => fmt(i.price)).join(" + ")} = ${fmt(want)}. Right!` };
      return { ok: false, note: `Not ${fmt(t.amount)}. Add the dollars first, then the cents. If the cents make 100 or more, that's one more dollar.` };
    }
    case "compare": {
      const a = priceOf(r.a);
      const b = priceOf(r.b);
      const more = moreOf(r);
      if (t.pick !== 0 && t.pick !== 1) return { ok: false, note: "Tap the basket that costs more." };
      if (t.pick !== more) return { ok: false, note: `Add up each basket first. Basket ${t.pick === 0 ? "A" : "B"} costs ${fmt(t.pick === 0 ? a : b)}. What does the other one cost?` };
      if (!okAmount(t.amount)) return { ok: false, note: "Now type how much more it costs." };
      const diff = Math.abs(a - b);
      if (t.amount === diff) return { ok: true, note: `${fmt(Math.max(a, b))} − ${fmt(Math.min(a, b))} = ${fmt(diff)}. Right!` };
      return { ok: false, note: `Right basket! But not ${fmt(t.amount)} more. Subtract: ${fmt(Math.max(a, b))} − ${fmt(Math.min(a, b))}. Try counting up from the smaller total.` };
    }
    case "budget": {
      const items = t.items;
      if (!Array.isArray(items) || items.length !== r.need || new Set(items).size !== items.length || !items.every((i) => Number.isInteger(i) && i >= 0 && i < r.shelf.length))
        return { ok: false, note: `Pick ${r.need} different things.` };
      const total = sum(items.map((i) => r.shelf[i].price));
      const line = `${items.map((i) => fmt(r.shelf[i].price)).join(" + ")} = ${fmt(total)}`;
      if (total > r.budget) return { ok: false, note: `${line}. That's more than ${fmt(r.budget)}. Swap something for a cheaper thing.` };
      if (!okAmount(t.amount)) return { ok: false, note: `${line}. Now type how much is left.` };
      if (t.amount !== r.budget - total) return { ok: false, note: `${line}, and that fits! But not ${fmt(t.amount)} left. Subtract: ${fmt(r.budget)} − ${fmt(total)}.` };
      return { ok: true, note: `${line}. ${fmt(r.budget)} − ${fmt(total)} = ${fmt(r.budget - total)} left. Smart shopping!` };
    }
  }
}

// ---------------- Moves and scoring ----------------

const cleanInt = (v: unknown, lo: number, hi: number): number | undefined => (typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi ? v : undefined);

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const tries = Array.isArray(o.tries) ? o.tries.slice(0, MAX_TRIES) : [];
    return {
      tries: tries.map((x) => {
        const t = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
        const out: Try = {};
        // A bad coin becomes -1, which no level accepts, so the try fails.
        if (Array.isArray(t.coins)) out.coins = t.coins.slice(0, 60).map((c) => cleanInt(c, 1, 1000) ?? -1);
        const amount = cleanInt(t.amount, 0, 100000);
        if (amount !== undefined) out.amount = amount;
        const pick = cleanInt(t.pick, 0, 1);
        if (pick !== undefined) out.pick = pick;
        if (Array.isArray(t.items)) out.items = t.items.slice(0, 12).map((i) => cleanInt(i, 0, 50) ?? -1);
        return out;
      }),
    };
  });
}

export interface RoundResult {
  /** Which try was right (0-based), or -1. */
  rightOn: number;
  /** 2 for right on the first try, 1 for a later try, 0 if never. */
  points: number;
}

export const POINTS_PER_ROUND = 2;

export function scoreRound(level: CoinLevel, r: CoinRound, move: RoundMove | undefined): RoundResult {
  const tries = move?.tries.slice(0, MAX_TRIES) ?? [];
  const rightOn = tries.findIndex((t) => checkTry(level, r, t).ok);
  return { rightOn, points: rightOn === 0 ? 2 : rightOn > 0 ? 1 : 0 };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: CoinLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(level, r, moves[i]));
  const points = sum(rounds.map((r) => r.points));
  const max = level.rounds.length * POINTS_PER_ROUND;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** The right answer for a round (for tests and as a worked example). */
export function solveRound(level: CoinLevel, r: CoinRound): Try {
  switch (r.kind) {
    case "pay":
      return { coins: fewestCoins(priceOf(r.items), level.money) };
    case "change":
      return { coins: countUp(priceOf(r.items), r.paid, level.money).coins };
    case "count":
    case "add":
      return { amount: targetOf(r) };
    case "compare":
      return { pick: moreOf(r), amount: targetOf(r) };
    case "budget": {
      const items = budgetPicks(r)[0] ?? [];
      return { items, amount: r.budget - sum(items.map((i) => r.shelf[i].price)) };
    }
  }
}

export const perfectMoves = (level: CoinLevel): RoundMove[] => level.rounds.map((r) => ({ tries: [solveRound(level, r)] }));

// ---------------- Pixel art ----------------

const OUTLINE = "#1b1530";

const COIN_LOOK: Record<number, { size: number; face: string; rim: string; hi: string; reeded: boolean }> = {
  1: { size: 13, face: "#c8743a", rim: "#9a4f22", hi: "#eba06a", reeded: false },
  5: { size: 14, face: "#b6bcc6", rim: "#848b98", hi: "#e1e5ec", reeded: false },
  10: { size: 12, face: "#cdd2da", rim: "#959ca8", hi: "#f2f4f7", reeded: true },
  25: { size: 16, face: "#c3c8d1", rim: "#8b919e", hi: "#eceff4", reeded: true },
};

/** A U.S. coin, drawn to scale with the others (dime smallest, quarter biggest). */
export function coinGrid(d: number): Grid {
  const look = COIN_LOOK[d] ?? COIN_LOOK[1];
  const s = look.size;
  const g = new Grid(s, s);
  const c = (s - 1) / 2;
  const R = s / 2 - 1;
  for (let y = 0; y < s; y++)
    for (let x = 0; x < s; x++) {
      const dist = Math.hypot(x - c, y - c);
      if (dist > R + 0.3) continue;
      if (dist > R - 1.1) {
        // Dimes and quarters have ridged ("reeded") edges.
        g.set(x, y, look.reeded && (x + y) % 2 ? look.hi : look.rim);
        continue;
      }
      // light from the top left
      const lit = x - c + (y - c) < -R * 0.9;
      g.set(x, y, lit ? look.hi : look.face);
    }
  // A simple raised design in the middle: a small dome.
  g.disc(c + 0.5, c + 0.5, Math.max(1.2, R * 0.38), look.rim);
  g.set(Math.floor(c), Math.floor(c), look.hi);
  return g.outline(OUTLINE);
}

const BILL_TINT: Record<number, { paper: string; ink: string; mark: string }> = {
  100: { paper: "#d4e6c3", ink: "#4f7a4a", mark: "#9cc28d" },
  500: { paper: "#ddd6ea", ink: "#5a5486", mark: "#b2a9d1" },
  1000: { paper: "#eedfc6", ink: "#8a6234", mark: "#d6b98c" },
};

/** A paper bill: border, corner numbers (as blocks) and an oval in the middle. */
export function billGrid(d: number): Grid {
  const t = BILL_TINT[d] ?? BILL_TINT[100];
  const w = 30;
  const h = 14;
  const g = new Grid(w, h);
  g.rect(0, 0, w, h, t.ink);
  g.rect(1, 1, w - 2, h - 2, t.paper);
  g.rect(2, 2, w - 4, 1, t.mark).rect(2, h - 3, w - 4, 1, t.mark);
  // corner value blocks
  for (const [x, y] of [
    [3, 4],
    [w - 6, 4],
    [3, h - 7],
    [w - 6, h - 7],
  ])
    g.rect(x, y, 3, 3, t.mark);
  // center oval
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const e = ((x - cx) / 5) ** 2 + ((y - cy) / 4.2) ** 2;
      if (e <= 1) g.set(x, y, e > 0.62 ? t.ink : t.mark);
    }
  return g.outline(OUTLINE);
}

export const moneyGrid = (d: number) => (d >= 100 ? billGrid(d) : coinGrid(d));

/** The shop's striped awning (royal blue and white) with a scalloped edge. */
export function awningGrid(w = 72): Grid {
  const h = 9;
  const g = new Grid(w, h);
  for (let x = 0; x < w; x++) {
    const blue = Math.floor(x / 6) % 2 === 0;
    const col = blue ? "#2340ff" : "#ffffff";
    const scallop = Math.abs((x % 6) - 2.5) < 2 ? 1 : 0;
    for (let y = 0; y < h - 2 + scallop; y++) g.set(x, y, y === 0 ? "#1a2fbf" : col);
  }
  return g;
}

/** The wooden counter the money goes on. */
export function counterGrid(w = 64): Grid {
  const h = 6;
  const g = new Grid(w, h);
  g.rect(0, 0, w, 2, "#e0a868");
  g.rect(0, 2, w, h - 2, "#b97a3e");
  for (let x = 3; x < w; x += 8) g.rect(x, 3, 1, h - 3, "#9a6230");
  return g;
}

export const coinShop: MiniGame = {
  ...coinShopInfo,
  levels: () => [],
  levelsForGrade: (grade) => (COIN_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
