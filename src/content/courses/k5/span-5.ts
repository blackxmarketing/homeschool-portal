import { k5Course } from "./base";

/**
 * span-5: Grade 5 Spanish (an elective), ACTFL Novice High. Kids already know
 * the K-4 topics (greetings through directions, ser and estar, time, daily
 * routine, shopping). Grade 5 adds the simple past, plans with ir a, travel,
 * health, nature and a first look at Spain's history and landmarks.
 * Taught by Señora Luz in the Starpeak Frontier world, with Pip the firefly.
 */
export const span5 = k5Course("span", 5, [
  // 1. The simple past: what I did last weekend
  {
    id: "span-5.weekend",
    title: "El fin de semana: What I Did",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.5.1", "SPAN.5.2", "SPAN.5.4", "SPAN.5.11", "SPAN.5.13"],
    read: [
      "¡Hola, exploradores! Today you will learn to tell what you already did. In Spanish, the end of a verb changes to show when something happened.",
      "Start with -ar verbs, like hablar (ah-BLAR), to talk. Drop the -ar. For I, add -é: hablé (ah-BLEH), I talked. For he or she, add -ó: habló (ah-BLOH), he or she talked. Caminar becomes caminé, I walked. Nadar becomes nadé, I swam. Visitar becomes visité, I visited.",
      "The accent mark matters! Hablo means I talk, now or every day. Habló, with the accent on the end, means he or she talked. One little mark changes the time.",
      "Verbs that end in -er and -ir share the same past endings. For I, add -í. For he or she, add -ió. Comer (koh-MER) becomes comí (koh-MEE), I ate, and comió, he or she ate. Correr becomes corrí, I ran. Vivir becomes viví, I lived. Escribir (es-kree-BEER) becomes escribí, I wrote.",
      "The verb ir, to go, is special. I went is fui (FWEE). He or she went is fue (FWEH). Fui al parque means I went to the park.",
      "To ask a friend about the weekend, say ¿Qué hiciste el fin de semana? (keh ee-SEES-teh el feen deh seh-MAH-nah). It means what did you do on the weekend? Answer with a day and some past verbs: El sábado fui al cine y comí palomitas (pah-loh-MEE-tahs), popcorn. El domingo caminé con mi perro. Use ayer (ah-YER) for yesterday.",
      "Now you can tell a whole story about your weekend!",
    ].join("\n\n"),
    keyIdeas: [
      "For -ar verbs in the past, I ends in -é (hablé) and he or she ends in -ó (habló).",
      "For -er and -ir verbs in the past, I ends in -í (comí) and he or she ends in -ió (comió).",
      "Fui means I went and fue means he or she went.",
      "¿Qué hiciste el fin de semana? asks what someone did on the weekend.",
    ],
    hook: {
      text: "Pip the firefly zips over with a letter. ✨ It is from a pen pal in México. It says: ¡Hola! El sábado fui a la montaña. ¿Qué hiciste tú? Pip wants to answer, but Pip only knows how to talk about today. Let's learn to talk about the past! 📬",
    },
    teach: [
      {
        title: "-ar Verbs in the Past",
        teach:
          "When you tell what you already did, Spanish changes the end of the verb. 🕰️ Start with -ar verbs, like hablar (ah-BLAR), to talk. Drop the -ar. For I, add -é: hablé (ah-BLEH), I talked. For he or she, add -ó: habló (ah-BLOH), he or she talked. Caminar (kah-mee-NAR) becomes caminé, I walked. Nadar (nah-DAR) becomes nadé, I swam. Visitar becomes visité, I visited. Watch the accent mark! Hablo means I talk. Habló, with the accent, means he or she talked. One little mark changes the time.",
        visual: {
          type: "flip",
          cards: [
            { front: "hablar ➡️ hablé 🗣️", back: "I talked. Say: ah-BLEH." },
            { front: "caminar ➡️ caminé 🚶", back: "I walked. Say: kah-mee-NEH." },
            { front: "nadar ➡️ nadé 🏊", back: "I swam. Say: nah-DEH." },
            { front: "visitar ➡️ visitó 🏠", back: "He or she visited. Say: vee-see-TOH." },
            { front: "hablo or habló? ⚠️", back: "Hablo is I talk. Habló is he or she talked." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Ayer yo {0} con mi abuela. 🗣️ (hablar) El sábado yo {1} en el lago. 🏊 (nadar) Mi hermano {2} a nuestros primos. 🏠 (visitar)",
          blanks: [{ answers: ["hablé"] }, { answers: ["nadé"] }, { answers: ["visitó"] }],
          bank: ["hablé", "nadé", "visitó", "hablo", "nado", "visité"],
          hint: "Yo in the past ends in -é. Mi hermano is he, so his verb ends in -ó.",
          mistakes: [
            { match: "hablo", coach: "Hablo means I talk right now. Ayer means yesterday, so use the past: hablé." },
            { match: "nado", coach: "Nado means I swim now. For the past, drop -ar and add -é: nadé." },
            { match: "visité", coach: "Visité means I visited. Mi hermano is he, so use the -ó ending: visitó." },
          ],
          seconds: 45,
        },
        think: {
          q: "What does caminé mean?",
          choices: ["I walk every day", "I walked", "He walked"],
          answer: 1,
          why: "Caminé ends in -é, the past ending for I, so it means I walked.",
          hints: [
            "I walk every day is camino, with -o. Caminé has the past ending -é.",
            "",
            "He walked is caminó, with -ó. The -é ending is for I.",
          ],
        },
        approaches: {
          analogy:
            "The end of a Spanish verb is like the hands on a clock. Change -o to -é and you turn the clock back to yesterday.",
          example:
            "Ana went to the park on Saturday. She says: El sábado caminé en el parque y nadé en la piscina. Caminé and nadé both end in -é, so she means I walked and I swam.",
          simpler: {
            q: "Which word tells about the past?",
            choices: ["hablé", "hablo"],
            answer: 0,
            why: "Hablé ends in -é, the past ending, so it means I talked.",
            hints: ["", "Hablo ends in -o. That means I talk, right now or every day."],
          },
        },
      },
      {
        title: "-er and -ir Verbs in the Past",
        teach:
          "Good news! Verbs that end in -er and -ir share the same past endings. 🎉 Drop the -er or -ir. For I, add -í. For he or she, add -ió. Comer (koh-MER), to eat, becomes comí (koh-MEE), I ate, and comió (koh-mee-OH), he or she ate. Beber becomes bebí, I drank. Correr becomes corrí, I ran. Vivir becomes viví, I lived. Escribir (es-kree-BEER) becomes escribí, I wrote. So remember two pairs. The -ar verbs take -é and -ó. The -er and -ir verbs take -í and -ió.",
        visual: {
          type: "flip",
          cards: [
            { front: "comer ➡️ comí 🍕", back: "I ate. Say: koh-MEE." },
            { front: "comer ➡️ comió 🍎", back: "He or she ate. Say: koh-mee-OH." },
            { front: "correr ➡️ corrí 🏃", back: "I ran. Say: koh-RREE." },
            { front: "escribir ➡️ escribí ✍️", back: "I wrote. Say: es-kree-BEE." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Who did it? Sort each past verb.",
          buckets: ["I did it (yo) 🙋", "He or she did it (él, ella) 👤"],
          items: [
            { text: "comí", bucket: 0 },
            { text: "corrí", bucket: 0 },
            { text: "escribí", bucket: 0 },
            { text: "nadé", bucket: 0 },
            { text: "comió", bucket: 1 },
            { text: "escribió", bucket: 1 },
            { text: "caminó", bucket: 1 },
            { text: "bebió", bucket: 1 },
          ],
          hint: "Look at the very end. -é and -í are for I. -ó and -ió are for he or she.",
          mistakes: [
            { match: "nadé", coach: "Nadé ends in -é. That is the I ending for -ar verbs: I swam." },
            { match: "caminó", coach: "Caminó ends in -ó. That is the he or she ending: he walked." },
          ],
          seconds: 40,
        },
        think: {
          q: "How do you say I ate?",
          choices: ["comí", "comió", "como"],
          answer: 0,
          why: "Comer is an -er verb, so I ate ends in -í: comí.",
          hints: [
            "",
            "Comió ends in -ió. That means he or she ate.",
            "Como means I eat, now or every day. Ate is the past.",
          ],
        },
        approaches: {
          analogy:
            "Think of -er and -ir verbs as twins who wear the same outfit. In the past they both wear -í for I and -ió for he or she.",
          example:
            "Leo had a busy Sunday. Comí pancakes. Corrí en el parque. Escribí una carta. He ate, he ran and he wrote, and every verb ends in -í because Leo is talking about himself.",
          simpler: {
            q: "For -er and -ir verbs, which ending means I in the past?",
            choices: ["-ió", "-í"],
            answer: 1,
            why: "The -í ending means I: comí, corrí, escribí.",
            hints: ["The -ió ending is for he or she, like comió.", ""],
          },
        },
      },
      {
        title: "Fui and ¿Qué hiciste?",
        teach:
          "The verb ir, to go, is special. In the past it does not follow the rules. I went is fui (FWEE). He or she went is fue (FWEH). Fui al parque means I went to the park. Fui a la playa means I went to the beach. 🏖️ To ask about a friend's weekend, say ¿Qué hiciste el fin de semana? (keh ee-SEES-teh el feen deh seh-MAH-nah). It means what did you do on the weekend? Answer with a day and past verbs. El sábado fui al cine. Comí palomitas (pah-loh-MEE-tahs), popcorn. 🍿 El domingo caminé con mi perro. Add ayer (ah-YER) for yesterday.",
        visual: {
          type: "flip",
          cards: [
            { front: "fui 🙋➡️", back: "I went. Say: FWEE." },
            { front: "fue 👤➡️", back: "He or she went. Say: FWEH." },
            { front: "¿Qué hiciste el fin de semana? ❓", back: "What did you do on the weekend?" },
            { front: "ayer 📅", back: "yesterday. Say: ah-YER." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the sentence: I went to the beach. 🏖️",
          tiles: ["Fui", "a", "la", "playa"],
          distractors: ["Fue", "Voy", "al"],
          hint: "I went is fui. To the beach is a la playa.",
          mistakes: [
            { match: "Fue", coach: "Fue means he or she went. For I went, use fui." },
            { match: "Voy", coach: "Voy means I go. This sentence is about the past, so use fui." },
            { match: "al", coach: "Al is a + el. Playa is a la word, so say a la playa." },
          ],
          seconds: 30,
        },
        think: {
          q: "Your friend says: Fui al museo. What did your friend do?",
          choices: ["Will go to the museum", "Goes to the museum", "Went to the museum"],
          answer: 2,
          why: "Fui means I went, so fui al museo means I went to the museum.",
          hints: [
            "Plans use voy a. Fui is about the past.",
            "Goes is va. Fui is about something that already happened.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Fui is like a rule breaker in a line of students. Every other verb follows the endings, but ir just jumps to fui and fue.",
          example:
            "Your friend asks, ¿Qué hiciste el fin de semana? You answer: El sábado fui a la playa. Nadé en el mar. Comí un sándwich. That is three things you did!",
          simpler: {
            q: "What does fui mean?",
            choices: ["I went", "I eat", "I swim"],
            answer: 0,
            why: "Fui is the past of ir, to go. It means I went.",
            hints: ["", "I eat is como. Fui comes from ir, to go.", "I swim is nado. Fui comes from ir, to go."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Lucía tells about her weekend. Tap every sentence that tells what she DID (the past).",
      sentences: [
        "El sábado fui a la playa.",
        "Nadé en el mar.",
        "Me gusta mucho el mar.",
        "Comí un sándwich de queso.",
        "Hoy hablo con mi abuela.",
        "El domingo escribí una carta.",
      ],
      correct: [0, 1, 3, 5],
    },
    explain: {
      prompt: "Explain to Señora Luz how to change a Spanish verb to tell what you did. Use hablar, comer and ir as examples.",
      keyPoints: [
        "-ar verbs end in -é for I, like hablé",
        "-er and -ir verbs end in -í for I, like comí",
        "he or she ends in -ó or -ió, like habló and comió",
        "fui means I went",
        "the accent mark changes the time: hablo and habló",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each past verb to its meaning.",
        pairs: [
          { left: "hablé", right: "I talked 🗣️" },
          { left: "comió", right: "She ate 🍎" },
          { left: "fui", right: "I went 🚶" },
          { left: "escribí", right: "I wrote ✍️" },
          { left: "corrió", right: "He ran 🏃" },
        ],
        hint: "-é and -í are for I. -ó and -ió are for he or she. Fui is I went.",
        mistakes: [{ match: "Mixed up comió and corrió", coach: "Comió comes from comer, to eat. Corrió comes from correr, to run." }],
        seconds: 45,
      },
      {
        type: "cloze",
        text: "El domingo yo {0} pizza. 🍕 (comer) Después, yo {1} con mi perro. 🐕 (caminar) Mi papá {2} una carta. ✉️ (escribir)",
        blanks: [{ answers: ["comí"] }, { answers: ["caminé"] }, { answers: ["escribió"] }],
        bank: ["comí", "caminé", "escribió", "como", "camino", "escribí"],
        hint: "Yo in the past: -é for -ar verbs, -í for -er verbs. Mi papá is he: -ió for -ir verbs.",
        mistakes: [
          { match: "como", coach: "Como is I eat now. El domingo already happened: comí." },
          { match: "camino", coach: "Camino is I walk now. For the past, use caminé." },
          { match: "escribí", coach: "Escribí means I wrote. Mi papá is he, so use escribió." },
        ],
        seconds: 45,
      },
      {
        type: "build",
        prompt: "Build the question: What did you do on the weekend?",
        tiles: ["¿Qué", "hiciste", "el", "fin", "de", "semana?"],
        distractors: ["fui", "vas"],
        hint: "Start with ¿Qué hiciste, what did you do. Then el fin de semana, the weekend.",
        mistakes: [
          { match: "fui", coach: "Fui means I went. It answers the question, it doesn't ask it." },
          { match: "vas", coach: "Vas is for plans. Hiciste asks about the past." },
        ],
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Did it already happen, or is it happening now?",
        buckets: ["Already happened ⏪", "Now or every day ▶️"],
        items: [
          { text: "hablé", bucket: 0 },
          { text: "comí", bucket: 0 },
          { text: "viví", bucket: 0 },
          { text: "nadé", bucket: 0 },
          { text: "hablo", bucket: 1 },
          { text: "como", bucket: 1 },
          { text: "vivo", bucket: 1 },
          { text: "nado", bucket: 1 },
        ],
        hint: "Words for I that end in -o are now. Words that end in -é or -í are the past.",
        mistakes: [{ match: "hablo", coach: "Hablo ends in -o with no accent, so it means I talk now." }],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Lucía says: El sábado nadé, comí tacos, fui al cine y escribí una carta. How many things did she do? Type the number.",
        answer: 4,
        hint: "Count each past verb: nadé, comí, fui, escribí.",
        mistakes: [{ match: "3", coach: "Count again. Fui is a past verb too: she went to the movies." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does nadé mean?",
        choices: ["I swim", "I swam", "He swam"],
        answer: 1,
        why: "Nadé ends in -é, the past ending for I. It means I swam.",
      },
      {
        q: "How do you say I wrote?",
        choices: ["escribo", "escribió", "escribí"],
        answer: 2,
        why: "Escribir is an -ir verb, so I wrote ends in -í: escribí.",
      },
      {
        q: "What does ¿Qué hiciste el fin de semana? mean?",
        choices: ["What did you do on the weekend?", "Where do you live?", "What are you going to do?"],
        answer: 0,
        why: "Hiciste is the past of hacer, so it asks what you did on the weekend.",
      },
      {
        q: "Which sentence means he talked?",
        choices: ["Hablo.", "Hablé.", "Habló."],
        answer: 2,
        why: "Habló, with the accent on -ó, means he or she talked.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "At dinner, tell your family about your last weekend in Spanish. Say at least four sentences with past verbs, like El sábado fui al parque. Then ask a parent ¿Qué hiciste el fin de semana? and listen to the answer.",
      rubric: [
        "Says at least four sentences about the weekend",
        "Uses past verbs with the right endings, like nadé or comí",
        "Uses fui to say where they went",
        "Asks ¿Qué hiciste el fin de semana?",
      ],
    },
  },

  // 2. The near future: ir a + a verb
  {
    id: "span-5.plans",
    title: "Voy a...: Making Plans",
    minutes: 30,
    stage: "logic",
    standards: ["SPAN.5.2", "SPAN.5.3", "SPAN.5.4", "SPAN.5.11", "SPAN.5.13"],
    read: [
      "You can tell what you did. Now let's tell what you are going to do! Good planners say what they will do and when.",
      "In Spanish, plans use the verb ir, to go. Yo voy (VOY) means I go. Then add a and a whole verb: voy a nadar means I am going to swim. Voy a comer means I am going to eat. The second verb stays whole, with -ar, -er or -ir on the end. That whole verb is called the infinitive. Never change it! Voy a nado is wrong. Voy a nadar is right.",
      "Ir changes with the person. Yo voy, I go. Tú vas (VAHS), you go. Él or ella va (VAH), he or she goes. Nosotros vamos (VAH-mohs), we go. Ellos van (VAHN), they go. Mi hermana va a bailar means my sister is going to dance. Nosotros vamos a cocinar means we are going to cook.",
      "To ask a friend about plans, say ¿Qué vas a hacer? (keh VAHS ah ah-SER). It means what are you going to do?",
      "Time words make plans clear. Mañana (mah-NYAH-nah) means tomorrow. Esta noche (NOH-cheh) means tonight. El próximo sábado (PROK-see-moh) means next Saturday. Este verano (beh-RAH-noh) means this summer.",
      "Now compare the past and the future. Ayer fui al parque. Yesterday I went to the park. Mañana voy a ir al museo. Tomorrow I am going to go to the museum. Past verbs change their endings. Plans keep the verb whole after voy a.",
    ].join("\n\n"),
    keyIdeas: [
      "Voy a and a whole verb means I am going to: voy a nadar.",
      "Ir changes with the person: voy, vas, va, vamos, van.",
      "Time words like mañana, esta noche and el próximo sábado tell when.",
      "¿Qué vas a hacer? asks what someone is going to do.",
    ],
    hook: {
      text: "Pip has big news! ✨ The Starpeak Fort is having a fiesta next Saturday. 🎉 Pip wants to tell everyone the plans in Spanish: games, food and music under the stars. How do you talk about things that haven't happened yet? Let's find out!",
    },
    teach: [
      {
        title: "Voy a + a Verb",
        teach:
          "To tell what you are going to do, use voy a (VOY ah) and then a verb. 🗓️ Voy a means I am going to. Keep the verb whole, the way it looks in the dictionary, with -ar, -er or -ir on the end. That whole verb is called the infinitive. Voy a nadar. I am going to swim. Voy a comer. I am going to eat. Voy a escribir. I am going to write. Voy a leer (leh-ER). I am going to read. Don't change the second verb at all! Voy a nado is wrong. Voy a nadar is right.",
        visual: {
          type: "flip",
          cards: [
            { front: "voy a ... 🗓️", back: "I am going to ... Say: VOY ah." },
            { front: "Voy a nadar. 🏊", back: "I am going to swim." },
            { front: "Voy a comer. 🍽️", back: "I am going to eat." },
            { front: "Voy a leer. 📖", back: "I am going to read. Say: leh-ER." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the sentence: I am going to read a book. 📖",
          tiles: ["Voy", "a", "leer", "un", "libro"],
          distractors: ["leí", "leo"],
          hint: "Start with voy a. Then use the whole verb, leer, and then un libro.",
          mistakes: [
            { match: "leí", coach: "Leí means I read in the past. After voy a, keep the verb whole: leer." },
            { match: "leo", coach: "Leo means I read now. After voy a, keep the verb whole: leer." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which sentence means I am going to eat?",
          choices: ["Voy a como.", "Voy a comer.", "Comí."],
          answer: 1,
          why: "After voy a, the verb stays whole: comer.",
          hints: [
            "Como is changed. After voy a, keep the whole verb: comer.",
            "",
            "Comí means I ate. That is the past, not a plan.",
          ],
        },
        approaches: {
          analogy:
            "Voy a is like a train engine, and the whole verb is the car it pulls. The engine does the work, so the car never changes.",
          example:
            "It is Friday. Sam says: Mañana voy a nadar. Voy a comer pizza. Voy a leer un libro. Every plan starts with voy a and ends with a whole verb: nadar, comer, leer.",
          simpler: {
            q: "What does voy a mean?",
            choices: ["I went", "I am going to"],
            answer: 1,
            why: "Voy a starts a plan. It means I am going to.",
            hints: ["I went is fui. Voy a is for plans.", ""],
          },
        },
      },
      {
        title: "Voy, vas, va, vamos, van",
        teach:
          "Ir changes with the person. Yo voy, I go. Tú vas (VAHS), you go. Él or ella va (VAH), he or she goes. Nosotros vamos (VAH-mohs), we go. Ellos van (VAHN), they go. Add a and a whole verb to make plans for anyone. Mi hermana va a bailar. My sister is going to dance. 💃 Nosotros vamos a cocinar. We are going to cook. 🍳 To ask a friend, say ¿Qué vas a hacer? (keh VAHS ah ah-SER). It means what are you going to do? Your friend might answer, Voy a jugar al fútbol. ⚽",
        visual: {
          type: "flip",
          cards: [
            { front: "yo voy 🙋", back: "I go" },
            { front: "tú vas 👉", back: "you go" },
            { front: "él, ella va 👤", back: "he or she goes" },
            { front: "nosotros vamos 👫", back: "we go. Say: VAH-mohs." },
            { front: "ellos van 👥", back: "they go" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Yo {0} a nadar. 🏊 Tú {1} a leer. 📖 Mi papá {2} a cocinar. 🍳 Nosotros {3} a cantar. 🎤",
          blanks: [{ answers: ["voy"] }, { answers: ["vas"] }, { answers: ["va"] }, { answers: ["vamos"] }],
          bank: ["voy", "vas", "va", "vamos", "van", "fui"],
          hint: "Yo voy, tú vas, él va, nosotros vamos.",
          mistakes: [
            { match: "van", coach: "Van is for they. Check who is doing each plan." },
            { match: "fui", coach: "Fui means I went. Plans use voy, vas, va or vamos." },
          ],
          seconds: 45,
        },
        think: {
          q: "Nosotros ___ a jugar. Which word fits?",
          choices: ["vamos", "van", "voy"],
          answer: 0,
          why: "Nosotros means we, and we go is vamos.",
          hints: ["", "Van is for they. Nosotros means we.", "Voy is for I. Nosotros means we."],
        },
        approaches: {
          analogy:
            "Ir is like a jacket that changes size for each person: voy for me, vas for you, va for one other person, vamos for us and van for them.",
          example:
            "The family makes Saturday plans. Yo voy a leer. Mi mamá va a correr. Mis hermanos van a nadar. Y nosotros vamos a comer juntos. Every plan has a, then a whole verb.",
          simpler: {
            q: "Which word goes with tú?",
            choices: ["voy", "vas", "vamos"],
            answer: 1,
            why: "Tú vas means you go.",
            hints: ["Voy goes with yo, I.", "", "Vamos goes with nosotros, we."],
          },
        },
      },
      {
        title: "Yesterday, Today and Tomorrow",
        teach:
          "Time words help your listener. For plans, use mañana (mah-NYAH-nah), tomorrow. Use esta noche (NOH-cheh), tonight. Use el próximo sábado (PROK-see-moh), next Saturday, and este verano (beh-RAH-noh), this summer. Now compare the past and the future. Ayer fui al parque. Yesterday I went to the park. Mañana voy a ir al museo. Tomorrow I am going to go to the museum. Ayer comí tacos. Mañana voy a comer pasta. 🍝 Past verbs change their endings. Plans keep the verb whole after voy a. Good planners say when: Esta noche voy a estudiar.",
        visual: {
          type: "compare",
          left: { title: "The past ⏪", points: ["ayer: yesterday", "Ayer fui al parque.", "Ayer comí tacos.", "The verb ending changes."] },
          right: { title: "Plans ⏩", points: ["mañana: tomorrow", "Mañana voy a ir al museo.", "Mañana voy a comer pasta.", "Voy a and a whole verb."] },
        },
        probe: {
          type: "sort",
          prompt: "Did it already happen, or is it going to happen?",
          buckets: ["Already happened ⏪", "Going to happen ⏩"],
          items: [
            { text: "Ayer nadé.", bucket: 0 },
            { text: "Comí una manzana.", bucket: 0 },
            { text: "Fui al cine.", bucket: 0 },
            { text: "Mi abuelo escribió una carta.", bucket: 0 },
            { text: "Mañana voy a nadar.", bucket: 1 },
            { text: "Esta noche voy a leer.", bucket: 1 },
            { text: "El próximo sábado vamos a bailar.", bucket: 1 },
            { text: "Mis primos van a visitar.", bucket: 1 },
          ],
          hint: "Look for a form of ir plus a whole verb, like voy a nadar. Those are plans.",
          mistakes: [
            { match: "Fui al cine.", coach: "Fui means I went, so it already happened." },
            { match: "Mis primos van a visitar.", coach: "Van a visitar is ir a plus a whole verb, so it is a plan." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which word means tomorrow?",
          choices: ["ayer", "mañana", "noche"],
          answer: 1,
          why: "Mañana means tomorrow.",
          hints: ["Ayer means yesterday. That is the past.", "", "Noche means night, like esta noche, tonight."],
        },
        approaches: {
          analogy:
            "Think of time words as signposts on a road. Ayer points back behind you, and mañana points ahead to where you are going.",
          example:
            "Mia tells her week. Ayer fui a la escuela y hablé con mi maestra. Mañana voy a visitar a mi abuela. The first two verbs changed their endings. The plan uses voy a and visitar.",
          simpler: {
            q: "Which sentence is a plan?",
            choices: ["Ayer comí tacos.", "Mañana voy a comer pasta."],
            answer: 1,
            why: "Voy a comer is a plan: I am going to eat.",
            hints: ["Ayer and comí are about the past. This already happened.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Mateo planned his Saturday. Put his plans in order from morning to night.",
      steps: [
        "A las ocho voy a desayunar. 🥞",
        "A las diez voy a jugar al fútbol. ⚽",
        "A la una voy a comer con mi familia. 🍽️",
        "A las cuatro voy a visitar a mi abuela. 👵",
        "A las nueve voy a dormir. 😴",
      ],
    },
    explain: {
      prompt: "Explain to Señora Luz how to tell a plan in Spanish. How is a plan different from something you already did?",
      keyPoints: [
        "use voy a and a whole verb, like voy a nadar",
        "the second verb stays whole and does not change",
        "ir changes with the person: voy, vas, va, vamos, van",
        "time words like mañana tell when",
        "past verbs change their endings, like nadé",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each plan to its meaning.",
        pairs: [
          { left: "Voy a nadar.", right: "I am going to swim. 🏊" },
          { left: "Vas a leer.", right: "You are going to read. 📖" },
          { left: "Ella va a cantar.", right: "She is going to sing. 🎤" },
          { left: "Vamos a cocinar.", right: "We are going to cook. 🍳" },
          { left: "Van a correr.", right: "They are going to run. 🏃" },
        ],
        hint: "Voy is I, vas is you, va is he or she, vamos is we and van is they.",
        mistakes: [{ match: "Mixed up vamos and van", coach: "Vamos is we. Van is they." }],
        seconds: 45,
      },
      {
        type: "build",
        prompt: "Build the question: What are you going to do tomorrow?",
        tiles: ["¿Qué", "vas", "a", "hacer", "mañana?"],
        distractors: ["hiciste", "voy"],
        hint: "Start with ¿Qué vas a hacer, what are you going to do. End with mañana.",
        mistakes: [
          { match: "hiciste", coach: "Hiciste asks about the past. For plans, use vas a hacer." },
          { match: "voy", coach: "Voy is for I. You are asking a friend, so use vas." },
        ],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that is a plan for the future.",
        sentences: [
          "Mañana voy a montar en bicicleta.",
          "Ayer caminé al parque.",
          "Este verano vamos a viajar a México.",
          "Mi hermano comió una pera.",
          "Esta noche mis padres van a cocinar.",
          "Fui a la biblioteca.",
        ],
        correct: [0, 2, 4],
        hint: "Plans have voy, vas, va, vamos or van, then a, then a whole verb.",
        mistakes: [{ match: "Ayer caminé al parque.", coach: "Ayer and caminé tell about the past. It already happened." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Ayer yo {0} al parque. ⏪ Mañana yo voy a {1} al museo. ⏩ Esta {2} voy a estudiar. 🌙",
        blanks: [{ answers: ["fui"] }, { answers: ["ir"] }, { answers: ["noche"] }],
        bank: ["fui", "ir", "noche", "voy", "fue", "ayer"],
        hint: "Yesterday I went is fui. After voy a, keep the whole verb ir. Tonight is esta noche.",
        mistakes: [
          { match: "voy", coach: "Voy is now or for plans. Ayer is yesterday, so use fui." },
          { match: "fue", coach: "Fue means he or she went. For I, use fui." },
        ],
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What does voy a bailar mean?",
        choices: ["I danced", "I am going to dance", "She dances"],
        answer: 1,
        why: "Voy a and the whole verb bailar means I am going to dance.",
      },
      {
        q: "Which word goes with nosotros?",
        choices: ["van", "va", "vamos"],
        answer: 2,
        why: "Nosotros vamos means we go.",
      },
      {
        q: "Which sentence is a plan?",
        choices: ["Esta noche voy a leer.", "Ayer leí un libro.", "Fui a la playa."],
        answer: 0,
        why: "Voy a leer is a plan: I am going to read.",
      },
      {
        q: "What does el próximo sábado mean?",
        choices: ["last Saturday", "every Saturday", "next Saturday"],
        answer: 2,
        why: "Próximo means next, so el próximo sábado is next Saturday.",
      },
    ],
    task: {
      kind: "write",
      prompt: "Write a plan for next weekend in Spanish. Write five sentences with voy a, vas a, va a, vamos a or van a. Use at least two time words, like mañana, el sábado, por la mañana or esta noche. Then read your plan aloud to a parent.",
      rubric: [
        "Writes five sentences about plans",
        "Uses a form of ir, then a, then a whole verb, like voy a nadar",
        "Uses at least two time words",
        "Includes at least one plan for another person, like mi hermano va a ...",
      ],
    },
  },

  // 3. Travel and transportation
  {
    id: "span-5.travel",
    title: "¡Buen viaje! Trips and Travel",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.5.5", "SPAN.5.3", "SPAN.5.4", "SPAN.5.12", "SPAN.5.13"],
    read: [
      "¡Buen viaje! (bwen vee-AH-heh) means have a good trip. El viaje is the trip, and viajar (vee-ah-HAR) means to travel.",
      "To tell how you travel, say en and the vehicle. En avión (ah-vee-OHN) is by plane. ✈️ En tren (TREN) is by train. 🚆 En barco (BAR-koh) is by boat. 🚢 En autobús (ow-toh-BOOS) is by bus. En coche (KOH-cheh) is by car. En bicicleta is by bike. But on foot is a pie (ah pee-EH). To ask, say ¿Cómo vas? How do you go?",
      "For a plane, go to el aeropuerto (ah-eh-roh-PWER-toh), the airport. For a train, go to la estación de tren (es-tah-see-OHN), the train station. You need el boleto (boh-LEH-toh), the ticket. To fly to another country, you also need el pasaporte (pah-sah-POR-teh). To ask when the train leaves, say ¿A qué hora sale el tren? The answer might be: El tren sale a las diez.",
      "Spain has very fast trains called the AVE (AH-veh). Some of them go more than 180 miles an hour, so a trip that takes all day by car can take just a few hours by train.",
      "Before a trip, you pack la maleta (mah-LEH-tah), the suitcase. To pack is hacer la maleta. Use necesito (neh-seh-SEE-toh), I need, and voy a llevar (yeh-VAR), I am going to take. For the beach, voy a llevar el traje de baño (TRAH-heh deh BAH-nyoh), the swimsuit, and las gafas de sol, sunglasses. For a snowy mountain, voy a llevar la chaqueta, los guantes (GWAHN-tes), gloves, and la bufanda (boo-FAHN-dah), a scarf.",
      "Smart travelers plan ahead and pack only what they need.",
    ].join("\n\n"),
    keyIdeas: [
      "En avión, en tren, en barco, en autobús and en coche tell how you travel. On foot is a pie.",
      "At el aeropuerto or la estación de tren, you need el boleto, and to fly to another country, el pasaporte.",
      "Hacer la maleta means to pack the suitcase: voy a llevar ... and necesito ...",
    ],
    hook: {
      text: "Pip found an old map in the Starpeak Fort. 🗺️ It shows a trip from the mountains all the way to the sea. ✨ How will you get there? By train, by boat or on foot? And what will you pack? Let's get ready to travel in Spanish!",
    },
    teach: [
      {
        title: "¿Cómo vas? Ways to Travel",
        teach:
          "Viajar (vee-ah-HAR) means to travel. To tell how you travel, say en and the vehicle. En avión (ah-vee-OHN) is by plane. ✈️ En tren (TREN) is by train. 🚆 En barco (BAR-koh) is by boat. 🚢 En autobús (ow-toh-BOOS) is by bus. 🚌 En coche (KOH-cheh) is by car. 🚗 En bicicleta is by bike. 🚲 But watch out! On foot is a pie (ah pee-EH), not en pie. 🚶 To ask how someone travels, say ¿Cómo vas? Voy a la escuela en autobús. I go to school by bus.",
        visual: {
          type: "flip",
          cards: [
            { front: "en avión ✈️", back: "by plane. Say: en ah-vee-OHN." },
            { front: "en tren 🚆", back: "by train. Say: en TREN." },
            { front: "en barco 🚢", back: "by boat. Say: en BAR-koh." },
            { front: "en autobús 🚌", back: "by bus. Say: en ow-toh-BOOS." },
            { front: "a pie 🚶", back: "on foot. Say: ah pee-EH." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each way to travel to its picture.",
          pairs: [
            { left: "en avión", right: "✈️" },
            { left: "en tren", right: "🚆" },
            { left: "en barco", right: "🚢" },
            { left: "en coche", right: "🚗" },
            { left: "a pie", right: "🚶" },
          ],
          hint: "Avión is a plane, tren is a train, barco is a boat, coche is a car and a pie is on foot.",
          mistakes: [{ match: "Mixed up barco and avión", coach: "Barco floats on water. Avión flies in the sky." }],
          seconds: 35,
        },
        think: {
          q: "How do you say on foot?",
          choices: ["en pie", "en coche", "a pie"],
          answer: 2,
          why: "On foot is a pie. It uses a, not en.",
          hints: [
            "Close! But on foot is the one way that uses a instead of en.",
            "En coche means by car.",
            "",
          ],
        },
        approaches: {
          analogy:
            "En is like a seat inside a vehicle: en tren, en avión, en coche. You can't sit inside your feet, so walking is a pie.",
          example:
            "Carlos lives near the school. He says, Voy a la escuela a pie. His cousin lives far away, so she says, Voy a la escuela en autobús.",
          simpler: {
            q: "What does en avión mean?",
            choices: ["by plane", "by boat"],
            answer: 0,
            why: "Avión means plane, so en avión is by plane.",
            hints: ["", "By boat is en barco. An avión flies."],
          },
        },
      },
      {
        title: "At the Station and the Airport",
        teach:
          "To fly, you go to el aeropuerto (ah-eh-roh-PWER-toh), the airport. To ride a train, you go to la estación de tren (es-tah-see-OHN), the train station. You need el boleto (boh-LEH-toh), the ticket. 🎟️ To fly to another country, you also need el pasaporte (pah-sah-POR-teh), the passport. 🛂 To ask when the train leaves, say ¿A qué hora sale el tren? The answer might be: El tren sale a las diez. The train leaves at ten. Spain has very fast trains called the AVE (AH-veh). Some go more than 180 miles an hour! 🚄",
        visual: {
          type: "flip",
          cards: [
            { front: "el aeropuerto 🛫", back: "the airport. Say: ah-eh-roh-PWER-toh." },
            { front: "la estación de tren 🚉", back: "the train station. Say: es-tah-see-OHN." },
            { front: "el boleto 🎟️", back: "the ticket. Say: boh-LEH-toh." },
            { front: "el pasaporte 🛂", back: "the passport. Say: pah-sah-POR-teh." },
            { front: "¿A qué hora sale el tren? 🕙", back: "What time does the train leave?" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Para viajar en avión, voy al {0}. 🛫 Necesito mi {1} 🛂 y mi {2}. 🎟️ ¿A qué hora {3} el avión?",
          blanks: [{ answers: ["aeropuerto"] }, { answers: ["pasaporte"] }, { answers: ["boleto"] }, { answers: ["sale"] }],
          bank: ["aeropuerto", "pasaporte", "boleto", "sale", "estación", "playa"],
          hint: "Planes leave from the aeropuerto. The passport is el pasaporte and the ticket is el boleto. Leaves is sale.",
          mistakes: [
            { match: "estación", coach: "La estación is for trains. Planes leave from el aeropuerto." },
            { match: "playa", coach: "La playa is the beach. You need it after the trip, not at the airport!" },
          ],
          seconds: 45,
        },
        think: {
          q: "What is el boleto?",
          choices: ["the suitcase", "the ticket", "the train"],
          answer: 1,
          why: "El boleto is the ticket you need to ride.",
          hints: ["The suitcase is la maleta.", "", "The train is el tren."],
        },
        approaches: {
          analogy:
            "El boleto and el pasaporte are like keys. El boleto opens the door of the train, and el pasaporte opens the door to another country.",
          example:
            "The Ruiz family goes to Madrid. They go to el aeropuerto, show el pasaporte and el boleto, and fly. In Spain they take the AVE train from la estación de tren to Sevilla.",
          simpler: {
            q: "Where do you go to take a plane?",
            choices: ["la estación de tren", "el aeropuerto", "la escuela"],
            answer: 1,
            why: "Planes leave from el aeropuerto, the airport.",
            hints: ["La estación de tren is for trains.", "", "La escuela is school. Planes don't leave from there!"],
          },
        },
      },
      {
        title: "Hacer la maleta: Packing",
        teach:
          "Before a trip, you pack la maleta (mah-LEH-tah), the suitcase. 🧳 To pack is hacer la maleta. Use necesito (neh-seh-SEE-toh), I need, and voy a llevar (yeh-VAR), I am going to take. Think about the weather! Going to the beach, where hace calor? Voy a llevar el traje de baño (TRAH-heh deh BAH-nyoh), the swimsuit, and las gafas de sol, sunglasses. 😎 Going to a snowy mountain, where hace frío? Voy a llevar la chaqueta, los guantes (GWAHN-tes), gloves, and la bufanda (boo-FAHN-dah), a scarf. 🧣 Pack only what you need!",
        visual: {
          type: "flip",
          cards: [
            { front: "la maleta 🧳", back: "the suitcase. Say: mah-LEH-tah." },
            { front: "el traje de baño 🩱", back: "the swimsuit. Say: TRAH-heh deh BAH-nyoh." },
            { front: "las gafas de sol 😎", back: "sunglasses" },
            { front: "los guantes 🧤", back: "gloves. Say: GWAHN-tes." },
            { front: "la bufanda 🧣", back: "the scarf. Say: boo-FAHN-dah." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Pack two suitcases! Sort each thing into the right trip.",
          buckets: ["Beach trip, hace calor 🏖️", "Snowy mountain trip, hace frío 🏔️"],
          items: [
            { text: "el traje de baño 🩱", bucket: 0 },
            { text: "las gafas de sol 😎", bucket: 0 },
            { text: "las sandalias 🩴", bucket: 0 },
            { text: "los pantalones cortos 🩳", bucket: 0 },
            { text: "los guantes 🧤", bucket: 1 },
            { text: "la bufanda 🧣", bucket: 1 },
            { text: "la chaqueta 🧥", bucket: 1 },
            { text: "las botas 🥾", bucket: 1 },
          ],
          hint: "Hace calor at the beach: pack light things. Hace frío on the snowy mountain: pack warm things.",
          mistakes: [
            { match: "los guantes 🧤", coach: "Los guantes are gloves. They keep hands warm in the cold." },
            { match: "el traje de baño 🩱", coach: "El traje de baño is a swimsuit, for warm water at the beach." },
          ],
          seconds: 45,
        },
        think: {
          q: "What does hacer la maleta mean?",
          choices: ["to pack the suitcase", "to buy a ticket", "to take the train"],
          answer: 0,
          why: "La maleta is the suitcase, and hacer la maleta means to pack it.",
          hints: ["", "A ticket is el boleto. La maleta is the suitcase.", "The train is el tren. La maleta is the suitcase."],
        },
        approaches: {
          analogy:
            "Packing is like a puzzle. The weather is the picture on the box, and it shows you which pieces belong in la maleta.",
          example:
            "Elena is going to the beach in Puerto Rico, where hace calor. She says: Voy a llevar el traje de baño, las gafas de sol y las sandalias. Necesito mi boleto también.",
          simpler: {
            q: "What is la maleta?",
            choices: ["the scarf", "the suitcase"],
            answer: 1,
            why: "La maleta is the suitcase. 🧳",
            hints: ["The scarf is la bufanda.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Sofía is flying to Madrid. Put her trip in order.",
      steps: [
        "Hago la maleta. 🧳",
        "Voy al aeropuerto en coche. 🚗",
        "Muestro mi pasaporte y mi boleto. 🛂",
        "Subo al avión. ✈️",
        "¡Llego a Madrid! 🇪🇸",
      ],
    },
    explain: {
      prompt: "Tell Señora Luz how you would take a trip to Spain. How will you travel, what will you need, and what will you pack?",
      keyPoints: [
        "say how you travel with en, like en avión or en tren",
        "on foot is a pie",
        "you need el boleto and el pasaporte",
        "hacer la maleta means to pack",
        "use voy a llevar to say what you will take",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match the Spanish to the English.",
        pairs: [
          { left: "la estación de tren", right: "the train station" },
          { left: "el pasaporte", right: "the passport" },
          { left: "la maleta", right: "the suitcase" },
          { left: "en barco", right: "by boat" },
          { left: "a pie", right: "on foot" },
        ],
        hint: "Estación is a station, pasaporte is a passport, maleta is a suitcase, barco is a boat and a pie is on foot.",
        mistakes: [{ match: "Mixed up la maleta and el pasaporte", coach: "La maleta holds your clothes. El pasaporte is the little book that lets you enter a country." }],
        seconds: 45,
      },
      {
        type: "build",
        prompt: "Build the sentence: I am going to pack the suitcase. 🧳",
        tiles: ["Voy", "a", "hacer", "la", "maleta"],
        distractors: ["hice", "el"],
        hint: "Start with voy a, then the whole verb hacer, then la maleta.",
        mistakes: [
          { match: "hice", coach: "Hice is the past. After voy a, use the whole verb: hacer." },
          { match: "el", coach: "Maleta is a la word: la maleta." },
        ],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "El tren sale a las nueve. El viaje es de dos horas. At what hour does the train arrive? Type the hour.",
        answer: 11,
        hint: "Nueve is 9 and dos horas is two hours. Add them.",
        mistakes: [
          { match: "7", coach: "The train arrives after it leaves, so add the two hours." },
          { match: "9", coach: "Nine is when the train leaves. Add the two hours of the trip." },
        ],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Voy a la playa. Hace {0}. ☀️ Voy a llevar el {1} de baño 🩱 y las {2} de sol. 😎",
        blanks: [{ answers: ["calor"] }, { answers: ["traje"] }, { answers: ["gafas"] }],
        bank: ["calor", "traje", "gafas", "frío", "guantes", "bufanda"],
        hint: "The beach is hot: hace calor. A swimsuit is el traje de baño. Sunglasses are las gafas de sol.",
        mistakes: [
          { match: "frío", coach: "Hace frío means it is cold. The beach is hot: hace calor." },
          { match: "guantes", coach: "Los guantes are gloves, for the cold. At the beach, bring sunglasses: las gafas de sol." },
        ],
        seconds: 40,
      },
    ],
    check: [
      {
        q: "How do you say by train?",
        choices: ["en barco", "en tren", "a pie"],
        answer: 1,
        why: "Tren means train, so en tren means by train.",
      },
      {
        q: "What do you need to fly to another country?",
        choices: ["el pasaporte", "la bufanda", "el traje de baño"],
        answer: 0,
        why: "El pasaporte is the passport you show to enter another country.",
      },
      {
        q: "What are the AVE trains in Spain known for?",
        choices: ["Being very slow", "Floating on water", "Being very fast"],
        answer: 2,
        why: "The AVE trains are high-speed trains. Some go more than 180 miles an hour.",
      },
      {
        q: "What does ¿A qué hora sale el tren? mean?",
        choices: ["Where is the train?", "What time does the train leave?", "How much is the ticket?"],
        answer: 1,
        why: "¿A qué hora? asks what time, and sale means leaves.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Plan a pretend trip with a parent. Choose a place in a Spanish-speaking country and how you will get there. Then pack a real bag and name each thing in Spanish as you put it in: Voy a llevar ... Say how you will travel, like Voy a viajar en avión.",
      rubric: [
        "Names a place and how they will travel, using en or a pie",
        "Names at least five things in Spanish while packing",
        "Uses voy a llevar or necesito",
        "Chooses things that fit the weather of the place",
      ],
    },
  },

  // 4. Health and the body: me duele, at the doctor
  {
    id: "span-5.health",
    title: "Me duele: At the Doctor",
    minutes: 30,
    stage: "grammar",
    standards: ["SPAN.5.6", "SPAN.5.4", "SPAN.5.11"],
    read: [
      "You already know the parts of the body in Spanish. Today you will learn to say what hurts and to talk with a doctor.",
      "Me duele (meh DWEH-leh) means it hurts me. Add the body part after it. Me duele la cabeza (kah-BEH-sah) means my head hurts. Me duele el estómago (es-TOH-mah-goh) means my stomach hurts. Me duele la garganta (gar-GAHN-tah) means my throat hurts. In Spanish you say the head, not my head. Me already tells whose head it is!",
      "When two or more things hurt, add an n: me duelen (meh DWEH-len). Me duelen los pies means my feet hurt. Me duelen los ojos means my eyes hurt. This works just like me gusta and me gustan. Me gusta el perro. Me gustan los perros. One thing, gusta or duele. Two or more, gustan or duelen.",
      "To ask a friend what hurts, say ¿Qué te duele? (keh teh DWEH-leh).",
      "At the doctor, el médico or la médica (MEH-dee-kah) asks ¿Qué te pasa? (keh teh PAH-sah). It means what's wrong? You can say Estoy enfermo or Estoy enferma (en-FER-mah), I am sick. Tengo fiebre (fee-EH-breh) means I have a fever. Tengo tos (TOHS) means I have a cough.",
      "The doctor gives advice. Bebe mucha agua, drink lots of water. Descansa (des-KAHN-sah), rest. Toma la medicina, take the medicine. When you leave, your friends say ¡Que te mejores! (keh teh meh-HOH-res), get well soon!",
      "The best medicine is often a healthy habit: sleep, water, good food and washing your hands.",
    ].join("\n\n"),
    keyIdeas: [
      "Me duele and a body part tells what hurts: me duele la cabeza.",
      "When two or more things hurt, say me duelen: me duelen los pies. It works like me gusta and me gustan.",
      "At the doctor: ¿Qué te pasa? Estoy enfermo. Tengo fiebre.",
      "The doctor says: bebe mucha agua, descansa, toma la medicina.",
    ],
    hook: {
      text: "Oh no! The hero climbed the snowy trail to the Starpeak Observatory, and now something hurts. 🏔️ Pip glows with worry. ✨ The fort doctor only speaks Spanish. How can you tell her what hurts? Let's learn!",
    },
    teach: [
      {
        title: "Me duele: It Hurts",
        teach:
          "Me duele (meh DWEH-leh) means it hurts me. Put the body part after it. Me duele la cabeza (kah-BEH-sah). My head hurts. 🤕 Me duele el estómago (es-TOH-mah-goh). My stomach hurts. Me duele la garganta (gar-GAHN-tah). My throat hurts. Me duele el brazo. My arm hurts. Me duele la espalda (es-PAHL-dah). My back hurts. Here is a surprise. In Spanish you say the head, not my head. The word me already tells whose head it is!",
        visual: {
          type: "flip",
          cards: [
            { front: "Me duele la cabeza. 🤕", back: "My head hurts. Say: meh DWEH-leh lah kah-BEH-sah." },
            { front: "Me duele el estómago. 🤢", back: "My stomach hurts. Say: es-TOH-mah-goh." },
            { front: "Me duele la garganta. 😷", back: "My throat hurts. Say: gar-GAHN-tah." },
            { front: "Me duele la espalda. 🎒", back: "My back hurts. Say: es-PAHL-dah." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each sentence to its meaning.",
          pairs: [
            { left: "Me duele la cabeza.", right: "My head hurts. 🤕" },
            { left: "Me duele el estómago.", right: "My stomach hurts. 🤢" },
            { left: "Me duele la garganta.", right: "My throat hurts. 😷" },
            { left: "Me duele el brazo.", right: "My arm hurts. 💪" },
          ],
          hint: "Cabeza is head, estómago is stomach, garganta is throat and brazo is arm.",
          mistakes: [{ match: "Mixed up cabeza and garganta", coach: "La cabeza is your whole head. La garganta is your throat, where food goes down." }],
          seconds: 35,
        },
        think: {
          q: "How do you say my head hurts?",
          choices: ["Me duele mi cabeza.", "Me duele la cabeza.", "Me gusta la cabeza."],
          answer: 1,
          why: "Spanish says the head: me duele la cabeza. Me already shows it is your head.",
          hints: [
            "Close! But Spanish uses la, the, because me already shows whose head.",
            "",
            "Me gusta means I like. That would mean I like the head!",
          ],
        },
        approaches: {
          analogy:
            "Me duele is like pointing to where it hurts. Me is you, duele is the ouch, and the body part shows the spot.",
          example:
            "Tomás ate too much cake at the party. 🎂 He tells his mom, Me duele el estómago. She gives him some water and tells him to rest.",
          simpler: {
            q: "What does me duele mean?",
            choices: ["it hurts me", "I like it", "I am happy"],
            answer: 0,
            why: "Me duele means it hurts me.",
            hints: ["", "I like it is me gusta.", "I am happy is estoy feliz."],
          },
        },
      },
      {
        title: "Duele or duelen?",
        teach:
          "What if two things hurt? Add an n! Me duelen (meh DWEH-len). Me duelen los pies. My feet hurt. 🦶🦶 Me duelen los ojos. My eyes hurt. 👀 Me duelen las piernas. My legs hurt. You already know this trick from me gusta. Me gusta el perro, one dog. Me gustan los perros, many dogs. It is the same with duele. One thing hurts: duele. Two or more things hurt: duelen. To ask a friend, say ¿Qué te duele? (keh teh DWEH-leh). It means what hurts?",
        visual: {
          type: "compare",
          left: { title: "One thing ☝️", points: ["Me duele la cabeza.", "Me duele el pie.", "Me gusta el perro."] },
          right: { title: "Two or more ✌️", points: ["Me duelen los ojos.", "Me duelen los pies.", "Me gustan los perros."] },
        },
        probe: {
          type: "cloze",
          text: "Me {0} la cabeza. 🤕 Me {1} los pies. 🦶🦶 Me {2} los perros. 🐕🐕",
          blanks: [{ answers: ["duele"] }, { answers: ["duelen"] }, { answers: ["gustan"] }],
          bank: ["duele", "duelen", "gustan", "gusta", "duermo"],
          hint: "One thing: duele or gusta. Two or more: duelen or gustan. The dogs are a happy sentence!",
          mistakes: [
            { match: "gusta", coach: "Los perros are two or more, so add an n: me gustan los perros." },
            { match: "duermo", coach: "Duermo means I sleep. You need duele or duelen to say what hurts." },
          ],
          seconds: 40,
        },
        think: {
          q: "Your knees hurt. Which sentence is right?",
          choices: ["Me duele las rodillas.", "Me gusta las rodillas.", "Me duelen las rodillas."],
          answer: 2,
          why: "Las rodillas, the knees, are two things, so say me duelen.",
          hints: [
            "Las rodillas are two knees. Two or more need duelen, with an n.",
            "Me gusta means I like. You want to say what hurts.",
            "",
          ],
        },
        approaches: {
          analogy:
            "The n at the end of duelen is like a little plus sign. It says there is more than one thing that hurts.",
          example:
            "After a long hike, Ana says, Me duelen las piernas. Her legs hurt, and legs are two, so she says duelen. Then her head hurts too: Me duele la cabeza. One head, so duele.",
          simpler: {
            q: "Which goes with los pies, the feet?",
            choices: ["duele", "duelen"],
            answer: 1,
            why: "Los pies are two or more, so use duelen.",
            hints: ["Duele is for one thing. Los pies are two feet.", ""],
          },
        },
      },
      {
        title: "At the Doctor",
        teach:
          "At the doctor, el médico or la médica (MEH-dee-kah) asks, ¿Qué te pasa? (keh teh PAH-sah). It means what's wrong? 🩺 Tell the doctor. Estoy enfermo, or for a girl, estoy enferma (en-FER-mah). I am sick. Tengo fiebre (fee-EH-breh). I have a fever. 🤒 Tengo tos (TOHS). I have a cough. Then the doctor gives advice. Bebe mucha agua. Drink lots of water. 💧 Descansa (des-KAHN-sah). Rest. 🛏️ Toma la medicina. Take the medicine. 💊 When you leave, say gracias. Your friends will say ¡Que te mejores! (keh teh meh-HOH-res). Get well soon!",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Qué te pasa? 🩺", back: "What's wrong? Say: keh teh PAH-sah." },
            { front: "Estoy enfermo. Estoy enferma. 🤒", back: "I am sick. Say: en-FER-moh, en-FER-mah." },
            { front: "Tengo fiebre. 🌡️", back: "I have a fever. Say: fee-EH-breh." },
            { front: "Descansa. 🛏️", back: "Rest. Say: des-KAHN-sah." },
            { front: "¡Que te mejores! 💐", back: "Get well soon! Say: keh teh meh-HOH-res." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put Pablo's visit to the doctor in order.",
          steps: [
            "Médica: Hola, Pablo. ¿Qué te pasa?",
            "Pablo: Estoy enfermo. Me duele la garganta.",
            "Médica: ¿Tienes fiebre?",
            "Pablo: Sí, tengo fiebre.",
            "Médica: Bebe mucha agua y descansa.",
            "Pablo: Gracias, doctora. ¡Adiós!",
          ],
          hint: "The doctor asks what's wrong first. Pablo answers. The doctor asks about a fever, then gives advice. Goodbye comes last.",
          mistakes: [{ match: "Médica: Bebe mucha agua y descansa.", coach: "The doctor gives advice after she knows what is wrong." }],
          seconds: 50,
        },
        think: {
          q: "What does the doctor mean by descansa?",
          choices: ["Run fast", "Eat candy", "Rest"],
          answer: 2,
          why: "Descansa means rest. Resting helps your body get well.",
          hints: [
            "Run is corre. When you are sick, the doctor wants you to slow down.",
            "Candy is dulces. The doctor wants you to rest.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A visit to the doctor is like a short play with two parts. The doctor asks, you tell what hurts, and then the doctor gives the advice.",
          example:
            "La médica: ¿Qué te pasa? Lucía: Estoy enferma. Tengo tos y me duele la cabeza. La médica: Toma la medicina y descansa. Lucía: Gracias.",
          simpler: {
            q: "What does tengo fiebre mean?",
            choices: ["I have a fever", "I am hungry"],
            answer: 0,
            why: "Fiebre means fever, so tengo fiebre means I have a fever.",
            hints: ["", "I am hungry is tengo hambre. Fiebre means fever."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which one fits: me duele or me duelen?",
      buckets: ["Me duele ... (one thing) ☝️", "Me duelen ... (two or more) ✌️"],
      items: [
        { text: "la cabeza 🤕", bucket: 0 },
        { text: "el estómago 🤢", bucket: 0 },
        { text: "la garganta 😷", bucket: 0 },
        { text: "el brazo 💪", bucket: 0 },
        { text: "los pies 🦶🦶", bucket: 1 },
        { text: "los ojos 👀", bucket: 1 },
        { text: "las piernas 🦵🦵", bucket: 1 },
        { text: "las manos 🙌", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Teach Señora Luz how to tell a doctor what hurts in Spanish. When do you say duele, and when do you say duelen?",
      keyPoints: [
        "me duele and a body part tells what hurts",
        "use la or el, not mi, like me duele la cabeza",
        "duele for one thing, duelen for two or more",
        "it works like me gusta and me gustan",
        "the doctor asks ¿Qué te pasa?",
      ],
    },
    mastery: [
      {
        type: "build",
        prompt: "Build the sentence: My stomach hurts. 🤢",
        tiles: ["Me", "duele", "el", "estómago"],
        distractors: ["duelen", "mi"],
        hint: "One stomach, so me duele. Then el estómago.",
        mistakes: [
          { match: "duelen", coach: "Duelen is for two or more. You have one stomach: duele." },
          { match: "mi", coach: "In Spanish you say el estómago. Me already tells whose it is." },
        ],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap everything the doctor might tell you to do to get well.",
        sentences: [
          "Bebe mucha agua.",
          "Come muchos dulces.",
          "Descansa.",
          "Corre un maratón.",
          "Toma la medicina.",
        ],
        correct: [0, 2, 4],
        hint: "Water, rest and medicine help you get well. Lots of candy and long races do not.",
        mistakes: [{ match: "Corre un maratón.", coach: "Corre means run. When you are sick, the doctor wants you to rest." }],
        seconds: 35,
      },
      {
        type: "number",
        prompt: "La médica says: Tienes fiebre. Tu temperatura es treinta y nueve grados (Celsius). Type the number.",
        answer: 39,
        hint: "Treinta is 30 and nueve is 9.",
        mistakes: [
          { match: "93", coach: "Treinta y nueve is thirty-nine: 30 and 9." },
          { match: "29", coach: "Veinte is 20. Treinta is 30." },
        ],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each Spanish line to its meaning.",
        pairs: [
          { left: "¿Qué te pasa?", right: "What's wrong?" },
          { left: "¿Qué te duele?", right: "What hurts?" },
          { left: "Tengo tos.", right: "I have a cough." },
          { left: "Estoy enferma.", right: "I am sick." },
          { left: "¡Que te mejores!", right: "Get well soon!" },
        ],
        hint: "Pasa asks what's wrong, duele asks what hurts, tos is a cough and enferma is sick.",
        mistakes: [{ match: "Mixed up the two questions", coach: "¿Qué te duele? has duele in it, so it asks what hurts." }],
        seconds: 45,
      },
    ],
    check: [
      {
        q: "How do you say my eyes hurt?",
        choices: ["Me duele los ojos.", "Me duelen los ojos.", "Me gustan los ojos."],
        answer: 1,
        why: "Los ojos are two, so say me duelen los ojos.",
      },
      {
        q: "What does ¿Qué te pasa? mean?",
        choices: ["What's wrong?", "Where are you going?", "What time is it?"],
        answer: 0,
        why: "Doctors ask ¿Qué te pasa? It means what's wrong?",
      },
      {
        q: "What does me duele la garganta mean?",
        choices: ["My arm hurts.", "My back hurts.", "My throat hurts."],
        answer: 2,
        why: "La garganta is the throat.",
      },
      {
        q: "A friend is sick. What do you say?",
        choices: ["¡Buen viaje!", "¡Que te mejores!", "¡Mucho gusto!"],
        answer: 1,
        why: "¡Que te mejores! means get well soon.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Play doctor with a parent. First you are the patient: tell what hurts with me duele and me duelen, and answer the doctor's questions. Then switch: you are the doctor. Ask ¿Qué te pasa? and give two pieces of advice in Spanish.",
      rubric: [
        "Tells what hurts with me duele for one thing",
        "Uses me duelen for two or more things",
        "Asks ¿Qué te pasa? or ¿Qué te duele? as the doctor",
        "Gives at least two pieces of advice, like bebe mucha agua and descansa",
      ],
    },
  },

  // 5. Nature and the outdoors
  {
    id: "span-5.nature",
    title: "La naturaleza: Mountains, Rivers and Animals",
    minutes: 35,
    stage: "grammar",
    standards: ["SPAN.5.7", "SPAN.5.8", "SPAN.5.12", "SPAN.5.4"],
    read: [
      "La naturaleza (nah-too-rah-LEH-sah) means nature. Spanish-speaking lands have some of the most amazing nature on Earth.",
      "Here are words for the land. La montaña (mohn-TAH-nyah) is a mountain. El volcán (vohl-KAHN) is a volcano. El bosque (BOHS-keh) is a forest. La selva (SEL-vah) is a jungle or rainforest. El desierto (deh-see-ER-toh) is a desert. La isla (EES-lah) is an island. Here are words for water. El río (REE-oh) is a river. El lago (LAH-goh) is a lake. El mar is the sea. La cascada (kahs-KAH-dah) is a waterfall. To say there is or there are, use hay (EYE). En México hay volcanes.",
      "Some places are world famous. Los Andes (AHN-des) are the longest mountain range on land. They run through seven countries of South America. El río Amazonas carries more water than any other river on Earth. El desierto de Atacama in Chile is one of the driest places in the world. El Salto Ángel in Venezuela is the tallest waterfall in the world.",
      "Animals live there too. El cóndor (KOHN-dor), a giant bird, flies over the Andes. La llama (YAH-mah) and la alpaca live in the Andes and have soft wool. El jaguar (hah-GWAR), the biggest cat in the Americas, lives in la selva. So does el perezoso (peh-reh-SOH-soh), the slow sloth. La tortuga gigante, the giant tortoise, lives on the Galápagos Islands of Ecuador.",
      "Outdoors, you can acampar (ah-kahm-PAR), to camp, pescar (pes-KAR), to fish, caminar por el bosque, and mirar las estrellas (es-TREH-yahs), look at the stars. Good explorers take care of nature and leave a place cleaner than they found it.",
    ].join("\n\n"),
    keyIdeas: [
      "Land words: la montaña, el volcán, el bosque, la selva, el desierto, la isla. Water words: el río, el lago, el mar, la cascada.",
      "Hay means there is or there are: en Chile hay montañas.",
      "The Andes, the Amazon River and the Atacama Desert are famous places in South America.",
      "The cóndor, llama, jaguar, perezoso and tortuga gigante are animals of Spanish-speaking lands.",
    ],
    hook: {
      text: "From the top of Starpeak, Pip can see the whole world. ✨ There are mountains, rivers, forests and the sea. 🏔️🌊 Pip wants to name everything in Spanish and meet the animals that live there. Let's explore la naturaleza!",
    },
    teach: [
      {
        title: "Land and Water",
        teach:
          "La naturaleza (nah-too-rah-LEH-sah) means nature. Let's name the land. La montaña (mohn-TAH-nyah) is a mountain. ⛰️ El volcán (vohl-KAHN) is a volcano. 🌋 El bosque (BOHS-keh) is a forest. 🌲 La selva (SEL-vah) is a jungle or rainforest. El desierto (deh-see-ER-toh) is a desert. 🏜️ La isla (EES-lah) is an island. 🏝️ Now the water. El río (REE-oh) is a river. El lago (LAH-goh) is a lake. El mar is the sea. 🌊 La cascada (kahs-KAH-dah) is a waterfall. To say there is or there are, use hay (EYE). En México hay volcanes. In Mexico there are volcanoes.",
        visual: {
          type: "flip",
          cards: [
            { front: "la montaña ⛰️", back: "mountain. Say: mohn-TAH-nyah." },
            { front: "el volcán 🌋", back: "volcano. Say: vohl-KAHN." },
            { front: "la selva 🌴", back: "jungle or rainforest. Say: SEL-vah." },
            { front: "el río 🏞️", back: "river. Say: REE-oh." },
            { front: "la cascada 💦", back: "waterfall. Say: kahs-KAH-dah." },
            { front: "hay 👉", back: "there is, there are. Say: EYE." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is it land or water? Sort each word.",
          buckets: ["La tierra: land ⛰️", "El agua: water 🌊"],
          items: [
            { text: "la montaña", bucket: 0 },
            { text: "el desierto", bucket: 0 },
            { text: "el bosque", bucket: 0 },
            { text: "el volcán", bucket: 0 },
            { text: "el río", bucket: 1 },
            { text: "el lago", bucket: 1 },
            { text: "el mar", bucket: 1 },
            { text: "la cascada", bucket: 1 },
          ],
          hint: "Río, lago, mar and cascada are all water. Montaña, desierto, bosque and volcán are land.",
          mistakes: [
            { match: "el desierto", coach: "El desierto is a desert, dry land with very little water." },
            { match: "la cascada", coach: "La cascada is a waterfall, water falling down a cliff." },
          ],
          seconds: 40,
        },
        think: {
          q: "What is el lago?",
          choices: ["a forest", "a lake", "a volcano"],
          answer: 1,
          why: "El lago is a lake.",
          hints: ["A forest is el bosque.", "", "A volcano is el volcán."],
        },
        approaches: {
          analogy:
            "Think of a map with two colors. Brown parts are la tierra: montaña, bosque, desierto. Blue parts are el agua: río, lago, mar.",
          example:
            "Costa Rica has it all. En Costa Rica hay volcanes, hay selvas, hay playas y hay ríos. Hay means there are, so this says Costa Rica has volcanoes, rainforests, beaches and rivers.",
          simpler: {
            q: "What does hay mean?",
            choices: ["there is or there are", "I have"],
            answer: 0,
            why: "Hay means there is or there are, like hay un río.",
            hints: ["", "I have is tengo. Hay means there is or there are."],
          },
        },
      },
      {
        title: "World-Famous Places",
        teach:
          "Spanish-speaking lands hold some of the most famous places on Earth. 🌎 Los Andes (AHN-des) are the longest mountain range on land. They run through seven countries of South America, from Venezuela to Chile and Argentina. 🏔️ El río Amazonas begins in the Andes of Peru. It carries more water than any other river on Earth. El desierto de Atacama in Chile is one of the driest places in the world. ☀️ El Salto Ángel in Venezuela is the tallest waterfall in the world. You can describe them: Los Andes son muy altos. El río es muy largo.",
        visual: {
          type: "hotspots",
          title: "Famous places of South America",
          center: "🌎 América del Sur",
          spots: [
            { label: "Los Andes", icon: "🏔️", detail: "The longest mountain range on land. It runs through seven countries." },
            { label: "El río Amazonas", icon: "🏞️", detail: "It starts in the Andes of Peru and carries more water than any other river." },
            { label: "El desierto de Atacama", icon: "🏜️", detail: "A desert in Chile, one of the driest places in the world." },
            { label: "El Salto Ángel", icon: "💦", detail: "A waterfall in Venezuela, the tallest in the world." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each famous place to what makes it special.",
          pairs: [
            { left: "Los Andes 🏔️", right: "the longest mountain range on land" },
            { left: "El río Amazonas 🏞️", right: "the river that carries the most water" },
            { left: "El desierto de Atacama 🏜️", right: "one of the driest places in the world" },
            { left: "El Salto Ángel 💦", right: "the tallest waterfall in the world" },
          ],
          hint: "Andes are mountains, Amazonas is a river, Atacama is a desert and Salto Ángel is a waterfall.",
          mistakes: [{ match: "Mixed up Atacama and Amazonas", coach: "The Amazonas is full of water. The Atacama is a desert, so it is very dry." }],
          seconds: 40,
        },
        think: {
          q: "What are Los Andes?",
          choices: ["A long river", "A long mountain range", "A dry desert"],
          answer: 1,
          why: "Los Andes are the longest mountain range on land, in South America.",
          hints: [
            "The long river is el río Amazonas.",
            "",
            "The dry desert is el desierto de Atacama.",
          ],
        },
        approaches: {
          analogy:
            "The Andes are like a giant backbone running down the west side of South America, from the top of the continent almost to the bottom.",
          example:
            "A raindrop falls high in the Andes of Peru. It runs into a stream, then into the río Amazonas, and travels thousands of miles east across South America to the Atlantic Ocean.",
          simpler: {
            q: "What is the Amazonas?",
            choices: ["a river", "a mountain"],
            answer: 0,
            why: "El río Amazonas is a river, the one that carries the most water.",
            hints: ["", "The mountains are Los Andes. The Amazonas is a river."],
          },
        },
      },
      {
        title: "Animals of Spanish-Speaking Lands",
        teach:
          "Let's meet the animals! 🐾 El cóndor (KOHN-dor) is a giant bird that soars over the Andes on wide wings. La llama (YAH-mah) and la alpaca also live in the Andes, and their soft wool makes warm clothes. 🦙 El jaguar (hah-GWAR) is the biggest cat in the Americas. 🐆 It lives in la selva. So does el perezoso (peh-reh-SOH-soh), the sloth, which hangs in the trees and moves very slowly. 🦥 La tortuga gigante, the giant tortoise, lives on the Galápagos Islands of Ecuador. 🐢 Describe them with es and vive en. El jaguar es fuerte. El perezoso vive en la selva.",
        visual: {
          type: "flip",
          cards: [
            { front: "el cóndor 🦅", back: "condor. A giant bird of the Andes. Say: KOHN-dor." },
            { front: "la llama 🦙", back: "llama. It lives in the Andes. Say: YAH-mah." },
            { front: "el jaguar 🐆", back: "jaguar. The biggest cat in the Americas. Say: hah-GWAR." },
            { front: "el perezoso 🦥", back: "sloth. Very slow! Say: peh-reh-SOH-soh." },
            { front: "la tortuga gigante 🐢", back: "giant tortoise of the Galápagos Islands" },
          ],
        },
        probe: {
          type: "cloze",
          text: "El {0} vive en la selva. Es fuerte y rápido. 🐆 La {1} vive en los Andes. Tiene lana suave. 🦙 La {2} gigante vive en las islas Galápagos. 🐢",
          blanks: [{ answers: ["jaguar"] }, { answers: ["llama"] }, { answers: ["tortuga"] }],
          bank: ["jaguar", "llama", "tortuga", "perezoso", "delfín"],
          hint: "The strong, fast cat is el jaguar. The woolly animal is la llama. The giant one on the Galápagos is la tortuga gigante.",
          mistakes: [
            { match: "perezoso", coach: "El perezoso lives in la selva, but it is very slow, not fast." },
            { match: "delfín", coach: "El delfín is a dolphin. It lives in the sea, not in la selva." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which animal is a giant bird of the Andes?",
          choices: ["el perezoso", "el jaguar", "el cóndor"],
          answer: 2,
          why: "El cóndor is a giant bird that soars over the Andes.",
          hints: ["El perezoso is a slow sloth that hangs in trees.", "El jaguar is a big cat in la selva.", ""],
        },
        approaches: {
          analogy:
            "Each animal is like a neighbor who lives on a certain street. El cóndor lives up on the mountain street, and el jaguar lives down on the rainforest street.",
          example:
            "A guide in Ecuador points and says: Mira, una tortuga gigante. Vive en las islas Galápagos. Es muy grande y muy lenta. Look, a giant tortoise! It lives on the Galápagos Islands. It is very big and very slow.",
          simpler: {
            q: "What is el perezoso?",
            choices: ["a sloth", "a bird"],
            answer: 0,
            why: "El perezoso is the sloth. Perezoso also means lazy!",
            hints: ["", "The giant bird is el cóndor. El perezoso is the slow sloth."],
          },
        },
      },
      {
        title: "¡Al aire libre! Outdoors",
        teach:
          "Al aire libre (ahl EYE-reh LEE-breh) means outdoors, in the open air. 🏕️ Here are things to do. Acampar (ah-kahm-PAR) is to camp. Pescar (pes-KAR) is to fish. 🎣 Caminar por el bosque is to walk through the forest. Mirar las estrellas (es-TREH-yahs) is to look at the stars. ✨ Now use your past and your plans. El verano pasado acampé en las montañas. Last summer I camped in the mountains. Mi papá pescó en el río. My dad fished in the river. Esta noche vamos a mirar las estrellas. Good explorers take care of nature. Leave every place cleaner than you found it!",
        visual: {
          type: "flip",
          cards: [
            { front: "acampar 🏕️", back: "to camp. Say: ah-kahm-PAR." },
            { front: "pescar 🎣", back: "to fish. Say: pes-KAR." },
            { front: "caminar por el bosque 🌲", back: "to walk through the forest" },
            { front: "mirar las estrellas ✨", back: "to look at the stars. Say: es-TREH-yahs." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the sentence: I am going to camp in the forest. 🏕️",
          tiles: ["Voy", "a", "acampar", "en", "el", "bosque"],
          distractors: ["acampé", "vas"],
          hint: "Plans use voy a and a whole verb: voy a acampar. Then en el bosque.",
          mistakes: [
            { match: "acampé", coach: "Acampé means I camped, the past. After voy a, keep the whole verb: acampar." },
            { match: "vas", coach: "Vas is you go. This sentence is about I, so use voy." },
          ],
          seconds: 35,
        },
        think: {
          q: "What does pescar mean?",
          choices: ["to fish", "to camp", "to swim"],
          answer: 0,
          why: "Pescar means to fish. 🎣",
          hints: ["", "To camp is acampar.", "To swim is nadar."],
        },
        approaches: {
          analogy:
            "Outdoor verbs are like tools in a backpack. Pick acampar for the night, pescar for the river and mirar las estrellas for the dark sky.",
          example:
            "Diego tells about his trip. El sábado caminé por el bosque. Mi hermana pescó en el lago. Esta noche vamos a mirar las estrellas. He used the past for what happened and voy a for his plan.",
          simpler: {
            q: "What does acampar mean?",
            choices: ["to fish", "to camp"],
            answer: 1,
            why: "Acampar means to camp. 🏕️",
            hints: ["To fish is pescar.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Where does each animal live? Sort them into their homes.",
      buckets: ["Las montañas de los Andes 🏔️", "La selva 🌴", "Las islas Galápagos 🏝️"],
      items: [
        { text: "el cóndor 🦅", bucket: 0 },
        { text: "la llama 🦙", bucket: 0 },
        { text: "la alpaca 🐑", bucket: 0 },
        { text: "el jaguar 🐆", bucket: 1 },
        { text: "el perezoso 🦥", bucket: 1 },
        { text: "el tucán 🐦", bucket: 1 },
        { text: "la tortuga gigante 🐢", bucket: 2 },
        { text: "la iguana marina 🦎", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz about nature in Spanish-speaking lands. Name some land and water words, one famous place and one animal, and say something you like to do outdoors.",
      keyPoints: [
        "names land words like la montaña or la selva",
        "names water words like el río or el lago",
        "hay means there is or there are",
        "names a famous place like los Andes or el río Amazonas",
        "names an animal and where it lives, like el jaguar vive en la selva",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each nature word to its picture.",
        pairs: [
          { left: "el volcán", right: "🌋" },
          { left: "el desierto", right: "🏜️" },
          { left: "la isla", right: "🏝️" },
          { left: "el bosque", right: "🌲" },
          { left: "la cascada", right: "💦" },
        ],
        hint: "Volcán is a volcano, desierto is a desert, isla is an island, bosque is a forest and cascada is a waterfall.",
        mistakes: [{ match: "Mixed up la isla and el desierto", coach: "La isla has water all around it. El desierto is dry land." }],
        seconds: 40,
      },
      {
        type: "highlight",
        prompt: "Tap every sentence that is true.",
        sentences: [
          "El jaguar vive en la selva.",
          "La llama vive en el mar.",
          "El río Amazonas está en América del Sur.",
          "El desierto tiene mucha agua.",
          "El perezoso es muy lento.",
          "El cóndor es muy pequeño.",
        ],
        correct: [0, 2, 4],
        hint: "Think about where each animal lives and what each place is like. Lento means slow and pequeño means small.",
        mistakes: [{ match: "El cóndor es muy pequeño.", coach: "El cóndor is a giant bird, so it is grande, not pequeño." }],
        seconds: 45,
      },
      {
        type: "number",
        prompt: "Los Andes run through siete countries of South America. Type the number.",
        answer: 7,
        hint: "Siete is the number between seis and ocho.",
        mistakes: [{ match: "6", coach: "Seis is 6. Siete is one more." }],
        seconds: 15,
      },
      {
        type: "cloze",
        text: "En Chile {0} montañas y desiertos. ⛰️🏜️ El verano pasado yo {1} en el bosque. 🏕️ Esta noche vamos a {2} las estrellas. ✨",
        blanks: [{ answers: ["hay"] }, { answers: ["acampé"] }, { answers: ["mirar"] }],
        bank: ["hay", "acampé", "mirar", "acampar", "miré", "es"],
        hint: "There are is hay. Last summer is the past: acampé. After vamos a, use the whole verb: mirar.",
        mistakes: [
          { match: "acampar", coach: "El verano pasado already happened. Use the past: acampé." },
          { match: "miré", coach: "Miré is the past. After vamos a, keep the whole verb: mirar." },
          { match: "es", coach: "Es means is. For there are, use hay." },
        ],
        seconds: 45,
      },
    ],
    check: [
      {
        q: "What is la selva?",
        choices: ["a desert", "a jungle or rainforest", "a lake"],
        answer: 1,
        why: "La selva is a jungle or rainforest, home of the jaguar and the sloth.",
      },
      {
        q: "Which river carries more water than any other river on Earth?",
        choices: ["El río Amazonas", "El río Grande", "El río Ebro"],
        answer: 0,
        why: "El río Amazonas carries more water than any other river.",
      },
      {
        q: "Where does la tortuga gigante live?",
        choices: ["In the Atacama Desert", "On top of the Andes", "On the Galápagos Islands"],
        answer: 2,
        why: "The giant tortoise lives on the Galápagos Islands of Ecuador.",
      },
      {
        q: "What does hay mean in En México hay volcanes?",
        choices: ["there are", "I have", "it is"],
        answer: 0,
        why: "Hay means there is or there are.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make a nature field guide page in Spanish. Draw one place (like los Andes or la selva) and two animals that live there. Under each, write a Spanish sentence with hay, es or vive en. Then take it outside and name five things you see in nature in Spanish.",
      rubric: [
        "Draws and names one place in Spanish",
        "Draws two animals that really live there",
        "Writes sentences with hay, es or vive en",
        "Names five real things outdoors in Spanish",
      ],
    },
  },

  // 6. Culture: Spain's history and landmarks
  {
    id: "span-5.spain",
    title: "España: Palaces, Books and Old Roads",
    minutes: 35,
    stage: "rhetoric",
    standards: ["SPAN.5.9", "SPAN.5.10", "SPAN.5.12", "SPAN.5.1", "SPAN.5.4"],
    read: [
      "Spanish began in España (es-PAH-nyah), the country of Spain. Spain has a long history, and you can still visit its treasures today.",
      "In the south is the city of Granada (grah-NAH-dah). In 711, Muslim rulers from North Africa crossed into Spain, and Muslim kingdoms ruled parts of it for almost 800 years. In 1238, the Nasrid kings began building la Alhambra (ah-LAHM-brah), a palace and fortress on a hill. Its name means the red one in Arabic, for its reddish walls. Inside are colorful tiles, carved patterns and fountains, like the Patio de los Leones with its twelve stone lions. In 1492, King Ferdinand and Queen Isabella took Granada. That same year, they sent Columbus across the ocean. Spanish still uses many words that came from Arabic, like azúcar (ah-SOO-kar), sugar, aceite (ah-SAY-teh), oil, almohada (ahl-moh-AH-dah), pillow, and ajedrez (ah-heh-DRES), chess.",
      "Spain's most famous book is Don Quijote (dohn kee-HOH-teh), by Miguel de Cervantes (ser-VAHN-tes). The first part came out in 1605 and the second in 1615. An older gentleman from La Mancha reads so many stories about knights that he becomes one himself. He rides his skinny horse Rocinante with his loyal neighbor Sancho Panza. He even attacks windmills, thinking they are giants!",
      "In Barcelona stands la Sagrada Familia (sah-GRAH-dah fah-MEE-lyah), a giant church. Work began in 1882, and the architect Antoni Gaudí (gow-DEE) worked on it until he died in 1926. Inside, the columns branch out like trees. Builders are still finishing it today.",
      "El Camino de Santiago is a very old walking road across northern Spain to the cathedral of Santiago de Compostela. People have walked it for more than 1,000 years. The walkers, called peregrinos (peh-reh-GREE-nohs), follow yellow arrows and the sign of the scallop shell, la concha. They greet each other with ¡Buen Camino!",
      "Our country has old treasures too, like Independence Hall and the Liberty Bell. Spain's are older still, and they show how much people can build, write and do over many years.",
    ].join("\n\n"),
    keyIdeas: [
      "La Alhambra in Granada is a palace and fortress begun by the Nasrid kings in 1238.",
      "Miguel de Cervantes wrote Don Quijote, about a man who wants to be a knight and attacks windmills he thinks are giants.",
      "Antoni Gaudí designed la Sagrada Familia in Barcelona. Work began in 1882.",
      "El Camino de Santiago is a walking road more than 1,000 years old. Walkers follow yellow arrows and the scallop shell.",
    ],
    hook: {
      text: "Pip found a treasure chest in the observatory. ✨ Inside are four old postcards from España: a red palace, a knight on a skinny horse, a church like a forest, and a shell on a long road. 🏰🐴⛪🐚 Let's find out the story behind each one!",
    },
    teach: [
      {
        title: "La Alhambra",
        teach:
          "In the south of España is the city of Granada (grah-NAH-dah). In 711, Muslim rulers from North Africa crossed into Spain, and Muslim kingdoms ruled parts of it for almost 800 years. In 1238, the Nasrid kings began building la Alhambra (ah-LAHM-brah), a palace and fortress on a hill. 🏰 Its name means the red one in Arabic, for its reddish walls. Inside are colorful tiles, carved patterns and fountains, like the Patio de los Leones with twelve stone lions. ⛲ In 1492, King Ferdinand and Queen Isabella took Granada. That same year, they sent Columbus across the ocean. Spanish still uses Arabic words, like azúcar (ah-SOO-kar), sugar.",
        visual: {
          type: "timeline",
          events: [
            { year: 711, label: "Muslim rulers cross into Spain", detail: "Armies from North Africa crossed into Spain. Muslim kingdoms ruled parts of it for almost 800 years." },
            { year: 1238, label: "Building of the Alhambra begins", detail: "The Nasrid kings of Granada began building the Alhambra, a palace and fortress on a hill." },
            { year: 1492, label: "Ferdinand and Isabella take Granada", detail: "The king and queen took Granada. That same year they sent Columbus across the Atlantic Ocean." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Place each event on the timeline.",
          min: 700,
          max: 1500,
          step: 1,
          tolerance: 15,
          items: [
            { label: "Muslim rulers cross into Spain", value: 711 },
            { label: "The Nasrid kings begin the Alhambra", value: 1238 },
            { label: "Ferdinand and Isabella take Granada", value: 1492 },
          ],
          hint: "711 is near the start of the line. 1238 is in the middle. 1492, the year Columbus sailed, is near the end.",
          mistakes: [{ match: "Columbus", coach: "Granada was taken in 1492, the same year Columbus sailed." }],
          seconds: 45,
        },
        think: {
          q: "What does the name Alhambra mean in Arabic?",
          choices: ["the big castle", "the red one", "the twelve lions"],
          answer: 1,
          why: "Alhambra means the red one, for its reddish walls.",
          hints: [
            "It is a castle, but the name is about its color.",
            "",
            "The twelve lions are in the Patio de los Leones. The name is about the color of the walls.",
          ],
        },
        approaches: {
          analogy:
            "The Alhambra is like a giant jewelry box on a hill. Plain red walls on the outside, and inside, rooms covered in patterns like lace.",
          example:
            "A family visits Granada. They walk up the hill to the Alhambra, see the red walls, and stand in the Patio de los Leones, where twelve stone lions hold up a fountain.",
          simpler: {
            q: "In which city is the Alhambra?",
            choices: ["Granada", "Madrid"],
            answer: 0,
            why: "The Alhambra stands on a hill above Granada, in the south of Spain.",
            hints: ["", "Madrid is the capital, but the Alhambra is in Granada."],
          },
        },
      },
      {
        title: "Don Quijote and Cervantes",
        teach:
          "Spain's most famous book is Don Quijote (dohn kee-HOH-teh). Miguel de Cervantes (mee-GEL deh ser-VAHN-tes) wrote it. The first part came out in 1605. 📖 The hero is an older gentleman from La Mancha (MAHN-chah), a flat, dry land in the middle of Spain. He reads so many stories about knights that he decides to become one! He rides his skinny horse Rocinante (roh-see-NAHN-teh) with his loyal neighbor Sancho Panza. 🐴 One day he sees windmills and thinks they are giants. He charges, and a windmill knocks him to the ground. Notice the past: Cervantes escribió. Don Quijote atacó los molinos.",
        visual: {
          type: "flip",
          cards: [
            { front: "Miguel de Cervantes ✍️", back: "The writer of Don Quijote. The first part came out in 1605." },
            { front: "Don Quijote 🛡️", back: "A gentleman from La Mancha who wants to be a knight." },
            { front: "Sancho Panza 🫏", back: "His loyal neighbor and helper." },
            { front: "Rocinante 🐴", back: "Don Quijote's skinny old horse." },
            { front: "los molinos de viento 🌬️", back: "windmills. Don Quijote thinks they are giants!" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Miguel de Cervantes {0} Don Quijote. ✍️ Don Quijote vivió en La {1}. Su amigo leal se llama Sancho {2}. Don Quijote atacó los {3} de viento. Pensó que eran gigantes.",
          blanks: [{ answers: ["escribió"] }, { answers: ["Mancha"] }, { answers: ["Panza"] }, { answers: ["molinos"] }],
          bank: ["escribió", "Mancha", "Panza", "molinos", "escribí", "Rocinante", "castillos"],
          hint: "Cervantes is he, so use escribió. Don Quijote is from La Mancha. His friend is Sancho Panza. He attacked windmills: molinos de viento.",
          mistakes: [
            { match: "escribí", coach: "Escribí means I wrote. Cervantes is he, so use escribió." },
            { match: "Rocinante", coach: "Rocinante is the horse. His friend is Sancho Panza." },
            { match: "castillos", coach: "Castillos are castles. Don Quijote attacked windmills, molinos de viento." },
          ],
          seconds: 50,
        },
        think: {
          q: "Why did Don Quijote attack the windmills?",
          choices: ["He thought they were giants.", "He wanted to fix them.", "Sancho Panza told him to."],
          answer: 0,
          why: "He read so many knight stories that he thought the windmills were giants.",
          hints: [
            "",
            "He didn't want to fix them. His imagination turned them into something else.",
            "Sancho Panza tried to tell him they were only windmills!",
          ],
        },
        approaches: {
          analogy:
            "Don Quijote is like a boy who reads so many dragon books that every shadow looks like a dragon. His imagination runs ahead of his eyes.",
          example:
            "Sancho Panza says, Those are windmills, sir! Don Quijote says, No, they are giants! He charges on Rocinante, a windmill sail catches him, and he tumbles to the ground. Sancho helps him up.",
          simpler: {
            q: "Who wrote Don Quijote?",
            choices: ["Antoni Gaudí", "Miguel de Cervantes"],
            answer: 1,
            why: "Miguel de Cervantes wrote Don Quijote.",
            hints: ["Gaudí was an architect who designed buildings, not a writer.", ""],
          },
        },
      },
      {
        title: "La Sagrada Familia",
        teach:
          "In the city of Barcelona stands la Sagrada Familia (sah-GRAH-dah fah-MEE-lyah), a giant church with towers that reach for the sky. ⛪ Work began in 1882. The next year, a young architect named Antoni Gaudí (ahn-TOH-nee gow-DEE) took charge. Gaudí loved nature. Inside, the stone columns branch out like trees in a forest. 🌳 Gaudí worked on the church for more than 40 years, until he died in 1926. Builders are still finishing it today, more than 140 years after it began. That is patience! Gaudí diseñó la iglesia. Gaudí designed the church. Diseñar is an -ar verb, so he designed is diseñó.",
        visual: {
          type: "flip",
          cards: [
            { front: "la Sagrada Familia ⛪", back: "A giant church in Barcelona. Work began in 1882." },
            { front: "Antoni Gaudí 📐", back: "The architect. He worked on it from 1883 until he died in 1926." },
            { front: "columns like trees 🌳", back: "Inside, the stone columns branch out like a forest." },
            { front: "Gaudí diseñó ✏️", back: "Gaudí designed. Diseñar is an -ar verb: diseñó." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Work on the Sagrada Familia began in 1882. Gaudí died in 1926. How many years after the start did Gaudí die?",
          answer: 44,
          hint: "Subtract: 1926 minus 1882.",
          mistakes: [
            { match: "43", coach: "43 is how long Gaudí himself worked on it, from 1883. Count from 1882." },
            { match: "140", coach: "140 years is how long it has been since work began. Subtract 1882 from 1926." },
          ],
          seconds: 40,
        },
        think: {
          q: "What did Gaudí copy from nature inside the church?",
          choices: ["Columns that branch like trees", "Walls made of ice", "A roof made of leaves"],
          answer: 0,
          why: "Gaudí loved nature, so the stone columns branch out like trees in a forest.",
          hints: [
            "",
            "The church is made of stone, not ice. Think of a forest.",
            "The roof is stone. The columns look like something in a forest.",
          ],
        },
        approaches: {
          analogy:
            "Building the Sagrada Familia is like a relay race. Gaudí ran a long leg of the race, and then other builders took the baton and kept going.",
          example:
            "A girl visits Barcelona and walks inside. She looks up and says, ¡Es como un bosque! It is like a forest! The columns rise and branch out like trees, just as Gaudí planned.",
          simpler: {
            q: "In which city is the Sagrada Familia?",
            choices: ["Granada", "Barcelona", "Santiago"],
            answer: 1,
            why: "The Sagrada Familia is in Barcelona.",
            hints: ["Granada has the Alhambra.", "", "Santiago is at the end of the Camino."],
          },
        },
      },
      {
        title: "El Camino de Santiago",
        teach:
          "El Camino de Santiago (kah-MEE-noh deh sahn-tee-AH-goh) is a very old walking road across northern Spain. It leads to the city of Santiago de Compostela and its great cathedral. People have walked it for more than 1,000 years. 🚶 The walkers are called peregrinos (peh-reh-GREE-nohs), pilgrims. The most famous route is about 500 miles long, and most walkers take about a month. Yellow arrows, las flechas amarillas, point the way. ➡️ The scallop shell, la concha (KOHN-chah), is the symbol of the Camino. 🐚 When walkers pass each other, they say ¡Buen Camino! Have a good walk!",
        visual: {
          type: "flip",
          cards: [
            { front: "el Camino 🛤️", back: "the way, the road. Say: kah-MEE-noh." },
            { front: "los peregrinos 🚶", back: "the pilgrims who walk the Camino" },
            { front: "las flechas amarillas ➡️", back: "the yellow arrows that point the way" },
            { front: "la concha 🐚", back: "the scallop shell, symbol of the Camino" },
            { front: "¡Buen Camino! 👋", back: "Have a good walk! What walkers say to each other." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Camino word to its meaning.",
          pairs: [
            { left: "los peregrinos", right: "the walkers, or pilgrims 🚶" },
            { left: "las flechas amarillas", right: "yellow arrows that point the way ➡️" },
            { left: "la concha", right: "the scallop shell symbol 🐚" },
            { left: "¡Buen Camino!", right: "what walkers say to each other 👋" },
            { left: "la catedral", right: "the great church at the end ⛪" },
          ],
          hint: "Peregrinos walk, flechas point, la concha is a shell, and ¡Buen Camino! is a greeting.",
          mistakes: [{ match: "Mixed up la concha and las flechas", coach: "La concha is a shell. Las flechas amarillas are yellow arrows." }],
          seconds: 45,
        },
        think: {
          q: "What is the symbol of the Camino de Santiago?",
          choices: ["a red lion", "a windmill", "the scallop shell"],
          answer: 2,
          why: "The scallop shell, la concha, is the symbol of the Camino.",
          hints: [
            "Lions are in the Patio de los Leones at the Alhambra.",
            "Windmills are from Don Quijote's La Mancha.",
            "",
          ],
        },
        approaches: {
          analogy:
            "The yellow arrows on the Camino are like the trail markers in a national park. Follow them, and you never get lost.",
          example:
            "A peregrino starts walking in the east. Each day he follows las flechas amarillas and walks many miles. Other walkers say ¡Buen Camino! After about a month, he reaches the cathedral in Santiago.",
          simpler: {
            q: "What do you call the walkers on the Camino?",
            choices: ["los peregrinos", "los molinos"],
            answer: 0,
            why: "The walkers are los peregrinos, the pilgrims.",
            hints: ["", "Los molinos are windmills, from Don Quijote."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put these moments in Spain's history in order, from oldest to newest.",
      steps: [
        "Muslim rulers cross into Spain from North Africa.",
        "People begin walking the Camino de Santiago.",
        "The Nasrid kings begin building the Alhambra.",
        "Ferdinand and Isabella take Granada, and Columbus sails.",
        "Cervantes publishes the first part of Don Quijote.",
        "Work begins on the Sagrada Familia.",
      ],
    },
    explain: {
      prompt: "You are a tour guide in Spain! Tell Señora Luz about three of Spain's treasures: what each one is, where it is and one interesting fact.",
      keyPoints: [
        "the Alhambra is a palace and fortress in Granada",
        "Cervantes wrote Don Quijote, who attacked windmills",
        "Gaudí designed the Sagrada Familia in Barcelona",
        "the Camino de Santiago is a very old walking road",
        "walkers follow yellow arrows and the scallop shell",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Which city? Sort each treasure.",
        buckets: ["Granada 🏰", "Barcelona ⛪", "Santiago de Compostela 🐚"],
        items: [
          { text: "la Alhambra", bucket: 0 },
          { text: "el Patio de los Leones", bucket: 0 },
          { text: "la Sagrada Familia", bucket: 1 },
          { text: "the church Gaudí designed", bucket: 1 },
          { text: "the cathedral at the end of the Camino", bucket: 2 },
          { text: "where the peregrinos finish", bucket: 2 },
        ],
        hint: "The Alhambra is in Granada. Gaudí's church is in Barcelona. The Camino ends in Santiago de Compostela.",
        mistakes: [{ match: "el Patio de los Leones", coach: "The Patio de los Leones is inside the Alhambra, in Granada." }],
        seconds: 45,
      },
      {
        type: "match",
        prompt: "These Spanish words came from Arabic. Match each one to its meaning.",
        pairs: [
          { left: "azúcar", right: "sugar 🍬" },
          { left: "aceite", right: "oil 🫒" },
          { left: "almohada", right: "pillow 🛏️" },
          { left: "ajedrez", right: "chess ♟️" },
        ],
        hint: "Azúcar is sweet, aceite comes from olives, almohada is on your bed and ajedrez is a board game.",
        mistakes: [{ match: "Mixed up aceite and azúcar", coach: "Azúcar is sweet sugar. Aceite is oil, like olive oil." }],
        seconds: 40,
      },
      {
        type: "number",
        prompt: "The first part of Don Quijote came out in 1605. The second part came out in 1615. How many years apart were they?",
        answer: 10,
        hint: "Subtract: 1615 minus 1605.",
        mistakes: [{ match: "20", coach: "Check the tens: 1615 minus 1605 is 10." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build the sentence: Cervantes wrote Don Quijote. ✍️",
        tiles: ["Cervantes", "escribió", "Don", "Quijote"],
        distractors: ["escribí", "Gaudí"],
        hint: "Cervantes is he, so use escribió. Then the name of the book.",
        mistakes: [
          { match: "escribí", coach: "Escribí means I wrote. Cervantes is he: escribió." },
          { match: "Gaudí", coach: "Gaudí designed the Sagrada Familia. Cervantes wrote the book." },
        ],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Where is the Alhambra?",
        choices: ["Barcelona", "La Mancha", "Granada"],
        answer: 2,
        why: "The Alhambra stands on a hill above Granada, in the south of Spain.",
      },
      {
        q: "Who designed the Sagrada Familia?",
        choices: ["Miguel de Cervantes", "Antoni Gaudí", "Sancho Panza"],
        answer: 1,
        why: "The architect Antoni Gaudí designed the Sagrada Familia.",
      },
      {
        q: "What do walkers on the Camino de Santiago follow?",
        choices: ["Yellow arrows and the scallop shell", "Red lions", "Windmills"],
        answer: 0,
        why: "Yellow arrows and the scallop shell mark the way to Santiago.",
      },
      {
        q: "What did Don Quijote think the windmills were?",
        choices: ["Castles", "Giants", "Horses"],
        answer: 1,
        why: "Don Quijote thought the windmills were giants and charged at them.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make a travel poster for one of Spain's treasures: the Alhambra, the Sagrada Familia, the Camino de Santiago or Don Quijote's La Mancha. Draw it and write four sentences in Spanish, like Está en Granada, Es muy antigua or Gaudí diseñó la iglesia. Then present your poster to your family like a tour guide.",
      rubric: [
        "Picks one treasure and draws it",
        "Writes four sentences in Spanish",
        "Includes at least one true fact, like a city, a date or a person",
        "Presents the poster aloud like a tour guide",
      ],
    },
  },
]);
