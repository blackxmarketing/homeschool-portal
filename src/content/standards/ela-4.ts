import type { Standard } from "./types";

/**
 * Standards for ela-4: Common Core English Language Arts, Grade 4.
 * RL.4.8 does not apply to literature. RL.4.10 and RI.4.10 (range of reading)
 * are a guide for the whole year, so they are not required.
 */
export const ela4Standards: Standard[] = [
  // Reading: Literature
  { code: "RL.4.1", text: "Refer to details and examples in a story when explaining what it says outright and when making inferences.", required: true },
  { code: "RL.4.2", text: "Find the theme of a story, drama or poem from its details, and summarize the text.", required: true },
  { code: "RL.4.3", text: "Describe a character, setting or event in depth, using specific details such as a character's words, thoughts and actions.", required: true },
  { code: "RL.4.4", text: "Figure out what words mean in a story, including words that come from mythology, such as Herculean.", required: true },
  { code: "RL.4.5", text: "Explain how poems (verse, rhythm, meter), plays (cast list, dialogue, stage directions) and prose are built differently.", required: true },
  { code: "RL.4.6", text: "Compare and contrast stories told in first person and third person.", required: true },
  { code: "RL.4.7", text: "Connect the words of a story or play to a picture, performance or read-aloud version of it.", required: true },
  { code: "RL.4.9", text: "Compare how stories, myths and folktales from different cultures handle similar themes, topics and patterns of events.", required: true },
  { code: "RL.4.10", text: "By the end of the year, read and understand grade 4-5 stories, plays and poems on your own.", required: false },

  // Reading: Informational Text
  { code: "RI.4.1", text: "Refer to details and examples in a nonfiction text when explaining what it says and when making inferences.", required: true },
  { code: "RI.4.2", text: "Find the main idea of a nonfiction text, explain how key details support it, and summarize the text.", required: true },
  { code: "RI.4.3", text: "Explain events, procedures, ideas or concepts in a science, history or how-to text: what happened and why.", required: true },
  { code: "RI.4.4", text: "Figure out what general academic and subject words mean in a grade 4 nonfiction text.", required: true },
  { code: "RI.4.5", text: "Describe how a nonfiction text is organized: chronology, comparison, cause and effect, or problem and solution.", required: true },
  { code: "RI.4.6", text: "Compare a firsthand and a secondhand account of the same event or topic.", required: true },
  { code: "RI.4.7", text: "Read information in charts, graphs, diagrams, timelines and pictures, and explain how it helps you understand the text.", required: true },
  { code: "RI.4.8", text: "Explain how an author uses reasons and evidence to support points in a text.", required: true },
  { code: "RI.4.9", text: "Put together information from two texts on the same topic to write or speak about it knowledgeably.", required: true },
  { code: "RI.4.10", text: "By the end of the year, read and understand grade 4-5 science, history and technical texts on your own.", required: false },

  // Reading: Foundational Skills
  { code: "RF.4.3", text: "Use letter sounds, syllable patterns and word parts (roots, prefixes, suffixes) to read long, unfamiliar words.", required: true },
  { code: "RF.4.4", text: "Read with enough accuracy and fluency to understand: read aloud smoothly with good pace and expression, and reread to fix mistakes.", required: true },

  // Writing
  { code: "W.4.1", text: "Write opinion pieces that state an opinion, give reasons backed by facts and details, use linking words, and end with a conclusion.", required: true },
  { code: "W.4.2", text: "Write informative pieces that introduce a topic, group related facts, use headings, facts, definitions and examples, and end with a conclusion.", required: true },
  { code: "W.4.3", text: "Write stories with a clear situation, a narrator or characters, dialogue and description, events in order, and a satisfying ending.", required: true },
  { code: "W.4.4", text: "Write clearly, with organization and style that fit the task, purpose and audience.", required: true },
  { code: "W.4.5", text: "With help, plan, revise and edit your writing to make it stronger.", required: true },
  { code: "W.4.6", text: "With help, use technology to type, publish and share writing, typing at least one page in a sitting.", required: true },
  { code: "W.4.7", text: "Do short research projects that build knowledge by looking into different sides of a topic.", required: true },
  { code: "W.4.8", text: "Gather information from experience, books and other sources, take notes, sort them, and list your sources.", required: true },
  { code: "W.4.9", text: "Use evidence from stories and nonfiction texts to support your analysis, reflection and research.", required: true },
  { code: "W.4.10", text: "Write often, both over several days and in a single sitting, for many purposes and audiences.", required: true },

  // Speaking and Listening
  { code: "SL.4.1", text: "Take part in discussions: come prepared, follow the rules, ask and answer questions, and build on what others say.", required: true },
  { code: "SL.4.2", text: "Paraphrase what you hear read aloud or see in pictures, videos and charts.", required: true },
  { code: "SL.4.3", text: "Identify the reasons and evidence a speaker gives to support a point.", required: true },
  { code: "SL.4.4", text: "Report on a topic or tell a story in order, with good facts and details, speaking clearly at an understandable pace.", required: true },
  { code: "SL.4.5", text: "Add audio recordings or pictures to a presentation when they help explain the main ideas.", required: true },
  { code: "SL.4.6", text: "Tell when to use formal English and when informal talk is fine, and speak in the right way for the situation.", required: true },

  // Language
  { code: "L.4.1", text: "Use correct grammar: relative pronouns and adverbs, progressive verb tenses, helping verbs like can, may and must, adjective order, prepositional phrases, complete sentences without run-ons, and commonly confused words.", required: true },
  { code: "L.4.2", text: "Use capital letters, commas and quotation marks in dialogue, a comma before a joining word in a compound sentence, and spell grade 4 words correctly.", required: true },
  { code: "L.4.3", text: "Choose precise words, use punctuation for effect, and tell when to use formal or informal English.", required: true },
  { code: "L.4.4", text: "Figure out unknown words using context clues, Greek and Latin roots and affixes, and dictionaries, glossaries and thesauruses.", required: true },
  { code: "L.4.5", text: "Understand similes, metaphors, idioms, proverbs, synonyms and antonyms.", required: true },
  { code: "L.4.6", text: "Learn and use grade 4 academic and subject words, including exact words for actions, feelings and states of being.", required: true },
];
