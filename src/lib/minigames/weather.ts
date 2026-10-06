import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Weather Watch (K-5 science, grades K and 3). The village weather station.
 *
 * Kindergarten (K-ESS2-1, K-ESS3-2):
 *   record - look at each day's sky picture and put its symbol on the chart
 *   count  - sort the days on a weather chart into columns, then find the
 *            most (or fewest) common weather, or how many days of one kind
 *   dress  - dress the pixel kid for the weather
 *   storm  - thunder roars: tap the safe place to go
 *   kit    - pack the storm kit before a storm comes
 * Grade 3 (3-ESS2-1, 3-ESS2-2, 3-ESS3-1):
 *   graph   - build a bar graph from a data table
 *   read    - read a table or bar graph (most, least, how much more, total)
 *   predict - use a season pattern to predict the next season's bar
 *   climate - match places to their climates (from clues or from data)
 *   design  - test designs against a weather hazard, then pick the best one
 *
 * Every round is checked by checkAnswer(); a round's move is the list of
 * answers the kid tried (up to 3). 2 points for right on the first try,
 * 1 for right on a later try, 0 otherwise. Pure (no randomness), so the
 * server can replay the moves.
 */

export const weatherWatchInfo = {
  id: "weather",
  title: "Weather Watch",
  icon: "🌦️",
  land: "science" as const,
  subject: "sci" as const,
  grades: [0, 3],
  blurb: "Read the sky and the weather data, then get the village ready.",
};

// ---------------- Weather, clothes, places ----------------

export type Weather = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
export const WEATHERS: Weather[] = ["sunny", "cloudy", "rainy", "snowy", "windy"];
export const WEATHER_INFO: Record<Weather, { name: string; emoji: string; clue: string }> = {
  sunny: { name: "sunny", emoji: "☀️", clue: "The sun is shining in a blue sky." },
  cloudy: { name: "cloudy", emoji: "☁️", clue: "Gray clouds cover the sun, but nothing is falling." },
  rainy: { name: "rainy", emoji: "☔", clue: "Raindrops are falling from the clouds." },
  snowy: { name: "snowy", emoji: "❄️", clue: "White snowflakes are falling and the ground is white." },
  windy: { name: "windy", emoji: "💨", clue: "The tree bends and the leaves blow sideways." },
};

export type ItemId = "sunhat" | "sunglasses" | "raincoat" | "rainboots" | "umbrella" | "wintercoat" | "mittens" | "beanie" | "jacket";
export const ITEMS: ItemId[] = ["sunhat", "sunglasses", "raincoat", "rainboots", "umbrella", "wintercoat", "mittens", "beanie", "jacket"];
export const ITEM_INFO: Record<ItemId, { name: string; for: Weather; why: string }> = {
  sunhat: { name: "sun hat", for: "sunny", why: "A sun hat shades your face from the hot sun." },
  sunglasses: { name: "sunglasses", for: "sunny", why: "Sunglasses keep bright sunlight out of your eyes." },
  raincoat: { name: "raincoat", for: "rainy", why: "A raincoat keeps your body dry." },
  rainboots: { name: "rain boots", for: "rainy", why: "Rain boots keep your feet dry in puddles." },
  umbrella: { name: "umbrella", for: "rainy", why: "An umbrella keeps the rain off your head." },
  wintercoat: { name: "winter coat", for: "snowy", why: "A puffy winter coat keeps you warm in the cold." },
  mittens: { name: "mittens", for: "snowy", why: "Mittens keep your fingers warm in the snow." },
  beanie: { name: "warm hat", for: "snowy", why: "A warm hat keeps heat from leaving your head." },
  jacket: { name: "jacket", for: "windy", why: "A zip-up jacket blocks the chilly wind." },
};
/** A hint for a missing piece of clothing. */
const ITEM_ASK: Record<ItemId, string> = {
  sunhat: "What will shade your face from the sun?",
  sunglasses: "What will keep bright light out of your eyes?",
  raincoat: "What will keep your body dry?",
  rainboots: "What will keep your feet dry in puddles?",
  umbrella: "What will keep the rain off your head?",
  wintercoat: "What will keep your body warm?",
  mittens: "What will keep your fingers warm?",
  beanie: "What will keep your head warm?",
  jacket: "What will block the chilly wind?",
};

/** What to wear for each weather (exactly these). */
export const DRESS_FOR: Record<Exclude<Weather, "cloudy">, ItemId[]> = {
  sunny: ["sunhat", "sunglasses"],
  rainy: ["raincoat", "rainboots", "umbrella"],
  snowy: ["wintercoat", "mittens", "beanie"],
  windy: ["jacket"],
};

export type KitId = "flashlight" | "water" | "batteries" | "firstaid" | "kite" | "ball" | "icecream" | "sunglasses";
export const KIT: KitId[] = ["flashlight", "kite", "water", "ball", "batteries", "icecream", "firstaid", "sunglasses"];
export const KIT_INFO: Record<KitId, { name: string; emoji: string; need: boolean; why: string }> = {
  flashlight: { name: "flashlight", emoji: "🔦", need: true, why: "A flashlight helps you see if the power goes out." },
  water: { name: "water", emoji: "💧", need: true, why: "Clean water to drink is important in a storm." },
  batteries: { name: "batteries", emoji: "🔋", need: true, why: "Extra batteries keep the flashlight and radio working." },
  firstaid: { name: "first-aid kit", emoji: "🩹", need: true, why: "A first-aid kit helps if someone gets a scrape." },
  kite: { name: "kite", emoji: "🪁", need: false, why: "Never fly a kite in a storm!" },
  ball: { name: "ball", emoji: "⚽", need: false, why: "A ball is for playing, not for storms." },
  icecream: { name: "ice cream", emoji: "🍦", need: false, why: "Ice cream melts if the power goes out." },
  sunglasses: { name: "sunglasses", emoji: "🕶️", need: false, why: "Sunglasses are for sunny days, not storms." },
};

