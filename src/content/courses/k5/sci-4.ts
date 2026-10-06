import { k5Course } from "./base";
import type { Lesson } from "../types";

/**
 * sci-4: Grade 4 science (NGSS), taught by Dr. Carver in the Canyon of Echoes.
 * Energy and collisions, energy on the move, waves and seeing, codes,
 * structures and senses, rocks and Earth's surface, resources and hazards.
 */
const lessons: Lesson[] = [
  // 1. Energy, speed and collisions
  {
    id: "sci-4.energy-speed",
    title: "Energy, Speed and Crashes",
    minutes: 30,
    stage: "logic",
    standards: ["4-PS3-1", "4-PS3-3"],
    read: [
      "Energy is the ability to make things move or change. A rolling ball has energy. So does a gust of wind, a burning candle and a ringing bell. Scientists call the energy of a moving object motion energy.",
      "The faster something moves, the more energy it has. A soccer ball rolled gently barely moves a pile of blocks. The same ball kicked hard sends the blocks flying. Same ball, more speed, more energy. A bike rider going fast needs more distance to stop than one going slowly, because there is more energy to get rid of.",
      "How can we tell how much energy a moving thing has? We look for evidence: how far it pushes something, how loud a sound it makes, or how deep a dent it leaves in soft clay. Roll a marble down a ramp from a low spot and then from a high spot. From higher up, it is moving faster at the bottom, and it pushes a paper cup farther.",
      "When moving objects bump into each other, we call it a collision. In a collision, energy moves from one object to another. When a bowling ball hits the pins, some of its energy goes into the pins, and they fly in all directions. Some energy turns into sound, the crash you hear, and a little turns into heat. The bowling ball slows down, because it gave some of its energy away.",
      "Energy is not used up or destroyed in a collision. It moves to other objects or changes into other forms, like sound and heat. Engineers use this idea when they design bumpers and helmets that soak up the energy of a crash.",
    ].join("\n\n"),
    keyIdeas: [
      "Energy is the ability to make things move or change.",
      "The faster an object moves, the more energy it has.",
      "In a collision, energy moves from one object to another, and some changes into sound and heat.",
    ],
    hook: {
      text: "Two kids roll the same marble at a tower of dominoes. One rolls it gently. The other gives it a hard push. One tower only wobbles. The other crashes down. What made the difference? Let's find out.",
    },
    teach: [
      {
        title: "What Is Energy?",
        teach:
          "Energy is the ability to make something move or change. You cannot hold energy in your hand, but you can see what it does. A hot stove has energy. A stretched rubber band has energy waiting to be let go. Energy shows up in many forms: motion, sound, light, heat and electricity. Anything that is moving has motion energy. A rolling ball, a swinging bat and a flowing river all have it. Something sitting perfectly still has no motion energy right now. What do you notice around you that has motion energy?",
        visual: {
          type: "flip",
          cards: [
            { front: "Energy", back: "The ability to make something move or change." },
            { front: "Motion energy", back: "The energy of anything that is moving, like a rolling ball or a flowing river." },
            { front: "Sound", back: "Energy carried by vibrations, like the bang of a drum." },
            { front: "Heat", back: "Energy that makes things warmer, like a stove warming a pot." },
            { front: "Light", back: "Energy from the Sun, a lamp or a flame." },
            { front: "Electricity", back: "Energy moving through wires that runs lights, fans and toasters." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each thing: does it have motion energy right now?",
          buckets: ["Moving: has motion energy", "Still: no motion energy right now"],
          items: [
            { text: "A rolling skateboard", bucket: 0 },
            { text: "A leaf falling from a tree", bucket: 0 },
            { text: "A flowing river", bucket: 0 },
            { text: "A spinning fan", bucket: 0 },
            { text: "A book sitting on a shelf", bucket: 1 },
            { text: "A parked car", bucket: 1 },
            { text: "A rock resting on the ground", bucket: 1 },
          ],
          hint: "Ask: is it moving right now? Only moving things have motion energy.",
          mistakes: [
            { match: "Parked car sorted as moving", coach: "A parked car could move later, but right now it is still. It has no motion energy until it starts rolling." },
            { match: "Falling leaf sorted as still", coach: "A falling leaf is moving down through the air, so it has motion energy." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which has motion energy right now?",
          choices: ["A parked bike", "A rolling bowling ball", "A pillow on a bed", "A closed door"],
          answer: 1,
          why: "The bowling ball is moving, so it has motion energy.",
          hints: [
            "A parked bike is not moving, so it has no motion energy right now.",
            "",
            "A pillow resting on a bed is still. Look for something that is moving.",
            "A closed door is not moving. It would only have motion energy while it swings.",
          ],
        },
        approaches: {
          analogy:
            "Energy is like money for making things happen. You can't see it sitting in a wallet, but when you spend it, things move, light up or warm up.",
          example:
            "A soccer ball sitting on the grass has no motion energy. Kick it, and now it rolls across the field. Your leg gave the ball energy, and the ball shows it by moving.",
          simpler: {
            q: "Is a ball rolling across the floor moving?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Its position keeps changing, so it is moving and has motion energy.",
            hints: ["", "Watch the ball. It is in a new spot every moment, so it is moving."],
          },
        },
      },
      {
        title: "Faster Means More Energy",
        teach:
          "Here is a big idea: the faster an object moves, the more energy it has. Try this. Roll a marble down a ramp into a paper cup and see how far the cup slides. Now start the marble higher up the ramp. It reaches the bottom moving faster, and the cup slides farther. The faster marble carried more energy and passed more of it to the cup. Scientists look for evidence like this. How far did something get pushed? How loud was the bang? How deep a dent did it leave in clay? More speed gives bigger results.",
        visual: { type: "ramp" },
        probe: {
          type: "cloze",
          text: "A marble started high on a ramp is moving {0} at the bottom than one started low. It pushes the cup {1}, because it has {2} energy.",
          blanks: [{ answers: ["faster"] }, { answers: ["farther", "further"] }, { answers: ["more"] }],
          bank: ["faster", "slower", "farther", "less", "more", "shorter"],
          hint: "Starting higher makes the marble go faster. Faster means more energy, and more energy means a bigger push.",
          mistakes: [
            { match: "slower", coach: "A marble rolling down from higher up speeds up for longer, so it is faster at the bottom." },
            { match: "less", coach: "The faster marble has more energy, not less. That's why the cup slides farther." },
          ],
          seconds: 35,
        },
        think: {
          q: "Two toy cars roll into a block. Car A is going fast. Car B is going slowly. Which pushes the block farther?",
          choices: ["Car B, the slow one", "Car A, the fast one", "They push it the same distance"],
          answer: 1,
          why: "The faster car has more energy, so it gives the block a bigger push.",
          hints: [
            "The slow car has less energy to give the block, so it pushes it less.",
            "",
            "Speed matters. The cars are moving at different speeds, so they carry different amounts of energy.",
          ],
        },
        approaches: {
          analogy:
            "Think of tossing a snowball at a wall. A soft toss just plops. A hard throw goes splat and leaves a big mark. More speed, more energy, bigger mark.",
          example:
            "Start a marble near the bottom of a ramp, and it nudges a paper cup a little. Start it at the very top, and it reaches the bottom much faster and shoves the cup a long way across the table.",
          simpler: {
            q: "Which ball is moving faster?",
            choices: ["A ball that is gently rolled", "A ball that is thrown hard"],
            answer: 1,
            why: "A hard throw makes the ball move faster.",
            hints: ["A gentle roll is slow. Think about which one zooms.", ""],
          },
        },
      },
      {
        title: "When Things Collide",
        teach:
          "A collision is when moving objects bump into each other. In a collision, energy moves from one object to another. When a bowling ball hits the pins, it gives some of its energy to the pins, and they go flying. The bowling ball slows down, because it handed energy away. Not all the energy goes into motion. Some turns into sound, the crash you hear. Some turns into a little bit of heat. Energy is not destroyed in a collision. It moves to other objects or changes form. That is why engineers design bumpers and helmets that soak up the energy of a crash.",
        visual: {
          type: "hotspots",
          title: "A bowling ball collision",
          center: "💥 Collision",
          spots: [
            { label: "Bowling ball", icon: "🎳", detail: "It slows down after the crash, because it gave some of its energy away." },
            { label: "Pins", icon: "🎯", detail: "They fly in all directions, because they got motion energy from the ball." },
            { label: "Sound", icon: "🔊", detail: "Some energy becomes the loud crash you hear." },
            { label: "Heat", icon: "🔥", detail: "A tiny bit of energy warms up the ball and the pins." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the bowling collision in order.",
          steps: [
            "The bowling ball rolls fast down the lane",
            "The ball hits the first pin",
            "Energy moves from the ball into the pins",
            "The pins fly and you hear a crash",
            "The ball rolls on, slower than before",
          ],
          hint: "Start with the ball rolling. The energy moves at the moment of the hit, and the ball is slower afterward.",
          seconds: 35,
        },
        think: {
          q: "After a bowling ball knocks over pins, why is it moving slower?",
          choices: ["It gave some of its energy to the pins", "It ran out of air", "The pins are magnets", "Its energy was destroyed"],
          answer: 0,
          why: "In a collision, energy moves from one object to another. The ball handed some of its energy to the pins.",
          hints: [
            "",
            "A bowling ball is solid. It has no air to run out of. Think about where its energy went.",
            "Bowling pins are wood and plastic, not magnets. Think about the energy moving in the crash.",
            "Energy is never destroyed. It moves to other objects or changes into sound and heat.",
          ],
        },
        approaches: {
          analogy:
            "A collision is like pouring water from your bucket into a friend's bucket. Most goes into their bucket, a little splashes on the ground, but none of it vanishes.",
          example:
            "Roll one marble into a marble that is sitting still. The first marble slows down or stops, and the second one rolls away. You hear a click. Energy moved from marble one into marble two, and a little became sound.",
          simpler: {
            q: "A moving marble hits a marble that is sitting still. What happens to the still one?",
            choices: ["It starts to move", "It stays still", "It disappears"],
            answer: 0,
            why: "The moving marble gives it energy, so it starts to roll.",
            hints: ["", "The hit gives the still marble a push. Think about what a push does.", "Marbles don't disappear. Energy moves into the still marble and it rolls."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Each pair of clues comes from the same ball rolled at two speeds. Sort each clue: more energy or less energy?",
      buckets: ["More energy", "Less energy"],
      items: [
        { text: "A loud crash", bucket: 0 },
        { text: "A quiet tap", bucket: 1 },
        { text: "A deep dent in clay", bucket: 0 },
        { text: "A shallow dent in clay", bucket: 1 },
        { text: "Pins flying far", bucket: 0 },
        { text: "A pin that only wobbles", bucket: 1 },
        { text: "A cup pushed across the whole table", bucket: 0 },
        { text: "A cup nudged a tiny bit", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain to a friend why a fast ball knocks down more blocks than a slow ball, and where the ball's energy goes when it hits.",
      keyPoints: [
        "Faster objects have more energy",
        "Energy moves from the ball to the blocks in a collision",
        "Some energy changes into sound and heat",
        "The ball slows down after giving energy away",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Energy is the ability to make things {0} or change. The faster an object moves, the {1} energy it has.",
        blanks: [{ answers: ["move"] }, { answers: ["more"] }],
        bank: ["move", "more", "less", "sleep", "smaller"],
        hint: "Think of a kicked ball: energy makes it move, and a harder kick means more speed and more energy.",
        mistakes: [{ match: "less", coach: "A fast ball knocks down more blocks, so faster means more energy." }],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each collision to where some of the energy went.",
        pairs: [
          { left: "A hammer hits a nail", right: "The nail moves into the wood" },
          { left: "You clap your hands", right: "You hear a sound" },
          { left: "You rub your hands together fast", right: "Your hands get warm" },
          { left: "A cue ball hits another pool ball", right: "The other ball rolls away" },
        ],
        hint: "Energy can go into motion, sound or heat. Which one fits each collision best?",
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build the big idea about collisions.",
        tiles: ["In a collision,", "energy moves", "from one object", "to another."],
        distractors: ["and disappears forever."],
        hint: "Energy is never destroyed. It moves from one object to another.",
        seconds: 25,
      },
      {
        type: "number",
        prompt: "Maya rolls the same marble down a ramp from three starting heights: 10 cm, 20 cm and 40 cm. From which height, in cm, will it hit the cup the fastest?",
        answer: 40,
        unit: "cm",
        hint: "The higher the start, the faster the marble is going at the bottom.",
        mistakes: [{ match: "10", coach: "From 10 cm the marble barely speeds up. Starting higher gives it more speed." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What is energy?",
        choices: ["A kind of rock", "The ability to make things move or change", "Another word for speed"],
        answer: 1,
        why: "Energy is the ability to make something move or change.",
      },
      {
        q: "Two identical balls roll into a stack of cups. Which knocks down more cups?",
        choices: ["The slower ball", "They knock down the same number", "The faster ball", "Neither one"],
        answer: 2,
        why: "The faster ball has more energy to pass on to the cups.",
      },
      {
        q: "In a collision, what happens to energy?",
        choices: ["It moves to other objects or changes into sound and heat", "It is destroyed", "It always doubles"],
        answer: 0,
        why: "Energy is not destroyed. It moves to other objects or changes form.",
      },
      {
        q: "Which is good evidence that a moving ball had a lot of energy?",
        choices: ["It is painted red", "It is round", "It is sitting on a shelf", "It left a deep dent in clay"],
        answer: 3,
        why: "A deep dent shows the ball hit hard, which takes a lot of energy.",
      },
    ],
    task: {
      kind: "lab",
      prompt: "Ramp test: lean a ruler or a stiff piece of cardboard on a stack of books to make a ramp, and put a paper cup on its side at the bottom. Roll a marble from a low, a middle and a high spot on the ramp. Measure how far the cup slides each time, try each height three times, and record your results in a table. What pattern do you notice?",
      rubric: [
        "Rolled the marble from at least three different heights",
        "Measured and recorded how far the cup moved each time",
        "Kept everything else the same (same marble, same cup, same ramp)",
        "Explained the pattern: higher start, faster marble, more energy, farther push",
      ],
    },
  },

  // 2. How energy travels
  {
    id: "sci-4.energy-transfer",
    title: "Energy on the Move: Sound, Light, Heat and Electricity",
    minutes: 35,
    stage: "grammar",
    standards: ["4-PS3-2", "4-PS3-4", "3-5-ETS1-1"],
    read: [
      "Energy does not stay in one place. It travels from place to place and from object to object. Four of the ways it travels are sound, light, heat and electric current.",
      "Sound is energy carried by vibrations. When you pluck a guitar string, it shakes back and forth very fast. The string pushes on the air, the air passes the shaking along, and the vibrations reach your ear. Put your hand on your throat and hum, and you can feel the vibrations that make your voice. Sound needs something to travel through, like air, water or wood. In outer space there is no air, so sound cannot travel there.",
      "Light carries energy too. Sunlight travels across space to Earth and warms the ground, the oceans and your face. Plants use the energy in sunlight to make their food.",
      "Heat is energy moving from something warmer to something cooler. A metal spoon in hot soup warms up from the bottom to the top. An ice cube in your hand melts because heat moves from your hand into the ice.",
      "Electric current is energy moving through wires. A battery pushes the current around a complete loop called a circuit. Along the way, devices change the electrical energy into other forms. A bulb makes light, a speaker makes sound, a toaster makes heat and a fan's motor makes motion.",
      "Engineers use these ideas to build devices that change energy from one form to another. A solar oven turns sunlight into heat. A windmill turns the motion of the wind into the turning of a grinding stone or a generator. Before they build, engineers write down the problem, what the device must do (the criteria) and the limits they must work within, such as cost, time and materials (the constraints).",
    ].join("\n\n"),
    keyIdeas: [
      "Energy travels from place to place by sound, light, heat and electric current.",
      "Sound is carried by vibrations, and heat always moves from warmer to cooler.",
      "Devices change energy from one form to another, like a bulb turning electricity into light.",
      "Engineers list what a design must do (criteria) and its limits (constraints) before they build.",
    ],
    hook: {
      text: "Close your eyes and listen. A dog barks down the street. Sunlight warms your arm. A lamp clicks on across the room. None of these things touched you, yet energy reached you from each one. How does energy travel?",
    },
    teach: [
      {
        title: "Sound: Energy in Vibrations",
        teach:
          "Sound is energy carried by vibrations. A vibration is a quick back-and-forth shake. Stretch a rubber band over an open box, pluck it, and watch it blur as it shakes. The rubber band pushes on the air next to it. That air pushes on the air next to it, and so on, until the shaking reaches your ear. Your eardrum vibrates too, and your brain hears a twang. Sound can travel through air, water, wood and even metal. But in outer space there is no air, so sound cannot travel there. Astronauts on a spacewalk talk by radio.",
        visual: {
          type: "hotspots",
          title: "How a sound reaches you",
          center: "🔊 Sound",
          spots: [
            { label: "Guitar string", icon: "🎸", detail: "It vibrates, shaking back and forth very fast." },
            { label: "Air", icon: "💨", detail: "The shaking passes from bit of air to bit of air across the room." },
            { label: "Eardrum", icon: "👂", detail: "A thin skin in your ear that starts to vibrate too." },
            { label: "Brain", icon: "🧠", detail: "It turns the message from your ear into the sound you hear." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Can sound travel through it?",
          buckets: ["Sound can travel through it", "Sound cannot travel through it"],
          items: [
            { text: "The air in a room", bucket: 0 },
            { text: "Water in a swimming pool", bucket: 0 },
            { text: "A wooden table", bucket: 0 },
            { text: "A metal railing", bucket: 0 },
            { text: "Empty outer space", bucket: 1 },
            { text: "The empty space between Earth and the Moon", bucket: 1 },
          ],
          hint: "Sound needs stuff to shake: air, water, wood or metal. Where there is nothing at all, there is nothing to carry the vibrations.",
          mistakes: [
            { match: "Outer space sorted as can travel", coach: "Space is nearly empty, with no air to shake. That's why astronauts use radios to talk." },
            { match: "Wood sorted as cannot travel", coach: "Put your ear on a table and tap the far end. You'll hear it clearly. Sound travels well through wood." },
          ],
          seconds: 30,
        },
        think: {
          q: "Why can't you hear sound in outer space?",
          choices: ["Space is too cold", "There is no air to carry the vibrations", "Space is too dark", "Sound is too slow to get anywhere"],
          answer: 1,
          why: "Sound is vibrations passed along through matter. Space has no air to pass them along.",
          hints: [
            "Cold places can still carry sound. You can hear snow crunch in winter. Think about what sound travels through.",
            "",
            "Darkness doesn't stop sound. You can hear in a dark room. Think about what is missing in space.",
            "Sound moves quickly through air. The problem in space is that there is nothing to travel through.",
          ],
        },
        approaches: {
          analogy:
            "Sound moving through air is like a line of dominoes. Each one tips the next, so the push travels down the whole line even though each domino barely moves.",
          example:
            "Put your ear flat on a table and have someone tap the far end with a pencil. You hear it loudly, because the vibrations travel through the wood right to your ear.",
          simpler: {
            q: "What does a guitar string do when it makes a sound?",
            choices: ["It vibrates back and forth", "It stays perfectly still", "It gets longer and longer"],
            answer: 0,
            why: "A plucked string shakes back and forth very fast. That shaking is the vibration that makes sound.",
            hints: ["", "A still string makes no sound. Watch it blur when you pluck it.", "The string stays the same length. It shakes back and forth."],
          },
        },
      },
      {
        title: "Light and Heat",
        teach:
          "Light carries energy too. Sunlight travels about 150 million kilometers across space to reach Earth. When it lands on the ground, the ground gets warm. Stand in the sun and you feel that energy on your skin. Heat is energy that moves from something warmer to something cooler. It always flows that way, never the other way around. Put a metal spoon in a mug of hot cocoa, and soon the handle feels warm. Heat traveled up the spoon. Hold an ice cube, and heat flows from your warm hand into the ice. Your hand feels cold, and the ice melts.",
        visual: {
          type: "compare",
          left: { title: "Light", points: ["Comes from sources like the Sun, a lamp or a flame", "Travels across empty space", "Warms whatever it lands on", "Plants use it to make food"] },
          right: { title: "Heat", points: ["Moves from warmer things to cooler things", "Travels up a spoon in hot cocoa", "Melts an ice cube in your hand", "Stops moving when things are the same temperature"] },
        },
        probe: {
          type: "cloze",
          text: "Heat always moves from {0} things to {1} things. A spoon in hot cocoa gets warm because heat moves {2} the cocoa into the spoon.",
          blanks: [{ answers: ["warmer"] }, { answers: ["cooler"] }, { answers: ["from"] }],
          bank: ["warmer", "cooler", "from", "louder", "darker"],
          hint: "Heat flows like water downhill: from the hot thing to the cold thing.",
          mistakes: [{ match: "louder", coach: "Loudness is about sound. Heat is about warm and cool." }],
          seconds: 30,
        },
        think: {
          q: "You hold an ice cube. Which way does heat move?",
          choices: ["From the ice into your hand", "From your hand into the ice", "Heat does not move at all"],
          answer: 1,
          why: "Heat moves from warmer to cooler. Your hand is warmer than the ice.",
          hints: [
            "Your hand feels cold, but that's because it is losing heat, not gaining it. Which one is warmer?",
            "",
            "The ice melts, so something is giving it energy. Heat is on the move.",
          ],
        },
        approaches: {
          analogy:
            "Heat flowing from warm to cool is like water flowing downhill. It always goes from high to low, until everything is level.",
          example:
            "Pour hot water into a cold metal pot. The water cools a little and the pot warms up, until both are the same temperature. Then the heat stops flowing.",
          simpler: {
            q: "Which is warmer: your hand or an ice cube?",
            choices: ["The ice cube", "Your hand"],
            answer: 1,
            why: "Your body keeps your hand warm. Ice is frozen, so it is much colder.",
            hints: ["Ice is frozen water. It is very cold.", ""],
          },
        },
      },
      {
        title: "Electric Current",
        teach:
          "Electric current is energy moving through a wire. For current to flow, it needs a circuit, a complete loop from the battery, through the device, and back to the battery. If there is a gap anywhere, like a switch turned off, the current stops. Devices change electrical energy into other forms. A light bulb changes it into light, plus some heat. A speaker changes it into sound. A toaster changes it into heat. A fan's motor changes it into motion. Every time you flip a switch on, you close the loop and send energy where you want it.",
        visual: {
          type: "hotspots",
          title: "A simple circuit",
          center: "🔁 Circuit",
          spots: [
            { label: "Battery", icon: "🔋", detail: "Stores energy and pushes current around the loop." },
            { label: "Wire", icon: "〰️", detail: "A path of metal that carries the current." },
            { label: "Switch", icon: "🔘", detail: "Opens or closes a gap in the loop to turn the device off or on." },
            { label: "Bulb", icon: "💡", detail: "Changes electrical energy into light and a little heat." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each device to the main kind of energy it changes electricity into.",
          pairs: [
            { left: "Light bulb", right: "Light" },
            { left: "Speaker", right: "Sound" },
            { left: "Toaster", right: "Heat" },
            { left: "Fan motor", right: "Motion" },
          ],
          hint: "Ask what each device is for. A toaster's job is to make things hot; a fan's job is to spin.",
          seconds: 30,
        },
        think: {
          q: "A flashlight won't turn on. The bulb and battery are fine. What is the most likely problem?",
          choices: ["The circuit has a gap, so current can't flow", "The flashlight is too heavy", "The bulb has too much light in it", "It is daytime"],
          answer: 0,
          why: "Current only flows around a complete loop. A loose wire or broken switch leaves a gap.",
          hints: [
            "",
            "Weight doesn't stop current. Think about the path the current takes.",
            "Bulbs don't fill up with light. They make light only while current flows through them.",
            "Flashlights work in the day too. Think about whether the loop is complete.",
          ],
        },
        approaches: {
          analogy:
            "A circuit is like a toy train track. The train can only keep going if the track makes a full loop. Take out one piece and the train stops.",
          example:
            "Tape a wire from the top of a battery to a small bulb, and another wire from the bulb back to the bottom of the battery. The loop is complete and the bulb lights. Pull one wire off and it goes dark.",
          simpler: {
            q: "Does a circuit need to be a complete loop for current to flow?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Current flows only around a complete loop with no gaps.",
            hints: ["", "Think of a switch: turning it off makes a gap, and the light goes out."],
          },
        },
      },
      {
        title: "Design a Device",
        teach:
          "Engineers build devices that change energy from one form to another. Before they build, they define the problem. What must the device do? Those goals are called criteria. What limits must they work within, like cost, time, size and materials? Those are called constraints. Say you want to warm water using only sunlight. Criteria: the water must get warm in one hour. Constraints: you may use only a cardboard box, foil, plastic wrap and black paper. A solar oven can do the job. Shiny foil reflects sunlight into the box, black paper soaks up the light and turns it into heat, and plastic wrap traps the warm air inside.",
        visual: {
          type: "flip",
          cards: [
            { front: "Criteria", back: "What the design must do. Example: warm a cup of water in one hour." },
            { front: "Constraints", back: "The limits you must work within, like cost, time, size and materials." },
            { front: "Solar oven", back: "Changes light energy from the Sun into heat." },
            { front: "Windmill", back: "Changes the motion of the wind into the turning of a stone or a generator." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "You are designing a solar oven. Sort each item: is it a criterion (a goal) or a constraint (a limit)?",
          buckets: ["Criteria (what it must do)", "Constraints (limits)"],
          items: [
            { text: "Must warm a cup of water in one hour", bucket: 0 },
            { text: "Must hold a full cup without spilling", bucket: 0 },
            { text: "Must melt a pat of butter", bucket: 0 },
            { text: "Can only use cardboard, foil and plastic wrap", bucket: 1 },
            { text: "Must cost less than $5", bucket: 1 },
            { text: "Must be built in one afternoon", bucket: 1 },
          ],
          hint: "Criteria are the jobs the oven must do. Constraints are the limits on how you build it: money, time and materials.",
          seconds: 40,
        },
        think: {
          q: "Which is a constraint for building a solar oven?",
          choices: ["It must warm a hot dog", "It should get hot", "You can spend no more than $5", "It must cook food"],
          answer: 2,
          why: "A spending limit is a constraint. The others are jobs the oven must do, which are criteria.",
          hints: [
            "Warming a hot dog is a job the oven must do. That's a criterion.",
            "Getting hot is the oven's goal. That's a criterion, not a limit.",
            "",
            "Cooking food is a goal, so it is a criterion. Look for a limit on money, time or materials.",
          ],
        },
        approaches: {
          analogy:
            "Criteria and constraints are like a baking challenge. The criteria are 'bake a cake that rises and tastes good.' The constraints are 'only use what's in the pantry and finish in one hour.'",
          example:
            "A windmill design. Criteria: it must lift a paper clip off the table. Constraints: use only paper cups, straws, tape and string, and it must fit on a desk. The blades turn the wind's motion into turning motion that winds up the string.",
          simpler: {
            q: "Which word means the goals a design must meet?",
            choices: ["Constraints", "Criteria"],
            answer: 1,
            why: "Criteria are the goals. Constraints are the limits.",
            hints: ["Constraints are the limits, like money and time. Goals have a different name.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "How is the energy traveling? Sort each example.",
      buckets: ["Sound", "Light", "Heat", "Electric current"],
      items: [
        { text: "A drumbeat heard across the room", bucket: 0 },
        { text: "Thunder rumbling", bucket: 0 },
        { text: "Sunlight shining through a window", bucket: 1 },
        { text: "The glow of a flashlight beam", bucket: 1 },
        { text: "A hot pan warming its handle", bucket: 2 },
        { text: "Warm bathwater warming your feet", bucket: 2 },
        { text: "Power flowing through a lamp's cord", bucket: 3 },
        { text: "A battery running a toy car", bucket: 3 },
      ],
    },
    explain: {
      prompt: "Pick a device at home, like a lamp, a toaster or a fan. Explain how energy gets to it and what kind of energy it changes the electricity into.",
      keyPoints: [
        "Electric current travels through wires in a complete circuit",
        "The device changes electrical energy into another form like light, heat, sound or motion",
        "Energy travels from place to place",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Sound is carried by {0}. It cannot travel through outer space because there is no {1} there.",
        blanks: [{ answers: ["vibrations"] }, { answers: ["air"] }],
        bank: ["vibrations", "air", "light", "magnets", "gravity"],
        hint: "Sound is a back-and-forth shaking that gets passed along through stuff like air.",
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each device to the energy change it makes.",
        pairs: [
          { left: "Solar oven", right: "Sunlight into heat" },
          { left: "Windmill", right: "Wind's motion into turning motion" },
          { left: "Speaker", right: "Electricity into sound" },
          { left: "Flashlight", right: "Battery energy into light" },
        ],
        hint: "Think about what goes in and what comes out of each device.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order for a flashlight lighting up.",
        steps: [
          "The battery stores energy",
          "You press the switch and close the circuit",
          "Current flows through the wire",
          "The bulb changes electrical energy into light",
        ],
        hint: "Nothing flows until the loop is closed. Start with where the energy is stored.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Sound travels about 1 kilometer every 3 seconds. You see lightning, then hear the thunder 6 seconds later. About how many kilometers away is the storm?",
        answer: 2,
        unit: "km",
        hint: "Every 3 seconds of waiting means 1 kilometer. How many groups of 3 seconds are in 6 seconds?",
        mistakes: [{ match: "18", coach: "That multiplies 6 by 3. Instead, count how many groups of 3 seconds fit into 6 seconds." }],
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What carries sound from a drum to your ear?",
        choices: ["Light", "Electricity", "Vibrations passed through the air", "Heat"],
        answer: 2,
        why: "The drum vibrates, the air passes the vibrations along, and they reach your ear.",
      },
      {
        q: "A metal spoon sits in hot soup. What happens?",
        choices: ["Heat moves from the soup into the spoon", "Cold moves from the spoon into the soup and freezes it", "Nothing changes"],
        answer: 0,
        why: "Heat moves from warmer things to cooler things, so the spoon warms up.",
      },
      {
        q: "Why won't a bulb light if one wire is loose?",
        choices: ["The bulb is too bright", "Batteries only work in the dark", "Wires are made of glass", "The circuit is not a complete loop"],
        answer: 3,
        why: "Current only flows around a complete loop. A loose wire makes a gap.",
      },
      {
        q: "You may only use cardboard and foil to build your solar oven. What is that rule called?",
        choices: ["A criterion", "A constraint", "A collision"],
        answer: 1,
        why: "A limit on materials is a constraint.",
      },
    ],
    task: {
      kind: "lab",
      prompt: "Build a sun heater. Write your criteria (for example, warm the water in one hour) and constraints (for example, only a shoebox, foil, black paper and plastic wrap). Put the same amount of water in two cups. Put one inside your foil-lined box on black paper, covered with plastic wrap, and leave the other plain. Set both in the sun for one hour, then compare them with a thermometer. Did your design meet the criteria? What would you improve?",
      rubric: [
        "Wrote down the criteria and constraints before building",
        "Built a device that changes sunlight into heat",
        "Ran a fair test: same water, same time, same sunny spot",
        "Compared results and suggested one improvement",
      ],
    },
  },

  // 3. Waves and seeing
  {
    id: "sci-4.waves",
    title: "Waves and How We See",
    minutes: 30,
    stage: "grammar",
    standards: ["4-PS4-1", "4-PS4-2"],
    read: [
      "Toss a pebble into a still pond and rings spread out across the water. Those rings are waves. A wave is a repeating pattern of motion that carries energy from one place to another.",
      "Here is something surprising. In a water wave, the water itself does not travel across the pond. Watch a leaf floating on the water as a wave passes. The leaf bobs up and down and settles back in nearly the same spot. The wave moved on, but the water mostly stayed. What traveled was the energy.",
      "Waves have parts we can measure. The high points are called crests and the low points are called troughs. The height of a wave from its calm middle line up to its crest is its amplitude. The distance from one crest to the next crest is its wavelength. A wave with a bigger amplitude carries more energy. A gentle ripple barely rocks a toy boat, but tall storm waves can move sand and rocks along a beach.",
      "Sound and light travel as waves too, though we cannot see them the way we see water waves.",
      "How do we see things? Light comes from sources such as the Sun, a lamp or a flame. Most things around you do not make their own light. Instead, light bounces, or reflects, off them. Some of that reflected light enters your eye through the pupil, the dark circle in the middle. Your eye sends a message to your brain, and you see the object. In a room with no light at all, you cannot see anything, not even your own hand, because there is no light to reflect into your eyes.",
    ].join("\n\n"),
    keyIdeas: [
      "A wave is a repeating pattern that carries energy, while the water or rope mostly stays in place.",
      "Amplitude is a wave's height; wavelength is the distance from crest to crest. Bigger amplitude means more energy.",
      "We see objects when light reflects off them and enters our eyes.",
    ],
    hook: {
      text: "Have you ever floated in a pool when someone jumped in at the other end? A moment later, you rose and fell. Nobody touched you. Something traveled across the water and lifted you. What was it?",
    },
    teach: [
      {
        title: "What Is a Wave?",
        teach:
          "A wave is a repeating pattern of motion that carries energy from one place to another. Toss a pebble in a pond and rings ripple outward. Shake one end of a jump rope and a bump travels to the other end. In both cases, energy moves along, but the water or rope mostly stays in place. A leaf on the pond only bobs up and down as the ripples pass under it. Waves can still make objects move. A big wave can lift a boat, and ocean waves push sand along the beach. What do you notice when a wave passes a floating toy?",
        visual: {
          type: "flip",
          cards: [
            { front: "Wave", back: "A repeating pattern of motion that carries energy from place to place." },
            { front: "Crest", back: "The highest point of a wave." },
            { front: "Trough", back: "The lowest point of a wave." },
            { front: "What travels?", back: "The energy travels. The water or rope mostly moves up and down in place." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap every sentence that is true about water waves.",
          sentences: [
            "A wave carries energy from place to place.",
            "A floating leaf bobs up and down as a wave passes.",
            "The water in a wave races all the way across the pond.",
            "Waves can make objects move.",
            "Waves only happen in oceans.",
          ],
          correct: [0, 1, 3],
          hint: "Think of the floating leaf: it bobs but stays put. The energy moves on, not the water.",
          mistakes: [{ match: "The water in a wave races all the way across the pond.", coach: "Watch a floating leaf: it bobs and stays in about the same spot. The energy travels, not the water." }],
          seconds: 40,
        },
        think: {
          q: "A rubber duck floats in a pool. A wave passes. What happens to the duck?",
          choices: ["It rides all the way to the other end", "It bobs up and down and stays near the same spot", "It sinks"],
          answer: 1,
          why: "The wave's energy passes under the duck. The duck and the water mostly move up and down in place.",
          hints: [
            "The wave moves on, but the water under the duck mostly goes up and down, so the duck does too.",
            "",
            "A floating duck rides up and over the wave. It doesn't sink.",
          ],
        },
        approaches: {
          analogy:
            "A wave is like the 'wave' fans do at a stadium. Each person just stands up and sits down in their seat, but the wave zooms all the way around the stadium.",
          example:
            "Tie a ribbon to the middle of a jump rope and lay it on the floor. Shake one end. A bump travels to the far end, but the ribbon only moves up and down. The energy traveled; the rope stayed.",
          simpler: {
            q: "In a stadium wave, do the fans run around the stadium?",
            choices: ["Yes, they run around", "No, they just stand up and sit down"],
            answer: 1,
            why: "Each fan stays in their seat. Only the pattern moves around.",
            hints: ["Picture the fans: they stay in their seats. Only the pattern travels.", ""],
          },
        },
      },
      {
        title: "Amplitude and Wavelength",
        teach:
          "Waves have parts we can measure. The top of a wave is the crest. The bottom is the trough. Amplitude is how tall a wave is, from the calm middle line up to the crest. Wavelength is the distance from one crest to the next crest. A wave with a bigger amplitude carries more energy. A gentle ripple barely rocks a toy boat. A wave with a big amplitude can tip it over. Waves also make patterns. Shake a rope faster, and the crests bunch closer together, so the wavelength gets shorter.",
        visual: {
          type: "hotspots",
          title: "Parts of a wave",
          center: "🌊 Wave",
          spots: [
            { label: "Crest", icon: "⬆️", detail: "The highest point of the wave." },
            { label: "Trough", icon: "⬇️", detail: "The lowest point of the wave." },
            { label: "Amplitude", icon: "📏", detail: "How tall the wave is, from the calm middle line to the crest. Bigger amplitude, more energy." },
            { label: "Wavelength", icon: "↔️", detail: "The distance from one crest to the next crest." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each wave word to what it means.",
          pairs: [
            { left: "Crest", right: "The highest point of a wave" },
            { left: "Trough", right: "The lowest point of a wave" },
            { left: "Amplitude", right: "How tall the wave is from the middle line" },
            { left: "Wavelength", right: "The distance from one crest to the next" },
          ],
          hint: "Crest is the top, trough is the bottom. Amplitude is about height; wavelength is about distance along the wave.",
          seconds: 35,
        },
        think: {
          q: "Which wave carries more energy?",
          choices: ["A wave with a big amplitude", "A wave with a small amplitude", "They always carry the same energy"],
          answer: 0,
          why: "A taller wave, with a bigger amplitude, carries more energy.",
          hints: [
            "",
            "A small ripple barely rocks a toy boat. Which wave could tip it over?",
            "Waves can be gentle or powerful. Their height tells you about their energy.",
          ],
        },
        approaches: {
          analogy:
            "Amplitude is like how hard you shake a jump rope. A big shake makes tall waves and takes more energy from your arm.",
          example:
            "A wave has crests 2 meters apart, so its wavelength is 2 meters. Its crest rises 1 meter above the calm water, so its amplitude is 1 meter.",
          simpler: {
            q: "What is the top of a wave called?",
            choices: ["The crest", "The trough"],
            answer: 0,
            why: "The crest is the top. The trough is the bottom.",
            hints: ["", "The trough is the low point. The top has a different name."],
          },
        },
      },
      {
        title: "How We See",
        teach:
          "Light travels as waves too, and it is how we see. Light comes from sources like the Sun, a lamp or a candle flame. Most objects, like a book or a tree, do not make their own light. Light from a source hits the object and reflects, or bounces off. Some of the bounced light travels into your eye through the pupil, the dark opening in the middle. Your eye sends a message to your brain, and you see the book. In a room with no light at all, you see nothing. A mirror is very smooth, so it reflects light evenly, and you see a clear picture of yourself.",
        visual: {
          type: "hotspots",
          title: "How you see a book",
          center: "👁️ Seeing",
          spots: [
            { label: "Light source", icon: "💡", detail: "A lamp or the Sun gives off light." },
            { label: "Book", icon: "📕", detail: "It makes no light of its own. Light bounces off it." },
            { label: "Pupil", icon: "⚫", detail: "The dark opening in your eye that lets the reflected light in." },
            { label: "Brain", icon: "🧠", detail: "Your eye sends a message, and your brain tells you what you see." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps of seeing a book in order.",
          steps: [
            "Light leaves a lamp",
            "The light hits a book",
            "The light reflects off the book",
            "The reflected light enters your eye",
            "Your brain tells you it's a book",
          ],
          hint: "Follow the light: it starts at the source, bounces off the book, then goes into your eye.",
          seconds: 35,
        },
        think: {
          q: "Why can't you see a toy in a completely dark closet?",
          choices: ["The toy disappears in the dark", "Toys can't be seen in closets", "Your eyes stop working at night", "No light is bouncing off the toy into your eyes"],
          answer: 3,
          why: "We see things when light reflects off them into our eyes. With no light, there is nothing to reflect.",
          hints: [
            "The toy is still there. Turn on a light and you'll see it. Think about what light does.",
            "Open the door and you can see the toy fine. What changed? Light came in.",
            "Your eyes work fine in the dark; they just need light to bounce into them.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Seeing is like playing catch. The lamp throws the light, the object bounces it, and your eye catches it. No throw, no catch, no seeing.",
          example:
            "At night you point a flashlight at a cat. Light from the flashlight hits the cat, bounces off its fur, and some enters your eyes. Now you can see the cat.",
          simpler: {
            q: "Does a book make its own light?",
            choices: ["Yes, it glows", "No, light bounces off it"],
            answer: 1,
            why: "A book makes no light. We see it because light reflects off it.",
            hints: ["Turn off every light and the book can't be seen, so it isn't glowing on its own.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Does it make its own light, or does light reflect off it?",
      buckets: ["Makes its own light (a source)", "Reflects light"],
      items: [
        { text: "The Sun", bucket: 0 },
        { text: "A lamp", bucket: 0 },
        { text: "A campfire", bucket: 0 },
        { text: "A firefly's glow", bucket: 0 },
        { text: "The Moon", bucket: 1 },
        { text: "A mirror", bucket: 1 },
        { text: "A book", bucket: 1 },
        { text: "Your shirt", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain how you are able to see this screen or a book in front of you. Start with where the light comes from.",
      keyPoints: [
        "Light comes from a source like the Sun or a lamp",
        "Light reflects off the object",
        "The reflected light enters the eye",
        "The eye sends a message to the brain",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "The highest point of a wave is the {0}. The distance from one crest to the next is the {1}. A wave with a bigger {2} carries more energy.",
        blanks: [{ answers: ["crest"] }, { answers: ["wavelength"] }, { answers: ["amplitude"] }],
        bank: ["crest", "wavelength", "amplitude", "trough", "pupil"],
        hint: "Crest is the top. Wavelength is a distance along the wave. Amplitude is the height.",
        mistakes: [{ match: "trough", coach: "The trough is the lowest point. The highest point is the crest." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A wave on a rope has crests at 0 cm, 40 cm, 80 cm and 120 cm. What is its wavelength in cm?",
        answer: 40,
        unit: "cm",
        hint: "Wavelength is the distance from one crest to the very next crest.",
        mistakes: [{ match: "120", coach: "That is the distance across several waves. Measure from one crest to the next one only." }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order for how you see the Moon at night.",
        steps: [
          "The Sun gives off light",
          "Sunlight travels to the Moon",
          "The light reflects off the Moon",
          "The reflected light travels to Earth",
          "The light enters your eye and you see the Moon",
        ],
        hint: "The Moon makes no light of its own. Start with the real light source.",
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build the big idea about seeing.",
        tiles: ["We see objects", "when light", "reflects off them", "into our eyes."],
        distractors: ["when our eyes", "shoot out light"],
        hint: "Light comes to our eyes; our eyes don't send light out.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does a wave carry from place to place?",
        choices: ["Energy", "All the water in the pond", "Sand only"],
        answer: 0,
        why: "A wave carries energy. The water mostly moves up and down in place.",
      },
      {
        q: "Which of these makes its own light?",
        choices: ["The Moon", "A mirror", "A book", "A candle flame"],
        answer: 3,
        why: "A flame is a light source. The Moon, a mirror and a book only reflect light.",
      },
      {
        q: "What is the distance from one crest to the next crest called?",
        choices: ["Amplitude", "Wavelength", "Trough"],
        answer: 1,
        why: "Wavelength is measured from crest to crest.",
      },
      {
        q: "How do you see a tree in the park?",
        choices: ["Your eyes shoot out beams", "The tree glows by itself", "Sunlight reflects off the tree into your eyes", "Sound bounces off the tree"],
        answer: 2,
        why: "Light from the Sun bounces off the tree and enters your eyes.",
      },
    ],
    task: {
      kind: "lab",
      prompt: "Make a wave tank: fill a baking pan halfway with water and float a small piece of cork or paper in the middle. Tap the water at one end gently, then harder. Watch the float closely. Draw what the float did and what the waves looked like each time. Did the float travel across the pan? Which taps made taller waves?",
      rubric: [
        "Made both small and big waves",
        "Observed that the float bobbed up and down instead of traveling across",
        "Noticed that harder taps made waves with bigger amplitude",
        "Drew and labeled crests, troughs or wavelength",
      ],
    },
  },

  // 4. Codes and patterns
  {
    id: "sci-4.codes",
    title: "Sending Messages with Patterns",
    minutes: 30,
    stage: "logic",
    standards: ["4-PS4-3", "3-5-ETS1-2", "3-5-ETS1-3"],
    read: [
      "People have always needed to send messages over long distances. Long ago, they used smoke signals, drum beats and flashing mirrors. Each one works the same way: a pattern stands for information.",
      "In the 1830s and 1840s, an American painter and inventor named Samuel Morse worked with partners to build the electric telegraph. Pulses of electricity traveled along a wire from one city to another. Short pulses were dots and long pulses were dashes. In Morse code, each letter has its own pattern. The letter E is a single dot. The letter T is a single dash. The call for help, SOS, is three dots, three dashes and three dots. In 1844, Morse sent a famous message by telegraph from Washington, D.C., to Baltimore, about 40 miles away, in moments.",
      "Today, computers and phones send information with an even simpler code: just two signals, written as 1 and 0. A pattern of ones and zeros can stand for a letter, a number, a color in a photo or a sound in a song. Phones send these patterns through the air as radio waves. Fiber-optic cables send them as flashes of light through thin threads of glass.",
      "Engineers often compare different ways to solve the same problem. Suppose you want to send a message to a friend across a big field. You could use a flashlight, a whistle or flags. Which works best? It depends. A flashlight is easy to see at night but hard to see in bright sun. A whistle can be heard when trees block your view, but strong wind can carry the sound away. Engineers test each idea fairly, note what fails, and improve the design.",
    ].join("\n\n"),
    keyIdeas: [
      "A pattern can stand for information, but only if the sender and receiver know the code.",
      "Morse code uses dots and dashes; computers use ones and zeros.",
      "Engineers compare several solutions with fair tests that change only one thing at a time.",
    ],
    hook: {
      text: "You are on one hill. Your friend is on another hill, far away. You can't shout loud enough, and you have no phone. But you do have a flashlight. How could you send a message? People solved this problem long ago.",
    },
    teach: [
      {
        title: "Patterns Carry Messages",
        teach:
          "Information is anything you want someone to know: a word, a number, a warning. To send it far away, people turn it into a pattern. Long ago, sailors raised colored flags on their ships. Each flag pattern had a meaning, so ships could talk across the water. Lighthouses flash in their own patterns, so sailors at night can tell which lighthouse they are seeing. A pattern only works if both the sender and the receiver know the code, the rules for what each pattern means. Without the code, a flashing light is just a flashing light.",
        visual: {
          type: "flip",
          cards: [
            { front: "Information", back: "Anything you want someone to know: a word, a number, a warning." },
            { front: "Pattern", back: "Something that repeats in a planned way, like flash-flash-pause." },
            { front: "Code", back: "The rules for what each pattern means. Sender and receiver must both know it." },
            { front: "Signal", back: "The pattern actually being sent: flashes, beeps, flags or pulses." },
          ],
        },
        probe: {
          type: "cloze",
          text: "To send information far away, people turn it into a {0}. It only works if the sender and the receiver both know the {1}.",
          blanks: [{ answers: ["pattern"] }, { answers: ["code"] }],
          bank: ["pattern", "code", "battery", "crest", "rainbow"],
          hint: "A message becomes a pattern, and the rules for reading the pattern are called the code.",
          seconds: 25,
        },
        think: {
          q: "Why must both people know the code?",
          choices: ["So the receiver can figure out what the pattern means", "So the message gets louder", "So the message travels faster", "It doesn't matter at all"],
          answer: 0,
          why: "Without the code, the receiver sees the pattern but can't tell what it means.",
          hints: [
            "",
            "Knowing a code doesn't change how loud a signal is. Think about reading the message.",
            "The code doesn't change speed. It tells you what the pattern means.",
            "Try reading a secret message without the key. It's just a jumble.",
          ],
        },
        approaches: {
          analogy:
            "A code is like a secret handshake. It only means something if both friends learned the same moves.",
          example:
            "Two friends agree: one flash of a flashlight means 'yes' and two flashes mean 'no.' One asks, 'Pizza for dinner?' and sees one flash. The answer is yes.",
          simpler: {
            q: "If one flash means yes and two flashes mean no, what do two flashes mean?",
            choices: ["Yes", "No"],
            answer: 1,
            why: "The code says two flashes mean no.",
            hints: ["One flash means yes. Two flashes mean something else.", ""],
          },
        },
      },
      {
        title: "Morse Code and the Telegraph",
        teach:
          "In the 1840s, Samuel Morse and his partners built the electric telegraph. An operator tapped a key to send pulses of electricity down a long wire. A short tap was a dot. A long tap was a dash. Each letter had its own pattern. E is one dot. T is one dash. A is a dot and then a dash. In 1844, Morse sent a message by wire from Washington, D.C., to Baltimore, about 40 miles, in moments. Before that, the message would have taken hours on horseback. The best-known Morse pattern is SOS: three dots, three dashes, three dots. It means 'Help!'",
        visual: {
          type: "hotspots",
          title: "A few letters in Morse code",
          center: "📡 Morse code",
          spots: [
            { label: "E", icon: "•", detail: "One dot: the shortest letter, because E is used so often in English." },
            { label: "T", icon: "–", detail: "One dash." },
            { label: "A", icon: "• –", detail: "A dot, then a dash." },
            { label: "S", icon: "• • •", detail: "Three dots." },
            { label: "O", icon: "– – –", detail: "Three dashes. So SOS is • • •  – – –  • • •" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each letter to its Morse code.",
          pairs: [
            { left: "E", right: "•" },
            { left: "T", right: "–" },
            { left: "A", right: "• –" },
            { left: "S", right: "• • •" },
            { left: "O", right: "– – –" },
          ],
          hint: "E and T are single marks. S is three dots and O is three dashes.",
          seconds: 40,
        },
        think: {
          q: "In Morse code, S is three dots and O is three dashes. Which pattern spells SOS?",
          choices: ["– – –  • • •  – – –", "• • •  – – –  • • •", "• –  • –  • –"],
          answer: 1,
          why: "S-O-S is dots, then dashes, then dots.",
          hints: [
            "That spells O-S-O. SOS starts and ends with S.",
            "",
            "That pattern repeats A, a dot and a dash. Look for three dots, three dashes, three dots.",
          ],
        },
        approaches: {
          analogy:
            "Morse code is like spelling with a doorbell: short rings and long rings in a pattern everyone agreed on.",
          example:
            "To send the word AT, tap a dot and a dash for A, pause, then one dash for T. Your friend hears short-long, pause, long, and writes AT.",
          simpler: {
            q: "In Morse code, is a short tap a dot or a dash?",
            choices: ["A dot", "A dash"],
            answer: 0,
            why: "Short taps are dots; long taps are dashes.",
            hints: ["", "A dash is the long one. Short taps have the other name."],
          },
        },
      },
      {
        title: "Ones and Zeros",
        teach:
          "Phones and computers use a code with just two signals, written 1 and 0. It is called binary. A 1 might be a pulse of electricity or a flash of light, and a 0 is no pulse. Long strings of ones and zeros can stand for letters, numbers, pictures and songs. A photo on a phone is made of many tiny colored dots, and the color of each dot is saved as ones and zeros. Phones send these patterns through the air as radio waves. Fiber-optic cables send them as flashes of light through glass threads about as thin as a hair.",
        visual: {
          type: "compare",
          left: { title: "Morse code", points: ["Dots and dashes", "Tapped by a person", "Sent as pulses on a telegraph wire", "Each letter has its own pattern"] },
          right: { title: "Binary (computer code)", points: ["Ones and zeros", "Sent by machines, very fast", "Travels as radio waves or flashes of light", "Can stand for letters, numbers, pictures and sounds"] },
        },
        probe: {
          type: "number",
          prompt: "A binary code uses two symbols, 0 and 1. With 1 symbol you can make 2 patterns: 0 and 1. With 2 symbols you can make 4 patterns: 00, 01, 10 and 11. How many different patterns can you make with 3 symbols?",
          answer: 8,
          hint: "List them: 000, 001, 010, 011... Or notice each new symbol doubles the number of patterns.",
          mistakes: [{ match: "6", coach: "Try listing them all: 000, 001, 010, 011, 100, 101, 110, 111. Count again." }],
          seconds: 50,
        },
        think: {
          q: "What two signals does binary code use?",
          choices: ["Dots and dashes", "Red and green flags", "1 and 0", "Drums and bells"],
          answer: 2,
          why: "Binary uses just two signals, written 1 and 0.",
          hints: [
            "Dots and dashes are Morse code. Computers use a different pair.",
            "Flags are an old ship code. Computers use numbers.",
            "",
            "Drums and bells make sound signals. Binary is written with two digits.",
          ],
        },
        approaches: {
          analogy:
            "Binary is like a row of light switches, each one just on or off. With enough switches you can make any pattern you want.",
          example:
            "With 2 switches you can make 4 patterns: off-off, off-on, on-off and on-on. Give each a meaning: stop, go, turn left, turn right. Now you can steer a robot with just two switches.",
          simpler: {
            q: "How many different signals does binary code use?",
            choices: ["Two", "Ten", "Twenty-six"],
            answer: 0,
            why: "Binary uses only two signals: 1 and 0.",
            hints: ["", "Ten is how many digits we count with. Binary uses fewer.", "Twenty-six is the number of letters. Binary uses just a couple of signals."],
          },
        },
      },
      {
        title: "Comparing Solutions",
        teach:
          "Engineers rarely stop at one idea. They come up with several solutions, then test them fairly to compare. Say you need to signal a friend across a big field. A flashlight is easy to see at night, but hard to see on a sunny afternoon. A whistle works when trees block your view, but strong wind can carry the sound away. Flags work in daylight, but not in the dark. A fair test changes only one thing at a time and keeps everything else the same, like the distance and the message. The results show each solution's strengths and weaknesses, and point to what to improve.",
        visual: {
          type: "flip",
          cards: [
            { front: "Flashlight", back: "Easy to see at night. Hard to see in bright sunshine." },
            { front: "Whistle", back: "Heard even when trees block your view. Wind can carry the sound away." },
            { front: "Flags", back: "Easy to read in daylight. Useless in the dark." },
            { front: "Fair test", back: "Change only one thing at a time. Keep the distance, message and helper the same." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "You are comparing a flashlight, a whistle and flags. Sort each plan: fair test or not a fair test?",
          buckets: ["Fair test", "Not a fair test"],
          items: [
            { text: "Send the same message from the same distance with each tool", bucket: 0 },
            { text: "Use the same helper to read every signal", bucket: 0 },
            { text: "Time each method with the same stopwatch", bucket: 0 },
            { text: "Test the flashlight at night and the flags at noon", bucket: 1 },
            { text: "Stand closer for the whistle than for the flags", bucket: 1 },
            { text: "Send a short word with one tool and a long sentence with another", bucket: 1 },
          ],
          hint: "In a fair test, the only thing that changes is the tool. Everything else stays the same.",
          seconds: 40,
        },
        think: {
          q: "You want to know whether flags or a flashlight is easier to read from 50 steps away in daylight. Which test is fair?",
          choices: [
            "Test the flashlight at 20 steps and the flags at 50 steps",
            "Test both at 50 steps, in daylight, with the same message",
            "Test the flags in the rain and the flashlight on a sunny day",
          ],
          answer: 1,
          why: "Only the tool changes. Distance, light and message all stay the same.",
          hints: [
            "The distances are different, so you can't tell which tool is really better.",
            "",
            "The weather is different, so the test isn't fair to both tools.",
          ],
        },
        approaches: {
          analogy:
            "A fair test is like a fair race: everyone starts at the same line and runs the same distance, so the winner really is the fastest.",
          example:
            "Kai tests flags and a flashlight from 50 steps at noon, sending the word CAT with each. His friend reads the flags right every time but misses the flashlight three times. Flags win in daylight, so Kai's next idea is a brighter flashlight.",
          simpler: {
            q: "In a fair test, how many things do you change at once?",
            choices: ["Just one", "As many as you like"],
            answer: 0,
            why: "Change one thing at a time so you know what caused the difference.",
            hints: ["", "If you change lots of things, you can't tell which one made the difference."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the engineer's steps in order for designing a way to signal a friend across a field.",
      steps: [
        "Define the problem: send a message across the field",
        "Brainstorm several solutions",
        "Build and test each one fairly",
        "Compare the results",
        "Improve the best design and test it again",
      ],
    },
    explain: {
      prompt: "Explain how a pattern, like Morse code or flashlight blinks, can carry a message, and how you would test which signal works best.",
      keyPoints: [
        "A pattern stands for information",
        "The sender and receiver must know the same code",
        "Compare different solutions",
        "A fair test changes only one thing at a time",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "In Morse code, letters are made of dots and {0}. Computers use a code of ones and {1}.",
        blanks: [{ answers: ["dashes"] }, { answers: ["zeros", "zeroes"] }],
        bank: ["dashes", "zeros", "circles", "twos", "colors"],
        hint: "Morse code: short and long. Binary: 1 and 0.",
        seconds: 25,
      },
      {
        type: "number",
        prompt: "Each extra binary symbol doubles the number of patterns: 1 symbol makes 2, 2 symbols make 4, 3 symbols make 8. How many patterns can 4 symbols make?",
        answer: 16,
        hint: "Double the number for 3 symbols.",
        mistakes: [{ match: "12", coach: "That adds 4. Each new symbol doubles the count, so multiply 8 by 2." }],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Sort each signal by the sense the receiver uses.",
        buckets: ["Seeing (light)", "Hearing (sound)"],
        items: [
          { text: "Flashlight blinks", bucket: 0 },
          { text: "Ship flags", bucket: 0 },
          { text: "Lighthouse flashes", bucket: 0 },
          { text: "Drumbeats", bucket: 1 },
          { text: "Whistle blasts", bucket: 1 },
          { text: "A ship's foghorn", bucket: 1 },
        ],
        hint: "Would you look for it or listen for it?",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the rule that makes any code work.",
        tiles: ["A code works", "only when the sender", "and the receiver", "know what each pattern means."],
        distractors: ["shout very loudly."],
        hint: "Both people need to share the same rules.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What did Samuel Morse's telegraph send along a wire?",
        choices: ["Letters on paper", "Water", "Sound waves", "Pulses of electricity"],
        answer: 3,
        why: "Short and long pulses of electricity traveled along the wire as dots and dashes.",
      },
      {
        q: "Why is a flashlight a poor choice for signaling on a sunny afternoon?",
        choices: ["Flashlights are too heavy", "Bright sunlight makes the flashes hard to see", "Flashlights only work underwater"],
        answer: 1,
        why: "In bright sun, a flashlight's flashes are hard to see from far away.",
      },
      {
        q: "What does binary code use to stand for information?",
        choices: ["Dots and dashes", "Smoke puffs", "Ones and zeros", "Colored flags"],
        answer: 2,
        why: "Computers and phones use patterns of 1s and 0s.",
      },
      {
        q: "Kai tests two signals but stands closer for one of them. What is wrong with his test?",
        choices: ["He changed more than one thing, so it isn't fair", "Nothing is wrong", "He should have used three signals"],
        answer: 0,
        why: "A fair test changes only one thing. Different distances spoil the comparison.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Invent a code. Make up a flashlight or whistle code for at least five words (for example: yes, no, come here, dinner, help). Write your code on a card for a family member. Then send three messages from across the yard or a large room, once with a flashlight and once with a whistle or claps. Record how many messages were read correctly each way, and decide which method worked better and why.",
      rubric: [
        "Created a clear code for at least five words",
        "Shared the code with the receiver before sending",
        "Tested two methods fairly (same messages, same distance)",
        "Recorded results and explained which method worked better and how to improve it",
      ],
    },
  },

  // 5. Structures and senses
  {
    id: "sci-4.structures",
    title: "Built to Survive: Structures and Senses",
    minutes: 35,
    stage: "logic",
    standards: ["4-LS1-1", "4-LS1-2"],
    read: [
      "Every plant and animal is built with parts that help it survive, grow, behave and make more of its kind. Scientists call these parts structures. Some are external, on the outside where you can see them. Others are internal, hidden inside.",
      "Look at a plant. Its roots soak up water and minerals from the soil and hold the plant in place. Its stem holds the plant up and carries water from the roots to the leaves. Its leaves capture sunlight to make food. Its flowers make seeds, which grow into new plants. Some plants have structures for protection, like the thorns on a rose stem or the sharp spines on a cactus.",
      "Animals have structures for every job too. A turtle's hard shell protects it. An eagle's sharp talons grab food, and its hooked beak tears it. A fish's gills take oxygen out of the water. Inside, animals have a heart that pumps blood, lungs or gills for breathing, a stomach to break down food and, in many animals, a skeleton to hold the body up.",
      "Animals also have senses that gather information: eyes, ears, nose, tongue and skin. Special cells called receptors notice light, sound, smells, tastes and touch. The information travels along nerves to the brain. The brain makes sense of it and decides what to do. A rabbit hears a twig snap, its brain signals danger, and it dashes for its burrow. Animals can also remember. A dog learns the sound of its food bag rattling and comes running.",
      "You work the same way. When you touch something hot, nerves rush the message, and your hand jerks back before you even have time to think about it.",
    ].join("\n\n"),
    keyIdeas: [
      "Plants and animals have external and internal structures that help them survive, grow, behave and reproduce.",
      "Roots, stems, leaves and flowers each do a job; so do shells, talons, gills, hearts and stomachs.",
      "Senses gather information, nerves carry it to the brain, and the brain decides how to respond.",
    ],
    hook: {
      text: "An owl hunts at night. It finds a mouse in the dark, swoops down without a sound, and grabs it. How? Its whole body is built for the job: big eyes, sharp hearing, soft feathers and strong claws. Let's see how living things are built to survive.",
    },
    teach: [
      {
        title: "Plant Structures",
        teach:
          "A plant's parts each have a job. The roots grow down into the soil. They soak up water and minerals and hold the plant in place, even in strong wind. The stem holds the plant up toward the light and carries water from the roots to the leaves. The leaves capture sunlight and use it to make food for the plant. The flowers make seeds, and seeds grow into new plants. Some plants also have structures for protection. A rose has thorns on its stem, and a cactus has sharp spines. What do you notice about the plants near your home?",
        visual: {
          type: "hotspots",
          title: "Parts of a plant",
          center: "🌻 Plant",
          spots: [
            { label: "Roots", icon: "🪴", detail: "Soak up water and minerals, and hold the plant in place." },
            { label: "Stem", icon: "🌿", detail: "Holds the plant up and carries water to the leaves." },
            { label: "Leaves", icon: "🍃", detail: "Capture sunlight to make food for the plant." },
            { label: "Flower", icon: "🌸", detail: "Makes seeds that grow into new plants." },
            { label: "Thorns and spines", icon: "🌵", detail: "Protect the plant from hungry animals." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each plant structure to its job.",
          pairs: [
            { left: "Roots", right: "Soak up water and hold the plant in place" },
            { left: "Stem", right: "Holds the plant up and carries water" },
            { left: "Leaves", right: "Use sunlight to make food" },
            { left: "Flowers", right: "Make seeds for new plants" },
            { left: "Thorns", right: "Protect the plant from hungry animals" },
          ],
          hint: "Start with where each part is: roots underground, stem in the middle, leaves catching sun, flowers on top.",
          seconds: 45,
        },
        think: {
          q: "Which plant part makes food using sunlight?",
          choices: ["Roots", "Leaves", "Flowers", "Thorns"],
          answer: 1,
          why: "Leaves capture sunlight and make food for the plant.",
          hints: [
            "Roots are underground, where there is no sunlight. They soak up water.",
            "",
            "Flowers make seeds. Look for the part that catches the sun.",
            "Thorns protect the plant. They don't make food.",
          ],
        },
        approaches: {
          analogy:
            "A plant is like a small factory. The roots are the delivery trucks bringing in water, the stem is the hallway, the leaves are the kitchen that makes the food, and the flowers start the next factory.",
          example:
            "Put a white carnation in a cup of water with blue food coloring. In a day or two, the petals turn bluish, because the stem carried the colored water all the way up to the flower.",
          simpler: {
            q: "Which part of a plant usually grows under the ground?",
            choices: ["Roots", "Leaves"],
            answer: 0,
            why: "Roots grow down into the soil.",
            hints: ["", "Leaves reach up toward the sunlight. Look lower."],
          },
        },
      },
      {
        title: "Animal Structures, Inside and Out",
        teach:
          "Animals have structures too, outside and inside. External structures are the ones you can see. A turtle's hard shell protects its soft body. An eagle's sharp talons grab food, and its hooked beak tears it. A fish's gills take oxygen from the water, and its fins help it steer. A porcupine's quills keep enemies away. Internal structures are hidden inside. The heart pumps blood all around the body. The lungs take in air. The stomach breaks down food. The skeleton holds the body up and protects soft parts, like the skull protecting the brain. Some structures help with making more of their kind: a bird's egg has a hard shell that protects the chick growing inside.",
        visual: {
          type: "compare",
          left: { title: "External (outside)", points: ["Turtle shell: protection", "Eagle talons and beak: catching and eating food", "Fish fins: steering", "Porcupine quills: keeping enemies away"] },
          right: { title: "Internal (inside)", points: ["Heart: pumps blood", "Lungs: take in air", "Stomach: breaks down food", "Skeleton: holds the body up and protects soft parts"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each animal structure: external or internal?",
          buckets: ["External (outside)", "Internal (inside)"],
          items: [
            { text: "A turtle's shell", bucket: 0 },
            { text: "An eagle's talons", bucket: 0 },
            { text: "A porcupine's quills", bucket: 0 },
            { text: "A fish's fins", bucket: 0 },
            { text: "A dog's heart", bucket: 1 },
            { text: "A horse's lungs", bucket: 1 },
            { text: "A cow's stomach", bucket: 1 },
            { text: "A cat's skull", bucket: 1 },
          ],
          hint: "Could you see it from the outside if the animal walked by? Then it's external.",
          seconds: 40,
        },
        think: {
          q: "What job does a turtle's shell do?",
          choices: ["Helps it breathe", "Pumps its blood", "Protects its soft body", "Helps it see"],
          answer: 2,
          why: "The hard shell is armor that protects the turtle's soft body.",
          hints: [
            "Turtles breathe with lungs inside the body, not with their shells.",
            "The heart pumps blood. The shell is on the outside.",
            "",
            "Turtles see with their eyes. Think about what a hard covering is good for.",
          ],
        },
        approaches: {
          analogy:
            "An animal's body is like a well-packed backpack: tools clipped on the outside for grabbing and protecting, and the most important machines tucked safely inside.",
          example:
            "A duck has webbed feet that paddle like oars and oily feathers that keep it dry, both external. Inside, its lungs breathe air, its heart pumps blood and its stomach breaks down the plants and bugs it eats.",
          simpler: {
            q: "Is your heart inside or outside your body?",
            choices: ["Inside", "Outside"],
            answer: 0,
            why: "Your heart is an internal structure, safe inside your chest.",
            hints: ["", "You can feel your heartbeat, but you can't see your heart. It's hidden."],
          },
        },
      },
      {
        title: "Senses Send Messages",
        teach:
          "Animals gather information with their senses: eyes, ears, nose, tongue and skin. Inside these sense organs are special cells called receptors. They notice light, sound, smells, tastes and touch. The information travels along nerves to the brain. The brain makes sense of it and decides what to do, then sends messages to the muscles. A rabbit hears a twig snap. Its brain signals danger, and its legs carry it into its burrow. Animals can also remember what they sensed before. A dog learns that the rattle of its food bag means dinner, so it comes running every time.",
        visual: {
          type: "hotspots",
          title: "The senses",
          center: "🧠 Brain",
          spots: [
            { label: "Eyes", icon: "👀", detail: "Receptors notice light and color." },
            { label: "Ears", icon: "👂", detail: "Receptors notice sounds." },
            { label: "Nose", icon: "👃", detail: "Receptors notice smells." },
            { label: "Tongue", icon: "👅", detail: "Receptors notice tastes." },
            { label: "Skin", icon: "✋", detail: "Receptors notice touch, heat, cold and pain." },
            { label: "Nerves", icon: "⚡", detail: "Carry messages between the senses, the brain and the muscles." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps in order: how a rabbit escapes danger.",
          steps: [
            "The rabbit's ears pick up the snap of a twig",
            "Nerves carry the message to its brain",
            "The brain decides there is danger",
            "The brain sends a message to the leg muscles",
            "The rabbit dashes into its burrow",
          ],
          hint: "Sense first, then the message travels to the brain, then the brain tells the body what to do.",
          seconds: 35,
        },
        think: {
          q: "What carries messages from your senses to your brain?",
          choices: ["Nerves", "Bones", "Blood", "Muscles"],
          answer: 0,
          why: "Nerves are the body's message lines between the senses, the brain and the muscles.",
          hints: [
            "",
            "Bones hold you up and protect you. They don't carry messages.",
            "Blood carries food and oxygen around the body, not sense messages.",
            "Muscles move you after the brain sends them a message. Something else carries the message.",
          ],
        },
        approaches: {
          analogy:
            "Your senses are like security cameras, your nerves are the wires, and your brain is the guard watching the screens and deciding what to do.",
          example:
            "A cat smells tuna when the can opens. Its nose sends the message along nerves to its brain. Its brain remembers that this smell means food, so it tells the cat's legs to run to the kitchen.",
          simpler: {
            q: "Which sense organ notices sounds?",
            choices: ["Ears", "Tongue", "Nose"],
            answer: 0,
            why: "Your ears pick up sounds.",
            hints: ["", "Your tongue notices tastes, not sounds.", "Your nose notices smells, not sounds."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What is the main job of each structure?",
      buckets: ["Gathers information (a sense)", "Protects the body", "Helps get food"],
      items: [
        { text: "An owl's large eyes", bucket: 0 },
        { text: "A rabbit's tall ears", bucket: 0 },
        { text: "A dog's nose", bucket: 0 },
        { text: "A turtle's shell", bucket: 1 },
        { text: "A porcupine's quills", bucket: 1 },
        { text: "A rose's thorns", bucket: 1 },
        { text: "An eagle's hooked beak", bucket: 2 },
        { text: "A frog's sticky tongue", bucket: 2 },
        { text: "A hummingbird's long beak", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pick an animal you like. Explain how two of its structures help it survive, and how it uses a sense to notice and respond to something.",
      keyPoints: [
        "Structures help the animal survive",
        "Some structures are external and some are internal",
        "Senses gather information",
        "Nerves carry the message to the brain, which decides how to respond",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Information from the senses travels along {0} to the {1}, which decides how the body should respond.",
        blanks: [{ answers: ["nerves"] }, { answers: ["brain"] }],
        bank: ["nerves", "brain", "roots", "stomach", "shell"],
        hint: "Nerves are the message lines. The brain is the decision maker.",
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each structure to how it helps.",
        pairs: [
          { left: "A fish's gills", right: "Take oxygen from the water" },
          { left: "A duck's webbed feet", right: "Paddle through the water" },
          { left: "A cactus's spines", right: "Keep thirsty animals away" },
          { left: "A heart", right: "Pumps blood around the body" },
        ],
        hint: "Think about where each animal or plant lives and what problem the structure solves.",
        seconds: 35,
      },
      {
        type: "highlight",
        prompt: "Tap the INTERNAL structures of a deer.",
        sentences: ["A deer's heart", "A deer's antlers", "A deer's stomach", "A deer's hooves", "A deer's skeleton"],
        correct: [0, 2, 4],
        hint: "Internal structures are hidden inside the body. You can't see them when a deer walks by.",
        seconds: 25,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order: you touch a hot pan.",
        steps: [
          "Receptors in your skin feel the heat",
          "Nerves rush the message along",
          "Your arm muscles pull your hand away",
          "Later, you remember to use an oven mitt",
        ],
        hint: "The skin senses first, then the message travels, then the body moves. Memory helps you next time.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What do a plant's roots do?",
        choices: ["Make seeds", "Soak up water and hold the plant in place", "Catch sunlight", "Scare away birds"],
        answer: 1,
        why: "Roots take in water and minerals and anchor the plant.",
      },
      {
        q: "Which is an internal structure?",
        choices: ["A lion's stomach", "A lion's mane", "A lion's claws"],
        answer: 0,
        why: "The stomach is hidden inside the body.",
      },
      {
        q: "A dog hears its food bag rattle and runs to the kitchen. What helped it respond?",
        choices: ["Its tail", "Its fur", "Its ears, nerves, brain and memory", "Its teeth"],
        answer: 2,
        why: "The ears sensed the sound, nerves carried the message, and the brain remembered it means food.",
      },
      {
        q: "How do a rose's thorns help it survive?",
        choices: ["They make food", "They soak up water", "They make seeds", "They protect it from animals that would eat it"],
        answer: 3,
        why: "Thorns are a protective structure.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Animal blueprint: pick an animal and draw it large on paper. Label at least three external structures and two internal structures, and next to each write how it helps the animal survive, grow, behave or reproduce. Then add a box showing one way the animal senses something and responds (for example: sees a hawk, runs to hide).",
      rubric: [
        "Labeled at least three external structures with their jobs",
        "Labeled at least two internal structures with their jobs",
        "Showed a sense, the message to the brain, and a response",
        "Facts are accurate for the chosen animal",
      ],
    },
  },

  // 6. Rocks, fossils and Earth's surface
  {
    id: "sci-4.earth-changes",
    title: "Rocks, Fossils and Earth's Changing Surface",
    minutes: 35,
    stage: "logic",
    standards: ["4-ESS1-1", "4-ESS2-1", "4-ESS2-2"],
    read: [
      "The surface of the Earth is always changing, mostly so slowly that we never notice.",
      "Weathering is the breaking down of rock into smaller pieces. Water seeps into cracks in rock. When it freezes, it expands and pushes the cracks wider, a little more each winter. Plant roots grow into cracks and split rocks apart. Wind blasts rock with sand, and rain slowly dissolves some kinds of rock.",
      "Erosion is the moving of those broken bits, like sand, mud and pebbles, from one place to another. Rivers carry sand and mud downstream. Glaciers, huge slow rivers of ice, scrape and carry rocks. Wind blows sand into dunes. Over millions of years, the Colorado River carved the Grand Canyon, about a mile deep, by wearing away rock and carrying it off.",
      "When moving water or wind slows down, it drops the sand and mud it was carrying. Layer after layer piles up. Over a very long time, the bottom layers are pressed and cemented into rock. That is why many cliffs have stripes called layers. In layers that have not been disturbed, the bottom layer was laid down first, so it is the oldest, and the top layer is the youngest.",
      "Fossils are the remains or traces of ancient living things, preserved in rock. They tell us how places have changed. Shells of sea animals are found in rock layers near the rim of the Grand Canyon, far above the river and far from any ocean. That means the land there was once covered by a sea.",
      "Maps show patterns in Earth's features. Many volcanoes and earthquakes happen along a belt around the Pacific Ocean called the Ring of Fire. Mountains form long chains, and deep ocean trenches, like the Mariana Trench, lie along some of the same edges.",
    ].join("\n\n"),
    keyIdeas: [
      "Weathering breaks rock into pieces; erosion moves the pieces away.",
      "In undisturbed rock layers, the bottom layer is the oldest and the top is the youngest.",
      "Fossils show how a place has changed, like sea shells on land that was once under a sea.",
      "Maps show patterns: many volcanoes and earthquakes line up along the Ring of Fire.",
    ],
    hook: {
      text: "Stand at the edge of the Grand Canyon and look down. The walls are striped red, tan and white, and the river at the bottom looks like a thin thread. Near the top, in solid rock, you can find shells of ancient sea animals. How did seashells get up here, so far above the river?",
    },
    teach: [
      {
        title: "Weathering: Breaking Rock",
        teach:
          "Weathering is the breaking down of rock into smaller pieces. It happens in several ways. Rainwater seeps into a crack in a rock. On a freezing night, the water turns to ice. Water expands when it freezes, so the ice pushes the crack a little wider. After many winters, a piece of rock breaks off. Plant roots do something similar. A tiny root grows into a crack, thickens year after year, and splits the rock. Wind blasts rock with sand, and rain slowly dissolves some kinds of rock, like limestone. What do you notice about old sidewalks near trees?",
        visual: {
          type: "flip",
          cards: [
            { front: "Weathering", back: "The breaking down of rock into smaller pieces." },
            { front: "Ice wedging", back: "Water freezes in a crack, expands and pushes the crack wider." },
            { front: "Root wedging", back: "A growing root pushes into a crack and splits the rock." },
            { front: "Wind and rain", back: "Blowing sand scratches rock away, and rain slowly dissolves some rocks." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps of ice breaking a rock in order.",
          steps: [
            "Rainwater seeps into a crack in a rock",
            "The night turns freezing cold",
            "The water freezes into ice and expands",
            "The ice pushes the crack wider",
            "After many winters, a piece of rock breaks off",
          ],
          hint: "The water has to get into the crack before it can freeze. The rock breaks only at the very end.",
          seconds: 35,
        },
        think: {
          q: "How does freezing water break rock?",
          choices: ["Ice is heavier than rock", "Water expands as it freezes and pushes cracks wider", "Ice melts the rock", "Cold air dissolves rock"],
          answer: 1,
          why: "Water takes up more space as ice, so it pushes on the sides of the crack.",
          hints: [
            "Ice is actually lighter than rock. Think about what happens to water's size when it freezes.",
            "",
            "Ice is cold. It doesn't melt rock. Think about ice growing in a crack.",
            "Cold air doesn't dissolve rock. Look at what the water does when it freezes.",
          ],
        },
        approaches: {
          analogy:
            "Ice in a crack works like a wedge. Each winter it pushes the crack apart a tiny bit more, the way a doorstop pushed harder and harder would spread a gap.",
          example:
            "Fill a plastic cup to the very top with water and put it in the freezer. The next day the ice bulges up above the rim, because water takes up more space when it freezes.",
          simpler: {
            q: "When water freezes, does it take up more space or less space?",
            choices: ["More space", "Less space"],
            answer: 0,
            why: "Water expands as it freezes. That's why ice cubes bulge on top.",
            hints: ["", "Look at the top of a frozen ice cube tray. The ice bulges up."],
          },
        },
      },
      {
        title: "Erosion: Moving Rock",
        teach:
          "Erosion is the moving of broken rock, like sand, mud and pebbles, from one place to another. Rivers are strong movers. They carry sand and mud downstream, and fast rivers can roll big rocks along. Glaciers, huge slow rivers of ice, scrape the ground and drag rocks with them. Wind blows sand into dunes. Ocean waves wear away cliffs and carry sand along the beach. Over millions of years, the Colorado River carved the Grand Canyon, about a mile deep, by wearing away rock and carrying it off. When the water slows down, it drops what it was carrying, and new land builds up.",
        visual: {
          type: "hotspots",
          title: "What moves rock?",
          center: "🏜️ Erosion",
          spots: [
            { label: "Rivers", icon: "🏞️", detail: "Carry sand and mud downstream. The Colorado River carved the Grand Canyon." },
            { label: "Glaciers", icon: "🧊", detail: "Huge slow rivers of ice that scrape the ground and drag rocks along." },
            { label: "Wind", icon: "💨", detail: "Blows sand into dunes." },
            { label: "Ocean waves", icon: "🌊", detail: "Wear away cliffs and carry sand along beaches." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each change: weathering (breaking rock) or erosion (moving rock)?",
          buckets: ["Weathering (breaking)", "Erosion (moving)"],
          items: [
            { text: "Ice cracks a boulder", bucket: 0 },
            { text: "A tree root splits a rock", bucket: 0 },
            { text: "Rain slowly dissolves limestone", bucket: 0 },
            { text: "A river carries sand downstream", bucket: 1 },
            { text: "Wind blows sand into a dune", bucket: 1 },
            { text: "A glacier drags rocks across a valley", bucket: 1 },
          ],
          hint: "Ask: is the rock being broken, or are the pieces being carried somewhere else?",
          seconds: 35,
        },
        think: {
          q: "What is the difference between weathering and erosion?",
          choices: ["Weathering breaks rock; erosion moves the pieces", "They are the same thing", "Erosion breaks rock; weathering moves it", "Weathering only happens in winter"],
          answer: 0,
          why: "Weathering breaks rock down. Erosion carries the pieces away.",
          hints: [
            "",
            "They are related, but one breaks and the other moves.",
            "You have them switched. Weathering is the breaking part.",
            "Roots, wind and rain weather rock all year, not just in winter.",
          ],
        },
        approaches: {
          analogy:
            "Weathering is breaking a cookie into crumbs. Erosion is sweeping the crumbs across the table.",
          example:
            "After a heavy rain, look at a dirt hill in a yard. Little channels have formed, and a fan of mud has spread out at the bottom. The rain carried soil from the top and dropped it where the water slowed down.",
          simpler: {
            q: "A river carries sand downstream. Is that moving rock or breaking rock?",
            choices: ["Moving rock", "Breaking rock"],
            answer: 0,
            why: "Carrying sand away is moving it. That's erosion.",
            hints: ["", "The sand is already in small pieces. The river is taking it somewhere."],
          },
        },
      },
      {
        title: "Layers and Fossils",
        teach:
          "When rivers and wind slow down, they drop the sand and mud they carry. Layer after layer piles up, often under lakes and seas. Over a very long time, the layers are pressed and cemented into rock. In layers that have not been disturbed, the bottom layer was laid down first, so it is the oldest. The top layer is the youngest. Fossils are the remains or traces of ancient living things, like shells, bones, leaves and footprints, preserved in rock. They tell the story of a place. Shells of sea animals sit in rock near the rim of the Grand Canyon. So that land was once covered by a sea.",
        visual: {
          type: "hotspots",
          title: "Reading a cliff",
          center: "🪨 Rock layers",
          spots: [
            { label: "Top layer", icon: "🟨", detail: "Laid down last, so it is the youngest." },
            { label: "Middle layer", icon: "🟧", detail: "Formed after the bottom layer and before the top one." },
            { label: "Bottom layer", icon: "🟫", detail: "Laid down first, so it is the oldest." },
            { label: "Fossil shell", icon: "🐚", detail: "Sea shells in a layer show that a sea once covered this place." },
          ],
        },
        probe: {
          type: "cloze",
          text: "In undisturbed rock layers, the {0} layer is the oldest and the {1} layer is the youngest. Sea shell fossils high on a canyon wall show that the land was once under a {2}.",
          blanks: [{ answers: ["bottom"] }, { answers: ["top"] }, { answers: ["sea", "ocean"] }],
          bank: ["bottom", "top", "sea", "desert", "volcano"],
          hint: "Layers pile up like pancakes: the first one made is on the bottom. Sea animals live in the sea.",
          mistakes: [{ match: "desert", coach: "Sea animals can't live in a desert. Their shells show there was water here long ago." }],
          seconds: 35,
        },
        think: {
          q: "Fossil fish are found in rock in the middle of a dry desert. What does that tell us?",
          choices: ["Fish once lived in the desert sand", "Long ago, water covered this place", "Fish can walk on land", "The rock is brand new"],
          answer: 1,
          why: "Fish need water, so this place must have been underwater when they lived.",
          hints: [
            "Fish can't live in dry sand. Think about what the place was like long ago.",
            "",
            "Fish can't walk on land. The land itself must have changed.",
            "Fossils form over a very long time, so the rock is very old, not new.",
          ],
        },
        approaches: {
          analogy:
            "Rock layers are like a stack of newspapers piled up day by day. The paper on the bottom is the oldest, and the one on top is today's.",
          example:
            "A cliff has three layers. The bottom layer has sea shell fossils. The middle has fern leaf fossils. The top has none. So first a sea covered this place, later it became land where ferns grew, and the top layer formed last.",
          simpler: {
            q: "In a stack of pancakes, which pancake was made first?",
            choices: ["The one on the bottom", "The one on top"],
            answer: 0,
            why: "The first pancake goes on the plate first, so it ends up on the bottom.",
            hints: ["", "The top pancake was just added. The first one is underneath them all."],
          },
        },
      },
      {
        title: "Patterns on the Map",
        teach:
          "When scientists mark Earth's features on a world map, patterns appear. Many volcanoes and earthquakes line up in a belt around the Pacific Ocean, called the Ring of Fire. Mountains form long chains, like the Rocky Mountains and the Andes. Deep ocean trenches, like the Mariana Trench, the deepest place in the ocean, lie along some of those same edges. Why? Earth's outer shell is broken into giant pieces called plates. Where plates push together, pull apart or grind past each other, the ground shakes, mountains rise and volcanoes form.",
        visual: {
          type: "flip",
          cards: [
            { front: "Ring of Fire", back: "A belt around the Pacific Ocean with many volcanoes and earthquakes." },
            { front: "Mountain chain", back: "Mountains in long lines, like the Rocky Mountains and the Andes." },
            { front: "Ocean trench", back: "A deep valley in the ocean floor. The Mariana Trench is the deepest." },
            { front: "Plates", back: "Giant pieces of Earth's outer shell. Their edges are where most quakes and volcanoes happen." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the patterns scientists really see on maps of Earth.",
          sentences: [
            "Many volcanoes form a ring around the Pacific Ocean.",
            "Earthquakes happen often along the same belts as volcanoes.",
            "Volcanoes are spread evenly over every part of Earth.",
            "Mountains often form long chains.",
            "Deep trenches are found in the middle of every continent.",
          ],
          correct: [0, 1, 3],
          hint: "Volcanoes and earthquakes bunch together along edges, not evenly everywhere. Trenches are in the ocean.",
          seconds: 40,
        },
        think: {
          q: "Where do many of the world's volcanoes and earthquakes happen?",
          choices: ["Spread evenly everywhere", "Only at the North Pole", "Only in the middle of continents", "In a belt around the Pacific Ocean called the Ring of Fire"],
          answer: 3,
          why: "Many volcanoes and earthquakes line up along the edges of the Pacific Ocean.",
          hints: [
            "On a map they bunch together in belts. They are not spread evenly.",
            "The North Pole is not where most volcanoes are. Think about the edges of the biggest ocean.",
            "Most are near plate edges, many around one big ocean, not in the middle of continents.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Earth's outer shell is like a cracked eggshell. Most of the action happens along the cracks, just as most quakes and volcanoes line up along the edges of Earth's plates.",
          example:
            "On a world map, put a dot on Mount St. Helens in Washington State, Mount Fuji in Japan and the volcanoes of Chile. The dots trace the edge of the Pacific Ocean.",
          simpler: {
            q: "Is the Ring of Fire around the Pacific Ocean or the Atlantic Ocean?",
            choices: ["The Pacific Ocean", "The Atlantic Ocean"],
            answer: 0,
            why: "The Ring of Fire circles the Pacific Ocean.",
            hints: ["", "It surrounds the biggest ocean, the one between Asia and the Americas."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the story of a canyon in order.",
      steps: [
        "Sand and mud settle in layers under an ancient sea",
        "Over a long time, the layers harden into rock",
        "The land slowly rises far above the sea",
        "A river cuts down through the layers",
        "Weathering and erosion widen the canyon walls",
      ],
    },
    explain: {
      prompt: "Explain how seashells could end up in rock near the top of a canyon, far from any ocean. Use the words weathering, erosion, layers and fossils.",
      keyPoints: [
        "Layers of sand and mud were laid down under a sea long ago",
        "The bottom layers are the oldest",
        "Fossils show the place was once covered by water",
        "Weathering and erosion by a river carved the canyon",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each force of nature to what it does to rock.",
        pairs: [
          { left: "Freezing water", right: "Pushes cracks in rock wider" },
          { left: "A river", right: "Carries sand and mud downstream" },
          { left: "A glacier", right: "Scrapes and drags rocks across a valley" },
          { left: "Wind", right: "Piles sand into dunes" },
          { left: "Plant roots", right: "Grow into cracks and split rocks" },
        ],
        hint: "Think about where each one works: in cracks, in valleys, in deserts, along rivers.",
        seconds: 45,
      },
      {
        type: "number",
        prompt: "A cliff has 6 rock layers that have never been disturbed. Counting from the top as layer 1, which layer number is the oldest?",
        answer: 6,
        hint: "The oldest layer is at the bottom. Counting down from the top, which number is the bottom layer?",
        mistakes: [{ match: "1", coach: "Layer 1 is on top, so it's the youngest. The oldest is at the bottom." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Breaking rock into smaller pieces is called {0}. Moving the pieces to a new place is called {1}.",
        blanks: [{ answers: ["weathering"] }, { answers: ["erosion"] }],
        bank: ["weathering", "erosion", "fossils", "earthquakes"],
        hint: "Weathering breaks; erosion moves.",
        seconds: 20,
      },
      {
        type: "highlight",
        prompt: "From bottom to top, a cliff has: a layer with sea shells, a layer with fern leaves, and a layer with no fossils. Tap every true statement.",
        sentences: [
          "The sea shell layer is the oldest.",
          "This place was once covered by water.",
          "The fern layer formed before the sea shell layer.",
          "Later, plants grew here on land.",
          "The top layer is the oldest.",
        ],
        correct: [0, 1, 3],
        hint: "Bottom is oldest. Sea shells mean a sea; ferns mean land.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "A tree root grows into a crack and splits a rock. What is this?",
        choices: ["Erosion", "An earthquake", "Weathering", "A fossil"],
        answer: 2,
        why: "Breaking rock into pieces is weathering.",
      },
      {
        q: "In rock layers that have not been disturbed, which layer is the oldest?",
        choices: ["The top layer", "The middle layer", "They are all the same age", "The bottom layer"],
        answer: 3,
        why: "The bottom layer was laid down first.",
      },
      {
        q: "What carved the Grand Canyon?",
        choices: ["The Colorado River, over millions of years", "A single earthquake", "People with machines"],
        answer: 0,
        why: "The Colorado River wore away the rock and carried it off over millions of years.",
      },
      {
        q: "What pattern do maps show about volcanoes?",
        choices: ["They are spread evenly", "Many line up around the Pacific Ocean", "They are only in Antarctica"],
        answer: 1,
        why: "Many volcanoes form the Ring of Fire around the Pacific Ocean.",
      },
    ],
    task: {
      kind: "lab",
      prompt: "Erosion tray: pile damp sand or soil at one end of a baking pan and tilt the pan by setting that end on a book. Slowly pour a cup of water onto the top of the pile and watch. Rebuild the pile and pour the same amount of water quickly. Then rebuild it once more, press a few small stones or leaves on top, and pour again. Draw what happened each time. Where did the sand go? What slowed the erosion?",
      rubric: [
        "Ran the test at least three ways (slow water, fast water, with a cover)",
        "Drew or described where the sand moved and where it piled up",
        "Explained that fast-moving water carries more sand away",
        "Used the words weathering or erosion correctly",
      ],
    },
  },

  // 7. Resources and hazards
  {
    id: "sci-4.resources-hazards",
    title: "Energy Resources and Natural Hazards",
    minutes: 35,
    stage: "rhetoric",
    standards: ["4-ESS3-1", "4-ESS3-2"],
    read: [
      "Almost everything we do uses energy: cooking, lighting a room, riding in a car. That energy comes from natural resources, things we take from nature.",
      "Some energy resources are renewable, which means nature replaces them quickly. Sunlight, wind and moving water are renewable. Solar panels turn sunlight into electricity. Wind turbines turn moving air into electricity. Dams on rivers use falling water to spin generators. Wood is renewable too, as long as new trees are planted and allowed to grow.",
      "Other resources are nonrenewable. Once they are used, they are gone, because they take millions of years to form. Coal, oil and natural gas are called fossil fuels, because they formed from the remains of plants and tiny sea creatures that lived millions of years ago. Fossil fuels pack a lot of energy and are easy to store and ship, so people use them to run cars, heat homes and make electricity.",
      "Every energy resource has trade-offs. Mining coal digs up land. Burning fuels makes smoke that can dirty the air, and oil spills can harm sea life. Dams change rivers and the fish that live in them. Wind turbines and solar panels need lots of space, and they only make electricity when the wind blows or the sun shines. Wise people compare the benefits and costs.",
      "Earth also has natural hazards: earthquakes, volcanoes, floods, hurricanes and tornadoes. People cannot stop them, but they can reduce the harm. Engineers design buildings that sway instead of crumbling in earthquakes. Levees and flood walls hold back rising rivers. Houses in flood zones can be built up on stilts. Warning systems give people time to get to safety. And families can practice: in an earthquake, drop, cover and hold on.",
    ].join("\n\n"),
    keyIdeas: [
      "Energy comes from natural resources. Renewable ones (sun, wind, water) are replaced quickly; nonrenewable ones (coal, oil, gas) are not.",
      "Every energy resource has benefits and costs for the land, water and air.",
      "People can't stop natural hazards, but engineering and planning reduce the harm.",
    ],
    hook: {
      text: "Flip a light switch. The light comes on in an instant. But where did that energy really start? Maybe in sunshine, maybe in wind, maybe in coal dug from deep underground. Let's follow the energy back to nature.",
    },
    teach: [
      {
        title: "Renewable or Nonrenewable?",
        teach:
          "The energy we use comes from natural resources. Some are renewable, which means nature replaces them quickly. The Sun shines every day. The wind keeps blowing. Rivers keep flowing. Trees can be replanted and grow again. Other resources are nonrenewable. Coal, oil and natural gas took millions of years to form deep underground. Once we dig them up and burn them, they are gone for good, at least for millions of years. That doesn't mean we can't use them. It means we should use them wisely and know that the supply has a limit.",
        visual: {
          type: "compare",
          left: { title: "Renewable", points: ["Sunlight", "Wind", "Moving water", "Wood from replanted forests", "Replaced by nature quickly"] },
          right: { title: "Nonrenewable", points: ["Coal", "Oil", "Natural gas", "Took millions of years to form", "Once used, gone for good"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each energy resource: renewable or nonrenewable?",
          buckets: ["Renewable", "Nonrenewable"],
          items: [
            { text: "Sunlight", bucket: 0 },
            { text: "Wind", bucket: 0 },
            { text: "A flowing river", bucket: 0 },
            { text: "Wood from a replanted forest", bucket: 0 },
            { text: "Coal", bucket: 1 },
            { text: "Oil", bucket: 1 },
            { text: "Natural gas", bucket: 1 },
          ],
          hint: "Ask: will nature make more of it soon? If it took millions of years to form, it's nonrenewable.",
          mistakes: [{ match: "Natural gas sorted as renewable", coach: "Natural gas is a fossil fuel. It took millions of years to form, so it is nonrenewable." }],
          seconds: 35,
        },
        think: {
          q: "Why is coal called nonrenewable?",
          choices: ["It is black", "It takes millions of years to form, so once used it's gone", "It can be used again and again", "It comes from the Sun every day"],
          answer: 1,
          why: "Coal formed over millions of years. We use it far faster than nature can make more.",
          hints: [
            "Color has nothing to do with it. Think about how long coal takes to form.",
            "",
            "Once coal is burned, it can't be burned again.",
            "Sunlight arrives every day, but coal is dug from the ground and took ages to form.",
          ],
        },
        approaches: {
          analogy:
            "Renewable energy is like apples from a tree: pick them, and more grow next year. Nonrenewable energy is like a jar of cookies with no baker: once you eat them, the jar stays empty.",
          example:
            "A town gets electricity from a wind farm and from a coal plant. The wind keeps blowing year after year. The coal must be dug from a mine, and one day that mine will run out.",
          simpler: {
            q: "Will the Sun keep shining tomorrow?",
            choices: ["Yes, sunlight is renewable", "No, it will run out tomorrow"],
            answer: 0,
            why: "The Sun shines every day, so sunlight is renewable.",
            hints: ["", "The Sun has been shining for a very, very long time. It won't run out tomorrow."],
          },
        },
      },
      {
        title: "Fossil Fuels and Trade-offs",
        teach:
          "Coal, oil and natural gas are called fossil fuels because they formed from the remains of plants and tiny sea creatures that lived millions of years ago. People use a lot of them, because they pack plenty of energy and are easy to store and ship. They run cars, heat homes and make electricity. But every energy resource has trade-offs, good points and bad points. Mining coal digs up large areas of land. Burning fuels makes smoke that can dirty the air. An oil spill can harm sea birds and fish. Renewable resources have trade-offs too. Dams change rivers, and solar panels make no electricity at night.",
        visual: {
          type: "hotspots",
          title: "Where our energy comes from",
          center: "⚡ Energy",
          spots: [
            { label: "Coal", icon: "⛏️", detail: "Dug from mines. Lots of energy, but mining changes the land and burning it makes smoke." },
            { label: "Oil", icon: "🛢️", detail: "Pumped from deep underground. Easy to ship and store; spills can harm sea life." },
            { label: "Natural gas", icon: "🔥", detail: "Heats homes and cooks food. It formed over millions of years." },
            { label: "Sun", icon: "☀️", detail: "Free and renewable, but solar panels make no electricity at night." },
            { label: "Wind", icon: "🌬️", detail: "Renewable, but turbines need steady wind and lots of space." },
            { label: "Water", icon: "💧", detail: "Dams spin generators, but they change the river and its fish." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each energy resource to one of its drawbacks.",
          pairs: [
            { left: "Coal", right: "Mining digs up large areas of land" },
            { left: "Oil", right: "A spill can harm sea birds and fish" },
            { left: "A dam", right: "Changes the river and the fish that live there" },
            { left: "Solar panels", right: "Make no electricity at night" },
            { left: "Wind turbines", right: "Need steady wind and lots of space" },
          ],
          hint: "Think about where each resource comes from and when it works.",
          seconds: 45,
        },
        think: {
          q: "Why do people use so much oil and natural gas?",
          choices: ["They never run out", "They make no smoke at all", "They pack a lot of energy and are easy to store and ship", "They grow back every year"],
          answer: 2,
          why: "Fossil fuels hold a lot of energy in a small space and can be stored and moved easily.",
          hints: [
            "They are nonrenewable, so they can run out.",
            "Burning them does make smoke. Think about why they are still so useful.",
            "",
            "They took millions of years to form. They don't grow back.",
          ],
        },
        approaches: {
          analogy:
            "Choosing an energy source is like choosing a lunch. One is quick and filling but messy, another is clean but small. Every choice has pluses and minuses.",
          example:
            "A farm far from power lines could use solar panels. Plus: sunlight is free and renewable. Minus: no power at night, so the farm also needs batteries to store energy for later.",
          simpler: {
            q: "Do solar panels make electricity at night?",
            choices: ["Yes", "No"],
            answer: 1,
            why: "Solar panels need sunlight, so they stop at night.",
            hints: ["Solar panels run on sunlight. Is there sunlight at night?", ""],
          },
        },
      },
      {
        title: "Natural Hazards",
        teach:
          "A natural hazard is a natural event that can harm people and property. Earthquakes shake the ground. Volcanoes erupt with lava and ash. Floods happen when rivers overflow after heavy rain or melting snow. Hurricanes bring strong winds and high water to coasts, and tornadoes are spinning columns of wind. People cannot stop these events, but they can reduce the harm. Scientists watch for warning signs. They measure small rumbles near volcanoes, check river levels during storms, and track hurricanes with weather satellites. A good warning gives families time to get to safety.",
        visual: {
          type: "flip",
          cards: [
            { front: "Earthquake", back: "A sudden shaking of the ground, often near the edges of Earth's plates." },
            { front: "Volcano", back: "An opening where melted rock, ash and gas come out." },
            { front: "Flood", back: "Water overflowing onto land, often after heavy rain or melting snow." },
            { front: "Hurricane", back: "A huge storm with strong winds that forms over warm ocean water." },
            { front: "Tornado", back: "A fast-spinning column of wind that reaches down from a storm cloud." },
          ],
        },
        probe: {
          type: "cloze",
          text: "People cannot stop natural hazards, but they can reduce the {0}. A {1} system gives people time to get to safety.",
          blanks: [{ answers: ["harm", "damage"] }, { answers: ["warning"] }],
          bank: ["harm", "warning", "fun", "fossil"],
          hint: "We can't stop the event, but we can make it less harmful and warn people early.",
          seconds: 25,
        },
        think: {
          q: "Which of these is a natural hazard?",
          choices: ["A rainbow", "A gentle breeze", "A sunny day", "A flood"],
          answer: 3,
          why: "A flood can damage homes and harm people.",
          hints: [
            "A rainbow is beautiful and harmless. Look for something dangerous.",
            "A gentle breeze is harmless. Hazards can hurt people or damage property.",
            "A sunny day is pleasant. Look for an event that causes damage.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Planning for hazards is like wearing a bike helmet. You can't promise you'll never fall, but you can make a fall much less harmful.",
          example:
            "Weather satellites spot a hurricane forming far out at sea. Days before it reaches land, forecasters warn coastal towns, and families have time to cover windows and drive inland.",
          simpler: {
            q: "Can people stop an earthquake from happening?",
            choices: ["Yes", "No, but they can prepare"],
            answer: 1,
            why: "Earthquakes can't be stopped, but strong buildings and practice keep people safer.",
            hints: ["Earthquakes come from forces deep in the Earth. People can't switch them off.", ""],
          },
        },
      },
      {
        title: "Engineering for Safety",
        teach:
          "Engineers design solutions that reduce harm from hazards. In earthquake zones, some buildings rest on thick rubber pads, called base isolators, that let the ground shake while the building sways gently. Levees and flood walls hold back rising rivers. Houses in flood zones can be raised on stilts so water flows underneath. Sirens warn towns of tornadoes, and safe rooms give shelter. Engineers compare solutions: how well each works, what it costs and what it protects. Families have a part too. In an earthquake, drop, cover under a sturdy table and hold on. In a flood, never walk or drive through moving water.",
        visual: {
          type: "hotspots",
          title: "Ways to stay safer",
          center: "🛡️ Safety",
          spots: [
            { label: "Base isolators", icon: "🏢", detail: "Rubber pads under a building let it sway instead of crumble in an earthquake." },
            { label: "Levees", icon: "🏞️", detail: "Raised banks of earth along a river that hold back floodwater." },
            { label: "Stilt houses", icon: "🏠", detail: "Houses raised up so floodwater flows underneath." },
            { label: "Warning sirens", icon: "🚨", detail: "Loud alarms that tell a town to take shelter from a tornado." },
            { label: "Drop, cover, hold on", icon: "🙇", detail: "What to do in an earthquake: drop down, get under a sturdy table, and hold on." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each hazard to a solution that reduces its harm.",
          pairs: [
            { left: "Earthquake", right: "Buildings on rubber pads that let them sway" },
            { left: "River flood", right: "Levees and flood walls" },
            { left: "Volcano", right: "Scientists measure rumbles and warn nearby towns" },
            { left: "Tornado", right: "Warning sirens and a safe room" },
          ],
          hint: "Think about what each hazard does: shaking, rising water, eruptions, spinning wind.",
          seconds: 40,
        },
        think: {
          q: "During an earthquake, what should you do?",
          choices: ["Run down the stairs", "Stand next to a window", "Drop, cover under a sturdy table and hold on"],
          answer: 2,
          why: "Getting under a sturdy table protects you from falling objects.",
          hints: [
            "Running during shaking can make you fall. Stay put and protect yourself.",
            "Windows can break during shaking. Move away from glass.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A building on rubber pads is like standing on a moving bus with your knees bent. Your knees soak up the bumps, so you don't fall over.",
          example:
            "A river town floods every few years. One plan: build a levee around the whole town. Another: raise each house on stilts. The levee also protects roads and shops but costs more. Stilts cost less but leave the streets underwater. Engineers compare and choose.",
          simpler: {
            q: "What does a levee hold back?",
            choices: ["Rising river water", "Strong winds"],
            answer: 0,
            why: "A levee is a raised bank along a river that keeps floodwater out.",
            hints: ["", "A levee is a wall of earth along a river. Wind blows right over it."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Does it reduce harm from natural hazards, or make things worse?",
      buckets: ["Reduces harm", "Makes things worse"],
      items: [
        { text: "Practicing drop, cover and hold on", bucket: 0 },
        { text: "Building houses on stilts in a flood zone", bucket: 0 },
        { text: "Bolting tall bookshelves to the wall", bucket: 0 },
        { text: "Packing an emergency kit with water and a flashlight", bucket: 0 },
        { text: "Ignoring a flood warning", bucket: 1 },
        { text: "Driving through a flooded road", bucket: 1 },
        { text: "Standing next to windows during a tornado", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain where the energy for a light in your home might come from, whether that resource is renewable, and one good point and one drawback of using it.",
      keyPoints: [
        "Energy comes from natural resources",
        "Renewable resources like sun and wind are replaced quickly",
        "Fossil fuels like coal, oil and gas are nonrenewable",
        "Every resource has benefits and drawbacks",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Sort each one: renewable or nonrenewable?",
        buckets: ["Renewable", "Nonrenewable"],
        items: [
          { text: "Sunlight on solar panels", bucket: 0 },
          { text: "Wind turning a turbine", bucket: 0 },
          { text: "Firewood from a replanted forest", bucket: 0 },
          { text: "Gasoline made from oil", bucket: 1 },
          { text: "Coal for a power plant", bucket: 1 },
          { text: "Natural gas for a stove", bucket: 1 },
        ],
        hint: "Fossil fuels (coal, oil, gas, and things made from them) are nonrenewable.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Coal, oil and natural gas are called {0} fuels because they formed from living things of long ago. Sunlight and wind are {1}, because nature replaces them quickly.",
        blanks: [{ answers: ["fossil"] }, { answers: ["renewable"] }],
        bank: ["fossil", "renewable", "solar", "nonrenewable"],
        hint: "Fossils are remains of ancient life. Things nature replaces quickly are renewable.",
        mistakes: [{ match: "nonrenewable", coach: "The Sun shines every day and the wind keeps blowing. Nature replaces them, so they're renewable." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build what to do in an earthquake.",
        tiles: ["Drop to the floor,", "cover under a sturdy table,", "and hold on", "until the shaking stops."],
        distractors: ["run outside,", "stand by a window,"],
        hint: "Stay where you are and protect yourself from falling things.",
        seconds: 25,
      },
      {
        type: "number",
        prompt: "A town's levee is 5 meters tall. The highest flood ever recorded reached 4 meters. Engineers want the levee to be at least 2 meters taller than that flood. How many meters must they add to the levee?",
        answer: 1,
        unit: "m",
        hint: "First find the height they want: 4 meters plus 2 meters. Then compare it with the 5 meters the levee already has.",
        mistakes: [
          { match: "6", coach: "6 meters is the height they want. The levee is already 5 meters tall, so how much more is needed?" },
          { match: "2", coach: "The levee is already 1 meter taller than the flood. They only need to add enough to make it 6 meters." },
        ],
        seconds: 45,
      },
    ],
    check: [
      {
        q: "Which energy resource is renewable?",
        choices: ["Wind", "Coal", "Oil"],
        answer: 0,
        why: "The wind keeps blowing, so nature replaces it quickly.",
      },
      {
        q: "Why are coal, oil and natural gas called fossil fuels?",
        choices: ["They are found in museums", "They are made in factories", "They formed from the remains of ancient plants and sea creatures", "They come from volcanoes"],
        answer: 2,
        why: "They formed over millions of years from living things of long ago.",
      },
      {
        q: "What is one drawback of solar panels?",
        choices: ["They make smoke", "They make no electricity at night", "They need coal to work"],
        answer: 1,
        why: "Solar panels need sunlight, so they stop working at night.",
      },
      {
        q: "Which solution helps protect a town from a river flood?",
        choices: ["A taller flagpole", "A tornado siren", "More windows", "A levee"],
        answer: 3,
        why: "A levee is a raised bank that holds rising river water back.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Family safety and energy detective: with a parent, find out one natural hazard that can happen where you live (like storms, floods or earthquakes) and make a simple safety plan: where to go, what to do and what goes in an emergency kit. Then look for clues about where your home's energy comes from (an electric bill, a gas stove, solar panels, a wood stove) and say whether each source is renewable or nonrenewable.",
      rubric: [
        "Named a real hazard for the area and explained what it does",
        "Made a clear plan: where to go, what to do and an emergency kit list",
        "Identified at least one energy source used at home",
        "Correctly called each energy source renewable or nonrenewable",
      ],
    },
  },
];

export const sci4 = k5Course("sci", 4, lessons);
