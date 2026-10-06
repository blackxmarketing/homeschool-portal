import type { CourseMedia } from "../types";

/** Slides for math-5, by lesson id. */
export const math5Media: CourseMedia = {
  "math-5.expressions": {
    hook: {
      show: [
        { emoji: "🏔️🏰", caption: "The fort at Starpeak Frontier" },
        { at: "2 × (15 + 5) sacks", big: "2 × (15 + 5)", caption: "The quartermaster's note" },
        { at: "One clerk carried 40", emoji: "🧑‍🌾 40   🧑‍🌾 35", caption: "Two clerks, two different answers" },
        { at: "Which one?", emoji: "🤔", caption: "Who read the note the right way?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "1️⃣2️⃣3️⃣", caption: "The order of operations" },
          { at: "Step one", big: "( )", caption: "Step one: work inside parentheses" },
          { at: "Look at 2 × (15 + 5)", big: "2 × 20 = 40", caption: "Parentheses first: 15 + 5 = 20" },
          { at: "Now look at 2 × 15 + 5", big: "30 + 5 = 35", caption: "No parentheses: multiply first" },
          { at: "Do me first", emoji: "🪧", caption: "Parentheses say: do me first!" },
        ],
      },
      {
        show: [
          { big: "( ) [ ] { }", caption: "Parentheses, brackets and braces" },
          { at: "like peeling an onion", emoji: "🧅", caption: "Start in the middle and work out" },
          { at: "Try 20 − [3 × (2 + 4)]", big: "20 − [3 × 6] = 2", caption: "2 + 4 = 6, then 3 × 6 = 18, then 20 − 18" },
          { at: "One more", big: "{2 × [6 + 4]} = 20", caption: "8 ÷ 2 = 4, then 6 + 4 = 10, then 2 × 10" },
        ],
      },
      {
        show: [
          { emoji: "💬➡️🔢", caption: "Words can become math" },
          { at: "becomes 2 × (8 + 7)", big: "2 × (8 + 7)", caption: "Add 8 and 7, then multiply by 2" },
          { at: "becomes 8 × 7 + 2", big: "8 × 7 + 2", caption: "Multiply 8 by 7, then add 2" },
          { at: "three times as large", big: "3 × (18,932 + 921)", caption: "Three times as large as the sum" },
          { at: "You don't even need to add", emoji: "😎", caption: "Read it without working it out!" },
        ],
      },
    ],
  },

  "math-5.powers-of-ten": {
    hook: {
      show: [
        { emoji: "🔭✨", caption: "The Starpeak observatory" },
        { at: "a tiny crystal of ice", big: "0.004 m", caption: "A tiny crystal of ice" },
        { at: "how far light travels", big: "300,000 km", caption: "How far light travels in one second" },
        { at: "The secret is the number 10", big: "10", caption: "The secret is the number 10" },
      ],
    },
    teach: [
      {
        show: [
          { big: "555", caption: "Three 5s, three different values" },
          { at: "it means 500", big: "500 · 50 · 5", caption: "Hundreds, tens and ones" },
          { at: "Each place is worth 10 times", emoji: "⬅️ × 10", caption: "Each place is 10 times the place to its right" },
          { at: "Each place is worth 1/10", emoji: "➡️ × 1/10", caption: "Each place is 1/10 of the place to its left" },
          { at: "tenths, hundredths, thousandths", big: "0.1 · 0.01 · 0.001", caption: "The pattern keeps going past the point" },
        ],
      },
      {
        show: [
          { big: "10 · 100 · 1,000", caption: "Powers of 10" },
          { at: "called an exponent", big: "10²", caption: "The small raised number is an exponent" },
          { at: "10³ means", big: "10 × 10 × 10", caption: "10³ = 1,000" },
          { at: "how many zeros", emoji: "1️⃣0️⃣0️⃣0️⃣", caption: "The exponent counts the zeros" },
          { at: "one million", big: "10⁶ = 1,000,000", caption: "A 1 with six zeros: one million!" },
        ],
      },
      {
        show: [
          { emoji: "⬅️⬅️", caption: "Multiply by 10: digits move left" },
          { at: "4.7 × 10 = 47", big: "4.7 × 10 = 47", caption: "Ten times as big" },
          { at: "4.7 × 100 = 470", big: "4.7 × 100 = 470", caption: "Two zeros, two places" },
          { at: "When you divide by 10", big: "36 ÷ 10 = 3.6", caption: "Divide: digits move right" },
          { at: "decimal point is hopping", emoji: "🐸", caption: "The point hops once for each zero" },
        ],
      },
    ],
  },

  "math-5.decimals": {
    hook: {
      show: [
        { emoji: "🧊📏", caption: "Two scouts measure one icicle" },
        { at: "One wrote 0.7 meters", big: "0.7 m", caption: "The first scout's measurement" },
        { at: "The other wrote 0.65 meters", big: "0.65 m", caption: "The second scout's measurement" },
        { at: "Was he right?", emoji: "🤔", caption: "Is 0.65 really longer?" },
      ],
    },
    teach: [
      {
        show: [
          { big: ". 1 2 3", caption: "Tenths, hundredths, thousandths" },
          { at: "Look at 347.392", big: "347.392", caption: "3 hundreds, 4 tens, 7 ones..." },
          { at: "In expanded form", emoji: "🧩", caption: "Expanded form: every place, added up" },
          { at: "say 'and' for the point", emoji: "🗣️", caption: "Say 'and' for the decimal point" },
          { at: "2.375 is", big: "2.375", caption: "Two and three hundred seventy-five thousandths" },
        ],
      },
      {
        show: [
          { emoji: "🧊⚖️🧊", caption: "Let's settle the icicle argument" },
          { at: "Line up the decimal points", big: "0.70 vs 0.65", caption: "Line up the points" },
          { at: "Seven is more", big: "0.7 > 0.65", caption: "7 tenths beats 6 tenths" },
          { at: "A longer decimal is not always bigger", emoji: "📏❌", caption: "More digits doesn't mean bigger" },
          { at: "1.4 = 1.40 = 1.400", big: "1.4 = 1.40", caption: "Zeros at the end don't change the value" },
        ],
      },
      {
        show: [
          { emoji: "🎯", caption: "Rounding gives a close, simpler number" },
          { at: "If it is 5 or more", emoji: "⬆️ 5-9   ➡️ 0-4", caption: "5 or more: round up. 4 or less: keep it" },
          { at: "Round 3.476 to the nearest tenth", big: "3.476 ≈ 3.5", caption: "To the nearest tenth: 3.5" },
          { at: "Round 3.476 to the nearest hundredth", big: "3.476 ≈ 3.48", caption: "To the nearest hundredth: 3.48" },
        ],
      },
    ],
  },

  "math-5.multiply-divide": {
    hook: {
      show: [
        { emoji: "🛷❄️", caption: "A wagon train arrives at the fort" },
        { at: "130 travelers", big: "130", caption: "130 cold, tired travelers" },
        { at: "Each sled holds 12", emoji: "🛷 = 12", caption: "Each sled holds 12 people" },
        { at: "Who is right?", emoji: "🤔 10 or 11?", caption: "10 sleds or 11?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "346 × 27", caption: "Let's multiply 346 × 27" },
          { at: "346 × 7 = 2,422", big: "2,422", caption: "346 × 7 ones" },
          { at: "write a 0 in the ones place", big: "6,920", caption: "The 2 means 20: write a 0 first" },
          { at: "add the two lines", big: "9,342", caption: "2,422 + 6,920 = 9,342" },
          { at: "Estimate to check", emoji: "✅", caption: "350 × 30 is about 10,500: close!" },
        ],
      },
      {
        show: [
          { big: "864 ÷ 24", caption: "Let's divide 864 by 24" },
          { at: "First, estimate", emoji: "🎯", caption: "24 is close to 25: a bit more than 30" },
          { at: "24 × 30 = 720", big: "864 − 720 = 144", caption: "Take away 30 groups" },
          { at: "24 × 6 = 144", big: "30 + 6 = 36", caption: "Take away 6 more groups" },
          { at: "Check by multiplying", big: "24 × 36 = 864", caption: "Check: it works!" },
        ],
      },
      {
        show: [
          { emoji: "🔩📦", caption: "2,345 nails, 15 in a box" },
          { at: "So 100 + 50 + 6", big: "156 R 5", caption: "156 full boxes, 5 nails left over" },
          { at: "always ask what the remainder means", emoji: "🤔", caption: "What does the remainder mean?" },
          { at: "130 ÷ 12 = 10 R 10", big: "10 R 10", caption: "Ten people still waiting" },
          { at: "the fort needs 11 sleds", emoji: "🛷 × 11", caption: "The fort needs 11 sleds!" },
        ],
      },
    ],
  },

  "math-5.decimal-operations": {
    hook: {
      show: [
        { emoji: "🏪🧤", caption: "The Starpeak trading post" },
        { at: "pays with a ten-dollar bill", big: "$10", caption: "A ten-dollar bill" },
        { at: "needs help with decimals", emoji: "🧮", caption: "Dollars and cents are decimals" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📍📍", caption: "Line up the decimal points" },
          { at: "The trapper buys rope", big: "4.75 + 2.60 = 7.35", caption: "Rope and mittens: $7.35" },
          { at: "He pays with $10", big: "10.00 − 7.35 = 2.65", caption: "His change is $2.65" },
          { at: "Zeros at the end", big: "2.6 = 2.60", caption: "Zeros at the end keep places lined up" },
        ],
      },
      {
        show: [
          { emoji: "🎯", caption: "Start with an estimate" },
          { at: "Exactly, it is 3.00", big: "2.5 × 1.2 = 3", caption: "About 3 × 1, and exactly 3" },
          { at: "Picture a square cut into 100", emoji: "🔲💯", caption: "A square cut into 100 little boxes" },
          { at: "They overlap in 12 boxes", big: "0.3 × 0.4 = 0.12", caption: "Tenths times tenths make hundredths" },
          { at: "count the decimal places", emoji: "1️⃣ + 1️⃣ = 2️⃣", caption: "Count the decimal places in both factors" },
        ],
      },
      {
        show: [
          { emoji: "❓📦", caption: "How many groups? How much in each?" },
          { at: "how many halves fit in 3", big: "3 ÷ 0.5 = 6", caption: "Six halves fit in 3" },
          { at: "Surprise", emoji: "😮", caption: "Dividing by less than 1 gives a bigger answer" },
          { at: "15 tenths ÷ 3 tenths", big: "1.5 ÷ 0.3 = 5", caption: "15 tenths ÷ 3 tenths = 5" },
          { at: "Dividing by a whole number", big: "7.2 ÷ 3 = 2.4", caption: "Share 7.2 into 3 equal parts" },
        ],
      },
    ],
  },

  "math-5.add-fractions": {
    hook: {
      show: [
        { emoji: "🥾⛰️", caption: "The trail up to Starpeak" },
        { at: "the first stretch is 3/4", big: "3/4 + 2/3", caption: "Two stretches of trail" },
        { at: "That's 5/7 of a mile", big: "5/7 ?", caption: "Adding tops and bottoms" },
        { at: "Something is wrong", emoji: "🚫", caption: "That can't be right!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🍕🧩", caption: "Only same-sized pieces can be added" },
          { at: "Thirds and fourths are different sizes", big: "1/3 + 1/4", caption: "Thirds and fourths don't match" },
          { at: "twelfths, because 3 and 4", big: "12", caption: "Twelfths fit both" },
          { at: "Now they match", big: "4/12 + 3/12 = 7/12", caption: "Now the pieces match" },
          { at: "We only add the tops", emoji: "⬆️➕", caption: "Add the tops; the bottom stays the same" },
        ],
      },
      {
        show: [
          { big: "2 1/2 + 1 2/3", caption: "Adding mixed numbers" },
          { at: "Add the fractions: 3/6 + 4/6", big: "3 7/6 = 4 1/6", caption: "7/6 is more than a whole" },
          { at: "Subtracting can need regrouping", big: "3 1/4 − 1 2/4", caption: "Subtracting with regrouping" },
          { at: "trade one whole for 4/4", big: "2 5/4 − 1 2/4", caption: "Trade one whole for 4/4" },
          { at: "Now 2 5/4 − 1 2/4 = 1 3/4", big: "1 3/4", caption: "The answer is 1 3/4" },
        ],
      },
      {
        show: [
          { emoji: "🥾", caption: "Back on the trail" },
          { at: "9/12 + 8/12 = 17/12", big: "1 5/12 miles", caption: "3/4 + 2/3 = 17/12 = 1 5/12" },
          { at: "Does that make sense", emoji: "🤔", caption: "Does the answer make sense?" },
          { at: "Benchmarks like 0, 1/2 and 1", big: "0 · 1/2 · 1", caption: "Benchmarks catch mistakes" },
          { at: "Another check", big: "2/5 + 1/2 ≠ 3/7", caption: "3/7 is less than 1/2: wrong!" },
        ],
      },
    ],
  },

  "math-5.multiply-fractions": {
    hook: {
      show: [
        { emoji: "🧀🧀🧀", caption: "3 wheels of cheese" },
        { at: "4 hungry scouts", emoji: "🧒🧒🧒🧒", caption: "4 hungry scouts" },
        { at: "how much does each scout get", emoji: "🤔", caption: "How much does each scout get?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "3/4 = 3 ÷ 4", caption: "The fraction bar means divide" },
          { at: "Cut each wheel into 4", emoji: "🧀✂️", caption: "Cut each wheel into 4 pieces" },
          { at: "Each scout gets 3/4", big: "3/4", caption: "Each scout gets 3/4 of a wheel" },
          { at: "50-pound sack of rice", emoji: "🍚 ÷ 4", caption: "4 families share 50 pounds of rice" },
          { at: "12 1/2 pounds", big: "12 1/2", caption: "Between 12 and 13 pounds each" },
        ],
      },
      {
        show: [
          { big: "2/3 × 6 = 4", caption: "2/3 of 6 is 4" },
          { at: "multiply the tops and multiply the bottoms", big: "2/3 × 4/5 = 8/15", caption: "Tops times tops, bottoms times bottoms" },
          { at: "A garden bed", emoji: "🌱🟩", caption: "A garden bed 2/3 yard by 3/4 yard" },
          { at: "which is 6 tiles", big: "6/12 = 1/2", caption: "6 of 12 tiles: 1/2 square yard" },
        ],
      },
      {
        show: [
          { emoji: "🔍", caption: "Multiplying can stretch or shrink" },
          { at: "Multiply by 3/4", big: "3/4 × 12 = 9", caption: "Less than 1: smaller" },
          { at: "Multiply by 5/4", big: "5/4 × 12 = 15", caption: "More than 1: bigger" },
          { at: "Multiply by 4/4", big: "4/4 × 12 = 12", caption: "Equal to 1: the same" },
          { at: "equivalent fractions work", big: "2/3 × 4/4 = 8/12", caption: "Equivalent fractions: times 1" },
        ],
      },
      {
        show: [
          { emoji: "🥞🥞🥞", caption: "Three batches of pancakes" },
          { at: "Together: 7 1/2 cups", big: "7 1/2 cups", caption: "3 × 2 1/2 = 7 1/2" },
          { at: "A storeroom floor", emoji: "🏚️📐", caption: "A floor 1 1/2 by 2 1/3 yards" },
          { at: "Multiply: 3/2 × 7/3", big: "21/6 = 3 1/2", caption: "3/2 × 7/3 = 21/6 = 3 1/2" },
          { at: "Check the size", emoji: "✅", caption: "A bit more than 3 makes sense" },
        ],
      },
    ],
  },

  "math-5.divide-fractions": {
    hook: {
      show: [
        { emoji: "🔭🍇", caption: "Snack time at the observatory" },
        { at: "2 cups of raisins", big: "2 cups", caption: "2 cups of raisins" },
        { at: "1/3 of a cup", big: "1/3 cup", caption: "Each snack is 1/3 cup" },
        { at: "How many snacks", emoji: "🤔", caption: "How many snacks is that?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1/2 · 1/3 · 1/4", caption: "Unit fractions have a 1 on top" },
          { at: "Let's find 4 ÷ 1/3", big: "4 ÷ 1/3", caption: "How many thirds fit in 4?" },
          { at: "Picture 4 wholes", emoji: "🟦🟦🟦🟦", caption: "4 wholes, each cut into 3 thirds" },
          { at: "So 4 ÷ 1/3 = 12", big: "12", caption: "12 thirds in 4 wholes" },
          { at: "Check by multiplying", big: "12 × 1/3 = 4", caption: "Check: it works!" },
        ],
      },
      {
        show: [
          { big: "1/3 ÷ 4", caption: "Now flip it" },
          { at: "4 people want to share it", emoji: "🥧👥", caption: "A third of a pie for 4 people" },
          { at: "Cut that third into 4", emoji: "🥧✂️", caption: "Cut the third into 4 equal parts" },
          { at: "So each part is 1/12", big: "1/12", caption: "Each part is 1/12 of the pie" },
          { at: "Check by multiplying", big: "4 × 1/12 = 1/3", caption: "Check: it works!" },
        ],
      },
      {
        show: [
          { emoji: "❓", caption: "How many fit, or sharing a piece?" },
          { at: "1/2 pound of chocolate", big: "1/2 ÷ 3 = 1/6", caption: "Share 1/2 pound among 3" },
          { at: "2 cups of raisins", big: "2 ÷ 1/3 = 6", caption: "Six 1/3-cup snacks in 2 cups" },
          { at: "Draw a picture", emoji: "✏️", caption: "Draw a picture if you're not sure" },
        ],
      },
      {
        show: [
          { emoji: "❄️📏", caption: "The snow keeper's 8 gauges" },
          { at: "On the line plot", big: "X X · X X X X · X X", caption: "X's over 1/4, 1/2 and 3/4 inch" },
          { at: "What is the total", big: "4 inches", caption: "1/2 + 2 + 1 1/2 = 4 inches" },
          { at: "shared equally among the 8 gauges", big: "4 ÷ 8 = 1/2", caption: "1/2 inch each if shared equally" },
        ],
      },
    ],
  },

  "math-5.measure-volume": {
    hook: {
      show: [
        { emoji: "🪢✂️", caption: "3 yards of rope, cut into 6-inch pieces" },
        { at: "how much grain the new bin can hold", emoji: "🌾📦", caption: "How much will the grain bin hold?" },
        { at: "Grab your measuring tools", emoji: "📏⚖️", caption: "Grab your measuring tools!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1 ft = 12 in", caption: "Some units are bigger than others" },
          { at: "Metric units go by tens", big: "1 m = 100 cm", caption: "Metric units go by tens" },
          { at: "Big unit to small unit: multiply", emoji: "🐘➡️🐭 ×", caption: "Big to small: multiply" },
          { at: "Small to big: divide", big: "5 cm = 0.05 m", caption: "Small to big: divide" },
          { at: "Now the rope", big: "108 ÷ 6 = 18", caption: "3 yards = 108 inches = 18 pieces" },
        ],
      },
      {
        show: [
          { emoji: "📏 ⬛ 📦", caption: "Length, area and volume" },
          { at: "we use unit cubes", emoji: "🧊", caption: "A unit cube is 1 by 1 by 1" },
          { at: "1 cubic centimeter", big: "1 cm³", caption: "1 cubic centimeter" },
          { at: "no gaps and no overlaps", emoji: "📦🧊🧊🧊", caption: "Pack it with cubes: no gaps, no overlaps" },
        ],
      },
      {
        show: [
          { emoji: "🧊🧊🧊", caption: "Counting every cube takes a long time" },
          { at: "in the bottom layer", big: "4 × 3 = 12", caption: "12 cubes in the bottom layer" },
          { at: "V = l × w × h", big: "V = l × w × h", caption: "Volume = length × width × height" },
          { at: "V = B × h", big: "V = B × h", caption: "Base area times height" },
          { at: "A firewood bin", big: "120 ft³", caption: "8 × 5 × 3 = 120 cubic feet" },
        ],
      },
      {
        show: [
          { emoji: "🏚️🏚️", caption: "An L-shaped storehouse" },
          { at: "Split it into two", emoji: "✂️📦📦", caption: "Split it into two boxes" },
          { at: "The big room", big: "120 m³", caption: "Big room: 10 × 4 × 3" },
          { at: "The small room", big: "60 m³", caption: "Small room: 5 × 4 × 3" },
          { at: "Add the two volumes", big: "180 m³", caption: "120 + 60 = 180 cubic meters" },
        ],
      },
    ],
  },

  "math-5.graph-shapes": {
    hook: {
      show: [
        { emoji: "🌠🌠🌠", caption: "The Starfall has begun!" },
        { at: "Glowing stones", emoji: "✨🪨", caption: "Glowing stones land on the frontier" },
        { at: "a map with numbers", emoji: "🗺️🔢", caption: "A map with numbers on it" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "➕", caption: "Two number lines that cross" },
          { at: "is the x-axis", big: "x ↔", caption: "The x-axis goes left and right" },
          { at: "is the y-axis", big: "y ↕", caption: "The y-axis goes up and down" },
          { at: "the origin", big: "(0, 0)", caption: "The origin" },
          { at: "To plot (4, 7)", big: "(4, 7)", caption: "4 right, then 7 up" },
        ],
      },
      {
        show: [
          { emoji: "🗺️", caption: "Each grid square is 1 mile" },
          { at: "The fort is at (2, 3)", big: "🏰 (2, 3)", caption: "The fort" },
          { at: "The observatory is at (2, 9)", big: "🔭 (2, 9)", caption: "The observatory" },
          { at: "9 − 3 = 6 miles", big: "6 miles", caption: "Same x: subtract the y's" },
          { at: "A falling star lands at (7, 3)", big: "🌠 (7, 3)", caption: "Same y: subtract the x's: 5 miles" },
        ],
      },
      {
        show: [
          { big: "0, 3, 6, 9, 12", caption: "Rule A: start at 0, add 3" },
          { at: "Rule B: start at 0 and add 6", big: "0, 6, 12, 18, 24", caption: "Rule B: start at 0, add 6" },
          { at: "pair up the terms", big: "(3, 6) (6, 12) (9, 18)", caption: "Pair up the terms" },
          { at: "every B term is twice", emoji: "✖️2️⃣", caption: "Each B term is twice its A term" },
          { at: "they line up in a straight line", emoji: "📈", caption: "The points make a straight line" },
        ],
      },
      {
        show: [
          { emoji: "🌳", caption: "Shapes have family trees" },
          { at: "A parallelogram is", emoji: "▱", caption: "Parallelogram: two pairs of parallel sides" },
          { at: "A rectangle is", emoji: "▭", caption: "Rectangle: four right angles" },
          { at: "A rhombus is", emoji: "🔷", caption: "Rhombus: four equal sides" },
          { at: "So a square is a rectangle and a rhombus", emoji: "⬛", caption: "A square is a rectangle and a rhombus!" },
        ],
      },
    ],
  },
};
