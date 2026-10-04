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
      hook: {
        text: "Imagine being the most powerful person on earth, able to order almost anything you wanted. Marcus Aurelius was, yet in his army camp he wrote private reminders to himself to be patient, honest and brave. Why would an emperor bother to train his own character?",
      },
      teach: [
        {
          title: "An Emperor's Private Notebook",
          teach:
            "Marcus Aurelius ruled the Roman Empire from AD 161 to 180. Much of that time he spent in cold camps near the Danube River, leading his armies. At night he wrote notes to himself in a notebook we now call the Meditations. He never meant for anyone else to read it. He was not showing off. He was coaching himself, the way an athlete reviews a game. Marcus learned from older thinkers like Plato and Cicero, who described four main virtues. They are called the cardinal virtues, from the Latin word for hinge, because the rest of good character swings on them: wisdom, justice, courage and self-control.",
          visual: {
            type: "hotspots",
            title: "The Four Cardinal Virtues",
            center: "Good character",
            spots: [
              { label: "Wisdom", icon: "🦉", detail: "Seeing a situation clearly and choosing the best action, not just the easiest one." },
              { label: "Justice", icon: "⚖️", detail: "Giving others what they are owed: fairness, honesty and respect." },
              { label: "Courage", icon: "🦁", detail: "Doing what is right even when you are afraid." },
              { label: "Self-control", icon: "🧭", detail: "Being the master of your wants instead of their servant. The ancients called it temperance." },
            ],
          },
          think: {
            q: "Marcus wrote the Meditations for nobody but himself. What does that tell us about him?",
            choices: [
              "He wanted to become a famous author",
              "He was too busy to talk to anyone",
              "He cared about actually being good, not just looking good",
              "He was ordered to write it by the Senate",
            ],
            answer: 2,
            why: "Writing private reminders that no one would see shows he was training his real character, not his reputation.",
            hints: [
              "Many books are written for fame, but Marcus never planned to publish his. Ask yourself who his audience was.",
              "He was busy, but he was writing to himself, not avoiding others. Think about why someone coaches themselves.",
              "",
              "The Meditations were private notes, not an official task. Nobody ordered them.",
            ],
          },
          approaches: {
            analogy:
              "Think of a basketball player who shoots free throws alone in an empty gym. No crowd is cheering, but she is getting better. Marcus's notebook was his empty gym for character.",
            example:
              "In the Meditations, Marcus reminds himself that he will meet rude and ungrateful people during the day, and that he should not be angry with them. He wrote this before the day began, so he would be ready. It was practice in advance.",
            simpler: {
              q: "What does the word cardinal come from?",
              choices: ["A red bird", "The Latin word for hinge", "A Roman general's name"],
              answer: 1,
              why: "Cardinal comes from the Latin for hinge, because good character turns on these four virtues.",
              hints: [
                "The bird shares the name, but the word for the virtues is much older and means something a door swings on.",
                "",
                "No general is involved. Think of what a door turns on.",
              ],
            },
          },
        },
        {
          title: "Wisdom and Justice",
          teach:
            "Wisdom, also called prudence, is the virtue of seeing clearly and choosing well. A wise student notices a big project is due in two weeks and starts today, not the night before. Wisdom looks ahead. Justice is the virtue of giving others what they are owed. That includes fairness, honesty and respect. When you split a pizza evenly, return something you borrowed, or stand up for a kid who is being treated unfairly, you are practicing justice. Notice that wisdom is mostly about how you think, while justice is mostly about how you treat other people. Every virtue also has an opposite, and knowing the opposite helps you spot the virtue.",
          visual: {
            type: "flip",
            cards: [
              { front: "Wisdom", back: "Seeing clearly and choosing well. Its opposite is foolishness: acting without thinking ahead." },
              { front: "Justice", back: "Giving others what they are owed. Its opposite is unfairness: taking more than your share or treating people badly." },
              { front: "Courage", back: "Doing right even when afraid. Its opposite is cowardice: running from what is right because it is hard." },
              { front: "Self-control", back: "Mastering your wants. Its opposite is giving in to every urge the moment you feel it." },
            ],
          },
          think: {
            q: "Your team wins a prize of 12 cookies. Four of you did the work. Which choice shows justice?",
            choices: [
              "Give each teammate 3 cookies",
              "Keep 6 because you had the idea",
              "Give them all to your best friend",
              "Save them all for later so nobody fights",
            ],
            answer: 0,
            why: "Justice means giving each person what they are owed. Everyone worked, so everyone gets a fair share.",
            hints: [
              "",
              "Having the idea matters, but everyone did the work. Taking extra is the opposite of justice.",
              "Being generous to a friend feels kind, but it is unfair to the other teammates who earned a share.",
              "Avoiding a fight sounds wise, but keeping everything from everyone does not give people what they earned.",
            ],
          },
          approaches: {
            analogy:
              "Wisdom is like the headlights on a car at night: it lets you see the road ahead before you get there. Justice is like a fair referee: it makes sure everyone gets what they have earned.",
            example:
              "Sam has a book report due Friday and a soccer game Thursday. On Monday he plans out two pages a night. That is wisdom. When his sister helps him find a quote, he thanks her and mentions her in his report. That is justice.",
            simpler: {
              q: "Starting a big project early instead of the night before shows which virtue?",
              choices: ["Courage", "Justice", "Wisdom"],
              answer: 2,
              why: "Wisdom means looking ahead and choosing the best action, not the easiest one.",
              hints: [
                "Nothing scary is happening here. Courage is about acting rightly despite fear.",
                "Justice is about treating others fairly. This choice is about planning ahead.",
                "",
              ],
            },
          },
        },
        {
          title: "Courage and Self-Control",
          teach:
            "Courage is not the absence of fear. It is doing what is right even when you are afraid. A firefighter running into a burning building feels fear but goes anyway to save someone. Courage also looks smaller and quieter: admitting a mistake, saying no to friends who are doing wrong, or trying out for a team when you might fail. Be careful, though. Taking a foolish risk just to show off is not courage. That is recklessness. Self-control, which the ancients called temperance, means being the master of your wants. Putting down a game when it is time for chores, or keeping your temper with an annoying little brother, takes real strength.",
          visual: {
            type: "compare",
            left: {
              title: "Courage",
              points: [
                "Feels fear but does what is right",
                "Takes risks for a good reason",
                "Thinks before acting",
                "Example: admitting you broke a window",
              ],
            },
            right: {
              title: "Recklessness",
              points: [
                "Ignores danger to look tough",
                "Takes risks for attention",
                "Acts without thinking",
                "Example: jumping off a roof on a dare",
              ],
            },
          },
          think: {
            q: "Which of these is real courage?",
            choices: [
              "Riding your bike down a steep hill with no brakes because friends dared you",
              "Telling your coach you were the one who left the gate open, even though you are nervous",
              "Never feeling scared of anything",
            ],
            answer: 1,
            why: "Courage is doing the right thing, like telling the truth, even when you feel afraid.",
            hints: [
              "It looks bold, but a dangerous stunt for a dare is recklessness. There is no good reason behind the risk.",
              "",
              "Many people think brave people feel no fear. But courage means acting rightly in spite of fear.",
            ],
          },
          approaches: {
            analogy:
              "Self-control is like being the driver of a car instead of a passenger. Your wants are the engine: powerful and useful. But you, not the engine, decide where the car goes.",
            example:
              "Maya is terrified of speaking in front of people, but she volunteers to read the announcement at her club because nobody else will. Her hands shake, and she does it anyway. That is courage. Afterward, she wants a third slice of cake but stops at one. That is self-control.",
            simpler: {
              q: "Keeping your temper when your little brother is being annoying shows which virtue?",
              choices: ["Self-control", "Courage", "Wisdom", "Justice"],
              answer: 0,
              why: "Self-control means being the master of your feelings and wants, including anger.",
              hints: [
                "",
                "There is no fear to overcome here. The challenge is controlling your anger.",
                "Wisdom helps, but the virtue of mastering your urges has its own name.",
                "Justice is about fairness to others. This is about controlling your own reactions.",
              ],
            },
          },
        },
        {
          title: "Virtues Grow Like Muscles",
          teach:
            "Here is the secret Marcus understood: nobody is born wise, just, brave and self-controlled. Virtues grow like muscles. Every small choice is a repetition. When you tell the truth about a small thing, you make it easier to tell the truth about a big thing later. When you put your phone away on time today, tomorrow it is a little easier. The opposite is also true: every small giving-in makes the next one easier too. So you do not need a giant heroic moment to build character. You need ordinary days filled with small good choices. Pick one virtue, practice it in one small way, and repeat.",
          visual: {
            type: "sequence",
            prompt: "How a small choice becomes character",
            steps: [
              "You face a small choice",
              "You choose the right thing, even though it is a little hard",
              "You repeat that choice day after day",
              "It becomes a habit and gets easier",
              "The habit becomes part of who you are",
            ],
          },
          think: {
            q: "Jordan wants to become more courageous. What is the best plan?",
            choices: [
              "Wait for a big emergency so he can be a hero",
              "Read about brave people but change nothing",
              "Do something dangerous to prove himself",
              "Practice one small brave act each day, like speaking up in class",
            ],
            answer: 3,
            why: "Virtues grow through small, repeated choices, just like muscles grow through repetitions.",
            hints: [
              "Big moments are rare. If Jordan waits for one, he will not have practiced when it comes.",
              "Reading about heroes can inspire him, but muscles only grow when you actually lift.",
              "That is recklessness, not courage, and it skips the daily practice that builds real strength.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Nobody can do fifty push-ups on their first try. You start with five, then six, then ten. Character works the same way: small reps every day add up.",
            example:
              "Lena decided to practice self-control by making her bed every morning before looking at any screen. The first week was hard. By the third week, she did it without thinking. She then found it easier to start homework on time too.",
            simpler: {
              q: "According to the lesson, how do virtues grow?",
              choices: ["All at once on a special day", "Through small, repeated choices", "Only when you are older"],
              answer: 1,
              why: "Each small good choice is like a repetition that strengthens a muscle.",
              hints: [
                "Movies make it look like one big moment changes everything, but character is built slowly.",
                "",
                "Age does not do the work for you. Anyone can practice today.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each action under the virtue it shows best.",
        buckets: ["Wisdom", "Justice", "Courage", "Self-control"],
        items: [
          { text: "Starting a science project two weeks before it is due", bucket: 0 },
          { text: "Asking a trusted adult for advice before a big choice", bucket: 0 },
          { text: "Splitting a pizza evenly with your siblings", bucket: 1 },
          { text: "Returning a borrowed bike in good shape", bucket: 1 },
          { text: "Admitting to your parents that you broke a lamp", bucket: 2 },
          { text: "Inviting the new kid to sit with you when others will not", bucket: 2 },
          { text: "Turning off a video game when your time is up", bucket: 3 },
          { text: "Staying calm when your brother teases you", bucket: 3 },
        ],
      },
      explain: {
        prompt: "In your own words, what are the four classical virtues, and how does a person actually grow in them?",
        keyPoints: [
          "Names wisdom, justice, courage and self-control",
          "Gives a short meaning or example for at least two of them",
          "Explains that courage means acting rightly despite fear",
          "Explains that virtues grow through small, repeated choices",
        ],
      },
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
      hook: {
        text: "You find a twenty-dollar bill on the floor of an empty room. No cameras, no witnesses, nobody will ever know. What you do in that moment says more about who you are than anything you do in front of a crowd.",
      },
      teach: [
        {
          title: "Being Whole",
          teach:
            "The word integrity comes from the same root as integer, which means a whole number. A whole number is not split into pieces. A person of integrity is whole too. They are the same person at home and at school, with friends and with adults, when someone is watching and when no one is. Their words match their actions. A person without integrity is split in two: polite to a teacher's face but rude behind her back, or promising one thing and doing another. Being whole is not about being perfect. It is about being honest and consistent, so people know who you really are.",
          visual: {
            type: "compare",
            left: {
              title: "A whole person",
              points: [
                "Acts the same whether watched or not",
                "Words match actions",
                "Admits mistakes honestly",
                "People know what to expect",
              ],
            },
            right: {
              title: "A split person",
              points: [
                "Behaves well only when someone is looking",
                "Says one thing and does another",
                "Hides or blames others for mistakes",
                "People are never quite sure about them",
              ],
            },
          },
          think: {
            q: "Ellie is kind to the new girl when the teacher is around, but makes fun of her at recess. What is missing?",
            choices: [
              "Nothing, since she was kind some of the time",
              "Integrity: she is not the same person when no adult is watching",
              "Courage: she needs to be braver around teachers",
            ],
            answer: 1,
            why: "Integrity means being whole, acting the same whether or not anyone is watching.",
            hints: [
              "Being kind sometimes is good, but integrity means being consistent. Her kindness disappears when no one is looking.",
              "",
              "Ellie is already behaving well around teachers. The problem is what she does when they are gone.",
            ],
          },
          approaches: {
            analogy:
              "Think of a chocolate bunny. Some are solid all the way through, and some are hollow shells. From the outside they look the same, but bite in and you find out. Integrity means being solid all the way through.",
            example:
              "Two kids are asked to sweep the garage. One sweeps the middle where people will look and pushes the dirt under a shelf. The other sweeps every corner. Both garages look clean at first glance, but only one kid showed integrity.",
            simpler: {
              q: "The word integrity shares a root with which word?",
              choices: ["Integer", "Interview", "Interrupt"],
              answer: 0,
              why: "Integer means a whole number, and integrity means being whole.",
              hints: [
                "",
                "Interview just starts with the same letters. Look for the word that means whole.",
                "Interrupt starts with similar letters but means to break in. Integrity is about being whole, not broken.",
              ],
            },
          },
        },
        {
          title: "Three Ways Integrity Shows",
          teach:
            "Integrity shows up in three main ways. The first is telling the truth, even when a lie would be easier or would keep you out of trouble. The second is keeping promises, even small ones, like calling back when you said you would or showing up on time to help. The third is doing right when no one is watching, like finishing a chore properly when a parent will never check it, or returning extra change a cashier gave you by mistake. Small promises and unseen choices might feel unimportant. But they are exactly where integrity is built, because nobody is there to reward you except your own conscience.",
          visual: {
            type: "hotspots",
            title: "How Integrity Shows",
            center: "Integrity",
            spots: [
              { label: "Tell the truth", icon: "🗣️", detail: "Be honest even when a lie would be easier or would keep you out of trouble." },
              { label: "Keep promises", icon: "🤝", detail: "Do what you said you would, even small things like calling back or being on time." },
              { label: "Do right unseen", icon: "🌙", detail: "Act the same when nobody is watching, because your conscience is always there." },
            ],
          },
          think: {
            q: "A cashier hands you five dollars too much in change. Nobody noticed. What shows integrity?",
            choices: [
              "Keep it, since it was the cashier's mistake",
              "Keep it but feel a little guilty",
              "Give it to a friend so it is not really yours",
              "Point out the mistake and hand back the extra money",
            ],
            answer: 3,
            why: "Doing right when no one is watching means returning what is not yours, even if nobody would ever find out.",
            hints: [
              "It was a mistake, but the money still is not yours, and the cashier may have to pay it back.",
              "Feeling guilty shows your conscience is working, but integrity means acting on it.",
              "Passing the money along does not make it fair. It still belongs to the store.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Integrity is like the foundation of a house. Nobody sees it, and nobody compliments it. But if it is weak, the whole house eventually cracks.",
            example:
              "Diego told his neighbor he would water her plants every day while she was away. On Saturday it rained, and he was tempted to skip Sunday too. He went anyway and checked every pot. When she came home, every plant was healthy, and she asked him to help again the next month.",
            simpler: {
              q: "Which is an example of keeping a promise?",
              choices: [
                "Saying you will call a friend back, then forgetting",
                "Calling a friend back when you said you would",
                "Promising to help, then making an excuse",
              ],
              answer: 1,
              why: "Keeping a promise means doing what you said you would do.",
              hints: [
                "Forgetting is easy to do, but it means the promise was not kept.",
                "",
                "An excuse breaks the promise, even if it sounds reasonable.",
              ],
            },
          },
        },
        {
          title: "Legend or History?",
          teach:
            "You may have heard that young George Washington chopped down his father's cherry tree and confessed, saying he could not tell a lie. That story is a legend. It was added to a biography by Mason Locke Weems in an edition published in 1806, several years after Washington died, and historians have found no evidence it happened. Here is something real. Around age sixteen, Washington copied by hand a list of 110 Rules of Civility and Decent Behaviour, based on older maxims from French teachers. The last rule urges keeping alive the spark of conscience. That notebook still survives. Good thinkers always ask: how do we know this is true?",
          visual: {
            type: "timeline",
            events: [
              { year: 1732, label: "Washington is born", detail: "George Washington is born in Virginia on February 22, 1732." },
              { year: 1748, label: "Copies the Rules of Civility", detail: "Around age sixteen he copies 110 rules of good behavior by hand. The notebook still survives today." },
              { year: 1783, label: "Gives up command", detail: "After the Revolutionary War, he resigns command of the army in December 1783 and goes home, though some thought he could have kept great power." },
              { year: 1799, label: "Washington dies", detail: "Washington dies at Mount Vernon in December 1799." },
              { year: 1806, label: "Cherry tree legend appears", detail: "The cherry tree story is added to an edition of Mason Locke Weems's biography. There is no evidence it really happened." },
            ],
          },
          think: {
            q: "Why do historians call the cherry tree story a legend?",
            choices: [
              "It was first published years after Washington died, with no evidence behind it",
              "Cherry trees did not grow in Virginia",
              "Washington wrote in his diary that it was false",
              "It is too short to be true",
            ],
            answer: 0,
            why: "The story first appeared in a biography after Washington's death, and no earlier record supports it.",
            hints: [
              "",
              "Cherry trees did grow there. The problem is not the tree, but the lack of evidence for the story.",
              "Washington never wrote about it at all. Historians judge it by when and where it first appeared.",
              "Length has nothing to do with truth. Ask instead: who first told it, and when?",
            ],
          },
          approaches: {
            analogy:
              "Imagine a friend tells you a story about your great-grandfather that nobody in the family has ever heard, and there are no letters or photos to back it up. It might be a nice story, but you would be wise to call it a family legend, not fact.",
            example:
              "The cherry tree story first appeared in a Weems edition published in 1806. Washington had died in 1799. Weems claimed an elderly lady told it to him, but nobody else recorded it. Meanwhile, Washington's handwritten copy of the Rules of Civility still exists, so we know that part is real.",
            simpler: {
              q: "What did Washington really copy out by hand as a teenager?",
              choices: ["The Declaration of Independence", "A list of 110 Rules of Civility", "A cherry pie recipe"],
              answer: 1,
              why: "Around age sixteen he copied 110 rules of good behavior, and the notebook still survives.",
              hints: [
                "The Declaration came much later, in 1776, and Thomas Jefferson was its main writer.",
                "",
                "That is a joke answer playing on the cherry tree legend. The real notebook was about behavior.",
              ],
            },
          },
        },
        {
          title: "Trust Is a Brick Wall",
          teach:
            "Integrity builds trust, and trust is how people decide whether to rely on you. Picture trust as a brick wall. Every promise you keep and every true thing you say adds one brick. It takes a long time to build a strong wall. But a single lie can knock out many bricks at once, because now people wonder what else you have not been honest about. Washington was not a perfect man, but people trusted him because he worked to keep his word. When the war ended in 1783, he gave up command of the army and went home to his farm. That choice added a lot of bricks.",
          think: {
            q: "Mateo has kept his word to his parents for months. Then he lies about finishing his homework. What most likely happens?",
            choices: [
              "Nothing, because one lie does not matter",
              "His parents trust him more because he is usually honest",
              "His parents start double-checking what he tells them, and he has to rebuild trust",
            ],
            answer: 2,
            why: "Trust is slow to build and quick to lose. One lie can knock out many bricks at once.",
            hints: [
              "It is tempting to think one small lie is harmless, but it makes people question everything else you say.",
              "A good record helps, but a lie does not add trust. It takes trust away.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Trust is like a glass vase. It takes skill and time to make one, and you can glue it back together after it breaks, but you can still see the cracks for a while.",
            example:
              "Ava's little brother always told the truth, so when he said he had not taken her headphones, she believed him. Later she found them in her own backpack. Because he had built trust over years, one word from him was enough.",
            simpler: {
              q: "Which builds trust over time?",
              choices: ["Keeping small promises again and again", "Making big promises you cannot keep", "Telling people what they want to hear"],
              answer: 0,
              why: "Each kept promise adds another brick to the wall of trust.",
              hints: [
                "",
                "Big promises sound impressive, but breaking them destroys trust.",
                "Flattering people might please them for a moment, but it is not honest, and honesty is what builds trust.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that shows integrity.",
        sentences: [
          "Noah finished mowing the whole lawn even though his dad was away all day.",
          "Grace told her teacher she had accidentally seen a classmate's answers.",
          "Leo promised to help a neighbor carry boxes, then went to the park instead.",
          "Priya returned a wallet she found, with every dollar still inside.",
          "Owen only practiced piano when his mom was in the room.",
          "Mia called her friend back that evening, just as she had promised.",
        ],
        correct: [0, 1, 3, 5],
      },
      explain: {
        prompt: "Explain in your own words what integrity means and why it matters to the people around you.",
        keyPoints: [
          "Integrity means being whole: the same person whether watched or not",
          "It shows through telling the truth, keeping promises and doing right unseen",
          "It builds trust, which is slow to build and quick to lose",
        ],
      },
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
      hook: {
        text: "Have you ever done something in two seconds that you regretted for two weeks? Most bad choices are not made by bad people. They are made by good people who decided too fast.",
        visual: {
          type: "flip",
          cards: [
            { front: "Stop", back: "Pause so your thinking can catch up with your feelings." },
            { front: "List", back: "Name your options. There are almost always more than two." },
            { front: "Think", back: "What happens next, and after that? Who is affected?" },
            { front: "Ask", back: "What would a person of good character do?" },
          ],
        },
      },
      teach: [
        {
          title: "Stop: Let Your Thinking Catch Up",
          teach:
            "You make hundreds of decisions every day. Most are small. A few are big, and for those a simple method fits on four fingers: Stop, List, Think, Ask. The first step, Stop, matters most. Strong feelings like anger, excitement, fear or the wish to fit in push us to act right now. Feelings are fast, but careful thinking is slower. When you pause, even for ten seconds, your thinking gets a chance to catch up. For a really big choice, sleeping on it for one night can help. Stopping is not the same as doing nothing. It is giving your best self time to show up.",
          visual: {
            type: "sequence",
            prompt: "The four steps for a big decision",
            steps: [
              "Stop: pause and let your feelings settle",
              "List: name all your options",
              "Think: picture what happens next and who is affected",
              "Ask: what would a person of good character do?",
            ],
          },
          think: {
            q: "Your friend posts something mean about you, and you feel furious. What is the best first move?",
            choices: [
              "Post something even meaner right away",
              "Delete all your accounts forever",
              "Pause, step away, and decide what to do once you are calm",
              "Tell everyone at school what your friend did",
            ],
            answer: 2,
            why: "Stopping first lets your thinking catch up with your anger, so you do not do something you regret.",
            hints: [
              "Anger makes striking back feel good for a moment, but acting this fast usually makes things worse.",
              "That is a big, sudden choice made in anger. Stopping means pausing, not overreacting.",
              "",
              "This feels like getting justice, but it is still acting on anger before thinking it through.",
            ],
          },
          approaches: {
            analogy:
              "Feelings are like a puppy pulling hard on a leash. Stopping is planting your feet so the puppy does not drag you into the street.",
            example:
              "Ben's sister broke his model airplane. He wanted to break something of hers. Instead he went to his room and counted to fifty. When he came back, he told her calmly how upset he was. She apologized and offered to help him glue it.",
            simpler: {
              q: "What is the first step of the decision method?",
              choices: ["Ask", "Stop", "List"],
              answer: 1,
              why: "Stop comes first, so strong feelings do not push you into acting too fast.",
              hints: [
                "Ask is the last step, after you have thought it through.",
                "",
                "List is important, but it comes after you pause.",
              ],
            },
          },
        },
        {
          title: "List: Look for the Third Path",
          teach:
            "When we feel pressure, we often think we only have two choices: yes or no, go along or fight. That feeling of being trapped is usually wrong. There are almost always more options. You could ask for help, wait, suggest a different plan, or do part of something. Imagine your friends want to sneak into a movie without paying. It might feel like your only choices are to go along or to lose your friends. But a third path exists: suggest everyone buys tickets, or pick something else to do together. Listing your options out loud or on paper helps you find the path that a quick yes or no would miss.",
          visual: {
            type: "compare",
            left: {
              title: "Trapped thinking",
              points: [
                "I only have two choices",
                "Either I go along or I lose my friends",
                "I have to decide right now",
              ],
            },
            right: {
              title: "Third-path thinking",
              points: [
                "Let me name every option",
                "I could suggest a better plan we all enjoy",
                "I can ask for help or take time to think",
              ],
            },
          },
          think: {
            q: "A classmate asks to copy your homework. Which is a good third path?",
            choices: [
              "Offer to explain how you solved the problems so they can do it themselves",
              "Let them copy it",
              "Ignore them forever",
            ],
            answer: 0,
            why: "Helping them understand is a third path that is both kind and honest.",
            hints: [
              "",
              "Saying yes feels friendly, but copying is dishonest and does not help them learn.",
              "Saying no is honest, but ignoring them forever is unkind. Is there a way to say no and still help?",
            ],
          },
          approaches: {
            analogy:
              "A maze can look like a dead end until you step back and see the whole map. Listing your options is like climbing a ladder to look over the maze.",
            example:
              "Isla was invited to two birthday parties on the same afternoon. At first she thought she had to pick one and disappoint the other friend. Then she listed more options: go to one for the first hour and the other for the second, or celebrate with one friend the next day. She did the first, and both friends were happy.",
            simpler: {
              q: "According to the lesson, how many options do you usually have?",
              choices: ["Only one", "Exactly two: yes or no", "Almost always more than two"],
              answer: 2,
              why: "There is almost always a third path, such as asking for help or suggesting a different plan.",
              hints: [
                "When we are stressed it can feel like there is only one way, but stopping and listing usually reveals more.",
                "Yes or no is how pressure makes it feel. Look for other paths.",
                "",
              ],
            },
          },
        },
        {
          title: "Think: And Then What?",
          teach:
            "The third step is to think through what will happen. For each option, ask: what happens next? Then ask again: and after that? Many choices feel great for five minutes and terrible for five weeks. Others are hard right now but lead somewhere good. Also ask who else is affected: your family, your friends, the people who trusted you. Finally, imagine yourself tomorrow and a year from now. Will you be glad you made this choice, or embarrassed by it? Thinking ahead like this is the virtue of wisdom in action. It turns a guess into a real decision.",
          visual: {
            type: "hotspots",
            title: "Questions for the Think Step",
            center: "One option",
            spots: [
              { label: "What happens next?", icon: "➡️", detail: "Picture the very first result of this choice." },
              { label: "And after that?", icon: "⏩", detail: "Keep going. Many choices feel good now but cause trouble later." },
              { label: "Who is affected?", icon: "👥", detail: "Think about family, friends and anyone who trusts you." },
              { label: "Tomorrow?", icon: "🌅", detail: "How will you feel about this when you wake up?" },
              { label: "In a year?", icon: "📅", detail: "Will this matter, and will you be proud of it?" },
            ],
          },
          think: {
            q: "You could stay up until 2 a.m. playing a game the night before a big test. Using And then what?, what is the best thinking?",
            choices: [
              "It will be fun tonight, so it is a good choice",
              "Fun tonight, then tired during the test, then a lower grade and stress, so it is not worth it",
              "Nobody will know, so it does not matter",
              "Everyone stays up late sometimes",
            ],
            answer: 1,
            why: "Following the chain of consequences shows that a fun night leads to a hard morning and a worse result.",
            hints: [
              "That only looks at the first step. Ask what happens after that.",
              "",
              "Whether anyone knows does not change the consequences for you the next day.",
              "What others do is not the question. Think about what happens to you next.",
            ],
          },
          approaches: {
            analogy:
              "Thinking ahead is like playing chess. A beginner looks only at the piece they can capture right now. A good player asks what the other side will do next, and what happens after that.",
            example:
              "Zoe wanted to spend all her birthday money on candy. She thought it through: candy gone in a week, then nothing left for the art kit she had wanted for months. She bought a little candy and saved the rest. Two weeks later she bought the art kit.",
            simpler: {
              q: "In the Think step, which question should you ask?",
              choices: ["What is the most fun right now?", "What would be most popular?", "What happens next, and after that?"],
              answer: 2,
              why: "The Think step is about following consequences forward and seeing who is affected.",
              hints: [
                "Fun right now is just the first moment. The Think step looks further ahead.",
                "Popularity is about other people's opinions, not the actual results of your choice.",
                "",
              ],
            },
          },
        },
        {
          title: "Ask: What Would a Person of Good Character Do?",
          teach:
            "The last step is a single powerful question: what would a person of good character do? Picture someone you admire for their honesty and wisdom, maybe a grandparent, a coach, or a hero from history. Imagine them in your shoes. This question often cuts through confusion instantly. Suppose you promised to help your grandmother on Saturday, and then friends invite you on a fun trip that day. A person of good character would not just skip her. They would either keep the promise or honestly ask her whether another day works. Good decisions are rarely about being clever. They are about slowing down and letting your values lead.",
          think: {
            q: "You promised to help your grandmother Saturday, and then you are invited on a fun trip that day. Which choice fits good character?",
            choices: [
              "Go on the trip and tell her you got sick",
              "Go on the trip without telling her",
              "Help her but complain the whole time",
              "Keep your promise, or honestly ask her if another day works",
            ],
            answer: 3,
            why: "Keeping your word or openly asking to change plans both treat her with honesty and respect.",
            hints: [
              "It avoids an awkward talk, but it adds a lie on top of a broken promise.",
              "Skipping without a word breaks a promise and leaves her waiting.",
              "Showing up keeps the promise, but grumbling is not the kind of help a person of good character gives.",
              "",
            ],
          },
          approaches: {
            analogy:
              "The Ask question works like a compass. When you are lost in the woods of a hard choice, it does not tell you every step, but it always points you toward true north.",
            example:
              "Kai found a test answer key left in a shared folder. He asked himself what his coach, who always played fair, would do. The answer was obvious. He closed the file and told his teacher it was visible so she could fix it.",
            simpler: {
              q: "What question do you ask in the last step?",
              choices: [
                "What would a person of good character do?",
                "What would make me look coolest?",
                "What is the easiest thing to do?",
              ],
              answer: 0,
              why: "Asking what a person of good character would do brings clarity to hard choices.",
              hints: [
                "",
                "Looking cool is about what others think, not about doing what is right.",
                "The easiest choice is often not the best one. The last step is about character.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Your friends want you to sneak into a movie without paying. Put the steps of a good decision in order.",
        steps: [
          "Notice the pressure to fit in and take a breath before answering",
          "List the options: go along, go home, or suggest everyone buys tickets or does something else",
          "Think: sneaking in is dishonest and could get everyone in trouble",
          "Ask: a person of good character would not take what is not theirs",
          "Suggest buying tickets or another fun plan, and stick with your choice",
        ],
      },
      explain: {
        prompt: "Teach the Stop, List, Think, Ask method to a younger friend in your own words, using an example.",
        keyPoints: [
          "Stop: pause so feelings do not push you to act too fast",
          "List: there are usually more than two options",
          "Think: consider what happens next, later, and who is affected",
          "Ask: what would a person of good character do?",
        ],
      },
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
      hook: {
        text: "Imagine your ship crushed by ice, twenty-eight people camped on floating ice floes, and no radio to call for help. About two years after they set sail, every one of those twenty-eight men came home alive. How did their leader pull that off?",
      },
      teach: [
        {
          title: "Trapped in the Ice",
          teach:
            "In 1914, the explorer Ernest Shackleton sailed for Antarctica on a ship named Endurance. His plan was to cross the frozen continent on foot. He never reached the shore. In January 1915 the ship became trapped in the pack ice of the Weddell Sea. For months it drifted, locked in place. In October the crew had to abandon ship, and in November 1915 the ice crushed it and it sank. The men camped on the ice for months. In April 1916 they rowed three small lifeboats to remote Elephant Island. Then Shackleton and five companions sailed a tiny boat about 800 miles for help. In August 1916 he rescued everyone left behind.",
          visual: {
            type: "timeline",
            events: [
              { year: 1914, label: "Endurance sets sail", detail: "Shackleton's ship leaves England in August 1914, and South Georgia in December, heading for Antarctica." },
              { year: 1915, label: "Trapped and crushed", detail: "In January 1915 the ship is frozen into the Weddell Sea ice. The crew abandons it in October, and it sinks in November." },
              { year: 1916, label: "Lifeboats to Elephant Island", detail: "In April 1916 the men row three lifeboats to Elephant Island, their first solid ground in over a year." },
              { year: 1916, label: "The James Caird voyage", detail: "Shackleton and five men sail about 800 miles in a small boat to South Georgia, then cross its icy mountains to reach a whaling station in May." },
              { year: 1916, label: "Everyone rescued", detail: "After several failed attempts, Shackleton returns on the Chilean ship Yelcho on August 30, 1916. All 22 men on Elephant Island are alive." },
            ],
          },
          think: {
            q: "After the Endurance sank, the crew was far from any help. What made the situation so dangerous?",
            choices: [
              "They had run out of maps",
              "They were stranded on drifting ice with no ship and no way to call for help",
              "They were lost in a desert",
            ],
            answer: 1,
            why: "With the ship gone and no radio contact, the men had only the ice, their lifeboats and their leader.",
            hints: [
              "Maps would not have helped much. The real problem was having no ship and no way to call anyone.",
              "",
              "Antarctica is sometimes called a cold desert, but they were stranded on sea ice, not sand.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a camping trip where your tent blows away, the road washes out, and your phone has no signal. Now imagine that for a year and a half, in freezing cold. That was the challenge facing Shackleton's crew.",
            example:
              "When Shackleton reached the whaling station at Stromness in May 1916, he had been gone so long and looked so ragged that the station manager, who had met him before, did not recognize him at first. Shackleton immediately began planning how to rescue his men.",
            simpler: {
              q: "What was the name of Shackleton's ship?",
              choices: ["Titanic", "Mayflower", "Endurance", "James Caird"],
              answer: 2,
              why: "The ship was named Endurance, a fitting name for what the crew had to do.",
              hints: [
                "The Titanic was a different famous ship that sank in 1912 after hitting an iceberg.",
                "The Mayflower carried the Pilgrims to America in 1620.",
                "",
                "The James Caird was one of the lifeboats, not the main ship.",
              ],
            },
          },
        },
        {
          title: "Serve First and Set the Example",
          teach:
            "How did Shackleton keep everyone alive? First, he served first. When the warm reindeer-fur sleeping bags were handed out by drawing lots, Shackleton and his officers ended up with the thinner wool bags, leaving the warmer ones for the crew. A boss expects to be served. A leader serves. Second, he set the example. Freezing, hungry men watch their leader closely. If he panicked, they would panic. So Shackleton stayed calm and cheerful, kept daily routines going, and did hard work himself. People follow what a leader does far more than what a leader says.",
          visual: {
            type: "compare",
            left: {
              title: "A true leader",
              points: [
                "Serves the team first",
                "Does hard jobs too",
                "Stays calm to steady others",
                "Says let us go",
              ],
            },
            right: {
              title: "A boss only",
              points: [
                "Expects to be served",
                "Gives orders and watches",
                "Lets mood swing with problems",
                "Says you go",
              ],
            },
          },
          think: {
            q: "You are captain of a team cleaning up after a party. Which choice best follows Shackleton's example?",
            choices: [
              "Tell everyone what to do and relax on the couch",
              "Do only the easy jobs since you are in charge",
              "Leave early because captains have other things to do",
              "Take the messiest job yourself and keep everyone's spirits up",
            ],
            answer: 3,
            why: "Serving first and setting a cheerful example is what made Shackleton's crew follow him.",
            hints: [
              "Giving directions is part of leading, but a leader who sits out loses the team's respect.",
              "Being in charge is not a reason to take the easy jobs. Shackleton took the worse sleeping bag.",
              "Leaving early sends the message that the work is beneath you.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A good leader is like the lead goose in a V formation. The lead bird takes the strongest wind so the others can fly more easily behind it.",
            example:
              "On the James Caird voyage, Shackleton watched his men closely. Navigator Frank Worsley later recalled that when someone seemed weak or discouraged, he would order hot milk made for everyone, so the struggling man got help without being singled out or embarrassed.",
            simpler: {
              q: "Who ended up with the thinner wool sleeping bags?",
              choices: ["The youngest sailors", "Shackleton and his officers", "Nobody, there were enough fur bags"],
              answer: 1,
              why: "Shackleton and his officers took the wool bags, leaving the warmer fur ones for the crew.",
              hints: [
                "Shackleton did not give the worst gear to the youngest men. Think about who served first.",
                "",
                "There were not enough fur bags, which is why lots were drawn.",
              ],
            },
          },
        },
        {
          title: "A Clear Goal When Plans Change",
          teach:
            "Shackleton's original goal was to cross Antarctica. Once the ship was lost, that goal was impossible. A weaker leader might have kept clinging to the old plan, or given up. Shackleton did something wiser. He told the crew plainly that the mission had changed. Now there was only one goal: bring everyone home alive. That clear goal helped every man know what mattered. Extra weight was left behind, including many personal belongings, because survival came first. When things go wrong, a team gets confused and scared. A leader's job is to say clearly: here is where we are going now.",
          visual: {
            type: "hotspots",
            title: "What Made Shackleton a Great Leader",
            center: "A good leader",
            spots: [
              { label: "Serves first", icon: "🛌", detail: "Took the thinner sleeping bag so his men could stay warmer." },
              { label: "Sets the example", icon: "🔥", detail: "Stayed calm and cheerful so his crew would too." },
              { label: "Gives a clear goal", icon: "🎯", detail: "When the ship sank, he told the crew the new goal: everyone home alive." },
              { label: "Gives credit", icon: "🏅", detail: "Praised his men's skill, especially navigator Frank Worsley." },
              { label: "Takes responsibility", icon: "🛡️", detail: "Never blamed his crew. The decisions and the duty to rescue them were his." },
            ],
          },
          think: {
            q: "Your family's beach day is rained out, and everyone is grumpy. What would a Shackleton-style leader do?",
            choices: [
              "Announce a clear new plan, like an indoor picnic and game afternoon",
              "Insist on going to the beach in the rain anyway",
              "Go to your room and sulk",
            ],
            answer: 0,
            why: "When plans change, a leader sets a clear new goal so the group knows what to do.",
            hints: [
              "",
              "Sticking to an old plan that no longer works is not leadership. Shackleton changed his goal when he had to.",
              "That is understandable, but it leaves the group without direction. Someone needs to set a new goal.",
            ],
          },
          approaches: {
            analogy:
              "A clear goal is like a lighthouse. When the sea is stormy and dark, sailors may not see much else, but they can always steer toward the light.",
            example:
              "When the crew left the sinking ship, Shackleton told each man to keep only a small amount of personal gear. He set the example by dropping gold coins and a gold watch on the ice himself, then a Bible after tearing out a few pages to keep. Everyone understood: survival came first.",
            simpler: {
              q: "After the ship sank, what became the crew's goal?",
              choices: ["Cross Antarctica anyway", "Bring everyone home alive", "Find a new ship to buy"],
              answer: 1,
              why: "Shackleton changed the mission to survival so every man knew what mattered most.",
              hints: [
                "That was the original plan, but without a ship it was impossible.",
                "",
                "There was nowhere to buy a ship. The goal had to be survival.",
              ],
            },
          },
        },
        {
          title: "Give Credit, Take Responsibility",
          teach:
            "Two more habits made Shackleton great. He gave credit. He praised his men's skill and courage, especially navigator Frank Worsley. On the James Caird, under cloudy skies, Worsley could only glimpse the sun a few times with his sextant, yet his careful calculations guided the tiny boat to South Georgia. Shackleton made sure people knew it. He also took responsibility. He never blamed his crew for the disaster. The decisions had been his, so the duty to get everyone out was his too. Here is a simple rule: when things go well, a leader points to the team. When things go wrong, a leader points to himself.",
          visual: {
            type: "flip",
            cards: [
              { front: "When things go well...", back: "A leader gives credit to the team and names what each person did." },
              { front: "When things go wrong...", back: "A leader takes responsibility instead of blaming others." },
              { front: "Frank Worsley", back: "The navigator whose careful work guided the James Caird about 800 miles to South Georgia." },
            ],
          },
          think: {
            q: "Your group project gets a poor grade because you forgot to submit one section. What should you say?",
            choices: [
              "It was the teacher's fault for a confusing website",
              "Say nothing and hope no one notices",
              "Tell the group it was your mistake and suggest how to fix it next time",
              "Blame the teammate who wrote that section",
            ],
            answer: 2,
            why: "Taking responsibility, as Shackleton did, earns trust and helps the team improve.",
            hints: [
              "The website may be confusing, but blaming others avoids the real lesson.",
              "Staying quiet protects you for a moment, but it is not taking responsibility.",
              "",
              "They wrote it, but you forgot to submit it. Pointing at them is the opposite of what a leader does.",
            ],
          },
          approaches: {
            analogy:
              "A good leader is like a window and a mirror. When things go well, they look out the window to see who deserves credit. When things go wrong, they look in the mirror.",
            example:
              "After a soccer win, team captain Rosa told a reporter for the school paper that the goalie's saves made the difference. After a loss the next week, she said she had not organized the defense well and would work on it. Her teammates trusted her more than ever.",
            simpler: {
              q: "When things go well, what does a good leader do?",
              choices: ["Takes all the credit", "Gives credit to the team", "Says nothing about anyone"],
              answer: 1,
              why: "A good leader points to the team when things go well, like Shackleton praising Worsley.",
              hints: [
                "Taking all the credit makes the team feel unappreciated.",
                "",
                "Staying silent misses a chance to thank people who worked hard.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each action: does it show a true leader or a boss only?",
        buckets: ["True leader", "Boss only"],
        items: [
          { text: "Takes the hardest job on the team", bucket: 0 },
          { text: "Thanks each helper for something specific", bucket: 0 },
          { text: "Says the mistake was theirs and plans a fix", bucket: 0 },
          { text: "Stays calm and cheerful when things go wrong", bucket: 0 },
          { text: "Keeps the best snacks for themselves", bucket: 1 },
          { text: "Blames teammates when the plan fails", bucket: 1 },
          { text: "Takes credit for everyone else's work", bucket: 1 },
          { text: "Gives orders and then watches others work", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Using the story of Shackleton and the Endurance, explain in your own words what makes someone a good team leader.",
        keyPoints: [
          "A leader serves first and sets the example, like taking the thinner sleeping bag",
          "A leader gives a clear goal, especially when plans change",
          "A leader gives credit to others and takes responsibility for problems",
        ],
      },
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
      hook: {
        text: "On one November day in 1863, two men gave speeches at the same event. One spoke for about two hours, and the other for about two minutes. Only one of those speeches is still memorized by students today. Can you guess which?",
      },
      teach: [
        {
          title: "Two Hours or Two Minutes",
          teach:
            "In July 1863, a terrible three-day battle was fought at Gettysburg, Pennsylvania. That November, thousands gathered to dedicate a cemetery for the soldiers who died there. The main speaker, Edward Everett, was a famous orator, and he spoke for about two hours. Then President Abraham Lincoln stood and spoke for about two minutes, using only around 270 words. It is Lincoln's short speech that people still memorize. It begins with the words Four score and seven years ago. A score is twenty, so four score and seven is eighty-seven, pointing back to 1776. Great speeches are not great because they are long. They are great because they are clear.",
          visual: {
            type: "timeline",
            events: [
              { year: 1776, label: "A new nation", detail: "The Declaration of Independence is adopted on July 4, 1776. Lincoln's four score and seven years points back to this year." },
              { year: 1863, label: "Battle of Gettysburg", detail: "A three-day battle in July 1863, one of the largest of the Civil War." },
              { year: 1863, label: "The Gettysburg Address", detail: "On November 19, 1863, Lincoln speaks for about two minutes at the new cemetery. Edward Everett spoke for about two hours before him." },
            ],
          },
          think: {
            q: "Why do people remember Lincoln's two-minute speech more than Everett's two-hour one?",
            choices: [
              "Lincoln spoke louder than Everett",
              "Everett's speech was never written down",
              "Lincoln was the only one who spoke that day",
              "Lincoln's speech was short, clear and powerful",
            ],
            answer: 3,
            why: "A clear, focused message is easier to remember than a long one.",
            hints: [
              "Volume might help a crowd hear, but it is not why a speech lasts for over 150 years.",
              "Everett's speech was printed too. People remember Lincoln's because of how it was written.",
              "Everett spoke first and spoke much longer. Both men gave speeches.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of a song chorus that sticks in your head after hearing it once, compared with a long lecture you forget by lunch. Short and clear sticks.",
            example:
              "The day after the ceremony, Everett wrote Lincoln a note saying he wished he had come as close to the central idea of the occasion in two hours as Lincoln had in two minutes. Even the expert recognized the power of a short, clear speech.",
            simpler: {
              q: "What does four score and seven years mean?",
              choices: ["Forty-seven years", "Eighty-seven years", "Seventy-four years"],
              answer: 1,
              why: "A score is twenty, so four score is eighty, plus seven makes eighty-seven.",
              hints: [
                "It is easy to read four as forty, but a score means twenty, so multiply four by twenty.",
                "",
                "You may have flipped the numbers. Four score is eighty, then add seven.",
              ],
            },
          },
        },
        {
          title: "Hook, Three Points, Strong Close",
          teach:
            "Most good short speeches follow a simple shape. Start with a hook: a question, a surprising fact or a quick story that makes people want to listen. Lincoln's opening line grabbed attention and set the stage at once. Next, give three main points. Three is easy for listeners to remember, and it gives your speech a steady rhythm: first, second, third. Each point can have a short example. Finally, close strong. Repeat your big idea in one memorable sentence, or ask your audience to do something. Your first and last sentences are the ones people remember most, so plan them carefully.",
          visual: {
            type: "sequence",
            prompt: "The shape of a strong short speech",
            steps: [
              "Hook: a question, surprising fact or quick story",
              "First main point with an example",
              "Second main point with an example",
              "Third main point with an example",
              "Strong close: repeat your big idea or ask the audience to act",
            ],
          },
          think: {
            q: "Which is the strongest hook for a speech about honesty?",
            choices: [
              "Today I will talk about honesty.",
              "Have you ever told a tiny lie that grew into a giant problem?",
              "Honesty is a word with seven letters.",
            ],
            answer: 1,
            why: "A question about the listener's own life makes them curious and pulls them in.",
            hints: [
              "This tells the topic, but it does not make anyone curious. A hook needs a spark.",
              "",
              "It is a fact, but not one that makes people care. A good surprising fact connects to the big idea.",
            ],
          },
          approaches: {
            analogy:
              "A speech is like a hamburger. The hook is the top bun, the three points are the fillings, and the strong close is the bottom bun that holds it all together. Without the buns, it falls apart in your hands.",
            example:
              "Speech on courage. Hook: what is scarier, a lion or a classroom full of faces? Point one: courage is not having no fear. Point two: courage is often quiet, like admitting a mistake. Point three: courage grows with practice. Close: so next time you feel afraid, remember that fear is where courage begins.",
            simpler: {
              q: "What comes first in a good speech?",
              choices: ["A hook", "The strong close", "The third point"],
              answer: 0,
              why: "The hook comes first to grab attention so people want to listen.",
              hints: [
                "",
                "The close comes at the end, to leave people with your big idea.",
                "The points come in the middle, after you have caught people's attention.",
              ],
            },
          },
        },
        {
          title: "Your Body Speaks Too",
          teach:
            "Listeners do not only hear your words. They watch you. Stand tall with your feet planted, not swaying or shuffling. Look at people's faces, moving your eyes around the room instead of staring at the floor or your notes. Use your hands naturally, to show size or to count your three points on your fingers. Speak a little slower and a little louder than feels normal, because nerves make most people rush. And do not be afraid of a short pause. A pause gives listeners time to think about what you said, and it makes you look calm and in control, even if your heart is racing.",
          visual: {
            type: "compare",
            left: {
              title: "Nervous habits",
              points: [
                "Swaying or shuffling feet",
                "Staring at the floor or notes",
                "Rushing to finish",
                "Filling every silence with um",
              ],
            },
            right: {
              title: "Confident habits",
              points: [
                "Standing tall with feet planted",
                "Looking at faces around the room",
                "Speaking a little slower and louder",
                "Using short, calm pauses",
              ],
            },
          },
          think: {
            q: "Halfway through your speech you forget your next line. What is the best move?",
            choices: [
              "Pause calmly, glance at your note card, and continue",
              "Say sorry over and over",
              "Stop and sit down",
              "Speed up and skip to the end",
            ],
            answer: 0,
            why: "A short pause looks calm, and a quick look at your card gets you back on track.",
            hints: [
              "",
              "Apologizing draws attention to the mistake. Most listeners would not even notice a short pause.",
              "Forgetting a line happens to everyone. A pause and a glance at your notes fixes it.",
              "Rushing makes nerves worse and leaves out your important points.",
            ],
          },
          approaches: {
            analogy:
              "Your body language is like the music in a movie. Even if the words are good, the wrong music makes a scene feel nervous. Calm posture and steady eyes play the right music for your words.",
            example:
              "Liam practiced his speech twice: once rushing and staring at his paper, once standing tall, looking at his family and pausing after each point. Same words both times, but his family said the second version sounded twice as confident.",
            simpler: {
              q: "How should you speak when giving a speech?",
              choices: ["As fast as possible", "Very quietly", "A little slower and louder than normal"],
              answer: 2,
              why: "Nerves make people rush and mumble, so slowing down and speaking up helps listeners follow you.",
              hints: [
                "Finishing fast might feel like relief, but listeners will miss what you say.",
                "Speaking quietly makes it hard for people to hear you.",
                "",
              ],
            },
          },
        },
        {
          title: "Practice Beats Nerves",
          teach:
            "Almost everyone feels nervous before speaking, even experienced speakers. A pounding heart does not mean you are bad at it. It means you care. The best cure is practice, and practice means saying your speech out loud, not just running it through your head. Your mouth needs practice too. Build up step by step: say it alone, then in front of a mirror, then for one person, then for a small group. Use a small card with just a few key words instead of reading every word from a page, so you can look up at your listeners. Each time you practice, the speech feels more like yours.",
          visual: {
            type: "sequence",
            prompt: "The practice ladder",
            steps: [
              "Write a small note card with just key words",
              "Say the speech out loud alone",
              "Practice in front of a mirror",
              "Give it to one person",
              "Give it to a small group",
            ],
          },
          think: {
            q: "You have a speech on Friday and feel nervous. Which plan will help most?",
            choices: [
              "Read it silently once on Friday morning",
              "Write every word on a page so you can read it",
              "Avoid thinking about it until Friday",
              "Practice it out loud several times, first alone and then for family",
            ],
            answer: 3,
            why: "Practicing out loud, building up to a small audience, is the best cure for nerves.",
            hints: [
              "Reading silently is not the same as saying it. Your voice needs practice too.",
              "A full page feels safe, but reading it stops you from looking at your audience.",
              "Avoiding it usually makes nerves grow. Practice shrinks them.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Learning to give a speech is like learning to ride a bike. Reading about bikes does not help much. You have to actually get on and ride, wobbly at first, until it feels natural.",
            example:
              "Hannah was so nervous about her 4-H presentation that her voice shook the first time she practiced. By the fifth time out loud, she knew it well enough to look up from her card. On the day, she was still a little nervous, but she finished strong and even smiled.",
            simpler: {
              q: "What is the best way to practice a speech?",
              choices: ["Out loud, several times", "Only in your head", "Not at all, so it sounds natural"],
              answer: 0,
              why: "Saying your speech out loud builds confidence much better than just thinking it.",
              hints: [
                "",
                "Thinking it through helps, but your voice and mouth need practice too.",
                "Skipping practice usually makes a speech sound shaky, not natural.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that would make a strong hook for a speech.",
        sentences: [
          "What would you do if you were stranded on the ice with no way to call for help?",
          "My speech is about a person I admire.",
          "In 1863, a two-minute speech outlasted a two-hour one.",
          "Um, so, I guess I will start now.",
          "Last summer, I watched my grandfather run back into a storm to help a neighbor.",
          "That is all I have to say. Thank you.",
        ],
        correct: [0, 2, 4],
      },
      explain: {
        prompt: "In your own words, explain how to plan and deliver a short speech that people will remember.",
        keyPoints: [
          "Start with a hook, give three main points, and close strong",
          "Stand tall, make eye contact, speak slowly and use pauses",
          "Practice out loud several times to beat nerves",
          "Short and clear can be powerful, like the Gettysburg Address",
        ],
      },
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
