import type { MiniGame, MiniLevel } from "./index";
import { Grid, rng } from "../pixel/grid";

/**
 * Habitat Rescue (K-5 science, grades K, 1, 2). Animals and plants need help.
 * Three kinds of rounds, all hands-on:
 *   - "needs": a creature waits in the middle; the kid taps things from a
 *     tray to give it what it needs (food, water, air, shelter, light, or the
 *     body parts / helpers it needs). Things it doesn't need say why and grey out.
 *   - "sort": the kid picks up each animal, plant, body part or seed and drops
 *     it in the right home or group. A wrong drop explains why and bounces back.
 *   - "count": two habitats; the kid counts the KINDS of living things in each
 *     and taps the one with more kinds (biodiversity).
 * Each round is worth 2 points: 2 with no mistakes, 1 with one mistake.
 *
 * Pure and seeded (the tray order comes from the level id), so the server can
 * replay the kid's moves.
 */

export const habitatRescueInfo = {
  id: "habitat",
  title: "Habitat Rescue",
  icon: "🦔",
  land: "science" as const,
  subject: "sci" as const,
  grades: [0,1,2],
  blurb: "Give each animal and plant what it needs: food, water, shelter and light.",
};

// ---------------- Content types ----------------

/** A picture: a sprite id from SPRITES, or an emoji. */
export type Pic = string;

export interface Thing {
  id: string;
  pic: Pic;
  label: string;
  /** Why it's right (needs, sort) or why it isn't needed (extras). */
  why: string;
}

export interface NeedsRound {
  kind: "needs";
  /** The creature being helped (a sprite id). */
  who: Pic;
  name: string;
  prompt: string;
  needs: Thing[];
  extras: Thing[];
  done: string;
}

export interface Bin {
  id: string;
  pic: Pic;
  label: string;
}

export interface Piece extends Thing {
  bin: string;
}

export interface SortRound {
  kind: "sort";
  prompt: string;
  bins: Bin[];
  pieces: Piece[];
  done: string;
}

export interface Place {
  label: string;
  pic: Pic;
  /** Living things in this habitat (sprite ids, repeats allowed). */
  things: string[];
}

export interface CountRound {
  kind: "count";
  prompt: string;
  places: [Place, Place];
  done: string;
}

export type HabitatRound = NeedsRound | SortRound | CountRound;

export interface HabitatLevel extends MiniLevel {
  grade: number;
  rounds: HabitatRound[];
}

export const COUNT_TRIES = 3;
export const MAX_KINDS = 9;

// ---------------- Shared things ----------------

const t = (id: string, pic: Pic, label: string, why: string): Thing => ({ id, pic, label, why });
const p = (id: string, pic: Pic, label: string, bin: string, why: string): Piece => ({ id, pic, label, bin, why });

const WATER = (why = "All living things need water.") => t("water", "💧", "Water", why);
const SUN = (why = "Plants use sunlight to make their own food.") => t("sun", "☀️", "Sunlight", why);
const AIR = (why = "Animals need air to breathe.") => t("air", "💨", "Air", why);
const toy = (id: string, pic: Pic, label: string, who: string) => t(id, pic, label, `A ${label.toLowerCase()} is fun, but ${who} doesn't need it to live.`);

const BINS = {
  pond: { id: "pond", pic: "🪷", label: "Pond" },
  forest: { id: "forest", pic: "🌲", label: "Forest" },
  desert: { id: "desert", pic: "🏜️", label: "Desert" },
  ocean: { id: "ocean", pic: "🌊", label: "Ocean" },
  arctic: { id: "arctic", pic: "🧊", label: "Arctic" },
  safe: { id: "safe", pic: "🛡️", label: "Stay safe" },
  food: { id: "food", pic: "🍽️", label: "Get food" },
  move: { id: "move", pic: "🏃", label: "Move" },
  getwater: { id: "getwater", pic: "💧", label: "Get water" },
  getsun: { id: "getsun", pic: "☀️", label: "Catch sunlight" },
  seeds: { id: "seeds", pic: "🌰", label: "Make seeds" },
  wind: { id: "wind", pic: "💨", label: "Wind" },
  animals: { id: "animals", pic: "🐾", label: "Animals" },
  waves: { id: "waves", pic: "🌊", label: "Water" },
} satisfies Record<string, Bin>;

// ---------------- Levels ----------------

