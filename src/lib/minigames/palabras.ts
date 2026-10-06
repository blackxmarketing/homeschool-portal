import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * ¡Palabras! (Spanish zone, grades K-5). Lolo the parrot teaches Spanish
 * words and phrases. Four kinds of rounds:
 *   - hear:  a Spanish word or phrase is spoken (and shown); tap its picture.
 *   - match: tap a Spanish word, then its picture, until every pair is matched.
 *   - build: build a Spanish word or sentence from tiles (with tricky extra tiles).
 *   - reply: a Spanish question is spoken; build an answer from tiles (grades 3-5).
 * Building is the heart of the game: kids produce Spanish, not just pick it.
 *
 * Each round is worth 2 points when right on the first try and 1 point when
 * solved after a retry. Levels follow ACTFL: Novice Low (K-1), Novice Mid
 * (2-3), Novice High (4-5). Pure and seeded, so the server can replay moves.
 */

export const palabrasInfo = {
  id: "palabras",
  title: "¡Palabras!",
  icon: "💬",
  land: "summit" as const,
  subject: "span" as const,
  grades: [0, 1, 2, 3, 4, 5],
  blurb: "Listen, match and speak Spanish words and phrases.",
};

// ---------------- Content ----------------

/** A Spanish word or phrase with its picture (an emoji or a short label) and English meaning. */
export interface Word {
  es: string;
  pic: string;
  en: string;
}

export interface HearRound {
  kind: "hear";
  /** choices[0] is the answer; the screen shows them shuffled. */
  choices: Word[];
  tip: string;
}

export interface MatchRound {
  kind: "match";
  items: Word[];
  tip: string;
}

export interface BuildRound {
  kind: "build";
  /** Picture clue. */
  pic: string;
  /** What to say, in English. */
  en: string;
  /** The tiles: the first answer's pieces plus distractors (shown shuffled). */
  tiles: string[];
  /** Accepted answers (pieces joined by `join`). The first is the model answer. */
  answers: string[];
  /** " " for sentences, "" for building one word from syllables. */
  join: string;
  tip: string;
}

export interface ReplyRound {
  kind: "reply";
  /** The spoken Spanish question. */
  question: string;
  /** The question in English (a hint after a wrong try). */
  qEn: string;
  /** Picture clue for the answer. */
  pic: string;
  tiles: string[];
  answers: string[];
  /** The model answer in English. */
  en: string;
  tip: string;
}

export type Round = HearRound | MatchRound | BuildRound | ReplyRound;

export interface PalabrasLevel extends MiniLevel {
  grade: number;
  /** ACTFL proficiency target. */
  actfl: "Novice Low" | "Novice Mid" | "Novice High";
  rounds: Round[];
}

const w = (es: string, pic: string, en: string): Word => ({ es, pic, en });
const hear = (tip: string, ...choices: Word[]): HearRound => ({ kind: "hear", choices, tip });
const match = (tip: string, ...items: Word[]): MatchRound => ({ kind: "match", items, tip });

/** A sentence build: the answer's words become tiles, plus the extra (distractor) tiles. */
function build(pic: string, en: string, answer: string, extra: string[], tip: string, alts: string[] = []): BuildRound {
  return { kind: "build", pic, en, tiles: [...answer.split(" "), ...extra], answers: [answer, ...alts], join: " ", tip };
}

/** A one-word build from syllables, e.g. ca + tor + ce. */
function syll(pic: string, en: string, parts: string[], extra: string[], tip: string): BuildRound {
  return { kind: "build", pic, en, tiles: [...parts, ...extra], answers: [parts.join("")], join: "", tip };
}

function reply(question: string, qEn: string, pic: string, answer: string, en: string, extra: string[], tip: string, alts: string[] = []): ReplyRound {
  return { kind: "reply", question, qEn, pic, tiles: [...answer.split(" "), ...extra], answers: [answer, ...alts], en, tip };
}

const ACTFL = (g: number): PalabrasLevel["actfl"] => (g <= 1 ? "Novice Low" : g <= 3 ? "Novice Mid" : "Novice High");

function lvl(grade: number, n: number, title: string, skill: string, rounds: Round[]): PalabrasLevel {
  const id = `${grade === 0 ? "k" : `g${grade}`}-${n}`;
  return { id, grade, actfl: ACTFL(grade), title, intro: `${skill} (ACTFL ${ACTFL(grade)}). Listen to Lolo the parrot, match the words, then build Spanish yourself!`, rounds };
}

