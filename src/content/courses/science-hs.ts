import type { Course } from "./types";
import { science } from "./science";

/**
 * Science Lab: Advanced: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const scienceHs: Course = {
  ...science,
  id: "science-hs",
  band: "strategist",
  title: "Science Lab: Advanced",
  blurb: "High school science: experimental design, physics, energy, chemistry and genetics, with real math.",
  lessons: [
    // 1. Experimental design and data
    {
      id: "science-hs.experiments",
      title: "Experimental Design: Controls, Samples and Error",
      minutes: 35,
      stage: "logic",
      read: [
        "In 1747, scurvy was one of the deadliest dangers of long sea voyages. Sailors' gums bled, old wounds reopened, and many died. James Lind, a surgeon aboard the British ship HMS Salisbury, decided to compare remedies directly. He chose twelve sailors with scurvy, kept them in the same part of the ship on the same basic diet, and split them into six pairs. Each pair received a different extra remedy: cider, a weak acid, vinegar, seawater, a medicinal paste, or two oranges and a lemon each day. The pair eating citrus recovered fastest; one of them was fit for duty within about a week.",
        "Lind's study shows the core of experimental design. The independent variable is the factor you change on purpose. The dependent variable is what you measure. Controlled variables are held constant so they cannot explain the result. A control group provides a baseline, and in medicine it often receives a placebo, a look-alike treatment with no active ingredient.",
        "Lind's weakness was sample size: two sailors per remedy. With so few subjects, one unusual person can swing the result. Larger samples, random assignment to groups, and replication by other scientists make conclusions far more trustworthy.",
        "Data must also be summarized honestly. The mean is the sum of the values divided by how many there are. The range, largest minus smallest, shows the spread. Random error scatters results in both directions and shrinks when you average many trials. Systematic error pushes every result the same way and must be fixed at its source. Percent error compares a measurement with an accepted value: the difference divided by the accepted value, times 100.",
        "Finally, a good scientist concludes carefully. A difference smaller than the normal spread of the data may be pure chance, and a correlation between two things does not prove that one causes the other.",
      ].join("\n\n"),
      keyIdeas: [
        "Change one independent variable, measure the dependent variable, and compare against a control group.",
        "Large samples, random assignment and replication protect against chance and bias.",
        "Summarize data with the mean and range, and report error honestly with percent error.",
        "Correlation is not causation, and small differences may be chance.",
      ],
      hook: {
        text: "In 1747, a ship's surgeon named James Lind faced a disease that was killing sailors on long voyages: scurvy. Instead of trusting rumors about cures, he took twelve sick sailors, split them into six pairs, and gave each pair a different remedy. One pair got oranges and lemons. What happened next became one of the most famous experiments in the history of medicine, and it still teaches us how to design a fair test.",
      },
      teach: [
        {
          title: "Variables and Control Groups",
          teach:
            "A controlled experiment changes one factor on purpose, the independent variable, and measures its effect on the dependent variable. Every other factor that could affect the result is a controlled variable, held constant. Many experiments also need a control group: subjects that get no treatment, or the standard treatment, so you have a baseline for comparison. The experimental group gets the treatment being tested. In medicine, a control group often receives a placebo, a look-alike treatment with no active ingredient, because people sometimes feel better simply from expecting to. In a blind study, subjects do not know which group they are in. In a double-blind study, the researchers measuring the results do not know either, so their expectations cannot tilt the data. Lind had no placebo, but every pair shared the same diet and quarters, so the added remedy was the only planned difference.",
          visual: {
            type: "flip",
            cards: [
              { front: "Control group", back: "Gets no treatment or the standard treatment. It is the baseline for comparison." },
              { front: "Experimental group", back: "Gets the treatment being tested." },
              { front: "Placebo", back: "A look-alike treatment with no active ingredient, given to the control group." },
              { front: "Double-blind", back: "Neither the subjects nor the researchers measuring results know who got the real treatment." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "A coach tests whether a new sports drink improves 400 m run times. Sort each part of the design.",
            buckets: ["Independent variable", "Dependent variable", "Controlled variable", "Control group"],
            items: [
              { text: "Which drink each runner gets", bucket: 0 },
              { text: "Each runner's 400 m time in seconds", bucket: 1 },
              { text: "The same track at the same time of day", bucket: 2 },
              { text: "The same 15-minute warm-up for everyone", bucket: 2 },
              { text: "Runners given a flavored water that looks the same but has no added ingredients", bucket: 3 },
            ],
            hint: "Ask: what does the coach change on purpose, what does he measure, what stays the same, and who serves as the baseline?",
            mistakes: [
              { match: "Run time sorted as independent", coach: "The coach does not choose the times; he measures them after the race. That makes run time the dependent variable." },
              { match: "Flavored water runners sorted as controlled", coach: "These runners are a whole group used for comparison, with a look-alike drink. That is the control group, receiving a placebo." },
            ],
            seconds: 50,
          },
          think: {
            q: "In a fertilizer test, one group of plants gets no fertilizer. What is the purpose of that group?",
            choices: ["To give a baseline to compare against", "To make the sample bigger", "To be the independent variable", "To save money on fertilizer"],
            answer: 0,
            why: "The control group shows what happens without the treatment, so any difference in the fertilized plants can be measured against it.",
            hints: [
              "",
              "It does add plants, but that is not its job. Think about what you would compare the fertilized plants with.",
              "The independent variable is the factor you change, fertilizer or no fertilizer. The group itself is something else.",
              "Cost has nothing to do with experimental design. Ask what the unfertilized plants let you compare.",
            ],
          },
          approaches: {
            analogy:
              "A control group is like the 'before' photo in a home renovation. Without it, you cannot tell how much the work actually changed. The experimental group is the 'after' photo, and the difference between them is the effect.",
            example:
              "Does caffeine change reaction time? Forty volunteers are randomly split. The experimental group drinks coffee; the control group drinks decaf that tastes the same (a placebo). Neither the volunteers nor the person running the timer knows who got which (double-blind). Independent variable: caffeine. Dependent variable: reaction time in milliseconds. Controlled: same test, same time of day, same cup size.",
            simpler: {
              q: "Which group usually receives the placebo?",
              choices: ["The control group", "The experimental group", "Neither group"],
              answer: 0,
              why: "The placebo looks like the treatment but has no active ingredient, so it goes to the control group.",
              hints: [
                "",
                "The experimental group gets the real treatment being tested.",
                "A placebo is used precisely so one group feels treated without getting the real thing.",
              ],
            },
          },
        },
        {
          title: "Sample Size and Random Assignment",
          teach:
            "Lind's result was striking, but he tested only two sailors per remedy. With such a small sample, one unusually strong or weak sailor could swing the outcome. Larger samples reduce the influence of chance, so the averages become more reliable. That is why modern medical trials often enroll hundreds or thousands of people. Size alone is not enough, though. If a researcher puts the healthiest volunteers in the treatment group, the treatment will look better than it really is. This hidden bias is avoided by random assignment: flipping a coin or using a random number generator to decide who goes in which group, so differences between people tend to even out. Finally, scientists value replication. When an independent team repeats an experiment and gets the same result, confidence grows. A single surprising study is a reason to test again, not a final answer.",
          visual: {
            type: "compare",
            left: {
              title: "Small sample (2 per group)",
              points: [
                "One unusual subject can swing the result",
                "Averages jump around from test to test",
                "Hard to tell a real effect from luck",
              ],
            },
            right: {
              title: "Large sample (200 per group)",
              points: [
                "Unusual subjects get averaged out",
                "Averages are stable when repeated",
                "Small real effects become visible",
              ],
            },
          },
          probe: {
            type: "highlight",
            prompt: "A student tests whether playing music helps tomato seedlings grow. Tap every design choice that WEAKENS the experiment.",
            sentences: [
              "She grows 3 plants with music and 3 without.",
              "She puts the tallest seedlings in the music group.",
              "All plants get the same soil, water and light.",
              "She measures every plant's height in centimeters each Friday.",
              "She runs the test only once and never repeats it.",
              "She places all plants in the same room at the same temperature.",
            ],
            correct: [0, 1, 4],
            hint: "Look for three problems: too few subjects, groups that were not assigned fairly, and no repetition.",
            mistakes: [
              { match: "Tapped the soil, water and light sentence", coach: "Keeping soil, water and light the same is good design. Those are controlled variables." },
              { match: "Missed the tallest seedlings sentence", coach: "Choosing the tallest seedlings for the music group stacks the deck. Groups should be assigned randomly." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why do researchers assign subjects to groups at random?",
            choices: [
              "So the experiment finishes faster",
              "So hidden differences between subjects even out between the groups",
              "So the researcher can pick the best subjects for the treatment",
              "So they need fewer subjects",
            ],
            answer: 1,
            why: "Random assignment stops the researcher, consciously or not, from loading one group with healthier or stronger subjects.",
            hints: [
              "Randomizing does not save time. Think about what could go wrong if the researcher picked the groups.",
              "",
              "Picking the best subjects for the treatment is exactly the bias random assignment prevents.",
              "Randomizing does not reduce the number needed. Large samples are still important.",
            ],
          },
          approaches: {
            analogy:
              "Picking teams by having captains choose gives one side the strongest players. Drawing names from a hat makes the teams roughly even. Random assignment is drawing names from a hat, so the groups start out fair.",
            example:
              "A study of a new tutoring method lets students volunteer for it. The volunteers score higher. But volunteers may already be more motivated. A better design takes 200 students, flips a coin for each to assign tutoring or the usual class, and compares the averages. Then motivation is spread evenly across both groups.",
            simpler: {
              q: "Which gives more reliable results?",
              choices: ["2 plants per group", "50 plants per group", "They are equally reliable"],
              answer: 1,
              why: "Larger samples make it less likely that one unusual plant controls the result.",
              hints: [
                "With only 2 plants, one sick or extra-healthy plant could change the whole result.",
                "",
                "Sample size matters. More subjects means chance has less influence on the average.",
              ],
            },
          },
        },
        {
          title: "Mean, Range and Spread",
          teach:
            "Repeated trials never give exactly the same number, so you need ways to summarize them. The mean is the sum of the values divided by how many there are. The range, the largest value minus the smallest, shows how spread out the data is. Suppose you time one swing of a pendulum five times and get 2.02, 1.98, 2.05, 1.95 and 2.00 seconds. The sum is 10.00 seconds, so the mean is 2.00 seconds, and the range is 2.05 minus 1.95, or 0.10 seconds. A small range compared with the mean tells you the measurements are precise: they agree closely with one another. A value far from all the rest is called an outlier. Do not delete it just because it is inconvenient. Check for a recording mistake, note what happened, and report how you handled it.",
          visual: {
            type: "hotspots",
            title: "Summarizing five trials",
            center: "📊",
            spots: [
              { label: "Mean", icon: "➗", detail: "Add all the values, then divide by how many there are. Five trials summing to 10.00 s give a mean of 2.00 s." },
              { label: "Range", icon: "↔️", detail: "Largest value minus smallest value. It is a quick measure of spread." },
              { label: "Precision", icon: "🎯", detail: "How closely repeated measurements agree with each other. A small range means high precision." },
              { label: "Outlier", icon: "❗", detail: "A value far from the rest. Investigate it and report it honestly; never just erase it." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A toy car takes 1.42, 1.38, 1.45, 1.40 and 1.35 seconds to roll down a ramp in five trials. What is the mean time?",
            answer: 1.4,
            tolerance: 0.005,
            unit: "s",
            hint: "Add the five times, then divide the total by 5.",
            mistakes: [
              { match: "7", coach: "7.00 seconds is the total of all five trials. Divide it by the number of trials to get the mean." },
              { match: "0.1", coach: "0.10 seconds is the range (1.45 minus 1.35). The question asks for the mean." },
              { match: "1.42", coach: "1.42 is just the first trial. The mean uses all five values." },
            ],
            seconds: 50,
          },
          think: {
            q: "Four trials give 4, 7, 5 and 9 seconds. What is the range?",
            choices: ["6.25 s", "25 s", "5 s", "9 s"],
            answer: 2,
            why: "Range is largest minus smallest: 9 minus 4 equals 5 seconds.",
            hints: [
              "6.25 s is the mean. The range is the largest value minus the smallest.",
              "25 s is the total of all four trials. The range compares only the largest and smallest values.",
              "",
              "9 s is just the largest value. Subtract the smallest value from it.",
            ],
          },
          approaches: {
            analogy:
              "If five friends guess the weight of a pumpkin, the mean is the group's best combined guess, and the range tells you how much they disagreed. Guesses of 9, 10 and 11 pounds deserve more trust than guesses of 2, 10 and 18, even though both have a mean of 10.",
            example:
              "Five measurements of a table's length: 152.3, 152.1, 152.4, 152.2 and 152.0 cm. Sum: 761.0 cm. Mean: 761.0 ÷ 5 = 152.2 cm. Range: 152.4 minus 152.0 = 0.4 cm. The small range shows the measurements were precise.",
            simpler: {
              q: "What is the mean of 2, 4 and 6?",
              choices: ["4", "12", "6"],
              answer: 0,
              why: "2 + 4 + 6 = 12, and 12 ÷ 3 = 4.",
              hints: [
                "",
                "12 is the sum. Divide it by how many numbers there are.",
                "6 is the largest number. The mean sits in the middle of the data.",
              ],
            },
          },
        },
        {
          title: "Error and Honest Conclusions",
          teach:
            "Every measurement has some error. Random error comes from small unpredictable variations, like starting a stopwatch a little early or late. Averaging many trials shrinks its effect. Systematic error pushes every result the same way, like a scale that always reads 0.2 kilograms heavy. Averaging cannot fix it, so you must recalibrate the instrument. When an accepted value is known, scientists report percent error: the difference between the measured and accepted values, divided by the accepted value, times 100. If you measure gravity as 10.29 meters per second squared and the accepted value is 9.80, the percent error is 0.49 divided by 9.80, times 100, or 5 percent. Accuracy means closeness to the true value; precision means agreement among trials. Conclude carefully, too. If two groups' ranges overlap heavily, the difference may be chance. And a correlation, two things rising together, does not prove that one causes the other.",
          visual: {
            type: "compare",
            left: {
              title: "Random error",
              points: [
                "Scatters results above and below the true value",
                "Example: reaction time on a stopwatch",
                "Shrinks when you average many trials",
              ],
            },
            right: {
              title: "Systematic error",
              points: [
                "Pushes every result in the same direction",
                "Example: a scale that always reads 0.2 kg heavy",
                "Averaging does not help; recalibrate instead",
              ],
            },
          },
          probe: {
            type: "number",
            prompt: "A student measures the density of an aluminum block as 2.57 g/cm³. The accepted value is 2.70 g/cm³. What is the percent error? Round to one decimal place.",
            answer: 4.8,
            tolerance: 0.1,
            unit: "%",
            hint: "Find the difference between measured and accepted, divide by the ACCEPTED value, then multiply by 100.",
            mistakes: [
              { match: "0.13", coach: "0.13 g/cm³ is the difference. Divide it by the accepted value, 2.70, then multiply by 100." },
              { match: "0.048", coach: "You divided correctly but forgot to multiply by 100 to turn the fraction into a percent." },
              { match: "5.1", coach: "It looks like you divided by the measured value, 2.57. Percent error divides by the accepted value, 2.70." },
            ],
            seconds: 60,
          },
          think: {
            q: "A kitchen scale always reads 0.2 kg more than the true mass. What kind of error is this?",
            choices: ["Random error", "Systematic error", "A placebo effect", "An outlier"],
            answer: 1,
            why: "The error pushes every reading in the same direction by the same amount, which is the mark of systematic error.",
            hints: [
              "Random error scatters readings both high and low. This scale is always high.",
              "",
              "A placebo effect involves people's expectations, not a faulty instrument.",
              "An outlier is one strange value. This error affects every reading.",
            ],
          },
          approaches: {
            analogy:
              "Think of darts. Random error is a shaky hand: darts scatter around the bullseye, and their average lands near the center. Systematic error is a bent sight: every dart lands two inches to the left, and throwing more darts never fixes it.",
            example:
              "You measure the boiling point of water at sea level three times: 97.0, 97.2 and 96.8 °C. Mean: 97.0 °C. The accepted value is 100.0 °C. Percent error = (100.0 minus 97.0) ÷ 100.0 × 100 = 3 percent. The readings are precise (range 0.4) but all low, a clue that the thermometer has a systematic error.",
            simpler: {
              q: "Measurements that agree closely with each other are...",
              choices: ["Precise", "Always accurate", "Outliers"],
              answer: 0,
              why: "Precision means repeated measurements agree. Accuracy means they are close to the true value.",
              hints: [
                "",
                "Measurements can agree with each other and still all be wrong, like a scale that always reads heavy.",
                "Outliers are values that do not agree with the rest.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of designing and running a trustworthy experiment in order.",
        steps: [
          "Ask a testable question",
          "Write a hypothesis that names the independent and dependent variables",
          "Randomly assign subjects to a control group and an experimental group",
          "Run repeated trials while holding the controlled variables constant",
          "Calculate the mean, range and any percent error",
          "Draw a conclusion and report all the data honestly",
          "Invite others to replicate the experiment",
        ],
      },
      explain: {
        prompt: "Explain how a scientist designs an experiment whose results can be trusted, and how the data should be summarized. Use James Lind's scurvy test as an example.",
        keyPoints: [
          "Change one independent variable and measure the dependent variable",
          "Use a control group and keep other variables constant",
          "Use a large sample and random assignment",
          "Summarize with mean and range and report error",
          "Replicate and be careful about correlation versus causation",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each term to its meaning.",
          pairs: [
            { left: "Placebo", right: "A look-alike treatment with no active ingredient" },
            { left: "Double-blind", right: "Neither subjects nor researchers know who got the treatment" },
            { left: "Random assignment", right: "Chance decides which group each subject joins" },
            { left: "Replication", right: "Another team repeats the study to check the result" },
            { left: "Systematic error", right: "An error that pushes every result the same way" },
          ],
          hint: "Think about the job each idea does: hiding expectations, preventing bias, checking results, or describing a kind of error.",
          mistakes: [
            { match: "Placebo matched with double-blind", coach: "A placebo is the fake treatment itself. Double-blind describes who knows which group is which." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "Four measurements of a spring's stretch are 12.4, 12.9, 12.1 and 12.6 cm. What is the range?",
          answer: 0.8,
          tolerance: 0.01,
          unit: "cm",
          hint: "Range is the largest value minus the smallest value.",
          mistakes: [
            { match: "12.5", coach: "12.5 cm is the mean. The range is the largest value minus the smallest." },
            { match: "0.5", coach: "Check which values are largest and smallest: 12.9 and 12.1." },
            { match: "50", coach: "50 is the sum of all four measurements. Range only uses the largest and smallest values." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "Using a pendulum, a student measures gravity as 9.32 m/s². The accepted value is 9.80 m/s². What is the percent error? Round to one decimal place.",
          answer: 4.9,
          tolerance: 0.1,
          unit: "%",
          hint: "Percent error = (difference ÷ accepted value) × 100.",
          mistakes: [
            { match: "0.48", coach: "0.48 m/s² is the difference. Divide by 9.80, then multiply by 100." },
            { match: "5.2", coach: "It looks like you divided by 9.32, the measured value. Divide by the accepted value, 9.80." },
            { match: "0.049", coach: "Multiply by 100 to turn the fraction into a percent." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "When neither the subjects nor the researchers know who got the real treatment, the study is {0}. Two quantities that rise together show a {1}, which does not by itself prove {2}.",
          blanks: [
            { answers: ["double-blind", "double blind"] },
            { answers: ["correlation"] },
            { answers: ["causation", "cause and effect", "cause"] },
          ],
          bank: ["double-blind", "correlation", "causation", "placebo", "replication"],
          hint: "One blank describes who knows what, one names things moving together, and one names one thing making another happen.",
          mistakes: [
            { match: "placebo", coach: "A placebo is the fake treatment, not a description of who knows the group assignments." },
            { match: "replication", coach: "Replication means repeating a study. This sentence is about two quantities moving together, or one causing the other." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "In James Lind's 1747 experiment, which remedy helped the sailors with scurvy recover fastest?",
          choices: ["Cider", "Seawater", "Oranges and lemons", "Vinegar"],
          answer: 2,
          why: "The pair given two oranges and a lemon each day recovered fastest. Today we know citrus contains vitamin C, which prevents scurvy.",
        },
        {
          q: "What was the biggest weakness of Lind's experiment?",
          choices: [
            "Only two sailors per remedy, a very small sample",
            "He changed too many variables at once",
            "He had no dependent variable",
            "He used sailors instead of plants",
          ],
          answer: 0,
          why: "With only two subjects per group, chance could easily have shaped the result. Larger samples are more reliable.",
        },
        {
          q: "What is the mean of 3, 5, 7 and 9?",
          choices: ["24", "5", "4", "6"],
          answer: 3,
          why: "3 + 5 + 7 + 9 = 24, and 24 ÷ 4 = 6.",
        },
        {
          q: "Which is an example of systematic error?",
          choices: [
            "Reacting a little early or late with a stopwatch",
            "A ruler with the first centimeter worn off, so every length reads 1 cm too long",
            "A gust of wind during one trial",
            "Rounding one value differently from the others",
          ],
          answer: 1,
          why: "The worn ruler shifts every measurement the same way, which is systematic. Averaging will not remove it.",
        },
        {
          q: "Towns that sell more ice cream also report more sunburns. What is the best conclusion?",
          choices: [
            "Ice cream causes sunburn",
            "Sunburn makes people want ice cream",
            "Both are probably linked to a third factor, hot sunny weather",
            "The data must be false",
          ],
          answer: 2,
          why: "A correlation does not prove causation. Sunny weather increases both ice cream sales and sunburns.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Measure gravity with a pendulum. Materials: about 1 meter of string, a small heavy weight (a large metal nut or a few washers), tape, a meter stick, and a stopwatch or phone timer. Steps: 1) Tape the string to the edge of a table or doorframe so the weight hangs freely. 2) Measure the length L in meters from the pivot point to the center of the weight. 3) Pull the weight to the side by a small angle (less than about 15 degrees) and let go. Time 10 complete back-and-forth swings. 4) Do 5 trials, record them in a table, and divide each time by 10 to get the period T. 5) Find the mean and range of T. 6) Calculate g = 4 × π² × L ÷ T² (use π ≈ 3.1416). 7) Find your percent error compared with the accepted value, 9.81 m/s². 8) Write a conclusion: name one source of random error and one possible source of systematic error, and explain how you would reduce each. Extension: shorten the string to 0.5 m and test whether the period changes as the formula predicts.",
        rubric: [
          "Data table with 5 trials, the period for each, and the mean and range",
          "Correct calculation of g with units (m/s²)",
          "Percent error calculated correctly against 9.81 m/s²",
          "Conclusion names a random error and a systematic error and how to reduce each",
        ],
      },
    },

    // 2. Newton's laws and momentum
    {
      id: "science-hs.newton",
      title: "Newton's Laws and Momentum",
      minutes: 35,
      stage: "logic",
      read: [
        "In 1687, Isaac Newton published the Principia, a book that explained motion on Earth and in the heavens with the same few laws. More than three centuries later, engineers still use those laws to design bridges, cars and the paths of spacecraft.",
        "Newton's first law says that an object at rest stays at rest, and an object in motion keeps moving in a straight line at constant speed, unless a net force acts on it. This resistance to changes in motion is called inertia, and an object's mass measures how much inertia it has. Mass is not the same as weight. Weight is the force of gravity on a mass, W = mg, where g is about 9.8 meters per second squared on Earth.",
        "Newton's second law tells how much the motion changes: the acceleration of an object equals the net force on it divided by its mass, usually written F = ma. Force is measured in newtons, and one newton gives a 1 kilogram mass an acceleration of 1 meter per second squared. Always use the net force, the total after forces in opposite directions are subtracted.",
        "Newton's third law says that forces come in pairs. When object A pushes on object B, B pushes back on A with a force equal in size and opposite in direction. The two forces act on different objects, so they do not cancel. This is how rockets fly: the engine pushes exhaust gas backward, and the gas pushes the rocket forward.",
        "From these laws comes the idea of momentum, mass times velocity, written p = mv. In a closed system with no outside net force, total momentum is conserved. In a collision, the momentum one object loses, the other gains. If a 2 kilogram cart at 3 meters per second hits a resting 1 kilogram cart and they stick together, the total momentum of 6 kg·m/s is now shared by 3 kilograms, so the pair moves at 2 meters per second.",
      ].join("\n\n"),
      keyIdeas: [
        "First law: without a net force, velocity does not change (inertia).",
        "Second law: F = ma, using the net force; weight is W = mg.",
        "Third law: forces come in equal, opposite pairs acting on different objects.",
        "Momentum p = mv is conserved in collisions when no outside net force acts.",
      ],
      hook: {
        text: "In 1665, a plague closed the University of Cambridge, and a young student named Isaac Newton went home to his family's farm at Woolsthorpe. There, away from his teachers, he worked on mathematics, light and motion. In 1687 he published the Principia, with three laws of motion so precise that engineers still use them to send spacecraft across the solar system. Today you will use those same laws, with real numbers.",
      },
      teach: [
        {
          title: "Inertia, Net Force and Weight",
          teach:
            "Newton's first law says an object stays at rest, or keeps moving in a straight line at constant speed, unless a net force acts on it. This resistance to changes in motion is inertia, and mass measures how much inertia an object has. Notice the word net. A 30 newton push to the right and a 30 newton push to the left give a net force of zero, so the motion does not change. A car cruising at a steady 100 kilometers per hour on a straight road also has zero net force; the engine's push exactly balances friction and air resistance. Do not confuse mass with weight. Mass, in kilograms, is the amount of matter. Weight is the gravitational force on that mass: W = mg, where g is about 9.8 meters per second squared on Earth. A 50 kilogram student weighs about 490 newtons.",
          visual: {
            type: "flip",
            cards: [
              { front: "Inertia", back: "An object's resistance to any change in its motion. More mass means more inertia." },
              { front: "Net force", back: "The total of all forces on an object, with opposite directions subtracted." },
              { front: "Mass (kg)", back: "The amount of matter in an object. It is the same on Earth and on the Moon." },
              { front: "Weight (N)", back: "The force of gravity on a mass: W = mg. It changes from planet to planet." },
            ],
          },
          probe: {
            type: "number",
            prompt: "An astronaut has a mass of 80 kg. On the Moon, g = 1.62 m/s². What is the astronaut's weight on the Moon, in newtons?",
            answer: 129.6,
            tolerance: 0.5,
            unit: "N",
            hint: "Weight is mass times the gravitational acceleration where you are: W = mg.",
            mistakes: [
              { match: "80", coach: "80 kg is the astronaut's mass, which does not change. Weight is a force: multiply the mass by the Moon's g." },
              { match: "784", coach: "784 N is the weight on Earth, using g = 9.8. On the Moon, use g = 1.62 m/s²." },
              { match: "49.38", coach: "You divided. Weight is mass TIMES gravitational acceleration: W = mg." },
            ],
            seconds: 45,
          },
          think: {
            q: "A hockey puck slides across smooth ice at a constant velocity. What is the net force on it?",
            choices: ["Zero", "A force in the direction it is moving", "A force opposite to its motion", "Equal to its weight"],
            answer: 0,
            why: "Constant velocity means no acceleration, and by the first law that means the net force is zero.",
            hints: [
              "",
              "A moving object does not need a force to keep moving. A net force would make it speed up.",
              "A net backward force would slow the puck down, but its velocity is constant.",
              "Its weight is balanced by the ice pushing up, so weight is not the net force.",
            ],
          },
          approaches: {
            analogy:
              "Inertia is like a shopping cart full of groceries. It is hard to get moving and hard to stop, and it keeps rolling in a straight line until you push it differently. An empty cart has less mass, so less inertia: it starts and stops easily.",
            example:
              "A 1,000 kg car moves at a steady speed. The engine pushes forward with 2,000 N, while friction and air resistance push back with 2,000 N. Net force = 2,000 minus 2,000 = 0 N, so the speed stays constant. If the driver presses the gas and the engine pushes 2,500 N, the net force becomes 500 N forward and the car speeds up.",
            simpler: {
              q: "Which unit is used to measure weight?",
              choices: ["Kilograms", "Newtons", "Meters"],
              answer: 1,
              why: "Weight is a force, and forces are measured in newtons.",
              hints: [
                "Kilograms measure mass, the amount of matter. Weight is a force.",
                "",
                "Meters measure length or distance, not force.",
              ],
            },
          },
        },
        {
          title: "The Second Law: F = ma",
          teach:
            "Newton's second law tells how much the motion changes: the acceleration of an object equals the net force on it divided by its mass. Usually it is written F = ma. Acceleration is the rate of change of velocity, measured in meters per second squared. One newton is the force that gives a 1 kilogram mass an acceleration of 1 meter per second squared, so 1 N = 1 kg·m/s². The law has two halves worth noticing. Double the net force on the same mass and the acceleration doubles. Double the mass with the same force and the acceleration is cut in half. Always use the net force. Suppose you push a 60 kilogram crate with 500 newtons while friction pushes back with 200 newtons. The net force is 300 newtons, so the acceleration is 300 divided by 60, or 5 meters per second squared.",
          visual: {
            type: "compare",
            left: {
              title: "Same 100 N force, 10 kg cart",
              points: ["a = F ÷ m", "a = 100 ÷ 10", "a = 10 m/s²", "Speeds up quickly"],
            },
            right: {
              title: "Same 100 N force, 50 kg cart",
              points: ["a = F ÷ m", "a = 100 ÷ 50", "a = 2 m/s²", "Speeds up slowly"],
            },
          },
          probe: {
            type: "number",
            prompt: "A 1,200 kg car's engine pushes it forward with 4,200 N, while friction and air resistance push back with a total of 600 N. What is the car's acceleration?",
            answer: 3,
            tolerance: 0.01,
            unit: "m/s²",
            hint: "First find the net force by subtracting the backward forces. Then divide by the mass.",
            mistakes: [
              { match: "3.5", coach: "You used the engine force alone. Subtract the 600 N of friction and air resistance first to get the net force." },
              { match: "4", coach: "You added the forces. Friction pushes backward, so subtract it: 4,200 minus 600." },
              { match: "3600", coach: "3,600 N is the net force. Now divide by the mass, 1,200 kg, to get the acceleration." },
            ],
            seconds: 60,
          },
          think: {
            q: "A 2 kg cart is pulled with a net force of 10 N. What is its acceleration?",
            choices: ["20 m/s²", "5 m/s²", "0.2 m/s²", "12 m/s²"],
            answer: 1,
            why: "a = F ÷ m = 10 ÷ 2 = 5 m/s².",
            hints: [
              "You multiplied. Acceleration is force DIVIDED by mass.",
              "",
              "You divided mass by force. It is force divided by mass: 10 ÷ 2.",
              "Adding force and mass does not give a meaningful quantity. Use a = F ÷ m.",
            ],
          },
          approaches: {
            analogy:
              "Kicking a soccer ball and kicking a bowling ball with the same force gives very different results. The soccer ball rockets away; the bowling ball barely moves. Same force, more mass, less acceleration. Kick the soccer ball twice as hard and it speeds up twice as fast.",
            example:
              "A 0.5 kg model rocket's engine pushes up with 15 N. Gravity pulls down with mg = 0.5 × 9.8 = 4.9 N. Net force = 15 minus 4.9 = 10.1 N upward. Acceleration = 10.1 ÷ 0.5 = 20.2 m/s² upward.",
            simpler: {
              q: "If you double the net force on the same object, its acceleration...",
              choices: ["Halves", "Doubles", "Stays the same"],
              answer: 1,
              why: "Acceleration is proportional to net force, so twice the force gives twice the acceleration.",
              hints: [
                "Halving happens when you double the MASS, not the force.",
                "",
                "A bigger net force always changes the motion more. Look at a = F ÷ m.",
              ],
            },
          },
        },
        {
          title: "Action and Reaction",
          teach:
            "Newton's third law says that when object A exerts a force on object B, B exerts a force on A that is equal in size and opposite in direction. These forces always come in pairs, and the two forces in a pair act on different objects. That is why they never cancel each other out. When you jump, your feet push down on the ground and the ground pushes up on you; the upward force on you is what launches you. A rocket in space has nothing to push against, yet it accelerates: the engine pushes hot exhaust gas backward, and the gas pushes the rocket forward. If the forces are equal, why does the Earth not visibly move when you jump? Use the second law. The same force acting on Earth's enormous mass produces an acceleration far too small to notice, while your small mass accelerates easily.",
          visual: {
            type: "hotspots",
            title: "Forces on a launching rocket",
            center: "🚀",
            spots: [
              { label: "Engine on exhaust", icon: "🔥", detail: "The engine pushes hot exhaust gas downward at high speed." },
              { label: "Exhaust on rocket", icon: "⬆️", detail: "The gas pushes the rocket upward with an equal force. This is thrust." },
              { label: "Weight", icon: "⬇️", detail: "Gravity pulls the rocket down. Thrust must be greater than weight for liftoff." },
              { label: "Air resistance", icon: "💨", detail: "Air pushes against the rocket's motion, growing as it speeds up." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each action force to its reaction force.",
            pairs: [
              { left: "A swimmer's hands push water backward", right: "The water pushes the swimmer forward" },
              { left: "A rocket engine pushes exhaust gas down", right: "The exhaust gas pushes the rocket up" },
              { left: "Earth's gravity pulls on the Moon", right: "The Moon's gravity pulls on Earth" },
              { left: "A hammer pushes on a nail", right: "The nail pushes back on the hammer" },
              { left: "Your feet push backward on the floor", right: "The floor pushes you forward" },
            ],
            hint: "In each pair, the two objects swap places and the direction flips: if A pushes B one way, B pushes A the other way.",
            mistakes: [
              { match: "Swimmer matched with the floor", coach: "The reaction always involves the same two objects. The swimmer pushes water, so the water pushes the swimmer." },
            ],
            seconds: 45,
          },
          think: {
            q: "A bat hits a baseball with a force of 2,000 N. What force does the ball exert on the bat?",
            choices: ["0 N, because the ball is small", "Less than 2,000 N", "2,000 N in the opposite direction", "More than 2,000 N"],
            answer: 2,
            why: "By the third law, the ball pushes back on the bat with an equal force in the opposite direction.",
            hints: [
              "Even a small object pushes back. You can feel the bat jolt when it hits the ball.",
              "The forces in an action-reaction pair are always equal in size, whatever the masses.",
              "",
              "The forces are equal. The ball flies off because its small mass accelerates a lot from 2,000 N.",
            ],
          },
          approaches: {
            analogy:
              "Push off a wall while wearing roller skates. You push the wall, and the wall pushes you, so you roll backward. The wall does not move because it is attached to a huge building. Same force, very different masses.",
            example:
              "A 50 kg skater and a 100 kg skater stand on ice and push each other with 200 N. The lighter skater accelerates at 200 ÷ 50 = 4 m/s². The heavier skater accelerates at 200 ÷ 100 = 2 m/s² the other way. Equal forces, unequal accelerations.",
            simpler: {
              q: "The two forces in an action-reaction pair act on...",
              choices: ["The same object", "Different objects", "Nothing at all"],
              answer: 1,
              why: "Each force acts on a different object, which is why the pair never cancels out.",
              hints: [
                "If they acted on the same object they would cancel, and nothing could ever accelerate.",
                "",
                "Every force is exerted by one object on another object.",
              ],
            },
          },
        },
        {
          title: "Momentum and Collisions",
          teach:
            "Momentum is mass in motion: p = mv, measured in kilogram meters per second. A 1,500 kilogram car at 20 meters per second has a momentum of 30,000 kg·m/s, while a 0.15 kilogram baseball at 40 meters per second has only 6 kg·m/s. Momentum has a direction, so motion to the left can be written as negative. The third law leads to one of the most powerful rules in physics: in a closed system, with no outside net force, total momentum is conserved. During a collision, the two objects push on each other with equal and opposite forces for the same amount of time, so whatever momentum one gains, the other loses. Example: a 2 kilogram cart moving at 3 meters per second hits a resting 1 kilogram cart, and they lock together. Total momentum before is 6 kg·m/s. Afterward, 3 kilograms share it, so they move at 2 meters per second.",
          visual: {
            type: "compare",
            left: {
              title: "Elastic collision",
              points: ["Objects bounce apart", "Momentum is conserved", "Kinetic energy is also conserved", "Close example: billiard balls"],
            },
            right: {
              title: "Inelastic collision",
              points: ["Objects deform or stick together", "Momentum is still conserved", "Some kinetic energy becomes heat and sound", "Example: train cars coupling"],
            },
          },
          probe: {
            type: "number",
            prompt: "A 0.5 kg ball rolling at 4 m/s hits a resting 1.5 kg ball, and they stick together. How fast do they move afterward?",
            answer: 1,
            tolerance: 0.01,
            unit: "m/s",
            hint: "Find the total momentum before (p = mv for each ball). After the collision, that momentum is shared by the total mass.",
            mistakes: [
              { match: "2", coach: "2 kg·m/s is the total momentum. Divide it by the combined mass, 0.5 + 1.5 = 2 kg." },
              { match: "1.33", coach: "You divided by 1.5 kg. After they stick, both balls move together, so use the combined mass of 2 kg." },
              { match: "4", coach: "The balls cannot keep the same speed; the same momentum is now shared by four times as much mass." },
            ],
            seconds: 60,
          },
          think: {
            q: "What is the momentum of a 1,000 kg car moving at 15 m/s?",
            choices: ["1,015 kg·m/s", "66.7 kg·m/s", "7,500 kg·m/s", "15,000 kg·m/s"],
            answer: 3,
            why: "p = mv = 1,000 × 15 = 15,000 kg·m/s.",
            hints: [
              "Adding mass and speed does not give momentum. Multiply them.",
              "You divided mass by speed. Momentum is mass times velocity.",
              "That is half of the answer, as if you used ½mv. Momentum has no ½: p = mv.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Momentum is how hard something is to stop. A slow-rolling bowling ball and a fast tennis ball can both hurt a pin, but a loaded truck at highway speed has so much momentum that it needs hundreds of meters to stop.",
            example:
              "A 60 kg skater at rest catches a 4 kg medicine ball thrown at 8 m/s. Momentum before: 4 × 8 + 60 × 0 = 32 kg·m/s. After, the skater and ball move together with mass 64 kg, so v = 32 ÷ 64 = 0.5 m/s.",
            simpler: {
              q: "Which has more momentum: a 2 kg ball at 3 m/s or a 1 kg ball at 3 m/s?",
              choices: ["The 2 kg ball", "The 1 kg ball", "They are equal"],
              answer: 0,
              why: "At the same speed, more mass means more momentum: 6 kg·m/s versus 3 kg·m/s.",
              hints: [
                "",
                "Check p = mv for each. The speeds match, so compare the masses.",
                "They have the same speed but different masses, so their momentum differs.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each event by the law of motion it best shows.",
        buckets: ["First law (inertia)", "Second law (F = ma)", "Third law (action-reaction)"],
        items: [
          { text: "Passengers lurch forward when a bus brakes suddenly", bucket: 0 },
          { text: "A tablecloth is yanked away quickly and the dishes stay put", bucket: 0 },
          { text: "An empty shopping cart speeds up faster than a full one with the same push", bucket: 1 },
          { text: "Doubling the engine force doubles a go-kart's acceleration", bucket: 1 },
          { text: "A cannon rolls backward when it fires", bucket: 2 },
          { text: "A swimmer pushes off the pool wall and glides away", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain Newton's three laws and the conservation of momentum to a friend, using one real example with numbers.",
        keyPoints: [
          "Without a net force an object keeps its velocity (inertia)",
          "Acceleration equals net force divided by mass (F = ma)",
          "Forces come in equal and opposite pairs on different objects",
          "Momentum is mass times velocity and is conserved in collisions",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A 70 kg sprinter accelerates out of the blocks at 4 m/s². What net force acts on the sprinter?",
          answer: 280,
          tolerance: 0.5,
          unit: "N",
          hint: "Use F = ma.",
          mistakes: [
            { match: "17.5", coach: "You divided. Force is mass TIMES acceleration." },
            { match: "74", coach: "You added mass and acceleration. Multiply them: F = ma." },
            { match: "686", coach: "686 N is the sprinter's weight (70 × 9.8). The question asks for the net force producing 4 m/s²." },
          ],
          seconds: 30,
        },
        {
          type: "number",
          prompt: "A 60 kg skater standing on ice throws a 3 kg ball forward at 10 m/s. Momentum is conserved. How fast does the skater slide backward?",
          answer: 0.5,
          tolerance: 0.01,
          unit: "m/s",
          hint: "Total momentum starts at zero. The ball's forward momentum must equal the skater's backward momentum.",
          mistakes: [
            { match: "30", coach: "30 kg·m/s is the ball's momentum. The skater has the same momentum backward, so divide by the skater's 60 kg." },
            { match: "10", coach: "The skater is 20 times heavier than the ball, so the skater moves much more slowly." },
            { match: "2", coach: "Check the division: 30 ÷ 60. The skater's speed is less than 1 m/s." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "An object keeps the same velocity unless a {0} force acts on it. Acceleration equals net force divided by {1}. Action and reaction forces are equal and opposite and act on {2} objects.",
          blanks: [
            { answers: ["net", "unbalanced"] },
            { answers: ["mass"] },
            { answers: ["different", "two different", "separate"] },
          ],
          bank: ["net", "mass", "different", "the same", "weight", "speed"],
          hint: "Think of the first, second and third laws in order.",
          mistakes: [
            { match: "weight", coach: "Acceleration depends on mass, the amount of matter, not weight. a = F ÷ m." },
            { match: "the same", coach: "If the pair acted on the same object they would cancel and nothing could move. They act on different objects." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build Newton's second law, solved for acceleration.",
          tiles: ["a", "=", "F_net", "÷", "m"],
          distractors: ["×", "v"],
          hint: "Acceleration is the net force shared out over the mass.",
          mistakes: [
            { match: "Used ×", coach: "Multiplying force by mass does not give acceleration. More mass means LESS acceleration, so divide." },
            { match: "Used v", coach: "Velocity is not part of F = ma. The law connects net force, mass and acceleration." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Why do passengers lurch forward when a car brakes suddenly?",
          choices: [
            "A force pushes them forward",
            "Their bodies tend to keep moving forward because of inertia",
            "The seat pushes them forward",
            "Gravity changes direction",
          ],
          answer: 1,
          why: "The car slows, but the passengers' bodies keep moving forward until the seat belt applies a force: the first law.",
        },
        {
          q: "What is the weight of a 10 kg dog on Earth?",
          choices: ["10 N", "98 N", "0.98 N", "980 N"],
          answer: 1,
          why: "W = mg = 10 × 9.8 = 98 N.",
        },
        {
          q: "A net force of 30 N acts on a 6 kg box. What is its acceleration?",
          choices: ["180 m/s²", "36 m/s²", "0.2 m/s²", "5 m/s²"],
          answer: 3,
          why: "a = F ÷ m = 30 ÷ 6 = 5 m/s².",
        },
        {
          q: "If action and reaction forces are equal and opposite, why don't they cancel?",
          choices: [
            "They act on different objects",
            "One is always bigger",
            "They happen at different times",
            "They actually do cancel, so nothing moves",
          ],
          answer: 0,
          why: "Forces only cancel when they act on the same object. Each force in the pair acts on a different object.",
        },
        {
          q: "Two carts collide and stick together with no outside forces. What happens to their total momentum?",
          choices: ["It doubles", "It drops to zero", "It stays the same", "It turns into weight"],
          answer: 2,
          why: "In a closed system, total momentum is conserved in every collision.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Test conservation of momentum with marbles. Materials: two marbles of different sizes, a kitchen scale, a grooved ruler or two rulers taped side by side to make a track, books to raise one end, a meter stick, and a phone that records slow-motion video. Steps: 1) Weigh each marble in grams and convert to kilograms. 2) Build a short ramp onto a flat track, and mark a 30 cm timing zone on the flat part before the collision and another after it. 3) Place the target marble at rest on the flat track. 4) Release the other marble from the ramp and record the collision on slow-motion video. 5) Use the video to time each marble across its 30 cm zone, and calculate speed = distance ÷ time. 6) Calculate total momentum (p = mv) before and after. 7) Repeat for 3 trials and record a table. 8) Write a conclusion: how close were the momenta before and after, what percent difference did you find, and what outside forces (like friction) might explain the difference?",
        rubric: [
          "Masses in kilograms and speeds in m/s calculated correctly",
          "Momentum before and after the collision calculated for 3 trials",
          "Percent difference between before and after reported",
          "Conclusion explains friction or other outside forces as sources of difference",
        ],
      },
    },

    // 3. Work, energy and power
    {
      id: "science-hs.energy",
      title: "Work, Energy and Power",
      minutes: 35,
      stage: "logic",
      read: [
        "In the 1840s, the English scientist James Prescott Joule built an ingenious machine. Falling weights turned a paddle wheel inside an insulated container of water. The stirring warmed the water by only a fraction of a degree, but Joule's careful thermometer readings showed that a fixed amount of mechanical work always produced the same amount of heat. Energy was not lost; it changed form. Today the unit of energy, the joule, is named after him.",
        "In physics, work is done when a force moves an object through a distance in the direction of the force: W = Fd. One joule is one newton acting over one meter. Holding a heavy box still does no work on the box, because it does not move.",
        "Energy is the ability to do work. Kinetic energy is the energy of motion, KE = ½mv². Because speed is squared, doubling the speed makes the kinetic energy four times as large. Gravitational potential energy is stored energy of position, PE = mgh. Lifting a 2 kilogram book 1.5 meters stores 2 × 9.8 × 1.5 = 29.4 joules.",
        "The law of conservation of energy says energy cannot be created or destroyed, only changed from one form to another. A roller coaster at the top of a hill has mostly potential energy. As it falls, that energy becomes kinetic. Ignoring friction, mgh = ½mv², so the speed at the bottom is v = √(2gh), whatever the car's mass. In real life, friction turns some of the energy into thermal energy, exactly as in Joule's paddle wheel.",
        "Power is the rate of doing work: P = W ÷ t, measured in watts, where one watt is one joule per second. The unit honors James Watt, the Scottish engineer who improved the steam engine. A student who climbs stairs quickly does the same work as one who climbs slowly but uses more power. No machine is perfect; efficiency is the useful energy out divided by the energy in, times 100 percent.",
      ].join("\n\n"),
      keyIdeas: [
        "Work is force times distance in the direction of the force (W = Fd), in joules.",
        "Kinetic energy is ½mv²; gravitational potential energy is mgh.",
        "Energy is conserved: it changes form, but the total stays the same.",
        "Power is work per second (P = W ÷ t), in watts.",
      ],
      hook: {
        text: "In the 1840s, a scientist from a brewing family in England, James Prescott Joule, built a strange machine. Falling weights turned a paddle wheel inside a sealed container of water. All that stirring warmed the water by less than one degree, but Joule measured it with remarkable care. He showed that a set amount of work always makes the same amount of heat. Energy never disappears; it only changes form. That is why the unit of energy is called the joule.",
      },
      teach: [
        {
          title: "Work: Force Times Distance",
          teach:
            "In physics, work has a precise meaning: work is done when a force moves an object through a distance in the direction of the force. W = Fd, and the unit is the joule, where 1 joule equals 1 newton times 1 meter. Push a box with 50 newtons for 12 meters and you do 600 joules of work. Lifting counts too. To lift a 10 kilogram suitcase steadily, you push up with a force equal to its weight, about 98 newtons, so raising it 1.5 meters takes about 147 joules. But holding the suitcase still does no work on it, no matter how tired your arms get, because it does not move. Carrying it across a room at a steady height does no work on it either, since your upward force is perpendicular to the motion. Simple machines such as levers and ramps cannot reduce the work. They let you use a smaller force over a longer distance.",
          visual: { type: "lever" },
          probe: {
            type: "number",
            prompt: "A worker pushes a crate across a floor with a steady 250 N force for 8 m. How much work does the worker do?",
            answer: 2000,
            tolerance: 0.5,
            unit: "J",
            hint: "Work equals force times distance: W = Fd.",
            mistakes: [
              { match: "31.25", coach: "You divided. Work is force TIMES distance." },
              { match: "258", coach: "You added force and distance. Multiply them: 250 N × 8 m." },
              { match: "200", coach: "Check your multiplication: 250 × 8." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which of these does NO work on the object, in the physics sense?",
            choices: ["Lifting a box onto a shelf", "Pushing a cart across a store", "Holding a heavy box perfectly still for a minute", "Pulling a sled up a hill"],
            answer: 2,
            why: "Work needs motion in the direction of the force. A box held still does not move, so no work is done on it.",
            hints: [
              "Lifting moves the box upward, the same direction as your force, so work is done.",
              "Your push moves the cart in the direction you push, so work is done.",
              "",
              "The sled moves in the direction you pull it, so work is done.",
            ],
          },
          approaches: {
            analogy:
              "Think of work as a receipt that only prints when something actually moves. You can strain against a wall all afternoon, but if the wall stays put, the receipt reads zero joules.",
            example:
              "A ramp 4 m long rises 1 m. Lifting a 200 N box straight up 1 m takes 200 × 1 = 200 J. Pushing it up the ramp (ignoring friction) takes only 50 N, but over 4 m: 50 × 4 = 200 J. Same work, smaller force, longer distance.",
            simpler: {
              q: "Work equals force times...",
              choices: ["Time", "Distance", "Mass"],
              answer: 1,
              why: "W = Fd: force times the distance moved in the direction of the force.",
              hints: [
                "Force divided by time is not work. Think about how far the object moves.",
                "",
                "Mass is part of weight, but work is about how far a force moves something.",
              ],
            },
          },
        },
        {
          title: "Kinetic and Potential Energy",
          teach:
            "Energy is the ability to do work, and it is measured in joules as well. Kinetic energy is the energy of motion: KE = ½mv². Because speed is squared, it matters enormously. A car at 20 meters per second has four times the kinetic energy it has at 10 meters per second, which is why stopping distances grow so quickly with speed. Gravitational potential energy is stored energy of position: PE = mgh, where h is the height above a chosen reference level. Lift a 2 kilogram book 1.5 meters onto a shelf and you store 2 × 9.8 × 1.5, or 29.4 joules. That is exactly the work you did lifting it. Other forms of stored energy include the elastic energy of a stretched spring or bow, the chemical energy in food and fuel, and the nuclear energy inside atoms.",
          visual: {
            type: "flip",
            cards: [
              { front: "Kinetic energy", back: "Energy of motion: KE = ½mv². Double the speed, four times the energy." },
              { front: "Gravitational potential energy", back: "Energy of height: PE = mgh. Higher and heavier means more stored energy." },
              { front: "Elastic energy", back: "Energy stored in a stretched or squeezed object, like a bow or a spring." },
              { front: "Chemical energy", back: "Energy stored in the bonds of molecules in food, fuel and batteries." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A 0.2 kg ball moves at 10 m/s. What is its kinetic energy?",
            answer: 10,
            tolerance: 0.01,
            unit: "J",
            hint: "KE = ½ × m × v². Square the speed first.",
            mistakes: [
              { match: "1", coach: "You forgot to square the speed. v² = 10 × 10 = 100." },
              { match: "20", coach: "You forgot the ½. KE = ½ × 0.2 × 100." },
              { match: "2", coach: "That is mass times speed, which is momentum. Kinetic energy uses ½mv²." },
            ],
            seconds: 45,
          },
          think: {
            q: "If a bicycle's speed triples, its kinetic energy becomes...",
            choices: ["3 times as large", "6 times as large", "9 times as large", "Unchanged"],
            answer: 2,
            why: "KE depends on v², so tripling v multiplies KE by 3² = 9.",
            hints: [
              "Speed is squared in KE = ½mv², so the effect is bigger than 3 times.",
              "Squaring is not doubling. What is 3 × 3?",
              "",
              "Faster motion always means more kinetic energy.",
            ],
          },
          approaches: {
            analogy:
              "Potential energy is like money in a savings account: stored and ready to use. Kinetic energy is money being spent right now. Lifting something makes a deposit; letting it fall spends it as motion.",
            example:
              "A 1,000 kg car at 10 m/s: KE = ½ × 1,000 × 10² = 50,000 J. At 20 m/s: KE = ½ × 1,000 × 20² = 200,000 J. Twice the speed, four times the energy the brakes must remove.",
            simpler: {
              q: "Which has more gravitational potential energy?",
              choices: ["A 1 kg rock on a 10 m cliff", "The same rock on a 2 m wall", "They are equal"],
              answer: 0,
              why: "PE = mgh, so the same mass at a greater height stores more energy.",
              hints: [
                "",
                "The rock on the wall is lower. PE grows with height.",
                "Height is in the formula PE = mgh, so different heights give different energies.",
              ],
            },
          },
        },
        {
          title: "Conservation of Energy",
          teach:
            "The law of conservation of energy states that energy cannot be created or destroyed; it only changes form or moves from one object to another. Picture a roller coaster car at the top of a 20 meter hill. At the top it has mostly potential energy. As it drops, potential energy becomes kinetic energy. Ignoring friction, all the potential energy lost becomes kinetic energy gained, so mgh = ½mv². The mass cancels from both sides, leaving v = √(2gh). From 20 meters, v = √(2 × 9.8 × 20), about 19.8 meters per second, whether the car is full or empty. On the way up the next hill, the kinetic energy turns back into potential energy. In the real world, friction and air resistance turn some energy into thermal energy and sound. That energy is not destroyed. It is spread out as heat, which is exactly what Joule measured with his paddle wheel.",
          visual: { type: "ramp" },
          probe: {
            type: "number",
            prompt: "A 0.5 kg ball is dropped from a height of 5 m. Ignoring air resistance, how much kinetic energy does it have just before it hits the ground?",
            answer: 24.5,
            tolerance: 0.1,
            unit: "J",
            hint: "All the potential energy at the top becomes kinetic energy at the bottom. Calculate PE = mgh.",
            mistakes: [
              { match: "2.5", coach: "You left out g. PE = m × g × h = 0.5 × 9.8 × 5." },
              { match: "245", coach: "Check the mass: 0.5 kg, not 5 kg. PE = 0.5 × 9.8 × 5." },
              { match: "0", coach: "At the top it has no kinetic energy, but at the bottom all that potential energy has become kinetic." },
            ],
            seconds: 45,
          },
          think: {
            q: "At the lowest point of its swing, a pendulum bob has...",
            choices: ["Maximum potential energy and zero kinetic energy", "Maximum kinetic energy and minimum potential energy", "No energy at all", "Equal kinetic and potential energy at every moment"],
            answer: 1,
            why: "At the bottom it is moving fastest and is at its lowest height, so kinetic energy is highest and potential energy is lowest.",
            hints: [
              "That describes the highest points of the swing, where the bob stops for an instant.",
              "",
              "Energy is conserved. It changes form; it does not vanish at the bottom.",
              "The balance shifts throughout the swing: more PE at the ends, more KE in the middle.",
            ],
          },
          approaches: {
            analogy:
              "Energy is like water poured between cups. Pour from the potential cup into the kinetic cup and back again; the total water stays the same. Friction is a small leak that lets some drip out as heat, but the water still exists on the table.",
            example:
              "A 2 kg ball rolls down a frictionless track from 10 m high. PE at top = 2 × 9.8 × 10 = 196 J. At the bottom, KE = 196 J, so ½ × 2 × v² = 196, v² = 196, v = 14 m/s. Check with v = √(2gh) = √(196) = 14 m/s.",
            simpler: {
              q: "As a ball falls, its potential energy turns mostly into...",
              choices: ["Kinetic energy", "Mass", "Weight"],
              answer: 0,
              why: "Falling objects lose height and gain speed, so potential energy becomes kinetic energy.",
              hints: [
                "",
                "Mass does not change as an object falls.",
                "Weight stays about the same as an object falls; it is a force, not a form of energy.",
              ],
            },
          },
        },
        {
          title: "Power and Efficiency",
          teach:
            "Two students climb the same stairs and do the same work against gravity, yet one is worn out because she sprinted. The difference is power, the rate of doing work: P = W ÷ t, measured in watts, where 1 watt is 1 joule per second. The unit honors James Watt, the Scottish engineer whose improved steam engine helped drive the Industrial Revolution. He even rated engines in horsepower, about 746 watts, so buyers could compare them with horses. A 60 kilogram student who climbs 4 meters of stairs does 60 × 9.8 × 4 = 2,352 joules of work. In 5 seconds, that is about 470 watts. No machine turns all its input energy into useful output. Efficiency is useful energy out divided by energy in, times 100 percent. An LED bulb turns far more of its electricity into light than an old incandescent bulb, which mostly makes heat.",
          visual: { type: "bounce", efficiency: 0.7 },
          probe: {
            type: "number",
            prompt: "A motor lifts a 50 kg load 6 m straight up in 12 s. What power does it deliver? (Use g = 9.8 m/s².)",
            answer: 245,
            tolerance: 1,
            unit: "W",
            hint: "First find the work: W = mgh. Then divide by the time.",
            mistakes: [
              { match: "2940", coach: "2,940 J is the work. Power is work per second, so divide by 12 s." },
              { match: "25", coach: "You left out g. The force needed is the weight, mg = 50 × 9.8 = 490 N." },
              { match: "35280", coach: "You multiplied by the time. Power is work DIVIDED by time." },
            ],
            seconds: 60,
          },
          think: {
            q: "Machine A does 1,000 J of work in 10 s. Machine B does 1,000 J in 20 s. Which is more powerful?",
            choices: ["Machine A, at 100 W", "Machine B, at 50 W", "They are equally powerful", "Machine B, because it works longer"],
            answer: 0,
            why: "P = W ÷ t: A gives 1,000 ÷ 10 = 100 W and B gives 1,000 ÷ 20 = 50 W.",
            hints: [
              "",
              "50 W is less than 100 W. More power means doing the work faster.",
              "They do the same work, but in different times, so their power differs.",
              "Working longer to do the same job means LESS power, not more.",
            ],
          },
          approaches: {
            analogy:
              "Work is how much water you move from a lake; power is how fast you move it. A bucket and a fire hose can both empty a pool, but the fire hose does it much faster. It has more power.",
            example:
              "A 75 kg hiker climbs a 300 m hill in 20 minutes (1,200 s). Work = 75 × 9.8 × 300 = 220,500 J. Power = 220,500 ÷ 1,200 ≈ 184 W, about a quarter of one horsepower.",
            simpler: {
              q: "Power measures how ___ work is done.",
              choices: ["Fast", "Far", "Heavily"],
              answer: 0,
              why: "Power is the rate of doing work: joules per second.",
              hints: [
                "",
                "Distance is part of work. Power adds the question of time.",
                "Heaviness relates to force, but power is about time.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence where work is done on the object, in the physics sense.",
        sentences: [
          "A crane lifts a steel beam 30 meters.",
          "A guard holds a heavy flag perfectly still for an hour.",
          "A student pushes hard against a brick wall that does not move.",
          "A horse pulls a cart 200 meters down a road.",
          "A weightlifter raises a barbell from the floor to overhead.",
          "A waiter carries a tray across a level room at a constant height.",
        ],
        correct: [0, 3, 4],
      },
      explain: {
        prompt: "Explain how energy changes form on a roller coaster, using the words work, kinetic energy, potential energy and power, and say what happens to the energy lost to friction.",
        keyPoints: [
          "Work is force times distance and is measured in joules",
          "Potential energy (mgh) turns into kinetic energy (½mv²) on the way down",
          "Total energy is conserved; friction turns some into heat",
          "Power is how fast work is done, in watts",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "A lever cannot reduce the work, but it can reduce the force. Move the fulcrum so a push of no more than 15 kg lifts a 60 kg load.",
          goal: { sim: "lever", load: 60, maxPush: 15 },
          hint: "Move the fulcrum closer to the load. Your side of the lever gets longer, so you push less but move farther.",
          seconds: 60,
        },
        {
          type: "number",
          prompt: "A 1,000 kg roller coaster car is pulled up to the top of a 45 m hill. How much gravitational potential energy does it gain?",
          answer: 441000,
          tolerance: 100,
          unit: "J",
          hint: "PE = mgh, with g = 9.8 m/s².",
          mistakes: [
            { match: "45000", coach: "You left out g. PE = 1,000 × 9.8 × 45." },
            { match: "220500", coach: "There is no ½ in potential energy. That belongs in kinetic energy." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "Ignoring friction, how fast is that car moving at the bottom of the 45 m drop? Use v = √(2gh) and round to one decimal place.",
          answer: 29.7,
          tolerance: 0.1,
          unit: "m/s",
          hint: "Multiply 2 × 9.8 × 45 first, then take the square root.",
          mistakes: [
            { match: "882", coach: "882 is 2gh. Take its square root to find the speed." },
            { match: "21", coach: "You may have used √(gh). The formula is √(2gh)." },
          ],
          seconds: 60,
        },
        {
          type: "match",
          prompt: "Match each quantity to its unit.",
          pairs: [
            { left: "Work and energy", right: "Joule (J)" },
            { left: "Power", right: "Watt (W)" },
            { left: "Force", right: "Newton (N)" },
            { left: "Mass", right: "Kilogram (kg)" },
            { left: "Speed", right: "Meters per second (m/s)" },
          ],
          hint: "Joule and Watt were scientists honored for their work on energy; Newton was honored for forces.",
          mistakes: [
            { match: "Power matched with joule", coach: "A joule is an amount of energy. Power is energy per second, measured in watts." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Energy cannot be {0} or destroyed. When a sliding box slows down because of friction, its kinetic energy becomes {1} energy.",
          blanks: [
            { answers: ["created", "made"] },
            { answers: ["thermal", "heat"] },
          ],
          bank: ["created", "thermal", "nuclear", "moved", "potential"],
          hint: "Remember Joule's paddle wheel: stirring warmed the water.",
          mistakes: [
            { match: "moved", coach: "Energy can be moved from one object to another. The law says it cannot be created or destroyed." },
            { match: "potential", coach: "The box does not rise, so it does not gain potential energy. Friction makes surfaces warm." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "How much work is done lifting a 20 N bag 2 m straight up?",
          choices: ["10 J", "22 J", "40 J", "0 J"],
          answer: 2,
          why: "W = Fd = 20 N × 2 m = 40 J.",
        },
        {
          q: "What did Joule's paddle-wheel experiment show?",
          choices: [
            "Water cannot be heated by stirring",
            "A fixed amount of work always produces the same amount of heat",
            "Falling weights gain mass",
            "Energy is destroyed by friction",
          ],
          answer: 1,
          why: "Joule showed that mechanical work and heat are two forms of the same thing, energy, in a fixed exchange rate.",
        },
        {
          q: "A car's speed doubles. What happens to its kinetic energy?",
          choices: ["It doubles", "It stays the same", "It halves", "It becomes four times as large"],
          answer: 3,
          why: "KE = ½mv², so doubling v multiplies KE by 2² = 4.",
        },
        {
          q: "Ignoring friction, a heavy and a light roller coaster car start from the same height. At the bottom...",
          choices: [
            "They have the same speed",
            "The heavy car is much faster",
            "The light car is much faster",
            "Neither moves",
          ],
          answer: 0,
          why: "v = √(2gh): mass cancels, so the speed depends only on height.",
        },
        {
          q: "A 100 W light bulb uses how much energy each second?",
          choices: ["1 J", "10 J", "100 J", "1,000 J"],
          answer: 2,
          why: "One watt is one joule per second, so 100 W means 100 J every second.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Measure your own power on a staircase. Ask an adult to help and supervise. Materials: a bathroom scale, a tape measure, a stopwatch or phone timer, and a staircase with a handrail. Steps: 1) Find your mass in kilograms. 2) Measure the height of one step and multiply by the number of steps to get the total vertical height h in meters (measure straight up, not along the slope). 3) Have a partner time you climbing the stairs at a normal walking pace. Then time a brisk climb. Always hold the rail, wear shoes, and never run if it isn't safe. 4) Do 3 trials of each and record a table. 5) Calculate the work, W = mgh, and the power, P = W ÷ t, for each trial, then find the mean power for walking and for brisk climbing. 6) Compare your best power with one horsepower (746 W). 7) Write a conclusion: why is the work the same for both speeds while the power is different? Where did your body's chemical energy go besides lifting you?",
        rubric: [
          "Mass and vertical height measured and recorded in kilograms and meters",
          "Work and power calculated correctly with units for each trial",
          "Mean power compared for walking and brisk climbing, and with 746 W",
          "Conclusion explains why work stays the same while power changes, and mentions heat",
        ],
      },
    },

    // 4. Atoms, the periodic table and bonds
    {
      id: "science-hs.atoms",
      title: "Atoms, the Periodic Table and Chemical Bonds",
      minutes: 35,
      stage: "grammar",
      read: [
        "In 1869, the Russian chemist Dmitri Mendeleev arranged the elements known in his day into a table, ordered mostly by atomic mass and grouped by similar behavior. He boldly left gaps and predicted that undiscovered elements would fill them. When gallium was found in 1875 and germanium in 1886, their properties closely matched his predictions, and the periodic table became one of the great tools of science.",
        "Every atom has a tiny, dense nucleus of protons, which are positive, and neutrons, which have no charge. Negative electrons occupy the much larger space around the nucleus. The number of protons, the atomic number, defines the element. The mass number is protons plus neutrons. Atoms of the same element with different numbers of neutrons are isotopes, such as carbon-12 and carbon-14.",
        "The modern periodic table orders elements by atomic number. Rows are called periods, and columns are called groups. Elements in a group behave alike because they have the same number of valence electrons, the outermost electrons that take part in bonding. Alkali metals in group 1 have one valence electron and react easily. Noble gases in group 18 have full outer shells and rarely react.",
        "Atoms bond to reach a more stable arrangement of electrons, often eight in the outer shell. In an ionic bond, usually between a metal and a nonmetal, electrons are transferred. Sodium gives one electron to chlorine, forming Na⁺ and Cl⁻ ions that attract each other in a crystal of table salt. In a covalent bond, usually between nonmetals, atoms share pairs of electrons and form molecules, such as water, H₂O.",
        "Chemists count atoms by mass. The molar mass of a substance is the mass of one mole of it in grams, found by adding the atomic masses of its atoms. Water's molar mass is 2 × 1 + 16 = 18 grams per mole.",
      ].join("\n\n"),
      keyIdeas: [
        "Protons define the element; protons plus neutrons give the mass number; isotopes differ in neutrons.",
        "Elements in the same group share the same number of valence electrons and behave alike.",
        "Ionic bonds transfer electrons; covalent bonds share them.",
        "Molar mass is found by adding the atomic masses in a formula.",
      ],
      hook: {
        text: "In 1869, a Russian chemistry professor named Dmitri Mendeleev arranged the known elements into a table and did something daring: he left empty spaces. He said elements no one had found yet belonged there, and he even predicted their properties. Six years later, a French chemist discovered gallium, a soft metal that melts on a warm day. Its properties matched one of Mendeleev's predictions closely. A pattern on paper had predicted a real substance.",
      },
      teach: [
        {
          title: "Inside the Atom",
          teach:
            "Every atom has a tiny, dense nucleus surrounded by electrons. The nucleus holds protons, which carry a positive charge, and neutrons, which have no charge. Electrons carry a negative charge and occupy a region of space far larger than the nucleus. If an atom were the size of a football stadium, its nucleus would be roughly the size of a pea at the center. The number of protons, the atomic number, defines the element: every carbon atom has 6 protons, and an atom with 7 is nitrogen. In a neutral atom, the number of electrons equals the number of protons. The mass number is protons plus neutrons. Atoms of the same element with different numbers of neutrons are isotopes. Carbon-12 has 6 neutrons, while carbon-14, the isotope used in radiocarbon dating, has 8. Protons and neutrons each have a mass of about 1 atomic mass unit; an electron is nearly 2,000 times lighter.",
          visual: {
            type: "hotspots",
            title: "Parts of an atom",
            center: "⚛️",
            spots: [
              { label: "Nucleus", icon: "🔴", detail: "The tiny, dense center of the atom, holding almost all of its mass." },
              { label: "Proton", icon: "➕", detail: "Positive charge, about 1 atomic mass unit. The number of protons is the atomic number." },
              { label: "Neutron", icon: "⚪", detail: "No charge, about 1 atomic mass unit. Different neutron counts make different isotopes." },
              { label: "Electron", icon: "➖", detail: "Negative charge, nearly 2,000 times lighter than a proton. Outer electrons form bonds." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Oxygen has atomic number 8. How many neutrons are in an atom of oxygen-18?",
            answer: 10,
            tolerance: 0,
            unit: "neutrons",
            hint: "Mass number = protons + neutrons. Subtract the protons from the mass number.",
            mistakes: [
              { match: "18", coach: "18 is the mass number, protons plus neutrons together. Subtract the 8 protons." },
              { match: "8", coach: "8 is the number of protons. Neutrons = mass number minus protons." },
              { match: "26", coach: "You added. Neutrons = 18 minus 8." },
            ],
            seconds: 30,
          },
          think: {
            q: "What determines which element an atom is?",
            choices: ["The number of neutrons", "The number of protons", "The mass number", "The number of isotopes"],
            answer: 1,
            why: "The atomic number, the count of protons, defines the element. Every atom with 6 protons is carbon.",
            hints: [
              "Neutron numbers can vary within one element; those versions are isotopes.",
              "",
              "The mass number changes between isotopes of the same element, so it cannot define the element.",
              "Isotopes are versions of an element, not what defines it.",
            ],
          },
          approaches: {
            analogy:
              "The number of protons is like a jersey number in a league where every number belongs to exactly one team. Number 6 is always carbon, number 8 always oxygen. Neutrons are like extra gear: a player can carry more or less and still be on the same team.",
            example:
              "Chlorine-37 has atomic number 17. Protons: 17. Neutrons: 37 minus 17 = 20. In a neutral atom, electrons: 17. Chlorine-35 also has 17 protons but only 18 neutrons, so the two are isotopes of chlorine.",
            simpler: {
              q: "Which particle has a negative charge?",
              choices: ["Electron", "Proton", "Neutron"],
              answer: 0,
              why: "Electrons are negative, protons are positive, and neutrons have no charge.",
              hints: [
                "",
                "Protons are positive. Think 'p' for positive.",
                "Neutrons are neutral: they have no charge at all.",
              ],
            },
          },
        },
        {
          title: "Reading the Periodic Table",
          teach:
            "Mendeleev ordered elements mostly by atomic mass, but in 1913 Henry Moseley showed that the true order is by atomic number. The modern periodic table lists 118 elements. Each horizontal row is a period; moving across a period adds one proton at a time. Each vertical column is a group, and elements in a group behave alike because they have the same number of valence electrons, the outermost electrons that take part in bonding. Group 1, the alkali metals such as sodium and potassium, have one valence electron that they give up easily, so they react violently with water. Group 17, the halogens such as chlorine, have seven and eagerly gain one more. Group 18, the noble gases such as neon and argon, have full outer shells and almost never react. Metals sit on the left and center, nonmetals on the upper right, and metalloids such as silicon along the staircase between them.",
          visual: {
            type: "timeline",
            events: [
              { year: 1803, label: "Dalton's atomic theory", detail: "John Dalton proposes that each element is made of its own kind of atom." },
              { year: 1869, label: "Mendeleev's periodic table", detail: "Dmitri Mendeleev arranges the elements and leaves gaps for undiscovered ones." },
              { year: 1897, label: "Electron discovered", detail: "J. J. Thomson discovers the electron, the first known particle smaller than an atom." },
              { year: 1911, label: "The nucleus", detail: "Ernest Rutherford's experiments show that an atom's mass is packed into a tiny nucleus." },
              { year: 1913, label: "Atomic number", detail: "Henry Moseley shows that elements should be ordered by the charge of the nucleus." },
              { year: 1932, label: "Neutron discovered", detail: "James Chadwick discovers the neutron, completing the basic picture of the atom." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each element to the description that fits its place on the periodic table.",
            pairs: [
              { left: "Sodium (Na)", right: "Group 1: one valence electron, reacts violently with water" },
              { left: "Magnesium (Mg)", right: "Group 2: two valence electrons, a reactive metal" },
              { left: "Chlorine (Cl)", right: "Group 17: seven valence electrons, gains one easily" },
              { left: "Neon (Ne)", right: "Group 18: full outer shell, almost never reacts" },
              { left: "Silicon (Si)", right: "Metalloid on the staircase, used in computer chips" },
            ],
            hint: "Use the group numbers: groups 1 and 2 are on the left, 17 and 18 on the far right, and metalloids along the staircase.",
            mistakes: [
              { match: "Neon matched with group 17", coach: "Neon is a noble gas in group 18 with a full outer shell. Chlorine is the halogen in group 17." },
            ],
            seconds: 50,
          },
          think: {
            q: "Why do elements in the same group behave alike?",
            choices: ["They have the same atomic mass", "They have the same number of valence electrons", "They were discovered in the same year", "They have the same number of neutrons"],
            answer: 1,
            why: "Chemical behavior depends mostly on the outermost electrons, and elements in a group share the same number.",
            hints: [
              "Atomic mass increases as you go down a group, yet the elements still behave alike.",
              "",
              "Discovery dates have nothing to do with chemical behavior.",
              "Neutrons do not take part in bonding; only electrons do.",
            ],
          },
          approaches: {
            analogy:
              "The periodic table is like a calendar. Each row is a week, and each column is a day of the week. All Mondays share something in common, just as all elements in group 1 share one valence electron.",
            example:
              "Potassium sits directly below sodium in group 1. Both have one valence electron, both are soft metals that react violently with water, and both form ions with a +1 charge, such as Na⁺ and K⁺.",
            simpler: {
              q: "A vertical column on the periodic table is called a...",
              choices: ["Period", "Group", "Shell"],
              answer: 1,
              why: "Columns are groups (sometimes called families); rows are periods.",
              hints: [
                "A period is a horizontal row.",
                "",
                "A shell is a region where electrons are found, not a part of the table.",
              ],
            },
          },
        },
        {
          title: "Ionic Bonds",
          teach:
            "Atoms bond in ways that give them a more stable arrangement of electrons, often a full outer shell of eight, called the octet rule. In an ionic bond, one atom transfers electrons to another. Sodium has one valence electron and chlorine has seven. Sodium gives its electron to chlorine, becoming a positive sodium ion, Na⁺, while chlorine becomes a negative chloride ion, Cl⁻. Opposite charges attract strongly, and enormous numbers of ions stack into a repeating crystal lattice: table salt, NaCl. Ionic bonds usually form between a metal and a nonmetal. The charges in a formula must balance to zero. Magnesium gives up two electrons to become Mg²⁺, but each chloride ion takes only one, so magnesium chloride needs two chloride ions: MgCl₂. Ionic compounds tend to have high melting points, and when melted or dissolved in water they conduct electricity because the ions are free to move.",
          visual: {
            type: "compare",
            left: {
              title: "Ionic bond",
              points: ["Electrons are transferred", "Usually a metal plus a nonmetal", "Forms charged ions in a crystal", "Example: table salt, NaCl"],
            },
            right: {
              title: "Covalent bond",
              points: ["Electrons are shared", "Usually two nonmetals", "Forms separate molecules", "Example: water, H₂O"],
            },
          },
          probe: {
            type: "cloze",
            text: "Calcium is in group 2, so each calcium atom loses {0} electrons to become Ca²⁺. Fluorine is in group 17, so each fluorine atom gains {1} electron to become F⁻. To balance the charges, the formula of calcium fluoride is {2}.",
            blanks: [
              { answers: ["2", "two"] },
              { answers: ["1", "one"] },
              { answers: ["CaF2", "CaF₂"] },
            ],
            hint: "Group 2 metals have two valence electrons to give away; group 17 nonmetals need one more. Then make the total charge zero.",
            mistakes: [
              { match: "CaF", coach: "Ca²⁺ has a charge of +2, but F⁻ is only −1. You need two fluoride ions to balance it: CaF₂." },
              { match: "Ca2F", coach: "Check which ion has the bigger charge. One Ca²⁺ needs two F⁻ ions, so the 2 goes with fluorine: CaF₂." },
            ],
            seconds: 50,
          },
          think: {
            q: "What holds the sodium and chloride ions together in a salt crystal?",
            choices: ["Shared pairs of electrons", "The attraction between opposite charges", "Gravity between the atoms", "Glue-like neutrons"],
            answer: 1,
            why: "Na⁺ and Cl⁻ have opposite charges, and that electrical attraction is the ionic bond.",
            hints: [
              "Sharing electrons describes covalent bonds. In salt, the electron is transferred.",
              "",
              "Gravity between atoms is far too weak to hold anything together.",
              "Neutrons stay inside the nucleus and have no charge, so they play no part in bonding.",
            ],
          },
          approaches: {
            analogy:
              "An ionic bond is like a trade. Sodium has one extra item it would rather give away, and chlorine needs exactly one more to complete its set. After the trade, each is satisfied, and their opposite charges keep them stuck together like magnets.",
            example:
              "Aluminum (group 13) loses 3 electrons to become Al³⁺. Oxygen (group 16) gains 2 to become O²⁻. To balance, find the least common multiple of 3 and 2, which is 6: two Al³⁺ (+6) and three O²⁻ (−6). The formula is Al₂O₃.",
            simpler: {
              q: "In an ionic bond, electrons are...",
              choices: ["Transferred from one atom to another", "Shared between atoms", "Destroyed"],
              answer: 0,
              why: "One atom gives electrons and the other takes them, forming oppositely charged ions.",
              hints: [
                "",
                "Sharing describes a covalent bond.",
                "Electrons are never destroyed in a chemical reaction; they move.",
              ],
            },
          },
        },
        {
          title: "Covalent Bonds and Molar Mass",
          teach:
            "When two nonmetals bond, neither can pull electrons completely away from the other, so they share. A shared pair of electrons is a covalent bond, and atoms joined this way form molecules. Hydrogen has one electron; two hydrogen atoms share their electrons to make H₂. Oxygen has six valence electrons and needs two more, so in water, H₂O, it shares one pair with each of two hydrogen atoms. Carbon, with four valence electrons, forms four bonds, as in methane, CH₄, which is why carbon can build the long chains and rings found in living things. Atoms can share two pairs, a double bond, as in O₂, or three pairs, a triple bond, as in N₂. Chemists count molecules by weighing them, using molar mass: the mass of one mole of a substance, in grams. Add the atomic masses: water is 2 × 1 + 16 = 18 grams per mole.",
          visual: {
            type: "flip",
            cards: [
              { front: "H₂O (water)", back: "Oxygen shares one electron pair with each of two hydrogens. Molar mass: 18 g/mol." },
              { front: "CH₄ (methane)", back: "Carbon forms four single bonds, one to each hydrogen. Molar mass: 16 g/mol." },
              { front: "O₂ (oxygen gas)", back: "Two oxygen atoms share two pairs of electrons: a double bond." },
              { front: "N₂ (nitrogen gas)", back: "Two nitrogen atoms share three pairs: a very strong triple bond. Most of the air is N₂." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Using atomic masses C = 12 and O = 16, what is the molar mass of carbon dioxide, CO₂?",
            answer: 44,
            tolerance: 0.1,
            unit: "g/mol",
            hint: "CO₂ has one carbon atom and two oxygen atoms. Add 12 + 16 + 16.",
            mistakes: [
              { match: "28", coach: "That counts only one oxygen. The subscript 2 means two oxygen atoms." },
              { match: "32", coach: "That is just the two oxygens. Add the carbon too." },
              { match: "56", coach: "The 2 belongs only to oxygen, not to carbon. There is one carbon: 12 + 2 × 16." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which pair of elements most likely forms a covalent bond?",
            choices: ["Sodium and chlorine", "Carbon and oxygen", "Magnesium and oxygen", "Potassium and bromine"],
            answer: 1,
            why: "Carbon and oxygen are both nonmetals, so they share electrons.",
            hints: [
              "Sodium is a metal and chlorine a nonmetal, which usually means an ionic bond.",
              "",
              "Magnesium is a metal, so with oxygen it forms an ionic compound.",
              "Potassium is a group 1 metal, so with bromine it forms an ionic compound.",
            ],
          },
          approaches: {
            analogy:
              "A covalent bond is like two people each putting a hand on the same rope. Neither owns the rope; both hold it, and the shared rope keeps them connected. A double bond is two ropes; a triple bond is three.",
            example:
              "Ammonia, NH₃: nitrogen has five valence electrons and needs three more, so it shares one pair with each of three hydrogens. Molar mass, using N = 14 and H = 1: 14 + 3 × 1 = 17 g/mol.",
            simpler: {
              q: "In a covalent bond, electrons are...",
              choices: ["Shared", "Transferred", "Destroyed"],
              answer: 0,
              why: "Covalent bonds form when atoms share pairs of electrons.",
              hints: [
                "",
                "Transferring electrons makes ions, which is an ionic bond.",
                "Electrons are never destroyed in a chemical reaction.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each compound by its type of bonding.",
        buckets: ["Ionic (metal + nonmetal)", "Covalent (nonmetals sharing)"],
        items: [
          { text: "Table salt, NaCl", bucket: 0 },
          { text: "Magnesium oxide, MgO", bucket: 0 },
          { text: "Potassium bromide, KBr", bucket: 0 },
          { text: "Calcium fluoride, CaF₂", bucket: 0 },
          { text: "Water, H₂O", bucket: 1 },
          { text: "Carbon dioxide, CO₂", bucket: 1 },
          { text: "Methane, CH₄", bucket: 1 },
          { text: "Ammonia, NH₃", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain what an atom is made of, how the periodic table is organized, and the difference between ionic and covalent bonds. Use table salt and water as examples.",
        keyPoints: [
          "Protons and neutrons are in the nucleus and electrons surround it",
          "The number of protons defines the element",
          "Groups share the same number of valence electrons",
          "Ionic bonds transfer electrons and covalent bonds share them",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Uranium has atomic number 92. How many neutrons are in an atom of uranium-235?",
          answer: 143,
          tolerance: 0,
          unit: "neutrons",
          hint: "Neutrons = mass number minus atomic number.",
          mistakes: [
            { match: "235", coach: "235 is the mass number, protons plus neutrons. Subtract the 92 protons." },
            { match: "327", coach: "You added. Neutrons = 235 minus 92." },
            { match: "92", coach: "92 is the number of protons. Subtract it from 235 to find the neutrons." },
          ],
          seconds: 30,
        },
        {
          type: "number",
          prompt: "Using C = 12 and H = 1, what is the molar mass of methane, CH₄?",
          answer: 16,
          tolerance: 0.1,
          unit: "g/mol",
          hint: "Add one carbon and four hydrogens.",
          mistakes: [
            { match: "13", coach: "That counts only one hydrogen. CH₄ has four hydrogen atoms." },
            { match: "52", coach: "The subscript 4 belongs to hydrogen only, not carbon: 12 + 4 × 1." },
          ],
          seconds: 30,
        },
        {
          type: "match",
          prompt: "Match each term to its meaning.",
          pairs: [
            { left: "Atomic number", right: "The number of protons in an atom" },
            { left: "Isotope", right: "Atoms of one element with different numbers of neutrons" },
            { left: "Valence electron", right: "An outer electron that takes part in bonding" },
            { left: "Ion", right: "An atom that has gained or lost electrons and has a charge" },
            { left: "Molecule", right: "Atoms joined by shared electron pairs" },
          ],
          hint: "Think about which particle each term is about: protons, neutrons, or electrons.",
          mistakes: [
            { match: "Isotope matched with ion", coach: "Isotopes differ in neutrons, which have no charge. Ions differ in electrons, which gives them a charge." },
          ],
          seconds: 50,
        },
        {
          type: "cloze",
          text: "Rows on the periodic table are called {0}, and columns are called {1}. Noble gases almost never react because their outer shells are {2}.",
          blanks: [
            { answers: ["periods"] },
            { answers: ["groups", "families"] },
            { answers: ["full", "complete", "filled"] },
          ],
          bank: ["periods", "groups", "full", "empty", "isotopes"],
          hint: "Rows run across like the periods of a school day; columns run down.",
          mistakes: [
            { match: "empty", coach: "Noble gases do not need to gain or lose electrons because their outer shells are already full." },
            { match: "isotopes", coach: "Isotopes are versions of one element with different neutrons, not parts of the table." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "Why was Mendeleev's periodic table so convincing?",
          choices: [
            "It listed every element that exists today",
            "He left gaps and correctly predicted elements later discovered",
            "It ordered elements alphabetically",
            "It was the first list of elements ever made",
          ],
          answer: 1,
          why: "Gallium (1875) and germanium (1886) matched the properties he had predicted for the gaps.",
        },
        {
          q: "Carbon-14 has 6 protons. How many neutrons does it have?",
          choices: ["6", "14", "20", "8"],
          answer: 3,
          why: "Neutrons = mass number minus protons = 14 minus 6 = 8.",
        },
        {
          q: "Which group contains the unreactive noble gases?",
          choices: ["Group 18", "Group 1", "Group 2", "Group 17"],
          answer: 0,
          why: "Group 18 elements have full outer shells, so they rarely react.",
        },
        {
          q: "What is the formula of magnesium chloride, made of Mg²⁺ and Cl⁻ ions?",
          choices: ["MgCl", "Mg₂Cl", "MgCl₂", "Mg₂Cl₃"],
          answer: 2,
          why: "One Mg²⁺ (+2) needs two Cl⁻ (−1 each) to balance the charge: MgCl₂.",
        },
        {
          q: "In a water molecule, how are the hydrogen and oxygen atoms held together?",
          choices: ["By shared pairs of electrons (covalent bonds)", "By transferred electrons (ionic bonds)", "By neutrons", "By magnetism"],
          answer: 0,
          why: "Hydrogen and oxygen are nonmetals, so they share electrons in covalent bonds.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Build molecules and grow a crystal. Part 1, models: use modeling clay or small soft candies in different colors for each element, and toothpicks for bonds (one toothpick for a single bond, two for a double bond, three for a triple bond). Build H₂, O₂, N₂, H₂O, CO₂, CH₄ and NH₃. For each, count the bonds on every atom and check the pattern: hydrogen makes 1 bond, oxygen 2, nitrogen 3, carbon 4. Calculate each molar mass (H = 1, C = 12, N = 14, O = 16). Part 2, crystal: with an adult handling the hot water, stir table salt into a cup of hot tap water until no more will dissolve. Pour the clear liquid into a clean jar, hang a string from a pencil across the top, and leave it somewhere undisturbed for several days. Look at the crystals with a magnifying glass and photograph them. Write a short report: why do salt crystals form cubes, and how is the bonding in salt different from the bonding in your water model?",
        rubric: [
          "All seven molecules built with the correct number of bonds on each atom",
          "Molar masses calculated correctly",
          "Salt crystals grown and observed, with a photo or drawing",
          "Report explains the ionic lattice in salt versus covalent bonds in water",
        ],
      },
    },

    // 5. DNA, genes and heredity
    {
      id: "science-hs.genetics",
      title: "DNA, Genes and Heredity",
      minutes: 35,
      stage: "logic",
      read: [
        "From 1856 to 1863, in the garden of St. Thomas's Abbey in Brno, a monk named Gregor Mendel crossed and counted thousands of pea plants. He followed simple traits, such as purple or white flowers and round or wrinkled seeds. When he crossed purple plants with white ones, every offspring was purple. But when those offspring were bred with each other, white flowers came back in about one plant out of four. Mendel published his results in 1866. They were largely ignored until three other scientists rediscovered them in 1900.",
        "Today we know that the instructions for heredity are stored in DNA. A DNA molecule is a double helix, like a twisted ladder, and its rungs are pairs of four bases: adenine (A), thymine (T), cytosine (C) and guanine (G). A always pairs with T, and C always pairs with G. In 1953, James Watson and Francis Crick proposed the double-helix model, drawing on X-ray images of DNA from Rosalind Franklin's research.",
        "A gene is a section of DNA that carries the instructions for a product, usually a protein. Genes sit on chromosomes, which come in pairs, one from each parent. Different versions of a gene are called alleles. A dominant allele, written with a capital letter such as P, shows its effect even with one copy. A recessive allele, written lowercase such as p, shows only when both copies are recessive. The pair of alleles is the genotype; the observable trait is the phenotype.",
        "A Punnett square predicts the offspring of a cross. For two Pp parents, the four boxes are PP, Pp, Pp and pp, giving a 3 to 1 ratio of purple to white flowers. That is exactly the pattern Mendel counted, because each parent passes on just one of its two alleles, chosen by chance.",
      ].join("\n\n"),
      keyIdeas: [
        "DNA is a double helix; A pairs with T and C pairs with G.",
        "Genes come in versions called alleles; dominant alleles hide recessive ones.",
        "Each parent passes on one allele by chance, so a Pp × Pp cross gives a 3 : 1 ratio.",
        "Punnett squares turn heredity into probability.",
      ],
      hook: {
        text: "In the garden of an abbey in Brno, a monk named Gregor Mendel spent about eight years, from 1856 to 1863, crossing and counting thousands of pea plants. He tracked simple traits, such as flower color and seed shape, and he counted with great care. His numbers revealed hidden rules of heredity. He published them in 1866, but almost no one understood their importance until three other scientists rediscovered his work in 1900.",
      },
      teach: [
        {
          title: "The Molecule of Heredity",
          teach:
            "Every living cell carries instructions written in DNA, deoxyribonucleic acid. A DNA molecule is a double helix, shaped like a twisted ladder. The sides of the ladder are sugar and phosphate; each rung is a pair of bases. There are four bases: adenine (A), thymine (T), cytosine (C) and guanine (G). They pair by a strict rule: A always pairs with T, and C always pairs with G. So if one strand reads ATGC, the other must read TACG. This rule explains a pattern Erwin Chargaff measured around 1950: in DNA, the amount of A equals the amount of T, and C equals G. In 1953, James Watson and Francis Crick built the double-helix model, using X-ray images of DNA from Rosalind Franklin's research. Base pairing also explains copying: when a cell divides, the two strands separate, and each serves as a template for a new partner strand.",
          visual: {
            type: "hotspots",
            title: "The DNA double helix",
            center: "🧬",
            spots: [
              { label: "Sugar-phosphate backbone", icon: "🪜", detail: "The two sides of the ladder, made of alternating sugar and phosphate groups." },
              { label: "A–T base pair", icon: "🅰️", detail: "Adenine always pairs with thymine." },
              { label: "C–G base pair", icon: "©️", detail: "Cytosine always pairs with guanine." },
              { label: "Copying", icon: "📄", detail: "The strands unzip, and each one is a template for building a matching new strand." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A sample of DNA is 30% adenine. Using the base-pairing rules, what percent of the bases are guanine?",
            answer: 20,
            tolerance: 0,
            unit: "%",
            hint: "A equals T, so A and T together make 60%. The rest is split equally between C and G.",
            mistakes: [
              { match: "30", coach: "30% is adenine, and thymine matches it. Guanine pairs with cytosine, which share the remaining 40%." },
              { match: "40", coach: "40% is cytosine and guanine together. They are equal, so split it in half." },
              { match: "70", coach: "70% is everything except adenine. Remember thymine is also 30%." },
            ],
            seconds: 45,
          },
          think: {
            q: "If one DNA strand reads A-A-C-G, what does the partner strand read?",
            choices: ["A-A-C-G", "T-T-G-C", "G-G-T-A", "C-C-A-T"],
            answer: 1,
            why: "A pairs with T and C pairs with G, so A-A-C-G pairs with T-T-G-C.",
            hints: [
              "The partner strand is not a copy; each base pairs with its partner base.",
              "",
              "Check the rule: A pairs with T, not with G.",
              "A pairs with T, not C. Apply A–T and C–G to each letter.",
            ],
          },
          approaches: {
            analogy:
              "DNA's two strands are like a zipper whose teeth only fit one partner. If you know one side, you can rebuild the other exactly. That is how a cell copies its DNA before dividing.",
            example:
              "A strand reads G-A-T-T-A-C-A. Pair each base: G with C, A with T, T with A, T with A, A with T, C with G, A with T. The partner strand reads C-T-A-A-T-G-T.",
            simpler: {
              q: "Adenine (A) always pairs with...",
              choices: ["Thymine (T)", "Cytosine (C)", "Guanine (G)"],
              answer: 0,
              why: "The base-pairing rule is A with T and C with G.",
              hints: [
                "",
                "Cytosine pairs with guanine, not adenine.",
                "Guanine pairs with cytosine, not adenine.",
              ],
            },
          },
        },
        {
          title: "Genes, Alleles and Chromosomes",
          teach:
            "A gene is a section of DNA that carries the instructions for one product, usually a protein. Proteins do most of the work in cells, from building tissues to speeding up chemical reactions. Genes are arranged along chromosomes. Human body cells contain 46 chromosomes in 23 pairs, and one chromosome of each pair comes from each parent, so you carry two copies of most genes. Different versions of the same gene are called alleles. In Mendel's peas, one allele for flower color makes purple flowers and another makes white. A dominant allele shows its effect even when only one copy is present; a recessive allele shows only when both copies are recessive. Geneticists write dominant alleles with a capital letter, P, and recessive ones lowercase, p. The pair of alleles is the genotype: PP and pp are homozygous, and Pp is heterozygous. The trait you can observe, such as purple flowers, is the phenotype.",
          visual: {
            type: "flip",
            cards: [
              { front: "Gene", back: "A section of DNA with instructions for one product, usually a protein." },
              { front: "Allele", back: "One version of a gene, such as P (purple) or p (white)." },
              { front: "Genotype", back: "The pair of alleles an organism carries: PP, Pp or pp." },
              { front: "Phenotype", back: "The trait you can observe, such as purple or white flowers." },
              { front: "Homozygous", back: "Two identical alleles: PP or pp." },
              { front: "Heterozygous", back: "Two different alleles: Pp." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each genetics term to its example from Mendel's peas.",
            pairs: [
              { left: "Gene", right: "The section of DNA that controls flower color" },
              { left: "Allele", right: "P, the version that makes purple flowers" },
              { left: "Heterozygous genotype", right: "Pp" },
              { left: "Homozygous recessive genotype", right: "pp" },
              { left: "Phenotype", right: "Purple flowers you can see" },
            ],
            hint: "Genotypes are written with letters; phenotypes are what you observe; an allele is one version of a gene.",
            mistakes: [
              { match: "Phenotype matched with Pp", coach: "Pp is a genotype, the letters. The phenotype is what the plant looks like." },
            ],
            seconds: 45,
          },
          think: {
            q: "A pea plant has the genotype Pp. What color are its flowers?",
            choices: ["White", "Purple", "Pink, a blend of both", "Half purple and half white"],
            answer: 1,
            why: "P is dominant, so one copy is enough to make the flowers purple.",
            hints: [
              "White shows only when both alleles are recessive, pp.",
              "",
              "Mendel's pea flower colors did not blend; the dominant allele simply shows.",
              "The whole plant shows the dominant trait. Alleles do not split the flower in half.",
            ],
          },
          approaches: {
            analogy:
              "Alleles are like two recipe cards for the same dish. If one card says 'add purple dye' and the other says nothing, the dish comes out purple. Only when both cards leave out the dye does the dish stay white.",
            example:
              "Seed shape in peas: R (round) is dominant and r (wrinkled) is recessive. RR: round, homozygous. Rr: round, heterozygous. rr: wrinkled, homozygous recessive. Two plants that look the same, RR and Rr, can have different genotypes.",
            simpler: {
              q: "Which letter shows a dominant allele?",
              choices: ["P", "p", "Neither"],
              answer: 0,
              why: "Dominant alleles are written with a capital letter.",
              hints: [
                "",
                "Lowercase letters stand for recessive alleles.",
                "Geneticists do use letters: capital for dominant, lowercase for recessive.",
              ],
            },
          },
        },
        {
          title: "Mendel's Experiments",
          teach:
            "Mendel started with true-breeding plants: purple-flowered plants whose offspring were always purple, and white-flowered plants whose offspring were always white. When he crossed them, every plant in the first generation, the F1, had purple flowers. The white trait seemed to vanish. Then he let the F1 plants fertilize themselves. In the second generation, the F2, white flowers reappeared. Mendel counted 705 purple plants and 224 white, a ratio of about 3.15 to 1. Other traits gave the same pattern: for seed shape he counted 5,474 round seeds and 1,850 wrinkled, about 2.96 to 1. Mendel reasoned that each plant carries two hereditary factors for a trait, gets one from each parent, and passes on only one, chosen by chance, in each pollen grain or egg cell. His large samples let the true 3 to 1 ratio show through the randomness.",
          visual: {
            type: "timeline",
            events: [
              { year: 1856, label: "Mendel's pea experiments begin", detail: "In the abbey garden in Brno, Mendel starts years of careful crosses." },
              { year: 1866, label: "Mendel publishes", detail: "His paper on plant hybrids describes the 3 : 1 ratio and his hereditary factors." },
              { year: 1900, label: "Rediscovery", detail: "Three botanists independently find Mendel's paper and confirm his results." },
              { year: 1905, label: "The Punnett square", detail: "British geneticist Reginald Punnett develops his square for predicting crosses." },
              { year: 1953, label: "The double helix", detail: "Watson and Crick propose DNA's structure, revealing how genes are stored and copied." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Two Pp pea plants are crossed and produce 1,200 offspring. About how many would you expect to have white flowers?",
            answer: 300,
            tolerance: 0,
            unit: "plants",
            hint: "In a Pp × Pp cross, white (pp) is expected in 1 out of every 4 offspring.",
            mistakes: [
              { match: "900", coach: "900 is the expected number of PURPLE plants, 3 out of 4. White is 1 out of 4." },
              { match: "400", coach: "A 3 : 1 ratio means 1 out of 4 total, not 1 out of 3. Divide 1,200 by 4." },
              { match: "600", coach: "600 is half. Only 1 in 4 offspring is expected to be pp." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why did white flowers disappear in the F1 generation and reappear in the F2?",
            choices: [
              "White is dominant, so it took a generation to appear",
              "The white allele was destroyed and then recreated",
              "White is recessive; F1 plants were all Pp, and some F2 plants got p from both parents",
              "The F2 plants were grown in different soil",
            ],
            answer: 2,
            why: "The F1 plants carried a hidden p allele. When two Pp plants crossed, about 1 in 4 offspring inherited p from each parent and showed white flowers.",
            hints: [
              "If white were dominant, the F1 plants would have been white.",
              "Alleles are not destroyed. The white allele was hidden inside the F1 plants.",
              "",
              "Mendel controlled growing conditions. The pattern came from inheritance, not soil.",
            ],
          },
          approaches: {
            analogy:
              "A recessive allele is like a message in a sealed envelope carried by a messenger. The messenger delivers it without reading it aloud. Only when two sealed envelopes with the same message meet in one plant does the message show.",
            example:
              "Mendel's seed-color data: 6,022 yellow and 2,001 green F2 seeds. 6,022 ÷ 2,001 ≈ 3.01. Close to 3 : 1, because yellow is dominant and both F1 parents were heterozygous.",
            simpler: {
              q: "In the F1 generation of Mendel's purple × white cross, what color were the flowers?",
              choices: ["All purple", "All white", "Pink"],
              answer: 0,
              why: "Every F1 plant got P from the purple parent, and P is dominant.",
              hints: [
                "",
                "White is recessive, so it was hidden in the F1.",
                "Pea flower colors did not blend in Mendel's experiments.",
              ],
            },
          },
        },
        {
          title: "Punnett Squares and Probability",
          teach:
            "A Punnett square, devised by the British geneticist Reginald Punnett, predicts the offspring of a cross. Write one parent's two alleles across the top and the other parent's down the side. Each box combines the letter above it with the letter beside it. For Pp × Pp, the four boxes are PP, Pp, Pp and pp. So each offspring has a 1 in 4 chance of being PP, 2 in 4 of being Pp, and 1 in 4 of being pp. That is a 1 : 2 : 1 genotype ratio and a 3 : 1 phenotype ratio, three purple to one white, exactly what Mendel saw. A test cross reveals a hidden genotype. Cross a purple plant of unknown genotype with a white pp plant. If any offspring are white, the purple parent must be Pp; a Pp × pp cross gives about half purple and half white. These are probabilities, like coin flips, so small samples can stray from the ratio.",
          visual: {
            type: "hotspots",
            title: "Punnett square for Pp × Pp",
            center: "🌸",
            spots: [
              { label: "Top left: PP", icon: "🟪", detail: "P from each parent. Homozygous dominant: purple flowers. 1 in 4 chance." },
              { label: "Top right: Pp", icon: "🟪", detail: "P from one parent, p from the other. Heterozygous: purple flowers." },
              { label: "Bottom left: Pp", icon: "🟪", detail: "Another heterozygous box: purple. The two Pp boxes make a 2 in 4 chance." },
              { label: "Bottom right: pp", icon: "⬜", detail: "p from each parent. Homozygous recessive: white flowers. 1 in 4 chance." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A heterozygous purple plant (Pp) is crossed with a white plant (pp). What percent of the offspring would you expect to have white flowers?",
            answer: 50,
            tolerance: 0,
            unit: "%",
            hint: "Draw the square: P and p across the top, p and p down the side. Count the pp boxes out of 4.",
            mistakes: [
              { match: "25", coach: "25% is for a Pp × Pp cross. Here one parent is pp, so draw the square again: two of the four boxes are pp." },
              { match: "75", coach: "75% would be the purple share in a Pp × Pp cross. Fill in the square for Pp × pp." },
              { match: "0", coach: "The pp parent always passes on p, and the Pp parent passes on p half the time." },
            ],
            seconds: 50,
          },
          think: {
            q: "In a Pp × Pp cross, what fraction of the offspring is expected to be heterozygous (Pp)?",
            choices: ["1/4", "1/2", "3/4", "All of them"],
            answer: 1,
            why: "Two of the four boxes are Pp, so 2/4 = 1/2.",
            hints: [
              "1/4 is the chance of PP, or of pp. Count the Pp boxes.",
              "",
              "3/4 is the fraction with purple flowers, which includes PP as well as Pp.",
              "PP and pp boxes appear too, so not every offspring is Pp.",
            ],
          },
          approaches: {
            analogy:
              "A Punnett square works like flipping two coins, one for each parent. Each coin lands on P or p. Two heads, two tails, or one of each: the square simply lists every equally likely combination.",
            example:
              "Test cross: a round-seeded plant of unknown genotype is crossed with a wrinkled rr plant. If the unknown is RR, the square gives Rr in all four boxes: all round. If it is Rr, the square gives Rr, Rr, rr, rr: half round, half wrinkled. Seeing any wrinkled seeds proves the parent was Rr.",
            simpler: {
              q: "How many boxes are in a Punnett square for one gene with two alleles per parent?",
              choices: ["4", "2", "8"],
              answer: 0,
              why: "Two alleles across the top times two down the side gives 2 × 2 = 4 boxes.",
              hints: [
                "",
                "Each parent contributes two alleles, one row or column each, so multiply 2 × 2.",
                "8 boxes would need more alleles. One gene with two alleles per parent gives 2 × 2.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for solving a Punnett square in order.",
        steps: [
          "Write each parent's genotype with letters",
          "Split each parent's two alleles into the separate gametes it can pass on",
          "Put one parent's alleles across the top and the other's down the side",
          "Fill each box with one letter from the top and one from the side",
          "Count how many boxes have each genotype",
          "Turn the genotypes into phenotypes and state the ratio",
        ],
      },
      explain: {
        prompt: "Explain how Mendel's purple and white pea flowers can be explained with DNA, alleles and a Punnett square. Why did white disappear and then come back?",
        keyPoints: [
          "Genes are sections of DNA and come in versions called alleles",
          "Each parent passes on one allele by chance",
          "A dominant allele hides a recessive one",
          "Pp × Pp gives a 3 to 1 ratio of purple to white",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Two heterozygous purple plants (Pp × Pp) are crossed. What percent of the offspring would you expect to have white flowers?",
          answer: 25,
          tolerance: 0,
          unit: "%",
          hint: "Draw the square and count the pp boxes out of 4.",
          mistakes: [
            { match: "50", coach: "50% is the share of Pp offspring. White needs pp, which is 1 box out of 4." },
            { match: "75", coach: "75% is the purple share. White is the remaining 1 box out of 4." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "In DNA, adenine pairs with {0} and cytosine pairs with {1}. So the strand ATTGCA pairs with the strand {2}.",
          blanks: [
            { answers: ["thymine", "T"] },
            { answers: ["guanine", "G"] },
            { answers: ["TAACGT", "T-A-A-C-G-T", "T A A C G T"] },
          ],
          hint: "Use A–T and C–G for each letter, in order.",
          mistakes: [
            { match: "ATTGCA", coach: "The partner strand is not a copy. Replace each base with its pair: A with T, T with A, G with C, C with G." },
            { match: "TAAGCT", coach: "Check the fourth and fifth letters: G pairs with C, and C pairs with G." },
          ],
          seconds: 50,
        },
        {
          type: "sort",
          prompt: "Sort each pea plant by the flower color it will have. P (purple) is dominant over p (white).",
          buckets: ["Purple flowers", "White flowers"],
          items: [
            { text: "Genotype PP", bucket: 0 },
            { text: "Genotype Pp", bucket: 0 },
            { text: "Genotype pp", bucket: 1 },
            { text: "An F1 plant from a PP × pp cross", bucket: 0 },
            { text: "Any offspring of a pp × pp cross", bucket: 1 },
          ],
          hint: "One P is enough for purple. White needs two p alleles.",
          mistakes: [
            { match: "Pp sorted as white", coach: "Pp has one dominant P, which is enough to make the flowers purple." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each cross to its expected result.",
          pairs: [
            { left: "PP × pp", right: "All Pp, all purple" },
            { left: "Pp × Pp", right: "3 purple : 1 white" },
            { left: "Pp × pp", right: "1 purple : 1 white" },
            { left: "pp × pp", right: "All white" },
          ],
          hint: "Draw a quick Punnett square for each cross and count the boxes.",
          mistakes: [
            { match: "Pp × pp matched with 3 purple : 1 white", coach: "3 : 1 needs two heterozygous parents. With one pp parent, half the boxes are pp." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "For seed shape, Mendel counted 5,474 round seeds and 1,850 wrinkled seeds. What is the ratio of round to wrinkled, to two decimal places (round ÷ wrinkled)?",
          answer: 2.96,
          tolerance: 0.01,
          hint: "Divide 5,474 by 1,850.",
          mistakes: [
            { match: "0.34", coach: "You divided wrinkled by round. Divide round by wrinkled: 5,474 ÷ 1,850." },
            { match: "3", coach: "3 is the ideal ratio. Calculate Mendel's actual ratio to two decimal places." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "When Mendel crossed true-breeding purple and white pea plants, what were the F1 offspring like?",
          choices: ["All white", "Half purple, half white", "All pink", "All purple"],
          answer: 3,
          why: "Every F1 plant received a dominant P allele from the purple parent, so all were purple.",
        },
        {
          q: "Which base pairs with guanine in DNA?",
          choices: ["Adenine", "Thymine", "Cytosine", "Uracil"],
          answer: 2,
          why: "In DNA, C always pairs with G, and A always pairs with T.",
        },
        {
          q: "What is the difference between genotype and phenotype?",
          choices: [
            "Genotype is the alleles an organism carries; phenotype is the trait you can observe",
            "Genotype is what you see; phenotype is the DNA",
            "They mean the same thing",
            "Genotype applies to plants and phenotype to animals",
          ],
          answer: 0,
          why: "Genotype is the allele pair, such as Pp; phenotype is the visible result, such as purple flowers.",
        },
        {
          q: "A purple plant crossed with a white plant produces some white offspring. What is the purple parent's genotype?",
          choices: ["PP", "Pp", "pp", "It cannot be known"],
          answer: 1,
          why: "To produce a white (pp) offspring, the purple parent must have passed on a p, so it must be Pp.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "Simulate Mendel's cross with coins. Materials: two coins, masking tape, a pen, and paper for a tally table. Steps: 1) Put tape on both sides of each coin. Write P on one side and p on the other. Each coin is a Pp parent, and each flip picks the allele that parent passes on. 2) Before you start, use a Punnett square to predict the percent of PP, Pp and pp offspring. 3) Flip both coins together 100 times and tally each result as PP, Pp or pp. 4) Calculate the percent of each genotype and the ratio of purple (PP + Pp) to white (pp). 5) Find the percent error between your pp result and the expected 25%. 6) Combine your results with another 100 flips (or a family member's 100 flips) and recalculate. 7) Write a conclusion: how close did you get to 1 : 2 : 1 and 3 : 1, did the larger sample get closer, and how does this explain why Mendel counted so many plants?",
        rubric: [
          "Punnett square prediction written before flipping",
          "Tally of 100 flips with correct percents for PP, Pp and pp",
          "Percent error and a comparison of the 100-flip and 200-flip results",
          "Conclusion connects sample size to Mendel's large counts",
        ],
      },
    },
  ],
};
