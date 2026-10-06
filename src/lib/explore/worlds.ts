import type { Hero } from "../pixel/hero";
import type { K5Subject } from "@/content/courses/k5/base";

/**
 * The six K-5 worlds (docs/WORLDS.md): one per grade, each a chapter of
 * "The Lightkeeper's Journey". Pip the firefly tells the story; villagers
 * give tips and side quests; treasure, sparks and lanterns unlock new hero
 * styles. The story gets longer and deeper as the grades go up.
 */

export type ThemeId = "meadow" | "forest" | "river" | "sky" | "canyon" | "peaks";
export type WorldKey = "k" | "1" | "2" | "3" | "4" | "5";

export interface Villager {
  id: string;
  name: string;
  look: Hero;
  /** What they say, one line at a time. */
  lines: string[];
}

export interface SideQuest {
  id: string;
  /** The villager who asks for help. */
  giver: string;
  title: string;
  /** Asked before the kid has found everything. */
  ask: string[];
  /** Said when everything is found. */
  thanks: string[];
  item: { name: string; plural: string; sprite: "duckling" | "acorn" | "float" | "feather" | "fossil" | "starmap" };
  count: number;
  reward: string;
}

export interface Chest {
  id: string;
  reward: string;
  /** Lessons the kid must finish in this world before it opens. */
  lessons: number;
}

export interface WorldDef {
  key: WorldKey;
  grade: number;
  name: string;
  chapter: number;
  chapterTitle: string;
  theme: ThemeId;
  seed: number;
  /** Pip tells this the first time the kid arrives (one card per line). */
  intro: string[];
  /** When every lantern is lit. */
  outro: string[];
  /** A short reminder of the goal, shown in the HUD. */
  goal: string;
  zones: Record<K5Subject, { name: string; lantern: string }>;
  villagers: Villager[];
  quest: SideQuest;
  chests: Chest[];
  /** Sparks hidden around the map, and what finding them all gives. */
  sparks: number;
  sparkReward: string;
  /** A landmark to discover, with a few true things about it. */
  landmark: { name: string; lines: string[] };
  /** For lighting the first lantern, and for lighting them all. */
  firstLantern: string;
  allLanterns: string;
}

const look = (skin: number, hair: Hero["hair"], hairColor: number, outfit: number, hat: Hero["hat"] = "none"): Hero => ({ skin, hair, hairColor, outfit, hat, pet: "none" });