export type PlaceId = "house" | "school" | "car" | "tree" | "slide" | "pool" | "tent" | "field";
export const PLACE_INFO: Record<PlaceId, { name: string; emoji: string; safe: boolean; why: string }> = {
  house: { name: "house", emoji: "🏠", safe: true, why: "A house with walls and a roof keeps you safe from lightning." },
  school: { name: "school", emoji: "🏫", safe: true, why: "A big building like a school keeps you safe from lightning." },
  car: { name: "car", emoji: "🚗", safe: true, why: "A car with a hard metal roof is safe, with the windows shut." },
  tree: { name: "tall tree", emoji: "🌳", safe: false, why: "Lightning often hits tall things like trees. Never hide under a tree!" },
  slide: { name: "playground", emoji: "🛝", safe: false, why: "A playground is out in the open. Lightning can strike there." },
  pool: { name: "pool", emoji: "🏊", safe: false, why: "Get out of the water! Lightning can travel through water." },
  tent: { name: "tent", emoji: "⛺", safe: false, why: "A tent has thin cloth walls. It can't keep lightning out." },
  field: { name: "open field", emoji: "🌾", safe: false, why: "In an open field, you are the tallest thing around. That's not safe." },
};

// ---------------- Grade 3 data ----------------

export interface DataSet {
  title: string;
  /** Unit, like "inches" or "°F". */
  unit: string;
  labels: string[];
  values: number[];
  /** Top of the graph scale and the step between lines. */
  max: number;
  step: number;
}

export type ReadAsk = { kind: "max" } | { kind: "min" } | { kind: "diff"; a: number; b: number } | { kind: "total" };

export type ClimateId = "rainforest" | "desert" | "polar" | "temperate";
export const CLIMATES: ClimateId[] = ["rainforest", "desert", "polar", "temperate"];
export const CLIMATE_INFO: Record<ClimateId, { name: string; emoji: string; text: string }> = {
  rainforest: { name: "Tropical rainforest", emoji: "🌴", text: "Hot and wet all year. Lots of rain." },
  desert: { name: "Desert", emoji: "🌵", text: "Very dry. Hot days, cool nights." },
  polar: { name: "Polar", emoji: "🧊", text: "Freezing cold all year. Ice and snow." },
  temperate: { name: "Temperate", emoji: "🍂", text: "Four seasons: warm summers, cold winters." },
};

export interface Place {
  name: string;
  emoji: string;
  climate: ClimateId;
  /** Average temperature of the warmest and coldest month (°F), and rain + melted snow per year (inches). */
  warm: number;
  cold: number;
  rain: number;
  clue: string;
}

export interface Design {
  id: string;
  name: string;
  emoji: string;
  /** The biggest hazard it survives (same units as the trials). */
  holds: number;
  /** How much it costs to build (smaller is better). */
  cost: number;
  costLabel: string;
}

export interface DesignTest {
  hazard: "flood" | "lightning" | "wind";
  goal: string;
  trialName: string;
  trials: { label: string; value: number }[];
  designs: Design[];
}

// ---------------- Rounds ----------------

export type WeatherRound =
  | { kind: "record"; days: Weather[] }
  | { kind: "count"; days: Weather[]; ask: "most" | "fewest" | Weather }
  | { kind: "dress"; weather: Exclude<Weather, "cloudy">; forecast?: boolean }
  | { kind: "storm"; places: PlaceId[] }
  | { kind: "kit" }
  | { kind: "graph"; data: DataSet }
  | { kind: "read"; data: DataSet; show: "table" | "graph"; ask: ReadAsk }
  | { kind: "predict"; data: DataSet; period: number; next: string; why: string }
  | { kind: "climate"; places: Place[]; useData: boolean }
  | { kind: "design"; test: DesignTest };

export type RoundKind = WeatherRound["kind"];

export interface WeatherLevel extends MiniLevel {
  grade: number;
  rounds: WeatherRound[];
}

export const MAX_TRIES = 3;

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];
/** The label of day i on a chart (weekdays for a school week, Day 1... for longer charts). */
export const dayLabel = (n: number, i: number) => (n <= 5 ? WEEK[i] : `Day ${i + 1}`);
export const DAY_NAMES: Record<string, string> = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday" };
const dayName = (n: number, i: number) => DAY_NAMES[dayLabel(n, i)] ?? dayLabel(n, i);

const S: Weather = "sunny";
const C: Weather = "cloudy";
const R: Weather = "rainy";
const N: Weather = "snowy";
const W: Weather = "windy";

const APRIL_RAIN: DataSet = { title: "Rain in April", unit: "inches", labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [3, 1, 4, 2], max: 5, step: 1 };
const MAY_HIGHS: DataSet = { title: "High temperature each day", unit: "°F", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], values: [60, 65, 55, 70, 75], max: 80, step: 5 };
const MARCH_SNOW: DataSet = { title: "Snow in March", unit: "inches", labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [8, 5, 2, 0], max: 10, step: 1 };

const SEASONS = ["Win", "Spr", "Sum", "Fall"];
const seasonLabels = (years: number, extra: number) =>
  Array.from({ length: years * 4 + extra }, (_, i) => `${SEASONS[i % 4]} ${Math.floor(i / 4) + 1}`);
const SEASON_TEMPS: DataSet = {
  title: "Average temperature each season",
  unit: "°F",
  labels: seasonLabels(2, 4),
  values: [30, 55, 80, 55, 35, 50, 85, 60, 30, 55, 80],
  max: 100,
  step: 5,
};
const SEASON_RAIN: DataSet = {
  title: "Rain each season",
  unit: "inches",
  labels: seasonLabels(2, 3),
  values: [6, 12, 4, 8, 5, 13, 5, 9, 6, 12],
  max: 15,
  step: 1,
};
const SEASON_SNOW: DataSet = {
  title: "Snow each season",
  unit: "inches",
  labels: seasonLabels(2, 1),
  values: [20, 4, 0, 2, 24, 2, 0, 4],
  max: 30,
  step: 2,
};
const YEAR_TEMPS_READ: DataSet = { title: "Average temperature each season, Year 1", unit: "°F", labels: ["Winter", "Spring", "Summer", "Fall"], values: [30, 55, 80, 55], max: 100, step: 5 };

const PLACES_1: Place[] = [
  { name: "Amazon rainforest, Brazil", emoji: "🦜", climate: "rainforest", warm: 84, cold: 81, rain: 90, clue: "Hot and steamy every month, with rain almost every day." },
  { name: "Sahara Desert, Africa", emoji: "🐪", climate: "desert", warm: 99, cold: 57, rain: 1, clue: "Sand dunes and very little rain. Scorching days, chilly nights." },
  { name: "Antarctica", emoji: "🐧", climate: "polar", warm: 27, cold: -16, rain: 8, clue: "Covered in thick ice. Below freezing even in summer." },
  { name: "Ohio, USA", emoji: "🍁", climate: "temperate", warm: 75, cold: 29, rain: 40, clue: "Snow in winter, flowers in spring, warm summers, colorful fall leaves." },
];
const PLACES_2: Place[] = [
  { name: "Mojave Desert, USA", emoji: "🦎", climate: "desert", warm: 102, cold: 54, rain: 2, clue: "" },
  { name: "England", emoji: "🏰", climate: "temperate", warm: 65, cold: 42, rain: 24, clue: "" },
  { name: "Congo rainforest, Africa", emoji: "🦍", climate: "rainforest", warm: 79, cold: 77, rain: 68, clue: "" },
  { name: "Greenland ice sheet", emoji: "🐻‍❄️", climate: "polar", warm: 10, cold: -40, rain: 9, clue: "" },
];