export const HABITAT_LEVELS: HabitatLevel[] = [
  // ---------- Kindergarten: what plants and animals need (K-LS1-1, K-ESS3-1) ----------
  {
    grade: 0,
    id: "k-1",
    title: "Food and Water",
    intro: "Skill: what animals need to live (K-LS1-1). Animals need food and water. Tap what each animal needs!",
    rounds: [
      {
        kind: "needs", who: "bunny", name: "Bunny",
        prompt: "This bunny is hungry and thirsty. Give it what it needs!",
        needs: [t("carrot", "🥕", "Carrot", "Bunnies eat plants, like carrots and grass."), WATER("Bunnies drink water, just like you.")],
        extras: [toy("ball", "⚽", "Ball", "a bunny"), t("shoe", "👟", "Shoe", "Bunnies don't wear shoes! They need food and water.")],
        done: "Animals need food and water to live.",
      },
      {
        kind: "needs", who: "bird", name: "Robin",
        prompt: "This bird needs food and water. Tap what it needs!",
        needs: [t("seeds", "🌾", "Seeds", "Many birds eat seeds and bugs."), WATER("Birds drink water too.")],
        extras: [toy("teddy", "🧸", "Teddy bear", "a bird"), t("book", "📚", "Book", "A bird can't read! It needs food and water.")],
        done: "Birds need food and water, like all animals.",
      },
      {
        kind: "needs", who: "bear", name: "Bear",
        prompt: "The bear just woke up. Give it what it needs!",
        needs: [t("berries", "🫐", "Berries", "Bears eat berries, nuts and fish."), WATER("Bears drink from rivers and lakes.")],
        extras: [toy("kite", "🪁", "Kite", "a bear"), t("hat", "🎩", "Hat", "A bear has fur. It doesn't need a hat to live.")],
        done: "Big or small, animals need food and water.",
      },
      {
        kind: "needs", who: "cow", name: "Cow",
        prompt: "Help the cow! Tap what it needs.",
        needs: [t("grass", "🌿", "Grass", "Cows eat grass and hay."), WATER("Cows drink lots of water every day.")],
        extras: [t("candy", "🍭", "Candy", "Candy isn't food for a cow. Cows eat grass."), t("sock", "🧦", "Sock", "A cow doesn't need socks!")],
        done: "Cows eat plants and drink water.",
      },
      {
        kind: "needs", who: "squirrel", name: "Squirrel",
        prompt: "The squirrel is hungry and thirsty. What does it need?",
        needs: [t("nuts", "🌰", "Nuts", "Squirrels eat nuts and seeds."), WATER("Squirrels need water to drink.")],
        extras: [toy("car", "🚗", "Toy car", "a squirrel"), t("crayon", "🖍️", "Crayon", "A crayon isn't food. Squirrels eat nuts.")],
        done: "Every animal needs food and water.",
      },
      {
        kind: "needs", who: "fish", name: "Fish",
        prompt: "This fish needs help! What does it need?",
        needs: [t("shrimp", "🦐", "Tiny shrimp", "Fish eat tiny water animals, like shrimp."), WATER("A fish needs water to live in. It breathes with gills!")],
        extras: [t("burger", "🍔", "Burger", "Fish don't eat burgers. They eat tiny water animals."), t("blanket", "🛏️", "Blanket", "A fish lives in water. A blanket would get soggy!")],
        done: "Fish need food, and water to live in.",
      },
    ],
  },
  {
    grade: 0,
    id: "k-2",
    title: "Plants Need Light",
    intro: "Skill: what plants need (K-LS1-1). Plants need water and sunlight. They make their own food! Animals need air too.",
    rounds: [
      {
        kind: "needs", who: "sunflower", name: "Sunflower",
        prompt: "This sunflower is drooping. Give it what it needs to grow!",
        needs: [WATER("Plants drink water with their roots."), SUN()],
        extras: [t("burger", "🍔", "Burger", "Plants don't eat burgers! They make their own food with sunlight."), toy("teddy", "🧸", "Teddy bear", "a plant")],
        done: "Plants need water and sunlight to grow.",
      },
      {
        kind: "needs", who: "bean", name: "Bean plant",
        prompt: "This little bean plant is stuck in a dark box. Help it grow!",
        needs: [SUN("It's dark in the box! Plants need light to make food."), WATER("Plants need water every day.")],
        extras: [t("candy", "🍭", "Candy", "Plants don't eat candy. They make their own food."), t("sock", "🧦", "Sock", "A plant doesn't need a sock!")],
        done: "Without light, a plant can't make its food.",
      },
      {
        kind: "needs", who: "tree", name: "Oak tree",
        prompt: "This young oak tree is thirsty. What does it need?",
        needs: [WATER("Tree roots soak up water from the ground."), SUN("Leaves catch sunlight to make food.")],
        extras: [t("milk", "🥛", "Milk", "Plants drink plain water, not milk."), t("hat", "🎩", "Hat", "A hat would block the sunlight!")],
        done: "Big trees need water and light, just like tiny plants.",
      },
      {
        kind: "needs", who: "frog", name: "Frog",
        prompt: "Now an animal! What does this frog need?",
        needs: [t("flies", "🪰", "Flies", "Frogs catch and eat bugs, like flies."), WATER("Frogs need water to keep their skin wet."), AIR("Frogs breathe air, like you.")],
        extras: [toy("ball", "⚽", "Ball", "a frog"), t("icecream", "🍦", "Ice cream", "Ice cream isn't frog food. Frogs eat bugs.")],
        done: "Animals need food, water and air.",
      },
      {
        kind: "needs", who: "cactus", name: "Cactus",
        prompt: "This cactus lives in the hot desert. What does it need?",
        needs: [WATER("Even a cactus needs water. It stores water inside!"), SUN("A cactus loves lots of sunlight.")],
        extras: [t("umbrella", "☂️", "Umbrella", "An umbrella would block the sunlight a plant needs."), t("cookie", "🍪", "Cookie", "Plants don't eat cookies. They make their own food.")],
        done: "Every plant needs water and light, even a cactus.",
      },
      {
        kind: "needs", who: "duck", name: "Duck",
        prompt: "The duck needs help. Tap everything it needs!",
        needs: [t("plants", "🌾", "Seeds and plants", "Ducks eat plants, seeds and bugs."), WATER("Ducks drink water and swim in it."), AIR("Ducks breathe air, even when they swim.")],
        extras: [t("bread", "🍞", "Bread", "Bread isn't healthy for ducks. They eat plants, seeds and bugs."), toy("car", "🚗", "Toy car", "a duck")],
        done: "Plants make their own food. Animals have to eat.",
      },
    ],
  },
  {
    grade: 0,
    id: "k-3",
    title: "Homes Sweet Homes",
    intro: "Skill: animals and plants live where they can get what they need (K-ESS3-1). Move each one to its home!",
    rounds: [
      {
        kind: "sort",
        prompt: "Tap an animal, then tap its home. Pond or forest?",
        bins: [BINS.pond, BINS.forest],
        pieces: [
          p("frog", "frog", "Frog", "pond", "Frogs need water to keep their skin wet and lay eggs."),
          p("squirrel", "squirrel", "Squirrel", "forest", "Squirrels need trees for nuts and nests."),
          p("duck", "duck", "Duck", "pond", "Ducks swim and find food in the water."),
          p("deer", "deer", "Deer", "forest", "Deer eat leaves and hide among the trees."),
        ],
        done: "Animals live where they can find food, water and shelter.",
      },
      {
        kind: "needs", who: "bird", name: "Robin",
        prompt: "This robin needs a safe home, food and water. Help it!",
        needs: [t("nest", "🪺", "Nest", "A nest is a safe home for eggs and chicks."), t("worm", "🪱", "Worm", "Robins eat worms."), WATER("Birds need water to drink.")],
        extras: [t("tv", "📺", "TV", "A bird doesn't need a TV!"), t("shoe", "👟", "Shoe", "Birds don't wear shoes! They need a nest, food and water.")],
        done: "Animals need shelter, a safe place to live.",
      },
      {
        kind: "sort",
        prompt: "Ocean or desert? Move each animal home.",
        bins: [BINS.ocean, BINS.desert],
        pieces: [
          p("fish", "fish", "Fish", "ocean", "Ocean fish need salty sea water to live in."),
          p("camel", "camel", "Camel", "desert", "Camels can go many days without water in the hot desert."),
          p("crab", "crab", "Crab", "ocean", "Crabs live in the ocean and on its sandy shore."),
          p("lizard", "lizard", "Lizard", "desert", "Lizards warm up in the hot desert sun."),
        ],
        done: "Each animal's home gives it what it needs.",
      },
      {
        kind: "needs", who: "bear", name: "Bear",
        prompt: "Winter is coming! Give the bear food, water and a shelter.",
        needs: [t("den", "🕳️", "Den", "A den is a cozy shelter for the winter."), t("fish", "🐟", "Fish", "Bears catch fish to eat."), WATER("Bears drink from streams.")],
        extras: [toy("kite", "🪁", "Kite", "a bear"), t("candy", "🍭", "Candy", "Candy isn't bear food. Bears eat fish, berries and nuts.")],
        done: "Shelter keeps animals safe and warm.",
      },
      {
        kind: "sort",
        prompt: "Three homes now! Pond, forest or ocean?",
        bins: [BINS.pond, BINS.forest, BINS.ocean],
        pieces: [
          p("whale", "whale", "Whale", "ocean", "Whales need big, deep ocean water."),
          p("owl", "owl", "Owl", "forest", "Owls sleep in trees and hunt at night."),
          p("turtle", "turtle", "Pond turtle", "pond", "Pond turtles swim and rest on logs in the sun."),
          p("octopus", "octopus", "Octopus", "ocean", "An octopus hides in rocks on the ocean floor."),
          p("squirrel", "squirrel", "Squirrel", "forest", "Squirrels climb trees and gather nuts."),
        ],
        done: "A pond, a forest and an ocean are all homes for living things.",
      },
      {
        kind: "sort",
        prompt: "Plants have homes too! Where does each plant grow?",
        bins: [BINS.desert, BINS.pond, BINS.forest],
        pieces: [
          p("cactus", "cactus", "Cactus", "desert", "A cactus stores water, so it can live where it's dry."),
          p("lily", "lily", "Water lily", "pond", "Water lilies grow in still pond water."),
          p("tree", "tree", "Oak tree", "forest", "Oak trees grow together in forests."),
        ],
        done: "Plants grow where they get the water and light they need.",
      },
    ],
  },

  // ---------- Grade 1: body parts, parents and young (1-LS1-1, 1-LS1-2, 1-LS3-1) ----------
  {
    grade: 1,
    id: "g1-1",
    title: "Body Part Helpers",
    intro: "Skill: body parts help animals and plants survive (1-LS1-1). Sort each body part by the job it does!",
    rounds: [
      {
        kind: "sort",
        prompt: "Does this body part help the animal stay safe, or get food?",
        bins: [BINS.safe, BINS.food],
        pieces: [
          p("shell", "turtle", "Turtle's hard shell", "safe", "A turtle pulls into its hard shell to hide."),
          p("beak", "bird", "Bird's beak", "food", "A beak picks up seeds and catches bugs."),
          p("spines", "🦔", "Hedgehog's spines", "safe", "Sharp spines keep hungry animals away."),
          p("tongue", "frog", "Frog's sticky tongue", "food", "A frog's long sticky tongue catches flies."),
        ],
        done: "Animals have body parts that help them stay safe and get food.",
      },
      {
        kind: "sort",
        prompt: "Does it help the living thing move, or stay safe?",
        bins: [BINS.move, BINS.safe],
        pieces: [
          p("fins", "fish", "Fish fins", "move", "Fins help a fish swim and steer."),
          p("webfeet", "duck", "Duck's webbed feet", "move", "Webbed feet push the water like paddles."),
          p("thorns", "🌹", "Rose thorns", "safe", "Sharp thorns stop animals from eating the rose."),
          p("spray", "🦨", "Skunk's stinky spray", "safe", "A skunk's stinky spray makes enemies run away."),
        ],
        done: "Plants have parts that protect them too, like thorns.",
      },
      {
        kind: "sort",
        prompt: "Food, moving, or staying safe? Sort each body part.",
        bins: [BINS.food, BINS.move, BINS.safe],
        pieces: [
          p("talons", "🦅", "Eagle's sharp talons", "food", "Sharp talons grab and hold food."),
          p("wings", "butterfly", "Butterfly wings", "move", "Wings let butterflies fly from flower to flower."),
          p("ink", "octopus", "Octopus ink", "safe", "An octopus squirts ink to hide and escape."),
          p("neck", "🦒", "Giraffe's long neck", "food", "A long neck reaches leaves high in the trees."),
          p("legs", "bunny", "Bunny's strong legs", "move", "Strong back legs help a bunny hop fast."),
        ],
        done: "Every body part has a job that helps the animal live.",
      },
      {
        kind: "sort",
        prompt: "Plant parts! Does it get water, catch sunlight, or keep the plant safe?",
        bins: [BINS.getwater, BINS.getsun, BINS.safe],
        pieces: [
          p("roots", "🌱", "Roots", "getwater", "Roots soak up water from the soil."),
          p("leaves", "🍃", "Leaves", "getsun", "Leaves catch sunlight to make the plant's food."),
          p("cspines", "cactus", "Cactus spines", "safe", "Spines keep thirsty animals from biting the cactus."),
        ],
        done: "Roots, leaves and spines each help a plant survive.",
      },
      {
        kind: "needs", who: "polarbear", name: "Polar bear",
        prompt: "Brr! Give the polar bear the body parts that help it live in the icy Arctic.",
        needs: [
          t("fur", "🧥", "Thick fur", "Thick fur traps warm air, like a coat."),
          t("fat", "🧈", "Layer of fat", "A thick layer of fat under the skin keeps heat in."),
          t("paws", "🐾", "Big furry paws", "Big paws spread out like snowshoes, so it doesn't sink in snow."),
        ],
        extras: [
          t("ears", "👂", "Big thin ears", "Big thin ears let heat out. That helps a desert fox stay cool, not a polar bear!"),
          t("gills", "🐟", "Gills", "Gills are for breathing underwater. A polar bear breathes air with lungs."),
        ],
        done: "A polar bear's body is made for the cold.",
      },
      {
        kind: "needs", who: "camel", name: "Camel",
        prompt: "Now help the camel live in the hot, sandy desert. Which body parts help?",
        needs: [
          t("hump", "⛰️", "Hump", "Its hump stores fat, so it can go a long time without food."),
          t("lashes", "👁️", "Long eyelashes", "Long eyelashes keep blowing sand out of its eyes."),
          t("feet", "🦶", "Wide feet", "Wide feet don't sink into soft sand."),
        ],
        extras: [
          t("blubber", "🐋", "Blubber", "Blubber keeps whales warm in icy water. The desert is hot!"),
          t("fins", "🐟", "Fins", "Fins are for swimming. There's no sea in the desert!"),
        ],
        done: "Body parts help animals live in their homes.",
      },
    ],
  },
  {
    grade: 1,
    id: "g1-2",
    title: "Babies and Parents",
    intro: "Skill: young plants and animals are like their parents, but not exactly the same (1-LS3-1). Help each baby find its parent!",
    rounds: [
      {
        kind: "sort",
        prompt: "Tap a baby, then tap its parent.",
        bins: [{ id: "cow", pic: "cow", label: "Cow" }, { id: "hen", pic: "🐔", label: "Hen" }],
        pieces: [
          p("calf", "calf", "Calf", "cow", "A calf has hooves, a tail and spots like its mom. It's just smaller."),
          p("chick", "🐤", "Chick", "hen", "A chick has a beak and feathers like a hen. Its fluffy down grows into feathers."),
        ],
        done: "Young animals look a lot like their parents.",
      },
      {
        kind: "sort",
        prompt: "These babies look different from their parents! Who is whose?",
        bins: [{ id: "frog", pic: "frog", label: "Frog" }, { id: "butterfly", pic: "butterfly", label: "Butterfly" }],
        pieces: [
          p("tadpole", "tadpole", "Tadpole", "frog", "A tadpole has a tail and lives in water. It grows legs and becomes a frog."),
          p("caterpillar", "caterpillar", "Caterpillar", "butterfly", "A caterpillar makes a chrysalis and comes out a butterfly."),
        ],
        done: "Some babies change a lot as they grow up.",
      },
      {
        kind: "sort",
        prompt: "Find each baby's parent.",
        bins: [{ id: "bear", pic: "bear", label: "Bear" }, { id: "deer", pic: "deer", label: "Deer" }, { id: "duck", pic: "duck", label: "Duck" }],
        pieces: [
          p("fawn", "fawn", "Fawn", "deer", "A fawn has white spots to hide in the forest. They fade as it grows."),
          p("duckling", "duckling", "Duckling", "duck", "A duckling has fluffy yellow down. Later it grows feathers like its parent."),
          p("cub", "cub", "Cub", "bear", "A cub looks like a small bear. It stays with its mom to learn."),
        ],
        done: "Young animals are like their parents, but smaller and a little different.",
      },
      {
        kind: "sort",
        prompt: "Plants have young too! Which plant will each one grow into?",
        bins: [{ id: "tree", pic: "tree", label: "Oak tree" }, { id: "appletree", pic: "appletree", label: "Apple tree" }, { id: "cactus", pic: "cactus", label: "Cactus" }],
        pieces: [
          p("acorn", "acorn", "Acorn", "tree", "An acorn grows into an oak tree, like its parent."),
          p("appleseed", "🍎", "Apple seeds", "appletree", "Apple seeds grow into apple trees."),
          p("babycactus", "🌱", "Tiny cactus with spines", "cactus", "A baby cactus already has spines like its parent."),
        ],
        done: "Young plants grow up to look like their parent plants.",
      },
      {
        kind: "needs", who: "puppy", name: "Puppy",
        prompt: "This puppy is like its mom and dad in some ways. Tap every way it is the SAME.",
        needs: [
          t("legs4", "🐾", "Four legs", "Puppies have four legs, like their parents."),
          t("dogfur", "🐕", "Fur", "Puppies have fur, like their parents."),
          t("tail", "〰️", "A wagging tail", "Puppies have tails, like their parents."),
        ],
        extras: [
          t("size", "📏", "Same size", "Not the same size! Young animals are smaller than their parents."),
          t("feathers", "🪶", "Feathers", "Dogs don't have feathers. Birds do!"),
        ],
        done: "A puppy is like its parents, but not exactly the same.",
      },
      {
        kind: "needs", who: "fawn", name: "Fawn",
        prompt: "Now find the DIFFERENCES. Tap the ways the fawn is different from its mom.",
        needs: [
          t("spots", "⚪", "White spots", "Fawns have white spots. Grown-up deer don't."),
          t("smaller", "🤏", "Much smaller", "A fawn is much smaller than its mom."),
        ],
        extras: [
          t("fourlegs", "🐾", "Four legs", "Both have four legs. That's the SAME, not different!"),
          t("brownfur", "🟫", "Brown fur", "Both have brown fur. That's the same!"),
        ],
        done: "Young animals are like their parents, but not exactly.",
      },
    ],
  },
  {
    grade: 1,
    id: "g1-3",
    title: "Caring Parents",
    intro: "Skill: parents help their young survive (1-LS1-2), and body parts help living things (1-LS1-1). Help the families!",
    rounds: [
      {
        kind: "needs", who: "bird", name: "Robin",
        prompt: "The robin parents have chicks. Tap what the parents give their babies.",
        needs: [
          t("nest", "🪺", "A nest", "Parents build a nest to keep the eggs and chicks safe."),
          t("worms", "🪱", "Worms", "Parents bring worms and bugs to feed the chicks."),
          t("warm", "🪽", "Warm wings", "Parents sit on the nest to keep the babies warm."),
        ],
        extras: [t("tv", "📺", "TV", "Chicks don't need a TV!"), t("candy", "🍭", "Candy", "Candy isn't bird food. Chicks eat worms and bugs.")],
        done: "Bird parents feed their babies and keep them safe and warm.",
      },
      {
        kind: "sort",
        prompt: "Is the parent keeping its baby safe, or feeding it?",
        bins: [{ id: "safe", pic: "🛡️", label: "Keep safe" }, { id: "food", pic: "🍽️", label: "Feed" }],
        pieces: [
          p("growl", "bear", "Mom bear growls at danger", "safe", "A mother bear growls to scare danger away from her cubs."),
          p("bringworm", "bird", "Bird brings a worm", "food", "Bird parents fly back and forth with food all day."),
          p("pouch", "🦘", "Joey rides in the pouch", "safe", "A kangaroo joey stays safe and warm in its mom's pouch."),
          p("milk", "cow", "Cow gives milk to her calf", "food", "A calf drinks its mom's milk to grow."),
          p("mouth", "🐊", "Alligator carries babies in her mouth", "safe", "A mother alligator gently carries her babies to the water."),
        ],
        done: "Parents keep their babies safe and fed.",
      },
      {
        kind: "sort",
        prompt: "Body part jobs! Food, moving or staying safe?",
        bins: [BINS.food, BINS.move, BINS.safe],
        pieces: [
          p("woodpecker", "🐦", "Woodpecker's strong beak", "food", "A strong beak drills into wood to find bugs."),
          p("flippers", "🐧", "Penguin's flippers", "move", "Flippers help a penguin swim fast."),
          p("blend", "lizard", "Lizard's leaf-green color", "safe", "Colors that match the leaves help a lizard hide."),
          p("froglegs", "frog", "Frog's strong back legs", "move", "Strong back legs help a frog jump far."),
          p("teeth", "🦈", "Shark's sharp teeth", "food", "Sharp teeth help a shark catch and eat fish."),
        ],
        done: "Shapes and colors of body parts help animals survive.",
      },
      {
        kind: "sort",
        prompt: "What does each plant part do? Get water, catch sunlight, or make seeds?",
        bins: [BINS.getwater, BINS.getsun, BINS.seeds],
        pieces: [
          p("roots", "🌱", "Roots", "getwater", "Roots soak up water from the soil."),
          p("stem", "🎋", "Stem", "getwater", "The stem carries water up to the leaves."),
          p("leaves", "🍃", "Leaves", "getsun", "Leaves catch sunlight to make food."),
          p("flower", "sunflower", "Flower", "seeds", "Flowers make seeds that grow into new plants."),
        ],
        done: "Each plant part has a job.",
      },
      {
        kind: "sort",
        prompt: "Who grows up to be whom? Match each young one to its parent.",
        bins: [{ id: "frog", pic: "frog", label: "Frog" }, { id: "butterfly", pic: "butterfly", label: "Butterfly" }, { id: "duck", pic: "duck", label: "Duck" }],
        pieces: [
          p("tadpole", "tadpole", "Tadpole", "frog", "A tadpole loses its tail and grows legs to become a frog."),
          p("caterpillar", "caterpillar", "Caterpillar", "butterfly", "A caterpillar turns into a butterfly."),
          p("duckling", "duckling", "Duckling", "duck", "A duckling grows feathers and looks more like its parent."),
          p("frogeggs", "🫧", "Jelly eggs in a pond", "frog", "Frogs lay jelly eggs in water. Tadpoles hatch from them."),
        ],
        done: "Babies grow and change until they look like their parents.",
      },
      {
        kind: "needs", who: "polarbear", name: "Polar bear mom",
        prompt: "Help the polar bear mom keep her cub safe and fed through the winter.",
        needs: [
          t("snowden", "🕳️", "Snow den", "A snow den keeps the cub warm and hidden."),
          t("bearmilk", "🥛", "Mom's milk", "Cubs drink their mom's rich milk to grow."),
          t("teach", "🦭", "Lessons on hunting seals", "Mom teaches her cub to hunt seals on the ice."),
        ],
        extras: [t("glasses", "🕶️", "Sunglasses", "Polar bears don't need sunglasses!"), t("icecream", "🍦", "Ice cream", "Ice cream isn't bear food. Cubs drink milk.")],
        done: "Parents protect, feed and teach their young.",
      },
    ],
  },

  // ---------- Grade 2: habitats, plant needs, seeds and pollen, biodiversity (2-LS2-1, 2-LS2-2, 2-LS4-1) ----------
  {
    grade: 2,
    id: "g2-1",
    title: "Habitat Homes",
    intro: "Skill: habitats and what plants need (2-LS4-1, 2-LS2-1). Move each living thing to its habitat, and run a plant test!",
    rounds: [
      {
        kind: "sort",
        prompt: "Pond, ocean or Arctic? Move each animal to its habitat.",
        bins: [BINS.pond, BINS.ocean, BINS.arctic],
        pieces: [
          p("frog", "frog", "Frog", "pond", "Frogs need fresh water for their eggs and tadpoles."),
          p("whale", "whale", "Whale", "ocean", "Whales need huge, deep, salty water to swim and find food."),
          p("polarbear", "polarbear", "Polar bear", "arctic", "Thick fur and fat keep polar bears warm on the sea ice."),
          p("snowyowl", "snowyowl", "Snowy owl", "arctic", "Snowy owls have thick white feathers, even on their feet, for the cold."),
        ],
        done: "A habitat is the place that gives a living thing what it needs.",
      },
      {
        kind: "sort",
        prompt: "Desert, forest or Arctic? Think about hot, cold, wet and dry.",
        bins: [BINS.desert, BINS.forest, BINS.arctic],
        pieces: [
          p("camel", "camel", "Camel", "desert", "Camels can go days without drinking in the dry desert."),
          p("squirrel", "squirrel", "Squirrel", "forest", "Squirrels need trees for nuts, seeds and nests."),
          p("fox", "fox", "Arctic fox", "arctic", "The Arctic fox's thick white winter fur hides it in the snow."),
          p("cactus", "cactus", "Cactus", "desert", "A cactus stores water in its thick stem for dry times."),
          p("owl", "owl", "Owl", "forest", "Owls nest in tree holes and hunt mice at night."),
        ],
        done: "Hot or cold, wet or dry: each habitat has its own living things.",
      },
      {
        kind: "sort",
        prompt: "All five habitats! Move each living thing home.",
        bins: [BINS.pond, BINS.forest, BINS.desert, BINS.ocean, BINS.arctic],
        pieces: [
          p("lizard", "lizard", "Lizard", "desert", "Lizards soak up heat from the desert sun."),
          p("octopus", "octopus", "Octopus", "ocean", "An octopus lives in salty ocean water among rocks."),
          p("deer", "deer", "Deer", "forest", "Deer eat leaves and twigs and hide in the trees."),
          p("hare", "hare", "Arctic hare", "arctic", "Arctic hares grow thick white fur to stay warm and hidden in the snow."),
          p("duck", "duck", "Duck", "pond", "Ducks dabble for plants and bugs in fresh pond water."),
          p("crab", "crab", "Crab", "ocean", "Crabs live in salty water and on sandy beaches."),
        ],
        done: "Different habitats are home to different kinds of living things.",
      },
      {
        kind: "needs", who: "bean", name: "Bean plant",
        prompt: "Plant test! Two bean plants got the same water. This one sat in a dark closet and turned pale and weak. Give it what it was missing.",
        needs: [SUN("That was it! The plant got water but no light. Plants need light to grow.")],
        extras: [
          t("morewater", "💧", "More water", "It already got water. Too much water can rot the roots."),
          t("sugar", "🍬", "Sugar", "Plants make their own sugar using light."),
          t("fan", "🪭", "A fan", "Wind wasn't what was missing. Compare the two plants: what was different?"),
        ],
        done: "The test shows plants need light to grow.",
      },
      {
        kind: "needs", who: "sunflower", name: "Sunflower",
        prompt: "Plant test two! This sunflower sat in a sunny window, but no one watered it. Its leaves droop. What was missing?",
        needs: [WATER("Yes! It had light but no water. Plants need water to grow.")],
        extras: [
          t("moresun", "☀️", "More sunlight", "It already had lots of sunlight. Something else was missing."),
          t("juice", "🧃", "Juice", "Plants need plain water, not juice."),
          t("blanket", "🛏️", "Blanket", "A blanket would block the light. Something else was missing."),
        ],
        done: "Change one thing at a time to find out what plants need.",
      },
    ],
  },
  {
    grade: 2,
    id: "g2-2",
    title: "Seeds and Pollinators",
    intro: "Skill: animals help plants by spreading seeds and moving pollen (2-LS2-2). Help the seeds travel and the flowers make fruit!",
    rounds: [
      {
        kind: "sort",
        prompt: "How does each seed travel? Wind, animals or water?",
        bins: [BINS.wind, BINS.animals, BINS.waves],
        pieces: [
          p("dandelion", "dandelion", "Dandelion fluff", "wind", "Fluffy parachutes float away on the wind."),
          p("coconut", "coconut", "Coconut", "waves", "Coconuts float across the sea to new beaches."),
          p("burr", "burr", "Burr", "animals", "Tiny hooks stick to animal fur and ride along."),
        ],
        done: "Seeds travel to new places so new plants have room to grow.",
      },
      {
        kind: "sort",
        prompt: "More seeds! How does each one get to a new place?",
        bins: [BINS.wind, BINS.animals],
        pieces: [
          p("maple", "maple", "Maple seed", "wind", "Maple seeds spin like helicopters on the wind."),
          p("acorn", "acorn", "Acorn", "animals", "Squirrels bury acorns and forget some, so new oaks grow."),
          p("berry", "berry", "Berries", "animals", "Birds eat berries and drop the seeds far away."),
        ],
        done: "Animals help plants by carrying their seeds.",
      },
      {
        kind: "needs", who: "appletree", name: "Apple tree",
        prompt: "This apple tree has flowers. To make apples, pollen must move from flower to flower. Who can help?",
        needs: [
          t("bee", "bee", "Bee", "Bees carry pollen on their fuzzy bodies from flower to flower."),
          t("butterfly", "butterfly", "Butterfly", "Butterflies sip nectar and carry pollen too."),
        ],
        extras: [
          t("worm", "🪱", "Worm", "Worms help the soil, but they don't visit flowers."),
          t("fish", "fish", "Fish", "A fish can't reach flowers on a tree!"),
        ],
        done: "Pollinators carry pollen so flowers can make fruit and seeds.",
      },
      {
        kind: "sort",
        prompt: "Does this animal spread seeds, or move pollen?",
        bins: [{ id: "spread", pic: "🌰", label: "Spreads seeds" }, { id: "pollen", pic: "🌸", label: "Moves pollen" }],
        pieces: [
          p("squirrel", "squirrel", "Squirrel", "spread", "Squirrels bury nuts. Forgotten ones sprout into trees."),
          p("bee", "bee", "Bee", "pollen", "Bees visit flower after flower, moving pollen."),
          p("bird", "bird", "Berry-eating bird", "spread", "Birds eat berries and drop the seeds in new places."),
          p("butterfly", "butterfly", "Butterfly", "pollen", "Butterflies carry pollen on their legs and bodies."),
        ],
        done: "Plants and animals help each other.",
      },
      {
        kind: "sort",
        prompt: "Seed mix-up! Sort all six seeds by how they travel.",
        bins: [BINS.wind, BINS.animals, BINS.waves],
        pieces: [
          p("dandelion", "dandelion", "Dandelion fluff", "wind", "Light, fluffy seeds ride the wind."),
          p("maple", "maple", "Maple seed", "wind", "Its wing makes it spin and drift on the wind."),
          p("acorn", "acorn", "Acorn", "animals", "Squirrels and jays carry acorns off and bury them."),
          p("berry", "berry", "Berries", "animals", "Animals eat the fruit and drop the seeds somewhere new."),
          p("burr", "burr", "Burr", "animals", "Hooks grab onto fur and socks."),
          p("coconut", "coconut", "Coconut", "waves", "A coconut has air inside, so it floats on the sea."),
        ],
        done: "A seed's shape is a clue to how it travels.",
      },
      {
        kind: "needs", who: "sunflower", name: "Sunflower",
        prompt: "Help this sunflower grow and make seeds for next year. Give it everything it needs.",
        needs: [WATER("Plants need water to grow."), SUN("Plants need light to grow."), t("bee", "bee", "Bee", "A bee moves pollen so the flower can make seeds.")],
        extras: [
          t("burger", "🍔", "Burger", "Plants make their own food. No burgers needed!"),
          t("rock", "🪨", "Rock", "A rock can't carry pollen. Pollinators are animals that visit flowers."),
        ],
        done: "Water, light and pollinators: now the sunflower can make seeds!",
      },
    ],
  },
  {
    grade: 2,
    id: "g2-3",
    title: "Count the Kinds",
    intro: "Skill: compare how many different kinds of living things live in each habitat (2-LS4-1). Count KINDS, not animals: 3 frogs are 1 kind!",
    rounds: [
      {
        kind: "count",
        prompt: "Count the kinds of living things in each habitat. Then tap the one with more kinds.",
        places: [
          { label: "Pond", pic: "🪷", things: ["frog", "fish", "duck", "frog", "lily", "fish"] },
          { label: "Desert", pic: "🏜️", things: ["cactus", "lizard", "cactus"] },
        ],
        done: "The pond had 4 kinds and the desert had 2. The pond has more kinds of living things.",
      },
      {
        kind: "count",
        prompt: "Careful! More animals doesn't always mean more kinds.",
        places: [
          { label: "Forest", pic: "🌲", things: ["deer", "owl", "squirrel"] },
          { label: "Arctic", pic: "🧊", things: ["fox", "fox", "polarbear", "fox", "fox"] },
        ],
        done: "The Arctic had 5 animals but only 2 kinds. The forest had 3 kinds.",
      },
      {
        kind: "count",
        prompt: "Count the kinds in the ocean and the pond.",
        places: [
          { label: "Ocean", pic: "🌊", things: ["fish", "whale", "crab", "fish", "octopus", "seal", "crab"] },
          { label: "Pond", pic: "🪷", things: ["lily", "frog", "duck", "lily", "frog", "turtle", "lily"] },
        ],
        done: "The ocean had 5 kinds and the pond had 4. Both are full of life!",
      },
      {
        kind: "sort",
        prompt: "Quick check: move each animal to its habitat.",
        bins: [BINS.pond, BINS.forest, BINS.desert, BINS.ocean, BINS.arctic],
        pieces: [
          p("snowyowl", "snowyowl", "Snowy owl", "arctic", "Snowy owls hunt on the cold, snowy Arctic tundra."),
          p("camel", "camel", "Camel", "desert", "Camels are built for heat, sand and little water."),
          p("owl", "owl", "Owl", "forest", "Owls nest in tall trees."),
          p("turtle", "turtle", "Pond turtle", "pond", "Pond turtles live in fresh water and sun on logs."),
          p("whale", "whale", "Whale", "ocean", "Whales swim in the deep, salty ocean."),
        ],
        done: "Every habitat has living things that fit it.",
      },
      {
        kind: "count",
        prompt: "Hot desert or icy Arctic: which has more kinds here?",
        places: [
          { label: "Desert", pic: "🏜️", things: ["cactus", "camel", "lizard", "cactus", "bee", "camel"] },
          { label: "Arctic", pic: "🧊", things: ["polarbear", "seal", "fox", "walrus", "polarbear", "snowyowl"] },
        ],
        done: "The desert had 4 kinds and the Arctic had 5.",
      },
      {
        kind: "count",
        prompt: "Big count! Count every kind of plant and animal.",
        places: [
          { label: "Forest", pic: "🌲", things: ["tree", "deer", "owl", "squirrel", "tree", "bee", "butterfly", "squirrel", "bird"] },
          { label: "Desert", pic: "🏜️", things: ["cactus", "lizard", "cactus", "camel", "lizard", "cactus"] },
        ],
        done: "The forest had 7 kinds! A place with many kinds of living things has lots of biodiversity.",
      },
    ],
  },
];

