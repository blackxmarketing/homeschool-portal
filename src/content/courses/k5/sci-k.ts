import { k5Course } from "./base";

/**
 * sci-k: Kindergarten science (NGSS). Six lessons, read aloud by Dr. Carver:
 * pushes and pulls, changing motion by design, sunlight and shade, what living
 * things need, weather, and how living things change and care for their homes.
 */
export const sciK = k5Course("sci", 0, [
  // 1. Pushes and pulls
  {
    id: "sci-k.pushpull",
    title: "Pushes and Pulls",
    minutes: 15,
    stage: "grammar",
    standards: ["K-PS2-1"],
    read: [
      "A push moves something away from you. A pull moves something toward you. When you kick a ball, that is a push. When you open a drawer, that is a pull.",
      "Pushes and pulls can be strong or gentle. A gentle push makes a ball roll slowly. It does not go very far. A strong push makes it roll fast and far.",
      "Pushes and pulls also have a direction. Direction means which way. Push a ball to the left, and it rolls left. Push it forward, and it rolls forward. A push can even make a rolling ball stop or turn.",
      "Scientists test things to find out. They try a gentle push. Then they try a strong push. They watch what happens each time. You can be a scientist too!",
    ].join("\n\n"),
    keyIdeas: [
      "👐➡️ A push moves something away from you. A pull moves it toward you.",
      "💪 A strong push makes a thing go faster and farther than a gentle push.",
      "↩️ Things move the way you push or pull them.",
    ],
    hook: {
      text: "Look at this ball. It is sitting very still. How can we make it move? Let's find out together!",
    },
    teach: [
      {
        title: "Push or Pull?",
        teach:
          "Let's learn two big words: push and pull. A push moves something away from you. You push a swing. You push a door open. A pull moves something toward you. You pull a wagon. You pull open a drawer. Some jobs need both! You pull a sled up the hill. Then you push off to slide down. Pushes and pulls make things move.",
        visual: {
          type: "flip",
          cards: [
            { front: "👐➡️ Push", back: "A push moves something away from you, like pushing a swing." },
            { front: "⬅️🤲 Pull", back: "A pull moves something toward you, like pulling a wagon." },
            { front: "🛷 Both!", back: "Pull the sled up the hill. Push off to slide down." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is it a push or a pull? Put each one in the right group.",
          buckets: ["👐 Push (away from me)", "🤲 Pull (toward me)"],
          items: [
            { text: "⚽ Kick a ball", bucket: 0 },
            { text: "🛝 Push a friend on a swing", bucket: 0 },
            { text: "🚗 Roll a toy car away", bucket: 0 },
            { text: "🧺 Tug a wagon behind you", bucket: 1 },
            { text: "🗄️ Open a drawer", bucket: 1 },
            { text: "🌱 Tug a weed out of the dirt", bucket: 1 },
          ],
          hint: "Ask: does it move away from me, or toward me? Away is a push. Toward is a pull.",
          mistakes: [
            { match: "Kick a ball sorted as pull", coach: "When you kick, the ball flies away from you. Away means push." },
            { match: "Open a drawer sorted as push", coach: "To open a drawer, you bring it toward you. Toward means pull." },
          ],
          seconds: 40,
        },
        think: {
          q: "You kick a ball. Is that a push or a pull?",
          choices: ["A pull", "A push", "Neither one"],
          answer: 1,
          why: "Your foot sends the ball away from you, so a kick is a push.",
          hints: [
            "A pull brings things toward you. Does a kicked ball come back to you?",
            "",
            "The ball moved, so something made it move. Was it pushed away or pulled close?",
          ],
        },
        approaches: {
          analogy:
            "Think of a door. When you go out, you push the door away. When you come in, you pull the door toward you.",
          example:
            "Grab a toy car. Move it away from your tummy. That is a push. Now bring it back to your tummy. That is a pull.",
          simpler: {
            q: "Which way does a push move things?",
            choices: ["Away from you", "Toward you"],
            answer: 0,
            why: "A push moves things away from you.",
            hints: ["", "Toward you is a pull. A push goes the other way, away from you."],
          },
        },
      },
      {
        title: "Strong or Gentle",
        teach:
          "Pushes can be strong or gentle. Roll a ball with a tiny tap. It goes slowly. It stops soon. Now give it a big push. Zoom! It goes fast. It goes far. A bigger push makes a bigger change. Pulls work the same way. Tug a wagon gently, and it creeps along. Pull it hard, and it rolls faster. Strong push, big change. Gentle push, small change.",
        visual: {
          type: "compare",
          left: { title: "🤏 Gentle push", points: ["The ball rolls slowly 🐢", "It stops soon", "Small change"] },
          right: { title: "💪 Strong push", points: ["The ball rolls fast 🚀", "It goes far", "Big change"] },
        },
        probe: {
          type: "match",
          prompt: "Match each push to what the ball does.",
          pairs: [
            { left: "🤏 A tiny tap", right: "🐢 Rolls slow and stops soon" },
            { left: "💪 A big kick", right: "🚀 Zooms fast and far" },
            { left: "✋ No push at all", right: "🪨 Stays still" },
          ],
          hint: "A bigger push makes a bigger change. No push means no change.",
          mistakes: [
            { match: "tiny tap matched to zooms", coach: "A tiny tap is gentle. A gentle push makes only a small change." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which push makes a ball go the farthest?",
          choices: ["A tiny tap", "No push at all", "A big strong push"],
          answer: 2,
          why: "A strong push makes a bigger change, so the ball goes faster and farther.",
          hints: [
            "A tiny tap is gentle. The ball rolls slowly and stops soon.",
            "With no push, a still ball just sits there. It does not go anywhere.",
            "",
          ],
        },
        approaches: {
          analogy:
            "It is like a swing. A gentle push makes the swing go a little. A strong push sends it way up high.",
          example:
            "Tap a ball softly. It rolls to the rug. Now push it hard. It rolls all the way to the wall. The strong push went farther.",
          simpler: {
            q: "Is a big kick strong or gentle?",
            choices: ["Gentle", "Strong"],
            answer: 1,
            why: "A big kick is a strong push.",
            hints: ["A gentle push is a soft little tap. A big kick has much more power than that.", ""],
          },
        },
      },
      {
        title: "Which Way?",
        teach:
          "Pushes and pulls have a direction. Direction means which way. Push a ball to the right. It rolls right. Push it to the left. It rolls left. A push can also stop a rolling ball. Or it can make the ball turn. Soccer players do this all game long! They tap the ball to change its way. A ball goes the way you push it.",
        visual: {
          type: "hotspots",
          title: "One ball, many ways",
          center: "⚽ Ball",
          spots: [
            { label: "Push right", icon: "➡️", detail: "Push the ball to the right, and it rolls right." },
            { label: "Push left", icon: "⬅️", detail: "Push the ball to the left, and it rolls left." },
            { label: "Push to stop", icon: "✋", detail: "Put your hand in front of a rolling ball. The push stops it." },
            { label: "Push to turn", icon: "↪️", detail: "Tap a rolling ball from the side, and it turns a new way." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Push a ball to the left, and it rolls {0}. Pull a wagon toward you, and it comes {1} you.",
          blanks: [{ answers: ["left"] }, { answers: ["toward", "towards"] }],
          bank: ["left", "toward", "right", "up", "away from"],
          hint: "Things go the same way you push or pull them.",
          mistakes: [
            { match: "right", coach: "You pushed the ball to the left. It goes the way you push it." },
            { match: "away from", coach: "A pull brings things toward you, not away." },
          ],
          seconds: 30,
        },
        think: {
          q: "You push a ball to the right. Which way does it roll?",
          choices: ["To the left", "It stays still", "To the right"],
          answer: 2,
          why: "A ball moves the way you push it, so it rolls to the right.",
          hints: [
            "Left is the other way. Things go the way you push them.",
            "You pushed it, so it will move. Which way did your push go?",
            "",
          ],
        },
        approaches: {
          analogy:
            "A push is like pointing. The ball goes where your push points, just like a dog runs where you throw the stick.",
          example:
            "Put a ball on the floor. Push it toward the door. It rolls to the door. Push it toward the couch. Now it rolls to the couch.",
          simpler: {
            q: "Can a push make a ball change which way it goes?",
            choices: ["No, never", "Yes, it can"],
            answer: 1,
            why: "A push can make a ball turn, stop or go a new way.",
            hints: ["Soccer players tap the ball to turn it. So a push can change its way.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Be a scientist! Put the steps of our push test in order.",
      steps: [
        "⚽ Set the ball on the floor",
        "🤏 Give it a gentle push",
        "👀 Watch how far it goes",
        "💪 Give it a strong push",
        "📏 Compare: which push sent it farther?",
      ],
    },
    explain: {
      prompt: "Tell me in your own words: what does a push do, and what does a pull do? What happens when you push harder?",
      keyPoints: [
        "A push moves things away from you",
        "A pull moves things toward you",
        "A strong push makes things go faster and farther",
        "Things move the way you push them",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Push or pull? Sort them.",
        buckets: ["👐 Push", "🤲 Pull"],
        items: [
          { text: "🛒 Roll a cart ahead of you", bucket: 0 },
          { text: "🎳 Roll a bowling ball", bucket: 0 },
          { text: "🐕 Tug a rope toy from a dog", bucket: 1 },
          { text: "🪣 Lift a bucket up from a well with a rope", bucket: 1 },
        ],
        hint: "Away from you is a push. Toward you is a pull.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match the push to the ride.",
        pairs: [
          { left: "🤏 Gentle push on a swing", right: "A little swing 🙂" },
          { left: "💪 Strong push on a swing", right: "A big, high swing 🤩" },
        ],
        hint: "A bigger push makes a bigger change.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "A {0} push makes a ball go fast and far. A {1} push makes it go slow.",
        blanks: [{ answers: ["strong", "big"] }, { answers: ["gentle", "soft", "small"] }],
        bank: ["strong", "gentle", "purple", "sleepy"],
        hint: "Strong push, big change. Gentle push, small change.",
        mistakes: [{ match: "purple", coach: "Purple is a color. We need a word for how hard the push is." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap every PULL.",
        sentences: ["🧺 Pull a wagon", "⚽ Kick a ball", "🗄️ Open a drawer", "🛝 Push a swing"],
        correct: [0, 2],
        hint: "A pull brings things toward you.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Opening a drawer is a...",
        choices: ["Pull", "Push", "Jump"],
        answer: 0,
        why: "You bring the drawer toward you, so it is a pull.",
      },
      {
        q: "Which push makes a toy car go the farthest?",
        choices: ["A tiny tap", "A strong push", "No push"],
        answer: 1,
        why: "A strong push makes a bigger change, so the car goes farther.",
      },
      {
        q: "You push a ball to the left. Which way does it go?",
        choices: ["Right", "Up to the sky", "Left"],
        answer: 2,
        why: "Things move the way you push them.",
      },
      {
        q: "What can a push do to a rolling ball?",
        choices: ["Turn it into a cat", "Stop it or turn it", "Nothing at all"],
        answer: 1,
        why: "A push can stop a rolling ball or make it go a new way.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, roll a ball with a gentle push. Put a sock where it stops. Now roll it with a strong push and put a shoe where it stops. Which push sent the ball farther? Then push it left and right and watch which way it goes.",
      rubric: [
        "Tried a gentle push and a strong push",
        "Marked where the ball stopped each time",
        "Said which push sent the ball farther",
        "Showed that the ball goes the way it is pushed",
      ],
    },
  },

  // 2. Ramps and bumpers: changing motion by design
  {
    id: "sci-k.rampsbumpers",
    title: "Ramps and Bumpers",
    minutes: 15,
    stage: "logic",
    standards: ["K-PS2-2", "K-PS2-1", "K-2-ETS1-1", "K-2-ETS1-2"],
    read: [
      "Sometimes we want a thing to move in a new way. We want a ball to go faster. Or slower. Or to turn. Engineers solve problems like this. They plan and build something new.",
      "A ramp can make a ball go faster. A higher ramp makes it go even faster at the bottom. A wall, called a bumper, can make a ball bounce and go a new way. Something soft, like a pillow, can slow a ball down and stop it.",
      "After you build, you test. Does it work? Does the ball do what you wanted? If not, change your idea and try again. That is what engineers do!",
    ].join("\n\n"),
    keyIdeas: [
      "🛝 A higher ramp makes a rolling thing go faster.",
      "🧱 A bumper makes a ball bounce and change direction.",
      "🛏️ Something soft can slow a ball down and stop it.",
      "🔧 Engineers build, test, and make it better.",
    ],
    hook: {
      text: "Uh oh! Your ball keeps rolling under the couch. How can we stop it? Let's think like engineers.",
    },
    teach: [
      {
        title: "Ramps Speed Things Up",
        teach:
          "A ramp is a slope, like a slide at the park. Set a toy car at the top. Let go. Whee! It rolls down. The higher the ramp, the faster the car goes at the bottom. A low ramp gives a slow ride. A tall ramp gives a fast ride. Why? Gravity pulls the car down the ramp. Gravity is a pull toward the ground.",
        visual: { type: "ramp" },
        probe: {
          type: "sort",
          prompt: "Fast or slow at the bottom? Sort them.",
          buckets: ["🚀 Fast at the bottom", "🐢 Slow at the bottom"],
          items: [
            { text: "🚗 A car on a tall ramp", bucket: 0 },
            { text: "🛷 A sled on a big, steep hill", bucket: 0 },
            { text: "🚗 A car on a low ramp", bucket: 1 },
            { text: "🛷 A sled on a tiny bump", bucket: 1 },
          ],
          hint: "Higher ramps and steeper hills make things go faster.",
          mistakes: [{ match: "low ramp sorted as fast", coach: "A low ramp gives a slow ride. Try the tall ramp for speed." }],
          seconds: 30,
        },
        think: {
          q: "Which ramp makes a toy car go fastest at the bottom?",
          choices: ["A flat floor", "A tall ramp", "A low ramp"],
          answer: 1,
          why: "The higher the ramp, the faster the car goes at the bottom.",
          hints: [
            "On a flat floor, the car does not roll by itself at all.",
            "",
            "A low ramp gives a slow ride. Is there a higher one?",
          ],
        },
        approaches: {
          analogy:
            "Think of slides at the park. The tiny slide is slow. The big tall slide makes you zoom at the bottom.",
          example:
            "Lean a book on one block. Roll a car down. Now lean it on three blocks. Roll the car again. It zooms faster the second time.",
          simpler: {
            q: "Which slide is faster: a tiny one or a big tall one?",
            choices: ["The tiny one", "The big tall one"],
            answer: 1,
            why: "A taller slide makes you go faster at the bottom.",
            hints: ["A tiny slide is a slow ride. The taller one is faster.", ""],
          },
        },
      },
      {
        title: "Bumpers and Pillows",
        teach:
          "A rolling ball goes straight. Unless something pushes it! A hard wall can push back on the ball. The ball bounces and goes a new way. That wall is a bumper. Mini golf has bumpers. So do bowling lanes for little kids. Something soft, like a pillow, works another way. It slows the ball down and stops it. Bumpers turn. Pillows stop.",
        visual: {
          type: "compare",
          left: { title: "🧱 Hard bumper", points: ["Pushes back on the ball", "The ball bounces", "It goes a new way ↩️"] },
          right: { title: "🛏️ Soft pillow", points: ["Squishes when the ball hits", "The ball slows down", "It stops 🛑"] },
        },
        probe: {
          type: "match",
          prompt: "Match each thing to what it does to a rolling ball.",
          pairs: [
            { left: "🧱 A hard wall", right: "↩️ Bounces it a new way" },
            { left: "🛏️ A soft pillow", right: "🛑 Slows it and stops it" },
            { left: "🛝 A tall ramp", right: "💨 Speeds it up" },
          ],
          hint: "Bumpers turn. Pillows stop. Ramps speed things up.",
          seconds: 35,
        },
        think: {
          q: "A ball rolls into a hard wall. What happens?",
          choices: ["It bounces and goes a new way", "It goes through the wall", "It speeds up and flies"],
          answer: 0,
          why: "The wall pushes back on the ball, so it bounces and changes direction.",
          hints: [
            "",
            "A ball can't go through a hard wall. The wall pushes back.",
            "Ramps speed balls up. A wall does something else.",
          ],
        },
        approaches: {
          analogy:
            "A bumper is like a friend who catches your ball and tosses it back. A pillow is like a big soft hug that holds it still.",
          example:
            "Roll a ball at a wooden block. It bounces off and turns. Roll it at a pillow. It sinks in and stops.",
          simpler: {
            q: "Which one stops a ball softly?",
            choices: ["A brick wall", "A fluffy pillow"],
            answer: 1,
            why: "Soft things slow a ball down and stop it.",
            hints: ["A hard wall makes the ball bounce away. Which one is soft?", ""],
          },
        },
      },
      {
        title: "Test It Like an Engineer",
        teach:
          "Engineers have a plan. First, find the problem. Maybe your ball rolls under the couch. Next, build an idea. Maybe a wall of blocks. Then test it. Roll the ball. Does the wall stop it? If yes, hooray! If not, make it better. Then test again. You can try two ideas. Which one works best?",
        visual: {
          type: "flip",
          cards: [
            { front: "1️⃣ ❓ Problem", back: "What is wrong? The ball rolls under the couch." },
            { front: "2️⃣ 🧱 Build", back: "Make an idea, like a wall of blocks." },
            { front: "3️⃣ ⚽ Test", back: "Roll the ball. Does the wall stop it?" },
            { front: "4️⃣ 🔧 Better", back: "If it did not work, change it and test again." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the engineer steps in order.",
          steps: ["❓ Find the problem", "🧱 Build an idea", "⚽ Test it", "🔧 Make it better"],
          hint: "First the problem. Then build. Then test. Then make it better.",
          seconds: 30,
        },
        think: {
          q: "You built a block wall. What should you do next?",
          choices: ["Give up", "Test it with the ball", "Throw the blocks away"],
          answer: 1,
          why: "After you build, you test to see if it works.",
          hints: [
            "Engineers never give up so fast! They check if their idea works.",
            "",
            "You need the blocks! First find out if your wall works.",
          ],
        },
        approaches: {
          analogy:
            "It is like making a sandwich. You make it, take a bite to test it, and add more jam if it needs it.",
          example:
            "Problem: the ball rolls under the couch. Build: two blocks in front. Test: the ball sneaks past. Better: add three more blocks. Test again: stopped!",
          simpler: {
            q: "What do engineers do after they build?",
            choices: ["They test it", "They hide it"],
            answer: 0,
            why: "Engineers test what they build to see if it works.",
            hints: ["", "Hiding it won't tell you if it works. Try it out!"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What does each one do to a rolling ball?",
      buckets: ["💨 Speeds it up", "↩️ Changes its way", "🛑 Slows or stops it"],
      items: [
        { text: "🛝 A tall ramp", bucket: 0 },
        { text: "⛰️ A steep hill", bucket: 0 },
        { text: "🧱 A block wall", bucket: 1 },
        { text: "⛳ A mini golf bumper", bucket: 1 },
        { text: "🛏️ A soft pillow", bucket: 2 },
        { text: "🏖️ A pile of sand", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Your ball rolls under the couch. Tell me how you could build something to stop it, and how you would test it.",
      keyPoints: [
        "Build a wall or put something soft in the way",
        "Something soft can slow the ball and stop it",
        "Test it by rolling the ball",
        "If it does not work, make it better and test again",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match the problem to a good fix.",
        pairs: [
          { left: "🐢 My car is too slow", right: "🛝 Make the ramp taller" },
          { left: "🛋️ My ball rolls under the couch", right: "🧱 Build a block wall" },
          { left: "💥 My ball bangs too hard", right: "🛏️ Put a pillow in the way" },
        ],
        hint: "Ramps speed up. Walls turn or stop. Pillows slow things softly.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "A taller ramp makes a car go {0}. A hard wall makes a ball {1}.",
        blanks: [{ answers: ["faster"] }, { answers: ["bounce"] }],
        bank: ["faster", "bounce", "slower", "sleep"],
        hint: "Higher ramp, more speed. Hard walls push the ball back.",
        mistakes: [{ match: "slower", coach: "Higher ramps give faster rides, not slower ones." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Sam tested his block wall 2 times. Then he made it better and tested 3 more times. How many tests in all? 🧱⚽",
        answer: 5,
        hint: "Count 2, then 3 more: 3, 4, 5.",
        mistakes: [{ match: "3", coach: "Don't forget the first 2 tests! Add them on." }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the ramp test in order.",
        steps: ["📚 Build a ramp with books", "🚗 Roll the car down", "📏 See how far it goes", "📚 Add a book to make it taller and try again"],
        hint: "Build it, try it, look, then change one thing.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "How can you make a toy car go faster down a ramp?",
        choices: ["Make the ramp lower", "Paint the car", "Make the ramp taller"],
        answer: 2,
        why: "A higher ramp makes the car go faster at the bottom.",
      },
      {
        q: "What does a bumper do to a rolling ball?",
        choices: ["Makes it bounce a new way", "Makes it disappear", "Makes it bigger"],
        answer: 0,
        why: "A bumper pushes back, so the ball bounces and changes direction.",
      },
      {
        q: "What can stop a ball softly?",
        choices: ["A tall ramp", "A pillow", "A hill"],
        answer: 1,
        why: "Soft things slow a ball down and stop it.",
      },
      {
        q: "Your block wall did not stop the ball. What should you do?",
        choices: ["Make it better and test again", "Cry and quit", "Never play again"],
        answer: 0,
        why: "Engineers change their idea and test again.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, make a ramp from a board or a big book. Roll a toy car down a low ramp, then a taller ramp. Which was faster? Then build a wall with blocks or pillows at the bottom. Does it stop the car? If not, make it better and test again.",
      rubric: [
        "Built a ramp and tried two heights",
        "Said which height made the car faster",
        "Built a wall or stopper and tested it",
        "Changed the design if it did not work",
      ],
    },
  },

  // 3. Sunlight warms the Earth
  {
    id: "sci-k.sunlight",
    title: "Sunshine and Shade",
    minutes: 15,
    stage: "logic",
    standards: ["K-PS3-1", "K-PS3-2", "K-2-ETS1-3"],
    read: [
      "The Sun gives us light. It also gives us warmth. Sunlight warms the things it shines on. Sand at the beach gets hot in the sun. A sidewalk gets warm. Rocks, soil and pond water warm up too.",
      "Things in the shade stay cooler. Shade is a spot where something blocks the sunlight. Trees make shade. So do umbrellas and roofs.",
      "You can test this. Put one rock in the sun. Put another rock in the shade. Wait an hour. Then gently touch them both. The sunny rock feels warmer.",
      "People and animals use shade to stay cool. A dog naps under a tree on a hot day. You can build a shade too! Use a box, a towel or a paper plate. Then test it. Is it cooler under there?",
    ].join("\n\n"),
    keyIdeas: [
      "☀️ Sunlight warms sand, soil, rocks and water.",
      "🌳 Shade is a spot where sunlight is blocked. Things in the shade stay cooler.",
      "⛱️ We can build a shade and test it to see if it keeps things cool.",
    ],
    hook: {
      text: "On a sunny day, the sidewalk can feel hot on your feet. But the grass under a tree feels cool. Why is that? Let's find out!",
    },
    teach: [
      {
        title: "The Sun Warms Things",
        teach:
          "The Sun is a giant star. It is very far away. But its light reaches us every day. Sunlight brings warmth. When sunlight shines on sand, the sand gets warm. It warms sidewalks, rocks and soil. It warms the water in a pond. Have you walked on a sunny sidewalk with bare feet? Ouch! That heat came from the Sun.",
        visual: {
          type: "hotspots",
          title: "What does the Sun warm?",
          center: "☀️ Sun",
          spots: [
            { label: "Sand", icon: "🏖️", detail: "Beach sand gets hot when the sun shines on it all day." },
            { label: "Sidewalk", icon: "🛣️", detail: "A sunny sidewalk can feel hot on bare feet." },
            { label: "Rocks", icon: "🪨", detail: "A rock in the sun feels warm when you touch it." },
            { label: "Pond", icon: "🦆", detail: "Sunlight warms the water at the top of a pond." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Which ones are warmer? Sort them.",
          buckets: ["🔥 Warmer (in the sun)", "😎 Cooler (in the shade)"],
          items: [
            { text: "☀️ A rock in the sun", bucket: 0 },
            { text: "🏖️ Sand in the sun", bucket: 0 },
            { text: "🛣️ A sunny sidewalk", bucket: 0 },
            { text: "🌳 A rock under a tree", bucket: 1 },
            { text: "⛱️ Sand under an umbrella", bucket: 1 },
          ],
          hint: "Sunlight warms things. Shade keeps things cooler.",
          seconds: 35,
        },
        think: {
          q: "Where does the warmth on a sunny sidewalk come from?",
          choices: ["The Moon", "The Sun", "The rain"],
          answer: 1,
          why: "Sunlight shines on the sidewalk and warms it.",
          hints: [
            "The Moon does not warm things up. Look up on a bright day!",
            "",
            "Rain makes things wet and cool, not warm.",
          ],
        },
        approaches: {
          analogy:
            "Sunlight is like a big warm blanket of light. Everything it lands on gets cozy and warm.",
          example:
            "In the morning, a slide at the park feels cool. After the Sun shines on it all day, the slide feels warm, even hot.",
          simpler: {
            q: "Does sunlight make things warmer or colder?",
            choices: ["Warmer", "Colder"],
            answer: 0,
            why: "Sunlight warms the things it shines on.",
            hints: ["", "Think of a sunny beach. Does the sand feel cold or warm?"],
          },
        },
      },
      {
        title: "Sun and Shade",
        teach:
          "Shade is a spot where sunlight is blocked. Something gets in the way of the light. A tree blocks the sun. So does an umbrella. So does a roof. Things in the shade stay cooler. Things in the sun get warmer. A cat on a hot day finds shade. A lizard on a cool morning finds a sunny rock. Animals know!",
        visual: {
          type: "compare",
          left: { title: "☀️ In the sun", points: ["Sunlight shines on it", "It gets warmer", "A lizard warms up here 🦎"] },
          right: { title: "🌳 In the shade", points: ["Sunlight is blocked", "It stays cooler", "A cat cools off here 🐈"] },
        },
        probe: {
          type: "cloze",
          text: "Sunlight makes sand {0}. A big tree makes {1}. Things in the shade stay {2}.",
          blanks: [{ answers: ["warm", "hot", "warmer"] }, { answers: ["shade"] }, { answers: ["cooler", "cool"] }],
          bank: ["warm", "shade", "cooler", "snow", "purple"],
          hint: "The Sun warms things. Trees block the light and make shade.",
          mistakes: [{ match: "snow", coach: "Sunlight does not make snow! It warms things up." }],
          seconds: 35,
        },
        think: {
          q: "What makes shade?",
          choices: ["Something that blocks the sunlight", "A glass of water", "A loud noise"],
          answer: 0,
          why: "Shade is a spot where something blocks the sunlight.",
          hints: [
            "",
            "A glass of water does not make a shady spot to sit in.",
            "Sounds don't block light. Shade comes from something in the way of the Sun.",
          ],
        },
        approaches: {
          analogy:
            "Shade is like a hat for the ground. The hat blocks the sunlight so the ground under it stays cooler.",
          example:
            "Put your hand over a sunny spot on the table. Your hand makes a shadow. That spot is in the shade, and it stays cooler.",
          simpler: {
            q: "On a hot day, where would a dog go to cool off?",
            choices: ["Under a shady tree", "Onto a sunny sidewalk"],
            answer: 0,
            why: "The shade under a tree is cooler.",
            hints: ["", "A sunny sidewalk gets hot. The dog wants a cooler spot."],
          },
        },
      },
      {
        title: "Build a Shade",
        teach:
          "Let's be engineers! Here is a problem. A toy is getting too hot in the sun. How can we keep it cool? Build a shade! You could use a paper plate, a box or a towel. Put it over the toy. Wait a while. Then feel the toy. Is it cooler than a toy with no shade? Try two shades. Which one works better?",
        visual: {
          type: "flip",
          cards: [
            { front: "❓ Problem", back: "A toy gets too hot in the sun." },
            { front: "📦 Build", back: "Make a shade with a box, a towel or a paper plate." },
            { front: "⏳ Wait", back: "Leave it in the sun for a while." },
            { front: "✋ Test", back: "Feel the toy. Is it cooler than the toy with no shade?" },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the shade test in order.",
          steps: ["🧸 Put two toys in the sun", "📦 Cover one toy with a box", "⏳ Wait a while", "✋ Feel both toys to compare"],
          hint: "Set it up, build the shade, wait, then test.",
          seconds: 35,
        },
        think: {
          q: "Which toy will feel cooler after an hour in the sun?",
          choices: ["The toy with no shade", "The toy under a box", "They will be the same"],
          answer: 1,
          why: "The box blocks the sunlight, so the toy under it stays cooler.",
          hints: [
            "The toy with no shade gets sunlight on it all hour, so it warms up.",
            "",
            "One toy is blocked from the sunlight. That makes a difference.",
          ],
        },
        approaches: {
          analogy:
            "A shade for a toy is like a sun hat for you. It keeps the hot sunlight off.",
          example:
            "Jack put two toy cars on a sunny step. He put a box over one. After an hour, the covered car felt cool. The other car felt warm.",
          simpler: {
            q: "What does a shade block?",
            choices: ["Sunlight", "Wind"],
            answer: 0,
            why: "A shade blocks sunlight.",
            hints: ["", "We want to stop the warming light. Which one is light?"],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every thing that makes shade.",
      sentences: ["🌳 A big leafy tree", "⛱️ A beach umbrella", "💧 A puddle", "📦 A big cardboard box", "🫧 A soap bubble"],
      correct: [0, 1, 3],
    },
    explain: {
      prompt: "Tell me why a sidewalk feels hot on a sunny day, and how you could keep a spot cool.",
      keyPoints: [
        "Sunlight warms the things it shines on",
        "Shade is where sunlight is blocked",
        "Things in the shade stay cooler",
        "You can build a shade with a box, towel or umbrella",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each one to what it does.",
        pairs: [
          { left: "☀️ The Sun", right: "Gives light and warmth" },
          { left: "🌳 A tree", right: "Makes shade" },
          { left: "🦎 A lizard", right: "Warms up on a sunny rock" },
        ],
        hint: "The Sun warms. Trees block the sunlight. Lizards like warm rocks.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Sun or shade? Where is each one?",
        buckets: ["☀️ In the sun", "🌳 In the shade"],
        items: [
          { text: "🐕 A dog under a tree", bucket: 1 },
          { text: "🛣️ A hot sidewalk at noon", bucket: 0 },
          { text: "⛱️ A towel under an umbrella", bucket: 1 },
          { text: "🏖️ Hot beach sand with nothing over it", bucket: 0 },
        ],
        hint: "If something blocks the light, it is in the shade.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "Count the things that make shade: 🌳 🌳 ⛱️ 🏠. How many?",
        answer: 4,
        hint: "Trees, umbrellas and houses all block sunlight. Touch each one and count.",
        mistakes: [{ match: "3", coach: "A house roof makes shade too! Count it." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "The {0} warms the sand. A box over a toy keeps it {1}.",
        blanks: [{ answers: ["sun", "sunlight"] }, { answers: ["cool", "cooler"] }],
        bank: ["sun", "cool", "moon", "wet"],
        hint: "Sunlight warms things. Shade keeps them cool.",
        mistakes: [{ match: "moon", coach: "The Moon does not warm the sand. Sunlight does." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What warms the sand at the beach?",
        choices: ["The waves", "The fish", "Sunlight"],
        answer: 2,
        why: "Sunlight warms the things it shines on.",
      },
      {
        q: "What is shade?",
        choices: ["A kind of rain", "A spot where sunlight is blocked", "A very hot place"],
        answer: 1,
        why: "Shade is where something blocks the sunlight.",
      },
      {
        q: "Which rock will feel warmer after an hour?",
        choices: ["The rock in the sun", "The rock in the shade", "The rock in a cool cave"],
        answer: 0,
        why: "Sunlight warms the rock that sits in the sun.",
      },
      {
        q: "How could you keep a toy cool on a sunny day?",
        choices: ["Put it on a hot sidewalk", "Cover it with a shade", "Hold it up to the Sun"],
        answer: 1,
        why: "A shade blocks the sunlight, so the toy stays cooler.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "On a sunny day, go outside with a grown-up. Put one rock or toy in the sun and one in the shade. Wait one hour. Gently touch both. Which feels warmer? Then build a shade with a box or towel and test it.",
      rubric: [
        "Put one thing in the sun and one in the shade",
        "Waited, then felt both",
        "Said which was warmer and why",
        "Built a shade and tested it",
      ],
    },
  },

  // 4. What plants and animals need
  {
    id: "sci-k.needs",
    title: "What Living Things Need",
    minutes: 15,
    stage: "grammar",
    standards: ["K-LS1-1", "K-ESS3-1"],
    read: [
      "Plants and animals are living things. People are living things too. All living things need some things to stay alive.",
      "Animals need food, water and air. They also need a safe place to live. A rabbit eats grass and drinks water. A fish gets air from the water with its gills. You eat food, drink water and breathe air every day.",
      "Plants need water, air and sunlight. Plants do not eat food like we do. They make their own food using sunlight, air and water. Most plants grow in soil too. That is why a plant on a windowsill leans toward the light.",
      "Living things live where their needs are met. A fish lives in a pond full of water. A squirrel lives in a tree with nuts nearby. A cactus lives in the dry desert and stores water inside its stem. Your home has food, water and a cozy bed. Every living thing lives in a place that gives it what it needs.",
    ].join("\n\n"),
    keyIdeas: [
      "🐇 Animals need food, water, air and a safe place to live.",
      "🌱 Plants need water, air and sunlight. They make their own food.",
      "🏡 Living things live in places that give them what they need.",
    ],
    hook: {
      text: "You get hungry. You get thirsty. A puppy does too. What about a flower? What does it need?",
    },
    teach: [
      {
        title: "What Animals Need",
        teach:
          "Animals need food. A rabbit munches carrots and grass. A bird eats seeds and bugs. Animals need water to drink. They need air to breathe. Fish get air from the water with their gills. Animals also need a safe home, like a nest or a burrow. People are living things too. You need food, water, air and a home. Just like a rabbit!",
        visual: {
          type: "hotspots",
          title: "What does a rabbit need?",
          center: "🐇 Rabbit",
          spots: [
            { label: "Food", icon: "🥕", detail: "Rabbits eat grass, leaves and some vegetables." },
            { label: "Water", icon: "💧", detail: "Rabbits drink water every day, just like you." },
            { label: "Air", icon: "💨", detail: "Rabbits breathe air with their noses and lungs." },
            { label: "Safe home", icon: "🕳️", detail: "Wild rabbits dig burrows to hide and rest." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "What does an animal need to live? Sort them.",
          buckets: ["✅ Needs it to live", "❌ Does not need it"],
          items: [
            { text: "🍎 Food", bucket: 0 },
            { text: "💧 Water", bucket: 0 },
            { text: "💨 Air", bucket: 0 },
            { text: "🏠 A safe home", bucket: 0 },
            { text: "📺 A TV", bucket: 1 },
            { text: "🎈 A balloon", bucket: 1 },
            { text: "🧸 A teddy bear", bucket: 1 },
          ],
          hint: "Ask: could the animal stay alive without it? Toys are fun, but animals don't need them to live.",
          mistakes: [{ match: "TV sorted as need", coach: "A rabbit has never watched TV, and it lives just fine! A TV is a want, not a need." }],
          seconds: 40,
        },
        think: {
          q: "Which one does a dog need to stay alive?",
          choices: ["A squeaky toy", "A collar with a bell", "Water to drink"],
          answer: 2,
          why: "All animals need water to live.",
          hints: [
            "A toy is fun, but a dog can live without it.",
            "A collar is nice, but a dog does not need it to stay alive.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Needs are like the gas in a car. Without food, water and air, a body can't keep going.",
          example:
            "A pet hamster needs food in its bowl, water in its bottle, air to breathe, and a cage with a cozy nest. Toys are extra.",
          simpler: {
            q: "Do animals need to breathe air?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "All animals need air.",
            hints: ["", "Hold your breath. You soon need air again! Animals do too."],
          },
        },
      },
      {
        title: "What Plants Need",
        teach:
          "Plants are living things too. They need water. They need air. And they need sunlight! Plants do not eat food like we do. They make their own food with sunlight, air and water. Isn't that amazing? Most plants grow in soil. Their roots drink water from the soil. Put a plant by a window, and it leans toward the light.",
        visual: {
          type: "flip",
          cards: [
            { front: "💧 Water", back: "Roots drink water from the soil." },
            { front: "💨 Air", back: "Leaves take in air." },
            { front: "☀️ Sunlight", back: "Leaves use sunlight to make the plant's food." },
            { front: "🪴 Soil", back: "Most plants grow in soil, which holds water for the roots." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A plant needs {0}, air and {1}. It makes its own {2}.",
          blanks: [{ answers: ["water"] }, { answers: ["sunlight", "light", "sun"] }, { answers: ["food"] }],
          bank: ["water", "sunlight", "food", "candy", "shoes"],
          hint: "Plants need water, air and light. They use them to make food.",
          mistakes: [
            { match: "candy", coach: "Plants don't eat candy! They make their own food from sunlight, air and water." },
            { match: "shoes", coach: "Plants don't wear shoes. Think about what a plant drinks." },
          ],
          seconds: 35,
        },
        think: {
          q: "How does a plant get its food?",
          choices: ["It makes its own food with sunlight", "It hunts bugs at night", "It eats pizza"],
          answer: 0,
          why: "Plants make their own food using sunlight, air and water.",
          hints: [
            "",
            "Most plants don't hunt. They make food in their leaves.",
            "Plants can't eat pizza! They make food a special way.",
          ],
        },
        approaches: {
          analogy:
            "A plant's leaves are like a little kitchen. Sunlight is the stove, and water and air are the things that go in.",
          example:
            "Put one bean plant by a sunny window and one in a dark closet. After a week, the sunny plant is green and strong. The closet plant is pale and droopy.",
          simpler: {
            q: "Does a plant need sunlight?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Plants need sunlight to make their food.",
            hints: ["", "A plant in a dark closet gets weak. It needs light."],
          },
        },
      },
      {
        title: "Homes That Fit",
        teach:
          "Living things live where they get what they need. A fish needs water. So it lives in a pond or the sea. A squirrel needs nuts and a safe nest. So it lives in the trees. A cactus needs little water. So it can live in the dry desert. Your home has food, water and a bed. Every living thing has a home that fits!",
        visual: {
          type: "hotspots",
          title: "Homes that fit",
          center: "🌍 Earth",
          spots: [
            { label: "Fish", icon: "🐟", detail: "Lives in a pond, river or sea. It needs water all around it." },
            { label: "Squirrel", icon: "🐿️", detail: "Lives in trees. It finds nuts and builds a nest there." },
            { label: "Cactus", icon: "🌵", detail: "Lives in the dry desert. It stores water inside its thick stem." },
            { label: "Bird", icon: "🐦", detail: "Builds a nest in a tree or bush, near seeds and bugs to eat." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each living thing to its home.",
          pairs: [
            { left: "🐟 Fish", right: "💧 Pond" },
            { left: "🐿️ Squirrel", right: "🌳 Tree" },
            { left: "🌵 Cactus", right: "🏜️ Desert" },
            { left: "🐄 Cow", right: "🌾 Grassy field" },
          ],
          hint: "Ask: where can it find what it needs? A fish needs water. A cow eats grass.",
          mistakes: [{ match: "Fish matched to tree", coach: "A fish needs water all around it. It can't live in a tree!" }],
          seconds: 40,
        },
        think: {
          q: "Why does a fish live in a pond?",
          choices: ["Ponds are pretty", "It needs water all around it", "It is hiding from birds"],
          answer: 1,
          why: "A fish needs water to live, and a pond is full of water.",
          hints: [
            "Ponds can be pretty, but that's not why. Think about what a fish needs.",
            "",
            "Hiding helps, but the big reason is what a fish needs to live.",
          ],
        },
        approaches: {
          analogy:
            "A home that fits is like a lunchbox packed just for you. It has the things you need inside.",
          example:
            "A frog needs water for its eggs and bugs to eat. So frogs live by ponds, where there is water and lots of bugs.",
          simpler: {
            q: "Where does a fish live?",
            choices: ["In water", "In a tree"],
            answer: 0,
            why: "Fish live in water.",
            hints: ["", "A fish can't climb or breathe in a tree. It needs water."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Who needs it? Plants, animals, or both?",
      buckets: ["🌱 Plants", "🐇 Animals", "🌱🐇 Both"],
      items: [
        { text: "☀️ Sunlight to make food", bucket: 0 },
        { text: "🪴 Soil for roots", bucket: 0 },
        { text: "🥕 Food to eat", bucket: 1 },
        { text: "💧 Water", bucket: 2 },
        { text: "💨 Air", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell me what a plant needs and what an animal needs. How are they the same?",
      keyPoints: [
        "Animals need food, water, air and a safe home",
        "Plants need water, air and sunlight",
        "Plants make their own food",
        "Living things live where their needs are met",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Need or not? Sort them for a puppy.",
        buckets: ["✅ A puppy needs it", "❌ Nice, but not needed"],
        items: [
          { text: "🦴 Food", bucket: 0 },
          { text: "💧 Water", bucket: 0 },
          { text: "🎀 A bow", bucket: 1 },
          { text: "🎾 A tennis ball", bucket: 1 },
        ],
        hint: "Needs keep you alive. Toys and bows are just for fun.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each animal to its home.",
        pairs: [
          { left: "🐻‍❄️ Polar bear", right: "🧊 Icy, snowy land" },
          { left: "🐫 Camel", right: "🏜️ Hot, dry desert" },
          { left: "🐠 Clownfish", right: "🌊 Warm sea" },
        ],
        hint: "Each animal lives where it finds what it needs.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "A plant needs {0} to make its food. A rabbit needs {1} to eat.",
        blanks: [{ answers: ["sunlight", "light", "sun"] }, { answers: ["food", "grass"] }],
        bank: ["sunlight", "food", "rocks", "toys"],
        hint: "Plants make food with light. Animals eat food.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A plant needs water, air and sunlight. How many things is that? 💧💨☀️",
        answer: 3,
        hint: "Touch each one and count: water, air, sunlight.",
        seconds: 15,
      },
    ],
    check: [
      {
        q: "What do all animals need?",
        choices: ["Toys", "Food, water and air", "Shoes"],
        answer: 1,
        why: "All animals need food, water and air to live.",
      },
      {
        q: "How does a plant get its food?",
        choices: ["It buys it", "It eats bugs", "It makes it with sunlight"],
        answer: 2,
        why: "Plants make their own food with sunlight, air and water.",
      },
      {
        q: "Where does a cactus live?",
        choices: ["In the dry desert", "Under the sea", "In the snow"],
        answer: 0,
        why: "A cactus needs little water and stores water inside, so it can live in the desert.",
      },
      {
        q: "Are people living things?",
        choices: ["No, never", "Only on Sundays", "Yes, we are"],
        answer: 2,
        why: "People are living things. We need food, water and air too.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "With a grown-up, look at a plant or a pet at home (or a bird outside). What does it need? Find where it gets water, food or light. Then tell your grown-up three things it needs to live.",
      rubric: [
        "Looked closely at a real plant or animal",
        "Found where it gets water",
        "Named three things it needs to live",
        "Said how its home helps it get what it needs",
      ],
    },
  },

  // 5. Weather
  {
    id: "sci-k.weather",
    title: "Watching the Weather",
    minutes: 15,
    stage: "grammar",
    standards: ["K-ESS2-1", "K-ESS3-2"],
    read: [
      "Weather is what the sky and air are like outside right now. It can be sunny or cloudy. It can be rainy, snowy or windy. It can be hot or cold.",
      "Weather changes. It can change from morning to afternoon. It changes from day to day. It changes with the seasons too. In many places, summer days are hot and winter days are cold.",
      "Scientists watch the weather and write it down. We can too! Each day, draw a sun, a cloud or a raindrop on a chart. After a week, look for patterns. Count the sunny days. Count the rainy days.",
      "Weather forecasters tell us what weather is coming. That helps us get ready. If a big storm is coming, families plan ahead. They stay inside, away from windows, and listen to grown-ups. Remember: when thunder roars, go indoors!",
    ].join("\n\n"),
    keyIdeas: [
      "🌤️ Weather is what the sky and air are like right now.",
      "📅 We can record the weather each day and look for patterns.",
      "⛈️ Forecasts help families get ready for big storms. When thunder roars, go indoors!",
    ],
    hook: {
      text: "Look out the window. What do you see? Is it sunny, cloudy, or rainy? Today we will be weather watchers!",
    },
    teach: [
      {
        title: "What Is Weather?",
        teach:
          "Weather is what it is like outside right now. Is the sun shining? Then it is sunny. Are gray clouds covering the sky? Then it is cloudy. Is water falling down? Then it is rainy. Cold, white flakes? That is snowy! Are the trees bending and swaying? Then it is windy. We can feel weather too. It can be hot or cold.",
        visual: {
          type: "hotspots",
          title: "Kinds of weather",
          center: "🌤️ Weather",
          spots: [
            { label: "Sunny", icon: "☀️", detail: "The Sun shines bright in the sky." },
            { label: "Cloudy", icon: "☁️", detail: "Clouds cover the sky and hide the Sun." },
            { label: "Rainy", icon: "🌧️", detail: "Drops of water fall from the clouds." },
            { label: "Snowy", icon: "❄️", detail: "Cold, white snowflakes fall when it is freezing." },
            { label: "Windy", icon: "💨", detail: "Moving air bends the trees and blows the leaves." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its weather word.",
          pairs: [
            { left: "☀️", right: "Sunny" },
            { left: "🌧️", right: "Rainy" },
            { left: "❄️", right: "Snowy" },
            { left: "💨", right: "Windy" },
            { left: "☁️", right: "Cloudy" },
          ],
          hint: "Sun means sunny. Raindrops mean rainy. Flakes mean snowy. Blowing air means windy.",
          seconds: 40,
        },
        think: {
          q: "The trees are bending and the leaves are blowing. What is the weather?",
          choices: ["Windy", "Snowy", "Sunny and still"],
          answer: 0,
          why: "Moving air bends the trees. That is wind.",
          hints: [
            "",
            "Snow means white flakes falling. Is anything falling?",
            "If the air were still, the trees would not bend.",
          ],
        },
        approaches: {
          analogy:
            "Weather is like the sky's mood today. Some days it is bright and happy, some days it is gray and rainy.",
          example:
            "This morning, Mom looked outside. Gray clouds. Drops on the window. She said, 'It's rainy!' and grabbed an umbrella.",
          simpler: {
            q: "Raindrops are falling. What is the weather?",
            choices: ["Rainy", "Sunny"],
            answer: 0,
            why: "Falling raindrops means it is rainy.",
            hints: ["", "Sunny means the sun shines with no rain falling."],
          },
        },
      },
      {
        title: "Weather Patterns",
        teach:
          "Weather changes. A sunny morning can turn into a rainy afternoon. Scientists keep track. They write down the weather every day. You can too! Make a chart. Each day, draw a sun, a cloud or a raindrop. At the end of the week, count. How many sunny days? How many rainy days? That is a pattern. Seasons have patterns too. Summer is often hot. Winter is often cold.",
        visual: {
          type: "compare",
          left: { title: "☀️ Summer", points: ["Often hot", "Long, sunny days", "Shorts and sun hats 🩳"] },
          right: { title: "❄️ Winter", points: ["Often cold", "Short days", "Coats and mittens 🧤"] },
        },
        probe: {
          type: "number",
          prompt: "Here is our weather chart for the week: ☀️ ☀️ 🌧️ ☀️ 🌧️. How many sunny days?",
          answer: 3,
          hint: "Touch each sun and count: one, two, three...",
          mistakes: [
            { match: "2", coach: "Count again. Look for a sun at the end of the row too." },
            { match: "5", coach: "That's all the days. Count only the suns." },
          ],
          seconds: 20,
        },
        think: {
          q: "Our chart has 5 suns and 1 raindrop. What was the week like?",
          choices: ["Mostly rainy", "Mostly sunny", "All snowy"],
          answer: 1,
          why: "There were more sunny days than rainy days.",
          hints: [
            "Only 1 day had rain. Were there more suns or raindrops?",
            "",
            "There are no snowflakes on the chart at all.",
          ],
        },
        approaches: {
          analogy:
            "A weather chart is like a sticker chart. At the end of the week, you count the stickers to see what happened most.",
          example:
            "Monday sun, Tuesday sun, Wednesday cloud, Thursday sun, Friday rain. Count the suns: 3. Most days were sunny!",
          simpler: {
            q: "Which season is often cold?",
            choices: ["Summer", "Winter"],
            answer: 1,
            why: "Winter is often the coldest season.",
            hints: ["Summer is often hot, with long sunny days.", ""],
          },
        },
      },
      {
        title: "Ready for Storms",
        teach:
          "Weather forecasters study the sky. They tell us what weather is coming. Why does that help? So we can get ready! A forecast of rain means grab a raincoat. A forecast of a big storm means make a plan. Stay inside. Stay away from windows. Keep a flashlight ready. Listen to your grown-ups. And remember this rule: when thunder roars, go indoors!",
        visual: {
          type: "flip",
          cards: [
            { front: "📺 Forecast", back: "A guess, made by weather scientists, about what weather is coming." },
            { front: "⛈️ Thunderstorm", back: "When thunder roars, go indoors!" },
            { front: "🔦 Be ready", back: "Keep a flashlight ready in case the lights go out." },
            { front: "👨‍👩‍👧 Listen", back: "Listen to your grown-ups and follow the plan." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "A big storm is coming. Safe or not safe?",
          buckets: ["✅ Safe", "❌ Not safe"],
          items: [
            { text: "🏠 Go inside when you hear thunder", bucket: 0 },
            { text: "🔦 Keep a flashlight ready", bucket: 0 },
            { text: "👂 Listen to your grown-ups", bucket: 0 },
            { text: "🌳 Stand under a tall tree in a storm", bucket: 1 },
            { text: "🏊 Swim in the pool during lightning", bucket: 1 },
          ],
          hint: "In a storm, the safe place is inside a building.",
          mistakes: [{ match: "tree sorted as safe", coach: "Lightning can strike tall trees. Go inside a building instead." }],
          seconds: 35,
        },
        think: {
          q: "You hear thunder while you play outside. What should you do?",
          choices: ["Keep playing", "Go indoors", "Climb a tree"],
          answer: 1,
          why: "When thunder roars, go indoors!",
          hints: [
            "Thunder means lightning is near. Playing outside is not safe.",
            "",
            "Tall trees are a bad place to be in a storm.",
          ],
        },
        approaches: {
          analogy:
            "A forecast is like a friend who tells you a puddle is ahead, so you can step around it.",
          example:
            "The forecast said a big storm was coming tonight. The family brought the bikes inside, found the flashlight, and stayed in. They were ready!",
          simpler: {
            q: "Where is safe in a thunderstorm?",
            choices: ["Inside a house", "On the playground"],
            answer: 0,
            why: "Inside a building is the safe place in a storm.",
            hints: ["", "The playground is outside. When thunder roars, go indoors."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What would you wear? Sort each one by weather.",
      buckets: ["☀️ Hot and sunny", "🌧️ Rainy", "❄️ Snowy"],
      items: [
        { text: "🩳 Shorts", bucket: 0 },
        { text: "👒 A sun hat", bucket: 0 },
        { text: "☂️ An umbrella", bucket: 1 },
        { text: "🧥 A raincoat", bucket: 1 },
        { text: "🧤 Mittens", bucket: 2 },
        { text: "🧣 A warm scarf", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell me what weather is, how we can keep track of it, and why forecasts help us.",
      keyPoints: [
        "Weather is what it is like outside right now",
        "Weather can be sunny, cloudy, rainy, snowy or windy",
        "We can draw the weather on a chart and count",
        "Forecasts help us get ready for storms",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match the weather to what to bring.",
        pairs: [
          { left: "🌧️ Rainy", right: "☂️ Umbrella" },
          { left: "❄️ Snowy", right: "🧤 Mittens" },
          { left: "☀️ Hot and sunny", right: "🧢 Sun hat" },
        ],
        hint: "What keeps you dry? Warm? Shady?",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Weather chart: 🌧️ ☀️ 🌧️ 🌧️ ☁️. How many rainy days?",
        answer: 3,
        hint: "Count only the raindrop clouds.",
        mistakes: [{ match: "5", coach: "That's every day. Count only the rainy ones." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "When thunder roars, go {0}! A {1} tells us what weather is coming.",
        blanks: [{ answers: ["indoors", "inside"] }, { answers: ["forecast"] }],
        bank: ["indoors", "forecast", "outside", "swimming"],
        hint: "In a storm, the safe place is inside. Weather scientists make forecasts.",
        mistakes: [{ match: "outside", coach: "Outside is not safe in a thunderstorm. Go inside!" }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the weather-watcher steps in order.",
        steps: ["👀 Look outside", "✏️ Draw the weather on the chart", "📅 Do it every day for a week", "🔢 Count the suns and raindrops"],
        hint: "Look, draw, keep going all week, then count.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Gray clouds cover the sky, but no rain falls. What is the weather?",
        choices: ["Snowy", "Cloudy", "Sunny"],
        answer: 1,
        why: "Clouds covering the sky means it is cloudy.",
      },
      {
        q: "Which season is often hot?",
        choices: ["Winter", "Nighttime", "Summer"],
        answer: 2,
        why: "Summer days are often hot.",
      },
      {
        q: "Why do people listen to the weather forecast?",
        choices: ["To get ready for the weather", "To hear music", "To learn to swim"],
        answer: 0,
        why: "A forecast tells us what weather is coming, so we can get ready.",
      },
      {
        q: "What should you do when you hear thunder?",
        choices: ["Fly a kite", "Go indoors", "Stand under a tree"],
        answer: 1,
        why: "When thunder roars, go indoors!",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a weather chart with a grown-up. Each day for one week, look outside and draw a sun, a cloud, a raindrop, a snowflake or wind. At the end of the week, count each kind. Which weather happened the most?",
      rubric: [
        "Looked at the weather each day",
        "Drew the weather on a chart for a week",
        "Counted each kind of weather",
        "Said which weather happened the most",
      ],
    },
  },

  // 6. Changing and caring for our world
  {
    id: "sci-k.caring",
    title: "Changing and Caring for Our World",
    minutes: 15,
    stage: "rhetoric",
    standards: ["K-ESS2-2", "K-ESS3-3", "K-ESS3-1"],
    read: [
      "Plants and animals change the places where they live. They do it to meet their needs. A squirrel digs holes to hide its nuts. A beaver cuts down small trees with its strong teeth. It builds a dam across a stream, and a pond forms behind it. Tree roots can grow so big they crack a sidewalk.",
      "People change their surroundings too. We build houses for shelter. We plant gardens for food. We dig wells for water.",
      "We can also take care of the land, water, air and living things around us. Here are three helpers: reduce, reuse and recycle. Reduce means use less, like turning off the water while you brush your teeth. Reuse means use something again, like keeping crayons in an old jar. Recycle means sorting paper, cans and bottles so they can be made into new things.",
      "We can plant a tree, fill a bird bath and put trash in the trash can. Little jobs make a big difference!",
    ].join("\n\n"),
    keyIdeas: [
      "🦫 Animals and plants change their homes to meet their needs.",
      "🏡 People change the land too: houses, gardens and wells.",
      "♻️ Reduce, reuse and recycle help take care of our world.",
    ],
    hook: {
      text: "A beaver chews and chews on a tree. Crash! Down it falls. What will the beaver build? Let's find out!",
    },
    teach: [
      {
        title: "Animals Change Their Homes",
        teach:
          "Animals change the places where they live. They do it to get what they need. A beaver chews down small trees. It piles up sticks and mud across a stream. That is a dam. Water backs up and makes a pond. Now the beaver has a safe home! A squirrel digs holes to hide nuts. A bird builds a nest. Even tree roots can crack a sidewalk.",
        visual: {
          type: "hotspots",
          title: "Builders in nature",
          center: "🌳 Nature",
          spots: [
            { label: "Beaver", icon: "🦫", detail: "Chews down trees and builds a dam. A pond forms behind it." },
            { label: "Squirrel", icon: "🐿️", detail: "Digs little holes in the ground to hide nuts for winter." },
            { label: "Bird", icon: "🐦", detail: "Weaves twigs and grass into a nest for its eggs." },
            { label: "Tree roots", icon: "🌳", detail: "Roots grow big and strong. They can crack a sidewalk." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each one to how it changes its home.",
          pairs: [
            { left: "🦫 Beaver", right: "Builds a dam" },
            { left: "🐿️ Squirrel", right: "Digs holes for nuts" },
            { left: "🐦 Bird", right: "Builds a nest" },
            { left: "🌳 Tree roots", right: "Crack a sidewalk" },
          ],
          hint: "Beavers build dams. Birds build nests. Squirrels hide nuts.",
          seconds: 40,
        },
        think: {
          q: "Why does a beaver build a dam?",
          choices: ["To make a pond for a safe home", "To play a game", "To catch the rain"],
          answer: 0,
          why: "The dam makes a pond, and the beaver gets a safe home in the water.",
          hints: [
            "",
            "Beavers work hard for a reason. What do they get from the pond?",
            "The dam holds back a stream, not rain from the sky.",
          ],
        },
        approaches: {
          analogy:
            "A beaver is like a builder with a hard hat. It changes the land to make the home it needs.",
          example:
            "A beaver piles sticks and mud across a little stream. The water can't get past. It spreads out and makes a pond. The beaver builds its lodge in the pond.",
          simpler: {
            q: "What does a bird build for its eggs?",
            choices: ["A nest", "A boat"],
            answer: 0,
            why: "Birds build nests to keep their eggs safe.",
            hints: ["", "Birds don't build boats. They make something cozy in a tree."],
          },
        },
      },
      {
        title: "People Change Their Homes",
        teach:
          "People change the land too. We need shelter, so we build houses. We need food, so we plant gardens and farms. We need water, so we dig wells and build pipes. We build roads to get from place to place. These changes help us live. But we want to be careful too. We want to keep the land, water and air clean.",
        visual: {
          type: "flip",
          cards: [
            { front: "🏠 Shelter", back: "People build houses to stay safe and warm." },
            { front: "🥕 Food", back: "People plant gardens and farms to grow food." },
            { front: "💧 Water", back: "People dig wells and build pipes to bring water home." },
            { front: "🛣️ Roads", back: "People build roads to get from place to place." },
          ],
        },
        probe: {
          type: "cloze",
          text: "People build {0} for shelter. People plant {1} to grow food.",
          blanks: [{ answers: ["houses", "homes"] }, { answers: ["gardens", "farms"] }],
          bank: ["houses", "gardens", "clouds", "rainbows"],
          hint: "What do we live in? Where do vegetables grow?",
          mistakes: [{ match: "clouds", coach: "People can't build clouds! What do we live inside?" }],
          seconds: 30,
        },
        think: {
          q: "Why do people plant gardens?",
          choices: ["To make the rain stop", "To grow food", "To scare birds"],
          answer: 1,
          why: "People plant gardens to grow food they need.",
          hints: [
            "Gardens can't stop the rain. Think about what grows in a garden.",
            "",
            "Scarecrows scare birds. Gardens are for growing something we eat.",
          ],
        },
        approaches: {
          analogy:
            "People are like beavers with tools. We change the land to get shelter, food and water.",
          example:
            "A family digs up a sunny patch of yard. They plant tomato seeds. They water them. In summer, they pick tomatoes to eat. They changed the land to get food.",
          simpler: {
            q: "What do people build to live in?",
            choices: ["Houses", "Puddles"],
            answer: 0,
            why: "People build houses for shelter.",
            hints: ["", "We can't live in a puddle! We build something with walls and a roof."],
          },
        },
      },
      {
        title: "Reduce, Reuse, Recycle",
        teach:
          "We can take care of our world with three helpers. Reduce means use less. Turn off the water while you brush your teeth. Reuse means use it again. Keep your crayons in an old jar. Recycle means sort paper, cans and bottles. Then they can be made into new things. We can also plant trees, fill a bird bath and put trash in the can.",
        visual: {
          type: "flip",
          cards: [
            { front: "⬇️ Reduce", back: "Use less. Turn off the water while you brush." },
            { front: "🔁 Reuse", back: "Use it again. An old jar can hold crayons." },
            { front: "♻️ Recycle", back: "Sort paper, cans and bottles so they become new things." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Reduce, reuse or recycle? Sort them.",
          buckets: ["⬇️ Reduce (use less)", "🔁 Reuse (use again)", "♻️ Recycle (make new)"],
          items: [
            { text: "🚰 Turn off the water while brushing", bucket: 0 },
            { text: "💡 Turn off the light when you leave", bucket: 0 },
            { text: "🫙 Keep crayons in an old jar", bucket: 1 },
            { text: "👕 Give outgrown clothes to a cousin", bucket: 1 },
            { text: "🥫 Put an empty can in the recycling bin", bucket: 2 },
            { text: "📰 Put old paper in the recycling bin", bucket: 2 },
          ],
          hint: "Reduce is using less. Reuse is using it again. Recycle is the bin that turns things into new things.",
          seconds: 45,
        },
        think: {
          q: "You keep your crayons in an old jar. Which helper is that?",
          choices: ["Recycle", "Reduce", "Reuse"],
          answer: 2,
          why: "Using the jar again for something new is reusing.",
          hints: [
            "Recycling means sending it off to be made into something new. The jar stays with you.",
            "Reduce means using less. Here you're using the jar again.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Think of a lunchbox. Pack a little less (reduce). Use the same box every day (reuse). Put the juice can in the bin (recycle).",
          example:
            "After lunch, Ava washed her cup to use again. That's reuse. She put the soup can in the recycling bin. That's recycle. She turned off the faucet. That's reduce!",
          simpler: {
            q: "Turning off the water while you brush helps us use...",
            choices: ["Less water", "More water"],
            answer: 0,
            why: "Turning off the faucet saves water. That is reduce.",
            hints: ["", "When the faucet is off, no water is running out. So is it more, or less?"],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every way to take care of our world.",
      sentences: [
        "🌱 Plant a tree",
        "🗑️ Leave trash on the beach",
        "🐦 Fill a bird bath with fresh water",
        "🚰 Turn off the water while brushing",
        "🐜 Stomp on an ant hill",
      ],
      correct: [0, 2, 3],
    },
    explain: {
      prompt: "Tell me how a beaver changes its home, how people change theirs, and one way you can take care of our world.",
      keyPoints: [
        "A beaver builds a dam and makes a pond",
        "People build houses and plant gardens",
        "Reduce means use less",
        "Reuse means use it again",
        "Recycle means it gets made into something new",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match the helper to what it means.",
        pairs: [
          { left: "⬇️ Reduce", right: "Use less" },
          { left: "🔁 Reuse", right: "Use it again" },
          { left: "♻️ Recycle", right: "Make it into something new" },
        ],
        hint: "Reduce is less. Reuse is again. Recycle is new.",
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Who made the change? Sort them.",
        buckets: ["🐾 Animals or plants", "🧑 People"],
        items: [
          { text: "🦫 A dam of sticks and mud", bucket: 0 },
          { text: "🪺 A nest in a tree", bucket: 0 },
          { text: "🏠 A house with a roof", bucket: 1 },
          { text: "🥕 A vegetable garden in rows", bucket: 1 },
        ],
        hint: "Beavers and birds build with sticks. People build houses and plant gardens.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "A beaver builds a {0}. Then a {1} forms behind it.",
        blanks: [{ answers: ["dam"] }, { answers: ["pond"] }],
        bank: ["dam", "pond", "car", "desert"],
        hint: "The beaver blocks the stream. The water spreads out.",
        mistakes: [{ match: "desert", coach: "A desert is dry. The dam holds back water, so it makes something wet." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the ones that go in the recycling bin.",
        sentences: ["🥫 An empty can", "🍌 A banana peel", "📰 Old newspaper", "🍾 A clean glass bottle"],
        correct: [0, 2, 3],
        hint: "Paper, cans and bottles can be made into new things.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does a beaver build across a stream?",
        choices: ["A dam", "A nest", "A house of bricks"],
        answer: 0,
        why: "A beaver builds a dam of sticks and mud, and a pond forms.",
      },
      {
        q: "Why do people build houses?",
        choices: ["To hide from birds", "For shelter", "To stop the wind forever"],
        answer: 1,
        why: "Houses give people shelter, a safe and warm place to live.",
      },
      {
        q: "Putting a can in the recycling bin is...",
        choices: ["Reduce", "Reuse", "Recycle"],
        answer: 2,
        why: "Recycling means the can is made into something new.",
      },
      {
        q: "Which one helps take care of our world?",
        choices: ["Leaving the water running", "Planting a tree", "Dropping trash on the grass"],
        answer: 1,
        why: "Planting a tree helps the land, the air and the animals.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, do one reduce, one reuse and one recycle job at home. Turn off a light you don't need. Find something old to use again, like a jar or a box. Help sort the recycling. Then tell your grown-up which job was which.",
      rubric: [
        "Did one thing to reduce (use less)",
        "Reused something in a new way",
        "Helped sort the recycling",
        "Said which job was reduce, reuse and recycle",
      ],
    },
  },
]);