export const PALABRAS_LEVELS: PalabrasLevel[] = [
  // ---------- Kindergarten: greetings, numbers 1-10, colors, family, animals, feelings ----------
  lvl(0, 1, "¡Hola!", "Skill: greetings and numbers 1 to 5", [
    hear("Buenos días means good morning. Días means days.", w("buenos días", "☀️", "good morning"), w("buenas noches", "🌙", "good night"), w("hola", "👋", "hello")),
    hear("Uno is one.", w("uno", "1️⃣", "one"), w("dos", "2️⃣", "two"), w("tres", "3️⃣", "three")),
    match("Uno, dos, tres: one, two, three!", w("uno", "1️⃣", "one"), w("dos", "2️⃣", "two"), w("tres", "3️⃣", "three")),
    hear("Cinco is five. Count your fingers: five!", w("cinco", "5️⃣", "five"), w("cuatro", "4️⃣", "four"), w("dos", "2️⃣", "two")),
    build("☀️", "Good morning!", "Buenos días", ["noches"], "In the morning we say buenos días."),
  ]),
  lvl(0, 2, "Colores y números", "Skill: colors and numbers 1 to 10", [
    hear("Rojo is red, like an apple.", w("rojo", "🟥", "red"), w("azul", "🟦", "blue"), w("amarillo", "🟨", "yellow")),
    match("Rojo is red, azul is blue, verde is green.", w("rojo", "🟥", "red"), w("azul", "🟦", "blue"), w("verde", "🟩", "green")),
    hear("Siete is seven.", w("siete", "7️⃣", "seven"), w("seis", "6️⃣", "six"), w("nueve", "9️⃣", "nine")),
    hear("Diez is ten: all ten fingers!", w("diez", "🔟", "ten"), w("ocho", "8️⃣", "eight"), w("tres", "3️⃣", "three")),
    build("🐱🐱", "Two cats", "dos gatos", ["tres"], "Count first: one, two cats. Dos gatos!"),
  ]),
  lvl(0, 3, "Mi familia y mis animales", "Skill: family, animals and feelings", [
    hear("Mamá means mom.", w("mamá", "👩", "mom"), w("papá", "👨", "dad"), w("bebé", "👶", "baby")),
    hear("Perro means dog. Woof!", w("perro", "🐶", "dog"), w("gato", "🐱", "cat"), w("pez", "🐟", "fish")),
    match("Feliz is happy, triste is sad, enojado is angry.", w("feliz", "😀", "happy"), w("triste", "😢", "sad"), w("enojado", "😠", "angry")),
    build("😀", "I am happy.", "Estoy feliz", ["triste"], "Estoy means I am. Estoy feliz: I am happy!"),
    build("🐶🐶🐶", "Three dogs", "tres perros", ["cuatro"], "Count the dogs: uno, dos, tres. Tres perros!"),
  ]),

  // ---------- Grade 1: numbers 11-20, body, food (me gusta), school, days, weather ----------
  lvl(1, 1, "Números 11-20", "Skill: numbers 11 to 20", [
    hear("Doce is twelve.", w("doce", "12", "twelve"), w("dos", "2", "two"), w("veinte", "20", "twenty")),
    hear("Quince is fifteen.", w("quince", "15", "fifteen"), w("cinco", "5", "five"), w("catorce", "14", "fourteen")),
    match("Once is 11, trece is 13, diecisiete is 17 and veinte is 20.", w("once", "11", "eleven"), w("trece", "13", "thirteen"), w("diecisiete", "17", "seventeen"), w("veinte", "20", "twenty")),
    hear("Dieciocho is diez y ocho squeezed together: ten and eight.", w("dieciocho", "18", "eighteen"), w("ocho", "8", "eight"), w("diecinueve", "19", "nineteen")),
    syll("14", "fourteen", ["ca", "tor", "ce"], ["do"], "Catorce is fourteen. It is built from three pieces."),
    build("🥚 × 12", "There are twelve eggs.", "Hay doce huevos", ["dos"], "Hay means there is or there are. Hay doce huevos!"),
  ]),
  lvl(1, 2, "Mi cuerpo y la comida", "Skill: body parts and foods with me gusta", [
    hear("Nariz means nose.", w("la nariz", "👃", "the nose"), w("la oreja", "👂", "the ear"), w("la boca", "👄", "the mouth")),
    match("Ojo is eye, mano is hand, pie is foot, boca is mouth.", w("el ojo", "👁️", "the eye"), w("la mano", "✋", "the hand"), w("el pie", "🦶", "the foot"), w("la boca", "👄", "the mouth")),
    hear("Manzana means apple.", w("la manzana", "🍎", "the apple"), w("el plátano", "🍌", "the banana"), w("la leche", "🥛", "the milk")),
    match("Pan is bread, leche is milk, queso is cheese, plátano is banana.", w("el pan", "🍞", "bread"), w("la leche", "🥛", "milk"), w("el queso", "🧀", "cheese"), w("el plátano", "🍌", "banana")),
    build("🍕 😋", "I like pizza.", "Me gusta la pizza", ["el"], "Pizza is a la word: la pizza. Me gusta means I like."),
    build("🧀 👎", "I don't like cheese.", "No me gusta el queso", ["la"], "Put no first to say you don't like it: no me gusta."),
  ]),
  lvl(1, 3, "La escuela, los días y el tiempo", "Skill: school things, days of the week and weather", [
    hear("Lápiz means pencil.", w("el lápiz", "✏️", "the pencil"), w("el libro", "📕", "the book"), w("la mochila", "🎒", "the backpack")),
    build("📅", "Monday, Tuesday, Wednesday, Thursday, Friday", "lunes martes miércoles jueves viernes", [], "The school week: lunes, martes, miércoles, jueves, viernes. Spanish day names start with a small letter."),
    build("📅 Monday", "Today is Monday.", "Hoy es lunes", ["martes"], "Hoy es means today is. Hoy es lunes!"),
    hear("Llueve means it is raining.", w("llueve", "🌧️", "it's raining"), w("hace sol", "☀️", "it's sunny"), w("nieva", "❄️", "it's snowing")),
    match("Hace sol: sunny. Llueve: rainy. Nieva: snowy. Hace viento: windy.", w("hace sol", "☀️", "it's sunny"), w("llueve", "🌧️", "it's raining"), w("nieva", "❄️", "it's snowing"), w("hace viento", "💨", "it's windy")),
    build("🥶", "It's cold.", "Hace frío", ["calor"], "Hace frío is cold. Hace calor is hot."),
  ]),

  // ---------- Grade 2: introducing yourself, clothes, house, tens to 100, months ----------
  lvl(2, 1, "¡Me presento!", "Skill: introducing yourself and saying how you feel", [
    hear("Cansado means tired.", w("Estoy cansado", "😴", "I'm tired"), w("Estoy bien", "👍", "I'm fine"), w("Estoy triste", "😢", "I'm sad")),
    match("Bien is fine, mal is bad, cansado is tired, contento is glad.", w("bien", "👍", "fine"), w("mal", "👎", "bad"), w("cansado", "😴", "tired"), w("contento", "😊", "glad")),
    build("❓🏷️", "What is your name?", "¿Cómo te llamas?", ["me"], "Spanish questions start with an upside-down mark: ¿Cómo te llamas?"),
    build("🏷️ Ana", "My name is Ana.", "Me llamo Ana", ["Tengo"], "Me llamo means my name is (I call myself)."),
    build("🎂 8", "I am eight years old.", "Tengo ocho años", ["Soy"], "In Spanish you HAVE years: tengo ocho años."),
    build("🤝", "Nice to meet you!", "Mucho gusto", ["bueno"], "Say mucho gusto when you meet someone new."),
  ]),
  lvl(2, 2, "La ropa y la casa", "Skill: clothes, colors and rooms of the house", [
    hear("Camisa means shirt.", w("la camisa", "👕", "the shirt"), w("los pantalones", "👖", "the pants"), w("los zapatos", "👟", "the shoes")),
    match("Gorra is cap, vestido is dress, calcetines are socks, chaqueta is jacket.", w("la gorra", "🧢", "the cap"), w("el vestido", "👗", "the dress"), w("los calcetines", "🧦", "the socks"), w("la chaqueta", "🧥", "the jacket")),
    build("👕 🟦", "I'm wearing a blue shirt.", "Llevo una camisa azul", ["un"], "In Spanish the color comes after the thing: camisa azul."),
    hear("Cocina means kitchen.", w("la cocina", "🍳", "the kitchen"), w("el baño", "🛁", "the bathroom"), w("el dormitorio", "🛏️", "the bedroom")),
    match("Cocina: kitchen. Baño: bathroom. Dormitorio: bedroom. Sala: living room.", w("la cocina", "🍳", "the kitchen"), w("el baño", "🛁", "the bathroom"), w("el dormitorio", "🛏️", "the bedroom"), w("la sala", "🛋️", "the living room")),
    build("🏠", "My house is big.", "Mi casa es grande", ["pequeña"], "Mi casa es grande: my house is big. Pequeña means small."),
  ]),
  lvl(2, 3, "Decenas y meses", "Skill: counting by tens to 100 and the months", [
    hear("Cincuenta is fifty. Cinco and cincuenta sound alike!", w("cincuenta", "50", "fifty"), w("quince", "15", "fifteen"), w("cinco", "5", "five")),
    hear("Treinta is thirty.", w("treinta", "30", "thirty"), w("trece", "13", "thirteen"), w("tres", "3", "three")),
    match("Veinte 20, cuarenta 40, sesenta 60, cien 100.", w("veinte", "20", "twenty"), w("cuarenta", "40", "forty"), w("sesenta", "60", "sixty"), w("cien", "100", "one hundred")),
    build("75", "seventy-five", "setenta y cinco", ["siete", "cincuenta"], "Big numbers use y (and): setenta y cinco is 70 and 5."),
    build("🗓️", "January, February, March, April", "enero febrero marzo abril", ["julio"], "The year starts enero, febrero, marzo, abril. Months start with a small letter too."),
    build("🎂 May", "My birthday is in May.", "Mi cumpleaños es en mayo", ["junio"], "Cumpleaños means birthday. Mayo is May."),
  ]),

  // ---------- Grade 3: town, sports and hobbies, time, describing ----------
  lvl(3, 1, "En el pueblo", "Skill: places in town and saying where you go", [
    hear("Biblioteca means library: lots of books!", w("la biblioteca", "📚", "the library"), w("el hospital", "🏥", "the hospital"), w("la escuela", "🏫", "the school")),
    match("Parque: park. Tienda: store. Banco: bank. Hospital: hospital.", w("el parque", "🌳", "the park"), w("la tienda", "🏪", "the store"), w("el banco", "🏦", "the bank"), w("el hospital", "🏥", "the hospital")),
    hear("Mercado means market.", w("el mercado", "🛒", "the market"), w("el banco", "🏦", "the bank"), w("el parque", "🌳", "the park")),
    build("🌳", "I'm going to the park.", "Voy al parque", ["a", "la"], "A + el squeeze into al: voy al parque."),
    build("📚", "I'm going to the library.", "Voy a la biblioteca", ["al"], "La words don't squeeze: voy a la biblioteca."),
    build("🏦 📍", "The bank is near.", "El banco está cerca", ["es"], "Use está to tell where something is: está cerca."),
    reply("¿Adónde vas?", "Where are you going?", "🏫", "Voy a la escuela", "I'm going to school.", ["al", "Vas"], "Answer ¿adónde vas? with voy a... (I'm going to...)."),
  ]),
  lvl(3, 2, "Deportes y la hora", "Skill: sports and hobbies, and telling time", [
    match("Fútbol: soccer. Béisbol: baseball. Natación: swimming. Baloncesto: basketball.", w("el fútbol", "⚽", "soccer"), w("el béisbol", "⚾", "baseball"), w("la natación", "🏊", "swimming"), w("el baloncesto", "🏀", "basketball")),
    hear("Nadar means to swim.", w("Me gusta nadar", "🏊", "I like to swim"), w("Me gusta pintar", "🎨", "I like to paint"), w("Me gusta leer", "📖", "I like to read")),
    build("⚽ 😋", "I like to play soccer.", "Me gusta jugar al fútbol", ["el"], "We say jugar al fútbol: play (at) soccer."),
    hear("Son las tres: it's three o'clock.", w("Son las tres", "3:00", "It's three o'clock"), w("Son las nueve", "9:00", "It's nine o'clock"), w("Es la una", "1:00", "It's one o'clock")),
    build("🕐 1:00", "It's one o'clock.", "Es la una", ["Son", "las"], "One o'clock is special: es la una. All other hours use son las."),
    build("🕟 4:30", "It's four thirty.", "Son las cuatro y media", ["cinco"], "Y media means and a half: half past."),
    reply("¿Qué hora es?", "What time is it?", "🕗 8:00", "Son las ocho", "It's eight o'clock.", ["Es", "la"], "Hours after one use son las: son las ocho."),
  ]),
  lvl(3, 3, "¿Cómo es?", "Skill: describing people and things (adjective agreement)", [
    match("Grande: big. Pequeño: small. Rápido: fast. Lento: slow.", w("grande", "🐘", "big"), w("pequeño", "🐭", "small"), w("rápido", "🐆", "fast"), w("lento", "🐢", "slow")),
    build("🏠 🟥", "The house is red.", "La casa es roja", ["rojo"], "Casa is a la word, so the color ends in a: roja."),
    build("🐕 ⬆️", "The dog is big.", "El perro es grande", ["La"], "Grande ends in e, so it works for el and la words."),
    build("🐈‍⬛🐈‍⬛", "The cats are black.", "Los gatos son negros", ["negro", "es"], "Two cats: son (are) and negros with an s."),
    build("👧 📏", "My sister is tall.", "Mi hermana es alta", ["alto"], "Hermana is a girl, so alto changes to alta."),
    build("🌼🌼", "The flowers are yellow.", "Las flores son amarillas", ["amarillo", "es"], "Las flores: the color gets a and s: amarillas."),
    reply("¿Cómo es el elefante?", "What is the elephant like?", "🐘", "El elefante es grande", "The elephant is big.", ["pequeño", "son"], "Describe with es + a describing word.", ["Es grande"]),
  ]),

  // ---------- Grade 4: daily routine, ordering food, describing people and places ----------
  lvl(4, 1, "Mi rutina", "Skill: talking about your daily routine", [
    match("Me despierto: I wake up. Me cepillo los dientes: I brush my teeth. Me ducho: I shower. Desayuno: I eat breakfast.", w("me despierto", "⏰", "I wake up"), w("me cepillo los dientes", "🪥", "I brush my teeth"), w("me ducho", "🚿", "I shower"), w("desayuno", "🥣", "I eat breakfast")),
    hear("Me acuesto means I go to bed.", w("Me acuesto", "🛏️", "I go to bed"), w("Me ducho", "🚿", "I shower"), w("Desayuno", "🥣", "I eat breakfast")),
    build("⏰ 7:00", "I get up at seven.", "Me levanto a las siete", ["Se"], "Routine verbs use me: me levanto (I get myself up)."),
    build("🪥", "I brush my teeth.", "Me cepillo los dientes", ["el"], "Dientes is plural, so it's los dientes."),
    build("🚿 ➜ 🥣", "First I shower and then I eat breakfast.", "Primero me ducho y luego desayuno", ["después"], "Primero means first, luego means then."),
    reply("¿A qué hora te acuestas?", "What time do you go to bed?", "🛏️ 9:00", "Me acuesto a las nueve", "I go to bed at nine.", ["te", "la"], "The question says te acuestas (you); your answer says me acuesto (I)."),
    reply("¿Te duchas por la mañana?", "Do you shower in the morning?", "🚿 🌅", "Sí, me ducho por la mañana", "Yes, I shower in the morning.", ["te", "noche"], "Answer sí, then turn te duchas into me ducho.", ["Me ducho por la mañana"]),
  ]),
  lvl(4, 2, "En el restaurante", "Skill: ordering food politely", [
    match("Sopa: soup. Jugo: juice. Ensalada: salad. Pollo: chicken.", w("la sopa", "🍲", "the soup"), w("el jugo", "🧃", "the juice"), w("la ensalada", "🥗", "the salad"), w("el pollo", "🍗", "the chicken")),
    hear("La cuenta is the bill (check).", w("La cuenta, por favor", "🧾", "The check, please"), w("Un postre, por favor", "🍰", "A dessert, please"), w("Agua, por favor", "💧", "Water, please")),
    build("🍔", "I want a hamburger, please.", "Quiero una hamburguesa, por favor", ["un"], "Quiero means I want. Por favor makes it polite."),
    build("🥛", "I would like a glass of milk.", "Quisiera un vaso de leche", ["una"], "Quisiera is an extra-polite I would like. Vaso is an el word: un vaso."),
    reply("¿Qué desea?", "What would you like?", "🌮", "Quiero tacos, por favor", "I want tacos, please.", ["Quieres"], "Answer with quiero (I want), not quieres (you want).", ["Quiero tacos"]),
    reply("¿Algo para beber?", "Anything to drink?", "🧃 🍎", "Sí, un jugo de manzana", "Yes, an apple juice.", ["una", "naranja"], "Apple juice is jugo de manzana: juice OF apple.", ["Un jugo de manzana"]),
    reply("¿Cuánto cuesta?", "How much does it cost?", "💲5", "Cuesta cinco dólares", "It costs five dollars.", ["Cuestan", "seis"], "One thing costs: cuesta. Many things cost: cuestan."),
  ]),
  lvl(4, 3, "Mis amigos y mi pueblo", "Skill: describing people, places and hobbies in longer sentences", [
    match("Leer: to read. Pintar: to paint. Cantar: to sing. Cocinar: to cook.", w("leer", "📖", "to read"), w("pintar", "🎨", "to paint"), w("cantar", "🎤", "to sing"), w("cocinar", "🍳", "to cook")),
    hear("Los sábados means on Saturdays.", w("Juego al béisbol los sábados", "⚾", "I play baseball on Saturdays"), w("Juego al fútbol los sábados", "⚽", "I play soccer on Saturdays"), w("Juego al baloncesto los sábados", "🏀", "I play basketball on Saturdays")),
    build("🧒 📏 😊", "My friend is tall and nice.", "Mi amigo es alto y simpático", ["alta", "simpática"], "Amigo is a boy, so both words end in o: alto y simpático."),
    build("👧👧 😄", "My friends are fun.", "Mis amigas son divertidas", ["divertidos", "es"], "Amigas are girls, and there are two: divertidas."),
    reply("¿Qué te gusta hacer?", "What do you like to do?", "🎨", "Me gusta pintar", "I like to paint.", ["Te", "gustan"], "Me gusta + an action: me gusta pintar."),
    reply("¿Dónde está la tienda?", "Where is the store?", "🏪 ➜ 🏦", "La tienda está al lado del banco", "The store is next to the bank.", ["es", "de"], "Al lado de means next to; de + el squeeze into del."),
    reply("¿Cómo es tu casa?", "What is your house like?", "🏠 ⬆️ ⬜", "Mi casa es grande y blanca", "My house is big and white.", ["blanco", "Tu"], "Casa is a la word: blanca. Answer about mi casa (my house).", ["Es grande y blanca"]),
  ]),

  // ---------- Grade 5: simple past, routine and time, conversation ----------
  lvl(5, 1, "Ayer… (el pretérito)", "Skill: the simple past (preterite) for things you did", [
    match("Comí: I ate. Jugué: I played. Leí: I read. Nadé: I swam.", w("comí", "🍽️", "I ate"), w("jugué", "⚽", "I played"), w("leí", "📖", "I read"), w("nadé", "🏊", "I swam")),
    hear("Ayer means yesterday. Jugué is I played.", w("Ayer jugué al fútbol", "⚽", "Yesterday I played soccer"), w("Ayer leí un libro", "📖", "Yesterday I read a book"), w("Ayer nadé", "🏊", "Yesterday I swam")),
    build("🍕 ⏪", "Yesterday I ate pizza.", "Ayer comí pizza", ["como"], "Como is I eat (now); comí is I ate (yesterday). The accent matters!"),
    build("🌙 📖", "Last night I read a book.", "Anoche leí un libro", ["leo"], "Anoche means last night. Leí is I read (past)."),
    build("📅 🌳", "On Saturday I went to the park.", "El sábado fui al parque", ["voy"], "Fui means I went. Voy means I go."),
    reply("¿Qué comiste ayer?", "What did you eat yesterday?", "🌮", "Ayer comí tacos", "Yesterday I ate tacos.", ["como", "comiste"], "Comiste (you ate) becomes comí (I ate).", ["Comí tacos"]),
    reply("¿Adónde fuiste el domingo?", "Where did you go on Sunday?", "🏖️", "El domingo fui a la playa", "On Sunday I went to the beach.", ["voy", "al"], "Fuiste (you went) becomes fui (I went). Playa is a la word: a la playa.", ["Fui a la playa"]),
    reply("¿Qué hiciste anoche?", "What did you do last night?", "🎨", "Anoche pinté un dibujo", "Last night I painted a picture.", ["pinto", "una"], "Pinté (I painted) has an accent on the é.", ["Pinté un dibujo"]),
  ]),
  lvl(5, 2, "Mi día, ayer y hoy", "Skill: time to the quarter hour and routines in the present and past", [
    hear("Y cuarto means a quarter past.", w("Son las diez y cuarto", "10:15", "It's 10:15"), w("Son las diez menos cuarto", "9:45", "It's 9:45"), w("Son las dos y diez", "2:10", "It's 2:10")),
    match("Y media is :30, y cuarto is :15, menos cuarto is a quarter to.", w("Es la una", "1:00", "It's one"), w("Son las dos y media", "2:30", "It's 2:30"), w("Son las cinco y cuarto", "5:15", "It's 5:15"), w("Son las ocho menos cuarto", "7:45", "It's 7:45")),
    build("🌅 🚿", "I get up early and I shower.", "Me levanto temprano y me ducho", ["tarde"], "Temprano means early; tarde means late."),
    build("🌙 😴 ⏪", "Yesterday I went to bed late.", "Ayer me acosté tarde", ["acuesto"], "Me acuesto is now; me acosté is yesterday."),
    build("👕 ➜ 🥣 ⏪", "First I got dressed and then I ate breakfast.", "Primero me vestí y luego desayuné", ["desayuno"], "Past -ar verbs end in é for I: desayuné."),
    reply("¿A qué hora empieza la escuela?", "What time does school start?", "🏫 8:30", "Empieza a las ocho y media", "It starts at eight thirty.", ["Empiezo", "nueve"], "The school starts, so it's empieza (it starts)."),
    reply("¿Qué haces después de la escuela?", "What do you do after school?", "📖 ✏️", "Hago la tarea", "I do my homework.", ["Hace", "el"], "Haces (you do) becomes hago (I do)."),
    reply("¿Qué hiciste el fin de semana?", "What did you do on the weekend?", "🚲", "Monté en bicicleta", "I rode my bike.", ["Monto", "a"], "Monté (I rode) is the past; monto is now."),
  ]),
  lvl(5, 3, "¡Conversación!", "Skill: a whole conversation: asking and answering about yourself", [
    reply("¿Cómo te llamas?", "What is your name?", "🏷️ Mateo", "Me llamo Mateo", "My name is Mateo.", ["Te", "Soy"], "Te llamas (you call yourself) becomes me llamo.", ["Soy Mateo"]),
    reply("¿Cuántos años tienes?", "How old are you?", "🎂 11", "Tengo once años", "I am eleven years old.", ["Soy", "tienes"], "In Spanish you have years: tengo once años."),
    reply("¿De dónde eres?", "Where are you from?", "📍 Florida", "Soy de Florida", "I'm from Florida.", ["Eres", "Estoy"], "Eres (you are) becomes soy (I am)."),
    reply("¿Qué te gusta comer?", "What do you like to eat?", "🍝", "Me gusta comer pasta", "I like to eat pasta.", ["gustan", "Te", "la"], "One thing you like: me gusta.", ["Me gusta la pasta"]),
    reply("¿Cómo es tu mejor amigo?", "What is your best friend like?", "🧒 😄", "Mi mejor amigo es divertido", "My best friend is fun.", ["divertida", "son"], "Amigo is a boy, so divertido ends in o.", ["Es divertido"]),
    reply("¿Qué hiciste ayer?", "What did you do yesterday?", "⚾", "Ayer jugué al béisbol", "Yesterday I played baseball.", ["juego", "la"], "Jugué is I played (past). Juego is I play (now).", ["Jugué al béisbol"]),
    build("👴👵 ➜", "Tomorrow I'm going to visit my grandparents.", "Mañana voy a visitar a mis abuelos", ["fui"], "Voy a + an action tells the future: voy a visitar."),
    reply("¿Qué tiempo hace hoy?", "What's the weather like today?", "🌧️", "Hoy llueve", "Today it's raining.", ["hace", "nieva"], "Llueve means it rains or it's raining.", ["Llueve"]),
  ]),
];

