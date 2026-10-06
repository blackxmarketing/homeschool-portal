import type { Standard } from "./types";

/**
 * Standards for ela-2: Common Core English Language Arts, Grade 2.
 * Reading Literature (RL), Reading Informational Text (RI), Foundational
 * Skills (RF), Writing (W), Speaking and Listening (SL) and Language (L).
 * Sub-skills (a, b, c...) are named in the text. The "range of reading"
 * standards (RL.2.10, RI.2.10) are a guide, not a single skill to teach.
 */
export const ela2Standards: Standard[] = [
  // Reading: Literature
  { code: "RL.2.1", text: "Ask and answer who, what, where, when, why and how questions to show understanding of a story.", required: true },
  { code: "RL.2.2", text: "Retell stories, including fables and folktales from many cultures, and tell their central message, lesson or moral.", required: true },
  { code: "RL.2.3", text: "Describe how characters in a story respond to big events and challenges.", required: true },
  { code: "RL.2.4", text: "Describe how words and phrases (beats, alliteration, rhymes, repeated lines) give rhythm and meaning to a story, poem or song.", required: true },
  { code: "RL.2.5", text: "Describe how a story is built: the beginning introduces the story and the ending wraps it up.", required: true },
  { code: "RL.2.6", text: "Notice that characters see things differently, and use a different voice for each character when reading dialogue aloud.", required: true },
  { code: "RL.2.7", text: "Use pictures and words together to understand a story's characters, setting and plot.", required: true },
  { code: "RL.2.9", text: "Compare and contrast two or more versions of the same story by different authors or from different cultures.", required: true },
  { code: "RL.2.10", text: "Read and understand stories and poems at the grade 2-3 level, with help as needed.", required: false },

  // Reading: Informational Text
  { code: "RI.2.1", text: "Ask and answer who, what, where, when, why and how questions to show understanding of a nonfiction text.", required: true },
  { code: "RI.2.2", text: "Find the main topic of a text with several paragraphs and the focus of each paragraph.", required: true },
  { code: "RI.2.3", text: "Describe how a series of historical events, science ideas or steps in a process connect.", required: true },
  { code: "RI.2.4", text: "Figure out what words and phrases mean in a grade 2 nonfiction text about history, science or another subject.", required: true },
  { code: "RI.2.5", text: "Know and use text features such as captions, bold words, subheadings, glossaries, indexes, menus and icons to find facts quickly.", required: true },
  { code: "RI.2.6", text: "Tell the main purpose of a text: what the author wants to answer, explain or describe.", required: true },
  { code: "RI.2.7", text: "Explain how a picture or diagram helps make a text clearer.", required: true },
  { code: "RI.2.8", text: "Describe how reasons support the points an author makes.", required: true },
  { code: "RI.2.9", text: "Compare and contrast the most important points of two texts on the same topic.", required: true },
  { code: "RI.2.10", text: "Read and understand nonfiction about history, science and other subjects at the grade 2-3 level, with help as needed.", required: false },

  // Reading: Foundational Skills
  { code: "RF.2.3", text: "Use phonics to read words: long and short vowels, vowel teams, two-syllable words, prefixes and suffixes, tricky spellings and sight words.", required: true },
  { code: "RF.2.4", text: "Read with enough accuracy and fluency to understand: read with purpose, read aloud smoothly with expression, and use context to fix mistakes.", required: true },

  // Writing
  { code: "W.2.1", text: "Write an opinion piece: name the topic, give an opinion, give reasons with linking words, and end with a conclusion.", required: true },
  { code: "W.2.2", text: "Write an informative piece: introduce a topic, use facts and definitions, and end with a conclusion.", required: true },
  { code: "W.2.3", text: "Write a story with a clear order of events, details about actions, thoughts and feelings, time words and an ending.", required: true },
  { code: "W.2.5", text: "With help, stay on topic and make writing better by revising and editing.", required: true },
  { code: "W.2.6", text: "With help, use digital tools to make and share writing, working with others.", required: true },
  { code: "W.2.7", text: "Take part in shared research and writing projects, such as reading books on a topic to write a report.", required: true },
  { code: "W.2.8", text: "Remember facts from experiences or gather facts from given sources to answer a question.", required: true },

  // Speaking and Listening
  { code: "SL.2.1", text: "Take part in conversations: follow agreed rules, build on what others say, and ask for help when something is unclear.", required: true },
  { code: "SL.2.2", text: "Retell or describe the key ideas of a text read aloud or information shared out loud or through media.", required: true },
  { code: "SL.2.3", text: "Ask and answer questions about what a speaker says to learn more or understand better.", required: true },
  { code: "SL.2.4", text: "Tell a story or share an experience with good facts and details, speaking clearly in complete sentences.", required: true },
  { code: "SL.2.5", text: "Make audio recordings of stories or poems, and add drawings or other visuals to make ideas clearer.", required: true },
  { code: "SL.2.6", text: "Speak in complete sentences when it fits the task, to give details or make things clear.", required: true },

  // Language
  { code: "L.2.1", text: "Use correct grammar: collective nouns, irregular plurals, reflexive pronouns, irregular past-tense verbs, adjectives and adverbs, and simple and compound sentences.", required: true },
  { code: "L.2.2", text: "Use capitals for holidays, product names and places, commas in letter greetings and closings, apostrophes in contractions and possessives, spelling patterns, and a dictionary.", required: true },
  { code: "L.2.3", text: "Use what you know about language when writing, speaking, reading or listening, including formal and informal English.", required: true },
  { code: "L.2.4", text: "Figure out unknown words using context, prefixes, root words, compound words, glossaries and dictionaries.", required: true },
  { code: "L.2.5", text: "Understand word relationships: connect words to real life and tell shades of meaning between close words (toss, throw, hurl).", required: true },
  { code: "L.2.6", text: "Use new words and phrases from conversations and reading, including adjectives and adverbs to describe.", required: true },
];
