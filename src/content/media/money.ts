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
  "money.budgeting": {
    hook: {
      show: [
        { emoji: "👩‍💼👨‍💼💵", caption: "Two friends, two first jobs, the same $2,800 paycheck." },
        { at: "$4,800 saved", big: "$4,800 saved", caption: "Friend one: a full year of steady saving." },
        { at: "no idea where the money went", emoji: "💸❓💳", caption: "Friend two: money gone, plus a card bill." },
        { at: "Same paycheck", emoji: "🤔📋", caption: "Same pay. One had a plan. Let's build one!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Money in − Money out", caption: "Every budget starts with two lists." },
          { at: "take-home pay", emoji: "🧾💵", caption: "Take-home pay is what's left on a paycheck after taxes." },
          { at: "babysitting or mowing money", emoji: "🧸👶🌱", caption: "Your income might be allowance or money from jobs." },
          { at: "every dollar should have a job", emoji: "💵👷", caption: "Give every dollar a job before the month starts." },
          { at: "zero-based budget", big: "Income − Plan = $0", caption: "Zero-based: no dollar is left without a plan." },
        ],
      },
      {
        show: [
          { big: "Fixed vs Flexible", caption: "Two kinds of expenses that behave very differently." },
          { at: "Rent, a phone plan", emoji: "🏢🔑", caption: "Rent is the classic fixed expense: same bill every month." },
          { at: "Flexible expenses, sometimes called", emoji: "🛒⛽🍔", caption: "Groceries, gas and eating out change month to month." },
          { at: "cut your rent in half", emoji: "🏠✂️❌", caption: "You can't shrink your rent by Friday..." },
          { at: "cook at home", emoji: "🍳🏡✅", caption: "...but you can cook at home this week." },
        ],
      },
      {
        show: [
          { big: "5 steps", caption: "Income, fixed bills, subtract, save, then flexible." },
          { at: "Grace takes home $2,800", emoji: "🧮📝", caption: "Grab a pencil and follow Grace's numbers." },
          { at: "2,800 - 1,330 = $1,470", big: "$2,800 − $1,330 = $1,470", caption: "Income minus fixed bills shows what's left." },
          { at: "She saves $400 first", emoji: "🐷➡️💵", caption: "Savings come first, before any fun money." },
          { at: "Try the sliders", emoji: "🎚️📊", caption: "Move the sliders and watch every slice change." },
        ],
      },
      {
        show: [
          { emoji: "📋🆚🧾", caption: "Plan vs. actual: the end-of-month check-up." },
          { at: "spent $340", big: "$340 − $250 = $90 over", caption: "Grace's fun line ran $90 over the plan." },
          { at: "spent only $120", big: "$40 under", caption: "But gas came in $40 under. Good news!" },
          { at: "small leak will sink", photo: "USS Constitution", caption: "A small leak can sink a great ship, Franklin warned." },
        ],
      },
    ],
  },

  "money.smart-shopping": {
    hook: {
      show: [
        { photo: "Breakfast cereal", caption: "A breakfast favorite, and a great math problem." },
        { at: "costs more", big: "$3.60 vs $5.00", caption: "The big box costs more. But is it the worse deal?" },
        { at: "eye level", emoji: "👀🥣🎁", caption: "Why is the prize cereal right at kid height? Hmm..." },
      ],
    },
    teach: [
      {
        show: [
          { big: "Price ÷ Units", caption: "Unit price: the cost of one ounce, one roll or one egg." },
          { at: "3.60 / 12 = $0.30", big: "$0.30 an ounce", caption: "Small box: 30 cents for every ounce." },
          { at: "5.00 / 20 = $0.25", big: "$0.25 an ounce", caption: "Big box: 25 cents an ounce. Cheaper per bite!" },
          { at: "goes stale", emoji: "🥣🗑️", caption: "But stale cereal in the trash is no bargain." },
          { at: "shelf tags", emoji: "🏷️🔍", caption: "Shelf tags often print the unit price in small type." },
        ],
      },
      {
        show: [
          { photo: "Supermarket", caption: "SALE signs everywhere! Time for some quick math." },
          { at: "0.25 x 40 = $10", big: "25% of $40 = $10", caption: "Turn the percent into a decimal and multiply." },
          { at: "you pay 75 percent", big: "75% × $40 = $30", caption: "Shortcut: multiply by the part you DO pay." },
          { at: "stacked discounts", big: "20% + 10% ≠ 30%", caption: "The second discount comes off the lower price." },
          { at: "would you buy it at all", emoji: "🤔🛍️", caption: "Biggest question: would you buy it without the sale?" },
        ],
      },
      {
        show: [
          { emoji: "🧠🛒", caption: "Stores study how shoppers decide." },
          { at: "Anchoring", big: "Was $80 → Now $50", caption: "Anchoring: a high 'was' price makes $50 feel cheap." },
          { at: "Charm prices", photo: "Price tag", caption: "This tag says 49.99. Charm price! It is really 50." },
          { at: "Urgency", emoji: "⏰🔥", caption: "'Today only!' rushes you before you can think." },
          { at: "Placement", photo: "Shopping cart", caption: "Treats wait at checkout. Prize cereal sits at kid height." },
        ],
      },
      {
        show: [
          { big: "Opportunity cost", caption: "The next-best thing you give up when you choose." },
          { at: "$60 on a video game", emoji: "🎮🆚⛑️", caption: "A $60 game means no $60 bike helmet." },
          { at: "practicing piano", photo: "Piano", caption: "Time has an opportunity cost too." },
          { at: "What else could this money do?", emoji: "💭💵", caption: "Ask: what else could this money do?" },
          { at: "24-hour rule", big: "Wait 24 hours", caption: "Still want it tomorrow? Then decide with a clear head." },
        ],
      },
    ],
  },

  "money.giving": {
    hook: {
      show: [
        { photo: "Benjamin Franklin", caption: "Ben Franklin: printer, inventor, saver, and giver." },
        { at: "Boston and Philadelphia", emoji: "🏙️🏙️💷", caption: "1,000 pounds for each city, loaned to young tradesmen." },
        { at: "200 years", big: "200 years", caption: "A gift built to keep growing long after he was gone." },
        { at: "Why would", emoji: "🤔🎁", caption: "Why would a careful saver give like that?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧰🏠", caption: "Money is a tool. Tools can build." },
          { at: "Aristotle", photo: "Aristotle", caption: "Aristotle counted generosity among the virtues." },
          { at: "the right amount, to the right people", big: "Right amount · Right people · Right time", caption: "Generosity is a balance you practice." },
          { at: "not giving away everything carelessly", emoji: "🧂⚖️", caption: "Not too little, not too much: just right." },
          { at: "what every dollar is for", emoji: "💵🎯", caption: "Givers see their money more clearly." },
        ],
      },
      {
        show: [
          { big: "Tithe = 1/10", caption: "An old word for a tenth." },
          { at: "Abraham gives a tenth", emoji: "📜✋", caption: "In Genesis, Abraham gives a tenth to Melchizedek." },
          { at: "a tenth of each harvest", photo: "Wheat", caption: "Ancient Israel set aside a tenth of each harvest." },
          { at: "0.10 x 50 = $5", big: "10% of $50 = $5", caption: "Income times the percent. That's it!" },
          { at: "right off the top", emoji: "🫙🎁🐷", caption: "Fill the give jar first, just like savings." },
        ],
      },
      {
        show: [
          { emoji: "❤️🧠", caption: "Wanting to help is good. Helping wisely is better." },
          { at: "what do they actually do?", photo: "Food bank", caption: "A food pantry hands out food. You can see the work." },
          { at: "how much of the money reaches the work?", emoji: "💵➡️🍞", caption: "Ask where the donations actually go." },
          { at: "does it work?", emoji: "📊✅", caption: "Look for real results you can count." },
          { at: "pressure you to give right now", emoji: "📞⚠️", caption: "Pressure to give right now? Stop and check first." },
        ],
      },
      {
        show: [
          { big: "Time · Talent · Treasure", caption: "Three kinds of gifts. Everyone has some." },
          { at: "volunteering at a food bank", emoji: "🙋🥫", caption: "Time: showing up to help." },
          { at: "tutoring a younger kid", emoji: "📚🧒", caption: "Talent: using a skill you have for others." },
          { at: "your give jar", emoji: "🫙🧥", caption: "Treasure: money or things, like outgrown coats." },
          { at: "start a library", photo: "Pennsylvania Hospital", caption: "Franklin helped found Pennsylvania Hospital in Philadelphia." },
        ],
      },
    ],
  },

  "money.taxes": {
    hook: {
      show: [
        { emoji: "👕🏷️💵", caption: "A $20 shirt, and exactly $20 saved." },
        { at: "$21.40", big: "$21.40", caption: "The register says more than the tag!" },
        { at: "where is it going", emoji: "🤔🏛️", caption: "Where does the extra money go? Let's find out." },
      ],
    },
    teach: [
      {
        show: [
          { big: "Tax", caption: "Money people must pay to the government, by law." },
          { at: "roads and bridges", photo: "Highway", caption: "Streets and highways are built and repaired with tax money." },
          { at: "fire departments", emoji: "🚒🏫⚖️", caption: "Fire trucks, public schools, courts and more." },
          { at: "lay and collect taxes", big: "Article I, Section 8", caption: "The Constitution gives Congress the power to tax." },
          { at: "In 1773", photo: "Boston Tea Party", caption: "1773: colonists dumped tea in Boston Harbor in protest." },
        ],
      },
      {
        show: [
          { emoji: "🧾🛍️", caption: "Sales tax shows up on your receipt." },
          { at: "set by states", emoji: "🗺️📍", caption: "The rate depends on your state and city." },
          { at: "0.07 x 20 = $1.40", big: "7% × $20 = $1.40", caption: "Turn the rate into a decimal and multiply." },
          { at: "20 + 1.40 = $21.40", big: "$20 + $1.40 = $21.40", caption: "Add the tax to the price for the total." },
          { at: "multiply by 1.07", big: "$20 × 1.07 = $21.40", caption: "Shortcut: find the total in one step." },
        ],
      },
      {
        show: [
          { big: "1913", caption: "The Sixteenth Amendment allowed a federal income tax." },
          { at: "employer withholds", emoji: "💵✋", caption: "Your employer holds back tax from each paycheck." },
          { at: "6.2 percent for Social Security", big: "6.2% + 1.45%", caption: "Social Security and Medicare payroll taxes." },
          { at: "your gross pay", big: "Gross − Taxes = Net", caption: "Net pay is what actually lands in your account." },
          { at: "April 15", photo: "Form 1040", caption: "Each spring, people file a tax return for the year." },
        ],
      },
      {
        show: [
          { big: "Brackets", caption: "Slices of income taxed at different rates." },
          { at: "made-up, simple example", emoji: "🧪📊", caption: "A pretend example to see how brackets work." },
          { at: "first $10,000 is taxed at 10 percent", big: "First $10,000 → 10%", caption: "Every dollar above $10,000 → 20%." },
          { at: "Total tax: $2,000", big: "$1,000 + $1,000 = $2,000", caption: "Each slice is taxed at its own rate." },
          { at: "Only the dollars above the line", emoji: "🪣💧🪣", caption: "Only the spill-over gets the higher rate." },
        ],
      },
    ],
  },
};
