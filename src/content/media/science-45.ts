import type { CourseMedia } from "./types";

/** Slides and videos for the science-45 lessons, keyed by lesson id. */
export const science45Media: CourseMedia = {
  "science-45.matter": {
    hook: {
      show: [
        { photo: "Puddle", caption: "After the rain: a big puddle on the ground" },
        { at: "the puddle is gone", emoji: "☀️💨", caption: "A few sunny hours later, the puddle has vanished" },
        { at: "where did all that water go", big: "?", caption: "Nobody mopped it up. So where did it go?" },
        { at: "up into the sky", emoji: "💧⬆️☁️", caption: "The answer goes up into the sky and back down again" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Matter", caption: "Anything that takes up space and has mass" },
          { at: "Mass means", emoji: "⚖️", caption: "Mass: how much stuff is in something" },
          { at: "A bowling ball", emoji: "🎳🆚🏀", caption: "A bowling ball is packed with much more stuff than a basketball" },
          { at: "blow up a balloon", emoji: "🎈💨", caption: "You can't see air, but it fills a balloon. Air is matter!" },
          { at: "Light, sounds and feelings", emoji: "💡🔊❤️", caption: "Light, sound and feelings are not matter" },
        ],
      },
      {
        show: [
          { emoji: "🧊💧🎈", caption: "Three main states: solid, liquid and gas" },
          { at: "A solid keeps", photo: "Ice cube", caption: "An ice cube is a solid: it keeps its own shape" },
          { at: "A liquid flows", emoji: "🥛➡️🥣", caption: "A liquid takes the shape of its container, but the amount stays the same" },
          { at: "A gas spreads out", emoji: "🎈", caption: "A gas spreads out to fill the whole space" },
          { at: "tiny particles", emoji: "🔴🔴🔴", caption: "Packed tight, sliding past, or zooming apart: it's all in the particles" },
        ],
      },
      {
        show: [
          { emoji: "🔥❄️", caption: "Heating and cooling change matter from one state to another" },
          { at: "it melts", emoji: "🧊➡️💧", caption: "Melting: solid ice becomes liquid water" },
          { at: "0 degrees Celsius", big: "0 °C = 32 °F", caption: "Water freezes into ice at 0 degrees Celsius" },
          { at: "At 100 degrees Celsius", big: "100 °C", caption: "Water boils at 100 degrees Celsius (212 °F)" },
          { at: "a cold glass gets wet", photo: "File:Condensation droplets on glass surface.jpg", caption: "Water vapor from the air condenses into drops on a cold surface" },
        ],
      },
      {
        show: [
          { emoji: "🔄💧", caption: "The water cycle: a loop that never stops" },
          { at: "the Sun warms oceans", emoji: "☀️🌊", caption: "Evaporation: the Sun warms water and it rises as vapor" },
          { at: "Billions of droplets", photo: "Cumulus cloud", caption: "Condensation: billions of tiny droplets make a cloud" },
          { at: "precipitation", emoji: "🌧️❄️", caption: "Precipitation: rain, snow, sleet or hail" },
          { at: "collects in rivers", emoji: "🏞️🌊", caption: "Collection: water gathers, and the loop starts again" },
        ],
      },
    ],
  },

  "science-45.forces": {
    hook: {
      show: [
        { photo: "Lodestone", caption: "Lodestone: a natural magnet rock that attracts iron" },
        { at: "one end points north", emoji: "🧭⬆️", caption: "Hang it from a thread and one end turns to point north" },
        { at: "Sailors used", emoji: "⛵🌊", caption: "Sailors used it to find their way across the open sea" },
        { at: "invisible pull", big: "?", caption: "What invisible pull was turning the rock?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👉📦👈", caption: "Every force is a push or a pull" },
          { at: "kick a ball gently", emoji: "⚽💨", caption: "A soft kick or a hard kick: bigger force, bigger change" },
          { at: "Heavier things", emoji: "🎳🆚🏐", caption: "Heavier things need a bigger force to get moving" },
          { at: "a dropped apple", emoji: "🍎⬇️🌍", caption: "Gravity pulls everything toward the center of the Earth" },
        ],
      },
      {
        show: [
          { big: "Friction", caption: "A force that pushes against things that rub or slide" },
          { at: "Rough surfaces", emoji: "🌾🧶", caption: "Rough surfaces like grass and carpet make lots of friction" },
          { at: "Smooth surfaces", emoji: "⛸️🧊", caption: "Smooth ice makes very little friction, so things slide" },
          { at: "bike brakes", photo: "Bicycle brake", caption: "Bike brakes squeeze the wheel and use friction to stop" },
          { at: "Rub your hands", emoji: "🙌🔥", caption: "Rub your hands fast: friction makes heat!" },
        ],
      },
      {
        show: [
          { emoji: "🧲", caption: "Magnets pull on iron, steel, nickel and cobalt" },
          { at: "It cannot pull wood", emoji: "🪵🥤🪟", caption: "No pull on wood, plastic, paper, glass, aluminum or copper" },
          { at: "pull a paper clip", emoji: "🧲📄📎", caption: "A magnet can pull a paper clip right through paper" },
          { at: "magnetic field", photo: "File:Bar-magnet-iron-filings max.jpg", caption: "Iron filings show the magnetic field around a bar magnet" },
          { at: "gets weaker", emoji: "🧲 ➡️ ➡️ 📎", caption: "The pull is strongest up close and weaker farther away" },
        ],
      },
      {
        show: [
          { emoji: "🔴🧲🔵", caption: "Every magnet has a north pole and a south pole" },
          { at: "Opposite poles attract", big: "N + S = pull", caption: "Opposite poles attract: they pull together" },
          { at: "Like poles repel", big: "N + N = push", caption: "Like poles repel: they push apart" },
          { at: "giant magnet", emoji: "🌍🧲", caption: "Earth itself acts like a giant magnet" },
          { at: "A compass needle", photo: "Compass", caption: "A compass needle is a tiny magnet that points north" },
        ],
      },
    ],
  },

  "science-45.energy": {
    hook: {
      show: [
        { photo: "Lightning", caption: "A flash of lightning lights up the sky" },
        { at: "BOOM", emoji: "⚡💥", caption: "Seconds later: BOOM! The thunder arrives" },
        { at: "the very same moment", emoji: "⚡🤝💥", caption: "Lightning and thunder happen at the very same moment" },
        { at: "very different ways", emoji: "💡🏎️ 🔊🚲", caption: "Light and sound travel at very different speeds" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Energy", caption: "The ability to make things move or change" },
          { at: "Energy makes a car go", emoji: "🚗💡🍲", caption: "Energy makes cars go, lamps glow and soup bubble" },
          { at: "Your body gets energy from food", emoji: "🍎💪", caption: "Food gives your body energy" },
          { at: "A flashlight turns", emoji: "🔦🔋", caption: "A flashlight turns stored battery energy into light" },
          { at: "A toaster turns", emoji: "🍞🔥", caption: "A toaster turns electricity into heat" },
        ],
      },
      {
        show: [
          { emoji: "☀️💡🔥", caption: "Light comes from sources like the Sun, lamps and fires" },
          { at: "straight lines", emoji: "🔦➡️", caption: "Light travels in straight lines" },
          { at: "about 300,000 kilometers", big: "300,000 km/s", caption: "The fastest thing there is" },
          { at: "called a shadow", photo: "Shadow", caption: "A shadow forms where something blocks the light" },
          { at: "mirrors reflect light", emoji: "🪞", caption: "Mirrors bounce light back neatly" },
        ],
      },
      {
        show: [
          { emoji: "🎸〰️👂", caption: "Sound is energy made by vibrations" },
          { at: "Pluck a stretched rubber band", emoji: "〰️〰️", caption: "A plucked rubber band blurs as it vibrates" },
          { at: "The vibrations shake the air", photo: "Tuning fork", caption: "A tuning fork vibrates and shakes the air to make a note" },
          { at: "no sound at all", emoji: "🚀🔇", caption: "Empty space has no air to carry sound, so it's silent" },
          { at: "about 3 seconds", big: "3 s ≈ 1 km", caption: "Sound takes about 3 seconds to travel 1 kilometer in air" },
        ],
      },
      {
        show: [
          { emoji: "🔥➡️🧊", caption: "Heat always moves from warmer things to cooler things" },
          { at: "hot cocoa", emoji: "☕🙌", caption: "Heat flows from the warm mug into your cold hands" },
          { at: "called conductors", photo: "Cast-iron cookware", caption: "Metal pans are conductors: heat moves through them fast" },
          { at: "These are insulators", emoji: "🧤🪵", caption: "Insulators like wool and wood slow heat down" },
          { at: "winter coats are puffy", emoji: "🧥❄️", caption: "Puffy coats trap air, a great insulator" },
        ],
      },
    ],
  },

  "science-45.ecosystems": {
    hook: {
      show: [
        { big: "1995", caption: "Gray wolves return to Yellowstone National Park" },
        { at: "gray wolves", photo: "Wolf", caption: "The gray wolf, a top hunter of the northern forests" },
        { at: "hunted elk", emoji: "🐺🦌", caption: "With wolves around, the elk began to move around more" },
        { at: "young trees along the rivers", emoji: "🌳🏞️", caption: "Changes showed up all the way down to the riverbank trees" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Ecosystem", caption: "Living and nonliving things in one place, working together" },
          { at: "Living things include", emoji: "🌿🐸🍄", caption: "Living: plants, animals, mushrooms and tiny bacteria" },
          { at: "Nonliving things include", emoji: "☀️💧🪨", caption: "Nonliving: sunlight, water, air, soil and rocks" },
          { at: "A pond is an ecosystem", photo: "Pond", caption: "A pond is a whole ecosystem" },
          { at: "called its habitat", emoji: "🏡🌲", caption: "Habitat: the place where a plant or animal naturally lives" },
        ],
      },
      {
        show: [
          { emoji: "🌱🐇🦅🍄", caption: "Living things get energy in different ways" },
          { at: "Producers make their own food", emoji: "🌿☀️", caption: "Producers: plants make food from sunlight, water and air" },
          { at: "Herbivores", emoji: "🐇🦌", caption: "Herbivores eat plants. Carnivores eat other animals" },
          { at: "Omnivores", photo: "American black bear", caption: "Black bears are omnivores: berries, nuts, insects and fish" },
          { at: "Decomposers", emoji: "🍄🪱", caption: "Decomposers recycle dead things into the soil" },
        ],
      },
      {
        show: [
          { emoji: "☀️➡️🌾", caption: "Every food chain starts with the Sun and a producer" },
          { at: "meadow food chain", emoji: "🌾🦗🐸🐍🦅", caption: "Grass, grasshopper, frog, snake, hawk" },
          { at: "arrows in a food chain point", big: "food → eater", caption: "Arrows point the way the energy flows" },
          { at: "The hawk is at the top", photo: "Red-tailed hawk", caption: "A red-tailed hawk: at the top of the meadow food chain" },
        ],
      },
      {
        show: [
          { emoji: "🐇🌾🥕", caption: "Most animals eat more than one thing" },
          { at: "we get a food web", emoji: "🕸️", caption: "Many food chains linked together make a food web" },
          { at: "one tenth", big: "1/10", caption: "Only about one tenth of the energy passes up each step" },
          { at: "only a few foxes", photo: "Red fox", caption: "Lots of grass, fewer rabbits, only a few foxes" },
          { at: "the whole web feels it", emoji: "🕸️💥", caption: "Lose one living thing, and the whole web changes" },
        ],
      },
    ],
  },

  "science-45.earth": {
    hook: {
      show: [
        { photo: "Grand Canyon", caption: "The Grand Canyon in Arizona" },
        { at: "More than a mile", big: "1+ mile deep", caption: "The river at the bottom is more than a mile below the rim" },
        { at: "the Colorado", emoji: "🏞️", caption: "The Colorado River helped carve the whole canyon" },
        { at: "No bulldozers", emoji: "💧⏳", caption: "Just water, sand and a very, very long time" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🪨🪨🪨", caption: "Geologists sort rocks into three families" },
          { at: "Igneous rock forms", emoji: "🌋➡️🪨", caption: "Igneous: melted rock that cooled and hardened" },
          { at: "shiny black obsidian", photo: "Obsidian", caption: "Obsidian: shiny black igneous rock from lava that cooled fast" },
          { at: "Sedimentary rock forms", emoji: "🏖️📚", caption: "Sedimentary: layers of sand, mud and shells pressed together" },
          { at: "Metamorphic rock forms", emoji: "🔥⬇️🪨", caption: "Metamorphic: heat and pressure turn one rock into another" },
        ],
      },
      {
        show: [
          { big: "Weathering", caption: "The slow breaking of rock into smaller pieces" },
          { at: "Rain trickles into a crack", emoji: "🌧️🪨", caption: "Rain seeps into a crack in a rock" },
          { at: "until the rock splits", photo: "Frost weathering", caption: "Ice expands in cracks, and winter after winter, the rock splits" },
          { at: "Plant roots", emoji: "🌱🪨", caption: "Plant roots pry cracks open too" },
          { at: "old sidewalk", emoji: "🚶🌿", caption: "Weeds in sidewalk cracks: weathering in action" },
        ],
      },
      {
        show: [
          { big: "Erosion", caption: "Carrying broken rock pieces away" },
          { at: "Rivers drag sand", emoji: "🏞️🪨", caption: "Rivers drag sand and pebbles downstream" },
          { at: "Wind blows sand", emoji: "🏜️💨", caption: "Wind blows sand across deserts" },
          { at: "called glaciers", photo: "Glacier", caption: "A glacier: a huge river of ice that grinds and pushes rock" },
          { at: "That is called deposition", emoji: "⬇️🏖️", caption: "Deposition: where water or wind slows down, it drops its load" },
        ],
      },
      {
        show: [
          { emoji: "🏜️⏳", caption: "Weathering plus erosion plus millions of years" },
          { at: "The Colorado River slowly cut", photo: "Colorado River", caption: "The Colorado River, still cutting deeper today" },
          { at: "giant stack of paper", emoji: "📚", caption: "Canyon walls show stripes of rock layers" },
          { at: "the bottom layers are the oldest", big: "Bottom = oldest", caption: "The bottom layers were laid down first" },
          { at: "The top layers are the youngest", big: "Top = youngest", caption: "The top layers were laid down last" },
        ],
      },
    ],
  },
};
