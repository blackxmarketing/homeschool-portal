import type { Subject } from "./compliance";

/**
 * Side quests break up practice with something different:
 *  - brain:   a puzzle; the kid checks their own thinking against the reveal.
 *  - create:  an open creative-thinking challenge; the kid writes an answer the parent can read.
 *  - mission: a hands-on, off-screen task; the kid marks it done and a parent
 *             approves it, which awards XP and logs the minutes for records.
 *
 * Written for grades 6-8, with themes of money, business, leadership,
 * character, science, history and civics.
 */

export type QuestKind = "brain" | "create" | "mission";
export type QuestTheme = "money" | "business" | "leadership" | "character" | "science" | "engineering" | "history" | "civics" | "logic";

export interface Quest {
  id: string;
  kind: QuestKind;
  theme: QuestTheme;
  title: string;
  text: string;
  /** brain: the answer and reasoning. */
  reveal?: string;
  /** mission: minutes and subject logged once a parent approves it. */
  minutes?: number;
  subject?: Subject;
  xp: number;
}

export const THEME_LABEL: Record<QuestTheme, string> = {
  money: "💰 Money",
  business: "🚀 Business",
  leadership: "🧭 Leadership",
  character: "🛡️ Character",
  science: "🔬 Science",
  engineering: "🛠️ Engineering",
  history: "🏛️ History",
  civics: "🗽 Civics",
  logic: "🧩 Logic",
};

export const KIND_LABEL: Record<QuestKind, string> = {
  brain: "Brain Bender",
  create: "Creative Challenge",
  mission: "Real-World Mission",
};

