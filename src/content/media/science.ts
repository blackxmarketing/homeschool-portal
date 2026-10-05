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
        show: [
          { emoji: "❓🔬", caption: "Good science begins with a question you can actually test" },
          { at: "warm water dissolve sugar", photo: "Sugar", caption: "Sugar crystals: will they disappear faster in warm water?" },
          { at: "A hypothesis is your", big: "Hypothesis", caption: "A testable prediction, often written as an if-then sentence" },
          { at: "if I stir sugar", emoji: "☕🥄⏱️", caption: "If warm water, then faster dissolving, because the molecules move faster" },
          { at: "is an opinion", emoji: "😋🚫📏", caption: "No ruler or stopwatch can measure 'delicious', so it's not testable" },
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
      },
      {
        show: [
          { emoji: "⚖️☝️", caption: "A fair test changes just ONE thing at a time" },
          { at: "paper towel brands", photo: "Paper towel", caption: "Which towel soaks up more? Only a fair test can tell" },
          { at: "Was it the brand or the size?", emoji: "🤔❓", caption: "Two changes at once, so you can't tell which one mattered" },
          { at: "Redi's experiment worked", photo: "Francesco Redi", caption: "Redi kept everything the same except the cover on each jar" },
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
};
