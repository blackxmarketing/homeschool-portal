import type { CourseMedia } from "./types";

/** Slides and videos for the business-hs lessons, keyed by lesson id. */
export const businessHsMedia: CourseMedia = {
  "business-hs.validation": {
    hook: {
      show: [
        { caption: "Thomas Edison had a working bulb and a giant dream.", photo: "Thomas Edison" },
        { at: "counting gas lamps building by building", caption: "Before building, his team counted gas lamps in lower Manhattan.", emoji: "🏢🔥📝" },
        { at: "Why would a famous inventor", caption: "Why survey before you build?", big: "Survey first?" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Many businesses fail by building what nobody needs.", emoji: "🏗️🤷" },
          { at: "a vote recorder", caption: "Edison's first patent worked perfectly and sold nothing.", photo: "File:Edisonsfirstpatent.png" },
          { at: "It is painful", caption: "Mark 1: it hurts when it happens.", big: "Painful" },
          { at: "It is frequent", caption: "Mark 2: it happens often enough to matter.", big: "Frequent" },
          { at: "The strongest clue of all is a workaround", caption: "A clumsy fix today means people want a better one.", emoji: "🩹🔧" },
        ],
      },
      {
        show: [
          { caption: "An interview is for learning, not pitching.", emoji: "🗣️👂📝" },
          { at: "most will say yes to be nice", caption: "Polite yeses are nearly worthless.", emoji: "🙂👍❓" },
          { at: "ask about specific past behavior", caption: "Ask what really happened, not what might happen.", big: "\"The last time...\"" },
          { at: "listen far more than you talk", caption: "Let the customer do most of the talking, and take notes.", photo: "Notebook" },
        ],
      },
      {
        show: [
          { caption: "Count your interviews; don't just remember them.", emoji: "📋🔢" },
          { at: "compliments are cheap", caption: "Compliments cost nothing to give.", emoji: "💬🆓" },
          { at: "6 divided by 25", caption: "6 deposits out of 25 interviews.", big: "24%" },
          { at: "A deposit, preorder, or signed agreement", caption: "The strongest signal: money or a signature.", emoji: "💵✍️" },
        ],
      },
      {
        show: [
          { caption: "Even a real problem can be too small.", emoji: "🔍📏" },
          { at: "Suppose your town has 3,000 households", caption: "Start with how many customers you can reach.", emoji: "🏘️🏘️🏘️" },
          { at: "or 300 households", caption: "3,000 x 10% = 300 households.", big: "300" },
          { at: "$12,000 a month", caption: "300 x $40 = the monthly ceiling.", big: "$12,000/mo" },
          { at: "It's information that saves you months", caption: "A small number is useful information.", emoji: "⏳💡" },
        ],
      },
    ],
  },

  "business-hs.unit-economics": {
    hook: {
      show: [
        { caption: "Henry Ford's Model T, introduced in 1908.", photo: "Ford Model T" },
        { at: "less than $300", caption: "From about $850 to under $300.", big: "$850 → $300" },
        { at: "what it cost to build one car", caption: "The secret number: the cost of one car.", emoji: "🚗🔢" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Unit economics: the money made or lost on one unit.", emoji: "🕯️1️⃣" },
          { at: "Add them: $4.50 per candle", caption: "Wax, wick, jar, label and box add up to $4.50.", big: "$4.50" },
          { at: "payment fees", caption: "Card fees are a cost on every sale.", emoji: "💳✂️" },
          { at: "Fixed costs are different", caption: "Fixed costs stay the same at 10 sales or 1,000.", emoji: "🏭🔒" },
          { at: "His moving assembly line", caption: "Ford's moving assembly line slashed the cost per car.", photo: "File:Ford assembly line - 1913.jpg" },
        ],
      },
      {
        show: [
          { caption: "Gross margin: what's left from each sale.", emoji: "💵➖📦" },
          { at: "a 75 percent gross margin", caption: "($20 - $5) / $20", big: "75%" },
          { at: "A grocery store", caption: "Thin margins can work with huge volume.", photo: "Supermarket" },
          { at: "A handmade product", caption: "Small makers usually need high margins.", emoji: "🧶✋" },
        ],
      },
      {
        show: [
          { caption: "Getting noticed costs money.", emoji: "📣💸" },
          { at: "a booth at a craft fair", caption: "A craft fair booth is one marketing channel.", emoji: "🎪🕯️" },
          { at: "$15 per customer", caption: "$600 / 40 new customers", big: "CAC $15" },
          { at: "Measure CAC for each channel separately", caption: "Fair: about $11.67 each. Flyers: $25 each.", emoji: "🎪📄⚖️" },
        ],
      },
      {
        show: [
          { caption: "Lifetime value: all the profit from one customer.", photo: "Candle" },
          { at: "or $120", caption: "$15 x 4 orders a year x 2 years", big: "LTV $120" },
          { at: "at least three times CAC", caption: "Rule of thumb: LTV at least 3 times CAC.", big: "3 : 1" },
          { at: "loyal, returning customers", caption: "Returning customers are the most valuable kind.", emoji: "🔁🧑💵" },
        ],
      },
    ],
  },

  "business-hs.pricing": {
    hook: {
      show: [
        { caption: "Sam Walton, a store owner who studied prices closely.", emoji: "🏪🏷️🧐" },
        { at: "Priced at $1.20", caption: "Bought for 80 cents. Priced at $1.20...", big: "$1.20" },
        { at: "about three times as many", caption: "...or at $1.00, selling about three times as many.", big: "$1.00 x 3" },
        { at: "Grab a pencil", caption: "Time for some math.", emoji: "✏️🧮" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Cost-plus: start with cost, add a markup.", emoji: "📦➕🏷️" },
          { at: "you add $4 and charge $12", caption: "$8 cost + 50% markup", big: "$12" },
          { at: "leave money on the table", caption: "Cost-plus can leave money on the table.", emoji: "💵🍽️" },
          { at: "markup and margin are different", caption: "Markup divides by cost. Margin divides by price.", big: "50% ≠ 33%" },
        ],
      },
      {
        show: [
          { caption: "Competitive pricing: what do rivals charge?", emoji: "🏪🏪🏷️" },
          { at: "Sam Walton chose low prices", caption: "Walton bet on low prices and high volume.", emoji: "⬇️🏷️⬆️📦" },
          { at: "that's $40 of profit", caption: "40 cents x 100 sales", big: "$40" },
          { at: "300 sales at 20 cents is $60", caption: "20 cents x 300 sales", big: "$60" },
          { at: "walking their aisles", caption: "He studied competitors in person, notebook in hand.", emoji: "🚶📝" },
        ],
      },
      {
        show: [
          { caption: "Value-based: what is the solution worth?", emoji: "💎🙋" },
          { at: "a small bakery", caption: "A busy bakery owner is short on time.", emoji: "🥐⏰" },
          { at: "$300 a month of value", caption: "10 hours x $30 an hour", big: "$300 value" },
          { at: "Cost sets the floor", caption: "Cost is the floor. Value is the ceiling.", emoji: "⬇️🏷️⬆️" },
        ],
      },
      {
        show: [
          { caption: "Break-even: the sales needed to cover fixed costs.", emoji: "⚖️" },
          { at: "a $450 heat press", caption: "A heat press prints designs onto shirts.", emoji: "🔥👕" },
          { at: "Each sale contributes $18", caption: "$30 - $12 = $18 per shirt", big: "$18" },
          { at: "or 25 shirts", caption: "$450 / $18", big: "25 shirts" },
          { at: "Shirt 26", caption: "Real profit starts here.", emoji: "👕💰" },
        ],
      },
    ],
  },

  "business-hs.marketing": {
    hook: {
      show: [
        { caption: "Edison's lab in Menlo Park, New Jersey.", photo: "File:Workers outside main laboratory at Menlo Park. (a5bff5f9cc0b45f7adb41b4a60082100).jpg" },
        { at: "glowing in the winter dark", caption: "Electric lamps glowing where anyone could see them.", emoji: "💡🌙" },
        { at: "thousands of strangers", caption: "Why open the doors to everyone?", big: "Show, don't tell" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Marketing: get noticed and trusted. Sales: help people decide.", emoji: "📣🤝" },
          { at: "Picture the whole journey as a funnel", caption: "Wide at the top, narrow at the bottom.", emoji: "🔻" },
          { at: "Awareness: people learn you exist", caption: "Awareness, interest, decision, purchase...", big: "5 stages" },
          { at: "repeat and referral", caption: "...then happy customers return and bring friends.", emoji: "🔁👫" },
          { at: "Edison's 1879 open house", caption: "Edison's open house worked the whole funnel.", photo: "Thomas Edison" },
        ],
      },
      {
        show: [
          { caption: "Some people drop out at every stage.", emoji: "🔻💧" },
          { at: "That's a 10 percent conversion rate", caption: "100 / 1,000", big: "10%" },
          { at: "or 20 percent", caption: "20 / 100", big: "20%" },
          { at: "or 2 percent", caption: "Overall: 20 / 1,000", big: "2%" },
          { at: "Writing these numbers down", caption: "Measure, then improve.", emoji: "📝📈" },
        ],
      },
      {
        show: [
          { caption: "Find where the funnel leaks.", emoji: "🪣💧" },
          { at: "5,000 visitors a month", caption: "5,000 visitors x 2% = 100 customers.", big: "100" },
          { at: "from 2 percent to 3 percent", caption: "A small lift near the bottom...", big: "2% → 3%" },
          { at: "$1,000 more per month", caption: "...adds 50 customers and $1,000 a month.", big: "+$1,000" },
          { at: "a leaky bucket", caption: "Patch the hole before you pour faster.", photo: "Bucket" },
        ],
      },
      {
        show: [
          { caption: "Under every stage is trust.", emoji: "🤝" },
          { at: "let thousands of people see them burning", caption: "Edison let people see his lamps for themselves.", photo: "Incandescent light bulb" },
          { at: "a clear guarantee", caption: "A guarantee lets people try you without fear.", emoji: "✅🛡️" },
          { at: "Trust breaks quickly", caption: "Fake reviews and hidden fees destroy trust.", emoji: "🚫⭐" },
          { at: "A reputation takes years to build", caption: "Years to build, one bad decision to damage.", big: "Reputation" },
        ],
      },
    ],
  },

  "business-hs.financials": {
    hook: {
      show: [
        { caption: "Walt Disney, cartoonist and entrepreneur.", photo: "Walt Disney" },
        { at: "a deal worth $11,100", caption: "A big deal for a tiny studio.", big: "$11,100" },
        { at: "the studio was bankrupt", caption: "Within about a year, the studio was bankrupt.", emoji: "🏚️📉" },
        { at: "the difference between profit and cash", caption: "Profit and cash are not the same thing.", big: "Profit ≠ Cash" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "The P&L: did we make money this period?", emoji: "📄💵" },
          { at: "you get gross profit", caption: "Revenue - COGS", big: "Gross profit" },
          { at: "you get operating profit", caption: "Gross profit - operating expenses", big: "Operating profit" },
          { at: "operating profit is $2,200", caption: "$12,000 - $4,800 - $5,000", big: "$2,200" },
          { at: "Andrew Carnegie", caption: "Andrew Carnegie tracked the cost of every step in his mills.", photo: "Andrew Carnegie" },
        ],
      },
      {
        show: [
          { caption: "Profit on paper, empty bank account.", emoji: "📄✅🏦❌" },
          { at: "Laugh-O-Gram studio", caption: "Disney's Laugh-O-Gram studio in Kansas City.", photo: "Laugh-O-Gram Studio" },
          { at: "paid only $100 up front", caption: "Only $100 of the $11,100 ever arrived.", big: "$100" },
          { at: "you have only $300 left", caption: "Profit of $800, but only $300 in the bank.", big: "$300" },
          { at: "Cash keeps the doors open", caption: "Cash keeps the doors open.", emoji: "🚪💵" },
        ],
      },
      {
        show: [
          { caption: "A cash flow forecast spots trouble early.", emoji: "📅💵" },
          { at: "burn rate", caption: "Burn rate: cash out minus cash in.", emoji: "🔥💸" },
          { at: "your runway is 6 months", caption: "$9,000 / $1,500 a month", big: "6 months" },
          { at: "extend runway", caption: "Deposits, faster collection, smaller orders.", emoji: "🛫⏳" },
        ],
      },
      {
        show: [
          { caption: "A pitch: a clear story backed by numbers.", emoji: "🎤📊" },
          { at: "your ask", caption: "End with a specific ask.", big: "The ask" },
          { at: "or $250,000", caption: "$50,000 / 0.20", big: "$250,000" },
          { at: "his brother Roy", caption: "Roy Disney carried a drawing of the park to New York.", photo: "Roy O. Disney" },
          { at: "weekly Disney TV show", caption: "A TV network invested for a share and a weekly show.", emoji: "📺🤝" },
        ],
      },
    ],
  },
};
