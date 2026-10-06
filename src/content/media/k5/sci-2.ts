import type { CourseMedia } from "../types";

/** Slides for sci-2, by lesson id. */
export const sci2Media: CourseMedia = {
  "sci-2.materials": {
    hook: {
      show: [
        { emoji: "📄🧥", caption: "A raincoat made of paper?" },
        { at: "What happens in the rain", emoji: "🌧️", caption: "Here comes the rain!" },
        { at: "soggy and rips", emoji: "💦📄💔", caption: "Soggy, ripped paper. Oops!" },
        { at: "just right for a job", emoji: "☔✅", caption: "Some materials are just right for a job" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Materials", caption: "Everything is made of materials" },
          { at: "Wood comes from trees", emoji: "🌳➡️🪵", caption: "Wood comes from trees" },
          { at: "Glass is made from melted sand", emoji: "🏖️🔥➡️🪟", caption: "Glass is made from melted sand" },
          { at: "Cloth is woven", emoji: "🧵➡️👕", caption: "Cloth is woven from threads" },
          { at: "A pencil has", emoji: "✏️", caption: "One pencil, many materials" },
        ],
      },
      {
        show: [
          { big: "Property", caption: "Something you can notice about a material" },
          { at: "hard or soft", emoji: "🪨🆚🧸", caption: "Hard or soft?" },
          { at: "float or sink", emoji: "🛟⬇️", caption: "Does it float or sink?" },
          { at: "Drop it in water", emoji: "💧🥣", caption: "Test it: drop it in water and watch" },
          { at: "Your hands and eyes", emoji: "✋👀", caption: "Your hands and eyes are science tools!" },
        ],
      },
      {
        show: [
          { emoji: "☔", caption: "An umbrella must keep rain out" },
          { at: "Paper would get soggy", emoji: "📄💦", caption: "Paper would get soggy" },
          { at: "A window must let light in", emoji: "🪟☀️", caption: "Glass lets the light in" },
          { at: "test two materials and compare", emoji: "🧪🆚🧪", caption: "Test two materials and compare" },
          { at: "The winner", emoji: "🏆", caption: "The winner has the right properties for the job" },
        ],
      },
    ],
  },

  "sci-2.changes": {
    hook: {
      show: [
        { emoji: "⛄", caption: "A snowman made of snow" },
        { at: "The sun comes out", emoji: "☀️⛄", caption: "The sun comes out" },
        { at: "Now it's a puddle", emoji: "💧💧", caption: "Drip, drip... now it's a puddle!" },
        { at: "Can we get our snowman back", big: "?", caption: "Can we get our snowman back?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧱🧱🧱", caption: "A tower made of many small blocks" },
          { at: "Build a boat with the same blocks", emoji: "⛵", caption: "Same blocks, new boat!" },
          { at: "Only the shape changed", emoji: "🧱➡️⛵", caption: "Only the shape changed" },
          { at: "A house is made of bricks", emoji: "🏠", caption: "A house is made of bricks and boards" },
        ],
      },
      {
        show: [
          { emoji: "🔥❄️", caption: "Heating and cooling can change things" },
          { at: "It melts into water", emoji: "🧊➡️💧", caption: "Ice melts into water" },
          { at: "It freezes into ice again", emoji: "💧➡️🧊", caption: "Water freezes into ice again" },
          { at: "Chocolate works the same way", emoji: "🍫", caption: "Chocolate melts, then gets hard again" },
          { at: "can be undone", big: "🔁", caption: "Melting and freezing can be undone" },
        ],
      },
      {
        show: [
          { emoji: "🚫🔁", caption: "Some changes stay changed forever" },
          { at: "Cook an egg", emoji: "🥚➡️🍳", caption: "A cooked egg can't become raw again" },
          { at: "Bake bread dough", emoji: "🍞", caption: "Bread can't turn back into dough" },
          { at: "Burn wood", emoji: "🔥🪵", caption: "Burned wood turns to ash and smoke" },
          { at: "That is your evidence", emoji: "🔍", caption: "Try to change it back. That's your evidence!" },
        ],
      },
    ],
  },

  "sci-2.plants": {
    hook: {
      show: [
        { emoji: "🌱", caption: "A plant can't walk to the kitchen" },
        { at: "fly to the sun", emoji: "☀️", caption: "It can't fly to the sun, either" },
        { at: "who helps it", emoji: "🐝🐿️🐦", caption: "Who helps plants?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🫘🫘", caption: "Plant beans in two cups" },
          { at: "sunny window", emoji: "☀️🪴", caption: "One cup in a sunny window" },
          { at: "dark closet", emoji: "🌑🪴", caption: "One cup in a dark closet" },
          { at: "a fair test", big: "Fair test", caption: "Change only one thing" },
          { at: "Plants need light", emoji: "🌿☀️", caption: "The sunny bean wins. Plants need light!" },
        ],
      },
      {
        show: [
          { emoji: "💧🌱", caption: "Plants need water too" },
          { at: "The dry plant droops", emoji: "🥀", caption: "No water: the plant droops and turns brown" },
          { at: "Roots drink water", emoji: "🟫💧", caption: "Roots drink water from the soil" },
          { at: "Leaves take in sunlight and air", emoji: "🍃☀️💨", caption: "Leaves use sunlight and air to make food" },
        ],
      },
      {
        show: [
          { emoji: "🌸", caption: "Plants can't walk, so animals help them" },
          { at: "A bee visits a flower", emoji: "🐝🌸", caption: "A bee visits a flower for nectar" },
          { at: "That is pollination", big: "Pollination", caption: "Moving pollen from flower to flower" },
          { at: "Squirrels bury acorns", emoji: "🐿️🌰", caption: "Squirrels bury acorns and forget some" },
          { at: "Birds eat berries", emoji: "🐦🫐", caption: "Birds drop seeds in new places" },
        ],
      },
    ],
  },

  "sci-2.habitats": {
    hook: {
      show: [
        { emoji: "🪵", caption: "Lift up an old log" },
        { at: "Bugs! Worms! Snails!", emoji: "🐛🪱🐌", caption: "Bugs, worms and snails!" },
        { at: "count the kinds of life", emoji: "🔍", caption: "Let's count the kinds of life" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Habitat", caption: "A home in nature" },
          { at: "Food. Water. Shelter.", emoji: "🍎💧🏠", caption: "Food, water and shelter" },
          { at: "A pond is a habitat", emoji: "🐸🐟", caption: "A pond: home for frogs and fish" },
          { at: "A desert is a habitat", emoji: "🦎🌵", caption: "A desert: home for lizards and cactus" },
          { at: "A fish could not live", emoji: "🐟🏜️❌", caption: "A fish could not live in the desert!" },
        ],
      },
      {
        show: [
          { emoji: "🔍", caption: "Scientists count the kinds of living things" },
          { at: "How many different kinds", emoji: "🐜🐝🐛", caption: "Ants, bees, caterpillars: three kinds" },
          { at: "bi-o-di-VER-si-ty", big: "Biodiversity", caption: "Many kinds of life in one place" },
          { at: "A bare sidewalk", emoji: "🧱", caption: "A bare sidewalk has very few kinds" },
        ],
      },
      {
        show: [
          { emoji: "🌴🆚🏜️", caption: "Let's compare two habitats" },
          { at: "It is packed with", emoji: "🐒🦜🐸", caption: "The rain forest is packed with life" },
          { at: "A desert is very dry", emoji: "🏜️🌵", caption: "The desert is very dry" },
          { at: "Water helps life grow", emoji: "💧🌱", caption: "Water helps life grow" },
        ],
      },
    ],
  },

  "sci-2.land-water": {
    hook: {
      show: [
        { emoji: "🦅", caption: "Pretend you are a bird" },
        { at: "tall bumps, flat fields", emoji: "⛰️🌾🌊", caption: "Mountains, fields and water below" },
        { at: "a map come to life", emoji: "🗺️", caption: "A map shows land from above" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⛰️", caption: "A mountain is very tall, with a pointy top" },
          { at: "A hill is lower", emoji: "🟢", caption: "A hill is lower and rounder" },
          { at: "A valley is the low land", emoji: "🏞️", caption: "A valley is low land between mountains" },
          { at: "A plain is wide and flat", emoji: "🌾", caption: "A plain is wide and flat" },
          { at: "An island is land", emoji: "🏝️", caption: "An island has water all around it" },
        ],
      },
      {
        show: [
          { emoji: "🌊", caption: "An ocean is huge and salty" },
          { at: "A lake has land all around it", emoji: "💧", caption: "A lake has land all around it" },
          { at: "A river flows", emoji: "🏞️", caption: "A river flows across the land" },
          { at: "water is usually blue", emoji: "🟦🟩", caption: "Maps: blue for water, green for land" },
          { at: "A map key", emoji: "🔑🗺️", caption: "A map key tells what colors mean" },
        ],
      },
      {
        show: [
          { emoji: "🌍", caption: "Where is Earth's water?" },
          { at: "Ocean water is salty", emoji: "🌊🧂", caption: "Most water is in the salty oceans" },
          { at: "fresh water", emoji: "🏞️💧", caption: "Rivers, lakes and ponds hold fresh water" },
          { at: "Glaciers are giant sheets of ice", emoji: "🧊🏔️", caption: "Glaciers are giant sheets of ice" },
          { at: "a liquid or a solid", emoji: "💧🧊", caption: "Water on Earth: liquid or solid" },
        ],
      },
    ],
  },

  "sci-2.earth-changes": {
    hook: {
      show: [
        { emoji: "🏰", caption: "A sand castle at the beach" },
        { at: "It washes away fast", emoji: "🌊🏰", caption: "Swoosh! Washed away" },
        { at: "millions of years", emoji: "🏞️⏳", caption: "A river at work for millions of years" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌍", caption: "Earth's land is always changing" },
          { at: "An earthquake shakes", emoji: "⚡", caption: "Fast: an earthquake shakes in seconds" },
          { at: "A volcano can erupt", emoji: "🌋", caption: "Fast: a volcano can erupt" },
          { at: "Other changes are very slow", emoji: "🐢", caption: "Some changes are very slow" },
          { at: "the Grand Canyon", big: "Grand Canyon", caption: "Carved by a river over millions of years" },
        ],
      },
      {
        show: [
          { emoji: "💨🌊🌧️", caption: "Wind and water move land, bit by bit" },
          { at: "Waves wash sand off a beach", emoji: "🌊🏖️", caption: "Waves wash sand off a beach" },
          { at: "Rain carries soil", emoji: "🌧️⛰️", caption: "Rain carries soil down a hill" },
          { at: "e-RO-sion", big: "Erosion", caption: "Wind and water moving rock and soil" },
          { at: "Engineers look for ways", emoji: "👷🛠️", caption: "Engineers find ways to slow it down" },
        ],
      },
      {
        show: [
          { emoji: "❓", caption: "Ask: what is the problem?" },
          { at: "sketch some ideas", emoji: "✏️", caption: "Sketch some ideas" },
          { at: "build a model", emoji: "🔨", caption: "Build a model" },
          { at: "Test it", emoji: "🧪⛰️💧", caption: "Test it: grassy hill vs. bare hill" },
          { at: "make it better", emoji: "⭐", caption: "Make it better!" },
        ],
      },
    ],
  },
};
