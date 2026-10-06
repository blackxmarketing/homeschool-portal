import type { CourseMedia } from "../types";

/** Slides for span-1, by lesson id. Emoji and big words only (no photos). */
export const span1Media: CourseMedia = {
  "span-1.numbers": {
    hook: {
      show: [
        { caption: "Hold up all your fingers!", emoji: "🖐️🖐️" },
        { at: "wiggle your toes", caption: "Wiggle your toes!", emoji: "🦶🦶" },
        { at: "count them in Spanish", caption: "Let's count in Spanish!", big: "11-20" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "diez is 10", big: "10" },
          { at: "once (OHN-seh) is 11", caption: "once (OHN-seh)", big: "11" },
          { at: "doce (DOH-seh) is 12", caption: "doce (DOH-seh)", big: "12" },
          { at: "catorce (kah-TOR-seh) is 14", caption: "trece is 13, catorce is 14", big: "13 · 14" },
          { at: "quince (KEEN-seh) is 15", caption: "quince (KEEN-seh)", big: "15" },
        ],
      },
      {
        show: [
          { caption: "A number pattern!", emoji: "🧩" },
          { at: "diez y seis", caption: "dieciséis: ten and six", big: "10 + 6 = 16" },
          { at: "is ten and seven", caption: "diecisiete: ten and seven", big: "17" },
          { at: "is ten and eight", caption: "dieciocho: ten and eight", big: "18" },
          { at: "is ten and nine", caption: "diecinueve: ten and nine", big: "19" },
        ],
      },
      {
        show: [
          { caption: "veinte (BAYN-teh) is 20", big: "20" },
          { at: "Count your fingers", caption: "10 fingers and 10 toes make veinte!", emoji: "🖐️🖐️🦶🦶" },
          { at: "¿Cuántos? (KWAN-tohs) means", caption: "¿Cuántos? means how many?", big: "¿Cuántos?" },
          { at: "upside-down mark", caption: "Spanish questions start with ¿", big: "¿ ?" },
        ],
      },
    ],
  },

  "span-1.body": {
    hook: {
      show: [
        { caption: "Touch your head!", emoji: "🙆" },
        { at: "touch your nose", caption: "Touch your nose!", emoji: "👃" },
        { at: "wiggle your feet", caption: "Wiggle your feet!", emoji: "🦶" },
        { at: "body words in Spanish", caption: "Mi cuerpo means my body", big: "Mi cuerpo" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "la cabeza: head", emoji: "🙆" },
          { at: "los ojos (OH-hohs)", caption: "los ojos: eyes", emoji: "👀" },
          { at: "la nariz (nah-REES)", caption: "la nariz: nose", emoji: "👃" },
          { at: "la boca (BOH-kah)", caption: "la boca: mouth", emoji: "👄" },
          { at: "las orejas (oh-REH-hahs)", caption: "las orejas: ears", emoji: "👂" },
        ],
      },
      {
        show: [
          { caption: "los brazos: arms", emoji: "💪" },
          { at: "las manos (MAH-nohs)", caption: "las manos: hands. los dedos: fingers", emoji: "✋" },
          { at: "las piernas (pee-EHR-nahs)", caption: "las piernas: legs", emoji: "🦵" },
          { at: "los pies (pee-EHS)", caption: "los pies: feet", emoji: "🦶" },
          { at: "Tengo dos manos", caption: "Tengo dos manos: I have two hands", emoji: "✋✋" },
        ],
      },
      {
        show: [
          { caption: "Señala means point to", emoji: "👉" },
          { at: "Señala la boca", caption: "Señala la boca!", emoji: "👉👄" },
          { at: "We see with", caption: "We see with los ojos", emoji: "👀" },
          { at: "We hear with", caption: "We hear with las orejas", emoji: "👂" },
          { at: "We smell with", caption: "Smell with la nariz, taste with la boca", emoji: "👃👅" },
        ],
      },
    ],
  },

  "span-1.food": {
    hook: {
      show: [
        { caption: "What is your favorite snack?", emoji: "🍎🧀🍌" },
        { at: "say what you like", caption: "Say what you like in Spanish", emoji: "😋" },
        { at: "¡Vamos a comer!", caption: "¡Vamos a comer! Let's eat!", emoji: "🍽️" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "la comida means food", emoji: "🍽️" },
          { at: "la manzana (mahn-SAH-nah)", caption: "la manzana: apple", emoji: "🍎" },
          { at: "el plátano (PLAH-tah-noh)", caption: "el plátano: banana", emoji: "🍌" },
          { at: "el pan (pahn)", caption: "el pan: bread. el queso: cheese", emoji: "🍞🧀" },
          { at: "la leche (LEH-cheh)", caption: "la leche: milk. el arroz: rice", emoji: "🥛🍚" },
        ],
      },
      {
        show: [
          { caption: "me gusta: I like it", emoji: "😋" },
          { at: "Me gusta el pan", caption: "Me gusta el pan. I like bread.", emoji: "😋🍞" },
          { at: "put no in front", caption: "no me gusta: I don't like it", emoji: "😝" },
          { at: "No me gusta el queso", caption: "No me gusta el queso.", emoji: "😝🧀" },
          { at: "Everyone likes different foods", caption: "Everyone likes different foods!", emoji: "🙂" },
        ],
      },
      {
        show: [
          { caption: "¿Te gusta? Do you like it?", big: "¿Te gusta?" },
          { at: "Sí, me gusta", caption: "Sí, me gusta! Yes, I like it!", emoji: "👍😋" },
          { at: "In Mexico", caption: "Mexico: tortillas made from corn", emoji: "🌽🌮" },
          { at: "In Spain", caption: "Spain: paella, a rice dish", emoji: "🥘" },
          { at: "In Colombia and Venezuela", caption: "Colombia and Venezuela: arepas, round corn cakes", emoji: "🫓" },
        ],
      },
    ],
  },

  "span-1.school": {
    hook: {
      show: [
        { caption: "Pencils, books and backpacks!", emoji: "✏️📖🎒" },
        { at: "have Spanish names too", caption: "They have Spanish names too!", emoji: "🏫" },
        { at: "Let's find out", caption: "Let's find out!", emoji: "🔍" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "la escuela means school", emoji: "🏫" },
          { at: "el lápiz (LAH-pees)", caption: "el lápiz: pencil", emoji: "✏️" },
          { at: "el crayón (krah-YOHN)", caption: "el crayón: crayon", emoji: "🖍️" },
          { at: "el libro (LEE-broh)", caption: "el libro: book", emoji: "📖" },
          { at: "el papel (pah-PEHL)", caption: "el papel: paper", emoji: "📄" },
        ],
      },
      {
        show: [
          { caption: "la regla: ruler", emoji: "📏" },
          { at: "la silla (SEE-yah)", caption: "la silla: chair", emoji: "🪑" },
          { at: "la mochila (moh-CHEE-lah)", caption: "la mochila: backpack", emoji: "🎒" },
          { at: "Did you hear el and la", caption: "el and la both mean the", big: "el · la" },
          { at: "many words that end in a", caption: "Ends in a? Often la: la silla, la mesa", big: "-a → la" },
        ],
      },
      {
        show: [
          { caption: "A guessing game!", emoji: "🎁" },
          { at: "means what is it", caption: "¿Qué es? What is it?", big: "¿Qué es?" },
          { at: "Use un for el words", caption: "un for el words, una for la words", big: "un · una" },
          { at: "Es un libro", caption: "Es un libro. It's a book.", emoji: "📖" },
          { at: "Es una silla", caption: "Es una silla. It's a chair.", emoji: "🪑" },
        ],
      },
    ],
  },

  "span-1.days": {
    hook: {
      show: [
        { caption: "What day is it today?", emoji: "📅" },
        { at: "Every day has a Spanish name", caption: "Every day has a Spanish name", big: "lunes" },
        { at: "learn all seven", caption: "Seven days in a week", big: "7" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "la semana: the week", big: "7 días" },
          { at: "lunes (LOO-nehs) is Monday", caption: "lunes: Monday", big: "lunes" },
          { at: "from luna, the moon", caption: "luna means moon", emoji: "🌙" },
          { at: "martes (MAR-tehs)", caption: "martes: Tuesday", big: "martes" },
          { at: "jueves (HWEH-behs)", caption: "miércoles: Wednesday. jueves: Thursday", big: "miércoles · jueves" },
        ],
      },
      {
        show: [
          { caption: "viernes: Friday", big: "viernes" },
          { at: "sábado (SAH-bah-doh)", caption: "sábado: Saturday", big: "sábado" },
          { at: "domingo (doh-MEEN-goh)", caption: "domingo: Sunday", big: "domingo" },
          { at: "start with a small letter", caption: "Spanish days use small letters", big: "lunes, not Lunes" },
          { at: "in Spain, calendars", caption: "In Spain, the week starts on lunes", emoji: "📅" },
        ],
      },
      {
        show: [
          { caption: "What day is today?", big: "¿Qué día es hoy?" },
          { at: "hoy means today", caption: "hoy means today", big: "hoy" },
          { at: "Hoy es lunes. Today", caption: "Hoy es lunes. Today is Monday.", emoji: "📅" },
          { at: "mañana (mah-NYAH-nah) means tomorrow", caption: "mañana means tomorrow", big: "mañana" },
          { at: "mañana es martes", caption: "Mañana es martes. Tomorrow is Tuesday.", emoji: "➡️📅" },
        ],
      },
    ],
  },

  "span-1.weather": {
    hook: {
      show: [
        { caption: "Is it sunny?", emoji: "☀️" },
        { at: "Is it rainy", caption: "Is it rainy?", emoji: "🌧️" },
        { at: "look outside", caption: "Let's look outside!", emoji: "🪟👀" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "¿Qué tiempo hace? What is the weather like?", big: "¿Qué tiempo hace?" },
          { at: "Hace sol (sohl)", caption: "Hace sol: it's sunny", emoji: "☀️" },
          { at: "Hace calor (kah-LOR)", caption: "Hace calor: it's hot", emoji: "🥵" },
          { at: "Hace frío (FREE-oh)", caption: "Hace frío: it's cold", emoji: "🥶" },
          { at: "Hace viento (bee-EHN-toh)", caption: "Hace viento: it's windy", emoji: "🌬️" },
        ],
      },
      {
        show: [
          { caption: "Llueve: it's raining", emoji: "🌧️" },
          { at: "Nieva (nee-EH-bah)", caption: "Nieva: it's snowing", emoji: "❄️" },
          { at: "Está nublado", caption: "Está nublado: it's cloudy", emoji: "☁️" },
          { at: "Scientists who study weather", caption: "Weather scientists watch the sky", emoji: "👀☁️📝" },
          { at: "weather watcher too", caption: "Be a weather watcher!", emoji: "📋☀️" },
        ],
      },
      {
        show: [
          { caption: "A fun fact!", emoji: "🌎" },
          { at: "imaginary line around the middle", caption: "The equator: a pretend line around the middle of Earth", emoji: "🌍" },
          { at: "the seasons are flipped", caption: "South of the equator, the seasons are flipped", emoji: "🔄" },
          { at: "December is summer", caption: "Argentina in December: summer!", emoji: "🏖️☀️" },
          { at: "winter in the United States", caption: "United States in December: winter", emoji: "⛄❄️" },
        ],
      },
    ],
  },
};
