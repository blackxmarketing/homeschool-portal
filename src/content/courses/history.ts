import type { Course } from "./types";

export const history: Course = {
  id: "history",
  title: "History & Civics",
  icon: "🏛️",
  hue: 35,
  track: "academic",
  subject: "History",
  blurb:
    "Meet the people who built free government and changed the world, from Athens and Rome to the American Founders and great inventors.",
  teacher: {
    name: "Professor Plutarch",
    avatar: "📜",
    inspiredBy: "Plutarch, the ancient biographer of great Greeks and Romans",
    voice:
      "Storyteller who brings people from history to life and asks what we can learn from their choices.",
  },
  lessons: [
    {
      id: "history.greece",
      title: "Ancient Greece: Democracy and Philosophy",
      minutes: 30,
      stage: "grammar",
      subject: "History",
      read: `About 2,500 years ago, the city of Athens tried something bold. Instead of being ruled by a king or a small group of nobles, its citizens would govern themselves. Around 508 BC, a leader named Cleisthenes reorganized the city so that ordinary citizens, not just wealthy families, could take part. The Greeks called this demokratia, which means "rule by the people."

Athenian democracy was direct. Citizens did not elect representatives to vote for them. Instead, they gathered on a rocky hillside called the Pnyx for the Assembly, where thousands of men listened to speeches and voted on laws, taxes, and even whether to go to war. A Council of 500, chosen by lottery, prepared the questions for the Assembly. Many officials were also picked by lottery, because the Athenians believed any citizen should be able to serve. Citizenship was limited to free adult men born to Athenian families, so only part of the population could vote, but the idea that citizens could rule themselves was new and powerful.

Athens also became a home for great thinkers. Socrates walked the marketplace asking people questions like "What is justice?" and "What is courage?" He showed that many people did not truly understand the things they claimed to know. In 399 BC, a jury condemned him to death for questioning the city's beliefs. He chose to accept the verdict rather than flee.

His student Plato wrote down many of Socrates' conversations and founded a school called the Academy. Plato's student Aristotle studied nearly everything: logic, science, ethics, and government. He compared the constitutions of many Greek cities and asked which kinds of government work best. Later thinkers, including America's Founders, would read these Greek writers when planning their own governments.`,
      keyIdeas: [
        "Athens practiced direct democracy: citizens voted on laws themselves in the Assembly.",
        "Socrates taught by asking questions; Plato and Aristotle built on his search for truth.",
        "Greek ideas about citizenship and government influenced later nations, including the United States.",
      ],
      check: [
        {
          q: "What does the Greek word demokratia mean?",
          choices: ["Rule by the wise", "Rule by the people", "Rule by one king", "Rule by soldiers"],
          answer: 1,
          why: "Demos means people and kratos means power or rule.",
        },
        {
          q: "In Athens' direct democracy, who voted on laws?",
          choices: [
            "Elected representatives",
            "A king and his advisors",
            "Citizens themselves in the Assembly",
            "Priests at the temple",
          ],
          answer: 2,
          why: "Athenian citizens gathered in the Assembly and voted on laws directly.",
        },
        {
          q: "How were members of the Council of 500 chosen?",
          choices: ["By lottery", "By wealth", "By birth into noble families", "By the army"],
          answer: 0,
          why: "Athens used a lottery so that any citizen could have a chance to serve.",
        },
        {
          q: "How did Socrates usually teach?",
          choices: [
            "By writing long books",
            "By giving orders",
            "By telling myths",
            "By asking probing questions",
          ],
          answer: 3,
          why: "Socrates questioned people to help them examine what they really knew.",
        },
        {
          q: "Which thinker was Plato's student and compared the governments of many Greek cities?",
          choices: ["Pericles", "Aristotle", "Cleisthenes"],
          answer: 1,
          why: "Aristotle studied under Plato and wrote about which forms of government work best.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Hold a Socratic dialogue with a parent or sibling. Pick one question, such as \"What makes a good citizen?\" Take turns asking follow-up questions for at least five minutes, then share what you discovered.",
        rubric: [
          "Chooses a clear, open-ended question about a big idea.",
          "Asks at least three thoughtful follow-up questions.",
          "Listens carefully and responds to the other person's answers.",
          "Summarizes one new insight at the end.",
        ],
      },
    },
    {
      id: "history.rome",
      title: "The Roman Republic",
      minutes: 30,
      stage: "logic",
      subject: "History",
      read: `In 509 BC, the people of Rome drove out their last king, Tarquin the Proud. Determined never to be ruled by one man again, they created a republic, a government in which leaders are chosen and power is shared and limited.

Instead of a king, Rome elected two consuls each year. Each consul could block the other by saying "Veto," which is Latin for "I forbid." Because they served only one year and had to share power, no single consul could become a tyrant. The Senate, a council of experienced leaders, advised the consuls and controlled much of Rome's money and foreign policy. Officials called tribunes were chosen to protect ordinary citizens, and they too could veto actions they thought were unjust.

Romans also believed in the rule of law. Around 450 BC, they carved their laws onto the Twelve Tables and displayed them in the Forum so everyone could know the rules. A law that applies to everyone, written where all can see it, protects people from leaders who make up rules as they go.

Romans admired leaders who gave power back. The story of Cincinnatus tells of a farmer who was named dictator during an emergency, defeated Rome's enemies, and then returned to his plow within weeks.

Over time, however, the republic weakened. Rome grew rich and powerful, and ambitious generals built armies loyal to themselves rather than to the republic. In 49 BC, Julius Caesar led his army across the Rubicon River toward Rome, starting a civil war. He was later named dictator for life, and in 44 BC a group of senators assassinated him. More war followed, and in 27 BC Caesar's heir Octavian took the title Augustus, becoming Rome's first emperor. The statesman Cicero had warned that a republic survives only when citizens and leaders respect its laws.`,
      keyIdeas: [
        "The Roman Republic divided power among two consuls, the Senate, and tribunes, with vetoes as checks.",
        "Written laws like the Twelve Tables meant the same rules applied to everyone.",
        "The republic fell when ambitious generals put personal power above the law, leading to emperors.",
      ],
      check: [
        {
          q: "Why did Rome elect two consuls instead of one?",
          choices: [
            "So one could handle war and one could handle farming",
            "So each could check the other and neither could become a tyrant",
            "Because the Senate could not agree on one",
            "Because the Greeks required it",
          ],
          answer: 1,
          why: "Sharing power and allowing each consul to veto the other prevented one-man rule.",
        },
        {
          q: "What does the Latin word veto mean?",
          choices: ["I agree", "I command", "I forbid"],
          answer: 2,
          why: "Veto means \"I forbid,\" the word used to block an action.",
        },
        {
          q: "Why were the Twelve Tables important?",
          choices: [
            "They made the laws public so everyone knew the rules",
            "They listed Rome's gods",
            "They recorded the names of the kings",
            "They described Roman recipes",
          ],
          answer: 0,
          why: "Posting the laws publicly supported the rule of law for all citizens.",
        },
        {
          q: "What lesson does the story of Cincinnatus teach?",
          choices: [
            "Farmers should not serve in government",
            "Dictators should rule for life",
            "Wars should last as long as possible",
            "A good leader gives up power when the job is done",
          ],
          answer: 3,
          why: "Cincinnatus returned to his farm after saving Rome instead of keeping power.",
        },
        {
          q: "Which event marked the start of Rome's emperors?",
          choices: [
            "The writing of the Twelve Tables",
            "Octavian taking the title Augustus in 27 BC",
            "The expulsion of Tarquin the Proud",
            "The election of the first tribunes",
          ],
          answer: 1,
          why: "Octavian became Augustus, Rome's first emperor, ending the republic.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "In one or two paragraphs, explain two causes of the fall of the Roman Republic. What could Romans have done differently to protect it?",
        rubric: [
          "Identifies at least two accurate causes, such as loyal private armies or ignoring the law.",
          "Uses at least one specific person or event from the lesson.",
          "Suggests a reasonable way the republic could have been protected.",
          "Writes in clear, complete sentences.",
        ],
      },
    },
    {
      id: "history.declaration",
      title: "The Declaration of Independence",
      minutes: 30,
      stage: "logic",
      subject: "Civics",
      read: `In the 1760s and 1770s, the American colonies grew angry with the British government. Parliament passed taxes such as the Stamp Act of 1765 and later the tax on tea, even though the colonists had no representatives in Parliament. "No taxation without representation" became a rallying cry. Britain also kept soldiers in the colonies, closed Boston's harbor after the Boston Tea Party, and limited colonial self-government. By 1775, fighting had broken out at Lexington and Concord.

Many colonists still hoped to make peace. But in 1776, a pamphlet called Common Sense by Thomas Paine argued plainly that the colonies should be independent. In June, the Second Continental Congress chose a committee of five to write a statement explaining why: John Adams, Benjamin Franklin, Roger Sherman, Robert Livingston, and a 33-year-old Virginian named Thomas Jefferson. The committee asked Jefferson to write the first draft. Adams and Franklin suggested edits, and Congress changed it further. Congress voted for independence on July 2 and approved the final Declaration on July 4, 1776.

The heart of the Declaration is its second paragraph: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness." Jefferson drew on thinkers like John Locke, who taught that people have natural rights simply because they are human. These rights are not gifts from a king, so no king can rightly take them away.

The Declaration continues that governments are created to secure these rights and draw their power from "the consent of the governed." When a government destroys those rights, the people may change it. The rest of the document lists the colonists' complaints against King George III. By signing, the delegates risked their lives, pledging their "Fortunes" and "sacred Honor" to the cause.`,
      keyIdeas: [
        "The colonists objected to taxes and laws imposed without their consent.",
        "Thomas Jefferson drafted the Declaration, working with a committee of five, and Congress approved it on July 4, 1776.",
        "The Declaration teaches that people have natural rights and that government gets its power from the consent of the governed.",
      ],
      check: [
        {
          q: "What did \"No taxation without representation\" mean?",
          choices: [
            "Colonists should never pay any taxes",
            "Colonists should not be taxed by a Parliament where they had no representatives",
            "Only kings could collect taxes",
            "Taxes should only be paid in tea",
          ],
          answer: 1,
          why: "Colonists objected to being taxed by a body in which they had no voice.",
        },
        {
          q: "Who wrote the first draft of the Declaration of Independence?",
          choices: ["Benjamin Franklin", "John Adams", "George Washington", "Thomas Jefferson"],
          answer: 3,
          why: "The committee of five chose Jefferson to write the first draft.",
        },
        {
          q: "According to the Declaration, where do natural rights come from?",
          choices: [
            "They are given by the king",
            "They are granted by Parliament",
            "People are endowed with them by their Creator",
            "They are earned by paying taxes",
          ],
          answer: 2,
          why: "The Declaration says people are endowed by their Creator with unalienable rights.",
        },
        {
          q: "Which three rights does the Declaration name as examples?",
          choices: [
            "Life, Liberty and the pursuit of Happiness",
            "Speech, Press and Religion",
            "Land, Money and Votes",
          ],
          answer: 0,
          why: "The famous line lists Life, Liberty and the pursuit of Happiness.",
        },
        {
          q: "According to the Declaration, where does a government get its just power?",
          choices: [
            "From its army",
            "From the consent of the governed",
            "From the oldest families",
            "From foreign allies",
          ],
          answer: 1,
          why: "The Declaration says governments derive their just powers from the consent of the governed.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Explain the main idea of the Declaration of Independence in your own words. What are natural rights, and what is government supposed to do about them?",
        rubric: [
          "States the main idea accurately: people have natural rights, and government exists to protect them.",
          "Explains natural rights in the student's own words rather than copying the text.",
          "Mentions the consent of the governed or the right to change a government that destroys rights.",
          "Writes at least one clear, well-organized paragraph.",
        ],
      },
    },
    {
      id: "history.constitution",
      title: "The U.S. Constitution",
      minutes: 35,
      stage: "logic",
      subject: "U.S. Constitution",
      read: `After winning independence, the new United States first operated under the Articles of Confederation. That government was weak: it could not collect taxes or easily solve disputes between states. In the summer of 1787, delegates met in Philadelphia to fix the problem. George Washington presided, and James Madison of Virginia came with careful plans and took detailed notes. Madison is often called the "Father of the Constitution."

The Constitution opens with the Preamble, which explains its purpose: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America." Notice that it begins with "We the People," not with a king.

The Constitution divides the national government into three branches. The legislative branch, Congress, makes the laws. The executive branch, led by the President, carries out the laws. The judicial branch, headed by the Supreme Court, decides cases about what the laws mean. This is called separation of powers, an idea the French writer Montesquieu had explained.

Each branch can also check the others. The President can veto a bill, but Congress can override the veto with a two-thirds vote. The Senate must approve treaties and many appointments. Judges serve on good behavior, but they are nominated by the President and confirmed by the Senate. These checks and balances keep any branch from growing too strong.

The Constitution also creates federalism, sharing power between the national government and the states. The Founders had studied history closely. They admired Athens' citizen self-government and Rome's republic, its Senate, and its vetoes, but they also remembered how Rome fell to one-man rule. They designed a representative republic with power divided so that no Caesar could take it all.`,
      keyIdeas: [
        "The Constitution divides power among three branches: legislative, executive, and judicial.",
        "Checks and balances let each branch limit the others, and federalism shares power with the states.",
        "The Founders borrowed ideas from Greece and Rome and learned from Rome's fall to emperors.",
      ],
      check: [
        {
          q: "Who is often called the \"Father of the Constitution\"?",
          choices: ["Thomas Jefferson", "James Madison", "John Hancock", "Patrick Henry"],
          answer: 1,
          why: "Madison planned much of the Constitution and kept notes at the convention.",
        },
        {
          q: "Which branch of government makes the laws?",
          choices: ["The legislative branch", "The executive branch", "The judicial branch"],
          answer: 0,
          why: "Congress, the legislative branch, writes and passes laws.",
        },
        {
          q: "Which is an example of checks and balances?",
          choices: [
            "States printing their own money",
            "The President serving as a judge",
            "Congress overriding a presidential veto with a two-thirds vote",
            "The Supreme Court writing new taxes",
          ],
          answer: 2,
          why: "A veto override lets Congress check the President's veto power.",
        },
        {
          q: "What is federalism?",
          choices: [
            "Rule by a single national leader",
            "Having only one branch of government",
            "Electing judges every year",
            "Sharing power between the national government and the states",
          ],
          answer: 3,
          why: "Federalism divides power between the national and state governments.",
        },
        {
          q: "What lesson did the Founders take from the fall of the Roman Republic?",
          choices: [
            "Power should be divided so no one person can seize it all",
            "Republics never work",
            "A country needs an emperor during peace",
            "Senates should be abolished",
          ],
          answer: 0,
          why: "Rome's slide to emperors showed the Founders why power must be divided and checked.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Draw a diagram of the three branches of government. Label what each branch does, and draw arrows showing at least three ways the branches check one another.",
        rubric: [
          "Correctly names and labels all three branches and their main jobs.",
          "Shows at least three accurate checks between branches.",
          "Includes the opening words of the Preamble or a short explanation of its purpose.",
          "Is neat, clearly organized, and easy to read.",
        ],
      },
    },
    {
      id: "history.bill-of-rights",
      title: "The Bill of Rights",
      minutes: 30,
      stage: "rhetoric",
      subject: "U.S. Constitution",
      read: `When the Constitution was sent to the states in 1787, many Americans worried. Leaders like George Mason of Virginia pointed out that it did not list the rights of the people. These critics, called Anti-Federalists, feared that a strong national government might someday trample freedoms Americans had just fought for. Several states agreed to ratify the Constitution only after being promised that a list of rights would be added.

James Madison kept that promise. As a member of the first Congress in 1789, he drafted a set of amendments. The states ratified ten of them, and they became part of the Constitution in December 1791. We call these first ten amendments the Bill of Rights.

The First Amendment protects five freedoms. Freedom of religion means the government cannot establish an official church and cannot stop people from practicing their faith. Freedom of speech lets people express their ideas. Freedom of the press lets people print and publish news and opinions. Freedom of assembly lets people gather peacefully. Freedom to petition lets people ask the government to correct wrongs. Together, these freedoms let citizens think, worship, speak, and take part in self-government.

The other nine amendments protect more rights. The Second protects the right to keep and bear arms. The Third says soldiers cannot be housed in private homes in peacetime without the owner's consent. The Fourth guards against unreasonable searches and seizures. The Fifth, Sixth, Seventh, and Eighth protect people accused of crimes or involved in lawsuits, guaranteeing things like due process, a speedy and public trial, trial by jury, and protection from cruel and unusual punishment. The Ninth says people have rights even if they are not listed, and the Tenth says powers not given to the national government belong to the states or the people.

The Bill of Rights reminds us that government exists to protect liberty, not to grant it.`,
      keyIdeas: [
        "The Bill of Rights, the first ten amendments, was ratified in 1791 after Anti-Federalists demanded protection for liberty.",
        "The First Amendment protects five freedoms: religion, speech, press, assembly, and petition.",
        "The other amendments protect property, fair trials, and powers reserved to the states and the people.",
      ],
      check: [
        {
          q: "Why did many Anti-Federalists object to the original Constitution?",
          choices: [
            "It had no President",
            "It did not list the rights of the people",
            "It gave too much power to the states",
            "It was written in Latin",
          ],
          answer: 1,
          why: "Critics like George Mason wanted written protection for individual rights.",
        },
        {
          q: "Who drafted the amendments that became the Bill of Rights?",
          choices: ["George Washington", "Benjamin Franklin", "James Madison"],
          answer: 2,
          why: "Madison drafted the amendments in the first Congress in 1789.",
        },
        {
          q: "Which is NOT one of the five freedoms in the First Amendment?",
          choices: [
            "Freedom of the press",
            "Freedom of assembly",
            "Freedom to petition",
            "Freedom from paying taxes",
          ],
          answer: 3,
          why: "The five are religion, speech, press, assembly, and petition; taxes are not mentioned.",
        },
        {
          q: "Which amendment protects against unreasonable searches and seizures?",
          choices: ["The Fourth Amendment", "The Second Amendment", "The Third Amendment", "The Tenth Amendment"],
          answer: 0,
          why: "The Fourth Amendment guards people, homes, and belongings from unreasonable searches.",
        },
        {
          q: "What does the Tenth Amendment say?",
          choices: [
            "Soldiers may live in any home",
            "Powers not given to the national government belong to the states or the people",
            "Everyone has the right to a jury in every case",
            "Congress may make any law it wants",
          ],
          answer: 1,
          why: "The Tenth Amendment reserves undelegated powers to the states or the people.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Which right in the Bill of Rights matters most to you, and why? Write a persuasive paragraph or two that names the right, explains what it protects, and gives reasons for your choice.",
        rubric: [
          "Names a specific right and correctly identifies which amendment it comes from.",
          "Accurately explains what the right protects.",
          "Gives at least two clear reasons, with an example of why the right matters.",
          "Uses a strong opening and a concluding sentence.",
        ],
      },
    },
    {
      id: "history.inventors",
      title: "Inventors Who Changed the World",
      minutes: 35,
      stage: "rhetoric",
      subject: "History",
      read: `For most of history, books were copied by hand, travel moved at the speed of a horse, and night was lit by candles. A few determined inventors changed that, and their choices still shape your life today.

Around 1440, a German goldsmith named Johannes Gutenberg began experimenting in the city of Mainz. He created metal letters that could be arranged, inked, and pressed onto paper again and again. By about 1455, his press had printed a famous Bible. Books became faster and cheaper to make, so ideas, news, and learning spread across Europe as never before.

In 1765, a Scottish instrument maker named James Watt was repairing a model of an older steam engine. He noticed it wasted huge amounts of heat. His solution, a separate condenser, made steam engines far more efficient. Watt's engines soon powered factories, mines, and later trains and ships. This helped launch the Industrial Revolution, when work shifted from hand tools to machines.

Thomas Edison was famous for persistence. At his laboratory in Menlo Park, New Jersey, his team tested thousands of materials before producing a practical, long-lasting light bulb in 1879. Edison then built systems to deliver electricity, opening a power station in New York City in 1882.

Orville and Wilbur Wright ran a bicycle shop in Dayton, Ohio. They studied birds, built a wind tunnel, and carefully tested wing shapes. On December 17, 1903, at Kitty Hawk, North Carolina, Orville flew their powered airplane for 12 seconds. Within decades, airplanes carried people around the globe.

These inventions, and many others like them, made goods cheaper and work more productive. Over time, families gained more food, better homes, longer lives, and more time to learn. Each invention began with a person who noticed a problem, kept experimenting after failures, and refused to quit.`,
      keyIdeas: [
        "Gutenberg's printing press spread knowledge quickly and cheaply.",
        "Watt's steam engine and Edison's electric light powered the Industrial Revolution and modern life.",
        "Innovation through persistence and experimentation raised living standards for millions of people.",
      ],
      check: [
        {
          q: "What made Gutenberg's printing press so important?",
          choices: [
            "It made books faster and cheaper to produce, spreading ideas widely",
            "It was the first way to make paper",
            "It allowed people to send messages by wire",
            "It replaced the need for reading",
          ],
          answer: 0,
          why: "Movable metal type allowed books to be printed quickly and cheaply.",
        },
        {
          q: "What improvement did James Watt make to the steam engine?",
          choices: [
            "He added wings",
            "He powered it with electricity",
            "He added a separate condenser that saved heat and fuel",
            "He made it run on wind",
          ],
          answer: 2,
          why: "Watt's separate condenser made steam engines much more efficient.",
        },
        {
          q: "What was the Industrial Revolution?",
          choices: [
            "A war between factory owners",
            "A shift from hand tools to machines and factories",
            "The invention of farming",
            "A revolt against kings",
          ],
          answer: 1,
          why: "During the Industrial Revolution, machines powered by engines transformed how goods were made.",
        },
        {
          q: "Where did the Wright brothers make their first powered flight in 1903?",
          choices: ["Menlo Park, New Jersey", "Mainz, Germany", "Dayton, Ohio", "Kitty Hawk, North Carolina"],
          answer: 3,
          why: "The Wrights built their plane in Dayton but flew it at Kitty Hawk.",
        },
        {
          q: "What trait did Edison and the Wright brothers share?",
          choices: [
            "They inherited great fortunes",
            "They persisted through many experiments and failures",
            "They worked for the government",
          ],
          answer: 1,
          why: "Both tested ideas again and again until they succeeded.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Build a timeline poster of inventions that changed the world. Include Gutenberg, Watt, Edison, the Wright brothers, and at least two more inventors you research. For each, add a date, a picture, and one sentence on how it changed daily life.",
        rubric: [
          "Includes at least six inventions placed in correct date order.",
          "Each entry has an accurate date, the inventor's name, and an illustration.",
          "Each entry explains in one sentence how the invention improved people's lives.",
          "The poster is neat, colorful, and easy to follow.",
        ],
      },
    },
  ],
};