const FLOOD_1: DesignTest = {
  hazard: "flood",
  goal: "Keep the village dry in every flood, using as little wall as you can.",
  trialName: "Past floods",
  trials: [
    { label: "Flood A", value: 4 },
    { label: "Flood B", value: 6 },
    { label: "Flood C", value: 5 },
    { label: "Flood D", value: 7 },
  ],
  designs: [
    { id: "wall3", name: "3-foot wall", emoji: "🧱", holds: 3, cost: 3, costLabel: "3 ft of wall" },
    { id: "wall5", name: "5-foot wall", emoji: "🧱", holds: 5, cost: 5, costLabel: "5 ft of wall" },
    { id: "wall8", name: "8-foot wall", emoji: "🧱", holds: 8, cost: 8, costLabel: "8 ft of wall" },
    { id: "wall12", name: "12-foot wall", emoji: "🧱", holds: 12, cost: 12, costLabel: "12 ft of wall" },
  ],
};
const FLOOD_2: DesignTest = {
  hazard: "flood",
  goal: "The river is bigger now. Stop every flood with the least wall.",
  trialName: "Past floods",
  trials: [
    { label: "Flood A", value: 6 },
    { label: "Flood B", value: 9 },
    { label: "Flood C", value: 7 },
    { label: "Flood D", value: 11 },
    { label: "Flood E", value: 8 },
  ],
  designs: [
    { id: "wall8b", name: "8-foot wall", emoji: "🧱", holds: 8, cost: 8, costLabel: "8 ft of wall" },
    { id: "wall10", name: "10-foot wall", emoji: "🧱", holds: 10, cost: 10, costLabel: "10 ft of wall" },
    { id: "wall12b", name: "12-foot wall", emoji: "🧱", holds: 12, cost: 12, costLabel: "12 ft of wall" },
    { id: "wall15", name: "15-foot wall", emoji: "🧱", holds: 15, cost: 15, costLabel: "15 ft of wall" },
  ],
};
const LIGHTNING: DesignTest = {
  hazard: "lightning",
  goal: "Protect the barn: lightning should go safely into the ground every time.",
  trialName: "Model lightning strikes",
  trials: [
    { label: "Small", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Big", value: 3 },
    { label: "Huge", value: 4 },
  ],
  designs: [
    { id: "none", name: "No rod", emoji: "🏚️", holds: 0, cost: 0, costLabel: "nothing" },
    { id: "plastic", name: "Plastic rod and cord", emoji: "🥢", holds: 0, cost: 1, costLabel: "$" },
    { id: "thin", name: "Metal rod, thin wire", emoji: "📍", holds: 2, cost: 2, costLabel: "$$" },
    { id: "thick", name: "Metal rod, thick copper cable to the ground", emoji: "⚡", holds: 4, cost: 3, costLabel: "$$$" },
  ],
};
const SHELTER: DesignTest = {
  hazard: "wind",
  goal: "Build a storm shelter that stays standing in every storm, for the lowest cost.",
  trialName: "Wind tests (miles per hour)",
  trials: [
    { label: "65 mph", value: 65 },
    { label: "110 mph", value: 110 },
    { label: "150 mph", value: 150 },
    { label: "200 mph", value: 200 },
  ],
  designs: [
    { id: "tent", name: "Tent", emoji: "⛺", holds: 30, cost: 1, costLabel: "$" },
    { id: "shed", name: "Wood shed", emoji: "🛖", holds: 75, cost: 2, costLabel: "$$" },
    { id: "cellar", name: "Underground concrete storm cellar", emoji: "🕳️", holds: 250, cost: 3, costLabel: "$$$" },
    { id: "bunker", name: "Steel bunker", emoji: "🛡️", holds: 250, cost: 5, costLabel: "$$$$$" },
  ],
};

const lvl = (grade: number, id: string, title: string, intro: string, rounds: WeatherRound[]): WeatherLevel => ({ grade, id, title, intro, rounds });

export const WEATHER_LEVELS: Record<number, WeatherLevel[]> = {
  0: [
    lvl(0, "k-1", "Sky Watcher", "Skill: noticing the weather (K-ESS2-1). Look at the sky, put the right picture on the chart, and dress for the day!", [
      { kind: "record", days: [S, R, C] },
      { kind: "dress", weather: "sunny" },
      { kind: "record", days: [N, W, S] },
      { kind: "dress", weather: "rainy" },
      { kind: "count", days: [S, S, R, S, C], ask: "most" },
      { kind: "storm", places: ["tree", "house", "slide"] },
    ]),
    lvl(0, "k-2", "Weather Chart", "Skill: finding weather patterns (K-ESS2-1). Fill in the weather chart, then count which weather came the most.", [
      { kind: "record", days: [C, R, R, S, W] },
      { kind: "count", days: [S, R, R, C, R, S, R], ask: "rainy" },
      { kind: "dress", weather: "snowy" },
      { kind: "record", days: [N, N, C, S, N] },
      { kind: "count", days: [C, S, C, S, C, W, C], ask: "most" },
      { kind: "count", days: [S, S, R, S, W, S, R, S, R, S], ask: "fewest" },
      { kind: "dress", weather: "windy" },
    ]),
    lvl(0, "k-3", "Storm Ready", "Skill: getting ready for storms (K-ESS3-2). When thunder roars, go indoors! Pack a storm kit and dress for the forecast.", [
      { kind: "storm", places: ["pool", "tree", "school", "slide"] },
      { kind: "kit" },
      { kind: "dress", weather: "rainy", forecast: true },
      { kind: "count", days: [R, R, W, R, C, R, W, R, C, R], ask: "windy" },
      { kind: "storm", places: ["tent", "field", "tree", "car"] },
      { kind: "dress", weather: "snowy", forecast: true },
      { kind: "record", days: [W, R, N, C, S] },
    ]),
  ],
  3: [
    lvl(3, "g3-1", "Read the Weather Data", "Skill: showing weather data in tables and bar graphs (3-ESS2-1). Build the graphs, then read them to answer questions.", [
      { kind: "graph", data: APRIL_RAIN },
      { kind: "read", data: APRIL_RAIN, show: "graph", ask: { kind: "max" } },
      { kind: "read", data: APRIL_RAIN, show: "graph", ask: { kind: "diff", a: 2, b: 1 } },
      { kind: "graph", data: MAY_HIGHS },
      { kind: "read", data: MAY_HIGHS, show: "table", ask: { kind: "min" } },
      { kind: "read", data: MAY_HIGHS, show: "graph", ask: { kind: "diff", a: 4, b: 2 } },
      { kind: "read", data: MARCH_SNOW, show: "table", ask: { kind: "total" } },
    ]),
    lvl(3, "g3-2", "Season Patterns and Climates", "Skills: predicting weather from season patterns (3-ESS2-1) and describing climates around the world (3-ESS2-2).", [
      { kind: "read", data: YEAR_TEMPS_READ, show: "graph", ask: { kind: "max" } },
      { kind: "predict", data: SEASON_TEMPS, period: 4, next: "Fall 3", why: "Every fall was about 55 to 60°F, cooler than summer and warmer than winter." },
      { kind: "climate", places: PLACES_1, useData: false },
      { kind: "predict", data: SEASON_RAIN, period: 4, next: "Sum 3", why: "Summer was the driest season both years, about 4 or 5 inches." },
      { kind: "read", data: YEAR_TEMPS_READ, show: "table", ask: { kind: "diff", a: 2, b: 0 } },
      { kind: "predict", data: SEASON_SNOW, period: 4, next: "Win 3", why: "Winter brought the most snow both years, about 20 to 24 inches." },
    ]),
    lvl(3, "g3-3", "Weather Hazard Engineers", "Skills: reducing weather hazards with smart designs (3-ESS3-1) and using climate data (3-ESS2-2). Test each design, then pick the best one from the data.", [
      { kind: "design", test: FLOOD_1 },
      { kind: "climate", places: PLACES_2, useData: true },
      { kind: "design", test: LIGHTNING },
      { kind: "design", test: SHELTER },
      { kind: "read", data: SEASON_RAIN, show: "graph", ask: { kind: "max" } },
      { kind: "design", test: FLOOD_2 },
      { kind: "climate", places: PLACES_1, useData: true },
    ]),
  ],
};

export const ALL_WEATHER_LEVELS: WeatherLevel[] = Object.values(WEATHER_LEVELS).flat();
export const levelById = (id: string): WeatherLevel | undefined => ALL_WEATHER_LEVELS.find((l) => l.id === id);

// ---------------- Round helpers ----------------

/** Weather kinds shown as columns on a count chart (in a fixed order). */
export const columnsOf = (days: Weather[]) => WEATHERS.filter((w) => days.includes(w));
export const tally = (days: Weather[], w: Weather) => days.filter((d) => d === w).length;

/** The weather that came the most (or fewest) times, or null when it's a tie. */
export function extreme(days: Weather[], which: "most" | "fewest"): Weather | null {
  const cols = columnsOf(days);
  const counts = cols.map((w) => tally(days, w));
  const best = which === "most" ? Math.max(...counts) : Math.min(...counts);
  const hits = cols.filter((_, i) => counts[i] === best);
  return hits.length === 1 ? hits[0] : null;
}

/** Design that stops every trial for the lowest cost (or null when none / a tie). */
export function bestDesign(t: DesignTest): Design | null {
  const ok = t.designs.filter((d) => passes(d, t).every(Boolean));
  if (!ok.length) return null;
  const min = Math.min(...ok.map((d) => d.cost));
  const best = ok.filter((d) => d.cost === min);
  return best.length === 1 ? best[0] : null;
}
export const passes = (d: Design, t: DesignTest) => t.trials.map((tr) => d.holds >= tr.value);

/** The values a prediction may be: past values for the same season, give or take one step. */
export function predictRange(r: Extract<WeatherRound, { kind: "predict" }>): { lo: number; hi: number; target: number } {
  const i = r.data.values.length;
  const same: number[] = [];
  for (let j = i - r.period; j >= 0; j -= r.period) same.push(r.data.values[j]);
  const lo = Math.max(0, Math.min(...same) - r.data.step);
  const hi = Math.min(r.data.max, Math.max(...same) + r.data.step);
  const avg = same.reduce((s, v) => s + v, 0) / same.length;
  const target = Math.round(avg / r.data.step) * r.data.step;
  return { lo, hi, target };
}

export function readAnswer(data: DataSet, ask: ReadAsk): number {
  const v = data.values;
  switch (ask.kind) {
    case "max":
      return v.indexOf(Math.max(...v));
    case "min":
      return v.indexOf(Math.min(...v));
    case "diff":
      return v[ask.a] - v[ask.b];
    case "total":
      return v.reduce((s, x) => s + x, 0);
  }
}

/** The right answer for a round, written the way moves are written. */
export function answerFor(r: WeatherRound): string {
  switch (r.kind) {
    case "record":
      return r.days.join(",");
    case "count":
      return r.ask === "most" || r.ask === "fewest" ? (extreme(r.days, r.ask) ?? "") : String(tally(r.days, r.ask));
    case "dress":
      return [...DRESS_FOR[r.weather]].sort().join(",");
    case "storm":
      return r.places.find((p) => PLACE_INFO[p].safe) ?? "";
    case "kit":
      return KIT.filter((k) => KIT_INFO[k].need).sort().join(",");
    case "graph":
      return r.data.values.join(",");
    case "read":
      return String(readAnswer(r.data, r.ask));
    case "predict":
      return String(predictRange(r).target);
    case "climate":
      return r.places.map((p) => p.climate).join(",");
    case "design":
      return bestDesign(r.test)?.id ?? "";
  }
}

const list = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
const toInt = (s: string): number | null => (/^-?\d{1,6}$/.test(s.trim()) ? Number(s.trim()) : null);
const isWeather = (s: string): s is Weather => (WEATHERS as string[]).includes(s);

/** What the round asks, read aloud when it starts. */
export function promptFor(r: WeatherRound): string {
  switch (r.kind) {
    case "record":
      return `Look at the sky each day. Tap a day, then tap its weather to put it on the chart.`;
    case "count":
      return `Here is the weather chart. Tap each day to sort it into its row.`;
    case "dress":
      return r.forecast
        ? `The forecast says tomorrow will be ${r.weather}. Tap the clothes to get ready, then tap Go outside.`
        : `Look at the sky. It's ${r.weather}! Tap the clothes to wear today, then tap Go outside.`;
    case "storm":
      return `Uh oh, a storm! When thunder roars, go indoors. Tap the safe place to go.`;
    case "kit":
      return `A big storm is coming tonight. Tap the things that belong in the storm kit, then tap Pack it.`;
    case "graph":
      return `Make a bar graph of the table: ${r.data.title}. Tap a bar, then set its height to match the table.`;
    case "read":
      return askFor(r);
    case "predict":
      return `Look at the pattern. Set the last bar to predict ${seasonWord(r.next)}.`;
    case "climate":
      return r.useData
        ? `Use the data for each place. Tap a place, then tap its climate.`
        : `Tap a place, then tap the climate that matches it.`;
    case "design":
      return `${r.test.goal} Test the designs, then pick the best one.`;
  }
}

/** The question asked after the hands-on part. */
export function askFor(r: WeatherRound): string {
  if (r.kind === "count") {
    if (r.ask === "most") return "Which weather came the most days? Tap its row.";
    if (r.ask === "fewest") return "Which weather came the fewest days? Tap its row.";
    return `How many ${r.ask} days were there? Tap the number.`;
  }
  if (r.kind === "read") {
    const d = r.data;
    const what = d.unit === "°F" ? "temperature" : d.title.toLowerCase().split(" ")[0];
    switch (r.ask.kind) {
      case "max":
        return d.unit === "°F" ? `Which ${unitWord(d)} was the warmest? Tap it.` : `Which ${unitWord(d)} had the most ${what}? Tap it.`;
      case "min":
        return d.unit === "°F" ? `Which ${unitWord(d)} was the coldest? Tap it.` : `Which ${unitWord(d)} had the least ${what}? Tap it.`;
      case "diff":
        return d.unit === "°F"
          ? `How many degrees warmer was ${long(d.labels[r.ask.a])} than ${long(d.labels[r.ask.b])}?`
          : `How many more inches of ${what} fell in ${long(d.labels[r.ask.a])} than in ${long(d.labels[r.ask.b])}?`;
      case "total":
        return `How many inches of ${what} fell in all ${d.labels.length} ${unitWord(d)}s together?`;
    }
  }
  if (r.kind === "design") return "Which design is best? Use the test data, then tap Choose.";
  return "";
}

const unitWord = (d: DataSet) => (d.labels[0].startsWith("Week") ? "week" : d.labels[0] in DAY_NAMES ? "day" : "season");
const long = (label: string) => DAY_NAMES[label] ?? (/^(Win|Spr|Sum|Fall) \d$/.test(label) ? seasonWord(label) : label);
const SEASON_LONG: Record<string, string> = { Win: "winter", Spr: "spring", Sum: "summer", Fall: "fall" };
export const seasonWord = (label: string) => {
  const [s, y] = label.split(" ");
  return `${SEASON_LONG[s] ?? s} of year ${y}`;
};

export interface Check {
  correct: boolean;
  /** Feedback that teaches (a hint after a wrong try). */
  note: string;
  /** Which parts were wrong (record days, graph bars, climate places), for highlighting. */
  wrong?: number[];
}

/** Checks one answer. Never throws. */
export function checkAnswer(r: WeatherRound, answer: string): Check {
  const a = typeof answer === "string" ? answer.slice(0, 120) : "";
  switch (r.kind) {
    case "record": {
      const got = list(a);
      const wrong = r.days.map((d, i) => i).filter((i) => got[i] !== r.days[i]);
      if (!wrong.length && got.length === r.days.length) return { correct: true, note: "" };
      const i = wrong[0] ?? 0;
      const g = got[i];
      if (!g || !isWeather(g)) return { correct: false, note: `Fill in ${dayName(r.days.length, i)} too.`, wrong };
      return { correct: false, note: `Look again at ${dayName(r.days.length, i)}. ${WEATHER_INFO[r.days[i]].clue}`, wrong };
    }
    case "count": {
      if (r.ask === "most" || r.ask === "fewest") {
        const right = extreme(r.days, r.ask);
        if (a === right) return { correct: true, note: "" };
        return {
          correct: false,
          note: r.ask === "most" ? "Count the days in each row. The longest row came the most." : "Count the days in each row. The shortest row came the fewest.",
        };
      }
      const n = toInt(a);
      const right = tally(r.days, r.ask);
      if (n === right) return { correct: true, note: "" };
      return {
        correct: false,
        note: n !== null && n > right ? `That's too many. Touch each ${r.ask} day and count again.` : `Count again. Touch each ${r.ask} day one time.`,
      };
    }
    case "dress": {
      const got = [...new Set(list(a))];
      const need = DRESS_FOR[r.weather];
      const extra = got.find((g) => !need.includes(g as ItemId));
      if (extra) {
        const it = ITEM_INFO[extra as ItemId];
        if (!it) return { correct: false, note: "Tap the clothes to put them on." };
        if (extra === "umbrella" && r.weather === "windy") return { correct: false, note: "Wind can flip an umbrella inside out! Take it off." };
        return { correct: false, note: `The ${it.name} is for ${it.for} days. Today is ${r.weather}. Tap it to take it off.` };
      }
      const missing = need.find((n) => !got.includes(n));
      if (missing) return { correct: false, note: `Almost! ${ITEM_ASK[missing]}` };
      return { correct: true, note: "" };
    }
    case "storm": {
      const p = a as PlaceId;
      if (r.places.includes(p) && PLACE_INFO[p].safe) return { correct: true, note: "" };
      if (r.places.includes(p)) return { correct: false, note: `${PLACE_INFO[p].why} Find a safe place.` };
      return { correct: false, note: "Tap a place to go." };
    }
    case "kit": {
      const got = [...new Set(list(a))];
      const extra = got.find((g) => !(g in KIT_INFO) || !KIT_INFO[g as KitId].need);
      if (extra) return { correct: false, note: extra in KIT_INFO ? `${KIT_INFO[extra as KitId].why} Take it out.` : "Tap things to pack them." };
      const missing = KIT.filter((k) => KIT_INFO[k].need && !got.includes(k));
      if (missing.length) return { correct: false, note: `Good so far! ${missing.length === 1 ? "One more thing" : `${missing.length} more things`} will help in a storm. What helps you see, drink, or fix a scrape?` };
      return { correct: true, note: "" };
    }
    case "graph": {
      const got = list(a).map((x) => toInt(x));
      const wrong = r.data.values.map((_, i) => i).filter((i) => got[i] !== r.data.values[i]);
      if (!wrong.length && got.length === r.data.values.length) return { correct: true, note: "" };
      const i = wrong[0] ?? 0;
      const g = got[i];
      return {
        correct: false,
        note: `Check ${long(r.data.labels[i])}: the table says ${amount(r.data.values[i], r.data.unit)}${g !== null && g !== undefined ? `, but the bar shows ${g}` : ""}. Line the top of the bar up with the scale.`,
        wrong,
      };
    }
    case "read": {
      const n = toInt(a);
      const right = readAnswer(r.data, r.ask);
      if (n === right) return { correct: true, note: "" };
      const d = r.data;
      switch (r.ask.kind) {
        case "max":
          return { correct: false, note: d.unit === "°F" ? "Find the tallest bar (or the biggest number). That one was warmest." : "Find the tallest bar (or the biggest number in the table)." };
        case "min":
          return { correct: false, note: d.unit === "°F" ? "Find the shortest bar (or the smallest number). That one was coldest." : "Find the shortest bar (or the smallest number)." };
        case "diff":
          return {
            correct: false,
            note: `Find both values first: ${long(d.labels[r.ask.a])} and ${long(d.labels[r.ask.b])}. Then subtract the smaller from the bigger.`,
          };
        case "total":
          return { correct: false, note: n !== null && n < right ? "Too small. Add up every week, even the small ones." : "Add the weeks one at a time: week 1 + week 2 + week 3 + week 4." };
      }
      return { correct: false, note: "" };
    }
    case "predict": {
      const n = toInt(a);
      const { lo, hi } = predictRange(r);
      if (n !== null && n >= lo && n <= hi) return { correct: true, note: "" };
      const s = SEASON_LONG[r.next.split(" ")[0]] ?? "that season";
      return {
        correct: false,
        note: `Look at the other ${s} bars. Weather patterns repeat each year, so ${s} should look a lot like the ${s}s before. ${n !== null && n > hi ? "Try lower." : "Try higher."}`,
      };
    }
    case "climate": {
      const got = list(a);
      const wrong = r.places.map((_, i) => i).filter((i) => got[i] !== r.places[i].climate);
      if (!wrong.length) return { correct: true, note: "" };
      const p = r.places[wrong[0]];
      const g = got[wrong[0]] as ClimateId | undefined;
      const hint: Record<ClimateId, string> = r.useData
        ? {
            rainforest: "warm every month and a lot of rain",
            desert: "very little rain, with hot months",
            polar: "below freezing (32°F) even in the warmest month",
            temperate: "a big change between a warm summer and a cold winter, with some rain",
          }
        : {
            rainforest: "hot and very wet all year",
            desert: "very dry",
            polar: "frozen all year",
            temperate: "four different seasons",
          };
      const lead = g && g in CLIMATE_INFO ? `${p.name} isn't ${CLIMATE_INFO[g].name.toLowerCase()}. ` : `Match ${p.name} too. `;
      return { correct: false, note: `${lead}Look for a place that is ${hint[p.climate]}.`, wrong };
    }
    case "design": {
      const d = r.test.designs.find((x) => x.id === a);
      const best = bestDesign(r.test);
      if (!d) return { correct: false, note: "Tap a design to choose it." };
      if (best && d.id === best.id) return { correct: true, note: "" };
      const fails = r.test.trials.filter((t) => d.holds < t.value);
      if (fails.length) {
        return {
          correct: false,
          note: `The ${d.name.toLowerCase()} failed ${fails.length} of ${r.test.trials.length} tests (${fails.map((f) => f.label).join(", ")}). A good design has to work every time.`,
        };
      }
      return { correct: false, note: `The ${d.name.toLowerCase()} works every time, but another design also passes every test and costs less. Compare the costs.` };
    }
  }
}

/** What the kid learned this round (said after the answer). */
export function teachFor(r: WeatherRound): string {
  switch (r.kind) {
    case "record": {
      const cols = columnsOf(r.days);
      return `Your chart is right! Weather can change from day to day: ${cols.map((w) => w).join(", ")}.`;
    }
    case "count": {
      if (r.ask === "most" || r.ask === "fewest") {
        const w = extreme(r.days, r.ask)!;
        return `Yes! ${cap(w)} came ${tally(r.days, w)} days. That's the ${r.ask === "most" ? "most" : "fewest"}. Charts help us see weather patterns.`;
      }
      return `Yes! There were ${tally(r.days, r.ask)} ${r.ask} days. Counting the chart shows us the pattern.`;
    }
    case "dress":
      return `Ready! ${DRESS_FOR[r.weather].map((i) => ITEM_INFO[i].why).join(" ")}`;
    case "storm": {
      const p = r.places.find((x) => PLACE_INFO[x].safe)!;
      return `Safe! ${PLACE_INFO[p].why} When thunder roars, go indoors.`;
    }
    case "kit":
      return "Packed! A flashlight, batteries, water and a first-aid kit help a family stay safe in a storm.";
    case "graph":
      return `Great graph! The bars show the same numbers as the table, but now you can see which ${unitWord(r.data)} is biggest at a glance.`;
    case "read": {
      const d = r.data;
      const v = d.values;
      switch (r.ask.kind) {
        case "max":
        case "min": {
          const i = readAnswer(d, r.ask);
          return `Yes! ${cap(long(d.labels[i]))} had ${amount(v[i], d.unit)}: the ${r.ask.kind === "max" ? "biggest" : "smallest"} number and the ${r.ask.kind === "max" ? "tallest" : "shortest"} bar.`;
        }
        case "diff":
          return `Yes! ${v[r.ask.a]} − ${v[r.ask.b]} = ${amount(v[r.ask.a] - v[r.ask.b], d.unit === "°F" ? "degrees" : d.unit)}.`;
        case "total":
          return `Yes! ${v.join(" + ")} = ${readAnswer(d, r.ask)} ${d.unit} in all.`;
      }
      return "";
    }
    case "predict":
      return `Good prediction! ${r.why} Scientists use patterns like this to predict the weather in a season.`;
    case "climate":
      return r.useData
        ? "Climate is the usual weather of a place over many years. Temperature and rain data tell you which climate it is."
        : "Climate is the usual weather of a place over many years. Each place has its own climate.";
    case "design": {
      const b = bestDesign(r.test)!;
      const why: Record<DesignTest["hazard"], string> = {
        flood: `It is taller than every flood, and it uses less wall than any bigger design.`,
        lightning: "A metal rod with a thick cable gives lightning a safe path into the ground. Plastic doesn't carry electricity, and a thin wire can melt.",
        wind: "Strong concrete under the ground keeps people safe from the strongest winds, and it costs less than steel.",
      };
      return `Best design: the ${b.name.toLowerCase()}! ${why[r.test.hazard]} Engineers test designs and use the data to choose.`;
    }
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "1 inch", "3 inches", "60 °F" (the unit agrees with the number). */
const amount = (n: number, unit: string) => (unit === "°F" ? `${n}°F` : `${n} ${n === 1 ? unit.replace(/inches$/, "inch").replace(/degrees$/, "degree") : unit}`);

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  /** The answers the kid tried, in order (up to 3). */
  tries: string[];
}

export interface RoundResult {
  rightOn: number;
  points: number;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const tries = Array.isArray(o.tries) ? o.tries.slice(0, MAX_TRIES).map((t) => (typeof t === "string" ? t.slice(0, 120) : "")) : [];
    return { tries };
  });
}

