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
          probe: {
            type: "cloze",
            text: "Marcus wrote the Meditations for no audience but himself, so he was training his real {0}, not his reputation. He learned that the cardinal virtues get their name from the Latin word for {1}, because the rest of good character {2} on them.",
            blanks: [
              { answers: ["character"] },
              { answers: ["hinge"] },
              { answers: ["swings", "turns", "hangs"] },
            ],
            bank: ["character", "hinge", "swings", "fame", "bird", "reputation", "sleeps"],
            hint: "Remember that nobody else was meant to read his notebook, and think about what a door swings on.",
            mistakes: [
              { match: "fame", coach: "Marcus never planned to publish his notes. Fame needs an audience, and he had none but himself." },
              { match: "reputation", coach: "Reputation is what others think of you. Private notes nobody reads cannot change that, so what was he really training?" },
              { match: "bird", coach: "The red bird shares the name, but the word for the virtues means the part a door turns on." },
            ],
            seconds: 35,
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
          probe: {
            type: "sort",
            prompt: "Is each choice mostly about how you think ahead (wisdom) or how you treat others fairly (justice)?",
            buckets: ["Wisdom", "Justice"],
            items: [
              { text: "Splitting 12 prize cookies so each of the 4 workers gets 3", bucket: 1 },
              { text: "Planning two pages a night for a report due Friday", bucket: 0 },
              { text: "Returning your cousin's bike before she has to ask", bucket: 1 },
              { text: "Packing a raincoat after checking tomorrow's forecast", bucket: 0 },
              { text: "Thanking your sister in your report for finding a quote", bucket: 1 },
              { text: "Saving half your allowance for something you want next month", bucket: 0 },
            ],
            hint: "Ask yourself: is this choice mostly about looking ahead, or about giving another person what they are owed?",
            mistakes: [
              { match: "Cookie split sorted as wisdom", coach: "Sharing evenly is about giving each teammate what they earned. That is fairness to others, which is justice." },
              { match: "Thanking your sister sorted as wisdom", coach: "Giving someone credit for their help gives them what they are owed. That points to justice." },
              { match: "Saving allowance sorted as justice", coach: "No one else is owed anything here. Saving is about thinking ahead for your future self, which is wisdom." },
            ],
            seconds: 45,
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
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that shows real courage, not recklessness or fearlessness.",
            sentences: [
              "Tess told her coach she left the gate open, even though her voice was shaking.",
              "Max rode his bike off a ramp with no helmet because his friends dared him.",
              "Ruby tried out for the play, knowing she might not get a part.",
              "Eli said he never feels scared of anything, so he must be brave.",
              "Jonah told his friends he would not join in teasing the new kid, even though he was afraid they would laugh at him.",
              "Kara climbed onto the garage roof to get likes on a video.",
            ],
            correct: [0, 2, 4],
            hint: "Look for someone who feels afraid and still does the right thing for a good reason.",
            mistakes: [
              { match: "Tapped the bike ramp dare", coach: "A dangerous stunt for a dare has no good reason behind it. That is recklessness, not courage." },
              { match: "Tapped Eli who never feels scared", coach: "Courage is not the absence of fear. Eli has not done anything right in spite of fear." },
              { match: "Tapped the garage roof video", coach: "Taking a risk just to show off is recklessness. Courage takes risks for a good reason." },
            ],
            seconds: 40,
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
          probe: {
            type: "build",
            prompt: "Jordan wants to grow in courage. Build the path from one small choice to real character.",
            tiles: [
              "Face a small choice, like whether to speak up in class",
              "Choose the right thing, even though it is a little hard",
              "Repeat that choice day after day",
              "It becomes a habit and gets easier",
              "The habit becomes part of who he is",
            ],
            distractors: ["Wait for a big emergency to be a hero", "Do a dangerous stunt to prove himself"],
            hint: "Think about how a muscle grows: one small rep, then many reps, then real strength.",
            mistakes: [
              { match: "Used the big emergency tile", coach: "Big moments are rare. If Jordan waits for one, he will not have practiced when it comes." },
              { match: "Used the dangerous stunt tile", coach: "A stunt is recklessness, and it skips the daily practice that builds real courage." },
              { match: "Put habit before repeating", coach: "A habit only forms after you repeat a choice many times. Which has to come first?" },
            ],
            seconds: 40,
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
      mastery: [
        {
          type: "match",
          prompt: "Match each moment to the virtue it shows best.",
          pairs: [
            { left: "Asking a trusted adult for advice before a big choice", right: "Wisdom" },
            { left: "Paying back a friend the five dollars you owe", right: "Justice" },
            { left: "Inviting the new kid to sit with you when others will not", right: "Courage" },
            { left: "Closing the game when your screen time is up", right: "Self-control" },
          ],
          hint: "For each moment, ask: is this about thinking ahead, being fair, acting despite fear, or mastering a want?",
          mistakes: [
            { match: "Swapped wisdom and self-control", coach: "Wisdom is about seeing clearly and choosing well. Self-control is about saying no to a want in the moment." },
            { match: "Matched inviting the new kid to justice", coach: "Kindness is fair, but the hard part here is the fear of what others think. Which virtue acts in spite of fear?" },
            { match: "Matched paying back money to self-control", coach: "Paying back gives your friend what they are owed. That is the heart of justice." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Courage is not the absence of {0}. It is doing what is right anyway. Taking a foolish risk just to show off is called {1}, and the ancients called self-control {2}.",
          blanks: [
            { answers: ["fear", "being afraid", "feeling afraid"] },
            { answers: ["recklessness", "reckless"] },
            { answers: ["temperance"] },
          ],
          hint: "Think back to the courage versus recklessness comparison and the old name for mastering your wants.",
          mistakes: [
            { match: "danger", coach: "Courage often faces danger. The lesson says it is not the absence of a feeling. Which feeling?" },
            { match: "bravery", coach: "Bravery is another word for courage. The word you want names the opposite: risk with no good reason." },
            { match: "prudence", coach: "Prudence is the old name for wisdom. Self-control had a different old name." },
          ],
          seconds: 50,
        },
        {
          type: "place",
          prompt: "Marcus Aurelius ruled Rome while writing the Meditations. Place the start and end of his reign on the timeline (AD).",
          min: 100,
          max: 250,
          step: 1,
          tolerance: 5,
          items: [
            { label: "Marcus Aurelius becomes emperor", value: 161 },
            { label: "Marcus Aurelius dies, ending his reign", value: 180 },
          ],
          hint: "He ruled for about twenty years in the second century AD, the years starting with 1.",
          mistakes: [
            { match: "Placed his reign in the 200s", coach: "Marcus ruled in the second century AD, in the 100s, not the 200s." },
            { match: "Placed the reign much longer than twenty years", coach: "His reign lasted only about nineteen years. Bring the two markers closer together." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build Marcus's big secret about how good character is made.",
          tiles: ["Virtues", "grow like muscles", "through", "small", "repeated", "choices"],
          distractors: ["all at once", "on one heroic day"],
          hint: "Think of push-ups: strength comes from many small reps, not one giant lift.",
          mistakes: [
            { match: "Used all at once", coach: "Nobody becomes brave or wise in a single day. Character is built slowly." },
            { match: "Used on one heroic day", coach: "Big heroic moments are rare. The lesson says ordinary days of small choices do the work." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "cloze",
            text: "Integrity shares a root with {0}, which means a {1} number. Ellie is kind only when the teacher is around, so she is missing integrity: a person of integrity acts the same whether or not anyone is {2}.",
            blanks: [
              { answers: ["integer"] },
              { answers: ["whole", "complete"] },
              { answers: ["watching", "looking"] },
            ],
            bank: ["integer", "interrupt", "whole", "broken", "watching", "laughing", "sleeping"],
            hint: "Look for the math word that means a number not split into pieces, then think about what changes for Ellie at recess.",
            mistakes: [
              { match: "interrupt", coach: "Interrupt starts with the same letters but means to break in. Integrity is about being whole." },
              { match: "broken", coach: "A person of integrity is the opposite of broken or split. Which word means all in one piece?" },
              { match: "laughing", coach: "The difference for Ellie is not who is laughing, but whether an adult can see her." },
            ],
            seconds: 35,
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
          probe: {
            type: "sort",
            prompt: "Sort each action into the way it shows integrity.",
            buckets: ["Tell the truth", "Keep promises", "Do right unseen"],
            items: [
              { text: "Admitting you ate the last brownie when your mom asks", bucket: 0 },
              { text: "Telling your teacher you forgot your homework instead of making up an excuse", bucket: 0 },
              { text: "Watering the neighbor's plants every day, just as you said you would", bucket: 1 },
              { text: "Showing up at 9 sharp to help, because that is the time you agreed to", bucket: 1 },
              { text: "Handing back five extra dollars a cashier gave you by mistake when nobody noticed", bucket: 2 },
              { text: "Sweeping every corner of the garage even though no one will check", bucket: 2 },
            ],
            hint: "Ask: is the person being honest when asked, doing what they said they would, or doing right when nobody would ever know?",
            mistakes: [
              { match: "Cashier money sorted as tell the truth", coach: "Nobody asked and nobody noticed. The key is that no one was watching, so this is doing right unseen." },
              { match: "Watering plants sorted as do right unseen", coach: "It happens unseen, but the reason it matters is that you gave your word. That is keeping a promise." },
              { match: "Forgotten homework sorted as keep promises", coach: "The choice here is between an excuse and the truth. That is telling the truth." },
            ],
            seconds: 55,
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
          probe: {
            type: "place",
            prompt: "Be a historian. Place each event on the timeline, then notice when the cherry tree story first appeared.",
            min: 1720,
            max: 1820,
            step: 1,
            tolerance: 2,
            items: [
              { label: "Washington is born", value: 1732 },
              { label: "Washington copies the Rules of Civility", value: 1748 },
              { label: "Washington dies", value: 1799 },
              { label: "Cherry tree story added to Weems's biography", value: 1806 },
            ],
            hint: "The real notebook comes from when he was about sixteen. The cherry tree story only shows up after his death.",
            mistakes: [
              { match: "Placed the cherry tree story before Washington's death", coach: "The story first appeared in print several years after Washington died. That late date is a big reason historians doubt it." },
              { match: "Placed the Rules of Civility in the 1770s", coach: "He copied the rules as a teenager, around age sixteen. Add sixteen to his birth year." },
            ],
            seconds: 50,
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
          probe: {
            type: "match",
            prompt: "Match each choice to what it does to the wall of trust.",
            pairs: [
              { left: "Keeping one small promise", right: "Adds one brick" },
              { left: "Mateo lying once about his homework", right: "Knocks out many bricks at once" },
              { left: "Telling the truth again and again after a lie", right: "Slowly rebuilds the wall" },
              { left: "Washington giving up command in 1783", right: "Added a lot of bricks" },
            ],
            hint: "Remember the rule: trust is slow to build and quick to lose.",
            mistakes: [
              { match: "Matched one lie to adds one brick", coach: "A lie never adds trust. It makes people wonder what else was not true, so it tears out many bricks." },
              { match: "Matched one lie to slowly rebuilds", coach: "Rebuilding comes after a lie, through honesty over time. The lie itself does damage." },
              { match: "Matched Washington to adds one brick", coach: "Giving up great power when he could have kept it was a huge act of keeping his word, not a small one." },
            ],
            seconds: 40,
          },
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
      mastery: [
        {
          type: "highlight",
          prompt: "Think like a historian. Tap every sentence that is real history, not legend.",
          sentences: [
            "As a teenager, Washington copied out 110 Rules of Civility by hand.",
            "Young Washington chopped down his father's cherry tree and confessed.",
            "Washington's handwritten copy of the Rules of Civility still survives.",
            "In 1783, Washington gave up command of the army and went home to his farm.",
            "Washington wrote in his diary that he could not tell a lie.",
          ],
          correct: [0, 2, 3],
          hint: "Ask for each sentence: is there a surviving record from the time, or did it only appear later with no evidence?",
          mistakes: [
            { match: "Tapped the cherry tree sentence", coach: "The cherry tree story first appeared in Weems's biography after Washington died, with no evidence behind it." },
            { match: "Tapped the diary sentence", coach: "Washington never wrote about the cherry tree or that line at all. It comes from the legend." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "How many Rules of Civility did teenage Washington copy out by hand?",
          answer: 110,
          unit: "rules",
          hint: "It was a long list, more than a hundred rules, and the notebook still survives.",
          mistakes: [
            { match: "16", coach: "Sixteen was about his age when he copied them. The number of rules was much larger." },
            { match: "10", coach: "Ten is far too few. The list had more than one hundred rules." },
          ],
          seconds: 20,
        },
        {
          type: "cloze",
          text: "Trust is slow to {0} and quick to {1}. Every kept promise adds a brick, but a single {2} can knock out many bricks at once.",
          blanks: [
            { answers: ["build", "grow", "earn"] },
            { answers: ["lose", "break", "lost"] },
            { answers: ["lie"] },
          ],
          hint: "Picture the brick wall: one direction takes a long time, the other can happen in a moment.",
          mistakes: [
            { match: "mistake", coach: "Honest mistakes happen to everyone. The thing that knocks out many bricks is choosing to be dishonest." },
            { match: "forget", coach: "Think about the wall falling, not about memory. What happens to trust quickly after a lie?" },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each person to the way they showed integrity.",
          pairs: [
            { left: "Grace tells her teacher she accidentally saw a classmate's answers", right: "Telling the truth when a lie would be easier" },
            { left: "Diego waters the plants on a rainy Sunday because he said every day", right: "Keeping a promise, even a small one" },
            { left: "Priya returns a found wallet with every dollar inside", right: "Doing right when no one is watching" },
            { left: "A kid who is polite to adults and kind to classmates at recess", right: "Being whole: the same person everywhere" },
          ],
          hint: "Look for the key detail in each story: a confession, a promise, an unseen choice, or being consistent.",
          mistakes: [
            { match: "Matched Diego to doing right unseen", coach: "Nobody was checking, true, but the story turns on what Diego said he would do. That is a promise." },
            { match: "Matched Priya to telling the truth", coach: "Nobody asked Priya anything. She chose right when nobody would ever have known." },
          ],
          seconds: 50,
        },
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
          probe: {
            type: "cloze",
            text: "A friend posts something mean about you and you feel furious. The first step is to {0}. Feelings are {1}, but careful thinking is slower, so a pause lets your thinking catch up.",
            blanks: [
              { answers: ["stop", "pause"] },
              { answers: ["fast", "quick"] },
            ],
            bank: ["stop", "ask", "post", "fast", "wise", "slow"],
            hint: "Which of the four steps comes before you do anything at all?",
            mistakes: [
              { match: "post", coach: "Posting back right away is acting on anger before thinking. The first move is to pause." },
              { match: "ask", coach: "Ask is the last step. Something has to happen before you can think clearly at all." },
              { match: "slow", coach: "The lesson says thinking is the slow one. Feelings are the opposite, which is why we need to pause." },
            ],
            seconds: 25,
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
          probe: {
            type: "highlight",
            prompt: "A classmate asks to copy your homework. Tap every option that is a good third path: not just yes, and not just a cold no.",
            sentences: [
              "Offer to explain how you solved the problems so they can do it themselves.",
              "Hand over your homework so they will like you.",
              "Suggest working on the next assignment together at lunch.",
              "Ignore them and never talk to them again.",
              "Point them to the teacher's help session after class and offer to walk there with them.",
            ],
            correct: [0, 2, 4],
            hint: "A third path stays honest and still helps your classmate actually learn.",
            mistakes: [
              { match: "Tapped handing over homework", coach: "That is just saying yes. Copying is dishonest and does not help them learn." },
              { match: "Tapped ignoring them forever", coach: "That is an unkind no. A third path finds a way to say no to copying and still help." },
            ],
            seconds: 35,
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
          probe: {
            type: "sequence",
            prompt: "Follow the chain. Put what happens in order if you play a game until 2 a.m. the night before a big test.",
            steps: [
              "You have fun playing late into the night",
              "You wake up exhausted with too little sleep",
              "You struggle to focus during the test",
              "You get a lower grade than you could have",
              "You feel stressed and wish you had gone to bed",
            ],
            hint: "Start with the fun part, then keep asking: and then what?",
            mistakes: [
              { match: "Put the lower grade before the test", coach: "You cannot get a grade before you take the test. Walk through the morning step by step." },
              { match: "Put feeling stressed first", coach: "Regret usually comes last, after you see the results. The fun comes first, which is why the choice is tempting." },
            ],
            seconds: 35,
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
          probe: {
            type: "match",
            prompt: "Ask what a person of good character would do. Match each situation to the best choice.",
            pairs: [
              { left: "You promised to help Grandma Saturday, then get invited on a trip", right: "Keep the promise, or honestly ask her if another day works" },
              { left: "You find a test answer key in a shared folder", right: "Close it and tell the teacher so she can fix it" },
              { left: "Friends want to sneak into a movie without paying", right: "Suggest everyone buys tickets or does something else" },
              { left: "You broke your sister's headphones by accident", right: "Tell her right away and offer to help replace them" },
            ],
            hint: "For each one, picture someone you admire for honesty in your shoes. What would they do?",
            mistakes: [
              { match: "Matched Grandma to suggesting another plan to friends", coach: "The Grandma situation is about a promise you already made. The honest choice keeps it or openly asks to change it." },
              { match: "Matched the answer key to telling her right away", coach: "The answer key is not anyone's lost item. The fair move is to close it and let the teacher know." },
            ],
            seconds: 50,
          },
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
      mastery: [
        {
          type: "build",
          prompt: "Build the four-finger decision method in the right order.",
          tiles: ["Stop", "List", "Think", "Ask"],
          distractors: ["Act fast", "Guess"],
          hint: "First calm down, then find your options, then follow the consequences, then check your character.",
          mistakes: [
            { match: "Started with Act fast", coach: "Acting fast is the trap this method protects you from. The first step is the opposite." },
            { match: "Put Ask first", coach: "Ask is the final check, after you know your options and their consequences." },
            { match: "Put Think before List", coach: "You cannot think through options you have not named yet. List them first." },
          ],
          seconds: 25,
        },
        {
          type: "sort",
          prompt: "Isla has two birthday parties on the same afternoon. Sort each thought into the step it belongs to.",
          buckets: ["Stop", "List", "Think", "Ask"],
          items: [
            { text: "I feel panicky, so I will take a breath before texting anyone back", bucket: 0 },
            { text: "I could go to one, go to both for an hour each, or celebrate with one friend tomorrow", bucket: 1 },
            { text: "If I skip one party with no word, that friend will feel hurt for weeks", bucket: 2 },
            { text: "What would a kind and honest friend do here?", bucket: 3 },
            { text: "I will sleep on it tonight before I decide", bucket: 0 },
            { text: "How will I feel about this choice a year from now?", bucket: 2 },
          ],
          hint: "Pausing is Stop, naming options is List, following consequences is Think, and checking character is Ask.",
          mistakes: [
            { match: "Sleeping on it sorted as Think", coach: "Sleeping on it is a way of pausing so your feelings settle. That is the Stop step." },
            { match: "A year from now sorted as Ask", coach: "Imagining your future self follows the consequences forward. That is part of Think." },
            { match: "Listing three plans sorted as Think", coach: "This thought names the options without judging them yet. That is List." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "Under pressure, it feels like there are only two choices, but there are almost always more than {0}. In the Think step you ask what happens next, and then what happens {1} that. Good decisions are less about being clever and more about letting your {2} lead.",
          blanks: [
            { answers: ["two", "2"] },
            { answers: ["after"] },
            { answers: ["values", "character", "conscience"] },
          ],
          hint: "Remember the third path, the and-then-what chain, and the closing line of the lesson.",
          mistakes: [
            { match: "one", coach: "Pressure makes it feel like there are two choices, yes or no. The lesson says there are more than that." },
            { match: "feelings", coach: "Feelings are fast and useful, but the whole method is about not letting them make the choice alone." },
            { match: "friends", coach: "Friends matter, but the lesson ends by saying what should lead your decisions is inside you." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each step to the question it asks.",
          pairs: [
            { left: "Stop", right: "Have I paused long enough for my feelings to settle?" },
            { left: "List", right: "What are all my options, including a third path?" },
            { left: "Think", right: "What happens next, after that, and who is affected?" },
            { left: "Ask", right: "What would a person of good character do?" },
          ],
          hint: "Each step has a single job. Match the job to the question.",
          mistakes: [
            { match: "Swapped List and Think", coach: "List names the options. Think follows each one forward to its consequences." },
            { match: "Matched Stop to the character question", coach: "Stop is just the pause. The character question is the final step." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "place",
            prompt: "Place each moment of the Endurance story on the timeline. Notice how long the men were stranded.",
            min: 1910,
            max: 1920,
            step: 1,
            tolerance: 0,
            items: [
              { label: "Endurance sets sail for Antarctica", value: 1914 },
              { label: "The ice crushes Endurance and it sinks", value: 1915 },
              { label: "Shackleton rescues everyone on Elephant Island", value: 1916 },
            ],
            hint: "The ship left the year a great war began in Europe, and each big step after that came one year later.",
            mistakes: [
              { match: "Placed the sinking in 1914", coach: "The ship was not trapped until January 1915, and it drifted for months before it sank that November." },
              { match: "Placed the rescue in 1915", coach: "After the ship sank, the men camped on the ice for months. The rescue did not come until August of the next year." },
            ],
            seconds: 35,
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
          probe: {
            type: "cloze",
            text: "When sleeping bags were handed out by drawing lots, Shackleton and his officers ended up with the thinner {0} bags, leaving the warmer {1} ones for the crew. A boss expects to be served, but a leader {2}.",
            blanks: [
              { answers: ["wool", "woolen", "woollen"] },
              { answers: ["fur", "reindeer-fur", "reindeer fur", "reindeer"] },
              { answers: ["serves"] },
            ],
            bank: ["wool", "fur", "serves", "commands", "silk", "rests"],
            hint: "Picture who got the warmest gear and who took the worse gear on purpose.",
            mistakes: [
              { match: "commands", coach: "Giving orders is what a boss does. Shackleton's example was putting his men's needs before his own." },
              { match: "rests", coach: "Shackleton did hard work himself. A leader does not sit back while others work." },
              { match: "silk", coach: "There was no silk on the ice. The bags were either warm reindeer fur or thinner wool." },
            ],
            seconds: 35,
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
          probe: {
            type: "build",
            prompt: "Your family's beach day is rained out and everyone is grumpy. Build what a Shackleton-style leader does when plans change.",
            tiles: [
              "Admit the old plan no longer works",
              "Choose one clear new goal, like an indoor picnic and game afternoon",
              "Tell everyone plainly what the new plan is",
              "Drop anything that does not help the new goal",
            ],
            distractors: ["Insist on the beach in the rain anyway", "Go to your room and sulk"],
            hint: "Shackleton first accepted that crossing Antarctica was impossible, then named one new goal everyone could understand.",
            mistakes: [
              { match: "Used the beach in the rain tile", coach: "Clinging to a plan that no longer works is not leadership. Shackleton changed his goal when he had to." },
              { match: "Used the sulk tile", coach: "Sulking leaves the group without direction. Someone needs to set the new goal." },
              { match: "Announced the plan before choosing it", coach: "You need to decide on the new goal before you can tell everyone clearly what it is." },
            ],
            seconds: 40,
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
          probe: {
            type: "match",
            prompt: "Window or mirror? Match each moment to what a good leader does.",
            pairs: [
              { left: "Worsley's navigation guides the James Caird to South Georgia", right: "Shackleton makes sure everyone knows Worsley's skill" },
              { left: "The Endurance is lost in the ice", right: "Shackleton never blames his crew and owns the duty to get them out" },
              { left: "Your group gets a poor grade because you forgot to submit a section", right: "Say it was your mistake and suggest a fix for next time" },
              { left: "Your soccer team wins thanks to great saves", right: "Tell people the goalie's saves made the difference" },
            ],
            hint: "When things go well, a leader points to the team. When things go wrong, a leader points to himself.",
            mistakes: [
              { match: "Matched the forgotten section to praising someone else", coach: "Things went wrong here, and it was your doing. That calls for the mirror, not the window." },
              { match: "Matched the soccer win to taking responsibility", coach: "A win is a time to look out the window and give credit to the people who earned it." },
            ],
            seconds: 45,
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
      mastery: [
        {
          type: "sequence",
          prompt: "Put the Endurance survival story in order, from setting sail to the rescue.",
          steps: [
            "Endurance sails from South Georgia toward Antarctica",
            "The ship is frozen into the pack ice of the Weddell Sea",
            "The ice crushes the ship and it sinks",
            "The men row three lifeboats to Elephant Island",
            "Shackleton and five men sail the James Caird about 800 miles to South Georgia",
            "They cross South Georgia's icy mountains to a whaling station",
            "Shackleton returns and rescues everyone on Elephant Island",
          ],
          hint: "Follow the men from ship, to ice, to island, to the small boat, to the mountains, and back again.",
          mistakes: [
            { match: "Put Elephant Island before the ship sank", coach: "The men only rowed to Elephant Island after months camped on the ice once the ship was gone." },
            { match: "Put crossing the mountains before the James Caird voyage", coach: "South Georgia's mountains were on the far side of the ocean. They had to sail there first." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "How many men were stranded on the ice when the Endurance sank, and every one of them survived?",
          answer: 28,
          unit: "men",
          hint: "The lesson's hook gives the number. It is a little less than thirty.",
          mistakes: [
            { match: "22", coach: "Twenty-two is how many waited on Elephant Island. Add the six who sailed the James Caird." },
            { match: "6", coach: "Six men sailed the James Caird. The whole crew was much bigger." },
          ],
          seconds: 25,
        },
        {
          type: "match",
          prompt: "Match each leadership habit to Shackleton's real example.",
          pairs: [
            { left: "Serves first", right: "Ended up with a thin wool sleeping bag so his men got warmer fur ones" },
            { left: "Sets the example", right: "Stayed calm and cheerful so his freezing men would too" },
            { left: "Gives a clear goal", right: "Told the crew the new mission was to bring everyone home alive" },
            { left: "Gives credit", right: "Praised Frank Worsley's navigation of the James Caird" },
            { left: "Takes responsibility", right: "Never blamed his crew for the disaster" },
          ],
          hint: "Each habit has one story that fits it best. Look for the key action in each.",
          mistakes: [
            { match: "Swapped serves first and sets the example", coach: "Serving first means giving others the better share. Setting the example means showing the attitude you want." },
            { match: "Swapped gives credit and takes responsibility", coach: "Credit points to others when things go well. Responsibility points to yourself when things go wrong." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "A good leader is like a window and a mirror. When things go well, they look out the {0} to see who deserves credit. When things go wrong, they look in the {1}. People follow what a leader {2} far more than what a leader says.",
          blanks: [
            { answers: ["window"] },
            { answers: ["mirror"] },
            { answers: ["does"] },
          ],
          hint: "Credit goes outward to others, and responsibility comes back to yourself.",
          mistakes: [
            { match: "orders", coach: "Orders are just words. The lesson says people watch the leader's actions most." },
            { match: "wants", coach: "Followers cannot see what a leader wants. They can see what the leader actually does." },
          ],
          seconds: 35,
        },
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
          probe: {
            type: "cloze",
            text: "At Gettysburg, Edward Everett spoke for about two {0}, while Lincoln spoke for about two {1}, using only around 270 words. People still memorize Lincoln's speech because it was short and {2}.",
            blanks: [
              { answers: ["hours"] },
              { answers: ["minutes"] },
              { answers: ["clear", "powerful", "focused"] },
            ],
            bank: ["hours", "minutes", "clear", "loud", "long", "days"],
            hint: "One speech was about sixty times longer than the other. Which one lasted in people's memories, and why?",
            mistakes: [
              { match: "loud", coach: "Volume helps a crowd hear, but it is not why a speech is remembered for more than 150 years." },
              { match: "long", coach: "Lincoln's speech was the short one. Its power came from being focused, not from length." },
              { match: "days", coach: "No speech lasted days. The famous orator spoke for about two hours." },
            ],
            seconds: 30,
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
          probe: {
            type: "build",
            prompt: "Build a short speech about honesty, from first line to last. Leave out the parts that do not belong.",
            tiles: [
              "Hook: Have you ever told a tiny lie that grew into a giant problem?",
              "Point 1: Honesty builds trust brick by brick",
              "Point 2: Honesty takes courage when the truth is awkward",
              "Point 3: Honesty gets easier every time you practice it",
              "Close: So the next time a small lie is tempting, choose the truth",
            ],
            distractors: ["Today I will talk about honesty, I guess", "Honesty is a word with seven letters"],
            hint: "Open with a spark that makes listeners curious, give three points, then end with your big idea.",
            mistakes: [
              { match: "Started with Today I will talk about honesty", coach: "That names the topic but does not make anyone curious. A hook needs a spark, like a question about the listener's life." },
              { match: "Used the seven letters fact", coach: "It is a fact, but not one that makes people care. A good hook connects to your big idea." },
              { match: "Put the close before the points", coach: "The close comes last, so your big idea is the final thing people hear." },
            ],
            seconds: 45,
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
          probe: {
            type: "sort",
            prompt: "You are on stage. Sort each move: nervous habit or confident habit?",
            buckets: ["Nervous habit", "Confident habit"],
            items: [
              { text: "You forget a line, pause calmly and glance at your note card", bucket: 1 },
              { text: "You forget a line and say sorry over and over", bucket: 0 },
              { text: "Standing tall with your feet planted", bucket: 1 },
              { text: "Speeding up to get to the end faster", bucket: 0 },
              { text: "Counting your three points on your fingers", bucket: 1 },
              { text: "Staring at the floor while you talk", bucket: 0 },
            ],
            hint: "Confident speakers look calm and in control, even when their hearts are racing.",
            mistakes: [
              { match: "Pausing sorted as nervous", coach: "A short, calm pause actually makes you look in control, and it gives listeners time to think." },
              { match: "Saying sorry sorted as confident", coach: "Apologizing draws attention to a slip most listeners would never notice." },
              { match: "Speeding up sorted as confident", coach: "Nerves make people rush. Confident speakers go a little slower than feels normal." },
            ],
            seconds: 40,
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
          probe: {
            type: "highlight",
            prompt: "Your speech is on Friday and you feel nervous. Tap every part of a strong practice plan.",
            sentences: [
              "Monday: say the whole speech out loud alone, twice.",
              "Tuesday: read it silently in your head once.",
              "Wednesday: practice out loud in front of a mirror.",
              "Thursday: give it to your family using one small key-word card.",
              "Friday: write every word on a full page so you can read it straight through.",
              "Until Friday: avoid thinking about it so you do not get nervous.",
            ],
            correct: [0, 2, 3],
            hint: "Look for plans that use your voice out loud and build up to a real audience.",
            mistakes: [
              { match: "Tapped reading silently", coach: "Running it in your head is not the same as saying it. Your mouth and voice need practice too." },
              { match: "Tapped writing every word on a page", coach: "A full page feels safe, but reading it stops you from looking at your listeners." },
              { match: "Tapped avoiding thinking about it", coach: "Avoiding a speech usually makes nerves grow. Practice is what shrinks them." },
            ],
            seconds: 40,
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
      mastery: [
        {
          type: "place",
          prompt: "Lincoln opened with four score and seven years ago. Place the year he was pointing back to, and the year he gave the speech.",
          min: 1750,
          max: 1900,
          step: 1,
          tolerance: 1,
          items: [
            { label: "The year Lincoln pointed back to (a new nation)", value: 1776 },
            { label: "Lincoln gives the Gettysburg Address", value: 1863 },
          ],
          hint: "A score is twenty. Count back four score and seven years from the year of the speech.",
          mistakes: [
            { match: "Placed the first marker at 1816", coach: "That counts back only forty-seven years. Four score is eighty, not forty." },
            { match: "Placed the first marker at 1789", coach: "That counts back seventy-four years. You may have flipped the numbers: it is eighty plus seven." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "About how many words long was the Gettysburg Address?",
          answer: 270,
          tolerance: 30,
          unit: "words",
          hint: "It took Lincoln only about two minutes to say. Think a few hundred words, not thousands.",
          mistakes: [
            { match: "2", coach: "Two was the number of minutes Lincoln spoke. The question asks how many words he used." },
            { match: "87", coach: "Eighty-seven is the four score and seven years. The speech had a few hundred words." },
          ],
          seconds: 25,
        },
        {
          type: "match",
          prompt: "Match each line from a speech about courage to its part in the speech.",
          pairs: [
            { left: "What is scarier, a lion or a classroom full of faces?", right: "Hook" },
            { left: "Courage is not having no fear.", right: "First main point" },
            { left: "Courage grows with practice.", right: "Third main point" },
            { left: "So next time you feel afraid, remember that fear is where courage begins.", right: "Strong close" },
          ],
          hint: "A hook sparks curiosity, the points teach, and the close sends the big idea home.",
          mistakes: [
            { match: "Matched the lion question to the close", coach: "A surprising question belongs at the start, to make people want to listen." },
            { match: "Matched the so next time line to a main point", coach: "Starting with so next time sums up the big idea and asks listeners to act. That is how a speech ends." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "When you speak, stand tall and look at people's {0}. Speak a little slower and a little {1} than feels normal. A short {2} makes you look calm and gives listeners time to think.",
          blanks: [
            { answers: ["faces", "eyes"] },
            { answers: ["louder"] },
            { answers: ["pause"] },
          ],
          bank: ["faces", "notes", "louder", "faster", "pause", "apology"],
          hint: "Think of the confident habits: eyes on the audience, steady voice, and calm silence.",
          mistakes: [
            { match: "notes", coach: "Staring at notes is a nervous habit. Your eyes should move around the room to your listeners." },
            { match: "faster", coach: "Nerves already make people rush. Slower and louder helps listeners follow you." },
            { match: "apology", coach: "Apologizing draws attention to nerves. A quiet, calm moment does the opposite." },
          ],
          seconds: 35,
        },
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
    {
      id: "leadership.goals",
      title: "Goals, Habits and Discipline",
      minutes: 30,
      stage: "logic",
      subject: "Other",
      read: [
        "As a young printer in Philadelphia, Benjamin Franklin made a bold plan. He would try to become a better person on purpose. He wrote down thirteen virtues he wanted to build, such as order, industry, frugality and sincerity. Then he made a little book with a page for each virtue and a column for each day of the week. Every night he marked a small dot for each slip he had made that day.",
        "Franklin did not try to fix everything at once. He worked hard on one virtue each week, so he went through the whole list in thirteen weeks, four times a year. He admitted later that he never became perfect, but he said he was a better and happier man for trying.",
        "Franklin's plan shows the difference between a wish and a goal. A wish sounds like \"I want to get better at piano.\" A goal is specific, it can be measured, and it has a deadline: \"I will learn to play this whole song by March 1.\" You can tell whether you reached a goal. You cannot really tell with a wish.",
        "Big goals are reached through small daily steps. If you read 20 pages every day, you will read 7,300 pages in a year. That is a whole shelf of books, and no single day felt huge.",
        "Daily steps last longest when they become habits. A habit has three parts: a cue that reminds you, a routine you do, and a reward that makes you glad you did it. Putting your practice book on your pillow is a cue. Practicing is the routine. Checking off the day on your chart is the reward.",
        "Discipline is doing what you planned even when you do not feel like it. Feelings come and go like weather. A person with discipline keeps their promise to themselves anyway, and over time that is what turns a goal into reality.",
      ].join("\n\n"),
      keyIdeas: [
        "A real goal is specific, measurable and has a deadline. A wish has none of these.",
        "Big goals are reached through small daily steps that add up over time.",
        "A habit has a cue, a routine and a reward.",
        "Discipline means keeping your plan even when you do not feel like it.",
      ],
      hook: {
        text: "Imagine a young printer who decides to fix his own bad habits, one at a time, and keeps score with dots in a tiny notebook. Benjamin Franklin did exactly that. He never reached perfection, yet he called it one of the best things he ever did. Why would a plan that never fully worked be worth so much?",
      },
      teach: [
        {
          title: "Franklin's Little Book",
          teach:
            "Benjamin Franklin wanted to improve his character, so he treated it like a project. He picked thirteen virtues, including order, which means keeping things in their place, industry, which means working hard and not wasting time, and frugality, which means not wasting money. He made a little book with a chart for each virtue and a column for each day. Each night he put a small dot on the chart for every slip. He focused on one virtue a week, so he cycled through all thirteen four times a year. Franklin later wrote that he never became perfect, but he was better and happier for trying. A clear plan and a daily record made him grow.",
          visual: {
            type: "hotspots",
            title: "Franklin's Virtue Chart",
            center: "One virtue a week",
            spots: [
              { label: "Order", icon: "🗂️", detail: "Keep things in their place, and give each part of your work its own time." },
              { label: "Industry", icon: "⚒️", detail: "Do not waste time. Always be doing something useful." },
              { label: "Frugality", icon: "🪙", detail: "Do not waste money. Spend only on what does good." },
              { label: "The dots", icon: "⚫", detail: "Each night Franklin marked a dot for every slip, so he could see if he was getting better." },
              { label: "The weekly focus", icon: "📅", detail: "He gave one virtue his special attention each week, then moved to the next." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Franklin had 13 virtues and gave each one a full week of focus. A year has 52 weeks. How many times could he go through his whole list in one year?",
            answer: 4,
            hint: "Each trip through the list takes 13 weeks. How many groups of 13 fit into 52?",
            mistakes: [
              { match: "13", coach: "13 is how many virtues he had. Now ask how many 13-week rounds fit into a 52-week year." },
              { match: "52", coach: "52 is the number of weeks. Each full trip through the list uses 13 of them." },
              { match: "65", coach: "You added 13 and 52. Instead, divide the weeks in a year by the weeks in one round." },
            ],
            seconds: 30,
          },
          think: {
            q: "Why did Franklin put a dot in his book for every slip?",
            choices: [
              "To punish himself",
              "To show his friends how good he was",
              "To see clearly whether he was improving over time",
              "Because his teacher made him",
            ],
            answer: 2,
            why: "Keeping a record let Franklin see his progress and notice which virtues still needed work.",
            hints: [
              "The dots were not a punishment. Think about what a scorecard helps you see.",
              "The book was private. He was not trying to impress anyone.",
              "",
              "Franklin was a grown man running his own business. Nobody made him do it.",
            ],
          },
          approaches: {
            analogy:
              "Franklin's dot chart is like a fitness tracker for character. A step counter does not walk for you, but seeing the number every day makes you want to beat it.",
            example:
              "In a week focused on order, Franklin might mark a dot on Monday for leaving papers scattered, and two dots on Tuesday. By Saturday, with fewer dots, he could see that his focus was working.",
            simpler: {
              q: "How many virtues did Franklin work on at one time, with special focus?",
              choices: ["All thirteen at once", "One each week", "None, he just hoped"],
              answer: 1,
              why: "Franklin focused on one virtue a week so he would not be overwhelmed.",
              hints: [
                "Trying to fix everything at once usually fails. Franklin was smarter than that.",
                "",
                "Franklin made a real plan with a chart, not just a hope.",
              ],
            },
          },
        },
        {
          title: "A Wish or a Goal?",
          teach:
            "A wish and a goal can sound alike, but they are very different. A wish is a hope with no plan, like \"I want to be better at soccer.\" A goal has three parts. First, it is specific: it says exactly what you will do. Second, it is measurable: you can count or check it. Third, it has a deadline: a date when it should be done. So a goal sounds like \"I will make 20 free kicks in a row by the end of May.\" At the end of May, you will know for sure whether you made it. With a wish, you never really know, so it is easy to quit without noticing.",
          visual: {
            type: "compare",
            left: {
              title: "A Wish",
              points: [
                "Vague: \"get better at math\"",
                "No way to measure it",
                "No deadline",
                "Easy to forget about",
              ],
            },
            right: {
              title: "A Goal",
              points: [
                "Specific: \"master my times tables to 12\"",
                "Measurable: \"all 144 facts with no mistakes\"",
                "Deadline: \"by October 31\"",
                "You know exactly when you have done it",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Is each one just a wish, or a real goal that is specific, measurable and has a deadline?",
            buckets: ["Just a wish", "A real goal"],
            items: [
              { text: "I want to be healthier someday", bucket: 0 },
              { text: "I will run one mile without stopping by June 1", bucket: 1 },
              { text: "I hope to read more books", bucket: 0 },
              { text: "I will finish three chapter books before winter break", bucket: 1 },
              { text: "I'd like to be good at drawing", bucket: 0 },
              { text: "I will save $60 for a new bike helmet by my birthday", bucket: 1 },
            ],
            hint: "For each one, ask: could you check on a certain date whether it is done? If not, it is a wish.",
            mistakes: [
              { match: "Read more books sorted as a goal", coach: "How many books, and by when? Without a number and a date, it is still a wish." },
              { match: "Save $60 sorted as a wish", coach: "This one has an amount, $60, and a deadline, your birthday. That makes it a real goal." },
              { match: "Healthier someday sorted as a goal", coach: "Someday is not a deadline, and healthier is not something you can count." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which of these is a real goal?",
            choices: [
              "I want to get better at piano",
              "I will play my recital song with no mistakes by March 1",
              "I wish I could play like a professional",
            ],
            answer: 1,
            why: "It is specific (one song), measurable (no mistakes) and has a deadline (March 1).",
            hints: [
              "Better how, and by when? This one has no number and no date.",
              "",
              "Wishing is a start, but there is nothing to measure and no deadline here.",
            ],
          },
          approaches: {
            analogy:
              "A wish is like saying \"I want to go somewhere nice.\" A goal is like a map with a pin on the city and an arrival date. Only the map can actually get you there.",
            example:
              "Jada wished she could do more push-ups. She turned it into a goal: \"I will do 25 push-ups in a row by the last day of school.\" Now she could test herself every Saturday and see her number climb from 8 to 25.",
            simpler: {
              q: "Which part does a goal have that a wish usually lacks?",
              choices: ["A deadline", "A good feeling", "A big dream"],
              answer: 0,
              why: "A goal says by when it will be done. Wishes usually have no date.",
              hints: [
                "",
                "Wishes feel good too. Look for a part you could check on a calendar.",
                "Dreams are great, but a dream alone has no date or number.",
              ],
            },
          },
        },
        {
          title: "Small Steps Add Up",
          teach:
            "Big goals can feel too big to start. The secret is to break them into small daily steps. Suppose your goal is to read a whole shelf of books this year. That sounds huge. But if you read 20 pages every day, you read 140 pages a week and 7,300 pages in a year. No single day feels hard, yet the total is enormous. This works for almost anything: ten minutes of piano a day, five new vocabulary words a day, one dollar saved a day. The steps are small enough to do even on a busy day. And because you do them every day, they add up to something big.",
          visual: {
            type: "flip",
            cards: [
              { front: "20 pages a day", back: "That is 140 pages a week and 7,300 pages in a year: a whole shelf of books." },
              { front: "10 minutes of practice a day", back: "That is 70 minutes a week and over 60 hours in a year." },
              { front: "5 new words a day", back: "That is 35 words a week and 1,825 words in a year." },
              { front: "$1 saved a day", back: "That is $7 a week and $365 in a year." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Owen's goal is to learn new vocabulary words. He learns 5 new words every day for 30 days. How many new words has he learned by the end?",
            answer: 150,
            unit: "words",
            hint: "Multiply the words per day by the number of days.",
            mistakes: [
              { match: "35", coach: "35 is one week of words. Owen kept going for 30 days, so multiply 5 by 30." },
              { match: "15", coach: "Check the place value: 5 times 30 is a bigger number than 15." },
            ],
            seconds: 30,
          },
          think: {
            q: "Lucas wants to read 7,300 pages this year. What is the best plan?",
            choices: [
              "Read nothing until summer, then read all day",
              "Wait until he feels very motivated",
              "Read only on rainy days",
              "Read 20 pages every single day",
            ],
            answer: 3,
            why: "Twenty pages a day for 365 days is 7,300 pages, and each day's step is small enough to keep.",
            hints: [
              "Saving it all for later makes the job so huge that most people give up.",
              "Motivation comes and goes. A goal that waits for good feelings rarely gets done.",
              "Rainy days are not regular enough to add up to a big number.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Small daily steps are like a dripping faucet filling a bucket. One drop seems like nothing, but leave it all night and the bucket is full.",
            example:
              "Grace wanted to save $365 for a telescope. Saving it all at once was impossible, but she put $1 into a jar every day. After 365 days she had exactly $365 and bought the telescope.",
            simpler: {
              q: "If you practice piano 10 minutes a day for 7 days, how many minutes is that?",
              choices: ["17 minutes", "70 minutes", "700 minutes"],
              answer: 1,
              why: "10 minutes times 7 days is 70 minutes.",
              hints: [
                "That adds 10 and 7. Practice happens 7 times, so multiply.",
                "",
                "Too many! 10 times 7 is much smaller than 700.",
              ],
            },
          },
        },
        {
          title: "Habits and Discipline",
          teach:
            "Daily steps are easiest when they become habits. A habit has three parts. The cue is a reminder that starts it, like seeing your practice book on your pillow. The routine is the action itself, like practicing for ten minutes. The reward is the good feeling after, like checking the day off on a chart. Do the same routine after the same cue for a few weeks and it starts to feel automatic. But some days you will not feel like it at all. That is where discipline comes in. Discipline means doing what you planned even when you do not feel like it. Feelings change like the weather, but a promise to yourself does not have to.",
          visual: {
            type: "sequence",
            prompt: "The habit loop",
            steps: [
              "Cue: something reminds you, like your book on your pillow",
              "Routine: you do the action, like reading 20 pages",
              "Reward: you feel good, like checking off the day",
              "Repeat: after weeks of this, the habit becomes automatic",
            ],
          },
          probe: {
            type: "match",
            prompt: "Noah is building a habit of practicing guitar every afternoon. Match each part of his plan to the part of the habit loop.",
            pairs: [
              { left: "He leaves his guitar on its stand next to his desk", right: "Cue" },
              { left: "He practices for fifteen minutes", right: "Routine" },
              { left: "He colors in a box on his practice chart", right: "Reward" },
              { left: "He practices even on a day he feels tired and grumpy", right: "Discipline" },
            ],
            hint: "The cue comes first and reminds you. The routine is the action. The reward comes after. Discipline is keeping going when you do not feel like it.",
            mistakes: [
              { match: "Swapped cue and reward", coach: "The cue happens before the action and reminds you. The reward comes after and feels good." },
              { match: "Matched practicing while grumpy to routine", coach: "Practicing is the routine, but doing it when he does not feel like it shows something more. Which word means keeping your plan anyway?" },
            ],
            seconds: 45,
          },
          think: {
            q: "Ava planned to practice violin every day, but today she does not feel like it. What does discipline look like?",
            choices: [
              "She practices anyway, because she made a promise to herself",
              "She skips it and waits until she feels excited again",
              "She quits violin because it is too hard",
              "She practices only if a friend is watching",
            ],
            answer: 0,
            why: "Discipline means doing what you planned even when your feelings say no.",
            hints: [
              "",
              "Waiting for the right feeling is the opposite of discipline. Feelings come and go.",
              "One hard day is not a reason to give up a goal. Discipline carries you through it.",
              "Discipline does not need an audience. It is a promise you keep to yourself.",
            ],
          },
          approaches: {
            analogy:
              "A habit is like a path through a grassy field. The first time you walk it, it is hard to see. After walking the same way every day, the path is worn smooth and your feet find it on their own.",
            example:
              "Ethan wanted to stop forgetting his homework. His cue: he set his backpack by the front door before dinner. His routine: he packed his finished work into it. His reward: a gold star on the fridge chart. After a month he did it without thinking.",
            simpler: {
              q: "What starts a habit by reminding you to do it?",
              choices: ["The reward", "The cue", "The deadline"],
              answer: 1,
              why: "The cue is the reminder that comes first and starts the routine.",
              hints: [
                "The reward comes at the end, after you have done the action.",
                "",
                "A deadline belongs to a goal. In a habit, the reminder has a different name.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps in order to turn a big dream into a daily habit.",
        steps: [
          "Pick something you want, like getting better at chess",
          "Turn it into a goal that is specific, measurable and has a deadline",
          "Break the goal into a small daily step",
          "Choose a cue that reminds you to do the step each day",
          "Track each day with a chart, like Franklin's little book",
          "Keep going with discipline, even on days you do not feel like it",
        ],
      },
      explain: {
        prompt: "In your own words, explain how Benjamin Franklin worked on his character, and how you would turn a wish of your own into a goal and a daily habit.",
        keyPoints: [
          "Describes Franklin's plan: one virtue at a time and a daily record",
          "Explains that a goal is specific, measurable and has a deadline",
          "Explains that big goals are reached through small daily steps",
          "Names the parts of a habit: cue, routine and reward",
          "Explains that discipline means sticking to the plan when you do not feel like it",
        ],
      },
      mastery: [
        {
          type: "cloze",
          text: "A real goal is {0}, measurable and has a {1}. A habit starts with a {2} that reminds you, and {3} is doing what you planned even when you do not feel like it.",
          blanks: [
            { answers: ["specific"] },
            { answers: ["deadline"] },
            { answers: ["cue"] },
            { answers: ["discipline"] },
          ],
          bank: ["specific", "deadline", "cue", "discipline", "vague", "reward", "wish"],
          hint: "Think about the three parts of a goal, the first part of the habit loop, and the word for keeping your promise to yourself.",
          mistakes: [
            { match: "vague", coach: "Vague is the opposite of what a goal needs. A goal says exactly what you will do." },
            { match: "reward", coach: "The reward comes at the end of the habit loop. What comes first and reminds you?" },
            { match: "wish", coach: "A wish is a hope with no plan. The word you want means sticking to your plan." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "Sofia saves $2 every day toward a goal. How many days will it take her to save $90?",
          answer: 45,
          unit: "days",
          hint: "Each day adds $2. How many groups of 2 make 90?",
          mistakes: [
            { match: "180", coach: "You multiplied. She already knows the total, $90. Divide it by $2 a day instead." },
            { match: "90", coach: "That would be true at $1 a day. She saves $2 a day, so it takes fewer days." },
          ],
          seconds: 35,
        },
        {
          type: "sort",
          prompt: "Sort each piece of Isaac's plan to build a reading habit.",
          buckets: ["Cue", "Routine", "Reward"],
          items: [
            { text: "His book waits on his pillow every night", bucket: 0 },
            { text: "An alarm rings at 8:00 p.m.", bucket: 0 },
            { text: "He reads 20 pages", bucket: 1 },
            { text: "He writes one sentence about what he read", bucket: 1 },
            { text: "He colors in that day on his chart", bucket: 2 },
            { text: "After 30 days, he gets to pick a new book at the store", bucket: 2 },
          ],
          hint: "Cues come before and remind him. The routine is what he does. Rewards come after and feel good.",
          mistakes: [
            { match: "Alarm sorted as routine", coach: "The alarm does not do the reading. It reminds Isaac to start, so it is a cue." },
            { match: "Coloring the chart sorted as routine", coach: "Coloring the chart comes after the reading and feels good. That makes it a reward." },
          ],
          seconds: 45,
        },
        {
          type: "build",
          prompt: "Build a real goal for learning to cook.",
          tiles: ["I will", "cook dinner for my family", "by myself", "four times", "before the end of the month"],
          distractors: ["someday", "if I feel like it"],
          hint: "A goal says exactly what, how many, and by when.",
          mistakes: [
            { match: "Used someday", coach: "Someday is not a deadline. Pick a real date or time limit." },
            { match: "Used if I feel like it", coach: "A goal that depends on your feelings needs discipline instead. Leave that tile out." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "How did Benjamin Franklin work on his thirteen virtues?",
          choices: [
            "He tried to master all thirteen in one day",
            "He focused on one virtue each week and kept a daily record",
            "He asked a teacher to grade him each month",
            "He wrote about them but never practiced",
          ],
          answer: 1,
          why: "Franklin gave one virtue special focus each week and marked his slips in a little book every night.",
        },
        {
          q: "Which of these is a real goal?",
          choices: [
            "I want to be a better swimmer",
            "I hope I get faster someday",
            "I wish I liked swimming more",
            "I will swim four laps without stopping by July 1",
          ],
          answer: 3,
          why: "It is specific, can be measured (four laps) and has a deadline (July 1).",
        },
        {
          q: "What are the three parts of a habit?",
          choices: ["Cue, routine and reward", "Wish, hope and dream", "Start, middle and end"],
          answer: 0,
          why: "A cue reminds you, the routine is the action, and the reward makes you glad you did it.",
        },
        {
          q: "What does discipline mean?",
          choices: [
            "Doing only what you enjoy",
            "Getting in trouble for breaking a rule",
            "Doing what you planned even when you do not feel like it",
            "Waiting for motivation before you start",
          ],
          answer: 2,
          why: "Discipline keeps your promise to yourself when feelings say no.",
        },
        {
          q: "If you read 20 pages a day for a year, about how many pages will you read?",
          choices: ["About 365 pages", "About 7,300 pages", "About 2,000 pages"],
          answer: 1,
          why: "20 pages times 365 days is 7,300 pages: small steps add up to something big.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make your own Franklin-style chart. Pick one real goal (specific, measurable, with a deadline) and one small daily step toward it. Choose a cue and a reward. Draw a chart with a box for each day for two weeks, and mark it every day. At the end, show a parent your chart and tell them what you learned about discipline.",
        rubric: [
          "Writes a goal that is specific, measurable and has a deadline",
          "Names a small daily step, a cue and a reward",
          "Marks the chart honestly every day for two weeks",
          "Explains what helped on hard days and what they would change next time",
        ],
      },
    },
    {
      id: "leadership.ownership",
      title: "Owning Your Results",
      minutes: 30,
      stage: "logic",
      subject: "Other",
      read: [
        "On June 5, 1944, General Dwight D. Eisenhower was about to send more than 150,000 soldiers across the English Channel to land on the beaches of Normandy, France. It was the largest sea invasion in history, and he could not know whether it would work. That day he wrote a short note to be read if the landings failed. It said the decision to attack had been his, and that if there was any blame, it was his alone.",
        "The landings on June 6, known as D-Day, succeeded, so the note was never needed. An aide saved it, and today it is kept at the Eisenhower Presidential Library. It shows something every leader needs: ownership.",
        "Ownership means taking responsibility for your choices and their results, good or bad. The opposite is passing the buck, which means pushing the blame onto someone else. The phrase comes from old card games, where a marker called a buck showed whose turn it was to deal. President Harry Truman kept a sign on his desk that said \"The Buck Stops Here,\" meaning he would not pass responsibility to anyone else.",
        "Owning your results does not mean blaming yourself for everything. Some things are outside your control, like the weather or another person's choices. Other things are inside your control: your effort, your preparation, your attitude and how you respond. Strong people spend their energy on what they can control.",
        "When something goes wrong, ownership has three steps. Own it: say clearly what you did, without excuses. Fix it: do what you can to make it right. Learn from it: change something so it does not happen again.",
        "People trust someone who owns their mistakes. Excuses might protect your pride for a moment, but ownership builds your character and earns respect that lasts.",
      ].join("\n\n"),
      keyIdeas: [
        "Ownership means taking responsibility for your choices and their results, without excuses.",
        "Passing the buck means pushing blame onto others. Truman's sign said the buck stops here.",
        "Focus your energy on what you can control: effort, preparation, attitude and response.",
        "When you make a mistake: own it, fix it, learn from it.",
      ],
      hook: {
        text: "The day before the biggest sea invasion in history, General Eisenhower sat down and wrote a note that he hoped no one would ever read. It said that if the attack failed, the blame was his alone. Why would a commander write down his own blame before the battle even started?",
      },
      teach: [
        {
          title: "The Note in Eisenhower's Pocket",
          teach:
            "In June 1944, General Dwight D. Eisenhower commanded the Allied armies preparing to free France. He had to decide when to send more than 150,000 soldiers across the English Channel to the beaches of Normandy. The weather was bad, and many lives depended on his choice. On June 5 he gave the order. Then he wrote a short note in case the landings failed. It did not blame the weather, the soldiers or the other generals. It said the decision was his, and any blame was his alone. The D-Day landings succeeded the next day, and the note was never used. Eisenhower had already decided that the result would be his to own.",
          visual: {
            type: "timeline",
            events: [
              { year: 1944, label: "June 5: Eisenhower gives the order", detail: "After waiting a day for the weather, he decides the invasion will go ahead." },
              { year: 1944, label: "June 5: The note", detail: "He writes a short note taking all the blame if the landings fail. In his tiredness he dates it July 5 by mistake." },
              { year: 1944, label: "June 6: D-Day", detail: "Allied soldiers land on the beaches of Normandy, France. The landings succeed." },
              { year: 1945, label: "The war in Europe ends", detail: "Less than a year later, in May 1945, the war in Europe is over." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Eisenhower took full ownership. Tap every sentence that sounds like him: owning the result instead of making excuses.",
            sentences: [
              "The decision to attack was mine.",
              "If it failed, it was only because of the bad weather.",
              "The soldiers and sailors did all that bravery could do.",
              "Any blame or fault belongs to me alone.",
              "The other generals gave me poor advice.",
            ],
            correct: [0, 2, 3],
            hint: "Look for sentences where the speaker points to himself, or gives others credit, instead of pointing blame at others.",
            mistakes: [
              { match: "Tapped the bad weather sentence", coach: "Blaming the weather is an excuse. Eisenhower chose to own the decision, weather and all." },
              { match: "Tapped the poor advice sentence", coach: "That pushes the blame onto the other generals. That is passing the buck, not ownership." },
              { match: "Skipped the soldiers sentence", coach: "Giving the soldiers credit is part of ownership too: the leader takes the blame and shares the praise." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why is Eisenhower's note a powerful example of ownership?",
            choices: [
              "He blamed the weather ahead of time",
              "He took responsibility before he even knew the result",
              "He wanted to become famous for his writing",
            ],
            answer: 1,
            why: "He accepted the blame in advance, so there would be no excuses no matter what happened.",
            hints: [
              "The note did the opposite. It did not blame the weather or anyone else.",
              "",
              "The note was private and meant only for a failure. It was not written for fame.",
            ],
          },
          approaches: {
            analogy:
              "Eisenhower's note is like a team captain telling the coach before a big game, \"If we lose, it's on me.\" Saying it before the result shows it is not just words.",
            example:
              "Imagine leading a group project. Before you present, you tell your teacher, \"I chose our topic, so if it does not work out, that is on me.\" Your teammates now know you will not throw them under the bus, and they work harder for you.",
            simpler: {
              q: "In Eisenhower's note, who did he say would get the blame if the attack failed?",
              choices: ["The weather", "His soldiers", "Himself"],
              answer: 2,
              why: "Eisenhower wrote that the blame would be his alone.",
              hints: [
                "The weather was bad, but he did not blame it.",
                "He praised his soldiers instead of blaming them.",
                "",
              ],
            },
          },
        },
        {
          title: "The Buck Stops Here",
          teach:
            "To pass the buck means to push the blame or a hard job onto someone else. The phrase comes from old card games, where a marker called a buck was passed around the table to show who would deal next. President Harry Truman kept a sign on his desk that read \"The Buck Stops Here.\" He meant that he could not pass his hardest decisions to anyone else. Notice the difference between an excuse and ownership. An excuse says, \"It's not my fault because...\" Ownership says, \"Here is what I did, and here is what I will do now.\" Excuses point outward at other people and things. Ownership points back at yourself.",
          visual: {
            type: "compare",
            left: {
              title: "Passing the Buck",
              points: [
                "\"The ref was unfair.\"",
                "\"My brother distracted me.\"",
                "\"Nobody told me it was due.\"",
                "Points outward at others",
              ],
            },
            right: {
              title: "The Buck Stops Here",
              points: [
                "\"I didn't practice my free throws enough.\"",
                "\"I let myself get distracted.\"",
                "\"I didn't check the due date.\"",
                "Points back at what you can do",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Is each statement passing the buck, or taking ownership?",
            buckets: ["Passing the buck", "Taking ownership"],
            items: [
              { text: "The dog knocked my science project off the table", bucket: 0 },
              { text: "I left my project on the edge of the table where the dog could reach it", bucket: 1 },
              { text: "My teacher never reminded us about the test", bucket: 0 },
              { text: "I didn't write the test date in my planner", bucket: 1 },
              { text: "We lost because the other team got lucky", bucket: 0 },
              { text: "I missed three easy passes, so I will practice passing this week", bucket: 1 },
            ],
            hint: "Ask: is the speaker pointing at someone or something else, or at what they did themselves?",
            mistakes: [
              { match: "Dog knocked the project sorted as ownership", coach: "That sentence puts the blame on the dog. What could the speaker have done differently?" },
              { match: "Missed passes sorted as passing the buck", coach: "This speaker names their own mistake and makes a plan. That is ownership." },
            ],
            seconds: 45,
          },
          think: {
            q: "What did Truman mean by \"The Buck Stops Here\"?",
            choices: [
              "He would not push responsibility onto anyone else",
              "He liked to play card games at his desk",
              "He would stop spending the government's money",
              "Other people should make the hard choices",
            ],
            answer: 0,
            why: "Truman meant that final responsibility for decisions stopped with him.",
            hints: [
              "",
              "The phrase comes from card games, but the sign was about responsibility, not playing cards.",
              "A buck can mean a dollar, but here it is the marker from old card games that means responsibility.",
              "That is passing the buck, the exact opposite of what the sign says.",
            ],
          },
          approaches: {
            analogy:
              "Passing the buck is like a game of hot potato with blame: everyone tosses it away as fast as they can. Ownership is catching the potato and holding it.",
            example:
              "Kai's team lost a robotics match because the robot's battery died. Kai could say, \"The battery was bad.\" Instead he says, \"I was in charge of charging it, and I forgot. I'll make a checklist for next time.\" That is the buck stopping with Kai.",
            simpler: {
              q: "Which statement is an excuse?",
              choices: [
                "I forgot, and I'm sorry",
                "It's not my fault, the alarm didn't go off",
                "I'll set two alarms next time",
              ],
              answer: 1,
              why: "Blaming the alarm points outward instead of owning the result.",
              hints: [
                "Saying \"I forgot\" points back at yourself. That is ownership.",
                "",
                "Making a new plan is part of owning a mistake, not making an excuse.",
              ],
            },
          },
        },
        {
          title: "Your Circle of Control",
          teach:
            "Owning your results does not mean blaming yourself for everything. Picture a circle. Inside the circle are the things you control: your effort, your preparation, your attitude, your words and how you respond. Outside the circle are things you cannot control: the weather, the referee's call, how other people act, and luck. People who make excuses spend their energy outside the circle, complaining about things they cannot change. People who take ownership spend their energy inside it. If it rains on your race day, you cannot stop the rain, but you can bring the right shoes and run your best. That is where real power is.",
          visual: {
            type: "hotspots",
            title: "The Circle of Control",
            center: "Me",
            spots: [
              { label: "My effort", icon: "💪", detail: "How hard I work is always up to me." },
              { label: "My preparation", icon: "📝", detail: "I decide how ready I am: practice, study, packing what I need." },
              { label: "My attitude", icon: "🙂", detail: "I choose how I think about a hard situation." },
              { label: "My response", icon: "↩️", detail: "I cannot control what happens to me, but I control what I do next." },
              { label: "Outside: weather and luck", icon: "🌧️", detail: "Rain, bad bounces and luck are outside my circle. I plan for them but do not blame them." },
              { label: "Outside: other people", icon: "👥", detail: "I cannot control others' choices, only how I treat them and respond." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "It is the day of your piano recital. Sort each thing into what you can control and what you cannot.",
            buckets: ["I can control it", "I cannot control it"],
            items: [
              { text: "How many times I practiced this week", bucket: 0 },
              { text: "How many people come to watch", bucket: 1 },
              { text: "Whether I get enough sleep the night before", bucket: 0 },
              { text: "How well the performer before me plays", bucket: 1 },
              { text: "Taking a deep breath before I start", bucket: 0 },
              { text: "A thunderstorm outside during the recital", bucket: 1 },
            ],
            hint: "Ask: could I change this by my own choices? If yes, it is inside my circle.",
            mistakes: [
              { match: "Sleep sorted as cannot control", coach: "You choose when to go to bed. That is inside your circle." },
              { match: "Audience size sorted as can control", coach: "You can invite people, but you cannot decide for them whether they come. That is outside your circle." },
            ],
            seconds: 40,
          },
          think: {
            q: "Mila's soccer game is moved to a muddy field. What shows ownership?",
            choices: [
              "Complaining that the game is unfair",
              "Refusing to play until the field is dry",
              "Blaming the coach for not picking a better field",
              "Wearing longer cleats and adjusting how she dribbles",
            ],
            answer: 3,
            why: "She cannot control the mud, but she can control her preparation and how she plays.",
            hints: [
              "Complaining spends energy on something she cannot change.",
              "Refusing to play gives up control of the one thing she could change: her own effort.",
              "Blaming the coach is passing the buck. Focus on what Mila can do.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A sailor cannot control the wind, but he can adjust his sails. The wind is outside his circle. The sails are inside it.",
            example:
              "Ben got a harder teacher than his friends this year. He cannot change that. But he can do every assignment carefully, ask questions after class, and study ten extra minutes a night. By the end of the year, he has learned more than he expected.",
            simpler: {
              q: "Which of these is inside your circle of control?",
              choices: ["The weather tomorrow", "How hard you study", "What your friend decides"],
              answer: 1,
              why: "Your effort, like how hard you study, is always up to you.",
              hints: [
                "Nobody can control the weather. Plan for it instead.",
                "",
                "Your friend makes their own choices. You control only your own.",
              ],
            },
          },
        },
        {
          title: "Own It, Fix It, Learn From It",
          teach:
            "Everyone makes mistakes. What matters is what you do next. Ownership has three steps. First, own it: say plainly what you did, without adding \"but\" and an excuse. \"I forgot to feed the dog\" is ownership. \"I forgot, but my brother distracted me\" is not. Second, fix it: do what you can to make things right, like feeding the dog right away or paying for what you broke. Third, learn from it: change something so it does not happen again, like setting a reminder. People trust someone who does all three. Excuses protect your pride for a moment, but ownership builds respect that lasts.",
          visual: {
            type: "flip",
            cards: [
              { front: "1. Own it", back: "Say plainly what you did, with no \"but.\" Example: \"I broke the lamp.\"" },
              { front: "2. Fix it", back: "Make it as right as you can. Example: \"I'll pay for a new one from my savings.\"" },
              { front: "3. Learn from it", back: "Change something for next time. Example: \"I won't throw the ball in the house anymore.\"" },
              { front: "The \"but\" trap", back: "\"I'm sorry, but...\" usually turns ownership into an excuse. Leave off the \"but.\"" },
            ],
          },
          probe: {
            type: "build",
            prompt: "Leah borrowed her neighbor's rake and left it out in the rain, and now it is rusty. Build her ownership statement in the right order.",
            tiles: [
              "I left your rake out in the rain, and it rusted.",
              "That was my fault.",
              "I'll clean off the rust, or buy you a new one with my savings.",
              "From now on, I'll return anything I borrow the same day.",
            ],
            distractors: ["But nobody told me it was going to rain.", "It was already kind of old anyway."],
            hint: "Own it first, then fix it, then learn from it. Leave out anything that sounds like an excuse.",
            mistakes: [
              { match: "Used the nobody told me tile", coach: "That is the \"but\" trap. It blames someone else for the weather. Leave it out." },
              { match: "Used the already old tile", coach: "Saying it was old anyway makes the mistake seem smaller. That is an excuse, not ownership." },
              { match: "Put the fix before owning it", coach: "First say plainly what happened. The fix comes after you own it." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which apology shows full ownership?",
            choices: [
              "I'm sorry I broke your headphones, but you left them on the floor",
              "Sorry, I guess",
              "I broke your headphones. I'll replace them, and I'll be more careful with your things",
            ],
            answer: 2,
            why: "It owns the mistake, fixes it and learns from it, with no excuses.",
            hints: [
              "The word \"but\" turns this into an excuse that blames the other person.",
              "This says sorry without owning what happened or fixing anything.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Owning a mistake is like a doctor treating a cut. First you look at the wound honestly, then you clean and bandage it, then you figure out how not to get cut again.",
            example:
              "Zara missed her shift walking the neighbor's dog. She knocked on the door: \"I forgot to walk Max today. I'm sorry. I'll walk him now and do an extra walk Saturday for free. I've put a reminder on our family calendar.\" The neighbor hired her again.",
            simpler: {
              q: "What is the first step of owning a mistake?",
              choices: ["Explain whose fault it really was", "Say plainly what you did", "Wait to see if anyone notices"],
              answer: 1,
              why: "Ownership starts by honestly saying what you did, with no excuses.",
              hints: [
                "Pointing to someone else's fault is passing the buck.",
                "",
                "Hiding a mistake is the opposite of owning it.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Read Leo's story. Tap every sentence where Leo takes ownership.",
        sentences: [
          "Leo was supposed to water Mrs. Patel's tomato plants while she was away, but he forgot for three days.",
          "When she came home, he said, \"I forgot to water your plants, and some of them wilted.\"",
          "He almost added, \"It was really hot, so it's not all my fault,\" but he stopped himself.",
          "He offered to buy two new tomato plants with his own money.",
          "He wrote \"Water plants\" on a sticky note and stuck it on his bedroom door for the next time.",
          "Leo's friend said he should have just blamed the heat wave.",
        ],
        correct: [1, 3, 4],
      },
      explain: {
        prompt: "In your own words, explain what ownership means, and what you should do when you make a mistake.",
        keyPoints: [
          "Ownership means taking responsibility for your choices and results without excuses",
          "Passing the buck means blaming others instead",
          "Focus on what you can control: effort, preparation, attitude and response",
          "The three steps: own it, fix it, learn from it",
        ],
      },
      mastery: [
        {
          type: "cloze",
          text: "Pushing blame onto someone else is called passing the {0}. President {1} kept a desk sign saying it stops with him. Before D-Day, General {2} wrote a note saying any blame was his alone.",
          blanks: [{ answers: ["buck"] }, { answers: ["Truman", "Harry Truman"] }, { answers: ["Eisenhower", "Dwight Eisenhower"] }],
          bank: ["buck", "Truman", "Eisenhower", "ball", "Lincoln", "Washington"],
          hint: "Think of the old card game marker, the president with the desk sign, and the general who planned D-Day.",
          mistakes: [
            { match: "ball", coach: "Close! People say \"drop the ball\" for a mistake, but the phrase about blame uses the card-game marker." },
            { match: "Lincoln", coach: "Lincoln was a great leader, but the desk sign belonged to a twentieth-century president." },
            { match: "Washington", coach: "Washington led long before D-Day. Think of the general of World War II." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each situation with the part of ownership it shows.",
          pairs: [
            { left: "\"I spilled juice on your rug.\"", right: "Own it" },
            { left: "Scrubbing the stain out right away", right: "Fix it" },
            { left: "Keeping drinks in the kitchen from now on", right: "Learn from it" },
            { left: "\"The cup was too slippery.\"", right: "Passing the buck" },
          ],
          hint: "Owning names what you did. Fixing makes it right now. Learning changes the future. Blaming the cup is an excuse.",
          mistakes: [
            { match: "Swapped fix it and learn from it", coach: "Fixing happens right now to repair the damage. Learning is a change for next time." },
            { match: "Matched the slippery cup to own it", coach: "Blaming the cup points away from yourself. That is passing the buck." },
          ],
          seconds: 40,
        },
        {
          type: "sort",
          prompt: "Before a big spelling bee, sort what is inside and outside your circle of control.",
          buckets: ["Inside my circle", "Outside my circle"],
          items: [
            { text: "Studying the word list every night", bucket: 0 },
            { text: "Which words the judge picks", bucket: 1 },
            { text: "Asking for a word's definition before spelling it", bucket: 0 },
            { text: "How well the other spellers have studied", bucket: 1 },
            { text: "Staying calm if I miss a word", bucket: 0 },
          ],
          hint: "Ask: can I change this with my own choices?",
          mistakes: [
            { match: "Judge's words sorted as inside", coach: "The judge chooses the words. You can only control how ready you are for them." },
            { match: "Staying calm sorted as outside", coach: "Your attitude and response are always inside your circle, even when it is hard." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build an ownership statement for a soccer player whose missed shot lost the game.",
          tiles: ["I missed", "an open shot,", "and I'll practice", "shooting", "every day this week"],
          distractors: ["but the goalie got lucky", "because the ball was flat"],
          hint: "Own the mistake and make a plan, with no excuses.",
          mistakes: [
            { match: "Used the lucky goalie tile", coach: "Blaming the goalie's luck points outward. Ownership points back at what you can do." },
            { match: "Used the flat ball tile", coach: "Blaming the ball is an excuse. Leave it out." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What does it mean to pass the buck?",
          choices: [
            "To lend someone a dollar",
            "To push blame or responsibility onto someone else",
            "To win a card game",
          ],
          answer: 1,
          why: "Passing the buck means shifting the blame or a hard job to another person.",
        },
        {
          q: "What did General Eisenhower's note before D-Day say?",
          choices: [
            "That any blame for a failed attack was his alone",
            "That the weather would be to blame if it failed",
            "That the soldiers had not trained hard enough",
            "That the attack should be cancelled",
          ],
          answer: 0,
          why: "Eisenhower wrote that the decision was his and any blame was his alone.",
        },
        {
          q: "Which of these is inside your circle of control?",
          choices: ["The referee's calls", "The weather on game day", "How the other team plays", "How much you practiced"],
          answer: 3,
          why: "Your effort and preparation are always within your control.",
        },
        {
          q: "What are the three steps of owning a mistake?",
          choices: [
            "Hide it, wait, hope",
            "Explain, blame, move on",
            "Own it, fix it, learn from it",
          ],
          answer: 2,
          why: "Say what you did, make it right, and change something so it does not happen again.",
        },
        {
          q: "Why do people trust someone who owns their mistakes?",
          choices: [
            "Because they never make any mistakes",
            "Because they are honest and fix what goes wrong",
            "Because they always have a good excuse ready",
          ],
          answer: 1,
          why: "Ownership shows honesty and responsibility, which earns lasting respect.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Think of a real time you made a mistake, big or small. Write one or two paragraphs: describe what happened, then write what you could have said using the three steps (own it, fix it, learn from it). Finally, describe one thing in your life right now that is inside your circle of control that you want to work on.",
        rubric: [
          "Describes a specific, real mistake honestly",
          "Writes an ownership statement with all three steps and no excuses",
          "Names something inside their circle of control and a plan for it",
          "Writing is clear and in complete sentences",
        ],
      },
    },
    {
      id: "leadership.resilience",
      title: "Bouncing Back from Failure",
      minutes: 30,
      stage: "logic",
      subject: "Other",
      read: [
        "In 1901, two brothers who ran a bicycle shop in Dayton, Ohio, packed up their glider at Kitty Hawk, North Carolina, and headed home disappointed. Wilbur and Orville Wright's glider did not lift nearly as well as they had expected. Instead of quitting, they asked why. They found that the tables of numbers everyone used for wing design were wrong. So they built a small wind tunnel in their shop and tested hundreds of small model wings, more than 200 shapes. On December 17, 1903, Orville made the first powered, controlled airplane flight. It lasted 12 seconds and went 120 feet.",
        "The ability to bounce back from failure is called resilience. Many great people failed often before they succeeded.",
        "Thomas Edison and his team tested thousands of materials before they found a filament that let a light bulb glow for a long time. Each failure told them one more thing that did not work. Years later, in 1914, a huge fire destroyed much of Edison's factory in West Orange, New Jersey. He was 67 years old. He began rebuilding right away.",
        "Abraham Lincoln faced many setbacks. He lost his first election in 1832. A store he ran with a partner failed and left him in debt that took years to pay. He lost two races for the United States Senate, in 1855 and 1858. In 1860, he was elected president.",
        "Resilient people think about failure in a special way. Instead of saying \"I'm just not good at this,\" they say \"I'm not good at this yet.\" They treat a failure as information, like the Wrights' wrong wing tables. Bouncing back has four steps: feel the disappointment, find the lesson, change your plan and try again.",
        "Failure is not the opposite of success. Very often it is the path to it.",
      ].join("\n\n"),
      keyIdeas: [
        "Resilience is the ability to bounce back from failure.",
        "Edison, Lincoln and the Wright brothers all failed many times before they succeeded.",
        "A failure is information: it shows you what to change.",
        "To bounce back: feel it, find the lesson, change your plan, try again.",
      ],
      hook: {
        text: "In 1901, two brothers packed up their glider and went home disappointed. It did not fly the way they had planned, and they were not sure flying was possible at all. Two years later, those same brothers made history. What did they do in between that changed everything?",
      },
      teach: [
        {
          title: "Edison's Thousands of Tries",
          teach:
            "Thomas Edison is famous for his inventions, but he was just as good at failing. To make a light bulb that glowed for a long time, he needed a filament, the thin thread inside the bulb that glows. Most materials burned up in moments. Edison and his team tested thousands of materials, from plant fibers to metals. Each failed test taught them something: this material does not work, so try something else. Finally they found that a thread of carbonized bamboo could glow for more than a thousand hours. Years later, in 1914, a huge fire destroyed much of Edison's factory. He was 67 years old. Instead of giving up, he began rebuilding right away.",
          visual: {
            type: "flip",
            cards: [
              { front: "Filament", back: "The thin thread inside a light bulb that glows when electricity passes through it." },
              { front: "The problem", back: "Most materials burned out in moments. Edison needed one that would last for hours." },
              { front: "Thousands of tests", back: "Edison's team tried thousands of materials. Each failure crossed one more off the list." },
              { front: "Carbonized bamboo", back: "A bamboo thread, baked into carbon, could glow for more than a thousand hours." },
              { front: "The 1914 fire", back: "A fire destroyed much of his factory when he was 67. He started rebuilding right away." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Edison needed a {0} that would glow for a long time. His team tested {1} of materials, and each failed test showed them what did not {2}. After a fire destroyed his factory in 1914, he began {3} right away.",
            blanks: [
              { answers: ["filament"] },
              { answers: ["thousands"] },
              { answers: ["work"] },
              { answers: ["rebuilding"] },
            ],
            bank: ["filament", "thousands", "work", "rebuilding", "battery", "two", "retiring"],
            hint: "Think of the thin glowing thread, how many materials they tried, and what Edison did after the fire.",
            mistakes: [
              { match: "battery", coach: "A battery stores power. The part that glows inside a bulb is a thin thread with a different name." },
              { match: "two", coach: "Edison's team tried far more than two. It was a huge number." },
              { match: "retiring", coach: "Edison was 67, but he did not quit. He started over." },
            ],
            seconds: 45,
          },
          think: {
            q: "How did Edison think about each failed filament test?",
            choices: [
              "As proof that he was a bad inventor",
              "As useful information about what did not work",
              "As a sign that he should give up",
            ],
            answer: 1,
            why: "Each failure crossed one more material off the list and brought him closer to the answer.",
            hints: [
              "If he thought that, he would have stopped after the first few tries.",
              "",
              "He kept going through thousands of tests. Failure did not make him quit.",
            ],
          },
          approaches: {
            analogy:
              "Searching for the right filament was like trying keys on a giant key ring. Every key that does not fit is not wasted. It is one fewer key left to try.",
            example:
              "Lily is trying to bake bread, but the first loaf comes out flat. She learns her yeast was too old. The second is too dense, so she kneads longer. The third loaf is perfect. Each flop told her exactly what to change.",
            simpler: {
              q: "What is a filament?",
              choices: ["The glass part of a light bulb", "The thin thread inside a bulb that glows", "The switch on the wall"],
              answer: 1,
              why: "The filament is the thin thread that glows when electricity passes through it.",
              hints: [
                "The glass protects the inside, but it is not what glows.",
                "",
                "The switch turns the power on. The glowing part is inside the bulb.",
              ],
            },
          },
        },
        {
          title: "Lincoln's Long Road",
          teach:
            "Abraham Lincoln grew up poor on the frontier, with very little school. As a young man, he ran for the Illinois legislature in 1832 and lost. He and a partner opened a store, but it failed, leaving Lincoln in debt that took him years to pay back. He did pay it all. He kept studying, became a lawyer, and later won a seat in Congress. Then came more setbacks. He tried for the United States Senate in 1855 and lost. He tried again in 1858 and lost again. Many people would have quit. But in 1860, Abraham Lincoln was elected president, and he led the nation through the Civil War.",
          visual: {
            type: "timeline",
            events: [
              { year: 1832, label: "Loses his first election", detail: "Lincoln runs for the Illinois legislature and loses." },
              { year: 1833, label: "His store fails", detail: "The store he ran with a partner fails, leaving him in debt that he takes years to repay." },
              { year: 1834, label: "Wins on his second try", detail: "Lincoln is elected to the Illinois legislature." },
              { year: 1846, label: "Elected to Congress", detail: "He wins a seat in the U.S. House of Representatives." },
              { year: 1855, label: "Loses a Senate race", detail: "Lincoln tries for the U.S. Senate and loses." },
              { year: 1858, label: "Loses another Senate race", detail: "After famous debates with Stephen Douglas, he loses again." },
              { year: 1860, label: "Elected president", detail: "Two years after his last loss, Lincoln is elected the 16th president." },
            ],
          },
          probe: {
            type: "place",
            prompt: "Place each moment from Lincoln's long road on the timeline.",
            min: 1825,
            max: 1865,
            step: 1,
            tolerance: 1,
            items: [
              { label: "Loses his first election", value: 1832 },
              { label: "Loses his second Senate race", value: 1858 },
              { label: "Elected president", value: 1860 },
            ],
            hint: "His first loss was in the early 1830s. His last Senate loss came just two years before he became president in 1860.",
            mistakes: [
              { match: "Placed the presidency before the Senate loss", coach: "Lincoln lost the Senate race first, then bounced back to become president two years later." },
              { match: "Placed the first election in the 1840s", coach: "His very first try came when he was a young man, in 1832." },
            ],
            seconds: 45,
          },
          think: {
            q: "What does Lincoln's story teach about failure?",
            choices: [
              "If you lose once, you are not meant for it",
              "Only lucky people succeed",
              "Setbacks can be part of the road to success",
              "You should never try anything big",
            ],
            answer: 2,
            why: "Lincoln lost several times, kept going, and became president.",
            hints: [
              "Lincoln lost his first election and many after it, yet he became president.",
              "Lincoln worked hard for decades. His success was not just luck.",
              "",
              "Lincoln tried big things again and again, even after losing.",
            ],
          },
          approaches: {
            analogy:
              "Lincoln's career was like climbing a mountain with switchbacks. Sometimes the trail seemed to go sideways or even down, but every step kept him on the mountain.",
            example:
              "In 1858, Lincoln lost a Senate race to Stephen Douglas. But their debates were printed in newspapers, and people across the country learned who Lincoln was. The loss helped him become known, and two years later he won the presidency.",
            simpler: {
              q: "In what year was Lincoln elected president?",
              choices: ["1832", "1858", "1860"],
              answer: 2,
              why: "Lincoln was elected president in 1860, two years after losing a Senate race.",
              hints: [
                "1832 was the year of his very first election, which he lost.",
                "1858 was a Senate race he lost.",
                "",
              ],
            },
          },
        },
        {
          title: "The Wright Brothers' Wind Tunnel",
          teach:
            "Wilbur and Orville Wright ran a bicycle shop in Dayton, Ohio. In 1900 and 1901 they tested gliders at Kitty Hawk, North Carolina, but the gliders lifted much less than the numbers predicted. They went home discouraged. Then they asked why. They suspected the tables of numbers everyone used for wing design were wrong. To find out, they built a small wind tunnel in their shop and tested more than 200 tiny model wing shapes. Their own careful data was better. Their 1902 glider flew beautifully. On December 17, 1903, at Kitty Hawk, Orville flew their engine-powered Flyer for 12 seconds and 120 feet. It was the first powered, controlled airplane flight.",
          visual: {
            type: "sequence",
            prompt: "How the Wright brothers turned failure into flight",
            steps: [
              "1900-1901: Their gliders lift much less than expected",
              "They ask why, and suspect the wing tables are wrong",
              "They build a wind tunnel and test over 200 wing shapes",
              "1902: Their new glider, built with their own data, flies well",
              "December 17, 1903: the first powered, controlled airplane flight",
            ],
          },
          probe: {
            type: "number",
            prompt: "On December 17, 1903, Orville Wright's first flight went 120 feet in 12 seconds. On average, how many feet did the Flyer travel each second?",
            answer: 10,
            unit: "feet per second",
            hint: "Divide the distance by the time.",
            mistakes: [
              { match: "1440", coach: "You multiplied. Speed is distance divided by time." },
              { match: "132", coach: "You added the numbers. Divide 120 feet by 12 seconds instead." },
              { match: "108", coach: "You subtracted. Speed is distance divided by time." },
            ],
            seconds: 30,
          },
          think: {
            q: "What did the Wright brothers do after their 1901 glider disappointed them?",
            choices: [
              "They found out why by testing wing shapes in a wind tunnel",
              "They gave up and went back to bicycles for good",
              "They blamed the wind at Kitty Hawk",
            ],
            answer: 0,
            why: "They treated the failure as a clue, tested over 200 wing shapes, and fixed the problem.",
            hints: [
              "",
              "They were discouraged, but they did not quit. They went looking for the reason.",
              "Blaming the wind would be an excuse. They looked for something they could fix.",
            ],
          },
          approaches: {
            analogy:
              "The Wrights were like detectives. The failed glider was the clue, the wind tunnel was the magnifying glass, and the bad wing tables were the culprit.",
            example:
              "Mateo's model rocket kept tipping over at launch. Instead of quitting, he tested three different fin sizes on the same rocket. The biggest fins made it fly straight. Like the Wrights, he tested to find the real problem.",
            simpler: {
              q: "How long did the first powered airplane flight last?",
              choices: ["12 seconds", "12 minutes", "12 hours"],
              answer: 0,
              why: "Orville's first flight lasted just 12 seconds, but it changed history.",
              hints: [
                "",
                "Much shorter than that! The first flight was very brief.",
                "No early plane could stay up that long. The first flight was very short.",
              ],
            },
          },
        },
        {
          title: "How to Bounce Back",
          teach:
            "Resilience means bouncing back after a failure. It starts with how you think. Someone who says \"I'm just bad at this\" sees failure as a final verdict. Someone resilient adds one powerful word: \"I'm not good at this yet.\" They see failure as information, the way the Wrights saw their glider. Bouncing back has four steps. First, feel it: it is normal to be disappointed, so let yourself feel it for a while. Second, find the lesson: ask what went wrong and why. Third, change your plan: do something differently. Fourth, try again. Failure is not the opposite of success. Very often it is the path to it.",
          visual: {
            type: "compare",
            left: {
              title: "Giving Up Thinking",
              points: [
                "\"I'm just bad at this.\"",
                "\"I failed, so I'm a failure.\"",
                "\"Why bother trying again?\"",
                "Sees failure as the end",
              ],
            },
            right: {
              title: "Bouncing Back Thinking",
              points: [
                "\"I'm not good at this yet.\"",
                "\"I failed this time. What can I learn?\"",
                "\"What should I change for next time?\"",
                "Sees failure as information",
              ],
            },
          },
          probe: {
            type: "highlight",
            prompt: "Grace failed her first piano exam. Tap every thought that shows resilience.",
            sentences: [
              "I'm just not a music person.",
              "I'm disappointed, and that's okay for today.",
              "I rushed the fast part, so I'll practice it slowly with a metronome.",
              "Everyone else is naturally better than me.",
              "I can't play the fast part yet, but I can learn it.",
              "I'll never try another exam.",
            ],
            correct: [1, 2, 4],
            hint: "Look for thoughts that feel the disappointment, find a lesson, make a new plan, or use the word yet.",
            mistakes: [
              { match: "Tapped not a music person", coach: "That treats one failure as a final verdict about who she is. Resilience says \"not yet.\"" },
              { match: "Skipped the disappointed thought", coach: "Feeling disappointed is the first step of bouncing back. It is normal and healthy." },
              { match: "Tapped never try again", coach: "Quitting is the opposite of bouncing back." },
            ],
            seconds: 40,
          },
          think: {
            q: "Jack failed his first try at the swim test. Which thought shows resilience?",
            choices: [
              "I'm just a bad swimmer",
              "The test is unfair",
              "Swimming is pointless anyway",
              "I can't do it yet, so I'll practice my breathing and try next week",
            ],
            answer: 3,
            why: "It uses the word yet, finds a lesson and makes a new plan.",
            hints: [
              "That turns one failure into a final verdict. Resilient people say \"not yet.\"",
              "Blaming the test is an excuse, not a lesson.",
              "Pretending it does not matter is a way of giving up.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Resilience is like a rubber ball. Drop a lump of clay and it goes splat. Drop a rubber ball and it bounces back up. The fall is the same; what happens next is different.",
            example:
              "Ruth tried out for the basketball team and was cut. She felt sad for a weekend. Then she asked the coach what to work on: dribbling with her left hand. She practiced every day all year, tried out again, and made the team.",
            simpler: {
              q: "What small word turns \"I can't do it\" into a resilient thought?",
              choices: ["Never", "Yet", "Maybe"],
              answer: 1,
              why: "\"I can't do it yet\" means you are still learning and can improve.",
              hints: [
                "Never makes it sound permanent. That is the opposite of resilience.",
                "",
                "Maybe is unsure. The resilient word says you will get there with practice.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the four steps of bouncing back in order, using the Wright brothers as an example.",
        steps: [
          "Feel it: they went home from Kitty Hawk disappointed",
          "Find the lesson: the wing tables everyone used were wrong",
          "Change the plan: build a wind tunnel and test over 200 wing shapes",
          "Try again: the 1902 glider flew, and in 1903 they made the first powered flight",
        ],
      },
      explain: {
        prompt: "In your own words, what is resilience? Use one example from Edison, Lincoln or the Wright brothers, and explain the steps for bouncing back from a failure.",
        keyPoints: [
          "Resilience is bouncing back after failure",
          "Gives a correct example from Edison, Lincoln or the Wright brothers",
          "Explains that failure can be information or a lesson",
          "Names the steps: feel it, find the lesson, change your plan, try again",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each person to the setback they bounced back from.",
          pairs: [
            { left: "Thomas Edison", right: "Thousands of failed light bulb filaments" },
            { left: "Abraham Lincoln", right: "Losing two races for the U.S. Senate" },
            { left: "The Wright brothers", right: "Gliders that would not lift as expected" },
          ],
          hint: "Think about who was an inventor, who was a politician, and who ran a bicycle shop.",
          mistakes: [
            { match: "Matched Lincoln to the filaments", coach: "Lincoln was a lawyer and leader. The filaments belong to the inventor." },
            { match: "Matched Edison to the gliders", coach: "Edison worked on light bulbs. The gliders belong to the brothers from Dayton." },
          ],
          seconds: 35,
        },
        {
          type: "place",
          prompt: "Place each comeback moment on the timeline.",
          min: 1825,
          max: 1920,
          step: 1,
          tolerance: 1,
          items: [
            { label: "Lincoln is elected president", value: 1860 },
            { label: "The Wright brothers' first powered flight", value: 1903 },
            { label: "Fire destroys much of Edison's factory", value: 1914 },
          ],
          hint: "Lincoln came first, before the Civil War. The first flight was at the start of the 1900s, and Edison's fire came about eleven years later.",
          mistakes: [
            { match: "Placed the first flight after the fire", coach: "The Wrights flew in 1903. Edison's factory fire came later, in 1914." },
            { match: "Placed Lincoln after 1900", coach: "Lincoln lived in the 1800s and was elected just before the Civil War." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "The Wright brothers ran their first glider tests at Kitty Hawk in 1900. How many years later was their first powered flight in 1903?",
          answer: 3,
          unit: "years",
          hint: "Subtract 1900 from 1903.",
          mistakes: [
            { match: "2", coach: "1901 was their disappointing year, but count from the first tests in 1900." },
            { match: "1903", coach: "That is the year of the flight. Subtract to find how many years passed." },
          ],
          seconds: 25,
        },
        {
          type: "build",
          prompt: "Build a resilient thought for someone who failed a math test.",
          tiles: ["I don't understand fractions", "yet,", "so I'll ask for help", "and practice", "before the next test"],
          distractors: ["because I'm bad at math", "so I'll stop trying"],
          hint: "Use the word yet, then make a plan. Leave out anything that sounds like giving up.",
          mistakes: [
            { match: "Used bad at math", coach: "That turns one failure into a final verdict. Resilience says \"not yet.\"" },
            { match: "Used stop trying", coach: "Stopping is the opposite of bouncing back." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What is resilience?",
          choices: [
            "Never failing at anything",
            "Being naturally talented",
            "Avoiding hard things so you cannot fail",
            "The ability to bounce back from failure",
          ],
          answer: 3,
          why: "Resilience is about how you respond after failure, not avoiding it.",
        },
        {
          q: "What did the Wright brothers build to discover why their gliders did not lift well?",
          choices: ["A bigger engine", "A wind tunnel", "A taller hill"],
          answer: 1,
          why: "They built a small wind tunnel and tested more than 200 wing shapes.",
        },
        {
          q: "Which setback did Abraham Lincoln face before becoming president?",
          choices: [
            "He lost two races for the U.S. Senate",
            "He was never allowed to vote",
            "He failed his pilot's test",
          ],
          answer: 0,
          why: "Lincoln lost Senate races in 1855 and 1858, then was elected president in 1860.",
        },
        {
          q: "What did Edison do after a fire destroyed much of his factory in 1914?",
          choices: [
            "He retired",
            "He sold his company",
            "He began rebuilding right away",
            "He moved to another country",
          ],
          answer: 2,
          why: "At 67, Edison started rebuilding right away instead of giving up.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Tell your family the story of a comeback, in about two minutes. It can be Edison, Lincoln, the Wright brothers, or a real time you failed and tried again. Explain the setback, the lesson learned, what changed, and how it turned out. End with one sentence about what you will try again yourself.",
        rubric: [
          "Tells the story clearly with accurate facts",
          "Explains the lesson that came from the failure",
          "Shows how the plan changed before trying again",
          "Ends with a personal sentence about something they will keep trying",
        ],
      },
    },
    {
      id: "leadership.service",
      title: "Leading by Serving",
      minutes: 30,
      stage: "rhetoric",
      subject: "Speaking",
      read: [
        "In December 1783, the American Revolution was over. General George Washington was the most famous and admired man in the country. He commanded an army that had just won its war. In many times and places, a victorious general with a loyal army has used it to take power for himself. Washington did the opposite. On December 23, 1783, he walked into the meeting of Congress at Annapolis, Maryland, handed back his commission as commander, and went home to his farm at Mount Vernon.",
        "Americans compared him to Cincinnatus, a farmer of ancient Rome. According to the Roman historian Livy, Cincinnatus was called from his plow to lead Rome in an emergency. He won, gave up his power after about sixteen days, and went back to farming. The city of Cincinnati, Ohio, is named after a society of officers who honored that example.",
        "Washington's choice shows a great truth about leadership: the best leaders serve. A serving leader asks, \"What does my team need?\" instead of \"What can my team do for me?\" Years later, after two terms as president, Washington again stepped down on his own, in 1797.",
        "Serving leaders are also stewards. A steward takes care of something that belongs to someone else, or that was trusted to them, and tries to leave it better than they found it. You can be a steward of a borrowed book, your family's home, money you are given, or a park you visit.",
        "Serving starts close to home. As a young man in Philadelphia, Benjamin Franklin helped start a lending library in 1731 and a volunteer fire company in 1736. He saw needs in his community and organized people to meet them. You can do the same: notice a need, ask the people you want to help, make a plan, and get to work.",
        "Real leaders measure their success by how much better off the people around them are.",
      ].join("\n\n"),
      keyIdeas: [
        "Serving leaders put the needs of their team and community ahead of their own power.",
        "Washington gave up power twice, in 1783 and 1797, following the example of Cincinnatus.",
        "A steward takes care of what was trusted to them and leaves it better than they found it.",
        "Service starts by noticing a need, asking, planning and acting.",
      ],
      hook: {
        text: "Imagine winning a war, commanding a loyal army, and being the most admired person in the country. You could ask for almost anything. In 1783, George Washington had all of that, and he chose to give his power back and go home to his farm. Why would a leader walk away from that much power?",
      },
      teach: [
        {
          title: "Washington and Cincinnatus",
          teach:
            "George Washington took command of the American army in 1775. For eight hard years he led it through cold winters, defeats and finally victory. By 1783 he was the most admired man in America. Throughout history, many winning generals have used their armies to seize power. Washington did the opposite. On December 23, 1783, he went before Congress at Annapolis, Maryland, and handed back his commission. Then he went home to his farm. People compared him to Cincinnatus, a farmer of ancient Rome who, according to the historian Livy, was called from his plow to save the city, then gave up his power after about sixteen days and went back to his fields.",
          visual: {
            type: "timeline",
            events: [
              { year: 1775, label: "Washington takes command", detail: "Congress makes Washington commander of the Continental Army." },
              { year: 1783, label: "Washington resigns his commission", detail: "On December 23, at Annapolis, he hands his power back to Congress and goes home to Mount Vernon." },
              { year: 1789, label: "First president", detail: "Washington is called back to serve as the first president of the United States." },
              { year: 1797, label: "Steps down again", detail: "After two terms, he chooses to step down and return home, setting an example for later presidents." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Washington took command of the army in 1775 and handed back his commission in 1783. How many years did he serve as commander?",
            answer: 8,
            unit: "years",
            hint: "Subtract the earlier year from the later year.",
            mistakes: [
              { match: "3558", coach: "You added the years. Subtract 1775 from 1783 instead." },
              { match: "7", coach: "Check your subtraction: 1775 plus 8 is 1783." },
              { match: "18", coach: "Check your subtraction again. From 1775 to 1783 is less than ten years." },
            ],
            seconds: 25,
          },
          think: {
            q: "Why do people compare Washington to Cincinnatus?",
            choices: [
              "Both were farmers who gave up power and went home after serving",
              "Both were kings who ruled for life",
              "Both lived in ancient Rome",
            ],
            answer: 0,
            why: "Each was called to lead in a crisis, then gave up power instead of keeping it.",
            hints: [
              "",
              "Neither was a king. The point is that they gave power back.",
              "Only Cincinnatus lived in Rome. Washington lived in America about 2,200 years later.",
            ],
          },
          approaches: {
            analogy:
              "A serving leader is like a lifeguard. The lifeguard has authority at the pool, but it is all for the swimmers' safety. When the shift is over, the lifeguard hands the chair to the next person and goes home.",
            example:
              "When Washington resigned in 1783, he could have kept command of a victorious army. Instead he gave his power back to the people's representatives. That choice helped show the world that the new country would be ruled by laws, not by a general.",
            simpler: {
              q: "What did Washington do in December 1783?",
              choices: ["Crowned himself king", "Handed back his command and went home", "Started a new war"],
              answer: 1,
              why: "Washington gave his commission back to Congress and returned to his farm.",
              hints: [
                "Washington refused to become a king. He did the opposite.",
                "",
                "The war had just ended. Washington wanted peace and to go home.",
              ],
            },
          },
        },
        {
          title: "The Leader Serves the Team",
          teach:
            "A serving leader asks, \"What does my team need?\" instead of \"What can my team do for me?\" Washington showed this in March 1783, when some of his officers were angry because Congress had not paid them. There was talk of rebellion. Washington met with them and asked them to stay loyal. As he began to read a letter, he paused to put on his glasses and said he had grown gray and almost blind in the service of his country. Many officers were moved to tears, and the danger passed. They trusted him because he had suffered alongside them. Serving leaders eat last, work hardest and give the credit away.",
          visual: {
            type: "compare",
            left: {
              title: "Boss for Myself",
              points: [
                "Asks: what can my team do for me?",
                "Takes the credit",
                "Gives orders, avoids hard work",
                "Uses people to look good",
              ],
            },
            right: {
              title: "Serving Leader",
              points: [
                "Asks: what does my team need?",
                "Gives the credit away",
                "Works alongside the team",
                "Helps each person grow",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Maya is captain of her robotics team. Sort each choice: is she serving the team, or using the team for herself?",
            buckets: ["Serving the team", "Using the team for herself"],
            items: [
              { text: "She stays late to help a new member learn to code", bucket: 0 },
              { text: "She tells the judges the robot was mostly her idea", bucket: 1 },
              { text: "She asks each teammate what they need to finish their part", bucket: 0 },
              { text: "She picks the fun jobs for herself and gives others the boring ones", bucket: 1 },
              { text: "She thanks the whole team by name after they win", bucket: 0 },
              { text: "She only helps teammates who are her close friends", bucket: 1 },
            ],
            hint: "Ask: is this choice about what the team needs, or about what Maya gets?",
            mistakes: [
              { match: "Telling the judges sorted as serving", coach: "Taking the credit puts Maya first. A serving leader gives the credit away." },
              { match: "Thanking the team sorted as using", coach: "Thanking everyone by name gives the credit to the team. That is serving." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Washington's officers listen to him at Newburgh in 1783?",
            choices: [
              "He threatened to punish them",
              "He promised to make them rich",
              "He had suffered and served alongside them for years",
              "He was the tallest person in the room",
            ],
            answer: 2,
            why: "His years of service and sacrifice earned their trust, so his words moved them.",
            hints: [
              "Washington appealed to their loyalty, not their fear.",
              "He could not promise riches. Congress had not even paid them.",
              "",
              "Height has nothing to do with it. Think about what he had done for them.",
            ],
          },
          approaches: {
            analogy:
              "A serving leader is like the roots of a tree. Nobody sees the roots, but they feed and hold up everything else. The leader's job is to make the whole tree strong.",
            example:
              "On a family camping trip, Noah is the oldest. Instead of grabbing the best spot, he helps his little sisters set up their tent first, carries the heavy cooler and makes sure everyone has eaten before he does. That is leading by serving.",
            simpler: {
              q: "What question does a serving leader ask?",
              choices: ["What can my team do for me?", "How can I get the credit?", "What does my team need?"],
              answer: 2,
              why: "Serving leaders focus on what their team needs.",
              hints: [
                "That question puts the leader first. Flip it around.",
                "Serving leaders give credit away instead of chasing it.",
                "",
              ],
            },
          },
        },
        {
          title: "Being a Good Steward",
          teach:
            "A steward is someone who takes care of something that belongs to someone else, or that has been trusted to them. In old times, a steward managed a large house or farm for its owner. Today, everyone is a steward of something. You are a steward of a library book, your family's home, money your parents give you, your own health and talents, and the parks and trails you visit. A good steward has a simple rule: leave it better than you found it. Return the borrowed bike clean. Pick up trash at the campsite, even if it is not yours. Washington spent years improving the land at Mount Vernon, trying new crops and better farming methods. Stewardship is service in small, everyday actions.",
          visual: {
            type: "hotspots",
            title: "Things You Are a Steward Of",
            center: "Leave it better",
            spots: [
              { label: "Borrowed things", icon: "📚", detail: "Return books, tools and bikes on time and in good shape, or better." },
              { label: "Your home", icon: "🏡", detail: "Do your part to keep your family's home clean, safe and in good repair." },
              { label: "Money", icon: "💵", detail: "Money you are given is a trust. Spend, save and give it wisely." },
              { label: "Your talents", icon: "🎻", detail: "Your gifts grow when you use and practice them, and they can help others." },
              { label: "Nature", icon: "🌲", detail: "Parks, trails and campsites: pack out your trash, and pick up a little extra." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every action that shows good stewardship: leaving something better than you found it.",
            sentences: [
              "Owen returns his neighbor's lawn mower cleaned and with a full gas can.",
              "Bella leaves her library book in the rain on the porch.",
              "Sam picks up the trash at the picnic table, even though it was not his.",
              "Tara spends all of her birthday money the first day without a plan.",
              "Leo fixes the loose hinge on the family's gate after asking his dad how.",
            ],
            correct: [0, 2, 4],
            hint: "Look for people taking care of something they were trusted with, or improving it.",
            mistakes: [
              { match: "Tapped the library book in the rain", coach: "A library book belongs to the whole town. Leaving it in the rain is the opposite of stewardship." },
              { match: "Tapped spending all the birthday money", coach: "Money is something you are a steward of. Spending it all with no plan is not taking care of it." },
            ],
            seconds: 40,
          },
          think: {
            q: "What is the simple rule of a good steward?",
            choices: [
              "Keep everything for yourself",
              "Use it up before someone else does",
              "Only take care of things you own",
              "Leave it better than you found it",
            ],
            answer: 3,
            why: "A good steward takes care of what was trusted to them and improves it.",
            hints: [
              "A steward cares for things, often things that belong to others. Keeping it all is not the point.",
              "Using things up is the opposite of taking care of them.",
              "Stewards especially care for things that belong to others, like borrowed books.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Being a steward is like being trusted to babysit a neighbor's puppy. It is not your dog, so you take extra good care of it, and you hand it back happy, fed and walked.",
            example:
              "Hannah borrowed her grandfather's fishing rod for the summer. When she returned it, she had cleaned the reel, replaced the old line, and added two new lures. Her grandfather said she could borrow anything of his, anytime.",
            simpler: {
              q: "A steward takes care of things that...",
              choices: ["Have been trusted to them", "Are broken beyond repair", "Nobody wants"],
              answer: 0,
              why: "A steward takes care of what belongs to someone else or has been trusted to them.",
              hints: [
                "",
                "A steward might fix things, but the key idea is being trusted with them.",
                "Stewards care for things that matter to others.",
              ],
            },
          },
        },
        {
          title: "Serving Your Community",
          teach:
            "Service starts close to home. As a young man in Philadelphia, Benjamin Franklin noticed that books were expensive and hard to get. In 1731 he helped start a library where members shared books. He also saw how dangerous fires were in a city of wooden buildings, so in 1736 he helped organize a volunteer fire company. Franklin did not wait for someone else to fix things. You can serve your community the same way, in four steps. First, notice a need. Second, ask the people you want to help what would really help them. Third, make a plan with a goal and a date. Fourth, do it, and invite others to join you.",
          visual: {
            type: "timeline",
            events: [
              { year: 1731, label: "A library for everyone", detail: "Franklin and friends start the Library Company of Philadelphia so members can share books." },
              { year: 1736, label: "A volunteer fire company", detail: "Franklin helps organize the Union Fire Company, where neighbors fight fires together." },
              { year: 1751, label: "A hospital", detail: "Franklin helps raise money to start the Pennsylvania Hospital, one of the first in America." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each community need with a service project a 12-year-old could lead.",
            pairs: [
              { left: "An elderly neighbor can't shovel her walk", right: "Shovel it every time it snows this winter" },
              { left: "The park is littered after weekends", right: "Organize a Saturday cleanup with friends" },
              { left: "The local food pantry is low on canned food", right: "Run a canned food drive at church or club" },
              { left: "Younger kids at the library struggle to read", right: "Volunteer to read with them once a week" },
            ],
            hint: "For each need, find the project that solves that exact problem.",
            mistakes: [
              { match: "Matched the park to the food drive", coach: "A food drive helps the pantry. The littered park needs a cleanup." },
              { match: "Matched the neighbor to reading", coach: "Reading helps young readers. The neighbor's problem is her snowy walk." },
            ],
            seconds: 45,
          },
          think: {
            q: "What is the best first step for starting a service project?",
            choices: [
              "Buy matching T-shirts for your team",
              "Notice a real need in your community",
              "Post about it before you do anything",
            ],
            answer: 1,
            why: "Like Franklin, good service starts by noticing a real need.",
            hints: [
              "T-shirts are fun, but they do not help anyone yet. Start with the need.",
              "",
              "Serving is about helping others, not about attention. Start with the need.",
            ],
          },
          approaches: {
            analogy:
              "Serving your community is like being a good teammate on a bigger team. You look around, see where the team needs help, and step in.",
            example:
              "Eli noticed that the families at the end of his street had no one to rake their leaves. He asked them, made a list, recruited three friends, and set a date. In one Saturday they raked six yards, and the neighbors brought hot cider.",
            simpler: {
              q: "What did Franklin help start in Philadelphia in 1736?",
              choices: ["A volunteer fire company", "A toy store", "A sports team"],
              answer: 0,
              why: "Franklin helped organize a volunteer fire company to protect the city.",
              hints: [
                "",
                "Franklin was serving a need, not selling toys. Think about the danger in a city of wooden buildings.",
                "Franklin's projects met serious community needs, like protecting homes from fire.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each example into the kind of service it shows.",
        buckets: ["Serving leader", "Good steward", "Community service"],
        items: [
          { text: "A team captain helps the newest player learn the drills", bucket: 0 },
          { text: "A general gives power back and goes home to his farm", bucket: 0 },
          { text: "Returning a borrowed bike cleaned and with air in the tires", bucket: 1 },
          { text: "Picking up extra trash at the campsite before you leave", bucket: 1 },
          { text: "Starting a lending library so neighbors can share books", bucket: 2 },
          { text: "Running a canned food drive for the local pantry", bucket: 2 },
        ],
      },
      explain: {
        prompt: "In your own words, explain what it means to lead by serving. Use Washington's example and describe what a good steward does.",
        keyPoints: [
          "A serving leader puts the team's or community's needs first",
          "Washington gave up power and went home instead of keeping it",
          "A steward takes care of what was trusted to them and leaves it better",
          "Service starts by noticing a need and making a plan to help",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place each moment of Washington's service on the timeline.",
          min: 1770,
          max: 1800,
          step: 1,
          tolerance: 0,
          items: [
            { label: "Takes command of the army", value: 1775 },
            { label: "Hands back his commission and goes home", value: 1783 },
            { label: "Steps down after two terms as president", value: 1797 },
          ],
          hint: "The war began in 1775. He resigned when it ended, and he stepped down as president in the late 1790s.",
          mistakes: [
            { match: "Placed resigning in 1776", coach: "1776 was the Declaration of Independence. The war went on for years after that." },
            { match: "Placed stepping down in 1789", coach: "1789 was when he became president. He stepped down eight years later." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Washington was compared to {0}, a Roman farmer who gave up power. A good {1} leaves things better than they found them, and a serving leader asks what the {2} needs.",
          blanks: [{ answers: ["Cincinnatus"] }, { answers: ["steward"] }, { answers: ["team", "group"] }],
          bank: ["Cincinnatus", "steward", "team", "Caesar", "boss", "leader"],
          hint: "Think of the farmer who went back to his plow, the word for someone trusted to take care of things, and who a serving leader thinks about first.",
          mistakes: [
            { match: "Caesar", coach: "Julius Caesar seized power. Washington was compared to the Roman who gave it back." },
            { match: "boss", coach: "A boss for himself uses things. The word you want means someone trusted to take care of them." },
            { match: "leader", coach: "A serving leader thinks about the people they lead first." },
          ],
          seconds: 40,
        },
        {
          type: "sequence",
          prompt: "Put the steps of starting a service project in order.",
          steps: [
            "Notice a need in your community",
            "Ask the people you want to help what would really help",
            "Make a plan with a goal and a date",
            "Do it, and invite others to join you",
          ],
          hint: "You have to see a need before you can ask about it, and plan before you act.",
          mistakes: [
            { match: "Put the plan before asking", coach: "Ask first, so your plan solves the problem people actually have." },
            { match: "Put doing it first", coach: "Jumping in without noticing and planning can miss the real need." },
          ],
          seconds: 35,
        },
        {
          type: "build",
          prompt: "Build the big idea of this lesson.",
          tiles: ["The best leaders", "serve", "the people", "they lead"],
          distractors: ["rule over", "use"],
          hint: "Think about Washington giving power back and the captain helping the new player.",
          mistakes: [
            { match: "Used rule over", coach: "Ruling over people is what Washington refused to do. Serving leaders put others first." },
            { match: "Used use", coach: "Using people for yourself is the opposite of serving them." },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "What did George Washington do on December 23, 1783?",
          choices: [
            "He was elected president",
            "He crossed the Delaware River",
            "He handed back his commission and went home to his farm",
            "He wrote the Constitution by himself",
          ],
          answer: 2,
          why: "Washington gave his power back to Congress at Annapolis instead of keeping it.",
        },
        {
          q: "Who was Cincinnatus?",
          choices: [
            "A Roman farmer who led in a crisis and then gave up his power",
            "A Greek king who ruled for life",
            "An American general in the Revolution",
          ],
          answer: 0,
          why: "According to Livy, Cincinnatus left his plow to lead Rome, then returned to farming.",
        },
        {
          q: "What does a good steward do?",
          choices: [
            "Uses things up quickly",
            "Only cares about what they own",
            "Lets others take care of things",
            "Leaves what was trusted to them better than they found it",
          ],
          answer: 3,
          why: "Stewardship means caring for what was trusted to you and improving it.",
        },
        {
          q: "Which question does a serving leader ask?",
          choices: ["What can my team do for me?", "What does my team need?", "How can I get the most credit?"],
          answer: 1,
          why: "Serving leaders focus on what their team needs.",
        },
        {
          q: "What did Benjamin Franklin help start in Philadelphia?",
          choices: [
            "A lending library and a volunteer fire company",
            "A movie theater and a train station",
            "A football league",
          ],
          answer: 0,
          why: "Franklin helped start a library in 1731 and a volunteer fire company in 1736.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Plan and lead a small service project with your family or friends. Notice a real need nearby, ask the people you want to help what would help most, make a plan with a goal and a date, and do it. Afterward, give a short talk to your family: what was the need, what you did, and what you learned about leading by serving.",
        rubric: [
          "Identifies a real need and asks the people affected what would help",
          "Makes a plan with a clear goal and a date",
          "Carries out the project and invites others to help",
          "Explains in a short talk what they learned about serving others",
        ],
      },
    },
  ],
};
