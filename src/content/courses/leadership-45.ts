import type { Course } from "./types";
import { leadership } from "./leadership";

/**
 * Character Quest: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const leadership45: Course = {
  ...leadership,
  id: "leadership-45",
  band: "sprout",
  title: "Character Quest",
  blurb: "Character for grades 4-5: honesty, responsibility, courage, teamwork and perseverance.",
  lessons: [
    // ------------------------------------------------------------------ Honesty
    {
      id: "leadership-45.honesty",
      title: "Honesty: Telling the Truth",
      minutes: 25,
      stage: "grammar",
      subject: "Other",
      read: [
        "More than two thousand years ago, a storyteller in ancient Greece named Aesop told short stories called fables. Each fable ends with a lesson, called a moral.",
        "In one fable, a shepherd boy was bored watching his sheep. As a joke, he shouted, 'Wolf! Wolf!' The villagers ran up the hill to help him, but there was no wolf. He laughed and played the same trick again. Then one evening a real wolf came. The boy shouted with all his might, but this time nobody came, because nobody believed him. The moral is that people stop believing someone who lies, even when he is telling the truth.",
        "Honesty also made a young man famous in American history. Abraham Lincoln grew up on the frontier and later became the 16th President of the United States. As a young man he worked as a clerk in a small store in New Salem, Illinois. A story told about him says that he once charged a customer a few cents too much. After closing the store, he walked a long way to her house to give the money back. People began calling him Honest Abe, and the nickname stayed with him for life.",
        "Telling the truth is easy when the truth makes you look good. It is hard when you broke something, forgot a chore or did badly on a test. That is exactly when honesty counts most. Honesty also means no half-truths, like saying you cleaned your room when you only pushed everything under the bed.",
        "A good rule is to tell the truth quickly, kindly and completely. Every honest choice builds trust, and trust is what holds friends and families together. Trust is easy to lose and hard to win back.",
      ].join("\n\n"),
      keyIdeas: [
        "Honesty means telling the truth, even when it is hard or makes you look bad.",
        "Lies break trust, and trust is easy to lose and hard to win back.",
        "Tell the truth quickly, kindly and completely, with no half-truths.",
      ],
      hook: {
        text: "A shepherd boy was bored, so he shouted 'Wolf!' just to watch the villagers come running. They came, and he laughed. He did it again, and they came again. Then one evening a real wolf crept out of the woods. The boy shouted louder than ever, but nobody came. Why do you think nobody came?",
      },
      teach: [
        {
          title: "The Boy Who Cried Wolf",
          teach:
            "More than two thousand years ago, a Greek storyteller named Aesop told short stories called fables. Each fable ends with a lesson, called a moral. In this one, a shepherd boy cried 'Wolf!' as a joke, twice. Both times the villagers ran up the hill and found no wolf. When a real wolf came, nobody believed him, and the sheep were lost. The moral: people stop believing someone who lies, even when he tells the truth.",
          visual: {
            type: "flip",
            cards: [
              { front: "Fable", back: "A short story, often with talking animals, that teaches a lesson." },
              { front: "Moral", back: "The lesson at the end of a fable." },
              { front: "Honesty", back: "Telling the truth and not trying to trick people." },
              { front: "Trust", back: "Believing that someone will tell the truth and do what they say." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the story of the boy who cried wolf in order.",
            steps: [
              "The bored shepherd boy shouts 'Wolf!' as a joke",
              "The villagers run up the hill and find no wolf",
              "The boy plays the same trick again",
              "A real wolf comes out of the woods",
              "The boy shouts for help, but nobody believes him",
            ],
            hint: "The joke has to happen before the real wolf shows up. What did the villagers learn from the jokes?",
            mistakes: [
              { match: "Put the real wolf first", coach: "The real wolf comes at the end. The villagers had to be tricked first, or they would have believed him." },
              { match: "Put nobody believes him before the tricks", coach: "Nobody stops believing the boy until after he has lied to them. Which comes first?" },
            ],
            seconds: 35,
          },
          think: {
            q: "Why did nobody come when the real wolf showed up?",
            choices: [
              "The villagers were too far away to hear",
              "The boy had lied before, so they did not believe him",
              "The villagers were afraid of wolves",
              "The boy did not shout loud enough",
            ],
            answer: 1,
            why: "The boy's lies broke the villagers' trust, so they did not believe him even when he told the truth.",
            hints: [
              "They heard him the first two times and came running. Distance was not the problem.",
              "",
              "They were brave enough to run up the hill twice. Something else changed their minds.",
              "He shouted louder than ever. Think about what his earlier jokes taught the villagers.",
            ],
          },
          approaches: {
            analogy:
              "Trust is like a glass of water. Each lie pours a little out. Pour out enough, and when you really need a drink, the glass is empty.",
            example:
              "Mia told her mom twice that she had finished her homework when she had not. The third time, she really had finished, but her mom still asked to see it. Mia's earlier fibs made her mom unsure.",
            simpler: {
              q: "What is the lesson at the end of a fable called?",
              choices: ["A moral", "A chapter", "A title"],
              answer: 0,
              why: "The moral is the lesson a fable teaches.",
              hints: [
                "",
                "A chapter is part of a long book. Fables are short stories with a lesson at the end.",
                "The title is the name of the story, not the lesson it teaches.",
              ],
            },
          },
        },
        {
          title: "Honest Abe",
          teach:
            "Abraham Lincoln grew up on the American frontier and later became the 16th President of the United States. As a young man he worked as a clerk in a small store in New Salem, Illinois. A story told about him says he once charged a customer a few cents too much. After closing the store, he walked a long way to her house to give the money back. People began calling him Honest Abe.",
          visual: {
            type: "timeline",
            events: [
              { year: 1809, label: "Lincoln is born", detail: "Abraham Lincoln is born in a log cabin in Kentucky." },
              { year: 1831, label: "Store clerk in New Salem", detail: "He moves to New Salem, Illinois, and works in a small store. Stories of his honesty spread." },
              { year: 1861, label: "16th President", detail: "Honest Abe becomes the 16th President of the United States." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Young Lincoln worked as a {0} in a small store. When he found he had charged a customer too much, he walked to her house and {1} the money. People called him {2} Abe.",
            blanks: [
              { answers: ["clerk"] },
              { answers: ["returned", "gave back"] },
              { answers: ["Honest"] },
            ],
            bank: ["clerk", "returned", "Honest", "kept", "Clever", "farmer"],
            hint: "Think about what job he had in the store and what he did with the extra money.",
            mistakes: [
              { match: "kept", coach: "Keeping the money would have been easy, since nobody knew. What did Lincoln do instead?" },
              { match: "Clever", coach: "Lincoln was clever, but his nickname came from the way he gave the money back." },
              { match: "farmer", coach: "Lincoln did farm work as a boy, but in New Salem he worked behind the counter of a store." },
            ],
            seconds: 35,
          },
          think: {
            q: "Nobody knew Lincoln had charged too much. Why did he still return the money?",
            choices: [
              "He wanted to be paid for the walk",
              "His boss made him do it",
              "Being honest mattered to him even when no one would find out",
            ],
            answer: 2,
            why: "Lincoln did the honest thing when nobody was watching, which shows real honesty.",
            hints: [
              "He did not ask for anything in return. He only gave back what was not his.",
              "The story says he decided on his own, after the store was closed.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Honesty when nobody is watching is like a tree's roots. You cannot see them, but they are what keep the tree standing tall.",
            example:
              "At a bake sale, Leo gave a customer change for a ten when she had paid with a five. Later he noticed she had five dollars too many. He told his mom, and they called the customer to sort it out. That is the Honest Abe way.",
            simpler: {
              q: "Lincoln walked a long way to give back a few cents. What was he being?",
              choices: ["Lazy", "Honest", "Silly"],
              answer: 1,
              why: "Returning money that is not yours, even a little, is honesty.",
              hints: [
                "A lazy person would not walk a long way after work. Lincoln worked extra to do the right thing.",
                "",
                "It may seem like a lot of effort for a few cents, but he was keeping his word fair and true.",
              ],
            },
          },
        },
        {
          title: "Honest When It Is Hard",
          teach:
            "Telling the truth is easy when the truth makes you look good. It is hard when you broke something, forgot a chore or did badly on a test. That is when honesty counts most. Honesty also means no half-truths, like saying you cleaned your room when you only pushed everything under the bed. A good rule: tell the truth quickly, kindly and completely. Every honest choice builds trust, and trust holds friends and families together.",
          visual: {
            type: "compare",
            left: {
              title: "Honest",
              points: [
                "Tells the whole truth",
                "Owns up quickly",
                "Says it kindly",
                "Builds trust",
              ],
            },
            right: {
              title: "Not honest",
              points: [
                "Hides part of the truth",
                "Waits and hopes nobody notices",
                "Blames someone else",
                "Breaks trust",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each choice: is it honest, or not honest?",
            buckets: ["Honest", "Not honest"],
            items: [
              { text: "Telling Dad you broke the lamp before he finds it", bucket: 0 },
              { text: "Saying your room is clean when the mess is under the bed", bucket: 1 },
              { text: "Telling a friend you lost the book she lent you", bucket: 0 },
              { text: "Blaming the dog for the cookies you ate", bucket: 1 },
              { text: "Telling your teacher you forgot your homework, not that the dog ate it", bucket: 0 },
              { text: "Saying you practiced piano when you played a game instead", bucket: 1 },
            ],
            hint: "Ask yourself: does this person tell the whole truth, or try to hide or twist it?",
            mistakes: [
              { match: "Room is clean sorted as honest", coach: "The room looks clean, but the mess is hidden. A half-truth is still trying to trick someone." },
              { match: "Forgot homework sorted as not honest", coach: "Forgetting homework is a mistake, but telling the teacher the real reason is honest." },
            ],
            seconds: 45,
          },
          think: {
            q: "Sam spilled paint on the rug. Which choice is the most honest?",
            choices: [
              "Put a chair over the stain so nobody sees",
              "Say his little sister did it",
              "Wait to see if anyone notices",
              "Tell his mom right away and help clean it",
            ],
            answer: 3,
            why: "Telling the truth quickly and helping fix it is honest and builds trust.",
            hints: [
              "Hiding the stain is a way of tricking people, even without saying a word.",
              "Blaming someone else adds a second wrong on top of the first.",
              "Waiting and hoping is a way of hiding. Honesty speaks up quickly.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A half-truth is like a pie with a missing slice hidden underneath. It looks whole, but it is not. Honesty serves the whole pie.",
            example:
              "Ava got a D on a spelling test. She wanted to say nothing. Instead, she showed her dad that evening and said, 'I did not study enough. Can you quiz me this week?' Her dad thanked her for telling him, and they made a plan.",
            simpler: {
              q: "Is saying 'I cleaned my room' when you only hid the mess an honest answer?",
              choices: ["Yes, the room looks clean", "No, it is a half-truth that tricks people"],
              answer: 1,
              why: "A half-truth tries to make someone believe something that is not really true.",
              hints: [
                "It may look clean, but you know the mess is still there. That is a trick.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: good choice or poor choice?",
        buckets: ["Good choice", "Poor choice"],
        items: [
          { text: "Telling the coach you missed practice because you forgot", bucket: 0 },
          { text: "Pretending to be sick to skip a chore", bucket: 1 },
          { text: "Giving back extra change the cashier gave you by mistake", bucket: 0 },
          { text: "Copying a friend's answers and saying they are yours", bucket: 1 },
          { text: "Telling your brother you broke his toy and offering to fix it", bucket: 0 },
          { text: "Saying 'I didn't do it' when you did", bucket: 1 },
          { text: "Telling Grandma kindly that you do not like peas, but trying a bite", bucket: 0 },
          { text: "Crying 'Help!' as a joke to see if someone comes", bucket: 1 },
        ],
      },
      explain: {
        prompt: "In your own words, what does the boy who cried wolf teach us, and why is Lincoln remembered as Honest Abe?",
        keyPoints: [
          "Lies break trust, so people stop believing a liar",
          "Trust is easy to lose and hard to win back",
          "Lincoln returned money even though nobody knew",
          "Honesty matters most when the truth is hard to tell",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each story or idea to what it teaches.",
          pairs: [
            { left: "The boy who cried wolf", right: "Liars are not believed, even when they tell the truth" },
            { left: "Honest Abe returns the extra cents", right: "Be honest even when nobody would find out" },
            { left: "Hiding a mess under the bed", right: "A half-truth is still a trick" },
            { left: "Telling Dad you broke the lamp", right: "Telling the truth quickly builds trust" },
          ],
          hint: "Think about the lesson in each story. Who was tricked, and who did the right thing?",
          mistakes: [
            { match: "Matched Honest Abe to half-truth", coach: "Lincoln told no half-truth at all. He gave back the money even though no one knew." },
            { match: "Matched the wolf story to building trust", coach: "The boy broke trust. His story shows what happens after lies." },
          ],
          seconds: 50,
        },
        {
          type: "build",
          prompt: "Build the big lesson about trust.",
          tiles: ["Trust", "is easy", "to lose", "and hard", "to win back"],
          distractors: ["is easy to win back", "does not matter"],
          hint: "Think of the boy who cried wolf. Was it easy for him to get the villagers to believe him again?",
          mistakes: [
            { match: "Used is easy to win back", coach: "The villagers never believed the boy again. Trust is not easy to win back." },
            { match: "Used does not matter", coach: "Trust mattered a lot: without it, nobody came to save the sheep." },
          ],
          seconds: 30,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence where someone tells the truth even though it is hard.",
          sentences: [
            "Noah told his teacher he had not read the chapter yet.",
            "Lily said the broken vase was already cracked, but it was not.",
            "Ben told his friend he had lost the video game she lent him.",
            "Zoe blamed her little brother for the mud on the carpet.",
            "Eli told his mom he had spent his lunch money on candy.",
          ],
          correct: [0, 2, 4],
          hint: "Look for people who admit something that might get them in trouble.",
          mistakes: [
            { match: "Tapped the cracked vase", coach: "Lily made up a story to avoid blame. That is not telling the truth." },
            { match: "Tapped blaming the brother", coach: "Blaming someone else is the opposite of honesty." },
          ],
          seconds: 40,
        },
        {
          type: "place",
          prompt: "Place two moments from Abraham Lincoln's life on the timeline.",
          min: 1800,
          max: 1870,
          step: 1,
          tolerance: 3,
          items: [
            { label: "Lincoln is born", value: 1809 },
            { label: "Lincoln becomes the 16th President", value: 1861 },
          ],
          hint: "He was born early in the 1800s and became President about fifty years later.",
          mistakes: [
            { match: "Placed his birth after 1850", coach: "Lincoln was born early in the century, in 1809. He was already grown by 1850." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What is a fable?",
          choices: [
            "A short story that teaches a lesson",
            "A true news report",
            "A long book about history",
          ],
          answer: 0,
          why: "Fables, like Aesop's, are short stories that end with a lesson called a moral.",
        },
        {
          q: "Why was Abraham Lincoln called Honest Abe?",
          choices: [
            "He never made any mistakes",
            "He walked a long way to return money he had charged by mistake",
            "He won a prize for honesty",
            "He was the tallest man in town",
          ],
          answer: 1,
          why: "Stories like returning a customer's money earned him the nickname Honest Abe.",
        },
        {
          q: "Which of these is a half-truth?",
          choices: [
            "I forgot to feed the dog",
            "I broke the window",
            "I cleaned my room, when you only hid the mess",
          ],
          answer: 2,
          why: "A half-truth makes someone believe something false, even if some words are true.",
        },
        {
          q: "When does honesty count the most?",
          choices: [
            "When the truth makes you look good",
            "Only when an adult is watching",
            "Only on big important days",
            "When the truth is hard to tell",
          ],
          answer: 3,
          why: "It is easy to tell the truth when it helps you. Honesty is tested when the truth is hard.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Field mission: tell the story of the boy who cried wolf to someone in your family, in your own words, and say what it teaches. Then, for one day, practice the honesty rule: tell the truth quickly, kindly and completely. At dinner, share one moment when telling the truth was a little hard.",
        rubric: [
          "Retells the fable in the right order",
          "Explains the moral: lies break trust",
          "Shares a real moment of telling the truth from the day",
          "Speaks clearly and kindly",
        ],
      },
    },

    // ------------------------------------------------------------------ Responsibility
    {
      id: "leadership-45.responsibility",
      title: "Responsibility: Doing Your Part",
      minutes: 25,
      stage: "logic",
      subject: "Other",
      read: [
        "An old folk tale tells of the Little Red Hen. She found some grains of wheat and asked her friends, the dog, the cat and the duck, to help her plant them. 'Not I,' said each one. They would not help her water the wheat, cut it, take it to the mill or bake the bread. So the hen did every job herself. When the warm bread came out of the oven, everyone wanted a slice. The hen said that those who would not help with the work would not share the bread.",
        "Responsibility means doing your part. At home that might mean making your bed, feeding the pet or clearing the table. At school it means doing your homework and bringing your supplies. With friends it means keeping your promises. A responsible person does the job without being reminded, and does the boring parts too, not just the fun ones.",
        "Responsibility also means owning your mistakes. Everyone makes mistakes. A responsible person does three things. First, own it: say what happened. Second, say sorry. Third, fix it as well as you can. Blaming someone else or hiding the problem only makes things worse.",
        "Harry Truman, the 33rd President of the United States, kept a small sign on his desk that said 'The Buck Stops Here.' In an old card game, a marker called the buck was passed from player to player. Passing the buck came to mean pushing a job or the blame onto someone else. Truman's sign meant he would not do that. When something was his job, he took care of it.",
        "You can have a buck-stops-here attitude too. When something is your job, do it. When something is your fault, own it.",
      ].join("\n\n"),
      keyIdeas: [
        "Responsibility means doing your part, including the boring jobs, without being reminded.",
        "When you make a mistake: own it, say sorry and fix it.",
        "Passing the buck means pushing blame onto others. The buck stops with a responsible person.",
      ],
      hook: {
        text: "The Little Red Hen found some grains of wheat. 'Who will help me plant it?' she asked. 'Not I,' said the dog, the cat and the duck. Nobody helped her water it, cut it or bake it. But when the warm bread came out of the oven, everyone wanted a slice. What would you say if you were the hen?",
      },
      teach: [
        {
          title: "The Little Red Hen",
          teach:
            "In this old folk tale, the Little Red Hen asked her friends to help turn wheat into bread. The dog, the cat and the duck all said, 'Not I.' So the hen planted the wheat, watered it, cut it, took it to the mill to be ground into flour and baked the bread by herself. When the bread was ready, everyone wanted some. The hen said those who did not help would not share. Responsibility means doing your part of the work, not just enjoying the reward.",
          visual: {
            type: "hotspots",
            title: "Where You Have Responsibilities",
            center: "Me",
            spots: [
              { label: "Home", icon: "🏠", detail: "Make your bed, feed the pet, clear the table, help without being asked." },
              { label: "School", icon: "📚", detail: "Do your homework, bring your supplies, listen and try your best." },
              { label: "Friends", icon: "🤝", detail: "Keep your promises and return what you borrow." },
              { label: "Myself", icon: "🪥", detail: "Brush your teeth, get enough sleep and take care of your things." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the Little Red Hen's jobs in order, from wheat to bread.",
            steps: [
              "Plant the grains of wheat",
              "Water the wheat as it grows",
              "Cut the ripe wheat",
              "Take it to the mill to grind into flour",
              "Bake the bread",
            ],
            hint: "Think about how bread is made: the wheat has to grow before you can cut it, and you need flour before you bake.",
            mistakes: [
              { match: "Baked before grinding", coach: "You cannot bake bread without flour. The wheat has to go to the mill first." },
              { match: "Cut before watering", coach: "The wheat has to grow before it can be cut. Watering helps it grow." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why did the hen say the others could not share the bread?",
            choices: [
              "She did not like the dog, the cat and the duck",
              "They did not do any part of the work",
              "There was not enough bread for anyone",
              "They were not hungry",
            ],
            answer: 1,
            why: "The others wanted the reward without doing any of the work. They did not do their part.",
            hints: [
              "She asked them to help many times, so she wanted them to join in. The problem was their answer.",
              "",
              "The story says everyone wanted a slice. The question is who earned it.",
              "They all wanted a slice, so they were hungry. Think about who did the work.",
            ],
          },
          approaches: {
            analogy:
              "A family is like a boat with several people rowing. If one person stops rowing and just enjoys the ride, the others have to work harder to get everyone home.",
            example:
              "Every night after dinner, Jake's family cleans up together. Jake's job is to clear the plates. When he does it without being asked, the kitchen is clean in ten minutes and everyone has time for a game.",
            simpler: {
              q: "Who did all the work in the story?",
              choices: ["The dog", "The Little Red Hen", "The duck"],
              answer: 1,
              why: "The hen did every job herself because nobody would help.",
              hints: [
                "The dog said 'Not I' every time she asked for help.",
                "",
                "The duck said 'Not I' too. Who was left to do the jobs?",
              ],
            },
          },
        },
        {
          title: "Owning Your Mistakes",
          teach:
            "Everyone makes mistakes, even grown-ups. What matters is what you do next. A responsible person follows three steps. First, own it: say what happened, like 'I spilled the juice.' Second, say sorry. Third, fix it as well as you can, like wiping up the juice. The opposite is blaming someone else or hiding the problem. That only makes things worse, because now there are two problems: the mistake and the cover-up.",
          visual: {
            type: "compare",
            left: {
              title: "Owning it",
              points: [
                "Says what happened",
                "Says sorry",
                "Helps fix it",
                "Learns for next time",
              ],
            },
            right: {
              title: "Passing the blame",
              points: [
                "Hides the problem",
                "Blames someone else",
                "Makes excuses",
                "Turns one problem into two",
              ],
            },
          },
          probe: {
            type: "build",
            prompt: "You knocked over your sister's block tower. Build a responsible answer.",
            tiles: ["I knocked over your tower.", "I'm sorry.", "Let me help you build it again."],
            distractors: ["It was already falling.", "The cat did it."],
            hint: "Use the three steps: own it, say sorry, fix it.",
            mistakes: [
              { match: "Used it was already falling", coach: "That is an excuse. A responsible answer says what you really did." },
              { match: "Used the cat did it", coach: "Blaming the cat turns one problem into two. Own it instead." },
            ],
            seconds: 30,
          },
          think: {
            q: "What are the three steps for owning a mistake?",
            choices: [
              "Hide it, wait, hope",
              "Own it, say sorry, fix it",
              "Blame, cry, forget",
              "Say sorry, then do it again",
            ],
            answer: 1,
            why: "Owning it, saying sorry and fixing it is how a responsible person handles mistakes.",
            hints: [
              "Hiding and hoping is the opposite of owning a mistake. It usually makes things worse.",
              "",
              "Blaming others adds a new problem on top of the first one.",
              "Saying sorry is good, but you also need to fix it and try not to repeat it.",
            ],
          },
          approaches: {
            analogy:
              "A mistake is like a small spill. Wipe it up right away and it is gone. Hide it under a rug and it gets sticky, smelly and much harder to clean.",
            example:
              "Ella forgot to close the gate, and the dog got out. She told her dad right away, said she was sorry and helped search the street. They found the dog quickly. Now Ella checks the gate every time.",
            simpler: {
              q: "You broke a cup. What is the first step?",
              choices: ["Hide the pieces", "Say 'I broke the cup'", "Say your brother did it"],
              answer: 1,
              why: "The first step is to own it: say what happened.",
              hints: [
                "Hiding the pieces is a cover-up. Now there are two problems.",
                "",
                "Blaming your brother is unfair and not true.",
              ],
            },
          },
        },
        {
          title: "The Buck Stops Here",
          teach:
            "Harry Truman, the 33rd President of the United States, kept a small sign on his desk that said 'The Buck Stops Here.' In an old card game, a marker called the buck was passed from player to player. Passing the buck came to mean pushing a job or the blame onto someone else. Truman's sign meant he would not do that. You can have a buck-stops-here attitude too: when something is your job, do it, and when something is your fault, own it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Responsibility", back: "Doing your part and owning your mistakes." },
              { front: "Passing the buck", back: "Pushing your job or the blame onto someone else." },
              { front: "The buck stops here", back: "Saying: this is my job, and I will take care of it." },
              { front: "Excuse", back: "A reason you give so you do not have to take the blame." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Does each kid pass the buck, or does the buck stop with them?",
            buckets: ["The buck stops here", "Passing the buck"],
            items: [
              { text: "Feeding the fish because it is your week, even though you are tired", bucket: 0 },
              { text: "Saying 'That's not my job' when Mom asks for help", bucket: 1 },
              { text: "Telling the teacher your group's poster is late because of you", bucket: 0 },
              { text: "Blaming your friend when you both lost the ball", bucket: 1 },
              { text: "Finishing your part of the group project on time", bucket: 0 },
              { text: "Leaving your dishes for your sister to wash", bucket: 1 },
            ],
            hint: "Ask: does this kid take care of the job or the blame, or push it onto someone else?",
            mistakes: [
              { match: "Fish feeding sorted as passing the buck", coach: "It is your week, and you do it even when tired. The job stops with you." },
              { match: "Leaving dishes sorted as buck stops here", coach: "Leaving your dishes pushes your job onto your sister. That is passing the buck." },
            ],
            seconds: 45,
          },
          think: {
            q: "What did Truman's sign 'The Buck Stops Here' mean?",
            choices: [
              "He liked to play cards",
              "He would not push his job or the blame onto others",
              "Deer were not allowed in his office",
            ],
            answer: 1,
            why: "Passing the buck means pushing blame onto others. Truman said the buck stopped with him.",
            hints: [
              "The saying comes from a card game, but the sign was about doing his job.",
              "",
              "A buck can be a deer, but here it was a marker in a card game.",
            ],
          },
          approaches: {
            analogy:
              "Passing the buck is like a game of hot potato: everyone tosses the problem away as fast as they can. A responsible person catches it and deals with it.",
            example:
              "The class hamster's water bottle was empty. Three kids walked past and said, 'Someone should fill that.' Owen said, 'I'll do it,' and filled it. The buck stopped with Owen.",
            simpler: {
              q: "Saying 'That's not my job' when you could help is an example of what?",
              choices: ["Passing the buck", "Being responsible", "Being brave"],
              answer: 0,
              why: "Pushing a job onto someone else is called passing the buck.",
              hints: [
                "",
                "A responsible person helps out instead of saying it is someone else's job.",
                "Nothing scary is happening here. This is about doing a job or pushing it away.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: good choice or poor choice?",
        buckets: ["Good choice", "Poor choice"],
        items: [
          { text: "Making your bed before breakfast without being asked", bucket: 0 },
          { text: "Leaving your bike out in the rain again", bucket: 1 },
          { text: "Telling Mom you forgot to feed the cat, then feeding it", bucket: 0 },
          { text: "Saying 'Not I' when your family is cleaning the garage", bucket: 1 },
          { text: "Packing your backpack the night before school", bucket: 0 },
          { text: "Blaming your brother for the toys you left on the stairs", bucket: 1 },
          { text: "Returning your friend's game when you said you would", bucket: 0 },
          { text: "Hiding the plate you chipped in the back of the cupboard", bucket: 1 },
        ],
      },
      explain: {
        prompt: "In your own words, what does it mean to be responsible? Use the Little Red Hen or Truman's sign in your answer.",
        keyPoints: [
          "Responsibility means doing your part of the work",
          "Doing your job without being reminded, even the boring parts",
          "Owning a mistake: say what happened, say sorry, fix it",
          "Not passing the buck or blaming others",
        ],
      },
      mastery: [
        {
          type: "cloze",
          text: "When you make a mistake, first {0} it, then say {1}, then {2} it. Pushing the blame onto someone else is called passing the {3}.",
          blanks: [
            { answers: ["own"] },
            { answers: ["sorry"] },
            { answers: ["fix"] },
            { answers: ["buck"] },
          ],
          bank: ["own", "sorry", "fix", "buck", "hide", "ball", "forget"],
          hint: "Remember the three steps for mistakes, and the word on Truman's sign.",
          mistakes: [
            { match: "hide", coach: "Hiding a mistake turns one problem into two. The first step is the opposite." },
            { match: "ball", coach: "The saying comes from a card game marker called the buck." },
            { match: "forget", coach: "Forgetting about it does not help anyone. What do you do to make it right?" },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each place to a responsible choice you could make there.",
          pairs: [
            { left: "Home", right: "Clearing the table after dinner" },
            { left: "School", right: "Turning in your homework on time" },
            { left: "Friends", right: "Keeping a promise to meet at the park" },
            { left: "Pets", right: "Filling the dog's water bowl" },
          ],
          hint: "Think about who or what each responsible choice helps.",
          mistakes: [
            { match: "Matched homework to home", coach: "You might do homework at home, but you turn it in at school." },
          ],
          seconds: 40,
        },
        {
          type: "sequence",
          prompt: "Oops! You left the freezer door open and the ice cream melted. Put the responsible steps in order.",
          steps: [
            "Tell your parent, 'I left the freezer open'",
            "Say you are sorry",
            "Help clean up the melted ice cream",
            "Check the freezer door every time from now on",
          ],
          hint: "Own it, say sorry, fix it, then learn for next time.",
          mistakes: [
            { match: "Cleaned before telling", coach: "Cleaning up is great, but owning it comes first so nobody is confused." },
          ],
          seconds: 35,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that shows a kid doing their part.",
          sentences: [
            "Maya walked the dog because it was her turn, even though it was cold.",
            "Leo watched TV while his family raked the leaves.",
            "Sara finished her part of the class poster a day early.",
            "Tom said the broken window was not his fault, but it was.",
            "Ivy put her clean clothes away without being reminded.",
          ],
          correct: [0, 2, 4],
          hint: "Look for kids who do their job, even when it is not fun.",
          mistakes: [
            { match: "Tapped Leo watching TV", coach: "Leo said 'Not I,' just like the animals in the story." },
            { match: "Tapped Tom and the window", coach: "Tom passed the buck instead of owning his mistake." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What lesson does the Little Red Hen teach?",
          choices: [
            "Bread is hard to make",
            "Hens are better bakers than dogs",
            "Those who share the work should share the reward",
            "Always eat bread while it is warm",
          ],
          answer: 2,
          why: "The others wanted the bread but would not do their part of the work.",
        },
        {
          q: "What does passing the buck mean?",
          choices: [
            "Pushing a job or the blame onto someone else",
            "Giving someone a dollar",
            "Winning a card game",
          ],
          answer: 0,
          why: "Passing the buck means not taking responsibility and pushing it onto others.",
        },
        {
          q: "You forgot to water the plants and they wilted. What is the responsible thing to do?",
          choices: [
            "Say the plants were already sick",
            "Wait and hope nobody notices",
            "Say your sister was supposed to do it",
            "Tell your parent, say sorry and water them right away",
          ],
          answer: 3,
          why: "Own it, say sorry and fix it as well as you can.",
        },
        {
          q: "Who kept a sign on his desk that said 'The Buck Stops Here'?",
          choices: ["Aesop", "Harry Truman", "The Little Red Hen"],
          answer: 1,
          why: "Harry Truman, the 33rd President, kept the sign to show he took responsibility.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: be the Little Red Hen for one week. Choose one job at home that helps your whole family, like setting the table, feeding a pet or folding laundry. Do it every day without being reminded. Keep a checklist, and at the end of the week show a parent your checklist.",
        rubric: [
          "Picks a real job that helps the family",
          "Does the job every day for a week",
          "Does it without being reminded",
          "Keeps an honest checklist and shows it to a parent",
        ],
      },
    },

    // ------------------------------------------------------------------ Courage
    {
      id: "leadership-45.courage",
      title: "Courage: Brave When It Counts",
      minutes: 25,
      stage: "logic",
      subject: "Other",
      read: [
        "Courage does not mean you never feel afraid. Courage means doing what is right even when you are scared. A firefighter feels fear too, but goes into the smoke to help someone. That is real courage.",
        "Courage is different from showing off. Jumping off a high wall because friends dared you is not brave. It is reckless, which means taking a foolish risk for no good reason. Real courage has a good reason behind it, like helping someone or doing the right thing.",
        "In 1838, a steamship called the Forfarshire hit rocks in a storm off the coast of England. Grace Darling, the 22-year-old daughter of a lighthouse keeper, looked out at dawn and saw survivors clinging to a rock. The waves were huge. Grace and her father rowed their small boat out through the storm and rescued nine people. Grace became famous across Britain for her bravery, and people still tell her story today.",
        "Courage is not only for big rescues. Most courage is everyday courage. It takes courage to tell the truth when you might get in trouble, to try something new when you might fail, to say no when friends want to do something wrong, and to sit with a kid who is sitting alone.",
        "Aesop told a fable about mice who were afraid of a cat. One mouse said, 'Let's tie a bell on the cat so we can hear it coming!' Everyone cheered. Then an old mouse asked, 'But who will bell the cat?' Nobody answered. The moral is that it is easy to talk about brave things, but much harder to do them. Courage is in the doing.",
      ].join("\n\n"),
      keyIdeas: [
        "Courage means doing what is right even when you feel afraid.",
        "Taking foolish risks to show off is reckless, not brave.",
        "Everyday courage looks like telling the truth, trying new things and standing up for what is right.",
      ],
      hook: {
        text: "On a stormy night in 1838, a steamship hit rocks near a lighthouse off the coast of England. At dawn, Grace Darling, the lighthouse keeper's daughter, looked out and saw people clinging to a rock. The waves were huge and the wind was howling. Would you row out into that storm?",
      },
      teach: [
        {
          title: "What Courage Really Is",
          teach:
            "Courage does not mean you never feel afraid. Courage means doing what is right even when you are scared. A firefighter feels fear too, but goes into the smoke to help someone. Courage is different from showing off. Jumping off a high wall because friends dared you is not brave. It is reckless, which means taking a foolish risk for no good reason. Real courage always has a good reason behind it.",
          visual: {
            type: "compare",
            left: {
              title: "Courage",
              points: [
                "Feels fear but does what is right",
                "Has a good reason",
                "Thinks first",
                "Example: telling the truth when you might get in trouble",
              ],
            },
            right: {
              title: "Reckless",
              points: [
                "Takes foolish risks",
                "Wants to show off",
                "Does not think first",
                "Example: climbing on the roof because of a dare",
              ],
            },
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that shows real courage, not showing off.",
            sentences: [
              "Owen was nervous, but he told the coach he had broken the team's water jug.",
              "Ella rode her scooter down the steep hill with no helmet because of a dare.",
              "Sam was scared of the dark basement but went down to help Grandpa find the flashlight.",
              "Mia said she is never scared of anything.",
              "Kai was shy, but he raised his hand to answer in class.",
            ],
            correct: [0, 2, 4],
            hint: "Look for someone who feels afraid and still does something good.",
            mistakes: [
              { match: "Tapped the scooter dare", coach: "A dangerous stunt for a dare is reckless. There is no good reason behind it." },
              { match: "Tapped Mia never scared", coach: "Courage is not about never feeling scared. Mia has not done anything brave yet." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which one is real courage?",
            choices: [
              "Never feeling scared of anything",
              "Doing a risky stunt to get your friends to cheer",
              "Feeling scared but doing the right thing anyway",
            ],
            answer: 2,
            why: "Courage is doing what is right even when you are afraid.",
            hints: [
              "Many people think brave people feel no fear, but even heroes feel afraid.",
              "A stunt for cheers is reckless. Real courage has a good reason.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Fear is like a loud dog barking at you. Courage does not mean the dog stops barking. It means you keep walking toward what is right while it barks.",
            example:
              "Lucy was afraid of the deep end at swim lessons. Her teacher was right there. Lucy's knees shook, but she jumped in and swam to the side. She was scared, and she did it anyway. That is courage.",
            simpler: {
              q: "Do brave people ever feel afraid?",
              choices: ["Yes, but they do what is right anyway", "No, brave people never feel afraid"],
              answer: 0,
              why: "Everyone feels fear. Brave people act rightly anyway.",
              hints: [
                "",
                "Even firefighters feel fear. Courage is what they do with it.",
              ],
            },
          },
        },
        {
          title: "Grace Darling's Rescue",
          teach:
            "In 1838, a steamship called the Forfarshire hit rocks in a storm off the coast of England. Grace Darling, the 22-year-old daughter of a lighthouse keeper, looked out at dawn and saw survivors clinging to a rock. The waves were huge. Grace and her father rowed their small boat out through the storm and rescued nine people. Grace was scared, but people needed help, so she went. She became famous across Britain for her bravery.",
          visual: {
            type: "hotspots",
            title: "The Rescue",
            center: "Grace Darling, 1838",
            spots: [
              { label: "The storm", icon: "🌊", detail: "Huge waves and strong wind made the sea very dangerous." },
              { label: "The lighthouse", icon: "🗼", detail: "Grace lived in a lighthouse with her family. Her father was the keeper." },
              { label: "The rowboat", icon: "🚣", detail: "Grace and her father rowed a small wooden boat out to the rocks." },
              { label: "The survivors", icon: "🛟", detail: "Nine people were rescued from the rock and brought to safety." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put Grace Darling's story in order.",
            steps: [
              "A steamship hits rocks in a storm",
              "At dawn, Grace sees survivors on a rock",
              "Grace and her father row out through the waves",
              "They rescue nine people",
              "Grace becomes famous for her bravery",
            ],
            hint: "Start with the shipwreck and end with what people said about Grace afterward.",
            mistakes: [
              { match: "Rowed out before seeing the survivors", coach: "Grace had to see the people on the rock before she knew to row out." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why was Grace Darling's rescue real courage, not recklessness?",
            choices: [
              "She wanted to become famous",
              "She did not know there was a storm",
              "She was afraid of nothing",
              "She faced a dangerous storm to save people's lives",
            ],
            answer: 3,
            why: "She faced real danger for a good reason: to save people who needed help.",
            hints: [
              "She became famous later, but she rowed out to save lives, not for fame.",
              "She could see the huge waves. She knew the danger and went anyway.",
              "The waves were frightening. Courage is acting even when afraid.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A lighthouse helps ships in the dark by shining when it is stormy. Grace was like her own lighthouse: she was brightest when things were worst.",
            example:
              "Grace could have stayed inside where it was safe. Instead she thought: people are on that rock, and they will not last long. She and her father made a plan, took the boat and rowed carefully. Courage plus a plan saved nine lives.",
            simpler: {
              q: "What did Grace Darling do?",
              choices: ["Rowed out in a storm to rescue people", "Built a lighthouse", "Sailed a steamship"],
              answer: 0,
              why: "Grace and her father rowed out in a storm and rescued nine people.",
              hints: [
                "",
                "She lived in a lighthouse, but she did not build it. What did she do in the storm?",
                "The steamship hit the rocks. Grace was the one who came to help.",
              ],
            },
          },
        },
        {
          title: "Who Will Bell the Cat?",
          teach:
            "Aesop told a fable about mice who were afraid of a cat. One mouse said, 'Let's tie a bell on the cat so we can hear it coming!' Everyone cheered. Then an old mouse asked, 'But who will bell the cat?' Nobody answered. It is easy to talk about brave things, but harder to do them. Most courage is everyday courage: telling the truth, trying something new, and sitting with a kid who is alone.",
          visual: {
            type: "flip",
            cards: [
              { front: "Courage", back: "Doing what is right even when you are afraid." },
              { front: "Reckless", back: "Taking a foolish risk for no good reason." },
              { front: "Everyday courage", back: "Small brave acts, like telling the truth or trying something new." },
              { front: "Belling the cat", back: "A brave job that everyone agrees on but nobody wants to do." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Is each choice everyday courage, or not courage?",
            buckets: ["Everyday courage", "Not courage"],
            items: [
              { text: "Trying out for the play even though you might not get a part", bucket: 0 },
              { text: "Saying 'Someone should help' and then walking away", bucket: 1 },
              { text: "Sitting with a new kid who is eating lunch alone", bucket: 0 },
              { text: "Jumping off the shed roof because a friend dared you", bucket: 1 },
              { text: "Saying no when friends want to sneak cookies", bucket: 0 },
              { text: "Hiding a bad grade so you do not have to talk about it", bucket: 1 },
            ],
            hint: "Everyday courage means doing something right that feels a little scary. Talking without doing, showing off and hiding do not count.",
            mistakes: [
              { match: "Someone should help sorted as courage", coach: "That is like the mice who cheered but would not bell the cat. Courage is in the doing." },
              { match: "Shed roof sorted as courage", coach: "A dare with no good reason is reckless, not brave." },
            ],
            seconds: 45,
          },
          think: {
            q: "What is the moral of 'Who will bell the cat?'",
            choices: [
              "Cats do not like bells",
              "It is easy to talk about brave things but harder to do them",
              "Mice should always run away",
              "Old mice are the smartest",
            ],
            answer: 1,
            why: "Everyone liked the brave idea, but nobody would do it. Courage is in the doing.",
            hints: [
              "The fable is not really about cats. Think about why nobody answered the old mouse.",
              "",
              "Running away is not the lesson. The mice had a plan but nobody would carry it out.",
              "The old mouse asked a wise question, but the lesson is about doing brave things.",
            ],
          },
          approaches: {
            analogy:
              "Talking about courage without doing it is like reading a recipe and never baking. The plan is nice, but nobody gets any cake.",
            example:
              "At recess, a group of kids said, 'Somebody should ask the new girl to play.' Nobody moved. Then Ben walked over and asked her. He was nervous, but he belled the cat.",
            simpler: {
              q: "Which is everyday courage?",
              choices: ["Telling the truth when you might get in trouble", "Watching TV", "Eating your lunch"],
              answer: 0,
              why: "Telling the truth when it is scary is a brave everyday choice.",
              hints: [
                "",
                "Watching TV is not scary or hard. Courage means doing something right that feels scary.",
                "Eating lunch is normal and easy. Which choice takes some bravery?",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: good choice or poor choice?",
        buckets: ["Good choice", "Poor choice"],
        items: [
          { text: "Telling your parents you broke the neighbor's window", bucket: 0 },
          { text: "Climbing a tall tree with no one around to show off", bucket: 1 },
          { text: "Asking for help when you do not understand a math problem", bucket: 0 },
          { text: "Laughing along when friends tease a younger kid", bucket: 1 },
          { text: "Trying a new sport even though you might not be good at first", bucket: 0 },
          { text: "Saying 'Someone should do it' and doing nothing", bucket: 1 },
          { text: "Telling a friend kindly to stop being mean to your sister", bucket: 0 },
          { text: "Riding your bike in the street without a helmet on a dare", bucket: 1 },
        ],
      },
      explain: {
        prompt: "In your own words, what is courage? How is it different from being reckless? Use Grace Darling or the mice and the cat in your answer.",
        keyPoints: [
          "Courage means doing what is right even when afraid",
          "Brave people still feel fear",
          "Reckless means a foolish risk for no good reason",
          "Courage is in the doing, not just the talking",
        ],
      },
      mastery: [
        {
          type: "cloze",
          text: "Courage does not mean you never feel {0}. Taking a foolish risk to show off is called being {1}. In Aesop's fable, nobody would bell the {2}.",
          blanks: [
            { answers: ["afraid", "scared", "fear"] },
            { answers: ["reckless"] },
            { answers: ["cat"] },
          ],
          bank: ["afraid", "reckless", "cat", "happy", "careful", "dog"],
          hint: "Think about what brave people still feel, the word for foolish risks, and the animal the mice feared.",
          mistakes: [
            { match: "careful", coach: "Being careful is wise. The word you want means taking a foolish risk." },
            { match: "dog", coach: "The mice were afraid of a different animal." },
          ],
          seconds: 40,
        },
        {
          type: "place",
          prompt: "Place the year of Grace Darling's rescue on the timeline.",
          min: 1800,
          max: 1900,
          step: 1,
          tolerance: 3,
          items: [{ label: "Grace Darling rows out to rescue survivors", value: 1838 }],
          hint: "It happened in the 1830s, a little before the middle of the 1800s.",
          mistakes: [
            { match: "Placed after 1850", coach: "The rescue was earlier, in the 1830s." },
          ],
          seconds: 25,
        },
        {
          type: "match",
          prompt: "Match each brave act to the kind of courage it shows.",
          pairs: [
            { left: "Grace Darling rows into a storm", right: "Saving people in danger" },
            { left: "Admitting you broke the vase", right: "Telling the truth" },
            { left: "Trying out for the soccer team", right: "Trying something new" },
            { left: "Saying no to sneaking cookies", right: "Standing up for what is right" },
          ],
          hint: "Ask what each brave person is doing: rescuing, telling the truth, trying something new or refusing to do wrong.",
          mistakes: [
            { match: "Matched the vase to trying something new", coach: "Admitting what you did is about telling the truth." },
          ],
          seconds: 45,
        },
        {
          type: "build",
          prompt: "Build the meaning of courage.",
          tiles: ["Courage is", "doing what is right", "even when", "you are afraid"],
          distractors: ["never feeling fear", "to show off"],
          hint: "Courage is about action, and brave people still feel fear.",
          mistakes: [
            { match: "Used never feeling fear", coach: "Everyone feels fear, even Grace Darling. Courage acts anyway." },
            { match: "Used to show off", coach: "Showing off is reckless. Courage has a good reason." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What does it mean to be reckless?",
          choices: [
            "Being very careful",
            "Taking a foolish risk for no good reason",
            "Helping someone in danger",
          ],
          answer: 1,
          why: "Reckless means taking a foolish risk, often to show off.",
        },
        {
          q: "What did Grace Darling do in 1838?",
          choices: [
            "She rowed out in a storm with her father and rescued nine people",
            "She wrote a book of fables",
            "She built a new lighthouse",
            "She sailed around the world",
          ],
          answer: 0,
          why: "Grace and her father rowed through a storm to rescue survivors of a shipwreck.",
        },
        {
          q: "Which is an example of everyday courage?",
          choices: [
            "Jumping off a wall on a dare",
            "Watching a movie",
            "Sitting with a kid who is eating alone",
            "Saying 'someone should help' and walking away",
          ],
          answer: 2,
          why: "Being kind when it feels a little scary is everyday courage.",
        },
        {
          q: "What does the fable of the mice and the cat teach?",
          choices: [
            "Bells are useful tools",
            "Cats are always hungry",
            "Mice are braver than cats",
            "It is easy to talk about brave things but harder to do them",
          ],
          answer: 3,
          why: "All the mice liked the plan, but nobody would actually bell the cat.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: do one act of everyday courage this week. Ideas: try a food you have never eaten, ask a question you were nervous to ask, tell the truth about something hard, or help a younger child who is having trouble. Afterward, tell a parent what you did, how you felt before and how you felt after.",
        rubric: [
          "Chooses a safe, real act of everyday courage",
          "Actually does it, not just talks about it",
          "Describes how they felt before and after",
          "Explains why it was brave and not reckless",
        ],
      },
    },

    // ------------------------------------------------------------------ Teamwork
    {
      id: "leadership-45.teamwork",
      title: "Teamwork: Winning Together",
      minutes: 25,
      stage: "logic",
      subject: "Other",
      read: [
        "Aesop told a fable about an old farmer whose sons were always quarreling. One day he handed them a bundle of sticks tied together and asked each son to break it. Each one tried as hard as he could, but nobody could break the bundle. Then the farmer untied the sticks and gave each son a single stick. Snap, snap, snap! They broke easily. The father said that if the brothers stuck together, nothing could break them, but if they quarreled and split apart, they would be easy to beat.",
        "Nature shows teamwork too. Birds such as geese often fly in a V shape. Each bird gets a little lift from the air moving off the wings of the bird in front, which makes flying easier. The bird at the front works hardest, so the birds take turns leading. By sharing the hard job, the whole flock can fly much farther.",
        "Some of the greatest things people have ever done took huge teams. In 1969, the Apollo 11 mission landed two astronauts on the Moon. Millions of people watched Neil Armstrong and Buzz Aldrin walk on the Moon, but about 400,000 people worked on the Apollo program. Engineers designed the rockets, workers sewed the spacesuits by hand, and teams on the ground watched over every part of the trip. Every job mattered.",
        "A good teammate does four things. Do your own job well. Encourage others, especially when things go wrong. Listen to other people's ideas. Share the credit when the team wins. A poor teammate hogs the ball, blames others and only cares about getting the glory.",
        "Whether it is a soccer game, a family cleanup or a class project, a team that works together can do far more than one person alone.",
      ].join("\n\n"),
      keyIdeas: [
        "Together we are strong, like a bundle of sticks. Alone, we break more easily.",
        "Good teammates do their job, encourage others, listen and share the credit.",
        "Big achievements, like landing on the Moon, take many people doing their part.",
      ],
      hook: {
        text: "An old farmer had sons who were always quarreling. He handed them a bundle of sticks tied together and said, 'Break it.' Each son pushed and pulled, but nobody could. Then he untied the bundle and handed each son one stick. Snap, snap, snap! What was the farmer trying to teach his sons?",
      },
      teach: [
        {
          title: "The Bundle of Sticks",
          teach:
            "In Aesop's fable, a farmer's sons were always quarreling. He handed them a bundle of sticks tied together and asked each son to break it. Nobody could. Then he untied the sticks and gave each son one stick. Snap, snap, snap! They broke easily. The father explained: if you stick together, nothing can break you, but if you quarrel and split apart, you will be easy to beat. Together is stronger than alone.",
          visual: {
            type: "compare",
            left: {
              title: "Together",
              points: [
                "Hard to break",
                "Share the work",
                "Help each other up",
                "Can do big things",
              ],
            },
            right: {
              title: "Alone and quarreling",
              points: [
                "Easy to break",
                "Each does everything alone",
                "Nobody helps when you fall",
                "Gets less done",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "A single stick is easy to {0}, but a {1} of sticks tied together is strong. The farmer wanted his sons to stop {2} and stick together.",
            blanks: [
              { answers: ["break", "snap"] },
              { answers: ["bundle"] },
              { answers: ["quarreling", "fighting", "arguing"] },
            ],
            bank: ["break", "bundle", "quarreling", "bend", "pile", "working"],
            hint: "Think about what happened to one stick, what the sticks were tied into, and what the sons kept doing.",
            mistakes: [
              { match: "working", coach: "The farmer wanted his sons to keep working together. What bad habit did he want them to stop?" },
              { match: "pile", coach: "A loose pile would break easily, stick by stick. The sticks were tied into something." },
            ],
            seconds: 35,
          },
          think: {
            q: "What is the moral of the bundle of sticks?",
            choices: [
              "Sticks are good for building fires",
              "Fathers are stronger than sons",
              "People who stick together are stronger than people alone",
              "Always carry a bundle of sticks",
            ],
            answer: 2,
            why: "Tied together, the sticks could not be broken. Working together makes a team strong.",
            hints: [
              "The fable is not really about fire. Think about why the bundle would not break.",
              "The sons were strong, but they could not break the bundle. What made it strong?",
              "",
              "The sticks are a picture of something else. What do they stand for?",
            ],
          },
          approaches: {
            analogy:
              "One strand of thread snaps easily, but many strands twisted together make a rope strong enough to pull a car. A team is a rope made of people.",
            example:
              "Two sisters were arguing over who should clean the playroom. Nothing got done. Then they agreed: one picks up toys, the other puts books away. They finished in ten minutes, together.",
            simpler: {
              q: "In the fable, which was easier to break?",
              choices: ["The bundle of sticks", "One stick by itself"],
              answer: 1,
              why: "A single stick snapped easily, but the bundle did not.",
              hints: [
                "Every son tried to break the bundle and nobody could.",
                "",
              ],
            },
          },
        },
        {
          title: "Geese Take Turns",
          teach:
            "Nature shows teamwork too. Birds such as geese often fly in a V shape. Each bird gets a little lift from the air moving off the wings of the bird in front, which makes flying easier. The bird at the front works hardest, so the birds take turns leading. By sharing the hard job, the whole flock can fly much farther than one bird could alone. Good teams share the hard jobs too.",
          visual: {
            type: "hotspots",
            title: "Flying in a V",
            center: "The flock",
            spots: [
              { label: "The leader", icon: "🪶", detail: "The bird at the front pushes through the air first. It is the hardest job." },
              { label: "The followers", icon: "🦆", detail: "Birds behind get a little lift from the air moving off the wings ahead." },
              { label: "Taking turns", icon: "🔄", detail: "When the leader gets tired, it drops back and another bird takes the front." },
              { label: "Going far", icon: "🗺️", detail: "By sharing the work, the whole flock can fly much farther." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Does each choice help the team, or hurt the team?",
            buckets: ["Helps the team", "Hurts the team"],
            items: [
              { text: "Taking a turn at the hard job so a teammate can rest", bucket: 0 },
              { text: "Always taking the easiest job for yourself", bucket: 1 },
              { text: "Saying 'Nice try!' when a teammate misses", bucket: 0 },
              { text: "Hogging the ball the whole game", bucket: 1 },
              { text: "Listening to a teammate's idea before sharing yours", bucket: 0 },
              { text: "Blaming a teammate when the team loses", bucket: 1 },
            ],
            hint: "Think about the geese: do they share the hard work and help each other?",
            mistakes: [
              { match: "Easiest job sorted as helps", coach: "If you always take the easy job, others are stuck with the hard one, like a goose that never leads." },
              { match: "Nice try sorted as hurts", coach: "Encouraging a teammate after a miss helps them try again." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why do geese take turns flying at the front of the V?",
            choices: [
              "The front is the hardest job, so they share it",
              "They want to see where they are going",
              "The leader is always the biggest bird",
            ],
            answer: 0,
            why: "The front bird works hardest. Taking turns shares the hard job so the flock can go farther.",
            hints: [
              "",
              "All the birds can see well enough. The front spot is special because it is the hardest work.",
              "Different birds take the front at different times.",
            ],
          },
          approaches: {
            analogy:
              "Riding bikes into the wind, it is easier to ride right behind a friend. Taking turns in front means nobody gets worn out.",
            example:
              "On a long hike, Dad carried the heavy backpack first. After an hour, Sam said, 'My turn!' and carried it for a while. Then his sister took a turn. Sharing the heavy load, the family made it to the top.",
            simpler: {
              q: "Which spot in the V is the hardest work?",
              choices: ["The back", "The middle", "The front"],
              answer: 2,
              why: "The bird at the front pushes through the air first, so it works hardest.",
              hints: [
                "Birds in the back get lift from the birds in front of them.",
                "Middle birds get help from the birds ahead of them.",
                "",
              ],
            },
          },
        },
        {
          title: "Every Job Matters",
          teach:
            "In 1969, the Apollo 11 mission landed two astronauts on the Moon. Millions of people watched Neil Armstrong and Buzz Aldrin walk on the Moon, but about 400,000 people worked on the Apollo program. Engineers designed the rockets, workers sewed the spacesuits by hand, and teams on the ground watched over the whole trip. Every job mattered. A good teammate does their own job well, encourages others, listens and shares the credit.",
          visual: {
            type: "flip",
            cards: [
              { front: "Do your job well", back: "Your part matters, even if nobody sees it." },
              { front: "Encourage", back: "Cheer teammates on, especially when things go wrong." },
              { front: "Listen", back: "Hear other people's ideas before deciding." },
              { front: "Share the credit", back: "When the team wins, thank everyone who helped." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each Apollo team member to their job.",
            pairs: [
              { left: "Astronauts", right: "Flew to the Moon and walked on it" },
              { left: "Engineers", right: "Designed the rockets" },
              { left: "Spacesuit makers", right: "Sewed the suits by hand" },
              { left: "Ground teams", right: "Watched over the trip from Earth" },
            ],
            hint: "Think about who would be in space, who would design, who would sew and who would stay on Earth.",
            mistakes: [
              { match: "Matched astronauts to ground teams", coach: "Astronauts were the ones who left Earth. Who stayed behind to watch over them?" },
            ],
            seconds: 40,
          },
          think: {
            q: "Only two astronauts walked on the Moon. Why does the lesson say every job mattered?",
            choices: [
              "Because everyone got to go to the Moon",
              "Because the astronauts could not have gotten there without everyone else's work",
              "Because the astronauts did all the work",
              "Because the rocket built itself",
            ],
            answer: 1,
            why: "Rockets, spacesuits and ground teams were all needed. Without them, nobody would have reached the Moon.",
            hints: [
              "Only two people walked on the Moon. Most of the team stayed on Earth.",
              "",
              "The astronauts were brave, but they needed rockets and spacesuits that others made.",
              "Engineers and workers built the rocket. It took years of their work.",
            ],
          },
          approaches: {
            analogy:
              "A team is like a pizza. The cheese gets noticed, but without the crust and the sauce, there is no pizza at all.",
            example:
              "At the class bake sale, Lily baked, Max made the signs, Ava handled the money and Leo cleaned up. When they raised $80, Lily said, 'We did it together!' She shared the credit.",
            simpler: {
              q: "What year did Apollo 11 land on the Moon?",
              choices: ["1969", "1776", "2001"],
              answer: 0,
              why: "Apollo 11 landed on the Moon in 1969.",
              hints: [
                "",
                "1776 is the year of the Declaration of Independence, long before rockets.",
                "The Moon landing happened more than thirty years before that.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: good teammate or poor teammate?",
        buckets: ["Good teammate", "Poor teammate"],
        items: [
          { text: "Passing the ball to a teammate who is open", bucket: 0 },
          { text: "Pouting when you do not get to be captain", bucket: 1 },
          { text: "Saying 'We'll get it next time!' after a loss", bucket: 0 },
          { text: "Taking all the credit for the group poster", bucket: 1 },
          { text: "Doing your part of the family yard work", bucket: 0 },
          { text: "Laughing when a teammate drops the ball", bucket: 1 },
          { text: "Listening to your brother's plan for the fort", bucket: 0 },
          { text: "Quitting the game because you are losing", bucket: 1 },
        ],
      },
      explain: {
        prompt: "In your own words, why is a team stronger than one person alone? Use the bundle of sticks, the geese or Apollo 11 in your answer.",
        keyPoints: [
          "Together is stronger than alone, like the bundle of sticks",
          "Teammates share the hard jobs, like geese taking turns",
          "Every job matters, even ones nobody sees",
          "Good teammates encourage, listen and share the credit",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A relay team has 4 runners. Each runner runs 100 meters. How many meters does the team run in all?",
          answer: 400,
          unit: "meters",
          hint: "Every runner runs the same distance. Add 100 four times, or multiply 4 times 100.",
          mistakes: [
            { match: "100", coach: "That is how far one runner goes. The whole team runs together." },
            { match: "104", coach: "Try multiplying: 4 runners times 100 meters each." },
          ],
          seconds: 30,
        },
        {
          type: "place",
          prompt: "Place the year Apollo 11 landed on the Moon.",
          min: 1900,
          max: 2000,
          step: 1,
          tolerance: 2,
          items: [{ label: "Apollo 11 lands on the Moon", value: 1969 }],
          hint: "It was near the end of the 1960s.",
          mistakes: [
            { match: "Placed before 1950", coach: "Rockets that could reach the Moon came later, at the end of the 1960s." },
          ],
          seconds: 25,
        },
        {
          type: "build",
          prompt: "Build the four things a good teammate does.",
          tiles: ["Do your job well,", "encourage others,", "listen,", "and share the credit."],
          distractors: ["hog the ball,", "blame others,"],
          hint: "Pick only the things that help the whole team.",
          mistakes: [
            { match: "Used hog the ball", coach: "Hogging the ball leaves teammates out. That hurts the team." },
            { match: "Used blame others", coach: "Blaming pulls a team apart, like untying the bundle of sticks." },
          ],
          seconds: 35,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that shows good teamwork.",
          sentences: [
            "Jada took a turn carrying the heavy cooler so her dad could rest.",
            "Leo said the group's idea was all his.",
            "Nina told her teammate, 'Great pass!' even though they lost.",
            "Max wouldn't let anyone else touch the paint for the class mural.",
            "The twins split the chores so the kitchen was clean fast.",
          ],
          correct: [0, 2, 4],
          hint: "Look for sharing work, encouraging others and splitting jobs fairly.",
          mistakes: [
            { match: "Tapped Leo", coach: "Taking all the credit is not sharing it." },
            { match: "Tapped Max", coach: "Keeping the job to himself leaves the team out." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What did the bundle of sticks show the farmer's sons?",
          choices: [
            "Sticks are hard to find",
            "Together they are strong, but alone they break easily",
            "The oldest son is the strongest",
          ],
          answer: 1,
          why: "No one could break the bundle, but single sticks snapped easily.",
        },
        {
          q: "Why do geese take turns at the front of the V?",
          choices: [
            "The front is the hardest job, so they share it",
            "They like to race",
            "The front bird gets the most food",
            "They are lost",
          ],
          answer: 0,
          why: "Sharing the hardest job lets the whole flock fly farther.",
        },
        {
          q: "About how many people worked on the Apollo program?",
          choices: ["2", "40", "400,000"],
          answer: 2,
          why: "About 400,000 people worked on Apollo, even though only a few flew to the Moon.",
        },
        {
          q: "Which of these is a sign of a poor teammate?",
          choices: [
            "Encouraging others",
            "Listening to ideas",
            "Sharing the credit",
            "Blaming others when the team loses",
          ],
          answer: 3,
          why: "Blaming others pulls a team apart. Good teammates encourage, listen and share credit.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: lead a family team job. Pick a job your family can do together, like cleaning the garage, making dinner or weeding the garden. Help split the work so everyone has a part, take a turn at the hardest part, and cheer everyone on. When you finish, thank each person for their part.",
        rubric: [
          "Helps split the job so everyone has a part",
          "Takes a turn at the hardest part",
          "Encourages family members while working",
          "Thanks each person and shares the credit at the end",
        ],
      },
    },

    // ------------------------------------------------------------------ Perseverance
    {
      id: "leadership-45.perseverance",
      title: "Perseverance: Never Give Up",
      minutes: 30,
      stage: "rhetoric",
      subject: "Other",
      read: [
        "Perseverance means keeping going when something is hard, and not giving up after a mistake or a failure. It is one of the most important character strengths a person can have.",
        "Aesop told the fable of the Tortoise and the Hare. The fast hare laughed at the slow tortoise and agreed to a race. The hare zoomed ahead, then was so sure he would win that he lay down for a nap. The tortoise kept going, one slow step at a time. When the hare woke up, the tortoise was crossing the finish line. The moral: slow and steady wins the race.",
        "Thomas Edison was an American inventor who wanted to make an electric light bulb that would glow for a long time. Inside a bulb is a thin thread called a filament that glows when electricity runs through it. Most materials burned up too quickly. Edison and his team at Menlo Park, New Jersey, tested thousands of materials. In 1879, a cotton thread baked until it turned into carbon glowed for many hours. Later, a filament made from bamboo lasted even longer. Every failure taught the team something new.",
        "Wilbur and Orville Wright ran a bicycle shop in Dayton, Ohio, and dreamed of flying. Their first gliders did not fly as well as they hoped. Instead of quitting, they built a small wind tunnel and tested more than 200 wing shapes. On December 17, 1903, at Kitty Hawk, North Carolina, Orville made the first powered airplane flight. It lasted 12 seconds and went 120 feet. Later that same day, Wilbur flew for 59 seconds and went 852 feet.",
        "Perseverance has a pattern. You try. Something goes wrong. You figure out what you learned. You change your plan. Then you try again. A mistake is not the end. It is information.",
      ].join("\n\n"),
      keyIdeas: [
        "Perseverance means not giving up when something is hard.",
        "Edison's team tested thousands of materials, and the Wright brothers tested over 200 wing shapes before they succeeded.",
        "A failure is information: learn from it, change the plan and try again.",
      ],
      hook: {
        text: "Thomas Edison and his team wanted a light bulb that would glow for hours. They tried one material, and it burned out. They tried another, and another. They tested thousands of materials, and most of them failed. Why would anyone keep going after so many failures?",
      },
      teach: [
        {
          title: "The Tortoise and the Hare",
          teach:
            "In Aesop's fable, the fast hare laughed at the slow tortoise and agreed to a race. The hare zoomed ahead, then was so sure he would win that he lay down for a nap. The tortoise kept going, one slow step at a time. When the hare woke up, the tortoise was crossing the finish line. The moral: slow and steady wins the race. Perseverance means not giving up, even when you are not the fastest.",
          visual: {
            type: "compare",
            left: {
              title: "The Tortoise",
              points: [
                "Slow but steady",
                "Kept going step by step",
                "Did not give up",
                "Won the race",
              ],
            },
            right: {
              title: "The Hare",
              points: [
                "Very fast",
                "Bragged and showed off",
                "Stopped to nap",
                "Lost the race",
              ],
            },
          },
          probe: {
            type: "sequence",
            prompt: "Put the story of the Tortoise and the Hare in order.",
            steps: [
              "The hare laughs at the slow tortoise",
              "The race begins and the hare zooms ahead",
              "The hare lies down for a nap",
              "The tortoise keeps going, step by step",
              "The tortoise crosses the finish line first",
            ],
            hint: "The hare had to get far ahead before he felt sure enough to take a nap.",
            mistakes: [
              { match: "Nap before the race starts", coach: "The hare napped in the middle of the race, after he got far ahead." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why did the tortoise win the race?",
            choices: [
              "The tortoise was secretly faster",
              "The hare got lost",
              "The tortoise kept going and never stopped",
              "The hare let him win on purpose",
            ],
            answer: 2,
            why: "Slow and steady wins the race. The tortoise never gave up.",
            hints: [
              "The tortoise was really slow. Speed was not why he won.",
              "The hare knew the way. What did he do instead of running?",
              "",
              "The hare wanted to win, but he was too sure of himself and took a nap.",
            ],
          },
          approaches: {
            analogy:
              "Perseverance is like filling a bucket with a cup. Each cup seems small, but if you keep going, the bucket fills up.",
            example:
              "Noah could not ride a bike. He fell many times. Every day he practiced for ten minutes. After two weeks, he rode all the way down the street. He was not the fastest learner, but he kept going.",
            simpler: {
              q: "Who won the race?",
              choices: ["The hare", "The tortoise"],
              answer: 1,
              why: "The tortoise won because he kept going while the hare napped.",
              hints: [
                "The hare was faster, but he stopped to take a nap.",
                "",
              ],
            },
          },
        },
        {
          title: "Edison's Thousands of Tries",
          teach:
            "Thomas Edison wanted to make an electric light bulb that would glow for a long time. Inside a bulb is a thin thread called a filament that glows when electricity runs through it. Most materials burned up too quickly. Edison and his team at Menlo Park, New Jersey, tested thousands of materials. In 1879, a cotton thread baked until it turned into carbon glowed for many hours. Every failure taught the team something new.",
          visual: {
            type: "timeline",
            events: [
              { year: 1876, label: "Menlo Park lab opens", detail: "Edison opens his invention lab in Menlo Park, New Jersey." },
              { year: 1879, label: "A bulb that lasts", detail: "After testing thousands of materials, a carbon thread glows for many hours." },
              { year: 1880, label: "Bamboo filament", detail: "The team finds that carbonized bamboo lasts even longer." },
            ],
          },
          probe: {
            type: "cloze",
            text: "The thin thread inside a light bulb is called a {0}. Edison's team tested {1} of materials. Each failure taught them something {2}.",
            blanks: [
              { answers: ["filament"] },
              { answers: ["thousands"] },
              { answers: ["new"] },
            ],
            bank: ["filament", "thousands", "new", "battery", "two", "bad"],
            hint: "Think about the name of the glowing thread and how many tries it took.",
            mistakes: [
              { match: "two", coach: "Edison's team tried far more than two. They tested thousands." },
              { match: "battery", coach: "A battery stores electricity. The glowing thread has another name." },
              { match: "bad", coach: "The failures were not wasted. They taught the team something useful." },
            ],
            seconds: 35,
          },
          think: {
            q: "How did Edison's team think about their failed tests?",
            choices: [
              "Each failure showed them something that did not work, so they learned",
              "They thought they should give up",
              "They pretended the failures did not happen",
            ],
            answer: 0,
            why: "Every failed material taught the team something, so they could try something better next.",
            hints: [
              "",
              "They tested thousands of materials. People who give up do not keep testing.",
              "They kept careful notes on what did not work, so the failures helped them.",
            ],
          },
          approaches: {
            analogy:
              "Searching for the right filament was like trying keys on a giant key ring. Each key that does not fit gets you one key closer to the one that does.",
            example:
              "Lily was building a paper bridge for science. The first one sagged. She folded the paper into a zigzag and tried again. It held three pennies. Then she tried two layers, and it held ten. Each failed try showed her what to change.",
            simpler: {
              q: "What is the glowing thread inside a light bulb called?",
              choices: ["A filament", "A battery", "A switch"],
              answer: 0,
              why: "The filament is the thin thread that glows when electricity runs through it.",
              hints: [
                "",
                "A battery stores electricity. The glowing part has another name.",
                "A switch turns the light on and off. What glows inside?",
              ],
            },
          },
        },
        {
          title: "The Wright Brothers Fly",
          teach:
            "Wilbur and Orville Wright ran a bicycle shop in Dayton, Ohio, and dreamed of flying. Their first gliders did not fly as well as they hoped. Instead of quitting, they built a small wind tunnel and tested more than 200 wing shapes. On December 17, 1903, at Kitty Hawk, North Carolina, Orville made the first powered airplane flight. It lasted 12 seconds. Later that day, Wilbur flew for 59 seconds.",
          visual: {
            type: "sequence",
            prompt: "The perseverance pattern",
            steps: [
              "Try",
              "Something goes wrong",
              "Figure out what you learned",
              "Change your plan",
              "Try again",
            ],
          },
          probe: {
            type: "number",
            prompt: "Orville's first flight lasted 12 seconds. Wilbur's last flight that day lasted 59 seconds. How many seconds longer was Wilbur's flight?",
            answer: 47,
            unit: "seconds",
            hint: "Subtract the shorter flight from the longer one: 59 minus 12.",
            mistakes: [
              { match: "71", coach: "You added the two flights. To find how much longer, subtract." },
              { match: "57", coach: "Check your subtraction: 59 minus 12. Take away 10, then 2 more." },
            ],
            seconds: 40,
          },
          think: {
            q: "What did the Wright brothers do when their gliders did not fly well?",
            choices: [
              "They gave up and went back to bicycles",
              "They blamed the wind",
              "They built a wind tunnel and tested more than 200 wing shapes",
              "They waited for someone else to invent the airplane",
            ],
            answer: 2,
            why: "They learned from what went wrong, changed their plan and kept testing.",
            hints: [
              "They kept the bicycle shop, but they did not give up on flying.",
              "The wind was a problem, but blaming it would not fix anything.",
              "",
              "They did not wait. They did the testing themselves.",
            ],
          },
          approaches: {
            analogy:
              "The Wright brothers were like a cook fixing a recipe. If the cake comes out flat, you do not quit baking. You change one thing and bake again.",
            example:
              "When their gliders did not lift enough, the Wrights did not guess. They built a wind tunnel, a box with a fan blowing air through it, and tested over 200 little wing shapes to find the best one. Two years later, they flew.",
            simpler: {
              q: "How long did the very first powered airplane flight last?",
              choices: ["12 seconds", "12 hours", "12 days"],
              answer: 0,
              why: "Orville's first flight lasted just 12 seconds, but it changed the world.",
              hints: [
                "",
                "The first flight was very short. Hours is far too long.",
                "No airplane in 1903 could stay up for days. It was much shorter.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of perseverance in order.",
        steps: [
          "Try something hard",
          "Something goes wrong",
          "Figure out what you learned",
          "Change your plan",
          "Try again",
        ],
      },
      explain: {
        prompt: "In your own words, what is perseverance? Tell how Edison or the Wright brothers showed it, and how you can use it.",
        keyPoints: [
          "Perseverance means not giving up when something is hard",
          "Edison's team tested thousands of materials",
          "The Wright brothers tested over 200 wing shapes and flew in 1903",
          "A failure is information: learn, change the plan, try again",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these two moments on the timeline.",
          min: 1850,
          max: 1950,
          step: 1,
          tolerance: 3,
          items: [
            { label: "Edison's long-lasting light bulb", value: 1879 },
            { label: "The Wright brothers' first flight", value: 1903 },
          ],
          hint: "The light bulb came first, near the end of the 1800s. The first flight was just after 1900.",
          mistakes: [
            { match: "Swapped the bulb and the flight", coach: "Edison's bulb came about 24 years before the first airplane flight." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Orville's first flight went 120 feet. Wilbur's last flight that day went 852 feet. How many feet farther did Wilbur fly?",
          answer: 732,
          unit: "feet",
          hint: "Subtract the shorter distance from the longer one: 852 minus 120.",
          mistakes: [
            { match: "972", coach: "You added the distances. To find how much farther, subtract." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each person or character to how they showed perseverance.",
          pairs: [
            { left: "The tortoise", right: "Kept going step by step and won the race" },
            { left: "Thomas Edison's team", right: "Tested thousands of materials for a light bulb" },
            { left: "The Wright brothers", right: "Tested more than 200 wing shapes" },
          ],
          hint: "Think about the race, the light bulb and the airplane.",
          mistakes: [
            { match: "Matched Edison to wing shapes", coach: "Edison worked on light bulbs. Wings belong to the airplane story." },
          ],
          seconds: 35,
        },
        {
          type: "build",
          prompt: "Build the big idea about mistakes.",
          tiles: ["A mistake", "is not the end.", "It is", "information."],
          distractors: ["a reason to quit.", "the end."],
          hint: "Think about what Edison's team got from every failed test.",
          mistakes: [
            { match: "Used a reason to quit", coach: "Edison and the Wrights had many failures and did not quit." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What is the moral of the Tortoise and the Hare?",
          choices: [
            "Fast is always best",
            "Naps are important",
            "Slow and steady wins the race",
          ],
          answer: 2,
          why: "The tortoise kept going while the overconfident hare stopped.",
        },
        {
          q: "What is a filament?",
          choices: [
            "The thin thread that glows inside a light bulb",
            "A kind of airplane wing",
            "A bicycle part",
            "A battery",
          ],
          answer: 0,
          why: "The filament glows when electricity runs through it.",
        },
        {
          q: "Where did the Wright brothers make the first powered airplane flight?",
          choices: [
            "Dayton, Ohio",
            "Kitty Hawk, North Carolina",
            "Menlo Park, New Jersey",
            "New Salem, Illinois",
          ],
          answer: 1,
          why: "They flew at Kitty Hawk, North Carolina, on December 17, 1903. Their bicycle shop was in Dayton.",
        },
        {
          q: "Your model rocket does not fly straight. What shows perseverance?",
          choices: [
            "Throw the rocket away",
            "Say rockets are boring",
            "Ask someone else to finish it",
            "Figure out what went wrong, change it and try again",
          ],
          answer: 3,
          why: "Perseverance means learning from a failure, changing your plan and trying again.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: pick one thing that is hard for you right now, like a tricky skill, a puzzle, a song on an instrument or a chore you have not mastered. Practice it for a few minutes every day for one week. Each day, write one thing you learned or changed. At the end, show your family how far you got.",
        rubric: [
          "Chooses a real, hard skill to practice",
          "Practices on most days of the week",
          "Writes down what was learned or changed each day",
          "Shows the family the progress and explains what helped",
        ],
      },
    },
  ],
};