export function scoreRound(r: WeatherRound, move: RoundMove | undefined): RoundResult {
  if (!move) return { rightOn: -1, points: 0 };
  const rightOn = move.tries.findIndex((t) => checkAnswer(r, t).correct);
  return { rightOn, points: rightOn === 0 ? 2 : rightOn > 0 ? 1 : 0 };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: WeatherLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests). */
export const perfectMoves = (level: WeatherLevel): RoundMove[] => level.rounds.map((r) => ({ tries: [answerFor(r)] }));

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const SKY: Record<Weather, [string, string]> = {
  sunny: ["#5fb8ff", "#9bd6ff"],
  cloudy: ["#9aa7b8", "#c3ccd8"],
  rainy: ["#6b7a90", "#8d9aad"],
  snowy: ["#b8c4d4", "#dde4ee"],
  windy: ["#7cc4f0", "#b4e0fa"],
};

function cloud(g: Grid, x: number, y: number, s: number, c: string, shade: string) {
  g.disc(x, y, 2.6 * s, c).disc(x + 3.2 * s, y - 1.2 * s, 3.2 * s, c).disc(x + 6.4 * s, y, 2.6 * s, c);
  g.rect(Math.round(x), Math.round(y), Math.round(6.4 * s), Math.round(2.4 * s), c);
  g.rect(Math.round(x - 1), Math.round(y + 2 * s), Math.round(8 * s), 1, shade);
}

