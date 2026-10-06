import type { CourseMedia } from "../types";

/** Slides for ela-2, by lesson id. Emoji and big words only (no photos). */
export const ela2Media: CourseMedia = {
  "ela-2.vowels": {
    hook: {
      show: [
        { emoji: "✨🐛", caption: "Pip the firefly has a riddle for you" },
        { at: "What turns a cap into a cape", emoji: "🧢➡️🦸", caption: "How does a cap become a cape?" },
        { at: "one quiet letter: e", big: "e", caption: "One quiet letter makes the change" },
      ],
    },
    teach: [
      {
        show: [
          { big: "a e i o u", caption: "The five vowels" },
          { at: "A short vowel sounds quick", emoji: "🐱🛏️🐷", caption: "Short vowels are quick: cat, bed, pig" },
          { at: "A long vowel says its own name", emoji: "🎂🦶🪁", caption: "Long vowels say their name: cake, feet, kite" },
          { at: "Add a silent e", big: "cap ➜ cape", caption: "A silent e makes the a say its name" },
        ],
      },
      {
        show: [
          { emoji: "🤝", caption: "Two vowels can team up" },
          { at: "In rain", big: "ai", caption: "rain: a and i say long a 🌧️" },
          { at: "In boat", big: "oa", caption: "boat: o and a say long o 🚤" },
          { at: "In seed", big: "ee", caption: "seed: two e's say long e 🌱" },
          { at: "When two vowels go walking", emoji: "🚶🚶💬", caption: "The first vowel often does the talking" },
        ],
      },
      {
        show: [
          { emoji: "👏👏", caption: "Clap the parts of long words" },
          { at: "Rain-bow has two claps", big: "rain · bow", caption: "Two claps: rain-bow 🌈" },
          { at: "Good readers read smoothly", emoji: "🗣️📖", caption: "Read smoothly, like talking" },
          { at: "They go back and fix the word", emoji: "🔁✅", caption: "Makes no sense? Go back and fix it" },
        ],
      },
    ],
  },

  "ela-2.word-parts": {
    hook: {
      show: [
        { emoji: "🧺🪧", caption: "A sign at the Riverbend market" },
        { at: "UNLOCK THE GATE", big: "UNLOCK", caption: "UNLOCK THE GATE" },
        { at: "what does unlock mean", emoji: "🔒➡️🔓", caption: "What does the un part do?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "un ▢ re", caption: "Prefixes go at the front of a word" },
          { at: "Un means not", big: "unhappy", caption: "un means not: unhappy = not happy 😟" },
          { at: "Re means again", big: "retell", caption: "re means again: retell = tell again 🗣️" },
          { at: "Find the root word first", emoji: "🌱🔍", caption: "Find the root word, then add the prefix" },
        ],
      },
      {
        show: [
          { big: "▢ ful", caption: "Suffixes go at the end of a word" },
          { at: "Ful means full of", big: "hopeful", caption: "ful means full of" },
          { at: "Less means without", big: "fearless", caption: "less means without 🛡️" },
          { at: "Ly tells how", big: "quickly", caption: "ly tells how something is done 🏃" },
          { at: "Unhelpful has un", big: "un · help · ful", caption: "A prefix and a suffix in one word!" },
        ],
      },
      {
        show: [
          { emoji: "🐦+🏠", caption: "Bird + house = birdhouse" },
          { at: "Light plus house", emoji: "💡+🏠=🗼", caption: "Light + house = lighthouse" },
          { at: "Some words are tricky", big: "said · friend", caption: "Tricky words: learn them by heart 💛" },
          { at: "Toss, throw and hurl", emoji: "⚾💨", caption: "Toss, throw, hurl: gentle to super hard" },
          { at: "Look it up in a dictionary", emoji: "📕🔎", caption: "A dictionary tells what words mean" },
        ],
      },
    ],
  },

  "ela-2.questions": {
    hook: {
      show: [
        { emoji: "🐦💧", caption: "A very thirsty crow" },
        { at: "The water is too low", emoji: "🏺⬇️", caption: "The water is too low to reach" },
        { at: "Let's ask good questions", emoji: "❓❓❓", caption: "Good questions help us understand" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔑", caption: "Six little question words" },
          { at: "Who asks about", big: "Who? What?", caption: "Who is a person or animal. What is a thing or event." },
          { at: "Where asks about a place", big: "Where? When?", caption: "Where is a place. When is a time." },
          { at: "Why asks for a reason", big: "Why? How?", caption: "Why is a reason. How is the way." },
        ],
      },
      {
        show: [
          { emoji: "📜", caption: "A fable from Aesop" },
          { at: "A thirsty crow found a pitcher", emoji: "🐦🏺", caption: "A thirsty crow finds a pitcher" },
          { at: "It dropped in a pebble", emoji: "🪨💦", caption: "Plop! One pebble at a time" },
          { at: "The water rose", emoji: "💧⬆️😊", caption: "The water rises and the crow drinks" },
          { at: "Why did it drop pebbles", big: "Why?", caption: "To make the water rise!" },
        ],
      },
      {
        show: [
          { emoji: "🖼️", caption: "Pictures show where and how characters feel" },
          { at: "Take turns", emoji: "✋🙂", caption: "Take turns and look at the speaker" },
          { at: "build on what they said", emoji: "➕💬", caption: "Build on what your friend said" },
          { at: "ask a question", emoji: "🙋❓", caption: "Can you tell me more?" },
        ],
      },
    ],
  },

  "ela-2.fables": {
    hook: {
      show: [
        { emoji: "🐇🐢", caption: "A hare and a tortoise get ready to race" },
        { at: "Who do you think will win", big: "?", caption: "Who will win?" },
        { at: "might surprise you", emoji: "😮", caption: "The answer might surprise you" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🦊📖", caption: "A fable is a short story with a lesson" },
          { at: "talking animals", emoji: "🐭🦁🐦", caption: "Fables often have talking animals" },
          { at: "a Greek storyteller named Aesop", emoji: "📜🏛️", caption: "Aesop told fables in ancient Greece" },
          { at: "called the moral", big: "Moral 💡", caption: "The lesson is called the moral" },
        ],
      },
      {
        show: [
          { emoji: "🏁", caption: "Characters face big problems" },
          { at: "the hare was proud", emoji: "🐇😴", caption: "The proud hare takes a nap" },
          { at: "The tortoise was patient", emoji: "🐢👣", caption: "The tortoise keeps going, step by step" },
          { at: "slow and steady wins the race", big: "Slow and steady", caption: "Slow and steady wins the race 🏆" },
          { at: "The Lion and the Mouse", emoji: "🦁🐭", caption: "Even a small friend can be a big help" },
        ],
      },
      {
        show: [
          { emoji: "🏡🗣️", caption: "Folktales were told out loud for years" },
          { at: "The Little Red Hen", emoji: "🐔🌾", caption: "The Little Red Hen finds some wheat" },
          { at: "'Not I,' said the cat", big: "Not I!", caption: "Not I, said the cat. Not I, said the dog." },
          { at: "Repeated lines give a story a beat", emoji: "🥁🎵", caption: "Repeated lines give a story a beat" },
        ],
      },
    ],
  },

  "ela-2.story-structure": {
    hook: {
      show: [
        { emoji: "🪨🍲", caption: "Soup from a stone?" },
        { at: "A clever traveler", emoji: "🚶🎒", caption: "A clever traveler says yes!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🚪⛰️🏁", caption: "Beginning, middle and ending" },
          { at: "The beginning tells who and where", emoji: "🚶🏘️", caption: "Beginning: a traveler comes to a village" },
          { at: "The middle has a problem", emoji: "🚫🥕", caption: "Middle: nobody wants to share" },
          { at: "The ending solves the problem", emoji: "🍲😊", caption: "Ending: everyone eats together" },
        ],
      },
      {
        show: [
          { emoji: "🪟🪟", caption: "Point of view: how a character sees things" },
          { at: "He just wants our food", emoji: "😠", caption: "A neighbor: He just wants our food!" },
          { at: "If we all share a little", emoji: "😊", caption: "The traveler: If we all share, we all eat" },
          { at: "give each character a voice", emoji: "🎭", caption: "Give each character a different voice" },
        ],
      },
      {
        show: [
          { emoji: "🌍📚", caption: "The same story told in different places" },
          { at: "In Sweden, people tell Nail Soup", emoji: "🔩🍲", caption: "Nail Soup: the traveler uses a nail" },
          { at: "Both stories have a clever traveler", emoji: "🤝", caption: "Alike: a traveler and neighbors who share" },
          { at: "one uses a stone, and one uses a nail", emoji: "🪨↔️🔩", caption: "Different: a stone or a nail" },
          { at: "Look at the pictures", emoji: "🖼️👀", caption: "Pictures show each setting" },
        ],
      },
    ],
  },

  "ela-2.nonfiction": {
    hook: {
      show: [
        { emoji: "🎡💧", caption: "The Riverbend mill wheel has stopped" },
        { at: "How does a mill even work", big: "?", caption: "How does a mill work?" },
        { at: "read a true book", emoji: "📘", caption: "A true book can tell us" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📘✅", caption: "Nonfiction tells true facts" },
          { at: "The main topic is what the whole text is about", big: "Main topic", caption: "What the whole text is about" },
          { at: "Each paragraph has a focus", emoji: "🧩", caption: "Each paragraph has its own focus" },
          { at: "a millstone grinds wheat into flour", emoji: "🪨🌾", caption: "One paragraph: the millstone makes flour" },
        ],
      },
      {
        show: [
          { emoji: "🧭📖", caption: "Text features help you find facts" },
          { at: "Subheadings are little titles", emoji: "🏷️", caption: "Subheadings name each part" },
          { at: "A caption is words under a picture", emoji: "🖼️💬", caption: "A caption explains a picture" },
          { at: "A glossary, at the back", emoji: "📒", caption: "A glossary tells what hard words mean" },
          { at: "Online, menus and icons", emoji: "🖱️💻", caption: "Menus and icons help online" },
        ],
      },
      {
        show: [
          { emoji: "🏷️🖼️", caption: "A diagram is a picture with labels" },
          { at: "A mill diagram shows", emoji: "💧➡️🎡➡️⚙️➡️🪨", caption: "Water, wheel, gears, millstone" },
          { at: "Follow the arrows", emoji: "➡️🍞", caption: "Follow the arrows from river to flour" },
          { at: "Authors also have a purpose", big: "Why write?", caption: "To answer, explain or describe" },
        ],
      },
    ],
  },

  "ela-2.compare-texts": {
    hook: {
      show: [
        { emoji: "☁️✈️", caption: "Long ago, no one had flown an airplane" },
        { at: "Two brothers from a bicycle shop", emoji: "🚲🔧", caption: "Two brothers with a bicycle shop" },
        { at: "How did they do it", big: "?", caption: "How did they do it?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👬🚲", caption: "Wilbur and Orville Wright" },
          { at: "First, they studied birds", emoji: "🐦👀", caption: "First: they studied birds" },
          { at: "Next, they tested gliders", emoji: "🪁🏖️", caption: "Next: they tested gliders" },
          { at: "Then they built a wind tunnel", emoji: "🌬️📦", caption: "Then: a wind tunnel to test wings" },
          { at: "December 17, 1903", big: "1903", caption: "Finally: a 12-second flight! ✈️" },
        ],
      },
      {
        show: [
          { emoji: "📌", caption: "Authors make points" },
          { at: "the Wright brothers were careful workers", big: "Careful!", caption: "Point: they were careful workers" },
          { at: "Reason one", emoji: "🪁🔁", caption: "They tested again and again" },
          { at: "Reason two", emoji: "📝", caption: "They wrote down what they learned" },
          { at: "like legs hold up a table", emoji: "🪑", caption: "Reasons hold up a point" },
        ],
      },
      {
        show: [
          { emoji: "📗📘", caption: "Two texts, one topic" },
          { at: "Text A tells about the first flight", emoji: "📗✈️", caption: "Text A: the first flight" },
          { at: "Text B tells about", emoji: "📘🚲", caption: "Text B: the bicycle shop" },
          { at: "Both say the brothers worked as a team", emoji: "🤝", caption: "Both: they worked as a team" },
          { at: "Researchers read both", emoji: "🔬📝", caption: "Researchers read, write facts, then answer" },
        ],
      },
    ],
  },

  "ela-2.grammar": {
    hook: {
      show: [
        { emoji: "🐑🐑🐑", caption: "Pip counts the animals by the river" },
        { at: "two sheeps", big: "sheeps?", caption: "Two sheeps? Hmm..." },
        { at: "tricky word rules", emoji: "📏✨", caption: "Time for some tricky word rules" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐦🐦🐦", caption: "Some nouns name a whole group" },
          { at: "A herd of cows", big: "flock · herd · team", caption: "Collective nouns name groups" },
          { at: "Most nouns add s", big: "cat ➜ cats", caption: "Most nouns just add s" },
          { at: "But some nouns change", emoji: "🐭➡️🐭🐭", caption: "One mouse, two mice" },
          { at: "one sheep, two sheep", emoji: "🐑🐑", caption: "One sheep, two sheep. Sorry, Pip!" },
        ],
      },
      {
        show: [
          { big: "jump ➜ jumped", caption: "Most verbs add ed for the past" },
          { at: "Some change instead", big: "run ➜ ran", caption: "Some verbs change: run, ran" },
          { at: "Adjectives describe nouns", emoji: "🌳🔴", caption: "Adjectives: a tall tree, a red barn" },
          { at: "Adverbs describe how", emoji: "🐢💨", caption: "Adverbs: slowly, quickly" },
        ],
      },
      {
        show: [
          { emoji: "🔗", caption: "Join two sentences with a comma and a joining word" },
          { at: "The river was low, so the wheel stopped", big: ", so", caption: "The river was low, so the wheel stopped." },
          { at: "do not becomes don't", big: "don't", caption: "An apostrophe squishes do not into don't" },
          { at: "the miller's hat", emoji: "🎩", caption: "The miller's hat: the hat belongs to the miller" },
          { at: "Letters need commas", emoji: "✉️", caption: "Dear Pip, ... Your friend, Sam" },
        ],
      },
    ],
  },

  "ela-2.writing": {
    hook: {
      show: [
        { emoji: "📰", caption: "Pip's Riverbend newspaper" },
        { at: "an opinion, some facts and a story", emoji: "💭📘📖", caption: "An opinion, some facts and a story" },
        { at: "Can you help him", emoji: "✏️🙋", caption: "Can you help him write?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💭", caption: "An opinion tells what you think" },
          { at: "I think dogs make great pets", emoji: "🐶👍", caption: "I think dogs make great pets." },
          { at: "Use linking words", big: "because · also", caption: "Linking words connect your reasons" },
          { at: "write a closing sentence", emoji: "🥪", caption: "End with a closing sentence" },
        ],
      },
      {
        show: [
          { emoji: "📘", caption: "Informative writing teaches facts" },
          { at: "Bees make honey", emoji: "🐝🍯", caption: "Bees make honey." },
          { at: "A story is different", emoji: "📖🎬", caption: "A story tells what happened" },
          { at: "Use time words", big: "first · next · at the end", caption: "Time words keep events in order" },
        ],
      },
      {
        show: [
          { emoji: "🔍✏️", caption: "Revise: make it better" },
          { at: "Then edit", emoji: "🔠✍️⏺️", caption: "Edit: capitals, spelling, periods" },
          { at: "Now share it", emoji: "💻🎙️🖍️", caption: "Type it, record it, add a drawing" },
          { at: "Speak in complete sentences", emoji: "🗣️", caption: "Speak clearly in complete sentences" },
        ],
      },
    ],
  },
};