export const levelById = (id: string): HabitatLevel | undefined => HABITAT_LEVELS.find((l) => l.id === id);
export const levelsFor = (grade: number) => HABITAT_LEVELS.filter((l) => l.grade === grade);

// ---------------- Rules ----------------

/** The number of different kinds in a place. */
export const kindsIn = (place: Place) => new Set(place.things).size;

/** Which place has more kinds (0 or 1). Levels never tie. */
export const moreKinds = (r: CountRound) => (kindsIn(r.places[0]) > kindsIn(r.places[1]) ? 0 : 1);

function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** The tray order for a round (seeded by the level and round, so it's the same every play). */
export function trayOrder(level: HabitatLevel, ri: number): Thing[] {
  const r = level.rounds[ri];
  if (!r || r.kind === "count") return [];
  const items: Thing[] = r.kind === "needs" ? [...r.needs, ...r.extras] : [...r.pieces];
  const rand = rng(seedOf(`${level.id}:${ri}`));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// ---------------- Moves and scoring ----------------

export interface NeedsMove {
  /** Thing ids tapped, in order. */
  picks: string[];
}
export interface SortMove {
  /** [piece id, bin id] drops, in order. */
  drops: [string, string][];
}
export interface CountTry {
  a: number;
  b: number;
  /** The place picked as having more kinds (0 or 1). */
  more: number;
}
export interface CountMove {
  tries: CountTry[];
}
export type RoundMove = NeedsMove | SortMove | CountMove;

export interface RoundResult {
  complete: boolean;
  mistakes: number;
  points: number;
}

const str = (v: unknown) => (typeof v === "string" && v.length <= 40 ? v : "");
const int = (v: unknown, lo: number, hi: number) => (typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi ? v : -1);
const obj = (v: unknown) => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

/** Cleans one untrusted round move into the shape that round needs. Never throws. */
export function cleanMove(r: HabitatRound, raw: unknown): RoundMove {
  const o = obj(raw);
  if (r.kind === "needs") return { picks: Array.isArray(o.picks) ? o.picks.slice(0, 40).map(str) : [] };
  if (r.kind === "sort")
    return {
      drops: Array.isArray(o.drops)
        ? o.drops.slice(0, 60).map((d) => (Array.isArray(d) ? ([str(d[0]), str(d[1])] as [string, string]) : (["", ""] as [string, string])))
        : [],
    };
  return {
    tries: Array.isArray(o.tries)
      ? o.tries.slice(0, COUNT_TRIES).map((x) => {
          const t = obj(x);
          return { a: int(t.a, 0, MAX_KINDS), b: int(t.b, 0, MAX_KINDS), more: int(t.more, 0, 1) };
        })
      : [],
  };
}

export const pointsFor = (complete: boolean, mistakes: number) => (!complete ? 0 : mistakes === 0 ? 2 : mistakes === 1 ? 1 : 0);

/** Is a count try right? */
export const countRight = (r: CountRound, t: CountTry) => t.a === kindsIn(r.places[0]) && t.b === kindsIn(r.places[1]) && t.more === moreKinds(r);

/** Replays one round. */
export function scoreRound(r: HabitatRound, move: RoundMove | undefined): RoundResult {
  if (!move) return { complete: false, mistakes: 0, points: 0 };
  let complete = false;
  let mistakes = 0;
  if (r.kind === "needs") {
    const picks = "picks" in move ? move.picks : [];
    const given = new Set<string>();
    const wrong = new Set<string>();
    for (const id of picks) {
      if (given.size === r.needs.length) break;
      if (r.needs.some((n) => n.id === id)) given.add(id);
      else if (r.extras.some((x) => x.id === id)) wrong.add(id);
    }
    complete = given.size === r.needs.length;
    mistakes = wrong.size;
  } else if (r.kind === "sort") {
    const drops = "drops" in move ? move.drops : [];
    const placed = new Set<string>();
    const wrong = new Set<string>();
    for (const [pid, bid] of drops) {
      if (placed.size === r.pieces.length) break;
      const piece = r.pieces.find((x) => x.id === pid);
      if (!piece || placed.has(pid) || !r.bins.some((b) => b.id === bid)) continue;
      if (piece.bin === bid) placed.add(pid);
      else wrong.add(`${pid}|${bid}`);
    }
    complete = placed.size === r.pieces.length;
    mistakes = wrong.size;
  } else {
    const tries = "tries" in move ? move.tries : [];
    const right = tries.findIndex((x) => countRight(r, x));
    complete = right >= 0;
    mistakes = right >= 0 ? right : tries.length;
  }
  return { complete, mistakes, points: pointsFor(complete, mistakes) };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0 || points <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: HabitatLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = Array.isArray(raw) ? raw.slice(0, level.rounds.length) : [];
  const rounds = level.rounds.map((r, i) => scoreRound(r, i < moves.length ? cleanMove(r, moves[i]) : undefined));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export function perfectMoves(level: HabitatLevel): RoundMove[] {
  return level.rounds.map((r) => {
    if (r.kind === "needs") return { picks: r.needs.map((n) => n.id) };
    if (r.kind === "sort") return { drops: r.pieces.map((x) => [x.id, x.bin] as [string, string]) };
    return { tries: [{ a: kindsIn(r.places[0]), b: kindsIn(r.places[1]), more: moreKinds(r) }] };
  });
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";

/** Filled ellipse. */
function ell(g: Grid, cx: number, cy: number, rx: number, ry: number, c: string) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1.05) g.set(x, y, c);
}

/** Paints only pixels that are already filled (spots, stripes, bellies). */
function over(g: Grid, x: number, y: number, w: number, h: number, c: string) {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (g.get(x + i, y + j) !== null) g.set(x + i, y + j, c);
}

/** A four-legged animal facing left (bears, cows, deer, foxes...). */
function quad(c: string, o: { body?: [number, number, number, number]; head?: [number, number, number]; legTop?: number; legs?: number[]; legC?: string } = {}): Grid {
  const g = new Grid(16, 16);
  const [bx, by, rx, ry] = o.body ?? [9, 9, 5, 3.4];
  const [hx, hy, hr] = o.head ?? [4, 7, 2.6];
  const top = o.legTop ?? Math.round(by + ry - 1);
  for (const x of o.legs ?? [5, 7, 11, 13]) g.rect(x, top, 1, 15 - top, o.legC ?? c);
  ell(g, bx, by, rx, ry, c);
  g.disc(hx, hy, hr, c);
  return g;
}

function critter(id: string): Grid {
  let g = new Grid(16, 16);
  switch (id) {
    case "bunny":
    case "hare": {
      const C = id === "hare" ? "#f8f9fa" : "#b08968";
      g.rect(3, 1, 2, 5, C).rect(6, 1, 2, 5, C).rect(4, 2, 1, 3, "#f4a6b7").rect(7, 2, 1, 3, "#f4a6b7");
      ell(g, 9.5, 11, 4, 3.2, C);
      g.disc(5, 8, 3, C);
      ell(g, 9, 12.5, 2.2, 1.4, id === "hare" ? "#e9ecef" : "#f1e3d3");
      g.disc(13.5, 10, 1.4, "#ffffff").rect(5, 14, 3, 1, C).rect(10, 14, 3, 1, C);
      g.set(4, 7, OUT).set(2, 9, "#f783ac");
      break;
    }
    case "bird": {
      const C = "#8d6e63";
      ell(g, 9, 9, 4.5, 3.6, C);
      g.disc(5, 6, 2.6, C);
      ell(g, 6.5, 10, 2.6, 2.6, "#e8590c");
      ell(g, 10.5, 8.8, 2.6, 1.6, "#6d4c41");
      g.rect(13, 7, 2, 2, C).rect(14, 6, 1, 1, C);
      g.rect(1, 6, 2, 1, "#f59f00").set(2, 7, "#f59f00");
      g.set(4, 5, OUT).set(8, 13, "#e8590c").set(10, 13, "#e8590c").set(8, 14, "#e8590c").set(10, 14, "#e8590c");
      break;
    }
    case "fish": {
      const C = "#ff922b";
      ell(g, 7, 8, 5, 3.6, C);
      for (let i = 0; i < 3; i++) g.rect(12 + i, 7 - i, 1, 3 + 2 * i, C);
      over(g, 7, 3, 1, 10, "#ffffff");
      over(g, 10, 3, 1, 10, "#ffffff");
      g.set(4, 7, OUT).set(5, 12, "#e8590c").set(6, 12, "#e8590c").set(7, 4, "#e8590c").set(8, 4, "#e8590c");
      break;
    }
    case "bear":
    case "polarbear":
    case "cub": {
      const C = id === "polarbear" ? "#f1f3f5" : "#7f4f24";
      g = quad(C, { legs: [5, 6, 11, 12] });
      g.disc(3, 4.6, 1, C).disc(6, 4.6, 1, C);
      ell(g, 2, 8, 1.6, 1.1, id === "polarbear" ? "#dee2e6" : "#b07d4f");
      g.set(1, 8, OUT).set(4, 7, OUT);
      if (id === "cub") {
        // A smaller copy for the baby bear.
        const s = new Grid(12, 12);
        for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) s.set(x, y, g.get(Math.round(x * 1.33), Math.round(y * 1.33)));
        s.set(3, 5, OUT);
        return s.outline(OUT);
      }
      break;
    }
    case "cow":
    case "calf": {
      g = quad("#ffffff", { legs: [5, 6, 11, 12] });
      over(g, 8, 6, 3, 2, "#343a40");
      over(g, 12, 9, 2, 2, "#343a40");
      over(g, 6, 9, 2, 2, "#343a40");
      ell(g, 2.5, 8.5, 1.6, 1.2, "#f4a6b7");
      g.set(4, 6, OUT).set(3, 4, "#e9ecef").set(5, 4, "#e9ecef").set(14, 8, "#ffffff").set(15, 9, "#343a40");
      if (id === "calf") {
        const s = new Grid(12, 12);
        for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) s.set(x, y, g.get(Math.round(x * 1.33), Math.round(y * 1.33)));
        return s.outline(OUT);
      }
      break;
    }
    case "deer":
    case "fawn": {
      const C = "#b5651d";
      g = quad(C, { body: [9, 8, 4.5, 2.6], head: [4, 5, 2], legTop: 9, legs: [6, 7, 11, 12] });
      g.rect(5, 6, 2, 2, C);
      ell(g, 2, 6, 1.3, 1, "#8a4b14");
      g.set(4, 4, OUT).set(1, 6, OUT).set(14, 7, "#ffffff");
      if (id === "deer") g.set(4, 2, "#6b4423").set(4, 1, "#6b4423").set(3, 0, "#6b4423").set(5, 0, "#6b4423").set(6, 1, "#6b4423").set(2, 1, "#6b4423");
      else {
        g.set(8, 7, "#ffffff").set(10, 8, "#ffffff").set(12, 7, "#ffffff").set(9, 9, "#ffffff").set(11, 9, "#ffffff");
        const s = new Grid(12, 12);
        for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) s.set(x, y, g.get(Math.round(x * 1.33), Math.round(y * 1.33)));
        return s.outline(OUT);
      }
      break;
    }
    case "puppy": {
      const C = "#c49a6c";
      g = quad(C, { body: [9, 10, 4, 2.8], head: [5, 7, 2.8], legs: [6, 7, 11, 12] });
      g.rect(2, 6, 2, 4, "#8a5a2a").rect(13, 7, 1, 2, C).set(14, 6, C);
      ell(g, 2.5, 8.5, 1.3, 1, "#e6ccb2");
      g.set(4, 6, OUT).set(1, 8, OUT);
      break;
    }
    case "fox": {
      const C = "#f8f9fa";
      g = quad(C, { body: [8, 10, 4, 2.4], head: [4, 8, 2.2], legs: [5, 6, 10, 11] });
      g.set(3, 5, C).set(5, 5, C).set(3, 4, C).set(5, 4, C);
      ell(g, 13.5, 8, 2, 1.6, C);
      g.set(15, 7, "#dee2e6").set(4, 7, OUT).set(1, 9, OUT).rect(2, 9, 1, 1, C);
      break;
    }
    case "camel": {
      const C = "#d4a373";
      g = quad(C, { body: [10, 8, 4, 2.6], head: [3, 3, 1.8], legTop: 9, legs: [7, 8, 12, 13] });
      g.disc(10, 5.2, 2.4, C).rect(3, 4, 2, 5, C).rect(4, 7, 3, 2, C);
      g.set(2, 2, OUT).set(1, 3, "#b08968");
      break;
    }
    case "frog": {
      const C = "#51cf66";
      ell(g, 8, 11, 6, 3.4, C);
      g.disc(4.5, 6.5, 2, C).disc(11.5, 6.5, 2, C).disc(4.5, 6.5, 1, "#ffffff").disc(11.5, 6.5, 1, "#ffffff");
      g.set(4, 6, OUT).set(11, 6, OUT);
      ell(g, 8, 12.4, 3.5, 1.4, "#d3f9d8");
      g.rect(5, 10, 6, 1, "#2b8a3e");
      ell(g, 2, 13.5, 1.8, 1, C);
      ell(g, 14, 13.5, 1.8, 1, C);
      break;
    }
    case "tadpole": {
      const C = "#495057";
      ell(g, 5, 8, 3, 2.6, C);
      for (let x = 8; x < 15; x++) g.set(x, 8 + (x % 3 === 0 ? -1 : x % 3 === 1 ? 0 : 1), C).set(x, 8, C);
      g.set(4, 7, "#ffffff").set(3, 7, OUT);
      break;
    }
    case "duck":
    case "duckling": {
      const body = id === "duck" ? "#adb5bd" : "#ffd43b";
      const head = id === "duck" ? "#2b8a3e" : "#ffd43b";
      ell(g, 9, 10, 5, 3, body);
      g.disc(4.5, 6, 2.5, head);
      if (id === "duck") {
        ell(g, 6, 10, 2, 2, "#8d5524");
        ell(g, 10, 9.5, 3, 1.4, "#868e96");
        g.rect(4, 8, 2, 1, "#ffffff");
      } else ell(g, 10, 9.5, 3, 1.4, "#fcc419");
      g.rect(1, 6, 2, 2, "#fab005").set(14, 8, body).set(4, 5, OUT).rect(7, 13, 2, 1, "#fd7e14").rect(10, 13, 2, 1, "#fd7e14");
      break;
    }
    case "owl":
    case "snowyowl": {
      const snowy = id === "snowyowl";
      const C = snowy ? "#ffffff" : "#8d6e63";
      ell(g, 8, 9, 5, 5.4, C);
      ell(g, 8, 10.5, 3, 3.5, snowy ? "#f1f3f5" : "#d7ccc8");
      if (!snowy) g.set(4, 3, C).set(4, 4, C).set(12, 3, C).set(12, 4, C);
      else for (const [x, y] of [[5, 10], [10, 11], [7, 13], [11, 8], [4, 8]] as const) g.set(x, y, "#495057");
      g.disc(6, 6.5, 1.5, snowy ? "#ffd43b" : "#ffffff").disc(10, 6.5, 1.5, snowy ? "#ffd43b" : "#ffffff");
      g.set(6, 6, OUT).set(10, 6, OUT).set(8, 8, "#f59f00").set(8, 9, "#f59f00");
      g.set(6, 14, "#f59f00").set(7, 14, "#f59f00").set(9, 14, "#f59f00").set(10, 14, "#f59f00");
      break;
    }
    case "squirrel": {
      const C = "#d9480f";
      ell(g, 12, 7, 2.6, 5, "#e8590c");
      ell(g, 12.5, 6, 1.4, 3, "#ff8a3d");
      ell(g, 7, 10.5, 3, 3.4, C);
      g.disc(5, 6, 2.3, C).set(5, 3, C).set(5, 2, C);
      ell(g, 6, 11, 1.5, 2.2, "#ffe8cc");
      g.set(4, 5, OUT).set(2, 6, OUT).rect(5, 14, 2, 1, C).rect(8, 14, 2, 1, C);
      g.disc(3.5, 10, 1, "#8a5a2a");
      break;
    }
    case "whale": {
      const C = "#4c6ef5";
      ell(g, 7, 9, 6, 3.5, C);
      ell(g, 7, 11, 4.5, 1.4, "#bac8ff");
      g.rect(13, 8, 1, 2, C).rect(14, 6, 1, 3, C).rect(14, 9, 1, 3, C);
      g.set(3, 9, OUT).set(5, 4, "#74c0fc").set(4, 3, "#74c0fc").set(6, 3, "#74c0fc").set(5, 5, "#74c0fc");
      break;
    }
    case "crab": {
      const C = "#e03131";
      ell(g, 8, 10, 5, 2.5, C);
      g.set(6, 7, C).set(10, 7, C).set(6, 6, OUT).set(10, 6, OUT);
      g.disc(2.5, 6.5, 1.6, C).disc(13.5, 6.5, 1.6, C).set(3, 8, C).set(13, 8, C).set(2, 5, "#ffc9c9").set(14, 5, "#ffc9c9");
      for (const x of [4, 5, 11, 12]) g.set(x, 13, C);
      g.set(3, 14, C).set(13, 14, C);
      break;
    }
    case "lizard": {
      const C = "#94d82d";
      ell(g, 7, 10, 4, 1.7, C);
      ell(g, 2.6, 9.6, 1.8, 1.2, C);
      g.rect(11, 10, 3, 1, C).set(14, 9, C).set(15, 8, C);
      g.set(4, 12, C).set(3, 13, C).set(9, 12, C).set(10, 13, C);
      over(g, 6, 9, 1, 1, "#5c940d");
      over(g, 8, 10, 1, 1, "#5c940d");
      g.set(2, 9, OUT);
      break;
    }
    case "seal":
    case "walrus": {
      const walrus = id === "walrus";
      const C = walrus ? "#a47148" : "#868e96";
      ell(g, 9, 11, 5.5, 2.8, C);
      g.disc(4, 7.5, walrus ? 2.8 : 2.4, C);
      g.rect(13, 12, 2, 2, C).set(7, 14, C).set(8, 14, C);
      g.set(3, 6, OUT);
      if (walrus) g.rect(2, 9, 1, 4, "#ffffff").rect(4, 9, 1, 4, "#ffffff").rect(2, 8, 3, 1, "#c08552");
      else g.set(1, 8, OUT).set(2, 8, "#495057");
      break;
    }
    case "turtle": {
      ell(g, 8, 10, 5, 3.6, "#2f9e44");
      for (let y = 11; y <= 14; y++) for (let x = 0; x < 16; x++) g.set(x, y, null);
      g.rect(3, 10, 11, 1, "#2b8a3e");
      g.disc(2.5, 10, 1.8, "#94d82d");
      g.rect(4, 11, 2, 3, "#94d82d").rect(10, 11, 2, 3, "#94d82d").set(14, 10, "#94d82d");
      for (const [x, y] of [[6, 7], [9, 7], [8, 9], [5, 9], [11, 9]] as const) g.set(x, y, "#69db7c");
      g.set(2, 9, OUT);
      break;
    }
    case "bee": {
      ell(g, 7, 5, 2, 2, "#d0ebff");
      ell(g, 10, 5, 2, 2, "#d0ebff");
      ell(g, 8.5, 10, 4.5, 3, "#fcc419");
      over(g, 8, 6, 1, 8, OUT);
      over(g, 11, 6, 1, 8, OUT);
      g.disc(3.5, 10, 2, "#343a40").set(3, 9, "#ffffff").set(14, 10, "#343a40").set(3, 7, OUT).set(2, 6, OUT);
      break;
    }
    case "butterfly": {
      const W = "#ff922b";
      ell(g, 4.5, 6, 3, 3.5, W);
      ell(g, 11.5, 6, 3, 3.5, W);
      ell(g, 5, 11.5, 2.2, 2, "#fd7e14");
      ell(g, 11, 11.5, 2.2, 2, "#fd7e14");
      g.disc(4, 5, 1, "#ffffff").disc(12, 5, 1, "#ffffff").set(5, 12, OUT).set(11, 12, OUT);
      g.rect(8, 3, 1, 11, "#343a40").set(7, 2, OUT).set(6, 1, OUT).set(9, 2, OUT).set(10, 1, OUT);
      break;
    }
    case "caterpillar": {
      const cols = ["#51cf66", "#40c057"];
      for (let i = 0; i < 5; i++) g.disc(4 + i * 2.3, 10 - (i === 2 ? 1 : 0), 1.7, cols[i % 2]);
      g.disc(2.5, 8.5, 2, "#69db7c").set(2, 8, OUT).set(1, 6, OUT).set(3, 6, OUT);
      for (let i = 0; i < 5; i++) g.set(4 + Math.round(i * 2.3), 12, "#2b8a3e");
      break;
    }
    case "octopus": {
      const C = "#e64980";
      ell(g, 8, 6, 4.5, 4, C);
      for (const x of [4, 6, 8, 10, 12]) for (let y = 9; y < 14; y++) g.set(x + (y % 2 && x !== 8 ? (x < 8 ? -1 : 1) : 0), y, C);
      g.disc(6, 6, 1, "#ffffff").disc(10, 6, 1, "#ffffff").set(6, 6, OUT).set(10, 6, OUT).set(7, 3, "#f783ac").set(9, 4, "#f783ac");
      break;
    }
    case "sunflower": {
      g.rect(7, 9, 2, 6, "#2f9e44");
      ell(g, 5, 11.5, 2, 1, "#40c057");
      ell(g, 11, 10.5, 2, 1, "#40c057");
      g.disc(8, 5, 4.4, "#fcc419").disc(8, 5, 2.2, "#7f4f24").set(7, 4, "#5c3a1a").set(9, 6, "#5c3a1a");
      break;
    }
    case "bean": {
      g.rect(5, 11, 6, 4, "#c2410c").rect(4, 10, 8, 1, "#e8590c");
      g.rect(8, 4, 1, 6, "#40c057");
      ell(g, 5.6, 5, 2.2, 1.3, "#51cf66");
      ell(g, 10.6, 3.5, 2.2, 1.3, "#51cf66");
      g.set(7, 9, "#7a4f22").set(9, 9, "#7a4f22");
      break;
    }
    case "cactus": {
      const C = "#2f9e44";
      g.rect(7, 2, 3, 13, C).rect(3, 5, 2, 5, C).rect(3, 9, 4, 2, C).rect(12, 3, 2, 5, C).rect(10, 7, 4, 2, C);
      g.rect(8, 3, 1, 11, "#51cf66").set(8, 1, "#f783ac");
      for (const [x, y] of [[7, 5], [9, 8], [7, 11], [3, 6], [13, 4]] as const) g.set(x, y, "#d3f9d8");
      break;
    }
    case "lily": {
      ell(g, 8, 11.5, 6.5, 2.6, "#37b24d");
      g.set(8, 12, null).set(8, 13, null).set(8, 14, null);
      g.tri(8, 4, 10, 3, "#fcc2d7").tri(5, 6, 10, 1, "#f783ac").tri(11, 6, 10, 1, "#f783ac").set(8, 8, "#fcc419");
      break;
    }
    case "tree":
    case "appletree": {
      g.rect(7, 9, 2, 6, "#7a4f22").disc(8, 6, 5.5, "#2f9e44").disc(6, 4.5, 2.5, "#51cf66").set(10, 9, "#237a33");
      if (id === "appletree") for (const [x, y] of [[5, 7], [10, 5], [8, 3], [11, 8], [4, 4]] as const) g.set(x, y, "#e03131");
      else for (const [x, y] of [[5, 8], [11, 6]] as const) g.set(x, y, "#a8743a");
      break;
    }
    // Seeds (12 x 12).
    case "acorn": {
      g = new Grid(12, 12);
      ell(g, 6, 7.5, 3, 3.2, "#c08552");
      g.rect(2, 3, 8, 2, "#7a4f22").rect(3, 5, 6, 1, "#8a5a2a").set(6, 1, "#6b4423").set(6, 2, "#6b4423").set(5, 7, "#e0b07a");
      break;
    }
    case "dandelion": {
      g = new Grid(12, 12);
      g.rect(6, 5, 1, 6, "#adb5bd");
      for (let a = 0; a < 10; a++) {
        const x = 6 + Math.round(Math.cos((a / 10) * Math.PI * 2) * 3.5);
        const y = 4 + Math.round(Math.sin((a / 10) * Math.PI * 2) * 3.2);
        g.set(x, y, "#f8f9fa");
      }
      g.disc(6, 4, 1, "#e9ecef");
      break;
    }
    case "maple": {
      g = new Grid(12, 12);
      // A seed with a papery wing (a "helicopter").
      for (let i = 0; i < 8; i++) {
        const x = 3 + i;
        const y = 8 - Math.round(i * 0.75);
        g.rect(x, y - 1, 1, i < 2 ? 2 : i > 6 ? 2 : 4, "#e0b07a");
        g.set(x, y - 1, "#c08552");
      }
      g.disc(2.5, 8.5, 1.8, "#8a5a2a").set(2, 8, "#a8743a");
      break;
    }
    case "burr": {
      g = new Grid(12, 12);
      g.disc(6, 6, 3, "#8a6d3b");
      for (const [x, y] of [[6, 1], [6, 11], [1, 6], [11, 6], [2, 2], [10, 2], [2, 10], [10, 10]] as const) g.set(x, y, "#5c4a2a");
      g.set(5, 5, "#b39b6b");
      break;
    }
    case "coconut": {
      g = new Grid(12, 12);
      g.disc(6, 6, 4, "#6b4423");
      g.disc(5, 5, 1.5, "#8a5a2a").set(5, 4, OUT).set(7, 4, OUT).set(6, 6, OUT);
      break;
    }
    case "berry": {
      g = new Grid(12, 12);
      g.disc(4, 7, 2.3, "#c2255c").disc(8, 7, 2.3, "#c2255c").disc(6, 4.5, 2.3, "#e64980");
      g.set(6, 1, "#2f9e44").set(5, 1, "#2f9e44").set(3, 6, "#fcc2d7").set(7, 6, "#fcc2d7");
      break;
    }
    default:
      return g;
  }
  return g.outline(OUT);
}

