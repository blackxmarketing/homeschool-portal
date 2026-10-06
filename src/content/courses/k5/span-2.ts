import { k5Course } from "./base";

/**
 * span-2: Grade 2 Spanish (an elective), ACTFL Novice Mid. Kids already know
 * greetings, numbers to 20, colors, family, animals, feelings, the body, food,
 * school things, days and weather. Taught by Señora Luz; everything is read aloud.
 */
export const span2 = k5Course("span", 2, [
  // 1. Introducing myself
  {
    id: "span-2.me",
    title: "¡Hola! All About Me",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.2.1", "SPAN.2.2", "SPAN.2.13"],
    read: [
      "¡Hola, amigos! Today you will tell people about you. 😊",
      "To say your name, say me llamo (meh YAH-moh). Me llamo Ana means my name is Ana. To ask a friend, say ¿Cómo te llamas? (KOH-moh teh YAH-mahs). That means what is your name?",
      "To say your age, say tengo (TEN-goh), then a number, then años (AH-nyohs). Tengo siete años means I am seven years old. To ask a friend, say ¿Cuántos años tienes? (KWAN-tohs AH-nyohs tee-EH-nes). That means how old are you? 🎂",
      "To say where you live, say vivo en (VEE-voh en). Vivo en Texas means I live in Texas. Vivo en una casa (KAH-sah) means I live in a house. 🏠",
      "Now put it all together. Me llamo Leo. Tengo ocho años. Vivo en Ohio. Then smile and say ¡Mucho gusto! (MOO-choh GOOS-toh). That means nice to meet you. 🤝",
    ].join("\n\n"),
    keyIdeas: [
      "Me llamo ... means my name is ...",
      "Tengo ... años tells how old you are.",
      "Vivo en ... tells where you live.",
      "¿Cómo te llamas? and ¿Cuántos años tienes? ask a friend's name and age.",
    ],
    hook: {
      text: "Pip found a new friend at the river market. 🧚 The friend waves and says, ¡Hola! Me llamo Sofía. How can you answer her in Spanish? Let's find out! 🎉",
    },
    teach: [
      {
        title: "Me llamo: My Name Is",
        teach:
          "Me llamo (meh YAH-moh) means my name is. 😊 Say it with me. Me llamo. Then say your name. Me llamo Sam. Me llamo Rosa. To ask a friend, say ¿Cómo te llamas? (KOH-moh teh YAH-mahs). It means what is your name? Your friend says, Me llamo Pablo. Then you smile and say ¡Mucho gusto! (MOO-choh GOOS-toh). That means nice to meet you. 🤝",
        visual: {
          type: "flip",
          cards: [
            { front: "Me llamo ... 😊", back: "My name is ... Say: meh YAH-moh." },
            { front: "¿Cómo te llamas? ❓", back: "What is your name? Say: KOH-moh teh YAH-mahs." },
            { front: "¡Mucho gusto! 🤝", back: "Nice to meet you! Say: MOO-choh GOOS-toh." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Ana: ¿Cómo te {0}? 😊 Leo: Me {1} Leo. 🤝 Ana: ¡Mucho {2}!",
          blanks: [{ answers: ["llamas"] }, { answers: ["llamo"] }, { answers: ["gusto"] }],
          bank: ["llamas", "llamo", "gusto", "años", "vivo"],
          hint: "To ask, use llamas. To answer, use llamo. Nice to meet you is mucho gusto.",
          mistakes: [
            { match: "años", coach: "Años means years. It goes with your age, not your name." },
            { match: "vivo", coach: "Vivo means I live. It tells where you live, not your name." },
          ],
          seconds: 30,
        },
        think: {
          q: "What does me llamo mean?",
          choices: ["I am happy", "My name is", "I live in"],
          answer: 1,
          why: "Me llamo comes right before your name. Me llamo Sam means my name is Sam.",
          hints: [
            "Feelings use other words. Me llamo comes right before a name.",
            "",
            "I live in is vivo en. Me llamo comes before your name.",
          ],
        },
        approaches: {
          analogy:
            "Me llamo is like a name tag you say out loud. You stick your name right after it: me llamo, then your name.",
          example:
            "A boy named Pablo meets you. He says, Me llamo Pablo. You answer, Me llamo Rosa. ¡Mucho gusto! Now you both know each other's names.",
          simpler: {
            q: "Which one asks a friend's name?",
            choices: ["¿Cómo te llamas?", "¡Mucho gusto!"],
            answer: 0,
            why: "¿Cómo te llamas? means what is your name?",
            hints: ["", "Mucho gusto means nice to meet you. You say it after you learn a name."],
          },
        },
      },
      {
        title: "Tengo ... años: My Age",
        teach:
          "Tengo (TEN-goh) means I have. Años (AH-nyohs) means years. In Spanish, you say you have years! 🎂 Tengo siete años. That means I am seven. Tengo ocho años. That means I am eight. To ask a friend, say ¿Cuántos años tienes? (KWAN-tohs AH-nyohs tee-EH-nes). It means how old are you? Hold up your fingers. ✋ Now say your age in Spanish!",
        visual: {
          type: "flip",
          cards: [
            { front: "Tengo ... 🙋", back: "I have ... Say: TEN-goh." },
            { front: "años 🎂", back: "years. Say: AH-nyohs." },
            { front: "Tengo siete años. 7️⃣", back: "I am seven years old." },
            { front: "¿Cuántos años tienes? ❓", back: "How old are you?" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish sentence to the right age.",
          pairs: [
            { left: "Tengo seis años.", right: "I am 6. 🎂" },
            { left: "Tengo siete años.", right: "I am 7. 🎂" },
            { left: "Tengo ocho años.", right: "I am 8. 🎂" },
            { left: "Tengo diez años.", right: "I am 10. 🎂" },
          ],
          hint: "Look at the number word: seis is 6, siete is 7, ocho is 8 and diez is 10.",
          mistakes: [
            { match: "Mixed up seis and siete", coach: "Both start with s! Seis is 6. Siete is 7, and it has two e's." },
          ],
          seconds: 35,
        },
        think: {
          q: "Tengo ocho años means...",
          choices: ["I have eight dogs", "I live in house eight", "I am eight years old"],
          answer: 2,
          why: "Años means years, so tengo ocho años means I am eight years old.",
          hints: [
            "Dogs would be perros. Años means years.",
            "Where you live uses vivo en. Tengo ... años tells your age.",
            "",
          ],
        },
        approaches: {
          analogy:
            "In English you say you ARE seven. In Spanish you say you HAVE seven years, like carrying seven birthday candles in your pocket.",
          example:
            "Your friend asks, ¿Cuántos años tienes? You are seven. You answer, Tengo siete años. Tengo means I have, siete is 7 and años is years.",
          simpler: {
            q: "What does años mean?",
            choices: ["years", "names"],
            answer: 0,
            why: "Años means years, like in tengo siete años.",
            hints: ["", "Names go with me llamo. Años goes with your age."],
          },
        },
      },
      {
        title: "Vivo en: Where I Live",
        teach:
          "Vivo en (VEE-voh en) means I live in. 🏠 Vivo en Florida. I live in Florida. Vivo en una casa (KAH-sah). I live in a house. Vivo en un apartamento (ah-par-tah-MEN-toh). I live in an apartment. Now put it all together. Me llamo Leo. Tengo ocho años. Vivo en Ohio. ¡Mucho gusto! You just said three things about you! 🌟",
        visual: {
          type: "flip",
          cards: [
            { front: "Vivo en ... 🗺️", back: "I live in ... Say: VEE-voh en." },
            { front: "una casa 🏠", back: "a house. Say: KAH-sah." },
            { front: "un apartamento 🏢", back: "an apartment. Say: ah-par-tah-MEN-toh." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the sentence: I live in a house. 🏠",
          tiles: ["Vivo", "en", "una", "casa"],
          distractors: ["llamo", "años"],
          hint: "Start with Vivo en, which means I live in. Then say a house: una casa.",
          mistakes: [
            { match: "llamo", coach: "Llamo goes with your name. This sentence is about where you live." },
            { match: "años", coach: "Años goes with your age. This sentence is about where you live." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which sentence tells where you live?",
          choices: ["Vivo en Texas.", "Me llamo Ana.", "Tengo siete años."],
          answer: 0,
          why: "Vivo en means I live in, so Vivo en Texas means I live in Texas.",
          hints: [
            "",
            "Me llamo Ana tells your name, not where you live.",
            "Tengo siete años tells your age, not where you live.",
          ],
        },
        approaches: {
          analogy:
            "Vivo en is like the address on a letter. It tells everyone where to find you: vivo en, then your town or your home.",
          example:
            "Leo lives in a house in Ohio. He can say, Vivo en Ohio. He can also say, Vivo en una casa. Both tell where he lives.",
          simpler: {
            q: "What does casa mean?",
            choices: ["car", "house", "cat"],
            answer: 1,
            why: "Casa means house. Vivo en una casa means I live in a house.",
            hints: ["Car is carro in Spanish. Casa is where you live.", "", "Cat is gato in Spanish. Casa is where you live."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each sentence: does it tell a name, an age or where someone lives?",
      buckets: ["Name 😊", "Age 🎂", "Where I live 🏠"],
      items: [
        { text: "Me llamo Ana.", bucket: 0 },
        { text: "Me llamo Pedro.", bucket: 0 },
        { text: "Tengo siete años.", bucket: 1 },
        { text: "Tengo nueve años.", bucket: 1 },
        { text: "Vivo en Texas.", bucket: 2 },
        { text: "Vivo en una casa.", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz how to introduce yourself in Spanish. What do you say for your name, your age and where you live?",
      keyPoints: [
        "Me llamo tells your name",
        "Tengo ... años tells your age",
        "Vivo en tells where you live",
        "¿Cómo te llamas? asks a friend's name",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Me {0} Rosa. 😊 {1} siete años. 🎂 {2} en Texas. 🏠",
        blanks: [{ answers: ["llamo"] }, { answers: ["Tengo"] }, { answers: ["Vivo"] }],
        bank: ["llamo", "Tengo", "Vivo", "gusto", "casa"],
        hint: "Name: me llamo. Age: tengo ... años. Where you live: vivo en.",
        mistakes: [
          { match: "gusto", coach: "Gusto goes in ¡Mucho gusto!, nice to meet you." },
          { match: "casa", coach: "Casa means house. It comes after vivo en, not before." },
        ],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Your new friend says, Tengo nueve años. 🎂 How old is your friend? Type the number.",
        answer: 9,
        hint: "Nueve is the Spanish word for a number between 8 and 10.",
        mistakes: [{ match: "19", coach: "Nineteen is diecinueve. Nueve all by itself is 9." }],
        seconds: 15,
      },
      {
        type: "match",
        prompt: "Match the Spanish to the English.",
        pairs: [
          { left: "¿Cómo te llamas?", right: "What is your name?" },
          { left: "¿Cuántos años tienes?", right: "How old are you?" },
          { left: "¡Mucho gusto!", right: "Nice to meet you!" },
          { left: "Vivo en una casa.", right: "I live in a house." },
        ],
        hint: "Llamas is about names, años is about age, and vivo is about where you live.",
        mistakes: [{ match: "Mixed up the two questions", coach: "¿Cómo te llamas? has llamas, like me llamo, so it asks a name." }],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build the sentence: My name is Sofía. 😊",
        tiles: ["Me", "llamo", "Sofía"],
        distractors: ["Tengo", "años"],
        hint: "My name is ... is me llamo. Then add the name.",
        mistakes: [{ match: "Tengo", coach: "Tengo is for your age. For a name, use me llamo." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What does tengo ocho años mean?",
        choices: ["I live in Ohio", "I am eight years old", "My name is Ocho"],
        answer: 1,
        why: "Tengo ... años tells your age, and ocho is 8.",
      },
      {
        q: "How do you ask a friend's name?",
        choices: ["¿Cómo te llamas?", "¿Cuántos años tienes?", "¡Mucho gusto!"],
        answer: 0,
        why: "¿Cómo te llamas? means what is your name?",
      },
      {
        q: "What does vivo en mean?",
        choices: ["I have", "My name is", "I live in"],
        answer: 2,
        why: "Vivo en means I live in, like vivo en una casa.",
      },
      {
        q: "What do you say when you meet someone new?",
        choices: ["Tengo siete años", "¡Mucho gusto!", "Vivo en Texas"],
        answer: 1,
        why: "¡Mucho gusto! means nice to meet you.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "With a parent, play New Friends. Shake hands and introduce yourself in Spanish: your name, your age and where you live. Then ask your parent ¿Cómo te llamas? and ¿Cuántos años tienes?",
      rubric: [
        "Says me llamo with their name",
        "Says tengo ... años with their age",
        "Says vivo en with their town, state or home",
        "Asks at least one question in Spanish",
      ],
    },
  },

  // 2. Clothes
  {
    id: "span-2.clothes",
    title: "La ropa: Clothes",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.2.3", "SPAN.2.4", "SPAN.2.11"],
    read: [
      "La ropa (lah ROH-pah) means clothes. 👕 Let's get dressed in Spanish!",
      "La camisa (kah-MEE-sah) is a shirt. 👕 Los pantalones (pahn-tah-LOH-nes) are pants. 👖 El vestido (ves-TEE-doh) is a dress. 👗 La chaqueta (chah-KEH-tah) is a jacket. 🧥",
      "El sombrero (sohm-BREH-roh) is a hat. 👒 Los calcetines (kahl-seh-TEE-nes) are socks. 🧦 Los zapatos (sah-PAH-tohs) are shoes. 👟",
      "Llevo (YEH-voh) means I am wearing. Llevo una camisa means I am wearing a shirt.",
      "You already know your colors. Here is a fun trick. In English, the color comes first: a blue shirt. In Spanish, the color comes after: una camisa azul (ah-SOOL). A green hat is un sombrero verde (VER-deh). Thing first, then the color! 🎨",
      "When it is cold, hace frío, wear la chaqueta. 🧥 When it is hot, hace calor, wear el sombrero. 👒",
    ].join("\n\n"),
    keyIdeas: [
      "La camisa, los pantalones, el vestido and la chaqueta are clothes for your body.",
      "El sombrero goes on your head. Los calcetines and los zapatos go on your feet.",
      "In Spanish the color comes after the thing: una camisa azul.",
    ],
    hook: {
      text: "Pip wants to dress up for the big river fiesta. 🎉 But Pip only knows the clothes in English! Can you help Pip pick clothes in Spanish? 👕",
    },
    teach: [
      {
        title: "Clothes for Your Body",
        teach:
          "La ropa (lah ROH-pah) means clothes. Let's start with your body. La camisa (kah-MEE-sah) is a shirt. 👕 Los pantalones (pahn-tah-LOH-nes) are pants. 👖 El vestido (ves-TEE-doh) is a dress. 👗 La chaqueta (chah-KEH-tah) is a jacket. 🧥 Touch your shirt and say la camisa. Point to your pants and say los pantalones. Great job!",
        visual: {
          type: "flip",
          cards: [
            { front: "la camisa 👕", back: "shirt. Say: kah-MEE-sah." },
            { front: "los pantalones 👖", back: "pants. Say: pahn-tah-LOH-nes." },
            { front: "el vestido 👗", back: "dress. Say: ves-TEE-doh." },
            { front: "la chaqueta 🧥", back: "jacket. Say: chah-KEH-tah." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish word to its picture.",
          pairs: [
            { left: "la camisa", right: "👕" },
            { left: "los pantalones", right: "👖" },
            { left: "el vestido", right: "👗" },
            { left: "la chaqueta", right: "🧥" },
          ],
          hint: "Camisa is a shirt, pantalones are pants, vestido is a dress and chaqueta is a jacket.",
          mistakes: [{ match: "Mixed up camisa and chaqueta", coach: "Both go on top! La camisa is the shirt. La chaqueta is the warm jacket you wear over it." }],
          seconds: 30,
        },
        think: {
          q: "What is la camisa?",
          choices: ["a jacket", "pants", "a shirt"],
          answer: 2,
          why: "La camisa is a shirt. 👕",
          hints: ["A jacket is la chaqueta.", "Pants are los pantalones.", ""],
        },
        approaches: {
          analogy:
            "Think of your closet with Spanish labels. The shirt drawer says la camisa. The pants drawer says los pantalones.",
          example:
            "In the morning you put on a shirt, pants and a jacket. In Spanish that is la camisa, los pantalones and la chaqueta.",
          simpler: {
            q: "What are los pantalones?",
            choices: ["pants", "a hat"],
            answer: 0,
            why: "Los pantalones are pants. 👖",
            hints: ["", "A hat is el sombrero. Los pantalones go on your legs."],
          },
        },
      },
      {
        title: "From Your Head to Your Toes",
        teach:
          "Now let's go from your head to your toes. El sombrero (sohm-BREH-roh) is a hat. 👒 Los calcetines (kahl-seh-TEE-nes) are socks. 🧦 Los zapatos (sah-PAH-tohs) are shoes. 👟 Here is a helpful word. Llevo (YEH-voh) means I am wearing. Llevo un sombrero. I am wearing a hat. Llevo zapatos. I am wearing shoes. What are you wearing today?",
        visual: {
          type: "flip",
          cards: [
            { front: "el sombrero 👒", back: "hat. Say: sohm-BREH-roh." },
            { front: "los calcetines 🧦", back: "socks. Say: kahl-seh-TEE-nes." },
            { front: "los zapatos 👟", back: "shoes. Say: sah-PAH-tohs." },
            { front: "Llevo ... 🙋", back: "I am wearing ... Say: YEH-voh." },
          ],
        },
        probe: {
          type: "cloze",
          text: "On my head, I wear el {0}. 👒 On my feet, I wear los {1} 🧦 and then los {2}. 👟",
          blanks: [{ answers: ["sombrero"] }, { answers: ["calcetines"] }, { answers: ["zapatos"] }],
          bank: ["sombrero", "calcetines", "zapatos", "vestido", "camisa"],
          hint: "Sombrero goes on your head. Socks are calcetines. Shoes are zapatos.",
          mistakes: [
            { match: "vestido", coach: "El vestido is a dress. It doesn't go on your head or feet." },
            { match: "camisa", coach: "La camisa is a shirt. It goes on your body." },
          ],
          seconds: 30,
        },
        think: {
          q: "Where do los zapatos go?",
          choices: ["On your head", "On your feet", "On your hands"],
          answer: 1,
          why: "Los zapatos are shoes, so they go on your feet. 👟",
          hints: ["El sombrero goes on your head. Zapatos are shoes.", "", "Zapatos are shoes. You don't wear shoes on your hands!"],
        },
        approaches: {
          analogy:
            "Getting dressed is like stacking blocks from the top down: el sombrero on top, then la camisa, then los calcetines and los zapatos at the very bottom.",
          example:
            "You put on socks first, then shoes. In Spanish: first los calcetines, then los zapatos. Now you can say, Llevo zapatos.",
          simpler: {
            q: "What is el sombrero?",
            choices: ["socks", "a dress", "a hat"],
            answer: 2,
            why: "El sombrero is a hat. 👒",
            hints: ["Socks are los calcetines.", "A dress is el vestido.", ""],
          },
        },
      },
      {
        title: "The Color Comes After",
        teach:
          "You already know your colors. Here is a fun trick. In English, the color comes first. A blue shirt. 🔵👕 In Spanish, the color comes after! Una camisa azul (ah-SOOL). A green hat is un sombrero verde (VER-deh). 🟢👒 Thing first, then the color. When it is cold, hace frío, I wear una chaqueta azul. 🧥 Now you try!",
        visual: {
          type: "compare",
          left: { title: "English 🇺🇸", points: ["a blue shirt", "a green hat", "Color first, then the thing"] },
          right: { title: "Spanish 🌎", points: ["una camisa azul", "un sombrero verde", "Thing first, then the color"] },
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: a blue shirt. 🔵👕",
          tiles: ["una", "camisa", "azul"],
          distractors: ["sombrero", "verde"],
          hint: "In Spanish, the thing comes first and the color comes last: una camisa, then azul.",
          mistakes: [
            { match: "verde", coach: "Verde is green. This shirt is blue: azul." },
            { match: "sombrero", coach: "Sombrero is a hat. We want a shirt: camisa." },
          ],
          seconds: 30,
        },
        think: {
          q: "How do you say a green hat in Spanish?",
          choices: ["un verde sombrero", "un sombrero verde", "un sombrero azul"],
          answer: 1,
          why: "In Spanish, the color comes after the thing: un sombrero verde.",
          hints: ["That puts the color first, like English. In Spanish the color comes after.", "", "Azul is blue. The hat is green, so use verde."],
        },
        approaches: {
          analogy:
            "Spanish is like opening a present. First you find out what it is, a shirt! Then you see its color, azul.",
          example:
            "A red dress in English. In Spanish, say the thing first: un vestido. Then say the color: rojo. Un vestido rojo.",
          simpler: {
            q: "In Spanish, where does the color go?",
            choices: ["After the thing", "Before the thing"],
            answer: 0,
            why: "Spanish says the thing first, then the color: una camisa azul.",
            hints: ["", "That's the English way. In Spanish the color comes after."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Where do you wear it? Sort each piece of clothing.",
      buckets: ["Head 🙂", "Body 🧍", "Feet 🦶"],
      items: [
        { text: "el sombrero 👒", bucket: 0 },
        { text: "la camisa 👕", bucket: 1 },
        { text: "los pantalones 👖", bucket: 1 },
        { text: "el vestido 👗", bucket: 1 },
        { text: "la chaqueta 🧥", bucket: 1 },
        { text: "los calcetines 🧦", bucket: 2 },
        { text: "los zapatos 👟", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Señora Luz what you are wearing today, in Spanish. Then tell her the trick about where the color goes.",
      keyPoints: [
        "Names clothes in Spanish, like la camisa or los zapatos",
        "Llevo means I am wearing",
        "In Spanish the color comes after the thing",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each Spanish word to its picture.",
        pairs: [
          { left: "el sombrero", right: "👒" },
          { left: "los calcetines", right: "🧦" },
          { left: "los zapatos", right: "👟" },
          { left: "el vestido", right: "👗" },
          { left: "los pantalones", right: "👖" },
        ],
        hint: "Sombrero is a hat, calcetines are socks, zapatos are shoes, vestido is a dress and pantalones are pants.",
        mistakes: [{ match: "Mixed up calcetines and zapatos", coach: "Both go on your feet! Calcetines are the soft socks. Zapatos are the shoes on top." }],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build it in Spanish: a green jacket. 🟢🧥",
        tiles: ["una", "chaqueta", "verde"],
        distractors: ["azul", "camisa"],
        hint: "Thing first: una chaqueta. Then the color: verde.",
        mistakes: [{ match: "azul", coach: "Azul is blue. This jacket is green: verde." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Hace frío. ❄️ Llevo una {0}. 🧥 My feet are cold, so I wear los {1}. 🧦",
        blanks: [{ answers: ["chaqueta"] }, { answers: ["calcetines"] }],
        bank: ["chaqueta", "calcetines", "sombrero", "vestido"],
        hint: "When it's cold, you wear a jacket, la chaqueta, and warm socks, los calcetines.",
        mistakes: [{ match: "sombrero", coach: "A sombrero is a hat. The picture shows a jacket: chaqueta." }],
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the two sentences that put the color in the Spanish spot, after the thing.",
        sentences: ["una camisa azul 👕", "un verde sombrero 👒", "un vestido rojo 👗", "una azul chaqueta 🧥"],
        correct: [0, 2],
        hint: "In Spanish, the thing comes first and the color comes after.",
        mistakes: [{ match: "Picked un verde sombrero", coach: "Verde comes before sombrero there. In Spanish, the color goes after: un sombrero verde." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What are los zapatos?",
        choices: ["socks", "shoes", "pants"],
        answer: 1,
        why: "Los zapatos are shoes. 👟",
      },
      {
        q: "How do you say a blue shirt in Spanish?",
        choices: ["una camisa azul", "una azul camisa", "un sombrero azul"],
        answer: 0,
        why: "The thing comes first, then the color: una camisa azul.",
      },
      {
        q: "What does llevo mean?",
        choices: ["I live in", "I have", "I am wearing"],
        answer: 2,
        why: "Llevo means I am wearing, like llevo una camisa.",
      },
      {
        q: "Hace frío. What should you wear?",
        choices: ["la chaqueta", "nothing on your feet", "only a sun hat"],
        answer: 0,
        why: "Hace frío means it is cold, so you wear la chaqueta, a jacket.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Fashion show! With a parent, pick out three pieces of clothing. Walk like a model and say each one in Spanish with its color, like una camisa azul. Your parent can clap and say ¡Muy bien!",
      rubric: [
        "Names three pieces of clothing in Spanish",
        "Puts the color after the thing, like una camisa azul",
        "Uses llevo at least once",
      ],
    },
  },

  // 3. My house
  {
    id: "span-2.house",
    title: "Mi casa: My House",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.2.3", "SPAN.2.5", "SPAN.2.13"],
    read: [
      "Mi casa (mee KAH-sah) means my house. 🏠 Let's walk through a house in Spanish!",
      "La cocina (koh-SEE-nah) is the kitchen. 🍳 We cook there. El comedor (koh-meh-DOR) is the dining room. 🍽️ We eat there. La sala (SAH-lah) is the living room. 🛋️ We rest and play there.",
      "El dormitorio (dor-mee-TOH-ree-oh) is the bedroom. 🛏️ We sleep there. El baño (BAH-nyoh) is the bathroom. 🛁 We wash there. El jardín (har-DEEN) is the yard or garden. 🌳 We play outside there.",
      "To ask where someone is, say ¿Dónde está? (DOHN-deh es-TAH). That means where is? To answer, say está en, which means is in. ¿Dónde está mamá? Mamá está en la cocina. Mom is in the kitchen.",
      "Try this at home: put Spanish name cards on the doors of your rooms! 🏷️",
    ].join("\n\n"),
    keyIdeas: [
      "La cocina, el comedor and la sala are the kitchen, dining room and living room.",
      "El dormitorio, el baño and el jardín are the bedroom, bathroom and yard.",
      "¿Dónde está? asks where someone is. Está en la cocina means is in the kitchen.",
    ],
    hook: {
      text: "Pip's little cousin is hiding somewhere in the mill house! 🏠 Pip will look in every room. But Pip names the rooms in Spanish. Let's learn them so we can help! 🔎",
    },
    teach: [
      {
        title: "Rooms Where We Cook, Eat and Rest",
        teach:
          "Mi casa (mee KAH-sah) means my house. 🏠 La cocina (koh-SEE-nah) is the kitchen. 🍳 We cook there. El comedor (koh-meh-DOR) is the dining room. 🍽️ We eat there. La sala (SAH-lah) is the living room. 🛋️ We rest, read and play games there. Say them with me. La cocina. El comedor. La sala. ¡Muy bien!",
        visual: {
          type: "flip",
          cards: [
            { front: "la cocina 🍳", back: "kitchen. Say: koh-SEE-nah." },
            { front: "el comedor 🍽️", back: "dining room. Say: koh-meh-DOR." },
            { front: "la sala 🛋️", back: "living room. Say: SAH-lah." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each room to its picture.",
          pairs: [
            { left: "la cocina", right: "🍳 where we cook" },
            { left: "el comedor", right: "🍽️ where we eat" },
            { left: "la sala", right: "🛋️ where we rest" },
          ],
          hint: "Cocina sounds a bit like cook. Comedor is where you eat. Sala has the sofa.",
          mistakes: [{ match: "Mixed up cocina and comedor", coach: "Both start with co! La cocina is where food is cooked. El comedor is where you sit down to eat it." }],
          seconds: 25,
        },
        think: {
          q: "What is la cocina?",
          choices: ["the living room", "the kitchen", "the yard"],
          answer: 1,
          why: "La cocina is the kitchen, where we cook. 🍳",
          hints: ["The living room is la sala.", "", "The yard is el jardín."],
        },
        approaches: {
          analogy:
            "Think of la cocina as the room that cooks, el comedor as the room that eats, and la sala as the room that rests.",
          example:
            "At dinner time, food is made in la cocina. Then the family carries it to el comedor to eat. After dinner, they read in la sala.",
          simpler: {
            q: "Where do we cook?",
            choices: ["la sala", "la cocina"],
            answer: 1,
            why: "We cook in la cocina, the kitchen.",
            hints: ["La sala is the living room, with the sofa.", ""],
          },
        },
      },
      {
        title: "Rooms Where We Sleep, Wash and Play",
        teach:
          "Here are three more places. El dormitorio (dor-mee-TOH-ree-oh) is the bedroom. 🛏️ We sleep there. El baño (BAH-nyoh) is the bathroom. 🛁 We wash and brush our teeth there. El jardín (har-DEEN) is the yard or garden. 🌳 We play outside there. Which room is your favorite? Say it in Spanish!",
        visual: {
          type: "flip",
          cards: [
            { front: "el dormitorio 🛏️", back: "bedroom. Say: dor-mee-TOH-ree-oh." },
            { front: "el baño 🛁", back: "bathroom. Say: BAH-nyoh." },
            { front: "el jardín 🌳", back: "yard or garden. Say: har-DEEN." },
          ],
        },
        probe: {
          type: "cloze",
          text: "I sleep in el {0}. 🛏️ I brush my teeth in el {1}. 🪥 I play outside in el {2}. 🌳",
          blanks: [{ answers: ["dormitorio"] }, { answers: ["baño", "bano"] }, { answers: ["jardín", "jardin"] }],
          bank: ["dormitorio", "baño", "jardín", "cocina", "sala"],
          hint: "Dormitorio has a bed, baño has a bathtub and jardín has trees.",
          mistakes: [
            { match: "cocina", coach: "La cocina is the kitchen. We cook there, not sleep or wash." },
            { match: "sala", coach: "La sala is the living room. Look for the bedroom, bathroom and yard." },
          ],
          seconds: 30,
        },
        think: {
          q: "Where do you sleep?",
          choices: ["el jardín", "el baño", "el dormitorio"],
          answer: 2,
          why: "El dormitorio is the bedroom, where you sleep. 🛏️",
          hints: ["El jardín is the yard. You play there, not sleep.", "El baño is the bathroom. You wash there.", ""],
        },
        approaches: {
          analogy:
            "Dormitorio sounds a bit like dormir, which means to sleep. It's the sleeping room!",
          example:
            "Before bed, you brush your teeth in el baño. Then you walk to el dormitorio and climb into bed. In the morning, you play in el jardín.",
          simpler: {
            q: "What is el jardín?",
            choices: ["the yard or garden", "the bathroom"],
            answer: 0,
            why: "El jardín is the yard or garden. 🌳",
            hints: ["", "The bathroom is el baño. El jardín is outside."],
          },
        },
      },
      {
        title: "¿Dónde está? Where Is It?",
        teach:
          "To ask where someone is, say ¿Dónde está? (DOHN-deh es-TAH). It means where is? To answer, say está en. It means is in. ¿Dónde está mamá? Mamá está en la cocina. 🍳 Mom is in the kitchen. ¿Dónde está el perro? El perro está en el jardín. 🐶🌳 The dog is in the yard. Now you can find anyone!",
        visual: {
          type: "hotspots",
          title: "¿Dónde está? Tap a room",
          center: "Mi casa 🏠",
          spots: [
            { label: "la cocina", icon: "🍳", detail: "Mamá está en la cocina. Mom is in the kitchen." },
            { label: "la sala", icon: "🛋️", detail: "Papá está en la sala. Dad is in the living room." },
            { label: "el dormitorio", icon: "🛏️", detail: "El gato está en el dormitorio. The cat is in the bedroom." },
            { label: "el jardín", icon: "🌳", detail: "El perro está en el jardín. The dog is in the yard." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Build the answer: The dog is in the yard. 🐶🌳",
          tiles: ["El perro", "está en", "el jardín"],
          distractors: ["la cocina", "Me llamo"],
          hint: "Start with el perro, then está en, which means is in, then the yard: el jardín.",
          mistakes: [
            { match: "la cocina", coach: "La cocina is the kitchen. The dog is in the yard: el jardín." },
            { match: "Me llamo", coach: "Me llamo is for your name. Here we say where the dog is." },
          ],
          seconds: 30,
        },
        think: {
          q: "Mamá está en la cocina. Where is Mom?",
          choices: ["In the kitchen", "In the bedroom", "In the yard"],
          answer: 0,
          why: "La cocina is the kitchen, so Mom is in the kitchen.",
          hints: ["", "The bedroom is el dormitorio. Listen for la cocina.", "The yard is el jardín. Listen for la cocina."],
        },
        approaches: {
          analogy:
            "¿Dónde está? is like playing hide and seek with words. You ask where, and the answer tells you the room.",
          example:
            "You ask, ¿Dónde está papá? Someone says, Papá está en la sala. You go to the living room, and there he is on the sofa!",
          simpler: {
            q: "What does ¿Dónde está? mean?",
            choices: ["How old are you?", "Where is?", "What is your name?"],
            answer: 1,
            why: "¿Dónde está? means where is?",
            hints: ["How old are you is ¿Cuántos años tienes?", "", "What is your name is ¿Cómo te llamas?"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which room does each thing belong in?",
      buckets: ["la cocina 🍳", "el dormitorio 🛏️", "el baño 🛁", "el jardín 🌳"],
      items: [
        { text: "🍳 a frying pan", bucket: 0 },
        { text: "🥄 a big spoon for stirring soup", bucket: 0 },
        { text: "🛏️ a bed", bucket: 1 },
        { text: "🧸 pajamas and a teddy bear", bucket: 1 },
        { text: "🪥 a toothbrush", bucket: 2 },
        { text: "🛁 a bathtub", bucket: 2 },
        { text: "🌻 sunflowers", bucket: 3 },
        { text: "⚽ a soccer ball and a swing", bucket: 3 },
      ],
    },
    explain: {
      prompt: "Give Señora Luz a tour of your house in Spanish. Name the rooms and say what you do in each one.",
      keyPoints: [
        "La cocina is the kitchen",
        "El dormitorio is the bedroom",
        "El baño is the bathroom",
        "Names at least one more room, like la sala, el comedor or el jardín",
        "¿Dónde está? asks where someone is",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each room to its picture.",
        pairs: [
          { left: "la cocina", right: "🍳" },
          { left: "el dormitorio", right: "🛏️" },
          { left: "el baño", right: "🛁" },
          { left: "la sala", right: "🛋️" },
          { left: "el jardín", right: "🌳" },
        ],
        hint: "Cocina: cook. Dormitorio: sleep. Baño: wash. Sala: sofa. Jardín: outside.",
        mistakes: [{ match: "Mixed up sala and dormitorio", coach: "La sala has the sofa for resting. El dormitorio has the bed for sleeping." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "¿Dónde está papá? 👨 Papá está en la {0}. 🛋️ ¿Dónde está el gato? 🐱 El gato está en el {1}. 🛏️",
        blanks: [{ answers: ["sala"] }, { answers: ["dormitorio"] }],
        bank: ["sala", "dormitorio", "cocina", "baño"],
        hint: "The sofa 🛋️ is in la sala. The bed 🛏️ is in el dormitorio.",
        mistakes: [
          { match: "cocina", coach: "La cocina is the kitchen 🍳. Look at the pictures: a sofa and a bed." },
          { match: "baño", coach: "El baño is the bathroom 🛁. Look at the pictures: a sofa and a bed." },
        ],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the answer: Mom is in the kitchen. 👩🍳",
        tiles: ["Mamá", "está en", "la cocina"],
        distractors: ["el baño", "Tengo"],
        hint: "Mamá, then está en (is in), then the kitchen: la cocina.",
        mistakes: [{ match: "el baño", coach: "El baño is the bathroom. Mom is in the kitchen: la cocina." }],
        seconds: 25,
      },
      {
        type: "highlight",
        prompt: "Tap the sentence that says: The dog is in the yard.",
        sentences: ["El perro está en la cocina.", "El perro está en el jardín.", "El gato está en el baño."],
        correct: [1],
        hint: "Dog is perro, and the yard is el jardín.",
        mistakes: [{ match: "Picked la cocina", coach: "La cocina is the kitchen. Look for el jardín, the yard." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What is el baño?",
        choices: ["the bedroom", "the kitchen", "the bathroom"],
        answer: 2,
        why: "El baño is the bathroom, where we wash. 🛁",
      },
      {
        q: "Which room is the living room?",
        choices: ["la sala", "el comedor", "el jardín"],
        answer: 0,
        why: "La sala is the living room, with the sofa. 🛋️",
      },
      {
        q: "El perro está en el jardín. Where is the dog?",
        choices: ["In the bedroom", "In the yard", "In the dining room"],
        answer: 1,
        why: "El jardín is the yard or garden.",
      },
      {
        q: "Where do we eat dinner together?",
        choices: ["el baño", "el dormitorio", "el comedor"],
        answer: 2,
        why: "El comedor is the dining room, where we eat. 🍽️",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, make Spanish name cards for the rooms in your home: la cocina, el baño, el dormitorio and more. Tape them up. Then play ¿Dónde está? Your parent hides a toy, and you ask and answer in Spanish where it is.",
      rubric: [
        "Makes at least four room cards with the right Spanish names",
        "Says each room name out loud",
        "Asks ¿Dónde está? and answers with está en and a room",
      ],
    },
  },

  // 4. Numbers to 100 by tens
  {
    id: "span-2.tens",
    title: "Números: Counting by Tens to 100",
    minutes: 15,
    stage: "logic",
    standards: ["SPAN.2.3", "SPAN.2.6"],
    read: [
      "You already know diez (dyes). Diez is 10. 🔟 Now let's count by tens all the way to 100!",
      "Veinte (VAIN-teh) is 20. Treinta (TRAIN-tah) is 30. Cuarenta (kwah-REN-tah) is 40. Cincuenta (seen-KWEN-tah) is 50. That is half way to 100!",
      "Sesenta (seh-SEN-tah) is 60. Setenta (seh-TEN-tah) is 70. Ochenta (oh-CHEN-tah) is 80. Noventa (noh-VEN-tah) is 90. Cien (syen) is 100! 💯",
      "Here is a trick. Many tens sound like the small numbers you know. Cuatro is 4, and cuarenta is 40. Ocho is 8, and ochenta is 80. Nueve is 9, and noventa is 90.",
      "You can count dimes by tens. One dime is 10 cents. 🪙 Diez, veinte, treinta. Three dimes make 30 cents!",
    ].join("\n\n"),
    keyIdeas: [
      "Diez, veinte, treinta, cuarenta and cincuenta are 10, 20, 30, 40 and 50.",
      "Sesenta, setenta, ochenta, noventa and cien are 60, 70, 80, 90 and 100.",
      "Many tens sound like small numbers: ocho is 8 and ochenta is 80.",
    ],
    hook: {
      text: "The miller in Riverbend has bags of flour. 🌾 He stacks them in piles of ten. Pip wants to count them all in Spanish. Diez, veinte... what comes next? 🔢",
    },
    teach: [
      {
        title: "Diez to Cincuenta",
        teach:
          "You already know diez (dyes). Diez is 10. 🔟 Now let's count by tens. Veinte (VAIN-teh) is 20. Treinta (TRAIN-tah) is 30. Cuarenta (kwah-REN-tah) is 40. Cincuenta (seen-KWEN-tah) is 50. Fifty is half way to one hundred! Clap and count with me. Diez, veinte, treinta, cuarenta, cincuenta! 👏",
        visual: {
          type: "flip",
          cards: [
            { front: "diez", back: "10. Say: dyes." },
            { front: "veinte", back: "20. Say: VAIN-teh." },
            { front: "treinta", back: "30. Say: TRAIN-tah." },
            { front: "cuarenta", back: "40. Say: kwah-REN-tah." },
            { front: "cincuenta", back: "50. Say: seen-KWEN-tah." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish number to its tens. 🔟",
          pairs: [
            { left: "veinte", right: "20" },
            { left: "treinta", right: "30" },
            { left: "cuarenta", right: "40" },
            { left: "cincuenta", right: "50" },
          ],
          hint: "Count in order: diez 10, veinte 20, treinta 30, cuarenta 40, cincuenta 50.",
          mistakes: [{ match: "Mixed up cuarenta and cincuenta", coach: "Cuarenta sounds like cuatro, 4, so it's 40. Cincuenta sounds like cinco, 5, so it's 50." }],
          seconds: 30,
        },
        think: {
          q: "What number is treinta?",
          choices: ["20", "40", "30"],
          answer: 2,
          why: "Treinta is 30. Count: diez, veinte, treinta.",
          hints: ["20 is veinte.", "40 is cuarenta.", ""],
        },
        approaches: {
          analogy:
            "Counting by tens is like climbing stairs two at a time, only bigger. Each step jumps ten: diez, veinte, treinta.",
          example:
            "Hold up both hands. That's diez fingers. A friend holds up both hands too. Now there are veinte fingers. A third friend makes treinta!",
          simpler: {
            q: "What is diez?",
            choices: ["10", "100"],
            answer: 0,
            why: "Diez is 10. 🔟",
            hints: ["", "100 is cien. Diez is the number of fingers on your hands."],
          },
        },
      },
      {
        title: "Sesenta to Cien",
        teach:
          "Let's keep going! Sesenta (seh-SEN-tah) is 60. Setenta (seh-TEN-tah) is 70. Ochenta (oh-CHEN-tah) is 80. Noventa (noh-VEN-tah) is 90. Cien (syen) is 100! 💯 Here is a trick. Ocho is 8, and ochenta is 80. Nueve is 9, and noventa is 90. Listen for the small number inside the big one!",
        visual: {
          type: "flip",
          cards: [
            { front: "sesenta", back: "60. Say: seh-SEN-tah." },
            { front: "setenta", back: "70. Say: seh-TEN-tah." },
            { front: "ochenta", back: "80. Say: oh-CHEN-tah. Ocho is 8!" },
            { front: "noventa", back: "90. Say: noh-VEN-tah. Nueve is 9!" },
            { front: "cien 💯", back: "100. Say: syen." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each Spanish number to its spot on the number line.",
          min: 0,
          max: 100,
          step: 10,
          tolerance: 0,
          items: [
            { label: "sesenta", value: 60 },
            { label: "ochenta", value: 80 },
            { label: "noventa", value: 90 },
            { label: "cien", value: 100 },
          ],
          hint: "Sesenta is 60, ochenta is 80 (like ocho), noventa is 90 (like nueve) and cien is 100.",
          mistakes: [
            { match: "Put sesenta at 70", coach: "Sesenta has seis, 6, hiding inside, so it's 60. Setenta is 70." },
            { match: "Put noventa at 80", coach: "Noventa sounds like nueve, 9, so it's 90." },
          ],
          seconds: 35,
        },
        think: {
          q: "What is cien?",
          choices: ["100", "10", "90"],
          answer: 0,
          why: "Cien is 100. 💯",
          hints: ["", "10 is diez.", "90 is noventa."],
        },
        approaches: {
          analogy:
            "The big tens are like grown-up versions of the small numbers. Little ocho grows up into ochenta. Little nueve grows up into noventa.",
          example:
            "Ochenta: take off the end and you hear ocho, 8. So ochenta is 8 tens, which is 80.",
          simpler: {
            q: "Ocho is 8. So what is ochenta?",
            choices: ["18", "80", "8"],
            answer: 1,
            why: "Ochenta is eight tens, which is 80.",
            hints: ["18 is dieciocho. Ochenta counts tens.", "", "8 is just ocho. Ochenta is much bigger."],
          },
        },
      },
      {
        title: "Counting Dimes by Tens",
        teach:
          "Let's use our tens with money! One dime is 10 cents. 🪙 Count dimes by tens. Diez, veinte, treinta. Three dimes make treinta cents. Five dimes make cincuenta cents. Ten dimes make cien cents. That is one whole dollar! 💵 Every time you add a dime, jump to the next ten. Now you count!",
        visual: {
          type: "sequence",
          prompt: "Count the dimes by tens. Put the numbers in order.",
          steps: ["diez", "veinte", "treinta", "cuarenta", "cincuenta"],
        },
        probe: {
          type: "number",
          prompt: "You have 🪙🪙🪙🪙 four dimes. Count in Spanish: diez, veinte, treinta, cuarenta. How many cents is cuarenta? Type the number.",
          answer: 40,
          unit: "cents",
          hint: "Cuarenta sounds like cuatro, 4. Four tens is 40.",
          mistakes: [
            { match: "4", coach: "Four is the number of dimes. Each dime is 10 cents, so count by tens." },
            { match: "14", coach: "Fourteen is catorce. Cuarenta is four tens." },
          ],
          seconds: 20,
        },
        think: {
          q: "Five dimes make how many cents?",
          choices: ["cinco", "cincuenta", "cien"],
          answer: 1,
          why: "Five dimes is five tens: diez, veinte, treinta, cuarenta, cincuenta. That's 50.",
          hints: ["Cinco is 5, but each dime is worth 10 cents.", "", "Cien is 100. That would take ten dimes."],
        },
        approaches: {
          analogy:
            "Each dime is like a ten-block. Line them up and count the blocks by tens, one Spanish word for each block.",
          example:
            "Put down 🪙🪙🪙. Touch each one as you count: diez, veinte, treinta. Three dimes make treinta cents, which is 30.",
          simpler: {
            q: "One dime is worth how many cents?",
            choices: ["1", "10", "100"],
            answer: 1,
            why: "One dime is worth 10 cents: diez.",
            hints: ["A penny is 1 cent. A dime is worth more.", "", "100 cents is a whole dollar. A dime is one ten."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Count by tens to 100! Put the Spanish numbers in order.",
      steps: ["diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa", "cien"],
    },
    explain: {
      prompt: "Count by tens to 100 in Spanish for Señora Luz. Then tell her a trick to remember one of the big numbers.",
      keyPoints: [
        "Counts diez, veinte, treinta, cuarenta, cincuenta",
        "Counts sesenta, setenta, ochenta, noventa, cien",
        "Cien is 100",
        "Some tens sound like small numbers, like ocho and ochenta",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each Spanish number to the right tens.",
        pairs: [
          { left: "veinte", right: "20" },
          { left: "cincuenta", right: "50" },
          { left: "setenta", right: "70" },
          { left: "noventa", right: "90" },
          { left: "cien", right: "100" },
        ],
        hint: "Count by tens in order: diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien.",
        mistakes: [{ match: "Mixed up sesenta and setenta", coach: "Setenta has siete inside, so it's 70." }],
        seconds: 40,
      },
      {
        type: "place",
        prompt: "Drag each Spanish number to its spot on the number line.",
        min: 0,
        max: 100,
        step: 10,
        tolerance: 0,
        items: [
          { label: "veinte", value: 20 },
          { label: "cuarenta", value: 40 },
          { label: "setenta", value: 70 },
        ],
        hint: "Veinte is 20, cuarenta is 40 (like cuatro) and setenta is 70 (like siete).",
        mistakes: [{ match: "Put cuarenta at 50", coach: "Cuarenta sounds like cuatro, 4, so it's 40. Cincuenta is 50." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Cincuenta plus diez. 🧮 What number do you get? Type it.",
        answer: 60,
        hint: "Cincuenta is 50 and diez is 10. Jump one ten up from 50.",
        mistakes: [{ match: "50", coach: "That's cincuenta by itself. Add diez, ten more." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "Diez, veinte, {0}, cuarenta, cincuenta, sesenta, setenta, {1}, noventa, {2}! 💯",
        blanks: [{ answers: ["treinta"] }, { answers: ["ochenta"] }, { answers: ["cien"] }],
        bank: ["treinta", "ochenta", "cien", "trece", "ocho"],
        hint: "After veinte comes treinta. After setenta comes ochenta. After noventa comes cien.",
        mistakes: [
          { match: "trece", coach: "Trece is 13. We're counting by tens, so after veinte comes treinta, 30." },
          { match: "ocho", coach: "Ocho is 8. We need its tens partner, ochenta, 80." },
        ],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What number is cuarenta?",
        choices: ["14", "4", "40"],
        answer: 2,
        why: "Cuarenta is four tens, 40.",
      },
      {
        q: "What comes after noventa?",
        choices: ["cien", "ochenta", "diez"],
        answer: 0,
        why: "Noventa is 90, and the next ten is cien, 100.",
      },
      {
        q: "How do you say 20 in Spanish?",
        choices: ["doce", "veinte", "treinta"],
        answer: 1,
        why: "Veinte is 20.",
      },
      {
        q: "Three dimes make how many cents?",
        choices: ["tres", "treinta", "trece"],
        answer: 1,
        why: "Three dimes count diez, veinte, treinta: 30 cents.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, make 10 piles of 10 small things, like dry beans, buttons or pennies. Point to each pile and count by tens in Spanish all the way to cien!",
      rubric: [
        "Makes piles of ten",
        "Counts by tens in Spanish from diez to cien",
        "Says cien for 100",
      ],
    },
  },

  // 5. Months and birthdays
  {
    id: "span-2.months",
    title: "Los meses: Months and Birthdays",
    minutes: 15,
    stage: "grammar",
    standards: ["SPAN.2.3", "SPAN.2.7", "SPAN.2.8", "SPAN.2.11", "SPAN.2.12"],
    read: [
      "Los meses (MEH-ses) means the months. 📅 There are twelve months in a year.",
      "Enero (eh-NEH-roh) is January. Febrero (feh-BREH-roh) is February. Marzo (MAR-soh) is March. Abril (ah-BREEL) is April. Mayo (MAH-yoh) is May. Junio (HOO-nyoh) is June.",
      "Julio (HOO-lyoh) is July. Agosto (ah-GOHS-toh) is August. Septiembre (sep-TYEM-breh) is September. Octubre (ok-TOO-breh) is October. Noviembre (noh-VYEM-breh) is November. Diciembre (dee-SYEM-breh) is December.",
      "Here is a surprise. In English, months start with a big capital letter. In Spanish, they start with a small letter: enero, mayo.",
      "Cumpleaños (koom-pleh-AH-nyohs) means birthday. 🎂 To ask, say ¿Cuándo es tu cumpleaños? (KWAN-doh es too koom-pleh-AH-nyohs). To answer, say Mi cumpleaños es el diez de mayo. That means my birthday is May 10.",
      "In Mexico, families often sing a birthday song called Las Mañanitas (lahs mah-nyah-NEE-tahs). Many kids break a piñata 🪅 full of candy. How is that like your birthday?",
    ].join("\n\n"),
    keyIdeas: [
      "The twelve months are enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre and diciembre.",
      "In Spanish, months start with a small letter.",
      "¿Cuándo es tu cumpleaños? Mi cumpleaños es el diez de mayo.",
      "In Mexico, families sing Las Mañanitas, and kids often break a piñata.",
    ],
    hook: {
      text: "Pip's birthday is coming soon! 🎂 Pip wants to tell everyone the date in Spanish. First, we need the names of the months. Let's learn all twelve! 📅",
    },
    teach: [
      {
        title: "Enero to Junio",
        teach:
          "Los meses (MEH-ses) means the months. 📅 Here are the first six. Enero (eh-NEH-roh) is January. ❄️ Febrero (feh-BREH-roh) is February. Marzo (MAR-soh) is March. Abril (ah-BREEL) is April. 🌷 Mayo (MAH-yoh) is May. Junio (HOO-nyoh) is June. ☀️ Here is a surprise. In Spanish, months start with a small letter, like enero.",
        visual: {
          type: "flip",
          cards: [
            { front: "enero ❄️", back: "January. Say: eh-NEH-roh." },
            { front: "febrero", back: "February. Say: feh-BREH-roh." },
            { front: "marzo", back: "March. Say: MAR-soh." },
            { front: "abril 🌷", back: "April. Say: ah-BREEL." },
            { front: "mayo", back: "May. Say: MAH-yoh." },
            { front: "junio ☀️", back: "June. Say: HOO-nyoh." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Put each month on the calendar line. January is 1 and June is 6.",
          min: 1,
          max: 6,
          step: 1,
          tolerance: 0,
          items: [
            { label: "enero", value: 1 },
            { label: "marzo", value: 3 },
            { label: "abril", value: 4 },
            { label: "junio", value: 6 },
          ],
          hint: "Say them in order: enero, febrero, marzo, abril, mayo, junio.",
          mistakes: [{ match: "Swapped marzo and mayo", coach: "Marzo is March, month 3. Mayo is May, month 5." }],
          seconds: 35,
        },
        think: {
          q: "What month is abril?",
          choices: ["August", "April", "March"],
          answer: 1,
          why: "Abril is April. They sound a lot alike!",
          hints: ["August is agosto.", "", "March is marzo."],
        },
        approaches: {
          analogy:
            "Many Spanish months are like cousins of the English ones. Abril and April, marzo and March. They look and sound a lot alike.",
          example:
            "New Year's Day is in January, so it's in enero. Spring flowers bloom in April, so they bloom in abril. 🌷",
          simpler: {
            q: "Which month comes first in the year?",
            choices: ["junio", "enero", "mayo"],
            answer: 1,
            why: "Enero, January, is the first month.",
            hints: ["Junio is June, month 6.", "", "Mayo is May, month 5."],
          },
        },
      },
      {
        title: "Julio to Diciembre",
        teach:
          "Here are the last six months. Julio (HOO-lyoh) is July. 🏖️ Agosto (ah-GOHS-toh) is August. Septiembre (sep-TYEM-breh) is September. 🍎 Octubre (ok-TOO-breh) is October. 🍂 Noviembre (noh-VYEM-breh) is November. Diciembre (dee-SYEM-breh) is December. ⛄ Look at the last four. They sound a lot like English! Septiembre, September. Octubre, October.",
        visual: {
          type: "flip",
          cards: [
            { front: "julio 🏖️", back: "July. Say: HOO-lyoh." },
            { front: "agosto", back: "August. Say: ah-GOHS-toh." },
            { front: "septiembre 🍎", back: "September. Say: sep-TYEM-breh." },
            { front: "octubre 🍂", back: "October. Say: ok-TOO-breh." },
            { front: "noviembre", back: "November. Say: noh-VYEM-breh." },
            { front: "diciembre ⛄", back: "December. Say: dee-SYEM-breh." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each Spanish month to the English month.",
          pairs: [
            { left: "julio", right: "July" },
            { left: "agosto", right: "August" },
            { left: "octubre", right: "October" },
            { left: "diciembre", right: "December" },
          ],
          hint: "Listen to the sounds: octubre sounds like October, diciembre like December.",
          mistakes: [{ match: "Mixed up julio and junio", coach: "Junio is June. Julio, with an l, is July." }],
          seconds: 30,
        },
        think: {
          q: "What month is diciembre?",
          choices: ["October", "November", "December"],
          answer: 2,
          why: "Diciembre is December, the last month of the year. ⛄",
          hints: ["October is octubre.", "November is noviembre.", ""],
        },
        approaches: {
          analogy:
            "The last four months are like twins. Septiembre, octubre, noviembre and diciembre sound almost like September, October, November and December.",
          example:
            "Summer vacation is often in July, so in julio. Leaves fall in October, so in octubre. 🍂",
          simpler: {
            q: "What month is octubre?",
            choices: ["October", "August"],
            answer: 0,
            why: "Octubre is October.",
            hints: ["", "August is agosto. Octubre sounds like October."],
          },
        },
      },
      {
        title: "¡Feliz cumpleaños!",
        teach:
          "Cumpleaños (koom-pleh-AH-nyohs) means birthday. 🎂 To ask a friend, say ¿Cuándo es tu cumpleaños? (KWAN-doh es too koom-pleh-AH-nyohs). It means when is your birthday? Answer like this. Mi cumpleaños es el diez de mayo. My birthday is May 10. In Mexico, families often sing a birthday song called Las Mañanitas (lahs mah-nyah-NEE-tahs). Many kids break a piñata. 🪅 ¡Feliz cumpleaños!",
        visual: {
          type: "compare",
          left: { title: "A birthday at home 🎂", points: ["Sing Happy Birthday", "Blow out candles", "Open presents"] },
          right: { title: "A birthday in Mexico 🪅", points: ["Sing Las Mañanitas", "Blow out candles", "Break a piñata full of candy"] },
        },
        probe: {
          type: "build",
          prompt: "Build it in Spanish: My birthday is May 10. 🎂",
          tiles: ["Mi cumpleaños", "es", "el diez", "de mayo"],
          distractors: ["de junio", "Tengo"],
          hint: "Start with mi cumpleaños es, then the day, el diez, then the month, de mayo.",
          mistakes: [
            { match: "de junio", coach: "Junio is June. The birthday is in May: de mayo." },
            { match: "Tengo", coach: "Tengo is for your age. Here we tell a date." },
          ],
          seconds: 30,
        },
        think: {
          q: "What does ¿Cuándo es tu cumpleaños? mean?",
          choices: ["How old are you?", "When is your birthday?", "Where is the cake?"],
          answer: 1,
          why: "Cuándo means when, and cumpleaños means birthday.",
          hints: ["How old are you is ¿Cuántos años tienes?", "", "There is no cake word here. Cumpleaños means birthday."],
        },
        approaches: {
          analogy:
            "Telling your birthday in Spanish is like a little address: first the day number, then de, then the month. El diez de mayo.",
          example:
            "Lucas was born on July 4. He says, Mi cumpleaños es el cuatro de julio. The day comes first, then de julio.",
          simpler: {
            q: "What does cumpleaños mean?",
            choices: ["birthday", "month", "house"],
            answer: 0,
            why: "Cumpleaños means birthday. 🎂",
            hints: ["", "Month is mes. Cumpleaños is a special day each year.", "House is casa."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put these months in order, from the start of the year to the end. 📅",
      steps: ["enero", "marzo", "mayo", "julio", "septiembre", "noviembre"],
    },
    explain: {
      prompt: "Tell Señora Luz when your birthday is, in Spanish. Then tell her one way people celebrate birthdays in Mexico.",
      keyPoints: [
        "Says mi cumpleaños es with a day and a month",
        "Names the month in Spanish",
        "In Mexico, families sing Las Mañanitas",
        "Many kids break a piñata",
      ],
    },
    mastery: [
      {
        type: "sequence",
        prompt: "Put the first six months in order.",
        steps: ["enero", "febrero", "marzo", "abril", "mayo", "junio"],
        hint: "Start with enero, January. End with junio, June.",
        mistakes: [{ match: "Swapped marzo and mayo", coach: "Marzo is March, month 3. Mayo is May, month 5." }],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each Spanish month to the English month.",
        pairs: [
          { left: "febrero", right: "February" },
          { left: "junio", right: "June" },
          { left: "julio", right: "July" },
          { left: "septiembre", right: "September" },
          { left: "noviembre", right: "November" },
        ],
        hint: "Junio is June and julio is July. The others sound a lot like English.",
        mistakes: [{ match: "Mixed up junio and julio", coach: "Junio has an n, like June. Julio has an l, like July." }],
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Ana: ¿Cuándo es tu {0}? 🎂 Leo: Mi cumpleaños es el cinco de {1}. 🎉 (May 5)",
        blanks: [{ answers: ["cumpleaños", "cumpleanos"] }, { answers: ["mayo"] }],
        bank: ["cumpleaños", "mayo", "marzo", "casa"],
        hint: "Birthday is cumpleaños. May is mayo.",
        mistakes: [
          { match: "marzo", coach: "Marzo is March. Leo's birthday is in May: mayo." },
          { match: "casa", coach: "Casa means house. Ana is asking about a birthday: cumpleaños." },
        ],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the month written the Spanish way, with a small letter.",
        sentences: ["Enero", "enero", "ENERO"],
        correct: [1],
        hint: "In Spanish, months start with a small letter.",
        mistakes: [{ match: "Picked Enero", coach: "That's the English way, with a capital. Spanish months start small: enero." }],
        seconds: 15,
      },
    ],
    check: [
      {
        q: "What month is enero?",
        choices: ["June", "January", "July"],
        answer: 1,
        why: "Enero is January, the first month.",
      },
      {
        q: "How do Spanish months start?",
        choices: ["With a small letter", "With a capital letter", "With a number"],
        answer: 0,
        why: "In Spanish, months start with a small letter, like mayo.",
      },
      {
        q: "Mi cumpleaños es el diez de mayo. When is the birthday?",
        choices: ["March 10", "May 2", "May 10"],
        answer: 2,
        why: "Diez is 10 and mayo is May, so the birthday is May 10.",
      },
      {
        q: "What birthday song do many families in Mexico sing?",
        choices: ["Las Mañanitas", "Mucho Gusto", "Los Meses"],
        answer: 0,
        why: "Many families in Mexico sing Las Mañanitas on birthdays.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Ask everyone in your family ¿Cuándo es tu cumpleaños? Help each person answer in Spanish, like el diez de mayo. Then make a birthday list with the months written in Spanish.",
      rubric: [
        "Asks ¿Cuándo es tu cumpleaños? in Spanish",
        "Says their own birthday with mi cumpleaños es",
        "Writes the months in Spanish with small letters",
      ],
    },
  },

  // 6. Mexico and Spain
  {
    id: "span-2.culture",
    title: "México y España",
    minutes: 20,
    stage: "logic",
    standards: ["SPAN.2.3", "SPAN.2.9", "SPAN.2.10", "SPAN.2.12"],
    read: [
      "Spanish is spoken in many countries. Today we visit two of them: México (MEH-hee-koh) and España (es-PAH-nyah). 🌎",
      "Mexico is in North America. It is just south of the United States. Its capital is Mexico City. 🇲🇽 Spain is in Europe, across the Atlantic Ocean. Its capital is Madrid (mah-DREED). 🇪🇸 The Spanish language first came from Spain.",
      "Let's eat! In Mexico, people make tortillas from corn. 🌽 Corn was first grown in Mexico long, long ago. Tacos are tortillas filled with tasty food. 🌮 In Spain, people cook paella (pah-EH-yah). It is rice cooked in a big, flat pan. 🥘",
      "Let's celebrate! On September 16, Mexico celebrates its Independence Day with flags, music and fireworks. 🎆 In the Spanish town of Buñol, people throw squishy tomatoes in a giant, messy party called La Tomatina. 🍅 In both countries, January 6 is Three Kings' Day. Kids get small gifts and share a sweet bread ring.",
    ].join("\n\n"),
    keyIdeas: [
      "Mexico is in North America, and its capital is Mexico City. Spain is in Europe, and its capital is Madrid.",
      "Mexico is famous for corn tortillas and tacos. Spain is famous for paella.",
      "Mexico celebrates Independence Day on September 16. Spain has La Tomatina. Both celebrate Three Kings' Day on January 6.",
    ],
    hook: {
      text: "A boat comes to the Riverbend market with a map! 🗺️ It shows two faraway countries where people speak Spanish. One is México. One is España. Let's take a trip! ✈️",
    },
    teach: [
      {
        title: "Where Are They?",
        teach:
          "México (MEH-hee-koh) is Mexico. 🇲🇽 It is in North America, just south of the United States. Its capital is Mexico City. España (es-PAH-nyah) is Spain. 🇪🇸 It is in Europe. To get there, you cross the big Atlantic Ocean. 🌊 Its capital is Madrid (mah-DREED). Here is a fun fact. The Spanish language first came from Spain!",
        visual: {
          type: "compare",
          left: { title: "México 🇲🇽", points: ["In North America", "Just south of the United States", "Capital: Mexico City"] },
          right: { title: "España 🇪🇸", points: ["In Europe", "Across the Atlantic Ocean", "Capital: Madrid"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each fact: is it about México or España?",
          buckets: ["México 🇲🇽", "España 🇪🇸"],
          items: [
            { text: "In North America", bucket: 0 },
            { text: "Just south of the United States", bucket: 0 },
            { text: "Capital: Mexico City", bucket: 0 },
            { text: "In Europe", bucket: 1 },
            { text: "Across the Atlantic Ocean", bucket: 1 },
            { text: "Capital: Madrid", bucket: 1 },
          ],
          hint: "Mexico is our neighbor in North America. Spain is far away in Europe, across the ocean.",
          mistakes: [{ match: "Madrid sorted as México", coach: "Madrid is the capital of Spain. Mexico's capital is Mexico City." }],
          seconds: 35,
        },
        think: {
          q: "Where is Spain?",
          choices: ["In North America", "In Europe", "Just south of the United States"],
          answer: 1,
          why: "Spain is in Europe, across the Atlantic Ocean.",
          hints: ["Mexico is in North America. Spain is across the ocean.", "", "That's Mexico. Spain is far away across the ocean."],
        },
        approaches: {
          analogy:
            "Mexico is like the next-door neighbor of the United States. Spain is like a friend who lives across a very big lake, the Atlantic Ocean.",
          example:
            "Find the United States on a globe. Slide your finger south and you reach Mexico. Now go east across the Atlantic Ocean to Europe. There is Spain!",
          simpler: {
            q: "What is the capital of Spain?",
            choices: ["Mexico City", "Madrid"],
            answer: 1,
            why: "Madrid is the capital of Spain.",
            hints: ["Mexico City is the capital of Mexico.", ""],
          },
        },
      },
      {
        title: "¡A comer! Let's Eat!",
        teach:
          "¡A comer! (ah koh-MER) means let's eat! 🍽️ In Mexico, people make tortillas (tor-TEE-yahs) from corn. 🌽 Corn was first grown in Mexico, long, long ago. Fold a tortilla around tasty food and you have a taco. 🌮 In Spain, people love paella (pah-EH-yah). It is rice cooked in a big, flat pan. 🥘 Both foods are shared with family and friends.",
        visual: {
          type: "flip",
          cards: [
            { front: "la tortilla 🫓", back: "A thin, flat bread. In Mexico it is often made from corn." },
            { front: "el taco 🌮", back: "A tortilla folded around tasty food." },
            { front: "la paella 🥘", back: "A Spanish dish of rice cooked in a big, flat pan. Say: pah-EH-yah." },
            { front: "el maíz 🌽", back: "Corn. Say: mah-EES. Corn was first grown in Mexico long ago." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each food to where it is famous.",
          pairs: [
            { left: "🌮 tacos", right: "México 🇲🇽" },
            { left: "🥘 paella", right: "España 🇪🇸" },
          ],
          hint: "Tacos are made with tortillas from Mexico. Paella is a rice dish from Spain.",
          mistakes: [{ match: "Swapped them", coach: "Tacos use corn tortillas, from Mexico. Paella, the rice in a big pan, is from Spain." }],
          seconds: 15,
        },
        think: {
          q: "What is paella?",
          choices: ["Corn bread from Mexico", "Rice cooked in a big, flat pan", "A birthday song"],
          answer: 1,
          why: "Paella is a Spanish dish of rice cooked in a big, flat pan.",
          hints: ["That's a tortilla. Paella is made with rice.", "", "The birthday song is Las Mañanitas. Paella is food."],
        },
        approaches: {
          analogy:
            "A tortilla is a bit like a soft, round plate you can eat. You put food on it, fold it, and you have a taco.",
          example:
            "A family in Mexico warms corn tortillas, fills them with beans and cheese, and folds them into tacos. A family in Spain cooks rice in one big pan and everyone eats paella together.",
          simpler: {
            q: "What are Mexican tortillas often made from?",
            choices: ["corn", "tomatoes", "apples"],
            answer: 0,
            why: "Many Mexican tortillas are made from corn. 🌽",
            hints: ["", "Tomatoes are for La Tomatina! Tortillas are made from corn.", "Apples are a fruit. Tortillas are made from corn."],
          },
        },
      },
      {
        title: "¡Fiesta! Let's Celebrate",
        teach:
          "Fiesta (fee-ES-tah) means party! 🎉 On September 16, Mexico celebrates its Independence Day. People wave green, white and red flags, play music and watch fireworks. 🎆 In the Spanish town of Buñol (boo-NYOHL), people throw squishy tomatoes in a giant, messy party called La Tomatina. 🍅 In both countries, January 6 is Three Kings' Day. 👑 Kids get small gifts and share a sweet bread ring.",
        visual: {
          type: "hotspots",
          title: "Fiestas",
          center: "🎉",
          spots: [
            { label: "Independence Day", icon: "🇲🇽", detail: "Mexico, September 16: green, white and red flags, music and fireworks." },
            { label: "La Tomatina", icon: "🍅", detail: "Buñol, Spain: a giant, messy tomato-throwing party." },
            { label: "Three Kings' Day", icon: "👑", detail: "Mexico and Spain, January 6: small gifts and a sweet bread ring." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each fiesta: México, España, or both?",
          buckets: ["México 🇲🇽", "España 🇪🇸", "Both 🇲🇽🇪🇸"],
          items: [
            { text: "🎆 Independence Day on September 16", bucket: 0 },
            { text: "🍅 La Tomatina in Buñol", bucket: 1 },
            { text: "👑 Three Kings' Day on January 6", bucket: 2 },
          ],
          hint: "September 16 is Mexico's Independence Day. La Tomatina is in a Spanish town. Three Kings' Day is in both.",
          mistakes: [{ match: "Three Kings' Day sorted in one country", coach: "Kids in both Mexico and Spain celebrate Three Kings' Day on January 6." }],
          seconds: 25,
        },
        think: {
          q: "What happens at La Tomatina?",
          choices: ["People break a piñata", "People throw squishy tomatoes", "People cook paella in a pan"],
          answer: 1,
          why: "At La Tomatina in Buñol, Spain, people throw squishy tomatoes in a giant, messy party.",
          hints: ["Piñatas are for birthdays. La Tomatina is about tomatoes.", "", "Paella is a food. La Tomatina is a messy tomato party."],
        },
        approaches: {
          analogy:
            "La Tomatina is like the biggest, messiest food fight you can imagine, but with only soft, squishy tomatoes.",
          example:
            "On January 6, a girl in Mexico wakes up to a small gift for Three Kings' Day. Her family shares a sweet bread ring. A boy in Spain does the same thing that very day!",
          simpler: {
            q: "What does fiesta mean?",
            choices: ["school", "party", "kitchen"],
            answer: 1,
            why: "Fiesta means party. 🎉",
            hints: ["School is escuela.", "", "Kitchen is la cocina."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each card: México, España, or both?",
      buckets: ["México 🇲🇽", "España 🇪🇸", "Both 🇲🇽🇪🇸"],
      items: [
        { text: "Capital: Mexico City", bucket: 0 },
        { text: "🌮 tacos with corn tortillas", bucket: 0 },
        { text: "🎆 Independence Day on September 16", bucket: 0 },
        { text: "Capital: Madrid", bucket: 1 },
        { text: "🥘 paella", bucket: 1 },
        { text: "🍅 La Tomatina", bucket: 1 },
        { text: "🗣️ People speak Spanish", bucket: 2 },
        { text: "👑 Three Kings' Day on January 6", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pretend you just came home from a trip to México and España. Tell Señora Luz where each country is, one food and one fiesta.",
      keyPoints: [
        "Mexico is in North America, south of the United States",
        "Spain is in Europe, across the Atlantic Ocean",
        "Names a food, like tacos or paella",
        "Names a fiesta, like Independence Day, La Tomatina or Three Kings' Day",
        "People speak Spanish in both countries",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each country to its capital city.",
        pairs: [
          { left: "México 🇲🇽", right: "Mexico City" },
          { left: "España 🇪🇸", right: "Madrid" },
        ],
        hint: "Mexico's capital has the same name as the country. Spain's capital is Madrid.",
        mistakes: [{ match: "Swapped them", coach: "Madrid is in Spain, in Europe. Mexico City is in Mexico." }],
        seconds: 15,
      },
      {
        type: "cloze",
        text: "México is in North {0}. 🌎 España is in {1}. 🌍 In Spain, people eat {2}. 🥘",
        blanks: [{ answers: ["America"] }, { answers: ["Europe"] }, { answers: ["paella"] }],
        bank: ["America", "Europe", "paella", "Africa", "tacos"],
        hint: "Mexico is in North America. Spain is in Europe. The rice dish from Spain is paella.",
        mistakes: [
          { match: "Africa", coach: "Spain is close to Africa, but Spain itself is in Europe." },
          { match: "tacos", coach: "Tacos are famous in Mexico. The rice dish in the big pan from Spain is paella." },
        ],
        seconds: 30,
      },
      {
        type: "place",
        prompt: "Put each fiesta on the calendar line by its month number. January is 1 and December is 12.",
        min: 1,
        max: 12,
        step: 1,
        tolerance: 0,
        items: [
          { label: "👑 Three Kings' Day (enero)", value: 1 },
          { label: "🎆 Mexico's Independence Day (septiembre)", value: 9 },
        ],
        hint: "Enero is January, month 1. Septiembre is September, month 9.",
        mistakes: [{ match: "Put septiembre at 7", coach: "Septiembre sounds like seven, but it is September, month 9." }],
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Sort each one: México or España?",
        buckets: ["México 🇲🇽", "España 🇪🇸"],
        items: [
          { text: "🌽 Corn was first grown here", bucket: 0 },
          { text: "🌮 tacos", bucket: 0 },
          { text: "🍅 La Tomatina", bucket: 1 },
          { text: "🏙️ Madrid", bucket: 1 },
        ],
        hint: "Corn and tacos come from Mexico. La Tomatina and Madrid are in Spain.",
        mistakes: [{ match: "La Tomatina sorted as México", coach: "La Tomatina happens in Buñol, a town in Spain." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which continent is Mexico in?",
        choices: ["Europe", "Asia", "North America"],
        answer: 2,
        why: "Mexico is in North America, just south of the United States.",
      },
      {
        q: "What is the capital of Spain?",
        choices: ["Madrid", "Mexico City", "Buñol"],
        answer: 0,
        why: "Madrid is the capital of Spain. Buñol is the town with La Tomatina.",
      },
      {
        q: "What are tortillas in Mexico often made from?",
        choices: ["rice", "corn", "tomatoes"],
        answer: 1,
        why: "Many Mexican tortillas are made from corn, which was first grown in Mexico.",
      },
      {
        q: "When do kids in Mexico and Spain celebrate Three Kings' Day?",
        choices: ["September 16", "December 31", "January 6"],
        answer: 2,
        why: "Three Kings' Day is on January 6 in both countries.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, find Mexico and Spain on a globe or map. Put a sticky note on each one with its capital. Then, if you can, make a simple Mexican or Spanish food together, like corn tortillas or a rice dish, and say ¡A comer! before you eat.",
      rubric: [
        "Finds Mexico and Spain on a map or globe",
        "Names each capital: Mexico City and Madrid",
        "Tells one food or fiesta from each country",
      ],
    },
  },
]);
