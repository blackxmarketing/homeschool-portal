import { k5Course } from "./base";

/**
 * sci-5: Grade 5 science (NGSS). Seven lessons through the year: matter is
 * made of particles; mixing, changing and weighing matter; plants, food
 * energy and ecosystems; Earth's four spheres and its water; gravity (with a
 * fair-test parachute drop); the Sun, shadows and stars; and protecting
 * Earth's resources with the engineering design process.
 */
export const sci5 = k5Course("sci", 5, [
  // 1. Matter is made of particles; properties of materials
  {
    id: "sci-5.particles",
    title: "Tiny Particles, Big Clues",
    minutes: 30,
    stage: "grammar",
    standards: ["5-PS1-1", "5-PS1-3"],
    read: [
      "Stir a spoonful of sugar into a glass of warm water. In a minute, the sugar seems to vanish. But take a sip, and the water tastes sweet. The sugar is still there. It has broken apart into pieces far too small to see.",
      "All matter is made of tiny particles. They are so small that hundreds of thousands of them could line up across the dot at the end of this sentence. No one can see them with bare eyes, but scientists can see what the particles do, and that is strong evidence that they are there.",
      "Air is a good example. You cannot see the gas particles in air, but pump air into a flat ball and the ball gets firm, and a little heavier on a scale. Gas particles are spread far apart and zoom around, bumping into the walls of the ball. When bread bakes in the kitchen, you can smell it in the next room, because tiny particles from the bread drift through the air to your nose.",
      "Every material has properties you can observe and measure. You can measure its mass with a scale and its volume with a measuring cup. You can test whether it is hard, whether a magnet pulls on it, whether it lets heat or electricity pass through, whether it dissolves in water and whether it reflects light.",
      "Scientists use these properties like detectives use clues. Two white powders, like sugar and baking soda, may look exactly alike. But drop a little vinegar on each, and only the baking soda fizzes. Careful tests can tell one material from another, even when your eyes cannot.",
    ].join("\n\n"),
    keyIdeas: [
      "All matter is made of particles far too small to see.",
      "We know gas particles are there because air takes up space, has weight and carries smells.",
      "Materials can be identified by measuring and testing their properties: hardness, magnetism, conductivity, solubility, reflectivity, mass and volume.",
    ],
    hook: {
      text: "Drop a spoonful of sugar into warm water and stir. Watch closely. The sugar disappears! Is it gone for good? Take a sip and your tongue says no. So where is the sugar hiding? What do you notice?",
    },
    teach: [
      {
        title: "Too Small to See",
        teach:
          "All matter is made of tiny particles, far too small to see, even with a magnifying glass. When sugar dissolves in water, the sugar crystals break apart into particles so small they spread out between the water particles. The water looks clear, but the sweet taste tells us the sugar is still there. Here is another clue. Put one drop of food coloring into a glass of still water. Without any stirring, the color slowly spreads until the whole glass is tinted. Tiny, always-moving particles carry it everywhere. We can't see particles, but we can see what they do.",
        visual: {
          type: "flip",
          cards: [
            { front: "Particle", back: "A tiny piece of matter, far too small to see. All matter is made of particles." },
            { front: "Dissolve", back: "When a solid breaks apart into particles that spread evenly through a liquid, like sugar in water." },
            { front: "Evidence", back: "Something you can observe that shows an idea is true, like the sweet taste of clear sugar water." },
            { front: "Model", back: "A drawing or object that helps us picture something too small, too big or too far away to see." },
          ],
        },
        probe: {
          type: "cloze",
          text: "When sugar {0} in water, it breaks into tiny {1} that are too small to see. The sweet {2} is evidence that the sugar is still there.",
          blanks: [{ answers: ["dissolves"] }, { answers: ["particles"] }, { answers: ["taste"] }],
          bank: ["dissolves", "particles", "taste", "melts", "color", "magnets"],
          hint: "Think about what happens to sugar in water, what matter is made of, and which sense tells you the sugar is still there.",
          mistakes: [
            { match: "melts", coach: "Melting needs heat and turns a solid into a liquid by itself. Sugar in water dissolves: it breaks apart and mixes in." },
            { match: "color", coach: "Sugar water is clear, so color gives no clue. Which sense tells you the sugar is there?" },
          ],
          seconds: 35,
        },
        think: {
          q: "Sugar stirred into water disappears from sight. What really happened to it?",
          choices: ["It was destroyed", "It broke into particles too small to see", "It turned into air", "It sank and hid under the cup"],
          answer: 1,
          why: "The sugar broke apart into tiny particles that spread through the water. The sweet taste proves it is still there.",
          hints: [
            "If the sugar were destroyed, the water would not taste sweet. Taste it!",
            "",
            "No bubbles rose out of the cup, and the sweetness stays in the water.",
            "Look at the bottom of the cup after stirring. The sugar is not sitting there.",
          ],
        },
        approaches: {
          analogy:
            "Picture a sandcastle. From far away it looks like one solid shape, but up close it is made of millions of tiny grains. When a wave washes it away, the grains are still there, just spread out. Dissolved sugar is like that, only its pieces are far smaller than sand.",
          example:
            "Put 1 cup of warm water in a clear glass. Stir in 1 spoonful of sugar. After a minute you can't see any sugar, but a sip tastes sweet, and if you let a little of the water dry on a plate for a few days, sugar crystals are left behind.",
          simpler: {
            q: "Can you see the sugar after it dissolves in water?",
            choices: ["No, the pieces are too small to see", "Yes, it floats on top like ice"],
            answer: 0,
            why: "Dissolved sugar breaks into particles too small to see.",
            hints: ["", "Look at a glass of sugar water. It is clear, with nothing floating on top."],
          },
        },
      },
      {
        title: "Gas Is Made of Particles Too",
        teach:
          "Air is matter, even though you can't see it. Here is the evidence. Weigh a flat ball on a kitchen scale. Then pump it full of air and weigh it again. It weighs a few grams more, because the air you pumped in has weight. Gas particles are spread far apart and zoom in every direction. They bump into the inside of the ball and push it out, which makes the ball firm. Smells are evidence too. When someone peels an orange across the room, particles from the orange drift through the air until they reach your nose.",
        visual: {
          type: "hotspots",
          title: "Evidence that air is made of particles",
          center: "Air",
          spots: [
            { label: "Ball gets heavier", icon: "⚽", detail: "Pump air into a flat ball and it weighs a few grams more. Air has weight." },
            { label: "Ball gets firm", icon: "💪", detail: "Gas particles bump the inside walls of the ball and push them outward." },
            { label: "Smells travel", icon: "🍊", detail: "Particles from an orange drift through the air until they reach your nose." },
            { label: "Balloon fills", icon: "🎈", detail: "Air takes up space. Blow into a balloon and the particles stretch it out." },
          ],
        },
        probe: {
          type: "number",
          prompt: "A flat ball weighs 410 grams. After you pump it full of air, it weighs 416 grams. How many grams of air did you pump in?",
          answer: 6,
          unit: "grams",
          hint: "The extra weight is the air. Subtract the flat ball's weight from the full ball's weight.",
          mistakes: [
            { match: "826", coach: "You added the two weights. Subtract instead: full ball minus flat ball." },
            { match: "0", coach: "Air does have weight! The scale went up by a few grams. Subtract to find how many." },
          ],
          seconds: 25,
        },
        think: {
          q: "Why does a ball get firm when you pump air into it?",
          choices: ["The rubber gets thicker", "Air particles push on the inside of the ball", "Air is lighter than nothing", "The pump adds heat only"],
          answer: 1,
          why: "Gas particles zoom around and bump into the inside of the ball, pushing it outward.",
          hints: [
            "The rubber stays the same thickness. Something inside is pushing on it.",
            "",
            "Air is matter, so it has weight. The scale shows the full ball is heavier.",
            "Pumping can warm the ball a little, but the firmness comes from all the particles you pushed inside.",
          ],
        },
        approaches: {
          analogy:
            "Think of a bounce house full of kids jumping around. All that bumping pushes the walls out and keeps them tight. Air particles in a ball do the same thing, only there are trillions of them and they are far too small to see.",
          example:
            "A flat ball weighs 400 grams. Pumped full, it weighs 405 grams. 405 - 400 = 5, so about 5 grams of air went in. You couldn't see the air, but the scale could measure it.",
          simpler: {
            q: "Does air have weight?",
            choices: ["No, air is just empty space", "Yes, a full ball weighs more than a flat one"],
            answer: 1,
            why: "A ball pumped full of air weighs more than the same ball flat.",
            hints: ["If air were empty space, a ball would weigh the same flat or full. The scale says it doesn't.", ""],
          },
        },
      },
      {
        title: "Measuring Properties",
        teach:
          "A property is something about a material you can observe or measure. Mass is how much matter is in something, measured in grams with a scale. Volume is how much space it takes up, measured in milliliters with a measuring cup. Hardness tells if it scratches easily. You can test whether a magnet pulls on it. Some materials are conductors, which means heat or electricity passes through them easily, like a metal spoon. Others are insulators, like wood or plastic. Solubility tells whether it dissolves in water. Reflectivity tells whether it is shiny. Each property needs the right test or tool.",
        visual: {
          type: "compare",
          left: { title: "Measure it (with a number)", points: ["Mass: grams, on a scale", "Volume: milliliters, in a measuring cup", "Temperature: degrees, with a thermometer", "Length: centimeters, with a ruler"] },
          right: { title: "Test it (yes or no, more or less)", points: ["Magnetism: does a magnet pull it?", "Conductivity: does heat or electricity pass through?", "Solubility: does it dissolve in water?", "Hardness: does it scratch easily?", "Reflectivity: is it shiny?"] },
        },
        probe: {
          type: "match",
          prompt: "Match each property to the tool or test you would use.",
          pairs: [
            { left: "Mass", right: "A scale" },
            { left: "Volume of a liquid", right: "A measuring cup" },
            { left: "Magnetism", right: "Hold a magnet near it" },
            { left: "Solubility", right: "Stir it into water" },
            { left: "Conductivity", right: "Try it in a battery-and-bulb circuit" },
          ],
          hint: "Ask what each property is about: how much matter, how much space, a magnet's pull, dissolving, or letting electricity through.",
          seconds: 45,
        },
        think: {
          q: "Which tool would you use to measure an object's mass?",
          choices: ["A ruler", "A thermometer", "A scale", "A magnet"],
          answer: 2,
          why: "Mass is measured in grams on a scale.",
          hints: [
            "A ruler measures length, not how much matter is inside.",
            "A thermometer measures how hot or cold something is.",
            "",
            "A magnet tests magnetism. It can't tell you how much matter there is.",
          ],
        },
        approaches: {
          analogy:
            "Properties are like a description on a wanted poster: height, hair color, a scar on the left hand. Each clue alone could fit many people, but together they point to just one. Material properties work the same way.",
          example:
            "Test a paper clip: a magnet pulls it, it lights a bulb in a battery circuit, it does not dissolve in water, and it is shiny. Those four results tell you it is a metal that contains iron.",
          simpler: {
            q: "Volume tells you...",
            choices: ["How much space something takes up", "How heavy something is", "What color something is"],
            answer: 0,
            why: "Volume is the amount of space something takes up.",
            hints: ["", "How heavy something is depends on its mass. Volume is about space.", "Color is a property you see, but it is not volume."],
          },
        },
      },
      {
        title: "Material Detectives",
        teach:
          "Scientists identify materials by testing several properties, not just one. Imagine three mystery white powders: sugar, salt and baking soda. They look almost the same. Test one: add a few drops of vinegar. Only baking soda fizzes. Test two: look with a magnifying glass. Salt crystals are little cubes. Sugar crystals are not cube-shaped, and baking soda is a fine powder with no clear crystals. Test three: heat a little of each in a pan with a grown-up. Sugar melts and turns brown, but salt does not change. After three tests, every powder has a name. Never taste a mystery powder in a lab. Scientists test with tools and their eyes, not their tongues.",
        visual: {
          type: "hotspots",
          title: "Three mystery powders",
          center: "🔍",
          spots: [
            { label: "Sugar", icon: "🍬", detail: "Does not fizz with vinegar. Crystals are not cube-shaped. Melts and turns brown when heated." },
            { label: "Salt", icon: "🧂", detail: "Does not fizz with vinegar. Crystals are tiny cubes. Does not melt in a kitchen pan." },
            { label: "Baking soda", icon: "🧁", detail: "A fine powder with no clear crystals. Fizzes and bubbles when vinegar is added." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Your test results are in. Sort each result under the powder it matches.",
          buckets: ["Salt", "Baking soda"],
          items: [
            { text: "Fizzes when vinegar is added", bucket: 1 },
            { text: "Crystals look like tiny cubes", bucket: 0 },
            { text: "A fine powder with no clear crystals", bucket: 1 },
            { text: "Does not fizz, and does not melt when heated", bucket: 0 },
          ],
          hint: "Only baking soda fizzes with vinegar, and it is a fine powder. Salt has cube-shaped crystals and doesn't melt in a pan.",
          seconds: 35,
        },
        think: {
          q: "Two white powders look the same. Which test tells baking soda from salt?",
          choices: ["Look at their color", "Add a few drops of vinegar", "Smell them from far away", "Weigh one spoonful"],
          answer: 1,
          why: "Baking soda fizzes with vinegar. Salt does not.",
          hints: [
            "Both powders are white, so color can't tell them apart.",
            "",
            "Neither has much of a smell, so smelling won't help.",
            "A spoonful of each weighs about the same, so weighing alone won't tell you.",
          ],
        },
        approaches: {
          analogy:
            "It's like guessing a mystery fruit with your eyes closed. Round could be an orange or an apple. Bumpy skin narrows it down. A citrus smell settles it. One clue rarely solves the case, but several together do.",
          example:
            "Powder A has cube-shaped crystals and no fizz: salt. Powder B has no cubes, no fizz, and melts brown when heated: sugar. Powder C is a fine powder that fizzes with vinegar: baking soda.",
          simpler: {
            q: "Which powder fizzes when you add vinegar?",
            choices: ["Salt", "Baking soda"],
            answer: 1,
            why: "Baking soda fizzes and bubbles when vinegar is added.",
            hints: ["Salt just sits there in vinegar. Try the other one.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it evidence that matter is made of tiny particles, or not?",
      buckets: ["Evidence of tiny particles", "Not evidence of particles"],
      items: [
        { text: "Clear sugar water still tastes sweet", bucket: 0 },
        { text: "You smell cookies baking from another room", bucket: 0 },
        { text: "A ball pumped full of air weighs more", bucket: 0 },
        { text: "A drop of food coloring slowly spreads through still water", bucket: 0 },
        { text: "A rock is gray", bucket: 1 },
        { text: "A ruler is 30 centimeters long", bucket: 1 },
        { text: "A ball rolls down a hill", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Your little cousin says air is nothing, because you can't see it. Explain how you know air is made of particles.",
      keyPoints: [
        "All matter is made of particles too small to see",
        "A ball pumped full of air weighs more, so air has weight",
        "Air particles push on the inside of a ball or balloon",
        "Smells travel through the air to your nose",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "All matter is made of tiny {0}. Air is matter because a ball full of air has more {1} than a flat ball.",
        blanks: [{ answers: ["particles"] }, { answers: ["mass", "weight"] }],
        bank: ["particles", "mass", "color", "light", "rocks"],
        hint: "What is all matter made of? And what does the scale show when you add air?",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "An empty jar has a mass of 250 grams. Filled with sand, its mass is 730 grams. What is the mass of the sand?",
        answer: 480,
        unit: "grams",
        hint: "Subtract the empty jar's mass from the full jar's mass.",
        mistakes: [{ match: "980", coach: "That adds the two. The sand is the difference: 730 - 250." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each property to what it means.",
        pairs: [
          { left: "Solubility", right: "Whether it dissolves in water" },
          { left: "Conductivity", right: "Whether heat or electricity passes through it" },
          { left: "Reflectivity", right: "Whether it is shiny" },
          { left: "Volume", right: "How much space it takes up" },
        ],
        hint: "Solu- sounds like solution, conduct means to carry, reflect means to bounce light back.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Sort these materials: would a magnet pull on it?",
        buckets: ["A magnet pulls it", "A magnet does not pull it"],
        items: [
          { text: "Iron nail", bucket: 0 },
          { text: "Steel paper clip", bucket: 0 },
          { text: "Wooden pencil", bucket: 1 },
          { text: "Glass marble", bucket: 1 },
          { text: "Plastic spoon", bucket: 1 },
          { text: "Aluminum foil", bucket: 1 },
        ],
        hint: "Magnets pull on iron and steel (steel is mostly iron). Most other materials, even some metals like aluminum, are not pulled.",
        mistakes: [{ match: "Aluminum foil", coach: "Aluminum is a metal, but a magnet does not pull on it. Try it at home!" }],
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is all matter made of?",
        choices: ["Water", "Tiny particles too small to see", "Light", "Air only"],
        answer: 1,
        why: "All matter, from rocks to air, is made of tiny particles too small to see.",
      },
      {
        q: "A ball pumped full of air weighs more than the same ball when flat. What does this show?",
        choices: ["Air has weight, so it is matter", "Balls grow when pumped", "Scales are not accurate", "Air is lighter than nothing"],
        answer: 0,
        why: "The extra weight is the air. Things with weight are matter.",
      },
      {
        q: "Which property does a magnet test?",
        choices: ["Solubility", "Volume", "Magnetism", "Reflectivity"],
        answer: 2,
        why: "A magnet tests magnetism: whether the magnet pulls on the material.",
      },
      {
        q: "Why should scientists test several properties to identify a material?",
        choices: ["Because tests are fun", "Because one property alone can fit many materials", "Because the first test is always wrong", "Because materials change every day"],
        answer: 1,
        why: "Many materials share one property, like being white. Several clues together point to one material.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, become a material detective. Collect 5 small things (for example a paper clip, a coin, a pencil, a plastic spoon and a piece of foil). For each one, test three properties: does a magnet pull it, does it sink or float, and is it shiny? Record your results in a table, then write one sentence about which things were hardest to tell apart.",
      rubric: [
        "Tested at least 5 objects",
        "Tested three properties for each object",
        "Recorded results neatly in a table",
        "Wrote a sentence about which objects were hard to tell apart and why",
      ],
    },
  },

  // 2. Mixtures, new substances and conservation of mass
  {
    id: "sci-5.mixing",
    title: "Mix It, Melt It, Weigh It",
    minutes: 30,
    stage: "logic",
    standards: ["5-PS1-2", "5-PS1-4", "5-PS1-3"],
    read: [
      "When you mix substances together, two different things can happen. Sometimes you just get a mixture. In a mixture, each substance keeps its own properties, and you can separate them again. Iron filings mixed with sand can be pulled out with a magnet. Salt dissolved in water can be separated by letting the water evaporate, which leaves the salt behind.",
      "Other times, mixing makes a brand new substance with new properties. Pour vinegar on baking soda and it fizzes. The bubbles are a gas, carbon dioxide, that was not there before. Signs that a new substance has formed include bubbles of gas, a color change, heat or light, a new solid, or a new smell. Rust on an old nail and ash from a campfire are new substances too.",
      "Here is something amazing: when matter changes, the total weight stays the same. If you melt 100 grams of ice, you get 100 grams of water. If you stir 10 grams of salt into 200 grams of water, the salt water weighs 210 grams. The particles are still there, just arranged differently.",
      "But wait. If you mix baking soda and vinegar in an open cup, the cup gets lighter. Did matter disappear? No. The carbon dioxide gas escaped into the air. Do the same thing inside a sealed plastic bag, and the scale shows the same weight before and after. The gas is trapped in the bag, puffing it up.",
      "In the late 1700s, the French chemist Antoine Lavoisier weighed substances very carefully before and after changes, often in sealed containers. He showed that matter is not created or destroyed when it changes. Scientists call this the conservation of mass, and it is still one of the most important rules in chemistry.",
    ].join("\n\n"),
    keyIdeas: [
      "In a mixture, each substance keeps its properties and can be separated again.",
      "Bubbles, a color change, heat, light or a new solid are signs that a new substance has formed.",
      "When matter is heated, cooled or mixed, the total weight stays the same (conservation of mass).",
      "If a gas escapes, the weight seems to drop, but the matter just went into the air.",
    ],
    hook: {
      text: "Put a spoonful of baking soda in a cup and pour in some vinegar. Whoosh! Foam rushes up and over the top. Something new was made, right before your eyes. Now a puzzle: weigh the cup before and after, and it gets lighter. Did some matter just vanish?",
    },
    teach: [
      {
        title: "Mixtures",
        teach:
          "A mixture is two or more substances mixed together where each one keeps its own properties. Trail mix is a mixture: the raisins are still raisins and the peanuts are still peanuts. Because the properties don't change, you can separate a mixture again. A magnet pulls iron filings out of sand. A screen lets sand fall through but catches pebbles. A coffee filter lets water through but traps sand. Even salt water is a mixture. Leave it in a sunny window, and the water evaporates, leaving the salt crystals behind.",
        visual: {
          type: "hotspots",
          title: "Ways to separate a mixture",
          center: "Mixture",
          spots: [
            { label: "Magnet", icon: "🧲", detail: "Pulls iron filings out of sand, because only the iron is magnetic." },
            { label: "Screen", icon: "🥅", detail: "Lets small grains of sand fall through and catches bigger pebbles." },
            { label: "Filter", icon: "☕", detail: "Lets water pass through and traps bits of sand or soil." },
            { label: "Evaporation", icon: "☀️", detail: "The water dries up into the air and leaves the salt behind." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each mixture to the best way to separate it.",
          pairs: [
            { left: "Iron filings and sand", right: "Use a magnet" },
            { left: "Pebbles and sand", right: "Shake it through a screen" },
            { left: "Salt dissolved in water", right: "Let the water evaporate" },
            { left: "Sand and water", right: "Pour it through a coffee filter" },
          ],
          hint: "Use the property that is different: magnetism, grain size, or the water drying away.",
          seconds: 40,
        },
        think: {
          q: "How could you get the salt back out of salt water?",
          choices: ["Pour it through a screen", "Let the water evaporate", "Hold a magnet over it", "Shake it hard"],
          answer: 1,
          why: "When the water evaporates into the air, the salt is left behind.",
          hints: [
            "Dissolved salt particles are far smaller than the holes in a screen. They pass right through.",
            "",
            "Salt is not magnetic, so a magnet won't pull it out.",
            "Shaking just mixes it more. The salt stays dissolved.",
          ],
        },
        approaches: {
          analogy:
            "A mixture is like a box of different Lego bricks. They're all jumbled together, but each brick is still the same brick. You can sort them back out by color or size whenever you like.",
          example:
            "Mix a spoonful of salt into a cup of water. Pour a little onto a dark plate and set it in the sun. In a day or two, the water is gone and white salt crystals are left on the plate.",
          simpler: {
            q: "In trail mix, are the raisins still raisins?",
            choices: ["Yes, each part keeps its properties", "No, they turn into peanuts"],
            answer: 0,
            why: "In a mixture, each part keeps its own properties.",
            hints: ["", "Pick out a raisin from trail mix. It is still a raisin, so nothing new was made."],
          },
        },
      },
      {
        title: "Making Something New",
        teach:
          "Sometimes mixing substances makes a brand new substance with different properties. Scientists call this a chemical reaction. When vinegar meets baking soda, they make carbon dioxide gas, which is why it fizzes. How can you tell a new substance has formed? Look for these signs: bubbles of gas, a change of color, heat or light given off, a new solid appearing, or a new smell. An iron nail left in water turns to reddish-brown rust. Burning wood turns into ash and smoke. Melting butter, though, is not a new substance. It is still butter, just liquid.",
        visual: {
          type: "flip",
          cards: [
            { front: "Bubbles", back: "A gas is being made, like carbon dioxide from baking soda and vinegar." },
            { front: "Color change", back: "A new substance may have a new color, like reddish rust on gray iron." },
            { front: "Heat or light", back: "Burning wood gives off heat and light as new substances form." },
            { front: "New solid", back: "Vinegar stirred into milk makes white curds, a new solid." },
            { front: "Not new", back: "Melting, freezing and dissolving change how matter looks, but it is the same substance." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Did a new substance form, or is it the same substance in a mixture or new state?",
          buckets: ["New substance formed", "No new substance"],
          items: [
            { text: "Baking soda and vinegar fizz", bucket: 0 },
            { text: "An iron nail rusts in water", bucket: 0 },
            { text: "Wood burns to ash", bucket: 0 },
            { text: "Butter melts in a pan", bucket: 1 },
            { text: "Sugar dissolves in tea", bucket: 1 },
            { text: "Raisins and nuts are stirred together", bucket: 1 },
          ],
          hint: "Look for the signs: bubbles, a new color, heat or light, or a new solid. Melting and dissolving don't make a new substance.",
          seconds: 40,
        },
        think: {
          q: "Which is a sign that a new substance has formed?",
          choices: ["Ice melts into water", "Bubbles of gas appear when two liquids mix", "Sand is poured into a bucket", "A rock is broken in half"],
          answer: 1,
          why: "New bubbles of gas mean a new substance was made.",
          hints: [
            "Melted ice is still water, just in a different state.",
            "",
            "Pouring sand moves it, but it is still sand.",
            "Two halves of a rock are still the same rock material.",
          ],
        },
        approaches: {
          analogy:
            "A mixture is like a fruit salad: still apples and grapes. A chemical reaction is like baking a cake: flour, eggs and sugar become something new, and you can't pick the eggs back out.",
          example:
            "Stir a spoonful of vinegar into a half cup of warm milk. In a minute, white lumps called curds appear. That new solid is a sign that a new substance formed.",
          simpler: {
            q: "When butter melts, is it still butter?",
            choices: ["Yes, it is the same substance as a liquid", "No, it becomes a new substance"],
            answer: 0,
            why: "Melting changes the state, not the substance.",
            hints: ["", "Let melted butter cool and it turns solid again. It never stopped being butter."],
          },
        },
      },
      {
        title: "The Weight Stays the Same",
        teach:
          "When matter melts, freezes, dissolves or mixes, the total weight stays the same. Put 100 grams of ice in a sealed jar and let it melt. You get exactly 100 grams of water. Stir 10 grams of salt into 200 grams of water, and the salt water weighs 210 grams, even though the salt seems to vanish. The particles don't disappear. They are still there, just arranged in a new way. Scientists call this the conservation of mass. Conserve means to keep. Matter is kept, never lost, when it changes.",
        visual: {
          type: "compare",
          left: { title: "Before", points: ["100 g of ice", "200 g of water + 10 g of salt", "50 g of chocolate, solid"] },
          right: { title: "After", points: ["100 g of water", "210 g of salt water", "50 g of chocolate, melted"] },
        },
        probe: {
          type: "number",
          prompt: "You stir 15 grams of sugar into 300 grams of water until it dissolves. How many grams does the sugar water weigh?",
          answer: 315,
          unit: "grams",
          hint: "Nothing escaped. Add the weight of the sugar to the weight of the water.",
          mistakes: [
            { match: "300", coach: "The sugar seems to vanish, but its particles are still in the water. Add its weight too." },
            { match: "285", coach: "The sugar is added, not taken away. Add the two weights." },
          ],
          seconds: 25,
        },
        think: {
          q: "You melt 80 grams of ice in a closed jar. How much does the water weigh?",
          choices: ["Less than 80 grams", "80 grams", "More than 80 grams", "It has no weight"],
          answer: 1,
          why: "Melting changes the state, not the amount of matter, so the water weighs 80 grams.",
          hints: [
            "Water may take up a bit less space than ice, but no particles were lost in the closed jar.",
            "",
            "No new matter was added to the jar, so it can't get heavier.",
            "Water is matter, so it has weight.",
          ],
        },
        approaches: {
          analogy:
            "Take a tower of 20 blocks and knock it over. It looks totally different, but there are still 20 blocks. Matter changing shape or state is like that: same particles, new arrangement.",
          example:
            "A jar of ice weighs 350 grams on a scale. Leave the lid on and let it melt. Weigh it again: still 350 grams. Same jar, same matter, now liquid.",
          simpler: {
            q: "Salt seems to disappear in water. Is it still there?",
            choices: ["No, it is gone", "Yes, the particles are still in the water"],
            answer: 1,
            why: "Dissolved salt is still in the water. It tastes salty and adds weight.",
            hints: ["Taste salt water (just a tiny sip). It's salty, so the salt is still there.", ""],
          },
        },
      },
      {
        title: "Where Did the Weight Go?",
        teach:
          "Mix baking soda and vinegar in an open cup, and the cup gets lighter. Did matter disappear? No! The carbon dioxide gas floated out of the cup into the air. Now try it in a sealed zipper bag. The bag puffs up with gas, and the scale shows the same weight before and after. In the late 1700s, the French chemist Antoine Lavoisier did careful experiments like this, weighing substances in sealed containers. He showed that matter is never created or destroyed when it changes. When the weight seems to drop, look for a gas that escaped.",
        visual: {
          type: "compare",
          left: { title: "Open cup", points: ["Weight goes down", "Carbon dioxide gas escapes into the room", "Looks like matter vanished, but it didn't"] },
          right: { title: "Sealed bag", points: ["Weight stays the same", "The gas is trapped and puffs up the bag", "Shows that all the matter is still there"] },
        },
        probe: {
          type: "cloze",
          text: "In an open cup, baking soda and vinegar seem to lose weight because carbon dioxide {0} escapes into the air. In a {1} bag, the weight stays the same. This shows the {2} of mass.",
          blanks: [{ answers: ["gas"] }, { answers: ["sealed", "closed"] }, { answers: ["conservation"] }],
          bank: ["gas", "sealed", "conservation", "solid", "open", "destruction"],
          hint: "What kind of matter makes the bubbles? What kind of bag traps it? What is the rule that mass is kept?",
          mistakes: [
            { match: "open", coach: "An open bag lets the gas escape. To keep the weight the same, the bag must be sealed." },
            { match: "destruction", coach: "Matter is not destroyed. It is conserved, or kept." },
          ],
          seconds: 35,
        },
        think: {
          q: "Baking soda and vinegar in an open cup weigh less afterward. Why?",
          choices: ["The matter was destroyed", "The scale broke", "A gas escaped into the air", "Vinegar is weightless"],
          answer: 2,
          why: "Carbon dioxide gas floated out of the cup, taking its weight with it.",
          hints: [
            "Lavoisier showed matter is never destroyed. Look for where it went.",
            "The same scale works fine with the sealed bag.",
            "",
            "Vinegar is a liquid with weight, like water.",
          ],
        },
        approaches: {
          analogy:
            "Think of a party balloon you forget to tie. It goes flat, but the air didn't vanish. It went out into the room. The gas from baking soda and vinegar escapes from an open cup the same way.",
          example:
            "Open cup: 300 grams before, 296 grams after, because about 4 grams of gas escaped. Sealed bag: 300 grams before and 300 grams after, because the gas stayed inside.",
          simpler: {
            q: "What are the bubbles from baking soda and vinegar?",
            choices: ["A gas called carbon dioxide", "Tiny bits of glass"],
            answer: 0,
            why: "The bubbles are carbon dioxide gas, a new substance.",
            hints: ["", "Bubbles in a liquid are pockets of gas, not glass."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps of the sealed-bag experiment in order.",
      steps: [
        "Put a spoonful of baking soda in one corner of a zipper bag",
        "Pour some vinegar into a small cup and set it upright inside the bag",
        "Seal the bag and weigh it on a scale",
        "Tip the cup so the vinegar mixes with the baking soda",
        "Watch the bag puff up with gas",
        "Weigh the sealed bag again and compare",
      ],
    },
    explain: {
      prompt: "A friend says, 'When salt dissolves in water, the salt is gone, so the water weighs the same as before.' Explain what really happens.",
      keyPoints: [
        "The salt breaks into particles too small to see",
        "The particles are still in the water",
        "The salt water weighs the water plus the salt",
        "Matter is conserved: not created or destroyed",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "A sealed jar holds 250 grams of ice. After the ice melts, how many grams does the water in the jar weigh?",
        answer: 250,
        unit: "grams",
        hint: "Melting changes the state, not the amount of matter.",
        seconds: 20,
      },
      {
        type: "sort",
        prompt: "Mixture or new substance?",
        buckets: ["Mixture (can be separated)", "New substance formed"],
        items: [
          { text: "Sand and iron filings", bucket: 0 },
          { text: "Salt water", bucket: 0 },
          { text: "Rust on an old bike chain", bucket: 1 },
          { text: "Curds from vinegar stirred into milk", bucket: 1 },
          { text: "A bowl of cereal and milk", bucket: 0 },
          { text: "Ash left after a campfire", bucket: 1 },
        ],
        hint: "Could you pick or pull the parts back out? Then it's a mixture. A new color, a gas or a new solid means a new substance.",
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap the observations that show a NEW substance formed.",
        sentences: [
          "The liquid fizzed and bubbles rose to the top.",
          "The ice cube turned into a puddle.",
          "A gray nail turned reddish-brown.",
          "The sugar disappeared when stirred into water.",
          "The burning candle gave off light and heat.",
        ],
        correct: [0, 2, 4],
        hint: "Look for bubbles, a color change, heat or light. Melting and dissolving don't make a new substance.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "Mixing 200 grams of water with 20 grams of salt makes {0} grams of salt water. This is called the {1} of mass.",
        blanks: [{ answers: ["220"] }, { answers: ["conservation"] }],
        bank: ["220", "200", "180", "conservation", "loss"],
        hint: "Add the weights together. Matter is kept, or conserved.",
        mistakes: [{ match: "200", coach: "The salt has weight too. Add 200 + 20." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which is a mixture that can be separated easily?",
        choices: ["Ash from burned wood", "Rust", "Sand and iron filings", "Curds from milk and vinegar"],
        answer: 2,
        why: "A magnet can pull the iron filings out of the sand. The others are new substances.",
      },
      {
        q: "What happens to the total weight when 100 grams of ice melts in a closed jar?",
        choices: ["It goes down", "It stays 100 grams", "It goes up", "It disappears"],
        answer: 1,
        why: "Matter is conserved. Melting doesn't add or remove any particles.",
      },
      {
        q: "Why does baking soda and vinegar in an open cup weigh less afterward?",
        choices: ["Carbon dioxide gas escaped into the air", "Matter was destroyed", "The cup got smaller", "Vinegar has no weight"],
        answer: 0,
        why: "The gas left the cup. In a sealed bag the weight stays the same.",
      },
      {
        q: "Who showed, with careful weighing in the 1700s, that matter is not created or destroyed?",
        choices: ["Isaac Newton", "George Washington", "Antoine Lavoisier", "Thomas Edison"],
        answer: 2,
        why: "The French chemist Antoine Lavoisier weighed substances before and after changes.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, test the conservation of mass. Use a kitchen scale. Weigh a cup of water and a spoonful of salt separately, then stir the salt in and weigh the salt water. Next, with the grown-up, try baking soda and vinegar in an open cup and then in a sealed zipper bag, weighing before and after each time. Record all your numbers and explain what you found.",
      rubric: [
        "Weighed the water and salt before and after mixing",
        "Did the open-cup and sealed-bag tests with a grown-up",
        "Recorded every weight in grams",
        "Explained why the open cup lost weight and the sealed bag did not",
      ],
    },
  },

  // 3. Plants, food energy and ecosystems
  {
    id: "sci-5.food-energy",
    title: "Sunlight, Air and Water: Food for Life",
    minutes: 35,
    stage: "logic",
    standards: ["5-LS1-1", "5-PS3-1", "5-LS2-1"],
    read: [
      "About 400 years ago, a scientist named Jan Baptist van Helmont wondered where a tree gets its stuff. He planted a small willow tree weighing 5 pounds in a pot holding 200 pounds of dried soil. For five years he gave it only water. Then he weighed everything again. The tree weighed about 169 pounds, but the soil had lost only about 2 ounces. The tree's new matter did not come from the soil.",
      "Van Helmont guessed it came from the water. He was partly right. Later scientists discovered that plants build their bodies mostly from carbon dioxide, a gas in the air, and from water. Plants do take in small amounts of minerals from the soil, but the bulk of a tree is made from air and water.",
      "Plants make their own food through photosynthesis. Their leaves take in carbon dioxide from the air, and their roots take in water. Using energy from sunlight, the leaves turn these into sugar, which is food for the plant, and give off oxygen.",
      "That sunlight energy is now stored in the plant. When a rabbit eats clover, it gets that energy. When a fox eats the rabbit, the energy passes on again. The energy in all the food you eat, even a hamburger or a glass of milk, was once energy from the Sun.",
      "Matter moves in a loop through an ecosystem. Producers, such as plants, make food. Consumers, such as animals, eat plants or other animals. Decomposers, such as bacteria, fungi and worms, break down dead plants, animals and waste. They return nutrients to the soil and carbon dioxide to the air, where plants can use them again. Nothing goes to waste in a healthy ecosystem.",
    ].join("\n\n"),
    keyIdeas: [
      "Plants get the materials for growth mainly from air (carbon dioxide) and water, not from the soil.",
      "Plants use sunlight to make food (sugar) through photosynthesis.",
      "The energy in all food, for plants and animals, was once energy from the Sun.",
      "Producers, consumers and decomposers move matter in a loop through an ecosystem.",
    ],
    hook: {
      text: "A giant oak tree can weigh many tons. It started as a tiny acorn that fit in your hand. So where did all that wood come from? Most people guess the soil. One scientist tested that idea for five years, and the answer surprised him.",
    },
    teach: [
      {
        title: "Where Does a Tree Get Its Stuff?",
        teach:
          "About 400 years ago, Jan Baptist van Helmont tested where a tree gets its matter. He planted a 5-pound willow tree in a pot with 200 pounds of dried soil. He covered the pot so dust couldn't fall in, and for five years he added only water. When he weighed everything again, the tree weighed about 169 pounds. The soil had lost only about 2 ounces! The tree had gained over 160 pounds, and almost none of it came from the soil. Van Helmont thought it all came from water. Later scientists found that most of it actually came from the air.",
        visual: {
          type: "compare",
          left: { title: "At the start", points: ["Willow tree: 5 pounds", "Dried soil: 200 pounds"] },
          right: { title: "After 5 years", points: ["Willow tree: about 169 pounds", "Soil: lost only about 2 ounces", "Only water was added"] },
        },
        probe: {
          type: "number",
          prompt: "Van Helmont's willow weighed 5 pounds at the start and about 169 pounds after five years. About how many pounds did the tree gain?",
          answer: 164,
          unit: "pounds",
          hint: "Subtract the starting weight from the final weight.",
          mistakes: [{ match: "174", coach: "That adds the weights. The gain is the difference: 169 - 5." }],
          seconds: 25,
        },
        think: {
          q: "The tree gained about 164 pounds but the soil lost only about 2 ounces. What does this show?",
          choices: ["Trees eat soil", "Most of the tree's matter did not come from the soil", "The scale was broken", "Soil gets heavier over time"],
          answer: 1,
          why: "If the tree were made of soil, the soil would have lost about 164 pounds. It hardly lost any.",
          hints: [
            "If trees ate soil, the pot would be nearly empty after the tree gained 164 pounds.",
            "",
            "He weighed everything carefully. The result was real and has been repeated.",
            "The soil got a tiny bit lighter, not heavier.",
          ],
        },
        approaches: {
          analogy:
            "Imagine a kid who grows 30 pounds in a year while his toy box, which he never opened, stays just as full. The growth clearly came from somewhere else, like his meals. The tree's growth came from somewhere besides the soil too.",
          example:
            "Start: tree 5 lb, soil 200 lb. End: tree 169 lb, soil a little under 200 lb. Tree gained 169 - 5 = 164 lb. Soil lost about 2 ounces, which is far less than one pound.",
          simpler: {
            q: "Did the soil in van Helmont's pot lose a lot of weight?",
            choices: ["No, only about 2 ounces", "Yes, about 164 pounds"],
            answer: 0,
            why: "The soil lost only about 2 ounces in five years.",
            hints: ["", "If the soil had lost 164 pounds, the pot would be nearly empty. It wasn't."],
          },
        },
      },
      {
        title: "Plants Make Food from Sunlight",
        teach:
          "Plants are amazing chefs. They make their own food in a process called photosynthesis. Photo means light, and synthesis means putting together. A leaf takes in carbon dioxide, a gas in the air, through tiny holes underneath. The roots pull water up from the ground through the stem. Inside the leaf, a green substance called chlorophyll captures energy from sunlight. The plant uses that energy to turn carbon dioxide and water into sugar, its food. Oxygen is left over and goes out into the air, which is good news for us, because we breathe it.",
        visual: {
          type: "hotspots",
          title: "Photosynthesis in a leaf",
          center: "🌿",
          spots: [
            { label: "Sunlight", icon: "☀️", detail: "Gives the energy the plant needs to make food." },
            { label: "Carbon dioxide", icon: "💨", detail: "A gas from the air. It enters through tiny holes under the leaf." },
            { label: "Water", icon: "💧", detail: "Pulled up from the soil by the roots, through the stem, to the leaves." },
            { label: "Sugar", icon: "🍬", detail: "The food the plant makes. It uses it for energy and to build its body." },
            { label: "Oxygen", icon: "🫧", detail: "Left over, and released into the air for animals and people to breathe." },
          ],
        },
        probe: {
          type: "cloze",
          text: "In photosynthesis, a plant uses energy from {0} to turn {1} from the air and {2} from the soil into sugar. It gives off {3}.",
          blanks: [{ answers: ["sunlight", "the sun"] }, { answers: ["carbon dioxide"] }, { answers: ["water"] }, { answers: ["oxygen"] }],
          bank: ["sunlight", "carbon dioxide", "water", "oxygen", "rocks", "moonlight"],
          hint: "Energy comes from light. The gas the plant takes in is carbon dioxide. Roots bring water. The gas it gives off is the one we breathe.",
          mistakes: [
            { match: "rocks", coach: "Roots take in water and a few minerals, but plants are not built from rocks." },
            { match: "moonlight", coach: "Moonlight is far too dim. Plants need the energy of sunlight." },
          ],
          seconds: 40,
        },
        think: {
          q: "Where does a plant get the energy to make its food?",
          choices: ["From the soil", "From sunlight", "From the rain", "From the wind"],
          answer: 1,
          why: "Chlorophyll in the leaves captures energy from sunlight.",
          hints: [
            "Soil gives a few minerals, but not energy for making food.",
            "",
            "Rain gives the plant water, which is a material, not the energy source.",
            "Wind moves air around but doesn't give the plant its energy.",
          ],
        },
        approaches: {
          analogy:
            "A leaf is like a tiny solar-powered kitchen. Sunlight runs the oven, carbon dioxide and water are the ingredients, sugar is the meal, and oxygen is the steam that floats out the window.",
          example:
            "Put one bean plant in a sunny window and one in a dark closet, giving both the same water. After two weeks the sunny plant is green and strong; the dark one is pale and weak, because it couldn't make enough food without light.",
          simpler: {
            q: "What gas does a plant take in from the air?",
            choices: ["Oxygen", "Carbon dioxide"],
            answer: 1,
            why: "Plants take in carbon dioxide and give off oxygen.",
            hints: ["Oxygen is what the plant gives off. It takes in a different gas.", ""],
          },
        },
      },
      {
        title: "Energy Comes from the Sun",
        teach:
          "When a plant makes sugar, it stores some of the Sun's energy inside it. When an animal eats the plant, it gets that energy to move, grow and stay warm. When another animal eats that animal, the energy passes on again. A food chain shows this path. Sun to grass to cow to milk to you! So the energy in your breakfast was once sunlight. Even a hamburger or a scrambled egg traces back to plants, and those plants got their energy from the Sun. Without the Sun, there would be no food at all.",
        visual: {
          type: "flip",
          cards: [
            { front: "☀️ ➡️ 🌾", back: "The Sun's energy is captured by grass and stored as sugar." },
            { front: "🌾 ➡️ 🐄", back: "A cow eats the grass and gets its energy." },
            { front: "🐄 ➡️ 🥛", back: "The cow uses that energy to make milk." },
            { front: "🥛 ➡️ 🧒", back: "You drink the milk. Your energy came from the Sun!" },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put this food chain in order, starting with where the energy begins.",
          steps: ["The Sun", "Clover", "Rabbit", "Fox"],
          hint: "Energy starts with the Sun. A plant captures it. Then a plant-eater, then the animal that eats the plant-eater.",
          seconds: 25,
        },
        think: {
          q: "The energy in a scrambled egg first came from...",
          choices: ["The frying pan", "The chicken's feathers", "The Sun", "The refrigerator"],
          answer: 2,
          why: "The chicken ate grain, and the grain plants got their energy from sunlight.",
          hints: [
            "The pan just cooks the egg. The egg's food energy came from somewhere much farther back.",
            "Feathers don't make energy. Think about what the chicken ate.",
            "",
            "A fridge keeps food cold. It doesn't put energy into the food.",
          ],
        },
        approaches: {
          analogy:
            "Food energy is like a relay race baton. The Sun hands it to a plant, the plant hands it to a rabbit, and the rabbit hands it to a fox. Every runner got the baton from the Sun at the start.",
          example:
            "Trace a slice of pizza: the crust is wheat, a plant that used sunlight. The cheese is from a cow's milk, and the cow ate grass that used sunlight. The tomato sauce is from tomato plants. Every bite leads back to the Sun.",
          simpler: {
            q: "What does a rabbit get when it eats clover?",
            choices: ["Energy that the clover stored", "Nothing at all"],
            answer: 0,
            why: "The clover stored energy from the Sun, and the rabbit gets it by eating.",
            hints: ["", "Animals eat to get energy. The clover has energy stored from sunlight."],
          },
        },
      },
      {
        title: "Decomposers Close the Loop",
        teach:
          "Every ecosystem has three kinds of jobs. Producers, like grass and trees, make their own food from sunlight, air and water. Consumers, like deer, hawks and people, eat plants or other animals. Decomposers, like bacteria, mushrooms and earthworms, break down dead leaves, dead animals and waste. As decomposers do their work, they return nutrients to the soil and carbon dioxide to the air. Then plants use those materials to grow again. So matter travels in a loop: from air and soil, into plants, into animals, to decomposers, and back. A forest floor full of rotting logs is busy recycling!",
        visual: {
          type: "hotspots",
          title: "Matter moves in a loop",
          center: "🔄",
          spots: [
            { label: "Producers", icon: "🌳", detail: "Plants take in air, water and nutrients and use sunlight to make food." },
            { label: "Consumers", icon: "🦌", detail: "Animals eat plants or other animals and use that matter to grow." },
            { label: "Decomposers", icon: "🍄", detail: "Bacteria, fungi and worms break down dead things and waste." },
            { label: "Soil and air", icon: "🌍", detail: "Decomposers return nutrients to the soil and carbon dioxide to the air for plants to use again." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each living thing by its job in the ecosystem.",
          buckets: ["Producer", "Consumer", "Decomposer"],
          items: [
            { text: "Oak tree", bucket: 0 },
            { text: "Grass", bucket: 0 },
            { text: "Deer", bucket: 1 },
            { text: "Hawk", bucket: 1 },
            { text: "Mushroom", bucket: 2 },
            { text: "Earthworm", bucket: 2 },
          ],
          hint: "Producers make food from sunlight. Consumers eat other living things. Decomposers break down dead things.",
          mistakes: [{ match: "Mushroom", coach: "A mushroom is a fungus, not a plant. It can't make food from sunlight. It breaks down dead matter, so it's a decomposer." }],
          seconds: 35,
        },
        think: {
          q: "What would happen in a forest with no decomposers?",
          choices: ["Plants would grow faster", "Dead leaves and logs would pile up and nutrients wouldn't return to the soil", "Nothing would change", "The Sun would stop shining"],
          answer: 1,
          why: "Decomposers break down dead things and return nutrients. Without them, matter would get stuck.",
          hints: [
            "Plants need the nutrients that decomposers return to the soil, so they'd grow worse, not better.",
            "",
            "Decomposers have a big job. Think about what happens to fallen leaves.",
            "Decomposers have nothing to do with the Sun shining.",
          ],
        },
        approaches: {
          analogy:
            "Decomposers are nature's recycling crew. Just as a recycling center turns old cans into new cans, decomposers turn dead leaves into nutrients that become brand-new leaves.",
          example:
            "An apple falls in autumn. Bacteria and fungi soften it, worms eat bits of it, and by spring it has become part of the soil. The apple tree's roots then take up those nutrients to help grow new apples.",
          simpler: {
            q: "Which one is a decomposer?",
            choices: ["A mushroom growing on a rotting log", "A hawk", "A sunflower"],
            answer: 0,
            why: "Mushrooms break down dead wood, so they are decomposers.",
            hints: ["", "A hawk eats other animals, so it is a consumer.", "A sunflower makes its own food from sunlight, so it is a producer."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Follow one bit of matter around the loop. Put the steps in order.",
      steps: [
        "A grass plant takes in carbon dioxide from the air and water from the soil",
        "Using sunlight, the grass turns them into sugar and grows",
        "A cow eats the grass",
        "The cow's waste falls on the field",
        "Bacteria and dung beetles break the waste down",
        "Nutrients return to the soil for new grass to use",
      ],
    },
    explain: {
      prompt: "Explain to a younger kid how the energy in their lunch sandwich came from the Sun, and where a tree gets most of the stuff it is made of.",
      keyPoints: [
        "Plants use sunlight to make sugar (photosynthesis)",
        "Plants build their bodies mainly from air and water",
        "Animals get energy by eating plants or other animals",
        "The energy in all food was once energy from the Sun",
        "Decomposers return matter to the soil and air",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each part of an ecosystem to its job.",
        pairs: [
          { left: "Producer", right: "Makes its own food using sunlight" },
          { left: "Consumer", right: "Eats plants or other animals" },
          { left: "Decomposer", right: "Breaks down dead things and waste" },
          { left: "The Sun", right: "Gives the energy that starts every food chain" },
        ],
        hint: "Produce means make, consume means eat, decompose means break down.",
        seconds: 35,
      },
      {
        type: "sequence",
        prompt: "Put the path of energy in order.",
        steps: ["The Sun", "Corn plant", "Chicken", "Person eating an egg"],
        hint: "Start with the source of all food energy. Then the plant, then the animal that eats it, then you.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Van Helmont's tree gained over 160 pounds, but the {0} lost only about 2 ounces. Plants build their bodies mainly from {1} and water.",
        blanks: [{ answers: ["soil"] }, { answers: ["air", "carbon dioxide"] }],
        bank: ["soil", "air", "sunlight", "worms", "pot"],
        hint: "The tree did not get much from the pot's soil. The gas it takes in comes from the air.",
        mistakes: [{ match: "sunlight", coach: "Sunlight gives the energy, but it isn't a material. The matter comes from carbon dioxide in the air, and water." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the TRUE statements.",
        sentences: [
          "Most of a tree's matter comes from the soil.",
          "Plants give off oxygen during photosynthesis.",
          "Decomposers return nutrients to the soil.",
          "Only plants get their energy from the Sun; animals do not.",
          "The energy in a glass of milk was once energy from the Sun.",
        ],
        correct: [1, 2, 4],
        hint: "Remember van Helmont's tree, the gas plants give off, the job of decomposers, and where animal food energy comes from.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "Where do plants get most of the material to build their bodies?",
        choices: ["From the soil", "From air and water", "From sunlight", "From worms"],
        answer: 1,
        why: "Plants build sugar from carbon dioxide in the air and water. Sunlight gives the energy, not the material.",
      },
      {
        q: "The energy in a hamburger first came from...",
        choices: ["The grill", "The Sun", "The bun's wrapper", "The cow's bones"],
        answer: 1,
        why: "The cow ate grass, and the grass got its energy from sunlight.",
      },
      {
        q: "What do decomposers do?",
        choices: ["Make food from sunlight", "Hunt other animals", "Break down dead things and return nutrients to the soil", "Make oxygen for animals"],
        answer: 2,
        why: "Bacteria, fungi and worms break down dead matter and return nutrients to the soil.",
      },
      {
        q: "Which gas do plants give off during photosynthesis?",
        choices: ["Oxygen", "Carbon dioxide", "Smoke", "Steam"],
        answer: 0,
        why: "Plants take in carbon dioxide and give off oxygen.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a poster or a model of matter moving through an ecosystem near your home (a backyard, park or forest). Show the Sun, at least two producers, two consumers and two decomposers, with arrows for where energy and matter go. Include a label showing that plants take in air and water, and that decomposers return nutrients to the soil.",
      rubric: [
        "Shows the Sun as the source of energy",
        "Includes at least two producers, two consumers and two decomposers",
        "Arrows show energy and matter moving in the right direction",
        "Shows plants taking in air and water",
        "Shows decomposers returning nutrients to the soil",
      ],
    },
  },

  // 4. Earth's four spheres and Earth's water
  {
    id: "sci-5.spheres",
    title: "Earth's Four Spheres and Its Water",
    minutes: 30,
    stage: "grammar",
    standards: ["5-ESS2-1", "5-ESS2-2"],
    read: [
      "Scientists think of Earth as four big systems, called spheres, that work together. The geosphere is the solid Earth: rock, soil, sand and mountains. The hydrosphere is all of Earth's water: oceans, lakes, rivers, groundwater, clouds and ice. The atmosphere is the layer of air around the planet. The biosphere is every living thing, from whales to mushrooms to you.",
      "The spheres are always affecting each other. Rain falls from the atmosphere into the hydrosphere. Rivers and waves wear away rock, carving canyons and shaping beaches. Wind blows sand into dunes. Plant roots crack rocks and hold soil in place. Volcanoes send ash and gas into the air. Plants take in carbon dioxide from the atmosphere and give off oxygen. A change in one sphere almost always causes changes in the others.",
      "From space, Earth looks like a water planet. About 71 out of every 100 parts of its surface are covered with water. But most of that water is salty. If all of Earth's water were 100 drops, about 97 drops would be salt water in the oceans. Only about 3 drops would be fresh water, and about 2 of those would be frozen in glaciers and the ice sheets of Antarctica and Greenland.",
      "That leaves only about 1 drop of liquid fresh water, and most of it is hidden underground as groundwater. The lakes and rivers we see are only a tiny part of that last drop.",
      "People, animals and plants need fresh water to live. Because there is so little of it, it is wise to use it carefully and keep it clean.",
    ].join("\n\n"),
    keyIdeas: [
      "Earth has four spheres: geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (living things).",
      "The spheres interact: rain wears away rock, roots break rocks, wind shapes dunes.",
      "About 97% of Earth's water is salty; only about 3% is fresh, and most of that is frozen.",
      "Only about 1% of Earth's water is liquid fresh water, mostly underground.",
    ],
    hook: {
      text: "Astronauts call Earth the blue planet. Water covers most of its surface. So why do people sometimes run short of water to drink? Today we find out how much of Earth's water we can actually use, and how land, water, air and life work together.",
    },
    teach: [
      {
        title: "Four Spheres",
        teach:
          "Scientists divide Earth into four big systems called spheres. The geosphere is the solid Earth: rocks, soil, sand, mountains and the hot rock deep inside. The hydrosphere is all of Earth's water, salty and fresh, liquid and frozen, including clouds and groundwater. The atmosphere is the blanket of air around the planet, where weather happens. The biosphere is all living things: plants, animals, fungi, tiny microbes and people. Each sphere has its own name, but they are not separate. They overlap and work together all the time.",
        visual: {
          type: "hotspots",
          title: "Earth's four spheres",
          center: "🌍",
          spots: [
            { label: "Geosphere", icon: "🪨", detail: "The solid Earth: rocks, soil, sand, mountains and the hot rock inside." },
            { label: "Hydrosphere", icon: "🌊", detail: "All of Earth's water: oceans, rivers, lakes, groundwater, clouds and ice." },
            { label: "Atmosphere", icon: "💨", detail: "The layer of air around Earth, where weather happens." },
            { label: "Biosphere", icon: "🌳", detail: "Every living thing, from tiny microbes to blue whales." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each thing into its sphere.",
          buckets: ["Geosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
          items: [
            { text: "A mountain", bucket: 0 },
            { text: "Sand on a beach", bucket: 0 },
            { text: "A glacier", bucket: 1 },
            { text: "The ocean", bucket: 1 },
            { text: "Wind", bucket: 2 },
            { text: "Oxygen we breathe", bucket: 2 },
            { text: "A pine tree", bucket: 3 },
            { text: "A salmon", bucket: 3 },
          ],
          hint: "Geo means earth (rock). Hydro means water (even frozen). Atmo is about air. Bio means life.",
          mistakes: [{ match: "A glacier", coach: "A glacier is frozen water, so it belongs to the hydrosphere." }],
          seconds: 45,
        },
        think: {
          q: "A glacier is part of which sphere?",
          choices: ["Geosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
          answer: 1,
          why: "A glacier is frozen water, and all of Earth's water, frozen or liquid, is the hydrosphere.",
          hints: [
            "A glacier sits on rock, but it is made of ice.",
            "",
            "A glacier is solid ice, not air.",
            "A glacier isn't alive.",
          ],
        },
        approaches: {
          analogy:
            "Think of Earth as a team with four players: Rocky (geosphere), Splash (hydrosphere), Breezy (atmosphere) and Sprout (biosphere). Each has a name and a job, but they pass the ball to each other all game long.",
          example:
            "At a pond: the muddy bottom is geosphere, the water is hydrosphere, the air above is atmosphere, and the frogs, cattails and dragonflies are biosphere. All four spheres in one small place!",
          simpler: {
            q: "Which sphere includes all living things?",
            choices: ["Biosphere", "Geosphere"],
            answer: 0,
            why: "Bio means life. The biosphere is all living things.",
            hints: ["", "Geo means earth or rock. Living things belong to another sphere."],
          },
        },
      },
      {
        title: "Spheres Work Together",
        teach:
          "The four spheres are always changing each other. Rain falls from the atmosphere into the hydrosphere. Over many years, rivers wear away rock in the geosphere and carve deep canyons. The Grand Canyon was carved this way by the Colorado River. Wind, part of the atmosphere, piles sand into dunes. Plant roots, part of the biosphere, grow into cracks and split rocks apart, and they also hold soil in place so rain can't wash it away. Volcanoes in the geosphere blast ash and gas into the atmosphere. Every interaction connects at least two spheres.",
        visual: {
          type: "flip",
          cards: [
            { front: "River carves a canyon", back: "Hydrosphere (water) shapes the geosphere (rock)." },
            { front: "Wind builds a sand dune", back: "Atmosphere (air) shapes the geosphere (sand)." },
            { front: "Roots split a rock", back: "Biosphere (plants) changes the geosphere (rock)." },
            { front: "Volcano ash fills the sky", back: "Geosphere (volcano) changes the atmosphere (air)." },
            { front: "Plants give off oxygen", back: "Biosphere (plants) changes the atmosphere (air)." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each event to the spheres that are interacting.",
          pairs: [
            { left: "A river carves a canyon", right: "Hydrosphere and geosphere" },
            { left: "Wind piles sand into dunes", right: "Atmosphere and geosphere" },
            { left: "Tree roots crack a rock", right: "Biosphere and geosphere" },
            { left: "Ocean water evaporates into clouds", right: "Hydrosphere and atmosphere" },
          ],
          hint: "Name what is doing the work (water, air or living things) and what it is changing.",
          seconds: 45,
        },
        think: {
          q: "Tree roots grow into a crack and split a rock. Which spheres interact?",
          choices: ["Atmosphere and hydrosphere", "Biosphere and geosphere", "Hydrosphere and biosphere", "Atmosphere and geosphere"],
          answer: 1,
          why: "The roots are living (biosphere) and the rock is solid Earth (geosphere).",
          hints: [
            "Neither air nor water is the main actor here. Think about roots and rock.",
            "",
            "The roots are living, but they are changing rock, not water.",
            "Air isn't splitting the rock. Something living is.",
          ],
        },
        approaches: {
          analogy:
            "The spheres are like gears in a clock: turn one, and the others turn too. Rain (air and water) turns the rock gear, rock turns the soil gear, and soil turns the plant gear.",
          example:
            "A heavy rain falls on a bare hillside (atmosphere to hydrosphere). The runoff carries away soil (hydrosphere changes geosphere). Then farmers plant grass whose roots hold the soil (biosphere protects geosphere).",
          simpler: {
            q: "Wind is part of which sphere?",
            choices: ["Atmosphere", "Biosphere"],
            answer: 0,
            why: "Wind is moving air, and air is the atmosphere.",
            hints: ["", "Wind isn't alive. It is moving air."],
          },
        },
      },
      {
        title: "How Much Water Is Fresh?",
        teach:
          "Water covers about 71 percent of Earth's surface, so Earth looks blue from space. But most of it is salty. Imagine all of Earth's water as 100 drops. About 97 drops would be salt water in the oceans, too salty to drink or water crops. Only about 3 drops would be fresh water. And of those 3, about 2 drops are frozen in glaciers and in the giant ice sheets of Antarctica and Greenland. That leaves about 1 drop of liquid fresh water for all the people, animals and plants that need it.",
        visual: {
          type: "compare",
          left: { title: "Salt water", points: ["About 97 out of 100 drops", "Oceans and seas", "Too salty to drink or water crops"] },
          right: { title: "Fresh water", points: ["About 3 out of 100 drops", "About 2 drops frozen in ice sheets and glaciers", "About 1 drop liquid, mostly underground"] },
        },
        probe: {
          type: "place",
          prompt: "Imagine Earth's water is 100 drops. Place each kind of water on the line at about how many drops it is.",
          min: 0,
          max: 100,
          step: 1,
          tolerance: 3,
          items: [
            { label: "Salt water", value: 97 },
            { label: "All fresh water", value: 3 },
          ],
          hint: "Almost all of Earth's water is salty: about 97 drops out of 100. The rest is fresh.",
          seconds: 30,
        },
        think: {
          q: "Out of 100 drops of Earth's water, about how many are salt water?",
          choices: ["About 3", "About 50", "About 97", "About 71"],
          answer: 2,
          why: "About 97 out of every 100 drops of Earth's water are salty ocean water.",
          hints: [
            "3 is about how much is fresh water, not salt water.",
            "It's much more than half. The oceans are huge.",
            "",
            "71 percent is how much of Earth's surface is covered by water, not how much water is salty.",
          ],
        },
        approaches: {
          analogy:
            "Picture a gallon jug of water as all of Earth's water. Almost all of it is salty. Only about half a cup is fresh, and most of that half cup is frozen solid. The water we can easily use would fill only a couple of spoons.",
          example:
            "100 drops in all. Take away 97 salty drops: 100 - 97 = 3 fresh drops. Take away 2 frozen drops: 3 - 2 = 1 drop of liquid fresh water.",
          simpler: {
            q: "Is most of Earth's water salty or fresh?",
            choices: ["Salty", "Fresh"],
            answer: 0,
            why: "Most of Earth's water is in the salty oceans.",
            hints: ["", "The oceans are huge, and ocean water is salty."],
          },
        },
      },
      {
        title: "Where Is the Fresh Water?",
        teach:
          "Let's look closer at that small share of fresh water. Most of it, roughly two thirds, is locked up as ice in glaciers and ice sheets. Most of the rest is groundwater, soaking the spaces between grains of sand and rock underground. People reach it by digging wells. The lakes, rivers and swamps we see make up only a tiny sliver of Earth's fresh water. Scientists show these amounts with pie charts and bar graphs, and the salty ocean bar towers over all the rest. Because fresh water is so limited, every drop is worth protecting.",
        visual: {
          type: "hotspots",
          title: "Earth's fresh water",
          center: "💧",
          spots: [
            { label: "Ice", icon: "🧊", detail: "Roughly two thirds of fresh water is frozen in glaciers and the ice sheets of Antarctica and Greenland." },
            { label: "Groundwater", icon: "⛏️", detail: "Most of the rest is underground, between grains of sand and rock. Wells reach it." },
            { label: "Lakes and rivers", icon: "🏞️", detail: "Only a tiny sliver of fresh water is in lakes, rivers and swamps." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Most of Earth's fresh water is frozen as {0}. Most of the liquid fresh water is {1}, which people reach with wells. Only a tiny part is in lakes and {2}.",
          blanks: [{ answers: ["ice"] }, { answers: ["groundwater"] }, { answers: ["rivers"] }],
          bank: ["ice", "groundwater", "rivers", "oceans", "clouds"],
          hint: "Think: frozen, underground, and the water we see flowing across the land.",
          mistakes: [{ match: "oceans", coach: "Oceans are salt water. This sentence is about fresh water." }],
          seconds: 35,
        },
        think: {
          q: "Where is most of Earth's liquid fresh water?",
          choices: ["In rivers", "In lakes", "Underground, as groundwater", "In the oceans"],
          answer: 2,
          why: "Most liquid fresh water soaks the rock and sand underground.",
          hints: [
            "Rivers hold only a tiny sliver of fresh water.",
            "Lakes hold more than rivers, but far less than what's underground.",
            "",
            "Ocean water is salty, not fresh.",
          ],
        },
        approaches: {
          analogy:
            "Groundwater is like water in a soaked sponge. You can't see puddles inside the sponge, but squeeze it and water pours out. The ground holds water in its tiny spaces the same way, and a well is how we squeeze it out.",
          example:
            "A bar graph of all Earth's water: the ocean bar reaches about 97, the ice bar about 2, and groundwater about 1. Lakes and rivers are so small you can barely see their bar at all.",
          simpler: {
            q: "How do people reach groundwater?",
            choices: ["By digging wells", "By climbing mountains"],
            answer: 0,
            why: "Wells reach down to the water stored underground.",
            hints: ["", "Groundwater is below the surface, so you have to dig down, not climb up."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which sphere is doing the changing? Sort each event by the sphere that causes it.",
      buckets: ["Hydrosphere (water)", "Atmosphere (air)", "Biosphere (living things)", "Geosphere (land)"],
      items: [
        { text: "Waves wear down a rocky cliff", bucket: 0 },
        { text: "A river carries mud to the sea", bucket: 0 },
        { text: "Wind shapes a sand dune", bucket: 1 },
        { text: "A dust storm blows soil across a field", bucket: 1 },
        { text: "Beavers build a dam that floods a valley", bucket: 2 },
        { text: "Grass roots stop soil from washing away", bucket: 2 },
        { text: "A volcano blasts ash into the sky", bucket: 3 },
        { text: "An earthquake changes a river's path", bucket: 3 },
      ],
    },
    explain: {
      prompt: "Explain why Earth is called the water planet but people still need to save fresh water. Use the 100 drops idea.",
      keyPoints: [
        "About 97 out of 100 drops are salt water",
        "Only about 3 drops are fresh water",
        "About 2 of those are frozen as ice",
        "Only about 1 drop is liquid fresh water, mostly underground",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "If Earth's water were 100 drops and 97 were salty, how many drops would be fresh?",
        answer: 3,
        unit: "drops",
        hint: "Subtract the salty drops from 100.",
        seconds: 15,
      },
      {
        type: "match",
        prompt: "Match each sphere to something in it.",
        pairs: [
          { left: "Geosphere", right: "Granite rock" },
          { left: "Hydrosphere", right: "Groundwater" },
          { left: "Atmosphere", right: "Carbon dioxide gas in the air" },
          { left: "Biosphere", right: "A honeybee" },
        ],
        hint: "Geo = rock, hydro = water, atmo = air, bio = life.",
        seconds: 30,
      },
      {
        type: "place",
        prompt: "Out of 100 drops of Earth's water, place each kind at about how many drops it is.",
        min: 0,
        max: 100,
        step: 1,
        tolerance: 2,
        items: [
          { label: "Salt water", value: 97 },
          { label: "Frozen fresh water", value: 2 },
        ],
        hint: "Salt water is almost all of it. Of the 3 fresh drops, about 2 are frozen.",
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the events where the hydrosphere (water) changes the geosphere (land).",
        sentences: [
          "A river carves a deep canyon over millions of years.",
          "Wind blows sand into tall dunes.",
          "Ocean waves wear a cliff into a sandy beach.",
          "A deer eats grass in a meadow.",
          "Rain washes soil off a bare hillside.",
        ],
        correct: [0, 2, 4],
        hint: "Look for moving water (rivers, waves, rain) changing rock or soil.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which sphere is made of all living things?",
        choices: ["Geosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        answer: 3,
        why: "Bio means life. The biosphere is all living things.",
      },
      {
        q: "About what share of Earth's water is salt water?",
        choices: ["About 97 percent", "About 50 percent", "About 3 percent", "About 10 percent"],
        answer: 0,
        why: "About 97 out of every 100 drops are salty ocean water.",
      },
      {
        q: "Where is most of Earth's fresh water?",
        choices: ["In rivers", "Frozen in glaciers and ice sheets", "In clouds", "In lakes"],
        answer: 1,
        why: "Roughly two thirds of Earth's fresh water is frozen ice.",
      },
      {
        q: "A river carving the Grand Canyon is an example of which spheres interacting?",
        choices: ["Atmosphere and biosphere", "Biosphere and geosphere", "Hydrosphere and geosphere", "Atmosphere and hydrosphere"],
        answer: 2,
        why: "The river's water (hydrosphere) wore away rock (geosphere).",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a 100-square grid (10 by 10) on paper to show Earth's water. Color 97 squares blue for salt water, 2 squares white for ice, and 1 square green for liquid fresh water. Below it, draw one place near you where at least three of Earth's spheres meet, and label each sphere and how they interact.",
      rubric: [
        "Grid shows 97 salt, 2 frozen and 1 liquid fresh square",
        "Grid has a key that explains the colors",
        "Drawing labels at least three spheres",
        "Describes at least one interaction between two spheres",
      ],
    },
  },

  // 5. Gravity pulls down, with a fair-test parachute drop
  {
    id: "sci-5.gravity",
    title: "Gravity Pulls Down",
    minutes: 30,
    stage: "logic",
    standards: ["5-PS2-1", "3-5-ETS1-3"],
    read: [
      "Drop a pencil and it falls to the floor. Throw a ball into the air and it comes back down. The force that pulls them down is gravity. Gravity is a pull between objects. The bigger an object's mass, the stronger its pull. Earth is enormous, so its gravity pulls on everything near it: you, the ocean, the air and the Moon.",
      "A famous story says that a falling apple got Isaac Newton thinking about gravity in the 1660s. Newton realized that the same force that pulls an apple to the ground also keeps the Moon traveling around Earth. Your weight is a measure of how hard Earth's gravity pulls on you.",
      "Which way is down? Kids in the United States and kids in Australia both drop their pencils down, yet Australia is on the other side of the globe. That is because down always means toward the center of the Earth. Gravity pulls everything toward Earth's center, no matter where you stand on the round planet.",
      "Do heavy things fall faster than light things? Drop a hammer and a feather, and the feather drifts slowly. But that is because air pushes up on the wide, light feather. In 1971, astronaut David Scott dropped a hammer and a falcon feather on the Moon, where there is no air. They hit the ground at the same moment.",
      "Engineers use what they know about gravity and air to design things like parachutes. To test parachute designs fairly, they change only one thing at a time, keep everything else the same and repeat each test several times. They also look for failure points, like tangled strings, and improve the design.",
    ].join("\n\n"),
    keyIdeas: [
      "Gravity is a pull between objects; Earth's gravity pulls everything toward it.",
      "Down always means toward the center of the Earth, wherever you are.",
      "Without air, heavy and light things fall at the same rate; air slows wide, light objects.",
      "A fair test changes only one variable and repeats each trial.",
    ],
    hook: {
      text: "Picture a kid in Ohio and a kid in Australia, on opposite sides of the globe. Each drops a ball at the same time. One is upside down compared to the other! So why doesn't the Australian ball fall off into space? Let's find out what down really means.",
    },
    teach: [
      {
        title: "What Is Gravity?",
        teach:
          "Gravity is a force that pulls objects toward each other. Every object with mass has gravity, but the pull is only strong when the object is huge. Earth is so massive that its gravity pulls on everything nearby: a dropped pencil, falling rain, the ocean, the air and even the Moon. A famous story says a falling apple got Isaac Newton thinking about gravity in the 1660s. He realized the same force that pulls an apple down also keeps the Moon circling Earth. Your weight is how hard Earth's gravity pulls on you.",
        visual: {
          type: "flip",
          cards: [
            { front: "Gravity", back: "A force that pulls objects with mass toward each other." },
            { front: "Mass", back: "How much matter is in an object. More mass means more gravity." },
            { front: "Weight", back: "How hard gravity pulls on an object. On the Moon you would weigh about one sixth as much." },
            { front: "Isaac Newton", back: "An English scientist who explained that the same gravity pulls apples down and holds the Moon in orbit." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Gravity is a {0} that pulls objects toward each other. Earth has a strong pull because it has a huge {1}. How hard gravity pulls on you is your {2}.",
          blanks: [{ answers: ["force"] }, { answers: ["mass"] }, { answers: ["weight"] }],
          bank: ["force", "mass", "weight", "color", "magnet"],
          hint: "A push or pull is a force. Bigger mass means stronger gravity. The pull on you is measured as your weight.",
          mistakes: [{ match: "magnet", coach: "Gravity is not magnetism. It pulls on everything with mass, even wood and water." }],
          seconds: 30,
        },
        think: {
          q: "Why does Earth's gravity pull so strongly on us?",
          choices: ["Earth spins fast", "Earth has a huge mass", "Earth is a giant magnet", "Earth has air"],
          answer: 1,
          why: "The more mass an object has, the stronger its gravity. Earth is enormous.",
          hints: [
            "Spinning doesn't make gravity. Mass does.",
            "",
            "Gravity pulls on wood, water and people too, which magnets don't. Gravity is not magnetism.",
            "The Moon has no air but still has gravity. Gravity comes from mass.",
          ],
        },
        approaches: {
          analogy:
            "Think of a heavy bowling ball sitting in the middle of a trampoline. Marbles rolled nearby curve in toward it. Earth is the bowling ball, and everything nearby gets pulled in toward it.",
          example:
            "Throw a ball straight up. It slows, stops, then falls back to your hand. The whole time, Earth's gravity is pulling it down. Drop a pencil, a book or a spoon: they all fall the same direction, toward Earth.",
          simpler: {
            q: "What makes a dropped pencil fall to the floor?",
            choices: ["Gravity", "Wind"],
            answer: 0,
            why: "Earth's gravity pulls the pencil down.",
            hints: ["", "A pencil falls even in a room with no wind. Something else pulls it."],
          },
        },
      },
      {
        title: "Down Means Toward the Center",
        teach:
          "Earth is a giant ball, and people live all over it. So which way is down? Down always means toward the center of the Earth. A kid in the United States drops a ball, and it falls toward Earth's center. A kid in Australia, on the other side of the globe, drops a ball, and it also falls toward Earth's center. To each of them it just looks like down. Nobody falls off, because gravity pulls everyone toward the middle. Builders use a plumb line, a weight on a string, to find straight down. The string always points toward Earth's center.",
        visual: {
          type: "hotspots",
          title: "Gravity pulls toward Earth's center",
          center: "🌍",
          spots: [
            { label: "United States", icon: "🧒", detail: "A dropped ball falls toward Earth's center, which looks like straight down." },
            { label: "Australia", icon: "🧑", detail: "On the far side of the globe, a dropped ball still falls toward Earth's center." },
            { label: "Plumb line", icon: "🪀", detail: "A weight on a string hangs straight down, pointing toward Earth's center." },
            { label: "Rain", icon: "🌧️", detail: "Raindrops everywhere on Earth fall toward its center." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Everywhere on Earth, gravity pulls objects toward Earth's {0}. A kid in Australia drops a ball, and it falls {1}, just like it does in the United States.",
          blanks: [{ answers: ["center"] }, { answers: ["down"] }],
          bank: ["center", "down", "north pole", "up", "sideways"],
          hint: "Gravity doesn't pull toward the North Pole or into space. It pulls toward the middle of the planet.",
          mistakes: [
            { match: "north pole", coach: "If gravity pulled toward the North Pole, balls would roll north on flat ground. It pulls toward Earth's center." },
            { match: "up", coach: "Balls never fall up! For every person on Earth, down means toward Earth's center." },
          ],
          seconds: 30,
        },
        think: {
          q: "Why don't people in Australia fall off the Earth?",
          choices: ["They wear heavy shoes", "Gravity pulls everyone toward Earth's center", "Australia is on top of the Earth", "The air holds them down"],
          answer: 1,
          why: "Gravity pulls toward Earth's center from every side of the planet.",
          hints: [
            "Shoes don't matter. Gravity pulls on every person and object.",
            "",
            "There is no real top of a round planet. Each place seems like the top to the people there.",
            "Air pushes in all directions and doesn't hold people down. Gravity does.",
          ],
        },
        approaches: {
          analogy:
            "Imagine ants walking all over a basketball that has a tiny magnet at its very center pulling on them. Ants on the top, the sides and the bottom all feel pulled toward the middle. To each ant, the ball is under its feet.",
          example:
            "Draw a circle for Earth. Draw stick people standing all around it, with feet on the circle. Draw an arrow from each person's dropped ball toward the center of the circle. Every arrow points inward, and each one is that person's down.",
          simpler: {
            q: "Gravity pulls objects toward...",
            choices: ["Outer space", "The center of the Earth"],
            answer: 1,
            why: "Earth's gravity pulls everything toward its center.",
            hints: ["Dropped things never fly off into space. They fall toward Earth.", ""],
          },
        },
      },
      {
        title: "Heavy and Light Fall Together",
        teach:
          "Do heavy things fall faster than light things? Drop a hammer and a feather, and the feather drifts down slowly. But that's because air pushes up on the wide, light feather. This push is called air resistance. Take away the air and something surprising happens. In 1971, astronaut David Scott stood on the Moon, where there is no air, and dropped a hammer and a falcon feather at the same time. They hit the ground together! Gravity pulls all objects down at the same rate. Air resistance is what makes some fall slower here on Earth.",
        visual: {
          type: "compare",
          left: { title: "On Earth (with air)", points: ["Hammer falls fast", "Feather drifts slowly", "Air pushes up on the wide, light feather"] },
          right: { title: "On the Moon (no air)", points: ["Hammer falls", "Feather falls", "They land at the same moment (1971)"] },
        },
        probe: {
          type: "sort",
          prompt: "Drop each pair from the same height, here on Earth. Sort them: will they land at about the same time, or will air resistance slow one down a lot?",
          buckets: ["Land at about the same time", "One is slowed a lot by air"],
          items: [
            { text: "A golf ball and a baseball", bucket: 0 },
            { text: "A marble and a rock", bucket: 0 },
            { text: "A flat sheet of paper and a book", bucket: 1 },
            { text: "A feather and a hammer", bucket: 1 },
            { text: "A crumpled paper ball and a tennis ball", bucket: 0 },
          ],
          hint: "Small, compact objects barely feel air resistance. Wide, light, flat things are slowed a lot.",
          mistakes: [{ match: "A crumpled paper ball and a tennis ball", coach: "Crumpling the paper makes it small and compact, so air hardly slows it. Try it!" }],
          seconds: 40,
        },
        think: {
          q: "On the Moon, a hammer and a feather were dropped together. What happened?",
          choices: ["The hammer landed first", "The feather floated away", "They landed at the same time", "Neither one fell"],
          answer: 2,
          why: "With no air on the Moon, there was no air resistance, so gravity pulled them down at the same rate.",
          hints: [
            "On Earth the hammer would win, but the Moon has no air to slow the feather.",
            "The Moon has gravity, so the feather fell down.",
            "",
            "The Moon has gravity too, so both fell.",
          ],
        },
        approaches: {
          analogy:
            "A parachute and a skydiver are like a feather. Spreading out wide catches lots of air and slows the fall. Tucking into a tight ball catches less air, so you fall faster. Gravity pulls the same; the air makes the difference.",
          example:
            "Drop a flat sheet of paper and a book side by side: the book wins. Now crumple the same sheet into a tight ball and drop them again. They land at nearly the same time. Same paper, same gravity, less air resistance.",
          simpler: {
            q: "What slows a feather down as it falls on Earth?",
            choices: ["Air pushing up on it", "The feather's color"],
            answer: 0,
            why: "Air resistance pushes up on the wide, light feather.",
            hints: ["", "Color has nothing to do with falling. Think about what the feather moves through."],
          },
        },
      },
      {
        title: "A Fair Test: Parachute Drop",
        teach:
          "Engineers design parachutes using what they know about gravity and air. Say you want to test whether a bigger canopy makes a slower fall. In a fair test you change only one thing, the variable you're testing. Here, that's the canopy size. Everything else stays the same: the same weight, the same string length, the same drop height and the same material. You measure the fall time with a stopwatch and repeat each drop three times, because one drop might be a fluke. Watch for failure points too: strings that tangle or a canopy that flips. Each failure tells you what to improve.",
        visual: {
          type: "flip",
          cards: [
            { front: "Variable", back: "Anything that could change in an experiment, like canopy size, weight or drop height." },
            { front: "Fair test", back: "Change only one variable on purpose. Keep all the others the same." },
            { front: "Trials", back: "Repeat each test several times so one lucky or unlucky drop doesn't fool you." },
            { front: "Failure point", back: "The part of a design that breaks or doesn't work, like strings that tangle. Fix it and test again." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "You are testing whether canopy size changes how slowly a parachute falls. Sort each item.",
          buckets: ["Change on purpose", "Keep the same", "Measure"],
          items: [
            { text: "Size of the canopy", bucket: 0 },
            { text: "Weight hanging from the parachute", bucket: 1 },
            { text: "Height you drop it from", bucket: 1 },
            { text: "Length of the strings", bucket: 1 },
            { text: "Time it takes to reach the floor", bucket: 2 },
          ],
          hint: "Change only the one thing you are testing. Everything else stays the same. What you time is what you measure.",
          mistakes: [{ match: "Height you drop it from", coach: "If you changed the height too, you wouldn't know if the canopy or the height made the difference. Keep it the same." }],
          seconds: 40,
        },
        think: {
          q: "Why should you drop each parachute three times?",
          choices: ["To use up more time", "Because one drop might be a fluke", "To make the parachute stronger", "Because three is a lucky number"],
          answer: 1,
          why: "Repeating trials makes sure one odd result doesn't fool you.",
          hints: [
            "Scientists repeat tests for a reason, not just to fill time.",
            "",
            "Dropping it more doesn't make it stronger. It gives you more reliable data.",
            "Luck has nothing to do with it. More trials give better evidence.",
          ],
        },
        approaches: {
          analogy:
            "A fair test is like a race where every runner starts at the same line and runs the same distance. If one runner started ahead, you wouldn't know who was really fastest. Only one thing should be different: the runners.",
          example:
            "Small canopy: 2, 2 and 2 seconds. Big canopy: 3, 4 and 2 seconds... wait, 2 seconds? The strings tangled on that drop. That's a failure point. Fix the strings, drop again, and get 4 seconds. Big canopy wins.",
          simpler: {
            q: "In a fair test, how many things do you change on purpose?",
            choices: ["Just one", "As many as you can"],
            answer: 0,
            why: "Change only one variable, so you know what caused the result.",
            hints: ["", "If you change many things at once, you can't tell which one made the difference."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps of a fair parachute test in order.",
      steps: [
        "Ask a question: does a bigger canopy make a slower fall?",
        "Build two parachutes that are the same except for canopy size",
        "Drop each one from the same height with the same weight",
        "Time each drop and repeat three times",
        "Look for failure points, like tangled strings, and fix them",
        "Compare the times and draw a conclusion",
      ],
    },
    explain: {
      prompt: "A friend says, 'In Australia, things must fall up, because they are on the bottom of the Earth.' Explain what really happens and why.",
      keyPoints: [
        "Gravity pulls objects toward the center of the Earth",
        "Down means toward Earth's center everywhere",
        "A ball dropped in Australia falls down, just like here",
        "Earth's huge mass makes its gravity strong",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "No matter where you stand on Earth, gravity pulls you toward Earth's {0}. A feather falls slower than a hammer on Earth because of air {1}.",
        blanks: [{ answers: ["center"] }, { answers: ["resistance"] }],
        bank: ["center", "resistance", "surface", "magnetism", "pressure"],
        hint: "Down means toward the middle of the planet. The push of air against a falling object has a special name.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A parachute is dropped three times. The fall times are 3 seconds, 4 seconds and 5 seconds. What is the average (mean) fall time, in seconds?",
        answer: 4,
        unit: "seconds",
        hint: "Add the three times, then divide by 3.",
        mistakes: [{ match: "12", coach: "That is the total. Divide it by the number of drops, 3." }],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Testing whether the drop height changes the fall time. Sort each variable.",
        buckets: ["Change on purpose", "Keep the same"],
        items: [
          { text: "Drop height", bucket: 0 },
          { text: "Canopy size", bucket: 1 },
          { text: "Weight", bucket: 1 },
          { text: "Canopy material", bucket: 1 },
        ],
        hint: "This time the question is about height. Only height changes.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the statements that are TRUE about gravity.",
        sentences: [
          "Gravity pulls objects toward the center of the Earth.",
          "Gravity only works on heavy objects.",
          "Without air, a hammer and a feather fall at the same rate.",
          "In Australia, gravity pulls objects up into space.",
          "Your weight measures how hard gravity pulls on you.",
        ],
        correct: [0, 2, 4],
        hint: "Remember: toward the center, the hammer and feather on the Moon, and what weight means.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which direction does Earth's gravity pull objects?",
        choices: ["Toward the North Pole", "Toward Earth's center", "Toward the Sun", "Toward the ocean"],
        answer: 1,
        why: "Gravity pulls everything toward Earth's center, which is down for everyone.",
      },
      {
        q: "Why does a feather fall slower than a hammer on Earth?",
        choices: ["Gravity doesn't pull feathers", "Air pushes up on the wide, light feather", "Feathers are magnetic", "Hammers have their own engines"],
        answer: 1,
        why: "Air resistance slows the feather. On the Moon, with no air, they fall together.",
      },
      {
        q: "You're testing if canopy size changes fall time. What must you keep the same?",
        choices: ["The canopy size", "Nothing", "The drop height and the weight", "Only the color"],
        answer: 2,
        why: "In a fair test, only the variable you're testing (canopy size) changes.",
      },
      {
        q: "During a test, a parachute's strings tangle every time. What is this called?",
        choices: ["A failure point", "A fair test", "A variable", "Gravity"],
        answer: 0,
        why: "A failure point is a part of the design that doesn't work. Engineers fix it and test again.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, build two parachutes from a plastic bag, string and a small weight like a metal washer. Make them the same except for canopy size (for example 20 cm and 40 cm squares). Drop each one from the same safe height three times, time each drop, and record the results in a table. Find the average for each, note any failure points, and explain which design falls slower and why.",
      rubric: [
        "Built two parachutes that differ only in canopy size",
        "Dropped each from the same height three times",
        "Recorded times in a table and found averages",
        "Noted at least one failure point and how to fix it",
        "Explained the result using gravity and air resistance",
      ],
    },
  },

  // 6. The Sun, shadows, day and night, and the stars
  {
    id: "sci-5.sky",
    title: "Sun, Shadows and Stars",
    minutes: 35,
    stage: "logic",
    standards: ["5-ESS1-1", "5-ESS1-2"],
    read: [
      "The Sun is a star. It looks much bigger and brighter than the stars we see at night, but not because it is the biggest star. It looks brightest because it is the closest. The Sun is about 93 million miles (150 million kilometers) from Earth. The next closest star is about 270,000 times farther away. Many stars are bigger and give off more light than our Sun, but they are so far away that they look like tiny points.",
      "Every day, the Sun seems to rise in the east, cross the sky and set in the west. But the Sun is not really moving across our sky. Earth spins on its axis, an imaginary line through the North and South Poles, once about every 24 hours. When your side of Earth faces the Sun, it is day. When your side faces away, it is night.",
      "Because the Sun's place in the sky changes, shadows change through the day. In the morning, the Sun is low in the east, so shadows are long and point west. Around midday, the Sun is highest, so shadows are shortest. In the United States they point north at that time. In the late afternoon, shadows grow long again and point east. Scientists measure shadows and graph them to see this daily pattern.",
      "Earth also travels around the Sun, one trip each year. As Earth moves along its path, the night side of Earth faces different directions in space. That is why we see different stars in different seasons. In North America, the constellation Orion shines in the evening sky in winter, and Scorpius shows up on summer evenings.",
    ].join("\n\n"),
    keyIdeas: [
      "The Sun is a star; it looks brightest because it is much closer than any other star.",
      "Earth spins once about every 24 hours, causing day and night.",
      "Shadows are long in the morning and evening and shortest around midday.",
      "As Earth orbits the Sun, we see different stars in different seasons.",
    ],
    hook: {
      text: "On a clear night, step outside and look up. You might see thousands of stars, each a tiny twinkling dot. Yet one star lights up the whole sky every day and warms the entire planet. Which star is it, and why does it look so much brighter than all the rest?",
    },
    teach: [
      {
        title: "The Sun Is a Star",
        teach:
          "The Sun is a star, a giant ball of hot, glowing gas. It looks huge and blinding compared with the stars at night, but it's actually a medium-sized star. Many stars are much bigger and give off far more light. So why does the Sun look so bright? Distance! The Sun is about 93 million miles from Earth. The next closest star is about 270,000 times farther away. The farther away a light is, the dimmer it looks. A flashlight shining in your face is dazzling. The same flashlight across a football field is just a small dot.",
        visual: {
          type: "compare",
          left: { title: "The Sun", points: ["A medium-sized star", "About 93 million miles away", "Closest star to Earth", "Looks huge and very bright"] },
          right: { title: "Other stars", points: ["Some are much bigger and brighter", "Many trillions of miles away", "Look like tiny points of light", "Only visible at night"] },
        },
        probe: {
          type: "cloze",
          text: "The Sun looks brighter than other stars because it is much {0} to Earth. Many other stars are {1} than the Sun but look dim because they are so far away.",
          blanks: [{ answers: ["closer"] }, { answers: ["bigger", "brighter"] }],
          bank: ["closer", "bigger", "farther", "smaller", "colder"],
          hint: "Think about the flashlight up close and across a football field. Distance changes how bright a light looks.",
          mistakes: [
            { match: "farther", coach: "If the Sun were farther, it would look dimmer. It looks bright because it's close." },
            { match: "smaller", coach: "Some stars really are bigger than the Sun. They only look tiny because they're so far away." },
          ],
          seconds: 30,
        },
        think: {
          q: "Why does the Sun look so much brighter than other stars?",
          choices: ["It is the biggest star in the universe", "It is much closer to Earth", "It is the only star that makes light", "Other stars are turned off in the day"],
          answer: 1,
          why: "The Sun is far closer than any other star, so its light looks much brighter.",
          hints: [
            "The Sun is a medium-sized star. Many stars are much bigger.",
            "",
            "All stars make their own light. The night stars are just very far away.",
            "The other stars are still shining in the daytime. The Sun's bright light hides them.",
          ],
        },
        approaches: {
          analogy:
            "Streetlights along a long road are all the same brightness. The one next to you is dazzling. The one a mile away is a small dot. Stars are like that: the Sun is the streetlight right next to us.",
          example:
            "A star called Rigel, in the constellation Orion, gives off many thousands of times more light than our Sun. But it is hundreds of light-years away, so to us it looks like just one dot among many at night.",
          simpler: {
            q: "Does a light look brighter when it is close or far away?",
            choices: ["Close", "Far away"],
            answer: 0,
            why: "Lights look brighter when they are closer.",
            hints: ["", "Think of car headlights: tiny dots far away, blinding when close."],
          },
        },
      },
      {
        title: "Day and Night",
        teach:
          "Each morning the Sun seems to rise in the east. It climbs across the sky and sets in the west. But the Sun isn't really circling us. Earth is spinning! Earth turns on its axis, an imaginary line through the North and South Poles, once about every 24 hours. When your side of Earth turns toward the Sun, it's day. As it turns away, the Sun seems to set, and it becomes night. Right now, while it's daytime for you, it's nighttime for kids on the opposite side of the world.",
        visual: {
          type: "hotspots",
          title: "Earth spins: day and night",
          center: "🌍",
          spots: [
            { label: "Axis", icon: "📍", detail: "An imaginary line through the North and South Poles. Earth spins around it." },
            { label: "Day side", icon: "☀️", detail: "The half of Earth facing the Sun has daytime." },
            { label: "Night side", icon: "🌙", detail: "The half facing away from the Sun has night." },
            { label: "24 hours", icon: "🕛", detail: "Earth turns all the way around about once every 24 hours: one day and one night." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put one day in order, as Earth spins.",
          steps: [
            "The Sun appears to rise in the east",
            "The Sun climbs higher in the sky",
            "The Sun is at its highest around midday",
            "The Sun sinks lower toward the west",
            "The Sun sets and night begins",
          ],
          hint: "The Sun appears in the east, gets highest around midday, and goes down in the west.",
          seconds: 30,
        },
        think: {
          q: "What causes day and night?",
          choices: ["The Sun moving around Earth every day", "Earth spinning on its axis", "The Moon blocking the Sun", "Clouds covering the Sun"],
          answer: 1,
          why: "Earth spins once about every 24 hours, turning each place toward and then away from the Sun.",
          hints: [
            "It looks like the Sun moves, but it's actually Earth that turns.",
            "",
            "The Moon only rarely blocks the Sun, during an eclipse. Night happens every day.",
            "Clouds can make it gray, but not dark like night.",
          ],
        },
        approaches: {
          analogy:
            "Sit on a spinning office chair in a room with one lamp. As you turn, the lamp seems to slide past you, then disappear behind you, then come back. The lamp never moved. You did. That's day and night.",
          example:
            "At noon in New York, it is about midnight in parts of Asia on the other side of the world. As Earth keeps turning, New York rolls into night while those places roll into morning.",
          simpler: {
            q: "How long does it take Earth to spin around once?",
            choices: ["About 1 hour", "About 24 hours", "About 1 year"],
            answer: 1,
            why: "One full spin takes about 24 hours: one day and night.",
            hints: ["That's much too fast. A full day and night take longer.", "", "One year is how long Earth takes to go around the Sun, not to spin once."],
          },
        },
      },
      {
        title: "Shadow Patterns",
        teach:
          "A shadow forms when an object blocks light. Outdoors, shadows always point away from the Sun. In the morning, the Sun is low in the east, so shadows are long and point west. As the Sun climbs higher, shadows get shorter. Around midday, the Sun is highest and shadows are shortest. In the United States, the midday shadow points north. In the afternoon, the Sun sinks toward the west, and shadows stretch long again, pointing east. Scientists measure a stick's shadow every hour and graph the lengths. The graph makes a valley shape: long, short, long.",
        visual: {
          type: "compare",
          left: { title: "Morning and evening", points: ["Sun is low in the sky", "Shadows are long", "Morning shadows point west", "Evening shadows point east"] },
          right: { title: "Around midday", points: ["Sun is highest in the sky", "Shadows are shortest", "In the U.S., shadows point north"] },
        },
        probe: {
          type: "number",
          prompt: "A class measured a stick's shadow. At 9 a.m. it was 80 cm long. At about noon it was 30 cm long. How many centimeters shorter was the noon shadow?",
          answer: 50,
          unit: "cm",
          hint: "Subtract the noon length from the morning length.",
          mistakes: [{ match: "110", coach: "That adds them. The difference is 80 - 30." }],
          seconds: 25,
        },
        think: {
          q: "When is your shadow shortest on a sunny day?",
          choices: ["Early morning", "Around midday", "Late afternoon", "Just before sunset"],
          answer: 1,
          why: "The Sun is highest around midday, so shadows are shortest.",
          hints: [
            "In the early morning the Sun is low, which makes shadows long.",
            "",
            "In late afternoon the Sun is getting low again, so shadows grow longer.",
            "Near sunset the Sun is very low, making the longest shadows.",
          ],
        },
        approaches: {
          analogy:
            "Shine a flashlight straight down on a toy: tiny shadow. Now hold the flashlight low, off to the side: long, stretched shadow. The Sun acts like that flashlight, low in the morning and evening, high at midday.",
          example:
            "Shadow lengths of a stick: 8 a.m. 120 cm, 10 a.m. 60 cm, noon 30 cm, 2 p.m. 55 cm, 4 p.m. 110 cm. On a graph, the line dips down toward midday and climbs back up.",
          simpler: {
            q: "When the Sun is low in the sky, shadows are...",
            choices: ["Long", "Short"],
            answer: 0,
            why: "A low Sun makes long shadows.",
            hints: ["", "Think of evening shadows stretching across a field. A low Sun makes them longer."],
          },
        },
      },
      {
        title: "Stars Change with the Seasons",
        teach:
          "Earth doesn't only spin. It also travels in a giant path, called an orbit, around the Sun. One trip takes a year. At night, our side of Earth faces away from the Sun, out into space. As Earth moves along its orbit, the night side faces different directions, so we see different stars in different seasons. In North America, the constellation Orion, with its three bright belt stars in a row, shines in the evening sky in winter. In summer, Orion is gone from the night sky, and Scorpius, with its curved tail, appears in the south.",
        visual: { type: "seasons" },
        probe: {
          type: "match",
          prompt: "Match each sky event to what causes it.",
          pairs: [
            { left: "Day and night", right: "Earth spinning on its axis" },
            { left: "Different stars in different seasons", right: "Earth orbiting the Sun" },
            { left: "Shadows changing length during the day", right: "The Sun's height in the sky changing" },
          ],
          hint: "A spin takes a day. An orbit takes a year. Shadows depend on how high the Sun is.",
          seconds: 35,
        },
        think: {
          q: "Why can we see Orion on winter evenings but not on summer evenings?",
          choices: ["Orion moves away in summer", "Earth's orbit makes our night side face different stars", "Summer clouds hide it", "Orion only shines in cold weather"],
          answer: 1,
          why: "As Earth orbits the Sun, our night sky faces a different part of space each season.",
          hints: [
            "The stars of Orion stay in the same place. It's Earth that moves.",
            "",
            "Clear summer nights still don't show Orion in the evening.",
            "Stars are far beyond Earth's weather. Temperature here doesn't change them.",
          ],
        },
        approaches: {
          analogy:
            "Walk in a circle around a lamp in the middle of a room, always facing away from the lamp. As you go around, you see a different wall: the window, then the door, then the bookshelf. Earth's night side 'sees' different stars the same way.",
          example:
            "In January, look south in the evening and find three bright stars in a line: Orion's belt. Look at the same time in July and Orion is gone; instead, the curved stars of Scorpius may be low in the south.",
          simpler: {
            q: "How long does Earth take to go around the Sun once?",
            choices: ["One day", "One year"],
            answer: 1,
            why: "One orbit around the Sun takes about one year.",
            hints: ["One day is one spin on Earth's axis, not one trip around the Sun.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it caused by Earth spinning (every day) or Earth orbiting the Sun (through the year)?",
      buckets: ["Earth spinning (daily pattern)", "Earth orbiting (yearly pattern)"],
      items: [
        { text: "The Sun rises in the east and sets in the west", bucket: 0 },
        { text: "Shadows are long in the morning and short at midday", bucket: 0 },
        { text: "Day turns into night", bucket: 0 },
        { text: "Orion appears on winter evenings", bucket: 1 },
        { text: "Scorpius appears on summer evenings", bucket: 1 },
        { text: "The night stars change through the year", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain to a friend why the Sun looks so much brighter than other stars, and why your shadow changes during the day.",
      keyPoints: [
        "The Sun is a star",
        "The Sun is much closer than any other star",
        "Earth spins, so the Sun seems to move across the sky",
        "Shadows are long when the Sun is low and short when it is high",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "A stick's shadow was measured. Place each shadow length on the line: 8 a.m. was 120 cm, noon was 30 cm, and 4 p.m. was 110 cm.",
        min: 0,
        max: 150,
        step: 5,
        tolerance: 5,
        items: [
          { label: "8 a.m.", value: 120 },
          { label: "Noon", value: 30 },
          { label: "4 p.m.", value: 110 },
        ],
        hint: "Read each length from the prompt and place it on the line. Notice the noon shadow is the shortest.",
        seconds: 35,
      },
      {
        type: "target",
        prompt: "Orion shines in the evening sky in winter. Use the orbit model to find a month when the Northern Hemisphere has winter.",
        goal: { sim: "seasons", season: "winter" },
        hint: "In the Northern Hemisphere, winter is around December, January and February.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Earth spins once about every {0} hours, which causes day and night. It orbits the Sun once every {1}.",
        blanks: [{ answers: ["24"] }, { answers: ["year"] }],
        bank: ["24", "12", "year", "month", "week"],
        hint: "One spin is one day and night. One orbit is one trip around the Sun.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the TRUE statements.",
        sentences: [
          "The Sun is the biggest star in the universe.",
          "The Sun looks bright because it is the closest star to Earth.",
          "Shadows are shortest around midday.",
          "The Sun really moves around Earth each day.",
          "We see different stars in different seasons.",
        ],
        correct: [1, 2, 4],
        hint: "Remember: distance, the midday Sun, Earth spinning, and Earth's orbit.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Why does the Sun look brighter than other stars?",
        choices: ["It is the hottest star", "It is the biggest star", "It is the oldest star", "It is the closest star"],
        answer: 3,
        why: "The Sun is much closer to Earth than any other star.",
      },
      {
        q: "What causes day and night?",
        choices: ["Earth spinning on its axis", "Earth orbiting the Sun", "The Moon's phases", "Clouds"],
        answer: 0,
        why: "Earth spins about once every 24 hours, turning toward and away from the Sun.",
      },
      {
        q: "In the morning, which way do shadows point?",
        choices: ["East", "West", "Straight up", "Toward the Sun"],
        answer: 1,
        why: "The morning Sun is in the east, and shadows point away from the Sun, toward the west.",
      },
      {
        q: "Why do we see Orion in winter but not in summer evenings?",
        choices: ["Orion turns off in summer", "Earth's orbit around the Sun changes which stars face our night side", "The Moon hides Orion", "Orion is too hot in summer"],
        answer: 1,
        why: "As Earth orbits the Sun, our night sky faces a different part of space.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "On a sunny day, with a grown-up, stand a stick or pencil upright in clay or soil outside. Measure the length of its shadow and note the direction it points at least four times during the day (for example 9 a.m., 11 a.m., 1 p.m. and 3 p.m.). Make a bar graph of the lengths. Then, on a clear evening, try to find Orion (winter) or Scorpius (summer).",
      rubric: [
        "Measured the shadow at least four times",
        "Recorded the length and direction each time",
        "Made a bar graph of the shadow lengths",
        "Explained the pattern using the Sun's height in the sky",
        "Looked for a seasonal constellation and wrote what they saw",
      ],
    },
  },

  // 7. Protecting Earth's resources with engineering
  {
    id: "sci-5.protect",
    title: "Protecting Earth: Engineer a Solution",
    minutes: 35,
    stage: "rhetoric",
    standards: ["5-ESS3-1", "3-5-ETS1-1", "3-5-ETS1-2", "3-5-ETS1-3"],
    read: [
      "People depend on Earth's resources: clean water, rich soil, fresh air, forests and minerals. Communities use science to take care of them, so they last for our grandchildren too.",
      "In the 1930s, years of dry weather and plowing that left soil bare turned parts of the Great Plains into the Dust Bowl. Huge dust storms blew away tons of good farm soil. Farmers learned new ways to protect the land. They planted rows of trees as windbreaks, plowed along the curves of hills, and grew cover crops to hold the soil in place. Today, many towns run water treatment plants that clean water before it reaches homes, and wastewater plants that clean it again before it returns to rivers. Families recycle cans and paper, compost food scraps, fix leaky faucets and turn off lights they are not using.",
      "Many of these solutions were designed by engineers. Engineers solve problems using a step-by-step process. First, they define the problem. They list the criteria, which are what a good solution must do, and the constraints, which are the limits, like time, cost and available materials.",
      "Next, they brainstorm many possible solutions and compare them. Which ideas meet the criteria best? Which fit within the constraints? Then they build a model, or prototype, and test it. A fair test changes only one thing at a time.",
      "Tests show failure points, the places where a design doesn't work well. Engineers fix those parts and test again. Improving a design over and over is a normal part of engineering, not a sign of failure. Thomas Edison's team tested thousands of materials before finding a long-lasting filament for the electric light bulb.",
    ].join("\n\n"),
    keyIdeas: [
      "Communities use science to protect soil, water, air and other resources.",
      "Engineers define a problem with criteria (what it must do) and constraints (limits).",
      "Good engineers brainstorm several solutions and compare them before building.",
      "Testing finds failure points; improving and retesting is part of the process.",
    ],
    hook: {
      text: "In the 1930s, giant clouds of dust rolled across the Great Plains, so thick they blocked out the Sun. Farm soil blew away by the ton. People had a big problem to solve. How did they save the land, and how do engineers solve problems like this today?",
    },
    teach: [
      {
        title: "Communities Protect Resources",
        teach:
          "Natural resources are things from nature that people use, like water, soil, air, forests and minerals. Communities use science to protect them. After the Dust Bowl of the 1930s, farmers planted rows of trees called windbreaks to slow the wind, plowed along the curves of hills so rain wouldn't wash soil away, and grew cover crops to hold the soil in place. Today, water treatment plants clean river and lake water before it reaches our faucets. Recycling saves metal, paper and energy. Composting turns food scraps into rich soil. Small habits help too, like fixing leaky faucets.",
        visual: {
          type: "hotspots",
          title: "Ways communities protect resources",
          center: "🌎",
          spots: [
            { label: "Windbreaks", icon: "🌲", detail: "Rows of trees slow the wind so it can't blow farm soil away." },
            { label: "Water treatment", icon: "🚰", detail: "Plants filter and clean water so it's safe to drink." },
            { label: "Recycling", icon: "♻️", detail: "Old cans, glass and paper are made into new products, saving resources and energy." },
            { label: "Composting", icon: "🪱", detail: "Food scraps and leaves break down into rich soil for gardens." },
            { label: "Saving water", icon: "💧", detail: "Fixing leaks and turning off the tap keeps scarce fresh water from being wasted." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each problem to a way people solve it.",
          pairs: [
            { left: "Wind blowing farm soil away", right: "Plant rows of trees as windbreaks" },
            { left: "Dirty river water", right: "Clean it at a water treatment plant" },
            { left: "Food scraps filling the trash", right: "Compost them into soil" },
            { left: "A dripping faucet wasting water", right: "Fix the leak" },
            { left: "Empty aluminum cans", right: "Recycle them into new cans" },
          ],
          hint: "Think about which solution fits each resource: soil, water, trash, cans.",
          seconds: 40,
        },
        think: {
          q: "After the Dust Bowl, why did farmers plant rows of trees along their fields?",
          choices: ["To sell the wood", "To slow the wind and keep soil from blowing away", "To make more shade for cows", "To attract more rain clouds"],
          answer: 1,
          why: "Windbreaks slow the wind near the ground, so less soil blows away.",
          hints: [
            "The trees were planted to protect the fields, not to be cut down.",
            "",
            "Shade is a bonus, but the big problem was blowing soil.",
            "Trees don't call rain clouds. Their job here was to slow the wind.",
          ],
        },
        approaches: {
          analogy:
            "A windbreak works like standing behind a big friend on a windy day. Your friend takes the blast, and you stay calm behind them. The trees take the wind, and the soil stays put behind them.",
          example:
            "A town's water starts in a river. At the treatment plant, it settles so mud sinks, flows through filters of sand and gravel, and is disinfected to kill germs. Then it travels through pipes to kitchen faucets, clean and safe.",
          simpler: {
            q: "Which of these protects a natural resource?",
            choices: ["Leaving the faucet running", "Recycling aluminum cans", "Leaving soil bare in the wind"],
            answer: 1,
            why: "Recycling saves metal and the energy needed to make new cans.",
            hints: ["Leaving the faucet running wastes water.", "", "Bare soil blows away easily. That hurts the land."],
          },
        },
      },
      {
        title: "Define the Problem",
        teach:
          "Engineers start by defining the problem clearly. Let's try one: a camp's water comes from a muddy stream. Before it can be boiled to make it safe, the mud needs to be filtered out. The criteria are what a good solution must do: the water must come out clearer, and the filter must process a cup of water in under five minutes. The constraints are the limits: you can use only sand, gravel, cotton balls, a coffee filter and a plastic bottle, and you have one hour to build it. Clear criteria and constraints help you judge every idea fairly.",
        visual: {
          type: "compare",
          left: { title: "Criteria (what it must do)", points: ["Water comes out clearer", "Filters a cup in under 5 minutes", "Doesn't leak"] },
          right: { title: "Constraints (the limits)", points: ["Only sand, gravel, cotton, a coffee filter and a bottle", "One hour to build", "No money to spend"] },
        },
        probe: {
          type: "sort",
          prompt: "You're designing a water filter. Sort each item: is it a criterion or a constraint?",
          buckets: ["Criterion (what it must do)", "Constraint (a limit)"],
          items: [
            { text: "The water must come out clearer", bucket: 0 },
            { text: "It must filter a cup in under 5 minutes", bucket: 0 },
            { text: "It must not leak", bucket: 0 },
            { text: "You can only use sand, gravel and cotton", bucket: 1 },
            { text: "You have one hour to build it", bucket: 1 },
            { text: "It can cost no more than $5", bucket: 1 },
          ],
          hint: "Criteria describe the goals for how well it works. Constraints are limits on materials, time and money.",
          seconds: 40,
        },
        think: {
          q: "'You may spend no more than $5' is an example of...",
          choices: ["A criterion", "A constraint", "A failure point", "A conclusion"],
          answer: 1,
          why: "A spending limit is a constraint: a limit on the design.",
          hints: [
            "Criteria describe what the solution must do. Money limits are something else.",
            "",
            "A failure point is something that goes wrong during a test.",
            "A conclusion comes at the end, after testing.",
          ],
        },
        approaches: {
          analogy:
            "Planning a birthday party has criteria and constraints too. Criteria: everyone has fun and gets cake. Constraints: only $40, the party must end by 5 p.m., and the house holds 12 people.",
          example:
            "Problem: a lunchbox keeps squishing sandwiches. Criteria: the sandwich arrives unsquished; it fits in a backpack. Constraints: use only cardboard and tape; build it in 30 minutes.",
          simpler: {
            q: "What a solution must do is called a...",
            choices: ["Criterion", "Constraint"],
            answer: 0,
            why: "Criteria are the goals a solution must meet.",
            hints: ["", "Constraints are the limits, like time and money, not the goals."],
          },
        },
      },
      {
        title: "Many Ideas, Then Compare",
        teach:
          "Good engineers don't build their first idea. They brainstorm several possible solutions, then compare them against the criteria and constraints. For our water filter, Design A uses only a coffee filter. It's fast, but the water is still cloudy. Design B layers gravel, sand and cotton in a bottle. The water comes out much clearer and takes about three minutes. Design C uses a cloth towel, which the rules don't allow, so it breaks a constraint. Comparing them side by side, Design B best meets the criteria while staying inside the constraints, so the team builds and tests it first.",
        visual: {
          type: "compare",
          left: { title: "Design B: gravel, sand, cotton", points: ["Water much clearer", "About 3 minutes per cup", "Uses only allowed materials", "Best choice to build first"] },
          right: { title: "Design A: coffee filter only", points: ["Fast", "Water still cloudy", "Uses allowed materials", "Misses the clearer-water criterion"] },
        },
        probe: {
          type: "highlight",
          prompt: "Criteria: the water comes out clearer, in under 5 minutes. Constraint: use only sand, gravel, cotton, a coffee filter and a bottle. Tap EVERY design that meets all the criteria and the constraint.",
          sentences: [
            "Design A: a coffee filter only. Fast, but the water is still cloudy.",
            "Design B: gravel, sand and cotton in a bottle. Much clearer water in 3 minutes.",
            "Design C: a cloth towel. Clear water in 4 minutes.",
            "Design D: sand and a coffee filter in a bottle. Clearer water in 4 minutes.",
            "Design E: cotton balls packed tight. Very clear water, but it takes 20 minutes.",
          ],
          correct: [1, 3],
          hint: "Check each design against all three rules: clearer water, under 5 minutes, and only allowed materials.",
          mistakes: [{ match: "Design C: a cloth towel. Clear water in 4 minutes.", coach: "Design C works, but a cloth towel isn't on the allowed list. It breaks a constraint." }],
          seconds: 50,
        },
        think: {
          q: "Why do engineers brainstorm several ideas before building one?",
          choices: ["To waste less time thinking", "So they can compare and pick the one that best meets the criteria and constraints", "Because the first idea is always wrong", "So they can build all of them at once"],
          answer: 1,
          why: "Comparing several ideas helps engineers choose the most promising one.",
          hints: [
            "Brainstorming actually takes some time, but it saves time later.",
            "",
            "The first idea might be good, but you can't know until you compare.",
            "Building everything wastes materials. Engineers compare first, then pick.",
          ],
        },
        approaches: {
          analogy:
            "Choosing a design is like choosing a route to a friend's house. You think of three ways, then compare: which is shortest, safest and allowed for bikes? You pick the best one before you start pedaling.",
          example:
            "Bridge ideas for a model across a gap: a flat strip of cardboard (sags), a folded cardboard beam (strong, uses little tape), and a tower of books (not allowed). The folded beam meets the criteria within the constraints, so build it first.",
          simpler: {
            q: "Design C uses a material that isn't allowed. Does it meet the constraints?",
            choices: ["No", "Yes"],
            answer: 0,
            why: "Using a material that isn't allowed breaks a constraint.",
            hints: ["", "Constraints are the rules about materials. A material not on the list breaks the rules."],
          },
        },
      },
      {
        title: "Test, Find Failure Points, Improve",
        teach:
          "Once a prototype is built, engineers test it. A fair test changes only one variable at a time. Say the team tests Design B with three different sand layers, keeping the gravel, cotton and amount of muddy water the same. Testing also reveals failure points. Maybe water rushes down the side of the bottle without going through the sand. That's a failure point! The team packs the sand tighter and tests again. Improving and retesting is a normal part of engineering. Remember, though: filtering makes water clearer, but it doesn't kill germs. Water must also be boiled or treated before anyone drinks it.",
        visual: {
          type: "flip",
          cards: [
            { front: "Prototype", back: "A first working model of a design, built to be tested." },
            { front: "Fair test", back: "Change only one variable, like the thickness of the sand layer. Keep the rest the same." },
            { front: "Failure point", back: "Where a design doesn't work, like water slipping down the side of the bottle." },
            { front: "Improve", back: "Fix the failure point, then test again. Repeat until the design meets the criteria." },
            { front: "Safety", back: "Filtering makes water clearer but does not kill germs. It must be boiled or treated to be safe to drink." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the engineering design process in order.",
          steps: [
            "Define the problem: list the criteria and constraints",
            "Brainstorm several possible solutions",
            "Compare the ideas and choose the most promising one",
            "Build a prototype",
            "Test it with fair tests and find failure points",
            "Improve the design and test again",
          ],
          hint: "First understand the problem, then think of ideas, choose one, build it, test it, and improve it.",
          seconds: 40,
        },
        think: {
          q: "Water slips down the inside of the bottle without passing through the sand. What should the team do?",
          choices: ["Give up on the project", "Call it a failure point, fix it and test again", "Ignore it and drink the water", "Start a completely different project"],
          answer: 1,
          why: "Finding and fixing failure points is how engineers improve a design.",
          hints: [
            "Failure points are normal and useful. They show what to fix.",
            "",
            "Ignoring a problem won't make the filter work, and filtered water still needs to be boiled or treated before drinking.",
            "The design is close. Fixing one part is better than starting over.",
          ],
        },
        approaches: {
          analogy:
            "Learning to ride a bike is like engineering. You wobble (test), notice you lean too far left (failure point), adjust (improve), and try again. Each try gets better.",
          example:
            "Test 1: the water is clearer, but some gushes down the side. Fix: pack the sand tighter and add a cotton seal at the edge. Test 2: all the water passes through the sand and comes out much clearer. The design now meets the criteria.",
          simpler: {
            q: "After you test a design and find a problem, what's the next step?",
            choices: ["Improve it and test again", "Throw it away"],
            answer: 0,
            why: "Engineers fix problems and retest.",
            hints: ["", "Throwing it away wastes what you learned. Fix the problem and test again."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each step of the water filter project into the part of the engineering process it belongs to.",
      buckets: ["Define the problem", "Brainstorm and compare", "Test and improve"],
      items: [
        { text: "Decide the water must come out clearer in under 5 minutes", bucket: 0 },
        { text: "List the materials you are allowed to use", bucket: 0 },
        { text: "Sketch three different filter designs", bucket: 1 },
        { text: "Make a chart showing how well each idea meets the goals", bucket: 1 },
        { text: "Pour muddy water through the prototype and time it", bucket: 2 },
        { text: "Notice water leaking down the side and pack the sand tighter", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain how an engineer would design a filter to clean muddy water. Use the words criteria, constraints and failure point.",
      keyPoints: [
        "Define the problem with criteria (what it must do)",
        "List the constraints, the limits like materials, time and cost",
        "Brainstorm and compare several designs",
        "Build and test with a fair test",
        "Find failure points, improve and test again",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "What a solution must do are its {0}. The limits, like time and money, are its {1}. A part of a design that doesn't work is a {2} point.",
        blanks: [{ answers: ["criteria"] }, { answers: ["constraints"] }, { answers: ["failure"] }],
        bank: ["criteria", "constraints", "failure", "variables", "starting"],
        hint: "Criteria are goals. Constraints are limits. Engineers look for failure points when testing.",
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Which resource does each action protect?",
        buckets: ["Soil", "Water"],
        items: [
          { text: "Planting a windbreak of trees", bucket: 0 },
          { text: "Growing cover crops in winter", bucket: 0 },
          { text: "Plowing along the curves of a hill", bucket: 0 },
          { text: "Fixing a leaky faucet", bucket: 1 },
          { text: "Cleaning river water at a treatment plant", bucket: 1 },
          { text: "Turning off the tap while brushing your teeth", bucket: 1 },
        ],
        hint: "Windbreaks, cover crops and contour plowing keep soil from blowing or washing away. The others save or clean water.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "A filter design was tested three times. It took 4 minutes, 3 minutes and 5 minutes to filter one cup. What was the average time, in minutes?",
        answer: 4,
        unit: "minutes",
        hint: "Add the three times and divide by 3.",
        mistakes: [{ match: "12", coach: "12 is the total. Divide it by 3 to find the average." }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order for improving a design.",
        steps: [
          "Test the prototype",
          "Find the failure point",
          "Change the design to fix it",
          "Test it again",
        ],
        hint: "You have to test first to find what fails. Then fix it, then test again.",
        seconds: 20,
      },
    ],
    check: [
      {
        q: "Which is a CONSTRAINT for a water filter project?",
        choices: ["The water must come out clearer", "You may use only sand, gravel and cotton", "It must filter quickly", "It must not leak"],
        answer: 1,
        why: "Limits on materials are constraints. The others are criteria.",
      },
      {
        q: "How did farmers protect their soil after the Dust Bowl?",
        choices: ["They stopped growing food", "They planted windbreaks and cover crops", "They moved all the soil indoors", "They painted the fields"],
        answer: 1,
        why: "Windbreaks slowed the wind and cover crops held the soil in place.",
      },
      {
        q: "What should engineers do after finding a failure point?",
        choices: ["Give up", "Hide it", "Fix it and test again", "Build a different project"],
        answer: 2,
        why: "Improving and retesting is part of the engineering process.",
      },
      {
        q: "Water from a homemade sand filter looks clear. Is it safe to drink?",
        choices: ["Yes, clear water is always safe", "Yes, if it was filtered twice", "No, it must also be boiled or treated to kill germs", "Only if it is cold"],
        answer: 2,
        why: "Filters remove dirt but not germs. Boiling or treatment makes water safe.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, design and build a water filter. Mix some soil into a jar of water. Define the problem (write your criteria and constraints), sketch at least two designs, and build the best one from a cut plastic bottle with gravel, sand, cotton balls and a coffee filter. Test it, find a failure point, improve it, and test again. Compare the water before and after. Do NOT drink the water: filtering doesn't kill germs.",
      rubric: [
        "Wrote clear criteria and constraints",
        "Sketched and compared at least two designs",
        "Built and tested a prototype",
        "Found a failure point, improved the design and retested",
        "Explained the results and that filtered water is not safe to drink without boiling or treatment",
      ],
    },
  },
]);
