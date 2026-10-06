import type { CourseMedia } from "../types";

/** Slides for span-3, by lesson id. */
export const span3Media: CourseMedia = {
  "span-3.town": {
    hook: {
      show: [
        { emoji: "🏝️🎈🏘️", caption: "A little town on the Sky Islands" },
        { at: "¿Adónde vas?", big: "¿Adónde vas?", caption: "Where are you going?" },
        { at: "the island with the big library", emoji: "📚🏝️", caption: "Pip wants to go to the library island" },
        { at: "help Pip answer", emoji: "🧚🗣️", caption: "Let's help Pip answer in Spanish!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "el pueblo", caption: "El pueblo (PWEH-bloh) means the town" },
          { at: "La escuela (es-KWEH-lah)", emoji: "🏫", caption: "la escuela: school" },
          { at: "El parque (PAR-keh)", emoji: "🌳", caption: "el parque: park" },
          { at: "La biblioteca (bee-blee", emoji: "📚", caption: "la biblioteca: library" },
          { at: "El mercado (mer-KAH-doh)", emoji: "🍎🥕", caption: "el mercado: market" },
        ],
      },
      {
        show: [
          { emoji: "🏘️🛒", caption: "More places in town" },
          { at: "La tienda (tee-EN-dah)", emoji: "🛒", caption: "la tienda: store" },
          { at: "La panadería (pah", emoji: "🥖", caption: "la panadería: bakery" },
          { at: "El banco (BAHN-koh)", emoji: "🏦", caption: "el banco: bank" },
          { at: "the letter h is silent", big: "h 🤫", caption: "The h is silent: hospital sounds like ohs-pee-TAHL" },
        ],
      },
      {
        show: [
          { big: "¿Adónde vas?", caption: "¿Adónde vas? Where are you going?" },
          { at: "voy a (boy ah)", big: "Voy a...", caption: "Voy a means I am going to" },
          { at: "Voy a la escuela", emoji: "🏫", caption: "Voy a la escuela. I am going to school." },
          { at: "squeeze together into one word", big: "a + el = al", caption: "A and el squeeze together into al" },
          { at: "We say voy al parque", emoji: "🌳", caption: "Voy al parque. I am going to the park." },
        ],
      },
    ],
  },

  "span-3.sports": {
    hook: {
      show: [
        { emoji: "🏝️⚽", caption: "Kids play on a floating field" },
        { at: "Me gusta jugar al fútbol", big: "¡Me gusta jugar al fútbol!", caption: "I like to play soccer!" },
        { at: "what Pip likes to do", emoji: "🧚❓", caption: "What does Pip like to do?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "los deportes", caption: "Los deportes (deh-POR-tes) means sports" },
          { at: "Jugar al fútbol (FOOT-bohl)", emoji: "⚽", caption: "jugar al fútbol: to play soccer" },
          { at: "Jugar al béisbol", emoji: "⚾", caption: "jugar al béisbol: to play baseball" },
          { at: "Jugar al baloncesto", emoji: "🏀", caption: "jugar al baloncesto: to play basketball" },
          { at: "fútbol means soccer", emoji: "⚽🌎", caption: "Around the world, fútbol means soccer!" },
        ],
      },
      {
        show: [
          { emoji: "🏊🏃🚲", caption: "Action words for hobbies" },
          { at: "Nadar (nah-DAR)", emoji: "🏊", caption: "nadar: to swim" },
          { at: "Montar en bicicleta", emoji: "🚲", caption: "montar en bicicleta: to ride a bike" },
          { at: "Dibujar (dee-boo-HAR)", emoji: "🎨🎤💃", caption: "dibujar, cantar, bailar: draw, sing, dance" },
          { at: "end in ar, er or ir", big: "-ar -er -ir", caption: "Most action words end in ar, er or ir" },
        ],
      },
      {
        show: [
          { emoji: "🍕👍", caption: "Me gusta la pizza. You already know this!" },
          { at: "Me gusta nadar", emoji: "🏊👍", caption: "Me gusta nadar. I like to swim." },
          { at: "No me gusta correr", emoji: "🏃👎", caption: "No me gusta correr. I don't like to run." },
          { at: "¿Qué te gusta hacer?", big: "¿Qué te gusta hacer?", caption: "What do you like to do?" },
        ],
      },
    ],
  },

  "span-3.time": {
    hook: {
      show: [
        { emoji: "🕰️🏝️", caption: "The clock tower on Sky Island has stopped!" },
        { at: "don't know when to fly", emoji: "🎈❓", caption: "The balloons don't know when to fly" },
        { at: "¿Qué hora es?", big: "¿Qué hora es?", caption: "What time is it?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "¿Qué hora es?", caption: "¿Qué hora es? What time is it?" },
          { at: "El reloj (reh-LOH)", emoji: "⏰", caption: "el reloj: the clock" },
          { at: "es la una (es lah", big: "1:00", caption: "Es la una. It is one o'clock." },
          { at: "Son las dos is two", big: "2:00", caption: "Son las dos. It is two o'clock." },
          { at: "Una is just one hour", emoji: "☝️✌️", caption: "One hour gets es. Two and up get son." },
        ],
      },
      {
        show: [
          { big: "60", caption: "An hour has sesenta minutes" },
          { at: "Half of sesenta is treinta", big: "½ = 30", caption: "Half of 60 is 30: y media" },
          { at: "Son las cuatro y media", big: "4:30", caption: "Son las cuatro y media" },
          { at: "Son las dos y cuarto", big: "2:15", caption: "Son las dos y cuarto" },
          { at: "add en punto", big: "8:00", caption: "Son las ocho en punto. Eight o'clock sharp!" },
        ],
      },
      {
        show: [
          { big: "¿A qué hora?", caption: "¿A qué hora? At what time?" },
          { at: "A las doce", big: "12:00", caption: "El almuerzo es a las doce. 🥪" },
          { at: "De la mañana (mah", emoji: "🌅", caption: "de la mañana: in the morning" },
          { at: "De la tarde (TAR-deh)", emoji: "☀️", caption: "de la tarde: in the afternoon" },
          { at: "De la noche (NOH-cheh)", emoji: "🌙", caption: "de la noche: at night" },
        ],
      },
    ],
  },

  "span-3.describe": {
    hook: {
      show: [
        { emoji: "🎈👋", caption: "A new friend is coming to Sky Island" },
        { at: "¿Cómo es?", big: "¿Cómo es?", caption: "What is your friend like?" },
        { at: "Es alta y simpática", emoji: "🧍😊", caption: "Es alta y simpática. What does it mean?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "¿Cómo es?", caption: "¿Cómo es? What is it like?" },
          { at: "Alto (AHL-toh) means tall", emoji: "🦒", caption: "alto: tall. bajo: short." },
          { at: "Grande (GRAHN-deh) means big", emoji: "🐘🐭", caption: "grande: big. pequeño: small." },
          { at: "Rápido (RAH-pee-doh)", emoji: "🐆🐢", caption: "rápido: fast. lento: slow." },
          { at: "el elefante es grande", big: "es grande", caption: "El elefante es grande. The elephant is big." },
        ],
      },
      {
        show: [
          { emoji: "🔄", caption: "Describing words change their ending to match" },
          { at: "ending in o", big: "el ... o", caption: "El words take the o ending" },
          { at: "ending in a", big: "la ... a", caption: "La words take the a ending" },
          { at: "El perro es pequeño", emoji: "🐶", caption: "El perro es pequeño." },
          { at: "La casa es pequeña", emoji: "🏠", caption: "La casa es pequeña." },
        ],
      },
      {
        show: [
          { big: "-e", caption: "Words ending in e stay the same" },
          { at: "La casa es grande", emoji: "🐘🏠", caption: "El elefante es grande. La casa es grande." },
          { at: "El oso (OH-soh) es fuerte", emoji: "🐻🐜", caption: "El oso es fuerte. La hormiga es fuerte." },
          { at: "Remember colors?", emoji: "🎨", caption: "Remember colors? Same spot!" },
          { at: "un perro grande", emoji: "🐶", caption: "un perro grande: thing first, then the describing word" },
        ],
      },
    ],
  },

  "span-3.school": {
    hook: {
      show: [
        { emoji: "🏫🎈", caption: "The Sky Island school has floating classrooms" },
        { at: "Marisol shows Pip her schedule", emoji: "📋", caption: "Marisol's schedule is in Spanish" },
        { at: "help Pip read it", emoji: "🧚📖", caption: "Let's help Pip read it!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "las materias", caption: "Las materias (mah-TEH-ree-ahs) are school subjects" },
          { at: "at your kitchen table", emoji: "🏠📚", caption: "At school or at home, you have subjects!" },
          { at: "Las matemáticas (mah", emoji: "➕🔬", caption: "las matemáticas: math. las ciencias: science." },
          { at: "La historia (ees", emoji: "🏛️📖", caption: "la historia: history. la lectura: reading." },
          { at: "La educación física", emoji: "🤸🛝", caption: "la educación física: P.E. el recreo: recess." },
        ],
      },
      {
        show: [
          { big: "Tengo", caption: "Tengo (TEN-goh) means I have" },
          { at: "Tengo matemáticas a las nueve", big: "9:00", caption: "Tengo matemáticas a las nueve." },
          { at: "Tengo ciencias a las diez y media", big: "10:30", caption: "Tengo ciencias a las diez y media." },
          { at: "El lunes tengo arte", emoji: "📅🎨", caption: "El lunes tengo arte. On Monday I have art." },
        ],
      },
      {
        show: [
          { emoji: "⭐📚", caption: "Mi clase favorita es... My favorite class is..." },
          { at: "porque (POR-keh)", big: "porque", caption: "Porque means because" },
          { at: "el uniforme", emoji: "👕🎒", caption: "Many students wear el uniforme" },
          { at: "starts in March", big: "marzo", caption: "In Argentina and Chile, school starts in March" },
          { at: "the seasons are flipped", emoji: "🌎🔄", caption: "South of the equator, the seasons are flipped" },
        ],
      },
    ],
  },

  "span-3.americas": {
    hook: {
      show: [
        { emoji: "🎈💨", caption: "Pip's balloon catches a warm wind" },
        { at: "over mountains and a giant", emoji: "⛰️🌳", caption: "Over mountains and a giant green forest" },
        { at: "¿Dónde estoy?", big: "¿Dónde estoy?", caption: "Where am I?" },
        { at: "explore Central and South America", emoji: "🌎", caption: "Let's explore Central and South America!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Centroamérica", caption: "Centroamérica is Central America" },
          { at: "like a bridge", emoji: "🌉", caption: "A land bridge between Mexico and South America" },
          { at: "through the Panama Canal", emoji: "🚢🌊", caption: "Ships cross through the Panama Canal" },
          { at: "Sudamérica (sood", big: "Sudamérica", caption: "Sudamérica is South America, a continent" },
          { at: "people speak Portuguese", emoji: "🇧🇷", caption: "In Brazil, people speak Portuguese" },
        ],
      },
      {
        show: [
          { big: "los Andes", caption: "Los Andes: the Andes Mountains" },
          { at: "about 4,300 miles", big: "4,300 miles", caption: "The longest mountain range on land" },
          { at: "Llamas and alpacas", emoji: "🦙", caption: "Llamas and alpacas live high in the Andes" },
          { at: "first to grow potatoes", emoji: "🥔", caption: "The first potatoes were grown here" },
          { at: "Machu Picchu", photo: "Machu Picchu", caption: "Machu Picchu, built by the Inca in Peru" },
        ],
      },
      {
        show: [
          { big: "la selva", caption: "La selva means rainforest" },
          { at: "largest rainforest in the world", emoji: "🌳🌳🌳", caption: "The Amazon: the largest rainforest in the world" },
          { at: "El río (REE-oh)", emoji: "🏞️", caption: "El río: the river with the most water on Earth" },
          { at: "El perezoso (peh", emoji: "🦥", caption: "el perezoso: sloth" },
          { at: "El mono (MOH-noh)", emoji: "🐒", caption: "el mono: monkey" },
        ],
      },
      {
        show: [
          { emoji: "🫓🥟", caption: "Food and fun!" },
          { at: "Empanadas (em-pah", emoji: "🥟", caption: "Empanadas: little filled pies" },
          { at: "Pupusas (poo-POO-sahs)", emoji: "🧀", caption: "Pupusas from El Salvador" },
          { at: "Inti Raymi (IN-tee", emoji: "☀️", caption: "Inti Raymi: the Festival of the Sun in Peru" },
          { at: "Feria de las Flores", emoji: "💐", caption: "The Feria de las Flores in Medellín, Colombia" },
        ],
      },
    ],
  },
};
