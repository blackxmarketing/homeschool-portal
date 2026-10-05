import type { MiniGame, MiniLevel } from "./index";
import { rng } from "../pixel/grid";
import type { Band } from "../pixel/world";

/**
 * Expedition Leader (Leaders' Summit). The kid leads a polar team across the
 * ice for several days, inspired by Shackleton's Endurance expedition
 * (1914-1916) and other true journeys such as Lewis and Clark's. Three meters
 * (Supplies, Health, Morale) plus the team's Trust in the leader. Each day
 * brings an event with 2-3 real choices that trade the meters off. No choice
 * is labeled "right": the meters decide. If Supplies, Health or Morale runs
 * out, the team must stop and wait for rescue. Reach the last day with
 * everyone safe; stars come from the weakest final meter.
 *
 * Bands: sprout shows exact numbers on each choice; adventurer shows only
 * up/down arrows; strategist shows nothing, has delayed consequences (a choice
 * made today can come back days later) and gambles decided by facts the
 * leader can't see yet.
 *
 * Pure and seeded, so the server can replay the kid's moves.
 */

export type Meter = "s" | "h" | "m" | "t";
export type Effects = Partial<Record<Meter, number>>;

export const METERS: Record<Meter, { label: string; icon: string; color: string }> = {
  s: { label: "Supplies", icon: "🥫", color: "#f59e0b" },
  h: { label: "Health", icon: "❤️", color: "#ef4444" },
  m: { label: "Morale", icon: "🔥", color: "#2340ff" },
  t: { label: "Trust", icon: "🤝", color: "#22a35a" },
};

export interface Choice {
  label: string;
  /** What happens right away. */
  fx: Effects;
  /** Comes back later (strategist); on easier levels it happens right away. */
  later?: { days: number; fx: Effects; text: string };
  /** Limited information: the result depends on something the leader can't see yet. */
  gamble?: { odds: number; win: Effects; lose: Effects; winText: string; loseText: string };
  /** Feedback after choosing: the tradeoff explained, never "right" or "wrong". */
  why: string;
}

export interface ExpEvent {
  id: string;
  icon: string;
  title: string;
  text: string;
  choices: Choice[];
  /** What good leaders weigh in a moment like this. */
  lesson: string;
  /** A true story from a real expedition (optional). */
  story?: string;
  /** Which bands meet this event. */
  bands: Band[];
}

const ALL: Band[] = ["sprout", "adventurer", "strategist"];
const OLDER: Band[] = ["adventurer", "strategist"];
const TOP: Band[] = ["strategist"];

