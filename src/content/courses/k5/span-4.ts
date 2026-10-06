import { k5Course } from "./base";

/**
 * span-4: Grade 4 Spanish (an elective), ACTFL Novice High. Kids already know
 * greetings, numbers to 100, colors, family, animals, feelings, the body, food
 * with me gusta, school things, days, weather, introducing themselves, clothes,
 * rooms, months, places in town, sports and hobbies, telling time, describing
 * people and school subjects. Taught by Señora Luz in the Canyon of Echoes.
 */
export const span4 = k5Course("span", 4, [
  // 1. My daily routine
  {
    id: "span-4.routine",
    title: "Mi rutina: My Daily Routine",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.4.1", "SPAN.4.2", "SPAN.4.11", "SPAN.4.13"],
    read: [
      "¡Hola, amigos! Every morning you do the same things in about the same order. That is your routine. In Spanish it is la rutina (lah roo-TEE-nah). Today you will tell your whole morning in Spanish, step by step.",
      "Many routine words start with me. Me despierto (meh des-pee-ER-toh) means I wake up. Me levanto (meh leh-VAHN-toh) means I get up. Me cepillo los dientes (meh seh-PEE-yoh lohs dee-EN-tes) means I brush my teeth. Me visto (meh VEES-toh) means I get dressed. In Spanish you really say I get myself up and I dress myself. That little word me points back to you.",
      "Some routine words don't need me. Desayuno (deh-sah-YOO-noh) means I eat breakfast. Voy a la escuela means I go to school. Ceno (SEH-noh) means I eat dinner. At night, me acuesto (meh ah-KWES-toh) means I go to bed.",
      "To tell the order, use three helper words. Primero (pree-MEH-roh) means first. Luego (loo-EH-goh) means then. Después (des-PWES) means after that. Primero me levanto. Luego me cepillo los dientes. Después desayuno.",
      "You can add a time, too. You already know son las siete. Me levanto a las siete means I get up at seven. To ask a friend, say ¿A qué hora te levantas? (ah keh OH-rah teh leh-VAHN-tahs). That means what time do you get up? Your friend might answer, Me levanto a las seis y media.",
      "Notice one more thing. When you talk to a friend, me changes to te. Me levanto means I get up. Te levantas means you get up.",
    ].join("\n\n"),
    keyIdeas: [
      "Routine words like me levanto and me visto use me, because you do them to yourself.",
      "Primero, luego and después put your routine in order.",
      "¿A qué hora te levantas? asks what time a friend gets up; answer with a las and a time.",
    ],
    hook: {
      text: "Pip zips down into the Canyon of Echoes just as the sun comes up. A sleepy villager yawns and calls out, Me levanto, me visto, desayuno... and the canyon echoes it back! What is she saying? By the end of today, you will be able to tell your own morning in Spanish.",
    },
    teach: [
      {
        title: "Words with Me",
        teach:
          "Let's wake up in Spanish! Me despierto (meh des-pee-ER-toh) means I wake up. Me levanto (meh leh-VAHN-toh) means I get up. Me cepillo los dientes (meh seh-PEE-yoh lohs dee-EN-tes) means I brush my teeth. Me visto (meh VEES-toh) means I get dressed. Did you notice that each one starts with me? In English we just say I get up. In Spanish you say I get myself up, so the word me points back to you. Try acting them out. Stretch and say me despierto. Stand up and say me levanto. Brush your teeth and say me cepillo los dientes.",
        visual: {
          type: "flip",
          cards: [
            { front: "me despierto ⏰", back: "I wake up. Say: meh des-pee-ER-toh." },
            { front: "me levanto 🛏️➡️🧍", back: "I get up. Say: meh leh-VAHN-toh." },
            { front: "me cepillo los dientes 🪥", back: "I brush my teeth. Say: meh seh-PEE-yoh lohs dee-EN-tes." },
            { front: "me visto 👕", back: "I get dressed. Say: meh VEES-toh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each routine word to what it means.",
          pairs: [
            { left: "me despierto", right: "I wake up ⏰" },
            { left: "me levanto", right: "I get up 🧍" },
            { left: "me cepillo los dientes", right: "I brush my teeth 🪥" },
            { left: "me visto", right: "I get dressed 👕" },
          ],
          hint: "Look for clues: dientes means teeth, and visto sounds a little like vestido, a dress.",
          mistakes: [{ match: "Mixed up despierto and levanto", coach: "First your eyes open: me despierto. Then your feet hit the floor: me levanto." }],
          seconds: 40,
        },
        think: {
          q: "What does me visto mean?",
          choices: ["I get dressed", "I wake up", "I eat breakfast"],
          answer: 0,
          why: "Me visto means I get dressed. Visto is related to vestido, a dress.",
          hints: [
            "",
            "I wake up is me despierto. Visto is about clothes, like vestido.",
            "I eat breakfast is desayuno. Visto is about clothes, like vestido.",
          ],
        },
        approaches: {
          analogy:
            "The word me is like a boomerang. You throw the action out, and it comes right back to you: you get yourself up, you dress yourself.",
          example:
            "Sofía's alarm rings. Her eyes open: me despierto. She hops out of bed: me levanto. She puts on her shirt: me visto. She brushes: me cepillo los dientes.",
          simpler: {
            q: "Me cepillo los dientes has the word dientes. What are dientes?",
            choices: ["shoes", "teeth"],
            answer: 1,
            why: "Dientes are teeth, so me cepillo los dientes means I brush my teeth.",
            hints: ["Shoes are zapatos. Dientes are something you brush every morning.", ""],
          },
        },
      },
      {
        title: "Primero, Luego, Después",
        teach:
          "Some routine words don't need me. Desayuno (deh-sah-YOO-noh) means I eat breakfast. Voy a la escuela means I go to school. Ceno (SEH-noh) means I eat dinner. Me acuesto (meh ah-KWES-toh) means I go to bed. Now let's put them in order with three helper words. Primero (pree-MEH-roh) means first. Luego (loo-EH-goh) means then. Después (des-PWES) means after that. Listen to my morning. Primero me levanto. Luego me visto. Después desayuno. These little words work like the numbers in a recipe. They tell the listener what comes next.",
        visual: {
          type: "flip",
          cards: [
            { front: "desayuno 🥣", back: "I eat breakfast. Say: deh-sah-YOO-noh." },
            { front: "ceno 🍽️", back: "I eat dinner. Say: SEH-noh." },
            { front: "me acuesto 🛌", back: "I go to bed. Say: meh ah-KWES-toh." },
            { front: "primero 1️⃣", back: "first. Say: pree-MEH-roh." },
            { front: "luego 2️⃣", back: "then. Say: loo-EH-goh." },
            { front: "después 3️⃣", back: "after that. Say: des-PWES." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put Leo's day in order, from morning to night.",
          steps: ["Primero, me despierto. ⏰", "Me levanto y me visto. 👕", "Desayuno. 🥣", "Voy a la escuela. 🏫", "Ceno con mi familia. 🍽️", "Al final, me acuesto. 🛌"],
          hint: "Start with waking up and end with going to bed. Breakfast comes before school, and dinner comes at night.",
          mistakes: [{ match: "Put ceno first", coach: "Ceno is dinner, at night. Breakfast is desayuno." }],
          seconds: 50,
        },
        think: {
          q: "Which word means then?",
          choices: ["primero", "luego", "ceno"],
          answer: 1,
          why: "Luego means then. Primero means first, and ceno means I eat dinner.",
          hints: [
            "Primero means first. It starts the list, so it can't be then.",
            "",
            "Ceno means I eat dinner. It is a routine word, not an order word.",
          ],
        },
        approaches: {
          analogy:
            "Primero, luego and después are like the steps on a staircase. You go up one step at a time, and each word tells you which step you are on.",
          example:
            "Primero me despierto. Luego me cepillo los dientes. Después desayuno. That means: first I wake up, then I brush my teeth, after that I eat breakfast.",
          simpler: {
            q: "What does primero mean?",
            choices: ["first", "last"],
            answer: 0,
            why: "Primero means first. It sounds like primary, which means first too.",
            hints: ["", "Primero sounds like primary. It means the opposite of last."],
          },
        },
      },
      {
        title: "¿A qué hora?",
        teach:
          "You already know how to tell time: son las siete. Now add a time to your routine with a las. Me levanto a las siete means I get up at seven. Desayuno a las siete y media means I eat breakfast at seven thirty. To ask a friend, say ¿A qué hora te levantas? (ah keh OH-rah teh leh-VAHN-tahs). That means what time do you get up? Did you hear the change? When I talk about me, I say me levanto. When I ask about you, I say te levantas. Me is for me, and te is for you. Your friend answers, Me levanto a las seis y media.",
        visual: {
          type: "compare",
          left: { title: "About me 🙋", points: ["me levanto: I get up", "me acuesto: I go to bed", "Me levanto a las siete."] },
          right: { title: "Asking you 🫵", points: ["te levantas: you get up", "te acuestas: you go to bed", "¿A qué hora te levantas?"] },
        },
        probe: {
          type: "cloze",
          text: "Ana: ¿A qué {0} te levantas? Leo: Me {1} a las siete. {2} desayuno a las siete y media.",
          blanks: [{ answers: ["hora"] }, { answers: ["levanto"] }, { answers: ["Luego", "Después"] }],
          bank: ["hora", "levanto", "Luego", "levantas", "ceno"],
          hint: "The question asks what time: ¿a qué hora? Leo talks about himself, so he says me levanto. Then he tells what comes next.",
          mistakes: [
            { match: "levantas", coach: "Levantas goes with te, for you. Leo is talking about himself, so it's me levanto." },
            { match: "ceno", coach: "Ceno means I eat dinner. Here you need a word for then." },
          ],
          seconds: 40,
        },
        think: {
          q: "How do you ask a friend what time they get up?",
          choices: ["Me levanto a las siete.", "¿Qué hora es?", "¿A qué hora te levantas?"],
          answer: 2,
          why: "¿A qué hora te levantas? means what time do you get up? Te is for you.",
          hints: [
            "Me levanto a las siete tells about you. It is an answer, not a question.",
            "¿Qué hora es? asks what time it is right now, not when someone gets up.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Me and te are like pointing. Me points at yourself, and te points at your friend. The rest of the word changes a little to match: levanto, levantas.",
          example:
            "Mom asks, ¿A qué hora te levantas? You get up at six thirty, so you answer, Me levanto a las seis y media.",
          simpler: {
            q: "In me levanto a las siete, what time is it?",
            choices: ["six o'clock", "seven o'clock"],
            answer: 1,
            why: "Siete is seven, so a las siete means at seven o'clock.",
            hints: ["Six is seis. Siete is the next number after seis.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the routine: does it happen in the morning or at night?",
      buckets: ["Por la mañana ☀️", "Por la noche 🌙"],
      items: [
        { text: "Me despierto.", bucket: 0 },
        { text: "Desayuno.", bucket: 0 },
        { text: "Voy a la escuela.", bucket: 0 },
        { text: "Me levanto.", bucket: 0 },
        { text: "Ceno.", bucket: 1 },
        { text: "Me acuesto.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz how to describe your morning in Spanish. Which words do you use, how do you show the order, and how do you ask a friend about their routine?",
      keyPoints: [
        "Routine words like me levanto and me visto start with me",
        "Desayuno means I eat breakfast",
        "Primero, luego and después tell the order",
        "Add a time with a las, like a las siete",
        "¿A qué hora te levantas? asks a friend",
      ],
    },
    mastery: [
      {
        type: "sequence",
        prompt: "Read the times and put Sofía's morning in order.",
        steps: [
          "A las seis me despierto.",
          "A las seis y cuarto me levanto.",
          "A las seis y media me visto.",
          "A las siete desayuno.",
          "A las siete y media voy a la escuela.",
        ],
        hint: "Seis is 6 and siete is 7. Y cuarto is a quarter past and y media is half past.",
        mistakes: [{ match: "Mixed up cuarto and media", coach: "Y cuarto is 15 minutes past. Y media is 30 minutes past, so it comes later." }],
        seconds: 50,
      },
      {
        type: "build",
        prompt: "Build the sentence: I brush my teeth. 🪥",
        tiles: ["Me", "cepillo", "los", "dientes"],
        distractors: ["levanto", "te"],
        hint: "Start with me, because you brush your own teeth. Then cepillo, then los dientes.",
        mistakes: [
          { match: "levanto", coach: "Levanto means get up. Brushing is cepillo." },
          { match: "te", coach: "Te is for asking about a friend. This sentence is about you, so it starts with me." },
        ],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Leo says, Me acuesto a las nueve. 🛌 At what hour does Leo go to bed? Type the number.",
        answer: 9,
        unit: "o'clock",
        hint: "Nueve is the number between ocho and diez.",
        mistakes: [
          { match: "19", coach: "Nineteen is diecinueve. Nueve all by itself is 9." },
          { match: "8", coach: "Ocho is 8. Nueve comes right after ocho." },
        ],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "{0} me despierto. Luego me {1}. Después {2} y voy a la escuela.",
        blanks: [{ answers: ["Primero"] }, { answers: ["visto", "levanto"] }, { answers: ["desayuno"] }],
        bank: ["Primero", "visto", "desayuno", "acuesto", "ceno"],
        hint: "The first blank tells the order. Then pick a morning word. Before school you eat breakfast.",
        mistakes: [
          { match: "acuesto", coach: "Me acuesto means I go to bed. That happens at night, not in the morning." },
          { match: "ceno", coach: "Ceno is dinner. Before school you eat breakfast: desayuno." },
        ],
        seconds: 35,
      },
    ],
    check: [
      {
        q: "What does me levanto mean?",
        choices: ["I get up", "I go to bed", "I eat dinner"],
        answer: 0,
        why: "Me levanto means I get up. I go to bed is me acuesto.",
      },
      {
        q: "Which word means after that?",
        choices: ["primero", "desayuno", "después"],
        answer: 2,
        why: "Después means after that. Primero means first, and desayuno means I eat breakfast.",
      },
      {
        q: "Your friend asks, ¿A qué hora te levantas? What is a good answer?",
        choices: ["Me llamo Leo.", "Me levanto a las siete.", "Tengo diez años."],
        answer: 1,
        why: "The question asks what time you get up, so you answer with me levanto and a time.",
      },
      {
        q: "Why do words like me visto start with me?",
        choices: ["Because it is a question", "Because it happens at night", "Because you do it to yourself"],
        answer: 2,
        why: "In Spanish you dress yourself and get yourself up, so the word me points back to you.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Tomorrow morning, tell a parent your routine in Spanish as you go. Say at least four steps, use primero, luego and después, and give the time for one step. Then ask your parent ¿A qué hora te levantas?",
      rubric: [
        "Says at least four routine steps in Spanish",
        "Uses primero, luego and después to show the order",
        "Gives a time with a las",
        "Asks ¿A qué hora te levantas? and listens to the answer",
      ],
    },
  },

  // 2. At a restaurant
  {
    id: "span-4.restaurant",
    title: "En el restaurante: At a Restaurant",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.4.3", "SPAN.4.4", "SPAN.4.12"],
    read: [
      "¡Vamos a comer! Let's eat! Today we visit el restaurante (res-tow-RAHN-teh) and order a meal in Spanish.",
      "First, read el menú (meh-NOO). La sopa (SOH-pah) is soup. La ensalada (en-sah-LAH-dah) is salad. El pollo con arroz (POH-yoh kohn ah-RROHS) is chicken with rice. El pescado (pes-KAH-doh) is fish. Las papas fritas (PAH-pahs FREE-tahs) are French fries. Para beber (PAH-rah beh-BER), to drink, there is el agua (AH-gwah), water, and el jugo de naranja (HOO-goh deh nah-RAHN-hah), orange juice. El postre (POHS-treh) is dessert, like el flan or el helado (eh-LAH-doh), ice cream.",
      "El mesero (meh-SEH-roh) or la mesera is the waiter. The waiter asks, ¿Qué desea? (keh deh-SEH-ah). That means what would you like? You answer with quisiera (kee-see-EH-rah), which means I would like. Quisiera la sopa, por favor. I would like the soup, please. Quisiera is a very polite way to ask.",
      "When the food comes, the waiter may say ¡Buen provecho! (bwen proh-VEH-choh). That means enjoy your meal. The waiter might ask, ¿Algo más? (AHL-goh mahs), anything else? You can say, No, gracias. At the end, you ask for the bill: La cuenta (KWEN-tah), por favor.",
      "Here is something different from many American restaurants. In Spain and much of Latin America, the waiter often waits for you to ask for la cuenta. Bringing it early could feel like rushing you, so people take their time and talk. In many of these countries, lunch is the biggest meal of the day, and families often eat it in the afternoon.",
    ].join("\n\n"),
    keyIdeas: [
      "Quisiera means I would like. Add por favor to order politely.",
      "The waiter asks ¿Qué desea? and ¿Algo más?",
      "At the end, ask for the bill: la cuenta, por favor.",
      "In many Spanish-speaking countries you ask for the bill yourself, and lunch is the big meal.",
    ],
    hook: {
      text: "The railroad town in the Canyon of Echoes has a little restaurant with a red door. Pip is hungry, but the menu is all in Spanish! The waiter smiles and asks, ¿Qué desea? Let's learn how to read the menu and order like a polite guest.",
    },
    teach: [
      {
        title: "Reading the Menu",
        teach:
          "Let's open el menú (meh-NOO). La sopa (SOH-pah) is soup. La ensalada (en-sah-LAH-dah) is salad. El pollo con arroz (POH-yoh kohn ah-RROHS) is chicken with rice. El pescado (pes-KAH-doh) is fish. Las papas fritas (PAH-pahs FREE-tahs) are French fries. Para beber (PAH-rah beh-BER) means to drink: el agua (AH-gwah) is water, and el jugo de naranja (HOO-goh deh nah-RAHN-hah) is orange juice. El postre (POHS-treh) is dessert. El flan is a sweet custard, and el helado (eh-LAH-doh) is ice cream. Many menus are split into these three parts: food, drinks and dessert.",
        visual: {
          type: "flip",
          cards: [
            { front: "la sopa 🍲", back: "soup. Say: SOH-pah." },
            { front: "la ensalada 🥗", back: "salad. Say: en-sah-LAH-dah." },
            { front: "el pollo con arroz 🍗🍚", back: "chicken with rice. Say: POH-yoh kohn ah-RROHS." },
            { front: "el pescado 🐟", back: "fish (to eat). Say: pes-KAH-doh." },
            { front: "el jugo de naranja 🧃🍊", back: "orange juice. Say: HOO-goh deh nah-RAHN-hah." },
            { front: "el helado 🍨", back: "ice cream. Say: eh-LAH-doh." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Help the restaurant write its menu. Put each item in the right part.",
          buckets: ["Comida 🍽️ (food)", "Para beber 🥤 (drinks)", "Postre 🍰 (dessert)"],
          items: [
            { text: "la sopa", bucket: 0 },
            { text: "el pescado", bucket: 0 },
            { text: "el pollo con arroz", bucket: 0 },
            { text: "el agua", bucket: 1 },
            { text: "el jugo de naranja", bucket: 1 },
            { text: "el flan", bucket: 2 },
            { text: "el helado", bucket: 2 },
          ],
          hint: "Agua and jugo are things you drink. Flan and helado are sweet treats for the end of the meal.",
          mistakes: [{ match: "Put el pescado with drinks", coach: "El pescado is fish to eat. Drinks are agua and jugo." }],
          seconds: 55,
        },
        think: {
          q: "On a menu, what is el postre?",
          choices: ["dessert", "soup", "a drink"],
          answer: 0,
          why: "El postre is dessert, the sweet part at the end, like flan or helado.",
          hints: ["", "Soup is la sopa. El postre comes at the end of the meal.", "Drinks are under para beber. El postre is the sweet end of the meal."],
        },
        approaches: {
          analogy:
            "A menu is like a map of the meal. Comida is the main road, para beber is the drink stop, and el postre is the treasure at the end.",
          example:
            "Leo reads the menu. He wants soup, then chicken with rice, orange juice to drink and ice cream for dessert: la sopa, el pollo con arroz, el jugo de naranja y el helado.",
          simpler: {
            q: "What is el agua?",
            choices: ["salad", "water", "fish"],
            answer: 1,
            why: "El agua is water, something to drink.",
            hints: ["Salad is la ensalada. El agua is a drink.", "", "Fish is el pescado. El agua is a drink."],
          },
        },
      },
      {
        title: "Quisiera, por favor",
        teach:
          "Now let's order! El mesero (meh-SEH-roh) is the waiter, and la mesera is a waitress. The waiter asks, ¿Qué desea? (keh deh-SEH-ah). That means what would you like? You answer with quisiera (kee-see-EH-rah). It means I would like, and it is very polite. Quisiera la sopa, por favor. I would like the soup, please. To order a drink, say para beber, then what you want. Para beber, quisiera agua, por favor. Always finish with por favor, and say gracias when the food arrives. Polite words are the same good manners in every language.",
        visual: {
          type: "flip",
          cards: [
            { front: "el mesero 🧑‍🍳", back: "the waiter. Say: meh-SEH-roh." },
            { front: "¿Qué desea? ❓", back: "What would you like? Say: keh deh-SEH-ah." },
            { front: "quisiera 🙏", back: "I would like. Say: kee-see-EH-rah." },
            { front: "por favor 😊", back: "please" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Mesero: ¿Qué {0}? Tú: {1} el pollo con arroz, por {2}. Y para {3}, el jugo de naranja.",
          blanks: [{ answers: ["desea"] }, { answers: ["Quisiera"] }, { answers: ["favor"] }, { answers: ["beber"] }],
          bank: ["desea", "Quisiera", "favor", "beber", "cuenta", "postre"],
          hint: "The waiter asks ¿Qué desea? You order with quisiera and end with por favor. Drinks come after para beber.",
          mistakes: [
            { match: "cuenta", coach: "La cuenta is the bill. You ask for it at the end, not while ordering." },
            { match: "postre", coach: "El postre is dessert. For a drink, say para beber." },
          ],
          seconds: 45,
        },
        think: {
          q: "What does quisiera mean?",
          choices: ["the bill", "I would like", "enjoy your meal"],
          answer: 1,
          why: "Quisiera means I would like. It is a polite way to order.",
          hints: [
            "The bill is la cuenta. Quisiera is how you start an order.",
            "",
            "Enjoy your meal is buen provecho. Quisiera is how you start an order.",
          ],
        },
        approaches: {
          analogy:
            "Quisiera is like saying May I please have instead of Give me. It asks for the same thing, but in a kind, polite way.",
          example:
            "The waiter asks, ¿Qué desea? Sofía says, Quisiera la ensalada, por favor. Para beber, agua. She just ordered a salad and water.",
          simpler: {
            q: "What does por favor mean?",
            choices: ["please", "thank you"],
            answer: 0,
            why: "Por favor means please. Thank you is gracias.",
            hints: ["", "Thank you is gracias. Por favor is what you say when you ask for something."],
          },
        },
      },
      {
        title: "La cuenta, por favor",
        teach:
          "Your food arrives! The waiter says ¡Buen provecho! (bwen proh-VEH-choh). That means enjoy your meal. Later the waiter asks, ¿Algo más? (AHL-goh mahs). That means anything else? You can say, Sí, el flan, por favor, or No, gracias. When you are done, you ask for the bill: La cuenta (KWEN-tah), por favor. Here is something different. In Spain and much of Latin America, the waiter often waits for you to ask for la cuenta. Bringing it early could feel like rushing you. Meals are a time to sit and talk. In many of these countries, lunch is the biggest meal of the day.",
        visual: {
          type: "compare",
          left: { title: "Many U.S. restaurants 🇺🇸", points: ["The bill often comes when you finish", "Dinner is often the big meal"] },
          right: { title: "Many Spanish-speaking countries 🌎", points: ["You ask: la cuenta, por favor", "Lunch is often the big meal", "People sit and talk a long time"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put the restaurant conversation in order.",
          steps: [
            "Mesero: ¿Qué desea?",
            "Tú: Quisiera la sopa, por favor.",
            "Mesero: ¡Buen provecho!",
            "Mesero: ¿Algo más?",
            "Tú: No, gracias. La cuenta, por favor.",
          ],
          hint: "First you order, then the food comes, and the bill is last.",
          mistakes: [{ match: "Put la cuenta first", coach: "La cuenta is the bill. You ask for it at the very end." }],
          seconds: 50,
        },
        think: {
          q: "When do you say la cuenta, por favor?",
          choices: ["When you sit down", "When the food arrives", "When you are ready to pay"],
          answer: 2,
          why: "La cuenta is the bill, so you ask for it when you are finished and ready to pay.",
          hints: [
            "When you sit down you haven't eaten yet. La cuenta is the bill.",
            "When the food arrives you hear buen provecho. La cuenta is the bill.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Asking for la cuenta is like raising your hand to say you are done with a test. The waiter waits for your signal before bringing it.",
          example:
            "Leo finishes his chicken. The waiter asks, ¿Algo más? Leo says, No, gracias. La cuenta, por favor. The waiter brings the bill.",
          simpler: {
            q: "What does ¡Buen provecho! mean?",
            choices: ["Goodbye", "Enjoy your meal", "How much?"],
            answer: 1,
            why: "¡Buen provecho! means enjoy your meal. The waiter says it when the food arrives.",
            hints: ["Goodbye is adiós. Buen provecho is said when the food comes.", "", "How much is cuánto. Buen provecho is said when the food comes."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every sentence that the customer (you!) would say.",
      sentences: [
        "¿Qué desea?",
        "Quisiera la ensalada, por favor.",
        "¡Buen provecho!",
        "Para beber, agua, por favor.",
        "¿Algo más?",
        "La cuenta, por favor.",
      ],
      correct: [1, 3, 5],
    },
    explain: {
      prompt: "Explain to Señora Luz how to order a meal in Spanish, from the first question to paying. What does the waiter say, and what do you say?",
      keyPoints: [
        "The waiter asks ¿Qué desea?",
        "Quisiera means I would like",
        "Say por favor and gracias to be polite",
        "Ask for la cuenta at the end",
        "In many Spanish-speaking countries you ask for the bill yourself",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each menu word to its picture.",
        pairs: [
          { left: "la sopa", right: "🍲" },
          { left: "el pescado", right: "🐟" },
          { left: "las papas fritas", right: "🍟" },
          { left: "el helado", right: "🍨" },
          { left: "la ensalada", right: "🥗" },
        ],
        hint: "Sopa is soup, pescado is fish, papas fritas are fries, helado is ice cream and ensalada is salad.",
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build a polite order: I would like the chicken with rice, please.",
        tiles: ["Quisiera", "el", "pollo", "con", "arroz", "por favor"],
        distractors: ["la cuenta", "desea"],
        also: [["por favor", "Quisiera", "el", "pollo", "con", "arroz"]],
        hint: "Start with quisiera, then the food: el pollo con arroz. End with por favor.",
        mistakes: [
          { match: "la cuenta", coach: "La cuenta is the bill. You are ordering food now." },
          { match: "desea", coach: "Desea is in the waiter's question. You answer with quisiera." },
        ],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "The menu says: la sopa, cuarenta pesos. El jugo de naranja, veinte pesos. You order both. How many pesos is la cuenta?",
        answer: 60,
        unit: "pesos",
        hint: "Cuarenta is 40 and veinte is 20. Add them together.",
        mistakes: [
          { match: "40", coach: "That is just the soup. Add the juice too: veinte is 20." },
          { match: "24", coach: "Cuarenta is 40, not 4. Try 40 + 20." },
        ],
        seconds: 35,
      },
      {
        type: "cloze",
        text: "Mesero: ¿Algo {0}? Tú: No, {1}. La {2}, por favor.",
        blanks: [{ answers: ["más"] }, { answers: ["gracias"] }, { answers: ["cuenta"] }],
        bank: ["más", "gracias", "cuenta", "sopa", "quisiera"],
        hint: "¿Algo más? means anything else? Say no thank you, then ask for the bill.",
        mistakes: [
          { match: "sopa", coach: "If you are done, you don't want more soup. Ask for the bill: la cuenta." },
          { match: "quisiera", coach: "Quisiera starts an order. Here you are saying no thank you: no, gracias." },
        ],
        seconds: 35,
      },
    ],
    check: [
      {
        q: "The waiter asks ¿Qué desea? What is the best answer?",
        choices: ["Quisiera la sopa, por favor.", "La cuenta, por favor.", "¡Buen provecho!"],
        answer: 0,
        why: "¿Qué desea? means what would you like, so you order with quisiera.",
      },
      {
        q: "What is la cuenta?",
        choices: ["the menu", "the bill", "the waiter"],
        answer: 1,
        why: "La cuenta is the bill. You ask for it when you are done eating.",
      },
      {
        q: "On a menu, para beber is the part with...",
        choices: ["desserts", "soups", "drinks"],
        answer: 2,
        why: "Para beber means to drink, so that part lists drinks like agua and jugo.",
      },
      {
        q: "In many Spanish-speaking countries, when does the waiter bring the bill?",
        choices: ["Before the food", "When you ask for it", "Right after you order"],
        answer: 1,
        why: "The waiter often waits for you to ask, so you don't feel rushed.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Play restaurant at home! Make a small Spanish menu with at least five items and prices in pesos. Be the customer while a parent is el mesero, then switch. Order with quisiera and por favor, and ask for la cuenta at the end.",
      rubric: [
        "Makes a menu with at least five Spanish food or drink words",
        "Orders politely with quisiera and por favor",
        "Asks for la cuenta at the end",
        "Plays the waiter too, asking ¿Qué desea?",
      ],
    },
  },

  // 3. Shopping and numbers to 1,000
  {
    id: "span-4.shopping",
    title: "¿Cuánto cuesta? Numbers to 1,000",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.4.5", "SPAN.4.6", "SPAN.4.4"],
    read: [
      "You can already count to 100 in Spanish. Today we go all the way to mil (meel), one thousand! Then we use big numbers to go shopping.",
      "One hundred is cien (see-EN). Then count by hundreds: doscientos (dohs-see-EN-tohs) is 200, trescientos is 300, cuatrocientos is 400. Three numbers are a little tricky. Quinientos (kee-nee-EN-tohs) is 500. Setecientos (seh-teh-see-EN-tohs) is 700. Novecientos (noh-veh-see-EN-tohs) is 900. The others follow the pattern: seiscientos is 600 and ochocientos is 800. Then comes mil, 1,000.",
      "To say a number between 101 and 199, use ciento (see-EN-toh). Ciento uno is 101. Ciento cincuenta is 150. To build bigger numbers, say the hundreds first, then the rest. Doscientos cincuenta is 250. Trescientos cuarenta y cinco is 345. Notice that y only goes between the tens and the ones, never right after the hundreds.",
      "Now let's go to la tienda (tee-EN-dah), the store. To ask a price, say ¿Cuánto cuesta? (KWAN-toh KWES-tah). That means how much does it cost? ¿Cuánto cuesta la camisa? The clerk answers, Cuesta trescientos pesos. For more than one thing, say cuestan: ¿Cuánto cuestan los zapatos? Cuestan quinientos pesos.",
      "In Mexico, Argentina and Chile, money is counted in pesos, so prices in the hundreds are normal for everyday things. If a price is high, say Es caro (KAH-roh), it's expensive. If it is low, say Es barato (bah-RAH-toh), it's cheap. Then you can say, Lo compro (loh KOHM-proh), I'll buy it!",
    ].join("\n\n"),
    keyIdeas: [
      "Cien is 100, and the hundreds go doscientos, trescientos... up to mil, 1,000.",
      "Watch the tricky three: quinientos (500), setecientos (700) and novecientos (900).",
      "¿Cuánto cuesta? asks a price. Cuesta or cuestan gives it.",
    ],
    hook: {
      text: "The railroad town has a busy market by the train station. Pip spots a woven blanket and asks the seller how much it is. She says, Cuesta setecientos pesos! That number is bigger than anything Pip knows in Spanish. Let's learn to count to mil, one thousand.",
    },
    teach: [
      {
        title: "Counting by Hundreds",
        teach:
          "Let's count by hundreds. Cien (see-EN) is 100. Doscientos (dohs-see-EN-tohs) is 200. Hear the dos for two? Trescientos is 300, with tres for three. Cuatrocientos is 400. Now the tricky three! Quinientos (kee-nee-EN-tohs) is 500. Seiscientos is 600. Setecientos (seh-teh-see-EN-tohs) is 700, not sietecientos. Ochocientos is 800. Novecientos (noh-veh-see-EN-tohs) is 900, not nuevecientos. And then the big one: mil (meel) is 1,000. Most hundreds are just a number word plus cientos. Only 500, 700 and 900 change their spelling a little.",
        visual: {
          type: "flip",
          cards: [
            { front: "cien 💯", back: "100. Say: see-EN." },
            { front: "doscientos", back: "200. Dos + cientos. Say: dohs-see-EN-tohs." },
            { front: "quinientos ⭐", back: "500. A tricky one! Say: kee-nee-EN-tohs." },
            { front: "setecientos ⭐", back: "700. Not sietecientos! Say: seh-teh-see-EN-tohs." },
            { front: "novecientos ⭐", back: "900. Not nuevecientos! Say: noh-veh-see-EN-tohs." },
            { front: "mil 🎉", back: "1,000. Say: meel." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each Spanish number to its spot on the number line.",
          min: 0,
          max: 1000,
          step: 100,
          tolerance: 25,
          items: [
            { label: "doscientos", value: 200 },
            { label: "quinientos", value: 500 },
            { label: "setecientos", value: 700 },
            { label: "novecientos", value: 900 },
          ],
          hint: "Dos is 2, so doscientos is 200. Quinientos is 500, setecientos is 700 and novecientos is 900.",
          mistakes: [{ match: "Put setecientos at 600", coach: "Siete is 7, so setecientos is 700. Seiscientos is 600." }],
          seconds: 45,
        },
        think: {
          q: "What number is quinientos?",
          choices: ["50", "5", "500"],
          answer: 2,
          why: "Quinientos is 500. Cincuenta is 50 and cinco is 5.",
          hints: [
            "Fifty is cincuenta. The ending -ientos means hundreds.",
            "Five is cinco. The ending -ientos means hundreds.",
            "",
          ],
        },
        approaches: {
          analogy:
            "The ending -cientos is like a stamp that says hundreds. Stick it on dos and you get doscientos, two hundred. Stick it on tres and you get trescientos.",
          example:
            "Count with me: cien, doscientos, trescientos, cuatrocientos, quinientos, seiscientos, setecientos, ochocientos, novecientos, mil. That is 100 to 1,000 by hundreds.",
          simpler: {
            q: "Doscientos has dos in it. What is dos?",
            choices: ["two", "ten"],
            answer: 0,
            why: "Dos is two, so doscientos is two hundred.",
            hints: ["", "Ten is diez. Dos is a smaller number."],
          },
        },
      },
      {
        title: "Building Big Numbers",
        teach:
          "Now let's build numbers in between. Cien is exactly 100. For 101 to 199, it changes to ciento (see-EN-toh). Ciento uno is 101. Ciento cincuenta is 150. For bigger numbers, say the hundreds first, then the rest, the same way you already say numbers under 100. Doscientos cincuenta is 250. Setecientos veinte is 720. Trescientos cuarenta y cinco is 345. Here is a rule to remember. The word y, which means and, only goes between the tens and the ones, like cuarenta y cinco. You never put y right after the hundreds. So 345 is trescientos cuarenta y cinco, with just one y.",
        visual: {
          type: "flip",
          cards: [
            { front: "ciento uno", back: "101" },
            { front: "ciento cincuenta", back: "150" },
            { front: "doscientos cincuenta", back: "250" },
            { front: "setecientos veinte", back: "720" },
            { front: "trescientos cuarenta y cinco", back: "345" },
          ],
        },
        probe: {
          type: "number",
          prompt: "Write this number with digits: cuatrocientos sesenta y dos.",
          answer: 462,
          hint: "Cuatrocientos is 400. Sesenta y dos is 62. Put them together.",
          mistakes: [
            { match: "4062", coach: "Don't write the 400 and the 62 side by side. 400 + 62 is 462." },
            { match: "472", coach: "Sesenta is 60, not 70. Setenta is 70." },
          ],
          seconds: 30,
        },
        think: {
          q: "How do you say 150 in Spanish?",
          choices: ["cien cincuenta", "ciento cincuenta", "ciento y cincuenta"],
          answer: 1,
          why: "For 101 to 199 you use ciento, and there is no y after the hundreds: ciento cincuenta.",
          hints: [
            "Cien is only for exactly 100. For 101 to 199 it becomes ciento.",
            "",
            "Y only goes between the tens and the ones, not after the hundreds.",
          ],
        },
        approaches: {
          analogy:
            "Building a big number is like stacking blocks: put down the hundreds block first, then the tens and ones on top. Doscientos, then cincuenta: 250.",
          example:
            "To say 563, start with the hundreds: quinientos. Then say 63 the way you already know: sesenta y tres. Together: quinientos sesenta y tres.",
          simpler: {
            q: "Trescientos is 300. What is trescientos diez?",
            choices: ["310", "3010", "390"],
            answer: 0,
            why: "Diez is 10, so trescientos diez is 300 + 10 = 310.",
            hints: ["", "Don't write them side by side. 300 + 10 makes a three-digit number.", "Diez is 10, not 90. Noventa is 90."],
          },
        },
      },
      {
        title: "¿Cuánto cuesta?",
        teach:
          "Time to shop at la tienda (tee-EN-dah), the store. To ask a price, say ¿Cuánto cuesta? (KWAN-toh KWES-tah). That means how much does it cost? ¿Cuánto cuesta la camisa? The clerk says, Cuesta trescientos pesos. If you ask about more than one thing, say cuestan. ¿Cuánto cuestan los zapatos? Cuestan quinientos pesos. In Mexico, Argentina and Chile, money is counted in pesos, so everyday prices are often in the hundreds. If the price is high, say Es caro (KAH-roh), it's expensive. If it is low, say Es barato (bah-RAH-toh), it's cheap. To buy it, say Lo compro (loh KOHM-proh), I'll buy it.",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Cuánto cuesta? 🏷️", back: "How much does it cost? Say: KWAN-toh KWES-tah." },
            { front: "cuestan 👟👟", back: "they cost (more than one thing)" },
            { front: "Es caro. 💸", back: "It's expensive. Say: KAH-roh." },
            { front: "Es barato. 🪙", back: "It's cheap. Say: bah-RAH-toh." },
            { front: "Lo compro. 🛍️", back: "I'll buy it. Say: loh KOHM-proh." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Tú: ¿Cuánto {0} la chaqueta? Vendedor: Cuesta {1} pesos. (900) Tú: ¡Uy! Es {2}.",
          blanks: [{ answers: ["cuesta"] }, { answers: ["novecientos"] }, { answers: ["caro"] }],
          bank: ["cuesta", "novecientos", "caro", "nuevecientos", "barato"],
          hint: "One jacket uses cuesta. 900 is one of the tricky three. A high price is expensive.",
          mistakes: [
            { match: "nuevecientos", coach: "Good try, but 900 is a tricky one: novecientos, with nove." },
            { match: "barato", coach: "Barato means cheap. ¡Uy! tells us 900 pesos feels expensive: caro." },
          ],
          seconds: 40,
        },
        think: {
          q: "You want to know the price of the shoes. What do you ask?",
          choices: ["¿Cuántos años tienes?", "¿Qué hora es?", "¿Cuánto cuestan los zapatos?"],
          answer: 2,
          why: "¿Cuánto cuestan...? asks how much things cost. Shoes are more than one, so it's cuestan.",
          hints: [
            "¿Cuántos años tienes? asks someone's age, not a price.",
            "¿Qué hora es? asks the time, not a price.",
            "",
          ],
        },
        approaches: {
          analogy:
            "¿Cuánto cuesta? is like reading a price tag out loud as a question. The answer, cuesta and a number, is the price tag talking back.",
          example:
            "Sofía holds up a hat. ¿Cuánto cuesta el sombrero? The clerk says, Cuesta doscientos pesos. Sofía says, Es barato. ¡Lo compro!",
          simpler: {
            q: "What does es caro mean?",
            choices: ["It's cheap", "It's expensive"],
            answer: 1,
            why: "Es caro means it's expensive. Es barato means it's cheap.",
            hints: ["Cheap is barato. Caro is the word for a high price.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Read each price. Is it more or less than quinientos pesos (500)?",
      buckets: ["Menos de 500 ⬇️", "Más de 500 ⬆️"],
      items: [
        { text: "doscientos pesos", bucket: 0 },
        { text: "cuatrocientos noventa pesos", bucket: 0 },
        { text: "ciento veinte pesos", bucket: 0 },
        { text: "seiscientos pesos", bucket: 1 },
        { text: "setecientos diez pesos", bucket: 1 },
        { text: "novecientos pesos", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain to Señora Luz how to count by hundreds to 1,000 in Spanish and how to ask a price at a store. Which numbers are tricky?",
      keyPoints: [
        "Cien is 100 and mil is 1,000",
        "Hundreds add -cientos, like doscientos",
        "Quinientos, setecientos and novecientos are the tricky ones",
        "Say the hundreds first, then the rest",
        "¿Cuánto cuesta? asks the price",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each Spanish number to its digits.",
        pairs: [
          { left: "cien", right: "100" },
          { left: "quinientos", right: "500" },
          { left: "setecientos", right: "700" },
          { left: "novecientos", right: "900" },
          { left: "mil", right: "1,000" },
        ],
        hint: "Cien is 100 and mil is 1,000. The tricky three are 500, 700 and 900.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "La camisa cuesta doscientos pesos. Los zapatos cuestan quinientos pesos. How many pesos do you pay for both?",
        answer: 700,
        unit: "pesos",
        hint: "Doscientos is 200 and quinientos is 500. Add them.",
        mistakes: [
          { match: "250", coach: "Quinientos is 500, not 50. Try 200 + 500." },
          { match: "300", coach: "Quinientos is 500. 200 + 500 is more than 300." },
        ],
        seconds: 35,
      },
      {
        type: "build",
        prompt: "Build the question: How much does the shirt cost?",
        tiles: ["¿Cuánto", "cuesta", "la", "camisa?"],
        distractors: ["cuestan", "el"],
        hint: "Start with ¿Cuánto, then cuesta for one thing, then la camisa.",
        mistakes: [
          { match: "cuestan", coach: "Cuestan is for more than one thing. One shirt uses cuesta." },
          { match: "el", coach: "Camisa ends in -a, so it goes with la." },
        ],
        seconds: 30,
      },
      {
        type: "place",
        prompt: "Put each price on the number line.",
        min: 0,
        max: 1000,
        step: 50,
        tolerance: 25,
        items: [
          { label: "ciento cincuenta", value: 150 },
          { label: "trescientos cincuenta", value: 350 },
          { label: "seiscientos", value: 600 },
          { label: "ochocientos cincuenta", value: 850 },
        ],
        hint: "Find the hundreds first, then add the tens: cincuenta is 50.",
        mistakes: [{ match: "Put seiscientos at 700", coach: "Seis is 6, so seiscientos is 600. Setecientos is 700." }],
        seconds: 45,
      },
    ],
    check: [
      {
        q: "What is novecientos?",
        choices: ["900", "90", "9,000"],
        answer: 0,
        why: "Novecientos is 900. Noventa is 90.",
      },
      {
        q: "How do you say 100 by itself?",
        choices: ["ciento", "mil", "cien"],
        answer: 2,
        why: "Exactly 100 is cien. Ciento is used for 101 to 199, and mil is 1,000.",
      },
      {
        q: "The clerk says, Cuestan cuatrocientos pesos. What did you ask about?",
        choices: ["The time", "More than one thing", "Your age"],
        answer: 1,
        why: "Cuestan means they cost, so you asked about more than one thing, like shoes.",
      },
      {
        q: "A toy costs 950 pesos. Your friend says, ¡Es caro! What does that mean?",
        choices: ["It's cheap!", "I'll buy it!", "It's expensive!"],
        answer: 2,
        why: "Caro means expensive. Barato means cheap.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Set up a pretend store at home. Put price tags in pesos, written in Spanish words, on at least six things (use numbers from 100 to 1,000). A parent shops and asks ¿Cuánto cuesta? and you answer with the price. Then switch places.",
      rubric: [
        "Writes at least six prices in Spanish words between 100 and 1,000",
        "Spells the tricky numbers (500, 700, 900) correctly if used",
        "Answers ¿Cuánto cuesta? with cuesta and the price",
        "Asks ¿Cuánto cuesta? as the shopper",
      ],
    },
  },

  // 4. Directions in town
  {
    id: "span-4.directions",
    title: "¿Dónde está? Directions in Town",
    minutes: 30,
    stage: "logic",
    standards: ["SPAN.4.7", "SPAN.4.4", "SPAN.4.13"],
    read: [
      "You already know the places in a town: el parque, la biblioteca, el mercado, el banco and el museo. Today you will learn to find your way to them in Spanish.",
      "To ask where something is, say ¿Dónde está...? (DOHN-deh es-TAH). ¿Dónde está el museo? means where is the museum? Start politely with Perdón (pehr-DOHN), excuse me.",
      "The answer tells you how close it is and what it is next to. Está cerca (SEHR-kah) means it's near. Está lejos (LEH-hohs) means it's far. Al lado de (ahl LAH-doh deh) means next to. Enfrente de (en-FREN-teh deh) means across from. When de meets el, they join to make del, just like a and el make al. So next to the bank is al lado del banco.",
      "Now the directions. Sigue todo recto (SEE-geh TOH-doh REK-toh) means go straight ahead. Gira a la derecha (HEE-rah ah lah deh-REH-chah) means turn right. Gira a la izquierda (ees-kee-EHR-dah) means turn left. Una cuadra (KWAH-drah) is one city block, and la esquina (es-KEE-nah) is the corner.",
      "Put it together: Sigue todo recto dos cuadras. Luego gira a la izquierda. El museo está en la esquina, al lado del banco. To follow directions, listen for three things: which way, how many blocks, and what the place is next to. When someone helps you, say ¡Muchas gracias! They will answer, De nada (deh NAH-dah), you're welcome.",
      "Here's a tip. Before you start walking, hold your hands up in front of you. Your left hand makes the shape of an L, for left: izquierda. The other side is la derecha.",
    ].join("\n\n"),
    keyIdeas: [
      "¿Dónde está...? asks where a place is.",
      "A la derecha is right, a la izquierda is left, and todo recto is straight ahead.",
      "Cerca, lejos, al lado de and enfrente de tell where a place is.",
    ],
    hook: {
      text: "The railroad town in the Canyon of Echoes has winding streets, and Pip is lost! A friendly shopkeeper says, Sigue todo recto, luego gira a la derecha. Pip's wings droop. Which way is that? Let's learn to ask for directions and follow them in Spanish.",
    },
    teach: [
      {
        title: "¿Dónde está?",
        teach:
          "To ask where something is, say ¿Dónde está...? (DOHN-deh es-TAH). ¿Dónde está la biblioteca? means where is the library? Be polite and start with Perdón (pehr-DOHN), excuse me. The answer often tells you how close the place is. Está cerca (SEHR-kah) means it's near. Está lejos (LEH-hohs) means it's far. It may also tell you what the place is next to. Al lado de (ahl LAH-doh deh) means next to. Enfrente de (en-FREN-teh deh) means across from. When de meets el, they join to make del, just like a and el make al. So next to the bank is al lado del banco.",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Dónde está...? 📍", back: "Where is...? Say: DOHN-deh es-TAH." },
            { front: "cerca 👣", back: "near. Say: SEHR-kah." },
            { front: "lejos 🏔️", back: "far. Say: LEH-hohs." },
            { front: "al lado de ↔️", back: "next to. Say: ahl LAH-doh deh." },
            { front: "enfrente de ↕️", back: "across from. Say: en-FREN-teh deh." },
            { front: "de + el = del", back: "al lado del banco: next to the bank" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish phrase to its meaning.",
          pairs: [
            { left: "¿Dónde está?", right: "Where is it?" },
            { left: "Está cerca.", right: "It's near." },
            { left: "Está lejos.", right: "It's far." },
            { left: "al lado del banco", right: "next to the bank" },
            { left: "enfrente del parque", right: "across from the park" },
          ],
          hint: "Cerca is near and lejos is far. Al lado means next to and enfrente means across from.",
          mistakes: [{ match: "Mixed up cerca and lejos", coach: "Cerca is near, like close by. Lejos is far away." }],
          seconds: 45,
        },
        think: {
          q: "Someone says, La biblioteca está al lado del parque. Where is the library?",
          choices: ["Far from the park", "Next to the park", "Inside the park"],
          answer: 1,
          why: "Al lado de means next to, so the library is next to the park.",
          hints: [
            "Far would be lejos. Al lado de means something else.",
            "",
            "Inside would be en. Al lado de means beside.",
          ],
        },
        approaches: {
          analogy:
            "Asking ¿Dónde está? is like asking a map to talk. The answer gives you clues: how far (cerca or lejos) and what's nearby (al lado de, enfrente de).",
          example:
            "Perdón, ¿dónde está el banco? Está cerca. Está enfrente del mercado. So the bank is close by, across the street from the market.",
          simpler: {
            q: "What does cerca mean?",
            choices: ["far", "near"],
            answer: 1,
            why: "Cerca means near. Lejos means far.",
            hints: ["Far is lejos. Cerca means the opposite.", ""],
          },
        },
      },
      {
        title: "Right, Left and Straight",
        teach:
          "Now the directions. Sigue todo recto (SEE-geh TOH-doh REK-toh) means go straight ahead. Gira a la derecha (HEE-rah ah lah deh-REH-chah) means turn right. Gira a la izquierda (ees-kee-EHR-dah) means turn left. Here's a trick. Hold your hands up in front of you. Your left hand makes the shape of an L. That hand is la izquierda. The other side is la derecha. Two more helpful words: una cuadra (KWAH-drah) is one city block, and la esquina (es-KEE-nah) is the corner. Gira a la derecha en la esquina means turn right at the corner. Stand up and try it: todo recto, a la derecha, a la izquierda!",
        visual: {
          type: "flip",
          cards: [
            { front: "Sigue todo recto ⬆️", back: "Go straight ahead. Say: SEE-geh TOH-doh REK-toh." },
            { front: "Gira a la derecha ➡️", back: "Turn right. Say: HEE-rah ah lah deh-REH-chah." },
            { front: "Gira a la izquierda ⬅️", back: "Turn left. Say: ees-kee-EHR-dah." },
            { front: "una cuadra 🏘️", back: "one block. Say: KWAH-drah." },
            { front: "la esquina 📐", back: "the corner. Say: es-KEE-nah." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the direction: Turn left at the corner. ⬅️",
          tiles: ["Gira", "a la", "izquierda", "en", "la esquina"],
          distractors: ["derecha", "recto"],
          hint: "Start with gira, turn. Left is a la izquierda. Then en la esquina, at the corner.",
          mistakes: [
            { match: "derecha", coach: "Derecha is right. Left is izquierda, the L hand." },
            { match: "recto", coach: "Recto is straight. You want to turn left: izquierda." },
          ],
          seconds: 40,
        },
        think: {
          q: "What does gira a la derecha mean?",
          choices: ["Turn right", "Turn left", "Go straight"],
          answer: 0,
          why: "Derecha is right, so gira a la derecha means turn right.",
          hints: [
            "",
            "Left is izquierda, the L hand. Derecha is the other side.",
            "Straight ahead is todo recto. Gira means turn.",
          ],
        },
        approaches: {
          analogy:
            "Think of a video game controller: the up arrow is todo recto, the right arrow is a la derecha, and the left arrow is a la izquierda.",
          example:
            "You walk out the door. Sigue todo recto una cuadra. At the corner, gira a la izquierda. You walked one block straight, then turned left.",
          simpler: {
            q: "What does gira mean?",
            choices: ["turn", "stop", "run"],
            answer: 0,
            why: "Gira means turn, like gira a la derecha, turn right.",
            hints: ["", "Stop is not gira. Gira goes with right and left.", "Run is not gira. Gira goes with right and left."],
          },
        },
      },
      {
        title: "Follow the Route",
        teach:
          "Now let's follow real directions. Listen for three things: which way, how many blocks, and what the place is next to. Here we go. You are at la estación de tren (es-tah-see-OHN deh tren), the train station. You ask, Perdón, ¿dónde está el museo? A kind man says, Sigue todo recto dos cuadras. Luego gira a la izquierda. El museo está en la esquina, al lado del banco. So you walk straight two blocks, turn left, and look for the corner next to the bank. You found it! Say ¡Muchas gracias! He answers, De nada (deh NAH-dah). That means you're welcome.",
        visual: {
          type: "hotspots",
          title: "The walk to the museum",
          center: "🚉 La estación de tren",
          spots: [
            { label: "Sigue todo recto dos cuadras", icon: "⬆️", detail: "Walk straight ahead for two blocks." },
            { label: "Gira a la izquierda", icon: "⬅️", detail: "At the corner, turn left." },
            { label: "Al lado del banco", icon: "🏦", detail: "The museum is on the corner, right next to the bank." },
            { label: "¡Muchas gracias!", icon: "🙏", detail: "Thank the helper. They answer: De nada." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Start at the train station. Sigue todo recto tres cuadras. Luego gira a la derecha y sigue dos cuadras más. How many blocks do you walk in all?",
          answer: 5,
          unit: "blocks",
          hint: "Tres is 3 and dos is 2. Add the blocks together.",
          mistakes: [
            { match: "3", coach: "That's just the first part. After you turn, you walk dos cuadras más, two more." },
            { match: "2", coach: "That's just the last part. First you walked tres cuadras." },
          ],
          seconds: 30,
        },
        think: {
          q: "The helper says, Sigue todo recto dos cuadras. What do you do?",
          choices: ["Turn left at the corner", "Walk straight for two blocks", "Walk two blocks back"],
          answer: 1,
          why: "Todo recto is straight ahead, and dos cuadras is two blocks.",
          hints: [
            "Turning left is gira a la izquierda. Todo recto means straight.",
            "",
            "Todo recto means straight ahead, not back.",
          ],
        },
        approaches: {
          analogy:
            "Following directions is like following a recipe: do each step in order, and don't skip one, or you end up in the wrong place.",
          example:
            "Sigue todo recto una cuadra. Gira a la derecha. El parque está enfrente de la biblioteca. Walk one block, turn right, and the park is across from the library.",
          simpler: {
            q: "What is una cuadra?",
            choices: ["a corner", "a block", "a bank"],
            answer: 1,
            why: "Una cuadra is one city block.",
            hints: ["A corner is la esquina. Una cuadra is a whole block.", "", "A bank is el banco. Una cuadra is a city block."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the conversation in order.",
      steps: [
        "Tú: Perdón, ¿dónde está el museo?",
        "Señor: Sigue todo recto dos cuadras.",
        "Señor: Luego gira a la izquierda.",
        "Señor: El museo está en la esquina, al lado del banco.",
        "Tú: ¡Muchas gracias!",
        "Señor: De nada.",
      ],
    },
    explain: {
      prompt: "Explain to Señora Luz how to ask for directions in Spanish and how to follow them. What do you listen for?",
      keyPoints: [
        "¿Dónde está? asks where a place is",
        "A la derecha is right and a la izquierda is left",
        "Todo recto means straight ahead",
        "Count the cuadras, the blocks",
        "Listen for what the place is next to or across from",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each direction to its arrow.",
        pairs: [
          { left: "Gira a la derecha.", right: "➡️" },
          { left: "Gira a la izquierda.", right: "⬅️" },
          { left: "Sigue todo recto.", right: "⬆️" },
        ],
        hint: "Derecha is right, izquierda is left (the L hand), and todo recto is straight ahead.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Perdón, ¿{0} está el banco? Sigue todo {1} una cuadra. El banco está al {2} del mercado.",
        blanks: [{ answers: ["dónde", "donde"] }, { answers: ["recto"] }, { answers: ["lado"] }],
        bank: ["dónde", "recto", "lado", "cuánto", "cuadra"],
        hint: "Where is ¿dónde? Straight ahead is todo recto. Next to is al lado de.",
        mistakes: [
          { match: "cuánto", coach: "¿Cuánto? asks how much. To ask where, say ¿dónde?" },
          { match: "cuadra", coach: "Cuadra means block. Straight ahead is todo recto." },
        ],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that tells you to turn.",
        sentences: [
          "Gira a la derecha.",
          "Sigue todo recto.",
          "El banco está cerca.",
          "Gira a la izquierda en la esquina.",
          "El museo está al lado del parque.",
        ],
        correct: [0, 3],
        hint: "Gira means turn. Look for the sentences with gira.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Sigue todo recto cuatro cuadras. Gira a la izquierda y sigue una cuadra más. How many blocks do you walk in all?",
        answer: 5,
        unit: "blocks",
        hint: "Cuatro is 4 and una is 1. Add them.",
        mistakes: [{ match: "4", coach: "Don't forget the una cuadra más, one more block, after you turn." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "How do you ask where the library is?",
        choices: ["¿Cuánto cuesta la biblioteca?", "¿Dónde está la biblioteca?", "¿A qué hora es la biblioteca?"],
        answer: 1,
        why: "¿Dónde está...? means where is...?",
      },
      {
        q: "What does sigue todo recto mean?",
        choices: ["Go straight ahead", "Turn right", "It's far"],
        answer: 0,
        why: "Sigue todo recto means go straight ahead.",
      },
      {
        q: "El parque está lejos. Where is the park?",
        choices: ["Next door", "Near", "Far away"],
        answer: 2,
        why: "Lejos means far. Cerca means near.",
      },
      {
        q: "Someone helps you and you say ¡Muchas gracias! What do they answer?",
        choices: ["De nada", "Perdón", "Gira a la derecha"],
        answer: 0,
        why: "De nada means you're welcome.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "On a walk or a drive with a parent, be the guide! Give at least four directions in Spanish to get somewhere (a la derecha, a la izquierda, todo recto, and how many cuadras). Then let your parent give you directions in Spanish and follow them.",
      rubric: [
        "Gives at least four directions in Spanish",
        "Uses a la derecha, a la izquierda and todo recto correctly",
        "Counts blocks with cuadras",
        "Follows a parent's Spanish directions",
      ],
    },
  },

  // 5. Ser and estar
  {
    id: "span-4.ser-estar",
    title: "Ser y estar: Two Ways to Say Is",
    minutes: 30,
    stage: "logic",
    standards: ["SPAN.4.8", "SPAN.4.11"],
    read: [
      "In English, we have one verb for to be: I am, you are, it is. Spanish has two! They are ser (sehr) and estar (es-TAR). Choosing the right one is like solving a little puzzle, and today you will learn the clues.",
      "Use ser for what someone or something is like, what it is, and where someone is from. These things usually don't change from day to day. Its forms are soy (soy), I am; eres (EH-res), you are; and es (es), he, she or it is. Soy alto. I am tall. Mi perro es grande. My dog is big. Eres simpática. You are nice. Soy de Ohio. I am from Ohio.",
      "Use estar for how someone feels right now and where something is. Its forms are estoy (es-TOY), I am; estás (es-TAHS), you are; and está (es-TAH), he, she or it is. Estoy cansado (kahn-SAH-doh). I am tired. ¿Cómo estás? How are you? Mi hermano está contento (kohn-TEN-toh). My brother is happy right now. La biblioteca está al lado del parque. The library is next to the park.",
      "Here is a rhyme to help you remember: how you feel and where you are, that is when you use estar. For almost everything else in this lesson, use ser.",
      "Watch how one word can change the meaning. Mi papá es alto tells what Dad is like. Mi papá está cansado tells how Dad feels today, after a long day. Mi papá está en la cocina tells where Dad is. All three say is in English, but Spanish shows you which kind of is it means.",
    ].join("\n\n"),
    keyIdeas: [
      "Ser (soy, eres, es) tells what someone or something is like and where someone is from.",
      "Estar (estoy, estás, está) tells how someone feels and where something is.",
      "Rhyme: how you feel and where you are, that is when you use estar.",
    ],
    hook: {
      text: "Deep in the Canyon of Echoes, Pip shouts, ¡Soy Pip! The canyon echoes back, ¡Soy Pip! Then Pip shouts, ¡Estoy cansado! and the echo answers too. Both soy and estoy mean I am. So why does Spanish have two? Let's crack the code.",
    },
    teach: [
      {
        title: "Ser: What Something Is Like",
        teach:
          "Ser (sehr) is the to be for what someone or something is like. It tells traits that usually stay the same, what a thing is, and where someone is from. Here are its forms. Soy (soy) means I am. Eres (EH-res) means you are. Es (es) means he, she or it is. Soy alto. I am tall. Eres simpática. You are nice. Mi perro es grande. My dog is big. Soy de Ohio. I am from Ohio. If you could write it on a name card that stays true all year, use ser.",
        visual: {
          type: "flip",
          cards: [
            { front: "soy 🙋", back: "I am (ser). Soy alto: I am tall." },
            { front: "eres 🫵", back: "you are (ser). Eres simpática: you are nice." },
            { front: "es 👉", back: "he, she or it is (ser). Mi perro es grande." },
            { front: "Soy de... 🗺️", back: "I am from... Soy de Ohio." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Yo {0} de Texas. Tú {1} muy simpático. Mi gato {2} negro.",
          blanks: [{ answers: ["soy"] }, { answers: ["eres"] }, { answers: ["es"] }],
          bank: ["soy", "eres", "es", "estoy"],
          hint: "Yo goes with soy, tú goes with eres, and one cat goes with es.",
          mistakes: [{ match: "estoy", coach: "Estoy is for feelings and places. Where you are from, what you're like and colors use ser." }],
          seconds: 40,
        },
        think: {
          q: "Which sentence tells what someone is like?",
          choices: ["Estoy cansado.", "Mi abuela es simpática.", "Estoy en el parque."],
          answer: 1,
          why: "Es simpática tells what Grandma is like, so it uses ser.",
          hints: [
            "Estoy cansado tells a feeling right now, so it uses estar.",
            "",
            "Estoy en el parque tells a place, so it uses estar.",
          ],
        },
        approaches: {
          analogy:
            "Ser is like a trading card for a person or thing. It lists what they are like and where they are from: facts that stay on the card.",
          example:
            "Meet Leo. Leo es alto. Leo es simpático. Leo es de Florida. Each sentence uses es because it tells what Leo is like or where he is from.",
          simpler: {
            q: "Soy is a form of ser. What does soy mean?",
            choices: ["I am", "you are"],
            answer: 0,
            why: "Soy means I am, like soy alto, I am tall.",
            hints: ["", "You are is eres. Soy is about yourself."],
          },
        },
      },
      {
        title: "Estar: How You Feel",
        teach:
          "Estar (es-TAR) is the to be for how someone feels right now. Feelings change during the day, so they use estar. Here are its forms. Estoy (es-TOY) means I am. Estás (es-TAHS) means you are. Está (es-TAH) means he, she or it is. Estoy cansado (kahn-SAH-doh). I am tired. Estoy contento (kohn-TEN-toh). I am happy right now. Mi hermana está triste. My sister is sad. You already know a famous question that uses estar: ¿Cómo estás? How are you? It asks how you feel today. So you answer with estoy: Estoy bien, gracias.",
        visual: {
          type: "flip",
          cards: [
            { front: "estoy 🙋", back: "I am (estar). Estoy cansado: I am tired." },
            { front: "estás 🫵", back: "you are (estar). ¿Cómo estás? How are you?" },
            { front: "está 👉", back: "he, she or it is (estar). Está triste: is sad." },
            { front: "contento 😄", back: "happy right now. Say: kohn-TEN-toh." },
            { front: "cansado 😴", back: "tired. Say: kahn-SAH-doh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each estar sentence to its meaning.",
          pairs: [
            { left: "Estoy cansado.", right: "I am tired. 😴" },
            { left: "¿Cómo estás?", right: "How are you? ❓" },
            { left: "Mi hermana está triste.", right: "My sister is sad. 😢" },
            { left: "Estoy contento.", right: "I am happy right now. 😄" },
          ],
          hint: "Cansado is tired, triste is sad and contento is happy. ¿Cómo estás? is a question.",
          mistakes: [{ match: "Mixed up contento and cansado", coach: "Cansado is tired, like after a long hike. Contento is happy." }],
          seconds: 40,
        },
        think: {
          q: "Why does Estoy cansado use estar?",
          choices: ["It tells where you are from", "It tells a feeling right now", "It tells what color something is"],
          answer: 1,
          why: "Cansado is a feeling that changes, so it uses estar.",
          hints: [
            "Where you are from uses ser: soy de. Cansado is a feeling.",
            "",
            "Colors are what something is like, so they use ser. Cansado is a feeling.",
          ],
        },
        approaches: {
          analogy:
            "Estar is like a weather report for a person. Today you might be cansado, tomorrow contento. The report changes, so it uses estar.",
          example:
            "In the morning Sofía says, Estoy cansada. After breakfast she says, Estoy contenta. Her feelings changed, and both sentences use estar.",
          simpler: {
            q: "Your friend asks ¿Cómo estás? Which word starts your answer?",
            choices: ["Soy", "Estoy"],
            answer: 1,
            why: "¿Cómo estás? uses estar, so you answer with estoy: Estoy bien.",
            hints: ["Soy goes with what you are like. ¿Cómo estás? asks how you feel.", ""],
          },
        },
      },
      {
        title: "Estar: Where Things Are",
        teach:
          "Estar has one more big job: it tells where something is. El libro está en la mesa. The book is on the table. La biblioteca está al lado del parque. The library is next to the park. ¿Dónde está el museo? Where is the museum? Here is a rhyme to remember both jobs: how you feel and where you are, that is when you use estar. Now watch one sentence change. Mi papá es alto tells what Dad is like. Mi papá está cansado tells how he feels. Mi papá está en la cocina tells where he is.",
        visual: {
          type: "compare",
          left: { title: "Ser 🪪", points: ["What someone is like: es alto", "Where someone is from: soy de Ohio", "Forms: soy, eres, es"] },
          right: { title: "Estar 📍", points: ["How you feel: estoy cansado", "Where you are: está en la cocina", "Forms: estoy, estás, está"] },
        },
        probe: {
          type: "build",
          prompt: "Build the sentence: The cat is on the table. 🐈",
          tiles: ["El", "gato", "está", "en", "la", "mesa"],
          distractors: ["es", "soy"],
          hint: "Where something is uses estar. One cat uses está.",
          mistakes: [
            { match: "es", coach: "Es is ser. A place uses estar: el gato está en la mesa." },
            { match: "soy", coach: "Soy means I am. The cat is is está." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which sentence is right for The bank is next to the market?",
          choices: ["El banco es al lado del mercado.", "El banco soy al lado del mercado.", "El banco está al lado del mercado."],
          answer: 2,
          why: "It tells where the bank is, so it uses estar: está.",
          hints: [
            "Es is ser. Where something is uses estar.",
            "Soy means I am, and the bank isn't me. Also, places use estar.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Estar is like the pin on a map app. It shows where something is right now, and the pin can move.",
          example:
            "Where is Mom? Mamá está en el jardín. Where is my backpack? Mi mochila está en mi cuarto. Both tell a place, so both use está.",
          simpler: {
            q: "La pelota está en el parque. What does this sentence tell?",
            choices: ["Where the ball is", "What color the ball is"],
            answer: 0,
            why: "En el parque is a place, so it tells where the ball is, using estar.",
            hints: ["", "There is no color word. En el parque is a place."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which verb fits the blank? Sort each sentence into ser or estar.",
      buckets: ["Ser (what it's like, where from) 🪪", "Estar (feeling or place) 📍"],
      items: [
        { text: "Mi hermana ___ alta.", bucket: 0 },
        { text: "Yo ___ de Texas.", bucket: 0 },
        { text: "Mi perro ___ grande.", bucket: 0 },
        { text: "Yo ___ cansado hoy.", bucket: 1 },
        { text: "El museo ___ al lado del banco.", bucket: 1 },
        { text: "Mamá ___ en la cocina.", bucket: 1 },
        { text: "Mi amigo ___ triste hoy.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain to Señora Luz the difference between ser and estar. When do you use each one? Give an example of each.",
      keyPoints: [
        "Both ser and estar mean to be",
        "Ser tells what someone or something is like",
        "Ser tells where someone is from",
        "Estar tells how someone feels",
        "Estar tells where something is",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Hola, {0} Ana. Soy de Chile. Hoy {1} contenta. Mi casa {2} cerca del parque.",
        blanks: [{ answers: ["soy"] }, { answers: ["estoy"] }, { answers: ["está"] }],
        bank: ["soy", "estoy", "está", "eres"],
        hint: "Who you are uses ser. A feeling today uses estar. Where the house is uses estar.",
        mistakes: [{ match: "eres", coach: "Eres means you are. Ana is talking about herself and her house." }],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that tells how someone feels or where something is.",
        sentences: [
          "Estoy cansado.",
          "Soy de Ohio.",
          "El libro está en la mesa.",
          "Mi papá es alto.",
          "Mi hermana está triste.",
        ],
        correct: [0, 2, 4],
        hint: "Feelings and places use estar. Look for estoy and está.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each sentence to the job its verb is doing.",
        pairs: [
          { left: "Mi perro es grande.", right: "What it's like (ser)" },
          { left: "Soy de Florida.", right: "Where someone is from (ser)" },
          { left: "Estoy contento.", right: "A feeling (estar)" },
          { left: "El parque está lejos.", right: "Where something is (estar)" },
        ],
        hint: "Es and soy are ser. Estoy and está are estar. Then look at the rest of the sentence.",
        seconds: 45,
      },
      {
        type: "build",
        prompt: "Build the sentence: I am tired today. 😴",
        tiles: ["Hoy", "estoy", "cansado"],
        distractors: ["soy", "es"],
        also: [["estoy", "cansado", "Hoy"]],
        hint: "Tired is a feeling, so use estar: estoy.",
        mistakes: [
          { match: "soy", coach: "Soy is ser. Being tired is a feeling, so use estoy." },
          { match: "es", coach: "Es means he, she or it is. About yourself, a feeling: estoy." },
        ],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which verb do you use for how you feel?",
        choices: ["ser", "estar", "tener"],
        answer: 1,
        why: "How you feel and where you are, that is when you use estar.",
      },
      {
        q: "Which sentence is correct?",
        choices: ["Estoy de Ohio.", "Soy cansado.", "Soy de Ohio."],
        answer: 2,
        why: "Where you are from uses ser: soy de Ohio. Tired would use estar: estoy cansado.",
      },
      {
        q: "La biblioteca ___ al lado del parque.",
        choices: ["está", "es", "soy"],
        answer: 0,
        why: "It tells where the library is, so it uses estar: está.",
      },
      {
        q: "Mi abuelo ___ simpático. Which word fits?",
        choices: ["estoy", "es", "estás"],
        answer: 1,
        why: "Simpático tells what Grandpa is like, so it uses ser: es.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Make a Ser and Estar poster about your family with a parent. For each person, write one ser sentence (what they are like) and one estar sentence (how they feel today or where they are). Read it aloud in Spanish.",
      rubric: [
        "Writes at least three ser sentences that describe what someone is like or where they are from",
        "Writes at least three estar sentences about feelings or places",
        "Uses the right forms (soy, es, estoy, está)",
        "Reads the poster aloud in Spanish",
      ],
    },
  },

  // 6. Argentina, Chile and Peru
  {
    id: "span-4.andes",
    title: "Los Andes: Argentina, Chile y Perú",
    minutes: 35,
    stage: "rhetoric",
    standards: ["SPAN.4.9", "SPAN.4.10", "SPAN.4.12"],
    read: [
      "¡Vamos a viajar! Let's travel to South America. Three Spanish-speaking countries sit along the mighty Andes Mountains: Perú (peh-ROO), Chile (CHEE-leh) and Argentina (ar-hen-TEE-nah).",
      "Los Andes (lohs AHN-des) are the longest mountain range on land in the world. They stretch about 4,300 miles down the west side of South America. The highest peak, Aconcagua (ah-kohn-KAH-gwah), is in Argentina. It is almost 23,000 feet tall, the highest mountain in all of the Americas. Llamas (YAH-mahs) and alpacas live high in the Andes, and people spin alpaca wool into warm sweaters and blankets.",
      "In Peru, high in the mountains, sits Machu Picchu (MAH-choo PEEK-choo). The Inca built this stone city in the 1400s. They cut the stones so carefully that many walls fit together without any mortar. Farmers grew crops on terraces, flat steps cut into the mountainsides. Potatoes were first grown in the Andes, and Peru has thousands of kinds. A favorite dish is ceviche (seh-VEE-cheh), fresh fish soaked in lime juice. The capital of Peru is Lima.",
      "Chile is long and narrow, like a ribbon between the Andes and the Pacific Ocean. In the north is the Atacama Desert, one of the driest places on Earth. Chileans love empanadas de pino (em-pah-NAH-dahs deh PEE-noh), baked pastries filled with beef, onion, egg and olives. The capital is Santiago.",
      "In Argentina, las pampas (PAHM-pahs) are wide, flat grasslands. Gauchos (GOW-chohs), the cowboys of Argentina, ride horses and herd cattle there. Families gather for an asado (ah-SAH-doh), a big barbecue, and love dulce de leche (DOOL-seh deh LEH-cheh), a sweet caramel spread. The capital is Buenos Aires.",
      "Notice what you share. Gauchos and American cowboys both ride the open plains, and an asado is a lot like a backyard cookout.",
    ].join("\n\n"),
    keyIdeas: [
      "The Andes are the longest mountain range on land, running down the west side of South America.",
      "Machu Picchu is a stone city the Inca built in Peru in the 1400s.",
      "Chile is long and narrow with the very dry Atacama Desert; Argentina has the pampas and gauchos.",
      "Foods: ceviche in Peru, empanadas de pino in Chile, asado and dulce de leche in Argentina.",
    ],
    hook: {
      text: "Pip finds an old map carved into the canyon wall. It shows a giant line of mountains running down a whole continent! Next to it are three names: Perú, Chile y Argentina. Today we travel there to see stone cities in the clouds, a desert where it almost never rains, and cowboys on the grasslands.",
    },
    teach: [
      {
        title: "Los Andes",
        teach:
          "Los Andes (lohs AHN-des) are the longest mountain range on land in the world. They stretch about 4,300 miles down the west side of South America, through seven countries, including Perú (peh-ROO), Chile (CHEE-leh) and Argentina (ar-hen-TEE-nah). The highest peak is Aconcagua (ah-kohn-KAH-gwah), in Argentina. It is almost 23,000 feet tall, the highest mountain in all of the Americas. High in the Andes the air is thin and cold. Llamas (YAH-mahs) and alpacas live there. Llamas carry loads, and people spin soft alpaca wool into warm sweaters and blankets. In Spanish, a mountain is una montaña (mohn-TAH-nyah).",
        visual: {
          type: "hotspots",
          title: "Along the Andes",
          center: "🏔️ Los Andes",
          spots: [
            { label: "Perú", icon: "🇵🇪", detail: "In the north. Home of Machu Picchu. Capital: Lima." },
            { label: "Chile", icon: "🇨🇱", detail: "A long, narrow country between the Andes and the Pacific. Capital: Santiago." },
            { label: "Argentina", icon: "🇦🇷", detail: "To the east of the Andes, with wide grasslands. Capital: Buenos Aires." },
            { label: "Aconcagua", icon: "⛰️", detail: "The highest mountain in the Americas, almost 23,000 feet, in Argentina." },
            { label: "Llamas y alpacas", icon: "🦙", detail: "Animals of the high Andes. Alpaca wool makes warm sweaters." },
          ],
        },
        probe: {
          type: "cloze",
          text: "The Andes run down the {0} side of South America. The highest peak, {1}, is in Argentina. {2} and alpacas live high in the mountains.",
          blanks: [{ answers: ["west"] }, { answers: ["Aconcagua"] }, { answers: ["Llamas"] }],
          bank: ["west", "east", "Aconcagua", "Everest", "Llamas", "Camels"],
          hint: "The Andes run along the Pacific side. The highest peak in the Americas has a Spanish-sounding name. The animals are related to alpacas.",
          mistakes: [
            { match: "east", coach: "The Andes run along the west side, next to the Pacific Ocean." },
            { match: "Everest", coach: "Mount Everest is in Asia. The highest peak in the Andes is Aconcagua." },
            { match: "Camels", coach: "Camels live in deserts in Africa and Asia. In the Andes there are llamas." },
          ],
          seconds: 40,
        },
        think: {
          q: "What are the Andes?",
          choices: ["A long river in Africa", "The longest mountain range on land", "A big desert in Mexico"],
          answer: 1,
          why: "The Andes are the longest mountain range on land, running down the west side of South America.",
          hints: [
            "The Andes are in South America, and they are mountains, not a river.",
            "",
            "The Andes are mountains in South America, not a desert in Mexico.",
          ],
        },
        approaches: {
          analogy:
            "The Andes are like the backbone of South America: one long line of mountains running from the top of the continent almost to the bottom.",
          example:
            "If you walked the whole Andes, you would start near the Caribbean Sea, pass through Peru, then walk along Chile and Argentina, about 4,300 miles in all.",
          simpler: {
            q: "What is una montaña?",
            choices: ["a mountain", "a river"],
            answer: 0,
            why: "Una montaña is a mountain, like the mountains of the Andes.",
            hints: ["", "A river is un río. Montaña sounds like mountain."],
          },
        },
      },
      {
        title: "Perú and Machu Picchu",
        teach:
          "High in the mountains of Peru sits Machu Picchu (MAH-choo PEEK-choo). The Inca built this stone city in the 1400s. The Inca were skilled builders. They cut stones so carefully that many walls fit together without any mortar, and they have stood for more than 500 years. Farmers grew crops on terraces, flat steps cut into the steep mountainsides. Potatoes, las papas, were first grown in the Andes, and Peru has thousands of kinds! A favorite food in Peru is ceviche (seh-VEE-cheh), fresh fish soaked in lime juice. The capital of Peru is Lima (LEE-mah), near the Pacific coast.",
        visual: {
          type: "flip",
          cards: [
            { front: "Machu Picchu 🏯", back: "A stone city the Inca built high in the Andes in the 1400s." },
            { front: "terraces 🪜", back: "Flat steps cut into mountainsides for farming." },
            { front: "las papas 🥔", back: "Potatoes, first grown in the Andes. Peru has thousands of kinds." },
            { front: "el ceviche 🐟🍋", back: "Fresh fish soaked in lime juice. Say: seh-VEE-cheh." },
            { front: "Lima 🏙️", back: "The capital of Peru. Say: LEE-mah." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each word from Peru to what it is.",
          pairs: [
            { left: "Machu Picchu", right: "A stone city built by the Inca" },
            { left: "el ceviche", right: "Fish soaked in lime juice" },
            { left: "las papas", right: "Potatoes, first grown in the Andes" },
            { left: "Lima", right: "The capital of Peru" },
          ],
          hint: "Ceviche is a food made with fish. Papas are potatoes. Lima is a city.",
          mistakes: [{ match: "Mixed up Lima and Machu Picchu", coach: "Lima is the capital city by the coast. Machu Picchu is the old Inca city in the mountains." }],
          seconds: 45,
        },
        think: {
          q: "Who built Machu Picchu?",
          choices: ["The Inca", "The gauchos", "The ancient Romans"],
          answer: 0,
          why: "The Inca built Machu Picchu in the 1400s, high in the Andes of Peru.",
          hints: [
            "",
            "Gauchos are cowboys of Argentina's grasslands, not builders of Machu Picchu.",
            "The Romans lived in Europe. Machu Picchu was built in South America.",
          ],
        },
        approaches: {
          analogy:
            "Inca stonework is like a perfect jigsaw puzzle made of rock. Each stone was shaped to fit its neighbors so tightly that the wall holds together without glue.",
          example:
            "Imagine a farmer at Machu Picchu. The mountain is steep, so he plants potatoes on a terrace, a flat step. Water drains down step by step instead of washing the soil away.",
          simpler: {
            q: "Where is Machu Picchu?",
            choices: ["In the mountains of Peru", "On a beach in Chile"],
            answer: 0,
            why: "Machu Picchu sits high in the Andes Mountains of Peru.",
            hints: ["", "Machu Picchu is high in the mountains, and it is in Peru."],
          },
        },
      },
      {
        title: "Chile y Argentina",
        teach:
          "Chile is long and narrow, like a ribbon between the Andes and the Pacific Ocean. In the north is the Atacama (ah-tah-KAH-mah) Desert, one of the driest places on Earth. Some spots there almost never get rain! Chileans love empanadas de pino (em-pah-NAH-dahs deh PEE-noh), baked pastries filled with beef, onion, egg and olives. The capital is Santiago. Next door, Argentina has las pampas (PAHM-pahs), wide, flat grasslands. Gauchos (GOW-chohs), the cowboys of Argentina, ride horses and herd cattle there. Families gather for an asado (ah-SAH-doh), a big barbecue, and love dulce de leche (DOOL-seh deh LEH-cheh), a sweet caramel spread. The capital is Buenos Aires.",
        visual: {
          type: "compare",
          left: { title: "Chile 🇨🇱", points: ["Long and narrow", "Atacama Desert, very dry", "Empanadas de pino", "Capital: Santiago"] },
          right: { title: "Argentina 🇦🇷", points: ["Las pampas, wide grasslands", "Gauchos herd cattle", "Asado and dulce de leche", "Capital: Buenos Aires"] },
        },
        probe: {
          type: "sort",
          prompt: "Which country does each one belong to?",
          buckets: ["Perú 🇵🇪", "Chile 🇨🇱", "Argentina 🇦🇷"],
          items: [
            { text: "Machu Picchu", bucket: 0 },
            { text: "Lima", bucket: 0 },
            { text: "the Atacama Desert", bucket: 1 },
            { text: "Santiago", bucket: 1 },
            { text: "las pampas and gauchos", bucket: 2 },
            { text: "Buenos Aires", bucket: 2 },
          ],
          hint: "Machu Picchu and Lima are in Peru. The desert and Santiago are in Chile. The grasslands and Buenos Aires are in Argentina.",
          mistakes: [{ match: "Mixed up Santiago and Buenos Aires", coach: "Santiago is the capital of Chile. Buenos Aires is the capital of Argentina." }],
          seconds: 50,
        },
        think: {
          q: "What are las pampas?",
          choices: ["A very dry desert", "Mountain terraces", "Wide, flat grasslands in Argentina"],
          answer: 2,
          why: "Las pampas are wide, flat grasslands where gauchos herd cattle.",
          hints: [
            "The very dry desert is the Atacama, in Chile.",
            "Terraces are steps for farming in the mountains. Las pampas are flat.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Gauchos on the pampas are a lot like cowboys on the Great Plains. Both ride horses across wide grassy land and take care of cattle.",
          example:
            "A family in Argentina has an asado on Sunday. They grill beef outside, talk for hours, and finish with dulce de leche, a lot like a backyard cookout.",
          simpler: {
            q: "What is a gaucho?",
            choices: ["A cowboy of Argentina", "A kind of potato", "A desert animal"],
            answer: 0,
            why: "Gauchos are the cowboys of Argentina's pampas.",
            hints: ["", "Potatoes are papas. A gaucho rides a horse.", "A gaucho is a person who rides horses and herds cattle."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every sentence that is true.",
      sentences: [
        "The Andes run down the west side of South America.",
        "Machu Picchu was built by the Inca.",
        "The Atacama Desert is one of the rainiest places on Earth.",
        "Gauchos herd cattle on the pampas of Argentina.",
        "Potatoes were first grown in the Andes.",
        "Buenos Aires is the capital of Peru.",
      ],
      correct: [0, 1, 3, 4],
    },
    explain: {
      prompt: "Pretend you are a tour guide. Tell Señora Luz about the Andes and one special thing about each country: Peru, Chile and Argentina.",
      keyPoints: [
        "The Andes are the longest mountain range on land",
        "The Inca built Machu Picchu in Peru",
        "Chile is long and narrow and has the Atacama Desert",
        "Argentina has the pampas and gauchos",
        "Names a food, like ceviche, empanadas or asado",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each country to its capital city.",
        pairs: [
          { left: "Perú", right: "Lima" },
          { left: "Chile", right: "Santiago" },
          { left: "Argentina", right: "Buenos Aires" },
        ],
        hint: "Lima is in Peru, Santiago is in Chile, and Buenos Aires is in Argentina.",
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Sort the foods by country.",
        buckets: ["Perú 🇵🇪", "Chile 🇨🇱", "Argentina 🇦🇷"],
        items: [
          { text: "el ceviche 🐟", bucket: 0 },
          { text: "las empanadas de pino 🥟", bucket: 1 },
          { text: "el asado 🍖", bucket: 2 },
          { text: "el dulce de leche 🍮", bucket: 2 },
        ],
        hint: "Ceviche is from Peru, empanadas de pino from Chile, and asado and dulce de leche from Argentina.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Machu Picchu {0} en Perú. El Aconcagua {1} muy alto. Quisiera una {2}, por favor.",
        blanks: [{ answers: ["está"] }, { answers: ["es"] }, { answers: ["empanada"] }],
        bank: ["está", "es", "empanada", "soy", "cuenta"],
        hint: "Where a place is uses estar. What it is like uses ser. Then order something to eat with quisiera.",
        mistakes: [
          { match: "soy", coach: "Soy means I am. For a mountain, use es." },
          { match: "cuenta", coach: "La cuenta is the bill. Here you're ordering food." },
        ],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "At a market in Peru, a sweater made of alpaca wool costs ciento cincuenta soles (the sol is Peru's money). Type the price as a number.",
        answer: 150,
        unit: "soles",
        hint: "Ciento is 100 and cincuenta is 50.",
        mistakes: [
          { match: "50", coach: "Don't forget the ciento: that adds 100." },
          { match: "105", coach: "Cincuenta is 50, not 5. Try 100 + 50." },
        ],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which country is home to Machu Picchu?",
        choices: ["Chile", "Argentina", "Peru"],
        answer: 2,
        why: "Machu Picchu is high in the Andes of Peru.",
      },
      {
        q: "What makes Chile's shape special?",
        choices: ["It is long and narrow", "It is round", "It is an island"],
        answer: 0,
        why: "Chile is long and narrow, squeezed between the Andes and the Pacific Ocean.",
      },
      {
        q: "What is an asado?",
        choices: ["A desert", "A big barbecue", "A kind of llama"],
        answer: 1,
        why: "An asado is a big barbecue, a favorite family meal in Argentina.",
      },
      {
        q: "Which animals live high in the Andes?",
        choices: ["Llamas and alpacas", "Camels and lions", "Penguins and seals"],
        answer: 0,
        why: "Llamas and alpacas live high in the Andes. People use alpaca wool for warm clothes.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make a travel poster for Peru, Chile or Argentina. Draw the Andes, label at least three places or foods with their Spanish names, and add one sentence in Spanish, like Machu Picchu está en Perú. Then present it to your family as a tour guide.",
      rubric: [
        "Shows the Andes and the country on the poster",
        "Labels at least three places, animals or foods correctly",
        "Writes one Spanish sentence using es or está correctly",
        "Presents the poster and tells one fact about the country",
      ],
    },
  },
]);
