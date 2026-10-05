import type { CourseMedia } from "./types";

/** Slides and videos for the science-hs lessons, keyed by lesson id. */
export const scienceHsMedia: CourseMedia = {
  "science-hs.experiments": {
    hook: {
      show: [
        { big: "1747", caption: "1747: scurvy was one of the deadliest dangers of long sea voyages" },
        { at: "James Lind", photo: "James Lind", caption: "James Lind, a Scottish naval surgeon who decided to test the cures" },
        { at: "six pairs", emoji: "⛵👥👥👥👥👥👥", caption: "Twelve sick sailors, six pairs, six different remedies" },
        { at: "oranges and lemons", photo: "Orange (fruit)", caption: "One pair got two oranges and a lemon every day" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎛️🔬", caption: "Change one factor on purpose and measure what happens" },
          { at: "control group", emoji: "🧪🆚🧪", caption: "Control group: the baseline you compare the treatment against" },
          { at: "placebo", emoji: "💊❔", caption: "A placebo looks like the treatment but has no active ingredient" },
          { at: "double-blind study", emoji: "🙈🙈", caption: "Double-blind: neither subjects nor measurers know the groups" },
          { at: "Lind had no placebo", emoji: "🍋⚓", caption: "Lind kept diet and quarters the same, so only the remedy differed" },
        ],
      },
      {
        show: [
          { big: "2 per group", caption: "Lind tested only two sailors per remedy, a tiny sample" },
          { at: "Larger samples", emoji: "👤👤➡️👥👥👥👥", caption: "More subjects means chance has less power over the average" },
          { at: "random assignment", photo: "Coin flipping", caption: "A coin flip picks each group, so hidden differences even out" },
          { at: "replication", emoji: "🔁🔬", caption: "Replication: another team repeats the test to check it" },
        ],
      },
      {
        show: [
          { emoji: "📊", caption: "Repeated trials never match exactly, so we summarize them" },
          { at: "The mean is", big: "Σ ÷ n", caption: "Mean: add the values and divide by how many there are" },
          { at: "pendulum", photo: "Pendulum", caption: "A pendulum's swing time: a classic repeated measurement" },
          { at: "The sum is 10.00", big: "10.00 ÷ 5 = 2.00 s", caption: "Five trials add to 10.00 s, so the mean is 2.00 s" },
          { at: "outlier", emoji: "📍❗", caption: "Outliers: investigate and report them, never just erase them" },
        ],
      },
      {
        show: [
          { emoji: "📏❓", caption: "Every measurement carries some error" },
          { at: "Systematic error", photo: "Weighing scale", caption: "A balance or scale that is always off by the same amount: systematic error" },
          { at: "percent error", big: "|meas − acc| ÷ acc × 100", caption: "Percent error compares your result with the accepted value" },
          { at: "Accuracy means", emoji: "🎯", caption: "Accuracy: close to the truth. Precision: trials agree" },
          { at: "a correlation", emoji: "🍦☀️🔥", caption: "Ice cream and sunburns rise together, but sunshine causes both" },
        ],
      },
    ],
  },

  "science-hs.newton": {
    hook: {
      show: [
        { big: "1665", caption: "1665: plague closes the University of Cambridge" },
        { at: "Isaac Newton", photo: "Isaac Newton", caption: "Isaac Newton, mathematician and physicist" },
        { at: "Woolsthorpe", photo: "Woolsthorpe Manor", caption: "Woolsthorpe Manor, Newton's family farmhouse, and its old apple tree" },
        { at: "the Principia", photo: "Philosophiæ Naturalis Principia Mathematica", caption: "The Principia (1687): Newton's laws of motion and gravity" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🛑➡️", caption: "First law: motion stays the same unless a net force acts" },
          { at: "inertia", big: "Inertia", caption: "Resistance to any change in motion; more mass, more inertia" },
          { at: "A 30 newton push", emoji: "👉📦👈", caption: "30 N right and 30 N left: zero net force" },
          { at: "W = mg", big: "W = mg", caption: "Weight is mass times g, about 9.8 m/s² on Earth" },
          { at: "490 newtons", photo: "File:Aldrin Apollo 11 original.jpg", caption: "On the Moon g is only 1.62 m/s²: same mass, far less weight" },
        ],
      },
      {
        show: [
          { big: "F = ma", caption: "Net force equals mass times acceleration" },
          { at: "1 N = 1 kg", big: "1 N = 1 kg·m/s²", caption: "One newton speeds up 1 kg by 1 m/s every second" },
          { at: "Double the net force", emoji: "💪💪➡️⚡⚡", caption: "Twice the force, twice the acceleration" },
          { at: "Double the mass", emoji: "🛒🛒🐢", caption: "Twice the mass, half the acceleration" },
          { at: "60 kilogram crate", big: "300 N ÷ 60 kg = 5 m/s²", caption: "Net force: 500 − 200 = 300 N, then divide by the mass" },
        ],
      },
      {
        show: [
          { emoji: "↔️", caption: "Third law: every force has an equal and opposite partner" },
          { at: "different objects", emoji: "🧍➡️🧱", caption: "The pair acts on two different objects, so they never cancel" },
          { at: "When you jump", emoji: "🦘⬆️🌍", caption: "Your feet push Earth down; Earth pushes you up" },
          { at: "A rocket in space", photo: "Saturn V", caption: "Saturn V: exhaust blasts down, and the rocket is pushed up" },
          { at: "Earth's enormous mass", big: "6 × 10²⁴ kg", caption: "Earth's mass is so huge that its acceleration is far too tiny to notice" },
        ],
      },
      {
        show: [
          { big: "p = mv", caption: "Momentum: mass times velocity, in kg·m/s" },
          { at: "1,500 kilogram car", emoji: "🚗🆚⚾", caption: "Car: 30,000 kg·m/s. Fast baseball: only 6 kg·m/s" },
          { at: "is conserved", photo: "Newton's cradle", caption: "Newton's cradle passes momentum from ball to ball" },
          { at: "Example: a 2 kilogram cart", big: "6 ÷ 3 = 2 m/s", caption: "6 kg·m/s before, shared by 3 kg after: 2 m/s" },
        ],
      },
    ],
  },

  "science-hs.energy": {
    hook: {
      show: [
        { big: "1840s", caption: "England in the 1840s: what really is heat?" },
        { at: "James Prescott Joule", photo: "James Prescott Joule", caption: "James Prescott Joule, the careful experimenter from Salford" },
        { at: "paddle wheel", photo: "File:Joule's Apparatus (Harper's Scan).png", caption: "Joule's apparatus: falling weights spin a paddle in water" },
        { at: "called the joule", big: "1 J = 1 N × 1 m", caption: "One joule: one newton pushing through one meter" },
      ],
    },
    teach: [
      {
        show: [
          { big: "W = Fd", caption: "Work: force times distance in the direction of the force" },
          { at: "50 newtons for 12 meters", big: "50 N × 12 m = 600 J", caption: "Push 50 N for 12 m and you do 600 joules of work" },
          { at: "holding the suitcase still", emoji: "🧳😓0️⃣", caption: "Holding still: tired arms, but zero work on the suitcase" },
          { at: "Simple machines", photo: "Lever", caption: "A lever trades a smaller force for a longer distance" },
        ],
      },
      {
        show: [
          { emoji: "⚡", caption: "Energy: the ability to do work, measured in joules" },
          { at: "KE = ½mv²", big: "KE = ½mv²", caption: "Kinetic energy: the energy of motion" },
          { at: "four times", emoji: "🚗💨✖️4️⃣", caption: "Double the speed, four times the kinetic energy" },
          { at: "PE = mgh", big: "PE = mgh", caption: "Height stores energy: mass × g × height" },
          { at: "elastic energy", emoji: "🏹🍞🔋", caption: "Stored energy: a drawn bow, food, fuel and batteries" },
        ],
      },
      {
        show: [
          { big: "Energy is conserved", caption: "Energy changes form, but the total never changes" },
          { at: "roller coaster", photo: "Roller coaster", caption: "At the top: potential energy. On the way down: kinetic" },
          { at: "mgh = ½mv²", big: "v = √(2gh)", caption: "Set PE lost equal to KE gained, and the mass cancels" },
          { at: "19.8 meters per second", emoji: "🎢💨", caption: "From 20 m: about 19.8 m/s, full car or empty" },
          { at: "thermal energy", emoji: "🔥🔊", caption: "Friction turns some energy into heat and sound, never into nothing" },
        ],
      },
      {
        show: [
          { emoji: "🏃🪜🚶", caption: "Same stairs, same work, but very different power" },
          { at: "P = W ÷ t", big: "P = W ÷ t", caption: "Power is work per second, measured in watts" },
          { at: "James Watt", photo: "James Watt", caption: "James Watt, the Scottish engineer who improved the steam engine" },
          { at: "horsepower", big: "1 hp ≈ 746 W", caption: "Watt rated engines in horsepower to compare them with horses" },
          { at: "Efficiency is", emoji: "💡🔥", caption: "Efficiency: useful energy out ÷ energy in × 100%" },
        ],
      },
    ],
  },

  "science-hs.atoms": {
    hook: {
      show: [
        { big: "1869", caption: "1869: a chemistry professor sorts the known elements" },
        { at: "Dmitri Mendeleev", photo: "Dmitri Mendeleev", caption: "Dmitri Mendeleev, the Russian chemist behind the periodic table" },
        { at: "left empty spaces", emoji: "⬜❓⬜", caption: "Gaps left for elements nobody had found yet" },
        { at: "gallium", photo: "Gallium", caption: "Gallium, found in 1875, melts at about 30 °C" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Atom", caption: "Every atom: a tiny nucleus with electrons all around it" },
          { at: "football stadium", emoji: "🏟️🟢", caption: "If an atom were a stadium, its nucleus would be a pea" },
          { at: "atomic number", big: "6 protons = carbon", caption: "The number of protons, the atomic number, names the element" },
          { at: "isotopes", big: "¹²C and ¹⁴C", caption: "Isotopes: same protons, different numbers of neutrons" },
          { at: "nearly 2,000 times lighter", emoji: "⚖️", caption: "Almost all of an atom's mass sits in the nucleus" },
        ],
      },
      {
        show: [
          { photo: "Periodic table", caption: "The modern periodic table, in order of atomic number" },
          { at: "Henry Moseley", big: "1913", caption: "1913: Henry Moseley orders the elements by atomic number" },
          { at: "valence electrons", emoji: "🔵🔵⚪", caption: "Valence electrons: the outer ones that do the bonding" },
          { at: "alkali metals", emoji: "💥💧", caption: "Alkali metals like sodium react violently with water" },
          { at: "noble gases", emoji: "💡😴", caption: "Noble gases like neon have full shells and rarely react" },
        ],
      },
      {
        show: [
          { big: "8", caption: "The octet rule: atoms tend toward 8 outer electrons" },
          { at: "Sodium gives its electron", emoji: "Na ➡️ e⁻ ➡️ Cl", caption: "Sodium hands its one valence electron to chlorine" },
          { at: "crystal lattice", photo: "Halite", caption: "Halite, natural rock salt, often grows in cube-shaped crystals" },
          { at: "MgCl₂", big: "Mg²⁺ + 2 Cl⁻ → MgCl₂", caption: "The charges in a formula must balance to zero" },
          { at: "conduct electricity", emoji: "🧂💧⚡", caption: "Dissolved salt conducts electricity because its ions can move" },
        ],
      },
      {
        show: [
          { emoji: "🤝", caption: "Covalent bond: two nonmetals share a pair of electrons" },
          { at: "H₂O", photo: "Properties of water", caption: "A water molecule: oxygen shares electrons with two hydrogens" },
          { at: "methane, CH₄", emoji: "⚫➕⚪⚪⚪⚪", caption: "Carbon makes four bonds, the backbone of living things" },
          { at: "triple bond", big: "N≡N", caption: "Nitrogen gas: a triple bond, three shared pairs" },
          { at: "molar mass", big: "H₂O = 18 g/mol", caption: "Molar mass: add up the atomic masses" },
        ],
      },
    ],
  },

  "science-hs.genetics": {
    hook: {
      show: [
        { photo: "Gregor Mendel", caption: "Gregor Mendel, the monk who counted his way to the rules of heredity" },
        { at: "pea plants", photo: "Pea", caption: "Garden peas: easy to grow, cross and count" },
        { at: "flower color", emoji: "🟣⚪🟢", caption: "Purple or white flowers, round or wrinkled seeds" },
        { at: "in 1900", big: "1866 → 1900", caption: "Published in 1866, rediscovered in 1900" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧬", caption: "DNA: the instruction molecule inside every living cell" },
          { at: "double helix", photo: "DNA", caption: "The double helix: a ladder twisted into a spiral" },
          { at: "A always pairs with T", big: "A–T   C–G", caption: "The pairing rule never changes" },
          { at: "Erwin Chargaff", big: "A = T, C = G", caption: "Chargaff found equal amounts of A and T, and of C and G" },
          { at: "In 1953", photo: "Photo 51", caption: "Photo 51, an X-ray image of DNA from Rosalind Franklin's lab" },
        ],
      },
      {
        show: [
          { emoji: "🧬📜", caption: "A gene: a stretch of DNA that codes for a protein" },
          { at: "arranged along chromosomes", photo: "Chromosome", caption: "Chromosomes: long, tightly packed strands of DNA" },
          { at: "46 chromosomes", big: "46 = 23 pairs", caption: "Human body cells: 23 pairs, one of each pair from each parent" },
          { at: "called alleles", emoji: "🟣⚪", caption: "Alleles: versions of a gene, like purple or white" },
          { at: "is the phenotype", emoji: "👀🌸", caption: "Phenotype: the trait you can actually see" },
        ],
      },
      {
        show: [
          { emoji: "🟣✖️⚪", caption: "Purple × white: two true-breeding parents" },
          { at: "the F1", emoji: "🟣🟣🟣🟣", caption: "F1: every plant purple. White seems to vanish" },
          { at: "the F2", photo: "Mendelian inheritance", caption: "The pattern: a hidden recessive trait returns in the next generation" },
          { at: "705 purple", big: "705 : 224 ≈ 3 : 1", caption: "Mendel's real flower counts: about 3 purple to 1 white" },
          { at: "pollen grain", emoji: "🎲", caption: "Each parent passes on one factor, chosen by chance" },
        ],
      },
      {
        show: [
          { big: "Pp × Pp", caption: "A Punnett square: one parent across the top, one down the side" },
          { at: "the four boxes are", big: "PP Pp Pp pp", caption: "Pp × Pp: one PP, two Pp, one pp" },
          { at: "1 : 2 : 1", big: "3 : 1", caption: "Genotypes 1 : 2 : 1, phenotypes 3 purple : 1 white" },
          { at: "test cross", emoji: "🟣❓✖️⚪", caption: "Test cross: breed with pp to reveal a hidden allele" },
          { at: "coin flips", emoji: "🪙🪙", caption: "Probabilities, like coins: small samples can stray" },
        ],
      },
    ],
  },
};
