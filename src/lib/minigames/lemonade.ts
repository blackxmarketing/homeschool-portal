import { rng } from "../pixel/grid";
import type { Band } from "../pixel/world";

/**
 * Lemonade Stand (Merchant Harbor). Each day: check the forecast, make some
 * cups (supplies cost money), set a price, and sell. Hot days and fair prices
 * bring more customers; unsold lemonade is thrown away at night. Reach the
 * profit goal by the last day. Teaches cost, revenue, profit, demand and risk.
 *
 * Pure and repeatable (seeded), so it can be tested and checked.
 */

export type Weather = "hot" | "sunny" | "cloudy" | "rainy";

export const WEATHER: Record<Weather, { label: string; icon: string; demand: number }> = {
  hot: { label: "Hot", icon: "🔥", demand: 60 },
  sunny: { label: "Sunny", icon: "☀️", demand: 42 },
  cloudy: { label: "Cloudy", icon: "☁️", demand: 24 },
  rainy: { label: "Rainy", icon: "🌧️", demand: 10 },
};

export interface LemonadeLevel {
  id: string;
  title: string;
  days: number;
  startCash: number;
  /** Cost to make one cup. */
  cupCost: number;
  goal: number;
  seed: number;
  /** Highest price customers will pay at all. */
  maxPrice: number;
  intro: string;
}

export const LEMONADE_LEVELS: Record<Band, LemonadeLevel[]> = {
  sprout: [
    { id: "s1", title: "First Stand", days: 3, startCash: 10, cupCost: 0.25, goal: 10, seed: 11, maxPrice: 2, intro: "Each cup costs 25¢ to make. Make enough for your customers, set a fair price, and earn $10 profit in 3 days." },
    { id: "s2", title: "Summer Week", days: 5, startCash: 10, cupCost: 0.25, goal: 40, seed: 23, maxPrice: 2, intro: "Watch the weather! Hot days bring lots of thirsty customers. Earn $40 in 5 days." },
    { id: "s3", title: "Rainy Risk", days: 5, startCash: 8, cupCost: 0.4, goal: 45, seed: 37, maxPrice: 2.5, intro: "Lemons cost more now (40¢ a cup) and rain is coming. Don't make cups nobody will buy!" },
  ],
  adventurer: [
    { id: "a1", title: "Opening Week", days: 5, startCash: 15, cupCost: 0.35, goal: 40, seed: 101, maxPrice: 2.5, intro: "Each cup costs 35¢. Earn $40 profit in 5 days." },
    { id: "a2", title: "Price Wars", days: 7, startCash: 15, cupCost: 0.5, goal: 80, seed: 202, maxPrice: 3, intro: "Higher price = more profit per cup but fewer customers. Find the sweet spot. Earn $80 in a week." },
    { id: "a3", title: "Storm Season", days: 7, startCash: 12, cupCost: 0.6, goal: 80, seed: 303, maxPrice: 3, intro: "Storms are rolling in and cups cost 60¢. Manage your risk to earn $80." },
  ],
  strategist: [
    { id: "h1", title: "Margins", days: 7, startCash: 20, cupCost: 0.55, goal: 80, seed: 404, maxPrice: 3.5, intro: "Unit cost $0.55. Maximize (price − cost) × cups sold each day. Target: $80 profit in 7 days." },
    { id: "h2", title: "Forecast Risk", days: 10, startCash: 20, cupCost: 0.7, goal: 140, seed: 505, maxPrice: 4, intro: "Ten days, rising costs, unpredictable weather. Every unsold cup is pure loss. Target: $140." },
    { id: "h3", title: "Tight Capital", days: 10, startCash: 8, cupCost: 0.8, goal: 110, seed: 606, maxPrice: 4, intro: "Only $8 to start and $0.80 a cup. You can't make more cups than you can pay for. Grow carefully to $110." },
  ],
};

export function levelById(id: string): LemonadeLevel | undefined {
  return Object.values(LEMONADE_LEVELS).flat().find((l) => l.id === id);
}

/** The forecast for every day of a level (the same each time it's played). */
export function forecast(level: LemonadeLevel): Weather[] {
  const r = rng(level.seed);
  const pool: Weather[] = ["hot", "sunny", "sunny", "cloudy", "cloudy", "rainy"];
  return Array.from({ length: level.days }, () => pool[Math.floor(r() * pool.length)]);
}

/** How many customers want a cup at this price in this weather. */
export function demand(weather: Weather, price: number, maxPrice: number): number {
  if (price <= 0) return WEATHER[weather].demand;
  const appetite = Math.max(0, 1 - price / maxPrice);
  return Math.round(WEATHER[weather].demand * appetite * 1.4);
}

export interface DayResult {
  day: number;
  weather: Weather;
  made: number;
  price: number;
  wanted: number;
  sold: number;
  revenue: number;
  cost: number;
  profit: number;
  cash: number;
}

const money = (n: number) => Math.round(n * 100) / 100;

/** Plays one day. Making cups is limited by the cash on hand. */
export function playDay(level: LemonadeLevel, day: number, cash: number, made: number, price: number): DayResult {
  const weather = forecast(level)[day];
  const affordable = Math.floor(cash / level.cupCost + 1e-9);
  const cups = Math.max(0, Math.min(Math.floor(made), affordable, 200));
  const p = Math.max(0, Math.min(10, money(price)));
  const wanted = demand(weather, p, level.maxPrice);
  const sold = Math.min(cups, wanted);
  const revenue = money(sold * p);
  const cost = money(cups * level.cupCost);
  return { day, weather, made: cups, price: p, wanted, sold, revenue, cost, profit: money(revenue - cost), cash: money(cash - cost + revenue) };
}

/** Replays a whole game from the kid's choices (the server uses this to check the score). */
export function replay(level: LemonadeLevel, choices: { made: number; price: number }[]): { days: DayResult[]; profit: number; stars: number } {
  let cash = level.startCash;
  const days: DayResult[] = [];
  for (let d = 0; d < level.days; d++) {
    const c = choices[d] ?? { made: 0, price: 0 };
    const r = playDay(level, d, cash, c.made, c.price);
    cash = r.cash;
    days.push(r);
  }
  const profit = money(cash - level.startCash);
  return { days, profit, stars: starsFor(profit, level.goal) };
}

export function starsFor(profit: number, goal: number): number {
  return profit >= goal * 1.8 ? 3 : profit >= goal * 1.35 ? 2 : profit >= goal ? 1 : 0;
}

/** The best possible profit (for tests and hints): best price and cups each day. */
export function bestPossible(level: LemonadeLevel): number {
  let cash = level.startCash;
  for (let d = 0; d < level.days; d++) {
    let best = { cash, made: 0, price: 0 };
    for (let cents = 5; cents <= level.maxPrice * 100; cents += 5) {
      const price = cents / 100;
      const wanted = demand(forecast(level)[d], price, level.maxPrice);
      const r = playDay(level, d, cash, wanted, price);
      if (r.cash > best.cash) best = { cash: r.cash, made: wanted, price };
    }
    cash = best.cash;
  }
  return money(cash - level.startCash);
}
