import type { CourseMedia } from "../types";

/** Slides for sci-4, by lesson id. */
export const sci4Media: CourseMedia = {
  "sci-4.energy-speed": {
    hook: {
      show: [
        { emoji: "🔵➡️🧱", caption: "Same marble, same tower" },
        { at: "rolls it gently", emoji: "🐢🔵", caption: "A gentle roll..." },
        { at: "gives it a hard push", emoji: "💨🔵", caption: "...or a hard push" },
        { at: "What made the difference", big: "?", caption: "What made the difference?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Energy", caption: "The ability to make something move or change" },
          { at: "A hot stove has energy", emoji: "🍳🔥", caption: "A hot stove has energy" },
          { at: "stretched rubber band", emoji: "🏹", caption: "Stretched and ready to go" },
          { at: "motion, sound, light, heat and electricity", emoji: "🏃🔊💡🔥⚡", caption: "Many forms of energy" },
          { at: "perfectly still", emoji: "📕", caption: "Sitting still: no motion energy right now" },
        ],
      },
      {
        show: [
          { big: "Faster = more energy", caption: "The big idea" },
          { at: "Roll a marble down a ramp", emoji: "🔵📐🥤", caption: "Marble, ramp, paper cup" },
          { at: "start the marble higher", emoji: "⬆️🔵", caption: "Start it higher up" },
          { at: "the cup slides farther", emoji: "🥤➡️➡️", caption: "The cup slides farther!" },
          { at: "look for evidence", emoji: "🔍", caption: "Scientists look for evidence" },
        ],
      },
      {
        show: [
          { big: "Collision", caption: "Moving objects bump into each other" },
          { at: "bowling ball hits the pins", emoji: "🎳💥", caption: "Energy moves into the pins" },
          { at: "Some turns into sound", emoji: "🔊", caption: "Some energy becomes sound" },
          { at: "a little bit of heat", emoji: "🔥", caption: "A little becomes heat" },
          { at: "bumpers and helmets", emoji: "🚗⛑️", caption: "Bumpers and helmets soak up crash energy" },
        ],
      },
    ],
  },

  "sci-4.energy-transfer": {
    hook: {
      show: [
        { emoji: "🙈👂", caption: "Close your eyes and listen" },
        { at: "A dog barks", emoji: "🐕🔊", caption: "Woof! Sound reaches you" },
        { at: "Sunlight warms your arm", emoji: "☀️💪", caption: "Light and heat reach you" },
        { at: "How does energy travel", big: "?", caption: "How does energy travel?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Vibration", caption: "A quick back-and-forth shake" },
          { at: "Stretch a rubber band", emoji: "📦🎸", caption: "Pluck a rubber band over a box" },
          { at: "Your eardrum vibrates", emoji: "👂", caption: "Your eardrum vibrates too" },
          { at: "air, water, wood and even metal", emoji: "💨💧🪵🔩", caption: "Sound travels through matter" },
          { at: "Astronauts on a spacewalk", emoji: "🧑‍🚀📻", caption: "In space, astronauts use radios" },
        ],
      },
      {
        show: [
          { emoji: "☀️", caption: "Light carries energy" },
          { at: "150 million kilometers", big: "150,000,000 km", caption: "From the Sun to Earth" },
          { at: "from something warmer to something cooler", emoji: "🔥➡️🧊", caption: "Heat moves from warmer to cooler" },
          { at: "metal spoon in a mug", emoji: "🥄☕", caption: "Heat travels up the spoon" },
          { at: "Hold an ice cube", emoji: "✋🧊", caption: "Heat flows from your hand into the ice" },
        ],
      },
      {
        show: [
          { emoji: "🔋〰️💡", caption: "Energy moving through a wire" },
          { at: "a complete loop", emoji: "🔁", caption: "A circuit is a complete loop" },
          { at: "If there is a gap", emoji: "✂️", caption: "A gap stops the current" },
          { at: "A speaker changes it", emoji: "💡🔊🍞🌀", caption: "Light, sound, heat, motion" },
          { at: "flip a switch", emoji: "🔘", caption: "Close the loop, send the energy" },
        ],
      },
      {
        show: [
          { emoji: "🛠️📐", caption: "Engineers design devices" },
          { at: "called criteria", big: "Criteria", caption: "What the design must do" },
          { at: "called constraints", big: "Constraints", caption: "The limits: cost, time, materials" },
          { at: "A solar oven", emoji: "☀️📦", caption: "A solar oven turns sunlight into heat" },
          { at: "plastic wrap traps", emoji: "🔥📦", caption: "Warm air trapped inside" },
        ],
      },
    ],
  },

  "sci-4.waves": {
    hook: {
      show: [
        { emoji: "🏊", caption: "Floating in a pool" },
        { at: "someone jumped in", emoji: "💦", caption: "Splash!" },
        { at: "you rose and fell", emoji: "🌊", caption: "Up... and down" },
        { at: "What was it", big: "?", caption: "What lifted you?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Wave", caption: "A pattern that carries energy" },
          { at: "Toss a pebble", emoji: "🪨💧⭕", caption: "Rings ripple outward" },
          { at: "one end of a jump rope", emoji: "🪢〰️", caption: "A bump travels down the rope" },
          { at: "only bobs up and down", emoji: "🍃↕️", caption: "The leaf bobs but stays put" },
          { at: "lift a boat", emoji: "⛵🌊", caption: "Waves can make things move" },
        ],
      },
      {
        show: [
          { emoji: "📏🌊", caption: "Waves have parts we can measure" },
          { at: "the crest", emoji: "⬆️", caption: "Crest: the top" },
          { at: "The bottom is the trough", emoji: "⬇️", caption: "Trough: the bottom" },
          { at: "Amplitude is how tall", big: "Amplitude", caption: "How tall the wave is" },
          { at: "Wavelength is the distance", big: "Wavelength", caption: "From crest to crest" },
        ],
      },
      {
        show: [
          { emoji: "💡", caption: "Light lets us see" },
          { at: "do not make their own light", emoji: "📕🌳", caption: "Books and trees make no light" },
          { at: "reflects, or bounces off", emoji: "💡➡️📕↩️", caption: "Light bounces off the book" },
          { at: "through the pupil", emoji: "👁️", caption: "Light enters through the pupil" },
          { at: "no light at all", emoji: "⬛", caption: "No light, no seeing" },
        ],
      },
    ],
  },

  "sci-4.codes": {
    hook: {
      show: [
        { emoji: "⛰️🧍", caption: "You, on one hill" },
        { at: "another hill, far away", emoji: "⛰️⛰️", caption: "Your friend, far away" },
        { at: "you do have a flashlight", emoji: "🔦", caption: "But you have a flashlight!" },
        { at: "How could you send a message", big: "?", caption: "How could you send a message?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Information", caption: "Anything you want someone to know" },
          { at: "turn it into a pattern", emoji: "🔁", caption: "Turn it into a pattern" },
          { at: "colored flags", emoji: "🚢🚩", caption: "Ships talked with flags" },
          { at: "Lighthouses flash", emoji: "🗼✨", caption: "Each lighthouse has its own flash pattern" },
          { at: "know the code", emoji: "🔑", caption: "Both people must know the code" },
        ],
      },
      {
        show: [
          { emoji: "⚡〰️", caption: "The electric telegraph" },
          { at: "A short tap was a dot", big: "•  –", caption: "Dot and dash" },
          { at: "In 1844", big: "1844", caption: "Washington, D.C., to Baltimore by wire" },
          { at: "hours on horseback", emoji: "🐎⏳", caption: "Before: hours on horseback" },
          { at: "is SOS", big: "• • •  – – –  • • •", caption: "SOS means help!" },
        ],
      },
      {
        show: [
          { big: "1 0", caption: "Just two signals" },
          { at: "It is called binary", big: "01001", caption: "Binary code" },
          { at: "tiny colored dots", emoji: "🟥🟩🟦", caption: "A photo is made of tiny colored dots" },
          { at: "as radio waves", emoji: "📱📶", caption: "Phones send radio waves" },
          { at: "Fiber-optic cables", emoji: "✨🧵", caption: "Flashes of light through glass threads" },
        ],
      },
      {
        show: [
          { emoji: "💡💡💡", caption: "Several ideas, not just one" },
          { at: "easy to see at night", emoji: "🔦🌙", caption: "A flashlight shines at night" },
          { at: "A whistle works", emoji: "🎶🌳", caption: "A whistle works behind trees" },
          { at: "Flags work in daylight", emoji: "🚩☀️", caption: "Flags work in daylight" },
          { at: "A fair test", emoji: "⚖️", caption: "Change only one thing at a time" },
        ],
      },
    ],
  },

  "sci-4.structures": {
    hook: {
      show: [
        { emoji: "🦉🌙", caption: "An owl hunts at night" },
        { at: "finds a mouse", emoji: "🐭", caption: "It finds a mouse in the dark" },
        { at: "swoops down without a sound", emoji: "🦉🤫", caption: "Silent wings" },
        { at: "built for the job", emoji: "👀👂🪶", caption: "Eyes, ears, feathers and claws" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌻", caption: "Every plant part has a job" },
          { at: "The roots grow down", emoji: "⬇️🟫", caption: "Roots: water and grip" },
          { at: "The stem holds the plant up", emoji: "🌿", caption: "The stem holds it up" },
          { at: "The leaves capture sunlight", emoji: "🍃☀️", caption: "Leaves make food from sunlight" },
          { at: "The flowers make seeds", emoji: "🌸➡️🌱", caption: "Flowers make seeds" },
        ],
      },
      {
        show: [
          { big: "Outside + Inside", caption: "Structures outside and inside" },
          { at: "A turtle's hard shell", emoji: "🐢", caption: "A shell for protection" },
          { at: "An eagle's sharp talons", emoji: "🦅", caption: "Talons grab, beaks tear" },
          { at: "Internal structures are hidden inside", emoji: "❤️🫁", caption: "Heart and lungs are inside" },
          { at: "a bird's egg", emoji: "🥚🐣", caption: "An eggshell protects the chick" },
        ],
      },
      {
        show: [
          { emoji: "👀👂👃👅✋", caption: "Senses gather information" },
          { at: "called receptors", big: "Receptors", caption: "Cells that notice the world" },
          { at: "travels along nerves to the brain", emoji: "⚡🧠", caption: "Nerves carry messages to the brain" },
          { at: "A rabbit hears a twig snap", emoji: "🐇💨", caption: "Danger! Run!" },
          { at: "rattle of its food bag", emoji: "🐕🍖", caption: "Animals remember, too" },
        ],
      },
    ],
  },

  "sci-4.earth-changes": {
    hook: {
      show: [
        { photo: "Grand Canyon", caption: "The Grand Canyon in Arizona" },
        { at: "striped red, tan and white", emoji: "🟥🟨⬜", caption: "Striped rock walls" },
        { at: "shells of ancient sea animals", emoji: "🐚", caption: "Sea shells in the rock!" },
        { at: "How did seashells get up here", big: "?", caption: "How did they get up here?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Weathering", caption: "Breaking rock into smaller pieces" },
          { at: "Rainwater seeps into a crack", emoji: "💧🪨", caption: "Water gets into a crack" },
          { at: "Water expands when it freezes", emoji: "🧊↔️", caption: "Ice pushes the crack wider" },
          { at: "Plant roots do something similar", emoji: "🌱🪨", caption: "Roots split rocks too" },
          { at: "Wind blasts rock with sand", emoji: "💨🏜️", caption: "Wind and rain wear rock away" },
        ],
      },
      {
        show: [
          { big: "Erosion", caption: "Moving broken rock to a new place" },
          { at: "Rivers are strong movers", emoji: "🏞️", caption: "Rivers carry sand and mud" },
          { at: "Glaciers, huge slow rivers of ice", emoji: "🧊🏔️", caption: "Glaciers scrape and drag rocks" },
          { at: "Wind blows sand into dunes", emoji: "💨🏜️", caption: "Wind piles up dunes" },
          { at: "carved the Grand Canyon", emoji: "🏜️〰️", caption: "A river carved the Grand Canyon" },
        ],
      },
      {
        show: [
          { emoji: "🏞️⬇️", caption: "Slow water drops its sand and mud" },
          { at: "Layer after layer piles up", emoji: "🥞", caption: "Layer after layer" },
          { at: "so it is the oldest", big: "Oldest ⬇️", caption: "The bottom layer is the oldest" },
          { at: "Fossils are the remains", emoji: "🦴🐚🍂", caption: "Fossils: traces of ancient life" },
          { at: "Shells of sea animals", emoji: "🐚🌊", caption: "Once, a sea covered this land" },
        ],
      },
      {
        show: [
          { emoji: "🗺️", caption: "Maps show patterns" },
          { at: "called the Ring of Fire", emoji: "🌋⭕", caption: "The Ring of Fire around the Pacific" },
          { at: "Mountains form long chains", emoji: "🏔️🏔️🏔️", caption: "Mountains in long chains" },
          { at: "the Mariana Trench", emoji: "🌊⬇️", caption: "The deepest place in the ocean" },
          { at: "giant pieces called plates", emoji: "🧩🌍", caption: "Earth's shell is in giant pieces" },
        ],
      },
    ],
  },

  "sci-4.resources-hazards": {
    hook: {
      show: [
        { emoji: "🔘💡", caption: "Click! The light comes on" },
        { at: "where did that energy really start", big: "?", caption: "Where did the energy start?" },
        { at: "Maybe in sunshine", emoji: "☀️🌬️⛏️", caption: "Sun, wind or coal?" },
        { at: "back to nature", emoji: "🌍", caption: "Follow the energy back to nature" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌍", caption: "Energy comes from nature" },
          { at: "Some are renewable", big: "Renewable", caption: "Nature replaces them quickly" },
          { at: "The Sun shines every day", emoji: "☀️🌬️🏞️🌳", caption: "Sun, wind, water, trees" },
          { at: "Other resources are nonrenewable", big: "Nonrenewable", caption: "Once used, gone for good" },
          { at: "use them wisely", emoji: "🤔", caption: "Use them wisely" },
        ],
      },
      {
        show: [
          { big: "Fossil fuels", caption: "Coal, oil and natural gas" },
          { at: "pack plenty of energy", emoji: "🚗🏠⚡", caption: "Cars, homes and electricity" },
          { at: "has trade-offs", emoji: "⚖️", caption: "Every resource has trade-offs" },
          { at: "Mining coal digs up", emoji: "⛏️", caption: "Mines change the land" },
          { at: "Dams change rivers", emoji: "🏞️🐟", caption: "Renewables have trade-offs too" },
        ],
      },
      {
        show: [
          { big: "Natural hazard", caption: "A natural event that can cause harm" },
          { at: "Earthquakes shake the ground", emoji: "🌍〰️", caption: "Earthquakes shake the ground" },
          { at: "Volcanoes erupt", emoji: "🌋", caption: "Volcanoes erupt" },
          { at: "Floods happen", emoji: "🌊🏠", caption: "Floods and storms" },
          { at: "Scientists watch for warning signs", emoji: "🛰️📈", caption: "Scientists watch for warning signs" },
        ],
      },
      {
        show: [
          { emoji: "🛠️🛡️", caption: "Engineering for safety" },
          { at: "thick rubber pads", emoji: "🏢↔️", caption: "Buildings that sway, not crumble" },
          { at: "Levees and flood walls", emoji: "🧱🌊", caption: "Levees hold back rivers" },
          { at: "raised on stilts", emoji: "🏠⬆️", caption: "Houses up on stilts" },
          { at: "drop, cover under a sturdy table", emoji: "🙇🪑", caption: "Drop, cover and hold on" },
        ],
      },
    ],
  },
};
