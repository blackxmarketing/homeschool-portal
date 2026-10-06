import { k5Course } from "./base";
import type { Lesson } from "../types";

/**
 * ela-4: Reading & Writing 4 (Common Core ELA, grade 4), taught by Grandpa Aesop.
 * Nine lessons through the year: word study, close reading of stories, myths,
 * poems and plays, point of view and tales from many lands, nonfiction
 * structure, accounts and evidence, grammar, opinion and informative writing
 * with research, and storytelling and presenting.
 * Stories, myths and poems are public domain, retold or quoted briefly.
 */

// 1. Word study: roots, affixes, long words, context clues and fluency
const words: Lesson = {
  id: "ela-4.word-detective",
  title: "Word Detective: Roots, Prefixes and Suffixes",
  minutes: 30,
  stage: "grammar",
  standards: ["RF.4.3", "RF.4.4", "L.4.4", "L.4.6"],
  read: [
    "Good readers are word detectives. When they meet a long word they don't know, they don't give up. They look for clues.",
    "The first clue is inside the word itself. Many English words are built from parts. A prefix comes at the front and changes the meaning: un- means not, re- means again, pre- means before, and dis- means not or the opposite. A suffix comes at the end: -ful means full of, -less means without, and -able means can be done. In the middle is the root, the main part. Many roots come from Greek and Latin. Tele means far, graph means write, photo means light, port means carry, and spect means look. So a telegraph writes messages that travel far, and a portable radio is one you can carry.",
    "The second clue is sound. Break a long word into syllables, and remember that each syllable has one vowel sound. Split between two consonants in the middle, as in nap-kin and hel-met. Peel off prefixes and suffixes first. Unbreakable becomes un-break-able, which is easy to read.",
    "The third clue is context, the words around the new word. Sometimes the sentence gives a definition, a synonym, an opposite or an example. If you're still stuck, use a dictionary for meaning, a glossary at the back of a book for subject words, or a thesaurus for words with similar meanings.",
    "Detectives also pick exact words. Instead of said, a writer might choose whispered, stammered or announced. Each one paints a clearer picture.",
    "Finally, good readers read smoothly. They read at a steady pace, with expression, and when a sentence doesn't make sense, they stop and reread it.",
  ].join("\n\n"),
  keyIdeas: [
    "Prefixes, roots and suffixes are clues to what a word means.",
    "Break long words into syllables; each syllable has one vowel sound.",
    "Context clues and reference books help you check a meaning.",
    "Fluent readers read with accuracy, a good pace and expression, and reread when something doesn't make sense.",
  ],
  hook: {
    text: "Gather round, young reader. Here is a mystery word: unbreakable. It looks long and scary. But inside it are three little clues, like footprints in the snow. Today you become a word detective, and no word will ever scare you again.",
  },
  teach: [
    {
      title: "Word Parts: Prefixes, Roots and Suffixes",
      teach:
        "Many long words are built from smaller parts, like a train built from cars. A prefix rides at the front. Un- and dis- mean not, re- means again, and pre- means before. A suffix rides at the back. The suffix -ful means full of, -less means without, and -able means can be done. The root is the engine in the middle. Many roots come from Greek and Latin. Tele means far, graph means write, photo means light, port means carry, and spect means look. Put them together and you can crack words you have never seen: a spectator is a person who looks, and transport means to carry across.",
      visual: {
        type: "flip",
        cards: [
          { front: "re-", back: "again: reread, rebuild" },
          { front: "pre-", back: "before: preview, preheat" },
          { front: "-less", back: "without: fearless, careless" },
          { front: "tele (Greek)", back: "far: telephone, telescope" },
          { front: "graph (Greek)", back: "write: autograph, paragraph" },
          { front: "port (Latin)", back: "carry: portable, transport" },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each word part to its meaning.",
        pairs: [
          { left: "tele", right: "far" },
          { left: "graph", right: "write" },
          { left: "port", right: "carry" },
          { left: "spect", right: "look" },
          { left: "re-", right: "again" },
          { left: "-less", right: "without" },
        ],
        hint: "Think of a word you know with each part: telescope, autograph, portable, spectator, reread, fearless.",
        seconds: 45,
      },
      think: {
        q: "The root port means carry. What is a portable stove?",
        choices: ["A stove that is very hot", "A stove you can carry", "A stove from long ago"],
        answer: 1,
        why: "Port means carry and -able means can be done, so portable means able to be carried.",
        hints: ["Heat isn't in the word parts. Look at the root port.", "", "Nothing in portable means old. Look at port and -able."],
      },
      approaches: {
        analogy: "Word parts are like LEGO bricks. Once you know what each brick is, you can build new words or take apart words you have never seen before.",
        example: "Take apart 'telephone': tele means far and phone means sound. A telephone carries sound from far away. Now try 'telescope': tele means far and scope means look at. A telescope lets you look at things far away.",
        simpler: {
          q: "The prefix re- means again. What does reread mean?",
          choices: ["Read again", "Never read", "Read slowly"],
          answer: 0,
          why: "Re- means again, so reread means read again.",
          hints: ["", "Re- does not mean never. It means again.", "Re- is about doing it again, not about speed."],
        },
      },
    },
    {
      title: "Chunking Long Words",
      teach:
        "When a word is long, read it in chunks called syllables. Every syllable has one vowel sound. Here are three tricks. First, peel off the prefix and suffix: unbreakable becomes un, break, able. Second, when two consonants sit between vowels, split between them: nap-kin, hel-met, win-ter. Third, look for chunks you already know, like -tion, which says shun, as in na-tion and ac-tion. Then blend the chunks together, smoothly. Try transportation: trans, por, ta, tion. Four chunks, four vowel sounds, one long word read with ease.",
      visual: {
        type: "flip",
        cards: [
          { front: "un-break-able", back: "Peel off the prefix and suffix first." },
          { front: "nap-kin", back: "Two consonants between vowels? Split between them." },
          { front: "-tion", back: "Says 'shun', as in nation and action." },
          { front: "trans-por-ta-tion", back: "Four chunks, four vowel sounds." },
        ],
      },
      probe: {
        type: "build",
        prompt: "Build the word 'disagreement' by tapping its chunks in order.",
        tiles: ["dis", "a", "gree", "ment"],
        distractors: ["tion", "pre"],
        hint: "Peel off the prefix dis- at the front and the suffix -ment at the end. What's left in the middle?",
        seconds: 30,
      },
      think: {
        q: "How should you split the word 'helmet' into syllables?",
        choices: ["he-lmet", "helm-et", "hel-met"],
        answer: 2,
        why: "When two consonants (l and m) sit between vowels, split between them: hel-met.",
        hints: [
          "'lm' can't start a syllable in English. Split between the two consonants.",
          "Look at the two consonants in the middle, l and m. Split between them, not after them.",
          "",
        ],
      },
      approaches: {
        analogy: "Eating a big sandwich in one bite is impossible, but you can finish it bite by bite. Long words are the same: read them one chunk at a time.",
        example: "Read 'unforgettable'. Peel off un- at the front and -able at the back. The middle is forget, with a second t added: for-get-t. So it's un-for-get-ta-ble. Blend it: unforgettable.",
        simpler: {
          q: "How many vowel sounds does each syllable have?",
          choices: ["None", "One", "Three"],
          answer: 1,
          why: "Every syllable has exactly one vowel sound. That's how you count syllables.",
          hints: ["A syllable always needs a vowel sound. Say 'cat' and listen.", "", "Say 'nap' out loud. You hear just one vowel sound."],
        },
      },
    },
    {
      title: "Context Clues and Reference Books",
      teach:
        "The words around a new word are called its context, and they often give clues. A definition clue tells you the meaning right there: 'The ship's hull, or body, was made of oak.' A synonym clue gives a word that means the same. An antonym clue shows the opposite: 'Unlike his timid sister, Leo was bold.' An example clue lists examples: 'Reptiles, such as turtles and snakes, have scales.' When clues aren't enough, use a book. A dictionary gives meanings and how to say a word. A glossary, at the back of a nonfiction book, explains its special subject words. A thesaurus gives synonyms, so you can find the exact word you need, like whispered or stammered instead of said.",
      visual: {
        type: "hotspots",
        title: "Where to find a word's meaning",
        center: "New word",
        spots: [
          { label: "Context", icon: "🔍", detail: "Read the words around it: definitions, synonyms, opposites and examples." },
          { label: "Dictionary", icon: "📕", detail: "Meanings, how to say the word, and its part of speech." },
          { label: "Glossary", icon: "📑", detail: "At the back of a nonfiction book: meanings of that book's subject words." },
          { label: "Thesaurus", icon: "📗", detail: "Synonyms and antonyms, to help you pick the exact word." },
        ],
      },
      probe: {
        type: "cloze",
        text: "To find a word that means the same as 'said', open a {0}. To learn what 'photosynthesis' means in your science book, check its {1} at the back. To find out how to pronounce a word, use a {2}.",
        blanks: [{ answers: ["thesaurus"] }, { answers: ["glossary"] }, { answers: ["dictionary"] }],
        bank: ["thesaurus", "glossary", "dictionary", "atlas", "calendar"],
        hint: "A thesaurus gives synonyms, a glossary explains a book's subject words, and a dictionary gives meanings and pronunciation.",
        mistakes: [
          { match: "atlas", coach: "An atlas is a book of maps. It won't tell you what a word means." },
          { match: "calendar", coach: "A calendar shows days and dates, not word meanings." },
        ],
        seconds: 35,
      },
      think: {
        q: "'Unlike his timid sister, Leo was bold.' What does timid probably mean?",
        choices: ["Shy and easily scared", "Very tall", "Brave and daring"],
        answer: 0,
        why: "'Unlike' signals an opposite. Leo was bold, so his sister was the opposite of bold: shy.",
        hints: ["", "The sentence compares how brave they are, not how tall they are.", "'Unlike' tells you the sister is the opposite of Leo, who was bold."],
      },
      approaches: {
        analogy: "Context clues are like the picture on a puzzle box. Even with one piece missing, the pieces around the gap show you what belongs there.",
        example: "'The desert was arid; it had not rained for months.' The part after the semicolon is a clue: no rain for months. So arid must mean very dry.",
        simpler: {
          q: "Where in a nonfiction book do you usually find the glossary?",
          choices: ["On the front cover", "In the middle of chapter one", "At the back of the book"],
          answer: 2,
          why: "The glossary is a little dictionary at the back of a nonfiction book.",
          hints: ["The front cover has the title and author, not word meanings.", "Chapters hold the main text. The word list is somewhere else.", ""],
        },
      },
    },
    {
      title: "Reading Smoothly",
      teach:
        "Reading well out loud is called fluency. It has three parts. Accuracy means reading the words correctly. Pace means reading at a steady speed, not racing and not crawling. Expression means letting your voice show the meaning: rising for a question, lively for an exclamation, pausing at commas and periods. Fluent readers also check themselves. If a sentence doesn't make sense, like 'The horse galloped across the filed', they stop, look again at the tricky word, fix it to field, and reread the sentence. Rereading isn't failing. It's what strong readers do.",
      visual: {
        type: "compare",
        left: { title: "Choppy reading", points: ["Word... by... word", "Same flat voice for everything", "Keeps going even when it makes no sense"] },
        right: { title: "Fluent reading", points: ["Smooth phrases at a steady pace", "Voice shows questions, excitement and pauses", "Stops and rereads when something sounds wrong"] },
      },
      probe: {
        type: "sequence",
        prompt: "A sentence you just read didn't make sense. Put a good reader's steps in order.",
        steps: [
          "Notice that the sentence doesn't make sense",
          "Stop reading for a moment",
          "Look at the tricky word again, chunk by chunk",
          "Reread the whole sentence with the fixed word",
          "Keep reading",
        ],
        hint: "First you have to notice the problem. Last, once it's fixed, you carry on.",
        seconds: 40,
      },
      think: {
        q: "What should your voice do at a question mark?",
        choices: ["Stop completely and start a new page", "Rise up at the end, like asking", "Get very loud"],
        answer: 1,
        why: "Expression means your voice shows the meaning, and a question usually rises at the end.",
        hints: ["A question mark ends a sentence, but it doesn't mean stop reading altogether.", "", "Loud is for exclamations. Questions sound different."],
      },
      approaches: {
        analogy: "Reading aloud is like riding a bike: too slow and you wobble, too fast and you crash. A steady pace keeps you balanced and lets the listener enjoy the ride.",
        example: "Read 'Wait! Is that a bear?' First 'Wait!' with surprise and energy, a tiny pause, then 'Is that a bear?' with your voice going up at the end. That's expression.",
        simpler: {
          q: "Which part of fluency means reading the words correctly?",
          choices: ["Accuracy", "Pace", "Expression"],
          answer: 0,
          why: "Accuracy means reading each word correctly.",
          hints: ["", "Pace is about speed, not correctness.", "Expression is about how your voice sounds."],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each word by what its prefix means.",
    buckets: ["not (un-, dis-)", "again (re-)", "before (pre-)"],
    items: [
      { text: "unhappy", bucket: 0 },
      { text: "dishonest", bucket: 0 },
      { text: "disagree", bucket: 0 },
      { text: "rebuild", bucket: 1 },
      { text: "retell", bucket: 1 },
      { text: "reread", bucket: 1 },
      { text: "preview", bucket: 2 },
      { text: "preheat", bucket: 2 },
      { text: "prepay", bucket: 2 },
    ],
  },
  explain: {
    prompt: "You meet the word 'unpredictable' in a book. Explain how you would figure out how to read it and what it means.",
    keyPoints: [
      "Break it into syllables or chunks",
      "The prefix un- means not",
      "The root dict means say and pre- means before",
      "The suffix -able means can be",
      "Check with context clues or a dictionary",
    ],
  },
  mastery: [
    {
      type: "match",
      prompt: "Match each word to its meaning, using its parts.",
      pairs: [
        { left: "fearless", right: "without fear" },
        { left: "preview", right: "look at before" },
        { left: "telescope", right: "tool for looking far" },
        { left: "autograph", right: "your own written name" },
      ],
      hint: "-less means without, pre- means before, tele means far, auto means self and graph means write.",
      seconds: 40,
    },
    {
      type: "number",
      prompt: "How many syllables are in the word 'transportation'?",
      answer: 4,
      hint: "Count the vowel sounds: trans... por... ta... tion.",
      mistakes: [{ match: "3", coach: "Clap it slowly: trans, por, ta, tion. That's one more than three." }],
      seconds: 20,
    },
    {
      type: "cloze",
      text: "'The lost hiker was famished; he had not eaten in two days.' Famished means very {0}. The clue that helped was that he had not {1}.",
      blanks: [{ answers: ["hungry"] }, { answers: ["eaten"] }],
      bank: ["hungry", "sleepy", "eaten", "walked", "happy"],
      hint: "Read the part after the semicolon. What happens when you don't eat for two days?",
      seconds: 30,
    },
    {
      type: "sort",
      prompt: "Which words name an exact way of speaking? Sort them.",
      buckets: ["Exact speaking word", "Not a speaking word"],
      items: [
        { text: "whispered", bucket: 0 },
        { text: "stammered", bucket: 0 },
        { text: "announced", bucket: 0 },
        { text: "whined", bucket: 0 },
        { text: "galloped", bucket: 1 },
        { text: "shivered", bucket: 1 },
        { text: "napkin", bucket: 1 },
      ],
      hint: "Ask: could a character do this with their voice, as a better word for 'said'?",
      seconds: 35,
    },
  ],
  check: [
    {
      q: "What does the suffix -less mean in the word 'careless'?",
      choices: ["Full of", "Again", "Without"],
      answer: 2,
      why: "-less means without, so careless means without care.",
    },
    {
      q: "Which is the best way to break 'napkin' into syllables?",
      choices: ["nap-kin", "na-pkin", "napk-in"],
      answer: 0,
      why: "Split between the two consonants in the middle, p and k: nap-kin.",
    },
    {
      q: "Where would you look for a synonym for 'big'?",
      choices: ["An atlas", "A thesaurus", "A glossary of science words"],
      answer: 1,
      why: "A thesaurus lists synonyms, like huge, giant and enormous.",
    },
    {
      q: "You read a sentence and it doesn't make sense. What does a fluent reader do?",
      choices: ["Skip the rest of the page", "Read faster", "Stop, fix the tricky word and reread"],
      answer: 2,
      why: "Good readers check themselves: they stop, fix the word and reread the sentence.",
    },
  ],
  task: {
    kind: "project",
    prompt:
      "Word detective hunt: In a book you are reading, find 6 long words with a prefix or a suffix. Write each word, split it into chunks, and write what its parts mean. Look one up in a dictionary to check. Then read one page aloud to a parent with good pace and expression.",
    rubric: [
      "Six long words are found and written correctly",
      "Each word is split into syllables or word parts",
      "The meaning of each prefix, suffix or root is given",
      "One word is checked in a dictionary",
      "The page is read aloud smoothly, with expression",
    ],
  },
};

// 2. Reading stories closely: details, inferences, characters, theme, discussion
const closeReading: Lesson = {
  id: "ela-4.close-reading",
  title: "Reading Closely: Details, Characters and Theme",
  minutes: 30,
  stage: "logic",
  standards: ["RL.4.1", "RL.4.2", "RL.4.3", "RL.4.10", "SL.4.1"],
  read: [
    "Here is one of my oldest fables, The Lion and the Mouse. A great lion lay asleep in the sun. A little mouse, scurrying home, ran right across his nose. The lion woke with a roar and trapped the mouse under his huge paw. 'Please let me go,' squeaked the mouse, trembling. 'Someday I may be able to help you.' The lion laughed. How could a tiny mouse ever help the king of beasts? Still, he lifted his paw and let her go.",
    "Days later, the lion was caught in a hunter's net. The more he struggled, the tighter the ropes held him. His roars echoed through the forest. The mouse heard him and came running. She gnawed through the ropes, one by one, until the lion was free. 'You laughed at me,' said the mouse, 'but now you see that even a little mouse can help a lion.'",
    "When you read closely, you notice details. Some things the story says outright: the lion was caught in a net. Other things you must infer, which means figuring them out from clues plus what you already know. The story never says 'the mouse was scared', but she was trembling, so we can infer it.",
    "To describe a character in depth, look at four things: what the character says, does and thinks, and how others react. The mouse speaks up bravely, keeps her promise and works hard. She is brave and loyal.",
    "The theme is the big lesson of a story. It isn't one word like 'mice'. It's a message, like 'Kindness is never wasted' or 'Even the small can help the great.' You find it by asking what the characters learned. A summary retells the main events in order, briefly, without your opinions.",
    "Finally, talk about stories with others. Come prepared, take turns, and build on what others say.",
  ].join("\n\n"),
  keyIdeas: [
    "Refer to details from the text when you explain or infer.",
    "An inference is a clue from the text plus what you already know.",
    "Describe characters by their words, actions, thoughts and how others react.",
    "The theme is the story's big message; a summary retells main events briefly and in order.",
  ],
  hook: {
    text: "Long ago, I told a story about a lion who laughed at a mouse. People have told it for more than two thousand years. Why does a story about a mouse last so long? Because it hides a lesson inside. Today you'll learn to find it, like a pearl in an oyster.",
  },
  teach: [
    {
      title: "Details and Inferences",
      teach:
        "Some things a story tells you outright. 'The lion was caught in a hunter's net' is right there in the text. Other things you must infer. An inference is a smart guess built from clues in the text plus what you already know. The story says the mouse was trembling. You know people tremble when they are scared. So you can infer she was afraid. When you explain what a story means, always point to the details that prove it: 'I think the mouse was scared because the text says she was trembling.' That is called referring to the text.",
      visual: {
        type: "compare",
        left: { title: "Says it outright", points: ["The lion trapped the mouse under his paw.", "The mouse gnawed through the ropes.", "Just find it in the text."] },
        right: { title: "Inference", points: ["The mouse was afraid (she was trembling).", "The lion thought mice were useless (he laughed).", "Text clue + what you know."] },
      },
      probe: {
        type: "highlight",
        prompt: "Tap the TWO sentences that are clues that the lion thought the mouse was too small to matter.",
        sentences: [
          "A great lion lay asleep in the sun.",
          "The lion laughed.",
          "How could a tiny mouse ever help the king of beasts?",
          "The mouse heard him and came running.",
        ],
        correct: [1, 2],
        hint: "Look for what the lion did and thought right after the mouse promised to help.",
        seconds: 40,
      },
      think: {
        q: "The text says the lion's 'roars echoed through the forest' while he was in the net. What can you infer?",
        choices: ["He was singing happily", "He was upset and calling for help", "He had fallen asleep"],
        answer: 1,
        why: "Roaring while trapped in a tightening net is a clue he was upset and needed help.",
        hints: ["Think about how you would feel if ropes held you tighter and tighter.", "", "You can't roar and sleep at the same time. Look at what he was doing."],
      },
      approaches: {
        analogy: "Inferring is like being a weather watcher. Nobody tells you it rained last night, but the grass is wet and there are puddles, so you figure it out.",
        example: "Text: 'Maya slammed the door and threw her backpack on the floor.' It never says she's angry. Clues: slamming and throwing. What I know: people do that when they're upset. Inference: Maya is angry.",
        simpler: {
          q: "An inference is built from what two things?",
          choices: ["Clues in the text plus what you know", "The title plus the page number", "A guess with no clues at all"],
          answer: 0,
          why: "Inference = text clues + what you already know.",
          hints: ["", "The title and page number won't tell you what a character feels.", "A good inference always has clues behind it."],
        },
      },
    },
    {
      title: "Characters in Depth",
      teach:
        "To really know a character, gather four kinds of clues. What does the character say? The mouse says, 'Someday I may be able to help you.' What does the character do? She runs to the lion and gnaws through every rope. What does the character think or feel? She trembles at first, but she doesn't run away when she hears the roars. How do others react to her? The lion laughs, but later he learns he was wrong. Put the clues together and you can describe her in depth: the mouse is brave, loyal and keeps her promises. Setting matters too. A forest full of hunters' nets makes the danger feel real.",
      visual: {
        type: "hotspots",
        title: "Four ways to know a character",
        center: "Character",
        spots: [
          { label: "Says", icon: "💬", detail: "Her words: 'Someday I may be able to help you.'" },
          { label: "Does", icon: "🏃", detail: "Her actions: she runs to the lion and gnaws the ropes." },
          { label: "Thinks and feels", icon: "💭", detail: "She trembles at first, yet comes to help anyway." },
          { label: "Others react", icon: "🦁", detail: "The lion laughs at her, then learns he was wrong." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each clue about the mouse: is it something she says or something she does?",
        buckets: ["Says", "Does"],
        items: [
          { text: "'Please let me go.'", bucket: 0 },
          { text: "'Someday I may be able to help you.'", bucket: 0 },
          { text: "'Even a little mouse can help a lion.'", bucket: 0 },
          { text: "Runs toward the roaring lion", bucket: 1 },
          { text: "Gnaws through the ropes one by one", bucket: 1 },
          { text: "Scurries across the lion's nose", bucket: 1 },
        ],
        hint: "Words inside quotation marks are things she says. Everything else here is an action.",
        seconds: 35,
      },
      think: {
        q: "Which detail best shows that the mouse is loyal?",
        choices: ["She ran across the lion's nose", "She is very small", "She came back to free the lion, as she had promised"],
        answer: 2,
        why: "Loyal means keeping your promises and standing by others. She kept her promise.",
        hints: ["Running across his nose was an accident on her way home.", "Being small is how she looks, not what kind of friend she is.", ""],
      },
      approaches: {
        analogy: "Getting to know a character is like getting to know a new classmate. You listen to what they say, watch what they do, and notice how others treat them.",
        example: "In 'The Tortoise and the Hare', the hare says he's the fastest, then naps in the middle of the race. His words and his nap show that he is boastful and careless.",
        simpler: {
          q: "Gnawing through the ropes is something the mouse...",
          choices: ["Says", "Does", "Dreams"],
          answer: 1,
          why: "Gnawing is an action, something she does.",
          hints: ["She isn't speaking here. Gnawing is done with teeth, not words.", "", "This really happens in the story; it's not a dream."],
        },
      },
    },
    {
      title: "Finding the Theme and Summarizing",
      teach:
        "The theme is the big message of a story, the lesson that is true for real life too. A theme is not a single word like 'friendship'. It is a whole thought, like 'Kindness is never wasted' or 'Don't judge others by their size.' To find it, ask: What did a character learn? What changed? The lion learned that a small friend can be a great help. A summary is different. It retells the most important events, in order, in just a few sentences. It leaves out small details and never includes your opinion. A good summary of this fable takes about three sentences.",
      visual: {
        type: "compare",
        left: { title: "Theme", points: ["The big message or lesson", "A whole sentence", "'Kindness is never wasted.'"] },
        right: { title: "Summary", points: ["The main events, in order", "Short, no opinions", "'A lion spares a mouse. Later she frees him from a net.'"] },
      },
      probe: {
        type: "cloze",
        text: "The theme of a story is its big {0}. A summary tells the main {1} in order and leaves out your {2}.",
        blanks: [{ answers: ["message", "lesson"] }, { answers: ["events"] }, { answers: ["opinion", "opinions"] }],
        bank: ["message", "events", "opinion", "title", "pictures"],
        hint: "Theme = the lesson. Summary = what happened, briefly, with no 'I think'.",
        seconds: 35,
      },
      think: {
        q: "Which sentence is a theme of The Lion and the Mouse?",
        choices: ["Lions live in Africa.", "A mouse can be small.", "Even the small can help the great."],
        answer: 2,
        why: "A theme is a lesson that is true for real life. The lion learned that small friends can help.",
        hints: ["That's a fact about lions, not a lesson from the story.", "That's true, but it's not a lesson. What did the lion learn?", ""],
      },
      approaches: {
        analogy: "A summary is like a movie trailer that shows just the big moments. The theme is like what your parents say on the drive home: 'You see? That's why we're kind to everyone.'",
        example: "Summary of The Tortoise and the Hare: 'A boastful hare races a slow tortoise. The hare naps halfway. The tortoise keeps going and wins.' Theme: 'Slow and steady wins the race.'",
        simpler: {
          q: "Is 'friendship' by itself a theme?",
          choices: ["No, a theme is a whole message, like 'True friends help each other'", "Yes, one word is enough", "Only if it's in the title"],
          answer: 0,
          why: "'Friendship' is a topic. A theme says something about it.",
          hints: ["", "One word names a topic. A theme says what the story teaches about it.", "The title can hint, but a theme is always a whole message."],
        },
      },
    },
    {
      title: "Talking About a Story",
      teach:
        "Stories are even better when you talk about them. A good book talk has a few rules. Come prepared: read the story first and mark a few details. Take turns and listen without interrupting. Ask questions, like 'Why do you think the lion let the mouse go?' Answer with evidence: 'I think he was curious, because he laughed at her promise.' And build on what others say: 'I agree with Sam, and I'd add that the lion learned something.' At the end, think about whether anything you heard changed your mind. That's how we grow wiser together.",
      visual: {
        type: "flip",
        cards: [
          { front: "Come prepared", back: "Read first and mark details you want to share." },
          { front: "Take turns", back: "Listen fully before you speak." },
          { front: "Ask questions", back: "'Why do you think...?' 'What in the story shows that?'" },
          { front: "Build on ideas", back: "'I agree with..., and I'd add...' or 'I see it differently because...'" },
        ],
      },
      probe: {
        type: "build",
        prompt: "Build a sentence that builds on a friend's idea, with evidence.",
        tiles: ["I agree with Sam,", "because the mouse", "kept her promise", "and freed the lion."],
        distractors: ["You're wrong!", "whatever"],
        hint: "Start by naming who you agree with, then give the reason from the story.",
        seconds: 30,
      },
      think: {
        q: "In a book talk, your friend shares an idea you disagree with. What's the best response?",
        choices: ["Say nothing and look away", "'That's silly.'", "'I see it differently, because the text says...'"],
        answer: 2,
        why: "You can disagree politely, and you back up your idea with evidence from the text.",
        hints: ["Your ideas matter. Share them politely.", "That's unkind and gives no reason. Point to the text instead.", ""],
      },
      approaches: {
        analogy: "A good discussion is like a game of catch. Each person catches the idea, adds something, and tosses it on. Nobody grabs the ball and runs away with it.",
        example: "Ann: 'The mouse was brave.' Ben: 'I agree, and I'd add that she was clever, because she knew how to chew through ropes.' Ben caught Ann's idea, added to it, and gave evidence.",
        simpler: {
          q: "What should you do before a book talk?",
          choices: ["Read the story and mark some details", "Nothing at all", "Read only the title"],
          answer: 0,
          why: "Coming prepared means reading and marking details to share.",
          hints: ["", "You'll have little to say if you haven't read it.", "The title alone won't give you details to talk about."],
        },
      },
    },
  ],
  activity: {
    type: "sequence",
    prompt: "Put the events of The Lion and the Mouse in order to make a summary.",
    steps: [
      "A mouse runs across a sleeping lion's nose.",
      "The lion traps the mouse, but lets her go.",
      "The lion is caught in a hunter's net.",
      "The mouse hears his roars and gnaws through the ropes.",
      "The lion is free and learns that small friends can help.",
    ],
  },
  explain: {
    prompt: "Describe the mouse in this fable and tell its theme. Use details from the story to prove what you say.",
    keyPoints: [
      "The mouse is brave or loyal",
      "She kept her promise and gnawed the ropes",
      "The lion laughed at her at first",
      "Theme: even the small can help the great, or kindness is repaid",
    ],
  },
  mastery: [
    {
      type: "highlight",
      prompt: "Tap the sentence that helps you infer that the mouse was afraid at first.",
      sentences: ["'Please let me go,' squeaked the mouse, trembling.", "Days later, the lion was caught in a hunter's net.", "The lion laughed."],
      correct: [0],
      hint: "Look for a clue about how the mouse's body was acting.",
      seconds: 25,
    },
    {
      type: "sort",
      prompt: "Sort each sentence: theme or summary?",
      buckets: ["Theme", "Summary"],
      items: [
        { text: "Kindness is never wasted.", bucket: 0 },
        { text: "Don't judge others by their size.", bucket: 0 },
        { text: "A lion spares a mouse, and later she frees him from a net.", bucket: 1 },
        { text: "A hare naps during a race, and the tortoise wins.", bucket: 1 },
      ],
      hint: "A theme is a lesson for real life. A summary tells what happened.",
      seconds: 30,
    },
    {
      type: "cloze",
      text: "I can infer the lion was proud, because the text says he {0} at the mouse's promise.",
      blanks: [{ answers: ["laughed"] }],
      hint: "What did the lion do when the mouse said she might help him someday?",
      mistakes: [{ match: "roared", coach: "He roared when he woke up and when he was trapped. What did he do at her promise?" }],
      seconds: 25,
    },
    {
      type: "match",
      prompt: "Match each clue to what kind of character clue it is.",
      pairs: [
        { left: "'Someday I may help you.'", right: "What she says" },
        { left: "She gnaws through the ropes.", right: "What she does" },
        { left: "She trembles with fear.", right: "What she feels" },
        { left: "The lion laughs at her.", right: "How others react" },
      ],
      hint: "Words in quotation marks are speech. Actions are doing. Trembling shows a feeling. Someone else's response is a reaction.",
      seconds: 35,
    },
  ],
  check: [
    {
      q: "What is an inference?",
      choices: ["A word the story says outright", "A conclusion from text clues plus what you know", "The title of a story"],
      answer: 1,
      why: "An inference combines clues from the text with your own knowledge.",
    },
    {
      q: "Which is the best summary of The Lion and the Mouse?",
      choices: [
        "A lion spares a mouse; later the mouse frees the lion from a net.",
        "I love this story because the mouse is cute.",
        "A lion sleeps in the sun.",
      ],
      answer: 0,
      why: "A summary tells the main events in order, briefly, without opinions.",
    },
    {
      q: "Which is a theme, not a topic?",
      choices: ["Friendship", "Lions", "Even the small can help the great"],
      answer: 2,
      why: "A theme is a whole message about life, not just a subject.",
    },
    {
      q: "In a discussion, what's the best way to share an idea?",
      choices: ["Interrupt so you go first", "Give your idea with evidence from the text", "Repeat what everyone else said"],
      answer: 1,
      why: "Good discussions back ideas with evidence and build on others.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Choose a fable or story you know well, such as 'The Tortoise and the Hare' or 'The Ant and the Grasshopper'. Write a summary in 3-5 sentences. Then write the theme as a full sentence, and describe one character using two details from the story (what they say, do or think). Talk about your answer with a parent and listen to their ideas too.",
    rubric: [
      "The summary tells the main events in order, briefly",
      "The summary has no opinions",
      "The theme is a full-sentence lesson, not one word",
      "The character is described with at least two details from the story",
      "Complete sentences with capitals and end marks",
    ],
  },
};

// 3. Myth words, how poems and plays are built, and figurative language
const mythsPoems: Lesson = {
  id: "ela-4.myths-poems-plays",
  title: "Myths, Poems and Plays",
  minutes: 30,
  stage: "grammar",
  standards: ["RL.4.4", "RL.4.5", "L.4.5", "RL.4.10"],
  read: [
    "The ancient Greeks and Romans told myths, stories about gods and heroes. Some of their names still live in our everyday words. Hercules was a hero so strong that he finished twelve impossible labors, so a Herculean task is one that takes huge strength or effort. The hero Achilles could only be hurt on his heel, so a person's Achilles' heel is their one weak spot. King Midas turned everything he touched into gold, so a business owner with the Midas touch makes money at everything. Atlas held up the sky, and a book of maps is called an atlas. Cereal comes from Ceres, the Roman goddess of grain.",
    "Stories come in different shapes. Prose is ordinary writing in sentences and paragraphs, like this lesson. A poem is written in verse: lines, grouped into stanzas. Poems often have rhythm, a beat, and meter, a regular pattern of strong and weak beats. Many rhyme. Christina Rossetti wrote a poem in 1872 that begins, 'Who has seen the wind? / Neither I nor you.' Each stanza has four short lines.",
    "A play, or drama, is written to be performed. It starts with a cast of characters, a list of who is in it. It names the setting. Characters speak in dialogue, with each speaker's name before their lines. Stage directions, often in parentheses, tell the actors what to do, like (The lion yawns and stretches.)",
    "Writers also use figurative language, words that mean more than they say. A simile compares two things using like or as: brave as a lion. A metaphor says one thing is another: the classroom was a zoo. An idiom is a saying that means something different from its words: 'a piece of cake' means easy. A proverb is a short, wise saying, like 'Look before you leap.' And remember synonyms, words that mean the same (big, huge), and antonyms, words that mean the opposite (big, tiny).",
  ].join("\n\n"),
  keyIdeas: [
    "Many English words come from Greek and Roman myths, like Herculean and atlas.",
    "Poems use lines, stanzas, rhythm and meter; plays use a cast list, dialogue and stage directions; prose uses sentences and paragraphs.",
    "Similes use like or as; metaphors say one thing is another; idioms and proverbs are sayings with a special meaning.",
  ],
  hook: {
    text: "Have you ever been told a job was a Herculean task? Hercules was a hero in Greek myths, strong enough to wrestle a lion. His name became an English word. Today we'll meet words born in myths, then learn how poems and plays are built.",
  },
  teach: [
    {
      title: "Words from Myths",
      teach:
        "The ancient Greeks and Romans told myths about gods and heroes, and their names hide in our words today. Hercules completed twelve labors that seemed impossible, so a Herculean job takes enormous effort. Achilles was a mighty warrior, but his heel was his one weak spot. Now we call anyone's weak point their Achilles' heel. King Midas wished that everything he touched would turn to gold, and soon even his food turned to gold. Someone with the Midas touch succeeds at everything. Atlas, a giant who held up the sky, gave his name to books of maps. And your breakfast cereal is named for Ceres, the Roman goddess of grain.",
      visual: {
        type: "flip",
        cards: [
          { front: "Herculean", back: "Needing huge strength or effort. From Hercules and his twelve labors." },
          { front: "Achilles' heel", back: "A weak spot. Achilles could only be hurt on his heel." },
          { front: "Midas touch", back: "Success at everything. King Midas turned all he touched to gold." },
          { front: "atlas", back: "A book of maps. Atlas held up the sky in Greek myths." },
          { front: "cereal", back: "Grain food. From Ceres, Roman goddess of grain." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each word from mythology to its meaning.",
        pairs: [
          { left: "Herculean", right: "needing huge effort" },
          { left: "Achilles' heel", right: "a weak spot" },
          { left: "Midas touch", right: "success at everything" },
          { left: "atlas", right: "a book of maps" },
        ],
        hint: "Remember the stories: Hercules was strong, Achilles had a weak heel, Midas made gold, Atlas held up the sky.",
        seconds: 35,
      },
      think: {
        q: "'Cleaning out the whole garage in one afternoon was a Herculean task.' What does Herculean mean here?",
        choices: ["Very quick and easy", "Taking huge effort", "Done by a hero in armor"],
        answer: 1,
        why: "Hercules finished impossibly hard labors, so a Herculean task needs huge effort.",
        hints: ["Hercules was famous for hard jobs, not easy ones.", "", "Nobody in armor cleaned the garage. The word just borrows Hercules' strength."],
      },
      approaches: {
        analogy: "Myth words are like nicknames. When you call a fast friend 'Lightning', everyone knows what you mean. These words borrow a hero's story the same way.",
        example: "'Spelling is my Achilles' heel.' Achilles was strong everywhere but his heel. So the speaker is good at most things, but spelling is the weak spot.",
        simpler: {
          q: "In the myth, what happened to everything King Midas touched?",
          choices: ["It turned to gold", "It turned to ice", "It disappeared"],
          answer: 0,
          why: "Midas wished for a golden touch, and it came true.",
          hints: ["", "Ice isn't part of his story. Think of treasure.", "Things didn't vanish; they became something precious."],
        },
      },
    },
    {
      title: "How Poems Are Built",
      teach:
        "Prose is ordinary writing in sentences and paragraphs. Poems are written in verse instead. A poem is made of lines, and lines are grouped into stanzas, like rooms in a house. Many poems have rhythm, a beat you can tap, and meter, a regular pattern of strong and weak beats. Many rhyme at the ends of lines. Listen to Christina Rossetti's poem from 1872: 'Who has seen the wind? / Neither I nor you: / But when the leaves hang trembling, / The wind is passing through.' That stanza has four lines. The second and fourth lines rhyme: you and through.",
      visual: {
        type: "hotspots",
        title: "Parts of a poem",
        center: "Poem",
        spots: [
          { label: "Line", icon: "➖", detail: "One row of words in a poem. It may not be a full sentence." },
          { label: "Stanza", icon: "🧱", detail: "A group of lines, like a paragraph in a poem." },
          { label: "Rhythm and meter", icon: "🥁", detail: "The beat of a poem and its pattern of strong and weak beats." },
          { label: "Rhyme", icon: "🔔", detail: "Words with the same ending sound, like you and through." },
        ],
      },
      probe: {
        type: "cloze",
        text: "A poem is written in {0}. Its words are arranged in {1}, and groups of these are called {2}. The beat of a poem is its {3}.",
        blanks: [{ answers: ["verse"] }, { answers: ["lines"] }, { answers: ["stanzas"] }, { answers: ["rhythm"] }],
        bank: ["verse", "lines", "stanzas", "rhythm", "paragraphs", "chapters"],
        hint: "Paragraphs and chapters belong to prose. Poems have their own words for these parts.",
        mistakes: [
          { match: "paragraphs", coach: "Paragraphs are for prose. In a poem, groups of lines are called stanzas." },
          { match: "chapters", coach: "Chapters are parts of a long book, not a poem." },
        ],
        seconds: 40,
      },
      think: {
        q: "In Rossetti's stanza, which word rhymes with 'you'?",
        choices: ["wind", "through", "trembling"],
        answer: 1,
        why: "You and through have the same ending sound.",
        hints: ["Say 'wind' and 'you' aloud. Do they end the same?", "", "'Trembling' ends with an 'ing' sound, not an 'oo' sound."],
      },
      approaches: {
        analogy: "If prose is a road that runs on and on, a poem is a staircase: each line is a step, and each stanza is a landing where you pause.",
        example: "Count the stanza: 1 'Who has seen the wind?' 2 'Neither I nor you:' 3 'But when the leaves hang trembling,' 4 'The wind is passing through.' Four lines make one stanza.",
        simpler: {
          q: "What is a group of lines in a poem called?",
          choices: ["A chapter", "A paragraph", "A stanza"],
          answer: 2,
          why: "Poems group their lines into stanzas.",
          hints: ["Chapters are parts of long books.", "Paragraphs are for prose, not poems.", ""],
        },
      },
    },
    {
      title: "How Plays Are Built",
      teach:
        "A play, or drama, is a story written to be acted out. It looks different on the page. It begins with a cast of characters, the list of everyone in the play. Then it describes the setting, where and when it happens. The story is told mostly through dialogue: each speaker's name comes first, then their words, without quotation marks. Stage directions, often in parentheses, tell actors how to move or speak. For example: LION: (yawning) Who dares wake me? MOUSE: (trembling) Only me, Your Majesty. Longer plays are divided into acts and scenes, the way a book has chapters.",
      visual: {
        type: "compare",
        left: { title: "Prose story", points: ["Sentences and paragraphs", "A narrator tells what happens", "Quotation marks around speech", "Divided into chapters"] },
        right: { title: "Play (drama)", points: ["Cast of characters and setting", "Told through dialogue", "Speaker's name, then the words", "Stage directions in parentheses", "Divided into acts and scenes"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort these lines from a play script.",
        buckets: ["Stage direction", "Dialogue", "Cast list"],
        items: [
          { text: "(The lion yawns and stretches.)", bucket: 0 },
          { text: "(The mouse runs in, out of breath.)", bucket: 0 },
          { text: "LION: Who dares wake me?", bucket: 1 },
          { text: "MOUSE: Only me, Your Majesty.", bucket: 1 },
          { text: "CHARACTERS: a lion, a mouse, a hunter", bucket: 2 },
        ],
        hint: "Words in parentheses tell actors what to do. A name with a colon begins a spoken line.",
        seconds: 35,
      },
      think: {
        q: "In a play, what do stage directions do?",
        choices: ["Tell actors how to move or speak", "List the chapters", "Rhyme at the end of each line"],
        answer: 0,
        why: "Stage directions guide the actors: where to go, what to do and how to say lines.",
        hints: ["", "Plays have acts and scenes, not chapters, and directions aren't a list of them.", "Rhyme belongs to poems. Stage directions are instructions."],
      },
      approaches: {
        analogy: "A play script is like a recipe for a show. The cast list is the ingredients, the dialogue is what everyone says, and the stage directions are the cooking steps.",
        example: "Prose: 'The lion yawned. \"Who dares wake me?\" he grumbled.' As a play: LION: (yawning, grumpy) Who dares wake me? Same moment, built a different way.",
        simpler: {
          q: "What comes first on each line of dialogue in a play?",
          choices: ["Quotation marks", "The speaker's name", "A rhyme"],
          answer: 1,
          why: "In a script, the speaker's name comes first, then the words.",
          hints: ["Plays don't use quotation marks for speech.", "", "Plays don't need to rhyme. Look at how speakers are shown."],
        },
      },
    },
    {
      title: "Similes, Metaphors, Idioms and Proverbs",
      teach:
        "Figurative language means words that say more than their plain meaning. A simile compares two things using like or as: 'Her voice was as soft as a feather.' A metaphor compares without like or as, saying one thing is another: 'The classroom was a zoo.' An idiom is a saying whose meaning is different from its words. 'It's raining cats and dogs' means it's raining hard, not that pets are falling. A proverb is a short, wise saying about life, like 'Look before you leap' or my own 'Slow and steady wins the race.' Words also have partners: synonyms mean the same, like quick and fast, and antonyms mean the opposite, like quick and slow.",
      visual: {
        type: "flip",
        cards: [
          { front: "Simile", back: "Compares with like or as: as brave as a lion." },
          { front: "Metaphor", back: "Says one thing is another: the moon was a silver coin." },
          { front: "Idiom", back: "A saying with a special meaning: 'a piece of cake' means easy." },
          { front: "Proverb", back: "A short, wise saying: 'Look before you leap.'" },
          { front: "Synonym / antonym", back: "Same meaning (quick, fast) / opposite meaning (quick, slow)." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each phrase: simile, metaphor or idiom?",
        buckets: ["Simile", "Metaphor", "Idiom"],
        items: [
          { text: "as busy as a bee", bucket: 0 },
          { text: "he ran like the wind", bucket: 0 },
          { text: "the snow was a white blanket", bucket: 1 },
          { text: "my brother is a night owl", bucket: 1 },
          { text: "it's a piece of cake", bucket: 2 },
          { text: "break a leg (good luck!)", bucket: 2 },
        ],
        hint: "Like or as? Simile. Says one thing IS another? Metaphor. A common saying that means something else? Idiom.",
        seconds: 45,
      },
      think: {
        q: "'The test was a piece of cake.' What does this idiom mean?",
        choices: ["The test was about baking", "The test was easy", "There was cake at the test"],
        answer: 1,
        why: "'A piece of cake' is an idiom meaning something is easy.",
        hints: ["Idioms don't mean exactly what their words say.", "", "No real cake here. Idioms have a hidden meaning."],
      },
      approaches: {
        analogy: "Figurative language is like a costume. 'Raining cats and dogs' is plain old heavy rain dressed up in a funny outfit to make you notice it.",
        example: "'Grandpa's beard was as white as snow' uses 'as', so it's a simile. 'Grandpa's beard was a snowdrift' says it IS a snowdrift, so it's a metaphor. Both mean his beard is very white.",
        simpler: {
          q: "Which word tells you a comparison is a simile?",
          choices: ["the", "and", "like"],
          answer: 2,
          why: "Similes compare using like or as.",
          hints: ["'The' is in almost every sentence. Look for a comparing word.", "'And' joins things, but doesn't compare them.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each feature: does it belong to a poem, a play or prose?",
    buckets: ["Poem", "Play", "Prose"],
    items: [
      { text: "Stanzas", bucket: 0 },
      { text: "Rhythm and meter", bucket: 0 },
      { text: "Cast of characters", bucket: 1 },
      { text: "Stage directions", bucket: 1 },
      { text: "Paragraphs", bucket: 2 },
      { text: "A narrator telling events in sentences", bucket: 2 },
    ],
  },
  explain: {
    prompt: "Explain how a poem, a play and a regular story (prose) look different on the page. Then explain the difference between a simile and a metaphor.",
    keyPoints: [
      "Poems have lines and stanzas with rhythm",
      "Plays have a cast list, dialogue and stage directions",
      "Prose uses sentences and paragraphs",
      "A simile uses like or as",
      "A metaphor says one thing is another",
    ],
  },
  mastery: [
    {
      type: "cloze",
      text: "Lifting the fallen tree took a {0} effort. Math is my strong subject, but spelling is my Achilles' {1}.",
      blanks: [{ answers: ["Herculean"] }, { answers: ["heel"] }],
      bank: ["Herculean", "heel", "atlas", "Midas", "cereal"],
      hint: "Which hero was famous for great strength? Which part of Achilles was his weak spot?",
      seconds: 30,
    },
    {
      type: "match",
      prompt: "Match each word to its antonym (opposite).",
      pairs: [
        { left: "ancient", right: "modern" },
        { left: "timid", right: "bold" },
        { left: "enormous", right: "tiny" },
        { left: "generous", right: "selfish" },
      ],
      hint: "Antonyms are opposites. Think: what is the opposite of very old? Of shy?",
      seconds: 35,
    },
    {
      type: "number",
      prompt: "A poem has 3 stanzas, and each stanza has 4 lines. How many lines does the poem have?",
      answer: 12,
      hint: "Each stanza is a group of lines. Add 4 lines three times.",
      mistakes: [{ match: "7", coach: "That adds 3 and 4. There are 3 stanzas, each with 4 lines: 4 + 4 + 4." }],
      seconds: 20,
    },
    {
      type: "sort",
      prompt: "Sort: is it a proverb (a wise saying) or a simile?",
      buckets: ["Proverb", "Simile"],
      items: [
        { text: "Look before you leap.", bucket: 0 },
        { text: "Slow and steady wins the race.", bucket: 0 },
        { text: "Honesty is the best policy.", bucket: 0 },
        { text: "as quiet as a mouse", bucket: 1 },
        { text: "eyes shining like stars", bucket: 1 },
      ],
      hint: "A proverb gives advice about life. A simile compares with like or as.",
      seconds: 30,
    },
  ],
  check: [
    {
      q: "Someone with 'the Midas touch'...",
      choices: ["Breaks everything", "Is very strong", "Succeeds at whatever they do"],
      answer: 2,
      why: "King Midas turned everything to gold, so the Midas touch means success at everything.",
    },
    {
      q: "Which belongs in a play but not a poem?",
      choices: ["Stanzas", "Stage directions", "Rhyme"],
      answer: 1,
      why: "Stage directions tell actors what to do. They are part of drama.",
    },
    {
      q: "'The stars were diamonds in the sky.' This is a...",
      choices: ["Metaphor", "Simile", "Proverb"],
      answer: 0,
      why: "It says the stars WERE diamonds, without like or as, so it's a metaphor.",
    },
    {
      q: "Which pair are synonyms?",
      choices: ["hot and cold", "happy and glad", "up and down"],
      answer: 1,
      why: "Happy and glad mean the same thing.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Write a short poem about the weather or a season, with 2 stanzas of 4 lines each. Use at least one simile and one metaphor, and try to make some lines rhyme. Then rewrite one stanza as a tiny play scene with two characters, a stage direction and dialogue.",
    rubric: [
      "The poem has 2 stanzas of 4 lines",
      "It includes a simile (like or as)",
      "It includes a metaphor",
      "The play scene has character names, dialogue and at least one stage direction",
      "Words are spelled carefully and lines are neat",
    ],
  },
};

// 4. Point of view, tales from many lands, and stories on the page vs performed
const talesPov: Lesson = {
  id: "ela-4.tales-point-of-view",
  title: "Who Tells the Tale? Point of View and Tales from Many Lands",
  minutes: 30,
  stage: "logic",
  standards: ["RL.4.6", "RL.4.7", "RL.4.9", "SL.4.2"],
  read: [
    "Every story has a narrator, the voice telling it. In first person point of view, the narrator is a character in the story and uses words like I, me and we: 'I ran to the river as fast as I could.' We only learn what that one character sees, thinks and feels. In third person point of view, the narrator is outside the story and uses he, she and they: 'She ran to the river.' A third person narrator can often tell us what many characters think.",
    "People all over the world tell stories, and some patterns show up again and again. You probably know Cinderella. A version written by Charles Perrault was published in France in 1697. But a story much like it was written down in China more than a thousand years ago, in the 800s. It is called Yeh-Shen, or Ye Xian. In both tales, a kind girl is treated badly by her stepmother. A magical helper comes to her aid: a fairy godmother in France, and the bones of a magic fish in China. She goes to a ball or a festival, loses a shoe, and is found by a prince or king who searches for the shoe's owner.",
    "The themes match too: kindness and patience are rewarded. Other tales share themes as well. In the Greek myth of King Midas and the German folktale of The Fisherman and His Wife, greed leads to trouble. When you compare tales from different cultures, look for the same theme, the same pattern of events, and the details that make each one special.",
    "Stories can also be told in different forms. You can read one, hear it read aloud, see it in pictures, or watch it as a play. When you compare the words to a performance, notice what each version shows. Then paraphrase: retell what you heard or saw in your own words, keeping the meaning.",
  ].join("\n\n"),
  keyIdeas: [
    "First person uses I and me; third person uses he, she and they.",
    "Tales from different cultures often share themes and patterns of events.",
    "Compare a written story to its read-aloud, picture or stage version, and paraphrase in your own words.",
  ],
  hook: {
    text: "Here's a riddle. A kind girl is mistreated by her stepmother. She loses a shoe, and royalty searches for her. Is it a story from France or from China? The surprising answer is both! Stories travel the world, and today we'll follow them.",
  },
  teach: [
    {
      title: "First Person and Third Person",
      teach:
        "The narrator is the voice telling a story. In first person, the narrator is one of the characters, so you'll see I, me, my and we outside of the dialogue: 'I crept down the stairs, my heart pounding.' First person feels close, like a friend telling you what happened, but you only know what that one character knows. In third person, the narrator stands outside the story and uses he, she and they: 'Ella crept down the stairs, her heart pounding.' A third person narrator can often show what several characters think and feel. Careful: characters can say 'I' in dialogue even in a third person story. Check the narration, not the quotes.",
      visual: {
        type: "compare",
        left: { title: "First person", points: ["Narrator is a character", "Uses I, me, my, we", "Know only that character's thoughts", "'I found the glass slipper.'"] },
        right: { title: "Third person", points: ["Narrator is outside the story", "Uses he, she, they, names", "Can show many characters' thoughts", "'The prince found the glass slipper.'"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each passage by its point of view.",
        buckets: ["First person", "Third person"],
        items: [
          { text: "I fed the golden fish every day by the pond.", bucket: 0 },
          { text: "We hurried home before the clock struck twelve.", bucket: 0 },
          { text: "My stepsisters laughed at my ragged dress.", bucket: 0 },
          { text: "Yeh-Shen fed the golden fish every day.", bucket: 1 },
          { text: "The king searched every house for the owner of the shoe.", bucket: 1 },
          { text: "'I will go to the festival,' she whispered to herself.", bucket: 1 },
        ],
        hint: "Look at the narration outside quotation marks. Does the narrator say I and my, or she and they?",
        seconds: 45,
      },
      think: {
        q: "'\"I am going to win,\" said the hare, as he raced off.' What point of view is the narration?",
        choices: ["First person, because of 'I'", "Third person, because the narrator says 'he' and 'the hare'", "There is no narrator"],
        answer: 1,
        why: "'I' is inside the hare's dialogue. The narrator says 'said the hare' and 'he', which is third person.",
        hints: ["The 'I' is inside quotation marks, so the hare is speaking, not the narrator.", "", "Someone is telling us 'said the hare'. That's the narrator."],
      },
      approaches: {
        analogy: "First person is like a player telling you about the game they played. Third person is like a sports announcer in the booth, describing all the players from above.",
        example: "First person: 'I ate the porridge because I was so hungry.' Third person: 'Goldilocks ate the porridge because she was so hungry.' Same event. Only the narrator's position changes.",
        simpler: {
          q: "Which word is a clue that a narrator is using first person?",
          choices: ["she", "they", "I"],
          answer: 2,
          why: "First person narrators call themselves I and me.",
          hints: ["'She' is someone else. That points to third person.", "'They' describes others. That points to third person.", ""],
        },
      },
    },
    {
      title: "Same Pattern, Different Lands",
      teach:
        "Stories from different cultures often follow the same pattern of events. Compare two famous tales. Cinderella, written down by Charles Perrault in France in 1697, and Yeh-Shen, written down in China in the 800s, more than eight hundred years earlier. In both, a kind girl is treated badly by her stepmother. In both, a magical helper aids her: Cinderella has a fairy godmother, while Yeh-Shen has the bones of a magic fish she loved. Both girls go to a grand event, a royal ball in France and a festival in China. Both lose a shoe, a glass slipper and a golden slipper. And in both, a prince or king searches until he finds the shoe's owner.",
      visual: {
        type: "compare",
        left: { title: "Cinderella (France, 1697)", points: ["Mistreated by stepmother", "Helper: a fairy godmother", "Goes to a royal ball", "Loses a glass slipper", "A prince searches for her"] },
        right: { title: "Yeh-Shen (China, 800s)", points: ["Mistreated by stepmother", "Helper: bones of a magic fish", "Goes to a festival", "Loses a golden slipper", "A king searches for her"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each detail: Cinderella only, Yeh-Shen only, or both?",
        buckets: ["Cinderella only", "Yeh-Shen only", "Both"],
        items: [
          { text: "A fairy godmother helps her", bucket: 0 },
          { text: "She goes to a royal ball", bucket: 0 },
          { text: "The bones of a magic fish help her", bucket: 1 },
          { text: "She goes to a festival", bucket: 1 },
          { text: "A stepmother treats her badly", bucket: 2 },
          { text: "She loses a shoe", bucket: 2 },
          { text: "Her kindness is rewarded", bucket: 2 },
        ],
        hint: "The pattern (stepmother, lost shoe, reward) is shared. The helper and the event differ.",
        seconds: 50,
      },
      think: {
        q: "Which is a pattern of events that both tales share?",
        choices: ["A magic fish helps the girl", "A lost shoe helps a prince or king find the girl", "A pumpkin turns into a coach"],
        answer: 1,
        why: "In both tales, a lost shoe leads the prince or king to the girl.",
        hints: ["Only Yeh-Shen has the magic fish.", "", "Only Cinderella has the pumpkin coach."],
      },
      approaches: {
        analogy: "Tales from different lands are like the same song played on different instruments. The tune, the pattern, is the same, but each one sounds a little different.",
        example: "Make a chart. Row 1: Who is unkind? Both: a stepmother. Row 2: Who helps? Fairy godmother vs. fish bones. Row 3: What is lost? Glass slipper vs. golden slipper. Same pattern, different details.",
        simpler: {
          q: "In both tales, who treats the girl badly?",
          choices: ["Her stepmother", "A dragon", "Her teacher"],
          answer: 0,
          why: "Both girls are mistreated by a stepmother.",
          hints: ["", "There's no dragon in either tale.", "Neither tale has a teacher. Think of her family."],
        },
      },
    },
    {
      title: "Themes Across Cultures",
      teach:
        "When stories from far-apart lands share a theme, it tells us that people everywhere value the same things. Cinderella and Yeh-Shen share a theme: kindness and patience are rewarded. Other tales warn against greed. In the Greek myth, King Midas wishes that everything he touches will turn to gold, until his food and drink turn to gold too, and he begs to undo the wish. In the German folktale The Fisherman and His Wife, collected by the Brothers Grimm, a wife keeps asking a magic fish for more and more, and in the end she loses everything. Many tales also use a pattern of three: three wishes, three tries, three brothers.",
      visual: {
        type: "hotspots",
        title: "Themes that travel the world",
        center: "Shared themes",
        spots: [
          { label: "Kindness rewarded", icon: "💝", detail: "Cinderella (France) and Yeh-Shen (China)." },
          { label: "Greed punished", icon: "🪙", detail: "King Midas (Greece) and The Fisherman and His Wife (Germany)." },
          { label: "Cleverness wins", icon: "🦊", detail: "Small, clever characters outsmart big, strong ones, as in many fables." },
          { label: "Pattern of three", icon: "3️⃣", detail: "Three wishes, three tries, three brothers: a pattern in tales everywhere." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each tale to its theme.",
        pairs: [
          { left: "King Midas (Greece)", right: "Greed brings trouble" },
          { left: "Yeh-Shen (China)", right: "Kindness is rewarded" },
          { left: "The Tortoise and the Hare (Greece)", right: "Slow and steady wins" },
          { left: "The Lion and the Mouse (Greece)", right: "The small can help the great" },
        ],
        hint: "Ask what each main character learned. Midas learned about wanting too much gold.",
        seconds: 40,
      },
      think: {
        q: "King Midas and The Fisherman and His Wife come from different countries. What theme do they share?",
        choices: ["Fish make good friends", "Always trust kings", "Greed leads to trouble"],
        answer: 2,
        why: "In both, wanting more and more brings disaster, so the shared theme is about greed.",
        hints: ["Only one of these tales has a fish. Look for a lesson both share.", "Midas is a king, but the lesson isn't about trusting kings.", ""],
      },
      approaches: {
        analogy: "Finding a shared theme is like noticing that grandparents everywhere give the same advice, like 'Don't be greedy', even if they speak different languages.",
        example: "Midas wanted more gold and ended up unable to eat. The fisherman's wife wanted more and more and lost it all. Both characters want too much and lose. Shared theme: greed leads to trouble.",
        simpler: {
          q: "What is a theme?",
          choices: ["The country a story comes from", "The big lesson or message of a story", "The name of the main character"],
          answer: 1,
          why: "A theme is the big message or lesson of a story.",
          hints: ["Where a story comes from is its culture, not its theme.", "", "A name isn't a lesson. A theme is a message about life."],
        },
      },
    },
    {
      title: "From Page to Stage",
      teach:
        "The same story can be read silently, heard aloud, seen in pictures or watched as a play. Each form adds something. When a story is read aloud, the reader's voice shows feelings: a squeaky mouse, a booming lion. In a play, actors follow the stage directions you'd read in the script, like (trembling). Pictures show the setting, the costumes and faces. But a written story can tell you a character's private thoughts, which a picture can't easily show. When you compare versions, ask: Where does the performance match the words? What did it add or leave out? Then paraphrase: retell what you heard in your own words, keeping the meaning the same.",
      visual: {
        type: "compare",
        left: { title: "Written story", points: ["Tells characters' private thoughts", "Describes with words", "You imagine voices and faces", "Read at your own pace"] },
        right: { title: "Read-aloud, pictures or play", points: ["Voices show feelings", "Pictures show setting and costumes", "Actors follow stage directions", "Music and sound effects"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each thing: is it best shown by the written words, or by a performance (read-aloud, pictures or play)?",
        buckets: ["Written words", "Performance"],
        items: [
          { text: "A character's secret thoughts", bucket: 0 },
          { text: "A long description of what a character remembers", bucket: 0 },
          { text: "The sound of the lion's roar", bucket: 1 },
          { text: "The colors of the costumes", bucket: 1 },
          { text: "The squeaky voice of the mouse", bucket: 1 },
        ],
        hint: "Performances are great for sounds and sights. Words are great for what's inside a character's head.",
        seconds: 40,
      },
      think: {
        q: "To paraphrase a story you heard read aloud, you should...",
        choices: ["Retell it in your own words, keeping the meaning", "Copy every word exactly", "Change the ending"],
        answer: 0,
        why: "Paraphrasing means saying it your own way while keeping the meaning.",
        hints: ["", "Copying every word is quoting, not paraphrasing.", "A paraphrase keeps the same meaning, including the ending."],
      },
      approaches: {
        analogy: "Paraphrasing is like describing a movie to a friend who hasn't seen it. You don't repeat every line; you tell what happened in your own words.",
        example: "Heard: 'The lion, tangled in the hunter's net, roared until the forest shook.' Paraphrase: 'The lion got trapped in a net and roared very loudly.' Same meaning, my own words.",
        simpler: {
          q: "In a play, what tells the actor playing the mouse to tremble?",
          choices: ["The title", "The cast list", "A stage direction"],
          answer: 2,
          why: "Stage directions, like (trembling), tell actors what to do.",
          hints: ["The title just names the play.", "The cast list just names the characters.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sequence",
    prompt: "Put the shared pattern of the Cinderella and Yeh-Shen tales in order.",
    steps: [
      "A kind girl is mistreated by her stepmother.",
      "A magical helper comes to her aid.",
      "She goes to a grand event in beautiful clothes.",
      "She loses a shoe as she hurries away.",
      "A prince or king searches for the owner of the shoe.",
      "He finds her, and her kindness is rewarded.",
    ],
  },
  explain: {
    prompt: "Compare Cinderella and Yeh-Shen. What pattern and theme do they share, and what is different? Then explain the difference between first and third person.",
    keyPoints: [
      "Both have a stepmother who mistreats the girl",
      "Both have a lost shoe and a king or prince who searches",
      "Different helpers: fairy godmother and magic fish",
      "Shared theme: kindness is rewarded",
      "First person uses I; third person uses he, she or they",
    ],
  },
  mastery: [
    {
      type: "cloze",
      text: "In a story told in first person, the narrator says '{0}' and 'me'. In third person, the narrator says 'he', '{1}' and 'they'.",
      blanks: [{ answers: ["I"] }, { answers: ["she"] }],
      bank: ["I", "she", "you", "it"],
      hint: "First person: the narrator talks about themself. Third person: the narrator talks about others.",
      seconds: 25,
    },
    {
      type: "sort",
      prompt: "Sort: is the narration first person or third person?",
      buckets: ["First person", "Third person"],
      items: [
        { text: "I never wanted gold so badly until that day.", bucket: 0 },
        { text: "Our little boat rocked on the waves.", bucket: 0 },
        { text: "The fisherman's wife wanted a castle.", bucket: 1 },
        { text: "Midas touched a rose, and it turned to gold.", bucket: 1 },
      ],
      hint: "Look for I, our, me (first person) or names and he, she (third person).",
      seconds: 30,
    },
    {
      type: "match",
      prompt: "Match each tale to the land it comes from.",
      pairs: [
        { left: "Yeh-Shen", right: "China" },
        { left: "Perrault's Cinderella", right: "France" },
        { left: "King Midas", right: "Greece" },
        { left: "The Fisherman and His Wife", right: "Germany" },
      ],
      hint: "Perrault was French, the Brothers Grimm were German, and Midas is a Greek myth.",
      seconds: 35,
    },
    {
      type: "highlight",
      prompt: "You heard: 'The fisherman's wife was never satisfied, and asked the fish for more and more.' Tap the best paraphrase.",
      sentences: ["She kept wanting more from the fish.", "The fish was blue and very big.", "The fisherman loved going fishing."],
      correct: [0],
      hint: "A paraphrase keeps the same meaning in your own words.",
      seconds: 25,
    },
  ],
  check: [
    {
      q: "'I held my breath as the king tried the slipper on my foot.' What point of view is this?",
      choices: ["Third person", "First person", "No point of view"],
      answer: 1,
      why: "The narrator says I and my, so it's first person.",
    },
    {
      q: "What do Cinderella and Yeh-Shen have in common?",
      choices: ["Both come from China", "Both have a fairy godmother", "Both lose a shoe that leads a prince or king to them"],
      answer: 2,
      why: "The lost shoe and the search are shared parts of the pattern.",
    },
    {
      q: "What can a written story show that a picture can't easily show?",
      choices: ["A character's private thoughts", "The color of a dress", "What the castle looks like"],
      answer: 0,
      why: "Words can tell exactly what a character is thinking inside.",
    },
    {
      q: "Which theme do King Midas and The Fisherman and His Wife share?",
      choices: ["Greed leads to trouble", "Fish are wise", "Gold is the best gift"],
      answer: 0,
      why: "In both tales, wanting too much leads to losing a lot.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Choose a folktale or fable you know, such as Cinderella or The Tortoise and the Hare. Retell one part of it in first person, as if you were one of the characters (use I and me). Then write 2-3 sentences comparing it to another tale from a different land that has the same theme. If you can, listen to a read-aloud or watch a play version and tell a parent one thing the performance added.",
    rubric: [
      "The retelling is written in first person (I, me, my) throughout the narration",
      "The events match the original tale",
      "Another tale from a different culture is compared",
      "The shared theme is named",
      "Clear sentences with correct capitals and punctuation",
    ],
  },
};

// 5. Nonfiction: main idea, summary, explaining procedures, text structure, subject words
const nonfiction: Lesson = {
  id: "ela-4.nonfiction-structure",
  title: "Nonfiction: Main Idea, Summary and Text Structure",
  minutes: 30,
  stage: "logic",
  standards: ["RI.4.2", "RI.4.3", "RI.4.4", "RI.4.5", "RI.4.10"],
  read: [
    "Fables are fun, but true writing about the real world, called nonfiction, is a treasure too. To understand it, find the main idea: the most important point the author makes about the topic. The topic is what the text is about, like monarch butterflies. The main idea is what the author says about it, like 'Monarch butterflies make an amazing journey every fall.' Key details support the main idea: eastern monarchs fly as far as 3,000 miles to mountain forests in Mexico, and they gather by the thousands on fir trees each winter. A summary states the main idea and the most important details in a few sentences, in your own words.",
    "Nonfiction often explains how something happens. Take the Erie Canal in New York, which opened in 1825. Boats had to climb hills, so builders made locks. A boat floats into a lock, a chamber with gates at each end. The gates close behind it. Water flows in, and the boat rises. Then the front gates open and the boat floats on, higher than before. When you explain a process, tell what happens and why, step by step.",
    "Authors organize their writing in different ways, called text structures. Chronology tells events in time order, with words like first, then and in 1903. Comparison shows how things are alike and different, like alligators and crocodiles. Cause and effect explains why something happens, with words like because and so. Problem and solution describes a problem and how people solved it, the way the Erie Canal solved the problem of moving heavy goods across New York.",
    "Nonfiction is full of subject words, like migration, chamber and chlorophyll. Look for bold words, check the glossary, and use context clues. Learn these words, and you'll be ready to read science, history and how-to books on your own.",
  ].join("\n\n"),
  keyIdeas: [
    "The main idea is the author's most important point; key details support it.",
    "A summary tells the main idea and key details briefly, in your own words.",
    "Four text structures: chronology, comparison, cause and effect, and problem and solution.",
    "Explain processes step by step, telling what happens and why.",
  ],
  hook: {
    text: "Each fall, millions of monarch butterflies fly south, some as far as 3,000 miles. They have never made the trip before, yet they find the same mountain forests in Mexico. True stories can be as amazing as any fable. Let's learn to read them like experts.",
  },
  teach: [
    {
      title: "Main Idea and Key Details",
      teach:
        "The topic is what a text is about, in a word or two: monarch butterflies. The main idea is the most important point the author makes about the topic, in a full sentence: 'Monarch butterflies make an amazing journey every fall.' Sometimes the main idea is stated in the first or last sentence. Sometimes you must figure it out by asking what all the details have in common. Key details are facts that support the main idea: monarchs fly up to 3,000 miles, they travel to mountain forests in Mexico, and they cluster by the thousands on fir trees. A summary puts it together: the main idea plus the key details, short and in your own words.",
      visual: {
        type: "hotspots",
        title: "A main idea is held up by details",
        center: "Main idea: Monarchs make an amazing journey",
        spots: [
          { label: "Detail 1", icon: "🦋", detail: "Eastern monarchs fly as far as 3,000 miles." },
          { label: "Detail 2", icon: "🏔️", detail: "They travel to mountain forests in Mexico." },
          { label: "Detail 3", icon: "🌲", detail: "They gather by the thousands on fir trees." },
          { label: "Topic", icon: "🏷️", detail: "Just the subject: monarch butterflies." },
        ],
      },
      probe: {
        type: "highlight",
        prompt: "Tap the sentence that states the main idea of this paragraph.",
        sentences: [
          "Monarch butterflies make an amazing journey every fall.",
          "Eastern monarchs fly as far as 3,000 miles.",
          "They travel to mountain forests in Mexico.",
          "There, they gather by the thousands on fir trees.",
        ],
        correct: [0],
        hint: "The main idea is the big point that all the other sentences support.",
        seconds: 30,
      },
      think: {
        q: "What is the difference between the topic and the main idea?",
        choices: [
          "They are the same thing",
          "The topic is what it's about; the main idea is the point the author makes about it",
          "The main idea is always the title",
        ],
        answer: 1,
        why: "Topic: monarch butterflies. Main idea: monarchs make an amazing journey every fall.",
        hints: ["A topic is a word or two. A main idea is a whole sentence that says something.", "", "Titles can hint, but the main idea is the author's key point in a sentence."],
      },
      approaches: {
        analogy: "A main idea is like a tabletop, and the key details are the legs. Take away the legs and the tabletop can't stand; take away the details and the main idea has no support.",
        example: "Paragraph: 'Dogs help people in many ways. Some guide people who cannot see. Some sniff out lost hikers. Some herd sheep.' Topic: dogs. Main idea: dogs help people in many ways. Details: guiding, searching, herding.",
        simpler: {
          q: "In the monarch paragraph, what is the topic?",
          choices: ["Monarch butterflies", "Mountains", "Winter coats"],
          answer: 0,
          why: "Every sentence is about monarch butterflies.",
          hints: ["", "Mountains are mentioned once, but they aren't what the whole text is about.", "Winter coats aren't in the text at all."],
        },
      },
    },
    {
      title: "Explaining a Process",
      teach:
        "Science, history and how-to books often explain a process: what happens, in what order, and why. The Erie Canal, which opened in New York in 1825, carried boats across the state. But land isn't flat, and boats can't float uphill. The solution was the lock. Here's how it works. A boat floats into a lock, a stone chamber with gates at both ends. The gates behind it close. Then water is let in from the higher side, so the water level rises and lifts the boat. When the water matches the level ahead, the front gates open and the boat floats on. To explain any process, use order words like first, next, then and finally, and give the reason for each step.",
      visual: {
        type: "flip",
        cards: [
          { front: "Lock", back: "A chamber with gates at both ends, used to raise or lower boats." },
          { front: "Why water flows in", back: "To lift the boat to the higher water level ahead." },
          { front: "Order words", back: "First, next, then, after that, finally." },
          { front: "Erie Canal", back: "Opened in New York in 1825, linking the Hudson River to Lake Erie." },
        ],
      },
      probe: {
        type: "sequence",
        prompt: "Put the steps for raising a boat in a canal lock in order.",
        steps: [
          "The boat floats into the lock chamber.",
          "The gates behind the boat close.",
          "Water flows in from the higher side.",
          "The boat rises with the water.",
          "The front gates open, and the boat floats on.",
        ],
        hint: "The boat must be inside with the gates shut before water can lift it.",
        seconds: 40,
      },
      think: {
        q: "Why must the gates behind the boat close before water flows in?",
        choices: ["So the boat goes faster", "To keep the water in, so it can rise and lift the boat", "So the people can get off"],
        answer: 1,
        why: "With the gates open, the water would just run out. Closed gates trap it so the level rises.",
        hints: ["Speed isn't the point of a lock. Think about where the water would go.", "", "Passengers stay on the boat. The gates are about the water."],
      },
      approaches: {
        analogy: "A lock is like a bathtub elevator. Put a toy boat in the tub, plug the drain and turn on the tap: the boat rises as the water does.",
        example: "To explain how a seed grows: First, the seed takes in water. Next, a root grows down to find more water. Then a shoot grows up toward light. Finally, leaves open to make food from sunlight. Each step tells what and why.",
        simpler: {
          q: "When water flows into the lock, what happens to the boat?",
          choices: ["It sinks", "It rises", "It stays at the same height"],
          answer: 1,
          why: "Boats float, so as the water rises, the boat rises with it.",
          hints: ["Boats float on top of water. More water lifts them.", "", "The boat floats on the water, so when the water rises the boat moves too."],
        },
      },
    },
    {
      title: "Four Text Structures",
      teach:
        "Authors build their writing in patterns called text structures. Chronology tells events in time order: 'On December 17, 1903, the Wright brothers flew for 12 seconds. Later that day, they flew for 59 seconds.' Comparison shows how things are alike and different: 'Both alligators and crocodiles are reptiles, but an alligator has a wide, U-shaped snout and a crocodile's is narrower and pointed.' Cause and effect explains why: 'In fall, days get shorter, so leaves stop making green chlorophyll. As a result, yellow and orange colors show.' Problem and solution tells about a problem and how it was fixed: 'Moving goods by wagon was slow, so New York built the Erie Canal.' Signal words help you spot each one.",
      visual: {
        type: "hotspots",
        title: "Text structures and their signal words",
        center: "Text structure",
        spots: [
          { label: "Chronology", icon: "🕰️", detail: "Time order. Signal words: first, then, later, in 1903." },
          { label: "Comparison", icon: "⚖️", detail: "Alike and different. Signal words: both, but, unlike, similar." },
          { label: "Cause and effect", icon: "➡️", detail: "Why it happens. Signal words: because, so, as a result." },
          { label: "Problem and solution", icon: "🔧", detail: "What went wrong and how it was fixed. Signal words: problem, solved, the answer was." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each passage by its text structure.",
        buckets: ["Chronology", "Comparison", "Cause and effect", "Problem and solution"],
        items: [
          { text: "In 1903 the Wrights flew for 12 seconds. Later that day, they flew for 59 seconds.", bucket: 0 },
          { text: "Both alligators and crocodiles are reptiles, but their snouts are shaped differently.", bucket: 1 },
          { text: "Days grow shorter in fall, so leaves stop making green chlorophyll.", bucket: 2 },
          { text: "Moving goods by wagon was slow and costly, so New York built a canal.", bucket: 3 },
        ],
        hint: "Look for signal words: dates and 'later' (time), 'both... but' (compare), 'so' with a why (cause), a difficulty that got fixed (problem).",
        seconds: 50,
      },
      think: {
        q: "A text says: 'Because it rained for a week, the river flooded the town.' What structure is this?",
        choices: ["Chronology", "Comparison", "Cause and effect"],
        answer: 2,
        why: "'Because' signals a cause (rain) and its effect (flooding).",
        hints: ["There's no list of events in time order here. Look at the word 'because'.", "Nothing is being compared as alike or different.", ""],
      },
      approaches: {
        analogy: "Text structures are like the floor plans of houses. A ranch house and a two-story house hold the same kind of stuff, but are laid out differently. Knowing the plan helps you find your way around.",
        example: "'Long ago, people lit homes with candles, which could start fires. Then Edison and others developed electric light bulbs, which were safer.' There's a problem (fires) and a solution (light bulbs): problem and solution.",
        simpler: {
          q: "Which structure tells events in time order?",
          choices: ["Chronology", "Comparison", "Problem and solution"],
          answer: 0,
          why: "Chronology (from chronos, the Greek word for time) tells events in time order.",
          hints: ["", "Comparison is about alike and different, not time.", "Problem and solution is about fixing a problem."],
        },
      },
    },
    {
      title: "Subject Words",
      teach:
        "Nonfiction books are full of special subject words. Some are general academic words you'll see in every subject, like analyze, compare and process. Others belong to one subject: migration in science, canal in history, chlorophyll in plant science. Authors give you help. Subject words are often printed in bold. Many are explained right in the sentence: 'Monarchs make a migration, a long journey from one place to another each season.' And most nonfiction books have a glossary at the back. Keep a word notebook: write the word, its meaning in your own words, and a sentence. Soon you'll read like a scientist or a historian.",
      visual: {
        type: "flip",
        cards: [
          { front: "migration", back: "A long journey animals make from one place to another each season." },
          { front: "chlorophyll", back: "The green stuff in leaves that helps plants make food from sunlight." },
          { front: "canal", back: "A waterway dug by people for boats to travel on." },
          { front: "chronology", back: "The order in which events happened (chronos = time)." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each subject word to its meaning.",
        pairs: [
          { left: "migration", right: "a long seasonal journey" },
          { left: "chlorophyll", right: "the green stuff in leaves" },
          { left: "canal", right: "a waterway dug by people" },
          { left: "reptile", right: "a scaly, cold-blooded animal" },
        ],
        hint: "Use what you learned: monarchs migrate, leaves are green, the Erie Canal was dug, alligators are reptiles.",
        seconds: 35,
      },
      think: {
        q: "'Monarchs make a migration, a long journey from one place to another each season.' Where is the meaning of migration?",
        choices: ["Right after the comma in the sentence", "Only in a dictionary", "It isn't given at all"],
        answer: 0,
        why: "The author defines the word right after the comma. That's a definition context clue.",
        hints: ["", "You could check a dictionary, but this sentence already explains it.", "Read the words after the comma again. They explain it."],
      },
      approaches: {
        analogy: "Every subject has its own language, like every sport has its own words. In baseball you learn 'inning' and 'strike'; in science you learn 'migration' and 'chlorophyll'.",
        example: "In a history book you read 'The canal let farmers ship goods to market.' Not sure about 'goods'? The glossary says: things that are made or grown to be sold. Now the sentence makes sense.",
        simpler: {
          q: "In a nonfiction book, how are important subject words often printed?",
          choices: ["Upside down", "In bold", "In a secret code"],
          answer: 1,
          why: "Bold print tells you the word is important and often in the glossary.",
          hints: ["Authors want you to read them easily, not upside down.", "", "There's no code. The words are printed darker to stand out."],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each signal word or phrase by the text structure it usually signals.",
    buckets: ["Chronology", "Comparison", "Cause and effect", "Problem and solution"],
    items: [
      { text: "first, then, finally", bucket: 0 },
      { text: "in 1825", bucket: 0 },
      { text: "both, but", bucket: 1 },
      { text: "unlike", bucket: 1 },
      { text: "because", bucket: 2 },
      { text: "as a result", bucket: 2 },
      { text: "the problem was", bucket: 3 },
      { text: "this was solved by", bucket: 3 },
    ],
  },
  explain: {
    prompt: "Explain how to find the main idea of a nonfiction text and how to write a summary. Then name the four text structures.",
    keyPoints: [
      "The main idea is the author's most important point",
      "Key details support the main idea",
      "A summary is short and in your own words",
      "Chronology and comparison",
      "Cause and effect, and problem and solution",
    ],
  },
  mastery: [
    {
      type: "sort",
      prompt: "Sort each sentence about monarch butterflies: main idea or key detail?",
      buckets: ["Main idea", "Key detail"],
      items: [
        { text: "Monarchs make an amazing journey every fall.", bucket: 0 },
        { text: "Some fly as far as 3,000 miles.", bucket: 1 },
        { text: "They spend the winter in mountain forests in Mexico.", bucket: 1 },
      ],
      hint: "The main idea is the big point; details are the facts that support it.",
      seconds: 25,
    },
    {
      type: "cloze",
      text: "'In fall, days grow shorter, so leaves stop making chlorophyll. As a result, yellow and orange show.' This is {0} and {1} structure.",
      blanks: [{ answers: ["cause"] }, { answers: ["effect"] }],
      bank: ["cause", "effect", "problem", "time", "compare"],
      hint: "Look at 'so' and 'as a result'. They show why something happens.",
      seconds: 25,
    },
    {
      type: "sequence",
      prompt: "Put the Wright brothers' story in chronological order.",
      steps: [
        "The brothers build and test gliders.",
        "They bring their airplane to Kitty Hawk, North Carolina.",
        "On December 17, 1903, Orville flies for 12 seconds.",
        "Later that day, Wilbur flies for 59 seconds.",
      ],
      hint: "You have to build and test before you fly, and the short flight came first.",
      seconds: 30,
    },
    {
      type: "match",
      prompt: "Match each passage to its text structure.",
      pairs: [
        { left: "Wagons were slow, so a canal was dug.", right: "Problem and solution" },
        { left: "Alligators have U-shaped snouts; crocodiles have pointed ones.", right: "Comparison" },
        { left: "First the gates close, then water flows in.", right: "Chronology" },
      ],
      hint: "Fixing something? Problem and solution. Alike and different? Comparison. In order? Chronology.",
      seconds: 30,
    },
  ],
  check: [
    {
      q: "What is a main idea?",
      choices: ["A small, fun fact", "The author's most important point about the topic", "The first word of the text"],
      answer: 1,
      why: "The main idea is the big point that the details support.",
    },
    {
      q: "Which signal words often show comparison?",
      choices: ["first, next, last", "because, so", "both, but, unlike"],
      answer: 2,
      why: "Both, but and unlike show how things are alike and different.",
    },
    {
      q: "What does a canal lock do?",
      choices: ["Raises or lowers boats between water levels", "Keeps fish out of the canal", "Stops boats forever"],
      answer: 0,
      why: "Water fills or drains the chamber, lifting or lowering the boat.",
    },
    {
      q: "What belongs in a summary?",
      choices: ["Every detail from the text", "Your opinion about the topic", "The main idea and key details, briefly"],
      answer: 2,
      why: "A summary is short: the main idea plus the most important details.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Read a short nonfiction article or a chapter from a science or history book (ask a parent or librarian to help you choose). Write the topic, the main idea in one sentence, and three key details. Then write a 3-4 sentence summary in your own words, and name the text structure the author used, with one signal word as proof.",
    rubric: [
      "The topic and main idea are correctly identified",
      "Three key details support the main idea",
      "The summary is short and in the writer's own words",
      "The text structure is named with a signal word as evidence",
      "Complete sentences with correct capitals and end marks",
    ],
  },
};

// 6. Firsthand and secondhand accounts, charts, reasons and evidence, two texts
const evidence: Lesson = {
  id: "ela-4.accounts-evidence",
  title: "Eyewitnesses, Charts and Evidence",
  minutes: 30,
  stage: "logic",
  standards: ["RI.4.1", "RI.4.6", "RI.4.7", "RI.4.8", "RI.4.9", "SL.4.3"],
  read: [
    "In the year 79, Mount Vesuvius erupted in ancient Italy and buried the town of Pompeii in ash. A young man named Pliny the Younger watched from across the bay. Years later he wrote letters describing a huge cloud rising from the mountain, shaped like an umbrella pine tree. His letters are a firsthand account: written by someone who was there. A history book written today is a secondhand account: written by someone who studied the event but did not see it. Firsthand accounts give feelings and close-up details. Secondhand accounts often give the bigger picture, with facts gathered from many sources.",
    "Nonfiction also teaches with pictures and charts. A table, graph, diagram or timeline packs facts into a small space. Read its title, its labels and its key. For example, a table of the Wright brothers' four flights on December 17, 1903 shows that the first went 120 feet and the last went 852 feet. You can see at a glance how much they improved in one day.",
    "Good authors support their points with reasons and evidence. A point is what the author wants you to believe: honeybees are important to farmers. A reason tells why: bees carry pollen from flower to flower, which helps many crops make fruit. Evidence proves the reason with facts and examples: apples, blueberries and almonds depend on bees and other pollinators. Listen for reasons and evidence when people speak too.",
    "Finally, when you research a topic, read more than one text. One article might explain how honeybees dance to share where flowers are. Another might explain how the hive works. Put them together, and you know far more than either text alone. When you write or speak about what you learned, refer to the texts: 'The first article says...'",
  ].join("\n\n"),
  keyIdeas: [
    "A firsthand account is by someone who was there; a secondhand account is by someone who wasn't.",
    "Charts, tables, diagrams and timelines show facts at a glance; read the title and labels.",
    "Authors and speakers support points with reasons, and reasons with evidence.",
    "Combine facts from two texts and say which text each fact came from.",
  ],
  hook: {
    text: "Almost two thousand years ago, a teenager watched a volcano erupt across the bay. He later wrote down what he saw, and we can still read his words today. Why is his account so special? Because he was there. Today you'll learn to weigh evidence like a historian.",
  },
  teach: [
    {
      title: "Firsthand and Secondhand Accounts",
      teach:
        "An account is a telling of what happened. A firsthand account comes from someone who was there: a diary, a letter, an interview with a witness, or a photo taken at the event. Pliny the Younger saw Mount Vesuvius erupt in the year 79 and wrote letters about the giant cloud, shaped like an umbrella pine tree. That's firsthand. A secondhand account comes from someone who wasn't there but learned about it, like an encyclopedia or a history book written today. Each has strengths. Firsthand accounts give feelings and close-up details, but only one person's view. Secondhand accounts can combine many sources to give the bigger picture. Look for clues: I, we and saw suggest firsthand.",
      visual: {
        type: "compare",
        left: { title: "Firsthand", points: ["Written by someone who was there", "Diaries, letters, interviews", "Feelings and close-up details", "One person's view"] },
        right: { title: "Secondhand", points: ["Written by someone who wasn't there", "Encyclopedias, textbooks, articles", "Facts from many sources", "The bigger picture"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each source: firsthand or secondhand?",
        buckets: ["Firsthand", "Secondhand"],
        items: [
          { text: "Pliny's letter about the eruption he watched", bucket: 0 },
          { text: "Orville Wright's diary from the day he flew", bucket: 0 },
          { text: "A photo taken during the first flight", bucket: 0 },
          { text: "A textbook chapter about Pompeii written last year", bucket: 1 },
          { text: "An encyclopedia article about the Wright brothers", bucket: 1 },
        ],
        hint: "Ask: was the person who made this actually there when it happened?",
        seconds: 40,
      },
      think: {
        q: "What is one strength of a secondhand account?",
        choices: ["It shows exactly how the writer felt in the moment", "It can combine facts from many sources", "It was always written on the same day"],
        answer: 1,
        why: "Someone studying an event later can gather many sources and show the bigger picture.",
        hints: ["Feelings in the moment come from people who were there: firsthand.", "", "Secondhand accounts are often written much later."],
      },
      approaches: {
        analogy: "If you were at your cousin's birthday party, your story is firsthand. If your friend tells someone else about it from what you said, that's secondhand.",
        example: "Firsthand: 'I saw the cloud rise from the mountain, and I was afraid.' Secondhand: 'In the year 79, Vesuvius erupted and buried Pompeii.' The first has I and feelings; the second has big-picture facts.",
        simpler: {
          q: "A letter written by someone who watched the event is a...",
          choices: ["Firsthand account", "Secondhand account", "Fable"],
          answer: 0,
          why: "The writer was there, so it is firsthand.",
          hints: ["", "Secondhand means the writer was NOT there.", "A fable is a made-up story with a lesson."],
        },
      },
    },
    {
      title: "Reading Charts, Tables and Diagrams",
      teach:
        "Nonfiction uses visuals to show facts quickly. A table arranges facts in rows and columns. A bar graph compares amounts with bars. A diagram is a labeled picture showing parts or how something works, like the parts of a canal lock. A timeline shows events in order. Always read the title first, then the labels. Here is a table of the Wright brothers' four flights on December 17, 1903. Flight 1, Orville: 120 feet. Flight 2, Wilbur: about 175 feet. Flight 3, Orville: about 200 feet. Flight 4, Wilbur: 852 feet, lasting 59 seconds. What does the table show that a sentence might not? At a glance, you see how each flight went farther.",
      visual: {
        type: "timeline",
        events: [
          { year: 1899, label: "Kite tests", detail: "The Wrights test their wing ideas with a large kite." },
          { year: 1900, label: "First glider at Kitty Hawk", detail: "They test a glider on the windy sand hills of North Carolina." },
          { year: 1902, label: "Better glider", detail: "Their new glider can be steered well." },
          { year: 1903, label: "First powered flights", detail: "December 17: four flights, the longest 852 feet in 59 seconds." },
        ],
      },
      probe: {
        type: "number",
        prompt: "The table shows Flight 1 went 120 feet and Flight 4 went 852 feet. How many feet farther did Flight 4 go?",
        answer: 732,
        unit: "feet",
        hint: "Subtract the shorter flight from the longer one: 852 − 120.",
        mistakes: [{ match: "972", coach: "That adds the two flights. To find how much farther, subtract: 852 − 120." }],
        seconds: 40,
      },
      think: {
        q: "What should you read first on any chart or table?",
        choices: ["The title", "The smallest number", "The last row"],
        answer: 0,
        why: "The title tells you what the whole chart is about.",
        hints: ["", "Numbers mean little until you know what the chart is about.", "Start at the top: what is this chart about?"],
      },
      approaches: {
        analogy: "A chart is like a map of facts. Just as a map has a title and a key to help you read it, a chart has a title and labels.",
        example: "A bar graph titled 'Books Read in June' has bars for Ana (6) and Ben (4). Read the title, read the labels, compare the bars: Ana read 2 more books than Ben.",
        simpler: {
          q: "Which visual shows events in the order they happened?",
          choices: ["A diagram of a bee", "A timeline", "A map key"],
          answer: 1,
          why: "A timeline places events in order by date.",
          hints: ["A diagram shows parts, not dates in order.", "", "A map key explains symbols on a map."],
        },
      },
    },
    {
      title: "Reasons and Evidence",
      teach:
        "Authors and speakers want you to believe their points, so good ones back them up. Here's how it's built. The point: honeybees are important to farmers. A reason tells why: bees carry pollen from flower to flower, which helps plants make fruit and seeds. Evidence proves the reason with facts, numbers, examples or experts: apples, blueberries and almonds all depend on bees and other pollinators, and many almond farmers rent beehives each spring. A point with no reasons is just an opinion. A reason with no evidence is weak. When you listen to a speaker, ask the same questions: What's the point? What are the reasons? What's the evidence?",
      visual: {
        type: "hotspots",
        title: "How a point is supported",
        center: "Point: Bees are important to farmers",
        spots: [
          { label: "Reason", icon: "🐝", detail: "Bees carry pollen from flower to flower, helping plants make fruit." },
          { label: "Evidence 1", icon: "🍎", detail: "Apples, blueberries and almonds depend on bees and other pollinators." },
          { label: "Evidence 2", icon: "📦", detail: "Many almond farmers rent beehives each spring." },
          { label: "Listen for it", icon: "👂", detail: "Speakers use reasons and evidence too. Listen for them." },
        ],
      },
      probe: {
        type: "highlight",
        prompt: "The author's point is 'Bees are important to farmers.' Tap the TWO sentences that are evidence (facts or examples).",
        sentences: [
          "Bees are amazing little creatures.",
          "Apples, blueberries and almonds depend on bees and other pollinators.",
          "Many almond farmers rent beehives each spring.",
          "I think bees are the best insects.",
        ],
        correct: [1, 2],
        hint: "Evidence can be checked. 'Amazing' and 'I think' are opinions.",
        seconds: 35,
      },
      think: {
        q: "Which is the best evidence for the point 'Exercise is good for kids'?",
        choices: ["Exercise is fun.", "Doctors say exercise makes the heart and muscles stronger.", "My friend likes soccer."],
        answer: 1,
        why: "It's a fact from experts that directly supports the point.",
        hints: ["Fun is an opinion, not a fact that proves it's good for you.", "", "One friend liking soccer doesn't prove exercise is good for all kids."],
      },
      approaches: {
        analogy: "A point is like a tent, reasons are the poles, and evidence is the stakes in the ground. Without stakes, the tent blows away in the first wind.",
        example: "Point: Our town should plant more trees. Reason: Trees keep streets cooler. Evidence: Shade can make a sidewalk much cooler than one in full sun. Point, reason, evidence.",
        simpler: {
          q: "Which is a fact that could be checked?",
          choices: ["Bees are the best", "Bees carry pollen between flowers", "Bees are cute"],
          answer: 1,
          why: "You can check that bees carry pollen. 'Best' and 'cute' are opinions.",
          hints: ["'Best' is an opinion; people disagree.", "", "'Cute' is an opinion, not a checkable fact."],
        },
      },
    },
    {
      title: "Putting Two Texts Together",
      teach:
        "Experts never read just one source. Imagine two articles about honeybees. Text A explains that a honeybee that finds flowers returns to the hive and does a waggle dance, which shows the other bees which direction to fly and how far. Text B explains that a hive has one queen, who lays the eggs, and thousands of workers, who make honey from flower nectar and build wax comb. Both texts say bees visit flowers for nectar. Put them together and you can explain how a hive works and how it finds food. When you write or speak, name your source: 'Text A says...' or 'According to the second article...'. That's referring to the text.",
      visual: {
        type: "compare",
        left: { title: "Text A: The waggle dance", points: ["A bee finds flowers", "It returns and dances", "The dance shows direction and distance", "Bees visit flowers for nectar"] },
        right: { title: "Text B: Inside the hive", points: ["One queen lays the eggs", "Workers make honey from nectar", "Workers build wax comb", "Bees visit flowers for nectar"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each fact: does it come from Text A, Text B, or both?",
        buckets: ["Text A only", "Text B only", "Both texts"],
        items: [
          { text: "Bees dance to show where flowers are", bucket: 0 },
          { text: "The dance shows direction and distance", bucket: 0 },
          { text: "A hive has one queen", bucket: 1 },
          { text: "Workers build wax comb", bucket: 1 },
          { text: "Bees visit flowers for nectar", bucket: 2 },
        ],
        hint: "Text A is about the dance. Text B is about the hive. One fact is in both.",
        seconds: 40,
      },
      think: {
        q: "Why read two texts on the same topic?",
        choices: ["To learn more than either one alone teaches", "To finish faster", "Because the first one is always wrong"],
        answer: 0,
        why: "Each text adds facts, so together you know more.",
        hints: ["", "Reading two texts takes longer, but you learn more.", "The first text isn't wrong; it just doesn't tell everything."],
      },
      approaches: {
        analogy: "Two texts are like two puzzle pieces. Each shows part of the picture, and together you see much more.",
        example: "Text A: 'Monarchs fly to Mexico in fall.' Text B: 'Monarchs lay eggs only on milkweed plants.' Together: 'Monarchs fly to Mexico in fall, and in spring their young need milkweed, so both places matter to them.'",
        simpler: {
          q: "Which phrase shows you are referring to a text?",
          choices: ["'I just know that...'", "'Everybody says...'", "'According to Text A...'"],
          answer: 2,
          why: "Naming the text tells your listener where the fact came from.",
          hints: ["That gives no source at all.", "'Everybody' is not a source you can check.", ""],
        },
      },
    },
  ],
  activity: {
    type: "highlight",
    prompt: "Pliny watched Vesuvius erupt. Tap every sentence that could only come from a FIRSTHAND account.",
    sentences: [
      "I saw a cloud rise from the mountain, shaped like a pine tree.",
      "Vesuvius erupted in the year 79.",
      "My mother begged me to run ahead without her.",
      "Pompeii was buried and later dug up by archaeologists.",
      "The ground shook beneath our feet all night.",
    ],
    correct: [0, 2, 4],
  },
  explain: {
    prompt: "Explain the difference between a firsthand and a secondhand account. Then explain how an author supports a point.",
    keyPoints: [
      "Firsthand is written by someone who was there",
      "Secondhand is written by someone who was not there",
      "An author gives reasons for a point",
      "Evidence like facts and examples supports the reasons",
    ],
  },
  mastery: [
    {
      type: "number",
      prompt: "Wilbur's fourth flight lasted 59 seconds. Orville's first flight lasted 12 seconds. How many seconds longer was the fourth flight?",
      answer: 47,
      unit: "seconds",
      hint: "Subtract: 59 − 12.",
      mistakes: [{ match: "71", coach: "That adds them. 'How much longer' means subtract: 59 − 12." }],
      seconds: 30,
    },
    {
      type: "sort",
      prompt: "Sort each source: firsthand or secondhand?",
      buckets: ["Firsthand", "Secondhand"],
      items: [
        { text: "An interview with a firefighter who fought the fire", bucket: 0 },
        { text: "A sailor's journal from the voyage", bucket: 0 },
        { text: "A website summary of the voyage written this year", bucket: 1 },
        { text: "Your textbook's chapter on ancient Rome", bucket: 1 },
      ],
      hint: "Was the person who made it there when it happened?",
      seconds: 30,
    },
    {
      type: "cloze",
      text: "An author's {0} is what they want you to believe. A {1} tells why, and {2} proves it with facts and examples.",
      blanks: [{ answers: ["point"] }, { answers: ["reason"] }, { answers: ["evidence"] }],
      bank: ["point", "reason", "evidence", "title", "rhyme"],
      hint: "Point, then reason, then evidence: like a tent, poles and stakes.",
      seconds: 30,
    },
    {
      type: "match",
      prompt: "Match each visual to what it shows best.",
      pairs: [
        { left: "Timeline", right: "events in order by date" },
        { left: "Diagram", right: "the labeled parts of something" },
        { left: "Bar graph", right: "comparing amounts" },
        { left: "Table", right: "facts in rows and columns" },
      ],
      hint: "Time goes on a timeline; parts go on a diagram; bars compare; rows and columns make a table.",
      seconds: 35,
    },
  ],
  check: [
    {
      q: "Pliny's letters about Vesuvius are a firsthand account because...",
      choices: ["He wrote them in Latin", "He saw the eruption himself", "They are very old"],
      answer: 1,
      why: "A firsthand account comes from someone who was there.",
    },
    {
      q: "What does a diagram usually show?",
      choices: ["The labeled parts of something or how it works", "Only dates", "A list of opinions"],
      answer: 0,
      why: "A diagram is a labeled picture of parts or a process.",
    },
    {
      q: "Point: 'Our library should stay open later.' Which is the best reason?",
      choices: ["Libraries are nice.", "I like the color of the building.", "Many families can only visit after work."],
      answer: 2,
      why: "It explains why later hours would help people.",
    },
    {
      q: "How should you mention a fact you learned from a text?",
      choices: ["Pretend you always knew it", "Name the source, like 'According to Text B...'", "Leave it out"],
      answer: 1,
      why: "Referring to the text shows where your facts come from.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Choose a topic you're curious about (an animal, an invention, or an event in history). Read two short texts about it, with a parent's help finding them. Write one paragraph that combines facts from both, naming each source ('The first article says...'). Then write whether each source was firsthand or secondhand and how you know.",
    rubric: [
      "The paragraph uses facts from both texts",
      "Each fact is linked to its source",
      "The paragraph has a clear main idea",
      "Each source is correctly called firsthand or secondhand, with a reason",
      "Complete sentences with correct capitals and punctuation",
    ],
  },
};

// 7. Grammar and conventions workshop
const grammar: Lesson = {
  id: "ela-4.grammar-workshop",
  title: "Grammar Workshop: Building Strong Sentences",
  minutes: 35,
  stage: "grammar",
  standards: ["L.4.1", "L.4.2", "L.4.3", "SL.4.6"],
  read: [
    "A carpenter needs good tools, and so does a writer. Grammar is your toolbox.",
    "Relative pronouns, who, whose, whom, which and that, connect extra information to a noun: 'The girl who found the fossil was ten.' Relative adverbs, where, when and why, do the same for places, times and reasons: 'That's the field where we play.' Prepositional phrases tell where, when or how, and start with words like under, across, during and with: 'The fox ran across the field.'",
    "Verbs tell time. Progressive tenses show action that keeps going: 'I was reading' (past), 'I am reading' (present), 'I will be reading' (future). Helping verbs called modals show how sure or allowed something is: can (able to), may (allowed to, or maybe) and must (have to).",
    "When you stack adjectives, English has an order: opinion, size, age, shape, color, origin, material, then purpose. So we say 'a lovely little red wooden boat', never 'a wooden red little lovely boat'.",
    "A complete sentence has a subject and a predicate and makes sense alone. 'Ran to the barn' is a fragment: who ran? A run-on jams two sentences together: 'It rained we stayed in.' Fix it with a period or with a comma and a joining word: 'It rained, so we stayed in.' The joining words are for, and, nor, but, or, yet and so.",
    "Punctuation and capitals matter too. Capitalize names, places, days, holidays and the first word of a sentence. In dialogue, put quotation marks around the exact words and a comma before the closing marks: \"Let's go,\" said Ben. Watch for commonly confused words: to, too and two; there, their and they're.",
    "Finally, choose precise words. Instead of 'walked', try strolled, marched or tiptoed. Use an exclamation point for strong feeling. And fit your words to the setting: formal English for a report or a speech, informal English with friends.",
  ].join("\n\n"),
  keyIdeas: [
    "Relative pronouns (who, which, that) and adverbs (where, when, why) add information to a sentence.",
    "Progressive tenses show ongoing action; can, may and must show ability, permission and need.",
    "Complete sentences have a subject and predicate; fix run-ons with a period or a comma and a joining word.",
    "Use capitals, quotation marks and commas correctly, choose precise words, and use formal English when the situation calls for it.",
  ],
  hook: {
    text: "Here's a sentence a careless writer sent me: 'their going too the park its sunny we will bring are dog.' Ouch! It's full of mistakes. By the end of today, you'll be able to fix every one of them, like a carpenter fixing a wobbly chair.",
  },
  teach: [
    {
      title: "Who, Which, Where: Connecting Words",
      teach:
        "Some small words help you add information to a sentence. Relative pronouns are who, whose, whom, which and that. Use who for people: 'The girl who found the fossil was ten.' Use which or that for things: 'The fossil, which was a fish, was millions of years old.' Use whose to show ownership: 'the boy whose dog barked.' Relative adverbs are where, when and why. Where points to a place, when to a time, and why to a reason: 'That's the field where we play.' 'I remember the day when it snowed.' Prepositional phrases add details too. They begin with a preposition, like under, across, during or with: 'The fox ran across the frozen field.'",
      visual: {
        type: "flip",
        cards: [
          { front: "who / whom", back: "For people: the man who built the canal." },
          { front: "whose", back: "Shows ownership: the girl whose kite flew highest." },
          { front: "which / that", back: "For things: the boat that sailed first." },
          { front: "where / when / why", back: "Place, time, reason: the town where I was born." },
          { front: "Prepositional phrase", back: "Begins with a word like under, across, during: under the bridge." },
        ],
      },
      probe: {
        type: "cloze",
        text: "The farmer {0} grew the biggest pumpkin won a ribbon. We visited the barn {1} the pumpkin grew. I remember the day {2} it was weighed.",
        blanks: [{ answers: ["who"] }, { answers: ["where"] }, { answers: ["when"] }],
        bank: ["who", "where", "when", "which", "why"],
        hint: "Who for a person, where for a place, when for a time.",
        mistakes: [{ match: "which", coach: "Which is for things, not people. The farmer is a person." }],
        seconds: 35,
      },
      think: {
        q: "Which word correctly finishes the sentence? 'The dog ___ tail was wagging ran to me.'",
        choices: ["who", "whose", "where"],
        answer: 1,
        why: "Whose shows ownership: the tail belongs to the dog.",
        hints: ["Who would be 'the dog who ran'. Here we need a word that shows the tail belongs to the dog.", "", "Where is for places. The tail is not a place."],
      },
      approaches: {
        analogy: "Relative pronouns are like hooks on a wall. They let you hang extra information right next to the noun it describes.",
        example: "Two short sentences: 'My aunt lives in Ohio. She bakes bread.' Hook them with who: 'My aunt, who lives in Ohio, bakes bread.' One smooth sentence.",
        simpler: {
          q: "Which relative pronoun is used for people?",
          choices: ["who", "which", "where"],
          answer: 0,
          why: "Who is for people.",
          hints: ["", "Which is for things, not people.", "Where is for places."],
        },
      },
    },
    {
      title: "Verbs That Keep Going and Helping Verbs",
      teach:
        "Progressive tenses show an action that is, was or will be going on for a while. They use a form of be plus a verb ending in -ing. Past progressive: 'I was reading when the phone rang.' Present progressive: 'I am reading right now.' Future progressive: 'I will be reading at bedtime.' Modal auxiliaries are helping verbs that change the meaning of the main verb. Can means able to: 'I can swim.' May means allowed to, or maybe: 'You may go outside.' 'It may rain.' Must means have to: 'We must finish our chores first.' Choosing the right one makes your meaning exact.",
      visual: {
        type: "flip",
        cards: [
          { front: "Past progressive", back: "was / were + -ing: I was reading when the phone rang." },
          { front: "Present progressive", back: "am / is / are + -ing: I am reading right now." },
          { front: "Future progressive", back: "will be + -ing: I will be reading at bedtime." },
          { front: "can / may / must", back: "able to / allowed to or maybe / have to" },
        ],
      },
      probe: {
        type: "cloze",
        text: "Yesterday at noon, we {0} hiking. Right now, I {1} writing about it. Tomorrow, we {2} resting!",
        blanks: [{ answers: ["were"] }, { answers: ["am"] }, { answers: ["will be"] }],
        bank: ["were", "am", "will be", "must", "can"],
        hint: "Yesterday is past (were), right now is present (am), tomorrow is future (will be).",
        seconds: 35,
      },
      think: {
        q: "Which modal shows that something is required? 'You ___ wear a helmet when you ride.'",
        choices: ["may", "can", "must"],
        answer: 2,
        why: "Must means have to: it is required.",
        hints: ["May means allowed to or maybe. That sounds optional.", "Can means able to. Being able isn't the same as being required.", ""],
      },
      approaches: {
        analogy: "Progressive tenses are like a movie paused in the middle of a scene: the action was, is or will be in the middle of happening.",
        example: "Simple: 'I read.' Past progressive: 'I was reading when Grandpa called.' The -ing form plus 'was' shows the reading was going on when something else happened.",
        simpler: {
          q: "Which modal means 'able to'?",
          choices: ["can", "must", "may"],
          answer: 0,
          why: "Can means able to: 'I can whistle.'",
          hints: ["", "Must means have to.", "May means allowed to, or maybe."],
        },
      },
    },
    {
      title: "Building Complete Sentences",
      teach:
        "A complete sentence has a subject (who or what) and a predicate (what they do or are), and it makes sense on its own. 'Ran across the field' is a fragment, because it's missing a subject. A run-on jams two sentences together with no punctuation: 'The wind howled the door slammed.' Fix a run-on with a period, or with a comma and a joining word: for, and, nor, but, or, yet, so. 'The wind howled, and the door slammed.' Adjectives have an order too: opinion, size, age, shape, color, origin, material, purpose. That's why we say 'a lovely little red wooden boat'. Try saying it another way, and it sounds wrong.",
      visual: {
        type: "compare",
        left: { title: "Problem", points: ["Fragment: 'Ran across the field.'", "Run-on: 'The wind howled the door slammed.'", "Jumbled: 'a wooden red little boat'"] },
        right: { title: "Fixed", points: ["'The fox ran across the field.'", "'The wind howled, and the door slammed.'", "'a little red wooden boat'"] },
      },
      probe: {
        type: "build",
        prompt: "Put the adjectives in the right order: opinion, size, color, material.",
        tiles: ["a", "lovely", "little", "red", "wooden", "boat"],
        hint: "Opinion (lovely) comes first, then size (little), then color (red), then material (wooden).",
        seconds: 35,
      },
      think: {
        q: "Which is the best way to fix this run-on? 'I was tired I went to bed.'",
        choices: ["I was tired I went, to bed.", "I was tired, so I went to bed.", "I was tired I went to bed!"],
        answer: 1,
        why: "A comma plus the joining word 'so' correctly connects the two sentences.",
        hints: ["The comma is in the wrong place; the two sentences are still jammed together.", "", "An exclamation point at the end doesn't fix the jam in the middle."],
      },
      approaches: {
        analogy: "Two sentences are like two train cars. A run-on is two cars crashed together. A comma plus 'and', 'but' or 'so' is the coupling that links them safely.",
        example: "Fragment: 'Under the old bridge.' Ask: who did what? Add it: 'The troll lived under the old bridge.' Now there's a subject (the troll) and a predicate (lived under the old bridge).",
        simpler: {
          q: "What is a sentence missing if it doesn't say who or what?",
          choices: ["A subject", "A period", "An adjective"],
          answer: 0,
          why: "The subject tells who or what the sentence is about.",
          hints: ["", "A period ends a sentence, but it doesn't tell who.", "Adjectives describe; they don't tell who does the action."],
        },
      },
    },
    {
      title: "Capitals, Commas, Quotation Marks and Tricky Words",
      teach:
        "Capitalize the first word of a sentence, names of people and places, days, months, holidays, and important words in titles: 'On Monday, Ava read Treasure Island.' In dialogue, quotation marks go around the speaker's exact words. Put a comma before the closing quotation marks when the sentence keeps going: \"Let's go to the lake,\" said Ben. Or put it after the speaker's tag: Ben said, \"Let's go to the lake.\" In a compound sentence, put a comma before the joining word: 'I wanted to go, but it rained.' Finally, watch for words that sound alike. To means toward, too means also, and two is 2. There is a place, their means belonging to them, and they're means they are.",
      visual: {
        type: "flip",
        cards: [
          { front: "to / too / two", back: "toward / also or very / the number 2" },
          { front: "there / their / they're", back: "a place / belongs to them / they are" },
          { front: "your / you're", back: "belongs to you / you are" },
          { front: "its / it's", back: "belongs to it / it is" },
          { front: "Dialogue", back: "\"Let's go,\" said Ben. Comma inside the closing quotation marks." },
        ],
      },
      probe: {
        type: "cloze",
        text: "{0} going to the park. They forgot {1} kite, so we have {2} go back. I want to come {3}!",
        blanks: [{ answers: ["They're"] }, { answers: ["their"] }, { answers: ["to"] }, { answers: ["too"] }],
        bank: ["They're", "their", "to", "too", "there", "two"],
        hint: "They're = they are. Their = belongs to them. To = toward or before a verb. Too = also.",
        mistakes: [
          { match: "there", coach: "There is a place. Do you mean 'they are' (they're) or 'belongs to them' (their)?" },
          { match: "two", coach: "Two is the number 2. Which word means 'also' or comes before a verb?" },
        ],
        seconds: 45,
      },
      think: {
        q: "Which sentence is punctuated correctly?",
        choices: ["\"Wait for me\" called Ana.", "\"Wait for me,\" called Ana.", "Wait for me, \"called Ana.\""],
        answer: 1,
        why: "The comma goes inside the closing quotation marks, and only her exact words are in quotes.",
        hints: ["A comma is needed before the closing quotation marks.", "", "The quotation marks should go around her words, not around 'called Ana'."],
      },
      approaches: {
        analogy: "Quotation marks are like a speech bubble in a comic. Only the words the character actually says go inside the bubble.",
        example: "Fix it: 'their going to the lake on saturday.' They're means they are, so: 'They're going to the lake on Saturday.' Saturday is a day, so it gets a capital.",
        simpler: {
          q: "Which word means 'also'?",
          choices: ["to", "two", "too"],
          answer: 2,
          why: "Too means also (or very): 'I want some too.'",
          hints: ["To means toward, as in 'go to school'.", "Two is the number 2.", ""],
        },
      },
    },
    {
      title: "Precise Words and the Right Voice",
      teach:
        "Strong writers choose precise words. 'The dog went down the road' is fuzzy. 'The puppy scampered down the road' paints a picture. Instead of said, try whispered, shouted or stammered. Punctuation can add effect too. An exclamation point shows strong feeling: 'Watch out!' A question mark makes the reader wonder. Use these on purpose, not on every sentence. Finally, fit your words to the situation. Formal English is for reports, letters to adults you don't know well, and speeches: 'Good morning. Today I will tell you about bees.' Informal English is fine with friends and family: 'Hey, guess what I learned about bees!' Knowing when to use each one shows respect for your listener.",
      visual: {
        type: "compare",
        left: { title: "Formal", points: ["Reports and speeches", "Letters to adults you don't know well", "Complete sentences, no slang", "'Good morning. Thank you for coming.'"] },
        right: { title: "Informal", points: ["Chatting with friends and family", "Notes to a brother or sister", "Relaxed words are fine", "'Hey, guess what!'"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each sentence: formal or informal?",
        buckets: ["Formal", "Informal"],
        items: [
          { text: "Dear Mayor Smith, thank you for visiting our class.", bucket: 0 },
          { text: "Today I will present my report on honeybees.", bucket: 0 },
          { text: "Thank you for your time and attention.", bucket: 0 },
          { text: "Hey, wanna come over?", bucket: 1 },
          { text: "That movie was super cool!", bucket: 1 },
          { text: "See ya tomorrow!", bucket: 1 },
        ],
        hint: "Formal sounds like a speech or a letter to an adult. Informal sounds like talking to a friend.",
        seconds: 40,
      },
      think: {
        q: "Which word gives the clearest picture? 'The cat ___ toward the bird.'",
        choices: ["went", "crept", "moved"],
        answer: 1,
        why: "Crept shows exactly how the cat moved: slowly and quietly.",
        hints: ["Went is fuzzy. How did the cat go?", "", "Moved could mean anything. Pick a word that shows how."],
      },
      approaches: {
        analogy: "Choosing formal or informal English is like choosing clothes. You wear your best outfit to a wedding and comfy clothes at home. Both are fine in the right place.",
        example: "Fuzzy: 'The big dog made a noise.' Precise: 'The huge mastiff growled.' Each precise word (huge, mastiff, growled) adds to the picture.",
        simpler: {
          q: "When should you use formal English?",
          choices: ["When giving a report to the class", "When joking with your brother", "When playing tag"],
          answer: 0,
          why: "Reports and speeches call for formal English.",
          hints: ["", "Joking with family is a time for relaxed, informal talk.", "Playground games are a time for informal talk."],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each group of words: complete sentence, fragment or run-on?",
    buckets: ["Complete sentence", "Fragment", "Run-on"],
    items: [
      { text: "The fox ran across the field.", bucket: 0 },
      { text: "It rained, so we stayed inside.", bucket: 0 },
      { text: "Under the old bridge.", bucket: 1 },
      { text: "Ran to the barn.", bucket: 1 },
      { text: "The wind howled the door slammed.", bucket: 2 },
      { text: "I was hungry I ate an apple.", bucket: 2 },
    ],
  },
  explain: {
    prompt: "Explain how to fix a run-on sentence, and how to punctuate a line of dialogue. Give an example of each.",
    keyPoints: [
      "A run-on is two sentences jammed together",
      "Fix it with a period or a comma and a joining word like and, but or so",
      "Quotation marks go around the speaker's exact words",
      "A comma goes before the closing quotation marks",
    ],
  },
  mastery: [
    {
      type: "cloze",
      text: "My {0} brothers want to come {1}. We are going {2} the lake.",
      blanks: [{ answers: ["two"] }, { answers: ["too"] }, { answers: ["to"] }],
      bank: ["two", "too", "to", "there"],
      hint: "Two is a number, too means also, to means toward.",
      seconds: 30,
    },
    {
      type: "build",
      prompt: "Build a correctly punctuated line of dialogue.",
      tiles: ["\"Let's go to the canal,\"", "said", "Ben."],
      distractors: ["\"Let's go to the canal\"", "Said"],
      hint: "The comma goes inside the closing quotation marks, and 'said' doesn't need a capital here.",
      seconds: 30,
    },
    {
      type: "highlight",
      prompt: "Tap the TWO sentences that are punctuated correctly with a comma before the joining word.",
      sentences: ["I wanted to play outside, but it rained.", "We fed the ducks and they quacked loudly.", "Mom baked bread, so the house smelled wonderful.", "He ran fast but, he missed the bus."],
      correct: [0, 2],
      hint: "In a compound sentence, the comma comes right before and, but or so.",
      seconds: 35,
    },
    {
      type: "match",
      prompt: "Match each sentence to its verb tense.",
      pairs: [
        { left: "I was painting the fence.", right: "past progressive" },
        { left: "I am painting the fence.", right: "present progressive" },
        { left: "I will be painting the fence.", right: "future progressive" },
      ],
      hint: "Was = past, am = present, will be = future.",
      seconds: 25,
    },
    {
      type: "sort",
      prompt: "Which words need a capital letter? Sort them.",
      buckets: ["Needs a capital", "No capital"],
      items: [
        { text: "monday", bucket: 0 },
        { text: "thanksgiving", bucket: 0 },
        { text: "mississippi river", bucket: 0 },
        { text: "river", bucket: 1 },
        { text: "holiday", bucket: 1 },
        { text: "morning", bucket: 1 },
      ],
      hint: "Names of specific days, holidays and places get capitals. Common words don't.",
      seconds: 30,
    },
  ],
  check: [
    {
      q: "Which sentence uses the relative pronoun correctly?",
      choices: ["The boy which won is my cousin.", "The boy where won is my cousin.", "The boy who won is my cousin."],
      answer: 2,
      why: "Who is used for people.",
    },
    {
      q: "Which is a complete sentence?",
      choices: ["Under the table.", "The cat slept under the table.", "Sleeping under the table."],
      answer: 1,
      why: "It has a subject (the cat) and a predicate (slept under the table).",
    },
    {
      q: "Which adjective order is correct?",
      choices: ["a big old brown dog", "a brown old big dog", "an old brown big dog"],
      answer: 0,
      why: "Size (big), then age (old), then color (brown).",
    },
    {
      q: "Which sentence fits a formal report?",
      choices: ["Bees are, like, super awesome!", "Honeybees live in colonies with one queen.", "Bees? Ugh, no thanks."],
      answer: 1,
      why: "Formal English uses complete, clear sentences and no slang.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Write a short scene (8-12 sentences) where two characters talk, for example a farmer and a traveler on the Erie Canal. Use at least four lines of correctly punctuated dialogue, one sentence with who or where, one progressive verb (was, am or will be + -ing), one compound sentence with a comma before and, but or so, and three precise verbs instead of said or went.",
    rubric: [
      "Dialogue uses quotation marks and commas correctly",
      "Includes a relative pronoun or adverb used correctly",
      "Includes a progressive verb and a compound sentence with a comma",
      "Uses precise verbs instead of said or went",
      "No run-ons or fragments; capitals are correct",
    ],
  },
};

// 8. Opinion and informative writing, short research, notes and evidence
const opinionResearch: Lesson = {
  id: "ela-4.opinion-research",
  title: "Writing Opinions and Reports, with Research",
  minutes: 35,
  stage: "rhetoric",
  standards: ["W.4.1", "W.4.2", "W.4.6", "W.4.7", "W.4.8", "W.4.9"],
  read: [
    "Writers write for different purposes. Two of the most useful are opinion writing, which tries to convince, and informative writing, which teaches.",
    "An opinion piece states what you believe and proves it. One way to remember its parts is OREO. O: state your Opinion. R: give Reasons. E: support each reason with Evidence or Examples. O: restate your Opinion in a conclusion. Linking words like for instance, in addition and because help your reader follow along. For example: 'Every family should plant a garden. First, homegrown food is fresh. For instance, tomatoes picked from the vine are ripe and full of flavor. In addition, gardening teaches patience and hard work.'",
    "An informative piece teaches about a topic. It starts with an introduction that names the topic. Then it groups related facts into paragraphs, often with headings, like 'Where Penguins Live' and 'What Penguins Eat'. It uses facts, definitions, examples and precise subject words, and ends with a conclusion.",
    "Both kinds of writing often need research. A short research project begins with a question, like 'How do emperor penguins survive the winter?' Next, find a few good sources: books, encyclopedias, trusted websites, or an expert you can interview. Take notes in your own words, using key words instead of copying whole sentences. Sort your notes into groups, and keep a list of your sources with titles and authors.",
    "When you write about what you read, use evidence from the text. Quote exact words in quotation marks, or paraphrase, and say where it came from: 'According to the encyclopedia, emperor penguins huddle together to stay warm.'",
    "Finally, many writers type their work. With practice, you can type a full page in one sitting, then fix it, print it or share it with family.",
  ].join("\n\n"),
  keyIdeas: [
    "Opinion writing: opinion, reasons, evidence, conclusion (OREO), with linking words.",
    "Informative writing: introduce the topic, group facts under headings, and conclude.",
    "Research: ask a question, use several sources, take notes in your own words, and list your sources.",
    "Support your writing with evidence from texts, and say where it came from.",
  ],
  hook: {
    text: "Imagine you want your family to adopt a dog. If you just say 'Please!' a hundred times, they may say no. But if you give strong reasons and real evidence, you just might convince them. That is the power of good writing.",
  },
  teach: [
    {
      title: "Writing an Opinion",
      teach:
        "An opinion piece tries to convince the reader. Build it like an OREO cookie. Start with your Opinion: 'Every family should plant a garden.' Then give Reasons: 'Homegrown food is fresh, and gardening teaches patience.' Back each reason with Evidence or Examples: 'For instance, tomatoes picked from the vine are ripe and full of flavor.' End by restating your Opinion in a strong conclusion: 'For all these reasons, every family should grab a shovel and start a garden.' Linking words join your ideas: for instance, in addition, because, also, therefore. Group your reasons in a clear order so the reader can follow your thinking.",
      visual: {
        type: "hotspots",
        title: "The OREO plan",
        center: "Opinion piece",
        spots: [
          { label: "O: Opinion", icon: "📣", detail: "State clearly what you believe." },
          { label: "R: Reasons", icon: "🧠", detail: "Tell why you believe it." },
          { label: "E: Evidence", icon: "🔎", detail: "Facts and examples that prove each reason." },
          { label: "O: Opinion again", icon: "🔁", detail: "Restate your opinion in a strong conclusion." },
        ],
      },
      probe: {
        type: "sequence",
        prompt: "Put the sentences of this opinion paragraph in order.",
        steps: [
          "Every family should plant a garden.",
          "First, homegrown food is fresh and tasty.",
          "For instance, tomatoes picked from the vine are ripe and full of flavor.",
          "In addition, gardening teaches patience and hard work.",
          "For all these reasons, every family should start a garden.",
        ],
        hint: "Opinion first, then a reason, its example, another reason, and the conclusion last.",
        seconds: 45,
      },
      think: {
        q: "Which is a reason that supports the opinion 'Kids should learn to cook'?",
        choices: ["Cooking helps kids learn to take care of themselves.", "My favorite color is blue.", "Kitchens have sinks."],
        answer: 0,
        why: "It explains why learning to cook is good for kids.",
        hints: ["", "That's true for you, but it has nothing to do with cooking.", "That's a fact, but it doesn't explain why kids should cook."],
      },
      approaches: {
        analogy: "An opinion piece is like a lawyer in court. The lawyer doesn't just say 'He's innocent!' The lawyer gives reasons and shows evidence to convince the jury.",
        example: "Opinion: 'Our town needs a bike path.' Reason: 'It would keep riders safe.' Evidence: 'Right now, riders must share a busy road with trucks.' Conclusion: 'A bike path would make our town safer for everyone.'",
        simpler: {
          q: "What does the first O in OREO stand for?",
          choices: ["Opinion", "Order", "Over"],
          answer: 0,
          why: "Start by stating your opinion.",
          hints: ["", "Order matters, but the first step is to say what you believe.", "That's not one of the parts. Think about what you believe."],
        },
      },
    },
    {
      title: "Writing to Inform",
      teach:
        "Informative writing teaches. Begin with an introduction that names your topic and hooks the reader: 'Emperor penguins live in one of the coldest places on Earth.' Then group related facts together in paragraphs. Headings help, like 'Where They Live', 'What They Eat' and 'Raising Chicks'. Fill each paragraph with facts, definitions, examples and precise subject words, like Antarctica, krill and huddle. Use linking words such as another, for example, also and because. Add a picture or diagram if it helps. End with a conclusion that sums up what the reader learned. Remember: in informative writing, you teach the facts and leave your opinions out.",
      visual: {
        type: "compare",
        left: { title: "Opinion writing", points: ["Tries to convince", "States what you believe", "Reasons and evidence", "Ends by restating your opinion"] },
        right: { title: "Informative writing", points: ["Teaches about a topic", "Facts, definitions, examples", "Headings group related facts", "Ends by summing up"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each fact about emperor penguins under the right heading.",
        buckets: ["Where They Live", "What They Eat", "Raising Chicks"],
        items: [
          { text: "They live in Antarctica.", bucket: 0 },
          { text: "They stand on the sea ice in winter.", bucket: 0 },
          { text: "They catch fish in the ocean.", bucket: 1 },
          { text: "They also eat krill and squid.", bucket: 1 },
          { text: "The father keeps the egg warm on his feet.", bucket: 2 },
          { text: "Chicks have soft gray feathers.", bucket: 2 },
        ],
        hint: "Is the fact about a place, about food, or about babies?",
        seconds: 45,
      },
      think: {
        q: "Which sentence does NOT belong in an informative report about penguins?",
        choices: ["Penguins cannot fly, but they swim very well.", "Penguins are the cutest birds ever.", "Emperor penguins live in Antarctica."],
        answer: 1,
        why: "'Cutest ever' is an opinion. Informative writing sticks to facts.",
        hints: ["That's a fact you could check. It belongs.", "", "That's a fact about where they live. It belongs."],
      },
      approaches: {
        analogy: "Informative writing is like organizing a toolbox. Hammers go in one drawer, screwdrivers in another. Headings are the labels on the drawers.",
        example: "Heading: What They Eat. 'Emperor penguins are hunters. They dive into the icy ocean to catch fish. They also eat krill, tiny shrimp-like animals, and squid.' One heading, one group of facts, and a definition of krill.",
        simpler: {
          q: "What is the main purpose of informative writing?",
          choices: ["To tell a made-up story", "To convince the reader", "To teach facts about a topic"],
          answer: 2,
          why: "Informative writing teaches.",
          hints: ["Made-up stories are narratives.", "Convincing is the job of opinion writing.", ""],
        },
      },
    },
    {
      title: "Research and Notes",
      teach:
        "A short research project helps you become an expert. Here are the steps. First, ask a focused question: 'How do emperor penguins survive the winter?' Next, find two or three good sources: a library book, an encyclopedia, a trusted website, or an interview with someone who knows. Then take notes. Write key words and short phrases in your own words, not whole copied sentences: 'huddle together, take turns in middle'. Sort your notes into groups that answer parts of your question. Keep a source list with each title and author, so readers know where your facts came from. Finally, write, using your sorted notes as your plan.",
      visual: {
        type: "flip",
        cards: [
          { front: "Ask", back: "A focused question: How do emperor penguins survive the winter?" },
          { front: "Find", back: "Two or three good sources: books, encyclopedias, trusted websites, experts." },
          { front: "Take notes", back: "Key words in your own words, not copied sentences." },
          { front: "Sort", back: "Group your notes to answer parts of your question." },
          { front: "List sources", back: "Write each title and author." },
        ],
      },
      probe: {
        type: "sequence",
        prompt: "Put the steps of a short research project in order.",
        steps: [
          "Ask a focused question",
          "Find two or three good sources",
          "Take notes in your own words",
          "Sort your notes into groups",
          "Write your report and list your sources",
        ],
        hint: "You need a question before you can search, and notes before you can sort them.",
        seconds: 40,
      },
      think: {
        q: "Which is the best note from the sentence 'Emperor penguins huddle together in large groups and take turns standing in the warm middle'?",
        choices: [
          "huddle in groups, take turns in warm middle",
          "Emperor penguins huddle together in large groups and take turns standing in the warm middle",
          "penguins are birds",
        ],
        answer: 0,
        why: "Good notes are short key words in your own words that keep the important facts.",
        hints: ["", "That copies the whole sentence. Notes should be short key words.", "That's true, but it leaves out the important facts in the sentence."],
      },
      approaches: {
        analogy: "Taking notes is like packing a backpack for a hike. You don't bring the whole house, just the important things you'll need.",
        example: "Source sentence: 'The father penguin balances the egg on his feet for about two months.' Note: 'dad holds egg on feet, about 2 months'. Source list: 'Penguins of the World, by (author's name).'",
        simpler: {
          q: "Why do you keep a list of your sources?",
          choices: ["So readers know where your facts came from", "To make the report longer", "Because sources are fun to copy"],
          answer: 0,
          why: "A source list lets readers check your facts.",
          hints: ["", "Length isn't the point. Think about trust.", "You list sources, but you don't copy them."],
        },
      },
    },
    {
      title: "Evidence from Texts and Publishing",
      teach:
        "When you write about something you read, back it up with evidence from the text. You can quote, using the author's exact words inside quotation marks: The article says, \"Emperor penguins can dive deeper than any other bird.\" Or you can paraphrase, putting the idea in your own words. Either way, name your source: 'According to the encyclopedia...' or 'In the story, the lion...'. This works for stories too: if you say a character is brave, point to what she did. When your draft is ready, many writers type it on a computer. Typing lets you fix mistakes easily, add a picture, and print or share it. With practice, a fourth grader can type a full page in one sitting.",
      visual: {
        type: "compare",
        left: { title: "Quote", points: ["The author's exact words", "Inside quotation marks", "Name the source", "The article says, \"...\""] },
        right: { title: "Paraphrase", points: ["The idea in your own words", "No quotation marks needed", "Still name the source", "According to the article, ..."] },
      },
      probe: {
        type: "build",
        prompt: "Build a sentence that gives evidence and names its source.",
        tiles: ["According to the encyclopedia,", "emperor penguins", "huddle together", "to stay warm."],
        distractors: ["I just know", "maybe"],
        hint: "Start by naming the source, then give the fact.",
        seconds: 30,
      },
      think: {
        q: "You copy an author's exact sentence into your report. What must you do?",
        choices: ["Nothing; it's yours now", "Put it in quotation marks and name the source", "Change one word so it's different"],
        answer: 1,
        why: "Exact words go in quotation marks, with credit to the author.",
        hints: ["The words belong to the author. You must give credit.", "", "Changing one word still uses the author's work without credit."],
      },
      approaches: {
        analogy: "Giving credit to a source is like saying 'My grandma taught me this recipe.' You're sharing it, but you're honest about where it came from.",
        example: "Claim: 'The mouse was brave.' Evidence: 'In the fable, she ran toward the roaring lion and gnawed through the ropes.' The evidence points to the text to prove the claim.",
        simpler: {
          q: "Which is a paraphrase?",
          choices: ["Copying the sentence word for word", "Saying the same idea in your own words", "Making up a new fact"],
          answer: 1,
          why: "A paraphrase keeps the meaning but uses your own words.",
          hints: ["Word for word is a quote, not a paraphrase.", "", "A paraphrase keeps the source's idea; it doesn't invent new ones."],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each sentence: does it belong in an opinion piece or an informative piece?",
    buckets: ["Opinion piece", "Informative piece"],
    items: [
      { text: "I believe every school should have a garden.", bucket: 0 },
      { text: "For all these reasons, we should start a garden today.", bucket: 0 },
      { text: "The best pet is definitely a dog.", bucket: 0 },
      { text: "Emperor penguins live in Antarctica.", bucket: 1 },
      { text: "Krill are tiny shrimp-like animals.", bucket: 1 },
      { text: "The Erie Canal opened in 1825.", bucket: 1 },
    ],
  },
  explain: {
    prompt: "Explain the OREO plan for opinion writing, and the steps for a short research project.",
    keyPoints: [
      "State your opinion",
      "Give reasons with evidence or examples",
      "Restate the opinion in a conclusion",
      "Ask a question and find several sources",
      "Take notes in your own words and list your sources",
    ],
  },
  mastery: [
    {
      type: "cloze",
      text: "Gardening is good for families. {0}, it gives fresh food. {1}, tomatoes from the vine taste better. {2}, it teaches patience.",
      blanks: [{ answers: ["First"] }, { answers: ["For instance", "For example"] }, { answers: ["In addition", "Also"] }],
      bank: ["First", "For instance", "In addition", "However", "Once upon a time"],
      hint: "First starts a list of reasons. 'For instance' gives an example. 'In addition' adds another reason.",
      seconds: 40,
    },
    {
      type: "sequence",
      prompt: "Put the parts of an informative report in order.",
      steps: ["Introduction that names the topic", "Paragraph: Where They Live", "Paragraph: What They Eat", "Conclusion that sums up"],
      hint: "Introduce first, conclude last. The body paragraphs go in between.",
      seconds: 25,
    },
    {
      type: "highlight",
      prompt: "Tap the TWO good research notes (key words in your own words).",
      sentences: [
        "dad holds egg on feet, about 2 months",
        "Emperor penguin fathers balance the egg on their feet for about two months while the mothers are away at sea feeding.",
        "dive deep for fish, krill, squid",
        "I like penguins a lot",
      ],
      correct: [0, 2],
      hint: "Good notes are short key words about facts. Not whole copied sentences, and not opinions.",
      seconds: 35,
    },
    {
      type: "match",
      prompt: "Match each part of an opinion piece to an example.",
      pairs: [
        { left: "Opinion", right: "Our town needs a bike path." },
        { left: "Reason", right: "It would keep riders safe." },
        { left: "Evidence", right: "Riders now share a busy road with trucks." },
        { left: "Conclusion", right: "A bike path would make our town safer for all." },
      ],
      hint: "The opinion states a belief, the reason tells why, the evidence gives a fact, and the conclusion wraps up.",
      seconds: 40,
    },
  ],
  check: [
    {
      q: "What does an opinion piece try to do?",
      choices: ["Teach facts only", "Tell a made-up story", "Convince the reader"],
      answer: 2,
      why: "Opinion writing tries to convince, using reasons and evidence.",
    },
    {
      q: "What helps group facts in an informative report?",
      choices: ["Headings", "Rhymes", "Stage directions"],
      answer: 0,
      why: "Headings label each group of related facts.",
    },
    {
      q: "What is the first step of a research project?",
      choices: ["Write the conclusion", "Ask a focused question", "Print the report"],
      answer: 1,
      why: "A good question guides the whole project.",
    },
    {
      q: "Which shows a source correctly?",
      choices: ["Penguins are cool, trust me.", "According to Penguins of the World, emperor penguins huddle to stay warm.", "Everybody knows penguins huddle."],
      answer: 1,
      why: "It names the source of the fact.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Pick one: (A) an opinion piece, such as 'Every kid should learn to cook', or (B) an informative report on an animal you research. Use at least two sources and keep notes. Type your piece if you can (aim for about one page). For A, use OREO with linking words. For B, use an introduction, two headings with facts, and a conclusion. End with a list of your sources (title and author).",
    rubric: [
      "Opinion: clear opinion, reasons, evidence and conclusion; or Report: introduction, headings, facts and conclusion",
      "Uses linking words like for instance, in addition or because",
      "Includes at least one piece of evidence that names its source",
      "Lists at least two sources with titles",
      "Correct capitals, punctuation and spelling",
    ],
  },
};

// 9. Narrative writing, the writing process, and presenting
const storytelling: Lesson = {
  id: "ela-4.storytelling-presenting",
  title: "Telling Stories and Presenting Them",
  minutes: 35,
  stage: "rhetoric",
  standards: ["W.4.3", "W.4.4", "W.4.5", "W.4.10", "SL.4.4", "SL.4.5", "SL.4.6"],
  read: [
    "Every story I ever told began with a plan. A good narrative introduces a situation and a narrator or characters. It has a problem, events that unfold in order, and an ending that solves the problem. Transition words like later that day, meanwhile and the next morning carry the reader from one event to the next.",
    "Strong stories show instead of tell. Instead of 'Sam was nervous', write 'Sam's hands shook as he lifted the latch.' Use dialogue to let characters speak, and use sensory details, what characters see, hear, smell, taste and touch. Choose precise words: the wind didn't just blow, it howled.",
    "No writer gets it perfect the first time. Writing is a process: plan, draft, revise, edit and publish. When you revise, you make the writing stronger by adding details, removing parts that don't fit, moving sentences, or swapping weak words for strong ones. When you edit, you fix capitals, usage, punctuation and spelling. Ask a parent to read your draft and tell you one thing they liked and one question they have. Always think about your task, your purpose and your audience. A story for your little brother sounds different from a report for a museum.",
    "Write often. Keep a journal, write letters, and finish some pieces in one sitting and others over several days.",
    "Then share your work. When you present a story or a report, stand tall, look at your listeners, and speak clearly at a steady pace. Tell events in order and include good details. A picture, a map or a short sound recording can help your audience understand your main ideas, but only if it fits. And remember to use formal English for a presentation: 'Good evening. My story is called The Storm.'",
  ].join("\n\n"),
  keyIdeas: [
    "A narrative has a situation, characters, a problem, events in order with transitions, and an ending.",
    "Show, don't tell: use dialogue, sensory details and precise words.",
    "Writing is a process: plan, draft, revise, edit and publish, thinking about task, purpose and audience.",
    "Present clearly and at a good pace, with visuals or audio that help, using formal English.",
  ],
  hook: {
    text: "Every storyteller started as a beginner. I told my first fables to children in the town square, and my first tries were not very good! But I planned, practiced and improved. Today you'll learn how to write a story and share it like a real storyteller.",
  },
  teach: [
    {
      title: "Planning a Story",
      teach:
        "A narrative is a story, real or imagined. Before you write, plan it. Start with a situation: who, where and when. 'On a stormy night, a farm girl named Ruth heard a cry from the barn.' Choose a narrator: will you tell it in first person (I) or third person (she)? Then give your character a problem. Next, plan the events in order, each one building toward the most exciting part. Use transition words to move through time: first, later that night, meanwhile, at last. Finally, write an ending that solves the problem and shows how the character felt or what she learned. A simple plan keeps your story from wandering.",
      visual: {
        type: "hotspots",
        title: "A story plan",
        center: "Narrative",
        spots: [
          { label: "Situation", icon: "🌧️", detail: "Who, where and when: a stormy night on a farm." },
          { label: "Problem", icon: "❗", detail: "A cry from the barn: a calf is stuck in the mud." },
          { label: "Events", icon: "➡️", detail: "Events in order, with transitions like 'later' and 'meanwhile'." },
          { label: "Ending", icon: "🌅", detail: "The problem is solved, and the character learns or feels something." },
        ],
      },
      probe: {
        type: "sequence",
        prompt: "Put this story plan in order.",
        steps: [
          "On a stormy night, Ruth hears a cry from the barn.",
          "She finds a calf stuck deep in the mud.",
          "She runs to wake her father, and they bring a rope.",
          "Together they pull the calf free.",
          "At sunrise, Ruth smiles as the calf drinks warm milk.",
        ],
        hint: "Situation first, then the problem, the events that solve it, and the ending.",
        seconds: 40,
      },
      think: {
        q: "Which transition word shows that time has passed?",
        choices: ["because", "the next morning", "and"],
        answer: 1,
        why: "'The next morning' moves the reader forward in time.",
        hints: ["Because explains a reason, not a time.", "", "'And' joins ideas, but doesn't show time passing."],
      },
      approaches: {
        analogy: "Planning a story is like planning a trip. You know where you start, the stops along the way, and where you'll end up, so you don't get lost.",
        example: "Plan: Situation: a boy at the beach. Problem: his kite string snaps. Events: he chases the kite, it lands in a tree, a fisherman helps him climb. Ending: he flies it again, holding tight. Lesson: accept help.",
        simpler: {
          q: "What does a story need to keep the reader interested?",
          choices: ["A problem for the character", "A list of facts", "A table of contents"],
          answer: 0,
          why: "A problem gives the story tension and something to solve.",
          hints: ["", "Lists of facts are for reports, not stories.", "Tables of contents are for long books."],
        },
      },
    },
    {
      title: "Show, Don't Tell",
      teach:
        "Good storytellers show instead of tell. Telling: 'Ruth was scared.' Showing: 'Ruth's heart pounded as the barn door creaked open.' Showing lets the reader feel it too. Use sensory details: the smell of wet hay, the cold mud squishing in her boots, the lightning that lit up the sky. Use dialogue to let characters speak for themselves: \"Hold on, little one,\" Ruth whispered. And choose precise words: instead of 'went', try raced, trudged or crept. Each of these choices helps your reader see the story like a movie playing in their mind.",
      visual: {
        type: "compare",
        left: { title: "Telling", points: ["Ruth was scared.", "It was cold.", "She went to the barn.", "The calf was sad."] },
        right: { title: "Showing", points: ["Ruth's heart pounded.", "Icy rain stung her cheeks.", "She splashed across the muddy yard.", "The calf bawled and struggled."] },
      },
      probe: {
        type: "highlight",
        prompt: "Tap the TWO sentences that SHOW instead of tell.",
        sentences: ["Ruth was very tired.", "Ruth's eyelids drooped, and she yawned as she climbed the stairs.", "The storm was loud.", "Thunder boomed and rattled the windows."],
        correct: [1, 3],
        hint: "Showing sentences give details you can see or hear, instead of just naming a feeling.",
        seconds: 30,
      },
      think: {
        q: "Which sentence best SHOWS that a character is happy?",
        choices: ["Tom was happy.", "Tom grinned and skipped down the path, humming.", "Tom felt a feeling."],
        answer: 1,
        why: "Grinning, skipping and humming show happiness without naming it.",
        hints: ["That tells the feeling instead of showing it.", "", "That doesn't tell or show which feeling it is."],
      },
      approaches: {
        analogy: "Telling is like saying 'the cake is good.' Showing is like handing your reader a slice so they can taste it themselves.",
        example: "Telling: 'The old house was creepy.' Showing: 'Cobwebs hung from the ceiling, and the floorboards groaned under every step.' The reader decides it's creepy from the details.",
        simpler: {
          q: "Which is a sensory detail?",
          choices: ["the smell of fresh bread", "she was nice", "it was good"],
          answer: 0,
          why: "Smell is one of the five senses.",
          hints: ["", "'Nice' is a judgment, not something you see, hear, smell, taste or touch.", "'Good' tells, but doesn't use a sense."],
        },
      },
    },
    {
      title: "Revise and Edit",
      teach:
        "Writing is a process: plan, draft, revise, edit and publish. Your first draft is just the beginning. When you revise, you make the writing stronger. Remember ARMS: Add details, Remove parts that don't fit, Move sentences to a better order, and Substitute strong words for weak ones. When you edit, you fix mistakes. Remember CUPS: Capitals, Usage (like their and there), Punctuation and Spelling. Ask a reader for help: one thing they liked and one question. Think about your task, purpose and audience. A bedtime story for your little sister needs simple words; a report for a museum needs formal ones. Write often, a little every day, and your writing will grow.",
      visual: {
        type: "compare",
        left: { title: "Revise (ARMS)", points: ["Add details", "Remove what doesn't fit", "Move sentences", "Substitute stronger words"] },
        right: { title: "Edit (CUPS)", points: ["Capitals", "Usage", "Punctuation", "Spelling"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each change: is it revising (making it stronger) or editing (fixing mistakes)?",
        buckets: ["Revising", "Editing"],
        items: [
          { text: "Adding a sentence about the smell of the barn", bucket: 0 },
          { text: "Changing 'went' to 'trudged'", bucket: 0 },
          { text: "Removing a sentence that doesn't fit the story", bucket: 0 },
          { text: "Capitalizing the name 'ruth'", bucket: 1 },
          { text: "Fixing 'there' to 'their'", bucket: 1 },
          { text: "Adding a period at the end of a sentence", bucket: 1 },
        ],
        hint: "Revising changes the ideas and words to make it better. Editing fixes capitals, usage, punctuation and spelling.",
        seconds: 45,
      },
      think: {
        q: "You change 'The dog ran' to 'The muddy dog bolted across the yard.' Is that revising or editing?",
        choices: ["Editing, because you fixed spelling", "Neither", "Revising, because you added details and a stronger word"],
        answer: 2,
        why: "Adding details and substituting a stronger word is revising.",
        hints: ["Nothing was misspelled. You made it stronger.", "Something did change: there are new details.", ""],
      },
      approaches: {
        analogy: "Revising is like rearranging and decorating a room. Editing is like dusting and straightening the pictures. Both make it ready for guests.",
        example: "Draft: 'we went to the lake it was fun.' Revise: 'We hiked to the lake and skipped stones until sunset.' Edit: capital W, period at the end, and the run-on is gone.",
        simpler: {
          q: "In CUPS, what does the C stand for?",
          choices: ["Capitals", "Colors", "Characters"],
          answer: 0,
          why: "C is for capitals.",
          hints: ["", "Colors aren't part of editing.", "Characters are part of a story, not editing."],
        },
      },
    },
    {
      title: "Presenting Out Loud",
      teach:
        "Stories and reports are made to be shared. When you present, stand tall and look at your listeners. Speak clearly, loudly enough to be heard, and at a steady pace, not too fast. Tell events in order, and include the details that matter. Practice at home first, maybe in front of a mirror or your family. Visuals and sound can help: a picture of a calf, a map of the farm, or a short recording of thunder can make your main ideas clearer. But add them only when they help, not just for decoration. Finally, use formal English: 'Good afternoon. My story is called The Storm.' At the end, thank your audience and invite questions.",
      visual: {
        type: "flip",
        cards: [
          { front: "Eyes", back: "Look at your listeners, not just your paper." },
          { front: "Voice", back: "Clear, loud enough, at a steady pace." },
          { front: "Order", back: "Tell events or facts in a logical order." },
          { front: "Visuals and audio", back: "Add a picture, map or sound only if it helps your main idea." },
          { front: "Formal English", back: "'Good afternoon. My report is about...'" },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each habit: does it help a presentation or hurt it?",
        buckets: ["Helps", "Hurts"],
        items: [
          { text: "Looking at your audience", bucket: 0 },
          { text: "Speaking clearly at a steady pace", bucket: 0 },
          { text: "Showing a map that explains where the story happens", bucket: 0 },
          { text: "Mumbling into your paper", bucket: 1 },
          { text: "Racing through as fast as you can", bucket: 1 },
          { text: "Adding a loud song that has nothing to do with the topic", bucket: 1 },
        ],
        hint: "Ask: does it help listeners hear, follow and understand?",
        seconds: 40,
      },
      think: {
        q: "Which is the best way to begin a presentation?",
        choices: ["'Um, so, yeah, here's my thing.'", "'Good morning. My report is about honeybees.'", "Start reading with your back to the audience"],
        answer: 1,
        why: "A clear, formal opening tells the audience what to expect.",
        hints: ["That's too informal and unclear for a presentation.", "", "Your audience needs to see and hear you."],
      },
      approaches: {
        analogy: "Presenting is like being a tour guide. You face your group, speak clearly, go in order, and point to the things that help them understand.",
        example: "'Good afternoon. My story is called The Storm.' (Pause, look up.) 'On a stormy night, Ruth heard a cry from the barn...' (Show a picture of the barn.) 'Thank you for listening. Do you have any questions?'",
        simpler: {
          q: "Where should you look while presenting?",
          choices: ["At your shoes", "At the ceiling", "At your listeners"],
          answer: 2,
          why: "Looking at listeners helps them pay attention and connect with you.",
          hints: ["Your shoes won't help the audience follow along.", "The ceiling isn't your audience.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sequence",
    prompt: "Put the steps of the writing process in order.",
    steps: ["Plan your ideas", "Write a first draft", "Revise to make it stronger", "Edit to fix mistakes", "Publish and present it"],
  },
  explain: {
    prompt: "Explain how to write a good story, from planning to presenting. Include what 'show, don't tell' means.",
    keyPoints: [
      "Plan a situation, characters, a problem and an ending",
      "Tell events in order with transition words",
      "Show, don't tell, with dialogue and sensory details",
      "Revise to make it stronger and edit to fix mistakes",
      "Present clearly, looking at the audience",
    ],
  },
  mastery: [
    {
      type: "cloze",
      text: "Remember ARMS for revising: Add, Remove, {0}, Substitute. Remember CUPS for editing: Capitals, Usage, {1}, Spelling.",
      blanks: [{ answers: ["Move"] }, { answers: ["Punctuation"] }],
      bank: ["Move", "Punctuation", "Paint", "Music"],
      hint: "ARMS: you can move sentences around. CUPS: periods and commas are punctuation.",
      seconds: 30,
    },
    {
      type: "highlight",
      prompt: "Tap the sentence that uses sensory details to show the setting.",
      sentences: ["It was a nice day.", "Warm bread scented the kitchen, and rain tapped on the window.", "The kitchen was a room."],
      correct: [1],
      hint: "Look for smells, sounds, sights, tastes or textures.",
      seconds: 25,
    },
    {
      type: "sort",
      prompt: "Sort each audience: formal or informal language?",
      buckets: ["Formal", "Informal"],
      items: [
        { text: "Presenting a report to a museum guide", bucket: 0 },
        { text: "Reading your story at a library event", bucket: 0 },
        { text: "Telling a joke to your cousin", bucket: 1 },
        { text: "A note to your best friend", bucket: 1 },
      ],
      hint: "Formal for presentations and adults you don't know well; informal for friends and family fun.",
      seconds: 30,
    },
    {
      type: "build",
      prompt: "Build a strong opening line for a story presentation.",
      tiles: ["Good afternoon.", "My story", "is called", "The Storm."],
      distractors: ["Um, so,", "whatever"],
      hint: "Start with a polite, formal greeting, then name your story.",
      seconds: 25,
    },
  ],
  check: [
    {
      q: "What does 'show, don't tell' mean?",
      choices: ["Use details so the reader can see and feel it", "Draw pictures instead of writing", "Never use dialogue"],
      answer: 0,
      why: "Showing uses actions, senses and dialogue instead of just naming feelings.",
    },
    {
      q: "Fixing a misspelled word is part of...",
      choices: ["Planning", "Revising", "Editing"],
      answer: 2,
      why: "Editing fixes capitals, usage, punctuation and spelling.",
    },
    {
      q: "Which helps a story move through time?",
      choices: ["Transition words like 'later that night'", "Using only one long sentence", "Leaving out the ending"],
      answer: 0,
      why: "Transitions carry the reader from one event to the next.",
    },
    {
      q: "When should you add a picture or sound to a presentation?",
      choices: ["Always, as many as possible", "Never", "When it helps explain your main ideas"],
      answer: 2,
      why: "Visuals and audio should support your main ideas, not distract from them.",
    },
  ],
  task: {
    kind: "write",
    prompt:
      "Write a story of about one page, real or imagined, with a clear situation, a character with a problem, events in order with transition words, dialogue, sensory details, and an ending that solves the problem. Revise it with ARMS and edit it with CUPS. Then present it to your family: stand tall, look at them, speak clearly, and show one picture or map that helps them understand.",
    rubric: [
      "Introduces a situation and characters, with a clear problem",
      "Events are in order with transition words",
      "Uses dialogue and sensory details to show, not tell",
      "Has an ending that solves the problem",
      "Shows signs of revising and editing (strong words, correct capitals and punctuation)",
      "Presented clearly with eye contact and a helpful visual",
    ],
  },
};

export const ela4 = k5Course("ela", 4, [words, closeReading, mythsPoems, talesPov, nonfiction, evidence, grammar, opinionResearch, storytelling]);

