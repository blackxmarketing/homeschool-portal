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
      hook: {
        text: "In 399 BC, a jury of 501 ordinary Athenians voted on the fate of a 70-year-old man whose crime was asking too many questions. His name was Socrates. How did everyday citizens come to hold that much power?",
      },
      teach: [
        {
          title: "Athens Tries Something Bold",
          teach:
            "For centuries, most people in the ancient world were ruled by kings or by a few powerful families. Around 508 BC, an Athenian leader named Cleisthenes changed that. He reorganized the citizens into new groups that mixed people from the city, the coast and the hills, so that no single family could control the government. Ordinary citizens, not just wealthy nobles, could now take part in running their city. The Athenians called this demokratia. Demos means the people, and kratos means power or rule. Put them together and you get rule by the people. It was one of the boldest experiments in history, and we still use the word today.",
          visual: {
            type: "timeline",
            events: [
              { year: -508, label: "508 BC: Cleisthenes' reforms", detail: "Cleisthenes reorganizes Athens so that ordinary citizens can share in governing the city." },
              { year: -461, label: "461 BC: The age of Pericles", detail: "The statesman Pericles rises to lead Athens during a golden age of building, art and democracy." },
              { year: -399, label: "399 BC: Trial of Socrates", detail: "A jury of 501 citizens condemns Socrates to death. He accepts the verdict instead of fleeing." },
              { year: -387, label: "About 387 BC: Plato's Academy", detail: "Plato founds the Academy, a school near Athens that lasted for centuries." },
              { year: -335, label: "335 BC: Aristotle's Lyceum", detail: "Aristotle opens his own school, the Lyceum, and studies everything from animals to governments." },
            ],
          },
          think: {
            q: "What does the Greek word demokratia mean?",
            choices: ["Rule by the wise", "Rule by one strong leader", "Rule by the people", "Rule by the wealthy"],
            answer: 2,
            why: "Demos means the people and kratos means rule, so demokratia means rule by the people.",
            hints: [
              "That sounds like something a philosopher might want, but demos means people, not wise ones. Break the word into its two parts.",
              "Rule by one person is a monarchy or tyranny, which is what Athens was moving away from. Look at the meaning of demos.",
              "",
              "Rule by a wealthy few is called oligarchy. Cleisthenes actually mixed citizens together so the wealthy could not control everything.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a classroom where, instead of the teacher choosing every rule, the whole class votes on them. That is the heart of demokratia: the people themselves hold the power to decide.",
            example:
              "Before Cleisthenes, a few noble families competed to control Athens. After his reforms in 508 BC, citizens from the coast, the hills and the city were placed in the same groups. A farmer and a merchant now stood side by side, and together they had a say in the city's decisions.",
            simpler: {
              q: "In the word demokratia, demos means:",
              choices: ["The people", "The gods", "The army"],
              answer: 0,
              why: "Demos means the people, so demokratia is rule by the people.",
              hints: [
                "",
                "The Greeks honored many gods, but demos is about ordinary human citizens.",
                "Athens had soldiers, but demos refers to all the people, not just the army.",
              ],
            },
          },
        },
        {
          title: "How Direct Democracy Worked",
          teach:
            "Athens practiced direct democracy. Citizens did not elect representatives to vote for them. Instead, thousands of men climbed a rocky hill called the Pnyx to meet in the Assembly. They listened to speeches and then voted on laws, taxes and even whether to go to war. A Council of 500, chosen by lottery, prepared the questions the Assembly would vote on. Many officials and large juries were also chosen by lottery, because Athenians believed any citizen could serve. Citizenship was limited to free adult men from Athenian families, so only part of the population could vote. Even so, the idea of citizens governing themselves was new and powerful.",
          visual: {
            type: "hotspots",
            title: "Inside Athenian Democracy",
            center: "The Citizens of Athens",
            spots: [
              { label: "Assembly", icon: "🗣️", detail: "Thousands of citizens met on the Pnyx hill about forty times a year to debate and vote directly on laws, taxes and war." },
              { label: "Council of 500", icon: "📜", detail: "Five hundred citizens, chosen by lottery for one year, prepared the questions the Assembly would vote on." },
              { label: "Lottery", icon: "🎲", detail: "Many officials were picked by lottery so that any citizen, rich or poor, might have a turn to serve." },
              { label: "Jury Courts", icon: "⚖️", detail: "Large juries of citizens, often hundreds strong, decided cases. Socrates' jury had 501 members." },
              { label: "Generals", icon: "🛡️", detail: "Ten generals were elected each year, because leading an army took real skill, not luck." },
            ],
          },
          think: {
            q: "Why did Athens choose many officials by lottery?",
            choices: [
              "Because nobody wanted the jobs",
              "So that any citizen had a fair chance to serve",
              "Because the gods told them to",
              "To make sure only experts served",
            ],
            answer: 1,
            why: "Athenians believed any citizen could serve, and a lottery gave rich and poor the same chance.",
            hints: [
              "Many Athenians were eager to serve. The lottery was about fairness, not a lack of volunteers.",
              "",
              "Religion mattered to Athenians, but the main reason in the lesson is that any citizen should be able to serve.",
              "A lottery does the opposite: it picks anyone, not just experts. That is why generals, who needed skill, were elected instead.",
            ],
          },
          approaches: {
            analogy:
              "Think of picking teams by drawing names from a hat instead of letting the most popular kids choose. Everyone has the same chance, and no small group can grab all the spots.",
            example:
              "Suppose an Athenian potter learns that his name was drawn for the Council of 500. For one year he helps prepare questions for the Assembly, even though he is neither rich nor famous. When the year ends, a new group is chosen and other citizens get their turn.",
            simpler: {
              q: "In a direct democracy, who votes on the laws?",
              choices: ["Representatives elected by the people", "The citizens themselves", "A king"],
              answer: 1,
              why: "In a direct democracy like Athens, citizens vote on laws themselves.",
              hints: [
                "That describes a representative system, like the United States Congress. In Athens, citizens skipped the middleman.",
                "",
                "A king rules alone. Democracy means the people rule.",
              ],
            },
          },
        },
        {
          title: "Socrates and the Power of Questions",
          teach:
            "Athens was not only a place of voting. It was a place of thinking. Socrates, the son of a stonemason, spent his days in the marketplace asking people questions. What is justice? What is courage? When someone answered confidently, Socrates asked another question, and then another, until it became clear the person did not understand as much as he thought. This way of teaching through questions is still called the Socratic method. Some Athenians found him annoying or even dangerous. In 399 BC, a jury condemned him to death for questioning the city's beliefs. Friends offered to help him escape, but Socrates chose to accept the verdict.",
          visual: {
            type: "flip",
            cards: [
              { front: "Demokratia", back: "Rule by the people (demos = people, kratos = rule)." },
              { front: "Pnyx", back: "The rocky hill in Athens where the Assembly met to vote." },
              { front: "Socratic method", back: "Teaching by asking a chain of questions that helps people examine what they really know." },
              { front: "Philosophy", back: "From Greek words meaning love of wisdom: the search for truth about life, knowledge and right action." },
              { front: "Academy", back: "The school Plato founded near Athens. Our word academy comes from its name." },
            ],
          },
          think: {
            q: "How did Socrates mostly teach people?",
            choices: [
              "By writing textbooks for students",
              "By giving speeches to pass new laws",
              "By telling stories about the gods",
              "By asking questions that made people examine their ideas",
            ],
            answer: 3,
            why: "Socrates asked one question after another so people could test what they really knew.",
            hints: [
              "Socrates actually wrote nothing down. We know his ideas because his student Plato recorded them.",
              "Socrates served as a citizen, but he is famous for conversations in the marketplace, not for passing laws.",
              "Greeks loved myths, but Socrates was known for questioning, not storytelling.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Socrates was a bit like a curious little kid who keeps asking why. Each why digs a little deeper, until you discover the part you never really thought through.",
            example:
              "Imagine Socrates asks a soldier what courage is. The soldier says it means never running away. Socrates replies by asking whether a wise general who retreats in order to win later is a coward. The soldier realizes his definition was too simple, and now he has to think harder.",
            simpler: {
              q: "The Socratic method teaches mainly by:",
              choices: ["Memorizing facts", "Asking questions", "Copying a teacher's notes"],
              answer: 1,
              why: "The Socratic method uses a chain of questions to help people think.",
              hints: [
                "Facts matter, but Socrates wanted people to think, not just memorize.",
                "",
                "Copying notes is passive. Socrates made people do the thinking themselves.",
              ],
            },
          },
        },
        {
          title: "Plato, Aristotle and the Future",
          teach:
            "Socrates never wrote a book, but his student Plato did. Plato recorded many of Socrates' conversations and founded a school called the Academy. Plato's most famous student was Aristotle, who was curious about everything: logic, animals, ethics, poetry and government. Aristotle and his students collected descriptions of the governments of well over a hundred Greek cities and asked which kinds work best. More than two thousand years later, America's Founders read these Greek writers. They admired the idea of citizens ruling themselves, but for a large nation they chose to elect representatives rather than have every citizen vote on every law.",
          visual: {
            type: "compare",
            left: {
              title: "Athens: Direct Democracy",
              points: [
                "Citizens voted on laws themselves",
                "Many officials chosen by lottery",
                "Citizens met in one place, the Pnyx",
                "Governed a single city",
              ],
            },
            right: {
              title: "United States: Representative Republic",
              points: [
                "Citizens elect representatives to make laws",
                "Most officials are elected or appointed",
                "Congress meets in Washington, D.C.",
                "Governs a large nation of many states",
              ],
            },
          },
          think: {
            q: "Which chain of teacher and student is correct?",
            choices: [
              "Aristotle taught Plato, who taught Socrates",
              "Plato taught Socrates, who taught Aristotle",
              "Socrates taught Plato, who taught Aristotle",
            ],
            answer: 2,
            why: "Socrates came first, then his student Plato, then Plato's student Aristotle.",
            hints: [
              "You have the right names but in reverse order. Socrates came first and Aristotle came last.",
              "Socrates was the oldest of the three, so he could not have been Plato's student.",
              "",
            ],
          },
          approaches: {
            analogy:
              "It is like a relay race of ideas. Socrates ran the first leg and handed the baton to Plato, who handed it to Aristotle. Centuries later, the American Founders picked up the baton too.",
            example:
              "Before the Constitutional Convention of 1787, James Madison studied the histories of ancient republics and leagues, including Greek ones. He noticed that small direct democracies were often unstable and torn by quarrels, so he argued for a large republic with elected representatives.",
            simpler: {
              q: "Who wrote down many of Socrates' conversations?",
              choices: ["Plato", "Cleisthenes", "Socrates himself"],
              answer: 0,
              why: "Plato, Socrates' student, recorded his teacher's conversations.",
              hints: [
                "",
                "Cleisthenes reformed Athens about a century earlier. He was not Socrates' student.",
                "Socrates never wrote any books. Someone else recorded his ideas.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item: is it part of Athenian democracy or Greek philosophy?",
        buckets: ["Athenian democracy", "Greek philosophy"],
        items: [
          { text: "Voting on laws in the Assembly", bucket: 0 },
          { text: "The Council of 500", bucket: 0 },
          { text: "Choosing officials by lottery", bucket: 0 },
          { text: "Cleisthenes' reforms of 508 BC", bucket: 0 },
          { text: "The Socratic method", bucket: 1 },
          { text: "Plato's Academy", bucket: 1 },
          { text: "Aristotle's study of logic", bucket: 1 },
          { text: "Asking what justice really is", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "In your own words, explain how Athenian democracy worked and why Socrates, Plato and Aristotle still matter today.",
        keyPoints: [
          "Citizens voted on laws directly in the Assembly (direct democracy).",
          "Many officials were chosen by lottery so any citizen could serve.",
          "Socrates taught by asking questions, and Plato and Aristotle continued his search for truth.",
          "Greek ideas influenced later governments, including America's Founders.",
        ],
      },
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
      hook: {
        text: "In 49 BC, Julius Caesar stood beside a small river called the Rubicon with an army at his back. Roman law said no general could lead his troops across it toward Rome. If he crossed, there was no turning back. What happens to a republic when one man decides the rules no longer apply to him?",
      },
      teach: [
        {
          title: "Rome Throws Out Its King",
          teach:
            "Early Rome was ruled by kings. The last one, Tarquin the Proud, was harsh and arrogant, and in 509 BC the Romans drove him out. They vowed never to be ruled by one man again, so they created a republic. The word comes from the Latin res publica, meaning the public thing, or the people's business. In a republic, leaders are chosen, their power is shared, and their terms are limited. Roman citizens gathered in assemblies to vote, but much of the daily work of governing belonged to elected officials and an experienced Senate. This Roman experiment lasted nearly five hundred years.",
          visual: {
            type: "timeline",
            events: [
              { year: -509, label: "509 BC: The last king is expelled", detail: "Romans drive out Tarquin the Proud and found a republic." },
              { year: -494, label: "494 BC: The first tribunes", detail: "According to Roman tradition, ordinary citizens win the right to choose tribunes to protect them." },
              { year: -458, label: "458 BC: Cincinnatus", detail: "By tradition, the farmer Cincinnatus is named dictator in an emergency, saves Rome, and quickly gives power back." },
              { year: -450, label: "About 450 BC: The Twelve Tables", detail: "Rome's laws are written down and displayed in the Forum for all to see." },
              { year: -49, label: "49 BC: Caesar crosses the Rubicon", detail: "Julius Caesar leads his army toward Rome, starting a civil war." },
              { year: -44, label: "44 BC: Caesar is assassinated", detail: "Senators kill Caesar on the Ides of March, hoping to save the republic. Instead, more civil war follows." },
              { year: -27, label: "27 BC: Augustus", detail: "Caesar's heir Octavian takes the title Augustus and becomes Rome's first emperor." },
            ],
          },
          think: {
            q: "What is a republic?",
            choices: [
              "A government run by a king who inherits power",
              "A government where leaders are chosen and power is shared and limited",
              "A government where every citizen votes on every single law",
              "A government with no laws at all",
            ],
            answer: 1,
            why: "In a republic, leaders are chosen for limited terms and power is divided so no one rules alone.",
            hints: [
              "That is a monarchy, exactly what Rome rejected in 509 BC.",
              "",
              "That sounds more like Athens' direct democracy. In Rome, elected officials and the Senate did much of the governing.",
              "A republic depends on laws. Without laws, the strongest person simply takes charge.",
            ],
          },
          approaches: {
            analogy:
              "A republic is like a club that elects its officers for one year at a time. The officers run the meetings, but they must follow the club's rules, share the job, and step down when their term ends.",
            example:
              "After Tarquin the Proud was expelled in 509 BC, the Romans did not crown a new king. They elected two consuls, each serving for only one year. A consul who misbehaved would soon be an ordinary citizen again and could be held to account.",
            simpler: {
              q: "In 509 BC, the Romans drove out their:",
              choices: ["General", "King", "Senate"],
              answer: 1,
              why: "The Romans expelled their last king, Tarquin the Proud.",
              hints: [
                "Rome had generals, but the man they expelled was Tarquin the Proud, their ruler.",
                "",
                "The Senate stayed and became even more important in the republic.",
              ],
            },
          },
        },
        {
          title: "Sharing Power: Who Ran Rome?",
          teach:
            "The Romans built their republic to stop any one person from grabbing too much power. Instead of one king, they elected two consuls each year. Either consul could block the other by saying veto, Latin for I forbid. The Senate, a council of experienced leaders who often served for life, advised the consuls and controlled much of Rome's money and dealings with other nations. Tribunes were chosen to protect ordinary citizens, and they could veto actions they thought were unjust. Citizen assemblies elected officials and voted on laws. Each part could check the others, an idea the American Founders would later borrow.",
          visual: {
            type: "hotspots",
            title: "Roman Offices",
            center: "The Roman Republic",
            spots: [
              { label: "Two Consuls", icon: "🏛️", detail: "Two leaders elected for one year. They ran the government and commanded armies, and each could veto the other." },
              { label: "Senate", icon: "📜", detail: "Experienced leaders, often former officials, who advised the consuls and guided money and foreign affairs." },
              { label: "Tribunes", icon: "🛡️", detail: "Officials chosen to protect ordinary citizens. A tribune could veto actions that harmed the people." },
              { label: "Assemblies", icon: "🗳️", detail: "Gatherings of citizens who elected officials and voted on laws and on war and peace." },
              { label: "Dictator", icon: "⏳", detail: "In an emergency, a dictator could be appointed for up to six months. The office was meant to be temporary." },
            ],
          },
          think: {
            q: "Why did Rome elect two consuls instead of one?",
            choices: [
              "So each could check the other and neither could become a tyrant",
              "So one could fight wars while the other farmed",
              "Because the Senate could never agree on one person",
              "Because Athens also had two consuls",
            ],
            answer: 0,
            why: "With two consuls who could veto each other for just one year, no single person could rule alone.",
            hints: [
              "",
              "Both consuls could lead armies. The real reason was to keep one person from holding all the power.",
              "Citizens elected the consuls, and having two was a deliberate design, not a failure to agree.",
              "Athens did not have consuls. This was a Roman invention.",
            ],
          },
          approaches: {
            analogy:
              "It is like two kids sharing one remote control, where either one can press stop. Neither can force the other to watch something, so they have to cooperate.",
            example:
              "If one consul gave an order the other thought was dangerous, the second consul could say veto and block it. Because both served only one year, neither could build up power for long. A tribune could also block actions that hurt ordinary citizens.",
            simpler: {
              q: "The Latin word veto means:",
              choices: ["I agree", "I command", "I forbid"],
              answer: 2,
              why: "Veto means I forbid, the word used to block an action.",
              hints: [
                "A veto blocks something, so it cannot mean agreeing.",
                "A command makes something happen. A veto stops something from happening.",
                "",
              ],
            },
          },
        },
        {
          title: "Rome and Athens: Two Experiments",
          teach:
            "Rome also believed in the rule of law. Around 450 BC, Romans wrote their laws on the Twelve Tables and displayed them in the Forum so everyone could know them. A law written where all can see it protects people from leaders who make up rules as they go. Now compare Rome with Athens. Athens let citizens vote directly on nearly everything and filled many offices by lottery. Rome relied on elected officials, a powerful Senate and vetoes. Athens was a democracy; Rome was a republic. Both believed citizens deserved a voice, but they built very different machines to make that happen.",
          visual: {
            type: "compare",
            left: {
              title: "Athenian Democracy",
              points: [
                "Citizens voted directly on laws in the Assembly",
                "Many officials chosen by lottery",
                "A Council of 500 prepared the agenda",
                "Citizens governed in person, in one city",
              ],
            },
            right: {
              title: "Roman Republic",
              points: [
                "Citizens elected officials to lead",
                "Two consuls who could veto each other",
                "A powerful Senate of experienced leaders",
                "Laws displayed publicly on the Twelve Tables",
              ],
            },
          },
          think: {
            q: "Why did displaying the Twelve Tables in the Forum matter?",
            choices: [
              "It let the Senate keep the laws secret",
              "It showed off Roman carving skills",
              "Everyone could know the rules, so leaders could not invent them on the spot",
              "It listed the name of every Roman citizen",
            ],
            answer: 2,
            why: "Public, written laws meant the same rules applied to everyone and could be checked by anyone.",
            hints: [
              "Displaying laws in public does the opposite of keeping them secret.",
              "The craftsmanship was not the point. Think about fairness and knowing the rules.",
              "",
              "The Tables listed laws, not people. The point was that the same rules applied to everyone.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a game where the referee keeps the rulebook hidden and can change the rules whenever he likes. Nobody would trust that game. Posting the rules where every player can read them makes the game fair.",
            example:
              "Before the Twelve Tables, ordinary Romans complained that judges from powerful families could interpret unwritten customs however they wished. Once the laws were displayed in the Forum, a farmer in a dispute could point to the written rule and expect it to apply to him the same way it applied to anyone else.",
            simpler: {
              q: "Which government let citizens vote directly on almost every law?",
              choices: ["Athens", "Rome", "Both, in exactly the same way"],
              answer: 0,
              why: "Athenian citizens voted on laws themselves in the Assembly.",
              hints: [
                "",
                "Rome relied more on elected officials and the Senate. Think about the citizens gathered on the Pnyx.",
                "Both gave citizens a voice, but in very different ways. Which one gathered thousands on a hill to vote on laws?",
              ],
            },
          },
        },
        {
          title: "Cincinnatus, Caesar and the Fall",
          teach:
            "Romans told a famous story about Cincinnatus, a farmer named dictator during an emergency. He defeated Rome's enemies and, within weeks, went back to his plow. Romans admired leaders who gave power back. Later Romans forgot that lesson. As Rome grew rich, ambitious generals built armies loyal to themselves instead of to the republic. In 49 BC, Julius Caesar crossed the Rubicon and started a civil war. He was named dictator for life, and in 44 BC senators assassinated him. More war followed, and in 27 BC his heir Octavian became Augustus, Rome's first emperor. The statesman Cicero had warned that a republic survives only when people respect its laws.",
          visual: {
            type: "sequence",
            prompt: "Put the steps of the republic's fall in order.",
            steps: [
              "Rome grows rich and powerful through conquest",
              "Generals build armies loyal to themselves, not the republic",
              "Julius Caesar crosses the Rubicon in 49 BC",
              "Caesar is named dictator for life",
              "Senators assassinate Caesar in 44 BC",
              "Octavian becomes Augustus, the first emperor, in 27 BC",
            ],
          },
          think: {
            q: "What made Cincinnatus a hero to the Romans?",
            choices: [
              "He conquered more land than anyone else",
              "He became Rome's first emperor",
              "He wrote the Twelve Tables",
              "He gave up great power as soon as the emergency was over",
            ],
            answer: 3,
            why: "Cincinnatus could have kept power, but he returned to his farm once Rome was safe.",
            hints: [
              "He did win a victory, but Romans remembered him for what he did afterward.",
              "That was Octavian, in 27 BC. Cincinnatus did the opposite: he gave power away.",
              "The Twelve Tables came from a group of lawmakers. Cincinnatus is famous for going home to his farm.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Imagine someone is put in full charge of the school for one day during an emergency. A good leader fixes the problem and hands the keys back. A bad one decides to stay in charge forever.",
            example:
              "George Washington was called the Cincinnatus of America. After leading the Continental Army to victory, he resigned his command in 1783 and went home to Mount Vernon. Later, after two terms as President, he stepped down again, showing that power in a republic belongs to the people.",
            simpler: {
              q: "Who became Rome's first emperor?",
              choices: ["Cincinnatus", "Cicero", "Octavian, called Augustus"],
              answer: 2,
              why: "Octavian took the title Augustus in 27 BC, ending the republic.",
              hints: [
                "Cincinnatus gave up power, the opposite of becoming emperor.",
                "Cicero was a statesman who defended the republic and warned about its dangers.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Did each of these help protect the Roman Republic or help weaken it?",
        buckets: ["Protected the republic", "Weakened the republic"],
        items: [
          { text: "Two consuls who could veto each other", bucket: 0 },
          { text: "Laws displayed publicly on the Twelve Tables", bucket: 0 },
          { text: "Cincinnatus returning to his farm", bucket: 0 },
          { text: "Tribunes protecting ordinary citizens", bucket: 0 },
          { text: "Generals building armies loyal only to themselves", bucket: 1 },
          { text: "Caesar crossing the Rubicon with his army", bucket: 1 },
          { text: "A dictator ruling for life", bucket: 1 },
          { text: "Leaders ignoring the law to gain power", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain in your own words how the Roman Republic kept any one person from becoming too powerful, and why it eventually fell.",
        keyPoints: [
          "Power was shared among two consuls, the Senate and tribunes, with vetoes as checks.",
          "Laws were written publicly so they applied to everyone.",
          "Ambitious generals like Caesar put personal power above the law.",
          "The republic ended when Octavian became Augustus, the first emperor.",
        ],
      },
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
      hook: {
        text: "In the summer of 1776, delegates in Philadelphia signed a document that ended with a dangerous promise: they pledged their Lives, their Fortunes and their sacred Honor. If Britain won the war, they could be hanged as traitors. What idea could be worth that risk?",
      },
      teach: [
        {
          title: "The Road to Revolution",
          teach:
            "In the 1760s, Britain had large debts from a long war and decided the American colonies should help pay. Parliament passed the Stamp Act of 1765, which taxed newspapers, legal papers and even playing cards. Colonists were furious, not just about the money but about the principle. They had no representatives in Parliament, so they had never agreed to these taxes. No taxation without representation became their rallying cry. Tensions grew with the Boston Massacre in 1770, the Boston Tea Party in 1773, and Britain closing Boston's harbor in 1774. In April 1775, fighting broke out at Lexington and Concord.",
          visual: {
            type: "timeline",
            events: [
              { year: 1765, label: "1765: The Stamp Act", detail: "Parliament taxes printed papers in the colonies. Colonists protest and boycott British goods, and the act is repealed the next year." },
              { year: 1770, label: "1770: The Boston Massacre", detail: "British soldiers fire into a crowd in Boston, killing five colonists." },
              { year: 1773, label: "1773: The Boston Tea Party", detail: "Colonists dump 342 chests of British tea into Boston Harbor to protest the tea tax." },
              { year: 1774, label: "1774: The Coercive Acts", detail: "Parliament closes Boston's harbor and limits self-government in Massachusetts. Colonists call these the Intolerable Acts." },
              { year: 1775, label: "1775: Lexington and Concord", detail: "Colonial militia and British soldiers clash in April, and the Revolutionary War begins." },
              { year: 1776, label: "1776: Independence declared", detail: "Common Sense appears in January. On July 4, Congress approves the Declaration of Independence." },
            ],
          },
          think: {
            q: "Why did many colonists object to the Stamp Act?",
            choices: [
              "They believed every tax was always wrong",
              "They had no representatives in the Parliament that taxed them",
              "They thought the stamps looked ugly",
              "They wanted to pay their taxes to France instead",
            ],
            answer: 1,
            why: "The colonists had no voice in Parliament, so they had never consented to its taxes.",
            hints: [
              "Colonists paid taxes passed by their own colonial assemblies. Their complaint was about who was doing the taxing.",
              "",
              "This was not about how stamps looked. Think about the slogan No taxation without representation.",
              "The colonists were not looking to France for taxes. Their complaint was about having no voice in Parliament.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a group holds a meeting you are not allowed to attend, and they vote that you must hand over part of your allowance every week. You might not mind helping out, but you would want a say. That is how many colonists felt.",
            example:
              "Under the Stamp Act, a colonial printer had to buy specially stamped paper for every newspaper he printed. The colonists' own assemblies had never voted for this tax. Merchants organized boycotts of British goods, and in 1766 Parliament repealed the Stamp Act, though it soon passed new taxes.",
            simpler: {
              q: "No taxation without representation means people should not be taxed by a government:",
              choices: ["Where they have no voice", "That has a king", "That uses paper money"],
              answer: 0,
              why: "Representation means having a voice, through someone you choose, in the body that makes the laws.",
              hints: [
                "",
                "The colonists already had a king. Their complaint was about Parliament taxing them without their consent.",
                "The kind of money was not the issue. Focus on the word representation.",
              ],
            },
          },
        },
        {
          title: "Common Sense and the Committee of Five",
          teach:
            "Even after the fighting began, many colonists still hoped to make peace with Britain. Then, in January 1776, Thomas Paine published a pamphlet called Common Sense. In plain, punchy language, he argued that it made no sense for a small island to rule a whole continent and that the colonies should be free. Copies spread quickly through the colonies. In June, the Second Continental Congress chose a committee of five to explain why the colonies should separate: John Adams, Benjamin Franklin, Roger Sherman, Robert Livingston and Thomas Jefferson. The committee asked 33-year-old Jefferson to write the first draft. Congress voted for independence on July 2 and approved the Declaration on July 4.",
          visual: {
            type: "flip",
            cards: [
              { front: "Thomas Jefferson", back: "A 33-year-old Virginian with a gift for writing. He wrote the first draft of the Declaration." },
              { front: "John Adams", back: "A Massachusetts lawyer and a leading voice for independence in Congress. He suggested edits to the draft." },
              { front: "Benjamin Franklin", back: "The famous Pennsylvania printer, scientist and diplomat, then 70 years old. He also suggested edits." },
              { front: "Roger Sherman", back: "A Connecticut lawmaker who later helped shape the Constitution." },
              { front: "Robert Livingston", back: "A New York lawyer on the committee. He was called home before the signing, so his name is not on the Declaration." },
              { front: "Thomas Paine", back: "Author of Common Sense, the January 1776 pamphlet that persuaded many colonists to support independence." },
            ],
          },
          think: {
            q: "What was Thomas Paine's role in the move toward independence?",
            choices: [
              "He wrote the first draft of the Declaration",
              "He was King George's top advisor",
              "He presided over the Continental Congress",
              "He wrote Common Sense, a pamphlet urging independence",
            ],
            answer: 3,
            why: "Paine's Common Sense convinced many colonists that independence was the right choice.",
            hints: [
              "That was Thomas Jefferson. Both men were named Thomas, so they are easy to mix up.",
              "Paine strongly opposed the king. His pamphlet argued for breaking away from Britain.",
              "John Hancock presided over the Congress. Paine was a writer, not a delegate.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Common Sense was like a video everyone was sharing and arguing about. It changed what people thought was possible and got them ready to accept a big decision.",
            example:
              "Before Common Sense, many colonists blamed the king's ministers and hoped the king himself would help them. Paine argued that the real problem was having a king at all. Within months, several colonial assemblies began telling their delegates in Congress to support independence.",
            simpler: {
              q: "Who wrote the first draft of the Declaration of Independence?",
              choices: ["Thomas Jefferson", "Benjamin Franklin", "George Washington"],
              answer: 0,
              why: "The committee of five asked Jefferson to write the first draft.",
              hints: [
                "",
                "Franklin was on the committee and suggested edits, but he did not write the first draft.",
                "Washington was leading the army at the time, not writing in Congress.",
              ],
            },
          },
        },
        {
          title: "What Is Inside the Declaration?",
          teach:
            "The Declaration is built like a careful argument. It opens by explaining that when one people separates from another, they owe the world an explanation. Next comes the famous statement of beliefs about rights and government. Then it lists a long series of complaints, called grievances, against King George III, such as taxing the colonists without their consent and keeping soldiers among them in peacetime. Finally, it declares that the colonies are free and independent states. The delegates closed by pledging to each other their Lives, their Fortunes and their sacred Honor. Then they signed their names, knowing the risk.",
          visual: {
            type: "hotspots",
            title: "Parts of the Declaration",
            center: "The Declaration of Independence",
            spots: [
              { label: "Introduction", icon: "📣", detail: "Explains that a people breaking away owes the world a statement of its reasons." },
              { label: "Statement of Beliefs", icon: "💡", detail: "All men are created equal, with unalienable rights, and governments get their just powers from the consent of the governed." },
              { label: "Grievances", icon: "📋", detail: "A long list of complaints against King George III, including taxes without consent and soldiers kept among the colonists in peacetime." },
              { label: "Declaration of Independence", icon: "🔔", detail: "The colonies announce that they are free and independent states, no longer tied to Britain." },
              { label: "Signatures", icon: "✍️", detail: "The signers pledge their Lives, their Fortunes and their sacred Honor. John Hancock, president of Congress, signed first and large." },
            ],
          },
          think: {
            q: "What are the grievances in the Declaration?",
            choices: [
              "A list of complaints against King George III",
              "Rules for electing a President",
              "The names of the signers",
              "A peace treaty with Britain",
            ],
            answer: 0,
            why: "The grievances are the colonists' list of wrongs done by the king, the evidence for their argument.",
            hints: [
              "",
              "The Declaration did not set up elections or offices. That came later with the Constitution.",
              "The signatures come at the end, but the grievances are something else: the reasons for breaking away.",
              "The Declaration announced a break with Britain. The peace treaty did not come until 1783.",
            ],
          },
          approaches: {
            analogy:
              "The Declaration is built like a strong persuasive essay: an introduction, a main belief, a list of evidence, and a conclusion. The grievances are the evidence that backs up the argument.",
            example:
              "One grievance says the king kept standing armies among the colonists in times of peace without the consent of their legislatures. Bostonians had seen British soldiers in their streets for years, so this complaint came from real experience.",
            simpler: {
              q: "Which king did the Declaration complain about?",
              choices: ["Tarquin the Proud", "King George III", "King Louis XVI"],
              answer: 1,
              why: "George III was king of Great Britain during the American Revolution.",
              hints: [
                "Tarquin was Rome's last king, more than 2,000 years earlier.",
                "",
                "Louis XVI was king of France, which later helped the Americans.",
              ],
            },
          },
        },
        {
          title: "Natural Rights and the Consent of the Governed",
          teach:
            "The heart of the Declaration is its second paragraph: We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. Jefferson drew on thinkers like the English philosopher John Locke, who taught that people have natural rights simply because they are human. Since these rights do not come from a king, no king can rightly take them away. Governments are created to secure these rights, and they get their just powers from the consent of the governed. When a government destroys those rights, the people may change it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Self-evident", back: "So clearly true that it does not need to be proven." },
              { front: "Unalienable", back: "Cannot rightly be taken away or given up. These rights belong to you as a person." },
              { front: "Natural rights", back: "Rights people have simply because they are human, such as life and liberty." },
              { front: "Consent of the governed", back: "The people's agreement. A just government gets its power from the people it governs." },
              { front: "Grievance", back: "A complaint about something unfair." },
            ],
          },
          think: {
            q: "According to the Declaration, why do governments exist?",
            choices: [
              "To make the king rich",
              "To give people their rights",
              "To secure, or protect, the rights people already have",
              "To collect taxes from colonies",
            ],
            answer: 2,
            why: "The Declaration says governments are instituted to secure the rights people already have.",
            hints: [
              "The Declaration was written against a king, not to serve one.",
              "This is a common mix-up. The Declaration says people already have rights from their Creator; government protects them instead of handing them out.",
              "",
              "Taxes pay for government, but the Declaration names a bigger purpose: protecting rights.",
            ],
          },
          approaches: {
            analogy:
              "Think of a lifeguard at a pool. The lifeguard does not give you your life; you already have it. The lifeguard's job is to protect it. In the Declaration, government is like a lifeguard for your rights.",
            example:
              "The colonists believed King George III was destroying their rights, for example by taxing them without consent and closing Boston's harbor. Following Locke, they reasoned that power comes from the people, so the people could withdraw it from a government that abused it and form a new one.",
            simpler: {
              q: "Unalienable rights are rights that:",
              choices: [
                "A king can take away whenever he wants",
                "Cannot rightly be taken away",
                "Belong only to rich people",
              ],
              answer: 1,
              why: "Unalienable means the rights cannot rightly be taken away or given up.",
              hints: [
                "The Declaration says the opposite: no king can rightly take these rights away.",
                "",
                "The Declaration says all men are created equal, so these rights belong to everyone.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap the sentences that are grievances, or complaints, against King George III.",
        sentences: [
          "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
          "He has refused his Assent to Laws, the most wholesome and necessary for the public good.",
          "That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.",
          "He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures.",
          "For imposing Taxes on us without our Consent:",
          "And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.",
        ],
        correct: [1, 3, 4],
      },
      explain: {
        prompt:
          "Explain the big idea of the Declaration of Independence in your own words: why did the colonists break away, and what did they believe about rights and government?",
        keyPoints: [
          "The colonists objected to being taxed and governed without their consent.",
          "People have natural, unalienable rights such as life, liberty and the pursuit of happiness.",
          "Governments exist to protect rights and get their power from the consent of the governed.",
          "When a government destroys those rights, the people may change it.",
        ],
      },
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
      hook: {
        text: "In the hot summer of 1787, delegates in Philadelphia agreed to keep their debates secret and posted guards at the doors. They had come to repair a weak government. Instead, they wrote a brand-new plan that still guides the United States today. How do you design a government strong enough to work, but never strong enough to become a tyrant?",
      },
      teach: [
        {
          title: "Why a New Plan?",
          teach:
            "After winning independence, Americans were wary of strong central power, so their first national government, the Articles of Confederation, was kept weak. Congress could not collect taxes; it could only ask the states for money, and many states paid little. There was no president to carry out laws and no national court to settle disputes between states. Changing the Articles required every state to agree. In 1786, farmers in Massachusetts led an armed uprising called Shays' Rebellion, and the national government could do little about it. Leaders worried the young nation might fall apart. In May 1787, delegates gathered in Philadelphia, with George Washington presiding.",
          visual: {
            type: "compare",
            left: {
              title: "Articles of Confederation",
              points: [
                "Congress could not collect taxes",
                "No president to carry out laws",
                "No national court system",
                "Each state had one vote in Congress",
                "Changes needed every state to agree",
              ],
            },
            right: {
              title: "U.S. Constitution",
              points: [
                "Congress can collect taxes",
                "A President leads the executive branch",
                "A Supreme Court and federal courts",
                "House seats based on population; two senators per state",
                "Amendments need approval from three-fourths of the states",
              ],
            },
          },
          think: {
            q: "What was a major weakness of the Articles of Confederation?",
            choices: [
              "The President had too much power",
              "Congress could not collect taxes",
              "The Supreme Court ruled too often",
              "There were too many branches",
            ],
            answer: 1,
            why: "Without the power to tax, Congress could only ask the states for money and often got little.",
            hints: [
              "There was no President under the Articles at all. The problem was too little power, not too much.",
              "",
              "There was no national Supreme Court under the Articles.",
              "The Articles had basically one part, Congress. The weakness was too few tools, not too many branches.",
            ],
          },
          approaches: {
            analogy:
              "The Articles were like a team with no captain, no coach and no way to collect dues. Any player could refuse to pay, and nobody could settle arguments. The team meant well but could barely play.",
            example:
              "When Congress needed money to pay debts from the Revolution, it could only send requests to the states, and many sent little or nothing. When Shays' Rebellion broke out in 1786, Congress had no real army to respond, and Massachusetts had to raise its own force to end it.",
            simpler: {
              q: "Under the Articles of Confederation, the national government was:",
              choices: ["Too weak", "Too strong", "Run by a king"],
              answer: 0,
              why: "The Articles made the national government weak on purpose, and it turned out to be too weak.",
              hints: [
                "",
                "Americans had just fought a king, so they made the new government weak on purpose, maybe too weak.",
                "There was no king. Americans had just fought to be free of one.",
              ],
            },
          },
        },
        {
          title: "We the People",
          teach:
            "James Madison of Virginia arrived in Philadelphia with careful plans and took detailed notes every day. For his work, he is often called the Father of the Constitution. The finished Constitution opens with the Preamble, a single sentence that explains its purpose. Notice how it begins: We the People of the United States. The government's authority comes from the people, not from a king. The Preamble then lists six goals: to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity.",
          visual: {
            type: "flip",
            cards: [
              { front: "Form a more perfect Union", back: "Help the states work together better than they did under the Articles." },
              { front: "Establish Justice", back: "Create fair laws and courts." },
              { front: "Insure domestic Tranquility", back: "Keep peace and order at home." },
              { front: "Provide for the common defence", back: "Protect the nation from attack." },
              { front: "Promote the general Welfare", back: "Help create conditions in which everyone can prosper." },
              { front: "Secure the Blessings of Liberty", back: "Protect freedom for people now and for future generations, which the Preamble calls our Posterity." },
            ],
          },
          think: {
            q: "Why does it matter that the Constitution begins with We the People?",
            choices: [
              "It lists the name of every citizen",
              "It shows the government's power comes from the people",
              "It means the states have no power at all",
              "It was simply a polite greeting",
            ],
            answer: 1,
            why: "We the People announces that the people themselves create the government and give it authority.",
            hints: [
              "It does not list names. The phrase is about where the government's authority comes from.",
              "",
              "States keep many powers under the Constitution. The phrase is about the people being the source of authority.",
              "It sounds friendly, but it carries a big idea about who holds power.",
            ],
          },
          approaches: {
            analogy:
              "The Preamble is like a mission statement on the first page of a team handbook. Before any rules, it tells you who the team is and what it is trying to achieve.",
            example:
              "A royal decree in the 1700s typically began with the king announcing his will. The Constitution begins instead with We the People. The Founders were making a point: the people create the government, and the government serves them.",
            simpler: {
              q: "Who is often called the Father of the Constitution?",
              choices: ["Thomas Jefferson", "King George III", "James Madison"],
              answer: 2,
              why: "Madison brought plans to the convention, shaped the debates and kept detailed notes.",
              hints: [
                "Jefferson wrote the Declaration, but in 1787 he was serving in France, not at the convention.",
                "The Constitution was written by Americans after breaking away from King George III.",
                "",
              ],
            },
          },
        },
        {
          title: "Three Branches",
          teach:
            "The Constitution divides the national government into three branches. The legislative branch, Congress, makes the laws. Congress has two parts: the House of Representatives, where states with more people have more seats, and the Senate, where every state has two senators. The executive branch, led by the President, carries out and enforces the laws and commands the military. The judicial branch, headed by the Supreme Court, decides cases about what the laws mean. Splitting power this way is called separation of powers, an idea the French writer Montesquieu explained. If one person or group made, enforced and judged the laws, liberty would be in danger.",
          visual: {
            type: "hotspots",
            title: "Three Branches of Government",
            center: "The Constitution",
            spots: [
              {
                label: "Legislative",
                icon: "🏛️",
                detail:
                  "Congress (the House and the Senate) makes laws, sets taxes and declares war. Checks: it can override a veto with a two-thirds vote of both houses, the Senate approves judges and treaties, and Congress can impeach and remove officials.",
              },
              {
                label: "Executive",
                icon: "🦅",
                detail:
                  "The President carries out the laws and commands the military. Checks: the President can veto bills passed by Congress and nominates federal judges.",
              },
              {
                label: "Judicial",
                icon: "⚖️",
                detail:
                  "The Supreme Court and federal courts decide cases about what the laws mean. Check: since Marbury v. Madison in 1803, courts can rule that a law conflicts with the Constitution. Judges serve during good behavior, so they do not face elections.",
              },
            ],
          },
          think: {
            q: "Which branch carries out and enforces the laws?",
            choices: ["The legislative branch", "The judicial branch", "The executive branch"],
            answer: 2,
            why: "The executive branch, led by the President, carries out and enforces the laws.",
            hints: [
              "The legislative branch, Congress, makes the laws. A different branch carries them out.",
              "The judicial branch decides what laws mean in court cases. Think about who leads the government day to day.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Imagine a school where a student council writes the rules, the principal enforces them, and an independent panel decides disputes about what the rules mean. If the principal could also write every rule and judge every dispute, students would have no one to turn to.",
            example:
              "In 1816, Congress passed a law creating a national bank (legislative). President James Madison signed it, and the bank opened (executive). When Maryland tried to tax the bank, the Supreme Court decided the case McCulloch v. Maryland in 1819, ruling that the bank was allowed and a state could not tax it (judicial).",
            simpler: {
              q: "Congress belongs to which branch?",
              choices: ["Legislative", "Executive", "Judicial"],
              answer: 0,
              why: "Congress is the legislative branch, which makes the laws.",
              hints: [
                "",
                "The executive branch is led by the President. Congress is a separate branch.",
                "The judicial branch is the courts. Congress writes laws instead.",
              ],
            },
          },
        },
        {
          title: "Checks, Balances and Federalism",
          teach:
            "Separating power was not enough. The Founders also gave each branch ways to check the others. To become law, a bill must pass both the House and the Senate. Then the President can sign it or veto it. Congress can override a veto with a two-thirds vote in both houses. The Senate must approve treaties and many appointments, including federal judges. The Constitution also creates federalism, sharing power between the national government and the states. The Founders remembered how Rome slid into one-man rule. Their goal was a representative republic with power so divided that no Caesar could ever take it all.",
          visual: {
            type: "sequence",
            prompt: "Put the steps of how a bill becomes a law in order.",
            steps: [
              "A member of Congress introduces a bill",
              "A committee studies and revises the bill",
              "The House and the Senate each debate and pass the bill",
              "The President signs the bill or vetoes it",
              "If it is vetoed, Congress can override with a two-thirds vote in both houses",
            ],
          },
          think: {
            q: "Which is an example of checks and balances?",
            choices: [
              "A state printing its own money",
              "The President writing all the laws alone",
              "The Supreme Court collecting taxes",
              "Congress overriding a President's veto with a two-thirds vote",
            ],
            answer: 3,
            why: "A veto override lets Congress check the President's veto, so neither branch has the final say alone.",
            hints: [
              "The Constitution gives the power to coin money to the national government, and this is not one branch limiting another.",
              "That would put too much power in one person's hands, exactly what checks and balances prevent.",
              "Courts do not collect taxes; that power belongs to Congress. Look for one branch limiting another.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Checks and balances work a bit like rock-paper-scissors. Each choice can beat one of the others, so no single choice wins every time. In the same way, each branch can limit another, so none can dominate.",
            example:
              "The first time Congress overrode a presidential veto was in 1845. President John Tyler vetoed a bill about building ships for guarding the coast, and both houses voted by more than two-thirds to pass it anyway. The bill became law without the President's signature.",
            simpler: {
              q: "What can the President do to a bill he disagrees with?",
              choices: ["Veto it", "Rewrite it himself", "Ask the Supreme Court to pass it"],
              answer: 0,
              why: "The President can veto a bill, sending it back to Congress.",
              hints: [
                "",
                "Only Congress writes and changes bills. The President can accept or reject them.",
                "The Supreme Court does not pass laws. It decides cases about them.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each power into the branch that holds it.",
        buckets: ["Legislative (Congress)", "Executive (President)", "Judicial (Courts)"],
        items: [
          { text: "Makes the laws", bucket: 0 },
          { text: "Declares war", bucket: 0 },
          { text: "Overrides a veto with a two-thirds vote", bucket: 0 },
          { text: "Vetoes bills", bucket: 1 },
          { text: "Commands the military", bucket: 1 },
          { text: "Nominates Supreme Court justices", bucket: 1 },
          { text: "Decides what laws mean in court cases", bucket: 2 },
          { text: "Rules that a law conflicts with the Constitution", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Explain in your own words how the Constitution keeps any one part of the government from becoming too powerful.",
        keyPoints: [
          "Power is separated into three branches: legislative makes laws, executive carries them out, judicial interprets them.",
          "Checks and balances let each branch limit the others, such as the veto and the veto override.",
          "Federalism shares power between the national government and the states.",
          "The Founders learned from history, including Rome's fall to one-man rule.",
        ],
      },
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
      hook: {
        text: "Imagine joining a powerful new team, then noticing the rulebook never promises to leave your home, your church or your newspaper alone. In 1787, many Americans noticed exactly that, and they would not sign on until a promise was made.",
      },
      teach: [
        {
          title: "A Promise Demanded",
          teach:
            "When the Constitution was sent to the states in 1787, a fierce debate began. Supporters, called Federalists, argued the new government was carefully limited. Critics, called Anti-Federalists, worried it was too strong. George Mason of Virginia, who had helped write the Constitution, refused to sign it, partly because it had no bill of rights. Several states ratified it only after being promised that a list of rights would be added. James Madison, at first unsure a list was needed, kept the promise. In 1789, as a member of the first Congress, he drafted amendments. Ten were ratified by the states in December 1791. We call them the Bill of Rights.",
          visual: {
            type: "timeline",
            events: [
              { year: 1787, label: "1787: Constitution signed", detail: "Delegates sign the Constitution in Philadelphia on September 17 and send it to the states for approval." },
              { year: 1788, label: "1788: Constitution ratified", detail: "In June, New Hampshire becomes the ninth state to ratify, making the Constitution official." },
              { year: 1789, label: "1789: Madison proposes amendments", detail: "In June, Madison introduces amendments in the first Congress. In September, Congress sends twelve to the states." },
              { year: 1791, label: "1791: Bill of Rights ratified", detail: "On December 15, ten amendments are ratified and become the Bill of Rights." },
            ],
          },
          think: {
            q: "Why did Anti-Federalists want a bill of rights?",
            choices: [
              "They wanted the national government to have more power",
              "They wanted to bring back the king",
              "They wanted to get rid of the states",
              "They feared a strong national government might trample people's freedoms",
            ],
            answer: 3,
            why: "Anti-Federalists wanted a written list of rights as a guard against a powerful national government.",
            hints: [
              "Anti-Federalists worried about the opposite: a national government with too much power.",
              "No major group wanted a king back. Americans had just fought a war to be free of one.",
              "Anti-Federalists were strong defenders of the states, not enemies of them.",
              "",
            ],
          },
          approaches: {
            analogy:
              "It is like agreeing to let a new babysitter take charge, but asking for a written list first: no going through my room, no reading my diary. You may trust the babysitter, but a written promise makes your rights clear.",
            example:
              "Virginia ratified the Constitution in 1788 by a close vote of 89 to 79, after debates in which Patrick Henry and George Mason warned about the missing rights. Virginia's convention also proposed a list of amendments, which helped shape what Madison later drafted.",
            simpler: {
              q: "What do we call the first ten amendments to the Constitution?",
              choices: ["The Articles of Confederation", "The Bill of Rights", "The Declaration of Independence"],
              answer: 1,
              why: "The first ten amendments, ratified in 1791, are the Bill of Rights.",
              hints: [
                "The Articles were the government before the Constitution, not amendments to it.",
                "",
                "The Declaration came in 1776 and announced independence. It is not part of the Constitution.",
              ],
            },
          },
        },
        {
          title: "Five Freedoms of the First Amendment",
          teach:
            "The First Amendment protects five freedoms that let citizens think, worship, speak and take part in self-government. Freedom of religion means the government cannot establish an official national church and cannot stop people from practicing their faith. Freedom of speech lets people express their ideas. Freedom of the press lets people print and publish news and opinions. Freedom of assembly lets people gather peacefully. Freedom to petition lets people ask the government to fix wrongs. A handy way to remember them is RAPPS: Religion, Assembly, Press, Petition, Speech. Notice that the amendment begins with the words Congress shall make no law. It is a limit placed on government.",
          visual: {
            type: "flip",
            cards: [
              { front: "Religion", back: "The government cannot set up an official national church or stop people from practicing their faith." },
              { front: "Speech", back: "People may express their ideas and opinions." },
              { front: "Press", back: "People may print and publish news and opinions." },
              { front: "Assembly", back: "People may gather together peacefully." },
              { front: "Petition", back: "People may ask the government to correct wrongs." },
            ],
          },
          think: {
            q: "Which of these is protected by the First Amendment?",
            choices: [
              "The right to a jury trial",
              "The right to gather peacefully",
              "Protection from unreasonable searches",
              "The right to keep and bear arms",
            ],
            answer: 1,
            why: "Peaceful assembly is one of the five First Amendment freedoms.",
            hints: [
              "Jury trials are protected by the Sixth and Seventh Amendments.",
              "",
              "That protection comes from the Fourth Amendment.",
              "That right is in the Second Amendment.",
            ],
          },
          approaches: {
            analogy:
              "Think of the five freedoms as five fingers on one hand. Each finger has a job, but together they let you take hold of self-government: believe, speak, write, gather and ask.",
            example:
              "Imagine townspeople upset about a dangerous road. They meet in the town square (assembly), give speeches (speech), write an article for the local newspaper (press), and sign a letter asking officials to fix it (petition). Several First Amendment freedoms are working together.",
            simpler: {
              q: "How many freedoms does the First Amendment protect?",
              choices: ["Three", "Ten", "Five"],
              answer: 2,
              why: "Religion, speech, press, assembly and petition make five.",
              hints: [
                "Count again: religion, speech, press, assembly and petition.",
                "Ten is the number of amendments in the Bill of Rights, not the number of First Amendment freedoms.",
                "",
              ],
            },
          },
        },
        {
          title: "Homes, Searches and Fair Trials",
          teach:
            "The other amendments protect more rights. The Second protects the right to keep and bear arms. The Third says soldiers cannot be housed in private homes in peacetime without the owner's consent, something colonists remembered from British rule. The Fourth guards against unreasonable searches and seizures. The Fifth through Eighth protect people accused of crimes or involved in lawsuits. They guarantee due process, a speedy and public trial, the help of a lawyer, trial by jury, and protection from cruel and unusual punishment. The Fifth also means no one can be forced to testify against himself. Together, these rights make sure government must play fair.",
          visual: {
            type: "hotspots",
            title: "Guarding Liberty",
            center: "The Bill of Rights",
            spots: [
              { label: "2nd Amendment", icon: "🛡️", detail: "Protects the right of the people to keep and bear arms." },
              { label: "3rd Amendment", icon: "🏠", detail: "Soldiers cannot be housed in a private home in peacetime without the owner's consent." },
              { label: "4th Amendment", icon: "🔍", detail: "Protects people, homes, papers and belongings from unreasonable searches and seizures. Warrants need probable cause." },
              { label: "5th Amendment", icon: "🤐", detail: "No one can be forced to testify against himself, tried twice for the same crime, or deprived of life, liberty or property without due process of law." },
              { label: "6th Amendment", icon: "⚖️", detail: "A speedy and public trial by an impartial jury, the right to know the charges, and the right to a lawyer." },
              { label: "7th Amendment", icon: "📜", detail: "A jury trial in many civil lawsuits, such as disputes over money or property." },
              { label: "8th Amendment", icon: "🚫", detail: "No excessive bail or fines, and no cruel and unusual punishment." },
            ],
          },
          think: {
            q: "Officials want to search a family's house without good reason. Which amendment protects the family?",
            choices: ["The Fourth Amendment", "The First Amendment", "The Tenth Amendment", "The Third Amendment"],
            answer: 0,
            why: "The Fourth Amendment guards against unreasonable searches and seizures.",
            hints: [
              "",
              "The First protects religion, speech, press, assembly and petition, not homes from searches.",
              "The Tenth is about powers reserved to the states and the people.",
              "The Third is about housing soldiers, not searches. You are close, though: both protect the home.",
            ],
          },
          approaches: {
            analogy:
              "The Fourth Amendment is like a rule that no one can dump out your backpack just because they feel like it. They need a real reason first. The Constitution requires the government to have good reason, too.",
            example:
              "Before the Revolution, British officials used general warrants called writs of assistance to search colonists' ships and buildings for smuggled goods without naming a specific place or reason. In 1761, Boston lawyer James Otis argued against them in court. The Fourth Amendment was written so Americans would not face searches like that.",
            simpler: {
              q: "Which amendment says soldiers cannot be housed in your home in peacetime without your consent?",
              choices: ["The Eighth", "The Third", "The Sixth"],
              answer: 1,
              why: "The Third Amendment protects homes from having soldiers housed in them without consent.",
              hints: [
                "The Eighth is about excessive bail and cruel and unusual punishment.",
                "",
                "The Sixth is about a speedy and public trial.",
              ],
            },
          },
        },
        {
          title: "Rights Not Listed and Powers Reserved",
          teach:
            "Madison worried that listing some rights might make people think those were the only ones. So the Ninth Amendment says that listing certain rights does not deny others that the people keep. The Tenth Amendment says that powers not given to the national government, nor forbidden to the states, are reserved to the states or to the people. These two amendments echo the Declaration: people's rights come first, and the government has only the powers the people give it. In the end, both sides of the great debate got something. The Federalists got their Constitution, and the Anti-Federalists got their Bill of Rights.",
          visual: {
            type: "compare",
            left: {
              title: "Federalists",
              points: [
                "Supported ratifying the Constitution",
                "Believed a stronger national government was needed",
                "At first argued a bill of rights was unnecessary",
                "Leaders included Alexander Hamilton and James Madison",
              ],
            },
            right: {
              title: "Anti-Federalists",
              points: [
                "Worried the Constitution gave the national government too much power",
                "Wanted strong state governments",
                "Demanded a written bill of rights",
                "Leaders included George Mason and Patrick Henry",
              ],
            },
          },
          think: {
            q: "What does the Tenth Amendment say?",
            choices: [
              "Congress can make any law it wants",
              "Powers not given to the national government belong to the states or the people",
              "Everyone gets a jury in every case",
              "The President can change the Constitution alone",
            ],
            answer: 1,
            why: "The Tenth Amendment reserves powers not given to the national government to the states or the people.",
            hints: [
              "The Tenth says the opposite: the national government has only limited, listed powers.",
              "",
              "Jury trials are covered in the Sixth and Seventh Amendments.",
              "No one person can change the Constitution. Amendments need Congress and the states.",
            ],
          },
          approaches: {
            analogy:
              "Imagine your parents lend you their tablet with a note listing what you may use it for: homework, reading and calling Grandma. Everything not on the list stays their decision. The Tenth Amendment works like that: the national government has its listed powers, and the rest stay with the states and the people.",
            example:
              "The Constitution does not list driver's licenses among the powers of Congress, so each state sets its own rules, such as the age for a learner's permit. That reflects the idea of the Tenth Amendment: powers not given to the national government stay with the states or the people.",
            simpler: {
              q: "The Ninth Amendment says people:",
              choices: [
                "Have no rights during wartime",
                "Have only the rights written in the Constitution",
                "Have rights even if they are not listed",
              ],
              answer: 2,
              why: "The Ninth Amendment says the list of rights is not complete; people keep other rights too.",
              hints: [
                "The Bill of Rights does not switch off in wartime. Look at what the Ninth says about unlisted rights.",
                "That was exactly Madison's worry. The Ninth Amendment says the list is not complete.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each right: is it one of the five First Amendment freedoms, or protected by another amendment?",
        buckets: ["First Amendment freedom", "Another amendment"],
        items: [
          { text: "Practicing your faith freely", bucket: 0 },
          { text: "Publishing a newspaper that criticizes officials", bucket: 0 },
          { text: "Gathering peacefully in a town square", bucket: 0 },
          { text: "Signing a petition asking the government to fix a problem", bucket: 0 },
          { text: "Speaking your opinion at a town meeting", bucket: 0 },
          { text: "Getting a speedy and public trial", bucket: 1 },
          { text: "Being protected from unreasonable searches", bucket: 1 },
          { text: "Not having soldiers housed in your home in peacetime", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "In your own words, explain why the Bill of Rights was added to the Constitution and what kinds of rights it protects.",
        keyPoints: [
          "Anti-Federalists feared a strong national government and demanded a written list of rights.",
          "Madison drafted the amendments, and ten were ratified in 1791.",
          "The First Amendment protects religion, speech, press, assembly and petition.",
          "Other amendments protect homes, fair trials, and powers reserved to the states and the people.",
        ],
      },
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
      hook: {
        text: "On December 17, 1903, Orville Wright lay flat on the wing of a homemade flying machine on a windy North Carolina beach while his brother Wilbur ran alongside. Twelve seconds later, people had flown a powered airplane for the first time. What does it take to do something no one has ever done?",
      },
      teach: [
        {
          title: "Gutenberg and the Printing Press",
          teach:
            "For most of history, books were copied by hand. A single Bible could take a scribe many months, so books were rare and costly. Around 1440, a German goldsmith named Johannes Gutenberg began experimenting with a new way to print. Using his metalworking skills, he cast small metal letters, called movable type, that could be arranged into pages, inked and pressed onto paper again and again. He also developed an oil-based ink that clung to metal. By about 1455, his press in Mainz had printed a famous Bible. Within decades, print shops spread across Europe, and books, news and ideas reached more people than ever before.",
          visual: {
            type: "timeline",
            events: [
              { year: 1440, label: "About 1440: Gutenberg experiments", detail: "Gutenberg begins developing movable metal type and a printing press." },
              { year: 1455, label: "About 1455: The Gutenberg Bible", detail: "Gutenberg's workshop in Mainz prints its famous Bible." },
              { year: 1765, label: "1765: Watt's big idea", detail: "James Watt invents the separate condenser, making steam engines far more efficient." },
              { year: 1769, label: "1769: Watt's patent", detail: "Watt patents his improved steam engine. Factories, mills and mines later run on his engines." },
              { year: 1879, label: "1879: A practical light bulb", detail: "Edison's team in Menlo Park produces a long-lasting electric light bulb." },
              { year: 1882, label: "1882: Pearl Street Station", detail: "Edison opens a power station that delivers electricity to customers in New York City." },
              { year: 1903, label: "1903: First powered flight", detail: "The Wright brothers fly at Kitty Hawk, North Carolina." },
            ],
          },
          think: {
            q: "What was Gutenberg's key invention?",
            choices: [
              "Paper",
              "The telegraph",
              "Movable metal type that could be arranged and reused",
              "A faster way for scribes to write by hand",
            ],
            answer: 2,
            why: "Reusable metal letters let printers set up a page, print many copies, then rearrange the letters for the next page.",
            hints: [
              "Paper had existed for centuries; it was first invented in China. Gutenberg printed on it.",
              "The telegraph came about 400 years later, in the 1800s.",
              "",
              "Gutenberg's idea replaced hand copying with a machine, rather than speeding up handwriting.",
            ],
          },
          approaches: {
            analogy:
              "Movable type is like a set of letter stamps. Instead of writing every page by hand, you arrange the stamps once, ink them and press out hundreds of copies. Then you rearrange the same letters into a new page.",
            example:
              "A scribe copying a Bible by hand might finish only one copy in a year or more. Gutenberg's workshop printed around 180 copies of his Bible in just a few years. Soon printers across Europe were turning out books by the thousands.",
            simpler: {
              q: "Before the printing press, most books were:",
              choices: ["Copied by hand", "Printed by computers", "Recorded on video"],
              answer: 0,
              why: "Scribes copied books by hand, which was slow and expensive.",
              hints: [
                "",
                "Computers came more than 500 years later.",
                "Video did not exist until the 1900s.",
              ],
            },
          },
        },
        {
          title: "Watt and the Age of Steam",
          teach:
            "In 1765, a Scottish instrument maker named James Watt was repairing a model of an older steam engine at the University of Glasgow. He noticed it wasted huge amounts of heat, because the same cylinder had to be heated and cooled again and again. His solution was a separate condenser, a second chamber where steam could cool while the main cylinder stayed hot. This made steam engines far more efficient, using much less fuel. Watt's engines soon powered factories, mills and mines, and later inventors used steam to drive trains and ships. This helped launch the Industrial Revolution, when work shifted from hand tools to machines.",
          visual: {
            type: "compare",
            left: {
              title: "Before the Industrial Revolution",
              points: [
                "Most goods made by hand at home or in small shops",
                "Power came from muscles, water wheels and wind",
                "Travel moved at the speed of a horse or a sailing ship",
                "Most families farmed to survive",
              ],
            },
            right: {
              title: "After It Began",
              points: [
                "Many goods made by machines in factories",
                "Steam engines provided steady, powerful energy",
                "Trains and steamships moved people and goods faster",
                "Goods became cheaper and more plentiful",
              ],
            },
          },
          think: {
            q: "Why was Watt's separate condenser such a big improvement?",
            choices: [
              "It let the engine run on electricity",
              "It made the engine small enough to carry",
              "It made the engine completely silent",
              "It saved heat, so the engine used much less fuel",
            ],
            answer: 3,
            why: "Keeping the main cylinder hot stopped the waste of heat, so the engine needed far less fuel.",
            hints: [
              "Watt's engines ran on steam made by burning fuel such as coal. Practical electric power came about a hundred years later.",
              "Watt's engines were still large machines. His improvement was about efficiency, not size.",
              "Steam engines were noisy. Think about the problem Watt noticed: wasted heat.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Imagine baking cookies but turning the oven off and letting it cool between every batch. You would waste a lot of energy reheating it. Watt's condenser let the main cylinder stay hot, like keeping the oven on.",
            example:
              "Watt partnered with the businessman Matthew Boulton, and their company built engines for mines and factories. Many mines constantly flooded with water that had to be pumped out. Watt's engines did the pumping with far less coal than older engines, so mine owners saved money and could dig deeper.",
            simpler: {
              q: "The Industrial Revolution was a shift from:",
              choices: ["Hand tools to machines", "Machines to hand tools", "Cities to farms"],
              answer: 0,
              why: "During the Industrial Revolution, machines and factories took over much of the work once done by hand.",
              hints: [
                "",
                "It went the other way: from hand tools to machines.",
                "Actually, many people moved from farms to cities to work in factories.",
              ],
            },
          },
        },
        {
          title: "Edison and the Electric Light",
          teach:
            "Thomas Edison had only a few months of formal schooling, but he loved to read and experiment. At his laboratory in Menlo Park, New Jersey, he built something new: a team of workers whose full-time job was inventing. One big challenge was a light bulb that would glow for many hours without burning out. The team tested thousands of materials for the thin filament inside, including metals and many kinds of plant fibers, before a carbon filament worked in 1879. A bulb is useless without power, so Edison also built a system to deliver electricity. In 1882, his Pearl Street Station began lighting homes and offices in New York City.",
          visual: {
            type: "flip",
            cards: [
              { front: "Invention", back: "A brand-new device or process that did not exist before." },
              { front: "Innovation", back: "Putting a new idea to work in a way that improves life, such as making a product cheaper or better." },
              { front: "Filament", back: "The thin thread inside a light bulb that glows when electricity flows through it." },
              { front: "Efficiency", back: "Getting more work done with less energy, time or material." },
              { front: "Prototype", back: "An early model built to test an idea." },
              { front: "Industrial Revolution", back: "The era, beginning in Britain in the 1700s, when machines and factories changed how goods were made." },
            ],
          },
          think: {
            q: "Why did Edison's team test thousands of materials?",
            choices: [
              "They were searching for a filament that would glow for many hours",
              "They wanted to sell all the materials",
              "They were trying to build an airplane",
              "They were making ink for printing presses",
            ],
            answer: 0,
            why: "The filament kept burning out, so they tested material after material until one lasted.",
            hints: [
              "",
              "The tests were experiments, not a sale. Think about which part of a light bulb needed to last.",
              "The Wright brothers built the airplane. Edison's team worked on electric light.",
              "Ink was part of Gutenberg's story. Edison's team needed something that would glow.",
            ],
          },
          approaches: {
            analogy:
              "It is like searching for the perfect paper airplane design. Your first ones crash, so you change the fold, the paper and the weight, testing again and again. Each failure tells you something about what to try next.",
            example:
              "In 1879, Edison's team tried a filament of carbonized cotton thread, and the bulb glowed for more than 13 hours. Later they tested carbonized bamboo, which lasted far longer. By improving step by step, they made a bulb practical enough for ordinary homes.",
            simpler: {
              q: "Where was Edison's laboratory?",
              choices: ["Kitty Hawk, North Carolina", "Menlo Park, New Jersey", "Mainz, Germany"],
              answer: 1,
              why: "Edison's famous laboratory was in Menlo Park, New Jersey.",
              hints: [
                "Kitty Hawk is where the Wright brothers flew.",
                "",
                "Mainz is linked to Gutenberg and the printing press.",
              ],
            },
          },
        },
        {
          title: "The Wright Brothers Take Flight",
          teach:
            "Orville and Wilbur Wright ran a bicycle shop in Dayton, Ohio, and used its profits to pay for their experiments. They studied how birds twist their wings to keep balance and tested gliders on the windy beaches near Kitty Hawk, North Carolina. When other people's published data on wing shapes proved wrong, they built their own small wind tunnel and tested about 200 wing designs. They also designed their own propellers and, with their mechanic Charlie Taylor, a lightweight engine. On December 17, 1903, Orville flew for 12 seconds and about 120 feet. They made four flights that day; the longest lasted 59 seconds.",
          visual: {
            type: "sequence",
            prompt: "Put the Wright brothers' steps toward flight in order.",
            steps: [
              "Run a bicycle shop in Dayton to pay for their work",
              "Study how birds balance by twisting their wings",
              "Test gliders at Kitty Hawk, North Carolina",
              "Build a wind tunnel to test wing shapes",
              "Build an engine and propellers for a powered airplane",
              "Make the first powered flight on December 17, 1903",
            ],
          },
          think: {
            q: "Which habit helped the Wright brothers succeed?",
            choices: [
              "They gave up whenever an experiment failed",
              "They waited for the government to fund them",
              "They tested ideas carefully and fixed problems one by one",
              "They copied another inventor's finished airplane",
            ],
            answer: 2,
            why: "The Wrights tested, measured and improved each part until their airplane worked.",
            hints: [
              "The Wrights did the opposite: disappointing gliders led them to build a wind tunnel and keep going.",
              "They paid for their work with money from their own bicycle shop.",
              "",
              "No one had a working airplane to copy. They even found others' data was wrong and made their own.",
            ],
          },
          approaches: {
            analogy:
              "Learning to ride a bike works the same way: you wobble, figure out what went wrong, adjust and try again. The Wrights treated flying like a puzzle to be solved one piece at a time.",
            example:
              "In 1901, the Wrights' glider lifted far less than published tables predicted. Wilbur was so discouraged that he grumbled people might not fly for a thousand years. Instead of quitting, they built a wind tunnel, tested wing shapes, and in 1902 their new glider flew beautifully.",
            simpler: {
              q: "Where did the Wright brothers make their first powered flight?",
              choices: ["Kitty Hawk, North Carolina", "Dayton, Ohio", "Menlo Park, New Jersey"],
              answer: 0,
              why: "They built the plane in Dayton but flew it at Kitty Hawk, where the wind was steady and the sand was soft.",
              hints: [
                "",
                "Dayton was their home and shop. They needed steady wind and soft sand, which they found elsewhere.",
                "Menlo Park was Edison's laboratory.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Match each clue to the inventor it belongs to.",
        buckets: ["Gutenberg", "Watt", "Edison", "Wright brothers"],
        items: [
          { text: "Movable metal type", bucket: 0 },
          { text: "A famous Bible printed around 1455", bucket: 0 },
          { text: "A separate condenser for the steam engine", bucket: 1 },
          { text: "Engines that pumped water from mines", bucket: 1 },
          { text: "A long-lasting light bulb in 1879", bucket: 2 },
          { text: "Pearl Street power station in New York City", bucket: 2 },
          { text: "A homemade wind tunnel", bucket: 3 },
          { text: "First powered flight at Kitty Hawk", bucket: 3 },
        ],
      },
      explain: {
        prompt:
          "Choose one inventor from this lesson and explain in your own words what problem they solved, how they solved it, and how it changed people's lives.",
        keyPoints: [
          "Names the inventor and the problem they noticed.",
          "Describes how they solved it, including experimenting and keeping going after failures.",
          "Explains how the invention changed daily life, such as making things cheaper, faster or more available.",
        ],
      },
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
