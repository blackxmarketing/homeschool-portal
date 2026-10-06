import type { Standard } from "./types";

/**
 * Standards for ela-5: Common Core English Language Arts, Grade 5.
 * Reading Literature (RL), Reading Informational Text (RI), Foundational
 * Skills (RF), Writing (W), Speaking and Listening (SL) and Language (L).
 * Sub-skills (a, b, c...) are named in the text. The "range of reading"
 * standards (RL.5.10, RI.5.10) are a guide, not a single skill to teach.
 * (There is no RL.5.8 in the Common Core.)
 */
export const ela5Standards: Standard[] = [
  // Reading: Literature
  { code: "RL.5.1", text: "Quote accurately from a story or poem when explaining what it says and when drawing inferences.", required: true },
  { code: "RL.5.2", text: "Find the theme of a story, play or poem from details, including how characters respond to challenges or how a poem's speaker reflects on a topic, and summarize the text.", required: true },
  { code: "RL.5.3", text: "Compare and contrast two or more characters, settings or events in a story or play, using specific details.", required: true },
  { code: "RL.5.4", text: "Figure out what words and phrases mean in a story or poem, including figurative language such as metaphors and similes.", required: true },
  { code: "RL.5.5", text: "Explain how a series of chapters, scenes or stanzas fits together to give the overall structure of a story, play or poem.", required: true },
  { code: "RL.5.6", text: "Describe how a narrator's or speaker's point of view shapes how events are described.", required: true },
  { code: "RL.5.7", text: "Analyze how pictures, sound and other visual or multimedia elements add to the meaning, tone or beauty of a text.", required: true },
  { code: "RL.5.9", text: "Compare and contrast stories in the same genre, such as fables or adventure stories, on how they handle similar themes and topics.", required: true },
  { code: "RL.5.10", text: "Read and understand stories, plays and poems at the grade 4-5 level and above, on your own by the end of the year.", required: false },

  // Reading: Informational Text
  { code: "RI.5.1", text: "Quote accurately from a nonfiction text when explaining what it says and when drawing inferences.", required: true },
  { code: "RI.5.2", text: "Find two or more main ideas of a nonfiction text, explain how key details support them, and summarize the text.", required: true },
  { code: "RI.5.3", text: "Explain the relationships between two or more people, events, ideas or concepts in a history, science or technical text.", required: true },
  { code: "RI.5.4", text: "Figure out the meaning of general academic and subject-specific words and phrases in a grade 5 nonfiction text.", required: true },
  { code: "RI.5.5", text: "Compare and contrast the overall structure (time order, comparison, cause and effect, problem and solution) of events, ideas or information in two or more texts.", required: true },
  { code: "RI.5.6", text: "Analyze several accounts of the same event or topic, noting important similarities and differences in the point of view they represent.", required: true },
  { code: "RI.5.7", text: "Draw on information from several print or digital sources to find an answer to a question or solve a problem quickly.", required: true },
  { code: "RI.5.8", text: "Explain how an author uses reasons and evidence to support particular points, and which reasons and evidence support which points.", required: true },
  { code: "RI.5.9", text: "Combine information from several texts on the same topic to write or speak knowledgeably about it.", required: true },
  { code: "RI.5.10", text: "Read and understand nonfiction, including history, science and technical texts, at the grade 4-5 level and above, on your own by the end of the year.", required: false },

  // Reading: Foundational Skills
  { code: "RF.5.3", text: "Use phonics and word analysis skills (letter-sound patterns, syllables, prefixes, suffixes and roots) to read unfamiliar long words accurately.", required: true },
  { code: "RF.5.4", text: "Read grade-level text with accuracy and fluency: read with purpose and understanding, read aloud with good pace and expression, and use context to correct mistakes, rereading when needed.", required: true },

  // Writing
  { code: "W.5.1", text: "Write opinion pieces that state an opinion, give logically ordered reasons backed by facts and details, link them with words like consequently and specifically, and end with a conclusion.", required: true },
  { code: "W.5.2", text: "Write informative texts that introduce a topic, group related information, develop it with facts, definitions, details and quotations, link ideas with transitions, use precise words, and end with a conclusion.", required: true },
  { code: "W.5.3", text: "Write stories about real or imagined experiences with a clear situation, narrator and characters, using dialogue, description and pacing, transition words for order, sensory details, and a conclusion.", required: true },
  { code: "W.5.4", text: "Write clearly, with development and organization that fit the task, purpose and audience.", required: true },
  { code: "W.5.5", text: "With help from adults and peers, strengthen writing by planning, revising, editing, rewriting or trying a new approach.", required: true },
  { code: "W.5.6", text: "With some help, use technology and the internet to write and publish work and work with others, and type at least two pages in one sitting.", required: true },
  { code: "W.5.7", text: "Do short research projects that use several sources to build knowledge by looking into different sides of a topic.", required: true },
  { code: "W.5.8", text: "Recall information or gather it from print and digital sources, summarize or paraphrase it in notes and finished work, and list the sources.", required: true },
  { code: "W.5.9", text: "Draw evidence from stories and nonfiction to support analysis, reflection and research.", required: true },
  { code: "W.5.10", text: "Write routinely, both over longer time frames with research and revision and in single sittings, for many tasks, purposes and audiences.", required: true },

  // Speaking and Listening
  { code: "SL.5.1", text: "Take part in discussions: come prepared, follow agreed rules and roles, ask and answer questions, build on others' remarks, and review the key ideas.", required: true },
  { code: "SL.5.2", text: "Summarize a written text read aloud or information presented in pictures, numbers, video or speech.", required: true },
  { code: "SL.5.3", text: "Summarize the points a speaker makes and explain how each claim is supported by reasons and evidence.", required: true },
  { code: "SL.5.4", text: "Report on a topic or text or present an opinion in a logical order, with good facts and details, speaking clearly at an understandable pace.", required: true },
  { code: "SL.5.5", text: "Include multimedia, such as pictures, sound and visual displays, in presentations when it helps develop the main ideas or themes.", required: true },
  { code: "SL.5.6", text: "Adapt speech to different situations and tasks, using formal English when it fits.", required: true },

  // Language
  { code: "L.5.1", text: "Use correct grammar: conjunctions, prepositions and interjections; perfect verb tenses (had, have, will have walked); verb tenses for different times; fixing wrong tense shifts; and correlative conjunctions such as either/or and neither/nor.", required: true },
  { code: "L.5.2", text: "Use capitals, punctuation and spelling correctly: commas in a series, after an introductory part, with yes and no, tag questions and direct address; underline, quotation marks or italics for titles; and spell grade-level words correctly.", required: true },
  { code: "L.5.3", text: "Use what you know about language: expand, combine and shorten sentences for meaning, interest and style, and compare the varieties of English (dialects, registers) used in stories, dramas and poems.", required: true },
  { code: "L.5.4", text: "Figure out unknown words using context clues, Greek and Latin prefixes, suffixes and roots, and reference books such as dictionaries, glossaries and thesauruses.", required: true },
  { code: "L.5.5", text: "Understand figurative language and word relationships: similes and metaphors, idioms, adages and proverbs, and synonyms, antonyms and homographs.", required: true },
  { code: "L.5.6", text: "Learn and use grade-level academic and subject words, including words that show contrast, addition and other logical links (however, although, nevertheless, similarly, moreover, in addition).", required: true },
];
