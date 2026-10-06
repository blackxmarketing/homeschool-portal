import { k5Course } from "./base";

/**
 * span-1: Grade 1 Spanish (an elective), ACTFL Novice Low. Builds on
 * kindergarten (greetings, numbers 1-10, colors, family, animals, feelings).
 * Everything is read aloud by Señora Luz, so sentences are short and every
 * new word gets a pronunciation hint the first time it appears.
 */
export const span1 = k5Course("span", 1, [
  // 1. Numbers 11-20
  {
    id: "span-1.numbers",
    title: "Números: 11 to 20",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.1.1", "SPAN.1.7", "SPAN.1.10", "SPAN.1.11", "SPAN.1.12"],
    read: [
      "¡Hola, amigos! Last year you counted from uno to diez. Now we count higher!",
      "once (OHN-seh) is 11. doce (DOH-seh) is 12. trece (TREH-seh) is 13. catorce (kah-TOR-seh) is 14. quince (KEEN-seh) is 15.",
      "Then comes a pattern. diez (dee-ES) means ten. dieciséis (dee-eh-see-SAYS) is 16. It sounds like ten and six. diecisiete (dee-eh-see-see-EH-teh) is 17. dieciocho (dee-eh-see-OH-choh) is 18. diecinueve (dee-eh-see-NWEH-beh) is 19.",
      "Last comes veinte (BAYN-teh). That is 20!",
      "To ask how many, say ¿Cuántos? (KWAN-tohs). In Spanish, a question starts with an upside-down mark. Count the things. Then answer with a number. How many fingers and toes do you have? ¡Veinte!",
    ].join("\n\n"),
    keyIdeas: [
      "once, doce, trece, catorce, quince are 11 to 15.",
      "dieciséis to diecinueve sound like ten and six, ten and seven, ten and eight, ten and nine.",
      "veinte is 20, and ¿Cuántos? means how many.",
    ],
    hook: {
      text: "¡Hola! 👋 Hold up all your fingers. Now wiggle your toes! 🦶 How many do you have in all? Let's count them in Spanish!",
    },
    teach: [
      {
        title: "Once to quince",
        teach:
          "You know diez. That is 10. Now let's go past ten! once (OHN-seh) is 11. doce (DOH-seh) is 12. trece (TREH-seh) is 13. catorce (kah-TOR-seh) is 14. quince (KEEN-seh) is 15. Say them with me: once, doce, trece, catorce, quince. These five words are special. We just remember them. Clap one time for each number! 👏",
        visual: {
          type: "flip",
          cards: [
            { front: "11", back: "once (OHN-seh)" },
            { front: "12", back: "doce (DOH-seh)" },
            { front: "13", back: "trece (TREH-seh)" },
            { front: "14", back: "catorce (kah-TOR-seh)" },
            { front: "15", back: "quince (KEEN-seh)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each number to its Spanish word.",
          pairs: [
            { left: "11", right: "once" },
            { left: "12", right: "doce" },
            { left: "13", right: "trece" },
            { left: "14", right: "catorce" },
            { left: "15", right: "quince" },
          ],
          hint: "Count in order: once is 11, doce is 12, trece is 13, catorce is 14, quince is 15.",
          mistakes: [
            { match: "once and quince mixed up", coach: "once is 11. quince is 15. Quince has the K sound at the start: KEEN-seh." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which word means 15?",
          choices: ["once", "quince", "doce"],
          answer: 1,
          why: "quince (KEEN-seh) is 15.",
          hints: [
            "once sounds a bit like quince, but once is 11.",
            "",
            "doce is 12. Count up three more to get to 15.",
          ],
        },
        approaches: {
          analogy:
            "These numbers are like new friends' names. There is no trick. You just say them again and again until you know them.",
          example:
            "Count five spoons past ten. Ten spoons is diez. Add one: once. Add one: doce. Then trece, catorce, quince. Fifteen spoons!",
          simpler: {
            q: "What number is diez?",
            choices: ["10", "5"],
            answer: 0,
            why: "diez is 10. You learned it last year.",
            hints: ["", "5 is cinco. diez is the number after nueve."],
          },
        },
      },
      {
        title: "Ten and six",
        teach:
          "Now comes a fun pattern. 🧩 diez means 10. Listen to dieciséis (dee-eh-see-SAYS). It sounds like diez y seis: ten and six. 10 and 6 make 16! diecisiete (dee-eh-see-see-EH-teh) is ten and seven. That is 17. dieciocho (dee-eh-see-OH-choh) is ten and eight. That is 18. diecinueve (dee-eh-see-NWEH-beh) is ten and nine. That is 19. Can you hear the diez at the start?",
        visual: {
          type: "flip",
          cards: [
            { front: "dieciséis", back: "ten and six: 16" },
            { front: "diecisiete", back: "ten and seven: 17" },
            { front: "dieciocho", back: "ten and eight: 18" },
            { front: "diecinueve", back: "ten and nine: 19" },
          ],
        },
        probe: {
          type: "number",
          prompt: "dieciocho sounds like ten and ocho. ocho is 8. What number is dieciocho? Type it.",
          answer: 18,
          hint: "dieci means ten and. Ten and eight make 18.",
          mistakes: [
            { match: "8", coach: "Close! Don't forget the diez at the start. Ten and eight make 18." },
            { match: "80", coach: "dieciocho is ten and eight, not eighty. Try 18." },
          ],
          seconds: 30,
        },
        think: {
          q: "diecisiete sounds like ten and siete. What number is it?",
          choices: ["7", "70", "17"],
          answer: 2,
          why: "Ten and seven make 17.",
          hints: [
            "7 is just siete. diecisiete has diez at the start too.",
            "70 is much bigger. Ten and seven make a smaller number.",
            "",
          ],
        },
        approaches: {
          analogy:
            "It is like a train. 🚂 The first car is always diez. The next car tells you how many more. diez and seis: ten and six.",
          example:
            "Hold up ten fingers. Then a friend holds up six more. Ten and six. That is dieciséis, 16!",
          simpler: {
            q: "What is ten and six?",
            choices: ["4", "16"],
            answer: 1,
            why: "Ten and six make 16. In Spanish that is dieciséis.",
            hints: ["4 is ten take away six. We are adding, so the number gets bigger.", ""],
          },
        },
      },
      {
        title: "Veinte and ¿Cuántos?",
        teach:
          "The last number today is veinte (BAYN-teh). veinte is 20. 🎉 Count your fingers: ten. Count your toes: ten more. ¡Veinte! Now a question word. ¿Cuántos? (KWAN-tohs) means how many. A friend asks, ¿Cuántos? You count and say the number. Look at the question mark. In Spanish, a question starts with an upside-down mark, ¿, and ends with a regular one.",
        visual: {
          type: "flip",
          cards: [
            { front: "veinte", back: "20 (BAYN-teh)" },
            { front: "¿Cuántos?", back: "How many? (KWAN-tohs)" },
            { front: "¿", back: "An upside-down question mark. Spanish questions start with it." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Put each Spanish number on the number line.",
          min: 10,
          max: 20,
          step: 1,
          tolerance: 0,
          items: [
            { label: "once", value: 11 },
            { label: "quince", value: 15 },
            { label: "dieciocho", value: 18 },
            { label: "veinte", value: 20 },
          ],
          hint: "once is 11. quince is 15. dieciocho is ten and eight. veinte is 20, the very end.",
          seconds: 45,
        },
        think: {
          q: "A friend asks you, ¿Cuántos? What should you say?",
          choices: ["A number", "Adiós", "A color"],
          answer: 0,
          why: "¿Cuántos? means how many, so you answer with a number.",
          hints: [
            "",
            "Adiós means goodbye. ¿Cuántos? asks how many.",
            "A color tells what something looks like. ¿Cuántos? asks how many.",
          ],
        },
        approaches: {
          analogy:
            "¿Cuántos? is like a counting bell. 🔔 When you hear it, you start counting and say the number.",
          example:
            "Mom points to the eggs. 🥚 ¿Cuántos? You count: uno, dos ... doce. You say: ¡Doce! There are 12 eggs.",
          simpler: {
            q: "What number is veinte?",
            choices: ["2", "20", "12"],
            answer: 1,
            why: "veinte is 20, all your fingers and toes.",
            hints: ["2 is dos. veinte is much bigger.", "", "12 is doce. veinte is 20."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the numbers in order, from 11 to 20.",
      steps: ["once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"],
    },
    explain: {
      prompt: "Count from 11 to 20 in Spanish. What pattern do you hear in dieciséis to diecinueve?",
      keyPoints: [
        "once, doce, trece, catorce, quince are 11 to 15",
        "dieciséis to diecinueve sound like ten and six, ten and seven, and so on",
        "veinte is 20",
        "¿Cuántos? means how many",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each number to its Spanish word.",
        pairs: [
          { left: "12", right: "doce" },
          { left: "14", right: "catorce" },
          { left: "17", right: "diecisiete" },
          { left: "20", right: "veinte" },
        ],
        hint: "doce is 12, catorce is 14, diecisiete is ten and seven, veinte is 20.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "What number is quince? Type it.",
        answer: 15,
        hint: "Count: once 11, doce 12, trece 13, catorce 14, quince ...",
        mistakes: [
          { match: "11", coach: "That is once. quince (KEEN-seh) is four more." },
          { match: "5", coach: "5 is cinco. quince is bigger than ten." },
        ],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "Count with me: once, doce, {0}, catorce, {1}.",
        blanks: [{ answers: ["trece"] }, { answers: ["quince"] }],
        bank: ["trece", "quince", "veinte", "diez"],
        hint: "11, 12, 13, 14, 15. trece is 13 and quince is 15.",
        mistakes: [
          { match: "veinte", coach: "veinte is 20. That comes later." },
          { match: "diez", coach: "diez is 10. We already passed it." },
        ],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Sort the numbers: 11 to 15, or 16 to 20?",
        buckets: ["11 to 15", "16 to 20"],
        items: [
          { text: "once", bucket: 0 },
          { text: "trece", bucket: 0 },
          { text: "quince", bucket: 0 },
          { text: "dieciséis", bucket: 1 },
          { text: "diecinueve", bucket: 1 },
          { text: "veinte", bucket: 1 },
        ],
        hint: "Words that start with dieci are 16 to 19. veinte is 20.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What number is doce?",
        choices: ["12", "2", "20"],
        answer: 0,
        why: "doce (DOH-seh) is 12.",
      },
      {
        q: "How do you say 20 in Spanish?",
        choices: ["diez", "veinte", "doce"],
        answer: 1,
        why: "veinte (BAYN-teh) is 20.",
      },
      {
        q: "What does ¿Cuántos? mean?",
        choices: ["Hello", "Thank you", "How many?"],
        answer: 2,
        why: "¿Cuántos? (KWAN-tohs) asks how many.",
      },
      {
        q: "Which number comes after quince?",
        choices: ["catorce", "dieciséis", "once"],
        answer: 1,
        why: "quince is 15, and dieciséis is 16.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "With a parent, find 20 small things in the kitchen, like spoons or grapes. Count them out loud in Spanish, from uno to veinte. Then your parent points to a pile and asks ¿Cuántos? Answer with a Spanish number.",
      rubric: [
        "Counted from uno to veinte in order",
        "Said once to veinte clearly",
        "Answered ¿Cuántos? with the right Spanish number",
      ],
    },
  },

  // 2. Body parts
  {
    id: "span-1.body",
    title: "Mi cuerpo: My Body",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.1.2", "SPAN.1.7", "SPAN.1.10"],
    read: [
      "Your body is amazing! Let's name it in Spanish.",
      "la cabeza (kah-BEH-sah) is your head. los ojos (OH-hohs) are your eyes. la nariz (nah-REES) is your nose. la boca (BOH-kah) is your mouth. las orejas (oh-REH-hahs) are your ears.",
      "los brazos (BRAH-sohs) are your arms. las manos (MAH-nohs) are your hands. los dedos (DEH-dohs) are your fingers. las piernas (pee-EHR-nahs) are your legs. los pies (pee-EHS) are your feet.",
      "Tengo (TEN-goh) means I have. Tengo dos manos. I have two hands. Tengo diez dedos. I have ten fingers.",
      "Señala (seh-NYAH-lah) means point to. When someone says Señala la nariz, point to your nose!",
      "Your body helps you learn about the world. You see with los ojos. You hear with las orejas. You smell with la nariz. You taste with la boca.",
    ].join("\n\n"),
    keyIdeas: [
      "la cabeza, los ojos, la nariz, la boca and las orejas are on your head.",
      "los brazos, las manos, las piernas and los pies help you move.",
      "Tengo means I have, and Señala means point to.",
    ],
    hook: {
      text: "Touch your head. 🙆 Now touch your nose. 👃 Now wiggle your feet! 🦶 Today we learn body words in Spanish.",
    },
    teach: [
      {
        title: "Mi cara: my face",
        teach:
          "Let's start at the top! la cabeza (kah-BEH-sah) is your head. 🙂 los ojos (OH-hohs) are your eyes. 👀 la nariz (nah-REES) is your nose. 👃 la boca (BOH-kah) is your mouth. 👄 las orejas (oh-REH-hahs) are your ears. 👂 Point to each one as you say it. Cabeza, ojos, nariz, boca, orejas. ¡Muy bien! That means very good!",
        visual: {
          type: "hotspots",
          title: "Mi cara",
          center: "🙂",
          spots: [
            { label: "la cabeza", icon: "🙆", detail: "Your head (kah-BEH-sah)." },
            { label: "los ojos", icon: "👀", detail: "Your eyes (OH-hohs)." },
            { label: "la nariz", icon: "👃", detail: "Your nose (nah-REES)." },
            { label: "la boca", icon: "👄", detail: "Your mouth (BOH-kah)." },
            { label: "las orejas", icon: "👂", detail: "Your ears (oh-REH-hahs)." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its Spanish word.",
          pairs: [
            { left: "👀", right: "los ojos" },
            { left: "👃", right: "la nariz" },
            { left: "👄", right: "la boca" },
            { left: "👂", right: "las orejas" },
          ],
          hint: "ojos are eyes, nariz is nose, boca is mouth, orejas are ears.",
          seconds: 40,
        },
        think: {
          q: "What is la nariz?",
          choices: ["Your nose", "Your ear", "Your hand"],
          answer: 0,
          why: "la nariz (nah-REES) is your nose.",
          hints: ["", "Your ears are las orejas.", "Your hands are las manos. We learn that soon."],
        },
        approaches: {
          analogy:
            "Your face is like a little house. 🏠 los ojos are the windows. la boca is the door. la nariz sits in the middle.",
          example:
            "Look in a mirror. 🪞 Touch your eyes: los ojos. Touch your nose: la nariz. Touch your mouth: la boca. Touch your ears: las orejas.",
          simpler: {
            q: "What are los ojos?",
            choices: ["Your feet", "Your eyes"],
            answer: 1,
            why: "los ojos (OH-hohs) are your eyes. 👀",
            hints: ["Your feet are los pies. los ojos are up on your face.", ""],
          },
        },
      },
      {
        title: "Arms, hands, legs and feet",
        teach:
          "Now let's move! 💪 los brazos (BRAH-sohs) are your arms. ✋ las manos (MAH-nohs) are your hands. los dedos (DEH-dohs) are your fingers. 🦵 las piernas (pee-EHR-nahs) are your legs. 🦶 los pies (pee-EHS) are your feet. Here is a helpful word: tengo (TEN-goh). It means I have. Tengo dos manos. I have two hands. Tengo diez dedos. I have ten fingers!",
        visual: {
          type: "flip",
          cards: [
            { front: "💪 los brazos", back: "arms (BRAH-sohs)" },
            { front: "✋ las manos", back: "hands (MAH-nohs)" },
            { front: "☝️ los dedos", back: "fingers (DEH-dohs)" },
            { front: "🦵 las piernas", back: "legs (pee-EHR-nahs)" },
            { front: "🦶 los pies", back: "feet (pee-EHS)" },
            { front: "Tengo", back: "I have (TEN-goh)" },
          ],
        },
        probe: {
          type: "cloze",
          text: "✋ Tengo dos {0}. 🦶 Tengo dos {1}.",
          blanks: [{ answers: ["manos"] }, { answers: ["pies"] }],
          bank: ["manos", "pies", "nariz", "boca"],
          hint: "✋ is a hand: manos. 🦶 is a foot: pies.",
          mistakes: [
            { match: "nariz", coach: "You have just one nariz. Look at the picture: a hand or a foot." },
            { match: "boca", coach: "You have just one boca. Look at the picture: a hand or a foot." },
          ],
          seconds: 30,
        },
        think: {
          q: "What does Tengo dos pies mean?",
          choices: ["I have two hands", "I have two feet", "I have two eyes"],
          answer: 1,
          why: "Tengo means I have, and los pies are feet.",
          hints: ["Hands are las manos. pies are down at the bottom.", "", "Eyes are los ojos. pies are what you walk on."],
        },
        approaches: {
          analogy:
            "Think of a puppet with strings. 🪆 Pull the brazos and the arms go up. Pull the piernas and the legs kick!",
          example:
            "Stand up. Wave your brazos. Clap your manos. Wiggle your dedos. Kick your piernas. Stomp your pies. You just used five new words!",
          simpler: {
            q: "What are las manos?",
            choices: ["Hands", "Legs", "Ears"],
            answer: 0,
            why: "las manos (MAH-nohs) are hands. ✋",
            hints: ["", "Legs are las piernas.", "Ears are las orejas."],
          },
        },
      },
      {
        title: "Señala: point to it!",
        teach:
          "Let's play a game! Señala (seh-NYAH-lah) means point to. I say, Señala la boca. You point to your mouth! 👄 Señala los pies. Point to your feet! 🦶 Our bodies help us learn, like scientists. 🔬 We see with los ojos. We hear with las orejas. We smell with la nariz. We taste with la boca.",
        visual: {
          type: "hotspots",
          title: "We learn with our bodies",
          center: "🔬",
          spots: [
            { label: "Ver: to see", icon: "👀", detail: "We see with los ojos." },
            { label: "Oír: to hear", icon: "👂", detail: "We hear with las orejas." },
            { label: "Oler: to smell", icon: "👃", detail: "We smell with la nariz." },
            { label: "Probar: to taste", icon: "👅", detail: "We taste with la boca." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: Point to the nose.",
          tiles: ["Señala", "la", "nariz"],
          distractors: ["boca", "Tengo"],
          hint: "Start with Señala, which means point to. Then la nariz.",
          seconds: 30,
        },
        think: {
          q: "Señala las orejas. What do you point to?",
          choices: ["Your nose", "Your feet", "Your ears"],
          answer: 2,
          why: "las orejas (oh-REH-hahs) are your ears.",
          hints: ["Your nose is la nariz.", "Your feet are los pies.", ""],
        },
        approaches: {
          analogy:
            "Señala is like Simon Says. The leader names a body part and everyone points to it, fast!",
          example:
            "Dad says, Señala la cabeza. You point to your head. 🙆 Dad says, Señala las manos. You hold up your hands. ✋",
          simpler: {
            q: "What does Señala mean?",
            choices: ["Point to", "Goodbye"],
            answer: 0,
            why: "Señala (seh-NYAH-lah) means point to.",
            hints: ["", "Goodbye is adiós. Señala asks you to point."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the body words: on my face, or not on my face?",
      buckets: ["On my face 🙂", "Not on my face 🦵"],
      items: [
        { text: "los ojos", bucket: 0 },
        { text: "la nariz", bucket: 0 },
        { text: "la boca", bucket: 0 },
        { text: "los brazos", bucket: 1 },
        { text: "las manos", bucket: 1 },
        { text: "las piernas", bucket: 1 },
        { text: "los pies", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Point to five body parts and name each one in Spanish. What do Tengo and Señala mean?",
      keyPoints: [
        "Names face parts like los ojos, la nariz, la boca",
        "Names parts like las manos, los brazos, las piernas, los pies",
        "Tengo means I have",
        "Señala means point to",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "What do we use? Match each one to the body part.",
        pairs: [
          { left: "We see with ...", right: "los ojos" },
          { left: "We hear with ...", right: "las orejas" },
          { left: "We smell with ...", right: "la nariz" },
          { left: "We taste with ...", right: "la boca" },
        ],
        hint: "ojos are eyes, orejas are ears, nariz is nose, boca is mouth.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Tengo dos manos. Each mano has 5 dedos. How many dedos in all?",
        answer: 10,
        hint: "Count the fingers on both hands: 5 and 5.",
        mistakes: [{ match: "5", coach: "That is one hand. Tengo dos manos, so add the other hand too." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "🦵 Tengo dos {0}. 💪 Tengo dos {1}.",
        blanks: [{ answers: ["piernas"] }, { answers: ["brazos"] }],
        bank: ["piernas", "brazos", "ojos", "cabeza"],
        hint: "🦵 is a leg: piernas. 💪 is an arm: brazos.",
        mistakes: [
          { match: "ojos", coach: "ojos are eyes. Look at the picture again." },
          { match: "cabeza", coach: "You have just one cabeza, your head." },
        ],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: I have two eyes.",
        tiles: ["Tengo", "dos", "ojos"],
        distractors: ["Señala", "pies"],
        hint: "Tengo means I have. dos is two. ojos are eyes.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What are los pies?",
        choices: ["Hands", "Eyes", "Feet"],
        answer: 2,
        why: "los pies (pee-EHS) are your feet.",
      },
      {
        q: "Señala la boca. What do you point to?",
        choices: ["Your mouth", "Your ear", "Your leg"],
        answer: 0,
        why: "la boca (BOH-kah) is your mouth.",
      },
      {
        q: "How do you say ears in Spanish?",
        choices: ["los ojos", "las orejas", "las manos"],
        answer: 1,
        why: "las orejas (oh-REH-hahs) are ears.",
      },
      {
        q: "What does Tengo dos manos mean?",
        choices: ["I have two feet", "I have two hands", "Point to your hands"],
        answer: 1,
        why: "Tengo means I have, and las manos are hands.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Play Señala with a parent. Your parent says Señala and a body part, like Señala la nariz. You point fast! Then switch: you give the commands in Spanish and your parent points.",
      rubric: [
        "Pointed to the right body part for at least five commands",
        "Gave at least three Señala commands in Spanish",
        "Used words from the face and from the arms and legs",
      ],
    },
  },

  // 3. Food I like
  {
    id: "span-1.food",
    title: "Me gusta la comida: Food I Like",
    minutes: 18,
    stage: "logic",
    standards: ["SPAN.1.3", "SPAN.1.7", "SPAN.1.8", "SPAN.1.9", "SPAN.1.12"],
    read: [
      "Yum! Let's talk about food. la comida (koh-MEE-dah) means food.",
      "la manzana (mahn-SAH-nah) is an apple. el plátano (PLAH-tah-noh) is a banana. el pan (pahn) is bread. el queso (KEH-soh) is cheese. la leche (LEH-cheh) is milk. el arroz (ah-ROHS) is rice.",
      "To say you like a food, say me gusta (meh GOO-stah). Me gusta el queso. I like cheese. To say you don't like it, say no me gusta. No me gusta el arroz. I don't like rice.",
      "To ask a friend, say ¿Te gusta? (teh GOO-stah). That means do you like it? ¿Te gusta el pan? Sí, me gusta!",
      "People in Spanish-speaking countries enjoy many foods. In Mexico, people eat tortillas (tor-TEE-yahs) made from corn. In Spain, people cook paella (pah-EH-yah), a rice dish. In Colombia and Venezuela, people eat arepas (ah-REH-pahs), round corn cakes. In Spain, lunch is often the biggest meal of the day.",
    ].join("\n\n"),
    keyIdeas: [
      "la manzana, el plátano, el pan, el queso, la leche and el arroz are foods.",
      "Me gusta means I like it. No me gusta means I don't like it.",
      "¿Te gusta? asks a friend: do you like it?",
      "Tortillas come from Mexico, paella from Spain, and arepas from Colombia and Venezuela.",
    ],
    hook: {
      text: "What is your favorite snack? 🍎 🧀 🍌 Today you'll say what you like in Spanish. ¡Vamos a comer! Let's eat!",
    },
    teach: [
      {
        title: "Food words",
        teach:
          "la comida (koh-MEE-dah) means food. Here are some yummy words. la manzana (mahn-SAH-nah) is an apple. 🍎 el plátano (PLAH-tah-noh) is a banana. 🍌 el pan (pahn) is bread. 🍞 el queso (KEH-soh) is cheese. 🧀 la leche (LEH-cheh) is milk. 🥛 el arroz (ah-ROHS) is rice. 🍚 Say them with me: manzana, plátano, pan, queso, leche, arroz.",
        visual: {
          type: "flip",
          cards: [
            { front: "🍎", back: "la manzana (mahn-SAH-nah)" },
            { front: "🍌", back: "el plátano (PLAH-tah-noh)" },
            { front: "🍞", back: "el pan (pahn)" },
            { front: "🧀", back: "el queso (KEH-soh)" },
            { front: "🥛", back: "la leche (LEH-cheh)" },
            { front: "🍚", back: "el arroz (ah-ROHS)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each food to its Spanish word.",
          pairs: [
            { left: "🍎", right: "la manzana" },
            { left: "🍌", right: "el plátano" },
            { left: "🍞", right: "el pan" },
            { left: "🧀", right: "el queso" },
            { left: "🥛", right: "la leche" },
          ],
          hint: "manzana is apple, plátano is banana, pan is bread, queso is cheese, leche is milk.",
          seconds: 45,
        },
        think: {
          q: "What is el queso?",
          choices: ["Bread", "Cheese", "Milk"],
          answer: 1,
          why: "el queso (KEH-soh) is cheese. 🧀",
          hints: ["Bread is el pan.", "", "Milk is la leche."],
        },
        approaches: {
          analogy:
            "Learning food words is like a picnic basket. 🧺 Each time you learn a word, you put one more food in the basket.",
          example:
            "At lunch, point to your food and name it. This is el pan. This is el queso. This is la leche. Now you have a Spanish lunch!",
          simpler: {
            q: "What is la manzana?",
            choices: ["A banana", "An apple"],
            answer: 1,
            why: "la manzana (mahn-SAH-nah) is an apple. 🍎",
            hints: ["A banana is el plátano.", ""],
          },
        },
      },
      {
        title: "Me gusta, no me gusta",
        teach:
          "Now you can tell what you like! me gusta (meh GOO-stah) means I like it. 😋 Me gusta el pan. I like bread. Me gusta la manzana. I like apples. To say you don't like it, put no in front. 😝 No me gusta el queso. I don't like cheese. That's okay! Everyone likes different foods. What do you like?",
        visual: {
          type: "compare",
          left: { title: "😋 Me gusta", points: ["I like it", "Me gusta el pan.", "Me gusta la leche."] },
          right: { title: "😝 No me gusta", points: ["I don't like it", "No me gusta el arroz.", "No me gusta el queso."] },
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: I like bread.",
          tiles: ["Me", "gusta", "el", "pan"],
          distractors: ["no", "queso"],
          hint: "Start with Me gusta. Then el pan, which is bread.",
          seconds: 35,
        },
        think: {
          q: "What does No me gusta mean?",
          choices: ["I like it", "I don't like it", "Do you like it?"],
          answer: 1,
          why: "No in front turns it around: I don't like it.",
          hints: ["That is me gusta, without the no.", "", "That question is ¿Te gusta?"],
        },
        approaches: {
          analogy:
            "no is like a flip switch. 🔁 Me gusta is a happy face. Put no in front, and it flips to a yucky face.",
          example:
            "Sam loves bananas but not rice. Sam says: Me gusta el plátano. 😋 No me gusta el arroz. 😝",
          simpler: {
            q: "What does Me gusta mean?",
            choices: ["I like it", "Goodbye", "How many?"],
            answer: 0,
            why: "Me gusta (meh GOO-stah) means I like it.",
            hints: ["", "Goodbye is adiós.", "How many is ¿Cuántos?"],
          },
        },
      },
      {
        title: "¿Te gusta? Foods from far away",
        teach:
          "To ask a friend, say ¿Te gusta? (teh GOO-stah) It means do you like it? Sí, me gusta. Yes, I like it! People in Spanish-speaking countries enjoy many foods. 🌎 In Mexico, people eat tortillas (tor-TEE-yahs) made from corn. In Spain, people cook paella (pah-EH-yah), a rice dish. In Colombia and Venezuela, people eat arepas (ah-REH-pahs), round corn cakes.",
        visual: {
          type: "hotspots",
          title: "Foods from Spanish-speaking countries",
          center: "🌎",
          spots: [
            { label: "Mexico: tortillas", icon: "🌮", detail: "Thin, flat bread made from corn. People eat them with many meals." },
            { label: "Spain: paella", icon: "🥘", detail: "A rice dish cooked in a big, wide pan." },
            { label: "Colombia and Venezuela: arepas", icon: "🫓", detail: "Round corn cakes, often filled with cheese." },
            { label: "Spain: lunch", icon: "🍽️", detail: "In Spain, lunch is often the biggest meal of the day." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each country to a food people eat there.",
          pairs: [
            { left: "Mexico", right: "tortillas 🌮" },
            { left: "Spain", right: "paella 🥘" },
            { left: "Colombia", right: "arepas 🫓" },
          ],
          hint: "Tortillas from Mexico. Paella, a rice dish, from Spain. Arepas, corn cakes, from Colombia.",
          seconds: 35,
        },
        think: {
          q: "Your friend asks, ¿Te gusta el pan? You like bread. What do you say?",
          choices: ["Adiós", "No, no me gusta", "Sí, me gusta"],
          answer: 2,
          why: "Sí, me gusta means yes, I like it.",
          hints: ["Adiós means goodbye. Your friend asked about bread.", "That means you don't like it. But you do!", ""],
        },
        approaches: {
          analogy:
            "¿Te gusta? is like passing a ball. ⚽ You ask, and your friend catches it and answers: Sí, me gusta, or No, no me gusta.",
          example:
            "Ana holds up an arepa. ¿Te gusta? Luis tastes it. 😋 Sí, me gusta! Now Luis asks Ana: ¿Te gusta la paella?",
          simpler: {
            q: "What does ¿Te gusta? mean?",
            choices: ["Do you like it?", "I like it"],
            answer: 0,
            why: "¿Te gusta? (teh GOO-stah) asks: do you like it?",
            hints: ["", "I like it is me gusta. ¿Te gusta? is a question."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Does the speaker like it? Sort each sentence.",
      buckets: ["I like it 😋", "I don't like it 😝"],
      items: [
        { text: "Me gusta el pan.", bucket: 0 },
        { text: "No me gusta el queso.", bucket: 1 },
        { text: "Me gusta la leche.", bucket: 0 },
        { text: "No me gusta el arroz.", bucket: 1 },
        { text: "Sí, me gusta la manzana.", bucket: 0 },
        { text: "No, no me gusta el plátano.", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell me two foods you like and one you don't, in Spanish. How do you ask a friend if they like a food?",
      keyPoints: [
        "Me gusta means I like it",
        "No me gusta means I don't like it",
        "¿Te gusta? asks do you like it",
        "Names foods in Spanish, like el pan or la manzana",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "🍎 Me gusta la {0}. 🥛 Me gusta la {1}.",
        blanks: [{ answers: ["manzana"] }, { answers: ["leche"] }],
        bank: ["manzana", "leche", "pan", "queso"],
        hint: "🍎 is la manzana. 🥛 is la leche.",
        mistakes: [
          { match: "pan", coach: "pan is bread. Look at the picture again." },
          { match: "queso", coach: "queso is cheese. Look at the picture again." },
        ],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: I don't like rice.",
        tiles: ["No", "me", "gusta", "el", "arroz"],
        distractors: ["Sí", "pan"],
        hint: "Put No first, then me gusta, then el arroz.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌 ¿Cuántos plátanos? Type the number.",
        answer: 12,
        hint: "Count each banana. Touch them one at a time.",
        mistakes: [{ match: "10", coach: "Count again slowly. There are two more after ten." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match the Spanish to the English.",
        pairs: [
          { left: "Me gusta", right: "I like it" },
          { left: "No me gusta", right: "I don't like it" },
          { left: "¿Te gusta?", right: "Do you like it?" },
        ],
        hint: "Me gusta is I like it. Put no in front for I don't. ¿Te gusta? is the question.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does Me gusta mean?",
        choices: ["I don't like it", "I like it", "Do you like it?"],
        answer: 1,
        why: "Me gusta (meh GOO-stah) means I like it.",
      },
      {
        q: "What is el queso?",
        choices: ["Cheese", "Bread", "Milk"],
        answer: 0,
        why: "el queso (KEH-soh) is cheese. 🧀",
      },
      {
        q: "Which food is a rice dish from Spain?",
        choices: ["tortillas", "arepas", "paella"],
        answer: 2,
        why: "Paella (pah-EH-yah) is a rice dish from Spain.",
      },
      {
        q: "A friend asks, ¿Te gusta el pan? You like bread. What do you say?",
        choices: ["No, no me gusta.", "Sí, me gusta.", "¡Adiós!"],
        answer: 1,
        why: "Sí, me gusta means yes, I like it.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "At a family meal, name three foods on the table in Spanish. Say Me gusta or No me gusta for each one. Then ask a parent ¿Te gusta? about one food, and listen to the answer.",
      rubric: [
        "Named three foods in Spanish",
        "Used Me gusta or No me gusta correctly",
        "Asked ¿Te gusta? about a food",
      ],
    },
  },

  // 4. At school
  {
    id: "span-1.school",
    title: "En la escuela: At School",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.1.4", "SPAN.1.7", "SPAN.1.11"],
    read: [
      "Look at your school table! Let's name what you see in Spanish. la escuela (ehs-KWEH-lah) means school.",
      "el lápiz (LAH-pees) is a pencil. el crayón (krah-YOHN) is a crayon. el libro (LEE-broh) is a book. el papel (pah-PEHL) is paper.",
      "la regla (REH-glah) is a ruler. la silla (SEE-yah) is a chair. la mochila (moh-CHEE-lah) is a backpack. la mesa (MEH-sah) is a table.",
      "Did you notice el and la? Both mean the. English has just one word for the. Spanish has two. Many words that end in a use la, like la silla and la mesa.",
      "To ask what something is, say ¿Qué es? (keh ehs). To answer, say Es un (ehs oon) or Es una (ehs OO-nah). They mean it's a. Es un libro. It's a book. Es una silla. It's a chair.",
    ].join("\n\n"),
    keyIdeas: [
      "el lápiz, el crayón, el libro and el papel go on your desk.",
      "la regla, la silla, la mochila and la mesa are in the classroom too.",
      "el and la both mean the. ¿Qué es? means what is it?",
    ],
    hook: {
      text: "Pencils, books and backpacks! 🎒 Your school things have Spanish names too. Let's find out what they are!",
    },
    teach: [
      {
        title: "Things on my desk",
        teach:
          "la escuela (ehs-KWEH-lah) means school. Let's look at your desk. el lápiz (LAH-pees) is a pencil. ✏️ el crayón (krah-YOHN) is a crayon. 🖍️ el libro (LEE-broh) is a book. 📖 el papel (pah-PEHL) is paper. 📄 Pick up each one and say its name. Lápiz, crayón, libro, papel. ¡Excelente! That means excellent!",
        visual: {
          type: "flip",
          cards: [
            { front: "✏️", back: "el lápiz (LAH-pees)" },
            { front: "🖍️", back: "el crayón (krah-YOHN)" },
            { front: "📖", back: "el libro (LEE-broh)" },
            { front: "📄", back: "el papel (pah-PEHL)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its Spanish word.",
          pairs: [
            { left: "✏️", right: "el lápiz" },
            { left: "🖍️", right: "el crayón" },
            { left: "📖", right: "el libro" },
            { left: "📄", right: "el papel" },
          ],
          hint: "lápiz is pencil, crayón is crayon, libro is book, papel is paper.",
          seconds: 40,
        },
        think: {
          q: "What is el libro?",
          choices: ["A pencil", "Paper", "A book"],
          answer: 2,
          why: "el libro (LEE-broh) is a book. 📖",
          hints: ["A pencil is el lápiz.", "Paper is el papel.", ""],
        },
        approaches: {
          analogy:
            "A library is full of libros. 📚 The word library even sounds a little like libro!",
          example:
            "Open your pencil box. Take out a pencil: el lápiz. Take out a crayon: el crayón. Now open your book: el libro.",
          simpler: {
            q: "What is el lápiz?",
            choices: ["A pencil", "A chair"],
            answer: 0,
            why: "el lápiz (LAH-pees) is a pencil. ✏️",
            hints: ["", "A chair is la silla. el lápiz is for writing."],
          },
        },
      },
      {
        title: "El and la",
        teach:
          "Here are more school words. la regla (REH-glah) is a ruler. 📏 la silla (SEE-yah) is a chair. 🪑 la mochila (moh-CHEE-lah) is a backpack. 🎒 la mesa (MEH-sah) is a table. Did you hear el and la? Both mean the. English has just one word for the. Spanish has two! Here's a tip: many words that end in a use la.",
        visual: {
          type: "compare",
          left: { title: "el", points: ["el lápiz", "el crayón", "el libro", "el papel"] },
          right: { title: "la", points: ["la regla", "la silla", "la mochila", "la mesa"] },
        },
        probe: {
          type: "sort",
          prompt: "Does it use el or la?",
          buckets: ["el", "la"],
          items: [
            { text: "lápiz ✏️", bucket: 0 },
            { text: "libro 📖", bucket: 0 },
            { text: "papel 📄", bucket: 0 },
            { text: "silla 🪑", bucket: 1 },
            { text: "mochila 🎒", bucket: 1 },
            { text: "regla 📏", bucket: 1 },
          ],
          hint: "Words that end in a, like silla, mochila and regla, use la.",
          seconds: 45,
        },
        think: {
          q: "Which word goes with la?",
          choices: ["libro", "lápiz", "mochila"],
          answer: 2,
          why: "mochila ends in a, so it is la mochila.",
          hints: ["It is el libro. libro ends in o.", "It is el lápiz.", ""],
        },
        approaches: {
          analogy:
            "el and la are like two doors into the same room. Both mean the. Each word has its own door, so we learn them together.",
          example:
            "Say the whole thing, not just the word. Not silla. Say la silla. Not libro. Say el libro. Then you never forget!",
          simpler: {
            q: "What do el and la both mean?",
            choices: ["The", "And", "Yes"],
            answer: 0,
            why: "el and la both mean the.",
            hints: ["", "And is y in Spanish.", "Yes is sí in Spanish."],
          },
        },
      },
      {
        title: "¿Qué es? What is it?",
        teach:
          "Now let's play a guessing game! ¿Qué es? (keh ehs) means what is it? To answer, say Es un (ehs oon) or Es una (ehs OO-nah). Both mean it's a. Use un for el words and una for la words. I hold up a book. ¿Qué es? Es un libro! 📖 I hold up a chair. ¿Qué es? Es una silla! 🪑",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Qué es?", back: "What is it? (keh ehs)" },
            { front: "📖 Es un libro.", back: "It's a book." },
            { front: "🪑 Es una silla.", back: "It's a chair." },
            { front: "✏️ Es un lápiz.", back: "It's a pencil." },
          ],
        },
        probe: {
          type: "build",
          prompt: "¿Qué es? 📖 Build the answer: It's a book.",
          tiles: ["Es", "un", "libro"],
          distractors: ["una", "silla"],
          hint: "Start with Es. libro is an el word, so use un.",
          seconds: 30,
        },
        think: {
          q: "Someone holds up a backpack and asks ¿Qué es? What do you say?",
          choices: ["Es una mochila.", "Es un lápiz.", "Me gusta."],
          answer: 0,
          why: "A backpack is la mochila, so you say Es una mochila.",
          hints: ["", "A lápiz is a pencil. Look again: it's a backpack.", "Me gusta means I like it. They asked what it is."],
        },
        approaches: {
          analogy:
            "¿Qué es? is like a mystery box. 🎁 Someone pulls out a thing, and you name it with Es un or Es una.",
          example:
            "Mom holds up a ruler. ¿Qué es? You say: Es una regla. 📏 She holds up paper. ¿Qué es? Es un papel. 📄",
          simpler: {
            q: "What does ¿Qué es? mean?",
            choices: ["How many?", "What is it?"],
            answer: 1,
            why: "¿Qué es? (keh ehs) means what is it?",
            hints: ["How many is ¿Cuántos?", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the sentences that name something you write or draw with.",
      sentences: ["Es un lápiz. ✏️", "Es una silla. 🪑", "Es un crayón. 🖍️", "Es una mochila. 🎒", "Es una mesa."],
      correct: [0, 2],
    },
    explain: {
      prompt: "Hold up three school things and name them in Spanish. What do el and la mean?",
      keyPoints: [
        "Names school things like el lápiz, el libro, la silla",
        "el and la both mean the",
        "¿Qué es? means what is it",
        "Answers with Es un or Es una",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each picture to its Spanish word.",
        pairs: [
          { left: "🎒", right: "la mochila" },
          { left: "📏", right: "la regla" },
          { left: "🪑", right: "la silla" },
          { left: "📖", right: "el libro" },
        ],
        hint: "mochila is backpack, regla is ruler, silla is chair, libro is book.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "✏️ Es un {0}. 🎒 Es una {1}.",
        blanks: [{ answers: ["lápiz", "lapiz"] }, { answers: ["mochila"] }],
        bank: ["lápiz", "mochila", "silla", "libro"],
        hint: "✏️ is a pencil: lápiz. 🎒 is a backpack: mochila.",
        mistakes: [
          { match: "silla", coach: "silla is a chair. Look at the picture again." },
          { match: "libro", coach: "libro is a book. Look at the picture again." },
        ],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Does it use el or la?",
        buckets: ["el", "la"],
        items: [
          { text: "crayón", bucket: 0 },
          { text: "papel", bucket: 0 },
          { text: "mesa", bucket: 1 },
          { text: "regla", bucket: 1 },
        ],
        hint: "mesa and regla end in a, so they use la.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "🪑 Build the answer: It's a chair.",
        tiles: ["Es", "una", "silla"],
        distractors: ["un", "libro"],
        hint: "silla is a la word, so use una.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is la mochila?",
        choices: ["A backpack", "A chair", "A pencil"],
        answer: 0,
        why: "la mochila (moh-CHEE-lah) is a backpack. 🎒",
      },
      {
        q: "How do you say book in Spanish?",
        choices: ["el papel", "el libro", "la regla"],
        answer: 1,
        why: "el libro (LEE-broh) is a book.",
      },
      {
        q: "What does ¿Qué es? mean?",
        choices: ["How many?", "Do you like it?", "What is it?"],
        answer: 2,
        why: "¿Qué es? (keh ehs) asks what is it?",
      },
      {
        q: "Which word goes with la?",
        choices: ["lápiz", "silla", "libro"],
        answer: 1,
        why: "silla ends in a, so it is la silla.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Make Spanish labels for your school things. With a parent, write five sticky notes, like el lápiz, el libro, la silla, la mesa and la mochila. Stick each one on the right thing. Then your parent points and asks ¿Qué es?",
      rubric: [
        "Made five labels with el or la",
        "Put each label on the right thing",
        "Answered ¿Qué es? with Es un or Es una",
      ],
    },
  },

  // 5. Days of the week
  {
    id: "span-1.days",
    title: "Los días de la semana: Days of the Week",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.1.5", "SPAN.1.7", "SPAN.1.9", "SPAN.1.11", "SPAN.1.12"],
    read: [
      "A week has seven days. In Spanish, a week is la semana (seh-MAH-nah).",
      "lunes (LOO-nehs) is Monday. martes (MAR-tehs) is Tuesday. miércoles (mee-EHR-koh-lehs) is Wednesday. jueves (HWEH-behs) is Thursday. viernes (bee-EHR-nehs) is Friday. sábado (SAH-bah-doh) is Saturday. domingo (doh-MEEN-goh) is Sunday.",
      "Look closely! In Spanish, the days start with a small letter. We write lunes, not Lunes. In English, days start with a capital letter.",
      "In Spain, calendars start the week on lunes, Monday.",
      "To ask what day it is, say ¿Qué día es hoy? (keh DEE-ah ehs oy). hoy means today. Answer: Hoy es lunes. Today is Monday. mañana (mah-NYAH-nah) means tomorrow. Mañana es martes. Tomorrow is Tuesday.",
    ].join("\n\n"),
    keyIdeas: [
      "The days are lunes, martes, miércoles, jueves, viernes, sábado, domingo.",
      "In Spanish, day names start with a small letter.",
      "Hoy es means today is. Mañana es means tomorrow is.",
    ],
    hook: {
      text: "What day is it today? 📅 Every day has a Spanish name. Let's learn all seven!",
    },
    teach: [
      {
        title: "Lunes to jueves",
        teach:
          "la semana (seh-MAH-nah) means the week. A week has seven days. Here are the first four. lunes (LOO-nehs) is Monday. 🌙 It comes from luna, the moon! martes (MAR-tehs) is Tuesday. miércoles (mee-EHR-koh-lehs) is Wednesday. jueves (HWEH-behs) is Thursday. Say them with me: lunes, martes, miércoles, jueves. Clap the beats! 👏",
        visual: {
          type: "flip",
          cards: [
            { front: "lunes", back: "Monday (LOO-nehs)" },
            { front: "martes", back: "Tuesday (MAR-tehs)" },
            { front: "miércoles", back: "Wednesday (mee-EHR-koh-lehs)" },
            { front: "jueves", back: "Thursday (HWEH-behs)" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish day to the English day.",
          pairs: [
            { left: "lunes", right: "Monday" },
            { left: "martes", right: "Tuesday" },
            { left: "miércoles", right: "Wednesday" },
            { left: "jueves", right: "Thursday" },
          ],
          hint: "They go in order: lunes is Monday, then martes, miércoles, jueves.",
          seconds: 40,
        },
        think: {
          q: "What is lunes?",
          choices: ["Sunday", "Monday", "Friday"],
          answer: 1,
          why: "lunes (LOO-nehs) is Monday, the moon day.",
          hints: ["Sunday is domingo. We learn it soon.", "", "Friday is viernes. lunes is at the start of the week."],
        },
        approaches: {
          analogy:
            "The days are like a train with seven cars. 🚃 lunes is the first car, then martes, miércoles and jueves.",
          example:
            "Monday you go to the park. That is lunes. Tuesday you read a book. That is martes. Wednesday is miércoles. Thursday is jueves.",
          simpler: {
            q: "How many days are in a week?",
            choices: ["Five", "Seven"],
            answer: 1,
            why: "A week has seven days.",
            hints: ["Count again. Don't forget the weekend!", ""],
          },
        },
      },
      {
        title: "Viernes to domingo",
        teach:
          "Here are the last three days. viernes (bee-EHR-nehs) is Friday. sábado (SAH-bah-doh) is Saturday. domingo (doh-MEEN-goh) is Sunday. 🎉 Look closely at how we write them. In Spanish, the days start with a small letter: lunes, not Lunes. In English, days start with a capital letter. One more fact: in Spain, calendars start the week on lunes.",
        visual: {
          type: "compare",
          left: { title: "Español", points: ["lunes", "viernes", "domingo", "Small letters!"] },
          right: { title: "English", points: ["Monday", "Friday", "Sunday", "Capital letters!"] },
        },
        probe: {
          type: "cloze",
          text: "lunes, martes, miércoles, jueves, {0}, sábado, {1}.",
          blanks: [{ answers: ["viernes"] }, { answers: ["domingo"] }],
          bank: ["viernes", "domingo", "lunes", "martes"],
          hint: "After jueves comes viernes. The last day is domingo.",
          mistakes: [
            { match: "lunes", coach: "lunes is the first day. Look at what comes after jueves." },
            { match: "martes", coach: "martes is Tuesday, near the start of the week." },
          ],
          seconds: 30,
        },
        think: {
          q: "How do you write Friday in Spanish?",
          choices: ["Viernes", "viernes", "Friday"],
          answer: 1,
          why: "In Spanish, days start with a small letter: viernes.",
          hints: ["Close! But Spanish days start with a small letter.", "", "Friday is English. Try the Spanish word."],
        },
        approaches: {
          analogy:
            "sábado and domingo are like the cozy end of a story. They are the weekend, the last two days.",
          example:
            "Write the week in Spanish: lunes, martes, miércoles, jueves, viernes, sábado, domingo. Every one has a small first letter.",
          simpler: {
            q: "What is domingo?",
            choices: ["Sunday", "Tuesday"],
            answer: 0,
            why: "domingo (doh-MEEN-goh) is Sunday.",
            hints: ["", "Tuesday is martes. domingo is at the end."],
          },
        },
      },
      {
        title: "Hoy es...",
        teach:
          "Now you can tell the day! ¿Qué día es hoy? (keh DEE-ah ehs oy) means what day is today? hoy means today. You answer: Hoy es lunes. Today is Monday. 📅 Here's another word. mañana (mah-NYAH-nah) means tomorrow. If hoy es lunes, then mañana es martes. Tomorrow is Tuesday! What day is it today?",
        visual: {
          type: "flip",
          cards: [
            { front: "¿Qué día es hoy?", back: "What day is today?" },
            { front: "hoy", back: "today (oy)" },
            { front: "mañana", back: "tomorrow (mah-NYAH-nah)" },
            { front: "Hoy es viernes.", back: "Today is Friday." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: Today is Friday.",
          tiles: ["Hoy", "es", "viernes"],
          distractors: ["Mañana", "lunes"],
          hint: "hoy means today. es means is. viernes is Friday.",
          seconds: 30,
        },
        think: {
          q: "Hoy es martes. What is mañana?",
          choices: ["lunes", "jueves", "miércoles"],
          answer: 2,
          why: "After martes comes miércoles.",
          hints: ["lunes was yesterday. mañana is the day after.", "jueves is two days away. mañana is just the next day.", ""],
        },
        approaches: {
          analogy:
            "hoy is the step you stand on. mañana is the next step up the stairs. 🪜",
          example:
            "Today is Saturday. You say: Hoy es sábado. Tomorrow is Sunday. You say: Mañana es domingo.",
          simpler: {
            q: "What does hoy mean?",
            choices: ["Today", "Tomorrow", "Week"],
            answer: 0,
            why: "hoy (oy) means today.",
            hints: ["", "Tomorrow is mañana.", "Week is la semana."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the days of the week in order, starting with lunes.",
      steps: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
    },
    explain: {
      prompt: "Say the days of the week in Spanish. What day is it today? What day is tomorrow?",
      keyPoints: [
        "Says the seven days in order, lunes to domingo",
        "Uses Hoy es to tell today",
        "Uses Mañana es to tell tomorrow",
        "Spanish days start with a small letter",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "¿Cuántos días? How many days are in la semana?",
        answer: 7,
        hint: "Count them: lunes, martes, miércoles, jueves, viernes, sábado, domingo.",
        mistakes: [{ match: "5", coach: "Don't forget the weekend: sábado and domingo!" }],
        seconds: 20,
      },
      {
        type: "place",
        prompt: "On a calendar from Spain, lunes is day 1. Put each day on the line.",
        min: 1,
        max: 7,
        step: 1,
        tolerance: 0,
        items: [
          { label: "miércoles", value: 3 },
          { label: "viernes", value: 5 },
          { label: "domingo", value: 7 },
        ],
        hint: "lunes 1, martes 2, miércoles 3, jueves 4, viernes 5, sábado 6, domingo 7.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Hoy es lunes. Mañana es {0}.",
        blanks: [{ answers: ["martes"] }],
        bank: ["martes", "domingo", "jueves"],
        hint: "mañana is the next day. What comes after lunes?",
        mistakes: [
          { match: "domingo", coach: "domingo comes before lunes. mañana is the day after." },
          { match: "jueves", coach: "jueves is three days later. mañana is just the next day." },
        ],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each Spanish day to the English day.",
        pairs: [
          { left: "viernes", right: "Friday" },
          { left: "sábado", right: "Saturday" },
          { left: "domingo", right: "Sunday" },
          { left: "jueves", right: "Thursday" },
        ],
        hint: "jueves, viernes, sábado, domingo: Thursday, Friday, Saturday, Sunday.",
        seconds: 35,
      },
    ],
    check: [
      {
        q: "Which day comes after lunes?",
        choices: ["domingo", "martes", "viernes"],
        answer: 1,
        why: "lunes is Monday, and martes is Tuesday.",
      },
      {
        q: "What does hoy mean?",
        choices: ["Today", "Tomorrow", "Week"],
        answer: 0,
        why: "hoy (oy) means today.",
      },
      {
        q: "In Spanish, day names start with...",
        choices: ["a capital letter", "a number", "a small letter"],
        answer: 2,
        why: "Spanish writes lunes, not Lunes.",
      },
      {
        q: "Which one is a weekend day?",
        choices: ["sábado", "miércoles", "martes"],
        answer: 0,
        why: "sábado is Saturday, part of the weekend.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "For one week, say the day in Spanish at breakfast. Say Hoy es and the day, then Mañana es and the next day. Your parent can check a calendar with you.",
      rubric: [
        "Said Hoy es with the right day",
        "Said Mañana es with the next day",
        "Did it on at least five days",
      ],
    },
  },

  // 6. The weather
  {
    id: "span-1.weather",
    title: "¿Qué tiempo hace? The Weather",
    minutes: 18,
    stage: "logic",
    standards: ["SPAN.1.6", "SPAN.1.7", "SPAN.1.9", "SPAN.1.10"],
    read: [
      "Look out the window! What is the weather like? In Spanish, we ask ¿Qué tiempo hace? (keh tee-EHM-poh AH-seh).",
      "Hace sol (AH-seh sohl) means it's sunny. Hace calor (kah-LOR) means it's hot. Hace frío (FREE-oh) means it's cold. Hace viento (bee-EHN-toh) means it's windy.",
      "Llueve (YWEH-beh) means it's raining. Nieva (nee-EH-bah) means it's snowing. Está nublado (ehs-TAH noo-BLAH-doh) means it's cloudy.",
      "Weather watchers look at the sky every day. They write down what they see. You can too, in Spanish!",
      "Here is a fun fact. Argentina and Chile are south of the equator. There, the seasons are flipped. December is summer! It is hot there while it is winter in the United States.",
    ].join("\n\n"),
    keyIdeas: [
      "¿Qué tiempo hace? asks what the weather is like.",
      "Hace sol, hace calor, hace frío and hace viento all start with hace.",
      "Llueve is raining, nieva is snowing, and está nublado is cloudy.",
      "In Argentina and Chile, December is summer.",
    ],
    hook: {
      text: "Is it sunny today? ☀️ Is it rainy? 🌧️ Let's look outside and tell the weather in Spanish!",
    },
    teach: [
      {
        title: "Hace sol, hace frío",
        teach:
          "¿Qué tiempo hace? (keh tee-EHM-poh AH-seh) means what is the weather like? Many answers start with hace (AH-seh). Hace sol (sohl) means it's sunny. ☀️ Hace calor (kah-LOR) means it's hot. 🥵 Hace frío (FREE-oh) means it's cold. 🥶 Hace viento (bee-EHN-toh) means it's windy. 🌬️ Say them with me: hace sol, hace calor, hace frío, hace viento.",
        visual: {
          type: "flip",
          cards: [
            { front: "☀️", back: "Hace sol. It's sunny." },
            { front: "🥵", back: "Hace calor. It's hot." },
            { front: "🥶", back: "Hace frío. It's cold." },
            { front: "🌬️", back: "Hace viento. It's windy." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to the weather words.",
          pairs: [
            { left: "☀️", right: "Hace sol" },
            { left: "🥵", right: "Hace calor" },
            { left: "🥶", right: "Hace frío" },
            { left: "🌬️", right: "Hace viento" },
          ],
          hint: "sol is sun, calor is hot, frío is cold, viento is wind.",
          seconds: 40,
        },
        think: {
          q: "What does Hace frío mean?",
          choices: ["It's hot", "It's cold", "It's windy"],
          answer: 1,
          why: "Hace frío (AH-seh FREE-oh) means it's cold. 🥶",
          hints: ["It's hot is hace calor.", "", "It's windy is hace viento."],
        },
        approaches: {
          analogy:
            "hace is like the start of a weather report. 📺 Then you add the weather: sol, calor, frío or viento.",
          example:
            "In winter you put on a coat. 🧥 You shiver and say: ¡Hace frío! In summer you wear shorts and say: ¡Hace calor!",
          simpler: {
            q: "What does Hace sol mean?",
            choices: ["It's sunny", "It's snowing"],
            answer: 0,
            why: "sol means sun, so hace sol means it's sunny. ☀️",
            hints: ["", "Snow is nieva. sol is the sun."],
          },
        },
      },
      {
        title: "Rain, snow and clouds",
        teach:
          "Here are three more. Llueve (YWEH-beh) means it's raining. 🌧️ Nieva (nee-EH-bah) means it's snowing. ❄️ Está nublado (ehs-TAH noo-BLAH-doh) means it's cloudy. ☁️ Scientists who study weather look at the sky every day. They write down what they see. You can be a weather watcher too! Each morning, look out and say the weather in Spanish.",
        visual: {
          type: "flip",
          cards: [
            { front: "🌧️", back: "Llueve. It's raining." },
            { front: "❄️", back: "Nieva. It's snowing." },
            { front: "☁️", back: "Está nublado. It's cloudy." },
          ],
        },
        probe: {
          type: "cloze",
          text: "🌧️ {0}. ❄️ {1}. ☁️ Está {2}.",
          blanks: [{ answers: ["Llueve"] }, { answers: ["Nieva"] }, { answers: ["nublado"] }],
          bank: ["Llueve", "Nieva", "nublado", "sol"],
          hint: "🌧️ is rain: llueve. ❄️ is snow: nieva. ☁️ is cloudy: nublado.",
          mistakes: [{ match: "sol", coach: "sol is the sun. ☀️ None of these pictures is sunny." }],
          seconds: 35,
        },
        think: {
          q: "It's snowing outside. ❄️ What do you say?",
          choices: ["Llueve", "Hace calor", "Nieva"],
          answer: 2,
          why: "Nieva (nee-EH-bah) means it's snowing.",
          hints: ["Llueve means it's raining. Snow is different.", "Hace calor means it's hot. Snow comes when it's cold.", ""],
        },
        approaches: {
          analogy:
            "Rain and snow are cousins. 🌧️❄️ Both fall from clouds. Rain is llueve. When it is cold enough, it's snow: nieva.",
          example:
            "Look out the window. Gray sky? Está nublado. Drops falling? Llueve. White flakes falling? Nieva.",
          simpler: {
            q: "What does Llueve mean?",
            choices: ["It's raining", "It's cloudy", "It's hot"],
            answer: 0,
            why: "Llueve (YWEH-beh) means it's raining. 🌧️",
            hints: ["", "Cloudy is está nublado.", "Hot is hace calor."],
          },
        },
      },
      {
        title: "Summer in December",
        teach:
          "Here is a fun fact. 🌎 Argentina and Chile are south of the equator. The equator is an imaginary line around the middle of the Earth. South of it, the seasons are flipped. In Argentina, December is summer! Hace calor. Kids there start their summer break from school. At the same time, it is winter in the United States. Hace frío!",
        visual: {
          type: "compare",
          left: { title: "United States in December", points: ["Winter", "Hace frío 🥶", "It may snow: nieva"] },
          right: { title: "Argentina in December", points: ["Summer", "Hace calor 🥵", "Summer break from school"] },
        },
        probe: {
          type: "highlight",
          prompt: "Tap the true sentences.",
          sentences: [
            "In Argentina, December is summer. ☀️",
            "In Argentina, December is winter. ❄️",
            "Chile is south of the equator. 🌎",
            "The seasons are the same everywhere.",
          ],
          correct: [0, 2],
          hint: "Argentina and Chile are south of the equator, so their seasons are flipped.",
          seconds: 40,
        },
        think: {
          q: "In Argentina, what is the weather like in December?",
          choices: ["Hace frío", "Nieva", "Hace calor"],
          answer: 2,
          why: "December is summer in Argentina, so it's hot.",
          hints: ["That is our December. Argentina's seasons are flipped.", "Snow comes in winter. December is summer there.", ""],
        },
        approaches: {
          analogy:
            "The Earth is like a ball with a belt around the middle. When the top half has winter, the bottom half has summer.",
          example:
            "In December, a kid in the United States builds a snowman. ⛄ At the same time, a kid in Argentina swims at the beach. 🏖️",
          simpler: {
            q: "Is Argentina north or south of the equator?",
            choices: ["North", "South"],
            answer: 1,
            why: "Argentina is south of the equator.",
            hints: ["The United States is north. Argentina is far to the south.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "What will you need? Sort each kind of weather.",
      buckets: ["☂️ An umbrella", "🧥 A warm coat", "🕶️ Sunglasses"],
      items: [
        { text: "Llueve", bucket: 0 },
        { text: "Hace frío", bucket: 1 },
        { text: "Nieva", bucket: 1 },
        { text: "Hace sol", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Look outside. Tell me the weather in Spanish. Why is December summer in Argentina?",
      keyPoints: [
        "¿Qué tiempo hace? asks about the weather",
        "Uses a weather phrase like hace sol, llueve or hace frío",
        "Argentina is south of the equator",
        "South of the equator the seasons are flipped",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each picture to the weather words.",
        pairs: [
          { left: "🌧️", right: "Llueve" },
          { left: "❄️", right: "Nieva" },
          { left: "☁️", right: "Está nublado" },
          { left: "☀️", right: "Hace sol" },
        ],
        hint: "llueve is rain, nieva is snow, nublado is cloudy, sol is sun.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "Our weather chart for the week: ☀️ ☀️ 🌧️ ☀️ 🌧️ ☀️ ☀️. ¿Cuántos días hace sol? How many sunny days?",
        answer: 5,
        hint: "Count only the suns ☀️.",
        mistakes: [
          { match: "2", coach: "2 is the rainy days. Count the suns ☀️ instead." },
          { match: "7", coach: "7 is every day. Count only the sunny ones." },
        ],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: Today it's cold.",
        tiles: ["Hoy", "hace", "frío"],
        distractors: ["calor", "llueve"],
        hint: "Hoy is today. hace frío is it's cold.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "🥵 Hace {0}. 🌬️ Hace {1}.",
        blanks: [{ answers: ["calor"] }, { answers: ["viento"] }],
        bank: ["calor", "viento", "frío", "nieva"],
        hint: "🥵 is hot: calor. 🌬️ is wind: viento.",
        mistakes: [
          { match: "frío", coach: "frío is cold. 🥵 is a hot face." },
          { match: "nieva", coach: "nieva means it's snowing. Look at the pictures again." },
        ],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What does Hace frío mean?",
        choices: ["It's hot", "It's cold", "It's windy"],
        answer: 1,
        why: "Hace frío means it's cold. 🥶",
      },
      {
        q: "🌧️ How do you say it's raining?",
        choices: ["Llueve", "Nieva", "Hace sol"],
        answer: 0,
        why: "Llueve (YWEH-beh) means it's raining.",
      },
      {
        q: "In Argentina, December is...",
        choices: ["winter", "spring", "summer"],
        answer: 2,
        why: "Argentina is south of the equator, so December is summer there.",
      },
      {
        q: "What does ¿Qué tiempo hace? mean?",
        choices: ["What day is it?", "What is the weather like?", "What is it?"],
        answer: 1,
        why: "¿Qué tiempo hace? asks about the weather.",
      },
    ],
    task: {
      kind: "lab",
      prompt:
        "Be a weather watcher for five days. Each morning, look outside with a parent. Draw the weather on a chart and write the day and the weather in Spanish, like lunes: hace sol.",
      rubric: [
        "Watched the weather on five days",
        "Wrote the Spanish day name for each day",
        "Used a Spanish weather phrase for each day",
      ],
    },
  },
]);
