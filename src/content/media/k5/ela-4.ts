import type { CourseMedia } from "../types";

/** Slides for ela-4, by lesson id. */
export const ela4Media: CourseMedia = {
  "ela-4.word-detective": {
    hook: {
      show: [
        { emoji: "🕵️📖", caption: "Today you become a word detective" },
        { at: "a mystery word", big: "unbreakable", caption: "A long mystery word" },
        { at: "three little clues", big: "un · break · able", caption: "Three little clues hide inside it" },
        { at: "a word detective", emoji: "🔍", caption: "No word will scare you again" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🚂🚃🚃", caption: "Long words are built from parts, like a train from cars" },
          { at: "A prefix rides at the front", big: "un-  re-  pre-  dis-", caption: "Prefixes ride at the front" },
          { at: "A suffix rides at the back", big: "-ful  -less  -able", caption: "Suffixes ride at the back" },
          { at: "The root is the engine", big: "tele · graph · photo · port · spect", caption: "Greek and Latin roots: far, write, light, carry, look" },
          { at: "a spectator is a person who looks", emoji: "👀🏟️", caption: "spect = look, so a spectator is someone who watches" },
        ],
      },
      {
        show: [
          { emoji: "✂️", caption: "Read long words in chunks called syllables" },
          { at: "peel off the prefix and suffix", big: "un | break | able", caption: "Trick 1: peel off the prefix and suffix" },
          { at: "split between them", big: "nap-kin · hel-met", caption: "Trick 2: split between two consonants" },
          { at: "which says shun", big: "-tion = shun", caption: "Trick 3: spot chunks you know" },
          { at: "Try transportation", big: "trans · por · ta · tion", caption: "Four chunks, four vowel sounds" },
        ],
      },
      {
        show: [
          { emoji: "🔍📄", caption: "Context: the words around a new word give clues" },
          { at: "A definition clue", emoji: "🚢", caption: "Definition clue: the meaning is right in the sentence" },
          { at: "An antonym clue", emoji: "😨↔️🦁", caption: "Antonym clue: timid is the opposite of bold" },
          { at: "An example clue", emoji: "🐢🐍", caption: "Example clue: turtles and snakes are reptiles" },
          { at: "A dictionary gives", emoji: "📕📑📗", caption: "Dictionary, glossary and thesaurus" },
        ],
      },
      {
        show: [
          { big: "Fluency", caption: "Reading aloud smoothly, with meaning" },
          { at: "Accuracy means", emoji: "🎯", caption: "Accuracy: read the words correctly" },
          { at: "Pace means", emoji: "🚲", caption: "Pace: a steady speed, not racing, not crawling" },
          { at: "Expression means", emoji: "🎭", caption: "Expression: your voice shows the meaning" },
          { at: "they stop, look again", emoji: "🔁", caption: "Doesn't make sense? Stop, fix the word, reread" },
        ],
      },
    ],
  },

  "ela-4.close-reading": {
    hook: {
      show: [
        { emoji: "🦁🐭", caption: "A lion who laughed at a mouse" },
        { at: "more than two thousand years", big: "2,000+ years", caption: "People have told this fable for over 2,000 years" },
        { at: "hides a lesson inside", emoji: "🦪💎", caption: "A lesson hides inside, like a pearl in an oyster" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📖", caption: "Some things a story tells you outright" },
          { at: "Other things you must infer", big: "Infer", caption: "Infer: text clues + what you already know" },
          { at: "the mouse was trembling", emoji: "🐭💦", caption: "She was trembling, so we infer she was scared" },
          { at: "point to the details", emoji: "👉📄", caption: "Always point to the details that prove it" },
        ],
      },
      {
        show: [
          { emoji: "🐭", caption: "Four ways to know a character" },
          { at: "What does the character say", emoji: "💬", caption: "Says: 'Someday I may be able to help you.'" },
          { at: "What does the character do", emoji: "🏃", caption: "Does: she gnaws through every rope" },
          { at: "What does the character think", emoji: "💭", caption: "Thinks and feels: scared, but she comes anyway" },
          { at: "How do others react", emoji: "🦁😂", caption: "Others react: the lion laughs, then learns" },
        ],
      },
      {
        show: [
          { big: "Theme", caption: "The big message that is true in real life too" },
          { at: "Kindness is never wasted", emoji: "💝", caption: "A theme is a whole thought, not one word" },
          { at: "What did a character learn", emoji: "🦁💡", caption: "Ask: what did a character learn?" },
          { at: "A summary is different", emoji: "📝", caption: "Summary: main events, in order, no opinions" },
        ],
      },
      {
        show: [
          { emoji: "🗣️👂", caption: "Stories are even better when you talk about them" },
          { at: "Come prepared", emoji: "📚✏️", caption: "Come prepared: read first and mark details" },
          { at: "Take turns", emoji: "🔄", caption: "Take turns and listen" },
          { at: "Ask questions", emoji: "❓", caption: "Ask questions and answer with evidence" },
          { at: "build on what others say", emoji: "🧱", caption: "Build on others: 'I agree, and I'd add...'" },
        ],
      },
    ],
  },

  "ela-4.myths-poems-plays": {
    hook: {
      show: [
        { big: "Herculean", caption: "A word with a hero hiding inside" },
        { at: "strong enough to wrestle a lion", emoji: "💪🦁", caption: "Hercules, the strongest hero of Greek myths" },
        { at: "how poems and plays are built", emoji: "📜🎭", caption: "Then: how poems and plays are built" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏛️", caption: "Greek and Roman myths live on in our words" },
          { at: "Hercules completed twelve labors", big: "12 labors", caption: "Herculean: needing huge effort" },
          { at: "his heel was his one weak spot", emoji: "🦶", caption: "Achilles' heel: a weak spot" },
          { at: "King Midas wished", emoji: "👑✨", caption: "The Midas touch: success at everything" },
          { at: "Atlas, a giant", emoji: "🌍🗺️", caption: "Atlas held up the sky; an atlas is a book of maps" },
        ],
      },
      {
        show: [
          { emoji: "📄", caption: "Prose: sentences and paragraphs" },
          { at: "Poems are written in verse", emoji: "📜", caption: "Poems are written in verse, in lines" },
          { at: "lines are grouped into stanzas", emoji: "🏠", caption: "Stanzas are like rooms in a house" },
          { at: "rhythm, a beat", emoji: "🥁", caption: "Rhythm and meter: the beat of a poem" },
          { at: "Who has seen the wind", emoji: "🍃💨", caption: "Christina Rossetti, 1872: one stanza of four lines" },
        ],
      },
      {
        show: [
          { emoji: "🎭", caption: "A play is a story written to be acted out" },
          { at: "a cast of characters", emoji: "📋", caption: "Cast of characters: everyone in the play" },
          { at: "mostly through dialogue", emoji: "💬", caption: "Dialogue: the speaker's name, then the words" },
          { at: "Stage directions", emoji: "🎬", caption: "Stage directions tell actors what to do" },
          { at: "acts and scenes", big: "Act 1, Scene 1", caption: "Long plays have acts and scenes" },
        ],
      },
      {
        show: [
          { emoji: "✨", caption: "Figurative language says more than its plain meaning" },
          { at: "A simile compares", emoji: "🪶", caption: "Simile: as soft as a feather" },
          { at: "A metaphor compares", emoji: "🏫🐒", caption: "Metaphor: the classroom was a zoo" },
          { at: "An idiom is a saying", emoji: "🐱🐶🌧️", caption: "Idiom: raining cats and dogs = raining hard" },
          { at: "A proverb is", emoji: "🐢🏁", caption: "Proverb: Slow and steady wins the race" },
        ],
      },
    ],
  },

  "ela-4.tales-point-of-view": {
    hook: {
      show: [
        { emoji: "❓👠", caption: "A riddle about a lost shoe" },
        { at: "France or from China", emoji: "🗼🏯", caption: "France or China? Both!" },
        { at: "Stories travel the world", emoji: "🌍📚", caption: "Stories travel the world" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🗣️", caption: "The narrator is the voice telling the story" },
          { at: "In first person", big: "I · me · we", caption: "First person: the narrator is a character" },
          { at: "In third person", big: "he · she · they", caption: "Third person: the narrator is outside the story" },
          { at: "Check the narration", emoji: "🔍💬", caption: "Characters say 'I' in dialogue. Check the narration!" },
        ],
      },
      {
        show: [
          { emoji: "🌍", caption: "The same pattern in tales from different lands" },
          { at: "Charles Perrault in France", big: "France, 1697", caption: "Cinderella, written down by Charles Perrault" },
          { at: "written down in China", big: "China, 800s", caption: "Yeh-Shen, written down centuries earlier" },
          { at: "a fairy godmother", emoji: "🧚🐟", caption: "Helpers: a fairy godmother and a magic fish" },
          { at: "Both lose a shoe", emoji: "👠", caption: "A lost shoe and a royal search" },
        ],
      },
      {
        show: [
          { emoji: "🤝🌍", caption: "Shared themes: people everywhere value the same things" },
          { at: "kindness and patience are rewarded", emoji: "💝", caption: "Kindness and patience are rewarded" },
          { at: "Other tales warn against greed", emoji: "🪙", caption: "King Midas: greed leads to trouble" },
          { at: "The Fisherman and His Wife", emoji: "🎣🏰", caption: "The Fisherman and His Wife: wanting more and more" },
          { at: "a pattern of three", big: "3", caption: "Three wishes, three tries, three brothers" },
        ],
      },
      {
        show: [
          { emoji: "📖🎧🎭", caption: "Read it, hear it, see it, watch it" },
          { at: "read aloud", emoji: "🎙️", caption: "Read aloud: the voice shows feelings" },
          { at: "In a play, actors", emoji: "🎭", caption: "Actors follow the stage directions" },
          { at: "Pictures show the setting", emoji: "🖼️", caption: "Pictures show setting, costumes and faces" },
          { at: "Then paraphrase", emoji: "🔁🗣️", caption: "Paraphrase: your own words, same meaning" },
        ],
      },
    ],
  },

  "ela-4.nonfiction-structure": {
    hook: {
      show: [
        { emoji: "🦋🦋🦋", caption: "Millions of monarch butterflies fly south each fall" },
        { at: "as far as 3,000 miles", big: "3,000 miles", caption: "Some fly as far as 3,000 miles" },
        { at: "mountain forests in Mexico", emoji: "🏔️🌲", caption: "To the same mountain forests in Mexico" },
        { at: "True stories", emoji: "📘", caption: "True stories can be as amazing as fables" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏷️", caption: "Topic: what the text is about, in a word or two" },
          { at: "The main idea is", big: "Main idea", caption: "Main idea: the author's most important point" },
          { at: "Key details are facts", emoji: "🦋🏔️🌲", caption: "Key details support the main idea" },
          { at: "A summary puts it together", emoji: "📝", caption: "Summary: main idea + key details, short" },
        ],
      },
      {
        show: [
          { emoji: "⚙️", caption: "Nonfiction often explains a process" },
          { at: "The Erie Canal", big: "1825", caption: "The Erie Canal opened in New York in 1825" },
          { at: "boats can't float uphill", emoji: "⛵⛰️", caption: "Problem: boats can't float uphill" },
          { at: "A boat floats into a lock", emoji: "🚤🚪", caption: "The boat enters the lock and the gates close" },
          { at: "Then water is let in", emoji: "💧⬆️🚤", caption: "Water rises, and so does the boat" },
        ],
      },
      {
        show: [
          { emoji: "🏗️", caption: "Text structures: how authors build their writing" },
          { at: "Chronology tells events", emoji: "🕰️", caption: "Chronology: time order" },
          { at: "Comparison shows", emoji: "🐊", caption: "Comparison: alike and different" },
          { at: "Cause and effect explains", emoji: "🍂", caption: "Cause and effect: why it happens" },
          { at: "Problem and solution", emoji: "🔧", caption: "Problem and solution: what was fixed, and how" },
        ],
      },
      {
        show: [
          { emoji: "🔤", caption: "Nonfiction is full of special subject words" },
          { at: "general academic words", big: "analyze · compare", caption: "Academic words show up in every subject" },
          { at: "printed in bold", big: "bold", caption: "Look for words in bold print" },
          { at: "a glossary at the back", emoji: "📑", caption: "Check the glossary at the back" },
          { at: "Keep a word notebook", emoji: "📓✏️", caption: "Word, meaning, sentence: keep a word notebook" },
        ],
      },
    ],
  },

  "ela-4.accounts-evidence": {
    hook: {
      show: [
        { emoji: "🌋", caption: "A volcano erupts across the bay" },
        { at: "He later wrote down", emoji: "✉️", caption: "He wrote down what he saw" },
        { at: "Because he was there", emoji: "👀", caption: "He was there: an eyewitness" },
        { at: "weigh evidence", emoji: "⚖️", caption: "Weigh evidence like a historian" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📜", caption: "An account is a telling of what happened" },
          { at: "A firsthand account comes from", emoji: "👀✍️", caption: "Firsthand: by someone who was there" },
          { at: "Pliny the Younger saw", emoji: "🌋🌲", caption: "Pliny saw a cloud shaped like an umbrella pine" },
          { at: "A secondhand account comes from", emoji: "📚", caption: "Secondhand: by someone who studied it later" },
          { at: "Look for clues", big: "I · we · saw", caption: "Clue words for a firsthand account" },
        ],
      },
      {
        show: [
          { emoji: "📊", caption: "Visuals show facts quickly" },
          { at: "A table arranges", big: "rows × columns", caption: "Tables arrange facts in rows and columns" },
          { at: "A timeline shows", emoji: "🕰️", caption: "Timelines show events in order" },
          { at: "Always read the title first", emoji: "🏷️", caption: "Read the title first, then the labels" },
          { at: "Flight 4, Wilbur", big: "852 feet", caption: "The fourth flight went 852 feet in 59 seconds" },
        ],
      },
      {
        show: [
          { emoji: "🗣️", caption: "Good authors and speakers back up their points" },
          { at: "The point:", big: "Point", caption: "Point: what the author wants you to believe" },
          { at: "A reason tells why", emoji: "🐝🌸", caption: "Reason: bees carry pollen from flower to flower" },
          { at: "Evidence proves the reason", emoji: "🍎🫐", caption: "Evidence: apples, blueberries and almonds need pollinators" },
          { at: "When you listen to a speaker", emoji: "👂", caption: "Point? Reasons? Evidence? Listen for all three" },
        ],
      },
      {
        show: [
          { emoji: "📄📄", caption: "Experts read more than one source" },
          { at: "Text A explains", emoji: "🐝💃", caption: "Text A: the waggle dance shows where flowers are" },
          { at: "Text B explains", emoji: "👑🍯", caption: "Text B: one queen, thousands of workers" },
          { at: "Both texts say", emoji: "🌸", caption: "Both: bees visit flowers for nectar" },
          { at: "name your source", big: "According to...", caption: "Always name your source" },
        ],
      },
    ],
  },

  "ela-4.grammar-workshop": {
    hook: {
      show: [
        { emoji: "✉️😬", caption: "A very messy sentence" },
        { at: "full of mistakes", emoji: "❌❌❌", caption: "It's full of mistakes" },
        { at: "fix every one of them", emoji: "🔨🪑", caption: "Grammar is your toolbox" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔗", caption: "Small words that add information" },
          { at: "Use who for people", big: "who", caption: "Who is for people" },
          { at: "Use which or that for things", big: "which · that", caption: "Which and that are for things" },
          { at: "Relative adverbs are where", big: "where · when · why", caption: "Place, time and reason" },
          { at: "Prepositional phrases add details", emoji: "🦊➡️🌾", caption: "The fox ran across the frozen field" },
        ],
      },
      {
        show: [
          { emoji: "⏳", caption: "Progressive tenses: action that keeps going" },
          { at: "Past progressive", big: "was reading", caption: "Past progressive" },
          { at: "Present progressive", big: "am reading", caption: "Present progressive" },
          { at: "Future progressive", big: "will be reading", caption: "Future progressive" },
          { at: "Modal auxiliaries", big: "can · may · must", caption: "Able to, allowed to or maybe, have to" },
        ],
      },
      {
        show: [
          { emoji: "🧩", caption: "A complete sentence: subject + predicate" },
          { at: "is a fragment", emoji: "❓", caption: "A fragment is missing a piece" },
          { at: "A run-on jams", emoji: "🚃💥🚃", caption: "A run-on crashes two sentences together" },
          { at: "Fix a run-on", big: ", and  , but  , so", caption: "Fix it with a period, or a comma and a joining word" },
          { at: "Adjectives have an order", emoji: "⛵", caption: "A lovely little red wooden boat" },
        ],
      },
      {
        show: [
          { big: "Aa", caption: "Capitals for names, places, days, months and holidays" },
          { at: "In dialogue, quotation marks", big: "\"Let's go,\" said Ben.", caption: "Quotation marks go around the exact words" },
          { at: "In a compound sentence", big: ", but", caption: "A comma before the joining word" },
          { at: "watch for words that sound alike", big: "to · too · two", caption: "Sound-alike words: to, too, two; there, their, they're" },
        ],
      },
      {
        show: [
          { emoji: "🎯", caption: "Choose precise words" },
          { at: "The puppy scampered", emoji: "🐶💨", caption: "Scampered paints a clearer picture than went" },
          { at: "An exclamation point", big: "!", caption: "Punctuation for effect" },
          { at: "Formal English is for", emoji: "🎤👔", caption: "Formal: reports, speeches and letters" },
          { at: "Informal English is fine", emoji: "😄👋", caption: "Informal: friends and family" },
        ],
      },
    ],
  },

  "ela-4.opinion-research": {
    hook: {
      show: [
        { emoji: "🐶🏠", caption: "You want your family to adopt a dog" },
        { at: "a hundred times", emoji: "🙏🙏🙏", caption: "Begging alone won't do it" },
        { at: "strong reasons and real evidence", emoji: "📋✅", caption: "Strong reasons and real evidence might" },
        { at: "the power of good writing", emoji: "✍️💪", caption: "The power of good writing" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🍪", caption: "Build an opinion piece like an OREO" },
          { at: "Start with your Opinion", big: "O", caption: "Opinion: what you believe" },
          { at: "Then give Reasons", big: "R", caption: "Reasons: why you believe it" },
          { at: "Back each reason with Evidence", big: "E", caption: "Evidence: facts and examples" },
          { at: "End by restating your Opinion", big: "O", caption: "Opinion again, in a strong conclusion" },
        ],
      },
      {
        show: [
          { emoji: "🐧", caption: "Informative writing teaches" },
          { at: "Begin with an introduction", emoji: "👋", caption: "Introduce the topic and hook the reader" },
          { at: "Headings help", big: "Where They Live", caption: "Headings group related facts" },
          { at: "precise subject words", emoji: "🧊🦐", caption: "Use subject words like Antarctica and krill" },
          { at: "End with a conclusion", emoji: "🏁", caption: "Sum up what the reader learned" },
        ],
      },
      {
        show: [
          { emoji: "🔬📚", caption: "A short research project makes you an expert" },
          { at: "ask a focused question", emoji: "❓", caption: "Ask a focused question" },
          { at: "find two or three good sources", emoji: "📚🌐", caption: "Find two or three good sources" },
          { at: "Then take notes", emoji: "📝", caption: "Notes: key words in your own words" },
          { at: "Keep a source list", emoji: "📋", caption: "List each title and author" },
        ],
      },
      {
        show: [
          { emoji: "🔎📄", caption: "Back up your writing with evidence" },
          { at: "You can quote", big: "\"...\"", caption: "Quote: the author's exact words" },
          { at: "Or you can paraphrase", emoji: "🔁", caption: "Paraphrase: the idea in your own words" },
          { at: "name your source", big: "According to...", caption: "Either way, name your source" },
          { at: "type it on a computer", emoji: "⌨️", caption: "Type, fix, print and share" },
        ],
      },
    ],
  },

  "ela-4.storytelling-presenting": {
    hook: {
      show: [
        { emoji: "📖🧓", caption: "Every storyteller started as a beginner" },
        { at: "in the town square", emoji: "🏛️👧👦", caption: "Fables told to children in the town square" },
        { at: "planned, practiced and improved", emoji: "📈", caption: "Plan, practice, improve" },
        { at: "share it like a real storyteller", emoji: "🎤", caption: "Write a story and share it" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🗺️", caption: "Plan your story before you write" },
          { at: "Start with a situation", emoji: "🌧️🏚️", caption: "Situation: who, where and when" },
          { at: "Choose a narrator", big: "I  or  she?", caption: "First person or third person?" },
          { at: "give your character a problem", emoji: "🐄❗", caption: "A problem, then events in order" },
          { at: "write an ending", emoji: "🌅", caption: "An ending that solves the problem" },
        ],
      },
      {
        show: [
          { emoji: "🎬", caption: "Show, don't tell" },
          { at: "Ruth's heart pounded", emoji: "💓", caption: "Showing lets the reader feel it too" },
          { at: "Use sensory details", emoji: "👃👂👀", caption: "Smells, sounds, sights, tastes and textures" },
          { at: "Use dialogue", emoji: "💬", caption: "Let characters speak for themselves" },
          { at: "choose precise words", emoji: "🏃", caption: "Raced, trudged or crept instead of went" },
        ],
      },
      {
        show: [
          { big: "Plan → Draft → Revise → Edit → Publish", caption: "Writing is a process" },
          { at: "When you revise", emoji: "💪", caption: "Revising makes the writing stronger" },
          { at: "Remember ARMS", big: "ARMS", caption: "Add, Remove, Move, Substitute" },
          { at: "Remember CUPS", big: "CUPS", caption: "Capitals, Usage, Punctuation, Spelling" },
          { at: "Think about your task", emoji: "🎯", caption: "Task, purpose and audience" },
        ],
      },
      {
        show: [
          { emoji: "🎤", caption: "Stories are made to be shared" },
          { at: "stand tall and look at your listeners", emoji: "🧍👀", caption: "Stand tall and look at your listeners" },
          { at: "Speak clearly", emoji: "🗣️", caption: "Clear, loud enough, at a steady pace" },
          { at: "Visuals and sound can help", emoji: "🖼️🔊", caption: "Add pictures or sound only if they help" },
          { at: "use formal English", emoji: "👔", caption: "'Good afternoon. My story is called The Storm.'" },
        ],
      },
    ],
  },
};
