import type { Course } from "./types";
import { leadership } from "./leadership";

/**
 * Leadership & Ethics: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const leadershipHs: Course = {
  ...leadership,
  id: "leadership-hs",
  band: "strategist",
  title: "Leadership & Ethics",
  blurb: "High school leadership: self-mastery, decision making, leading teams, persuasion and integrity under pressure.",
  lessons: [
    // ------------------------------------------------------------------
    // 1. Self-mastery: the Stoics
    // ------------------------------------------------------------------
    {
      id: "leadership-hs.stoics",
      title: "Self-Mastery: The Stoic Way",
      minutes: 35,
      stage: "logic",
      subject: "Other",
      read: [
        "In 1965 a Navy pilot named James Stockdale was shot down and captured. He spent more than seven years as a prisoner of war, much of it alone and under harsh treatment. He later said that what carried him through was a short handbook first written down nearly two thousand years earlier, the teachings of a philosopher who had himself been born a slave.",
        "That philosopher was Epictetus. Born around AD 50 in what is now Turkey, he gained his freedom and became one of the most respected teachers in the Roman world. He wrote nothing himself. His student Arrian recorded his lessons, including a short Handbook, the Enchiridion, which opens with a famous line: \"Of things some are in our power, and others are not.\"",
        "In our power, Epictetus taught, are our judgments, choices, desires and aversions. Not in our power are our body, property, reputation and position, along with the weather and other people's choices. Modern writers call this the dichotomy of control. Wisdom starts by sorting each situation into those two piles and spending your energy on the first.",
        "Epictetus also taught that people are disturbed not by events but by their judgments about events. Between what happens and how you react stands a judgment, and that judgment belongs to you. In the twentieth century, the psychologist Albert Ellis openly credited Epictetus for this idea.",
        "A century later, the emperor Marcus Aurelius filled a private notebook, the Meditations, with these ideas. Each morning he prepared to meet rude and ungrateful people without anger, and he reminded himself that an obstacle can become the very path to doing good. \"No longer talk at all about the kind of man that a good man ought to be, but be such,\" he wrote.",
        "The Stoics also built daily habits. Seneca reviewed his whole day each night. Cicero compared the wise person to an archer who aims as well as he can but cannot command the wind.",
        "Self-mastery is not pretending you have no feelings. It is choosing where your attention and effort go. A person who cannot govern himself will struggle to lead anyone else.",
      ].join("\n\n"),
      keyIdeas: [
        "Epictetus taught the dichotomy of control: put your effort into your own judgments and choices, not into what you cannot control.",
        "Between every event and your reaction is a judgment, and you can examine and change it.",
        "Marcus Aurelius used his Meditations to prepare for trouble and to turn obstacles into chances to practice virtue.",
        "Stoic habits like the evening review and the archer's mindset make self-mastery a daily practice.",
      ],
      hook: {
        text: "In 1965 a Navy pilot named James Stockdale parachuted toward enemy soldiers, knowing he would be captured. He later said that as he fell, he told himself he was entering the world of Epictetus, a philosopher who had died about 1,800 years earlier. He survived more than seven years as a prisoner. What could an ancient teacher, born a slave, have given him that nothing else could?",
      },
      teach: [
        {
          title: "The Dichotomy of Control",
          teach:
            "Epictetus was born into slavery around AD 50 in Hierapolis, in what is now Turkey. After gaining his freedom he became one of the most respected teachers in the Roman world. He never wrote a book. His student Arrian wrote down his lessons, including a short Handbook, the Enchiridion, which opens: \"Of things some are in our power, and others are not.\" In our power are our judgments, choices, desires and aversions. Not in our power are our body, property, reputation and position. Add to that second pile the weather, the past and every other person's choices. Modern writers call this the dichotomy of control. Epictetus did not mean you should stop caring about the second pile. He meant you should stop staking your peace of mind on it, and pour your best effort into the first.",
          visual: {
            type: "compare",
            left: {
              title: "In my power",
              points: ["My judgments about what happens", "My choices and effort", "What I want and what I avoid", "How I treat people"],
            },
            right: {
              title: "Not in my power",
              points: ["My reputation and what others think", "The weather and the past", "Other people's choices", "The final result, once I have done my part"],
            },
          },
          probe: {
            type: "sort",
            prompt: "You are trying out for a selective summer music program. Sort each item by whether it is in your power or not.",
            buckets: ["In my power", "Not in my power"],
            items: [
              { text: "How many hours I practice before the audition", bucket: 0 },
              { text: "Whether the judges choose me", bucket: 1 },
              { text: "How I respond when a judge criticizes my phrasing", bucket: 0 },
              { text: "How talented the other applicants are", bucket: 1 },
              { text: "Whether I tell the truth on my application", bucket: 0 },
              { text: "What my classmates say if I am not chosen", bucket: 1 },
              { text: "The story I tell myself afterward about what it means", bucket: 0 },
              { text: "Whether a snowstorm delays the audition", bucket: 1 },
            ],
            hint: "Ask of each item: could I decide this by my own choice, right now, no matter what anyone else does?",
            mistakes: [
              { match: "Judges choosing me sorted as in my power", coach: "You can influence the judges by preparing well, but the decision is theirs. Epictetus would put it in the second pile." },
              { match: "My response to criticism sorted as not in my power", coach: "The criticism is theirs, but your response is yours. That is exactly where Epictetus says your power lives." },
              { match: "The story I tell myself sorted as not in my power", coach: "The story you tell yourself is a judgment, and judgments are the first thing Epictetus lists as in our power." },
            ],
            seconds: 50,
          },
          think: {
            q: "You studied hard, but your essay was graded more harshly than you think was fair. According to Epictetus, what is fully in your power now?",
            choices: [
              "The grade written on the paper",
              "Whether the teacher admits a mistake",
              "Your judgment of what happened and what you do next",
              "What your classmates think of your score",
            ],
            answer: 2,
            why: "The grade, the teacher's response and others' opinions belong to other people. Your judgment and your next action are yours.",
            hints: [
              "You can ask about the grade, but the grade itself was decided by someone else.",
              "You can ask respectfully, but whether the teacher changes their mind is the teacher's choice.",
              "",
              "Other people's opinions are on Epictetus's list of things not in our power.",
            ],
          },
          approaches: {
            analogy:
              "A sailor cannot control the wind, but she can trim her sails. Complaining about the wind does not move the boat. Adjusting the sails does. Epictetus asks you to stop arguing with the wind and get good at sailing.",
            example:
              "Daniel gets cut from the varsity basketball team. Not in his power: the coach's decision and what friends say. In his power: asking the coach what to work on, a daily shooting plan, and how he treats the players who made it. He spends his energy on those three things.",
            simpler: {
              q: "Which of these is in your power?",
              choices: ["The weather on race day", "How much you train before the race", "Who else enters the race"],
              answer: 1,
              why: "Your own effort is your choice. Weather and other people's choices are not.",
              hints: [
                "Nobody can choose the weather. Look for something that depends only on you.",
                "",
                "Other runners decide for themselves whether to enter. Look for your own choice.",
              ],
            },
          },
        },
        {
          title: "Events, Judgments, Reactions",
          teach:
            "Epictetus made a second claim that is even bolder: \"Men are disturbed not by the things which happen, but by the opinions about the things.\" Notice the order. First, something happens. Second, you make a judgment about it: this is unfair, this is a disaster, this is a challenge. Third, you react. Most people jump straight from event to reaction and never notice the judgment in the middle. The Stoics trained themselves to pause and examine it. Is this really a catastrophe, or an inconvenience? Will it matter in a year? This is not pretending that bad things are good. Losing a match still hurts. But the story you tell yourself about the loss can turn it into despair or into a lesson. In the twentieth century the psychologist Albert Ellis built a whole method of therapy on this idea and openly credited Epictetus.",
          visual: {
            type: "hotspots",
            title: "What Stands Between",
            center: "Your reaction",
            spots: [
              { label: "Event", icon: "⚡", detail: "Something happens: a lost match, a sharp comment, a cancelled plan. Often outside your power." },
              { label: "Judgment", icon: "🧠", detail: "The story you tell about it: 'This is a disaster' or 'This is hard, but I can learn from it.' This part is yours." },
              { label: "Reaction", icon: "🎬", detail: "What you feel and do next. It follows the judgment far more than the event." },
              { label: "The pause", icon: "⏸️", detail: "The Stoic skill: stop and ask, 'Is my judgment true? Will this matter in a year?'" },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that is a judgment someone has added, not just a fact about what happened.",
            sentences: [
              "The coach moved me to the second string this week.",
              "This is the worst thing that could ever happen to me.",
              "We lost the debate round by a vote of two to one.",
              "The judges obviously had it out for us from the start.",
              "My phone screen cracked when it fell on the sidewalk.",
              "My whole week is ruined now.",
            ],
            correct: [1, 3, 5],
            hint: "A fact could be checked by a camera. A judgment is the meaning someone attaches to the fact.",
            mistakes: [
              { match: "Tapped the coach moving me to the second string", coach: "A camera could record that. It is the event itself. The judgment would be what you decide it means." },
              { match: "Tapped the two-to-one debate vote", coach: "The vote count is a plain fact. Look for the sentence that adds a story about why it happened." },
              { match: "Tapped the cracked phone screen", coach: "A cracked screen is just what happened. Look for the sentence that decides the whole week is ruined." },
            ],
            seconds: 40,
          },
          think: {
            q: "Two players miss the same penalty kick in a big game. One quits the team. The other practices penalties every day for a month. What explains the difference, according to Epictetus?",
            choices: [
              "One player's miss was much worse",
              "Pure luck",
              "The coach treated them differently",
              "Their judgments about what the miss meant",
            ],
            answer: 3,
            why: "The event was the same. Their different judgments about it led to different reactions.",
            hints: [
              "The lesson sets up the misses as the same event. Look at what each player did in his own mind afterward.",
              "Luck explains the miss, perhaps, but not what each player chose to do next.",
              "Nothing in the story says the coach acted differently. The difference is inside each player.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of a judgment as a pair of tinted glasses. The same street looks gloomy through dark lenses and bright through clear ones. The street has not changed. The Stoics ask you to notice the glasses and, when they are wrong, swap them.",
            example:
              "Event: Ava's science fair project falls apart the night before. Judgment A: 'I'm a failure.' Reaction: she gives up. Judgment B: 'This is a setback, and I can still present what I learned.' Reaction: she rebuilds a simpler version and explains what went wrong. Same event, different judgment, different result.",
            simpler: {
              q: "In the Stoic chain, what comes between an event and your reaction?",
              choices: ["Your judgment about the event", "Other people's opinions", "Nothing at all"],
              answer: 0,
              why: "Epictetus taught that the judgment in the middle shapes the reaction.",
              hints: [
                "",
                "Other people may have opinions, but the step in the chain is something inside you.",
                "Most people think reactions are automatic, but Epictetus saw something in between.",
              ],
            },
          },
        },
        {
          title: "The Emperor's Notebook",
          teach:
            "About a century after Epictetus, Marcus Aurelius ruled Rome from AD 161 to 180, often from army camps on the frontier. He had studied Epictetus's lessons and quoted them in his private notebook, the Meditations. Two practices stand out. First, he prepared each morning for trouble: \"Begin the morning by saying to thyself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful.\" He was not being gloomy. He was rehearsing calm before the test arrived. Second, he turned obstacles into material for virtue. He wrote that \"that which is an obstacle on the road helps us on this road.\" A rude colleague becomes a chance to practice patience. A setback becomes training in persistence. Marcus did not always live up to his own advice, which is exactly why he kept writing. The notebook was a daily workout, not a trophy.",
          visual: {
            type: "timeline",
            events: [
              { year: -300, label: "Zeno teaches in Athens", detail: "Around 300 BC Zeno of Citium begins teaching at the Stoa Poikile, the Painted Porch. The Stoics are named after that porch." },
              { year: 50, label: "Epictetus is born", detail: "Born into slavery around AD 50, he later gains his freedom and becomes a famous teacher." },
              { year: 161, label: "Marcus becomes emperor", detail: "Marcus Aurelius begins his reign and spends much of it on military campaigns." },
              { year: 180, label: "Marcus dies", detail: "He dies on campaign. His private notebook survives and becomes the Meditations." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Marcus treated obstacles as training. Match each obstacle to the strength it can build.",
            pairs: [
              { left: "A long recovery from a sports injury", right: "Patience" },
              { left: "A harsh but fair critique of your essay", right: "Humility" },
              { left: "Getting cut from the team and trying again next year", right: "Persistence" },
              { left: "A teammate who keeps showing up late", right: "Calm, direct honesty" },
            ],
            hint: "For each obstacle, ask: what would I have to practice to handle this well?",
            mistakes: [
              { match: "Matched the essay critique to persistence", coach: "Persistence helps, but the first thing a fair critique asks of you is to accept that you have something to learn." },
              { match: "Matched the late teammate to patience", coach: "Patience helps, but if it never ends in an honest conversation the problem continues. Which strength speaks up calmly?" },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Marcus remind himself each morning that he would meet rude and ungrateful people?",
            choices: [
              "So he could respond calmly instead of being caught off guard",
              "Because he disliked everyone around him",
              "To plan how to punish them",
              "So he would have an excuse to stay in his tent",
            ],
            answer: 0,
            why: "Rehearsing a challenge in advance let him meet it with calm instead of surprise and anger.",
            hints: [
              "",
              "His notes are full of reminders to be patient with people, not to dislike them.",
              "The Meditations warn against anger and revenge. He was preparing to stay calm.",
              "He spent his days leading armies and governing. The reminder was preparation, not avoidance.",
            ],
          },
          approaches: {
            analogy:
              "A firefighter runs drills before there is any fire, so that when the alarm sounds her hands already know what to do. Marcus's morning reminder was a fire drill for his temper.",
            example:
              "Before a group project meeting, Leo tells himself: 'Someone will probably interrupt me, and someone will not have done their part. I will stay calm and ask for a plan.' When it happens, he is not thrown off. He treats it as the test he prepared for.",
            simpler: {
              q: "What was the Meditations?",
              choices: ["A public speech to the Roman Senate", "A private notebook Marcus wrote to train himself", "A Roman law code"],
              answer: 1,
              why: "The Meditations were private reminders Marcus wrote for himself, not for an audience.",
              hints: [
                "It was never delivered as a speech. Think about who his audience was.",
                "",
                "Marcus made laws, but the Meditations are personal reflections, not laws.",
              ],
            },
          },
        },
        {
          title: "Training Like a Stoic",
          teach:
            "The Stoics treated philosophy as practice, not just theory. Three of their exercises are still worth stealing. The first is the evening review. Seneca, a Roman Stoic, wrote that each night, after the lamp was taken away, he examined his whole day: What bad habit did I resist? Where did I fall short? How can I do better tomorrow? The second is imagining setbacks in advance, which later writers called premeditatio malorum, so that hardship does not catch you unprepared. The third is the archer's mindset, described by Cicero. An archer does everything in his power to aim well, but once the arrow leaves the bow, the wind is not his to command. Judge yourself mainly by the quality of your effort and choices, not only by the outcome. Practiced together, these habits build the kind of steady mind other people can lean on.",
          visual: {
            type: "flip",
            cards: [
              { front: "Evening review", back: "Seneca's nightly habit: What did I do well? Where did I fall short? What will I do better tomorrow?" },
              { front: "Premeditatio malorum", back: "Latin for 'the premeditation of evils': picturing setbacks ahead of time so they do not knock you over." },
              { front: "The archer", back: "Cicero's image: aim and release as well as you can. The wind is not yours, so judge yourself by your aim." },
              { front: "The goal", back: "A steady mind: calm under pressure, honest about mistakes, focused on what you can do next." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Each night Seneca held an evening {0} of his whole day. Imagining setbacks ahead of time was later called premeditatio {1}. Cicero compared the wise person to an {2}, who controls the aim but not the wind.",
            blanks: [{ answers: ["review"] }, { answers: ["malorum"] }, { answers: ["archer"] }],
            bank: ["review", "malorum", "archer", "party", "bonum", "sailor", "emperor"],
            hint: "Think about Seneca checking his day, the Latin word for evils, and someone who shoots arrows.",
            mistakes: [
              { match: "party", coach: "Seneca's evening was quieter than that. He looked back over his day to improve it." },
              { match: "bonum", coach: "Bonum means good. The practice imagines bad things, the evils, ahead of time." },
              { match: "sailor", coach: "A sailor is a fine Stoic image too, but Cicero's picture involves aiming at a target." },
            ],
            seconds: 40,
          },
          think: {
            q: "An archer aims carefully and releases well, but a sudden gust blows the arrow off target. How would a Stoic judge her shot?",
            choices: [
              "As a failure, because only hitting the target counts",
              "As a reason to quit archery",
              "As someone else's fault, and she should complain loudly",
              "As a good shot, because she did everything in her power well",
            ],
            answer: 3,
            why: "The Stoic archer judges herself by her aim and effort, which were hers. The wind was not.",
            hints: [
              "The outcome matters, but the wind was not in her power. Cicero's point is about what she controlled.",
              "Quitting would let something outside her control decide her choices.",
              "Blaming and complaining adds a judgment that helps nothing. What did she actually control?",
              "",
            ],
          },
          approaches: {
            analogy:
              "An evening review is like a coach watching game film. The game is over and cannot be changed, but watching it honestly makes the next game better.",
            example:
              "Each night for a week, Grace writes three lines: one thing she did well, one place she fell short, one thing to do better tomorrow. On Tuesday she notes she snapped at her brother. On Wednesday she catches herself before it happens again.",
            simpler: {
              q: "When did Seneca review his day?",
              choices: ["Each morning before breakfast", "At night, after the lamp was taken away", "Only on holidays"],
              answer: 1,
              why: "Seneca described examining his whole day each night.",
              hints: [
                "Marcus prepared in the morning. Seneca's habit looked back over a finished day.",
                "",
                "It was a daily habit, not a once-in-a-while event.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the Stoic response to a setback in order.",
        steps: [
          "Something goes wrong",
          "Pause before reacting",
          "Notice the judgment you are making about it",
          "Sort what is and is not in your power",
          "Act on what is in your power",
          "That night, review what you did well and what to improve",
        ],
      },
      explain: {
        prompt: "Explain the dichotomy of control and how judgments shape our reactions. Then describe one Stoic practice you could use this week and why it would help.",
        keyPoints: [
          "Some things are in our power (judgments, choices, effort) and some are not (others' choices, reputation, outcomes)",
          "Put effort and peace of mind into what is in your power",
          "Our judgments about events, not the events alone, shape our reactions",
          "Names a Stoic practice such as the evening review, preparing for setbacks or the archer's mindset",
          "Mentions Epictetus, Marcus Aurelius, Seneca or Cicero accurately",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each Stoic idea to the thinker it comes from in this lesson.",
          pairs: [
            { left: "\"Of things some are in our power, and others are not.\"", right: "Epictetus" },
            { left: "\"Begin the morning by saying to thyself, I shall meet with the busy-body...\"", right: "Marcus Aurelius" },
            { left: "Examining the whole day each night after the lamp is taken away", right: "Seneca" },
            { left: "The wise person is like an archer who cannot command the wind", right: "Cicero" },
          ],
          hint: "One was a former slave who taught, one an emperor with a notebook, one reviewed his day at night, one gave us the archer.",
          mistakes: [
            { match: "Swapped Epictetus and Marcus Aurelius", coach: "Epictetus taught the dichotomy of control. Marcus, the emperor, wrote the morning reminder in his notebook." },
            { match: "Swapped Seneca and Cicero", coach: "Seneca described his nightly review. Cicero described the Stoic archer." },
          ],
          seconds: 50,
        },
        {
          type: "place",
          prompt: "Place these on the timeline (AD).",
          min: 0,
          max: 250,
          step: 1,
          tolerance: 10,
          items: [
            { label: "Epictetus is born, around", value: 50 },
            { label: "Marcus Aurelius becomes emperor", value: 161 },
            { label: "Marcus Aurelius dies", value: 180 },
          ],
          hint: "Epictetus lived about a century before Marcus. Marcus ruled for about nineteen years in the second century AD.",
          mistakes: [
            { match: "Placed Epictetus after Marcus", coach: "Marcus studied Epictetus's teachings, so Epictetus came first, about a century earlier." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build Epictetus's key idea about why people get upset.",
          tiles: ["People are disturbed", "not by the things which happen,", "but by their judgments", "about those things."],
          distractors: ["by other people's choices", "by bad luck alone"],
          hint: "Remember the chain: event, then judgment, then reaction. Which part did Epictetus say really disturbs us?",
          mistakes: [
            { match: "Used by other people's choices", coach: "Other people's choices are not in our power, but Epictetus said what disturbs us is something inside us." },
            { match: "Used by bad luck alone", coach: "Bad luck is the event. Epictetus pointed to what we add to the event." },
          ],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "Epictetus listed body, property, {0} and position as not in our power. Modern writers call his idea the dichotomy of {1}.",
          blanks: [{ answers: ["reputation"] }, { answers: ["control"] }],
          bank: ["reputation", "control", "judgment", "choice", "virtue"],
          hint: "One blank is what other people think of you. The other names the idea of sorting things into two piles.",
          mistakes: [
            { match: "judgment", coach: "Judgments are the first thing Epictetus says ARE in our power. What do other people hold about us?" },
            { match: "choice", coach: "Our choices are in our power. The missing word is what other people think of us." },
            { match: "virtue", coach: "Virtue is the goal, but the name of the idea is about what we can and cannot control." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Which of these did Epictetus say is in our power?",
          choices: ["Our reputation", "Our judgments", "Our property", "Other people's choices"],
          answer: 1,
          why: "Epictetus listed judgments, choices, desires and aversions as in our power. Reputation, property and others' choices are not.",
        },
        {
          q: "According to Epictetus, what disturbs people most?",
          choices: ["Events themselves", "Their judgments about events", "Bad weather", "Other people's opinions"],
          answer: 1,
          why: "He taught that people are disturbed not by what happens but by their opinions about what happens.",
        },
        {
          q: "What did Marcus Aurelius do with obstacles?",
          choices: [
            "Avoided them whenever possible",
            "Blamed them on his advisors",
            "Treated them as material for practicing virtue",
          ],
          answer: 2,
          why: "Marcus wrote that an obstacle on the road helps us on the road, because it gives us a chance to practice patience, courage or persistence.",
        },
        {
          q: "What did Seneca do each night?",
          choices: [
            "Reviewed his whole day to see where he could improve",
            "Wrote speeches for the emperor",
            "Planned his meals for the next day",
          ],
          answer: 0,
          why: "Seneca described examining his whole day each night, asking what he resisted, where he fell short and how to improve.",
        },
        {
          q: "What does Cicero's archer image teach?",
          choices: [
            "Only results matter",
            "Practice is pointless if the wind can change",
            "Blame the wind when you miss",
            "Judge yourself by your aim and effort, which are in your power",
          ],
          answer: 3,
          why: "The archer controls the aim and the release but not the wind, so a Stoic judges the quality of the effort.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Keep a Stoic journal for five days. Each morning, write one challenge you expect and how you will meet it. Each night, write one thing you did well, one place you fell short and one thing to improve. Then write a one-page reflection: what did you notice about the difference between events and your judgments, and what did you learn about what is in your power?",
        rubric: [
          "Includes five days of real morning and evening entries",
          "Correctly explains the dichotomy of control in their own words",
          "Gives at least one specific example of changing a judgment about an event",
          "Reflects honestly on what worked and what was hard",
          "Writing is clear, organized and in complete sentences",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 2. Decisions under uncertainty
    // ------------------------------------------------------------------
    {
      id: "leadership-hs.decisions",
      title: "Deciding Under Uncertainty",
      minutes: 35,
      stage: "logic",
      subject: "Other",
      read: [
        "In the early hours of June 5, 1944, General Dwight Eisenhower had to decide whether to launch the Allied landings in Normandy. Storms had already forced a delay. His chief meteorologist, James Stagg, predicted a short break in the weather. If the forecast was wrong, thousands of lives could be lost. Eisenhower gave the order to go. He also wrote a short note to release if the landings failed, ending with the words \"If any blame or fault attaches to the attempt it is mine alone.\" He never needed it.",
        "Most important decisions are made without full information. That means a good decision can still have a bad outcome, and a careless one can get lucky. Judging choices only by how they turned out, sometimes called resulting, teaches the wrong lessons. A better habit is to think in probabilities. Multiply each possible payoff by its chance of happening and add them up: that is the expected value. Then ask whether the worst case would be survivable.",
        "Second-order thinking asks, And then what? In 1902 officials in colonial Hanoi paid a bounty for every rat tail turned in. Soon tailless rats appeared in the streets. People were cutting off tails and releasing rats to breed. The first result looked like success; the second made things worse.",
        "A pre-mortem, an idea from the psychologist Gary Klein, flips the post-mortem around. Before a plan starts, the team imagines it has already failed and writes down every reason why. This gives everyone permission to name problems while there is still time to fix them.",
        "Finally, every choice has an opportunity cost: the value of the best option you give up. Some decisions are easy to reverse, like trying a new study method. Others are hard to undo, like signing a contract or breaking a trust. Move quickly on the first kind and slowly on the second.",
        "Leaders cannot remove uncertainty. They can think clearly inside it, and, like Eisenhower, take responsibility for the result.",
      ].join("\n\n"),
      keyIdeas: [
        "A good decision can have a bad outcome. Judge decisions by the thinking behind them, using probabilities and expected value.",
        "Second-order thinking asks 'And then what?' to catch consequences nobody intended.",
        "A pre-mortem imagines the plan has already failed so the team can find and fix weaknesses early.",
        "Weigh opportunity cost, and decide hard-to-reverse choices slowly and easy-to-reverse ones quickly.",
      ],
      hook: {
        text: "In the early hours of June 5, 1944, General Dwight Eisenhower had to decide whether to send more than 150,000 soldiers across the English Channel. Storms had already forced one delay. His weatherman predicted a short break in the storm, but no one could be sure. Eisenhower said go. Then he quietly wrote a note taking all the blame in case the landings failed. How do you make a choice like that when you cannot know how it will turn out?",
      },
      teach: [
        {
          title: "Good Decisions, Bad Outcomes",
          teach:
            "Most important decisions are made without full information. That means a good decision can still lead to a bad outcome, and a careless one can get lucky. Judging choices only by how they turned out is sometimes called resulting, and it teaches the wrong lessons. A better habit is to think in probabilities. Ask what could happen, how likely each outcome is, and how much each one would matter. Multiply each payoff by its probability and add the results, and you get the expected value. Suppose a club fundraiser has a 60 percent chance of raising $500 and a 40 percent chance of raising nothing. Its expected value is 0.6 times $500, or $300. That helps you compare options. But wise leaders also ask a second question: could the worst case be ruinous? Some risks are worth taking only if you can survive the downside.",
          visual: {
            type: "compare",
            left: {
              title: "Judging by outcome",
              points: ["It worked, so it was smart", "It failed, so it was dumb", "Rewards lucky gambles", "Punishes careful choices that got unlucky"],
            },
            right: {
              title: "Judging the decision",
              points: ["What did we know at the time?", "How likely was each outcome?", "What was the expected value?", "Could we survive the worst case?"],
            },
          },
          probe: {
            type: "number",
            prompt: "You are choosing between two summer jobs. Job A pays a sure $1,200. Job B pays $800 plus a bonus of $1,000 that you have a 50% chance of earning. What is the expected value of Job B, in dollars?",
            answer: 1300,
            unit: "dollars",
            hint: "Expected value = the sure part + (chance of the bonus x the bonus). Turn 50% into 0.5.",
            mistakes: [
              { match: "1800", coach: "That counts the bonus as certain. You only have a 50% chance, so count half of it." },
              { match: "800", coach: "That leaves out the bonus entirely. A 50% chance at $1,000 is worth something: how much?" },
              { match: "500", coach: "That is the expected value of the bonus alone. Add the $800 you are sure to get." },
            ],
            seconds: 45,
          },
          think: {
            q: "Maya checks the forecast: an 80 percent chance of rain. She carries an umbrella all day, and it stays sunny. Was her decision a bad one?",
            choices: [
              "Yes, because the umbrella turned out to be useless",
              "Yes, because she should have known it would stay sunny",
              "No, umbrellas are always the right choice",
              "No, it was a good decision that happened to have an unlucky outcome",
            ],
            answer: 3,
            why: "With an 80 percent chance of rain, carrying the umbrella was wise. Judging it by the sunny result is resulting.",
            hints: [
              "That judges the choice by how it turned out. What did she know when she decided?",
              "Nobody could know for sure. She acted on the best information she had.",
              "If the forecast had been 5 percent rain, carrying it would not be needed. The reason matters.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A doctor who recommends a treatment that works for 90 percent of patients made a good decision even if this patient is in the unlucky 10 percent. You judge the doctor's reasoning, not the dice.",
            example:
              "A school club can run a car wash (90% chance of $300, expected value $270) or a raffle (30% chance of $1,000, expected value $300). The raffle has a slightly higher expected value, but if the club needs at least $200 for a trip, the car wash is far more likely to get there. Expected value is one tool, not the only one.",
            simpler: {
              q: "What is the expected value of a 50 percent chance to win $600?",
              choices: ["$600", "$300", "$0"],
              answer: 1,
              why: "0.5 times $600 is $300.",
              hints: [
                "That would be true only if winning were certain.",
                "",
                "There is a real chance of winning, so the value is more than zero.",
              ],
            },
          },
        },
        {
          title: "Second-Order Thinking",
          teach:
            "First-order thinking asks, What happens next? Second-order thinking keeps going: And then what? In 1902 the French colonial government in Hanoi, fighting rats that could spread plague, offered a small bounty for every rat tail turned in. Tails poured in. But officials soon noticed rats without tails running through the city. People were cutting off the tails and letting the rats go, so they could keep breeding and earning more bounties. The first-order result looked like success. The second-order result made the problem worse. Every rule, price and reward changes what people do, sometimes in ways nobody intended. Before deciding, trace the chain at least two or three steps out. Ask who will respond to this choice, how their incentives change, and what the situation will look like in a month or a year, not just tomorrow.",
          visual: {
            type: "hotspots",
            title: "Ripples of a Decision",
            center: "The choice",
            spots: [
              { label: "First order", icon: "1️⃣", detail: "The obvious, immediate result. Bounty offered: lots of tails turned in." },
              { label: "Second order", icon: "2️⃣", detail: "How people respond to the change. Some keep rats alive because a living rat can earn more tails." },
              { label: "Third order", icon: "3️⃣", detail: "The longer-term effect. The rat problem is no better, and money has been wasted." },
              { label: "The question", icon: "❓", detail: "Always ask: 'And then what?' Then ask it again." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "A lemonade stand cuts its price in half to beat the stand across the street. Put the likely chain of consequences in order.",
            steps: [
              "Sales jump the first weekend",
              "The rival stand cuts its price too",
              "Both stands sell plenty of cups but earn much less per cup",
              "Neither stand can afford good lemons anymore",
              "Customers notice the lemonade getting worse",
            ],
            hint: "Start with the obvious first-order result, then ask 'And then what?' at each step. How would the rival respond?",
            mistakes: [
              { match: "Put the rival cutting prices first", coach: "The rival reacts to something. What happens first that would make them respond?" },
              { match: "Put worse lemonade before lower earnings", coach: "Quality slips because money is short. What has to happen to the money first?" },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did the Hanoi rat bounty backfire?",
            choices: [
              "The rats became immune to traps",
              "Officials paid too little for each tail",
              "The reward for tails gave people a reason to keep rats alive",
              "Nobody bothered to turn in any tails",
            ],
            answer: 2,
            why: "Paying for tails, not dead rats, created an incentive to cut tails and release the rats to breed.",
            hints: [
              "Nothing in the story involves immunity. Think about how people responded to the reward.",
              "A bigger bounty would have made the same problem even stronger.",
              "",
              "Tails poured in. The problem was what people did to earn them.",
            ],
          },
          approaches: {
            analogy:
              "Second-order thinking is like playing chess instead of checkers. A beginner sees only the piece he can take right now. A good player asks, 'If I take it, what will my opponent do next?'",
            example:
              "A teacher offers extra credit for every book report. First order: students turn in more reports. Second order: some students pick the shortest books they can find and write the least they can. Third order: reading quality drops. A better rule might reward pages read or depth of the report.",
            simpler: {
              q: "What question does second-order thinking add?",
              choices: ["And then what?", "Who is to blame?", "How fast can we do it?"],
              answer: 0,
              why: "Second-order thinking keeps asking what happens after the first result.",
              hints: [
                "",
                "Blame looks backward. Second-order thinking looks forward past the first result.",
                "Speed can matter, but this kind of thinking is about consequences down the line.",
              ],
            },
          },
        },
        {
          title: "The Pre-Mortem",
          teach:
            "Doctors perform a post-mortem after a patient dies to learn what went wrong. The psychologist Gary Klein proposed turning that around. In a pre-mortem, a team imagines it is months in the future and the plan has failed badly. Each person then writes down every reason they can think of for the failure. Why does this work? Before a project starts, people tend to be overconfident, and team members with doubts often stay quiet so they will not seem negative. Saying \"It already failed. Tell me why\" gives everyone permission to spot problems. The team then picks the biggest risks and changes the plan to guard against them. A pre-mortem can take less than half an hour and costs nothing, yet it can catch the flaw that would have sunk the whole effort. Good leaders do this not because they expect to fail, but because they would rather find the flaw on paper than in real life.",
          visual: {
            type: "compare",
            left: {
              title: "Normal kickoff meeting",
              points: ["'Any concerns?'", "People nod to seem supportive", "Doubts stay unspoken", "Problems appear after it is too late"],
            },
            right: {
              title: "Pre-mortem",
              points: ["'It failed. Why?'", "Everyone writes reasons privately first", "Doubts become useful ideas", "The plan changes before it starts"],
            },
          },
          probe: {
            type: "sequence",
            prompt: "Your robotics team is planning a fundraiser. Put the steps of a pre-mortem in order.",
            steps: [
              "Gather the team before the plan begins",
              "Imagine it is three months from now and the fundraiser failed",
              "Each person writes down reasons it failed",
              "Share the reasons and pick the biggest risks",
              "Change the plan to guard against those risks",
            ],
            hint: "A pre-mortem happens before the work starts, and it imagines failure before anyone lists reasons.",
            mistakes: [
              { match: "Put changing the plan before sharing reasons", coach: "You cannot fix the risks until the team has named them. What has to come first?" },
              { match: "Put writing reasons before imagining failure", coach: "The trick only works once everyone pictures the failure as already real. Start there." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why does a pre-mortem usually surface more problems than simply asking, \"Any concerns?\"",
            choices: [
              "It makes the plan fail on purpose",
              "It lets the leader decide everything alone",
              "It takes much less time",
              "It gives everyone permission to name problems without seeming negative",
            ],
            answer: 3,
            why: "Imagining the failure has already happened makes naming problems helpful instead of disloyal.",
            hints: [
              "Nothing actually fails. The team only imagines it to find weak spots.",
              "A pre-mortem pulls ideas from the whole team, not just the leader.",
              "Both can be quick. The difference is in how freely people speak up.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A pre-mortem is like a fire drill for a plan. You walk through the disaster while nothing is burning, so you learn where the exits are before you need them.",
            example:
              "Before a family camping trip, everyone imagines it went terribly and lists why: the tent leaked, nobody packed the stove fuel, the campsite was full. The family then checks the tent, makes a packing list and reserves a site. The trip goes smoothly.",
            simpler: {
              q: "In a pre-mortem, you imagine that the plan has...",
              choices: ["already failed", "already succeeded", "been cancelled"],
              answer: 0,
              why: "A pre-mortem imagines failure so the team can find the reasons ahead of time.",
              hints: [
                "",
                "Imagining success can be fun, but it hides the weak spots. Flip it.",
                "A cancelled plan teaches nothing about how it could go wrong.",
              ],
            },
          },
        },
        {
          title: "Weighing Tradeoffs",
          teach:
            "Every yes is also a no to something else. Economists call the value of the best option you give up the opportunity cost. If you spend Saturdays at a paid job, the cost is not only your effort, but also the practice, rest or family time you gave up. Wise decision makers also ask whether a choice can be undone. Some decisions are like a door you can walk back through: trying a new study method, or testing a product at one market before ordering a thousand. Make those fairly quickly and learn from the results. Others are like a one-way door: signing a contract, missing a deadline that cannot be extended, breaking someone's trust. Those deserve slow, careful thought and good advice. Finally, write your options side by side and name what matters most to you, such as money, time, learning and relationships. Seeing a tradeoff clearly does not make the choice easy, but it makes it honest.",
          visual: {
            type: "flip",
            cards: [
              { front: "Opportunity cost", back: "The value of the best option you give up when you choose. Every yes is a no to something else." },
              { front: "Two-way door", back: "A decision you can easily reverse. Decide fairly quickly, try it and learn." },
              { front: "One-way door", back: "A decision that is hard or impossible to undo. Slow down, gather facts and get advice." },
              { front: "Name your criteria", back: "List what matters most (money, time, learning, relationships) and compare each option against it." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each decision: easy to reverse (decide fairly quickly) or hard to reverse (decide slowly).",
            buckets: ["Easy to reverse", "Hard to reverse"],
            items: [
              { text: "Trying a new morning study routine for a week", bucket: 0 },
              { text: "Signing a two-year phone contract", bucket: 1 },
              { text: "Testing a new cookie recipe at one bake sale", bucket: 0 },
              { text: "Sharing a friend's secret with the whole group", bucket: 1 },
              { text: "Rearranging your desk to see if you focus better", bucket: 0 },
              { text: "Dropping a class after the deadline to rejoin has passed", bucket: 1 },
            ],
            hint: "Ask: if this goes badly, can I simply go back to how things were?",
            mistakes: [
              { match: "Sharing a secret sorted as easy to reverse", coach: "Once a secret is out, you cannot take it back, and broken trust is slow to rebuild. That is a one-way door." },
              { match: "Testing a recipe sorted as hard to reverse", coach: "If the recipe flops, you just go back to the old one. That is a two-way door." },
            ],
            seconds: 45,
          },
          think: {
            q: "You can attend a free two-week robotics camp or work a summer job that pays $1,500 for those two weeks. If you choose the camp, what is its opportunity cost?",
            choices: [
              "Nothing, because the camp is free",
              "The $1,500 and work experience you give up",
              "The price of a robotics kit",
              "Your friends' opinions about robotics",
            ],
            answer: 1,
            why: "Opportunity cost is the value of the best alternative you give up, here the pay and experience of the job.",
            hints: [
              "Free to enter does not mean free to choose. What do you give up by going?",
              "",
              "Nothing in the choice involves buying a kit. Look at the alternative you would lose.",
              "Opinions are not the cost. Look at the best alternative you are passing up.",
            ],
          },
          approaches: {
            analogy:
              "Your time is like a single ticket at a fair. You can use it on the roller coaster or the Ferris wheel, not both. The price of the roller coaster is the Ferris wheel ride you did not take.",
            example:
              "Ethan is offered a weekend job for $120 a weekend. The opportunity cost is the Saturday soccer team and Sunday family dinners. He writes his priorities: saving for a car, fitness, family. He takes Saturday work only and keeps Sunday free, a tradeoff he can explain.",
            simpler: {
              q: "Which decision is hardest to undo?",
              choices: ["Trying a new breakfast cereal", "Testing a new study schedule for a week", "Signing a two-year contract"],
              answer: 2,
              why: "A contract binds you for a long time, so it is a one-way door that deserves careful thought.",
              hints: [
                "If you don't like the cereal, you just buy a different one tomorrow.",
                "A week-long test is easy to stop if it isn't working.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which decision tool fits each situation best?",
        buckets: ["Expected value", "Second-order thinking", "Pre-mortem", "Opportunity cost"],
        items: [
          { text: "Comparing a sure $50 with a 25% chance at $300", bucket: 0 },
          { text: "Weighing a safe plan against a long-shot plan using the odds", bucket: 0 },
          { text: "Asking how other stores will react if you lower your prices", bucket: 1 },
          { text: "Wondering what students will do once phones are banned at lunch", bucket: 1 },
          { text: "Imagining the class trip went wrong and listing why", bucket: 2 },
          { text: "Before launching a business, asking the team to explain its failure", bucket: 2 },
          { text: "Realizing a paid internship means giving up summer travel", bucket: 3 },
          { text: "Counting the practice time you lose by taking an extra shift", bucket: 3 },
        ],
      },
      explain: {
        prompt: "Explain how a wise leader makes a decision when the outcome is uncertain. Use at least three of the tools from this lesson and give an example.",
        keyPoints: [
          "A good decision can have a bad outcome, so judge the reasoning, not just the result",
          "Expected value weighs each payoff by its probability",
          "Second-order thinking asks 'And then what?'",
          "A pre-mortem imagines failure to find risks early",
          "Opportunity cost and whether a choice can be reversed",
          "Takes responsibility for the decision, as Eisenhower did",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A bake sale plan has a 70% chance of earning $400 and a 30% chance of earning $100. What is its expected value, in dollars?",
          answer: 310,
          unit: "dollars",
          hint: "Multiply each payoff by its chance, then add: (0.7 x 400) + (0.3 x 100).",
          mistakes: [
            { match: "250", coach: "That is the simple average of $400 and $100. The outcomes are not equally likely, so weight them by 70% and 30%." },
            { match: "280", coach: "That is only the good outcome. Add the 30% chance of $100 too." },
            { match: "500", coach: "That adds the payoffs without their probabilities. Multiply each by its chance first." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each decision tool to the question it asks.",
          pairs: [
            { left: "Expected value", right: "What is each outcome worth, weighted by its odds?" },
            { left: "Second-order thinking", right: "And then what?" },
            { left: "Pre-mortem", right: "Imagine it failed. Why?" },
            { left: "Opportunity cost", right: "What am I giving up?" },
          ],
          hint: "Think of the rat bounty, the imagined failure, the summer job you pass up and the probability math.",
          mistakes: [
            { match: "Matched pre-mortem to and then what", coach: "A pre-mortem starts from an imagined failure. 'And then what?' traces consequences forward: second-order thinking." },
            { match: "Matched expected value to what am I giving up", coach: "Expected value is about odds and payoffs. Giving something up is opportunity cost." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Judging a decision only by its outcome is sometimes called {0}. The value of the best option you give up is the {1} cost. A decision that is hard to undo deserves {2} and careful thought.",
          blanks: [{ answers: ["resulting"] }, { answers: ["opportunity"] }, { answers: ["slow", "slower"] }],
          bank: ["resulting", "opportunity", "slow", "quick", "hidden", "guessing"],
          hint: "Remember the name for judging by results, the economist's word for what you give up, and how fast to take one-way doors.",
          mistakes: [
            { match: "quick", coach: "Quick decisions fit choices you can easily undo. A one-way door needs the opposite." },
            { match: "hidden", coach: "Some costs are hidden, but the economist's term is opportunity cost." },
            { match: "guessing", coach: "Guessing is not the term. The lesson named the mistake of judging by results." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build the question that opens a pre-mortem.",
          tiles: ["Imagine", "it is six months from now", "and our plan", "has failed.", "What went wrong?"],
          distractors: ["has succeeded.", "Who is to blame?"],
          hint: "A pre-mortem pictures failure and looks for reasons, not people to blame.",
          mistakes: [
            { match: "Used has succeeded", coach: "Picturing success hides the weak spots. A pre-mortem pictures failure." },
            { match: "Used who is to blame", coach: "A pre-mortem hunts for causes so you can fix them, not for someone to blame." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What is 'resulting'?",
          choices: [
            "Judging a decision only by how it turned out",
            "Calculating expected value",
            "Imagining a plan has failed",
            "Listing the results of a survey",
          ],
          answer: 0,
          why: "Resulting means judging a choice by its outcome instead of by the reasoning and information behind it.",
        },
        {
          q: "Why did the 1902 Hanoi rat bounty backfire?",
          choices: [
            "The bounty was too small",
            "Rats moved to another city",
            "People cut off tails and released rats to keep earning bounties",
            "Officials forgot to pay",
          ],
          answer: 2,
          why: "Paying for tails gave people an incentive to keep rats alive and breeding, a classic second-order effect.",
        },
        {
          q: "Who proposed the pre-mortem?",
          choices: ["Dwight Eisenhower", "The psychologist Gary Klein", "James Stagg", "Marcus Aurelius"],
          answer: 1,
          why: "Gary Klein, a psychologist who studies decision making, proposed the pre-mortem.",
        },
        {
          q: "Which decision deserves the slowest, most careful thought?",
          choices: [
            "Trying a new note-taking app",
            "Testing a new route to school",
            "Rearranging your bedroom",
            "Signing a long contract you cannot cancel",
          ],
          answer: 3,
          why: "A contract you cannot cancel is a one-way door, hard to undo, so it deserves slow and careful thought.",
        },
        {
          q: "What did Eisenhower's unused D-Day note show?",
          choices: [
            "He was sure the landings would fail",
            "He took personal responsibility for a decision made under uncertainty",
            "He blamed the weatherman in advance",
          ],
          answer: 1,
          why: "He wrote that any blame or fault was his alone, owning the decision whatever the outcome.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Pick a real decision your family, team or club is facing (a trip, a purchase, a schedule change, a fundraiser). Lead a 20-minute pre-mortem with at least two other people: have everyone imagine it failed and write down why. Then write a one-page decision memo listing the options, the opportunity cost of each, at least one second-order effect, the biggest risks from the pre-mortem and your recommendation.",
        rubric: [
          "Runs a real pre-mortem with at least two other people",
          "Lists at least two options with the opportunity cost of each",
          "Identifies at least one second-order effect",
          "Names the top risks and how the plan changes to address them",
          "Makes a clear recommendation and explains the reasoning",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 3. Leading a team through crisis
    // ------------------------------------------------------------------
    {
      id: "leadership-hs.crisis",
      title: "Leading Through Crisis",
      minutes: 40,
      stage: "logic",
      subject: "Other",
      read: [
        "In January 1915 the ship Endurance froze into the pack ice of Antarctica's Weddell Sea. Ernest Shackleton had come to cross Antarctica on foot. For ten months the ice carried the ship along, and in October it crushed her. The men abandoned ship onto the frozen sea. Shackleton changed the mission at once: bring all 28 men home alive.",
        "He kept daily routines, with set meals, chores and watches, so frightened men had something they could control. When he ordered everyone to carry only a little personal gear, he set the example by dropping his own gold coins in the snow. In April 1916 the men rowed three lifeboats to Elephant Island, their first solid ground in 497 days. On the way, Shackleton gave his own mittens to a man who had lost his.",
        "No ships came to Elephant Island, so Shackleton and five companions sailed the small lifeboat James Caird about 800 miles to South Georgia, then crossed its mountains to a whaling station. He brought along men he feared might cause trouble if left behind. On August 30, 1916, he returned to Elephant Island. All 22 men waiting there were alive.",
        "More than a century earlier, in December 1777, George Washington led about 12,000 soldiers into winter camp at Valley Forge, Pennsylvania. Food, shoes and blankets were scarce, and disease killed nearly 2,000 men before spring. Washington stayed with his army all winter. He pressed Congress for supplies, made Nathanael Greene quartermaster general to fix the supply system, and welcomed Baron von Steuben, who drilled the soldiers into a trained army. In June 1778 a stronger army marched out.",
        "The two stories share a pattern. Name one clear mission. Stay present and share the hardship. Build structure with routines and clear jobs. Care for morale through small, real acts. And offer honest hope: tell the truth about the danger while showing a believable path forward. Crisis leadership is not one grand speech. It is steady, visible choices made every day.",
      ].join("\n\n"),
      keyIdeas: [
        "In a crisis, name one clear mission and let everything else serve it.",
        "Leaders stay present, share hardship and set the example in small, visible ways.",
        "Routines, training and clear jobs turn fear into action.",
        "Honest hope tells the truth about danger while showing a believable way through.",
      ],
      hook: {
        text: "In January 1915 the ship Endurance froze solid into the ice of Antarctica's Weddell Sea. Aboard were 28 men with no way to call for help. Their leader, Ernest Shackleton, had come to cross Antarctica on foot. Now he had a new mission: bring every man home alive. More than a year and a half later, he did. How?",
      },
      teach: [
        {
          title: "Shackleton and the Ice",
          teach:
            "In January 1915, Ernest Shackleton's ship Endurance was trapped by pack ice in the Weddell Sea. For ten months the ice carried the ship slowly along while the crew waited. In October the pressure crushed her hull, and the men abandoned ship onto the frozen sea. Shackleton immediately changed the goal. Crossing Antarctica was over. The only mission now was to bring all 28 men home alive. He kept strict daily routines: meals at set times, chores, night watches, and even football games and sing-alongs on the ice. Routines gave frightened men something they could control. When he ordered each man to keep only a little personal gear, he made the point by dropping his own gold coins in the snow. A clear goal, steady routines and a visible example: these were the first tools of his crisis leadership.",
          visual: {
            type: "hotspots",
            title: "Shackleton's First Moves",
            center: "Crew of 28",
            spots: [
              { label: "One mission", icon: "🎯", detail: "Forget crossing Antarctica. Bring every man home alive." },
              { label: "Routine", icon: "⏰", detail: "Set meals, chores and watches gave each day a shape and each man a job." },
              { label: "Example", icon: "🪙", detail: "He dropped his own gold coins in the snow to show that only essentials mattered now." },
              { label: "Morale", icon: "⚽", detail: "Football on the ice and sing-alongs kept spirits up through the long wait." },
            ],
          },
          probe: {
            type: "cloze",
            text: "When the ice crushed Endurance, Shackleton changed the mission to bringing all {0} men home alive. He kept daily {1} so frightened men had something to control, and he dropped his own gold {2} in the snow to show that only essentials mattered.",
            blanks: [{ answers: ["28", "twenty-eight"] }, { answers: ["routines", "routine"] }, { answers: ["coins", "sovereigns"] }],
            bank: ["28", "routines", "coins", "12", "speeches", "maps", "boots"],
            hint: "Remember the size of the crew, what gave each day its shape, and what valuable thing he threw away.",
            mistakes: [
              { match: "12", coach: "The crew was much larger than that. Count again: how many men were on Endurance?" },
              { match: "speeches", coach: "Shackleton did not lead by speeches. Set meals, chores and watches gave the days their shape." },
              { match: "maps", coach: "Maps were essential. He threw away something valuable but useless on the ice." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why did Shackleton keep strict routines while the men camped on the ice?",
            choices: [
              "To keep the men too tired to complain",
              "Because the ship's rules required it",
              "To give frightened men structure and something they could control",
              "To pass the time until the ice melted completely",
            ],
            answer: 2,
            why: "When almost nothing was in their control, routines gave the men a sense of order, purpose and control.",
            hints: [
              "He wanted the men steady, not exhausted. What does a routine give a frightened person?",
              "The ship was gone. These routines were his choice as a leader.",
              "",
              "The ice was never going to melt away. Routines served a deeper purpose.",
            ],
          },
          approaches: {
            analogy:
              "When a storm knocks out the power at home, a calm parent lights candles, makes dinner at the usual time and starts a board game. Nothing about the storm has changed, but the family feels steady because the evening still has a shape.",
            example:
              "A team captain's season falls apart after the star player is injured. She resets the goal (make the playoffs, not win the title), keeps practice at the same time every day, gives every player a clear role and runs a team dinner each Friday. The team steadies.",
            simpler: {
              q: "After Endurance was crushed, what became Shackleton's new mission?",
              choices: ["Cross Antarctica on foot", "Bring every man home alive", "Find a new ship to keep exploring"],
              answer: 1,
              why: "Shackleton dropped the original goal and focused everything on survival.",
              hints: [
                "That was the original plan, but the crisis changed everything.",
                "",
                "There was no new ship. His goal became much simpler and more urgent.",
              ],
            },
          },
        },
        {
          title: "The Boat Journey",
          teach:
            "In April 1916 the ice broke up, and the men rowed three lifeboats to Elephant Island, standing on solid ground for the first time in 497 days. On that miserable trip, Shackleton handed his own mittens to a man who had lost his, and his fingers were frostbitten. But no ships ever came to Elephant Island. So Shackleton picked five men and sailed a lifeboat less than 23 feet long, the James Caird, about 800 miles across the stormy Southern Ocean to South Georgia. He chose skilled sailors, and he also brought men he feared might stir up trouble if left behind. Keep possible complainers close. After 16 days at sea they landed, and Shackleton and two companions crossed the island's unmapped mountains in about 36 hours to reach a whaling station. On August 30, 1916, he returned to Elephant Island. All 22 men waiting there were alive.",
          visual: {
            type: "timeline",
            events: [
              { year: 1914, label: "Endurance sails", detail: "In December 1914 the ship leaves South Georgia, heading for Antarctica." },
              { year: 1915, label: "Trapped, then crushed", detail: "Frozen in the Weddell Sea in January. Crushed by the ice in October." },
              { year: 1916, label: "Elephant Island and the James Caird", detail: "April: lifeboats reach Elephant Island. Then six men sail about 800 miles to South Georgia in 16 days." },
              { year: 1916, label: "Rescue", detail: "August 30: Shackleton returns to Elephant Island. All 22 men there are alive." },
            ],
          },
          probe: {
            type: "number",
            prompt: "There were 28 men on Endurance. Shackleton took five companions with him on the James Caird. How many men waited on Elephant Island?",
            answer: 22,
            unit: "men",
            hint: "Six men left in the boat: Shackleton plus his five companions. Subtract them from 28.",
            mistakes: [
              { match: "23", coach: "Don't forget Shackleton himself was in the boat too. That makes six who left." },
              { match: "5", coach: "Five is how many companions went with him. The question asks how many stayed behind." },
              { match: "6", coach: "Six men sailed in the James Caird. How many stayed on the island?" },
            ],
            seconds: 30,
          },
          think: {
            q: "Why did Shackleton take men he worried about on the dangerous James Caird voyage?",
            choices: [
              "They were the strongest rowers in the crew",
              "To punish them for complaining",
              "To keep possible complainers close, so they could not hurt the morale of those left behind",
              "Because they volunteered first",
            ],
            answer: 2,
            why: "He protected the morale of the men waiting on the island by keeping potential troublemakers with him.",
            hints: [
              "He did pick skilled sailors, but the lesson names a different reason for these particular men.",
              "Shackleton was not punishing anyone. Think about the 22 men who would be waiting for months.",
              "",
              "The lesson does not say they volunteered. It says what Shackleton feared might happen.",
            ],
          },
          approaches: {
            analogy:
              "A wise teacher seats the most talkative student next to her desk, not to punish him, but so his energy helps the class instead of distracting it. Shackleton did the same with the men he worried about.",
            example:
              "On a group hike, one friend keeps saying the group is lost. The leader asks that friend to walk beside her and help read the map. The complaining stops, the friend feels trusted, and the rest of the group stays calm.",
            simpler: {
              q: "How many of the Endurance crew survived?",
              choices: ["All 28", "About half", "Only the six men in the James Caird"],
              answer: 0,
              why: "Every one of the 28 men on Endurance came home alive.",
              hints: [
                "",
                "The remarkable thing about the story is that no one on Endurance was lost.",
                "Shackleton went back for the others and found all of them alive.",
              ],
            },
          },
        },
        {
          title: "Washington at Valley Forge",
          teach:
            "In December 1777, General George Washington led about 12,000 soldiers of the Continental Army into winter camp at Valley Forge, Pennsylvania. The British had just taken Philadelphia. Many men lacked shoes, blankets and food, and disease spread through the crowded huts. Nearly 2,000 died before spring. Washington did not leave. He stayed in camp all winter and wrote letter after letter pressing Congress for supplies. He also put the right people in the right jobs. He made Nathanael Greene quartermaster general to fix the broken supply system. He welcomed Baron von Steuben, a Prussian officer who drilled a model company of about 100 men and then the whole army in the same marching and fighting methods. When the army marched out in June 1778, it was hungry and worn, but far better organized and trained than when it arrived.",
          visual: {
            type: "hotspots",
            title: "Washington's Moves at Valley Forge",
            center: "Continental Army",
            spots: [
              { label: "Stay present", icon: "⛺", detail: "Washington stayed in camp through the whole winter, beside his suffering army." },
              { label: "Fight for supplies", icon: "✉️", detail: "He wrote Congress again and again about food, clothing and shoes." },
              { label: "Right person, right job", icon: "🧩", detail: "Nathanael Greene took over supply. Baron von Steuben took over training." },
              { label: "Train together", icon: "🥁", detail: "Von Steuben drilled a model company, and its members helped teach the rest of the army." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each leader to the role he played in a crisis.",
            pairs: [
              { left: "George Washington", right: "Stayed in camp all winter and pressed Congress for supplies" },
              { left: "Nathanael Greene", right: "Quartermaster general who fixed the supply system" },
              { left: "Baron von Steuben", right: "Prussian officer who drilled the army" },
              { left: "Ernest Shackleton", right: "Explorer who brought the Endurance crew home" },
            ],
            hint: "One was the commander, one handled supplies, one handled training, and one led in Antarctica.",
            mistakes: [
              { match: "Swapped Greene and von Steuben", coach: "Von Steuben was the Prussian drillmaster. Greene took over the job of getting supplies to the army." },
              { match: "Matched Washington to drilling the army", coach: "Washington chose someone else to train the army. That was the Prussian officer's job." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which move at Valley Forge attacked the root cause of the shortages?",
            choices: [
              "Making Nathanael Greene quartermaster general to fix the supply system",
              "Giving speeches about liberty",
              "Moving the army into Philadelphia",
              "Punishing soldiers who complained",
            ],
            answer: 0,
            why: "The army was short of food and clothing because the supply system was broken. Greene was put in charge of fixing it.",
            hints: [
              "",
              "Speeches can lift spirits, but they do not deliver food or shoes.",
              "The British held Philadelphia. That was not an option.",
              "Punishment does not create supplies. What was actually broken?",
            ],
          },
          approaches: {
            analogy:
              "A coach who knows little about nutrition hires a nutritionist instead of guessing. A great leader does not do every job personally. He finds the right person for each one and backs them up.",
            example:
              "A student running a school food drive is overwhelmed. She asks the most organized volunteer to run collection, the best speaker to make announcements, and she handles the schedule. Donations double because each job has an owner.",
            simpler: {
              q: "About how many soldiers died at Valley Forge that winter?",
              choices: ["About 20", "Nearly 2,000", "More than 50,000"],
              answer: 1,
              why: "Disease and hardship killed nearly 2,000 of the roughly 12,000 soldiers.",
              hints: [
                "The losses were far greater than that. Disease spread through the crowded camp.",
                "",
                "The whole army was only about 12,000 soldiers.",
              ],
            },
          },
        },
        {
          title: "Principles of Crisis Leadership",
          teach:
            "Put Shackleton and Washington side by side, and a pattern appears. First, a clear mission: when everything changes, name the one goal that matters most. Second, presence: both leaders stayed with their people and shared the hardship instead of retreating to comfort. Third, structure: routines, drills and clear jobs turn fear into action. Fourth, care for morale: a pair of mittens, a game on the ice, a letter fighting for shoes. Fifth, honest hope. Neither man pretended things were fine. Both told the truth about the danger while showing a believable path forward. False cheer breaks trust the moment reality arrives, and pure gloom drains the will to keep going. Crisis leadership is rarely about one grand speech. It is about steady, visible choices, repeated every day, that help people believe the group can make it.",
          visual: {
            type: "compare",
            left: {
              title: "Honest hope",
              points: ["'This is serious, and here is our plan'", "Shares bad news early", "Shows the next small step", "Builds trust that lasts"],
            },
            right: {
              title: "False cheer",
              points: ["'Don't worry, everything is fine'", "Hides bad news", "Promises what it can't deliver", "Breaks trust when reality arrives"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Your group project is in crisis: a teammate quit and the deadline is in three days. Sort each leadership move.",
            buckets: ["Builds trust", "Erodes trust"],
            items: [
              { text: "Telling the team the real situation and a plan to finish", bucket: 0 },
              { text: "Saying everything is fine when it obviously is not", bucket: 1 },
              { text: "Taking on the hardest leftover task yourself", bucket: 0 },
              { text: "Going silent in the group chat until it is over", bucket: 1 },
              { text: "Giving each person one clear job and a time to finish it", bucket: 0 },
              { text: "Blaming the teammate who quit in front of everyone", bucket: 1 },
              { text: "Checking in every evening for ten minutes", bucket: 0 },
              { text: "Changing the plan every few hours without explaining", bucket: 1 },
            ],
            hint: "Ask: does this move show presence, structure, care or honest hope? Or does it hide, blame or confuse?",
            mistakes: [
              { match: "Saying everything is fine sorted as builds trust", coach: "It may sound comforting, but false cheer breaks trust as soon as the team sees the truth." },
              { match: "Taking the hardest task sorted as erodes trust", coach: "Sharing the hardship is exactly what Shackleton and Washington did. It builds trust." },
            ],
            seconds: 50,
          },
          think: {
            q: "In a crisis, a team captain keeps saying, \"Don't worry, nothing is wrong.\" What is the main danger?",
            choices: [
              "The team will work too hard",
              "The team will become too hopeful to function",
              "There is no real danger in staying positive",
              "Trust breaks when the truth comes out",
            ],
            answer: 3,
            why: "False cheer breaks trust the moment reality arrives. Honest hope tells the truth and shows a way forward.",
            hints: [
              "Being told nothing is wrong usually makes people relax, not work harder.",
              "The deeper problem is not too much hope but hope built on something untrue.",
              "Positive is good when it is honest. Here the captain is saying something false.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A good mountain guide does not tell climbers the storm is nothing. She says, 'A storm is coming, and here is where we will shelter.' The climbers trust her because she told the truth, so they believe the plan.",
            example:
              "A family business loses its biggest customer. The owner gathers the staff: 'We lost 30 percent of our sales. Nobody is losing their job this month. Here are three customers we will go after this week, and I will be making calls with you.' Clear mission, presence and honest hope.",
            simpler: {
              q: "Which is an example of a leader's presence in a crisis?",
              choices: ["Staying with the team during the hardest part", "Sending one email from vacation", "Hiring someone else to handle it all"],
              answer: 0,
              why: "Presence means staying with your people and sharing the hardship, as Shackleton and Washington did.",
              hints: [
                "",
                "An email from far away is the opposite of being present.",
                "Delegating can be wise, but leaving it all to someone else is not presence.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Whose story is it? Sort each fact.",
        buckets: ["Shackleton", "Washington", "Both"],
        items: [
          { text: "Dropped his gold coins in the snow", bucket: 0 },
          { text: "Sailed about 800 miles in a small lifeboat", bucket: 0 },
          { text: "Gave away his mittens to a man who had lost his", bucket: 0 },
          { text: "Wrote again and again to Congress for supplies", bucket: 1 },
          { text: "Put Nathanael Greene in charge of supply", bucket: 1 },
          { text: "Welcomed a Prussian officer to drill his soldiers", bucket: 1 },
          { text: "Stayed with his people through the worst of the crisis", bucket: 2 },
          { text: "Used routines and clear jobs to turn fear into action", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Using Shackleton and Washington as examples, explain what a leader should do when a team faces a crisis.",
        keyPoints: [
          "Name one clear mission",
          "Stay present and share the hardship",
          "Build structure with routines, training and clear jobs",
          "Care for morale with small, real acts",
          "Offer honest hope instead of false cheer",
          "Gives at least one accurate example from Shackleton or Valley Forge",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place each event on the timeline.",
          min: 1750,
          max: 1950,
          step: 1,
          tolerance: 3,
          items: [
            { label: "Washington's army enters Valley Forge", value: 1777 },
            { label: "Endurance is trapped in the Weddell Sea ice", value: 1915 },
          ],
          hint: "Valley Forge was during the American Revolution. Endurance was trapped during the same years as World War I.",
          mistakes: [
            { match: "Placed Valley Forge after 1800", coach: "Valley Forge was during the Revolutionary War, which ended in 1783." },
            { match: "Placed Endurance before 1900", coach: "Shackleton's expedition was in the twentieth century, during World War I." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "The Valley Forge encampment lasted from December 19, 1777 to June 19, 1778. How many months did the army stay?",
          answer: 6,
          unit: "months",
          hint: "Count month by month from December 19 to June 19.",
          mistakes: [
            { match: "7", coach: "Count carefully: December 19 to January 19 is one month. Keep going until June 19." },
            { match: "5", coach: "Count December to January as the first month, and keep going until June." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "In a crisis, a leader names one clear {0}, stays {1} with the team, and offers honest {2} instead of false cheer.",
          blanks: [{ answers: ["mission", "goal"] }, { answers: ["present"] }, { answers: ["hope"] }],
          bank: ["mission", "present", "hope", "distant", "excuse", "fear"],
          hint: "Shackleton's mission, Washington's choice to stay in camp, and the opposite of false cheer.",
          mistakes: [
            { match: "distant", coach: "Both leaders did the opposite of staying distant. They shared the hardship." },
            { match: "fear", coach: "Leaders tell the truth about danger, but they offer something more: a believable way through." },
            { match: "excuse", coach: "A crisis leader does not hand out excuses. What is the one thing everything else serves?" },
          ],
          seconds: 35,
        },
        {
          type: "sequence",
          prompt: "Put the Endurance story in order.",
          steps: [
            "Endurance is trapped in the pack ice",
            "The ice crushes the ship, and the men camp on the frozen sea",
            "Three lifeboats reach Elephant Island",
            "Six men sail the James Caird to South Georgia",
            "Shackleton crosses South Georgia's mountains to a whaling station",
            "Shackleton returns and rescues all 22 men on Elephant Island",
          ],
          hint: "Ship trapped, ship lost, island reached, boat journey, mountain crossing, rescue.",
          mistakes: [
            { match: "Put the James Caird before Elephant Island", coach: "The James Caird set out from Elephant Island, so the men had to reach the island first." },
            { match: "Put the mountain crossing before the boat journey", coach: "The mountains were on South Georgia. They had to sail there first." },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "After Endurance was crushed, what was Shackleton's mission?",
          choices: ["Cross Antarctica on foot", "Find gold", "Bring all 28 men home alive", "Map the Weddell Sea"],
          answer: 2,
          why: "He dropped the original goal and focused the whole crew on one mission: survival for everyone.",
        },
        {
          q: "Why did Shackleton keep routines on the ice?",
          choices: [
            "To give frightened men structure and a sense of control",
            "Because he enjoyed giving orders",
            "To prepare for a football tournament",
          ],
          answer: 0,
          why: "Routines turned fear into action and gave each man something he could control.",
        },
        {
          q: "What did Baron von Steuben do at Valley Forge?",
          choices: [
            "Brought food from France",
            "Drilled the army in the same marching and fighting methods",
            "Led the British army",
            "Served as quartermaster general",
          ],
          answer: 1,
          why: "Von Steuben drilled a model company and then the whole army, turning it into a better-trained force.",
        },
        {
          q: "What is the difference between honest hope and false cheer?",
          choices: [
            "Honest hope ignores bad news",
            "There is no difference",
            "False cheer always tells the truth",
            "Honest hope tells the truth about danger and shows a believable way forward",
          ],
          answer: 3,
          why: "False cheer hides the truth and breaks trust. Honest hope faces the facts and offers a real plan.",
        },
        {
          q: "What do Shackleton and Washington have in common?",
          choices: [
            "Both stayed with their people through the worst of the crisis",
            "Both were explorers",
            "Both lived in the 1900s",
          ],
          answer: 0,
          why: "Both leaders stayed present and shared the hardship rather than retreating to comfort.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Lead a real family project that takes at least a few hours and involves at least two other people: cleaning out the garage, planting a garden, preparing a holiday meal or organizing a yard sale. Before you start, name the mission, give each person a clear job and set a check-in time. When something goes wrong (it will), practice honest hope. Afterward, write or tell a parent: what went well, what went wrong and what you would do differently as a leader.",
        rubric: [
          "States one clear mission at the start",
          "Gives each person a clear job and checks in during the work",
          "Handles at least one problem calmly with honest communication",
          "Works alongside the team, not just giving orders",
          "Reflects honestly on what to do better next time",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 4. Persuasion and public speaking
    // ------------------------------------------------------------------
    {
      id: "leadership-hs.persuasion",
      title: "Persuasion and Public Speaking",
      minutes: 40,
      stage: "rhetoric",
      read: [
        "On November 19, 1863, the famous orator Edward Everett spoke for about two hours at the dedication of a soldiers' cemetery in Gettysburg, Pennsylvania. Then President Abraham Lincoln spoke for about two minutes. The next day Everett wrote to Lincoln that he wished he had come as near the central idea of the occasion in two hours as Lincoln had in two minutes.",
        "More than 2,300 years ago, Aristotle explained that speakers persuade in three ways. Ethos is the speaker's character and credibility. Logos is reasoning and evidence. Pathos is the emotion the speech stirs in the audience. Strong speeches use all three. The Roman teacher Quintilian described the ideal orator as a good person skilled in speaking.",
        "Lincoln's address is about 270 words long, yet it moves through past, present and future. It opens with \"Four score and seven years ago,\" pointing back 87 years to 1776. It turns to the present war and the soldiers buried there. It ends with the future: a \"new birth of freedom\" and government \"of the people, by the people, for the people.\" Three parallel parts like that are called a tricolon.",
        "In June 1940, after France fell, Winston Churchill spoke to the House of Commons. He began with an honest account of the danger, gave reasons for confidence, named the stakes and called his listeners to duty, ending with the hope that people a thousand years later would say, \"This was their finest hour.\"",
        "Roman teachers such as Cicero divided the speaker's craft into five canons: invention, arrangement, style, memory and delivery. Most beginners work only on the words. Great speakers rehearse until they can look their audience in the eye, slow down and pause before the line that matters most.",
        "Persuasion is not trickery. At its best it is helping people see something true and care enough to act on it.",
      ].join("\n\n"),
      keyIdeas: [
        "Aristotle's three appeals: ethos (credibility), logos (reasoning) and pathos (emotion). Strong speeches use all three.",
        "Lincoln's Gettysburg Address moves from past to present to future in about 270 words.",
        "Churchill paired honest facts about danger with reasons for hope and a call to duty.",
        "The five canons (invention, arrangement, style, memory, delivery) show that great speaking is mostly preparation.",
      ],
      hook: {
        text: "On November 19, 1863, the famous speaker Edward Everett talked for about two hours at a new soldiers' cemetery in Gettysburg. Then President Abraham Lincoln stood and spoke for about two minutes. The next day Everett wrote to Lincoln that he wished he had come as close to the heart of the occasion in two hours as Lincoln had in two minutes. Today almost no one reads Everett's speech. What made about 270 words more powerful than two hours?",
      },
      teach: [
        {
          title: "Aristotle's Three Appeals",
          teach:
            "More than 2,300 years ago, Aristotle wrote the Rhetoric, a book on the art of persuasion. He said a speaker persuades in three ways. Ethos is the character of the speaker: do listeners trust that you know the subject and mean them well? Logos is the reasoning: facts, evidence and logical steps. Pathos is the emotion the speech stirs in the audience: hope, pride, sympathy, resolve. Strong speeches use all three. A speaker with brilliant logic but no credibility gets ignored. A speaker who stirs feelings without evidence may win the moment but lose the argument later, and a thoughtful audience will feel manipulated. Persuasion done well is not trickery. It is helping people see something true and care enough to act on it. That is why the Roman teacher Quintilian described the ideal orator as a good person skilled in speaking.",
          visual: {
            type: "hotspots",
            title: "Aristotle's Three Appeals",
            center: "Persuasion",
            spots: [
              { label: "Ethos", icon: "🛡️", detail: "Character and credibility. Why should the audience trust you on this?" },
              { label: "Logos", icon: "📊", detail: "Reasoning and evidence: facts, numbers, examples and clear logic." },
              { label: "Pathos", icon: "❤️", detail: "Emotion: helping the audience feel why this matters, honestly and without manipulation." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "You are persuading the town council to fund a new public library branch. Sort each line by the appeal it uses most.",
            buckets: ["Ethos", "Logos", "Pathos"],
            items: [
              { text: "I have volunteered at the library every Saturday for three years.", bucket: 0 },
              { text: "As a certified librarian, I have seen what a branch can do.", bucket: 0 },
              { text: "The current branch serves 40,000 people, twice its planned capacity.", bucket: 1 },
              { text: "A new branch would cut the average drive from 25 minutes to 8.", bucket: 1 },
              { text: "Picture a child walking out with her first library card, beaming.", bucket: 2 },
              { text: "For a lonely grandfather, the library is where he finds friends.", bucket: 2 },
            ],
            hint: "Ethos is about the speaker's trustworthiness. Logos is numbers and logic. Pathos paints a picture you feel.",
            mistakes: [
              { match: "Volunteering for three years sorted as pathos", coach: "This line tells you why to trust the speaker. That is credibility: ethos." },
              { match: "The 40,000 people line sorted as ethos", coach: "Numbers and capacity are evidence. That is logos." },
              { match: "The child with a library card sorted as logos", coach: "There is no data here. It paints a picture meant to make you feel something: pathos." },
            ],
            seconds: 50,
          },
          think: {
            q: "A speaker says, \"I've coached this team for twenty years, and I've never seen a better chance to win.\" Which appeal is this mainly?",
            choices: ["Logos", "Pathos", "Ethos", "None of them"],
            answer: 2,
            why: "Pointing to twenty years of experience builds the speaker's credibility. That is ethos.",
            hints: [
              "There are no statistics or logical steps here. What is the speaker leaning on?",
              "It may stir some feeling, but the main support is the speaker's experience.",
              "",
              "Every persuasive line uses some appeal. Which one rests on who the speaker is?",
            ],
          },
          approaches: {
            analogy:
              "Think of a three-legged stool: credibility, reasoning and emotion. Take away one leg and the stool tips over. A speech needs all three to stand.",
            example:
              "Asking parents for a later curfew: Ethos: 'I've been home on time every night for six months.' Logos: 'The game ends at 10:30, and the drive is fifteen minutes.' Pathos: 'It's the last game of the season, and I'd hate to be the only one who leaves early.' Together they make a strong case.",
            simpler: {
              q: "Which appeal uses facts and evidence?",
              choices: ["Logos", "Ethos", "Pathos"],
              answer: 0,
              why: "Logos is the appeal to reasoning, facts and evidence.",
              hints: [
                "",
                "Ethos is about the speaker's character and credibility.",
                "Pathos is about emotion, not evidence.",
              ],
            },
          },
        },
        {
          title: "Lincoln at Gettysburg",
          teach:
            "Lincoln's Gettysburg Address is about 270 words, yet it carries the whole meaning of the war in three movements. It begins in the past: \"Four score and seven years ago our fathers brought forth on this continent, a new nation.\" A score is twenty, so four score and seven is 87 years, pointing back to 1776 and the Declaration of Independence. It moves to the present: \"Now we are engaged in a great civil war,\" and the duty owed to the soldiers buried there. It ends with the future: that the nation \"shall have a new birth of freedom\" and that government \"of the people, by the people, for the people, shall not perish from the earth.\" That closing phrase uses a tricolon, three parallel parts that build rhythm. Past, present, future: a simple structure any speech can borrow.",
          visual: {
            type: "flip",
            cards: [
              { front: "Past", back: "\"Four score and seven years ago our fathers brought forth on this continent, a new nation...\"" },
              { front: "Present", back: "\"Now we are engaged in a great civil war, testing whether that nation... can long endure.\"" },
              { front: "Future", back: "\"...that this nation, under God, shall have a new birth of freedom...\"" },
              { front: "Tricolon", back: "Three parallel parts that build rhythm: \"of the people, by the people, for the people.\"" },
            ],
          },
          probe: {
            type: "number",
            prompt: "Lincoln spoke in 1863. \"Four score and seven years ago\" points back to which year?",
            answer: 1776,
            hint: "A score is twenty. Work out four score and seven, then subtract it from 1863.",
            mistakes: [
              { match: "1816", coach: "That treats a score as ten. A score is twenty, so four score is eighty." },
              { match: "1783", coach: "That counts back 80 years. Remember the 'and seven'." },
              { match: "1787", coach: "1787 is when the Constitution was written, but Lincoln's math points back exactly 87 years." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why does the Gettysburg Address begin by looking back 87 years?",
            choices: [
              "To show off Lincoln's arithmetic",
              "To list the battles of the war",
              "To connect the war to the nation's founding ideals",
              "To fill time before the main speech",
            ],
            answer: 2,
            why: "Pointing back to 1776 ties the sacrifice at Gettysburg to the ideals of the Declaration of Independence.",
            hints: [
              "'Four score and seven' is poetic, not a math lesson. What happened 87 years earlier?",
              "Lincoln names no battles. He points to the nation's beginning.",
              "",
              "Lincoln's speech was famously short. Every line has a purpose.",
            ],
          },
          approaches: {
            analogy:
              "Past, present, future is like a story about a family house: where it came from, the storm hitting it now, and what we must do so our grandchildren can live in it. Listeners follow it easily because it moves through time.",
            example:
              "A student speech for a school fundraiser: Past: 'Fifty years ago, families built this school's first library by hand.' Present: 'Today its roof leaks onto the books.' Future: 'With your help, students fifty years from now will read in that same room.'",
            simpler: {
              q: "How many years is a score?",
              choices: ["Ten", "Twenty", "One hundred"],
              answer: 1,
              why: "A score is twenty, so four score is eighty.",
              hints: [
                "Ten would be a decade. A score is a different number.",
                "",
                "A hundred is a century. A score is much smaller.",
              ],
            },
          },
        },
        {
          title: "Churchill's Finest Hour",
          teach:
            "In June 1940, France had fallen to Nazi Germany, and Britain stood nearly alone. On June 18, Prime Minister Winston Churchill spoke to the House of Commons and later read the speech on the radio. Study its structure. He began with an honest account of the danger, refusing to hide the bad news. He then gave reasons for confidence: the navy, the air force and the strength of the people. He named the stakes plainly: if Britain failed, the whole world could sink into a new Dark Age. Finally he called his listeners to their duty and showed them how the future would see them. Brace yourselves to your duties, he said, so that if the British Empire lasts a thousand years, people will still say, \"This was their finest hour.\" Honest facts, reasons for hope, clear stakes, a call to duty and a vision of the future.",
          visual: {
            type: "compare",
            left: {
              title: "A weak crisis speech",
              points: ["Hides or softens the bad news", "Vague promises that all will be well", "No clear stakes", "Ends without asking anything of the audience"],
            },
            right: {
              title: "Churchill, June 1940",
              points: ["Honest account of the danger", "Specific reasons for confidence", "Plain stakes for the whole world", "A call to duty and a picture of the future"],
            },
          },
          probe: {
            type: "sequence",
            prompt: "Put the parts of Churchill's 'finest hour' speech in the order he used them.",
            steps: [
              "Give an honest account of the danger",
              "Offer specific reasons for confidence",
              "Name the stakes plainly",
              "Call listeners to their duty",
              "Paint how the future will remember them",
            ],
            hint: "He started with the hard truth, then gave hope, then raised the stakes, then asked for action and ended with the future.",
            mistakes: [
              { match: "Put reasons for confidence first", coach: "Churchill earned trust by telling the hard truth first. Hope came after." },
              { match: "Put the call to duty first", coach: "You ask people to act after they understand the danger and the stakes." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Churchill start with an honest account of the danger?",
            choices: [
              "To frighten people into giving up",
              "Because he had nothing else to say",
              "To blame other countries",
              "Because people trust a leader who tells the truth, so his hope would be believed",
            ],
            answer: 3,
            why: "By telling the truth first, he earned the credibility (ethos) that made his reasons for hope believable.",
            hints: [
              "He wanted the opposite of surrender. What does honesty build in an audience?",
              "He had plenty to say. The order was a choice.",
              "Blame was not the point. Think about trust.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A doctor who says 'This will hurt, and here is why it is worth it' is trusted more than one who says 'This won't hurt a bit.' Honesty first makes the encouragement believable.",
            example:
              "A captain speaks before the championship: 'They beat us by twenty points in October. (Honest danger.) But we have won eight straight and our defense is the best in the league. (Reasons.) This is the last game some of our seniors will ever play. (Stakes.) Play every possession like it is the last. (Duty.) Ten years from now, we'll remember tonight. (Future.)'",
            simpler: {
              q: "What had just happened before Churchill's June 18, 1940 speech?",
              choices: ["France had fallen to Germany", "The war had ended", "Britain had conquered Germany"],
              answer: 0,
              why: "France fell in June 1940, leaving Britain nearly alone against Nazi Germany.",
              hints: [
                "",
                "The war continued for five more years after 1940.",
                "Britain was in great danger, not winning easily.",
              ],
            },
          },
        },
        {
          title: "Delivery: The Five Canons",
          teach:
            "Roman teachers such as Cicero divided the art of speaking into five canons. Invention is finding what to say: your argument and evidence. Arrangement is putting it in the best order. Style is choosing the words. Memory is knowing the speech well enough to look at your audience instead of your notes. Delivery is your voice, pace, pauses and gestures. Most beginners spend all their time on style and almost none on memory and delivery. Churchill, one of the great speakers of his century, worked over his major speeches many times and had them typed in short broken lines, like a poem, so he could see where to breathe and pause. The practical rules follow: speak slower than feels natural, pause before and after your key line, look at real faces, and rehearse out loud at least three times. Confidence is mostly preparation.",
          visual: {
            type: "sequence",
            prompt: "The five canons, in the order you prepare a speech",
            steps: [
              "Invention: find your argument and evidence",
              "Arrangement: put it in the best order",
              "Style: choose strong, clear words",
              "Memory: know it well enough to look up",
              "Delivery: voice, pace, pauses and gestures",
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each of the five canons to what it means.",
            pairs: [
              { left: "Invention", right: "Finding your argument and evidence" },
              { left: "Arrangement", right: "Putting ideas in the best order" },
              { left: "Style", right: "Choosing the words" },
              { left: "Memory", right: "Knowing it well enough to look at the audience" },
              { left: "Delivery", right: "Voice, pace, pauses and gestures" },
            ],
            hint: "Think of building a speech from scratch: what to say, what order, what words, knowing it, then giving it.",
            mistakes: [
              { match: "Swapped invention and style", coach: "Invention is deciding what to say. Style is choosing how to word it." },
              { match: "Swapped memory and delivery", coach: "Memory is knowing the speech. Delivery is how you use your voice and body when you give it." },
            ],
            seconds: 50,
          },
          think: {
            q: "A student writes an excellent speech but reads it word for word, never looking up. Which canon did she neglect most?",
            choices: ["Invention", "Style", "Arrangement", "Memory"],
            answer: 3,
            why: "Memory means knowing the speech well enough to look at your audience instead of your notes.",
            hints: [
              "Her argument was excellent, so invention was strong.",
              "The words were well chosen. The problem is how well she knew them.",
              "The order was fine. The issue is that she couldn't look up.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Writing a speech without rehearsing is like learning a piano piece by reading the sheet music once. You know what the notes are, but you can't play it for anyone until your hands know it.",
            example:
              "Sofia has a three-minute speech. She writes it (invention, arrangement, style), then types it in short lines with a slash where she will pause. She says it aloud five times, twice to her family. On the day, she glances at her notes only twice and pauses before her last line. It lands.",
            simpler: {
              q: "Which canon is about voice, pace and pauses?",
              choices: ["Delivery", "Invention", "Arrangement"],
              answer: 0,
              why: "Delivery is how you give the speech: voice, pace, pauses and gestures.",
              hints: [
                "",
                "Invention is finding what to say, before you ever speak.",
                "Arrangement is the order of ideas, not how you sound.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every line that uses a tricolon: exactly three parallel parts.",
        sentences: [
          "Government of the people, by the people, for the people.",
          "I came, I saw, I conquered.",
          "Thank you all for coming out tonight.",
          "We will study harder, we will practice longer, we will finish stronger.",
          "I have nothing to offer but blood, toil, tears and sweat.",
          "The meeting will begin at seven o'clock.",
        ],
        correct: [0, 1, 3],
      },
      explain: {
        prompt: "Explain what makes a speech persuasive. Use Aristotle's three appeals and at least one example from Lincoln or Churchill.",
        keyPoints: [
          "Ethos is the speaker's credibility and character",
          "Logos is reasoning and evidence",
          "Pathos is emotion, used honestly",
          "A clear structure, such as past, present, future",
          "Delivery and rehearsal: pace, pauses, eye contact",
          "An accurate example from Lincoln or Churchill",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each line or idea to its source.",
          pairs: [
            { left: "\"Four score and seven years ago...\"", right: "Abraham Lincoln" },
            { left: "\"This was their finest hour.\"", right: "Winston Churchill" },
            { left: "Ethos, logos and pathos", right: "Aristotle" },
            { left: "The ideal orator is a good person skilled in speaking", right: "Quintilian" },
          ],
          hint: "One spoke at Gettysburg, one spoke in 1940, one wrote the Rhetoric, one was a Roman teacher.",
          mistakes: [
            { match: "Swapped Aristotle and Quintilian", coach: "Aristotle, the Greek, named the three appeals. Quintilian, the Roman teacher, described the good person skilled in speaking." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Everett spoke for about 2 hours. Lincoln spoke for about 2 minutes. About how many times longer was Everett's speech?",
          answer: 60,
          hint: "Change 2 hours into minutes first, then divide by 2.",
          mistakes: [
            { match: "120", coach: "120 is how many minutes Everett spoke. Divide by Lincoln's 2 minutes." },
            { match: "1", coach: "Both numbers are 2, but the units are different. Convert hours to minutes first." },
          ],
          seconds: 35,
        },
        {
          type: "build",
          prompt: "Build the closing tricolon of the Gettysburg Address.",
          tiles: ["government", "of the people,", "by the people,", "for the people,", "shall not perish", "from the earth."],
          distractors: ["over the people,", "shall rule forever"],
          hint: "Three short parallel phrases, then a promise about the future.",
          mistakes: [
            { match: "Used over the people", coach: "Lincoln's point is that the people govern themselves, not that government stands over them." },
            { match: "Used shall rule forever", coach: "Lincoln's ending is more modest and more moving: such government shall not perish." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Aristotle's appeal to reasoning and evidence is {0}, and his appeal to emotion is {1}. Knowing your speech well enough to look at the audience is the canon of {2}.",
          blanks: [{ answers: ["logos"] }, { answers: ["pathos"] }, { answers: ["memory"] }],
          bank: ["logos", "pathos", "memory", "ethos", "style", "invention"],
          hint: "Logic sounds like one of the Greek words. Sympathy sounds like the other. The canon is about not needing your notes.",
          mistakes: [
            { match: "ethos", coach: "Ethos is the speaker's character and credibility, not reasoning or emotion." },
            { match: "style", coach: "Style is choosing words. The canon that lets you look up is knowing the speech by heart." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which of Aristotle's appeals is about the speaker's credibility?",
          choices: ["Logos", "Pathos", "Ethos"],
          answer: 2,
          why: "Ethos is the appeal of character: whether the audience trusts the speaker.",
        },
        {
          q: "What structure does the Gettysburg Address follow?",
          choices: [
            "Past, present, future",
            "Problem, villain, hero",
            "A list of battles in order",
            "Questions and answers",
          ],
          answer: 0,
          why: "It begins with the founding, turns to the present war and ends with the nation's future.",
        },
        {
          q: "How did Churchill begin his 'finest hour' speech?",
          choices: [
            "With a joke",
            "By promising quick victory",
            "With an honest account of the danger",
            "By blaming France",
          ],
          answer: 2,
          why: "He told the hard truth first, which made his reasons for hope believable.",
        },
        {
          q: "Which canon of rhetoric is about voice, pace, pauses and gestures?",
          choices: ["Invention", "Arrangement", "Style", "Delivery"],
          answer: 3,
          why: "Delivery is how the speech is actually given.",
        },
        {
          q: "What is a tricolon?",
          choices: [
            "Three parallel parts that build rhythm",
            "A speech with three speakers",
            "A three-hour speech",
          ],
          answer: 0,
          why: "A tricolon groups three parallel parts, like 'of the people, by the people, for the people.'",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Write and give a 3-minute persuasive speech to your family on a topic from history, science, business or character (for example, why everyone should learn to cook, or why a historical figure deserves to be remembered). Use past, present, future or Churchill's structure, include all three appeals and one tricolon, and rehearse out loud at least three times. Deliver it standing, with eye contact, and ask a parent to time it.",
        rubric: [
          "Speech is close to 3 minutes and has a clear structure",
          "Uses ethos, logos and pathos, each at least once",
          "Includes at least one tricolon",
          "Delivered with eye contact, clear pace and at least one deliberate pause",
          "Shows evidence of rehearsal (rarely reads from notes)",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 5. Integrity under pressure
    // ------------------------------------------------------------------
    {
      id: "leadership-hs.integrity",
      title: "Integrity Under Pressure",
      minutes: 35,
      stage: "rhetoric",
      subject: "Other",
      read: [
        "The Roman Republic allowed for a dictator in emergencies: one man with nearly total power for up to six months. In 458 BC, according to the historian Livy, an enemy trapped a Roman army, and the Senate turned to Cincinnatus, a former consul working his small farm. He took command, rescued the army and, on the sixteenth day, resigned and went home to his plow. Historians debate the details, but the Romans told the story for centuries because of its lesson: power is lent for a duty, not kept as a prize.",
        "In March 1783 the American Revolution was nearly won, but army officers at Newburgh, New York, had gone months or years without pay. An anonymous letter urged them to defy Congress. George Washington walked into their meeting and asked them not to stain their honor. When he paused to read a letter, he put on glasses most of them had never seen him wear, saying he had grown gray and almost blind in the service of his country. Many were moved, and the threat collapsed.",
        "That December, Washington resigned his command to Congress and went home to Mount Vernon. Americans compared him to Cincinnatus. Years later, after two terms as President, he stepped aside again.",
        "Integrity under pressure also means keeping your word when it costs you. An old psalm praises the person who \"sweareth to his own hurt, and changeth not.\" Romans told of Regulus, a captured general sent home on his oath to argue for peace, who instead urged Rome to keep fighting and then returned to his captors as he had promised.",
        "Most of our tests are smaller, and they usually arrive with excuses: everyone does it, just this once, no one will know. That is why people of integrity decide their personal code before the pressure comes. In the moment, the excuses always sound reasonable.",
      ].join("\n\n"),
      keyIdeas: [
        "Cincinnatus and Washington treated power as a duty to be given back, not a prize to keep.",
        "At Newburgh, Washington used his own example of sacrifice to keep the army loyal to civilian government.",
        "Integrity means keeping your word even when it costs you.",
        "Decide your personal code before the pressure comes, and learn to spot the excuses that come first.",
      ],
      hook: {
        text: "In 458 BC, according to the Roman historian Livy, messengers from the Senate found a man named Cincinnatus working his small farm. A Roman army was trapped by an enemy, and the Senate had named him dictator, with nearly unlimited power for up to six months. He put on his toga and went. He rescued the army, and then, on the sixteenth day, he gave the power back and returned to his plow. Why would anyone hand back that much power so fast?",
      },
      teach: [
        {
          title: "Cincinnatus and the Plow",
          teach:
            "The Roman Republic allowed for a dictator in emergencies: one man with nearly total power for up to six months. In 458 BC, the historian Livy tells us, an enemy people called the Aequi trapped a Roman army, and the Senate turned to Lucius Quinctius Cincinnatus, a former consul working his own small farm. He took command, raised a new force, freed the trapped army and celebrated a triumph in Rome. Then, on the sixteenth day, he resigned and went home to his fields. Historians debate how much of Livy's story is exact, but the Romans told it for centuries because of its lesson: power is a tool lent for a duty, not a prize to keep. A person of integrity holds authority loosely. The real test of character is not what you do to get power, but what you do when you could keep it.",
          visual: {
            type: "compare",
            left: {
              title: "Power as a prize",
              points: ["'I earned this, so it's mine'", "Finds reasons to stay longer", "Serves the one who holds it", "Feels threatened by limits"],
            },
            right: {
              title: "Power as a duty",
              points: ["'I was trusted with this for a reason'", "Hands it back when the job is done", "Serves the people it was given for", "Welcomes limits"],
            },
          },
          probe: {
            type: "cloze",
            text: "The Roman Senate named Cincinnatus {0}, an emergency office that could last up to {1} months. He rescued the army and resigned on the {2} day.",
            blanks: [{ answers: ["dictator"] }, { answers: ["six", "6"] }, { answers: ["sixteenth", "16th"] }],
            bank: ["dictator", "six", "sixteenth", "king", "twelve", "hundredth"],
            hint: "Remember the name of Rome's emergency office, how long it could last, and how quickly he gave it back.",
            mistakes: [
              { match: "king", coach: "Rome had thrown out its kings long before. The emergency office had a different name and a time limit." },
              { match: "twelve", coach: "The office was shorter than a year. It could last up to half a year." },
              { match: "hundredth", coach: "He gave the power back much faster than that, in barely more than two weeks." },
            ],
            seconds: 40,
          },
          think: {
            q: "What lesson did the Romans draw from the Cincinnatus story?",
            choices: [
              "Take power whenever you can get it",
              "Power is a tool lent for a duty, to be given back when the job is done",
              "Farmers make the best soldiers",
              "Never accept responsibility",
            ],
            answer: 1,
            why: "Cincinnatus used his power for the emergency and then handed it back, showing it belonged to the duty, not to him.",
            hints: [
              "Cincinnatus did the opposite. He gave power back early.",
              "",
              "He was a farmer, but the story is about what he did with power.",
              "He accepted a huge responsibility. The lesson is about what he did afterward.",
            ],
          },
          approaches: {
            analogy:
              "A substitute teacher who takes over a class for a week does not try to keep the job when the regular teacher returns. She does the work well, then hands the class back. The job was borrowed, not owned.",
            example:
              "Liam is named acting captain while the captain recovers from an injury. He leads well, and some teammates want him to stay captain. When the captain returns, Liam hands back the armband and supports her. That is the Cincinnatus spirit.",
            simpler: {
              q: "What was Cincinnatus doing when the Senate's messengers found him?",
              choices: ["Working his small farm", "Leading the Senate", "Sailing to Greece"],
              answer: 0,
              why: "Livy says the messengers found him working his own small farm.",
              hints: [
                "",
                "The Senate sent messengers to him, so he was not in the Senate at the time.",
                "He was at home in Italy. Think of the plow in the story.",
              ],
            },
          },
        },
        {
          title: "Washington at Newburgh",
          teach:
            "By early 1783 the Revolutionary War was nearly won, but the Continental Army's officers had gone months or even years without pay. At the army's camp near Newburgh, New York, an anonymous letter urged them to defy Congress, and some talked of using the army to force their demands. It was a dangerous moment: an army turning on its own government is how many republics have died. On March 15, Washington walked into the officers' meeting and urged them not to stain their honor. When he paused to read a letter, he pulled out a pair of glasses that most of his officers had never seen him wear. \"Gentlemen, you will permit me to put on my spectacles, for I have not only grown gray but almost blind in the service of my country,\" he said. Many officers were moved to tears. The threat collapsed.",
          visual: {
            type: "timeline",
            events: [
              { year: 1775, label: "Washington takes command", detail: "The Continental Congress makes Washington commander in chief of the Continental Army." },
              { year: 1777, label: "Valley Forge", detail: "The army winters at Valley Forge through the spring of 1778." },
              { year: 1781, label: "Victory at Yorktown", detail: "The British army under Cornwallis surrenders, and the war is nearly won." },
              { year: 1783, label: "Newburgh and resignation", detail: "March: Washington calms the officers at Newburgh. December: he resigns his command to Congress." },
              { year: 1797, label: "Steps down again", detail: "After two terms as President, Washington returns home to Mount Vernon." },
            ],
          },
          probe: {
            type: "build",
            prompt: "Build Washington's famous line at Newburgh.",
            tiles: ["Gentlemen, you will permit me", "to put on my spectacles,", "for I have not only grown gray", "but almost blind", "in the service of my country."],
            distractors: ["in the service of my king.", "and I demand your obedience."],
            hint: "He asked their permission, mentioned his glasses, and pointed to what his years of service had cost him.",
            mistakes: [
              { match: "Used in the service of my king", coach: "Washington had spent eight years fighting against a king. He served his country." },
              { match: "Used and I demand your obedience", coach: "Washington did not order them. He appealed to their honor through his own example." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why was Washington's moment with his spectacles so powerful?",
            choices: [
              "It showed the officers that he needed new glasses",
              "It distracted them from their anger with a joke",
              "It proved he had more money than they did",
              "It reminded them of his own sacrifice, so his appeal to honor carried the weight of his example",
            ],
            answer: 3,
            why: "Seeing what eight years of service had cost him reminded the officers that he had suffered alongside them. His example gave his words authority.",
            hints: [
              "The glasses mattered for what they revealed, not as a vision problem.",
              "It was not a joke. It was a quiet, honest moment.",
              "Money had nothing to do with it. Think about what the glasses revealed.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A coach who has run every drill alongside the team can say 'push through' and be believed. A coach who sits on the bench saying it is ignored. Washington had run every drill.",
            example:
              "A manager's team is angry about cancelled bonuses and some threaten to walk out. She reminds them, calmly, that she also gave up her own bonus and has worked every weekend beside them. She asks them to stay and promises to keep pressing for the money. They stay, because she shared the cost.",
            simpler: {
              q: "What were the officers at Newburgh angry about?",
              choices: ["Months or years without pay", "The location of the camp", "The food in the camp"],
              answer: 0,
              why: "Congress had not paid them for a long time, and many feared they would never be paid.",
              hints: [
                "",
                "The camp itself was not the issue. Think about money owed.",
                "Food was a hardship earlier in the war, but this anger was about something owed to them.",
              ],
            },
          },
        },
        {
          title: "Giving Power Back",
          teach:
            "Washington then did what kings and conquerors almost never do. On December 23, 1783, at the State House in Annapolis, Maryland, he resigned his commission as commander in chief to Congress and went home to Mount Vernon. According to the painter Benjamin West, King George III had said that if Washington gave up power, he would be the greatest man in the world. Americans compared him to Cincinnatus. Former officers had just founded a society named after the Roman, the Society of the Cincinnati, and Washington became its first president. Years later, after two terms as President of the United States, he stepped aside again in 1797, starting a two-term tradition that was later written into the Constitution. Integrity is not only refusing to grab power. It is giving it back on time, especially when people beg you to stay.",
          visual: {
            type: "flip",
            cards: [
              { front: "December 23, 1783", back: "At Annapolis, Washington hands his commission back to Congress and goes home to farm." },
              { front: "King George III", back: "According to the painter Benjamin West, the king said giving up power would make Washington the greatest man in the world." },
              { front: "Society of the Cincinnati", back: "Founded by former officers in 1783 and named for the Roman. Washington was its first president." },
              { front: "1797", back: "After two terms as President, Washington steps aside, starting the two-term tradition." },
            ],
          },
          probe: {
            type: "place",
            prompt: "Place each moment in Washington's career on the timeline.",
            min: 1770,
            max: 1800,
            step: 1,
            tolerance: 1,
            items: [
              { label: "Washington takes command of the Continental Army", value: 1775 },
              { label: "Washington resigns his commission at Annapolis", value: 1783 },
              { label: "Washington steps down after two terms as President", value: 1797 },
            ],
            hint: "The war began in 1775. He resigned the same year the war officially ended. His presidency began in 1789 and lasted two four-year terms.",
            mistakes: [
              { match: "Placed the resignation in 1789", coach: "1789 is when his presidency began. He resigned his military command six years earlier, when the war ended." },
              { match: "Placed stepping down in 1793", coach: "1793 was when his first term ended. He served a second term before stepping aside." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why did Americans compare Washington to Cincinnatus?",
            choices: [
              "Both grew wheat on large farms",
              "Both were born in Rome",
              "Both held great power in a crisis and gave it back when the job was done",
              "Both lost their wars",
            ],
            answer: 2,
            why: "Like Cincinnatus, Washington used power to meet a crisis and then returned it and went home to his farm.",
            hints: [
              "They were both farmers, but the comparison is about something much bigger than crops.",
              "Washington was born in Virginia. The comparison is about character.",
              "",
              "Both won. The comparison is about what they did after winning.",
            ],
          },
          approaches: {
            analogy:
              "Holding power is like holding a borrowed car. A trustworthy person returns it on time, with a full tank, even if the owner says 'keep it as long as you like.' Returning it is what proves you deserved to borrow it.",
            example:
              "Olivia founded her school's debate club and led it for three years. In her senior year, she steps down as president in the fall so a junior can lead while she is still there to help. The club outlasts her because she gave power back on time.",
            simpler: {
              q: "In 1783, to whom did Washington return his command?",
              choices: ["The British king", "Congress", "His officers"],
              answer: 1,
              why: "He resigned his commission to Congress, showing that the army served the civilian government.",
              hints: [
                "He had fought eight years against the king. He returned power to the American people's representatives.",
                "",
                "The officers served under him. He returned his command to the body that had given it.",
              ],
            },
          },
        },
        {
          title: "Keeping Your Word",
          teach:
            "Integrity under pressure also means keeping promises when they cost you. An old Hebrew psalm describes the upright person as one who \"sweareth to his own hurt, and changeth not\": he keeps his word even when it hurts him. Romans told the story of Marcus Atilius Regulus, a general captured by Carthage and sent home on his oath to argue for peace. Instead he told the Senate to keep fighting, then returned to Carthage as he had promised, knowing he would face punishment there. Historians doubt parts of the tale, but it shows what Romans admired. Most of our tests are smaller. Watch for three excuses that come before most broken promises: \"Everyone does it,\" \"Just this once,\" and \"No one will know.\" People of integrity decide their code before the pressure comes, because in the moment, the excuses always sound reasonable.",
          visual: {
            type: "flip",
            cards: [
              { front: "\"Everyone does it.\"", back: "Other people's choices do not change what is right. A crowd is not a conscience." },
              { front: "\"Just this once.\"", back: "Every habit starts with once. The second time is always easier than the first." },
              { front: "\"No one will know.\"", back: "You will know. Integrity is who you are when no one is watching." },
              { front: "A personal code", back: "A few commitments decided in calm, so you don't have to decide under pressure." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every thought that is an excuse for breaking a promise or a rule, not an act of integrity.",
            sentences: [
              "Everyone copies the homework answers, so it doesn't really count.",
              "I promised to help Grandpa on Saturday, so I'll skip the party.",
              "Just this once, I'll tell the coach I was sick.",
              "Nobody will ever know I kept the extra change.",
              "I'll tell my manager about my mistake before she finds it.",
              "I said I'd finish my part of the project, so I'm staying up to do it.",
            ],
            correct: [0, 2, 3],
            hint: "Look for the three excuses from the lesson: everyone does it, just this once, no one will know.",
            mistakes: [
              { match: "Tapped helping Grandpa on Saturday", coach: "Keeping a promise even when something more fun comes along is integrity, not an excuse." },
              { match: "Tapped telling the manager about a mistake", coach: "Admitting a mistake before you are caught is integrity in action." },
              { match: "Tapped finishing my part of the project", coach: "Keeping your word to your team, even when it costs sleep, is exactly what the psalm praises." },
            ],
            seconds: 40,
          },
          think: {
            q: "You promised to help a friend move on Saturday. Then you are invited to a concert that same day. What does integrity call for?",
            choices: [
              "Go to the concert and text an excuse that morning",
              "Say yes to both and decide on Saturday",
              "Keep your promise, or honestly ask your friend to release you well before Saturday",
              "Ignore both and stay home",
            ],
            answer: 2,
            why: "Integrity keeps its word. If you truly need out, you ask honestly and early, and accept the answer.",
            hints: [
              "A last-minute excuse breaks your word and adds a lie on top.",
              "Saying yes to both means you plan to break one promise.",
              "",
              "Staying home still breaks your promise to your friend.",
            ],
          },
          approaches: {
            analogy:
              "A personal code is like a guardrail on a mountain road. You put it up on a calm, sunny day, so it is already there when you skid on ice at night.",
            example:
              "Before starting a job at a store, Noah writes his code: 'I will not take what isn't mine. I will tell the truth about my mistakes. I will show up when I say I will.' Months later a coworker says, 'Everyone takes a free drink, no one will know.' Noah doesn't have to think it over. He already decided.",
            simpler: {
              q: "Which of these is an excuse, not integrity?",
              choices: ["\"I gave my word, so I'll do it.\"", "\"No one will know.\"", "\"I'll tell the truth.\""],
              answer: 1,
              why: "'No one will know' is one of the three excuses that come before broken promises.",
              hints: [
                "Keeping your word is the heart of integrity.",
                "",
                "Telling the truth is integrity, even when it is hard.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: integrity under pressure, or giving in to pressure?",
        buckets: ["Integrity under pressure", "Giving in to pressure"],
        items: [
          { text: "Handing back leadership of the club when your term ends", bucket: 0 },
          { text: "Keeping a promise to babysit even after a better offer comes", bucket: 0 },
          { text: "Telling the teacher she graded your test too generously", bucket: 0 },
          { text: "Admitting you broke a neighbor's window before anyone asks", bucket: 0 },
          { text: "Finding reasons to stay team captain after your season is over", bucket: 1 },
          { text: "Copying answers because everyone else did", bucket: 1 },
          { text: "Keeping extra change from a cashier because no one will know", bucket: 1 },
          { text: "Skipping a promised shift 'just this once' for a party", bucket: 1 },
        ],
      },
      explain: {
        prompt: "What does integrity under pressure look like? Use Cincinnatus or Washington and the idea of keeping your word, and explain why it helps to decide your personal code in advance.",
        keyPoints: [
          "Power is a duty to be given back, not a prize to keep",
          "Cincinnatus resigned after sixteen days, or Washington resigned his command and stepped down after two terms",
          "Keeping your word even when it costs you",
          "Recognizes the excuses: everyone does it, just this once, no one will know",
          "Deciding a personal code before the pressure comes",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each person or text to the act of integrity it is remembered for.",
          pairs: [
            { left: "Cincinnatus", right: "Resigned as dictator on the sixteenth day" },
            { left: "George Washington", right: "Calmed the officers at Newburgh with his spectacles" },
            { left: "Regulus", right: "Returned to Carthage to keep his oath" },
            { left: "Psalm 15", right: "Praises one who keeps his word to his own hurt" },
          ],
          hint: "One was a Roman farmer, one an American general, one a captured Roman general, and one is an ancient song.",
          mistakes: [
            { match: "Swapped Cincinnatus and Regulus", coach: "Cincinnatus gave back power. Regulus kept an oath to his enemies." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Cincinnatus could legally have held power for six months, about 180 days. He resigned on day 16. About how many days of power did he give up?",
          answer: 164,
          tolerance: 1,
          unit: "days",
          hint: "Subtract the days he used from the days he could have held power.",
          mistakes: [
            { match: "196", coach: "That adds the numbers. He gave up the days he did not use, so subtract." },
            { match: "16", coach: "That's how many days he held power. How many did he give up?" },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "Before the pressure comes, a person of integrity decides a personal {0}. The three excuses are \"Everyone does it,\" \"Just this {1},\" and \"No one will {2}.\"",
          blanks: [{ answers: ["code"] }, { answers: ["once"] }, { answers: ["know"] }],
          bank: ["code", "once", "know", "excuse", "time", "care"],
          hint: "Think of the written commitments you make in advance, and the three excuses from the lesson.",
          mistakes: [
            { match: "excuse", coach: "Excuses are what the code protects you from. What do you write down in advance?" },
            { match: "time", coach: "Close, but the excuse is 'just this once': a single exception." },
            { match: "care", coach: "The excuse is about being found out: no one will know." },
          ],
          seconds: 35,
        },
        {
          type: "sequence",
          prompt: "Put these moments in George Washington's career in order.",
          steps: [
            "Takes command of the Continental Army",
            "Winters with his army at Valley Forge",
            "Calms the angry officers at Newburgh",
            "Resigns his commission to Congress at Annapolis",
            "Steps down after two terms as President",
          ],
          hint: "The war came first, then the end of the war, then the presidency.",
          mistakes: [
            { match: "Put Annapolis before Newburgh", coach: "Newburgh was in March 1783. He resigned that December." },
            { match: "Put Valley Forge after Newburgh", coach: "Valley Forge was the winter of 1777-78, years before the war ended." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "Why do the Romans remember Cincinnatus?",
          choices: [
            "He conquered Greece",
            "He wrote the Meditations",
            "He held absolute power in a crisis and gave it back after sixteen days",
            "He became Rome's first emperor",
          ],
          answer: 2,
          why: "He used his emergency power to rescue the army and then resigned on the sixteenth day.",
        },
        {
          q: "What happened at Newburgh in March 1783?",
          choices: [
            "Washington persuaded angry, unpaid officers not to defy Congress",
            "The British surrendered",
            "Washington was elected President",
          ],
          answer: 0,
          why: "Washington appealed to the officers' honor, and the threat against civilian government collapsed.",
        },
        {
          q: "What does Psalm 15 praise?",
          choices: [
            "Making promises you can easily keep",
            "Breaking promises when they become costly",
            "Never making promises",
            "Keeping your word even when it hurts you",
          ],
          answer: 3,
          why: "It praises one who swears to his own hurt and does not change: who keeps his word when it costs him.",
        },
        {
          q: "Which of these is one of the three excuses named in the lesson?",
          choices: ["\"I promised.\"", "\"Just this once.\"", "\"Let me check with my parents.\"", "\"I'll tell the truth.\""],
          answer: 1,
          why: "'Just this once' is one of the three excuses, along with 'everyone does it' and 'no one will know.'",
        },
        {
          q: "Why decide your personal code ahead of time?",
          choices: [
            "Because in the moment, excuses always sound reasonable",
            "So you can show it to others",
            "Because codes are required by law",
          ],
          answer: 0,
          why: "Under pressure, excuses feel convincing. A code decided in calm lets you act without re-deciding.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write your personal code: five to seven short commitments you will keep even under pressure (for example, about honesty, keeping your word, how you use any power or responsibility you are given, and how you treat people). For each one, write a sentence explaining why it matters and describe a real situation where it could be tested. End with a short paragraph on what Cincinnatus or Washington teaches you about holding power.",
        rubric: [
          "Lists five to seven clear, specific commitments",
          "Explains why each commitment matters",
          "Describes realistic situations where each could be tested",
          "Connects at least one commitment to Cincinnatus or Washington accurately",
          "Writing is honest, thoughtful and well organized",
        ],
      },
    },
  ],
};
