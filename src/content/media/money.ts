import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the money lessons, keyed by lesson id. */
export const moneyMedia: CourseMedia = {
  "money.earning": {
    hook: {
      show: [
        { photo: "Car wash", caption: "Leo's first business: washing cars on Saturday mornings." },
        { at: "paying him $35", big: "$10 → $35", caption: "Same kid, same neighbors, more than triple the pay." },
        { at: "So what changed?", emoji: "🤔🧽🚗", caption: "Hint: it wasn't luck. Keep listening!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔋📱🙏", caption: "A charger at 2 percent can feel priceless!" },
          { at: "walking their dog", photo: "Dog walking", caption: "Walking a dog frees up a busy owner's day. That's value." },
          { at: "Money is just the tool", photo: "Coin", caption: "Coins and bills are just a handy way to swap value." },
          { at: "make people better off", big: "Help → Value → $", caption: "Solve someone's problem and they'll happily pay." },
        ],
      },
      {
        show: [
          { big: "Wage = $ per hour", caption: "A wage pays you for every hour you work." },
          { at: "multiply your hourly rate", photo: "Time clock", caption: "Workers once punched a time clock to record their hours." },
          { at: "12 x 6 = $72", big: "$12 × 6 = $72", caption: "Rate times hours. Just one step!" },
          { at: "getting faster does not help", emoji: "🏃⏱️🤷", caption: "Finish early on hourly pay? You just earn less." },
        ],
      },
      {
        show: [
          { emoji: "🌱✂️🏡", caption: "One lawn, one price, no matter how long it takes." },
          { at: "divide the price by the hours", big: "$24 ÷ 1.5 = $16/hr", caption: "Your real hourly rate: price divided by hours." },
          { at: "finish in 1 hour", big: "$24 ÷ 1 = $24/hr", caption: "Same job, faster hands: an $8-an-hour raise!" },
          { at: "straight into your pocket", emoji: "💪⚡💰", caption: "With per-job pay, getting better pays you more." },
        ],
      },
      {
        show: [
          { photo: "Electrician", caption: "Wiring takes years of training, so it pays more per hour." },
          { at: "hand out flyers", emoji: "📄📄📄", caption: "Almost anyone can hand out flyers, so it pays less." },
          { at: "useful and hard to find", big: "Useful + Rare = $$$", caption: "The rarer and more useful the skill, the higher the pay." },
          { at: "That rarer skill was worth $35", emoji: "🧽🧹✨🚗", caption: "Leo learned to clean inside like a pro. That's rare!" },
          { at: "from cooking to coding", emoji: "🍳💻🎸", caption: "Every skill you learn makes your hours worth more." },
        ],
      },
    ],
  },

  "money.saving": {
    hook: {
      show: [
        { photo: "Potato chip", caption: "One little snack. How much could it really cost?" },
        { at: "you have spent $90", big: "$3 × 30 days = $90", caption: "Tiny daily buys add up fast." },
        { at: "a good pair of shoes", emoji: "👟👟", caption: "A month of snacks could have been new sneakers!" },
        { at: "quietly leaking", emoji: "💧💸🕳️", caption: "Small, everyday buys are where money slips away." },
      ],
    },
    teach: [
      {
        show: [
          { big: "Needs vs Wants", caption: "Sort every purchase into one of two piles." },
          { at: "A need is something", photo: "Grocery store", caption: "Food is a need, so it always gets paid first." },
          { at: "A want is something", emoji: "🎮🥤👕", caption: "Games, fancy drinks, extra hoodies: fun, but optional." },
          { at: "needs get paid first", emoji: "🍎➡️🎮", caption: "Needs first, then wants with what's left." },
          { at: "Shoes that fit are a need", emoji: "👟❓", caption: "Same item, different pile. Ask why you're buying it." },
        ],
      },
      {
        show: [
          { photo: "Piggy bank", caption: "A budget is a plan for your money before you spend it." },
          { at: "spend, save, give", emoji: "🛍️🐷🎁", caption: "Three jobs for every dollar you earn." },
          { at: "Try 60 percent to spend", big: "60 / 30 / 10", caption: "Spend, save, give. The three parts make 100 percent." },
          { at: "If you earn $40", photo: "File:A jar of world coins.jpg", caption: "Earn $40? Time to split it into three piles." },
          { at: "Check that they add", big: "$24 + $12 + $4 = $40", caption: "Always check that the piles add back to the total." },
        ],
        watch: { youtube: "sVKQn2I4HDM", title: "Budgeting Basics!", channel: "Two Cents" },
      },
      {
        show: [
          { big: "50 / 30 / 20", caption: "A popular budget plan for grown-ups." },
          { at: "Take-home pay is the money left", emoji: "💵➖🏛️", caption: "Taxes come out first. What's left is take-home pay." },
          { at: "Half of it", photo: "Farmers' market", caption: "Needs like groceries get the biggest slice: half." },
          { at: "On $3,000 of take-home pay", big: "$1,500 · $900 · $600", caption: "Needs, wants and savings on a $3,000 month." },
          { at: "not leftover crumbs", photo: "File:Apple pie slice.jpg", caption: "Savings deserve a real slice of the pie, planned on purpose." },
        ],
      },
      {
        show: [
          { big: "Pay Yourself First", caption: "The number one trick that real savers use." },
          { at: "separate jar or account", photo: "File:-finance -wealth -savings -security -coin.jpg", caption: "A separate jar keeps savings safe from impulse buys." },
          { at: "Little purchases nibble it away", emoji: "🍪🥤🎧💸", caption: "A bit here, a bit there, and the savings are gone." },
          { at: "Ava wanted a $120 bike", photo: "Bicycle", caption: "Ava's goal: a bike of her own." },
          { at: "120 / 12 = 10 weeks", big: "$120 ÷ $12 = 10 weeks", caption: "Goal divided by weekly savings = weeks to wait." },
        ],
      },
    ],
  },

  "money.interest": {
    hook: {
      show: [
        { photo: "Benjamin Franklin", caption: "Benjamin Franklin: inventor, printer, founder, and saver." },
        { at: "Boston and Philadelphia", photo: "Boston", caption: "Boston (and Philadelphia) each got Franklin's gift." },
        { at: "about 200 years", photo: "Hourglass", caption: "His rule: let it sit for two whole centuries!" },
        { at: "grown into millions of dollars", big: "£1,000 → $Millions", caption: "Nobody added a penny. So how did it grow?" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Bank vault", caption: "Your savings don't just sit in a vault like this one." },
          { at: "lends that money", emoji: "🏦➡️🏠🚗", caption: "Your deposit helps other people buy homes and cars." },
          { at: "That payment is called interest", big: "Interest", caption: "The bank's thank-you for using your money." },
          { at: "The money you put in is called the principal", photo: "Coin", caption: "Principal = the money you start with." },
          { at: "0.04 x 500 = $20", big: "$500 × 4% = $20", caption: "A free $20 a year, just for waiting." },
        ],
      },
      {
        show: [
          { big: "Simple interest", caption: "Interest only on the money you started with." },
          { at: "earn $50 every single year", emoji: "💵💵💵", caption: "$50, then $50, then $50. Never more, never less." },
          { at: "your balance is $1,000 + $150", big: "$1,000 → $1,150", caption: "Three years of $50 each." },
          { at: "like climbing stairs", photo: "File:Concrete steps, Savski nasip.jpg", caption: "Even steps, one after another: steady and straight." },
          { at: "steady slope", emoji: "📏📈", caption: "Same step every year makes a straight line." },
        ],
      },
      {
        show: [
          { photo: "File:Boys rolling snowball (Japanese art in OAW).png", caption: "Like a rolling snowball, it picks up more as it grows." },
          { at: "interest on that bigger balance", emoji: "🌱➡️🌿➡️🌳", caption: "Your interest starts earning interest of its own." },
          { at: "Year 1: 1,000 x 1.05", big: "$1,000 → $1,050 → $1,102.50", caption: "Each year's growth is a little bigger than the last." },
          { at: "Why multiply by 1.05", big: "× 1.05 = 1 + 0.05", caption: "Keep the whole balance and add 5 percent, in one step." },
          { at: "watch the gap explode", emoji: "🚀📈", caption: "Give it enough years and compounding takes off." },
        ],
      },
      {
        show: [
          { big: "Rule of 72", caption: "A shortcut to see how fast money doubles." },
          { at: "72 / 6 = 12 years", big: "72 ÷ 6 = 12 years", caption: "At 6 percent, your money doubles about every 12 years." },
          { at: "about $800 in 36 years", big: "$100 → $200 → $400 → $800", caption: "Each doubling is bigger than all the growth before it." },
          { at: "time is the secret ingredient", emoji: "⏳🌳", caption: "The longer money waits, the more doublings it gets." },
          { at: "Money saved at age 12", photo: "Piggy bank", caption: "Start saving at 12 and you're way ahead of a 30-year-old." },
        ],
        watch: { youtube: "MhvjCWfy-lw", title: "The time value of money - German Nande", channel: "TED-Ed" },
      },
    ],
  },

  "money.investing": {
    hook: {
      show: [
        { photo: "Charles Ponzi", caption: "Charles Ponzi in 1920, the man with the too-good promise." },
        { at: "$100 into $150", big: "$100 → $150 in 45 days?!", caption: "A 50 percent gain in six weeks. Guaranteed. Hmm..." },
        { at: "Thousands of people lined up", emoji: "🧍🧍🧍💵", caption: "Thousands of people trusted him with their savings." },
        { at: "most of that money was gone", emoji: "💸🕳️", caption: "How can you spot a trap before it's too late?" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "New York Stock Exchange", caption: "The New York Stock Exchange, where shares are bought and sold." },
          { at: "a tiny slice of ownership", emoji: "🍕🏢", caption: "A share is like one slice of a giant company pizza." },
          { at: "you own 100", big: "100 ÷ 1,000,000 = 0.01%", caption: "Small slice, but it's really yours." },
          { at: "your shares can become worth more", photo: "Stock certificate", caption: "A share certificate from 1808: proof you own a piece." },
          { at: "called a dividend", emoji: "💵📬", caption: "Some companies mail owners a slice of their profits." },
        ],
        watch: { youtube: "p7HKvqRI_Bo", title: "How does the stock market work? - Oliver Elfenbaum", channel: "TED-Ed" },
      },
      {
        show: [
          { photo: "Roller coaster", caption: "Stocks ride up and down, a bit like a roller coaster." },
          { at: "savings accounts pay a small return", emoji: "🐢🏦", caption: "Savings accounts are safe, but they grow slowly." },
          { at: "stocks can also fall", photo: "Stock market crash of 1929", caption: "1929: crowds on Wall Street as stock prices crashed." },
          { at: "risk and reward", big: "Risk ⇄ Reward", caption: "Bigger possible gains always come with bigger possible losses." },
          { at: "high reward with zero risk", emoji: "🚫🦄", caption: "High reward with zero risk? It doesn't exist." },
        ],
      },
      {
        show: [
          { photo: "File:Eggs in basket 2020 G1.jpg", caption: "All your eggs in one basket? One stumble breaks them all." },
          { at: "spreading money across", emoji: "🧺🧺🧺🧺🧺", caption: "Spread them out and one fall can't ruin everything." },
          { at: "$100 into each of 10 companies", big: "$1,000 = 10 × $100", caption: "Ten small bets instead of one big one." },
          { at: "you lose $100", big: "Lose 10%, not 100%", caption: "One failure stings, but it doesn't wipe you out." },
          { at: "an index fund", photo: "Wall Street", caption: "An index fund owns a little of hundreds of companies at once." },
        ],
      },
      {
        show: [
          { big: "Patience pays", caption: "The market fell in some years but grew over decades." },
          { at: "Charles Ponzi promised", photo: "Charles Ponzi", caption: "Ponzi's 'investment' made no real profits at all." },
          { at: "paying early investors", emoji: "👤➡️💵➡️👤", caption: "New investors' money was used to pay the old ones." },
          { at: "the whole thing collapsed", emoji: "🃏💥", caption: "Like a house of cards, it fell when new money stopped." },
          { at: "too good to be true", big: "Too good to be true?", caption: "Guarantees + big promises + hurry = warning sign!" },
        ],
      },
    ],
  },

  "money.credit": {
    hook: {
      show: [
        { photo: "Television set", caption: "Same TV, two very different final prices." },
        { at: "One paid $1,200", big: "$1,200", caption: "Sibling one paid the price on the tag." },
        { at: "still making payments two years later", emoji: "📅📅💳", caption: "Sibling two was still paying, month after month." },
        { at: "What made the difference?", emoji: "🤔📺", caption: "Same store, same TV. What happened?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Debt", caption: "Borrowed money you must pay back, plus extra." },
          { at: "the lender charges interest", photo: "Bank", caption: "Lenders like banks charge interest for every loan." },
          { at: "it works against you", emoji: "🔄💸", caption: "Now interest flows out of your pocket, not in." },
          { at: "$300 + $30 = $330", big: "$300 → $330", caption: "Borrow $300, pay back $330." },
          { at: "the price of not waiting", photo: "Hourglass", caption: "That extra $30 is what impatience costs." },
        ],
      },
      {
        show: [
          { photo: "Cash register", caption: "A credit card lets you buy at the register now, pay later." },
          { at: "pay the full balance", emoji: "✅💳", caption: "Pay it all on time and most cards charge no interest." },
          { at: "20 percent a year or more", big: "20%+ a year", caption: "Carry a balance and the interest gets expensive fast." },
          { at: "Owe $1,000", big: "$1,000 → $20 a month", caption: "About 2 percent a month, just in interest." },
          { at: "interest on the interest", photo: "File:Boys rolling snowball (Japanese art in OAW).png", caption: "The same snowball as savings, but rolling against you." },
        ],
      },
      {
        show: [
          { big: "Does it build value?", caption: "The one question to ask before you borrow." },
          { at: "a home a family will live in", emoji: "🏡🗓️", caption: "A home you'll live in for years can be worth a loan." },
          { at: "a lawn mower", emoji: "🚜💵", caption: "A mower that earns money can pay back its own loan." },
          { at: "things that lose value fast", emoji: "📱👗🏖️", caption: "Gadgets, trends and trips lose value quickly." },
          { at: "payments and interest go on", big: "Fun: weeks. Payments: years.", caption: "The thrill fades long before the bill does." },
        ],
      },
      {
        show: [
          { emoji: "📺💳📅", caption: "Sam bought now and paid, and paid, and paid." },
          { at: "His sister saved $100 a month", photo: "File:A jar of world coins.jpg", caption: "His sister filled a savings jar first." },
          { at: "1,200 / 100 = 12 months", big: "$1,200 ÷ $100 = 12 months", caption: "One year of saving, then paid in full. No debt!" },
          { at: "delayed gratification", photo: "Marshmallow", caption: "Famous test: eat one marshmallow now, or wait and get two?" },
          { at: "He that goes a borrowing", photo: "Poor Richard's Almanack", caption: "Franklin shared money wisdom in Poor Richard's Almanack." },
        ],
      },
    ],
  },
};
