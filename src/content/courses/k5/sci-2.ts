import { k5Course } from "./base";

/**
 * sci-2: Grade 2 science (NGSS). Six lessons through the year: materials and
 * their properties, pieces and heating and cooling, what plants need and their
 * animal helpers, habitats and biodiversity, land and water, and Earth's fast
 * and slow changes with K-2 engineering design. Written for the ear: the
 * teacher reads everything aloud.
 */
export const sci2 = k5Course("sci", 2, [
  // 1. Materials and their properties
  {
    id: "sci-2.materials",
    title: "What Is It Made Of?",
    minutes: 20,
    stage: "grammar",
    standards: ["2-PS1-1", "2-PS1-2", "K-2-ETS1-3"],
    read: [
      "Look around you. Everything is made of materials. Wood, metal, plastic, glass, cloth, paper and rubber are all materials.",
      "Each material has properties. A property is something you can notice about it. Is it hard or soft? Is it rough or smooth? Does it bend? Does it float? Can you see through it?",
      "Scientists test materials to learn their properties. They press them. They bend them. They drop them in water. Then they sort the materials into groups.",
      "Properties help us pick the best material for a job. A raincoat needs a material that keeps water out, like plastic or rubber. A window needs a material you can see through, like glass. A pillow needs something soft, like cotton.",
      "When you test two materials, compare the results. The best material is the one whose properties fit the job.",
    ].join("\n\n"),
    keyIdeas: [
      "Everything is made of materials, like wood, metal, plastic, glass and cloth.",
      "A property is something you notice about a material: hard or soft, bendy, floats or sinks, see-through.",
      "We test materials and compare the results to pick the best one for a job.",
    ],
    hook: {
      text: "Imagine a raincoat made of paper. 🌧️ What happens in the rain? It gets soggy and rips! Today we find out why some materials are just right for a job.",
    },
    teach: [
      {
        title: "Materials All Around",
        teach:
          "Everything is made of materials. 🪵 Wood comes from trees. 🔩 Metal comes from rocks dug out of the ground. Glass is made from melted sand. 👕 Cloth is woven from threads. Plastic is made in factories. One object can use many materials. A pencil has wood, a gray middle, a metal ring and a rubber eraser. What do you notice about the things in your room?",
        visual: {
          type: "flip",
          cards: [
            { front: "🪵 Wood", back: "Comes from trees. Hard, and it floats." },
            { front: "🔩 Metal", back: "Comes from rocks dug out of the ground. Hard and shiny." },
            { front: "🪟 Glass", back: "Made from melted sand. You can see through it." },
            { front: "👕 Cloth", back: "Woven from threads. Soft and bendy." },
            { front: "🧴 Plastic", back: "Made in factories. It keeps water out." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each thing to the material it is usually made of.",
          pairs: [
            { left: "🪟 Window", right: "glass" },
            { left: "🧦 Sock", right: "cloth" },
            { left: "🔑 Key", right: "metal" },
            { left: "📄 Page of a book", right: "paper" },
            { left: "🪵 Log", right: "wood" },
          ],
          hint: "Think about what each thing feels like. Is it see-through? Soft? Hard and shiny?",
          mistakes: [{ match: "Key matched to glass", coach: "A key is hard and shiny, and it doesn't break when you drop it. That's metal." }],
          seconds: 40,
        },
        think: {
          q: "What is a window usually made of?",
          choices: ["Wood", "Glass", "Cloth"],
          answer: 1,
          why: "Glass lets light through, so we can see outside.",
          hints: [
            "Wood is hard, but you can't see through it. A wood window would be dark!",
            "",
            "Cloth is soft and you can't see through it well. Rain would come in, too.",
          ],
        },
        approaches: {
          analogy: "Materials are like the ingredients in a recipe. A cake is made of flour, eggs and sugar. A pencil is made of wood, metal and rubber.",
          example: "Look at a chair. The seat is wood. The legs are metal. The cushion is cloth. One chair, three materials!",
          simpler: {
            q: "Can you see through glass?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Glass is see-through. That's why windows are made of it.",
            hints: ["", "Look at a window. You can see the sky through the glass!"],
          },
        },
      },
      {
        title: "Properties: What Do You Notice?",
        teach:
          "A property is something you can notice about a material. 👀 Is it hard or soft? Is it rough or smooth? Does it bend or snap? Does it float or sink? Can you see through it? Scientists find out with tests. Press it. Bend it. Drop it in water. 💧 A rock sinks. A cork floats. A rubber band stretches. Your hands and eyes are science tools!",
        visual: {
          type: "hotspots",
          title: "Properties to test",
          center: "Material",
          spots: [
            { label: "Hard or soft", icon: "🪨", detail: "Press it with your finger. Does it squish?" },
            { label: "Rough or smooth", icon: "✋", detail: "Rub it gently. Is it bumpy or slick?" },
            { label: "Bendy", icon: "🌀", detail: "Try to bend it. Does it bend, snap or stay stiff?" },
            { label: "Floats or sinks", icon: "💧", detail: "Drop it in a bowl of water and watch." },
            { label: "See-through", icon: "🔍", detail: "Hold it up to a light. Can you see through it?" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Drop each thing in water. Does it float or sink?",
          buckets: ["Floats 🛟", "Sinks ⬇️"],
          items: [
            { text: "🪵 Wood block", bucket: 0 },
            { text: "🍾 Cork", bucket: 0 },
            { text: "🦆 Rubber duck", bucket: 0 },
            { text: "🍂 Dry leaf", bucket: 0 },
            { text: "🪨 Rock", bucket: 1 },
            { text: "🔑 Metal key", bucket: 1 },
            { text: "🪙 Coin", bucket: 1 },
            { text: "🥄 Metal spoon", bucket: 1 },
          ],
          hint: "Wood, cork and light things often float. Rocks and metal things sink.",
          mistakes: [{ match: "Wood block sorted as sinks", coach: "Wood is light for its size. Drop a wood block in water and it bobs right back up!" }],
          seconds: 40,
        },
        think: {
          q: "Which test shows if a material floats?",
          choices: ["Bend it", "Drop it in water", "Look at its color"],
          answer: 1,
          why: "To see if something floats, put it in water and watch.",
          hints: [
            "Bending tells you if it is bendy, not if it floats.",
            "",
            "Color doesn't tell you about floating. A red rock and a red ball act differently in water.",
          ],
        },
        approaches: {
          analogy: "Testing a material is like meeting a new friend. You ask questions to learn about them. With materials, you press, bend and dunk to ask your questions.",
          example: "Take a coin and a cork. Press both: both are hard. Drop both in water: the cork floats and the coin sinks. Now you know a property that is different!",
          simpler: {
            q: "A rock goes in the water. What does it do?",
            choices: ["It sinks", "It floats"],
            answer: 0,
            why: "Rocks are heavy for their size, so they sink.",
            hints: ["", "Think of skipping stones. When they stop skipping, they go down to the bottom."],
          },
        },
      },
      {
        title: "The Right Material for the Job",
        teach:
          "Properties help us choose. ☔ An umbrella must keep rain out. So we pick a waterproof material, like plastic. Paper would get soggy. 🪟 A window must let light in. So we pick glass, because we can see through it. To choose, test two materials and compare. Which one kept the water out? Which one tore? The winner has the right properties for the job.",
        visual: {
          type: "compare",
          left: { title: "📄 Paper towel", points: ["Soft and bendy", "Soaks up water", "Gets soggy and tears", "Good for wiping spills"] },
          right: { title: "🧴 Plastic bag", points: ["Smooth and bendy", "Keeps water out", "Stays strong when wet", "Good for keeping things dry"] },
        },
        probe: {
          type: "cloze",
          text: "A raincoat should be {0}, so rain stays out. A pillow should be {1}, so it feels nice. A window should be {2}, so light comes in.",
          blanks: [{ answers: ["waterproof"] }, { answers: ["soft"] }, { answers: ["see-through", "clear"] }],
          bank: ["waterproof", "soft", "see-through", "sticky", "heavy"],
          hint: "Think about each job. What must a raincoat do? A pillow? A window?",
          mistakes: [
            { match: "heavy", coach: "A heavy pillow wouldn't be nice to sleep on! What property makes a pillow comfy?" },
            { match: "sticky", coach: "Sticky wouldn't help any of these jobs. Think: keep rain out, feel nice, let light in." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which material is best for a raincoat?",
          choices: ["Paper", "Cotton", "Plastic"],
          answer: 2,
          why: "Plastic is waterproof, so it keeps the rain out.",
          hints: [
            "Paper gets soggy and tears in the rain.",
            "Cotton soaks up water. You'd be wet and cold!",
            "",
          ],
        },
        approaches: {
          analogy: "Picking a material is like picking shoes. Rain boots for puddles, sneakers for running. Each one has the right properties for its job.",
          example: "Put a toy under a paper towel and another under a plastic bag. Sprinkle water on both. The toy under the plastic stays dry. Plastic wins for keeping things dry!",
          simpler: {
            q: "Does plastic keep water out?",
            choices: ["No, it soaks it up", "Yes, it is waterproof"],
            answer: 1,
            why: "Water rolls right off plastic.",
            hints: ["A sponge soaks up water, but plastic doesn't. Think of a plastic cup holding juice.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Press each one in your mind. Is it hard or soft?",
      buckets: ["Hard 🪨", "Soft 🧸"],
      items: [
        { text: "🪨 Rock", bucket: 0 },
        { text: "🔑 Key", bucket: 0 },
        { text: "🧱 Brick", bucket: 0 },
        { text: "🍽️ Dinner plate", bucket: 0 },
        { text: "🧸 Teddy bear", bucket: 1 },
        { text: "🪶 Feather", bucket: 1 },
        { text: "🧽 Sponge", bucket: 1 },
        { text: "🧶 Yarn", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Pick something in your home. What material is it made of? Why is that material a good choice for its job?",
      keyPoints: [
        "Names the material, like wood, metal, plastic, glass or cloth",
        "Names a property, like hard, soft, waterproof or see-through",
        "Tells how that property helps the object do its job",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each material to its property.",
        pairs: [
          { left: "🧽 Sponge", right: "soft and squishy" },
          { left: "🪨 Rock", right: "hard" },
          { left: "🪟 Glass", right: "see-through" },
          { left: "Rubber band", right: "stretchy" },
        ],
        hint: "Imagine touching each one. What do you notice first?",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Which materials would make a good raincoat?",
        buckets: ["Good for a raincoat ☔", "Not good 🚫"],
        items: [
          { text: "🧴 Plastic", bucket: 0 },
          { text: "Rubber", bucket: 0 },
          { text: "📄 Paper", bucket: 1 },
          { text: "🧻 Tissue", bucket: 1 },
          { text: "🧶 Yarn", bucket: 1 },
        ],
        hint: "A raincoat must keep water out. Which materials are waterproof?",
        mistakes: [{ match: "Paper sorted as good", coach: "Paper soaks up water and tears. You'd get soaked!" }],
        seconds: 35,
      },
      {
        type: "number",
        prompt: "Dr. Carver tests cloth for a tent. 💧 He pours water on each one. Cloth A leaks 5 drops. Cloth C leaks 9 drops. How many MORE drops leak through Cloth C than Cloth A?",
        answer: 4,
        unit: "drops",
        hint: "Start at 5 and count up to 9.",
        mistakes: [{ match: "14", coach: "That's 5 and 9 added together. We want how many more: count up from 5 to 9." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Cloth A leaked 5 drops. Cloth B leaked 0 drops. Cloth C leaked 9 drops. The best cloth for a tent is Cloth {0}.",
        blanks: [{ answers: ["B"] }],
        bank: ["A", "B", "C"],
        hint: "A tent should keep rain out. Which cloth let the fewest drops through?",
        mistakes: [{ match: "C", coach: "Cloth C leaked the MOST drops. We want the one that kept the most water out." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What is a property?",
        choices: ["A kind of toy", "Something you can notice about a material", "A place where things are made"],
        answer: 1,
        why: "A property is something you can notice, like hard, soft, bendy or see-through.",
      },
      {
        q: "Which material is best for an umbrella?",
        choices: ["Plastic", "Paper", "Cotton"],
        answer: 0,
        why: "Plastic is waterproof, so it keeps the rain off you.",
      },
      {
        q: "How can you test if something sinks?",
        choices: ["Smell it", "Shake it", "Put it in water"],
        answer: 2,
        why: "Put it in water and watch whether it floats or sinks.",
      },
      {
        q: "Two cloths are tested in the rain. Which is best for a tent?",
        choices: ["The one that leaked the most", "The one that leaked the least", "The one with the brightest color"],
        answer: 1,
        why: "A tent should keep rain out, so the cloth that leaked the least is best.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, find 5 things: a spoon, a sock, a cork or wood block, a coin and a piece of paper. Test each one. Does it bend? Does it float in a bowl of water? Sort them into piles. Tell which property you used to sort.",
      rubric: [
        "Tested all 5 things",
        "Tried at least two tests, like bending and floating",
        "Sorted them into groups",
        "Named the property used to sort",
      ],
    },
  },

  // 2. Pieces, heating and cooling
  {
    id: "sci-2.changes",
    title: "Take It Apart, Heat It Up",
    minutes: 20,
    stage: "logic",
    standards: ["2-PS1-3", "2-PS1-4"],
    read: [
      "Some objects are made of many small pieces. A block tower is made of blocks. A house is made of bricks and boards. You can take the pieces apart and build something new. A block castle can become a block boat. The pieces stay the same. Only the shape changes.",
      "Heating and cooling can change materials too. When ice gets warm, it melts into water. When water gets very cold, it freezes into ice. You can go back and forth. We say this change can be reversed, or undone.",
      "Some changes cannot be undone. Cook an egg, and it turns solid and white. You can never make it raw again. Bake a cake, and you cannot turn it back into batter. Burn a piece of wood, and it turns to ash.",
      "How do you know which is which? Look for evidence. Try to change it back. If you can, the change can be undone. If you cannot, it cannot be undone.",
    ].join("\n\n"),
    keyIdeas: [
      "Objects made of small pieces can be taken apart and built into something new.",
      "Some changes from heating or cooling can be undone, like ice melting and water freezing.",
      "Some changes cannot be undone, like cooking an egg or burning wood.",
    ],
    hook: {
      text: "Here is a snowman made of snow. ⛄ The sun comes out. Drip, drip! Now it's a puddle. Can we get our snowman back? Let's find out!",
    },
    teach: [
      {
        title: "Small Pieces, New Things",
        teach:
          "Look at a block tower. 🧱 It is made of many small pieces. Now take it apart. Build a boat with the same blocks! ⛵ The pieces did not change. Only the shape changed. Lots of big things are built from small pieces. A house is made of bricks and boards. 🏠 A train set is made of track pieces. Pieces can come apart and make something new.",
        visual: {
          type: "hotspots",
          title: "A house of small pieces",
          center: "🏠",
          spots: [
            { label: "Bricks", icon: "🧱", detail: "Many small bricks stack up to make strong walls." },
            { label: "Boards", icon: "🪵", detail: "Wood boards make the floor and the roof frame." },
            { label: "Windows", icon: "🪟", detail: "Glass pieces fit into frames to let light in." },
            { label: "Nails", icon: "🔩", detail: "Small metal pieces hold the boards together." },
          ],
        },
        probe: {
          type: "number",
          prompt: "A tower is made of 12 blocks. 🧱 You take it apart. You build a boat with ALL the same blocks. How many blocks are in the boat?",
          answer: 12,
          unit: "blocks",
          hint: "Taking it apart doesn't make blocks disappear. Only the shape changes.",
          mistakes: [{ match: "0", coach: "The blocks didn't go away! You used every one of them to build the boat." }],
          seconds: 25,
        },
        think: {
          q: "You take apart a block castle and build a car with the same blocks. What changed?",
          choices: ["The shape", "The number of blocks", "The color of the blocks"],
          answer: 0,
          why: "The same blocks are there. Only the shape is new.",
          hints: [
            "",
            "You used the same blocks, so the number stayed the same.",
            "The blocks are still the same color. Building doesn't paint them!",
          ],
        },
        approaches: {
          analogy: "Small pieces are like letters. The letters in TOP can be moved around to make POT. Same letters, new word!",
          example: "Ten blocks make a tall tower. Take it apart. Now make a long train with the same ten blocks. Count them: still ten!",
          simpler: {
            q: "Can a block tower be taken apart?",
            choices: ["No, never", "Yes, into blocks"],
            answer: 1,
            why: "A tower is built from blocks, so it comes apart into blocks.",
            hints: ["Try it with real blocks. A tower comes apart easily!", ""],
          },
        },
      },
      {
        title: "Changes You Can Undo",
        teach:
          "Heating and cooling can change things. 🧊 Put ice in the sun. It melts into water. 💧 Put the water in the freezer. It freezes into ice again! ❄️ We can go back and forth. So this change can be undone. Chocolate works the same way. 🍫 It melts when it gets warm. It gets hard again when it cools. Melting and freezing can be undone.",
        visual: {
          type: "flip",
          cards: [
            { front: "🔥 Heating", back: "Making something warmer. Heat melts ice and chocolate." },
            { front: "❄️ Cooling", back: "Making something colder. Cold freezes water into ice." },
            { front: "🔁 Can be undone", back: "You can change it back, like ice to water to ice." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the ice cube's trip in order.",
          steps: ["🧊 An ice cube sits in a cup", "☀️ The cup goes in the warm sun", "💧 The ice melts into water", "❄️ The cup goes in the freezer", "🧊 The water freezes into ice again"],
          hint: "First the ice warms up and melts. Then it cools down and freezes.",
          seconds: 40,
        },
        think: {
          q: "Melted chocolate cools down. What happens?",
          choices: ["It turns into water", "It gets hard again", "It disappears"],
          answer: 1,
          why: "Cooling makes melted chocolate hard again. The change can be undone.",
          hints: [
            "Chocolate stays chocolate. It doesn't become water.",
            "",
            "The chocolate is still there. You can see it on the plate!",
          ],
        },
        approaches: {
          analogy: "It's like opening and closing a door. You can open it, then close it again, as many times as you like.",
          example: "Leave a chocolate chip in a warm hand. It gets soft and melty. Put it in the fridge. Ten minutes later it is hard again!",
          simpler: {
            q: "Ice gets warm. What does it do?",
            choices: ["It melts", "It burns"],
            answer: 0,
            why: "Warm ice melts into water.",
            hints: ["", "Ice doesn't burn. Think of an ice pop on a hot day!"],
          },
        },
      },
      {
        title: "Changes You Cannot Undo",
        teach:
          "Some changes stay changed forever. 🥚 Cook an egg. It turns solid and white. Can you make it raw again? No! 🍞 Bake bread dough. It becomes bread. It cannot become dough again. 🔥 Burn wood. It turns to ash and smoke. How can you tell? Try to change it back. If you can't, it cannot be undone. That is your evidence.",
        visual: {
          type: "compare",
          left: { title: "🔁 Can be undone", points: ["🧊 Ice melting", "💧 Water freezing", "🍫 Chocolate melting", "🧈 Butter melting"] },
          right: { title: "🚫 Cannot be undone", points: ["🥚 Cooking an egg", "🍞 Baking bread", "🔥 Burning wood", "🍿 Popping popcorn"] },
        },
        probe: {
          type: "sort",
          prompt: "Can the change be undone?",
          buckets: ["Can be undone 🔁", "Cannot be undone 🚫"],
          items: [
            { text: "🧊 Ice melting", bucket: 0 },
            { text: "🍫 Chocolate melting", bucket: 0 },
            { text: "💧 Water freezing", bucket: 0 },
            { text: "🧈 Butter melting", bucket: 0 },
            { text: "🥚 Cooking an egg", bucket: 1 },
            { text: "🍞 Baking bread", bucket: 1 },
            { text: "🔥 Burning wood", bucket: 1 },
            { text: "🍿 Popping popcorn", bucket: 1 },
          ],
          hint: "Ask: can I change it back? Melting and freezing go back. Cooking and burning do not.",
          mistakes: [{ match: "Cooking an egg sorted as can be undone", coach: "Try cooling a cooked egg. It stays cooked! That change can't be undone." }],
          seconds: 45,
        },
        think: {
          q: "Which change can NOT be undone?",
          choices: ["Ice melting", "Chocolate melting", "Cooking an egg"],
          answer: 2,
          why: "A cooked egg can never become a raw egg again.",
          hints: [
            "Melted ice can freeze again, so that change can be undone.",
            "Melted chocolate gets hard again when it cools.",
            "",
          ],
        },
        approaches: {
          analogy: "It's like cutting paper with scissors. Once it's cut, you can't make it one whole piece again.",
          example: "Mom pops popcorn. 🍿 The hard kernels burst into fluffy popcorn. Can we put the fluffy popcorn back into a hard kernel? No! That change cannot be undone.",
          simpler: {
            q: "Can a cooked egg turn back into a raw egg?",
            choices: ["Yes", "No"],
            answer: 1,
            why: "Cooking changes the egg forever.",
            hints: ["Try putting a cooked egg in the fridge. It stays cooked!", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the changes that can NOT be undone.",
      sentences: [
        "A snowman melts into a puddle.",
        "Pancake batter cooks into a pancake.",
        "Juice freezes into an ice pop.",
        "A match burns.",
        "A crayon melts in a hot car.",
        "Clay is baked in a very hot oven into a hard pot.",
      ],
      correct: [1, 3, 5],
    },
    explain: {
      prompt: "Tell a grown-up about one change you can undo and one you cannot. How do you know?",
      keyPoints: [
        "Melting or freezing can be undone",
        "Cooking, baking or burning cannot be undone",
        "Test it by trying to change it back",
        "Heating or cooling caused the change",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "When ice gets warm, it {0}. When water gets very cold, it {1}.",
        blanks: [{ answers: ["melts"] }, { answers: ["freezes"] }],
        bank: ["melts", "freezes", "burns", "grows"],
        hint: "Warm makes ice turn to water. Cold makes water turn to ice.",
        mistakes: [{ match: "burns", coach: "Ice doesn't burn! Warm ice turns into water. What's that called?" }],
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Is it made of small pieces you can take apart?",
        buckets: ["Small pieces 🧩", "One solid piece 🪨"],
        items: [
          { text: "🧱 Block tower", bucket: 0 },
          { text: "🧩 Jigsaw puzzle", bucket: 0 },
          { text: "🚂 Toy train track", bucket: 0 },
          { text: "🪨 Rock", bucket: 1 },
          { text: "🥄 Metal spoon", bucket: 1 },
          { text: "🥚 Egg", bucket: 1 },
        ],
        hint: "Could you pull it apart into pieces and build something new?",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each change to how you could undo it.",
        pairs: [
          { left: "🧊 Ice melted into water", right: "Freeze it" },
          { left: "🍫 Chocolate got hard", right: "Warm it up" },
          { left: "🍞 Dough baked into bread", right: "It can't be undone" },
        ],
        hint: "Cooling undoes melting. Warming undoes hardening. Baking can't go back.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the science sentence.",
        tiles: ["Melting", "can", "be", "undone", "by", "cooling."],
        distractors: ["baking"],
        hint: "Start with Melting. How do you turn water back into ice?",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "You take apart a block house and build a boat. What stayed the same?",
        choices: ["The shape", "The name", "The blocks"],
        answer: 2,
        why: "The same blocks were used. Only the shape changed.",
      },
      {
        q: "Water freezes into ice. Can this change be undone?",
        choices: ["Yes, the ice can melt again", "No, never", "Only if you bake it"],
        answer: 0,
        why: "Warm the ice and it melts back into water.",
      },
      {
        q: "Which change can NOT be undone?",
        choices: ["Butter melting", "Burning wood", "Water freezing"],
        answer: 1,
        why: "Burned wood turns to ash and smoke. It can't become wood again.",
      },
      {
        q: "How can you tell if a change can be undone?",
        choices: ["Guess", "Look at its color", "Try to change it back"],
        answer: 2,
        why: "Trying to change it back gives you evidence.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, put an ice cube and a chocolate chip on a plate in a warm spot. Watch them melt. Then put the plate in the freezer for an hour. Did they change back? Then watch a grown-up cook an egg. Can it go back? Tell what you found.",
      rubric: [
        "Watched the ice and chocolate melt",
        "Checked if they changed back after cooling",
        "Watched an egg cook and said if it could change back",
        "Told which changes can be undone and which cannot",
      ],
    },
  },

  // 3. What plants need and their animal helpers
  {
    id: "sci-2.plants",
    title: "What Plants Need",
    minutes: 20,
    stage: "grammar",
    standards: ["2-LS2-1", "2-LS2-2"],
    read: [
      "Plants are living things. To grow, they need water and sunlight. They also need air, and most grow in soil.",
      "How do we know plants need sunlight? We can test it! Plant beans in two cups. Water them the same. Put one in a sunny window and one in a dark closet. Keep everything else the same. After two weeks, the sunny bean is green and strong. The dark bean is pale and floppy. Plants need light. A test with water shows that a plant with no water dries up and droops.",
      "Plants cannot walk, so animals help them. Bees visit flowers to drink sweet nectar. Yellow pollen sticks to their fuzzy bodies. When a bee flies to the next flower, it carries pollen along. This is called pollination. It helps the plant make seeds.",
      "Animals spread seeds, too. Burrs stick to a dog's fur and fall off far away. Birds eat berries and drop the seeds in new places. Squirrels bury acorns and forget some. Later, new oak trees sprout!",
    ].join("\n\n"),
    keyIdeas: [
      "Plants need sunlight and water to grow.",
      "A fair test changes only one thing, like sun or no sun.",
      "Bees and other animals carry pollen, and animals spread seeds to new places.",
    ],
    hook: {
      text: "A plant can't walk to the kitchen for a drink. 🌱 It can't fly to the sun. So how does it get what it needs? And who helps it? Let's find out!",
    },
    teach: [
      {
        title: "A Fair Plant Test",
        teach:
          "Do plants need sunlight? Let's test it! 🫘 Plant beans in two cups. Give both cups the same water. Put one cup in a sunny window. ☀️ Put the other in a dark closet. 🌑 Keep everything else the same. That makes it a fair test. Wait two weeks. The sunny bean grows green and strong. The dark bean grows pale and floppy. Plants need light!",
        visual: {
          type: "compare",
          left: { title: "☀️ Sunny window", points: ["Same water", "Same soil", "Green leaves", "Strong stem"] },
          right: { title: "🌑 Dark closet", points: ["Same water", "Same soil", "Pale, yellow leaves", "Floppy stem"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps of the plant test in order.",
          steps: ["🫘 Plant beans in two cups", "💧 Water both cups the same", "☀️🌑 Put one in the sun and one in the dark", "📅 Wait two weeks", "👀 Compare how they grew"],
          hint: "First you plant. Then you water and set up the test. Last you wait and look.",
          seconds: 40,
        },
        think: {
          q: "In a fair plant test, what do you change?",
          choices: ["Just one thing, like sun or no sun", "Everything", "Nothing at all"],
          answer: 0,
          why: "Change only one thing. Then you know that thing made the difference.",
          hints: [
            "",
            "If you change everything, you can't tell which change mattered.",
            "If nothing changes, both plants grow the same and you learn nothing new.",
          ],
        },
        approaches: {
          analogy: "A fair test is like a fair race. Both runners start at the same line. Only one thing is different, so you know why one won.",
          example: "Two cups, same beans, same water, same soil. The only difference: one sits in the sun, one in the dark. The sunny one grows better, so sunlight made the difference.",
          simpler: {
            q: "Which bean grows better?",
            choices: ["The one in the dark closet", "The one in the sunny window"],
            answer: 1,
            why: "Plants need light to grow strong and green.",
            hints: ["The dark bean grows pale and floppy. Plants need light!", ""],
          },
        },
      },
      {
        title: "Water, Air and Sunlight",
        teach:
          "Plants need water too. 💧 Try two sunny cups. Water one. Do not water the other. The dry plant droops and turns brown. 🥀 The watered plant stays green. Roots drink water from the soil. 🌱 Leaves take in sunlight and air. Then the plant makes its own food! So plants need sunlight, water and air. Most also grow in soil.",
        visual: {
          type: "hotspots",
          title: "Parts of a plant",
          center: "🌻",
          spots: [
            { label: "Roots", icon: "🟫", detail: "Roots drink water from the soil and hold the plant in place." },
            { label: "Stem", icon: "🌿", detail: "The stem carries water up to the leaves." },
            { label: "Leaves", icon: "🍃", detail: "Leaves take in sunlight and air to make food for the plant." },
            { label: "Flower", icon: "🌸", detail: "The flower makes seeds for new plants." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "What does a plant need to grow?",
          buckets: ["Plants need it ✅", "Plants don't need it ❌"],
          items: [
            { text: "☀️ Sunlight", bucket: 0 },
            { text: "💧 Water", bucket: 0 },
            { text: "💨 Air", bucket: 0 },
            { text: "🍬 Candy", bucket: 1 },
            { text: "📺 TV", bucket: 1 },
            { text: "🧸 Toys", bucket: 1 },
          ],
          hint: "Think about our bean tests. What did the strong plant get?",
          seconds: 30,
        },
        think: {
          q: "A plant gets sun but no water. What happens?",
          choices: ["It grows faster", "It droops and dries up", "It turns blue"],
          answer: 1,
          why: "Plants need water. Without it, they droop and dry up.",
          hints: [
            "Sun alone is not enough. Plants need water too!",
            "",
            "Plants don't turn blue. Think about a flower that was forgotten in a vase with no water.",
          ],
        },
        approaches: {
          analogy: "Roots are like straws. The plant sips water up through its roots, the way you sip juice through a straw.",
          example: "Two sunny plants. One gets a cup of water every few days. One gets none. After a week, the dry one is brown and droopy. The watered one is green. Water made the difference.",
          simpler: {
            q: "Which part of a plant drinks water?",
            choices: ["The roots", "The flower"],
            answer: 0,
            why: "Roots drink water from the soil.",
            hints: ["", "The flower makes seeds. The part under the soil drinks the water."],
          },
        },
      },
      {
        title: "Animal Helpers",
        teach:
          "Plants can't walk. So animals help them! 🐝 A bee visits a flower for sweet nectar. Yellow pollen sticks to its fuzzy body. It flies to the next flower and leaves some pollen there. That is pollination. It helps the plant make seeds. Animals move seeds, too. 🐿️ Squirrels bury acorns and forget some. 🐦 Birds eat berries and drop the seeds far away.",
        visual: {
          type: "flip",
          cards: [
            { front: "🍯 Nectar", back: "A sweet drink inside flowers. Bees and butterflies love it." },
            { front: "🟡 Pollen", back: "Yellow dust in flowers. Plants need it to make seeds." },
            { front: "🐝 Pollination", back: "Moving pollen from one flower to another." },
            { front: "🌰 Seed spreading", back: "Animals carry seeds to new places, where new plants can grow." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each animal to how it helps plants.",
          pairs: [
            { left: "🐝 Bee", right: "carries pollen from flower to flower" },
            { left: "🐿️ Squirrel", right: "buries acorns and forgets some" },
            { left: "🐦 Bird", right: "eats berries and drops the seeds" },
            { left: "🐕 Dog", right: "carries sticky burrs in its fur" },
          ],
          hint: "Think about what each animal does all day. Who visits flowers? Who hides nuts?",
          seconds: 40,
        },
        think: {
          q: "What does a bee carry from flower to flower?",
          choices: ["Water", "Leaves", "Pollen"],
          answer: 2,
          why: "Pollen sticks to the bee's fuzzy body and rides to the next flower.",
          hints: [
            "Bees drink nectar, but they don't carry water to flowers.",
            "Bees are too small to carry leaves around. Look at their fuzzy legs!",
            "",
          ],
        },
        approaches: {
          analogy: "A bee is like a mail carrier. It picks up pollen at one flower and drops it off at the next one.",
          example: "A squirrel buries ten acorns in the fall. In winter it digs up eight to eat. The two it forgot sprout into tiny oak trees in spring!",
          simpler: {
            q: "Do bees visit flowers?",
            choices: ["Yes, for sweet nectar", "No, never"],
            answer: 0,
            why: "Bees visit flowers to drink nectar.",
            hints: ["", "Look in a garden on a sunny day. You will often see bees buzzing on flowers!"],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the story of a flower in order.",
      steps: ["🐝 A bee lands on a flower", "🟡 Pollen sticks to the bee", "🌸 The bee flies to another flower", "🌰 That flower makes seeds", "🌱 A seed grows into a new plant"],
    },
    explain: {
      prompt: "How would you test if a plant needs sunlight? Then tell one way an animal helps a plant.",
      keyPoints: [
        "Put one plant in the sun and one in the dark",
        "Keep everything else the same",
        "Plants need sunlight and water to grow",
        "Bees carry pollen or animals carry seeds",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A bee carries {0} from flower to flower. Leaves need {1} to make food. Roots drink {2}.",
        blanks: [{ answers: ["pollen"] }, { answers: ["sunlight", "light", "sun"] }, { answers: ["water"] }],
        bank: ["pollen", "sunlight", "water", "candy", "sand"],
        hint: "Think: what sticks to bees? What shines on leaves? What do roots sip?",
        mistakes: [{ match: "candy", coach: "Plants don't eat candy! Leaves make food using light from the sun." }],
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Does the animal spread seeds or carry pollen?",
        buckets: ["Spreads seeds 🌰", "Carries pollen 🌼"],
        items: [
          { text: "🐿️ Squirrel burying acorns", bucket: 0 },
          { text: "🐦 Robin eating berries", bucket: 0 },
          { text: "🐕 Dog with burrs in its fur", bucket: 0 },
          { text: "🐝 Bee on a flower", bucket: 1 },
          { text: "🦋 Butterfly sipping nectar", bucket: 1 },
          { text: "🐦 Hummingbird sipping nectar", bucket: 1 },
        ],
        hint: "Animals that visit flowers for nectar carry pollen. Animals that eat or carry fruits and nuts spread seeds.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Four bean cups. 🫘 Cup 1 got sun and water. Cup 2 got sun but no water. Cup 3 got water but no sun. Cup 4 got no sun and no water. How many cups were missing something plants need?",
        answer: 3,
        unit: "cups",
        hint: "Plants need sun AND water. Only one cup got both.",
        mistakes: [{ match: "1", coach: "Only one cup got everything. How many cups were missing sun, water or both?" }],
        seconds: 45,
      },
      {
        type: "build",
        prompt: "Build the plant rule.",
        tiles: ["Plants", "need", "sunlight", "and", "water", "to", "grow."],
        distractors: ["candy", "toys"],
        hint: "Start with Plants. What two things did our tests show they need?",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What do plants need to grow?",
        choices: ["Sunlight and water", "Candy and toys", "Darkness and no water"],
        answer: 0,
        why: "Plants need sunlight and water (and air) to grow.",
      },
      {
        q: "A bean grows in a dark closet. How does it look?",
        choices: ["Green and strong", "Red and spotty", "Pale and floppy"],
        answer: 2,
        why: "Without light, a plant grows pale and floppy.",
      },
      {
        q: "What is pollination?",
        choices: ["Watering a plant", "Moving pollen from flower to flower", "Digging a hole"],
        answer: 1,
        why: "Pollination is moving pollen between flowers, which helps plants make seeds.",
      },
      {
        q: "How does a squirrel help an oak tree?",
        choices: ["It buries acorns and forgets some", "It waters the tree", "It paints the leaves"],
        answer: 0,
        why: "Forgotten acorns can sprout into new oak trees.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, plant two beans in cups of soil. Water both the same. Put one in a sunny window and one in a dark closet. Check them every two days for two weeks and draw what you see. While you wait, make a model bee: dip a cotton ball in a cupcake liner with a little cocoa powder (the pollen), then touch it to a clean liner. What did your bee carry?",
      rubric: [
        "Set up two cups with the same water and soil",
        "Put one in the sun and one in the dark",
        "Drew or told how each bean grew",
        "Used the model bee to show pollen moving from flower to flower",
      ],
    },
  },

  // 4. Habitats and biodiversity
  {
    id: "sci-2.habitats",
    title: "Habitats Full of Life",
    minutes: 20,
    stage: "logic",
    standards: ["2-LS4-1"],
    read: [
      "A habitat is the home where a plant or animal lives. It gives living things food, water and shelter.",
      "Earth has many kinds of habitats. A rain forest is warm and wet all year. A desert is very dry, with little rain. A pond is a small body of fresh water. The ocean is huge and salty. Even your backyard is a habitat!",
      "Scientists count how many different kinds of plants and animals live in a habitat. Many kinds of living things in one place is called biodiversity. Rain forests have more kinds of plants and animals than any other land habitat. Deserts have fewer kinds, because water is hard to find.",
      "You can be a scientist, too. Go outside and look closely. Count the kinds of living things you find in the grass or under a log. Then try a different spot and compare.",
    ].join("\n\n"),
    keyIdeas: [
      "A habitat is a home in nature that gives food, water and shelter.",
      "Biodiversity means many different kinds of living things in one place.",
      "Rain forests have lots of kinds of life; deserts have fewer.",
    ],
    hook: {
      text: "Lift up an old log. 🪵 What do you see? Bugs! Worms! Snails! A whole world lives under there. Let's count the kinds of life in different places.",
    },
    teach: [
      {
        title: "What Is a Habitat?",
        teach:
          "A habitat is a home in nature. 🏡 It gives living things what they need. Food. Water. Shelter. A pond is a habitat for frogs and fish. 🐸 A forest is a habitat for deer and owls. 🦉 A desert is a habitat for lizards and cactus. 🌵 Each plant and animal fits its home. A fish could not live in the desert!",
        visual: {
          type: "hotspots",
          title: "A pond habitat",
          center: "🏞️",
          spots: [
            { label: "Frog", icon: "🐸", detail: "Frogs eat bugs and hide in the water plants." },
            { label: "Fish", icon: "🐟", detail: "Fish swim in the water and breathe with gills." },
            { label: "Duck", icon: "🦆", detail: "Ducks float on top and dip for plants and bugs." },
            { label: "Turtle", icon: "🐢", detail: "Turtles warm up on logs in the sun." },
            { label: "Cattails", icon: "🌾", detail: "Tall plants at the edge give animals shelter." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each animal to its habitat.",
          pairs: [
            { left: "🐠 Clownfish", right: "ocean" },
            { left: "🦎 Desert lizard", right: "desert" },
            { left: "🐸 Frog", right: "pond" },
            { left: "🐒 Monkey", right: "rain forest" },
          ],
          hint: "Where would each animal find its food, water and shelter?",
          seconds: 35,
        },
        think: {
          q: "What does a habitat give an animal?",
          choices: ["Food, water and shelter", "Toys and games", "Only sunshine"],
          answer: 0,
          why: "A habitat gives living things what they need: food, water and shelter.",
          hints: [
            "",
            "Animals don't need toys. Think about what keeps them alive.",
            "Sunshine helps, but animals also need to eat, drink and hide.",
          ],
        },
        approaches: {
          analogy: "A habitat is like your house and neighborhood. You have a kitchen for food, a sink for water and a roof for shelter.",
          example: "A frog lives in a pond. It eats bugs that fly over the water. It drinks and swims in the pond. It hides under lily pads. The pond gives it everything!",
          simpler: {
            q: "Where does a fish live?",
            choices: ["In the desert", "In the water"],
            answer: 1,
            why: "Fish need water to live.",
            hints: ["A desert is dry. A fish needs to swim!", ""],
          },
        },
      },
      {
        title: "Counting Kinds of Life",
        teach:
          "Scientists count how many kinds of living things live in a place. 🔍 Not how many in all. How many different kinds! Lots of kinds together is called biodiversity. Say it with me: bi-o-di-VER-si-ty. 🌈 A garden with ants, bees, worms, birds and flowers has lots of kinds. A bare sidewalk has very few. What kinds of life live near you?",
        visual: {
          type: "flip",
          cards: [
            { front: "🏡 Habitat", back: "A home in nature with food, water and shelter." },
            { front: "🔍 Kinds", back: "Different types. Three ants are one kind. An ant and a bee are two kinds." },
            { front: "🌈 Biodiversity", back: "Many different kinds of living things in one place." },
          ],
        },
        probe: {
          type: "number",
          prompt: "In the garden you see 🐜🐜🐜 🐝 🐛 🐦🐦. How many different KINDS of animals do you see?",
          answer: 4,
          unit: "kinds",
          hint: "Count each kind once: ants, bees, caterpillars, birds.",
          mistakes: [{ match: "7", coach: "7 is how many animals in all. Count each kind only once: all the ants are one kind." }],
          seconds: 35,
        },
        think: {
          q: "You see 3 ants and 2 bees. How many kinds of animals is that?",
          choices: ["2 kinds", "5 kinds", "3 kinds"],
          answer: 0,
          why: "Ants are one kind and bees are another kind. That's 2 kinds.",
          hints: [
            "",
            "5 is how many animals in all. All the ants are one kind.",
            "3 is the number of ants. Count kinds: ants, bees.",
          ],
        },
        approaches: {
          analogy: "Kinds are like flavors of ice cream. Three scoops of vanilla is one flavor. Vanilla and chocolate is two flavors.",
          example: "Under a rock: 4 pill bugs, 2 worms and 1 beetle. That's 7 animals, but only 3 kinds: pill bugs, worms and beetles.",
          simpler: {
            q: "Are 3 ants one kind or three kinds?",
            choices: ["Three kinds", "One kind"],
            answer: 1,
            why: "They are all ants, so they are one kind.",
            hints: ["They are all the same animal. Same animal, same kind!", ""],
          },
        },
      },
      {
        title: "Comparing Habitats",
        teach:
          "Let's compare two habitats. 🌴 A rain forest is warm and wet all year. Plants grow everywhere. It is packed with monkeys, frogs, birds and bugs. Rain forests have more kinds of life than any other land habitat! 🏜️ A desert is very dry. Fewer kinds of plants and animals can live there. Water helps life grow. So wet places often have more kinds.",
        visual: {
          type: "compare",
          left: { title: "🌴 Rain forest", points: ["Warm and wet all year", "Plants everywhere", "Very many kinds of life", "Monkeys, parrots, tree frogs"] },
          right: { title: "🏜️ Desert", points: ["Very dry, little rain", "Few plants, spread out", "Fewer kinds of life", "Cactus, lizards, camels"] },
        },
        probe: {
          type: "sort",
          prompt: "Does it live in the rain forest or the desert?",
          buckets: ["Rain forest 🌴", "Desert 🏜️"],
          items: [
            { text: "🐒 Monkey", bucket: 0 },
            { text: "🦜 Parrot", bucket: 0 },
            { text: "🐸 Tree frog", bucket: 0 },
            { text: "🌵 Cactus", bucket: 1 },
            { text: "🦂 Scorpion", bucket: 1 },
            { text: "🐪 Camel", bucket: 1 },
          ],
          hint: "Rain forest animals like wet, leafy places. Desert living things can go a long time without water.",
          seconds: 35,
        },
        think: {
          q: "Which habitat has more kinds of living things?",
          choices: ["A dry desert", "A bare parking lot", "A rain forest"],
          answer: 2,
          why: "Rain forests are warm and wet, so lots of kinds of life can grow there.",
          hints: [
            "Deserts are very dry. Fewer kinds can live there.",
            "A parking lot is mostly pavement. Very few living things!",
            "",
          ],
        },
        approaches: {
          analogy: "Water is like food on a picnic table. A big, full table brings lots of guests. A nearly empty table brings only a few.",
          example: "A scientist counts kinds in one small patch. In a rain forest she finds dozens of kinds of bugs, plants and frogs. In a desert patch she finds only a few kinds.",
          simpler: {
            q: "Is a desert wet or dry?",
            choices: ["Dry", "Wet"],
            answer: 0,
            why: "A desert gets very little rain.",
            hints: ["", "Think of sand and cactus. It hardly ever rains there."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Help each living thing find its habitat.",
      buckets: ["Ocean 🌊", "Pond 🦆", "Desert 🏜️"],
      items: [
        { text: "🐙 Octopus", bucket: 0 },
        { text: "🐋 Whale", bucket: 0 },
        { text: "🦈 Shark", bucket: 0 },
        { text: "🦆 Duck", bucket: 1 },
        { text: "🐸 Frog", bucket: 1 },
        { text: "🌾 Cattails", bucket: 1 },
        { text: "🌵 Cactus", bucket: 2 },
        { text: "🐍 Rattlesnake", bucket: 2 },
        { text: "🦂 Scorpion", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell a grown-up what biodiversity means. Which has more kinds of life, a rain forest or a desert? Why?",
      keyPoints: [
        "Biodiversity means many different kinds of living things",
        "A habitat gives food, water and shelter",
        "A rain forest has more kinds of life",
        "Water helps more kinds of life grow",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A {0} is the home where an animal lives. Many kinds of living things in one place is called {1}.",
        blanks: [{ answers: ["habitat"] }, { answers: ["biodiversity"] }],
        bank: ["habitat", "biodiversity", "pollen", "weather"],
        hint: "One word means home in nature. The long word means many kinds of life.",
        mistakes: [{ match: "pollen", coach: "Pollen is the yellow dust in flowers. Which word means many kinds of life?" }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Under a log you find 🪲🪲 🐜🐜🐜 🪱 🐌🐌 🕷️. How many different KINDS of animals?",
        answer: 5,
        unit: "kinds",
        hint: "Count each kind once: beetles, ants, worms, snails, spiders.",
        mistakes: [{ match: "9", coach: "9 is all the animals. Count each kind only once." }],
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each habitat to what it is like.",
        pairs: [
          { left: "🌴 Rain forest", right: "warm and wet all year" },
          { left: "🏜️ Desert", right: "very dry, little rain" },
          { left: "🌊 Ocean", right: "huge and salty" },
          { left: "🦆 Pond", right: "small, with fresh water" },
        ],
        hint: "Think about the weather and the water in each place.",
        seconds: 35,
      },
      {
        type: "place",
        prompt: "Three kids counted kinds of living things. Put each place on the number line.",
        min: 0,
        max: 10,
        step: 1,
        tolerance: 0,
        items: [
          { label: "🌻 Garden: 9 kinds", value: 9 },
          { label: "🧱 Sidewalk: 2 kinds", value: 2 },
          { label: "🌳 Park: 6 kinds", value: 6 },
        ],
        hint: "Find each number on the line. The garden has the most biodiversity!",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is a habitat?",
        choices: ["A kind of food", "A home in nature", "A kind of weather"],
        answer: 1,
        why: "A habitat is the home where a plant or animal lives.",
      },
      {
        q: "What does biodiversity mean?",
        choices: ["One kind of animal", "A very dry place", "Many different kinds of living things"],
        answer: 2,
        why: "Biodiversity means lots of different kinds of life in one place.",
      },
      {
        q: "Which habitat is home to a cactus?",
        choices: ["Desert", "Ocean", "Pond"],
        answer: 0,
        why: "A cactus can live in the dry desert because it stores water.",
      },
      {
        q: "Why do deserts have fewer kinds of life than rain forests?",
        choices: ["Deserts are too noisy", "Deserts are too small", "Water is hard to find in a desert"],
        answer: 2,
        why: "Living things need water, and deserts get very little rain.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, pick two spots outside, like grass and a sidewalk. Look closely at each spot for 5 minutes. Make a tally mark for each different kind of living thing you see. Which spot has more biodiversity?",
      rubric: [
        "Looked closely at two different spots",
        "Counted kinds, not just how many in all",
        "Kept tally marks for each spot",
        "Told which spot had more kinds of life",
      ],
    },
  },

  // 5. Land and water
  {
    id: "sci-2.land-water",
    title: "Land and Water on a Map",
    minutes: 20,
    stage: "grammar",
    standards: ["2-ESS2-2", "2-ESS2-3"],
    read: [
      "Earth's land comes in many shapes. A mountain is very tall land with a peak. A hill is lower and rounder. A valley is low land between hills or mountains. A plain is wide, flat land. An island is land with water all around it.",
      "Water comes in many shapes, too. An ocean is a huge body of salty water. A lake is water with land all around it. A river is water that flows across the land, often into a lake or the ocean. A pond is like a small lake.",
      "Maps show land and water from above, the way a bird would see them. Blue usually shows water. Green or brown usually shows land. A map key tells what each color and picture means.",
      "Where is Earth's water? Most of it is in the salty oceans. Some is fresh water in rivers, lakes and ponds. Some is frozen solid. Glaciers are giant sheets of ice. Ice also covers the land near the South Pole. So water on Earth can be liquid or solid.",
    ].join("\n\n"),
    keyIdeas: [
      "Land shapes include mountains, hills, valleys, plains and islands.",
      "Water shapes include oceans, lakes, rivers and ponds; maps show water in blue.",
      "Most of Earth's water is in the salty oceans, and some is frozen solid as ice.",
    ],
    hook: {
      text: "Pretend you are a bird. 🦅 You fly high over the land. Below you see tall bumps, flat fields and shiny blue water. You just saw a map come to life!",
    },
    teach: [
      {
        title: "Shapes of Land",
        teach:
          "Earth's land has many shapes. ⛰️ A mountain is very tall, with a pointy top. A hill is lower and rounder. A valley is the low land between mountains. A plain is wide and flat, like a big field. 🏝️ An island is land with water all around it. What shapes of land are near your home?",
        visual: {
          type: "flip",
          cards: [
            { front: "⛰️ Mountain", back: "Very tall land with a pointy top, called a peak." },
            { front: "🟢 Hill", back: "Land that is higher than around it, but lower and rounder than a mountain." },
            { front: "🏞️ Valley", back: "Low land between hills or mountains. Rivers often run through valleys." },
            { front: "🌾 Plain", back: "Wide, flat land. Great for farms." },
            { front: "🏝️ Island", back: "Land with water all around it." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its land shape.",
          pairs: [
            { left: "⛰️ Very tall, pointy top", right: "mountain" },
            { left: "🏝️ Water all around", right: "island" },
            { left: "🌾 Wide and flat", right: "plain" },
            { left: "🏞️ Low land between mountains", right: "valley" },
          ],
          hint: "Read each clue. Tall? Flat? Low? Surrounded by water?",
          seconds: 35,
        },
        think: {
          q: "What is an island?",
          choices: ["Land with water all around it", "A very tall mountain", "Water with land all around it"],
          answer: 0,
          why: "An island is land with water on every side.",
          hints: [
            "",
            "A mountain is tall land. An island can be flat or bumpy, but it has water all around.",
            "That's a lake! Flip it around: an island is land in the water.",
          ],
        },
        approaches: {
          analogy: "Think of a bathtub with a toy boat. The boat sticking out of the water, with water all around, is like an island.",
          example: "Hawaii is made of islands. The land pokes up out of the Pacific Ocean, with ocean water on every side.",
          simpler: {
            q: "Which is taller, a hill or a mountain?",
            choices: ["A hill", "A mountain"],
            answer: 1,
            why: "Mountains are much taller than hills.",
            hints: ["Hills are lower and rounder. Which one has a tall, pointy top?", ""],
          },
        },
      },
      {
        title: "Shapes of Water",
        teach:
          "Water has shapes too! 🌊 An ocean is huge and salty. A lake has land all around it. A river flows across the land. 🏞️ Rivers often run into a lake or the ocean. A pond is a small lake. On a map, water is usually blue. 🗺️ Land is green or brown. A map key tells you what the colors and pictures mean.",
        visual: {
          type: "hotspots",
          title: "Reading a map",
          center: "🗺️",
          spots: [
            { label: "Blue", icon: "🟦", detail: "Blue on a map usually means water." },
            { label: "Green", icon: "🟩", detail: "Green on a map often means low, flat land." },
            { label: "Brown", icon: "🟫", detail: "Brown often means high land, like hills and mountains." },
            { label: "Map key", icon: "🔑", detail: "The map key tells what each color and picture means." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Water that flows across the land is a {0}. Water with land all around it is a {1}. A huge body of salty water is an {2}.",
          blanks: [{ answers: ["river"] }, { answers: ["lake"] }, { answers: ["ocean"] }],
          bank: ["river", "lake", "ocean", "mountain", "island"],
          hint: "Flows: river. Land all around: lake. Huge and salty: ocean.",
          mistakes: [{ match: "island", coach: "An island is LAND with water around it. This blank needs water with land around it." }],
          seconds: 35,
        },
        think: {
          q: "On a map, what color usually shows water?",
          choices: ["Red", "Blue", "Yellow"],
          answer: 1,
          why: "Mapmakers usually color water blue.",
          hints: [
            "Red is not usually used for water. Think of the color of the sea.",
            "",
            "Yellow is not for water. What color is a lake on a sunny day?",
          ],
        },
        approaches: {
          analogy: "A map key is like a secret decoder. It tells you that blue means water and little triangles mean mountains.",
          example: "On a map of a park, a blue blob with green all around it is a lake. A wiggly blue line is a river.",
          simpler: {
            q: "Does a river flow, or stay still?",
            choices: ["It stays still", "It flows"],
            answer: 1,
            why: "Rivers flow across the land.",
            hints: ["A lake sits still. A river moves along like a slide!", ""],
          },
        },
      },
      {
        title: "Liquid Water, Solid Water",
        teach:
          "Where is Earth's water? Most of it is in the oceans. 🌊 Ocean water is salty. Rivers, lakes and ponds hold fresh water. 💧 Some water is frozen solid. 🧊 Glaciers are giant sheets of ice that move very slowly. Thick ice covers the land near the South Pole. ❄️ So water on Earth can be a liquid or a solid.",
        visual: {
          type: "compare",
          left: { title: "💧 Liquid water", points: ["Oceans", "Rivers", "Lakes and ponds", "Rain"] },
          right: { title: "🧊 Solid water", points: ["Glaciers", "Ice near the South Pole", "Snow", "A frozen pond"] },
        },
        probe: {
          type: "sort",
          prompt: "Is the water liquid or solid?",
          buckets: ["Liquid 💧", "Solid 🧊"],
          items: [
            { text: "🌊 Ocean waves", bucket: 0 },
            { text: "🏞️ A flowing river", bucket: 0 },
            { text: "🌧️ Raindrops", bucket: 0 },
            { text: "🧊 A glacier", bucket: 1 },
            { text: "❄️ A snowflake", bucket: 1 },
            { text: "⛸️ A frozen pond", bucket: 1 },
          ],
          hint: "Liquid water flows and splashes. Solid water is hard and frozen.",
          seconds: 35,
        },
        think: {
          q: "Where is most of Earth's water?",
          choices: ["In ponds", "In rain clouds", "In the oceans"],
          answer: 2,
          why: "The oceans hold most of Earth's water.",
          hints: [
            "Ponds are small. There's much more water somewhere else.",
            "Clouds hold some water, but much less than the huge oceans.",
            "",
          ],
        },
        approaches: {
          analogy: "If all of Earth's water filled a big bucket, almost the whole bucket would be salty ocean water. Only a tiny cup would be fresh water and ice.",
          example: "A glacier is like a giant ice cube as big as a town. It is solid water, and it creeps downhill very slowly.",
          simpler: {
            q: "Is ice solid or liquid?",
            choices: ["Solid", "Liquid"],
            answer: 0,
            why: "Ice is frozen water, so it is solid.",
            hints: ["", "Liquids flow. Ice stays hard and keeps its shape."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it a shape of land or a kind of water?",
      buckets: ["Land ⛰️", "Water 🌊"],
      items: [
        { text: "Mountain", bucket: 0 },
        { text: "Hill", bucket: 0 },
        { text: "Valley", bucket: 0 },
        { text: "Island", bucket: 0 },
        { text: "Plain", bucket: 0 },
        { text: "Ocean", bucket: 1 },
        { text: "Lake", bucket: 1 },
        { text: "River", bucket: 1 },
        { text: "Pond", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Name two shapes of land and two kinds of water. Then tell where we can find water that is solid.",
      keyPoints: [
        "Names land shapes like mountain, hill, valley, plain or island",
        "Names water like ocean, lake, river or pond",
        "Most of Earth's water is in the salty ocean",
        "Solid water is in glaciers, snow and polar ice",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each word to what it means.",
        pairs: [
          { left: "🌊 Ocean", right: "huge and salty" },
          { left: "🏞️ River", right: "flows across the land" },
          { left: "💧 Lake", right: "water with land all around it" },
          { left: "🏝️ Island", right: "land with water all around it" },
        ],
        hint: "Watch out: a lake and an island are opposites!",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "On this map key, ⛰️ means mountain. Count the mountains on the map: ⛰️🌲⛰️🏠⛰️🌊⛰️",
        answer: 4,
        unit: "mountains",
        hint: "Point to each ⛰️ and count. Skip the trees, houses and water.",
        mistakes: [{ match: "7", coach: "7 counts everything. Only count the ⛰️ mountains." }],
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Most of Earth's water is in the {0}. The ice in a glacier is water that is {1}.",
        blanks: [{ answers: ["ocean", "oceans"] }, { answers: ["solid", "frozen"] }],
        bank: ["ocean", "solid", "desert", "hot"],
        hint: "Where is the biggest water? Is ice hard or runny?",
        mistakes: [{ match: "desert", coach: "A desert is very dry! Where is the most water on Earth?" }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the sentence about an island.",
        tiles: ["An", "island", "has", "water", "all", "around", "it."],
        distractors: ["lake"],
        hint: "Start with An island. What is all around an island?",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is a valley?",
        choices: ["A very tall mountain", "A huge salty sea", "Low land between hills or mountains"],
        answer: 2,
        why: "A valley is the low land between hills or mountains.",
      },
      {
        q: "What does a map key tell you?",
        choices: ["What the colors and pictures mean", "What time it is", "How to unlock a door"],
        answer: 0,
        why: "A map key explains the colors and pictures on a map.",
      },
      {
        q: "Which is water with land all around it?",
        choices: ["An island", "A lake", "A plain"],
        answer: 1,
        why: "A lake is water with land on every side.",
      },
      {
        q: "Which of these is solid water?",
        choices: ["A river", "Rain", "A glacier"],
        answer: 2,
        why: "A glacier is a giant sheet of ice, which is solid water.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, make a model of land and water in a baking pan. Use play dough, sand or dirt for land. Make a mountain, a valley and an island. Pour in a little water to make a lake and a river. Then draw a map of it from above, with a map key.",
      rubric: [
        "Built at least three land shapes",
        "Added at least two kinds of water",
        "Drew a map from above, with water in blue",
        "Made a map key that tells what the colors mean",
      ],
    },
  },

  // 6. Earth's changes and engineering
  {
    id: "sci-2.earth-changes",
    title: "Earth Changes, Fast and Slow",
    minutes: 20,
    stage: "rhetoric",
    standards: ["2-ESS1-1", "2-ESS2-1", "K-2-ETS1-1", "K-2-ETS1-2", "K-2-ETS1-3"],
    read: [
      "Earth's land is always changing. Some changes happen fast, in seconds, hours or days. An earthquake can shake the ground in seconds. A landslide can send rocks and mud down a hill. A volcano can erupt and pour out hot lava.",
      "Other changes are very slow. Wind and water carry away tiny bits of rock and soil. This is called erosion. Over a very long time, a river can carve a deep canyon. The Grand Canyon was carved by the Colorado River over millions of years.",
      "Sometimes wind and water wash away land that people need. Engineers solve this problem. First they ask questions and look closely. Then they sketch ideas. They build and test. Plants with roots hold soil in place. Rows of trees slow the wind. Walls of big rocks stop waves from washing away the shore.",
      "Engineers test two ideas and compare them. Which one kept more soil in place? Then they make the best idea even better.",
    ].join("\n\n"),
    keyIdeas: [
      "Some Earth changes are fast, like earthquakes and volcanoes. Some are slow, like a river carving a canyon.",
      "Erosion is wind and water carrying away rock and soil.",
      "Engineers ask, sketch, build, test and improve ideas, like plants or walls, to slow erosion.",
    ],
    hook: {
      text: "Pour water on a sand castle. 🏰 Swoosh! It washes away fast. Now picture a river doing that for millions of years. 🏞️ What would happen to the land?",
    },
    teach: [
      {
        title: "Fast and Slow Changes",
        teach:
          "Earth's land is always changing. ⚡ Some changes are fast. An earthquake shakes the ground in seconds. A landslide rushes down a hill. 🌋 A volcano can erupt and pour out hot lava. 🐢 Other changes are very slow. A river carves a canyon over millions of years. That's how the Grand Canyon was made! How do we know? Scientists study rocks, maps and photos.",
        visual: {
          type: "compare",
          left: { title: "⚡ Fast changes", points: ["Earthquake: seconds", "Landslide: minutes", "Volcano: hours or days", "Flood: hours or days"] },
          right: { title: "🐢 Slow changes", points: ["A river carving a canyon", "Waves wearing down a cliff", "Wind shaping rocks", "Takes many, many years"] },
        },
        probe: {
          type: "sort",
          prompt: "Is the change fast or slow?",
          buckets: ["Fast ⚡", "Slow 🐢"],
          items: [
            { text: "🌋 A volcano erupts", bucket: 0 },
            { text: "💥 An earthquake shakes", bucket: 0 },
            { text: "🪨 A landslide rushes down", bucket: 0 },
            { text: "🏞️ A river carves a canyon", bucket: 1 },
            { text: "🌊 Waves wear down a cliff", bucket: 1 },
            { text: "💨 Wind shapes a rock", bucket: 1 },
          ],
          hint: "Could you watch it happen in one day? Then it's fast. If it takes many years, it's slow.",
          seconds: 35,
        },
        think: {
          q: "Which change takes millions of years?",
          choices: ["An earthquake", "A river carving a canyon", "A landslide"],
          answer: 1,
          why: "Rivers carve canyons very slowly, over millions of years.",
          hints: [
            "An earthquake shakes the ground in just seconds.",
            "",
            "A landslide rushes down a hill fast, in minutes.",
          ],
        },
        approaches: {
          analogy: "Fast changes are like popping a balloon. Slow changes are like your fingernails growing. You can't see them move, but they change over time.",
          example: "The Colorado River carries sand and pebbles. They scrape the rock, bit by bit, year after year. Over millions of years that made the Grand Canyon, more than a mile deep!",
          simpler: {
            q: "An earthquake shakes the ground. Is that fast or slow?",
            choices: ["Fast", "Slow"],
            answer: 0,
            why: "An earthquake happens in seconds.",
            hints: ["", "An earthquake is over in seconds or minutes. That's fast!"],
          },
        },
      },
      {
        title: "Wind and Water Move the Land",
        teach:
          "Wind and water move land, bit by bit. 💨 Wind blows sand and dust away. 🌊 Waves wash sand off a beach. 🌧️ Rain carries soil down a hill. This moving of rock and soil is called erosion. Say it: e-RO-sion. Erosion can wash away a farm field. It can wash away a beach. Engineers look for ways to slow it down.",
        visual: {
          type: "hotspots",
          title: "What causes erosion?",
          center: "⛰️",
          spots: [
            { label: "Wind", icon: "💨", detail: "Wind blows sand and dry soil from one place to another." },
            { label: "Waves", icon: "🌊", detail: "Waves pull sand off beaches and wear down cliffs." },
            { label: "Rain", icon: "🌧️", detail: "Rain washes soil down hills, especially where there are no plants." },
            { label: "Rivers", icon: "🏞️", detail: "Rivers carry sand and pebbles and slowly carve valleys and canyons." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each problem to a way to slow it down.",
          pairs: [
            { left: "🌧️ Rain washes soil off a hill", right: "🌱 Plant grass. Roots hold the soil." },
            { left: "💨 Wind blows soil off a farm", right: "🌳 Plant a row of trees to block the wind." },
            { left: "🌊 Waves wash away the shore", right: "🪨 Build a wall of big rocks." },
          ],
          hint: "Roots grip soil. Trees block wind. Big rocks stop waves.",
          seconds: 40,
        },
        think: {
          q: "What is erosion?",
          choices: ["Wind and water moving rock and soil", "A plant making seeds", "Water freezing into ice"],
          answer: 0,
          why: "Erosion is when wind and water carry rock and soil away.",
          hints: [
            "",
            "That's what flowers do. Erosion is about land moving.",
            "That's freezing. Erosion is when wind and water carry soil away.",
          ],
        },
        approaches: {
          analogy: "Erosion is like a broom sweeping sand off a sidewalk. Wind and water are the broom, a little at a time.",
          example: "After a big rain, look at a bare dirt hill. You'll see little muddy streams carrying dirt to the bottom. A grassy hill nearby stays put, because roots hold the soil.",
          simpler: {
            q: "Can water carry sand away?",
            choices: ["No", "Yes"],
            answer: 1,
            why: "Moving water can pick up sand and carry it away.",
            hints: ["Think of a wave washing over a sand castle. Where does the sand go?", ""],
          },
        },
      },
      {
        title: "Think Like an Engineer",
        teach:
          "Engineers solve problems step by step. ❓ First, ask: What is the problem? ✏️ Next, sketch some ideas. 🔨 Then build a model. 🧪 Test it. Pour water on a sand hill with grass. Pour water on a bare sand hill. Which one kept more sand? ⭐ Last, make it better! Comparing two tests shows what each idea does well.",
        visual: {
          type: "hotspots",
          title: "The engineer's steps",
          center: "🛠️",
          spots: [
            { label: "Ask", icon: "❓", detail: "What is the problem? Look closely and ask questions." },
            { label: "Sketch", icon: "✏️", detail: "Draw your ideas. Show the shape and how it works." },
            { label: "Build", icon: "🔨", detail: "Make a model of your best idea." },
            { label: "Test", icon: "🧪", detail: "Try it out. Compare it with another idea." },
            { label: "Improve", icon: "⭐", detail: "Use what you learned to make it even better." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the engineer's steps in order.",
          steps: ["❓ Ask what the problem is", "✏️ Sketch some ideas", "🔨 Build a model", "🧪 Test it", "⭐ Make it better"],
          hint: "You can't test something before you build it. And you need to know the problem first!",
          seconds: 35,
        },
        think: {
          q: "What does an engineer do right after building a model?",
          choices: ["Throw it away", "Test it", "Forget about it"],
          answer: 1,
          why: "After building, engineers test to see how well it works.",
          hints: [
            "Engineers don't throw it away. They want to learn from it!",
            "",
            "Engineers keep going. The next step tells them if it works.",
          ],
        },
        approaches: {
          analogy: "Being an engineer is like making a paper airplane. You fold it, fly it, see what happens, and fold a better one.",
          example: "Hill A is bare sand. Hill B has grass. Pour one cup of water on each. Hill A loses 10 spoons of sand. Hill B loses only 3. The grass design works better!",
          simpler: {
            q: "What is the first step for an engineer?",
            choices: ["Ask what the problem is", "Make it better"],
            answer: 0,
            why: "You have to know the problem before you can solve it.",
            hints: ["", "Making it better comes last. What do you need to know first?"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Does it slow erosion, or make it worse?",
      buckets: ["Slows erosion 🛡️", "Makes it worse ⚠️"],
      items: [
        { text: "🌱 Planting grass on a hill", bucket: 0 },
        { text: "🌳 A row of trees by a field", bucket: 0 },
        { text: "🪨 A wall of big rocks by the shore", bucket: 0 },
        { text: "🌾 Bushes along a river bank", bucket: 0 },
        { text: "🪓 Cutting down all the plants on a hill", bucket: 1 },
        { text: "⛏️ Digging up the grass", bucket: 1 },
        { text: "🟫 Leaving dirt bare on a steep hill", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell one fast change and one slow change to Earth. Then tell how an engineer could stop rain from washing away a hill, and how to test the idea.",
      keyPoints: [
        "A fast change, like an earthquake, landslide or volcano",
        "A slow change, like a river carving a canyon",
        "Erosion is wind or water moving soil and rock",
        "Plants, trees or walls can slow erosion",
        "Test two ideas and compare them",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "Test time! 🧪 Hill A had no plants. 10 spoons of sand washed away. Hill B had grass. 3 spoons washed away. How many MORE spoons washed off Hill A?",
        answer: 7,
        unit: "spoons",
        hint: "Start at 3 and count up to 10.",
        mistakes: [{ match: "13", coach: "That adds them. We want how many more: count up from 3 to 10." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Wind and water moving soil and rock is called {0}. A volcano erupting is a {1} change. A river carving a canyon is a {2} change.",
        blanks: [{ answers: ["erosion"] }, { answers: ["fast"] }, { answers: ["slow"] }],
        bank: ["erosion", "fast", "slow", "pollen"],
        hint: "Volcanoes erupt in hours or days. Canyons take millions of years.",
        mistakes: [{ match: "pollen", coach: "Pollen is in flowers. The word for moving soil and rock starts with e." }],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "How long does each change take?",
        pairs: [
          { left: "💥 Earthquake", right: "seconds" },
          { left: "🌋 Volcano erupting", right: "hours or days" },
          { left: "🏞️ River carving a canyon", right: "millions of years" },
        ],
        hint: "Earthquakes are quickest. Canyons are slowest.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the sentence about slowing erosion.",
        tiles: ["Grass", "roots", "hold", "the", "soil", "in", "place."],
        distractors: ["wash", "away"],
        hint: "Start with Grass roots. What do roots do to the soil?",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which change happens fast?",
        choices: ["An earthquake", "A river carving a canyon", "Waves wearing down a cliff"],
        answer: 0,
        why: "An earthquake shakes the ground in seconds.",
      },
      {
        q: "What carved the Grand Canyon?",
        choices: ["An earthquake", "The Colorado River", "A volcano"],
        answer: 1,
        why: "The Colorado River carved it slowly, over millions of years.",
      },
      {
        q: "How can people stop rain from washing soil off a hill?",
        choices: ["Dig up the grass", "Cut down the trees", "Plant grass so roots hold the soil"],
        answer: 2,
        why: "Roots grip the soil and keep it from washing away.",
      },
      {
        q: "Two sand hills are tested with water. How do you pick the better design?",
        choices: ["Pick the prettiest one", "Pick the one that lost less sand", "Pick the bigger one"],
        answer: 1,
        why: "Compare the test results. The hill that kept more sand did the job better.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Be an engineer! With a grown-up, make two small sand or dirt hills on trays outside. First sketch a plan. Press grass, leaves or small sticks into one hill. Leave the other bare. Slowly pour one cup of water on top of each. Which hill lost more dirt? How could you make your design even better?",
      rubric: [
        "Drew a sketch of the plan first",
        "Built two hills: one protected and one bare",
        "Tested both the same way and compared the results",
        "Told one way to make the design better",
      ],
    },
  },
]);
