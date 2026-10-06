import type { CourseMedia } from "../types";

/** Slides for span-5, by lesson id. */
export const span5Media: CourseMedia = {
  "span-5.weekend": {
    hook: {
      show: [
        { emoji: "✨📬", caption: "Pip brings a letter from a pen pal in México" },
        { at: "El sábado fui a la montaña", emoji: "⛰️", caption: "El sábado fui a la montaña." },
        { at: "¿Qué hiciste tú?", big: "¿Qué hiciste tú?", caption: "What did you do?" },
        { at: "talk about the past", emoji: "🕰️⏪", caption: "Let's learn to talk about the past!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🕰️⏪", caption: "Telling what you already did" },
          { at: "For I, add -é", big: "hablé", caption: "hablé (ah-BLEH): I talked" },
          { at: "For he or she, add -ó", big: "habló", caption: "habló (ah-BLOH): he or she talked" },
          { at: "Nadar (nah-DAR) becomes nadé", emoji: "🚶🏊🏠", caption: "caminé, nadé, visité" },
          { at: "Watch the accent mark", big: "hablo ≠ habló", caption: "One little mark changes the time!" },
        ],
      },
      {
        show: [
          { emoji: "🎉", caption: "-er and -ir verbs share the same endings" },
          { at: "For I, add -í", big: "-í", caption: "For I, add -í" },
          { at: "Comer (koh-MER), to eat", emoji: "🍕", caption: "comí: I ate. comió: he or she ate." },
          { at: "Correr becomes corrí", emoji: "🏃✍️", caption: "corrí, viví, escribí" },
          { at: "remember two pairs", big: "-é -ó | -í -ió", caption: "-ar: -é and -ó. -er and -ir: -í and -ió." },
        ],
      },
      {
        show: [
          { big: "ir", caption: "Ir, to go, is a special verb" },
          { at: "I went is fui", big: "fui", caption: "fui (FWEE): I went" },
          { at: "Fui a la playa", emoji: "🏖️", caption: "Fui a la playa. I went to the beach." },
          { at: "¿Qué hiciste el fin de semana?", big: "¿Qué hiciste?", caption: "What did you do on the weekend?" },
          { at: "Comí palomitas", emoji: "🎬🍿", caption: "El sábado fui al cine. Comí palomitas." },
        ],
      },
    ],
  },

  "span-5.plans": {
    hook: {
      show: [
        { emoji: "✨🏰", caption: "Pip has big news from Starpeak Fort" },
        { at: "having a fiesta next Saturday", emoji: "🎉", caption: "A fiesta next Saturday!" },
        { at: "games, food and music", emoji: "🎲🍽️🎵⭐", caption: "Games, food and music under the stars" },
        { at: "haven't happened yet", emoji: "⏩", caption: "How do we talk about plans?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "voy a ...", caption: "Voy a (VOY ah) means I am going to" },
          { at: "Keep the verb whole", emoji: "📖", caption: "Keep the second verb whole: the infinitive" },
          { at: "Voy a nadar", emoji: "🏊", caption: "Voy a nadar. I am going to swim." },
          { at: "Voy a leer", emoji: "📖", caption: "Voy a leer (leh-ER). I am going to read." },
          { at: "Voy a nado is wrong", big: "✗ nado ✓ nadar", caption: "Voy a nadar is right!" },
        ],
      },
      {
        show: [
          { big: "voy · vas · va", caption: "Ir changes with the person" },
          { at: "Nosotros vamos", big: "vamos · van", caption: "vamos: we go. van: they go." },
          { at: "Mi hermana va a bailar", emoji: "💃", caption: "Mi hermana va a bailar." },
          { at: "Nosotros vamos a cocinar", emoji: "🍳", caption: "Nosotros vamos a cocinar." },
          { at: "¿Qué vas a hacer?", big: "¿Qué vas a hacer?", caption: "What are you going to do?" },
        ],
      },
      {
        show: [
          { emoji: "🪧", caption: "Time words help your listener" },
          { at: "mañana (mah-NYAH-nah)", big: "mañana", caption: "mañana: tomorrow" },
          { at: "esta noche", emoji: "🌙", caption: "esta noche: tonight" },
          { at: "Ayer fui al parque", emoji: "⏪🌳", caption: "Ayer fui al parque. Yesterday I went." },
          { at: "Mañana voy a ir al museo", emoji: "⏩🏛️", caption: "Mañana voy a ir al museo. Tomorrow I'm going." },
          { at: "Esta noche voy a estudiar", emoji: "📚🌙", caption: "Good planners say when!" },
        ],
      },
    ],
  },

  "span-5.travel": {
    hook: {
      show: [
        { emoji: "🗺️✨", caption: "Pip found an old map" },
        { at: "from the mountains all the way to the sea", emoji: "🏔️➡️🌊", caption: "From the mountains to the sea" },
        { at: "By train, by boat or on foot", emoji: "🚆🚢🚶", caption: "By train, by boat or on foot?" },
        { at: "what will you pack", emoji: "🧳", caption: "And what will you pack?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "viajar", caption: "Viajar (vee-ah-HAR) means to travel" },
          { at: "En avión", emoji: "✈️", caption: "en avión: by plane" },
          { at: "En tren (TREN)", emoji: "🚆", caption: "en tren: by train" },
          { at: "En barco", emoji: "🚢🚌🚗", caption: "en barco, en autobús, en coche" },
          { at: "On foot is a pie", emoji: "🚶", caption: "a pie: on foot. Not en pie!" },
        ],
      },
      {
        show: [
          { emoji: "🛫", caption: "el aeropuerto: the airport" },
          { at: "la estación de tren", emoji: "🚉", caption: "la estación de tren: the train station" },
          { at: "el boleto", emoji: "🎟️", caption: "el boleto: the ticket" },
          { at: "el pasaporte", emoji: "🛂", caption: "el pasaporte: the passport" },
          { at: "¿A qué hora sale el tren?", big: "¿A qué hora sale?", caption: "What time does the train leave?" },
          { at: "called the AVE", emoji: "🚄💨", caption: "Spain's AVE trains go more than 180 miles an hour" },
        ],
      },
      {
        show: [
          { emoji: "🧳", caption: "la maleta: the suitcase" },
          { at: "To pack is hacer la maleta", big: "hacer la maleta", caption: "to pack the suitcase" },
          { at: "voy a llevar", big: "voy a llevar", caption: "I am going to take" },
          { at: "Going to the beach", emoji: "🏖️🩱😎", caption: "Beach: el traje de baño, las gafas de sol" },
          { at: "Going to a snowy mountain", emoji: "🏔️🧤🧣", caption: "Snow: la chaqueta, los guantes, la bufanda" },
        ],
      },
    ],
  },

  "span-5.health": {
    hook: {
      show: [
        { emoji: "🏔️🔭", caption: "The snowy trail to the Starpeak Observatory" },
        { at: "now something hurts", emoji: "🤕", caption: "Ouch! Something hurts." },
        { at: "only speaks Spanish", emoji: "🩺", caption: "The fort doctor only speaks Spanish" },
        { at: "tell her what hurts", big: "¿Qué te duele?", caption: "How can you tell her what hurts?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Me duele", caption: "Me duele (meh DWEH-leh): it hurts me" },
          { at: "Me duele la cabeza", emoji: "🤕", caption: "Me duele la cabeza. My head hurts." },
          { at: "Me duele el estómago", emoji: "🤢", caption: "Me duele el estómago. My stomach hurts." },
          { at: "Me duele la garganta", emoji: "😷", caption: "Me duele la garganta. My throat hurts." },
          { at: "you say the head, not my head", big: "la cabeza", caption: "Say the head, not my head!" },
        ],
      },
      {
        show: [
          { big: "+ n", caption: "Two things hurt? Add an n!" },
          { at: "Me duelen los pies", emoji: "🦶🦶", caption: "Me duelen los pies. My feet hurt." },
          { at: "Me duelen los ojos", emoji: "👀", caption: "Me duelen los ojos. My eyes hurt." },
          { at: "Me gustan los perros", emoji: "🐕🐕", caption: "Same trick: me gusta, me gustan" },
          { at: "¿Qué te duele?", big: "¿Qué te duele?", caption: "What hurts?" },
        ],
      },
      {
        show: [
          { emoji: "🩺", caption: "el médico, la médica: the doctor" },
          { at: "¿Qué te pasa?", big: "¿Qué te pasa?", caption: "What's wrong?" },
          { at: "Tengo fiebre", emoji: "🤒", caption: "Tengo fiebre. I have a fever." },
          { at: "Bebe mucha agua", emoji: "💧🛏️💊", caption: "Bebe mucha agua. Descansa. Toma la medicina." },
          { at: "¡Que te mejores!", emoji: "💐", caption: "¡Que te mejores! Get well soon!" },
        ],
      },
    ],
  },

  "span-5.nature": {
    hook: {
      show: [
        { emoji: "🏔️✨", caption: "Pip on top of Starpeak" },
        { at: "mountains, rivers, forests and the sea", emoji: "⛰️🏞️🌲🌊", caption: "Mountains, rivers, forests and the sea" },
        { at: "meet the animals", emoji: "🦙🐆🦥", caption: "Let's meet the animals!" },
        { at: "explore la naturaleza", big: "la naturaleza", caption: "Let's explore nature!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "la naturaleza", caption: "La naturaleza (nah-too-rah-LEH-sah): nature" },
          { at: "La montaña", emoji: "⛰️🌋", caption: "la montaña, el volcán" },
          { at: "El bosque", emoji: "🌲🌴🏜️🏝️", caption: "el bosque, la selva, el desierto, la isla" },
          { at: "Now the water", emoji: "🏞️🌊💦", caption: "el río, el lago, el mar, la cascada" },
          { at: "En México hay volcanes", big: "hay", caption: "Hay (EYE): there is, there are" },
        ],
      },
      {
        show: [
          { emoji: "🌎", caption: "World-famous places" },
          { at: "Los Andes (AHN-des)", emoji: "🏔️", caption: "Los Andes: the longest mountain range on land" },
          { at: "El río Amazonas", emoji: "🏞️", caption: "El Amazonas carries the most water of any river" },
          { at: "El desierto de Atacama", emoji: "🏜️☀️", caption: "Atacama: one of the driest places in the world" },
          { at: "El Salto Ángel", emoji: "💦", caption: "El Salto Ángel: the tallest waterfall in the world" },
        ],
      },
      {
        show: [
          { emoji: "🐾", caption: "Let's meet the animals!" },
          { at: "El cóndor (KOHN-dor)", emoji: "🦅", caption: "el cóndor: a giant bird of the Andes" },
          { at: "La llama (YAH-mah)", emoji: "🦙", caption: "la llama and la alpaca: soft wool" },
          { at: "El jaguar (hah-GWAR)", emoji: "🐆", caption: "el jaguar: the biggest cat in the Americas" },
          { at: "el perezoso", emoji: "🦥", caption: "el perezoso: the slow sloth" },
          { at: "La tortuga gigante", emoji: "🐢", caption: "la tortuga gigante of the Galápagos Islands" },
        ],
      },
      {
        show: [
          { big: "al aire libre", caption: "Al aire libre: outdoors" },
          { at: "Acampar (ah-kahm-PAR)", emoji: "🏕️🎣", caption: "acampar: to camp. pescar: to fish." },
          { at: "Mirar las estrellas", emoji: "✨🔭", caption: "mirar las estrellas: look at the stars" },
          { at: "El verano pasado acampé", emoji: "⏪🏕️", caption: "El verano pasado acampé en las montañas." },
          { at: "Leave every place cleaner", emoji: "🌱🗑️", caption: "Leave every place cleaner than you found it" },
        ],
      },
    ],
  },

  "span-5.spain": {
    hook: {
      show: [
        { emoji: "✨📦", caption: "Pip found a treasure chest" },
        { at: "four old postcards from España", emoji: "🇪🇸✉️", caption: "Four old postcards from España" },
        { at: "a red palace", emoji: "🏰🐴⛪🐚", caption: "A palace, a knight, a church and a shell" },
        { at: "the story behind each one", big: "?", caption: "What is the story behind each one?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🇪🇸", caption: "Granada, in the south of Spain" },
          { at: "In 711", big: "711", caption: "711: Muslim rulers cross into Spain" },
          { at: "In 1238", big: "1238", caption: "1238: the Nasrid kings begin the Alhambra" },
          { at: "the red one in Arabic", emoji: "🏰🟥", caption: "Alhambra means the red one" },
          { at: "twelve stone lions", emoji: "🦁⛲", caption: "The Patio de los Leones" },
          { at: "In 1492", big: "1492", caption: "1492: Ferdinand and Isabella take Granada" },
        ],
      },
      {
        show: [
          { emoji: "📖", caption: "Spain's most famous book: Don Quijote" },
          { at: "The first part came out in 1605", big: "1605", caption: "Miguel de Cervantes wrote it" },
          { at: "decides to become one", emoji: "🛡️⚔️", caption: "He decides to become a knight!" },
          { at: "his skinny horse Rocinante", emoji: "🐴🫏", caption: "Rocinante and Sancho Panza" },
          { at: "thinks they are giants", emoji: "🌬️🏰", caption: "Windmills or giants?" },
          { at: "Cervantes escribió", big: "escribió", caption: "Cervantes escribió. Cervantes wrote." },
        ],
      },
      {
        show: [
          { emoji: "⛪", caption: "La Sagrada Familia in Barcelona" },
          { at: "Work began in 1882", big: "1882", caption: "Work began in 1882" },
          { at: "Antoni Gaudí", emoji: "📐", caption: "The architect Antoni Gaudí" },
          { at: "like trees in a forest", emoji: "🌳🌳🌳", caption: "Columns that branch like trees" },
          { at: "That is patience", emoji: "🧱⏳", caption: "Still being finished today!" },
          { at: "Gaudí diseñó la iglesia", big: "diseñó", caption: "Gaudí diseñó. Gaudí designed." },
        ],
      },
      {
        show: [
          { emoji: "🛤️", caption: "El Camino de Santiago" },
          { at: "more than 1,000 years", big: "1,000+", caption: "Walked for more than 1,000 years" },
          { at: "peregrinos", emoji: "🚶🚶", caption: "los peregrinos: the pilgrims" },
          { at: "about 500 miles", big: "500 miles", caption: "About 500 miles, about a month" },
          { at: "Yellow arrows", emoji: "➡️🐚", caption: "Yellow arrows and the scallop shell" },
          { at: "¡Buen Camino!", big: "¡Buen Camino!", caption: "Have a good walk!" },
        ],
      },
    ],
  },
};
