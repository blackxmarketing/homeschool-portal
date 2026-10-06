import type { CourseMedia } from "../types";

/** Slides for math-1, by lesson id. */
export const math1Media: CourseMedia = {
  "math-1.add20": {
    hook: {
      show: [
        { caption: "Pip found 8 acorns", emoji: "🌰🌰🌰🌰🌰🌰🌰🌰" },
        { at: "Then 3 more fell", caption: "3 more fell down!", emoji: "🌳🌰🌰🌰" },
        { at: "How many acorns", caption: "How many in all?", big: "8 + 3 = ?" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Let's add 8 + 3", big: "8 + 3" },
          { at: "Start at the bigger number", caption: "Start at the bigger number: 8", big: "8" },
          { at: "Nine, ten, eleven", caption: "Count on: 9, 10, 11", big: "9, 10, 11" },
          { at: "So 8 plus 3 equals 11", caption: "8 + 3 = 11", big: "8 + 3 = 11" },
        ],
      },
      {
        show: [
          { caption: "Ten is a magic number", emoji: "🔟✨" },
          { at: "Look at 9 plus 5", caption: "Let's add 9 + 5", big: "9 + 5" },
          { at: "Take 1 from the 5", caption: "Move 1 over to make 10", big: "10 + 4" },
          { at: "So 9 plus 5 is 14", caption: "9 + 5 = 14", big: "9 + 5 = 14" },
        ],
      },
      {
        show: [
          { caption: "Doubles: two of the same", emoji: "🖐️🖐️" },
          { at: "near doubles", caption: "6 + 7 is 6 + 6 and one more", big: "6 + 7 = 13" },
          { at: "add in any order", caption: "Turn-around facts", big: "3 + 5 = 5 + 3" },
        ],
      },
    ],
  },

  "math-1.subtract20": {
    hook: {
      show: [
        { caption: "12 songbirds in the pine", emoji: "🌲🐦🐦🐦" },
        { at: "the fog rolled in", caption: "The fog rolls in", emoji: "🌫️" },
        { at: "Three birds flew away", caption: "3 birds fly away", emoji: "🐦🐦🐦💨" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Let's find 12 - 3", big: "12 - 3" },
          { at: "count back 3 times", caption: "Count back: 11, 10, 9", big: "11, 10, 9" },
          { at: "So 12 minus 3 equals 9", caption: "12 - 3 = 9", big: "12 - 3 = 9" },
          { at: "Hop back on the number line", caption: "Hop back one at a time", emoji: "🐸⬅️" },
        ],
      },
      {
        show: [
          { caption: "Every take away hides an add", emoji: "🤫" },
          { at: "8 plus what makes 13", caption: "8 + ? = 13", big: "8 + ? = 13" },
          { at: "That means 13 minus 8 is 5", caption: "13 - 8 = 5", big: "13 - 8 = 5" },
          { at: "are a family", caption: "A fact family shares three numbers", big: "5, 8, 13" },
        ],
      },
      {
        show: [
          { caption: "Ten is a resting spot", emoji: "🪑🔟" },
          { at: "Step one: take away 4", caption: "14 - 4 = 10", big: "14 - 4 = 10" },
          { at: "Step two", caption: "10 - 2 = 8", big: "10 - 2 = 8" },
          { at: "So 14 minus 6 equals 8", caption: "14 - 6 = 8", big: "14 - 6 = 8" },
        ],
      },
    ],
  },

  "math-1.stories": {
    hook: {
      show: [
        { caption: "The birds are coming back!", emoji: "🐦🐦🐦" },
        { at: "Some are robins", caption: "Robins, blue jays and cardinals", emoji: "🐦🔵🔴" },
        { at: "use math to tell", caption: "Math tells the story", emoji: "📖🔢" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Listen for what happens", emoji: "👂" },
          { at: "Seven birds sit", caption: "7 birds, then 5 more fly in", big: "7 + 5 = 12" },
          { at: "There are 15 mushrooms", caption: "15 mushrooms, and a rabbit eats 6", emoji: "🍄🐇" },
          { at: "Join means add", caption: "Join means add. Go away means subtract.", emoji: "➕➖" },
        ],
      },
      {
        show: [
          { caption: "Owl and Fox compare berries", emoji: "🦉🍓🦊" },
          { at: "So Owl has 3 more", caption: "9 - 6 = 3 more", big: "9 - 6 = 3" },
          { at: "three numbers", caption: "Red, yellow and brown leaves", emoji: "🍁🍂🍂" },
          { at: "Look for a ten", caption: "4 + 6 = 10, then 10 + 3 = 13", big: "4 + 6 + 3 = 13" },
        ],
      },
      {
        show: [
          { caption: "A picture graph", emoji: "📊" },
          { at: "The robin row", caption: "Robins 5, blue jays 3, cardinals 7", emoji: "🐦🐦🐦🐦🐦" },
          { at: "How many more cardinals", caption: "7 - 3 = 4 more cardinals", big: "7 - 3 = 4" },
          { at: "How many birds in all", caption: "5 + 3 + 7 = 15 birds", big: "15" },
        ],
      },
    ],
  },

  "math-1.equal": {
    hook: {
      show: [
        { caption: "An old balance scale", emoji: "⚖️" },
        { at: "It stays level", caption: "5 and 5: it stays level!", big: "5 = 5" },
        { at: "What happens", caption: "What if one side gets more?", emoji: "⚖️❓" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "The equal sign", big: "=" },
          { at: "It means the same as", caption: "= means the same as", emoji: "⚖️" },
          { at: "7 equals 5 plus 2", caption: "The answer can go first", big: "7 = 5 + 2" },
          { at: "4 plus 3 equals 5 plus 2", caption: "Both sides make 7", big: "4 + 3 = 5 + 2" },
          { at: "is false", caption: "Not the same, so it's false", emoji: "❌" },
        ],
      },
      {
        show: [
          { caption: "A mystery number", big: "8 + ☐ = 11" },
          { at: "Count up from 8", caption: "Count up: 9, 10, 11", big: "9, 10, 11" },
          { at: "the mystery number is 3", caption: "The box is 3!", big: "8 + 3 = 11" },
          { at: "Box minus 3 equals 5", caption: "Another mystery", big: "☐ - 3 = 5" },
        ],
      },
      {
        show: [
          { caption: "Two adding tricks", emoji: "🪄" },
          { at: "Trick one", caption: "Add in any order", big: "4 + 9 = 9 + 4" },
          { at: "Trick two", caption: "Pick two to add first", big: "3 + 7 + 5" },
          { at: "Find the ten", caption: "10 + 5 = 15", big: "10 + 5 = 15" },
        ],
      },
    ],
  },

  "math-1.count120": {
    hook: {
      show: [
        { caption: "A giant oak tree", emoji: "🌳" },
        { at: "count its acorns", caption: "So many acorns!", emoji: "🌰🌰🌰🌰🌰" },
        { at: "more than 100", caption: "More than 100!", big: "100+" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Count past 100", big: "100" },
          { at: "Then 101, 102, 103", caption: "One hundred one, one hundred two...", big: "101, 102, 103" },
          { at: "All the way to 119", caption: "All the way to 120", big: "120" },
          { at: "After 109 comes 110", caption: "After 109 comes 110", big: "109 → 110" },
        ],
      },
      {
        show: [
          { caption: "Start anywhere!", emoji: "🚩" },
          { at: "Start at 87", caption: "87, 88, 89, 90, 91", big: "87 → 91" },
          { at: "count by tens", caption: "Count by tens", big: "10, 20, 30..." },
          { at: "Then 110, 120", caption: "...100, 110, 120!", big: "110, 120" },
        ],
      },
      {
        show: [
          { caption: "Writing big numbers", emoji: "✏️" },
          { at: "We write 107", caption: "One hundred seven", big: "107" },
          { at: "One hundred fifteen is 115", caption: "One hundred fifteen", big: "115" },
          { at: "Be careful", caption: "107, not 1007!", emoji: "⚠️" },
        ],
      },
    ],
  },

  "math-1.tens": {
    hook: {
      show: [
        { caption: "A big pile of sticks", emoji: "🪵🪵🪵🪵" },
        { at: "Counting one by one", caption: "One by one is slow", emoji: "🐢" },
        { at: "bundle them into tens", caption: "Bundle them into tens!", big: "10" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Count ten sticks", emoji: "🪵🪵🪵🪵🪵🪵🪵🪵🪵🪵" },
          { at: "Now you have one ten", caption: "One ten = ten ones", big: "1 ten" },
          { at: "Look at 14", caption: "14 is 1 ten and 4 ones", big: "14" },
          { at: "And 30 is three bundles", caption: "30 is 3 tens and 0 ones", big: "30" },
        ],
      },
      {
        show: [
          { caption: "Two places: tens and ones", big: "tens | ones" },
          { at: "Look at 47", caption: "47 is 4 tens and 7 ones", big: "47" },
          { at: "Now look at 74", caption: "74 is 7 tens and 4 ones", big: "74" },
        ],
      },
      {
        show: [
          { caption: "Which is bigger?", big: "52 or 48" },
          { at: "We write 52 > 48", caption: "52 is greater than 48", big: "52 > 48" },
          { at: "like a hungry mouth", caption: "The open mouth faces the bigger number", emoji: "🐊" },
          { at: "So 36 < 39", caption: "36 is less than 39", big: "36 < 39" },
        ],
      },
    ],
  },

  "math-1.add100": {
    hook: {
      show: [
        { caption: "34 mushroom houses", emoji: "🍄🏠" },
        { at: "build 10 more", caption: "10 more houses!", big: "34 + 10" },
        { at: "count every house", caption: "Is there a faster way?", emoji: "🤔" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "10 more than 34", big: "34 + 10" },
          { at: "So 10 more than 34 is 44", caption: "10 more is 44", big: "44" },
          { at: "So 10 less is 24", caption: "10 less is 24", big: "24" },
          { at: "Only the tens digit changes", caption: "Only the tens digit changes", emoji: "⬆️⬇️" },
        ],
      },
      {
        show: [
          { caption: "Count the tens", big: "30 + 40 = 70" },
          { at: "Taking away tens", caption: "Take away tens", big: "70 - 30 = 40" },
          { at: "25 plus 30", caption: "Add tens to any number", big: "25 + 30 = 55" },
        ],
      },
      {
        show: [
          { caption: "Let's add 36 + 7", big: "36 + 7" },
          { at: "6 ones plus 7 ones", caption: "6 + 7 = 13 ones", big: "13 ones" },
          { at: "Bundle 10 of them", caption: "Make a new ten", emoji: "🪵🔟" },
          { at: "36 plus 7 equals 43", caption: "36 + 7 = 43", big: "43" },
        ],
      },
    ],
  },

  "math-1.measure": {
    hook: {
      show: [
        { caption: "Three fallen branches", emoji: "🪵🪵🪵" },
        { at: "Which one is the longest", caption: "Which is longest?", emoji: "📏" },
        { at: "what time to head home", caption: "What time is it?", emoji: "🕒" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Line them up at one end", emoji: "🪵" },
          { at: "sticks out farthest", caption: "The one that sticks out farthest is longest", emoji: "📏" },
          { at: "Here is a clever trick", caption: "Rope is longer than stick, stick longer than pencil", emoji: "🪢🪵✏️" },
        ],
      },
      {
        show: [
          { caption: "How long is a leaf?", emoji: "🍃" },
          { at: "Lay them end to end", caption: "End to end, touching", emoji: "📎📎📎📎📎" },
          { at: "Leave no gaps", caption: "No gaps, no overlaps", emoji: "🚫" },
          { at: "The leaf is 5 paper clips long", caption: "5 paper clips long", big: "5" },
        ],
      },
      {
        show: [
          { caption: "A clock has two hands", emoji: "🕰️" },
          { at: "The short hand is the hour hand", caption: "Short hand: the hour", emoji: "🕒" },
          { at: "written 3:00", caption: "3 o'clock", big: "3:00" },
          { at: "Then it's 3:30", caption: "Half past 3", big: "3:30" },
        ],
      },
    ],
  },

  "math-1.shapes": {
    hook: {
      show: [
        { caption: "A party in the village!", emoji: "🍄🎉" },
        { at: "one big round pie", caption: "One big round pie", emoji: "🥧" },
        { at: "Four friends", caption: "Four friends want a fair piece", emoji: "🦊🦉🐇🐿️" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "What makes a triangle?", emoji: "🔺" },
          { at: "It has 3 straight sides", caption: "3 straight sides, 3 corners", big: "3" },
          { at: "Color doesn't matter", caption: "Color, size and turning don't matter", emoji: "🔺🔻" },
          { at: "A square has 4 equal sides", caption: "A square: 4 equal sides", emoji: "🟦" },
        ],
      },
      {
        show: [
          { caption: "Shapes are puzzle pieces", emoji: "🧩" },
          { at: "Put two squares side by side", caption: "2 squares make a rectangle", emoji: "🟦🟦" },
          { at: "Put six triangles", caption: "6 triangles make a hexagon", emoji: "🐝" },
          { at: "Stack cubes", caption: "Stack solid shapes too", emoji: "🧊🧊🧊" },
        ],
      },
      {
        show: [
          { caption: "Fair shares are equal shares", emoji: "🥧" },
          { at: "Each piece is one half", caption: "2 equal shares: halves", big: "halves" },
          { at: "Each piece is one fourth", caption: "4 equal shares: fourths", big: "fourths" },
          { at: "Which piece is bigger", caption: "A half is bigger than a fourth", emoji: "🥧" },
        ],
      },
    ],
  },
};
