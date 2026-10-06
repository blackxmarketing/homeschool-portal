import { k5Course } from "./base";

/**
 * span-3: Grade 3 Spanish (an elective), ACTFL Novice Mid. Kids already know
 * greetings, numbers to 100, colors, family, animals, feelings, the body,
 * food with me gusta, school things, days, weather, introducing themselves,
 * clothes, rooms of the house, months and birthdays. Taught by Señora Luz.
 */
export const span3 = k5Course("span", 3, [
  // 1. Places in town
  {
    id: "span-3.town",
    title: "En el pueblo: Places in Town",
    minutes: 25,
    stage: "grammar",
    standards: ["SPAN.3.1", "SPAN.3.2", "SPAN.3.3", "SPAN.3.10", "SPAN.3.12"],
    read: [
      "¡Hola, amigos! Today we take a trip around town in Spanish. 🏘️ El pueblo (PWEH-bloh) means the town. La ciudad (see-oo-DAHD) means the city.",
      "Here are places where we learn and play. La escuela (es-KWEH-lah) is the school. 🏫 El parque (PAR-keh) is the park. 🌳 La biblioteca (bee-blee-oh-TEH-kah) is the library, where you can borrow books for free. 📚 El mercado (mer-KAH-doh) is the market, where farmers sell fruit and vegetables. 🍎",
      "Here are places where we shop and get help. La tienda (tee-EN-dah) is the store. 🛒 La panadería (pah-nah-deh-REE-ah) is the bakery, where bakers make fresh bread early in the morning. 🥖 El restaurante (res-tow-RAHN-teh) is the restaurant. 🍽️ El banco (BAHN-koh) is the bank, where people keep their money safe. 🏦 El hospital (ohs-pee-TAHL) is the hospital. 🏥 In Spanish the letter h is silent, so hospital starts with an o sound.",
      "To ask a friend where they are going, say ¿Adónde vas? (ah-DOHN-deh vahs). It means where are you going? To answer, say voy a (boy ah). It means I am going to. Voy a la escuela means I am going to school. Voy a la biblioteca means I am going to the library.",
      "Here is a special Spanish rule. When the little words a and el meet, they squeeze together into one word: al (ahl). We never say a el parque. We say voy al parque, I am going to the park. Voy al mercado. Voy al banco. With la, nothing changes: voy a la tienda.",
      "English doesn't squeeze words this way, so this is a Spanish trick to remember. Next time you ride through your town, name the places you pass in Spanish! 🚗",
    ].join("\n\n"),
    keyIdeas: [
      "La escuela, el parque, la biblioteca and el mercado are the school, park, library and market.",
      "La tienda, la panadería, el banco and el hospital are the store, bakery, bank and hospital.",
      "¿Adónde vas? asks where are you going. Voy a ... answers I am going to ...",
      "A and el join to make al: voy al parque. With la, nothing changes: voy a la tienda.",
    ],
    hook: {
      text: "The Sky Islands have a little town with a balloon station. 🎈 The balloon pilot asks every rider, ¿Adónde vas? That means where are you going? Pip wants a ride to the island with the big library. Let's help Pip answer in Spanish! 🏘️",
    },
    teach: [
      {
        title: "Places Where We Learn and Play",
        teach:
          "El pueblo (PWEH-bloh) means the town. Let's visit some places! La escuela (es-KWEH-lah) is the school. 🏫 We learn there. El parque (PAR-keh) is the park. 🌳 We run and play there. La biblioteca (bee-blee-oh-TEH-kah) is the library. 📚 We borrow books there for free. El mercado (mer-KAH-doh) is the market. 🍎 Farmers sell fruit and vegetables there. Say them with me: la escuela, el parque, la biblioteca, el mercado. ¡Muy bien!",
        visual: {
          type: "flip",
          cards: [
            { front: "la escuela 🏫", back: "school. Say: es-KWEH-lah." },
            { front: "el parque 🌳", back: "park. Say: PAR-keh." },
            { front: "la biblioteca 📚", back: "library. Say: bee-blee-oh-TEH-kah." },
            { front: "el mercado 🍎", back: "market. Say: mer-KAH-doh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each place to what we do there.",
          pairs: [
            { left: "la escuela", right: "🏫 We learn." },
            { left: "el parque", right: "🌳 We run and play." },
            { left: "la biblioteca", right: "📚 We borrow books." },
            { left: "el mercado", right: "🍎 We buy fruit and vegetables." },
          ],
          hint: "Escuela is school, parque is park, biblioteca is library and mercado is market.",
          mistakes: [{ match: "Mixed up biblioteca and escuela", coach: "You can learn in both! La biblioteca is the one full of books to borrow." }],
          seconds: 35,
        },
        think: {
          q: "What is la biblioteca?",
          choices: ["the market", "the library", "the park"],
          answer: 1,
          why: "La biblioteca is the library, where we borrow books. 📚",
          hints: [
            "The market is el mercado. La biblioteca has books.",
            "",
            "The park is el parque. La biblioteca has books.",
          ],
        },
        approaches: {
          analogy:
            "Think of a map of your town with Spanish name tags on each building: the school wears la escuela and the library wears la biblioteca.",
          example:
            "On Saturday, Ana goes to el mercado to buy apples. Then she goes to la biblioteca to borrow a book. Then she reads it in el parque.",
          simpler: {
            q: "What is el parque?",
            choices: ["the park", "the school"],
            answer: 0,
            why: "El parque is the park. 🌳",
            hints: ["", "The school is la escuela. El parque has trees and swings."],
          },
        },
      },
      {
        title: "Places Where We Shop and Get Help",
        teach:
          "Here are more places in town. La tienda (tee-EN-dah) is the store. 🛒 La panadería (pah-nah-deh-REE-ah) is the bakery. 🥖 Bakers make fresh bread there early in the morning. El restaurante (res-tow-RAHN-teh) is the restaurant. 🍽️ El banco (BAHN-koh) is the bank. 🏦 People keep their money safe there. El hospital (ohs-pee-TAHL) is the hospital. 🏥 Here is a fun fact. In Spanish, the letter h is silent. So hospital starts with an o sound!",
        visual: {
          type: "flip",
          cards: [
            { front: "la tienda 🛒", back: "store. Say: tee-EN-dah." },
            { front: "la panadería 🥖", back: "bakery. Say: pah-nah-deh-REE-ah." },
            { front: "el restaurante 🍽️", back: "restaurant. Say: res-tow-RAHN-teh." },
            { front: "el banco 🏦", back: "bank. Say: BAHN-koh." },
            { front: "el hospital 🏥", back: "hospital. Say: ohs-pee-TAHL. The h is silent!" },
          ],
        },
        probe: {
          type: "cloze",
          text: "I buy fresh bread at la {0}. 🥖 I keep my money safe at el {1}. 🏦 We eat dinner out at el {2}. 🍽️",
          blanks: [{ answers: ["panadería", "panaderia"] }, { answers: ["banco"] }, { answers: ["restaurante"] }],
          bank: ["panadería", "banco", "restaurante", "parque", "hospital"],
          hint: "Pan means bread, so the panadería is the bakery. Money goes in the banco. Dinner out is at the restaurante.",
          mistakes: [
            { match: "parque", coach: "El parque is the park. We play there, but we don't buy bread or keep money there." },
            { match: "hospital", coach: "El hospital is where doctors help sick people. Look for the bakery, bank and restaurant." },
          ],
          seconds: 35,
        },
        think: {
          q: "Where do bakers make fresh bread?",
          choices: ["el banco", "el hospital", "la panadería"],
          answer: 2,
          why: "La panadería is the bakery. Pan means bread! 🥖",
          hints: [
            "El banco is the bank, where people keep money.",
            "El hospital is where doctors and nurses help people.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Panadería has pan inside it, and pan means bread. The word is like a bread basket with the bread tucked right inside.",
          example:
            "Papá needs bread and money for the week. First he goes to el banco. Then he walks to la panadería and buys a warm loaf. 🥖",
          simpler: {
            q: "What does pan mean?",
            choices: ["money", "bread", "book"],
            answer: 1,
            why: "Pan means bread, so the panadería is the bread shop.",
            hints: ["Money is dinero. Pan is something you eat.", "", "A book is un libro. Pan is something you eat."],
          },
        },
      },
      {
        title: "¿Adónde vas? Voy a...",
        teach:
          "To ask where a friend is going, say ¿Adónde vas? (ah-DOHN-deh vahs). It means where are you going? To answer, say voy a (boy ah). It means I am going to. Voy a la escuela. I am going to school. 🏫 Now here is a special rule. When a and el meet, they squeeze together into one word: al (ahl). We don't say a el parque. We say voy al parque. 🌳 With la, nothing changes. Voy a la tienda. 🛒",
        visual: {
          type: "compare",
          left: { title: "La places 🅰️", points: ["a + la = a la", "Voy a la escuela.", "Voy a la tienda.", "Nothing changes."] },
          right: { title: "El places ➡️", points: ["a + el = al", "Voy al parque.", "Voy al banco.", "The words squeeze together!"] },
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: I am going to the park. 🌳",
          tiles: ["Voy", "al", "parque"],
          distractors: ["el", "Vas", "escuela"],
          hint: "Start with Voy (I am going). Parque is an el word, so a + el squeezes into al.",
          mistakes: [
            { match: "el", coach: "A and el squeeze together into al. So we say voy al parque." },
            { match: "Vas", coach: "Vas means you go. To say I am going, use voy." },
          ],
          seconds: 30,
        },
        think: {
          q: "How do you say I am going to the market?",
          choices: ["Voy al mercado.", "Voy a el mercado.", "¿Adónde vas?"],
          answer: 0,
          why: "Mercado is an el word, and a + el squeezes into al: voy al mercado.",
          hints: [
            "",
            "Close! But a and el always squeeze together into al.",
            "¿Adónde vas? is the question. It asks where are you going.",
          ],
        },
        approaches: {
          analogy:
            "A and el are like two friends who hug so tight they become one word, al. A and la just stand side by side.",
          example:
            "The pilot asks, ¿Adónde vas? Pip wants the library, a la word: Voy a la biblioteca. Later Pip wants the park, an el word: Voy al parque.",
          simpler: {
            q: "What does voy a mean?",
            choices: ["I live in", "I am going to"],
            answer: 1,
            why: "Voy a means I am going to, like voy a la escuela.",
            hints: ["I live in is vivo en. Voy a tells where you are going.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it voy a la or voy al? Sort each place.",
      buckets: ["Voy a la ... 🅰️", "Voy al ... ➡️"],
      items: [
        { text: "escuela 🏫", bucket: 0 },
        { text: "biblioteca 📚", bucket: 0 },
        { text: "tienda 🛒", bucket: 0 },
        { text: "panadería 🥖", bucket: 0 },
        { text: "parque 🌳", bucket: 1 },
        { text: "mercado 🍎", bucket: 1 },
        { text: "banco 🏦", bucket: 1 },
        { text: "hospital 🏥", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz how to ask a friend where they are going, and how to answer. Name three places in town and tell her the al trick.",
      keyPoints: [
        "¿Adónde vas? means where are you going",
        "Voy a means I am going to",
        "A and el join to make al, like voy al parque",
        "Names places like la escuela, el parque or la biblioteca",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each place to its picture.",
        pairs: [
          { left: "la escuela", right: "🏫" },
          { left: "la biblioteca", right: "📚" },
          { left: "la panadería", right: "🥖" },
          { left: "el banco", right: "🏦" },
          { left: "el hospital", right: "🏥" },
        ],
        hint: "Escuela: school. Biblioteca: library. Panadería: bakery. Banco: bank. Hospital: hospital.",
        mistakes: [{ match: "Mixed up banco and biblioteca", coach: "Both start with b! El banco keeps money. La biblioteca keeps books." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Pilot: ¿Adónde {0}? 🎈 Pip: {1} a la biblioteca. 📚 Then I am going {2} parque. 🌳",
        blanks: [{ answers: ["vas"] }, { answers: ["Voy"] }, { answers: ["al"] }],
        bank: ["vas", "Voy", "al", "el", "llamo"],
        hint: "The question is ¿Adónde vas? The answer starts with voy. A + el squeezes into al.",
        mistakes: [
          { match: "el", coach: "Remember, a and el squeeze together into al." },
          { match: "llamo", coach: "Llamo goes with your name. Here we talk about where we are going." },
        ],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: I am going to the library. 📚",
        tiles: ["Voy", "a", "la", "biblioteca"],
        distractors: ["al", "banco"],
        hint: "Biblioteca is a la word, so nothing squeezes: voy a la biblioteca.",
        mistakes: [{ match: "al", coach: "Al is only for el words. Biblioteca is a la word, so say a la." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the two sentences that are written the right Spanish way.",
        sentences: ["Voy al parque. 🌳", "Voy a el mercado. 🍎", "Voy a la tienda. 🛒", "Voy al escuela. 🏫"],
        correct: [0, 2],
        hint: "El words use al. La words use a la.",
        mistakes: [{ match: "Picked Voy a el mercado", coach: "A and el always squeeze into al: voy al mercado." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is la biblioteca?",
        choices: ["the bakery", "the bank", "the library"],
        answer: 2,
        why: "La biblioteca is the library, where we borrow books.",
      },
      {
        q: "How do you say I am going to the park?",
        choices: ["Voy al parque.", "Voy a el parque.", "Vas al parque."],
        answer: 0,
        why: "Parque is an el word, and a + el makes al: voy al parque.",
      },
      {
        q: "What does ¿Adónde vas? mean?",
        choices: ["What is your name?", "Where are you going?", "How old are you?"],
        answer: 1,
        why: "¿Adónde vas? means where are you going?",
      },
      {
        q: "Where do you buy fresh bread?",
        choices: ["la panadería", "el banco", "el hospital"],
        answer: 0,
        why: "La panadería is the bakery. Pan means bread.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "On your next drive or walk around town, play ¿Adónde vas? with a parent. Your parent asks ¿Adónde vas? and you answer with a place you pass, like voy al parque or voy a la tienda. Then switch and you ask!",
      rubric: [
        "Names at least four places in town in Spanish",
        "Answers with voy a la or voy al",
        "Uses al with el places, like voy al banco",
        "Asks ¿Adónde vas? at least once",
      ],
    },
  },

  // 2. Sports and hobbies
  {
    id: "span-3.sports",
    title: "Los deportes: Sports and Hobbies",
    minutes: 25,
    stage: "grammar",
    standards: ["SPAN.3.3", "SPAN.3.4", "SPAN.3.11"],
    read: [
      "Los deportes (deh-POR-tes) means sports. ⚽ Let's talk about the games and hobbies we love!",
      "To play a sport, say jugar (hoo-GAR). Then add al and the sport. Jugar al fútbol (FOOT-bohl) means to play soccer. ⚽ Jugar al béisbol (BAYS-bohl) is to play baseball. ⚾ Jugar al baloncesto (bah-lohn-SES-toh) is to play basketball. 🏀 Jugar al tenis (TEH-nees) is to play tennis. 🎾",
      "Here is a surprise. In most of the world, fútbol means soccer, not American football! Fútbol is the favorite sport in most Spanish-speaking countries. Béisbol is a favorite too in some places, like the Dominican Republic and Venezuela.",
      "Some fun things are not games you play. They are action words all by themselves. Nadar (nah-DAR) is to swim. 🏊 Correr (koh-RRER) is to run. 🏃 Montar en bicicleta (mohn-TAR en bee-see-KLEH-tah) is to ride a bike. 🚲 Leer (leh-ER) is to read. 📖 Dibujar (dee-boo-HAR) is to draw. 🎨 Cantar (kahn-TAR) is to sing. 🎤 Bailar (bai-LAR) is to dance. 💃 Most Spanish action words end in ar, er or ir.",
      "You already know me gusta for food: me gusta la pizza. You can use it with action words too! Me gusta nadar means I like to swim. Me gusta jugar al fútbol means I like to play soccer. To say you don't like something, put no in front: no me gusta correr.",
      "To ask a friend, say ¿Qué te gusta hacer? (keh teh GOOS-tah ah-SER). That means what do you like to do? You can also ask ¿Te gusta nadar? Do you like to swim? Your friend says sí or no.",
    ].join("\n\n"),
    keyIdeas: [
      "Jugar al ... means to play a sport: jugar al fútbol, jugar al béisbol, jugar al baloncesto.",
      "Nadar, correr, leer, dibujar, cantar and bailar are action words for hobbies.",
      "Me gusta + an action word tells what you like to do. No me gusta tells what you don't.",
      "¿Qué te gusta hacer? asks a friend what they like to do.",
    ],
    hook: {
      text: "On the Sky Islands, kids play games on a floating field. ⚽ A girl named Marisol kicks the ball to Pip and calls, ¡Me gusta jugar al fútbol! Pip wants to say what Pip likes to do too. Let's learn how! 🎉",
    },
    teach: [
      {
        title: "Jugar al ...: Playing Sports",
        teach:
          "Los deportes (deh-POR-tes) means sports. To play a sport, say jugar (hoo-GAR), then al, then the sport. Jugar al fútbol (FOOT-bohl) is to play soccer. ⚽ Jugar al béisbol (BAYS-bohl) is to play baseball. ⚾ Jugar al baloncesto (bah-lohn-SES-toh) is to play basketball. 🏀 Jugar al tenis (TEH-nees) is to play tennis. 🎾 Here is a surprise. In most of the world, fútbol means soccer! It is the favorite sport in most Spanish-speaking countries.",
        visual: {
          type: "flip",
          cards: [
            { front: "jugar al fútbol ⚽", back: "to play soccer. Say: hoo-GAR ahl FOOT-bohl." },
            { front: "jugar al béisbol ⚾", back: "to play baseball. Say: BAYS-bohl." },
            { front: "jugar al baloncesto 🏀", back: "to play basketball. Say: bah-lohn-SES-toh." },
            { front: "jugar al tenis 🎾", back: "to play tennis. Say: TEH-nees." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each sport to its ball.",
          pairs: [
            { left: "el fútbol", right: "⚽" },
            { left: "el béisbol", right: "⚾" },
            { left: "el baloncesto", right: "🏀" },
            { left: "el tenis", right: "🎾" },
          ],
          hint: "Fútbol is soccer, béisbol is baseball, baloncesto is basketball and tenis is tennis.",
          mistakes: [{ match: "Put fútbol with the football", coach: "Surprise! Fútbol means soccer, the round black and white ball. ⚽" }],
          seconds: 30,
        },
        think: {
          q: "In Spanish, what sport is el fútbol?",
          choices: ["American football", "baseball", "soccer"],
          answer: 2,
          why: "In most of the world, fútbol means soccer. ⚽",
          hints: [
            "It sounds like football, but in Spanish fútbol is played by kicking a round ball into a goal.",
            "Baseball is el béisbol. Fútbol is played with your feet.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Jugar al is like a door into any game. Walk through the door and add the sport: jugar al fútbol, jugar al tenis.",
          example:
            "Marisol loves to kick a ball into the goal. She says, Me gusta jugar al fútbol. Her brother loves to shoot hoops, so he plays baloncesto.",
          simpler: {
            q: "What does jugar mean?",
            choices: ["to play", "to eat"],
            answer: 0,
            why: "Jugar means to play, like jugar al fútbol.",
            hints: ["", "To eat is comer. Jugar is what you do with a ball."],
          },
        },
      },
      {
        title: "Action Words for Hobbies",
        teach:
          "Some fun things are not games. They are action words all by themselves. Nadar (nah-DAR) is to swim. 🏊 Correr (koh-RRER) is to run. 🏃 Montar en bicicleta (mohn-TAR en bee-see-KLEH-tah) is to ride a bike. 🚲 Leer (leh-ER) is to read. 📖 Dibujar (dee-boo-HAR) is to draw. 🎨 Cantar (kahn-TAR) is to sing. 🎤 Bailar (bai-LAR) is to dance. 💃 Look at the endings. Most Spanish action words end in ar, er or ir. Act each one out as you say it!",
        visual: {
          type: "flip",
          cards: [
            { front: "nadar 🏊", back: "to swim. Say: nah-DAR." },
            { front: "correr 🏃", back: "to run. Say: koh-RRER." },
            { front: "montar en bicicleta 🚲", back: "to ride a bike." },
            { front: "leer 📖", back: "to read. Say: leh-ER." },
            { front: "dibujar 🎨", back: "to draw. Say: dee-boo-HAR." },
            { front: "cantar 🎤", back: "to sing. Say: kahn-TAR." },
            { front: "bailar 💃", back: "to dance. Say: bai-LAR." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each action word to its picture.",
          pairs: [
            { left: "nadar", right: "🏊" },
            { left: "correr", right: "🏃" },
            { left: "leer", right: "📖" },
            { left: "dibujar", right: "🎨" },
            { left: "cantar", right: "🎤" },
            { left: "bailar", right: "💃" },
          ],
          hint: "Nadar is swim, correr is run, leer is read, dibujar is draw, cantar is sing and bailar is dance.",
          mistakes: [{ match: "Mixed up cantar and bailar", coach: "Cantar is to sing with your voice. Bailar is to dance with your feet." }],
          seconds: 45,
        },
        think: {
          q: "What does nadar mean?",
          choices: ["to swim", "to run", "to draw"],
          answer: 0,
          why: "Nadar means to swim. 🏊",
          hints: ["", "To run is correr.", "To draw is dibujar."],
        },
        approaches: {
          analogy:
            "Action words are like the buttons on a game controller. Each one makes you do something: nadar makes you swim, correr makes you run.",
          example:
            "At the lake, Leo jumps in and swims. That is nadar. Then he runs on the beach. That is correr. At night he reads a book. That is leer.",
          simpler: {
            q: "What does leer mean?",
            choices: ["to sing", "to read", "to dance"],
            answer: 1,
            why: "Leer means to read. 📖",
            hints: ["To sing is cantar.", "", "To dance is bailar."],
          },
        },
      },
      {
        title: "Me gusta + Action Word",
        teach:
          "You already know me gusta (meh GOOS-tah) for food. Me gusta la pizza. Now use it with action words! Me gusta nadar. I like to swim. Me gusta jugar al béisbol. I like to play baseball. To say you don't like something, put no in front. No me gusta correr. I don't like to run. To ask a friend, say ¿Qué te gusta hacer? (keh teh GOOS-tah ah-SER). It means what do you like to do? Or ask ¿Te gusta bailar? Do you like to dance? Answer sí or no.",
        visual: {
          type: "compare",
          left: { title: "I like 😀", points: ["Me gusta nadar.", "Me gusta leer.", "Me gusta jugar al fútbol."] },
          right: { title: "I don't like 🙁", points: ["No me gusta correr.", "No me gusta cantar.", "Put no in front!"] },
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: I like to play soccer. ⚽",
          tiles: ["Me", "gusta", "jugar", "al", "fútbol"],
          distractors: ["No", "nadar"],
          hint: "Start with Me gusta (I like). Then jugar al (to play) and the sport.",
          mistakes: [
            { match: "No", coach: "No makes it I don't like. This sentence says you DO like soccer." },
            { match: "nadar", coach: "Nadar is to swim. Soccer is played: jugar al fútbol." },
          ],
          seconds: 35,
        },
        think: {
          q: "What does no me gusta correr mean?",
          choices: ["I like to run.", "I don't like to run.", "Do you like to run?"],
          answer: 1,
          why: "No in front turns it around: I don't like to run.",
          hints: [
            "Look at the first word. No turns I like into I don't like.",
            "",
            "A question would be ¿Te gusta correr? This one starts with no.",
          ],
        },
        approaches: {
          analogy:
            "Me gusta is like a thumbs up 👍. Put no in front and the thumb flips down 👎: no me gusta.",
          example:
            "Your friend asks, ¿Qué te gusta hacer? You love drawing but not singing. You say, Me gusta dibujar. No me gusta cantar.",
          simpler: {
            q: "What does me gusta mean?",
            choices: ["I like", "I am", "I have"],
            answer: 0,
            why: "Me gusta means I like, like me gusta nadar.",
            hints: ["", "I am is soy or estoy. Me gusta tells what you like.", "I have is tengo. Me gusta tells what you like."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it a sport you play with jugar al, or an action word all by itself?",
      buckets: ["Jugar al ... ⚽", "Action word 🏃"],
      items: [
        { text: "fútbol ⚽", bucket: 0 },
        { text: "béisbol ⚾", bucket: 0 },
        { text: "baloncesto 🏀", bucket: 0 },
        { text: "tenis 🎾", bucket: 0 },
        { text: "nadar 🏊", bucket: 1 },
        { text: "correr 🏃", bucket: 1 },
        { text: "dibujar 🎨", bucket: 1 },
        { text: "bailar 💃", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz what you like to do and what you don't like to do, in Spanish. Then tell her what fútbol means.",
      keyPoints: [
        "Me gusta + an action word tells what you like to do",
        "No me gusta tells what you don't like",
        "Jugar al goes before a sport, like jugar al béisbol",
        "Fútbol means soccer",
        "¿Qué te gusta hacer? asks what a friend likes to do",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Marisol: ¿Qué te {0} hacer? ⚽ Pip: Me gusta {1} al baloncesto. 🏀 No me gusta {2}. 🏊",
        blanks: [{ answers: ["gusta"] }, { answers: ["jugar"] }, { answers: ["nadar"] }],
        bank: ["gusta", "jugar", "nadar", "llamo", "voy"],
        hint: "¿Qué te gusta hacer? asks what you like. Sports use jugar al. The swimming picture is nadar.",
        mistakes: [
          { match: "voy", coach: "Voy means I am going. To play a sport, use jugar." },
          { match: "llamo", coach: "Llamo goes with your name. The question is ¿Qué te gusta hacer?" },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match the Spanish to the English.",
        pairs: [
          { left: "Me gusta leer.", right: "I like to read." },
          { left: "No me gusta cantar.", right: "I don't like to sing." },
          { left: "¿Te gusta bailar?", right: "Do you like to dance?" },
          { left: "Me gusta montar en bicicleta.", right: "I like to ride a bike." },
        ],
        hint: "No in front means don't. ¿Te gusta...? is a question. Leer is read, cantar is sing, bailar is dance.",
        mistakes: [{ match: "Mixed up leer and cantar", coach: "Leer is to read a book. Cantar is to sing a song." }],
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Sort each sentence: does it say I like or I don't like?",
        buckets: ["I like 👍", "I don't like 👎"],
        items: [
          { text: "Me gusta nadar.", bucket: 0 },
          { text: "Me gusta jugar al tenis.", bucket: 0 },
          { text: "Me gusta dibujar.", bucket: 0 },
          { text: "No me gusta correr.", bucket: 1 },
          { text: "No me gusta bailar.", bucket: 1 },
          { text: "No me gusta jugar al béisbol.", bucket: 1 },
        ],
        hint: "Look at the first word. If it starts with no, it means I don't like.",
        mistakes: [{ match: "Put a no sentence in I like", coach: "No at the start flips it: no me gusta means I don't like." }],
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: I don't like to dance. 💃",
        tiles: ["No", "me", "gusta", "bailar"],
        distractors: ["cantar", "jugar"],
        hint: "Put no in front of me gusta, then the action word for dance: bailar.",
        mistakes: [{ match: "cantar", coach: "Cantar is to sing. To dance is bailar." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "In Spanish, what is el fútbol?",
        choices: ["soccer", "basketball", "American football"],
        answer: 0,
        why: "In most of the world, fútbol means soccer.",
      },
      {
        q: "How do you say I like to swim?",
        choices: ["No me gusta nadar.", "Me gusta correr.", "Me gusta nadar."],
        answer: 2,
        why: "Me gusta means I like and nadar means to swim.",
      },
      {
        q: "What does ¿Qué te gusta hacer? mean?",
        choices: ["Where are you going?", "What do you like to do?", "What time is it?"],
        answer: 1,
        why: "¿Qué te gusta hacer? asks what do you like to do?",
      },
      {
        q: "Which one means to draw?",
        choices: ["bailar", "dibujar", "leer"],
        answer: 1,
        why: "Dibujar means to draw. Bailar is to dance and leer is to read.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Play Charades in Spanish with a parent. Act out a sport or hobby without talking. Your parent guesses in Spanish, like ¡nadar! Then switch. At the end, tell your parent two things you like to do and one thing you don't, in Spanish.",
      rubric: [
        "Names at least four sports or hobbies in Spanish",
        "Uses jugar al with a sport",
        "Says two sentences with me gusta",
        "Says one sentence with no me gusta",
      ],
    },
  },

  // 3. Telling time
  {
    id: "span-3.time",
    title: "¿Qué hora es? Telling Time",
    minutes: 30,
    stage: "logic",
    standards: ["SPAN.3.3", "SPAN.3.5"],
    read: [
      "¿Qué hora es? (keh OH-rah es) means what time is it? ⏰ Today you will tell time in Spanish. El reloj (reh-LOH) is the clock.",
      "For one o'clock, say es la una (es lah OO-nah). 🕐 For every other hour, say son las (sohn lahs) and the number. Son las dos is two o'clock. 🕑 Son las tres is three o'clock. 🕒 Son las diez is ten o'clock. 🕙 Why the difference? Una is just one, so it gets es. Two and up are more than one, so they get son.",
      "Here is some clock math. An hour has sesenta (60) minutes. Half of sesenta is treinta (30). So half past is y media (ee MEH-dyah), and half means a half hour. Son las cuatro y media is 4:30. 🕟 A quarter of an hour is quince (15) minutes, so quarter past is y cuarto (ee KWAR-toh). Son las dos y cuarto is 2:15. Es la una y media is 1:30. To say exactly on the hour, add en punto (en POON-toh): son las ocho en punto.",
      "To tell when something happens, ask ¿A qué hora...? (ah keh OH-rah). That means at what time? Answer with a las and the number. ¿A qué hora es el almuerzo? Lunch is a las doce, at twelve. For one o'clock, say a la una.",
      "Spanish speakers also tell the part of the day. De la mañana (deh lah mah-NYAH-nah) means in the morning. De la tarde (TAR-deh) means in the afternoon. De la noche (NOH-cheh) means at night. Me levanto a las siete de la mañana means I get up at seven in the morning. 🌅",
      "Look at a clock at home today and say the time in Spanish!",
    ].join("\n\n"),
    keyIdeas: [
      "¿Qué hora es? asks what time it is.",
      "Es la una is one o'clock. Son las dos, son las tres... for all the other hours.",
      "Y media is half past (30 minutes). Y cuarto is quarter past (15 minutes).",
      "¿A qué hora...? asks at what time. A las ocho de la mañana means at eight in the morning.",
    ],
    hook: {
      text: "The big clock tower on Sky Island has stopped! 🕰️ The balloon pilots don't know when to fly. The clockmaker shouts, ¿Qué hora es? Pip needs to tell the time in Spanish to get the balloons flying again. ⏰",
    },
    teach: [
      {
        title: "Es la una, Son las dos",
        teach:
          "¿Qué hora es? (keh OH-rah es) means what time is it? El reloj (reh-LOH) is the clock. For one o'clock, say es la una (es lah OO-nah). 🕐 For every other hour, say son las (sohn lahs) and the number. Son las dos is two o'clock. 🕑 Son las cinco is five o'clock. 🕔 Son las doce is twelve o'clock. 🕛 Why the difference? Una is just one hour, so it gets es. Two and up are more than one, so they get son. You already know your numbers, so you can say any hour!",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Qué hora es? ⏰", back: "What time is it? Say: keh OH-rah es." },
            { front: "Es la una. 🕐", back: "It is one o'clock." },
            { front: "Son las dos. 🕑", back: "It is two o'clock." },
            { front: "Son las cinco. 🕔", back: "It is five o'clock." },
            { front: "Son las doce. 🕛", back: "It is twelve o'clock." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each time to its clock.",
          pairs: [
            { left: "Es la una.", right: "🕐 1:00" },
            { left: "Son las tres.", right: "🕒 3:00" },
            { left: "Son las seis.", right: "🕕 6:00" },
            { left: "Son las nueve.", right: "🕘 9:00" },
            { left: "Son las once.", right: "🕚 11:00" },
          ],
          hint: "Listen for the number: una is 1, tres is 3, seis is 6, nueve is 9 and once is 11.",
          mistakes: [{ match: "Mixed up once and doce", coach: "Once is 11 and doce is 12. Once sounds like OHN-seh." }],
          seconds: 40,
        },
        think: {
          q: "How do you say it is one o'clock?",
          choices: ["Son las una.", "Es la una.", "Son las dos."],
          answer: 1,
          why: "One o'clock is just one hour, so it uses es: es la una.",
          hints: [
            "Son las is for two and up. One o'clock uses es la.",
            "",
            "Dos is two. One o'clock is es la una.",
          ],
        },
        approaches: {
          analogy:
            "Es is for one thing, like one apple. Son is for many, like many apples. One o'clock gets es. All the bigger hours get son.",
          example:
            "The clock shows 8:00. Find the number word: ocho. Eight is more than one, so use son las. Son las ocho!",
          simpler: {
            q: "Son las siete. What time is it?",
            choices: ["6:00", "7:00", "10:00"],
            answer: 1,
            why: "Siete is 7, so son las siete is 7:00.",
            hints: ["6 is seis. Siete is one more.", "", "10 is diez. Siete is 7."],
          },
        },
      },
      {
        title: "Y media and Y cuarto",
        teach:
          "Now some clock math! An hour has sesenta minutes, 60. Half of sesenta is treinta, 30. So half past is y media (ee MEH-dyah). Son las cuatro y media is 4:30. 🕟 A quarter of an hour is quince minutes, 15. So quarter past is y cuarto (ee KWAR-toh). Son las dos y cuarto is 2:15. Es la una y media is 1:30. 🕜 When it is exactly on the hour, add en punto (en POON-toh). Son las ocho en punto. It is eight o'clock sharp!",
        visual: {
          type: "compare",
          left: { title: "y cuarto ¼", points: ["quarter past", "15 minutes", "Son las dos y cuarto = 2:15"] },
          right: { title: "y media ½", points: ["half past", "30 minutes", "Son las cuatro y media = 4:30"] },
        },
        probe: {
          type: "place",
          prompt: "Drag each time to its spot on the clock line. (2.5 means 2:30.)",
          min: 1,
          max: 6,
          step: 0.25,
          tolerance: 0,
          items: [
            { label: "Son las dos y media", value: 2.5 },
            { label: "Son las tres y cuarto", value: 3.25 },
            { label: "Son las cinco en punto", value: 5 },
          ],
          hint: "Y media is half an hour past. Y cuarto is a quarter hour past. En punto is right on the hour.",
          mistakes: [
            { match: "Put dos y media at 2.25", coach: "Media means half, 30 minutes. That's halfway between 2 and 3." },
            { match: "Put tres y cuarto at 3.5", coach: "Cuarto means a quarter, only 15 minutes past 3." },
          ],
          seconds: 40,
        },
        think: {
          q: "Son las cuatro y media. What time is it?",
          choices: ["4:15", "4:00", "4:30"],
          answer: 2,
          why: "Y media means half past, 30 minutes. So it is 4:30.",
          hints: [
            "That's y cuarto, a quarter past. Media means half.",
            "That's en punto, right on the hour. Y media adds half an hour.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Think of the clock as a pizza. 🍕 Y media is half the pizza, 30 minutes. Y cuarto is one quarter slice, 15 minutes.",
          example:
            "The clock shows 9:30. The hour is nueve, so son las nueve. The 30 minutes is half an hour, y media. Son las nueve y media!",
          simpler: {
            q: "How many minutes is half an hour?",
            choices: ["15", "30", "60"],
            answer: 1,
            why: "An hour is 60 minutes, and half of 60 is 30. That's y media.",
            hints: ["15 is a quarter of an hour, y cuarto.", "", "60 is a whole hour."],
          },
        },
      },
      {
        title: "¿A qué hora? At What Time?",
        teach:
          "To ask when something happens, say ¿A qué hora...? (ah keh OH-rah). It means at what time? Answer with a las and the number. ¿A qué hora es el almuerzo (ahl-MWER-soh)? When is lunch? A las doce. At twelve. 🥪 For one o'clock, say a la una. Spanish speakers also tell the part of the day. De la mañana (mah-NYAH-nah) is in the morning. 🌅 De la tarde (TAR-deh) is in the afternoon. ☀️ De la noche (NOH-cheh) is at night. 🌙 A las ocho de la noche means at eight at night.",
        visual: {
          type: "sequence",
          prompt: "Put the parts of the day in order, starting when you wake up.",
          steps: ["de la mañana 🌅", "de la tarde ☀️", "de la noche 🌙"],
        },
        probe: {
          type: "build",
          prompt: "Build the answer: Lunch is at twelve. ¿A qué hora es el almuerzo? 🥪",
          tiles: ["El almuerzo", "es", "a las", "doce"],
          distractors: ["a la", "dos"],
          hint: "Say el almuerzo es, then a las and the number for twelve: doce.",
          mistakes: [
            { match: "a la", coach: "A la is only for one o'clock, a la una. Twelve uses a las." },
            { match: "dos", coach: "Dos is two. Twelve is doce." },
          ],
          seconds: 35,
        },
        think: {
          q: "What does a las siete de la mañana mean?",
          choices: ["at seven at night", "at seven in the morning", "at eleven in the morning"],
          answer: 1,
          why: "Siete is 7 and de la mañana means in the morning.",
          hints: [
            "At night is de la noche. Mañana is the morning.",
            "",
            "Eleven is once. Siete is 7.",
          ],
        },
        approaches: {
          analogy:
            "¿Qué hora es? is like looking at the clock right now. ¿A qué hora? is like looking at your schedule to see when something will happen.",
          example:
            "Your friend asks, ¿A qué hora es el fútbol? Soccer practice is at four in the afternoon. You answer, A las cuatro de la tarde.",
          simpler: {
            q: "What does de la noche mean?",
            choices: ["at night", "in the morning"],
            answer: 0,
            why: "De la noche means at night. 🌙",
            hints: ["", "In the morning is de la mañana. Noche is night."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Pip's day on Sky Island. Put the times in order, from earliest to latest.",
      steps: [
        "Son las siete de la mañana. 🌅",
        "Son las nueve y media de la mañana. 🏫",
        "Son las doce. 🥪",
        "Son las tres y cuarto de la tarde. ⚽",
        "Son las seis de la tarde. 🍽️",
        "Son las ocho y media de la noche. 🌙",
      ],
    },
    explain: {
      prompt: "Explain to Señora Luz how to tell time in Spanish. When do you say es la and when do you say son las? What do y media and y cuarto mean?",
      keyPoints: [
        "Es la una is for one o'clock",
        "Son las is for two o'clock and up",
        "Y media means half past, 30 minutes",
        "Y cuarto means quarter past, 15 minutes",
        "¿Qué hora es? asks what time it is",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Drag each time to its spot on the clock line. (7.5 means 7:30.)",
        min: 6,
        max: 12,
        step: 0.25,
        tolerance: 0,
        items: [
          { label: "Son las siete y media", value: 7.5 },
          { label: "Son las nueve en punto", value: 9 },
          { label: "Son las diez y cuarto", value: 10.25 },
          { label: "Son las once y media", value: 11.5 },
        ],
        hint: "Siete is 7, nueve is 9, diez is 10 and once is 11. Media adds a half hour; cuarto adds a quarter.",
        mistakes: [{ match: "Put once y media at 12.5", coach: "Once is 11, not 12. Doce is 12." }],
        seconds: 45,
      },
      {
        type: "number",
        prompt: "Son las tres y cuarto. ⏰ How many minutes past three is it? Type the number.",
        answer: 15,
        unit: "minutes",
        hint: "Cuarto means a quarter. A quarter of 60 minutes is 15.",
        mistakes: [
          { match: "30", coach: "30 minutes is y media, half past. Cuarto is a quarter, which is smaller." },
          { match: "4", coach: "Cuarto sounds like cuatro, but it means a quarter of an hour." },
        ],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "¿Qué {0} es? ⏰ {1} la una. 🕐 Later: Son {2} dos y media. 🕝",
        blanks: [{ answers: ["hora"] }, { answers: ["Es"] }, { answers: ["las"] }],
        bank: ["hora", "Es", "las", "Son", "noche"],
        hint: "The question is ¿Qué hora es? One o'clock uses es la. Two and up use son las.",
        mistakes: [
          { match: "Son", coach: "Son is for two and up. One o'clock is es la una." },
          { match: "noche", coach: "Noche means night. The question is ¿Qué hora es?" },
        ],
        seconds: 35,
      },
      {
        type: "highlight",
        prompt: "Tap the two times written the right Spanish way.",
        sentences: ["Es la una y media. 🕜", "Son la una. 🕐", "Son las cuatro y cuarto. 🕓", "Es las seis. 🕕"],
        correct: [0, 2],
        hint: "One o'clock uses es la. Every other hour uses son las.",
        mistakes: [{ match: "Picked Es las seis", coach: "Six is more than one, so it's son las seis." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does ¿Qué hora es? mean?",
        choices: ["What time is it?", "Where are you going?", "What do you like to do?"],
        answer: 0,
        why: "¿Qué hora es? means what time is it?",
      },
      {
        q: "Son las ocho y media. What time is it?",
        choices: ["8:15", "8:00", "8:30"],
        answer: 2,
        why: "Ocho is 8 and y media is half past, so it is 8:30.",
      },
      {
        q: "Which one says it is one o'clock?",
        choices: ["Son las once.", "Es la una.", "Son las una."],
        answer: 1,
        why: "One o'clock uses es la: es la una.",
      },
      {
        q: "What does de la tarde mean?",
        choices: ["in the morning", "at night", "in the afternoon"],
        answer: 2,
        why: "De la tarde means in the afternoon.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Be the Spanish clock for a day! Three times today, look at a clock and tell a parent the time in Spanish, like son las cuatro y media. Then tell your parent what time you eat dinner using a las.",
      rubric: [
        "Says the time in Spanish three times",
        "Uses es la una or son las correctly",
        "Uses y media or y cuarto at least once",
        "Answers when dinner is with a las and a number",
      ],
    },
  },

  // 4. Describing people and things
  {
    id: "span-3.describe",
    title: "¿Cómo es? Describing People and Things",
    minutes: 30,
    stage: "logic",
    standards: ["SPAN.3.3", "SPAN.3.6", "SPAN.3.10"],
    read: [
      "¿Cómo es? (KOH-moh es) means what is it like? 🤔 Today you will describe people, animals and things in Spanish.",
      "Es (es) means is. Describing words come after it. Alto (AHL-toh) means tall. 🦒 Bajo (BAH-hoh) means short. Grande (GRAHN-deh) means big. 🐘 Pequeño (peh-KEH-nyoh) means small. 🐭 Rápido (RAH-pee-doh) means fast. 🐆 Lento (LEN-toh) means slow. 🐢 Simpático (seem-PAH-tee-koh) means nice and friendly. 😊 Fuerte (FWER-teh) means strong. 💪 Inteligente (een-teh-lee-HEN-teh) means smart. 🧠 La jirafa es alta. The giraffe is tall. El ratón es pequeño. The mouse is small.",
      "Now here is the big Spanish trick. Describing words change their ending to match. You know that some words go with el and some go with la. El words take a describing word ending in o. La words take a describing word ending in a. El perro es pequeño. La casa es pequeña. El tío es alto. La tía es alta. Mi abuelo es simpático. Mi abuela es simpática.",
      "Some describing words end in e. Those are easy! They stay the same for el words and la words. El elefante es grande. La casa es grande. El oso es fuerte. La hormiga es fuerte too! 🐜 Inteligente works the same way.",
      "English describing words never change their endings. A tall uncle and a tall aunt are both just tall. That is one way Spanish is different.",
      "Remember, in Spanish the describing word comes after the thing, just like colors do. A big dog is un perro grande. A fast cat is un gato rápido. 🐱",
      "When you describe people, use kind words. ¡Mi amigo es simpático!",
    ].join("\n\n"),
    keyIdeas: [
      "¿Cómo es? asks what someone or something is like. Es means is.",
      "El words take describing words ending in o: el perro es pequeño.",
      "La words take describing words ending in a: la casa es pequeña.",
      "Words ending in e, like grande and fuerte, stay the same for el and la words.",
    ],
    hook: {
      text: "A new friend is coming to Sky Island on the next balloon. 🎈 Pip asks, ¿Cómo es? What is your friend like? The answer comes in Spanish: Es alta y simpática. What does that mean? Let's find out! 🔎",
    },
    teach: [
      {
        title: "Es + a Describing Word",
        teach:
          "¿Cómo es? (KOH-moh es) means what is it like? Es means is, and then comes a describing word. Alto (AHL-toh) means tall 🦒, and bajo (BAH-hoh) means short. Grande (GRAHN-deh) means big 🐘, and pequeño (peh-KEH-nyoh) means small. 🐭 Rápido (RAH-pee-doh) means fast 🐆, and lento (LEN-toh) means slow. 🐢 Simpático (seem-PAH-tee-koh) means nice and friendly 😊, and fuerte (FWER-teh) means strong. 💪 Listen: el elefante es grande, the elephant is big. El ratón es pequeño, the mouse is small.",
        visual: {
          type: "flip",
          cards: [
            { front: "alto 🦒 / bajo", back: "tall / short. Say: AHL-toh, BAH-hoh." },
            { front: "grande 🐘 / pequeño 🐭", back: "big / small. Say: GRAHN-deh, peh-KEH-nyoh." },
            { front: "rápido 🐆 / lento 🐢", back: "fast / slow. Say: RAH-pee-doh, LEN-toh." },
            { front: "simpático 😊", back: "nice and friendly. Say: seem-PAH-tee-koh." },
            { front: "fuerte 💪", back: "strong. Say: FWER-teh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each animal sentence to what it means.",
          pairs: [
            { left: "El elefante es grande. 🐘", right: "The elephant is big." },
            { left: "El ratón es pequeño. 🐭", right: "The mouse is small." },
            { left: "El guepardo es rápido. 🐆", right: "The cheetah is fast." },
            { left: "El caracol es lento. 🐌", right: "The snail is slow." },
          ],
          hint: "Grande is big, pequeño is small, rápido is fast and lento is slow.",
          mistakes: [{ match: "Mixed up rápido and lento", coach: "Rápido sounds like rapid, which means fast. Lento is slow, like a snail." }],
          seconds: 35,
        },
        think: {
          q: "What does el elefante es grande mean?",
          choices: ["The elephant is big.", "The elephant is slow.", "The elephant is small."],
          answer: 0,
          why: "Grande means big, so the elephant is big. 🐘",
          hints: ["", "Slow is lento. Grande is about size.", "Small is pequeño. Grande is the opposite."],
        },
        approaches: {
          analogy:
            "Describing words are like stickers you put on a picture. Es is the glue: el perro es, then the sticker, rápido!",
          example:
            "Look at a turtle. 🐢 Is it fast or slow? Slow! So say: La tortuga es lenta. Look at a cheetah. It is fast: El guepardo es rápido.",
          simpler: {
            q: "What does rápido mean?",
            choices: ["tall", "slow", "fast"],
            answer: 2,
            why: "Rápido means fast, like the word rapid.",
            hints: ["Tall is alto.", "Slow is lento, the opposite of rápido.", ""],
          },
        },
      },
      {
        title: "O Words and A Words: Making a Match",
        teach:
          "Here is the big Spanish trick. Describing words change their ending to match. You know some words go with el and some go with la. El words take a describing word ending in o. La words take a describing word ending in a. El perro es pequeño. 🐶 La casa es pequeña. 🏠 El tío es alto. La tía es alta. Mi abuelo es simpático. Mi abuela es simpática. English never does this! A tall uncle and a tall aunt are both just tall.",
        visual: {
          type: "compare",
          left: { title: "El words: o", points: ["el perro es pequeño", "el tío es alto", "el gato es rápido"] },
          right: { title: "La words: a", points: ["la casa es pequeña", "la tía es alta", "la gata es rápida"] },
        },
        probe: {
          type: "cloze",
          text: "El tío es {0} (tall). 🧍 La tía es {1} (tall). 🧍 Mi abuela es {2} (nice). 😊",
          blanks: [{ answers: ["alto"] }, { answers: ["alta"] }, { answers: ["simpática", "simpatica"] }],
          bank: ["alto", "alta", "simpática", "simpático", "bajo"],
          hint: "El words take o. La words take a. Abuela is a la word.",
          mistakes: [
            { match: "simpático", coach: "Abuela is a la word, so the ending is a: simpática." },
            { match: "bajo", coach: "Bajo means short. The tío is tall: alto." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which one matches? La casa es...",
          choices: ["pequeño", "pequeña", "pequeños"],
          answer: 1,
          why: "Casa is a la word, so the describing word ends in a: pequeña.",
          hints: [
            "The o ending is for el words. Casa goes with la.",
            "",
            "The s ending is for more than one. There is just one casa.",
          ],
        },
        approaches: {
          analogy:
            "It's like matching socks. 🧦 An el word wears an o sock, and a la word wears an a sock. They have to match!",
          example:
            "You want to say the cat is fast. Is it el gato? Yes, el. So use the o ending: El gato es rápido. For la jirafa, use a: La jirafa es rápida.",
          simpler: {
            q: "El perro is an el word. Which ending does its describing word get?",
            choices: ["o", "a"],
            answer: 0,
            why: "El words take the o ending: el perro es pequeño.",
            hints: ["", "The a ending is for la words. Perro goes with el."],
          },
        },
      },
      {
        title: "E Words and Where They Go",
        teach:
          "Some describing words end in e. Those are easy! They stay the same for el words and la words. El elefante es grande. La casa es grande. El oso (OH-soh) es fuerte. 🐻 La hormiga (or-MEE-gah) es fuerte too! 🐜 Inteligente (een-teh-lee-HEN-teh), smart, works the same way. One more thing. Remember colors? The describing word comes after the thing. A big dog is un perro grande. A fast cat is un gato rápido. 🐱 Thing first, then the describing word!",
        visual: {
          type: "sort",
          prompt: "Does this describing word change, or stay the same?",
          buckets: ["Changes o / a 🔄", "Stays the same e ✅"],
          items: [
            { text: "alto / alta", bucket: 0 },
            { text: "pequeño / pequeña", bucket: 0 },
            { text: "simpático / simpática", bucket: 0 },
            { text: "grande", bucket: 1 },
            { text: "fuerte", bucket: 1 },
            { text: "inteligente", bucket: 1 },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: a big dog. 🐶",
          tiles: ["un", "perro", "grande"],
          distractors: ["pequeño", "gato"],
          hint: "Thing first: un perro. Then the describing word for big: grande.",
          mistakes: [
            { match: "pequeño", coach: "Pequeño means small. Big is grande." },
            { match: "gato", coach: "Gato is cat. We want a dog: perro." },
          ],
          seconds: 25,
        },
        think: {
          q: "Which is right? La hormiga es...",
          choices: ["fuerta", "fuerto", "fuerte"],
          answer: 2,
          why: "Fuerte ends in e, so it stays the same for el and la words.",
          hints: [
            "Good thinking about la, but e words never change. It stays fuerte.",
            "E words never change, and hormiga is a la word anyway. It stays fuerte.",
            "",
          ],
        },
        approaches: {
          analogy:
            "E words are like a one-size-fits-all hat. 🧢 Anyone can wear it, el words and la words, without changing a thing.",
          example:
            "The bear is strong: el oso es fuerte. The ant is strong too: la hormiga es fuerte. Same word, fuerte, for both!",
          simpler: {
            q: "Does grande change to granda for la words?",
            choices: ["No, it stays grande.", "Yes, it becomes granda."],
            answer: 0,
            why: "Grande ends in e, so it stays the same: la casa es grande.",
            hints: ["", "Only o words switch to a. Grande ends in e, so it stays grande."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which describing word fits? Sort each sentence by its ending.",
      buckets: ["Ends in o (el words)", "Ends in a (la words)", "Ends in e (both)"],
      items: [
        { text: "El perro es pequeño. 🐶", bucket: 0 },
        { text: "El abuelo es simpático. 👴", bucket: 0 },
        { text: "La jirafa es alta. 🦒", bucket: 1 },
        { text: "La tortuga es lenta. 🐢", bucket: 1 },
        { text: "El elefante es grande. 🐘", bucket: 2 },
        { text: "La hormiga es fuerte. 🐜", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Describe someone in your family or a pet to Señora Luz in Spanish. Then explain the trick about o and a endings.",
      keyPoints: [
        "Uses es with a describing word",
        "El words take describing words ending in o",
        "La words take describing words ending in a",
        "Words ending in e, like grande, stay the same",
        "The describing word comes after the thing",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "El gato es {0} (fast). 🐱 La gata es {1} (fast). 🐱 La casa es {2} (big). 🏠",
        blanks: [{ answers: ["rápido", "rapido"] }, { answers: ["rápida", "rapida"] }, { answers: ["grande"] }],
        bank: ["rápido", "rápida", "grande", "granda"],
        hint: "El words take o and la words take a. Grande ends in e, so it never changes.",
        mistakes: [{ match: "granda", coach: "Grande ends in e, so it stays grande even with la words." }],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match the Spanish to the English.",
        pairs: [
          { left: "Mi tía es simpática.", right: "My aunt is nice." },
          { left: "El oso es fuerte.", right: "The bear is strong." },
          { left: "La jirafa es alta.", right: "The giraffe is tall." },
          { left: "un ratón pequeño", right: "a small mouse" },
        ],
        hint: "Simpática is nice, fuerte is strong, alta is tall and pequeño is small.",
        mistakes: [{ match: "Mixed up alta and fuerte", coach: "Alta is tall, like a giraffe. Fuerte is strong, like a bear." }],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap the two sentences where the describing word matches.",
        sentences: ["La casa es pequeña. 🏠", "El perro es alta. 🐶", "El abuelo es simpático. 👴", "La tortuga es lento. 🐢"],
        correct: [0, 2],
        hint: "El words need the o ending. La words need the a ending.",
        mistakes: [{ match: "Picked El perro es alta", coach: "Perro is an el word, so it needs alto." }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: My grandmother is nice. 👵",
        tiles: ["Mi", "abuela", "es", "simpática"],
        distractors: ["simpático", "abuelo"],
        hint: "Abuela is a la word, so the describing word ends in a: simpática.",
        mistakes: [{ match: "simpático", coach: "Abuela is a la word. Use the a ending: simpática." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does ¿Cómo es? mean?",
        choices: ["Where is it?", "What time is it?", "What is it like?"],
        answer: 2,
        why: "¿Cómo es? asks what someone or something is like.",
      },
      {
        q: "Which one is right?",
        choices: ["La tía es alta.", "La tía es alto.", "La tía es altos."],
        answer: 0,
        why: "Tía is a la word, so the describing word ends in a: alta.",
      },
      {
        q: "What does pequeño mean?",
        choices: ["big", "small", "strong"],
        answer: 1,
        why: "Pequeño means small. Grande means big.",
      },
      {
        q: "How do you say a fast cat?",
        choices: ["un rápido gato", "un gato lento", "un gato rápido"],
        answer: 2,
        why: "The thing comes first, then the describing word: un gato rápido.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make a Who Is It? card game with a parent. Draw four people, pets or animals. Under each one, write two Spanish sentences, like La jirafa es alta. Read your cards out loud and let your parent guess which picture you mean.",
      rubric: [
        "Draws four people, pets or animals",
        "Writes two describing sentences for each one with es",
        "Uses the o ending for el words and the a ending for la words",
        "Reads the sentences out loud",
      ],
    },
  },

  // 5. My school day
  {
    id: "span-3.school",
    title: "Mi día en la escuela: My School Day",
    minutes: 30,
    stage: "rhetoric",
    standards: ["SPAN.3.3", "SPAN.3.5", "SPAN.3.7", "SPAN.3.11", "SPAN.3.12"],
    read: [
      "Las materias (mah-TEH-ree-ahs) are school subjects. 📚 Whether you learn in a big school or at your kitchen table, you have subjects every day!",
      "Las matemáticas (mah-teh-MAH-tee-kahs) is math. ➕ Las ciencias (SYEN-syahs) is science. 🔬 La historia (ees-TOH-ree-ah) is history. 🏛️ La lectura (lek-TOO-rah) is reading. 📖 El inglés (een-GLES) is English. El español (es-pah-NYOHL) is Spanish. 🌎 El arte (AR-teh) is art. 🎨 La música (MOO-see-kah) is music. 🎵 La educación física (eh-doo-kah-SYOHN FEE-see-kah) is P.E. 🤸 And everyone's favorite break: el recreo (reh-KREH-oh) is recess. El almuerzo (ahl-MWER-soh) is lunch. 🥪",
      "To say you have a class, use tengo, which means I have. Tengo matemáticas means I have math. Add the time with a las: Tengo matemáticas a las nueve. Add the day too: El lunes tengo arte. On Monday I have art.",
      "To say your favorite class, say mi clase favorita es (mee KLAH-seh fah-voh-REE-tah es). Mi clase favorita es ciencias. Then tell why with porque (POR-keh), which means because. Mi clase favorita es ciencias porque me gusta hacer experimentos. My favorite class is science because I like to do experiments. 🧪",
      "School looks a little different around the Spanish-speaking world. In many countries, students wear school uniforms, el uniforme (oo-nee-FOR-meh). In Argentina and Chile, the school year starts in March! South of the equator, the seasons are flipped, so March is the end of summer there. Their long summer break is in December, January and February. 🏖️",
      "Tonight, tell your family about your school day in Spanish!",
    ].join("\n\n"),
    keyIdeas: [
      "Las matemáticas, las ciencias, la historia, la lectura, el arte, la música and la educación física are school subjects.",
      "Tengo matemáticas a las nueve tells what class you have and when.",
      "Mi clase favorita es ... porque ... tells your favorite class and why.",
      "In Argentina and Chile, the school year starts in March because the seasons are flipped.",
    ],
    hook: {
      text: "The Sky Island school has floating classrooms! 🏫🎈 Each balloon is a different class. Marisol shows Pip her schedule, but it is all in Spanish. Can you help Pip read it and plan the day? 📋",
    },
    teach: [
      {
        title: "Las materias: School Subjects",
        teach:
          "Las materias (mah-TEH-ree-ahs) are school subjects. Whether you learn in a big school or at your kitchen table, you have them every day! Las matemáticas (mah-teh-MAH-tee-kahs) is math. ➕ Las ciencias (SYEN-syahs) is science. 🔬 La historia (ees-TOH-ree-ah) is history. 🏛️ La lectura (lek-TOO-rah) is reading. 📖 El arte (AR-teh) is art. 🎨 La música (MOO-see-kah) is music. 🎵 La educación física (eh-doo-kah-SYOHN FEE-see-kah) is P.E. 🤸 And el recreo (reh-KREH-oh) is recess!",
        visual: {
          type: "flip",
          cards: [
            { front: "las matemáticas ➕", back: "math. Say: mah-teh-MAH-tee-kahs." },
            { front: "las ciencias 🔬", back: "science. Say: SYEN-syahs." },
            { front: "la historia 🏛️", back: "history. Say: ees-TOH-ree-ah. The h is silent!" },
            { front: "la lectura 📖", back: "reading. Say: lek-TOO-rah." },
            { front: "la música 🎵", back: "music. Say: MOO-see-kah." },
            { front: "la educación física 🤸", back: "P.E. Say: eh-doo-kah-SYOHN FEE-see-kah." },
            { front: "el recreo 🛝", back: "recess. Say: reh-KREH-oh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each subject to its picture.",
          pairs: [
            { left: "las matemáticas", right: "➕" },
            { left: "las ciencias", right: "🔬" },
            { left: "la historia", right: "🏛️" },
            { left: "el arte", right: "🎨" },
            { left: "la música", right: "🎵" },
            { left: "la educación física", right: "🤸" },
          ],
          hint: "Matemáticas is math, ciencias is science, historia is history, arte is art, música is music and educación física is P.E.",
          mistakes: [{ match: "Mixed up historia and ciencias", coach: "Historia is about the past, like old buildings. Ciencias is science, with a microscope." }],
          seconds: 45,
        },
        think: {
          q: "What subject is las ciencias?",
          choices: ["math", "science", "history"],
          answer: 1,
          why: "Las ciencias is science. 🔬",
          hints: ["Math is las matemáticas.", "", "History is la historia."],
        },
        approaches: {
          analogy:
            "Many subject names are word cousins. Música looks like music, historia looks like history and arte looks like art. Listen for the English cousin inside!",
          example:
            "At 9 you add fractions. That is las matemáticas. At 10 you look at a leaf under a magnifying glass. That is las ciencias.",
          simpler: {
            q: "What subject is la música?",
            choices: ["art", "P.E.", "music"],
            answer: 2,
            why: "La música is music. 🎵",
            hints: ["Art is el arte.", "P.E. is la educación física.", ""],
          },
        },
      },
      {
        title: "Tengo ... a las ...: My Schedule",
        teach:
          "To say you have a class, use tengo (TEN-goh). It means I have. Tengo matemáticas. I have math. Now add the time, just like you learned. Tengo matemáticas a las nueve. I have math at nine. 🕘 Tengo ciencias a las diez y media. I have science at ten thirty. You can add the day too. El lunes tengo arte. On Monday I have art. 🎨 El viernes tengo música. On Friday I have music. 🎵 Now you can read any schedule!",
        visual: {
          type: "hotspots",
          title: "Marisol's Monday: tap each class",
          center: "El lunes 📋",
          spots: [
            { label: "a las ocho", icon: "📖", detail: "Tengo lectura a las ocho. I have reading at eight." },
            { label: "a las nueve", icon: "➕", detail: "Tengo matemáticas a las nueve. I have math at nine." },
            { label: "a las diez y media", icon: "🛝", detail: "Tengo recreo a las diez y media. I have recess at ten thirty." },
            { label: "a las once", icon: "🔬", detail: "Tengo ciencias a las once. I have science at eleven." },
            { label: "a las doce", icon: "🥪", detail: "Tengo almuerzo a las doce. I have lunch at twelve." },
            { label: "a la una", icon: "🎨", detail: "Tengo arte a la una. I have art at one." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: I have science at ten. 🔬",
          tiles: ["Tengo", "ciencias", "a las", "diez"],
          distractors: ["matemáticas", "a la", "dos"],
          hint: "Start with Tengo (I have), then the subject, then a las and the number for ten.",
          mistakes: [
            { match: "matemáticas", coach: "Matemáticas is math. Science is ciencias." },
            { match: "a la", coach: "A la is only for one o'clock. Ten uses a las." },
            { match: "dos", coach: "Dos is two. Ten is diez." },
          ],
          seconds: 35,
        },
        think: {
          q: "Tengo música a las dos. When is music?",
          choices: ["at two", "at twelve", "at ten"],
          answer: 0,
          why: "A las dos means at two o'clock.",
          hints: ["", "Twelve is doce. Dos is two.", "Ten is diez. Dos is two."],
        },
        approaches: {
          analogy:
            "A schedule sentence is like a train ticket: tengo tells what you have, the subject is where you're going, and a las tells when it leaves.",
          example:
            "Marisol's paper says historia, 1:00. She reads it aloud: Tengo historia a la una. One o'clock uses a la, so it's a la una.",
          simpler: {
            q: "What does tengo mean?",
            choices: ["I go", "I have", "I like"],
            answer: 1,
            why: "Tengo means I have, like tengo arte, I have art.",
            hints: ["I go is voy.", "", "I like is me gusta."],
          },
        },
      },
      {
        title: "My Favorite Class and School Around the World",
        teach:
          "To tell your favorite class, say mi clase favorita es (mee KLAH-seh fah-voh-REE-tah es). Then say why with porque (POR-keh). It means because. Mi clase favorita es ciencias porque me gusta hacer experimentos. 🧪 School looks a little different around the Spanish-speaking world. In many countries, students wear a school uniform, el uniforme (oo-nee-FOR-meh). In Argentina and Chile, the school year starts in March! South of the equator the seasons are flipped. So their long summer break is in December, January and February. 🏖️",
        visual: {
          type: "compare",
          left: { title: "In the United States 🇺🇸", points: ["The school year usually starts in August or September", "Summer break is June, July and August", "Some schools have uniforms"] },
          right: { title: "In Argentina and Chile 🌎", points: ["The school year starts in March", "Summer break is December, January and February", "Many students wear uniforms"] },
        },
        probe: {
          type: "cloze",
          text: "Mi clase {0} es arte {1} me gusta dibujar. 🎨 In Chile, the school year starts in {2}. 📅",
          blanks: [{ answers: ["favorita"] }, { answers: ["porque"] }, { answers: ["March", "marzo"] }],
          bank: ["favorita", "porque", "March", "September", "tengo"],
          hint: "Mi clase favorita es ... porque ... tells your favorite class and why. Chile is south of the equator, where the year starts in March.",
          mistakes: [
            { match: "September", coach: "Many U.S. schools start then. In Chile, south of the equator, school starts in March." },
            { match: "tengo", coach: "Tengo means I have. To say because, use porque." },
          ],
          seconds: 40,
        },
        think: {
          q: "Why does the school year in Argentina start in March?",
          choices: [
            "Because March is the end of summer there",
            "Because it snows in March there",
            "Because there is no school in winter there",
          ],
          answer: 0,
          why: "South of the equator, the seasons are flipped, so summer break is December to February and school starts in March.",
          hints: [
            "",
            "March is the end of summer in Argentina, not a snowy time.",
            "They do have school in winter. Their winter is in June and July.",
          ],
        },
        approaches: {
          analogy:
            "The Earth is like a seesaw for seasons. When it's summer on the top half, it's winter on the bottom half, so the school calendars flip too.",
          example:
            "In January, kids in Ohio are in school wearing coats. At the same time, kids in Argentina are on summer break at the beach!",
          simpler: {
            q: "What does porque mean?",
            choices: ["because", "favorite"],
            answer: 0,
            why: "Porque means because. It tells why.",
            hints: ["", "Favorite is favorita. Porque tells why."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put Marisol's school day in order, from earliest to latest.",
      steps: [
        "Tengo lectura a las ocho. 📖",
        "Tengo matemáticas a las nueve. ➕",
        "Tengo recreo a las diez y media. 🛝",
        "Tengo almuerzo a las doce. 🥪",
        "Tengo arte a la una. 🎨",
        "Tengo educación física a las dos y media. 🤸",
      ],
    },
    explain: {
      prompt: "Tell Señora Luz about your school day in Spanish. Name your subjects, say when you have one of them, and tell her your favorite class and why.",
      keyPoints: [
        "Names at least three subjects in Spanish",
        "Uses tengo with a subject",
        "Says a time with a las",
        "Uses mi clase favorita es",
        "Uses porque to tell why",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each subject to the English.",
        pairs: [
          { left: "la lectura", right: "reading" },
          { left: "la historia", right: "history" },
          { left: "las matemáticas", right: "math" },
          { left: "el recreo", right: "recess" },
          { left: "el almuerzo", right: "lunch" },
        ],
        hint: "Lectura is reading, historia is history, matemáticas is math, recreo is recess and almuerzo is lunch.",
        mistakes: [{ match: "Mixed up recreo and almuerzo", coach: "El recreo is play time outside. El almuerzo is lunch." }],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Marisol says, Tengo arte a las dos y media. 🎨 Type the hour when art starts (just the hour, like 4).",
        answer: 2,
        hint: "Dos is two. Y media adds half an hour, but the hour is still dos.",
        mistakes: [{ match: "12", coach: "Twelve is doce. Dos is two." }],
        seconds: 20,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: My favorite class is music. 🎵",
        tiles: ["Mi", "clase", "favorita", "es", "música"],
        distractors: ["porque", "tengo"],
        hint: "Mi clase favorita es, then the subject: música.",
        mistakes: [{ match: "tengo", coach: "Tengo means I have. Your favorite class uses mi clase favorita es." }],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Is it a class or a break?",
        buckets: ["A class 📚", "A break 🛝"],
        items: [
          { text: "las ciencias", bucket: 0 },
          { text: "las matemáticas", bucket: 0 },
          { text: "la historia", bucket: 0 },
          { text: "la música", bucket: 0 },
          { text: "el recreo", bucket: 1 },
          { text: "el almuerzo", bucket: 1 },
        ],
        hint: "Recreo is recess and almuerzo is lunch. The rest are subjects.",
        mistakes: [{ match: "Put el almuerzo with classes", coach: "El almuerzo is lunch, a break to eat." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What subject is la educación física?",
        choices: ["music", "P.E.", "science"],
        answer: 1,
        why: "La educación física is P.E., physical education.",
      },
      {
        q: "What does tengo arte a la una mean?",
        choices: ["I have art at one.", "I like art.", "I have art at eleven."],
        answer: 0,
        why: "Tengo is I have, and a la una is at one o'clock.",
      },
      {
        q: "What does porque mean?",
        choices: ["favorite", "class", "because"],
        answer: 2,
        why: "Porque means because. It tells why.",
      },
      {
        q: "In Argentina and Chile, when does the school year start?",
        choices: ["September", "March", "June"],
        answer: 1,
        why: "South of the equator the seasons are flipped, so the school year starts in March.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make your own school schedule in Spanish with a parent. List at least four subjects with their times, like Tengo matemáticas a las nueve. Put a star by your favorite. Then read it aloud and say mi clase favorita es ... porque ...",
      rubric: [
        "Lists at least four subjects in Spanish",
        "Gives each subject a time with a las or a la",
        "Says mi clase favorita es with a subject",
        "Tells why using porque",
      ],
    },
  },

  // 6. Central and South America
  {
    id: "span-3.americas",
    title: "Centroamérica y Sudamérica",
    minutes: 35,
    stage: "grammar",
    standards: ["SPAN.3.8", "SPAN.3.9", "SPAN.3.11", "SPAN.3.12"],
    read: [
      "Last year you visited Mexico and Spain. Now let's travel south! 🌎",
      "Centroamérica (sen-troh-ah-MEH-ree-kah) is Central America. It is a narrow strip of land, like a bridge, between Mexico and South America. People speak Spanish in Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica and Panamá. In Panamá, ships cross from the Atlantic Ocean to the Pacific Ocean through the Panama Canal, which opened in 1914. 🚢",
      "Sudamérica (sood-ah-MEH-ree-kah) is South America, a whole continent. People speak Spanish in most of its countries, like Colombia, Peru, Chile and Argentina. But in Brazil, the biggest country, people speak Portuguese!",
      "Los Andes (AHN-des) are the Andes Mountains. They run down the whole west side of South America, about 4,300 miles. They are the longest mountain range on land in the world. ⛰️ La montaña (mohn-TAH-nyah) means mountain. Llamas and alpacas live high in the Andes. 🦙 People there first grew potatoes thousands of years ago. Long ago, the Inca built the city of Machu Picchu high on a mountain in Peru.",
      "El Amazonas (ah-mah-SOH-nahs) is the Amazon. La selva (SEL-vah) means rainforest or jungle, and the Amazon is the largest rainforest in the world. 🌳 El río (REE-oh) means river. The Amazon River carries more water than any other river on Earth. Jaguars, sloths, toucans and monkeys live there. In Spanish they are el jaguar, el perezoso, el tucán and el mono. 🐒",
      "Now for food and fun! Arepas are warm corn cakes from Venezuela and Colombia. Empanadas are little pies filled with meat or cheese, loved in Argentina and many other countries. Pupusas are thick corn tortillas stuffed with cheese or beans, from El Salvador. 🫓",
      "Festivals are full of music and color. In Peru, Inti Raymi (IN-tee RAI-mee), the Festival of the Sun, is held every June 24 in Cusco. ☀️ In Medellín, Colombia, the Feria de las Flores is a flower festival each August, where people carry huge flower displays on their backs in a parade. 💐",
    ].join("\n\n"),
    keyIdeas: [
      "Central America is a land bridge between Mexico and South America. The Panama Canal joins two oceans.",
      "Los Andes are the longest mountain range on land. Llamas live there and potatoes were first grown there.",
      "El Amazonas is the largest rainforest, and the Amazon River carries the most water of any river.",
      "Arepas, empanadas and pupusas are foods; Inti Raymi and the Feria de las Flores are festivals.",
    ],
    hook: {
      text: "Pip's balloon catches a long, warm wind. 🎈 It floats south, over mountains and a giant green forest! Pip looks down and asks, ¿Dónde estoy? Where am I? Let's explore Central and South America together. 🌎",
    },
    teach: [
      {
        title: "A Land Bridge and a Continent",
        teach:
          "Centroamérica (sen-troh-ah-MEH-ree-kah) is Central America. It is a narrow strip of land, like a bridge, between Mexico and South America. People speak Spanish in Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica and Panamá. In Panamá, ships cross from the Atlantic Ocean to the Pacific Ocean through the Panama Canal. 🚢 Sudamérica (sood-ah-MEH-ree-kah) is South America, a whole continent. Most of its countries speak Spanish, like Colombia, Peru, Chile and Argentina. But in Brazil, the biggest country, people speak Portuguese!",
        visual: {
          type: "hotspots",
          title: "Tap a place to learn about it",
          center: "Las Américas 🌎",
          spots: [
            { label: "Centroamérica", icon: "🌉", detail: "A narrow land bridge between Mexico and South America." },
            { label: "Panamá", icon: "🚢", detail: "Ships cross between the Atlantic and Pacific Oceans through the Panama Canal." },
            { label: "Colombia", icon: "☕", detail: "A Spanish-speaking country in the north of South America, famous for coffee and flowers." },
            { label: "Perú", icon: "⛰️", detail: "A Spanish-speaking country in the Andes Mountains, home of Machu Picchu." },
            { label: "Argentina", icon: "🐎", detail: "A big Spanish-speaking country in the south, with wide grasslands and cowboys called gauchos." },
            { label: "Brasil", icon: "🇧🇷", detail: "The biggest country in South America. People there speak Portuguese, not Spanish." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is the country in Central America or South America?",
          buckets: ["Centroamérica 🌉", "Sudamérica 🌎"],
          items: [
            { text: "Guatemala", bucket: 0 },
            { text: "Costa Rica", bucket: 0 },
            { text: "Panamá", bucket: 0 },
            { text: "Colombia", bucket: 1 },
            { text: "Perú", bucket: 1 },
            { text: "Argentina", bucket: 1 },
          ],
          hint: "Guatemala, Costa Rica and Panamá are on the land bridge. Colombia, Perú and Argentina are on the big continent.",
          mistakes: [{ match: "Put Panamá in South America", coach: "Panamá is the last country of Central America, right next to Colombia." }],
          seconds: 40,
        },
        think: {
          q: "What language do most people in Brazil speak?",
          choices: ["Spanish", "Portuguese", "English"],
          answer: 1,
          why: "Brazil is the biggest country in South America, and people there speak Portuguese.",
          hints: [
            "Most South American countries speak Spanish, but Brazil is the big exception.",
            "",
            "English is spoken in the United States. Brazil has its own language from Portugal.",
          ],
        },
        approaches: {
          analogy:
            "Picture two big rooms, North America and South America, joined by a narrow hallway. That hallway is Central America.",
          example:
            "A ship in the Atlantic Ocean wants to reach the Pacific. Instead of sailing all the way around South America, it takes a shortcut through the Panama Canal.",
          simpler: {
            q: "Is South America a country or a continent?",
            choices: ["a country", "a continent"],
            answer: 1,
            why: "South America is a continent with many countries, like Peru and Chile.",
            hints: ["It holds many countries, like Colombia and Chile, so it's bigger than a country.", ""],
          },
        },
      },
      {
        title: "Los Andes: The Long Mountains",
        teach:
          "Los Andes (AHN-des) are the Andes Mountains. They run down the whole west side of South America, about 4,300 miles. They are the longest mountain range on land in the world! ⛰️ La montaña (mohn-TAH-nyah) means mountain. Llamas and alpacas live high in the Andes. 🦙 Their wool keeps people warm. People in the Andes were the first to grow potatoes, thousands of years ago. 🥔 Long ago, the Inca built a stone city called Machu Picchu high on a mountain in Peru.",
        visual: {
          type: "flip",
          cards: [
            { front: "la montaña ⛰️", back: "mountain. Say: mohn-TAH-nyah." },
            { front: "los Andes", back: "The longest mountain range on land, about 4,300 miles long." },
            { front: "la llama 🦙", back: "An animal of the Andes. People use its wool and it carries loads." },
            { front: "la papa 🥔", back: "Potato! First grown in the Andes thousands of years ago." },
            { front: "Machu Picchu 🏛️", back: "A stone city the Inca built high on a mountain in Peru." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Los Andes are the longest {0} range on land. ⛰️ Llamas and {1} live there. 🦙 People there were the first to grow {2}. 🥔",
          blanks: [{ answers: ["mountain"] }, { answers: ["alpacas"] }, { answers: ["potatoes"] }],
          bank: ["mountain", "alpacas", "potatoes", "river", "jaguars"],
          hint: "The Andes are mountains. Llamas live with alpacas. The first potatoes came from there.",
          mistakes: [
            { match: "river", coach: "The Amazon is the river. The Andes are mountains." },
            { match: "jaguars", coach: "Jaguars live in the warm rainforest. High in the Andes live llamas and alpacas." },
          ],
          seconds: 35,
        },
        think: {
          q: "Who built Machu Picchu?",
          choices: ["the Inca", "the people of Spain", "the people of Mexico"],
          answer: 0,
          why: "The Inca built Machu Picchu high in the Andes of Peru.",
          hints: [
            "",
            "Spain is far away across the ocean. Machu Picchu was built by the Inca of the Andes.",
            "Mexico is far to the north. Machu Picchu was built by the Inca in Peru.",
          ],
        },
        approaches: {
          analogy:
            "The Andes are like a giant stone spine running down the back of South America, from the top all the way to the bottom.",
          example:
            "A farmer high in the Andes keeps llamas for wool and grows potatoes in his field. People there have farmed this way for thousands of years.",
          simpler: {
            q: "What does la montaña mean?",
            choices: ["river", "mountain", "forest"],
            answer: 1,
            why: "La montaña means mountain. ⛰️",
            hints: ["River is el río.", "", "Forest is el bosque, and rainforest is la selva."],
          },
        },
      },
      {
        title: "El Amazonas: The Great Rainforest",
        teach:
          "El Amazonas (ah-mah-SOH-nahs) is the Amazon. La selva (SEL-vah) means rainforest or jungle. The Amazon is the largest rainforest in the world! 🌳 El río (REE-oh) means river. The Amazon River carries more water than any other river on Earth. Many animals live there. El jaguar (hah-GWAR) is a jaguar. 🐆 El perezoso (peh-reh-SOH-soh) is a sloth. 🦥 Perezoso also means lazy, because sloths move so slowly! El tucán (too-KAHN) is a toucan. El mono (MOH-noh) is a monkey. 🐒",
        visual: {
          type: "flip",
          cards: [
            { front: "la selva 🌳", back: "rainforest or jungle. Say: SEL-vah." },
            { front: "el río 🏞️", back: "river. Say: REE-oh." },
            { front: "el jaguar 🐆", back: "jaguar. Say: hah-GWAR." },
            { front: "el perezoso 🦥", back: "sloth. Say: peh-reh-SOH-soh." },
            { front: "el tucán", back: "toucan, a bird with a giant colorful beak. Say: too-KAHN." },
            { front: "el mono 🐒", back: "monkey. Say: MOH-noh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish word to its picture.",
          pairs: [
            { left: "la selva", right: "🌳" },
            { left: "el río", right: "🏞️" },
            { left: "el jaguar", right: "🐆" },
            { left: "el perezoso", right: "🦥" },
            { left: "el mono", right: "🐒" },
          ],
          hint: "Selva is rainforest, río is river, jaguar is jaguar, perezoso is sloth and mono is monkey.",
          mistakes: [{ match: "Mixed up mono and perezoso", coach: "Both hang in trees! El perezoso is the slow sloth. El mono is the jumpy monkey." }],
          seconds: 40,
        },
        think: {
          q: "What is special about the Amazon River?",
          choices: [
            "It is frozen all year.",
            "It is the smallest river in South America.",
            "It carries more water than any other river.",
          ],
          answer: 2,
          why: "The Amazon River carries more water than any other river on Earth.",
          hints: [
            "The Amazon is in a hot, rainy rainforest, so it isn't frozen.",
            "It is the opposite! The Amazon is huge.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Think of the Amazon River as the rainforest's giant water hose, carrying rain from thousands of streams all the way to the ocean.",
          example:
            "High in the trees a sloth hangs still, a toucan calls, and a monkey swings by. Down by el río, a jaguar sips water. That's la selva!",
          simpler: {
            q: "What does la selva mean?",
            choices: ["rainforest", "desert", "mountain"],
            answer: 0,
            why: "La selva means rainforest or jungle. 🌳",
            hints: ["", "A desert is dry. La selva is wet and full of trees.", "Mountain is la montaña."],
          },
        },
      },
      {
        title: "Foods and Festivals",
        teach:
          "Now for food and fun! Arepas (ah-REH-pahs) are warm corn cakes from Venezuela and Colombia. Empanadas (em-pah-NAH-dahs) are little pies filled with meat or cheese, loved in Argentina and many other countries. 🥟 Pupusas (poo-POO-sahs) are thick corn tortillas stuffed with cheese or beans, from El Salvador. 🫓 Festivals are full of music and color. In Peru, Inti Raymi (IN-tee RAI-mee), the Festival of the Sun, is held every June 24 in Cusco. ☀️ In Medellín, Colombia, the Feria de las Flores is a flower festival each August. 💐",
        visual: {
          type: "hotspots",
          title: "Tap a food or festival",
          center: "¡Vamos! 🎉",
          spots: [
            { label: "las arepas", icon: "🫓", detail: "Warm corn cakes from Venezuela and Colombia, often filled with cheese." },
            { label: "las empanadas", icon: "🥟", detail: "Little baked or fried pies filled with meat or cheese, loved in Argentina." },
            { label: "las pupusas", icon: "🧀", detail: "Thick corn tortillas stuffed with cheese or beans, from El Salvador." },
            { label: "Inti Raymi", icon: "☀️", detail: "The Festival of the Sun in Cusco, Peru, every June 24, with music, dancing and costumes from the Inca past." },
            { label: "Feria de las Flores", icon: "💐", detail: "A flower festival in Medellín, Colombia, each August. People carry huge flower displays on their backs in a parade." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each food or festival to where it comes from.",
          pairs: [
            { left: "pupusas 🫓", right: "El Salvador" },
            { left: "Inti Raymi ☀️", right: "Cusco, Peru" },
            { left: "Feria de las Flores 💐", right: "Medellín, Colombia" },
            { left: "empanadas 🥟", right: "Argentina and many other countries" },
          ],
          hint: "Pupusas are from El Salvador, Inti Raymi is in Peru, the flower festival is in Medellín and empanadas are loved in Argentina.",
          mistakes: [{ match: "Mixed up Inti Raymi and Feria de las Flores", coach: "Inti means sun: the Festival of the Sun is in Peru. The flower festival is in Colombia." }],
          seconds: 40,
        },
        think: {
          q: "What is Inti Raymi?",
          choices: ["A corn cake from Colombia", "The Festival of the Sun in Peru", "A river in Brazil"],
          answer: 1,
          why: "Inti Raymi is the Festival of the Sun, held every June 24 in Cusco, Peru.",
          hints: [
            "Corn cakes from Colombia are arepas.",
            "",
            "The big river is the Amazon. Inti Raymi is a festival.",
          ],
        },
        approaches: {
          analogy:
            "Each country has its own favorite foods, just like each family has its own favorite recipe. Arepas, empanadas and pupusas are all cozy, warm comfort foods.",
          example:
            "In Medellín in August, a farmer carries a huge round display of flowers on his back down the street while crowds cheer. That's the Feria de las Flores!",
          simpler: {
            q: "What are empanadas?",
            choices: ["little filled pies", "a kind of drink", "a flower festival"],
            answer: 0,
            why: "Empanadas are little pies filled with meat or cheese.",
            hints: ["", "Empanadas are something you bite into, not drink.", "The flower festival is the Feria de las Flores."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each thing: is it from the Andes Mountains or the Amazon rainforest?",
      buckets: ["Los Andes ⛰️", "El Amazonas 🌳"],
      items: [
        { text: "llamas and alpacas 🦙", bucket: 0 },
        { text: "Machu Picchu 🏛️", bucket: 0 },
        { text: "the first potatoes 🥔", bucket: 0 },
        { text: "cold, high mountains ❄️", bucket: 0 },
        { text: "el perezoso 🦥", bucket: 1 },
        { text: "el tucán, with its giant beak", bucket: 1 },
        { text: "the river with the most water 🏞️", bucket: 1 },
        { text: "hot, rainy forest 🌧️", bucket: 1 },
      ],
    },
    explain: {
      prompt: "You are a tour guide! Tell Señora Luz about Central and South America: where they are, the Andes, the Amazon and one food or festival you would like to try.",
      keyPoints: [
        "Central America is a land bridge between Mexico and South America",
        "The Andes are long mountains where llamas live",
        "The Amazon is the largest rainforest and has a huge river",
        "Names a food like arepas, empanadas or pupusas",
        "Names a festival like Inti Raymi or the Feria de las Flores",
        "Brazil speaks Portuguese, most others speak Spanish",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Is it a food or a festival?",
        buckets: ["Food 🍽️", "Festival 🎉"],
        items: [
          { text: "arepas", bucket: 0 },
          { text: "empanadas", bucket: 0 },
          { text: "pupusas", bucket: 0 },
          { text: "Inti Raymi", bucket: 1 },
          { text: "Feria de las Flores", bucket: 1 },
        ],
        hint: "Arepas, empanadas and pupusas are things you eat. Inti Raymi and the Feria de las Flores are celebrations.",
        mistakes: [{ match: "Put Inti Raymi with food", coach: "Inti Raymi is the Festival of the Sun in Peru, not a food." }],
        seconds: 35,
      },
      {
        type: "cloze",
        text: "La {0} is the rainforest. 🌳 El {1} is the river. 🏞️ La {2} is the mountain. ⛰️",
        blanks: [{ answers: ["selva"] }, { answers: ["río", "rio"] }, { answers: ["montaña", "montana"] }],
        bank: ["selva", "río", "montaña", "mono", "papa"],
        hint: "Selva is rainforest, río is river and montaña is mountain.",
        mistakes: [
          { match: "mono", coach: "El mono is a monkey. It lives in the rainforest, la selva." },
          { match: "papa", coach: "La papa is a potato. It grows in the mountains, la montaña." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each place to its fact.",
        pairs: [
          { left: "los Andes", right: "the longest mountain range on land" },
          { left: "el Amazonas", right: "the largest rainforest in the world" },
          { left: "el Canal de Panamá", right: "a shortcut for ships between two oceans" },
          { left: "Brasil", right: "a big country where people speak Portuguese" },
        ],
        hint: "Andes: mountains. Amazonas: rainforest. Panamá: canal for ships. Brasil: Portuguese.",
        mistakes: [{ match: "Mixed up Andes and Amazonas", coach: "Los Andes are mountains. El Amazonas is the rainforest and river." }],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap the two true sentences.",
        sentences: [
          "Llamas live high in the Andes. 🦙",
          "The Amazon is a desert with no rain. 🏜️",
          "Inti Raymi is a festival in Peru. ☀️",
          "Everyone in Brazil speaks Spanish. 🇧🇷",
        ],
        correct: [0, 2],
        hint: "Think about what lives in the mountains, how rainy the Amazon is, and what language Brazil speaks.",
        mistakes: [{ match: "Picked Everyone in Brazil speaks Spanish", coach: "Brazil is the big exception: people there speak Portuguese." }],
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Where is Central America?",
        choices: ["Between Mexico and South America", "In the middle of Africa", "Next to Spain"],
        answer: 0,
        why: "Central America is a narrow land bridge between Mexico and South America.",
      },
      {
        q: "What lives high in the Andes Mountains?",
        choices: ["penguins", "camels", "llamas and alpacas"],
        answer: 2,
        why: "Llamas and alpacas live high in the Andes.",
      },
      {
        q: "What are arepas?",
        choices: ["A flower festival", "Warm corn cakes from Venezuela and Colombia", "A mountain in Peru"],
        answer: 1,
        why: "Arepas are warm corn cakes from Venezuela and Colombia.",
      },
      {
        q: "What does la selva mean?",
        choices: ["rainforest", "river", "mountain"],
        answer: 0,
        why: "La selva means rainforest or jungle, like the Amazon.",
      },
      {
        q: "Which festival is held in Medellín, Colombia, each August?",
        choices: ["Inti Raymi", "the Feria de las Flores", "Carnival in Brazil"],
        answer: 1,
        why: "The Feria de las Flores is Medellín's flower festival each August.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make a travel poster for Central and South America with a parent. Draw a map with the Andes, the Amazon and the Panama Canal. Label la montaña, la selva and el río in Spanish. Add one food and one festival. If you can, make arepas or empanadas together and say ¡Qué rico! (keh REE-koh), how tasty!",
      rubric: [
        "Shows the Andes, the Amazon and the Panama Canal on the map",
        "Labels la montaña, la selva and el río in Spanish",
        "Includes one food and one festival",
        "Explains the poster out loud to a parent",
      ],
    },
  },
]);