export const EVENTS: ExpEvent[] = [
  {
    id: "blizzard",
    icon: "🌨️",
    title: "Blizzard!",
    text: "A blizzard howls across the ice. You can barely see ten steps ahead.",
    bands: ALL,
    choices: [
      { label: "Make camp and wait it out", fx: { s: -8, h: 4, m: -4, t: 2 }, why: "Waiting kept everyone safe and warm, but a day in the tent still eats a day of food, and sitting still is hard on spirits." },
      { label: "Rope together and push on", fx: { h: -12, m: -2, t: -3 }, why: "You saved a day of food, but marching blind in a blizzard wore people down and some felt you took a big risk with them." },
      { label: "Build snow walls, then tell stories in the tent", fx: { s: -8, h: 2, m: 5 }, why: "The snow walls kept the tent standing and the stories kept spirits up. It still cost a day of food." },
    ],
    lesson: "Good leaders weigh safety against time. Losing a day hurts; losing a person is far worse.",
    story: "On Shackleton's expedition the crew waited out many storms in tents on the floating ice. He knew the most important thing was to bring every person home.",
  },
  {
    id: "sick",
    icon: "🤒",
    title: "A sick crewmate",
    text: "Your cook has a fever and is too weak to pull a sled today.",
    bands: ALL,
    choices: [
      { label: "Everyone rests for a day", fx: { s: -6, h: 6, m: 2, t: 6 }, why: "Resting helped the cook and everyone else. The team saw that you won't leave anyone behind. It cost a day of food." },
      { label: "Carry the cook on a sled; everyone hauls harder", fx: { h: -6, t: 6 }, why: "You kept moving and the cook got a ride, but everyone else got more tired pulling the extra weight." },
      { label: "Give the cook extra food and keep going", fx: { s: -8, h: 3, t: 3 }, why: "Extra food helped the cook recover on the move, but your supplies dropped." },
    ],
    lesson: "Good leaders care for the weakest member. A team watches how its leader treats the person who is struggling.",
    story: "On an earlier trek in 1909, Shackleton gave his own breakfast biscuit to his starving friend Frank Wild. Wild wrote that he would never forget it.",
  },
  {
    id: "dog",
    icon: "🐕",
    title: "A lost sled dog",
    text: "Bosun, your strongest sled dog, broke loose chasing a seal and ran out of sight.",
    bands: ALL,
    choices: [
      { label: "Send a search party", fx: { s: -4, h: -3, m: 6, t: 2 }, why: "The searchers found Bosun, and the whole team cheered. It cost some food and tired legs." },
      {
        label: "Leave food and a flag, and keep moving",
        fx: { s: -5, m: -2 },
        later: { days: 2, fx: { m: 8, t: 2 }, text: "Bosun found the flag, followed your trail and trotted into camp! The team was overjoyed." },
        why: "Leaving a food cache and a marker was a plan that might work later, without stopping the whole team today.",
      },
      { label: "Keep going; dogs often find their way back", fx: { m: -7 }, why: "You saved time and food, but the team missed Bosun and worried about him all day." },
    ],
    lesson: "Good leaders know small things matter to people. Keeping hope alive can be worth a little food.",
  },
  {
    id: "quarrel",
    icon: "😠",
    title: "A quarrel",
    text: "Two crew members are arguing loudly about who has to pull the heavier sled.",
    bands: ALL,
    choices: [
      { label: "Rotate the jobs every hour, and take a turn yourself", fx: { h: -4, m: 6, t: 8 }, why: "Sharing the hardest job, including you, felt fair to everyone. You got tired, but the team trusted you more." },
      {
        label: "Let them sort it out themselves",
        fx: { m: -4 },
        later: { days: 3, fx: { m: -8, t: -4 }, text: "The old quarrel flared up again, louder this time, and others started taking sides." },
        why: "Sometimes people do work things out, but an argument nobody deals with can grow.",
      },
      { label: "Move the grumbler into your own tent and talk it through", fx: { h: -2, m: 4, t: 5 }, why: "Keeping the unhappy person close let you listen and calm things down before they spread. You lost a little sleep." },
    ],
    lesson: "Good leaders deal with conflict early and fairly, and they share the hard work themselves.",
    story: "Shackleton often put the crewmen most likely to grumble in his own tent, so he could listen to them and keep small problems from growing.",
  },
  {
    id: "hunt",
    icon: "🦭",
    title: "Seals on the ice",
    text: "A group of seals is resting on a floe nearby. Fresh meat would help a lot.",
    bands: ALL,
    choices: [
      { label: "Hunt all day", fx: { s: 18, h: -4, m: 2 }, why: "Hours on the cold, cracking ice were tiring, but your food store grew a lot." },
      { label: "Send two volunteers while the rest rest", fx: { s: 10, h: 2 }, why: "Fewer hunters brought back less, but the others got a real rest." },
      { label: "Hold a feast with what you catch tonight", fx: { s: 6, m: 10 }, why: "You saved less, but a hot meal of fresh meat lifted everyone's spirits." },
    ],
    lesson: "Good leaders think about tomorrow's needs, not just today's. Food stored now can save the team later.",
    story: "After their ship sank, Shackleton's crew lived for months mostly on seals and penguins they hunted on the ice.",
  },
  {
    id: "cold",
    icon: "🥶",
    title: "A bitter night",
    text: "The temperature drops to 30 below zero. Two crew members have frostnipped toes.",
    bands: ALL,
    choices: [
      { label: "Burn extra fuel for hot drinks all night", fx: { s: -8, h: 7, m: 3 }, why: "Hot drinks warmed everyone up, but the stove burned fuel you will want later." },
      { label: "Give the warmest sleeping bags to the crew; you take a thin one", fx: { h: 2, m: 2, t: 8 }, why: "The crew stayed warmer, and they noticed their leader chose the cold bag. You had a long, cold night." },
      { label: "Save fuel and march early to stay warm", fx: { h: -7, m: -2 }, why: "You saved fuel, but cold, tired feet made the day harder." },
    ],
    lesson: "Good leaders share hardship. When the leader takes the worst spot, the team believes in the leader.",
    story: "When the Endurance crew drew lots for warm reindeer-fur sleeping bags, Shackleton and his officers made sure they ended up with the thinner wool bags.",
  },
  {
    id: "party",
    icon: "🪕",
    title: "A gloomy day",
    text: "It's the darkest day of winter. The crew is quiet and gloomy.",
    bands: ALL,
    choices: [
      { label: "Hold a celebration with extra food and music", fx: { s: -6, m: 12, t: 2 }, why: "The celebration cost food, but a cheerful team works harder and sticks together." },
      { label: "Sing songs, no extra food", fx: { m: 5 }, why: "A small celebration lifted spirits a bit without using food." },
      { label: "Skip it to save energy", fx: { h: 2, m: -6 }, why: "Everyone rested, but the gloom settled in." },
    ],
    lesson: "Good leaders keep spirits up. Hope is a supply, just like food.",
    story: "Shackleton let Leonard Hussey keep his banjo even when every extra pound was thrown away. He called it vital mental medicine.",
  },
  {
    id: "load",
    icon: "🛷",
    title: "Too heavy",
    text: "The sleds are so heavy the team can barely move them.",
    bands: ALL,
    choices: [
      { label: "Throw out everything but essentials, starting with your own things", fx: { s: -4, h: 6, t: 6 }, why: "Lighter sleds were much easier to pull. Everyone saw you give up your own things first." },
      { label: "Keep everything and push on", fx: { h: -8, m: -3 }, why: "You kept every item, but hauling the extra weight wore the team out." },
      { label: "Make two trips with lighter loads", fx: { s: -6, h: 2, m: -2 }, why: "Two trips were easier on backs, but slow, and slow means more food eaten." },
    ],
    lesson: "Good leaders decide what really matters and set the example first.",
    story: "Shackleton told each man to keep only two pounds of personal things. To show he meant it, he dropped gold coins and his Bible in the snow, keeping just a few pages.",
  },
  {
    id: "crack",
    icon: "🧊",
    title: "A crack in the ice",
    text: "A wide crack opens across your path. Black, freezing water churns below.",
    bands: OLDER,
    choices: [
      { label: "Go the long way around", fx: { s: -10, m: -3 }, why: "The detour was safe, but it took longer and ate food." },
      {
        label: "Build a sled bridge and cross carefully",
        fx: { s: -2, h: -4, m: 3 },
        gamble: { odds: 0.6, win: { m: 4, t: 3 }, lose: { h: -10, s: -6 }, winText: "The bridge held and the team cheered.", loseText: "A sled slid into the water; you pulled a crewman out soaked and lost some food." },
        why: "Crossing was fast but risky. You couldn't know for sure how strong the ice edges were.",
      },
      { label: "Camp and wait for the crack to close", fx: { s: -6, h: 2, m: -5 }, why: "Waiting was safe, but nobody likes sitting still while food runs down." },
    ],
    lesson: "Good leaders weigh risk and reward, and often have to decide without knowing everything.",
    story: "On the Endurance expedition, the ice once split right under a tent at night. Shackleton hauled a crewman out of the water in his sleeping bag.",
  },
  {
    id: "rations",
    icon: "🍞",
    title: "Food is low",
    text: "You count the food. There is less than you planned for.",
    bands: OLDER,
    choices: [
      { label: "Cut everyone's rations, including your own", fx: { s: 10, h: -5, m: -3, t: 6 }, why: "Smaller meals stretched the food. Hunger hurt, but everyone saw the leader ate the same as the crew." },
      { label: "Cut the crew's rations but not the leaders'", fx: { s: 10, h: -4, m: -8, t: -14 }, why: "It saved the same food, but the crew felt it was unfair. Trust dropped a lot." },
      { label: "Keep full rations and hope to find food", fx: { m: 2 }, why: "Full meals kept people happy for now, but the food problem is still there." },
    ],
    lesson: "Good leaders share hardship equally. People follow a leader who asks nothing of them that the leader won't do too.",
  },
  {
    id: "truth",
    icon: "📋",
    title: "Hard news",
    text: "Your map shows the journey is longer than you told the crew.",
    bands: OLDER,
    choices: [
      { label: "Tell them the truth and your plan", fx: { m: -4, t: 8 }, why: "Hard news hurt for a moment, but because you also shared a plan, the team trusted you more." },
      {
        label: "Keep it quiet for now",
        fx: { m: 1 },
        later: { days: 3, fx: { m: -6, t: -14 }, text: "The crew found out the journey is longer, and that you knew. Trust fell hard." },
        why: "Keeping quiet avoided worry today, but secrets have a way of coming out.",
      },
      { label: "Tell them, and ask for their ideas", fx: { m: -1, t: 5, h: -2 }, why: "Asking for ideas made people feel part of the plan. The long talk cost some rest." },
    ],
    lesson: "Good leaders are honest, even with bad news, and pair it with a plan.",
    story: "When the Endurance was crushed, Shackleton told the crew calmly: the ship and stores are gone, so now we go home. His calm honesty steadied them.",
  },
  {
    id: "fog",
    icon: "🌫️",
    title: "Lost in fog",
    text: "Thick fog. Your navigator got one quick look at the sun and thinks land is east, but isn't sure.",
    bands: TOP,
    choices: [
      {
        label: "Trust the sighting and head east",
        fx: {},
        gamble: { odds: 0.65, win: { m: 5, s: 2 }, lose: { s: -10, m: -6 }, winText: "The sighting was right. You made great progress.", loseText: "The sighting was off. You had to turn back and lost a day." },
        why: "With only one sighting, heading east was a reasonable bet, but still a bet.",
      },
      { label: "Wait a day for a second sighting", fx: { s: -6, m: -3, h: 2 }, why: "Waiting made the route certain, at the cost of a day of food." },
      { label: "Head northeast to stay closer to the coast", fx: { s: -4, m: -1 }, why: "A middle path lowered the risk, but it was a slower route." },
    ],
    lesson: "Good leaders make decisions with incomplete information. They gather what they can, then commit.",
    story: "Frank Worsley navigated the tiny boat James Caird 800 miles to South Georgia with only four sightings of the sun. He hit the island.",
  },
  {
    id: "refuse",
    icon: "✋",
    title: "A crewman refuses",
    text: "A worn-out crewman refuses to keep hauling. He says the old rules ended when the ship sank.",
    bands: TOP,
    choices: [
      { label: "Talk calmly and firmly: everyone's safety depends on working together", fx: { m: 2, t: 5, h: -1 }, why: "Staying calm and explaining why the rules matter brought him back without making an enemy." },
      {
        label: "Punish him with half rations",
        fx: { s: 2, m: -5 },
        later: { days: 2, fx: { m: -6, t: -8 }, text: "The punishment made the whole crew uneasy and resentful." },
        why: "A harsh punishment ended the argument today, but fear doesn't build a team.",
      },
      { label: "Let him ride on the sled", fx: { h: -5, m: -4, t: -3 }, why: "He rested, but everyone else hauled extra and wondered why the rules didn't apply to him." },
    ],
    lesson: "Good leaders stay calm and fair. They hold everyone to the same rules without humiliating anyone.",
    story: "When the carpenter Harry McNish refused to haul on the ice, Shackleton read out the ship's rules and spoke with him calmly. McNish went back to work, and later helped save everyone by fixing up the lifeboats.",
  },
  {
    id: "pass",
    icon: "⛰️",
    title: "Mountain pass",
    text: "A steep pass ahead. Your scouts say there may be a shorter route over the ridge, but no one has crossed it.",
    bands: TOP,
    choices: [
      {
        label: "Try the unknown short route",
        fx: { h: -3 },
        gamble: { odds: 0.5, win: { s: 6, m: 6 }, lose: { h: -9, m: -5, s: -4 }, winText: "The ridge route worked! You saved a whole day.", loseText: "The ridge ended in a cliff. You climbed back down, cold and tired." },
        why: "A shortcut no one has tried can save time or cost a lot. You couldn't know which.",
      },
      { label: "Take the known long route", fx: { s: -7, m: -2 }, why: "The long route was certain and safe, but slow." },
      { label: "Ask local guides and trade for horses first", fx: { s: -5, h: 4, t: 3 }, why: "Trading cost supplies, but getting help from people who know the land made the crossing easier." },
    ],
    lesson: "Good leaders gather information from people who know more than they do.",
    story: "Lewis and Clark traded with the Shoshone people for horses and a guide before crossing the Rocky Mountains. Without them, the Corps of Discovery might not have made it.",
  },
];