/** Every sprite id this game draws. */
export const SPRITE_IDS = [
  "bunny", "hare", "bird", "fish", "bear", "polarbear", "cub", "cow", "calf", "deer", "fawn", "puppy", "fox", "camel", "frog", "tadpole",
  "duck", "duckling", "owl", "snowyowl", "squirrel", "whale", "crab", "lizard", "seal", "walrus", "turtle", "bee", "butterfly",
  "caterpillar", "octopus", "sunflower", "bean", "cactus", "lily", "tree", "appletree", "acorn", "dandelion", "maple", "burr", "coconut", "berry",
] as const;

const SPRITE_SET = new Set<string>(SPRITE_IDS);
export const isSprite = (pic: Pic) => SPRITE_SET.has(pic);

const spriteCache = new Map<string, Grid>();
/** A creature's pixel sprite (cached), or null for an emoji picture. */
export function spriteFor(pic: Pic): Grid | null {
  if (!isSprite(pic)) return null;
  let g = spriteCache.get(pic);
  if (!g) spriteCache.set(pic, (g = critter(pic)));
  return g;
}

/** A friendly name for a sprite (used for screen readers in count rounds). */
export const SPRITE_NAMES: Record<string, string> = {
  bunny: "bunny", hare: "Arctic hare", bird: "bird", fish: "fish", bear: "bear", polarbear: "polar bear", cub: "bear cub", cow: "cow", calf: "calf", deer: "deer",
  fawn: "fawn", puppy: "puppy", fox: "Arctic fox", camel: "camel", frog: "frog", tadpole: "tadpole", duck: "duck", duckling: "duckling",
  owl: "owl", snowyowl: "snowy owl", squirrel: "squirrel", whale: "whale", crab: "crab", lizard: "lizard", seal: "seal", walrus: "walrus",
  turtle: "turtle", bee: "bee", butterfly: "butterfly", caterpillar: "caterpillar", octopus: "octopus", sunflower: "sunflower",
  bean: "bean plant", cactus: "cactus", lily: "water lily", tree: "oak tree", appletree: "apple tree", acorn: "acorn",
  dandelion: "dandelion", maple: "maple seed", burr: "burr", coconut: "coconut", berry: "berries",
};

export const habitatRescue: MiniGame = {
  ...habitatRescueInfo,
  levels: () => [],
  levelsForGrade: (grade) => levelsFor(grade).map(({ id, title, intro }) => ({ id, title, intro })),
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
