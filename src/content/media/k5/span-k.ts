import type { CourseMedia } from "../types";

/** Slides for span-k, by lesson id. Emoji and big words only (no photos). */
export const spanKMedia: CourseMedia = {
  "span-k.hola": {
    hook: {
      show: [
        { big: "¡Hola!", caption: "Hola means hello" },
        { at: "I am Señora Luz", emoji: "🌞", caption: "Meet Señora Luz, your Spanish teacher" },
        { at: "Today we learn", emoji: "🌎💬", caption: "Today: saying hello in Spanish!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "hola", caption: "hola (OH-lah) = hello 👋" },
          { at: "Adiós (ah-dee-OHS) means goodbye", big: "adiós", caption: "adiós (ah-dee-OHS) = goodbye" },
          { at: "hasta luego (AHS-tah LWEH-goh)", emoji: "👋⏰", caption: "hasta luego = see you later" },
          { at: "in Mexico, Spain", emoji: "🌎🗣️", caption: "People speak Spanish in Mexico, Spain and many more countries" },
          { at: "Hola when you come", emoji: "🚪👋", caption: "Hola when you come. Adiós when you go!" },
        ],
      },
      {
        show: [
          { emoji: "☀️🌙", caption: "Spanish words for the time of day" },
          { at: "In the morning, say", big: "buenos días", caption: "buenos días (BWEH-nohs DEE-ahs) = good morning ☀️" },
          { at: "At night, say", big: "buenas noches", caption: "buenas noches (BWEH-nahs NOH-chehs) = good night 🌙" },
          { at: "The sun comes up", emoji: "🌅", caption: "Sun up? Buenos días!" },
          { at: "The stars come out", emoji: "⭐🌙", caption: "Stars out? Buenas noches!" },
        ],
      },
      {
        show: [
          { big: "me llamo...", caption: "me llamo (meh YAH-moh) = my name is" },
          { at: "Our firefly friend says", emoji: "✨", caption: "Pip says: me llamo Pip!" },
          { at: "To ask a name", big: "¿cómo te llamas?", caption: "¿cómo te llamas? = what is your name?" },
          { at: "Try it!", emoji: "🙋", caption: "Your turn: me llamo... and your name!" },
        ],
      },
    ],
  },

  "span-k.numeros": {
    hook: {
      show: [
        { emoji: "🖐️🖐️", caption: "Hold up both hands" },
        { at: "How many fingers?", big: "10", caption: "Ten fingers!" },
        { at: "Today we count", emoji: "🔢🌎", caption: "Let's count to ten in Spanish" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "✋", caption: "Count one hand in Spanish" },
          { at: "Uno (OO-noh) is 1", big: "1 uno", caption: "uno (OO-noh) is 1" },
          { at: "Tres (trehs) is 3", big: "3 tres", caption: "dos is 2, tres is 3" },
          { at: "Cinco (SEEN-koh) is 5", big: "5 cinco", caption: "cuatro is 4, cinco is 5" },
          { at: "Cinco fingers make", emoji: "🖐️", caption: "Cinco fingers make one whole hand" },
        ],
      },
      {
        show: [
          { emoji: "✋", caption: "Now the other hand!" },
          { at: "Seis (sayss) is 6", big: "6 seis", caption: "seis (sayss) is 6, siete (see-EH-teh) is 7" },
          { at: "Ocho (OH-choh) is 8", big: "8 ocho", caption: "ocho is 8, nueve is 9" },
          { at: "Diez (dee-EHS) is 10", big: "10 diez", caption: "diez (dee-EHS) is 10: two whole hands" },
          { at: "Now count all ten", emoji: "🙌", caption: "Uno to diez: you did it!" },
        ],
      },
      {
        show: [
          { emoji: "🦆🦆🦆", caption: "Let's count real things" },
          { at: "Touch each duck", emoji: "👆🦆", caption: "Touch each duck one time" },
          { at: "The last number tells", big: "tres", caption: "The last number tells how many: tres ducks!" },
          { at: "You can count spoons", emoji: "🥄🧦🪜", caption: "Count spoons, socks and stairs in Spanish" },
        ],
      },
    ],
  },

  "span-k.colores": {
    hook: {
      show: [
        { emoji: "🌈", caption: "A rainbow full of colors" },
        { at: "Colors have Spanish names", big: "colores", caption: "colores (koh-LOH-rehs) = colors" },
        { at: "Let's paint", emoji: "🎨🖌️", caption: "Let's paint with Spanish words!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔴🔵🟡", caption: "Three bright colors" },
          { at: "Rojo (ROH-hoh) is red", emoji: "🍓", caption: "rojo (ROH-hoh) = red" },
          { at: "Azul (ah-SOOL) is blue", emoji: "🌊", caption: "azul (ah-SOOL) = blue" },
          { at: "Amarillo (ah-mah-REE-yoh) is yellow", emoji: "🍌", caption: "amarillo (ah-mah-REE-yoh) = yellow" },
          { at: "Painters call these", emoji: "🎨", caption: "Painters call rojo, azul and amarillo the primary colors" },
        ],
      },
      {
        show: [
          { emoji: "🎨", caption: "Let's mix paint!" },
          { at: "Mix amarillo and azul", emoji: "🟡➕🔵➡️🟢", caption: "amarillo + azul = verde (green)" },
          { at: "Mix rojo and amarillo", emoji: "🔴➕🟡➡️🟠", caption: "rojo + amarillo = naranja (orange)" },
          { at: "Mix rojo and azul", emoji: "🔴➕🔵➡️🟣", caption: "rojo + azul = morado (purple)" },
        ],
      },
      {
        show: [
          { emoji: "⚪⚫🌸", caption: "Three more colors" },
          { at: "Snow is blanco", emoji: "⛄", caption: "blanco (BLAHN-koh) = white" },
          { at: "The night sky is negro", emoji: "🌑", caption: "negro (NEH-groh) = black" },
          { at: "A flamingo is rosa", emoji: "🦩", caption: "rosa (ROH-sah) = pink" },
          { at: "Want to ask about", big: "¿de qué color es?", caption: "¿de qué color es? = what color is it?" },
        ],
      },
    ],
  },

  "span-k.familia": {
    hook: {
      show: [
        { emoji: "🏡", caption: "Who lives in your home?" },
        { at: "Maybe a mom", emoji: "👩👨👧👦", caption: "Moms, dads, brothers and sisters" },
        { at: "a family is la familia", big: "la familia", caption: "la familia (lah fah-MEE-lee-ah) = the family" },
      ],
    },
    teach: [
      {
        show: [
          { big: "mi familia", caption: "mi familia = my family" },
          { at: "Mamá (mah-MAH) is mom", emoji: "👩", caption: "mamá (mah-MAH) = mom" },
          { at: "Papá (pah-PAH) is dad", emoji: "👨", caption: "papá (pah-PAH) = dad" },
          { at: "Bebé (beh-BEH) is baby", emoji: "👶", caption: "bebé (beh-BEH) = baby" },
          { at: "we say the end part louder", big: "mah-MAH", caption: "Say the end part louder" },
        ],
      },
      {
        show: [
          { emoji: "👦👧", caption: "Brothers and sisters" },
          { at: "Hermano (ehr-MAH-noh) is brother", big: "hermano", caption: "hermano (ehr-MAH-noh) = brother" },
          { at: "Hermana (ehr-MAH-nah) is sister", big: "hermana", caption: "hermana (ehr-MAH-nah) = sister" },
          { at: "The h is quiet", emoji: "🤫", caption: "Shh! The h is quiet in Spanish" },
          { at: "Hermano ends with o", big: "o / a", caption: "hermano ends with o, hermana ends with a" },
        ],
      },
      {
        show: [
          { emoji: "👴👵", caption: "The grandparents" },
          { at: "Abuelo (ah-BWEH-loh) is grandpa", big: "abuelo", caption: "abuelo (ah-BWEH-loh) = grandpa" },
          { at: "Abuela (ah-BWEH-lah) is grandma", big: "abuela", caption: "abuela (ah-BWEH-lah) = grandma" },
          { at: "love big meals", emoji: "🍲🍽️", caption: "Big family meals with the abuelos" },
          { at: "Te quiero (teh KYEH-roh)", emoji: "❤️", caption: "te quiero = I love you" },
        ],
      },
    ],
  },

  "span-k.animales": {
    hook: {
      show: [
        { emoji: "🐄🦆🐶", caption: "Moo! Quack! Woof!" },
        { at: "Do animals sound the same", emoji: "👂🌎", caption: "Do animals sound the same in Spanish?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐶", caption: "el perro (el PEH-rroh) = the dog" },
          { at: "a dog says guau guau", big: "guau guau", caption: "A dog in Spanish says guau guau!" },
          { at: "El gato (el GAH-toh)", emoji: "🐱", caption: "el gato = the cat. It says miau!" },
          { at: "El pez (el pehs)", emoji: "🐟🐦", caption: "el pez = the fish, el pájaro = the bird" },
          { at: "Tengo un perro", emoji: "🙋🐶", caption: "tengo un perro = I have a dog" },
        ],
      },
      {
        show: [
          { emoji: "🚜", caption: "Off to the farm!" },
          { at: "La vaca (lah VAH-kah)", emoji: "🐄", caption: "la vaca = the cow. It says mu!" },
          { at: "El caballo (el kah-BAH-yoh)", emoji: "🐴", caption: "el caballo (el kah-BAH-yoh) = the horse" },
          { at: "El pato (el PAH-toh)", emoji: "🦆", caption: "el pato = the duck. It says cuac cuac!" },
          { at: "El cerdo (el SEHR-doh)", emoji: "🐷", caption: "el cerdo (el SEHR-doh) = the pig" },
        ],
      },
      {
        show: [
          { emoji: "👂🤝", caption: "Word cousins sound alike in Spanish and English" },
          { at: "León (leh-OHN) is lion", emoji: "🦁", caption: "león = lion" },
          { at: "Tigre (TEE-greh) is tiger", emoji: "🐯", caption: "tigre = tiger" },
          { at: "Elefante (eh-leh-FAHN-teh) is elephant", emoji: "🐘", caption: "elefante = elephant" },
          { at: "Jirafa (hee-RAH-fah) is giraffe", emoji: "🦒", caption: "jirafa = giraffe" },
        ],
      },
    ],
  },

  "span-k.cortesia": {
    hook: {
      show: [
        { emoji: "😀😢", caption: "How do you feel today?" },
        { at: "Feelings have Spanish words", emoji: "💬❤️", caption: "Feelings have Spanish words" },
        { at: "Kind words make friends", emoji: "🤝😊", caption: "Kind words make friends everywhere" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👋😀", caption: "Friends say hola" },
          { at: "Then they ask", big: "¿cómo estás?", caption: "¿cómo estás? (KOH-moh ehs-TAHS) = how are you?" },
          { at: "You can answer", big: "estoy bien 👍", caption: "estoy bien = I am fine" },
          { at: "Feeling great?", big: "muy bien 🌟", caption: "muy bien = very good" },
          { at: "Feeling sick?", big: "estoy mal 🤒", caption: "estoy mal = I feel bad" },
        ],
      },
      {
        show: [
          { emoji: "😀😢", caption: "Feelings have words" },
          { at: "You might feel feliz", emoji: "😀🎂", caption: "feliz (feh-LEES) = happy" },
          { at: "You might feel triste", emoji: "😢🌧️", caption: "triste (TREES-teh) = sad" },
          { at: "All feelings are okay", emoji: "💛", caption: "All feelings are okay. Say them out loud." },
        ],
      },
      {
        show: [
          { big: "por favor", caption: "por favor (pohr fah-VOHR) = please" },
          { at: "Gracias (GRAH-see-ahs) means", big: "gracias", caption: "gracias = thank you" },
          { at: "De nada (deh NAH-dah) means", big: "de nada", caption: "de nada = you are welcome" },
          { at: "Want some water?", emoji: "💧🙋", caption: "Agua, por favor!" },
          { at: "Kind words make everyone", emoji: "😊", caption: "Kind words make everyone smile" },
        ],
      },
    ],
  },
};