export interface ExpLevel {
  id: string;
  title: string;
  band: Band;
  days: number;
  seed: number;
  start: { s: number; h: number; m: number; t: number };
  /** Daily cost of travel (positive numbers are taken away). */
  drain: { s: number; h: number; m: number };
  /** Multiplies the bad side of every choice. */
  harsh: number;
  /** Delayed consequences really are delayed (strategist). */
  delayed: boolean;
  /** Lowest final meter needed for 2 and 3 stars. */
  two: number;
  three: number;
  intro: string;
}

export const EXPEDITION_LEVELS: Record<Band, ExpLevel[]> = {
  sprout: [
    { id: "x-s1", title: "First Trek", band: "sprout", days: 5, seed: 17, start: { s: 70, h: 70, m: 70, t: 60 }, drain: { s: 4, h: 0, m: 0 }, harsh: 0.75, delayed: false, two: 51, three: 58, intro: "Lead your team across the ice for 5 days. Keep Supplies, Health and Morale up, and earn your team's Trust. Each choice shows what it will change." },
    { id: "x-s2", title: "Snowy Week", band: "sprout", days: 5, seed: 29, start: { s: 60, h: 65, m: 65, t: 55 }, drain: { s: 5, h: 0, m: 1 }, harsh: 0.85, delayed: false, two: 38, three: 45, intro: "Less food this time. Every choice helps one meter and costs another. Keep all four meters strong to earn 3 stars." },
    { id: "x-s3", title: "Long Haul", band: "sprout", days: 5, seed: 41, start: { s: 55, h: 60, m: 60, t: 50 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1, delayed: false, two: 32, three: 40, intro: "A hard trek with a small team. Watch your weakest meter: a team is only as strong as its weakest part." },
  ],
  adventurer: [
    { id: "x-a1", title: "Across the Floe", band: "adventurer", days: 8, seed: 103, start: { s: 70, h: 70, m: 70, t: 55 }, drain: { s: 5, h: 0, m: 1 }, harsh: 1, delayed: false, two: 32, three: 40, intro: "Eight days on the ice. Choices now show only which way each meter moves, not by how much. Get everyone through with strong meters." },
    { id: "x-a2", title: "Endurance", band: "adventurer", days: 8, seed: 211, start: { s: 65, h: 65, m: 60, t: 50 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1.1, delayed: false, two: 17, three: 27, intro: "Supplies and spirits start lower. Remember: hungry crews get sick, and gloomy crews stop trusting." },
    { id: "x-a3", title: "Patience Camp", band: "adventurer", days: 8, seed: 307, start: { s: 70, h: 65, m: 65, t: 45 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1.1, delayed: false, two: 8, three: 16, intro: "A hard winter camp. Trust above 70 lifts morale every day; trust below 30 drags it down. Earn it early." },
  ],
  strategist: [
    { id: "x-h1", title: "The Weddell Sea", band: "strategist", days: 10, seed: 401, start: { s: 70, h: 70, m: 65, t: 50 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1.1, delayed: true, two: 5, three: 15, intro: "Ten days. No numbers on choices, some outcomes depend on things you can't see yet, and some decisions come back days later. Lead with judgment." },
    { id: "x-h2", title: "Elephant Island", band: "strategist", days: 10, seed: 509, start: { s: 70, h: 65, m: 60, t: 45 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1.2, delayed: true, two: 8, three: 19, intro: "Low supplies, low spirits, long odds. Hunger costs health; low morale costs trust. Plan several days ahead." },
    { id: "x-h3", title: "South Georgia", band: "strategist", days: 10, seed: 613, start: { s: 65, h: 65, m: 60, t: 40 }, drain: { s: 5, h: 1, m: 1 }, harsh: 1.3, delayed: true, two: 6, three: 17, intro: "The final crossing. Every meter is thin and the risks are real. Bring every person home." },
  ],
};

export function levelById(id: string): ExpLevel | undefined {
  return Object.values(EXPEDITION_LEVELS).flat().find((l) => l.id === id);
}

/** The events of a level, one per day (the same every time it's played). */
export function eventsFor(level: ExpLevel): ExpEvent[] {
  const pool = EVENTS.filter((e) => e.bands.includes(level.band));
  const r = rng(level.seed);
  const order = pool.map((e) => ({ e, k: r() })).sort((a, b) => a.k - b.k).map((x) => x.e);
  const out: ExpEvent[] = [];
  for (let d = 0; d < level.days; d++) out.push(order[d % order.length]);
  return out;
}

/** Whether a gamble on a given day goes well (fixed by the seed, hidden from the player). */
export function gambleWins(level: ExpLevel, day: number, odds: number): boolean {
  const r = rng(level.seed * 31 + day * 977 + 5);
  r();
  return r() < odds;
}

/** Scales the bad side of a choice for harder levels. */
export function scaled(fx: Effects, harsh: number): Effects {
  const out: Effects = {};
  for (const k of Object.keys(fx) as Meter[]) {
    const v = fx[k] ?? 0;
    out[k] = v < 0 ? Math.round(v * harsh) : v;
  }
  return out;
}

export interface Meters {
  s: number;
  h: number;
  m: number;
  t: number;
}

export interface Line {
  text: string;
  fx: Effects;
  kind: "choice" | "gamble" | "later" | "drain" | "hunger" | "trust";
}

export interface DayResult {
  day: number;
  event: ExpEvent;
  choice: number;
  lines: Line[];
  before: Meters;
  after: Meters;
  /** A meter ran out: the team stopped to wait for rescue. */
  failed: Meter | null;
}

interface Pending {
  due: number;
  fx: Effects;
  text: string;
}

export interface ExpState {
  meters: Meters;
  pending: Pending[];
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function apply(m: Meters, fx: Effects): Meters {
  return { s: clamp(m.s + (fx.s ?? 0)), h: clamp(m.h + (fx.h ?? 0)), m: clamp(m.m + (fx.m ?? 0)), t: clamp(m.t + (fx.t ?? 0)) };
}

export function startState(level: ExpLevel): ExpState {
  return { meters: { ...level.start }, pending: [] };
}

/** Plays one day: the choice, anything coming back from earlier days, then the cost of travel. */
export function playDay(level: ExpLevel, state: ExpState, day: number, choiceIdx: number): { result: DayResult; state: ExpState } {
  const event = eventsFor(level)[day];
  const choice = event.choices[choiceIdx] ?? event.choices[0];
  const before = { ...state.meters };
  let m = { ...state.meters };
  let pending = [...state.pending];
  const lines: Line[] = [];

  const fx = scaled(choice.fx, level.harsh);
  m = apply(m, fx);
  lines.push({ text: choice.label, fx, kind: "choice" });

  if (choice.gamble) {
    const win = gambleWins(level, day, choice.gamble.odds);
    const gfx = scaled(win ? choice.gamble.win : choice.gamble.lose, level.harsh);
    m = apply(m, gfx);
    lines.push({ text: win ? choice.gamble.winText : choice.gamble.loseText, fx: gfx, kind: "gamble" });
  }

  if (choice.later) {
    const lfx = scaled(choice.later.fx, level.harsh);
    if (level.delayed) pending.push({ due: day + choice.later.days, fx: lfx, text: choice.later.text });
    else {
      m = apply(m, lfx);
      lines.push({ text: choice.later.text, fx: lfx, kind: "later" });
    }
  }

  for (const p of pending.filter((p) => p.due === day)) {
    m = apply(m, p.fx);
    lines.push({ text: p.text, fx: p.fx, kind: "later" });
  }
  pending = pending.filter((p) => p.due > day);

  const drain: Effects = { s: -level.drain.s, h: -level.drain.h, m: -level.drain.m };
  m = apply(m, drain);
  lines.push({ text: "A day of hauling across the ice", fx: drain, kind: "drain" });

  if (m.s < 20) {
    const f = { h: -5 };
    m = apply(m, f);
    lines.push({ text: "Food is running low, so the crew is hungry and weaker", fx: f, kind: "hunger" });
  }
  if (m.t >= 70) {
    const f = { m: 2 };
    m = apply(m, f);
    lines.push({ text: "The team trusts you, and that keeps them hopeful", fx: f, kind: "trust" });
  } else if (m.t < 30) {
    const f = { m: -3 };
    m = apply(m, f);
    lines.push({ text: "The team doubts its leader, and the doubt spreads", fx: f, kind: "trust" });
  }

  const failed: Meter | null = m.s <= 0 ? "s" : m.h <= 0 ? "h" : m.m <= 0 ? "m" : null;
  return { result: { day, event, choice: event.choices[choiceIdx] ? choiceIdx : 0, lines, before, after: m, failed }, state: { meters: m, pending } };
}

/** Stars from the weakest final meter (all four, Trust included). */
export function starsFor(level: ExpLevel, meters: Meters, finished: boolean): number {
  if (!finished) return 0;
  const low = Math.min(meters.s, meters.h, meters.m, meters.t);
  return low >= level.three ? 3 : low >= level.two ? 2 : 1;
}

/** Checks that moves are a list of whole numbers in range for each day. */
export function cleanMoves(level: ExpLevel, moves: unknown): number[] | null {
  if (!Array.isArray(moves) || moves.length > level.days) return null;
  const events = eventsFor(level);
  const out: number[] = [];
  for (let i = 0; i < moves.length; i++) {
    const v = moves[i];
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v >= events[i].choices.length) return null;
    out.push(v);
  }
  return out;
}

/** Replays a whole game from the kid's choices (the server uses this to check the score). */
export function replay(level: ExpLevel, moves: number[]): { days: DayResult[]; meters: Meters; finished: boolean; failed: Meter | null; stars: number; best: number } {
  let state = startState(level);
  const days: DayResult[] = [];
  let failed: Meter | null = null;
  for (let d = 0; d < level.days && d < moves.length; d++) {
    const r = playDay(level, state, d, moves[d]);
    state = r.state;
    days.push(r.result);
    if (r.result.failed) {
      failed = r.result.failed;
      break;
    }
  }
  const finished = !failed && days.length === level.days;
  const m = state.meters;
  return { days, meters: m, finished, failed, stars: starsFor(level, m, finished), best: finished ? m.s + m.h + m.m + m.t : 0 };
}

const toMini = (l: ExpLevel): MiniLevel => ({ id: l.id, title: l.title, intro: l.intro });

export const expeditionInfo = { id: "expedition", title: "Expedition Leader", icon: "🧭", land: "summit" as const, blurb: "Lead a polar team through hard choices. Keep everyone safe, fed and hopeful." };

export const expedition: MiniGame | null = {
  ...expeditionInfo,
  levels: (band) => (EXPEDITION_LEVELS[band] ?? []).map(toMini),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const clean = cleanMoves(level, moves);
      if (!clean) return { stars: 0, best: 0 };
      const r = replay(level, clean);
      return { stars: r.stars, best: r.best };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
