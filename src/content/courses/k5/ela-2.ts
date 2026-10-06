import { k5Course } from "./base";

/**
 * ela-2: Reading & Writing 2 (Grade 2, Common Core ELA), taught by Grandpa
 * Aesop in Riverbend Valley. Everything is read aloud, so sentences are short.
 * Stories are public-domain fables and folktales retold in our own words.
 * Order: phonics and word parts, asking questions, fables, story structure,
 * nonfiction, comparing texts, grammar, then writing.
 */
export const ela2 = k5Course("ela", 2, [
  // 1. Long and short vowels, vowel teams, syllables and fluency
  {
    id: "ela-2.vowels",
    title: "Long Vowels, Short Vowels and Vowel Teams",
    minutes: 20,
    stage: "grammar",
    standards: ["RF.2.3", "RF.2.4", "L.2.2"],
    read: [
      "Every word has vowels. The vowels are a, e, i, o and u. A vowel can make a short sound or a long sound.",
      "Short vowels sound quick. Listen: cat, bed, pig, hot, cup. A word with one vowel between consonants usually has a short sound.",
      "Long vowels say their own name. Listen: cake, feet, kite, rope, cute. A silent e at the end often makes the vowel long. Cap becomes cape. Kit becomes kite.",
      "Two vowels can team up. We call them vowel teams. In rain, a and i team up to say long a. In boat, oa says long o. In seed, ee says long e. A rhyme helps: when two vowels go walking, the first one does the talking. It works for many words, but not all!",
      "Long words have parts called syllables. Read one part at a time. Rain-bow. Sun-shine. Then put the parts together.",
      "Good readers read smoothly, like talking. If a sentence makes no sense, they go back and fix the word.",
    ].join("\n\n"),
    keyIdeas: [
      "Short vowels sound quick, like the a in cat. Long vowels say their name, like the a in cake.",
      "A silent e at the end often makes the vowel long: cap becomes cape.",
      "Vowel teams like ai, ee and oa work together to make one long sound.",
      "Read long words one syllable at a time, read smoothly, and fix words that don't make sense.",
    ],
    hook: {
      text: "Pip the firefly has a riddle. ✨ What turns a cap into a cape? 🧢 Just one quiet letter: e! Let's learn its secret.",
    },
    teach: [
      {
        title: "Short and Long Vowels",
        teach:
          "The vowels are a, e, i, o and u. Each one can make two sounds. A short vowel sounds quick. Listen: cat, bed, pig, hot, cup. A long vowel says its own name. Listen: cake, feet, kite, rope, cute. Here is a trick. Add a silent e to the end of cap. Now it says cape! The e makes no sound. It makes the a say its name.",
        visual: {
          type: "compare",
          left: { title: "Short vowels ⚡", points: ["cat 🐱", "bed 🛏️", "pig 🐷", "hot 🔥", "cup ☕"] },
          right: { title: "Long vowels say their name 📣", points: ["cake 🎂", "feet 🦶", "kite 🪁", "rope 🪢", "cute 🐶"] },
        },
        probe: {
          type: "sort",
          prompt: "Say each word out loud. Does it have a short vowel or a long vowel?",
          buckets: ["Short vowel ⚡", "Long vowel 📣"],
          items: [
            { text: "🐱 cat", bucket: 0 },
            { text: "🎂 cake", bucket: 1 },
            { text: "🐷 pig", bucket: 0 },
            { text: "🪁 kite", bucket: 1 },
            { text: "🦆 duck", bucket: 0 },
            { text: "🪢 rope", bucket: 1 },
            { text: "🔔 bell", bucket: 0 },
            { text: "🍇 grape", bucket: 1 },
          ],
          hint: "Say the word slowly. If the vowel says its own name, like the a in cake, it is long.",
          mistakes: [
            { match: "cake sorted as short", coach: "Say cake slowly: c-AY-k. The a says its name, so it is long." },
            { match: "bell sorted as long", coach: "Say bell slowly: b-e-ll. The e is quick, so it is short." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which word has a long vowel sound?",
          choices: ["hat", "bug", "bike", "pot"],
          answer: 2,
          why: "In bike, the i says its own name. The silent e makes it long.",
          hints: [
            "Say hat slowly. The a is quick, like in cat. That is short.",
            "Say bug slowly. The u is quick and short, like in cup.",
            "",
            "Say pot slowly. The o is quick, like in hot. That is short.",
          ],
        },
        approaches: {
          analogy:
            "Short vowels are like a quick bunny hop. 🐇 Long vowels are like calling out your own name across the playground: A! E! I! O! U!",
          example:
            "Take the word kit. The i is short: k-i-t. Add an e to make kite. Now the i says its name: k-EYE-t. The silent e made it long.",
          simpler: {
            q: "Does the a in cake say its own name?",
            choices: ["Yes, it says A", "No, it sounds like the a in cat"],
            answer: 0,
            why: "Cake sounds like c-AY-k. The a says its name, so it is long.",
            hints: ["", "Say cake slowly. The middle sound is AY, the name of the letter a."],
          },
        },
      },
      {
        title: "Vowel Teams",
        teach:
          "Sometimes two vowels team up. We call them vowel teams. Together they make one sound. In rain, a and i say long a. In boat, o and a say long o. In seed, two e's say long e. In pie, i and e say long i. Here is a helper rhyme. When two vowels go walking, the first one does the talking. It works for many words. But watch out! Some words break the rule.",
        visual: {
          type: "flip",
          cards: [
            { front: "ai 🌧️", back: "Says long a, like rain and mail." },
            { front: "ay ☀️", back: "Says long a at the end of a word, like day and play." },
            { front: "ee 🌱", back: "Says long e, like seed and tree." },
            { front: "ea 🍃", back: "Often says long e, like leaf and eat." },
            { front: "oa 🚤", back: "Says long o, like boat and road." },
            { front: "ie 🥧", back: "Says long i, like pie and tie." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture word to the vowel team that fills its blanks.",
          pairs: [
            { left: "🌧️ r _ _ n", right: "ai" },
            { left: "🚤 b _ _ t", right: "oa" },
            { left: "🌱 s _ _ d", right: "ee" },
            { left: "🥧 p _ _", right: "ie" },
            { left: "☀️ d _ _", right: "ay" },
          ],
          hint: "Say the word. Which long vowel do you hear? Then pick the team that makes that sound.",
          seconds: 40,
        },
        think: {
          q: "Which vowel team spells the long o in boat?",
          choices: ["ai", "oa", "ee"],
          answer: 1,
          why: "In boat, o and a team up. The o does the talking and says its name.",
          hints: [
            "ai says long a, like in rain. Boat has a long o sound.",
            "",
            "ee says long e, like in seed. Boat has a long o sound.",
          ],
        },
        approaches: {
          analogy:
            "A vowel team is like two friends carrying one box together. 📦 Two letters, but just one sound comes out.",
          example:
            "Look at the word road. The o and a sit side by side. The o does the talking and says its name. The a stays quiet. So we read r-OH-d, road.",
          simpler: {
            q: "In the word rain, which letters team up?",
            choices: ["r and n", "a and i"],
            answer: 1,
            why: "a and i are both vowels. They team up to say long a.",
            hints: ["r and n are consonants, not vowels. Look for the two vowels side by side.", ""],
          },
        },
      },
      {
        title: "Big Words and Smooth Reading",
        teach:
          "Long words have parts called syllables. Clap them! Rain-bow has two claps. Sun-shine has two claps. Read one part, then the next. Then say them together fast. Good readers read smoothly, like talking. They pause at periods. If a sentence makes no sense, they stop. They go back and fix the word. That is called self-correcting. Great readers do it all the time!",
        visual: {
          type: "hotspots",
          title: "Reading like a pro",
          center: "📖 Smooth reader",
          spots: [
            { label: "Clap syllables", icon: "👏", detail: "Break a big word into parts: rain-bow, sun-shine." },
            { label: "Not too slow", icon: "🐢", detail: "Read like you are talking, not one... word... at... a... time." },
            { label: "Not too fast", icon: "🐇", detail: "Slow enough that you understand every sentence." },
            { label: "Use expression", icon: "🎭", detail: "Sound excited at a !, curious at a ?, and pause at a period." },
            { label: "Go back and fix", icon: "🔁", detail: "If it makes no sense, reread and fix the word." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Pip read: 'The goat sailed down the river.' 🐐⛵ Wait! That makes no sense. He looked again. The word was {0}.",
          blanks: [{ answers: ["boat"] }],
          bank: ["boat", "coat", "goat", "bat"],
          hint: "What can sail down a river? Pick a word that looks like goat but makes sense.",
          mistakes: [
            { match: "coat", coach: "A coat can't sail! Which word names something that floats on a river?" },
            { match: "goat", coach: "That's what Pip read at first, and it made no sense. Look again." },
            { match: "bat", coach: "A bat flies, but it doesn't sail. Which word sails on water?" },
          ],
          seconds: 25,
        },
        think: {
          q: "You read a sentence and it makes no sense. What should you do?",
          choices: ["Keep going fast", "Go back and fix the word", "Skip the whole page"],
          answer: 1,
          why: "Reading should make sense. Good readers reread and fix the word.",
          hints: [
            "If you keep going, you will miss what the story means. Slow down and check.",
            "",
            "Skipping a page means missing the story. Try fixing the one word instead.",
          ],
        },
        approaches: {
          analogy:
            "Reading smoothly is like riding a bike. 🚲 Wobbly at first, then smooth. If you hit a bump, you steady yourself and keep going.",
          example:
            "Take sunflower. Clap it: sun-flow-er. Three parts. Read sun, then flow, then er. Now say it fast: sunflower! 🌻",
          simpler: {
            q: "Should a sentence make sense when you read it?",
            choices: ["Yes, reading should make sense", "No, it doesn't matter"],
            answer: 0,
            why: "Reading is for understanding, so every sentence should make sense.",
            hints: ["", "If the words don't make sense, you can't understand the story. It does matter!"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each word by the long vowel sound you hear.",
      buckets: ["Long a (cake, rain)", "Long e (feet, leaf)", "Long o (rope, boat)"],
      items: [
        { text: "🚂 train", bucket: 0 },
        { text: "🐌 snail", bucket: 0 },
        { text: "🎮 play", bucket: 0 },
        { text: "🌳 tree", bucket: 1 },
        { text: "🍃 leaf", bucket: 1 },
        { text: "🧀 cheese", bucket: 1 },
        { text: "🐐 goat", bucket: 2 },
        { text: "🛣️ road", bucket: 2 },
        { text: "🦴 bone", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Teach Pip! How can you tell if a vowel is long or short? Use cap and cape in your answer.",
      keyPoints: [
        "Short vowels make a quick sound, like the a in cap",
        "Long vowels say their own name, like the a in cape",
        "A silent e at the end can make the vowel long",
        "Vowel teams like ai and oa make one long sound",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Add a silent e! kit becomes {0} 🪁. cub becomes {1} 🧊. hop becomes {2} 🙏.",
        blanks: [{ answers: ["kite"] }, { answers: ["cube"] }, { answers: ["hope"] }],
        bank: ["kite", "cube", "hope", "kit", "cub", "hip"],
        hint: "Just add an e to the end of each word. The vowel will say its name.",
        mistakes: [
          { match: "kit", coach: "That's the word without the e. Add an e to the end." },
          { match: "cub", coach: "That's the word without the e. Add an e to the end." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each word to the long vowel sound its vowel team makes.",
        pairs: [
          { left: "🚤 boat", right: "long o" },
          { left: "🌧️ rain", right: "long a" },
          { left: "🌱 seed", right: "long e" },
          { left: "🥧 pie", right: "long i" },
        ],
        hint: "Say each word slowly. Which letter name do you hear in the middle?",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "Clap it out! How many syllables are in butterfly? 🦋",
        answer: 3,
        hint: "Clap once for each part: but-ter-fly.",
        mistakes: [{ match: "2", coach: "Clap again slowly: but - ter - fly. That's three claps!" }],
        seconds: 15,
      },
      {
        type: "highlight",
        prompt: "Tap every word with a SHORT vowel sound.",
        sentences: ["🐸 frog", "🪁 kite", "🐛 bug", "🍰 cake", "🎩 hat"],
        correct: [0, 2, 4],
        hint: "Short vowels are quick, like in cat. Long vowels say their name.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which word has a short vowel sound?",
        choices: ["cake", "cup", "kite"],
        answer: 1,
        why: "The u in cup is quick and short. Cake and kite have long vowels.",
      },
      {
        q: "What does a silent e at the end of a word often do?",
        choices: ["Makes the vowel say its name", "Makes a loud sound", "Means more than one"],
        answer: 0,
        why: "A silent e makes no sound, but it often makes the vowel long, like cap and cape.",
      },
      {
        q: "Which vowel team makes the long a sound in rain?",
        choices: ["oa", "ee", "ai"],
        answer: 2,
        why: "In rain, a and i team up to say long a.",
      },
      {
        q: "You read a sentence that makes no sense. What do good readers do?",
        choices: ["Keep going", "Close the book", "Skip the page", "Go back and fix the word"],
        answer: 3,
        why: "Good readers self-correct: they reread and fix the word so it makes sense.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Go on a vowel hunt with a grown-up! 🔍 Find 3 things at home with a short vowel (like cup) and 3 with a long vowel (like plate). Say each name out loud and tell which kind of vowel it has.",
      rubric: [
        "Found 3 short-vowel words",
        "Found 3 long-vowel words",
        "Said each word clearly and named its vowel sound",
      ],
    },
  },

  // 2. Prefixes, suffixes, compound words, tricky words and shades of meaning
  {
    id: "ela-2.word-parts",
    title: "Prefixes, Suffixes and Tricky Words",
    minutes: 20,
    stage: "grammar",
    standards: ["RF.2.3", "L.2.4", "L.2.5", "L.2.6", "L.2.2"],
    read: [
      "Words can be built from parts, like blocks. 🧱",
      "A prefix goes at the start of a word. It changes the meaning. Un means not. Unhappy means not happy. Re means again. Retell means tell again.",
      "A suffix goes at the end of a word. Ful means full of. Helpful means full of help. Less means without. Careless means without care. Ly tells how. Slowly means in a slow way.",
      "Some words are two words stuck together. Bird plus house makes birdhouse. Light plus house makes lighthouse. These are compound words.",
      "Some words are tricky. They do not sound the way they look. Said, was and friend must be learned by heart.",
      "Some words are close in meaning, but not the same. Toss, throw and hurl all send something through the air. A toss is gentle. A hurl is very hard!",
      "Stuck on a word? Look at the words around it for clues. Or look it up in a dictionary or a glossary.",
    ].join("\n\n"),
    keyIdeas: [
      "A prefix goes at the start and changes the meaning: un means not, re means again.",
      "A suffix goes at the end: ful means full of, less means without, ly tells how.",
      "Compound words join two words, like bird + house = birdhouse.",
      "Close words have shades of meaning: toss, throw, hurl.",
    ],
    hook: {
      text: "At the Riverbend market, Pip found a sign. 🪧 It said: UNLOCK THE GATE. Pip knew the word lock. But what does unlock mean? 🔓",
    },
    teach: [
      {
        title: "Prefixes at the Front",
        teach:
          "A prefix is a word part at the front. It changes what a word means. Un means not. Unhappy means not happy. Unlock means to open a lock. Re means again. Redo means do again. Retell means tell again. Find the root word first. Then add the meaning of the prefix. Happy is the root. Un makes it not happy!",
        visual: {
          type: "flip",
          cards: [
            { front: "un + happy", back: "unhappy: not happy 😟" },
            { front: "un + lock", back: "unlock: open the lock 🔓" },
            { front: "re + tell", back: "retell: tell again 🗣️" },
            { front: "re + fill", back: "refill: fill again 🥛" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each word to what it means.",
          pairs: [
            { left: "unkind", right: "not kind" },
            { left: "reread", right: "read again" },
            { left: "unsafe", right: "not safe" },
            { left: "rebuild", right: "build again" },
          ],
          hint: "Un means not. Re means again. Find the root word, then add the prefix's meaning.",
          seconds: 35,
        },
        think: {
          q: "What does repaint mean?",
          choices: ["paint again", "not paint", "paint badly"],
          answer: 0,
          why: "Re means again, so repaint means paint again.",
          hints: [
            "",
            "Not is the meaning of un. Repaint starts with re.",
            "Re does not mean badly. Think of redo and retell.",
          ],
        },
        approaches: {
          analogy:
            "A prefix is like a hat on a word. 🎩 Put on the un hat and the word flips to its opposite. Put on the re hat and you do it again.",
          example:
            "Take the word fair. Add un to the front: unfair. Un means not, so unfair means not fair. 🙅",
          simpler: {
            q: "What does the prefix re mean?",
            choices: ["again", "not"],
            answer: 0,
            why: "Re means again, like redo and retell.",
            hints: ["", "Not is what un means, like in unhappy. Re is different."],
          },
        },
      },
      {
        title: "Suffixes at the End",
        teach:
          "A suffix is a word part at the end. Ful means full of. Hopeful means full of hope. Less means without. Fearless means without fear. Ly tells how something is done. Quickly means in a quick way. The root word stays at the start. Some words even get both! Unhelpful has un at the front and ful at the end. It means not helpful.",
        visual: {
          type: "hotspots",
          title: "Suffix toolbox",
          center: "🧰 Suffixes",
          spots: [
            { label: "ful", icon: "🫙", detail: "Full of: careful, joyful, hopeful." },
            { label: "less", icon: "🚫", detail: "Without: careless, fearless, endless." },
            { label: "ly", icon: "🏃", detail: "In that way: slowly, softly, quickly." },
            { label: "er", icon: "🧑‍🍳", detail: "One who does it: farmer, baker, miller." },
            { label: "ing", icon: "🔄", detail: "Doing it now: jumping, reading." },
          ],
        },
        probe: {
          type: "cloze",
          text: "The brave knight had no fear. He was {0}. 🛡️ The baby bird was full of joy. It was {1}. 🐦 The turtle walked in a slow way. It walked {2}. 🐢",
          blanks: [{ answers: ["fearless"] }, { answers: ["joyful"] }, { answers: ["slowly"] }],
          bank: ["fearless", "joyful", "slowly", "fearful", "joyless", "slow"],
          hint: "Less means without. Ful means full of. Ly tells how.",
          mistakes: [
            { match: "fearful", coach: "Fearful means full of fear. The knight had NO fear, so he was without fear." },
            { match: "joyless", coach: "Joyless means without joy. The bird was FULL of joy." },
            { match: "slow", coach: "Slow is close! To tell HOW the turtle walked, add ly." },
          ],
          seconds: 40,
        },
        think: {
          q: "What does careless mean?",
          choices: ["full of care", "without care", "care again"],
          answer: 1,
          why: "Less means without, so careless means without care.",
          hints: [
            "Full of care would be careful, with ful. This word ends in less.",
            "",
            "Again is the meaning of the prefix re. This word has the suffix less.",
          ],
        },
        approaches: {
          analogy:
            "A suffix is like a tail on a word. 🐕 Wag a different tail and the word acts a different way.",
          example:
            "Take help. Add ful: helpful, full of help. Add less: helpless, without help. Same root, two very different words!",
          simpler: {
            q: "Does the suffix less mean with or without?",
            choices: ["with", "without"],
            answer: 1,
            why: "Less means without, like fearless means without fear.",
            hints: ["Think of fearless. A fearless knight has no fear at all.", ""],
          },
        },
      },
      {
        title: "Compound, Tricky and Close Words",
        teach:
          "Some words are two words glued together. Bird plus house is birdhouse. Light plus house is lighthouse. These are compound words. Some words are tricky. Said and friend don't sound the way they look. Learn them by heart. Some words are close cousins. Toss, throw and hurl all send a ball. But a toss is gentle. A hurl is super hard! Stuck on a word? Look it up in a dictionary.",
        visual: {
          type: "flip",
          cards: [
            { front: "bird + house 🐦🏠", back: "birdhouse" },
            { front: "light + house 💡🏠", back: "lighthouse 🗼" },
            { front: "toss, throw, hurl ⚾", back: "Gentle, harder, super hard!" },
            { front: "said, was, friend 💛", back: "Tricky words: learn them by heart." },
            { front: "dictionary 📕", back: "A book of words in ABC order that tells what each word means." },
          ],
        },
        probe: {
          type: "place",
          prompt: "How hard? Put each word on the line, from gentle (1) to super hard (3).",
          min: 1,
          max: 3,
          step: 1,
          tolerance: 0,
          items: [
            { label: "toss", value: 1 },
            { label: "throw", value: 2 },
            { label: "hurl", value: 3 },
          ],
          hint: "A toss is gentle, like to a baby. A hurl is as hard as you can.",
          seconds: 25,
        },
        think: {
          q: "Which word means the hardest throw?",
          choices: ["toss", "hurl", "throw"],
          answer: 1,
          why: "To hurl is to throw with all your might.",
          hints: [
            "A toss is soft and gentle, the easiest kind of throw.",
            "",
            "Throw is in the middle. One word means even harder.",
          ],
        },
        approaches: {
          analogy:
            "Close words are like crayons in the same color family. 🖍️ Light blue, blue and dark blue are all blue, but each is a little different.",
          example:
            "You toss a ball to a baby. You throw a ball to a friend. A pitcher might hurl a fast ball. All three send a ball, with more and more force.",
          simpler: {
            q: "Is a toss gentle or super hard?",
            choices: ["gentle", "super hard"],
            answer: 0,
            why: "A toss is a soft, gentle throw.",
            hints: ["", "Super hard is a hurl. A toss is the soft one."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which word part does each word have?",
      buckets: ["Prefix at the front", "Suffix at the end", "Compound word"],
      items: [
        { text: "unpack", bucket: 0 },
        { text: "redo", bucket: 0 },
        { text: "untie", bucket: 0 },
        { text: "careful", bucket: 1 },
        { text: "softly", bucket: 1 },
        { text: "endless", bucket: 1 },
        { text: "sunshine", bucket: 2 },
        { text: "rainbow", bucket: 2 },
        { text: "birdhouse", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain to Pip how word parts help you read a new word like unhelpful.",
      keyPoints: [
        "Find the root word, help",
        "The prefix un means not",
        "The suffix ful means full of",
        "Unhelpful means not helpful",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Bird plus house makes {0}. 🐦🏠 Sun plus flower makes {1}. 🌻",
        blanks: [{ answers: ["birdhouse"] }, { answers: ["sunflower"] }],
        bank: ["birdhouse", "sunflower", "houseboat", "flowerpot"],
        hint: "Put the two words together in the same order.",
        mistakes: [{ match: "flowerpot", coach: "Flowerpot is a compound word, but it uses flower and pot. Look for sun + flower." }],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each word part to its meaning.",
        pairs: [
          { left: "un", right: "not" },
          { left: "re", right: "again" },
          { left: "ful", right: "full of" },
          { left: "less", right: "without" },
        ],
        hint: "Think of unhappy, retell, joyful and fearless.",
        seconds: 30,
      },
      {
        type: "place",
        prompt: "How hot? Put each word on the line, from a little hot (1) to the hottest (3).",
        min: 1,
        max: 3,
        step: 1,
        tolerance: 0,
        items: [
          { label: "warm", value: 1 },
          { label: "hot", value: 2 },
          { label: "boiling", value: 3 },
        ],
        hint: "Warm bath water is nice. Boiling water bubbles in a pot. Hot is in between.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the tricky words that don't sound the way they look.",
        sentences: ["said", "cat", "friend", "was", "pig"],
        correct: [0, 2, 3],
        hint: "Sound out each word. Cat and pig sound just like they look. The others play tricks.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does unhappy mean?",
        choices: ["happy again", "full of happy", "not happy"],
        answer: 2,
        why: "Un means not, so unhappy means not happy.",
      },
      {
        q: "Which word has a suffix at the end?",
        choices: ["kind", "kindly", "unkind"],
        answer: 1,
        why: "Kindly ends with the suffix ly. Unkind has a prefix at the front.",
      },
      {
        q: "Which is a compound word?",
        choices: ["lighthouse", "lightly", "relight"],
        answer: 0,
        why: "Lighthouse is two words, light and house, joined together.",
      },
      {
        q: "Which word means to throw very hard?",
        choices: ["toss", "drop", "hurl", "hand"],
        answer: 2,
        why: "To hurl is to throw with great force.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Word-part hunt! 🔍 With a grown-up, look at food boxes, books or signs. Find 2 words with a prefix (like un or re), 2 with a suffix (like ful, less or ly) and 1 compound word. Read them out loud and tell what each one means.",
      rubric: [
        "Found 2 prefix words and 2 suffix words",
        "Found 1 compound word",
        "Explained what each word means using its parts",
      ],
    },
  },

  // 3. Asking and answering questions; listening and talking
  {
    id: "ela-2.questions",
    title: "Who, What, Where, When, Why and How",
    minutes: 20,
    stage: "grammar",
    standards: ["RL.2.1", "RI.2.1", "RL.2.7", "SL.2.1", "SL.2.2", "SL.2.3"],
    read: [
      "Good readers ask questions. Six question words help: who, what, where, when, why and how.",
      "Here is an old fable from Aesop. One hot summer day, a thirsty crow found a pitcher. It had a little water at the bottom. The crow's beak could not reach it. The crow did not give up. It picked up a pebble and dropped it in. Plop! Then another, and another. The water rose higher and higher. At last, the crow could drink.",
      "Now ask questions! Who is the story about? A crow. What was the problem? The water was too low. Where was the water? In a pitcher. When did it happen? On a hot day. Why did the crow drop pebbles? To make the water rise. How did it solve the problem? One pebble at a time.",
      "Pictures help, too. They show where a story happens and how characters feel.",
      "Questions help when we listen and talk. Take turns. Listen to the speaker. If you don't understand, ask: Can you tell me more?",
    ].join("\n\n"),
    keyIdeas: [
      "Six question words: who, what, where, when, why and how.",
      "Who is a person or animal, where is a place, when is a time, why is a reason, how is the way.",
      "Pictures give clues about the characters, the setting and what happens.",
      "When we talk, we take turns, listen, and ask questions to learn more.",
    ],
    hook: {
      text: "A crow is very thirsty. 🐦💧 The water is too low to reach. What will it do? Let's ask good questions to find out!",
    },
    teach: [
      {
        title: "Six Question Words",
        teach:
          "Six little words help us understand stories. Who asks about a person or animal. What asks about a thing or an event. Where asks about a place. When asks about a time. Why asks for a reason. How asks about the way something happens. Good readers ask these questions. Then they answer them with details from the story.",
        visual: {
          type: "flip",
          cards: [
            { front: "Who? 🧑", back: "A person or animal: the crow." },
            { front: "What? 📦", back: "A thing or event: a pitcher of water." },
            { front: "Where? 📍", back: "A place: by the pitcher." },
            { front: "When? ⏰", back: "A time: one hot summer day." },
            { front: "Why? 🤔", back: "A reason: because it was thirsty." },
            { front: "How? 🔧", back: "The way: one pebble at a time." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each question word to what it asks about.",
          pairs: [
            { left: "Who?", right: "a person or animal" },
            { left: "What?", right: "a thing or event" },
            { left: "Where?", right: "a place" },
            { left: "When?", right: "a time" },
            { left: "Why?", right: "a reason" },
            { left: "How?", right: "the way it happens" },
          ],
          hint: "Where has the word here in it, a place. When is about time, like a clock.",
          seconds: 45,
        },
        think: {
          q: "Which question word asks about a place?",
          choices: ["When", "Where", "Who"],
          answer: 1,
          why: "Where asks about a place, like in a pitcher or by the river.",
          hints: [
            "When asks about a time, like morning or a hot day.",
            "",
            "Who asks about a person or animal, not a place.",
          ],
        },
        approaches: {
          analogy:
            "Question words are like keys on a ring. 🔑 Each key opens a different door: the people door, the place door, the time door.",
          example:
            "Where did the crow find water? In a pitcher. That answer is a place, so it fits the word where.",
          simpler: {
            q: "Where is the water? In a pitcher. Is that answer a place or a time?",
            choices: ["a place", "a time"],
            answer: 0,
            why: "A pitcher is a place where the water is.",
            hints: ["", "A time would be like morning or one hot day. In a pitcher tells a place."],
          },
        },
      },
      {
        title: "Asking Questions as You Read",
        teach:
          "Let's read a fable from Aesop. A thirsty crow found a pitcher. The water was too low to reach. The crow did not give up. It dropped in a pebble. Plop! Then another, and another. The water rose. At last, the crow could drink! Who is it about? A crow. Why did it drop pebbles? To make the water rise.",
        visual: {
          type: "hotspots",
          title: "The Crow and the Pitcher",
          center: "🐦 The crow",
          spots: [
            { label: "Who", icon: "🐦", detail: "A thirsty crow." },
            { label: "What", icon: "🏺", detail: "A pitcher with a little water at the bottom." },
            { label: "When", icon: "☀️", detail: "One hot summer day." },
            { label: "Why", icon: "💧", detail: "The crow was thirsty, and the water was too low." },
            { label: "How", icon: "🪨", detail: "It dropped in pebbles, one at a time, until the water rose." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Who is the story about? A {0}. 🐦 What did it drop in? {1}. 🪨 Why? To make the {2} rise. 💧",
          blanks: [{ answers: ["crow"] }, { answers: ["pebbles"] }, { answers: ["water"] }],
          bank: ["crow", "pebbles", "water", "dog", "sticks", "sun"],
          hint: "Think back to the fable. A bird, some little stones, and something to drink.",
          mistakes: [
            { match: "dog", coach: "There's no dog in this fable. The thirsty animal was a bird." },
            { match: "sticks", coach: "The crow dropped in little stones, not sticks." },
          ],
          seconds: 30,
        },
        think: {
          q: "Why did the crow drop pebbles in the pitcher?",
          choices: ["To make a noise", "To break the pitcher", "To make the water rise"],
          answer: 2,
          why: "Each pebble pushed the water up until the crow could reach it.",
          hints: [
            "The pebbles went plop, but the crow wasn't trying to make noise. It was thirsty.",
            "If the pitcher broke, the water would spill out. The crow wanted to drink it.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Asking questions while you read is like being a detective. 🕵️ You look for clues to answer who, what, where, when, why and how.",
          example:
            "Question: How did the crow get a drink? Clue: it dropped pebbles one by one, and the water rose. Answer: by dropping in pebbles until the water was high enough.",
          simpler: {
            q: "Was the crow thirsty?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "The story says the crow was thirsty. That is why it wanted the water.",
            hints: ["", "Look back: the story says a thirsty crow found a pitcher."],
          },
        },
      },
      {
        title: "Pictures, Listening and Talking",
        teach:
          "Pictures help us understand. A picture can show where a story happens. It can show how a character feels. Questions help when we talk, too. Take turns. Look at the speaker. Listen to the end. Then build on what they said. If you don't understand, ask a question. Can you tell me more? What did you mean?",
        visual: {
          type: "hotspots",
          title: "Good talking rules",
          center: "🗣️ Talking together",
          spots: [
            { label: "Look at the speaker", icon: "👀", detail: "Show you are listening with your eyes." },
            { label: "Listen to the end", icon: "👂", detail: "Let the speaker finish before you talk." },
            { label: "Take turns", icon: "✋", detail: "One person talks at a time." },
            { label: "Build on ideas", icon: "➕", detail: "Say: I agree, and I also think..." },
            { label: "Ask to understand", icon: "❓", detail: "Say: Can you tell me more?" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each one: good talking and listening, or not helpful?",
          buckets: ["Good talking and listening 👍", "Not helpful 👎"],
          items: [
            { text: "Look at the speaker", bucket: 0 },
            { text: "Wait for your turn", bucket: 0 },
            { text: "Ask: Can you tell me more?", bucket: 0 },
            { text: "Say: I agree, and I also think...", bucket: 0 },
            { text: "Talk over your friend", bucket: 1 },
            { text: "Look away and play", bucket: 1 },
            { text: "Change the subject", bucket: 1 },
          ],
          hint: "Good talkers take turns, listen and build on ideas. Would it help the talk or stop it?",
          seconds: 40,
        },
        think: {
          q: "Your friend says something you don't understand. What should you do?",
          choices: ["Ignore it", "Talk about something else", "Ask: What did you mean?"],
          answer: 2,
          why: "Asking a question helps you understand and shows you are listening.",
          hints: [
            "If you ignore it, you'll still be confused. A question can clear it up.",
            "Changing the subject leaves you confused. Ask about what they said.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A good talk is like playing catch. ⚾ One person throws an idea. The other catches it and throws one back. Nobody holds the ball forever.",
          example:
            "Mia says, 'I liked the crow because it was clever.' You build on it: 'I agree! And it never gave up.' Then you ask, 'Mia, what part did you like best?'",
          simpler: {
            q: "Should you listen when someone is talking?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Listening shows respect and helps you understand.",
            hints: ["", "If no one listens, nobody learns anything. Good talkers listen first."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What question does each answer go with?",
      buckets: ["Who?", "Where?", "When?", "Why?"],
      items: [
        { text: "the crow", bucket: 0 },
        { text: "a little mouse", bucket: 0 },
        { text: "by the pitcher", bucket: 1 },
        { text: "in the garden", bucket: 1 },
        { text: "one hot day", bucket: 2 },
        { text: "in the summer", bucket: 2 },
        { text: "because it was thirsty", bucket: 3 },
        { text: "so the water would rise", bucket: 3 },
      ],
    },
    explain: {
      prompt: "Tell the story of the crow and the pitcher. Then answer: who, what, why and how?",
      keyPoints: [
        "A thirsty crow is the main character",
        "The water in the pitcher was too low",
        "The crow dropped pebbles in one at a time",
        "The water rose and the crow could drink",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each question about the fable to its answer.",
        pairs: [
          { left: "Who?", right: "the crow" },
          { left: "When?", right: "one hot day" },
          { left: "Why?", right: "because it was thirsty" },
          { left: "How?", right: "with pebbles, one at a time" },
        ],
        hint: "Who is a character, when is a time, why is a reason, how is the way.",
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build a question to ask a speaker when you want to learn more.",
        tiles: ["Can", "you", "tell", "me", "more?"],
        distractors: ["stop", "talking"],
        hint: "Start with Can and end with the question mark.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Ask about a place: {0} is the river? 🏞️ Ask about a time: {1} does the market open? ⏰ Ask for a reason: {2} is the mill wheel stopped? ⚙️",
        blanks: [{ answers: ["where"] }, { answers: ["when"] }, { answers: ["why"] }],
        bank: ["Where", "When", "Why", "Who", "What"],
        hint: "Where is a place. When is a time. Why is a reason.",
        mistakes: [{ match: "who", coach: "Who asks about a person or animal. Look at what each question is asking about." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that ASKS a question.",
        sentences: [
          "Who found the pitcher?",
          "The crow was thirsty.",
          "How did the water rise?",
          "The pebbles went plop.",
          "Why did the crow keep trying?",
        ],
        correct: [0, 2, 4],
        hint: "Questions start with a question word and end with a question mark.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which question word asks for a reason?",
        choices: ["When", "Who", "Why"],
        answer: 2,
        why: "Why asks for a reason, like: because the crow was thirsty.",
      },
      {
        q: "In the fable, what was the crow's problem?",
        choices: ["The water was too low to reach", "It lost its nest", "It was too cold"],
        answer: 0,
        why: "The water was at the bottom of the pitcher, too low for the crow's beak.",
      },
      {
        q: "What can pictures in a story show you?",
        choices: ["Nothing at all", "Where the story happens and how characters feel", "Only the page number"],
        answer: 1,
        why: "Pictures give clues about the setting and the characters' feelings.",
      },
      {
        q: "What is a good way to join a talk?",
        choices: ["Talk over everyone", "Look away", "Change the subject", "Wait your turn and build on what others say"],
        answer: 3,
        why: "Good talkers take turns, listen and build on others' ideas.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Read or tell a short story with a grown-up. 📖 Then take turns: you ask 3 questions using who, what, where, when, why or how, and they ask you 3. Answer in full sentences.",
      rubric: [
        "Asked 3 questions using different question words",
        "Answered with details from the story",
        "Took turns and listened to the end",
      ],
    },
  },

  // 4. Fables and folktales: the moral, character responses, rhythm and repeated lines
  {
    id: "ela-2.fables",
    title: "Fables, Folktales and Their Lessons",
    minutes: 20,
    stage: "logic",
    standards: ["RL.2.2", "RL.2.3", "RL.2.4", "RL.2.10", "SL.2.2"],
    read: [
      "A fable is a short story that teaches a lesson. Many fables have talking animals. A Greek storyteller named Aesop told many of them long, long ago. The lesson is called the moral.",
      "In The Tortoise and the Hare, a fast hare laughed at a slow tortoise. They had a race. The hare ran far ahead, then took a nap. The tortoise kept going, step by step. He won! The moral: slow and steady wins the race.",
      "A folktale is an old story passed down by people telling it out loud. In The Little Red Hen, the hen asks for help to plant wheat. 'Not I,' said the cat. 'Not I,' said the dog. So she did the work herself. Then she baked bread. Everyone wanted some! But the bread went to the one who did the work. The repeated line, 'Not I,' gives the story a beat, like a song.",
      "Watch how characters respond to problems. The hare was proud. The tortoise was patient. The hen worked hard. Their choices teach the lesson.",
    ].join("\n\n"),
    keyIdeas: [
      "A fable is a short story that teaches a lesson, called the moral.",
      "Folktales are old stories passed down by people telling them out loud.",
      "How characters respond to problems helps us find the lesson.",
      "Repeated lines and rhymes give a story a beat, like a song.",
    ],
    hook: {
      text: "A speedy hare and a slow tortoise line up for a race. 🐇🐢 Who do you think will win? The answer might surprise you!",
    },
    teach: [
      {
        title: "What Is a Fable?",
        teach:
          "A fable is a short story that teaches a lesson. Often the characters are talking animals. Long ago, a Greek storyteller named Aesop told many fables. The lesson at the end is called the moral. To find the moral, ask: What did the character learn? What should I learn? A moral is a rule for living well.",
        visual: {
          type: "flip",
          cards: [
            { front: "Fable 🦊", back: "A short story that teaches a lesson, often with talking animals." },
            { front: "Moral 💡", back: "The lesson a fable teaches." },
            { front: "Aesop 📜", back: "A storyteller from ancient Greece who told many fables." },
            { front: "Folktale 🏡", back: "An old story passed down by people telling it out loud." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A short story that teaches a lesson is a {0}. 📖 The lesson at the end is called the {1}. 💡",
          blanks: [{ answers: ["fable"] }, { answers: ["moral"] }],
          bank: ["fable", "moral", "poem", "recipe", "map"],
          hint: "Aesop told these short animal stories. The lesson starts with the letter m.",
          mistakes: [{ match: "poem", coach: "A poem can be lovely, but a short story with a lesson is a fable." }],
          seconds: 25,
        },
        think: {
          q: "What is the moral of a fable?",
          choices: ["The title", "The lesson it teaches", "The last word"],
          answer: 1,
          why: "The moral is the lesson the fable teaches, like 'don't give up.'",
          hints: [
            "The title is the name of the story. The moral is what we learn from it.",
            "",
            "The last word is just a word. The moral is a whole lesson.",
          ],
        },
        approaches: {
          analogy:
            "A fable is like a gift box. 🎁 The story is the pretty wrapping. The moral is the gift inside that you get to keep.",
          example:
            "In The Crow and the Pitcher, the crow kept dropping pebbles until it could drink. What did it learn? Keep trying! So the moral is: don't give up.",
          simpler: {
            q: "Do fables teach lessons?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Every fable teaches a lesson, called the moral.",
            hints: ["", "Think of the crow. Its story taught us to keep trying. That's a lesson!"],
          },
        },
      },
      {
        title: "How Characters Respond",
        teach:
          "Characters face big problems. How they respond teaches the lesson. In The Tortoise and the Hare, the hare was proud. He ran ahead and took a nap. The tortoise was patient. He kept going, step by step. He won! The moral is slow and steady wins the race. In The Lion and the Mouse, a tiny mouse frees a big lion from a net. The moral? Even a small friend can be a big help.",
        visual: {
          type: "compare",
          left: { title: "🐇 The Hare", points: ["Fast", "Proud and boastful", "Took a nap", "Lost the race"] },
          right: { title: "🐢 The Tortoise", points: ["Slow", "Patient", "Kept going, step by step", "Won the race"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put The Tortoise and the Hare in order.",
          steps: [
            "🐇 The hare laughs at the slow tortoise.",
            "🏁 They start a race.",
            "😴 The hare runs far ahead and takes a nap.",
            "🐢 The tortoise keeps going, step by step.",
            "🏆 The tortoise wins!",
          ],
          hint: "The race has to start before anyone can nap. The winner comes last.",
          seconds: 40,
        },
        think: {
          q: "Why did the tortoise win the race?",
          choices: ["He kept going and did not stop", "He was faster", "The hare let him win"],
          answer: 0,
          why: "The tortoise was patient and kept going while the hare napped.",
          hints: [
            "",
            "The tortoise was slow! Speed is not why he won.",
            "The hare wanted to win. He just napped too long.",
          ],
        },
        approaches: {
          analogy:
            "Characters are like players in a game. 🎲 Their choices decide what happens. Good choices, like working hard, lead to good endings.",
          example:
            "The hare was proud, so he napped and lost. The tortoise was patient, so he kept going and won. Their responses show the moral: slow and steady wins the race.",
          simpler: {
            q: "Did the hare stop to take a nap?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "The hare was so sure he'd win that he took a nap.",
            hints: ["", "Look back: the hare ran far ahead, then took a nap."],
          },
        },
      },
      {
        title: "Folktales With a Beat",
        teach:
          "A folktale is an old story people told out loud for many years. Listen to The Little Red Hen. She found some wheat. Who will help me plant it? 'Not I,' said the cat. 'Not I,' said the dog. So she did it herself. The line 'Not I' repeats again and again. Repeated lines give a story a beat, like a song. They help us remember it!",
        visual: {
          type: "hotspots",
          title: "Story music",
          center: "🎵 Rhythm",
          spots: [
            { label: "Repeated lines", icon: "🔁", detail: "'Not I,' said the cat. 'Not I,' said the dog." },
            { label: "Rhyme", icon: "🎶", detail: "Words that end the same: hen, then, when." },
            { label: "Alliteration", icon: "🅰️", detail: "Words that start the same: busy bees buzz." },
            { label: "Beat", icon: "🥁", detail: "A steady rhythm you can clap along to." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the repeated lines that give the story its beat.",
          sentences: [
            "'Not I,' said the cat.",
            "The hen found some wheat.",
            "'Not I,' said the dog.",
            "She baked warm bread.",
            "'Not I,' said the duck.",
          ],
          correct: [0, 2, 4],
          hint: "Look for the words that come back again and again.",
          seconds: 25,
        },
        think: {
          q: "Why do folktales repeat lines?",
          choices: ["To make them longer", "Because the teller forgot", "To give a beat and help us remember"],
          answer: 2,
          why: "Repeated lines give a story rhythm, like a song, and make it easy to remember and tell.",
          hints: [
            "Length isn't the reason. Think about how a song's chorus helps you sing along.",
            "Tellers repeat lines on purpose. It makes the story fun to say.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A repeated line is like the chorus of a song. 🎤 It comes back again and again, so everyone can join in.",
          example:
            "Read it aloud: 'Who will help me bake the bread?' 'Not I,' said the cat. 'Not I,' said the dog. You can almost clap along: NOT I! NOT I!",
          simpler: {
            q: "Did the cat and the dog say the same words?",
            choices: ["Yes, they both said 'Not I'", "No, they said different words"],
            answer: 0,
            why: "Both animals said 'Not I.' That's a repeated line.",
            hints: ["", "Listen again: 'Not I,' said the cat. 'Not I,' said the dog. Same words!"],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put The Little Red Hen in order.",
      steps: [
        "🌾 The hen finds some wheat.",
        "🐱 She asks for help, but everyone says 'Not I.'",
        "🌱 She plants, cuts and grinds the wheat herself.",
        "🍞 She bakes warm bread.",
        "😋 Everyone wants some, but the bread goes to the hen who did the work.",
      ],
    },
    explain: {
      prompt: "Tell Pip The Tortoise and the Hare in your own words. What is the moral?",
      keyPoints: [
        "The hare was fast but proud and took a nap",
        "The tortoise kept going step by step",
        "The tortoise won the race",
        "The moral is slow and steady wins the race",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each story to its lesson.",
        pairs: [
          { left: "🐇🐢 The Tortoise and the Hare", right: "Slow and steady wins the race." },
          { left: "🦁🐭 The Lion and the Mouse", right: "Even a small friend can be a big help." },
          { left: "🐦🏺 The Crow and the Pitcher", right: "Don't give up. Keep trying." },
          { left: "🐔🍞 The Little Red Hen", right: "Those who do the work enjoy the reward." },
        ],
        hint: "Think about what each character did. The lesson grows out of their choices.",
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "How did each character respond? Sort the choices.",
        buckets: ["Wise choice 👍", "Poor choice 👎"],
        items: [
          { text: "The tortoise kept going", bucket: 0 },
          { text: "The hare took a nap", bucket: 1 },
          { text: "The hen did the work herself", bucket: 0 },
          { text: "The cat said 'Not I'", bucket: 1 },
          { text: "The crow kept dropping pebbles", bucket: 0 },
          { text: "The hare bragged", bucket: 1 },
        ],
        hint: "Which choices helped the character or others? Which ones caused trouble?",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "In The Little Red Hen, the cat and the dog kept saying '{0} I.' A line that comes back again and again is called a {1} line.",
        blanks: [{ answers: ["not"] }, { answers: ["repeated"] }],
        bank: ["Not", "repeated", "Yes", "rhyming", "quiet"],
        hint: "Remember what the lazy animals said. The line came back again and again.",
        mistakes: [{ match: "yes", coach: "If they said yes, they would have helped! They said the opposite." }],
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the sentence that tells the moral of The Tortoise and the Hare.",
        sentences: ["The hare ran very fast.", "Slow and steady wins the race.", "The race started by a tree."],
        correct: [1],
        hint: "The moral is the lesson, a rule for living well, not just something that happened.",
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What do we call the lesson of a fable?",
        choices: ["The moral", "The title", "The setting"],
        answer: 0,
        why: "The lesson a fable teaches is called the moral.",
      },
      {
        q: "Why did the hare lose the race?",
        choices: ["He was too slow", "He tripped", "He took a nap"],
        answer: 2,
        why: "The hare was proud and napped, so the tortoise passed him.",
      },
      {
        q: "What repeated line do the animals say in The Little Red Hen?",
        choices: ["Yes, please", "Not I", "Me first"],
        answer: 1,
        why: "Each animal says 'Not I,' and the line repeats like a song.",
      },
      {
        q: "Who told many fables long ago?",
        choices: ["The hare", "The Little Red Hen", "The crow", "Aesop"],
        answer: 3,
        why: "Aesop was a storyteller from ancient Greece who told many fables.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Retell a fable to your family! 🎭 Pick The Tortoise and the Hare, The Lion and the Mouse or The Little Red Hen. Tell the beginning, middle and end, say how a character responded to the problem, then say the moral.",
      rubric: [
        "Told the beginning, middle and end in order",
        "Described how a character responded to the problem",
        "Said the moral clearly",
      ],
    },
  },

  // 5. Story structure, point of view, two versions of one story
  {
    id: "ela-2.story-structure",
    title: "Story Shape, Points of View and Two Versions",
    minutes: 20,
    stage: "logic",
    standards: ["RL.2.5", "RL.2.6", "RL.2.7", "RL.2.9", "RL.2.10"],
    read: [
      "Every story has a shape. The beginning introduces the characters and the setting. The middle has a problem. The ending wraps it up and solves the problem.",
      "Here is an old folktale called Stone Soup. A hungry traveler came to a village. Nobody wanted to share food. So he filled a pot with water and dropped in a stone. 'I am making stone soup,' he said. 'It would taste better with a carrot.' One neighbor brought a carrot. Another brought onions. Another brought beans. Soon there was a real soup, and the whole village ate together.",
      "In Sweden, people tell the same kind of story. It is called Nail Soup, and the traveler uses a nail! The stories are alike: a clever traveler, a pot of soup and neighbors who share. They are different, too: a stone or a nail, told in different places.",
      "Characters can see things differently. At first, the neighbors thought, 'He just wants our food.' The traveler thought, 'If we all share a little, we all eat a lot.' When you read their words aloud, give each one a different voice.",
    ].join("\n\n"),
    keyIdeas: [
      "The beginning introduces characters and setting, the middle has a problem, and the ending solves it.",
      "Two versions of the same story can be alike in some ways and different in others.",
      "Characters can see the same thing in different ways, so read each one in a different voice.",
      "Pictures and words together help us understand a story.",
    ],
    hook: {
      text: "Can you make soup from a stone? 🪨🍲 A clever traveler says yes! Let's see how he does it.",
    },
    teach: [
      {
        title: "Beginning, Middle and End",
        teach:
          "Every story has a shape. The beginning tells who and where. A hungry traveler comes to a village. The middle has a problem. Nobody wants to share food. So he makes stone soup and asks for a carrot, then onions, then beans. The ending solves the problem. The whole village eats together. Endings wrap the story up.",
        visual: {
          type: "hotspots",
          title: "Story shape",
          center: "📖 Stone Soup",
          spots: [
            { label: "Beginning", icon: "🚪", detail: "Introduces the characters and setting: a hungry traveler comes to a village." },
            { label: "Middle", icon: "⛰️", detail: "The problem: nobody wants to share, so the traveler starts stone soup." },
            { label: "Ending", icon: "🏁", detail: "The problem is solved: everyone shares and eats soup together." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is it from the beginning, the middle or the ending of Stone Soup?",
          buckets: ["Beginning 🚪", "Middle ⛰️", "Ending 🏁"],
          items: [
            { text: "A hungry traveler walks down a long road.", bucket: 0 },
            { text: "He comes to a village.", bucket: 0 },
            { text: "Nobody wants to share food.", bucket: 1 },
            { text: "Neighbors bring carrots and beans.", bucket: 1 },
            { text: "The whole village eats soup together.", bucket: 2 },
          ],
          hint: "The beginning meets the traveler. The middle has the problem. The ending solves it.",
          seconds: 40,
        },
        think: {
          q: "What does the ending of a story do?",
          choices: ["Introduces the characters", "Wraps up the problem", "Lists the pages"],
          answer: 1,
          why: "The ending solves the problem and wraps up the story.",
          hints: [
            "Meeting the characters happens at the beginning, not the end.",
            "",
            "Page numbers aren't part of the story's shape. Think about the problem.",
          ],
        },
        approaches: {
          analogy:
            "A story is like crossing a bridge. 🌉 You step on at the beginning, cross the bumpy middle and step off safely at the end.",
          example:
            "Beginning: a hungry traveler arrives. Middle: no one will share, so he starts stone soup. Ending: everyone adds food and they eat together. Problem solved!",
          simpler: {
            q: "Does the beginning tell who is in the story?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "The beginning introduces the characters and the setting.",
            hints: ["", "Think of Stone Soup. We meet the traveler right at the start."],
          },
        },
      },
      {
        title: "Different Points of View",
        teach:
          "Characters can see the same thing in different ways. That is called point of view. At first, a neighbor thought, 'He just wants our food!' The traveler thought, 'If we all share a little, we all eat a lot.' When you read aloud, give each character a voice. Use a grumpy voice for the neighbor. Use a cheerful voice for the traveler.",
        visual: {
          type: "compare",
          left: { title: "😠 A neighbor (at first)", points: ["He just wants our food!", "I will keep my carrots."] },
          right: { title: "😊 The traveler", points: ["If we all share, we all eat.", "Stone soup will be delicious!"] },
        },
        probe: {
          type: "match",
          prompt: "Who might say it? Match each line to the character.",
          pairs: [
            { left: "'Keep your hands off my beans!'", right: "😠 the grumpy neighbor, at first" },
            { left: "'A carrot would make it even better!'", right: "😊 the clever traveler" },
            { left: "'This is the best soup we ever ate!'", right: "😋 the happy village, at the end" },
          ],
          hint: "Think about how each character felt, and when.",
          seconds: 30,
        },
        think: {
          q: "Why did the neighbors not want to share at first?",
          choices: ["They had no food at all", "They thought the traveler just wanted their food", "They were asleep"],
          answer: 1,
          why: "From their point of view, a stranger was just trying to take their food.",
          hints: [
            "They did have food: carrots, onions and beans! Think about what they believed.",
            "",
            "The neighbors were awake. Think about what they thought of the traveler.",
          ],
        },
        approaches: {
          analogy:
            "Point of view is like looking out different windows of the same house. 🪟 Each window shows the yard a little differently.",
          example:
            "Grumpy neighbor voice: 'He just wants our food!' 😠 Cheerful traveler voice: 'Let's all share a little!' 😊 Same day, two very different views.",
          simpler: {
            q: "At first, did the traveler and the neighbors think the same thing?",
            choices: ["Yes", "No, they thought different things"],
            answer: 1,
            why: "The traveler wanted to share; the neighbors wanted to keep their food.",
            hints: ["The neighbors wanted to keep their food. Did the traveler want that too?", ""],
          },
        },
      },
      {
        title: "Two Versions of One Story",
        teach:
          "Sometimes people in different places tell the same kind of story. In Sweden, people tell Nail Soup. The traveler uses a nail instead of a stone! Both stories have a clever traveler. Both have neighbors who learn to share. But one uses a stone, and one uses a nail. Look at the pictures in each book, too. They show you each setting.",
        visual: {
          type: "compare",
          left: { title: "🪨 Stone Soup", points: ["A hungry traveler", "A stone in the pot", "Neighbors share food"] },
          right: { title: "🔩 Nail Soup (Sweden)", points: ["A hungry traveler", "A nail in the pot", "Neighbors share food"] },
        },
        probe: {
          type: "sort",
          prompt: "Stone Soup and Nail Soup: the same in both, or different?",
          buckets: ["Same in both 🤝", "Different ↔️"],
          items: [
            { text: "A clever traveler", bucket: 0 },
            { text: "A pot of soup", bucket: 0 },
            { text: "Neighbors learn to share", bucket: 0 },
            { text: "A stone or a nail", bucket: 1 },
            { text: "Where the story is told", bucket: 1 },
          ],
          hint: "Both stories have a traveler and soup. What goes in the pot first?",
          seconds: 30,
        },
        think: {
          q: "How are Stone Soup and Nail Soup different?",
          choices: ["One has no soup", "Only one has a traveler", "One uses a stone and one uses a nail"],
          answer: 2,
          why: "The big difference is what the traveler drops in the pot.",
          hints: [
            "Both stories have soup. It's in the name!",
            "Both stories have a hungry traveler.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Two versions of a story are like two cakes from the same recipe. 🎂 One has chocolate frosting, one has vanilla, but both are cakes.",
          example:
            "Alike: both have a hungry traveler, a pot and neighbors who share. Different: Stone Soup uses a stone, and Nail Soup, from Sweden, uses a nail.",
          simpler: {
            q: "Do both stories have soup?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Stone Soup and Nail Soup both end with a pot of soup.",
            hints: ["", "Look at the names: Stone SOUP and Nail SOUP."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put Stone Soup in order.",
      steps: [
        "🚶 A hungry traveler comes to a village.",
        "🚫 Nobody wants to share food.",
        "🪨 He drops a stone in a pot of water.",
        "🥕 Neighbors bring carrots, onions and beans.",
        "🍲 Everyone eats soup together.",
      ],
    },
    explain: {
      prompt: "Tell Pip how Stone Soup and Nail Soup are alike and how they are different.",
      keyPoints: [
        "Both have a hungry, clever traveler",
        "Both end with neighbors sharing soup",
        "One uses a stone and the other uses a nail",
        "Nail Soup is told in Sweden",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "The {0} introduces the characters. The {1} has the problem. The {2} solves it.",
        blanks: [{ answers: ["beginning"] }, { answers: ["middle"] }, { answers: ["ending", "end"] }],
        bank: ["beginning", "middle", "ending", "title", "cover"],
        hint: "A story goes beginning, middle, ending.",
        mistakes: [{ match: "title", coach: "The title is the story's name. Which part of the story does that job?" }],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each story to the thing that matters most in it.",
        pairs: [
          { left: "Stone Soup", right: "🪨 a stone" },
          { left: "Nail Soup", right: "🔩 a nail" },
          { left: "The Little Red Hen", right: "🌾 wheat" },
          { left: "The Crow and the Pitcher", right: "🏺 a pitcher" },
        ],
        hint: "The name of each story is a big clue.",
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Who thinks it?",
        buckets: ["😠 A neighbor, at first", "😊 The traveler"],
        items: [
          { text: "He just wants our food!", bucket: 0 },
          { text: "I'll hide my carrots.", bucket: 0 },
          { text: "If we share, we all eat.", bucket: 1 },
          { text: "This soup needs one more thing!", bucket: 1 },
        ],
        hint: "The neighbors didn't trust the traveler at first. The traveler wanted everyone to share.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the sentences that come from the ENDING.",
        sentences: ["A traveler came down the road.", "Everyone ate soup together.", "Nobody wanted to share.", "The village had a happy feast."],
        correct: [1, 3],
        hint: "The ending is where the problem is solved and everyone is happy.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does the beginning of a story do?",
        choices: ["Solves the problem", "Introduces the characters and setting", "Says goodbye"],
        answer: 1,
        why: "The beginning tells who is in the story and where it happens.",
      },
      {
        q: "How are Stone Soup and Nail Soup alike?",
        choices: ["Both have a traveler who gets neighbors to share", "Both happen on the moon", "Both are about a race"],
        answer: 0,
        why: "In both, a clever traveler gets the neighbors to share and make soup.",
      },
      {
        q: "What is point of view?",
        choices: ["The title", "The page number", "How a character sees things"],
        answer: 2,
        why: "Point of view is how a character sees or thinks about what happens.",
      },
      {
        q: "When you read characters' words aloud, what should you do?",
        choices: ["Read super fast", "Use a different voice for each character", "Whisper everything", "Skip the talking parts"],
        answer: 1,
        why: "A different voice for each character shows their point of view and brings the story to life.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Puppet show time! 🧦 Act out Stone Soup with a grown-up. Show a beginning, a middle and an ending. Use a grumpy voice for a neighbor and a cheerful voice for the traveler. Draw the soup pot to show your audience.",
      rubric: [
        "Showed a clear beginning, middle and ending",
        "Used different voices for different characters",
        "Showed how the neighbors changed their minds",
      ],
    },
  },

  // 6. Nonfiction: main topic, text features, diagrams, author's purpose
  {
    id: "ela-2.nonfiction",
    title: "Nonfiction: Main Topic and Text Features",
    minutes: 20,
    stage: "logic",
    standards: ["RI.2.2", "RI.2.4", "RI.2.5", "RI.2.6", "RI.2.7", "RI.2.10"],
    read: [
      "Nonfiction tells true facts. Let's read about water mills, like the mill in Riverbend.",
      "A water mill uses moving water to do work. The river pushes the paddles of a big wheel. The wheel turns. Inside the mill, the turning wheel spins gears. The gears turn a heavy, round stone called a millstone.",
      "The millstone grinds grain, like wheat, into soft flour. Bakers use the flour to make bread. The person who runs the mill is called a miller. People have used water mills for more than two thousand years.",
      "The main topic is what the whole text is about. Here, it is water mills. Each paragraph has its own focus. One tells how the wheel turns. One tells what the millstone does.",
      "Nonfiction books have text features. A title names the topic. Subheadings name each part. Bold words are important. A caption explains a picture. A glossary tells what hard words mean. A diagram is a picture with labels that shows how something works.",
    ].join("\n\n"),
    keyIdeas: [
      "The main topic is what the whole text is about; each paragraph has its own focus.",
      "Text features like subheadings, bold words, captions and a glossary help you find facts fast.",
      "A diagram is a labeled picture that shows how something works.",
      "Authors write to answer, explain or describe something.",
    ],
    hook: {
      text: "The big wheel at the Riverbend mill has stopped. ⚙️💧 How does a mill even work? Let's read a true book to find out!",
    },
    teach: [
      {
        title: "Main Topic and Focus",
        teach:
          "Nonfiction tells true facts. The main topic is what the whole text is about. Our text is about water mills. Each paragraph has a focus, a smaller idea. One paragraph tells how the river turns the big wheel. Another tells how a millstone grinds wheat into flour. Ask: What is this whole text about? Then ask: What is this part about?",
        visual: {
          type: "hotspots",
          title: "A text about water mills",
          center: "📘 Water Mills",
          spots: [
            { label: "Paragraph 1", icon: "💧", detail: "The river pushes the paddles and turns the big wheel." },
            { label: "Paragraph 2", icon: "⚙️", detail: "The wheel spins gears that turn the millstone." },
            { label: "Paragraph 3", icon: "🌾", detail: "The millstone grinds wheat into flour for bread." },
            { label: "Paragraph 4", icon: "🧑", detail: "A miller runs the mill. People have used mills for over two thousand years." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the sentence that tells the MAIN TOPIC of the whole text.",
          sentences: ["This text is all about water mills.", "The paddles get wet.", "Bread is tasty.", "Wheat is a grain."],
          correct: [0],
          hint: "The main topic is what the WHOLE text is about, not just one small detail.",
          seconds: 20,
        },
        think: {
          q: "What is the main topic of a text?",
          choices: ["The first word", "The last picture", "What the whole text is about"],
          answer: 2,
          why: "The main topic is the big idea the whole text is about.",
          hints: [
            "The first word is just one word. The main topic covers the whole text.",
            "One picture shows one part. The main topic covers everything.",
            "",
          ],
        },
        approaches: {
          analogy:
            "The main topic is like the name on a lunchbox. 🍱 Each little box inside holds its own food, the way each paragraph holds its own focus.",
          example:
            "A book called Water Mills has one page on wheels, one on gears and one on millstones. The main topic is water mills. The focus of the gears page is gears.",
          simpler: {
            q: "A book is all about bees. Is its main topic bees?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "If the whole book is about bees, then bees is the main topic.",
            hints: ["", "The main topic is what the whole book is about. This book is all about bees!"],
          },
        },
      },
      {
        title: "Text Features",
        teach:
          "Nonfiction books have helpers called text features. The title names the topic. Subheadings are little titles for each part. Bold words are dark and important. A caption is words under a picture. A glossary, at the back, tells what hard words mean. An index lists topics and their page numbers. Online, menus and icons help you click to facts.",
        visual: {
          type: "flip",
          cards: [
            { front: "Subheading 🏷️", back: "A little title for one part of the text." },
            { front: "Bold word 🅱️", back: "A dark, important word." },
            { front: "Caption 🖼️", back: "Words that explain a picture." },
            { front: "Glossary 📒", back: "A list of hard words and what they mean, at the back of the book." },
            { front: "Index 🔎", back: "An ABC list of topics and their page numbers." },
            { front: "Icon 🖱️", back: "A little picture you click on a screen." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each job to the text feature that does it.",
          pairs: [
            { left: "Tells what a hard word means", right: "glossary" },
            { left: "Explains a picture", right: "caption" },
            { left: "A little title for one part", right: "subheading" },
            { left: "Lists topics with page numbers", right: "index" },
          ],
          hint: "Glossary = word meanings. Caption = under a picture. Index = page numbers.",
          seconds: 35,
        },
        think: {
          q: "Where would you look to find what millstone means?",
          choices: ["The glossary", "The cover", "A page number"],
          answer: 0,
          why: "A glossary lists hard words and tells what they mean.",
          hints: [
            "",
            "The cover shows the title, not word meanings.",
            "A page number tells you where you are, not what a word means.",
          ],
        },
        approaches: {
          analogy:
            "Text features are like signs in a big store. 🪧 They point you to the right aisle, so you find what you need fast.",
          example:
            "Want to know what miller means? Flip to the glossary at the back. Under M, it says: miller, a person who runs a mill. Found it!",
          simpler: {
            q: "Is a glossary a list of word meanings?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A glossary lists hard words and what they mean.",
            hints: ["", "A glossary is at the back of a book. It tells what hard words mean."],
          },
        },
      },
      {
        title: "Diagrams and the Author's Purpose",
        teach:
          "A diagram is a picture with labels. It shows how something works. A mill diagram shows the water, wheel, gears and millstone. Follow the arrows and you see how the river makes flour! Authors also have a purpose, a reason for writing. They write to answer a question, explain how something works or describe something. This author explains how a mill works.",
        visual: {
          type: "hotspots",
          title: "Mill diagram",
          center: "🏠 Water mill",
          spots: [
            { label: "River", icon: "💧", detail: "Moving water pushes the paddles." },
            { label: "Wheel", icon: "🎡", detail: "The big wheel turns." },
            { label: "Gears", icon: "⚙️", detail: "Gears carry the turning inside the mill." },
            { label: "Millstone", icon: "🪨", detail: "The heavy stone grinds the grain." },
            { label: "Flour", icon: "🌾", detail: "Soft flour comes out, ready for bread." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Follow the diagram! Put the steps in order.",
          steps: [
            "💧 The river pushes the paddles.",
            "🎡 The big wheel turns.",
            "⚙️ The gears spin.",
            "🪨 The millstone grinds the wheat.",
            "🍞 Flour is ready for bread.",
          ],
          hint: "Start with the water outside. End with what comes out of the mill.",
          seconds: 35,
        },
        think: {
          q: "Why did the author write the mill text?",
          choices: ["To tell a funny joke", "To explain how a mill works", "To sell bread"],
          answer: 1,
          why: "The text and diagram explain, step by step, how a mill works.",
          hints: [
            "The text has no jokes. It tells true facts about mills.",
            "",
            "The text doesn't ask you to buy anything. It teaches how mills work.",
          ],
        },
        approaches: {
          analogy:
            "A diagram is like a treasure map with labels. 🗺️ Instead of reading lots of words, you follow the arrows to see what happens.",
          example:
            "Words alone: the wheel turns gears that turn a stone. That's hard to picture! The diagram shows the wheel, an arrow to the gears and an arrow to the millstone. Now it's clear.",
          simpler: {
            q: "Does a diagram have labels?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A diagram is a picture with labels that name its parts.",
            hints: ["", "Think of the mill picture: it had words naming the wheel, gears and millstone."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which text feature is it?",
      buckets: ["Title or subheading", "Caption", "Glossary entry"],
      items: [
        { text: "Water Mills", bucket: 0 },
        { text: "How the Wheel Turns", bucket: 0 },
        { text: "The Millstone", bucket: 0 },
        { text: "A miller pours wheat into the mill.", bucket: 1 },
        { text: "The big wheel turns in the river.", bucket: 1 },
        { text: "millstone: a heavy, round stone that grinds grain", bucket: 2 },
        { text: "miller: a person who runs a mill", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain to Pip how a water mill turns river water into flour. Use the diagram words.",
      keyPoints: [
        "Moving water pushes the paddles and turns the wheel",
        "The wheel turns gears",
        "The gears turn a heavy millstone",
        "The millstone grinds grain into flour",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "The {0} at the back of a book tells what hard words mean. 📒 The words under a picture are a {1}. 🖼️",
        blanks: [{ answers: ["glossary"] }, { answers: ["caption"] }],
        bank: ["glossary", "caption", "cover", "title", "index"],
        hint: "One feature is a word list at the back. The other explains a picture.",
        mistakes: [
          { match: "index", coach: "An index lists page numbers. Word meanings are in the glossary." },
          { match: "title", coach: "A title names the whole book or part. Words under a picture are a caption." },
        ],
        seconds: 25,
      },
      {
        type: "number",
        prompt: "Look at this index. 🔎 Gears, page 6. Millstone, page 9. Wheel, page 4. On which page can you read about the millstone?",
        answer: 9,
        hint: "Find the word millstone in the index. The number next to it is the page.",
        mistakes: [
          { match: "4", coach: "Page 4 is for the wheel. Find the word millstone." },
          { match: "6", coach: "Page 6 is for gears. Find the word millstone." },
        ],
        seconds: 20,
      },
      {
        type: "sequence",
        prompt: "Put wheat's trip to the table in order.",
        steps: [
          "🌾 A farmer grows wheat.",
          "🛒 The wheat goes to the mill.",
          "🪨 The millstone grinds it into flour.",
          "🍞 A baker makes bread.",
        ],
        hint: "The wheat has to grow before it can be ground, and ground before it is baked.",
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the sentence that tells the author's purpose.",
        sentences: ["This book will explain how a water mill works.", "Mills are often near rivers.", "Flour is soft."],
        correct: [0],
        hint: "The purpose is the author's reason for writing: to answer, explain or describe.",
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What is the main topic of the mill text?",
        choices: ["Bread recipes", "Water mills", "Fish in the river"],
        answer: 1,
        why: "The whole text is about water mills.",
      },
      {
        q: "What does a caption do?",
        choices: ["Explains a picture", "Lists page numbers", "Names the author"],
        answer: 0,
        why: "A caption is the words under a picture that explain it.",
      },
      {
        q: "What grinds the wheat into flour?",
        choices: ["The paddles", "The river", "The millstone"],
        answer: 2,
        why: "The heavy millstone grinds grain into flour.",
      },
      {
        q: "Why do authors use diagrams?",
        choices: ["To fill space", "To hide facts", "To make the book heavy", "To show how something works"],
        answer: 3,
        why: "A diagram's labels and arrows make it clear how something works.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Text feature hunt! 🔍 With a grown-up, open a nonfiction book. Find a title, a subheading, a caption and a glossary or index. Tell what each one does. Then say the main topic of the book in one sentence.",
      rubric: [
        "Found at least 3 text features",
        "Told what each feature does",
        "Said the main topic in a complete sentence",
      ],
    },
  },

  // 7. Events in order, reasons, two texts on one topic, shared research
  {
    id: "ela-2.compare-texts",
    title: "Steps, Reasons and Two Texts",
    minutes: 20,
    stage: "logic",
    standards: ["RI.2.3", "RI.2.8", "RI.2.9", "W.2.7", "W.2.8", "SL.2.2"],
    read: [
      "Nonfiction can tell true events in order. Wilbur and Orville Wright were brothers. They ran a bicycle shop in Dayton, Ohio. They dreamed of flying.",
      "First, they watched birds and read about flying. Next, they built gliders and tested them on windy sand hills near Kitty Hawk, North Carolina. Then they built a small wind tunnel to test wing shapes. Finally, on December 17, 1903, Orville flew their airplane, the Flyer, for 12 seconds. It was the first powered airplane flight!",
      "Authors give reasons to support their points. One author says the Wrights were careful workers. Her reasons: they tested again and again, and they wrote down what they learned.",
      "Two texts can be about the same topic. One may tell about the first flight. Another may tell about the bicycle shop. Compare them. Which important points are the same? Which are different?",
      "You can be a researcher, too. Read two books on a topic. Write down facts. Then use them to answer a question.",
    ].join("\n\n"),
    keyIdeas: [
      "Time words like first, next, then and finally show how events connect.",
      "Authors give reasons to support their points.",
      "Two texts on one topic share some important points and differ on others.",
      "Researchers read sources, write down facts and use them to answer a question.",
    ],
    hook: {
      text: "Long ago, nobody had ever flown an airplane. ✈️ Two brothers from a bicycle shop wanted to try. 🚲 How did they do it?",
    },
    teach: [
      {
        title: "Events in Order",
        teach:
          "Nonfiction can tell true events in order. Wilbur and Orville Wright ran a bicycle shop. First, they studied birds. Next, they tested gliders on windy sand hills. Then they built a wind tunnel to test wings. Finally, on December 17, 1903, Orville flew their airplane for 12 seconds! Time words like first, next, then and finally connect the events.",
        visual: {
          type: "timeline",
          events: [
            { year: 1900, label: "First gliders", detail: "The brothers test a glider near Kitty Hawk, North Carolina." },
            { year: 1901, label: "Wind tunnel", detail: "They build a small wind tunnel to test wing shapes." },
            { year: 1903, label: "First flight!", detail: "On December 17, Orville flies the Flyer for 12 seconds." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the Wright brothers' steps in order.",
          steps: [
            "🐦 The brothers study how birds fly.",
            "🪁 They test gliders on windy sand hills.",
            "🌬️ They build a wind tunnel to test wings.",
            "✈️ Orville flies the Flyer for 12 seconds!",
          ],
          hint: "They had to learn and test before the big flight.",
          seconds: 30,
        },
        think: {
          q: "Which time word tells the last step?",
          choices: ["First", "Next", "Finally"],
          answer: 2,
          why: "Finally tells the last event, like the first flight.",
          hints: [
            "First tells the very beginning, not the end.",
            "Next tells a middle step. Something comes after it.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Events in order are like train cars. 🚂 Each car hooks onto the one before it. Time words are the hooks.",
          example:
            "First they tested gliders. Next they built a wind tunnel. Finally they flew. The tests came first because they had to learn before the big flight.",
          simpler: {
            q: "Does first come before next?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "First is the start. Next comes after it.",
            hints: ["", "Think of lining up: first in line comes before the next person."],
          },
        },
      },
      {
        title: "Reasons Support Points",
        teach:
          "Authors make points. Then they give reasons. Here is a point: the Wright brothers were careful workers. Why should we believe it? Reason one: they tested their gliders again and again. Reason two: they wrote down what they learned. Reason three: they built a wind tunnel to test wings. Good reasons hold up a point, like legs hold up a table.",
        visual: {
          type: "hotspots",
          title: "Point and reasons",
          center: "📌 They were careful workers",
          spots: [
            { label: "Testing", icon: "🪁", detail: "They tested their gliders again and again." },
            { label: "Notes", icon: "📝", detail: "They wrote down what they learned." },
            { label: "Wind tunnel", icon: "🌬️", detail: "They built a wind tunnel to test wing shapes." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Point: The Wrights were careful workers. Does each sentence support that point?",
          buckets: ["Supports the point ✅", "Does not support it ❌"],
          items: [
            { text: "They tested again and again.", bucket: 0 },
            { text: "They wrote down what they learned.", bucket: 0 },
            { text: "They built a wind tunnel to test wings.", bucket: 0 },
            { text: "Ohio has many towns.", bucket: 1 },
            { text: "Bicycles have two wheels.", bucket: 1 },
          ],
          hint: "A reason tells WHY the brothers were careful. Does the sentence show them being careful?",
          seconds: 30,
        },
        think: {
          q: "Which reason supports the point 'The Wrights were careful workers'?",
          choices: ["They liked pie", "Their shop had a door", "They tested again and again"],
          answer: 2,
          why: "Testing again and again shows they were careful.",
          hints: [
            "Liking pie doesn't show anything about careful work.",
            "Every shop has a door. That doesn't show careful work.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A point is like a tabletop, and reasons are the legs. 🪑 With strong legs, the table stands. With no legs, it falls flat.",
          example:
            "Point: Pip is a good friend. Reasons: Pip helps me carry things. Pip shares snacks. Pip listens. Each reason holds up the point.",
          simpler: {
            q: "Does a reason tell why?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A reason tells why we should believe a point.",
            hints: ["", "Reasons often come after the word because. They tell why."],
          },
        },
      },
      {
        title: "Two Texts, One Topic",
        teach:
          "Two texts can tell about the same topic. Text A tells about the first flight in 1903. Text B tells about the brothers' bicycle shop. Both say the brothers worked as a team. But only Text A tells how long the flight lasted. Researchers read both. They write down facts. Then they use the facts to answer a question.",
        visual: {
          type: "compare",
          left: { title: "📗 Text A: The First Flight", points: ["December 17, 1903", "Orville flew for 12 seconds", "The brothers worked as a team"] },
          right: { title: "📘 Text B: The Bicycle Shop", points: ["They fixed and built bicycles", "Their shop was in Dayton, Ohio", "The brothers worked as a team"] },
        },
        probe: {
          type: "sort",
          prompt: "Where is each fact? Only Text A, only Text B, or both?",
          buckets: ["Only Text A 📗", "Only Text B 📘", "Both texts 🤝"],
          items: [
            { text: "Orville flew for 12 seconds", bucket: 0 },
            { text: "December 17, 1903", bucket: 0 },
            { text: "They fixed bicycles", bucket: 1 },
            { text: "Their shop was in Dayton, Ohio", bucket: 1 },
            { text: "The brothers worked as a team", bucket: 2 },
          ],
          hint: "Text A is about the flight. Text B is about the shop. One fact is in both.",
          seconds: 35,
        },
        think: {
          q: "What important point is in BOTH texts?",
          choices: ["The flight lasted 12 seconds", "The brothers worked as a team", "They fixed bicycles"],
          answer: 1,
          why: "Both texts say the brothers worked together as a team.",
          hints: [
            "Only Text A, about the flight, tells how long it lasted.",
            "",
            "Only Text B, about the shop, tells about fixing bicycles.",
          ],
        },
        approaches: {
          analogy:
            "Two texts on one topic are like two friends telling about the same party. 🎉 Both say there was cake, but only one noticed the balloons.",
          example:
            "Text A: they flew in 1903. Text B: they ran a bike shop. Both: they were a team. Put the facts together to answer: How did they learn to fly? With teamwork, tools and many tests.",
          simpler: {
            q: "Can two books be about the same topic?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Many books can be about one topic, each with its own facts.",
            hints: ["", "Think of a library: it has lots of books about dogs, or about airplanes."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the research steps in order.",
      steps: [
        "❓ Choose a question to answer.",
        "📚 Read two books on the topic.",
        "📝 Write down important facts.",
        "🗣️ Use the facts to answer the question.",
      ],
    },
    explain: {
      prompt: "Tell Pip how the Wright brothers got ready for the first flight. Use first, next, then and finally.",
      keyPoints: [
        "They studied birds and flying",
        "They tested gliders again and again",
        "They built a wind tunnel to test wings",
        "Orville flew the Flyer in 1903 for 12 seconds",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "How many seconds did the first airplane flight last? ⏱️",
        answer: 12,
        unit: "seconds",
        hint: "Look back at the story of December 17, 1903.",
        mistakes: [{ match: "1903", coach: "1903 is the year. How many seconds was Orville in the air?" }],
        seconds: 15,
      },
      {
        type: "place",
        prompt: "Put each event on the timeline.",
        min: 1899,
        max: 1904,
        step: 1,
        tolerance: 0,
        items: [
          { label: "First gliders tested", value: 1900 },
          { label: "Wind tunnel built", value: 1901 },
          { label: "First airplane flight", value: 1903 },
        ],
        hint: "Gliders came first, then the wind tunnel, then the famous flight in 1903.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "{0}, they tested gliders. {1}, they built a wind tunnel. {2}, Orville flew!",
        blanks: [{ answers: ["first"] }, { answers: ["next", "then"] }, { answers: ["finally"] }],
        bank: ["First", "Next", "Finally", "Yesterday", "Never"],
        hint: "Use time words in order: first, next, finally.",
        mistakes: [{ match: "never", coach: "But they did do it! Use a time word that tells the order." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build a sentence with a point and a reason.",
        tiles: ["The Wrights were careful", "because", "they tested again and again."],
        distractors: ["but", "bicycles are red."],
        hint: "Point first, then because, then the reason.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "When did the Wright brothers first fly their airplane?",
        choices: ["1776", "1903", "2003"],
        answer: 1,
        why: "Orville flew the Flyer on December 17, 1903.",
      },
      {
        q: "What do reasons do?",
        choices: ["Support the author's point", "Tell a joke", "Name the book"],
        answer: 0,
        why: "Reasons tell why we should believe the author's point.",
      },
      {
        q: "Text A and Text B both say the brothers worked as a team. Where is that point?",
        choices: ["Only in Text A", "Only in Text B", "In both texts"],
        answer: 2,
        why: "A point that shows up in both texts is something they share.",
      },
      {
        q: "What does a researcher do first?",
        choices: ["Writes the answer", "Chooses a question", "Draws the cover", "Closes the book"],
        answer: 1,
        why: "Research starts with a question to answer.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Mini research report! 🔬 With a grown-up, pick a question, like 'How do bees make honey?' Read two short books about it. Write down 3 facts together. Then tell or write the answer in 2 or 3 sentences.",
      rubric: ["Picked a clear question", "Wrote down 3 facts from two sources", "Answered the question using the facts"],
    },
  },

  // 8. Grammar workshop
  {
    id: "ela-2.grammar",
    title: "Grammar Workshop: Nouns, Verbs and Sentences",
    minutes: 20,
    stage: "grammar",
    standards: ["L.2.1", "L.2.2", "L.2.6"],
    read: [
      "Grammar is the set of rules that helps words work together.",
      "Some nouns name a group. A flock of birds. A herd of cows. A team of players. These are collective nouns.",
      "Most nouns add s to mean more than one: one cat, two cats. But some are tricky. One child, two children. One mouse, two mice. One tooth, two teeth. These are irregular plurals.",
      "Words like myself and himself point back to who did something: I made it myself.",
      "Most verbs add ed to tell about the past: jump, jumped. But some change. Run becomes ran. Sit becomes sat. Tell becomes told.",
      "Adjectives describe nouns: a tall tree, a red barn. Adverbs describe verbs. Many end in ly: she ran quickly.",
      "Two short sentences can join together. Use a comma and a joining word like and, but or so. The river was low, so the mill stopped.",
      "An apostrophe can squish two words: do not becomes don't. It can show who owns something: the miller's hat.",
      "In a letter, put a comma after the greeting, like Dear Pip, and after the closing, like Your friend, before your name.",
    ].join("\n\n"),
    keyIdeas: [
      "Collective nouns name groups (a flock of birds), and some plurals are irregular (mouse, mice).",
      "Some past-tense verbs are irregular: run, ran; tell, told.",
      "Adjectives describe nouns, adverbs describe verbs, and a comma plus and, but or so joins two sentences.",
      "Apostrophes make contractions and show who owns something; letters need commas after the greeting and closing.",
    ],
    hook: {
      text: "Pip counted the animals by the river. 🐑🐑🐑 'One sheep, two sheeps!' he said. Hmm. Is that right? Let's learn some tricky word rules.",
    },
    teach: [
      {
        title: "Groups and Tricky Plurals",
        teach:
          "Some nouns name a whole group. A flock of birds. A herd of cows. A team of players. These are collective nouns. Most nouns add s for more than one: one cat, two cats. But some nouns change. One child, two children. One mouse, two mice. One foot, two feet. And one sheep, two sheep! Sorry, Pip.",
        visual: {
          type: "flip",
          cards: [
            { front: "one mouse 🐭", back: "two mice 🐭🐭" },
            { front: "one child 🧒", back: "two children 🧒🧒" },
            { front: "one foot 🦶", back: "two feet 🦶🦶" },
            { front: "one tooth 🦷", back: "two teeth 🦷🦷" },
            { front: "one sheep 🐑", back: "two sheep 🐑🐑" },
            { front: "a ___ of birds 🐦🐦🐦", back: "a flock of birds" },
          ],
        },
        probe: {
          type: "cloze",
          text: "One mouse, two {0}. 🐭🐭 One child, two {1}. 🧒🧒 One tooth, two {2}. 🦷🦷",
          blanks: [{ answers: ["mice"] }, { answers: ["children"] }, { answers: ["teeth"] }],
          bank: ["mice", "children", "teeth", "mouses", "childs", "tooths"],
          hint: "These nouns don't add s. They change instead.",
          mistakes: [
            { match: "mouses", coach: "Mouse is a rule breaker. One mouse, two mice." },
            { match: "childs", coach: "Child is a rule breaker. One child, two children." },
            { match: "tooths", coach: "Tooth is a rule breaker, like foot and feet. One tooth, two teeth." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which is right?",
          choices: ["two foots", "two feets", "two feet"],
          answer: 2,
          why: "Foot is irregular. One foot, two feet.",
          hints: [
            "Foot doesn't add s. It changes its vowels instead.",
            "Feet already means more than one. It doesn't need an s too.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Irregular plurals are like rule breakers on the playground. 🛝 Most words line up and add an s, but a few march to their own beat.",
          example:
            "Goose is irregular too. One goose, two geese. Not gooses! The vowels change instead of adding s.",
          simpler: {
            q: "Is a flock a group of birds?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A flock is a collective noun for a group of birds.",
            hints: ["", "We say a flock of birds, like a herd of cows. Flock names the group."],
          },
        },
      },
      {
        title: "Past-Tense Verbs, Adjectives and Adverbs",
        teach:
          "Verbs tell actions. Most add ed for the past: jump, jumped. Some change instead. Run becomes ran. Sit becomes sat. Tell becomes told. Hide becomes hid. Adjectives describe nouns: a tall tree, a red barn. Adverbs describe how we do things. Many end in ly. The miller worked slowly. The river flowed quickly.",
        visual: {
          type: "compare",
          left: { title: "Adjectives describe nouns 🍎", points: ["a tall tree", "a red barn", "a cold river"] },
          right: { title: "Adverbs describe verbs 🏃", points: ["ran quickly", "sang softly", "worked slowly"] },
        },
        probe: {
          type: "match",
          prompt: "Match each verb to its past tense.",
          pairs: [
            { left: "run", right: "ran" },
            { left: "sit", right: "sat" },
            { left: "tell", right: "told" },
            { left: "hide", right: "hid" },
            { left: "see", right: "saw" },
          ],
          hint: "Say: Today I run. Yesterday I ___. Use your ears!",
          seconds: 35,
        },
        think: {
          q: "Yesterday I ___ to the market.",
          choices: ["runned", "ran", "runs"],
          answer: 1,
          why: "Run is irregular. In the past, it becomes ran.",
          hints: [
            "Runned sounds funny because run is a rule breaker. It changes instead of adding ed.",
            "",
            "Runs is for right now. Yesterday needs the past.",
          ],
        },
        approaches: {
          analogy:
            "Adjectives are like paint for nouns. 🎨 Adverbs are like a speed dial for verbs: slowly, quickly, softly.",
          example:
            "Plain: The dog barked. Better: The fluffy dog barked loudly. Fluffy is an adjective that tells about the dog. Loudly is an adverb that tells how it barked.",
          simpler: {
            q: "Does run become ran in the past?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Today I run. Yesterday I ran.",
            hints: ["", "Try it: Yesterday I ran to the park. That sounds right!"],
          },
        },
      },
      {
        title: "Joining Sentences, Apostrophes and Letters",
        teach:
          "Two short sentences can join. Use a comma and and, but or so. The river was low, so the wheel stopped. An apostrophe can squish two words: do not becomes don't. It shows who owns something, too: the miller's hat. Letters need commas. Write Dear Pip with a comma after it. End with Your friend and a comma, then your name.",
        visual: {
          type: "hotspots",
          title: "Punctuation helpers",
          center: "✏️ Writing tools",
          spots: [
            { label: "Joining comma", icon: "🔗", detail: "The river was low, so the wheel stopped." },
            { label: "Contraction", icon: "✂️", detail: "do not → don't, it is → it's, I am → I'm" },
            { label: "Owner's apostrophe", icon: "🎩", detail: "the miller's hat, Pip's light" },
            { label: "Letter commas", icon: "✉️", detail: "Dear Pip, ... Your friend, Sam" },
          ],
        },
        probe: {
          type: "build",
          prompt: "Join two sentences with a comma and a joining word. 🔗 (The river was low. The wheel stopped.)",
          tiles: ["The river was low,", "so", "the wheel stopped."],
          distractors: ["happy", "the mouses."],
          hint: "First sentence with its comma, then the joining word, then the second sentence.",
          seconds: 25,
        },
        think: {
          q: "Which is the right way to write do not as one word?",
          choices: ["dont", "don't", "do'nt"],
          answer: 1,
          why: "The apostrophe goes where the missing letter o was: don't.",
          hints: [
            "A contraction needs an apostrophe to show a letter is missing.",
            "",
            "The apostrophe goes where the o was taken out, between n and t.",
          ],
        },
        approaches: {
          analogy:
            "A joining word is like a bridge between two islands. 🌉 The comma is the ramp onto the bridge.",
          example:
            "I was hungry. I ate an apple. Join them: I was hungry, so I ate an apple. The comma plus so makes one compound sentence.",
          simpler: {
            q: "Does a letter greeting like Dear Pip get a comma after it?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "We write Dear Pip, with a comma after the greeting.",
            hints: ["", "Letters always put a comma after the greeting: Dear Pip,"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the words.",
      buckets: ["Collective noun (a group)", "Irregular plural", "Irregular past-tense verb"],
      items: [
        { text: "flock", bucket: 0 },
        { text: "herd", bucket: 0 },
        { text: "team", bucket: 0 },
        { text: "mice", bucket: 1 },
        { text: "children", bucket: 1 },
        { text: "feet", bucket: 1 },
        { text: "ran", bucket: 2 },
        { text: "told", bucket: 2 },
        { text: "sat", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Teach Pip the tricky rules! Tell how to say more than one mouse, the past of run, and how to join two sentences.",
      keyPoints: [
        "One mouse, two mice is an irregular plural",
        "Run becomes ran in the past",
        "Join two sentences with a comma and and, but or so",
        "An apostrophe makes a contraction like don't",
      ],
    },
    mastery: [
      {
        type: "highlight",
        prompt: "Tap the letter lines that are written correctly.",
        sentences: ["Dear Pip,", "Dear Pip", "Your friend,", "Your friend"],
        correct: [0, 2],
        hint: "Letter greetings and closings end with a comma.",
        seconds: 20,
      },
      {
        type: "sort",
        prompt: "Adjective or adverb?",
        buckets: ["Adjective (describes a noun)", "Adverb (describes a verb)"],
        items: [
          { text: "tall", bucket: 0 },
          { text: "red", bucket: 0 },
          { text: "fluffy", bucket: 0 },
          { text: "quickly", bucket: 1 },
          { text: "softly", bucket: 1 },
          { text: "loudly", bucket: 1 },
        ],
        hint: "Many adverbs end in ly and tell how something is done.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "do not = {0} 🚫 it is = {1} ✅ I am = {2} 🙋",
        blanks: [{ answers: ["don't"] }, { answers: ["it's"] }, { answers: ["I'm"] }],
        bank: ["don't", "it's", "I'm", "dont", "its", "Im"],
        hint: "Each contraction needs an apostrophe where letters were taken out.",
        mistakes: [
          { match: "dont", coach: "Close! Add an apostrophe where the o was: don't." },
          { match: "its", coach: "Its without an apostrophe means belonging to it. It is needs an apostrophe: it's." },
          { match: "im", coach: "Close! Add an apostrophe where the a was: I'm." },
        ],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build a compound sentence with but.",
        tiles: ["I like rain,", "but", "I love sunshine more."],
        distractors: ["mice", "quickly"],
        hint: "First sentence with its comma, then but, then the second sentence.",
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each group to its collective noun.",
        pairs: [
          { left: "a ___ of birds 🐦", right: "flock" },
          { left: "a ___ of cows 🐄", right: "herd" },
          { left: "a ___ of players ⚽", right: "team" },
          { left: "a ___ of fish 🐟", right: "school" },
        ],
        hint: "Fish swim together in a school, just like kids go to school!",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which word names a group of birds?",
        choices: ["flock", "bark", "nest"],
        answer: 0,
        why: "A flock is a group of birds.",
      },
      {
        q: "What is the past tense of tell?",
        choices: ["telled", "tells", "told"],
        answer: 2,
        why: "Tell is irregular: today I tell, yesterday I told.",
      },
      {
        q: "Which word is an adverb?",
        choices: ["red", "quickly", "tree"],
        answer: 1,
        why: "Quickly tells how something is done, so it is an adverb.",
      },
      {
        q: "Where do commas go in a letter?",
        choices: ["After every word", "Only at the very end", "Nowhere", "After the greeting and the closing"],
        answer: 3,
        why: "Write Dear Pip, at the start and Your friend, at the end.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Write a short letter to a grandparent or friend with a grown-up's help. ✉️ Start with Dear ___, and end with Your friend, or Love, and your name. Use one contraction (like don't) and join two ideas with and, but or so.",
      rubric: [
        "Put a comma after the greeting and the closing",
        "Used a contraction with an apostrophe",
        "Joined two ideas with a comma and and, but or so",
      ],
    },
  },

  // 9. Writer's workshop: opinion, informative, narrative; revise; share and speak
  {
    id: "ela-2.writing",
    title: "Writer's Workshop: Opinions, Facts and Stories",
    minutes: 20,
    stage: "rhetoric",
    standards: ["W.2.1", "W.2.2", "W.2.3", "W.2.5", "W.2.6", "SL.2.4", "SL.2.5", "SL.2.6", "L.2.3"],
    read: [
      "Writers write for different reasons.",
      "An opinion piece tells what you think and why. Name your topic. Say your opinion: I think apples are the best fruit. Give reasons with linking words like because and also. End with a closing sentence.",
      "An informative piece teaches facts. Introduce the topic: Bees are busy insects. Add facts: Bees make honey. Bees help flowers make seeds. End with a conclusion.",
      "A story, or narrative, tells what happened. Use time words like first, next and at the end. Tell what characters did, thought and felt. Give it a real ending.",
      "Then make it better. Read it again. Does every sentence fit the topic? Add a detail. Fix capitals, spelling and periods. That is revising and editing.",
      "Share your writing! Type it with a grown-up, record yourself reading it, or add a drawing.",
      "When you speak, use complete sentences and a clear voice. Talk in a relaxed way with friends, and in a more formal way when you give a report.",
    ].join("\n\n"),
    keyIdeas: [
      "Opinion writing gives your opinion and reasons, using words like because and also.",
      "Informative writing teaches facts; a story tells events in order, with feelings and an ending.",
      "Revise and edit: stay on topic, add details, and fix capitals, spelling and periods.",
      "Share your writing out loud in clear, complete sentences.",
    ],
    hook: {
      text: "Pip wants to make a Riverbend newspaper! 📰 He needs an opinion, some facts and a story. Can you help him write all three?",
    },
    teach: [
      {
        title: "Opinion Writing",
        teach:
          "An opinion tells what you think. Start by naming your topic. Then say your opinion: I think dogs make great pets. Next, give reasons. Use linking words like because and also. Dogs are great because they are loyal. Also, they get you outside to play. Last, write a closing sentence. That is why dogs are great pets!",
        visual: {
          type: "hotspots",
          title: "Opinion sandwich",
          center: "🥪 Opinion",
          spots: [
            { label: "Opinion (top bread)", icon: "🍞", detail: "I think dogs make great pets." },
            { label: "Reason 1", icon: "🥬", detail: "Dogs are great because they are loyal." },
            { label: "Reason 2", icon: "🧀", detail: "Also, they get you outside to play." },
            { label: "Closing (bottom bread)", icon: "🥖", detail: "That is why dogs are great pets!" },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the opinion piece in order.",
          steps: [
            "🍎 I think apples are the best fruit.",
            "They are best because they are sweet and crunchy.",
            "Also, they are good for you.",
            "That is why apples are the best!",
          ],
          hint: "Opinion first, then reasons, then the closing sentence.",
          seconds: 30,
        },
        think: {
          q: "Which linking word adds another reason?",
          choices: ["also", "the", "stop"],
          answer: 0,
          why: "Also tells the reader another reason is coming.",
          hints: [
            "",
            "The is a small word that comes before nouns. It doesn't link reasons.",
            "Stop doesn't link ideas. Look for a word that adds more.",
          ],
        },
        approaches: {
          analogy:
            "An opinion piece is like a sandwich. 🥪 Your opinion is the top bread, your reasons are the fillings and the closing is the bottom bread.",
          example:
            "Opinion: I think winter is the best season. Reason: because you can build snowmen. Also, you can drink cocoa. Closing: That is why winter is the best!",
          simpler: {
            q: "Is 'I think cats are cute' an opinion?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "It tells what someone thinks, so it is an opinion.",
            hints: ["", "The words I think are a clue. It tells a feeling, not a fact."],
          },
        },
      },
      {
        title: "Facts and Stories",
        teach:
          "Informative writing teaches facts. Start with the topic: Bees are busy insects. Add facts: Bees make honey. Bees help flowers make seeds. End with a conclusion. A story is different. It tells what happened, in order. Use time words like first, next and at the end. Tell what characters did and felt. Then give it a real ending.",
        visual: {
          type: "compare",
          left: { title: "📘 Informative", points: ["Teaches true facts", "Starts with the topic", "Ends with a conclusion"] },
          right: { title: "📖 Story (narrative)", points: ["Tells what happened", "Uses first, next, at the end", "Shows feelings and has an ending"] },
        },
        probe: {
          type: "sort",
          prompt: "Does it belong in an informative piece or a story?",
          buckets: ["Informative 📘", "Story 📖"],
          items: [
            { text: "Bees are insects.", bucket: 0 },
            { text: "Bees make honey.", bucket: 0 },
            { text: "Bees help flowers make seeds.", bucket: 0 },
            { text: "First, Sam found a lost kitten.", bucket: 1 },
            { text: "Next, he felt worried.", bucket: 1 },
            { text: "At the end, the kitten went home.", bucket: 1 },
          ],
          hint: "Facts teach. Stories use time words and feelings.",
          seconds: 35,
        },
        think: {
          q: "Which sentence belongs in a story?",
          choices: ["Bees make honey.", "Mills grind wheat.", "First, Pip flew over the bridge."],
          answer: 2,
          why: "It uses the time word first and tells what a character did.",
          hints: [
            "That's a true fact. It belongs in an informative piece.",
            "That's a true fact about mills, for an informative piece.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Informative writing is like a tour guide 🗺️ pointing out facts. A story is like a movie 🎬 showing what happened, scene by scene.",
          example:
            "Story: First, Mia planted a seed. Next, she watered it every day and felt excited. At the end, a sunflower bloomed! It has time words, feelings and an ending.",
          simpler: {
            q: "Does a story use words like first and next?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Stories use time words to tell events in order.",
            hints: ["", "Think of Stone Soup: first the traveler came, next he made soup. Time words!"],
          },
        },
      },
      {
        title: "Revise, Edit and Share",
        teach:
          "Good writers make their work better. First, revise. Read it again. Does every sentence fit the topic? Add a detail. Then edit. Fix capitals, spelling and periods. Now share it! Type it with a grown-up, or record yourself reading it. Add a drawing. Speak in complete sentences, in a clear voice. Use a formal voice for a report and a relaxed voice with friends.",
        visual: {
          type: "hotspots",
          title: "Writer's checklist",
          center: "✅ Make it better",
          spots: [
            { label: "Stay on topic", icon: "🔍", detail: "Take out sentences that don't fit." },
            { label: "Add a detail", icon: "➕", detail: "Tell more: what, how, or how it felt." },
            { label: "Capitals", icon: "🔠", detail: "Start each sentence and each name with a capital." },
            { label: "Spelling", icon: "✍️", detail: "Check tricky words. Ask or use a dictionary." },
            { label: "Periods", icon: "⏺️", detail: "End each sentence with a period, ? or !" },
            { label: "Share it", icon: "🎙️", detail: "Read it aloud, record it, or add a drawing." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Revise! This piece is about bees. Tap the sentence that does NOT fit the topic.",
          sentences: ["Bees are busy insects.", "Bees make honey.", "My cousin has a red bike.", "Bees help flowers make seeds."],
          correct: [2],
          hint: "Every sentence should be about bees. Which one is about something else?",
          seconds: 20,
        },
        think: {
          q: "What does it mean to edit?",
          choices: ["Throw the paper away", "Fix capitals, spelling and periods", "Draw a picture only"],
          answer: 1,
          why: "Editing means fixing capitals, spelling and periods.",
          hints: [
            "Editing makes writing better. It doesn't throw it away!",
            "",
            "A drawing is a great extra, but editing is fixing the words.",
          ],
        },
        approaches: {
          analogy:
            "Revising is like cleaning your room. 🧹 You put things where they belong and take out what doesn't fit. Editing is the final dusting.",
          example:
            "Before: bees make honey. my dog barks. After: Bees make honey. The B got a capital, and the dog sentence came out because it was off topic.",
          simpler: {
            q: "Should every sentence fit the topic?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Staying on topic makes writing clear.",
            hints: ["", "A piece about bees with a sentence about bikes would confuse the reader."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Opinion, fact or story?",
      buckets: ["Opinion 💭", "Fact 📘", "Story 📖"],
      items: [
        { text: "I think summer is the best season.", bucket: 0 },
        { text: "Pizza is the yummiest food.", bucket: 0 },
        { text: "The sun is a star.", bucket: 1 },
        { text: "Bees make honey.", bucket: 1 },
        { text: "First, the dog dug a hole.", bucket: 2 },
        { text: "At the end, everyone cheered.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Pip the difference between an opinion piece, an informative piece and a story. How do you make writing better?",
      keyPoints: [
        "An opinion tells what you think and gives reasons",
        "An informative piece teaches true facts",
        "A story tells what happened in order",
        "Revise and edit to make writing better",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "I think dogs are great pets {0} they are loyal. {1}, they love to play.",
        blanks: [{ answers: ["because"] }, { answers: ["also"] }],
        bank: ["because", "Also", "but", "Never"],
        hint: "Because gives a reason. Also adds another reason.",
        mistakes: [{ match: "but", coach: "But shows something different. Here you want to give a reason." }],
        seconds: 25,
      },
      {
        type: "sequence",
        prompt: "Put Pip's story in order.",
        steps: [
          "😮 First, Pip saw the mill wheel stop.",
          "✨ Next, he flew to find the problem.",
          "🪵 Then he found a log stuck in the river.",
          "🎉 At the end, friends moved the log, and the wheel turned!",
        ],
        hint: "Follow the time words: first, next, then, at the end.",
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the sentences that are edited correctly, with a capital and a period.",
        sentences: ["The river is wide.", "the river is wide", "Bees make honey.", "bees make honey."],
        correct: [0, 2],
        hint: "Look for a capital letter at the start AND a period at the end.",
        seconds: 20,
      },
      {
        type: "match",
        prompt: "Match each piece of writing to its kind.",
        pairs: [
          { left: "I think rain is fun.", right: "opinion" },
          { left: "Frogs lay eggs in water.", right: "informative" },
          { left: "First, I lost my hat at the park.", right: "story" },
        ],
        hint: "I think = opinion. A true fact = informative. First... = story.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which sentence is an opinion?",
        choices: ["The sun is a star.", "I think summer is the best season.", "Bees make honey."],
        answer: 1,
        why: "It tells what someone thinks. The others are facts.",
      },
      {
        q: "What does a story need?",
        choices: ["Only facts", "Only a title", "Events in order and an ending"],
        answer: 2,
        why: "A story tells events in order and has a real ending.",
      },
      {
        q: "What do you do when you revise?",
        choices: ["Make sure sentences fit the topic and add details", "Throw it away", "Write it bigger"],
        answer: 0,
        why: "Revising means making sure every sentence fits and adding details.",
      },
      {
        q: "How should you speak when you share a report?",
        choices: ["Mumble quietly", "Very fast", "In clear, complete sentences", "With your back turned"],
        answer: 2,
        why: "A clear voice and complete sentences help listeners understand.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make a Riverbend newspaper page with a grown-up! 📰 Write (or say while a grown-up types) one opinion piece, one fact paragraph or one short story. Revise and edit it, add a drawing, then read it aloud or record it in a clear voice.",
      rubric: [
        "Picked one kind of writing and followed its shape",
        "Revised and edited for capitals, spelling and periods",
        "Shared it out loud in clear, complete sentences, with a drawing",
      ],
    },
  },
]);
