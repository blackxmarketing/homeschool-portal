import type { CourseMedia } from "./types";

/** Slides and videos for the money-45 lessons, keyed by lesson id. */
export const money45Media: CourseMedia = {
  "money-45.needs-wants": {
    hook: {
      show: [
        { photo: "Camping", caption: "A camping trip! But the backpack is small." },
        { at: "On the bed are", emoji: "💧🧥🔦🎮🛌🍬📚", caption: "Seven things on the bed. Not all of them will fit." },
        { at: "Only some of it will fit", emoji: "🎒❓", caption: "What goes in first? How do you decide?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Need", caption: "A need keeps you alive, safe and healthy." },
          { at: "Without water, you get sick", photo: "Water bottle", caption: "Water comes first. Your body can't go long without it." },
          { at: "At home, needs include", emoji: "🍎💧🏠🧥💊", caption: "Food, water, a home, warm clothes and medicine." },
          { at: "could I live safely without this", big: "Could I live safely without it?", caption: "If the answer is no, it's a need." },
        ],
      },
      {
        show: [
          { big: "Want", caption: "A want makes life more fun, but you could live without it." },
          { at: "a new skateboard", photo: "Skateboard", caption: "A skateboard is fun to ride, but it's a want." },
          { at: "Wants are not bad", emoji: "🎮🍭😊", caption: "Wants are fine! They just come second." },
          { at: "sort needs from wants", emoji: "📦📦", caption: "Two piles: needs in one, wants in the other." },
        ],
      },
      {
        show: [
          { big: "Needs first, then wants", caption: "The one simple rule smart money users follow." },
          { at: "a $6 notebook", emoji: "📓✏️", caption: "A notebook for school is a need. Buy it first." },
          { at: "20 minus 6", big: "$20 − $6 = $14", caption: "What's left can go to wants or to saving." },
          { at: "Families do the same thing", photo: "Grocery store", caption: "Families buy groceries before fun extras." },
          { at: "When needs come first", emoji: "🍎➡️🎮", caption: "Important things first, fun things after." },
        ],
      },
    ],
  },

  "money-45.earning": {
    hook: {
      show: [
        { photo: "File:Leaf rake and autumn leaves 1.jpg", caption: "Two kids, two rakes, the same $5 price." },
        { at: "Sam rushes", emoji: "🏃🍂🍂", caption: "Sam hurries and leaves piles behind." },
        { at: "Ava rakes every corner", emoji: "🍂🧹✨", caption: "Ava rakes, bags the leaves and sweeps up." },
        { at: "Next fall", emoji: "📞🤔", caption: "Who gets the phone call next year?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🤝💵", caption: "Help someone, and they may pay you for it." },
          { at: "walk the dog", photo: "Dog walking", caption: "Walking a dog helps a busy neighbor." },
          { at: "That help has value", big: "Help → Value → $", caption: "Making life easier for someone has value." },
          { at: "part of being in a family", emoji: "🛏️🍽️🏠", caption: "Some chores we do just because we're a family." },
          { at: "washing the car", emoji: "🚗🧽💧", caption: "Extra jobs are a way some kids earn money." },
        ],
      },
      {
        show: [
          { emoji: "🧮💵", caption: "Pay for one job times how many times you do it." },
          { at: "3 x 5 = $15", big: "$3 × 5 = $15", caption: "Five dog walks at $3 each." },
          { at: "15 + 4 = $19", big: "$15 + $4 = $19", caption: "Add the plant watering for your total." },
          { at: "a little notebook", photo: "Notebook", caption: "Write down every job and what it paid." },
        ],
      },
      {
        show: [
          { emoji: "⏰✅🙂", caption: "On time, careful and polite." },
          { at: "Check your work", emoji: "🔍", caption: "Look for missed spots before you say you're done." },
          { at: "swept the sidewalk", photo: "Broom", caption: "Ava even swept the sidewalk. Extra care!" },
          { at: "told their friends", emoji: "🗣️👂", caption: "Happy customers tell their friends." },
          { at: "good reputation", big: "Reputation ⭐", caption: "Trust brings you more work." },
        ],
      },
    ],
  },

  "money-45.saving": {
    hook: {
      show: [
        { photo: "Bicycle", caption: "Nora wants a used bike that costs $48." },
        { at: "She earns $6 a week", big: "$6 a week", caption: "She earns $6 a week from extra jobs." },
        { at: "how many weeks", emoji: "📅❓", caption: "How many weeks until she can ride?" },
        { at: "spends $2 of it", emoji: "🍬💸", caption: "What if some of it goes to candy?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💵➡️⏳", caption: "Saving: keep money now, use it later." },
          { at: "starts with a goal", emoji: "🎯🚲", caption: "A goal is a thing you want and its price." },
          { at: "on a jar", emoji: "🫙🚲", caption: "A jar with a picture of your goal on it." },
          { at: "watch it grow", emoji: "🫙📈", caption: "You can see your savings pile up." },
          { at: "a reason to wait", emoji: "⏳😊", caption: "A goal makes waiting worth it." },
        ],
      },
      {
        show: [
          { big: "Price ÷ weekly savings", caption: "This tells you how many weeks it takes." },
          { at: "48 divided by 6", big: "$48 ÷ $6 = 8 weeks", caption: "Saving $6 a week: 8 weeks to the bike." },
          { at: "48 divided by 4", big: "$48 ÷ $4 = 12 weeks", caption: "Saving $4 a week: 12 weeks." },
          { at: "Saving more each week", emoji: "📅⏩", caption: "Save more each week and the big day comes sooner." },
        ],
      },
      {
        show: [
          { emoji: "🪣💧💧", caption: "A leak lets your savings drip away." },
          { at: "spends $2 on candy", big: "$6 − $2 = $4", caption: "Spend $2 and only $4 goes in the jar." },
          { at: "12 weeks instead of 8", emoji: "🐢📅", caption: "Four more weeks of waiting!" },
          { at: "A savings chart", emoji: "⬜⬜⬜⬜⬜⬜", caption: "Draw one box for each week." },
          { at: "color a box", emoji: "🟩🟩🟩⬜⬜⬜", caption: "Color a box each week and watch it fill up." },
        ],
      },
    ],
  },

  "money-45.spending": {
    hook: {
      show: [
        { photo: "Crayon", caption: "Two boxes of crayons. Which is the better buy?" },
        { at: "24 crayons for $6", big: "24 for $6", caption: "The small box." },
        { at: "48 crayons for $8", big: "48 for $8", caption: "The big box: twice the crayons for $2 more." },
        { at: "the better deal", emoji: "🤔🖍️", caption: "Is bigger always smarter? Let's find out." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏪🔍🏪", caption: "A wise shopper looks before buying." },
          { at: "different stores", photo: "Supermarket", caption: "The same item can cost different amounts at different stores." },
          { at: "a puzzle costs $12", emoji: "🧩", caption: "One puzzle, two prices: $12 and $9." },
          { at: "12 minus 9", big: "$12 − $9 = $3", caption: "Buy the cheaper one and keep $3." },
          { at: "Checking two or three places", emoji: "✅💰", caption: "A quick check saves a lot over time." },
        ],
      },
      {
        show: [
          { emoji: "📦📦", caption: "Packs come in different sizes." },
          { at: "find the price for one", big: "Pack price ÷ how many", caption: "That gives you the price for one." },
          { at: "6 divided by 2", big: "$6 ÷ 2 = $3 each", caption: "The 2-pack: $3 for each notebook." },
          { at: "10 divided by 5", big: "$10 ÷ 5 = $2 each", caption: "The 5-pack: only $2 for each notebook." },
          { at: "really use them all", emoji: "📓📓📓📓📓✅", caption: "A big pack is a deal only if you use it all." },
        ],
      },
      {
        show: [
          { big: "Value", caption: "Value is how much good you get for your money." },
          { at: "pops after one week", emoji: "⚽💥", caption: "Cheap, but gone in a week. Poor value." },
          { at: "lasts two years", emoji: "⚽✨📅", caption: "Costs more, lasts years. Great value." },
          { at: "candy near the checkout", photo: "Point of sale", caption: "Treats by the checkout tempt you while you wait." },
          { at: "wait a day", emoji: "🌙☀️🤔", caption: "Sleep on it. Still want it tomorrow?" },
        ],
      },
    ],
  },

  "money-45.banks": {
    hook: {
      show: [
        { photo: "Piggy bank", caption: "$100 in a piggy bank stays $100." },
        { at: "savings account at a bank", emoji: "🏦", caption: "$100 in a savings account at a bank..." },
        { at: "more than $100", emoji: "📈💵", caption: "...grows to more than you put in!" },
        { at: "where did the extra money", emoji: "🤔💰", caption: "Where does the extra money come from?" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Bank vault", caption: "Banks keep people's money safe." },
          { at: "called a deposit", big: "Deposit ⬇️", caption: "Putting money into your account." },
          { at: "called a withdrawal", big: "Withdrawal ⬆️", caption: "Taking money out of your account." },
          { at: "careful record", emoji: "📒✏️", caption: "The bank writes down every dollar that is yours." },
          { at: "It lends some of it", emoji: "🏠🥖🤝", caption: "The bank lends money to families and businesses." },
        ],
      },
      {
        show: [
          { photo: "Bread", caption: "A baker might borrow money to open a shop." },
          { at: "called interest", big: "Interest", caption: "The extra money borrowers pay for using money." },
          { at: "shares part of it", emoji: "🏦➡️🙂💵", caption: "The bank shares some of it with savers." },
          { at: "5 percent a year", big: "5% = $5 per $100", caption: "5 percent means $5 for every $100." },
          { at: "Save $200", big: "$200 → $10", caption: "Two hundreds earn $5 each: $10 in a year." },
        ],
      },
      {
        show: [
          { emoji: "✨💵", caption: "Here's the magic part." },
          { at: "interest on it too", emoji: "💵➕💵", caption: "Your interest earns interest too." },
          { at: "like a snowball", photo: "Snowball", caption: "Like a snowball rolling downhill, it keeps growing." },
          { at: "called compound interest", big: "Interest on interest", caption: "This is called compound interest." },
          { at: "The longer you wait", emoji: "⏳📈", caption: "Start early and give it time to grow." },
        ],
      },
    ],
  },
};
