import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the science lessons, keyed by lesson id. */
export const scienceMedia: CourseMedia = {
  "science.method": {
    hook: {
      show: [
        { big: "1668", caption: "Italy, 1668: most people believed flies grew out of rotting meat" },
        { at: "Francesco Redi", photo: "Francesco Redi", caption: "Francesco Redi: Italian doctor, poet and very careful scientist" },
        { at: "set up a few jars", emoji: "🫙🥩🫙", caption: "Meat in jars: some left open, some sealed, some covered with gauze" },
        { at: "simple fair test", photo: "Housefly", caption: "A housefly: Redi showed maggots come from fly eggs, not from meat" },
      ],
    },
    teach: [
      {
        // The part-level slides stay as the fallback: they are what plays if the
        // scenes below are ever removed, or presented lessons are switched off.
        show: [
          { emoji: "❓🔬", caption: "Good science begins with a question you can actually test" },
          { at: "warm water dissolve sugar", photo: "Sugar", caption: "Sugar crystals: will they disappear faster in warm water?" },
          { at: "A hypothesis is your", big: "Hypothesis", caption: "A testable prediction, often written as an if-then sentence" },
          { at: "if I stir sugar", emoji: "☕🥄⏱️", caption: "If warm water, then faster dissolving, because the molecules move faster" },
          { at: "is an opinion", emoji: "😋🚫📏", caption: "No ruler or stopwatch can measure 'delicious', so it's not testable" },
        ],
        scenes: [
          {
            show: [
              { emoji: "❓🔬", caption: "Science starts with a question an experiment can answer" },
              { at: "Is chocolate ice cream", emoji: "🍫🍦", caption: "Best flavour? Nothing in the world measures best" },
              { at: "Does warm water dissolve", photo: "Sugar", caption: "Does warm water dissolve sugar faster? Now you can test it" },
              { at: "names something you can change", emoji: "🎛️📏", caption: "A good question: one thing to change, one thing to measure" },
            ],
          },
          {
            show: [
              { big: "Hypothesis", caption: "A prediction you make before you test" },
              { at: "if, then, because", big: "if · then · because", caption: "The three parts of every hypothesis" },
              { at: "If I stir sugar", emoji: "☕🥄⏱️", caption: "If warm water, then faster, because the molecules move faster" },
            ],
          },
          {
            show: [
              { emoji: "🎯🤷", caption: "Not a wild guess, and not a fact you already know" },
              { at: "could knock it down", big: "Could it be proven wrong?", caption: "If no result could knock it down, it is not a hypothesis" },
              { at: "being wrong is not failure", emoji: "❌➡️💡", caption: "A hypothesis that gets knocked down still teaches you something true" },
            ],
          },
        ],
      },
      {
        show: [
          { big: "Variable", caption: "Anything in an experiment that can change" },
          { at: "independent variable is", emoji: "🎛️👆", caption: "Independent: the one knob YOU turn on purpose" },
          { at: "dependent variable is", photo: "Stopwatch", caption: "Dependent: what you measure, like the time on a stopwatch" },
          { at: "Controlled variables are", emoji: "🔒🔒🔒", caption: "Controlled: everything else stays locked the same" },
          { at: "Water temperature is independent", photo: "Thermometer", caption: "In the sugar test, water temperature is the knob you turn" },
        ],
        scenes: [
          {
            show: [
              { big: "Variable", caption: "Anything in an experiment that could change" },
              { at: "one thing you change on purpose", emoji: "🎛️👆", caption: "Independent: the one knob you turn" },
              { at: "thing you measure", photo: "Stopwatch", caption: "Dependent: the thing you measure" },
              { at: "everything else", emoji: "🔒🔒🔒", caption: "Controlled: everything else, held still" },
            ],
          },
          {
            show: [
              { photo: "Thermometer", caption: "Water temperature: the knob I turn on purpose" },
              { at: "how many seconds", photo: "Stopwatch", caption: "Seconds to dissolve: the thing I measure" },
              { at: "Everything else gets held still", emoji: "🥤🥄🔟", caption: "Same cup, same spoonful, same ten stirs, every single time" },
            ],
          },
          {
            show: [
              { big: "D · D", caption: "Dependent = Data. Both D words go together" },
              { at: "say the sentence out loud", emoji: "🗣️➡️", caption: "I changed the temperature, so I measured the time" },
            ],
          },
        ],
      },
      {
        show: [
          { emoji: "⚖️☝️", caption: "A fair test changes just ONE thing at a time" },
          { at: "paper towel brands", photo: "Paper towel", caption: "Which towel soaks up more? Only a fair test can tell" },
          { at: "Was it the brand or the size?", emoji: "🤔❓", caption: "Two changes at once, so you can't tell which one mattered" },
          { at: "Redi's experiment worked", photo: "Francesco Redi", caption: "Redi kept everything the same except the cover on each jar" },
        ],
        scenes: [
          {
            show: [
              { photo: "Paper towel", caption: "Which towel soaks up more water?" },
              { at: "a big sheet of Brand A", emoji: "🟦⬛", caption: "A big sheet of Brand A, a small sheet of Brand B" },
              { at: "The brand changed", emoji: "⚠️2️⃣", caption: "Two things changed at once: the brand AND the size" },
              { at: "You cannot tell", big: "You cannot tell", caption: "When two things move together, the result cannot separate them" },
            ],
          },
          {
            show: [
              { photo: "Francesco Redi", caption: "Redi held everything still but one thing" },
              { at: "Same meat in every jar", emoji: "🫙🥩🫙", caption: "Same meat, same jars, same room, same days" },
              { at: "gauze cover", photo: "Housefly", caption: "One difference: gauze or no gauze. So the cover had to be the answer" },
              { at: "nowhere to hide", big: "Change one thing", caption: "Hold everything still but one, and the result has nowhere to hide" },
            ],
          },
        ],
      },
      {
        show: [
          { emoji: "🔁🔁🔁", caption: "One trial could be a fluke, so scientists repeat each test" },
          { at: "find the average", big: "(9 + 10 + 11) ÷ 3 = 10", caption: "Average: add up the results, then divide by how many there are" },
          { at: "data table", emoji: "📋✏️", caption: "Write each result in a table right away, not from memory later" },
          { at: "write a conclusion", emoji: "✅❓❌", caption: "Did the data support your hypothesis? Either answer is real science" },
          { at: "never acceptable", big: "Never fake data", caption: "Honest data is the heart of science" },
        ],
        scenes: [
          {
            show: [
              { emoji: "🔁🔁🔁", caption: "One trial could be a fluke, so run it again" },
              { at: "take the average", big: "(9 + 10 + 11) ÷ 3 = 10", caption: "Average: add the results, divide by how many" },
              { at: "wins all three times", emoji: "🥇🥇🥇", caption: "Three wins out of three? Now you have something" },
            ],
          },
          {
            show: [
              { emoji: "📋✏️", caption: "Write each measurement down the moment you take it" },
              { at: "memory quietly rearranges", emoji: "🧠🌀", caption: "Memory quietly rearranges things to match what you expected" },
              { at: "never bent", big: "Never change your data", caption: "The moment the numbers bend to the prediction, it has told you nothing" },
            ],
          },
          {
            show: [
              { emoji: "✅❓❌", caption: "Did the data support your hypothesis? Either answer is real science" },
              { at: "the world told you no", emoji: "🌍🙅", caption: "You tested it properly and the world told you no. That is a result" },
              { at: "Redi did not prove", photo: "Francesco Redi", caption: "Redi did not prove what everyone expected, which is why we remember him" },
            ],
          },
        ],
      },
    ],
  },

  "science.forces": {
    hook: {
      show: [
        { photo: "Hockey puck", caption: "A hockey puck glides a long way because ice has very little friction" },
        { at: "it would never stop", emoji: "🏒➡️♾️", caption: "With zero friction, the puck would slide forever" },
        { at: "Galileo", photo: "Galileo Galilei", caption: "Galileo Galilei, the Italian scientist who tested ideas with experiments" },
        { at: "balls, ramps, and a water clock", emoji: "⚽📐💧", caption: "He timed rolling balls by weighing water that dripped out of a tank" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👉📦👈", caption: "Every force is a push or a pull" },
          { at: "Gravity pulls everything", emoji: "🍎⬇️🌍", caption: "Gravity tugs everything toward the center of the Earth" },
          { at: "A magnet can pull", photo: "File:Bar-magnet-iron-filings max.jpg", caption: "Iron filings line up around a bar magnet, pulled without a touch" },
          { at: "measure forces in newtons", big: "1 N ≈ 🍎", caption: "Holding up a medium apple takes about 1 newton" },
          { at: "tug of war", photo: "Tug of war", caption: "Equal pulls on both ends: balanced forces, so the rope stays put" },
        ],
      },
      {
        show: [
          { photo: "Isaac Newton", caption: "Isaac Newton published his three laws of motion in 1687" },
          { at: "called inertia", big: "Inertia", caption: "Objects keep doing whatever they're already doing" },
          { at: "Galileo realized friction", emoji: "🧱↔️🛑", caption: "Friction is the sneaky force that slows sliding things down" },
          { at: "Voyager 1", photo: "Voyager 1", caption: "Voyager 1 launched in 1977 and is still coasting out of the solar system" },
          { at: "loaded truck", emoji: "🚚🆚🚲", caption: "More mass, more inertia: harder to get going and harder to stop" },
        ],
      },
      {
        show: [
          { big: "F = m × a", caption: "Force equals mass times acceleration" },
          { at: "Acceleration means", emoji: "🏎️💨↪️", caption: "Speeding up, slowing down and turning are ALL acceleration" },
          { at: "kick a ball harder", emoji: "🦶⚽💨", caption: "A harder kick means a bigger acceleration" },
          { at: "empty shopping cart", photo: "Shopping cart", caption: "Same push, more mass: a full cart barely gets going" },
          { at: "a 10 N force", big: "10 N ÷ 2 kg = 5 m/s²", caption: "Divide the force by the mass to find the acceleration" },
        ],
      },
      {
        show: [
          { big: "Action ⇄ Reaction", caption: "Forces always come in equal and opposite pairs" },
          { at: "When you swim", photo: "Front crawl", caption: "Hands push water back, so the water pushes the swimmer forward" },
          { at: "When a rocket fires", photo: "File:Apollo 11 Launch - GPN-2000-000630.jpg", caption: "Apollo 11, 1969: the rocket pushes gas down, the gas pushes it up" },
          { at: "Even sitting still", emoji: "🪑⬇️⬆️", caption: "You push down on the chair, and the chair pushes right back up" },
        ],
        watch: { youtube: "JGO_zDWmkvk", title: "Newton's 3 Laws, with a bicycle - Joshua Manley", channel: "TED-Ed" },
      },
    ],
  },

  "science.energy": {
    hook: {
      show: [
        { photo: "File:Bouncing ball strobe edit.jpg", caption: "A strobe photo of one bouncing ball: each bounce is lower" },
        { at: "So where did it go?", emoji: "🏀❓🔥", caption: "The missing bounce energy didn't vanish. It went somewhere!" },
        { at: "James Joule", photo: "James Prescott Joule", caption: "James Prescott Joule, an English brewer who loved precise measuring" },
        { at: "warming water with a falling weight", photo: "File:Joule's Apparatus (Harper's Scan).png", caption: "Joule's machine: a falling weight spins paddles inside water" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Energy", caption: "The ability to make things move or change" },
          { at: "Kinetic energy is", emoji: "⚾🐦💨", caption: "Kinetic energy: anything that's moving has it" },
          { at: "A rock on a cliff", photo: "File:Balanced rock at arches national park.jpg", caption: "Balanced Rock in Utah: lots of stored gravitational energy" },
          { at: "A stretched rubber band", photo: "Rubber band", caption: "Stretch it and it stores elastic potential energy" },
          { at: "Food and batteries", emoji: "🍌🔋", caption: "Chemical energy is packed into food and batteries" },
        ],
      },
      {
        show: [
          { emoji: "🔄⚡", caption: "Energy is always changing from one form to another" },
          { at: "On a roller coaster", photo: "Roller coaster", caption: "The chain lift pulls the cars up, loading them with potential energy" },
          { at: "As the car plunges down", emoji: "🎢⬇️💨", caption: "Going down: stored energy turns into speed" },
          { at: "A swinging pendulum", photo: "Swing (seat)", caption: "A swing is a pendulum: highest = most stored energy, bottom = fastest" },
          { at: "electrical energy becomes light", emoji: "🔌➡️💡", caption: "A lamp turns electrical energy into light and heat" },
        ],
      },
      {
        show: [
          { photo: "File:Joule's Apparatus (Harper's Scan).png", caption: "Joule's paddle-wheel machine from the 1840s" },
          { at: "The water warmed slightly", emoji: "💧🌡️⬆️", caption: "The same drop always warmed the water by the same tiny amount" },
          { at: "law of conservation of energy", big: "Energy in = Energy out", caption: "Energy is never created or destroyed, only changed" },
          { at: "bounce lower each time", emoji: "🏀🔥🔊", caption: "Each bounce leaks a little energy as heat and sound" },
          { at: "perpetual motion machine", photo: "Perpetual motion", caption: "People have drawn 'forever' machines for centuries. None can work" },
        ],
      },
    ],
  },

  "science.machines": {
    hook: {
      show: [
        { photo: "Archimedes", caption: "Archimedes, a brilliant Greek inventor who lived over 2,200 years ago" },
        { at: "long enough lever", photo: "File:Archimedes lever (Small).jpg", caption: "An old engraving of Archimedes' boast: one lever to move the world" },
        { at: "He was exaggerating", emoji: "🌍😅", caption: "The lever would need to be unbelievably long" },
        { at: "open a door", emoji: "🚪👋", caption: "A door is a lever, and you use it every day" },
      ],
    },
    teach: [
      {
        show: [
          { big: "6", caption: "Six simple machines are hidden inside almost every gadget" },
          { at: "A lever is", photo: "Seesaw", caption: "A seesaw is a lever balanced on a fulcrum in the middle" },
          { at: "A pulley is", photo: "Pulley", caption: "A pulley: a wheel with a rope that changes the direction of a pull" },
          { at: "A screw is", photo: "File:Wood screws.jpg", caption: "A screw's threads are a ramp wrapped around a post" },
          { at: "compound machines", photo: "Bicycle", caption: "A bicycle combines wheels, axles, levers and more" },
        ],
      },
      {
        show: [
          { emoji: "📏🔁💪", caption: "No free energy: machines trade distance for force" },
          { at: "Work is force times distance", big: "Work = F × d", caption: "Work is measured in joules" },
          { at: "Lifting a 500 N box", emoji: "📦⬆️😤", caption: "Straight up: 500 N of force over 1 meter" },
          { at: "smooth 5 meter ramp", photo: "Inclined plane", caption: "A long ramp: less force, but you push farther" },
          { at: "the work is about 500 joules", big: "500 J", caption: "Same work either way, just split up differently" },
        ],
      },
      {
        show: [
          { photo: "Lever", caption: "A lever pivots on a point called the fulcrum" },
          { at: "Picture a 100 N rock", big: "100 × 20 = 25 × 80", caption: "Both sides equal 2,000, so the lever balances" },
          { at: "long crowbar", photo: "File:Crowbar without haft.jpg", caption: "A long crowbar turns a small push into a big pry" },
          { at: "a door is easiest", emoji: "🚪👉", caption: "Push by the handle, far from the hinges, and it swings easily" },
        ],
      },
      {
        show: [
          { big: "MA", caption: "Mechanical advantage: how many times a machine multiplies your force" },
          { at: "a mechanical advantage of 4", big: "80 ÷ 20 = 4", caption: "One quarter of the force, but your end moves 4 times as far" },
          { at: "For a ramp", big: "6 ÷ 2 = 3", caption: "A 6 m ramp rising 2 m has a mechanical advantage of 3" },
          { at: "Your forearm is a lever", emoji: "💪⚾💨", caption: "Your forearm trades extra muscle force for a lightning-fast hand" },
        ],
      },
    ],
  },

  "science.cells": {
    hook: {
      show: [
        { big: "30 trillion", caption: "About 30,000,000,000,000 cells are working inside you right now" },
        { at: "thin slice of cork", photo: "File:CorkOakStripped.jpg", caption: "Cork is bark! This cork oak has had its spongy bark peeled off" },
        { at: "rows of tiny boxes", photo: "File:RobertHookeMicrographia1665.jpg", caption: "Hooke's own 1665 drawing of the tiny boxes he saw in cork" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔬👀", caption: "Most cells are far too small to see without a microscope" },
          { at: "Robert Hooke", photo: "File:Hooke-microscope.png", caption: "Robert Hooke's microscope, drawn in his book Micrographia" },
          { at: "Antonie van Leeuwenhoek", photo: "Antonie van Leeuwenhoek", caption: "Antonie van Leeuwenhoek, a Dutch cloth merchant who made his own lenses" },
          { at: "pond water", photo: "Paramecium", caption: "A paramecium: one of the single-celled swimmers in pond water" },
          { at: "cell theory", big: "Cell theory", caption: "All living things are made of cells, and cells come from cells" },
        ],
        watch: { youtube: "4OpBylwH9DU", title: "The wacky history of cell theory - Lauren Royal-Woods", channel: "TED-Ed" },
      },
      {
        show: [
          { emoji: "🔬🧫⚙️", caption: "Inside every cell are tiny working parts called organelles" },
          { at: "The cell membrane", emoji: "🫧🚪", caption: "The membrane is the gatekeeper deciding what gets in and out" },
          { at: "The nucleus holds DNA", photo: "DNA", caption: "DNA: a twisted ladder of instructions, kept inside the nucleus" },
          { at: "Mitochondria break down", photo: "Mitochondrion", caption: "Mitochondria: the powerhouses that turn sugar into usable energy" },
          { at: "Ribosomes", emoji: "🔴🧱", caption: "Ribosomes are tiny builders that make proteins" },
        ],
      },
      {
        show: [
          { emoji: "🌿🆚🐾", caption: "Plant cells and animal cells: lots alike, with three big differences" },
          { at: "A stiff cell wall", photo: "File:Onion Epidermis Cells W.M. 40x - 132.jpg", caption: "Onion skin under a microscope: stiff walls make brick-like cells" },
          { at: "Chloroplasts are green", photo: "File:Plagiomnium affine laminazellen.jpeg", caption: "Those green dots are chloroplasts, where sunlight becomes sugar" },
          { at: "large central vacuole", emoji: "💧🎈", caption: "The vacuole is like a water balloon that keeps the cell firm" },
          { at: "When a plant wilts", photo: "File:Roses wilted after heat wave at Gamla Strandgatan 11, Gamlestan, Lysekil.jpg", caption: "Roses drooping after a heat wave: their vacuoles lost water" },
        ],
      },
    ],
  },

  "science.space": {
    hook: {
      show: [
        { photo: "File:The Blue Marble (remastered).jpg", caption: "Earth, photographed by the Apollo 17 astronauts in 1972" },
        { at: "early January", big: "Early January", caption: "Earth's closest point to the Sun, about 147 million km away" },
        { at: "middle of winter", photo: "Winter", caption: "Snowy and cold up north, even though the Sun is closest" },
        { at: "what does?", emoji: "🌍🤔☀️", caption: "If it isn't distance, what makes summer?" },
      ],
      watch: { youtube: "DD_8Jm5pTLk", title: "Reasons for the seasons - Rebecca Kaplan", channel: "TED-Ed" },
    },
    teach: [
      {
        show: [
          { photo: "Sun", caption: "The Sun holds over 99 percent of all the mass in the solar system" },
          { at: "four inner planets", photo: "Terrestrial planet", caption: "The rocky inner planets: Mercury, Venus, Earth and Mars" },
          { at: "Jupiter and Saturn", photo: "Saturn", caption: "Saturn, a giant made mostly of hydrogen and helium" },
          { at: "Uranus and Neptune", photo: "Neptune", caption: "Neptune, an ice giant, photographed by Voyager 2 in 1989" },
          { at: "Neptune takes about 165", big: "165 years", caption: "One trip around the Sun for Neptune" },
        ],
      },
      {
        show: [
          { big: "23.5°", caption: "Earth's axis is tilted, like a leaning spinning top" },
          { at: "leans toward the Sun", emoji: "🌍↗️☀️", caption: "The tilt stays pointed the same way all year as Earth orbits" },
          { at: "That is summer", emoji: "☀️🏖️", caption: "Direct sunlight and long days make summer" },
          { at: "That is winter", emoji: "❄️⛄", caption: "Slanted sunlight and short days make winter" },
          { at: "people in Australia", photo: "Bondi Beach", caption: "Bondi Beach in Sydney, where New Year's Day is a summer day" },
        ],
      },
      {
        show: [
          { photo: "Eratosthenes", caption: "Eratosthenes, chief librarian of the great library in Alexandria" },
          { at: "straight down a deep well", emoji: "☀️⬇️🕳️", caption: "In Syene at noon, sunlight reached the bottom of a deep well" },
          { at: "a stick cast a shadow", emoji: "☀️↘️📏", caption: "In Alexandria, a stick's shadow leaned 7.2 degrees" },
          { at: "one fiftieth of 360", big: "7.2° × 50 = 360°", caption: "So the two cities are one fiftieth of the way around Earth" },
          { at: "about 40,000 kilometers", big: "40,000 km", caption: "Super close to the modern answer, using just a stick and a shadow" },
        ],
      },
      {
        show: [
          { photo: "Moon", caption: "The Moon shines only with reflected sunlight" },
          { at: "about every 29.5 days", big: "29.5 days", caption: "One full cycle of Moon phases" },
          { at: "At new moon", emoji: "☀️🌑🌍", caption: "New moon: the lit side faces away from us" },
          { at: "crescent, first quarter, gibbous", emoji: "🌒🌓🌔🌕", caption: "Waxing: crescent, first quarter, gibbous, full!" },
          { at: "lunar eclipse", photo: "Lunar eclipse", caption: "In a lunar eclipse, Earth's shadow turns the Moon coppery red" },
        ],
      },
    ],
  },

  "science.matter": {
    hook: {
      show: [
        { photo: "Campfire", caption: "A campfire: wood goes in, and flames and smoke come out" },
        { at: "small pile of gray ash", emoji: "🪵🔥➡️💨", caption: "Hours later, only a little ash is left. Where did the rest go?" },
        { at: "Antoine Lavoisier", photo: "Antoine Lavoisier", caption: "Antoine Lavoisier, the French chemist who weighed everything" },
        { at: "very careful balance", emoji: "⚖️", caption: "His secret weapon: a very careful balance" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🪨💧🌬️", caption: "Rocks, water, air, even you: all of it is matter" },
          { at: "built from atoms", emoji: "⚛️", caption: "Atoms: the tiny building blocks of everything" },
          { at: "more than a billion billion", big: "A billion billion", caption: "At least that many atoms in a single drop of water" },
          { at: "periodic table", photo: "Periodic table", caption: "The periodic table: all 118 known elements in one chart" },
          { at: "Others come from Latin", big: "Fe · Au", caption: "Fe from ferrum (iron), Au from aurum (gold)" },
        ],
      },
      {
        show: [
          { emoji: "⚛️🔗⚛️", caption: "Atoms bond together to form molecules" },
          { at: "its formula is H2O", big: "H₂O", caption: "Two hydrogen atoms + one oxygen atom = one water molecule" },
          { at: "Carbon dioxide, CO2", big: "CO₂", caption: "One carbon atom and two oxygen atoms" },
          { at: "Bonded together, they make sodium chloride", photo: "Sodium chloride", caption: "A salt crystal: a soft metal and a poisonous gas, bonded together" },
          { at: "the oxygen we breathe, O2", big: "O₂", caption: "A molecule, but not a compound: only one kind of atom" },
        ],
      },
      {
        show: [
          { emoji: "🧊➡️💧", caption: "Melting ice is still water, just in a new state" },
          { at: "A chemical change makes", emoji: "✨🆕", caption: "A chemical change makes brand-new substances" },
          { at: "When iron rusts", photo: "Rust", caption: "Rust: iron and oxygen have formed iron oxide" },
          { at: "When you bake a cake", emoji: "🎂", caption: "Baked cake can never turn back into batter" },
          { at: "Watch for clues", emoji: "🫧🎨👃🔥", caption: "Clues: bubbles, new color, new smell, light or heat, a new solid" },
        ],
      },
      {
        show: [
          { emoji: "🧪➡️✨", caption: "Reactants go in, products come out" },
          { at: "Antoine Lavoisier showed", photo: "Antoine Lavoisier", caption: "Lavoisier weighed everything, even the gases" },
          { at: "in sealed containers", emoji: "⚖️🫙", caption: "Sealed containers trapped every bit of gas for weighing" },
          { at: "law of conservation of mass", big: "Mass in = Mass out", caption: "The law of conservation of mass" },
          { at: "why does a burning log", emoji: "🪵🔥💨", caption: "The log's atoms float away as carbon dioxide and water vapor" },
        ],
      },
    ],
  },

  "science.ecosystems": {
    hook: {
      show: [
        { photo: "Yellowstone National Park", caption: "Yellowstone National Park, in the Rocky Mountains" },
        { at: "elk herds grew large", photo: "Elk", caption: "With no wolves around, elk herds grew large" },
        { at: "in 1995", big: "1995", caption: "Gray wolves are brought back to Yellowstone" },
        { at: "web of life", emoji: "🐺🦌🌳🦫", caption: "One hunter returns. What happens to everyone else?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "☀️🌱", caption: "Producers make their own food from sunlight" },
          { at: "This is photosynthesis", big: "Photosynthesis", caption: "Sunlight + water + carbon dioxide → sugar" },
          { at: "Herbivores eat only plants", emoji: "🐇🍀", caption: "Herbivores eat plants; carnivores eat animals" },
          { at: "Omnivores eat both", photo: "American black bear", caption: "A black bear: an omnivore that eats berries and fish" },
          { at: "the decomposers", emoji: "🍄🪱🦠", caption: "Decomposers: fungi, earthworms and bacteria recycle the dead" },
        ],
      },
      {
        show: [
          { emoji: "🌾➡️🦗➡️🐸➡️🐍➡️🦅", caption: "A meadow food chain: one path of energy" },
          { at: "begins with a producer", emoji: "☀️🌱", caption: "Every chain starts with a producer catching sunlight" },
          { at: "It points from the food to the eater", big: "food → eater", caption: "The arrow shows where the energy goes" },
          { at: "food web", photo: "Food web", caption: "A food web: many food chains tangled together" },
        ],
      },
      {
        show: [
          { emoji: "🦗💨", caption: "A grasshopper uses most of its energy just to stay alive" },
          { at: "only about 10 percent", big: "10%", caption: "Only about one tenth of the energy moves up each level" },
          { at: "energy pyramid", photo: "Ecological pyramid", caption: "An energy pyramid: a wide base of producers, a tiny top" },
          { at: "only a few hawks", photo: "Red-tailed hawk", caption: "Top predators, like this red-tailed hawk, are few" },
        ],
      },
      {
        show: [
          { photo: "Sea otter", caption: "A sea otter, a hungry hunter of sea urchins" },
          { at: "sea urchins graze on giant kelp", photo: "Kelp forest", caption: "A giant kelp forest, shelter for many fish" },
          { at: "keystone species", big: "Keystone species", caption: "One animal with an outsized effect on its ecosystem" },
          { at: "A drought can shrink", emoji: "🏜️🌾⬇️", caption: "A drought shrinks the grass, and the whole chain feels it" },
          { at: "When wolves returned to Yellowstone", photo: "Gray wolf", caption: "A gray wolf. Wolves returned to Yellowstone in 1995" },
        ],
      },
    ],
  },

  "science.earth": {
    hook: {
      show: [
        { emoji: "🗺️", caption: "Look closely at the Atlantic coasts on a world map" },
        { at: "jigsaw puzzle", emoji: "🧩🌎🌍", caption: "South America and Africa fit like puzzle pieces" },
        { at: "Alfred Wegener", photo: "Alfred Wegener", caption: "Alfred Wegener, German scientist and polar explorer" },
        { at: "maps of the deep ocean floor", emoji: "🌊🗺️", caption: "Maps of the ocean floor finally backed him up" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🍑", caption: "Earth is built in layers, a bit like a peach" },
          { at: "The crust is the thin skin", photo: "Structure of Earth", caption: "Earth's layers: crust, mantle, outer core and inner core" },
          { at: "almost 2,900 kilometers thick", big: "2,900 km", caption: "The mantle: the thickest layer, hot rock that flows slowly" },
          { at: "the outer core", emoji: "🌀🧭", caption: "Swirling liquid metal in the outer core makes Earth's magnetic field" },
          { at: "the inner core", emoji: "⚪🔥", caption: "The inner core: solid metal, about as hot as the Sun's surface" },
        ],
      },
      {
        show: [
          { emoji: "🥚🧩", caption: "Earth's rigid outer shell is cracked into plates" },
          { at: "seven major tectonic plates", photo: "Plate tectonics", caption: "Earth's major tectonic plates" },
          { at: "a few centimeters a year", emoji: "💅🐌", caption: "Plates move about as fast as your fingernails grow" },
          { at: "Mesosaurus", photo: "Mesosaurus", caption: "Mesosaurus fossils turn up in both South America and Africa" },
          { at: "maps of the ocean floor", emoji: "🌊🗺️", caption: "Ocean-floor maps revealed ridges where new crust forms" },
        ],
      },
      {
        show: [
          { emoji: "↔️", caption: "Three kinds of boundaries: apart, together, sideways" },
          { at: "Iceland sits right on top", photo: "Þingvellir", caption: "Thingvellir, Iceland, where two plates pull apart" },
          { at: "the Himalayas", photo: "Mount Everest", caption: "Mount Everest, in the Himalayas, which are still rising" },
          { at: "a process called subduction", big: "Subduction", caption: "A heavy ocean plate sinks down into the mantle" },
          { at: "San Andreas Fault", photo: "San Andreas Fault", caption: "The San Andreas Fault, where plates grind sideways" },
        ],
      },
      {
        show: [
          { emoji: "🪨🔒", caption: "Rough rocks lock together while the plates keep pushing" },
          { at: "the ground shakes", emoji: "〰️📈", caption: "Seismic waves race outward and the ground shakes" },
          { at: "seismometers", photo: "Seismometer", caption: "A seismograph draws the wiggly lines of earthquake waves" },
          { at: "10 times more ground shaking", big: "×10", caption: "Each step up in magnitude: about 10 times more shaking" },
          { at: "Ring of Fire", photo: "Mount Fuji", caption: "Mount Fuji in Japan, a volcano on the Pacific Ring of Fire" },
        ],
      },
    ],
  },

  "science.electricity": {
    hook: {
      show: [
        { big: "1820", caption: "Copenhagen, 1820: a professor shows students an electric current" },
        { at: "Hans Christian Ørsted", photo: "Hans Christian Ørsted", caption: "Hans Christian Ørsted, Danish physicist and chemist" },
        { at: "A compass happened", photo: "Compass", caption: "A compass needle normally points north" },
        { at: "hidden link", emoji: "⚡🔗🧲", caption: "Electricity and magnetism are linked" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⚛️⚡", caption: "Electrons are tiny particles that carry electric charge" },
          { at: "that flow is an electric current", emoji: "➡️➡️➡️", caption: "Electrons drifting one way: an electric current" },
          { at: "1.5 volts", big: "1.5 V", caption: "The push of one flashlight battery" },
          { at: "called a circuit", photo: "Incandescent light bulb", caption: "A bulb lights only when the circuit is a complete loop" },
          { at: "An open circuit", emoji: "✂️💡", caption: "A break anywhere in the loop, and nothing flows" },
        ],
      },
      {
        show: [
          { emoji: "📿", caption: "Series: everything on one path, like beads on a string" },
          { at: "all the bulbs go dark", emoji: "💡💡⚫", caption: "One bulb out in series, and they all go dark" },
          { at: "In a parallel circuit", emoji: "🔀💡", caption: "Parallel: each bulb gets its own branch" },
          { at: "a house are wired in parallel", emoji: "🏠💡", caption: "Homes are wired in parallel, so lights work on their own" },
          { at: "their volts add up", big: "1.5 + 1.5 = 3 V", caption: "Batteries in series add their volts" },
        ],
      },
      {
        show: [
          { photo: "File:Stranded lamp wire.jpg", caption: "Copper wire inside, plastic insulation outside" },
          { at: "Conductors let electrons move freely", emoji: "🥄⚡✅", caption: "Conductors: most metals let current flow" },
          { at: "Insulators hold their electrons tightly", emoji: "🧤⚡❌", caption: "Insulators: rubber, plastic, glass and dry wood block current" },
          { at: "Water is tricky", emoji: "💧⚠️", caption: "Tap water conducts, so keep electricity away from water" },
          { at: "bathtubs and pools", big: "Dry hands only", caption: "Never touch switches or plugs with wet hands" },
        ],
      },
      {
        show: [
          { photo: "Horseshoe magnet", caption: "Every magnet has a north pole and a south pole" },
          { at: "Opposite poles attract", big: "N→←S   ←N N→", caption: "Opposites attract; like poles repel" },
          { at: "a compass needle points north", emoji: "🌍🧭", caption: "Earth itself acts like a giant magnet" },
          { at: "it becomes an electromagnet", photo: "File:Electromagnet.jpg", caption: "An old electromagnet: coils of copper wire around an iron core" },
          { at: "Michael Faraday", photo: "Michael Faraday", caption: "Michael Faraday showed that a moving magnet makes a current" },
        ],
      },
    ],
  },
};
