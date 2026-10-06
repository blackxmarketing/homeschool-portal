import { k5Course } from "./base";

/**
 * span-k: Kindergarten Spanish (an elective), ACTFL Novice Low.
 * Everything is read aloud by Señora Luz, so the words are short and simple.
 * Each new Spanish word gets an English sound-out hint the first time it appears.
 */
export const spanK = k5Course("span", 0, [
  // 1. Greetings and names
  {
    id: "span-k.hola",
    title: "¡Hola! Hello and My Name",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.K.1", "SPAN.K.2", "SPAN.K.3", "SPAN.K.10"],
    read: [
      "Hola (OH-lah) means hello. It is a Spanish word. Spanish is a language. Many millions of people speak it. They live in Mexico, Spain and many countries in Central and South America.",
      "When you leave, say adiós (ah-dee-OHS). Adiós means goodbye. You can also say hasta luego (AHS-tah LWEH-goh). It means see you later.",
      "In the morning, say buenos días (BWEH-nohs DEE-ahs). It means good morning. At bedtime, say buenas noches (BWEH-nahs NOH-chehs). It means good night.",
      "To tell your name, say me llamo (meh YAH-moh). Me llamo Pip means my name is Pip. To ask a name, say ¿cómo te llamas? (KOH-moh teh YAH-mahs). It means what is your name?",
      "In many Spanish-speaking countries, family and friends greet with a hug or a kiss on the cheek. A smile and a hola work everywhere!",
    ].join("\n\n"),
    keyIdeas: [
      "Hola means hello. Adiós means goodbye.",
      "Buenos días means good morning. Buenas noches means good night.",
      "Me llamo means my name is.",
    ],
    hook: {
      text: "¡Hola! 👋 Hola means hello. I am Señora Luz. Today we learn to say hello in Spanish!",
    },
    teach: [
      {
        title: "Hola and Adiós",
        teach:
          "Hola (OH-lah) means hello. 👋 Say it with me: hola! When you see a friend, wave and say hola. Adiós (ah-dee-OHS) means goodbye. Say it with me: adiós! When you leave, wave and say adiós. You can also say hasta luego (AHS-tah LWEH-goh). It means see you later. People say these words in Mexico, Spain and many more countries. Hola when you come. Adiós when you go!",
        visual: {
          type: "flip",
          cards: [
            { front: "hola 👋", back: "hello (OH-lah)" },
            { front: "adiós 🚶", back: "goodbye (ah-dee-OHS)" },
            { front: "hasta luego ⏰", back: "see you later (AHS-tah LWEH-goh)" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Hello or goodbye? Put each word in the right box.",
          buckets: ["Hello 👋😀", "Goodbye 👋🚶"],
          items: [
            { text: "hola", bucket: 0 },
            { text: "adiós", bucket: 1 },
            { text: "hasta luego", bucket: 1 },
          ],
          hint: "Hola is for coming in. Adiós and hasta luego are for going away.",
          mistakes: [
            { match: "hola sorted as goodbye", coach: "Hola means hello. We say it when we come in or meet a friend." },
            { match: "hasta luego sorted as hello", coach: "Hasta luego means see you later. We say it when we leave." },
          ],
          seconds: 20,
        },
        think: {
          q: "What does hola mean?",
          choices: ["goodbye", "hello", "thank you"],
          answer: 1,
          why: "Hola means hello. We say it when we meet someone.",
          hints: [
            "Goodbye is adiós. Hola is the word we say first, when we arrive.",
            "",
            "Thank you is a different word. Hola is what you say when you wave hi.",
          ],
        },
        approaches: {
          analogy: "Hola and adiós are like the two sides of a door. Hola is for walking in. Adiós is for walking out.",
          example: "Grandma rings the bell. You open the door and say, hola! Later she waves at the car. You wave back and say, adiós!",
          simpler: {
            q: "You walk into a room and see a friend. What do you say?",
            choices: ["hola", "adiós"],
            answer: 0,
            why: "You just came in, so you say hello: hola!",
            hints: ["", "Adiós is for leaving. You just walked in, so say hello."],
          },
        },
      },
      {
        title: "Buenos Días and Buenas Noches",
        teach:
          "Spanish has words for the time of day. ☀️ In the morning, say buenos días (BWEH-nohs DEE-ahs). It means good morning. 🌙 At night, say buenas noches (BWEH-nahs NOH-chehs). It means good night. Say buenos días at breakfast. Say buenas noches at bedtime. The sun comes up. What do we say? Buenos días! The stars come out. What do we say? Buenas noches!",
        visual: {
          type: "flip",
          cards: [
            { front: "buenos días ☀️", back: "good morning (BWEH-nohs DEE-ahs)" },
            { front: "buenas noches 🌙", back: "good night (BWEH-nahs NOH-chehs)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to what you say.",
          pairs: [
            { left: "☀️ Morning", right: "buenos días" },
            { left: "🌙 Bedtime", right: "buenas noches" },
            { left: "👋 Coming in", right: "hola" },
            { left: "🚶 Leaving", right: "adiós" },
          ],
          hint: "Días goes with the sunny morning. Noches goes with the night.",
          mistakes: [{ match: "buenos días with bedtime", coach: "Buenos días is good morning. At bedtime we say buenas noches." }],
          seconds: 30,
        },
        think: {
          q: "You eat breakfast in the morning. What do you say?",
          choices: ["buenas noches", "adiós", "buenos días"],
          answer: 2,
          why: "Buenos días means good morning.",
          hints: [
            "Buenas noches is good night. Breakfast is in the morning.",
            "Adiós is goodbye. At breakfast you are saying good morning.",
            "",
          ],
        },
        approaches: {
          analogy: "Buenos días is like opening the curtains in the morning. Buenas noches is like turning off the light at night.",
          example: "You wake up and see Mom. You say, buenos días, mamá! At night she tucks you in. You say, buenas noches!",
          simpler: {
            q: "Which one is for nighttime?",
            choices: ["buenos días", "buenas noches"],
            answer: 1,
            why: "Noches means nights. Buenas noches is good night.",
            hints: ["Buenos días is good morning, for when the sun comes up.", ""],
          },
        },
      },
      {
        title: "Me Llamo...",
        teach:
          "Now let's tell our names. Say me llamo (meh YAH-moh), then your name. Me llamo means my name is. Our firefly friend says, me llamo Pip. ✨ To ask a name, say ¿cómo te llamas? (KOH-moh teh YAH-mahs). It means what is your name? Your friend answers, me llamo, and says a name. Try it! Me llamo... and say your name!",
        visual: {
          type: "flip",
          cards: [
            { front: "me llamo 🙋", back: "my name is (meh YAH-moh)" },
            { front: "¿cómo te llamas? 🤔", back: "what is your name? (KOH-moh teh YAH-mahs)" },
          ],
        },
        probe: {
          type: "build",
          prompt: "Help Pip say: My name is Pip. Tap the words in order.",
          tiles: ["Me", "llamo", "Pip."],
          distractors: ["adiós", "noches"],
          hint: "Start with me llamo, which means my name is. Then say the name.",
          mistakes: [{ match: "adiós", coach: "Adiós means goodbye. To tell a name, say me llamo." }],
          seconds: 20,
        },
        think: {
          q: "What does me llamo mean?",
          choices: ["my name is", "good night", "see you later"],
          answer: 0,
          why: "Me llamo means my name is. Me llamo Pip means my name is Pip.",
          hints: [
            "",
            "Good night is buenas noches. Me llamo comes before your name.",
            "See you later is hasta luego. Me llamo comes before your name.",
          ],
        },
        approaches: {
          analogy: "Me llamo is like a name tag. You stick it on, and then everyone knows your name.",
          example: "A new friend asks, ¿cómo te llamas? Pip smiles and says, me llamo Pip. Now they are friends!",
          simpler: {
            q: "Pip says, me llamo Pip. What is the firefly's name?",
            choices: ["Luz", "Pip", "Hola"],
            answer: 1,
            why: "The name comes right after me llamo. The name is Pip.",
            hints: ["Luz is the teacher's name. Listen to the word after me llamo.", "", "Hola means hello. It is not a name."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put Pip's day in order.",
      steps: ["☀️ Wake up: buenos días!", "👋 Meet a friend: hola!", "🙋 Tell your name: me llamo Pip!", "🚶 Go home: adiós!", "🌙 Bedtime: buenas noches!"],
    },
    explain: {
      prompt: "Teach a grown-up! How do you say hello, goodbye and your name in Spanish?",
      keyPoints: ["Hola means hello", "Adiós means goodbye", "Me llamo tells your name"],
    },
    mastery: [
      {
        type: "cloze",
        text: "Wave hello and say {0}. Wave goodbye and say {1}.",
        blanks: [{ answers: ["hola"] }, { answers: ["adiós", "adios"] }],
        bank: ["hola", "adiós", "noches", "llamo"],
        hint: "Hola is hello. Adiós is goodbye.",
        mistakes: [{ match: "noches", coach: "Noches means nights, as in buenas noches. Hello is hola." }],
        seconds: 20,
      },
      {
        type: "match",
        prompt: "Match each Spanish word to its picture.",
        pairs: [
          { left: "hola", right: "👋 hello" },
          { left: "adiós", right: "🚶 goodbye" },
          { left: "buenos días", right: "☀️ good morning" },
          { left: "buenas noches", right: "🌙 good night" },
        ],
        hint: "Días is for the sunny morning. Noches is for the night.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Ask a friend: What is your name? Tap the words in order.",
        tiles: ["¿Cómo", "te", "llamas?"],
        distractors: ["adiós", "días"],
        hint: "The question is ¿cómo te llamas?",
        seconds: 20,
      },
      {
        type: "sort",
        prompt: "What do you say? Sort each picture.",
        buckets: ["buenos días ☀️", "buenas noches 🌙"],
        items: [
          { text: "🥣 Breakfast", bucket: 0 },
          { text: "🛏️ Bedtime", bucket: 1 },
          { text: "🌅 The sun comes up", bucket: 0 },
          { text: "⭐ The stars come out", bucket: 1 },
        ],
        hint: "Buenos días is for the morning. Buenas noches is for the night.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does hola mean?",
        choices: ["hello", "goodbye", "good night"],
        answer: 0,
        why: "Hola means hello.",
      },
      {
        q: "What do you say at bedtime?",
        choices: ["buenos días", "buenas noches", "hola"],
        answer: 1,
        why: "Buenas noches means good night.",
      },
      {
        q: "What does \"me llamo Pip\" mean?",
        choices: ["I like Pip", "Pip is here", "My name is Pip"],
        answer: 2,
        why: "Me llamo means my name is.",
      },
      {
        q: "In many Spanish-speaking countries, how do family and friends often greet each other?",
        choices: ["With a hug or a kiss on the cheek", "With no greeting at all", "With a loud whistle"],
        answer: 0,
        why: "Family and friends often greet with a hug or a kiss on the cheek, and a warm hola.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "With a grown-up: say buenos días at breakfast and buenas noches at bedtime. Then shake hands and say, hola, me llamo... and your name. Ask your grown-up, ¿cómo te llamas?",
      rubric: [
        "Said hola and adiós at the right times",
        "Said buenos días in the morning or buenas noches at night",
        "Told their name with me llamo",
        "Asked ¿cómo te llamas?",
      ],
    },
  },

  // 2. Numbers 1-10
  {
    id: "span-k.numeros",
    title: "Números: Counting 1 to 10",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.K.4", "SPAN.K.11", "SPAN.K.3", "SPAN.K.2"],
    read: [
      "Números (NOO-meh-rohs) means numbers. Let's count to ten in Spanish!",
      "Uno (OO-noh) is 1. Dos (dohs) is 2. Tres (trehs) is 3. Cuatro (KWAH-troh) is 4. Cinco (SEEN-koh) is 5. That is one whole hand!",
      "Seis (sayss) is 6. Siete (see-EH-teh) is 7. Ocho (OH-choh) is 8. Nueve (NWEH-veh) is 9. Diez (dee-EHS) is 10. That is two whole hands!",
      "We count things the same way in Spanish. Touch each thing one time. Say one number for each. The last number tells how many. Three ducks? Uno, dos, tres. Tres patos!",
      "Count your fingers. Count your toes. Count the steps on the stairs. Now you can count in two languages!",
    ].join("\n\n"),
    keyIdeas: [
      "Uno, dos, tres, cuatro, cinco: 1, 2, 3, 4, 5.",
      "Seis, siete, ocho, nueve, diez: 6, 7, 8, 9, 10.",
      "When we count, the last number tells how many.",
    ],
    hook: {
      text: "Hold up your hands. 🖐️🖐️ How many fingers? Ten! Today we count to ten in Spanish.",
    },
    teach: [
      {
        title: "Uno to Cinco",
        teach:
          "Let's count one hand. ✋ Uno (OO-noh) is 1. Dos (dohs) is 2. Tres (trehs) is 3. Cuatro (KWAH-troh) is 4. Cinco (SEEN-koh) is 5. Say them with me: uno, dos, tres, cuatro, cinco! Hold up one finger for each number. Cinco fingers make one whole hand. Let's do it again, a little faster. Uno, dos, tres, cuatro, cinco!",
        visual: {
          type: "flip",
          cards: [
            { front: "uno ☝️", back: "1 (OO-noh)" },
            { front: "dos ✌️", back: "2 (dohs)" },
            { front: "tres 🍎🍎🍎", back: "3 (trehs)" },
            { front: "cuatro 🍎🍎🍎🍎", back: "4 (KWAH-troh)" },
            { front: "cinco ✋", back: "5 (SEEN-koh)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Count the apples. Match each group to its Spanish number.",
          pairs: [
            { left: "🍎", right: "uno" },
            { left: "🍎🍎", right: "dos" },
            { left: "🍎🍎🍎", right: "tres" },
            { left: "🍎🍎🍎🍎", right: "cuatro" },
            { left: "🍎🍎🍎🍎🍎", right: "cinco" },
          ],
          hint: "Touch each apple and count: uno, dos, tres, cuatro, cinco.",
          mistakes: [{ match: "tres with 4 apples", coach: "Count again: uno, dos, tres, cuatro. Four apples is cuatro." }],
          seconds: 35,
        },
        think: {
          q: "What number is tres?",
          choices: ["2", "3", "5"],
          answer: 1,
          why: "Uno, dos, tres. Tres is 3.",
          hints: ["2 is dos. Count one more: uno, dos, tres.", "", "5 is cinco, a whole hand. Tres comes before that."],
        },
        approaches: {
          analogy: "Counting in Spanish is like singing a song you know with new words. The tune is the same: 1, 2, 3, 4, 5.",
          example: "Hold up fingers one at a time. One finger: uno. Two fingers: dos. Three fingers: tres. Four: cuatro. A whole hand: cinco!",
          simpler: {
            q: "What number is uno?",
            choices: ["1", "5"],
            answer: 0,
            why: "Uno is 1, the very first number.",
            hints: ["", "5 is cinco, a whole hand. Uno is the very first number."],
          },
        },
      },
      {
        title: "Seis to Diez",
        teach:
          "Now the other hand! ✋ Seis (sayss) is 6. Siete (see-EH-teh) is 7. Ocho (OH-choh) is 8. Nueve (NWEH-veh) is 9. Diez (dee-EHS) is 10. Say them with me: seis, siete, ocho, nueve, diez! Diez is two whole hands. 🙌 Now count all ten: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez! You did it!",
        visual: {
          type: "flip",
          cards: [
            { front: "seis", back: "6 (sayss)" },
            { front: "siete", back: "7 (see-EH-teh)" },
            { front: "ocho", back: "8 (OH-choh)" },
            { front: "nueve", back: "9 (NWEH-veh)" },
            { front: "diez 🙌", back: "10 (dee-EHS)" },
          ],
        },
        probe: {
          type: "place",
          prompt: "Put each Spanish number on the number line.",
          min: 0,
          max: 10,
          step: 1,
          tolerance: 0,
          items: [
            { label: "seis", value: 6 },
            { label: "ocho", value: 8 },
            { label: "diez", value: 10 },
          ],
          hint: "Seis is 6, ocho is 8 and diez is 10, at the very end.",
          mistakes: [{ match: "Put ocho at 7", coach: "Siete is 7. Ocho comes next: it is 8." }],
          seconds: 35,
        },
        think: {
          q: "What number is diez?",
          choices: ["6", "8", "10"],
          answer: 2,
          why: "Diez is 10, two whole hands.",
          hints: ["6 is seis. Diez is the biggest number we learned.", "8 is ocho. Count two more to reach diez.", ""],
        },
        approaches: {
          analogy: "Seis to diez is like the second hand in a clapping game. One hand is cinco. Add the other hand to get diez.",
          example: "Show one whole hand: cinco. Add one more finger: seis. Add another: siete. Then ocho, nueve and diez!",
          simpler: {
            q: "What comes right after cinco?",
            choices: ["seis", "diez", "dos"],
            answer: 0,
            why: "Cinco is 5 and seis is 6, so seis comes next.",
            hints: ["", "Diez is 10, the end of the count. What comes right after 5?", "Dos is 2. It comes way before cinco."],
          },
        },
      },
      {
        title: "Counting Things",
        teach:
          "Let's count real things in Spanish. 🦆🦆🦆 Touch each duck one time. Say one number for each duck. Uno, dos, tres. The last number tells how many. Tres! There are tres ducks. Count slowly. Do not skip any. Do not count one twice. You can count spoons, socks and stairs in Spanish too!",
        visual: {
          type: "flip",
          cards: [
            { front: "🦆🦆🦆", back: "uno, dos, tres: tres ducks!" },
            { front: "🧦🧦🧦🧦", back: "uno, dos, tres, cuatro: cuatro socks!" },
            { front: "⭐⭐⭐⭐⭐⭐", back: "uno, dos, tres, cuatro, cinco, seis: seis stars!" },
          ],
        },
        probe: {
          type: "number",
          prompt: "Count the ducks in Spanish: uno, dos, tres... How many ducks? 🦆🦆🦆🦆🦆🦆 Type the number.",
          answer: 6,
          hint: "Touch each duck one time and count: uno, dos, tres, cuatro, cinco, seis.",
          mistakes: [
            { match: "5", coach: "Almost! Count again and touch each duck. The last duck is seis." },
            { match: "7", coach: "Careful not to count a duck twice. Touch each one only once." },
          ],
          seconds: 25,
        },
        think: {
          q: "You count: uno, dos, tres, cuatro. How many things are there?",
          choices: ["4", "3", "1"],
          answer: 0,
          why: "The last number you say tells how many. Cuatro is 4.",
          hints: ["", "Tres was not the last number you said. Listen for the last one.", "Uno was the first number. The last number tells how many."],
        },
        approaches: {
          analogy: "Counting is like giving each thing a ticket. Every thing gets one ticket. The last ticket number tells how many.",
          example: "Five spoons sit on the table. Touch them one by one: uno, dos, tres, cuatro, cinco. The last word is cinco, so there are five spoons.",
          simpler: {
            q: "Count these hearts: ❤️❤️. How many?",
            choices: ["uno", "dos"],
            answer: 1,
            why: "Uno, dos. There are dos hearts.",
            hints: ["Uno is just one. Touch both hearts: uno, dos.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the numbers in order, from uno to diez.",
      steps: ["uno •", "dos ••", "tres •••", "cuatro ••••", "cinco •••••", "seis ••••••", "siete •••••••", "ocho ••••••••", "nueve •••••••••", "diez ••••••••••"],
    },
    explain: {
      prompt: "Count to ten in Spanish for a grown-up. Then tell them how you count a pile of things.",
      keyPoints: ["Counts uno to diez in order", "Touch each thing one time", "The last number tells how many"],
    },
    mastery: [
      {
        type: "number",
        prompt: "Señora Luz says: cinco. Type the number cinco.",
        answer: 5,
        hint: "Cinco is one whole hand: uno, dos, tres, cuatro, cinco.",
        mistakes: [{ match: "4", coach: "4 is cuatro. Cinco is one more: a whole hand." }],
        seconds: 15,
      },
      {
        type: "match",
        prompt: "Match each Spanish number to its number.",
        pairs: [
          { left: "dos", right: "2" },
          { left: "cuatro", right: "4" },
          { left: "siete", right: "7" },
          { left: "nueve", right: "9" },
          { left: "diez", right: "10" },
        ],
        hint: "Count up in Spanish on your fingers to find each one.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "Count with me: uno, dos, {0}, cuatro, {1}!",
        blanks: [{ answers: ["tres"] }, { answers: ["cinco"] }],
        bank: ["tres", "cinco", "ocho", "diez"],
        hint: "After dos comes tres. After cuatro comes cinco.",
        mistakes: [{ match: "ocho", coach: "Ocho is 8. We are counting 1, 2, 3, 4, 5." }],
        seconds: 20,
      },
      {
        type: "place",
        prompt: "Put each Spanish number on the number line.",
        min: 0,
        max: 10,
        step: 1,
        tolerance: 0,
        items: [
          { label: "tres", value: 3 },
          { label: "cinco", value: 5 },
          { label: "nueve", value: 9 },
        ],
        hint: "Tres is 3, cinco is 5 and nueve is 9.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is the Spanish word for 1?",
        choices: ["dos", "uno", "diez"],
        answer: 1,
        why: "Uno is 1.",
      },
      {
        q: "What number is cinco?",
        choices: ["3", "10", "5"],
        answer: 2,
        why: "Cinco is 5, one whole hand.",
      },
      {
        q: "What comes after siete?",
        choices: ["ocho", "seis", "dos"],
        answer: 0,
        why: "Siete is 7 and ocho is 8.",
      },
      {
        q: "You count: uno, dos, tres. How many ducks?",
        choices: ["1", "3", "2"],
        answer: 1,
        why: "The last number tells how many. Tres is 3.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a grown-up, count the spoons in your kitchen in Spanish. Then count your toes and the stairs or chairs in your home, all in Spanish!",
      rubric: [
        "Counted out loud in Spanish",
        "Touched each thing one time",
        "Said how many with the last number",
      ],
    },
  },

  // 3. Colors
  {
    id: "span-k.colores",
    title: "Colores: A Spanish Rainbow",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.K.5", "SPAN.K.11", "SPAN.K.2", "SPAN.K.3"],
    read: [
      "Colores (koh-LOH-rehs) means colors. Let's learn Spanish color words!",
      "Rojo (ROH-hoh) is red, like a strawberry. Azul (ah-SOOL) is blue, like the sea. Amarillo (ah-mah-REE-yoh) is yellow, like a banana.",
      "Painters mix colors to make new ones. Mix amarillo and azul to make verde (VEHR-deh). Verde is green. Mix rojo and amarillo to make naranja (nah-RAHN-hah). Naranja is orange. Mix rojo and azul to make morado (moh-RAH-doh). Morado is purple.",
      "Blanco (BLAHN-koh) is white, like snow. Negro (NEH-groh) is black, like the night sky. Rosa (ROH-sah) is pink, like a flamingo.",
      "To ask about a color, say ¿de qué color es? (deh keh koh-LOHR ehs). It means what color is it? Look around you. What colors can you name in Spanish?",
    ].join("\n\n"),
    keyIdeas: [
      "Rojo is red, azul is blue and amarillo is yellow.",
      "Verde is green, naranja is orange and morado is purple.",
      "Blanco is white, negro is black and rosa is pink.",
    ],
    hook: {
      text: "Look! A rainbow! 🌈 So many colors. Colors have Spanish names too. Let's paint with Spanish words!",
    },
    teach: [
      {
        title: "Rojo, Azul, Amarillo",
        teach:
          "Here are three bright colors. Rojo (ROH-hoh) is red. 🍓 A strawberry is rojo. Azul (ah-SOOL) is blue. 🌊 The sea is azul. Amarillo (ah-mah-REE-yoh) is yellow. 🍌 A banana is amarillo. Say them with me: rojo, azul, amarillo! Painters call these three the primary colors. They mix them to make lots of other colors.",
        visual: {
          type: "flip",
          cards: [
            { front: "rojo 🍓", back: "red (ROH-hoh)" },
            { front: "azul 🌊", back: "blue (ah-SOOL)" },
            { front: "amarillo 🍌", back: "yellow (ah-mah-REE-yoh)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its color in Spanish.",
          pairs: [
            { left: "🍓 strawberry", right: "rojo" },
            { left: "🌊 sea", right: "azul" },
            { left: "🍌 banana", right: "amarillo" },
          ],
          hint: "Rojo is red. Azul is blue. Amarillo is yellow.",
          mistakes: [{ match: "rojo with sea", coach: "The sea is blue. Blue is azul. Rojo is red, like a strawberry." }],
          seconds: 20,
        },
        think: {
          q: "What color is rojo?",
          choices: ["blue", "yellow", "red"],
          answer: 2,
          why: "Rojo is red, like a strawberry.",
          hints: ["Blue is azul, like the sea.", "Yellow is amarillo, like a banana.", ""],
        },
        approaches: {
          analogy: "Learning color words is like getting new crayons with new names. The red crayon is still red. Now it is also called rojo.",
          example: "Hold up a red crayon and say rojo. Hold up a blue crayon and say azul. Hold up a yellow crayon and say amarillo.",
          simpler: {
            q: "A banana is yellow. Which word is yellow?",
            choices: ["amarillo", "azul"],
            answer: 0,
            why: "Amarillo is yellow.",
            hints: ["", "Azul is blue, like the sea. A banana is not blue."],
          },
        },
      },
      {
        title: "Mixing Verde, Naranja and Morado",
        teach:
          "Let's mix paint! 🎨 Mix amarillo and azul. You get verde (VEHR-deh). Verde is green, like a frog. 🐸 Mix rojo and amarillo. You get naranja (nah-RAHN-hah). Naranja is orange, like a carrot. 🥕 Mix rojo and azul. You get morado (moh-RAH-doh). Morado is purple, like grapes. 🍇 Two colors make a brand new color!",
        visual: {
          type: "flip",
          cards: [
            { front: "amarillo + azul", back: "verde: green 🐸 (VEHR-deh)" },
            { front: "rojo + amarillo", back: "naranja: orange 🥕 (nah-RAHN-hah)" },
            { front: "rojo + azul", back: "morado: purple 🍇 (moh-RAH-doh)" },
          ],
        },
        probe: {
          type: "cloze",
          text: "🟡 amarillo + 🔵 azul = {0}. 🔴 rojo + 🟡 amarillo = {1}. 🔴 rojo + 🔵 azul = {2}.",
          blanks: [{ answers: ["verde"] }, { answers: ["naranja"] }, { answers: ["morado"] }],
          bank: ["verde", "naranja", "morado", "blanco", "rosa"],
          hint: "Yellow and blue make green, verde. Red and yellow make orange, naranja. Red and blue make purple, morado.",
          mistakes: [
            { match: "blanco", coach: "Blanco is white. Mixing two paints makes a new bright color, not white." },
            { match: "rosa", coach: "Rosa is pink. Think of the frog, the carrot and the grapes." },
          ],
          seconds: 35,
        },
        think: {
          q: "You mix amarillo and azul. What do you get?",
          choices: ["naranja", "verde", "morado"],
          answer: 1,
          why: "Yellow and blue make green. Green is verde.",
          hints: ["Naranja is made from red and yellow. Here we have yellow and blue.", "", "Morado is made from red and blue. Here we have yellow and blue."],
        },
        approaches: {
          analogy: "Mixing colors is like mixing a smoothie. Banana and berries make a new taste. Two paints make a new color.",
          example: "Put a blob of yellow paint and a blob of blue paint on a plate. Swirl them with a brush. They turn green: verde!",
          simpler: {
            q: "A frog is green. Which word means green?",
            choices: ["rojo", "verde", "azul"],
            answer: 1,
            why: "Verde is green, like a frog.",
            hints: ["Rojo is red, like a strawberry.", "", "Azul is blue, like the sea."],
          },
        },
      },
      {
        title: "Blanco, Negro, Rosa",
        teach:
          "Three more colors! Blanco (BLAHN-koh) is white. ⛄ Snow is blanco. Negro (NEH-groh) is black. 🌑 The night sky is negro. Rosa (ROH-sah) is pink. 🦩 A flamingo is rosa. Want to ask about a color? Say ¿de qué color es? (deh keh koh-LOHR ehs). It means what color is it? Point to a frog. ¿De qué color es? Verde!",
        visual: {
          type: "flip",
          cards: [
            { front: "blanco ⛄", back: "white (BLAHN-koh)" },
            { front: "negro 🌑", back: "black (NEH-groh)" },
            { front: "rosa 🦩", back: "pink (ROH-sah)" },
            { front: "¿de qué color es?", back: "what color is it? (deh keh koh-LOHR ehs)" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each thing by its color.",
          buckets: ["blanco ⚪", "negro ⚫", "rosa 🌸"],
          items: [
            { text: "☁️ a cloud", bucket: 0 },
            { text: "⛄ a snowman", bucket: 0 },
            { text: "🎩 a top hat", bucket: 1 },
            { text: "🎱 the eight ball", bucket: 1 },
            { text: "🦩 a flamingo", bucket: 2 },
            { text: "🐷 a piggy", bucket: 2 },
          ],
          hint: "Blanco is white. Negro is black. Rosa is pink.",
          mistakes: [{ match: "snowman sorted as negro", coach: "Snow is white. White is blanco." }],
          seconds: 35,
        },
        think: {
          q: "Snow is white. How do you say white in Spanish?",
          choices: ["blanco", "negro", "rosa"],
          answer: 0,
          why: "Blanco is white, like snow.",
          hints: ["", "Negro is black, like the night sky.", "Rosa is pink, like a flamingo."],
        },
        approaches: {
          analogy: "Blanco and negro are like day and night. Blanco is bright like a snowy day. Negro is dark like the night sky.",
          example: "Look at a piano. The white keys are blanco. The black keys are negro. Ask, ¿de qué color es? and point to a key!",
          simpler: {
            q: "A flamingo is pink. Which word is pink?",
            choices: ["negro", "rosa"],
            answer: 1,
            why: "Rosa is pink, like a flamingo.",
            hints: ["Negro is black, like the night sky. A flamingo is pink.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Build the rainbow! Put the colors in rainbow order, from the top.",
      steps: ["🔴 rojo", "🟠 naranja", "🟡 amarillo", "🟢 verde", "🔵 azul", "🟣 morado"],
    },
    explain: {
      prompt: "Point to three things near you. Tell a grown-up each color in Spanish. Then say how to make verde.",
      keyPoints: ["Names colors in Spanish", "Rojo is red, azul is blue, amarillo is yellow", "Amarillo and azul make verde"],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each color dot to its Spanish word.",
        pairs: [
          { left: "🔴", right: "rojo" },
          { left: "🟡", right: "amarillo" },
          { left: "🔵", right: "azul" },
          { left: "🟢", right: "verde" },
          { left: "🟣", right: "morado" },
        ],
        hint: "Rojo red, amarillo yellow, azul blue, verde green, morado purple.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "The sun ☀️ is {0}. The grass 🌱 is {1}.",
        blanks: [{ answers: ["amarillo"] }, { answers: ["verde"] }],
        bank: ["amarillo", "verde", "negro", "azul"],
        hint: "Yellow is amarillo. Green is verde.",
        mistakes: [{ match: "azul", coach: "Azul is blue, like the sea. The grass is green: verde." }],
        seconds: 20,
      },
      {
        type: "sort",
        prompt: "Rojo or verde? Sort each thing.",
        buckets: ["rojo 🔴", "verde 🟢"],
        items: [
          { text: "🍓 strawberry", bucket: 0 },
          { text: "🚒 fire truck", bucket: 0 },
          { text: "🍅 tomato", bucket: 0 },
          { text: "🐸 frog", bucket: 1 },
          { text: "🥦 broccoli", bucket: 1 },
          { text: "🍀 clover", bucket: 1 },
        ],
        hint: "Rojo is red. Verde is green.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Ask: What color is it? Tap the words in order.",
        tiles: ["¿De", "qué", "color", "es?"],
        distractors: ["hola", "rojo"],
        hint: "The question is ¿de qué color es?",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What color is azul?",
        choices: ["red", "green", "blue"],
        answer: 2,
        why: "Azul is blue, like the sea.",
      },
      {
        q: "What do you get when you mix rojo and azul?",
        choices: ["morado", "verde", "blanco"],
        answer: 0,
        why: "Red and blue make purple. Purple is morado.",
      },
      {
        q: "A banana is yellow. What is yellow in Spanish?",
        choices: ["negro", "amarillo", "rosa"],
        answer: 1,
        why: "Amarillo is yellow.",
      },
      {
        q: "What does \"¿de qué color es?\" mean?",
        choices: ["How many?", "What is your name?", "What color is it?"],
        answer: 2,
        why: "¿De qué color es? means what color is it?",
      },
    ],
    task: {
      kind: "project",
      prompt: "Color hunt! With a grown-up, find something rojo, azul, amarillo and verde in your home. Point to each one and say its color in Spanish. Then paint or color a rainbow and name each stripe.",
      rubric: [
        "Found at least four colors",
        "Named each color in Spanish",
        "Made a rainbow and named its colors",
      ],
    },
  },

  // 4. Family
  {
    id: "span-k.familia",
    title: "Mi Familia: My Family",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.K.6", "SPAN.K.13", "SPAN.K.3", "SPAN.K.1"],
    read: [
      "La familia (lah fah-MEE-lee-ah) means the family. Mi (mee) means my. Mi familia means my family.",
      "Mamá (mah-MAH) is mom. Papá (pah-PAH) is dad. Bebé (beh-BEH) is baby. These words sound a lot like English!",
      "Hermano (ehr-MAH-noh) is brother. Hermana (ehr-MAH-nah) is sister. The h is quiet in Spanish. We do not say it.",
      "Abuelo (ah-BWEH-loh) is grandpa. Abuela (ah-BWEH-lah) is grandma. Many families in Spanish-speaking countries love to get together with abuelos for big meals.",
      "Te quiero (teh KYEH-roh) means I love you. You can say it to anyone in your family. Te quiero, mamá! Te quiero, abuela!",
      "Use these words at home. Say buenos días, papá at breakfast. Say te quiero at bedtime.",
    ].join("\n\n"),
    keyIdeas: [
      "Mamá is mom, papá is dad and bebé is baby.",
      "Hermano is brother and hermana is sister.",
      "Abuelo is grandpa, abuela is grandma, and te quiero means I love you.",
    ],
    hook: {
      text: "Who lives in your home? 🏡 Maybe a mom, a dad, a brother or a sister. In Spanish, a family is la familia. Let's meet the family words!",
    },
    teach: [
      {
        title: "Mamá, Papá and Bebé",
        teach:
          "La familia (lah fah-MEE-lee-ah) means the family. Mi (mee) means my. So mi familia means my family. Here are some family words. Mamá (mah-MAH) is mom. 👩 Papá (pah-PAH) is dad. 👨 Bebé (beh-BEH) is baby. 👶 They sound a lot like English! Listen. In Spanish, we say the end part louder: mah-MAH, pah-PAH, beh-BEH.",
        visual: {
          type: "flip",
          cards: [
            { front: "mi familia", back: "my family (mee fah-MEE-lee-ah)" },
            { front: "mamá 👩", back: "mom (mah-MAH)" },
            { front: "papá 👨", back: "dad (pah-PAH)" },
            { front: "bebé 👶", back: "baby (beh-BEH)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its Spanish word.",
          pairs: [
            { left: "👩 mom", right: "mamá" },
            { left: "👨 dad", right: "papá" },
            { left: "👶 baby", right: "bebé" },
          ],
          hint: "Mamá is mom. Papá is dad. Bebé is baby.",
          seconds: 20,
        },
        think: {
          q: "What does bebé mean?",
          choices: ["dad", "baby", "family"],
          answer: 1,
          why: "Bebé means baby. It even sounds like baby!",
          hints: ["Dad is papá. Listen: beh-BEH sounds like baby.", "", "Family is familia. Bebé is the littlest one in the family."],
        },
        approaches: {
          analogy: "These words are like cousins of English words. Mamá, papá and bebé look and sound almost like mama, papa and baby.",
          example: "Point to Mom and say mamá. Point to Dad and say papá. Point to a baby picture and say bebé.",
          simpler: {
            q: "Which word means mom?",
            choices: ["mamá", "papá"],
            answer: 0,
            why: "Mamá means mom.",
            hints: ["", "Papá means dad. Mom is mamá."],
          },
        },
      },
      {
        title: "Hermano and Hermana",
        teach:
          "Do you have a brother or a sister? Hermano (ehr-MAH-noh) is brother. 👦 Hermana (ehr-MAH-nah) is sister. 👧 Here is a secret. The h is quiet in Spanish. We do not say it. Listen to the ending. Hermano ends with o. Hermana ends with a. One little letter changes the word! Say them with me: hermano, hermana!",
        visual: {
          type: "flip",
          cards: [
            { front: "hermano 👦", back: "brother (ehr-MAH-noh)" },
            { front: "hermana 👧", back: "sister (ehr-MAH-nah)" },
          ],
        },
        probe: {
          type: "cloze",
          text: "A brother 👦 is a {0}. A sister 👧 is a {1}.",
          blanks: [{ answers: ["hermano"] }, { answers: ["hermana"] }],
          bank: ["hermano", "hermana", "abuelo", "papá"],
          hint: "Hermano ends with o: brother. Hermana ends with a: sister.",
          mistakes: [{ match: "abuelo", coach: "Abuelo is grandpa. A brother is hermano." }],
          seconds: 20,
        },
        think: {
          q: "What does hermana mean?",
          choices: ["sister", "brother", "baby"],
          answer: 0,
          why: "Hermana means sister.",
          hints: ["", "Brother is hermano, with an o at the end. Hermana ends with a.", "Baby is bebé. Hermana is a different family word."],
        },
        approaches: {
          analogy: "Hermano and hermana are like twins with different hats. They look almost the same, but one ends with o and one ends with a.",
          example: "Ana has a big brother, Leo. Ana says, Leo es mi hermano. Leo says, Ana es mi hermana.",
          simpler: {
            q: "Which word starts with a quiet h?",
            choices: ["mamá", "hermano", "bebé"],
            answer: 1,
            why: "Hermano starts with h, and the h is quiet: ehr-MAH-noh.",
            hints: ["Mamá starts with m, and we say the m.", "", "Bebé starts with b, and we say the b."],
          },
        },
      },
      {
        title: "Abuelo, Abuela and Te Quiero",
        teach:
          "Now the grandparents! Abuelo (ah-BWEH-loh) is grandpa. 👴 Abuela (ah-BWEH-lah) is grandma. 👵 Many families in Spanish-speaking countries love big meals with the abuelos. Here are two sweet words. Te quiero (teh KYEH-roh) means I love you. Say it to your family! Te quiero, abuela. Te quiero, papá. Use your Spanish words at home every day.",
        visual: {
          type: "flip",
          cards: [
            { front: "abuelo 👴", back: "grandpa (ah-BWEH-loh)" },
            { front: "abuela 👵", back: "grandma (ah-BWEH-lah)" },
            { front: "te quiero ❤️", back: "I love you (teh KYEH-roh)" },
          ],
        },
        probe: {
          type: "build",
          prompt: "Tell Grandma you love her. Tap the words in order: Te quiero, abuela.",
          tiles: ["Te", "quiero,", "abuela."],
          distractors: ["adiós", "hermano"],
          hint: "Te quiero means I love you. Then say who: abuela.",
          mistakes: [{ match: "hermano", coach: "Hermano is brother. Grandma is abuela." }],
          seconds: 20,
        },
        think: {
          q: "What does te quiero mean?",
          choices: ["good night", "my name is", "I love you"],
          answer: 2,
          why: "Te quiero means I love you.",
          hints: ["Good night is buenas noches.", "My name is, is me llamo.", ""],
        },
        approaches: {
          analogy: "Te quiero is like a hug made of words. You give it to the people you love.",
          example: "Grandpa reads you a story. At the end you hug him and say, te quiero, abuelo! He smiles and says, te quiero!",
          simpler: {
            q: "Which word means grandma?",
            choices: ["abuela", "hermana"],
            answer: 0,
            why: "Abuela means grandma.",
            hints: ["", "Hermana means sister. Grandma is abuela."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the family words. Who is a grown-up, a grandparent or a kid?",
      buckets: ["Grown-ups 👩👨", "Grandparents 👵👴", "Kids 👧👦👶"],
      items: [
        { text: "mamá", bucket: 0 },
        { text: "papá", bucket: 0 },
        { text: "abuela", bucket: 1 },
        { text: "abuelo", bucket: 1 },
        { text: "hermana", bucket: 2 },
        { text: "hermano", bucket: 2 },
        { text: "bebé", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Show a grown-up your family words. Say the Spanish word for mom, dad, brother, sister, grandma and grandpa.",
      keyPoints: ["Mamá is mom and papá is dad", "Hermano is brother and hermana is sister", "Abuelo is grandpa and abuela is grandma", "Te quiero means I love you"],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each family word to its picture.",
        pairs: [
          { left: "abuelo", right: "👴 grandpa" },
          { left: "abuela", right: "👵 grandma" },
          { left: "hermano", right: "👦 brother" },
          { left: "hermana", right: "👧 sister" },
          { left: "bebé", right: "👶 baby" },
        ],
        hint: "Abuelo and abuela are grandparents. Hermano and hermana are brother and sister.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "My mom is mi {0}. My dad is mi {1}.",
        blanks: [{ answers: ["mamá", "mama"] }, { answers: ["papá", "papa"] }],
        bank: ["mamá", "papá", "bebé", "rojo"],
        hint: "Mamá is mom. Papá is dad.",
        mistakes: [{ match: "bebé", coach: "Bebé is baby. Mom is mamá and dad is papá." }],
        seconds: 20,
      },
      {
        type: "number",
        prompt: "Count the family in Spanish: 👨 👩 👧 👦 👶. How many people? Type the number.",
        answer: 5,
        hint: "Touch each one and count: uno, dos, tres, cuatro, cinco.",
        mistakes: [{ match: "4", coach: "Don't forget the bebé! Count again: uno, dos, tres, cuatro, cinco." }],
        seconds: 20,
      },
      {
        type: "build",
        prompt: "Tell Dad you love him. Tap the words in order: Te quiero, papá.",
        tiles: ["Te", "quiero,", "papá."],
        distractors: ["hola", "abuela."],
        hint: "Start with te quiero, then say papá.",
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What does papá mean?",
        choices: ["dad", "mom", "baby"],
        answer: 0,
        why: "Papá means dad.",
      },
      {
        q: "What is a brother in Spanish?",
        choices: ["hermana", "abuelo", "hermano"],
        answer: 2,
        why: "Hermano means brother.",
      },
      {
        q: "What does abuela mean?",
        choices: ["sister", "grandma", "family"],
        answer: 1,
        why: "Abuela means grandma.",
      },
      {
        q: "What does mi familia mean?",
        choices: ["my house", "my family", "my name"],
        answer: 1,
        why: "Mi means my, and familia means family.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Look at a family photo with a grown-up. Point to each person and say the Spanish word: mamá, papá, hermano, hermana, abuelo, abuela or bebé. Then tell someone in your family, te quiero!",
      rubric: [
        "Named at least four family members in Spanish",
        "Said hermano and hermana the right way, with a quiet h",
        "Said te quiero to someone in the family",
      ],
    },
  },

  // 5. Animals
  {
    id: "span-k.animales",
    title: "Animales: Pets and Farm Friends",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.K.7", "SPAN.K.12", "SPAN.K.2", "SPAN.K.3"],
    read: [
      "Animales (ah-nee-MAH-lehs) means animals. Let's meet some!",
      "El perro (el PEH-rroh) is the dog. El gato (el GAH-toh) is the cat. El pez (el pehs) is the fish. El pájaro (el PAH-hah-roh) is the bird. Tengo un perro (TEHN-goh oon PEH-rroh) means I have a dog.",
      "On the farm, la vaca (lah VAH-kah) is the cow. El caballo (el kah-BAH-yoh) is the horse. El pato (el PAH-toh) is the duck. El cerdo (el SEHR-doh) is the pig.",
      "Animals sound a little different in Spanish! A dog says guau guau (gwow gwow). A cat says miau (mee-OW). A cow says mu (moo). A duck says cuac cuac (kwahk kwahk).",
      "Some Spanish words sound like English words. They are word cousins. Animal is animal. León (leh-OHN) is lion. Tigre (TEE-greh) is tiger. Elefante (eh-leh-FAHN-teh) is elephant. Jirafa (hee-RAH-fah) is giraffe. Listen for word cousins. They help you learn fast!",
    ].join("\n\n"),
    keyIdeas: [
      "El perro is the dog and el gato is the cat.",
      "La vaca is the cow, el caballo is the horse and el pato is the duck.",
      "Some Spanish words sound like English words, like león and lion.",
    ],
    hook: {
      text: "Listen! Moo! Quack! Woof! 🐄🦆🐶 The farm animals are talking. Do animals sound the same in Spanish? Let's find out!",
    },
    teach: [
      {
        title: "Pets: Perro and Gato",
        teach:
          "Let's meet the pets. 🐶 El perro (el PEH-rroh) is the dog. In Spanish, a dog says guau guau (gwow gwow)! 🐱 El gato (el GAH-toh) is the cat. A cat says miau (mee-OW). 🐟 El pez (el pehs) is the fish. 🐦 El pájaro (el PAH-hah-roh) is the bird. Do you have a pet? Say tengo (TEHN-goh), which means I have. Tengo un perro means I have a dog!",
        visual: {
          type: "flip",
          cards: [
            { front: "el perro 🐶", back: "the dog (el PEH-rroh). It says guau guau!" },
            { front: "el gato 🐱", back: "the cat (el GAH-toh). It says miau!" },
            { front: "el pez 🐟", back: "the fish (el pehs)" },
            { front: "el pájaro 🐦", back: "the bird (el PAH-hah-roh)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each pet to its Spanish name.",
          pairs: [
            { left: "🐶", right: "el perro" },
            { left: "🐱", right: "el gato" },
            { left: "🐟", right: "el pez" },
            { left: "🐦", right: "el pájaro" },
          ],
          hint: "Perro says guau guau. Gato says miau. Pez swims. Pájaro flies.",
          mistakes: [{ match: "el perro with 🐱", coach: "El perro is the dog. The cat is el gato." }],
          seconds: 30,
        },
        think: {
          q: "What is el gato?",
          choices: ["the dog", "the bird", "the cat"],
          answer: 2,
          why: "El gato is the cat. It says miau!",
          hints: ["The dog is el perro. It says guau guau.", "The bird is el pájaro.", ""],
        },
        approaches: {
          analogy: "Learning animal names is like learning your new classmates' names. Say each name while you look at the face.",
          example: "A dog runs up and barks. You say, ¡hola, perro! A cat curls up on the couch. You say, ¡hola, gato!",
          simpler: {
            q: "Which animal says guau guau?",
            choices: ["el perro", "el pez"],
            answer: 0,
            why: "El perro is the dog, and a dog says guau guau.",
            hints: ["", "El pez is a fish. Fish don't bark!"],
          },
        },
      },
      {
        title: "On the Farm",
        teach:
          "Now let's visit the farm! 🚜 La vaca (lah VAH-kah) is the cow. 🐄 A cow says mu (moo). El caballo (el kah-BAH-yoh) is the horse. 🐴 El pato (el PAH-toh) is the duck. 🦆 A duck says cuac cuac (kwahk kwahk). El cerdo (el SEHR-doh) is the pig. 🐷 Say them with me: vaca, caballo, pato, cerdo! Can you moo like a vaca?",
        visual: {
          type: "flip",
          cards: [
            { front: "la vaca 🐄", back: "the cow (lah VAH-kah). It says mu!" },
            { front: "el caballo 🐴", back: "the horse (el kah-BAH-yoh)" },
            { front: "el pato 🦆", back: "the duck (el PAH-toh). It says cuac cuac!" },
            { front: "el cerdo 🐷", back: "the pig (el SEHR-doh)" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Where does each animal live? Sort them.",
          buckets: ["At home 🏠", "On the farm 🚜"],
          items: [
            { text: "el perro 🐶", bucket: 0 },
            { text: "el gato 🐱", bucket: 0 },
            { text: "el pez 🐟", bucket: 0 },
            { text: "la vaca 🐄", bucket: 1 },
            { text: "el caballo 🐴", bucket: 1 },
            { text: "el cerdo 🐷", bucket: 1 },
          ],
          hint: "Pets like perro, gato and pez live at home. Vaca, caballo and cerdo live on the farm.",
          mistakes: [{ match: "la vaca sorted as at home", coach: "La vaca is a cow. Cows are too big for a house. They live on the farm." }],
          seconds: 35,
        },
        think: {
          q: "Which animal is la vaca?",
          choices: ["the cow", "the horse", "the pig"],
          answer: 0,
          why: "La vaca is the cow. It says mu!",
          hints: ["", "The horse is el caballo.", "The pig is el cerdo."],
        },
        approaches: {
          analogy: "The farm is like a big house with many rooms. The vaca is in the barn, the caballo is in the stable, and the pato is in the pond.",
          example: "Walk around a farm. Point to the cow: la vaca. Point to the horse: el caballo. Point to the duck in the pond: el pato.",
          simpler: {
            q: "Which animal says cuac cuac?",
            choices: ["el caballo", "el pato"],
            answer: 1,
            why: "El pato is the duck, and a duck says cuac cuac.",
            hints: ["El caballo is a horse. Horses neigh. They don't quack.", ""],
          },
        },
      },
      {
        title: "Word Cousins",
        teach:
          "Here is a fun trick. Some Spanish words sound like English words. They are word cousins! Animal is animal (ah-nee-MAHL). 🦁 León (leh-OHN) is lion. 🐯 Tigre (TEE-greh) is tiger. 🐘 Elefante (eh-leh-FAHN-teh) is elephant. 🦒 Jirafa (hee-RAH-fah) is giraffe. Listen close. Do they sound like English? Yes! Word cousins help you learn Spanish fast.",
        visual: {
          type: "flip",
          cards: [
            { front: "el león 🦁", back: "lion (leh-OHN)" },
            { front: "el tigre 🐯", back: "tiger (TEE-greh)" },
            { front: "el elefante 🐘", back: "elephant (eh-leh-FAHN-teh)" },
            { front: "la jirafa 🦒", back: "giraffe (hee-RAH-fah)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Find the word cousins. Match each Spanish word to its English word.",
          pairs: [
            { left: "león", right: "lion" },
            { left: "tigre", right: "tiger" },
            { left: "elefante", right: "elephant" },
            { left: "jirafa", right: "giraffe" },
          ],
          hint: "Say each Spanish word out loud. Which English word does it sound like?",
          seconds: 30,
        },
        think: {
          q: "Elefante is a word cousin. What English word does it sound like?",
          choices: ["eagle", "elephant", "egg"],
          answer: 1,
          why: "Elefante sounds like elephant. They are word cousins.",
          hints: ["Eagle starts the same, but listen to the end: eh-leh-FAHN-teh.", "", "Egg is too short. Elefante is a long word, like elephant."],
        },
        approaches: {
          analogy: "Word cousins are like a family that looks alike. You can tell they are related because they sound so much the same.",
          example: "Say tigre slowly: TEE-greh. Now say tiger. They sound alike! So tigre must mean tiger.",
          simpler: {
            q: "León sounds like which English word?",
            choices: ["lion", "lamp"],
            answer: 0,
            why: "León sounds like lion. They are word cousins.",
            hints: ["", "Lamp does not sound like leh-OHN. Lion does."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Word cousins or not? Does the Spanish word sound like the English word?",
      buckets: ["Sounds like English 👂✅", "Sounds different 👂🔄"],
      items: [
        { text: "el león (lion)", bucket: 0 },
        { text: "el elefante (elephant)", bucket: 0 },
        { text: "el tigre (tiger)", bucket: 0 },
        { text: "el animal (animal)", bucket: 0 },
        { text: "el perro (dog)", bucket: 1 },
        { text: "la vaca (cow)", bucket: 1 },
        { text: "el pato (duck)", bucket: 1 },
        { text: "el caballo (horse)", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell a grown-up the Spanish names for three animals. What does a dog say in Spanish? What is a word cousin?",
      keyPoints: ["Names animals like perro, gato and vaca", "A dog says guau guau", "Word cousins sound alike in Spanish and English"],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each animal to its Spanish name.",
        pairs: [
          { left: "🐶", right: "el perro" },
          { left: "🐱", right: "el gato" },
          { left: "🐄", right: "la vaca" },
          { left: "🦆", right: "el pato" },
          { left: "🐴", right: "el caballo" },
        ],
        hint: "Perro is dog, gato is cat, vaca is cow, pato is duck, caballo is horse.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "In Spanish, a dog 🐶 says {0}. A cat 🐱 says {1}.",
        blanks: [{ answers: ["guau guau"] }, { answers: ["miau"] }],
        bank: ["guau guau", "miau", "mu", "cuac cuac"],
        hint: "A dog says guau guau. A cat says miau.",
        mistakes: [
          { match: "mu", coach: "Mu is what a cow says. A dog says guau guau." },
          { match: "cuac cuac", coach: "Cuac cuac is what a duck says." },
        ],
        seconds: 20,
      },
      {
        type: "number",
        prompt: "Count the cows in Spanish: 🐄🐄🐄🐄. How many vacas? Type the number.",
        answer: 4,
        hint: "Touch each cow and count: uno, dos, tres, cuatro.",
        mistakes: [{ match: "3", coach: "Count again and touch each cow: uno, dos, tres, cuatro." }],
        seconds: 15,
      },
      {
        type: "build",
        prompt: "Say: I have a dog. Tap the words in order.",
        tiles: ["Tengo", "un", "perro."],
        distractors: ["gato", "hola"],
        hint: "Tengo means I have. Then say un perro.",
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What is el perro?",
        choices: ["the cat", "the dog", "the fish"],
        answer: 1,
        why: "El perro is the dog.",
      },
      {
        q: "What does a duck say in Spanish?",
        choices: ["cuac cuac", "miau", "guau guau"],
        answer: 0,
        why: "A duck says cuac cuac. A cat says miau and a dog says guau guau.",
      },
      {
        q: "León is a word cousin. What does it mean?",
        choices: ["tiger", "horse", "lion"],
        answer: 2,
        why: "León sounds like lion, and it means lion.",
      },
      {
        q: "Which animal lives on the farm?",
        choices: ["el pez", "la vaca", "el gato"],
        answer: 1,
        why: "La vaca, the cow, lives on the farm.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Play animal charades with a grown-up! Take turns acting like an animal. The other person guesses in Spanish: el perro, el gato, la vaca, el pato, el caballo or el cerdo.",
      rubric: [
        "Named at least four animals in Spanish",
        "Made the Spanish animal sounds, like guau guau and miau",
        "Found one word cousin, like león and lion",
      ],
    },
  },

  // 6. Feelings and polite words
  {
    id: "span-k.cortesia",
    title: "¿Cómo Estás? Feelings and Kind Words",
    minutes: 15,
    stage: "rhetoric",
    standards: ["SPAN.K.8", "SPAN.K.9", "SPAN.K.1", "SPAN.K.13"],
    read: [
      "¿Cómo estás? (KOH-moh ehs-TAHS) means how are you? Friends ask it when they meet.",
      "You can answer, estoy bien (ehs-TOY bee-EHN). It means I am fine. Muy bien (mwee bee-EHN) means very good. Estoy mal (mahl) means I feel bad.",
      "Feelings have words too. Estoy feliz (feh-LEES) means I am happy. Estoy triste (TREES-teh) means I am sad.",
      "Kind words make friends everywhere. Por favor (pohr fah-VOHR) means please. Gracias (GRAH-see-ahs) means thank you. De nada (deh NAH-dah) means you are welcome.",
      "Here is a tiny talk. Hola! ¿Cómo estás? Muy bien, gracias. Agua (AH-gwah), por favor. Here you go! Gracias! De nada. Adiós!",
      "Use your kind words at home. Say por favor and gracias at dinner. Your family will smile!",
    ].join("\n\n"),
    keyIdeas: [
      "¿Cómo estás? means how are you? Estoy bien means I am fine.",
      "Feliz means happy and triste means sad.",
      "Por favor is please, gracias is thank you and de nada is you are welcome.",
    ],
    hook: {
      text: "How do you feel today? 😀😢 Feelings have Spanish words. Kind words do too. Kind words make friends everywhere!",
    },
    teach: [
      {
        title: "¿Cómo Estás?",
        teach:
          "When friends meet, they say hola. Then they ask, ¿cómo estás? (KOH-moh ehs-TAHS). It means how are you? You can answer, estoy bien (ehs-TOY bee-EHN). It means I am fine. 👍 Feeling great? Say muy bien (mwee bee-EHN). It means very good! Feeling sick? Say estoy mal (mahl). It means I feel bad. 🤒 Then ask your friend, ¿cómo estás?",
        visual: {
          type: "flip",
          cards: [
            { front: "¿cómo estás? 🤔", back: "how are you? (KOH-moh ehs-TAHS)" },
            { front: "estoy bien 👍", back: "I am fine (ehs-TOY bee-EHN)" },
            { front: "muy bien 🌟", back: "very good (mwee bee-EHN)" },
            { front: "estoy mal 🤒", back: "I feel bad (ehs-TOY mahl)" },
          ],
        },
        probe: {
          type: "build",
          prompt: "Your friend asks, ¿cómo estás? Answer: I am fine. Tap the words in order.",
          tiles: ["Estoy", "bien."],
          distractors: ["mal.", "Adiós"],
          hint: "Estoy means I am. Bien means fine.",
          mistakes: [{ match: "mal.", coach: "Mal means bad. To say I am fine, use bien." }],
          seconds: 15,
        },
        think: {
          q: "What does ¿cómo estás? mean?",
          choices: ["what is your name?", "how are you?", "what color is it?"],
          answer: 1,
          why: "¿Cómo estás? means how are you?",
          hints: ["What is your name is ¿cómo te llamas?", "", "What color is it is ¿de qué color es?"],
        },
        approaches: {
          analogy: "¿Cómo estás? is like knocking on a friend's door to see how they are doing inside.",
          example: "Pip flies over and says, hola! ¿Cómo estás? You smile and say, muy bien, gracias!",
          simpler: {
            q: "Which answer means I am fine?",
            choices: ["estoy bien", "estoy mal"],
            answer: 0,
            why: "Bien means fine or well. Estoy bien means I am fine.",
            hints: ["", "Mal means bad. Estoy mal means I feel bad."],
          },
        },
      },
      {
        title: "Feliz and Triste",
        teach:
          "Feelings have words. Estoy feliz (ehs-TOY feh-LEES) means I am happy. 😀 You might feel feliz at a birthday party. Estoy triste (ehs-TOY TREES-teh) means I am sad. 😢 You might feel triste when it rains on picnic day. All feelings are okay. Saying them out loud helps your family know how you feel. Show me a feliz face!",
        visual: {
          type: "flip",
          cards: [
            { front: "feliz 😀", back: "happy (feh-LEES)" },
            { front: "triste 😢", back: "sad (TREES-teh)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each face to the Spanish word.",
          pairs: [
            { left: "😀", right: "feliz" },
            { left: "😢", right: "triste" },
            { left: "👍", right: "bien" },
            { left: "🤒", right: "mal" },
          ],
          hint: "Feliz is happy. Triste is sad. Bien is fine. Mal is bad.",
          mistakes: [{ match: "feliz with 😢", coach: "Feliz means happy. The crying face is triste." }],
          seconds: 25,
        },
        think: {
          q: "You get a puppy for your birthday! How do you feel?",
          choices: ["estoy triste", "estoy mal", "estoy feliz"],
          answer: 2,
          why: "A new puppy makes you happy. Estoy feliz means I am happy.",
          hints: ["Triste means sad. A new puppy is happy news!", "Mal means bad. A new puppy is a good thing!", ""],
        },
        approaches: {
          analogy: "Feeling words are like a weather report for your heart. Feliz is sunny. Triste is rainy.",
          example: "Your tower of blocks falls down. You say, estoy triste. Then you build it again, even taller. Now you say, estoy feliz!",
          simpler: {
            q: "Which word means happy?",
            choices: ["triste", "feliz"],
            answer: 1,
            why: "Feliz means happy.",
            hints: ["Triste means sad, like a rainy day.", ""],
          },
        },
      },
      {
        title: "Por Favor and Gracias",
        teach:
          "Now the kind words. Por favor (pohr fah-VOHR) means please. Gracias (GRAH-see-ahs) means thank you. De nada (deh NAH-dah) means you are welcome. Want some water? Say agua (AH-gwah), por favor. 💧 Your friend gives you the water. You say, gracias! Your friend says, de nada. 😊 Kind words make everyone smile.",
        visual: {
          type: "flip",
          cards: [
            { front: "por favor 🙏", back: "please (pohr fah-VOHR)" },
            { front: "gracias 😊", back: "thank you (GRAH-see-ahs)" },
            { front: "de nada 👍", back: "you are welcome (deh NAH-dah)" },
            { front: "agua 💧", back: "water (AH-gwah)" },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the kind talk in order.",
          steps: ["🙋 Agua, por favor.", "🥤 Here you go!", "😊 ¡Gracias!", "👍 De nada."],
          hint: "First ask with por favor. Then you get the water. Then say gracias. Last comes de nada.",
          seconds: 30,
        },
        think: {
          q: "Someone gives you a gift. What do you say?",
          choices: ["gracias", "de nada", "adiós"],
          answer: 0,
          why: "Gracias means thank you.",
          hints: ["", "De nada is what the gift giver says after you say thank you.", "Adiós means goodbye. Say thank you first!"],
        },
        approaches: {
          analogy: "Por favor and gracias are like the bookends on a shelf. Por favor goes before you get something. Gracias goes after.",
          example: "At dinner you want the bread. You say, bread, por favor. Dad passes it. You say, gracias! Dad says, de nada.",
          simpler: {
            q: "Which word means please?",
            choices: ["gracias", "por favor"],
            answer: 1,
            why: "Por favor means please.",
            hints: ["Gracias means thank you. Please is por favor.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the words: a feeling word or a kind word?",
      buckets: ["Feelings 😀😢", "Kind words 🙏😊"],
      items: [
        { text: "feliz", bucket: 0 },
        { text: "triste", bucket: 0 },
        { text: "bien", bucket: 0 },
        { text: "mal", bucket: 0 },
        { text: "por favor", bucket: 1 },
        { text: "gracias", bucket: 1 },
        { text: "de nada", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Have a tiny talk in Spanish with a grown-up. Ask how they are, and use please and thank you.",
      keyPoints: ["Asks ¿cómo estás?", "Answers estoy bien or a feeling", "Por favor means please", "Gracias means thank you"],
    },
    mastery: [
      {
        type: "cloze",
        text: "You want water. You say, agua, {0}. You get a gift 🎁. You say {1}!",
        blanks: [{ answers: ["por favor"] }, { answers: ["gracias"] }],
        bank: ["por favor", "gracias", "adiós", "triste"],
        hint: "Ask with por favor. Say thank you with gracias.",
        mistakes: [
          { match: "adiós", coach: "Adiós means goodbye. To say thank you, use gracias." },
          { match: "triste", coach: "Triste means sad. A gift makes you say gracias!" },
        ],
        seconds: 20,
      },
      {
        type: "match",
        prompt: "Match each Spanish word to its English meaning.",
        pairs: [
          { left: "por favor", right: "please" },
          { left: "gracias", right: "thank you" },
          { left: "de nada", right: "you're welcome" },
          { left: "feliz", right: "happy" },
          { left: "triste", right: "sad" },
        ],
        hint: "Por favor is please. Gracias is thank you. De nada is you're welcome.",
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Ask a friend: How are you? Tap the words in order.",
        tiles: ["¿Cómo", "estás?"],
        distractors: ["llamas?", "gracias"],
        hint: "How are you is ¿cómo estás?",
        seconds: 15,
      },
      {
        type: "sequence",
        prompt: "Put this talk between two friends in order.",
        steps: ["👋 ¡Hola!", "🤔 ¿Cómo estás?", "😀 Muy bien, gracias.", "🚶 ¡Adiós!"],
        hint: "Start with hola. Ask how they are. Answer. End with adiós.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does gracias mean?",
        choices: ["please", "thank you", "goodbye"],
        answer: 1,
        why: "Gracias means thank you.",
      },
      {
        q: "Your friend says gracias. What do you say back?",
        choices: ["de nada", "por favor", "estoy mal"],
        answer: 0,
        why: "De nada means you are welcome.",
      },
      {
        q: "What does estoy triste mean?",
        choices: ["I am happy", "I am fine", "I am sad"],
        answer: 2,
        why: "Triste means sad.",
      },
      {
        q: "Your friend asks, ¿cómo estás? What is a good answer?",
        choices: ["me llamo Pip", "rojo", "muy bien, gracias"],
        answer: 2,
        why: "Muy bien, gracias means very good, thank you.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "At dinner tonight, use your kind Spanish words. Ask for food with por favor. Say gracias when you get it. Ask someone, ¿cómo estás? and tell them how you feel.",
      rubric: [
        "Used por favor when asking for something",
        "Said gracias, and de nada when someone thanked them",
        "Asked ¿cómo estás? and answered with a feeling word",
      ],
    },
  },
]);
