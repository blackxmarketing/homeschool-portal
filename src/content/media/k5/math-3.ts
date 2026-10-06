import type { CourseMedia } from "../types";

/** Slides for math-3, by lesson id. */
export const math3Media: CourseMedia = {
  "math-3.multiply": {
    hook: {
      show: [
        { emoji: "🏝️🎈🌉", caption: "The balloon makers need balloons to lift a new bridge" },
        { at: "bunches of 4", emoji: "🎈🎈🎈🎈", caption: "Each bunch has 4 balloons" },
        { at: "Pip counts 3 bunches", big: "3 bunches", caption: "Pip counts 3 bunches" },
        { at: "Is there a faster way", big: "?", caption: "Is there a faster way than counting one by one?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "×", caption: "Multiplication: a fast way to add equal groups" },
          { at: "3 bunches of balloons", emoji: "🎈🎈🎈🎈 🎈🎈🎈🎈 🎈🎈🎈🎈", caption: "3 bunches with 4 balloons in each" },
          { at: "say 3 times 4 equals 12", big: "3 × 4 = 12", caption: "4 + 4 + 4 = 12, or 3 × 4 = 12" },
          { at: "called factors", big: "factor × factor = product", caption: "The numbers we multiply are factors; the answer is the product" },
          { at: "The groups must be equal", emoji: "⚖️", caption: "The groups must be equal" },
        ],
      },
      {
        show: [
          { emoji: "🥚🥚🥚🥚🥚🥚", caption: "An array: things in rows and columns" },
          { at: "Rows go across", emoji: "➡️", caption: "Rows go across" },
          { at: "Columns go up and down", emoji: "⬇️", caption: "Columns go up and down" },
          { at: "2 rows of 6 eggs", big: "2 × 6 = 12", caption: "2 rows of 6 eggs: 12 eggs" },
          { at: "Turn the carton sideways", big: "6 × 2 = 12", caption: "Turn it sideways: 6 rows of 2. Still 12!" },
        ],
      },
      {
        show: [
          { emoji: "🌉", caption: "A bridge with 7 sections" },
          { at: "7 groups of 6", big: "7 × 6 = 42", caption: "7 groups of 6 planks: 42 planks" },
          { at: "Four baskets hold 20 apples", emoji: "🧺🧺🧺🧺", caption: "4 baskets, 20 apples in all" },
          { at: "Count by 4s", big: "4, 8, 12, 16, 20", caption: "Count by 4s: 5 jumps" },
          { at: "The missing number is a factor", big: "4 × 5 = 20", caption: "The missing factor is 5" },
        ],
      },
    ],
  },

  "math-3.divide": {
    hook: {
      show: [
        { emoji: "👧👦🧒", caption: "Three friends on a floating island" },
        { at: "They pick 12 berries", emoji: "🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐", caption: "They pick 12 sky berries" },
        { at: "Everybody wants a fair share", emoji: "⚖️", caption: "Everybody wants a fair share" },
        { at: "How many berries should each friend get", big: "12 ÷ 3 = ?", caption: "How many does each friend get?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "÷", caption: "Division splits a total into equal groups" },
          { at: "Deal them out one at a time", emoji: "🃏", caption: "Deal them out one at a time, like cards" },
          { at: "Each friend ends up with 4", emoji: "🫐🫐🫐🫐", caption: "Each friend gets 4 berries" },
          { at: "We write 12 divided by 3", big: "12 ÷ 3 = 4", caption: "12 divided by 3 equals 4" },
          { at: "The number being divided", big: "dividend ÷ divisor = quotient", caption: "Dividend, divisor and quotient" },
        ],
      },
      {
        show: [
          { emoji: "🎈🧺", caption: "Grouping: you know how many go in each group" },
          { at: "holds 5 people", emoji: "🧍🧍🧍🧍🧍", caption: "Each balloon basket holds 5 people" },
          { at: "Make groups of 5", big: "5, 10, 15", caption: "Make groups of 5 until nobody is left" },
          { at: "15 divided by 5 equals 3", big: "15 ÷ 5 = 3", caption: "15 divided by 5 is 3 baskets" },
        ],
      },
      {
        show: [
          { emoji: "🤫", caption: "Every division problem hides a multiplication problem" },
          { at: "what times 8 makes 32", big: "? × 8 = 32", caption: "What times 8 makes 32?" },
          { at: "So 32 divided by 8 is 4", big: "32 ÷ 8 = 4", caption: "4 × 8 = 32, so 32 ÷ 8 = 4" },
          { at: "Facts come in families", emoji: "👨‍👩‍👧‍👦", caption: "Facts come in families of four" },
          { at: "Know one fact", big: "3, 4, 12", caption: "Know one fact, and you know the whole family" },
        ],
      },
    ],
  },

  "math-3.properties": {
    hook: {
      show: [
        { big: "100", caption: "100 facts in the table, from 1 × 1 to 10 × 10" },
        { at: "memorize all 100", emoji: "😵", caption: "Memorize them all one at a time?" },
        { at: "four tricks", emoji: "🪄", caption: "Four tricks make the table shrink" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔄", caption: "Multiply in any order" },
          { at: "Three rows of 8 chairs", emoji: "🪑🪑🪑🪑🪑🪑🪑🪑", caption: "3 rows of 8 chairs: 24 chairs" },
          { at: "8 rows of 3", big: "3 × 8 = 8 × 3", caption: "Turn it: 8 rows of 3. Still 24!" },
          { at: "Any number times 1", big: "9 × 1 = 9", caption: "Any number times 1 is itself" },
          { at: "Any number times 0", big: "7 × 0 = 0", caption: "Any number times 0 is 0" },
        ],
      },
      {
        show: [
          { emoji: "🎈📦", caption: "Multiplying three numbers" },
          { at: "That is 2 times 3 times 5", big: "2 × 3 × 5", caption: "2 shelves, 3 boxes, 5 balloons" },
          { at: "Do 2 times 3 first", big: "6 × 5 = 30", caption: "2 × 3 first: 6 × 5 = 30" },
          { at: "do 3 times 5 first", big: "2 × 15 = 30", caption: "3 × 5 first: 2 × 15 = 30. Same!" },
          { at: "Grouping 2 and 5 makes 10", big: "2 × 5 = 10", caption: "Group 2 and 5 to make an easy 10" },
        ],
      },
      {
        show: [
          { emoji: "🤔", caption: "Forgot 7 × 8? Break it apart!" },
          { at: "Cut each row into 5 dots and 3 dots", big: "8 = 5 + 3", caption: "Split the 8 into 5 and 3" },
          { at: "7 times 5 is 35", big: "35 + 21", caption: "7 × 5 = 35 and 7 × 3 = 21" },
          { at: "So 7 times 8 is 56", big: "7 × 8 = 56", caption: "Put them together: 56" },
        ],
      },
      {
        show: [
          { emoji: "🧩", caption: "Patterns make facts quick" },
          { at: "Times 2 is doubling", big: "× 2", caption: "Times 2: double it" },
          { at: "Times 4 is doubling twice", big: "14 → 28", caption: "Times 4: double, then double again" },
          { at: "Times 10 just puts a zero", big: "10 × 6 = 60", caption: "Times 10: put a zero on the end" },
          { at: "Times 9 has a clever trick", big: "60 - 6 = 54", caption: "Times 9: times 10, minus one group" },
        ],
      },
    ],
  },

  "math-3.problems": {
    hook: {
      show: [
        { emoji: "🎈🏪", caption: "The balloon shop starts with 50 balloons" },
        { at: "sold 4 bunches of 6", emoji: "🎈🎈🎈🎈🎈🎈", caption: "It sells 4 bunches of 6" },
        { at: "at least 20 balloons", big: "20", caption: "She needs at least 20 for the afternoon" },
        { at: "two steps", big: "1️⃣ 2️⃣", caption: "Two steps to find out" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🕵️", caption: "Some problems hide two questions" },
          { at: "Step one", big: "4 × 6 = 24", caption: "Step 1: how many were sold?" },
          { at: "Step two", big: "50 - 24 = 26", caption: "Step 2: how many are left?" },
          { at: "it has enough", emoji: "✅", caption: "26 is more than 20. Enough!" },
        ],
      },
      {
        show: [
          { big: "n", caption: "A letter can stand for a number we don't know yet" },
          { at: "like an empty box", emoji: "📦", caption: "Like an empty box waiting for its number" },
          { at: "36 divided by 4 is 9", big: "36 ÷ 4 = 9", caption: "Step 1: each friend's share" },
          { at: "9 minus 2 equals n", big: "9 - 2 = n", caption: "Step 2: each friend eats 2" },
          { at: "n is 7", big: "n = 7", caption: "Solve it: n is 7" },
        ],
      },
      {
        show: [
          { emoji: "🧐", caption: "Good mathematicians check their answers" },
          { at: "Round the numbers to friendly ones", big: "50 - 20 = 30", caption: "Round to friendly numbers: about 30" },
          { at: "If you solved it and got 33", emoji: "👍", caption: "33 is close to 30. It makes sense" },
          { at: "If you got 71", emoji: "🚫", caption: "71? Too big. Something went wrong" },
        ],
      },
      {
        show: [
          { emoji: "🔍", caption: "Numbers are full of patterns" },
          { at: "Every product of 2 is even", big: "2, 4, 6, 8, 10", caption: "Every product of 2 is even" },
          { at: "Every product of 4 is even too", big: "4, 8, 12, 16", caption: "Products of 4 are even too" },
          { at: "Products of 5 end in 0 or 5", big: "5, 10, 15, 20", caption: "Products of 5 end in 0 or 5" },
          { at: "Odd plus odd is even", big: "3 + 5 = 8", caption: "Odd plus odd is always even" },
        ],
      },
    ],
  },

  "math-3.bignumbers": {
    hook: {
      show: [
        { emoji: "🏝️↔️🏝️", caption: "The Sky Islands are drifting apart!" },
        { at: "268 feet of rope", big: "268 + 157", caption: "One island needs 268 feet, the next 157 feet" },
        { at: "only by the hundred feet", emoji: "🪢", caption: "Rope is sold by the hundred feet" },
      ],
    },
    teach: [
      {
        show: [
          { big: "347", caption: "Rounding gives a nearby friendly number" },
          { at: "347 sits between 340 and 350", big: "340 · 347 · 350", caption: "347 is closer to 350" },
          { at: "exactly halfway, like 345", big: "345 → 350", caption: "Exactly halfway rounds up" },
          { at: "347 sits between 300 and 400", big: "347 → 300", caption: "To the nearest hundred, 347 rounds to 300" },
        ],
      },
      {
        show: [
          { big: "268 + 157", caption: "Line up the places: ones, tens, hundreds" },
          { at: "Ones: 8 plus 7 is 15", big: "8 + 7 = 15", caption: "Ones: write 5, carry 1 ten" },
          { at: "Tens: 6 plus 5 plus", big: "6 + 5 + 1 = 12", caption: "Tens: write 2, carry 1 hundred" },
          { at: "Hundreds: 2 plus 1 plus 1", big: "425", caption: "Hundreds: 4. The answer is 425" },
          { at: "Check with an estimate", big: "270 + 160 = 430", caption: "Estimate to check: close!" },
        ],
      },
      {
        show: [
          { big: "425 - 157", caption: "Subtract place by place" },
          { at: "Trade 1 ten for 10 ones", emoji: "🔟➡️1️⃣", caption: "Not enough ones? Trade 1 ten for 10 ones" },
          { at: "Trade 1 hundred for 10 tens", emoji: "💯➡️🔟", caption: "Not enough tens? Trade 1 hundred for 10 tens" },
          { at: "The answer is 268", big: "268", caption: "425 - 157 = 268" },
          { at: "Check it with addition", big: "268 + 157 = 425", caption: "Check with addition: it matches!" },
        ],
      },
      {
        show: [
          { big: "4 × 30", caption: "Multiplying by tens" },
          { at: "Thirty is 3 tens", emoji: "🔟🔟🔟", caption: "30 is 3 tens" },
          { at: "That's 12 tens", big: "120", caption: "4 × 3 tens = 12 tens = 120" },
          { at: "Try 9 times 80", big: "9 × 80 = 720", caption: "9 × 8 = 72, so 9 × 80 = 720" },
          { at: "coils of 50 feet", emoji: "🪢🪢🪢🪢🪢🪢", caption: "6 coils of 50 feet: 300 feet" },
        ],
      },
    ],
  },

  "math-3.fractions": {
    hook: {
      show: [
        { emoji: "🥧", caption: "Pip baked a sky pie for 4 friends" },
        { at: "one piece is huge", emoji: "🍰🤏", caption: "One piece is huge, another is tiny" },
        { at: "What makes a fair fraction", big: "1/4 ?", caption: "What makes a fair fraction?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🥧", caption: "A fraction names part of a whole" },
          { at: "the parts must be equal", emoji: "⚖️", caption: "The parts must be equal" },
          { at: "each piece is one fourth", big: "1/4", caption: "4 equal pieces: each is one fourth" },
          { at: "Two equal parts are halves", big: "1/2 · 1/3 · 1/4", caption: "Halves, thirds, fourths, sixths, eighths" },
          { at: "is called a unit fraction", big: "1/8", caption: "One single part is a unit fraction" },
        ],
      },
      {
        show: [
          { big: "3/4", caption: "A fraction has two numbers" },
          { at: "The bottom number is the denominator", emoji: "⬇️", caption: "Denominator: how many equal parts in the whole" },
          { at: "The top number is the numerator", emoji: "⬆️", caption: "Numerator: how many parts we have" },
          { at: "That is one fourth plus one fourth plus one fourth", big: "1/4 + 1/4 + 1/4", caption: "3/4 is built from three fourths" },
          { at: "That's the whole pie", big: "4/4 = 1", caption: "4 fourths is the whole pie" },
        ],
      },
      {
        show: [
          { big: "0 ——— 1", caption: "Fractions have spots on the number line" },
          { at: "split it into 4 equal jumps", big: "0 · 1/4 · 2/4 · 3/4 · 1", caption: "Split 0 to 1 into 4 equal jumps" },
          { at: "Four fourths lands right on 1", big: "4/4 = 1", caption: "Four fourths lands on 1" },
          { at: "The numerator tells how many jumps", emoji: "🐸", caption: "The top number: how many jumps from 0" },
        ],
      },
    ],
  },

  "math-3.compare-fractions": {
    hook: {
      show: [
        { emoji: "🥞🥞", caption: "Two pancakes of the same size" },
        { at: "she eats 1", big: "1/2", caption: "Ada eats 1 of 2 pieces" },
        { at: "he eats 2", big: "2/4", caption: "Ben eats 2 of 4 pieces" },
        { at: "Is Ben right", big: "?", caption: "Did Ben really eat more?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📄", caption: "Fold a paper strip in half" },
          { at: "fold it in half again", emoji: "📄✂️", caption: "Fold it in half again" },
          { at: "one half equals two fourths", big: "1/2 = 2/4", caption: "Same colored part: 1/2 = 2/4" },
          { at: "called equivalent", big: "1/2 = 2/4 = 4/8", caption: "Equivalent fractions share a spot on the number line" },
          { at: "Ada and Ben ate the same amount", emoji: "🤝", caption: "Ada and Ben ate the same amount!" },
        ],
      },
      {
        show: [
          { emoji: "🥧", caption: "Whole numbers can be fractions too" },
          { at: "6 sixths equals 1", big: "6/6 = 1", caption: "All 6 sixths is 1 whole" },
          { at: "the fraction equals 1", big: "8/8 = 1", caption: "Same top and bottom: it equals 1" },
          { at: "picture 3 whole pies", emoji: "🥧🥧🥧", caption: "3 whole pies" },
          { at: "written 3 over 1", big: "3/1 = 3", caption: "3 wholes: 3/1 = 3" },
        ],
      },
      {
        show: [
          { emoji: "🍕", caption: "Same denominator: same-size pieces" },
          { at: "Compare 5 eighths and 3 eighths", big: "5/8 ? 3/8", caption: "Compare 5/8 and 3/8" },
          { at: "So 5 eighths is greater", big: "5/8 > 3/8", caption: "5 pieces beat 3 pieces" },
          { at: "Half of a big watermelon", emoji: "🍉🆚🍇", caption: "Only compare parts of the same-size whole" },
        ],
      },
      {
        show: [
          { emoji: "🔪", caption: "Same numerator: look at the size of the pieces" },
          { at: "Cut a pie into 3 pieces", big: "1/3", caption: "3 pieces: each piece is big" },
          { at: "into 8 pieces", big: "1/8", caption: "8 pieces: each piece is small" },
          { at: "the bigger the denominator", emoji: "🤏", caption: "Bigger denominator, smaller pieces" },
          { at: "So 2 thirds is more than 2 eighths", big: "2/3 > 2/8", caption: "2/3 is more than 2/8" },
        ],
      },
    ],
  },

  "math-3.time-measure": {
    hook: {
      show: [
        { emoji: "⛴️☁️", caption: "The sky ferry leaves at 7:43" },
        { at: "the ride takes 35 minutes", big: "35 min", caption: "The ride takes 35 minutes" },
        { at: "kilograms of cargo", emoji: "📦⚖️", caption: "Cargo is measured in kilograms" },
        { at: "liters of fresh water", emoji: "💧", caption: "Fresh water is measured in liters" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🕰️", caption: "A clock has two hands" },
          { at: "Between each pair of numbers", big: "5 minutes", caption: "Each number is 5 more minutes" },
          { at: "count by 5s", big: "5, 10, 15 … 40", caption: "Count by 5s to the number before the hand" },
          { at: "Then 41, 42, 43", big: "43", caption: "Then count on by 1s" },
          { at: "the time is 7:43", big: "7:43", caption: "The time is 7:43" },
        ],
      },
      {
        show: [
          { emoji: "⏱️", caption: "Elapsed time: how much time passes" },
          { at: "Jump from 7:43 to the next hour", big: "7:43 → 8:00", caption: "Jump to the next hour: 17 minutes" },
          { at: "We still need 18 more minutes", big: "8:00 → 8:18", caption: "18 more minutes" },
          { at: "The ferry lands at 8:18", big: "8:18", caption: "The ferry lands at 8:18" },
          { at: "60 minutes in every hour", big: "60", caption: "Every hour has 60 minutes" },
        ],
      },
      {
        show: [
          { emoji: "💧", caption: "Liquid volume: how much a container holds" },
          { at: "A large water bottle holds about 1 liter", big: "1 liter", caption: "A large water bottle: about 1 liter" },
          { at: "A bathtub holds much more", emoji: "🛁", caption: "A bathtub: often over 100 liters" },
          { at: "A teacup holds much less", emoji: "☕", caption: "A teacup: much less than a liter" },
          { at: "60 divided by 6 is 10 buckets", big: "60 ÷ 6 = 10", caption: "60 liters in 6-liter buckets: 10 buckets" },
        ],
      },
      {
        show: [
          { emoji: "⚖️", caption: "Mass: how much matter is in an object" },
          { at: "A paper clip", emoji: "📎", caption: "A paper clip: about 1 gram" },
          { at: "One kilogram is 1000 grams", big: "1 kg = 1000 g", caption: "One kilogram is 1000 grams" },
          { at: "A liter of water has a mass of about 1 kilogram", emoji: "💧⚖️", caption: "A liter of water: about 1 kilogram" },
          { at: "3 crates of 8 kilograms", big: "3 × 8 = 24 kg", caption: "3 crates of 8 kg: 24 kg of cargo" },
        ],
      },
    ],
  },

  "math-3.graphs": {
    hook: {
      show: [
        { emoji: "🗳️🌉", caption: "The islanders voted for a bridge color" },
        { at: "hundreds of votes", emoji: "📝📝📝📝📝", caption: "Hundreds of votes on slips of paper" },
        { at: "turn all those slips into a picture", emoji: "📊", caption: "Turn the pile into a picture anyone can read" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎈", caption: "A picture graph uses symbols" },
          { at: "The key tells you how many", big: "🎈 = 5", caption: "The key: each symbol stands for 5" },
          { at: "the red row has 4 balloon symbols", emoji: "🎈🎈🎈🎈", caption: "4 symbols in the red row" },
          { at: "4 times 5 is 20", big: "4 × 5 = 20", caption: "4 × 5 = 20 red balloons" },
          { at: "Always read the key first", emoji: "🔑", caption: "Always read the key first!" },
        ],
      },
      {
        show: [
          { emoji: "📊", caption: "A bar graph uses bars" },
          { at: "Along the side is a scale", big: "0, 10, 20, 30", caption: "The scale counts by jumps" },
          { at: "slide your finger", emoji: "👉", caption: "Look straight across from the top of the bar" },
          { at: "Halfway between 20 and 30 is 25", big: "25", caption: "Halfway between 20 and 30 is 25" },
          { at: "The tallest bar wins", emoji: "🏆", caption: "The tallest bar wins!" },
        ],
      },
      {
        show: [
          { emoji: "🆚", caption: "Graphs answer 'how many more?'" },
          { at: "70 minus 30 is 40", big: "70 - 30 = 40", caption: "Blue got 40 more votes than red" },
          { at: "Red got 40 fewer than blue", big: "40 fewer", caption: "How many fewer: the same subtraction" },
          { at: "Some questions take two steps", big: "30 + 15 = 45", caption: "Step 1: add red and gold" },
          { at: "70 minus 45 is 25 more", big: "70 - 45 = 25", caption: "Step 2: subtract from blue" },
        ],
      },
      {
        show: [
          { emoji: "📏", caption: "A line plot shows measurements" },
          { at: "smaller marks for quarters", big: "1/4 · 1/2 · 3/4", caption: "Rulers have half and quarter inch marks" },
          { at: "3 and one quarter inches", emoji: "🪶", caption: "A feather: 3 1/4 inches long" },
          { at: "Put an X above the number", big: "✖️✖️✖️", caption: "One X for each thing measured" },
          { at: "The tallest stack of Xs", emoji: "🏔️", caption: "The tallest stack is the most common length" },
        ],
      },
    ],
  },

  "math-3.area-shapes": {
    hook: {
      show: [
        { emoji: "🏝️🌱", caption: "A new garden on a floating island" },
        { at: "how much soil covers the ground", emoji: "🟫", caption: "How much soil covers the ground? (area)" },
        { at: "how much fence goes around it", emoji: "🚧", caption: "How much fence goes around it? (perimeter)" },
        { at: "design a garden of your own", emoji: "✏️📐", caption: "You'll design your own garden" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🟩", caption: "Area: how much flat space a shape covers" },
          { at: "A unit square is 1 unit long", big: "1 × 1", caption: "A unit square is 1 unit on each side" },
          { at: "Leave no gaps", emoji: "🟩🟩🟩", caption: "No gaps and no overlaps" },
          { at: "the area is in square centimeters", big: "sq cm · sq ft", caption: "Square centimeters, square feet and more" },
        ],
      },
      {
        show: [
          { emoji: "🟩🟩🟩🟩🟩🟩", caption: "A rectangle is an array of squares" },
          { at: "4 times 6 is 24 square feet", big: "4 × 6 = 24", caption: "4 rows of 6: 24 square feet" },
          { at: "Area equals length times width", big: "length × width", caption: "Area = length × width" },
          { at: "Split it into two rectangles", emoji: "✂️", caption: "Split an L-shape into two rectangles" },
          { at: "15 plus 8 is 23 square feet", big: "15 + 8 = 23", caption: "Add the parts: 23 square feet" },
        ],
      },
      {
        show: [
          { emoji: "🚧", caption: "Perimeter: the distance around" },
          { at: "4 plus 6 plus 4 plus 6", big: "4 + 6 + 4 + 6 = 20", caption: "20 feet of fence" },
          { at: "Area counts squares inside", emoji: "🟩🆚🚧", caption: "Area inside, perimeter outside" },
          { at: "Missing a side", big: "20 - 14 = 6", caption: "Missing side: subtract from the perimeter" },
          { at: "Here's a surprise", big: "12 ft: 5 vs 9", caption: "Same fence, different areas!" },
        ],
      },
      {
        show: [
          { big: "4 sides", caption: "Quadrilaterals have four straight sides" },
          { at: "A rectangle has four square corners", emoji: "📕", caption: "A rectangle: four square corners" },
          { at: "A rhombus has four sides", emoji: "🔷", caption: "A rhombus: four equal sides" },
          { at: "A square has both", emoji: "🟦", caption: "A square: a rectangle and a rhombus" },
          { at: "A triangle is not", emoji: "🔺", caption: "A triangle has 3 sides, so it's not a quadrilateral" },
        ],
      },
    ],
  },
};
