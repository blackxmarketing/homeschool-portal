import type { CourseMedia } from "../types";

/** Slides for ela-k, by lesson id. */
export const elaKMedia: CourseMedia = {
  "ela-k.books": {
    hook: {
      show: [
        { emoji: "👴📖", caption: "Grandpa Aesop has a big old book to share" },
        { at: "how a book works", emoji: "📕❓", caption: "How does a book work?" },
        { at: "find out together", emoji: "🔍📚", caption: "Let's find out together!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🙌📕", caption: "Hold a book in your hands" },
          { at: "It shows the title", big: "TITLE", caption: "The title is the name of the book" },
          { at: "That is the back cover", emoji: "🔄📘", caption: "Flip it over: the back cover" },
          { at: "Look for the title page", emoji: "📄", caption: "The title page tells the title and who made the book" },
          { at: "full of words and pictures", emoji: "📃🖼️", caption: "The pages hold the words and pictures" },
        ],
      },
      {
        show: [
          { emoji: "📚❓", caption: "Who makes a book?" },
          { at: "The author writes", emoji: "✍️", caption: "The author writes the words" },
          { at: "The illustrator draws", emoji: "🎨", caption: "The illustrator draws the pictures" },
          { at: "does both jobs", emoji: "✍️🎨", caption: "Sometimes one person does both jobs!" },
          { at: "you are an author", emoji: "🧒✏️", caption: "You can be an author and an illustrator too" },
        ],
      },
      {
        show: [
          { emoji: "📄", caption: "Words on a page go a special way" },
          { at: "start at the top", emoji: "⬆️", caption: "Start at the top" },
          { at: "from left to right", emoji: "➡️", caption: "Read from left to right" },
          { at: "sweep back to the left", emoji: "↩️", caption: "Sweep back to the left and go down a line" },
          { at: "Little spaces sit", big: "The cat sat.", caption: "Little spaces sit between the words" },
        ],
      },
    ],
  },

  "ela-k.alphabet": {
    hook: {
      show: [
        { emoji: "🎺🥁🎉", caption: "Here comes the ABC parade!" },
        { at: "Twenty-six letters", big: "26", caption: "Twenty-six letters march down the road" },
        { at: "a big form and a little form", big: "Aa Bb Cc", caption: "Each letter has a big form and a little form" },
      ],
    },
    teach: [
      {
        show: [
          { big: "26", caption: "The alphabet has 26 letters" },
          { at: "like kids in a line", emoji: "🧒🧒🧒🧒", caption: "They line up in order, like kids in a line" },
          { at: "A comes first", big: "A B C D E", caption: "A comes first, then B, C, D and E" },
          { at: "The very last letter", big: "Z", caption: "Z is the very last letter" },
          { at: "sing the ABC song", emoji: "🎵🔤", caption: "Sing the ABC song to remember the order" },
        ],
      },
      {
        show: [
          { big: "Bb", caption: "Every letter has two forms" },
          { at: "called uppercase", big: "B", caption: "The big one is called uppercase" },
          { at: "called lowercase", big: "b", caption: "The small one is called lowercase" },
          { at: "look alike", big: "S s", caption: "Some pairs look alike" },
          { at: "look very different", big: "G g", caption: "Some pairs look very different" },
        ],
      },
      {
        show: [
          { emoji: "⭐🔤", caption: "Uppercase letters have special jobs" },
          { at: "The first word of a sentence", big: "The cat ran.", caption: "A sentence starts with a big letter" },
          { at: "Names start with big letters", big: "Sam  Ann", caption: "Names start with big letters" },
          { at: "The word I is always big", big: "I", caption: "The word I is always big when it means me" },
          { at: "To print a letter", emoji: "✏️⬇️", caption: "Start at the top and pull your pencil down" },
        ],
      },
    ],
  },

  "ela-k.sounds": {
    hook: {
      show: [
        { emoji: "🐭🕰️", caption: "Hickory, dickory, dock!" },
        { at: "The mouse ran up the clock", emoji: "🐭⬆️🕰️", caption: "The mouse ran up the clock" },
        { at: "dock and clock sound alike", big: "dock • clock", caption: "Dock and clock sound alike!" },
        { at: "play some sound games", emoji: "👂🎲", caption: "Let's play some sound games" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎵", caption: "Rhyming words sound the same at the end" },
          { at: "cat, hat, bat", emoji: "🐱🎩🦇", caption: "Cat, hat, bat: they all end with at" },
          { at: "Jack and Jill went up the hill", emoji: "👦👧⛰️🪣", caption: "Jack and Jill went up the hill" },
          { at: "dog rhyme with log", emoji: "🐶🪵", caption: "Dog and log rhyme!" },
          { at: "dog rhyme with sun", emoji: "🐶☀️", caption: "Dog and sun do not rhyme" },
        ],
      },
      {
        show: [
          { emoji: "👏", caption: "Words have beats called syllables" },
          { at: "Dog has one clap", emoji: "🐶👏", caption: "Dog: one clap" },
          { at: "Rabbit has two claps", emoji: "🐰👏👏", caption: "Rab-bit: two claps" },
          { at: "Butterfly has three claps", emoji: "🦋👏👏👏", caption: "But-ter-fly: three claps" },
          { at: "under your chin", emoji: "✋🙂", caption: "Your chin drops once for each beat" },
        ],
      },
      {
        show: [
          { emoji: "🚂🚃🚃", caption: "Every word has a first sound and a last sound" },
          { at: "Say sun slowly", emoji: "☀️", caption: "Sun: sss at the start, nnn at the end" },
          { at: "Now say map", emoji: "🗺️", caption: "Map: mmm at the start, puh at the end" },
          { at: "Now it says cap", emoji: "🗺️➡️🧢", caption: "Change mmm to kuh: map becomes cap!" },
        ],
      },
    ],
  },

  "ela-k.stories": {
    hook: {
      show: [
        { emoji: "👴📖", caption: "An old, old story from Grandpa Aesop" },
        { at: "a speedy hare", emoji: "🐇💨", caption: "A speedy hare..." },
        { at: "a slow tortoise", emoji: "🐢", caption: "...and a slow tortoise" },
        { at: "wins the race", emoji: "🏁❓", caption: "Who will win the race?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐇🐢", caption: "Characters: the people or animals in a story" },
          { at: "A hare is like a big rabbit", emoji: "🐇", caption: "A hare is like a big rabbit" },
          { at: "A tortoise is a turtle", emoji: "🐢", caption: "A tortoise is a turtle that lives on land" },
          { at: "has a setting too", emoji: "🗺️🕰️", caption: "The setting: where and when a story happens" },
          { at: "on a country road", emoji: "🛤️🌳", caption: "Our setting: a country road, long ago" },
        ],
      },
      {
        show: [
          { emoji: "1️⃣2️⃣3️⃣", caption: "Events happen in order" },
          { at: "In the beginning", emoji: "🐇💬🐢", caption: "Beginning: the Hare brags. 'Let's race!'" },
          { at: "In the middle", emoji: "🐇😴🌳", caption: "Middle: the Hare zooms ahead and naps" },
          { at: "In the end", emoji: "🐢🏆", caption: "End: the Tortoise wins!" },
          { at: "retell a story", emoji: "🗣️📖", caption: "To retell, tell the events in order" },
        ],
      },
      {
        show: [
          { emoji: "👂❓", caption: "Good listeners ask questions" },
          { at: "Why did the Hare lose", emoji: "🤔🐇", caption: "Why did the Hare lose? He stopped to nap!" },
          { at: "Pictures help too", emoji: "🖼️😴", caption: "Pictures show what the words tell" },
          { at: "The Lion and the Mouse", emoji: "🦁🐭", caption: "Another fable: The Lion and the Mouse" },
          { at: "In both stories", emoji: "🐢🐭", caption: "In both, the small one surprises the big one" },
        ],
      },
    ],
  },

  "ela-k.phonics": {
    hook: {
      show: [
        { emoji: "🎺🥁🎻", caption: "Letters are like little musicians" },
        { at: "plays its own sound", emoji: "🔤🎶", caption: "Each letter plays its own sound" },
        { at: "they make words", big: "c a t", caption: "Letters play together to make words" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔤🔊", caption: "Each letter makes its own sound" },
          { at: "M hums", big: "M", caption: "M hums: mmm, like moon" },
          { at: "S hisses", big: "S", caption: "S hisses like a snake: sss, like sun" },
          { at: "B bounces", big: "B", caption: "B bounces: buh, like ball" },
          { at: "T taps", big: "T", caption: "T taps: tuh, like top" },
        ],
      },
      {
        show: [
          { big: "A E I O U", caption: "The five vowels" },
          { at: "Short A starts apple", emoji: "🍎🥚📏", caption: "Short A: apple. Short E: egg. Short I: inch." },
          { at: "Short O starts octopus", emoji: "🐙☂️", caption: "Short O: octopus. Short U: umbrella." },
          { at: "the A in cake", emoji: "🎂", caption: "A long vowel says its own name, like the A in cake" },
        ],
      },
      {
        show: [
          { big: "1 2 3", caption: "Many short words have three sounds" },
          { at: "Listen to sat", big: "s - a - t", caption: "Sat: s first, short A in the middle, t last" },
          { at: "Now blend them", big: "sat", caption: "Blend them fast: sat!" },
          { at: "To write a word", emoji: "✏️👂", caption: "Write one letter for each sound you hear" },
          { at: "Now it says pin", big: "pan → pin", caption: "Change one letter: pan becomes pin" },
        ],
      },
    ],
  },

  "ela-k.sightwords": {
    hook: {
      show: [
        { emoji: "👀📚", caption: "Some words are everywhere!" },
        { at: "in every book", big: "the  is  you", caption: "You see them in every book" },
        { at: "like old friends", emoji: "🤝😊", caption: "Know them fast, like old friends" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎈", caption: "Some words pop up all the time" },
          { at: "in a snap", emoji: "👌", caption: "Sight words: we know them in a snap" },
          { at: "Look at the word the", big: "the", caption: "Sight word: the" },
          { at: "Look at the word you", big: "you", caption: "Sight word: you" },
          { at: "Look at the word is", big: "is", caption: "Sight word: is" },
        ],
      },
      {
        show: [
          { emoji: "🧩", caption: "Words go together to make sentences" },
          { at: "The dog runs", big: "The dog runs.", caption: "Who: the dog. What it does: runs." },
          { at: "Just dog is not", big: "dog", caption: "Just dog is not a sentence" },
          { at: "The big dog runs fast", big: "The big dog runs fast.", caption: "Add words to make a sentence longer" },
          { at: "Put a space", emoji: "👉 👈", caption: "Put a space between each word" },
        ],
      },
      {
        show: [
          { big: "The", caption: "A sentence starts with a capital letter" },
          { at: "A period is a little dot", big: ".", caption: "A period ends a telling sentence" },
          { at: "A question mark ends", big: "?", caption: "A question mark ends an asking sentence" },
          { at: "An exclamation mark", big: "!", caption: "An exclamation mark shows a big feeling" },
          { at: "point to each word", emoji: "👉📖", caption: "Point to each word as you read" },
        ],
      },
    ],
  },

  "ela-k.words": {
    hook: {
      show: [
        { emoji: "🧰", caption: "Words are like tools in a toolbox" },
        { at: "Some name things", emoji: "🐶⚽🏠", caption: "Some words name things" },
        { at: "Some tell actions", emoji: "🏃🦘🍽️", caption: "Some words tell actions" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧰", caption: "Words have jobs" },
          { at: "These are nouns", emoji: "🐶⚽🏞️", caption: "Nouns name a person, place or thing" },
          { at: "These are verbs", emoji: "🏃🦘🍽️🎤", caption: "Verbs tell an action" },
          { at: "The dog runs", big: "The dog runs.", caption: "Dog is the noun. Runs is the verb." },
        ],
      },
      {
        show: [
          { big: "+s", caption: "More than one? Often we add s" },
          { at: "One cat, two cats", emoji: "🐱➡️🐱🐱", caption: "One cat, two cats" },
          { at: "Some words get es", emoji: "📦➡️📦📦", caption: "One box, two boxes" },
          { at: "Little words tell where", big: "in  on  by", caption: "Little words tell where things are" },
          { at: "The ball is in the box", emoji: "⚽📦", caption: "The ball is in the box" },
        ],
      },
      {
        show: [
          { emoji: "🔥🧊", caption: "Opposites: hot and cold" },
          { at: "Big and little", emoji: "🐘🐭", caption: "Big and little" },
          { at: "close cousins", emoji: "🚶🥁👣", caption: "Walk, march and tiptoe: close cousins" },
          { at: "A duck is a bird", emoji: "🦆", caption: "A duck is a bird..." },
          { at: "you duck when", emoji: "⚽🙇", caption: "...and you duck when a ball flies at you!" },
          { at: "Jumped means", big: "jump + ed", caption: "Jumped means it already happened" },
        ],
      },
    ],
  },

  "ela-k.facts": {
    hook: {
      show: [
        { emoji: "📚✅", caption: "Some books are true!" },
        { at: "real facts about our world", emoji: "🌍🔎", caption: "True books tell real facts about our world" },
        { at: "a true book about frogs", emoji: "🐸📗", caption: "Today: a true book about frogs. Ribbit!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📖🐇", caption: "In a made-up story, a hare can talk" },
          { at: "true facts about real things", emoji: "🔎📗", caption: "True books tell facts about real things" },
          { at: "nonfiction", big: "nonfiction", caption: "Nonfiction means true books" },
          { at: "main topic frogs", emoji: "🐸", caption: "Main topic: what the book is mostly about" },
          { at: "key details", emoji: "🔑", caption: "Key details: the important facts" },
        ],
      },
      {
        show: [
          { emoji: "📗🐸", caption: "Let's read our true book" },
          { at: "a tiny egg in a pond", emoji: "🥚💧", caption: "A frog starts as a tiny egg in a pond" },
          { at: "hatches into a tadpole", emoji: "〰️💧", caption: "The egg hatches into a tadpole, a baby frog" },
          { at: "It grows back legs", emoji: "🦵", caption: "It grows back legs, then front legs" },
          { at: "Soon it is a grown frog", emoji: "🐸", caption: "Soon it is a grown frog!" },
        ],
      },
      {
        show: [
          { emoji: "🖼️📗", caption: "Pictures help in true books" },
          { at: "When you hear a new word", emoji: "❓🔤", caption: "New word? Ask what it means" },
          { at: "Look at the picture for a clue", emoji: "🔍🖼️", caption: "Look at the picture for a clue" },
          { at: "frogs are good for gardens", emoji: "🐸🌱", caption: "The author's point: frogs are good for gardens" },
          { at: "Because frogs eat bugs", emoji: "🐸🐛", caption: "The reason: frogs eat bugs that harm plants" },
          { at: "Two books about frogs", emoji: "📗📘", caption: "Two books: some facts the same, some different" },
        ],
      },
    ],
  },

  "ela-k.tell": {
    hook: {
      show: [
        { emoji: "👴📖", caption: "Grandpa Aesop has told stories for a long time" },
        { at: "Now it is your turn", emoji: "🧒✏️", caption: "Now it is your turn!" },
        { at: "draw, write and tell", emoji: "🖍️✏️🗣️", caption: "Draw, write and tell your own ideas" },
      ],
    },
    teach: [
      {
        show: [
          { big: "3", caption: "Three kinds of writing" },
          { at: "An opinion tells", emoji: "❤️🐶", caption: "Opinion: I like dogs best, because they play fetch" },
          { at: "A fact piece teaches", emoji: "🔎☀️", caption: "Facts: the sun is hot and gives us light" },
          { at: "A story tells what happened", emoji: "📖", caption: "Story: what happened, in order" },
        ],
      },
      {
        show: [
          { emoji: "1️⃣2️⃣3️⃣", caption: "First, next and last are helper words" },
          { at: "First we planted a seed", emoji: "🌰", caption: "First we planted a seed" },
          { at: "Next we watered it", emoji: "💧", caption: "Next we watered it" },
          { at: "Last a sprout popped up", emoji: "🌱", caption: "Last a sprout popped up!" },
          { at: "Draw a picture", emoji: "🖍️🖼️", caption: "Draw a picture for each part" },
          { at: "what color was it", emoji: "❓🎨", caption: "Answer questions and add details" },
        ],
      },
      {
        show: [
          { emoji: "🔄🗣️", caption: "When we talk, we take turns" },
          { at: "listen with their eyes and ears", emoji: "👀👂", caption: "Listen with your eyes and ears" },
          { at: "Speak loud and clear", emoji: "📣", caption: "Speak loud and clear" },
          { at: "a big brown dog", emoji: "🐕", caption: "Add details: a big brown dog with floppy ears!" },
          { at: "ask a question", emoji: "✋❓", caption: "Don't understand? Ask a question" },
        ],
      },
    ],
  },
};
