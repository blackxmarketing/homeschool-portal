import { k5Course } from "./base";

/**
 * ela-5: Reading & Writing for grade 5 (Common Core). Nine lessons, in the
 * order a teacher would take them through the year: word study, reading
 * stories and poems, figurative language, story structure, nonfiction, using
 * several sources, grammar, writing, and research and presenting.
 * Literature is classic and public domain (Aesop, Stevenson, Carroll,
 * Longfellow, Dickinson, Defoe); nonfiction is true stories from history and
 * science. See types.ts for the lesson format.
 */
export const ela5 = k5Course("ela", 5, [
  // 1. Word study: syllables, Greek and Latin roots, context clues, fluency
  {
    id: "ela-5.word-detective",
    title: "Word Detective: Roots, Clues and Fluent Reading",
    minutes: 30,
    stage: "grammar",
    standards: ["RF.5.3", "RF.5.4", "L.5.4", "L.5.6"],
    read: [
      "Long words can look scary, but most of them are built from smaller pieces, like a wall built from bricks. When you meet a word such as transportation, break it into chunks: trans, port, a, tion. Read each chunk, then put them back together.",
      "Many English word parts come from two old languages, Greek and Latin. A root carries the main meaning. The Latin root port means carry, so a porter carries bags and a portable radio can be carried. The Greek root graph means write, and tele means far, so a telegraph sends writing far away. A prefix comes at the start of a word and changes its meaning: re means again, un means not, and pre means before. A suffix comes at the end: able means can be, and ology means the study of.",
      "Sometimes the sentence around a word gives you clues. In the sentence \"The desert was arid; not a drop of rain had fallen for months,\" the second half tells you that arid means very dry. Clues can be a definition, an example, a comparison or a cause and effect.",
      "When the clues are not enough, use a reference book. A dictionary gives a word's meaning and how to say it. A glossary is a small dictionary in the back of a book. A thesaurus lists words with similar meanings.",
      "Good readers also read fluently. That means reading the words correctly, at a steady pace, with expression that matches the meaning. If something you read does not make sense, stop, go back and reread. Fluent reading is not about racing. It is about understanding.",
    ].join("\n\n"),
    keyIdeas: [
      "Break long words into syllables and word parts: prefix, root and suffix.",
      "Greek and Latin roots, like port (carry) and graph (write), unlock hundreds of English words.",
      "Use context clues first, then a dictionary, glossary or thesaurus.",
      "Fluent readers read accurately, at a steady pace, with expression, and reread when something doesn't make sense.",
    ],
    hook: {
      text: "Here is a word: antidisestablishmentarianism. Twenty-eight letters! It looks like a monster. But a good word detective is not afraid. Every long word is just a train of small cars hooked together. Today you will learn to uncouple the cars and read each one.",
    },
    teach: [
      {
        title: "Chunking Long Words",
        teach:
          "When you meet a long word, don't try to swallow it whole. Break it into chunks. First look for a prefix at the front, like un, re or inter. Then look for a suffix at the end, like able, tion or ment. What is left in the middle is usually the root. Take the word unbreakable: un, break, able. Not able to be broken! If there is no prefix or suffix, split the word into syllables. Every syllable has one vowel sound. The word imagination has five: i, mag, i, na, tion. Read each chunk slowly, then blend them together quickly.",
        visual: {
          type: "flip",
          cards: [
            { front: "Prefix", back: "A word part at the start that changes the meaning. re = again, un = not, pre = before, inter = between." },
            { front: "Root", back: "The main part of a word that carries its meaning. port = carry, spect = look." },
            { front: "Suffix", back: "A word part at the end. able = can be, less = without, ology = the study of." },
            { front: "Syllable", back: "A chunk of a word with one vowel sound. pen-cil has two; im-ag-i-na-tion has five." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the word international chunk by chunk, in order.",
          tiles: ["in", "ter", "na", "tion", "al"],
          distractors: ["ment", "un"],
          hint: "Say the word slowly: in-ter-na-tion-al. Start with the prefix inter, which is two syllables.",
          seconds: 30,
        },
        think: {
          q: "How would you split the word unbreakable into its word parts?",
          choices: ["unb + reak + able", "un + break + able", "unbreak + able", "u + nbreak + able"],
          answer: 1,
          why: "un is a prefix (not), break is the root, and able is a suffix (can be).",
          hints: [
            "unb is not a word part. Look for the prefix un, which means not.",
            "",
            "You found the suffix able, but unbreak still holds a prefix. Split off un too.",
            "u by itself is not a prefix. The prefix here is un.",
          ],
        },
        approaches: {
          analogy:
            "A long word is like a train. Each car is hooked to the next. You can't lift the whole train at once, but you can look at one car at a time, then watch them roll along together.",
          example:
            "Take the word disagreement. Front: dis (not). End: ment (the state of). Middle: agree. So disagreement is the state of not agreeing. Read it: dis, a, gree, ment.",
          simpler: {
            q: "Which part of the word replay is the prefix?",
            choices: ["re", "play", "lay"],
            answer: 0,
            why: "re comes at the front and means again. replay means play again.",
            hints: ["", "play is the root, the main word. The prefix is the part added in front.", "lay is inside the root play. Look at the very start of the word."],
          },
        },
      },
      {
        title: "Greek and Latin Roots",
        teach:
          "Long ago, the ancient Greeks and Romans spoke languages that gave English thousands of words. The Romans spoke Latin. Learn one root and you can unlock a whole family of words. The Latin root spect means look, so you inspect something by looking closely, and spectators look at a game. The Latin root aud means hear: audio, audience, audible. From Greek, bio means life and ology means the study of, so biology is the study of life. Geo means earth, so geology is the study of the earth. Tele means far and phone means sound, so a telephone carries sound far away.",
        visual: {
          type: "hotspots",
          title: "Root families",
          center: "Roots",
          spots: [
            { label: "port (Latin)", icon: "📦", detail: "carry: portable, transport, export, porter" },
            { label: "spect (Latin)", icon: "👀", detail: "look: inspect, spectator, spectacles, respect" },
            { label: "aud (Latin)", icon: "👂", detail: "hear: audio, audience, audible, auditorium" },
            { label: "graph (Greek)", icon: "✍️", detail: "write: autograph, paragraph, photograph, telegraph" },
            { label: "bio (Greek)", icon: "🌱", detail: "life: biology, biography, biome" },
            { label: "geo (Greek)", icon: "🌍", detail: "earth: geology, geography, geode" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each root to its meaning.",
          pairs: [
            { left: "port", right: "carry" },
            { left: "spect", right: "look" },
            { left: "aud", right: "hear" },
            { left: "graph", right: "write" },
            { left: "bio", right: "life" },
            { left: "geo", right: "earth" },
          ],
          hint: "Think of a word you know with each root: portable, inspect, audio, autograph, biology, geography.",
          seconds: 45,
        },
        think: {
          q: "The root aud means hear. What is an auditorium?",
          choices: ["A place to store cars", "A room where an audience listens", "A book about plants", "A kind of telescope"],
          answer: 1,
          why: "An auditorium is a room where people gather to hear a speech, a concert or a play.",
          hints: [
            "Cars have nothing to do with hearing. Use the root aud.",
            "",
            "A book about plants would use bio or botan. aud is about hearing.",
            "A telescope helps you see far. aud is about hearing, not seeing.",
          ],
        },
        approaches: {
          analogy:
            "A root is like a family's last name. Inspect, spectator and respect all belong to the spect family, and they share the family trait: looking.",
          example:
            "Meet the word geography. geo = earth, graph = write. Geography is writing about the earth: its lands, seas and places. That's exactly what maps and geography books do.",
          simpler: {
            q: "The root port means carry. What does portable mean?",
            choices: ["Easy to carry", "Very loud", "Made of paper"],
            answer: 0,
            why: "port means carry and able means can be, so portable means can be carried.",
            hints: ["", "Loud would come from a root about sound, like aud or phon.", "Nothing in port or able points to paper."],
          },
        },
      },
      {
        title: "Context Clues and Reference Books",
        teach:
          "Sometimes the words around a hard word explain it. These are context clues. A definition clue tells you the meaning right away: The botanist, a scientist who studies plants, knelt by the flower. An example clue gives examples: Reptiles, such as snakes, turtles and lizards, have scaly skin. A contrast clue shows the opposite: Unlike his timid sister, Sam was bold. So timid must mean shy, the opposite of bold. A cause and effect clue works too: The path was treacherous, so we moved slowly. When clues aren't enough, check a dictionary for meaning and pronunciation, a glossary at the back of your book, or a thesaurus for similar words.",
        visual: {
          type: "compare",
          left: { title: "Dictionary", points: ["Gives a word's meaning", "Shows how to say it", "Tells the part of speech", "Words in ABC order"] },
          right: { title: "Thesaurus", points: ["Lists synonyms (similar words)", "Often lists antonyms (opposites)", "Helps you pick a better word", "Words in ABC order"] },
        },
        probe: {
          type: "cloze",
          text: "Unlike his timid sister, Sam was bold. Timid must mean {0}. The path was treacherous, so we moved slowly; treacherous must mean {1}. To find how to say a word, use a {2}. To find a word with a similar meaning, use a {3}.",
          blanks: [{ answers: ["shy"] }, { answers: ["dangerous"] }, { answers: ["dictionary"] }, { answers: ["thesaurus"] }],
          bank: ["shy", "dangerous", "dictionary", "thesaurus", "brave", "smooth", "map"],
          hint: "Unlike signals the opposite of bold. So we moved slowly is the effect of a risky path.",
          mistakes: [
            { match: "brave", coach: "Unlike tells you timid is the opposite of bold, so it can't mean brave." },
            { match: "smooth", coach: "If the path were smooth, they wouldn't need to slow down. The word so shows a cause and effect." },
            { match: "map", coach: "A map shows places. A dictionary shows meanings and how to say words." },
          ],
          seconds: 50,
        },
        think: {
          q: "\"Reptiles, such as snakes, turtles and lizards, have scaly skin.\" What kind of context clue is this?",
          choices: ["A contrast clue", "A cause and effect clue", "An example clue", "No clue at all"],
          answer: 2,
          why: "The words such as introduce examples of reptiles: snakes, turtles and lizards.",
          hints: [
            "A contrast clue shows an opposite, with words like unlike or but. Look for such as.",
            "Cause and effect uses words like so or because. This sentence lists things instead.",
            "",
            "There is a clue here: such as introduces a list of reptiles.",
          ],
        },
        approaches: {
          analogy:
            "Context clues are like footprints in the snow. You didn't see the fox walk by, but its tracks tell you where it went. The words around a hard word leave tracks to its meaning.",
          example:
            "\"After the long hike, Ana was famished and ate three sandwiches.\" Three sandwiches after a long hike is a big clue. Famished must mean very hungry.",
          simpler: {
            q: "\"The baby was drowsy and soon fell asleep.\" What does drowsy mean?",
            choices: ["Hungry", "Sleepy", "Noisy"],
            answer: 1,
            why: "The baby soon fell asleep, so drowsy means sleepy.",
            hints: ["Nothing in the sentence is about food. Look at what the baby did next.", "", "A noisy baby wouldn't fall asleep soon. Look at the clue fell asleep."],
          },
        },
      },
      {
        title: "Reading Fluently",
        teach:
          "Fluent reading sounds like talking. It has three parts. Accuracy means reading each word correctly. Rate means a steady pace, not too fast and not too slow. Expression means your voice matches the meaning: excited for exciting parts, quiet for sad parts, and a little rise at a question mark. Punctuation is your map. Pause at a comma, stop at a period. Most important, fluent readers check that it makes sense. If you read The horse galloped across the feld, you should notice that feld is not a word, go back, and fix it: field. Rereading is not a mistake. It is what strong readers do.",
        visual: {
          type: "hotspots",
          title: "Three parts of fluency",
          center: "Fluency",
          spots: [
            { label: "Accuracy", icon: "🎯", detail: "Read each word correctly. Chunk long words and use what you know about sounds." },
            { label: "Rate", icon: "🚶", detail: "A steady pace, like talking. Racing is not fluency." },
            { label: "Expression", icon: "🎭", detail: "Your voice matches the meaning. Pause at commas, stop at periods, rise at questions." },
            { label: "Self-check", icon: "🔁", detail: "If it doesn't make sense, go back and reread." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each reading habit: does it help fluency or hurt it?",
          buckets: ["Helps fluency", "Hurts fluency"],
          items: [
            { text: "Pausing at commas and stopping at periods", bucket: 0 },
            { text: "Rereading a sentence that didn't make sense", bucket: 0 },
            { text: "Making your voice match an exciting part", bucket: 0 },
            { text: "Chunking a long word into syllables", bucket: 0 },
            { text: "Racing to finish first, even if you skip words", bucket: 1 },
            { text: "Reading every word in the same flat voice", bucket: 1 },
            { text: "Ignoring a word that didn't make sense", bucket: 1 },
          ],
          hint: "Fluency means accurate, steady and expressive reading that makes sense. Speed alone is not the goal.",
          seconds: 40,
        },
        think: {
          q: "You read: \"The ship sailed into the harbor at dusk.\" You said \"horror\" instead of \"harbor.\" What should you do?",
          choices: ["Keep going so you don't lose speed", "Skip the whole page", "Go back and reread, because horror doesn't make sense", "Read the rest more quickly"],
          answer: 2,
          why: "Fluent readers notice when something doesn't make sense and reread to fix it.",
          hints: [
            "Speed doesn't help if the words are wrong. A ship sails into a harbor, not a horror.",
            "Skipping a page would lose even more of the story. Fix just the word.",
            "",
            "Reading faster makes mistakes more likely. Slow down and fix it.",
          ],
        },
        approaches: {
          analogy:
            "Reading aloud is like riding a bike on a trail. You go at a steady speed, slow down for the bumps (commas) and stop at the signs (periods). If you take a wrong turn, you circle back.",
          example:
            "Try it: \"Wait! Did you hear that?\" whispered Tom. Wait gets an urgent voice, the question rises at the end, and whispered tells you to say it softly. That's expression.",
          simpler: {
            q: "What should your voice do at a period?",
            choices: ["Keep going without a break", "Stop briefly", "Shout"],
            answer: 1,
            why: "A period ends a sentence, so your voice stops briefly before the next one.",
            hints: ["Running past periods mashes sentences together. Give each one an ending.", "", "A period is a calm ending, not a reason to shout."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each word into its root family.",
      buckets: ["port (carry)", "spect (look)", "graph (write)"],
      items: [
        { text: "transport", bucket: 0 },
        { text: "export", bucket: 0 },
        { text: "portable", bucket: 0 },
        { text: "inspect", bucket: 1 },
        { text: "spectator", bucket: 1 },
        { text: "spectacles", bucket: 1 },
        { text: "autograph", bucket: 2 },
        { text: "paragraph", bucket: 2 },
        { text: "photograph", bucket: 2 },
      ],
    },
    explain: {
      prompt: "You meet a long word you've never seen. Explain the steps you would take to read it and figure out what it means.",
      keyPoints: [
        "Break the word into chunks or syllables",
        "Look for a prefix, root and suffix",
        "Use what Greek or Latin roots mean",
        "Use context clues from the sentence",
        "Check a dictionary or glossary if needed",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each word part to its meaning.",
        pairs: [
          { left: "re-", right: "again" },
          { left: "pre-", right: "before" },
          { left: "-less", right: "without" },
          { left: "-ology", right: "the study of" },
          { left: "tele", right: "far" },
        ],
        hint: "Think of words: redo, preview, fearless, biology, telephone.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "How many syllables are in the word transportation?",
        answer: 4,
        hint: "Clap it out: trans-por-ta-tion. Each clap has one vowel sound.",
        mistakes: [{ match: "3", coach: "Clap it slowly: trans, por, ta, tion. That's one more than three." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "The word inspector has the root {0}, which means look. The word biography has the root {1}, which means life, and the root {2}, which means write.",
        blanks: [{ answers: ["spect"] }, { answers: ["bio"] }, { answers: ["graph"] }],
        bank: ["spect", "bio", "graph", "port", "aud", "geo"],
        hint: "Find the part of each word that carries the meaning: in-SPECT-or, BIO-GRAPH-y.",
        mistakes: [{ match: "port", coach: "port means carry. Look inside inspector for the part that means look." }],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build the word unpredictable from its parts, in order.",
        tiles: ["un", "pre", "dict", "able"],
        distractors: ["re", "less"],
        hint: "un (not) + pre (before) + dict (say) + able (can be): not able to be said before.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "The Latin root dict means say. What does predict mean?",
        choices: ["To say what will happen before it happens", "To write a long letter", "To carry something far away"],
        answer: 0,
        why: "pre means before and dict means say: to say something before it happens.",
      },
      {
        q: "Where would you find a short list of word meanings at the back of your science book?",
        choices: ["The title page", "The glossary", "The table of contents", "The cover"],
        answer: 1,
        why: "A glossary is a small dictionary in the back of a book, with the meanings of key words.",
      },
      {
        q: "\"The soup was scalding, so Leo waited for it to cool.\" What does scalding mean?",
        choices: ["Very cold", "Very salty", "Very hot"],
        answer: 2,
        why: "Leo waited for it to cool, so it must have been very hot.",
      },
      {
        q: "Which of these is NOT part of fluent reading?",
        choices: ["Reading words accurately", "Reading as fast as you possibly can", "Reading with expression", "Rereading when something doesn't make sense"],
        answer: 1,
        why: "Fluency is a steady pace with understanding. Racing is not the goal.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Go on a root hunt. Pick a book, a newspaper or a cereal box and find 8 words that contain a Greek or Latin root (port, spect, aud, graph, bio, geo, tele, dict, struct, rupt and so on). For each word, write the root, what the root means, and what the whole word means. Check two of them in a dictionary. Then read a favorite page aloud to a parent with good expression.",
      rubric: [
        "Finds 8 real words with Greek or Latin roots",
        "Names each root and its meaning correctly",
        "Explains what each whole word means",
        "Checks at least two words in a dictionary",
        "Reads a page aloud accurately, at a steady pace, with expression",
      ],
    },
  },
  // 2. Reading stories and poems: quoting, inferring, theme, summary, comparing characters
  {
    id: "ela-5.story-sense",
    title: "Quote It, Infer It: Theme, Summary and Characters",
    minutes: 30,
    stage: "logic",
    standards: ["RL.5.1", "RL.5.2", "RL.5.3", "RL.5.10", "W.5.9"],
    read: [
      "Good readers do more than remember what happened. They figure out what the author shows but does not say. That is called making an inference. And they prove it by quoting the text: copying the author's exact words inside quotation marks.",
      "In Lewis Carroll's Alice's Adventures in Wonderland, written in 1865, Alice finds a little bottle with a label that says DRINK ME. Carroll never writes that Alice is careful. Instead, he shows it. Alice says, \"No, I'll look first,\" and checks whether the bottle is marked poison. From that quotation we can infer that Alice is curious but also sensible.",
      "Stories often have a theme, a big lesson about life. To find it, watch how characters respond to a challenge. In Aesop's fable The Crow and the Pitcher, a thirsty crow finds a pitcher with only a little water at the bottom, too low for his beak. He cannot tip it over. So he drops in pebbles, one at a time, until the water rises high enough to drink. The crow does not give up; he thinks and works patiently. The theme: little by little, patient effort solves hard problems.",
      "Poems have themes too. In \"The Land of Counterpane,\" Robert Louis Stevenson's speaker remembers being sick in bed. He sets up toy soldiers, ships and cities among the sheets, and he imagines he is \"the giant great and still\" looking over a whole land. The speaker reflects that imagination can turn a dull sick day into an adventure.",
      "A summary tells the most important events in order, in your own words, without your opinions. Comparing characters helps too. Alice and the crow both face a problem. Alice meets hers with careful curiosity; the crow meets his with patient work.",
    ].join("\n\n"),
    keyIdeas: [
      "An inference is a smart guess based on clues in the text; prove it with an exact quotation.",
      "The theme is a story's big lesson; look at how characters respond to challenges.",
      "A poem's speaker can reflect on a topic, and that reflection points to the theme.",
      "A summary gives the key events in order, in your own words, without opinions.",
    ],
    hook: {
      text: "Imagine you are dying of thirst. You find a jar with water, but the water is too low to reach. You can't tip the jar over. What would you do? A crow in an old fable faced this exact problem. How he solved it can teach us something about our own hard days.",
    },
    teach: [
      {
        title: "Quoting to Prove an Inference",
        teach:
          "Authors don't tell you everything. They leave clues, and you put them together. That is an inference. In Alice's Adventures in Wonderland, Alice finds a bottle labeled DRINK ME. Lewis Carroll never writes \"Alice is careful.\" Instead Alice says, \"No, I'll look first,\" and checks whether it is marked poison. So we can infer she is sensible, even while curious. When you explain an inference, quote accurately. Copy the author's exact words, put them in quotation marks, and say how they prove your point. A strong answer sounds like this: Alice is careful, because she says, \"No, I'll look first.\"",
        visual: {
          type: "hotspots",
          title: "How to back up an inference",
          center: "Inference",
          spots: [
            { label: "Clue", icon: "🔍", detail: "Find what the author shows: an action, words, a feeling." },
            { label: "What I know", icon: "🧠", detail: "Add what you already know about people and the world." },
            { label: "Inference", icon: "💡", detail: "Put them together: what the author means but doesn't say." },
            { label: "Quote", icon: "❝", detail: "Copy the author's exact words in quotation marks to prove it." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Inference: Alice is curious but careful. Tap the TWO sentences from the passage that prove she is careful.",
          sentences: [
            "Alice found a little bottle on the table.",
            "Its label said DRINK ME in large letters.",
            "\"No, I'll look first,\" she said.",
            "She checked to see whether it was marked poison.",
            "The hall was long and low.",
          ],
          correct: [2, 3],
          hint: "Careful means stopping to check before acting. Which sentences show Alice stopping to check?",
          seconds: 40,
        },
        think: {
          q: "Which is the BEST way to support the inference \"Alice is careful\"?",
          choices: [
            "Alice is careful because she is the main character.",
            "Alice is careful. She says, \"No, I'll look first.\"",
            "Alice is careful because I think so.",
            "Alice is careful because the story is old.",
          ],
          answer: 1,
          why: "It quotes Alice's exact words, which show her stopping to check.",
          hints: [
            "Being the main character doesn't prove she's careful. Find her words or actions.",
            "",
            "Your opinion alone isn't proof. Quote the text.",
            "The age of the story tells nothing about Alice. Quote what she says or does.",
          ],
        },
        approaches: {
          analogy:
            "An inference is like being a detective. You don't see the thief, but you see muddy footprints and an open window. In court, you show the footprints as evidence. In reading, the quotation is your evidence.",
          example:
            "Text: \"Max slammed the door and threw his backpack on the floor.\" Inference: Max is angry. Proof: The text says he \"slammed the door and threw his backpack.\" People do that when they're upset.",
          simpler: {
            q: "\"Mia's hands shook as she stepped onto the stage.\" How does Mia feel?",
            choices: ["Nervous", "Sleepy", "Hungry"],
            answer: 0,
            why: "Shaking hands before going on stage show she is nervous.",
            hints: ["", "Sleepy people yawn. The clue is her shaking hands on a stage.", "Nothing here is about food. Look at her hands and where she is."],
          },
        },
      },
      {
        title: "Theme and Summary",
        teach:
          "The theme is a story's big lesson about life. It is not the topic, like crows or water. It is a message, like never give up. To find it, ask: What challenge does the character face, and how does he respond? In Aesop's The Crow and the Pitcher, a thirsty crow finds water too low to reach. He tries to tip the pitcher, but it is too heavy. So he drops in pebbles, one by one, until the water rises. His response, patient thinking and steady work, shows the theme: little by little, effort solves hard problems. A summary is shorter. It tells the main events in order, in your own words, with no opinions.",
        visual: {
          type: "compare",
          left: { title: "Summary", points: ["What happens", "Main events in order", "Your own words", "No opinions"] },
          right: { title: "Theme", points: ["What it means", "A lesson about life", "Usually a full sentence", "Learned from how characters respond"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the summary of The Crow and the Pitcher in order.",
          steps: [
            "A thirsty crow finds a pitcher with a little water at the bottom.",
            "His beak cannot reach the water.",
            "He tries to tip the pitcher over, but it is too heavy.",
            "He drops pebbles in, one at a time.",
            "The water rises, and the crow drinks.",
          ],
          hint: "Start with the problem, then what he tried first, then what finally worked.",
          seconds: 40,
        },
        think: {
          q: "Which is the best statement of the theme of The Crow and the Pitcher?",
          choices: ["Crows are black birds.", "Patient, clever effort can solve a hard problem.", "Pitchers hold water.", "The crow was thirsty."],
          answer: 1,
          why: "A theme is a lesson about life. The crow's patient work shows that effort solves problems.",
          hints: [
            "That's a fact about crows, not a lesson about life.",
            "",
            "That's a fact about pitchers. A theme is a message for people.",
            "That's an event from the story. Ask what lesson his response teaches.",
          ],
        },
        approaches: {
          analogy:
            "A summary is like the trailer for a movie: the key scenes, short and in order. A theme is like what you'd tell a friend the movie taught you.",
          example:
            "The Tortoise and the Hare. Summary: A fast hare races a slow tortoise, takes a nap mid-race, and the tortoise plods past to win. Theme: Steady effort beats speed without effort.",
          simpler: {
            q: "Which sentence belongs in a summary?",
            choices: ["I loved this story!", "The crow drops pebbles into the pitcher.", "The best part was funny."],
            answer: 1,
            why: "A summary tells events, not opinions.",
            hints: ["That's an opinion. Summaries leave opinions out.", "", "That's an opinion about the story, not an event."],
          },
        },
      },
      {
        title: "A Poem's Speaker Reflects",
        teach:
          "In a poem, the voice talking to us is called the speaker. When a speaker reflects, he thinks back on something and finds meaning in it. In Robert Louis Stevenson's \"The Land of Counterpane,\" from A Child's Garden of Verses (1885), the speaker remembers: \"When I was sick and lay a-bed, / I had two pillows at my head.\" A counterpane is a bedspread. He marches his toy soldiers among the bedclothes and sails ships among the sheets. At the end he says, \"I was the giant great and still / That sits upon the pillow-hill.\" Looking back, the speaker shows that imagination turned a boring sick day into a whole kingdom. That is the poem's theme.",
        visual: {
          type: "flip",
          cards: [
            { front: "Speaker", back: "The voice talking in a poem. Not always the poet." },
            { front: "Reflect", back: "To think back on something and find what it meant." },
            { front: "Counterpane", back: "An old word for a bedspread, the top cover on a bed." },
            { front: "Stanza", back: "A group of lines in a poem, like a paragraph in a story." },
          ],
        },
        probe: {
          type: "cloze",
          text: "In \"The Land of Counterpane,\" the speaker is {0} in bed. He plays with toy {1} and ships among the sheets. He imagines he is a {2} on the pillow-hill. The theme is that {3} can turn a dull day into an adventure.",
          blanks: [{ answers: ["sick", "ill"] }, { answers: ["soldiers"] }, { answers: ["giant"] }, { answers: ["imagination"] }],
          bank: ["sick", "soldiers", "giant", "imagination", "sleeping", "horses", "money"],
          hint: "Look at the first line: \"When I was sick and lay a-bed.\" Then the last stanza: \"I was the giant great and still.\"",
          mistakes: [
            { match: "sleeping", coach: "He's awake and playing. The first line says why he's in bed: he was sick." },
            { match: "money", coach: "The speaker has toys, not riches. What lets him turn a bed into a land?" },
          ],
          seconds: 45,
        },
        think: {
          q: "In \"The Land of Counterpane,\" how does the speaker feel, looking back on his sick day?",
          choices: ["Angry that he missed school", "Bored the whole time", "Afraid of the giant", "Fond of how his imagination made it fun"],
          answer: 3,
          why: "He calls it \"the pleasant land of counterpane\" and remembers his games happily.",
          hints: [
            "The poem never mentions school. Notice the word pleasant at the end.",
            "He kept busy with soldiers, ships and cities. That's the opposite of bored.",
            "The speaker IS the giant, in his imagination. There's nothing scary.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Reflecting is like looking at an old photo. You remember what happened, and you also notice what it meant to you. A poem's speaker does that in words.",
          example:
            "Stevenson's poem \"My Shadow\" begins: \"I have a little shadow that goes in and out with me.\" The speaker reflects on his shadow with puzzled amusement, wondering what use it could be.",
          simpler: {
            q: "Who is the speaker of a poem?",
            choices: ["The voice talking in the poem", "The person who printed the book", "The reader"],
            answer: 0,
            why: "The speaker is the voice that tells the poem.",
            hints: ["", "The printer didn't write the words. The speaker is the voice in the poem.", "You read the poem, but the speaker is the voice inside it."],
          },
        },
      },
      {
        title: "Comparing Characters",
        teach:
          "Comparing two characters helps you understand both. Compare means finding how they are alike. Contrast means finding how they are different. Use specific details from the text, not general words. Alice and the crow are both faced with a problem, and both stop to think instead of panicking. That's alike. But Alice's problem comes from curiosity: she wants to explore a strange world. The crow's problem is a need: he is dying of thirst. Alice checks a label before acting; the crow tries one plan, it fails, and he tries another. You can also compare settings, like Wonderland's long hall and the crow's dry countryside, or events, like the bottle and the pitcher.",
        visual: {
          type: "compare",
          left: { title: "Alice", points: ["A curious girl", "Explores a strange world", "Checks the label before drinking", "Problem comes from curiosity"] },
          right: { title: "The Crow", points: ["A thirsty bird", "Needs water to live", "Tries a plan, then a better one", "Problem comes from need"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each detail: is it true of Alice, the crow, or both?",
          buckets: ["Alice", "The crow", "Both"],
          items: [
            { text: "Checks a bottle's label", bucket: 0 },
            { text: "Explores a strange world", bucket: 0 },
            { text: "Drops pebbles into a pitcher", bucket: 1 },
            { text: "Is dying of thirst", bucket: 1 },
            { text: "Faces a problem", bucket: 2 },
            { text: "Thinks before acting", bucket: 2 },
          ],
          hint: "Picture each story. If a detail happens in both, put it in Both.",
          seconds: 40,
        },
        think: {
          q: "Which detail shows a DIFFERENCE between Alice and the crow?",
          choices: ["Both face a problem.", "Both stop to think.", "Alice explores out of curiosity; the crow acts out of need.", "Both are characters in stories."],
          answer: 2,
          why: "Contrast means a difference. Curiosity and need are different reasons for acting.",
          hints: [
            "That's something they share. Look for a difference.",
            "That's a similarity. A contrast shows how they differ.",
            "",
            "That's true of both, so it's a similarity.",
          ],
        },
        approaches: {
          analogy:
            "Comparing characters is like comparing two players on a team. Both play soccer (alike), but one is a fast striker and one is a steady goalie (different).",
          example:
            "Compare the Tortoise and the Hare. Alike: both enter the same race. Different: the hare is fast but lazy, while the tortoise is slow but steady. The difference explains who wins.",
          simpler: {
            q: "What does contrast mean?",
            choices: ["Find how things are alike", "Find how things are different", "Retell the story"],
            answer: 1,
            why: "To contrast is to show how things differ.",
            hints: ["That's compare. Contrast is the other half.", "", "Retelling is summarizing. Contrast is about differences."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each sentence about The Crow and the Pitcher: summary, theme, or opinion?",
      buckets: ["Summary (event)", "Theme (lesson)", "Opinion (leave it out)"],
      items: [
        { text: "The crow drops pebbles into the pitcher.", bucket: 0 },
        { text: "The water rises and the crow drinks.", bucket: 0 },
        { text: "The crow cannot tip the pitcher over.", bucket: 0 },
        { text: "Patient effort can solve hard problems.", bucket: 1 },
        { text: "Thinking beats giving up.", bucket: 1 },
        { text: "This is the best fable ever.", bucket: 2 },
        { text: "I think crows are cute.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain the difference between a summary and a theme, using The Crow and the Pitcher. Then tell how you would prove an inference about a character.",
      keyPoints: [
        "A summary tells the main events in order",
        "A summary uses your own words without opinions",
        "The theme is the lesson about life",
        "The theme comes from how the character responds to a challenge",
        "Prove an inference by quoting the text's exact words",
      ],
    },
    mastery: [
      {
        type: "highlight",
        prompt: "Inference: the crow is clever. Tap the sentence that BEST proves it.",
        sentences: [
          "A crow, very thirsty, came upon a pitcher.",
          "The water was too low for his beak.",
          "He dropped pebbles in, one at a time, until the water rose.",
          "Crows are large black birds.",
        ],
        correct: [2],
        hint: "Clever means finding a smart way to solve a problem. Which sentence shows his solution?",
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the steps for finding a theme in order.",
        steps: [
          "Read the whole story.",
          "Name the main character's challenge.",
          "Notice how the character responds.",
          "Ask what lesson that response teaches.",
          "Write the theme as a full sentence.",
        ],
        hint: "You can't find the lesson until you know the challenge and the response.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "A smart guess based on clues in the text is an {0}. To prove it, copy the author's exact words inside {1} marks. The big lesson of a story is its {2}.",
        blanks: [{ answers: ["inference"] }, { answers: ["quotation"] }, { answers: ["theme"] }],
        bank: ["inference", "quotation", "theme", "opinion", "setting", "question"],
        hint: "Remember the three tools: inference, quotation, theme.",
        mistakes: [
          { match: "opinion", coach: "An opinion is what you feel. An inference is built from clues in the text." },
          { match: "setting", coach: "The setting is where and when. The big lesson is the theme." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each term to what it means.",
        pairs: [
          { left: "Compare", right: "Tell how things are alike" },
          { left: "Contrast", right: "Tell how things are different" },
          { left: "Speaker", right: "The voice talking in a poem" },
          { left: "Summary", right: "Key events, in order, in your own words" },
        ],
        hint: "Compare = alike, contrast = different.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Why should you quote the text when you explain an inference?",
        choices: ["It makes your answer longer", "It proves your idea with the author's exact words", "It is not needed"],
        answer: 1,
        why: "A quotation is evidence that your inference comes from the text, not just your opinion.",
      },
      {
        q: "In \"The Land of Counterpane,\" what is a counterpane?",
        choices: ["A window", "A bedspread", "A toy soldier", "A pillow"],
        answer: 1,
        why: "A counterpane is an old word for a bedspread. The speaker plays on top of it.",
      },
      {
        q: "Which is a THEME, not a topic?",
        choices: ["Thirst", "Crows", "Never give up when a problem is hard."],
        answer: 2,
        why: "A theme is a full message about life. Thirst and crows are just topics.",
      },
      {
        q: "Which detail would you leave OUT of a summary?",
        choices: ["The crow could not reach the water.", "The crow dropped pebbles in.", "The water rose.", "I think the crow is my favorite character."],
        answer: 3,
        why: "Summaries leave out opinions.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Read an Aesop fable with a parent (for example The Ant and the Grasshopper or The Lion and the Mouse). Write a paragraph that (1) summarizes the fable in 3-4 sentences, (2) states its theme in one sentence, and (3) quotes or closely retells one detail that shows how the main character responds to a challenge.",
      rubric: [
        "Summary tells the main events in order, in the writer's own words",
        "Summary leaves out opinions",
        "Theme is stated as a lesson about life, not a topic",
        "Uses a quotation or exact detail from the fable as evidence",
        "Explains how the character's response shows the theme",
      ],
    },
  },
  // 3. Figurative language and word relationships
  {
    id: "ela-5.figurative",
    title: "Similes, Metaphors, Idioms and Proverbs",
    minutes: 30,
    stage: "grammar",
    standards: ["RL.5.4", "L.5.5"],
    read: [
      "Writers paint pictures with words. Figurative language says something in a way that isn't meant literally, to help you see or feel it.",
      "A simile compares two different things using like or as. In \"The Village Blacksmith,\" Henry Wadsworth Longfellow writes that the blacksmith's arms \"Are strong as iron bands.\" His arms are not made of iron, but the simile helps you feel how strong they are. A metaphor compares two things without like or as. It says one thing IS another. The poet Emily Dickinson wrote, \"Hope is the thing with feathers.\" Hope is not really a bird, but the metaphor makes you picture hope as something light that lifts and sings inside you.",
      "An idiom is a saying whose meaning is different from its words. If your teacher says, \"Let's break the ice,\" nobody grabs a hammer. It means to help people start talking. \"Hit the books\" means study hard, and \"a piece of cake\" means very easy.",
      "Adages and proverbs are short, old sayings that give wise advice. Benjamin Franklin printed many in his yearly book, Poor Richard's Almanack, including \"Early to bed and early to rise, makes a man healthy, wealthy, and wise.\" Aesop's fables gave us sayings too, like \"Slow and steady wins the race.\"",
      "Words also have relationships. Synonyms mean almost the same, like brave and courageous. Antonyms are opposites, like ancient and modern. Homographs are spelled the same but have different meanings, and sometimes different sounds. The wind blows, but you wind a clock. A bow is a ribbon, but you also bow to an audience. Context tells you which meaning the writer wants.",
    ].join("\n\n"),
    keyIdeas: [
      "A simile compares with like or as; a metaphor says one thing is another.",
      "Idioms mean something different from their words; adages and proverbs give wise advice.",
      "Synonyms mean the same, antonyms are opposites, and homographs are spelled alike but mean different things.",
    ],
    hook: {
      text: "If I told you it was raining cats and dogs, would you look out the window for falling puppies? Of course not. You'd grab an umbrella. English is full of sayings that don't mean what they say. Today we'll learn to read between the words.",
    },
    teach: [
      {
        title: "Similes and Metaphors",
        teach:
          "A simile compares two unlike things using the words like or as. Longfellow's poem \"The Village Blacksmith\" says the smith's arms \"Are strong as iron bands.\" The comparison helps you feel the strength in those arms. A metaphor makes a comparison without like or as. It says one thing is another. Emily Dickinson wrote, \"Hope is the thing with feathers / That perches in the soul.\" She doesn't mean hope is a bird. She means hope is light and lifts you up, and it stays with you like a bird on a branch. To understand any figure of speech, ask: What two things are compared? What do they have in common?",
        visual: {
          type: "compare",
          left: { title: "Simile", points: ["Uses like or as", "Arms strong as iron bands", "Her smile was like sunshine", "Says one thing is LIKE another"] },
          right: { title: "Metaphor", points: ["No like or as", "Hope is the thing with feathers", "The classroom was a zoo", "Says one thing IS another"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each sentence: simile or metaphor?",
          buckets: ["Simile", "Metaphor"],
          items: [
            { text: "His arms are strong as iron bands.", bucket: 0 },
            { text: "The snow was like a white blanket.", bucket: 0 },
            { text: "She ran as fast as the wind.", bucket: 0 },
            { text: "Hope is the thing with feathers.", bucket: 1 },
            { text: "The classroom was a zoo.", bucket: 1 },
            { text: "My brother is a night owl.", bucket: 1 },
          ],
          hint: "Look for the words like or as. If they make the comparison, it's a simile.",
          seconds: 40,
        },
        think: {
          q: "\"The classroom was a zoo.\" What does this metaphor mean?",
          choices: ["The class kept animals", "The class was loud and wild", "The class went on a trip", "The class was very quiet"],
          answer: 1,
          why: "A zoo is noisy and busy, so the class was loud and wild.",
          hints: [
            "A metaphor isn't meant literally. What is a zoo like?",
            "",
            "Nothing suggests a trip. Think about how a zoo sounds.",
            "Zoos are noisy, so the class was the opposite of quiet.",
          ],
        },
        approaches: {
          analogy:
            "A simile is like holding two pictures side by side and saying, look how alike these are. A metaphor tapes one picture right on top of the other.",
          example:
            "\"The lake was a mirror.\" Two things: a lake and a mirror. In common: both are smooth and reflect what's above them. So the lake was perfectly still.",
          simpler: {
            q: "Which words tell you a comparison is a simile?",
            choices: ["like or as", "and or but", "is or was"],
            answer: 0,
            why: "Similes use like or as.",
            hints: ["", "And and but join ideas; they don't make similes.", "Is and was show up in metaphors. Similes use like or as."],
          },
        },
      },
      {
        title: "Idioms, Adages and Proverbs",
        teach:
          "An idiom is a phrase that means something different from its words. \"Break the ice\" means get people talking. \"Under the weather\" means feeling sick. \"Hit the books\" means study. You learn idioms by hearing them and using context. Adages and proverbs are short, wise sayings passed down for generations. Benjamin Franklin printed many in Poor Richard's Almanack, starting in 1732, including \"Early to bed and early to rise, makes a man healthy, wealthy, and wise.\" Aesop's fables gave us \"Slow and steady wins the race.\" Other old proverbs include \"Look before you leap\" and \"Don't count your chickens before they hatch.\" Each one packs a life lesson into a few words.",
        visual: {
          type: "flip",
          cards: [
            { front: "Break the ice", back: "Get people talking and comfortable (idiom)" },
            { front: "Under the weather", back: "Feeling a little sick (idiom)" },
            { front: "A piece of cake", back: "Very easy (idiom)" },
            { front: "Look before you leap", back: "Think before you act (proverb)" },
            { front: "Don't count your chickens before they hatch", back: "Don't depend on something that hasn't happened yet (proverb)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each saying to its meaning.",
          pairs: [
            { left: "Break the ice", right: "Get people talking" },
            { left: "Under the weather", right: "Feeling sick" },
            { left: "Hit the books", right: "Study hard" },
            { left: "Look before you leap", right: "Think before you act" },
            { left: "Slow and steady wins the race", right: "Steady effort succeeds" },
          ],
          hint: "Don't read them literally. Ask what a person means when they say it.",
          seconds: 45,
        },
        think: {
          q: "Your friend says the math test was \"a piece of cake.\" What does she mean?",
          choices: ["The test was about baking", "There was cake after the test", "The test was very easy", "The test was very hard"],
          answer: 2,
          why: "\"A piece of cake\" is an idiom meaning very easy.",
          hints: [
            "Idioms aren't literal. The test wasn't about food.",
            "No cake was served. It's a saying about how the test felt.",
            "",
            "It's the opposite. Eating cake is easy and pleasant.",
          ],
        },
        approaches: {
          analogy:
            "Idioms are like secret handshakes. People who know them understand right away. Once you learn one, you're in on the secret.",
          example:
            "\"Don't count your chickens before they hatch.\" Literally: don't count eggs as chickens yet, because some may not hatch. Lesson: don't spend your birthday money before you've received it.",
          simpler: {
            q: "\"I'm feeling under the weather.\" How does the speaker feel?",
            choices: ["A little sick", "Very happy", "Wet from rain"],
            answer: 0,
            why: "Under the weather is an idiom for feeling sick.",
            hints: ["", "Happy people wouldn't use this saying. It describes not feeling well.", "It's not about real weather. It's an idiom."],
          },
        },
      },
      {
        title: "Synonyms, Antonyms and Homographs",
        teach:
          "Knowing how words relate makes you a sharper reader and writer. Synonyms are words with almost the same meaning: big, large, huge, enormous. Writers choose carefully, because enormous is bigger than big. Antonyms are opposites: ancient and modern, generous and selfish. Homographs are tricky. They are spelled the same but have different meanings, and sometimes different sounds. The wind blows, but you wind a clock. A lead pencil, but you lead the team. A tear rolls down your cheek, but you might tear the paper. A bow is a ribbon, but an actor takes a bow. To choose the right meaning and sound, read the whole sentence and use context.",
        visual: {
          type: "hotspots",
          title: "Word relationships",
          center: "Words",
          spots: [
            { label: "Synonyms", icon: "🟰", detail: "Same meaning: brave and courageous, quick and rapid." },
            { label: "Antonyms", icon: "↔️", detail: "Opposite meaning: ancient and modern, generous and selfish." },
            { label: "Homographs", icon: "🔀", detail: "Same spelling, different meaning: wind (air) and wind (turn a clock)." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A synonym for courageous is {0}. An antonym for ancient is {1}. In \"Please wind the old clock,\" wind means to {2}. In \"The bandage covers the wound,\" wound means an {3}.",
          blanks: [{ answers: ["brave"] }, { answers: ["modern"] }, { answers: ["turn"] }, { answers: ["injury"] }],
          bank: ["brave", "modern", "turn", "injury", "timid", "old", "blow", "wrapped"],
          hint: "Synonym = same, antonym = opposite. For homographs, read the whole sentence.",
          mistakes: [
            { match: "timid", coach: "Timid means shy, the opposite of courageous. A synonym means the same." },
            { match: "old", coach: "Old is a synonym of ancient. An antonym is the opposite." },
            { match: "blow", coach: "That's the other wind: moving air. You don't blow a clock; you turn its key." },
            { match: "wrapped", coach: "That's the other wound, the past of wind. A bandage covers an injury." },
          ],
          seconds: 50,
        },
        think: {
          q: "Which pair are homographs?",
          choices: ["happy / glad", "hot / cold", "bow (ribbon) / bow (bend forward)", "run / ran"],
          answer: 2,
          why: "Homographs are spelled the same with different meanings, like the two kinds of bow.",
          hints: [
            "Happy and glad mean the same. Those are synonyms.",
            "Hot and cold are opposites. Those are antonyms.",
            "",
            "Run and ran are spelled differently. Homographs share the exact spelling.",
          ],
        },
        approaches: {
          analogy:
            "Synonyms are like twins, antonyms are like rivals, and homographs are like two people with the exact same name who live in different houses.",
          example:
            "\"The dove dove into the bushes.\" The first dove (rhymes with love) is a bird. The second dove (rhymes with stove) means dived. Same spelling, different meaning and sound.",
          simpler: {
            q: "What is an antonym for generous?",
            choices: ["Kind", "Selfish", "Giving"],
            answer: 1,
            why: "Selfish is the opposite of generous.",
            hints: ["Kind is close in meaning, so it's more like a synonym.", "", "Giving means the same as generous. An antonym is the opposite."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each example by type.",
      buckets: ["Simile", "Metaphor", "Idiom", "Proverb"],
      items: [
        { text: "Strong as iron bands", bucket: 0 },
        { text: "Busy as a bee", bucket: 0 },
        { text: "Hope is the thing with feathers", bucket: 1 },
        { text: "Time is a thief", bucket: 1 },
        { text: "It's raining cats and dogs", bucket: 2 },
        { text: "Break the ice", bucket: 2 },
        { text: "Look before you leap", bucket: 3 },
        { text: "Early to bed and early to rise, makes a man healthy, wealthy, and wise", bucket: 3 },
      ],
    },
    explain: {
      prompt: "Explain the difference between a simile and a metaphor, and between an idiom and a proverb. Give one example of each.",
      keyPoints: [
        "A simile compares using like or as",
        "A metaphor says one thing is another",
        "An idiom means something different from its words",
        "A proverb is a short old saying with wise advice",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Sort each pair of words.",
        buckets: ["Synonyms", "Antonyms"],
        items: [
          { text: "rapid / quick", bucket: 0 },
          { text: "enormous / huge", bucket: 0 },
          { text: "brave / courageous", bucket: 0 },
          { text: "ancient / modern", bucket: 1 },
          { text: "generous / selfish", bucket: 1 },
          { text: "victory / defeat", bucket: 1 },
        ],
        hint: "Synonyms mean the same; antonyms are opposites.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each sentence to what its homograph (wind or lead) means there.",
        pairs: [
          { left: "The wind blew the leaves.", right: "Moving air" },
          { left: "Wind the clock each night.", right: "Turn to tighten" },
          { left: "Pipes were once made of lead.", right: "A heavy gray metal" },
          { left: "She will lead the hike.", right: "Guide the way" },
        ],
        hint: "Read the whole sentence. What makes sense with clocks, pipes or hikes?",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "\"The smith, a mighty man is he, with large and sinewy hands; and the muscles of his brawny arms are strong as iron bands.\" The comparison \"strong as iron bands\" is a {0}, because it uses the word {1}. It tells us the blacksmith is very {2}.",
        blanks: [{ answers: ["simile"] }, { answers: ["as"] }, { answers: ["strong"] }],
        bank: ["simile", "metaphor", "as", "is", "strong", "tired"],
        hint: "Look for like or as in the comparison.",
        mistakes: [
          { match: "metaphor", coach: "A metaphor has no like or as. This one uses as, so it's a simile." },
          { match: "tired", coach: "Iron bands are hard and tough. The comparison shows strength." },
        ],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build Benjamin Franklin's proverb in order.",
        tiles: ["Early to bed", "and early to rise,", "makes a man", "healthy, wealthy,", "and wise."],
        distractors: ["late to sleep,", "and lazy."],
        hint: "It starts with going to bed early and ends with three good things.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "\"Time is a thief.\" What kind of figurative language is this?",
        choices: ["Metaphor", "Simile", "Proverb"],
        answer: 0,
        why: "It says time IS a thief, with no like or as, so it's a metaphor.",
      },
      {
        q: "Who printed \"Early to bed and early to rise\" in Poor Richard's Almanack?",
        choices: ["Aesop", "Henry Wadsworth Longfellow", "Benjamin Franklin", "Lewis Carroll"],
        answer: 2,
        why: "Benjamin Franklin published Poor Richard's Almanack and its many proverbs.",
      },
      {
        q: "\"Hit the books\" means:",
        choices: ["Punch a book", "Study hard", "Throw books away", "Buy new books"],
        answer: 1,
        why: "It's an idiom meaning study hard.",
      },
      {
        q: "Which pair are synonyms?",
        choices: ["hot / cold", "rapid / quick", "lead (metal) / lead (guide)"],
        answer: 1,
        why: "Rapid and quick mean almost the same thing.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Write a short description (5-7 sentences) of a place you love, like a kitchen, a park or a grandparent's porch. Include at least one simile, one metaphor and one idiom or proverb. Then underline each one and write in the margin what it means.",
      rubric: [
        "Describes a real place with vivid details",
        "Includes a correct simile using like or as",
        "Includes a correct metaphor without like or as",
        "Includes an idiom or proverb used correctly",
        "Explains what each figure of speech means",
      ],
    },
  },
  // 4. Story structure, point of view, voices, pictures and genre
  {
    id: "ela-5.story-structure",
    title: "Chapters, Narrators and Pictures: How Stories Are Built",
    minutes: 35,
    stage: "logic",
    standards: ["RL.5.5", "RL.5.6", "RL.5.7", "RL.5.9", "L.5.3"],
    read: [
      "A story is built like a house. Chapters, scenes and stanzas are its rooms, and each one has a job.",
      "Robert Louis Stevenson's adventure novel Treasure Island, published in 1883, is built from chapters. Early chapters set up the story: young Jim Hawkins lives at the Admiral Benbow inn, where an old sailor named Billy Bones hides a sea chest. Middle chapters build the adventure: Jim finds a treasure map in the chest and sails on the ship Hispaniola, where the cook, Long John Silver, secretly leads a mutiny. The last chapters solve the problems and bring Jim home. Plays are built from scenes, and poems from stanzas. Stevenson's poem \"The Land of Counterpane\" has four stanzas: the first sets the scene, the middle two show the speaker's games, and the last reveals what he imagines himself to be.",
      "Who tells a story changes how we see it. Treasure Island is told mostly by Jim, in the first person, using I. We only know what Jim knows, so we feel his fear and his surprise. Alice's Adventures in Wonderland is told in the third person by a narrator outside the story, using she.",
      "Characters may speak in different varieties of English. Long John Silver talks in sailor's slang, saying things like \"shiver my timbers,\" while Dr. Livesey speaks in polished, formal English. These voices help us know who the characters are.",
      "Pictures and sound add meaning too. John Tenniel drew the famous illustrations for Alice in 1865. His drawings of the White Rabbit and the Cheshire Cat helped generations of readers picture Wonderland. An audiobook, with a reader's voice and pauses, can make a scene more suspenseful.",
      "Finally, stories in the same genre can be compared. Treasure Island and Daniel Defoe's Robinson Crusoe are both adventure stories at sea, told in the first person, about courage far from home. But Jim hunts treasure with a crew, while Crusoe survives alone on an island.",
    ].join("\n\n"),
    keyIdeas: [
      "Chapters, scenes and stanzas each have a job: set up, build, and resolve.",
      "The narrator's point of view shapes what we know and how events feel.",
      "Characters' varieties of English, like dialect or formal speech, reveal who they are.",
      "Pictures and sound add meaning, and stories in the same genre can be compared.",
    ],
    hook: {
      text: "\"Pieces of eight! Pieces of eight!\" squawks a parrot named Captain Flint in a famous adventure book. Treasure Island has pirates, a map, a mutiny and buried gold. But it also has something hidden: a clever design. Today we'll take the story apart to see how it's built.",
    },
    teach: [
      {
        title: "How the Parts Fit Together",
        teach:
          "Every long story is built from smaller parts. Novels have chapters. Plays have acts and scenes. Poems have stanzas. Each part does a job. In Treasure Island, the opening chapters set up the story: Jim Hawkins meets the old sailor Billy Bones at his family's inn. Middle chapters build the action: Jim finds the map, sails on the Hispaniola, and discovers that the cook, Long John Silver, is planning a mutiny. The final chapters bring the climax and the ending, when the treasure is found and Jim sails home. When you read, ask: What does this chapter add? How does it connect to the one before and set up the next?",
        visual: {
          type: "hotspots",
          title: "Building blocks of literature",
          center: "Structure",
          spots: [
            { label: "Chapter", icon: "📖", detail: "A section of a novel. Treasure Island has 34 chapters in six parts." },
            { label: "Scene", icon: "🎭", detail: "A section of a play, set in one place and time." },
            { label: "Stanza", icon: "📝", detail: "A group of lines in a poem, like a paragraph." },
            { label: "Set up", icon: "🏠", detail: "Opening parts introduce characters, setting and the problem." },
            { label: "Build", icon: "⛰️", detail: "Middle parts raise the stakes toward the climax." },
            { label: "Resolve", icon: "🏁", detail: "Final parts solve the problem and wrap up the story." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put these parts of Treasure Island in story order.",
          steps: [
            "Jim lives at the Admiral Benbow inn, where Billy Bones hides a sea chest.",
            "Jim finds a treasure map in the sea chest.",
            "Jim sails on the Hispaniola with a crew and the cook, Long John Silver.",
            "Jim discovers that Silver is planning a mutiny.",
            "The treasure is found, and Jim sails home.",
          ],
          hint: "Set up first (the inn), then the map, the voyage, the danger, and finally the ending.",
          seconds: 40,
        },
        think: {
          q: "What is the main job of the opening chapters of a novel?",
          choices: ["To end the story", "To introduce the characters, setting and problem", "To list the author's other books", "To give the climax"],
          answer: 1,
          why: "Opening chapters set up the story so the rest makes sense.",
          hints: [
            "Endings come in the final chapters.",
            "",
            "That's not part of the story's structure at all.",
            "The climax comes after the action builds, not at the start.",
          ],
        },
        approaches: {
          analogy:
            "A story is like a train trip. The first cars load the passengers (set up), the middle cars climb the mountain (build), and the last cars roll into the station (resolve).",
          example:
            "\"The Land of Counterpane\" has four stanzas. Stanza 1: the speaker is sick in bed with toys. Stanzas 2 and 3: his soldiers march and his ships sail. Stanza 4: he sees himself as a giant over the whole land.",
          simpler: {
            q: "What is a stanza?",
            choices: ["A group of lines in a poem", "A section of a play", "The title of a book"],
            answer: 0,
            why: "A stanza is a group of lines in a poem.",
            hints: ["", "A section of a play is a scene.", "A title names the book. A stanza is a group of lines in a poem."],
          },
        },
      },
      {
        title: "Who Is Telling the Story?",
        teach:
          "The narrator is the voice telling the story. A first-person narrator is a character in the story and uses I and we. Treasure Island is told mostly by Jim Hawkins: \"I\" hid in the apple barrel, \"I\" heard Silver's plan. Because we only know what Jim knows, we feel his fear and surprise. For three chapters, Stevenson even switches narrators and lets Dr. Livesey tell what happened while Jim was away. A third-person narrator is outside the story and uses he, she and they. Alice's Adventures in Wonderland is told in the third person, so the narrator can describe Alice from the outside and comment on her. Point of view decides what readers learn, and when.",
        visual: {
          type: "compare",
          left: { title: "First person", points: ["Narrator is a character", "Uses I, me, we", "We know only what the narrator knows", "Example: Treasure Island (Jim)"] },
          right: { title: "Third person", points: ["Narrator is outside the story", "Uses he, she, they", "Can describe characters from outside", "Example: Alice in Wonderland"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each sentence: first-person or third-person narrator?",
          buckets: ["First person", "Third person"],
          items: [
            { text: "I crept into the apple barrel to hide.", bucket: 0 },
            { text: "My heart pounded as we rowed ashore.", bucket: 0 },
            { text: "We spotted the island at dawn.", bucket: 0 },
            { text: "Alice wondered how far she had fallen.", bucket: 1 },
            { text: "The crow dropped another pebble into the pitcher.", bucket: 1 },
            { text: "They searched the hall for a way out.", bucket: 1 },
          ],
          hint: "Look at the pronouns. I, my and we mean first person. She, he and they mean third person.",
          seconds: 35,
        },
        think: {
          q: "Why does a first-person narrator make Treasure Island feel so suspenseful?",
          choices: [
            "Because the book has a map",
            "Because we only know what Jim knows, so we're surprised when he is",
            "Because Jim is a pirate",
            "Because it is told by a narrator outside the story",
          ],
          answer: 1,
          why: "Seeing only through Jim's eyes, we discover dangers when he does.",
          hints: [
            "The map is part of the plot, not the point of view.",
            "",
            "Jim is a boy on the crew, not a pirate. Think about whose eyes we see through.",
            "That describes third person. Treasure Island is told by Jim, in first person.",
          ],
        },
        approaches: {
          analogy:
            "First person is like watching a soccer game from the field, wearing a player's helmet camera. Third person is like watching from the stands, where you can see everyone.",
          example:
            "First person: \"I opened the chest and gasped.\" Third person: \"Jim opened the chest and gasped.\" Same event, but the first feels closer, because you're inside Jim's head.",
          simpler: {
            q: "\"I ran to the dock.\" Which point of view is this?",
            choices: ["First person", "Third person", "No narrator"],
            answer: 0,
            why: "The narrator says I, so it's first person.",
            hints: ["", "Third person uses he, she or they. This sentence uses I.", "Every story has a narrator. The pronoun I tells you which kind."],
          },
        },
      },
      {
        title: "Voices: Dialect and Formal English",
        teach:
          "People speak in different varieties of English. A dialect is the way a group of people talk, with its own words and grammar. In Treasure Island, Long John Silver talks like an old sailor. He says things like \"shiver my timbers\" and calls gold coins \"pieces of eight,\" which his parrot squawks over and over. Dr. Livesey, the educated country doctor, speaks in careful, formal English. Writers choose these voices on purpose. They tell us where a character comes from and what he is like. You change your own register too: you speak formally when giving a report and more casually with friends. Both have their place.",
        visual: {
          type: "compare",
          left: { title: "Formal register", points: ["Complete sentences", "Careful word choice", "Used in reports and speeches", "Like Dr. Livesey"] },
          right: { title: "Informal or dialect", points: ["Slang and special words", "Relaxed grammar", "Used with friends or in a group", "Like Long John Silver"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each line: formal English, or informal/dialect?",
          buckets: ["Formal", "Informal or dialect"],
          items: [
            { text: "Good afternoon. I would like to present my report.", bucket: 0 },
            { text: "The patient requires rest and clean water.", bucket: 0 },
            { text: "Thank you for your kind letter, sir.", bucket: 0 },
            { text: "Shiver my timbers!", bucket: 1 },
            { text: "Hey, what's up? Wanna come over?", bucket: 1 },
            { text: "Ahoy, matey! Hoist the sails!", bucket: 1 },
          ],
          hint: "Formal English is careful and complete. Informal speech and dialect use slang or special group words.",
          seconds: 35,
        },
        think: {
          q: "Why might an author give a sailor character his own way of talking?",
          choices: [
            "To show where he comes from and what he is like",
            "Because the author made a spelling mistake",
            "To make the book shorter",
            "So readers skip his lines",
          ],
          answer: 0,
          why: "A character's dialect shows his background and personality.",
          hints: [
            "",
            "Dialect in a story is a choice, not a mistake.",
            "Dialect doesn't change the length. Think about what it shows about the character.",
            "Authors want you to hear his voice, not skip it.",
          ],
        },
        approaches: {
          analogy:
            "Registers are like clothes. You wear a suit to a wedding and play clothes to the park. Both are fine; you pick the one that fits the place.",
          example:
            "At the dinner table: \"Can I have the potatoes?\" Giving a speech: \"Thank you all for coming this evening.\" Same person, two registers, each right for its situation.",
          simpler: {
            q: "Which sentence is formal?",
            choices: ["Yo, gimme that!", "May I please borrow your pencil?", "Ahoy, matey!"],
            answer: 1,
            why: "It's polite and complete, the mark of formal English.",
            hints: ["That's slang, very informal.", "", "That's sailor talk, a kind of dialect."],
          },
        },
      },
      {
        title: "Pictures, Sound and Same-Genre Stories",
        teach:
          "Pictures and sound can add meaning to a story. When Alice's Adventures in Wonderland was published in 1865, it came with drawings by John Tenniel. His White Rabbit, checking a pocket watch, shows how hurried and fussy the rabbit is. An audiobook adds a reader's voice, pauses and tone, which can make a scary scene more suspenseful. A genre is a kind of story, like fable, mystery or adventure. Stories in the same genre can be compared. Treasure Island and Daniel Defoe's Robinson Crusoe, from 1719, are both sea adventures told in the first person about courage far from home. But Jim hunts treasure with a crew, while Crusoe survives alone on an island.",
        visual: {
          type: "compare",
          left: { title: "Treasure Island (1883)", points: ["Adventure at sea", "Told by Jim, first person", "A treasure hunt with a crew", "Theme: courage and loyalty"] },
          right: { title: "Robinson Crusoe (1719)", points: ["Adventure at sea", "Told by Crusoe, first person", "Shipwrecked, surviving alone", "Theme: courage and hard work"] },
        },
        probe: {
          type: "match",
          prompt: "Match each element to what it adds to a story.",
          pairs: [
            { left: "An illustration of the White Rabbit with a pocket watch", right: "Shows the rabbit is hurried and fussy" },
            { left: "An audiobook reader whispering in a scary scene", right: "Builds suspense" },
            { left: "A map printed in the front of Treasure Island", right: "Helps readers follow where the adventure happens" },
            { left: "Cheerful music in a film of a fable", right: "Sets a light, happy mood" },
          ],
          hint: "Ask what each picture or sound makes you see or feel.",
          seconds: 45,
        },
        think: {
          q: "How are Treasure Island and Robinson Crusoe ALIKE?",
          choices: [
            "Both are adventures at sea told in the first person",
            "Both are poems",
            "Both are about a girl in Wonderland",
            "Both have a hero who is alone the whole time",
          ],
          answer: 0,
          why: "Both are first-person sea adventures about courage far from home.",
          hints: [
            "",
            "Both are novels, not poems.",
            "That's Alice. These two are about sailors.",
            "Only Crusoe is alone. Jim has a crew.",
          ],
        },
        approaches: {
          analogy:
            "Comparing stories in one genre is like comparing two pizzas. Both are pizza (same genre), but one has mushrooms and one has pepperoni. The toppings are where the interesting differences are.",
          example:
            "Two fables, The Tortoise and the Hare and The Ant and the Grasshopper, share a theme: steady work pays off. But one teaches it through a race, the other through preparing for winter.",
          simpler: {
            q: "What is a genre?",
            choices: ["A kind of story, like fable or adventure", "The main character", "The last chapter"],
            answer: 0,
            why: "A genre is a type or category of story.",
            hints: ["", "That's the protagonist. A genre is a kind of story.", "That's part of the structure. A genre is a kind of story."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each clue about a story's craft.",
      buckets: ["Structure", "Point of view", "Pictures and sound"],
      items: [
        { text: "The poem has four stanzas.", bucket: 0 },
        { text: "The novel is divided into six parts.", bucket: 0 },
        { text: "The play's second scene happens on a ship.", bucket: 0 },
        { text: "The story is told by Jim, using I.", bucket: 1 },
        { text: "The narrator stands outside the story and uses she.", bucket: 1 },
        { text: "Tenniel's drawing shows the Cheshire Cat's grin.", bucket: 2 },
        { text: "The audiobook reader pauses before a surprise.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pick a story you know well. Explain how its parts fit together, who tells it, and how that point of view changes what the reader knows.",
      keyPoints: [
        "Opening parts set up the characters and problem",
        "Middle parts build toward the climax",
        "The ending resolves the problem",
        "First person uses I and shows only the narrator's view",
        "Third person uses he or she from outside the story",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "A novel is divided into {0}. A play is divided into {1}. A poem is divided into {2}.",
        blanks: [{ answers: ["chapters"] }, { answers: ["scenes", "acts"] }, { answers: ["stanzas"] }],
        bank: ["chapters", "scenes", "stanzas", "captions", "pages"],
        hint: "Novels: chapters. Plays: scenes. Poems: stanzas.",
        mistakes: [{ match: "captions", coach: "Captions go under pictures. Poems are divided into stanzas." }],
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Sort the narrators.",
        buckets: ["First person", "Third person"],
        items: [
          { text: "Jim Hawkins in Treasure Island", bucket: 0 },
          { text: "Robinson Crusoe telling his own story", bucket: 0 },
          { text: "The narrator of Alice's Adventures in Wonderland", bucket: 1 },
          { text: "A narrator who tells about the crow and the pitcher", bucket: 1 },
        ],
        hint: "Is the narrator a character saying I, or someone outside the story?",
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each term to its meaning.",
        pairs: [
          { left: "Dialect", right: "The way a group of people talks" },
          { left: "Genre", right: "A kind of story, like adventure" },
          { left: "Narrator", right: "The voice telling the story" },
          { left: "Illustration", right: "A picture that goes with a text" },
        ],
        hint: "Think of Long John Silver (dialect), adventure (genre), Jim (narrator) and Tenniel (illustration).",
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the TWO sentences that compare Treasure Island and Robinson Crusoe by showing a DIFFERENCE.",
        sentences: [
          "Both are adventure stories at sea.",
          "Jim hunts for treasure with a crew.",
          "Crusoe survives alone on an island.",
          "Both are told in the first person.",
        ],
        correct: [1, 2],
        hint: "A difference is something true of one story but not the other.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Treasure Island is told mostly by Jim, using I. What point of view is that?",
        choices: ["Third person", "First person", "No point of view"],
        answer: 1,
        why: "A narrator inside the story who says I is a first-person narrator.",
      },
      {
        q: "Who drew the first illustrations for Alice's Adventures in Wonderland?",
        choices: ["Robert Louis Stevenson", "Daniel Defoe", "Aesop", "John Tenniel"],
        answer: 3,
        why: "John Tenniel drew the famous pictures for the 1865 book.",
      },
      {
        q: "Long John Silver says \"shiver my timbers.\" This is an example of:",
        choices: ["Formal English", "A sailor's dialect", "A stanza"],
        answer: 1,
        why: "It's sailor slang, part of the dialect that shows who Silver is.",
      },
      {
        q: "What do Treasure Island and Robinson Crusoe have in common?",
        choices: ["Both are adventure stories at sea", "Both are about Wonderland", "Both are poems with stanzas", "Both are told in the third person"],
        answer: 0,
        why: "They're in the same genre: adventure at sea.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Choose a favorite short scene from any story and read it aloud twice to a parent: once as written, and once retold by a different character in the first person (\"I...\"). Then explain to your parent how changing the narrator changed what the listener knows and feels.",
      rubric: [
        "Reads the original scene clearly with expression",
        "Retells the scene in first person from a different character's view",
        "Keeps the events the same while changing the point of view",
        "Explains what the new narrator knows or feels that the first did not",
      ],
    },
  },
  // 5. Nonfiction: main ideas, relationships, text structure, academic words
  {
    id: "ela-5.nonfiction",
    title: "Reading Nonfiction: The Wright Brothers Take Flight",
    minutes: 35,
    stage: "logic",
    standards: ["RI.5.1", "RI.5.2", "RI.5.3", "RI.5.4", "RI.5.5", "RI.5.10", "L.5.6"],
    read: [
      "Nonfiction tells true stories and explains real ideas. Let's read one.",
      "Wilbur and Orville Wright grew up in Dayton, Ohio. When they were boys, their father brought home a toy helicopter powered by a rubber band, and they never forgot it. As young men, they opened a bicycle shop, where they learned to build light, strong machines.",
      "In the 1890s, people around the world were trying to fly. The Wrights studied the problem carefully. They noticed that birds twist the tips of their wings to turn and balance. So they designed wings that could twist the same way, an idea called wing warping. Because no one had good information about wing shapes, they built a small wind tunnel in 1901 and tested about two hundred wing shapes. They also needed a light engine, but none was available. Consequently, their mechanic, Charlie Taylor, built one for them.",
      "To test their gliders, the brothers traveled to Kitty Hawk, North Carolina, because it had strong, steady winds and soft sand for landing. On December 17, 1903, Orville made the first powered, controlled airplane flight. It lasted 12 seconds and covered 120 feet. Later that day, Wilbur flew 852 feet in 59 seconds.",
      "This passage has more than one main idea. One is that the Wrights solved the problem of flight by studying and testing carefully. Another is that their skills from the bicycle shop helped them succeed. Key details, like the wind tunnel and the homemade engine, support these ideas.",
      "Authors organize nonfiction in different ways. A chronological structure tells events in time order. Cause and effect shows why things happen. Problem and solution names a problem and how it was solved. Compare and contrast shows how things are alike and different. Signal words like because, consequently, however and similarly are clues to the structure.",
    ].join("\n\n"),
    keyIdeas: [
      "A nonfiction text can have two or more main ideas, each supported by key details.",
      "Look for relationships between people, events and ideas: what caused what, and who helped whom.",
      "Text structures include chronological, cause and effect, problem and solution, and compare and contrast.",
      "Academic and science words, and signal words like consequently and however, unlock meaning.",
    ],
    hook: {
      text: "For thousands of years, people watched birds and wished they could fly. Many tried and failed. Then two brothers who fixed bicycles in Ohio did it. They didn't have a fancy laboratory or a college degree. So how did they beat the world to the sky?",
    },
    teach: [
      {
        title: "Main Ideas and Key Details",
        teach:
          "The main idea is what a passage is mostly about. Longer texts often have two or more. The details are the facts that support them. In the Wright brothers' story, one main idea is that they solved flight by careful study and testing. Supporting details: they watched how birds balance, built a wind tunnel in 1901 and tested about two hundred wing shapes. A second main idea is that their bicycle shop skills helped. Supporting details: they knew how to build light, strong machines, and their mechanic built their engine. A summary of nonfiction states the main ideas and the most important details, in order, in your own words.",
        visual: {
          type: "hotspots",
          title: "Main idea and details",
          center: "Main idea",
          spots: [
            { label: "Main idea 1", icon: "🔬", detail: "The Wrights solved flight by careful study and testing." },
            { label: "Detail", icon: "🐦", detail: "They watched how birds twist their wing tips to balance." },
            { label: "Detail", icon: "🌬️", detail: "They built a wind tunnel and tested about 200 wing shapes." },
            { label: "Main idea 2", icon: "🚲", detail: "Skills from their bicycle shop helped them build airplanes." },
            { label: "Detail", icon: "⚙️", detail: "Their mechanic, Charlie Taylor, built a light engine." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each detail under the main idea it supports.",
          buckets: ["Careful study and testing", "Bicycle shop skills"],
          items: [
            { text: "They watched how birds balance in the air.", bucket: 0 },
            { text: "They tested about 200 wing shapes in a wind tunnel.", bucket: 0 },
            { text: "They tested gliders at Kitty Hawk before adding an engine.", bucket: 0 },
            { text: "They already knew how to build light, strong machines.", bucket: 1 },
            { text: "Their shop mechanic built them a light engine.", bucket: 1 },
          ],
          hint: "Is the detail about learning and testing, or about the skills and help from their shop?",
          seconds: 40,
        },
        think: {
          q: "Which sentence is a MAIN IDEA rather than a detail?",
          choices: [
            "The flight lasted 12 seconds.",
            "Orville was the pilot on December 17.",
            "The Wrights solved the problem of flight by studying and testing carefully.",
            "Kitty Hawk has soft sand.",
          ],
          answer: 2,
          why: "It sums up a big point that many details support.",
          hints: [
            "That's one fact, a detail. A main idea is bigger.",
            "That's a single fact. Look for the sentence that many details support.",
            "",
            "That detail explains why they chose Kitty Hawk. A main idea covers more.",
          ],
        },
        approaches: {
          analogy:
            "A main idea is like a table top, and the details are the legs holding it up. Without the legs, the idea falls flat.",
          example:
            "Main idea: Honeybees are important to farms. Details: they carry pollen from flower to flower, which helps many fruits and vegetables grow. Every detail holds up the main idea.",
          simpler: {
            q: "What does a detail do?",
            choices: ["Supports the main idea with facts", "Tells a joke", "Names the author"],
            answer: 0,
            why: "Details are facts that support the main idea.",
            hints: ["", "Details aren't jokes. They're facts that hold up the main idea.", "The author's name is not a detail of the text's ideas."],
          },
        },
      },
      {
        title: "How People, Events and Ideas Connect",
        teach:
          "Nonfiction shows how things are connected. Some connections are cause and effect: one thing makes another happen. Because no one had good data on wing shapes, the Wrights built a wind tunnel. Because Kitty Hawk had steady winds and soft sand, they tested there. Some connections are between people: Charlie Taylor's engine made the flight possible. And some connect ideas: watching birds twist their wing tips gave the brothers the idea of wing warping. When you explain a connection, use specific details from the text, and use linking words like because, so, as a result and consequently.",
        visual: {
          type: "timeline",
          events: [
            { year: 1878, label: "A toy helicopter", detail: "Their father brings home a rubber-band toy helicopter that sparks the boys' interest in flight." },
            { year: 1892, label: "Bicycle shop", detail: "The brothers open a bicycle shop in Dayton, Ohio, and learn to build light machines." },
            { year: 1900, label: "First glider at Kitty Hawk", detail: "They test a glider on the windy sand dunes of North Carolina." },
            { year: 1901, label: "Wind tunnel", detail: "They build a wind tunnel and test about 200 wing shapes." },
            { year: 1903, label: "First flight", detail: "On December 17, Orville flies 120 feet in 12 seconds." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each cause to its effect.",
          pairs: [
            { left: "No one had good information about wing shapes", right: "They built a wind tunnel to test their own" },
            { left: "No light engine was available", right: "Charlie Taylor built one for them" },
            { left: "Kitty Hawk had steady winds and soft sand", right: "They tested their gliders there" },
            { left: "Birds twist their wing tips to balance", right: "The Wrights designed wing warping" },
          ],
          hint: "Ask: what happened BECAUSE of this?",
          seconds: 45,
        },
        think: {
          q: "Why did the Wright brothers go to Kitty Hawk?",
          choices: ["To open a bicycle shop", "Because it had strong, steady winds and soft sand", "To visit their father", "Because the wind tunnel was there"],
          answer: 1,
          why: "The text says they chose it for steady winds and soft sand for landing.",
          hints: [
            "Their shop was in Dayton, Ohio.",
            "",
            "The text doesn't say that. Look for the word because.",
            "They built the wind tunnel at home in Ohio, not at Kitty Hawk.",
          ],
        },
        approaches: {
          analogy:
            "Causes and effects are like dominoes. One falls and knocks over the next. Your job is to trace which domino hit which.",
          example:
            "Cause: It rained all night. Effect: The soccer field was muddy. Effect of that: The game was moved indoors. Each event connects to the next with because or so.",
          simpler: {
            q: "\"It was very cold, so the pond froze.\" What is the cause?",
            choices: ["The pond froze", "It was very cold", "Nothing caused it"],
            answer: 1,
            why: "The cold caused the pond to freeze.",
            hints: ["That's the effect, what happened.", "", "The word so tells you there's a cause."],
          },
        },
      },
      {
        title: "Text Structures",
        teach:
          "Authors organize nonfiction in patterns called text structures. Chronological structure tells events in time order, using dates and words like first, next and finally. Cause and effect explains why something happened, using because, so and as a result. Problem and solution names a problem and tells how it was solved. Compare and contrast shows how things are alike and different, using similarly, however and on the other hand. The same topic can be written in different structures. One article could tell the Wright brothers' story in time order. Another could explain the problem of balancing an airplane and the solution of wing warping. Noticing the structure helps you find what matters most.",
        visual: {
          type: "hotspots",
          title: "Four text structures",
          center: "Structure",
          spots: [
            { label: "Chronological", icon: "📅", detail: "Time order. Signal words: first, next, then, in 1903, finally." },
            { label: "Cause and effect", icon: "➡️", detail: "Why things happen. Signal words: because, so, as a result, consequently." },
            { label: "Problem and solution", icon: "🔧", detail: "A problem and how it was solved. Signal words: problem, solved, answer." },
            { label: "Compare and contrast", icon: "⚖️", detail: "Alike and different. Signal words: similarly, both, however, unlike." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each paragraph by its text structure.",
          buckets: ["Chronological", "Cause and effect", "Problem and solution", "Compare and contrast"],
          items: [
            { text: "In 1900 they flew a glider. In 1901 they built a wind tunnel. In 1903 they flew.", bucket: 0 },
            { text: "First they studied birds, then built gliders, and finally added an engine.", bucket: 0 },
            { text: "Because the winds were steady, the brothers chose Kitty Hawk.", bucket: 1 },
            { text: "Their testing was careful; as a result, their wings worked better.", bucket: 1 },
            { text: "Early airplanes were hard to balance. The Wrights solved this with wing warping.", bucket: 2 },
            { text: "No light engine existed, so the problem was solved when their mechanic built one.", bucket: 2 },
            { text: "Both gliders and airplanes have wings; however, only airplanes have engines.", bucket: 3 },
            { text: "Unlike a bird, a glider cannot flap its wings.", bucket: 3 },
          ],
          hint: "Look for signal words: dates and first/then (chronological), because/as a result (cause and effect), problem/solved (problem and solution), both/however/unlike (compare and contrast).",
          seconds: 60,
        },
        think: {
          q: "\"Both gliders and airplanes have wings; however, only airplanes have engines.\" Which structure is this?",
          choices: ["Chronological", "Problem and solution", "Cause and effect", "Compare and contrast"],
          answer: 3,
          why: "Both and however show likenesses and differences.",
          hints: [
            "There are no dates or time-order words here.",
            "No problem is named or solved.",
            "Nothing here causes anything else.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Text structures are like the shapes of containers. Water can go in a jar, a bottle or a bowl. The same facts can be poured into different structures.",
          example:
            "Topic: fire safety. Chronological: what to do first, next and last in a fire drill. Cause and effect: why smoke alarms save lives. Problem and solution: a kitchen fire and how a fire extinguisher puts it out.",
          simpler: {
            q: "Which signal words show chronological order?",
            choices: ["first, next, finally", "however, unlike", "because, so"],
            answer: 0,
            why: "Time-order words show chronological structure.",
            hints: ["", "Those compare and contrast.", "Those show cause and effect."],
          },
        },
      },
      {
        title: "Science Words and Signal Words",
        teach:
          "Nonfiction has two kinds of special words. Subject words belong to one field. In flight, lift is the upward push of air on a wing. A propeller is a set of spinning blades that pulls a plane forward. A glider is an aircraft with no engine. Academic words show up in every subject, words like analyze, evidence, structure and significant. Signal words show how ideas connect. However and although show contrast. Similarly shows likeness. Moreover and in addition add more. Consequently and as a result show effects. When you quote a text to explain something, copy these words exactly. They carry the author's precise meaning.",
        visual: {
          type: "flip",
          cards: [
            { front: "Lift", back: "The upward push of air on a wing that holds an airplane up." },
            { front: "Propeller", back: "Spinning blades that pull or push an aircraft forward." },
            { front: "Glider", back: "An aircraft with wings but no engine." },
            { front: "However", back: "A signal word that shows contrast: something different is coming." },
            { front: "Consequently", back: "A signal word meaning as a result." },
            { front: "Moreover", back: "A signal word that adds another point." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A {0} has wings but no engine. The upward push of air on a wing is called {1}. No light engine existed; {2}, their mechanic built one. Gliders are quiet; {3}, airplanes are loud.",
          blanks: [{ answers: ["glider"] }, { answers: ["lift"] }, { answers: ["consequently", "as a result"] }, { answers: ["however"] }],
          bank: ["glider", "lift", "consequently", "however", "propeller", "similarly", "gravity"],
          hint: "Consequently shows a result. However shows a contrast.",
          mistakes: [
            { match: "similarly", coach: "Similarly shows two things are alike. Quiet and loud are opposites, so use however." },
            { match: "propeller", coach: "A propeller is spinning blades. An aircraft with no engine is a glider." },
            { match: "gravity", coach: "Gravity pulls down. The upward push on a wing is lift." },
          ],
          seconds: 50,
        },
        think: {
          q: "Which signal word shows that something DIFFERENT is coming?",
          choices: ["Moreover", "Similarly", "In addition", "However"],
          answer: 3,
          why: "However signals a contrast.",
          hints: [
            "Moreover adds more of the same kind of point.",
            "Similarly shows likeness, not difference.",
            "In addition adds another point.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Signal words are like road signs. A curve sign warns you the road is turning (however), and a straight arrow says keep going the same way (moreover).",
          example:
            "\"Wilbur was the older brother. Moreover, he was the first to write to experts about flight. However, Orville flew first.\" Moreover adds a fact; however turns to a contrast.",
          simpler: {
            q: "What is a propeller?",
            choices: ["Spinning blades that pull a plane forward", "The plane's wheels", "The pilot's seat"],
            answer: 0,
            why: "A propeller's spinning blades pull the plane through the air.",
            hints: ["", "Wheels help on the ground. A propeller spins in the air.", "The seat holds the pilot. The propeller moves the plane."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put these events from the Wright brothers' story in chronological order.",
      steps: [
        "Their father brings home a toy helicopter.",
        "They open a bicycle shop in Dayton, Ohio.",
        "They test their first glider at Kitty Hawk.",
        "They build a wind tunnel and test wing shapes.",
        "Orville makes the first powered, controlled flight.",
        "Wilbur flies 852 feet later that same day.",
      ],
    },
    explain: {
      prompt: "Summarize the Wright brothers' story. Name two main ideas, give a detail for each, and tell which text structure you would use to write about them and why.",
      keyPoints: [
        "They solved flight by careful study and testing",
        "Bicycle shop skills helped them build airplanes",
        "Details like the wind tunnel or the homemade engine",
        "Names a text structure such as chronological or problem and solution",
        "First flight in 1903 at Kitty Hawk",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Place each event on the timeline.",
        min: 1890,
        max: 1910,
        step: 1,
        tolerance: 0,
        items: [
          { label: "Bicycle shop opens", value: 1892 },
          { label: "Wind tunnel tests", value: 1901 },
          { label: "First powered flight", value: 1903 },
        ],
        hint: "Shop: 1892. Wind tunnel: 1901. First flight: 1903.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Orville's first flight covered 120 feet. Wilbur's last flight that day covered 852 feet. How many feet farther did Wilbur fly?",
        answer: 732,
        unit: "feet",
        hint: "Subtract: 852 minus 120.",
        mistakes: [{ match: "972", coach: "You added. To find how much farther, subtract 120 from 852." }],
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each signal word to the structure it usually signals.",
        pairs: [
          { left: "first, next, finally", right: "Chronological" },
          { left: "because, as a result", right: "Cause and effect" },
          { left: "the problem was solved by", right: "Problem and solution" },
          { left: "similarly, however", right: "Compare and contrast" },
        ],
        hint: "Time words, reason words, fix words and alike/different words.",
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the sentence that is the best main idea for the whole passage.",
        sentences: [
          "The first flight lasted 12 seconds.",
          "The Wrights solved the problem of flight through careful study and testing.",
          "Kitty Hawk is in North Carolina.",
          "Charlie Taylor was a mechanic.",
        ],
        correct: [1],
        hint: "A main idea is big enough that many details support it.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "On December 17, 1903, how long did Orville's first flight last?",
        choices: ["12 seconds", "12 minutes", "59 seconds", "1 hour"],
        answer: 0,
        why: "The first flight lasted 12 seconds and covered 120 feet.",
      },
      {
        q: "\"No light engine was available. Consequently, their mechanic built one.\" What does consequently mean?",
        choices: ["However", "As a result", "Before that"],
        answer: 1,
        why: "Consequently shows an effect: as a result.",
      },
      {
        q: "A paragraph that explains a problem with balancing airplanes and how wing warping fixed it uses which structure?",
        choices: ["Compare and contrast", "Chronological", "Problem and solution", "No structure"],
        answer: 2,
        why: "It names a problem and its solution.",
      },
      {
        q: "Why did the Wright brothers build a wind tunnel?",
        choices: ["To cool their bicycle shop", "To sell to other inventors", "Because the wind at Kitty Hawk stopped", "Because they needed better information about wing shapes"],
        answer: 3,
        why: "No one had good information about wing shapes, so they tested their own.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Pick an inventor or explorer (for example Thomas Edison, Benjamin Franklin, Marie Curie or Lewis and Clark). Read about them in two sources with a parent. Write two paragraphs: the first uses a chronological structure to tell what they did, and the second uses a cause and effect or problem and solution structure to explain why it mattered. Use at least three signal words.",
      rubric: [
        "First paragraph tells events in time order with dates or time words",
        "Second paragraph clearly uses cause and effect or problem and solution",
        "States at least one main idea supported by details",
        "Uses at least three signal words correctly (because, consequently, however...)",
        "Facts are accurate and come from the sources",
      ],
    },
  },
  // 6. Multiple accounts, multiple sources, reasons and evidence, summarizing speakers
  {
    id: "ela-5.sources",
    title: "Many Voices, One Event: Apollo 11 and Using Sources",
    minutes: 35,
    stage: "logic",
    standards: ["RI.5.6", "RI.5.7", "RI.5.8", "RI.5.9", "SL.5.2", "SL.5.3"],
    read: [
      "On July 20, 1969, the lunar module Eagle landed on the Moon. Neil Armstrong radioed, \"Houston, Tranquility Base here. The Eagle has landed.\" A few hours later he stepped onto the dusty surface and said, \"That's one small step for man, one giant leap for mankind.\" Buzz Aldrin followed him. Their crewmate, Michael Collins, stayed in the command module Columbia, circling the Moon alone.",
      "Each person saw the same event differently. Armstrong and Aldrin saw gray dust, sharp shadows and a black sky. Aldrin called the view \"magnificent desolation.\" Collins could not see the landing at all; he listened on the radio and waited for his friends to return. In Houston, the flight controllers at Mission Control had been holding their breath. When Eagle landed, they radioed back, \"We're breathing again.\" Millions of families watched grainy black-and-white pictures on television at home. These are different accounts of the same event, and each point of view shows something the others cannot.",
      "When you research a question, use more than one source. To answer \"How did Apollo 11 get home safely?\" you might read an encyclopedia article, look at a NASA timeline and read part of Collins's memoir. Then put the information together. Each source fills a gap the others leave.",
      "Authors who make a point support it with reasons and evidence. A reason tells why. Evidence is a fact, number, example or quotation that proves the reason. An author might argue that practice made Apollo 11 succeed. One reason: earlier missions tested every step. Evidence: Apollo 8 first circled the Moon in December 1968, and Apollo 10 flew a lunar module close to the surface without landing in May 1969.",
      "Listening works the same way. When you hear a speech or watch a video, summarize the main points and notice which reasons and evidence support each one.",
    ].join("\n\n"),
    keyIdeas: [
      "Different accounts of the same event show different points of view; compare what each one shows.",
      "Use several sources and combine them to answer a research question.",
      "Authors support points with reasons, and reasons with evidence.",
      "When listening, summarize the speaker's points and the evidence for each.",
    ],
    hook: {
      text: "Three men flew to the Moon together. Two walked on it. One never touched it at all. If you asked each of them, \"What was it like?\" you'd get three very different answers. And all three would be true.",
    },
    teach: [
      {
        title: "Different Accounts of the Same Event",
        teach:
          "An account is a description of an event. A firsthand account comes from someone who was there. A secondhand account comes from someone who learned about it later, like a historian or a reporter. During Apollo 11, Neil Armstrong and Buzz Aldrin walked on the Moon and described dust, shadows and a black sky. Michael Collins circled overhead in Columbia and couldn't see them; his account is about waiting and listening on the radio. The flight controllers in Houston describe the tension of the landing. A textbook written years later gives dates and facts but no feelings. Comparing accounts shows what each point of view notices and what it misses.",
        visual: {
          type: "hotspots",
          title: "Who saw what on July 20, 1969",
          center: "Apollo 11",
          spots: [
            { label: "Armstrong", icon: "👨‍🚀", detail: "First to step onto the Moon. Described the fine, powdery surface." },
            { label: "Aldrin", icon: "🌑", detail: "Walked beside Armstrong. Called the view \"magnificent desolation.\"" },
            { label: "Collins", icon: "🛰️", detail: "Circled the Moon alone in Columbia. Heard the landing on the radio." },
            { label: "Mission Control", icon: "🖥️", detail: "Flight controllers in Houston: \"We're breathing again.\"" },
            { label: "Families at home", icon: "📺", detail: "Watched grainy black-and-white TV pictures." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each account to the detail it could best tell you.",
          pairs: [
            { left: "Neil Armstrong", right: "How the Moon's dust felt underfoot" },
            { left: "Michael Collins", right: "What it was like to orbit the Moon alone" },
            { left: "A flight controller in Houston", right: "How tense the room was during the landing" },
            { left: "A history book written years later", right: "Exact dates and the whole mission's timeline" },
          ],
          hint: "Ask where each person was and what they could see, hear or know.",
          seconds: 45,
        },
        think: {
          q: "Why can't Michael Collins's account describe the Moon's surface up close?",
          choices: ["He wasn't on the mission", "He stayed in Columbia, circling above the Moon", "He was asleep", "He was in Houston"],
          answer: 1,
          why: "Collins orbited in the command module, so he never walked on the surface.",
          hints: [
            "He was one of the three Apollo 11 astronauts.",
            "",
            "The text says he listened on the radio and waited. Where was he?",
            "Houston is where Mission Control was. Collins was in space.",
          ],
        },
        approaches: {
          analogy:
            "It's like a soccer game. The goalie, a fan in the stands and the sports reporter all saw the same goal, but each tells it differently, and each notices something the others missed.",
          example:
            "Firsthand: \"I felt the ground shake as the rocket lifted off.\" Secondhand: \"Apollo 11 launched on July 16, 1969, from Florida.\" The first has feelings and senses; the second has facts and dates.",
          simpler: {
            q: "A firsthand account comes from:",
            choices: ["Someone who was there", "Someone who read about it later", "A made-up story"],
            answer: 0,
            why: "Firsthand means the writer saw or did it.",
            hints: ["", "That's secondhand.", "Accounts are true descriptions, not made-up stories."],
          },
        },
      },
      {
        title: "Using Several Sources",
        teach:
          "Good researchers don't trust just one source. They check several and combine what they find. Suppose your question is, \"How did the Apollo 11 astronauts get home?\" An encyclopedia might explain that Eagle lifted off the Moon and joined Columbia in orbit. A NASA timeline gives the date: the capsule splashed down in the Pacific Ocean on July 24, 1969. Collins's memoir describes how glad he was to see Eagle rise to meet him. Put together, you can answer fully: what happened, when, and how it felt. Choose trustworthy sources, like museums, NASA, encyclopedias and books by people who were there, and notice when sources agree.",
        visual: {
          type: "compare",
          left: { title: "One source", points: ["Might leave out key facts", "Might have a mistake", "Shows one point of view", "Gives a partial answer"] },
          right: { title: "Several sources", points: ["Fill each other's gaps", "Let you check facts", "Show more points of view", "Give a full, strong answer"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps for answering a research question in order.",
          steps: [
            "Write a clear question.",
            "Find several trustworthy sources.",
            "Take notes on what each source says.",
            "Compare the sources and check that facts agree.",
            "Combine the information to write or tell your answer.",
          ],
          hint: "You need a question before you search, and notes before you can combine.",
          seconds: 40,
        },
        think: {
          q: "Why use more than one source?",
          choices: [
            "To copy more words",
            "Because one source is always wrong",
            "To fill gaps and check that facts agree",
            "To make the project take longer",
          ],
          answer: 2,
          why: "Several sources give a fuller answer and let you double-check facts.",
          hints: [
            "Copying isn't the goal. Combining and checking is.",
            "One source can be right; using more helps you check it and fill gaps.",
            "",
            "Time isn't the point. A better answer is.",
          ],
        },
        approaches: {
          analogy:
            "Using several sources is like doing a jigsaw puzzle with pieces from different boxes. Each box has some pieces; only together do you see the whole picture.",
          example:
            "Question: How tall is the Statue of Liberty? An encyclopedia, the National Park Service website and a library book all give about 305 feet from the ground to the torch. Three sources agree, so you can trust it.",
          simpler: {
            q: "Which is a trustworthy source about Apollo 11?",
            choices: ["NASA's history website", "A random comment online", "A cartoon about aliens"],
            answer: 0,
            why: "NASA ran the mission and keeps careful records.",
            hints: ["", "Anyone can write a comment; it may be wrong.", "A cartoon is made up for fun, not for facts."],
          },
        },
      },
      {
        title: "Reasons and Evidence",
        teach:
          "When authors make a point, they back it up. A reason tells why the point is true. Evidence proves the reason, with facts, numbers, examples or quotations. Imagine an author's point: Careful practice made Apollo 11 a success. Reason one: earlier missions tested every step first. Evidence: Apollo 8 circled the Moon in December 1968, and Apollo 10 flew a lunar module close to the surface in May 1969 without landing. Reason two: the astronauts trained for months. Evidence: they practiced landings in simulators on Earth. When you read, match each piece of evidence to the reason it supports. Some sentences are interesting but don't support the point at all.",
        visual: {
          type: "hotspots",
          title: "How an argument is built",
          center: "Point",
          spots: [
            { label: "Point", icon: "📌", detail: "What the author wants you to believe: Careful practice made Apollo 11 a success." },
            { label: "Reason", icon: "💭", detail: "Why it's true: Earlier missions tested every step." },
            { label: "Evidence", icon: "📊", detail: "Proof: Apollo 10 flew a lunar module close to the Moon without landing." },
            { label: "Not support", icon: "🚫", detail: "Interesting but off topic: The Moon is about 240,000 miles away." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "The author's point: Careful practice made Apollo 11 a success. Sort each sentence.",
          buckets: ["Reason", "Evidence", "Doesn't support the point"],
          items: [
            { text: "Earlier missions tested each step first.", bucket: 0 },
            { text: "The astronauts trained for months.", bucket: 0 },
            { text: "Apollo 10 flew a lunar module close to the Moon without landing.", bucket: 1 },
            { text: "The crew practiced landings in simulators on Earth.", bucket: 1 },
            { text: "Apollo 8 circled the Moon in December 1968.", bucket: 1 },
            { text: "The Moon has no air.", bucket: 2 },
            { text: "Some people like to look at the Moon with telescopes.", bucket: 2 },
          ],
          hint: "A reason gives a general why. Evidence is a specific fact or example that proves the reason.",
          seconds: 55,
        },
        think: {
          q: "Which is EVIDENCE rather than a reason?",
          choices: [
            "Earlier missions tested every step.",
            "Practice helps people succeed.",
            "Apollo 10 flew close to the Moon in May 1969 without landing.",
            "The astronauts were well prepared.",
          ],
          answer: 2,
          why: "It's a specific fact with a date, which proves a reason.",
          hints: [
            "That's a reason: a general why. Evidence names a specific fact.",
            "That's a general idea, not proof.",
            "",
            "That's a reason. Look for a specific fact with a name or date.",
          ],
        },
        approaches: {
          analogy:
            "A point is a roof, reasons are the walls, and evidence is the foundation under the walls. Without evidence, the whole house wobbles.",
          example:
            "Point: Reading every day makes you a stronger reader. Reason: Practice builds skill. Evidence: Pat read 20 minutes a day all summer and could read longer books by fall.",
          simpler: {
            q: "What does a reason do?",
            choices: ["Tells why the point is true", "Tells a joke", "Repeats the title"],
            answer: 0,
            why: "A reason explains why the author's point is true.",
            hints: ["", "Jokes don't support an argument.", "Repeating the title doesn't prove anything."],
          },
        },
      },
      {
        title: "Summarizing What You Hear and See",
        teach:
          "Not all information comes from books. You also learn from speeches, videos, charts and pictures. To summarize something you hear, listen for the speaker's main points. Speakers often signal them: \"My first point is,\" \"Another reason,\" \"In conclusion.\" Jot short notes. Then notice how each point is supported. Did the speaker give facts, examples or a quotation? Or just opinion? For a chart or picture, ask: What is it mostly showing? Imagine a museum guide who says the Saturn V was the most powerful rocket of its time, and backs it up by saying it stood about 363 feet tall. A good summary would say: The guide claimed Saturn V was very powerful and supported it with its huge size.",
        visual: {
          type: "flip",
          cards: [
            { front: "Listen for signals", back: "\"First,\" \"Another reason,\" \"Most important,\" \"In conclusion.\"" },
            { front: "Jot notes", back: "Short words and phrases, not every word." },
            { front: "Check support", back: "For each point: what facts, examples or quotations back it up?" },
            { front: "Summarize", back: "The main points and their support, in your own words, briefly." },
          ],
        },
        probe: {
          type: "cloze",
          text: "To summarize a speech, listen for the speaker's main {0}. Then notice the {1} that supports each one. A summary is {2} than the speech and uses your own {3}.",
          blanks: [{ answers: ["points"] }, { answers: ["evidence"] }, { answers: ["shorter"] }, { answers: ["words"] }],
          bank: ["points", "evidence", "shorter", "words", "longer", "jokes", "pictures"],
          hint: "A summary keeps only the big points and their support, in fewer, fresh words.",
          mistakes: [
            { match: "longer", coach: "A summary is shorter than the original. It keeps only what matters most." },
            { match: "jokes", coach: "Jokes may be fun, but you listen for the main points." },
          ],
          seconds: 40,
        },
        think: {
          q: "A speaker says, \"In conclusion...\" What should you listen for?",
          choices: ["A new joke", "The start of the speech", "A list of names", "A restating of the main points"],
          answer: 3,
          why: "\"In conclusion\" signals the speaker is wrapping up the main points.",
          hints: [
            "Conclusion means the end, where speakers review big ideas.",
            "Conclusion means the end, not the start.",
            "The conclusion usually sums up points, not names.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Summarizing a speech is like packing for a trip with one small bag. You take only what you really need: the main points and the best proof.",
          example:
            "A coach says, \"We should warm up before every game. First, warm muscles stretch farther. Second, last season we had fewer injuries when we warmed up.\" Summary: The coach says to warm up, because it helps muscles and cut injuries last season.",
          simpler: {
            q: "What is a summary?",
            choices: ["Every word repeated", "The main points, short and in your own words", "Your opinion only"],
            answer: 1,
            why: "A summary is short and gives the main points in your words.",
            hints: ["Repeating every word is copying, not summarizing.", "", "A summary reports the speaker's points, not just your opinion."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each detail about Apollo 11: firsthand account or secondhand account?",
      buckets: ["Firsthand (someone who was there)", "Secondhand (learned it later)"],
      items: [
        { text: "Aldrin: the view was \"magnificent desolation.\"", bucket: 0 },
        { text: "Armstrong: \"The Eagle has landed.\"", bucket: 0 },
        { text: "Mission Control: \"We're breathing again.\"", bucket: 0 },
        { text: "A textbook: Apollo 11 launched on July 16, 1969.", bucket: 1 },
        { text: "An encyclopedia article about the mission", bucket: 1 },
        { text: "A report written by a student today", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain why reading several accounts and sources about one event, like the Moon landing, gives you a better understanding than reading just one. Then explain how an author uses reasons and evidence.",
      keyPoints: [
        "Different accounts show different points of view",
        "Each account notices things the others miss",
        "Several sources fill gaps and let you check facts",
        "A reason tells why a point is true",
        "Evidence like facts and examples proves the reason",
      ],
    },
    mastery: [
      {
        type: "sequence",
        prompt: "Put these Apollo missions in order, from first to last.",
        steps: [
          "Apollo 8 circles the Moon (December 1968).",
          "Apollo 10 flies a lunar module close to the Moon without landing (May 1969).",
          "Apollo 11's Eagle lands on the Moon (July 20, 1969).",
          "The Apollo 11 crew splashes down in the Pacific (July 24, 1969).",
        ],
        hint: "Each mission tested a step before the next one. Use the dates.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Point: Kids should learn to swim. Sort each sentence.",
        buckets: ["Reason", "Evidence", "Doesn't support the point"],
        items: [
          { text: "Swimming keeps you safer around water.", bucket: 0 },
          { text: "Swimming is great exercise.", bucket: 0 },
          { text: "A swimmer who falls into a pool can float and reach the edge.", bucket: 1 },
          { text: "Swimming works the arms, legs and heart at the same time.", bucket: 1 },
          { text: "Pools are usually painted blue.", bucket: 2 },
        ],
        hint: "Reasons tell why; evidence gives a specific fact or example; the off-topic one doesn't help.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "An account from someone who was there is a {0} account. An account from someone who learned about it later is a {1} account. Using {2} sources helps you check facts.",
        blanks: [{ answers: ["firsthand", "first-hand"] }, { answers: ["secondhand", "second-hand"] }, { answers: ["several", "many", "multiple"] }],
        bank: ["firsthand", "secondhand", "several", "fiction", "one"],
        hint: "Firsthand: you were there. Secondhand: you heard or read about it.",
        mistakes: [{ match: "one", coach: "One source can't be checked against anything. Use several." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each Apollo 11 crew member to where he was during the Moon walk.",
        pairs: [
          { left: "Neil Armstrong", right: "First to step onto the Moon" },
          { left: "Buzz Aldrin", right: "Second to step onto the Moon" },
          { left: "Michael Collins", right: "Orbiting the Moon in Columbia" },
        ],
        hint: "Two walked; one stayed in the command module.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which is a FIRSTHAND account of the Moon landing?",
        choices: ["A 2019 magazine article", "Buzz Aldrin describing the view", "Your history textbook"],
        answer: 1,
        why: "Aldrin was there, so his account is firsthand.",
      },
      {
        q: "What is evidence?",
        choices: ["The author's opinion", "The title of a book", "A fact, example or quotation that proves a reason", "A question"],
        answer: 2,
        why: "Evidence proves a reason with specifics.",
      },
      {
        q: "On what date did Eagle land on the Moon?",
        choices: ["July 4, 1776", "December 17, 1903", "July 20, 1969", "July 24, 1969"],
        answer: 2,
        why: "Eagle landed on July 20, 1969. (The crew splashed down on July 24.)",
      },
      {
        q: "Why combine information from several texts?",
        choices: ["To get a fuller, checked answer", "To make your writing longer", "To avoid reading carefully"],
        answer: 0,
        why: "Each source adds and confirms information.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Ask two family members to each describe the same event they both remember (a trip, a storm, a holiday). Take notes on each account. Then tell a parent: what both accounts agree on, one thing only the first person noticed, one thing only the second noticed, and why their points of view were different.",
      rubric: [
        "Takes notes on two separate accounts of the same event",
        "Names details both accounts share",
        "Names a detail unique to each account",
        "Explains how each person's point of view shaped what they noticed",
      ],
    },
  },
  // 7. Grammar and conventions: conjunctions, perfect tenses, commas, titles, sentence craft
  {
    id: "ela-5.sentence-craft",
    title: "Sentence Craft: Conjunctions, Verb Tenses and Commas",
    minutes: 35,
    stage: "grammar",
    standards: ["L.5.1", "L.5.2", "L.5.3"],
    read: [
      "Grammar is the set of tools writers use to build clear sentences. Let's open the toolbox.",
      "Conjunctions join words and ideas. And, but, or and so join equal parts. Because, although and when join an idea to a reason or a time. Some conjunctions come in pairs, called correlative conjunctions: either and or, neither and nor, both and and, not only and but also. For example: Neither the map nor the compass was in the chest. Prepositions, like under, across, during and beside, show how a noun relates to the rest of the sentence: The treasure was buried under the tall tree. Interjections show sudden feeling: Wow! Oh no! Hooray!",
      "Verbs tell time. The perfect tenses use a helping verb (has, have, had or will have) with a past participle. The present perfect says something happened at an unknown time before now: I have read that book. The past perfect says something happened before another past event: By 1903, the Wrights had tested many gliders. The future perfect says something will be finished by a certain time: By Friday, I will have finished my report. Keep tenses steady. Don't write \"Jim opened the chest and finds a map.\" Write \"Jim opened the chest and found a map.\"",
      "Commas help readers pause in the right places. Use them in a series (sand, shells, and seaweed), after an introductory word or phrase (After the storm, we walked on the beach), to set off yes and no (Yes, I'll help), with a tag question (It's cold, isn't it?) and when speaking to someone by name (Jim, look at this map!).",
      "Titles need special marks. Italicize or underline long works, like the book Treasure Island. Put short works, like the poem \"My Shadow,\" in quotation marks.",
      "Finally, strong writers shape sentences. They expand short ones with details, combine choppy ones, and cut extra words. They check spelling with patterns they know and a dictionary.",
    ].join("\n\n"),
    keyIdeas: [
      "Conjunctions join ideas; correlative pairs include either/or, neither/nor, both/and and not only/but also.",
      "Perfect tenses use has, have, had or will have; keep verb tenses steady.",
      "Commas go in a series, after introductions, with yes and no, tag questions and names of people you speak to.",
      "Italicize or underline long titles; put short titles in quotation marks.",
    ],
    hook: {
      text: "Read these two sentences out loud. \"Let's eat, Grandpa!\" \"Let's eat Grandpa!\" One little comma is all that stands between a family dinner and a disaster. Grammar isn't just rules. It's how we say exactly what we mean.",
    },
    teach: [
      {
        title: "Conjunctions, Prepositions and Interjections",
        teach:
          "Conjunctions are joining words. Coordinating conjunctions like and, but, or and so join equal ideas: The crow was thirsty, so he looked for water. Subordinating conjunctions like because, although and when join an idea to a reason, contrast or time: Although the pitcher was heavy, the crow did not give up. Correlative conjunctions come in pairs: either...or, neither...nor, both...and, not only...but also, and whether...or. Example: Not only did Jim find the map, but he also kept it safe. Prepositions show where or when: under the tree, across the sea, during the storm. Interjections burst out with feeling: Hooray! Oh no! Wow! They often end with an exclamation point.",
        visual: {
          type: "hotspots",
          title: "Little words with big jobs",
          center: "Joiners",
          spots: [
            { label: "Coordinating", icon: "🔗", detail: "and, but, or, so, yet, for, nor: join equal ideas." },
            { label: "Subordinating", icon: "🪝", detail: "because, although, when, if, since: join an idea to a reason or time." },
            { label: "Correlative", icon: "👯", detail: "Pairs: either/or, neither/nor, both/and, not only/but also, whether/or." },
            { label: "Prepositions", icon: "📍", detail: "under, across, during, beside, after: show where or when." },
            { label: "Interjections", icon: "❗", detail: "Wow! Oh no! Hooray! Show sudden feeling." },
          ],
        },
        probe: {
          type: "cloze",
          text: "{0} Jim nor the doctor trusted Silver. You can {1} read the book or listen to the audiobook. The Wrights were {2} inventors and bicycle makers. The map was hidden {3} the bottom of the chest.",
          blanks: [{ answers: ["neither"] }, { answers: ["either"] }, { answers: ["both"] }, { answers: ["at"] }],
          bank: ["Neither", "either", "both", "at", "because", "wow"],
          hint: "Find each pair: neither goes with nor, either with or, both with and.",
          mistakes: [
            { match: "because", coach: "Because joins a reason. These sentences need the partner of nor, or or and." },
            { match: "wow", coach: "Wow is an interjection that shows feeling. Look for the partner word in each pair." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which sentence uses a correlative conjunction pair correctly?",
          choices: ["Either we sail today or we wait for good wind.", "Neither the cook or the captain spoke.", "Both Jim but Silver searched.", "Not only the map and the compass."],
          answer: 0,
          why: "Either goes with or, and the sentence is complete.",
          hints: [
            "",
            "Neither must pair with nor, not or.",
            "Both pairs with and, not but.",
            "Not only pairs with but also, and this isn't a full sentence.",
          ],
        },
        approaches: {
          analogy:
            "Correlative conjunctions are like a pair of shoes. Neither goes with nor, and either goes with or. Wearing one of each looks wrong.",
          example:
            "Both the hare and the tortoise entered the race. Neither the fox nor the crow shared. You may have either soup or salad. Each pair is matched.",
          simpler: {
            q: "Which word pairs with neither?",
            choices: ["nor", "or", "and"],
            answer: 0,
            why: "The pair is neither...nor.",
            hints: ["", "Or pairs with either.", "And pairs with both."],
          },
        },
      },
      {
        title: "Perfect Tenses and Steady Time",
        teach:
          "The perfect tenses show that one action is finished in relation to another time. They use has, have, had or will have plus a past participle. Present perfect: I have visited the museum twice. It happened before now, at no exact time. Past perfect: By the time help arrived, the crow had already filled the pitcher with pebbles. One past action finished before another. Future perfect: By June, we will have read nine books. It will be finished by a certain time. Also watch for tense shifts. If a story starts in the past, keep it in the past. Wrong: Alice opened the door and sees a garden. Right: Alice opened the door and saw a garden.",
        visual: {
          type: "compare",
          left: { title: "Perfect tense", points: ["Present perfect: have walked", "Past perfect: had walked", "Future perfect: will have walked", "Shows an action finished by a time"] },
          right: { title: "Tense shift (fix it!)", points: ["Wrong: He ran and jumps.", "Right: He ran and jumped.", "Wrong: She opens it and gasped.", "Right: She opened it and gasped."] },
        },
        probe: {
          type: "cloze",
          text: "By 1903, the Wrights {0} tested many gliders. I {1} read Treasure Island two times. By next summer, she {2} learned to swim. Alice opened the door and {3} a garden.",
          blanks: [{ answers: ["had"] }, { answers: ["have"] }, { answers: ["will have"] }, { answers: ["saw"] }],
          bank: ["had", "have", "will have", "saw", "sees", "has been"],
          hint: "Past before past: had. Before now: have. Finished by a future time: will have. Keep the last sentence in the past.",
          mistakes: [
            { match: "sees", coach: "Opened is past tense, so the second verb should be past too: saw." },
            { match: "has been", coach: "Has been doesn't fit here. Think: had, have or will have plus the verb." },
          ],
          seconds: 50,
        },
        think: {
          q: "Which sentence uses the past perfect tense?",
          choices: ["I walk to school.", "I will walk to school.", "I had walked a mile before the rain began.", "I am walking to school."],
          answer: 2,
          why: "Had walked shows one past action finished before another (the rain).",
          hints: [
            "That's simple present.",
            "That's simple future.",
            "",
            "That's present progressive, happening now.",
          ],
        },
        approaches: {
          analogy:
            "Perfect tenses are like bookmarks in time. Had marks a spot before another past moment, have marks before now, and will have marks a finish line in the future.",
          example:
            "Before Armstrong stepped out, the crew had checked their suits. (past perfect) NASA has studied the Moon for decades. (present perfect) By 2030, you will have finished high school. (future perfect)",
          simpler: {
            q: "\"Jim found the map and ___ it to the doctor.\" Which verb keeps the tense steady?",
            choices: ["shows", "showed", "will show"],
            answer: 1,
            why: "Found is past, so showed (past) keeps the tense steady.",
            hints: ["Shows is present. Found is past, so match it.", "", "Will show is future. Match the past tense of found."],
          },
        },
      },
      {
        title: "Commas and Titles",
        teach:
          "Commas tell readers where to pause. Use a comma between items in a series: We packed bread, cheese, and apples. Use one after an introductory word or phrase: After the long voyage, the crew rested. Use one to set off yes and no: Yes, the map is real. Use one before a tag question, a short question added to the end: You read the poem, didn't you? Use commas for direct address, when you speak to someone by name: Grandpa, tell us a story. Titles have rules too. Italicize long works, like books, movies and ships, or underline them when you write by hand: Treasure Island. Put short works, like poems, songs, stories and chapters, in quotation marks: \"The Village Blacksmith.\"",
        visual: {
          type: "flip",
          cards: [
            { front: "Series", back: "We packed bread, cheese, and apples." },
            { front: "Introductory part", back: "After the long voyage, the crew rested." },
            { front: "Yes / No", back: "Yes, the map is real." },
            { front: "Tag question", back: "You read the poem, didn't you?" },
            { front: "Direct address", back: "Grandpa, tell us a story." },
            { front: "Titles", back: "Long works in italics (Treasure Island); short works in quotation marks (\"My Shadow\")." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Why does each sentence need its comma?",
          buckets: ["Series", "Introductory part", "Yes/no or tag question", "Direct address"],
          items: [
            { text: "We saw gulls, crabs, and seals.", bucket: 0 },
            { text: "She packed a map, a compass, and a lantern.", bucket: 0 },
            { text: "During the storm, the ship rocked.", bucket: 1 },
            { text: "Finally, the treasure was found.", bucket: 1 },
            { text: "No, I haven't finished.", bucket: 2 },
            { text: "That was a great story, wasn't it?", bucket: 2 },
            { text: "Jim, bring the lantern.", bucket: 3 },
            { text: "Thank you, Doctor.", bucket: 3 },
          ],
          hint: "A list is a series. A word or phrase that leads in is introductory. A name you speak to is direct address.",
          seconds: 60,
        },
        think: {
          q: "Which title should be in quotation marks rather than italics?",
          choices: ["Treasure Island (a novel)", "\"The Land of Counterpane\" (a poem)", "Robinson Crusoe (a novel)", "Alice's Adventures in Wonderland (a book)"],
          answer: 1,
          why: "Poems are short works, so their titles go in quotation marks.",
          hints: [
            "A novel is a long work, so it's italicized.",
            "",
            "A novel is long, so it's italicized.",
            "A whole book is italicized.",
          ],
        },
        approaches: {
          analogy:
            "Commas are like the little pauses a good storyteller takes. Without them, words crash into each other, like cars with no space between them.",
          example:
            "Without commas: \"Yes Mom I packed socks shirts and a toothbrush didn't I\" With commas: \"Yes, Mom, I packed socks, shirts, and a toothbrush, didn't I?\" Now it's easy to read.",
          simpler: {
            q: "Where does the comma go? \"Sam please close the door.\"",
            choices: ["After Sam", "After please", "After close"],
            answer: 0,
            why: "Sam is the person spoken to, so a comma follows the name.",
            hints: ["", "The comma sets off the name of the person you're talking to.", "That would split the verb from its object."],
          },
        },
      },
      {
        title: "Shaping Sentences and Spelling",
        teach:
          "Writers shape sentences for meaning, interest and style. Expand a short sentence with details: The ship sailed. becomes The old ship sailed across the stormy sea at dawn. Combine choppy sentences: The crow was thirsty. The crow found a pitcher. becomes The thirsty crow found a pitcher. Reduce wordy sentences: In my personal opinion, I think that becomes I think. Spelling matters too, because mistakes distract readers. Use patterns you know. Drop the silent e before adding ing: hope, hoping. Double the last consonant of a short word: stop, stopped. Change y to i before es: city, cities. When unsure, check a dictionary.",
        visual: {
          type: "hotspots",
          title: "Three ways to shape a sentence",
          center: "Sentence",
          spots: [
            { label: "Expand", icon: "➕", detail: "Add who, what, where, when, how: The old ship sailed across the stormy sea at dawn." },
            { label: "Combine", icon: "🤝", detail: "Join choppy sentences: The thirsty crow found a pitcher." },
            { label: "Reduce", icon: "✂️", detail: "Cut extra words: In my personal opinion, I think... becomes I think..." },
            { label: "Spell-check", icon: "🔤", detail: "hope → hoping, stop → stopped, city → cities." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Combine these into one sentence: The crow was thirsty. The crow was clever. The crow dropped pebbles into the pitcher.",
          tiles: ["The", "thirsty,", "clever", "crow", "dropped", "pebbles", "into the pitcher."],
          distractors: ["was", "because"],
          hint: "Put both describing words before crow, then tell what the crow did.",
          seconds: 40,
        },
        think: {
          q: "Which sentence is the best combination of \"Jim found a map. The map was old. It was in a chest.\"?",
          choices: [
            "Jim found a map, and the map was old, and it was in a chest.",
            "Jim found an old map in a chest.",
            "Map old chest Jim.",
            "Jim found. A map in a chest.",
          ],
          answer: 1,
          why: "It keeps every idea in one smooth sentence with no extra words.",
          hints: [
            "Stringing ideas with and, and, and is wordy. Try to tuck old in front of map.",
            "",
            "That isn't a sentence. It's just words.",
            "Jim found is incomplete. Keep it as one sentence.",
          ],
        },
        approaches: {
          analogy:
            "Shaping sentences is like a sculptor with clay. Sometimes you add clay (expand), sometimes you press two pieces together (combine), and sometimes you carve some away (reduce).",
          example:
            "Choppy: The Wrights built a plane. They tested it. It flew. Combined: The Wrights built and tested a plane, and it flew. Expanded: The Wrights built and tested a wooden plane, and on December 17, 1903, it flew.",
          simpler: {
            q: "How do you spell hope + ing?",
            choices: ["hopeing", "hoping", "hopping"],
            answer: 1,
            why: "Drop the silent e before adding ing: hoping.",
            hints: ["Drop the silent e before ing.", "", "Hopping comes from hop, a different word."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap EVERY sentence that is written correctly.",
      sentences: [
        "Neither the hare nor the tortoise wanted to lose.",
        "Yes, I have read \"The Village Blacksmith.\"",
        "Alice opened the bottle and drinks it.",
        "After the storm the crew rested.",
        "Jim, did you find the map?",
        "Either Jim and Silver will find the gold.",
      ],
      correct: [0, 1, 4],
    },
    explain: {
      prompt: "Teach a younger friend three grammar tools from this lesson: one about conjunctions, one about verb tenses and one about commas. Give an example for each.",
      keyPoints: [
        "Correlative conjunctions come in pairs like either or and neither nor",
        "Perfect tenses use has, have, had or will have",
        "Keep verb tenses steady and don't shift",
        "Commas go in a series, after introductions, with yes or no, tag questions or names",
        "Long titles in italics, short titles in quotation marks",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each word to its part of speech.",
        pairs: [
          { left: "although", right: "Conjunction" },
          { left: "beneath", right: "Preposition" },
          { left: "Hooray!", right: "Interjection" },
          { left: "had finished", right: "Past perfect verb" },
        ],
        hint: "Joining word, where-word, feeling word, and a verb with had.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "By the end of the year, I {0} written ten stories. Not only did Collins fly to the Moon, {1} he also wrote a book about it. The book Treasure Island goes in {2}, but the poem \"My Shadow\" goes in quotation {3}.",
        blanks: [{ answers: ["will have"] }, { answers: ["but"] }, { answers: ["italics"] }, { answers: ["marks"] }],
        bank: ["will have", "but", "italics", "marks", "had", "and", "commas"],
        hint: "Future finish line: will have. Not only pairs with but also. Long works get italics.",
        mistakes: [
          { match: "had", coach: "By the end of the year is in the future, so use will have." },
          { match: "and", coach: "Not only pairs with but also." },
        ],
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "Sort each title: italics (long work) or quotation marks (short work)?",
        buckets: ["Italics or underline", "Quotation marks"],
        items: [
          { text: "Treasure Island (novel)", bucket: 0 },
          { text: "Poor Richard's Almanack (book)", bucket: 0 },
          { text: "Hispaniola (ship)", bucket: 0 },
          { text: "\"My Shadow\" (poem)", bucket: 1 },
          { text: "\"The Crow and the Pitcher\" (short fable)", bucket: 1 },
          { text: "\"America the Beautiful\" (song)", bucket: 1 },
        ],
        hint: "Books and ships are long or big; poems, songs and short stories are short works.",
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build the sentence with commas in the right places: speak to Grandpa, then add a tag question.",
        tiles: ["Grandpa,", "that story", "was wonderful,", "wasn't it?"],
        distractors: ["Grandpa", "wonderful"],
        hint: "A comma follows the name you're speaking to, and another comes before the tag question.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which sentence has a tense shift error?",
        choices: ["The crow drank and flew away.", "Jim hid in the barrel and listens.", "Alice ran and fell.", "We read and laughed."],
        answer: 1,
        why: "Hid is past but listens is present. It should be listened.",
      },
      {
        q: "Which sentence uses commas correctly?",
        choices: ["Yes I'll come.", "We need eggs milk, and bread.", "After lunch, we read a fable."],
        answer: 2,
        why: "A comma follows the introductory phrase After lunch.",
      },
      {
        q: "\"By noon, we ___ hiked five miles.\" Which completes the future perfect?",
        choices: ["will have", "had", "have", "are"],
        answer: 0,
        why: "Future perfect uses will have.",
      },
      {
        q: "Which is the best way to reduce this sentence? \"In my own personal opinion, I think dogs are good pets.\"",
        choices: ["In my opinion, I personally think dogs are good pets.", "I think dogs are good pets.", "Dogs, in my own personal opinion I think, are good pets."],
        answer: 1,
        why: "It says the same thing without extra words.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Write a short letter (6-8 sentences) to a grandparent or friend about a book you've read. Include: a correlative conjunction pair, a perfect tense verb, a comma after an introductory phrase, a comma for direct address, a tag question, and the book's title written correctly. Underline each one.",
      rubric: [
        "Uses a correlative conjunction pair correctly",
        "Uses a perfect tense verb correctly",
        "Places commas correctly for an introductory phrase, direct address and a tag question",
        "Writes the title correctly (italics, underline or quotation marks)",
        "Keeps verb tenses steady with correct spelling",
      ],
    },
  },
  // 8. Writing: opinion, informative and narrative, with planning and revising
  {
    id: "ela-5.writing",
    title: "The Writer's Workshop: Opinion, Informative and Story Writing",
    minutes: 35,
    stage: "rhetoric",
    standards: ["W.5.1", "W.5.2", "W.5.3", "W.5.4", "W.5.5", "W.5.10"],
    read: [
      "Writers write for many reasons. Fifth graders practice three big kinds of writing.",
      "Opinion writing tries to convince the reader. Start by stating your opinion clearly. Give reasons in a logical order, and back each one with facts and details. Link your ideas with words such as consequently, specifically and for instance. End with a conclusion that sums up your opinion. For example: Every family should keep a small vegetable garden. First, a garden teaches patience, because seeds take weeks to grow. Second, it gives fresh food. Consequently, families eat more vegetables. In conclusion, a garden grows both food and good habits.",
      "Informative writing teaches the reader about a topic. Introduce the topic, then group related facts together, sometimes under headings. Use facts, definitions, examples and quotations, and choose precise words, like propeller instead of spinning thing. Connect ideas with transitions such as in contrast, especially and in addition. Finish with a conclusion that ties the ideas together.",
      "Narrative writing tells a story, real or imagined. Set the scene and introduce the narrator and characters. Use dialogue so characters can speak, and description so readers can see, hear, smell and feel the scene. Control the pacing: slow down at exciting moments and speed through boring ones. Use time words like meanwhile, later that night and the next morning. End with a conclusion that shows how things turned out.",
      "No writer gets it perfect the first time. Good writing happens in steps. Plan by listing ideas. Draft without worrying about mistakes. Revise by improving ideas, order and word choice. Edit by fixing spelling, capitals and punctuation. Then publish, or share it. Ask a parent or friend for suggestions, and don't be afraid to try a new approach. Always think about your task, your purpose and your audience. And write often, both quick pieces in one sitting and longer projects over days.",
    ].join("\n\n"),
    keyIdeas: [
      "Opinion writing states an opinion, gives ordered reasons with evidence, uses linking words and concludes.",
      "Informative writing introduces a topic, groups facts, uses precise words and transitions, and concludes.",
      "Narrative writing uses a narrator, dialogue, description, pacing, time words and a conclusion.",
      "Good writing goes through planning, drafting, revising, editing and publishing.",
    ],
    hook: {
      text: "Benjamin Franklin taught himself to write. He read essays he admired, set them aside, then tried to rewrite them from memory. He compared his version with the original and fixed his mistakes. Practice, compare, revise. That's the secret every good writer knows.",
    },
    teach: [
      {
        title: "Opinion Writing",
        teach:
          "In opinion writing, you try to convince your reader. Begin with an introduction that states your opinion clearly: Every family should keep a small vegetable garden. Then give reasons in a logical order, each backed by facts or details. First, a garden teaches patience, because seeds take weeks to sprout and grow. Second, it gives the family fresh food. Linking words connect your opinion and reasons: consequently, specifically, for instance, in addition. Consequently, families who garden often eat more vegetables. Finally, write a conclusion that restates your opinion in a fresh way: A garden grows good food and good habits. Facts make you convincing; just saying \"because I like it\" does not.",
        visual: {
          type: "hotspots",
          title: "The opinion sandwich",
          center: "Opinion",
          spots: [
            { label: "Introduction", icon: "🍞", detail: "State your opinion clearly." },
            { label: "Reason 1 + evidence", icon: "🥬", detail: "First, a garden teaches patience, because seeds take weeks to grow." },
            { label: "Reason 2 + evidence", icon: "🍅", detail: "Second, it gives fresh food." },
            { label: "Linking words", icon: "🔗", detail: "consequently, specifically, for instance, in addition" },
            { label: "Conclusion", icon: "🍞", detail: "Restate the opinion in a fresh way." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put this opinion paragraph in a logical order.",
          steps: [
            "Every kid should learn to cook simple meals.",
            "First, cooking teaches you to follow steps carefully, just like a science experiment.",
            "Second, it uses real math, such as doubling a recipe.",
            "Consequently, young cooks practice school skills while making dinner.",
            "In conclusion, learning to cook feeds both your body and your brain.",
          ],
          hint: "Opinion first, then reasons in order, a linking word that ties them together, and the conclusion last.",
          seconds: 45,
        },
        think: {
          q: "Which sentence is the strongest support for the opinion \"Every kid should learn to cook\"?",
          choices: ["Because I said so.", "Cooking is cool.", "Doubling a recipe means multiplying each amount by 2, so cooks practice math.", "My friend likes pancakes."],
          answer: 2,
          why: "It gives a specific reason with a real example.",
          hints: [
            "That's not a reason; it gives the reader nothing to think about.",
            "That's an opinion, not evidence.",
            "",
            "That's about one person's taste, not why kids should learn to cook.",
          ],
        },
        approaches: {
          analogy:
            "Opinion writing is like a lawyer in court. The lawyer states what she wants the jury to believe, presents evidence piece by piece, then sums it all up at the end.",
          example:
            "Opinion: Our town should plant more trees. Reason: Trees give shade. Evidence: On hot days, a shady street can feel much cooler than a sunny parking lot. Conclusion: More trees would make our town cooler and greener.",
          simpler: {
            q: "Where does the opinion go in an opinion paragraph?",
            choices: ["In the introduction, at the start", "Only in the middle", "Nowhere; it's hidden"],
            answer: 0,
            why: "Readers should know your opinion right away.",
            hints: ["", "The middle is for reasons and evidence.", "Your opinion must be clearly stated."],
          },
        },
      },
      {
        title: "Informative Writing",
        teach:
          "Informative writing teaches. Start with an introduction that names the topic and hooks the reader: Two brothers from Ohio changed the world in 12 seconds. Next, group related information together. All the facts about the brothers' early life go in one paragraph; all the facts about their first flight go in another. Headings can help. Develop each part with facts, definitions, concrete details, quotations and examples. Use precise words: say lift and propeller, not stuff and spinny thing. Link ideas with transitions: in addition, for example, especially, in contrast, as a result. End with a conclusion that ties the ideas together and shows why the topic matters.",
        visual: {
          type: "compare",
          left: { title: "Opinion writing", points: ["Tries to convince", "States an opinion", "Reasons and evidence", "Linking words: consequently, specifically"] },
          right: { title: "Informative writing", points: ["Teaches about a topic", "Introduces the topic", "Grouped facts, definitions, quotations", "Transitions: in contrast, especially"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each transition by its job.",
          buckets: ["Adds more", "Shows contrast", "Gives an example", "Shows a result"],
          items: [
            { text: "in addition", bucket: 0 },
            { text: "moreover", bucket: 0 },
            { text: "in contrast", bucket: 1 },
            { text: "however", bucket: 1 },
            { text: "for example", bucket: 2 },
            { text: "for instance", bucket: 2 },
            { text: "consequently", bucket: 3 },
            { text: "as a result", bucket: 3 },
          ],
          hint: "Ask: is this word adding, turning, showing, or explaining what happened next?",
          seconds: 45,
        },
        think: {
          q: "Which is the most PRECISE sentence for an informative report?",
          choices: ["The plane had some stuff that spun.", "The plane had a cool thing on it.", "The plane's propellers pulled it forward.", "The plane was neat."],
          answer: 2,
          why: "It uses the exact word propellers and says what they did.",
          hints: [
            "Stuff is vague. Name the part.",
            "Cool thing tells the reader nothing exact.",
            "",
            "Neat is an opinion, not information.",
          ],
        },
        approaches: {
          analogy:
            "Informative writing is like a well-organized toolbox. Every tool has its own drawer (paragraph), every drawer has a label (heading), and you can find exactly what you need.",
          example:
            "Heading: How Bees Make Honey. Fact: Worker bees gather nectar from flowers. Definition: Nectar is a sugary liquid inside flowers. Transition: As a result, the hive fills with honey over the summer.",
          simpler: {
            q: "What is the main purpose of informative writing?",
            choices: ["To teach the reader about a topic", "To tell a made-up story", "To argue an opinion"],
            answer: 0,
            why: "Informative writing informs, or teaches.",
            hints: ["", "That's narrative writing.", "That's opinion writing."],
          },
        },
      },
      {
        title: "Narrative Writing",
        teach:
          "A narrative tells a story. Begin by orienting the reader: who is telling the story, who's in it, and where and when it happens. Introduce a problem. Use dialogue so characters speak for themselves: \"Hold the ladder steady!\" called Dad. Use description, especially sensory details: what characters see, hear, smell, taste and touch. Control the pacing. Slow down at the exciting moment with lots of detail, and skip quickly over boring parts with time words like later that afternoon, meanwhile and the next morning. Finally, write a conclusion that shows how things turned out or what the narrator learned. Real or imagined, a good story makes the reader feel they were there.",
        visual: {
          type: "flip",
          cards: [
            { front: "Orient the reader", back: "Who's telling it? Who's in it? Where and when?" },
            { front: "Dialogue", back: "\"Hold the ladder steady!\" called Dad." },
            { front: "Sensory details", back: "The sharp smell of pine, the crunch of snow, the sting of cold air." },
            { front: "Pacing", back: "Slow down for exciting moments; speed past boring parts." },
            { front: "Time words", back: "Meanwhile, later that night, the next morning, at last." },
            { front: "Conclusion", back: "How things turned out, or what the narrator learned." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the THREE sentences that use sensory details (sight, sound, smell, taste or touch).",
          sentences: [
            "We went to the beach on Saturday.",
            "The salty wind stung my cheeks.",
            "Gulls screamed above the crashing waves.",
            "It was a good day.",
            "The warm sand squished between my toes.",
            "Then we went home.",
          ],
          correct: [1, 2, 4],
          hint: "Sensory details make you feel, hear, smell, taste or see something specific.",
          seconds: 35,
        },
        think: {
          q: "Which transition best SKIPS past a boring part of a story?",
          choices: ["Suddenly, a crash!", "\"Help!\" yelled Sam.", "Three hours later,", "The cold rain dripped down my neck."],
          answer: 2,
          why: "\"Three hours later\" jumps quickly over time where nothing important happens.",
          hints: [
            "Suddenly speeds you INTO action, not past boring time.",
            "That's dialogue, which slows the story down.",
            "",
            "That's a sensory detail, which slows the story down.",
          ],
        },
        approaches: {
          analogy:
            "Pacing is like a movie camera. For the exciting part, the camera zooms in, slow motion. For the boring drive across town, it just shows a quick clip.",
          example:
            "Fast: We drove to the lake. Slow: My fishing line jerked. The rod bent. \"I've got one!\" I shouted, my heart thumping, as a silver fish flashed out of the dark water.",
          simpler: {
            q: "Which sentence uses dialogue?",
            choices: ["\"Look out!\" shouted Maria.", "Maria was worried.", "Maria walked home."],
            answer: 0,
            why: "Dialogue is the exact words a character says, in quotation marks.",
            hints: ["", "That tells a feeling; no one speaks.", "That tells an action; no one speaks."],
          },
        },
      },
      {
        title: "Plan, Draft, Revise, Edit, Publish",
        teach:
          "Strong writing happens in steps. First, think about your task, purpose and audience. A thank-you note to Grandma sounds different from a science report for class. Plan: brainstorm and organize ideas in a list or web. Draft: get your ideas down without stopping to fix every mistake. Revise: make the ideas better. Add details, cut what doesn't fit, reorder paragraphs and choose stronger words. Ask a parent or friend for suggestions, and be willing to try a new approach. Edit: fix spelling, capital letters, punctuation and grammar. Publish: share a clean, final copy. Write often, too. Quick writing in one sitting builds speed, and longer projects build depth.",
        visual: {
          type: "compare",
          left: { title: "Revising", points: ["Makes the IDEAS better", "Add details", "Cut what doesn't fit", "Reorder and choose stronger words"] },
          right: { title: "Editing", points: ["Fixes the MISTAKES", "Spelling", "Capitals and punctuation", "Grammar and verb tenses"] },
        },
        probe: {
          type: "sort",
          prompt: "Is each change revising (ideas) or editing (mistakes)?",
          buckets: ["Revising", "Editing"],
          items: [
            { text: "Adding a sensory detail to the exciting part", bucket: 0 },
            { text: "Moving the strongest reason to the end", bucket: 0 },
            { text: "Cutting a sentence that is off topic", bucket: 0 },
            { text: "Changing nice to dazzling", bucket: 0 },
            { text: "Fixing recieve to receive", bucket: 1 },
            { text: "Adding a comma after an introductory phrase", bucket: 1 },
            { text: "Capitalizing the name of a city", bucket: 1 },
          ],
          hint: "Revising improves what you say. Editing fixes how it's written: spelling, capitals, punctuation.",
          seconds: 45,
        },
        think: {
          q: "You're writing a thank-you note to your grandmother. Who is your audience?",
          choices: ["Your science teacher", "Your grandmother", "A newspaper", "Yourself"],
          answer: 1,
          why: "The audience is the person who will read it: your grandmother.",
          hints: [
            "The teacher won't read this note.",
            "",
            "A newspaper doesn't print thank-you notes.",
            "You're writing to someone else.",
          ],
        },
        approaches: {
          analogy:
            "Writing is like building a birdhouse. Plan with a sketch, build a rough version, then improve its shape (revise), sand off the rough spots (edit) and paint it before giving it away (publish).",
          example:
            "Draft: The dog was nice. Revise: The shaggy old dog wagged his whole body when I came home. Edit: fix any spelling. Publish: copy it neatly to share.",
          simpler: {
            q: "Which step fixes spelling and punctuation?",
            choices: ["Planning", "Editing", "Brainstorming"],
            answer: 1,
            why: "Editing is when you fix mistakes.",
            hints: ["Planning is about ideas, before writing.", "", "Brainstorming is gathering ideas."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each opening sentence by the kind of writing it starts.",
      buckets: ["Opinion", "Informative", "Narrative"],
      items: [
        { text: "Every student should learn to play chess.", bucket: 0 },
        { text: "Our library needs longer weekend hours.", bucket: 0 },
        { text: "Honeybees live in colonies of thousands.", bucket: 1 },
        { text: "A volcano is an opening in Earth's crust.", bucket: 1 },
        { text: "The storm hit just as I reached the barn.", bucket: 2 },
        { text: "\"Don't open that door!\" whispered my brother.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain the difference between opinion, informative and narrative writing, and describe the steps you'd take to turn a first draft into a finished piece.",
      keyPoints: [
        "Opinion writing tries to convince with reasons and evidence",
        "Informative writing teaches with grouped facts",
        "Narrative writing tells a story with dialogue and description",
        "Revising improves ideas and word choice",
        "Editing fixes spelling, capitals and punctuation",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each kind of writing to its purpose.",
        pairs: [
          { left: "Opinion", right: "Convince the reader" },
          { left: "Informative", right: "Teach the reader" },
          { left: "Narrative", right: "Tell a story" },
        ],
        hint: "Convince, teach, tell.",
        seconds: 20,
      },
      {
        type: "sequence",
        prompt: "Put the writing process in order.",
        steps: ["Plan", "Draft", "Revise", "Edit", "Publish"],
        hint: "Ideas first, then a rough version, then improve ideas, then fix mistakes, then share.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "The garden needed rain; {0}, the plants wilted. Many birds fly south; {1}, robins sometimes stay all winter. A story should use {2} so characters can speak.",
        blanks: [{ answers: ["consequently", "as a result"] }, { answers: ["however", "in contrast"] }, { answers: ["dialogue"] }],
        bank: ["consequently", "however", "dialogue", "similarly", "headings"],
        hint: "First a result, then a contrast, then the story tool for speaking.",
        mistakes: [
          { match: "similarly", coach: "Similarly shows likeness, but these sentences show a result and then a contrast." },
          { match: "headings", coach: "Headings organize informative writing. Characters speak through dialogue." },
        ],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap the sentence that is the best CONCLUSION for an opinion piece about reading every day.",
        sentences: [
          "I read a book about whales yesterday.",
          "Reading every day builds stronger minds, so pick up a book tonight.",
          "Some books have pictures.",
          "First, reading builds vocabulary.",
        ],
        correct: [1],
        hint: "A conclusion restates the opinion and wraps up.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which belongs in an informative report, not a narrative?",
        choices: ["\"Run!\" yelled Jake.", "A definition of a glider", "A made-up dragon", "A surprise ending"],
        answer: 1,
        why: "Definitions teach facts, which is what informative writing does.",
      },
      {
        q: "What makes an opinion piece convincing?",
        choices: ["Repeating the opinion many times", "Writing in all capital letters", "Reasons backed by facts and details"],
        answer: 2,
        why: "Readers are convinced by reasons and evidence.",
      },
      {
        q: "What is pacing in a story?",
        choices: ["How fast or slow the story moves at different parts", "The number of pages", "The title"],
        answer: 0,
        why: "Writers slow down for important moments and speed through others.",
      },
      {
        q: "Changing \"The dog was nice\" to \"The shaggy dog licked my hand\" is:",
        choices: ["Editing", "Publishing", "Planning", "Revising"],
        answer: 3,
        why: "It improves the idea with better details, which is revising.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Write an opinion piece of 2-3 paragraphs on this question: \"Should every kid learn a musical instrument?\" (or another question a parent approves). State your opinion, give at least two reasons in logical order with facts or examples, use at least two linking words (consequently, specifically, for instance...), and write a conclusion. Then revise one paragraph and show the before and after.",
      rubric: [
        "States a clear opinion in the introduction",
        "Gives at least two reasons in logical order",
        "Supports each reason with facts, details or examples",
        "Uses at least two linking words correctly",
        "Ends with a conclusion that restates the opinion",
        "Shows a revision that improves ideas or word choice",
      ],
    },
  },
  // 9. Research, notes, discussions and presentations
  {
    id: "ela-5.research-present",
    title: "Research It, Present It: Notes, Sources and Speaking",
    minutes: 35,
    stage: "rhetoric",
    standards: ["W.5.6", "W.5.7", "W.5.8", "W.5.9", "SL.5.1", "SL.5.4", "SL.5.5", "SL.5.6"],
    read: [
      "A short research project is a chance to become an expert. Here's how it works.",
      "Start with a good question, one that is not too big and not answered with a simple yes or no. \"How do honeybees make honey?\" is a strong question. \"Tell me everything about bugs\" is far too big.",
      "Next, find several trustworthy sources: library books, encyclopedias, museum and university websites, and interviews with experts, like a local beekeeper. Look at different parts of the topic. One source might explain how bees collect nectar, while another shows how they store it in wax cells.",
      "Take notes in your own words. Paraphrasing means saying an idea in your own words. Summarizing means telling just the main points, in fewer words. If you copy exact words, put them in quotation marks and remember who said them. Keep a list of your sources, with the author, title, publisher or website, and date. Using someone else's words without credit is not honest, so always give credit.",
      "Then draw your evidence together. A strong report combines facts from several sources and explains what they mean.",
      "Research often ends with sharing. In a discussion, come prepared, follow the group's rules, ask questions, build on what others say, and sum up what the group learned. In a presentation, put your ideas in a logical order, use facts and details, look at your audience, and speak clearly at an easy pace. Pictures, a short sound clip or a chart can help your audience understand, as long as they support your main ideas. Use formal English for a report and save casual talk for friends.",
      "Technology helps, too. You can type, revise and share your writing on a computer, and fifth graders work toward typing two pages in one sitting.",
    ].join("\n\n"),
    keyIdeas: [
      "Research starts with a focused question and uses several trustworthy sources.",
      "Take notes by paraphrasing and summarizing, and keep a list of your sources.",
      "In discussions, come prepared, ask questions and build on others' ideas.",
      "Present in a logical order, speak clearly, use helpful visuals, and choose formal English.",
    ],
    hook: {
      text: "A honeybee may visit dozens of flowers on a single trip, and it takes the work of a whole hive to fill one jar of honey. How do they do it? You could guess. Or you could research it, become the expert, and teach your whole family. Let's learn how real researchers work.",
    },
    teach: [
      {
        title: "Asking a Good Research Question",
        teach:
          "Every research project begins with a question. A good question is focused: not too big, not too small. \"Tell me about animals\" is far too big; libraries are full of animal books. \"Do bees have legs?\" is too small; one word answers it. \"How do honeybees make honey?\" is just right. It needs several facts and maybe several sources. Next, look into different parts of the question. How do bees collect nectar? How do they turn it into honey? How do they store it? Each part might come from a different source. Use books, encyclopedias, trustworthy websites, and even interviews with experts like a local beekeeper.",
        visual: {
          type: "compare",
          left: { title: "Weak questions", points: ["Too big: Tell me about animals", "Too small: Do bees have legs?", "Yes or no: Is honey sweet?", "Can't be researched: What's the best bug?"] },
          right: { title: "Strong questions", points: ["How do honeybees make honey?", "Why did the Wrights test at Kitty Hawk?", "How did Apollo 11 get home?", "Need several facts to answer"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each research question.",
          buckets: ["Strong question", "Too big", "Too small or yes/no"],
          items: [
            { text: "How do honeybees make honey?", bucket: 0 },
            { text: "How did lighthouses help ships stay safe?", bucket: 0 },
            { text: "Why do leaves change color in the fall?", bucket: 0 },
            { text: "Tell me everything about science.", bucket: 1 },
            { text: "What is the whole history of the world?", bucket: 1 },
            { text: "Is the Moon round?", bucket: 2 },
            { text: "Do bees have wings?", bucket: 2 },
          ],
          hint: "A strong question needs several facts to answer. Too big fills a library. Too small needs one word.",
          seconds: 45,
        },
        think: {
          q: "Which is the best question for a short research project?",
          choices: ["Is a whale big?", "How do whales communicate with each other?", "Tell me about the ocean.", "Do you like whales?"],
          answer: 1,
          why: "It's focused and needs several facts and sources to answer.",
          hints: [
            "One word answers that: yes.",
            "",
            "The ocean is a huge topic; it needs narrowing.",
            "That's asking an opinion, not a research question.",
          ],
        },
        approaches: {
          analogy:
            "A research question is like choosing a hiking trail. Too short and you're done in a minute. Too long and you'll never finish. Pick one that takes a good afternoon.",
          example:
            "Too big: Tell me about flight. Better: How did the Wright brothers learn to control their airplane? It can be answered in a short report with a few good sources.",
          simpler: {
            q: "Which question is TOO BIG?",
            choices: ["Tell me about all of history.", "Why do cats purr?", "How do bees make wax?"],
            answer: 0,
            why: "All of history would fill a library.",
            hints: ["", "That's a focused question, a good size.", "That's a focused question, a good size."],
          },
        },
      },
      {
        title: "Notes and Sources",
        teach:
          "Good notes are short and in your own words. Paraphrasing means restating an idea in your own words. If a book says, \"Worker bees fan their wings to evaporate water from the nectar,\" you might write: bees fan wings, dries nectar. Summarizing means boiling a whole passage down to its main points. If you want an author's exact words, copy them carefully, put them in quotation marks, and note who said them. Then keep a source list. For a book, write the author, the title in italics, the publisher and the year. For a website, write the page title, the site and the date you visited. Giving credit is honest, and it lets readers check your facts.",
        visual: {
          type: "flip",
          cards: [
            { front: "Paraphrase", back: "Say one idea in your own words." },
            { front: "Summarize", back: "Tell only the main points of a whole passage, in fewer words." },
            { front: "Quote", back: "Copy exact words in quotation marks and say who said them." },
            { front: "Source list", back: "Author, title, publisher or website, and date, for every source you used." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build a source list entry for a book, in the usual order: author, title, publisher, year.",
          tiles: ["Lee, Ana.", "Honeybees at Work.", "Maple Press,", "2020."],
          distractors: ["Chapter 3.", "I liked it."],
          hint: "Start with the author's last name, then the title, then who published it, then the year.",
          seconds: 30,
        },
        think: {
          q: "The book says: \"Honeybees store nectar in wax cells and fan their wings until it thickens into honey.\" Which note is a good PARAPHRASE?",
          choices: [
            "Honeybees store nectar in wax cells and fan their wings until it thickens into honey.",
            "Bees keep nectar in wax cells; fanning dries it into honey.",
            "Bees are cute.",
            "Honey is sold in jars.",
          ],
          answer: 1,
          why: "It keeps the meaning but uses new, shorter words.",
          hints: [
            "That's copied word for word, without quotation marks. That's not paraphrasing.",
            "",
            "That's an opinion, not the book's idea.",
            "That's a different fact, not what the book said.",
          ],
        },
        approaches: {
          analogy:
            "Paraphrasing is like retelling a movie to a friend. You don't recite the script. You tell what happened in your own words.",
          example:
            "Original: \"The Wright brothers selected Kitty Hawk for its strong, steady winds.\" Paraphrase: The Wrights picked Kitty Hawk because the wind there was strong and didn't stop.",
          simpler: {
            q: "What should you do when you copy an author's exact words?",
            choices: ["Put them in quotation marks and give credit", "Pretend you wrote them", "Change one word"],
            answer: 0,
            why: "Quotation marks and credit show the words belong to the author.",
            hints: ["", "That's not honest. Always give credit.", "Changing one word isn't paraphrasing, and it still needs credit."],
          },
        },
      },
      {
        title: "Good Discussions",
        teach:
          "Talking about ideas with others helps you learn. A good discussion starts before it begins: come prepared, having read or studied the topic. During the discussion, follow the rules your group agrees on, like taking turns, and roles, like a leader who keeps the talk on track. Ask questions when you're unsure: Can you explain what you meant by that? Build on others' ideas: I agree with Sam, and I'd add that bees also make wax. Listen carefully, and connect your comments to what was just said. Near the end, review the key ideas and say what you learned. Polite disagreement is fine. Say it about the idea, not the person.",
        visual: {
          type: "hotspots",
          title: "A good discussion",
          center: "Discuss",
          spots: [
            { label: "Prepare", icon: "📚", detail: "Read or study the topic first, and bring notes." },
            { label: "Rules and roles", icon: "🤝", detail: "Take turns. A leader keeps the talk on track." },
            { label: "Ask questions", icon: "❓", detail: "Can you explain what you meant?" },
            { label: "Build on ideas", icon: "🧱", detail: "I agree with Sam, and I'd add that..." },
            { label: "Sum up", icon: "📝", detail: "Review the key ideas the group learned." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each discussion move: helpful or unhelpful?",
          buckets: ["Helpful", "Unhelpful"],
          items: [
            { text: "Reading the chapter before the discussion", bucket: 0 },
            { text: "\"I agree with Maya, and I'd add another reason.\"", bucket: 0 },
            { text: "\"Can you give an example of what you mean?\"", bucket: 0 },
            { text: "Summing up what the group learned at the end", bucket: 0 },
            { text: "Talking over someone who is speaking", bucket: 1 },
            { text: "Changing the subject to a video game", bucket: 1 },
            { text: "\"That's a dumb idea.\"", bucket: 1 },
          ],
          hint: "Helpful moves keep the talk prepared, polite, on topic and building.",
          seconds: 40,
        },
        think: {
          q: "Your friend says the Wrights succeeded because of luck. You disagree. What's the best response?",
          choices: [
            "\"You're wrong. Stop talking.\"",
            "Say nothing and look away.",
            "\"I see it differently. They tested about 200 wing shapes, so I think careful work mattered more.\"",
            "Change the subject.",
          ],
          answer: 2,
          why: "It disagrees politely and gives evidence.",
          hints: [
            "That attacks the person, not the idea.",
            "Staying silent means the group misses your idea.",
            "",
            "Changing the subject doesn't help anyone learn.",
          ],
        },
        approaches: {
          analogy:
            "A good discussion is like building a tower together. Each person adds a block that fits on the last one. Knocking down someone else's block doesn't make the tower taller.",
          example:
            "Ana: \"Bees fan their wings to dry nectar.\" Ben: \"Building on that, they also seal the cells with wax when the honey is ready.\" Ben listened, connected and added something new.",
          simpler: {
            q: "What should you do before a discussion?",
            choices: ["Prepare by reading about the topic", "Plan to talk the whole time", "Nothing"],
            answer: 0,
            why: "Coming prepared lets you add real ideas.",
            hints: ["", "Everyone needs a turn.", "Unprepared speakers have little to add."],
          },
        },
      },
      {
        title: "Presenting Your Work",
        teach:
          "When you present, organize your ideas in a logical order: an opening that hooks the audience, your main points with facts and details, and a closing that sums up. Speak clearly, at a pace your audience can follow, and look up at them instead of reading every word. Multimedia can help: a photo of a honeycomb, a short sound clip of a buzzing hive or a simple chart. Use them only when they make your main ideas clearer. Choose your English for the situation. A report to the family uses formal English: Today I will explain how honeybees make honey. Chatting with a friend can be casual. Technology helps you type, revise, share and publish your work.",
        visual: {
          type: "hotspots",
          title: "A strong presentation",
          center: "Present",
          spots: [
            { label: "Logical order", icon: "🔢", detail: "Opening, main points with facts, closing." },
            { label: "Clear voice", icon: "🗣️", detail: "Speak clearly at an easy pace. Don't rush." },
            { label: "Eye contact", icon: "👀", detail: "Look up at your audience, not just your notes." },
            { label: "Multimedia", icon: "🖼️", detail: "A photo, sound or chart that supports your main idea." },
            { label: "Formal English", icon: "🎩", detail: "Today I will explain... instead of So, like, um..." },
            { label: "Technology", icon: "💻", detail: "Type, revise, share and publish your work." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each presentation problem to its fix.",
          pairs: [
            { left: "Speaking so fast no one can follow", right: "Slow down and pause between points" },
            { left: "Reading every word with your head down", right: "Look up at your audience often" },
            { left: "A funny cat video that has nothing to do with bees", right: "Use a photo of a honeycomb instead" },
            { left: "Starting with \"So, like, um, bees are cool\"", right: "Start with \"Today I will explain how bees make honey\"" },
            { left: "Jumping between points in random order", right: "Follow an opening, main points, closing plan" },
          ],
          hint: "Each fix makes the presentation clearer for the audience.",
          seconds: 45,
        },
        think: {
          q: "Which picture would BEST support a presentation on how bees make honey?",
          choices: ["A photo of a race car", "A close-up photo of honeycomb cells filled with honey", "A cartoon of a cat", "A picture of a pizza"],
          answer: 1,
          why: "It shows exactly what the presentation is about.",
          hints: [
            "Race cars have nothing to do with bees.",
            "",
            "A cat cartoon distracts from the topic.",
            "Pizza is off topic.",
          ],
        },
        approaches: {
          analogy:
            "A presentation is like guiding a tour. You tell people where you're going, show them each stop clearly, and remind them what they saw at the end.",
          example:
            "Opening: Did you know one bee makes only a tiny bit of honey in its life? Main points: collecting nectar, drying it, sealing the cells. Closing: So the next time you eat honey, thank a whole hive!",
          simpler: {
            q: "Which opening is formal English?",
            choices: ["\"Today I will explain how honeybees make honey.\"", "\"Yo, bees and stuff.\"", "\"Um, so, like, honey.\""],
            answer: 0,
            why: "It's clear, complete and polite.",
            hints: ["", "That's very casual slang.", "Fillers like um and like sound unprepared."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps of a short research project in order.",
      steps: [
        "Choose a focused research question.",
        "Find several trustworthy sources.",
        "Take notes in your own words and list your sources.",
        "Combine the facts and write your report.",
        "Revise and edit, then type a final copy.",
        "Present it to your audience with a helpful picture or chart.",
      ],
    },
    explain: {
      prompt: "Explain to a younger student how to do a short research project, from the question to the presentation.",
      keyPoints: [
        "Start with a focused question",
        "Use several trustworthy sources",
        "Take notes in your own words and list sources",
        "Give credit and use quotation marks for exact words",
        "Present in a logical order and speak clearly",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Sort each note: paraphrase (own words) or copied (needs quotation marks)?",
        buckets: ["Paraphrase", "Copied exactly"],
        items: [
          { text: "bees fan wings to dry nectar", bucket: 0 },
          { text: "honey stored in wax cells, then capped", bucket: 0 },
          { text: "Worker bees fan their wings to evaporate water from the nectar.", bucket: 1 },
          { text: "The colony seals each finished cell with a thin layer of beeswax.", bucket: 1 },
        ],
        hint: "Short notes in new words are paraphrases. Full sentences straight from a book are copied.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Restating an idea in your own words is called {0}. Telling only the main points is called {1}. A list of where you found your facts is a {2} list.",
        blanks: [{ answers: ["paraphrasing"] }, { answers: ["summarizing"] }, { answers: ["source"] }],
        bank: ["paraphrasing", "summarizing", "source", "copying", "shopping"],
        hint: "Own words: paraphrasing. Main points: summarizing. Where facts came from: sources.",
        mistakes: [{ match: "copying", coach: "Copying uses the author's words. Restating in your own words is paraphrasing." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each situation to the best way of speaking.",
        pairs: [
          { left: "Giving a report to your family", right: "Formal: Today I will explain..." },
          { left: "Joking with your best friend", right: "Casual: Hey, guess what!" },
          { left: "Thanking a museum guide", right: "Polite and formal: Thank you for the tour." },
        ],
        hint: "Reports and thank-yous to adults call for formal English.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the TWO things that would make a presentation about honeybees stronger.",
        sentences: [
          "A chart showing the steps from nectar to honey",
          "Reading your notes with your head down",
          "Looking up at your audience and speaking clearly",
          "Talking very fast to finish sooner",
        ],
        correct: [0, 2],
        hint: "Helpful visuals and a clear, confident delivery make a presentation strong.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Why should you keep a list of sources?",
        choices: ["To give credit and let readers check facts", "To make the report longer", "Teachers like lists"],
        answer: 0,
        why: "Giving credit is honest, and readers can check where facts came from.",
      },
      {
        q: "In a discussion, what does \"build on\" someone's idea mean?",
        choices: ["Ignore it", "Repeat it exactly", "Argue loudly", "Add something new that connects to it"],
        answer: 3,
        why: "Building on an idea adds to what someone just said.",
      },
      {
        q: "When should you use multimedia in a presentation?",
        choices: ["Always, as much as possible", "When it helps explain your main ideas", "Never"],
        answer: 1,
        why: "Pictures and sound should support your main ideas, not distract.",
      },
      {
        q: "Which is the most trustworthy source for a report on honeybees?",
        choices: ["A random comment online", "A book by a university bee scientist", "A cartoon about talking bees", "A guess"],
        answer: 1,
        why: "An expert's book is checked and based on real study.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Do a short research project. Choose a focused question about nature, science, history or inventions (for example, \"How do honeybees make honey?\" or \"How do lighthouses work?\"). Use at least three sources, take notes in your own words, and keep a source list. Type a one-to-two-page report on a computer. Then present it to your family for 3-5 minutes with one picture, chart or sound clip, and answer their questions.",
      rubric: [
        "Asks a focused research question",
        "Uses at least three trustworthy sources and lists them",
        "Notes and report are in the student's own words, with quotations credited",
        "Typed report is organized with an introduction, grouped facts and a conclusion",
        "Presentation is in a logical order, spoken clearly, with eye contact",
        "Uses a picture, chart or sound that supports the main idea",
      ],
    },
  },
]);
