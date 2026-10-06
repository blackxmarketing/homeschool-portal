import { k5Course } from "./base";

/**
 * sci-3: Grade 3 science (NGSS). Forces and magnets in the fall, living
 * things through winter and spring, then weather and climate. See
 * docs/WORLDS.md and ../types.ts for the lesson format.
 */
export const sci3 = k5Course("sci", 3, [
  // 1. Forces: balanced and unbalanced, and patterns of motion
  {
    id: "sci-3.forces",
    title: "Pushes, Pulls and Patterns of Motion",
    minutes: 30,
    stage: "grammar",
    standards: ["3-PS2-1", "3-PS2-2", "3-5-ETS1-3"],
    read: [
      "A force is a push or a pull. When you kick a ball, you push it. When you open a drawer, you pull it. Every force has a size, which means how strong it is, and a direction, which means which way it goes.",
      "Most things have more than one force acting on them at the same time. A book resting on a table is pulled down by gravity, and the table pushes up on it just as hard. The two forces are the same size and go in opposite directions, so they cancel out. We call these balanced forces. When forces are balanced, an object's motion does not change. A still object stays still, and a moving object keeps going the same way at the same speed.",
      "When one force is stronger than the other, the forces are unbalanced. Unbalanced forces change motion. They can make something start moving, stop, speed up, slow down or turn. In a tug-of-war, if both teams pull equally hard, the rope does not move. If one team pulls harder, the rope moves toward that team.",
      "Scientists watch motion carefully and look for patterns. A swing goes back and forth, back and forth, and each trip takes about the same amount of time. A ball rolled down a ramp goes faster when the ramp starts higher. Once you find a pattern, you can predict what will happen next. That is one of the most useful things a scientist can do.",
      "To test an idea about forces fairly, change only one thing at a time, keep everything else the same, and repeat the test more than once.",
    ].join("\n\n"),
    keyIdeas: [
      "A force is a push or a pull, with a size and a direction.",
      "Balanced forces cancel out and do not change motion. Unbalanced forces start, stop, speed up, slow down or turn things.",
      "Motion often follows a pattern, and a pattern lets you predict what happens next.",
    ],
    hook: {
      text: "On the Sky Islands, two bridges are drifting apart. Pip ties a rope between them and pulls. Nothing moves. Then a friend pulls on the other side, and still nothing moves. What is going on? Today we find out how pushes and pulls work together.",
    },
    teach: [
      {
        title: "Forces Have Size and Direction",
        teach:
          "A force is a push or a pull. You push a door to close it. You pull a wagon to bring it along. Every force has two things you can describe. The first is its size, or how strong it is. A gentle tap on a ball is a small force. A hard kick is a big force. The second is its direction, or which way it goes. A push to the left moves things left. A pull upward lifts things up. Gravity is a force too. It pulls everything down toward the ground. What forces do you notice around you right now?",
        visual: {
          type: "flip",
          cards: [
            { front: "Force", back: "A push or a pull." },
            { front: "Size of a force", back: "How strong the push or pull is. A tap is small; a kick is big." },
            { front: "Direction of a force", back: "Which way the push or pull goes: left, right, up, down." },
            { front: "Gravity", back: "A pull that brings things down toward the ground." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each action: is it a push or a pull?",
          buckets: ["Push", "Pull"],
          items: [
            { text: "Kicking a soccer ball", bucket: 0 },
            { text: "Closing a door with your hand", bucket: 0 },
            { text: "Pressing a doorbell", bucket: 0 },
            { text: "Opening a drawer", bucket: 1 },
            { text: "Pulling a wagon by its handle", bucket: 1 },
            { text: "Lifting a bucket up from a well with a rope", bucket: 1 },
          ],
          hint: "A push moves something away from you. A pull brings something toward you.",
          mistakes: [
            { match: "Opening a drawer sorted as push", coach: "When you open a drawer, it slides toward you. Toward you means pull." },
            { match: "Kicking sorted as pull", coach: "Your foot sends the ball away from you. Away from you means push." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which two things describe every force?",
          choices: ["Its color and its sound", "Its size and its direction", "Its weight and its smell"],
          answer: 1,
          why: "Every force has a size (how strong) and a direction (which way).",
          hints: [
            "Forces don't have colors or sounds. Think about how strong a push is and which way it goes.",
            "",
            "Smell has nothing to do with a push. Think about how strong it is and which way it goes.",
          ],
        },
        approaches: {
          analogy:
            "A force is like an arrow. The length of the arrow shows how strong it is, and the way the arrow points shows its direction.",
          example:
            "Tap a toy car gently and it rolls a little way. Push it hard and it zooms across the floor. Push it to the left and it goes left. Same car, different size and direction of force.",
          simpler: {
            q: "Is opening a drawer a push or a pull?",
            choices: ["A push", "A pull"],
            answer: 1,
            why: "The drawer comes toward you, so it is a pull.",
            hints: ["Watch which way the drawer moves. It comes toward you, and that is a pull.", ""],
          },
        },
      },
      {
        title: "Balanced and Unbalanced Forces",
        teach:
          "Most objects have more than one force on them. A book on a table is pulled down by gravity. The table pushes up just as hard. The forces are equal and opposite, so they cancel. These are balanced forces, and balanced forces do not change motion. The book stays put. Now think about a tug-of-war. If both teams pull with the same strength, the rope stays still. If one team pulls harder, the forces are unbalanced, and the rope moves toward the stronger team. Unbalanced forces change motion. They make things start, stop, speed up, slow down or turn.",
        visual: {
          type: "compare",
          left: { title: "Balanced forces", points: ["Equal size, opposite directions", "They cancel out", "Motion does not change", "A book resting on a table"] },
          right: { title: "Unbalanced forces", points: ["One force is stronger", "They do not cancel", "Motion changes: start, stop, speed up, slow down, turn", "A tug-of-war where one team pulls harder"] },
        },
        probe: {
          type: "sort",
          prompt: "Are the forces balanced or unbalanced?",
          buckets: ["Balanced (motion stays the same)", "Unbalanced (motion changes)"],
          items: [
            { text: "A lamp sitting still on a desk", bucket: 0 },
            { text: "A tug-of-war where the rope does not move", bucket: 0 },
            { text: "A soccer ball kicked from rest", bucket: 1 },
            { text: "A bike slowing down when you squeeze the brakes", bucket: 1 },
            { text: "A sled speeding up down a hill", bucket: 1 },
            { text: "Two friends pushing equally hard on opposite sides of a box that stays still", bucket: 0 },
          ],
          hint: "Ask: does the motion change? If it starts, stops, speeds up, slows down or turns, the forces are unbalanced.",
          mistakes: [
            { match: "Lamp sorted as unbalanced", coach: "The lamp isn't changing its motion at all. Gravity pulls down and the desk pushes up the same amount, so the forces are balanced." },
            { match: "Bike slowing sorted as balanced", coach: "Slowing down is a change in motion. A change in motion means the forces are unbalanced." },
          ],
          seconds: 40,
        },
        think: {
          q: "In a tug-of-war, the rope suddenly moves toward Team Blue. What happened?",
          choices: ["The forces became balanced", "Team Blue pulled harder, so the forces became unbalanced", "Both teams stopped pulling"],
          answer: 1,
          why: "The rope moves toward the side pulling harder. That means the forces are unbalanced.",
          hints: [
            "Balanced forces cancel out, and the rope would stay still. It moved, so something is stronger.",
            "",
            "If nobody pulled, the rope wouldn't suddenly move toward one side.",
          ],
        },
        approaches: {
          analogy:
            "Balanced forces are like a seesaw with two friends of the same weight: it stays level. If one friend is much heavier, the seesaw tips. That tip is what unbalanced forces do.",
          example:
            "Push a box with a force of 20 from the left while a friend pushes with 20 from the right. The box stays still. If your friend pushes with 30 instead, the box slides toward you, because 30 is more than 20.",
          simpler: {
            q: "A ball sits still on the floor. Is its motion changing?",
            choices: ["No, it stays still", "Yes, it is speeding up"],
            answer: 0,
            why: "It stays still, so its motion is not changing. The forces on it are balanced.",
            hints: ["", "Look again: the ball is just sitting there, not moving faster and faster."],
          },
        },
      },
      {
        title: "Patterns of Motion",
        teach:
          "Scientists watch how things move and look for patterns. A pattern is something that happens again and again in the same way. A swing goes back and forth, and each full trip takes about the same time. A ball rolled down a ramp speeds up, and it goes faster at the bottom when the ramp starts higher. A spinning top wobbles more and more as it slows. Once you find a pattern, you can predict what comes next. If a swing takes 2 seconds for each trip, you can predict how many trips it makes in 10 seconds. Try the ramp. What do you notice?",
        visual: { type: "ramp" },
        probe: {
          type: "number",
          prompt: "A swing makes one full trip (out and back) every 2 seconds. How many full trips will it make in 10 seconds?",
          answer: 5,
          unit: "trips",
          hint: "Count by 2s up to 10: 2, 4, 6, 8, 10. How many numbers did you say?",
          mistakes: [
            { match: "20", coach: "That's 10 times 2. But each trip takes 2 seconds, so divide: 10 seconds split into groups of 2." },
            { match: "10", coach: "10 is the number of seconds. Each trip takes 2 of those seconds." },
          ],
          seconds: 30,
        },
        think: {
          q: "A ball rolls down a ramp. You start it higher up the ramp. What do you predict?",
          choices: ["It will be faster at the bottom", "It will be slower at the bottom", "It will not move at all"],
          answer: 0,
          why: "The pattern is: the higher the start, the faster the ball at the bottom.",
          hints: [
            "",
            "Think of sledding: the bigger the hill, the faster you go at the bottom.",
            "Gravity still pulls the ball down the ramp, so it will roll.",
          ],
        },
        approaches: {
          analogy:
            "Finding a motion pattern is like learning the beat of a song. Once you hear the beat a few times, you can clap along and know exactly when the next beat will come.",
          example:
            "Mia times her swing: 2 seconds, 2 seconds, 2 seconds. She predicts 5 trips in 10 seconds, counts, and gets 5. Her pattern let her predict the future.",
          simpler: {
            q: "A pendulum goes left, right, left, right. What comes next?",
            choices: ["Left", "It stops forever"],
            answer: 0,
            why: "The pattern repeats: left, right, left, right, left.",
            hints: ["", "It's still swinging. Follow the pattern: left, right, left, right..."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What will happen? Sort each situation.",
      buckets: ["Motion stays the same", "Motion changes"],
      items: [
        { text: "A box with equal pushes on both sides", bucket: 0 },
        { text: "A car parked on flat ground", bucket: 0 },
        { text: "A hockey puck hit by a stick", bucket: 1 },
        { text: "A rolling ball that hits a wall", bucket: 1 },
        { text: "A kite when a strong gust of wind blows", bucket: 1 },
        { text: "A picture hanging still on a nail", bucket: 0 },
      ],
    },
    explain: {
      prompt: "Explain the difference between balanced and unbalanced forces. Use a tug-of-war or another example.",
      keyPoints: [
        "A force is a push or a pull",
        "Balanced forces are equal and opposite and cancel out",
        "Balanced forces do not change motion",
        "Unbalanced forces change motion: start, stop, speed up, slow down or turn",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "When two forces are equal and opposite, they are {0} and the motion does not change. When one force is stronger, the forces are {1} and the motion {2}.",
        blanks: [{ answers: ["balanced"] }, { answers: ["unbalanced"] }, { answers: ["changes"] }],
        bank: ["balanced", "unbalanced", "changes", "disappears", "magnetic"],
        hint: "Equal forces cancel out. A stronger force wins and changes the motion.",
        mistakes: [{ match: "disappears", coach: "The object doesn't vanish! Unbalanced forces change how it moves." }],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "In a tug-of-war, the left team pulls with a force of 60 and the right team pulls with a force of 45. How much stronger is the left team's pull?",
        answer: 15,
        hint: "Subtract the smaller pull from the bigger pull.",
        mistakes: [{ match: "105", coach: "You added. The teams pull in opposite directions, so find the difference: 60 minus 45." }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the steps of a fair ramp test in order.",
        steps: [
          "Ask a question: does a higher ramp make a ball roll farther?",
          "Set up the ramp, the same ball and a measuring tape",
          "Roll the ball from a low height and measure how far it goes",
          "Raise only the height and roll the same ball again",
          "Repeat each test three times and compare the results",
        ],
        hint: "Start with a question, set up, test one height, change one thing, then repeat and compare.",
        seconds: 45,
      },
      {
        type: "match",
        prompt: "Match each motion to its pattern.",
        pairs: [
          { left: "A swing", right: "Back and forth, the same time each trip" },
          { left: "A ball rolled down a taller ramp", right: "Faster at the bottom" },
          { left: "A merry-go-round", right: "Around and around in a circle" },
          { left: "A bouncing ball", right: "Each bounce is a little lower" },
        ],
        hint: "Picture each one moving. Which way does it go, and what repeats?",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What is a force?",
        choices: ["A kind of energy drink", "A push or a pull", "Anything that is heavy"],
        answer: 1,
        why: "A force is a push or a pull.",
      },
      {
        q: "A lamp sits still on a desk. The forces on it are...",
        choices: ["balanced", "unbalanced", "missing"],
        answer: 0,
        why: "Gravity pulls down and the desk pushes up equally, so the forces are balanced and the lamp stays still.",
      },
      {
        q: "Which of these shows unbalanced forces?",
        choices: ["A car parked on a flat road", "A book on a shelf", "A sled speeding up down a hill"],
        answer: 2,
        why: "Speeding up is a change in motion, which only happens with unbalanced forces.",
      },
      {
        q: "Why do scientists look for patterns in motion?",
        choices: ["To make things move slower", "So they can predict what will happen next", "Because patterns make things heavier"],
        answer: 1,
        why: "A pattern that repeats lets you predict the next motion.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Build a ramp from a book and a board (or a big piece of cardboard). Roll a toy car from the bottom of the ramp with the ramp at 1 book high, then 2 books, then 3 books. Measure how far the car rolls each time, and do each height three times. Make a table, find the pattern, and predict how far it will go at 4 books. Then test your prediction.",
      rubric: [
        "Changed only the ramp height and kept the car and floor the same",
        "Recorded the distances in a table, three tries for each height",
        "Described the pattern in a sentence",
        "Made a prediction for 4 books and tested it",
      ],
    },
  },

  // 2. Magnets and static electricity
  {
    id: "sci-3.magnets",
    title: "Magnets, Static and a Magnetic Design",
    minutes: 30,
    stage: "logic",
    standards: ["3-PS2-3", "3-PS2-4", "3-5-ETS1-1"],
    read: [
      "Most forces happen when things touch. You touch a ball to kick it. But some forces can push or pull without touching at all. Magnets are one of them.",
      "A magnet pulls on things made of iron and steel, and on a few other metals like nickel. It does not pull on wood, plastic, glass, paper, copper or aluminum. Every magnet has two ends called poles: a north pole and a south pole. Two opposite poles, north and south, attract, which means they pull together. Two poles that are the same, like north and north, repel, which means they push apart. The pull of a magnet can even work through paper, cloth or water. But it gets weaker as the magnet gets farther away.",
      "Static electricity is another force that works without touching. When you rub a balloon on your hair, tiny bits of electric charge move from your hair to the balloon. Now the balloon can pull your hair toward it, or pick up small bits of paper, or stick to a wall. On a dry winter day, you might even feel a small shock when you touch a doorknob. That is static electricity too.",
      "Because magnets push and pull without touching, people use them to solve problems. A magnet keeps a cabinet door closed. A magnet holds notes on the refrigerator. At recycling centers, big magnets lift steel cans out of a pile and leave aluminum cans behind. When engineers solve a problem, they first describe it clearly: what must the solution do, and what are the limits on materials, time or cost?",
    ].join("\n\n"),
    keyIdeas: [
      "Magnets attract iron and steel, but not wood, plastic, paper, copper or aluminum.",
      "Opposite poles attract and like poles repel, and the force gets weaker with distance.",
      "Static electricity and magnets push or pull without touching, and people use magnets to solve problems.",
    ],
    hook: {
      text: "Pip holds a balloon near Dr. Carver's hair. The hair rises up without being touched! Then Pip slides a magnet under a paper plate, and a paper clip on top starts to dance. How can something push or pull without touching?",
    },
    teach: [
      {
        title: "What Magnets Attract",
        teach:
          "A magnet is an object that pulls on certain metals. Hold a magnet near a paper clip, and the clip jumps to it. Paper clips are made of steel, and steel contains iron. Magnets attract iron, steel, nickel and a few other metals. They do not attract wood, plastic, glass, rubber or paper. Here is a surprise: not every metal is magnetic. A magnet does not pull on aluminum foil, copper pennies or a gold ring. So the only way to know for sure is to test. What do you predict a magnet will pick up in your kitchen?",
        visual: {
          type: "flip",
          cards: [
            { front: "Magnet", back: "An object that pulls on iron, steel and a few other metals." },
            { front: "Attract", back: "To pull toward." },
            { front: "Magnetic materials", back: "Iron, steel, nickel and cobalt." },
            { front: "Not magnetic", back: "Wood, plastic, glass, paper, rubber, and even some metals like aluminum and copper." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Will a magnet pull on it? Sort each object.",
          buckets: ["Attracted by a magnet", "Not attracted"],
          items: [
            { text: "A steel paper clip", bucket: 0 },
            { text: "An iron nail", bucket: 0 },
            { text: "A steel bottle cap", bucket: 0 },
            { text: "A wooden pencil", bucket: 1 },
            { text: "A sheet of aluminum foil", bucket: 1 },
            { text: "A plastic button", bucket: 1 },
            { text: "A rubber band", bucket: 1 },
          ],
          hint: "Magnets attract iron and steel. Not all metals: aluminum is a metal that magnets don't pull.",
          mistakes: [
            { match: "Aluminum foil sorted as attracted", coach: "Aluminum is a metal, but it isn't magnetic. Try it at home: a magnet won't pick up foil." },
            { match: "Bottle cap sorted as not attracted", coach: "Most bottle caps are made of steel, and steel has iron in it. Try it: a magnet picks one right up." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which object will a magnet pick up?",
          choices: ["An aluminum can", "An iron nail", "A copper wire"],
          answer: 1,
          why: "Iron is magnetic. Aluminum and copper are metals, but they are not magnetic.",
          hints: [
            "Aluminum is a metal, but magnets don't pull on it.",
            "",
            "Copper is a metal, but magnets don't pull on it either.",
          ],
        },
        approaches: {
          analogy:
            "A magnet is a picky eater. It only wants iron and steel and a couple of other metals. Everything else on the plate, even other shiny metals, it leaves alone.",
          example:
            "Lay out a paper clip, a penny, a nail, foil and a pencil. Wave a magnet over them. The paper clip and nail jump up. The penny, foil and pencil stay put.",
          simpler: {
            q: "Does a magnet pull on a wooden block?",
            choices: ["Yes", "No"],
            answer: 1,
            why: "Wood is not magnetic, so the magnet does not pull on it.",
            hints: ["Wood has no iron in it. Magnets pull on iron and steel.", ""],
          },
        },
      },
      {
        title: "Poles, Attract and Repel",
        teach:
          "Every magnet has two ends called poles, a north pole and a south pole. When you bring two magnets together, something interesting happens. Opposite poles attract: a north pole and a south pole snap together. Like poles repel: two north poles push each other away, and so do two south poles. You can feel the push with your hands, even though the magnets never touch. Magnetic force works through paper, cloth and even water. But it gets weaker with distance. Hold a magnet close to a paper clip and it jumps. Hold it far away and nothing happens.",
        visual: {
          type: "hotspots",
          title: "Two magnets",
          center: "Poles",
          spots: [
            { label: "North + South", icon: "🧲", detail: "Opposite poles attract. They pull together." },
            { label: "North + North", icon: "↔️", detail: "Like poles repel. They push apart." },
            { label: "South + South", icon: "⬅️", detail: "Like poles repel too." },
            { label: "Distance", icon: "📏", detail: "The farther apart, the weaker the pull or push." },
            { label: "Through things", icon: "📄", detail: "Magnetic force can work through paper, cloth and water." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A north pole and a south pole will {0}. Two north poles will {1}. When a magnet moves farther away, its pull gets {2}.",
          blanks: [{ answers: ["attract"] }, { answers: ["repel"] }, { answers: ["weaker"] }],
          bank: ["attract", "repel", "weaker", "stronger", "melt"],
          hint: "Opposites attract, like poles repel, and distance makes the force weaker.",
          mistakes: [{ match: "stronger", coach: "Try it: a magnet far from a paper clip can't pick it up. Farther means weaker." }],
          seconds: 35,
        },
        think: {
          q: "You push the north pole of one magnet toward the north pole of another. What happens?",
          choices: ["They snap together", "They push apart", "They both lose their magnetism"],
          answer: 1,
          why: "Like poles repel, so two north poles push apart.",
          hints: ["Snapping together happens with opposite poles, north and south.", "", "Magnets don't lose their power just by meeting. Like poles push apart."],
        },
        approaches: {
          analogy:
            "Think of magnet poles like puzzle pieces. A north and a south fit together and click. Two norths are like two pieces with the same bump; they won't fit, so they push apart.",
          example:
            "Lay a bar magnet on a table. Slowly bring the north end of a second magnet toward its north end. You feel it push back, and the first magnet may even slide away without being touched.",
          simpler: {
            q: "Do opposite poles attract or repel?",
            choices: ["Attract", "Repel"],
            answer: 0,
            why: "North and south attract.",
            hints: ["", "Repel is for like poles, such as north and north."],
          },
        },
      },
      {
        title: "Static Electricity",
        teach:
          "Magnets are not the only force that works without touching. Rub a balloon on your hair for a few seconds. Now hold it a little above your head. Your hair rises toward it! Rubbing moves tiny bits of electric charge from your hair onto the balloon. Things with opposite charges attract, and things with the same charge repel, a lot like magnets. A charged balloon can pick up bits of paper, bend a thin stream of water from a faucet, or stick to a wall. This is called static electricity. You feel it as a small shock when you touch a doorknob after sliding your socks on a carpet.",
        visual: {
          type: "compare",
          left: { title: "Magnets", points: ["Pull on iron and steel", "Have north and south poles", "Opposites attract, likes repel", "Work without touching"] },
          right: { title: "Static electricity", points: ["Made by rubbing things together", "Moves tiny bits of electric charge", "Opposite charges attract, same charges repel", "Works without touching"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the balloon experiment in order.",
          steps: [
            "Blow up a balloon and tie it",
            "Rub the balloon on your hair or a wool sweater",
            "Hold the balloon just above some tiny bits of paper",
            "Watch the paper jump up to the balloon",
          ],
          hint: "You need a balloon first, then you charge it by rubbing, then you test it.",
          seconds: 30,
        },
        think: {
          q: "Why does a rubbed balloon pick up bits of paper?",
          choices: ["The balloon is a magnet", "Rubbing gave the balloon an electric charge", "The paper is sticky"],
          answer: 1,
          why: "Rubbing moved electric charge onto the balloon, and the charge pulls on the paper.",
          hints: ["A balloon isn't a magnet. Magnets don't pick up paper.", "", "Plain paper isn't sticky. Something pulled it without touching."],
        },
        approaches: {
          analogy:
            "Rubbing a balloon is like scooping up a pocketful of tiny invisible stickers. The balloon now carries extra charge, and that charge tugs on things nearby.",
          example:
            "Rub a balloon on a wool sweater ten times. Hold it near a thin stream of water from the faucet. The stream bends toward the balloon, even though nothing touches it.",
          simpler: {
            q: "Does static electricity need to touch something to pull on it?",
            choices: ["No, it can pull from a little way off", "Yes, it must touch"],
            answer: 0,
            why: "Your hair rises toward the balloon before it touches.",
            hints: ["", "Remember the hair rising toward the balloon. They weren't touching yet."],
          },
        },
      },
      {
        title: "Solving Problems with Magnets",
        teach:
          "Because magnets push and pull without touching, people use them to solve everyday problems. A cabinet door has a small magnet that keeps it shut. Fridge magnets hold up drawings. A compass needle is a magnet, so it turns to point north. At recycling centers, big magnets lift steel cans from a pile and leave aluminum cans behind, sorting them fast. Engineers start by defining the problem. What must the solution do? What are the limits, like materials, time or cost? Then they come up with ideas and test them. What problem in your home could a magnet solve?",
        visual: {
          type: "hotspots",
          title: "Magnets at work",
          center: "Magnet solutions",
          spots: [
            { label: "Cabinet latch", icon: "🚪", detail: "A small magnet keeps a door from swinging open." },
            { label: "Refrigerator", icon: "🧊", detail: "Magnets hold notes and drawings on the steel door." },
            { label: "Compass", icon: "🧭", detail: "The needle is a magnet and turns to point north." },
            { label: "Recycling", icon: "♻️", detail: "Big magnets pull steel cans out and leave aluminum cans behind." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the problem statement an engineer would write for a magnet latch.",
          tiles: ["The cabinet door", "must stay closed", "until someone pulls it,", "using only a small magnet", "and a steel plate."],
          distractors: ["and it must be purple"],
          hint: "A problem statement says what must happen and what materials you can use.",
          seconds: 40,
        },
        think: {
          q: "A recycling center has a pile of steel cans and aluminum cans mixed together. How can a magnet help?",
          choices: ["It pulls out the aluminum cans", "It pulls out the steel cans", "It melts all the cans"],
          answer: 1,
          why: "Steel is magnetic and aluminum is not, so the magnet lifts out only the steel cans.",
          hints: ["Aluminum isn't magnetic, so the magnet can't pull it.", "", "Magnets pull, they don't melt things."],
        },
        approaches: {
          analogy:
            "Defining a problem is like writing a shopping list before you go to the store. You decide exactly what you need and how much you can spend before you start.",
          example:
            "Problem: my pencil keeps rolling off my desk. Must do: hold the pencil still. Limits: one small magnet and things I already have. Idea: tape a steel washer to the pencil and stick a magnet on the metal desk leg.",
          simpler: {
            q: "Which thing in a kitchen often uses a magnet?",
            choices: ["A cabinet door latch", "A wooden spoon"],
            answer: 0,
            why: "Many cabinet doors use a small magnet to stay shut.",
            hints: ["", "A wooden spoon isn't magnetic and doesn't use magnets."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which force is at work? Sort each example.",
      buckets: ["Magnetism", "Static electricity"],
      items: [
        { text: "A compass needle turns to point north", bucket: 0 },
        { text: "A note stays stuck on the refrigerator", bucket: 0 },
        { text: "Steel cans are lifted from a recycling pile", bucket: 0 },
        { text: "Your hair stands up after you take off a wool hat", bucket: 1 },
        { text: "A rubbed balloon sticks to the wall", bucket: 1 },
        { text: "You feel a small zap when you touch a doorknob", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain how magnets and static electricity are alike, and how they are different.",
      keyPoints: [
        "Both push or pull without touching",
        "Magnets attract iron and steel",
        "Opposite poles attract and like poles repel",
        "Static electricity comes from rubbing things together",
        "The force gets weaker with distance",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Sort each pair of magnet ends.",
        buckets: ["Attract", "Repel"],
        items: [
          { text: "North and south", bucket: 0 },
          { text: "South and north", bucket: 0 },
          { text: "North and north", bucket: 1 },
          { text: "South and south", bucket: 1 },
        ],
        hint: "Opposites attract. Like poles repel.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "A magnet attracts things made of {0} and steel. Rubbing a balloon on your hair makes {1} electricity.",
        blanks: [{ answers: ["iron"] }, { answers: ["static"] }],
        bank: ["iron", "static", "wood", "plastic", "sunny"],
        hint: "Magnets pull on one kind of metal found in steel. The balloon force is called static electricity.",
        mistakes: [{ match: "wood", coach: "Wood isn't magnetic. Steel has iron in it, and that's what magnets pull." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Sam tests how many paper clips a magnet can hold in a chain. Try 1: 6 clips. Try 2: 8 clips. Try 3: 7 clips. How many clips did he count in all three tries together?",
        answer: 21,
        unit: "clips",
        hint: "Add the three tries: 6 + 8 + 7.",
        mistakes: [{ match: "8", coach: "8 is the best single try. Add all three tries together." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each problem to a magnet solution.",
        pairs: [
          { left: "A cabinet door keeps swinging open", right: "A small magnet latch" },
          { left: "Mixed steel and aluminum cans", right: "A big magnet that lifts the steel cans" },
          { left: "You need to find north on a hike", right: "A compass with a magnet needle" },
          { left: "A drawing needs to hang on the fridge", right: "A fridge magnet" },
        ],
        hint: "Think about what each magnet does: holds, sorts, points or sticks.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "Which object would a magnet attract?",
        choices: ["A plastic cup", "A steel paper clip", "An aluminum can"],
        answer: 1,
        why: "Steel contains iron, which is magnetic. Plastic and aluminum are not.",
      },
      {
        q: "Two south poles are brought together. They will...",
        choices: ["repel", "attract", "turn into north poles"],
        answer: 0,
        why: "Like poles repel.",
      },
      {
        q: "What happens to a magnet's pull as it moves farther from a paper clip?",
        choices: ["It gets stronger", "It stays exactly the same", "It gets weaker"],
        answer: 2,
        why: "Magnetic force gets weaker with distance.",
      },
      {
        q: "What makes a balloon stick to a wall after you rub it on your hair?",
        choices: ["Glue on the balloon", "Static electricity", "Gravity"],
        answer: 1,
        why: "Rubbing gives the balloon an electric charge that pulls toward the wall.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Magnet hunt and design! First, test 10 objects around your home with a magnet and record which ones it attracts. Then pick one small problem a magnet could solve (keys that get lost, a door that won't stay shut, a pencil that rolls away). Write the problem: what must the solution do, and what materials can you use? Build or sketch your magnet solution and show a parent.",
      rubric: [
        "Tested at least 10 objects and recorded attract or not",
        "Noticed that some metals are not magnetic",
        "Wrote a clear problem with what it must do and its limits",
        "Built or sketched a magnet solution and explained it",
      ],
    },
  },

  // 3. Life cycles
  {
    id: "sci-3.lifecycles",
    title: "The Circle of Life Cycles",
    minutes: 30,
    stage: "grammar",
    standards: ["3-LS1-1"],
    read: [
      "Every living thing has a life cycle. A life cycle is the set of stages a living thing goes through from the start of its life to the end. Life cycles look very different, but they all share four parts: birth, growth, reproduction and death. Reproduction means making new living things of the same kind, like a hen laying eggs or an apple tree making seeds. Because parents make young, the cycle starts over again and again.",
      "A bean plant starts as a seed. When the seed gets water and warmth, it sprouts, sending a root down and a shoot up. The seedling grows into an adult plant. The adult plant makes flowers, and the flowers make pods with new seeds inside. When those seeds are planted, the cycle begins again.",
      "Some animals look very much like their parents from the start. A puppy, a calf and a baby robin are smaller versions of the adults, and they grow bigger. Other animals change shape completely. This is called metamorphosis. A frog starts as an egg in a pond. It hatches into a tadpole that swims and breathes with gills, like a fish. Slowly it grows legs, loses its tail and becomes a frog that can live on land.",
      "A butterfly changes even more. A monarch butterfly starts as a tiny egg on a milkweed leaf. A caterpillar, also called a larva, hatches and eats and eats. Then it forms a chrysalis, called the pupa stage. Inside, its body is rebuilt. At last an adult butterfly comes out, flies, and lays eggs of its own.",
      "Different life cycles take different amounts of time. A monarch can go from egg to adult in about a month. A bean plant can grow from seed to new seeds in a few months. An oak tree may live for hundreds of years.",
    ].join("\n\n"),
    keyIdeas: [
      "Every life cycle includes birth, growth, reproduction and death.",
      "Some young look like their parents; others, like frogs and butterflies, change shape through metamorphosis.",
      "Reproduction starts the cycle over again.",
    ],
    hook: {
      text: "Pip found a green caterpillar munching a leaf on the Sky Islands. A few weeks later it was gone. In its place hung a little green case, like a jewel. What is inside? And where did the caterpillar go?",
    },
    teach: [
      {
        title: "Every Life Cycle Has Four Parts",
        teach:
          "A life cycle is the set of stages a living thing goes through during its life. Plants, birds, fish and people all have one. Life cycles look different, but they all include four parts. Birth is how life starts, by hatching, sprouting or being born. Growth is getting bigger and changing. Reproduction means making new living things of the same kind, like laying eggs or making seeds. Death is the end of one life. Because parents make young before they die, the cycle goes around and around like a circle. What life cycle have you watched happen?",
        visual: {
          type: "hotspots",
          title: "Every life cycle",
          center: "Life cycle",
          spots: [
            { label: "Birth", icon: "🐣", detail: "Life begins: a seed sprouts, an egg hatches or a baby is born." },
            { label: "Growth", icon: "🌱", detail: "The living thing gets bigger and changes." },
            { label: "Reproduction", icon: "🥚", detail: "Adults make new living things of the same kind." },
            { label: "Death", icon: "🍂", detail: "One life ends, but the young carry the cycle on." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the four parts of every life cycle in order.",
          steps: ["Birth", "Growth", "Reproduction", "Death"],
          hint: "Life starts, the living thing gets bigger, it makes young, and then its life ends.",
          seconds: 20,
        },
        think: {
          q: "What does reproduction mean?",
          choices: ["Growing taller", "Making new living things of the same kind", "Eating food"],
          answer: 1,
          why: "Reproduction means making young, like laying eggs or making seeds.",
          hints: ["Growing taller is growth, a different stage.", "", "Eating helps living things grow, but it isn't reproduction."],
        },
        approaches: {
          analogy:
            "A life cycle is like a relay race. Each runner carries the baton for a while, then hands it to the next runner. Parents hand life on to their young.",
          example:
            "A chicken hatches from an egg (birth). It grows into a hen (growth). The hen lays eggs (reproduction). One day the hen dies (death), but her chicks keep the cycle going.",
          simpler: {
            q: "Which stage comes first in a life cycle?",
            choices: ["Birth", "Death"],
            answer: 0,
            why: "Every life begins with birth: hatching, sprouting or being born.",
            hints: ["", "Death is the last stage, not the first."],
          },
        },
      },
      {
        title: "A Plant's Life Cycle",
        teach:
          "Let's follow a bean plant. It starts as a seed. Inside the seed is a tiny baby plant and a store of food. When the seed gets water and warmth, it sprouts. A root pushes down into the soil and a shoot pushes up toward the light. The young plant, called a seedling, grows leaves and gets bigger. The adult plant grows flowers. Bees and other insects carry pollen from flower to flower, and the flowers turn into pods with new seeds inside. Plant those seeds, and the life cycle starts again. What do you notice? The new seeds came from the old plant.",
        visual: {
          type: "flip",
          cards: [
            { front: "Seed", back: "Holds a tiny baby plant and food to get it started." },
            { front: "Sprout", back: "A root grows down and a shoot grows up." },
            { front: "Seedling", back: "A young plant with its first leaves." },
            { front: "Flower", back: "The part of the adult plant that makes seeds." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the bean plant's life cycle in order.",
          steps: ["A seed is planted in the soil", "The seed sprouts a root and a shoot", "A seedling grows its first leaves", "The adult plant grows flowers", "The flowers make pods with new seeds"],
          hint: "Start with a seed and end with new seeds.",
          seconds: 35,
        },
        think: {
          q: "Where do a bean plant's new seeds come from?",
          choices: ["From its roots", "From its flowers", "From the rain"],
          answer: 1,
          why: "Flowers turn into pods that hold the new seeds.",
          hints: ["Roots take in water. They don't make seeds.", "", "Rain helps the seed sprout, but it doesn't make seeds."],
        },
        approaches: {
          analogy:
            "A seed is like a lunchbox with a tiny plant inside. It carries its own snack until its first leaves can make food from sunlight.",
          example:
            "Put a dry bean in a wet paper towel in a clear bag. In a few days a root pokes out. Soon a shoot grows. Plant it, and in a couple of months it may grow flowers and bean pods.",
          simpler: {
            q: "What grows first when a seed sprouts?",
            choices: ["A root", "A flower"],
            answer: 0,
            why: "The root comes out first to take in water.",
            hints: ["", "Flowers come much later, on the adult plant."],
          },
        },
      },
      {
        title: "Metamorphosis: Frogs and Butterflies",
        teach:
          "Some baby animals look like small copies of their parents. A puppy looks like a little dog. But some animals change shape completely as they grow. This is called metamorphosis. A frog starts as an egg in a pond. It hatches into a tadpole that has a tail and breathes with gills, like a fish. Slowly it grows back legs, then front legs. Its tail shrinks, it grows lungs, and it hops onto land as a frog. A monarch butterfly changes even more: egg, then caterpillar, also called a larva, then a chrysalis, called a pupa, and finally a winged adult. That jewel-like case Pip found? A chrysalis!",
        visual: {
          type: "compare",
          left: { title: "Frog", points: ["Egg in the water", "Tadpole with a tail and gills", "Froglet with legs and a short tail", "Adult frog with lungs"] },
          right: { title: "Monarch butterfly", points: ["Egg on a milkweed leaf", "Caterpillar (larva) that eats and grows", "Chrysalis (pupa)", "Adult butterfly with wings"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the monarch butterfly's life cycle in order.",
          steps: ["Egg", "Caterpillar (larva)", "Chrysalis (pupa)", "Adult butterfly"],
          hint: "The caterpillar hatches from the egg and makes the chrysalis before it has wings.",
          mistakes: [{ match: "Chrysalis before caterpillar", coach: "The caterpillar has to eat and grow first. Then it makes the chrysalis around itself." }],
          seconds: 25,
        },
        think: {
          q: "Which animal goes through metamorphosis?",
          choices: ["A puppy", "A frog", "A calf"],
          answer: 1,
          why: "A frog changes from a swimming tadpole to a land-hopping frog.",
          hints: ["A puppy looks like a small dog from the start and just gets bigger.", "", "A calf looks like a small cow from the start."],
        },
        approaches: {
          analogy:
            "Metamorphosis is like a caterpillar going into a workshop and coming out rebuilt as a flying machine. Same animal, totally new body.",
          example:
            "A teacher puts frog eggs in a tank. In about a week, tadpoles hatch. Over a couple of months the class watches back legs, then front legs grow, and the tail shrinks until little frogs climb out.",
          simpler: {
            q: "What does a caterpillar turn into?",
            choices: ["A butterfly", "A frog"],
            answer: 0,
            why: "A caterpillar becomes a butterfly or a moth.",
            hints: ["", "Frogs come from tadpoles, not caterpillars."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the frog's life cycle in order.",
      steps: ["Eggs float in a pond", "A tadpole hatches and swims with gills", "The tadpole grows back legs, then front legs", "The tail shrinks and lungs grow", "An adult frog hops onto land and lays eggs"],
    },
    explain: {
      prompt: "Pick a plant or animal and explain its life cycle. Then tell what every life cycle has in common.",
      keyPoints: [
        "Every life cycle has birth, growth, reproduction and death",
        "Reproduction makes new young and starts the cycle again",
        "Some animals change shape through metamorphosis",
        "A plant grows from a seed and makes new seeds",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each young living thing to its adult.",
        pairs: [
          { left: "Tadpole", right: "Frog" },
          { left: "Caterpillar", right: "Butterfly" },
          { left: "Seedling", right: "Bean plant" },
          { left: "Chick", right: "Hen" },
          { left: "Puppy", right: "Dog" },
        ],
        hint: "Think about what each young one grows up to be.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Does the young animal look like its parent, or change shape (metamorphosis)?",
        buckets: ["Looks like its parent", "Changes shape"],
        items: [
          { text: "Kitten", bucket: 0 },
          { text: "Calf", bucket: 0 },
          { text: "Baby robin", bucket: 0 },
          { text: "Tadpole", bucket: 1 },
          { text: "Caterpillar", bucket: 1 },
        ],
        hint: "Would you recognize the baby as the same kind of animal as the adult?",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Every life cycle includes birth, {0}, reproduction and death. A monarch's pupa stage is spent inside a {1}.",
        blanks: [{ answers: ["growth"] }, { answers: ["chrysalis"] }],
        bank: ["growth", "chrysalis", "pond", "sleep", "nest"],
        hint: "Living things get bigger between birth and reproduction. The butterfly's case is a chrysalis.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A monarch egg hatches in about 4 days. The caterpillar eats for about 14 days. It stays in its chrysalis for about 10 days. About how many days is that from egg to adult butterfly?",
        answer: 28,
        unit: "days",
        hint: "Add the three stages: 4 + 14 + 10.",
        mistakes: [{ match: "24", coach: "Check your adding: 4 + 14 is 18, and 18 + 10 is 28." }],
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which four parts do all life cycles share?",
        choices: ["Birth, growth, reproduction and death", "Egg, tadpole, frog and pond", "Seed, rain, sun and soil"],
        answer: 0,
        why: "Every life cycle includes birth, growth, reproduction and death.",
      },
      {
        q: "What is metamorphosis?",
        choices: ["Growing bigger without changing shape", "Moving to a new home", "A big change in body shape as an animal grows"],
        answer: 2,
        why: "Metamorphosis is a complete change in body shape, like a tadpole becoming a frog.",
      },
      {
        q: "In a butterfly's life cycle, what comes right after the caterpillar?",
        choices: ["The egg", "The chrysalis (pupa)", "The adult"],
        answer: 1,
        why: "The caterpillar forms a chrysalis, and the adult comes out of it.",
      },
      {
        q: "Why does a life cycle keep going after an adult dies?",
        choices: ["The adult made young before it died", "The adult comes back to life", "The weather starts it again"],
        answer: 0,
        why: "Reproduction means the young carry on the cycle.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Grow a bean! Put a dry bean seed in a wet paper towel inside a clear zip bag and tape it to a sunny window. Keep the towel damp. Check it every day for two weeks and draw what you see: root, shoot, first leaves. When it has leaves, plant it in a cup of soil. Make a life cycle wheel that shows the stages you saw and the ones still to come.",
      rubric: [
        "Kept a daily drawing or note for at least ten days",
        "Labeled the root, shoot and first leaves",
        "Made a life cycle wheel with birth, growth, reproduction and death",
        "Explained which stages are still to come",
      ],
    },
  },

  // 4. Inherited traits and the environment
  {
    id: "sci-3.traits",
    title: "Traits: From Parents and from the World Around",
    minutes: 30,
    stage: "logic",
    standards: ["3-LS3-1", "3-LS3-2"],
    read: [
      "A trait is a feature of a living thing, like its fur color, the shape of its leaves, or how tall it can grow. Many traits are inherited, which means they are passed down from parents to their young. That is why kittens look like cats and not like ducks, and why an apple seed grows an apple tree and not a pine tree.",
      "Young living things look a lot like their parents, but not exactly the same. Look at a litter of puppies. One may have floppy ears and one may have pointed ears. One may be black and one may be brown with white spots. Differences among members of the same kind of living thing are called variation. Even brothers and sisters show variation.",
      "Some traits are shaped by the environment, which means everything around a living thing: its food, water, sunlight, soil and weather. A bean plant kept in a dark closet grows tall, thin and pale, while its twin by a sunny window grows green and strong. A dog that eats too much and never runs will get heavy. Flamingos are pink because of the shrimp and algae they eat. Flamingos raised on food without those colors turn pale. Some hydrangea bushes grow blue flowers in one kind of soil and pink flowers in another.",
      "Some things are learned, not inherited at all. Nobody is born knowing how to ride a bike or read a book. A dog learns to sit when someone trains it. Scientists ask: is this trait passed down from parents, shaped by the environment, or both? Often it is both. A sunflower inherits the ability to grow tall, but it only grows tall with good soil, water and sunshine.",
    ].join("\n\n"),
    keyIdeas: [
      "Many traits, like fur color or leaf shape, are inherited from parents.",
      "Young look like their parents but not exactly; this is called variation.",
      "The environment, like food, sunlight and soil, can change traits too, and skills are learned.",
    ],
    hook: {
      text: "Pip met a family of puppies on the Sky Islands. Their mother is brown. Two puppies are brown, one is black, and one has white spots. They are all from the same family. So why don't they all look the same?",
    },
    teach: [
      {
        title: "Inherited Traits",
        teach:
          "A trait is a feature of a living thing. Fur color, eye color, the number of legs and the shape of a leaf are all traits. Many traits are inherited, which means they are passed down from parents to their young. Ducks have duck parents, so ducklings have webbed feet and bills. An oak tree's acorn grows into an oak, never a maple. Inherited traits are why each kind of living thing makes more of the same kind. Look at a family photo or a litter of kittens. What traits do you notice the young share with their parents?",
        visual: {
          type: "flip",
          cards: [
            { front: "Trait", back: "A feature of a living thing, like fur color or leaf shape." },
            { front: "Inherited", back: "Passed down from parents to their young." },
            { front: "Offspring", back: "The young of a plant or animal." },
            { front: "Example", back: "A duckling inherits webbed feet and a bill from its duck parents." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each parent to the young that inherits its traits.",
          pairs: [
            { left: "A zebra with stripes", right: "A striped foal" },
            { left: "A duck with webbed feet", right: "A duckling with webbed feet" },
            { left: "An oak tree", right: "An acorn that grows an oak" },
            { left: "A cactus with spines", right: "A small spiny cactus" },
          ],
          hint: "Each young living thing grows up to be the same kind as its parent.",
          seconds: 30,
        },
        think: {
          q: "Why does a zebra foal have stripes?",
          choices: ["It painted them on", "It inherited stripes from its parents", "It learned to have stripes"],
          answer: 1,
          why: "Stripes are an inherited trait passed down from zebra parents.",
          hints: ["Animals can't paint themselves! Stripes come from the parents.", "", "Stripes aren't a skill you can learn. They are passed down."],
        },
        approaches: {
          analogy:
            "Inherited traits are like a family recipe handed down. Each new cook gets the same instructions, so the cake comes out much the same way every time.",
          example:
            "Plant seeds from a red tomato and seeds from a yellow tomato. The red tomato's seeds usually grow red tomatoes, and the yellow one's grow yellow tomatoes. The color was inherited.",
          simpler: {
            q: "What does a sunflower seed grow into?",
            choices: ["A sunflower", "A rose bush"],
            answer: 0,
            why: "Each seed grows into the same kind of plant as its parent.",
            hints: ["", "Seeds grow into the same kind of plant they came from."],
          },
        },
      },
      {
        title: "Variation: Alike but Not the Same",
        teach:
          "Young living things look like their parents, but not exactly. In a litter of puppies, one might have floppy ears, one pointed ears. One might be black and another brown with white spots. Differences among members of the same kind of living thing are called variation. Plants show variation too. Pea pods from the same plant may hold four, five or six peas. Scientists measure variation with data. They might count spots, measure ear length or weigh seeds, then put the numbers in a table or graph. Variation is everywhere. Look at the leaves on one tree. Are any two exactly the same?",
        visual: {
          type: "hotspots",
          title: "One litter of puppies",
          center: "Variation",
          spots: [
            { label: "Fur color", icon: "🐕", detail: "Brown, black, or spotted, all in one litter." },
            { label: "Ear shape", icon: "👂", detail: "Some floppy, some pointed." },
            { label: "Size", icon: "📏", detail: "Some puppies are bigger at birth than others." },
            { label: "Still dogs", icon: "🐾", detail: "With all their differences, every puppy is still a dog." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Lena opened pea pods from one plant and counted the peas: 5, 6, 4, 6, 5, 6. How many pods had 6 peas?",
          answer: 3,
          unit: "pods",
          hint: "Look through the list and count each 6.",
          mistakes: [{ match: "6", coach: "6 is the number of peas in those pods. Count how many pods had 6." }],
          seconds: 25,
        },
        think: {
          q: "Two kittens from the same mother have different fur colors. This is an example of...",
          choices: ["metamorphosis", "variation", "a force"],
          answer: 1,
          why: "Differences among the same kind of animal are called variation.",
          hints: ["Metamorphosis is a big change in body shape, like a tadpole to a frog.", "", "A force is a push or a pull."],
        },
        approaches: {
          analogy:
            "Variation is like a box of crayons that are all reds. They are all red crayons, but one is cherry, one is brick and one is pink-red. Same kind, small differences.",
          example:
            "Measure ten leaves from the same maple tree with a ruler. You might get 8, 9, 10 and 11 centimeters. Same tree, same kind of leaf, but different sizes.",
          simpler: {
            q: "Are two puppies from the same litter always exactly alike?",
            choices: ["No, they can look different", "Yes, always identical"],
            answer: 0,
            why: "Puppies in a litter often differ in color, size and ears.",
            hints: ["", "Picture a litter: often one is spotted and one is plain."],
          },
        },
      },
      {
        title: "The Environment Shapes Traits",
        teach:
          "Not every trait comes only from parents. The environment, meaning food, water, sunlight, soil and weather, can change traits too. Grow two bean plants from the same seed pack. Put one in a sunny window and one in a dark closet. The sunny one grows green and strong. The closet one grows tall, thin and pale. Flamingos are pink because of the shrimp and algae they eat. Without that food, they turn pale. Some hydrangea bushes make blue flowers in one soil and pink flowers in another. And some things are learned, not inherited at all, like reading or riding a bike. What helped you learn your best skill?",
        visual: {
          type: "compare",
          left: { title: "Inherited from parents", points: ["Number of legs", "Shape of a leaf", "Zebra stripes", "Webbed feet on a duck"] },
          right: { title: "Shaped by the environment or learned", points: ["Pale stems from growing in the dark", "Flamingo color from food", "Weight from food and exercise", "Riding a bike or a dog learning to sit"] },
        },
        probe: {
          type: "sort",
          prompt: "Is the trait inherited, or shaped by the environment or learning?",
          buckets: ["Inherited", "Environment or learned"],
          items: [
            { text: "A cat has whiskers", bucket: 0 },
            { text: "A tulip's leaf shape", bucket: 0 },
            { text: "A puppy's floppy ears", bucket: 0 },
            { text: "A plant grows pale because it was kept in the dark", bucket: 1 },
            { text: "A flamingo is pink from the food it eats", bucket: 1 },
            { text: "A dog knows how to fetch a ball", bucket: 1 },
            { text: "A child can read a chapter book", bucket: 1 },
          ],
          hint: "Ask: was it passed down from parents, or did food, light or practice cause it?",
          mistakes: [{ match: "Reading sorted as inherited", coach: "Nobody is born reading. Reading is learned with practice." }],
          seconds: 45,
        },
        think: {
          q: "Two bean plants grew from the same seed pack. One is green and strong, one is pale and thin. What most likely caused the difference?",
          choices: ["They had different parents", "One got sunlight and one did not", "One is a different kind of plant"],
          answer: 1,
          why: "Same seed pack, different environment. Light makes a big difference.",
          hints: ["They came from the same seed pack, so their parents are alike.", "", "Both came from the same seed pack, so they are the same kind of plant."],
        },
        approaches: {
          analogy:
            "Inherited traits are the blueprint for a house. The environment is the weather and care the house gets. A good blueprint still needs good care to turn out well.",
          example:
            "Twin bean seeds: one gets water and sun, the other water and a dark closet. After two weeks, the sunny plant is green with big leaves. The closet plant is yellowish and spindly. Same seeds, different environment.",
          simpler: {
            q: "Is riding a bike something you are born knowing?",
            choices: ["No, it is learned", "Yes, it is inherited"],
            answer: 0,
            why: "Riding a bike takes practice. It is learned.",
            hints: ["", "Babies can't ride bikes. Everyone has to learn it."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the sentences that describe a trait shaped by the environment.",
      sentences: [
        "A rabbit has long ears like its mother.",
        "A houseplant leans toward the window because the light comes from that side.",
        "A pine tree on a windy mountaintop grows short and bent.",
        "A tiger cub has stripes like its parents.",
        "A tomato plant given no water grows small, wilted fruit.",
      ],
      correct: [1, 2, 4],
    },
    explain: {
      prompt: "Explain the difference between an inherited trait and a trait shaped by the environment. Give an example of each.",
      keyPoints: [
        "A trait is a feature of a living thing",
        "Inherited traits are passed from parents to young",
        "Young look like their parents but vary",
        "The environment, like food, light and soil, can change traits",
        "Some things are learned, not inherited",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Traits passed from parents to young are {0}. Differences among the same kind of animal are called {1}. A plant kept in the dark grows pale because of its {2}.",
        blanks: [{ answers: ["inherited"] }, { answers: ["variation"] }, { answers: ["environment"] }],
        bank: ["inherited", "variation", "environment", "magnet", "gravity"],
        hint: "Passed down = inherited. Differences = variation. Surroundings = environment.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Sort each trait of a dog.",
        buckets: ["Inherited", "Environment or learned"],
        items: [
          { text: "Fur color", bucket: 0 },
          { text: "Ear shape", bucket: 0 },
          { text: "Knowing how to shake hands", bucket: 1 },
          { text: "Being overweight from too many treats", bucket: 1 },
          { text: "Having four legs", bucket: 0 },
        ],
        hint: "Was it passed down, or did food or training cause it?",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "In a litter of 6 puppies, 2 are black, 1 is spotted, and the rest are brown. How many puppies are brown?",
        answer: 3,
        unit: "puppies",
        hint: "Start with 6 and take away the black and spotted puppies.",
        mistakes: [{ match: "9", coach: "There are only 6 puppies. Take away the 2 black ones and the 1 spotted one." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which trait is inherited?",
        choices: ["A dog knows how to sit", "A flamingo's pink color from shrimp", "A zebra's stripes"],
        answer: 2,
        why: "Stripes are passed down from zebra parents.",
      },
      {
        q: "What is variation?",
        choices: ["Differences among living things of the same kind", "A plant's way of making seeds", "A kind of weather"],
        answer: 0,
        why: "Variation means members of the same kind are not exactly alike.",
      },
      {
        q: "A hydrangea grows blue flowers in one garden and pink in another. What made the difference?",
        choices: ["The soil it grew in", "Its parents", "It learned new colors"],
        answer: 0,
        why: "Some hydrangeas change flower color depending on the soil.",
      },
      {
        q: "Which is a learned behavior, not an inherited trait?",
        choices: ["A bird's beak shape", "A child riding a bike", "A cat's whiskers"],
        answer: 1,
        why: "Riding a bike is learned through practice.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Sun or shade test. Plant two seeds of the same kind (beans or peas) in two cups with the same soil and the same water. Put one in a sunny window and one in a dark closet. After 10 to 14 days, measure each plant's height, count the leaves and describe the color. Make a table and explain which traits were inherited and which ones the environment changed.",
      rubric: [
        "Kept everything the same except the light",
        "Measured height and counted leaves for both plants",
        "Recorded results in a table",
        "Explained which differences came from the environment",
      ],
    },
  },

  // 5. Living in groups and variations that help survival
  {
    id: "sci-3.survival",
    title: "Teamwork and Traits That Help Animals Survive",
    minutes: 30,
    stage: "logic",
    standards: ["3-LS2-1", "3-LS4-2"],
    read: [
      "Many animals live alone, but some live in groups, and the group helps them survive. Wolves live in packs and hunt together, so they can catch large animals like elk that one wolf could not catch alone. Honeybees live in a hive where each bee has a job: worker bees gather nectar, care for the young and guard the door, while the queen lays the eggs. Small fish swim in schools, and a big swirling school makes it hard for a hungry predator to pick out just one fish.",
      "Groups help in other ways too. Emperor penguins huddle together through the freezing Antarctic winter, taking turns on the cold outside edge. Meerkats take turns standing guard and give a warning call when a hawk flies over. Musk oxen form a circle around their calves when wolves come near, with their horns facing out. Working together helps them find food, stay safe, stay warm and raise their young.",
      "Survival can also depend on small differences between animals of the same kind. In the deserts of Arizona and New Mexico live little rock pocket mice. Most are sandy colored and blend in on light sand. But where old dark lava rock covers the ground, most of the mice are dark. On dark rock, a dark mouse is harder for an owl to see, so it is more likely to survive and have babies. Its babies often inherit the dark fur.",
      "Plants show this too. A cactus with longer roots can reach more water in a dry spell. A plant with brighter flowers may draw more bees to carry its pollen. A small difference can give one living thing an advantage: a better chance to survive, find food and have young.",
    ].join("\n\n"),
    keyIdeas: [
      "Some animals live in groups that help them hunt, stay safe, stay warm and raise young.",
      "Members of the same kind vary, and some differences help an animal survive better.",
      "Animals with helpful traits are more likely to have young, and the young often inherit those traits.",
    ],
    hook: {
      text: "From high on a Sky Island bridge, Pip watches a shimmering cloud of tiny fish in the lake below. A big fish swims in, but the cloud swirls and splits, and the big fish gets nothing. How did all those little fish work together?",
    },
    teach: [
      {
        title: "Animals in Groups",
        teach:
          "Some animals live alone, like most bears. Others live in groups, and the group helps every member survive. Wolves live in packs and hunt together, so they can catch large animals, like elk, that one wolf could never catch alone. Small fish swim in schools. When a predator charges, the school swirls and flashes, and it is hard to pick out a single fish. Honeybees live in a hive where each bee has a job. Workers gather nectar, feed the young and guard the door. The queen lays the eggs. A group can find food, stay safe and raise young better than one animal alone.",
        visual: {
          type: "hotspots",
          title: "Animals in groups",
          center: "Teamwork",
          spots: [
            { label: "Wolf pack", icon: "🐺", detail: "Hunts together to catch big animals like elk." },
            { label: "School of fish", icon: "🐟", detail: "Swirls together so a predator can't pick out one fish." },
            { label: "Honeybee hive", icon: "🐝", detail: "Each bee has a job: gather, feed, guard or lay eggs." },
            { label: "Ant colony", icon: "🐜", detail: "Thousands of ants carry food and build tunnels together." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each group to how it helps the animals survive.",
          pairs: [
            { left: "Wolf pack", right: "Hunting large animals together" },
            { left: "School of fish", right: "Confusing a predator" },
            { left: "Honeybee hive", right: "Sharing the jobs" },
            { left: "Emperor penguin huddle", right: "Staying warm in the cold" },
          ],
          hint: "Think about what danger or problem each group solves: food, predators, work or cold.",
          seconds: 35,
        },
        think: {
          q: "Why does a wolf pack help wolves survive?",
          choices: ["Wolves in packs never get hungry", "Together they can catch large animals one wolf could not", "Packs make wolves grow wings"],
          answer: 1,
          why: "Hunting together lets wolves catch big prey like elk.",
          hints: ["Pack wolves still get hungry; the pack helps them find food.", "", "Wolves never grow wings! Think about hunting together."],
        },
        approaches: {
          analogy:
            "An animal group is like a sports team. One player alone can't win, but when everyone plays their part, the team can do things no single player could.",
          example:
            "One honeybee can't build a hive, make honey and raise young all at once. In a hive of thousands, some bees fly for nectar, some make wax, some guard the door, and the queen lays eggs. The hive thrives.",
          simpler: {
            q: "Is it easier for a small fish to hide alone or in a big school?",
            choices: ["In a big school", "Alone"],
            answer: 0,
            why: "In a big swirling school, a predator has trouble picking one fish.",
            hints: ["", "A lone fish is easy to spot and chase."],
          },
        },
      },
      {
        title: "Groups Stay Safe and Warm",
        teach:
          "Groups help in other ways too. Emperor penguins live through the freezing Antarctic winter by huddling together in a big crowd. They slowly shuffle, so each penguin takes turns on the cold outside edge and in the warm middle. Meerkats take turns standing on a mound as a lookout. When a hawk flies over, the guard gives a warning call, and everyone dives into the burrow. Musk oxen form a circle around their calves when wolves come near, horns facing out. What do you notice? Each group solves a problem: cold, hawks or wolves. Scientists use evidence like this to argue that groups help animals survive.",
        visual: {
          type: "flip",
          cards: [
            { front: "Penguin huddle", back: "Emperor penguins crowd together and take turns in the warm middle." },
            { front: "Meerkat lookout", back: "One meerkat stands guard and calls a warning when a hawk comes." },
            { front: "Musk ox circle", back: "Adults stand in a ring around the calves with horns facing out." },
            { front: "Evidence", back: "Facts we observe that support an idea, like a group surviving where one animal could not." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Emperor penguins {0} together to stay warm. A meerkat lookout gives a warning {1} when a hawk comes. Musk oxen make a {2} around their calves.",
          blanks: [{ answers: ["huddle"] }, { answers: ["call"] }, { answers: ["circle", "ring"] }],
          bank: ["huddle", "call", "circle", "sleep", "nest"],
          hint: "Penguins crowd close, meerkats make a sound, and musk oxen stand in a ring.",
          seconds: 35,
        },
        think: {
          q: "What problem does a penguin huddle solve?",
          choices: ["Finding a hawk", "Staying warm in freezing weather", "Catching big prey"],
          answer: 1,
          why: "Huddling keeps emperor penguins warm in the Antarctic winter.",
          hints: ["Meerkat lookouts watch for hawks, not penguin huddles.", "", "Catching big prey is how wolf packs help, not penguin huddles."],
        },
        approaches: {
          analogy:
            "A penguin huddle is like friends sharing a big blanket on a cold night, and taking turns so nobody is stuck on the drafty edge all night.",
          example:
            "A meerkat family is digging for beetles. One meerkat climbs a mound to watch the sky. A hawk appears, the lookout barks, and every meerkat is safe underground in seconds.",
          simpler: {
            q: "Do penguins in a huddle stay warmer or colder than a penguin alone?",
            choices: ["Warmer", "Colder"],
            answer: 0,
            why: "Huddled bodies share warmth and block the wind.",
            hints: ["", "Think of how warm it feels to stand close to friends in the cold."],
          },
        },
      },
      {
        title: "Small Differences, Big Advantages",
        teach:
          "Remember variation, the small differences between animals of the same kind? Sometimes a difference helps an animal survive. In the deserts of Arizona and New Mexico live rock pocket mice. Most are sandy colored and blend in on light sand. But where dark lava rock covers the ground, most mice are dark. Why? On dark rock, owls spot light mice easily. Dark mice are harder to see, so more of them survive and have babies, and the babies often inherit dark fur. Plants have advantages too. A cactus with longer roots reaches more water. A brighter flower may draw more bees. A helpful difference is called an advantage.",
        visual: {
          type: "compare",
          left: { title: "Light mouse on dark rock", points: ["Easy for an owl to see", "Less likely to survive", "Fewer babies"] },
          right: { title: "Dark mouse on dark rock", points: ["Blends in with the rock", "More likely to survive", "More babies, which often inherit dark fur"] },
        },
        probe: {
          type: "sort",
          prompt: "Does the difference help the living thing survive (an advantage) or make it harder?",
          buckets: ["Advantage", "Makes survival harder"],
          items: [
            { text: "A dark mouse living on dark lava rock", bucket: 0 },
            { text: "A cactus with extra-long roots in a dry desert", bucket: 0 },
            { text: "A rabbit with thicker fur in a snowy place", bucket: 0 },
            { text: "A light mouse living on dark lava rock", bucket: 1 },
            { text: "A slower deer in a forest with wolves", bucket: 1 },
            { text: "A flower with dull petals that bees rarely visit", bucket: 1 },
          ],
          hint: "Ask: does this help it hide, find food or water, stay warm or have young?",
          mistakes: [{ match: "Light mouse sorted as advantage", coach: "On dark rock a light mouse stands out, so owls find it more easily. That's harder, not easier." }],
          seconds: 45,
        },
        think: {
          q: "Why are most rock pocket mice dark where the ground is dark lava rock?",
          choices: ["The rock paints them dark", "Dark mice are harder for owls to see, so more survive and have babies", "The mice choose to change their color"],
          answer: 1,
          why: "Dark fur hides the mice on dark rock, so more dark mice survive and pass on dark fur.",
          hints: ["Rock doesn't color fur. Think about which mice the owls catch.", "", "Mice can't change their own fur color on purpose. Fur color is inherited."],
        },
        approaches: {
          analogy:
            "It's like a game of hide-and-seek in a dark room. A kid in dark clothes stays hidden longer than a kid in a bright white shirt.",
          example:
            "Imagine 10 light mice and 10 dark mice on dark rock. Owls catch 6 light mice but only 2 dark mice. Now there are 4 light and 8 dark mice left to have babies, so the next group of mice is mostly dark.",
          simpler: {
            q: "Which mouse is easier to see on dark rock?",
            choices: ["A light mouse", "A dark mouse"],
            answer: 0,
            why: "A light mouse stands out against dark rock.",
            hints: ["", "A dark mouse blends in with dark rock."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the sentences that are evidence that living in a group helps animals survive.",
      sentences: [
        "A wolf pack can bring down an elk that one wolf could not.",
        "A bear spends most of the year alone in the forest.",
        "Meerkats escape hawks because a lookout calls a warning.",
        "Emperor penguins survive the Antarctic winter by huddling together.",
        "Some snakes hatch from eggs.",
      ],
      correct: [0, 2, 3],
    },
    explain: {
      prompt: "Explain two ways living in a group helps animals survive. Then explain how a small difference, like fur color, can help one animal survive better than another.",
      keyPoints: [
        "Groups help animals find food or hunt together",
        "Groups help animals stay safe from predators or stay warm",
        "Members of the same kind vary",
        "A helpful difference makes an animal more likely to survive and have young",
        "The young often inherit the helpful trait",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each animal group to the evidence of how it helps.",
        pairs: [
          { left: "Wolves", right: "Catch elk by hunting as a pack" },
          { left: "Meerkats", right: "A lookout warns of hawks" },
          { left: "Musk oxen", right: "Circle around the calves" },
          { left: "Honeybees", right: "Each bee has a job in the hive" },
        ],
        hint: "Remember: hunting, warning, protecting the young and sharing jobs.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "On dark lava rock live 20 mice: 10 light and 10 dark. Owls catch 7 light mice and 2 dark mice. How many dark mice are left?",
        answer: 8,
        unit: "mice",
        hint: "Start with 10 dark mice and take away the 2 the owls caught.",
        mistakes: [{ match: "3", coach: "That's the light mice left. The question asks about dark mice: 10 take away 2." }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build a sentence that explains an advantage.",
        tiles: ["A cactus with longer roots", "can reach more water,", "so it is more likely", "to survive a dry summer."],
        distractors: ["because it is green"],
        hint: "Start with the cactus, then what its trait lets it do, then the result.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "Small differences among the same kind of animal are called {0}. A difference that helps an animal survive is an {1}.",
        blanks: [{ answers: ["variation"] }, { answers: ["advantage"] }],
        bank: ["variation", "advantage", "force", "pole", "climate"],
        hint: "Differences = variation. A helpful difference = an advantage.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "How does a school of fish help small fish survive?",
        choices: ["It makes the fish grow bigger", "It makes the water warmer", "It confuses predators trying to pick out one fish"],
        answer: 2,
        why: "A swirling school makes it hard for a predator to catch just one fish.",
      },
      {
        q: "Which is an example of animals helping each other stay warm?",
        choices: ["Emperor penguins huddling", "A hawk soaring alone", "A snake hiding under a rock"],
        answer: 0,
        why: "Emperor penguins huddle together to share warmth in the Antarctic winter.",
      },
      {
        q: "On dark lava rock, which rock pocket mice are more likely to survive?",
        choices: ["Light-colored mice", "Dark-colored mice", "Both the same"],
        answer: 1,
        why: "Dark mice blend in with dark rock, so owls see them less.",
      },
      {
        q: "What usually happens to a helpful trait like dark fur over many generations?",
        choices: ["It disappears right away", "It turns into a different trait", "More of the young have it"],
        answer: 2,
        why: "Animals with the helpful trait survive and have more young, who often inherit it.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Hide-and-seek camouflage test. Cut 20 small squares from dark paper and 20 from light paper. With a parent, scatter them all on a dark towel or rug. Give a family member 15 seconds to pick up as many as they can. Count which color got picked more. Then try it on a light sheet. Write what happened and explain how it is like the rock pocket mice.",
      rubric: [
        "Ran the test on a dark and a light background",
        "Counted and recorded how many of each color were picked",
        "Explained which color had the advantage on each background",
        "Connected the results to the rock pocket mice",
      ],
    },
  },

  // 6. Fossils and changing habitats
  {
    id: "sci-3.fossils",
    title: "Fossils and Changing Habitats",
    minutes: 35,
    stage: "logic",
    standards: ["3-LS4-1", "3-LS4-3", "3-LS4-4", "3-5-ETS1-2"],
    read: [
      "A fossil is what is left of a plant or animal that lived long, long ago, preserved in rock. Some fossils are bones, teeth or shells that slowly turned to stone. Others are imprints, like the shape of a leaf or a footprint pressed into mud that later hardened into rock. Fossils are like clues, and scientists who study them act like detectives.",
      "Fossils tell us about the living things of long ago. Many fossils show animals that no longer live anywhere on Earth, like dinosaurs and trilobites. When a kind of living thing dies out completely, it is extinct. Fossils also tell us what places were like long ago. Fossils of sea shells and sea animals have been found high in mountains, even near the top of Mount Everest. That means the rock there was once under the sea. Fossils of ferns and other plants that need warm weather have been found in icy Antarctica, so Antarctica was once much warmer.",
      "Every plant and animal lives in a habitat, the place that gives it food, water, shelter and space. In any habitat, some living things survive well, some survive less well, and some cannot survive there at all. A cactus does well in a dry desert but would rot in a swamp. A polar bear does well on Arctic ice but would overheat in a rainforest.",
      "Habitats can change. A drought can dry up a pond. A beaver dam can flood a meadow. People build roads and towns. When a habitat changes, some living things stay, some move away, and some die. People can help by solving the problems these changes cause. Fish ladders help salmon swim past river dams. In Banff National Park in Canada, bridges covered with plants let bears, elk and deer cross over a busy highway safely. Good solutions are judged by evidence: do they really help?",
    ].join("\n\n"),
    keyIdeas: [
      "Fossils show what living things and places were like long ago.",
      "In any habitat, some living things survive well, some less well, and some not at all.",
      "When habitats change, plants and animals may move, change in number or die, and people can design solutions that help.",
    ],
    hook: {
      text: "Pip found a rock with a spiral shell pressed into it, high on a mountain of the Sky Islands. Shells come from the sea. So how did a sea shell end up on a mountaintop?",
    },
    teach: [
      {
        title: "What Fossils Are",
        teach:
          "A fossil is what is left of a plant or animal that lived long ago, kept in rock. Some fossils are bones, teeth or shells that very slowly turned to stone. Others are imprints, like the outline of a leaf or a dinosaur footprint pressed into soft mud that later hardened into rock. Most fossils form when a living thing is buried quickly in mud or sand, and layers pile on top over a very long time. Many fossils show living things that are extinct, which means they have died out completely, like dinosaurs and trilobites, small sea animals with hard shells. What do you notice about a fossil's shape?",
        visual: {
          type: "flip",
          cards: [
            { front: "Fossil", back: "What is left of a living thing from long ago, kept in rock." },
            { front: "Imprint", back: "A shape pressed into mud that hardened, like a leaf or a footprint." },
            { front: "Extinct", back: "A kind of living thing that has died out completely." },
            { front: "Trilobite", back: "An extinct sea animal with a hard, segmented shell." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps of how a shell becomes a fossil in order.",
          steps: [
            "A sea animal with a shell dies",
            "Its shell is quickly buried in mud on the sea floor",
            "Layer after layer of mud piles on top",
            "Over a very long time, the mud and shell harden into rock",
            "Much later, the rock wears away and the fossil is found",
          ],
          hint: "It starts with a living thing dying and ends with someone finding the fossil.",
          seconds: 40,
        },
        think: {
          q: "What does extinct mean?",
          choices: ["Very large", "Died out completely, with none left alive", "Living in the sea"],
          answer: 1,
          why: "An extinct kind of living thing has no members alive anywhere.",
          hints: ["Some extinct animals were big, but extinct means none are left.", "", "Some extinct animals lived in the sea, but extinct means none are left alive."],
        },
        approaches: {
          analogy:
            "A fossil imprint is like your handprint pressed into wet cement on a sidewalk. Long after you've gone home, the shape of your hand is still there in the hard cement.",
          example:
            "Press a seashell into a lump of clay, then lift it out. The clay keeps the shell's shape. Let the clay harden. You've made a model of an imprint fossil.",
          simpler: {
            q: "Are fossils found in rock?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Fossils are kept in rock.",
            hints: ["", "Fossils are found in rock, often in layers of hardened mud."],
          },
        },
      },
      {
        title: "Fossils Are Clues to Long Ago",
        teach:
          "Fossils are clues, and scientists read them like detectives. A fossil tells us what kind of living thing was there. It also tells us what the place was like. Fossils of sea shells and sea animals have been found high in mountains, even near the top of Mount Everest. So that rock was once under the sea. Fossils of ferns and other plants that need warm weather have been found in Antarctica, which is now covered in ice. So Antarctica was once much warmer. Fish fossils in a desert tell us there was once water there. That explains Pip's shell: the mountain rock was once the sea floor!",
        visual: {
          type: "hotspots",
          title: "Reading fossil clues",
          center: "Fossil clues",
          spots: [
            { label: "Sea shells on a mountain", icon: "🐚", detail: "The rock was once under the sea." },
            { label: "Ferns in Antarctica", icon: "🌿", detail: "Antarctica was once much warmer." },
            { label: "Fish in a desert", icon: "🐟", detail: "There was once a lake or sea there." },
            { label: "Dinosaur footprints", icon: "🦖", detail: "Dinosaurs once walked across soft mud there." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each fossil clue to what it tells us about long ago.",
          pairs: [
            { left: "Sea shell fossils on a mountain", right: "The rock was once under the sea" },
            { left: "Fern fossils in icy Antarctica", right: "The land was once warm" },
            { left: "Fish fossils in a dry desert", right: "There was once water there" },
            { left: "Footprints in rock", right: "An animal walked across soft mud" },
          ],
          hint: "Ask: where does this kind of living thing need to live? Then the place must once have been like that.",
          seconds: 40,
        },
        think: {
          q: "Scientists find fossils of fish in a dry desert. What can they figure out?",
          choices: ["Fish can live in deserts", "The desert was once covered by water", "Someone dropped the fish there yesterday"],
          answer: 1,
          why: "Fish need water, so there must once have been water where the desert is now.",
          hints: ["Fish need water to live. They can't survive in a dry desert.", "", "Fossils take a very long time to form, much longer than one day."],
        },
        approaches: {
          analogy:
            "Reading fossils is like finding sandy flip-flops and a beach towel in a closet. Even in winter, they tell you someone went to the beach.",
          example:
            "A scientist digs in a hot, dry desert and finds fossil fish and clam shells. Fish and clams live in water. So she concludes: long ago, this desert was the bottom of a lake or sea.",
          simpler: {
            q: "Where do sea shells come from?",
            choices: ["The sea", "A mountaintop"],
            answer: 0,
            why: "Shells are made by sea animals.",
            hints: ["", "Shells come from sea animals. If one is on a mountain, the land must have changed."],
          },
        },
      },
      {
        title: "Survive Well, Less Well, or Not at All",
        teach:
          "Every plant and animal lives in a habitat, a place that gives it food, water, shelter and space. In any habitat, some living things survive well, some survive less well, and some cannot survive there at all. A cactus survives well in a hot, dry desert. It stores water in its thick stem. Put a cactus in a swamp, and its roots rot. A polar bear, with thick fur and fat, survives well on Arctic ice, but it would overheat in a rainforest. A frog does well by a pond but less well in a dry field, and not at all in a desert with no water. What helps a living thing survive where it lives?",
        visual: {
          type: "compare",
          left: { title: "Survives well in the desert", points: ["Cactus stores water", "Camel can go days without drinking", "Desert tortoise digs burrows for shade"] },
          right: { title: "Would struggle in the desert", points: ["Frog needs water for its skin and eggs", "Polar bear would overheat", "Water lily needs a pond"] },
        },
        probe: {
          type: "sort",
          prompt: "How well would each living thing survive in a hot, dry desert?",
          buckets: ["Survives well", "Survives less well", "Cannot survive"],
          items: [
            { text: "A cactus", bucket: 0 },
            { text: "A camel", bucket: 0 },
            { text: "A rosebush that needs regular watering", bucket: 1 },
            { text: "A tomato plant that needs lots of water", bucket: 1 },
            { text: "A goldfish", bucket: 2 },
            { text: "A water lily", bucket: 2 },
          ],
          hint: "Ask how much water each one needs and whether it can keep cool.",
          seconds: 45,
        },
        think: {
          q: "Why would a polar bear survive poorly in a rainforest?",
          choices: ["Its thick fur and fat would make it overheat", "There are too many trees to climb", "Polar bears cannot swim"],
          answer: 0,
          why: "A polar bear's thick fur and fat keep it warm on the ice, but they are too warm for a hot rainforest.",
          hints: ["", "Trees aren't the main problem. Think about how hot a rainforest is.", "Polar bears are actually strong swimmers. Think about heat."],
        },
        approaches: {
          analogy:
            "A habitat is like a pair of shoes. Snow boots are perfect in a blizzard but terrible at the beach. Each living thing fits best where its traits match the place.",
          example:
            "Plant three seeds in a desert garden: a cactus, a tomato and a water lily. The cactus thrives. The tomato survives only with lots of watering. The water lily dies without a pond.",
          simpler: {
            q: "Where does a fish survive best?",
            choices: ["In water", "In a sandy desert"],
            answer: 0,
            why: "Fish need water to breathe and live.",
            hints: ["", "Fish need water. A desert has very little."],
          },
        },
      },
      {
        title: "When Habitats Change",
        teach:
          "Habitats can change. A drought can dry up a pond. A beaver dam can flood a meadow. A forest fire can burn the trees. People build roads, farms and towns. When a habitat changes, some living things stay and do fine, some move away, and some die. People can help by solving the problems these changes cause. A dam on a river can block salmon swimming upstream to lay eggs, so engineers build fish ladders, steps of water the salmon can leap up. In Banff National Park in Canada, wide bridges covered with plants let bears, elk and deer cross a busy highway. Engineers compare solutions and use evidence to judge which works best.",
        visual: {
          type: "hotspots",
          title: "Solutions for changing habitats",
          center: "Helping wildlife",
          spots: [
            { label: "Fish ladder", icon: "🐟", detail: "Steps of water help salmon swim past a dam to lay their eggs." },
            { label: "Wildlife bridge", icon: "🌉", detail: "A plant-covered bridge lets animals cross a highway safely." },
            { label: "Planting trees", icon: "🌳", detail: "New trees bring back shade, food and homes after a fire." },
            { label: "Birdhouses", icon: "🐦", detail: "Nest boxes give birds a home where old trees were cut down." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each habitat problem to a solution.",
          pairs: [
            { left: "A dam blocks salmon from swimming upstream", right: "Build a fish ladder" },
            { left: "Deer are hit crossing a new highway", right: "Build a wildlife bridge" },
            { left: "A fire burned the trees on a hill", right: "Plant young trees" },
            { left: "Old trees with nest holes were cut down", right: "Put up birdhouses" },
          ],
          hint: "Each solution fixes the exact problem: a way past, a way across, or a new home.",
          seconds: 40,
        },
        think: {
          q: "A town plans to build a wildlife bridge over a highway. What evidence would show the bridge works?",
          choices: ["The bridge is painted a nice color", "Cameras show animals using it and fewer are hit by cars", "The bridge was expensive"],
          answer: 1,
          why: "Evidence that animals use the bridge and fewer are hurt shows it solves the problem.",
          hints: ["Color doesn't help animals cross. Look for evidence the problem got better.", "", "Cost doesn't show it works. Look for evidence the problem got better."],
        },
        approaches: {
          analogy:
            "A wildlife bridge is like a crosswalk with a crossing guard for animals. It gives them a safe way across instead of dashing into traffic.",
          example:
            "A dam was built on a river, and fewer salmon reached their spawning streams. Engineers added a fish ladder. Counters watched the ladder and saw thousands of salmon climb it each year, so the solution worked.",
          simpler: {
            q: "If a pond dries up, what will most likely happen to the frogs?",
            choices: ["They move away or die", "They grow bigger"],
            answer: 0,
            why: "Frogs need water, so they must move to another pond or they will not survive.",
            hints: ["", "Frogs need water. Without the pond, life gets much harder for them."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "A meadow is flooded by a new beaver pond. Sort how each living thing will likely do.",
      buckets: ["Does better", "Does worse or moves away"],
      items: [
        { text: "Ducks", bucket: 0 },
        { text: "Frogs", bucket: 0 },
        { text: "Fish", bucket: 0 },
        { text: "Prairie dogs in their underground burrows", bucket: 1 },
        { text: "Meadow grasses that need dry soil", bucket: 1 },
        { text: "Grasshoppers in the tall grass", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain how fossils help us learn about the past. Then explain what can happen to plants and animals when their habitat changes, and one way people can help.",
      keyPoints: [
        "Fossils are remains or imprints of living things from long ago",
        "Fossils show what places were like long ago, like sea shells on a mountain",
        "In a habitat, some living things survive well, some less well, and some not at all",
        "When a habitat changes, living things may move away or die",
        "People design solutions like fish ladders or wildlife bridges",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A dinosaur footprint in rock is a kind of {0}. Dinosaurs died out completely, so they are {1}. Sea shell fossils on a mountain show that the land was once under the {2}.",
        blanks: [{ answers: ["fossil"] }, { answers: ["extinct"] }, { answers: ["sea", "ocean"] }],
        bank: ["fossil", "extinct", "sea", "magnet", "desert"],
        hint: "Remains in rock = fossil. Died out = extinct. Shells come from the sea.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "How well would each living thing survive on icy Arctic land?",
        buckets: ["Survives well", "Cannot survive"],
        items: [
          { text: "A polar bear", bucket: 0 },
          { text: "An arctic fox", bucket: 0 },
          { text: "A cactus", bucket: 1 },
          { text: "A parrot from the rainforest", bucket: 1 },
        ],
        hint: "Which living things have thick fur to stay warm in the cold?",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Before a fish ladder was built, counters saw 40 salmon pass a dam in a week. After the ladder, they saw 300 in a week. How many more salmon passed after the ladder was built?",
        answer: 260,
        unit: "salmon",
        hint: "Subtract the before number from the after number: 300 minus 40.",
        mistakes: [{ match: "340", coach: "You added. To find how many more, subtract: 300 minus 40." }],
        seconds: 35,
      },
      {
        type: "highlight",
        prompt: "Tap the sentences that are evidence a wildlife bridge is working.",
        sentences: [
          "Trail cameras show elk and bears walking across the bridge.",
          "The bridge took two years to build.",
          "Fewer animals are hit by cars on that part of the highway.",
          "The bridge is covered with grass and bushes.",
        ],
        correct: [0, 2],
        hint: "Evidence shows the problem got better: animals use it and fewer get hurt.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is a fossil?",
        choices: ["A shiny new rock", "The remains or imprint of a living thing from long ago, kept in rock", "A kind of plant that lives in deserts"],
        answer: 1,
        why: "Fossils are remains or imprints of ancient living things preserved in rock.",
      },
      {
        q: "Fern fossils found in icy Antarctica tell us that...",
        choices: ["ferns love ice", "someone planted them last year", "Antarctica was once much warmer"],
        answer: 2,
        why: "Ferns need warm weather, so Antarctica must once have been warmer.",
      },
      {
        q: "Which would survive best in a hot, dry desert?",
        choices: ["A cactus", "A goldfish", "A water lily"],
        answer: 0,
        why: "A cactus stores water in its thick stem and needs very little rain.",
      },
      {
        q: "What does a fish ladder help solve?",
        choices: ["Fish getting too big", "A dam blocking fish from swimming upstream", "Too much rain"],
        answer: 1,
        why: "A fish ladder lets salmon get past a dam to lay their eggs.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a model fossil, then design a helper. First, press a shell, leaf or toy dinosaur foot into clay or salt dough, lift it out and let it harden. Show a parent and explain what your fossil would tell a scientist. Second, think of a habitat change near you (a new road, a dry summer, a cut-down tree). Draw two different solutions that could help the animals, and explain which one you think works better and why.",
      rubric: [
        "Made an imprint fossil and explained what it shows",
        "Named a real habitat change and the animals it affects",
        "Drew two different solutions",
        "Compared them and gave a reason for the better one",
      ],
    },
  },

  // 7. Weather, climate and weather hazards
  {
    id: "sci-3.weather",
    title: "Weather Data, World Climates and Storm-Smart Designs",
    minutes: 35,
    stage: "rhetoric",
    standards: ["3-ESS2-1", "3-ESS2-2", "3-ESS3-1", "3-5-ETS1-3"],
    read: [
      "Weather is what the air outside is like at one time and place. Is it hot or cold? Rainy or dry? Windy or calm? Scientists measure weather with tools. A thermometer measures temperature. A rain gauge measures how much rain falls. A wind vane shows which way the wind blows, and a wind sock or an anemometer shows how strong it is.",
      "When scientists record the weather every day for many years, they can put the data in tables and graphs. A bar graph of each month's average temperature shows a pattern: in much of the United States, summer months are warm and winter months are cold. Data helps us predict what weather to expect in each season, even though no one can say exactly what tomorrow will bring.",
      "Climate is the usual weather of a place over many years. Weather can change in an hour, but climate stays much the same year after year. Different parts of the world have different climates. A tropical rainforest, like the Amazon in South America, is hot and wet all year. A desert, like the Sahara in Africa, gets very little rain. The polar regions, like Antarctica, are cold all year; Antarctica is the coldest place on Earth. Many places, like much of the United States and Europe, have four seasons.",
      "Some weather is dangerous. Floods, lightning, hurricanes, tornadoes and blizzards are weather hazards. People cannot stop them, but they can design ways to reduce the harm. Houses near rivers are built on stilts or behind walls of earth called levees. Lightning rods, an invention of Benjamin Franklin, carry lightning safely into the ground. Storm shutters protect windows from hurricane winds. Tornado shelters give families a safe place underground. Engineers test these designs and make claims, backed by evidence, about how well they work.",
    ].join("\n\n"),
    keyIdeas: [
      "Weather is the air at one time and place; scientists measure it and record it in tables and graphs.",
      "Weather data shows what to expect in each season, and climate is the usual weather of a place over many years.",
      "People cannot stop weather hazards, but good designs like levees, lightning rods and shelters reduce the harm.",
    ],
    hook: {
      text: "A storm is rolling toward the Sky Islands. Dark clouds pile up and the wind howls. Pip wants to know: How strong will it be? Will the bridges hold? Scientists and engineers have tools and designs for days like this.",
    },
    teach: [
      {
        title: "Measuring and Recording Weather",
        teach:
          "Weather is what the air outside is like at one time and place: hot or cold, wet or dry, windy or calm. Scientists measure weather with tools. A thermometer measures temperature. A rain gauge collects rain so you can measure how much fell. A wind vane points to show which way the wind is blowing. When scientists write down the weather every day, they put it in a table. Then they can make a bar graph, with a bar for each day or month. Graphs make patterns easy to spot. What do you notice about the weather where you live this month?",
        visual: {
          type: "flip",
          cards: [
            { front: "Thermometer", back: "Measures temperature: how hot or cold the air is." },
            { front: "Rain gauge", back: "Collects rain so you can measure how much fell." },
            { front: "Wind vane", back: "Points to show which way the wind is blowing." },
            { front: "Bar graph", back: "Uses bars of different heights to compare numbers, like rain each month." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each weather tool to what it measures.",
          pairs: [
            { left: "Thermometer", right: "Temperature" },
            { left: "Rain gauge", right: "How much rain fell" },
            { left: "Wind vane", right: "Which way the wind blows" },
            { left: "Anemometer", right: "How fast the wind blows" },
          ],
          hint: "Thermo- is about heat. A gauge collects. A vane turns with the wind. An anemometer spins faster in stronger wind.",
          seconds: 35,
        },
        think: {
          q: "Which tool would you use to find out how much rain fell last night?",
          choices: ["A thermometer", "A rain gauge", "A wind vane"],
          answer: 1,
          why: "A rain gauge collects rain and shows how much fell.",
          hints: ["A thermometer measures how hot or cold it is, not rain.", "", "A wind vane shows wind direction, not rain."],
        },
        approaches: {
          analogy:
            "A weather table is like a diary for the sky. Each day you write down what happened, and later you can flip back and see the patterns.",
          example:
            "Every morning for a week, Ava reads her thermometer: 12, 14, 15, 13, 16, 18, 17 degrees Celsius. She makes a bar graph and sees the week mostly warmed up.",
          simpler: {
            q: "What does a thermometer measure?",
            choices: ["Temperature", "Wind direction"],
            answer: 0,
            why: "A thermometer tells how hot or cold it is.",
            hints: ["", "Wind direction is shown by a wind vane."],
          },
        },
      },
      {
        title: "Weather Patterns by Season",
        teach:
          "Pip kept a weather log on the Sky Islands for a whole year and found the average temperature for each season. Winter: 2 degrees Celsius. Spring: 12 degrees. Summer: 24 degrees. Fall: 13 degrees. When Pip drew a bar graph, the summer bar was tallest and the winter bar was shortest. That is a pattern. Places with four seasons are usually warmest in summer and coldest in winter. Rain and snow follow patterns too. Some places get most of their rain in spring; others get snow every winter. Data like this does not tell you exactly what tomorrow will be. It tells you what to expect in each season.",
        visual: {
          type: "hotspots",
          title: "Pip's weather graph",
          center: "Seasons",
          spots: [
            { label: "Winter: 2 °C", icon: "❄️", detail: "The shortest bar: the coldest season." },
            { label: "Spring: 12 °C", icon: "🌷", detail: "Warming up." },
            { label: "Summer: 24 °C", icon: "☀️", detail: "The tallest bar: the warmest season." },
            { label: "Fall: 13 °C", icon: "🍂", detail: "Cooling down again." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Pip's data: winter 2 °C, spring 12 °C, summer 24 °C, fall 13 °C. How many degrees warmer is summer than winter?",
          answer: 22,
          unit: "°C",
          hint: "Subtract the winter temperature from the summer temperature: 24 minus 2.",
          mistakes: [{ match: "26", coach: "You added. To find how much warmer, subtract: 24 minus 2." }],
          seconds: 30,
        },
        think: {
          q: "In Pip's bar graph, which season has the tallest bar?",
          choices: ["Winter", "Spring", "Summer"],
          answer: 2,
          why: "Summer has the highest temperature, 24 degrees, so its bar is tallest.",
          hints: ["Winter is the coldest, so its bar is the shortest.", "Spring is 12 degrees, but one season is much warmer.", ""],
        },
        approaches: {
          analogy:
            "Season data is like knowing your school year. You don't know exactly what will happen on each day, but you know summer break comes in summer and the holidays come in winter.",
          example:
            "A town records snow for 30 winters. Almost every year, most snow falls in January. So in January, families can expect snow and keep shovels ready, even though nobody knows which day it will fall.",
          simpler: {
            q: "In places with four seasons, which season is usually the coldest?",
            choices: ["Winter", "Summer"],
            answer: 0,
            why: "Winter is usually the coldest season.",
            hints: ["", "Summer is usually the warmest season."],
          },
        },
      },
      {
        title: "Climates Around the World",
        teach:
          "Weather can change in an hour. Climate is the usual weather of a place over many years. Different regions of the world have different climates. A tropical rainforest, like the Amazon in South America, is hot and rainy all year, and the forest stays green. A desert, like the Sahara in Africa, gets very little rain, and its days can be scorching. The polar regions are cold all year. Antarctica is the coldest place on Earth and is covered in thick ice. Many places, like much of the United States and Europe, have a temperate climate with four seasons: warm summers, cold winters, and spring and fall in between.",
        visual: {
          type: "hotspots",
          title: "World climates",
          center: "Climates",
          spots: [
            { label: "Tropical rainforest", icon: "🌴", detail: "Hot and rainy all year. Example: the Amazon in South America." },
            { label: "Desert", icon: "🏜️", detail: "Very little rain. Example: the Sahara in Africa." },
            { label: "Polar", icon: "🧊", detail: "Cold all year. Antarctica is the coldest place on Earth." },
            { label: "Temperate", icon: "🍁", detail: "Four seasons: warm summers and cold winters." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each place to its climate.",
          pairs: [
            { left: "The Amazon", right: "Hot and rainy all year" },
            { left: "The Sahara", right: "Very dry, with little rain" },
            { left: "Antarctica", right: "Cold and icy all year" },
            { left: "Much of the United States", right: "Four seasons" },
          ],
          hint: "Rainforests are wet, deserts are dry, polar lands are icy, and temperate places have four seasons.",
          seconds: 35,
        },
        think: {
          q: "What is the difference between weather and climate?",
          choices: [
            "Weather is the usual pattern over many years; climate is today",
            "Weather is what the air is like now; climate is the usual weather over many years",
            "They mean exactly the same thing",
          ],
          answer: 1,
          why: "Weather changes day to day; climate is the long-term pattern.",
          hints: ["That's backwards. Weather is right now, and climate is the long-term pattern.", "", "They are different: one is short-term, one is long-term."],
        },
        approaches: {
          analogy:
            "Weather is your mood today. Climate is your personality. You might be grumpy one morning, but most days you're cheerful.",
          example:
            "One day in the Sahara, a rare rainstorm falls. That's the weather that day. But year after year the Sahara gets very little rain, so its climate is still a dry desert.",
          simpler: {
            q: "Which place is cold all year?",
            choices: ["Antarctica", "The Amazon rainforest"],
            answer: 0,
            why: "Antarctica is cold and icy all year.",
            hints: ["", "The Amazon is hot all year."],
          },
        },
      },
      {
        title: "Designs That Reduce Weather Hazards",
        teach:
          "Some weather is dangerous. Floods, lightning, hurricanes, tornadoes and blizzards are weather hazards. People cannot stop a storm, but they can design ways to reduce the harm. Houses near rivers can be built on stilts so floodwater flows underneath, and walls of earth called levees hold rivers back. Benjamin Franklin invented the lightning rod, a metal rod that carries lightning safely into the ground. Storm shutters cover windows against hurricane winds. Tornado shelters give families a safe room underground. Engineers make a claim about how well a design works, then back it up with evidence from tests. Which hazard is most common where you live?",
        visual: {
          type: "hotspots",
          title: "Storm-smart designs",
          center: "Weather hazards",
          spots: [
            { label: "Flood", icon: "🌊", detail: "Houses on stilts and earth walls called levees keep water out." },
            { label: "Lightning", icon: "⚡", detail: "A lightning rod carries the strike safely into the ground." },
            { label: "Hurricane", icon: "🌀", detail: "Storm shutters and strong roof straps hold up against wind." },
            { label: "Tornado", icon: "🌪️", detail: "An underground shelter or safe room protects families." },
            { label: "Blizzard", icon: "🌨️", detail: "Steep roofs let heavy snow slide off." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each weather hazard to a design that reduces its harm.",
          pairs: [
            { left: "Flood", right: "A house built on stilts" },
            { left: "Lightning", right: "A lightning rod" },
            { left: "Hurricane winds", right: "Storm shutters on windows" },
            { left: "Tornado", right: "An underground safe room" },
            { left: "Heavy snow", right: "A steep roof" },
          ],
          hint: "Think about what each hazard does: water rises, lightning strikes, wind blows, snow piles up.",
          seconds: 40,
        },
        think: {
          q: "How does a house on stilts help during a flood?",
          choices: ["It stops the rain from falling", "Floodwater can flow underneath instead of into the house", "It makes the river smaller"],
          answer: 1,
          why: "Raising the house lets water pass below the living space.",
          hints: ["Nothing can stop the rain. The design reduces the harm.", "", "Stilts don't change the river. They lift the house above the water."],
        },
        approaches: {
          analogy:
            "Storm-smart designs are like a raincoat and boots. They don't stop the rain, but they keep you from getting soaked.",
          example:
            "Two model houses sit in a tub. One is on stilts, one sits flat. Pour in water to flood the tub. The flat house's floor gets wet; the stilt house stays dry. That's evidence for the claim that stilts reduce flood harm.",
          simpler: {
            q: "Can people stop a hurricane from happening?",
            choices: ["No, but they can reduce the harm", "Yes, easily"],
            answer: 0,
            why: "Hurricanes can't be stopped, but strong designs reduce the damage.",
            hints: ["", "No one can stop a hurricane. People build to protect against it."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it weather or climate?",
      buckets: ["Weather (one time)", "Climate (usual over many years)"],
      items: [
        { text: "It is raining right now", bucket: 0 },
        { text: "Tomorrow will be windy", bucket: 0 },
        { text: "Last Tuesday it snowed 5 centimeters", bucket: 0 },
        { text: "The Sahara gets very little rain year after year", bucket: 1 },
        { text: "Antarctica is cold all year", bucket: 1 },
        { text: "The Amazon is hot and wet in every season", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain the difference between weather and climate, how weather data helps us know what to expect each season, and one design that reduces harm from a weather hazard.",
      keyPoints: [
        "Weather is the air at one time and place",
        "Climate is the usual weather over many years",
        "Weather data in tables and graphs shows patterns for each season",
        "Different regions have different climates",
        "Designs like levees, lightning rods or shelters reduce harm from weather hazards",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Place each season's average temperature (°C) for Pip's town on the line.",
        min: 0,
        max: 30,
        step: 1,
        tolerance: 1,
        items: [
          { label: "Winter", value: 2 },
          { label: "Spring", value: 12 },
          { label: "Fall", value: 13 },
          { label: "Summer", value: 24 },
        ],
        hint: "Winter 2, spring 12, fall 13, summer 24.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Sort each place by its climate.",
        buckets: ["Hot and wet", "Very dry", "Cold all year"],
        items: [
          { text: "The Amazon rainforest", bucket: 0 },
          { text: "The Sahara", bucket: 1 },
          { text: "Antarctica", bucket: 2 },
          { text: "A tropical jungle near the equator", bucket: 0 },
          { text: "The Arctic ice near the North Pole", bucket: 2 },
        ],
        hint: "Rainforests are hot and wet, deserts are dry, and polar lands are cold.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A rain gauge measured 3 cm in April, 5 cm in May and 4 cm in June. How many centimeters of rain fell in all three months?",
        answer: 12,
        unit: "cm",
        hint: "Add the three months: 3 + 5 + 4.",
        mistakes: [{ match: "5", coach: "5 is the rainiest month. Add all three months together." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build a claim, with evidence, about a flood design.",
        tiles: ["Houses on stilts", "reduce flood damage", "because in our test", "the water flowed underneath", "and the floor stayed dry."],
        distractors: ["because stilts are tall and pretty"],
        hint: "A claim says what the design does, then gives evidence from a test.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "Which tool measures temperature?",
        choices: ["A rain gauge", "A wind vane", "A thermometer"],
        answer: 2,
        why: "A thermometer measures how hot or cold the air is.",
      },
      {
        q: "What is climate?",
        choices: ["The usual weather of a place over many years", "The weather right this minute", "A kind of storm"],
        answer: 0,
        why: "Climate is the long-term pattern of weather.",
      },
      {
        q: "Which place has a hot, rainy climate all year?",
        choices: ["Antarctica", "The Amazon rainforest", "The Sahara"],
        answer: 1,
        why: "The Amazon is a tropical rainforest: hot and wet all year.",
      },
      {
        q: "What does a lightning rod do?",
        choices: ["Stops storms from forming", "Makes lightning brighter", "Carries lightning safely into the ground"],
        answer: 2,
        why: "A lightning rod gives lightning a safe path to the ground.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Be a weather scientist for two weeks. Each day at the same time, record the temperature (a thermometer or a trusted weather report), whether it rained, and how windy it was. Make a table and a bar graph of the temperatures. Then build a small model house from a box and test one storm-smart design: stilts against a flood (in a tub of water) or a strong roof against wind (from a fan or hair dryer on cool). Make a claim about your design and back it up with what you saw.",
      rubric: [
        "Recorded the weather daily in a table",
        "Made a bar graph and described a pattern",
        "Built and tested a model design against one hazard",
        "Made a claim about the design backed by evidence from the test",
      ],
    },
  },
]);
