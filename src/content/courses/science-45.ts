import type { Course } from "./types";
import { science } from "./science";

/**
 * Science Lab Jr.: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const science45: Course = {
  ...science,
  id: "science-45",
  band: "sprout",
  title: "Science Lab Jr.",
  blurb: "Hands-on science for grades 4-5: matter, forces, energy, living things, Earth and space.",
  lessons: [
    // 1. States of matter and the water cycle
    {
      id: "science-45.matter",
      title: "Solids, Liquids and Gases (and the Water Cycle)",
      minutes: 30,
      stage: "grammar",
      read: [
        "Everything around you is made of matter. Matter is anything that takes up space and has mass. Mass means how much stuff is in something. Your chair is matter. The milk in your cup is matter. Even the air you breathe is matter, though you cannot see it.",
        "Matter comes in three main states, or forms. A solid, like a rock or an ice cube, keeps its own shape. A liquid, like water or juice, flows and takes the shape of its container. A gas, like the air in a balloon, spreads out to fill any space it is in.",
        "All matter is made of tiny pieces called particles, far too small to see. In a solid, the particles are packed tight and only jiggle in place. In a liquid, they slide past each other. In a gas, they zoom around far apart.",
        "Heating and cooling can change matter from one state to another. When ice warms up, it melts into liquid water. When water gets cold enough, at 0 degrees Celsius (32 degrees Fahrenheit), it freezes into ice. When water is heated, it evaporates, which means it turns into an invisible gas called water vapor. When water vapor cools, it condenses back into tiny drops of liquid. That is why a cold glass of lemonade gets wet on the outside on a hot day.",
        "These changes keep Earth's water moving in a giant loop called the water cycle. The Sun warms oceans, lakes and puddles, and water evaporates into the air. High up, the vapor cools and condenses into tiny droplets that make clouds. When the droplets join and grow heavy, they fall as precipitation: rain, snow, sleet or hail. The water collects in rivers, lakes and oceans, and the cycle starts again. The water you drink today has traveled around this loop many, many times.",
      ].join("\n\n"),
      keyIdeas: [
        "Matter is anything that takes up space and has mass, even air.",
        "Solids keep their shape, liquids take the shape of their container, and gases spread out to fill a space.",
        "Heating and cooling make water melt, freeze, evaporate and condense, and that drives the water cycle.",
      ],
      hook: {
        text: "After a rainstorm, a big puddle sits on the sidewalk. By the afternoon, the Sun is out and the puddle is gone. Nobody mopped it up. Nobody drank it. So where did all that water go? The answer takes us up into the sky and back down again.",
      },
      teach: [
        {
          title: "What Is Matter?",
          teach:
            "Matter is anything that takes up space and has mass. Mass means how much stuff is in something. A bowling ball has much more mass than a basketball, even though they are about the same size. Rocks, water and even air are all matter. Air is easy to forget because you cannot see it. But blow up a balloon and you can feel the air inside pushing back. Light, sounds and feelings are not matter. They do not take up space or have mass.",
          visual: {
            type: "flip",
            cards: [
              { front: "Matter", back: "Anything that takes up space and has mass." },
              { front: "Mass", back: "How much stuff is in something. A bowling ball has more mass than a basketball." },
              { front: "Particles", back: "The tiny pieces, much too small to see, that all matter is made of." },
              { front: "Not matter", back: "Light, sound and feelings. They do not take up space or have mass." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each thing: is it matter or not?",
            buckets: ["Matter (takes up space, has mass)", "Not matter"],
            items: [
              { text: "A rock", bucket: 0 },
              { text: "The air inside a balloon", bucket: 0 },
              { text: "Orange juice", bucket: 0 },
              { text: "Steam from a kettle", bucket: 0 },
              { text: "A shadow on the wall", bucket: 1 },
              { text: "The sound of a drum", bucket: 1 },
              { text: "A happy feeling", bucket: 1 },
            ],
            hint: "Ask: could I put it in a jar and weigh it? If it takes up space and has mass, it is matter.",
            mistakes: [
              { match: "Air sorted as not matter", coach: "You can't see air, but it fills a balloon and pushes back when you squeeze. It takes up space, so it is matter." },
              { match: "Steam sorted as not matter", coach: "Steam is water, just very hot and spread out. Water is matter in every state." },
              { match: "Sound sorted as matter", coach: "Sound travels through matter, but sound itself does not take up space or have mass." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which of these is matter?",
            choices: ["A shadow", "Sunlight", "The air in a bike tire", "A song"],
            answer: 2,
            why: "Air takes up space inside the tire and has mass, so it is matter.",
            hints: [
              "A shadow is just a spot where light is blocked. It does not take up space or have mass.",
              "Sunlight is energy, not matter. You cannot weigh a jar of sunshine.",
              "",
              "A song is sound, which is energy moving through the air. It has no mass of its own.",
            ],
          },
          approaches: {
            analogy:
              "Think of matter as anything you could, in some way, trap in a sealed box and weigh. A rock fits. Water fits. Even air fits, if the box is airtight. A shadow or a song would never stay in the box.",
            example:
              "Weigh a flat, empty ball on a kitchen scale. Then pump it full of air and weigh it again. It weighs a few grams more. The air you pumped in has mass, so air is matter.",
            simpler: {
              q: "Does air take up space?",
              choices: ["Yes, it can fill up a balloon", "No, air is just empty space"],
              answer: 0,
              why: "Air fills a balloon and pushes back, so it takes up space.",
              hints: ["", "If air were empty space, a balloon would stay flat. Air pushes the balloon out, so it takes up space."],
            },
          },
        },
        {
          title: "Solids, Liquids and Gases",
          teach:
            "Matter comes in three main states. A solid keeps its own shape. Put a wooden block in a bowl and it stays a block. A liquid flows and takes the shape of its container, but the amount stays the same. Pour one cup of milk into a tall glass or a flat dish, and it is still one cup. A gas spreads out to fill whatever space it is in. Why the difference? Matter is made of tiny particles. In solids they are packed tight, in liquids they slide past each other, and in gases they zoom around far apart.",
          visual: {
            type: "hotspots",
            title: "Three states of matter",
            center: "Matter",
            spots: [
              { label: "Solid", icon: "🧊", detail: "Keeps its own shape. Particles are packed tight and only jiggle in place." },
              { label: "Liquid", icon: "💧", detail: "Flows and takes the shape of its container. Particles slide past each other." },
              { label: "Gas", icon: "🎈", detail: "Spreads out to fill any space. Particles zoom around far apart." },
              { label: "Particles", icon: "🔬", detail: "Tiny pieces of matter, far too small to see, that are always moving." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Juice poured into a glass takes the shape of the glass because it is a {0}. A wooden block keeps its shape because it is a {1}. The air in a balloon spreads out to fill it because it is a {2}.",
            blanks: [{ answers: ["liquid"] }, { answers: ["solid"] }, { answers: ["gas"] }],
            bank: ["liquid", "solid", "gas", "shadow", "magnet"],
            hint: "Solids keep their shape, liquids take the shape of their container, and gases spread out to fill a space.",
            mistakes: [
              { match: "shadow", coach: "A shadow is not matter at all. Each blank here names a state of matter." },
              { match: "magnet", coach: "A magnet is an object, not a state of matter. Think solid, liquid or gas." },
            ],
            seconds: 30,
          },
          think: {
            q: "You pour 1 cup of water from a tall glass into a wide bowl. What changes?",
            choices: ["The amount of water", "The water turns into a gas", "Nothing at all", "The shape of the water"],
            answer: 3,
            why: "A liquid takes the shape of its container, but the amount stays the same.",
            hints: [
              "No water was spilled or added, so the amount is still 1 cup. Something else changed.",
              "Pouring does not turn water into a gas. It is still a liquid, just in a new container.",
              "Look at the water in the bowl. It is spread out flat now, not tall and thin.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Picture a school gym. In a solid, everyone stands in tight rows, just wiggling. In a liquid, everyone mingles and slides past each other. In a gas, everyone runs around, spreading to every corner of the gym.",
            example:
              "Take an ice cube, a spoonful of water and a puff of air. The ice cube keeps its cube shape on a plate. The water spreads into a puddle shaped like the dip in the spoon or plate. The puff of air spreads out into the whole room.",
            simpler: {
              q: "Which one keeps its own shape?",
              choices: ["Apple juice", "A rock", "Steam"],
              answer: 1,
              why: "A rock is a solid, and solids keep their own shape.",
              hints: [
                "Juice is a liquid, so it takes the shape of its cup.",
                "",
                "Steam is a gas. It spreads out to fill the room.",
              ],
            },
          },
        },
        {
          title: "Melting, Freezing, Evaporating, Condensing",
          teach:
            "Heating and cooling can change matter from one state to another. Warm an ice cube and it melts into liquid water. Cool water to 0 degrees Celsius, which is 32 degrees Fahrenheit, and it freezes into ice. Heat water and it evaporates, turning into an invisible gas called water vapor. At 100 degrees Celsius it boils, and bubbles of vapor rise fast. Cool water vapor and it condenses, which means it turns back into tiny drops of liquid. That is why a cold glass gets wet on the outside on a hot day.",
          visual: {
            type: "flip",
            cards: [
              { front: "Melt", back: "Solid to liquid, when something warms up. Ice becomes water." },
              { front: "Freeze", back: "Liquid to solid, when something cools down. Water becomes ice at 0 °C (32 °F)." },
              { front: "Evaporate", back: "Liquid to gas. Water becomes invisible water vapor." },
              { front: "Condense", back: "Gas to liquid. Water vapor cools and becomes tiny drops." },
              { front: "Boil", back: "Fast evaporating with bubbles. Water boils at 100 °C (212 °F)." },
            ],
          },
          probe: {
            type: "place",
            prompt: "Drag each marker to the right temperature on this Celsius thermometer.",
            min: -20,
            max: 120,
            step: 5,
            tolerance: 5,
            items: [
              { label: "Water freezes into ice", value: 0 },
              { label: "Water boils", value: 100 },
              { label: "Exactly halfway between freezing and boiling", value: 50 },
            ],
            hint: "On the Celsius scale, water freezes at 0 and boils at 100. Halfway is in the middle of those two.",
            mistakes: [
              { match: "Put freezing at 32", coach: "32 is the freezing point in Fahrenheit. This thermometer is Celsius, where water freezes at 0." },
              { match: "Put boiling at 212", coach: "212 is boiling in Fahrenheit. On the Celsius scale, water boils at 100." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why does a cold can of juice get wet on the outside on a hot day?",
            choices: [
              "Juice leaks through the metal",
              "The can is melting",
              "Water vapor in the air condenses on the cold can",
              "The can is sweating like a person",
            ],
            answer: 2,
            why: "The cold can cools the water vapor in the air next to it, so the vapor condenses into drops.",
            hints: [
              "The can is sealed, and the drops are plain water, not juice. They come from the air.",
              "Metal cans do not melt on a warm day. The water on the outside came from the air.",
              "",
              "Cans have no sweat glands. The water comes from invisible water vapor in the air.",
            ],
          },
          approaches: {
            analogy:
              "Changing states is like a crowd reacting to music. Turn the music up (add heat) and people move faster and spread out: solid to liquid to gas. Turn it down (cool it) and they slow down and huddle close: gas to liquid to solid.",
            example:
              "Breathe on a cold mirror. Your breath has water vapor in it. The cold glass cools the vapor and it condenses into a foggy film of tiny drops. Wait a minute and the fog evaporates away again.",
            simpler: {
              q: "When ice warms up and turns into water, it...",
              choices: ["freezes", "melts", "condenses"],
              answer: 1,
              why: "Melting is when a solid warms up and becomes a liquid.",
              hints: [
                "Freezing goes the other way: liquid water turning into solid ice.",
                "",
                "Condensing is gas turning into liquid, like fog on a mirror.",
              ],
            },
          },
        },
        {
          title: "The Water Cycle",
          teach:
            "Earth's water travels in a never-ending loop called the water cycle. First, the Sun warms oceans, lakes and puddles, and water evaporates into the air as vapor. That is where the puddle went! Next, high in the sky the air is cold, so the vapor condenses into tiny droplets. Billions of droplets together make a cloud. Then the droplets bump together, grow heavy and fall as precipitation, which means rain, snow, sleet or hail. Finally, the water collects in rivers, lakes, oceans and underground, and the loop starts again.",
          visual: {
            type: "hotspots",
            title: "The water cycle",
            center: "Water",
            spots: [
              { label: "Evaporation", icon: "☀️", detail: "The Sun warms water, and it rises into the air as invisible water vapor." },
              { label: "Condensation", icon: "☁️", detail: "High up, the vapor cools and turns into tiny droplets that make clouds." },
              { label: "Precipitation", icon: "🌧️", detail: "Droplets join, grow heavy and fall as rain, snow, sleet or hail." },
              { label: "Collection", icon: "🌊", detail: "Water gathers in rivers, lakes, oceans and underground, ready to start again." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Follow one drop of lake water around the water cycle. Put the steps in order.",
            steps: [
              "The Sun warms the water in a lake",
              "Water evaporates into the air as vapor",
              "High up, the vapor cools and condenses into cloud droplets",
              "Droplets join, grow heavy and fall as rain or snow",
              "The water collects in rivers, lakes and oceans",
            ],
            hint: "The Sun's heat gets things started. Water has to go up before it can come down.",
            mistakes: [
              { match: "Rain before clouds", coach: "Rain falls out of clouds, so the vapor has to condense into a cloud first." },
              { match: "Condensing before evaporating", coach: "Water must first evaporate into vapor before that vapor can cool and condense." },
            ],
            seconds: 40,
          },
          think: {
            q: "In the water cycle, what makes clouds form?",
            choices: ["Smoke from chimneys", "Water vapor cooling and condensing", "Air turning into water", "Rain evaporating on the way down"],
            answer: 1,
            why: "Water vapor rises, cools high up and condenses into tiny droplets. Billions of droplets make a cloud.",
            hints: [
              "Clouds are made of water droplets, not smoke. The water came from evaporation.",
              "",
              "Air itself does not turn into water. The water vapor mixed in with the air does.",
              "Clouds form before any rain falls. Think about what happens when vapor gets cold.",
            ],
          },
          approaches: {
            analogy:
              "The water cycle is like a merry-go-round that never stops. Water rides up as vapor, waits in a cloud, slides down as rain, rests in a lake, and then climbs back on for another ride.",
            example:
              "A pot of soup with a lid is a tiny water cycle. Heat makes water evaporate. The vapor hits the cooler lid and condenses into drops. The drops grow heavy and drip back into the pot, just like rain.",
            simpler: {
              q: "What powers the water cycle by warming the water?",
              choices: ["The Moon", "The wind", "The Sun"],
              answer: 2,
              why: "The Sun's heat makes water evaporate, which starts the whole cycle.",
              hints: [
                "The Moon pulls on the tides, but it does not warm the water.",
                "Wind can help water dry faster, but the heat comes from somewhere else.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which change is happening? Sort each everyday event.",
        buckets: ["Melting", "Freezing", "Evaporating", "Condensing"],
        items: [
          { text: "An ice pop drips on a hot day", bucket: 0 },
          { text: "A snowman shrinks into slush in spring sunshine", bucket: 0 },
          { text: "Water in an ice tray turns hard in the freezer", bucket: 1 },
          { text: "A pond turns to ice in winter", bucket: 1 },
          { text: "A puddle disappears on a sunny afternoon", bucket: 2 },
          { text: "Wet laundry dries on a clothesline", bucket: 2 },
          { text: "The bathroom mirror fogs up after a hot shower", bucket: 3 },
          { text: "Dew drops form on cool grass early in the morning", bucket: 3 },
        ],
      },
      explain: {
        prompt: "Explain where a puddle goes on a sunny day, and how that same water could fall back down as rain.",
        keyPoints: [
          "The Sun's heat makes the water evaporate into water vapor",
          "Water vapor rises and cools high in the sky",
          "Cooled vapor condenses into droplets that form clouds",
          "Heavy droplets fall back down as precipitation, like rain or snow",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Solid, liquid or gas? Sort each one.",
          buckets: ["Solid", "Liquid", "Gas"],
          items: [
            { text: "A wooden spoon", bucket: 0 },
            { text: "A coin", bucket: 0 },
            { text: "Honey", bucket: 1 },
            { text: "Cooking oil", bucket: 1 },
            { text: "The air in a bike tire", bucket: 2 },
            { text: "Water vapor rising from a pot", bucket: 2 },
          ],
          hint: "Does it keep its own shape (solid), flow and take the shape of its container (liquid), or spread out to fill a space (gas)?",
          mistakes: [
            { match: "Honey sorted as solid", coach: "Honey is thick and slow, but it still flows and takes the shape of its jar. That makes it a liquid." },
            { match: "Water vapor sorted as liquid", coach: "Water vapor is water as an invisible gas. It spreads out into the room." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "When water vapor cools, it {0} into tiny drops. When ice warms up, it {1}. When liquid water gets cold enough, it {2}.",
          blanks: [
            { answers: ["condenses", "condense", "condensation"] },
            { answers: ["melts", "melt", "melting"] },
            { answers: ["freezes", "freeze", "freezing"] },
          ],
          bank: ["condenses", "melts", "freezes", "evaporates", "boils"],
          hint: "Gas to liquid, solid to liquid, liquid to solid. Find the word for each change.",
          mistakes: [
            { match: "evaporates", coach: "Evaporating is liquid turning into gas. None of these blanks go from liquid to gas." },
            { match: "boils", coach: "Boiling is fast evaporating with bubbles. Look for words about cooling or melting instead." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "A puddle holds 12 cups of water. On a sunny day, about 3 cups evaporate every hour. How many hours until the puddle is gone?",
          answer: 4,
          tolerance: 0,
          unit: "hours",
          hint: "How many groups of 3 cups fit into 12 cups?",
          mistakes: [
            { match: "36", coach: "That is 12 times 3. You want to know how many 3-cup hours fit into 12 cups, so divide." },
            { match: "9", coach: "That is 12 minus 3, which is only one hour's worth. Keep going until the water is all gone." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build a sentence that explains how a cloud forms.",
          tiles: ["Water vapor", "rises into the sky,", "cools down high up,", "and condenses", "into billions of tiny droplets."],
          distractors: ["melts into ice cubes", "turns into smoke"],
          hint: "Start with the gas, then tell what happens when it goes up and gets cold.",
          mistakes: [
            { match: "Used 'melts into ice cubes'", coach: "Melting turns a solid into a liquid. Clouds form when a gas cools and condenses." },
            { match: "Used 'turns into smoke'", coach: "Clouds are made of water droplets, not smoke." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which of these is NOT matter?",
          choices: ["Air", "A beam of light", "Milk", "A pebble"],
          answer: 1,
          why: "Light is energy. It does not take up space or have mass, so it is not matter.",
        },
        {
          q: "Which state of matter takes the shape of its container but keeps the same amount?",
          choices: ["Solid", "Gas", "Liquid"],
          answer: 2,
          why: "A liquid flows to fit its container, but a cup of it is still a cup.",
        },
        {
          q: "What is it called when water vapor cools and turns into tiny drops?",
          choices: ["Condensation", "Melting", "Evaporation", "Freezing"],
          answer: 0,
          why: "Condensing is gas turning back into liquid, like fog on a cold mirror.",
        },
        {
          q: "At what temperature does water freeze on the Celsius scale?",
          choices: ["100 degrees", "32 degrees", "50 degrees", "0 degrees"],
          answer: 3,
          why: "Water freezes at 0 degrees Celsius, which is the same as 32 degrees Fahrenheit.",
        },
        {
          q: "What gives the water cycle the energy to make water evaporate?",
          choices: ["The Moon", "The Sun", "Clouds", "Fish"],
          answer: 1,
          why: "The Sun warms oceans, lakes and puddles so the water evaporates.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Make a water cycle in a bag. Ask a parent to help. Materials: a zip-top sandwich bag, a permanent marker, water, a few drops of blue food coloring (optional), and clear tape. Steps: 1) Draw a sun, a cloud and some waves on the bag with the marker. 2) Pour about a quarter cup of water into the bag, add a drop of food coloring, and seal it tightly. 3) Tape the bag flat against a sunny window, with the water at the bottom. 4) Before you start, write a prediction: what will you see on the inside of the bag? 5) Check the bag 3 times a day for 3 days. Draw or write what you see each time: Is there fog or drops at the top? Do drops run back down? 6) Finish by explaining your bag using the words evaporate, condense and precipitation.",
        rubric: [
          "Prediction written before the bag went in the window",
          "At least 6 observations recorded with drawings or notes",
          "Explains where the drops at the top of the bag came from (evaporation and condensation)",
          "Connects the drops running down to rain in the real water cycle",
        ],
      },
    },

    // 2. Forces, friction and magnets
    {
      id: "science-45.forces",
      title: "Pushes and Pulls: Forces, Friction and Magnets",
      minutes: 30,
      stage: "logic",
      read: [
        "A force is a push or a pull. You push a door to open it, and you pull a wagon behind you. Forces can make something start moving, stop, speed up, slow down or change direction. A bigger force makes a bigger change. Kick a ball softly and it rolls a little; kick it hard and it zooms across the yard. Heavier things need a bigger force to get them moving.",
        "Gravity is a force that pulls things toward the center of the Earth. It is why a dropped apple falls down and never up, and why a ball rolls down a hill.",
        "Friction is a force that pushes against things that rub or slide together. It always works against the motion. Rough surfaces, like carpet, grass or sandpaper, make a lot of friction. Smooth surfaces, like ice, make very little. Friction can be helpful. The grip on your shoes keeps you from slipping, and bike brakes use friction to stop the wheels. Rub your hands together quickly and you can feel friction make heat.",
        "A magnet is an object that pulls on certain metals: iron, steel, nickel and cobalt. It does not pull on wood, plastic, glass, paper, or even some metals like aluminum and copper. A magnet's force can work without touching. It can pull a paper clip right through a sheet of paper.",
        "Every magnet has two ends called poles, a north pole and a south pole. Opposite poles attract, which means they pull together. Like poles repel, which means they push apart. Earth itself acts like a giant magnet. A compass needle is a tiny magnet that lines up with Earth's magnetism, so one end points north. For about a thousand years, compasses have helped travelers and sailors find their way.",
      ].join("\n\n"),
      keyIdeas: [
        "A force is a push or a pull; bigger forces make bigger changes in motion.",
        "Friction works against motion: rough surfaces make more, smooth surfaces make less.",
        "Magnets pull on iron, steel, nickel and cobalt; opposite poles attract and like poles repel.",
      ],
      hook: {
        text: "Long ago, people found a strange dark rock called lodestone. Hang a sliver of it from a thread, and it slowly turns until one end points north, every single time. Sailors used this mystery to find their way across the open ocean. What invisible pull was turning the rock?",
      },
      teach: [
        {
          title: "What Is a Force?",
          teach:
            "A force is a push or a pull. You push a door to open it. You pull a wagon behind you. Forces can make things start moving, stop, speed up, slow down or change direction. A bigger force makes a bigger change: kick a ball gently and it rolls a little; kick it hard and it zooms. Heavier things need a bigger force to get moving. Gravity is a force too. It pulls everything toward the center of the Earth. That is why a dropped apple falls down, never up, and why a toy car rolls down a ramp.",
          visual: { type: "ramp" },
          probe: {
            type: "sort",
            prompt: "Is each one mostly a push or a pull?",
            buckets: ["Push", "Pull"],
            items: [
              { text: "Kicking a soccer ball", bucket: 0 },
              { text: "Pressing an elevator button", bucket: 0 },
              { text: "Shoving a shopping cart forward", bucket: 0 },
              { text: "Yanking a weed out of the ground", bucket: 1 },
              { text: "Tugging a rope in tug of war", bucket: 1 },
              { text: "Gravity making an apple fall", bucket: 1 },
            ],
            hint: "A push moves something away from you. A pull brings it toward you, or toward the thing doing the pulling.",
            mistakes: [
              { match: "Gravity sorted as push", coach: "Gravity pulls things toward the center of the Earth. It never pushes them away." },
              { match: "Kicking sorted as pull", coach: "Your foot pushes the ball away from you, so a kick is a push." },
            ],
            seconds: 35,
          },
          think: {
            q: "You kick a ball gently, then you kick it hard. What does the harder kick do?",
            choices: ["Makes the ball go slower", "Makes no difference", "Makes the ball heavier", "Makes the ball speed up more"],
            answer: 3,
            why: "A bigger force makes a bigger change in motion, so the ball speeds up more.",
            hints: [
              "A harder kick is a bigger push. Bigger pushes make things go faster, not slower.",
              "Think about the last time you kicked a ball hard. Did it go the same as a soft kick?",
              "Kicking does not add any stuff to the ball, so its mass stays the same.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A force is like a nudge from a friend. A small nudge moves you a little. A big shove moves you a lot. And it takes a much bigger shove to move a grown-up than a little kid.",
            example:
              "Roll a toy car with a tiny flick and it goes about 1 meter. Give it a stronger push and it goes about 3 meters. Now tape some coins on top to make it heavier. The same strong push only sends it about 2 meters.",
            simpler: {
              q: "A force is...",
              choices: ["How heavy something is", "A push or a pull", "How fast something goes"],
              answer: 1,
              why: "Every force is a push or a pull on something.",
              hints: [
                "How heavy something is has to do with its mass. A force is what you do to it.",
                "",
                "Speed tells how fast something moves. A force is what can change that speed.",
              ],
            },
          },
        },
        {
          title: "Friction: The Grippy Force",
          teach:
            "Friction is a force that pushes against things that slide or rub together. It always works against the motion. Rough surfaces, like sandpaper, carpet or grass, make lots of friction. Smooth surfaces, like ice or a polished floor, make very little. That is why a toy car rolls far on a wood floor but stops quickly on carpet. Friction can be very helpful. The grip on your shoes keeps you from slipping, and bike brakes use friction to stop the wheels. Rub your hands together fast and feel them warm up. Friction makes heat too!",
          visual: {
            type: "compare",
            left: {
              title: "More friction (rough)",
              points: ["Carpet, grass, sandpaper", "Things slow down fast", "Shoes grip and don't slip", "Rubbing makes more heat"],
            },
            right: {
              title: "Less friction (smooth)",
              points: ["Ice, polished wood, glass", "Things slide or roll far", "Easy to slip", "Rubbing makes less heat"],
            },
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence where friction is HELPING someone.",
            sentences: [
              "Your sneakers grip the gym floor so you don't slip.",
              "Bike brakes squeeze the wheel to stop the bike.",
              "A sled zooms down a smooth, icy hill.",
              "Sand sprinkled on an icy sidewalk keeps people from falling.",
              "A heavy box is hard to slide across the carpet.",
              "Rubbing your hands together warms them on a cold day.",
            ],
            correct: [0, 1, 3, 5],
            hint: "Look for times when grip, stopping or warmth from rubbing is something people want.",
            mistakes: [
              { match: "Tapped the icy sled", coach: "The sled zooms because ice has very LITTLE friction. Friction isn't doing the helping there." },
              { match: "Tapped the heavy box", coach: "Friction is there, but it's making the job harder, not helping." },
            ],
            seconds: 35,
          },
          think: {
            q: "A toy car rolls across different floors. On which surface will it stop soonest?",
            choices: ["Smooth ice", "A polished wood floor", "Thick carpet", "A glass tabletop"],
            answer: 2,
            why: "Thick carpet is rough, so it makes the most friction and slows the car fastest.",
            hints: [
              "Ice is very smooth, so it makes very little friction. The car would roll a long way.",
              "Polished wood is smooth. The car would roll far before stopping.",
              "",
              "Glass is very smooth, with little friction. Look for the roughest surface.",
            ],
          },
          approaches: {
            analogy:
              "Friction is like walking through a crowded hallway. Lots of bumping and rubbing slows you down. On an empty, smooth hallway, you glide right through.",
            example:
              "Push a toy car with the same flick on three floors. On a wood floor it rolls 240 cm. On a rug it rolls 90 cm. On thick carpet it rolls 60 cm. The rougher the floor, the more friction, and the shorter the roll.",
            simpler: {
              q: "Rough surfaces make ___ friction than smooth ones.",
              choices: ["more", "less", "the same"],
              answer: 0,
              why: "Bumpy, rough surfaces rub more, so they make more friction.",
              hints: [
                "",
                "Think about sliding in socks on carpet versus on a smooth floor. Which one is easier?",
                "Rough and smooth surfaces feel very different when things slide on them.",
              ],
            },
          },
        },
        {
          title: "Magnets: Pulling Without Touching",
          teach:
            "A magnet is an object that pulls on certain metals: iron, steel, nickel and cobalt. It cannot pull wood, plastic, paper or glass, and it does not even pull some metals, like aluminum foil and copper. The amazing part is that a magnet's force works without touching. It can pull a paper clip right through a sheet of paper. The space around a magnet where its pull works is called its magnetic field. The pull is strongest close to the magnet and gets weaker as you move farther away.",
          visual: {
            type: "hotspots",
            title: "A bar magnet",
            center: "Magnet",
            spots: [
              { label: "North pole", icon: "🔴", detail: "One end of the magnet. Its pull is strongest near the ends." },
              { label: "South pole", icon: "🔵", detail: "The other end. Every magnet has both a north and a south pole." },
              { label: "Magnetic field", icon: "🧲", detail: "The space around a magnet where its pull works, even through paper." },
              { label: "Attracts", icon: "📎", detail: "Iron, steel, nickel and cobalt, like steel paper clips and iron nails." },
              { label: "Ignores", icon: "🪵", detail: "Wood, plastic, glass, paper, aluminum and copper." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Will a magnet pick it up? Sort each object.",
            buckets: ["Yes, the magnet pulls it", "No, the magnet ignores it"],
            items: [
              { text: "A steel paper clip", bucket: 0 },
              { text: "An iron nail", bucket: 0 },
              { text: "A steel safety pin", bucket: 0 },
              { text: "A sheet of aluminum foil", bucket: 1 },
              { text: "A wooden pencil", bucket: 1 },
              { text: "A plastic button", bucket: 1 },
              { text: "A glass marble", bucket: 1 },
            ],
            hint: "Magnets pull iron, steel, nickel and cobalt. Not every metal is magnetic.",
            mistakes: [
              { match: "Aluminum foil sorted as yes", coach: "Aluminum is a metal, but it is not one a magnet pulls. Only iron, steel, nickel and cobalt." },
              { match: "Safety pin sorted as no", coach: "Safety pins are made of steel, and steel has iron in it, so a magnet pulls them." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which object will a magnet pick up?",
            choices: ["A plastic spoon", "An aluminum soda can", "A rubber band", "A steel paper clip"],
            answer: 3,
            why: "Steel contains iron, and magnets pull on iron.",
            hints: [
              "Plastic is not a metal, and magnets do not pull plastic.",
              "Soda cans are made of aluminum, a metal that magnets do not pull.",
              "Rubber bands are not metal at all, so a magnet ignores them.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A magnet is like a picky eater at a buffet. It only goes for a few favorite foods, iron, steel, nickel and cobalt, and walks right past everything else, even other metals.",
            example:
              "Lay a sheet of paper over some paper clips. Slide a fridge magnet on top of the paper. The clips follow the magnet around underneath, even though the magnet never touches them. Now try it with a pile of aluminum foil scraps. Nothing moves.",
            simpler: {
              q: "Can a magnet pull something without touching it?",
              choices: ["Yes, its pull works across a small gap", "No, it must touch"],
              answer: 0,
              why: "A magnet's force works across space, even through paper.",
              hints: ["", "Try it: a paper clip jumps to a magnet before they touch. The pull works across a gap."],
            },
          },
        },
        {
          title: "North and South Poles",
          teach:
            "Every magnet has two ends called poles: a north pole and a south pole. Here is the rule. Opposite poles attract, which means they pull together. Like poles repel, which means they push apart. Hold two north poles close and you can feel them shove each other away, even before they touch. Earth itself acts like a giant magnet. A compass needle is a tiny magnet that lines up with Earth's magnetism, so one end always points north. That is what the lodestone was doing, and it helped sailors find their way.",
          visual: {
            type: "compare",
            left: { title: "Attract (pull together)", points: ["North near south", "South near north", "They snap together"] },
            right: { title: "Repel (push apart)", points: ["North near north", "South near south", "You feel them push away"] },
          },
          probe: {
            type: "cloze",
            text: "A north pole and a south pole {0}. Two south poles {1}. A compass needle points {2} because it lines up with Earth's magnetism.",
            blanks: [
              { answers: ["attract", "pull together", "stick together"] },
              { answers: ["repel", "push apart", "push away"] },
              { answers: ["north"] },
            ],
            bank: ["attract", "repel", "north", "melt", "east"],
            hint: "Opposites pull together; matching poles push apart.",
            mistakes: [
              { match: "melt", coach: "Magnets don't melt when they meet. Think about whether they pull together or push apart." },
              { match: "east", coach: "A compass needle lines up north and south. One end points north." },
            ],
            seconds: 30,
          },
          think: {
            q: "Two magnets push each other away. What must be facing each other?",
            choices: [
              "A north pole and a south pole",
              "Two like poles, such as north and north",
              "The middles of the magnets",
              "Nothing; magnets never push",
            ],
            answer: 1,
            why: "Like poles repel, so two north poles or two south poles push apart.",
            hints: [
              "North and south are opposite poles, and opposites attract. They would pull together.",
              "",
              "A magnet's pull and push are strongest at its ends, the poles.",
              "Magnets can push. Like poles always repel each other.",
            ],
          },
          approaches: {
            analogy:
              "Think of two puzzle pieces. A bump and a dent (opposites) fit and hold together. Two bumps (alike) just bonk and push away from each other.",
            example:
              "Put two bar magnets on a table, north end facing north end. Slide one closer and the other one scoots away. Flip one around so north faces south, and they jump together with a click.",
            simpler: {
              q: "Opposite poles...",
              choices: ["attract", "repel", "do nothing"],
              answer: 0,
              why: "Opposite poles, north and south, pull together.",
              hints: [
                "",
                "Repel is what like poles do. Opposites do the opposite.",
                "Magnets always do something when their poles get close.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which force is at work? Sort each event.",
        buckets: ["Gravity", "Friction", "Magnetism"],
        items: [
          { text: "A leaf drifts down from a tree", bucket: 0 },
          { text: "Rain falls from a cloud", bucket: 0 },
          { text: "A ball rolls back down a hill", bucket: 0 },
          { text: "Brakes squeeze a bike wheel to stop it", bucket: 1 },
          { text: "Sneakers grip the floor so you don't slip", bucket: 1 },
          { text: "A fridge magnet holds up a drawing", bucket: 2 },
          { text: "A compass needle swings to point north", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain the difference between friction and magnetism, and give one example of each that you could find in your house.",
        keyPoints: [
          "A force is a push or a pull",
          "Friction happens when surfaces rub, and it works against motion",
          "Magnets pull iron and steel, even without touching",
          "Opposite poles attract and like poles repel",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A toy car rolls 240 cm on a wood floor but only 60 cm on carpet. How many times farther did it roll on the wood floor?",
          answer: 4,
          tolerance: 0,
          unit: "times",
          hint: "How many groups of 60 fit into 240?",
          mistakes: [
            { match: "180", coach: "180 cm is how many MORE centimeters it rolled. The question asks how many TIMES as far, so divide." },
            { match: "300", coach: "That adds the two distances. To find how many times as far, divide 240 by 60." },
          ],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "Friction always works {0} the motion. Bike brakes use {1} to stop the wheels. A magnet pulls on {2}, but not on wood or plastic.",
          blanks: [
            { answers: ["against", "opposite", "opposite to"] },
            { answers: ["friction"] },
            { answers: ["iron", "steel", "nickel", "cobalt"] },
          ],
          bank: ["against", "friction", "iron", "along with", "gravity", "aluminum"],
          hint: "Friction slows things down. Magnets only pull a few special metals.",
          mistakes: [
            { match: "along with", coach: "Friction never helps things keep sliding. It pushes against the motion." },
            { match: "gravity", coach: "Gravity pulls things down. Brakes stop wheels by rubbing, which is friction." },
            { match: "aluminum", coach: "Aluminum is a metal, but magnets don't pull it. Look for iron or steel." },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each event to the force or magnet rule that explains it.",
          pairs: [
            { left: "A dropped book falls to the floor", right: "Gravity" },
            { left: "Sneakers grip the gym floor", right: "Friction" },
            { left: "A north pole and a south pole snap together", right: "Opposite poles attract" },
            { left: "Two north poles shove each other away", right: "Like poles repel" },
          ],
          hint: "Falling is one force, rubbing is another, and the magnet rule depends on which poles face each other.",
          mistakes: [
            { match: "Swapped attract and repel", coach: "North and south are opposites, so they attract. Two norths are alike, so they repel." },
            { match: "Matched the book to friction", coach: "Nothing is rubbing on a falling book. Gravity pulls it toward the Earth." },
          ],
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that is TRUE.",
          sentences: [
            "Opposite poles of magnets attract.",
            "A magnet can pull a paper clip through a sheet of paper.",
            "Magnets pick up every kind of metal.",
            "Smooth ice makes more friction than carpet.",
            "Gravity pulls things toward the center of the Earth.",
            "Heavier things need a smaller force to get them moving.",
          ],
          correct: [0, 1, 4],
          hint: "Watch out for words like 'every' and check which surface is rough and which is smooth.",
          mistakes: [
            { match: "Tapped 'every kind of metal'", coach: "Magnets ignore aluminum and copper. They pull only iron, steel, nickel and cobalt." },
            { match: "Tapped the ice sentence", coach: "Ice is smooth, so it has LESS friction than carpet. That's why things slide on it." },
            { match: "Tapped the heavier things sentence", coach: "Heavier things need a BIGGER force to get moving, not a smaller one." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What is a force?",
          choices: ["A kind of metal", "A push or a pull", "A type of rock", "How hot something is"],
          answer: 1,
          why: "Every force is a push or a pull.",
        },
        {
          q: "Why does a toy car roll farther on a wood floor than on carpet?",
          choices: [
            "Carpet has more gravity",
            "Wood is magnetic",
            "The wood floor makes less friction",
            "Cars like wood better",
          ],
          answer: 2,
          why: "Smooth wood makes less friction than rough carpet, so the car keeps rolling longer.",
        },
        {
          q: "Which of these will a magnet pull?",
          choices: ["An iron nail", "A wooden block", "Aluminum foil", "A glass marble"],
          answer: 0,
          why: "Magnets pull iron, steel, nickel and cobalt.",
        },
        {
          q: "You hold the south pole of one magnet near the south pole of another. What happens?",
          choices: ["They snap together", "Nothing at all", "They both turn into iron", "They push apart"],
          answer: 3,
          why: "Like poles repel, so two south poles push each other away.",
        },
        {
          q: "Why does one end of a compass needle point north?",
          choices: [
            "It is a tiny magnet that lines up with Earth's magnetism",
            "Wind always blows from the north",
            "Gravity pulls it north",
          ],
          answer: 0,
          why: "Earth acts like a giant magnet, and the compass needle lines up with it.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Magnet scavenger hunt. Ask a parent to help, and use a regular fridge magnet (keep magnets away from phones, computers and bank cards, and never put magnets in your mouth). Steps: 1) Make a table with three columns: Object, My prediction, What happened. 2) Pick 12 safe objects around the house, such as a spoon, a paper clip, a coin, a key, aluminum foil, a pencil, a toy, a soup can and a door hinge. 3) For each object, write your prediction first: will the magnet stick? 4) Test it and record what happened. 5) Look at your results. Which objects stuck? What do they have in common? 6) Bonus: put a sheet of paper between the magnet and a paper clip. How many sheets can the pull go through before it stops working?",
        rubric: [
          "Predictions written before each test",
          "At least 12 objects tested and recorded in a table",
          "Explains the pattern: magnets pull iron and steel, not every metal",
          "Notes at least one surprise and a reason for it",
        ],
      },
    },

    // 3. Light, sound and heat
    {
      id: "science-45.energy",
      title: "Energy All Around: Light, Sound and Heat",
      minutes: 30,
      stage: "logic",
      read: [
        "Energy is the ability to make things move or change. You cannot hold energy in your hand, but you can see what it does. Energy makes a car go, a lamp glow and a pot of soup bubble. It comes in many forms, and it can change from one form to another. Three forms you meet every day are light, sound and heat.",
        "Light is energy you can see. It comes from sources like the Sun, a lamp or a campfire. Light travels in straight lines, and it is incredibly fast: about 300,000 kilometers every second. You see a book because light bounces off it and into your eyes. When something blocks light, it makes a dark shape behind it called a shadow. Shiny, smooth things like mirrors reflect light, bouncing it back neatly.",
        "Sound is energy made by vibrations. A vibration is a quick back-and-forth shake. When you pluck a guitar string, it vibrates. The string shakes the air next to it, and the air passes the shake along until it reaches your ears. Sound can travel through air, water and even solid walls, but it needs matter to travel through. That is why space is silent. Sound is much slower than light. In air, it takes about 3 seconds to travel 1 kilometer.",
        "Heat is the energy that makes things warm. Heat always moves from warmer things to cooler things. Hold a mug of hot cocoa and heat flows into your hands. Some materials, called conductors, let heat move through them quickly. Most metals are good conductors. Other materials, called insulators, slow heat down. Wood, plastic, wool and trapped air are good insulators. That is why pots have plastic handles and winter coats are puffy.",
        "Next time a storm rolls in, watch for the lightning and count until the thunder. You will be measuring the speed of sound yourself.",
      ].join("\n\n"),
      keyIdeas: [
        "Energy is the ability to make things move or change, and it comes in forms like light, sound and heat.",
        "Light travels in straight lines and is much faster than sound, which is made by vibrations.",
        "Heat moves from warmer to cooler things; conductors move it quickly and insulators slow it down.",
      ],
      hook: {
        text: "You see a flash of lightning far away. One, two, three... BOOM! The thunder rolls in seconds later. But the lightning and the thunder happened at the very same moment. So why did your eyes get the news first? Light and sound are both energy, and they travel in very different ways.",
      },
      teach: [
        {
          title: "What Is Energy?",
          teach:
            "Energy is the ability to make things move or change. You can't hold energy in your hand, but you can see what it does. Energy makes a car go, a lamp glow and a pot of soup bubble. Your body gets energy from food. Energy comes in different forms, and it can change from one form to another. A flashlight turns the energy stored in its batteries into light. A drum turns the energy of your moving hand into sound. A toaster turns electricity into heat.",
          visual: {
            type: "flip",
            cards: [
              { front: "Energy", back: "The ability to make things move or change." },
              { front: "Light", back: "Energy you can see. It travels in straight lines, super fast." },
              { front: "Sound", back: "Energy made by vibrations, quick back-and-forth shakes." },
              { front: "Heat", back: "Energy that makes things warm. It moves from warmer to cooler things." },
              { front: "Changing forms", back: "A flashlight changes the stored energy in batteries into light." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each thing to the main kind of energy it gives off.",
            pairs: [
              { left: "A flashlight", right: "Light" },
              { left: "A drum being played", right: "Sound" },
              { left: "A toaster", right: "Heat" },
              { left: "A skateboard rolling downhill", right: "Motion" },
            ],
            hint: "Think about what you would notice first: seeing it glow, hearing it, feeling it warm, or watching it move.",
            mistakes: [
              { match: "Matched the toaster to light", coach: "Toasters glow a little, but their main job is to make heat to brown the bread." },
              { match: "Matched the drum to motion", coach: "The drum skin moves a tiny bit, but what reaches you across the room is sound." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which is the best description of energy?",
            choices: [
              "A kind of metal",
              "Something only living things have",
              "The ability to make things move or change",
              "Another word for air",
            ],
            answer: 2,
            why: "Energy is what makes things move, glow, heat up, or change in other ways.",
            hints: [
              "Metal is a kind of matter. Energy is not a thing you can hold.",
              "A toaster and a flashlight have energy, and they are not alive.",
              "",
              "Air is matter, a gas. Energy is what makes things move or change.",
            ],
          },
          approaches: {
            analogy:
              "Energy is like money in a game. You can't see the money itself doing anything, but you can spend it to make things happen, and you can trade it from one kind to another.",
            example:
              "Follow the energy in a flashlight. Energy is stored in the batteries. Flip the switch and it flows through the wires as electricity. The bulb changes it into light, and also a little bit of heat. Leave it on for hours and the batteries run out of stored energy.",
            simpler: {
              q: "A toaster changes electricity mostly into...",
              choices: ["heat", "water", "sound"],
              answer: 0,
              why: "A toaster makes heat to brown the bread.",
              hints: [
                "",
                "Toasters don't make water. Think about how the bread gets brown and crispy.",
                "A toaster may click, but its main job is something you feel, not hear.",
              ],
            },
          },
        },
        {
          title: "Light",
          teach:
            "Light is energy we can see. It comes from sources like the Sun, a lamp or a campfire. Light travels in straight lines, and it is the fastest thing there is: about 300,000 kilometers every second! You see a book because light bounces off it and into your eyes. When an object blocks light, it makes a dark shape behind it called a shadow. Smooth, shiny things like mirrors reflect light, which means they bounce it back neatly. Clear glass lets light pass right through.",
          visual: {
            type: "hotspots",
            title: "What light does",
            center: "Light",
            spots: [
              { label: "Sources", icon: "☀️", detail: "The Sun, lamps and fires give off their own light." },
              { label: "Straight lines", icon: "➡️", detail: "Light travels in straight lines, about 300,000 kilometers every second." },
              { label: "Shadows", icon: "👤", detail: "When something blocks light, a dark shadow forms behind it." },
              { label: "Reflection", icon: "🪞", detail: "Mirrors bounce light back neatly, so you can see yourself." },
              { label: "Passing through", icon: "🪟", detail: "Clear glass and clear water let light pass right through." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Shine a flashlight at each thing. Does light pass through, or does it make a shadow?",
            buckets: ["Lets light pass through", "Blocks light and makes a shadow"],
            items: [
              { text: "A clear window", bucket: 0 },
              { text: "Clear plastic wrap", bucket: 0 },
              { text: "A glass of clear water", bucket: 0 },
              { text: "A hardcover book", bucket: 1 },
              { text: "Your hand", bucket: 1 },
              { text: "A wooden door", bucket: 1 },
              { text: "A cardboard box", bucket: 1 },
            ],
            hint: "If you could read words through it, light passes through. If it leaves a dark shape on the wall, it blocks light.",
            mistakes: [
              { match: "Hand sorted as passes through", coach: "Hold your hand in front of a flashlight. You'll see a hand-shaped shadow on the wall, so it blocks light." },
              { match: "Water sorted as blocks", coach: "You can see through a glass of clear water, so light passes through it." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why does your body make a shadow on a sunny day?",
            choices: [
              "Shadows come out of the ground",
              "Your body gives off dark light",
              "The Sun turns off behind you",
              "Your body blocks the sunlight",
            ],
            answer: 3,
            why: "Light travels in straight lines, so your body blocks it and leaves a dark spot behind you.",
            hints: [
              "Shadows only appear when there is light. They come from something blocking that light.",
              "There is no such thing as dark light. A shadow is a place where light can't reach.",
              "The Sun is still shining all around you. Only the spot behind you is dark.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Light is like a stream of tiny tennis balls fired in straight lines. A wall stops them and leaves a 'shadow' where none land behind it. A mirror bounces them right back. A clear window lets them fly straight through.",
            example:
              "In a dark room, shine a flashlight at a wall. Put your hand in the beam: a hand-shaped shadow appears. Move your hand closer to the flashlight and the shadow gets bigger, because your hand blocks more of the beam.",
            simpler: {
              q: "Light travels in...",
              choices: ["zigzags", "straight lines", "circles"],
              answer: 1,
              why: "Light goes in straight lines until something blocks it or bounces it.",
              hints: [
                "Light doesn't zigzag. That's why you can't see around corners.",
                "",
                "If light went in circles, it could curve around you and there would be no shadows.",
              ],
            },
          },
        },
        {
          title: "Sound",
          teach:
            "Sound is energy made by vibrations. A vibration is a quick back-and-forth shake. Pluck a stretched rubber band and watch it blur as it vibrates. The vibrations shake the air next to them, and the air passes the shake along, all the way to your ears. Sound can travel through air, water and even solid walls. But it needs matter to travel through, so in empty space there is no sound at all. Sound is much slower than light. It takes about 3 seconds to travel 1 kilometer through air.",
          visual: {
            type: "compare",
            left: {
              title: "Light",
              points: ["Travels in straight lines", "About 300,000 km every second", "Can cross empty space", "You see it with your eyes"],
            },
            right: {
              title: "Sound",
              points: ["Made by vibrations", "About 1 km every 3 seconds in air", "Needs matter to travel through", "You hear it with your ears"],
            },
          },
          probe: {
            type: "number",
            prompt: "You see lightning, then count 9 seconds until you hear the thunder. Sound travels about 1 kilometer every 3 seconds. About how many kilometers away was the lightning?",
            answer: 3,
            tolerance: 0,
            unit: "km",
            hint: "Every 3 seconds of counting is about 1 kilometer. How many groups of 3 are in 9?",
            mistakes: [
              { match: "27", coach: "That's 9 times 3. Each kilometer takes 3 seconds, so divide the seconds by 3." },
              { match: "9", coach: "9 is the number of seconds, not kilometers. Sound needs 3 seconds for each kilometer." },
            ],
            seconds: 30,
          },
          think: {
            q: "Why do you see lightning before you hear thunder?",
            choices: [
              "Thunder happens a few seconds later",
              "Light travels much faster than sound",
              "Your eyes are closer to the sky than your ears",
              "Sound travels faster than light",
            ],
            answer: 1,
            why: "They start at the same moment, but light reaches you almost instantly while sound takes about 3 seconds per kilometer.",
            hints: [
              "Lightning and thunder happen at the same moment. The difference is in how fast each one travels to you.",
              "",
              "Your eyes and ears are only a few centimeters apart. That can't explain a wait of several seconds.",
              "It's the other way around. If sound were faster, you'd hear the boom first.",
            ],
          },
          approaches: {
            analogy:
              "Sound moving through air is like a line of dominoes. Each one bumps the next, passing the push along. The dominoes don't travel to you; the bump does.",
            example:
              "Put a few grains of rice on a drum or an upside-down pot. Tap the drum. The rice bounces because the drum skin is vibrating. Those same vibrations shake the air and reach your ears as sound.",
            simpler: {
              q: "Sound is made by...",
              choices: ["shadows", "magnets", "vibrations"],
              answer: 2,
              why: "Every sound starts with something vibrating, shaking back and forth.",
              hints: [
                "Shadows are made when light is blocked. They make no noise.",
                "Magnets push and pull metal, but they don't make sound by themselves.",
                "",
              ],
            },
          },
        },
        {
          title: "Heat on the Move",
          teach:
            "Heat is the energy that makes things warm. Heat always moves from warmer things to cooler things. Hold a cup of hot cocoa and heat moves into your cold hands. Hold an ice cube in your palm and heat moves from your hand into the ice, so it melts. Some materials let heat move through them quickly. These are called conductors, and most metals are good ones. Other materials slow heat down. These are insulators, like wood, plastic, wool and trapped air. That is why pot handles are often plastic and winter coats are puffy.",
          visual: {
            type: "compare",
            left: { title: "Conductors (heat moves fast)", points: ["Metal spoon", "Iron frying pan", "Aluminum foil", "Feel hot or cold quickly"] },
            right: { title: "Insulators (heat moves slowly)", points: ["Wooden spoon", "Plastic handle", "Wool mittens", "Puffy coat full of trapped air"] },
          },
          probe: {
            type: "sort",
            prompt: "Conductor or insulator? Sort each material.",
            buckets: ["Conductor (heat moves fast)", "Insulator (slows heat down)"],
            items: [
              { text: "A metal spoon", bucket: 0 },
              { text: "Aluminum foil", bucket: 0 },
              { text: "An iron frying pan", bucket: 0 },
              { text: "A wooden spoon", bucket: 1 },
              { text: "A wool mitten", bucket: 1 },
              { text: "A plastic pot handle", bucket: 1 },
              { text: "A foam cup", bucket: 1 },
            ],
            hint: "Most metals are conductors. Wood, plastic, wool, foam and trapped air are insulators.",
            mistakes: [
              { match: "Foil sorted as insulator", coach: "Foil is thin metal, and most metals let heat through quickly. It's a conductor." },
              { match: "Foam cup sorted as conductor", coach: "Foam is full of trapped air bubbles, which slow heat down. That's why hot cocoa in a foam cup doesn't burn your hand." },
            ],
            seconds: 40,
          },
          think: {
            q: "You stir hot soup with a metal spoon and a wooden spoon. A minute later, which handle feels hotter?",
            choices: ["The wooden spoon", "The metal spoon", "They feel the same", "Neither gets warm at all"],
            answer: 1,
            why: "Metal is a conductor, so heat travels up the metal handle much faster than up the wood.",
            hints: [
              "Wood is an insulator. It slows heat down, so its handle stays cooler.",
              "",
              "The two materials are very different. One lets heat move through much faster.",
              "Heat always moves from the hot soup into the cooler spoons. The question is how fast.",
            ],
          },
          approaches: {
            analogy:
              "A conductor is like an open highway for heat: it zooms right through. An insulator is like a road full of traffic jams: heat still gets through, but very slowly.",
            example:
              "On a cold morning, touch a metal doorknob and a wooden door. They are the same temperature, but the metal feels colder. Metal is a conductor, so it pulls heat out of your fingers quickly. Wood is an insulator, so it pulls heat away slowly.",
            simpler: {
              q: "Heat moves from...",
              choices: ["warmer things to cooler things", "cooler things to warmer things", "nowhere; it stays put"],
              answer: 0,
              why: "Heat always flows from the warmer thing to the cooler thing.",
              hints: [
                "",
                "Think about an ice cube in your hand. It melts because heat moves from your warm hand into it.",
                "Hot cocoa cools down if you wait, so heat must be moving somewhere.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Light, sound or heat? Sort each one by the main kind of energy.",
        buckets: ["Light", "Sound", "Heat"],
        items: [
          { text: "A rainbow after the rain", bucket: 0 },
          { text: "A mirror showing your face", bucket: 0 },
          { text: "A flashlight making a shadow on the wall", bucket: 0 },
          { text: "A guitar string buzzing", bucket: 1 },
          { text: "A dog barking", bucket: 1 },
          { text: "A warm mug warming your hands", bucket: 2 },
          { text: "A heater warming a cold room", bucket: 2 },
          { text: "A campfire toasting your toes", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain why you see lightning before you hear thunder, and how you could use that to tell how far away a storm is.",
        keyPoints: [
          "Lightning and thunder start at the same moment",
          "Light travels much faster than sound",
          "Sound takes about 3 seconds to travel 1 kilometer",
          "Count the seconds and divide by 3 to estimate the distance in kilometers",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Thunder arrives 15 seconds after you see the lightning flash. Sound travels about 1 kilometer every 3 seconds. About how many kilometers away is the storm?",
          answer: 5,
          tolerance: 0,
          unit: "km",
          hint: "Each kilometer takes about 3 seconds. Divide the seconds you counted by 3.",
          mistakes: [
            { match: "45", coach: "That's 15 times 3. Divide instead: each 3 seconds is 1 kilometer." },
            { match: "15", coach: "15 is the number of seconds. Turn seconds into kilometers by dividing by 3." },
            { match: "12", coach: "That's 15 minus 3. Use division: how many 3s fit into 15?" },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "Sound is made by {0}. Light travels in straight {1}. Heat always moves from warmer things to {2} things.",
          blanks: [
            { answers: ["vibrations", "vibration", "vibrating"] },
            { answers: ["lines", "line"] },
            { answers: ["cooler", "colder"] },
          ],
          bank: ["vibrations", "lines", "cooler", "circles", "warmer", "magnets"],
          hint: "Think: what shakes to make sound, what path light follows, and which way heat flows.",
          mistakes: [
            { match: "circles", coach: "Light does not travel in circles. It goes in straight lines, which is why shadows form." },
            { match: "warmer", coach: "Heat flows downhill, from warm to cool. An ice cube melts in your hand because heat goes into the colder ice." },
            { match: "magnets", coach: "Magnets don't make sound. Every sound starts with something vibrating." },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each object to the job it does best.",
          pairs: [
            { left: "A metal pot", right: "Carries heat quickly to cook food" },
            { left: "Wool mittens", right: "Slow down heat leaving your hands" },
            { left: "A mirror", right: "Reflects light so you can see your face" },
            { left: "A window", right: "Lets light pass into a room" },
          ],
          hint: "Conductors move heat fast, insulators slow it down, mirrors bounce light, and clear glass lets it through.",
          mistakes: [
            { match: "Swapped the pot and the mittens", coach: "Metal is a conductor that moves heat fast. Wool is an insulator that holds warmth in." },
            { match: "Swapped the mirror and the window", coach: "A mirror bounces light back to you. A window lets light pass straight through." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build the path of a sound from a drum to your ear.",
          tiles: ["You hit the drum,", "the drum skin vibrates,", "it shakes the air next to it,", "the air passes the shake along,", "and the vibration reaches your ear."],
          distractors: ["a shadow carries the sound,"],
          hint: "Sound starts with something shaking, then the shake moves through the air.",
          mistakes: [
            { match: "Used 'a shadow carries the sound,'", coach: "Shadows are about blocked light. Sound is carried by vibrating air." },
            { match: "Air shakes before the drum vibrates", coach: "The drum has to vibrate first. Its shaking is what sets the air moving." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What is energy?",
          choices: ["A kind of gas", "The ability to make things move or change", "A type of rock", "A loud noise"],
          answer: 1,
          why: "Energy is what makes things move, glow, heat up or change.",
        },
        {
          q: "What causes a shadow?",
          choices: ["An object blocking light", "Light bending around a corner", "Sound bouncing off a wall", "Heat leaving an object"],
          answer: 0,
          why: "Light travels in straight lines, so an object in its path leaves a dark shape behind it.",
        },
        {
          q: "Why is there no sound in outer space?",
          choices: ["It is too cold", "Space is too dark", "Sound needs matter, like air, to travel through", "Everything in space is quiet on purpose"],
          answer: 2,
          why: "Sound is vibrations passed along through matter. Empty space has almost no matter to carry them.",
        },
        {
          q: "Which material is the best insulator for keeping cocoa hot?",
          choices: ["A metal cup", "Aluminum foil", "An iron pot", "A thick foam cup"],
          answer: 3,
          why: "Foam is full of trapped air, which slows heat down.",
        },
        {
          q: "An ice cube sits in your warm hand. Which way does the heat move?",
          choices: ["From your hand into the ice", "From the ice into your hand", "It doesn't move at all"],
          answer: 0,
          why: "Heat always moves from warmer things to cooler things.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Insulator challenge: which wrapper keeps an ice cube frozen the longest? Ask a parent to help. Materials: 5 ice cubes of the same size, 5 small plates, aluminum foil, a wool sock, a paper towel, a plastic sandwich bag, and a timer. Steps: 1) Write a prediction: which wrapper will keep its ice cube frozen longest, and why? 2) Wrap one ice cube in each material, and leave one cube bare on its plate. 3) Set all five plates side by side in the same spot, away from sunny windows. 4) Every 10 minutes, peek at each cube and write down how much is left (all, most, half, a little, gone). 5) Record the time each cube finishes melting. 6) Write a conclusion using the words conductor and insulator: which wrapper slowed the heat best?",
        rubric: [
          "Prediction written before the test started",
          "Fair test: same size cubes, same spot, only the wrapper changed",
          "Observations recorded every 10 minutes in a table",
          "Conclusion uses the words conductor and insulator correctly",
        ],
      },
    },

    // 4. Food chains and ecosystems
    {
      id: "science-45.ecosystems",
      title: "Food Chains and Ecosystems",
      minutes: 30,
      stage: "logic",
      read: [
        "An ecosystem is all the living things in a place, plus the nonliving things they need, all working together. Living things include plants, animals, mushrooms and tiny bacteria. Nonliving things include sunlight, water, air, soil and rocks. A pond is an ecosystem. So is a forest, a desert, or even a rotting log in your backyard.",
        "Every living thing needs energy, and the energy in almost every ecosystem starts with the Sun. Plants are producers. They make their own food from sunlight, water and air. Animals are consumers, because they cannot make their own food, so they must eat. Herbivores, like rabbits and deer, eat plants. Carnivores, like hawks and wolves, eat other animals. Omnivores, like bears and raccoons, eat both.",
        "Decomposers, like mushrooms, worms and bacteria, are nature's recyclers. They break down dead plants and animals and return nutrients to the soil, so new plants can grow.",
        "A food chain shows how energy moves from one living thing to the next. Here is one from a meadow: grass, grasshopper, frog, snake, hawk. The arrows in a food chain point from the food to the eater, the way the energy flows. Most animals eat more than one thing, so real ecosystems have many food chains linked together. This is called a food web.",
        "Energy gets smaller at each step. A rabbit uses most of the energy from its food just to hop, stay warm and grow. Only about one tenth gets passed on to the fox that eats it. That is why a meadow needs lots of grass, fewer rabbits and only a few foxes.",
        "Change one part of a food web, and the other parts change too. When wolves returned to Yellowstone National Park in 1995, scientists watched the elk, the trees and many other living things change in response.",
      ].join("\n\n"),
      keyIdeas: [
        "An ecosystem is living and nonliving things in one place, working together.",
        "Producers make food from sunlight; consumers eat; decomposers recycle dead things into the soil.",
        "Food chains show energy moving from food to eater, and only about a tenth passes on at each step.",
      ],
      hook: {
        text: "In 1995, gray wolves were brought back to Yellowstone National Park after about 70 years away. Scientists watched closely. The wolves hunted elk, and the elk began to move around more and avoid some places. Soon scientists saw changes all through the park, from the elk herds to the young trees along the rivers. How could a few wolves change a whole forest?",
      },
      teach: [
        {
          title: "What Is an Ecosystem?",
          teach:
            "An ecosystem is all the living things in a place, plus the nonliving things they need, working together. Living things include plants, animals, mushrooms and tiny bacteria. Nonliving things include sunlight, water, air, soil and rocks. A pond is an ecosystem. So is a forest, a desert, or even a rotting log in your backyard. Every living thing in an ecosystem needs food, water, air and a place to live. The place where a plant or animal naturally lives is called its habitat.",
          visual: {
            type: "hotspots",
            title: "A pond ecosystem",
            center: "Pond",
            spots: [
              { label: "Sunlight", icon: "☀️", detail: "Nonliving. Gives energy to the plants and warms the water." },
              { label: "Water", icon: "💧", detail: "Nonliving. A home for fish and tadpoles and a drink for deer." },
              { label: "Cattails", icon: "🌾", detail: "Living. Plants that make food from sunlight and give birds a place to nest." },
              { label: "Frog", icon: "🐸", detail: "Living. Eats insects and is eaten by herons and snakes." },
              { label: "Heron", icon: "🐦", detail: "Living. A tall bird that wades in to catch fish and frogs." },
              { label: "Mud", icon: "🟫", detail: "Nonliving soil, full of tiny living bacteria that break down dead leaves." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "In a forest ecosystem, sort each part: living or nonliving?",
            buckets: ["Living", "Nonliving"],
            items: [
              { text: "An oak tree", bucket: 0 },
              { text: "A deer", bucket: 0 },
              { text: "A mushroom", bucket: 0 },
              { text: "An earthworm", bucket: 0 },
              { text: "Sunlight", bucket: 1 },
              { text: "Rainwater", bucket: 1 },
              { text: "A rock", bucket: 1 },
            ],
            hint: "Living things grow, need food and energy, and make more of their own kind.",
            mistakes: [
              { match: "Mushroom sorted as nonliving", coach: "A mushroom grows and makes spores to spread, so it's alive. It's a fungus, not a plant." },
              { match: "Sunlight sorted as living", coach: "Living things need sunlight, but sunlight itself doesn't grow, eat or make more of itself." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which is a NONLIVING part of an ecosystem?",
            choices: ["A frog", "Moss", "Sunlight", "A beetle"],
            answer: 2,
            why: "Sunlight is a nonliving thing that living things depend on.",
            hints: [
              "A frog grows, eats and lays eggs, so it is living.",
              "Moss is a small green plant. It grows, so it is living.",
              "",
              "A beetle is an insect. It eats, grows and makes more beetles, so it is living.",
            ],
          },
          approaches: {
            analogy:
              "An ecosystem is like a town. The people and pets are the living parts. The roads, water pipes and sunshine are the nonliving parts. Everyone in town depends on everything else to keep life running.",
            example:
              "Flip over an old log in a park. Underneath you might find beetles, worms, pill bugs, mushrooms and moss (living), plus damp soil, small stones and rainwater (nonliving). That one log is a tiny ecosystem.",
            simpler: {
              q: "Is a pond an ecosystem?",
              choices: ["Yes, living and nonliving things work together there", "No, only big forests count as ecosystems"],
              answer: 0,
              why: "Any place where living and nonliving things work together is an ecosystem, big or small.",
              hints: ["", "Ecosystems can be any size, even a single rotting log."],
            },
          },
        },
        {
          title: "Producers, Consumers and Decomposers",
          teach:
            "Living things get energy in different ways. Producers make their own food. Plants are producers: they use sunlight, water and air to make sugar in their leaves. Consumers cannot make food, so they eat. Herbivores, like rabbits and deer, eat plants. Carnivores, like hawks and wolves, eat other animals. Omnivores, like bears and raccoons, eat both. Decomposers, like mushrooms, worms and bacteria, break down dead plants and animals. They turn them into nutrients that go back into the soil to help new plants grow.",
          visual: {
            type: "flip",
            cards: [
              { front: "Producer", back: "Makes its own food from sunlight, water and air. Example: an oak tree." },
              { front: "Herbivore", back: "A consumer that eats only plants. Example: a rabbit." },
              { front: "Carnivore", back: "A consumer that eats other animals. Example: a hawk." },
              { front: "Omnivore", back: "A consumer that eats plants and animals. Example: a black bear." },
              { front: "Decomposer", back: "Breaks down dead things and returns nutrients to the soil. Example: a mushroom." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each living thing by how it gets its energy.",
            buckets: ["Producer", "Herbivore", "Carnivore", "Omnivore", "Decomposer"],
            items: [
              { text: "An oak tree", bucket: 0 },
              { text: "Grass", bucket: 0 },
              { text: "A rabbit", bucket: 1 },
              { text: "A deer", bucket: 1 },
              { text: "A hawk", bucket: 2 },
              { text: "A black bear", bucket: 3 },
              { text: "A raccoon", bucket: 3 },
              { text: "A mushroom on a log", bucket: 4 },
            ],
            hint: "Does it make food from sunlight, eat plants, eat animals, eat both, or break down dead things?",
            mistakes: [
              { match: "Bear sorted as carnivore", coach: "Black bears eat fish and insects, but also lots of berries, nuts and roots. Eating both makes them omnivores." },
              { match: "Mushroom sorted as producer", coach: "Mushrooms are not plants. They can't make food from sunlight; they break down dead things instead." },
            ],
            seconds: 50,
          },
          think: {
            q: "A mushroom growing on a fallen log is a...",
            choices: ["producer", "herbivore", "carnivore", "decomposer"],
            answer: 3,
            why: "Mushrooms break down the dead log and return its nutrients to the soil.",
            hints: [
              "Mushrooms can't make food from sunlight like plants do. They grow even in the dark.",
              "Herbivores are animals that eat living plants. A mushroom is not an animal.",
              "Carnivores eat other animals. The mushroom is feeding on a dead log.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of a restaurant. Producers are the farmers who grow the food. Consumers are the diners who eat it. Decomposers are the cleanup crew who turn the scraps into compost for next year's garden.",
            example:
              "In a garden: a tomato plant makes food from sunlight (producer). A caterpillar eats its leaves (herbivore). A robin eats the caterpillar (carnivore here, though robins also eat berries). When a leaf falls and rots, worms and bacteria break it down (decomposers) and feed the soil for next year's tomatoes.",
            simpler: {
              q: "Plants make their own food using...",
              choices: ["other animals", "sunlight, water and air", "rocks"],
              answer: 1,
              why: "Plants are producers that turn sunlight, water and air into food.",
              hints: [
                "Plants don't eat animals. They make their own food.",
                "",
                "Plants get some nutrients from soil, but rocks are not their food.",
              ],
            },
          },
        },
        {
          title: "Food Chains",
          teach:
            "A food chain shows who eats whom, and how energy moves from one living thing to the next. It always starts with the Sun and a producer. Here is a meadow food chain: grass, then grasshopper, then frog, then snake, then hawk. The arrows in a food chain point from the food to the eater, the way the energy flows. So grass → grasshopper means the grasshopper eats the grass and gets its energy. The hawk is at the top of this chain. Nothing in the meadow hunts it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Sun → grass", back: "Grass uses sunlight to make its own food." },
              { front: "Grass → grasshopper", back: "The grasshopper eats the grass and gets its energy." },
              { front: "Grasshopper → frog", back: "The frog catches and eats the grasshopper." },
              { front: "Frog → snake", back: "The snake swallows the frog." },
              { front: "Snake → hawk", back: "The hawk swoops down and catches the snake. Nothing in the meadow hunts the hawk." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put this pond food chain in order, from where the energy starts to the top predator.",
            steps: ["The Sun", "Algae (tiny green living things in the water)", "Tadpole", "Small fish", "Heron"],
            hint: "Start with where all the energy comes from, then the thing that makes food, then who eats whom.",
            mistakes: [
              { match: "Heron first", coach: "The heron is at the top because it eats the others. Food chains start with the Sun and a producer." },
              { match: "Tadpole before algae", coach: "Tadpoles eat algae, so the algae must come first in the chain." },
            ],
            seconds: 35,
          },
          think: {
            q: "In grass → rabbit → fox, what does the arrow from rabbit to fox mean?",
            choices: [
              "The rabbit eats the fox",
              "Energy moves from the rabbit to the fox when the fox eats it",
              "The fox and rabbit live in the same den",
              "The rabbit runs toward the fox",
            ],
            answer: 1,
            why: "Food chain arrows point from the food to the eater, showing the way the energy flows.",
            hints: [
              "The arrow points from the food to the eater. Rabbits eat plants, not foxes.",
              "",
              "Food chain arrows aren't about homes. They show who eats whom.",
              "The arrow isn't about running. It shows where the energy goes.",
            ],
          },
          approaches: {
            analogy:
              "A food chain is like passing a bucket of water down a line of people. The water (energy) starts at the well (the Sun) and moves from person to person, and the arrows show which way the bucket is passed.",
            example:
              "Ocean food chain: Sun → tiny ocean plants called phytoplankton → tiny animals called krill → a small fish → a seal. The seal gets energy that started as sunlight, passed along through every link in the chain.",
            simpler: {
              q: "Every food chain starts with...",
              choices: ["a hawk", "a decomposer", "the Sun and a producer"],
              answer: 2,
              why: "The Sun gives energy to producers, and every other living thing in the chain depends on them.",
              hints: [
                "A hawk is usually at the top of the chain, not the start.",
                "Decomposers break down things at the end. The energy starts somewhere else.",
                "",
              ],
            },
          },
        },
        {
          title: "Food Webs and Energy",
          teach:
            "In real life, most animals eat more than one thing, and many animals may eat them. When we connect lots of food chains, we get a food web. Energy gets smaller at each step. A rabbit uses most of the energy from the grass it eats just to hop, stay warm and grow. Only about one tenth gets passed on to the fox that eats it. That is why an ecosystem needs lots of grass, fewer rabbits and only a few foxes. If one living thing disappears, the whole web feels it.",
          visual: {
            type: "hotspots",
            title: "Energy shrinks at each step",
            center: "Meadow",
            spots: [
              { label: "Sun", icon: "☀️", detail: "Where the energy starts." },
              { label: "Grass", icon: "🌱", detail: "Holds 1,000 units of energy from the Sun." },
              { label: "Rabbits", icon: "🐇", detail: "Get about 100 units, one tenth of the grass's energy." },
              { label: "Foxes", icon: "🦊", detail: "Get about 10 units, one tenth of the rabbits' energy." },
              { label: "Food web", icon: "🕸️", detail: "Many food chains linked together, because most animals eat more than one thing." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Grass in a field holds 1,000 units of energy. About one tenth passes to the rabbits that eat it, and about one tenth of THAT passes to the foxes that eat the rabbits. How many units reach the foxes?",
            answer: 10,
            tolerance: 0,
            unit: "units",
            hint: "Find one tenth of 1,000 for the rabbits. Then find one tenth of that number for the foxes.",
            mistakes: [
              { match: "100", coach: "100 units is what the rabbits get. The foxes only get one tenth of the rabbits' energy." },
              { match: "900", coach: "That's how much energy the rabbits did NOT get. Find one tenth, then one tenth again." },
              { match: "1000", coach: "That's the grass's energy. Only a small part moves up each step." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why are there far fewer foxes than rabbits in a meadow?",
            choices: [
              "Foxes are lazy",
              "Rabbits eat foxes",
              "Foxes do not need energy",
              "Only about a tenth of the energy passes up each step",
            ],
            answer: 3,
            why: "Since so little energy reaches the top of the chain, there is only enough to feed a few foxes.",
            hints: [
              "Foxes work hard to hunt. The real reason has to do with how much energy reaches them.",
              "Rabbits are herbivores. They eat plants, not foxes.",
              "Every living thing needs energy, foxes included.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Energy in a food chain is like a pizza passed down a line where each person eats nine slices out of every ten. Lots of pizza at the start means just a few bites at the end.",
            example:
              "A field of clover holds 5,000 units of energy. Rabbits eating it get about one tenth: 500 units. Foxes eating rabbits get about one tenth of that: 50 units. So it takes a lot of clover and rabbits to feed one fox family.",
            simpler: {
              q: "A food web is made of...",
              choices: ["many food chains linked together", "one single animal", "only plants"],
              answer: 0,
              why: "A food web connects many food chains, because most animals eat more than one thing.",
              hints: [
                "",
                "One animal alone can't make a web. A web connects many living things.",
                "Plants are part of a food web, but so are the animals that eat them.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Producer, consumer or decomposer? Sort each living thing.",
        buckets: ["Producer", "Consumer", "Decomposer"],
        items: [
          { text: "A sunflower", bucket: 0 },
          { text: "A maple tree", bucket: 0 },
          { text: "A robin", bucket: 1 },
          { text: "A cow", bucket: 1 },
          { text: "A shark", bucket: 1 },
          { text: "Bacteria breaking down a dead leaf", bucket: 2 },
          { text: "Mold growing on old bread", bucket: 2 },
          { text: "A mushroom on a rotting stump", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Pick a food chain you could find in a backyard or park. Explain where the energy starts and how it moves from one living thing to the next.",
        keyPoints: [
          "The energy starts with the Sun",
          "A producer, like a plant, makes food from sunlight",
          "Consumers get energy by eating plants or other animals",
          "Decomposers break down dead things and return nutrients to the soil",
        ],
      },
      mastery: [
        {
          type: "build",
          prompt: "Build a forest food chain, starting where the energy begins.",
          tiles: ["Sun →", "oak tree (acorns) →", "squirrel →", "fox"],
          distractors: ["rock →"],
          hint: "Start with the energy source, then the producer, then who eats whom.",
          mistakes: [
            { match: "Used 'rock →'", coach: "A rock is nonliving. It doesn't pass energy along in a food chain." },
            { match: "Fox before squirrel", coach: "The fox eats the squirrel, so energy goes from the squirrel to the fox." },
          ],
          seconds: 30,
        },
        {
          type: "match",
          prompt: "Match each living thing to its role.",
          pairs: [
            { left: "A maple tree", right: "Producer: makes its own food" },
            { left: "A deer", right: "Herbivore: eats only plants" },
            { left: "A hawk", right: "Carnivore: eats other animals" },
            { left: "A black bear", right: "Omnivore: eats plants and animals" },
            { left: "A mushroom", right: "Decomposer: breaks down dead things" },
          ],
          hint: "Ask how each one gets its energy: sunlight, plants, animals, both, or dead things.",
          mistakes: [
            { match: "Bear matched to carnivore", coach: "Bears also eat lots of berries, nuts and roots. Eating both makes them omnivores." },
            { match: "Mushroom matched to producer", coach: "Mushrooms can't use sunlight to make food. They break down dead things." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "A field of clover holds 5,000 units of energy. Rabbits that eat the clover get about one tenth of it. How many units reach the rabbits?",
          answer: 500,
          tolerance: 0,
          unit: "units",
          hint: "One tenth means divide by 10.",
          mistakes: [
            { match: "50", coach: "That's one tenth of one tenth, the amount a fox would get. The rabbits are only one step up." },
            { match: "4500", coach: "That's the energy the rabbits do NOT get. Find one tenth of 5,000." },
          ],
          seconds: 30,
        },
        {
          type: "highlight",
          prompt: "Meadow food chain: grass → grasshopper → frog → snake → hawk. If all the snakes disappeared, tap every sentence that would likely happen.",
          sentences: [
            "Frogs would increase, because fewer of them are being eaten.",
            "Hawks would have less food to eat.",
            "Hawks would have more food than before.",
            "Frogs would disappear too, because snakes feed them.",
            "The grass would stop needing sunlight.",
          ],
          correct: [0, 1],
          hint: "Follow the arrows. Who ate the snakes, and who did the snakes eat?",
          mistakes: [
            { match: "Tapped 'Hawks would have more food'", coach: "Snakes were food for the hawks. With no snakes, hawks lose a food source." },
            { match: "Tapped 'Frogs would disappear too'", coach: "Snakes eat frogs; they don't feed them. Fewer snakes means more frogs survive." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which of these is a producer?",
          choices: ["A fox", "A mushroom", "An apple tree", "A frog"],
          answer: 2,
          why: "An apple tree makes its own food from sunlight, water and air.",
        },
        {
          q: "An animal that eats both plants and animals is called a...",
          choices: ["herbivore", "omnivore", "carnivore", "producer"],
          answer: 1,
          why: "Omnivores, like bears and raccoons, eat both plants and animals.",
        },
        {
          q: "In a food chain, which way do the arrows point?",
          choices: [
            "From the eater to the food",
            "From the biggest animal to the smallest",
            "In a circle",
            "From the food to the eater, the way energy flows",
          ],
          answer: 3,
          why: "Arrows show energy moving from the thing being eaten to the thing that eats it.",
        },
        {
          q: "What do decomposers do?",
          choices: [
            "Break down dead things and return nutrients to the soil",
            "Make food from sunlight",
            "Hunt other animals",
            "Make rain",
          ],
          answer: 0,
          why: "Decomposers like mushrooms, worms and bacteria are nature's recyclers.",
        },
        {
          q: "About how much energy passes from one step of a food chain to the next?",
          choices: ["All of it", "About half", "About one tenth"],
          answer: 2,
          why: "Each living thing uses most of its energy to live and grow, so only about one tenth passes on.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Backyard ecosystem survey. With a parent, choose a small patch of yard, garden or park. Use string or four sticks to mark a square about 1 meter on each side. Look, but don't touch any insects, mushrooms or plants you don't know, and wash your hands when you're done. Steps: 1) Spend 20 minutes observing your square. A magnifying glass helps. 2) List every living thing you find (plants, insects, worms, birds that land, mushrooms) and every nonliving thing (sunlight, rocks, soil, water). 3) Label each living thing as a producer, consumer or decomposer. 4) Draw at least one food chain with arrows, using living things from your square or animals that visit it. 5) Write 2-3 sentences: what would happen to your square if one living thing disappeared?",
        rubric: [
          "At least 5 living and 3 nonliving things listed",
          "Living things correctly labeled as producers, consumers or decomposers",
          "A food chain drawn that starts with the Sun and has arrows pointing from food to eater",
          "Explains how losing one living thing would affect the others",
        ],
      },
    },

    // 5. Rocks, weathering and erosion
    {
      id: "science-45.earth",
      title: "Our Changing Earth: Rocks, Weathering and Erosion",
      minutes: 30,
      stage: "grammar",
      read: [
        "Rocks seem like they last forever, but Earth's surface is always slowly changing. Geologists, the scientists who study rocks and the Earth, sort rocks into three families by how they formed.",
        "Igneous rock forms when melted rock cools and hardens. Melted rock underground is called magma; when it pours out of a volcano, it is called lava. Granite and shiny black obsidian are igneous rocks. Sedimentary rock forms when layers of sand, mud and bits of shell are pressed and cemented together over a very long time. Sandstone and limestone are sedimentary, and they often hold fossils. Metamorphic rock forms when heat and pressure deep underground change one kind of rock into another. Limestone can become marble, and shale can become slate.",
        "Weathering is the slow breaking of rock into smaller pieces. Water is the champion. Rain seeps into a crack in a rock, and when the water freezes, it expands and pushes the crack wider. Winter after winter, the rock splits. Plant roots can pry cracks open too.",
        "Erosion is what carries the broken pieces away. Moving water is the biggest mover, but wind, ice and gravity move rock too. Rivers drag sand and pebbles downstream. Wind blows sand across deserts. Glaciers, huge rivers of ice, grind and push rocks as they slide. When the water or wind slows down, it drops its load. That is called deposition. Over time, layers of dropped sand and mud can harden into new sedimentary rock.",
        "Give weathering and erosion millions of years, and you get the Grand Canyon in Arizona. The Colorado River cut down through layer after layer of rock to carve a canyon more than a mile deep. Its walls show stripes of rock layers. In layers that have not been flipped or folded, the bottom layers are the oldest, because they were laid down first.",
      ].join("\n\n"),
      keyIdeas: [
        "Rocks come in three families: igneous, sedimentary and metamorphic.",
        "Weathering breaks rock into pieces; erosion carries the pieces away; deposition drops them somewhere new.",
        "In undisturbed rock layers, the bottom layers are the oldest.",
      ],
      hook: {
        text: "Stand at the edge of the Grand Canyon and look down. More than a mile below you, a thin ribbon of river winds along the bottom. That river, the Colorado, helped carve the whole canyon. No bulldozers, no dynamite, just water, sand and a very, very long time. How can something as soft as water cut through solid rock?",
      },
      teach: [
        {
          title: "Three Families of Rock",
          teach:
            "Geologists, the scientists who study rocks and the Earth, sort rocks into three families by how they formed. Igneous rock forms when melted rock cools and hardens. Granite and shiny black obsidian are igneous. Sedimentary rock forms when layers of sand, mud and shells get pressed and cemented together over a very long time. Sandstone and limestone are sedimentary, and they often hold fossils. Metamorphic rock forms when heat and pressure deep underground change one rock into a new one. Limestone can become marble this way.",
          visual: {
            type: "flip",
            cards: [
              { front: "Igneous", back: "Formed when melted rock cools and hardens. Examples: granite, obsidian." },
              { front: "Sedimentary", back: "Formed from layers of sand, mud and shells pressed together. Examples: sandstone, limestone." },
              { front: "Metamorphic", back: "Formed when heat and pressure change an old rock. Examples: marble, slate." },
              { front: "Magma and lava", back: "Melted rock. Magma is underground; lava is melted rock that has come out of a volcano." },
              { front: "Fossil", back: "The remains or print of an ancient living thing, preserved in rock." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each word to how it formed or what it is.",
            pairs: [
              { left: "Igneous rock", right: "Melted rock cooled and hardened" },
              { left: "Sedimentary rock", right: "Layers of sand and mud pressed together" },
              { left: "Metamorphic rock", right: "Heat and pressure changed an old rock" },
              { left: "Fossil", right: "Remains of an ancient living thing in rock" },
            ],
            hint: "Igneous comes from fire and melting, sedimentary from layers, and metamorphic from changing.",
            mistakes: [
              { match: "Swapped igneous and metamorphic", coach: "Both involve heat, but igneous rock was fully melted first. Metamorphic rock was squeezed and heated without melting." },
              { match: "Swapped sedimentary and fossil", coach: "Sedimentary is a family of rock. A fossil is something you might find inside it." },
            ],
            seconds: 40,
          },
          think: {
            q: "A rock has visible layers and a fossil seashell inside. Which family is it most likely from?",
            choices: ["Igneous", "Metamorphic", "Sedimentary", "None; rocks never hold fossils"],
            answer: 2,
            why: "Sedimentary rock builds up in layers, often trapping shells and other remains that become fossils.",
            hints: [
              "Igneous rock was once melted, which would destroy a seashell.",
              "Heat and pressure in metamorphic rock usually squash or erase fossils.",
              "",
              "Many rocks do hold fossils. Think about which family forms in layers.",
            ],
          },
          approaches: {
            analogy:
              "Think of rocks like foods. Igneous is like melted chocolate that cooled hard. Sedimentary is like a layered sandwich pressed flat. Metamorphic is like bread squished in a hot panini press until it becomes something new.",
            example:
              "Pick up a piece of sandstone and rub it: grains of sand rub off, because it is made of sand cemented together (sedimentary). Obsidian is smooth, black and glassy, because lava cooled very fast (igneous). Marble in a statue started as limestone, then heat and pressure changed it (metamorphic).",
            simpler: {
              q: "Igneous rock forms when...",
              choices: ["sand blows away", "melted rock cools and hardens", "plants grow on it"],
              answer: 1,
              why: "Igneous rock starts as magma or lava and hardens as it cools.",
              hints: [
                "Sand blowing away is erosion, not the way rocks form.",
                "",
                "Plants can grow on rocks, but that doesn't make a rock.",
              ],
            },
          },
        },
        {
          title: "Weathering: Breaking Rock Apart",
          teach:
            "Weathering is the slow breaking of rock into smaller pieces. Water is the champion. Rain trickles into a crack in a rock. When it freezes, water expands, which means it takes up more space. The ice pushes the crack wider. Then it melts, more water seeps in, and it freezes again, winter after winter, until the rock splits. Plant roots can grow into cracks and pry them open too. Look at an old sidewalk near your home. If you see cracks with weeds poking through, that is weathering in action.",
          visual: {
            type: "hotspots",
            title: "Ways rock breaks apart",
            center: "Rock",
            spots: [
              { label: "Freezing water", icon: "🧊", detail: "Water expands when it freezes, pushing cracks wider each winter." },
              { label: "Plant roots", icon: "🌱", detail: "Roots grow into cracks and slowly pry them open." },
              { label: "Rain", icon: "🌧️", detail: "Rain slowly wears away and dissolves some rocks, like limestone." },
              { label: "Blowing sand", icon: "💨", detail: "Wind-blown sand scrapes and smooths rock, like sandpaper." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the steps of ice breaking a rock in order.",
            steps: [
              "Rain trickles into a crack in a rock",
              "The temperature drops below freezing",
              "The water freezes and expands",
              "The ice pushes the crack wider",
              "The ice melts and more water seeps in",
              "After many winters, the rock splits apart",
            ],
            hint: "Water has to get into the crack before it can freeze, and the rock splits only after many rounds.",
            mistakes: [
              { match: "Splits before freezing", coach: "The rock can't split until ice has pushed on the crack, over and over." },
              { match: "Freezes before rain", coach: "There has to be water in the crack before it can freeze." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why does freezing water break rocks?",
            choices: [
              "Ice is sharp like a knife",
              "Cold weather makes rock soft",
              "Water expands when it freezes and pushes the crack wider",
              "Ice is heavier than rock",
            ],
            answer: 2,
            why: "Freezing water takes up more space, so ice in a crack acts like a wedge.",
            hints: [
              "Ice doesn't cut rock. It pushes from inside the crack.",
              "Cold doesn't soften rock. The ice inside the crack does the work.",
              "",
              "Ice is actually lighter than water and rock. That's why ice cubes float.",
            ],
          },
          approaches: {
            analogy:
              "Ice in a crack is like a door stopper being pushed in a little harder every winter. Each push opens the gap a bit more, until the rock finally splits.",
            example:
              "Fill a small plastic container to the very top with water, snap on the lid, and freeze it overnight. In the morning the ice bulges up and may even pop the lid. Water takes up more space as ice, and that same push can split rocks.",
            simpler: {
              q: "Weathering means rock is...",
              choices: ["broken into smaller pieces", "melted into lava", "turned into a plant"],
              answer: 0,
              why: "Weathering breaks rock into smaller and smaller pieces.",
              hints: [
                "",
                "Melting into lava happens deep underground or in volcanoes, not from weather.",
                "Rocks don't turn into plants, though plant roots can help break them.",
              ],
            },
          },
        },
        {
          title: "Erosion and Deposition: Moving the Pieces",
          teach:
            "Weathering breaks rock. Erosion is what carries the pieces away. Moving water is the biggest mover. Rivers drag sand and pebbles downstream, and the gritty water scrapes the riverbed deeper. Wind blows sand across deserts. Huge rivers of ice called glaciers grind and push rocks as they slide. Gravity pulls rocks downhill in landslides. When the water or wind slows down, it drops its load. That is called deposition. Over time, those dropped layers of sand and mud can harden into new sedimentary rock.",
          visual: {
            type: "compare",
            left: { title: "Weathering", points: ["Breaks rock into pieces", "Rock stays in place", "Ice in cracks, plant roots"] },
            right: { title: "Erosion", points: ["Carries pieces away", "Rock moves to a new place", "Rivers, wind, glaciers, gravity"] },
          },
          probe: {
            type: "sort",
            prompt: "Weathering, erosion or deposition? Sort each event.",
            buckets: ["Weathering (breaking)", "Erosion (carrying away)", "Deposition (dropping)"],
            items: [
              { text: "Ice splits a boulder", bucket: 0 },
              { text: "Tree roots crack a sidewalk", bucket: 0 },
              { text: "A river carries sand downstream", bucket: 1 },
              { text: "Wind blows sand across a desert", bucket: 1 },
              { text: "A glacier drags rocks down a valley", bucket: 1 },
              { text: "A river drops mud where it slows down at a lake", bucket: 2 },
              { text: "Sand piles up where the wind slows behind a fence", bucket: 2 },
            ],
            hint: "Breaking happens in place. Carrying means moving. Dropping happens where the water or wind slows down.",
            mistakes: [
              { match: "Ice split sorted as erosion", coach: "Splitting a boulder breaks it, but the pieces haven't gone anywhere yet. That's weathering." },
              { match: "River drops mud sorted as erosion", coach: "When the river slows and drops its mud, that's deposition, the end of the trip." },
            ],
            seconds: 50,
          },
          think: {
            q: "What is the difference between weathering and erosion?",
            choices: [
              "Weathering breaks rock; erosion carries the pieces away",
              "They are exactly the same thing",
              "Erosion breaks rock; weathering carries it away",
              "Weathering only happens in summer",
            ],
            answer: 0,
            why: "Weathering is the breaking; erosion is the moving.",
            hints: [
              "",
              "They're partners, but they do different jobs: one breaks and one moves.",
              "You have them backward. Weathering is the breaking part.",
              "Weathering happens all year, and ice in cracks does its work in winter.",
            ],
          },
          approaches: {
            analogy:
              "Weathering is like smashing a cookie into crumbs. Erosion is like sweeping the crumbs across the table. Deposition is the little pile of crumbs where the sweeping stops.",
            example:
              "After a heavy rain, look at the bottom of a dirt hill or a sloped garden bed. Muddy water carried soil downhill (erosion), and where the water slowed down at the flat ground, it left a fan of mud and sand behind (deposition).",
            simpler: {
              q: "Which is an example of erosion?",
              choices: ["Ice cracking a rock", "A plant growing", "A river carrying sand downstream"],
              answer: 2,
              why: "Erosion means moving rock pieces, and the river is carrying sand away.",
              hints: [
                "Cracking a rock is weathering. The pieces haven't moved yet.",
                "A plant growing isn't moving any rock pieces.",
                "",
              ],
            },
          },
        },
        {
          title: "Canyons, Layers and Deep Time",
          teach:
            "Put weathering and erosion together, give them millions of years, and you get the Grand Canyon. The Colorado River slowly cut down through layer after layer of rock, carrying the broken bits away. Today the canyon walls show stripes of rock layers, like a giant stack of paper seen from the side. In layers that were never flipped or folded, the bottom layers are the oldest, because they were laid down first. The top layers are the youngest. Reading the layers is like reading Earth's history book.",
          visual: {
            type: "hotspots",
            title: "Reading a canyon wall",
            center: "Canyon",
            spots: [
              { label: "Top layers", icon: "⬆️", detail: "The youngest rock, laid down last." },
              { label: "Middle layers", icon: "↕️", detail: "Older than the top, younger than the bottom." },
              { label: "Bottom layers", icon: "⬇️", detail: "The oldest rock, laid down first." },
              { label: "Fossils", icon: "🐚", detail: "Some Grand Canyon layers hold fossils of ancient sea creatures." },
              { label: "The river", icon: "🏞️", detail: "The Colorado River keeps cutting deeper, carrying sand and rock away." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Suppose a river cuts its canyon about 1 centimeter deeper every 100 years. How many centimeters deeper will it be after 1,000 years?",
            answer: 10,
            tolerance: 0,
            unit: "cm",
            hint: "How many groups of 100 years fit into 1,000 years? Each group adds 1 centimeter.",
            mistakes: [
              { match: "1000", coach: "That would be 1 centimeter every single year. It's 1 centimeter every 100 years." },
              { match: "100", coach: "100 is the number of years for 1 centimeter. Count how many 100-year groups are in 1,000." },
            ],
            seconds: 30,
          },
          think: {
            q: "In a cliff whose layers were never flipped, which layer is oldest?",
            choices: ["The top layer", "The middle layer", "The bottom layer", "They are all the same age"],
            answer: 2,
            why: "Layers pile up one on top of another, so the bottom one was laid down first.",
            hints: [
              "The top layer was laid down last, so it is the youngest.",
              "The middle layer has older layers beneath it.",
              "",
              "Layers build up over a very long time, one after another, so they have different ages.",
            ],
          },
          approaches: {
            analogy:
              "Rock layers are like a pile of laundry on your bed. The shirt you tossed on Monday is at the bottom; Friday's socks are on top. The bottom of the pile is the oldest.",
            example:
              "Make layers in a clear jar: pour in a scoop of sand, then soil, then small pebbles, then more sand. The first scoop you poured is at the bottom. If you didn't know the order, you could still figure it out: bottom layer first, top layer last.",
            simpler: {
              q: "When you stack papers one at a time, which page went down first?",
              choices: ["The bottom one", "The top one", "The middle one"],
              answer: 0,
              why: "Each new page goes on top, so the first page is at the bottom.",
              hints: [
                "",
                "The top page went down last, after all the others.",
                "The middle page had pages placed both before and after it.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Follow a grain of sand from a mountaintop to a new rock. Put the steps in order.",
        steps: [
          "A granite boulder sits high on a mountain",
          "Ice in its cracks breaks off a small piece (weathering)",
          "Rain washes the piece into a stream (erosion)",
          "The stream tumbles it until it is a tiny grain of sand",
          "The river slows at a lake and drops the sand (deposition)",
          "Layers pile up and press the sand into sandstone",
        ],
      },
      explain: {
        prompt: "Explain how a river could carve a canyon. Use the words weathering, erosion and deposition.",
        keyPoints: [
          "Weathering breaks rock into smaller pieces",
          "Erosion carries the pieces away, mostly by moving water",
          "Deposition drops the pieces where the water slows down",
          "It takes a very long time, often millions of years",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Sort each rock into its family.",
          buckets: ["Igneous", "Sedimentary", "Metamorphic"],
          items: [
            { text: "Granite: formed from cooled magma", bucket: 0 },
            { text: "Obsidian: shiny black glass from lava", bucket: 0 },
            { text: "Sandstone: sand grains cemented together", bucket: 1 },
            { text: "Limestone full of seashell fossils", bucket: 1 },
            { text: "Marble: limestone changed by heat and pressure", bucket: 2 },
            { text: "Slate: shale squeezed by heat and pressure", bucket: 2 },
          ],
          hint: "Melted and cooled is igneous. Layers and grains are sedimentary. Changed by heat and pressure is metamorphic.",
          mistakes: [
            { match: "Marble sorted as sedimentary", coach: "Marble started as limestone, but heat and pressure changed it. That makes it metamorphic." },
            { match: "Obsidian sorted as metamorphic", coach: "Obsidian formed when lava cooled very fast. Cooled melted rock is igneous." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Breaking rock into smaller pieces is called {0}. Carrying the pieces away is called {1}. Dropping them in a new place is called {2}.",
          blanks: [{ answers: ["weathering"] }, { answers: ["erosion"] }, { answers: ["deposition"] }],
          bank: ["weathering", "erosion", "deposition", "melting", "evaporation"],
          hint: "Breaking, then carrying, then dropping: the three steps that reshape the land.",
          mistakes: [
            { match: "melting", coach: "Melting turns a solid into a liquid. Rocks breaking into pieces is weathering." },
            { match: "evaporation", coach: "Evaporation is water turning into vapor. It doesn't move rock pieces." },
          ],
          seconds: 30,
        },
        {
          type: "number",
          prompt: "At the bottom of a lake, about 2 millimeters of mud settles each year. How many millimeters thick will the new layer be after 50 years?",
          answer: 100,
          tolerance: 0,
          unit: "mm",
          hint: "The layer grows by the same amount every year. Multiply the yearly amount by the number of years.",
          mistakes: [
            { match: "52", coach: "That adds 2 and 50. The mud piles up 2 millimeters EVERY year, so multiply." },
            { match: "25", coach: "That divides. The layer gets thicker each year, so multiply 2 by 50." },
          ],
          seconds: 30,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that describes EROSION, rock or soil being carried away.",
          sentences: [
            "A muddy river carries soil downstream.",
            "Ice freezes in a crack and splits a rock.",
            "A strong wind blows sand off a beach.",
            "A glacier drags boulders down a valley.",
            "Tree roots pry apart a sidewalk.",
            "Rain washes dirt off a hillside after a storm.",
          ],
          correct: [0, 2, 3, 5],
          hint: "Erosion means moving. Breaking without moving is weathering.",
          mistakes: [
            { match: "Tapped the ice in a crack", coach: "Ice splitting a rock is breaking it in place. That's weathering, not erosion." },
            { match: "Tapped the tree roots", coach: "Roots crack the sidewalk but don't carry anything away. That's weathering." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which rock family forms when melted rock cools and hardens?",
          choices: ["Sedimentary", "Igneous", "Metamorphic"],
          answer: 1,
          why: "Igneous rock forms from cooled magma or lava, like granite and obsidian.",
        },
        {
          q: "Which is an example of weathering?",
          choices: [
            "A river carrying pebbles downstream",
            "Wind blowing sand across a desert",
            "A glacier sliding down a valley",
            "Water freezing in a crack and splitting a rock",
          ],
          answer: 3,
          why: "Freezing water breaks the rock in place. That is weathering.",
        },
        {
          q: "What carved the Grand Canyon?",
          choices: [
            "The Colorado River, over millions of years",
            "A giant earthquake in one day",
            "People digging with machines",
            "A meteor hitting the ground",
          ],
          answer: 0,
          why: "The Colorado River slowly cut down through the rock while erosion carried the pieces away.",
        },
        {
          q: "Where are fossils most often found?",
          choices: ["In igneous rock", "In lava", "In sedimentary rock", "Inside glaciers"],
          answer: 2,
          why: "Sedimentary rock forms in layers that can trap and preserve shells, bones and plants.",
        },
        {
          q: "In rock layers that were never flipped, which layer is the youngest?",
          choices: ["The bottom layer", "The middle layer", "The top layer", "All the same"],
          answer: 2,
          why: "The top layer was laid down last, so it is the youngest.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Make an erosion tray. Do this outside, or in a bathtub or big sink, with a parent. Materials: a baking pan or plastic storage bin, sand or garden soil, a book or block to tilt the pan, a cup with a few small holes poked in the bottom by a parent (or a watering can), water, and a handful of grass clumps, leaves or small sticks. Steps: 1) Fill the pan with damp sand or soil and pat it smooth. 2) Prop up one end so the pan tilts. 3) Write a prediction: what will the water do to the sand? 4) Slowly sprinkle water at the high end and watch. Draw what you see: channels, moved sand, and where the sand piles up. 5) Smooth the sand again. This time press grass clumps or leaves into half of the slope, then repeat the same amount of water. 6) Compare the two halves and explain your results using the words erosion and deposition.",
        rubric: [
          "Prediction written before pouring any water",
          "Drawings show channels and where the sand was dropped",
          "Fair comparison: same tilt and same amount of water both times",
          "Explains results using the words erosion and deposition, including how plants affected the sand",
        ],
      },
    },
  ],
};