export const levelById = (id: string): PalabrasLevel | undefined => PALABRAS_LEVELS.find((l) => l.id === id);
export const levelsFor = (grade: number) => PALABRAS_LEVELS.filter((l) => l.grade === grade);

// ---------------- Seeded order ----------------

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A shuffled order of 0..n-1, the same every time for the same key. */
export function order(n: number, key: string): number[] {
  let s = hash(key) || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Never show the answer (or the tiles) already in order.
  if (n > 1 && a.every((v, i) => v === i)) a.push(a.shift()!);
  return a;
}

// ---------------- Checking answers ----------------

/** Compares Spanish answers: case and ¿?¡!., don't matter; accents do. */
export function norm(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Tiled = BuildRound | ReplyRound;
const joinOf = (r: Tiled) => (r.kind === "build" ? r.join : " ");
export const textOf = (r: Tiled, tiles: number[]) => tiles.map((i) => r.tiles[i] ?? "").join(joinOf(r));
export const isRight = (r: Tiled, tiles: number[]) => {
  const said = norm(textOf(r, tiles));
  return r.answers.some((a) => norm(a) === said);
};
/** How the model answer is written (with question marks and accents). */
export const modelAnswer = (r: Tiled) => r.answers[0];

/** Teaching feedback for a wrong build. */
export function buildNote(r: Tiled, tiles: number[]): string {
  const pieces = (s: string) => (joinOf(r) === "" ? [s] : norm(s).split(" "));
  const chosen = tiles.map((i) => norm(r.tiles[i] ?? ""));
  const sorted = (a: string[]) => [...a].sort().join("|");
  if (joinOf(r) === "") {
    return chosen.length === 0 ? "Tap the pieces to build the word." : `Not quite. ${r.tip}`;
  }
  for (const a of r.answers) if (sorted(pieces(a)) === sorted(chosen)) return "All the right words! Now check the order.";
  const target = pieces(r.answers[0]);
  const extra = chosen.find((c) => !r.answers.some((a) => pieces(a).includes(c)));
  if (extra) return `“${extra}” doesn't fit here. ${r.tip}`;
  if (chosen.length < target.length) return `Something is missing. ${r.tip}`;
  return `Not quite. ${r.tip}`;
}

// ---------------- Moves and scoring ----------------

export const MAX_TRIES = 3;

/** One move per round. hear: picks are choice indexes (0 = the answer); match: [word, picture] item indexes; build/reply: tries of tile indexes. */
export interface RoundMove {
  picks?: number[];
  pairs?: [number, number][];
  tries?: number[][];
}

export interface RoundResult {
  /** Solved at all. */
  solved: boolean;
  /** Right on the first try (no mistakes). */
  first: boolean;
  points: number;
}

const isIdx = (v: unknown, n: number): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0 && v < n;

/** Cleans one untrusted move for its round. Never throws. */
export function cleanMove(round: Round, raw: unknown): RoundMove {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (round.kind === "hear") {
    const n = round.choices.length;
    return { picks: Array.isArray(o.picks) ? o.picks.slice(0, n).filter((p): p is number => isIdx(p, n)) : [] };
  }
  if (round.kind === "match") {
    const n = round.items.length;
    const pairs = Array.isArray(o.pairs)
      ? o.pairs
          .slice(0, 40)
          .filter((p): p is [number, number] => Array.isArray(p) && p.length === 2 && isIdx(p[0], n) && isIdx(p[1], n))
          .map((p) => [p[0], p[1]] as [number, number])
      : [];
    return { pairs };
  }
  const n = round.tiles.length;
  const tries = Array.isArray(o.tries)
    ? o.tries.slice(0, MAX_TRIES).map((t) => {
        if (!Array.isArray(t) || t.length > n) return [];
        const ok = t.every((i) => isIdx(i, n)) && new Set(t).size === t.length;
        return ok ? (t as number[]) : [];
      })
    : [];
  return { tries };
}

/** Scores one round: 2 points right on the first try, 1 point solved after a retry. */
export function scoreRound(round: Round, raw: unknown): RoundResult {
  const m = cleanMove(round, raw);
  let solved = false;
  let first = false;
  if (round.kind === "hear") {
    const picks = m.picks ?? [];
    const at = picks.indexOf(0);
    solved = at >= 0 && at < MAX_TRIES;
    first = at === 0;
  } else if (round.kind === "match") {
    const done = new Set<number>();
    let mistakes = 0;
    for (const [word, pic] of m.pairs ?? []) {
      if (done.has(word) || done.has(pic)) continue;
      if (word === pic) done.add(word);
      else mistakes++;
    }
    solved = done.size === round.items.length;
    first = solved && mistakes === 0;
  } else {
    const at = (m.tries ?? []).findIndex((t) => t.length > 0 && isRight(round, t));
    solved = at >= 0;
    first = at === 0;
  }
  return { solved, first, points: first ? 2 : solved ? 1 : 0 };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: PalabrasLevel, raw: unknown) {
  const moves = Array.isArray(raw) ? raw.slice(0, level.rounds.length) : [];
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests and as a worked example). */
export function perfectMoves(level: PalabrasLevel): RoundMove[] {
  return level.rounds.map((r) => {
    if (r.kind === "hear") return { picks: [0] };
    if (r.kind === "match") return { pairs: r.items.map((_, i) => [i, i] as [number, number]) };
    // The first answer's pieces are the first tiles, in order.
    const count = r.kind === "build" && r.join === "" ? syllableCount(r) : r.answers[0].split(" ").length;
    return { tries: [Array.from({ length: count }, (_, i) => i)] };
  });
}

/** How many of a syllable build's tiles make the answer (they come first). */
function syllableCount(r: BuildRound): number {
  let s = "";
  for (let i = 0; i < r.tiles.length; i++) {
    s += r.tiles[i];
    if (s === r.answers[0]) return i + 1;
  }
  return r.tiles.length;
}

// ---------------- Spanish voice ----------------

/** The best Spanish voice on this device (Mexican or US Spanish first, then Spain), or null. */
export function pickSpanishVoice<V extends { name: string; lang: string }>(voices: V[]): V | null {
  const es = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("es"));
  if (!es.length) return null;
  const score = (v: V) => {
    const lang = v.lang.toLowerCase().replace("_", "-");
    const n = v.name.toLowerCase();
    let s = lang === "es-mx" ? 6 : lang === "es-us" ? 5 : lang === "es-es" ? 4 : 2;
    if (/natural|neural|online|premium|enhanced/.test(n)) s += 8;
    if (/^google/.test(n)) s += 6;
    return s;
  };
  return [...es].sort((a, b) => score(b) - score(a))[0];
}

