import type { Standard } from "./types";

/**
 * Standards for ela-3: Common Core English Language Arts, Grade 3.
 * Reading Literature (RL), Reading Informational Text (RI), Foundational
 * Skills (RF), Writing (W), Speaking and Listening (SL) and Language (L).
 * Sub-skills (a, b, c...) are named in the text. The "range of reading"
 * standards (RL.3.10, RI.3.10) are a guide, not a single skill to teach.
 * Grade 3 has no RL.3.8 or W.3.9 in the Common Core.
 */
export const ela3Standards: Standard[] = [
  // Reading: Literature
  { code: "RL.3.1", text: "Ask and answer questions about a story, pointing to the words in the text as the evidence for each answer.", required: true },
  { code: "RL.3.2", text: "Retell fables, folktales and myths from many cultures and tell the central message, lesson or moral, and how the details show it.", required: true },
  { code: "RL.3.3", text: "Describe characters (their traits, motivations and feelings) and explain how their actions move the events of the story along.", required: true },
  { code: "RL.3.4", text: "Figure out what words and phrases mean in a story, and tell literal language (what the words really say) from nonliteral language (like 'it's raining cats and dogs').", required: true },
  { code: "RL.3.5", text: "Use words like chapter, scene and stanza when talking about stories, plays and poems, and explain how each part builds on the parts before it.", required: true },
  { code: "RL.3.6", text: "Tell your own point of view apart from the point of view of the narrator or the characters.", required: true },
  { code: "RL.3.7", text: "Explain how a story's pictures add to what the words say, for example by showing the mood, a character or the setting.", required: true },
  { code: "RL.3.9", text: "Compare and contrast the themes, settings and plots of stories by the same author about the same or similar characters.", required: true },
  { code: "RL.3.10", text: "Read and understand stories, plays and poems at the grade 2-3 level by the end of the year, on your own.", required: false },

  // Reading: Informational Text
  { code: "RI.3.1", text: "Ask and answer questions about a nonfiction text, pointing to the words in the text as the evidence for each answer.", required: true },
  { code: "RI.3.2", text: "Find the main idea of a nonfiction text, recount the key details and explain how they support the main idea.", required: true },
  { code: "RI.3.3", text: "Describe how historical events, science ideas or steps in a process connect, using words about time, sequence and cause and effect.", required: true },
  { code: "RI.3.4", text: "Figure out what general academic and subject words mean in a grade 3 nonfiction text.", required: true },
  { code: "RI.3.5", text: "Use text features and search tools (key words, sidebars, hyperlinks) to find facts on a topic quickly.", required: true },
  { code: "RI.3.6", text: "Tell your own point of view apart from the point of view of the author of a nonfiction text.", required: true },
  { code: "RI.3.7", text: "Use maps, photographs and other pictures, along with the words, to understand a nonfiction text (where, when, why and how things happen).", required: true },
  { code: "RI.3.8", text: "Describe how sentences and paragraphs connect logically: comparison, cause and effect, or first, second, third in a sequence.", required: true },
  { code: "RI.3.9", text: "Compare and contrast the most important points and key details in two texts on the same topic.", required: true },
  { code: "RI.3.10", text: "Read and understand nonfiction about history, science and technology at the grade 2-3 level by the end of the year, on your own.", required: false },

  // Reading: Foundational Skills
  { code: "RF.3.3", text: "Use phonics and word analysis to read words: common prefixes and suffixes, Latin suffixes, multisyllable words, and grade-level words with irregular spellings.", required: true },
  { code: "RF.3.4", text: "Read grade-level text with enough accuracy and fluency to understand it: with purpose, smoothly, with expression, and rereading to fix mistakes.", required: true },

  // Writing
  { code: "W.3.1", text: "Write opinion pieces: state an opinion, give reasons, use linking words (because, therefore, since, for example) and write a conclusion.", required: true },
  { code: "W.3.2", text: "Write informative texts: introduce a topic, group related facts, develop it with facts, definitions and details, use linking words (also, another, and, more, but) and write a conclusion.", required: true },
  { code: "W.3.3", text: "Write stories about real or imagined experiences with a narrator and characters, events in order, dialogue, actions, thoughts and feelings, time words and an ending.", required: true },
  { code: "W.3.4", text: "With help, write clearly and in an order that fits the task and purpose.", required: true },
  { code: "W.3.5", text: "With help from adults and peers, plan, revise and edit to make writing stronger.", required: true },
  { code: "W.3.6", text: "With help, use technology to produce and publish writing, using keyboarding skills, and work with others.", required: true },
  { code: "W.3.7", text: "Do short research projects that build knowledge about a topic.", required: true },
  { code: "W.3.8", text: "Recall information from experience or gather it from print and digital sources, take brief notes and sort the evidence into categories.", required: true },
  { code: "W.3.10", text: "Write often, both over longer times (with research and revision) and in a single sitting, for many tasks and audiences.", required: true },

  // Speaking and Listening
  { code: "SL.3.1", text: "Take part in discussions: come prepared, follow agreed rules, ask questions to stay on topic, link your comments to others' and explain your ideas.", required: true },
  { code: "SL.3.2", text: "Find the main ideas and supporting details of a text read aloud or of information heard or seen in other media.", required: true },
  { code: "SL.3.3", text: "Ask and answer questions about what a speaker says, giving good elaboration and detail.", required: true },
  { code: "SL.3.4", text: "Report on a topic or tell a story with the right facts and details, speaking clearly at an understandable pace.", required: true },
  { code: "SL.3.5", text: "Make engaging audio recordings of stories or poems read fluently, at an understandable pace, and add visuals to show details.", required: true },
  { code: "SL.3.6", text: "Speak in complete sentences when the task and situation call for it, to give details or make things clear.", required: true },

  // Language
  { code: "L.3.1", text: "Use grammar correctly: nouns, pronouns, verbs, adjectives and adverbs; plural and abstract nouns; irregular verbs; verb tenses; subject-verb and pronoun agreement; comparatives and superlatives; coordinating and subordinating conjunctions; simple, compound and complex sentences.", required: true },
  { code: "L.3.2", text: "Use capitals, punctuation and spelling: capitalize titles, commas in addresses, commas and quotation marks in dialogue, possessives, spelling patterns and suffixes, and a dictionary to check spelling.", required: true },
  { code: "L.3.3", text: "Choose words and phrases for effect, and notice how spoken and written English differ.", required: true },
  { code: "L.3.4", text: "Figure out unknown words using context clues, prefixes and suffixes, root words, and dictionaries or glossaries.", required: true },
  { code: "L.3.5", text: "Understand nonliteral language and word relationships: literal and nonliteral meanings, real-life connections, and shades of meaning (knew, believed, suspected).", required: true },
  { code: "L.3.6", text: "Learn and use grade-level words, including words for time and place (after dinner that night, we went looking for them).", required: true },
];