/** The village sky for a weather: 40×26 pixels. `frame` animates the rain, snow and wind. */
export function skyGrid(w: Weather, frame = 0): Grid {
  const g = new Grid(40, 26);
  const [top, low] = SKY[w];
  g.rect(0, 0, 40, 10, top).rect(0, 10, 40, 10, low);
  // Ground
  const ground = w === "snowy" ? "#f4f7fb" : "#6cc04a";
  const ground2 = w === "snowy" ? "#d9e2ee" : "#57a83a";
  g.rect(0, 20, 40, 6, ground);
  for (let x = 0; x < 40; x += 3) g.set(x + (x % 2), 21 + (x % 3), ground2);
  // House
  g.rect(4, 14, 9, 6, "#e8c39e").rect(7, 16, 3, 4, "#8a5a3b").set(5, 15, "#ffe08a").set(11, 15, "#ffe08a");
  g.tri(8, 9, 13, 6, w === "snowy" ? "#ffffff" : "#c0392b");
  // Tree (bends in the wind)
  const lean = w === "windy" ? 2 + frame : 0;
  g.rect(31, 14, 2, 6, "#7a4b2a");
  g.disc(32 + lean, 11, 4, w === "snowy" ? "#e8f0f8" : "#2f9e44").disc(32 + lean, 9, 2.5, w === "snowy" ? "#ffffff" : "#40c057");
  switch (w) {
    case "sunny":
      g.disc(20, 6, 4, "#ffd43b").disc(20, 6, 2.5, "#ffe066");
      for (const [dx, dy] of [[0, -6], [0, 6], [-6, 0], [6, 0], [-4, -4], [4, -4], [-4, 4], [4, 4]]) g.set(20 + dx, 6 + dy, frame ? "#ffe066" : "#fab005");
      break;
    case "cloudy":
      cloud(g, 6, 4, 1, "#e9ecef", "#adb5bd");
      cloud(g, 18, 6, 1.3, "#dee2e6", "#9aa3ad");
      cloud(g, 30, 3, 1, "#e9ecef", "#adb5bd");
      break;
    case "rainy":
      cloud(g, 5, 4, 1.1, "#868e96", "#5c636a");
      cloud(g, 21, 3, 1.3, "#7a828a", "#5c636a");
      for (let x = 2; x < 40; x += 4)
        for (let y = 10 + ((x * 3 + frame * 2) % 5); y < 20; y += 5) g.set(x, y, "#4dabf7").set(x, y + 1, "#4dabf7");
      break;
    case "snowy":
      cloud(g, 6, 3, 1, "#f1f3f5", "#ced4da");
      cloud(g, 22, 4, 1.2, "#f1f3f5", "#ced4da");
      for (let x = 1; x < 40; x += 4)
        for (let y = 9 + ((x * 5 + frame * 2) % 6); y < 20; y += 5) g.set(x + ((y + frame) % 2), y, "#ffffff");
      break;
    case "windy":
      g.disc(6, 5, 3, "#ffd43b");
      cloud(g, 20, 4, 1, "#f8f9fa", "#ced4da");
      for (const [x, y, len] of [[12, 9, 9], [3 + frame * 2, 12, 7], [18 - frame, 15, 8], [24, 11, 6]]) {
        g.rect(x, y, len, 1, "#ffffff");
        g.set(x + len, y - 1, "#ffffff");
      }
      g.set(26 + frame * 3, 13, "#f08c00").set(15 + frame * 2, 17, "#e67700").set(36 - frame * 2, 7, "#2f9e44");
      break;
  }
  return g;
}

