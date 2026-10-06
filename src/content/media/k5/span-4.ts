import type { CourseMedia } from "../types";

/** Slides for span-4, by lesson id. */
export const span4Media: CourseMedia = {
  "span-4.routine": {
    hook: {
      show: [
        { emoji: "🧚🏜️🌅", caption: "Sunrise in the Canyon of Echoes" },
        { at: "Me levanto, me visto, desayuno", emoji: "🥱🗣️⛰️", caption: "Me levanto, me visto, desayuno... (echo!)" },
        { at: "tell your own morning", emoji: "☀️🪥🥣", caption: "Today: tell your own morning in Spanish" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⏰", caption: "me despierto: I wake up" },
          { at: "Me levanto (meh", emoji: "🛏️➡️🧍", caption: "me levanto: I get up" },
          { at: "Me cepillo los dientes (meh", emoji: "🪥😁", caption: "me cepillo los dientes: I brush my teeth" },
          { at: "Me visto (meh", emoji: "👕👖", caption: "me visto: I get dressed" },
          { at: "starts with me", big: "me", caption: "The word me points back to you" },
        ],
      },
      {
        show: [
          { emoji: "🥣", caption: "desayuno: I eat breakfast" },
          { at: "Ceno (SEH-noh)", emoji: "🍽️🌙", caption: "ceno: I eat dinner" },
          { at: "Me acuesto", emoji: "🛌", caption: "me acuesto: I go to bed" },
          { at: "Primero (pree-MEH-roh)", big: "1️⃣ 2️⃣ 3️⃣", caption: "primero, luego, después: first, then, after that" },
          { at: "numbers in a recipe", emoji: "📋", caption: "Order words tell what comes next" },
        ],
      },
      {
        show: [
          { emoji: "🕖", caption: "Add a time with a las" },
          { at: "Me levanto a las siete", big: "7:00", caption: "Me levanto a las siete." },
          { at: "¿A qué hora te levantas?", big: "¿A qué hora?", caption: "¿A qué hora te levantas? What time do you get up?" },
          { at: "Me is for me", emoji: "🙋➡️🫵", caption: "me is for me, te is for you" },
        ],
      },
    ],
  },

  "span-4.restaurant": {
    hook: {
      show: [
        { emoji: "🚂🍽️🚪", caption: "A little restaurant in the railroad town" },
        { at: "the menu is all in Spanish", emoji: "📜❓", caption: "The menu is all in Spanish!" },
        { at: "¿Qué desea?", big: "¿Qué desea?", caption: "What would you like?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📜", caption: "el menú: the menu" },
          { at: "La sopa (SOH-pah)", emoji: "🍲🥗", caption: "la sopa, la ensalada" },
          { at: "El pollo con arroz", emoji: "🍗🍚🐟🍟", caption: "el pollo con arroz, el pescado, las papas fritas" },
          { at: "Para beber", emoji: "💧🧃", caption: "para beber: el agua, el jugo de naranja" },
          { at: "El postre", emoji: "🍮🍨", caption: "el postre: el flan, el helado" },
        ],
      },
      {
        show: [
          { emoji: "🧑‍🍳", caption: "el mesero: the waiter" },
          { at: "¿Qué desea?", big: "¿Qué desea?", caption: "What would you like?" },
          { at: "quisiera (kee-see-EH-rah)", big: "Quisiera...", caption: "quisiera: I would like" },
          { at: "Quisiera la sopa, por favor", emoji: "🍲🙏", caption: "Quisiera la sopa, por favor." },
          { at: "good manners in every language", emoji: "😊🌎", caption: "Por favor and gracias, everywhere" },
        ],
      },
      {
        show: [
          { emoji: "🍽️😋", caption: "¡Buen provecho! Enjoy your meal!" },
          { at: "¿Algo más?", big: "¿Algo más?", caption: "Anything else?" },
          { at: "La cuenta (KWEN-tah)", emoji: "🧾", caption: "La cuenta, por favor: the bill, please" },
          { at: "waits for you to ask", emoji: "⏳🗣️", caption: "Often you ask for the bill yourself" },
          { at: "lunch is the biggest meal", emoji: "🕑🍲", caption: "Lunch is often the biggest meal" },
        ],
      },
    ],
  },

  "span-4.shopping": {
    hook: {
      show: [
        { emoji: "🚉🛒🧺", caption: "A busy market by the train station" },
        { at: "Cuesta setecientos pesos", big: "700", caption: "Cuesta setecientos pesos!" },
        { at: "count to mil", big: "1,000", caption: "Let's count to mil!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "100", caption: "cien (see-EN)" },
          { at: "Doscientos (dohs-see-EN-tohs)", big: "200", caption: "doscientos: dos + cientos" },
          { at: "Quinientos (kee-nee-EN-tohs)", big: "500", caption: "quinientos: a tricky one!" },
          { at: "Setecientos (seh-teh-see-EN-tohs)", big: "700 · 900", caption: "setecientos and novecientos: tricky too" },
          { at: "mil (meel)", big: "1,000", caption: "mil: one thousand" },
        ],
      },
      {
        show: [
          { big: "101", caption: "ciento uno" },
          { at: "Doscientos cincuenta is 250", big: "250", caption: "doscientos cincuenta" },
          { at: "Trescientos cuarenta y cinco", big: "345", caption: "trescientos cuarenta y cinco" },
          { at: "only goes between the tens", emoji: "🧱", caption: "Y goes only between the tens and the ones" },
        ],
      },
      {
        show: [
          { emoji: "🏪", caption: "la tienda: the store" },
          { at: "¿Cuánto cuesta? (KWAN-toh", big: "¿Cuánto cuesta?", caption: "How much does it cost?" },
          { at: "¿Cuánto cuestan los zapatos?", emoji: "👟👟", caption: "More than one thing: cuestan" },
          { at: "Es caro", emoji: "💸", caption: "Es caro: it's expensive" },
          { at: "Es barato", emoji: "🪙🛍️", caption: "Es barato: it's cheap. ¡Lo compro!" },
        ],
      },
    ],
  },

  "span-4.directions": {
    hook: {
      show: [
        { emoji: "🚂🏘️🧚", caption: "Pip is lost in the railroad town" },
        { at: "Sigue todo recto", emoji: "⬆️➡️", caption: "Sigue todo recto, luego gira a la derecha" },
        { at: "ask for directions", emoji: "🗺️🗣️", caption: "Let's learn to ask for directions" },
      ],
    },
    teach: [
      {
        show: [
          { big: "¿Dónde está...?", caption: "Where is...?" },
          { at: "Perdón (pehr-DOHN)", emoji: "🙋", caption: "Perdón: excuse me" },
          { at: "Está cerca", emoji: "👣🏠", caption: "cerca: near · lejos: far" },
          { at: "Al lado de", emoji: "🏦↔️🏛️", caption: "al lado de: next to · enfrente de: across from" },
          { at: "de meets el", big: "de + el = del", caption: "al lado del banco" },
        ],
      },
      {
        show: [
          { emoji: "⬆️", caption: "Sigue todo recto: go straight ahead" },
          { at: "Gira a la derecha", emoji: "➡️", caption: "Gira a la derecha: turn right" },
          { at: "Gira a la izquierda", emoji: "⬅️", caption: "Gira a la izquierda: turn left" },
          { at: "shape of an L", emoji: "🤚", caption: "Your left hand makes an L" },
          { at: "una cuadra", emoji: "🏘️📐", caption: "una cuadra: a block · la esquina: the corner" },
        ],
      },
      {
        show: [
          { emoji: "🚉", caption: "Start at la estación de tren" },
          { at: "Sigue todo recto dos cuadras", emoji: "⬆️⬆️", caption: "Straight ahead two blocks" },
          { at: "Luego gira a la izquierda", emoji: "⬅️", caption: "Then turn left" },
          { at: "al lado del banco", emoji: "🏛️🏦", caption: "The museum, next to the bank" },
          { at: "De nada", emoji: "🙏😊", caption: "¡Muchas gracias! · De nada" },
        ],
      },
    ],
  },

  "span-4.ser-estar": {
    hook: {
      show: [
        { emoji: "🧚🏜️📣", caption: "¡Soy Pip! ... ¡Soy Pip!" },
        { at: "¡Estoy cansado!", emoji: "😴📣", caption: "¡Estoy cansado!" },
        { at: "why does Spanish have two", big: "soy · estoy", caption: "Two ways to say I am" },
      ],
    },
    teach: [
      {
        show: [
          { big: "ser", caption: "Ser: what someone or something is like" },
          { at: "Soy (soy) means I am", big: "soy · eres · es", caption: "I am · you are · he, she or it is" },
          { at: "Soy alto", emoji: "🧍📏", caption: "Soy alto. I am tall." },
          { at: "Soy de Ohio", emoji: "🗺️", caption: "Soy de Ohio. I am from Ohio." },
          { at: "name card", emoji: "🪪", caption: "True all year? Use ser." },
        ],
      },
      {
        show: [
          { big: "estar", caption: "Estar: how someone feels right now" },
          { at: "Estoy (es-TOY) means I am", big: "estoy · estás · está", caption: "I am · you are · he, she or it is" },
          { at: "Estoy cansado", emoji: "😴", caption: "Estoy cansado. I am tired." },
          { at: "Mi hermana está triste", emoji: "😢", caption: "Mi hermana está triste." },
          { at: "¿Cómo estás?", big: "¿Cómo estás?", caption: "How are you? Estoy bien, gracias." },
        ],
      },
      {
        show: [
          { emoji: "📍", caption: "Estar also tells where something is" },
          { at: "El libro está en la mesa", emoji: "📖🪑", caption: "El libro está en la mesa." },
          { at: "how you feel and where you are", emoji: "🎵", caption: "How you feel and where you are: estar!" },
          { at: "Mi papá es alto", emoji: "🧍📏", caption: "Mi papá es alto. (what he's like)" },
          { at: "Mi papá está en la cocina", emoji: "🍳📍", caption: "Mi papá está en la cocina. (where he is)" },
        ],
      },
    ],
  },

  "span-4.andes": {
    hook: {
      show: [
        { emoji: "🧚🗺️🪨", caption: "An old map carved into the canyon wall" },
        { at: "Perú, Chile y Argentina", emoji: "🇵🇪🇨🇱🇦🇷", caption: "Perú, Chile y Argentina" },
        { at: "stone cities in the clouds", emoji: "🏯☁️🏜️🐎", caption: "Cities in the clouds, a dry desert, cowboys" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏔️🏔️🏔️", caption: "Los Andes: the longest mountain range on land" },
          { at: "about 4,300 miles", big: "4,300 miles", caption: "Down the west side of South America" },
          { at: "Aconcagua (ah-kohn-KAH-gwah)", big: "⛰️ 23,000 ft", caption: "Aconcagua, the highest in the Americas" },
          { at: "Llamas (YAH-mahs) and alpacas", emoji: "🦙🧶", caption: "Llamas and alpacas live high in the Andes" },
        ],
      },
      {
        show: [
          { emoji: "🏯⛰️", caption: "Machu Picchu, a stone city of the Inca" },
          { at: "without any mortar", emoji: "🧱🧩", caption: "Stones fit together without mortar" },
          { at: "terraces", emoji: "🪜🌱", caption: "Terraces: flat steps for farming" },
          { at: "Potatoes, las papas", emoji: "🥔🥔🥔", caption: "Potatoes were first grown in the Andes" },
          { at: "ceviche (seh-VEE-cheh)", emoji: "🐟🍋", caption: "Ceviche: fish soaked in lime juice" },
        ],
      },
      {
        show: [
          { emoji: "🇨🇱🎀", caption: "Chile: long and narrow" },
          { at: "Atacama (ah-tah-KAH-mah) Desert", emoji: "🏜️☀️", caption: "The Atacama: one of the driest places on Earth" },
          { at: "empanadas de pino", emoji: "🥟", caption: "Empanadas de pino" },
          { at: "las pampas (PAHM-pahs)", emoji: "🌾🐎🐄", caption: "Las pampas and the gauchos of Argentina" },
          { at: "asado (ah-SAH-doh)", emoji: "🍖🔥🍮", caption: "Asado and dulce de leche" },
        ],
      },
    ],
  },
};
