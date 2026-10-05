import type { Course } from "./types";
import { history } from "./history";

/**
 * History Adventures: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const history45: Course = {
  ...history,
  id: "history-45",
  band: "sprout",
  title: "History Adventures",
  blurb: "Stories from history for grades 4-5: ancient worlds, explorers, America's founding and great inventors.",
  lessons: [
    // ------------------------------------------------------------------
    // 1. Ancient Egypt
    // ------------------------------------------------------------------
    {
      id: "history-45.egypt",
      title: "Ancient Egypt: The Nile, Pyramids and Hieroglyphs",
      minutes: 30,
      stage: "grammar",
      subject: "History",
      read: `About 5,000 years ago, a great civilization grew up along the Nile River in Africa. The land around the river was mostly hot, dry desert. But every summer the Nile flooded. When the water went down, it left behind a layer of rich, black mud. Farmers planted wheat and barley in that mud and grew plenty of food. The Egyptians called their land Kemet, which means "the black land." That is why people say Egypt was a gift of the Nile.

Egypt was ruled by kings called pharaohs. Egyptians believed that a pharaoh would live on after death, in an afterlife. So they built him a grand tomb and filled it with things he might need. The most famous tombs are the pyramids at Giza. The Great Pyramid was built for a pharaoh named Khufu about 4,500 years ago. Thousands of skilled workers moved more than two million stone blocks to build it. For about 3,800 years, it was the tallest building on Earth.

The Egyptians also invented one of the world's first systems of writing, called hieroglyphs. Some of the little pictures stood for sounds, like our letters. Others stood for whole words or ideas. Trained writers called scribes wrote on papyrus, a kind of paper made from river reeds.

After ancient Egypt faded away, people forgot how to read hieroglyphs. Then, in 1799, French soldiers dug up a broken stone slab near the town of Rosetta. The Rosetta Stone had the same message carved in two kinds of Egyptian writing and in Greek. Scholars could already read Greek. In 1822, a French scholar named Jean-Francois Champollion used the stone to crack the code. At last, the ancient Egyptians could speak to us again.`,
      keyIdeas: [
        "The Nile's yearly flood left rich black mud, so Egyptians could farm in the desert.",
        "Pharaohs were buried in grand tombs like the Great Pyramid, built for Khufu.",
        "Hieroglyphs were picture-writing; the Rosetta Stone helped people read them again.",
      ],
      hook: {
        text: "Imagine a pile of stone blocks taller than a 40-story building, built more than 4,000 years ago with no trucks, no cranes and no iron tools. Many of the blocks weighed more than a car. Who built it, and why did they work so hard?",
      },
      teach: [
        {
          title: "A Gift of the Nile",
          teach:
            "Egypt is mostly desert, hot and dry. But right through the middle flows the Nile, the longest river in Africa. Every summer, heavy rains far to the south made the Nile rise and flood its banks. When the water went down, it left a layer of thick black mud. Farmers planted wheat and barley in this rich soil. The Egyptians called their land Kemet, the black land. The Nile was also a highway, with boats carrying grain, stone and people.",
          visual: {
            type: "hotspots",
            title: "Life Along the Nile",
            center: "The Nile River",
            spots: [
              { label: "The Flood", icon: "🌊", detail: "Every summer the Nile rose and spread over the fields for weeks. Egyptians called this season Akhet, the flood." },
              { label: "Black Mud", icon: "🟫", detail: "When the water went down, it left rich black mud. That is why Egyptians called their land Kemet, the black land." },
              { label: "Farms", icon: "🌾", detail: "Farmers grew wheat and barley for bread, plus flax to weave into linen cloth." },
              { label: "Boats", icon: "⛵", detail: "The Nile was Egypt's main road. Boats carried grain, people and even huge stone blocks for building." },
              { label: "Shadoof", icon: "🪣", detail: "A bucket on a long pole with a weight on the other end. Farmers used it to lift river water into their fields." },
              { label: "Desert", icon: "🏜️", detail: "Beyond the green river valley lay dry desert, which also helped protect Egypt from invaders." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put an Egyptian farmer's year in order.",
            steps: [
              "Heavy rains far to the south make the Nile rise",
              "The river floods over the fields",
              "The water goes down and leaves black mud",
              "Farmers plant wheat and barley in the mud",
              "Farmers harvest the grain",
            ],
            hint: "Nothing can grow until the flood has come and gone. What has to happen before the river can rise?",
            mistakes: [
              { match: "Planting before the flood", coach: "Seeds planted before the flood would be washed away. Farmers waited for the water to go down." },
              { match: "Mud before the flood", coach: "The black mud is what the flood leaves behind, so the flood has to come first." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why could Egyptians grow plenty of food in a desert land?",
            choices: [
              "It rained almost every day in Egypt",
              "The Nile's floods left rich black mud on the fields",
              "They carried soil in from Greece",
              "They grew all their food inside the pyramids",
            ],
            answer: 1,
            why: "Each summer the Nile flooded and left rich black mud, which made great farmland.",
            hints: [
              "Egypt is a desert, so it hardly ever rains there. Where did the water come from?",
              "",
              "Carrying soil across the sea would be far too much work. The soil came from the river itself.",
              "The pyramids were tombs, not farms. Think about what the river left behind each year.",
            ],
          },
          approaches: {
            analogy:
              "The Nile was like a delivery truck that came every summer and dumped a fresh load of garden soil on every farm along its banks, for free.",
            example:
              "A farmer near the Nile watches the river rise in summer and cover his field. A few months later the water slides away, leaving shiny black mud. He scatters wheat seed, and by spring he has grain to grind into flour for bread.",
            simpler: {
              q: "What did the Egyptians call their land?",
              choices: ["Kemet, the black land", "Sparta, the land of soldiers", "Atlantis, the lost land"],
              answer: 0,
              why: "Kemet means the black land, named for the rich black mud the Nile left behind.",
              hints: [
                "",
                "Sparta was a city in Greece, far away from Egypt.",
                "Atlantis is a made-up land from a story, not a real place.",
              ],
            },
          },
        },
        {
          title: "Pharaohs and the Pyramids",
          teach:
            "Egypt was ruled by kings called pharaohs. Egyptians believed a pharaoh would live on after death, in an afterlife. So they built him a grand tomb and filled it with things he might need. The most famous tombs are the pyramids at Giza. The Great Pyramid was built for a pharaoh named Khufu about 4,500 years ago. Thousands of skilled workers dragged more than two million stone blocks into place. For about 3,800 years, it was the tallest building on Earth.",
          visual: {
            type: "timeline",
            events: [
              { year: -3100, label: "About 3100 BC: Egypt becomes one kingdom", detail: "Upper Egypt in the south and Lower Egypt in the north are joined under one king." },
              { year: -2560, label: "About 2560 BC: The Great Pyramid", detail: "Workers finish the Great Pyramid at Giza, the tomb of the pharaoh Khufu." },
              { year: -1332, label: "About 1332 BC: Tutankhamun becomes pharaoh", detail: "Tutankhamun becomes pharaoh when he is only about nine years old." },
              { year: 1799, label: "1799: The Rosetta Stone is found", detail: "French soldiers dig up a stone with the same message in Egyptian writing and in Greek." },
              { year: 1822, label: "1822: Hieroglyphs decoded", detail: "Jean-Francois Champollion figures out how to read hieroglyphs." },
              { year: 1922, label: "1922: Tutankhamun's tomb found", detail: "Howard Carter discovers King Tut's tomb, still full of treasures." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Egyptian kings were called {0}. Many were buried in giant stone tombs called {1}. The Great Pyramid was built for a pharaoh named {2}.",
            blanks: [{ answers: ["pharaohs", "pharaoh"] }, { answers: ["pyramids", "pyramid"] }, { answers: ["Khufu"] }],
            bank: ["pharaohs", "pyramids", "Khufu", "emperors", "castles", "Caesar"],
            hint: "Think about the special word for an Egyptian king and the shape of their famous tombs.",
            mistakes: [
              { match: "emperors", coach: "Emperors ruled places like Rome and China. Egypt's kings had their own special title." },
              { match: "castles", coach: "Castles were built in Europe thousands of years later. Egypt's tombs had four slanted sides." },
              { match: "Caesar", coach: "Caesar was a Roman leader who lived much later. The Great Pyramid's pharaoh was Khufu." },
            ],
            seconds: 30,
          },
          think: {
            q: "Why did the Egyptians build the pyramids?",
            choices: [
              "As homes for farming families",
              "As lighthouses to guide boats on the Nile",
              "As schools where scribes learned to write",
              "As tombs for pharaohs, who they believed would live on after death",
            ],
            answer: 3,
            why: "The pyramids were tombs. Egyptians believed the pharaoh would need a safe, grand resting place for the afterlife.",
            hints: [
              "Farmers lived in small mud-brick houses near their fields, not in giant stone pyramids.",
              "The pyramids sat in the desert, not along the river as lights for boats.",
              "Scribes trained in temples and offices. The pyramids were built for one special person each.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A pyramid was like a giant stone treasure chest, built to protect a pharaoh and everything Egyptians believed he would need in the next life.",
            example:
              "Archaeologists found the town where the Great Pyramid's workers lived. They found bakeries and the bones of cattle and fish the workers ate. Crews had team names and worked in groups, probably hauling blocks up long ramps on wooden sledges.",
            simpler: {
              q: "What was a pharaoh?",
              choices: ["A kind of river boat", "A king of ancient Egypt", "A large stone block"],
              answer: 1,
              why: "A pharaoh was a king of ancient Egypt.",
              hints: [
                "Egyptians had many boats, but a pharaoh was a person, not a boat.",
                "",
                "Stone blocks were used to build pyramids for the pharaoh. The pharaoh was the ruler.",
              ],
            },
          },
        },
        {
          title: "Hieroglyphs and the Rosetta Stone",
          teach:
            "The Egyptians invented one of the world's first writing systems, called hieroglyphs. Some pictures stood for sounds, like our letters. Others stood for whole words or ideas. Scribes trained for years to learn hundreds of signs. They wrote on papyrus, a paper made from river reeds. Later, people forgot how to read hieroglyphs. Then, in 1799, French soldiers dug up the Rosetta Stone. It had the same message in Egyptian writing and in Greek. In 1822, a scholar named Champollion cracked the code.",
          visual: {
            type: "flip",
            cards: [
              { front: "Pharaoh", back: "A king of ancient Egypt." },
              { front: "Pyramid", back: "A giant stone tomb with four slanted sides that meet at a point." },
              { front: "Hieroglyphs", back: "Egyptian picture-writing. Signs stood for sounds, words or ideas." },
              { front: "Scribe", back: "A trained writer who could read and write hieroglyphs." },
              { front: "Papyrus", back: "A paper made by pressing together strips of a reed that grew by the Nile." },
              { front: "Rosetta Stone", back: "A stone with the same message in Egyptian writing and Greek. It unlocked hieroglyphs." },
              { front: "Mummy", back: "A body that was carefully dried and wrapped in linen so it would last a very long time." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each word to what it means.",
            pairs: [
              { left: "Hieroglyphs", right: "Egyptian picture-writing" },
              { left: "Papyrus", right: "Paper made from river reeds" },
              { left: "Scribe", right: "A trained writer" },
              { left: "Rosetta Stone", right: "The same message in Egyptian writing and Greek" },
              { left: "Champollion", right: "The scholar who cracked the code in 1822" },
            ],
            hint: "Two of these are things you write with or on, one is a job, one is a person and one is a stone.",
            mistakes: [
              { match: "Swapped scribe and Champollion", coach: "Scribes lived in ancient Egypt. Champollion lived thousands of years later and figured out how to read their work." },
              { match: "Swapped hieroglyphs and papyrus", coach: "Hieroglyphs are the writing itself. Papyrus is what the writing was written on." },
            ],
            seconds: 45,
          },
          think: {
            q: "How did the Rosetta Stone help people read hieroglyphs again?",
            choices: [
              "It had a dictionary of every sign carved on it",
              "A pharaoh wrote a letter explaining it",
              "It had the same message in Greek, which scholars could already read",
              "It was written in English",
            ],
            answer: 2,
            why: "Because scholars could read the Greek part, they could compare it with the Egyptian part and work out the code.",
            hints: [
              "There was no dictionary on it, just one message carved three times.",
              "No pharaoh left instructions. Scholars had to figure it out by comparing.",
              "",
              "English did not even exist when the stone was carved. Which language could scholars already read?",
            ],
          },
          approaches: {
            analogy:
              "It is like finding a secret-code message right next to the same message in plain words. Compare them sign by sign, and you can work out the code.",
            example:
              "Champollion knew the Greek part named a king called Ptolemy. In the hieroglyphs, a group of signs was circled by an oval loop. He guessed it spelled Ptolemy, matched each sign to a sound, and then used those sounds to read other royal names.",
            simpler: {
              q: "What did Egyptian scribes write on?",
              choices: ["Papyrus made from reeds", "Plastic sheets", "Computer screens"],
              answer: 0,
              why: "Scribes wrote on papyrus, a paper made from reeds that grew by the Nile.",
              hints: [
                "",
                "Plastic was invented thousands of years later.",
                "Computers are modern. Think of a plant that grew by the river.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item into the part of Egyptian life it belongs to.",
        buckets: ["The Nile and farming", "Pharaohs and pyramids", "Hieroglyphs and writing"],
        items: [
          { text: "The yearly summer flood", bucket: 0 },
          { text: "Rich black mud for planting", bucket: 0 },
          { text: "Wheat and barley fields", bucket: 0 },
          { text: "Khufu's tomb at Giza", bucket: 1 },
          { text: "Treasures for the afterlife", bucket: 1 },
          { text: "Two million stone blocks", bucket: 1 },
          { text: "Scribes", bucket: 2 },
          { text: "Papyrus", bucket: 2 },
          { text: "The Rosetta Stone", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain why the Nile was so important to ancient Egypt, and tell about one great thing the Egyptians built or invented.",
        keyPoints: [
          "The Nile flooded each year and left rich black mud for farming.",
          "Pharaohs were buried in pyramids, like Khufu's Great Pyramid.",
          "Hieroglyphs were picture-writing done by scribes on papyrus.",
          "The Rosetta Stone helped people read hieroglyphs again.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline. BC years are to the left of year 1, and AD years are to the right.",
          min: -3000,
          max: 2000,
          step: 10,
          tolerance: 200,
          items: [
            { label: "The Great Pyramid is built", value: -2560 },
            { label: "Tutankhamun becomes pharaoh", value: -1332 },
            { label: "The Rosetta Stone is found", value: 1799 },
          ],
          hint: "The Great Pyramid is the oldest. The Rosetta Stone was found only about 200 years before the year 2000.",
          mistakes: [
            { match: "Rosetta Stone in BC", coach: "The Rosetta Stone was found in 1799, which is AD, on the right side of the line." },
            { match: "Tut before the pyramid", coach: "King Tut lived over a thousand years after the Great Pyramid was built." },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "The Rosetta Stone was found in 1799. Champollion cracked the code of hieroglyphs in 1822. How many years later was that?",
          answer: 23,
          tolerance: 0,
          unit: "years",
          hint: "Subtract: 1822 minus 1799.",
          mistakes: [
            { match: "33", coach: "Check your subtraction. From 1799 to 1800 is 1 year, and from 1800 to 1822 is 22 more." },
            { match: "22", coach: "Almost! Don't forget the 1 year from 1799 to 1800." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "The Egyptians called their land Kemet, which means the {0} land, because the Nile's floods left rich {1} on the fields.",
          blanks: [{ answers: ["black"] }, { answers: ["mud", "soil", "silt", "dirt"] }],
          hint: "Think about the color of the soil the river left behind.",
          mistakes: [
            { match: "red", coach: "Egyptians called the desert the red land. Their farmland by the river was a darker color." },
            { match: "sand", coach: "Sand is what the desert is made of. The flood left something much better for planting." },
          ],
          seconds: 30,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that is TRUE about hieroglyphs.",
          sentences: [
            "Some hieroglyphs stood for sounds, like our letters.",
            "Hieroglyphs were invented in Greece.",
            "Scribes trained for years to learn hundreds of signs.",
            "People have always known how to read hieroglyphs.",
            "Scribes often wrote on papyrus.",
          ],
          correct: [0, 2, 4],
          hint: "Remember who wrote hieroglyphs and what happened to the knowledge of how to read them.",
          mistakes: [
            { match: "Picked Greece", coach: "Hieroglyphs were Egyptian. Greek was the language scholars already knew." },
            { match: "Picked always known", coach: "People forgot how to read them for many centuries, until the Rosetta Stone helped." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What made farming possible in the Egyptian desert?",
          choices: ["Lots of rain", "The Nile's yearly flood", "Snow from the mountains", "Water carried from the sea"],
          answer: 1,
          why: "The Nile flooded each year and left rich black mud on the fields.",
        },
        {
          q: "What were the pyramids at Giza?",
          choices: ["Tombs for pharaohs", "Grain barns", "Schools for scribes", "Forts for soldiers"],
          answer: 0,
          why: "The pyramids were grand tombs built for pharaohs like Khufu.",
        },
        {
          q: "What are hieroglyphs?",
          choices: ["Egyptian boats", "Egyptian gods", "Egyptian kings", "Egyptian picture-writing"],
          answer: 3,
          why: "Hieroglyphs are the signs the Egyptians used for writing.",
        },
        {
          q: "Why was the Rosetta Stone so important?",
          choices: [
            "It was the top stone of the Great Pyramid",
            "It was Khufu's crown",
            "It helped scholars learn to read hieroglyphs",
            "It showed the path of the Nile",
          ],
          answer: 2,
          why: "Its Greek words helped Champollion figure out how to read the hieroglyphs.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make your own cartouche, the oval loop that held a pharaoh's name. Draw an oval on paper, then invent a picture sign for each sound in your first name and draw them inside. Make a key that shows what each sign means, and see if someone at home can read your name.",
        rubric: [
          "Draws a clear oval cartouche.",
          "Uses one picture sign for each sound or letter in the name.",
          "Makes a key that explains each sign.",
          "Explains how this is like the way hieroglyphs worked.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 2. Ancient Greece
    // ------------------------------------------------------------------
    {
      id: "history-45.greece",
      title: "Ancient Greece: The Olympics, Myths and Citizens",
      minutes: 30,
      stage: "grammar",
      subject: "History",
      read: `Ancient Greece was a land of mountains, islands and sparkling sea. Instead of one big kingdom, it was made of many small city-states. Each city-state, such as Athens or Sparta, had its own laws and its own army. They often argued and sometimes fought. But all Greeks shared the same language, the same gods and the same stories.

Every four years, Greeks from many city-states traveled to a place called Olympia for a festival to honor Zeus, the king of their gods. The first Olympic Games we have records of were held in 776 BC. At first there was just one event: a footrace about as long as two football fields. Later came wrestling, boxing and chariot races. Winners did not get gold medals. They got a crown made of olive leaves, and their home city treated them like heroes. During the Games, a sacred truce, a promise of peace, let athletes and visitors travel safely.

The Greeks told myths, which are stories about gods and heroes. They believed the gods lived on Mount Olympus. Zeus ruled them and hurled thunderbolts. Athena was the goddess of wisdom, and the city of Athens was named for her. The poet Homer told of Odysseus, a clever hero who spent ten years sailing home after the Trojan War. Myths taught lessons. Heroes won with courage and cleverness, and those who grew too proud often fell.

Athens also tried a bold new idea. Around 508 BC, a leader named Cleisthenes helped set up a government where citizens voted on the laws themselves. Citizens met on a hill called the Pnyx, listened to speeches and voted by raising their hands. The Greeks called this democracy, which means rule by the people. Only free men born to Athenian families counted as citizens, so many people could not vote. Still, the idea that citizens can choose their own laws has lasted for 2,500 years.`,
      keyIdeas: [
        "The first recorded Olympic Games were held at Olympia in 776 BC to honor Zeus.",
        "Greek myths told of gods and heroes and taught lessons about courage, cleverness and pride.",
        "Around 508 BC, Athens began democracy: citizens voted on their own laws.",
      ],
      hook: {
        text: "Picture a runner, dusty and out of breath, crossing the finish line at Olympia in 776 BC. His prize is not gold, money or a trophy. It is a simple crown of olive leaves. Yet people remembered his name for more than 2,000 years. Why would a crown of leaves matter so much?",
      },
      teach: [
        {
          title: "The First Olympic Games",
          teach:
            "Greece was made of many small city-states, like Athens and Sparta. They often argued and sometimes fought. But every four years, Greeks traveled to Olympia for a festival honoring Zeus, king of the gods. The first Olympics we have records of were held in 776 BC. There was just one event: a footrace about as long as two football fields. Later came wrestling, boxing and chariot races. A sacred truce let travelers come safely. Winners earned a crown of olive leaves.",
          visual: {
            type: "compare",
            left: {
              title: "Ancient Olympics",
              points: [
                "Held at Olympia every four years",
                "A festival to honor Zeus",
                "Prize: a crown of olive leaves",
                "Only Greek men could compete",
              ],
            },
            right: {
              title: "Modern Olympics",
              points: [
                "Held in a different city every four years",
                "First modern Games: Athens, 1896",
                "Prizes: gold, silver and bronze medals",
                "Athletes come from countries all over the world",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "The first recorded Olympic Games were held at {0} in 776 BC to honor {1}, king of the gods. Winners got a crown of {2} leaves.",
            blanks: [{ answers: ["Olympia"] }, { answers: ["Zeus"] }, { answers: ["olive"] }],
            bank: ["Olympia", "Zeus", "olive", "Rome", "Poseidon", "gold"],
            hint: "The Games were named after the place where they were held, to honor the most powerful Greek god.",
            mistakes: [
              { match: "Rome", coach: "Rome was in Italy. The Games were held at a holy place in Greece with a very similar name." },
              { match: "Poseidon", coach: "Poseidon ruled the sea. The Games honored the king of all the gods." },
              { match: "gold", coach: "Gold medals are a modern prize. Ancient winners got something that grew on trees." },
            ],
            seconds: 30,
          },
          think: {
            q: "What did winners of the ancient Olympic Games receive at Olympia?",
            choices: ["A gold medal", "A bag of silver coins", "A crown of olive leaves", "A new house"],
            answer: 2,
            why: "Ancient winners at Olympia received a crown of olive leaves, and great honor at home.",
            hints: [
              "Gold, silver and bronze medals are part of the modern Olympics, which started in 1896.",
              "Home cities sometimes rewarded winners later, but the prize at Olympia itself was much simpler.",
              "",
              "That would be a huge prize! The real one was simple but full of honor.",
            ],
          },
          approaches: {
            analogy:
              "The Olympic truce was like a time-out in a playground argument: everyone agreed to stop fighting long enough to play the big game together.",
            example:
              "A runner from Sparta and a runner from Athens line up at Olympia. Their cities might be rivals, but during the truce both travel safely. The winner is crowned with olive leaves, and when he gets home, his city honors him like a hero.",
            simpler: {
              q: "How often were the Olympic Games held?",
              choices: ["Every year", "Every four years", "Every hundred years"],
              answer: 1,
              why: "The Games were held every four years, just like the Olympics today.",
              hints: [
                "Not that often. The Greeks waited longer between Games.",
                "",
                "That is far too long. Most people would never see one!",
              ],
            },
          },
        },
        {
          title: "Myths of Gods and Heroes",
          teach:
            "The Greeks told myths, which are stories about gods and heroes. They believed their gods lived on Mount Olympus, the highest mountain in Greece. Zeus ruled the gods and hurled thunderbolts. Athena was the goddess of wisdom, and the city of Athens was named for her. The poet Homer told of Odysseus, a clever hero who spent ten years sailing home after the Trojan War. Myths taught lessons. Heroes won with courage and cleverness, and those who grew too proud often fell.",
          visual: {
            type: "hotspots",
            title: "Gods and Heroes of the Greek Myths",
            center: "Mount Olympus",
            spots: [
              { label: "Zeus", icon: "⚡", detail: "King of the gods, who ruled the sky and hurled thunderbolts." },
              { label: "Athena", icon: "🦉", detail: "Goddess of wisdom. Her symbol was the owl. In one myth she gave Athens its first olive tree." },
              { label: "Poseidon", icon: "🔱", detail: "God of the sea, who carried a three-pronged spear called a trident." },
              { label: "Hercules", icon: "💪", detail: "A hero famous for his strength, who completed twelve very hard tasks called labors." },
              { label: "Odysseus", icon: "⛵", detail: "A clever hero who thought up the wooden horse and then spent ten years trying to sail home." },
              { label: "Icarus", icon: "🪶", detail: "A boy with wings of feathers and wax who flew too close to the sun, ignoring his father's warning." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each name from the Greek myths to who they were.",
            pairs: [
              { left: "Zeus", right: "King of the gods, who hurled thunderbolts" },
              { left: "Athena", right: "Goddess of wisdom; Athens was named for her" },
              { left: "Poseidon", right: "God of the sea" },
              { left: "Odysseus", right: "Clever hero who sailed ten years to get home" },
              { left: "Homer", right: "Poet who told the story of Odysseus" },
            ],
            hint: "One of these names is a real poet, not a character in the stories.",
            mistakes: [
              { match: "Swapped Homer and Odysseus", coach: "Odysseus is the hero inside the story. Homer is the poet who told it." },
              { match: "Swapped Zeus and Poseidon", coach: "Zeus ruled the sky with thunderbolts. Poseidon ruled the sea." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did the Greeks tell myths?",
            choices: [
              "To keep track of taxes",
              "To give directions to Olympia",
              "To list the rules for voting",
              "To enjoy great stories and teach lessons about courage, cleverness and pride",
            ],
            answer: 3,
            why: "Myths were exciting stories that also taught how to live: be brave and clever, and beware of pride.",
            hints: [
              "Greeks kept records for taxes, but myths were stories about gods and heroes.",
              "Myths were not maps. Think about what a story about a hero might teach.",
              "Voting rules were laws, not stories. Myths were told for a different reason.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Myths were like the fables you heard when you were little. The story is fun, but tucked inside is a lesson about how to act.",
            example:
              "In one myth, Icarus and his father escape a prison on wings made of feathers and wax. His father warns him not to fly too high. Icarus feels so proud that he soars toward the sun, the wax melts, and he falls into the sea. The lesson: listen to wise advice, and don't let pride carry you away.",
            simpler: {
              q: "Where did the Greeks believe their gods lived?",
              choices: ["On Mount Olympus", "Under the Nile River", "On the moon"],
              answer: 0,
              why: "The Greeks believed their gods lived on Mount Olympus, the highest mountain in Greece.",
              hints: [
                "",
                "The Nile is in Egypt. The Greek gods had a home in Greece.",
                "The Greeks looked up at a mountain, not the moon, as the home of their gods.",
              ],
            },
          },
        },
        {
          title: "Citizens Who Vote",
          teach:
            "Most ancient lands were ruled by kings. Around 508 BC, Athens tried something new. A leader named Cleisthenes helped the citizens govern themselves. Citizens met on a rocky hill called the Pnyx, listened to speeches and voted on laws by raising their hands. The Greeks called this democracy, which means rule by the people. Only free men born to Athenian families were citizens, so many people could not vote. Still, the idea of citizens choosing their own laws has lasted ever since.",
          visual: {
            type: "flip",
            cards: [
              { front: "City-state", back: "A city and the farmland around it with its own laws and army, like Athens or Sparta." },
              { front: "Olympia", back: "The holy place in Greece where the Olympic Games were held every four years." },
              { front: "Truce", back: "A promise to stop fighting for a while." },
              { front: "Myth", back: "A story about gods and heroes, often teaching a lesson." },
              { front: "Citizen", back: "A member of a city or country who has rights and duties, like voting." },
              { front: "Democracy", back: "Rule by the people. From Greek demos (people) and kratos (rule)." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each one: does it describe rule by a king, or citizens ruling themselves?",
            buckets: ["Rule by a king", "Citizens rule themselves"],
            items: [
              { text: "One person makes all the laws", bucket: 0 },
              { text: "The ruler's son takes over when he dies", bucket: 0 },
              { text: "Nobody may question the ruler's orders", bucket: 0 },
              { text: "Citizens vote by raising their hands", bucket: 1 },
              { text: "Thousands meet on the Pnyx to decide", bucket: 1 },
              { text: "Citizens listen to speeches, then choose", bucket: 1 },
            ],
            hint: "Ask yourself: is one person deciding, or are many citizens deciding together?",
            mistakes: [
              { match: "Ruler's son in democracy", coach: "Passing power from father to son is how kings work. In a democracy, citizens choose." },
              { match: "Speeches under king", coach: "Listening to speeches and then voting is what Athenian citizens did on the Pnyx." },
            ],
            seconds: 40,
          },
          think: {
            q: "What does the word democracy mean?",
            choices: ["Rule by a king", "Rule by the gods", "Rule by the people", "Rule by the army"],
            answer: 2,
            why: "Demos means people and kratos means rule, so democracy means rule by the people.",
            hints: [
              "Rule by a king is called a monarchy. Athens was trying something different.",
              "The Greeks honored their gods, but democracy is about human citizens.",
              "",
              "Athens had soldiers, but in a democracy the citizens make the decisions.",
            ],
          },
          approaches: {
            analogy:
              "Democracy is like a class meeting where everyone raises a hand to vote on the field trip, instead of one person choosing for the whole class.",
            example:
              "Picture an Athenian farmer climbing the Pnyx at dawn. He hears speakers argue about building new warships. When the vote comes, he raises his hand along with thousands of others. The ships are built because the citizens chose it.",
            simpler: {
              q: "How did Athenian citizens vote on laws?",
              choices: ["By raising their hands", "By asking the king", "By flipping a coin"],
              answer: 0,
              why: "Citizens met on the Pnyx and voted by raising their hands.",
              hints: [
                "",
                "Athens did not have a king making the laws. The citizens decided.",
                "A coin flip is luck, not a vote. Citizens showed what they wanted.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item: is it about the Olympics, the myths, or democracy?",
        buckets: ["The Olympics", "Myths", "Democracy"],
        items: [
          { text: "A footrace at Olympia", bucket: 0 },
          { text: "A crown of olive leaves", bucket: 0 },
          { text: "A sacred truce for travelers", bucket: 0 },
          { text: "Zeus hurling thunderbolts", bucket: 1 },
          { text: "Odysseus sailing home", bucket: 1 },
          { text: "Icarus flying too close to the sun", bucket: 1 },
          { text: "Cleisthenes' new government", bucket: 2 },
          { text: "Voting on the Pnyx", bucket: 2 },
          { text: "Rule by the people", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Tell someone at home about ancient Greece: what the first Olympics were like, one myth you remember, and how Athenian citizens made laws.",
        keyPoints: [
          "The first recorded Olympics were held at Olympia in 776 BC to honor Zeus.",
          "Winners received a crown of olive leaves.",
          "Myths were stories about gods and heroes that taught lessons.",
          "In Athens, citizens voted on laws themselves; this was called democracy, rule by the people.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline. BC years count down toward year 1, so 776 BC is further left than 508 BC.",
          min: -800,
          max: -450,
          step: 1,
          tolerance: 15,
          items: [
            { label: "The first recorded Olympic Games", value: -776 },
            { label: "Athens begins democracy", value: -508 },
          ],
          hint: "The Olympics came first, more than 250 years before democracy in Athens.",
          mistakes: [
            { match: "Democracy first", coach: "With BC dates, the bigger number is older. 776 BC came before 508 BC." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "The first recorded Olympics were in 776 BC. Athens began democracy around 508 BC. How many years apart were these events? (With BC dates, just subtract the smaller number from the bigger one.)",
          answer: 268,
          tolerance: 0,
          unit: "years",
          hint: "Subtract: 776 minus 508.",
          mistakes: [
            { match: "1284", coach: "That is the two numbers added together. Here you need to subtract." },
            { match: "278", coach: "Close! Check the tens place again: 776 minus 508." },
          ],
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that is TRUE about ancient Greece.",
          sentences: [
            "Greece was made of many city-states, like Athens and Sparta.",
            "Ancient Olympic winners got gold medals.",
            "The Greeks believed their gods lived on Mount Olympus.",
            "Every person in Athens could vote.",
            "Athenian citizens voted by raising their hands.",
          ],
          correct: [0, 2, 4],
          hint: "Think carefully about the prizes and about who counted as a citizen.",
          mistakes: [
            { match: "Picked gold medals", coach: "Gold medals are modern. Ancient winners got olive crowns." },
            { match: "Picked everyone could vote", coach: "Only free men born to Athenian families were citizens, so many people could not vote." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build a sentence that tells what democracy means.",
          tiles: ["Democracy", "means", "rule", "by", "the", "people"],
          distractors: ["king", "gods"],
          hint: "Demos is the Greek word for people.",
          mistakes: [
            { match: "Used king", coach: "Rule by a king is a monarchy. Democracy puts the power with the citizens." },
            { match: "Used gods", coach: "The gods appear in myths, but democracy is about people ruling themselves." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Where were the ancient Olympic Games held?",
          choices: ["Rome", "Egypt", "Olympia", "Sparta"],
          answer: 2,
          why: "The Games were held at Olympia, a holy place in Greece.",
        },
        {
          q: "What was the prize for ancient Olympic winners?",
          choices: ["A crown of olive leaves", "A gold medal", "A chariot", "A palace"],
          answer: 0,
          why: "Winners received a simple crown of olive leaves, which brought great honor.",
        },
        {
          q: "Who was the clever hero who spent ten years sailing home?",
          choices: ["Zeus", "Odysseus", "Cleisthenes", "Khufu"],
          answer: 1,
          why: "Homer told the story of Odysseus' long voyage home after the Trojan War.",
        },
        {
          q: "What does democracy mean?",
          choices: ["Rule by soldiers", "Rule by one king", "Rule by the gods", "Rule by the people"],
          answer: 3,
          why: "Democracy comes from Greek words meaning people and rule.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Hold an Athenian-style family assembly. Pick a real family decision, like what game to play or what to cook for dinner. Let each person give a short speech for their idea, then everyone votes by raising hands. Afterward, tell how it felt to decide together.",
        rubric: [
          "Chooses a real decision for the family to vote on.",
          "Gives a short, clear speech with at least one reason.",
          "Listens politely to other speakers.",
          "Explains how the vote was like democracy in ancient Athens.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 3. Explorers
    // ------------------------------------------------------------------
    {
      id: "history-45.explorers",
      title: "Explorers: Crossing the Oceans",
      minutes: 30,
      stage: "logic",
      subject: "History",
      read: `About five hundred years ago, sailors in Europe wanted to reach Asia. Asia had spices like pepper and cinnamon, plus silk and other treasures. Traveling there by land was long, slow and costly. Explorers hoped to find a faster way by sea.

To cross the open ocean, sailors needed good tools. A compass, first used for sailing in China, has a magnetic needle that always points north, so sailors could keep their direction even when clouds hid the sky. Sailors measured how high the sun or the North Star rose in the sky to tell how far north or south they were. Mapmakers drew new maps after every voyage. Light, quick ships called caravels could sail into the wind better than older ships.

In 1492, Christopher Columbus, a sailor from Italy, set out from Spain with three ships: the Nina, the Pinta and the Santa Maria. The king and queen of Spain paid for the trip. Columbus planned to reach Asia by sailing west. He knew the Earth was round, but he thought it was much smaller than it really is. About ten weeks after leaving Spain, his crew spotted an island in the Caribbean Sea, where the Taino people already lived. Columbus believed he was near Asia. In fact, he had reached the Americas, lands that Europeans had not known about. His voyages brought huge changes to both sides of the ocean. New foods, animals and ideas crossed the sea, and so did diseases that killed many Native people.

In 1519, Ferdinand Magellan set out from Spain with five ships and about 270 men. At the tip of South America, they found a narrow, stormy passage. Then they crossed an ocean so calm that Magellan named it the Pacific, which means peaceful. Magellan was killed in a battle in the Philippines. But in 1522, one ship, the Victoria, reached Spain with only 18 men. They were the first people to sail all the way around the world.`,
      keyIdeas: [
        "Compasses, star sightings, maps and caravels helped sailors cross open oceans.",
        "In 1492, Columbus sailed west looking for Asia and reached the Americas instead.",
        "Magellan's expedition was the first to sail all the way around the world, returning in 1522.",
      ],
      hook: {
        text: "In 1522, a battered ship limped into a harbor in Spain. Three years earlier, five ships and about 270 men had set out. Now just one ship and 18 worn-out sailors came home. But they had done something no one had ever done before. What was it?",
      },
      teach: [
        {
          title: "Tools for Crossing the Ocean",
          teach:
            "Sailing across an ocean is hard when all you can see is water. Sailors needed tools. A compass, first used for sailing in China, has a magnetic needle that points north, even on cloudy nights. Sailors measured how high the sun or the North Star rose in the sky to find how far north or south they were. Maps showed coastlines and safe harbors. Light, quick ships called caravels could sail into the wind better than older, heavier ships.",
          visual: {
            type: "hotspots",
            title: "An Explorer's Toolkit",
            center: "The Ship's Deck",
            spots: [
              { label: "Compass", icon: "🧭", detail: "A magnetic needle that always points north, so sailors know their direction even without sun or stars." },
              { label: "North Star", icon: "⭐", detail: "The higher the North Star sits in the night sky, the farther north you are." },
              { label: "Map", icon: "🗺️", detail: "Charts showed coastlines, islands and harbors. Each voyage added new lands to the maps." },
              { label: "Caravel", icon: "⛵", detail: "A light, quick ship with triangle-shaped sails that could sail into the wind." },
              { label: "Hourglass", icon: "⏳", detail: "A sand glass that measured time, so sailors could guess how far they had traveled." },
              { label: "Logbook", icon: "📓", detail: "A daily diary of the ship's direction, speed and weather. Columbus kept one on his voyage." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each sailing tool to how it helped.",
            pairs: [
              { left: "Compass", right: "Its needle points north" },
              { left: "North Star", right: "Its height in the sky shows how far north you are" },
              { left: "Map", right: "Shows coastlines and safe harbors" },
              { left: "Caravel", right: "A light, quick ship that could sail into the wind" },
              { left: "Hourglass", right: "Measures time at sea" },
            ],
            hint: "One is a ship, one is a star, and the others are tools a sailor holds or reads.",
            mistakes: [
              { match: "Swapped compass and North Star", coach: "The compass works even on cloudy nights. The North Star must be seen, and its height tells how far north you are." },
              { match: "Swapped caravel and map", coach: "A caravel is a ship you sail in. A map is a drawing you read." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why was a compass so useful on a cloudy night?",
            choices: [
              "It lit up the deck",
              "Its needle still pointed north even when no stars showed",
              "It measured how deep the water was",
              "It made the ship go faster",
            ],
            answer: 1,
            why: "Clouds hide the stars, but a compass needle points north no matter what the sky looks like.",
            hints: [
              "A compass does not glow. Think about what its needle does.",
              "",
              "Sailors used a weighted rope to measure depth. A compass shows direction.",
              "Wind moved the ship. The compass only showed which way to go.",
            ],
          },
          approaches: {
            analogy:
              "A compass is like a friend who always points the same way. Even if you spin around and get dizzy, the needle still points north.",
            example:
              "A captain wants to sail west, but clouds hide the sun and stars. He looks at the compass and sees north is to his right. So he keeps the ship heading forward with north always on his right side, which means he is still going west.",
            simpler: {
              q: "Which way does a compass needle point?",
              choices: ["North", "Straight down", "Wherever the ship is going"],
              answer: 0,
              why: "A compass needle is a magnet that points north.",
              hints: [
                "",
                "The needle spins flat, side to side. It points toward one direction on the map.",
                "If it just followed the ship, it would not help sailors find their way.",
              ],
            },
          },
        },
        {
          title: "Columbus Sails West",
          teach:
            "In 1492, Christopher Columbus, a sailor from Italy, set out from Spain with three ships: the Nina, the Pinta and the Santa Maria. The king and queen of Spain paid for the trip. Columbus planned to reach Asia by sailing west. He knew the Earth was round, but he thought it was much smaller than it really is. About ten weeks later, his crew spotted an island in the Caribbean, where the Taino people already lived. Columbus thought he was near Asia. He had reached the Americas.",
          visual: {
            type: "timeline",
            events: [
              { year: 1488, label: "1488: Dias rounds Africa", detail: "Bartolomeu Dias of Portugal sails around the southern tip of Africa." },
              { year: 1492, label: "1492: Columbus reaches the Caribbean", detail: "Columbus lands on an island in the Caribbean after about ten weeks." },
              { year: 1498, label: "1498: Da Gama reaches India", detail: "Vasco da Gama sails around Africa all the way to India, opening a sea route for spices." },
              { year: 1507, label: "1507: A map names America", detail: "A German map uses the name America, after the explorer Amerigo Vespucci." },
              { year: 1519, label: "1519: Magellan sets out", detail: "Ferdinand Magellan leaves Spain with five ships." },
              { year: 1522, label: "1522: Around the world", detail: "The Victoria returns to Spain, the first ship to sail around the world." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that is TRUE about Columbus's first voyage.",
            sentences: [
              "He sailed from Spain in 1492.",
              "His three ships were the Nina, the Pinta and the Santa Maria.",
              "He proved the Earth was flat.",
              "He thought he had reached Asia.",
              "Nobody lived on the island where he landed.",
              "The king and queen of Spain paid for the trip.",
            ],
            correct: [0, 1, 3, 5],
            hint: "Remember what Columbus believed about Asia and who was already living on the island.",
            mistakes: [
              { match: "Picked flat Earth", coach: "Educated people already knew the Earth was round. Columbus's mistake was thinking it was smaller." },
              { match: "Picked nobody lived there", coach: "The Taino people already lived on the island when Columbus arrived." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Columbus believe he had reached Asia?",
            choices: [
              "He saw a sign that said Asia",
              "The Taino told him it was China",
              "He had a map that showed the Americas",
              "He thought the Earth was much smaller than it really is",
            ],
            answer: 3,
            why: "Columbus guessed the Earth was small, so when he found land after ten weeks, he thought it must be Asia.",
            hints: [
              "There were no signs! He had to guess where he was.",
              "The Taino did not speak his language and had never heard of China.",
              "No European map showed the Americas yet. That is why he was confused.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Imagine you think your friend's house is one block away, but it is really four blocks. When you see a house after one block, you might think you have arrived, but you have found somewhere new.",
            example:
              "Columbus guessed that Japan was about 2,400 miles west of where he started. The real distance is more than four times that. Luckily for his crew, two whole continents that Europeans did not know about lay in between.",
            simpler: {
              q: "In what year did Columbus first sail west across the Atlantic?",
              choices: ["1776", "1492", "1066"],
              answer: 1,
              why: "Columbus sailed in 1492.",
              hints: [
                "1776 is the year of the Declaration of Independence, much later.",
                "",
                "1066 is hundreds of years too early.",
              ],
            },
          },
        },
        {
          title: "Around the World",
          teach:
            "In 1519, Ferdinand Magellan set out from Spain with five ships and about 270 men. His goal was to sail west to the Spice Islands of Asia. At the tip of South America, they found a narrow, stormy passage, now called the Strait of Magellan. Then they crossed an ocean so calm that Magellan named it the Pacific, which means peaceful. Magellan was killed in a battle in the Philippines. In 1522, one ship, the Victoria, reached Spain with only 18 men. They had sailed around the world.",
          visual: {
            type: "compare",
            left: {
              title: "Columbus, 1492",
              points: [
                "3 ships left Spain",
                "Sailed west across the Atlantic",
                "Reached islands in the Caribbean",
                "Thought he had reached Asia",
              ],
            },
            right: {
              title: "Magellan's Fleet, 1519",
              points: [
                "5 ships and about 270 men left Spain",
                "Sailed through a strait at the tip of South America",
                "Crossed and named the Pacific Ocean",
                "1 ship and 18 men came home in 1522",
              ],
            },
          },
          probe: {
            type: "sequence",
            prompt: "Put Magellan's voyage in order.",
            steps: [
              "Five ships leave Spain in 1519",
              "The fleet sails down the coast of South America",
              "They pass through a narrow strait at the tip of South America",
              "They cross the huge Pacific Ocean",
              "Magellan is killed in the Philippines",
              "The Victoria returns to Spain in 1522",
            ],
            hint: "Trace the trip on a globe: Spain, then South America, then across the Pacific to Asia, then home.",
            mistakes: [
              { match: "Pacific before the strait", coach: "The strait at the tip of South America is the doorway into the Pacific. They had to pass through it first." },
              { match: "Magellan killed before the Pacific", coach: "The Philippines are on the far side of the Pacific, so the fleet crossed the ocean first." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why did Magellan name the ocean the Pacific?",
            choices: [
              "Pacific means peaceful, and the water was calm when they crossed",
              "Pacific means huge, because the ocean was so big",
              "It was named after the king of Spain",
              "Pacific means stormy",
            ],
            answer: 0,
            why: "After the stormy strait, the new ocean seemed calm, so Magellan named it the Pacific, meaning peaceful.",
            hints: [
              "",
              "It is huge, but that is not what the name means.",
              "The king of Spain was named Charles. The ocean's name means something else.",
              "The stormy part was the strait. The new ocean seemed the opposite.",
            ],
          },
          approaches: {
            analogy:
              "Sailing around the world is like walking around a giant ball. If you keep going the same way long enough, you end up back where you began.",
            example:
              "The Victoria left Spain heading west in 1519. She crossed the Atlantic, the Pacific and the Indian Ocean, then sailed around Africa and back to Spain in 1522. She kept heading west the whole way, yet she came home. That proved you can sail all the way around the Earth.",
            simpler: {
              q: "How many of Magellan's five ships made it all the way back to Spain?",
              choices: ["Five", "Three", "One"],
              answer: 2,
              why: "Only one ship, the Victoria, made it all the way around and back to Spain.",
              hints: [
                "The trip was very dangerous. Not all of them made it.",
                "Fewer than that. Think about the ship named Victoria.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each fact: is it about Columbus or about Magellan's voyage?",
        buckets: ["Columbus", "Magellan's voyage"],
        items: [
          { text: "Sailed in 1492", bucket: 0 },
          { text: "The Nina, the Pinta and the Santa Maria", bucket: 0 },
          { text: "Thought he had reached Asia", bucket: 0 },
          { text: "Met the Taino people", bucket: 0 },
          { text: "Five ships set out in 1519", bucket: 1 },
          { text: "Named the Pacific Ocean", bucket: 1 },
          { text: "Passed through a strait at the tip of South America", bucket: 1 },
          { text: "The Victoria came home in 1522", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain how explorers found their way across the ocean, and what Columbus and Magellan's crew each discovered.",
        keyPoints: [
          "A compass needle points north, and the North Star helped sailors know how far north they were.",
          "Columbus sailed west in 1492 looking for Asia but reached the Americas.",
          "Columbus thought the Earth was smaller than it really is.",
          "Magellan's crew was the first to sail around the world, coming home in 1522.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these voyages on the timeline.",
          min: 1480,
          max: 1530,
          step: 1,
          tolerance: 2,
          items: [
            { label: "Columbus reaches the Caribbean", value: 1492 },
            { label: "Magellan sets out from Spain", value: 1519 },
            { label: "The Victoria completes the trip around the world", value: 1522 },
          ],
          hint: "Columbus came first. Magellan's trip took about three years.",
          mistakes: [
            { match: "Magellan before Columbus", coach: "Columbus sailed in 1492, almost thirty years before Magellan's fleet left Spain." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "Magellan's fleet left Spain in 1519. The Victoria came home in 1522. How many years did the voyage take?",
          answer: 3,
          tolerance: 0,
          unit: "years",
          hint: "Subtract: 1522 minus 1519.",
          mistakes: [
            { match: "30", coach: "That is too long. Subtract 1519 from 1522." },
            { match: "1", coach: "Longer than that! Subtract 1519 from 1522." },
          ],
          seconds: 20,
        },
        {
          type: "cloze",
          text: "A compass needle always points {0}. Magellan named the calm ocean the {1}, which means peaceful.",
          blanks: [{ answers: ["north"] }, { answers: ["Pacific", "Pacific Ocean"] }],
          hint: "Think about where the North Star is, and the name of the ocean between the Americas and Asia.",
          mistakes: [
            { match: "south", coach: "The needle points toward the North Pole, the same direction as the North Star." },
            { match: "Atlantic", coach: "The Atlantic is the ocean Columbus crossed. Magellan named the next one." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build a sentence that tells what the Victoria's crew proved.",
          tiles: ["A ship", "can sail", "all the way", "around", "the Earth"],
          distractors: ["off the edge of", "to the moon"],
          hint: "The Victoria kept sailing west and still came home.",
          mistakes: [
            { match: "Used off the edge", coach: "Educated people already knew the Earth was round. The crew proved you could sail all the way around it." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Why did European explorers want a sea route to Asia?",
          choices: [
            "To find spices, silk and other treasures",
            "To find snow and ice",
            "To find the edge of the Earth",
            "To visit Olympia",
          ],
          answer: 0,
          why: "Asia had spices like pepper and cinnamon, plus silk, and the land route was slow and costly.",
        },
        {
          q: "Which tool has a needle that points north?",
          choices: ["An hourglass", "A logbook", "A map", "A compass"],
          answer: 3,
          why: "A compass needle is a magnet that points north.",
        },
        {
          q: "Where did Columbus actually land in 1492?",
          choices: ["Japan", "An island in the Caribbean", "India", "Egypt"],
          answer: 1,
          why: "Columbus landed on an island in the Caribbean, though he believed he was near Asia.",
        },
        {
          q: "What did Magellan's expedition do for the first time?",
          choices: [
            "Crossed the Atlantic",
            "Reached Africa",
            "Sailed all the way around the world",
            "Found the Nile",
          ],
          answer: 2,
          why: "In 1522, the Victoria became the first ship to sail around the world.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "With a grown-up, make a simple compass. Stroke a sewing needle about 30 times in one direction with a magnet. Push it through a small piece of cork or lay it on a leaf, and float it in a bowl of water. Watch which way it turns, then check it against a real compass or a phone compass.",
        rubric: [
          "Works safely with a grown-up's help.",
          "Magnetizes the needle and floats it on water.",
          "Observes and records which way the needle points.",
          "Explains how a compass helped explorers cross the ocean.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 4. The thirteen colonies
    // ------------------------------------------------------------------
    {
      id: "history-45.colonies",
      title: "The Thirteen Colonies: Jamestown, the Pilgrims and Colonial Life",
      minutes: 30,
      stage: "grammar",
      subject: "History",
      read: `In the 1600s, people from England began crossing the Atlantic Ocean to build new homes in North America. Some came hoping to get rich. Some came to worship God in their own way. Others came for land and a fresh start. Their settlements were called colonies.

The first lasting English colony was Jamestown, in Virginia, founded in 1607. About 100 men and boys arrived on three small ships. Many hoped to find gold, but there was none. The swampy land made people sick, and food ran short. Captain John Smith made a tough rule: anyone who would not work would not eat. During the terrible Starving Time, the winter of 1609 to 1610, most of the colonists died. Jamestown finally survived when settlers learned to grow tobacco and sell it in England. In 1619, Virginia's colonists started the first elected assembly in English America, the House of Burgesses.

In 1620, a group called the Pilgrims sailed on a ship called the Mayflower. They wanted to worship freely. Before landing, the men signed the Mayflower Compact, a promise to make fair laws together and obey them. Their first winter at Plymouth was so harsh that about half of them died. In the spring, a Native man named Squanto, who spoke English, showed them how to plant corn. The Wampanoag leader Massasoit made a peace treaty with them. In the fall of 1621, the Pilgrims and about 90 Wampanoag men shared a three-day harvest feast.

By 1732, there were thirteen English colonies along the Atlantic coast, from New Hampshire down to Georgia. Colonial life was busy. Most families lived on farms and made their own candles, soap and clothes. Children hauled water, fed animals and churned butter. Many learned their letters from a hornbook. Towns had blacksmiths, millers and printers. In all the colonies, and most of all in the South, enslaved Africans were also forced to work, without pay and without freedom.`,
      keyIdeas: [
        "Jamestown, founded in 1607, was the first lasting English colony; tobacco helped it survive.",
        "The Pilgrims signed the Mayflower Compact in 1620, promising to make fair laws together.",
        "By 1732 there were thirteen colonies, where families worked hard to make most of what they needed.",
      ],
      hook: {
        text: "In May 1607, about 100 English men and boys stepped off three small ships onto a swampy island in Virginia. They dreamed of finding gold. Three years later, most of them had died, and the rest were ready to give up and sail home. What went wrong, and how did the colony survive?",
      },
      teach: [
        {
          title: "Jamestown, 1607",
          teach:
            "In 1607, about 100 English men and boys built a fort on a river in Virginia. They named it Jamestown, after King James. Many hoped to find gold, but there was none. The river water was salty, and the swamp brought sickness. Captain John Smith made a tough rule: if you do not work, you do not eat. The winter of 1609 to 1610 was called the Starving Time. Later, colonists grew tobacco to sell in England, and the colony survived.",
          visual: {
            type: "timeline",
            events: [
              { year: 1607, label: "1607: Jamestown is founded", detail: "About 100 English men and boys build a fort on the James River in Virginia." },
              { year: 1609, label: "1609: The Starving Time begins", detail: "Food runs out over the winter, and most of the colonists die." },
              { year: 1612, label: "1612: Tobacco is planted", detail: "John Rolfe grows a sweeter kind of tobacco that sells well in England." },
              { year: 1619, label: "1619: House of Burgesses", detail: "Virginia's colonists hold the first elected assembly in English America." },
              { year: 1620, label: "1620: The Mayflower arrives", detail: "The Pilgrims sign the Mayflower Compact and found Plymouth." },
              { year: 1621, label: "1621: Harvest feast", detail: "The Pilgrims and Wampanoag share a three-day harvest celebration." },
              { year: 1732, label: "1732: Georgia, the thirteenth colony", detail: "Georgia is founded, the last of the thirteen colonies." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Jamestown was founded in {0} in Virginia. Settlers hoped to find gold, but the colony was saved by growing {1} to sell in England.",
            blanks: [{ answers: ["1607"] }, { answers: ["tobacco"] }],
            bank: ["1607", "tobacco", "1776", "cotton", "1492", "rice"],
            hint: "Jamestown came more than a hundred years after Columbus. The crop was a plant people smoked.",
            mistakes: [
              { match: "1776", coach: "1776 is the year of the Declaration of Independence, much later. Jamestown came in the early 1600s." },
              { match: "1492", coach: "1492 is when Columbus sailed. The English came to Virginia over a hundred years later." },
              { match: "cotton", coach: "Cotton became a big crop much later. Jamestown's money crop was something else." },
            ],
            seconds: 30,
          },
          think: {
            q: "What finally helped Jamestown survive?",
            choices: [
              "Finding a gold mine",
              "The king building them a palace",
              "Moving everyone to Plymouth",
              "Growing tobacco to sell in England",
            ],
            answer: 3,
            why: "Tobacco sold well in England, so the colony finally earned money and kept going.",
            hints: [
              "The settlers hoped for gold, but they never found any.",
              "King James stayed in England. The colonists had to make their own way.",
              "Plymouth was a different colony, started later by the Pilgrims.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Jamestown was like a lemonade stand that kept losing money until the owners found something people really wanted to buy. Tobacco was that product.",
            example:
              "John Smith saw that some men spent their days hunting for gold instead of planting or building. He told them anyone who would not work would not eat. Soon more men were cutting trees, building walls and planting corn.",
            simpler: {
              q: "What did many Jamestown settlers hope to find?",
              choices: ["Gold", "Ice", "Dinosaur bones"],
              answer: 0,
              why: "Many settlers came hoping to find gold and get rich.",
              hints: [
                "",
                "Virginia is warm and swampy. They were hoping for something valuable.",
                "Nobody was looking for dinosaurs back then. They wanted to get rich.",
              ],
            },
          },
        },
        {
          title: "The Pilgrims and the Mayflower",
          teach:
            "In 1620, a group called the Pilgrims crossed the ocean on a ship called the Mayflower. They wanted to worship God freely. Before stepping ashore, the men signed the Mayflower Compact. They promised to make fair laws together and to obey them. At Plymouth, the first winter was so hard that about half of them died. In spring, a Native man named Squanto showed them how to plant corn. In the fall of 1621, the Pilgrims and the Wampanoag shared a three-day harvest feast.",
          visual: {
            type: "hotspots",
            title: "The Pilgrims' First Year",
            center: "Plymouth, 1620",
            spots: [
              { label: "Mayflower", icon: "🚢", detail: "About 102 passengers crowded onto this ship for 66 days at sea." },
              { label: "The Compact", icon: "📜", detail: "41 men signed a promise to make fair laws together and obey them." },
              { label: "Squanto", icon: "🌽", detail: "He spoke English and showed the Pilgrims how to plant corn, using fish to feed the soil." },
              { label: "Massasoit", icon: "🤝", detail: "The Wampanoag leader made a peace treaty with the Pilgrims that lasted more than 50 years." },
              { label: "Harvest Feast", icon: "🍂", detail: "In 1621, about 90 Wampanoag men and the Pilgrims feasted for three days on deer, birds and corn." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that describes the Mayflower Compact.",
            sentences: [
              "The Pilgrims promised to make fair laws together.",
              "It was a map of Plymouth harbor.",
              "The men signed it before stepping ashore.",
              "It was a list of food for the harvest feast.",
              "They agreed to obey the laws they made.",
            ],
            correct: [0, 2, 4],
            hint: "A compact is an agreement. Look for sentences about promises and laws.",
            mistakes: [
              { match: "Picked map", coach: "The Compact was not a map. It was a written promise about laws." },
              { match: "Picked food list", coach: "The harvest feast came a year later. The Compact was about how to govern." },
            ],
            seconds: 35,
          },
          think: {
            q: "What was the Mayflower Compact?",
            choices: [
              "A map of the ocean",
              "A list of food supplies",
              "A promise to make fair laws together and obey them",
              "A letter to the king asking for gold",
            ],
            answer: 2,
            why: "The men on the Mayflower agreed to govern themselves with fair laws that everyone would follow.",
            hints: [
              "Sailors used maps, but the Compact was about how the colony would be run.",
              "They needed food, but the Compact was a promise about laws.",
              "",
              "The Pilgrims came to worship freely, not for gold. The Compact was about laws.",
            ],
          },
          approaches: {
            analogy:
              "The Compact was like a team agreeing on its own rules before the game starts, and then everyone promising to play by them.",
            example:
              "Imagine 41 men crowded in the Mayflower's cabin, signing their names one by one. Each name meant: we will choose our laws together, and once they are made, I will follow them, even if I did not get my way.",
            simpler: {
              q: "What was the name of the Pilgrims' ship?",
              choices: ["The Santa Maria", "The Mayflower", "The Victoria"],
              answer: 1,
              why: "The Pilgrims sailed on the Mayflower in 1620.",
              hints: [
                "The Santa Maria was one of Columbus's ships, more than a hundred years earlier.",
                "",
                "The Victoria was the ship that sailed around the world for Magellan's crew.",
              ],
            },
          },
        },
        {
          title: "Life in the Thirteen Colonies",
          teach:
            "By 1732, there were thirteen English colonies along the Atlantic coast, from New Hampshire down to Georgia. Most families lived on farms. They made their own candles, soap and clothes. Children helped by hauling water, feeding animals and churning butter. Many learned their letters from a hornbook, a wooden paddle holding a printed page. Towns had blacksmiths, millers and printers. Young people often learned a trade as an apprentice, working for a master craftsman for several years.",
          visual: {
            type: "flip",
            cards: [
              { front: "Colony", back: "A settlement ruled by a faraway country. The thirteen colonies were ruled by England." },
              { front: "Jamestown", back: "The first lasting English colony, founded in Virginia in 1607." },
              { front: "Mayflower Compact", back: "The Pilgrims' 1620 promise to make fair laws together and obey them." },
              { front: "House of Burgesses", back: "Virginia's assembly, first elected in 1619." },
              { front: "Hornbook", back: "A wooden paddle holding a printed page with the alphabet, used to learn to read." },
              { front: "Apprentice", back: "A young person who works for a master craftsman for years to learn a trade." },
              { front: "Blacksmith", back: "A worker who heats and hammers iron to make tools, nails and horseshoes." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each activity: is it from colonial times or from today?",
            buckets: ["Colonial times", "Today"],
            items: [
              { text: "Making candles at home for light", bucket: 0 },
              { text: "Learning letters from a hornbook", bucket: 0 },
              { text: "Churning butter by hand", bucket: 0 },
              { text: "Learning a trade as an apprentice to a blacksmith", bucket: 0 },
              { text: "Flipping on a light switch", bucket: 1 },
              { text: "Reading on a tablet", bucket: 1 },
              { text: "Buying butter at the grocery store", bucket: 1 },
            ],
            hint: "Colonists had no electricity and no stores full of ready-made things.",
            mistakes: [
              { match: "Light switch in colonial times", coach: "Colonists had no electricity. They made candles for light." },
              { match: "Butter store in colonial times", coach: "Most colonial families made their own butter by churning cream." },
            ],
            seconds: 35,
          },
          think: {
            q: "What was a hornbook?",
            choices: [
              "A wooden paddle with a printed page for learning letters",
              "A horn for calling the cows home",
              "A book about hunting deer",
              "A kind of colonial money",
            ],
            answer: 0,
            why: "Colonial children learned the alphabet from a hornbook, a paddle holding a printed page.",
            hints: [
              "",
              "It sounds like a horn, but it was something children used for school.",
              "It was not about hunting. Children used it to learn something.",
              "Colonists used coins and trade for money. A hornbook helped children read.",
            ],
          },
          approaches: {
            analogy:
              "Being an apprentice was like going to a school that is also a workshop. You lived with a master, did chores, and learned the trade by doing it every day.",
            example:
              "Benjamin Franklin became an apprentice at age 12 to his older brother, a printer in Boston. He set type, ran the press and delivered newspapers. Those skills later made him one of the most successful printers in the colonies.",
            simpler: {
              q: "How many English colonies were there by 1732?",
              choices: ["Thirteen", "Fifty", "Three"],
              answer: 0,
              why: "By 1732, when Georgia was founded, there were thirteen English colonies.",
              hints: [
                "",
                "Fifty is the number of states today. There were far fewer colonies.",
                "There were more than that. Think of the lesson's title.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put these events in the order they happened.",
        steps: [
          "Jamestown is founded in Virginia",
          "The Starving Time winter",
          "The House of Burgesses meets for the first time",
          "The Pilgrims sign the Mayflower Compact",
          "The Pilgrims and Wampanoag share a harvest feast",
          "Georgia becomes the thirteenth colony",
        ],
      },
      explain: {
        prompt: "Explain how Jamestown and Plymouth got started, what helped them survive, and what daily life was like in the colonies.",
        keyPoints: [
          "Jamestown was founded in 1607 and survived by growing tobacco.",
          "The Pilgrims came on the Mayflower in 1620 and signed the Mayflower Compact.",
          "Squanto and the Wampanoag helped the Pilgrims learn to plant corn.",
          "Colonial families worked hard, making candles, soap and clothes at home.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline.",
          min: 1600,
          max: 1740,
          step: 1,
          tolerance: 3,
          items: [
            { label: "Jamestown is founded", value: 1607 },
            { label: "The Mayflower arrives", value: 1620 },
            { label: "Georgia becomes the thirteenth colony", value: 1732 },
          ],
          hint: "Jamestown and the Mayflower were both early in the 1600s. Georgia came more than a hundred years later.",
          mistakes: [
            { match: "Mayflower before Jamestown", coach: "Jamestown came first, in 1607. The Pilgrims arrived 13 years later." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each name to what it is known for.",
          pairs: [
            { left: "Jamestown", right: "First lasting English colony, 1607" },
            { left: "Mayflower Compact", right: "Promise to make fair laws together" },
            { left: "Squanto", right: "Showed the Pilgrims how to plant corn" },
            { left: "House of Burgesses", right: "First elected assembly in English America" },
            { left: "John Smith", right: "Made the rule: no work, no food" },
          ],
          hint: "Two of these are people, one is a place, one is a document and one is a group of lawmakers.",
          mistakes: [
            { match: "Swapped Compact and House of Burgesses", coach: "The Compact was a written promise. The House of Burgesses was a group of elected lawmakers in Virginia." },
            { match: "Swapped Squanto and John Smith", coach: "John Smith led Jamestown. Squanto helped the Pilgrims at Plymouth." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "Jamestown was founded in 1607. The Pilgrims landed in 1620. How many years apart were they?",
          answer: 13,
          tolerance: 0,
          unit: "years",
          hint: "Subtract: 1620 minus 1607.",
          mistakes: [
            { match: "23", coach: "Check your subtraction. From 1607 to 1610 is 3 years, and from 1610 to 1620 is 10 more." },
            { match: "3", coach: "That is only to 1610. Keep counting to 1620." },
          ],
          seconds: 25,
        },
        {
          type: "cloze",
          text: "Captain John Smith's rule for Jamestown was: if you do not {0}, you do not {1}.",
          blanks: [{ answers: ["work"] }, { answers: ["eat"] }],
          hint: "Smith wanted every settler to help build and plant, or go hungry.",
          mistakes: [
            { match: "pray", coach: "The colonists did pray, but Smith's rule was about doing your share of the labor." },
            { match: "sleep", coach: "Think about what a hungry colony needed most: food. Then what would lazy settlers lose?" },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "What was the first lasting English colony in America?",
          choices: ["Plymouth", "Georgia", "Jamestown", "Boston"],
          answer: 2,
          why: "Jamestown, founded in 1607 in Virginia, was the first English colony that lasted.",
        },
        {
          q: "Why did the Pilgrims come to America?",
          choices: [
            "To worship God freely",
            "To find gold",
            "To sail around the world",
            "To build pyramids",
          ],
          answer: 0,
          why: "The Pilgrims wanted to worship in their own way.",
        },
        {
          q: "Who showed the Pilgrims how to plant corn?",
          choices: ["John Smith", "King James", "Columbus", "Squanto"],
          answer: 3,
          why: "Squanto, a Native man who spoke English, showed them how to plant corn.",
        },
        {
          q: "What did colonial children use to learn their letters?",
          choices: ["A tablet", "A hornbook", "A compass", "A papyrus scroll"],
          answer: 1,
          why: "A hornbook was a wooden paddle holding a printed page with the alphabet.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make butter the colonial way. Pour heavy cream into a clean jar until it is about half full, close the lid tightly, and shake for 10 to 20 minutes, taking turns with your family. Watch it change into butter and buttermilk. Then spread it on bread and tell what you learned about colonial chores.",
        rubric: [
          "Follows the steps and keeps shaking until butter forms.",
          "Describes how the cream changed along the way.",
          "Compares how long it took with buying butter at a store.",
          "Names at least two other chores colonial children did.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 5. The American Revolution
    // ------------------------------------------------------------------
    {
      id: "history-45.revolution",
      title: "The American Revolution: Washington, Franklin and the Declaration",
      minutes: 35,
      stage: "logic",
      subject: "History",
      read: `By the 1760s, the thirteen colonies had belonged to Britain for well over a hundred years. Britain had just won a long, costly war against France in North America, and it wanted the colonists to help pay for it. Parliament, Britain's lawmakers, passed new taxes on things like paper and tea. But the colonists had no one in Parliament to speak for them. Their cry became "No taxation without representation!" In 1773, colonists in Boston dumped 342 chests of tea into the harbor. This was the Boston Tea Party.

Britain punished Boston, and tempers rose. In April 1775, British soldiers marched toward the towns of Lexington and Concord. Riders like Paul Revere galloped through the night to warn that the soldiers were coming. Shots were fired, and the war began.

The colonies chose George Washington of Virginia to lead their new Continental Army. Washington was calm, brave and honest. His army was often cold, hungry and outnumbered, but he kept it together. On Christmas night in 1776, he led his soldiers across the icy Delaware River and surprised the enemy at Trenton.

Benjamin Franklin was already famous as a printer, writer, scientist and inventor. He had flown a kite in a thunderstorm to show that lightning is electricity, and he invented the lightning rod. During the war, he sailed to France and convinced the French to join the American side.

On July 4, 1776, the Continental Congress approved the Declaration of Independence. Thomas Jefferson wrote most of it, with help from Franklin and John Adams. It said that all men are created equal, that people have rights to life, liberty and the pursuit of happiness, and that governments get their power from the people they govern.

The war lasted for years. In 1781, with French help, Washington trapped the British army at Yorktown, and its general surrendered. In 1783, Britain agreed that the United States was a free and independent nation.`,
      keyIdeas: [
        "Colonists protested taxes from a Parliament where they had no voice: no taxation without representation.",
        "George Washington led the Continental Army; Benjamin Franklin won France's help.",
        "The Declaration of Independence, approved July 4, 1776, said people have rights and government gets its power from the people.",
      ],
      hook: {
        text: "On Christmas night, 1776, George Washington's army was cold, hungry and losing the war. Sleet and snow whipped across the icy Delaware River. Washington loaded his soldiers into boats and crossed in the dark. By morning they would surprise the enemy at Trenton. Why would anyone risk so much for an idea called independence?",
      },
      teach: [
        {
          title: "No Taxation Without Representation",
          teach:
            "By the 1760s, Britain had won a long, costly war in North America and needed money. Parliament, Britain's lawmakers, taxed the colonies on things like paper and tea. But no colonists sat in Parliament to speak for them. They protested: \"No taxation without representation!\" In 1773, colonists in Boston dumped 342 chests of tea into the harbor. Britain punished Boston by closing its port. In April 1775, shots rang out at Lexington and Concord, and the war began.",
          visual: {
            type: "timeline",
            events: [
              { year: 1765, label: "1765: The Stamp Act", detail: "Parliament taxes paper items in the colonies, like newspapers and playing cards." },
              { year: 1773, label: "1773: Boston Tea Party", detail: "Colonists dump 342 chests of tea into Boston Harbor." },
              { year: 1775, label: "1775: Lexington and Concord", detail: "The first shots of the war are fired in Massachusetts." },
              { year: 1776, label: "1776: Declaration of Independence", detail: "On July 4, Congress approves the Declaration." },
              { year: 1777, label: "1777: Victory at Saratoga", detail: "An American victory convinces France that America can win." },
              { year: 1781, label: "1781: Yorktown", detail: "Washington traps the British army, and its general surrenders." },
              { year: 1783, label: "1783: Treaty of Paris", detail: "Britain agrees that the United States is independent." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the road to war in order.",
            steps: [
              "Britain needs money after a long, costly war",
              "Parliament taxes the colonies on paper and tea",
              "Colonists protest: no taxation without representation",
              "Colonists dump tea into Boston Harbor",
              "Britain punishes Boston by closing its port",
              "Shots are fired at Lexington and Concord",
            ],
            hint: "Each step caused the next one. Start with why Britain wanted tax money.",
            mistakes: [
              { match: "Tea Party before taxes", coach: "The Tea Party was a protest against the tax, so the tax had to come first." },
              { match: "Fighting before punishment", coach: "Britain punished Boston first, and the anger that followed led to the fighting." },
            ],
            seconds: 45,
          },
          think: {
            q: "What did \"No taxation without representation\" mean?",
            choices: [
              "Colonists never wanted to pay for anything",
              "Colonists wanted to tax Britain instead",
              "Colonists should not be taxed by a Parliament where no one spoke for them",
              "Colonists wanted more tea",
            ],
            answer: 2,
            why: "The colonists believed only lawmakers they chose should be able to tax them.",
            hints: [
              "Colonists paid taxes to their own colony assemblies. The problem was who was taxing them.",
              "They were not trying to tax Britain. They wanted a say in their own taxes.",
              "",
              "They dumped tea to protest the tax, not because they wanted more.",
            ],
          },
          approaches: {
            analogy:
              "Imagine your older cousins voting on how to spend your allowance, and you are not allowed in the room. Even if they only take a little, it feels unfair because you had no say.",
            example:
              "The tax on tea was small. But colonists worried that if Parliament could tax them without asking, it could tax them for anything. So in December 1773, men in Boston boarded three ships and dumped 342 chests of tea into the harbor.",
            simpler: {
              q: "What did colonists dump into Boston Harbor in 1773?",
              choices: ["Tea", "Gold", "Cannons"],
              answer: 0,
              why: "They dumped 342 chests of tea. That is why it is called the Boston Tea Party.",
              hints: [
                "",
                "Nobody would throw away gold! Think about the name of the event.",
                "Cannons came later, in the war. The protest was named after a drink.",
              ],
            },
          },
        },
        {
          title: "Washington and Franklin",
          teach:
            "The colonies chose George Washington of Virginia to lead the Continental Army. He was calm, brave and honest, and his soldiers trusted him. On Christmas night in 1776, he led them across the icy Delaware River to surprise the enemy at Trenton. Benjamin Franklin was a printer, writer and inventor. He flew a kite in a storm to show that lightning is electricity. During the war, Franklin went to France and won its friendship. French ships and soldiers helped America win.",
          visual: {
            type: "compare",
            left: {
              title: "George Washington",
              points: [
                "Farmer and surveyor from Virginia",
                "Commander of the Continental Army",
                "Crossed the Delaware on Christmas night, 1776",
                "Became the first President in 1789",
              ],
            },
            right: {
              title: "Benjamin Franklin",
              points: [
                "Printer and writer from Philadelphia",
                "Showed that lightning is electricity",
                "Invented the lightning rod",
                "Won France's help for America",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each fact: is it about George Washington or Benjamin Franklin?",
            buckets: ["George Washington", "Benjamin Franklin"],
            items: [
              { text: "Led the Continental Army", bucket: 0 },
              { text: "Crossed the icy Delaware River", bucket: 0 },
              { text: "Surprised the enemy at Trenton", bucket: 0 },
              { text: "Flew a kite in a storm", bucket: 1 },
              { text: "Worked as a printer and writer", bucket: 1 },
              { text: "Won France's help for America", bucket: 1 },
            ],
            hint: "One man was a soldier leading troops. The other was a thinker, inventor and diplomat.",
            mistakes: [
              { match: "France under Washington", coach: "Washington stayed with his army in America. Franklin sailed to France." },
              { match: "Delaware under Franklin", coach: "Franklin was in his seventies and in France for much of the war. Washington led the river crossing." },
            ],
            seconds: 35,
          },
          think: {
            q: "How did Benjamin Franklin help America win the war?",
            choices: [
              "He led the soldiers across the Delaware",
              "He dumped tea into Boston Harbor",
              "He was the general at Yorktown",
              "He convinced France to help America",
            ],
            answer: 3,
            why: "Franklin went to France and won its friendship. French ships and soldiers helped win the war.",
            hints: [
              "That was Washington, the army's commander.",
              "That was a group of Boston colonists in 1773, before the war began.",
              "Washington led the Americans at Yorktown. Franklin's job was across the ocean.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Washington was like a team captain who keeps everyone going when the score looks bad. Franklin was like the friend who convinces a strong team to join your side.",
            example:
              "Before Trenton, many of Washington's soldiers were ready to go home. After the surprise win at Trenton, and another at Princeton about a week later, Americans felt hope again, and more men stayed to fight.",
            simpler: {
              q: "Who led the Continental Army?",
              choices: ["King George", "George Washington", "Christopher Columbus"],
              answer: 1,
              why: "George Washington of Virginia commanded the Continental Army.",
              hints: [
                "King George III ruled Britain, the other side in the war.",
                "",
                "Columbus lived nearly 300 years earlier.",
              ],
            },
          },
        },
        {
          title: "The Declaration of Independence",
          teach:
            "On July 4, 1776, leaders from all thirteen colonies approved the Declaration of Independence. Thomas Jefferson wrote most of it, and Franklin and John Adams helped. It said that all men are created equal. It said people have rights to life, liberty and the pursuit of happiness, and that governments get their power from the people. Winning took years. In 1781, Washington trapped the British army at Yorktown. In 1783, Britain agreed that America was free.",
          visual: {
            type: "flip",
            cards: [
              { front: "Parliament", back: "Britain's group of lawmakers." },
              { front: "Representation", back: "Having someone you chose speak and vote for you." },
              { front: "Continental Army", back: "The American army, led by George Washington." },
              { front: "Declaration of Independence", back: "The 1776 statement that the colonies were free from Britain, mostly written by Thomas Jefferson." },
              { front: "Liberty", back: "Freedom: the right to live and choose without unfair control." },
              { front: "Independence", back: "Being free to govern yourself." },
              { front: "Yorktown", back: "The 1781 battle where the British army surrendered to Washington." },
            ],
          },
          probe: {
            type: "cloze",
            text: "The Declaration says people have rights to life, {0} and the pursuit of {1}. It was approved on July {2}, 1776.",
            blanks: [{ answers: ["liberty"] }, { answers: ["happiness"] }, { answers: ["4", "4th", "fourth"] }],
            bank: ["liberty", "happiness", "4", "money", "power", "14"],
            hint: "Think of the famous phrase, and the holiday with fireworks.",
            mistakes: [
              { match: "money", coach: "The Declaration talks about rights, not money. Liberty means freedom." },
              { match: "power", coach: "The Declaration says power comes from the people. But the three rights are life, liberty and the pursuit of happiness." },
              { match: "14", coach: "Independence Day is celebrated with fireworks on July 4." },
            ],
            seconds: 35,
          },
          think: {
            q: "Who wrote most of the Declaration of Independence?",
            choices: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "King George III"],
            answer: 2,
            why: "Thomas Jefferson wrote the first draft, and Franklin and Adams suggested changes.",
            hints: [
              "Washington was busy leading the army.",
              "Franklin helped edit it, but someone else wrote most of it.",
              "",
              "King George was the ruler the Declaration was written against!",
            ],
          },
          approaches: {
            analogy:
              "The Declaration was like a letter explaining why you are leaving a club. It lists what went wrong and states what you believe, so everyone understands your reasons.",
            example:
              "Jefferson wrote his draft in a rented room in Philadelphia. Franklin and Adams suggested changes, and Congress cut some parts. On July 4, 1776, Congress approved it, and soon it was read aloud to crowds in towns across the colonies.",
            simpler: {
              q: "On what date was the Declaration of Independence approved?",
              choices: ["December 25, 1776", "July 4, 1776", "January 1, 1800"],
              answer: 1,
              why: "It was approved on July 4, 1776, which is why we celebrate Independence Day on July 4.",
              hints: [
                "That is when Washington crossed the Delaware, months later.",
                "",
                "That is too late. Think of the summer holiday with fireworks.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every idea that is in the Declaration of Independence.",
        sentences: [
          "All men are created equal.",
          "The king should decide everything.",
          "People have rights to life, liberty and the pursuit of happiness.",
          "Colonists must pay any tax Parliament wants.",
          "Governments get their power from the people.",
        ],
        correct: [0, 2, 4],
      },
      explain: {
        prompt: "Explain why the colonists broke away from Britain, how Washington and Franklin helped, and what the Declaration of Independence said.",
        keyPoints: [
          "Colonists were taxed by a Parliament where they had no representatives.",
          "Washington led the Continental Army and kept it together.",
          "Franklin convinced France to help America.",
          "The Declaration said people have rights to life, liberty and the pursuit of happiness.",
          "The Declaration said governments get their power from the people.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place these events on the timeline.",
          min: 1760,
          max: 1790,
          step: 1,
          tolerance: 1,
          items: [
            { label: "Boston Tea Party", value: 1773 },
            { label: "Declaration of Independence", value: 1776 },
            { label: "Victory at Yorktown", value: 1781 },
            { label: "Britain agrees America is free", value: 1783 },
          ],
          hint: "The protest came first, then the Declaration, then the big victory, then the peace treaty.",
          mistakes: [
            { match: "Yorktown before the Declaration", coach: "The Declaration came early in the war, in 1776. Yorktown came near the end, in 1781." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each person to what they did.",
          pairs: [
            { left: "George Washington", right: "Led the Continental Army" },
            { left: "Benjamin Franklin", right: "Won France's help for America" },
            { left: "Thomas Jefferson", right: "Wrote most of the Declaration" },
            { left: "Paul Revere", right: "Rode through the night to warn that soldiers were coming" },
          ],
          hint: "One was a general, one a writer, one an inventor and diplomat, and one a midnight rider.",
          mistakes: [
            { match: "Swapped Franklin and Jefferson", coach: "Franklin helped edit the Declaration, but Jefferson wrote most of it. Franklin's big job was in France." },
          ],
          seconds: 40,
        },
        {
          type: "number",
          prompt: "The Declaration of Independence was approved in 1776. Britain agreed America was free in 1783. How many years later was that?",
          answer: 7,
          tolerance: 0,
          unit: "years",
          hint: "Subtract: 1783 minus 1776.",
          mistakes: [
            { match: "17", coach: "Check your subtraction. From 1776 to 1780 is 4 years, then 3 more to 1783." },
            { match: "5", coach: "That gets you to 1781, Yorktown. Keep going to 1783." },
          ],
          seconds: 25,
        },
        {
          type: "build",
          prompt: "Build the colonists' famous protest slogan.",
          tiles: ["No", "taxation", "without", "representation"],
          distractors: ["with", "tea"],
          hint: "The colonists did not want to be taxed unless someone they chose could speak for them.",
          mistakes: [
            { match: "Used with", coach: "They were upset about taxes WITHOUT a voice in Parliament." },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "Why were the colonists angry about Parliament's taxes?",
          choices: [
            "The taxes were on gold",
            "They had no one in Parliament to speak for them",
            "The taxes were only on Britain",
            "France was collecting them",
          ],
          answer: 1,
          why: "No colonists sat in Parliament, so they felt it was unfair for Parliament to tax them.",
        },
        {
          q: "Who led the Continental Army?",
          choices: ["Thomas Jefferson", "Benjamin Franklin", "Paul Revere", "George Washington"],
          answer: 3,
          why: "George Washington commanded the Continental Army throughout the war.",
        },
        {
          q: "When was the Declaration of Independence approved?",
          choices: ["July 4, 1776", "December 25, 1776", "April 19, 1775", "1783"],
          answer: 0,
          why: "Congress approved it on July 4, 1776.",
        },
        {
          q: "Which country did Franklin convince to help America?",
          choices: ["Spain", "Egypt", "France", "Greece"],
          answer: 2,
          why: "Franklin went to France, and French ships and soldiers helped win at Yorktown.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Imagine it is July 1776 and you have just heard the Declaration of Independence read aloud in your town square. Write a letter to a cousin in England. Tell what happened, explain why the colonists are upset with Parliament, and describe one idea from the Declaration that you think matters most.",
        rubric: [
          "Writes as a colonist in 1776, with a greeting and a closing.",
          "Explains no taxation without representation in their own words.",
          "Names at least one idea from the Declaration, such as rights to life, liberty and the pursuit of happiness.",
          "Uses at least two real facts or names from the lesson.",
        ],
      },
    },
  ],
};
