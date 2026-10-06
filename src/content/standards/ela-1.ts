import type { Standard } from "./types";

/**
 * Standards for ela-1: Common Core English Language Arts, Grade 1.
 * (RL.1.8, W.1.4, W.1.9, W.1.10 and L.1.3 do not apply in grade 1.)
 */
export const ela1Standards: Standard[] = [
  // Reading: Literature
  { code: "RL.1.1", text: "Ask and answer questions about key details in a story.", required: true },
  { code: "RL.1.2", text: "Retell stories with key details and understand their central message or lesson.", required: true },
  { code: "RL.1.3", text: "Describe the characters, setting and major events in a story, using key details.", required: true },
  { code: "RL.1.4", text: "Find words and phrases in stories or poems that suggest feelings or appeal to the senses.", required: true },
  { code: "RL.1.5", text: "Explain the major differences between storybooks and books that give information.", required: true },
  { code: "RL.1.6", text: "Identify who is telling the story at various points in a text.", required: true },
  { code: "RL.1.7", text: "Use pictures and details in a story to describe its characters, setting or events.", required: true },
  { code: "RL.1.9", text: "Compare and contrast the adventures and experiences of characters in stories.", required: true },
  { code: "RL.1.10", text: "With help, read prose and poetry of the right difficulty for grade 1.", required: false },

  // Reading: Informational Text
  { code: "RI.1.1", text: "Ask and answer questions about key details in a fact text.", required: true },
  { code: "RI.1.2", text: "Identify the main topic and retell key details of a fact text.", required: true },
  { code: "RI.1.3", text: "Describe the connection between two people, events, ideas or pieces of information in a text.", required: true },
  { code: "RI.1.4", text: "Ask and answer questions to figure out the meaning of words and phrases in a fact text.", required: true },
  { code: "RI.1.5", text: "Know and use text features like headings, tables of contents, glossaries, menus and icons to find facts.", required: true },
  { code: "RI.1.6", text: "Tell the difference between information from the pictures and information from the words.", required: true },
  { code: "RI.1.7", text: "Use the pictures and details in a text to describe its key ideas.", required: true },
  { code: "RI.1.8", text: "Identify the reasons an author gives to support points in a text.", required: true },
  { code: "RI.1.9", text: "Find what is the same and what is different in two texts on the same topic.", required: true },
  { code: "RI.1.10", text: "With help, read fact texts of the right difficulty for grade 1.", required: false },

  // Reading: Foundational Skills
  { code: "RF.1.1", text: "Know the features of a sentence: the first word, a capital letter and an end mark.", required: true },
  { code: "RF.1.2", text: "Hear and work with sounds: short and long vowels, blending sounds (including blends) and breaking words into each sound.", required: true },
  { code: "RF.1.3", text: "Use phonics to read words: digraphs, silent e and vowel teams, syllables, endings and tricky sight words.", required: true },
  { code: "RF.1.4", text: "Read grade 1 texts smoothly and accurately, with understanding, and go back to fix words that don't make sense.", required: true },

  // Writing
  { code: "W.1.1", text: "Write opinion pieces that name a topic, state an opinion, give a reason and end with a closing.", required: true },
  { code: "W.1.2", text: "Write informative pieces that name a topic, give some facts and end with a closing.", required: true },
  { code: "W.1.3", text: "Write stories that tell two or more events in order, with details, time words and an ending.", required: true },
  { code: "W.1.5", text: "With help from an adult, respond to questions and add details to make writing better.", required: true },
  { code: "W.1.6", text: "With help, use digital tools to write and share writing, including with others.", required: true },
  { code: "W.1.7", text: "Take part in shared research and writing projects, like reading books on a topic and writing about it.", required: true },
  { code: "W.1.8", text: "With help, remember experiences or gather facts from sources to answer a question.", required: true },

  // Speaking and Listening
  { code: "SL.1.1", text: "Take part in conversations: take turns, listen, build on what others say and ask questions.", required: true },
  { code: "SL.1.2", text: "Ask and answer questions about key details of something read aloud or shown.", required: true },
  { code: "SL.1.3", text: "Ask and answer questions about what a speaker says to learn more or clear up confusion.", required: true },
  { code: "SL.1.4", text: "Describe people, places, things and events with details, and share ideas and feelings clearly.", required: true },
  { code: "SL.1.5", text: "Add drawings or other pictures to descriptions to make ideas and feelings clear.", required: true },
  { code: "SL.1.6", text: "Speak in complete sentences when it fits the task and situation.", required: true },

  // Language
  { code: "L.1.1", text: "Use grade 1 grammar: nouns (common, proper, plural), verbs for past, present and future, pronouns, adjectives, joining words and complete sentences.", required: true },
  { code: "L.1.2", text: "Capitalize dates and names, use end marks and commas in dates and lists, and spell words by their sounds.", required: true },
  { code: "L.1.4", text: "Figure out word meanings using sentence clues, word endings and base words.", required: true },
  { code: "L.1.5", text: "Explore word relationships: sort words into groups, connect words to real life and see shades of meaning (look, peek, stare; big, huge).", required: true },
  { code: "L.1.6", text: "Use words learned in conversations, reading and being read to, including joining words like because.", required: true },
];
