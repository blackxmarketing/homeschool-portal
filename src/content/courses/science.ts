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
      objectives: [
        "Write a hypothesis as an if-then-because sentence you could actually test",
        "Name the independent, dependent and controlled variables in an experiment",
        "Spot an unfair test, and say what would make it fair",
        "Draw a conclusion from data, even when it proves you wrong",
      ],
      hook: {
        text: "In 1668, almost everyone was sure that rotting meat simply turned into flies. One doctor, Francesco Redi, refused to just believe it and set up a few jars to find out. A simple fair test overturned an idea people had trusted for thousands of years.",
      },
      teach: [
        {
          title: "Questions and Hypotheses",
          teach:
            "Science starts with a question you can actually test, like: does warm water dissolve sugar faster than cold water? A hypothesis is your best testable prediction about the answer, usually written as an if-then sentence: if I stir sugar into warm water, then it will dissolve faster than in cold water, because warm water molecules move faster. A hypothesis is not a wild guess. It is based on something you already know, and an experiment must be able to prove it wrong. 'Sugar is delicious' is an opinion, not a hypothesis, because no measurement could test it.",
          present: [
            {
              heading: "Not every question is a science question",
              say:
                "Science starts with a question, but not just any question. It has to be one an experiment could actually answer. Watch the difference. 'Is chocolate ice cream the best flavour?' There is no instrument in the world that measures best. That is a matter of taste, and no experiment settles it. Now try this one: 'Does warm water dissolve sugar faster than cold water?' You could answer that this afternoon with two glasses, a spoon and a stopwatch. Same curiosity, but only the second one gives science something to grip. A good question names something you can change, and something you can measure.",
              terms: [{ word: "testable", meaning: "an experiment could prove it right or wrong" }],
            },
            {
              heading: "A hypothesis calls your shot",
              say:
                "Once you have a real question, you predict the answer before you test it. That prediction is your hypothesis, and scientists write it in a particular shape: if, then, because. If I stir sugar into warm water, then it will dissolve faster than in cold water, because warmer water molecules move faster and knock the sugar apart more quickly. Notice all three pieces. The if names what you change. The then names what you will measure. The because gives your reason, which is what makes it a hypothesis rather than a shrug.",
              terms: [{ word: "hypothesis", meaning: "a testable prediction, written if-then-because" }],
              check: {
                type: "number",
                prompt: "How many parts does a hypothesis have in the shape we just used: if, then, because?",
                answer: 3,
                hint: "Count the words the teacher put on the board.",
                seconds: 20,
              },
            },
            {
              heading: "Predicting is not the same as guessing",
              say:
                "Here is the part people get wrong. A hypothesis is not a wild guess, and it is not a fact you already know. It sits in between. It rests on something you have seen before, and it sticks its neck out far enough that the experiment could knock it down. That last bit matters most. If there is no possible result that would prove you wrong, you have not written a hypothesis. And being wrong is not failure. A hypothesis that gets knocked down has still taught you something true about the world, which is the whole point.",
            },
          ],
          visual: {
            type: "flip",
            cards: [
              { front: "Question", back: "Something you wonder about that an experiment could answer." },
              { front: "Hypothesis", back: "A testable prediction, often written as if-then-because." },
              { front: "Data", back: "The measurements and observations you record during the test." },
              { front: "Conclusion", back: "What the data shows, and whether it supports your hypothesis." },
            ],
          },
          probe: {
            type: "build",
            prompt: "Build a testable hypothesis about bean plants by tapping the tiles in order.",
            tiles: ["If", "a bean plant gets more hours of light,", "then", "it will grow taller in two weeks,", "because plants use light to make food."],
            distractors: ["Bean plants are the best plants.", "Why do plants grow?"],
            hint: "A hypothesis starts with what you will change (if), then predicts what you will measure (then), then gives a reason (because).",
            mistakes: [
              { match: "Used 'Bean plants are the best plants.'", coach: "That is an opinion. No measurement can prove 'best', so it cannot be part of a testable hypothesis." },
              { match: "Used 'Why do plants grow?'", coach: "That is a question, which comes before the hypothesis. The hypothesis is your predicted answer." },
              { match: "Put 'then' before 'If'", coach: "The if-part names what you change; the then-part predicts the result. The cause comes first." },
            ],
            seconds: 40,
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
          present: [
            {
              heading: "Three jobs, not three names",
              say:
                "A variable is anything in your experiment that could change. Every variable has one of three jobs, and once you can spot which job each one is doing, designing an experiment gets a lot easier. There is the one thing you change on purpose. There is the thing you measure to see what happened. And there is everything else, which you hold still so it cannot interfere. One changed, one measured, the rest frozen. That is the whole idea.",
            },
            {
              heading: "Naming them in a real test",
              say:
                "Let's put the sugar experiment on the board and label it. The thing I change on purpose is the water temperature, so temperature is my independent variable. The thing I measure is how many seconds the sugar takes to vanish, so time is my dependent variable, because it depends on what I changed. Everything else gets held still: the same two hundred millilitres of water, one level teaspoon of sugar, the same cup, and exactly ten stirs. Those are my controlled variables.",
              terms: [
                { word: "independent", meaning: "the one thing I change on purpose" },
                { word: "dependent", meaning: "what I measure; it depends on the change" },
                { word: "controlled", meaning: "everything I hold still" },
              ],
              check: {
                type: "match",
                prompt: "Match each variable to its job in the sugar test.",
                pairs: [
                  { left: "Water temperature", right: "Independent: I change it" },
                  { left: "Seconds to dissolve", right: "Dependent: I measure it" },
                  { left: "Ten stirs every time", right: "Controlled: I keep it the same" },
                ],
                hint: "Ask yourself: did I change it, measure it, or hold it still?",
                seconds: 30,
              },
            },
            {
              heading: "A trick for remembering which is which",
              say:
                "People mix up independent and dependent constantly, so here is a trick worth keeping. I change the Independent. The Dependent is the Data I collect. Both D words go together: dependent, data. And if you are ever stuck, say the sentence out loud in order. I changed the temperature, so I measured the time. The thing you changed always comes first, and the thing you measured always depends on it. Get that sentence right and the labels sort themselves out.",
            },
          ],
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
          probe: {
            type: "cloze",
            text: "You test whether hours of light change how tall bean plants grow. Hours of light is the {0} variable, plant height is the {1} variable, and the type of soil is a {2} variable.",
            blanks: [
              { answers: ["independent", "independent variable"] },
              { answers: ["dependent", "dependent variable"] },
              { answers: ["controlled", "control", "controlled variable", "constant"] },
            ],
            bank: ["independent", "dependent", "controlled", "hypothesis", "random"],
            hint: "Ask yourself: which one do I change on purpose, which one do I measure, and which one do I keep the same?",
            mistakes: [
              { match: "dependent", coach: "If you put dependent first: hours of light is something YOU choose, so it is independent. The dependent variable is the result you measure." },
              { match: "independent", coach: "Plant height is what you measure at the end. It depends on the light, so it is the dependent variable." },
              { match: "hypothesis", coach: "A hypothesis is a prediction, not a variable. Each blank here names a kind of variable." },
            ],
            seconds: 35,
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
          present: [
            {
              heading: "Two things changed, so you learned nothing",
              say:
                "Here is an experiment that looks fine and is actually useless. You want to know which paper towel is more absorbent, so you soak a big sheet of Brand A and a small sheet of Brand B. Brand A holds far more water. Brand A wins, right? Think about what changed between those two towels. The brand changed, yes. But the size changed too. So when Brand A held more water, was that the brand, or was it just that there was more towel? You cannot tell. Two things moved at once, and the result cannot separate them.",
              check: {
                type: "highlight",
                prompt: "Tap the sentence that explains why this test was unfair.",
                sentences: [
                  "Brand A held more water than Brand B.",
                  "The two towels were different sizes as well as different brands.",
                  "Paper towels are used to clean up spills.",
                ],
                correct: [1],
                hint: "An unfair test is one where more than one thing changed.",
                seconds: 25,
              },
            },
            {
              heading: "Redi's jars got it right",
              say:
                "Now look back at Redi and his jars, because this is exactly why his experiment worked. Same meat in every jar. Same jars. Same room, same shelf, same days. One single difference: some jars had a gauze cover and some did not. So when maggots turned up only in the open jars, there was nothing else it could have been. The cover was the only thing that differed, so the cover had to be the explanation. That is the quiet power of a fair test. Hold everything still but one thing, and the result has nowhere to hide.",
              terms: [{ word: "fair test", meaning: "only one variable changes; everything else is held still" }],
            },
          ],
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
          probe: {
            type: "highlight",
            prompt: "Maya wants to test ONLY fertilizer. Tap the sentences that show a second difference that ruins her fair test.",
            sentences: [
              "Plant A gets fertilizer and Plant B does not.",
              "Both plants are the same kind of bean.",
              "Plant A sits on a sunny windowsill.",
              "Plant B sits in a dark closet.",
              "Each plant gets 100 mL of water a day.",
              "Both plants are in the same size pot.",
            ],
            correct: [2, 3],
            hint: "Fertilizer is supposed to be the only difference. Look for anything else that is not the same for both plants.",
            mistakes: [
              { match: "Tapped the fertilizer sentence", coach: "Fertilizer is the variable Maya is testing on purpose, so it is supposed to differ. Look for a second difference." },
              { match: "Tapped water or pot size", coach: "Those are the same for both plants, so they are controlled. They do not spoil the test." },
              { match: "Tapped only one light sentence", coach: "The windowsill and the closet together show that light changed. Tap both sides of that difference." },
            ],
            seconds: 30,
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
          present: [
            {
              heading: "One result proves nothing",
              say:
                "Suppose you run your towel test once and Brand B wins. Should you believe it? Not yet. Maybe that sheet had a tear in it. Maybe your hand slipped and you poured a little extra. One trial can always be a fluke. So scientists run the same test several times, usually three at minimum, and then take the average: add the results up and divide by how many you ran. If Brand B wins all three times, now you have something. If it wins once and loses twice, your single result was the fluke, and repeating is what caught it.",
              terms: [{ word: "average", meaning: "add the results, divide by how many" }],
              check: {
                type: "number",
                prompt: "Three trials give 12, 14 and 16 millilitres. What is the average, in millilitres?",
                answer: 14,
                hint: "Add the three numbers, then divide by three.",
                seconds: 30,
              },
            },
            {
              heading: "Write it down as it happens",
              say:
                "Record your measurements the moment you take them, in a table, with units. Not later from memory, because memory quietly rearranges things to match what you expected. The table is your evidence, and the whole argument rests on it. Which brings us to the one rule that is never bent: you do not change your data to fit your prediction. Not a little, not to tidy it up. The moment the numbers bend to the hypothesis, the experiment has told you nothing at all.",
            },
            {
              heading: "Being wrong is a real result",
              say:
                "Last step: the conclusion. Look at your data and answer honestly. Did it support the hypothesis or not? And here is the part that surprises people. If the data says you were wrong, that is not a failed experiment. You predicted something, you tested it properly, and the world told you no. You now know something true that you did not know this morning, and you almost always end up with a better question than the one you started with. Redi did not prove what everyone expected. That is exactly why we still talk about him.",
            },
          ],
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
          probe: {
            type: "number",
            prompt: "A paper towel holds 11 mL, 15 mL, and 16 mL of water in three trials. What is the average?",
            answer: 14,
            tolerance: 0,
            unit: "mL",
            hint: "Add up all three results, then divide by the number of trials.",
            mistakes: [
              { match: "42", coach: "42 is the total of all three trials. To get the average, divide that total by 3." },
              { match: "16", coach: "16 is just the biggest result. The average combines all three: add them and divide by 3." },
              { match: "15", coach: "15 is the middle number in the list, not the average. Add all three and divide by 3." },
            ],
            seconds: 30,
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
      mastery: [
        {
          type: "build",
          prompt: "Build the steps of the scientific method in order. One tile does not belong in science at all.",
          tiles: ["Ask a question", "Write a hypothesis", "Plan a fair test", "Run repeated trials", "Record the data", "Draw a conclusion"],
          distractors: ["Change the data to fit your prediction"],
          hint: "You cannot predict before you have a question, and you cannot conclude before you have data.",
          mistakes: [
            { match: "Used 'Change the data to fit your prediction'", coach: "Changing data is never allowed. If the data disagrees with your hypothesis, that is still a real result." },
            { match: "Hypothesis before the question", coach: "A hypothesis is a predicted answer, so the question has to come first." },
            { match: "Conclusion before the data", coach: "A conclusion is based on evidence. You need recorded data before you can draw one." },
          ],
          seconds: 45,
        },
        {
          type: "sort",
          prompt: "Toy car test: does ramp height change how far the car rolls? Sort each variable.",
          buckets: ["Independent (I change it)", "Dependent (I measure it)", "Controlled (I keep it the same)"],
          items: [
            { text: "Height of the ramp", bucket: 0 },
            { text: "Distance the car rolls in centimeters", bucket: 1 },
            { text: "The same toy car every trial", bucket: 2 },
            { text: "The same floor surface", bucket: 2 },
            { text: "Releasing the car without a push", bucket: 2 },
          ],
          hint: "There is only one thing you change on purpose and one thing you measure. Everything else must stay the same.",
          mistakes: [
            { match: "Distance sorted as independent", coach: "You do not choose the distance; you measure it after the car stops. That makes it dependent." },
            { match: "Releasing without a push sorted as independent", coach: "How you release the car must be the same every time, or a push could explain the result. It is controlled." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Three warm-water trials take 48, 52, and 47 seconds to dissolve the sugar. What is the average time?",
          answer: 49,
          tolerance: 0.1,
          unit: "seconds",
          hint: "Find the total of the three trials first, then share it evenly across the trials.",
          mistakes: [
            { match: "147", coach: "147 is the total. The average is the total divided by the number of trials, 3." },
            { match: "48", coach: "48 is one of the trial results, not the average. Add all three and divide by 3." },
            { match: "50", coach: "Close, but check your addition: 48 + 52 + 47. Then divide by 3." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "In Redi's experiment, the {0} on each jar was the independent variable, and whether {1} appeared on the meat was the dependent variable.",
          blanks: [
            { answers: ["cover", "covering", "gauze", "lid"] },
            { answers: ["maggots", "maggot", "fly larvae", "larvae"] },
          ],
          bank: ["cover", "maggots", "meat", "air", "jar size"],
          hint: "Redi changed one thing about the jars on purpose, and then watched for one result.",
          mistakes: [
            { match: "meat", coach: "Redi used the same kind of meat in every jar, so meat was a controlled variable, not what he changed." },
            { match: "air", coach: "Air could reach the meat in every jar, even the gauze ones. What he changed was whether flies could get in, through the cover." },
            { match: "jar size", coach: "The jars were the same, so jar size was controlled. Only the cover differed." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "number",
            prompt: "In a tug of war, Team A pulls left with 500 N and Team B pulls right with 500 N. What is the unbalanced (net) force on the rope?",
            answer: 0,
            tolerance: 0,
            unit: "N",
            hint: "When forces point in opposite directions, they work against each other, so subtract instead of add.",
            mistakes: [
              { match: "1000", coach: "Adding works only when forces point the same way. These pulls are opposite, so they cancel." },
              { match: "500", coach: "Each team pulls with 500 N, but they pull in opposite directions. What is left after they cancel?" },
            ],
            seconds: 20,
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
          probe: {
            type: "cloze",
            text: "A soccer ball rolling across grass slows and stops because {0} pushes against its motion. On perfectly smooth, endless ice, the ball's {1} would keep it rolling forever.",
            blanks: [
              { answers: ["friction"] },
              { answers: ["inertia"] },
            ],
            bank: ["friction", "inertia", "gravity", "magnetism", "fuel"],
            hint: "One word is the force that rubs against motion; the other is the tendency to keep doing what you are already doing.",
            mistakes: [
              { match: "gravity", coach: "Gravity pulls down, not backward along flat ground. The backward force from the grass is something else." },
              { match: "fuel", coach: "A ball does not carry fuel or a supply of force that runs out. It keeps moving unless a force stops it." },
              { match: "magnetism", coach: "Grass is not magnetic. Think about the force made when surfaces rub together." },
            ],
            seconds: 25,
          },
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
          probe: {
            type: "number",
            prompt: "You push a 5 kg wagon with 20 N of unbalanced force. What is its acceleration, in meters per second each second?",
            answer: 4,
            tolerance: 0,
            unit: "m/s each second",
            hint: "Rearrange F = ma so that acceleration is by itself on one side.",
            mistakes: [
              { match: "100", coach: "That is force times mass. Acceleration is force divided by mass: a = F / m." },
              { match: "15", coach: "That is 20 minus 5. The second law uses division: a = F / m." },
              { match: "0.25", coach: "That is mass divided by force, which is upside down. Put the force on top." },
            ],
            seconds: 25,
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
          probe: {
            type: "match",
            prompt: "Match each action force to its reaction force.",
            pairs: [
              { left: "A small car pushes on a big truck in a crash", right: "The truck pushes on the car with an equal force" },
              { left: "You jump forward off a skateboard", right: "The skateboard rolls backward" },
              { left: "A loose balloon squeezes air out the back", right: "The air pushes the balloon forward" },
              { left: "You sit down and push on a chair", right: "The chair pushes up on you" },
            ],
            hint: "A reaction force acts on the other object, with the same size, in the opposite direction.",
            mistakes: [
              { match: "Matched the car crash to a bigger force", coach: "The truck does not push harder. Action-reaction forces are always equal; the car is affected more because it has less mass." },
              { match: "Mixed up the skateboard and balloon", coach: "Look for the pair that involves the same two objects. The skateboard's partner involves you and the board." },
            ],
            seconds: 40,
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
      mastery: [
        {
          type: "sort",
          prompt: "New situations: which of Newton's laws best explains each one?",
          buckets: ["First law (inertia)", "Second law (F = ma)", "Third law (action-reaction)"],
          items: [
            { text: "A tablecloth yanked quickly leaves the dishes in place", bucket: 0 },
            { text: "A hockey puck glides a long way on smooth ice", bucket: 0 },
            { text: "A bowling ball needs a bigger push than a tennis ball to reach the same speed", bucket: 1 },
            { text: "Doubling the push on a cart doubles its acceleration", bucket: 1 },
            { text: "A cannon kicks backward when it fires", bucket: 2 },
            { text: "A rowboat moves forward as the oars push water back", bucket: 2 },
          ],
          hint: "First law: things keep doing what they were doing. Second law: force, mass, and acceleration. Third law: two objects pushing on each other.",
          mistakes: [
            { match: "Cannon sorted as first law", coach: "The cannon pushes the cannonball forward and the cannonball pushes the cannon back. That pair of forces is the third law." },
            { match: "Bowling ball sorted as first law", coach: "This compares how much force different masses need for the same acceleration. That is F = ma." },
            { match: "Tablecloth sorted as third law", coach: "The dishes simply stay where they were because of inertia. Nothing is pushing back on the cloth." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "How much unbalanced force does it take to give a 60 kg sled an acceleration of 2 meters per second each second?",
          answer: 120,
          tolerance: 0,
          unit: "N",
          hint: "Here you know the mass and the acceleration, so use F = ma directly.",
          mistakes: [
            { match: "30", coach: "That is 60 divided by 2. To find force, multiply mass by acceleration." },
            { match: "62", coach: "That is 60 plus 2. F = ma means multiply." },
          ],
          seconds: 30,
        },
        {
          type: "place",
          prompt: "Place the net force for each situation on the line. Right is positive and left is negative.",
          min: -200,
          max: 200,
          step: 5,
          tolerance: 5,
          items: [
            { label: "Push 50 N right, friction 30 N left", value: 20 },
            { label: "Two teams each pull 400 N, opposite ways", value: 0 },
            { label: "Team pulls 450 N right, other team 300 N left", value: 150 },
            { label: "Team pulls 600 N left, other team 450 N right", value: -150 },
          ],
          hint: "Subtract the smaller force from the bigger one, and the net force points the way the bigger force points.",
          mistakes: [
            { match: "Added opposite forces", coach: "Forces pointing in opposite directions work against each other. Subtract them instead of adding." },
            { match: "Placed the 600 N left case on the right", coach: "The bigger pull is to the left, so the net force points left, which is negative on this line." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "When a small car hits a big truck, the two push on each other with {0} force. The car is affected more because it has less {1}.",
          blanks: [
            { answers: ["equal", "the same", "same", "equal and opposite"] },
            { answers: ["mass", "weight"] },
          ],
          bank: ["equal", "mass", "greater", "smaller", "speed"],
          hint: "The third law tells you about the size of the two forces; the second law tells you why the effects differ.",
          mistakes: [
            { match: "greater", coach: "It feels like the truck should push harder, but action-reaction forces are always equal in size." },
            { match: "smaller", coach: "The car does not push with less force. The two forces in a pair are always equal." },
            { match: "speed", coach: "The difference in damage comes from mass: the same force gives a lighter object a bigger acceleration." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "number",
            prompt: "Gravity pulls with about 10 N on each kilogram. About how many joules of gravitational potential energy does a 2 kg rock store on a 5 m high ledge? (Energy = mass x 10 x height)",
            answer: 100,
            tolerance: 0,
            unit: "J",
            hint: "Multiply all three numbers together: the mass, the pull of gravity per kilogram, and the height.",
            mistakes: [
              { match: "10", coach: "That is just mass times height. Do not forget gravity's pull of about 10 N for every kilogram." },
              { match: "50", coach: "That is 10 times the height, which leaves out the mass. A heavier rock stores more energy, so multiply by 2 too." },
              { match: "17", coach: "That adds the numbers. Potential energy multiplies mass, gravity, and height." },
            ],
            seconds: 35,
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
          probe: {
            type: "build",
            prompt: "Build the energy story of one pendulum swing, from release to the far side.",
            tiles: [
              "Held high: most potential energy, not moving",
              "Swinging down: potential energy becomes kinetic energy",
              "At the bottom: most kinetic energy, moving fastest",
              "Swinging up: kinetic energy becomes potential energy",
              "At the far high point: stops for an instant",
            ],
            distractors: ["At the bottom: stops for an instant"],
            hint: "Follow the height: as the pendulum loses height it gains speed, and as it gains height it loses speed.",
            mistakes: [
              { match: "Used 'At the bottom: stops for an instant'", coach: "The pendulum never stops at the bottom; that is where it moves fastest. It stops only at the high points, where it turns around." },
              { match: "Put 'most kinetic energy' at a high point", coach: "At the high points the pendulum is barely moving, so kinetic energy is smallest there. Speed peaks at the lowest point." },
            ],
            seconds: 45,
          },
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
          probe: {
            type: "cloze",
            text: "A ball dropped from 100 cm bounces back to only 70 cm. The missing energy was not {0}. It changed into {1} and {2} during the bounce.",
            blanks: [
              { answers: ["destroyed", "deleted", "erased"] },
              { answers: ["heat", "thermal energy", "thermal", "sound", "sound energy"] },
              { answers: ["sound", "sound energy", "heat", "thermal energy", "thermal"] },
            ],
            bank: ["destroyed", "heat", "sound", "mass", "gravity", "created"],
            hint: "Energy is never destroyed. Think about what you can hear and what you could feel if you touched the floor right where the ball hit.",
            mistakes: [
              { match: "created", coach: "The first sentence is about energy disappearing, not appearing. Energy can never be destroyed, so that is the word you need." },
              { match: "gravity", coach: "Gravity is a force that changes potential energy into kinetic energy, not a form the energy turns into." },
              { match: "mass", coach: "The ball does not lose mass when it bounces. The energy spreads out as forms you can feel and hear." },
            ],
            seconds: 30,
          },
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
      mastery: [
        {
          type: "place",
          prompt: "A ball keeps 60 percent of its height on every bounce. It is dropped from 100 cm. Place the heights of its first three bounces.",
          min: 0,
          max: 100,
          step: 1,
          tolerance: 3,
          items: [
            { label: "1st bounce", value: 60 },
            { label: "2nd bounce", value: 36 },
            { label: "3rd bounce", value: 21.6 },
          ],
          hint: "Each bounce is 60 percent of the bounce before it, not 60 percent of the starting height.",
          mistakes: [
            { match: "Dropped 40 cm every bounce (60, 20, ...)", coach: "The ball loses a percentage each time, not the same number of centimeters. Take 60 percent of 60 cm for the second bounce." },
            { match: "Every bounce at 60 cm", coach: "Energy spreads out as heat and sound on every bounce, so each bounce must be lower than the one before." },
          ],
          seconds: 60,
        },
        {
          type: "match",
          prompt: "Match each example to the main form of energy it shows.",
          pairs: [
            { left: "A stretched slingshot", right: "Elastic potential energy" },
            { left: "A book on a high shelf", right: "Gravitational potential energy" },
            { left: "A sandwich in your lunchbox", right: "Chemical potential energy" },
            { left: "A skateboarder speeding downhill", right: "Kinetic energy" },
            { left: "The floor warming slightly where a ball bounced", right: "Heat (thermal energy)" },
          ],
          hint: "Ask: is it moving, is it stored by height, stored by a stretch, stored in food or fuel, or spread out as warmth?",
          mistakes: [
            { match: "Slingshot matched to kinetic energy", coach: "Before it is released, the slingshot is not moving. Its energy is stored in the stretch." },
            { match: "Sandwich matched to gravitational potential energy", coach: "A sandwich's energy is stored in its chemicals, which your body unlocks when you digest it." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "A 2 kg ball held 5 m up stores about 100 J of potential energy. Ignoring air resistance, how much kinetic energy does it have when it has fallen to 1 m above the ground? (Potential energy = mass x 10 x height)",
          answer: 80,
          tolerance: 0,
          unit: "J",
          hint: "First find how much potential energy is still left at 1 m. The rest has become kinetic energy.",
          mistakes: [
            { match: "20", coach: "20 J is the potential energy still stored at 1 m. The question asks for the energy that has turned into motion." },
            { match: "100", coach: "100 J is the total. At 1 m up, some is still stored as potential energy, so the kinetic part is less." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "In Joule's experiment, a falling weight spun paddles that {0} the water, proving that motion can turn into {1}. Energy can change form, but it can never be created or {2}.",
          blanks: [
            { answers: ["warmed", "heated", "warmed up", "heated up"] },
            { answers: ["heat", "thermal energy", "thermal"] },
            { answers: ["destroyed"] },
          ],
          bank: ["warmed", "heat", "destroyed", "froze", "sound", "moved"],
          hint: "Joule measured the temperature of the water before and after. Think about what changed.",
          mistakes: [
            { match: "froze", coach: "Churning water does not freeze it. The paddles' motion made the water slightly warmer." },
            { match: "sound", coach: "Joule measured temperature, not sound. Motion was turned into heat." },
          ],
          seconds: 40,
        },
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
          probe: {
            type: "match",
            prompt: "Match each everyday object to the simple machine it is.",
            pairs: [
              { left: "Doorstop", right: "Wedge" },
              { left: "Flagpole rope and wheel", right: "Pulley" },
              { left: "Threads on a jar lid", right: "Screw" },
              { left: "Seesaw", right: "Lever" },
              { left: "Doorknob", right: "Wheel and axle" },
            ],
            hint: "Look at the shape: a pivoting bar, a wheel with a rope, a big wheel on a rod, a thin sloped block, or a ramp wrapped in a spiral.",
            mistakes: [
              { match: "Doorstop matched to lever", coach: "A doorstop does not pivot. It is a thin sloped block that squeezes into a gap, which makes it a wedge." },
              { match: "Jar lid matched to wedge", coach: "The lid's threads spiral around the jar like a ramp wrapped around a post. That is a screw." },
              { match: "Doorknob matched to pulley", coach: "A doorknob has no rope. Its big handle turns a small rod inside the door: a wheel and axle." },
            ],
            seconds: 40,
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
          probe: {
            type: "number",
            prompt: "Lifting a 600 N crate straight up 1 m takes 600 J of work. About how much force would you need to push it up a smooth 4 m ramp to the same height?",
            answer: 150,
            tolerance: 0,
            unit: "N",
            hint: "The work stays about the same. Work is force times distance, so spread the 600 J over the longer distance.",
            mistakes: [
              { match: "2400", coach: "That multiplies by the ramp length. A longer ramp means LESS force, so divide the work by the distance." },
              { match: "600", coach: "That is the force for lifting straight up. The ramp spreads the work over 4 m, so you need less force." },
              { match: "596", coach: "That subtracts the length. Work = force x distance, so divide 600 J by 4 m." },
            ],
            seconds: 35,
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
          probe: {
            type: "target",
            prompt: "A 40 kg load sits at the left end of the lever and you push down on the right end. Slide the fulcrum until a push of 10 kg or less can lift the load.",
            goal: { sim: "lever", load: 40, maxPush: 10 },
            hint: "The farther your push is from the fulcrum compared with the load, the less push you need.",
            mistakes: [
              { match: "Moved the fulcrum toward the push end", coach: "Moving the fulcrum close to your hands makes your side short, so you need MORE push. Slide it toward the load." },
              { match: "Fulcrum in the middle", coach: "With the fulcrum in the middle, both distances are equal, so you would have to push the full 40 kg. Your side needs to be much longer." },
            ],
            seconds: 45,
          },
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
          probe: {
            type: "number",
            prompt: "A crowbar has an effort distance of 90 cm and a load distance of 18 cm. What is its mechanical advantage?",
            answer: 5,
            tolerance: 0,
            hint: "Mechanical advantage for a lever is one distance divided by the other. Put the longer, effort distance on top.",
            mistakes: [
              { match: "72", coach: "That is 90 minus 18. Mechanical advantage is a division: effort distance divided by load distance." },
              { match: "1620", coach: "That is 90 times 18. Divide instead: 90 / 18." },
              { match: "0.2", coach: "That is 18 divided by 90, which is upside down. A crowbar multiplies your force, so its advantage is more than 1." },
            ],
            seconds: 30,
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
      mastery: [
        {
          type: "number",
          prompt: "A 120 N load sits 15 cm from a lever's fulcrum. You push down 45 cm from the fulcrum on the other side. What effort force balances the load?",
          answer: 40,
          tolerance: 0,
          unit: "N",
          hint: "Use the lever rule: effort x effort distance = load x load distance. Find the load side first.",
          mistakes: [
            { match: "360", coach: "That is more than the load. Your hands are farther from the fulcrum, so you need LESS force than 120 N." },
            { match: "120", coach: "That would balance only if both distances were equal. Your side is 3 times longer, so the effort is smaller." },
            { match: "3", coach: "3 is the mechanical advantage (45 / 15). Use it: divide the 120 N load by 3." },
          ],
          seconds: 45,
        },
        {
          type: "target",
          prompt: "Harder load: a 60 kg load sits at the left end. Slide the fulcrum so that a push of 12 kg or less lifts it.",
          goal: { sim: "lever", load: 60, maxPush: 12 },
          hint: "You need a mechanical advantage of at least 5, so your side of the lever must be at least 5 times longer than the load's side.",
          mistakes: [
            { match: "Fulcrum near the push end", coach: "That makes your side short and the load's side long, so the push gets bigger. Slide the fulcrum close to the load." },
            { match: "Fulcrum only a little left of center", coach: "Closer, but not enough. A 60 kg load with a 12 kg push needs your distance to be 5 times the load distance." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "A screw is an {0} wrapped around a post. Like every simple machine, it does not create energy; it trades {1} for force.",
          blanks: [
            { answers: ["inclined plane", "ramp", "incline"] },
            { answers: ["distance"] },
          ],
          bank: ["inclined plane", "distance", "pulley", "energy", "mass", "lever"],
          hint: "Picture the threads on a jar lid as a path climbing in a spiral. Then remember what you give up when you push with less force.",
          mistakes: [
            { match: "lever", coach: "A lever is a bar that pivots. A screw's threads are a sloped path wound around a post." },
            { match: "energy", coach: "Machines never create or trade away energy. You push with less force over a longer distance." },
            { match: "pulley", coach: "A pulley uses a wheel and rope. The screw's spiral thread is a ramp." },
          ],
          seconds: 35,
        },
        {
          type: "place",
          prompt: "Place each machine on the line by its mechanical advantage.",
          min: 0,
          max: 6,
          step: 0.5,
          tolerance: 0.25,
          items: [
            { label: "Lever: effort 80 cm, load 20 cm", value: 4 },
            { label: "Ramp 6 m long, rising 2 m", value: 3 },
            { label: "Ramp 5 m long, rising 1 m", value: 5 },
            { label: "Forearm: effort 5 cm, load 10 cm", value: 0.5 },
          ],
          hint: "For a lever, divide effort distance by load distance. For a ramp, divide its length by its height.",
          mistakes: [
            { match: "Forearm placed at 2", coach: "The effort distance (5 cm) is shorter than the load distance (10 cm), so 5 / 10 gives less than 1. Your forearm trades force for speed." },
            { match: "Ramp 6 m placed at 12 or off the line", coach: "Divide the length by the height, 6 / 2, instead of multiplying." },
          ],
          seconds: 60,
        },
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
          probe: {
            type: "cloze",
            text: "Cell theory says: all living things are made of {0}, the cell is the basic {1} of life, and new cells come only from {2} cells.",
            blanks: [
              { answers: ["cells", "cell"] },
              { answers: ["unit"] },
              { answers: ["existing", "other", "living", "older", "parent", "earlier"] },
            ],
            bank: ["cells", "unit", "existing", "atoms", "nonliving", "organs"],
            hint: "Remember Redi's jars: life does not appear out of nonliving stuff. Apply that idea to cells.",
            mistakes: [
              { match: "nonliving", coach: "That is the old idea of life popping out of nonliving things, like flies from meat. Cells only come from cells that already exist." },
              { match: "atoms", coach: "Everything is made of atoms, even rocks. Cell theory is about what makes up LIVING things." },
              { match: "organs", coach: "Bacteria have no organs, but they are alive. The building block shared by every living thing is smaller." },
            ],
            seconds: 35,
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
          probe: {
            type: "match",
            prompt: "Match each organelle to its job.",
            pairs: [
              { left: "Cell membrane", right: "Controls what enters and leaves the cell" },
              { left: "Nucleus", right: "Holds the DNA instructions" },
              { left: "Mitochondria", right: "Release energy from sugar" },
              { left: "Cytoplasm", right: "Jelly-like fluid that holds the organelles" },
              { left: "Ribosomes", right: "Build proteins" },
            ],
            hint: "Think of the cell as a school: a front entrance, a main office with the rulebook, a power plant, hallways, and workshops.",
            mistakes: [
              { match: "Mitochondria matched to holding DNA", coach: "Mitochondria are the power plants that release energy from sugar. The DNA rulebook is kept in the nucleus." },
              { match: "Membrane matched to holding organelles", coach: "The membrane is the gatekeeper around the outside. The jelly that holds the organelles is the cytoplasm." },
              { match: "Ribosomes matched to releasing energy", coach: "Ribosomes are tiny builders that make proteins. Releasing energy is the mitochondria's job." },
            ],
            seconds: 45,
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
          probe: {
            type: "build",
            prompt: "Build the path energy takes inside a leaf cell, from the Sun to energy the cell can use.",
            tiles: ["Sunlight", "Chloroplast", "Sugar", "Mitochondria", "Energy the cell can use"],
            distractors: ["Cell wall"],
            hint: "One organelle stores the Sun's energy in food; another unlocks the energy from that food.",
            mistakes: [
              { match: "Mitochondria before chloroplast", coach: "Mitochondria need sugar to work on, and the chloroplast makes that sugar. So the chloroplast comes first." },
              { match: "Used 'Cell wall'", coach: "The cell wall gives the cell support and shape. It is not part of the energy path." },
              { match: "Skipped mitochondria", coach: "Chloroplasts make sugar, but the cell still needs mitochondria to release the energy stored in it." },
            ],
            seconds: 35,
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
      mastery: [
        {
          type: "highlight",
          prompt: "A student wrote this description of an ANIMAL cell. Tap every sentence that contains a mistake.",
          sentences: [
            "It has a nucleus that holds DNA.",
            "A stiff cell wall gives it a boxy shape.",
            "Its mitochondria release energy from sugar.",
            "Its chloroplasts make sugar from sunlight.",
            "Its membrane controls what enters and leaves.",
            "Ribosomes in its cytoplasm build proteins.",
          ],
          correct: [1, 3],
          hint: "Two of these parts belong only in plant cells.",
          mistakes: [
            { match: "Tapped the mitochondria sentence", coach: "Animal cells do have mitochondria; that is how your muscles get energy. Look for parts found only in plants." },
            { match: "Tapped the nucleus sentence", coach: "Both plant and animal cells have a nucleus holding DNA. That sentence is correct." },
            { match: "Missed the cell wall sentence", coach: "Animal cells have only a flexible membrane, no stiff wall. That is why they are usually rounder." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each clue to the cell part it describes.",
          pairs: [
            { left: "Celery goes limp when this loses water", right: "Central vacuole" },
            { left: "Leaves are green because of this", right: "Chloroplasts" },
            { left: "Muscle cells are packed with these", right: "Mitochondria" },
            { left: "Helps a tree stand upright", right: "Cell wall" },
            { left: "Follows DNA instructions to make proteins", right: "Ribosomes" },
          ],
          hint: "Think about what each clue needs: water storage, sunlight capture, energy, stiffness, or building.",
          mistakes: [
            { match: "Celery matched to cell wall", coach: "The wall stays put when celery wilts. What changes is the water stored in the vacuoles pressing against the walls." },
            { match: "Muscle matched to chloroplasts", coach: "Muscle cells are animal cells and have no chloroplasts. They release energy from sugar using mitochondria." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "A typical human cell is about 0.01 mm across. How many cells lined up side by side would make a row 1 cm (10 mm) long?",
          answer: 1000,
          tolerance: 0,
          unit: "cells",
          hint: "Find how many cells fit in 1 mm first, then scale up to 10 mm.",
          mistakes: [
            { match: "100", coach: "100 cells make a row only 1 mm long. A centimeter is 10 mm, so you need 10 times as many." },
            { match: "0.1", coach: "That multiplies 0.01 by 10. Instead, divide the length of the row by the width of one cell: 10 / 0.01." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "In cork, Robert Hooke saw the empty {0} of dead plant cells. Later, van Leeuwenhoek became the first person to see {1} single-celled creatures in pond water.",
          blanks: [
            { answers: ["walls", "cell walls", "wall"] },
            { answers: ["living", "live", "alive", "swimming"] },
          ],
          bank: ["walls", "living", "nuclei", "dead", "chloroplasts"],
          hint: "Cork is dead tissue, so only a sturdy outer part was left. Van Leeuwenhoek's creatures were wiggling.",
          mistakes: [
            { match: "nuclei", coach: "Cork cells are dead and empty, so their insides, like nuclei, were gone. Hooke saw what was left around the outside." },
            { match: "chloroplasts", coach: "Cork comes from tree bark, which is dead and not green. Hooke saw only the leftover boxes around each cell." },
            { match: "dead", coach: "Van Leeuwenhoek's big discovery was creatures that moved and swam. They were alive." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "cloze",
            text: "Earth {0} on its axis once every day, which gives us day and night. It {1} the Sun once every year.",
            blanks: [
              { answers: ["spins", "rotates", "turns", "spins around", "turns around"] },
              { answers: ["orbits", "circles", "revolves around", "travels around", "goes around", "orbits around"] },
            ],
            bank: ["spins", "orbits", "stops", "blocks", "shrinks"],
            hint: "One motion is fast, once a day. The other is slow, one trip around the Sun per year.",
            mistakes: [
              { match: "orbits", coach: "If you put orbits first: one orbit takes a whole year, far too slow for day and night. The daily motion is Earth spinning." },
              { match: "blocks", coach: "Earth does not block the Sun to make night. Your side of Earth simply turns away from the Sun." },
              { match: "stops", coach: "Earth never stops moving. It spins and orbits at the same time." },
            ],
            seconds: 25,
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
          probe: {
            type: "target",
            prompt: "Move Earth around its orbit to a month when the Northern Hemisphere has summer. Watch which way the north end of the axis leans.",
            goal: { sim: "seasons", season: "summer" },
            hint: "Summer comes when the northern half of Earth leans toward the Sun and gets the most direct light, not when Earth is closest.",
            mistakes: [
              { match: "Picked January (Earth closest to the Sun)", coach: "Earth is closest to the Sun in early January, but that is winter in the north. Distance is not the cause; look for when the north tilts toward the Sun." },
              { match: "Picked December", coach: "In December the north leans away from the Sun, so sunlight is slanted and days are short. Go halfway around the orbit." },
            ],
            seconds: 30,
          },
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
          probe: {
            type: "number",
            prompt: "Suppose the shadow angle in Alexandria had been 9 degrees instead of 7.2. How many times would that angle fit into a full 360 degree circle? (That tells you what fraction of Earth's circumference lies between the cities.)",
            answer: 40,
            tolerance: 0,
            hint: "A full circle is 360 degrees. Find how many 9 degree slices fit into it.",
            mistakes: [
              { match: "50", coach: "50 goes with the real angle of 7.2 degrees. A bigger angle means fewer slices fit around the circle." },
              { match: "3240", coach: "That multiplies 360 by 9. You want to know how many 9s fit into 360, so divide." },
              { match: "9", coach: "9 is the angle itself. Divide 360 by 9 to find the number of slices." },
            ],
            seconds: 30,
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
          probe: {
            type: "match",
            prompt: "Match each Moon phase to where the Moon is and what we see.",
            pairs: [
              { left: "New moon", right: "Between Earth and the Sun; its lit side faces away from us" },
              { left: "First quarter", right: "About a week after new moon; we see the right half lit" },
              { left: "Full moon", right: "On the far side of Earth from the Sun; we see its whole lit face" },
              { left: "Third quarter", right: "About three weeks after new moon; we see the left half lit" },
            ],
            hint: "The Sun always lights half the Moon. Where the Moon sits in its orbit decides how much of that lit half faces us.",
            mistakes: [
              { match: "Full moon matched to between Earth and the Sun", coach: "Between Earth and the Sun, the lit side faces away from us. That is new moon. A full moon is on the opposite side of Earth from the Sun." },
              { match: "Swapped first and third quarter", coach: "The lit part grows first and shrinks later. First quarter comes about a week after new moon; third quarter about three weeks after." },
            ],
            seconds: 45,
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
      mastery: [
        {
          type: "target",
          prompt: "Now find winter: move Earth to a month when the Northern Hemisphere has winter.",
          goal: { sim: "seasons", season: "winter" },
          hint: "Winter comes when the northern half leans away from the Sun, so sunlight arrives at a low slant and days are short.",
          mistakes: [
            { match: "Picked July", coach: "In July the north leans toward the Sun, which makes summer. Winter is on the opposite side of the orbit." },
            { match: "Picked a month when Earth is farthest from the Sun", coach: "Earth is farthest from the Sun in early July, during northern summer. Follow the tilt, not the distance." },
          ],
          seconds: 30,
        },
        {
          type: "place",
          prompt: "Place each phase on the Moon's 29.5 day cycle, counting from new moon on day 0.",
          min: 0,
          max: 30,
          step: 0.5,
          tolerance: 1.5,
          items: [
            { label: "First quarter", value: 7.4 },
            { label: "Full moon", value: 14.8 },
            { label: "Third quarter", value: 22.1 },
            { label: "Next new moon", value: 29.5 },
          ],
          hint: "The cycle splits into four roughly equal parts of about a week each.",
          mistakes: [
            { match: "Full moon placed near day 29.5", coach: "Full moon comes halfway through the cycle. After it, the Moon wanes for two more weeks back to new." },
            { match: "Third quarter placed before full moon", coach: "The lit part grows (waxes) to full first, then shrinks (wanes). Third quarter comes after full moon." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "Imagine two cities 500 km apart, one due north of the other. At noon, the Sun is straight overhead in one, and a stick in the other casts a shadow at 4.5 degrees. Using Eratosthenes' method, what circumference does that give for Earth?",
          answer: 40000,
          tolerance: 0,
          unit: "km",
          hint: "First find how many times 4.5 degrees fits into 360 degrees. Then multiply by the distance between the cities.",
          mistakes: [
            { match: "80", coach: "80 is how many slices fit around the circle. Now multiply by the 500 km length of each slice." },
            { match: "2250", coach: "That multiplies the angle by the distance. First find 360 / 4.5, then multiply by 500 km." },
          ],
          seconds: 60,
        },
        {
          type: "build",
          prompt: "Build a correct explanation of why July is summer in the Northern Hemisphere.",
          tiles: [
            "Earth's axis is tilted about 23.5 degrees,",
            "so in July the northern half leans toward the Sun.",
            "Sunlight hits the ground more directly,",
            "and days are longer,",
            "so the north warms up.",
          ],
          distractors: ["because Earth is closest to the Sun in July", "because the Sun burns hotter in summer"],
          hint: "Start with the cause, the tilt, then describe what the tilt does to sunlight and day length.",
          mistakes: [
            { match: "Used 'because Earth is closest to the Sun in July'", coach: "Earth is actually closest in early January, during northern winter. Distance is not the cause of seasons." },
            { match: "Used 'because the Sun burns hotter in summer'", coach: "The Sun's output stays almost the same all year. What changes is how directly its light hits us." },
          ],
          seconds: 50,
        },
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

    // 7. Matter and chemical change
    {
      id: "science.matter",
      title: "Matter and Change: Atoms, Molecules and Reactions",
      minutes: 35,
      stage: "grammar",
      read: [
        "Everything around you, from the air you breathe to the chair you sit on, is matter. Matter is anything that has mass and takes up space. All matter is made of atoms, particles so tiny that a single drop of water holds more than a billion billion of them. A substance made of only one kind of atom is called an element. Gold, oxygen, carbon and iron are elements. Scientists have discovered 118 elements and arranged them in a chart called the periodic table.",
        "Atoms can join, or bond, to form molecules. A water molecule is two hydrogen atoms bonded to one oxygen atom, which is why chemists write it as H2O. When two or more different elements are bonded together, the result is a compound. A compound can be completely different from the elements that make it. Sodium is a soft metal that fizzes violently in water, and chlorine is a poisonous yellow-green gas, yet together they make ordinary table salt.",
        "Matter can change in two main ways. In a physical change, a substance changes its size, shape or state, but it is still the same substance. Melting ice, chopping wood and dissolving sugar in tea are physical changes. In a chemical change, also called a chemical reaction, atoms rearrange to form new substances with new properties. Burning wood, rusting iron and baking a cake are chemical changes. Clues that a reaction has happened include bubbles of gas, a new color, a new smell, light or heat, or a solid forming in a liquid.",
        "In the 1770s and 1780s, the French chemist Antoine Lavoisier weighed substances carefully before and after reactions in sealed containers. He found that the total mass stayed the same. This is the law of conservation of mass: in a chemical reaction, atoms are not created or destroyed, only rearranged. When a log burns down to a small pile of ash, the missing mass has not vanished. It has floated away as invisible gases, mostly carbon dioxide and water vapor.",
      ].join("\n\n"),
      keyIdeas: [
        "All matter is made of atoms; an element has only one kind of atom.",
        "Atoms bond into molecules, and different elements bonded together form compounds.",
        "A physical change keeps the same substance; a chemical change makes new substances.",
        "In a chemical reaction, atoms are rearranged, never created or destroyed, so mass is conserved.",
      ],
      hook: {
        text: "A big log goes into a campfire, and a few hours later all that is left is a small pile of gray ash. Where did the rest of the log go? Did it simply disappear? About 250 years ago, a French chemist named Antoine Lavoisier set out to answer questions like this with a very careful balance, and what he found became one of the great laws of science.",
      },
      teach: [
        {
          title: "Atoms and Elements",
          teach:
            "Matter is anything that has mass and takes up space: rocks, water, air, even you. All matter is built from atoms, which are far too small to see even with an ordinary microscope. A single drop of water holds more than a billion billion of them. An element is a pure substance made of only one kind of atom. Gold is made only of gold atoms; oxygen is made only of oxygen atoms. Scientists have found 118 elements so far and arranged them in the periodic table, a chart that groups elements with similar properties. Each element has a one- or two-letter symbol. Some come from English names, like O for oxygen. Others come from Latin, like Fe for iron (ferrum) and Au for gold (aurum).",
          visual: {
            type: "flip",
            cards: [
              { front: "Matter", back: "Anything that has mass and takes up space." },
              { front: "Atom", back: "The tiny building block of all matter." },
              { front: "Element", back: "A pure substance made of only one kind of atom, like gold or oxygen." },
              { front: "Periodic table", back: "The chart of all 118 known elements, grouped by similar properties." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each element to its chemical symbol.",
            pairs: [
              { left: "Oxygen", right: "O" },
              { left: "Carbon", right: "C" },
              { left: "Hydrogen", right: "H" },
              { left: "Iron", right: "Fe" },
              { left: "Gold", right: "Au" },
              { left: "Sodium", right: "Na" },
            ],
            hint: "Some symbols are the first letter of the English name. Others come from Latin names: ferrum (iron), aurum (gold) and natrium (sodium).",
            mistakes: [
              { match: "Gold matched to Fe", coach: "Fe comes from ferrum, the Latin word for iron. Gold's Latin name is aurum, so its symbol is Au." },
              { match: "Sodium matched to Au", coach: "Au is gold. Sodium's symbol, Na, comes from its Latin name, natrium." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which of these is an element?",
            choices: ["Water", "Table salt", "Gold", "Air"],
            answer: 2,
            why: "Gold is made of only one kind of atom: gold atoms.",
            hints: [
              "Water is made of hydrogen and oxygen atoms bonded together, so it contains two elements.",
              "Table salt is sodium and chlorine bonded together, so it contains two elements.",
              "",
              "Air is a mixture of several gases, such as nitrogen, oxygen and carbon dioxide.",
            ],
          },
          approaches: {
            analogy:
              "Elements are like the letters of the alphabet. There are only 26 letters, but they combine into every word in the dictionary. In the same way, about 118 elements combine to make all the millions of substances in the world.",
            example:
              "A pure gold ring contains only gold atoms, so gold is an element. A glass of water contains hydrogen and oxygen atoms joined together, so water is not an element; it is made from two elements.",
            simpler: {
              q: "An element is made of...",
              choices: ["Only one kind of atom", "Two kinds of atoms", "Any mixture of things"],
              answer: 0,
              why: "An element is a pure substance with just one kind of atom.",
              hints: [
                "",
                "Two kinds of atoms bonded together make a compound, not an element.",
                "A mixture combines different substances. An element is pure: one kind of atom.",
              ],
            },
          },
        },
        {
          title: "Molecules and Compounds",
          teach:
            "Atoms rarely stay alone. They bond, or hold together, to form molecules. A water molecule is two hydrogen atoms bonded to one oxygen atom, so its formula is H2O. The small number after a letter tells how many atoms of that element are in one molecule. Carbon dioxide, CO2, is one carbon atom and two oxygen atoms. When different elements bond, they form a compound, and a compound can behave nothing like its ingredients. Sodium is a soft metal that fizzes violently in water. Chlorine is a poisonous yellow-green gas. Bonded together, they make sodium chloride: the table salt you sprinkle on food. Some molecules have just one element, like the oxygen we breathe, O2. That makes it a molecule, but not a compound.",
          visual: {
            type: "sort",
            prompt: "Sort each substance by what it is made of.",
            buckets: ["Element (one kind of atom)", "Compound (two or more elements bonded)"],
            items: [
              { text: "Oxygen gas, O2", bucket: 0 },
              { text: "Water, H2O", bucket: 1 },
              { text: "Carbon dioxide, CO2", bucket: 1 },
              { text: "Pure copper, Cu", bucket: 0 },
              { text: "Table salt, NaCl", bucket: 1 },
              { text: "Helium, He", bucket: 0 },
            ],
          },
          probe: {
            type: "number",
            prompt: "Table sugar has the formula C12H22O11. How many atoms are in one molecule of sugar?",
            answer: 45,
            tolerance: 0,
            unit: "atoms",
            hint: "Add the small numbers: the carbon atoms, plus the hydrogen atoms, plus the oxygen atoms.",
            mistakes: [
              { match: "3", coach: "3 is the number of different elements (C, H and O). Count the atoms instead: add 12 + 22 + 11." },
              { match: "34", coach: "That is 12 + 22. Don't forget the 11 oxygen atoms." },
              { match: "12", coach: "12 is just the carbon atoms. Add the hydrogen and oxygen atoms too." },
            ],
            seconds: 30,
          },
          think: {
            q: "How many atoms are in one molecule of carbon dioxide, CO2?",
            choices: ["2", "1", "3", "4"],
            answer: 2,
            why: "C is one carbon atom and O2 is two oxygen atoms: 1 + 2 = 3.",
            hints: [
              "2 is the number of oxygen atoms. Don't forget the carbon atom.",
              "1 is just the carbon atom. The small 2 means there are two oxygen atoms as well.",
              "",
              "Count again: C means one carbon and O2 means two oxygens. That is 1 + 2.",
            ],
          },
          approaches: {
            analogy:
              "Bonding atoms is like snapping building bricks together. The same few brick shapes can make a car, a house or a spaceship, and the finished model can look nothing like a loose pile of bricks.",
            example:
              "Ammonia, NH3, is one nitrogen atom bonded to three hydrogen atoms, so each molecule has 1 + 3 = 4 atoms. Because it contains two different elements, ammonia is a compound.",
            simpler: {
              q: "In H2O, how many hydrogen atoms are there?",
              choices: ["1", "2", "3"],
              answer: 1,
              why: "The small 2 after the H means two hydrogen atoms.",
              hints: [
                "1 is the number of oxygen atoms. Look at the small number right after the H.",
                "",
                "3 is the total number of atoms. The question asks only about hydrogen.",
              ],
            },
          },
        },
        {
          title: "Physical and Chemical Changes",
          teach:
            "A physical change alters how matter looks, its size, shape or state, but not what it is. When ice melts, it is still water. When you tear paper, every piece is still paper. Dissolving sugar in tea is physical too: the sugar molecules spread out, but they are still sugar. A chemical change makes one or more new substances with new properties. When iron rusts, iron and oxygen form iron oxide, a crumbly reddish-brown material. When you bake a cake, the batter turns into something spongy that can never become batter again. Watch for clues of a chemical change: gas bubbles, a color change, a new smell, light or heat given off, or a solid appearing in a liquid. Clues are not proof, though. Boiling water makes bubbles, and that is only a physical change.",
          visual: {
            type: "compare",
            left: {
              title: "Physical change",
              points: [
                "Same substance before and after",
                "Changes size, shape or state",
                "Examples: melting ice, chopping wood, dissolving sugar",
                "Often easy to reverse",
              ],
            },
            right: {
              title: "Chemical change",
              points: [
                "New substance with new properties",
                "Atoms rearrange into new molecules",
                "Examples: rusting, burning, baking",
                "Usually hard to reverse",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each change.",
            buckets: ["Physical change", "Chemical change"],
            items: [
              { text: "Ice cubes melting in a glass", bucket: 0 },
              { text: "A nail rusting in the rain", bucket: 1 },
              { text: "Chopping a log into kindling", bucket: 0 },
              { text: "Wood burning in a campfire", bucket: 1 },
              { text: "A cake baking in the oven", bucket: 1 },
              { text: "Salt dissolving in water", bucket: 0 },
              { text: "Milk going sour", bucket: 1 },
              { text: "Water boiling into steam", bucket: 0 },
            ],
            hint: "Ask: is it still the same substance afterward? If something new formed, with new properties, it is a chemical change.",
            mistakes: [
              { match: "Water boiling sorted as chemical", coach: "Boiling makes bubbles, but the bubbles are just water vapor, still H2O. No new substance forms." },
              { match: "Salt dissolving sorted as chemical", coach: "The salt seems to vanish, but it is still there. Let the water evaporate and the salt is left behind, so it is physical." },
              { match: "Milk going sour sorted as physical", coach: "Sour milk smells and tastes different because bacteria make new substances, like lactic acid. That is chemical." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which of these is a chemical change?",
            choices: ["Ice melting", "Paper being torn", "Bread toasting until it turns brown", "Sugar dissolving in tea"],
            answer: 2,
            why: "Toasting makes new substances with a new color, smell and taste. You cannot turn toast back into bread.",
            hints: [
              "Melted ice is still water, just in a different state. That is physical.",
              "Torn paper is still paper, just in smaller pieces. That is physical.",
              "",
              "Dissolved sugar is still sugar; it is just spread out in the tea. That is physical.",
            ],
          },
          approaches: {
            analogy:
              "A physical change is like rearranging the furniture in your room: everything is still there, just moved around. A chemical change is like taking the furniture apart and building something completely new from the pieces.",
            example:
              "Melting a chocolate bar is physical: it is still chocolate, and it hardens again in the fridge. Burning toast is chemical: the bread turns black, smells different and gives off smoke, and nothing you do can turn it back into fresh bread.",
            simpler: {
              q: "When ice melts into water, what is it made of?",
              choices: ["Still H2O, the same substance", "Oxygen gas", "Salt"],
              answer: 0,
              why: "Ice and liquid water are both H2O. Only the state changed.",
              hints: [
                "",
                "No new substance forms when ice melts. The molecules are still H2O.",
                "Nothing new is made. Melting only changes solid water into liquid water.",
              ],
            },
          },
        },
        {
          title: "Reactions and Conservation of Mass",
          teach:
            "In a chemical reaction, the starting substances are called reactants and the new substances are called products. Chemists write it with an arrow: reactants make products. The atoms in the reactants do not disappear; they break their old bonds and form new ones. Antoine Lavoisier showed this in the 1770s and 1780s by weighing everything, including the gases, in sealed containers. The total mass before a reaction always equaled the total mass after. This is the law of conservation of mass. So why does a burning log seem to lose mass? Most of its atoms join oxygen from the air and float away as carbon dioxide and water vapor. If you could trap every bit of gas, the products would weigh exactly as much as the log plus the oxygen it used.",
          visual: {
            type: "hotspots",
            title: "Reading a chemical equation",
            center: "2H₂ + O₂ → 2H₂O",
            spots: [
              { label: "Reactants", icon: "🧪", detail: "Hydrogen gas and oxygen gas: the substances you start with, written on the left." },
              { label: "Arrow", icon: "➡️", detail: "Means 'react to make.' It points from the reactants to the products." },
              { label: "Products", icon: "💧", detail: "Water: the new substance formed, written on the right." },
              { label: "Big numbers", icon: "🔢", detail: "The 2 in front means two molecules. Count the atoms: 4 hydrogen and 2 oxygen on each side, so nothing is lost." },
            ],
          },
          probe: {
            type: "number",
            prompt: "In a sealed tube, 56 grams of iron react completely with 32 grams of sulfur to make iron sulfide. What is the mass of the iron sulfide?",
            answer: 88,
            tolerance: 0,
            unit: "grams",
            hint: "Atoms are not created or destroyed, so the mass of the products equals the total mass of the reactants.",
            mistakes: [
              { match: "24", coach: "You subtracted. Mass is conserved, so add the masses of the reactants together." },
              { match: "56", coach: "That is just the iron. The sulfur atoms end up in the product too." },
              { match: "32", coach: "That is just the sulfur. The iron atoms end up in the product too." },
            ],
            seconds: 30,
          },
          think: {
            q: "Baking soda and vinegar react in an open cup, and the cup weighs less afterward. Why?",
            choices: [
              "Some atoms were destroyed",
              "Carbon dioxide gas escaped into the air",
              "The vinegar turned into nothing",
              "Reactions always lose mass",
            ],
            answer: 1,
            why: "The reaction makes carbon dioxide gas, which floats out of the open cup, carrying its mass with it.",
            hints: [
              "Atoms are never destroyed in a chemical reaction. Think about where they could have gone.",
              "",
              "Matter cannot turn into nothing. The bubbles are a clue: some product left as a gas.",
              "In a sealed container the mass stays exactly the same. The open cup let something escape.",
            ],
          },
          approaches: {
            analogy:
              "A reaction is like friends trading cards. Cards change hands and end up in new piles, but if no one leaves the room, the total number of cards stays exactly the same.",
            example:
              "In a sealed plastic bottle, 10 grams of baking soda and 100 grams of vinegar fizz and react. The contents still have a mass of 110 grams afterward. Open the cap and let the carbon dioxide out, and the scale drops by the mass of the escaped gas.",
            simpler: {
              q: "In a chemical reaction, atoms are...",
              choices: ["Created from nothing", "Destroyed", "Rearranged into new substances"],
              answer: 2,
              why: "Atoms break old bonds and form new ones, but the same atoms are all still there.",
              hints: [
                "Reactions cannot make atoms out of nothing. Every atom in the products was in the reactants.",
                "Atoms are not destroyed. Lavoisier's careful weighing showed the total mass stays the same.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that describes a chemical change.",
        sentences: [
          "A copper roof slowly turns green after years in the rain.",
          "Butter melts in a hot pan.",
          "An egg cooks until the clear part turns white and firm.",
          "A glass falls and shatters into pieces.",
          "Fireworks explode with flashes of light and smoke.",
          "Water freezes into ice in the freezer.",
        ],
        correct: [0, 2, 4],
      },
      explain: {
        prompt: "Explain the difference between a physical change and a chemical change, and why a burning log seems to lose mass.",
        keyPoints: [
          "A physical change keeps the same substance; only size, shape or state changes",
          "A chemical change makes new substances with new properties",
          "Clues include gas bubbles, a color change, a new smell, light or heat",
          "Atoms are rearranged, not destroyed, so mass is conserved; the log's mass leaves as gases",
        ],
      },
      mastery: [
        {
          type: "cloze",
          text: "Water, {0}, is a {1} because it is made of two different elements bonded together. Oxygen gas, O2, is an {2} because it has only one kind of atom.",
          blanks: [{ answers: ["H2O", "H₂O"] }, { answers: ["compound"] }, { answers: ["element"] }],
          bank: ["H2O", "compound", "element", "mixture", "CO2"],
          hint: "Count the kinds of atoms. Two or more different elements bonded together make a compound; one kind of atom is an element.",
          mistakes: [
            { match: "mixture", coach: "In a mixture the parts are not bonded. In water, hydrogen and oxygen are chemically bonded, so it is a compound." },
            { match: "CO2", coach: "CO2 is carbon dioxide. Water is two hydrogen atoms and one oxygen atom." },
            { match: "compound", coach: "O2 has only one kind of atom, oxygen. One kind of atom means an element, even when two atoms are bonded." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "Lavoisier heated mercury in a sealed jar of air. Suppose 200 grams of mercury combine with 16 grams of oxygen to make red mercury oxide. What mass of mercury oxide forms?",
          answer: 216,
          tolerance: 0,
          unit: "grams",
          hint: "Mass is conserved: the product weighs the same as all the reactants put together.",
          mistakes: [
            { match: "184", coach: "You subtracted. The oxygen atoms join the mercury, so add the two masses." },
            { match: "200", coach: "That is just the mercury. The oxygen that joined it adds mass too." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build the law of conservation of mass.",
          tiles: ["In a chemical reaction,", "atoms are rearranged,", "not created or destroyed,", "so the total mass stays the same."],
          distractors: ["so the products always weigh less.", "atoms disappear into the air,"],
          hint: "Start with when the law applies, then say what happens to the atoms, then what that means for the mass.",
          mistakes: [
            { match: "Used 'so the products always weigh less.'", coach: "In a sealed container the products weigh exactly the same. Products only seem lighter when a gas escapes." },
            { match: "Used 'atoms disappear into the air,'", coach: "Atoms never disappear. Some may leave as a gas, but they still exist and still have mass." },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each observation to the clue of chemical change it shows.",
          pairs: [
            { left: "Fizzing when baking soda meets vinegar", right: "A gas is produced" },
            { left: "A silver spoon slowly turning black", right: "A color change" },
            { left: "A campfire glowing at night", right: "Light and heat are given off" },
            { left: "Spoiled eggs smelling awful", right: "A new smell" },
            { left: "Two clear liquids mixing and turning cloudy with tiny bits of solid", right: "A solid forms in a liquid" },
          ],
          hint: "Think about which of your senses notices each clue: seeing bubbles, seeing color, feeling warmth, smelling, or seeing a new solid.",
          mistakes: [
            { match: "Campfire matched to A color change", coach: "A campfire's biggest clue is the light and warmth it gives off." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "What is an element?",
          choices: [
            "A substance made of only one kind of atom",
            "Any mixture of two liquids",
            "A substance made in a laboratory",
            "A molecule with exactly two atoms",
          ],
          answer: 0,
          why: "An element is a pure substance with only one kind of atom, like gold or oxygen.",
        },
        {
          q: "Which of these is a physical change?",
          choices: ["Iron rusting", "Wood burning", "Glass breaking", "Milk souring"],
          answer: 2,
          why: "Broken glass is still glass. No new substance forms.",
        },
        {
          q: "What does the small 2 in H2O tell you?",
          choices: [
            "There are two water molecules",
            "There are two oxygen atoms",
            "Water boils at 2 degrees",
            "There are two hydrogen atoms in each molecule",
          ],
          answer: 3,
          why: "A small number after a symbol tells how many atoms of that element are in one molecule.",
        },
        {
          q: "Sodium and chlorine bond together to form...",
          choices: ["Water", "Sugar", "Table salt", "Rust"],
          answer: 2,
          why: "Sodium chloride is table salt, a compound very different from either element.",
        },
        {
          q: "What did Lavoisier discover by weighing reactions in sealed containers?",
          choices: ["Fire destroys matter", "Mass is conserved in a chemical reaction", "Air has no mass", "Gases cannot react"],
          answer: 1,
          why: "The total mass before and after a reaction stayed the same, because atoms are only rearranged.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Test the law of conservation of mass with baking soda and vinegar. Ask an adult to supervise, wear safety glasses, and work over a tray. Materials: a clean plastic bottle, a balloon, a funnel, about 2 teaspoons of baking soda, about 100 mL of vinegar, and a kitchen scale. Steps: 1) Write a prediction: will the mass change when the reaction happens in a closed system? 2) Use the funnel to put the baking soda inside the balloon, and pour the vinegar into the bottle. 3) Stretch the balloon over the bottle's mouth without letting the baking soda fall in. 4) Weigh everything together and record the mass. 5) Lift the balloon so the baking soda drops in, and watch the reaction. 6) Weigh again when the fizzing stops. (If the balloon puffs up large, the scale may read a gram or so less, because the balloon pushes aside air and floats a tiny bit, like a small hot-air balloon.) 7) Carefully remove the balloon, let the gas escape, and weigh the bottle and balloon once more. Record all three masses in a table and explain what you observed.",
        rubric: [
          "Prediction written before starting",
          "All three masses recorded in a table",
          "Explains why the mass stayed (nearly) the same when the system was closed",
          "Explains that the mass dropped when the carbon dioxide gas escaped",
        ],
      },
    },

    // 8. Ecosystems and food webs
    {
      id: "science.ecosystems",
      title: "Ecosystems: Food Webs and the Flow of Energy",
      minutes: 35,
      stage: "logic",
      read: [
        "An ecosystem is a community of living things together with the nonliving parts of their surroundings, such as sunlight, water, soil and air. A pond, a forest, a desert and a coral reef are all ecosystems. Every living thing in an ecosystem needs energy, and nearly all of that energy starts as sunlight.",
        "Plants, algae and some bacteria are producers. They capture sunlight and use it to make their own food, a sugar, through photosynthesis. Animals cannot do this, so they are consumers: they get energy by eating other living things. Herbivores, like deer and grasshoppers, eat plants. Carnivores, like hawks and wolves, eat other animals. Omnivores, like bears and raccoons, eat both. Decomposers, such as fungi, bacteria and earthworms, break down dead plants and animals and return their nutrients to the soil, where producers can use them again.",
        "A food chain shows one path of energy: grass is eaten by a grasshopper, which is eaten by a frog, which is eaten by a snake, which is eaten by a hawk. The arrows in a food chain point from the food to the eater, showing which way the energy flows. Real ecosystems are tangled, because most animals eat more than one thing and are eaten by more than one predator. All the connected food chains in an ecosystem make a food web.",
        "Energy is lost at every step. A grasshopper uses most of the energy from the grass it eats just to move, grow and stay alive, and much of it escapes as heat. Only about 10 percent passes on to the frog that eats it. That is why there are far more plants than plant eaters, and far more plant eaters than top predators.",
        "Because everything is connected, a change to one species can ripple through the whole web. When wolves were returned to Yellowstone National Park in 1995, after about 70 years away, they began hunting elk, and scientists have been studying the effects on plants, rivers and other animals ever since.",
      ].join("\n\n"),
      keyIdeas: [
        "Producers make food from sunlight; consumers eat other living things; decomposers recycle nutrients.",
        "Food-chain arrows point from the food to the eater, the direction energy flows.",
        "Only about 10 percent of the energy passes from one level to the next.",
        "Changing one species can ripple through the whole food web.",
      ],
      hook: {
        text: "For about 70 years, there were no wolf packs in Yellowstone National Park. Without them, elk herds grew large and nibbled young willow and aspen trees along the rivers. Then, in 1995, wolves were brought back. What would happen to the elk, the trees, the beavers and even the rivers when one hunter returned to the web of life?",
      },
      teach: [
        {
          title: "Producers, Consumers and Decomposers",
          teach:
            "Every living thing needs energy to grow, move and repair itself. Producers make their own food. Plants, algae and some bacteria capture sunlight and use it, with water and carbon dioxide, to make sugar. This is photosynthesis. Consumers cannot make food, so they eat. Herbivores eat only plants, like a rabbit munching clover. Carnivores eat other animals, like an owl catching a mouse. Omnivores eat both, like a black bear that eats berries one day and fish the next. Then comes the cleanup crew, the decomposers. Fungi, bacteria and earthworms break down dead leaves, fallen logs and dead animals into simple nutrients. Those nutrients go back into the soil, and producers use them again. Without decomposers, the forest floor would be buried in dead material.",
          visual: {
            type: "hotspots",
            title: "A pond ecosystem",
            center: "Pond",
            spots: [
              { label: "Sunlight", icon: "☀️", detail: "The energy source for almost every ecosystem on Earth." },
              { label: "Algae and water plants", icon: "🌿", detail: "Producers: they make sugar from sunlight by photosynthesis." },
              { label: "Tadpoles", icon: "🐸", detail: "Most young tadpoles are herbivores that graze on algae." },
              { label: "Heron", icon: "🐦", detail: "A carnivore that spears fish and frogs with its sharp beak." },
              { label: "Raccoon", icon: "🦝", detail: "An omnivore that eats crayfish, frogs, berries and seeds." },
              { label: "Bacteria and fungi", icon: "🍄", detail: "Decomposers that break down dead plants and animals in the mud." },
              { label: "Water, mud and air", icon: "💧", detail: "Nonliving parts of the ecosystem that shape what can live there." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each living thing by how it gets its energy.",
            buckets: ["Producer", "Consumer", "Decomposer"],
            items: [
              { text: "Oak tree", bucket: 0 },
              { text: "Algae", bucket: 0 },
              { text: "Grass", bucket: 0 },
              { text: "Deer", bucket: 1 },
              { text: "Hawk", bucket: 1 },
              { text: "Black bear", bucket: 1 },
              { text: "Mushroom", bucket: 2 },
              { text: "Bacteria breaking down a dead leaf", bucket: 2 },
            ],
            hint: "Ask: does it make its own food from sunlight, eat other living things, or break down dead things?",
            mistakes: [
              { match: "Mushroom sorted as producer", coach: "Mushrooms are fungi, not plants. They cannot make food from sunlight; they break down dead material, so they are decomposers." },
              { match: "Algae sorted as consumer", coach: "Algae are green because they hold chlorophyll and make their own food by photosynthesis, so they are producers." },
            ],
            seconds: 40,
          },
          think: {
            q: "A mushroom grows on a fallen log. What role does it play?",
            choices: ["Producer", "Herbivore", "Carnivore", "Decomposer"],
            answer: 3,
            why: "Mushrooms are fungi that break down the dead wood and return nutrients to the soil.",
            hints: [
              "Mushrooms are not plants and cannot make food from sunlight. Look at what it is growing on.",
              "Herbivores eat living plants. The mushroom is feeding on a dead log.",
              "Carnivores eat other animals. The mushroom is feeding on dead wood.",
              "",
            ],
          },
          approaches: {
            analogy:
              "An ecosystem works like a town. Producers are the farms that grow the food, consumers are the families who eat it, and decomposers are the recycling crew that turns old things into raw materials the farms can use again.",
            example:
              "In a meadow, clover is a producer. A rabbit that eats the clover is a herbivore, a consumer. A fox that eats the rabbit is a carnivore. When the fox dies, bacteria and fungi break its body down, and the nutrients help new clover grow.",
            simpler: {
              q: "Which living thing makes its own food from sunlight?",
              choices: ["A sunflower", "A rabbit", "A hawk"],
              answer: 0,
              why: "Plants like sunflowers are producers: they make sugar by photosynthesis.",
              hints: [
                "",
                "A rabbit has to eat plants to get energy, so it is a consumer.",
                "A hawk has to hunt other animals to get energy, so it is a consumer.",
              ],
            },
          },
        },
        {
          title: "Food Chains and Food Webs",
          teach:
            "A food chain shows one path that energy takes through an ecosystem. In a meadow: grass, then grasshopper, then frog, then snake, then hawk. Every food chain begins with a producer, because producers are the ones that capture energy from the Sun. Notice which way the arrows point in a food chain diagram. An arrow does not mean 'eats.' It points from the food to the eater, showing where the energy goes. So the arrow goes from the grass to the grasshopper. But nature is rarely that simple. A frog also eats flies and beetles. A hawk also eats mice and rabbits. When you draw all the connected food chains in one ecosystem, you get a food web. A web shows how many different paths energy can follow, and it reveals who depends on whom.",
          visual: {
            type: "compare",
            left: {
              title: "Food chain",
              points: ["One single path of energy", "Starts with a producer", "Easy to read", "Leaves out most connections"],
            },
            right: {
              title: "Food web",
              points: ["Many connected food chains", "Shows animals that eat several foods", "More like real nature", "Shows who depends on whom"],
            },
          },
          probe: {
            type: "build",
            prompt: "Build a meadow food chain in order, starting where the energy enters.",
            tiles: ["Sunlight", "Grass", "Grasshopper", "Frog", "Snake", "Hawk"],
            distractors: ["Mushroom"],
            hint: "Start with the energy source, then the producer, then each eater in turn, ending with the top predator.",
            mistakes: [
              { match: "Used 'Mushroom'", coach: "A mushroom is a decomposer. It breaks things down after they die rather than being a link in this chain." },
              { match: "Hawk first", coach: "The chain starts where energy enters: the Sun and then the producer. The top predator goes last." },
            ],
            seconds: 35,
          },
          think: {
            q: "In the food chain grass → rabbit → fox, what does the arrow from rabbit to fox show?",
            choices: [
              "The rabbit eats the fox",
              "Energy flows from the rabbit to the fox",
              "The fox gives energy to the rabbit",
              "The rabbit and fox are the same size",
            ],
            answer: 1,
            why: "Food-chain arrows point from the food to the eater, the direction the energy travels.",
            hints: [
              "Rabbits eat plants, not foxes. Arrows point toward the eater, not away from it.",
              "",
              "Backwards: the fox gets energy by eating the rabbit, so energy flows from rabbit to fox.",
              "Arrows in a food chain are about energy, not size.",
            ],
          },
          approaches: {
            analogy:
              "Food-chain arrows are like arrows on a map showing which way a river flows. Energy flows like water, from the plant into the animal that eats it, and on down the line.",
            example:
              "In the ocean: tiny algae → krill → small fish → seal → orca. The algae are the producers, and the arrows show energy moving into each eater. If the seal also eats squid, that adds a new strand, turning the chain into part of a web.",
            simpler: {
              q: "Every food chain begins with a...",
              choices: ["Producer", "Carnivore", "Decomposer"],
              answer: 0,
              why: "Producers capture the Sun's energy, so every chain starts with one.",
              hints: [
                "",
                "A carnivore needs to eat other animals first, so it cannot be the start.",
                "Decomposers break down things that already died. Chains start where energy enters.",
              ],
            },
          },
        },
        {
          title: "Energy Flow and the 10 Percent Rule",
          teach:
            "When a grasshopper eats grass, does it get all the energy the grass captured? Not even close. The grass used much of its energy just to live and grow, and the grasshopper uses most of what it eats to hop, breathe, digest and keep its body working. Much of that energy escapes as heat. On average, only about 10 percent of the energy at one level passes on to the next level. Scientists draw this as an energy pyramid. Producers form the wide base. Herbivores, the next level, have about one tenth as much energy. Carnivores above them have about one tenth of that. This explains why a field has huge numbers of grass plants, fewer insects, and only a few hawks. There is simply not enough energy at the top to feed many top predators.",
          visual: {
            type: "flip",
            cards: [
              { front: "Energy pyramid", back: "A diagram showing energy shrinking at each feeding level, with producers at the wide base." },
              { front: "10 percent rule", back: "About one tenth of the energy at one level passes to the next level." },
              { front: "Where does the other 90 percent go?", back: "It is used for moving, growing and breathing, and much is lost as heat." },
              { front: "Why so few top predators?", back: "Little energy is left at the top of the pyramid, so it can feed only a few animals." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Grass in a meadow stores 20,000 units of energy. Grasshoppers eat the grass, and frogs eat the grasshoppers. Using the 10 percent rule, how many units of energy reach the frogs?",
            answer: 200,
            tolerance: 0,
            unit: "units",
            hint: "Take 10 percent once to get from grass to grasshoppers, then 10 percent again to get from grasshoppers to frogs.",
            mistakes: [
              { match: "2000", coach: "2,000 is what the grasshoppers get. The frogs are one more step up, so take 10 percent again." },
              { match: "18000", coach: "You subtracted 10 percent. Only 10 percent passes on; the other 90 percent is used or lost." },
              { match: "20", coach: "That is one step too far: about 20 units would reach a snake that eats the frogs." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why are there fewer hawks than mice in a field?",
            choices: [
              "Hawks are bigger, so they need less food",
              "Mice eat hawks",
              "Only about 10 percent of energy passes up each level, so little is left for hawks",
              "Hawks make their own food",
            ],
            answer: 2,
            why: "Energy shrinks at each level of the pyramid, so the top can support only a few predators.",
            hints: [
              "Bigger animals usually need more food, not less. Think about how much energy reaches the top.",
              "Mice do not eat hawks. Hawks eat mice, so energy flows from mice to hawks.",
              "",
              "Hawks are consumers. They cannot make food from sunlight; they must hunt.",
            ],
          },
          approaches: {
            analogy:
              "Passing energy up a food chain is like a bucket brigade with leaky buckets. Each person spills most of the water before handing it on, so by the end of the line only a small splash is left.",
            example:
              "Plants in a pond capture 10,000 units of energy. Tiny animals that eat the plants get about 1,000 units. Small fish that eat those animals get about 100. A heron that eats the small fish gets only about 10 units.",
            simpler: {
              q: "About how much energy passes from one level of a food chain to the next?",
              choices: ["10 percent", "50 percent", "100 percent"],
              answer: 0,
              why: "Most energy is used or lost as heat, so only about a tenth moves up.",
              hints: [
                "",
                "Half is far too much. Animals use most of their energy just staying alive.",
                "If all the energy passed on, nothing would be used for moving, growing and breathing.",
              ],
            },
          },
        },
        {
          title: "When the Web Changes",
          teach:
            "Because the strands of a food web are connected, pulling on one can shake the whole web. Along the Pacific coast, sea otters eat sea urchins, and sea urchins graze on giant kelp. Where otters were hunted almost to extinction for their fur, urchins multiplied and chewed kelp forests down to bare rock. Where otters returned, urchin numbers fell and kelp forests grew back, giving shelter to many fish. An animal with an outsized effect like this is called a keystone species. Nonliving factors matter too. A drought can shrink the grass, which leaves less food for grasshoppers, then frogs, then snakes. When wolves returned to Yellowstone in 1995, scientists began tracking how elk, trees and other animals responded, and they still study it today.",
          visual: {
            type: "sequence",
            prompt: "Put the sea otter chain reaction in order.",
            steps: [
              "Hunters take most of the sea otters",
              "Sea urchins have far fewer predators",
              "Sea urchin numbers explode",
              "Urchins chew through the kelp",
              "Fish lose the kelp forests where they shelter",
            ],
          },
          probe: {
            type: "cloze",
            text: "Sea otters eat {0}, and sea urchins eat {1}. If the otters disappear, the urchins will {2} and the kelp will {3}.",
            blanks: [
              { answers: ["sea urchins", "urchins"] },
              { answers: ["kelp"] },
              { answers: ["increase", "multiply", "grow"] },
              { answers: ["decrease", "shrink", "disappear"] },
            ],
            bank: ["sea urchins", "kelp", "increase", "decrease", "sunlight", "orcas"],
            hint: "Follow the chain: otter eats urchin, urchin eats kelp. Remove the top, and the middle grows while the bottom gets eaten.",
            mistakes: [
              { match: "sunlight", coach: "Sunlight is the kelp's energy source, but urchins don't eat it. Urchins graze on the kelp itself." },
              { match: "orcas", coach: "Orcas are top predators that sometimes eat otters. Sea otters mostly eat urchins, crabs and shellfish." },
            ],
            seconds: 40,
          },
          think: {
            q: "Sea otters disappear from a kelp forest. What happens next?",
            choices: [
              "The kelp grows faster",
              "Sea urchins increase and the kelp shrinks",
              "Nothing changes",
              "Sea urchins disappear too",
            ],
            answer: 1,
            why: "Without otters eating them, urchins multiply and eat much more kelp.",
            hints: [
              "Think about who eats the kelp. With fewer otters, there are more of those kelp eaters.",
              "",
              "In a food web, removing one animal almost always changes the others.",
              "Otters eat urchins. With fewer otters, the urchins have fewer predators, so they increase.",
            ],
          },
          approaches: {
            analogy:
              "A food web is like a spider web. Pluck one strand and the whole web trembles, even the strands far from where you touched it.",
            example:
              "In a pond, a disease kills most of the frogs. Insects the frogs used to eat, like mosquitoes, increase. Herons that ate frogs have less food, so they may leave or switch to eating more fish. One change spreads in both directions along the web.",
            simpler: {
              q: "If a predator disappears, what usually happens to the animals it ate?",
              choices: ["Their numbers go up", "Their numbers go down", "They turn into producers"],
              answer: 0,
              why: "With fewer animals hunting them, more of them survive.",
              hints: [
                "",
                "The predator was eating them. Without it, would more or fewer survive?",
                "Animals cannot become producers. Think about how many survive without the predator.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the path of energy in order, from the Sun to the soil.",
        steps: [
          "Sunlight shines on an oak tree",
          "The oak makes sugar by photosynthesis",
          "A caterpillar eats oak leaves",
          "A songbird eats the caterpillar",
          "A hawk catches the songbird",
          "When the hawk dies, fungi and bacteria break it down",
        ],
      },
      explain: {
        prompt: "Explain how energy moves through an ecosystem, from the Sun to a top predator, and why there are so few top predators.",
        keyPoints: [
          "Producers capture energy from sunlight by photosynthesis",
          "Consumers get energy by eating other living things",
          "Food-chain arrows show energy flowing from the food to the eater",
          "Only about 10 percent of energy passes to the next level, so few top predators can be fed",
          "Decomposers recycle nutrients from dead things back to the soil",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each living thing to its role in the ecosystem.",
          pairs: [
            { left: "Sunflower", right: "Producer: makes its own food from sunlight" },
            { left: "Grasshopper", right: "Herbivore: eats only plants" },
            { left: "Owl", right: "Carnivore: eats other animals" },
            { left: "Raccoon", right: "Omnivore: eats plants and animals" },
            { left: "Mushroom", right: "Decomposer: breaks down dead things" },
          ],
          hint: "Think about what each one eats, or whether it eats at all.",
          mistakes: [
            { match: "Mushroom matched to Producer", coach: "Mushrooms are fungi. They cannot make food from sunlight; they feed on dead material." },
            { match: "Raccoon matched to Carnivore", coach: "Raccoons eat frogs and crayfish, but also berries, nuts and seeds. Eating both makes them omnivores." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "Producers in a forest store 50,000 units of energy. Herbivores eat the producers, and carnivores eat the herbivores. About how many units reach the carnivores?",
          answer: 500,
          tolerance: 0,
          unit: "units",
          hint: "Take 10 percent for each step up: producers to herbivores, then herbivores to carnivores.",
          mistakes: [
            { match: "5000", coach: "5,000 is what the herbivores get. Carnivores are one more step up: take 10 percent again." },
            { match: "45000", coach: "You took away 10 percent. Only 10 percent passes on, not 90 percent." },
            { match: "50", coach: "That is one step too many. Count the steps: producers to herbivores, herbivores to carnivores." },
          ],
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that shows a decomposer at work.",
          sentences: [
            "Fungi grow over a fallen log and soften the wood.",
            "A deer eats acorns under an oak.",
            "Bacteria break down a dead fish on the riverbank.",
            "A hawk swoops down on a mouse.",
            "Earthworms turn fallen leaves into rich soil.",
            "A sunflower makes sugar in its leaves using sunlight.",
          ],
          correct: [0, 2, 4],
          hint: "Decomposers feed on things that are already dead, like fallen logs, dead leaves and dead animals.",
          mistakes: [
            { match: "Tapped the sunflower", coach: "The sunflower is a producer: it makes its own food from sunlight." },
            { match: "Tapped the hawk or the deer", coach: "The hawk and deer are consumers eating living things. Decomposers feed on dead material." },
          ],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "In the food chain grass → mouse → owl, the {0} is the producer, and the arrow points from the mouse to the owl because {1} flows from the food to the eater.",
          blanks: [{ answers: ["grass"] }, { answers: ["energy"] }],
          bank: ["grass", "owl", "energy", "water", "mouse"],
          hint: "The producer makes its own food. The arrows follow something that every living thing needs.",
          mistakes: [
            { match: "owl", coach: "The owl is the top predator. The producer is the one that makes food from sunlight." },
            { match: "mouse", coach: "The mouse is a consumer that eats plants. The producer is at the start of the chain." },
            { match: "water", coach: "Food-chain arrows show the flow of energy, not water." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Which of these is a producer?",
          choices: ["Rabbit", "Mushroom", "Maple tree", "Wolf"],
          answer: 2,
          why: "A maple tree makes its own food from sunlight by photosynthesis.",
        },
        {
          q: "In a food chain, the arrows point...",
          choices: ["From the eater to the food", "From the food to the eater", "From the largest animal to the smallest"],
          answer: 1,
          why: "Arrows show energy flowing from the food into the animal that eats it.",
        },
        {
          q: "About what percent of energy passes from one level of a food chain to the next?",
          choices: ["10 percent", "50 percent", "90 percent", "100 percent"],
          answer: 0,
          why: "Most energy is used for living or lost as heat, so only about 10 percent passes on.",
        },
        {
          q: "What do decomposers do?",
          choices: [
            "Make food from sunlight",
            "Hunt other animals",
            "Eat only living plants",
            "Break down dead things and return nutrients to the soil",
          ],
          answer: 3,
          why: "Fungi, bacteria and earthworms recycle dead material so producers can use the nutrients again.",
        },
        {
          q: "When sea otters were hunted out of parts of the Pacific coast, what happened to the kelp forests?",
          choices: [
            "They grew bigger",
            "Sea urchins multiplied and ate much of the kelp",
            "Nothing happened",
            "The kelp turned into coral",
          ],
          answer: 1,
          why: "Without otters to eat them, urchins multiplied and grazed the kelp down.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Map a real food web near your home. With an adult, spend 20 minutes observing a backyard, park or garden. Do not touch or disturb animals, and keep away from stinging insects. List at least 8 living things you see or find signs of, such as plants, insects, birds, squirrels, mushrooms and earthworms. Then draw a food web on a large sheet of paper: put producers at the bottom, add consumers above them, and draw arrows from each food to its eater. Label each living thing as a producer, herbivore, carnivore, omnivore or decomposer. Finally, write two or three sentences predicting what would happen to your web if one living thing disappeared.",
        rubric: [
          "At least 8 real living things from the observation, including producers and a decomposer",
          "Arrows point from the food to the eater",
          "Each living thing labeled with its correct role",
          "A sensible prediction of what would happen if one living thing disappeared",
        ],
      },
    },

    // 9. Earth's layers and plate tectonics
    {
      id: "science.earth",
      title: "Inside the Earth: Layers, Plates, Earthquakes and Volcanoes",
      minutes: 35,
      stage: "logic",
      read: [
        "If you could dig straight down to the center of the Earth, you would travel about 6,370 kilometers. No one has ever come close; the deepest hole ever drilled, in Russia, reached only about 12 kilometers. Instead, scientists study the inside of the Earth by measuring how earthquake waves travel through it, bending and changing speed as they pass through different materials.",
        "Earth has four main layers. The crust is the thin, rocky outer skin, from about 5 kilometers thick under the oceans to about 70 kilometers under tall mountains. Below it is the mantle, nearly 2,900 kilometers of hot rock that can flow very slowly, like extremely thick putty. Then comes the outer core, liquid iron and nickel, and finally the inner core, a solid ball of iron and nickel about as hot as the surface of the Sun. The inner core stays solid because the pressure there is enormous.",
        "The crust and the top of the mantle are broken into giant slabs called tectonic plates. The plates move only a few centimeters a year, about as fast as your fingernails grow. In 1912, a German scientist named Alfred Wegener argued that the continents had once been joined in a single supercontinent, later called Pangaea. He pointed out that South America and Africa fit together like puzzle pieces and that the same fossils appear on both. Many scientists doubted him, but in the 1950s and 1960s maps of the ocean floor revealed long ridges where new crust forms, and the theory of plate tectonics was born.",
        "Most of the action happens where plates meet. At divergent boundaries, plates pull apart. At convergent boundaries, they push together, building mountains or forcing one plate down into the mantle. At transform boundaries, they grind past each other. When rocks along a boundary lock together and then suddenly slip, the shaking is an earthquake. Where melted rock, called magma, rises to the surface, volcanoes form. Many of the world's volcanoes and earthquakes are found around the Pacific Ocean, in a belt called the Ring of Fire.",
      ].join("\n\n"),
      keyIdeas: [
        "Earth has four main layers: crust, mantle, outer core and inner core.",
        "The crust and upper mantle are broken into tectonic plates that move a few centimeters a year.",
        "Plates pull apart, push together or slide past each other at their boundaries.",
        "Earthquakes and volcanoes happen mostly along plate boundaries.",
      ],
      hook: {
        text: "Look at a world map and you may notice something odd: the east coast of South America and the west coast of Africa look like two pieces of a jigsaw puzzle. In 1912 a German scientist named Alfred Wegener said that was no accident. He claimed the continents had once been joined and had slowly drifted apart. Most experts scoffed. It took about fifty years, and maps of the deep ocean floor, to show he was onto something.",
      },
      teach: [
        {
          title: "Earth's Layers",
          teach:
            "Earth is built in layers, a bit like a peach. The crust is the thin skin we live on. Under the oceans it is only about 5 to 10 kilometers thick; under the continents it is usually 30 to 50, and up to about 70 under great mountain ranges. Next comes the mantle, almost 2,900 kilometers thick. Its rock is hot enough to flow very slowly over millions of years. Below that is the outer core, made of liquid iron and nickel. Swirling metal in the outer core creates Earth's magnetic field, the reason a compass works. At the very center is the inner core, solid iron and nickel about as hot as the surface of the Sun. It stays solid because of the crushing pressure above it.",
          visual: {
            type: "hotspots",
            title: "Inside the Earth",
            center: "About 6,370 km to the center",
            spots: [
              { label: "Crust", icon: "🪨", detail: "5 to 70 km thick. Rocky and cool compared to the layers below. We live on it." },
              { label: "Mantle", icon: "🔥", detail: "About 2,900 km thick. Hot rock that flows very slowly, like extremely thick putty." },
              { label: "Outer core", icon: "🌀", detail: "Liquid iron and nickel. Its swirling creates Earth's magnetic field." },
              { label: "Inner core", icon: "⚪", detail: "Solid iron and nickel, about as hot as the Sun's surface, squeezed solid by enormous pressure." },
            ],
          },
          probe: {
            type: "place",
            prompt: "Drag each marker to its depth below the surface, in kilometers.",
            min: 0,
            max: 6400,
            step: 10,
            tolerance: 300,
            items: [
              { label: "Bottom of the crust under a continent", value: 40 },
              { label: "Bottom of the mantle", value: 2900 },
              { label: "Bottom of the outer core", value: 5150 },
              { label: "Center of the Earth", value: 6370 },
            ],
            hint: "The crust is very thin. The mantle is the thickest layer, ending almost 2,900 km down. The center is about 6,370 km down.",
            mistakes: [
              { match: "Mantle bottom placed near the center", coach: "The mantle ends about 2,900 km down, a bit less than halfway to the center. The core fills the rest." },
              { match: "Crust bottom placed far down", coach: "The crust is the thinnest layer, only tens of kilometers, so its bottom is very close to the surface." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which layer of the Earth is liquid?",
            choices: ["Crust", "Mantle", "Outer core", "Inner core"],
            answer: 2,
            why: "The outer core is liquid iron and nickel. Its swirling makes Earth's magnetic field.",
            hints: [
              "The crust is solid rock, the ground we stand on.",
              "The mantle flows very slowly, but it is mostly solid rock, not a liquid.",
              "",
              "The inner core is even hotter, but the huge pressure squeezes it solid.",
            ],
          },
          approaches: {
            analogy:
              "Earth is like a peach. The thin fuzzy skin is the crust, the thick juicy fruit is the mantle, and the pit in the middle is the core.",
            example:
              "If Earth were shrunk to the size of an apple, the crust would be about as thin as the apple's skin. The mantle and core would make up almost everything inside.",
            simpler: {
              q: "Which layer do we live on?",
              choices: ["The crust", "The mantle", "The core"],
              answer: 0,
              why: "The crust is Earth's thin rocky outer layer.",
              hints: [
                "",
                "The mantle is the hot layer under the crust, far below our feet.",
                "The core is at the very center, thousands of kilometers down.",
              ],
            },
          },
        },
        {
          title: "Moving Plates",
          teach:
            "Earth's crust and the top of the mantle form a rigid shell that is cracked into seven major tectonic plates and many smaller ones. The plates rest on hotter, softer mantle rock, and heat from deep inside the Earth keeps that rock slowly churning. As it moves, the plates move too, usually a few centimeters a year, about the speed your fingernails grow. That sounds tiny, but over millions of years it adds up to thousands of kilometers. Alfred Wegener collected clues that the continents had once fit together: matching coastlines, fossils of the same small reptile, Mesosaurus, in both South America and Africa, and matching rock layers. But he could not explain how continents moved. In the 1950s and 1960s, maps of the ocean floor finally showed how.",
          visual: {
            type: "timeline",
            events: [
              { year: 1912, label: "Wegener proposes continental drift", detail: "Alfred Wegener argues the continents were once joined and have drifted apart." },
              { year: 1930, label: "Wegener dies in Greenland", detail: "He dies on a scientific expedition, with his idea still widely doubted." },
              { year: 1957, label: "The ocean floor is mapped", detail: "Marie Tharp and Bruce Heezen publish a map of the North Atlantic floor showing a long ridge with a rift valley down its middle." },
              { year: 1962, label: "Seafloor spreading", detail: "Harry Hess explains that new crust forms at ocean ridges and spreads outward." },
              { year: 1968, label: "Plate tectonics accepted", detail: "By the late 1960s, most geologists agree that Earth's surface is made of moving plates." },
            ],
          },
          probe: {
            type: "number",
            prompt: "The Atlantic Ocean widens by about 2.5 centimeters a year. How many kilometers wider will it be in 1,000,000 years?",
            answer: 25,
            tolerance: 0,
            unit: "km",
            hint: "First find the total in centimeters, then convert: 100,000 centimeters make 1 kilometer.",
            mistakes: [
              { match: "2500000", coach: "That is the answer in centimeters. Divide by 100,000 to change centimeters into kilometers." },
              { match: "25000", coach: "That is the answer in meters. Divide by 1,000 to get kilometers." },
              { match: "250", coach: "Check your conversion: 2,500,000 cm divided by 100,000 is 25 km." },
            ],
            seconds: 60,
          },
          think: {
            q: "Which clue did Wegener use to argue that the continents had moved?",
            choices: [
              "Earthquakes happen every day",
              "The same fossils are found in South America and Africa",
              "The ocean is salty",
              "Mountains are cold at the top",
            ],
            answer: 1,
            why: "The same land reptile could not have swum an ocean, so the continents were probably once joined.",
            hints: [
              "Earthquakes show the ground moves, but Wegener's clues were about continents once fitting together.",
              "",
              "Salty oceans don't tell us anything about where the continents used to be.",
              "Mountain temperatures don't show that continents were once joined.",
            ],
          },
          approaches: {
            analogy:
              "Tectonic plates are like the pieces of a cracked shell on a hard-boiled egg, except the egg inside is hot and slowly churning, so the pieces drift, bump and scrape against one another.",
            example:
              "A plate moving 5 centimeters a year travels 50 centimeters in 10 years, 50 meters in 1,000 years, and 50 kilometers in a million years. Over 100 million years that is 5,000 kilometers, farther than the distance across the Atlantic from Brazil to West Africa.",
            simpler: {
              q: "About how fast do tectonic plates move?",
              choices: ["A few kilometers a day", "A few centimeters a year", "They never move"],
              answer: 1,
              why: "Plates creep along at a few centimeters a year, about as fast as fingernails grow.",
              hints: [
                "That would be fast enough to see! Plate motion is far too slow to notice in a lifetime.",
                "",
                "They do move. Wegener's clues and ocean-floor maps showed it.",
              ],
            },
          },
        },
        {
          title: "Where Plates Meet",
          teach:
            "Plate edges are called boundaries, and there are three main kinds. At a divergent boundary, plates pull apart. Magma rises into the gap and cools into new crust. The Mid-Atlantic Ridge runs down the middle of the Atlantic Ocean this way, and Iceland sits right on top of it. At a convergent boundary, plates push together. If two continents collide, the crust crumples upward into mountains: the Himalayas, home of Mount Everest, are still rising as India pushes into Asia. If an ocean plate meets another plate, the heavier ocean plate sinks down into the mantle, a process called subduction, and a chain of volcanoes forms, like those in the Andes. At a transform boundary, plates grind sideways past each other. California's San Andreas Fault is a famous example.",
          visual: {
            type: "flip",
            cards: [
              { front: "Divergent boundary", back: "Plates pull apart and new crust forms. Example: the Mid-Atlantic Ridge and Iceland." },
              { front: "Convergent boundary", back: "Plates push together; mountains rise or one plate sinks. Examples: the Himalayas, the Andes." },
              { front: "Transform boundary", back: "Plates slide sideways past each other. Example: the San Andreas Fault." },
              { front: "Subduction", back: "A heavier ocean plate sinks beneath another plate into the mantle." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each place to the kind of plate boundary that formed it.",
            pairs: [
              { left: "Mid-Atlantic Ridge", right: "Divergent: plates pull apart" },
              { left: "Himalaya Mountains", right: "Convergent: two continents collide" },
              { left: "San Andreas Fault", right: "Transform: plates slide past each other" },
              { left: "Volcanoes of the Andes", right: "Convergent: an ocean plate sinks under a continent" },
            ],
            hint: "Ridges form where plates separate, mountains where they crash together, and long faults where they slide sideways.",
            mistakes: [
              { match: "San Andreas Fault matched to Divergent", coach: "Along the San Andreas Fault, the plates slide sideways past each other. That is a transform boundary." },
              { match: "Himalaya Mountains matched to Divergent", coach: "Mountains like the Himalayas rise where plates push together and crumple, not where they pull apart." },
            ],
            seconds: 45,
          },
          think: {
            q: "India pushing into Asia formed the Himalayas. What kind of boundary is that?",
            choices: ["Divergent", "Convergent", "Transform"],
            answer: 1,
            why: "The plates are pushing together, so it is a convergent boundary, and the crust crumples up into mountains.",
            hints: [
              "Divergent means pulling apart. India and Asia are pushing together.",
              "",
              "Transform means sliding sideways. Here the plates are crashing head-on.",
            ],
          },
          approaches: {
            analogy:
              "Push two rugs toward each other on a smooth floor and they wrinkle up into ridges, like mountains at a convergent boundary. Pull them apart and a gap opens, like a divergent boundary. Slide them past each other and their edges rub, like a transform boundary.",
            example:
              "Iceland sits on the Mid-Atlantic Ridge, where the North American and Eurasian plates pull apart. At a place called Thingvellir, you can walk along a rift valley between the two plates.",
            simpler: {
              q: "At a divergent boundary, plates...",
              choices: ["Pull apart", "Push together", "Slide sideways past each other"],
              answer: 0,
              why: "Divergent means moving apart, like diverging paths.",
              hints: [
                "",
                "Pushing together happens at convergent boundaries.",
                "Sliding sideways happens at transform boundaries.",
              ],
            },
          },
        },
        {
          title: "Earthquakes and Volcanoes",
          teach:
            "Plates do not slide smoothly. Along a boundary, rough rocks can lock together while the plates keep pushing. Stress builds for years, even centuries, until the rocks suddenly slip. That burst of energy travels out as seismic waves, and the ground shakes: an earthquake. The spot on the surface right above where the slip starts is the epicenter. Instruments called seismometers record the waves. Scientists rate earthquakes on the magnitude scale, where each step up of 1 means about 10 times more ground shaking and about 32 times more energy. Volcanoes form where magma rises to the surface, mostly at plate boundaries and above hot spots like the one under Hawaii. Once magma erupts, it is called lava. Around the Pacific Ocean, a belt called the Ring of Fire holds most of the world's active volcanoes.",
          visual: {
            type: "compare",
            left: {
              title: "Earthquake",
              points: ["Rocks lock, stress builds, then they suddenly slip", "Energy travels out as seismic waves", "Recorded by seismometers", "Rated by magnitude"],
            },
            right: {
              title: "Volcano",
              points: ["Magma rises from deep below", "Called lava once it reaches the surface", "Forms at plate boundaries and hot spots", "Builds mountains from layers of lava and ash"],
            },
          },
          probe: {
            type: "number",
            prompt: "On the magnitude scale, each step up of 1 means about 10 times more ground shaking. How many times more shaking does a magnitude 6 earthquake make than a magnitude 4?",
            answer: 100,
            tolerance: 0,
            unit: "times",
            hint: "Magnitude 6 is two steps above 4, and each step multiplies the shaking by 10.",
            mistakes: [
              { match: "2", coach: "The difference is 2 steps, but each step multiplies the shaking by 10. Multiply: 10 × 10." },
              { match: "20", coach: "Don't add 10 + 10. Each step multiplies by 10, so two steps is 10 × 10." },
              { match: "1000", coach: "That would be three steps. From 4 to 6 is only two steps: 10 × 10." },
            ],
            seconds: 35,
          },
          think: {
            q: "What causes most earthquakes?",
            choices: [
              "Rocks along a plate boundary suddenly slipping",
              "The Moon pulling on the oceans",
              "Thunderstorms",
              "Heavy buildings",
            ],
            answer: 0,
            why: "Stress builds where plates lock together, and the sudden slip releases energy as seismic waves.",
            hints: [
              "",
              "The Moon causes tides, not earthquakes.",
              "Storms happen in the air. Earthquakes start deep in the rock below.",
              "Buildings are far too light to make the Earth's crust slip.",
            ],
          },
          approaches: {
            analogy:
              "Bend a stick slowly in your hands. For a while nothing happens as the strain builds, then it suddenly snaps and you feel the jolt. Rocks along a fault store up strain the same way until they slip.",
            example:
              "Mount Fuji in Japan is a volcano formed where ocean plates sink beneath Japan. It last erupted in 1707. Japan also has many earthquakes, because it sits where several plates meet on the Ring of Fire.",
            simpler: {
              q: "Melted rock that has reached the surface is called...",
              choices: ["Magma", "Lava", "Crust"],
              answer: 1,
              why: "Melted rock is magma underground and lava once it erupts.",
              hints: [
                "Magma is melted rock while it is still underground.",
                "",
                "The crust is the solid outer layer, not melted rock.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps in order: how a volcano forms where an ocean plate meets a continent.",
        steps: [
          "An ocean plate and a continental plate push toward each other",
          "The heavier ocean plate sinks under the continent into the mantle",
          "Heat and water from the sinking plate help melt rock above it into magma",
          "The magma rises because it is lighter than the solid rock around it",
          "Magma erupts at the surface as lava and ash",
          "Layers of lava and ash build up a volcanic mountain",
        ],
      },
      explain: {
        prompt: "Explain how moving tectonic plates cause both earthquakes and volcanoes.",
        keyPoints: [
          "Earth's crust and upper mantle are broken into plates that move slowly",
          "Plates pull apart, push together or slide past each other at boundaries",
          "Earthquakes happen when locked rocks suddenly slip and release energy",
          "Volcanoes form where magma rises to the surface, often at plate boundaries",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Sort each feature by the kind of plate boundary that makes it.",
          buckets: ["Divergent (pull apart)", "Convergent (push together)", "Transform (slide past)"],
          items: [
            { text: "New ocean crust forming at a ridge", bucket: 0 },
            { text: "Iceland's rift valley", bucket: 0 },
            { text: "The Himalaya Mountains", bucket: 1 },
            { text: "Volcanoes of the Andes", bucket: 1 },
            { text: "An ocean plate sinking into the mantle", bucket: 1 },
            { text: "The San Andreas Fault", bucket: 2 },
          ],
          hint: "New crust means pulling apart. Mountains and sinking plates mean pushing together. A long sideways fault means sliding past.",
          mistakes: [
            { match: "Ocean plate sinking sorted as divergent", coach: "A plate sinks into the mantle when plates push together. That is subduction at a convergent boundary." },
            { match: "San Andreas Fault sorted as convergent", coach: "The two sides of the San Andreas Fault slide sideways past each other: a transform boundary." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Earth's layers, from the outside in, are the {0}, the {1}, the liquid {2}, and the solid {3}.",
          blanks: [{ answers: ["crust"] }, { answers: ["mantle"] }, { answers: ["outer core"] }, { answers: ["inner core"] }],
          bank: ["crust", "mantle", "outer core", "inner core", "magma", "plate"],
          hint: "Start with the thin layer we live on and work toward the center.",
          mistakes: [
            { match: "inner core", coach: "The inner core is solid because of the enormous pressure. The liquid layer is the outer core." },
            { match: "magma", coach: "Magma is melted rock that rises toward volcanoes. It is not one of Earth's four main layers." },
            { match: "plate", coach: "Plates are pieces of the crust and upper mantle, not a separate layer." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "A plate moves 4 centimeters a year. How many meters does it move in 1,000 years?",
          answer: 40,
          tolerance: 0,
          unit: "meters",
          hint: "Find the total in centimeters first, then divide by 100 to change centimeters into meters.",
          mistakes: [
            { match: "4000", coach: "That is the answer in centimeters. There are 100 centimeters in a meter, so divide by 100." },
            { match: "4", coach: "Check your multiplying: 4 cm × 1,000 years is 4,000 cm. Then divide by 100." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each word to its meaning.",
          pairs: [
            { left: "Magma", right: "Melted rock underground" },
            { left: "Lava", right: "Melted rock that reaches the surface" },
            { left: "Epicenter", right: "The spot on the surface above where an earthquake starts" },
            { left: "Seismometer", right: "An instrument that records earthquake waves" },
            { left: "Pangaea", right: "The supercontinent that broke apart long ago" },
          ],
          hint: "Magma and lava are both melted rock; the difference is where they are.",
          mistakes: [
            { match: "Magma matched to Melted rock that reaches the surface", coach: "Melted rock is called magma underground and lava once it erupts." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "Which layer of the Earth is the thickest?",
          choices: ["Crust", "Mantle", "Inner core", "Outer core"],
          answer: 1,
          why: "The mantle is almost 2,900 kilometers thick.",
        },
        {
          q: "California's San Andreas Fault is an example of...",
          choices: ["A divergent boundary", "A hot spot", "A mid-ocean ridge", "A transform boundary"],
          answer: 3,
          why: "There, two plates slide sideways past each other.",
        },
        {
          q: "Which clue supported Wegener's idea that continents had drifted?",
          choices: [
            "The same fossils on continents far apart",
            "Earth is round",
            "The Moon has craters",
            "Oceans have tides",
          ],
          answer: 0,
          why: "Fossils of the same land reptile in South America and Africa suggested the continents were once joined.",
        },
        {
          q: "Why are so many volcanoes found around the Pacific Ocean?",
          choices: [
            "The water there is warmer",
            "The Moon pulls hardest on the Pacific",
            "It is ringed by plate boundaries where plates sink into the mantle",
            "Islands attract volcanoes",
          ],
          answer: 2,
          why: "The Ring of Fire follows plate boundaries where subduction melts rock into magma.",
        },
        {
          q: "How do scientists know what is deep inside the Earth?",
          choices: [
            "They drilled all the way to the center",
            "By studying how earthquake waves travel through it",
            "Astronauts saw it from space",
            "By exploring deep caves",
          ],
          answer: 1,
          why: "Seismic waves bend and change speed in different materials, revealing the layers.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Model the three kinds of plate boundaries with graham crackers and frosting. Ask an adult before using the food. Materials: 2 graham crackers broken in half, a few spoonfuls of thick frosting (or pudding), a paper plate, a cup of water, and a paper towel. The frosting is the soft mantle, and the cracker pieces are plates. Steps: 1) Write a prediction for what each boundary will look like. 2) Divergent: spread the frosting on the plate, lay two cracker halves side by side on it, and slowly pull them apart. What appears in the gap? 3) Transform: press two halves edge to edge and slide them past each other in opposite directions. What happens to the edges? 4) Convergent, two continents: dip one edge of two halves in water for a few seconds, lay them on the frosting, and push the wet edges gently together. Watch them crumple up like mountains. 5) Convergent, subduction: push one dry half under another. Sketch each result, label the boundary type, and name a real place on Earth where it happens.",
        rubric: [
          "Prediction written before building the model",
          "All three boundary types modeled and sketched",
          "Each sketch correctly labeled with its boundary type",
          "A real place on Earth named for each kind of boundary",
        ],
      },
    },

    // 10. Electricity and magnetism
    {
      id: "science.electricity",
      title: "Electricity and Magnetism: Circuits, Conductors and Electromagnets",
      minutes: 35,
      stage: "logic",
      read: [
        "In 1820, the Danish scientist Hans Christian Ørsted was teaching when he noticed something strange. Whenever an electric current flowed through a wire, a compass needle lying nearby swung to point a different way. Electricity and magnetism, which most people had thought were separate, turned out to be closely linked. That discovery led to electric motors, generators and the power that runs our homes today.",
        "Electric current is a flow of tiny charged particles called electrons. A battery gives them a push, measured in volts. But current can flow only through a complete, unbroken loop called a circuit. A simple circuit has an energy source such as a battery, wires, a load such as a light bulb that uses the energy, and often a switch. When the switch is closed, the loop is complete and the bulb lights. When the switch is open, the loop is broken and the current stops.",
        "In a series circuit, all the parts are on one single path, so if one bulb burns out, they all go dark. In a parallel circuit, each part has its own branch, so the others keep working. That is why homes are wired in parallel.",
        "Materials that let current flow easily are called conductors. Most metals, such as copper and aluminum, are good conductors. Materials that block current are insulators, like rubber, plastic, glass and dry wood. Electrical cords use both: copper wire inside, plastic coating outside. Water with dissolved minerals conducts too, which is why electricity and water are a dangerous mix.",
        "Magnets have a north pole and a south pole. Like poles repel and opposite poles attract. A wire carrying current makes its own magnetic field, just as Ørsted saw. Wrap that wire into a coil around an iron nail and you have an electromagnet, a magnet you can switch on and off. More coils or more current make it stronger. Electromagnets lift scrap metal, ring doorbells and spin the motors in fans and cars.",
      ].join("\n\n"),
      keyIdeas: [
        "Current flows only through a complete, closed circuit.",
        "Series circuits have one path; parallel circuits give each part its own branch.",
        "Conductors let current flow easily; insulators block it.",
        "An electric current makes a magnetic field, so a coil of wire around iron becomes an electromagnet.",
      ],
      hook: {
        text: "In 1820, a Danish professor named Hans Christian Ørsted was showing his students an electric current flowing through a wire. A compass happened to be lying nearby. When the current flowed, the compass needle swung away from north. Why would electricity in a wire push on a compass needle? That small surprise revealed a hidden link between electricity and magnetism, and it changed the world.",
      },
      teach: [
        {
          title: "Current and Circuits",
          teach:
            "Everything is made of atoms, and atoms contain tiny particles called electrons that carry an electric charge. In a metal wire, some electrons can move freely. When they all drift in one direction, that flow is an electric current. A battery is like a pump that pushes electrons along. Its push is measured in volts; a flashlight battery gives 1.5 volts. But current can only flow around a closed, unbroken loop called a circuit. A simple circuit needs an energy source, like a battery; wires to carry the current; and a load, like a bulb or motor, that uses the energy. A switch opens and closes a gap in the loop. A closed circuit is complete, and the bulb lights. An open circuit has a break somewhere, and nothing flows.",
          visual: {
            type: "hotspots",
            title: "A simple circuit",
            center: "Battery, wires, bulb, switch",
            spots: [
              { label: "Battery", icon: "🔋", detail: "The energy source. It pushes electrons around the loop; one AA battery gives 1.5 volts." },
              { label: "Wires", icon: "〰️", detail: "Copper paths that carry the current from the battery to the bulb and back again." },
              { label: "Bulb", icon: "💡", detail: "The load: it turns electrical energy into light and heat." },
              { label: "Switch", icon: "🔘", detail: "Opens or closes a gap. Closed means the loop is complete and current flows." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every circuit in which the bulb will light.",
            sentences: [
              "A battery, a bulb and two wires make a full loop with the switch closed.",
              "The same loop, but the switch is open.",
              "One wire touches the battery, but the other wire is cut in the middle.",
              "Wires connect each end of the battery to the bulb in a complete loop.",
              "Both wires from the bulb are attached to the same end of the battery.",
              "A loop runs from the battery, through a bulb and a closed switch, and back to the battery.",
            ],
            correct: [0, 3, 5],
            hint: "Trace the path with your finger. Current must leave one end of the battery, pass through the bulb, and get back to the other end.",
            mistakes: [
              { match: "Tapped the open switch", coach: "An open switch leaves a gap in the loop, so current cannot flow." },
              { match: "Tapped both wires on the same end", coach: "Current must travel from one end of the battery to the other. Two wires on the same end make no complete path." },
              { match: "Tapped the cut wire", coach: "A cut wire is a break in the loop, just like an open switch." },
            ],
            seconds: 40,
          },
          think: {
            q: "A bulb is wired to a battery, but it won't light. The switch is open. Why?",
            choices: [
              "The battery is too strong",
              "The circuit is open, so there is a gap and no current flows",
              "Bulbs need water to work",
              "The wires are too short",
            ],
            answer: 1,
            why: "An open switch breaks the loop. Current can only flow through a closed circuit.",
            hints: [
              "A strong battery would make the bulb brighter, not dark. Look at the switch.",
              "",
              "Bulbs do not need water. In fact, water and electricity are a dangerous mix.",
              "Short wires work fine if the loop is complete. Look at the switch.",
            ],
          },
          approaches: {
            analogy:
              "A circuit is like a toy train on a circular track. The train can go round and round only if every piece of track is connected. Lift out one piece, like opening a switch, and the train stops.",
            example:
              "In a flashlight, batteries, metal strips, a bulb and a switch form a loop. Press the switch and a metal contact closes the gap, completing the circuit, so the bulb shines. Press it again and the gap opens, so the light goes out.",
            simpler: {
              q: "For a bulb to light, the circuit must be...",
              choices: ["Open, with a gap", "Closed, a complete loop", "Made of plastic"],
              answer: 1,
              why: "Current needs a complete path to flow.",
              hints: [
                "A gap stops the current, like a missing piece of train track.",
                "",
                "Plastic blocks current. Wires need metal inside.",
              ],
            },
          },
        },
        {
          title: "Series and Parallel Circuits",
          teach:
            "There are two main ways to connect more than one bulb. In a series circuit, everything is on one single path, like beads on a string. The current must pass through every bulb in turn. If one bulb burns out, it breaks the loop, and all the bulbs go dark. Adding more bulbs in series also makes each one dimmer, because they share the battery's push. In a parallel circuit, each bulb gets its own branch, a separate path back to the battery. If one bulb burns out, the others stay bright, because their branches are still complete. That is why the lights and outlets in a house are wired in parallel. You can switch off the kitchen light without plunging the whole house into darkness. Batteries can be connected in series too: their volts add up.",
          visual: {
            type: "compare",
            left: {
              title: "Series circuit",
              points: ["One single path for the current", "One bulb out means all go dark", "More bulbs make each one dimmer", "Batteries in series add their volts"],
            },
            right: {
              title: "Parallel circuit",
              points: ["Each bulb has its own branch", "One bulb out, the rest stay lit", "Each bulb gets the battery's full push", "Used to wire homes"],
            },
          },
          probe: {
            type: "cloze",
            text: "In a {0} circuit there is only one path, so when one bulb burns out, all the others go {1}. Homes are wired in {2}, so each light has its own branch.",
            blanks: [{ answers: ["series"] }, { answers: ["dark", "out", "off"] }, { answers: ["parallel"] }],
            bank: ["series", "parallel", "dark", "brighter", "insulators"],
            hint: "One path is series; separate branches are parallel. Think about what a single break does to a single path.",
            mistakes: [
              { match: "parallel", coach: "A parallel circuit has several branches. A circuit with only one path is a series circuit." },
              { match: "series", coach: "If homes were wired in series, one burned-out bulb would black out the whole house. Homes use parallel branches." },
              { match: "brighter", coach: "A burned-out bulb breaks the only path in a series circuit, so current stops everywhere." },
              { match: "insulators", coach: "Insulators block current. This blank is about how the circuit is arranged." },
            ],
            seconds: 35,
          },
          think: {
            q: "On an old string of holiday lights, all the bulbs go out when one bulb breaks. How are they wired?",
            choices: ["In parallel", "In series", "With insulators only", "They are not in a circuit"],
            answer: 1,
            why: "One broken bulb breaks the only path, so the current stops through all of them.",
            hints: [
              "In parallel, each bulb has its own branch, so the others would stay lit.",
              "",
              "Insulators would block the current completely. The lights worked before one broke.",
              "They lit up before, so they must be in a circuit. Think about how many paths there are.",
            ],
          },
          approaches: {
            analogy:
              "A series circuit is like a one-lane road with no side streets: if one bridge closes, every car is stuck. A parallel circuit is like several separate roads to the same town: close one, and traffic keeps moving on the others.",
            example:
              "Two 1.5-volt batteries placed end to end, in series, give 3 volts. Four in series give 6 volts. That is why a toy that needs 6 volts often holds four AA batteries lined up end to end.",
            simpler: {
              q: "In a series circuit, how many paths can the current take?",
              choices: ["One", "Two", "One for every bulb"],
              answer: 0,
              why: "Series means everything is on one single path.",
              hints: [
                "",
                "Two or more paths would make it a parallel circuit.",
                "Separate paths for each bulb describe a parallel circuit.",
              ],
            },
          },
        },
        {
          title: "Conductors and Insulators",
          teach:
            "Why are wires made of copper wrapped in plastic? Because some materials let current flow easily and others block it. Conductors let electrons move freely. Most metals are good conductors: copper, aluminum, silver, iron and gold. Insulators hold their electrons tightly, so current cannot flow through them. Rubber, plastic, glass, dry wood, cloth and air are insulators. An electrical cord uses both: the copper inside carries the current, and the plastic outside keeps it from reaching your hand. Water is tricky. Very pure water is a poor conductor, but tap water, rainwater and the water in your body contain dissolved minerals that let current flow. That is why you should never touch a switch or plug with wet hands, and why electrical devices must stay away from bathtubs and pools.",
          visual: {
            type: "flip",
            cards: [
              { front: "Conductor", back: "A material that lets electric current flow easily, like copper or aluminum." },
              { front: "Insulator", back: "A material that blocks electric current, like rubber, plastic or glass." },
              { front: "Why copper?", back: "It conducts very well and costs far less than silver, the best conductor of all." },
              { front: "Water and electricity", back: "Water with dissolved minerals conducts, so keep electrical things away from wet hands." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each material.",
            buckets: ["Conductor", "Insulator"],
            items: [
              { text: "Copper wire", bucket: 0 },
              { text: "Aluminum foil", bucket: 0 },
              { text: "A steel paper clip", bucket: 0 },
              { text: "A gold ring", bucket: 0 },
              { text: "A rubber band", bucket: 1 },
              { text: "A plastic spoon", bucket: 1 },
              { text: "A glass marble", bucket: 1 },
              { text: "A dry wooden craft stick", bucket: 1 },
            ],
            hint: "Is it a metal? Most metals conduct. Rubber, plastic, glass and dry wood insulate.",
            mistakes: [
              { match: "Paper clip sorted as insulator", coach: "Paper clips are made of steel, a metal, and metals conduct." },
              { match: "Wooden craft stick sorted as conductor", coach: "Dry wood holds its electrons tightly and blocks current, so it is an insulator." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why are electrical cords covered in plastic?",
            choices: [
              "Plastic is a conductor that speeds up the current",
              "Plastic makes the cord heavier",
              "Plastic stores extra electricity",
              "Plastic is an insulator that keeps the current away from your hand",
            ],
            answer: 3,
            why: "The copper inside carries the current; the plastic insulator keeps it safely inside.",
            hints: [
              "Plastic is not a conductor. It blocks current instead.",
              "Weight is not the reason. Think about safety.",
              "Plastic does not store electricity. It blocks it from flowing.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A conductor is like an open hallway where people can walk through easily. An insulator is like a solid wall: the people stay where they are, so no one gets through.",
            example:
              "Test materials with a simple circuit: a battery, a bulb and two loose wire ends. Touch both ends to a metal spoon and the bulb lights, so the spoon conducts. Touch them to a plastic spoon and the bulb stays dark, so plastic insulates.",
            simpler: {
              q: "Most metals are...",
              choices: ["Conductors", "Insulators", "Batteries"],
              answer: 0,
              why: "Metals let electrons move freely, so current flows easily.",
              hints: [
                "",
                "Insulators block current, like rubber and plastic. Metals let it flow.",
                "A battery is an energy source, not a kind of material.",
              ],
            },
          },
        },
        {
          title: "Magnets and Electromagnets",
          teach:
            "Every magnet has two ends called poles, north and south. Opposite poles attract, and like poles repel. The space around a magnet where its force acts is its magnetic field. Earth itself acts like a giant magnet, which is why a compass needle points north. Ørsted's discovery showed that an electric current also makes a magnetic field. Wind a wire into a coil and the field gets stronger. Put an iron nail inside the coil and it becomes an electromagnet, a magnet you can switch on and off. You can make it stronger by adding more coils or more current. Cranes lift scrap cars with electromagnets, and electric motors use them to spin. In 1831, Michael Faraday showed the reverse: moving a magnet near a coil of wire makes a current. That is how power plants generate electricity.",
          visual: {
            type: "hotspots",
            title: "Parts of an electromagnet",
            center: "Electromagnet",
            spots: [
              { label: "Battery", icon: "🔋", detail: "Supplies the current. More current makes a stronger magnet." },
              { label: "Coil of wire", icon: "🌀", detail: "Insulated copper wire wrapped around and around. More turns make a stronger magnet." },
              { label: "Iron nail", icon: "🔩", detail: "The core. Iron gathers the magnetic field and makes it much stronger." },
              { label: "Switch", icon: "🔘", detail: "Turn the current off and the electromagnet lets go." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the steps for building and testing an electromagnet in order.",
            steps: [
              "Gather an iron nail, insulated copper wire and a battery",
              "Wrap the wire tightly around the nail many times, leaving both ends free",
              "Connect the two wire ends to the two ends of the battery",
              "Hold the nail near some paper clips and watch them jump to it",
              "Disconnect the wire and watch the paper clips drop",
            ],
            hint: "You need the parts first, then the coil, then the current. Only then can the nail act as a magnet.",
            mistakes: [
              { match: "Connected the battery before wrapping", coach: "Wrap the coil first. Without the coil around the nail, there is no electromagnet to switch on." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which change would make an electromagnet stronger?",
            choices: [
              "Using fewer coils of wire",
              "Wrapping more coils of wire around the nail",
              "Replacing the iron nail with a plastic straw",
              "Disconnecting the battery",
            ],
            answer: 1,
            why: "More coils concentrate more of the magnetic field into the iron core.",
            hints: [
              "Fewer coils make a weaker magnet, not a stronger one.",
              "",
              "Iron makes the field much stronger. A plastic straw would weaken it.",
              "Without current, there is no magnetic field at all.",
            ],
          },
          approaches: {
            analogy:
              "An electromagnet is like a flashlight for magnetism. Switch it on and the magnetic force appears; switch it off and it disappears. More coils or more current make it stronger, like a brighter beam.",
            example:
              "A scrapyard crane has a huge electromagnet. The operator switches on the current, lowers the magnet onto an old car, and lifts it. Over the pile of scrap, the operator switches off the current, the magnetism vanishes, and the car drops exactly where it should.",
            simpler: {
              q: "Two magnets have their north poles facing each other. What happens?",
              choices: ["They attract", "They repel", "Nothing happens"],
              answer: 1,
              why: "Like poles repel; opposite poles attract.",
              hints: [
                "Opposite poles attract. These are the same pole, north and north.",
                "",
                "Magnets always push or pull on each other when they are close.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every change that would make an electromagnet STRONGER.",
        sentences: [
          "Wrap more coils of wire around the nail.",
          "Paint the nail red.",
          "Use two batteries in series instead of one.",
          "Swap the iron nail for a plastic straw.",
          "Use an iron core instead of an empty coil of wire.",
          "Disconnect one end of the wire.",
        ],
        correct: [0, 2, 4],
      },
      explain: {
        prompt: "Explain how an electromagnet works and how to make it stronger, using what you know about circuits.",
        keyPoints: [
          "Current flows only through a complete, closed circuit",
          "An electric current makes a magnetic field",
          "Coiling the wire around an iron core makes an electromagnet",
          "More coils or more current make it stronger, and switching off the current turns it off",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Sort each statement: does it describe a series or a parallel circuit?",
          buckets: ["Series circuit", "Parallel circuit"],
          items: [
            { text: "Only one path for the current", bucket: 0 },
            { text: "Each bulb has its own branch", bucket: 1 },
            { text: "One bulb burns out and all go dark", bucket: 0 },
            { text: "How the outlets in a house are wired", bucket: 1 },
            { text: "Adding bulbs makes each one dimmer", bucket: 0 },
            { text: "Turning off one light leaves the others on", bucket: 1 },
          ],
          hint: "Series means one path, so one break stops everything. Parallel means separate branches.",
          mistakes: [
            { match: "House outlets sorted as series", coach: "If a house were wired in series, unplugging one lamp would cut power everywhere. Homes use parallel branches." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Each AA battery gives 1.5 volts. How many volts do 4 AA batteries give when they are connected in series?",
          answer: 6,
          tolerance: 0,
          unit: "volts",
          hint: "In series, the volts of each battery add up.",
          mistakes: [
            { match: "1.5", coach: "That is just one battery. In series, add the volts of all four." },
            { match: "4", coach: "4 is the number of batteries. Multiply by 1.5 volts each." },
            { match: "5.5", coach: "You added 4 + 1.5. Instead, add 1.5 four times, or multiply 4 × 1.5." },
          ],
          seconds: 30,
        },
        {
          type: "match",
          prompt: "Match each part to its job.",
          pairs: [
            { left: "Battery", right: "Pushes current around the circuit" },
            { left: "Switch", right: "Opens or closes a gap in the loop" },
            { left: "Copper wire", right: "Conducts current from part to part" },
            { left: "Plastic coating", right: "Insulates the wire so current stays inside" },
            { left: "Iron nail in a coil", right: "Becomes a magnet when current flows" },
          ],
          hint: "Think about what would happen if each part were missing.",
          mistakes: [
            { match: "Plastic coating matched to Conducts current", coach: "Plastic is an insulator. The copper conducts; the plastic keeps the current inside." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Opposite magnetic poles {0}, and like poles {1}. An electromagnet is made by wrapping wire around an {2} core and running a current through it.",
          blanks: [{ answers: ["attract"] }, { answers: ["repel"] }, { answers: ["iron"] }],
          bank: ["attract", "repel", "iron", "plastic", "glow"],
          hint: "North and south pull together; north and north push apart. The best core is a magnetic metal.",
          mistakes: [
            { match: "plastic", coach: "Plastic is not magnetic. An iron core gathers the magnetic field and makes it much stronger." },
            { match: "repel", coach: "Opposite poles pull together. It is like poles that push apart." },
            { match: "attract", coach: "Like poles, such as north and north, push apart. Opposites attract." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What is needed for current to flow?",
          choices: ["A closed, complete circuit", "An open switch", "A plastic wire", "A magnet"],
          answer: 0,
          why: "Current can flow only around a complete, unbroken loop.",
        },
        {
          q: "Which of these is the best insulator?",
          choices: ["Copper", "Aluminum", "Rubber", "Iron"],
          answer: 2,
          why: "Rubber blocks current. The other three are metals, which conduct.",
        },
        {
          q: "In a parallel circuit, if one bulb burns out...",
          choices: ["All the others go out", "The others stay lit", "The battery stops working"],
          answer: 1,
          why: "Each bulb has its own branch, so the other branches are still complete.",
        },
        {
          q: "What did Ørsted discover in 1820?",
          choices: [
            "Lightning is electricity",
            "Copper is a metal",
            "Batteries store water",
            "An electric current can move a compass needle",
          ],
          answer: 3,
          why: "A current makes a magnetic field, which pushed the compass needle. This linked electricity and magnetism.",
        },
        {
          q: "How can you make an electromagnet stronger?",
          choices: ["Use a plastic core", "Add more coils of wire", "Use fewer batteries", "Open the switch"],
          answer: 1,
          why: "More coils, or more current, make a stronger magnetic field.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Build an electromagnet and test what makes it stronger. An adult must supervise. Use only a battery, never a wall outlet. Materials: a large iron or steel nail (about 8 cm long), about 1 meter of thin insulated copper wire, a fresh D battery, tape, and a pile of small steel paper clips. Steps: 1) Write a hypothesis: how will the number of coils change how many paper clips the nail picks up? 2) Wrap 10 coils of wire around the nail, leaving both ends free. Have an adult strip about 2 cm of plastic off each end. 3) Hold or tape the wire ends to the two ends of the battery, touch the nail tip to the paper clips, lift, and count. Disconnect right away; the wire and battery get warm if left connected. 4) Repeat with 20 and then 30 coils, doing 3 trials each. 5) Record the results in a table, find each average, and write a conclusion: was your hypothesis supported?",
        rubric: [
          "Hypothesis written before testing",
          "Only the number of coils changed; the same nail, battery and paper clips were used",
          "Results recorded in a table with 3 trials and an average for each number of coils",
          "Conclusion explains how coils affect strength and why the clips drop when the current stops",
        ],
      },
    },
  ],
};
