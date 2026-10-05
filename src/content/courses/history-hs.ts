import type { Course } from "./types";
import { history } from "./history";

/**
 * History & Civics: Advanced: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const historyHs: Course = {
  ...history,
  id: "history-hs",
  band: "strategist",
  title: "History & Civics: Advanced",
  blurb: "High school history and civics: the classical world, the rule of law, the American founding, and the forces that shaped the modern world.",
  lessons: [
    // ------------------------------------------------------------------
    {
      id: "history-hs.republics",
      title: "Athens and Rome: What Self-Government Requires",
      minutes: 40,
      stage: "logic",
      subject: "History",
      read: `Free government was born in the ancient Mediterranean, and so were the first hard lessons about how it can be lost. In 594 BC the Athenian lawgiver Solon canceled the debts that had pushed poor farmers into slavery. In 508 BC Cleisthenes went further, building a system in which the citizen Assembly made the laws. In the Funeral Oration recorded by the historian Thucydides, the statesman Pericles boasted that Athens "favours the many instead of the few; this is why it is called a democracy." Direct democracy asked a great deal of citizens: attending the Assembly, sitting on juries, rowing in the fleet and fighting in the army. When the Assembly was carried away by bold speakers, as with the disastrous expedition to Sicily in 415 BC, the whole city paid the price.

Rome built something different. According to Roman tradition, the Romans expelled their last king in 509 BC and created a res publica, a "public thing." Two consuls, elected for one year, could block each other. The Senate of former officials advised on money, war and foreign affairs. Citizen assemblies elected officials and passed laws, and tribunes could veto actions that harmed ordinary citizens. The Greek historian Polybius praised this "mixed constitution," which blended rule by one, by the few and by the many so that each part checked the others.

Laws alone did not hold Rome together. Romans honored the mos maiorum, the custom of the ancestors: leave office when your term ends, accept the results of elections, and never bring an army into the city. Cincinnatus, who according to tradition gave up the emergency post of dictator after about sixteen days to return to his farm, became the model citizen.

In its last century the Republic's habits broke down. In 133 BC the reforming tribune Tiberius Gracchus was clubbed to death by a mob led by senators. Generals such as Marius built armies loyal to themselves. Sulla marched on Rome in 88 BC, and Julius Caesar crossed the Rubicon in 49 BC. After more civil wars, Caesar's heir Octavian received the name Augustus in 27 BC. The Republic's offices remained, but one man ruled. Self-government, the ancients learned, requires not only good laws but citizens and leaders willing to keep them.`,
      keyIdeas: [
        "Athenian democracy depended on citizens who were informed, involved and willing to sacrifice.",
        "Rome's mixed constitution divided power among consuls, Senate and people so each part checked the others.",
        "Republics rely on unwritten habits of restraint; when violence and personal armies replaced them, Rome's Republic fell.",
      ],
      hook: {
        text: "In 458 BC, Roman tradition says, messengers found a retired general named Cincinnatus plowing his small farm. Rome was in danger, and the Senate wanted him to take total power as dictator. He saved the city, then, after about sixteen days, gave the power back and went home to his plow. Why would anyone give up total power, and what happens to a republic when leaders stop doing so?",
      },
      teach: [
        {
          title: "Athens: Citizens Who Rule Themselves",
          teach:
            `In 594 BC the Athenian lawgiver Solon canceled the debts that had pushed poor farmers into slavery and opened offices to men based on wealth rather than noble birth. In 508 BC Cleisthenes went further, building a government in which the citizen Assembly made the laws. By the 430s BC Athenians were proud of their system. In the Funeral Oration recorded by the historian Thucydides, Pericles says: "Its administration favours the many instead of the few; this is why it is called a democracy." But direct democracy asked a lot of citizens. They attended the Assembly, served on juries, rowed in the fleet and fought in the army, while the wealthy paid to equip warships. Pericles said Athenians regarded a man who took no part in public affairs not as quiet but as useless. Self-government required self-governing people.`,
          visual: {
            type: "timeline",
            events: [
              { year: -594, label: "594 BC: Solon's reforms", detail: "Solon cancels debts that had enslaved poor farmers and opens offices by wealth instead of birth." },
              { year: -508, label: "508 BC: Cleisthenes", detail: "Cleisthenes reorganizes the citizens and gives the Assembly the power to make laws." },
              { year: -431, label: "431 BC: War with Sparta", detail: "The Peloponnesian War begins. That winter Pericles gives his Funeral Oration." },
              { year: -415, label: "415 BC: Sicilian Expedition", detail: "Persuaded by bold speeches, the Assembly sends a huge fleet to Sicily. It ends in disaster in 413 BC." },
              { year: -404, label: "404 BC: Athens surrenders", detail: "Athens loses the war to Sparta, and for a time a narrow group called the Thirty rules the city." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each Athenian to his role in the story of self-government.",
            pairs: [
              { left: "Solon", right: "Canceled debts that had enslaved poor farmers (594 BC)" },
              { left: "Cleisthenes", right: "Gave the citizen Assembly power to make laws (508 BC)" },
              { left: "Pericles", right: "Praised democracy in the Funeral Oration" },
              { left: "Thucydides", right: "Historian who recorded the Funeral Oration" },
            ],
            hint: "One man was a lawgiver, one a reformer, one a statesman giving a speech, and one a historian writing it down.",
            mistakes: [
              { match: "Swapped Pericles and Thucydides", coach: "Pericles gave the speech; Thucydides, the historian, wrote it down in his history of the war." },
              { match: "Swapped Solon and Cleisthenes", coach: "Solon came first, in 594 BC, with debt relief. Cleisthenes followed in 508 BC with the Assembly." },
            ],
            seconds: 45,
          },
          think: {
            q: "According to Pericles' words, why was Athens called a democracy?",
            choices: [
              "Because its government favored the many instead of the few",
              "Because it had no laws at all",
              "Because the wisest citizens made every decision",
              "Because it copied the laws of its neighbors",
            ],
            answer: 0,
            why: "Pericles said Athens was called a democracy because its administration favored the many instead of the few.",
            hints: [
              "",
              "Athens had many laws. Democracy meant citizens made the laws, not that there were none.",
              "Rule by the wisest is closer to what Plato later dreamed of. Pericles talked about the many, not the few.",
              "Pericles actually boasted that Athens did not copy its neighbors; it was a pattern for others.",
            ],
          },
          approaches: {
            analogy:
              "A self-governing city is like a team with no coach. It can win, but only if every player shows up, knows the plays and puts the team ahead of himself.",
            example:
              "An Athenian farmer might spend one day voting in the Assembly on whether to build ships, another day on a jury of hundreds, and the next season rowing a warship. If he stayed home every time, the city would be run by whoever bothered to come.",
            simpler: {
              q: "In a direct democracy like Athens, who made the laws?",
              choices: ["A king", "The citizens in the Assembly", "Priests"],
              answer: 1,
              why: "Athenian citizens voted on laws themselves in the Assembly.",
              hints: [
                "Athens had moved away from kings. Who gathered in the Assembly?",
                "",
                "Priests led worship, but the laws were voted on by citizens.",
              ],
            },
          },
        },
        {
          title: "Rome's Mixed Constitution",
          teach:
            `Rome took a different path. According to Roman tradition, in 509 BC the Romans drove out their last king and swore never to have another. They built a republic, from res publica, meaning "the public thing." Two consuls, elected for one year, led the government and the army, and each could block the other. The Senate, made up mostly of former officials, advised on money, war and foreign affairs. Citizen assemblies elected officials and passed laws, and tribunes of the plebs could veto actions that harmed ordinary citizens. Around 450 BC the Romans wrote their basic laws on the Twelve Tables and set them up in the Forum so everyone could know the rules. The Greek historian Polybius, who lived in Rome in the 100s BC, explained the system's strength: it mixed monarchy, aristocracy and democracy, so that each part checked the others.`,
          visual: {
            type: "hotspots",
            title: "The Roman Republic's Mixed Constitution",
            center: "Res Publica",
            spots: [
              { label: "Two consuls", icon: "🦅", detail: "Elected for one year. They commanded the armies and led the government, and each could veto the other." },
              { label: "Senate", icon: "🏛️", detail: "Mostly former officials, serving for life. Its advice on money, war and foreign affairs carried enormous weight." },
              { label: "Assemblies", icon: "🗳️", detail: "Roman citizens met to elect officials and pass laws." },
              { label: "Tribunes", icon: "✋", detail: "Officials of the plebs, the common people, who could veto actions that harmed ordinary citizens." },
              { label: "Twelve Tables", icon: "📜", detail: "Rome's first written laws, around 450 BC, displayed in the Forum so all could know them." },
              { label: "Dictator", icon: "⏳", detail: "In an emergency one man could hold supreme power, but only for up to six months." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Polybius said Rome mixed three kinds of rule. Sort each part of the Republic into the kind of rule it resembled.",
            buckets: ["Rule by one: the consuls", "Rule by the few: the Senate", "Rule by the many: the people"],
            items: [
              { text: "Commanding the legions in war", bucket: 0 },
              { text: "Leading the government for a one-year term", bucket: 0 },
              { text: "Former officials advising on money and war", bucket: 1 },
              { text: "Receiving foreign ambassadors and guiding foreign policy", bucket: 1 },
              { text: "Citizens electing officials", bucket: 2 },
              { text: "Tribunes vetoing actions that harm ordinary citizens", bucket: 2 },
              { text: "Assemblies passing laws", bucket: 2 },
            ],
            hint: "Ask: is this power held by a top executive, by an elite council, or by ordinary citizens and their protectors?",
            mistakes: [
              { match: "Tribunes as the few", coach: "Tribunes were officials, but their whole job was to protect the plebs, the many." },
              { match: "Consuls as the few", coach: "There were only two consuls with royal-style command, the part of the system most like a king." },
            ],
            seconds: 60,
          },
          think: {
            q: "Why did Polybius think Rome's mixed constitution was strong?",
            choices: [
              "It gave all power to the Senate",
              "It let the consuls rule for life",
              "Each part of government could check the others",
              "It had no written laws to argue about",
            ],
            answer: 2,
            why: "Polybius argued that blending rule by one, by the few and by the many kept any one part from dominating.",
            hints: [
              "The Senate was powerful, but the consuls and the people also held real power. Polybius praised the balance.",
              "Consuls served only one year. Short terms were one of the checks.",
              "",
              "Rome did have written laws, the Twelve Tables. Polybius was praising how power was divided.",
            ],
          },
          approaches: {
            analogy:
              "A mixed constitution is like a three-legged stool. Each leg holds up part of the weight, and if one leg grows too long, the others keep the seat from tipping over.",
            example:
              "Suppose one consul wants to start a risky war. The other consul can block him. Even if both agree, the Senate controls the money to pay the army, and the assemblies must approve the declaration of war.",
            simpler: {
              q: "How long did a Roman consul serve?",
              choices: ["For life", "One year", "Ten years"],
              answer: 1,
              why: "Consuls were elected for a single year, so no one held top power for long.",
              hints: [
                "Lifetime rule was what the Romans hated about kings.",
                "",
                "That would give one man far too long at the top. Romans kept the term short.",
              ],
            },
          },
        },
        {
          title: "The Habits That Held a Republic Together",
          teach:
            `Written laws were only part of Rome's constitution. Romans also honored the mos maiorum, "the custom of the ancestors." These unwritten rules said that officials leave office when their term ends, losers accept the result of an election, and no general brings his army into the city. The model citizen was Cincinnatus. In 458 BC, according to tradition, he was called from his farm to serve as dictator during a war, defeated the enemy, and gave up his power after about sixteen days. A dictator could legally hold power for six months, but Cincinnatus chose to leave early. Centuries later the Roman orator Cicero summed up the purpose of law: "Let the welfare of the people be the supreme law." Americans admired Cincinnatus so much that they named the city of Cincinnati after him and compared George Washington to him when he gave up command of the army.`,
          visual: {
            type: "flip",
            cards: [
              { front: "Res publica", back: "Latin for \"the public thing\": government as the shared business of the citizens." },
              { front: "Mos maiorum", back: "\"The custom of the ancestors\": Rome's unwritten rules of honorable public conduct." },
              { front: "Dictator", back: "An emergency office in the Republic, legally limited to six months." },
              { front: "Tribune of the plebs", back: "An official who could veto actions that harmed ordinary citizens." },
              { front: "Cincinnatus", back: "The farmer-general who, by tradition, gave up supreme power after about sixteen days." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every action that keeps the mos maiorum, the unwritten habits that protected the Republic.",
            sentences: [
              "A dictator lays down his power as soon as the emergency is over.",
              "A consul steps down when his one-year term ends.",
              "A general marches his legions into Rome to force the Senate to obey him.",
              "A candidate who loses an election accepts the result.",
              "A politician hires armed gangs to scare voters away from the assembly.",
            ],
            correct: [0, 1, 3],
            hint: "Look for leaders who limit themselves even when they have the power to do more.",
            mistakes: [
              { match: "Picked the marching general", coach: "Bringing an army into the city was exactly what the custom forbade. It is the habit that, once broken, helped end the Republic." },
              { match: "Picked the armed gangs", coach: "Using force on voters replaces persuasion with fear. That breaks the habits of a republic." },
              { match: "Missed the losing candidate", coach: "Accepting defeat is a quiet but vital habit. Without it, every election becomes a fight." },
            ],
            seconds: 40,
          },
          think: {
            q: "What does the story of Cincinnatus teach about self-government?",
            choices: [
              "A leader should hold power as long as the law allows",
              "Strong generals should run the government",
              "Farmers should not serve in public office",
              "Leaders must be willing to give power back, even when they could keep it",
            ],
            answer: 3,
            why: "Cincinnatus could legally have kept power for six months, but he gave it up once the danger passed.",
            hints: [
              "The law allowed six months, yet Cincinnatus left after about sixteen days. The lesson is about restraint.",
              "Cincinnatus was a general, but he returned power to the civilian government. That is the point of the story.",
              "Cincinnatus himself was a farmer. Romans admired him because he went back to his plow.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A republic's unwritten rules are like good sportsmanship. The rulebook says what is allowed, but a game only stays fair when players shake hands after losing and refuse to cheat even when the referee is not looking.",
            example:
              "In 1783, at the end of the American Revolution, George Washington resigned his command to Congress instead of using the army to take power. People at the time compared him to Cincinnatus, the Roman who went home to his farm.",
            simpler: {
              q: "Mos maiorum means:",
              choices: ["The custom of the ancestors", "The law of the king", "The army of Rome"],
              answer: 0,
              why: "Mos maiorum was the custom of the ancestors, Rome's unwritten rules of conduct.",
              hints: [
                "",
                "Rome had thrown out its kings. These customs came from earlier generations of citizens.",
                "The army mattered, but this phrase is about inherited habits, not soldiers.",
              ],
            },
          },
        },
        {
          title: "How the Republic Fell",
          teach:
            `The Republic lasted nearly five centuries, but in its last hundred years its habits broke down one by one. Conquest brought Rome great wealth, yet many small farmers lost their land while they served in long wars overseas. In 133 BC the tribune Tiberius Gracchus pushed a law to give land to the poor and was clubbed to death by a mob led by senators. Violence had entered politics. Around 107 BC the general Marius recruited poor volunteers who looked to their general, not the Republic, for pay and land. In 88 BC Sulla marched his army on Rome itself. In 49 BC Julius Caesar crossed the Rubicon River with his army and started a civil war. He was made dictator for life and assassinated in 44 BC. His heir Octavian won the next civil wars, and in 27 BC the Senate gave him the name Augustus. The offices remained, but one man ruled.`,
          visual: {
            type: "timeline",
            events: [
              { year: -133, label: "133 BC: Tiberius Gracchus killed", detail: "A reforming tribune is clubbed to death by a mob led by senators. Political violence begins." },
              { year: -107, label: "107 BC: Marius' armies", detail: "Marius recruits landless volunteers who depend on their general for pay and land." },
              { year: -88, label: "88 BC: Sulla marches on Rome", detail: "For the first time a Roman general leads his army against the city itself." },
              { year: -49, label: "49 BC: The Rubicon", detail: "Caesar brings his army into Italy, starting a civil war." },
              { year: -44, label: "44 BC: Ides of March", detail: "Named dictator for life, Caesar is assassinated by senators on March 15." },
              { year: -27, label: "27 BC: Augustus", detail: "The Senate gives Octavian the name Augustus. Rome becomes an empire in all but name." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the steps in the fall of the Roman Republic in order, earliest first.",
            steps: [
              "Tiberius Gracchus is killed by a mob led by senators",
              "Marius recruits armies loyal to their general",
              "Sulla marches his army on Rome",
              "Caesar crosses the Rubicon and starts a civil war",
              "Octavian is given the name Augustus",
            ],
            hint: "First violence enters politics, then armies become personal, then generals turn those armies on Rome.",
            mistakes: [
              { match: "Caesar before Sulla", coach: "Sulla marched on Rome in 88 BC, almost forty years before Caesar crossed the Rubicon in 49 BC." },
              { match: "Marius before Gracchus", coach: "Gracchus was killed in 133 BC. Marius' army reforms came about a generation later." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which change did the most to let generals overthrow the Republic?",
            choices: [
              "The writing of the Twelve Tables",
              "Soldiers who were loyal to their general instead of to the Republic",
              "Electing two consuls each year",
              "The creation of tribunes",
            ],
            answer: 1,
            why: "Once armies depended on their own general for pay and land, ambitious generals could turn them against Rome.",
            hints: [
              "The Twelve Tables came about 450 BC and helped build the Republic, not end it.",
              "",
              "Two one-year consuls were a safeguard against one-man rule.",
              "Tribunes protected ordinary citizens. The danger came from armies loyal to individual men.",
            ],
          },
          approaches: {
            analogy:
              "Think of a dam with small cracks. Each crack, a murder here or a marching army there, seems survivable. But every crack makes the next one easier, until the water breaks through.",
            example:
              "When Sulla marched on Rome in 88 BC, it had never been done before. Forty years later, when Caesar crossed the Rubicon, everyone remembered that it had been done, and that Sulla had won.",
            simpler: {
              q: "In 49 BC, what did Julius Caesar do that started a civil war?",
              choices: ["Resigned as consul", "Wrote the Twelve Tables", "Crossed the Rubicon with his army"],
              answer: 2,
              why: "Bringing his army across the Rubicon into Italy broke the law and began the civil war.",
              hints: [
                "Resigning would have kept the peace. Caesar did the opposite.",
                "The Twelve Tables were written about 400 years earlier.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each event or habit: did it strengthen self-government or weaken it?",
        buckets: ["Strengthened self-government", "Weakened self-government"],
        items: [
          { text: "Solon cancels debts that enslaved poor farmers", bucket: 0 },
          { text: "The Twelve Tables are posted in the Forum", bucket: 0 },
          { text: "Cincinnatus gives up power after the emergency", bucket: 0 },
          { text: "Tribunes can veto actions that harm ordinary citizens", bucket: 0 },
          { text: "A mob led by senators kills Tiberius Gracchus", bucket: 1 },
          { text: "Armies look to their general for pay and land", bucket: 1 },
          { text: "Sulla marches his army on Rome", bucket: 1 },
          { text: "Caesar is named dictator for life", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain what self-government required in Athens and Rome, and use the fall of the Roman Republic to show what happens when those requirements are abandoned.",
        keyPoints: [
          "Athenian democracy needed informed, active citizens who served the city.",
          "Rome's mixed constitution divided power among consuls, Senate and people so each checked the others.",
          "Unwritten habits like giving up power and accepting elections held the Republic together.",
          "Political violence and armies loyal to generals broke those habits and led to one-man rule.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline. BC years count down toward year 1, so 594 BC is shown as -594.",
          min: -620,
          max: -10,
          step: 1,
          tolerance: 15,
          items: [
            { label: "Solon's reforms in Athens", value: -594 },
            { label: "Rome's Twelve Tables", value: -450 },
            { label: "Tiberius Gracchus is killed", value: -133 },
            { label: "Octavian becomes Augustus", value: -27 },
          ],
          hint: "Athens' reforms came first, Rome's written laws about 150 years later, and the Republic's collapse in the last two centuries BC.",
          mistakes: [
            { match: "Augustus near Gracchus", coach: "About a century separates the killing of Gracchus (133 BC) from Augustus (27 BC)." },
            { match: "Twelve Tables before Solon", coach: "Solon's reforms (594 BC) came before Rome's Twelve Tables (about 450 BC)." },
          ],
          seconds: 50,
        },
        {
          type: "match",
          prompt: "Match each term to its meaning.",
          pairs: [
            { left: "Res publica", right: "The public thing: government as citizens' shared business" },
            { left: "Mos maiorum", right: "The custom of the ancestors" },
            { left: "Tribune", right: "Official who could veto actions harming ordinary citizens" },
            { left: "Consul", right: "One of two top officials elected for one year" },
            { left: "Mixed constitution", right: "Polybius' term for blending rule by one, few and many" },
          ],
          hint: "Two terms are Latin phrases, two are offices, and one is a Greek historian's idea.",
          mistakes: [
            { match: "Swapped tribune and consul", coach: "Consuls led the government and army; tribunes protected the plebs with their veto." },
            { match: "Swapped res publica and mos maiorum", coach: "Res publica names the government itself; mos maiorum names the unwritten customs." },
          ],
          seconds: 60,
        },
        {
          type: "build",
          prompt: "Build the main lesson of the Roman Republic's fall.",
          tiles: ["Written laws", "protect a republic", "only while", "citizens and leaders", "choose to keep them"],
          distractors: ["a strong general", "never need"],
          hint: "Start with what was written down, then say what it depends on.",
          mistakes: [
            { match: "a strong general", coach: "Strong generals were part of the problem. The Republic depended on restraint, not strongmen." },
            { match: "never need", coach: "Laws always need people willing to honor them. That is the lesson of Rome's last century." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Rome elected two {0} each year, who could block each other. The {1}, made up of former officials, advised on war and money. In an emergency, a {2} could hold supreme power for up to six months.",
          blanks: [{ answers: ["consuls"] }, { answers: ["Senate"] }, { answers: ["dictator"] }],
          bank: ["consuls", "Senate", "dictator", "kings", "tribunes", "emperor"],
          hint: "One office came in pairs, one was a council, and one was meant only for emergencies.",
          mistakes: [
            { match: "kings", coach: "Rome expelled its kings in 509 BC and swore never to have another." },
            { match: "emperor", coach: "Emperors came after the Republic fell. The temporary emergency office was different." },
            { match: "tribunes", coach: "Tribunes protected the plebs. The pair who led the government had another title." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "Which Athenian canceled the debts that had pushed poor farmers into slavery?",
          choices: ["Pericles", "Solon", "Thucydides", "Cleisthenes"],
          answer: 1,
          why: "Solon's reforms of 594 BC freed debt-slaves and opened offices by wealth instead of birth.",
        },
        {
          q: "What did Polybius praise about Rome's constitution?",
          choices: [
            "It gave all power to the people",
            "It made the consuls rule for life",
            "It mixed rule by one, by the few and by the many",
            "It had no Senate",
          ],
          answer: 2,
          why: "Polybius argued that Rome's mix of consuls, Senate and people let each part check the others.",
        },
        {
          q: "Why do Romans and Americans admire Cincinnatus?",
          choices: [
            "He conquered more land than any other Roman",
            "He wrote the Twelve Tables",
            "He crossed the Rubicon",
            "He gave up supreme power once the emergency was over",
          ],
          answer: 3,
          why: "By tradition he served as dictator for about sixteen days, then returned to his farm.",
        },
        {
          q: "What happened in 133 BC that showed the Republic's habits were breaking down?",
          choices: [
            "The tribune Tiberius Gracchus was killed by a mob led by senators",
            "Rome expelled its last king",
            "The Twelve Tables were posted",
          ],
          answer: 0,
          why: "Using violence to settle a political dispute broke the Republic's unwritten rules.",
        },
        {
          q: "In what year did the Senate give Octavian the name Augustus?",
          choices: ["509 BC", "133 BC", "27 BC", "AD 476"],
          answer: 2,
          why: "In 27 BC Octavian became Augustus, and Rome was ruled by one man while keeping the Republic's offices.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a 300-word essay answering this question: What kept the Roman Republic alive for nearly five centuries, and what destroyed it? Use at least three specific events with dates, and end with one lesson a modern citizen could draw from Rome.",
        rubric: [
          "States a clear thesis about what self-government requires.",
          "Uses at least three accurate events with dates (for example 509 BC, 133 BC, 49 BC, 27 BC).",
          "Explains cause and effect, not just a list of events.",
          "Mentions both written laws and unwritten habits.",
          "Ends with a thoughtful, timeless lesson for citizens.",
        ],
      },
    },
    // ------------------------------------------------------------------
    {
      id: "history-hs.magna-carta",
      title: "Magna Carta and the Common Law: Limiting Power",
      minutes: 40,
      stage: "logic",
      subject: "Civics",
      read: `In 1215 a group of English barons forced their king to put his promises in writing. King John had lost Normandy to France in 1204, raised heavy payments from his barons to win it back, and punished critics by seizing their lands. After his allies were defeated at the Battle of Bouvines in 1214, the barons rebelled and captured London. On 15 June 1215, in a meadow called Runnymede beside the River Thames, John agreed to a charter that came to be called Magna Carta, the Great Charter.

Most of its 63 clauses dealt with the problems of the day, such as inheritance payments, debts and fish traps in the Thames. But two promises outlived the rest. No free man would be imprisoned, stripped of his rights or outlawed except "by the lawful judgment of his peers or by the law of the land." And the king promised: "To no one will we sell, to no one deny or delay right or justice." The pope declared the charter void within weeks, and war followed, but after John died in 1216 his son's government reissued it. The 1225 version became part of English law.

Magna Carta grew inside a larger system called the common law. John's father, Henry II, sent royal judges riding on circuits through the country and used juries of local men. Judges followed earlier decisions, called precedents, so the same law applied across the realm. Around 1250 a legal writer known as Bracton put the principle plainly: the king is under God and under the law, "because law makes the king."

Later generations kept returning to the charter. A statute of 1354 restated "the law of the land" as "due process of the law." In 1628 the judge and member of Parliament Sir Edward Coke used Magna Carta to challenge King Charles I, who was jailing men without stating any charge. The Habeas Corpus Act of 1679 and the English Bill of Rights of 1689 followed. American colonists read about these rights in William Blackstone's Commentaries. In 1791 the Fifth Amendment promised that no person shall "be deprived of life, liberty, or property, without due process of law."`,
      keyIdeas: [
        "Magna Carta (1215) put limits on the king in writing: no punishment except by lawful judgment or the law of the land.",
        "The common law grew from judges, juries and precedent, so one law applied to everyone in the realm.",
        "From 1215 to 1791, English and American law turned those promises into due process, habeas corpus and the rule of law.",
      ],
      hook: {
        text: "In June 1215, the most powerful man in England, King John, rode to a meadow by the River Thames to meet the rebel barons who held London. He did not want to be there. By the time he left, he had agreed that even a king must obey the law. Eight hundred years later, Americans still rely on words from that meadow. What happened at Runnymede?",
      },
      teach: [
        {
          title: "King John Meets His Barons",
          teach:
            `In 1199 John became king of England. He was an energetic ruler, but a poor war leader and a harsh tax collector. After losing Normandy to the French king in 1204, John demanded heavy payments from his barons to fund wars to win it back, and he punished critics by seizing their lands or holding their relatives as hostages. When his allies were crushed at the Battle of Bouvines in 1214, the barons' patience ran out. In May 1215 they renounced their loyalty and captured London. On 15 June 1215, in a meadow called Runnymede beside the River Thames, John agreed to a charter of liberties later known as Magna Carta, the Great Charter. Its clause 61 named twenty-five barons who could act against the king if he broke his promises. It was a bold attempt to bind a king to written rules and to give those rules teeth.`,
          visual: {
            type: "timeline",
            events: [
              { year: 1199, label: "1199: John becomes king", detail: "John succeeds his brother Richard the Lionheart." },
              { year: 1204, label: "1204: Normandy lost", detail: "The French king Philip II takes Normandy from John." },
              { year: 1214, label: "1214: Battle of Bouvines", detail: "John's allies are defeated, ending his hopes of winning back his lands in France." },
              { year: 1215, label: "1215: Runnymede", detail: "On 15 June, John agrees to Magna Carta. Within weeks the pope declares it void, and war follows." },
              { year: 1216, label: "1216: John dies", detail: "John dies in October. Advisers of his nine-year-old son, Henry III, reissue the charter." },
              { year: 1225, label: "1225: The lasting version", detail: "Henry III reissues Magna Carta, and this version becomes part of English law." },
            ],
          },
          probe: {
            type: "cloze",
            text: "In {0}, King John met the rebel barons at {1}, beside the River Thames. Clause 61 named twenty-five {2} who could act against the king if he broke the charter.",
            blanks: [{ answers: ["1215"] }, { answers: ["Runnymede"] }, { answers: ["barons"] }],
            bank: ["1215", "1066", "Runnymede", "Westminster", "barons", "bishops"],
            hint: "The meadow's name begins with R, and the rebels were great landholders, not churchmen.",
            mistakes: [
              { match: "1066", coach: "1066 is the Norman Conquest, nearly 150 years earlier. Magna Carta came in the 1200s." },
              { match: "Westminster", coach: "Westminster was the seat of royal government. John met the rebels out in an open meadow." },
              { match: "bishops", coach: "Church leaders helped draft and witness the charter, but the twenty-five enforcers were barons." },
            ],
            seconds: 35,
          },
          think: {
            q: "What finally pushed the barons to rebel against King John?",
            choices: [
              "John refused to fight any wars",
              "John gave the barons too much land",
              "Heavy payments, harsh punishments and the defeat at Bouvines",
              "The pope ordered them to rebel",
            ],
            answer: 2,
            why: "Years of heavy demands and seized lands, followed by the failure at Bouvines in 1214, drove the barons to revolt.",
            hints: [
              "John fought, and lost. His expensive wars were part of the problem.",
              "John was more likely to seize land than give it away.",
              "",
              "The pope actually sided with John and declared the charter void.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a team captain who keeps taking everyone's lunch money for games he keeps losing. Eventually the team writes down rules he must follow, and names a few players who can stop him if he breaks them.",
            example:
              "A baron whose land John seized without a trial had no way to fight back except rebellion. Magna Carta promised that, from then on, such a man could be punished only by the lawful judgment of his peers or by the law of the land.",
            simpler: {
              q: "What does Magna Carta mean?",
              choices: ["Great Charter", "King's Army", "New Kingdom"],
              answer: 0,
              why: "Magna Carta is Latin for Great Charter.",
              hints: [
                "",
                "It was a document, not an army. Carta is related to our word chart.",
                "No new kingdom was created. Magna means great.",
              ],
            },
          },
        },
        {
          title: "The Words That Lasted",
          teach:
            `Most of Magna Carta's 63 clauses dealt with the problems of 1215: inheritance payments, debts, forest laws and even fish traps in the Thames. But two promises would outlive the rest. Clause 39 said no free man would be seized, imprisoned, stripped of his rights or outlawed except "by the lawful judgment of his peers or by the law of the land." Clause 40 added: "To no one will we sell, to no one deny or delay right or justice." Together they meant the king could not punish people simply because he wanted to. Within weeks, Pope Innocent III declared the charter void, and civil war broke out. But after John died in 1216, his young son's advisers reissued Magna Carta to win back support. The 1225 version became part of English law, and part of those two clauses is still law in England today.`,
          visual: {
            type: "compare",
            left: {
              title: "Before Magna Carta",
              points: [
                "The king could seize land or jail people at will",
                "Justice could be bought, refused or delayed",
                "No written limits the barons could point to",
                "Only rebellion could stop an unjust king",
              ],
            },
            right: {
              title: "After Magna Carta",
              points: [
                "Punishment only by lawful judgment or the law of the land",
                "The king promised not to sell, deny or delay justice",
                "Written promises that later generations could cite",
                "The idea that the king, too, is under the law",
              ],
            },
          },
          probe: {
            type: "highlight",
            prompt: "Here are promises from the 1215 charter. Tap the ones that protect individuals from unfair punishment or unfair courts.",
            sentences: [
              "No free man shall be imprisoned or stripped of his rights except by the lawful judgment of his peers or by the law of the land.",
              "All fish traps shall be removed from the Thames and the Medway.",
              "To no one will we sell, to no one deny or delay right or justice.",
              "There shall be one measure of wine, ale and corn throughout the kingdom.",
              "No official shall put a man on trial on his own unsupported word, without credible witnesses.",
            ],
            correct: [0, 2, 4],
            hint: "Look for promises about trials, judgments and justice, not about trade or rivers.",
            mistakes: [
              { match: "Picked the fish traps", coach: "Removing fish traps mattered for river trade, but it is not about how people are judged." },
              { match: "Picked the measures", coach: "Standard measures helped fair trade, but the question asks about fair trials and punishment." },
              { match: "Missed the witnesses clause", coach: "Requiring credible witnesses before a trial protects people from being accused on an official's word alone." },
            ],
            seconds: 50,
          },
          think: {
            q: "Why did clauses 39 and 40 matter more in the long run than most of the charter?",
            choices: [
              "They limited the king's power to punish people at will and to sell justice",
              "They set the price of wine and ale",
              "They made the barons the new kings",
              "They were never reissued",
            ],
            answer: 0,
            why: "These clauses set a lasting principle: punishment only through lawful judgment, and justice that cannot be bought or denied.",
            hints: [
              "",
              "Standard measures were a separate clause about trade. Clauses 39 and 40 are about justice.",
              "The barons did not replace the king; they bound him to rules.",
              "They were reissued, in 1216, 1217 and 1225, and part of them is still law in England.",
            ],
          },
          approaches: {
            analogy:
              "Clause 39 is like a rule that a referee cannot throw you out of the game just because he dislikes you. He has to point to a rule you actually broke, and follow the proper process.",
            example:
              "Before 1215, King John could simply take a baron's castle. Under clause 39, he would first need a lawful judgment by the baron's peers or a basis in the law of the land.",
            simpler: {
              q: "Clause 40 promised that justice would not be:",
              choices: ["Written down", "Sold, denied or delayed", "Given to free men"],
              answer: 1,
              why: "The king promised: to no one will we sell, to no one deny or delay right or justice.",
              hints: [
                "Writing laws down actually helps justice. The clause forbids something else.",
                "",
                "The charter protected free men; it did not keep justice from them.",
              ],
            },
          },
        },
        {
          title: "Common Law: Judges, Juries and Precedent",
          teach:
            `Magna Carta grew inside a larger system. John's father, Henry II, who reigned from 1154 to 1189, wanted the same royal justice everywhere in England. He sent judges riding on regular circuits through the counties, and under the Assize of Clarendon in 1166, groups of local men under oath reported serious crimes to them. Over time, juries came to decide the facts of cases. Judges wrote down their decisions, and later judges followed them. An earlier decision used this way is called a precedent. Because the same rules applied across the whole realm instead of differing from village to village, this became known as the common law. Around 1250 a legal treatise known as Bracton stated a bold principle: the king must be under God and under the law, "because law makes the king." In the common law, law is not simply the ruler's will.`,
          visual: {
            type: "hotspots",
            title: "How the Common Law Works",
            center: "Common Law",
            spots: [
              { label: "Circuit judges", icon: "🐎", detail: "Royal judges rode from county to county so the king's justice reached the whole country." },
              { label: "Jury", icon: "👥", detail: "Local men under oath. In time, juries came to decide the facts of a case." },
              { label: "Precedent", icon: "📚", detail: "An earlier decision that later judges follow, so similar cases are decided in similar ways." },
              { label: "Same law for all", icon: "⚖️", detail: "Common means shared: one law across the realm rather than local customs." },
              { label: "Rule of law", icon: "👑", detail: "Bracton: the king is under God and under the law, because law makes the king." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each common-law idea to what it means.",
            pairs: [
              { left: "Precedent", right: "An earlier decision later judges follow" },
              { left: "Circuit judges", right: "Royal judges who traveled from county to county" },
              { left: "Jury", right: "Local people under oath who decide the facts" },
              { left: "Common law", right: "One body of law shared across the realm" },
              { left: "Rule of law", right: "Even the ruler is under the law" },
            ],
            hint: "Think about who decides facts, who travels, what gets followed later, and who is under the law.",
            mistakes: [
              { match: "Swapped precedent and common law", coach: "A precedent is one earlier decision. The common law is the whole body of law built from many of them." },
              { match: "Swapped jury and circuit judges", coach: "Judges traveled and applied the law; juries were local people who decided the facts." },
            ],
            seconds: 55,
          },
          think: {
            q: "Why is it called the common law?",
            choices: [
              "Because only common people had to obey it",
              "Because it was written by commoners in Parliament",
              "Because it was rarely used",
              "Because the same law was common to the whole realm",
            ],
            answer: 3,
            why: "Royal judges applied one shared law across England instead of many local customs.",
            hints: [
              "Bracton said even the king is under the law. It was not only for commoners.",
              "The common law was built mostly by judges' decisions, not by acts of Parliament.",
              "Common here means shared, not rare or ordinary.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Precedent is like the rulings in a long-running game league. When a strange play happened last season and the referees decided it one way, this season's referees follow the same ruling, so players know what to expect.",
            example:
              "Suppose a judge rules that a seller who hides a broken wheel on a cart must return the buyer's money. Years later a similar case comes up in another county. The new judge follows that earlier ruling, the precedent, and the law grows case by case.",
            simpler: {
              q: "A precedent is:",
              choices: ["A new king", "An earlier court decision that later judges follow", "A type of tax"],
              answer: 1,
              why: "Precedents are earlier decisions that guide later cases.",
              hints: [
                "Kings come and go, but precedents are court decisions.",
                "",
                "Taxes are payments. A precedent is a past ruling.",
              ],
            },
          },
        },
        {
          title: "From Runnymede to the Bill of Rights",
          teach:
            `Magna Carta kept coming back whenever English rulers overreached. A statute of 1354 restated "the law of the land" as "due process of the law." In 1628 King Charles I was jailing men who refused to pay forced loans without stating any charge. Sir Edward Coke, a former chief justice and member of Parliament, led the Petition of Right against him, declaring that Magna Carta "will have no sovereign." The Habeas Corpus Act of 1679 required jailers to bring a prisoner before a judge and show a lawful reason for holding him. After the Glorious Revolution, the English Bill of Rights of 1689 limited the crown further. American colonists studied these rights in William Blackstone's Commentaries on the Laws of England, published from 1765 to 1769. In 1791 the Fifth Amendment promised that no person shall "be deprived of life, liberty, or property, without due process of law."`,
          visual: {
            type: "timeline",
            events: [
              { year: 1215, label: "1215: Magna Carta", detail: "No punishment except by lawful judgment of peers or the law of the land." },
              { year: 1354, label: "1354: Due process", detail: "A statute of Edward III first uses the words due process of the law." },
              { year: 1628, label: "1628: Petition of Right", detail: "Parliament, led by Sir Edward Coke, protests jailing without a charge and taxes without consent." },
              { year: 1679, label: "1679: Habeas Corpus Act", detail: "Jailers must bring a prisoner before a judge and show a lawful reason for holding him." },
              { year: 1689, label: "1689: English Bill of Rights", detail: "After the Glorious Revolution, the crown is limited by Parliament and law." },
              { year: 1791, label: "1791: Fifth Amendment", detail: "No person shall be deprived of life, liberty, or property without due process of law." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put these steps in the growth of due process in order, earliest first.",
            steps: [
              "Magna Carta is sealed at Runnymede",
              "A statute first uses the words due process of the law",
              "Coke leads Parliament's Petition of Right against Charles I",
              "The Habeas Corpus Act requires a lawful reason to hold a prisoner",
              "The Fifth Amendment is ratified in the United States",
            ],
            hint: "Medieval England first, then the 1600s struggles with the Stuart kings, then America.",
            mistakes: [
              { match: "Habeas Corpus before Petition", coach: "The Petition of Right came in 1628, about fifty years before the Habeas Corpus Act of 1679." },
              { match: "Due process statute after 1600s", coach: "The phrase due process of the law first appeared in a statute of 1354, long before the Stuart kings." },
            ],
            seconds: 45,
          },
          think: {
            q: "What does a writ of habeas corpus require?",
            choices: [
              "That the king approve every trial",
              "That a jailer bring a prisoner before a judge and show a lawful reason for holding him",
              "That all prisoners be released at once",
              "That trials be held in secret",
            ],
            answer: 1,
            why: "Habeas corpus prevents secret or unexplained imprisonment by requiring the government to justify it before a judge.",
            hints: [
              "Habeas corpus limits the ruler's power. It does not give the king more control.",
              "",
              "A prisoner held for a lawful reason can stay in jail. The point is that the reason must be shown.",
              "Habeas corpus brings imprisonment into the open, the opposite of secrecy.",
            ],
          },
          approaches: {
            analogy:
              "Due process is like the rule that a teacher must show you the test and the answer key before taking points away. The decision might still go against you, but it cannot be made in secret or on a whim.",
            example:
              "In 1627 several knights were jailed for refusing to pay a forced loan to Charles I, and the king's officers gave no charge. Parliament's Petition of Right in 1628 protested exactly this, pointing back to Magna Carta's promise of the law of the land.",
            simpler: {
              q: "Which American document promises no one will be deprived of liberty without due process of law?",
              choices: ["The Articles of Confederation", "The Mayflower Compact", "The Fifth Amendment"],
              answer: 2,
              why: "The Fifth Amendment, ratified in 1791, contains the due process clause.",
              hints: [
                "The Articles of Confederation set up the first national government but had no bill of rights.",
                "The Mayflower Compact of 1620 was an agreement to form a self-governing colony, not a list of trial rights.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each situation: does it respect due process, or violate it?",
        buckets: ["Respects due process", "Violates due process"],
        items: [
          { text: "A man accused of theft is tried by a jury and may answer the charges", bucket: 0 },
          { text: "A prisoner is brought before a judge, who asks the jailer for the lawful reason", bucket: 0 },
          { text: "A judge follows the same rule used in earlier, similar cases", bucket: 0 },
          { text: "A landowner keeps his farm until a court lawfully decides otherwise", bucket: 0 },
          { text: "The king's officer jails a critic without naming any charge", bucket: 1 },
          { text: "A rich man pays the judge to win his case", bucket: 1 },
          { text: "A trial is delayed for years so the accused cannot clear his name", bucket: 1 },
          { text: "A man's land is seized because the ruler dislikes him", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain how Magna Carta and the common law limited the power of rulers, and trace how those ideas reached the American Bill of Rights.",
        keyPoints: [
          "In 1215 the barons forced King John to accept written limits at Runnymede.",
          "No punishment except by lawful judgment of peers or the law of the land; justice not sold, denied or delayed.",
          "The common law used judges, juries and precedent, and held that even the king is under the law.",
          "Later steps like the Petition of Right, habeas corpus and the 1689 Bill of Rights led to the Fifth Amendment's due process.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these milestones of the rule of law on the timeline.",
          min: 1150,
          max: 1800,
          step: 1,
          tolerance: 10,
          items: [
            { label: "Assize of Clarendon under Henry II", value: 1166 },
            { label: "Magna Carta at Runnymede", value: 1215 },
            { label: "Petition of Right", value: 1628 },
            { label: "Habeas Corpus Act", value: 1679 },
            { label: "Fifth Amendment ratified", value: 1791 },
          ],
          hint: "Two events are medieval, two come from the struggles with the Stuart kings in the 1600s, and one is American.",
          mistakes: [
            { match: "Clarendon after Magna Carta", coach: "Henry II's reforms came first. He was King John's father." },
            { match: "Petition after Habeas Corpus", coach: "The Petition of Right (1628) came about fifty years before the Habeas Corpus Act (1679)." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "Magna Carta promised that no free man would be imprisoned except by the lawful judgment of his {0} or by the law of the {1}.",
          blanks: [{ answers: ["peers", "equals"] }, { answers: ["land"] }],
          hint: "Think of a jury of people like you, and the law that governs the whole country.",
          mistakes: [
            { match: "king", coach: "The whole point was that the king alone could not decide. Who judges you in a fair trial?" },
            { match: "church", coach: "This clause is about the law that rules the country, not church law." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build Bracton's principle of the rule of law.",
          tiles: ["The king", "is under", "the law,", "because", "law makes the king"],
          distractors: ["is above", "the king makes the law"],
          hint: "Bracton put the law above the ruler and said where the king's authority comes from.",
          mistakes: [
            { match: "is above", coach: "That is the idea Bracton rejected. In the common law, the king is under the law." },
            { match: "the king makes the law", coach: "Bracton turned that around: law makes the king, not the other way." },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each document to what it did.",
          pairs: [
            { left: "Magna Carta (1215)", right: "Bound King John to the law of the land" },
            { left: "Petition of Right (1628)", right: "Protested jailing without charge and taxes without consent" },
            { left: "Habeas Corpus Act (1679)", right: "Required a lawful reason, shown to a judge, to hold a prisoner" },
            { left: "Fifth Amendment (1791)", right: "Promised due process of law to every person in the United States" },
          ],
          hint: "Use the dates: medieval king, Stuart king, prisoners' rights, then America.",
          mistakes: [
            { match: "Swapped Petition and Habeas Corpus", coach: "The Petition of Right was a protest to Charles I; the Habeas Corpus Act was a law setting rules for jailers." },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "Where did King John agree to Magna Carta in June 1215?",
          choices: ["The Tower of London", "Runnymede, a meadow by the Thames", "Westminster Abbey", "Normandy"],
          answer: 1,
          why: "John met the rebel barons at Runnymede, beside the River Thames.",
        },
        {
          q: "What is a precedent in the common law?",
          choices: [
            "A royal command that cannot be questioned",
            "A tax on land",
            "An earlier court decision that later judges follow",
          ],
          answer: 2,
          why: "Following precedent keeps the law consistent from case to case.",
        },
        {
          q: "Which promise comes from Magna Carta?",
          choices: [
            "To no one will we sell, to no one deny or delay right or justice",
            "Ambition must be made to counteract ambition",
            "A house divided against itself cannot stand",
            "Let the welfare of the people be the supreme law",
          ],
          answer: 0,
          why: "Clause 40 of the 1215 charter promised that justice would not be sold, denied or delayed.",
        },
        {
          q: "Who used Magna Carta to challenge King Charles I in 1628?",
          choices: ["William Blackstone", "Henry II", "King John", "Sir Edward Coke"],
          answer: 3,
          why: "Coke led Parliament's Petition of Right against jailing without charge and forced loans.",
        },
        {
          q: "Which American text echoes Magna Carta's law of the land as due process of law?",
          choices: ["The Fifth Amendment", "The Declaration of Independence's list of colonies", "The Articles of Confederation"],
          answer: 0,
          why: "The Fifth Amendment (1791) forbids depriving anyone of life, liberty or property without due process of law.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make an illustrated timeline poster called From Runnymede to the Bill of Rights. Include at least six events from 1166 to 1791, a short quotation from a primary source for at least three of them, and one sentence on each explaining how it limited the power of rulers.",
        rubric: [
          "Includes at least six accurate events with correct dates in order.",
          "Quotes at least three primary sources accurately and briefly.",
          "Explains how each event limited power or protected due process.",
          "Is neat, readable and clearly connects England to America.",
        ],
      },
    },
    // ------------------------------------------------------------------
    {
      id: "history-hs.constitution",
      title: "The Constitutional Convention and the Federalist Papers",
      minutes: 40,
      stage: "rhetoric",
      subject: "U.S. Constitution",
      read: `After winning independence, the United States nearly came apart. Under the Articles of Confederation, ratified in 1781, Congress could not tax, could not regulate trade between the states, and had no national executive or courts. Changing the Articles required the agreement of all thirteen states. When indebted farmers led by Daniel Shays closed courts in Massachusetts in 1786 and 1787, many leaders feared the young nation could not keep order or pay its debts.

On 25 May 1787, delegates gathered in the Pennsylvania State House in Philadelphia, today called Independence Hall. Fifty-five delegates from twelve states attended at various times; Rhode Island refused to send anyone. George Washington presided, and James Madison took careful notes. The Virginia Plan proposed three branches and a two-house Congress based on population. Small states answered with the New Jersey Plan: one house with an equal vote for each state. Roger Sherman and Oliver Ellsworth of Connecticut offered the Great Compromise, adopted on 16 July: a House based on population and a Senate with two senators per state. On 17 September 1787, thirty-nine delegates signed the Constitution.

The framers built on the French writer Montesquieu, who taught that liberty requires separating legislative, executive and judicial power. Madison warned in Federalist No. 47 that putting all three in the same hands "may justly be pronounced the very definition of tyranny." In Federalist No. 51 he explained the cure: "Ambition must be made to counteract ambition." Each branch received ways to check the others: the veto, the override, Senate confirmation, impeachment and the courts.

The Constitution also divided power between the national government and the states, a system called federalism. Madison wrote in Federalist No. 45 that the national powers were "few and defined." Anti-Federalists such as George Mason and Patrick Henry feared a distant central government and demanded a bill of rights. To persuade New York, Alexander Hamilton, Madison and John Jay wrote 85 essays under the name Publius, known as the Federalist Papers. New Hampshire became the ninth state to ratify on 21 June 1788, putting the Constitution into effect, and the promised Bill of Rights was ratified in 1791.`,
      keyIdeas: [
        "The weak Articles of Confederation led to the Constitutional Convention of 1787 in Philadelphia.",
        "The Great Compromise balanced large and small states with a House by population and an equal Senate.",
        "Separation of powers, checks and balances, and federalism divide power so that ambition counteracts ambition.",
        "The Federalist Papers argued for ratification; Anti-Federalist concerns led to the Bill of Rights.",
      ],
      hook: {
        text: "In the summer of 1787, fifty-five delegates met behind closed windows in a hot Philadelphia hall and swore to keep their debates secret. Their job was only to revise the Articles of Confederation. Instead, they wrote an entirely new plan of government that still governs the United States today. Why did they dare to start over, and how did they keep any one person or group from grabbing all the power?",
      },
      teach: [
        {
          title: "A Government Too Weak to Govern",
          teach:
            `After independence, the states were held together by the Articles of Confederation, ratified in 1781. The Articles were designed to keep power away from a distant central government, and they succeeded too well. Congress could ask the states for money but could not tax. It could not regulate trade between the states, which taxed one another's goods. There was no national executive to enforce laws and no national courts. Each state had one vote, and changing the Articles required all thirteen states to agree. In 1786 and 1787, indebted farmers led by Daniel Shays closed courts in western Massachusetts, and Congress could do little. Alarmed, Congress called for a convention in Philadelphia "for the sole and express purpose of revising the Articles of Confederation." On 25 May 1787, the delegates gathered in the Pennsylvania State House, chose George Washington to preside, and agreed to keep their debates secret.`,
          visual: {
            type: "compare",
            left: {
              title: "Articles of Confederation (1781)",
              points: [
                "Congress could not tax",
                "No power to regulate trade between states",
                "No national executive or courts",
                "Changes required all 13 states",
              ],
            },
            right: {
              title: "Constitution (1787)",
              points: [
                "Congress can lay and collect taxes",
                "Congress regulates trade among the states",
                "A President and a Supreme Court",
                "Amendments need three-fourths of the states",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "Under the Articles of Confederation, Congress could not {0} the people, and changing the Articles required all {1} states to agree. When farmers led by Daniel {2} closed courts in Massachusetts, leaders called a convention in Philadelphia.",
            blanks: [{ answers: ["tax"] }, { answers: ["13", "thirteen"] }, { answers: ["Shays"] }],
            bank: ["tax", "13", "Shays", "draft", "9", "Hamilton"],
            hint: "Think of money, the number of original states, and the farmer whose name is on the 1786 rebellion.",
            mistakes: [
              { match: "9", coach: "Nine states were later needed to ratify the Constitution. Changing the Articles took every state." },
              { match: "Hamilton", coach: "Hamilton was a delegate in Philadelphia. The rebellion in Massachusetts was named for Daniel Shays." },
              { match: "draft", coach: "The Articles' biggest money problem was that Congress could not raise taxes." },
            ],
            seconds: 35,
          },
          think: {
            q: "What was the main weakness of the Articles of Confederation?",
            choices: [
              "The national government was too powerful",
              "There were too many national courts",
              "Congress lacked power to tax, regulate trade or enforce its laws",
              "The President had too much power",
            ],
            answer: 2,
            why: "The Articles left Congress unable to raise money, manage trade or enforce laws.",
            hints: [
              "That was the fear the Articles were designed around. The result was the opposite problem.",
              "There were no national courts at all under the Articles.",
              "",
              "There was no President under the Articles. That office was created in 1787.",
            ],
          },
          approaches: {
            analogy:
              "The Articles were like a club where the treasurer can only ask members to pay dues, never require it, and every rule change needs every single member to agree. The club means well but cannot pay its bills.",
            example:
              "During Shays' Rebellion, Congress could not raise an army to restore order, so Massachusetts paid for a militia partly with money from private citizens. The episode convinced many, including George Washington, that the system needed fixing.",
            simpler: {
              q: "In what city did the Constitutional Convention meet in 1787?",
              choices: ["Boston", "New York", "Philadelphia"],
              answer: 2,
              why: "The delegates met in the Pennsylvania State House in Philadelphia.",
              hints: [
                "Boston was near Shays' Rebellion, but the convention met elsewhere.",
                "New York was where the Federalist Papers were published later.",
                "",
              ],
            },
          },
        },
        {
          title: "Big States, Small States and the Great Compromise",
          teach:
            `The delegates quickly decided to write a new plan instead of patching the old one. The Virginia Plan, drafted largely by James Madison and presented by Edmund Randolph, proposed three branches and a two-house Congress with seats based on population. Large states loved it. Small states feared being swallowed, and William Paterson offered the New Jersey Plan: a single house in which every state had an equal vote. For weeks of summer heat the convention deadlocked. Then Roger Sherman and Oliver Ellsworth of Connecticut offered a middle path. The House of Representatives would be based on population, and the Senate would give every state two senators. On 16 July 1787 the Great Compromise passed by a single state's vote. On 17 September, thirty-nine delegates signed. Benjamin Franklin, looking at the sun carved on Washington's chair, said he now knew it was "a rising and not a setting Sun."`,
          visual: {
            type: "compare",
            left: {
              title: "Virginia Plan",
              points: [
                "Drafted largely by James Madison",
                "Two houses, both based on population",
                "Favored large states like Virginia",
                "Three separate branches",
              ],
            },
            right: {
              title: "New Jersey Plan",
              points: [
                "Proposed by William Paterson",
                "One house, one equal vote per state",
                "Favored small states like Delaware",
                "Kept closer to the Articles",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each feature into the plan it belongs to.",
            buckets: ["Virginia Plan", "New Jersey Plan", "Great Compromise"],
            items: [
              { text: "Both houses of Congress based on population", bucket: 0 },
              { text: "Drafted largely by James Madison", bucket: 0 },
              { text: "One house with an equal vote for every state", bucket: 1 },
              { text: "Proposed by William Paterson", bucket: 1 },
              { text: "House by population, Senate with two per state", bucket: 2 },
              { text: "Offered by Roger Sherman and Oliver Ellsworth", bucket: 2 },
              { text: "Adopted on 16 July 1787", bucket: 2 },
            ],
            hint: "One plan favored big states, one favored small states, and the compromise took a piece of each.",
            mistakes: [
              { match: "Sherman under Virginia", coach: "Sherman and Ellsworth were from Connecticut, and they designed the middle path." },
              { match: "Equal vote under Virginia", coach: "Large states wanted population to count. The equal vote was the small states' demand." },
            ],
            seconds: 60,
          },
          think: {
            q: "How did the Great Compromise satisfy both large and small states?",
            choices: [
              "It abolished the states",
              "It gave every state the same number of representatives in both houses",
              "It let large states choose all the senators",
              "It based the House on population and gave every state two senators",
            ],
            answer: 3,
            why: "Large states got a House based on population; small states got equal representation in the Senate.",
            hints: [
              "The states survived. The compromise was about how they would be represented.",
              "That was close to the small states' plan. The compromise gave large states something too.",
              "Each state chose its own senators. That would have defeated the point.",
              "",
            ],
          },
          approaches: {
            analogy:
              "It is like two families sharing a vacation house. The bigger family gets more bedrooms, but each family gets an equal vote on the house rules. Neither gets everything, and both can live with it.",
            example:
              "Today a large state may have dozens of members in the House while a small state has one, yet in the Senate each has exactly two. A law must pass both houses, so it needs support from both the people and the states.",
            simpler: {
              q: "How many senators does each state have?",
              choices: ["One", "Two", "It depends on population"],
              answer: 1,
              why: "The Great Compromise gave every state two senators.",
              hints: [
                "Each state actually sends a pair of senators.",
                "",
                "Population decides House seats, not Senate seats.",
              ],
            },
          },
        },
        {
          title: "Ambition Against Ambition",
          teach:
            `The framers studied the French writer Montesquieu, whose Spirit of the Laws (1748) argued that liberty is lost when the same person or body makes, enforces and judges the laws. Madison agreed in Federalist No. 47: "The accumulation of all powers, legislative, executive, and judiciary, in the same hands... may justly be pronounced the very definition of tyranny." So the Constitution separates power into three branches. But separation alone was not enough. In Federalist No. 51 Madison wrote, "If men were angels, no government would be necessary," and "Ambition must be made to counteract ambition." Each branch was given tools to check the others. The President can veto a bill; Congress can override with two-thirds of both houses. The Senate confirms judges and approves treaties. The House can impeach officials, and the Senate tries them. In Marbury v. Madison (1803), the Supreme Court affirmed its power to strike down laws that conflict with the Constitution.`,
          visual: {
            type: "hotspots",
            title: "Checks and Balances",
            center: "The Constitution",
            spots: [
              { label: "Congress makes laws", icon: "🏛️", detail: "Can override a veto with two-thirds of both houses, controls spending, and can impeach and remove officials." },
              { label: "President enforces", icon: "🦅", detail: "Can veto bills, commands the military, and nominates judges and officers." },
              { label: "Courts judge", icon: "⚖️", detail: "Decide cases and can strike down laws that conflict with the Constitution (Marbury v. Madison, 1803)." },
              { label: "Senate consent", icon: "✍️", detail: "Confirms the President's nominees and approves treaties by a two-thirds vote." },
              { label: "Impeachment", icon: "🔨", detail: "The House brings charges; the Senate holds the trial; two-thirds are needed to remove." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each check to the branch it restrains.",
            pairs: [
              { left: "President vetoes a bill", right: "Checks Congress's power to make laws" },
              { left: "Congress overrides a veto by two-thirds", right: "Checks the President's veto" },
              { left: "Senate rejects a judicial nominee", right: "Checks the President's power to appoint" },
              { left: "Court strikes down an unconstitutional law", right: "Checks laws passed by Congress" },
              { left: "House impeaches a federal judge", right: "Checks the judiciary" },
            ],
            hint: "For each action, ask which branch is acting and whose decision it blocks.",
            mistakes: [
              { match: "Swapped veto and override", coach: "The veto is the President blocking Congress. The override is Congress answering back." },
              { match: "Swapped strike down and impeach", coach: "Courts strike down laws. Impeachment is Congress acting against officials, including judges." },
            ],
            seconds: 60,
          },
          think: {
            q: "What did Madison mean by \"Ambition must be made to counteract ambition\"?",
            choices: [
              "Leaders should have no ambition",
              "Each branch should have the motive and means to resist the others' overreach",
              "The most ambitious branch should win",
              "Citizens should never run for office",
            ],
            answer: 1,
            why: "Madison expected people to seek power, so he gave each branch tools to block the others.",
            hints: [
              "Madison assumed people are ambitious; he did not expect angels. The question is how to use that.",
              "",
              "The goal was balance, so no branch could simply win.",
              "Madison wanted citizens to serve. His point was about how the branches restrain each other.",
            ],
          },
          approaches: {
            analogy:
              "When two kids split a cake, one cuts and the other chooses first. Neither has to be a saint: the cutter's own self-interest makes him cut fairly. Checks and balances use ambition the same way.",
            example:
              "Suppose Congress passes a bill the President thinks is unwise. He vetoes it. If two-thirds of both houses still want it, they override the veto. If the law later violates the Constitution, a court can strike it down. Three different groups, each guarding its own power, all had to weigh in.",
            simpler: {
              q: "Which branch makes the laws?",
              choices: ["Congress", "The President", "The courts"],
              answer: 0,
              why: "Congress, the legislative branch, makes the laws.",
              hints: [
                "",
                "The President enforces the laws and can veto bills, but does not write them.",
                "Courts interpret laws in cases; they do not pass them.",
              ],
            },
          },
        },
        {
          title: "Federalism and the Fight to Ratify",
          teach:
            `The Constitution needed approval from conventions in nine of the thirteen states. Opponents, called Anti-Federalists, included George Mason and Patrick Henry. They feared a powerful, distant government and protested that the Constitution had no bill of rights. To win over New York, Alexander Hamilton, James Madison and John Jay wrote 85 essays in newspapers from 1787 to 1788, all signed Publius. In Federalist No. 10 Madison argued that a large republic, with many competing groups, would keep any one faction from dominating. In No. 45 he defended federalism, the division of power between the nation and the states: "The powers delegated by the proposed Constitution to the federal government are few and defined. Those which are to remain in the State governments are numerous and indefinite." On 21 June 1788, New Hampshire became the ninth state to ratify. Federalists promised amendments, and the Bill of Rights, including the Tenth Amendment reserving powers to the states or the people, was ratified in 1791.`,
          visual: {
            type: "compare",
            left: {
              title: "Federalists",
              points: [
                "Hamilton, Madison, Jay",
                "A stronger national government was needed",
                "A large republic controls factions",
                "National powers are few and defined",
              ],
            },
            right: {
              title: "Anti-Federalists",
              points: [
                "George Mason, Patrick Henry",
                "Feared a distant, powerful government",
                "Liberty is safest in small republics",
                "Demanded a bill of rights",
              ],
            },
          },
          probe: {
            type: "number",
            prompt: "Hamilton wrote about 51 of the Federalist essays, Madison about 29 and John Jay 5. How many essays did Publius publish in all?",
            answer: 85,
            tolerance: 0,
            unit: "essays",
            hint: "Add the three authors' totals together.",
            mistakes: [
              { match: "80", coach: "Check your addition: 51 + 29 is 80, but Jay's 5 essays still need to be added." },
              { match: "13", coach: "Thirteen is the number of states. Add up the essays from the three authors." },
              { match: "9", coach: "Nine states were needed to ratify. The question asks for the number of essays." },
            ],
            seconds: 30,
          },
          think: {
            q: "What did Anti-Federalists most want added to the Constitution?",
            choices: [
              "A king",
              "More power for Congress to tax",
              "The removal of the Senate",
              "A bill of rights",
            ],
            answer: 3,
            why: "Anti-Federalists feared a strong central government without written protections, and the Bill of Rights answered that concern.",
            hints: [
              "No one at the time wanted a king; the Revolution had just been fought against one.",
              "Anti-Federalists wanted less national power, not more.",
              "The Senate was part of the Great Compromise that protected small states. Their main demand was something else.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Federalism is like a school district and its schools. The district handles a few big shared matters, while each school runs most of its own daily life. Each has its own sphere, and neither can simply take over the other.",
            example:
              "Under federalism, Congress handles national matters such as coining money, declaring war and regulating trade between states, while states handle most matters of daily life, such as running local schools and licensing businesses.",
            simpler: {
              q: "Federalism means power is divided between:",
              choices: ["The President and the Senate", "The national government and the states", "Judges and juries"],
              answer: 1,
              why: "Federalism divides power between the national government and the state governments.",
              hints: [
                "That is a division inside the national government. Federalism is about levels of government.",
                "",
                "Judges and juries share work in courts, but federalism is about nation and states.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each example into the constitutional principle it shows best.",
        buckets: ["Separation of powers", "Checks and balances", "Federalism"],
        items: [
          { text: "Congress makes laws, the President enforces them, courts judge cases", bucket: 0 },
          { text: "Three branches described in three separate articles of the Constitution", bucket: 0 },
          { text: "The President vetoes a bill", bucket: 1 },
          { text: "The Senate refuses to confirm a nominee", bucket: 1 },
          { text: "Congress overrides a veto with two-thirds of both houses", bucket: 1 },
          { text: "States run most local schools while the nation coins money", bucket: 2 },
          { text: "The Tenth Amendment reserves powers to the states or the people", bucket: 2 },
          { text: "National powers are few and defined; state powers are numerous", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Explain why the framers replaced the Articles of Confederation and how the Constitution prevents any one person or group from holding all power. Use at least one quotation from the Federalist Papers.",
        keyPoints: [
          "The Articles were too weak: Congress could not tax, regulate trade or enforce laws.",
          "The Great Compromise balanced large and small states with the House and Senate.",
          "Separation of powers and checks and balances let ambition counteract ambition.",
          "Federalism divides power between the nation and the states.",
          "The Federalist Papers argued for ratification, and the Bill of Rights answered Anti-Federalist fears.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events of the founding era on the timeline.",
          min: 1775,
          max: 1810,
          step: 1,
          tolerance: 1,
          items: [
            { label: "Articles of Confederation ratified", value: 1781 },
            { label: "Shays' Rebellion begins", value: 1786 },
            { label: "Constitution signed", value: 1787 },
            { label: "Bill of Rights ratified", value: 1791 },
            { label: "Marbury v. Madison", value: 1803 },
          ],
          hint: "The Articles came during the Revolutionary War; the Constitution came the year after Shays' Rebellion began; the Bill of Rights four years later.",
          mistakes: [
            { match: "Bill of Rights in 1787", coach: "The Bill of Rights came later, ratified in 1791, as a promise to win support for the Constitution." },
            { match: "Marbury before 1800", coach: "Marbury v. Madison was decided in 1803, under Chief Justice John Marshall." },
          ],
          seconds: 50,
        },
        {
          type: "match",
          prompt: "Match each Federalist essay to its main idea.",
          pairs: [
            { left: "Federalist No. 10", right: "A large republic keeps any one faction from dominating" },
            { left: "Federalist No. 45", right: "Federal powers are few and defined; state powers numerous" },
            { left: "Federalist No. 47", right: "All powers in the same hands is the very definition of tyranny" },
            { left: "Federalist No. 51", right: "Ambition must be made to counteract ambition" },
          ],
          hint: "One is about factions, one about federalism, one about separating powers and one about checks.",
          mistakes: [
            { match: "Swapped 47 and 51", coach: "No. 47 warns against concentrating power; No. 51 explains how checks keep the branches apart." },
          ],
          seconds: 50,
        },
        {
          type: "build",
          prompt: "Build Madison's famous sentence from Federalist No. 51.",
          tiles: ["If men", "were angels,", "no government", "would be necessary"],
          distractors: ["were kings,", "every government"],
          hint: "Madison compared people to heavenly beings who would never need to be governed.",
          mistakes: [
            { match: "were kings,", coach: "Madison's comparison was to angels, beings who always do right." },
            { match: "every government", coach: "His point was that perfect people would need no government at all." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "The Great Compromise created a House of Representatives based on {0} and a Senate in which every state has {1} senators. It was proposed by Roger {2} and Oliver Ellsworth of Connecticut.",
          blanks: [{ answers: ["population"] }, { answers: ["two", "2"] }, { answers: ["Sherman"] }],
          hint: "Large states got one house, small states the other, and the compromise came from Connecticut.",
          mistakes: [
            { match: "wealth", coach: "House seats are based on the number of people, counted in a census." },
            { match: "Madison", coach: "Madison drafted the Virginia Plan. The compromise came from the Connecticut delegates." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "How many state conventions had to ratify the Constitution before it could take effect?",
          answer: 9,
          tolerance: 0,
          unit: "states",
          hint: "It was fewer than all 13: about two-thirds of the states.",
          mistakes: [
            { match: "13", coach: "Requiring all 13, as the Articles did for changes, was exactly the trap the framers avoided." },
          ],
          seconds: 20,
        },
      ],
      check: [
        {
          q: "Which state refused to send delegates to the Constitutional Convention?",
          choices: ["Virginia", "New Jersey", "Rhode Island", "Connecticut"],
          answer: 2,
          why: "Rhode Island stayed away; twelve states sent delegates.",
        },
        {
          q: "Which French writer influenced the framers' idea of separating powers?",
          choices: ["Montesquieu", "Blackstone", "Polybius", "Voltaire"],
          answer: 0,
          why: "Montesquieu's Spirit of the Laws (1748) argued that liberty requires separate legislative, executive and judicial powers.",
        },
        {
          q: "Who wrote the Federalist Papers under the name Publius?",
          choices: [
            "Washington, Franklin and Adams",
            "Mason, Henry and Paterson",
            "Sherman, Ellsworth and Randolph",
            "Hamilton, Madison and Jay",
          ],
          answer: 3,
          why: "Alexander Hamilton, James Madison and John Jay wrote the 85 essays.",
        },
        {
          q: "Which is an example of checks and balances?",
          choices: [
            "Congress overriding a President's veto",
            "A state running its own schools",
            "Each state having two senators",
          ],
          answer: 0,
          why: "An override lets Congress check the President's veto.",
        },
        {
          q: "Which state's ratification on 21 June 1788 put the Constitution into effect?",
          choices: ["New York", "New Hampshire", "Virginia", "Delaware"],
          answer: 1,
          why: "New Hampshire was the ninth state, the number required for the Constitution to take effect.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Hold a ratification debate at home. One person argues as a Federalist and one as an Anti-Federalist about whether your state should ratify the Constitution in 1788. Each side gives a two-minute opening using at least one real quotation, then answers one question from the other side. Switch sides and repeat.",
        rubric: [
          "States a clear position as a Federalist or Anti-Federalist.",
          "Uses at least one accurate quotation or idea from the period.",
          "Answers the other side's strongest argument respectfully.",
          "Argues the opposite side fairly after switching.",
        ],
      },
    },
    // ------------------------------------------------------------------
    {
      id: "history-hs.civil-war",
      title: "The Civil War and Lincoln: Union and Freedom",
      minutes: 40,
      stage: "rhetoric",
      subject: "History",
      read: `By the 1850s, the United States was divided over whether slavery would spread into the western territories. The Kansas-Nebraska Act of 1854 let settlers vote on the question, and fighting broke out in Kansas. In 1857 the Supreme Court ruled in the Dred Scott case that Congress could not ban slavery in the territories. In 1858 Abraham Lincoln warned: "A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free."

Lincoln was elected President in November 1860, pledging to stop slavery's spread. South Carolina seceded in December, and by February 1861 seven states had formed the Confederacy. Mississippi's declaration of secession stated plainly: "Our position is thoroughly identified with the institution of slavery." On 12 April 1861, Confederate guns fired on Fort Sumter, and war began.

At first Lincoln's goal was to preserve the Union. In August 1862 he wrote, "My paramount object in this struggle is to save the Union." But he had already drafted an emancipation order. After the Union victory at Antietam in September 1862, he announced it, and on 1 January 1863 the Emancipation Proclamation declared that enslaved people in the Confederate states "are, and henceforward shall be free." Black men could now enlist, and about 180,000 served in the Union Army.

In July 1863 the Union won at Gettysburg. On 19 November 1863, Lincoln spoke at the new cemetery there for about two minutes. He began, "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal." He closed by calling for "a new birth of freedom" so that "government of the people, by the people, for the people, shall not perish from the earth."

Because the Proclamation was a war measure, Lincoln pressed for a permanent amendment. Congress passed the Thirteenth Amendment in January 1865, abolishing slavery throughout the nation; it was ratified that December. In his Second Inaugural, Lincoln urged "malice toward none" and "charity for all." General Lee surrendered at Appomattox on 9 April 1865. Five days later Lincoln was shot, and he died the next morning. The Union was saved, and slavery was ended.`,
      keyIdeas: [
        "The conflict over slavery's spread divided the nation and led to secession and war in 1861.",
        "Lincoln's first aim was to save the Union; the Emancipation Proclamation (1863) made ending slavery a war aim.",
        "The Gettysburg Address tied the war to the Declaration's promise that all men are created equal.",
        "The Thirteenth Amendment (1865) abolished slavery permanently throughout the United States.",
      ],
      hook: {
        text: "On 19 November 1863, a famous speaker talked for about two hours at a new soldiers' cemetery in Gettysburg, Pennsylvania. Then President Abraham Lincoln stood up and spoke for about two minutes, fewer than three hundred words. Today almost no one remembers the long speech, but Lincoln's short one is carved in stone. What did he say that mattered so much?",
      },
      teach: [
        {
          title: "A House Divided",
          teach:
            `By the 1850s, the deepest question in American politics was whether slavery would spread into the western territories. The Kansas-Nebraska Act of 1854 let settlers there vote on slavery, and armed bands fought over Kansas. In 1857, in the Dred Scott decision, the Supreme Court ruled that Black Americans could not be citizens and that Congress could not ban slavery in the territories. In June 1858, accepting a nomination for the Senate in Illinois, Abraham Lincoln said: "A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free." He lost that race but won the presidency in November 1860, pledging to stop slavery's spread. South Carolina seceded in December. Mississippi's declaration of secession explained: "Our position is thoroughly identified with the institution of slavery." On 12 April 1861, Confederate guns fired on Fort Sumter.`,
          visual: {
            type: "timeline",
            events: [
              { year: 1854, label: "1854: Kansas-Nebraska Act", detail: "Settlers in new territories may vote on slavery. Violence follows in Kansas." },
              { year: 1857, label: "1857: Dred Scott decision", detail: "The Supreme Court rules Congress cannot ban slavery in the territories." },
              { year: 1858, label: "1858: House Divided speech", detail: "Lincoln warns the nation cannot stay half slave and half free. His debates with Stephen Douglas make him famous." },
              { year: 1860, label: "1860: Lincoln elected", detail: "Lincoln wins in November. South Carolina secedes on 20 December." },
              { year: 1861, label: "1861: Fort Sumter", detail: "On 12 April, Confederate forces fire on Fort Sumter in Charleston Harbor. The war begins." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the road to war in order, earliest first.",
            steps: [
              "The Kansas-Nebraska Act lets settlers vote on slavery",
              "The Supreme Court decides the Dred Scott case",
              "Lincoln gives his House Divided speech",
              "Lincoln is elected President",
              "South Carolina secedes from the Union",
              "Confederate guns fire on Fort Sumter",
            ],
            hint: "Laws and court rulings came first, then Lincoln's rise, then secession, then shooting.",
            mistakes: [
              { match: "Secession before election", coach: "South Carolina seceded in December 1860 because Lincoln had been elected in November." },
              { match: "Dred Scott before Kansas-Nebraska", coach: "The Kansas-Nebraska Act came in 1854, three years before the Dred Scott decision in 1857." },
            ],
            seconds: 50,
          },
          think: {
            q: "What did Lincoln mean when he said the government could not endure \"permanently half slave and half free\"?",
            choices: [
              "The country would eventually have to become all one thing or all the other",
              "Half the states should leave the Union",
              "Slavery was a minor issue",
              "Congress should split into two",
            ],
            answer: 0,
            why: "Lincoln argued the conflict over slavery was too deep for the nation to stay permanently divided.",
            hints: [
              "",
              "Lincoln wanted to keep the Union together, not divide it.",
              "Lincoln called it the issue that divided the whole house. It was anything but minor.",
              "He was speaking about the nation, not about Congress's two houses.",
            ],
          },
          approaches: {
            analogy:
              "A house whose foundation is cracked down the middle cannot stand forever. Either the crack is repaired or the house falls. Lincoln used this Bible image, which his audience knew well, to describe the nation.",
            example:
              "In 1854 Congress let Kansas settlers vote on slavery. Instead of settling the question, the law drew armed groups from both sides into Kansas, and the territory saw years of violence. A compromise meant to calm the nation made the division sharper.",
            simpler: {
              q: "Where did the first shots of the Civil War take place in April 1861?",
              choices: ["Gettysburg", "Appomattox", "Fort Sumter"],
              answer: 2,
              why: "Confederate forces fired on Fort Sumter in Charleston Harbor on 12 April 1861.",
              hints: [
                "Gettysburg was fought in July 1863, more than two years later.",
                "Appomattox is where the war ended in 1865.",
                "",
              ],
            },
          },
        },
        {
          title: "Saving the Union, Then Freeing the Enslaved",
          teach:
            `At first Lincoln's goal was to restore the Union. In August 1862 he wrote to the newspaper editor Horace Greeley: "My paramount object in this struggle is to save the Union, and is not either to save or to destroy slavery." In the same letter he added that it was his personal wish that all men everywhere could be free. What Greeley did not know was that Lincoln had already drafted an emancipation order and was waiting for a victory. On 17 September 1862 the Union stopped Lee's army at Antietam, the bloodiest single day in American history. Five days later Lincoln announced his plan. On 1 January 1863 the Emancipation Proclamation declared that enslaved people in the states in rebellion "are, and henceforward shall be free." It was a war measure that did not apply to loyal border states, but every Union advance now brought freedom, and Black men could enlist.`,
          visual: {
            type: "flip",
            cards: [
              { front: "Secession", back: "A state's attempt to leave the Union. Eleven states seceded to form the Confederacy." },
              { front: "Antietam (17 September 1862)", back: "The bloodiest single day in American history. Lee's invasion was stopped, giving Lincoln the victory he needed." },
              { front: "Emancipation Proclamation", back: "Effective 1 January 1863, it declared enslaved people in the rebelling states free." },
              { front: "Border states", back: "Slave states that stayed in the Union, such as Kentucky, Maryland, Missouri and Delaware. The Proclamation did not apply there." },
              { front: "War measure", back: "An order based on the President's power as commander in chief during a rebellion." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every statement that is TRUE about the Emancipation Proclamation.",
            sentences: [
              "It took effect on 1 January 1863.",
              "It freed enslaved people in loyal border states such as Kentucky and Maryland.",
              "Lincoln issued it as a war measure, using his power as commander in chief.",
              "It permanently abolished slavery everywhere in the United States.",
              "It opened the way for Black men to serve in the Union Army and Navy.",
            ],
            correct: [0, 2, 4],
            hint: "The Proclamation applied to the states in rebellion and rested on war powers. Something else was needed to end slavery everywhere.",
            mistakes: [
              { match: "Picked border states", coach: "The Proclamation applied only to areas in rebellion. Loyal border states were not included." },
              { match: "Picked permanently abolished", coach: "A war order could be challenged later. Permanent abolition came with the Thirteenth Amendment in 1865." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Lincoln wait for a battlefield victory before announcing emancipation?",
            choices: [
              "He had not yet thought of the idea",
              "Greeley told him to wait",
              "The Constitution required a victory first",
              "So it would look like a step taken from strength, not a desperate act",
            ],
            answer: 3,
            why: "Announcing it after Antietam made emancipation a confident war aim rather than a plea from a losing side.",
            hints: [
              "Lincoln had drafted the order by July 1862, before the Greeley letter.",
              "Greeley actually wanted faster action against slavery. Lincoln's timing was his own.",
              "There is no such rule. The timing was a strategic choice.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A coach who announces a bold new strategy right after a big loss looks desperate. The same strategy announced after a win looks confident. Lincoln waited for Antietam for the same reason.",
            example:
              "When Union armies marched into Confederate territory after 1863, the Proclamation went with them. Each town they reached was a place where the President's order now declared enslaved people free, and many of the freed men joined the Union Army.",
            simpler: {
              q: "On what date did the Emancipation Proclamation take effect?",
              choices: ["4 July 1776", "1 January 1863", "9 April 1865"],
              answer: 1,
              why: "Lincoln signed the final Proclamation on 1 January 1863.",
              hints: [
                "That is the date of the Declaration of Independence.",
                "",
                "That is the date of Lee's surrender at Appomattox.",
              ],
            },
          },
        },
        {
          title: "Four Score and Seven Years Ago",
          teach:
            `From 1 to 3 July 1863, the largest battle of the war was fought at Gettysburg, Pennsylvania. Lee's invasion of the North was turned back, and the next day, 4 July, the Confederate city of Vicksburg surrendered to General Grant. That November a cemetery for the Union dead was dedicated at Gettysburg. The orator Edward Everett spoke for about two hours. Lincoln spoke for about two minutes, in roughly 272 words. He began: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal." A score is twenty, so he pointed back to 1776 and the Declaration of Independence. He asked listeners to resolve that the dead had not died in vain, "that this nation, under God, shall have a new birth of freedom." The war, he argued, was a test of whether government of the people could survive.`,
          visual: {
            type: "flip",
            cards: [
              { front: "Four score and seven", back: "4 × 20 + 7 = 87 years before 1863, which is 1776." },
              { front: "Conceived in Liberty", back: "Lincoln described the nation as born from the idea of liberty, not only from land or ancestry." },
              { front: "The proposition", back: "That all men are created equal, the central claim of the Declaration of Independence." },
              { front: "A new birth of freedom", back: "Lincoln's hope that the war would renew the nation's founding promise, now including the end of slavery." },
              { front: "Of, by, for the people", back: "Lincoln's definition of self-government, which he said must not perish from the earth." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Lincoln spoke in 1863 and said \"four score and seven years ago.\" A score is 20. What year was he pointing back to?",
            answer: 1776,
            tolerance: 0,
            hint: "Find four score and seven in years, then subtract from 1863.",
            mistakes: [
              { match: "1787", coach: "1787 is the Constitution. Work out 4 × 20 + 7, then subtract from 1863." },
              { match: "1836", coach: "It looks like you subtracted 27. Four score is 80, so the total is 87 years." },
              { match: "87", coach: "87 is how many years ago. Subtract it from 1863 to find the year." },
            ],
            seconds: 30,
          },
          think: {
            q: "Why did Lincoln point back to 1776 instead of 1787?",
            choices: [
              "He forgot when the Constitution was written",
              "He wanted to tie the war to the Declaration's principle that all men are created equal",
              "1776 was the year of the first battle of the Civil War",
              "He wanted to praise King George III",
            ],
            answer: 1,
            why: "By dating the nation to 1776, Lincoln rooted it in the Declaration of Independence and its proposition of equality.",
            hints: [
              "Lincoln knew the Constitution well. Choosing 1776 was deliberate.",
              "",
              "The Civil War began in 1861. 1776 was the year of independence.",
              "1776 was the year Americans declared independence from King George III, not a year of praise for him.",
            ],
          },
          approaches: {
            analogy:
              "When a family faces a crisis, a wise parent might say: remember why we started this family and what we promised each other. Lincoln did that for the nation, reminding it of its founding promise in 1776.",
            example:
              "Four score is 4 × 20 = 80. Add seven and you get 87. Subtract 87 from 1863 and you get 1776, the year of the Declaration of Independence, which says that all men are created equal.",
            simpler: {
              q: "How many years is a score?",
              choices: ["Ten", "Twelve", "Twenty"],
              answer: 2,
              why: "A score is twenty, so four score is eighty.",
              hints: [
                "Ten is a decade. A score is twice that.",
                "Twelve is a dozen. A score is a different number.",
                "",
              ],
            },
          },
        },
        {
          title: "With Malice Toward None",
          teach:
            `Frederick Douglass, who escaped slavery in 1838 and became a famous writer and speaker, urged that Black men be allowed to fight. After 1863 about 180,000 served in the Union Army, and their courage helped win the war. Lincoln knew the Emancipation Proclamation was a war measure that courts might later question, so he pushed for a permanent change. On 31 January 1865, Congress passed the Thirteenth Amendment: "Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States." It was ratified on 6 December 1865. In his Second Inaugural Address that March, Lincoln looked toward peace: "With malice toward none, with charity for all." On 9 April 1865, General Robert E. Lee surrendered to General Ulysses S. Grant at Appomattox Court House. Five days later, Lincoln was shot at Ford's Theatre, and he died the next morning.`,
          visual: {
            type: "timeline",
            events: [
              { year: 1863, label: "1863: Black soldiers enlist", detail: "After the Proclamation, Black men join the Union Army; about 180,000 serve by the war's end." },
              { year: 1864, label: "1864: The amendment stalls", detail: "The Senate passes the Thirteenth Amendment, but it falls short in the House. Lincoln makes it a priority." },
              { year: 1865, label: "1865: War's end and abolition", detail: "Congress passes the amendment (31 January), Lee surrenders (9 April), Lincoln dies (15 April), and the amendment is ratified (6 December)." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each date in 1865 to what happened.",
            pairs: [
              { left: "31 January 1865", right: "Congress passes the Thirteenth Amendment" },
              { left: "4 March 1865", right: "Lincoln's Second Inaugural: malice toward none" },
              { left: "9 April 1865", right: "Lee surrenders to Grant at Appomattox" },
              { left: "15 April 1865", right: "Lincoln dies after being shot at Ford's Theatre" },
              { left: "6 December 1865", right: "The Thirteenth Amendment is ratified" },
            ],
            hint: "Congress acted first in winter; the inaugural was in March; the surrender and Lincoln's death came in April; ratification took the rest of the year.",
            mistakes: [
              { match: "Swapped passage and ratification", coach: "Congress passes an amendment first; then the states ratify it. That took from January to December 1865." },
              { match: "Swapped surrender and death", coach: "Lee surrendered on 9 April. Lincoln was shot five days later and died on 15 April." },
            ],
            seconds: 60,
          },
          think: {
            q: "Why did Lincoln push for the Thirteenth Amendment even after the Emancipation Proclamation?",
            choices: [
              "The Proclamation had already ended slavery everywhere",
              "He wanted to undo the Proclamation",
              "Only an amendment could permanently abolish slavery throughout the nation",
              "The Confederacy asked him to",
            ],
            answer: 2,
            why: "The Proclamation was a war measure covering only rebel areas; an amendment made abolition permanent everywhere.",
            hints: [
              "The Proclamation applied only to areas in rebellion and rested on war powers.",
              "He wanted to make emancipation stronger, not undo it.",
              "",
              "The Confederacy fought to keep slavery. The amendment came from Lincoln and Congress.",
            ],
          },
          approaches: {
            analogy:
              "An emergency order is like a coach's rule for one game. A constitutional amendment is like changing the league's rulebook forever. Lincoln wanted freedom written into the rulebook.",
            example:
              "In Kentucky, a slave state that stayed loyal, the Emancipation Proclamation did not apply. Slavery there legally lasted until the Thirteenth Amendment was ratified in December 1865.",
            simpler: {
              q: "Which amendment abolished slavery in the United States?",
              choices: ["The First", "The Fifth", "The Thirteenth"],
              answer: 2,
              why: "The Thirteenth Amendment, ratified in 1865, abolished slavery.",
              hints: [
                "The First Amendment protects speech, press, religion and assembly.",
                "The Fifth Amendment protects due process and other rights of the accused.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each quotation into the primary source it comes from.",
        buckets: ["House Divided speech (1858)", "Letter to Greeley (1862)", "Gettysburg Address (1863)", "Second Inaugural (1865)"],
        items: [
          { text: "A house divided against itself cannot stand.", bucket: 0 },
          { text: "This government cannot endure, permanently half slave and half free.", bucket: 0 },
          { text: "My paramount object in this struggle is to save the Union.", bucket: 1 },
          { text: "Four score and seven years ago our fathers brought forth on this continent, a new nation.", bucket: 2 },
          { text: "This nation, under God, shall have a new birth of freedom.", bucket: 2 },
          { text: "With malice toward none, with charity for all.", bucket: 3 },
        ],
      },
      explain: {
        prompt:
          "Explain how Lincoln's war aims grew from saving the Union to ending slavery, using at least two of his own words or documents as evidence.",
        keyPoints: [
          "The conflict over slavery's spread led to secession and war in 1861.",
          "Lincoln's first object was to save the Union, as he wrote to Greeley in 1862.",
          "The Emancipation Proclamation (1863) made freedom a war aim and let Black men enlist.",
          "The Gettysburg Address tied the war to the Declaration's promise of equality and a new birth of freedom.",
          "The Thirteenth Amendment (1865) permanently abolished slavery.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline.",
          min: 1850,
          max: 1870,
          step: 1,
          tolerance: 0,
          items: [
            { label: "Dred Scott decision", value: 1857 },
            { label: "Attack on Fort Sumter", value: 1861 },
            { label: "Gettysburg Address", value: 1863 },
            { label: "Thirteenth Amendment ratified", value: 1865 },
          ],
          hint: "The court case came before Lincoln's election; the war began the spring after it; the address came in the middle of the war; abolition at its end.",
          mistakes: [
            { match: "Fort Sumter in 1860", coach: "Lincoln was elected in 1860, but the first shots at Fort Sumter came in April 1861." },
            { match: "Thirteenth Amendment in 1863", coach: "1863 was the Emancipation Proclamation. The amendment was ratified in December 1865." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "Four score and seven years ago our {0} brought forth on this continent, a new {1}, conceived in {2}, and dedicated to the proposition that all men are created equal.",
          blanks: [{ answers: ["fathers"] }, { answers: ["nation"] }, { answers: ["Liberty"] }],
          hint: "Lincoln spoke of the founders, the country they created, and the idea it was born from.",
          mistakes: [
            { match: "founders", coach: "Close in meaning, but Lincoln's exact word was a family word for the founding generation." },
            { match: "country", coach: "Close in meaning, but Lincoln said a new ___, the same word he used later: whether that ___ can long endure." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each person to his role in this story.",
          pairs: [
            { left: "Frederick Douglass", right: "Escaped slavery and urged that Black men be allowed to fight" },
            { left: "Horace Greeley", right: "Editor to whom Lincoln wrote about saving the Union" },
            { left: "Edward Everett", right: "Gave the two-hour speech at Gettysburg" },
            { left: "Robert E. Lee", right: "Surrendered at Appomattox Court House" },
            { left: "Ulysses S. Grant", right: "Accepted the surrender and took Vicksburg" },
          ],
          hint: "Two were generals on opposite sides, two were men of words, and one was a newspaper editor.",
          mistakes: [
            { match: "Swapped Lee and Grant", coach: "Lee commanded the Confederate army and surrendered. Grant was the Union general who accepted it." },
            { match: "Swapped Everett and Greeley", coach: "Everett was the orator at Gettysburg; Greeley was the New York editor who received Lincoln's letter." },
          ],
          seconds: 55,
        },
        {
          type: "build",
          prompt: "Build Lincoln's warning from 1858.",
          tiles: ["A house", "divided", "against itself", "cannot stand"],
          distractors: ["united", "will always stand"],
          hint: "Lincoln borrowed a Bible image about what happens to a house that is split.",
          mistakes: [
            { match: "united", coach: "Lincoln's warning was about division, not unity." },
            { match: "will always stand", coach: "His point was the opposite: a divided house will fall." },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "What did the Supreme Court rule in the Dred Scott decision of 1857?",
          choices: [
            "Slavery was abolished everywhere",
            "Congress could not ban slavery in the territories",
            "Kansas must be a free state",
            "Lincoln must free all enslaved people",
          ],
          answer: 1,
          why: "The Court ruled Congress could not ban slavery in the territories, deepening the national divide.",
        },
        {
          q: "Which battle gave Lincoln the victory he needed before announcing emancipation?",
          choices: ["Gettysburg", "Fort Sumter", "Antietam", "Appomattox"],
          answer: 2,
          why: "After Antietam on 17 September 1862, Lincoln announced the preliminary proclamation five days later.",
        },
        {
          q: "Which areas did the Emancipation Proclamation apply to?",
          choices: [
            "Every state in the Union",
            "Only the loyal border states",
            "Only the northern states",
            "The states in rebellion against the Union",
          ],
          answer: 3,
          why: "As a war measure, it applied to areas in rebellion, not to loyal border states.",
        },
        {
          q: "In the Gettysburg Address, what did Lincoln hope the nation would have?",
          choices: ["A new birth of freedom", "A new king", "A smaller army", "A new capital"],
          answer: 0,
          why: "Lincoln asked listeners to resolve that the nation shall have a new birth of freedom.",
        },
        {
          q: "What did the Thirteenth Amendment do?",
          choices: [
            "Gave the President power to free enslaved people",
            "Created the Confederacy",
            "Abolished slavery throughout the United States",
          ],
          answer: 2,
          why: "Ratified in December 1865, it made the abolition of slavery permanent and nationwide.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Memorize and recite the Gettysburg Address for your family. Before you recite it, give a one-minute introduction explaining when and why Lincoln gave it and what four score and seven years ago refers to. Afterward, explain in your own words what Lincoln meant by a new birth of freedom.",
        rubric: [
          "Recites the address accurately with clear, steady delivery.",
          "Explains the setting: the battle, the cemetery and November 1863.",
          "Correctly explains that four score and seven years points to 1776.",
          "Explains a new birth of freedom in his or her own words.",
        ],
      },
    },
    // ------------------------------------------------------------------
    {
      id: "history-hs.industrial",
      title: "The Industrial Revolution: Steam, Factories and Railroads",
      minutes: 40,
      stage: "logic",
      subject: "History",
      read: `For most of history, work was powered by muscles, wind and falling water. Beginning in Britain in the 1700s, the Industrial Revolution changed that, and with it nearly every part of daily life.

The key was steam. In 1712 Thomas Newcomen built a steam engine to pump water out of mines, but it wasted fuel by heating and cooling its cylinder with every stroke. James Watt, an instrument maker in Glasgow, solved the problem with a separate condenser, patented in 1769. In 1775 he went into partnership with the Birmingham manufacturer Matthew Boulton, who saw that the engine could power the whole economy. Boulton told a visitor in 1776, "I sell here, Sir, what all the world desires to have, Power."

Machines also transformed the making of cloth. Richard Arkwright patented his water frame in 1769 and in 1771 opened a water-powered cotton mill at Cromford, often called the first modern factory. Workers came to the machines and worked by the clock. In The Wealth of Nations (1776), Adam Smith described a pin factory where ten workers, each doing one step, could make upwards of 48,000 pins a day. Factory work also brought long hours, dangerous machines and child labor, and Britain's Factory Act of 1833 banned children under nine from most textile mills. In 1790 Samuel Slater, who had memorized British machine designs, built a cotton-spinning mill in Pawtucket, Rhode Island.

Railroads came next. George Stephenson engineered the Stockton and Darlington Railway in 1825, and his Rocket won the Rainhill Trials in 1829. The Liverpool and Manchester Railway opened in 1830. In America the transcontinental railroad was completed at Promontory Summit, Utah, on 10 May 1869, cutting a coast-to-coast trip from months to about a week. Railroads adopted standard time zones in 1883. Samuel Morse's telegraph, first demonstrated on a line from Washington to Baltimore in 1844, carried news in minutes.

Entrepreneurs turned inventions into businesses. Andrew Carnegie used the Bessemer process to make cheap steel for rails, bridges and buildings, and later gave away most of his fortune. Thomas Edison developed a long-lasting light bulb in 1879 and opened the Pearl Street power station in New York in 1882. Goods grew cheaper, cities grew larger, and ordinary families came to enjoy comforts once reserved for the rich.`,
      keyIdeas: [
        "Watt's improved steam engine gave industry a powerful, reliable source of energy.",
        "Factories and the division of labor multiplied production but also brought hard working conditions and reforms.",
        "Railroads and the telegraph shrank distances, changing trade, travel and even how people kept time.",
        "Entrepreneurs like Boulton, Carnegie and Edison turned inventions into businesses that changed daily life.",
      ],
      hook: {
        text: "In 1800, no one on Earth could travel over land faster than a galloping horse. By 1869, a passenger could ride a train from New York to San Francisco in about a week, and a telegraph message could cross the continent in minutes. What happened in between that changed daily life more than anything since the invention of farming?",
      },
      teach: [
        {
          title: "Harnessing Steam",
          teach:
            `For thousands of years, work was powered by muscles, wind and falling water. In 1712 Thomas Newcomen built a steam engine to pump water out of flooded mines. It worked, but it wasted coal, because its single cylinder was heated by steam and then cooled with water on every stroke. In 1765 James Watt, an instrument maker at the University of Glasgow, was repairing a model of a Newcomen engine when he saw the fix: condense the steam in a separate chamber so the cylinder could stay hot. He patented his separate condenser in 1769. His engine burned far less coal. In 1775 Watt went into partnership with the Birmingham manufacturer Matthew Boulton, and they later adapted the engine to turn wheels and drive factory machines. Boulton told the writer James Boswell in 1776: "I sell here, Sir, what all the world desires to have, Power." The unit of power, the watt, is named for James Watt.`,
          visual: {
            type: "compare",
            left: {
              title: "Newcomen engine (1712)",
              points: [
                "Pumped water out of mines",
                "Cylinder heated and cooled every stroke",
                "Burned a great deal of coal",
                "Up-and-down motion only",
              ],
            },
            right: {
              title: "Watt engine (patented 1769)",
              points: [
                "Separate condenser kept the cylinder hot",
                "Burned far less coal",
                "Later adapted to turn wheels",
                "Powered mills, factories and more",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "Thomas {0} built the first practical steam engine in 1712 to pump water from mines. James Watt made it far more efficient by adding a separate {1}. Watt's business partner, Matthew {2}, sold the engines to industry.",
            blanks: [{ answers: ["Newcomen"] }, { answers: ["condenser"] }, { answers: ["Boulton"] }],
            bank: ["Newcomen", "condenser", "Boulton", "Edison", "boiler", "Carnegie"],
            hint: "Watt's fix kept the cylinder hot by cooling the steam somewhere else.",
            mistakes: [
              { match: "boiler", coach: "Every steam engine had a boiler. Watt's new part was the chamber where steam turned back into water." },
              { match: "Edison", coach: "Edison worked in the late 1800s on electric light. The steam story is a century earlier." },
              { match: "Carnegie", coach: "Carnegie built steel mills in America. Watt's partner was a Birmingham manufacturer." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why was Watt's separate condenser such an important improvement?",
            choices: [
              "It made engines run on wind instead of coal",
              "It kept the cylinder hot, so the engine wasted far less fuel",
              "It made engines smaller than a teapot",
              "It replaced the need for a boiler",
            ],
            answer: 1,
            why: "Newcomen's engine reheated its cylinder every stroke; Watt's condenser let it stay hot and saved coal.",
            hints: [
              "Steam engines still burned coal. The improvement was in efficiency.",
              "",
              "Engines remained large machines. The breakthrough was about wasted heat.",
              "A boiler was still needed to make steam. The condenser changed where steam was cooled.",
            ],
          },
          approaches: {
            analogy:
              "Newcomen's engine was like heating a pot of water, dumping in ice, and then heating it again every minute. Watt's idea was to keep the pot hot and cool the steam in a separate pot instead.",
            example:
              "A mine owner using a Newcomen engine paid for huge amounts of coal just to keep pumping. Switching to a Boulton and Watt engine did the same work with far less coal, so the savings paid for the new engine, and that is how Boulton and Watt sold them.",
            simpler: {
              q: "What was the first big job of steam engines?",
              choices: ["Pumping water out of mines", "Lighting homes", "Flying airplanes"],
              answer: 0,
              why: "Newcomen's 1712 engine was built to pump water from flooded mines.",
              hints: [
                "",
                "Electric light came much later, in the 1870s and 1880s.",
                "Airplanes came in the 1900s and did not use steam.",
              ],
            },
          },
        },
        {
          title: "The Factory and the Division of Labor",
          teach:
            `Cloth was the first great factory industry. James Hargreaves' spinning jenny, invented around 1764, let one worker spin many threads at once. Richard Arkwright patented his water frame in 1769, and in 1771 he opened a water-powered cotton mill at Cromford, often called the first modern factory. Instead of spinning at home, workers came to the machines and worked set shifts by the clock. In The Wealth of Nations (1776), Adam Smith explained why this was so productive. In a pin factory, ten workers, each doing one step, could make upwards of 48,000 pins a day, while one man working alone "could scarce, perhaps, with his utmost industry, make one pin in a day." Factories also brought long hours, dangerous machines and child labor. Britain's Factory Act of 1833 banned children under nine from most textile mills. In 1790 Samuel Slater, who had memorized British designs, built a cotton-spinning mill in Pawtucket, Rhode Island.`,
          visual: {
            type: "timeline",
            events: [
              { year: 1764, label: "About 1764: Spinning jenny", detail: "James Hargreaves' machine lets one worker spin several threads at once." },
              { year: 1769, label: "1769: Water frame", detail: "Richard Arkwright patents a water-powered spinning machine." },
              { year: 1771, label: "1771: Cromford Mill", detail: "Arkwright's mill becomes a model for the factory system." },
              { year: 1776, label: "1776: The Wealth of Nations", detail: "Adam Smith explains how the division of labor multiplies production." },
              { year: 1790, label: "1790: Slater's mill", detail: "Samuel Slater builds a cotton-spinning mill in Pawtucket, Rhode Island." },
              { year: 1833, label: "1833: Factory Act", detail: "Britain bans children under nine from most textile mills and limits older children's hours." },
            ],
          },
          probe: {
            type: "number",
            prompt: "In Adam Smith's pin factory, 10 workers dividing the steps made about 48,000 pins a day. How many pins is that per worker per day?",
            answer: 4800,
            tolerance: 0,
            unit: "pins",
            hint: "Share the day's total equally among the ten workers.",
            mistakes: [
              { match: "480", coach: "Check the zeros: 48,000 divided by 10 moves the decimal just one place." },
              { match: "48000", coach: "That is the whole factory's total. Divide by the number of workers." },
              { match: "20", coach: "Twenty was Smith's upper limit for one man working alone. Now find the factory's rate per worker." },
            ],
            seconds: 30,
          },
          think: {
            q: "According to Adam Smith, why were the pin workers so productive together?",
            choices: [
              "They worked longer hours than anyone else",
              "Their machines ran on electricity",
              "Each worker specialized in one step, the division of labor",
              "They were paid by the government",
            ],
            answer: 2,
            why: "Specializing let each worker become fast and skilled at one task, multiplying total output.",
            hints: [
              "Long hours were common everywhere. Smith's point was about how the work was organized.",
              "Electric power came about a century later.",
              "",
              "Smith was describing a private workshop and how its work was divided.",
            ],
          },
          approaches: {
            analogy:
              "Making sandwiches for a big party goes faster in an assembly line: one person spreads, one adds filling, one cuts, one wraps. Each gets quick at one step, and the team makes far more than four people each doing everything.",
            example:
              "One worker alone might make at most 20 pins a day. In the factory, the same worker's share was about 4,800 pins, because one drew out the wire, another straightened it, another cut it, another sharpened the point, and so on.",
            simpler: {
              q: "What was Richard Arkwright's mill at Cromford known for?",
              choices: ["Building steam locomotives", "Being an early model of the modern factory", "Making steel for bridges"],
              answer: 1,
              why: "Cromford Mill (1771) brought workers and water-powered machines together under one roof, on a schedule.",
              hints: [
                "Locomotives came decades later, with Stephenson in the 1820s.",
                "",
                "Cheap steel came in the 1850s with the Bessemer process.",
              ],
            },
          },
        },
        {
          title: "Railroads Shrink the World",
          teach:
            `Put a steam engine on wheels and you have a locomotive. George Stephenson engineered the Stockton and Darlington Railway, which opened in 1825. In 1829 the Rocket, built by Stephenson and his son Robert, won the Rainhill Trials, reaching close to 30 miles an hour. In 1830 the Liverpool and Manchester Railway opened as the first intercity line run entirely by steam locomotives on a timetable. Railroads spread rapidly in Britain and America. On 10 May 1869 the Central Pacific and Union Pacific lines met at Promontory Summit, Utah, completing the first transcontinental railroad and cutting a coast-to-coast journey from months to about a week. Trains needed reliable schedules, so in 1883 American railroads adopted standard time zones. Alongside the tracks ran telegraph wires. Samuel Morse's first long-distance line, from Washington to Baltimore, carried the message "What hath God wrought" in 1844. News that once took weeks now took minutes.`,
          visual: {
            type: "hotspots",
            title: "How Railroads Changed Life",
            center: "The Railroad",
            spots: [
              { label: "Speed", icon: "🚂", detail: "Trains moved people and goods many times faster than horses or canal boats." },
              { label: "Markets", icon: "📦", detail: "Farmers and factories could sell to distant cities, so goods grew cheaper." },
              { label: "Time zones", icon: "🕰️", detail: "In 1883 American railroads adopted standard time so schedules made sense across the country." },
              { label: "Telegraph", icon: "📡", detail: "Wires along the tracks carried news and train orders in minutes." },
              { label: "Steel and coal", icon: "⛏️", detail: "Building and running railroads created huge demand for iron, steel and coal." },
            ],
          },
          probe: {
            type: "place",
            prompt: "Place these milestones of the transportation and communication revolution on the timeline.",
            min: 1820,
            max: 1890,
            step: 1,
            tolerance: 2,
            items: [
              { label: "Stockton and Darlington Railway opens", value: 1825 },
              { label: "Liverpool and Manchester Railway opens", value: 1830 },
              { label: "Morse's telegraph line to Baltimore", value: 1844 },
              { label: "Transcontinental railroad completed", value: 1869 },
              { label: "Railroads adopt standard time zones", value: 1883 },
            ],
            hint: "British railways came first, in the 1820s and 1830; the telegraph in the 1840s; the American West after the Civil War.",
            mistakes: [
              { match: "Transcontinental before 1860", coach: "The transcontinental railroad was finished in 1869, after the Civil War." },
              { match: "Time zones before the telegraph", coach: "Standard time came in 1883, almost forty years after Morse's 1844 line." },
            ],
            seconds: 55,
          },
          think: {
            q: "Why did railroads lead to standard time zones?",
            choices: [
              "Trains needed schedules that made sense across many towns with different local times",
              "Clocks did not exist before railroads",
              "The government wanted fewer trains",
              "Time zones made trains go faster",
            ],
            answer: 0,
            why: "Each town once kept its own sun time; railroads needed one clear standard to run timetables safely.",
            hints: [
              "",
              "Clocks were common long before 1883. The problem was that every town set its own.",
              "Time zones were about running more trains safely, not fewer.",
              "Time zones do not change speed. They changed how schedules were written.",
            ],
          },
          approaches: {
            analogy:
              "Imagine if every classroom in a school set its own clocks by when the sun hit its window. Moving between classes would be chaos. Railroads faced that problem across a whole continent.",
            example:
              "Before 1869, a traveler from New York to California might sail around South America or cross the plains by wagon, a journey of months. After the transcontinental railroad, the same trip took about a week by train.",
            simpler: {
              q: "Where was the first transcontinental railroad completed in 1869?",
              choices: ["Promontory Summit, Utah", "Liverpool, England", "Pawtucket, Rhode Island"],
              answer: 0,
              why: "The Central Pacific and Union Pacific met at Promontory Summit, Utah, on 10 May 1869.",
              hints: [
                "",
                "Liverpool was the end of an early British railway, opened in 1830.",
                "Pawtucket is where Samuel Slater built his cotton mill in 1790.",
              ],
            },
          },
        },
        {
          title: "Entrepreneurs Change Daily Life",
          teach:
            `Inventions change the world only when someone builds a business around them. Andrew Carnegie arrived in Pennsylvania from Scotland in 1848 as a poor 12-year-old and started as a bobbin boy in a cotton mill, then a telegraph messenger and a railroad manager. In the 1870s he built a steel mill using the Bessemer process, patented in 1856, which made steel far cheaper. Carnegie cut costs relentlessly and bought his own iron mines, coal fields and railroads to control his supplies. His steel became rails, bridges and skyscrapers. After selling his company in 1901, he gave away most of his fortune, paying for thousands of public libraries. He wrote that "the man who dies thus rich dies disgraced." Thomas Edison ran an invention laboratory at Menlo Park, developed a long-lasting light bulb in 1879, and in 1882 opened the Pearl Street power station in New York to sell electricity to customers.`,
          visual: {
            type: "flip",
            cards: [
              { front: "Entrepreneur", back: "A person who organizes a business and takes the risk of bringing a product to market." },
              { front: "Bessemer process (1856)", back: "Blowing air through molten iron to burn off impurities, making steel cheap enough for rails and bridges." },
              { front: "Vertical integration", back: "Owning each stage of supply, as Carnegie did with iron mines, coal and railroads." },
              { front: "Menlo Park", back: "Edison's New Jersey laboratory, where teams worked on inventions full time." },
              { front: "Pearl Street Station (1882)", back: "Edison's power station in New York, selling electricity to paying customers." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each step: was it a new invention, or a business decision that brought an invention to people?",
            buckets: ["New invention", "Business decision"],
            items: [
              { text: "Watt designs a separate condenser", bucket: 0 },
              { text: "Bessemer finds a way to make steel cheaply", bucket: 0 },
              { text: "Edison's team finds a long-lasting bulb filament", bucket: 0 },
              { text: "Boulton partners with Watt to build and sell engines", bucket: 1 },
              { text: "Carnegie buys iron mines and railroads to control his supplies", bucket: 1 },
              { text: "Edison opens Pearl Street Station to sell electricity to customers", bucket: 1 },
              { text: "Arkwright builds a mill to run his machines on shifts", bucket: 1 },
            ],
            hint: "Ask: is this creating a new device or method, or organizing money, people and supplies to deliver it?",
            mistakes: [
              { match: "Pearl Street as invention", coach: "The bulb was the invention. Building a station and selling power to customers was a business decision." },
              { match: "Bessemer as business", coach: "Bessemer's process was a new method. Carnegie's business was using it on a huge scale." },
            ],
            seconds: 55,
          },
          think: {
            q: "What role did entrepreneurs like Boulton, Carnegie and Edison play in the Industrial Revolution?",
            choices: [
              "They passed laws requiring people to use new machines",
              "They turned inventions into businesses that delivered products to many people",
              "They stopped new inventions from spreading",
              "They worked only as factory laborers",
            ],
            answer: 1,
            why: "Entrepreneurs raised money, built factories and found customers, which is how inventions reached ordinary people.",
            hints: [
              "They were businessmen, not lawmakers. People bought their products by choice.",
              "",
              "They did the opposite: they spread inventions by selling them widely.",
              "Carnegie started as a worker, but he became famous as a business builder.",
            ],
          },
          approaches: {
            analogy:
              "An inventor is like a chef who creates a great new recipe. An entrepreneur is the one who opens restaurants, hires cooks and buys ingredients so thousands of people can actually eat it.",
            example:
              "Bessemer's process made cheap steel possible in 1856, but Carnegie built the giant mills, cut every cost and controlled his own supplies of ore and coal. The result was steel cheap enough for thousands of miles of rail and for the first skyscrapers.",
            simpler: {
              q: "What did Thomas Edison open in New York in 1882?",
              choices: ["A cotton mill", "A steel mill", "The Pearl Street power station"],
              answer: 2,
              why: "Pearl Street Station sold electricity to customers in lower Manhattan.",
              hints: [
                "Cotton mills were Arkwright's and Slater's business.",
                "Steel was Carnegie's business.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each feature of daily life: was it typical before the Industrial Revolution (about 1750) or by 1900?",
        buckets: ["Typical around 1750", "Typical by 1900"],
        items: [
          { text: "Thread spun by hand at home", bucket: 0 },
          { text: "Travel over land no faster than a horse", bucket: 0 },
          { text: "Each town keeping its own local sun time", bucket: 0 },
          { text: "News from far away taking weeks to arrive", bucket: 0 },
          { text: "Cheap factory-made cloth sold in shops", bucket: 1 },
          { text: "Trains crossing a continent in about a week", bucket: 1 },
          { text: "Standard time zones", bucket: 1 },
          { text: "Electric lights in some city buildings", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain how steam power, factories and railroads changed daily life between 1750 and 1900, and why both inventors and entrepreneurs were needed.",
        keyPoints: [
          "Watt's steam engine provided powerful, efficient energy for industry.",
          "Factories and the division of labor multiplied production, though working conditions were hard and reforms followed.",
          "Railroads and the telegraph shrank distances and led to standard time.",
          "Entrepreneurs like Boulton, Carnegie and Edison turned inventions into businesses that reached ordinary people.",
        ],
      },
      mastery: [
        {
          type: "sequence",
          prompt: "Put these milestones of the Industrial Revolution in order, earliest first.",
          steps: [
            "Newcomen builds a steam engine to pump water from mines",
            "Watt patents his separate condenser",
            "Arkwright opens his cotton mill at Cromford",
            "The Liverpool and Manchester Railway opens",
            "The transcontinental railroad is completed in Utah",
            "Edison opens the Pearl Street power station",
          ],
          hint: "Steam came first, then factories, then railroads, then electricity.",
          mistakes: [
            { match: "Cromford before Watt's patent", coach: "Watt's patent (1769) came two years before Arkwright opened Cromford Mill (1771)." },
            { match: "Pearl Street before the transcontinental", coach: "The transcontinental railroad was finished in 1869; Pearl Street opened in 1882." },
          ],
          seconds: 50,
        },
        {
          type: "match",
          prompt: "Match each person to his contribution.",
          pairs: [
            { left: "James Watt", right: "Separate condenser for the steam engine" },
            { left: "Richard Arkwright", right: "Water frame and the Cromford cotton mill" },
            { left: "Adam Smith", right: "Explained the division of labor with a pin factory" },
            { left: "George Stephenson", right: "Engineer of early railways and the Rocket" },
            { left: "Andrew Carnegie", right: "Built a steel business and funded thousands of libraries" },
            { left: "Samuel Morse", right: "Telegraph line from Washington to Baltimore" },
          ],
          hint: "One improved steam, one built factories, one wrote economics, one built railways, one made steel and one sent messages by wire.",
          mistakes: [
            { match: "Swapped Watt and Stephenson", coach: "Watt improved the stationary steam engine. Stephenson put steam on rails." },
            { match: "Swapped Arkwright and Smith", coach: "Arkwright built factories; Smith wrote about why dividing work made them productive." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "Andrew Carnegie arrived in America in 1848 at age 12. In what year was he born?",
          answer: 1835,
          tolerance: 1,
          hint: "Subtract his age from the year he arrived.",
          mistakes: [
            { match: "1860", coach: "That adds his age. To find a birth year, subtract the age from 1848." },
          ],
          seconds: 25,
        },
        {
          type: "cloze",
          text: "Adam Smith argued that splitting work into small steps, called the {0} of labor, made workers far more productive. In his example, ten workers made upwards of 48,000 {1} a day.",
          blanks: [{ answers: ["division"] }, { answers: ["pins"] }],
          hint: "The work was divided up, and the product was tiny and sharp.",
          mistakes: [
            { match: "union", coach: "Smith's phrase was about splitting work into parts, not joining workers together." },
            { match: "nails", coach: "Close, but Smith's famous example was a factory making something even smaller." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What problem did James Watt's separate condenser solve?",
          choices: [
            "Steam engines could not be built of iron",
            "Engines had no way to make steam",
            "Trains could not climb hills",
            "Newcomen engines wasted fuel by reheating the cylinder every stroke",
          ],
          answer: 3,
          why: "Keeping the cylinder hot let Watt's engine use far less coal.",
        },
        {
          q: "Which mill, opened in 1771, is often called the first modern factory?",
          choices: ["Slater Mill", "Cromford Mill", "Pearl Street", "Menlo Park"],
          answer: 1,
          why: "Richard Arkwright's water-powered cotton mill at Cromford set the pattern for the factory system.",
        },
        {
          q: "What did Britain's Factory Act of 1833 do?",
          choices: [
            "Banned children under nine from most textile mills",
            "Created the first railroad",
            "Invented the spinning jenny",
          ],
          answer: 0,
          why: "Reformers responded to harsh conditions by limiting child labor in textile mills.",
        },
        {
          q: "Where and when was the first transcontinental railroad completed?",
          choices: [
            "Liverpool, 1830",
            "Baltimore, 1844",
            "Promontory Summit, Utah, 1869",
            "Pittsburgh, 1901",
          ],
          answer: 2,
          why: "The Central Pacific and Union Pacific met at Promontory Summit on 10 May 1869.",
        },
        {
          q: "What did Andrew Carnegie do with most of his fortune?",
          choices: ["Kept it all for his family", "Gave most of it away, funding thousands of libraries", "Spent it on a private army", "Buried it"],
          answer: 1,
          why: "Carnegie believed the rich should give their wealth for the public good, and he funded libraries and other causes.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Pick one invention from the Industrial Revolution and build a one-page business plan as if you were its entrepreneur in that year. Explain the problem it solves, who your customers are, what it costs to make, what you would charge, and how it would change your customers' daily lives. Add a simple drawing or diagram of how it works.",
        rubric: [
          "Describes the invention accurately with its correct date and inventor.",
          "Identifies a real problem and real customers of that era.",
          "Includes a simple, sensible cost and price estimate.",
          "Explains how it would change daily life.",
          "Includes a clear drawing or diagram.",
        ],
      },
    },
  ],
};
