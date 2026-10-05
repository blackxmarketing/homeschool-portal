import type { CourseMedia } from "./types";

/** Slides and videos for the writing-45 lessons, keyed by lesson id. */
export const writing45Media: CourseMedia = {
  "writing-45.sentences": {
    hook: {
      show: [
        { caption: "One long jumble of words. Can you read it in one breath?", emoji: "🦊🍇😵" },
        { at: "Did you run out of breath", caption: "No capitals, no end marks, no place to rest!", emoji: "😮‍💨" },
        { at: "like cars in a traffic jam", caption: "Words without end marks pile up like a traffic jam.", emoji: "🚗🚙🚕🚌" },
        { at: "complete, clear and easy to read", caption: "Today's goal: sentences that work.", big: "Complete. Clear. Easy to read." },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Every sentence is about someone or something.", emoji: "👤❓" },
          { at: "called the subject", caption: "That someone or something is the subject.", big: "Subject = who or what" },
          { at: "The old hen clucked", caption: "Who clucked? The hen. So hen is the subject.", photo: "Chicken" },
          { at: "Who or what is this sentence about", caption: "Ask this question to find the subject every time.", emoji: "🔍" },
          { at: "a person, an animal, a place or a thing", caption: "A subject can be a person, an animal, a place or a thing.", emoji: "👧🐇🏰📦" },
        ],
      },
      {
        show: [
          { caption: "The verb tells what the subject does.", big: "Peter ran." },
          { at: "Most verbs are action words", caption: "Action verbs are things you can do!", emoji: "🦘🍎🐭⛏️" },
          { at: "The hare was fast", caption: "Some verbs tell what the subject IS: is, are, was, were.", photo: "European hare" },
          { at: "What did the subject do", caption: "Ask what the subject did, and you've found the verb.", emoji: "🔍🏃" },
          { at: "Without a verb, nothing happens", caption: "No verb, no action, no sentence.", big: "No verb = no sentence" },
        ],
      },
      {
        show: [
          { caption: "Three things make a complete sentence.", big: "Subject + Verb + Complete thought" },
          { at: "A fragment is a broken piece", caption: "A fragment is just a broken piece of a sentence.", emoji: "🧩💔" },
          { at: "Put the pieces together", caption: "The fox and the grapes: one of Aesop's best-known fables.", photo: "The Fox and the Grapes" },
          { at: "Read your sentence aloud", caption: "Read it aloud. Still asking 'who?' or 'what happened?'", emoji: "🗣️❓" },
        ],
      },
      {
        show: [
          { caption: "Every sentence starts with a capital letter.", big: "A B C" },
          { at: "Names get capitals", caption: "Names of people and places get capitals, and so does I.", big: "Peter · Aesop · London · I" },
          { at: "A period ends a telling sentence", caption: "Three end marks, three different jobs.", big: ". ? !" },
          { at: "The tortoise won!", caption: "Slow and steady: the tortoise wins the race!", photo: "The Tortoise and the Hare" },
          { at: "tells the reader how to read", caption: "End marks are traffic signs for readers.", emoji: "📖🚦" },
        ],
      },
    ],
  },

  "writing-45.paragraph": {
    hook: {
      show: [
        { caption: "Some of these puzzle pieces don't belong!", emoji: "🧩❓" },
        { at: "A paragraph is like a puzzle box", caption: "In a paragraph, every sentence fits the same picture.", emoji: "🧩🖼️" },
        { at: "the three parts", caption: "Three parts make a paragraph fit together.", big: "Topic · Details · Closing" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A paragraph: many sentences, one main idea.", emoji: "📄💡" },
          { at: "The topic sentence tells", caption: "The topic sentence tells the main idea.", big: "Topic sentence = main idea" },
          { at: "hardest workers in nature", caption: "Ants: tiny, but some of nature's hardest workers.", photo: "Ant" },
          { at: "It makes a promise", caption: "A topic sentence makes a promise the paragraph keeps.", emoji: "🤝" },
          { at: "a reason to keep reading", caption: "A clear topic sentence makes readers want more.", emoji: "📖👀" },
        ],
      },
      {
        show: [
          { caption: "Details hold up the main idea.", emoji: "🏛️" },
          { at: "facts, examples and reasons", caption: "Three kinds of details.", big: "Facts · Examples · Reasons" },
          { at: "many times heavier than their own bodies", caption: "Leafcutter ants carry leaf pieces bigger than themselves.", photo: "Leafcutter ant" },
          { at: "My cousin has a pet hamster", caption: "A hamster in an ant paragraph? It wanders off!", emoji: "🐹🚫" },
          { at: "play for the same team", caption: "Every detail plays for the same team.", emoji: "⚽👕👕👕" },
        ],
      },
      {
        show: [
          { caption: "Order words guide the reader from detail to detail.", emoji: "➡️" },
          { at: "stepping stones across a creek", caption: "Order words are like stepping stones across a creek.", emoji: "🪨🌊🪨" },
          { at: "First, the ant finds a crumb", caption: "First, next, finally: the reader knows where to step.", big: "First → Next → Finally" },
          { at: "a pile of loose stones", caption: "Without order words, details are a jumbled pile.", emoji: "🪨🪨🪨" },
        ],
      },
      {
        show: [
          { caption: "The closing sentence wraps up the paragraph.", emoji: "🎁" },
          { at: "the main idea again in new words", caption: "Say the main idea again, but don't copy it.", big: "Same idea, new words" },
          { at: "they never stop working", caption: "Aesop's busy ant worked all summer to store food for winter.", photo: "The Ant and the Grasshopper" },
          { at: "the lid on a box", caption: "Like a lid on a box, it closes things up neatly.", emoji: "📦✅" },
        ],
      },
    ],
  },

  "writing-45.senses": {
    hook: {
      show: [
        { caption: "Can you picture anything? Not much!", big: "The kitchen was nice." },
        { at: "Warm bread steamed", caption: "Now you can almost smell it.", emoji: "🍞♨️" },
        { at: "Did your nose twitch", caption: "Words that wake up the senses pull readers in.", emoji: "👃✨" },
        { at: "paint pictures with words", caption: "Today: painting pictures with words.", emoji: "🎨✏️" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Telling just says it. Showing paints it.", big: "Tell vs. Show" },
          { at: "Fat red radishes", caption: "Fat red radishes: now you can see them!", photo: "Radish" },
          { at: "see, hear, smell, touch and taste", caption: "Sensory details use the five senses.", emoji: "👀👂👃✋👅" },
          { at: "lettuces, French beans and radishes", caption: "Peter Rabbit's feast: lettuces, French beans and radishes.", emoji: "🐇🥬🫘" },
          { at: "standing right there", caption: "Ask: what would I notice if I were there?", emoji: "🧍🌳" },
        ],
      },
      {
        show: [
          { caption: "Sight is the sense writers use most.", emoji: "👀" },
          { at: "color, size and shape", caption: "Tell the reader what things look like.", big: "Color · Size · Shape" },
          { at: "Sound makes a scene come alive", caption: "Sounds make a scene come alive.", emoji: "👂🎶" },
          { at: "the buzz of a bee", caption: "Bzzz! Some words sound like the noise they name.", photo: "Western honey bee" },
          { at: "hear your story", caption: "Sound words let the reader hear your story.", emoji: "📖👂" },
        ],
      },
      {
        show: [
          { caption: "Three more senses pull readers into a scene.", emoji: "👃✋👅" },
          { at: "Smells bring back memories", caption: "Fresh bread, pine trees, a campfire.", emoji: "🍞🌲🔥" },
          { at: "rough bark, a fuzzy peach", caption: "Rough, fuzzy, icy: words you can feel.", emoji: "🌳🍑🧊" },
          { at: "sour lemons", caption: "Sour! Your mouth may pucker just reading the word.", photo: "Lemon" },
          { at: "they must be sour", caption: "The fox calls the grapes sour. One word shows his mood.", emoji: "🦊🍇😤" },
        ],
      },
      {
        show: [
          { caption: "Compare something new to something the reader knows.", emoji: "🔁" },
          { at: "A simile compares two things", caption: "A simile uses 'like' or 'as' to compare.", big: "like · as" },
          { at: "as soft as a pillow", caption: "Fresh snow, as soft as a pillow.", emoji: "❄️☁️🛏️" },
          { at: "rumbled like a giant's tummy", caption: "Thunder that rumbles like a giant's tummy!", emoji: "⛈️👂" },
          { at: "fit the feeling you want", caption: "Pick comparisons that fit the feeling.", emoji: "🎯" },
        ],
      },
    ],
  },

  "writing-45.story": {
    hook: {
      show: [
        { caption: "A rabbit eats lunch and goes home. Yawn.", emoji: "🐇🥕🏠" },
        { at: "Boring, right", caption: "Nothing goes wrong, so nothing happens.", emoji: "😴" },
        { at: "the farmer spots him", caption: "Uh-oh! Now there's trouble, and we want to read on.", emoji: "🐇👨‍🌾❗" },
        { at: "the secret parts", caption: "The parts inside every great story.", big: "Characters · Problem · Beginning, Middle, End" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Characters: the people or animals a story is about.", emoji: "🐇🐢🦊" },
          { at: "In The Tale of Peter Rabbit", caption: "Beatrix Potter wrote and illustrated The Tale of Peter Rabbit.", photo: "Beatrix Potter" },
          { at: "characters want something", caption: "The big question about every character.", big: "What do they want?" },
          { at: "Peter wants the tasty vegetables", caption: "Peter wants Mr. McGregor's vegetables.", emoji: "🐇🥬🥕" },
          { at: "The tortoise wants to win", caption: "The tortoise wants to win the race.", emoji: "🐢🏁" },
        ],
      },
      {
        show: [
          { caption: "Every story needs a problem the character must face.", big: "Problem = trouble" },
          { at: "is not much of a story", caption: "No problem? No story.", emoji: "😴📖" },
          { at: "gets chased by Mr. McGregor", caption: "A chase! Now we're worried about Peter.", emoji: "🏃🐇👨‍🌾" },
          { at: "worry keeps us reading", caption: "Worried readers keep turning the pages.", emoji: "😟📖" },
          { at: "gets in the way", caption: "In Aesop's fable, a thirsty crow can't reach the water. A problem!", photo: "The Crow and the Pitcher" },
        ],
      },
      {
        show: [
          { caption: "Stories move in three parts.", big: "Beginning → Middle → End" },
          { at: "The middle is where the problem grows", caption: "In the middle, the trouble grows.", emoji: "📈😬" },
          { at: "The end shows how the problem is solved", caption: "At the end, the problem is solved.", emoji: "✅😌" },
          { at: "squeezing under the garden gate", caption: "The Tale of Peter Rabbit, by Beatrix Potter.", photo: "The Tale of Peter Rabbit" },
          { at: "safe at home, tired, in bed", caption: "The end: Peter safe at home in bed.", emoji: "🐇🛏️💤" },
        ],
      },
      {
        show: [
          { caption: "A good ending solves the problem in a way that makes sense.", emoji: "🧩✅" },
          { at: "a lion lets a tiny mouse go free", caption: "The Lion and the Mouse, one of Aesop's fables.", photo: "File:The Lion and the Mouse - Project Gutenberg etext 19994.jpg" },
          { at: "caught in a hunter's net", caption: "The mighty lion is trapped!", emoji: "🦁🕸️" },
          { at: "chews through the ropes", caption: "Nibble, nibble: the tiny mouse frees the mighty lion.", emoji: "🐭🦁" },
          { at: "even the small can help the great", caption: "The fable's lesson.", big: "Even the small can help the great." },
        ],
      },
    ],
  },

  "writing-45.opinion": {
    hook: {
      show: [
        { caption: "Summer or winter? Pick one!", emoji: "☀️🆚❄️" },
        { at: "could you convince a friend", caption: "Could you change a friend's mind?", emoji: "🗣️🤔" },
        { at: "Giving good reasons", caption: "Good reasons are what change minds.", big: "Opinion + Reasons" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A fact can be checked and proven true.", big: "Fact = can be proven" },
          { at: "A spider has eight legs", caption: "Count them: eight legs. That's a fact.", emoji: "🕷️🔢" },
          { at: "An opinion tells what someone thinks", caption: "An opinion is what someone thinks or feels.", big: "Opinion = what someone thinks" },
          { at: "Opinion words are clues", caption: "Watch for opinion clue words.", big: "best · worst · favorite · should" },
        ],
      },
      {
        show: [
          { caption: "Say exactly what you think, in one clear sentence.", emoji: "📣" },
          { at: "Maybe dogs are kind of okay", caption: "Wobbly and unsure.", emoji: "🤷" },
          { at: "Dogs make the best pets", caption: "Clear and confident: 'Dogs make the best pets.'", photo: "Golden Retriever" },
          { at: "Put it up front", caption: "Plant your opinion up front, like a flag on a hill.", emoji: "🚩⛰️" },
        ],
      },
      {
        show: [
          { caption: "An opinion without reasons is just a claim.", emoji: "🤔❓" },
          { at: "Why do you think that", caption: "A reason answers one question.", big: "Why?" },
          { at: "learn to swim because", caption: "Knowing how to swim keeps kids safe near water.", photo: "Swimming lessons" },
          { at: "back up the reason with an example", caption: "An example makes the reason easy to picture.", emoji: "🛟🏊" },
          { at: "because I said so", caption: "'Because I said so' isn't a real reason.", emoji: "🙅" },
        ],
      },
      {
        show: [
          { caption: "Linking words connect your reasons.", emoji: "🔗" },
          { at: "because, for example, also", caption: "Linking words lead the reader through your thinking.", big: "because · for example · also · in conclusion" },
          { at: "books take you to new places", caption: "Books can take you anywhere.", photo: "Library" },
          { at: "In conclusion, reading every day", caption: "A conclusion says your opinion again in new words.", big: "In conclusion..." },
        ],
      },
    ],
  },
};