const SKIN = "#eebf98";
const HAIR = "#5a3a22";

/** The kid at the weather station wearing `items` (32×38 pixels). */
export function kidGrid(items: readonly string[]): Grid {
  const has = (i: ItemId) => items.includes(i);
  const g = new Grid(32, 38);
  const oy = 8;
  // Legs and shoes
  g.rect(10, oy + 20, 3, 6, "#3d4a5c").rect(15, oy + 20, 3, 6, "#3d4a5c");
  if (has("rainboots")) g.rect(9, oy + 23, 4, 4, "#f2c200").rect(15, oy + 23, 4, 4, "#f2c200").rect(9, oy + 26, 4, 1, "#c99a00").rect(15, oy + 26, 4, 1, "#c99a00");
  else g.rect(9, oy + 26, 4, 2, "#5c3d2e").rect(15, oy + 26, 4, 2, "#5c3d2e");
  // Body and arms
  const coat = has("wintercoat") ? "#e03131" : has("raincoat") ? "#fcc419" : has("jacket") ? "#1c7ed6" : "#2bb673";
  const wide = has("wintercoat") ? 1 : 0;
  g.rect(9 - wide, oy + 11, 10 + wide * 2, 10, coat);
  g.rect(6 - wide, oy + 12, 3, 7, coat).rect(19 + wide, oy + 12, 3, 7, coat);
  if (has("wintercoat")) for (let y = oy + 13; y < oy + 21; y += 3) g.rect(8, y, 12, 1, "#c92a2a");
  if (has("raincoat")) g.rect(13, oy + 11, 1, 10, "#e8a800").set(11, oy + 14, OUT).set(11, oy + 17, OUT);
  if (has("jacket")) g.rect(14, oy + 11, 1, 10, "#d0ebff");
  if (!has("wintercoat") && !has("raincoat") && !has("jacket")) g.rect(9, oy + 19, 10, 2, "#3d4a5c");
  const hand = has("mittens") ? "#4c6ef5" : SKIN;
  g.rect(6 - wide, oy + 19, 3, 2, hand).rect(19 + wide, oy + 19, 3, 2, hand);
  if (has("mittens")) g.set(5 - wide, oy + 19, hand).set(22 + wide, oy + 19, hand);
  // Head
  g.disc(14, oy + 5, 5, SKIN);
  g.rect(9, oy, 10, 3, HAIR).set(9, oy + 3, HAIR).set(18, oy + 3, HAIR);
  if (has("raincoat") && !has("sunhat") && !has("beanie")) g.rect(8, oy - 1, 12, 3, "#fcc419").rect(8, oy + 2, 2, 5, "#fcc419").rect(18, oy + 2, 2, 5, "#fcc419");
  g.set(12, oy + 5, OUT).set(16, oy + 5, OUT).rect(13, oy + 8, 3, 1, "#c0392b");
  if (has("sunglasses")) g.rect(11, oy + 4, 3, 2, OUT).rect(15, oy + 4, 3, 2, OUT).rect(14, oy + 4, 1, 1, OUT);
  if (has("beanie")) g.rect(9, oy - 2, 10, 4, "#7048e8").rect(9, oy + 1, 10, 1, "#9775fa").disc(14, oy - 3, 1.5, "#ffffff");
  if (has("sunhat")) g.rect(5, oy + 1, 18, 2, "#e9c46a").rect(9, oy - 3, 10, 4, "#e9c46a").rect(9, oy - 1, 10, 1, "#e63946");
  // Umbrella in the right hand
  if (has("umbrella")) {
    g.rect(22, oy - 2, 1, 22, "#495057");
    for (let y = -5; y <= 0; y++) {
      const half = Math.round(Math.sqrt(Math.max(0, 36 - (y + 6) * (y + 6) * 0.9)));
      for (let x = 22 - half; x <= 22 + half; x++) g.set(x, oy - 2 + y, Math.floor((x - 22 + 12) / 3) % 2 ? "#e03131" : "#ffffff");
    }
  }
  return g.outline(OUT);
}

