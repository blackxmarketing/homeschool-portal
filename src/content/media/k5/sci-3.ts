import type { CourseMedia } from "../types";

/** Slides for sci-3, by lesson id. */
export const sci3Media: CourseMedia = {
  "sci-3.forces": {
    hook: {
      show: [
        { emoji: "🏝️🌉🏝️", caption: "On the Sky Islands, two bridges are drifting apart" },
        { at: "Pip ties a rope", emoji: "🪢", caption: "Pip ties a rope between them and pulls" },
        { at: "still nothing moves", emoji: "🤔", caption: "Two pulls, and still nothing moves. Why?" },
        { at: "pushes and pulls work together", emoji: "👉👈", caption: "Today: how pushes and pulls work together" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Force", caption: "A force is a push or a pull" },
          { at: "You push a door", emoji: "🚪👋", caption: "Push a door to close it, pull a wagon along" },
          { at: "The first is its size", emoji: "⚽💥", caption: "Size: a gentle tap or a hard kick" },
          { at: "The second is its direction", emoji: "⬅️⬆️➡️", caption: "Direction: which way the force goes" },
          { at: "Gravity is a force too", emoji: "🍎⬇️", caption: "Gravity pulls everything down toward the ground" },
        ],
      },
      {
        show: [
          { emoji: "📕", caption: "A book on a table has two forces on it" },
          { at: "The table pushes up", emoji: "⬇️📕⬆️", caption: "Gravity pulls down, the table pushes up: balanced!" },
          { at: "think about a tug-of-war", emoji: "🧑‍🤝‍🧑🪢🧑‍🤝‍🧑", caption: "A tug-of-war with equal pulls stays still" },
          { at: "If one team pulls harder", emoji: "💪➡️", caption: "One side pulls harder: unbalanced, and the rope moves" },
          { at: "Unbalanced forces change motion", big: "Start · Stop · Speed up · Slow down · Turn", caption: "What unbalanced forces can do" },
        ],
      },
      {
        show: [
          { emoji: "🔁", caption: "A pattern happens again and again the same way" },
          { at: "A swing goes back and forth", emoji: "🛝", caption: "Each full trip of a swing takes about the same time" },
          { at: "A ball rolled down a ramp", emoji: "⚽📐", caption: "A higher ramp makes a faster ball at the bottom" },
          { at: "you can predict what comes next", emoji: "🔮", caption: "A pattern lets you predict what comes next" },
          { at: "2 seconds for each trip", big: "10 ÷ 2 = 5", caption: "2 seconds a trip means 5 trips in 10 seconds" },
        ],
      },
    ],
  },

  "sci-3.magnets": {
    hook: {
      show: [
        { emoji: "🎈💇", caption: "A balloon makes Dr. Carver's hair rise without touching it" },
        { at: "Pip slides a magnet", emoji: "🧲📎", caption: "A magnet under a plate makes a paper clip dance" },
        { at: "push or pull without touching", emoji: "❓", caption: "How can a force work without touching?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧲", caption: "A magnet pulls on certain metals" },
          { at: "Paper clips are made of steel", emoji: "📎", caption: "Paper clips are steel, and steel contains iron" },
          { at: "They do not attract wood", emoji: "🪵🥤🧻", caption: "Magnets don't pull wood, plastic, glass or paper" },
          { at: "not every metal is magnetic", emoji: "🥫❌", caption: "Surprise: aluminum and copper are not magnetic" },
          { at: "the only way to know for sure is to test", emoji: "🔬", caption: "Test it to know for sure!" },
        ],
      },
      {
        show: [
          { big: "N  S", caption: "Every magnet has a north pole and a south pole" },
          { at: "Opposite poles attract", emoji: "🧲➡️⬅️🧲", caption: "Opposite poles attract: north and south snap together" },
          { at: "Like poles repel", emoji: "⬅️🧲🧲➡️", caption: "Like poles repel: they push apart" },
          { at: "works through paper", emoji: "📄🧲", caption: "Magnetic force works through paper, cloth and water" },
          { at: "it gets weaker with distance", emoji: "📏", caption: "The farther away, the weaker the pull" },
        ],
      },
      {
        show: [
          { emoji: "🎈", caption: "Another force that works without touching" },
          { at: "Your hair rises toward it", emoji: "💇⬆️🎈", caption: "Your hair rises toward the rubbed balloon!" },
          { at: "Rubbing moves tiny bits", emoji: "⚡", caption: "Rubbing moves tiny bits of electric charge" },
          { at: "pick up bits of paper", emoji: "🎈📄🚿", caption: "A charged balloon picks up paper and bends water" },
          { at: "This is called static electricity", big: "Static electricity", caption: "That small doorknob zap is static electricity too" },
        ],
      },
      {
        show: [
          { emoji: "🧲💡", caption: "People use magnets to solve problems" },
          { at: "A cabinet door", emoji: "🚪", caption: "A small magnet keeps a cabinet door shut" },
          { at: "A compass needle is a magnet", emoji: "🧭", caption: "A compass needle is a magnet that points north" },
          { at: "At recycling centers", emoji: "♻️🥫", caption: "Big magnets pull steel cans out of the pile" },
          { at: "Engineers start by defining the problem", emoji: "📝", caption: "First: what must it do, and what are the limits?" },
        ],
      },
    ],
  },

  "sci-3.lifecycles": {
    hook: {
      show: [
        { emoji: "🐛🍃", caption: "A green caterpillar munching a leaf" },
        { at: "A few weeks later it was gone", emoji: "💚", caption: "Weeks later: a little green case, like a jewel" },
        { at: "What is inside?", big: "?", caption: "What is inside? Where did the caterpillar go?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔄", caption: "A life cycle: the stages of a living thing's life" },
          { at: "Birth is how life starts", emoji: "🐣", caption: "Birth: hatching, sprouting or being born" },
          { at: "Growth is getting bigger", emoji: "🌱➡️🌳", caption: "Growth: getting bigger and changing" },
          { at: "Reproduction means", emoji: "🥚🌰", caption: "Reproduction: making new living things of the same kind" },
          { at: "around and around like a circle", emoji: "⭕", caption: "Young keep the cycle going around and around" },
        ],
      },
      {
        show: [
          { emoji: "🫘", caption: "A bean plant starts as a seed" },
          { at: "it sprouts", emoji: "🌱", caption: "With water and warmth, it sprouts a root and a shoot" },
          { at: "called a seedling", emoji: "🌿", caption: "The seedling grows leaves and gets bigger" },
          { at: "The adult plant grows flowers", emoji: "🌸🐝", caption: "Bees carry pollen from flower to flower" },
          { at: "pods with new seeds inside", emoji: "🫛", caption: "Flowers turn into pods with new seeds" },
        ],
      },
      {
        show: [
          { emoji: "🐶", caption: "A puppy looks like a little dog" },
          { at: "This is called metamorphosis", big: "Metamorphosis", caption: "A complete change in body shape" },
          { at: "A frog starts as an egg", emoji: "🥚➡️🐸", caption: "Frog: egg, tadpole, froglet, frog" },
          { at: "A monarch butterfly changes even more", emoji: "🥚🐛🫙🦋", caption: "Butterfly: egg, caterpillar, chrysalis, adult" },
          { at: "A chrysalis!", emoji: "💚", caption: "Pip's jewel was a chrysalis!" },
        ],
      },
    ],
  },

  "sci-3.traits": {
    hook: {
      show: [
        { emoji: "🐕🐶🐶", caption: "A brown mother dog and her puppies" },
        { at: "Two puppies are brown", emoji: "🟤🟤⚫⚪", caption: "Two brown, one black, one with white spots" },
        { at: "why don't they all look the same", big: "?", caption: "Same family. Why don't they look the same?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Trait", caption: "A trait is a feature of a living thing" },
          { at: "Many traits are inherited", emoji: "👪", caption: "Inherited traits pass from parents to young" },
          { at: "Ducks have duck parents", emoji: "🦆🐥", caption: "Ducklings inherit webbed feet and bills" },
          { at: "An oak tree's acorn", emoji: "🌰➡️🌳", caption: "An acorn grows an oak, never a maple" },
        ],
      },
      {
        show: [
          { emoji: "🐶🐶🐶", caption: "Young look like their parents, but not exactly" },
          { at: "called variation", big: "Variation", caption: "Differences among the same kind of living thing" },
          { at: "Pea pods from the same plant", emoji: "🫛", caption: "Pods on one plant may hold 4, 5 or 6 peas" },
          { at: "Scientists measure variation with data", emoji: "📏📊", caption: "Scientists count and measure, then make tables and graphs" },
          { at: "Are any two exactly the same?", emoji: "🍁🍂", caption: "Look closely: are any two leaves exactly alike?" },
        ],
      },
      {
        show: [
          { emoji: "☀️💧🌍", caption: "The environment: food, water, sunlight, soil and weather" },
          { at: "Put one in a sunny window", emoji: "🌱☀️ 🌾🌑", caption: "Sun: green and strong. Dark closet: tall, thin and pale" },
          { at: "Flamingos are pink", emoji: "🦩🦐", caption: "Flamingos get their pink from the food they eat" },
          { at: "Some hydrangea bushes", emoji: "💙🌸💗", caption: "Some hydrangeas bloom blue or pink, depending on the soil" },
          { at: "some things are learned", emoji: "📖🚲", caption: "Reading and riding a bike are learned" },
        ],
      },
    ],
  },

  "sci-3.survival": {
    hook: {
      show: [
        { emoji: "🐟🐟🐟🐟🐟", caption: "A shimmering cloud of tiny fish in the lake" },
        { at: "A big fish swims in", emoji: "🦈", caption: "A big fish swims in, hungry" },
        { at: "the cloud swirls and splits", emoji: "🌀", caption: "The cloud swirls and splits, and the big fish gets nothing" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐻", caption: "Some animals, like most bears, live alone" },
          { at: "Wolves live in packs", emoji: "🐺🐺🐺", caption: "Wolf packs hunt together to catch big animals" },
          { at: "Small fish swim in schools", emoji: "🐟🐟🐟", caption: "A swirling school is hard for a predator" },
          { at: "Honeybees live in a hive", emoji: "🐝🍯", caption: "In a hive, each bee has a job" },
        ],
      },
      {
        show: [
          { emoji: "🐧🐧🐧", caption: "Emperor penguins huddle through the Antarctic winter" },
          { at: "Meerkats take turns", emoji: "👀", caption: "A meerkat lookout watches the sky" },
          { at: "Musk oxen form a circle", emoji: "🐂⭕", caption: "Musk oxen circle their calves, horns facing out" },
          { at: "Each group solves a problem", emoji: "❄️🦅🐺", caption: "Cold, hawks, wolves: each group solves a problem" },
        ],
      },
      {
        show: [
          { emoji: "🐭🐭", caption: "Small differences between animals of the same kind" },
          { at: "rock pocket mice", emoji: "🏜️🐭", caption: "Most rock pocket mice are sandy colored" },
          { at: "dark lava rock", emoji: "🪨🐭", caption: "On dark lava rock, most mice are dark" },
          { at: "owls spot light mice easily", emoji: "🦉", caption: "Owls spot light mice on dark rock" },
          { at: "A cactus with longer roots", emoji: "🌵", caption: "Longer roots reach more water: an advantage" },
        ],
      },
    ],
  },

  "sci-3.fossils": {
    hook: {
      show: [
        { emoji: "🪨🐚", caption: "A rock with a spiral shell pressed into it" },
        { at: "high on a mountain", emoji: "⛰️", caption: "Found high on a mountain" },
        { at: "how did a sea shell end up", big: "?", caption: "How did a sea shell get to a mountaintop?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Fossil", caption: "What is left of a living thing from long ago, kept in rock" },
          { at: "Others are imprints", emoji: "🍃🦶", caption: "Imprints: a leaf or a footprint pressed into mud" },
          { at: "buried quickly in mud or sand", emoji: "🟫🟫🟫", caption: "Buried fast, then layer after layer piles on top" },
          { at: "which means they have died out completely", emoji: "🦕", caption: "Extinct: died out completely, like dinosaurs" },
        ],
      },
      {
        show: [
          { emoji: "🔍", caption: "Scientists read fossils like detectives" },
          { at: "Fossils of sea shells", emoji: "🐚⛰️", caption: "Sea shells on mountains: once under the sea" },
          { at: "Fossils of ferns", emoji: "🌿🧊", caption: "Ferns in Antarctica: it was once much warmer" },
          { at: "Fish fossils in a desert", emoji: "🐟🏜️", caption: "Fish in a desert: there was once water there" },
          { at: "That explains Pip's shell", emoji: "🌊➡️⛰️", caption: "Pip's mountain was once the sea floor!" },
        ],
      },
      {
        show: [
          { emoji: "🏡", caption: "A habitat gives food, water, shelter and space" },
          { at: "A cactus survives well", emoji: "🌵☀️", caption: "A cactus stores water and thrives in the desert" },
          { at: "A polar bear", emoji: "🐻‍❄️🧊", caption: "A polar bear thrives on ice but would overheat in a rainforest" },
          { at: "A frog does well by a pond", emoji: "🐸", caption: "Well, less well, or not at all" },
        ],
      },
      {
        show: [
          { emoji: "🏜️🌊🔥", caption: "Droughts, floods and fires change habitats" },
          { at: "some move away, and some die", emoji: "🦌➡️", caption: "Some stay, some move away, some die" },
          { at: "fish ladders", emoji: "🐟🪜", caption: "Fish ladders help salmon leap past a dam" },
          { at: "In Banff National Park", emoji: "🌉🐻🦌", caption: "Plant-covered bridges let animals cross a highway" },
          { at: "use evidence to judge", emoji: "📊", caption: "Engineers use evidence to judge which solution works best" },
        ],
      },
    ],
  },

  "sci-3.weather": {
    hook: {
      show: [
        { emoji: "⛈️🏝️", caption: "A storm rolls toward the Sky Islands" },
        { at: "the wind howls", emoji: "🌬️", caption: "Dark clouds pile up and the wind howls" },
        { at: "Will the bridges hold?", emoji: "🌉❓", caption: "How strong will it be? Will the bridges hold?" },
        { at: "Scientists and engineers", emoji: "🔬🛠️", caption: "Scientists and engineers have tools and designs for this" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "☀️🌧️🌬️", caption: "Weather: hot or cold, wet or dry, windy or calm" },
          { at: "A thermometer measures temperature", emoji: "🌡️", caption: "A thermometer measures temperature" },
          { at: "A rain gauge collects rain", emoji: "🌧️🧪", caption: "A rain gauge measures how much rain fell" },
          { at: "A wind vane points", emoji: "🧭💨", caption: "A wind vane shows which way the wind blows" },
          { at: "they can make a bar graph", emoji: "📊", caption: "Tables and bar graphs make patterns easy to spot" },
        ],
      },
      {
        show: [
          { emoji: "📓", caption: "Pip kept a weather log for a whole year" },
          { at: "Winter: 2 degrees Celsius", big: "2° · 12° · 24° · 13°", caption: "Winter, spring, summer and fall averages in °C" },
          { at: "the summer bar was tallest", emoji: "📊☀️", caption: "Tallest bar: summer. Shortest bar: winter" },
          { at: "Rain and snow follow patterns too", emoji: "🌧️❄️", caption: "Rain and snow follow seasonal patterns too" },
          { at: "what to expect in each season", emoji: "🗓️", caption: "Data tells us what to expect each season" },
        ],
      },
      {
        show: [
          { big: "Climate", caption: "The usual weather of a place over many years" },
          { at: "A tropical rainforest", emoji: "🌴🌧️", caption: "The Amazon rainforest: hot and rainy all year" },
          { at: "A desert, like the Sahara", emoji: "🏜️☀️", caption: "The Sahara desert: very little rain" },
          { at: "The polar regions are cold all year", emoji: "🧊🐧", caption: "Antarctica: the coldest place on Earth" },
          { at: "a temperate climate", emoji: "🌷☀️🍂❄️", caption: "Temperate climates have four seasons" },
        ],
      },
      {
        show: [
          { emoji: "🌊⚡🌀🌪️", caption: "Weather hazards: floods, lightning, hurricanes, tornadoes" },
          { at: "built on stilts", emoji: "🏠🌊", caption: "Stilts and levees reduce flood harm" },
          { at: "Benjamin Franklin invented the lightning rod", emoji: "⚡⬇️", caption: "A lightning rod carries lightning safely to the ground" },
          { at: "Storm shutters", emoji: "🪟🛡️", caption: "Storm shutters protect windows from hurricane winds" },
          { at: "Engineers make a claim", emoji: "📋✅", caption: "A claim about a design, backed by evidence from tests" },
        ],
      },
    ],
  },
};
