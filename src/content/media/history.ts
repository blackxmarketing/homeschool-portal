import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the history lessons, keyed by lesson id. */
export const historyMedia: CourseMedia = {
  "history.greece": {
    hook: {
      show: [
        { photo: "Acropolis of Athens", caption: "The Acropolis still towers over Athens, just as it did 2,400 years ago." },
        { at: "a jury of 501", big: "501", caption: "Not 12 jurors, but 501 ordinary citizens decided this case." },
        { at: "His name was Socrates", photo: "Socrates", caption: "A marble bust of Socrates, carved long after his death." },
        { at: "everyday citizens", emoji: "🧑‍🤝‍🧑🗳️", caption: "How did ordinary people get a say in their government?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👑🏰", caption: "For centuries, most people were ruled by kings or a few rich families." },
          { at: "Around 508 BC", big: "508 BC", caption: "About 2,500 years ago, Athens tried something new." },
          { at: "named Cleisthenes", photo: "Cleisthenes", caption: "A modern sculptor's idea of Cleisthenes, the father of Athenian democracy." },
          { at: "the city, the coast and the hills", emoji: "🏙️🌊⛰️", caption: "Mixing city, coast and hill folk kept any one family from taking over." },
          { at: "Demos means the people", big: "Demos + Kratos", caption: "People + Power = Democracy" },
        ],
      },
      {
        show: [
          { emoji: "🗳️✋", caption: "In a direct democracy, each citizen votes on the laws himself." },
          { at: "called the Pnyx", photo: "Pnyx", caption: "The speakers' platform on the Pnyx, where Athenians debated and voted." },
          { at: "A Council of 500", big: "500", caption: "The Council of 500 got the questions ready for the Assembly." },
          { at: "chosen by lottery", photo: "Kleroterion", caption: "A kleroterion: a stone machine Athenians used to pick names by lot." },
          { at: "Citizenship was limited", emoji: "👨🏛️", caption: "Only free adult men from Athenian families could vote." },
        ],
        watch: { youtube: "0fivQUlC7-8", title: "What did democracy really mean in Athens? - Melissa Schwartzberg", channel: "TED-Ed" },
      },
      {
        show: [
          { photo: "Ancient Agora of Athens", caption: "The agora: Athens' busy marketplace, where Socrates asked his questions." },
          { at: "Socrates, the son of a stonemason", photo: "Socrates", caption: "Socrates, the stonemason's son who became a famous thinker." },
          { at: "What is justice?", emoji: "❓🤔❓", caption: "One question led to another, and another, and another..." },
          { at: "the Socratic method", big: "The Socratic Method", caption: "Teaching by asking questions, still used in classrooms today." },
          { at: "In 399 BC", big: "399 BC", caption: "Socrates accepted the jury's verdict rather than run away." },
        ],
      },
      {
        show: [
          { photo: "Plato", caption: "Plato wrote down Socrates' conversations so we can still read them." },
          { at: "called the Academy", big: "The Academy", caption: "Plato's school in Athens. We still call schools academies today!" },
          { at: "was Aristotle", photo: "Aristotle", caption: "Aristotle studied everything from animals to poetry to government." },
          { at: "well over a hundred", big: "100+", caption: "Aristotle's team studied the governments of over 100 Greek cities." },
          { at: "America's Founders", emoji: "🇺🇸📜🗳️", caption: "For a big nation, the Founders chose to elect representatives." },
        ],
      },
    ],
  },

  "history.rome": {
    hook: {
      show: [
        { big: "49 BC", caption: "More than 2,000 years ago, a general faced a big decision." },
        { at: "Julius Caesar", photo: "Julius Caesar", caption: "Julius Caesar: a brilliant general with huge ambitions." },
        { at: "called the Rubicon", photo: "File:Fiume Rubicone con ponte consolare - Savignano sul Rubicone (FC).JPG", caption: "The Rubicon today: a small, quiet river in northern Italy." },
        { at: "no turning back", emoji: "🎲", caption: "Legend says Caesar declared, \"The die is cast!\"" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👑", caption: "Legend says Rome had seven kings before it became a republic." },
          { at: "Tarquin the Proud", photo: "Lucius Tarquinius Superbus", caption: "Tarquin the Proud, Rome's last king, as imagined by an artist in the 1500s." },
          { at: "in 509 BC", big: "509 BC", caption: "The year Romans drove out their king and started a republic." },
          { at: "res publica", big: "Res Publica", caption: "Latin for \"the public thing\": the people's business." },
          { at: "an experienced Senate", photo: "Roman Senate", caption: "A painting of the Roman Senate listening to the statesman Cicero." },
        ],
      },
      {
        show: [
          { emoji: "⚖️🏛️", caption: "Rome split power so no one person could grab it all." },
          { at: "two consuls", big: "2 Consuls", caption: "Two leaders, elected every year, so neither could rule alone." },
          { at: "I forbid", big: "VETO", caption: "\"I forbid!\" U.S. Presidents still use this Latin word today." },
          { at: "The Senate, a council", photo: "File:Curia Julia (Senate House), Roman Forum, Rome (9115853194).jpg", caption: "The Curia Julia, a Roman Senate house, still stands in Rome today." },
          { at: "Tribunes were chosen", emoji: "🛡️👥", caption: "Tribunes stood up for ordinary citizens." },
        ],
      },
      {
        show: [
          { emoji: "📜⚖️", caption: "Rule of law: the same rules apply to everyone, even leaders." },
          { at: "the Twelve Tables", big: "Twelve Tables", caption: "Rome's laws were written on tablets for all to read." },
          { at: "in the Forum", photo: "Roman Forum", caption: "The ruins of the Roman Forum, the heart of the ancient city." },
          { at: "compare Rome with Athens", emoji: "🏛️🆚🏛️", caption: "Two ancient cities, two different ways to give citizens a voice." },
          { at: "Athens was a democracy", big: "Democracy vs. Republic", caption: "Athens: citizens vote on laws. Rome: citizens elect leaders." },
        ],
      },
      {
        show: [
          { photo: "File:Lucius Quinctius Cincinnatus P4280213.JPG", caption: "A statue of Cincinnatus with his plow in Cincinnati, Ohio, a city named for him." },
          { at: "back to his plow", emoji: "🌾🐂", caption: "He gave up great power to go back to farming. Romans admired that." },
          { at: "crossed the Rubicon", big: "49 BC", caption: "Caesar crosses the Rubicon and a civil war begins." },
          { at: "Rome's first emperor", photo: "File:The so called “Augustus Bevilacqua”, bust of the emperor Augustus wearing the Corona Civica, Glyptothek, Munich (9897920023) (cropped).jpg", caption: "Augustus, Rome's first emperor, wearing a crown of oak leaves." },
          { at: "The statesman Cicero", photo: "Cicero", caption: "Cicero, a great speaker who defended the republic." },
        ],
      },
    ],
  },

  "history.declaration": {
    hook: {
      show: [
        { big: "1776", caption: "Summer in Philadelphia, and a world-changing decision." },
        { at: "signed a document", photo: "United States Declaration of Independence", caption: "The Declaration of Independence, written on parchment." },
        { at: "their Lives, their Fortunes", emoji: "❤️💰🎖️", caption: "Lives, fortunes and honor: they risked everything they had." },
        { at: "What idea", emoji: "💡", caption: "Let's find out what idea was worth such a big risk." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💷🇬🇧", caption: "A long, costly war left Britain deep in debt." },
          { at: "the Stamp Act", photo: "File:1765 Stamp Act.jpg", caption: "The first page of the Stamp Act, printed by Parliament in 1765." },
          { at: "No taxation without representation", big: "No Taxation Without Representation", caption: "The colonists' famous rallying cry." },
          { at: "the Boston Tea Party", photo: "Boston Tea Party", caption: "Colonists dumped 342 chests of British tea into Boston Harbor." },
          { at: "Lexington and Concord", photo: "The Minute Man", caption: "The Minute Man statue in Concord honors the colonists who answered the call." },
        ],
        watch: { youtube: "1cT_Z0KGhP8", title: "The story behind the Boston Tea Party - Ben Labaree", channel: "TED-Ed" },
      },
      {
        show: [
          { emoji: "🕊️🤔", caption: "Many colonists still hoped for peace with Britain." },
          { at: "Thomas Paine", photo: "Thomas Paine", caption: "Thomas Paine wrote in plain words that anyone could understand." },
          { at: "called Common Sense", photo: "Common Sense", caption: "The cover of Common Sense. Copies spread across the colonies." },
          { at: "a committee of five", photo: "Committee of Five", caption: "Adams, Sherman, Livingston, Jefferson and Franklin, in a painting by John Trumbull." },
          { at: "July 4", big: "July 4, 1776", caption: "The day Congress approved the Declaration: America's birthday." },
        ],
      },
      {
        show: [
          { emoji: "📜🧩", caption: "The Declaration is built step by step, like a careful argument." },
          { at: "called grievances", emoji: "📝😠", caption: "A long list of complaints against the British king." },
          { at: "King George III", photo: "George III", caption: "King George III ruled Britain during the American Revolution." },
          { at: "free and independent states", big: "Free & Independent", caption: "Thirteen colonies became thirteen free states." },
          { at: "signed their names", photo: "Declaration of Independence (painting)", caption: "John Trumbull's famous painting of the Declaration presented to Congress." },
        ],
      },
      {
        show: [
          { photo: "Thomas Jefferson", caption: "Thomas Jefferson was just 33 when he drafted the Declaration." },
          { at: "all men are created equal", big: "Created Equal", caption: "Some of the most famous words in American history." },
          { at: "pursuit of Happiness", emoji: "❤️🗽😊", caption: "Life, Liberty and the pursuit of Happiness." },
          { at: "John Locke", photo: "John Locke", caption: "John Locke, the English thinker who wrote about natural rights." },
          { at: "consent of the governed", big: "Consent of the Governed", caption: "A government's power comes from the people it governs." },
        ],
      },
    ],
  },

  "history.constitution": {
    hook: {
      show: [
        { photo: "Independence Hall", caption: "Independence Hall in Philadelphia, where the Constitution was written." },
        { at: "posted guards at the doors", emoji: "🤫🚪💂", caption: "Doors guarded and windows shut: the debates were top secret." },
        { at: "a brand-new plan", photo: "Constitution of the United States", caption: "The first page of the U.S. Constitution, written in 1787." },
        { at: "never strong enough", emoji: "⚖️", caption: "The challenge: strong enough to work, but not too strong." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🇺🇸😟", caption: "The new nation was wary of a strong central government." },
          { at: "the Articles of Confederation", photo: "Articles of Confederation", caption: "The Articles of Confederation, America's first plan of government." },
          { at: "no president", emoji: "🚫👔⚖️", caption: "No president and no national courts: who would enforce the laws?" },
          { at: "Shays' Rebellion", big: "1786", caption: "Shays' Rebellion showed how weak the national government was." },
          { at: "George Washington presiding", photo: "Scene at the Signing of the Constitution of the United States", caption: "Washington stands at the front of the room in this famous painting." },
        ],
        watch: { youtube: "uihNc_tdGbk", title: "The making of the American Constitution - Judy Walton", channel: "TED-Ed" },
      },
      {
        show: [
          { photo: "James Madison", caption: "James Madison, a short, quiet man with big ideas." },
          { at: "Father of the Constitution", big: "Father of the Constitution", caption: "Madison's daily notes tell us what happened in the secret debates." },
          { at: "the Preamble", emoji: "📜", caption: "The Preamble: one sentence that explains the whole purpose." },
          { at: "We the People of the United States", big: "We the People", caption: "Three famous words, written in giant letters on the Constitution." },
          { at: "six goals", big: "6 Goals", caption: "Union, justice, peace, defense, welfare and liberty." },
        ],
      },
      {
        show: [
          { emoji: "🏛️🏛️🏛️", caption: "Three branches, each with its own job." },
          { at: "The legislative branch", photo: "United States Capitol", caption: "The U.S. Capitol, where Congress meets to make laws." },
          { at: "led by the President", photo: "White House", caption: "The White House, home and office of the President." },
          { at: "headed by the Supreme Court", photo: "United States Supreme Court Building", caption: "The Supreme Court Building in Washington, D.C." },
          { at: "Montesquieu", photo: "Montesquieu", caption: "Montesquieu, the French thinker behind separation of powers." },
        ],
      },
      {
        show: [
          { big: "Checks & Balances", caption: "Each branch can check, or limit, the others." },
          { at: "sign it or veto it", emoji: "✍️🚫", caption: "The President can sign a bill into law, or say no with a veto." },
          { at: "two-thirds vote", big: "2/3", caption: "Congress can override a veto if two-thirds of both houses agree." },
          { at: "creates federalism", emoji: "🇺🇸🤝🏠", caption: "Federalism: power shared by the nation and the states." },
          { at: "no Caesar", emoji: "🛡️🏛️", caption: "The Founders learned from Rome to divide power widely." },
        ],
      },
    ],
  },

  "history.bill-of-rights": {
    hook: {
      show: [
        { emoji: "🤝📘", caption: "Imagine joining a team with a rulebook that leaves something out." },
        { at: "your home, your church or your newspaper", emoji: "🏠⛪📰", caption: "Home, faith and the news: things people wanted kept safe." },
        { at: "In 1787", big: "1787", caption: "The year the Constitution was written and sent to the states." },
        { at: "a promise was made", photo: "United States Bill of Rights", caption: "The Bill of Rights: the promise, kept in writing." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🗣️📜🗣️", caption: "A fierce debate filled newspapers and town meetings." },
          { at: "called Federalists", photo: "The Federalist Papers", caption: "The Federalist: essays by Madison, Hamilton and Jay supporting the Constitution." },
          { at: "George Mason", photo: "George Mason", caption: "George Mason of Virginia refused to sign without a bill of rights." },
          { at: "James Madison, at first", photo: "James Madison", caption: "James Madison drafted the amendments that became the Bill of Rights." },
          { at: "December 1791", big: "1791", caption: "Ten amendments were ratified and became the Bill of Rights." },
        ],
      },
      {
        show: [
          { big: "1st Amendment", caption: "Five freedoms packed into one sentence." },
          { at: "Freedom of religion", emoji: "🙏⛪", caption: "People are free to practice their faith." },
          { at: "Freedom of the press", emoji: "📰🗞️", caption: "People can print and publish news and opinions." },
          { at: "RAPPS", big: "R·A·P·P·S", caption: "Religion, Assembly, Press, Petition, Speech." },
          { at: "Congress shall make no law", photo: "Federal Hall", caption: "Federal Hall in New York stands where the First Congress met in 1789." },
        ],
      },
      {
        show: [
          { emoji: "🛡️📜", caption: "More amendments, more protections for citizens." },
          { at: "soldiers cannot be housed", emoji: "💂🏠🚫", caption: "No soldiers moving into your house in peacetime!" },
          { at: "unreasonable searches and seizures", emoji: "🔍🏠", caption: "Officials generally need a good reason and a warrant to search." },
          { at: "trial by jury", photo: "Jury", caption: "A jury: ordinary citizens who decide the facts of a case." },
          { at: "play fair", emoji: "⚖️", caption: "These rights make sure government plays fair." },
        ],
      },
      {
        show: [
          { photo: "James Madison", caption: "Madison worried a list might seem to cover every right." },
          { at: "the Ninth Amendment", big: "9th", caption: "You keep rights even if they aren't written in the list." },
          { at: "The Tenth Amendment", big: "10th", caption: "Powers not given to the nation belong to the states or the people." },
          { at: "echo the Declaration", photo: "United States Declaration of Independence", caption: "The Declaration's big idea again: rights come first." },
          { at: "both sides", emoji: "🤝", caption: "Both sides of the debate got something they wanted." },
        ],
        watch: { youtube: "yYEfLm5dLMQ", title: "A 3-minute guide to the Bill of Rights - Belinda Stutzman", channel: "TED-Ed" },
      },
    ],
  },

  "history.inventors": {
    hook: {
      show: [
        { big: "Dec. 17, 1903", caption: "A cold, windy morning on a North Carolina beach." },
        { at: "Orville Wright lay flat", photo: "File:First flight2.jpg", caption: "The real photo of the first flight: Orville flying, Wilbur running." },
        { at: "Twelve seconds later", big: "12 seconds", caption: "A short hop that changed the world forever." },
        { at: "What does it take", emoji: "💡🔧✈️", caption: "Let's meet some inventors who did what no one had done." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "✍️📖", caption: "Copying one Bible by hand could take a scribe many months." },
          { at: "Johannes Gutenberg", photo: "Johannes Gutenberg", caption: "Gutenberg's statue in Mainz. No portrait made in his lifetime survives." },
          { at: "called movable type", photo: "Movable type", caption: "Metal letters arranged in a tray, ready to be inked and printed." },
          { at: "a famous Bible", photo: "Gutenberg Bible", caption: "A Gutenberg Bible. Only about 49 copies still survive today." },
          { at: "print shops spread", emoji: "📚🌍", caption: "Books and ideas spread faster than ever before." },
        ],
      },
      {
        show: [
          { big: "1765", caption: "A broken model engine gave a young Scot a big idea." },
          { at: "James Watt", photo: "James Watt", caption: "James Watt, the instrument maker who improved the steam engine." },
          { at: "a separate condenser", photo: "Watt steam engine", caption: "A Watt steam engine, with its separate condenser to save fuel." },
          { at: "drive trains and ships", photo: "Stephenson's Rocket", caption: "A drawing of Stephenson's Rocket, an early steam train from 1829." },
          { at: "Industrial Revolution", big: "Industrial Revolution", caption: "From hand tools to machines: a whole new way of working." },
        ],
      },
      {
        show: [
          { photo: "Thomas Edison", caption: "Thomas Edison, who held more than 1,000 patents." },
          { at: "Menlo Park, New Jersey", photo: "File:Menlo Park Laboratory.JPG", caption: "Edison's Menlo Park lab, rebuilt in a museum in Michigan." },
          { at: "thousands of materials", big: "Thousands of Tries", caption: "Metals, threads, even bamboo: they tested them all." },
          { at: "a carbon filament worked", photo: "File:Edison Carbon Bulb.jpg", caption: "One of Edison's early bulbs with its thin, curved carbon filament." },
          { at: "Pearl Street Station", big: "1882", caption: "Pearl Street Station lit up part of New York City." },
        ],
      },
      {
        show: [
          { photo: "File:WrightBrothers.jpg", caption: "Wilbur (left) and Orville Wright, the brothers from Dayton, Ohio." },
          { at: "a bicycle shop", emoji: "🚲🔧", caption: "Fixing and selling bicycles paid for their flying experiments." },
          { at: "how birds twist their wings", emoji: "🦅🌬️", caption: "Birds twist their wingtips to stay balanced in the wind." },
          { at: "about 200 wing designs", big: "200", caption: "They tested about 200 wing shapes in their homemade wind tunnel." },
          { at: "Orville flew for 12 seconds", photo: "File:Wright Flyer, National Air and Space Museum, Washington DC - USA, August 1990. (5619571917).jpg", caption: "The 1903 Wright Flyer, now in the Smithsonian in Washington, D.C." },
        ],
        watch: { youtube: "8HJEZK5mM0Q", title: "The Story a Photo Tells - Wright Brothers' First Flight", channel: "Smithsonian National Air and Space Museum" },
      },
    ],
  },
};
