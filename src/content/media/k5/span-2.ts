import type { CourseMedia } from "../types";

/** Slides for span-2, by lesson id. */
export const span2Media: CourseMedia = {
  "span-2.me": {
    hook: {
      show: [
        { emoji: "🧚🏞️🛒", caption: "Pip is at the river market" },
        { at: "Me llamo Sofía", emoji: "👋😊", caption: "¡Hola! Me llamo Sofía." },
        { at: "answer her in Spanish", big: "?", caption: "How can you answer in Spanish?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Me llamo", caption: "Me llamo (meh YAH-moh) means my name is" },
          { at: "Me llamo Sam", emoji: "😊🏷️", caption: "Me llamo Sam. Me llamo Rosa." },
          { at: "¿Cómo te llamas?", big: "¿Cómo te llamas?", caption: "What is your name?" },
          { at: "¡Mucho gusto!", emoji: "🤝", caption: "¡Mucho gusto! Nice to meet you!" },
        ],
      },
      {
        show: [
          { big: "Tengo", caption: "Tengo (TEN-goh) means I have" },
          { at: "Años (AH-nyohs) means years", emoji: "🎂", caption: "Años (AH-nyohs) means years" },
          { at: "Tengo siete años", big: "7", caption: "Tengo siete años. I am seven." },
          { at: "¿Cuántos años tienes?", big: "¿Cuántos años tienes?", caption: "How old are you?" },
          { at: "Hold up your fingers", emoji: "✋", caption: "Hold up your fingers and say your age!" },
        ],
      },
      {
        show: [
          { big: "Vivo en", caption: "Vivo en (VEE-voh en) means I live in" },
          { at: "Vivo en una casa", emoji: "🏠", caption: "Vivo en una casa. I live in a house." },
          { at: "Vivo en un apartamento", emoji: "🏢", caption: "Vivo en un apartamento. I live in an apartment." },
          { at: "put it all together", emoji: "😊🎂🏠", caption: "Name, age and where you live!" },
          { at: "three things about you", emoji: "🌟", caption: "You said three things about you!" },
        ],
      },
    ],
  },

  "span-2.clothes": {
    hook: {
      show: [
        { emoji: "🧚🎉", caption: "Pip is getting ready for the river fiesta" },
        { at: "only knows the clothes in English", emoji: "👕❓", caption: "Pip only knows the clothes in English" },
        { at: "pick clothes in Spanish", emoji: "👗👖👟", caption: "Let's pick clothes in Spanish!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "la ropa", caption: "La ropa (lah ROH-pah) means clothes" },
          { at: "La camisa (kah-MEE-sah)", emoji: "👕", caption: "la camisa: shirt" },
          { at: "Los pantalones", emoji: "👖", caption: "los pantalones: pants" },
          { at: "El vestido", emoji: "👗", caption: "el vestido: dress" },
          { at: "La chaqueta", emoji: "🧥", caption: "la chaqueta: jacket" },
        ],
      },
      {
        show: [
          { emoji: "👒⬇️👟", caption: "From your head to your toes" },
          { at: "El sombrero", emoji: "👒", caption: "el sombrero: hat" },
          { at: "Los calcetines", emoji: "🧦", caption: "los calcetines: socks" },
          { at: "Los zapatos", emoji: "👟", caption: "los zapatos: shoes" },
          { at: "Llevo (YEH-voh)", big: "Llevo", caption: "Llevo means I am wearing" },
        ],
      },
      {
        show: [
          { emoji: "🎨", caption: "You already know your colors" },
          { at: "A blue shirt", emoji: "🔵👕", caption: "English: a blue shirt. Color first." },
          { at: "Una camisa azul", big: "camisa azul", caption: "Spanish: una camisa azul. Color after!" },
          { at: "un sombrero verde", emoji: "👒🟢", caption: "un sombrero verde: a green hat" },
          { at: "Thing first, then the color", big: "👕 + 🔵", caption: "Thing first, then the color" },
        ],
      },
    ],
  },

  "span-2.house": {
    hook: {
      show: [
        { emoji: "🧚🏠", caption: "Pip's little cousin is hiding in the mill house" },
        { at: "look in every room", emoji: "🔎🚪", caption: "Pip will look in every room" },
        { at: "Let's learn them", emoji: "🍳🛏️🛁", caption: "Let's learn the rooms in Spanish!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "mi casa", caption: "Mi casa (mee KAH-sah) means my house" },
          { at: "La cocina", emoji: "🍳", caption: "la cocina: the kitchen" },
          { at: "El comedor", emoji: "🍽️", caption: "el comedor: the dining room" },
          { at: "La sala", emoji: "🛋️", caption: "la sala: the living room" },
          { at: "Say them with me", emoji: "🗣️", caption: "La cocina. El comedor. La sala." },
        ],
      },
      {
        show: [
          { emoji: "🏠➕", caption: "Three more places in the house" },
          { at: "El dormitorio", emoji: "🛏️", caption: "el dormitorio: the bedroom" },
          { at: "El baño", emoji: "🛁", caption: "el baño: the bathroom" },
          { at: "El jardín", emoji: "🌳", caption: "el jardín: the yard or garden" },
          { at: "your favorite", big: "?", caption: "Which room is your favorite?" },
        ],
      },
      {
        show: [
          { big: "¿Dónde está?", caption: "¿Dónde está? means where is?" },
          { at: "say está en", big: "está en", caption: "Está en means is in" },
          { at: "Mamá está en la cocina", emoji: "👩🍳", caption: "Mamá está en la cocina." },
          { at: "El perro está en el jardín", emoji: "🐶🌳", caption: "El perro está en el jardín." },
        ],
      },
    ],
  },

  "span-2.tens": {
    hook: {
      show: [
        { emoji: "🌾🏭", caption: "The miller has bags of flour" },
        { at: "piles of ten", big: "10", caption: "He stacks them in piles of ten" },
        { at: "Diez, veinte", big: "10, 20 ...", caption: "Diez, veinte... what comes next?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "diez = 10", caption: "Diez (dyes) is 10" },
          { at: "Veinte (VAIN-teh) is 20", big: "veinte = 20", caption: "Veinte (VAIN-teh) is 20" },
          { at: "Treinta (TRAIN-tah) is 30", big: "treinta = 30", caption: "Treinta (TRAIN-tah) is 30" },
          { at: "Cuarenta (kwah-REN-tah) is 40", big: "cuarenta = 40", caption: "Cuarenta (kwah-REN-tah) is 40" },
          { at: "Cincuenta (seen-KWEN-tah) is 50", big: "cincuenta = 50", caption: "Cincuenta (seen-KWEN-tah) is 50, half way to 100" },
        ],
      },
      {
        show: [
          { big: "sesenta = 60", caption: "Sesenta (seh-SEN-tah) is 60" },
          { at: "Setenta (seh-TEN-tah) is 70", big: "setenta = 70", caption: "Setenta (seh-TEN-tah) is 70" },
          { at: "Ochenta (oh-CHEN-tah) is 80", big: "ochenta = 80", caption: "Ochenta (oh-CHEN-tah) is 80" },
          { at: "Noventa (noh-VEN-tah) is 90", big: "noventa = 90", caption: "Noventa (noh-VEN-tah) is 90" },
          { at: "Cien (syen) is 100", big: "cien = 💯", caption: "Cien (syen) is 100!" },
        ],
      },
      {
        show: [
          { emoji: "🪙", caption: "One dime is 10 cents" },
          { at: "Diez, veinte, treinta", emoji: "🪙🪙🪙", caption: "Diez, veinte, treinta: 30 cents" },
          { at: "Five dimes make cincuenta", emoji: "🪙🪙🪙🪙🪙", caption: "Five dimes make cincuenta: 50 cents" },
          { at: "Ten dimes make cien", emoji: "💵", caption: "Ten dimes make cien: one whole dollar!" },
        ],
      },
    ],
  },

  "span-2.months": {
    hook: {
      show: [
        { emoji: "🧚🎂", caption: "Pip's birthday is coming soon!" },
        { at: "the names of the months", emoji: "📅", caption: "First we need the names of the months" },
        { at: "all twelve", big: "12", caption: "Twelve months in a year" },
      ],
    },
    teach: [
      {
        show: [
          { big: "los meses", caption: "Los meses (MEH-ses) means the months" },
          { at: "Enero (eh-NEH-roh) is January", emoji: "❄️", caption: "enero: January" },
          { at: "Abril (ah-BREEL) is April", emoji: "🌷", caption: "abril: April" },
          { at: "Junio (HOO-nyoh) is June", emoji: "☀️", caption: "junio: June" },
          { at: "start with a small letter", big: "enero", caption: "Spanish months start with a small letter" },
        ],
      },
      {
        show: [
          { emoji: "📅", caption: "The last six months of the year" },
          { at: "Julio (HOO-lyoh) is July", emoji: "🏖️", caption: "julio: July" },
          { at: "Septiembre (sep-TYEM-breh) is September", emoji: "🍎", caption: "septiembre: September" },
          { at: "Octubre (ok-TOO-breh) is October", emoji: "🍂", caption: "octubre: October" },
          { at: "Diciembre (dee-SYEM-breh) is December", emoji: "⛄", caption: "diciembre: December" },
        ],
      },
      {
        show: [
          { emoji: "🎂", caption: "Cumpleaños (koom-pleh-AH-nyohs) means birthday" },
          { at: "¿Cuándo es tu cumpleaños?", big: "¿Cuándo?", caption: "¿Cuándo es tu cumpleaños? When is your birthday?" },
          { at: "Mi cumpleaños es el diez de mayo", big: "10 de mayo", caption: "Mi cumpleaños es el diez de mayo." },
          { at: "Las Mañanitas", emoji: "🎶", caption: "In Mexico, families often sing Las Mañanitas" },
          { at: "break a piñata", emoji: "🪅", caption: "Many kids break a piñata. ¡Feliz cumpleaños!" },
        ],
      },
    ],
  },

  "span-2.culture": {
    hook: {
      show: [
        { emoji: "⛵🗺️", caption: "A boat brings a map to the market" },
        { at: "people speak Spanish", emoji: "🗣️🌎", caption: "Two countries where people speak Spanish" },
        { at: "One is México", emoji: "🇲🇽🇪🇸", caption: "México and España" },
        { at: "take a trip", emoji: "✈️", caption: "Let's take a trip!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🇲🇽", caption: "México (MEH-hee-koh) is Mexico" },
          { at: "just south of the United States", emoji: "🌎⬇️", caption: "In North America, just south of the United States" },
          { at: "España (es-PAH-nyah) is Spain", emoji: "🇪🇸", caption: "España (es-PAH-nyah) is Spain, in Europe" },
          { at: "the big Atlantic Ocean", emoji: "🌊", caption: "To get there, cross the Atlantic Ocean" },
          { at: "Its capital is Madrid", big: "Madrid", caption: "The capital of Spain is Madrid" },
        ],
      },
      {
        show: [
          { emoji: "🍽️", caption: "¡A comer! Let's eat!" },
          { at: "tortillas (tor-TEE-yahs) from corn", emoji: "🌽", caption: "In Mexico, tortillas are made from corn" },
          { at: "you have a taco", emoji: "🌮", caption: "Fold a tortilla around food: a taco!" },
          { at: "people love paella", emoji: "🥘", caption: "In Spain: paella, rice in a big, flat pan" },
        ],
      },
      {
        show: [
          { emoji: "🎉", caption: "Fiesta (fee-ES-tah) means party!" },
          { at: "On September 16", emoji: "🇲🇽🎆", caption: "September 16: Mexico's Independence Day" },
          { at: "La Tomatina", emoji: "🍅", caption: "La Tomatina: a messy tomato party in Buñol, Spain" },
          { at: "Three Kings' Day", emoji: "👑🎁", caption: "January 6: Three Kings' Day in both countries" },
        ],
      },
    ],
  },
};