export const WORLDS: WorldDef[] = [
  {
    key: "k",
    grade: 0,
    name: "Sunny Meadow",
    chapter: 1,
    chapterTitle: "The Sleepy Sun",
    theme: "meadow",
    seed: 101,
    intro: [
      "Hi! I'm Pip, a little firefly. Welcome to Sunny Meadow!",
      "Oh no. A grumpy gray cloud called the Gloom hid the sun.",
      "Now the meadow is sleepy and dim.",
      "Five lanterns can wake the sun back up. But they went dark.",
      "You light a lantern by learning! Walk to a glowing stone to start a lesson.",
      "Let's explore together. Tap where you want to go, or use the arrow keys.",
    ],
    outro: [
      "You did it! All five lanterns are glowing!",
      "The Gloom floated away, and the sun is awake. The meadow is bright again!",
      "Look! A path opened to Whisperwood Forest. A new adventure waits there next year.",
    ],
    goal: "Light the five lanterns to wake the sun.",
    zones: {
      math: { name: "Counting Farm", lantern: "Number Lantern" },
      ela: { name: "Alphabet Garden", lantern: "Letter Lantern" },
      sci: { name: "Bug and Bloom Pond", lantern: "Nature Lantern" },
      soc: { name: "Helper Hill", lantern: "Helper Lantern" },
      span: { name: "Hola Hollow", lantern: "Hola Lantern" },
    },
    villagers: [
      { id: "farmer", name: "Farmer Rosa", look: look(2, "bun", 1, 3, "sunhat"), lines: ["Good morning! My cows love counting. Moo, moo, moo makes three!", "The Counting Farm is up on the hill. Go learn your numbers there!"] },
      { id: "baker", name: "Baker Tom", look: look(0, "short", 3, 6), lines: ["I bake bread every day. I need to know letters to read my recipes.", "Try the Alphabet Garden. The letters grow like flowers!"] },
      { id: "mama-duck", name: "Mama Duck", look: look(4, "short", 4, 8), lines: ["Quack! Quack!"] },
      { id: "kid", name: "Little Sam", look: look(3, "curly", 0, 1, "cap"), lines: ["I found a shiny spark in the tall grass!", "Sparks hide all over the meadow. Can you find them all?"] },
    ],
    quest: {
      id: "ducklings",
      giver: "mama-duck",
      title: "Mama Duck's Ducklings",
      ask: ["Quack! My three ducklings wandered off!", "Can you find them for me? Look near the water and the flowers."],
      thanks: ["Quack quack! You found all my ducklings!", "Thank you, friend. Here is a duckling of your very own!"],
      item: { name: "duckling", plural: "ducklings", sprite: "duckling" },
      count: 3,
      reward: "pet:duckling",
    },
    chests: [
      { id: "c1", reward: "outfit:8", lessons: 0 },
      { id: "c2", reward: "hair:braids", lessons: 3 },
      { id: "c3", reward: "hat:flower", lessons: 8 },
    ],
    sparks: 8,
    sparkReward: "hat:sunhat",
    landmark: { name: "The Old Windmill", lines: ["This is a windmill. The wind pushes its big arms around and around.", "Long ago, windmills turned stones that ground wheat into flour for bread."] },
    firstLantern: "outfit:9",
    allLanterns: "pet:lamb",
  },
  {
    key: "1",
    grade: 1,
    name: "Whisperwood Forest",
    chapter: 2,
    chapterTitle: "The Lost Songbirds",
    theme: "forest",
    seed: 202,
    intro: [
      "Welcome to Whisperwood Forest! It's me, Pip. You grew so much since the meadow!",
      "This forest used to be full of bird songs. Tweet, tweet!",
      "But the Gloom came back as a thick, cold fog. It hushed every song.",
      "The forest has five lanterns too. When they shine, the fog will lift.",
      "Learn at the glowing stones to light them. Visit the arcades to play and practice.",
      "Some forest friends need help, and treasure is hiding in the trees. Let's go!",
    ],
    outro: [
      "Listen! Can you hear it? The birds are singing again!",
      "The fog rolled away, and the forest is full of music.",
      "The Gloom is sneaky, though. I saw it drift toward the river valley. We'll follow it there next.",
    ],
    goal: "Light the five lanterns to lift the fog and bring back the songs.",
    zones: {
      math: { name: "Acorn Grove", lantern: "Acorn Lantern" },
      ela: { name: "Story Stump Library", lantern: "Story Lantern" },
      sci: { name: "Shadow and Song Glade", lantern: "Song Lantern" },
      soc: { name: "Treetop Town", lantern: "Town Lantern" },
      span: { name: "Bosque Bridge", lantern: "Bosque Lantern" },
    },
    villagers: [
      { id: "owl", name: "Professor Hoot", look: look(5, "bob", 6, 7, "explorer"), lines: ["Hoo! In this forest we count acorns by tens. Ten, twenty, thirty!", "A good reader notices the details. So does a good explorer."] },
      { id: "squirrel", name: "Nutmeg the Squirrel", look: look(2, "spiky", 2, 3), lines: ["Nuts, nuts, nuts!"] },
      { id: "ranger", name: "Ranger Ivy", look: look(1, "ponytail", 1, 2, "explorer"), lines: ["Stay on the paths when the fog is thick.", "Each lantern you light makes that part of the forest bright and green again."] },
      { id: "kid", name: "Pinecone Pete", look: look(3, "short", 0, 5, "beanie"), lines: ["I counted 47 pinecones today. Then I lost count!", "There are sparks hidden in the forest. I found one behind a big tree!"] },
    ],
    quest: {
      id: "acorns",
      giver: "squirrel",
      title: "Nutmeg's Lost Acorns",
      ask: ["Oh dear, oh dear! The fog blew my winter acorns all over the forest.", "I need five acorns to make it through the winter. Will you find them?"],
      thanks: ["Five acorns! One, two, three, four, five. That's all of them!", "You're a true friend. I'll come along on your adventures!"],
      item: { name: "acorn", plural: "acorns", sprite: "acorn" },
      count: 5,
      reward: "pet:squirrel",
    },
    chests: [
      { id: "c1", reward: "outfit:10", lessons: 0 },
      { id: "c2", reward: "hair:ponytail", lessons: 3 },
      { id: "c3", reward: "hat:acorn", lessons: 8 },
    ],
    sparks: 10,
    sparkReward: "hat:leafcrown",
    landmark: { name: "The Great Oak", lines: ["This oak tree is hundreds of years old!", "Oak trees grow from tiny acorns. Squirrels bury acorns, and some of them grow into new trees."] },
    firstLantern: "outfit:11",
    allLanterns: "pet:hedgehog",
  },
  {
    key: "2",
    grade: 2,
    name: "Riverbend Valley",
    chapter: 3,
    chapterTitle: "The River Mill",
    theme: "river",
    seed: 303,
    intro: [
      "Welcome to Riverbend Valley, Lightkeeper! Pip here.",
      "This valley has a busy river town, with a mill, a market and boats on the water.",
      "But the Gloom froze the river's light. The mill wheel stopped, and the boats can't sail.",
      "The people here are working hard, but they need five lanterns lit to get the river running.",
      "Each lantern stands in a different part of the valley. Learn there to light it.",
      "And keep your eyes open. The river hides treasure along its banks.",
    ],
    outro: [
      "Splash! The river is running again, and the mill wheel is turning!",
      "Boats are sailing, and the market is busy. The whole valley is cheering for you.",
      "But look up. Those islands floating in the sky... I think the Gloom went up there. Next stop: the Sky Islands!",
    ],
    goal: "Light the five lanterns to get the river and the mill running again.",
    zones: {
      math: { name: "Mill Market", lantern: "Market Lantern" },
      ela: { name: "Riverbank Readers", lantern: "Reader's Lantern" },
      sci: { name: "Waterfall Lab", lantern: "Waterfall Lantern" },
      soc: { name: "Ferry Landing", lantern: "Ferry Lantern" },
      span: { name: "Plaza del Río", lantern: "Lantern of the River" },
    },
    villagers: [
      { id: "miller", name: "Miller Grant", look: look(1, "short", 2, 7, "cap"), lines: ["My mill grinds wheat into flour. The river turns the big wheel.", "No river, no flour. No flour, no bread!"] },
      { id: "fisher", name: "Captain Marlo", look: look(3, "curly", 0, 4, "sailor"), lines: ["Ahoy! I've lost my fishing floats all along the river."] },
      { id: "shop", name: "Shopkeeper Lin", look: look(0, "bob", 0, 6), lines: ["At my shop, a carrot costs 25 cents. That's one quarter!", "Coins add up fast. Practice in the Coin Shop to get really good."] },
      { id: "kid", name: "Skipper Jo", look: look(2, "ponytail", 3, 5, "cap"), lines: ["I like to read on the riverbank. Have you been to the library there?", "Sparks love to hide near bridges. I've seen them twinkle!"] },
    ],
    quest: {
      id: "floats",
      giver: "fisher",
      title: "Captain Marlo's Fishing Floats",
      ask: ["Ahoy, Lightkeeper! When the river stopped, my four red fishing floats got stuck all over the valley.", "Bring them back and I'll share a special friend from the river."],
      thanks: ["Four floats! Ship-shape and ready to sail.", "This little frog has been hopping around my boat. He wants to go with you!"],
      item: { name: "fishing float", plural: "fishing floats", sprite: "float" },
      count: 4,
      reward: "pet:frog",
    },
    chests: [
      { id: "c1", reward: "outfit:12", lessons: 0 },
      { id: "c2", reward: "hairColor:8", lessons: 3 },
      { id: "c3", reward: "hat:sailor", lessons: 8 },
    ],
    sparks: 10,
    sparkReward: "hat:straw",
    landmark: { name: "The Water Mill", lines: ["The river pushes the big wooden wheel, and the wheel turns the millstones inside.", "People have used water wheels to grind grain for more than two thousand years."] },
    firstLantern: "outfit:13",
    allLanterns: "pet:turtle",
  },
  {
    key: "3",
    grade: 3,
    name: "Sky Islands",
    chapter: 4,
    chapterTitle: "Islands Adrift",
    theme: "sky",
    seed: 404,
    intro: [
      "Hold on tight! Welcome to the Sky Islands, high above the clouds.",
      "Long ago, builders tied these floating islands together with strong bridges, and towns grew on every one.",
      "Then the Gloom snuck up here and dimmed the five great lanterns. Without their light, the bridges are weakening and the islands are slowly drifting apart.",
      "If they drift too far, the island towns will be cut off from each other. We have to work fast!",
      "Light each lantern by learning on its island, and the bridges will hold strong again.",
      "Islanders need your help too, and the winds have scattered treasure across the clouds.",
    ],
    outro: [
      "The last lantern is lit, and every bridge is glowing gold!",
      "The islands have stopped drifting. Balloons and travelers are crossing between them again.",
      "I spotted the Gloom diving down into a red canyon far below. It's getting stronger each time. Next year, we follow it into the Canyon of Echoes.",
    ],
    goal: "Light the five lanterns to hold the islands together.",
    zones: {
      math: { name: "Array Orchard Isle", lantern: "Orchard Lantern" },
      ela: { name: "Cloud Library Isle", lantern: "Library Lantern" },
      sci: { name: "Weather Tower Isle", lantern: "Weather Lantern" },
      soc: { name: "Capitol Isle", lantern: "Capitol Lantern" },
      span: { name: "Isla Arcoíris", lantern: "Rainbow Lantern" },
    },
    villagers: [
      { id: "pilot", name: "Pilot Amelia", look: look(1, "swoop", 4, 6, "aviator"), lines: ["I fly the mail balloon between the islands.", "Wind blows from high pressure to low pressure. Pilots always read the weather!"] },
      { id: "keeper", name: "Birdkeeper Wren", look: look(4, "braids", 0, 5), lines: ["My bluebird's feathers blew away in the storm."] },
      { id: "mayor", name: "Mayor Fuller", look: look(0, "short", 6, 7, "cap"), lines: ["On Capitol Isle we have a council, a mayor and a court. Each has its own job.", "Good laws need good citizens. That means you!"] },
      { id: "kid", name: "Orchard Ollie", look: look(3, "curly", 2, 2, "propeller"), lines: ["Our orchard has 6 rows of 8 trees. That's 48 trees! Arrays make counting easy.", "I bet you can't find all the sparks. Some are on the tiniest islands!"] },
    ],
    quest: {
      id: "feathers",
      giver: "keeper",
      title: "Wren's Windblown Feathers",
      ask: ["A great gust scattered four blue feathers from my aviary across the islands.", "My bluebird can't fly well without its nest lined with them. Could you gather all four?"],
      thanks: ["All four feathers! Now the nest is soft and warm again.", "One of the young bluebirds has chosen you. Take good care of it!"],
      item: { name: "blue feather", plural: "blue feathers", sprite: "feather" },
      count: 4,
      reward: "pet:bluebird",
    },
    chests: [
      { id: "c1", reward: "outfit:14", lessons: 0 },
      { id: "c2", reward: "hairColor:9", lessons: 4 },
      { id: "c3", reward: "hat:propeller", lessons: 10 },
    ],
    sparks: 12,
    sparkReward: "hat:aviator",
    landmark: { name: "The Balloon Dock", lines: ["Hot air rises because it is lighter than the cool air around it. That lifts the balloon!", "In 1783, the Montgolfier brothers of France flew the first hot-air balloons that carried people."] },
    firstLantern: "outfit:15",
    allLanterns: "pet:cloudpup",
  },
  {
    key: "4",
    grade: 4,
    name: "Canyon of Echoes",
    chapter: 5,
    chapterTitle: "Echoes of the Ancients",
    theme: "canyon",
    seed: 505,
    intro: [
      "Welcome to the Canyon of Echoes, Lightkeeper. Listen... hello, hello, hello!",
      "These red rock walls were carved by a river over millions of years. Each layer of rock is a page in Earth's history.",
      "People have lived here for a very long time. Cliff dwellings, old trails and a railroad town all tell their stories.",
      "But the Gloom has buried the five lanterns in shadow, and the canyon's stories are fading into silence.",
      "Light the lanterns by mastering what each part of the canyon can teach you. The echoes will carry the stories again.",
      "The town historian needs fossils for the museum, and miners say treasure is hidden in the rocks.",
    ],
    outro: [
      "The canyon is glowing red and gold at sunset, and every echo is clear again.",
      "The museum is full, the trains are running, and the old stories are safe.",
      "But the Gloom fled north to the highest peaks. I think it's hiding something up there. One more chapter: the Starpeak Frontier.",
    ],
    goal: "Light the five lanterns to bring the canyon's stories back.",
    zones: {
      math: { name: "Mesa Mint", lantern: "Mint Lantern" },
      ela: { name: "Echo Cave Scrolls", lantern: "Scroll Lantern" },
      sci: { name: "Rock Layer Lab", lantern: "Stone Lantern" },
      soc: { name: "Trail Fort Museum", lantern: "Museum Lantern" },
      span: { name: "Mercado del Cañón", lantern: "Lantern of the Canyon" },
    },
    villagers: [
      { id: "historian", name: "Historian Ada", look: look(1, "bun", 6, 4, "explorer"), lines: ["The museum lost its fossil collection in a rockslide."] },
      { id: "engineer", name: "Engineer Casey", look: look(3, "short", 0, 7, "miner"), lines: ["The railroad brought miners, ranchers and shopkeepers to this canyon.", "A train turns stored energy into motion. Energy changes forms; it never just disappears."] },
      { id: "guide", name: "Trail Guide Sol", look: look(4, "long", 0, 16, "cowboy"), lines: ["Use latitude and longitude to find any place on Earth.", "Rock layers are like a stack of pages: the oldest are usually at the bottom."] },
      { id: "kid", name: "Echo Eddie", look: look(2, "spiky", 3, 1, "cap"), lines: ["Shout into the canyon and count how long the echo takes!", "I found a spark wedged between two red rocks. There must be more."] },
    ],
    quest: {
      id: "fossils",
      giver: "historian",
      title: "The Museum's Missing Fossils",
      ask: ["A rockslide scattered five fossils from our collection across the canyon: a trilobite, a fern, a shell, a fish and a dinosaur tooth.", "Each one tells us what this place was like long ago. Will you bring them back?"],
      thanks: ["All five! The fern shows this desert was once green and wet. The shell and fish show water covered it long ago.", "Fossils are clues to Earth's past. Here, this little lizard has been guarding the museum. It wants to travel with you."],
      item: { name: "fossil", plural: "fossils", sprite: "fossil" },
      count: 5,
      reward: "pet:lizard",
    },
    chests: [
      { id: "c1", reward: "outfit:16", lessons: 0 },
      { id: "c2", reward: "hair:swoop", lessons: 4 },
      { id: "c3", reward: "hat:miner", lessons: 10 },
    ],
    sparks: 12,
    sparkReward: "hat:cowboy",
    landmark: { name: "The Cliff Houses", lines: ["Long ago, the Ancestral Puebloan people built homes of stone right into canyon cliffs.", "You can still visit cliff dwellings like these at Mesa Verde in Colorado. Some are more than 700 years old."] },
    firstLantern: "outfit:17",
    allLanterns: "pet:eagle",
  },
  {
    key: "5",
    grade: 5,
    name: "Starpeak Frontier",
    chapter: 6,
    chapterTitle: "The Starfall",
    theme: "peaks",
    seed: 606,
    intro: [
      "Welcome to the Starpeak Frontier, the highest place we've ever been.",
      "Up here the air is thin, the stars are bright, and an old observatory watches the night sky.",
      "There's a frontier fort below the peaks, where settlers once gathered to write down their rules and rights.",
      "Now I know the Gloom's secret. It isn't a monster. It's what happens when people stop learning, stop asking questions and stop caring for their communities. It grows wherever curiosity fades.",
      "That's why every lantern you've lit has pushed it back. Light these final five, and the frontier will shine for good.",
      "Watch for the stars that have fallen across the mountains. Collect them, and the observatory keeper will reward you.",
    ],
    outro: [
      "Every lantern on the frontier is blazing. Look up: the whole night sky is shining!",
      "You've carried the light through six worlds, from a sleepy meadow to the top of the world.",
      "You're not an apprentice anymore. You're a true Lightkeeper. Beyond these peaks lies Lumina, a whole world that needs you. I'll be right here, cheering you on.",
    ],
    goal: "Light the final five lanterns and push back the Gloom for good.",
    zones: {
      math: { name: "Star Ledger Tower", lantern: "Ledger Lantern" },
      ela: { name: "Frontier Press", lantern: "Press Lantern" },
      sci: { name: "Starpeak Observatory", lantern: "Star Lantern" },
      soc: { name: "Liberty Hall", lantern: "Liberty Lantern" },
      span: { name: "Pico de las Palabras", lantern: "Lantern of Words" },
    },
    villagers: [
      { id: "astronomer", name: "Astronomer Kepler", look: look(0, "curly", 6, 18, "starcrown"), lines: ["Pieces of my star map fell across the mountains in the storm."] },
      { id: "printer", name: "Printer Ben", look: look(1, "long", 6, 7, "cap"), lines: ["On this press we print the town's news. A free press helps people stay informed.", "Strong writers support their ideas with reasons and evidence."] },
      { id: "delegate", name: "Delegate Abigail", look: look(2, "bun", 1, 11), lines: ["At Liberty Hall we wrote down our rights, so no one could take them away.", "Three branches share the power: one makes laws, one carries them out, and one judges them. That's checks and balances."] },
      { id: "kid", name: "Scout Rowan", look: look(4, "swoop", 0, 19, "earmuffs"), lines: ["The Sun is a star too. It only looks bigger because it's so much closer than the others.", "I've found three fallen stars. Bet you can find more!"] },
    ],
    quest: {
      id: "starmap",
      giver: "astronomer",
      title: "Kepler's Scattered Star Map",
      ask: ["A blizzard tore my star map into six pieces and scattered them across the peaks.", "Without it, I can't track the planets or the seasons' stars. Would you search the frontier for every piece?"],
      thanks: ["The map is whole again! Look: the Big Dipper, Orion, and the path the planets take.", "The stars move across the sky because Earth spins, and different stars show in different seasons because Earth orbits the Sun. A little penguin wandered up from the ice lake to watch the stars with you!"],
      item: { name: "star map piece", plural: "star map pieces", sprite: "starmap" },
      count: 6,
      reward: "pet:penguin",
    },
    chests: [
      { id: "c1", reward: "outfit:18", lessons: 0 },
      { id: "c2", reward: "hairColor:10", lessons: 4 },
      { id: "c3", reward: "hat:earmuffs", lessons: 10 },
    ],
    sparks: 12,
    sparkReward: "hat:starcrown",
    landmark: { name: "The Observatory", lines: ["Astronomers use telescopes to see stars, planets and moons far away.", "Observatories are often built on mountains, where the air is thin and clear and city lights are far away."] },
    firstLantern: "outfit:19",
    allLanterns: "pet:snowfox",
  },
];

export const worldByKey = (key: string) => WORLDS.find((w) => w.key === key);
export const worldForGrade = (grade: number) => WORLDS.find((w) => w.grade === Math.max(0, Math.min(5, grade)))!;

/** Every reward a world can give, with where it comes from (for the hero screen hints). */
export function worldRewards(w: WorldDef): { id: string; how: string }[] {
  return [
    ...w.chests.map((c, i) => ({ id: c.reward, how: `Treasure chest ${i + 1} in ${w.name}` })),
    { id: w.quest.reward, how: `${w.quest.title} (${w.name})` },
    { id: w.sparkReward, how: `Find all ${w.sparks} sparks in ${w.name}` },
    { id: w.firstLantern, how: `Light your first lantern in ${w.name}` },
    { id: w.allLanterns, how: `Light every lantern in ${w.name}` },
  ];
}

/** Where each unlock comes from. */
export const UNLOCK_SOURCES: Record<string, string> = Object.fromEntries(WORLDS.flatMap((w) => worldRewards(w).map((r) => [r.id, r.how])));
