import type { Course } from "./types";

export const leadership: Course = {
  id: "leadership",
  title: "Leadership & Character",
  icon: "🛡️",
  hue: 220,
  track: "life",
  subject: "Speaking",
  blurb:
    "Build the inner strength leaders need: the classical virtues, integrity, wise decisions, leading a team and speaking with confidence.",
  teacher: {
    name: "Captain Marcus",
    avatar: "⚓",
    inspiredBy: "Marcus Aurelius, the Stoic emperor who wrote about self-mastery",
    voice:
      "Calm, steady and wise. Asks thoughtful questions and uses short stories from history about courage and duty.",
  },
  lessons: [
    {
      id: "leadership.virtues",
      title: "The Four Classical Virtues",
      minutes: 25,
      stage: "grammar",
      subject: "Other",
      read: [
        "Nearly two thousand years ago, a Roman emperor sat in a cold army camp near the Danube River and wrote notes to himself. His name was Marcus Aurelius. He ruled the most powerful empire on earth, yet his private notebook, which we now call the Meditations, is full of reminders to be patient, honest and brave. He was not writing to impress anyone. He was training his own character.",
        "Marcus learned from a long tradition. Greek thinkers such as Plato, and later Roman writers such as Cicero, described four main virtues, sometimes called the cardinal virtues. The word cardinal comes from the Latin for hinge, because the rest of good character swings on these four.",
        "The first is wisdom, also called prudence. Wisdom means seeing a situation clearly and choosing the best action, not just the easiest one. A wise student notices that a big project is due in two weeks and starts today instead of the night before.",
        "The second is justice. Justice means giving others what they are owed: fairness, honesty and respect. When you split a pizza evenly, return something you borrowed, or stand up for a kid who is being treated unfairly, you are practicing justice.",
        "The third is courage. Courage is not the absence of fear. It is doing what is right even when you are afraid. Firefighters run toward danger, but courage also looks like admitting a mistake or trying out for a team when you might fail.",
        "The fourth is self-control, which the ancients called temperance. It means being the master of your wants instead of their servant. Putting the game down when it is time for chores, or keeping your temper when your little brother is annoying, takes real strength.",
        "Here is the secret Marcus understood: virtues grow like muscles. Every small choice is a repetition. Nobody becomes brave or wise in one day, but anyone can practice a little today.",
      ].join("\n\n"),
      keyIdeas: [
        "The four classical virtues are wisdom, justice, courage and self-control.",
        "Courage means doing right even when you are afraid, not feeling no fear.",
        "Virtues grow through small, repeated everyday choices, like muscles.",
      ],
      check: [
        {
          q: "Why are the four virtues called cardinal virtues?",
          choices: [
            "Because they were invented by church leaders called cardinals",
            "Because cardinal comes from the Latin for hinge, and good character turns on them",
            "Because they are the color red",
            "Because there are exactly four directions on a compass",
          ],
          answer: 1,
          why: "Cardinal comes from the Latin word for hinge, since the rest of good character swings on these four.",
        },
        {
          q: "Which choice best shows the virtue of justice?",
          choices: [
            "Returning a book you borrowed on time",
            "Waking up early to go running",
            "Starting a project two weeks early",
          ],
          answer: 0,
          why: "Justice means giving others what they are owed, and returning what you borrowed does exactly that.",
        },
        {
          q: "According to the lesson, what is courage?",
          choices: [
            "Never feeling afraid",
            "Taking big risks for fun",
            "Always winning a fight",
            "Doing what is right even when you are afraid",
          ],
          answer: 3,
          why: "Courage is acting rightly in spite of fear, not the absence of fear.",
        },
        {
          q: "Putting down a video game when it is time to do chores shows which virtue?",
          choices: ["Justice", "Courage", "Self-control", "Wisdom"],
          answer: 2,
          why: "Self-control, or temperance, means being the master of your wants.",
        },
        {
          q: "What was Marcus Aurelius doing when he wrote his Meditations?",
          choices: [
            "Writing a bestselling book to make money",
            "Writing private notes to train his own character",
            "Writing laws for the Roman Senate",
          ],
          answer: 1,
          why: "The Meditations were private reminders Marcus wrote to himself, not a book for an audience.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Pick one of the four virtues that you want to grow in this week. Write a short reflection (one or two paragraphs): explain what the virtue means in your own words, describe a real moment when you or someone you know showed it (or failed to), and name one small daily action you will practice.",
        rubric: [
          "Defines the chosen virtue accurately in their own words",
          "Describes a specific, real example from everyday life",
          "Names one concrete, small action to practice this week",
          "Writing is clear, honest and organized into complete sentences",
        ],
      },
    },
    {
      id: "leadership.integrity",
      title: "Integrity: Who You Are When No One Is Watching",
      minutes: 25,
      stage: "grammar",
      subject: "Other",
      read: [
        "The word integrity comes from the same root as integer, a whole number. A person of integrity is whole. They are the same person in public and in private, and their words match their actions.",
        "Integrity shows up in three main ways. First, telling the truth, even when a lie would be easier. Second, keeping promises, even small ones like calling back when you said you would. Third, doing right when no one is watching, like finishing a chore properly when a parent will never check.",
        "You may have heard that young George Washington chopped down his father's cherry tree and said, \"I cannot tell a lie.\" That story is a legend. It first appeared in a biography by Mason Locke Weems, published after Washington died, and historians have found no evidence that it happened. It is a good lesson, but it is not history.",
        "Here is something that really did happen. As a teenager, around age sixteen, Washington copied out by hand a list of 110 \"Rules of Civility and Decent Behaviour in Company and Conversation.\" The rules came from a much older set of maxims first written by French teachers. Many are about manners, but some are about character. The last rule urges the reader to keep alive in his heart that little spark of heavenly fire called conscience. That notebook still survives today.",
        "Washington was not perfect, but people trusted him because he worked to keep his word. In 1783, when the Revolutionary War was over, he gave up command of the army and went home to his farm, even though some thought he could have kept great power.",
        "Integrity builds trust, and trust is slow to build and quick to lose. Every promise kept is like a brick in a wall. One lie can knock out many bricks at once.",
      ].join("\n\n"),
      keyIdeas: [
        "Integrity means being whole: the same person in public and in private.",
        "Telling the truth, keeping promises and doing right unseen build trust.",
        "Separate true history from legend; the cherry tree story is a legend.",
      ],
      check: [
        {
          q: "The word integrity is related to which word?",
          choices: ["Integer, a whole number", "Interesting", "Interrupt", "Internet"],
          answer: 0,
          why: "Integrity shares a root with integer, meaning whole or complete.",
        },
        {
          q: "What does the lesson say about the cherry tree story?",
          choices: [
            "It was recorded in Washington's own diary",
            "It is proven history",
            "It is a legend first published by Mason Locke Weems",
          ],
          answer: 2,
          why: "Historians have found no evidence for it; it first appeared in a biography by Weems after Washington died.",
        },
        {
          q: "What did Washington really do as a teenager?",
          choices: [
            "Wrote the Declaration of Independence",
            "Copied out 110 Rules of Civility by hand",
            "Became a general",
            "Sailed to France",
          ],
          answer: 1,
          why: "Around age sixteen he copied a list of 110 rules, and that notebook still survives.",
        },
        {
          q: "Which is an example of doing right when no one is watching?",
          choices: [
            "Cleaning well only when a parent is checking",
            "Telling a friend you will call and then forgetting",
            "Bragging about a good deed",
            "Finishing a chore properly even though no one will check it",
          ],
          answer: 3,
          why: "Integrity means acting rightly even when nobody will ever know.",
        },
        {
          q: "According to the lesson, how is trust like a brick wall?",
          choices: [
            "It is built slowly brick by brick, and one lie can knock many bricks out",
            "It can never be damaged once built",
            "It is only built by adults",
          ],
          answer: 0,
          why: "Each kept promise adds a brick, while a single lie can tear out many at once.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Scenario: You borrowed a friend's video game and accidentally scratched the disc. It still mostly works, and your friend may never notice. Write what you would do and say, step by step, and explain how your choice shows (or does not show) integrity. End with one sentence about how your choice might affect your friendship in the long run.",
        rubric: [
          "Describes a clear, honest course of action",
          "Includes what they would actually say to the friend",
          "Connects the choice to truth-telling, promises or doing right unseen",
          "Thinks about the long-term effect on trust",
        ],
      },
    },
    {
      id: "leadership.decisions",
      title: "Making Good Decisions",
      minutes: 25,
      stage: "logic",
      subject: "Other",
      read: [
        "Every day you make hundreds of decisions. Most are small, like what to eat for breakfast. A few are big, and those are the ones where a simple method can save you from regret. Here is one that fits on your fingers: Stop, List, Think, Ask.",
        "Stop. Strong feelings like anger, excitement or fear push us to act fast. Taking even ten seconds, or one night's sleep for a big choice, lets your thinking catch up with your feelings.",
        "List. Write down or name your options. There are almost always more than two. People often feel trapped between yes and no when a third path, like asking for help or waiting, is better.",
        "Think. For each option, ask what will happen next, and then what will happen after that. Who is affected? How will you feel about it tomorrow, or in a year?",
        "Ask. Finally ask, \"What would a person of good character do?\" Picture someone you admire for their wisdom and honesty. This question often cuts through confusion in a moment.",
        "Let us try it. Scenario one: your friends are planning to sneak into a movie without paying and want you to come. Stop: you feel pressure to fit in. List: go along, refuse and go home, or suggest everyone buys tickets or does something else. Think: sneaking in is dishonest and could get you in real trouble, while suggesting another plan keeps the friendship and your integrity. Ask: a person of good character would not take what is not theirs. The choice becomes clear.",
        "Scenario two: you promised to help your grandmother on Saturday, but then you are invited to a fun trip the same day. Stop and list: break the promise, keep it, or ask your grandmother whether another day works. Think about how she would feel. Ask what a person of good character would do. Keeping your word, or honestly asking to reschedule, both respect her.",
        "Good decisions are rarely about being clever. They are about slowing down and letting your values lead.",
      ].join("\n\n"),
      keyIdeas: [
        "Use Stop, List, Think, Ask for important decisions.",
        "There are usually more than two options, so look for a third path.",
        "Asking what a person of good character would do brings clarity.",
      ],
      check: [
        {
          q: "Why is the first step to stop?",
          choices: [
            "So you can forget about the problem",
            "So strong feelings do not push you into acting too fast",
            "So someone else can decide for you",
          ],
          answer: 1,
          why: "Pausing lets your thinking catch up with emotions like anger, fear or excitement.",
        },
        {
          q: "What does the lesson say about options?",
          choices: [
            "There are only ever two: yes or no",
            "You should always pick the first option",
            "Options do not matter if you feel strongly",
            "There are almost always more than two",
          ],
          answer: 3,
          why: "A third path, such as asking for help or waiting, is often the best choice.",
        },
        {
          q: "In the Think step, what should you consider?",
          choices: [
            "What happens next, what happens after that, and who is affected",
            "Only what is most fun right now",
            "What is most popular with your friends",
          ],
          answer: 0,
          why: "Thinking through consequences, including later ones and their effect on others, is the heart of this step.",
        },
        {
          q: "In scenario one, what was a good third option?",
          choices: [
            "Sneak in but feel bad about it",
            "Tell on your friends right away without talking to them",
            "Suggest everyone buy tickets or do something else",
            "Pretend to be sick",
          ],
          answer: 2,
          why: "Suggesting another plan protects both the friendship and your integrity.",
        },
        {
          q: "In scenario two, which choice respects your grandmother?",
          choices: [
            "Skipping her without saying anything",
            "Keeping your promise or honestly asking her to reschedule",
            "Going on the trip and apologizing next month",
          ],
          answer: 1,
          why: "Keeping your word or openly asking to change plans both treat her with respect.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Scenario: During an online test at home, you discover the answer key is visible in another browser tab. No one would ever know if you looked. Walk through all four steps (Stop, List, Think, Ask) in writing, then state your decision and why.",
        rubric: [
          "Uses all four steps: Stop, List, Think, Ask",
          "Lists at least three realistic options",
          "Thinks through consequences for themselves and others",
          "Gives a clear final decision supported by good character",
        ],
      },
    },
    {
      id: "leadership.team",
      title: "Leading a Team: Lessons from Shackleton",
      minutes: 30,
      stage: "logic",
      subject: "Speaking",
      read: [
        "In 1914, the explorer Ernest Shackleton sailed for Antarctica on a ship named Endurance. He planned to cross the frozen continent on foot. He never even reached the shore. In early 1915 the ship became trapped in the pack ice of the Weddell Sea. For months it drifted, and in November 1915 the ice crushed it and it sank. Twenty-eight men were stranded on floating ice, far from any help.",
        "What happened next is one of the greatest stories of leadership ever told. After months camped on the ice, the men rowed three small lifeboats to remote Elephant Island. Then Shackleton and five companions sailed one tiny boat, the James Caird, about 800 miles across some of the roughest ocean on earth to South Georgia. They crossed its icy mountains on foot to reach a whaling station. After several failed attempts, Shackleton returned in August 1916 and rescued everyone left on Elephant Island. Not one member of the Endurance crew died.",
        "How did he do it? First, he served first. When warm reindeer-fur sleeping bags were handed out by drawing lots, Shackleton and his officers ended up with the thinner wool bags. Second, he set the example, staying cheerful and calm so his men would too. Third, he gave clear goals. Once the ship was lost, he told the crew the mission had changed: now the goal was to bring everyone home alive.",
        "Fourth, he gave credit. He praised his men's skill and courage, especially navigator Frank Worsley, whose careful work guided the James Caird to land. Fifth, he took responsibility. He never blamed his crew for the disaster. The decisions were his, and so was the duty to get them out.",
        "You do not need an ice field to practice this. Any group, from a family to a sports team, needs someone willing to serve, set the example and own the results.",
      ].join("\n\n"),
      keyIdeas: [
        "Great leaders serve first and set the example they want followed.",
        "Clear goals keep a team focused, especially when plans change.",
        "Give credit to others and take responsibility yourself.",
      ],
      check: [
        {
          q: "What happened to the ship Endurance?",
          choices: [
            "It reached Antarctica safely",
            "It was trapped and crushed by the pack ice and sank",
            "It was attacked by pirates",
            "It sailed home after a storm",
          ],
          answer: 1,
          why: "Endurance was trapped in the Weddell Sea ice in 1915 and was crushed and sank that November.",
        },
        {
          q: "How did Shackleton show he served first?",
          choices: [
            "He and his officers ended up with the thinner wool sleeping bags",
            "He took the best food for himself",
            "He made the crew row while he rested",
          ],
          answer: 0,
          why: "The warmer fur bags went to the men while Shackleton and his officers used wool ones.",
        },
        {
          q: "After the ship was lost, what was the new clear goal?",
          choices: [
            "Cross Antarctica on foot anyway",
            "Find treasure",
            "Build a new ship",
            "Bring everyone home alive",
          ],
          answer: 3,
          why: "Shackleton changed the mission to survival so every man knew what mattered.",
        },
        {
          q: "Who was the navigator Shackleton gave credit to?",
          choices: ["Frank Worsley", "Marcus Aurelius", "George Washington"],
          answer: 0,
          why: "Frank Worsley's careful navigation guided the James Caird to South Georgia.",
        },
        {
          q: "How many members of the Endurance crew died?",
          choices: ["About half", "Six", "None", "All but Shackleton"],
          answer: 2,
          why: "Shackleton rescued everyone left on Elephant Island, and not one member of the Endurance crew died.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Lead a family project: plan and run either a family meal or a family chore day. Set one clear goal, give everyone a job that fits them, do the hardest or least fun job yourself, and keep things cheerful. Afterward, thank each person for something specific, and tell a parent one thing that went wrong and how you would handle it next time.",
        rubric: [
          "Stated one clear goal and shared it with the team",
          "Assigned fair jobs and served first by taking a hard task",
          "Gave specific credit to each helper",
          "Took responsibility for a problem and named a lesson for next time",
        ],
      },
    },
    {
      id: "leadership.speaking",
      title: "Speaking with Confidence",
      minutes: 30,
      stage: "rhetoric",
      subject: "Speaking",
      read: [
        "On November 19, 1863, thousands of people gathered at Gettysburg, Pennsylvania, to dedicate a cemetery for soldiers killed in battle there. The main speaker, Edward Everett, spoke for about two hours. Then President Abraham Lincoln stood up and spoke for about two minutes. His speech was only around 270 words, yet it is Lincoln's short speech that people still memorize today.",
        "It begins: \"Four score and seven years ago our fathers brought forth on this continent, a new nation.\" Four score means eighty, so Lincoln was pointing back eighty-seven years to 1776. In a single line he grabbed attention and set the stage. Great speeches are not great because they are long. They are great because they are clear.",
        "Most good short speeches follow a simple structure. Start with a hook: a question, a surprising fact or a quick story that makes people want to listen. Then give three main points. Three is easy for listeners to remember, and it gives your speech a steady rhythm. Finally, close strong. Repeat your big idea in one memorable sentence, or ask your audience to do something.",
        "Your body speaks too. Stand tall with your feet planted, not swaying. Look at people's faces, moving your eyes around the room. Use your hands naturally to show size or count your points. Speak a little slower and louder than feels normal, and do not be afraid of a short pause. Pauses give listeners time to think and make you look calm.",
        "Almost everyone feels nervous before speaking, even experienced speakers. The cure is practice. Say your speech out loud several times, not just in your head. Practice in front of a mirror, then for one person, then for a small group. Use a small card with a few key words instead of reading every word.",
        "Remember Lincoln. Two minutes, said well, can be remembered for more than a century and a half.",
      ].join("\n\n"),
      keyIdeas: [
        "Structure a speech with a hook, three main points and a strong close.",
        "Body language matters: stand tall, make eye contact, speak slowly and pause.",
        "Practicing out loud is the best cure for nerves.",
      ],
      check: [
        {
          q: "About how long was Lincoln's Gettysburg Address?",
          choices: ["Two hours", "About two minutes", "Thirty minutes", "Ten seconds"],
          answer: 1,
          why: "Lincoln spoke for about two minutes, using only around 270 words.",
        },
        {
          q: "What does four score and seven years mean?",
          choices: ["Forty-seven years", "Seventy-four years", "Eighty-seven years"],
          answer: 2,
          why: "A score is twenty, so four score is eighty, plus seven makes eighty-seven.",
        },
        {
          q: "What is the purpose of a hook?",
          choices: [
            "To make people want to listen",
            "To end the speech",
            "To list every fact you know",
            "To thank the audience",
          ],
          answer: 0,
          why: "A hook grabs attention at the start so the audience wants to hear more.",
        },
        {
          q: "Why does the lesson suggest three main points?",
          choices: [
            "Because speeches must be exactly three minutes",
            "Because one point is never enough to say anything",
            "Because it is a rule from the Constitution",
            "Because three is easy for listeners to remember",
          ],
          answer: 3,
          why: "Three points are easy to remember and give a speech a steady rhythm.",
        },
        {
          q: "What is the best way to get over nervousness about speaking?",
          choices: [
            "Practice your speech out loud several times",
            "Read every word from a full page",
            "Speak as fast as you can to finish quickly",
          ],
          answer: 0,
          why: "Practicing out loud builds confidence much better than rushing or reading.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Give a 2-minute speech to your family on the topic: \"A person of good character I admire.\" It can be someone from history or someone you know. Use a hook, three main points about their character, and a strong close. Practice at least three times out loud first, and use only one small note card.",
        rubric: [
          "Opens with a clear hook and closes with a memorable final line",
          "Gives three distinct points about the person's character",
          "Stands tall, makes eye contact and speaks clearly at a steady pace",
          "Stays close to two minutes and uses notes only as a guide",
        ],
      },
    },
  ],
};
