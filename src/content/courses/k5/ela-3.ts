import type { Lesson } from "../types";
import { k5Course } from "./base";

/**
 * ela-3: Reading & Writing 3 (Common Core ELA, grade 3), taught by Grandpa Aesop
 * in the Sky Islands world. Standards are in src/content/standards/ela-3.ts.
 * The fables, folktales and myths are old public-domain stories, retold here.
 */
const lessons: Lesson[] = [
  // 1. Word parts, big words and fluency
  {
    id: "ela-3.word-parts",
    title: "Word Detectives: Prefixes, Suffixes and Big Words",
    minutes: 30,
    stage: "grammar",
    standards: ["RF.3.3", "RF.3.4", "L.3.4", "L.3.2"],
    read: [
      "Long words can look scary, but most of them are built from smaller parts, like a train made of cars. A good reader is a word detective who takes a big word apart to read it and figure out what it means.",
      "The main part of a word is the root word, also called the base word. A prefix is a part added to the front of a word, and it changes the meaning. Un- and dis- mean not: unhappy means not happy, and dislike means not like. Re- means again: reread means read again. Pre- means before: preheat means heat before. Mis- means wrongly: misspell means spell the wrong way.",
      "A suffix is a part added to the end of a word. The suffix -ful means full of, so hopeful means full of hope. The suffix -less means without, so fearless means without fear. The suffix -er can mean a person who does something, like a teacher or a farmer. The suffix -able means can be, so washable means it can be washed. The suffix -ly tells how, as in quickly. Sometimes the root changes its spelling: happy plus -ness becomes happiness, and hop plus -ing becomes hopping.",
      "To read a long word, break it into syllables. Every syllable has one vowel sound. Find the prefix and the suffix first, then read the root in the middle: un-break-a-ble.",
      "Some words do not follow the usual sound rules, like said, laugh, though and enough. You learn these by heart, and a dictionary can always help you check a spelling or a meaning.",
      "Finally, good readers read smoothly, like they are talking. If a sentence does not make sense, they slow down and read it again. Reading the same page a few times makes it sound better each time.",
    ].join("\n\n"),
    keyIdeas: [
      "A prefix goes at the front of a root word and a suffix goes at the end; each one changes the meaning.",
      "Break long words into syllables: find the prefix, the suffix, then the root.",
      "Some words have tricky spellings to learn by heart, and a dictionary helps you check.",
      "Read smoothly, and reread when something does not make sense.",
    ],
    hook: {
      text: "Here is a giant word: unbreakable. It has eleven letters! But a word detective knows a secret. Big words are made of small parts snapped together, like building blocks.",
    },
    teach: [
      {
        title: "Prefixes Change the Meaning",
        teach:
          "A prefix is a word part added to the front of a root word, and it changes the meaning. Here are the prefixes you will see most. Un- and dis- mean not, so unkind means not kind and disagree means not agree. Re- means again, so retell means tell again. Pre- means before, so a pretest comes before the real test. Mis- means wrongly, so misread means read the wrong way. When you meet a new word, cover the prefix with your finger. Read the root, then add the prefix's meaning back on.",
        visual: {
          type: "flip",
          cards: [
            { front: "un-", back: "not: unkind means not kind" },
            { front: "dis-", back: "not: disagree means not agree" },
            { front: "re-", back: "again: retell means tell again" },
            { front: "pre-", back: "before: a pretest comes before the real test" },
            { front: "mis-", back: "wrongly: misread means read the wrong way" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Cover the prefix, read the root, then match each word to what it means.",
          pairs: [
            { left: "unsafe", right: "not safe" },
            { left: "replant", right: "plant again" },
            { left: "preview", right: "see before" },
            { left: "misplace", right: "put in the wrong place" },
            { left: "dishonest", right: "not honest" },
          ],
          hint: "Un- and dis- mean not, re- means again, pre- means before and mis- means wrongly.",
          mistakes: [
            { match: "replant matched to not safe", coach: "Re- means again. Replant means plant again." },
            { match: "preview matched to plant again", coach: "Pre- means before. To preview is to see something before." },
          ],
          seconds: 45,
        },
        think: {
          q: "What does 'reheat' mean?",
          choices: ["Not heat", "Heat again", "Heat before", "Heat the wrong way"],
          answer: 1,
          why: "Re- means again, so reheat means heat again.",
          hints: [
            "Not is the meaning of un- or dis-. Look again at the prefix re-.",
            "",
            "Before is the meaning of pre-, as in preheat. This word starts with re-.",
            "Wrongly is the meaning of mis-. Re- means something else.",
          ],
        },
        approaches: {
          analogy:
            "A prefix is like a hat on a word. Put the hat called un- on the word lucky, and lucky turns into unlucky. Same word underneath, new meaning on top.",
          example:
            "Take the word unpacked. Cover un- and you see packed. Un- means not, so unpacked means the opposite of packed: everything is taken out of the bag.",
          simpler: {
            q: "Which part of 'unkind' is the prefix?",
            choices: ["un", "kind"],
            answer: 0,
            why: "Un- is added to the front of the root word kind.",
            hints: ["", "Kind is the root word. The prefix is the small part added in front of it."],
          },
        },
      },
      {
        title: "Suffixes and Spelling Changes",
        teach:
          "A suffix is a word part added to the end of a word. The suffix -ful means full of, so a joyful song is full of joy. The suffix -less means without, so a careless person acts without care. The suffix -er can mean a person who does something, like a farmer or a baker. The suffix -able means can be, so a readable note can be read. Watch out, because sometimes the root changes its spelling. When a word ends in y, the y often turns into i, so happy becomes happiness. Short words like hop double the last letter, so hop becomes hopping. Words that end in a silent e drop the e, so bake becomes baking.",
        visual: {
          type: "hotspots",
          title: "The suffix toolbox",
          center: "root word",
          spots: [
            { label: "-ful", icon: "🫙", detail: "full of: joyful, hopeful, careful" },
            { label: "-less", icon: "🚫", detail: "without: careless, fearless, endless" },
            { label: "-er", icon: "🧑‍🌾", detail: "a person who does something: farmer, baker, teacher" },
            { label: "-able", icon: "✅", detail: "can be: readable, washable, breakable" },
            { label: "-ly", icon: "🏃", detail: "tells how: quickly, softly, bravely" },
            { label: "-ness", icon: "😊", detail: "the state of being: kindness, happiness" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Snap the parts together and spell the new word. hope + ful = {0}. hop + ing = {1}. happy + ness = {2}. bake + er = {3}.",
          blanks: [{ answers: ["hopeful"] }, { answers: ["hopping"] }, { answers: ["happiness"] }, { answers: ["baker"] }],
          hint: "Hope keeps its e before -ful. Short hop doubles the p. The y in happy turns into i. Bake already ends in e, so just add r.",
          mistakes: [
            { match: "hoping", coach: "Hoping comes from hope. For the word hop, double the p: hopping." },
            { match: "happyness", coach: "When a word ends in y, the y usually turns into i before -ness: happiness." },
            { match: "bakeer", coach: "Bake already ends in e, so you only add r: baker." },
          ],
          seconds: 60,
        },
        think: {
          q: "What does 'fearless' mean?",
          choices: ["Full of fear", "Without fear", "Afraid again", "A person who fears"],
          answer: 1,
          why: "The suffix -less means without, so fearless means without fear.",
          hints: [
            "Full of is the meaning of -ful, as in fearful. This word ends in -less.",
            "",
            "Again is the meaning of the prefix re-. Look at the end of the word.",
            "A person who does something is -er. This word ends in -less.",
          ],
        },
        approaches: {
          analogy:
            "A suffix is like a caboose hooked to the back of a train. The engine (the root word) is the same, but the caboose tells you something new about where the train is going.",
          example:
            "Start with the root word care. Add -ful and you get careful, full of care. Add -less and you get careless, without care. One root, two suffixes, two opposite meanings.",
          simpler: {
            q: "Which part of 'thankful' is the suffix?",
            choices: ["thank", "ful"],
            answer: 1,
            why: "-ful is added to the end of the root word thank.",
            hints: ["Thank is the root word. The suffix is the part added at the end.", ""],
          },
        },
      },
      {
        title: "Big Words, Tricky Words and Smooth Reading",
        teach:
          "To read a long word, break it into syllables, the beats of a word. Every syllable has one vowel sound. Clap it out: fan-tas-tic has three claps. Find the prefix and the suffix first, then read the root in the middle: un-break-a-ble. Some words do not follow the usual rules at all, like said, laugh, though and enough. Learn those by heart, and check a dictionary when you are not sure of a spelling or a meaning. Last of all, read like you are talking, not like a robot. If a sentence does not make sense, slow down and read it again.",
        visual: {
          type: "flip",
          cards: [
            { front: "Syllable", back: "One beat of a word. Every syllable has one vowel sound: fan-tas-tic." },
            { front: "said", back: "Sounds like 'sed'. A tricky word to learn by heart." },
            { front: "laugh", back: "The gh sounds like f. Learn it by heart." },
            { front: "enough", back: "e-nuff: the ough sounds like uff." },
            { front: "Dictionary", back: "Words in ABC order, with how to spell, say and use each one." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the word unbreakable one syllable at a time, in order.",
          tiles: ["un", "break", "a", "ble"],
          distractors: ["bra", "ke"],
          hint: "Find the prefix first (un), then the root word (break), then the suffix -able split into two beats.",
          mistakes: [{ match: "bra", coach: "Keep the root word break together in one syllable: un-break-a-ble." }],
          seconds: 40,
        },
        think: {
          q: "How many syllables are in 'fantastic'?",
          choices: ["Two", "Three", "Four"],
          answer: 1,
          why: "Fan-tas-tic has three beats, each with one vowel sound.",
          hints: ["Clap it slowly: fan, tas, tic. Count each clap.", "", "Count the vowel sounds: a, a, i. That is fewer than four."],
        },
        approaches: {
          analogy:
            "Reading a long word is like eating a long sandwich. Nobody swallows it whole! You take one bite at a time, one syllable at a time, until it is all gone.",
          example:
            "Try the word unhelpful. First find the prefix: un. Then find the suffix: ful. The root in the middle is help. Put it together: un-help-ful, three syllables, and it means not helpful.",
          simpler: {
            q: "How many syllables are in 'sunset'?",
            choices: ["One", "Two", "Three"],
            answer: 1,
            why: "Sun-set has two beats.",
            hints: ["Clap it: sun, set. That is more than one clap.", "", "Count the vowel sounds: u and e. Only two."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Word detective sort: does each word have a prefix, a suffix, or both?",
      buckets: ["Prefix only", "Suffix only", "Prefix and suffix"],
      items: [
        { text: "replay", bucket: 0 },
        { text: "unlock", bucket: 0 },
        { text: "disobey", bucket: 0 },
        { text: "careful", bucket: 1 },
        { text: "teacher", bucket: 1 },
        { text: "softly", bucket: 1 },
        { text: "unhelpful", bucket: 2 },
        { text: "unkindly", bucket: 2 },
        { text: "repainted", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell how a word detective would read and figure out the word 'unthankful'. Use the words prefix, suffix and root.",
      keyPoints: [
        "Un- is the prefix and it means not",
        "-ful is the suffix and it means full of",
        "Thank is the root word in the middle",
        "Unthankful means not full of thanks",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each word part to its meaning.",
        pairs: [
          { left: "un-", right: "not" },
          { left: "re-", right: "again" },
          { left: "pre-", right: "before" },
          { left: "-less", right: "without" },
          { left: "-ful", right: "full of" },
        ],
        hint: "Think of a word with each part: unhappy, redo, preheat, fearless, joyful.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Clap it out. How many syllables are in the word 'unbelievable'?",
        answer: 5,
        hint: "Split it: un-be-liev-a-ble. Count each beat.",
        mistakes: [{ match: "4", coach: "Say it slowly: un, be, liev, a, ble. The -able part has two beats." }],
        seconds: 30,
      },
      {
        type: "cloze",
        text: "I spelled my name wrong, so I had to {0} it. The {1} puppy ran right into the dark barn. My new shirt is {2}, so I can put it in the machine.",
        blanks: [{ answers: ["rewrite"] }, { answers: ["fearless"] }, { answers: ["washable"] }],
        bank: ["rewrite", "fearless", "washable", "prewrite", "unwashed"],
        hint: "Re- means again, -less means without, and -able means can be.",
        mistakes: [
          { match: "prewrite", coach: "Pre- means before. You fix a mistake by writing it again: rewrite." },
          { match: "unwashed", coach: "Unwashed means not washed yet. The shirt can be washed, so it is washable." },
        ],
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "Sort the words: does it follow the sound rules, or is it a tricky word to learn by heart?",
        buckets: ["Follows the sound rules", "Tricky word"],
        items: [
          { text: "jump", bucket: 0 },
          { text: "sunset", bucket: 0 },
          { text: "hopping", bucket: 0 },
          { text: "said", bucket: 1 },
          { text: "laugh", bucket: 1 },
          { text: "enough", bucket: 1 },
        ],
        hint: "Sound the word out letter by letter. If it does not sound the way it is spelled, it is a tricky word.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is the prefix in the word 'disagree'?",
        choices: ["dis", "agree", "ree"],
        answer: 0,
        why: "Dis- is added to the front of agree. It means not.",
      },
      {
        q: "Which word means 'full of joy'?",
        choices: ["joyless", "rejoy", "joyful", "unjoy"],
        answer: 2,
        why: "The suffix -ful means full of, so joyful means full of joy.",
      },
      {
        q: "What is the right way to spell happy + ness?",
        choices: ["happyness", "happiness", "hapiness"],
        answer: 1,
        why: "The y turns into i before the suffix: happiness.",
      },
      {
        q: "You read a sentence and it does not make sense. What should you do?",
        choices: ["Skip the whole page", "Read faster", "Guess and keep going", "Slow down and reread it"],
        answer: 3,
        why: "Good readers reread to fix mistakes and make sense of the text.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Go on a word hunt! Look through a book, a magazine or a cereal box and find five words with a prefix or a suffix. Write each word, draw lines between its parts, and tell a parent what each word means. Then pick one page and read it aloud three times, smoother each time.",
      rubric: [
        "Finds five real words with a prefix, a suffix or both",
        "Splits each word into its parts correctly",
        "Explains what each word means using the meaning of the parts",
        "Reads the page aloud more smoothly by the third time",
      ],
    },
  },

  // 2. Fables, folktales and myths
  {
    id: "ela-3.fables",
    title: "Fables, Folktales and Myths: Finding the Lesson",
    minutes: 30,
    stage: "logic",
    standards: ["RL.3.1", "RL.3.2", "RL.3.10", "SL.3.2"],
    read: [
      "People have told stories for thousands of years to teach lessons. Three kinds of old stories are fables, folktales and myths.",
      "A fable is a short story, often with talking animals, that teaches a lesson called a moral. In Aesop's fable The Lion and the Mouse, a lion catches a tiny mouse but lets it go. Later the lion is trapped in a hunter's net. The mouse hears him roar, chews through the ropes and sets him free. The moral: no act of kindness is ever wasted, and even the small can help the great.",
      "A folktale is a story people passed along by telling it aloud, long before it was written down. In the folktale Stone Soup, hungry travelers come to a village where no one will share. They set a pot of water over a fire and drop in a stone. Curious villagers each add a little something: a carrot, an onion, some barley. Soon there is a delicious soup for everyone. The lesson: when everyone shares a little, there is plenty for all.",
      "A myth is an old story that people once told to explain the world or to teach wisdom. In the Greek myth of King Midas, the king wishes that everything he touches will turn to gold. At first he is thrilled. Then his bread turns to gold, and he cannot eat. He learns that greed can cost us what we truly need.",
      "The central message is the big lesson of the story. The story rarely says it out loud. You find it by asking: What did the character learn? What happened because of their choices? Good readers answer questions with proof from the text, pointing to the exact words that show it.",
    ].join("\n\n"),
    keyIdeas: [
      "A fable is a short story, often with animals, that teaches a moral.",
      "Folktales were passed along by telling; myths were told to explain the world or teach wisdom.",
      "The central message is the big lesson. Find it by asking what the character learned.",
      "Prove your answers by pointing to the exact words in the story.",
    ],
    hook: {
      text: "Long, long ago, there were no books in most homes. So how did grandparents teach children to be kind, brave and wise? They told stories by the fire. Some of those stories are so good that we still tell them today!",
    },
    teach: [
      {
        title: "Fables and Their Morals",
        teach:
          "A fable is a short story that teaches a lesson called a moral. The characters are often talking animals, and each animal stands for a kind of person. Many famous fables are said to come from Aesop, a storyteller in ancient Greece. In The Tortoise and the Hare, a speedy hare is so sure he will win a race that he takes a nap. The slow tortoise keeps plodding along and crosses the finish line first. The moral is slow and steady wins the race. To find a moral, look at the ending. Who learned a lesson, and what was it?",
        visual: {
          type: "flip",
          cards: [
            { front: "Fable", back: "A short story, often with talking animals, that teaches a moral." },
            { front: "Moral", back: "The lesson a fable teaches, like 'slow and steady wins the race.'" },
            { front: "Aesop", back: "A storyteller from ancient Greece. Hundreds of fables are said to be his." },
            { front: "Central message", back: "The big lesson or idea of any story." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Read each tiny fable. Match it to its moral.",
          pairs: [
            { left: "A fast hare naps during a race. A slow tortoise keeps going and wins.", right: "Slow and steady wins the race." },
            { left: "A boy shouts 'Wolf!' as a joke, again and again. When a real wolf comes, nobody believes him.", right: "People stop believing someone who lies." },
            { left: "An ant stores food all summer. A grasshopper sings all summer and is hungry in winter.", right: "Work today to be ready for tomorrow." },
            { left: "A lion lets a mouse go. Later the mouse chews the lion free from a net.", right: "Even the small can help the great." },
          ],
          hint: "Look at the ending of each fable. Who learned a lesson, and what happened because of their choice?",
          mistakes: [{ match: "ant and grasshopper matched to slow and steady", coach: "The grasshopper didn't lose a race. He went hungry because he didn't prepare. That is about working ahead." }],
          seconds: 60,
        },
        think: {
          q: "What is the moral of The Tortoise and the Hare?",
          choices: ["Hares are faster than tortoises", "Slow and steady wins the race", "Naps are good for you", "Races are not fair"],
          answer: 1,
          why: "The tortoise won by never giving up, while the proud hare stopped to nap.",
          hints: [
            "That's a fact about animals, not a lesson. And in the story, the hare lost!",
            "",
            "The nap is the reason the hare lost. The story doesn't praise his nap.",
            "The race was fair. Think about why the tortoise won.",
          ],
        },
        approaches: {
          analogy:
            "A fable is like a gift box. The story is the wrapping paper, fun to look at. The moral is the gift inside. You have to open the story up to find it.",
          example:
            "In The Ant and the Grasshopper, the ant works all summer storing food while the grasshopper plays. When winter comes, the ant has food and the grasshopper is hungry. The lesson the grasshopper learns: work today to be ready for tomorrow.",
          simpler: {
            q: "What is a moral?",
            choices: ["The lesson a story teaches", "The name of the main animal"],
            answer: 0,
            why: "A moral is the lesson of a fable.",
            hints: ["", "The animal is a character. The moral is what the story teaches us."],
          },
        },
      },
      {
        title: "Folktales and Myths",
        teach:
          "A folktale is a story that people passed along by telling it aloud for hundreds of years. In Stone Soup, hungry travelers come to a village where nobody will share food. They put a pot of water on a fire and drop in a stone. The curious villagers each bring something: a carrot, an onion, some barley. Soon there is a delicious soup for everyone. A myth is an old story once told to explain the world or teach wisdom. In the Greek myth of King Midas, everything the king touches turns to gold, even his bread. He learns that greed can cost us what we truly need.",
        visual: {
          type: "compare",
          left: {
            title: "Folktale",
            points: ["Passed along by telling it aloud", "Often about ordinary people, clever travelers or tricksters", "Example: Stone Soup teaches sharing"],
          },
          right: {
            title: "Myth",
            points: ["Told long ago to explain the world or teach wisdom", "Often has gods, heroes or magic", "Example: King Midas warns about greed"],
          },
        },
        probe: {
          type: "sequence",
          prompt: "Put the events of Stone Soup in order.",
          steps: [
            "Hungry travelers come to a village where nobody will share.",
            "They set a pot of water over a fire and drop in a stone.",
            "Curious villagers each add a carrot, an onion or some barley.",
            "There is a delicious soup, and everyone eats together.",
          ],
          hint: "Start with the problem (hungry travelers), then the trick, then the sharing, then the happy ending.",
          mistakes: [{ match: "soup first", coach: "The soup can't be ready before anyone adds food. What happened first?" }],
          seconds: 40,
        },
        think: {
          q: "What does King Midas learn?",
          choices: ["Gold is the best thing in the world", "Kings should eat more bread", "Greed can cost us what we truly need", "Wishes always come true"],
          answer: 2,
          why: "His golden touch turns even his food to gold, so he learns that being greedy can take away what matters most.",
          hints: [
            "That's what Midas believed at the start. The ending shows he changed his mind.",
            "The bread is a detail. What bigger lesson does the bread teach him?",
            "",
            "His wish did come true, and that was the problem! Think about what he learned from it.",
          ],
        },
        approaches: {
          analogy:
            "Stone Soup is like a class party where everyone brings one dish. Alone, nobody has a feast. Together, the table is full.",
          example:
            "Here's how to find the message of Stone Soup. At the start, nobody shares. At the end, everyone eats because each person added a little. So the message is: when everyone shares a little, there is plenty for all.",
          simpler: {
            q: "In Stone Soup, did the stone really make the soup tasty?",
            choices: ["Yes, it was a magic stone", "No, the food people shared made it tasty"],
            answer: 1,
            why: "The stone was just a trick to get people sharing. The carrots, onions and barley made the soup.",
            hints: ["The story never says the stone is magic. What did the villagers drop into the pot?", ""],
          },
        },
      },
      {
        title: "Finding the Message, with Proof",
        teach:
          "The central message is the big lesson of a story, and the story almost never says it out loud. You find it like a detective. First, ask what the main character wanted. Next, ask what happened because of their choices. Then ask what they learned by the end. When someone asks you a question about a story, prove your answer. Point to the exact words in the text that show it. For example, how do we know the mouse was grateful? The text says he chewed through the ropes to set the lion free. That is your proof.",
        visual: {
          type: "hotspots",
          title: "Detective questions for any story",
          center: "Central message",
          spots: [
            { label: "Want", icon: "🎯", detail: "What did the main character want?" },
            { label: "Choices", icon: "🔀", detail: "What happened because of their choices?" },
            { label: "Learned", icon: "💡", detail: "What did they learn by the end?" },
            { label: "Proof", icon: "🔍", detail: "Which exact words in the story show it?" },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "The moral of this fable is 'Little by little does the trick.' Tap the TWO sentences that prove it best.",
          sentences: [
            "A thirsty crow found a tall pitcher with a little water at the bottom.",
            "Her beak could not reach the water.",
            "She dropped in one pebble, then another, then another.",
            "Little by little, the water rose to the top.",
            "She drank until she was no longer thirsty.",
          ],
          correct: [2, 3],
          hint: "Look for the sentences where the crow does something a little at a time, and where it starts to work.",
          mistakes: [{ match: "first sentence", coach: "That sentence sets up the problem. The proof is where she solves it bit by bit." }],
          seconds: 45,
        },
        think: {
          q: "How do you prove an answer about a story?",
          choices: ["Say it louder", "Point to the exact words in the text that show it", "Say that you just know", "Ask someone else"],
          answer: 1,
          why: "Text evidence means the words in the story that show your answer is right.",
          hints: [
            "Being loud doesn't prove anything. What in the story backs you up?",
            "",
            "Readers need more than a feeling. Show them where the story says it.",
            "Others can help, but the proof is in the text itself.",
          ],
        },
        approaches: {
          analogy:
            "Finding text evidence is like a detective showing a footprint. Saying 'the fox did it' isn't enough. You point to the clue that proves it.",
          example:
            "Question: was the hare too proud? Proof: the story says he was so sure he would win that he took a nap in the middle of the race. Those words show his pride.",
          simpler: {
            q: "Where do you find proof for an answer about a story?",
            choices: ["In the words of the story", "In a different book"],
            answer: 0,
            why: "Text evidence comes from the story you are reading.",
            hints: ["", "A different book tells a different story. The proof is in this one."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each detail from The Lion and the Mouse: does it help show the message 'even the small can help the great', or is it just a detail?",
      buckets: ["Shows the message", "Just a detail"],
      items: [
        { text: "The tiny mouse chews through the hunter's ropes.", bucket: 0 },
        { text: "The mighty lion is trapped and can't get free alone.", bucket: 0 },
        { text: "The lion lets the mouse go instead of eating it.", bucket: 0 },
        { text: "The story happens in a forest.", bucket: 1 },
        { text: "The lion has a loud roar.", bucket: 1 },
        { text: "The hunters used a net made of rope.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Pick one story from today (The Lion and the Mouse, Stone Soup or King Midas). Retell it in a few sentences, tell its central message, and give your proof from the story.",
      keyPoints: [
        "Retells the beginning, middle and end in order",
        "States the central message or moral",
        "Gives a detail from the story as proof",
        "Says what the character learned",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A fable is a short story that teaches a {0}. A {1} is an old story once told to explain the world or teach wisdom. A {2} was passed along by people telling it aloud.",
        blanks: [{ answers: ["moral"] }, { answers: ["myth"] }, { answers: ["folktale"] }],
        bank: ["moral", "myth", "folktale", "recipe", "map"],
        hint: "Fables teach morals. Myths explain the world. Folktales were told aloud for many years.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each story to its central message.",
        pairs: [
          { left: "King Midas", right: "Greed can cost us what we truly need." },
          { left: "Stone Soup", right: "When everyone shares a little, there is plenty for all." },
          { left: "The Crow and the Pitcher", right: "Little by little does the trick." },
          { left: "The Boy Who Cried Wolf", right: "People stop believing someone who lies." },
        ],
        hint: "Think about what each main character learned by the end.",
        seconds: 45,
      },
      {
        type: "sequence",
        prompt: "Put The Lion and the Mouse in order.",
        steps: [
          "A lion catches a tiny mouse.",
          "The lion lets the mouse go.",
          "Hunters trap the lion in a net.",
          "The mouse chews through the ropes and frees the lion.",
        ],
        hint: "The kindness comes first, and the mouse pays it back at the end.",
        seconds: 35,
      },
      {
        type: "highlight",
        prompt: "The moral is: some people pretend they don't want what they can't have. Tap the sentence that is the best proof.",
        sentences: [
          "A hungry fox saw ripe grapes hanging high on a vine.",
          "He jumped and jumped, but he could not reach them.",
          "At last he walked away with his nose in the air.",
          "'Those grapes are probably sour anyway,' he said.",
        ],
        correct: [3],
        hint: "Find where the fox pretends he never wanted the grapes after all.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is a fable?",
        choices: ["A true story about a real person", "A short story that teaches a moral, often with talking animals", "A list of facts about animals"],
        answer: 1,
        why: "Fables are short made-up stories, often with animals, that teach a lesson.",
      },
      {
        q: "What is the central message of Stone Soup?",
        choices: ["Stones make good soup", "Travelers should stay home", "Never trust a stranger", "When everyone shares a little, there is plenty for all"],
        answer: 3,
        why: "Each villager added a little food, and together they made a feast.",
      },
      {
        q: "Which is the best proof that the mouse helped the lion?",
        choices: ["The lion was big and strong.", "The mouse chewed through the ropes and set him free.", "The story happened long ago."],
        answer: 1,
        why: "Those words show exactly what the mouse did to help.",
      },
      {
        q: "How can you find a story's central message?",
        choices: ["Ask what the character learned by the end", "Count the characters", "Look at the title only", "Find the longest word"],
        answer: 0,
        why: "The lesson usually shows in what the character learns from their choices.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Become a storyteller! Pick a fable, folktale or myth from today or one you know, and tell it to your family by heart, without reading. At the end, ask your listeners to guess the moral, then tell them the moral and the part of the story that proves it.",
      rubric: [
        "Tells the story in order: beginning, middle and end",
        "Speaks clearly at a pace listeners can follow",
        "Names the moral or central message",
        "Points to a part of the story as proof",
      ],
    },
  },

  // 3. Characters, comparing stories, point of view and pictures
  {
    id: "ela-3.characters",
    title: "Characters, Point of View and Pictures",
    minutes: 35,
    stage: "logic",
    standards: ["RL.3.3", "RL.3.6", "RL.3.7", "RL.3.9", "RL.3.1"],
    read: [
      "Characters are the people or animals in a story. To understand a character, a good reader looks at three things. Traits are what a character is like inside, such as brave, greedy, clever or kind. Feelings are how a character feels at one moment, such as scared or proud. Motivation is the reason a character does something: what do they want?",
      "Characters' actions make the story move. In Aesop's fable The Fox and the Crow, a crow sits in a tree with a piece of cheese. A hungry fox wants the cheese. He tells the crow she must have the most beautiful voice in the forest. The proud crow opens her beak to sing, and the cheese drops right down to the fox. The fox is sly, his motivation is hunger, and his trick causes the whole ending.",
      "Aesop told another fox story, The Fox and the Stork. The fox invites the stork to dinner and serves soup in a flat dish. The stork, with her long beak, cannot eat a drop. Later the stork invites the fox and serves food in a tall, narrow jar. Now the fox goes hungry. Both stories have a sly fox who plays a trick, but in the second one the trick comes back on him. Comparing stories by the same author helps you see the lessons that author cared about.",
      "Every story has a point of view. If the narrator says I and me, a character is telling the story. If the narrator says he, she and they, someone outside the story is telling it. Your own point of view can be different. The fox thought his trick was clever. You might think it was unkind.",
      "Pictures tell part of the story too. An illustration can show a character's face, the setting and the mood that the words leave out.",
    ].join("\n\n"),
    keyIdeas: [
      "Traits are what a character is like; feelings change; motivation is what a character wants.",
      "Characters' actions cause the events of the story.",
      "Comparing stories by the same author shows the lessons that author cared about.",
      "Know who is telling the story, and know that your own view can be different. Pictures add to the words.",
    ],
    hook: {
      text: "Picture a fox sitting under a tall tree, staring up at a crow with a piece of cheese. The fox has no ladder and cannot fly. But he has a plan. What kind of character makes a plan like that?",
    },
    teach: [
      {
        title: "Traits, Feelings and Motivations",
        teach:
          "To know a character, look at three things. Traits are what a character is like inside, most of the time: brave, honest, greedy, patient. Feelings are how a character feels at one moment: scared, excited, embarrassed. Feelings change quickly, but traits mostly stay the same. Motivation is the reason a character does something. Ask: what do they want? You figure these out from what a character says and does. If a girl walks into a dark cave to find her lost dog, her action tells you she is brave. Her motivation is love for her dog.",
        visual: {
          type: "flip",
          cards: [
            { front: "Trait", back: "What a character is like inside, most of the time: brave, honest, greedy, patient." },
            { front: "Feeling", back: "How a character feels right now: scared, excited, embarrassed. Feelings change." },
            { front: "Motivation", back: "The reason a character acts. Ask: what do they want?" },
            { front: "Clues", back: "What a character says and does shows their traits and feelings." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each word: is it a trait (what a character is like) or a feeling (how they feel right now)?",
          buckets: ["Trait", "Feeling"],
          items: [
            { text: "honest", bucket: 0 },
            { text: "brave", bucket: 0 },
            { text: "greedy", bucket: 0 },
            { text: "patient", bucket: 0 },
            { text: "scared", bucket: 1 },
            { text: "excited", bucket: 1 },
            { text: "embarrassed", bucket: 1 },
            { text: "surprised", bucket: 1 },
          ],
          hint: "A trait is true most of the time. A feeling comes and goes. Could you feel it for just one minute? Then it's a feeling.",
          mistakes: [{ match: "brave sorted as feeling", coach: "Brave describes what a person is like, again and again. That makes it a trait." }],
          seconds: 45,
        },
        think: {
          q: "A boy returns the extra coin the baker gave him by mistake. What trait does this show?",
          choices: ["Greedy", "Honest", "Lazy", "Scared"],
          answer: 1,
          why: "Giving back money that isn't yours shows honesty.",
          hints: [
            "A greedy person would keep the coin. He gave it back.",
            "",
            "Walking back to return the coin takes effort. That isn't lazy.",
            "Scared is a feeling, and nothing in the story shows fear.",
          ],
        },
        approaches: {
          analogy:
            "A trait is like the color of a house: it stays the same day after day. A feeling is like the weather outside the house: sunny one minute, stormy the next.",
          example:
            "In The Ant and the Grasshopper, the ant works hard all summer. Her trait: hardworking. Her motivation: she wants food for winter. Her feeling in winter: calm and safe, while the grasshopper feels hungry and sorry.",
          simpler: {
            q: "Which one is a feeling?",
            choices: ["Excited", "Honest"],
            answer: 0,
            why: "Excited is how you feel at one moment. It comes and goes.",
            hints: ["", "Honest is what a person is like most of the time. That's a trait."],
          },
        },
      },
      {
        title: "Actions Move the Story",
        teach:
          "Characters' actions make things happen, one after another. In The Fox and the Crow, a crow sits in a tree with a piece of cheese. A hungry fox wants it. He tells the crow she must have the most beautiful voice in the forest. The proud crow opens her beak to sing, and the cheese drops right down to the fox. See the chain? The fox's motivation is hunger. His sly trick makes the crow sing. Her singing makes the cheese fall. When you explain a story, tell how each action leads to the next event.",
        visual: {
          type: "sequence",
          prompt: "Follow the chain of events in The Fox and the Crow.",
          steps: [
            "A crow sits in a tree with a piece of cheese.",
            "The hungry fox praises the crow's voice.",
            "The proud crow opens her beak to sing.",
            "The cheese drops down to the fox.",
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each action to what it caused.",
          pairs: [
            { left: "The fox praises the crow's voice.", right: "The crow opens her beak to sing." },
            { left: "The crow opens her beak.", right: "The cheese falls to the ground." },
            { left: "The fox serves soup in a flat dish.", right: "The stork cannot eat a drop." },
            { left: "The stork serves food in a tall jar.", right: "The fox goes home hungry." },
          ],
          hint: "Ask: because this happened, what happened next?",
          seconds: 45,
        },
        think: {
          q: "Why did the crow open her beak?",
          choices: ["She was yawning", "The fox's praise made her proud, and she wanted to sing", "She wanted to give the fox the cheese", "She was calling her friends"],
          answer: 1,
          why: "The fox flattered her voice, and her pride made her sing.",
          hints: [
            "The story never says she was tired. What did the fox say just before?",
            "",
            "She didn't mean to lose the cheese. The fox tricked her.",
            "No friends appear in the story. Look at what the fox said to her.",
          ],
        },
        approaches: {
          analogy:
            "A story is like a row of dominoes. One character's action knocks over the next domino, and that one knocks over the next, all the way to the ending.",
          example:
            "In The Tortoise and the Hare, the hare is proud (trait). Because he is proud, he naps (action). Because he naps, the tortoise passes him (event). Because of that, the tortoise wins (ending).",
          simpler: {
            q: "What did the fox want?",
            choices: ["The crow's cheese", "A new friend"],
            answer: 0,
            why: "He was hungry, so his motivation was the cheese.",
            hints: ["", "The fox wasn't looking for a friend. He was hungry."],
          },
        },
      },
      {
        title: "Same Author, Two Stories",
        teach:
          "Aesop told another fox story, The Fox and the Stork. The fox invites the stork to dinner and serves soup in a flat dish. The stork, with her long, thin beak, cannot eat a drop. Later the stork invites the fox and serves food in a tall, narrow jar. Now the fox goes hungry! Let's compare. Both stories have a sly fox who plays a trick about food. But in the first story the trick works, and in the second it comes back on him. Comparing stories by the same author shows you the lessons that author cared about, like being wise about flattery and treating others fairly.",
        visual: {
          type: "compare",
          left: {
            title: "The Fox and the Crow",
            points: ["Setting: a tree in the forest", "The fox tricks a proud crow with praise", "The trick works: the fox gets the cheese", "Lesson: don't be fooled by flattery"],
          },
          right: {
            title: "The Fox and the Stork",
            points: ["Setting: two dinners at two homes", "The fox tricks the stork with a flat dish", "The trick comes back: the fox goes hungry", "Lesson: treat others the way you want to be treated"],
          },
        },
        probe: {
          type: "sort",
          prompt: "Compare the two Aesop stories. Where does each detail belong?",
          buckets: ["Only The Fox and the Crow", "Only The Fox and the Stork", "Both stories"],
          items: [
            { text: "A sly fox plays a trick", bucket: 2 },
            { text: "Told by Aesop", bucket: 2 },
            { text: "The trick is about food", bucket: 2 },
            { text: "Cheese falls from a tree", bucket: 0 },
            { text: "A proud bird is fooled by praise", bucket: 0 },
            { text: "Soup is served in a flat dish", bucket: 1 },
            { text: "The trickster gets tricked back", bucket: 1 },
          ],
          hint: "Picture each story. Did it have cheese or soup? Did the fox win or go hungry? Things true in both go in the middle bucket.",
          seconds: 60,
        },
        think: {
          q: "How are the two fox stories different?",
          choices: ["Only one has a fox", "In The Fox and the Stork, the fox's trick comes back on him", "Only one was told by Aesop", "Only one is about food"],
          answer: 1,
          why: "The crow loses her cheese to the fox, but the stork tricks the fox right back.",
          hints: [
            "Both stories have a sly fox. Look at how each one ends.",
            "",
            "Aesop told both of them. Look at what happens to the fox.",
            "Both tricks are about food: cheese and soup. Look at who wins.",
          ],
        },
        approaches: {
          analogy:
            "Comparing two stories by one author is like tasting two soups from the same cook. They are different soups, but you start to notice the cook's favorite spices.",
          example:
            "Same: both have a sly fox and a trick about food. Different: the crow is fooled, but the stork is wise and turns the trick around. Lesson from both: tricks and flattery can't be trusted.",
          simpler: {
            q: "Who told both fox stories?",
            choices: ["Aesop", "The crow"],
            answer: 0,
            why: "Both are Aesop's fables.",
            hints: ["", "The crow is a character inside a story, not the storyteller."],
          },
        },
      },
      {
        title: "Who Is Telling? What Do Pictures Show?",
        teach:
          "Every story has a narrator, the voice telling it. If the narrator says I and me, a character is telling the story. That is first person. If the narrator says he, she and they, someone outside the story is telling it. That is third person. Your own point of view can be different from a character's. The fox thought his trick was clever. You might think it was unkind, and that's fine! Pictures tell part of the story too. An illustration can show a character's face, the setting and the mood, things the words might leave out.",
        visual: {
          type: "flip",
          cards: [
            { front: "Narrator", back: "The voice that tells the story." },
            { front: "First person", back: "A character tells the story using I and me." },
            { front: "Third person", back: "Someone outside the story tells it using he, she and they." },
            { front: "Your point of view", back: "What YOU think. It can be different from what a character thinks." },
            { front: "Illustration", back: "A picture that shows faces, the setting and the mood." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the sentences told in the FIRST person, by a character in the story.",
          sentences: [
            "I hopped onto the branch with my cheese.",
            "The fox looked up at the crow.",
            "My stomach growled as I smelled the soup.",
            "She could not reach the food with her long beak.",
            "The stork smiled at her guest.",
          ],
          correct: [0, 2],
          hint: "Look for the words I, me and my. Those show a character is telling the story.",
          mistakes: [{ match: "She could not reach", coach: "She is a third-person word. Someone outside the story is talking about her." }],
          seconds: 40,
        },
        think: {
          q: "'The fox grinned as the cheese fell.' Who is telling this?",
          choices: ["The fox, in first person", "The crow, in first person", "A narrator outside the story, in third person"],
          answer: 2,
          why: "The sentence says 'the fox', not 'I', so someone outside the story is telling it.",
          hints: [
            "If the fox were telling it, he would say 'I grinned.'",
            "If the crow were telling it, she would use I or me.",
            "",
          ],
        },
        approaches: {
          analogy:
            "First person is like a friend telling you about their own day: 'I fell off my bike!' Third person is like a sports announcer describing the players: 'She kicks the ball!'",
          example:
            "First person: 'I worked all summer, and now I have food.' Third person: 'The ant worked all summer, and now she has food.' Same event, different storyteller.",
          simpler: {
            q: "Which word shows a story is told in the first person?",
            choices: ["I", "they"],
            answer: 0,
            why: "I means the speaker is a character in the story.",
            hints: ["", "They is a third-person word. It talks about other people."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort what we know about the fox in The Fox and the Stork.",
      buckets: ["Trait (what he is like)", "Feeling (right now)", "Motivation (what he wants)"],
      items: [
        { text: "He is sly and loves a trick.", bucket: 0 },
        { text: "He is not very kind to his guests.", bucket: 0 },
        { text: "He feels hungry and grumpy at the stork's dinner.", bucket: 1 },
        { text: "He feels embarrassed when he can't reach the food.", bucket: 1 },
        { text: "He wants to laugh at the stork.", bucket: 2 },
        { text: "He wants to keep all the soup for himself.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Describe the fox from Aesop's stories. Tell one trait, what he wants, how his actions change the story, and what YOU think of his tricks.",
      keyPoints: [
        "Names a trait like sly or tricky",
        "Tells his motivation, such as wanting food",
        "Explains how his trick causes what happens next",
        "Gives their own point of view, which may differ from the fox's",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each trait to the action that shows it.",
        pairs: [
          { left: "brave", right: "She walked into the dark cave to find her lost dog." },
          { left: "honest", right: "He returned the extra coin the baker gave him." },
          { left: "patient", right: "She waited all spring for her seeds to sprout." },
          { left: "greedy", right: "He took every cookie and left none for his sister." },
        ],
        hint: "Ask: what does this action tell me about what the person is like inside?",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "When the narrator says I and me, the story is told in the {0} person. When the narrator says he and she, it is told in the {1} person.",
        blanks: [{ answers: ["first"] }, { answers: ["third"] }],
        bank: ["first", "third", "fifth", "last"],
        hint: "First person: a character says I. Third person: someone outside the story says he and she.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build a sentence that explains the fox's motivation in The Fox and the Crow.",
        tiles: ["The fox", "praised the crow", "because", "he wanted", "her cheese."],
        distractors: ["the stork", "so"],
        hint: "Start with who acted, then what he did, then why he did it.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put The Fox and the Stork in order.",
        steps: [
          "The fox invites the stork to dinner.",
          "He serves soup in a flat dish, and the stork can't eat.",
          "The stork invites the fox to her home.",
          "She serves food in a tall jar, and the fox goes hungry.",
        ],
        hint: "The fox's trick comes first, then the stork's turn.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which word names a character's motivation?",
        choices: ["What the character looks like", "Where the story happens", "What the character wants"],
        answer: 2,
        why: "Motivation is the reason a character acts: what they want.",
      },
      {
        q: "'I climbed the hill to find my sheep.' What point of view is this?",
        choices: ["First person", "Third person", "No narrator"],
        answer: 0,
        why: "The words I and my show a character is telling the story.",
      },
      {
        q: "What do both of Aesop's fox stories have?",
        choices: ["A crow with cheese", "A sly fox who plays a trick about food", "A stork with a flat dish", "A happy ending for the fox"],
        answer: 1,
        why: "Both have a tricky fox, and both tricks are about food.",
      },
      {
        q: "What can an illustration add to a story?",
        choices: ["The page number", "The author's name", "The mood, the setting and a character's face", "Nothing at all"],
        answer: 2,
        why: "Pictures can show things the words leave out, like how a character looks or the mood.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a character card. Pick a character from a book you are reading. Draw them, and write one trait, one feeling they have at some point, and what they want. Then find a sentence from the book that proves the trait, and copy it onto the card.",
      rubric: [
        "Names a trait, a feeling and a motivation, and they fit the character",
        "Copies a real sentence from the book as proof",
        "Drawing shows something about the character (face, setting or mood)",
        "Can tell a parent how one of the character's actions changed the story",
      ],
    },
  },

  // 4. Stories, plays and poems; literal and nonliteral language; shades of meaning; reading aloud
  {
    id: "ela-3.stories-plays-poems",
    title: "Chapters, Scenes, Stanzas and Colorful Language",
    minutes: 35,
    stage: "grammar",
    standards: ["RL.3.4", "RL.3.5", "L.3.5", "SL.3.5", "RF.3.4"],
    read: [
      "Stories, plays and poems are built in different ways, and each kind has its own words for its parts.",
      "A long story, like a chapter book, is split into chapters. Each chapter builds on the one before it, so you need to remember what already happened. A play, also called a drama, is written to be acted out. It is split into scenes. A play has a cast of characters listed at the start, dialogue that tells each actor what to say, and stage directions, often in parentheses, that tell actors what to do. A poem is split into stanzas, which are groups of lines, like paragraphs in a poem. Many poems use rhyme and rhythm.",
      "Writers love to play with words. Literal language means exactly what the words say. Nonliteral language means something different from the words. If it is raining cats and dogs, no pets are falling from the sky; it is raining very hard. When someone says a test was a piece of cake, they mean it was easy. These sayings are called idioms. Ask yourself: does this make sense if I take it word for word? If not, it is probably nonliteral.",
      "Words that mean almost the same thing can still have different shades of meaning. If you suspected something, you were not sure. If you believed it, you were fairly sure. If you knew it, you were completely sure. Small, tiny and enormous all describe size, but very differently. Good writers pick the word with exactly the right shade.",
      "Stories and poems are made to be read aloud. Read with expression: let your voice go up at a question mark, sound excited at an exclamation point and pause at a period. Read at a pace your listener can follow. Practice a poem a few times, and you can record it to share.",
    ].join("\n\n"),
    keyIdeas: [
      "Stories have chapters, plays have scenes, and poems have stanzas. Each part builds on the one before.",
      "Literal language means exactly what it says; nonliteral language, like an idiom, means something else.",
      "Similar words can have different shades of meaning: suspected, believed, knew.",
      "Read aloud with expression and at a pace your listener can follow.",
    ],
    hook: {
      text: "Grandpa Aesop looked out the window and said, 'It's raining cats and dogs!' His grandson ran to the window to see the puppies. But all he saw was rain. What happened?",
    },
    teach: [
      {
        title: "Chapters, Scenes and Stanzas",
        teach:
          "Stories, plays and poems are built in different ways. A long story, like a chapter book, is split into chapters. Each chapter builds on the one before, so remember what already happened. A play, also called a drama, is written to be acted out on a stage. It is split into scenes. A play starts with a cast of characters, then gives dialogue, the words each actor says. Stage directions, often in parentheses, tell actors what to do, like (yawns and stretches). A poem is split into stanzas, groups of lines that work like paragraphs. Many poems use rhyme and rhythm.",
        visual: {
          type: "hotspots",
          title: "Three ways to build a story",
          center: "Literature",
          spots: [
            { label: "Chapter", icon: "📕", detail: "A part of a long story. Each chapter builds on the one before." },
            { label: "Scene", icon: "🎭", detail: "A part of a play. The setting or time often changes between scenes." },
            { label: "Stage directions", icon: "🎬", detail: "Words in a play that tell actors what to do, like (yawns and stretches)." },
            { label: "Stanza", icon: "📜", detail: "A group of lines in a poem, like a paragraph in a poem." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each part: does it belong to a story, a play or a poem?",
          buckets: ["Story", "Play", "Poem"],
          items: [
            { text: "chapter", bucket: 0 },
            { text: "paragraphs", bucket: 0 },
            { text: "scene", bucket: 1 },
            { text: "cast of characters", bucket: 1 },
            { text: "stage directions", bucket: 1 },
            { text: "stanza", bucket: 2 },
            { text: "lines that rhyme", bucket: 2 },
          ],
          hint: "Plays are acted out on a stage, so they need scenes and directions for actors. Poems are built from lines and stanzas.",
          mistakes: [{ match: "stanza sorted as play", coach: "A stanza is a group of lines in a poem." }],
          seconds: 45,
        },
        think: {
          q: "In a play, what tells the actors what to do?",
          choices: ["The stanzas", "The stage directions", "The chapter titles", "The rhymes"],
          answer: 1,
          why: "Stage directions, often in parentheses, tell actors how to move and act.",
          hints: [
            "Stanzas are groups of lines in a poem, not a play.",
            "",
            "Chapters belong to long stories, not plays.",
            "Rhymes are sounds in poems. They don't tell actors what to do.",
          ],
        },
        approaches: {
          analogy:
            "Chapters, scenes and stanzas are like the cars of a train. Each car is hooked to the one before it, and you need all of them in order to get to the end of the line.",
          example:
            "Here's a tiny play. Cast: Fox, Stork. Scene 1, the fox's house. FOX: (sets down a flat dish) Enjoy your soup! STORK: (taps the dish with her beak) I can't eat a drop! The words in parentheses are stage directions.",
          simpler: {
            q: "What is a stanza?",
            choices: ["A group of lines in a poem", "A part of a play"],
            answer: 0,
            why: "Stanzas are the 'paragraphs' of a poem.",
            hints: ["", "Parts of a play are called scenes."],
          },
        },
      },
      {
        title: "Literal and Nonliteral Language",
        teach:
          "Literal language means exactly what the words say. 'The dog ran to the door' is literal. Nonliteral language means something different from the exact words. When Grandpa says it's raining cats and dogs, no pets fall from the sky. He means it is raining very hard. Sayings like this are called idioms. If a test was a piece of cake, it was easy. If someone says hold your horses, they mean wait a moment. To catch nonliteral language, ask: does this make sense word for word? If not, think about what the speaker really means.",
        visual: {
          type: "flip",
          cards: [
            { front: "It's raining cats and dogs.", back: "It's raining very hard." },
            { front: "That test was a piece of cake.", back: "That test was easy." },
            { front: "Hold your horses!", back: "Wait a moment. Slow down." },
            { front: "I'm all ears.", back: "I'm listening carefully." },
            { front: "Break a leg!", back: "Good luck! (said to actors before a show)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each idiom to what it really means.",
          pairs: [
            { left: "It's raining cats and dogs.", right: "It's raining very hard." },
            { left: "That was a piece of cake.", right: "That was easy." },
            { left: "Hold your horses.", right: "Wait a moment." },
            { left: "I'm all ears.", right: "I'm listening carefully." },
            { left: "Let the cat out of the bag.", right: "Told a secret." },
          ],
          hint: "Don't picture the words. Picture when people say them. What would they really mean?",
          seconds: 50,
        },
        think: {
          q: "Sam says, 'I'm so hungry I could eat a horse!' What does he really mean?",
          choices: ["He wants to eat a horse", "He is very hungry", "He is riding a horse", "He is not hungry"],
          answer: 1,
          why: "It's nonliteral. He's saying he is very, very hungry.",
          hints: [
            "Taken word for word it sounds silly. That's a clue it's nonliteral.",
            "",
            "Nobody is riding anything. Think about the word hungry.",
            "He says he is so hungry. That's the opposite of not hungry.",
          ],
        },
        approaches: {
          analogy:
            "An idiom is like a secret code that everyone who speaks the language knows. The words say one thing, but the code means another.",
          example:
            "'My little brother let the cat out of the bag about my birthday present.' There is no cat and no bag. It means he told the secret.",
          simpler: {
            q: "Which sentence is literal?",
            choices: ["The dog ran to the door.", "It's raining cats and dogs."],
            answer: 0,
            why: "The dog really ran to the door. The words mean exactly what they say.",
            hints: ["", "Cats and dogs don't really fall from the sky. That's nonliteral."],
          },
        },
      },
      {
        title: "Shades of Meaning",
        teach:
          "Some words mean almost the same thing, but not quite. They are like shades of one color, from light blue to dark blue. If you suspected the cookie jar was empty, you thought so but weren't sure. If you believed it, you were fairly sure. If you knew it, you were completely sure because you looked! Tiny, small, large and enormous all tell size, from smallest to biggest. Whisper, talk and shout tell how loud. Good writers choose the word with exactly the right shade, so the reader sees just what they mean.",
        visual: {
          type: "flip",
          cards: [
            { front: "suspected", back: "Thought so, but not sure." },
            { front: "believed", back: "Fairly sure." },
            { front: "knew", back: "Completely sure." },
            { front: "nibble, bite, gobble", back: "Eating: from tiny bits to eating very fast." },
            { front: "whisper, talk, shout", back: "Speaking: from quietest to loudest." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put these words in order, from smallest to biggest.",
          steps: ["tiny", "small", "large", "enormous"],
          hint: "Picture an ant, a cat, a horse and a whale. Which word fits each?",
          seconds: 30,
        },
        think: {
          q: "Mia saw the empty jar with her own eyes. Which word fits best? 'Mia ___ the cookies were gone.'",
          choices: ["suspected", "guessed", "knew"],
          answer: 2,
          why: "She saw it herself, so she was completely sure. She knew.",
          hints: [
            "Suspected means she wasn't sure. But she saw it with her own eyes!",
            "Guessing is for when you can't see. She looked right at it.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Shades of meaning are like the volume knob on a speaker. Whisper, talk and shout are the same idea, speaking, turned up louder and louder.",
          example:
            "Grandpa heard a noise in the kitchen. He suspected the cat. He believed it was the cat when he saw muddy paw prints. He knew it was the cat when he found her sitting in the sink!",
          simpler: {
            q: "Which word is louder?",
            choices: ["whisper", "shout"],
            answer: 1,
            why: "A shout is much louder than a whisper.",
            hints: ["A whisper is very quiet. Look for the louder word.", ""],
          },
        },
      },
      {
        title: "Reading Aloud Like a Storyteller",
        teach:
          "Stories and poems come alive when you read them aloud. Read with expression, using the punctuation as your guide. At a period, pause a moment. At a question mark, let your voice go up, like you are really asking. At an exclamation point, sound excited or surprised. Read at a pace your listener can follow: not racing, not crawling. Give each character their own voice. Practice a poem three times, and each time it will sound smoother. Then you can record yourself reading it and add a drawing to share with your family.",
        visual: {
          type: "hotspots",
          title: "Punctuation is a map for your voice",
          center: "Read aloud",
          spots: [
            { label: "Period .", icon: "⏸️", detail: "Pause a moment before the next sentence." },
            { label: "Question mark ?", icon: "⤴️", detail: "Let your voice go up, like you're really asking." },
            { label: "Exclamation point !", icon: "🎉", detail: "Sound excited, surprised or strong." },
            { label: "Comma ,", icon: "🫧", detail: "Take a tiny breath." },
            { label: "Pace", icon: "🐢", detail: "Not racing, not crawling: a speed your listener can follow." },
          ],
        },
        probe: {
          type: "cloze",
          text: "At a period, you {0}. At a question mark, your voice goes {1}. At an exclamation point, you sound {2}.",
          blanks: [{ answers: ["pause", "stop"] }, { answers: ["up"] }, { answers: ["excited", "surprised"] }],
          bank: ["pause", "up", "excited", "down", "sleepy"],
          hint: "Think about how you say 'Is it ready?' and 'Hooray!' out loud.",
          mistakes: [
            { match: "down", coach: "When you really ask a question, your voice rises at the end. Try it: 'Is it ready?'" },
            { match: "sleepy", coach: "An exclamation point shows strong feeling, like 'Hooray!'" },
          ],
          seconds: 35,
        },
        think: {
          q: "What is the best speed for reading aloud?",
          choices: ["As fast as you can", "A pace your listener can follow", "One word every few seconds"],
          answer: 1,
          why: "Your listener needs to keep up and understand, so read at a steady, comfortable pace.",
          hints: [
            "If you race, your listener can't keep up.",
            "",
            "Too slow and the story falls apart. Your listener will lose the thread.",
          ],
        },
        approaches: {
          analogy:
            "Punctuation is like traffic signs for your voice. A period is a stop sign, a comma is a yield sign, and a question mark is a ramp going up.",
          example:
            "Read this two ways: 'The fox is here.' and 'The fox is here?' The first is a calm fact with a pause at the end. The second goes up at the end, like you can't believe it.",
          simpler: {
            q: "At a question mark, does your voice usually go up or down?",
            choices: ["Up", "Down"],
            answer: 0,
            why: "When you really ask something, your voice rises at the end.",
            hints: ["", "Say 'Are you hungry?' out loud. Listen to the end of it."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Literal or nonliteral? Sort each sentence.",
      buckets: ["Literal (means exactly what it says)", "Nonliteral (means something else)"],
      items: [
        { text: "The cat slept on the rug.", bucket: 0 },
        { text: "We ate soup for lunch.", bucket: 0 },
        { text: "The wind blew my hat off.", bucket: 0 },
        { text: "My feet are killing me.", bucket: 1 },
        { text: "You're the apple of my eye.", bucket: 1 },
        { text: "Time flies when you're having fun.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain the difference between a chapter, a scene and a stanza. Then explain what 'it's raining cats and dogs' really means and why it's called nonliteral.",
      keyPoints: [
        "A chapter is part of a story, a scene is part of a play, and a stanza is part of a poem",
        "Each part builds on the parts before it",
        "Raining cats and dogs means raining very hard",
        "Nonliteral means the words mean something different from what they say",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A poem is split into {0}. A play is split into {1}. A long story is split into {2}.",
        blanks: [{ answers: ["stanzas"] }, { answers: ["scenes"] }, { answers: ["chapters"] }],
        bank: ["stanzas", "scenes", "chapters", "recipes", "maps"],
        hint: "Stanzas go with poems, scenes with plays, chapters with long stories.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each idiom to its meaning.",
        pairs: [
          { left: "Break a leg!", right: "Good luck in your show!" },
          { left: "It's a piece of cake.", right: "It's easy." },
          { left: "I'm all ears.", right: "I'm listening." },
          { left: "Hold your horses.", right: "Wait a moment." },
        ],
        hint: "Imagine when someone would say each one.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put these words in order from LEAST sure to MOST sure.",
        steps: ["suspected", "believed", "knew"],
        hint: "Suspected: not sure. Believed: fairly sure. Knew: completely sure.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "This is part of a play. Tap the stage directions (what the actors should DO).",
        sentences: [
          "FOX: Welcome, friend Stork! Dinner is ready.",
          "(The fox sets down a flat dish of soup.)",
          "STORK: Thank you, I am very hungry.",
          "(The stork taps the dish with her long beak.)",
          "FOX: Oh dear, don't you like my soup?",
        ],
        correct: [1, 3],
        hint: "Stage directions are often in parentheses and tell what happens, not what is said.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What is a stanza?",
        choices: ["A part of a play", "A group of lines in a poem", "A chapter in a book", "A character in a story"],
        answer: 1,
        why: "Stanzas are groups of lines in a poem, like paragraphs.",
      },
      {
        q: "'That math quiz was a piece of cake.' What does this mean?",
        choices: ["The quiz was easy", "There was cake at the quiz", "The quiz was about baking"],
        answer: 0,
        why: "It's an idiom: a piece of cake means easy.",
      },
      {
        q: "Which word shows you are the MOST sure?",
        choices: ["suspected", "believed", "guessed", "knew"],
        answer: 3,
        why: "Knew means you were completely sure.",
      },
      {
        q: "How should your voice sound at an exclamation point?",
        choices: ["Bored and flat", "Excited or surprised", "Very quiet"],
        answer: 1,
        why: "An exclamation point shows strong feeling.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Choose a short poem (from a book of poems, or write your own with at least two stanzas). Practice reading it aloud three times with expression. Then record yourself reading it on a phone or tablet with a parent's help, and draw a picture to go with it.",
      rubric: [
        "Reads smoothly, without stopping on words",
        "Uses expression: pauses at periods, rises at questions, shows feeling",
        "Reads at a pace a listener can follow",
        "The picture shows something from the poem",
      ],
    },
  },

  // 5. Nonfiction: main idea, key details, text features and pictures
  {
    id: "ela-3.nonfiction",
    title: "Nonfiction: Main Idea, Text Features and Pictures",
    minutes: 35,
    stage: "grammar",
    standards: ["RI.3.1", "RI.3.2", "RI.3.4", "RI.3.5", "RI.3.7", "RI.3.10", "L.3.4"],
    read: [
      "Nonfiction tells true facts about the real world. Here is a short nonfiction text, and then we will learn how to read it like an expert.",
      "Honeybees are busy workers that help plants grow. They live together in a home called a hive. A hive has one queen bee, who lays the eggs, and thousands of worker bees. The workers fly from flower to flower to collect nectar, a sweet liquid, and pollen, a yellow powder. As they travel, bits of pollen stick to their fuzzy bodies and rub off on the next flower. This is called pollination, and it helps plants make seeds and fruit. Back at the hive, the bees turn nectar into honey to eat in winter. When a worker finds good flowers, she does a waggle dance to show the other bees which way to fly.",
      "The main idea is what a text is mostly about. In this text, the main idea is that honeybees are busy workers that help plants grow. Key details are facts that support the main idea, like the fact that bees carry pollen from flower to flower.",
      "When you meet a new word, look for clues in the sentence. The text says nectar is a sweet liquid. That's a context clue! A glossary at the back of a book also gives meanings, and a dictionary always can.",
      "Nonfiction books have text features that help you find facts fast. Headings tell what each section is about. Bold words are important. Captions explain photos. The table of contents lists the chapters at the front, and the index lists topics in ABC order at the back. Online, you can search with key words and click links to learn more.",
      "Pictures teach too. Photos show what things really look like, maps show where, and diagrams show the parts of something.",
    ].join("\n\n"),
    keyIdeas: [
      "The main idea is what a text is mostly about; key details support it.",
      "Use context clues, a glossary or a dictionary to figure out new words.",
      "Text features and search tools (headings, captions, index, key words, links) help you find facts fast.",
      "Photos, maps and diagrams show where, how and what things look like.",
    ],
    hook: {
      text: "A tiny bee weighs less than a paper clip. Yet bees help grow many of the fruits and vegetables we eat! How do they do it? Let's read like scientists to find out.",
    },
    teach: [
      {
        title: "Main Idea and Key Details",
        teach:
          "Nonfiction tells true facts about the real world. The main idea is what a text is mostly about, the one big point. Key details are the facts that hold up the main idea, like legs hold up a table. Read this: 'Honeybees are busy workers that help plants grow. They carry pollen from flower to flower. This helps plants make seeds and fruit. They also make honey from nectar.' The first sentence is the main idea. The others are key details that tell more. To find the main idea, ask: what do most of the sentences talk about?",
        visual: {
          type: "hotspots",
          title: "A main idea is held up by its details",
          center: "Honeybees are busy workers that help plants grow",
          spots: [
            { label: "Detail 1", icon: "🌼", detail: "They carry pollen from flower to flower." },
            { label: "Detail 2", icon: "🍎", detail: "This helps plants make seeds and fruit." },
            { label: "Detail 3", icon: "🍯", detail: "They make honey from nectar." },
            { label: "Detail 4", icon: "💃", detail: "A waggle dance shows other bees where flowers are." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the sentence that tells the MAIN IDEA of this paragraph.",
          sentences: [
            "A beehive is a busy, well-organized home.",
            "The queen bee lays the eggs.",
            "Worker bees gather food and clean the hive.",
            "Some workers guard the door from intruders.",
            "Others fan their wings to keep the hive cool.",
          ],
          correct: [0],
          hint: "Which sentence is big enough to cover all the others? The rest are details about it.",
          mistakes: [{ match: "The queen bee lays the eggs.", coach: "That's one key detail. Which sentence sums up the whole paragraph?" }],
          seconds: 35,
        },
        think: {
          q: "What is a key detail?",
          choices: ["The title of a book", "A fact that supports the main idea", "A made-up part of the story", "The last word of a text"],
          answer: 1,
          why: "Key details are facts that hold up and explain the main idea.",
          hints: [
            "The title may hint at the topic, but details are inside the text.",
            "",
            "Nonfiction is true. Details are real facts.",
            "Details can be anywhere in the text. They are the facts that support the big point.",
          ],
        },
        approaches: {
          analogy:
            "The main idea is like an umbrella. All the key details fit under it and stay dry. A sentence that doesn't fit under the umbrella is not about the main idea.",
          example:
            "Paragraph: 'Owls are skilled night hunters. Their big eyes see in the dark. Their sharp ears hear tiny mice. Their soft feathers make their flight almost silent.' Main idea: owls are skilled night hunters. Every other sentence is a detail about how.",
          simpler: {
            q: "A paragraph talks about a bee's wings, legs and stinger. What is it mostly about?",
            choices: ["The parts of a bee", "How to make honey"],
            answer: 0,
            why: "Wings, legs and stinger are all parts of a bee.",
            hints: ["", "Honey isn't mentioned. Look at what the sentences have in common."],
          },
        },
      },
      {
        title: "Context Clues and New Words",
        teach:
          "Nonfiction is full of new words. Don't skip them! Look for clues in the sentence around the word. These are called context clues. 'Bees collect nectar, a sweet liquid inside flowers.' The words after the comma tell you what nectar means. 'Moving pollen from flower to flower is called pollination.' The sentence explains the word for you. If there is no clue, check the glossary at the back of the book, a list of hard words and their meanings. A dictionary can help with any word, and its guide words at the top of each page help you find words fast.",
        visual: {
          type: "flip",
          cards: [
            { front: "Context clue", back: "Words near a new word that help explain it." },
            { front: "nectar", back: "A sweet liquid inside flowers." },
            { front: "pollination", back: "Moving pollen from flower to flower so plants can make seeds." },
            { front: "Glossary", back: "A mini dictionary at the back of a book, just for that book's hard words." },
            { front: "Guide words", back: "The first and last words on a dictionary page, shown at the top." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Read the clues. 'The bees built their hive, or home, in a hollow tree.' A hive is a bee {0}. 'The worker returned with pollen, a yellow powder from flowers.' Pollen is a yellow {1}.",
          blanks: [{ answers: ["home", "house"] }, { answers: ["powder"] }],
          hint: "Look right after the comma or the word 'or'. The text tells you the meaning.",
          mistakes: [{ match: "tree", coach: "The hive is IN the tree. Look at the words after 'or'." }],
          seconds: 40,
        },
        think: {
          q: "'The bee drank nectar, a sweet liquid inside flowers.' What does nectar mean?",
          choices: ["A kind of bee", "A sweet liquid inside flowers", "A flower petal", "A beehive"],
          answer: 1,
          why: "The words right after the comma explain what nectar is.",
          hints: [
            "The bee drank it, so it can't be a bee. Read the words after the comma.",
            "",
            "Petals aren't drinkable. Read the words after the comma.",
            "You can't drink a hive! The sentence tells you exactly what nectar is.",
          ],
        },
        approaches: {
          analogy:
            "Context clues are like footprints near a mystery word. Follow them, and they lead you to the meaning.",
          example:
            "'The tortoise was sluggish, moving so slowly that the hare was soon far ahead.' The clue 'moving so slowly' tells you sluggish means slow.",
          simpler: {
            q: "Where is a glossary usually found?",
            choices: ["At the back of a book", "On the cover"],
            answer: 0,
            why: "Glossaries are at the back, after the main text.",
            hints: ["", "The cover shows the title and author. Look at the end of the book."],
          },
        },
      },
      {
        title: "Text Features and Search Tools",
        teach:
          "Nonfiction books have text features that help you find facts fast. The table of contents at the front lists the chapters and their page numbers. Headings tell what each section is about. Bold words are important words, often in the glossary. Captions explain what a photo shows. A sidebar is a box beside the main text with extra facts. The index at the back lists topics in ABC order with their pages. Online, you can type key words into a search box, like 'honeybee waggle dance', and click hyperlinks to jump to more information.",
        visual: {
          type: "hotspots",
          title: "Tools for finding facts",
          center: "Nonfiction book",
          spots: [
            { label: "Table of contents", icon: "📑", detail: "At the front: chapters and page numbers." },
            { label: "Heading", icon: "🔠", detail: "Tells what a section is about." },
            { label: "Caption", icon: "🖼️", detail: "Explains what a photo or picture shows." },
            { label: "Sidebar", icon: "📦", detail: "A box beside the main text with extra facts." },
            { label: "Index", icon: "🔤", detail: "At the back: topics in ABC order with page numbers." },
            { label: "Key words and links", icon: "🔎", detail: "Online: search with key words; click links to learn more." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each job to the text feature or search tool that does it.",
          pairs: [
            { left: "Explains what a photo shows", right: "Caption" },
            { left: "Lists topics in ABC order at the back", right: "Index" },
            { left: "Lists the chapters at the front", right: "Table of contents" },
            { left: "Tells what a section is about", right: "Heading" },
            { left: "Takes you to another web page when you click it", right: "Hyperlink" },
          ],
          hint: "Front of the book: table of contents. Back of the book: index. Under a photo: caption.",
          seconds: 50,
        },
        think: {
          q: "You want to know which page talks about the queen bee. Where should you look?",
          choices: ["The index", "The cover", "A caption", "The first sentence"],
          answer: 0,
          why: "The index lists topics like 'queen bee' in ABC order with page numbers.",
          hints: [
            "",
            "The cover shows the title, not page numbers for topics.",
            "A caption explains one photo. It won't list pages.",
            "The first sentence starts the book but won't point you to a page.",
          ],
        },
        approaches: {
          analogy:
            "Text features are like the signs in a grocery store. You don't walk every aisle to find apples. You read the signs and go straight there.",
          example:
            "To find out how bees make honey, open the table of contents. You see 'Chapter 3: Making Honey, page 14.' Turn to page 14, read the heading, and look at the photo and its caption.",
          simpler: {
            q: "What explains a photo?",
            choices: ["A caption", "An index"],
            answer: 0,
            why: "Captions are the words under or beside a photo.",
            hints: ["", "An index lists topics at the back of a book."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which tool would help most? Sort each question.",
      buckets: ["A map", "A photograph", "A labeled diagram"],
      items: [
        { text: "Where in the world do honeybees live?", bucket: 0 },
        { text: "Which states are next to ours?", bucket: 0 },
        { text: "What does a real beehive look like?", bucket: 1 },
        { text: "What color is a ripe peach?", bucket: 1 },
        { text: "What are the parts of a bee's body?", bucket: 2 },
        { text: "What are the parts of a flower?", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell what the honeybee text is mostly about (the main idea) and give two key details. Then name two text features and what they help you do.",
      keyPoints: [
        "Main idea: honeybees are busy workers that help plants grow",
        "Gives a key detail, such as carrying pollen or making honey",
        "Names a text feature like a heading, caption, index or table of contents",
        "Explains that text features help you find facts fast",
      ],
    },
    mastery: [
      {
        type: "highlight",
        prompt: "Tap the sentence that is the MAIN IDEA.",
        sentences: [
          "Worker bees have many jobs during their lives.",
          "Young workers clean the cells of the hive.",
          "Later, they feed the baby bees.",
          "Older workers fly out to gather nectar and pollen.",
        ],
        correct: [0],
        hint: "The main idea covers all the other sentences.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each text feature to where you find it or what it does.",
        pairs: [
          { left: "Table of contents", right: "Front of the book: chapters and pages" },
          { left: "Index", right: "Back of the book: topics in ABC order" },
          { left: "Glossary", right: "Meanings of hard words in the book" },
          { left: "Caption", right: "Words that explain a photo" },
        ],
        hint: "Contents at the front, index and glossary at the back, captions by photos.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "'The bees swarmed, flying together in a huge, buzzing cloud.' The words after the comma are a context {0}. Swarmed means flew together in a big {1}.",
        blanks: [{ answers: ["clue"] }, { answers: ["cloud", "group"] }],
        bank: ["clue", "cloud", "index", "caption", "sidebar"],
        hint: "The words after the comma explain the new word.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Key detail or not? This text's main idea is 'Bees help plants grow.'",
        buckets: ["Supports the main idea", "Does not support it"],
        items: [
          { text: "Bees carry pollen from flower to flower.", bucket: 0 },
          { text: "Pollination helps plants make seeds and fruit.", bucket: 0 },
          { text: "Many apple trees need bees to make apples.", bucket: 0 },
          { text: "My cousin is afraid of bees.", bucket: 1 },
          { text: "Some people wear yellow shirts.", bucket: 1 },
        ],
        hint: "Does the sentence explain how bees help plants grow? If not, it doesn't support the main idea.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What is the main idea of a text?",
        choices: ["The first word", "The one big point the text is mostly about", "The longest sentence", "The name of the author"],
        answer: 1,
        why: "The main idea is what the whole text is mostly about.",
      },
      {
        q: "Where do you find topics in ABC order with their page numbers?",
        choices: ["The table of contents", "A caption", "The index"],
        answer: 2,
        why: "The index is at the back of a book, in ABC order.",
      },
      {
        q: "'Bees collect pollen, a yellow powder from flowers.' How do you know what pollen means?",
        choices: ["A context clue tells you", "You can't know", "The title tells you", "The page number tells you"],
        answer: 0,
        why: "The words after the comma are a context clue that explains the word.",
      },
      {
        q: "Which would best show where honeybees live around the world?",
        choices: ["A recipe", "A map", "A poem", "A caption about honey"],
        answer: 1,
        why: "Maps show where things are.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Find a nonfiction book (from home or the library) about an animal. Use its table of contents or index to find one fact you want to know. Write the main idea of one page in one sentence, and list two key details. Then show a parent one caption, one heading and one bold word in the book.",
      rubric: [
        "Uses the table of contents or index to find a page",
        "Writes a main idea that covers the whole page",
        "Lists two key details that support the main idea",
        "Points out a caption, a heading and a bold word correctly",
      ],
    },
  },

  // 6. How ideas connect: cause and effect, sequence, comparing two texts, author's view
  {
    id: "ela-3.connections",
    title: "Cause, Effect and Comparing Two Texts",
    minutes: 35,
    stage: "logic",
    standards: ["RI.3.3", "RI.3.6", "RI.3.8", "RI.3.9", "RI.3.1"],
    read: [
      "Nonfiction writers connect their ideas in smart ways. When you see how sentences and paragraphs link together, you understand much more.",
      "One way is cause and effect. A cause is why something happens. An effect is what happens. Wilbur and Orville Wright were brothers from Dayton, Ohio, who ran a bicycle shop. They dreamed of building a flying machine. They chose Kitty Hawk, North Carolina, for their tests because it had strong, steady winds and soft sand for landing. Because their first gliders did not lift as well as they hoped, they built a wind tunnel and tested many wing shapes. As a result, they designed much better wings.",
      "Another way is sequence, the order things happen. First, the brothers flew gliders from 1900 to 1902. Next, they built an airplane with an engine and propellers. Finally, on December 17, 1903, Orville flew it for 12 seconds. It was the first powered airplane flight that carried a pilot and was controlled.",
      "A third way is comparison: how things are alike and different. Words like both, also, but and however are clues.",
      "Two texts can be about the same topic but tell different facts. One book might tell about the brothers' bicycle shop, while another tells all four flights they made that day. Reading both gives you the full picture.",
      "Every author has a point of view about their topic. An author might think the Wright brothers were the greatest inventors ever. You might agree, or you might admire a different inventor more. Good readers know what the author thinks, and they also know what they think.",
    ].join("\n\n"),
    keyIdeas: [
      "A cause is why something happens; an effect is what happens. Look for because, so and as a result.",
      "Sequence words (first, next, finally) and comparison words (both, but, however) link ideas.",
      "Two texts on the same topic can give different facts; read both for the full picture.",
      "Know the author's point of view, and know your own.",
    ],
    hook: {
      text: "In 1903, two brothers who fixed bicycles did something nobody had ever done. They flew an airplane with an engine! How did bicycle builders learn to fly? Let's follow the clues.",
    },
    teach: [
      {
        title: "Cause and Effect",
        teach:
          "A cause is why something happens. An effect is what happens because of it. Wilbur and Orville Wright were brothers from Dayton, Ohio, who ran a bicycle shop and dreamed of flying. They chose Kitty Hawk, North Carolina, for their tests because it had strong, steady winds and soft sand for landing. The wind was a cause, and choosing Kitty Hawk was the effect. Their early gliders did not lift as well as they hoped, so they built a wind tunnel to test wing shapes. As a result, they designed much better wings. Words like because, so and as a result are clues to cause and effect.",
        visual: {
          type: "flip",
          cards: [
            { front: "Cause", back: "WHY something happens. Strong winds at Kitty Hawk." },
            { front: "Effect", back: "WHAT happens. The brothers chose Kitty Hawk for their tests." },
            { front: "Clue words", back: "because, so, since, as a result, therefore" },
            { front: "Wind tunnel", back: "A tunnel where a fan blows air over model wings to test them." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each cause to its effect.",
          pairs: [
            { left: "Kitty Hawk had strong, steady winds.", right: "The brothers tested their gliders there." },
            { left: "The early gliders did not lift well.", right: "They built a wind tunnel to test wing shapes." },
            { left: "They tested many wing shapes.", right: "They designed much better wings." },
            { left: "Kitty Hawk had soft sand.", right: "Landings were safer." },
          ],
          hint: "Read the cause, then say 'so...' and find what happened next.",
          seconds: 50,
        },
        think: {
          q: "'The gliders did not lift well, so the brothers built a wind tunnel.' What is the cause?",
          choices: ["They built a wind tunnel", "The gliders did not lift well", "They lived in Ohio"],
          answer: 1,
          why: "The poor lift is WHY they built the tunnel. The tunnel is the effect.",
          hints: [
            "Building the tunnel is what happened. That's the effect. What made them do it?",
            "",
            "Ohio isn't mentioned in this sentence. Look before the word 'so'.",
          ],
        },
        approaches: {
          analogy:
            "Cause and effect is like flipping a light switch. Flipping the switch is the cause. The light turning on is the effect.",
          example:
            "'It rained all night, so the soccer field was muddy.' Ask why the field was muddy: because it rained. Rain is the cause. A muddy field is the effect.",
          simpler: {
            q: "'I was hungry, so I ate a sandwich.' What is the effect?",
            choices: ["I ate a sandwich", "I was hungry"],
            answer: 0,
            why: "Eating the sandwich is what happened because of being hungry.",
            hints: ["", "Being hungry is the reason, the cause. What happened because of it?"],
          },
        },
      },
      {
        title: "Sequence and Comparison Words",
        teach:
          "Writers also link ideas by sequence, the order things happen. First, the Wright brothers flew gliders from 1900 to 1902. Next, they built an airplane with an engine and two propellers. Finally, on December 17, 1903, Orville flew it for 12 seconds. It was the first controlled, powered airplane flight with a pilot. First, next, then and finally are sequence words. Writers also compare: how two things are alike and different. Both brothers loved machines, but Wilbur was four years older. Both, also and alike show things that are the same. But, however and different show things that differ.",
        visual: {
          type: "timeline",
          events: [
            { year: 1900, label: "First glider tests", detail: "The brothers fly their first glider at Kitty Hawk, North Carolina." },
            { year: 1901, label: "The wind tunnel", detail: "Back in Dayton, they build a wind tunnel and test many wing shapes." },
            { year: 1902, label: "A better glider", detail: "Their new glider flies much better and can be steered." },
            { year: 1903, label: "First powered flight", detail: "On December 17, Orville flies their engine-powered airplane for 12 seconds." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort the signal words by how they connect ideas.",
          buckets: ["Sequence (order)", "Cause and effect", "Comparison"],
          items: [
            { text: "first", bucket: 0 },
            { text: "next", bucket: 0 },
            { text: "finally", bucket: 0 },
            { text: "because", bucket: 1 },
            { text: "as a result", bucket: 1 },
            { text: "so", bucket: 1 },
            { text: "both", bucket: 2 },
            { text: "however", bucket: 2 },
            { text: "alike", bucket: 2 },
          ],
          hint: "Sequence words tell WHEN. Cause words tell WHY. Comparison words tell SAME or DIFFERENT.",
          seconds: 50,
        },
        think: {
          q: "'Both brothers loved machines.' What kind of connection does 'both' show?",
          choices: ["Sequence", "Comparison: how they are alike", "Cause and effect"],
          answer: 1,
          why: "Both tells how two things are the same, which is a comparison.",
          hints: ["Sequence words tell order, like first and next.", "", "Cause words tell why, like because and so."],
        },
        approaches: {
          analogy:
            "Signal words are like road signs. 'First' and 'next' say go straight ahead in order. 'Because' says here is why. 'But' says turn, something different is coming.",
          example:
            "'First, mix the batter. Next, pour it in the pan. Finally, bake it.' Those are sequence words. 'Cookies and cupcakes are both sweet, but cookies are flat.' Both and but are comparison words.",
          simpler: {
            q: "Which word is a sequence word?",
            choices: ["first", "because"],
            answer: 0,
            why: "First tells the order things happen.",
            hints: ["", "Because tells why. That's cause and effect."],
          },
        },
      },
      {
        title: "Two Texts, Two Authors, and You",
        teach:
          "Two texts can be about the same topic but tell different facts. Text A tells that the brothers ran a bicycle shop and built their own engine with their mechanic, Charlie Taylor. Text B tells that they made four flights on December 17, 1903, and the longest lasted 59 seconds. Both tell about the first flight. Reading both gives you the full picture. Every author also has a point of view about the topic. One author might say the Wright brothers were the greatest inventors who ever lived. You might agree, or you might admire a different inventor more. Good readers know what the author thinks, and what they think themselves.",
        visual: {
          type: "compare",
          left: {
            title: "Text A",
            points: ["The brothers ran a bicycle shop in Dayton, Ohio", "They built their own engine with their mechanic, Charlie Taylor", "Orville flew first, for 12 seconds"],
          },
          right: {
            title: "Text B",
            points: ["They made four flights on December 17, 1903", "The longest flight lasted 59 seconds", "Orville flew first, for 12 seconds"],
          },
        },
        probe: {
          type: "sort",
          prompt: "Which text tells each fact?",
          buckets: ["Only Text A", "Only Text B", "Both texts"],
          items: [
            { text: "They ran a bicycle shop.", bucket: 0 },
            { text: "Charlie Taylor helped build the engine.", bucket: 0 },
            { text: "They made four flights that day.", bucket: 1 },
            { text: "The longest flight lasted 59 seconds.", bucket: 1 },
            { text: "Orville flew first, for 12 seconds.", bucket: 2 },
          ],
          hint: "Look back at the two lists. A fact in both lists goes in the 'Both texts' bucket.",
          seconds: 45,
        },
        think: {
          q: "An author writes, 'The Wright brothers were the greatest inventors ever.' What is this?",
          choices: ["A fact everyone must agree with", "The author's point of view", "A cause and effect"],
          answer: 1,
          why: "It's what the author thinks. You can have your own view.",
          hints: [
            "Greatest ever is an opinion. People can disagree.",
            "",
            "There's no 'because' or 'so' here. It's what the author believes.",
          ],
        },
        approaches: {
          analogy:
            "Reading two texts on one topic is like asking two friends about the same birthday party. One remembers the cake, the other remembers the games. Together, you know the whole party.",
          example:
            "Text A says the brothers sold bicycles. Text B says the longest flight lasted 59 seconds. Both say Orville flew first. Now you know three facts instead of two.",
          simpler: {
            q: "Can you disagree with an author's point of view?",
            choices: ["Yes, you can have your own view", "No, authors are always right"],
            answer: 0,
            why: "The author's view is what they think. You can think something different.",
            hints: ["", "Authors share facts AND opinions. You can disagree with an opinion."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the Wright brothers' story in order.",
      steps: [
        "The brothers run a bicycle shop in Dayton, Ohio.",
        "They test gliders at Kitty Hawk, North Carolina.",
        "They build a wind tunnel and test wing shapes.",
        "They build an airplane with an engine and propellers.",
        "On December 17, 1903, Orville flies for 12 seconds.",
      ],
    },
    explain: {
      prompt: "Explain one cause and its effect from the Wright brothers' story. Then tell how reading two texts on the same topic helps you.",
      keyPoints: [
        "Names a cause, such as strong winds or gliders that didn't lift well",
        "Names its effect, such as choosing Kitty Hawk or building a wind tunnel",
        "Two texts can give different facts about the same topic",
        "Reading both gives a fuller picture",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Place each event on the timeline.",
        min: 1899,
        max: 1904,
        step: 1,
        tolerance: 0,
        items: [
          { label: "First glider tests", value: 1900 },
          { label: "Wind tunnel tests", value: 1901 },
          { label: "First powered flight", value: 1903 },
        ],
        hint: "The gliders came first, then the wind tunnel the next year, and the powered flight in 1903.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "The gliders did not lift well. {0} the brothers tested wing shapes in a wind tunnel. {1}, their new wings worked much better.",
        blanks: [{ answers: ["So"] }, { answers: ["As a result"] }],
        bank: ["So", "As a result", "Both", "However"],
        hint: "Both blanks connect a cause to what it caused.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Is it the author's point of view, or a fact?",
        buckets: ["Fact (can be checked)", "Author's point of view (an opinion)"],
        items: [
          { text: "The first powered flight was on December 17, 1903.", bucket: 0 },
          { text: "The brothers lived in Dayton, Ohio.", bucket: 0 },
          { text: "The first flight lasted 12 seconds.", bucket: 0 },
          { text: "The Wright brothers were the bravest people ever.", bucket: 1 },
          { text: "Flying is the most exciting invention of all.", bucket: 1 },
        ],
        hint: "A fact can be checked in a book. A point of view tells what someone thinks or feels.",
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each sentence to how it connects ideas.",
        pairs: [
          { left: "First, they built gliders. Next, they built an engine.", right: "Sequence" },
          { left: "Because the wind was strong, they chose Kitty Hawk.", right: "Cause and effect" },
          { left: "Both brothers loved machines, but Wilbur was older.", right: "Comparison" },
        ],
        hint: "Look for the signal words: first and next, because, both and but.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "'Because of the strong winds, the brothers chose Kitty Hawk.' What is the effect?",
        choices: ["The strong winds", "The brothers chose Kitty Hawk", "The brothers were from Ohio"],
        answer: 1,
        why: "Choosing Kitty Hawk is what happened because of the winds.",
      },
      {
        q: "Which word is a comparison clue word?",
        choices: ["finally", "because", "however", "next"],
        answer: 2,
        why: "However shows how things are different.",
      },
      {
        q: "Why read two texts on the same topic?",
        choices: ["They always say the exact same thing", "To get more facts and the full picture", "To find the longest one", "So you can skip the first one"],
        answer: 1,
        why: "Different texts give different details, so together they tell more.",
      },
      {
        q: "When was the first powered airplane flight?",
        choices: ["December 17, 1903", "July 4, 1776", "January 1, 1900"],
        answer: 0,
        why: "Orville Wright flew for 12 seconds on December 17, 1903, at Kitty Hawk.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Build a paper airplane, fly it three times and measure how far it goes. Then change one thing (the wings, a fold or a paper clip on the nose) and fly it three more times. Write two sentences with cause and effect words: 'Because I ___, my plane ___.'",
      rubric: [
        "Flies and measures the plane before and after a change",
        "Changes only one thing at a time, like the Wright brothers",
        "Writes two sentences using because, so or as a result",
        "Explains the cause and the effect to a parent",
      ],
    },
  },

  // 7. Grammar workshop
  {
    id: "ela-3.grammar",
    title: "Grammar Workshop: Building Strong Sentences",
    minutes: 35,
    stage: "grammar",
    standards: ["L.3.1", "L.3.3", "L.3.6"],
    read: [
      "Grammar is the set of rules for building sentences, the way a builder follows a plan for a house. Every word in a sentence has a job.",
      "A noun names a person, place, thing or idea: farmer, island, kite, courage. Ideas you can't touch, like courage, friendship and honesty, are called abstract nouns. A pronoun takes the place of a noun: he, she, it, they, we. A verb shows action or being: run, think, is. An adjective describes a noun: a tall tree. An adverb describes a verb, often telling how: she ran quickly.",
      "Verbs change to show time. Yesterday I walked (past tense). Today I walk (present tense). Tomorrow I will walk (future tense). Many verbs add -ed for the past, but irregular verbs change in their own way: run becomes ran, sing becomes sang, think becomes thought, and go becomes went. Some nouns are irregular too: one child, two children; one mouse, two mice; one foot, two feet.",
      "Words in a sentence must agree. A singular subject takes a singular verb: the bird sings. A plural subject takes a plural verb: the birds sing. A pronoun must match the noun it stands for: the girls packed their bags.",
      "To compare, add -er for two things and -est for three or more: tall, taller, tallest. Some words change completely: good, better, best and bad, worse, worst.",
      "Conjunctions join ideas. Coordinating conjunctions like and, but, or and so join two complete sentences into a compound sentence: I wanted to fly my kite, but there was no wind. Subordinating conjunctions like because, when, if, after and although add a part that can't stand alone, making a complex sentence: We went inside because it started to rain.",
      "Finally, choose words for effect. 'The dog ate' is fine, but 'the dog gobbled' paints a picture.",
    ].join("\n\n"),
    keyIdeas: [
      "Nouns, pronouns, verbs, adjectives and adverbs each have a job in a sentence.",
      "Verbs show past, present and future, and irregular verbs change in their own way.",
      "Subjects and verbs must agree; use -er and -est (or better and best) to compare.",
      "Conjunctions join ideas into compound and complex sentences.",
    ],
    hook: {
      text: "Here's a sentence: 'Yesterday the childs runned to the biggest kite.' Something sounds funny! Today you'll become a sentence builder and learn how to fix it.",
    },
    teach: [
      {
        title: "Every Word Has a Job",
        teach:
          "Every word in a sentence has a job. A noun names a person, place, thing or idea: farmer, island, kite. Some nouns name ideas you can't touch, like courage, friendship and honesty. Those are abstract nouns. A pronoun takes the place of a noun, like he, she, it or they. A verb shows action or being: run, think, is. An adjective describes a noun, like a tall tree or a red balloon. An adverb describes a verb, often telling how, when or where: she ran quickly, we left early. In 'The brave pilot flew safely,' pilot is a noun, brave is an adjective, flew is a verb and safely is an adverb.",
        visual: {
          type: "hotspots",
          title: "The jobs words do",
          center: "Sentence",
          spots: [
            { label: "Noun", icon: "🏝️", detail: "Names a person, place, thing or idea: farmer, island, kite, courage." },
            { label: "Pronoun", icon: "👉", detail: "Takes the place of a noun: he, she, it, they, we." },
            { label: "Verb", icon: "🏃", detail: "Shows action or being: run, think, is." },
            { label: "Adjective", icon: "🎨", detail: "Describes a noun: a tall tree, a red balloon." },
            { label: "Adverb", icon: "⏱️", detail: "Describes a verb, often how: quickly, softly, early." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each word by its job.",
          buckets: ["Noun", "Verb", "Adjective", "Adverb"],
          items: [
            { text: "island", bucket: 0 },
            { text: "courage", bucket: 0 },
            { text: "jump", bucket: 1 },
            { text: "think", bucket: 1 },
            { text: "shiny", bucket: 2 },
            { text: "enormous", bucket: 2 },
            { text: "quickly", bucket: 3 },
            { text: "softly", bucket: 3 },
          ],
          hint: "Nouns name things or ideas, verbs show action, adjectives describe nouns, and adverbs often end in -ly and tell how.",
          mistakes: [{ match: "courage sorted as adjective", coach: "Courage is an idea, a thing you can have. That makes it an abstract noun. Brave would be the adjective." }],
          seconds: 50,
        },
        think: {
          q: "In 'The kite floated gently,' which word is the adverb?",
          choices: ["kite", "floated", "gently", "The"],
          answer: 2,
          why: "Gently tells how the kite floated, so it describes the verb.",
          hints: [
            "Kite names a thing. That's a noun.",
            "Floated is the action. That's the verb.",
            "",
            "The is a little word that points to a noun. Look for the word that tells HOW.",
          ],
        },
        approaches: {
          analogy:
            "A sentence is like a soccer team. Each player has a position: the noun is the striker, the verb is the ball moving, and adjectives and adverbs are the coaches telling everyone more.",
          example:
            "'The happy puppy barked loudly.' Puppy is the noun (a thing). Happy is the adjective (what kind of puppy). Barked is the verb (the action). Loudly is the adverb (how it barked).",
          simpler: {
            q: "Which word is a verb?",
            choices: ["swim", "blue"],
            answer: 0,
            why: "Swim is an action you can do.",
            hints: ["", "Blue describes something. That's an adjective."],
          },
        },
      },
      {
        title: "Verb Tenses and Irregular Words",
        teach:
          "Verbs change to show time. Yesterday I walked. That's the past tense. Today I walk. That's the present tense. Tomorrow I will walk. That's the future tense. Most verbs add -ed to show the past. But irregular verbs change in their own way. Run becomes ran, sing becomes sang, think becomes thought, bring becomes brought, and go becomes went. Some nouns are irregular too. We say one child but two children, one mouse but two mice, one foot but two feet. You learn irregular words by hearing and reading them often.",
        visual: {
          type: "flip",
          cards: [
            { front: "run", back: "Past tense: ran" },
            { front: "sing", back: "Past tense: sang" },
            { front: "think", back: "Past tense: thought" },
            { front: "go", back: "Past tense: went" },
            { front: "child", back: "Plural: children" },
            { front: "mouse", back: "Plural: mice" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Yesterday we {0} (run) to the hill. Then the class {1} (sing) a song. Two {2} (child) flew kites, and three {3} (mouse) hid in the grass.",
          blanks: [{ answers: ["ran"] }, { answers: ["sang"] }, { answers: ["children"] }, { answers: ["mice"] }],
          hint: "These are irregular words. They don't add -ed or -s. Say the sentence out loud and listen.",
          mistakes: [
            { match: "runned", coach: "Run is irregular. Its past tense is ran." },
            { match: "singed", coach: "Sing is irregular. Its past tense is sang." },
            { match: "childs", coach: "Child is an irregular noun. More than one child is children." },
            { match: "mouses", coach: "More than one mouse is mice." },
          ],
          seconds: 50,
        },
        think: {
          q: "Which sentence is in the future tense?",
          choices: ["I walked to the park.", "I walk to the park.", "I will walk to the park."],
          answer: 2,
          why: "Will walk tells something that hasn't happened yet.",
          hints: ["Walked already happened. That's the past.", "Walk is happening now or usually. That's the present.", ""],
        },
        approaches: {
          analogy:
            "Verb tenses are like a time machine. The -ed button sends a verb into the past, and the word will sends it into the future. Irregular verbs are rebels that use their own buttons.",
          example:
            "Today I think about kites. Yesterday I thought about kites. Tomorrow I will think about kites. Think doesn't become thinked. It becomes thought.",
          simpler: {
            q: "What is the past tense of 'go'?",
            choices: ["goed", "went"],
            answer: 1,
            why: "Go is irregular. Its past tense is went.",
            hints: ["Go is irregular, so it doesn't just add -ed.", ""],
          },
        },
      },
      {
        title: "Words That Agree and Words That Compare",
        teach:
          "Words in a sentence must agree, like teammates wearing the same jersey. A singular subject takes a singular verb: the bird sings. A plural subject takes a plural verb: the birds sing. Pronouns must match too: the girls packed their bags, and the boy packed his. To compare two things, add -er: a tall tree, a taller tree. To compare three or more, add -est: the tallest tree of all. Some comparing words change completely: good, better, best and bad, worse, worst. Never say gooder!",
        visual: {
          type: "compare",
          left: {
            title: "Agreement",
            points: ["The bird sings. (one)", "The birds sing. (more than one)", "The girls packed their bags.", "The boy packed his bag."],
          },
          right: {
            title: "Comparing",
            points: ["tall, taller, tallest", "fast, faster, fastest", "good, better, best", "bad, worse, worst"],
          },
        },
        probe: {
          type: "cloze",
          text: "The bird {0} every morning. The two birds {1} together. My kite is good, but your kite is {2}. Of all the kites, hers is the {3}.",
          blanks: [{ answers: ["sings"] }, { answers: ["sing"] }, { answers: ["better"] }, { answers: ["best"] }],
          bank: ["sings", "sing", "better", "best", "gooder", "goodest"],
          hint: "One bird sings; two birds sing. Good, better, best.",
          mistakes: [
            { match: "gooder", coach: "Good changes completely when you compare: good, better, best." },
            { match: "goodest", coach: "The word for the top of three or more is best." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which sentence is correct?",
          choices: ["The dogs barks.", "The dog bark.", "The dogs bark.", "The dog are barking."],
          answer: 2,
          why: "Dogs is plural, so it takes the plural verb bark.",
          hints: [
            "Dogs is more than one, so the verb shouldn't end in s.",
            "Dog is just one, so it needs barks.",
            "",
            "One dog IS barking, not ARE.",
          ],
        },
        approaches: {
          analogy:
            "Comparing words are like stairs. Tall is the first step, taller is the second step, and tallest is the very top.",
          example:
            "A mouse is small. A bee is smaller than a mouse. An ant is the smallest of the three. Two things: -er. Three or more: -est.",
          simpler: {
            q: "Which word compares THREE or more things?",
            choices: ["fastest", "faster"],
            answer: 0,
            why: "-est is for the top of three or more.",
            hints: ["", "Faster compares just two things."],
          },
        },
      },
      {
        title: "Joining Ideas with Conjunctions",
        teach:
          "Conjunctions are joining words. Coordinating conjunctions like and, but, or and so join two complete sentences into one compound sentence. 'I wanted to fly my kite. There was no wind.' becomes 'I wanted to fly my kite, but there was no wind.' Subordinating conjunctions like because, when, if, after and although add a part that can't stand alone, making a complex sentence: 'We went inside because it started to rain.' Writers also choose words for effect. 'The dog ate' is fine, but 'the dog gobbled' paints a picture. And time and place words, like after dinner that night, help readers follow along.",
        visual: {
          type: "compare",
          left: {
            title: "Coordinating (compound sentence)",
            points: ["and, but, or, so", "Joins two complete sentences", "I wanted to fly my kite, but there was no wind."],
          },
          right: {
            title: "Subordinating (complex sentence)",
            points: ["because, when, if, after, although", "Adds a part that can't stand alone", "We went inside because it started to rain."],
          },
        },
        probe: {
          type: "build",
          prompt: "Build a complex sentence that tells why the kids went inside.",
          tiles: ["We", "went inside", "because", "it started", "to rain."],
          distractors: ["but", "or"],
          hint: "Start with what happened, then the joining word that tells WHY, then the reason.",
          mistakes: [{ match: "but", coach: "But shows something different or surprising. To tell why, use because." }],
          seconds: 40,
        },
        think: {
          q: "Which conjunction best joins these? 'I studied hard. ___ I passed the test.'",
          choices: ["or", "so", "but"],
          answer: 1,
          why: "Passing the test happened because of studying, so 'so' shows the result.",
          hints: [
            "Or gives a choice. Passing wasn't a choice instead of studying.",
            "",
            "But shows a surprise. Passing after studying isn't a surprise.",
          ],
        },
        approaches: {
          analogy:
            "Conjunctions are like the couplings that hook train cars together. Without them, you just have a bunch of short cars sitting alone on the track.",
          example:
            "Two sentences: 'The sky was dark. We stayed outside.' Joined with but: 'The sky was dark, but we stayed outside.' Joined with although: 'Although the sky was dark, we stayed outside.'",
          simpler: {
            q: "Which word is a conjunction?",
            choices: ["and", "kite"],
            answer: 0,
            why: "And joins words or ideas together.",
            hints: ["", "Kite is a thing, so it's a noun."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every sentence that is written correctly.",
      sentences: [
        "The children ran to the hill.",
        "My brother and I flies kites.",
        "She sang the best song of all.",
        "Yesterday we goed to the park.",
        "The birds sing, and the bees buzz.",
        "This kite is more bigger than that one.",
      ],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Fix this sentence and explain each fix: 'Yesterday the childs runned to the biggest kite, and it were gooder than mine.'",
      keyPoints: [
        "Childs should be children, an irregular plural",
        "Runned should be ran, an irregular past tense verb",
        "It were should be it was, so the subject and verb agree",
        "Gooder should be better",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each verb to its past tense.",
        pairs: [
          { left: "think", right: "thought" },
          { left: "bring", right: "brought" },
          { left: "go", right: "went" },
          { left: "sing", right: "sang" },
          { left: "run", right: "ran" },
        ],
        hint: "These are irregular verbs. Say 'Yesterday I...' and listen for the right word.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Compound or complex? Sort each sentence by its joining word.",
        buckets: ["Compound (and, but, or, so)", "Complex (because, when, if, after, although)"],
        items: [
          { text: "I like apples, and my sister likes pears.", bucket: 0 },
          { text: "It was cold, so we wore coats.", bucket: 0 },
          { text: "We can paint, or we can read.", bucket: 0 },
          { text: "We stayed in because it rained.", bucket: 1 },
          { text: "When the bell rang, we lined up.", bucket: 1 },
          { text: "Although I was tired, I finished my chores.", bucket: 1 },
        ],
        hint: "Find the joining word in each sentence, then check which list it belongs to.",
        seconds: 50,
      },
      {
        type: "cloze",
        text: "A cheetah is {0} than a horse. A cheetah is the {1} land animal of all.",
        blanks: [{ answers: ["faster"] }, { answers: ["fastest"] }],
        hint: "Two things: add -er. Three or more: add -est.",
        mistakes: [{ match: "more fast", coach: "For short words like fast, just add -er: faster." }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build a sentence where the subject and verb agree, using a strong describing verb.",
        tiles: ["The hungry dogs", "gobble", "their dinner."],
        distractors: ["gobbles", "his dinner."],
        hint: "Dogs is plural, so the verb doesn't end in s, and the pronoun is their.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which word is an abstract noun?",
        choices: ["table", "honesty", "jump", "green"],
        answer: 1,
        why: "Honesty is an idea you can't touch, so it is an abstract noun.",
      },
      {
        q: "What is the past tense of 'bring'?",
        choices: ["bringed", "brang", "brought"],
        answer: 2,
        why: "Bring is irregular: today I bring, yesterday I brought.",
      },
      {
        q: "Which sentence is correct?",
        choices: ["My cat sleep all day.", "My cats sleeps all day.", "My cats sleep all day.", "My cat are sleeping."],
        answer: 2,
        why: "Cats is plural, so it takes sleep without an s.",
      },
      {
        q: "Which word makes a complex sentence? 'We went home ___ the game ended.'",
        choices: ["after", "and", "or"],
        answer: 0,
        why: "After is a subordinating conjunction. 'After the game ended' can't stand alone.",
      },
    ],
    task: {
      kind: "write",
      prompt:
        "Write five sentences about something you did last weekend. Use at least two irregular past tense verbs (like ran, went, ate, saw or thought), one word that compares (like bigger or best), one sentence joined with and, but or so, and one sentence that uses because, when or after.",
      rubric: [
        "Uses at least two irregular past tense verbs correctly",
        "Uses a comparing word correctly",
        "Writes one compound sentence with and, but or so",
        "Writes one complex sentence with because, when or after",
        "Subjects and verbs agree",
      ],
    },
  },

  // 8. Opinion and informative writing, the writing process, and editing
  {
    id: "ela-3.writing",
    title: "Writing Opinions and Explaining Facts",
    minutes: 35,
    stage: "rhetoric",
    standards: ["W.3.1", "W.3.2", "W.3.4", "W.3.5", "W.3.6", "W.3.10", "L.3.2"],
    read: [
      "Writers write for different reasons. Two of the most important are sharing an opinion and explaining facts.",
      "In an opinion piece, you tell what you think and give reasons. Start by stating your opinion: Dogs make the best pets. Then give reasons, each with a detail: Dogs are loyal. For example, my dog waits by the door every day. Linking words like because, therefore, since and for example connect your reasons to your opinion. End with a conclusion that says your opinion again in a new way.",
      "In an informative piece, you teach your reader about a topic with facts. Introduce the topic, then group related facts together. One paragraph might tell what owls eat, and another how they hunt. Use facts, definitions and details. Linking words like also, another, and, more and but connect your ideas. End with a conclusion.",
      "Good writing happens in steps called the writing process. First, plan: pick a topic and list ideas. Next, draft: write it all down without worrying about mistakes. Then revise: make it clearer and stronger, maybe with help from a parent or friend. After that, edit: fix capital letters, punctuation and spelling. Finally, publish: make a neat copy or type it on a computer to share.",
      "When you edit, check the details. Capitalize the important words in titles, like The Tale of Peter Rabbit. Put a comma between a city and a state, like Dayton, Ohio. Use an apostrophe to show who owns something: the dog's bone (one dog) or the girls' room (more than one girl).",
      "Write often: short pieces in one sitting and longer ones over several days. Every piece makes you a stronger writer.",
    ].join("\n\n"),
    keyIdeas: [
      "An opinion piece states an opinion, gives reasons with linking words and ends with a conclusion.",
      "An informative piece introduces a topic, groups facts, uses linking words and ends with a conclusion.",
      "The writing process: plan, draft, revise, edit and publish.",
      "Edit for capitals in titles, commas in addresses and apostrophes for possessives.",
    ],
    hook: {
      text: "Which is better, summer or winter? You probably have an opinion! A good writer can change someone's mind with strong reasons. Let's learn how.",
    },
    teach: [
      {
        title: "Opinion Writing",
        teach:
          "In an opinion piece, you tell what you think and explain why. First, state your opinion clearly: 'Summer is the best season.' Next, give reasons, and back up each one with a detail. 'Summer is the best season because the days are long. For example, we can play outside until after dinner.' Linking words like because, therefore, since and for example connect your reasons to your opinion. Give at least two or three reasons. Finally, write a conclusion that says your opinion again in a new way: 'That's why summer will always be my favorite.'",
        visual: {
          type: "hotspots",
          title: "Build an opinion piece like a table",
          center: "Opinion",
          spots: [
            { label: "Opinion", icon: "📣", detail: "The tabletop: what you think. 'Summer is the best season.'" },
            { label: "Reason 1", icon: "🦵", detail: "A leg: 'because the days are long.'" },
            { label: "Reason 2", icon: "🦵", detail: "Another leg: 'Also, there is no school.'" },
            { label: "Linking words", icon: "🔗", detail: "because, therefore, since, for example" },
            { label: "Conclusion", icon: "🏁", detail: "Say your opinion again in a new way." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put this opinion paragraph in order.",
          steps: [
            "Summer is the best season of the year.",
            "One reason is that the days are long, so we can play outside after dinner.",
            "Another reason is that we can swim in the lake.",
            "That's why summer will always be my favorite season.",
          ],
          hint: "Opinion first, then reasons, then a conclusion that sums it up.",
          mistakes: [{ match: "conclusion first", coach: "The conclusion, 'That's why...', wraps things up. It goes last." }],
          seconds: 40,
        },
        think: {
          q: "Which sentence is a REASON for the opinion 'Dogs make great pets'?",
          choices: ["Dogs make great pets.", "Dogs are loyal and love to play.", "I'm writing about dogs.", "The end."],
          answer: 1,
          why: "Loyal and playful explain WHY dogs are great pets.",
          hints: [
            "That's the opinion itself. A reason explains why.",
            "",
            "That just names the topic. It doesn't explain why.",
            "That's not a reason. A reason tells WHY you think so.",
          ],
        },
        approaches: {
          analogy:
            "An opinion piece is like a table. The opinion is the tabletop, and each reason is a leg that holds it up. With only one leg, the table wobbles!",
          example:
            "Opinion: Reading before bed is a great habit. Reason: it helps you calm down. For example, I fall asleep faster after a chapter. Reason two: you learn new words. Conclusion: therefore, everyone should read before bed.",
          simpler: {
            q: "What does an opinion piece start with?",
            choices: ["Your opinion", "The conclusion"],
            answer: 0,
            why: "Tell the reader what you think first.",
            hints: ["", "The conclusion comes at the end, not the start."],
          },
        },
      },
      {
        title: "Informative Writing",
        teach:
          "In an informative piece, you teach your reader about a topic with facts. Start by introducing the topic: 'Owls are amazing night hunters.' Then group facts that go together. One paragraph might tell how owls hunt, and another what owls eat. Use facts, definitions and details. A definition explains a word: 'A predator is an animal that hunts other animals.' Linking words like also, another, and, more and but connect your ideas. End with a conclusion that sums up the topic. Pictures and headings can help your reader too.",
        visual: {
          type: "compare",
          left: {
            title: "How owls hunt",
            points: ["Big eyes help them see at night", "Sharp ears hear mice under leaves", "Soft feathers make their flight nearly silent"],
          },
          right: {
            title: "What owls eat",
            points: ["Mice and other small animals", "Insects", "Some owls catch fish"],
          },
        },
        probe: {
          type: "sort",
          prompt: "Group the facts for an informative piece about owls.",
          buckets: ["How owls hunt", "What owls eat"],
          items: [
            { text: "Their big eyes see well at night.", bucket: 0 },
            { text: "Their sharp ears hear tiny sounds.", bucket: 0 },
            { text: "Soft feathers make their flight nearly silent.", bucket: 0 },
            { text: "Many owls eat mice.", bucket: 1 },
            { text: "Some owls eat insects.", bucket: 1 },
            { text: "A few kinds of owls catch fish.", bucket: 1 },
          ],
          hint: "Is the fact about HOW they catch food, or WHAT food they catch?",
          seconds: 45,
        },
        think: {
          q: "What should an informative piece be full of?",
          choices: ["Made-up adventures", "Facts, definitions and details", "Only opinions", "Jokes"],
          answer: 1,
          why: "Informative writing teaches the reader with true information.",
          hints: [
            "Made-up adventures are stories, not informative writing.",
            "",
            "Opinions belong in opinion pieces. Informative writing teaches facts.",
            "A joke might be fun, but informative writing is mostly facts.",
          ],
        },
        approaches: {
          analogy:
            "Grouping facts is like sorting laundry. Socks go in one pile, shirts in another. Your reader finds what they need, just like you find your socks.",
          example:
            "Topic: honeybees. Paragraph 1, the hive: one queen, thousands of workers. Paragraph 2, food: bees make honey from nectar. Also, they carry pollen. Conclusion: bees are busy helpers in nature.",
          simpler: {
            q: "Which sentence is a fact?",
            choices: ["Owls hunt at night.", "Owls are the coolest birds."],
            answer: 0,
            why: "You can check that owls hunt at night in a book.",
            hints: ["", "Coolest is what someone thinks. That's an opinion."],
          },
        },
      },
      {
        title: "The Writing Process",
        teach:
          "Good writing doesn't happen all at once. Writers use steps called the writing process. First, plan: choose a topic and list or draw your ideas. Next, draft: write it all down without worrying about mistakes. Then revise: reread it and make it clearer and stronger. Add details, take out parts that don't fit, and ask a parent or friend for ideas. After that, edit: fix capital letters, punctuation and spelling. Finally, publish: make a neat copy or type it on a computer to share. Typing gets faster with practice!",
        visual: {
          type: "sequence",
          prompt: "The five steps of the writing process.",
          steps: ["Plan: pick a topic and list ideas", "Draft: write it all down", "Revise: make it clearer and stronger", "Edit: fix capitals, punctuation and spelling", "Publish: make a neat copy to share"],
        },
        probe: {
          type: "match",
          prompt: "Match each step of the writing process to what you do.",
          pairs: [
            { left: "Plan", right: "Choose a topic and list ideas" },
            { left: "Draft", right: "Write it all down without worrying about mistakes" },
            { left: "Revise", right: "Add details and make it clearer" },
            { left: "Edit", right: "Fix capitals, punctuation and spelling" },
            { left: "Publish", right: "Make a neat copy or type it to share" },
          ],
          hint: "Revise means re-see: make the ideas better. Edit means fix the small mistakes.",
          seconds: 50,
        },
        think: {
          q: "You add a detail and take out a sentence that doesn't fit. Which step is that?",
          choices: ["Plan", "Revise", "Publish"],
          answer: 1,
          why: "Revising means improving the ideas and making the writing clearer.",
          hints: [
            "Planning comes before you write anything.",
            "",
            "Publishing is the final neat copy, after the changes.",
          ],
        },
        approaches: {
          analogy:
            "The writing process is like building with clay. First you plan what to make, then you shape a rough lump, then you smooth it and add details, and finally you paint it to show everyone.",
          example:
            "Plan: I'll write about my grandma's garden. Draft: I write fast. Revise: I add 'the tomatoes were red as fire trucks.' Edit: I fix a missing period. Publish: I type it and give it to Grandma.",
          simpler: {
            q: "Which step comes first?",
            choices: ["Publish", "Plan"],
            answer: 1,
            why: "You plan before you write.",
            hints: ["Publishing is the very last step.", ""],
          },
        },
      },
      {
        title: "Editing for Capitals, Commas and Apostrophes",
        teach:
          "When you edit, check the details. Capitalize the first word and the important words in a title, like The Tale of Peter Rabbit. Small words like of, the and and stay lowercase unless they come first. Put a comma between a city and its state: Dayton, Ohio. Use an apostrophe to show that someone owns something. For one owner, add 's: the dog's bone. For more than one owner that already ends in s, add just the apostrophe: the girls' room. When you're not sure how to spell a word, check a dictionary.",
        visual: {
          type: "flip",
          cards: [
            { front: "Titles", back: "Capitalize the first and important words: The Tale of Peter Rabbit." },
            { front: "Addresses", back: "Comma between city and state: Dayton, Ohio." },
            { front: "One owner", back: "Add 's: the dog's bone." },
            { front: "More than one owner", back: "Add ' after the s: the girls' room." },
            { front: "Spelling", back: "Not sure? Check a dictionary." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap every sentence that is written correctly.",
          sentences: [
            "We read The Tale of Peter Rabbit.",
            "My uncle lives in Austin Texas.",
            "The cat's tail is fluffy.",
            "We read the wind in the willows.",
            "The two boys' bikes were muddy.",
          ],
          correct: [0, 2, 4],
          hint: "Check for capitals in titles, a comma between city and state, and apostrophes in the right place.",
          mistakes: [
            { match: "Austin Texas", coach: "A city and state need a comma between them: Austin, Texas." },
            { match: "the wind in the willows", coach: "Titles need capitals: The Wind in the Willows." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which is correct for a bone that belongs to one dog?",
          choices: ["the dogs bone", "the dog's bone", "the dogs' bone"],
          answer: 1,
          why: "One owner: add apostrophe s.",
          hints: [
            "Without an apostrophe, dogs just means more than one dog.",
            "",
            "The apostrophe after the s means more than one dog owns it.",
          ],
        },
        approaches: {
          analogy:
            "Editing is like checking your backpack before school. Homework? Check. Lunch? Check. Capitals, commas, apostrophes? Check!",
          example:
            "Before: 'my friend from chicago illinois loves the cats toy.' After: 'My friend from Chicago, Illinois, loves the cat's toy.' Capitals for the first word and place names, a comma between city and state, and an apostrophe for the owner.",
          simpler: {
            q: "Where does the comma go?",
            choices: ["Dayton, Ohio", "Day, ton Ohio"],
            answer: 0,
            why: "The comma goes between the city and the state.",
            hints: ["", "Don't split the city's name. The comma goes between the city and the state."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Opinion or informative? Sort each sentence.",
      buckets: ["Opinion writing", "Informative writing"],
      items: [
        { text: "Pizza is the best lunch ever.", bucket: 0 },
        { text: "Everyone should learn to swim.", bucket: 0 },
        { text: "I think fall is the prettiest season.", bucket: 0 },
        { text: "A tadpole grows into a frog.", bucket: 1 },
        { text: "The Mississippi River flows south to the Gulf of Mexico.", bucket: 1 },
        { text: "Honeybees make honey from nectar.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain how to write a strong opinion piece and how it's different from an informative piece. Then name the five steps of the writing process.",
      keyPoints: [
        "An opinion piece states an opinion and gives reasons",
        "Linking words like because and for example connect reasons",
        "An informative piece teaches facts grouped by topic",
        "Both end with a conclusion",
        "The steps are plan, draft, revise, edit and publish",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Recess should be longer {0} kids need to move. {1}, running helps us focus in class. {2}, recess should be longer.",
        blanks: [{ answers: ["because", "since"] }, { answers: ["For example"] }, { answers: ["Therefore"] }],
        bank: ["because", "For example", "Therefore", "But", "Or"],
        hint: "Because gives a reason, for example gives a detail, and therefore wraps it up.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put the writing process in order.",
        steps: ["Plan", "Draft", "Revise", "Edit", "Publish"],
        hint: "Think before you write, write it down, make it better, fix mistakes, then share.",
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that is written correctly.",
        sentences: [
          "My grandpa lives in Denver, Colorado.",
          "The girls' kites flew high.",
          "Have you read the cat in the hat?",
          "The birds nest is in the oak tree.",
        ],
        correct: [0, 1],
        hint: "Look for a comma between city and state, apostrophes for owners and capitals in titles.",
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each linking word to its job.",
        pairs: [
          { left: "because", right: "Gives a reason" },
          { left: "for example", right: "Gives a detail to show it" },
          { left: "also", right: "Adds another fact" },
          { left: "therefore", right: "Leads to the conclusion" },
        ],
        hint: "Try each word in a sentence and see what it does.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What comes at the end of an opinion piece?",
        choices: ["A new opinion", "A conclusion that sums up your opinion", "A list of questions", "Nothing"],
        answer: 1,
        why: "A conclusion wraps up your opinion in a new way.",
      },
      {
        q: "Which title is capitalized correctly?",
        choices: ["The Wind In The Willows", "the wind in the willows", "The Wind in the Willows"],
        answer: 2,
        why: "Capitalize the first word and important words; small words like in and the stay lowercase unless first.",
      },
      {
        q: "Which step of the writing process means fixing capitals, punctuation and spelling?",
        choices: ["Edit", "Plan", "Draft", "Publish"],
        answer: 0,
        why: "Editing is fixing the small mistakes.",
      },
      {
        q: "Which shows a room that belongs to more than one girl?",
        choices: ["the girl's room", "the girls room", "the girls' room"],
        answer: 2,
        why: "More than one owner ending in s: put the apostrophe after the s.",
      },
    ],
    task: {
      kind: "write",
      prompt:
        "Write an opinion piece of at least five sentences: Which is the best season of the year, and why? State your opinion, give at least two reasons with details, use linking words (because, for example, also, therefore), and end with a conclusion. Then reread it, revise one sentence to make it stronger, and edit for capitals and punctuation.",
      rubric: [
        "States a clear opinion in the first sentence",
        "Gives at least two reasons with details",
        "Uses linking words like because, for example or therefore",
        "Ends with a conclusion that restates the opinion",
        "Capitals, end marks and spelling are mostly correct",
      ],
    },
  },

  // 9. Stories, research and speaking and listening
  {
    id: "ela-3.stories-research-speaking",
    title: "Telling Stories, Doing Research and Speaking Up",
    minutes: 35,
    stage: "rhetoric",
    standards: ["W.3.3", "W.3.7", "W.3.8", "SL.3.1", "SL.3.3", "SL.3.4", "SL.3.6", "L.3.2", "L.3.6", "W.3.10"],
    read: [
      "Writers tell stories, find out facts and share what they know out loud. Today you'll do all three.",
      "A story, or narrative, can be about something real or made up. It needs a narrator (who tells it) and characters. It sets the scene, then tells events in an order that makes sense. Time words like first, after that, later that night and at last help the reader follow along. Good stories show what characters do, say, think and feel, and they end in a way that feels finished.",
      "Characters talk in dialogue. Put quotation marks around the exact words someone says, and put a comma or end mark inside them: \"Let's fly the kite,\" said Ben. Ben asked, \"Is it windy enough?\"",
      "Research means finding out. Start with a question, like How do hot air balloons fly? Look in books, encyclopedias and trusted websites, and remember things you have seen yourself. Take short notes in your own words, then sort your notes into groups, such as how a balloon rises and how pilots steer. Then share what you learned.",
      "Speaking and listening are skills too. In a discussion, come prepared, take turns, listen carefully and connect your ideas to what others said: I agree with Sam because... Ask questions to understand a speaker better. When you give a report, speak clearly at a steady pace, look at your listeners and use complete sentences.",
    ].join("\n\n"),
    keyIdeas: [
      "A story has a narrator, characters, events in order with time words, dialogue, feelings and an ending.",
      "Put quotation marks around the exact words a character says.",
      "Research: ask a question, find sources, take notes in your own words and sort them.",
      "In discussions, take turns, listen, ask questions and speak clearly in complete sentences.",
    ],
    hook: {
      text: "Long ago, in 1783, two brothers in France sent the first people floating into the sky in a hot air balloon. How does a giant bag of air lift people off the ground? A great writer can tell that story, research the facts and share them out loud.",
    },
    teach: [
      {
        title: "Writing a Story",
        teach:
          "A story, or narrative, can be about something real or made up. It needs a narrator, the one telling it, and characters. Start by setting the scene: who, where and when. Then tell the events in an order that makes sense. Time words like first, after that, later that night and at last help your reader follow along. Show what your characters do, say, think and feel: 'My hands shook as I let go of the string.' Finally, give your story an ending that feels finished, like the last page of a good book.",
        visual: {
          type: "hotspots",
          title: "The parts of a good story",
          center: "Narrative",
          spots: [
            { label: "Narrator", icon: "🗣️", detail: "Who tells the story: a character (I) or someone outside it (he, she)." },
            { label: "Setting", icon: "🏝️", detail: "Where and when the story happens." },
            { label: "Events in order", icon: "➡️", detail: "Beginning, middle and end, with time words." },
            { label: "Show feelings", icon: "💓", detail: "What characters do, say, think and feel." },
            { label: "Ending", icon: "🏁", detail: "Wrap it up so it feels finished." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Use the time words to put this story in order.",
          steps: [
            "One windy morning, Ava carried her new kite to the hill.",
            "First, she let out the string slowly.",
            "After that, a big gust lifted the kite high over the trees.",
            "Later that afternoon, the wind died down and the kite drifted to the grass.",
            "At last, Ava walked home, already planning her next flight.",
          ],
          hint: "Look at the time words: one morning, first, after that, later that afternoon, at last.",
          seconds: 45,
        },
        think: {
          q: "Which sentence SHOWS how a character feels?",
          choices: ["Ava had a kite.", "My hands shook as I let go of the string.", "The hill was green.", "It was Tuesday."],
          answer: 1,
          why: "Shaking hands show the character is nervous without saying the word.",
          hints: [
            "That tells what she has, not how she feels.",
            "",
            "That describes the setting, not a feeling.",
            "That tells when, not how anyone feels.",
          ],
        },
        approaches: {
          analogy:
            "Time words are like stepping stones across a creek. Without them, your reader has to jump and might fall in. With them, the reader steps easily from one event to the next.",
          example:
            "Beginning: 'Last summer, I went fishing with Grandpa.' Middle: 'At first, nothing bit. After an hour, my line jerked hard!' End: 'That night, we ate the fish for dinner, and I felt proud.'",
          simpler: {
            q: "Which is a time word?",
            choices: ["after that", "purple"],
            answer: 0,
            why: "After that tells when something happened.",
            hints: ["", "Purple is a color. It doesn't tell when."],
          },
        },
      },
      {
        title: "Dialogue and Quotation Marks",
        teach:
          "When characters talk, it's called dialogue. Dialogue makes a story come alive. Put quotation marks around the exact words a character says. The comma or end mark goes inside the quotation marks. Here's one way: \"Let's fly the kite,\" said Ben. Here's another: Ben asked, \"Is it windy enough?\" Notice the comma after asked, before the quotation marks open. Start a new paragraph each time a different character speaks. That way, your reader always knows who is talking.",
        visual: {
          type: "flip",
          cards: [
            { front: "Dialogue", back: "The words characters say to each other." },
            { front: "Quotation marks \" \"", back: "Go around the exact words someone says." },
            { front: "\"Let's go,\" said Ben.", back: "The comma goes INSIDE the closing quotation marks." },
            { front: "Ben asked, \"Is it windy?\"", back: "A comma comes before the quotation opens; the ? goes inside." },
            { front: "New speaker", back: "Start a new paragraph each time someone else talks." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap every sentence where the dialogue is punctuated correctly.",
          sentences: [
            "\"Let's fly the kite,\" said Ben.",
            "\"Is it windy enough\"? asked Mia.",
            "Ben said, \"The wind is perfect today.\"",
            "Mia shouted \"Look how high it goes!\"",
            "\"Hold on tight!\" called Grandpa.",
          ],
          correct: [0, 2, 4],
          hint: "The end mark or comma goes inside the closing quotation marks, and a comma comes after 'said' or 'shouted' before the quotation opens.",
          mistakes: [
            { match: "Is it windy enough", coach: "The question mark belongs inside the quotation marks: \"Is it windy enough?\" asked Mia." },
            { match: "Mia shouted", coach: "Put a comma after shouted, before the quotation marks: Mia shouted, \"Look...\"" },
          ],
          seconds: 50,
        },
        think: {
          q: "Where do quotation marks go?",
          choices: ["Around the whole paragraph", "Around the exact words a character says", "Around the character's name", "Around every verb"],
          answer: 1,
          why: "Quotation marks show exactly what someone said out loud.",
          hints: [
            "That's too much. Only the spoken words get quotation marks.",
            "",
            "The name tells who spoke. The quotation marks go around what they said.",
            "Verbs don't need quotation marks. Only spoken words do.",
          ],
        },
        approaches: {
          analogy:
            "Quotation marks are like a speech bubble in a comic strip. Everything inside the bubble is what the character says out loud.",
          example:
            "Without dialogue: Mia told Ben she was hungry. With dialogue: \"I'm so hungry!\" Mia told Ben. The quotation marks hold her exact words, and the exclamation point goes inside.",
          simpler: {
            q: "Which word is something a character SAID?",
            choices: ["\"Hello!\"", "smiled"],
            answer: 0,
            why: "Hello is in quotation marks, so it's spoken.",
            hints: ["", "Smiled is an action, not something said aloud."],
          },
        },
      },
      {
        title: "A Short Research Project",
        teach:
          "Research means finding out. Start with a question, like 'How do hot air balloons fly?' Then look in good sources: library books, encyclopedias and trusted websites. You can also use what you have seen yourself. Take short notes in your own words, just key words and facts, not whole copied sentences. For example: 'Hot air rises. Burner heats air inside. Balloon goes up.' Then sort your notes into groups, such as how a balloon rises and how pilots steer. Finally, share what you learned in writing or out loud.",
        visual: {
          type: "sequence",
          prompt: "The steps of a short research project.",
          steps: ["Ask a question", "Find good sources", "Take short notes in your own words", "Sort notes into groups", "Share what you learned"],
        },
        probe: {
          type: "sort",
          prompt: "Sort these research notes about hot air balloons into groups.",
          buckets: ["How a balloon rises", "How a pilot controls it"],
          items: [
            { text: "Hot air is lighter than cool air.", bucket: 0 },
            { text: "A burner heats the air inside.", bucket: 0 },
            { text: "The hot air makes the balloon float up.", bucket: 0 },
            { text: "Turn up the burner to go higher.", bucket: 1 },
            { text: "Let air cool to come down.", bucket: 1 },
            { text: "Ride winds that blow different ways at different heights.", bucket: 1 },
          ],
          hint: "Does the note explain WHY it goes up, or what the PILOT does?",
          seconds: 45,
        },
        think: {
          q: "What makes a good research note?",
          choices: ["A whole page copied word for word", "A few key words and facts in your own words", "A drawing of your pet", "Your opinion only"],
          answer: 1,
          why: "Short notes in your own words help you understand and remember.",
          hints: [
            "Copying everything is too long, and the words aren't yours.",
            "",
            "A pet drawing doesn't help answer your research question.",
            "Research is about finding facts, not just what you think.",
          ],
        },
        approaches: {
          analogy:
            "Research notes are like picking only the ripe apples from a tree. You don't carry the whole tree home, just the good parts you need.",
          example:
            "Book sentence: 'A balloon rises because the heated air inside it is less dense than the cooler air around it.' My note: 'Hot air inside is lighter, so it rises.'",
          simpler: {
            q: "What's the first step of research?",
            choices: ["Ask a question", "Share your report"],
            answer: 0,
            why: "Your question tells you what to look for.",
            hints: ["", "Sharing comes at the end, after you've found answers."],
          },
        },
      },
      {
        title: "Speaking and Listening",
        teach:
          "Speaking and listening are skills, just like reading. In a discussion, come prepared, having read or thought about the topic. Take turns and listen carefully while others talk. Connect your idea to what someone said: 'I agree with Sam because...' or 'I see it a different way.' Ask questions to understand a speaker better, like 'Can you tell me more about that?' When you give a report or tell a story, speak clearly at a steady pace, look at your listeners and use complete sentences. 'Balloons rise because hot air is lighter' is much clearer than 'Hot air. Up.'",
        visual: {
          type: "compare",
          left: {
            title: "A good listener",
            points: ["Looks at the speaker", "Waits for a turn", "Asks questions to learn more", "Connects to what others said"],
          },
          right: {
            title: "A good speaker",
            points: ["Comes prepared", "Speaks clearly at a steady pace", "Uses complete sentences", "Gives facts and details"],
          },
        },
        probe: {
          type: "sort",
          prompt: "Sort each habit: does it help a discussion or hurt it?",
          buckets: ["Helps", "Hurts"],
          items: [
            { text: "Waiting for your turn to talk", bucket: 0 },
            { text: "Saying 'I agree with Sam because...'", bucket: 0 },
            { text: "Asking 'Can you tell me more?'", bucket: 0 },
            { text: "Speaking in complete sentences", bucket: 0 },
            { text: "Talking while someone else is speaking", bucket: 1 },
            { text: "Mumbling very fast", bucket: 1 },
            { text: "Changing the topic to something else", bucket: 1 },
          ],
          hint: "Ask: does this help everyone understand and stay on topic?",
          seconds: 45,
        },
        think: {
          q: "Your friend shares an idea you don't understand. What's the best thing to do?",
          choices: ["Change the topic", "Ask a question, like 'Can you tell me more?'", "Start talking about something else", "Stop listening"],
          answer: 1,
          why: "Asking questions helps you understand the speaker better.",
          hints: [
            "Changing the topic leaves the idea unexplained.",
            "",
            "That stops the discussion instead of helping it.",
            "If you stop listening, you'll never understand the idea.",
          ],
        },
        approaches: {
          analogy:
            "A good discussion is like playing catch. One person tosses an idea, the next person catches it and tosses it back with something added. Nobody holds the ball forever.",
          example:
            "Sam says, 'I think balloons are safer than airplanes.' You say, 'I see it a different way, because balloons can't steer well. Can you tell me why you think so?' You connected, disagreed politely and asked a question.",
          simpler: {
            q: "Which is a complete sentence?",
            choices: ["Hot air. Up.", "Hot air rises because it is lighter."],
            answer: 1,
            why: "It has a subject and a verb and says a whole idea.",
            hints: ["That's just pieces of an idea. It's missing a whole thought.", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "A third grader wrote this story. Tap each sentence that uses a time word or phrase to show when things happen.",
      sentences: [
        "Early on Saturday morning, we drove to the balloon festival.",
        "The balloons were red, yellow and blue.",
        "After breakfast, the pilots lit their burners.",
        "\"Look at that one!\" shouted my brother.",
        "By noon, the sky was full of balloons.",
      ],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Explain how to do a short research project, from your question to sharing it. Then tell two things a good listener does in a discussion.",
      keyPoints: [
        "Start with a question",
        "Find good sources like books or trusted websites",
        "Take short notes in your own words and sort them into groups",
        "Share what you learned clearly in complete sentences",
        "A good listener takes turns and asks questions",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "In a story, characters' exact words go inside {0} marks. Words like first, after that and at last are {1} words that help readers follow the order.",
        blanks: [{ answers: ["quotation"] }, { answers: ["time"] }],
        bank: ["quotation", "time", "question", "color"],
        hint: "Quotation marks hold spoken words. Time words tell when.",
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the research steps in order.",
        steps: ["Ask a question", "Find good sources", "Take notes in your own words", "Sort notes into groups", "Share what you learned"],
        hint: "You need a question before you can look anything up, and you share at the end.",
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build the dialogue sentence with correct punctuation.",
        tiles: ["\"Hold on tight,\"", "said", "Grandpa."],
        distractors: ["\"Hold on tight\",", "Grandpa"],
        hint: "The comma goes inside the closing quotation marks, and the sentence ends with a period.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each discussion moment to the best thing to say.",
        pairs: [
          { left: "You agree with Sam.", right: "\"I agree with Sam because...\"" },
          { left: "You don't understand an idea.", right: "\"Can you tell me more about that?\"" },
          { left: "You see it differently.", right: "\"I see it a different way, because...\"" },
          { left: "Someone else is still talking.", right: "Wait quietly for your turn." },
        ],
        hint: "Good discussions connect to others, ask questions and take turns.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "Which sentence is punctuated correctly?",
        choices: ["\"I'm ready\" said Ava.", "\"I'm ready,\" said Ava.", "\"I'm ready\", said Ava."],
        answer: 1,
        why: "The comma goes inside the closing quotation marks.",
      },
      {
        q: "What should research notes be?",
        choices: ["Whole pages copied", "Short and in your own words", "Only pictures", "Made up"],
        answer: 1,
        why: "Short notes in your own words help you understand and avoid copying.",
      },
      {
        q: "Which phrase is a time phrase?",
        choices: ["under the bridge", "later that night", "a big red kite"],
        answer: 1,
        why: "Later that night tells WHEN.",
      },
      {
        q: "How should you speak when giving a report?",
        choices: ["Very fast so it's over quickly", "In a whisper", "Clearly, at a steady pace, in complete sentences", "Looking at the floor"],
        answer: 2,
        why: "Your listeners need to hear and follow you.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Do a mini research project. Pick a question about how something flies (a hot air balloon, a bird, a kite or a paper airplane). Find answers in at least two sources, write five short notes in your own words, and sort them into two groups. Then give your family a one-minute report: speak clearly, use complete sentences, and answer one question from your listeners.",
      rubric: [
        "Starts with a clear research question",
        "Uses at least two sources",
        "Notes are short, in their own words, and sorted into two groups",
        "Speaks clearly at a steady pace in complete sentences",
        "Answers a listener's question with a detail",
      ],
    },
  },
];

export const ela3 = k5Course("ela", 3, lessons);
