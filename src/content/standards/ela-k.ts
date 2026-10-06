import type { Standard } from "./types";

/**
 * Standards for ela-k: Common Core English Language Arts, Kindergarten.
 * RL.K.8, W.K.4, W.K.9, W.K.10 and L.K.3 do not apply in kindergarten (they begin in later grades).
 */
export const elaKStandards: Standard[] = [
  // Reading: Literature
  { code: "RL.K.1", text: "With help, ask and answer questions about key details in a story.", required: true },
  { code: "RL.K.2", text: "With help, retell a familiar story, including its key details.", required: true },
  { code: "RL.K.3", text: "With help, name the characters, the setting and the big events in a story.", required: true },
  { code: "RL.K.4", text: "Ask and answer questions about words you don't know in a story.", required: true },
  { code: "RL.K.5", text: "Recognize common kinds of texts, like storybooks and poems.", required: true },
  { code: "RL.K.6", text: "With help, name the author and illustrator of a story and tell what each one does.", required: true },
  { code: "RL.K.7", text: "With help, tell how the pictures in a story go with the words.", required: true },
  { code: "RL.K.9", text: "With help, compare the adventures of characters in familiar stories.", required: true },
  { code: "RL.K.10", text: "Join in group reading of stories and poems with purpose and understanding.", required: false },

  // Reading: Informational Text
  { code: "RI.K.1", text: "With help, ask and answer questions about key details in a true (nonfiction) book.", required: true },
  { code: "RI.K.2", text: "With help, name the main topic of a true book and retell key details.", required: true },
  { code: "RI.K.3", text: "With help, tell how two people, events, ideas or facts in a true book are connected.", required: true },
  { code: "RI.K.4", text: "With help, ask and answer questions about words you don't know in a true book.", required: true },
  { code: "RI.K.5", text: "Find the front cover, the back cover and the title page of a book.", required: true },
  { code: "RI.K.6", text: "Name the author and illustrator of a true book and tell what each one does.", required: true },
  { code: "RI.K.7", text: "With help, tell how the pictures in a true book go with the words.", required: true },
  { code: "RI.K.8", text: "With help, find the reasons an author gives to back up a point.", required: true },
  { code: "RI.K.9", text: "With help, find what is the same and what is different in two books on the same topic.", required: true },
  { code: "RI.K.10", text: "Join in group reading of true books with purpose and understanding.", required: false },

  // Reading: Foundational Skills
  {
    code: "RF.K.1",
    text: "Know how print works: read left to right, top to bottom and page by page, know that words are made of letters with spaces between them, and name every uppercase and lowercase letter.",
    required: true,
  },
  {
    code: "RF.K.2",
    text: "Hear and play with sounds: rhymes, clapping syllables, first and last sounds, blending sounds and changing a sound to make a new word.",
    required: true,
  },
  {
    code: "RF.K.3",
    text: "Know letter sounds: the main sound of each consonant, short and long vowel sounds, common sight words (the, of, to, you, she, my, is, are, do, does), and how one changed letter makes a new word.",
    required: true,
  },
  { code: "RF.K.4", text: "Read beginner books with purpose and understanding.", required: true },

  // Writing
  { code: "W.K.1", text: "Draw, tell or write to share an opinion about a topic or book (I like... because...).", required: true },
  { code: "W.K.2", text: "Draw, tell or write to name a topic and give some facts about it.", required: true },
  { code: "W.K.3", text: "Draw, tell or write about an event in order, and tell how you felt about it.", required: true },
  { code: "W.K.5", text: "With help, answer questions and suggestions from others and add details to your writing.", required: true },
  { code: "W.K.6", text: "With help, try digital tools, like typing on a computer, to make and share writing.", required: true },
  { code: "W.K.7", text: "Take part in shared research and writing projects, like finding facts about an animal with a grown-up.", required: true },
  { code: "W.K.8", text: "With help, remember experiences or find facts in given sources to answer a question.", required: true },

  // Speaking and Listening
  {
    code: "SL.K.1",
    text: "Take part in conversations: listen, take turns and keep the talk going back and forth.",
    required: true,
  },
  { code: "SL.K.2", text: "Show you understood a story read aloud by asking and answering questions about it.", required: true },
  { code: "SL.K.3", text: "Ask and answer questions to get help, learn something or understand better.", required: true },
  { code: "SL.K.4", text: "Describe familiar people, places, things and events, adding details with help.", required: true },
  { code: "SL.K.5", text: "Add drawings or pictures to descriptions to give more detail.", required: true },
  { code: "SL.K.6", text: "Speak loud and clear to share thoughts, feelings and ideas.", required: true },

  // Language
  {
    code: "L.K.1",
    text: "Use grammar when talking and writing: print letters, use nouns and verbs, add s or es for more than one, use question words (who, what, where, when, why, how) and little words like in and on, and make complete sentences.",
    required: true,
  },
  {
    code: "L.K.2",
    text: "Start a sentence and the word I with a capital letter, know end marks, write a letter for most sounds, and spell simple words by their sounds.",
    required: true,
  },
  {
    code: "L.K.4",
    text: "Work out what new words mean, including words with two meanings (a duck, to duck) and endings like -ed, -s, un- and re-.",
    required: true,
  },
  {
    code: "L.K.5",
    text: "Explore word meanings: sort things into groups, know opposites, and tell apart similar action words like walk, march and tiptoe.",
    required: true,
  },
  { code: "L.K.6", text: "Use new words learned from talking, reading and being read to.", required: true },
];
