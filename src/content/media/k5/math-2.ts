import type { CourseMedia } from "../types";

/** Slides for math-2, by lesson id. */
export const math2Media: CourseMedia = {
  "math-2.facts-20": {
    hook: {
      show: [
        { emoji: "🏞️", caption: "Riverbend Valley: the river has stopped" },
        { at: "The old mill wheel", emoji: "⚙️💤", caption: "The old mill wheel is still" },
        { at: "quick math", emoji: "⚡🧮", caption: "Quick math can help the miller" },
      ],
    },
    teach: [
      {
        show: [
          { big: "10", caption: "Ten is a magic number" },
          { at: "Look at 8 + 5", big: "8 + 5", caption: "Let's add 8 + 5" },
          { at: "It needs 2 more", emoji: "🟦🟦🟦🟦🟦🟦🟦🟦➕🟨🟨", caption: "8 needs 2 more to make 10" },
          { at: "Now we have 10 + 3", big: "10 + 3 = 13", caption: "10 and 3 more is 13" },
          { at: "Try 9 + 4", big: "9 + 4 = 13", caption: "9 needs 1. Then 10 + 3 = 13 again" },
        ],
      },
      {
        show: [
          { emoji: "👯", caption: "Doubles are two of the same" },
          { at: "6 + 6 = 12", big: "6 + 6 = 12", caption: "Double 6 is 12" },
          { at: "7 + 8 is one more", big: "7 + 8 = 15", caption: "7 + 7 = 14, so 7 + 8 is one more: 15" },
          { at: "Adding and taking away", emoji: "➕🤝➖", caption: "Adding and taking away are a team" },
          { at: "fact family", big: "9 + 6 = 15 · 15 - 6 = 9", caption: "A fact family uses the same three numbers" },
        ],
      },
      {
        show: [
          { emoji: "📖🔢", caption: "Math hides in stories" },
          { at: "14 sacks of wheat", emoji: "🌾🌾🌾", caption: "The miller has 14 sacks of wheat" },
          { at: "write a number sentence", big: "14 - 6 = ☐", caption: "The box is the number we need" },
          { at: "Eight sacks are left", big: "8", caption: "Eight sacks are left!" },
          { at: "Some stories put together", emoji: "➕ ➖", caption: "Put together, or take apart?" },
        ],
      },
    ],
  },

  "math-2.place-value": {
    hook: {
      show: [
        { emoji: "🏪🫘", caption: "Beans for sale at the Riverbend market" },
        { at: "Ten loose beans", emoji: "🫘➡️👜", caption: "Ten loose beans fill a bag" },
        { at: "Ten bags fill a box", emoji: "👜➡️📦", caption: "Ten bags fill a box!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🫘", caption: "Let's count beans!" },
          { at: "That bag is one ten", emoji: "👜", caption: "A bag of 10 beans is one ten" },
          { at: "Ten bags of ten", big: "100", caption: "Ten bags of ten is one hundred" },
          { at: "Big numbers are just bundles", emoji: "📦👜🫘", caption: "Bundles of bundles!" },
        ],
      },
      {
        show: [
          { big: "352", caption: "Each digit has a job" },
          { at: "The 3 is in the hundreds place", big: "3 → 300", caption: "The 3 means 3 hundreds" },
          { at: "The 5 is in the tens place", big: "5 → 50", caption: "The 5 means 5 tens" },
          { at: "The 2 is in the ones place", big: "2 → 2", caption: "The 2 means 2 ones" },
          { at: "Same digit, new place", big: "352 · 125", caption: "Same digit, new place, new value" },
        ],
      },
      {
        show: [
          { emoji: "✍️", caption: "One number, three ways to write it" },
          { at: "with digits", big: "352", caption: "With digits" },
          { at: "in expanded form", big: "300 + 50 + 2", caption: "Expanded form shows what each digit is worth" },
          { at: "in words", big: "three hundred fifty-two", caption: "In words" },
          { at: "Watch out for zero", big: "405 = 400 + 5", caption: "Zero holds the tens place" },
        ],
      },
    ],
  },

  "math-2.skip-odd-even": {
    hook: {
      show: [
        { emoji: "🐸🪨🪨🪨", caption: "Frogs hop across the river stones" },
        { at: "Counting by ones is slow", emoji: "🐢", caption: "Counting by ones is slow" },
        { at: "skip count like the frogs", emoji: "🐸💨", caption: "Let's skip count!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🦘", caption: "Skip counting: same-size jumps" },
          { at: "Count nickels by 5s", big: "5, 10, 15, 20", caption: "Counting by 5s" },
          { at: "Count dimes by 10s", big: "10, 20, 30, 40", caption: "Counting by 10s" },
          { at: "Count boxes of 100", big: "100, 200, 300, 400", caption: "Counting by 100s" },
          { at: "Start at 230", big: "230, 240, 250, 260", caption: "Only the tens digit changes" },
        ],
      },
      {
        show: [
          { emoji: "🧦🧦", caption: "Let's pair up socks!" },
          { at: "the number is even", emoji: "🧦🧦 🧦🧦 🧦🧦", caption: "Every sock has a buddy: even" },
          { at: "the number is odd", emoji: "🧦🧦 🧦🧦 🧦", caption: "One sock left alone: odd" },
          { at: "Look at the last digit", big: "0 2 4 6 8", caption: "Even numbers end in 0, 2, 4, 6 or 8" },
        ],
      },
      {
        show: [
          { emoji: "🍪🍪 | 🍪🍪", caption: "Even numbers split into two equal groups" },
          { at: "10 is 5 + 5", big: "10 = 5 + 5", caption: "10 is a double" },
          { at: "Now try an odd number", big: "9 = 4 + 4 + 1", caption: "Odd: one is left over" },
          { at: "So even numbers are doubles", emoji: "✅👯", caption: "Even numbers are doubles. Odd numbers are not." },
        ],
      },
    ],
  },

  "math-2.compare": {
    hook: {
      show: [
        { emoji: "🚣🍎 🚣🍎", caption: "Two apple boats race down the river" },
        { at: "452 apples", big: "452", caption: "One boat carries 452 apples" },
        { at: "The other carries 425", big: "425", caption: "The other carries 425" },
        { at: "Which boat has more", big: "452 ? 425", caption: "Which boat has more?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔍", caption: "Start at the biggest place" },
          { at: "Try 512 and 498", big: "512 ? 498", caption: "Compare 512 and 498" },
          { at: "5 hundreds beats 4 hundreds", big: "512 > 498", caption: "5 hundreds beats 4 hundreds" },
          { at: "If the hundreds tie", emoji: "📦➡️👜➡️🫘", caption: "Hundreds, then tens, then ones" },
        ],
      },
      {
        show: [
          { big: "> < =", caption: "Three signs for comparing" },
          { at: "Think of a hungry alligator", emoji: "🐊", caption: "The hungry alligator eats the bigger number" },
          { at: "So 452 is greater than 425", big: "452 > 425", caption: "452 is greater than 425" },
          { at: "And 425 is less than 452", big: "425 < 452", caption: "425 is less than 452" },
        ],
      },
      {
        show: [
          { emoji: "🧠", caption: "Adding 10 in your head" },
          { at: "364 and 10 more", big: "364 → 374", caption: "10 more: the tens digit goes up by one" },
          { at: "364 and 100 more", big: "364 → 464", caption: "100 more: the hundreds digit goes up by one" },
          { at: "Taking away works the same way", big: "354 ← 364 → 264", caption: "10 less and 100 less work the same way" },
        ],
      },
    ],
  },

  "math-2.within-100": {
    hook: {
      show: [
        { emoji: "🧺🍞", caption: "It's market day!" },
        { at: "36 loaves", big: "36", caption: "36 loaves in the morning" },
        { at: "47 more", big: "+ 47", caption: "47 more in the afternoon" },
        { at: "smart tools", emoji: "🧰", caption: "Big numbers need smart tools" },
      ],
    },
    teach: [
      {
        show: [
          { big: "36 + 47", caption: "Let's add 36 + 47" },
          { at: "Add the tens first", big: "30 + 40 = 70", caption: "Tens first" },
          { at: "Then add the ones", big: "6 + 7 = 13", caption: "Then the ones" },
          { at: "Now put them together", big: "70 + 13 = 83", caption: "Put them together" },
          { at: "That's a new ten", emoji: "🫘×10 ➡️ 👜", caption: "13 ones is a new ten and 3 more" },
        ],
      },
      {
        show: [
          { emoji: "📏", caption: "A number line helps us subtract" },
          { at: "Start at 38", big: "38", caption: "Start at 38" },
          { at: "Jump 2 to land on 40", emoji: "🐸↪️", caption: "Jump 2, then 20, then 2" },
          { at: "Now add the jumps", big: "2 + 20 + 2 = 24", caption: "Add the jumps: 24" },
          { at: "Check it", big: "38 + 24 = 62 ✅", caption: "Adding checks subtracting" },
        ],
      },
      {
        show: [
          { big: "15 + 20 + 25 + 10", caption: "Adding four numbers" },
          { at: "Look for friends", big: "15 + 25 = 40", caption: "Friends that make tens" },
          { at: "Some stories have two steps", emoji: "🧺🍎", caption: "A story with two steps" },
          { at: "Step one", big: "50 - 12 = 38", caption: "Step one: take away" },
          { at: "Step two", big: "38 + 20 = 58", caption: "Step two: add" },
        ],
      },
    ],
  },

  "math-2.within-1000": {
    hook: {
      show: [
        { emoji: "🏭🌾", caption: "The mill grinds flour" },
        { at: "245 bags", big: "245", caption: "245 bags on Monday" },
        { at: "132 more", big: "+ 132", caption: "132 more on Tuesday" },
      ],
    },
    teach: [
      {
        show: [
          { big: "245 + 132", caption: "Let's add 245 + 132" },
          { at: "Line up the places", emoji: "📦👜🫘", caption: "Hundreds, tens and ones line up" },
          { at: "Hundreds: 200 + 100", big: "300 + 70 + 7", caption: "Add each place" },
          { at: "That's 377 bags", big: "377", caption: "377 bags of flour!" },
        ],
      },
      {
        show: [
          { big: "158 + 167", caption: "Sometimes a place gets too full" },
          { at: "Ones: 8 + 7 = 15", big: "15 ones", caption: "15 ones is a new ten and 5 ones" },
          { at: "Twelve tens is one hundred", big: "12 tens", caption: "12 tens is a new hundred and 2 tens" },
          { at: "The answer is 325", big: "325", caption: "158 + 167 = 325" },
        ],
      },
      {
        show: [
          { big: "342 - 118", caption: "Let's subtract" },
          { at: "Not enough", emoji: "🫘🫘 ➖ 8 ❓", caption: "2 ones is not enough to take away 8" },
          { at: "break apart one ten", emoji: "👜➡️🫘×10", caption: "Break a ten into 10 ones" },
          { at: "The answer is 224", big: "224", caption: "342 - 118 = 224" },
          { at: "Check it", big: "224 + 118 = 342 ✅", caption: "Check with addition" },
        ],
      },
    ],
  },

  "math-2.measure": {
    hook: {
      show: [
        { emoji: "⚙️💧", caption: "The mill's water wheel is broken" },
        { at: "a new board", emoji: "🪵", caption: "The miller needs a new board" },
        { at: "Let's measure", emoji: "📏", caption: "Let's measure!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧰", caption: "Pick the right tool" },
          { at: "A ruler is 12 inches", big: "12 inches = 1 foot", caption: "A ruler is one foot long" },
          { at: "A yardstick", big: "1 yard = 3 feet", caption: "A yardstick is 3 feet" },
          { at: "A meter stick", big: "1 meter = 100 cm", caption: "A meter stick is 100 centimeters" },
          { at: "Start at zero", big: "0", caption: "Line up the end with 0" },
        ],
      },
      {
        show: [
          { emoji: "🤔", caption: "An estimate is a smart guess" },
          { at: "A paper clip", emoji: "📎", caption: "A paper clip is about 1 inch" },
          { at: "A book is 10 inches", big: "10 in ≈ 25 cm", caption: "Same book: about 10 inches or 25 centimeters" },
          { at: "We can compare lengths", big: "9 - 5 = 4", caption: "The 9 inch stick is 4 inches longer" },
        ],
      },
      {
        show: [
          { emoji: "📊", caption: "Graphs help us see numbers" },
          { at: "A line plot shows lengths", emoji: "❌❌❌", caption: "A line plot: an X for each length" },
          { at: "A bar graph shows groups", emoji: "🍎🍌🍐", caption: "A bar graph of favorite fruits" },
          { at: "Apples have 4 more votes", big: "6 - 2 = 4", caption: "Apples have 4 more votes than pears" },
        ],
      },
    ],
  },

  "math-2.time-money": {
    hook: {
      show: [
        { emoji: "🏪🌅", caption: "The market opens at 8 o'clock in the morning" },
        { at: "coins and dollar bills", emoji: "🪙💵", caption: "Shoppers bring coins and dollar bills" },
        { at: "read the clock", emoji: "🕗🪙", caption: "Read the clock and count your money" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🕒", caption: "A clock has two hands" },
          { at: "The short hand tells the hour", emoji: "⏰", caption: "Short hand: the hour. Long hand: the minutes" },
          { at: "So we count by 5s", big: "5, 10, 15, 20 ...", caption: "Count by 5s around the clock" },
          { at: "or half past", emoji: "🕞", caption: "Long hand on 6: half past" },
          { at: "it's 3:20", big: "3:20", caption: "Short hand past 3, long hand on 4" },
        ],
      },
      {
        show: [
          { emoji: "🔄", caption: "The short hand goes around twice a day" },
          { at: "AM is from midnight to noon", emoji: "🌅", caption: "AM: the morning" },
          { at: "PM is from noon to midnight", emoji: "🌙", caption: "PM: the afternoon and evening" },
          { at: "Noon is 12 PM", big: "12:00 PM", caption: "Noon: time for lunch!" },
        ],
      },
      {
        show: [
          { emoji: "🪙", caption: "Let's count money!" },
          { at: "A penny is 1 cent", big: "1¢ · 5¢ · 10¢ · 25¢", caption: "Penny, nickel, dime and quarter" },
          { at: "A dollar bill", emoji: "💵", caption: "A dollar is 100 cents" },
          { at: "Count the biggest coins first", big: "25, 50, 60", caption: "Two quarters and a dime" },
          { at: "with a cent sign", big: "60¢", caption: "We write 60 cents as 60¢" },
        ],
      },
    ],
  },

  "math-2.shapes": {
    hook: {
      show: [
        { emoji: "🌉", caption: "The Riverbend bridge needs new stones and tiles" },
        { at: "Builders use triangles", emoji: "🔺🟥⬡", caption: "Triangles, squares and hexagons" },
        { at: "like a builder", emoji: "👷📐", caption: "Let's look at shapes like a builder!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📐", caption: "Count the sides and angles" },
          { at: "A triangle has 3 sides", emoji: "🔺", caption: "A triangle: 3 sides, 3 angles" },
          { at: "A quadrilateral has 4 sides", emoji: "🟥🟦", caption: "Squares and rectangles are quadrilaterals" },
          { at: "A hexagon has 6 sides", emoji: "🐝⬡", caption: "A hexagon has 6 sides, like a honeycomb cell" },
          { at: "A cube has 6 square faces", emoji: "🎲", caption: "A cube has 6 square faces" },
        ],
      },
      {
        show: [
          { emoji: "🍎🍎🍎🍎", caption: "An array has rows and columns" },
          { at: "3 rows of 4 apples", big: "4 + 4 + 4 = 12", caption: "3 rows of 4 apples is 12" },
          { at: "same-size squares", emoji: "🟦🟦🟦🟦🟦", caption: "A rectangle in rows of same-size squares" },
          { at: "5 + 5 = 10 squares", big: "5 + 5 = 10", caption: "2 rows of 5 is 10 squares" },
        ],
      },
      {
        show: [
          { emoji: "🥧", caption: "Sharing a pie fairly" },
          { at: "Each is a half", big: "½", caption: "2 equal shares: halves" },
          { at: "Each is a third", big: "⅓", caption: "3 equal shares: thirds" },
          { at: "Each is a fourth", big: "¼", caption: "4 equal shares: fourths" },
          { at: "Different shapes, same size", emoji: "🥪✂️", caption: "Halves can be rectangles or triangles" },
        ],
      },
    ],
  },
};