// ---------------- Reading mixed English and Spanish aloud ----------------

const clean = (t: string) => norm(t.replace(/[“”"():;]/g, ""));

/** Every Spanish word in the game (to read tips with the right voice for each word). */
export const SPANISH_WORDS: Set<string> = (() => {
  const set = new Set<string>();
  const add = (t: string) => t.split(/\s+/).forEach((x) => x && set.add(clean(x)));
  for (const l of PALABRAS_LEVELS)
    for (const r of l.rounds) {
      if (r.kind === "hear") r.choices.forEach((c) => add(c.es));
      else if (r.kind === "match") r.items.forEach((c) => add(c.es));
      else {
        // Syllable pieces (ca, tor, ce) are not words.
        if (r.kind === "reply" || r.join === " ") r.tiles.forEach(add);
        r.answers.forEach(add);
        if (r.kind === "reply") add(r.question);
      }
    }
  ["días", "noches", "hace", "calor", "llamas", "después", "quieres", "es", "son", "estar", "está", "voy", "fui", "me", "gusta", "acosté"].forEach(add);
  set.delete("");
  return set;
})();

/** Words that are also English; they count as Spanish only between Spanish words. */
const BOTH = new Set(["a", "no", "come", "red", "fin", "sale"]);

export interface SpeechPart {
  text: string;
  es: boolean;
}

/** Splits a mixed sentence like "Rojo is red, like an apple." into English and Spanish parts for the two voices. */
export function speechParts(text: string): SpeechPart[] {
  const toks = text.split(/\s+/).filter(Boolean);
  const known = toks.map((t) => SPANISH_WORDS.has(clean(t)) && !BOTH.has(clean(t)));
  const es: boolean[] = [];
  toks.forEach((t, i) => {
    if (known[i]) return es.push(true);
    if (!BOTH.has(clean(t))) return es.push(false);
    const prevOk = i === 0 || es[i - 1] || /[:.!?]$/.test(toks[i - 1]);
    let j = i + 1;
    while (j < toks.length && BOTH.has(clean(toks[j]))) j++;
    es.push(prevOk && (j < toks.length ? known[j] : es[i - 1] === true));
  });
  // Merge runs of the same language.
  const parts: SpeechPart[] = [];
  toks.forEach((t, i) => {
    const last = parts[parts.length - 1];
    if (last && last.es === es[i]) last.text += " " + t;
    else parts.push({ text: t, es: es[i] });
  });
  return parts;
}

// ---------------- Pixel art: Lolo the parrot ----------------

const RED = "#e5383b";
const RED_DARK = "#b5222a";
const YEL = "#ffd23f";
const BLUE = "#2f6fed";
const BEAK = "#f3f3f3";
const BEAK_DARK = "#8a8f9c";
const EYE = "#1b1530";
const OUT = "#1b1530";

/** Lolo, a small scarlet macaw who teaches the words. `talk` opens the beak. */
export function parrotGrid(talk = false): Grid {
  const g = new Grid(16, 18);
  g.disc(7, 5, 3.6, RED); // head
  g.rect(4, 7, 7, 7, RED); // body
  g.disc(7, 11, 3.4, RED);
  g.rect(8, 8, 4, 5, YEL); // wing
  g.rect(9, 11, 3, 3, BLUE);
  g.rect(6, 14, 3, 3, RED_DARK); // tail
  g.rect(7, 16, 2, 2, BLUE);
  g.rect(4, 3, 3, 3, BEAK); // face patch
  g.set(5, 4, EYE);
  g.rect(1, 4, 3, 2, BEAK_DARK); // beak
  g.set(2, 6, BEAK_DARK);
  if (talk) {
    g.set(1, 5, null);
    g.set(2, 5, null);
    g.rect(1, 6, 2, 1, BEAK_DARK);
  }
  g.rect(4, 15, 1, 2, BEAK_DARK); // feet
  g.rect(9, 15, 1, 1, BEAK_DARK);
  return g.outline(OUT);
}

export const palabras: MiniGame = {
  ...palabrasInfo,
  levels: () => [],
  levelsForGrade: (grade) => levelsFor(grade).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