export const QUESTS: Quest[] = [
  // ---- Brain benders ----
  {
    id: "b.lemonade-profit",
    kind: "brain",
    theme: "business",
    title: "The lemonade math",
    text: "Your lemonade costs $0.30 a cup to make. You sell it for $1.00. You also paid $14 for a sign and a table. How many cups do you have to sell before you make any profit at all?",
    reveal: "Each cup earns $0.70 of profit. $14 ÷ $0.70 = 20 cups just to pay back the sign and table. Cup 21 is your first real profit. That's called the break-even point.",
    xp: 15,
  },
  {
    id: "b.compound",
    kind: "brain",
    theme: "money",
    title: "Double or nothing",
    text: "Option A: $1,000 today. Option B: 1 penny today, doubled every day for 30 days. Which do you pick?",
    reveal: "Option B! A penny doubled 29 times is $5,368,709.12 on day 30. That's the power of compounding: growth on top of growth. It's why starting to save early matters so much.",
    xp: 15,
  },
  {
    id: "b.river",
    kind: "brain",
    theme: "logic",
    title: "The river crossing",
    text: "A farmer must cross a river with a wolf, a goat and a cabbage. The boat holds the farmer and one item. Left alone, the wolf eats the goat and the goat eats the cabbage. How does everything get across?",
    reveal: "Take the goat over. Come back. Take the wolf over, bring the goat back. Take the cabbage over. Come back and take the goat. Sometimes progress means bringing something back!",
    xp: 15,
  },
  {
    id: "b.fermi-piano",
    kind: "brain",
    theme: "logic",
    title: "Estimate like an engineer",
    text: "About how many times does your heart beat in one year? Don't look it up. Estimate step by step.",
    reveal: "About 70 beats a minute × 60 minutes × 24 hours × 365 days ≈ 37 million beats. Breaking a huge question into small known pieces is called a Fermi estimate.",
    xp: 15,
  },
  {
    id: "b.price-test",
    kind: "brain",
    theme: "business",
    title: "Price it right",
    text: "At $4 you sell 50 bracelets a week. At $6 you sell 30. Each bracelet costs you $1 to make. Which price earns more profit?",
    reveal: "$4: 50 × ($4 − $1) = $150. $6: 30 × ($6 − $1) = $150. A tie! A business would test $5 next. The best price isn't always the highest one.",
    xp: 15,
  },
  {
    id: "b.knights",
    kind: "brain",
    theme: "logic",
    title: "Truth-tellers and liars",
    text: "On an island, knights always tell the truth and knaves always lie. A says: \"We are both knaves.\" What are A and B?",
    reveal: "If A were a knight, the statement would be true, so A would be a knave. That's impossible. So A is a knave and the statement is false, which means B is a knight.",
    xp: 15,
  },
  {
    id: "b.interest",
    kind: "brain",
    theme: "money",
    title: "The credit card trap",
    text: "You buy a $500 bike on a credit card at 24% interest a year and pay nothing for a year. About how much do you owe now?",
    reveal: "About $500 × 1.24 = $620 (a bit more because interest compounds monthly). You paid $120+ extra for the same bike. Interest works for savers and against borrowers.",
    xp: 15,
  },
  {
    id: "b.bridge",
    kind: "brain",
    theme: "logic",
    title: "The night bridge",
    text: "Four people must cross a bridge at night with one flashlight. At most two cross at a time, at the slower one's speed. They take 1, 2, 5 and 10 minutes. Can they all cross in 17 minutes?",
    reveal: "1 & 2 cross (2). 1 returns (1). 5 & 10 cross (10). 2 returns (2). 1 & 2 cross (2). Total 17. The trick is sending the two slowest together.",
    xp: 15,
  },
  {
    id: "b.supply",
    kind: "brain",
    theme: "money",
    title: "Supply and demand",
    text: "A snowstorm is coming and every store's shovels are selling out. What probably happens to shovel prices, and why?",
    reveal: "Prices go up. Demand jumped but supply didn't. Higher prices also tell suppliers to rush more shovels to town. Prices are signals.",
    xp: 15,
  },
  {
    id: "b.leverage",
    kind: "brain",
    theme: "science",
    title: "Archimedes' lever",
    text: "Archimedes said: \"Give me a place to stand and a lever long enough, and I will move the world.\" How can a small push lift a heavy rock?",
    reveal: "A lever trades distance for force. Push down a long way on the long end and the short end lifts the rock a short way with much more force.",
    xp: 15,
  },

  // ---- Creative challenges ----
  {
    id: "c.problem-hunt",
    kind: "create",
    theme: "business",
    title: "Problem hunter",
    text: "Every business starts with a problem. Write down 3 annoying problems you or your family had this week. Pick one: what product or service could fix it?",
    xp: 20,
  },
  {
    id: "c.pitch",
    kind: "create",
    theme: "business",
    title: "30-second pitch",
    text: "Invent a product. Write a pitch: what problem it solves, who would buy it, and why they'd pick yours. Keep it under 60 words.",
    xp: 20,
  },
  {
    id: "c.leader-choice",
    kind: "create",
    theme: "leadership",
    title: "Captain's call",
    text: "You lead a team of 4 building a treehouse. One teammate keeps showing up late and the others are getting angry. What do you do, and what do you say?",
    xp: 20,
  },
  {
    id: "c.hundred-uses",
    kind: "create",
    theme: "engineering",
    title: "10 uses for a brick",
    text: "List 10 different uses for a brick. The weirder, the better. Creative thinkers find options other people miss.",
    xp: 20,
  },
  {
    id: "c.virtue",
    kind: "create",
    theme: "character",
    title: "Courage check",
    text: "Write about a time you did the right thing even though it was hard, or a time you wish you had. What would you do next time?",
    xp: 20,
  },
  {
    id: "c.budget",
    kind: "create",
    theme: "money",
    title: "The $100 plan",
    text: "Someone gives you $100. Make a plan: how much do you spend, save, give, and invest? Explain why.",
    xp: 20,
  },
  {
    id: "c.founders",
    kind: "create",
    theme: "history",
    title: "Founders' dinner",
    text: "You can have dinner with any person from history. Who, and what 3 questions would you ask them?",
    xp: 20,
  },
  {
    id: "c.improve",
    kind: "create",
    theme: "engineering",
    title: "Redesign it",
    text: "Pick an everyday object (a backpack, a toothbrush, a chair). Name 2 things wrong with it and sketch or describe your improved version.",
    xp: 20,
  },
  {
    id: "c.rules",
    kind: "create",
    theme: "civics",
    title: "Write the rules",
    text: "You're starting a new town of 100 people. What are the 3 most important laws you'd write, and why? How would people change them later?",
    xp: 20,
  },
  {
    id: "c.mistake",
    kind: "create",
    theme: "character",
    title: "Fail forward",
    text: "Thomas Edison tested thousands of materials before finding one that worked for the light bulb. Describe something you failed at. What did it teach you?",
    xp: 20,
  },

  // ---- Real-world missions (off-screen, parent approves) ----
  {
    id: "m.grocery",
    kind: "mission",
    theme: "money",
    title: "Grocery strategist",
    text: "On the next grocery trip, compare unit prices (price per ounce) on 3 items. Find the best deal on each and tell a parent why.",
    minutes: 30,
    subject: "Math",
    xp: 40,
  },
  {
    id: "m.business-day",
    kind: "mission",
    theme: "business",
    title: "Mini-business day",
    text: "Run a tiny business for a day: lemonade, baked goods, yard work, car washing. Track what you spent, what you earned and your profit.",
    minutes: 120,
    subject: "Math",
    xp: 80,
  },
  {
    id: "m.interview",
    kind: "mission",
    theme: "business",
    title: "Interview a business owner",
    text: "Ask a business owner (family friend, neighbor, local shop) 5 questions: how they started, their biggest mistake, how they find customers. Write down the answers.",
    minutes: 45,
    subject: "Speaking",
    xp: 60,
  },
  {
    id: "m.build",
    kind: "mission",
    theme: "engineering",
    title: "Bridge builder",
    text: "Build a bridge from spaghetti or popsicle sticks and tape that spans 30 cm. How many coins can it hold before it breaks? Try to beat your record.",
    minutes: 45,
    subject: "Science",
    xp: 50,
  },
  {
    id: "m.experiment",
    kind: "mission",
    theme: "science",
    title: "Kitchen chemist",
    text: "Mix baking soda and vinegar in a bottle with a balloon over the top. Try 3 different amounts of baking soda. Predict, test, and record what happens.",
    minutes: 30,
    subject: "Science",
    xp: 40,
  },
  {
    id: "m.speech",
    kind: "mission",
    theme: "leadership",
    title: "Stand and deliver",
    text: "Give a 2-minute talk to your family about something you learned this week. Stand up, make eye contact, no reading from notes.",
    minutes: 20,
    subject: "Speaking",
    xp: 40,
  },
  {
    id: "m.fix-it",
    kind: "mission",
    theme: "engineering",
    title: "Fix-it crew",
    text: "With a parent, fix something broken around the house: a loose hinge, a wobbly chair, a bike chain. Explain how it works now.",
    minutes: 30,
    subject: "Other",
    xp: 40,
  },
  {
    id: "m.cook",
    kind: "mission",
    theme: "money",
    title: "Chef on a budget",
    text: "Plan and cook one family meal. Figure out the cost per serving and compare it to eating out.",
    minutes: 60,
    subject: "Math",
    xp: 60,
  },
  {
    id: "m.constitution",
    kind: "mission",
    theme: "civics",
    title: "Know your rights",
    text: "Read the First Amendment with a parent. Explain the 5 freedoms it protects in your own words, with a real-life example of each.",
    minutes: 30,
    subject: "U.S. Constitution",
    xp: 50,
  },
  {
    id: "m.history-walk",
    kind: "mission",
    theme: "history",
    title: "Local history detective",
    text: "Find out the story behind your town's name or one historic building nearby. Visit or research it, then tell your family 3 facts.",
    minutes: 45,
    subject: "History",
    xp: 50,
  },
  {
    id: "m.serve",
    kind: "mission",
    theme: "character",
    title: "Secret service",
    text: "Do something helpful for someone without being asked and without telling them it was you. Tell a parent afterward what you did.",
    minutes: 20,
    subject: "Other",
    xp: 40,
  },
  {
    id: "m.read",
    kind: "mission",
    theme: "history",
    title: "Biography hour",
    text: "Read for 30 minutes from a biography of an inventor, explorer, entrepreneur or leader. Tell a parent the toughest challenge they faced.",
    minutes: 30,
    subject: "Reading",
    xp: 40,
  },
  {
    id: "m.nature",
    kind: "mission",
    theme: "science",
    title: "Field scientist",
    text: "Go outside and find 5 different plants or insects. Sketch each one and write one question about it to investigate.",
    minutes: 40,
    subject: "Science",
    xp: 50,
  },
  {
    id: "m.letter",
    kind: "mission",
    theme: "character",
    title: "Thank-you letter",
    text: "Handwrite a real thank-you letter to someone who helped you: a coach, grandparent, neighbor. Mail it or deliver it.",
    minutes: 20,
    subject: "Writing",
    xp: 40,
  },
  {
    id: "m.measure",
    kind: "mission",
    theme: "engineering",
    title: "Blueprint your room",
    text: "Measure your bedroom and draw a floor plan to scale (1 square = 1 foot). Find the area. Could you fit a desk in a better spot?",
    minutes: 40,
    subject: "Math",
    xp: 50,
  },
];

export const QUEST_BY_ID = new Map(QUESTS.map((q) => [q.id, q]));

/**
 * Picks the next side quest, avoiding ones done recently. Missions are only
 * offered when the kid can actually go do them (not mid-question streaks
 * where they'd lose focus), so callers pass which kinds are allowed.
 */
export function pickQuest(recentIds: Set<string>, kinds: QuestKind[], rand: () => number = Math.random): Quest {
  const pool = QUESTS.filter((q) => kinds.includes(q.kind));
  const fresh = pool.filter((q) => !recentIds.has(q.id));
  const from = fresh.length ? fresh : pool;
  return from[Math.floor(rand() * from.length)];
}
