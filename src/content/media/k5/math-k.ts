import type { CourseMedia } from "../types";

/** Slides for math-k, by lesson id. Emoji and big numbers only (no photos, no videos). */
export const mathKMedia: CourseMedia = {
  "math-k.how-many": {
    hook: {
      show: [
        { emoji: "✨🪺", caption: "Pip the firefly found a nest in Sunny Meadow" },
        { at: "There are eggs inside", emoji: "🥚🥚🥚", caption: "There are eggs inside!" },
        { at: "How many eggs", big: "?", caption: "How many eggs are there?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👉🍎", caption: "Touch each thing one time" },
          { at: "Look at these apples", emoji: "🍎🍎🍎🍎", caption: "Let's count these apples" },
          { at: "Touch the first apple", big: "1, 2, 3, 4", caption: "One number for each apple" },
          { at: "Do not skip", emoji: "🚫⏭️", caption: "Don't skip one. Don't count one twice." },
          { at: "Four is one more", big: "3 → 4", caption: "Four is one more than three" },
        ],
      },
      {
        show: [
          { emoji: "🐥🐥🐥🐥🐥", caption: "Count the chicks: 1, 2, 3, 4, 5" },
          { at: "The last number you say", big: "5", caption: "The last number tells how many: 5 chicks!" },
          { at: "chicks run around", emoji: "🐥💨🐥", caption: "Moving around does not change how many" },
          { at: "The numeral 5", big: "5", caption: "The numeral 5 means five things" },
          { at: "The numeral 0", big: "0", caption: "The numeral 0 means none at all" },
        ],
      },
      {
        show: [
          { emoji: "🍎🍌🍎🍌🍎", caption: "A mix of apples and bananas" },
          { at: "Put the apples in one group", emoji: "🍎🍎🍎 | 🍌🍌", caption: "Sort them into two groups" },
          { at: "There are 3 apples", big: "3 and 2", caption: "3 apples and 2 bananas" },
          { at: "So there are more apples", emoji: "🍎🏆", caption: "Three is more than two. More apples!" },
        ],
      },
    ],
  },

  "math-k.compare": {
    hook: {
      show: [
        { emoji: "🐰🥕", caption: "Two bunnies found carrots in the garden" },
        { at: "One bunny has 3", big: "3", caption: "One bunny has 3 carrots" },
        { at: "The other bunny has 5", big: "5", caption: "The other bunny has 5 carrots" },
        { at: "Who has more", big: "?", caption: "Who has more?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐰🐰🐰 🥕🥕🥕🥕🥕", caption: "3 bunnies and 5 carrots" },
          { at: "Line them up", emoji: "🐰🥕 🐰🥕 🐰🥕", caption: "Line them up, one next to one" },
          { at: "Two carrots are left over", emoji: "🥕🥕", caption: "Two carrots are left over. More carrots!" },
          { at: "the groups are the same", emoji: "🟰", caption: "Nothing left over? The groups are the same." },
        ],
      },
      {
        show: [
          { big: "1 2 3 4 5 6 7 8 9 10", caption: "Think about counting" },
          { at: "Numbers that come later", emoji: "➡️📈", caption: "Numbers that come later are bigger" },
          { at: "So 7 is more than 4", big: "7 > 4", caption: "7 is more than 4" },
          { at: "Look at a number line", emoji: "📏", caption: "Bigger numbers sit farther along the line" },
        ],
      },
      {
        show: [
          { emoji: "✏️🖍️", caption: "A pencil and a crayon" },
          { at: "So the pencil is longer", emoji: "✏️📏", caption: "Line up the ends. The pencil is longer." },
          { at: "A giraffe is taller", emoji: "🦒🐷", caption: "A giraffe is taller than a pig" },
          { at: "Hold a rock and a feather", emoji: "🪨🪶", caption: "The rock is heavier. The feather is lighter." },
        ],
      },
    ],
  },

  "math-k.shapes": {
    hook: {
      show: [
        { emoji: "✨🌞", caption: "Pip is flying over Sunny Meadow" },
        { at: "The sun looks like a circle", emoji: "☀️⚪", caption: "The sun looks like a circle" },
        { at: "The barn door", emoji: "🚪", caption: "The barn door looks like a rectangle" },
        { at: "What shapes can you find", emoji: "🔺🟦⚪", caption: "What shapes can you find?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⚪🍪", caption: "A circle is round, like a cookie" },
          { at: "A square has 4 sides", emoji: "🟦", caption: "A square: 4 sides, all the same" },
          { at: "A rectangle has 4 sides", emoji: "🚪", caption: "A rectangle: 2 long sides and 2 short sides" },
          { at: "A triangle has 3 sides", emoji: "🔺", caption: "A triangle: 3 sides" },
          { at: "A hexagon has 6 sides", emoji: "🐝⬡", caption: "A hexagon: 6 sides, like a honeycomb cell" },
          { at: "The sun is above the barn", emoji: "☀️ 🏠", caption: "Above, beside, behind: words for where things are" },
        ],
      },
      {
        show: [
          { emoji: "📄✏️", caption: "Flat shapes can be drawn on paper" },
          { at: "Some shapes are solid", emoji: "🤲📦", caption: "Solid shapes can be held in your hand" },
          { at: "A ball is a sphere", emoji: "⚽", caption: "A ball is a sphere" },
          { at: "A block is a cube", emoji: "🎲", caption: "A block is a cube" },
          { at: "A can of soup", emoji: "🥫🍦", caption: "A can is a cylinder. An ice cream cone is a cone." },
        ],
      },
      {
        show: [
          { emoji: "🔺", caption: "A triangle has 3 sides and 3 corners" },
          { at: "A square has 4 sides", emoji: "🟦", caption: "A square has 4 sides and 4 corners" },
          { at: "Put two squares side by side", emoji: "🟦🟦", caption: "Two squares side by side make a rectangle" },
          { at: "Cut a square sandwich", emoji: "🥪✂️", caption: "Cut a square from corner to corner: two triangles!" },
          { at: "build shapes with sticks", emoji: "🥢🧱", caption: "Build shapes with sticks or clay" },
        ],
      },
    ],
  },

  "math-k.add": {
    hook: {
      show: [
        { emoji: "🦆🦆🦆", caption: "Three ducks swim in the pond" },
        { at: "Two more ducks fly in", emoji: "🦆🦆", caption: "Two more ducks fly in!" },
        { at: "How many ducks", big: "?", caption: "How many ducks are there now?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🍎🍎", caption: "Here are 2 red apples" },
          { at: "Here is 1 more apple", emoji: "🍎🍎 + 🍎", caption: "Here is 1 more apple" },
          { at: "There are 3 apples in all", big: "3", caption: "3 apples in all" },
          { at: "Hold up 2 fingers", emoji: "✌️☝️", caption: "2 fingers and 1 more finger make 3" },
        ],
      },
      {
        show: [
          { big: "3 + 2 = 5", caption: "A number sentence" },
          { at: "This sign is plus", big: "+", caption: "Plus means put together" },
          { at: "This sign is equals", big: "=", caption: "Equals means is the same as" },
          { at: "Three plus two equals five", emoji: "🦆🦆🦆 + 🦆🦆", caption: "Three plus two equals five" },
          { at: "Draw dots to check", big: "●●● ●●", caption: "Three dots and two dots make five dots" },
        ],
      },
      {
        show: [
          { emoji: "🐝🐝🐝🐝🌼", caption: "Four bees buzz by the flowers" },
          { at: "One more bee comes", emoji: "🐝", caption: "One more bee comes" },
          { at: "show the 4 bees with fingers", emoji: "🖐️", caption: "Show 4 fingers, then 1 more" },
          { at: "There are 5 bees", big: "4 + 1 = 5", caption: "There are 5 bees!" },
        ],
      },
    ],
  },

  "math-k.subtract": {
    hook: {
      show: [
        { emoji: "🌳🍎🍎🍎🍎🍎", caption: "Five apples hang on the tree" },
        { at: "Two fall down", emoji: "🍎🍎⬇️🐴", caption: "Two fall down for the horse!" },
        { at: "How many are left", big: "?", caption: "How many are left on the tree?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧁🧁🧁🧁", caption: "Here are 4 cupcakes" },
          { at: "Take 2 away", emoji: "🧁🧁 ➖ 🧁🧁", caption: "Two friends each eat one" },
          { at: "There are 2 left", big: "2", caption: "There are 2 left" },
          { at: "Hold up 4 fingers", emoji: "🖐️⬇️", caption: "Hold up 4 fingers and fold down 2" },
        ],
      },
      {
        show: [
          { big: "5 − 2 = 3", caption: "A take-away number sentence" },
          { at: "This sign is minus", big: "−", caption: "Minus means take away" },
          { at: "Five minus two equals three", emoji: "🍎🍎🍎🍎🍎", caption: "Five minus two equals three" },
          { at: "Draw 5 dots", big: "●●●  ⨯⨯", caption: "Draw 5 dots and cross out 2. Three are left!" },
        ],
      },
      {
        show: [
          { emoji: "🐑🐑🐑🐑🐑🐑🐑", caption: "Seven sheep eat grass" },
          { at: "Three sheep walk to the barn", emoji: "🐑🐑🐑➡️🏠", caption: "Three sheep walk to the barn" },
          { at: "There are 4", big: "7 − 3 = 4", caption: "Four sheep are still eating" },
          { at: "If all 7 walk away", big: "0", caption: "If all of them walk away, 0 are left" },
        ],
      },
    ],
  },

  "math-k.make-ten": {
    hook: {
      show: [
        { emoji: "✨✨✨✨✨", caption: "Pip has 5 glowing friends" },
        { at: "Some fly on one side", emoji: "✨✨✨ 💧 ✨✨", caption: "Some fly on each side of the pond" },
        { at: "There are lots of ways", big: "5 = ? + ?", caption: "How can 5 friends split up?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌼🌼🌼🌼🌼", caption: "Look at 5 flowers" },
          { at: "Put 4 in one vase", emoji: "🌼🌼🌼🌼 | 🌼", caption: "4 and 1 make 5" },
          { at: "Now try 3 and 2", emoji: "🌼🌼🌼 | 🌼🌼", caption: "3 and 2 make 5, too!" },
          { at: "We can write 5 = 3 + 2", big: "5 = 3 + 2", caption: "Five is the same as three plus two" },
        ],
      },
      {
        show: [
          { big: "🔲🔲🔲🔲🔲", caption: "A ten frame: 10 boxes in two rows of five" },
          { at: "Look at 7 in a ten frame", emoji: "🔴🔴🔴🔴🔴 🔴🔴⚪⚪⚪", caption: "7 in a ten frame" },
          { at: "How many boxes are empty", big: "3", caption: "3 boxes are empty" },
          { at: "So 7 and 3 make 10", big: "7 + 3 = 10", caption: "7 and 3 make 10" },
        ],
      },
      {
        show: [
          { emoji: "🖐️🖐️", caption: "Your hands are a ten frame!" },
          { at: "Now fold down 3", big: "7 and 3", caption: "Fold down 3. Seven are still up." },
          { at: "Try folding down 4", big: "6 and 4", caption: "Fold down 4. Six are still up." },
          { at: "Say them with me", big: "9+1 8+2 7+3 6+4 5+5", caption: "The ten partners" },
        ],
      },
    ],
  },

  "math-k.teens": {
    hook: {
      show: [
        { emoji: "✨🌰🌰🌰", caption: "Pip found a big pile of acorns" },
        { at: "too many to count fast", emoji: "🌰🌰🌰🌰🌰🌰🌰", caption: "Too many to count fast!" },
        { at: "Make a group of ten", big: "10", caption: "Pip's trick: make a group of ten first" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌰🌰🌰🌰🌰", caption: "Lots of acorns to count" },
          { at: "make a group of ten", big: "10", caption: "First, make a group of ten" },
          { at: "count the extra acorns", emoji: "🔟 + 🌰🌰🌰🌰", caption: "Ten, and 4 extra acorns" },
          { at: "That is 14", big: "14", caption: "Ten and 4 more is 14!" },
        ],
      },
      {
        show: [
          { big: "13", caption: "The number 13 has two digits" },
          { at: "The 1 tells us", emoji: "🔟", caption: "The 1 means one group of ten" },
          { at: "The 3 tells us", big: "10 + 3", caption: "The 3 means 3 more ones" },
          { at: "Look at 17", big: "17 = 10 + 7", caption: "17 is ten and 7" },
          { at: "20 is two full tens", emoji: "🔟🔟", caption: "20 is two full tens" },
        ],
      },
      {
        show: [
          { emoji: "✏️", caption: "Let's write numbers!" },
          { at: "Write 0 like a round egg", big: "0", caption: "Write 0 like a round egg. It means none." },
          { at: "For 14", big: "1 → 14", caption: "Write the 1 first, then the 4" },
          { at: "For 20", big: "20", caption: "For 20, write 2, then 0" },
        ],
      },
    ],
  },

  "math-k.count-100": {
    hook: {
      show: [
        { emoji: "✨⭐🌙", caption: "Pip wants to count the stars in the sky" },
        { at: "That is a lot of stars", emoji: "⭐⭐⭐⭐⭐⭐⭐", caption: "That is a lot of stars!" },
        { at: "all the way to 100", big: "100", caption: "Can we count all the way to 100?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1 2 3 4 5", caption: "Count by ones. Each number is one more." },
          { at: "Then comes 20", big: "19 → 20", caption: "After 19 comes 20" },
          { at: "a new ten starts", big: "29 → 30", caption: "After a 9, a new ten starts" },
          { at: "After 99 comes 100", big: "99 → 100", caption: "After 99 comes 100!" },
        ],
      },
      {
        show: [
          { emoji: "🦘", caption: "Let's count by tens: big jumps!" },
          { at: "10, 20, 30, 40, 50", big: "10 20 30 40 50", caption: "Each jump is ten more" },
          { at: "60, 70, 80, 90, 100", big: "60 70 80 90 100", caption: "All the way to 100" },
          { at: "ten bundles of ten sticks", emoji: "🔟🔟🔟🔟🔟🔟🔟🔟🔟🔟", caption: "Ten bundles of ten make 100" },
        ],
      },
      {
        show: [
          { emoji: "🚂", caption: "Start at any number and count on" },
          { at: "Start at 6", big: "6 → 7, 8, 9", caption: "Start at 6. Count on: 7, 8, 9." },
          { at: "Start at 23", big: "23 → 24, 25, 26", caption: "Start at 23. Count on: 24, 25, 26." },
          { at: "Six eggs are in the bowl", emoji: "🥣🥚", caption: "Six eggs, then 3 more: say six, then 7, 8, 9!" },
        ],
      },
    ],
  },
};
