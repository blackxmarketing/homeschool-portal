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
      hook: {
        text: "In 1668, almost everyone was sure that rotting meat simply turned into flies. One doctor, Francesco Redi, refused to just believe it and set up a few jars to find out. A simple fair test overturned an idea people had trusted for thousands of years.",
      },
      teach: [
        {
          title: "Questions and Hypotheses",
          teach:
            "Science starts with a question you can actually test, like: does warm water dissolve sugar faster than cold water? A hypothesis is your best testable prediction about the answer, usually written as an if-then sentence: if I stir sugar into warm water, then it will dissolve faster than in cold water, because warm water molecules move faster. A hypothesis is not a wild guess. It is based on something you already know, and an experiment must be able to prove it wrong. 'Sugar is delicious' is an opinion, not a hypothesis, because no measurement could test it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Question", back: "Something you wonder about that an experiment could answer." },
              { front: "Hypothesis", back: "A testable prediction, often written as if-then-because." },
              { front: "Data", back: "The measurements and observations you record during the test." },
              { front: "Conclusion", back: "What the data shows, and whether it supports your hypothesis." },
            ],
          },
          think: {
            q: "Which of these is a testable hypothesis?",
            choices: [
              "Plants are beautiful.",
              "If a plant gets more sunlight, then it will grow taller in two weeks.",
              "Why do plants grow?",
              "My plant is 12 cm tall.",
            ],
            answer: 1,
            why: "It is a prediction written as if-then, and measuring plant height could prove it right or wrong.",
            hints: [
              "That is an opinion. A hypothesis has to be something an experiment could prove right or wrong, and no ruler can measure beauty.",
              "",
              "That is a question, which is where science starts. A hypothesis is the predicted answer to a question.",
              "That is a measurement, a piece of data. A hypothesis is a prediction you make before you measure.",
            ],
          },
          approaches: {
            analogy:
              "A hypothesis is like calling your shot in a game of pool. Before you hit, you say which ball goes in which pocket. Then the result shows clearly whether you were right. Saying 'something will happen' after the fact proves nothing.",
            example:
              "Question: does a ball bounce higher on concrete or on carpet? Hypothesis: if I drop the same ball from 1 meter onto concrete and onto carpet, then it will bounce higher on concrete, because soft carpet absorbs more energy. You can test this by measuring each bounce with a meter stick.",
            simpler: {
              q: "A hypothesis is best described as...",
              choices: ["A testable prediction", "A fact everyone agrees on", "A random guess"],
              answer: 0,
              why: "A hypothesis predicts a result that an experiment can check.",
              hints: [
                "",
                "Facts are things we already know. A hypothesis is a prediction we have not tested yet.",
                "A hypothesis is based on what you already know, not pulled out of thin air, and it must be testable.",
              ],
            },
          },
        },
        {
          title: "Three Kinds of Variables",
          teach:
            "A variable is anything in an experiment that can change. The independent variable is the one thing you change on purpose. The dependent variable is what you measure, because it depends on what you changed. Controlled variables are all the things you keep the same so they cannot affect the result. Suppose you test whether water temperature changes how fast sugar dissolves. Water temperature is independent. The time it takes to dissolve is dependent. The amount of water, amount of sugar, cup, and stirring are all controlled. A memory trick: I change the Independent; the Dependent is the Data I collect.",
          visual: {
            type: "sort",
            prompt: "Sugar test: does water temperature change how fast sugar dissolves? Sort each variable.",
            buckets: ["Independent (I change it)", "Dependent (I measure it)", "Controlled (I keep it the same)"],
            items: [
              { text: "Water temperature", bucket: 0 },
              { text: "Seconds until the sugar disappears", bucket: 1 },
              { text: "200 mL of water every time", bucket: 2 },
              { text: "One teaspoon of sugar each trial", bucket: 2 },
              { text: "The same cup for every trial", bucket: 2 },
              { text: "Stirring 10 times", bucket: 2 },
            ],
          },
          think: {
            q: "You test whether the number of hours of light changes how tall bean plants grow. What is the dependent variable?",
            choices: ["Hours of light", "Height of the plants", "Type of soil", "Size of the pot"],
            answer: 1,
            why: "Plant height is what you measure, and it depends on the hours of light you chose.",
            hints: [
              "Hours of light is what you change on purpose, so it is the independent variable. The dependent variable is the result you measure.",
              "",
              "Soil type should be kept the same for every plant. That makes it a controlled variable.",
              "Pot size should stay the same so it cannot affect growth. That makes it a controlled variable.",
            ],
          },
          approaches: {
            analogy:
              "Think of a video game settings menu. The independent variable is the one slider you move. The dependent variable is what changes on screen when you move it. Controlled variables are all the other sliders you leave alone, so you know exactly which slider caused the change.",
            example:
              "Test: does ramp height change how far a toy car rolls? Independent: ramp height (10 cm, 20 cm, 30 cm). Dependent: distance rolled, measured in centimeters. Controlled: same car, same ramp board, same floor, and the car is released without a push.",
            simpler: {
              q: "The independent variable is the one you...",
              choices: ["Measure at the end", "Change on purpose", "Keep the same"],
              answer: 1,
              why: "You choose and change the independent variable yourself.",
              hints: [
                "What you measure is the dependent variable, because it depends on what you changed.",
                "",
                "Things you keep the same are controlled variables.",
              ],
            },
          },
        },
        {
          title: "Why Change Only One Thing?",
          teach:
            "A fair test changes only one variable at a time. Imagine testing two paper towel brands, but you use a big sheet of Brand A and a small sheet of Brand B. Brand A soaks up more water. Was it the brand or the size? You cannot tell, because two things changed at once. A hidden difference like this muddies the result. Redi's experiment worked because the only difference between his jars was the cover. Everything else matched: the same kind of meat, the same jars, the same room. So when maggots appeared only in the open jars, the cover was the only possible explanation.",
          visual: {
            type: "compare",
            left: {
              title: "Fair test",
              points: [
                "Both towels cut to 10 cm by 10 cm",
                "Same amount of water each time",
                "Same soaking time",
                "Only the brand is different",
              ],
            },
            right: {
              title: "Unfair test",
              points: [
                "Brand A is big, Brand B is small",
                "Different amounts of water",
                "One soaks longer than the other",
                "Cannot tell what caused the difference",
              ],
            },
          },
          think: {
            q: "Maya tests whether fertilizer helps plants grow. She gives fertilizer to a plant on a sunny windowsill and no fertilizer to a plant in a dark closet. What is wrong?",
            choices: [
              "Nothing; it is a fair test",
              "She should have used three fertilizers",
              "Two variables changed: fertilizer and light",
              "Plants do not need light",
            ],
            answer: 2,
            why: "Light and fertilizer both changed, so she cannot tell which one caused any difference in growth.",
            hints: [
              "Look at everything that differs between the two plants. If more than one thing changed, the test is not fair.",
              "More fertilizers would not fix the problem. The issue is that the amount of light is different too.",
              "",
              "Plants do need light, and that is exactly the problem: one plant got much more light, so light could explain the difference.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a race where one runner wears new sneakers and also starts 10 meters ahead. If that runner wins, was it the sneakers or the head start? To judge the sneakers fairly, everyone must start at the same line.",
            example:
              "Unfair: a Brand A sheet is 20 cm by 20 cm and a Brand B sheet is 10 cm by 10 cm. Brand A holds 40 mL and Brand B holds 12 mL, but Brand A also had 4 times the area. Fair: cut both to 10 cm by 10 cm. If Brand A now holds 11 mL and Brand B holds 12 mL, you know the brand made only a small difference.",
            simpler: {
              q: "In a fair test, how many variables do you change on purpose?",
              choices: ["One", "Two", "As many as possible"],
              answer: 0,
              why: "Changing just one variable means only that variable can explain the result.",
              hints: [
                "",
                "If two things change, you cannot tell which one caused the result.",
                "Changing many things at once makes it impossible to know what caused the result.",
              ],
            },
          },
        },
        {
          title: "Trials, Data, and Conclusions",
          teach:
            "One trial can be a fluke. A towel might tear, or you might spill a little water. That is why scientists repeat each test, often three times or more, and find the average: add the results and divide by how many there are. Record everything in a data table as you go, not from memory later. Then write a conclusion: did the data support your hypothesis? If not, that is still a real result. A wrong hypothesis teaches you something true, and it often leads to a better question. Changing your data to fit your prediction is never acceptable.",
          visual: {
            type: "sequence",
            prompt: "Put the steps of the scientific method in order.",
            steps: [
              "Ask a question",
              "Find out what is already known",
              "Write a hypothesis",
              "Plan a fair test and name the variables",
              "Run repeated trials and record data",
              "Analyze the data and draw a conclusion",
            ],
          },
          think: {
            q: "A towel holds 10 mL, 12 mL, and 14 mL in three trials. What is the average?",
            choices: ["36 mL", "14 mL", "10 mL", "12 mL"],
            answer: 3,
            why: "10 + 12 + 14 = 36, and 36 divided by 3 trials is 12 mL.",
            hints: [
              "36 mL is the total. To get the average, divide the total by the number of trials, 3.",
              "14 mL is the largest result, not the average. Add all three and divide by 3.",
              "10 mL is the smallest result. The average sits in the middle: add all three and divide by 3.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Judging a basketball player by one shot would be unfair; anyone can miss once or get lucky once. Coaches watch many shots to see the real skill. Repeated trials do the same thing for an experiment.",
            example:
              "Three warm-water sugar trials take 30, 34, and 32 seconds. Total: 30 + 34 + 32 = 96, so the average is 96 / 3 = 32 seconds. Cold-water trials of 60, 58, and 62 seconds average 180 / 3 = 60 seconds. The data supports the hypothesis that warm water dissolves sugar faster.",
            simpler: {
              q: "Why do scientists repeat trials?",
              choices: ["To use up materials", "Because one result could be a fluke", "To make the experiment longer"],
              answer: 1,
              why: "Repeating catches mistakes and odd results, so the conclusion is more trustworthy.",
              hints: [
                "Repeating is not about using things up. Think about what could go wrong in just one try.",
                "",
                "A longer experiment is not the goal. Repeating catches mistakes and odd results.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Leo is testing paper towels. Tap every sentence that describes a CONTROLLED variable.",
        sentences: [
          "Leo wondered which paper towel brand absorbs the most water.",
          "He cut every towel into a 10 cm by 10 cm square.",
          "He tested Brand A, Brand B, and Brand C.",
          "Each square soaked in 100 mL of water for exactly 10 seconds.",
          "He measured how many milliliters of water each towel held.",
          "He let each towel drip for 5 seconds before measuring.",
        ],
        correct: [1, 3, 5],
      },
      explain: {
        prompt: "Explain how to make an experiment a fair test, as if you were teaching a younger student.",
        keyPoints: [
          "Change only one variable (the independent variable) on purpose",
          "Measure the result (the dependent variable)",
          "Keep everything else the same (controlled variables)",
          "Repeat trials and record the data honestly",
        ],
      },
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
      hook: {
        text: "If you slid a hockey puck across perfectly smooth ice that went on forever, it would never stop. Galileo figured this out about 400 years ago using nothing but balls, ramps, and a water clock.",
        visual: { type: "ramp" },
      },
      teach: [
        {
          title: "What Is a Force?",
          teach:
            "A force is a push or a pull. Forces can start something moving, stop it, speed it up, slow it down, or change its direction. Gravity pulls everything toward Earth. Friction pushes against motion when surfaces rub together. A magnet can pull a paperclip without even touching it. We measure forces in newtons (N); holding a medium apple takes about 1 newton. When the forces on an object are balanced, like two equal teams in a tug of war, its motion does not change. When they are unbalanced, the object speeds up, slows down, or turns.",
          visual: {
            type: "flip",
            cards: [
              { front: "Force", back: "A push or a pull." },
              { front: "Newton (N)", back: "The unit of force. Holding a medium apple takes about 1 N." },
              { front: "Friction", back: "A force that pushes against motion when surfaces rub." },
              { front: "Gravity", back: "The pull that draws objects toward each other, like you toward Earth." },
              { front: "Unbalanced force", back: "When forces do not cancel out, so the motion changes." },
            ],
          },
          think: {
            q: "In a tug of war, Team A pulls with 500 N one way and Team B pulls with 500 N the other way. The rope starts still. What happens?",
            choices: ["It moves toward Team A", "It stays where it is", "It moves toward Team B", "It breaks immediately"],
            answer: 1,
            why: "Equal and opposite pulls are balanced forces, and balanced forces do not change motion.",
            hints: [
              "Team A pulls exactly as hard as Team B. Equal pulls in opposite directions cancel out, so there is no unbalanced force.",
              "",
              "Team B is not pulling any harder. When forces are balanced, the motion does not change.",
              "The question is about motion. Balanced pulls cause no change in motion; whether a rope breaks depends on how strong it is.",
            ],
          },
          approaches: {
            analogy:
              "Think of forces as votes for which way an object should move. If the votes on each side are equal, nothing changes. If one side gets more votes, the object moves that way.",
            example:
              "A box sits on the floor. You push it right with 30 N and friction pushes left with 30 N, so it does not move. Push with 50 N instead and the unbalanced force is 50 - 30 = 20 N to the right, so the box starts to speed up.",
            simpler: {
              q: "A force is...",
              choices: ["A push or a pull", "Energy stored in food", "How fast something moves"],
              answer: 0,
              why: "Every force is a push or a pull on an object.",
              hints: [
                "",
                "Energy in food is chemical energy, not a force. A force acts on an object as a push or pull.",
                "That is speed. A force is what can change an object's speed.",
              ],
            },
          },
        },
        {
          title: "The First Law: Inertia",
          teach:
            "Newton's first law says an object at rest stays at rest, and a moving object keeps moving at the same speed in the same direction, unless an unbalanced force acts on it. This tendency to keep doing what it is already doing is called inertia. On Earth, moving things usually stop, so people once thought stopping was natural. Galileo realized friction was the hidden force doing the stopping. In space, with almost nothing to slow it, the Voyager 1 probe has coasted outward for decades without its engines pushing it along. More mass means more inertia, which is why a loaded truck is harder to start and stop than a bicycle.",
          visual: { type: "ramp" },
          think: {
            q: "A soccer ball rolls across a field and slowly stops. Why?",
            choices: [
              "It ran out of force",
              "Friction from the grass and air acted on it",
              "Objects naturally want to stop",
              "Gravity pushed it backward",
            ],
            answer: 1,
            why: "Friction is an unbalanced force against the motion, so the ball slows down and stops.",
            hints: [
              "A moving object does not carry a supply of force that runs out. It keeps moving unless a force acts on it.",
              "",
              "That was the old idea before Galileo. Objects only slow down when a force, like friction, acts on them.",
              "Gravity pulls down, not backward along flat ground. The backward force here is friction.",
            ],
          },
          approaches: {
            analogy:
              "Inertia is like a sleepy cat on a couch: it stays put until something moves it, and once it is sprinting across the room, it is hard to stop. Objects resist changes to their motion in the same way.",
            example:
              "Put an index card on top of a cup and a coin on the card. Flick the card quickly sideways. The card flies off, but the coin's inertia keeps it from moving sideways, so it drops straight into the cup when gravity pulls it down.",
            simpler: {
              q: "Inertia means an object tends to...",
              choices: ["Keep doing what it is already doing", "Always slow down", "Speed up by itself"],
              answer: 0,
              why: "Inertia is resistance to any change in motion.",
              hints: [
                "",
                "Slowing down needs a force, such as friction. Without one, a moving object keeps going.",
                "Objects do not speed up on their own. A force is needed to change speed.",
              ],
            },
          },
        },
        {
          title: "The Second Law: F = ma",
          teach:
            "Newton's second law connects force, mass, and acceleration: force equals mass times acceleration, or F = ma. Acceleration means any change in speed or direction. The law tells us two things. First, a bigger force gives a bigger acceleration: kick a ball harder and it speeds up more. Second, more mass means less acceleration for the same force: an empty shopping cart zooms off when you push it, but a full cart barely gets going. With numbers: a 10 N force on a 2 kg cart gives an acceleration of 10 divided by 2, which is 5 meters per second, every second.",
          visual: {
            type: "compare",
            left: {
              title: "Empty cart (10 kg)",
              points: ["Push: 20 N", "Acceleration: 20 / 10 = 2 m/s each second", "Easy to start and stop"],
            },
            right: {
              title: "Full cart (40 kg)",
              points: ["Push: 20 N", "Acceleration: 20 / 40 = 0.5 m/s each second", "Hard to start and stop"],
            },
          },
          think: {
            q: "You push a 4 kg wagon with 12 N of unbalanced force. What is its acceleration?",
            choices: ["48 m/s each second", "8 m/s each second", "3 m/s each second", "16 m/s each second"],
            answer: 2,
            why: "Rearrange F = ma to a = F / m: 12 / 4 = 3 m/s each second.",
            hints: [
              "That is 12 times 4. Acceleration is force divided by mass: a = F / m.",
              "That is 12 minus 4. Use division: acceleration equals force divided by mass.",
              "",
              "That is 12 plus 4. Rearrange F = ma to a = F / m, then divide.",
            ],
          },
          approaches: {
            analogy:
              "Throw a tennis ball and a bowling ball with the same arm effort. The tennis ball leaves your hand much faster. Same force, less mass, more acceleration.",
            example:
              "A 50 kg skateboarder and a 25 kg kid on a skateboard each get the same 100 N push. Skateboarder: 100 / 50 = 2 m/s each second. Kid: 100 / 25 = 4 m/s each second. Half the mass means twice the acceleration.",
            simpler: {
              q: "You give a light cart and a heavy cart the same push. Which speeds up more?",
              choices: ["The heavy cart", "The light cart", "They speed up equally"],
              answer: 1,
              why: "With the same force, less mass means more acceleration.",
              hints: [
                "More mass resists changes in motion, so the heavy cart speeds up less.",
                "",
                "They would only match if their masses matched. The cart with less mass accelerates more.",
              ],
            },
          },
        },
        {
          title: "The Third Law: Forces Come in Pairs",
          teach:
            "Newton's third law says that for every action force there is an equal and opposite reaction force. Forces always come in pairs acting on two different objects. When you swim, your hands push water backward and the water pushes you forward. When a rocket fires, it pushes hot gas downward and the gas pushes the rocket upward. That is why rockets work in empty space; they do not need air to push against. Even sitting still involves a pair: you push down on the chair, and the chair pushes up on you. The two forces are equal in size, but they can have very different effects on objects with different masses.",
          visual: {
            type: "flip",
            cards: [
              { front: "You push on a wall", back: "The wall pushes back on you with the same force." },
              { front: "A swimmer pushes water backward", back: "The water pushes the swimmer forward." },
              { front: "A rocket pushes gas down", back: "The gas pushes the rocket up." },
              { front: "Your feet push the ground backward", back: "The ground pushes you forward, so you can walk." },
            ],
          },
          think: {
            q: "A small car bumps into a big truck. Which is true about the forces during the crash?",
            choices: [
              "The truck pushes harder on the car",
              "The car pushes harder on the truck",
              "They push on each other with equal force",
              "Only the truck exerts a force",
            ],
            answer: 2,
            why: "Action and reaction forces are always equal. The car is affected more because it has less mass.",
            hints: [
              "It feels like the bigger object should push harder, but the third law says the pair of forces is always equal. The car is damaged more because it has less mass, not because the force on it is bigger.",
              "The car does not push harder. The pair of forces is equal; the effects differ because the masses differ.",
              "",
              "Forces always come in pairs. If the truck pushes on the car, the car pushes back on the truck.",
            ],
          },
          approaches: {
            analogy:
              "Two friends on roller skates face each other and one gives a push. Both roll apart, not just the one who got pushed, because a push always works in both directions.",
            example:
              "Blow up a balloon and let it go without tying it. The balloon squeezes air out the back, and the air pushes the balloon forward, so it zips across the room. Tape the balloon to a straw threaded on a string and you have a mini rocket on a track.",
            simpler: {
              q: "When you jump forward off a skateboard, the skateboard...",
              choices: ["Rolls backward", "Stays perfectly still", "Rolls forward with you"],
              answer: 0,
              why: "You push the board backward, and it pushes you forward: an action-reaction pair.",
              hints: [
                "",
                "Your feet push on the board, and that push makes it move. It cannot stay still.",
                "You push the board backward, so it moves the opposite way from you.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which of Newton's laws best explains each event?",
        buckets: ["First law (inertia)", "Second law (F = ma)", "Third law (action-reaction)"],
        items: [
          { text: "Passengers lurch forward when a bus stops suddenly", bucket: 0 },
          { text: "A coin stays put when the card under it is flicked away", bucket: 0 },
          { text: "An empty cart speeds up faster than a full one with the same push", bucket: 1 },
          { text: "Kicking a ball harder makes it speed up more", bucket: 1 },
          { text: "A rocket pushes gas down and rises", bucket: 2 },
          { text: "A swimmer pushes water back and glides forward", bucket: 2 },
          { text: "A loose balloon zooms away as air rushes out", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Pick one everyday motion, like riding a bike or throwing a ball, and explain it using Newton's three laws.",
        keyPoints: [
          "Objects keep their motion unless an unbalanced force acts (inertia)",
          "More force gives more acceleration, and more mass gives less (F = ma)",
          "Forces come in equal and opposite pairs",
        ],
      },
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
      hook: {
        text: "Drop a basketball and it never bounces all the way back to your hand, yet scientists insist no energy was destroyed. So where did it go? James Joule found part of the answer by warming water with a falling weight.",
        visual: { type: "bounce", efficiency: 0.7 },
      },
      teach: [
        {
          title: "Kinetic and Potential Energy",
          teach:
            "Energy is the ability to make things move or change. Kinetic energy is the energy of motion: a rolling ball, a flying bird, a swinging bat. The faster and heavier an object is, the more kinetic energy it has, and speed matters most: doubling the speed gives four times the kinetic energy. Potential energy is stored energy waiting to be used. A rock on a cliff has gravitational potential energy, and the higher and heavier it is, the more it stores. A stretched rubber band or a squeezed spring holds elastic potential energy. Food and batteries hold chemical potential energy.",
          visual: {
            type: "sort",
            prompt: "Is the main energy here kinetic or potential?",
            buckets: ["Kinetic (moving)", "Potential (stored)"],
            items: [
              { text: "A skateboarder rolling downhill", bucket: 0 },
              { text: "A book on a high shelf", bucket: 1 },
              { text: "A stretched slingshot", bucket: 1 },
              { text: "A soccer ball flying through the air", bucket: 0 },
              { text: "A battery sitting in a drawer", bucket: 1 },
              { text: "Wind blowing through trees", bucket: 0 },
            ],
          },
          think: {
            q: "Which has the MOST gravitational potential energy?",
            choices: [
              "A 1 kg rock on the ground",
              "A 1 kg rock on a 2 m shelf",
              "A 1 kg rock on a 10 m cliff",
              "A 1 kg rock rolling along a road",
            ],
            answer: 2,
            why: "All the rocks have the same mass, so the highest one stores the most gravitational potential energy.",
            hints: [
              "On the ground, the rock cannot fall any farther, so it has almost no gravitational potential energy.",
              "It does store some energy, but less than the cliff rock. With the same mass, more height means more potential energy.",
              "",
              "Rolling gives it kinetic energy, but it is not high up, so its gravitational potential energy is small.",
            ],
          },
          approaches: {
            analogy:
              "Potential energy is like money saved in a piggy bank, ready to spend. Kinetic energy is money being spent right now. Lifting something up is saving; letting it fall is spending.",
            example:
              "Lift a 1 kg book 1 meter onto a shelf and you store about 10 joules of potential energy (1 kg x about 10 N per kg of gravity x 1 m). Lift it to a 2 meter shelf and it stores about 20 joules, twice as much.",
            simpler: {
              q: "A stretched rubber band has which kind of energy?",
              choices: ["Kinetic", "Elastic potential", "None at all"],
              answer: 1,
              why: "The energy is stored in the stretch, ready to launch the band.",
              hints: [
                "The band is not moving yet, so it is not kinetic. Its energy is stored in the stretch.",
                "",
                "It does have energy: let go and it flies. That stored energy is elastic potential energy.",
              ],
            },
          },
        },
        {
          title: "Energy Changes Form",
          teach:
            "Energy constantly changes from one form to another. On a roller coaster, the chain lifts the car to the top of the first hill, giving it lots of potential energy. As the car plunges down, potential energy turns into kinetic energy, so it speeds up and is fastest at the bottom. Climbing the next hill, kinetic energy turns back into potential energy and the car slows. A swinging pendulum does the same dance: most potential energy at the high points, most speed at the bottom. Other changes happen all around you: chemical energy in food becomes motion in your muscles, and electrical energy becomes light and heat in a lamp.",
          visual: { type: "ramp" },
          think: {
            q: "Where is a swinging pendulum moving fastest?",
            choices: [
              "At the highest point of its swing",
              "At the lowest point of its swing",
              "It moves at the same speed everywhere",
              "Only at the moment it is released",
            ],
            answer: 1,
            why: "At the bottom, the most potential energy has turned into kinetic energy, so the speed is greatest.",
            hints: [
              "At the top, the pendulum stops for an instant before turning around. That is where potential energy is greatest and kinetic energy is smallest.",
              "",
              "Its speed changes as energy swaps between potential and kinetic. Watch one swing and you can see it speed up and slow down.",
              "When released, it starts from rest. It gains speed as it drops, so it is fastest at the bottom.",
            ],
          },
          approaches: {
            analogy:
              "Energy is like water poured back and forth between two cups labeled potential and kinetic. As one cup empties, the other fills, and the total stays the same, except for a few drops that splash out as heat and sound.",
            example:
              "A 1 kg ball held 5 m up has about 50 joules of potential energy. Halfway down, at 2.5 m, it has about 25 joules of potential energy and 25 joules of kinetic energy. Just before it hits the ground, nearly all 50 joules are kinetic, ignoring air resistance.",
            simpler: {
              q: "As a roller coaster car goes down a hill, it...",
              choices: ["Slows down", "Speeds up", "Stays at the same speed"],
              answer: 1,
              why: "Losing height turns stored energy into energy of motion.",
              hints: [
                "Going down, gravity pulls it along and stored energy turns into motion, so it speeds up.",
                "",
                "The car loses height, so potential energy becomes kinetic energy and its speed increases.",
              ],
            },
          },
        },
        {
          title: "Energy Is Never Lost",
          teach:
            "In the 1840s, James Prescott Joule built a device in which a falling weight spun paddles inside a container of water. The water warmed slightly, and the same drop always produced the same warming. His work helped establish the law of conservation of energy: energy cannot be created or destroyed, only changed from one form to another. So why does a dropped ball bounce lower each time? With every bounce, some energy turns into heat in the ball and floor and into the sound you hear. The energy still exists, but it has spread out into forms the ball cannot use to bounce. That is also why machines get warm and why no perpetual motion machine can work.",
          visual: { type: "bounce", efficiency: 0.6 },
          think: {
            q: "A ball dropped from 100 cm bounces to 70 cm. What happened to the missing energy?",
            choices: [
              "It was destroyed by the floor",
              "It turned into heat and sound",
              "Gravity used it up permanently",
              "It went back into the hand that dropped it",
            ],
            answer: 1,
            why: "Energy is conserved; the missing part became heat and sound during the bounce.",
            hints: [
              "Energy cannot be destroyed. It changed into other forms that are harder to notice.",
              "",
              "Gravity changes potential energy into kinetic energy and back, but it does not make energy vanish. Look for heat and sound.",
              "Once the ball leaves your hand, energy does not travel back to you. It spreads into the floor, the ball, and the air as heat and sound.",
            ],
          },
          approaches: {
            analogy:
              "It is like spilling a bag of marbles across a big floor. You still have every marble, but they have rolled everywhere and are hard to gather up. Energy that spreads out as heat is still there, just scattered.",
            example:
              "A ball dropped from 100 cm bounces to 70 cm, so it keeps about 70 percent of its height each bounce. Next bounce: 70 percent of 70 cm is 49 cm. Then about 34 cm. The heights shrink, and the missing energy shows up as tiny amounts of heat and sound.",
            simpler: {
              q: "The law of conservation of energy says energy...",
              choices: [
                "Can be destroyed",
                "Changes form but is never created or destroyed",
                "Only exists in moving things",
              ],
              answer: 1,
              why: "The total amount of energy stays the same; it only changes form.",
              hints: [
                "Energy can never be destroyed. It may become heat or sound, but it is still there.",
                "",
                "Stored energy exists in things that are not moving, like a book on a high shelf.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the roller coaster's energy story in order.",
        steps: [
          "The chain lifts the car up the first hill, adding potential energy",
          "At the top, the car has its most potential energy and moves slowly",
          "The car plunges downhill as potential energy becomes kinetic energy",
          "At the bottom of the drop, the car has its most kinetic energy and top speed",
          "The car climbs the next hill as kinetic energy turns back into potential energy",
          "Some energy has spread out as heat and sound, so later hills must be lower than the first",
        ],
      },
      explain: {
        prompt: "Explain why a bouncing ball gets lower with each bounce, even though energy is never destroyed.",
        keyPoints: [
          "Potential energy turns into kinetic energy as the ball falls",
          "Some energy changes into heat and sound at each bounce",
          "The total energy stays the same; it just spreads out",
        ],
      },
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
      hook: {
        text: "Archimedes is said to have boasted that, with a long enough lever and a place to stand, he could move the whole Earth. He was exaggerating, but the math behind his boast is real, and you use it every time you open a door.",
        visual: { type: "lever" },
      },
      teach: [
        {
          title: "The Six Simple Machines",
          teach:
            "A simple machine is a basic device that changes the size or direction of a force. There are six classic types. A lever is a stiff bar that pivots on a fulcrum, like a seesaw. A pulley is a wheel with a rope, like on a flagpole. A wheel and axle is a big wheel fixed to a smaller rod, like a doorknob. An inclined plane is a ramp. A wedge is two ramps back to back, like an axe blade. A screw is a ramp wrapped around a post, like the threads on a jar lid. Bicycles, scissors, and cranes are compound machines built by combining these six.",
          visual: {
            type: "hotspots",
            title: "The Six Simple Machines",
            center: "Simple machines",
            spots: [
              { label: "Lever", icon: "⚖️", detail: "A stiff bar that pivots on a fulcrum. Seesaws, crowbars, and bottle openers are levers." },
              { label: "Pulley", icon: "🏳️", detail: "A wheel with a rope. Pulling down on a flagpole rope lifts the flag up." },
              { label: "Wheel and axle", icon: "🚪", detail: "A large wheel fixed to a small rod. Turning a doorknob's big handle easily turns the small rod inside." },
              { label: "Inclined plane", icon: "♿", detail: "A ramp. It lets you raise a load with less force by moving it a longer distance." },
              { label: "Wedge", icon: "🪓", detail: "Two ramps back to back. An axe blade pushes wood apart as it moves forward." },
              { label: "Screw", icon: "🔩", detail: "A ramp wrapped around a post. Each turn pulls the screw a short distance with great force." },
            ],
          },
          think: {
            q: "A doorstop is which simple machine?",
            choices: ["A wedge", "A pulley", "A lever", "A screw"],
            answer: 0,
            why: "A doorstop is a sloped block that jams into the gap under a door, just like a wedge.",
            hints: [
              "",
              "A pulley uses a wheel and rope to lift things. A doorstop has no rope; it is a thin, sloped block.",
              "A lever pivots around a fulcrum. A doorstop does not pivot; its sloped shape squeezes into the gap.",
              "A screw is a ramp wrapped around a post. A doorstop is a single sloped block, which makes it a wedge.",
            ],
          },
          approaches: {
            analogy:
              "Simple machines are like the basic bricks of the machine world. Snap them together in different ways and you can build almost any machine, from a can opener to a construction crane.",
            example:
              "Scissors are a compound machine. The two blades are wedges that cut, and they are joined at a pivot, which makes them a pair of levers. Squeezing the handles uses the levers to press the wedges through the paper.",
            simpler: {
              q: "A ramp is also called...",
              choices: ["An inclined plane", "A pulley", "A fulcrum"],
              answer: 0,
              why: "An inclined plane is a flat surface set at a slope: a ramp.",
              hints: [
                "",
                "A pulley is a wheel with a rope. A ramp is a sloped flat surface.",
                "A fulcrum is the pivot point of a lever, not a ramp.",
              ],
            },
          },
        },
        {
          title: "Trading Distance for Force",
          teach:
            "Simple machines do not give you free energy. Instead, they trade distance for force. Work is force times distance. Lifting a 500 N box straight up 1 meter takes 500 N of force over 1 meter. Pushing it up a smooth 5 meter ramp to the same height takes only about 100 N, but you push 5 times as far. Either way, the work is about 500 joules. In real life, friction means you do a little extra work. That is the deal every simple machine offers: less force over more distance, or more force over less distance.",
          visual: {
            type: "compare",
            left: {
              title: "Lift straight up 1 m",
              points: ["Force: 500 N", "Distance: 1 m", "Work: 500 x 1 = 500 J"],
            },
            right: {
              title: "Push up a 5 m ramp",
              points: ["Force: about 100 N", "Distance: 5 m", "Work: 100 x 5 = 500 J"],
            },
          },
          think: {
            q: "Moving a box up a long, gentle ramp instead of a short, steep one means you...",
            choices: [
              "Make the box lighter",
              "Do no work at all",
              "Use more force over a shorter distance",
              "Use less force over a longer distance",
            ],
            answer: 3,
            why: "A longer ramp spreads the same work over more distance, so less force is needed.",
            hints: [
              "The box's weight does not change. The ramp changes how much force you need, not the box itself.",
              "You still do work, because you move the box higher against gravity. The ramp just spreads that work over more distance.",
              "That describes the steep ramp. A gentle ramp is longer, so you need less force.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Hiking up a mountain on a winding trail is easier on your legs than climbing straight up a cliff, but you walk much farther. You end up at the same height either way.",
            example:
              "Raising a 300 N load 1 m: straight up takes 300 N over 1 m, which is 300 J. A 3 m ramp takes about 100 N over 3 m, also 300 J. A 6 m ramp takes about 50 N over 6 m, still 300 J. Same work, less force, more distance.",
            simpler: {
              q: "Do simple machines create extra energy?",
              choices: ["Yes, that is how they work", "No, they trade force for distance", "Only levers do"],
              answer: 1,
              why: "Energy cannot be created; machines only change how force is applied.",
              hints: [
                "Energy can never be created. Machines only change how much force you use and over what distance.",
                "",
                "No machine creates energy, including levers. They all trade force for distance.",
              ],
            },
          },
        },
        {
          title: "The Lever Rule",
          teach:
            "A lever balances when effort force times effort distance equals load force times load distance, with distances measured from the fulcrum. Picture a 100 N rock 20 cm from the fulcrum. Push down 80 cm from the fulcrum on the other side and you need only 25 N, because 25 x 80 = 2,000 and 100 x 20 = 2,000. The farther your hands are from the fulcrum, the less force you need. That is why a long crowbar can pry up heavy things, and why a door is easiest to push near the handle, far from the hinges.",
          visual: { type: "lever" },
          think: {
            q: "A 90 N load sits 10 cm from the fulcrum. You push 30 cm from the fulcrum. What effort balances it?",
            choices: ["270 N", "30 N", "90 N", "3 N"],
            answer: 1,
            why: "90 x 10 = 900, and 900 / 30 = 30 N.",
            hints: [
              "That is 90 times 3. Your hands are farther from the fulcrum, so you need LESS force than the load, not more.",
              "",
              "That would balance only if both distances were equal. Your hands are farther from the fulcrum, so you need less.",
              "Check the math: load x load distance is 90 x 10 = 900. Divide by your distance: 900 / 30 = 30 N.",
            ],
          },
          approaches: {
            analogy:
              "On a seesaw, a small kid can balance a grown-up if the grown-up scoots close to the middle and the kid sits at the far end. Distance from the middle makes up for less weight.",
            example:
              "A kid weighing about 400 N sits 1 m from the seesaw's center. A smaller kid weighing about 200 N must sit 2 m from the center on the other side to balance: 400 x 1 = 400 and 200 x 2 = 400.",
            simpler: {
              q: "To lift a heavy load with a lever using less force, you should push...",
              choices: ["Close to the fulcrum", "Far from the fulcrum", "Right on the fulcrum"],
              answer: 1,
              why: "A longer effort distance means less effort force is needed.",
              hints: [
                "Pushing close to the fulcrum actually takes more force, not less.",
                "",
                "Pushing right on the fulcrum will not turn the lever at all.",
              ],
            },
          },
        },
        {
          title: "Mechanical Advantage",
          teach:
            "Mechanical advantage tells how many times a machine multiplies your force. For a lever, it equals effort distance divided by load distance. In the rock example, 80 cm divided by 20 cm gives a mechanical advantage of 4: you push with one quarter of the force, but your end moves four times as far. For a ramp, it is the length divided by the height, so a 6 m ramp rising 2 m has a mechanical advantage of 3. A mechanical advantage less than 1 is useful too. Your forearm is a lever that needs extra muscle force but moves your hand fast and far, perfect for throwing.",
          visual: {
            type: "flip",
            cards: [
              { front: "Effort", back: "The force you apply to the machine." },
              { front: "Load", back: "The object or weight the machine moves." },
              { front: "Fulcrum", back: "The fixed point a lever pivots around." },
              { front: "Mechanical advantage", back: "How many times a machine multiplies your force. For a lever: effort distance / load distance." },
            ],
          },
          think: {
            q: "A lever has an effort distance of 60 cm and a load distance of 15 cm. What is its mechanical advantage?",
            choices: ["45", "900", "0.25", "4"],
            answer: 3,
            why: "Mechanical advantage = effort distance / load distance = 60 / 15 = 4.",
            hints: [
              "That is 60 minus 15. Mechanical advantage is a division: effort distance divided by load distance.",
              "That is 60 times 15. Divide instead: 60 / 15.",
              "That is 15 divided by 60, which is upside down. Put the effort distance on top.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Mechanical advantage is like a low gear on a bike. Pedaling uphill feels easy, but you turn the pedals many times to go a short distance. The machine multiplies your force by making you move more.",
            example:
              "A ramp is 4 m long and rises 1 m. Its mechanical advantage is 4 / 1 = 4. To push a 200 N cart up it, ignoring friction, you need about 200 / 4 = 50 N.",
            simpler: {
              q: "A mechanical advantage of 2 means the machine...",
              choices: ["Doubles your force", "Makes the load weigh half as much forever", "Creates energy"],
              answer: 0,
              why: "Your force is multiplied by 2, while you move twice as far.",
              hints: [
                "",
                "The load's weight does not change. The machine doubles the force you apply, while you move twice as far.",
                "Machines never create energy. They trade distance for force.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each object by the simple machine it mainly uses.",
        buckets: ["Lever", "Inclined plane, wedge, or screw", "Wheel and axle or pulley"],
        items: [
          { text: "Seesaw", bucket: 0 },
          { text: "Crowbar", bucket: 0 },
          { text: "Wheelchair ramp", bucket: 1 },
          { text: "Axe blade", bucket: 1 },
          { text: "Threads on a jar lid", bucket: 1 },
          { text: "Flagpole rope and wheel", bucket: 2 },
          { text: "Doorknob", bucket: 2 },
          { text: "Steering wheel", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain how a lever lets a small force lift a heavy load, and what you give up in return.",
        keyPoints: [
          "A lever pivots on a fulcrum",
          "Pushing farther from the fulcrum takes less force",
          "You trade force for distance: your end moves farther",
          "Machines do not create energy",
        ],
      },
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
      hook: {
        text: "Right now, roughly 30 trillion cells are busy working inside your body, yet nobody knew cells existed until 1665. That year, a curious scientist peered at a thin slice of cork and saw rows of tiny boxes.",
      },
      teach: [
        {
          title: "Discovering the Cell",
          teach:
            "Cells are far too small to see with your eyes alone; many are a tenth the width of a human hair or smaller. In 1665, Robert Hooke looked at cork through a microscope and saw tiny boxes he named cells. He was seeing the empty walls of dead plant cells. Soon after, Antonie van Leeuwenhoek ground his own powerful lenses and saw living single-celled creatures wiggling in pond water. Later scientists put the pieces together into cell theory: all living things are made of cells, the cell is the basic unit of life, and all cells come from other cells.",
          visual: {
            type: "flip",
            cards: [
              { front: "Cell", back: "The smallest unit of life. Every living thing is made of one or more cells." },
              { front: "Organelle", back: "A tiny part inside a cell that does a particular job." },
              { front: "Microscope", back: "An instrument that magnifies things too small to see with your eyes." },
              { front: "Cell theory", back: "All living things are made of cells, cells are the basic unit of life, and cells come from other cells." },
            ],
          },
          think: {
            q: "Which statement is part of cell theory?",
            choices: [
              "Cells can appear from nonliving material",
              "Only animals are made of cells",
              "Cells were invented by Robert Hooke",
              "All cells come from other cells",
            ],
            answer: 3,
            why: "Cell theory says new cells are only made when existing cells divide.",
            hints: [
              "That was the old idea of life appearing from nonliving things, like flies from meat. Cell theory says new cells only come from existing cells.",
              "Plants, fungi, and bacteria are made of cells too. Cell theory says ALL living things are made of cells.",
              "Hooke discovered and named cells; he did not invent them. Cells existed long before anyone saw them.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Cells are like bricks in a building. A tiny shed needs only a few bricks and a skyscraper needs millions, but both are built from the same basic unit. A bacterium is a one-brick building; you are a skyscraper.",
            example:
              "A typical human cell is about 0.01 mm across. Line up 100 of them and the row is only 1 mm long, about the thickness of a coin. That is why Hooke needed a microscope to see cells at all.",
            simpler: {
              q: "Who first named cells after looking at cork?",
              choices: ["Robert Hooke", "Isaac Newton", "Galileo Galilei"],
              answer: 0,
              why: "Hooke named them in 1665 because the boxes reminded him of small rooms called cells.",
              hints: [
                "",
                "Newton studied motion, light, and gravity, not cells.",
                "Galileo studied motion and the sky. Robert Hooke named cells.",
              ],
            },
          },
        },
        {
          title: "Parts of a Cell",
          teach:
            "Cells contain tiny working parts called organelles, each with its own job. The cell membrane is a thin, flexible layer around the cell that controls what enters and leaves. The nucleus holds DNA, the instructions for building and running the cell. Mitochondria break down sugar to release energy the cell can use, so they are called the powerhouses of the cell. Cytoplasm is the jelly-like fluid that fills the cell and holds the organelles in place. Ribosomes, tiny dots in the cytoplasm, build proteins by following instructions copied from the DNA. Working together, these parts keep the cell alive.",
          visual: {
            type: "hotspots",
            title: "Inside an Animal Cell",
            center: "Animal cell",
            spots: [
              { label: "Cell membrane", icon: "🛡️", detail: "A thin, flexible layer around the cell that controls what goes in and out." },
              { label: "Nucleus", icon: "🧬", detail: "Holds the DNA, the instructions for building and running the cell." },
              { label: "Mitochondria", icon: "⚡", detail: "Break down sugar to release energy the cell can use." },
              { label: "Cytoplasm", icon: "💧", detail: "Jelly-like fluid that fills the cell and holds the organelles." },
              { label: "Ribosomes", icon: "🔧", detail: "Tiny builders that make proteins by following instructions from DNA." },
            ],
          },
          think: {
            q: "Muscle cells use lots of energy. Which organelle would you expect them to have plenty of?",
            choices: ["Mitochondria", "Cell walls", "Chloroplasts", "Large vacuoles"],
            answer: 0,
            why: "Mitochondria release energy from sugar, and muscle cells are packed with them.",
            hints: [
              "",
              "Animal cells, including muscle cells, have no cell wall. A wall gives support, not energy.",
              "Chloroplasts are found in plants and capture sunlight. Muscle cells get energy by breaking down sugar.",
              "Vacuoles mostly store water and other materials. The energy releasers are the mitochondria.",
            ],
          },
          approaches: {
            analogy:
              "A cell is like a school. The nucleus is the main office that holds the rulebook, the membrane is the front entrance with a security guard, the mitochondria are the power plant giving everyone energy, and the cytoplasm is the hallways where everything moves around.",
            example:
              "When you sprint, your leg muscle cells need energy fast. Sugar from your food passes through each cell's membrane, and the mitochondria break it down to release energy that powers the muscle. The DNA in the nucleus holds the instructions for making the proteins that let the muscle contract.",
            simpler: {
              q: "Which part holds the cell's DNA?",
              choices: ["Cytoplasm", "Nucleus", "Cell membrane"],
              answer: 1,
              why: "The nucleus stores the DNA instructions.",
              hints: [
                "Cytoplasm is the jelly that fills the cell. The DNA is kept inside a special organelle.",
                "",
                "The membrane is the outer gatekeeper. DNA is stored in the nucleus.",
              ],
            },
          },
        },
        {
          title: "Plant Cells vs. Animal Cells",
          teach:
            "Plant and animal cells share a membrane, nucleus, mitochondria, cytoplasm, and ribosomes, but plant cells have three extras. A stiff cell wall outside the membrane gives plant cells a boxy shape and helps plants stand upright. Chloroplasts are green organelles that capture sunlight and make sugar through photosynthesis; they are why leaves are green. A large central vacuole stores water and presses outward to keep the cell firm. When a plant wilts, its vacuoles have lost water. Animal cells have no cell wall and no chloroplasts, so they are usually rounder and must get their food by eating.",
          visual: {
            type: "compare",
            left: {
              title: "Plant cell",
              points: [
                "Cell wall and membrane",
                "Chloroplasts make sugar from sunlight",
                "One large central vacuole",
                "Boxy shape",
                "Nucleus, mitochondria, cytoplasm",
              ],
            },
            right: {
              title: "Animal cell",
              points: [
                "Membrane only, no cell wall",
                "No chloroplasts; gets food by eating",
                "Small vacuoles, if any",
                "Usually rounder shape",
                "Nucleus, mitochondria, cytoplasm",
              ],
            },
          },
          think: {
            q: "Why do plant cells need mitochondria if they already have chloroplasts?",
            choices: [
              "They do not have mitochondria",
              "Chloroplasts make sugar, and mitochondria release energy from that sugar",
              "Mitochondria capture sunlight at night",
              "Mitochondria build the cell wall",
            ],
            answer: 1,
            why: "Chloroplasts store the Sun's energy in sugar; mitochondria unlock that energy so the cell can use it.",
            hints: [
              "Plant cells do have mitochondria. Many people think chloroplasts replace them, but the two do different jobs.",
              "",
              "Mitochondria do not capture light at all. They break down sugar to release energy, day and night.",
              "Building the cell wall is not the mitochondria's job. Their job is releasing energy from sugar.",
            ],
          },
          approaches: {
            analogy:
              "A chloroplast is like a solar-powered bakery that makes bread (sugar). A mitochondrion is like your stomach, turning that bread into energy you can actually use. A plant needs both: one to make the food and one to use it.",
            example:
              "Leave a stalk of celery out on the counter and it goes limp as its vacuoles lose water. Stand it in a glass of water for a few hours and it stiffens again as the vacuoles refill and press against the cell walls.",
            simpler: {
              q: "Which part is found ONLY in plant cells?",
              choices: ["Nucleus", "Mitochondria", "Cell wall"],
              answer: 2,
              why: "Plant cells have a cell wall; animal cells do not.",
              hints: [
                "Both plant and animal cells have a nucleus.",
                "Both plant and animal cells have mitochondria to release energy.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each cell part: is it found only in plant cells, or in both plant and animal cells?",
        buckets: ["Plant cells only", "Both plant and animal cells"],
        items: [
          { text: "Cell wall", bucket: 0 },
          { text: "Chloroplasts", bucket: 0 },
          { text: "Large central vacuole", bucket: 0 },
          { text: "Nucleus", bucket: 1 },
          { text: "Cell membrane", bucket: 1 },
          { text: "Mitochondria", bucket: 1 },
          { text: "Cytoplasm", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain what a cell is, name what a few of its parts do, and describe how a plant cell differs from an animal cell.",
        keyPoints: [
          "The cell is the basic unit of life",
          "Organelles have jobs: the nucleus holds DNA, the membrane controls what enters, mitochondria release energy",
          "Plant cells also have a cell wall, chloroplasts, and a large vacuole",
        ],
      },
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
      hook: {
        text: "Earth is actually closest to the Sun in early January, in the middle of winter for the Northern Hemisphere. So if distance does not cause summer, what does?",
        visual: { type: "seasons" },
      },
      teach: [
        {
          title: "Our Solar System",
          teach:
            "The solar system is the Sun and everything that orbits it. The Sun holds over 99 percent of the solar system's mass, and its gravity keeps everything in orbit. The four inner planets, Mercury, Venus, Earth, and Mars, are small and rocky. Past the asteroid belt are four giant planets: Jupiter and Saturn, made mostly of hydrogen and helium, and Uranus and Neptune, called ice giants. Earth spins once on its axis each day, which gives us day and night, and travels once around the Sun each year. The farther a planet is from the Sun, the longer its year: Neptune takes about 165 Earth years to go around once.",
          visual: {
            type: "hotspots",
            title: "The Solar System",
            center: "Sun",
            spots: [
              { label: "Mercury", icon: "🪨", detail: "The smallest planet and closest to the Sun. A year lasts only 88 Earth days." },
              { label: "Venus", icon: "🌕", detail: "The hottest planet, because its thick clouds trap heat." },
              { label: "Earth", icon: "🌍", detail: "Our rocky home, with liquid water. Its axis is tilted about 23.5 degrees." },
              { label: "Mars", icon: "🔴", detail: "A cold, rocky desert planet, red because of iron-rich dust." },
              { label: "Jupiter", icon: "🟠", detail: "The largest planet, a gas giant with a giant storm called the Great Red Spot." },
              { label: "Saturn", icon: "🪐", detail: "A gas giant famous for its bright rings of ice and rock." },
              { label: "Uranus", icon: "🔵", detail: "An ice giant tipped almost on its side." },
              { label: "Neptune", icon: "🌀", detail: "The farthest planet, an ice giant with the fastest winds in the solar system." },
            ],
          },
          think: {
            q: "What causes day and night on Earth?",
            choices: [
              "Earth spinning on its axis",
              "Earth orbiting the Sun",
              "The Sun moving around Earth",
              "The Moon blocking the Sun",
            ],
            answer: 0,
            why: "As Earth spins, each place turns toward the Sun (day) and then away from it (night).",
            hints: [
              "",
              "One orbit takes a whole year, far too slow to make day and night. The daily cycle comes from Earth spinning.",
              "It looks that way from the ground, but Earth is the one turning. The Sun only appears to move across the sky.",
              "The Moon blocks the Sun only during a solar eclipse, which is rare. Night happens every day because Earth turns.",
            ],
          },
          approaches: {
            analogy:
              "Stand in a room with one lamp and spin slowly in place. The lamp comes into view (day) and then disappears behind you (night). Now walk a slow circle around the lamp while spinning: one lap is a year, and one spin is a day.",
            example:
              "Earth spins about 365 times during one trip around the Sun, so a year has about 365 days. Mars takes about 687 Earth days to orbit, so a Mars year is almost twice as long as ours.",
            simpler: {
              q: "Which of these is a rocky inner planet?",
              choices: ["Jupiter", "Mars", "Neptune"],
              answer: 1,
              why: "Mercury, Venus, Earth, and Mars are the four small, rocky inner planets.",
              hints: [
                "Jupiter is a gas giant beyond the asteroid belt.",
                "",
                "Neptune is an ice giant, the farthest planet from the Sun.",
              ],
            },
          },
        },
        {
          title: "Why We Have Seasons",
          teach:
            "Earth's axis is tilted about 23.5 degrees, and it keeps pointing the same direction in space all year. So for part of the orbit, the Northern Hemisphere leans toward the Sun. Sunlight hits it more directly, concentrating energy on each patch of ground, and days are longer. That is summer. Six months later, the Northern Hemisphere leans away. Sunlight arrives at a low slant, spreading the same energy over a bigger area, and days are shorter. That is winter. The Southern Hemisphere always has the opposite season, which is why people in Australia celebrate New Year's Day in summer.",
          visual: { type: "seasons" },
          think: {
            q: "Why is it summer in the Northern Hemisphere in July?",
            choices: [
              "Earth is closest to the Sun in July",
              "The Sun burns much hotter in July",
              "The Moon reflects extra light onto Earth",
              "The northern half of Earth is tilted toward the Sun",
            ],
            answer: 3,
            why: "Tilted toward the Sun, the north gets more direct sunlight and longer days.",
            hints: [
              "Many people think seasons come from distance to the Sun, but Earth is actually closest in January. What matters is the tilt and how directly sunlight strikes the ground.",
              "The Sun's output stays nearly the same all year. What changes is how Earth is tilted toward it.",
              "Moonlight is far too weak to warm Earth. Seasons come from Earth's tilt.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Shine a flashlight straight down at a table and you get a small, bright circle. Tilt the flashlight and the same light spreads into a big, dim oval. Direct summer sunlight is the bright circle; slanted winter sunlight is the dim oval.",
            example:
              "Hold a flashlight 30 cm above graph paper pointing straight down and count the lit squares, say 20. Tilt it to a low angle and the lit area might cover 40 squares. The same light spread over twice the area means each square gets about half as much energy, just like winter ground.",
            simpler: {
              q: "Earth's axis is tilted about...",
              choices: ["0 degrees", "23.5 degrees", "90 degrees"],
              answer: 1,
              why: "Earth's tilt of about 23.5 degrees is what creates the seasons.",
              hints: [
                "With no tilt at all, there would be almost no seasons.",
                "",
                "A 90 degree tilt would put Earth on its side. The real tilt is about 23.5 degrees.",
              ],
            },
          },
        },
        {
          title: "Measuring Earth with a Shadow",
          teach:
            "About 2,200 years ago, the Greek scholar Eratosthenes measured Earth using shadows. He learned that at noon on midsummer day in Syene, the Sun shone straight down a deep well, so it was directly overhead. At the same moment in Alexandria, about 800 kilometers north, a stick cast a shadow at an angle of about 7.2 degrees. A full circle is 360 degrees, and 7.2 degrees is one fiftieth of 360. So the distance between the cities must be one fiftieth of the way around Earth: 800 times 50 is about 40,000 kilometers. Modern measurements give about 40,075 kilometers around the equator.",
          visual: {
            type: "sequence",
            prompt: "Put Eratosthenes' steps in order.",
            steps: [
              "Notice the Sun is directly overhead in Syene at noon on midsummer day",
              "Measure the shadow angle in Alexandria at the same time: about 7.2 degrees",
              "Work out that 7.2 degrees is 1/50 of a full 360 degree circle",
              "Multiply the 800 km between the cities by 50 to get about 40,000 km",
            ],
          },
          think: {
            q: "If the shadow angle had been 9 degrees instead, what fraction of the full circle would the distance between the cities be?",
            choices: ["1/9", "1/40", "1/50", "1/360"],
            answer: 1,
            why: "360 / 9 = 40, so 9 degrees is 1/40 of a full circle.",
            hints: [
              "9 is the angle, not the fraction. Divide 360 by 9 to see how many times that angle fits around the circle.",
              "",
              "1/50 goes with an angle of 7.2 degrees. With 9 degrees, divide 360 by 9.",
              "1/360 would mean an angle of just 1 degree. Divide 360 by 9 instead.",
            ],
          },
          approaches: {
            analogy:
              "Think of a round pizza cut into 50 equal slices. If you know the crust length of one slice, multiply by 50 to get the crust all the way around. Eratosthenes found the angle of one slice and the length of its crust.",
            example:
              "Shadow angle: 7.2 degrees. 360 / 7.2 = 50, so Syene to Alexandria is 1/50 of the way around. Distance between the cities: about 800 km. Circumference: about 800 x 50 = 40,000 km.",
            simpler: {
              q: "How many degrees are in a full circle?",
              choices: ["100", "180", "360"],
              answer: 2,
              why: "A full turn around a circle is 360 degrees.",
              hints: [
                "100 is a nice round number, but a full circle is 360 degrees.",
                "180 degrees is only half a circle, a straight line.",
                "",
              ],
            },
          },
        },
        {
          title: "Phases of the Moon",
          teach:
            "The Moon makes no light of its own; it reflects sunlight. The Sun always lights half of the Moon, but as the Moon orbits Earth, about every 29.5 days, we see different amounts of that lit half. At new moon, the Moon is between Earth and the Sun, and its lit side faces away from us. Over the next two weeks the lit part we see grows, or waxes: crescent, first quarter, gibbous, then full moon, when the Moon is on the far side of Earth from the Sun. Then it shrinks, or wanes, back to new. Earth's shadow does not cause phases; it only falls on the Moon during a lunar eclipse.",
          visual: {
            type: "sequence",
            prompt: "Put the Moon's phases in order, starting from new moon.",
            steps: ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous"],
          },
          think: {
            q: "Where is the Moon during a full moon?",
            choices: [
              "Between Earth and the Sun",
              "On the opposite side of Earth from the Sun",
              "Inside Earth's shadow every time",
              "Right next to the Sun in our sky",
            ],
            answer: 1,
            why: "From the far side of Earth, we look at the Moon's fully lit face.",
            hints: [
              "That is new moon. The lit side faces away from us, so we see almost nothing.",
              "",
              "If the full Moon were in Earth's shadow every month, we would have an eclipse every month. Usually the Moon passes a little above or below the shadow.",
              "Near the Sun in our sky, the Moon shows us its dark side. That is close to new moon.",
            ],
          },
          approaches: {
            analogy:
              "Hold a ball at arm's length in a room with one lamp, then turn slowly in a circle. The ball is always half lit by the lamp, but you see a sliver, then half, then the whole lit face, then back again, just like the Moon.",
            example:
              "Day 0: new moon, invisible. About day 7: first quarter, with the right half lit as seen from the Northern Hemisphere. About day 15: full moon. About day 22: third quarter, left half lit. About day 29.5: new moon again.",
            simpler: {
              q: "Where does moonlight come from?",
              choices: ["The Moon glows on its own", "Sunlight reflecting off the Moon", "Light from Earth's cities"],
              answer: 1,
              why: "The Moon is a rocky world that reflects the Sun's light.",
              hints: [
                "The Moon is rock and does not make its own light. It reflects light.",
                "",
                "City lights are far too dim to light up the Moon. What we see is reflected sunlight.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that is TRUE about seasons.",
        sentences: [
          "Earth's axis is tilted about 23.5 degrees.",
          "Summer happens because Earth is closest to the Sun.",
          "In summer, sunlight hits the ground more directly.",
          "When it is winter in Canada, it is summer in Australia.",
          "The Sun gets much hotter during summer.",
          "Summer days are longer than winter days.",
        ],
        correct: [0, 2, 3, 5],
      },
      explain: {
        prompt: "Explain to a friend why Earth has seasons, and correct the common mistake about distance from the Sun.",
        keyPoints: [
          "Earth's axis is tilted about 23.5 degrees",
          "The hemisphere tilted toward the Sun gets more direct light and longer days",
          "Distance is not the cause; Earth is closest to the Sun in January",
          "The two hemispheres have opposite seasons",
        ],
      },
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
