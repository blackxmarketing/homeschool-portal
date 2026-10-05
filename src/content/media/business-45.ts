import type { CourseMedia } from "./types";

/** Slides and videos for the business-45 lessons, keyed by lesson id. */
export const business45Media: CourseMedia = {
  "business-45.goods-services": {
    hook: {
      show: [
        { caption: "Three kids, one summer Saturday, three different businesses.", emoji: "🍋🐕📿" },
        { at: "walks a neighbor's dog", caption: "One kid walks a neighbor's dog around the block.", emoji: "🧒🐕‍🦺" },
        { at: "all three are running a business", caption: "Different jobs, same big idea. What is it?", big: "Business?" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A business gives people something they want or need.", emoji: "🎁➡️🙂" },
          { at: "The bakery gives people bread", caption: "A bakery trades fresh bread for money.", emoji: "🥖🍞🥐" },
          { at: "A kid's lemonade stand", caption: "A cold drink on a hot day: that's a business too.", emoji: "☀️🍋🥤" },
          { at: "the customer pays money", caption: "The customer pays, and the owner earns money for the work.", emoji: "🙂💵🙂" },
          { at: "A good trade makes both sides happy", caption: "In a good trade, both sides are glad.", big: "Both win!" },
        ],
      },
      {
        show: [
          { caption: "Businesses sell two kinds of things. First up: goods.", big: "Goods" },
          { at: "things you can hold", caption: "Goods are things you can hold, touch and take home.", emoji: "🍪📿📚" },
          { at: "could you put it in a bag?", caption: "The bag test: if it fits in a bag, it's a good.", emoji: "🛍️✅" },
          { at: "A bake sale and a craft table", caption: "Kid stands sell goods, like lemonade and fresh vegetables.", photo: "Lemonade stand" },
        ],
      },
      {
        show: [
          { caption: "The second kind is services.", big: "Services" },
          { at: "Walking a dog is a service", caption: "A service is a job you do for someone.", photo: "Dog walking" },
          { at: "washing a car, raking leaves", caption: "Washing cars and raking leaves are services too.", emoji: "🚗🧽🍂" },
          { at: "their time and work", caption: "You pay for someone's time and work, not a thing.", emoji: "⏰💪" },
          { at: "Can you put a dog walk in a bag?", caption: "A dog walk won't fit in a bag. It's a service!", emoji: "🛍️🐕❌" },
        ],
      },
      {
        show: [
          { caption: "Some businesses sell goods AND services.", emoji: "🍪➕🧽" },
          { at: "A pizza shop sells pizza", caption: "Pizza is a good. Bringing it to your door is a service.", emoji: "🍕🚗🏠" },
          { at: "A bike shop sells new bikes", caption: "A bike shop sells bikes and fixes them too.", photo: "Bicycle shop" },
          { at: "ask three questions", caption: "What will I offer? Good or service? Who will want it?", big: "3 questions" },
        ],
      },
    ],
  },

  "business-45.customers": {
    hook: {
      show: [
        { caption: "Winter in Maine means ice, snow and very cold ears.", emoji: "⛸️❄️🥶" },
        { at: "bent wire into loops", caption: "Wire loops plus fur, sewn by his grandmother.", emoji: "➰🧶👵" },
        { at: "he had just made earmuffs", caption: "Chester Greenwood had just made earmuffs.", emoji: "🥶➡️😊" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A customer is the person who buys from a business.", emoji: "🙋💵" },
          { at: "there is no business at all", caption: "No customers means no business.", big: "No customers = no business" },
          { at: "families at a soccer game", caption: "Thirsty soccer families are great lemonade customers.", emoji: "⚽☀️🥤" },
          { at: "people who own dogs", caption: "A dog walker's customers own dogs and have busy days.", photo: "Dog walking" },
          { at: "Who is my customer?", caption: "Always ask this question first.", big: "Who is my customer?" },
        ],
      },
      {
        show: [
          { caption: "People buy things to fix a problem or meet a need.", emoji: "😟➡️😊" },
          { at: "needs a drink", caption: "Thirsty on a hot day? That's a need.", photo: "Lemonade" },
          { at: "someone to feed the cat", caption: "Going away? Someone has to feed the cat.", emoji: "🐈🍽️🧳" },
          { at: "spot that problem", caption: "Your job: spot the problem and make it go away.", emoji: "🔍💡" },
          { at: "Problem first, then solution", caption: "Problem first, then solution.", big: "Problem ➡️ Solution" },
        ],
      },
      {
        show: [
          { caption: "In 1873, a 15-year-old in Farmington, Maine had a problem.", big: "1873" },
          { at: "his ears got painfully cold", caption: "Ice skating was fun, but his ears froze.", emoji: "⛸️👂🥶" },
          { at: "asked his grandmother to sew fur", caption: "His grandmother sewed fur onto wire loops.", emoji: "👵🧵➰" },
          { at: "He had made earmuffs!", caption: "Earmuffs! Soon other people wanted them too.", emoji: "👂🧶👂" },
          { at: "he got a patent", caption: "A patent says: this invention is officially yours.", emoji: "📜✅" },
        ],
      },
      {
        show: [
          { caption: "Business ideas hide in the things people say.", emoji: "💬💡" },
          { at: "start with 'I wish.'", caption: "Listen for 'I wish' and 'Ugh!' sentences.", big: "\"I wish...\"" },
          { at: "these leaves take forever", caption: "Too many leaves? That's a clue!", emoji: "🍂🍂😩" },
          { at: "talk to a few neighbors", caption: "With a parent, ask neighbors about their problems.", emoji: "🧒👨‍👧🏠" },
          { at: "many people have the same problem", caption: "Lots of people with one problem? Great business idea!", emoji: "🙋🙋🙋💡" },
        ],
      },
    ],
  },

  "business-45.profit": {
    hook: {
      show: [
        { caption: "Two lemonade stands. One hot day.", emoji: "🍋☀️🍋" },
        { at: "Jade sells 30 cups for $1 each", caption: "Jade: 30 cups at $1. Max: 20 cups at $2.", big: "30 × $1 vs 20 × $2" },
        { at: "costs, price and profit", caption: "Three words solve the mystery.", big: "Costs • Price • Profit" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Costs are money you spend to run your business.", emoji: "💸" },
          { at: "lemons, sugar and paper cups", caption: "Lemons, sugar and cups all cost money.", photo: "Lemon" },
          { at: "Add them all up", caption: "$4 + $2 + $3 = $9 in costs.", big: "$4 + $2 + $3 = $9" },
          { at: "write each one down", caption: "Write every cost in a business notebook.", emoji: "📒✏️" },
        ],
      },
      {
        show: [
          { caption: "Price is what a customer pays for one thing.", big: "$1 a cup" },
          { at: "Revenue is all the money", caption: "Revenue is ALL the money customers pay you.", emoji: "💵💵💵" },
          { at: "multiply how many you sold", caption: "Revenue = number sold × price.", big: "15 × $1 = $15" },
          { at: "15 cups at $2 each", caption: "Same cups, higher price: 15 × $2 = $30.", emoji: "🍋💵💵" },
        ],
      },
      {
        show: [
          { caption: "Profit is the money left over.", emoji: "💰😊" },
          { at: "Profit equals revenue minus costs", caption: "The profit rule.", big: "Profit = Revenue − Costs" },
          { at: "$15 minus $9", caption: "$15 − $9 = $6 to save, spend or share.", big: "$6 profit" },
          { at: "If it rains", caption: "Rain means fewer sales.", emoji: "🌧️🍋😕" },
          { at: "That's a $4 loss", caption: "Costs bigger than revenue? That's a loss.", big: "$5 − $9 = −$4" },
        ],
      },
      {
        show: [
          { caption: "Picking a price takes thinking.", emoji: "🤔🏷️" },
          { at: "too low", caption: "Too low: you sell lots but keep very little.", emoji: "⬇️🪙" },
          { at: "too high", caption: "Too high: people walk right past.", emoji: "⬆️🚶‍♀️💨" },
          { at: "fair to your customers", caption: "Just right: fair to customers, and you still earn a profit.", big: "Just right" },
        ],
      },
    ],
  },

  "business-45.advertising": {
    hook: {
      show: [
        { caption: "The best lemonade on the whole street...", emoji: "🍋🏆" },
        { at: "tucked behind a big hedge", caption: "...hidden behind a hedge, with no sign.", emoji: "🌳🌳🙈" },
        { at: "Probably zero", caption: "If nobody knows, nobody buys.", big: "0 cups" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Telling people about your business is advertising.", emoji: "📣" },
          { at: "An advertisement, or ad", caption: "An ad says what you sell and why someone might want it.", big: "Ad" },
          { at: "signs, flyers, posters", caption: "Signs, flyers and posters are all ads.", emoji: "🪧📄🖼️" },
          { at: "the right customers find you", caption: "Good ads help the right customers find you.", emoji: "🧭🙋" },
        ],
      },
      {
        show: [
          { caption: "A hand-lettered sign shows what is for sale and the price.", photo: "Lemonade stand" },
          { at: "What are you selling?", caption: "What? How much? When and where?", big: "What? How much? When?" },
          { at: "Use big letters", caption: "Big letters, bright colors, few words.", emoji: "🔠🌈" },
          { at: "a second or two", caption: "People passing by have a second or two to read it.", emoji: "🚶⏱️" },
          { at: "'LEMONADE $1' in giant letters", caption: "Short and big beats long and tiny.", big: "LEMONADE $1" },
        ],
      },
      {
        show: [
          { caption: "Signs aren't the only way to get the word out.", emoji: "📣📄🗣️" },
          { at: "make flyers", caption: "Flyers are small paper ads you hand out with a parent.", emoji: "📄🏠👨‍👧" },
          { at: "some of the best advertising is free", caption: "Some of the best advertising costs nothing.", big: "Free!" },
          { at: "that's called word of mouth", caption: "Happy customers tell their friends: word of mouth.", emoji: "😊🗣️👂" },
        ],
      },
      {
        show: [
          { caption: "The most important rule: tell the truth.", big: "Be honest" },
          { at: "don't call it fresh-squeezed", caption: "Fresh-squeezed means squeezed from real lemons.", photo: "Lemon squeezer" },
          { at: "won't come back", caption: "Customers who feel tricked don't come back.", emoji: "😠🚪" },
          { at: "Honest ads build trust", caption: "Trust means people believe what you say.", emoji: "🤝✅" },
          { at: "come back again and again", caption: "Trust brings customers back again and again.", emoji: "🔁😊" },
        ],
      },
    ],
  },

  "business-45.teamwork": {
    hook: {
      show: [
        { caption: "Ford factory workers in 1913, each doing one job along a line.", photo: "File:Ford assembly line - 1913.jpg" },
        { at: "each worker did one job", caption: "Each worker did one job as the car moved down the line.", emoji: "👷➡️🚗" },
        { at: "about 12 hours to about an hour and a half", caption: "About 12 hours down to about an hour and a half!", big: "12 hrs ➡️ 1½ hrs" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "One clear job each made the work go faster.", emoji: "👷👷👷➡️🚗" },
          { at: "Each job on a team is called a role", caption: "Each job on a team is called a role.", big: "Role" },
          { at: "The maker pours drinks", caption: "The maker pours. The cashier handles money.", emoji: "🥤💵" },
          { at: "The greeter smiles", caption: "The greeter waves. The cleaner keeps it neat.", emoji: "👋🧽" },
          { at: "nobody bumps into each other", caption: "Everyone knows their job, so the team runs smoothly.", emoji: "🤝🍋" },
        ],
      },
      {
        show: [
          { caption: "Good teams plan ahead.", emoji: "📝" },
          { at: "make a checklist", caption: "Make a checklist of everything you need.", big: "Checklist ✅" },
          { at: "coins and small bills", caption: "Bring coins and small bills to make change.", photo: "Coin" },
          { at: "Decide who will do each job", caption: "Decide who does each job before you open.", emoji: "🧒👧🧑" },
          { at: "saves a lot of running around", caption: "A few minutes of planning saves lots of running around.", emoji: "⏱️😌" },
        ],
      },
      {
        show: [
          { caption: "Great service brings customers back.", emoji: "😊🔁" },
          { at: "Say hello and smile", caption: "Hello, smile, please and thank you.", emoji: "👋😀🙏" },
          { at: "pays $5 for a $2 lemonade", caption: "$5 paid for a $2 lemonade: give back $3.", big: "$5 − $2 = $3" },
          { at: "like a spilled cup", caption: "Spill? Stay calm, say sorry, pour a fresh cup.", emoji: "🥤💦➡️🥤" },
          { at: "how you made them feel", caption: "Customers remember how you made them feel.", emoji: "💛" },
        ],
      },
      {
        show: [
          { caption: "Every team needs a good leader.", emoji: "⭐🧑‍🤝‍🧑" },
          { at: "doesn't boss people around", caption: "A good leader doesn't boss. A good leader helps.", emoji: "🙅‍♂️📢➡️🤲" },
          { at: "pitches in wherever help is needed", caption: "Jump in where the team is busiest.", emoji: "🏃🤝" },
          { at: "thanks teammates", caption: "Say thank you to your teammates.", big: "Thank you!" },
          { at: "count the money with a parent", caption: "Count the money with a parent and plan to do better.", emoji: "💵👨‍👧📈" },
        ],
      },
    ],
  },
};
