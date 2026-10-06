import type { CourseMedia } from "../types";

/** Slides for ela-1, by lesson id. Emoji and big-text slides only (no photos). */
export const ela1Media: CourseMedia = {
  "ela-1.sentences": {
    hook: {
      show: [
        { emoji: "🤫🌲", caption: "Shh... listen to Whisperwood Forest" },
        { at: "lost their songs", emoji: "🐦❓", caption: "The birds have lost their songs" },
        { at: "all jumbled up", emoji: "🔀🔤", caption: "Their words are all jumbled up!" },
        { at: "real sentences", emoji: "🐦🎶", caption: "Let's help them make real sentences again" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Who + Do", caption: "A sentence tells a whole idea: who, and what they do" },
          { at: "The frog jumps", emoji: "🐸⬆️", caption: "The frog jumps. Who? The frog. Do? Jumps!" },
          { at: "The big frog. Hmm", emoji: "🐸❓", caption: "The big frog... what did it do?" },
          { at: "needs a who and a do", big: "Who + Do = ✅", caption: "A sentence needs a who and a do" },
        ],
      },
      {
        show: [
          { big: "T", caption: "Every sentence starts with a capital letter" },
          { at: "A period is a little dot", big: ".", caption: "A period ends a telling sentence" },
          { at: "A question mark", big: "?", caption: "A question mark ends an asking sentence" },
          { at: "An exclamation mark", big: "!", caption: "An exclamation mark shows big feeling" },
          { at: "the word I is always", big: "I", caption: "The word I is always a capital" },
        ],
      },
      {
        show: [
          { emoji: "🗣️💬", caption: "We use sentences when we talk, too" },
          { at: "Don't just say, bird", emoji: "🐦", caption: "Just one word: Bird." },
          { at: "I see a blue bird", emoji: "👀🐦🌳", caption: "A whole sentence: I see a blue bird in the tree." },
          { at: "Speak up, nice and clear", emoji: "😀👂", caption: "Speak up, and look at your friend" },
        ],
      },
    ],
  },

  "ela-1.blends": {
    hook: {
      show: [
        { emoji: "✨👂🏞️", caption: "Pip hears a sound by the creek" },
        { at: "Fffrrrog", emoji: "🐸", caption: "Fffrrrog! A frog!" },
        { at: "sounds stick together", big: "f + r + o + g", caption: "Sounds stick together to make words" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔤🔊", caption: "Words are made of sounds" },
          { at: "Sssuuunnn", big: "s - u - n", caption: "Stretch it: s, u, n" },
          { at: "snap back fast", emoji: "☀️", caption: "Snap it back: sun!" },
          { at: "Try mmmaaap", emoji: "🗺️", caption: "m, a, p: map!" },
          { at: "say each sound", emoji: "👄➡️👂", caption: "Say each sound, then push them together" },
        ],
      },
      {
        show: [
          { emoji: "🤝", caption: "A blend: two letters side by side, and you hear both" },
          { at: "Listen to frog", big: "fr", caption: "fr in frog 🐸" },
          { at: "Listen to stop", big: "st", caption: "st in stop 🛑" },
          { at: "Blue starts", big: "bl", caption: "bl in blue 🔵" },
          { at: "Listen to hand", big: "nd", caption: "nd at the end of hand ✋" },
        ],
      },
      {
        show: [
          { emoji: "🎩✨", caption: "Two letters, one brand new sound" },
          { at: "S and h say sh", big: "sh", caption: "sh, like ship 🚢" },
          { at: "C and h say ch", big: "ch", caption: "ch, like chick 🐤" },
          { at: "T and h say th", big: "th", caption: "th, like thumb 👍" },
          { at: "W and h say wh", big: "wh", caption: "wh, like whale 🐳" },
        ],
      },
    ],
  },

  "ela-1.long-vowels": {
    hook: {
      show: [
        { big: "kit", caption: "Pip found a little word: kit" },
        { at: "now it says kite", big: "kite 🪁", caption: "Pop! Now it says kite!" },
        { at: "What magic letter", emoji: "🪄❓", caption: "What magic letter could do that?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "a e i o u", caption: "The five vowels" },
          { at: "The short sound is quick", emoji: "🐱🐷", caption: "Short sounds are quick: cat, pig" },
          { at: "says its own name", emoji: "📣", caption: "A long vowel says its own name" },
          { at: "the a in cake", emoji: "🎂", caption: "Cake: the a says its name" },
          { at: "the i in bike", emoji: "🚲", caption: "Bike: the i says its name" },
        ],
      },
      {
        show: [
          { emoji: "🪄", caption: "Here comes magic e!" },
          { at: "the word cap", big: "cap 🧢", caption: "Start with cap" },
          { at: "Cape!", big: "cape 🦸", caption: "Add an e: cape!" },
          { at: "The e stays quiet", emoji: "🤫", caption: "The e is silent, but it taps the vowel" },
          { at: "Kit becomes kite", big: "kit → kite", caption: "Kit becomes kite" },
        ],
      },
      {
        show: [
          { emoji: "👫", caption: "Two vowels, one long sound" },
          { at: "two vowels go walking", emoji: "🚶🚶💬", caption: "When two vowels go walking, the first one often does the talking" },
          { at: "In boat", big: "oa", caption: "boat ⛵: long o" },
          { at: "In rain", big: "ai", caption: "rain 🌧️: long a" },
          { at: "In seed", big: "ee", caption: "seed 🌱: long e" },
        ],
      },
    ],
  },

  "ela-1.syllables": {
    hook: {
      show: [
        { emoji: "🍄📜", caption: "A long word on a mushroom sign" },
        { at: "butterfly", emoji: "🦋", caption: "Butterfly!" },
        { at: "long words have a secret", big: "but-ter-fly", caption: "Long words come in small parts" },
      ],
    },
    teach: [
      {
        show: [
          { big: "syl-la-bles", caption: "Syllables: the parts of a word" },
          { at: "Let's clap", emoji: "🐱👏", caption: "Cat: one clap" },
          { at: "Rab, bit", emoji: "🐰👏👏", caption: "Rab-bit: two claps" },
          { at: "But, ter, fly", emoji: "🦋👏👏👏", caption: "But-ter-fly: three claps" },
          { at: "under your chin", emoji: "✋🙂", caption: "Your chin drops for each syllable" },
        ],
      },
      {
        show: [
          { big: "jump", caption: "Many words get endings" },
          { at: "Jumped. Jumping", big: "jumps · jumped · jumping", caption: "Find the word you know, then add the ending" },
          { at: "Some words are tricky", emoji: "🤔", caption: "Some words are tricky" },
          { at: "The. Said. Was. Of", big: "the · said · was · of", caption: "Tricky words we learn by heart ❤️" },
        ],
      },
      {
        show: [
          { emoji: "🗣️📖", caption: "Good readers sound like they are talking" },
          { at: "Not like a robot", emoji: "🤖", caption: "Not like a robot!" },
          { at: "The little frog", emoji: "🐸", caption: "The little frog... sat on a log." },
          { at: "voice go up", emoji: "❓📈", caption: "Your voice goes up for a question" },
          { at: "doesn't make sense, stop", emoji: "🛑🔙", caption: "If it doesn't make sense, go back and fix it" },
        ],
      },
    ],
  },

  "ela-1.story": {
    hook: {
      show: [
        { emoji: "📖🔥", caption: "Gather round for an old, old story" },
        { at: "a hard-working hen", emoji: "🐔", caption: "A hard-working hen..." },
        { at: "three lazy friends", emoji: "🐱🐶🦆", caption: "...and three lazy friends" },
        { at: "tell it back to me", emoji: "👂🗣️", caption: "Listen closely, then tell it back!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎭", caption: "Characters: the people or animals in a story" },
          { at: "In our tale", emoji: "🐔🐱🐶🦆", caption: "The hen, the cat, the dog and the duck" },
          { at: "has a setting", emoji: "🗺️⏰", caption: "Setting: where and when it happens" },
          { at: "on a farm, long ago", emoji: "🚜🌾", caption: "Our story: a farm, long ago" },
        ],
      },
      {
        show: [
          { big: "1 2 3", caption: "Retell the events in order" },
          { at: "First, the hen", emoji: "🌾", caption: "First: the hen found some wheat" },
          { at: "Next, she asked", emoji: "🙅🙅🙅", caption: "Next: no one would help" },
          { at: "baked bread", emoji: "🍞", caption: "She did all the work and baked bread" },
          { at: "Last, everyone", emoji: "😋", caption: "Last: the hen ate the bread herself" },
        ],
      },
      {
        show: [
          { emoji: "💡", caption: "Old stories often teach a lesson" },
          { at: "Those who help", emoji: "🤝🍞", caption: "Those who help with the work share the reward" },
          { at: "we take turns", emoji: "🗣️👂", caption: "Take turns and listen" },
          { at: "We ask questions", emoji: "❓", caption: "Ask questions about the story" },
        ],
      },
    ],
  },

  "ela-1.fables": {
    hook: {
      show: [
        { emoji: "🏛️📜", caption: "Long ago in Greece, Aesop told tales" },
        { at: "A boasting hare", emoji: "🐇🐜", caption: "A boasting hare and a busy ant" },
        { at: "hides a lesson", emoji: "💡", caption: "Each tale hides a lesson" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📜", caption: "A fable: a short story that teaches a lesson" },
          { at: "animals that talk", emoji: "🐇💬", caption: "Often with talking animals" },
          { at: "took a nap", emoji: "🐇😴", caption: "The fast hare took a nap" },
          { at: "kept going", emoji: "🐢🏆", caption: "The slow tortoise kept going and won!" },
          { at: "Slow and steady", big: "Slow and steady wins the race", caption: "The moral of the story" },
        ],
      },
      {
        show: [
          { emoji: "🗣️📖", caption: "A storyteller tells most of the story" },
          { at: "quotation marks", big: "“ ”", caption: "Quotation marks show a character's words" },
          { at: "said the hare", emoji: "🐇💬", caption: "\"I will win,\" said the hare" },
          { at: "felt proud", emoji: "😤😴", caption: "Feeling words: proud, tired" },
          { at: "crunchy", emoji: "🍂👂", caption: "Sense words: crunchy leaves" },
        ],
      },
      {
        show: [
          { emoji: "🐇🚫💬", caption: "Fables are made up. Hares can't really talk!" },
          { at: "A storybook", emoji: "📖", caption: "Storybook: a made-up story" },
          { at: "An informational book", emoji: "📘", caption: "Informational book: true facts" },
          { at: "compare two stories", emoji: "🐜🆚🦗", caption: "The ant planned ahead. The grasshopper only played." },
          { at: "both worked hard", emoji: "🐜🐢👍", caption: "The ant and the tortoise both worked hard" },
        ],
      },
    ],
  },

  "ela-1.nonfiction": {
    hook: {
      show: [
        { emoji: "🐝", caption: "Bzzz! A busy honeybee" },
        { at: "Where is she flying", emoji: "🐝💨🌸", caption: "Where is she flying in such a hurry?" },
        { at: "open a fact book", emoji: "📘🔍", caption: "Let's open a fact book!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📘✅", caption: "A fact book teaches true things" },
          { at: "The main topic", big: "Honeybees", caption: "Main topic: what it is all about" },
          { at: "Key details", emoji: "🔑", caption: "Key details tell more" },
          { at: "six legs", big: "6 legs", caption: "Honeybees have six legs" },
          { at: "They live in a hive", emoji: "🏠🐝🍯", caption: "They live in a hive and make honey" },
        ],
      },
      {
        show: [
          { emoji: "🧰📘", caption: "Text features: helpers in a fact book" },
          { at: "A heading", big: "Honeybees", caption: "A heading tells what a part is about" },
          { at: "The table of contents", emoji: "📑", caption: "Table of contents: the parts and their pages" },
          { at: "The glossary", emoji: "📖🔤", caption: "Glossary: what hard words mean" },
          { at: "Labels name", emoji: "🏷️🐝", caption: "Labels name the parts of a picture" },
        ],
      },
      {
        show: [
          { emoji: "📝🖼️", caption: "We learn from words and pictures" },
          { at: "yellow pollen", emoji: "🐝🌼", caption: "A picture can show yellow pollen on a bee's legs" },
          { at: "Authors also give reasons", emoji: "💡", caption: "Authors give reasons for their points" },
          { at: "helps plants make fruit", emoji: "🌸➡️🍎", caption: "Pollen helps plants make fruit" },
          { at: "Two books", emoji: "📘📗", caption: "Compare two books on the same topic" },
        ],
      },
    ],
  },

  "ela-1.grammar": {
    hook: {
      show: [
        { emoji: "🌲🔤", caption: "Every word has a job" },
        { at: "name things", emoji: "🏷️", caption: "Some words name things" },
        { at: "show action", emoji: "🏃", caption: "Some show action" },
        { at: "paint a picture", emoji: "🎨", caption: "Some paint a picture" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👩🏞️🐸⚽", caption: "A noun names a person, place, animal or thing" },
          { at: "Add s", emoji: "🐸➡️🐸🐸", caption: "One frog, two frogs" },
          { at: "special names", big: "Sam · Ohio · Monday · June", caption: "Proper nouns start with a capital letter" },
          { at: "he, she and they", emoji: "👦👧👫", caption: "He, she and they can stand in for a noun" },
        ],
      },
      {
        show: [
          { emoji: "🏃🤸🎤", caption: "A verb is an action word" },
          { at: "Today I jump", big: "jump", caption: "Today I jump" },
          { at: "Yesterday I jumped", big: "jumped", caption: "Yesterday I jumped" },
          { at: "Tomorrow I will jump", big: "will jump", caption: "Tomorrow I will jump" },
          { at: "One frog jumps", emoji: "🐸 🐸🐸", caption: "One frog jumps. Two frogs jump." },
        ],
      },
      {
        show: [
          { emoji: "🎨", caption: "An adjective describes a noun" },
          { at: "A red apple", emoji: "🍎🌳🐜", caption: "A red apple. A huge tree. Three tiny ants." },
          { at: "joining words", emoji: "🔗", caption: "Joining words connect ideas" },
          { at: "So and because", big: "and · but · so · because", caption: "I smiled because the sun came out" },
        ],
      },
    ],
  },

  "ela-1.writing": {
    hook: {
      show: [
        { emoji: "🐦✉️", caption: "The songbirds want to send letters" },
        { at: "forgot how to write", emoji: "🐦❓✏️", caption: "But they forgot how to write!" },
        { at: "three kinds of writing", big: "💭 📘 📖", caption: "Opinions, facts and stories" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💭", caption: "An opinion is what you think" },
          { at: "name your topic", emoji: "🐾", caption: "1. Topic: pets" },
          { at: "I think dogs", emoji: "🐶❤️", caption: "2. Opinion: I think dogs are the best pets" },
          { at: "Dogs love to play fetch", emoji: "🎾", caption: "3. Reason: dogs love to play fetch" },
          { at: "write a closing", emoji: "🏁", caption: "4. Closing: That is why dogs are the best!" },
        ],
      },
      {
        show: [
          { emoji: "📘", caption: "Informative writing teaches facts" },
          { at: "Topic: frogs", emoji: "🐸", caption: "Topic: frogs" },
          { at: "lay eggs in water", emoji: "🥚💧", caption: "Facts: frogs can jump far, and many lay eggs in water" },
          { at: "read a fact book", emoji: "📚", caption: "Read a fact book with a grown-up" },
          { at: "drawing with labels", emoji: "✏️🏷️", caption: "Add a drawing with labels" },
        ],
      },
      {
        show: [
          { emoji: "📖", caption: "A narrative tells a story" },
          { at: "First, I found", emoji: "🌳", caption: "First, I found a bird's nest" },
          { at: "three blue eggs", emoji: "🥚🥚🥚", caption: "Next, I saw three blue eggs" },
          { at: "baby birds hatched", emoji: "🐣", caption: "Last, the baby birds hatched!" },
          { at: "make it better", emoji: "✏️✨", caption: "Read it aloud, add a detail, fix mistakes" },
        ],
      },
    ],
  },
};