/** A small icon of a piece of clothing (16×16), for the wardrobe buttons. */
export function itemGrid(id: ItemId): Grid {
  const g = new Grid(16, 16);
  const coat = (c: string, stripe?: string) => {
    g.rect(4, 3, 8, 11, c).rect(1, 4, 3, 8, c).rect(12, 4, 3, 8, c);
    if (stripe) for (let y = 5; y < 14; y += 3) g.rect(4, y, 8, 1, stripe);
  };
  switch (id) {
    case "sunhat":
      g.rect(1, 9, 14, 3, "#e9c46a").rect(4, 4, 8, 5, "#e9c46a").rect(4, 7, 8, 1, "#e63946");
      break;
    case "sunglasses":
      g.disc(4.5, 8, 3, OUT).disc(11.5, 8, 3, OUT).rect(6, 6, 4, 1, OUT).set(3, 7, "#748ffc").set(10, 7, "#748ffc");
      break;
    case "raincoat":
      coat("#fcc419");
      g.rect(5, 1, 6, 3, "#fcc419").rect(8, 4, 1, 10, "#e8a800");
      break;
    case "rainboots":
      g.rect(2, 3, 4, 10, "#f2c200").rect(2, 11, 6, 3, "#f2c200").rect(9, 3, 4, 10, "#f2c200").rect(9, 11, 6, 3, "#f2c200");
      g.rect(2, 13, 6, 1, "#c99a00").rect(9, 13, 6, 1, "#c99a00");
      break;
    case "umbrella":
      for (let y = 0; y < 6; y++) {
        const half = Math.round(Math.sqrt(Math.max(0, 49 - (6 - y) * (6 - y))));
        for (let x = 8 - half; x <= 8 + half; x++) g.set(x, y + 2, Math.floor((x + 1) / 3) % 2 ? "#e03131" : "#ffffff");
      }
      g.rect(8, 8, 1, 6, "#495057").set(7, 14, "#495057").set(6, 13, "#495057");
      break;
    case "wintercoat":
      coat("#e03131", "#c92a2a");
      g.rect(5, 2, 6, 2, "#f1f3f5");
      break;
    case "mittens":
      g.rect(2, 4, 5, 9, "#4c6ef5").rect(0, 6, 2, 3, "#4c6ef5").rect(2, 12, 5, 2, "#ffffff");
      g.rect(9, 4, 5, 9, "#4c6ef5").rect(14, 6, 2, 3, "#4c6ef5").rect(9, 12, 5, 2, "#ffffff");
      break;
    case "beanie":
      g.rect(3, 6, 10, 5, "#7048e8").rect(4, 5, 8, 1, "#7048e8").rect(5, 4, 6, 1, "#7048e8");
      g.rect(2, 11, 12, 3, "#9775fa").disc(8, 2.5, 1.6, "#ffffff");
      for (let x = 3; x < 14; x += 2) g.set(x, 12, "#b197fc");
      break;
    case "jacket":
      coat("#1c7ed6");
      g.rect(8, 3, 1, 11, "#d0ebff").rect(5, 2, 6, 1, "#1864ab");
      break;
  }
  return g.outline(OUT);
}

export const weatherWatch: MiniGame = {
  ...weatherWatchInfo,
  levels: () => [],
  levelsForGrade: (grade) => (WEATHER_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
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
