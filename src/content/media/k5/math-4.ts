import type { CourseMedia } from "../types";

/** Slides for math-4, by lesson id. */
export const math4Media: CourseMedia = {
  "math-4.placevalue": {
    hook: {
      show: [
        { emoji: "🚂🏜️🪧", caption: "An old sign in the canyon railroad town" },
        { at: "472,815 riders", big: "472,815", caption: "Riders in the trains' first year" },
        { at: "How do you even say it", emoji: "🤔🗣️", caption: "How do you read a number this big?" },
        { at: "closer to 400,000 or 500,000", big: "400,000 or 500,000?", caption: "Which friendly number is it closer to?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔟✖️", caption: "Each place is worth ten times the place to its right" },
          { at: "Ten ones make one ten", emoji: "1️⃣ ➡️ 🔟 ➡️ 💯", caption: "10 ones = 1 ten, 10 tens = 1 hundred" },
          { at: "one million", big: "1,000,000", caption: "Keep going and you reach one million" },
          { at: "the number 5,500", big: "5,500", caption: "Two 5s, but they are not worth the same" },
          { at: "That is ten times as much", big: "5,000 = 10 × 500", caption: "One place to the left is ten times as much" },
        ],
      },
      {
        show: [
          { big: "472,815", caption: "Commas split big numbers into groups of three" },
          { at: "four hundred seventy-two thousand", emoji: "🗣️", caption: "Four hundred seventy-two thousand, eight hundred fifteen" },
          { at: "Expanded form", big: "400,000 + 70,000 + 2,000 + 800 + 10 + 5", caption: "Expanded form shows what every digit is worth" },
          { at: "A zero holds a place", big: "304,217", caption: "The 0 says: no ten thousands here" },
          { at: "shrink to 34,217", big: "34,217", caption: "Without the zero, the number shrinks!" },
        ],
      },
      {
        show: [
          { big: "63,481 ? 63,418", caption: "Which number is bigger?" },
          { at: "count the digits", emoji: "🔢", caption: "More digits always means a bigger number" },
          { at: "compare place by place", emoji: "⬅️👀", caption: "Same number of digits? Compare from the left" },
          { at: "8 tens is more than 1 ten", big: "63,481 > 63,418", caption: "8 tens beats 1 ten" },
          { at: "open side of the sign", emoji: "🐊", caption: "The open side faces the bigger number" },
        ],
      },
      {
        show: [
          { emoji: "🎯", caption: "Rounding gives a friendly number that is close" },
          { at: "look at the digit just to its right", emoji: "👉", caption: "Look at the digit just to the right" },
          { at: "5 or more, round up", big: "5-9 ⬆️   0-4 ➡️", caption: "5 or more rounds up. 4 or less stays the same" },
          { at: "round 472,815 to the nearest thousand", big: "472,815", caption: "Round to the nearest thousand" },
          { at: "The answer is 473,000", big: "473,000", caption: "The 8 makes the 2 round up to 3" },
        ],
      },
    ],
  },

  "math-4.addsub": {
    hook: {
      show: [
        { emoji: "🚂🚂🏜️", caption: "Two trains run through the Canyon of Echoes" },
        { at: "3,486 miles", big: "3,486 mi", caption: "The Red Rock Express" },
        { at: "2,759 miles", big: "2,759 mi", caption: "The Mesa Runner" },
        { at: "How far did they go together", big: "+ and −", caption: "How far together? How much farther?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📏🔢", caption: "Stack the numbers so the places line up" },
          { at: "6 plus 9 is 15", big: "6 + 9 = 15", caption: "Write the 5, carry the 1 ten" },
          { at: "8 plus 5 plus the carried 1", big: "8 + 5 + 1 = 14", caption: "Write 4, carry 1 hundred" },
          { at: "4 plus 7 plus 1", big: "4 + 7 + 1 = 12", caption: "Write 2, carry 1 thousand" },
          { at: "6,245 miles", big: "6,245", caption: "Together the trains went 6,245 miles" },
        ],
      },
      {
        show: [
          { big: "3,486 − 2,759", caption: "How much farther did the Express go?" },
          { at: "borrow 1 ten", emoji: "🔟➡️", caption: "Not enough ones? Borrow a ten" },
          { at: "16 minus 9 is 7", big: "16 − 9 = 7", caption: "Now the ones work" },
          { at: "727 miles farther", big: "727", caption: "The Express went 727 miles farther" },
          { at: "borrow across them", big: "5,000 − 1,234", caption: "Borrow across zeros: each zero becomes a 9" },
        ],
      },
      {
        show: [
          { emoji: "🛟", caption: "Check your answer with an estimate" },
          { at: "rounds to 3,000", big: "3,486 ≈ 3,000", caption: "Round each number" },
          { at: "about 6,000 miles", big: "3,000 + 3,000 = 6,000", caption: "Quick estimate in your head" },
          { at: "6,245, is close", emoji: "✅", caption: "6,245 is close to 6,000, so it makes sense" },
          { at: "62,450 by mistake", emoji: "🚨", caption: "The estimate catches big mistakes" },
        ],
      },
      {
        show: [
          { emoji: "🎟️🎟️🎟️", caption: "1,500 train tickets at the ticket office" },
          { at: "Use a letter", big: "t = ?", caption: "A letter stands for the unknown number" },
          { at: "t equals 1,500 minus 628 minus 547", big: "t = 1,500 − 628 − 547", caption: "Write the equation" },
          { at: "1,175 tickets sold", big: "628 + 547 = 1,175", caption: "Step 1: tickets sold" },
          { at: "t is 325", big: "t = 325", caption: "Step 2: 1,500 − 1,175 = 325 tickets left" },
        ],
      },
    ],
  },

  "math-4.multiply": {
    hook: {
      show: [
        { emoji: "🚃🚃🚃🚃🚃🚃", caption: "A short mail train has 6 cars" },
        { at: "4 times as many cars", emoji: "🚂✖️4️⃣", caption: "The freight train has 4 times as many" },
        { at: "Pip says the long train has 10 cars", big: "10?", caption: "Is Pip right?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⚖️", caption: "Multiplication can compare two amounts" },
          { at: "4 groups of 6", big: "4 × 6 = 24", caption: "4 times as many as 6 is 24" },
          { at: "not the same as 4 more", big: "6 + 4 = 10", caption: "4 more is only 10. Not the same!" },
          { at: "24 is 4 times as many as 6", big: "24 = 4 × 6", caption: "One equation, two comparisons" },
        ],
      },
      {
        show: [
          { emoji: "🔍📝", caption: "Word problems give clues" },
          { at: "How many more", emoji: "➕➖", caption: "'How many more' means add or subtract" },
          { at: "A hawk flew 45 miles", emoji: "🦅", caption: "The hawk flew 5 times as far as the crow" },
          { at: "45 divided by 5 is 9", big: "45 ÷ 5 = 9", caption: "The crow flew 9 miles" },
          { at: "45 minus 9 is 36", big: "45 − 9 = 36", caption: "The hawk flew 36 miles farther" },
        ],
      },
      {
        show: [
          { big: "4 × 1,326", caption: "Break the big number into its places" },
          { at: "Split 1,326", big: "1,000 + 300 + 20 + 6", caption: "1,326 split by place value" },
          { at: "These are partial products", big: "4,000 + 1,200 + 80 + 24", caption: "Partial products" },
          { at: "5,304", big: "5,304", caption: "Add them up" },
        ],
      },
      {
        show: [
          { emoji: "🟦🟪\n🟫⬜", caption: "An area model: a rectangle split into four boxes" },
          { at: "Split 23 into 20 and 3", big: "23 = 20 + 3, 14 = 10 + 4", caption: "Split both numbers" },
          { at: "20 times 10 is 200", big: "200 | 80 | 30 | 12", caption: "Fill each box" },
          { at: "322", big: "322", caption: "Add the four boxes" },
          { at: "Estimate to check", big: "20 × 15 = 300", caption: "322 is close to 300. It makes sense!" },
        ],
      },
    ],
  },

  "math-4.factors": {
    hook: {
      show: [
        { emoji: "🟫🟫🟫🟫🟫🟫", caption: "Pip has 24 square tiles for a patio" },
        { at: "2 rows of 12", emoji: "🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫", caption: "2 rows of 12 works too" },
        { at: "How many different rectangles", big: "?", caption: "How many rectangles can Pip make?" },
        { at: "13 tiles", big: "13", caption: "Why does 13 make only one long row?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "4 × 6 = 24", caption: "Factors multiply to make a number" },
          { at: "One row of 24", big: "1 × 24", caption: "Each rectangle shows a factor pair" },
          { at: "Three rows of 8", big: "2 × 12, 3 × 8, 4 × 6", caption: "More factor pairs of 24" },
          { at: "we already have that pair", emoji: "🔁🛑", caption: "When pairs repeat, you have them all" },
          { at: "So the factors of 24", big: "1, 2, 3, 4, 6, 8, 12, 24", caption: "The factors of 24" },
        ],
      },
      {
        show: [
          { emoji: "🦘", caption: "Skip counting gives multiples" },
          { at: "The multiples of 6", big: "6, 12, 18, 24, 30 ...", caption: "Multiples of 6 go on forever" },
          { at: "Factors and multiples are partners", emoji: "🤝", caption: "6 is a factor of 24, so 24 is a multiple of 6" },
          { at: "Is 72 a multiple of 8", big: "8 × 9 = 72", caption: "Yes! 72 is a multiple of 8" },
        ],
      },
      {
        show: [
          { big: "13 = 1 × 13", caption: "13 has just two factors" },
          { at: "is called prime", emoji: "💎", caption: "Prime: exactly two factors, 1 and itself" },
          { at: "called composite", emoji: "🧱", caption: "Composite: more than two factors, like 15 = 3 × 5" },
          { at: "The number 1 is special", big: "1", caption: "1 is neither prime nor composite" },
          { at: "2 is the only even prime", big: "2", caption: "2 is the only even prime" },
        ],
      },
      {
        show: [
          { emoji: "📜", caption: "A pattern follows a rule" },
          { at: "start at 3 and add 4", big: "3, 7, 11, 15, 19", caption: "Start at 3, add 4" },
          { at: "Every number is odd", emoji: "🔍", caption: "A hidden feature: they're all odd!" },
          { at: "Shapes can follow rules too", emoji: "🔺⬜⬜🔺⬜⬜", caption: "Shape patterns have hidden features too" },
        ],
      },
    ],
  },

  "math-4.divide": {
    hook: {
      show: [
        { emoji: "🧍🧍🧍🧍🚉", caption: "157 passengers wait at the canyon station" },
        { at: "Each train car holds 6 people", emoji: "🚃6️⃣", caption: "Each car holds 6 people" },
        { at: "26 with 1 left over", big: "26 R 1", caption: "26 full cars, 1 person left over" },
        { at: "Who is left standing", emoji: "😟🧍", caption: "Uh oh! Someone has no seat" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🍪➗", caption: "Division splits a number into equal groups" },
          { at: "852 divided by 4", big: "852 ÷ 4", caption: "Divide one place at a time" },
          { at: "800 plus 40 plus 12", big: "800 + 40 + 12", caption: "Break it into friendly parts" },
          { at: "200 plus 10 plus 3 is 213", big: "213", caption: "Add the partial quotients" },
          { at: "Check by multiplying", big: "213 × 4 = 852", caption: "Multiply to check" },
        ],
      },
      {
        show: [
          { emoji: "➗✖️➖⬇️", caption: "Divide, multiply, subtract, bring down" },
          { at: "1,476 divided by 6", big: "1,476 ÷ 6", caption: "Start with 14 hundreds" },
          { at: "Bring down the 7", big: "27", caption: "Bring down the 7 to make 27" },
          { at: "Bring down the 6", big: "36", caption: "Bring down the 6 to make 36" },
          { at: "The answer is 246", big: "246", caption: "1,476 ÷ 6 = 246" },
        ],
      },
      {
        show: [
          { emoji: "🧩", caption: "Some numbers don't split evenly" },
          { at: "6 times 26 is 156", big: "6 × 26 = 156", caption: "26 full cars hold 156 people" },
          { at: "26 R 1", big: "157 ÷ 6 = 26 R 1", caption: "R means remainder" },
          { at: "must be smaller than the divisor", emoji: "⚠️", caption: "The remainder must be smaller than the divisor" },
        ],
      },
      {
        show: [
          { emoji: "🤔", caption: "What does the remainder mean in the story?" },
          { at: "First, round up", big: "27 cars", caption: "Round up: every rider needs a seat" },
          { at: "Second, drop the remainder", emoji: "📦🍪", caption: "Drop it: only full boxes count" },
          { at: "Third, the remainder is the answer", big: "2 cookies", caption: "Sometimes the remainder is the answer" },
          { at: "read the question again", emoji: "📖👀", caption: "Always read the question again" },
        ],
      },
    ],
  },

  "math-4.fractions": {
    hook: {
      show: [
        { emoji: "🥧🥧", caption: "Two pies, exactly the same size" },
        { at: "three fourths of the first pie", big: "3/4", caption: "Pip ate three fourths" },
        { at: "six eighths of the second pie", big: "6/8", caption: "The friend ate six eighths" },
        { at: "Who is right", emoji: "🤔", caption: "Who ate more?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "3/4", caption: "4 equal slices, take 3" },
          { at: "cut every slice in half", big: "6/8", caption: "Cut every slice in half: 6 of 8 slices" },
          { at: "the same amount", emoji: "🥧 = 🥧", caption: "Same amount of pie, just smaller pieces" },
          { at: "equivalent fractions", big: "3/4 = 6/8", caption: "Equivalent fractions name the same amount" },
          { at: "Both numbers were multiplied by 2", big: "× 2/2", caption: "Top and bottom were both multiplied by 2" },
        ],
      },
      {
        show: [
          { big: "× n/n", caption: "Multiply the top and bottom by the same number" },
          { at: "Three fourths times 2 over 2", big: "3/4 = 6/8", caption: "Times 2 over 2" },
          { at: "Times 3 over 3", big: "3/4 = 9/12", caption: "Times 3 over 3" },
          { at: "cutting every piece", emoji: "🔪🥧", caption: "It's just cutting every piece smaller" },
          { at: "simplifying", big: "6/8 = 3/4", caption: "Divide both to simplify" },
        ],
      },
      {
        show: [
          { big: "2/3 ? 3/4", caption: "Which is more?" },
          { at: "Find a common denominator", emoji: "🔄", caption: "Make the pieces the same size" },
          { at: "Two thirds is eight twelfths", big: "8/12 < 9/12", caption: "Now compare: 9 twelfths is more" },
          { at: "same numerator", big: "3/5 > 3/8", caption: "Same numerator? Bigger pieces win" },
        ],
      },
      {
        show: [
          { big: "1/2", caption: "A fast trick: compare to one half" },
          { at: "Three eighths is a little less than half", big: "3/8 < 1/2", caption: "3/8 is less than half" },
          { at: "five sixths is more than half", big: "5/6 > 1/2", caption: "5/6 is more than half" },
          { at: "one whole as a benchmark", big: "7/8 ≈ 1", caption: "7/8 is just one eighth from a whole" },
          { at: "the wholes are the same size", emoji: "🥧 vs 🧁", caption: "Compare parts of the same size whole" },
        ],
      },
    ],
  },

  "math-4.addfractions": {
    hook: {
      show: [
        { emoji: "🥾🏜️🛤️", caption: "A trail crew builds a path to the cliff dwellings" },
        { at: "three eighths of a mile", big: "3/8 mi", caption: "Monday" },
        { at: "four eighths of a mile", big: "4/8 mi", caption: "Tuesday" },
        { at: "seven sixteenths", big: "7/16?", caption: "Is Pip right?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "3/8 + 4/8", caption: "Count the eighths" },
          { at: "make 7 eighths", big: "7/8", caption: "3 eighths and 4 eighths make 7 eighths" },
          { at: "the pieces didn't change size", emoji: "🍕", caption: "The pieces are still eighths" },
          { at: "Seven tenths minus four tenths", big: "7/10 − 4/10 = 3/10", caption: "Subtracting works the same way" },
          { at: "break a fraction apart", big: "5/8 = 1/8 + 4/8", caption: "Fractions can be broken apart" },
        ],
      },
      {
        show: [
          { big: "2 1/4", caption: "A mixed number: a whole and a fraction" },
          { at: "add the wholes", big: "2 1/4 + 1 2/4 = 3 3/4", caption: "Add the wholes, then the fractions" },
          { at: "three and six fourths", big: "3 6/4", caption: "The fourths made more than a whole" },
          { at: "so regroup", big: "4 2/4", caption: "4 fourths is 1 whole: regroup" },
          { at: "borrow a whole", emoji: "🔄", caption: "To subtract, borrow a whole when you need to" },
        ],
      },
      {
        show: [
          { emoji: "🥾📅", caption: "3/8 of a mile every day for 5 days" },
          { at: "repeated adding", big: "5 × 3/8", caption: "5 groups of 3 eighths" },
          { at: "15 eighths", big: "15/8", caption: "5 × 3 = 15 eighths" },
          { at: "one and seven eighths miles", big: "1 7/8", caption: "8 eighths make 1 mile, with 7 eighths left" },
        ],
      },
      {
        show: [
          { emoji: "🪶📏", caption: "Pip measured five feathers" },
          { at: "A line plot shows this data", emoji: "✖️📈", caption: "A line plot: one X for each measurement" },
          { at: "Two Xs stack", emoji: "✖️\n✖️", caption: "Two feathers were 2 1/2 inches" },
          { at: "three fourths of an inch", big: "3 − 2 1/4 = 3/4", caption: "Longest minus shortest: 3/4 inch" },
        ],
      },
    ],
  },

  "math-4.decimals": {
    hook: {
      show: [
        { emoji: "🏪🫙", caption: "A canteen at the general store" },
        { at: "2 dollars and 75 cents", big: "$2.75", caption: "The price" },
        { at: "Pip has 2 dollars, 6 dimes and 15 pennies", emoji: "💵💵 🪙×6 🟤×15", caption: "Is it enough?" },
        { at: "Coins are secretly fractions", big: "1/10 and 1/100", caption: "A dime is a tenth. A penny is a hundredth" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1/10", caption: "10 dimes make a dollar: a dime is one tenth" },
          { at: "One hundred pennies make a dollar", big: "1/100", caption: "A penny is one hundredth" },
          { at: "one tenth equals ten hundredths", big: "1/10 = 10/100", caption: "1 dime = 10 pennies" },
          { at: "Three tenths is thirty hundredths", big: "3/10 = 30/100", caption: "Multiply the top and bottom by 10" },
          { at: "seventy-five hundredths", big: "60/100 + 15/100 = 75/100", caption: "Pip has exactly $2.75!" },
        ],
      },
      {
        show: [
          { emoji: "🔴", caption: "Decimals: a shortcut for tenths and hundredths" },
          { at: "The first place after the point is tenths", big: "0.7", caption: "Seven tenths" },
          { at: "Sixty-two hundredths", big: "0.62", caption: "Sixty-two hundredths" },
          { at: "seven hundredths", big: "0.07", caption: "Seven hundredths needs a 0 in the tenths place" },
          { at: "Prices use decimals too", big: "$2.75", caption: "2 dollars and 75 hundredths of a dollar" },
        ],
      },
      {
        show: [
          { big: "0 ——— 1", caption: "Decimals live on the number line" },
          { at: "Each jump is one tenth", big: "0.1, 0.2, 0.3 ...", caption: "10 jumps of one tenth" },
          { at: "Five tenths is right in the middle", big: "0.5 = 1/2", caption: "Five tenths is one half" },
          { at: "Each tiny jump is one hundredth", big: "0.01", caption: "Each tenth splits into 10 hundredths" },
          { at: "Forty-eight hundredths", big: "0.48", caption: "Just before the middle" },
        ],
      },
      {
        show: [
          { big: "0.5 ? 0.45", caption: "Which is greater?" },
          { at: "look at the places", emoji: "👀", caption: "Look at the places, not just the digits" },
          { at: "Five tenths is the same as fifty hundredths", big: "0.5 = 0.50", caption: "Add a zero: 50 hundredths" },
          { at: "50 beats 45", big: "0.50 > 0.45", caption: "50 hundredths beats 45 hundredths" },
        ],
      },
    ],
  },

  "math-4.measure": {
    hook: {
      show: [
        { emoji: "🐎🏜️", caption: "The railroad town needs a horse corral" },
        { at: "30 meters long and 12 meters wide", big: "30 m × 12 m", caption: "A rectangle 30 m by 12 m" },
        { at: "How much fence", emoji: "🪵🪵🪵", caption: "Fence goes around the edge" },
        { at: "how much ground", emoji: "🌾", caption: "Ground to graze is the space inside" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📏⚖️🧪⏱️", caption: "Every measurement has a number and a unit" },
          { at: "One kilometer is 1,000 meters", big: "1 km = 1,000 m", caption: "1 meter = 100 centimeters" },
          { at: "One kilogram is 1,000 grams", big: "1 kg = 1,000 g", caption: "1 liter = 1,000 milliliters" },
          { at: "One pound is 16 ounces", big: "1 lb = 16 oz", caption: "1 hour = 60 minutes, 1 minute = 60 seconds" },
          { at: "multiply", big: "3 km = 3,000 m", caption: "Big unit to small unit: multiply" },
        ],
      },
      {
        show: [
          { emoji: "🚂🕘", caption: "A train leaves at 9:45" },
          { at: "arrives at 11:20", emoji: "🚉🕚", caption: "It arrives at 11:20" },
          { at: "jump 15 minutes to 10:00", big: "15 min + 1 hr + 20 min", caption: "Make friendly jumps on a number line" },
          { at: "That is 95 minutes", big: "1 hr 35 min = 95 min", caption: "Add the jumps" },
          { at: "A canteen holds 2 liters", big: "2,000 mL − 750 mL = 1,250 mL", caption: "Change to the same unit first" },
        ],
      },
      {
        show: [
          { emoji: "🚶‍♂️🔁", caption: "Perimeter is the distance around" },
          { at: "Two long sides", big: "30 + 30 = 60", caption: "The two long sides" },
          { at: "Two short sides", big: "12 + 12 = 24", caption: "The two short sides" },
          { at: "84 meters of fence", big: "84 m", caption: "The corral needs 84 meters of fence" },
          { at: "The formula is", big: "P = 2 × l + 2 × w", caption: "The perimeter formula" },
        ],
      },
      {
        show: [
          { emoji: "🟩🟩🟩\n🟩🟩🟩", caption: "Area is the flat space inside" },
          { at: "grass squares", emoji: "🌱⬛", caption: "Squares 1 meter on a side" },
          { at: "360 square meters", big: "30 × 12 = 360", caption: "360 square meters of grass" },
          { at: "The formula is", big: "A = l × w", caption: "The area formula" },
          { at: "48 divided by 8 is 6 feet", big: "48 ÷ 8 = 6", caption: "Work backward to find a missing side" },
        ],
      },
    ],
  },

  "math-4.angles": {
    hook: {
      show: [
        { emoji: "🛤️", caption: "A railroad track is full of geometry" },
        { at: "never touch", big: "═══", caption: "The rails never touch" },
        { at: "perfect square corners", big: "┼", caption: "The ties cross in square corners" },
        { at: "measure the angles", emoji: "📐", caption: "Today: names of lines and measuring angles" },
      ],
    },
    teach: [
      {
        show: [
          { big: "•", caption: "A point is an exact spot" },
          { at: "A line goes on forever", big: "⟷", caption: "A line goes on forever both ways" },
          { at: "A ray has one endpoint", emoji: "🔦", caption: "A ray goes on forever one way" },
          { at: "they make an angle", big: "∠", caption: "Two rays with one endpoint make an angle" },
          { at: "Lines that never cross are parallel", emoji: "🛤️", caption: "Parallel lines never cross; perpendicular lines make square corners" },
        ],
      },
      {
        show: [
          { emoji: "↪️", caption: "Angles measure how far a ray turns" },
          { at: "360 degrees", big: "360°", caption: "A full turn is 360 degrees" },
          { at: "A quarter turn is 90 degrees", big: "90°", caption: "A right angle, like the corner of a book" },
          { at: "Smaller than a right angle is acute", big: "acute < 90° < obtuse", caption: "Acute and obtuse angles" },
          { at: "put the protractor's center on the vertex", emoji: "📐", caption: "Center on the vertex, zero on one ray, read the other" },
        ],
      },
      {
        show: [
          { emoji: "➕📐", caption: "Angle measures add up" },
          { at: "A right angle is 90 degrees", big: "90°", caption: "A right angle split in two" },
          { at: "90 minus 35", big: "90 − 35 = 55", caption: "The missing part is 55 degrees" },
          { at: "add up to 180 degrees", big: "130 + 50 = 180", caption: "Angles along a straight line add to 180" },
          { at: "Write an equation", big: "35 + a = 90", caption: "Use a letter for the missing angle" },
        ],
      },
      {
        show: [
          { emoji: "🟥▬🔺", caption: "Sort shapes by their lines and angles" },
          { at: "four right angles", big: "▭", caption: "A rectangle: 2 pairs of parallel sides, 4 right angles" },
          { at: "A right triangle", big: "◺", caption: "A right triangle has one right angle" },
          { at: "A line of symmetry", emoji: "🦋", caption: "A line of symmetry folds a shape into matching halves" },
          { at: "The letter Z has none", big: "Z", caption: "Z has no line of symmetry" },
        ],
      },
    ],
  },
};
