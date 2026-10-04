import type { Course } from "./types";

export const science: Course = {
  id: "science",
  title: "Science Lab",
  icon: "🔬",
  hue: 160,
  track: "academic",
  subject: "Science",
  blurb:
    "Ask questions, run fair tests, and discover how forces, energy, machines, cells and the sky really work.",
  teacher: {
    name: "Dr. Newton",
    avatar: "🍎",
    inspiredBy: "Isaac Newton, who explained motion and gravity",
    voice:
      "Curious and precise. Always asks 'how could we test that?' and loves surprising experiments.",
  },
  lessons: [
    // 1. The scientific method
    {
      id: "science.method",
      title: "The Scientific Method: How to Run a Fair Test",
      minutes: 30,
      stage: "grammar",
      read: [
        "Long ago, many people believed that flies simply appeared out of rotting meat. It seemed obvious: leave meat out, and soon it crawls with maggots. In 1668 an Italian doctor named Francesco Redi decided to test the idea instead of just accepting it. He put pieces of meat into several jars. Some jars he left open. Others he covered with fine gauze, so air could get in but flies could not. Maggots showed up only on the meat that flies could reach. Redi had shown that maggots come from eggs laid by flies, not from the meat itself.",
        "Redi was using what we now call the scientific method. It starts with a question, such as: which brand of paper towel soaks up the most water? Next comes a hypothesis, which is a testable prediction, often written as an if-then sentence: if I test three brands, then Brand A will hold the most water because it feels thickest.",
        "Every experiment has variables, things that can change. The independent variable is the one thing you change on purpose, like the brand of towel. The dependent variable is what you measure to see the effect, like how many milliliters of water each towel holds. The controlled variables are everything you keep the same: the size of each towel, the amount of water, the time it soaks. In Redi's test, the independent variable was the cover on the jar, and the dependent variable was whether maggots appeared.",
        "A fair test changes only one variable at a time. If you used a big sheet of one brand and a small sheet of another, you could not tell whether the brand or the size made the difference. Scientists also repeat trials, because one result could be a fluke.",
        "Finally, you record your data carefully, often in a table, and draw a conclusion. Did the data support your hypothesis or not? Either answer is useful. A hypothesis that turns out wrong still teaches you something true about the world.",
      ].join("\n\n"),
      keyIdeas: [
        "A hypothesis is a testable prediction, not a wild guess.",
        "Change one independent variable, measure the dependent variable, and keep everything else controlled.",
        "Repeat trials and record data so your conclusion rests on evidence.",
      ],
      check: [
        {
          q: "What did Francesco Redi's covered jars show?",
          choices: [
            "Meat turns into flies when it rots",
            "Maggots come from eggs laid by flies",
            "Gauze makes meat spoil faster",
            "Air causes maggots to grow",
          ],
          answer: 1,
          why: "Maggots appeared only where flies could reach the meat, so they came from fly eggs.",
        },
        {
          q: "In a paper towel test, the brand of towel you choose to test is the...",
          choices: ["Dependent variable", "Controlled variable", "Independent variable"],
          answer: 2,
          why: "The independent variable is the one thing you change on purpose.",
        },
        {
          q: "Which of these is a hypothesis?",
          choices: [
            "If I use warmer water, then the sugar will dissolve faster.",
            "Sugar is sweet.",
            "What dissolves sugar?",
            "I measured 40 seconds.",
          ],
          answer: 0,
          why: "A hypothesis is a testable prediction, often written as an if-then statement.",
        },
        {
          q: "Why should you keep the size of each paper towel the same?",
          choices: [
            "Bigger towels are more expensive",
            "So that only the brand could cause any difference",
            "Because the rules say so",
            "So the experiment finishes faster",
          ],
          answer: 1,
          why: "Keeping size controlled makes it a fair test, so only the brand is being compared.",
        },
        {
          q: "Your data does NOT support your hypothesis. What should you do?",
          choices: [
            "Change the numbers so it fits",
            "Throw the experiment away",
            "Pretend you predicted the other result",
            "Report it honestly; you still learned something",
          ],
          answer: 3,
          why: "An unsupported hypothesis is still a real result and a useful discovery.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Run a fair test: which paper towel holds the most water? Ask an adult to help and supervise, and work over a tray or sink. Materials: 2 or 3 different paper towel brands (or paper towel, napkin, and tissue), scissors, a ruler, a measuring cup or kitchen measuring spoons, water, a bowl, and paper for notes. Steps: 1) Write your question and your hypothesis BEFORE you start. 2) Name your independent, dependent, and controlled variables. 3) Cut each towel into a square of the same size (for example 10 cm by 10 cm). 4) Pour the same amount of water into the bowl for each trial. Dip one square for 10 seconds, lift it out, and let it drip for 5 seconds. 5) Measure how much water is left in the bowl and subtract to find how much the towel held. 6) Do 3 trials for each type and record everything in a table. 7) Find the average for each type and write a conclusion: was your hypothesis supported?",
        rubric: [
          "Hypothesis written as a testable prediction before testing began",
          "Independent, dependent, and controlled variables named correctly, with only one variable changed",
          "Data recorded in a table with 3 trials per towel and an average",
          "Conclusion states whether the data supported the hypothesis and why",
        ],
      },
    },

    // 2. Forces and Newton's laws
    {
      id: "science.forces",
      title: "Forces and Newton's Three Laws",
      minutes: 30,
      stage: "logic",
      read: [
        "A force is a push or a pull. Gravity pulls you toward the ground, friction slows a sliding book, and your foot pushes a soccer ball. Forces are measured in newtons, a unit named after Isaac Newton, who published his three laws of motion in 1687 in a book called the Principia.",
        "Newton built on the work of Galileo Galilei. Falling objects moved too fast for Galileo to time well, so he rolled balls down gentle ramps, timing them with a water clock. He found that the balls sped up steadily as they rolled, and he reasoned that a ball on a perfectly smooth, level surface would keep rolling forever. That idea became the heart of Newton's first law.",
        "Newton's first law, the law of inertia, says an object at rest stays at rest, and an object in motion keeps moving at the same speed in the same direction, unless an unbalanced force acts on it. When a bus stops suddenly, your body keeps moving forward. That is inertia. A rolling ball eventually stops on the grass only because friction is acting on it.",
        "The second law says that force equals mass times acceleration, or F = ma. Acceleration means a change in speed or direction. Push an empty shopping cart and a full one with the same force, and the empty cart speeds up much more, because it has less mass. To make a heavy object accelerate as fast as a light one, you need more force.",
        "The third law says that for every action there is an equal and opposite reaction. Forces always come in pairs. When you jump off a skateboard, you push the board backward and it pushes you forward. A rocket pushes hot gas down, and the gas pushes the rocket up. Even when you sit in a chair, you push down on it and it pushes up on you with the same force.",
        "Put the three laws together and you can explain almost every motion you see, from a thrown baseball to a planet circling the Sun.",
      ].join("\n\n"),
      keyIdeas: [
        "First law: objects keep doing what they are doing unless an unbalanced force acts (inertia).",
        "Second law: F = ma, so more mass needs more force for the same acceleration.",
        "Third law: forces come in equal and opposite pairs.",
      ],
      check: [
        {
          q: "When a car brakes hard, your body lurches forward. Which law explains this?",
          choices: ["Newton's first law", "Newton's second law", "Newton's third law"],
          answer: 0,
          why: "Your body has inertia and keeps moving forward when the car stops.",
        },
        {
          q: "You push an empty wagon and a wagon full of bricks with the same force. What happens?",
          choices: [
            "Both speed up equally",
            "The full wagon speeds up more",
            "The empty wagon speeds up more",
            "Neither moves at all",
          ],
          answer: 2,
          why: "By F = ma, the same force gives a smaller mass a larger acceleration.",
        },
        {
          q: "A rocket rises because...",
          choices: [
            "It pushes gas down and the gas pushes it up",
            "Air is lighter than the rocket",
            "Gravity turns off in space",
            "The rocket has no mass",
          ],
          answer: 0,
          why: "Newton's third law: the rocket and the exhaust push on each other in opposite directions.",
        },
        {
          q: "Why did Galileo roll balls down ramps instead of dropping them?",
          choices: [
            "Ramps were more fun",
            "Dropped balls moved too fast to time accurately",
            "Gravity does not work on falling balls",
            "He had no balls small enough to drop",
          ],
          answer: 1,
          why: "A gentle ramp slows the motion down so it can be measured.",
        },
        {
          q: "A ball rolling on grass slows down and stops. What caused it to stop?",
          choices: [
            "It ran out of inertia",
            "Objects naturally want to stop",
            "Its mass disappeared",
            "Friction, an unbalanced force, acted on it",
          ],
          answer: 3,
          why: "By the first law, a moving object only slows when a force like friction acts on it.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Test how ramp height affects how far a toy car rolls. Have an adult supervise, and clear a safe floor space away from stairs. Materials: a toy car, a stiff board or large hardcover book to use as a ramp, a stack of books, a tape measure, masking tape, and paper for notes. Steps: 1) Write your prediction first: how will raising the ramp change the distance? 2) Name your variables: ramp height is independent, distance rolled is dependent; keep the same car, same ramp, same floor, and same release point (just let go, do not push). 3) Set the ramp on 1 book, mark the bottom of the ramp with tape, release the car from the top, and measure from the tape to where the car stops. 4) Do 3 trials, then repeat with 2 books and 3 books. 5) Record all data in a table and find the average for each height. 6) Write a conclusion using Newton's laws: what force made the car speed up, and what force finally stopped it?",
        rubric: [
          "Prediction written before testing",
          "Fair test: only ramp height changed, car released the same way each time",
          "Data table with 3 trials per height and averages",
          "Conclusion explains results using gravity, friction, and inertia",
        ],
      },
    },

    // 3. Energy
    {
      id: "science.energy",
      title: "Energy: Stored, Moving, and Never Lost",
      minutes: 30,
      stage: "logic",
      read: [
        "Energy is the ability to make things move or change. It comes in many forms, but two are especially important for moving objects. Kinetic energy is the energy of motion. A rolling bowling ball, a flying bird, and a running dog all have kinetic energy, and the faster and heavier something is, the more it has. Potential energy is stored energy. A book on a high shelf has gravitational potential energy because gravity could pull it down. A stretched rubber band and a wound-up spring store elastic potential energy.",
        "Energy is always changing from one form to another. Picture a roller coaster. As the chain lifts the car to the top of the first hill, it gains potential energy. As it plunges down, that potential energy turns into kinetic energy and the car speeds up. Climbing the next hill, kinetic energy turns back into potential energy and the car slows.",
        "In the 1840s, an English scientist named James Prescott Joule wanted to know if motion and heat were connected. He built a device in which a falling weight turned a paddle wheel inside a container of water. The churning paddles warmed the water by a tiny but measurable amount. Joule showed that a certain amount of motion always produced the same amount of heat. Today the unit of energy, the joule, is named after him.",
        "Joule's work helped prove the law of conservation of energy: energy cannot be created or destroyed, only changed from one form to another. So why does a roller coaster need that first big hill, and why does a dropped ball never bounce back to its starting height? Because with every bounce or bump, some energy turns into heat and sound. The energy is not gone. It has just spread out into forms that are hard to use.",
        "Look around and you will see transformations everywhere: chemical energy in food becomes motion in your muscles, and electrical energy becomes light in a lamp.",
      ].join("\n\n"),
      keyIdeas: [
        "Kinetic energy is energy of motion; potential energy is stored energy.",
        "Energy changes form but is never created or destroyed.",
        "Some energy always spreads out as heat and sound, which is why bounces get lower.",
      ],
      check: [
        {
          q: "A book sitting on a high shelf has mostly which kind of energy?",
          choices: ["Kinetic energy", "Gravitational potential energy", "Sound energy"],
          answer: 1,
          why: "It is not moving, but gravity could pull it down, so its energy is stored.",
        },
        {
          q: "As a roller coaster car races down a hill, its potential energy changes mostly into...",
          choices: ["Kinetic energy", "Chemical energy", "Nothing; it disappears", "Elastic energy"],
          answer: 0,
          why: "Losing height turns stored energy into energy of motion, so the car speeds up.",
        },
        {
          q: "What did Joule's paddle wheel experiment show?",
          choices: [
            "Water cannot be heated",
            "Paddle wheels create energy",
            "Heat and motion have nothing in common",
            "Motion can be turned into a predictable amount of heat",
          ],
          answer: 3,
          why: "The falling weight's motion warmed the water by a consistent, measurable amount.",
        },
        {
          q: "Why doesn't a dropped ball bounce back to its starting height?",
          choices: [
            "Some of its energy becomes heat and sound",
            "Energy is destroyed when it hits the floor",
            "Gravity gets stronger after each bounce",
            "The ball loses mass",
          ],
          answer: 0,
          why: "Energy is conserved, but some of it changes into heat and sound with each bounce.",
        },
        {
          q: "Which statement matches the law of conservation of energy?",
          choices: [
            "Energy is used up and vanishes",
            "Machines can create extra energy",
            "Energy changes form but the total stays the same",
            "Only moving objects have energy",
          ],
          answer: 2,
          why: "Energy cannot be created or destroyed, only transformed.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Investigate how drop height affects bounce height. Have an adult supervise, and never stand on a chair or anything wobbly to reach a height. Materials: a bouncy ball (or tennis ball), a tape measure or meter stick taped upright against a wall, a helper, a phone camera if available (slow motion helps), and paper for notes. Steps: 1) Write your prediction first: if you drop the ball from higher, how high will it bounce, and will it ever bounce back to where it started? 2) Keep the same ball, same hard floor, and drop it straight (do not throw it). 3) Drop from 50 cm, 75 cm, and 100 cm. For each height, do 3 trials and have your helper read the top of the bounce (or record video and pause it). 4) Record your data in a table and find the average bounce for each drop height. 5) Calculate the bounce as a percent of the drop height. 6) Write a conclusion: explain where the ball's energy went using the words potential, kinetic, heat, and sound.",
        rubric: [
          "Prediction written before testing",
          "Fair test: same ball and floor, ball dropped not thrown, only height changed",
          "Data table with 3 trials per height, averages, and bounce percentages",
          "Conclusion explains energy transformations and conservation of energy",
        ],
      },
    },

    // 4. Simple machines
    {
      id: "science.machines",
      title: "Simple Machines and Mechanical Advantage",
      minutes: 35,
      stage: "logic",
      read: [
        "More than 2,200 years ago, the Greek thinker Archimedes studied levers so carefully that he is said to have boasted, give me a place to stand and I will move the Earth. He understood a powerful secret: with the right tool, a small force can move a large load.",
        "Those tools are called simple machines, and there are six classic kinds. A lever is a stiff bar that pivots on a point called the fulcrum, like a seesaw or a crowbar. A pulley is a wheel with a rope around it, used to lift flags and heavy loads. A wheel and axle is a large wheel joined to a smaller rod, like a doorknob or a steering wheel. An inclined plane is a ramp. A wedge is two ramps joined together, like an axe blade or a doorstop. A screw is an inclined plane wrapped around a post, like the threads on a jar lid.",
        "Simple machines do not create energy. Instead, they trade distance for force. Pushing a heavy box up a long ramp takes less force than lifting it straight up, but you have to push it farther. The work done comes out about the same.",
        "The number that tells how much a machine multiplies your force is its mechanical advantage. For a lever, a balanced lever follows this rule: effort force times effort distance equals load force times load distance. Imagine a rock that weighs 100 newtons sitting 20 centimeters from the fulcrum. If you push down 80 centimeters from the fulcrum on the other side, you need only 25 newtons, because 25 times 80 equals 100 times 20. The mechanical advantage is 80 divided by 20, which is 4. You push with one quarter of the force, but your end of the lever moves four times as far.",
        "Most complicated machines, from bicycles to cranes, are built by combining these six simple ones.",
      ].join("\n\n"),
      keyIdeas: [
        "The six simple machines are the lever, pulley, wheel and axle, inclined plane, wedge, and screw.",
        "Machines trade distance for force; they do not create energy.",
        "For a lever, effort x effort distance = load x load distance, and mechanical advantage = effort distance / load distance.",
      ],
      check: [
        {
          q: "What is the pivot point of a lever called?",
          choices: ["The axle", "The fulcrum", "The wedge", "The thread"],
          answer: 1,
          why: "A lever turns around a fixed point called the fulcrum.",
        },
        {
          q: "A screw is really which simple machine wrapped around a post?",
          choices: ["A pulley", "A lever", "An inclined plane"],
          answer: 2,
          why: "The threads of a screw are a long ramp wound in a spiral.",
        },
        {
          q: "A 60 N load sits 10 cm from the fulcrum. You push 30 cm from the fulcrum. How much force do you need?",
          choices: ["20 N", "180 N", "60 N", "30 N"],
          answer: 0,
          why: "60 x 10 = 600, and 600 / 30 = 20 N.",
        },
        {
          q: "A ramp lets you move a heavy box with less force. What is the trade-off?",
          choices: [
            "The box gets heavier",
            "There is no trade-off",
            "You must push it over a longer distance",
            "Gravity stops working on the box",
          ],
          answer: 2,
          why: "Simple machines trade force for distance; the work stays about the same.",
        },
        {
          q: "An axe blade splitting wood is an example of a...",
          choices: ["Pulley", "Wheel and axle", "Screw", "Wedge"],
          answer: 3,
          why: "A wedge is two inclined planes back to back that push material apart.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Build a lever and test the lever rule. Ask an adult to supervise. Materials: a 30 cm ruler, a pencil or round marker for the fulcrum, about 15 identical coins (pennies work well), tape, and paper for notes. Steps: 1) Lay the pencil on a table and balance the ruler across it at the 15 cm mark. This is your fulcrum. 2) Write your prediction first: if you stack 6 coins 5 cm from the fulcrum, how many coins will you need 10 cm from the fulcrum on the other side to balance it? 3) Stack 6 coins on one side, 5 cm from the fulcrum (the 10 cm mark). Add coins one at a time on the other side, 10 cm from the fulcrum (the 25 cm mark), until the ruler balances. Record the number. 4) Keep the 6-coin load in the same spot and repeat with the effort coins 5 cm from the fulcrum (the 20 cm mark) and 15 cm from the fulcrum (the 30 cm mark, the very end). Tape the stacks if they slide. 5) Record a table: load coins, load distance, effort coins, effort distance. 6) Check each row: does load x load distance roughly equal effort x effort distance? Calculate the mechanical advantage and write a conclusion.",
        rubric: [
          "Prediction written before testing",
          "Fair test: same coins, same load position, only effort distance changed",
          "Data table with distances and coin counts for each trial",
          "Conclusion compares results to the lever rule and states the mechanical advantage",
        ],
      },
    },

    // 5. Cells
    {
      id: "science.cells",
      title: "Cells: The Building Blocks of Life",
      minutes: 30,
      stage: "grammar",
      read: [
        "In 1665, an English scientist named Robert Hooke looked at a thin slice of cork through a microscope he had improved himself. He saw rows of tiny empty boxes that reminded him of the small rooms monks lived in, called cells. The name stuck. Hooke was actually seeing the walls of dead plant cells. A few years later, a Dutch cloth merchant named Antonie van Leeuwenhoek ground his own powerful lenses and became the first person to see living single-celled creatures swimming in a drop of pond water.",
        "Today we know that the cell is the basic unit of life. Every living thing is made of one or more cells. Bacteria are just one cell each, while your body contains trillions of them. All cells come from other cells that already existed.",
        "Cells contain tiny working parts called organelles. The cell membrane is a thin, flexible layer that surrounds the cell and controls what goes in and out, a bit like a security gate. The nucleus holds the cell's DNA, the instructions for building and running the cell. Mitochondria break down sugar to release energy the cell can use, which is why they are often called the powerhouses of the cell. Jelly-like cytoplasm fills the cell and holds the organelles in place.",
        "Plant and animal cells share all of those parts, but plant cells have some extras. A plant cell has a stiff cell wall outside its membrane, which gives it a boxy shape and helps plants stand upright. Plant cells also have chloroplasts, green organelles that capture sunlight and use it to make sugar through photosynthesis. Most plant cells have a large central vacuole that stores water. Animal cells have no cell wall and no chloroplasts, so they are usually rounder and must get their food by eating.",
        "Every time you eat, breathe, or grow, trillions of tiny cells are doing the work.",
      ].join("\n\n"),
      keyIdeas: [
        "The cell is the basic unit of life, and all living things are made of cells.",
        "Key organelles: membrane (gatekeeper), nucleus (instructions), mitochondria (energy).",
        "Plant cells also have a cell wall, chloroplasts, and a large vacuole; animal cells do not.",
      ],
      check: [
        {
          q: "What did Robert Hooke actually see when he looked at cork?",
          choices: [
            "Living bacteria",
            "The walls of dead plant cells",
            "Animal cells",
            "Chloroplasts making sugar",
          ],
          answer: 1,
          why: "Cork is dead plant tissue, so Hooke saw the empty boxes left by the cell walls.",
        },
        {
          q: "Which organelle holds the cell's DNA instructions?",
          choices: ["Mitochondria", "Cell wall", "Nucleus", "Vacuole"],
          answer: 2,
          why: "The nucleus stores DNA, which directs the cell's activities.",
        },
        {
          q: "Which part is found in plant cells but NOT in animal cells?",
          choices: ["Chloroplast", "Cell membrane", "Mitochondria", "Nucleus"],
          answer: 0,
          why: "Chloroplasts capture sunlight for photosynthesis, which animal cells cannot do.",
        },
        {
          q: "What job do mitochondria do?",
          choices: [
            "Control what enters the cell",
            "Make the cell stiff",
            "Store water",
            "Release energy from sugar",
          ],
          answer: 3,
          why: "Mitochondria break down sugar to release usable energy for the cell.",
        },
        {
          q: "What does the cell membrane do?",
          choices: [
            "Captures sunlight",
            "Controls what goes in and out of the cell",
            "Stores the DNA",
          ],
          answer: 1,
          why: "The membrane acts like a gatekeeper around every cell.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Imagine a cell is a factory or a city. Write two or three paragraphs explaining how it works. Choose a real part of your factory or city for each organelle: the nucleus, the cell membrane, the mitochondria, and the cytoplasm. Then explain what changes if your cell is a PLANT cell: what would the cell wall and the chloroplasts be in your factory or city? For each comparison, say why it fits by describing what the organelle really does.",
        rubric: [
          "Includes the nucleus, membrane, mitochondria, and cytoplasm with a matching factory or city part",
          "Explains the plant-only parts (cell wall and chloroplasts) and how plant and animal cells differ",
          "Each comparison is justified with the organelle's real job, stated accurately",
          "Writing is organized into clear paragraphs with complete sentences",
        ],
      },
    },

    // 6. Earth and space
    {
      id: "science.space",
      title: "Earth and Space: Seasons and Moon Phases",
      minutes: 35,
      stage: "rhetoric",
      read: [
        "Our solar system is the Sun and everything that orbits it. Closest to the Sun are four small, rocky planets: Mercury, Venus, Earth, and Mars. Beyond them, past the asteroid belt, are four giant planets: Jupiter, Saturn, Uranus, and Neptune. Earth takes one year to travel around the Sun and one day to spin once on its axis.",
        "Many people think summer happens when Earth is closest to the Sun. But here is a surprising fact: Earth is actually closest to the Sun in early January, during winter in the Northern Hemisphere. Distance is not the cause of the seasons. The real reason is that Earth's axis is tilted about 23.5 degrees, and it stays pointed the same way in space all year. For part of the orbit, the Northern Hemisphere leans toward the Sun. Sunlight hits it more directly, concentrating energy on each patch of ground, and days are longer. That is summer. Six months later, the Northern Hemisphere leans away, sunlight strikes at a low slant and spreads out, and days are short. That is winter. This also explains why Australia has summer while the United States has winter.",
        "About 2,200 years ago, a Greek scholar named Eratosthenes used sunlight to measure the whole Earth. He learned that at noon on a midsummer day, the Sun shone straight down a well in the city of Syene, but in Alexandria, farther north, a stick still cast a short shadow. Using the angle of that shadow and the distance between the cities, he calculated Earth's circumference, and his answer was remarkably close.",
        "The Moon makes no light of its own. It reflects sunlight, and the Sun always lights up half of it. As the Moon orbits Earth, about once every 29.5 days, we see different amounts of that lit half. At new moon, the lit side faces away from us. Then come crescent, first quarter, gibbous, and full moon, and the cycle runs back again. Phases are not caused by Earth's shadow; that only happens during a lunar eclipse.",
      ].join("\n\n"),
      keyIdeas: [
        "Seasons are caused by Earth's 23.5 degree axial tilt, not its distance from the Sun.",
        "Direct sunlight and longer days make summer; slanted light and short days make winter.",
        "Moon phases happen because we see different amounts of the Moon's sunlit half as it orbits Earth.",
      ],
      check: [
        {
          q: "What is the main cause of Earth's seasons?",
          choices: [
            "Earth's changing distance from the Sun",
            "The Sun getting hotter and cooler",
            "The tilt of Earth's axis",
            "The Moon blocking sunlight",
          ],
          answer: 2,
          why: "The tilt changes how directly sunlight hits each hemisphere and how long days are.",
        },
        {
          q: "When it is summer in the Northern Hemisphere, what season is it in Australia?",
          choices: ["Winter", "Summer", "Spring"],
          answer: 0,
          why: "When the north leans toward the Sun, the south leans away, so the seasons are opposite.",
        },
        {
          q: "Why does the Moon have phases?",
          choices: [
            "Earth's shadow covers part of it each night",
            "The Moon makes its own light that dims",
            "Clouds hide parts of it",
            "We see different amounts of its sunlit half as it orbits",
          ],
          answer: 3,
          why: "Half the Moon is always lit; its position around Earth changes how much we see.",
        },
        {
          q: "How did Eratosthenes measure the size of Earth?",
          choices: [
            "By sailing all the way around it",
            "By comparing noon shadows in two cities a known distance apart",
            "By timing a solar eclipse",
            "By looking through a telescope",
          ],
          answer: 1,
          why: "The difference in shadow angles plus the distance between cities let him calculate the circumference.",
        },
        {
          q: "Which of these is a rocky inner planet?",
          choices: ["Jupiter", "Neptune", "Mars", "Saturn"],
          answer: 2,
          why: "Mercury, Venus, Earth, and Mars are the four small rocky planets.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Build a model to explain seasons OR moon phases, then teach it to someone. Have an adult supervise, and use a lamp with a shade removed only if an adult says it is safe; never touch a hot bulb. Materials: a lamp (the Sun), a ball or orange with a pencil pushed through it (Earth with its axis) or a ball on a stick (the Moon), a marker, and a dark room. Seasons option: 1) Write your prediction first: when the top of the ball leans toward the lamp, which half gets more direct light? 2) Mark your home on the ball. Tilt the pencil about 23 degrees and keep it pointed at the same wall the whole time. 3) Walk the ball in a circle around the lamp, stopping at 4 positions. At each, note how direct the light is on your mark. Moon phases option: 1) Write your prediction first: where must the Moon be for a full moon? 2) Stand facing the lamp, hold the ball at arm's length slightly above your head, and turn slowly in a circle. 3) Stop at 8 positions and sketch the lit shape you see. For either option, record your observations in a table or drawings, then explain the result out loud to a family member using your model.",
        rubric: [
          "Prediction written before building the model",
          "Model set up correctly (axis tilt kept pointing one way, or Moon moved around the viewer)",
          "Observations recorded at each position in a table or labeled sketches",
          "Conclusion clearly explains the real cause (tilt, or the lit half we can see) and corrects a common misconception",
        ],
      },
    },
  ],
};
