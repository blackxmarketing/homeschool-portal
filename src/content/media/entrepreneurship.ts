import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the entrepreneurship lessons, keyed by lesson id. */
export const entrepreneurshipMedia: CourseMedia = {
  "business.problems": {
    hook: {
      show: [
        { caption: "Kitchens are busy places, and small cuts happen a lot.", emoji: "🔪🥕🩸" },
        { at: "squares of gauze", caption: "Gauze plus tape: two ordinary things put together in a new way.", emoji: "🩹✂️" },
        { at: "became the Band-Aid", caption: "One person's problem turned into something millions of people use.", emoji: "🩹🌎" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Every shop on a street is solving somebody's problem.", photo: "Grocery store" },
          { at: "The pizza place solves", caption: "Hungry and tired? Somebody else does the cooking.", emoji: "😩🍕😋" },
          { at: "The car wash solves", caption: "A dirty car becomes a clean one, and you save your time.", photo: "Car wash" },
          { at: "An entrepreneur is a person", caption: "Spot it, build it, offer it.", emoji: "👀➡️🛠️➡️🤝" },
          { at: "Whose problem am I solving?", caption: "Ask this question before you ask what to sell.", big: "Whose problem?" },
        ],
      },
      {
        show: [
          { caption: "Ideas hide inside the things people say every day.", emoji: "💬💡" },
          { at: "I wish somebody would", caption: "A sigh or an 'I wish...' tells you about a problem.", big: "\"I wish somebody would...\"" },
          { at: "the trash cans are so heavy", caption: "Heavy trash cans could be a job for a helpful neighbor kid.", emoji: "🗑️💪😓" },
          { at: "carrying a small notebook", caption: "Write down every complaint and wish you hear for one week.", photo: "Notebook" },
        ],
      },
      {
        show: [
          { caption: "Mary Anderson, an inventor who noticed a problem other people ignored.", photo: "Mary Anderson (inventor)" },
          { at: "rode a streetcar in New York City", caption: "Streetcars like this one ran on rails through city streets.", photo: "File:StreetcarsNYC23rdStVanityFair1903.JPG" },
          { at: "Sleet kept piling up", caption: "Icy sleet on the window meant the driver could hardly see.", emoji: "🌨️🪟🥶" },
          { at: "received a patent in 1903", caption: "A patent says: this invention is officially yours.", big: "1903" },
          { at: "nearly every car has windshield wipers", caption: "Her idea still swipes across windshields over 100 years later.", photo: "Windscreen wiper" },
        ],
      },
      {
        show: [
          { caption: "A good idea has to fit the person who will run it.", emoji: "🧩🙋" },
          { at: "First, is it real?", caption: "Test 1: do other people really have this problem?", big: "1. Is it real?" },
          { at: "would they pay a little", caption: "Test 2: is fixing it worth a little money to them?", big: "2. Would they pay?" },
          { at: "can you solve it", caption: "Test 3: can you do it with your skills, time and a parent's okay?", big: "3. Can you do it?" },
          { at: "Walking a neighbor's friendly dog", caption: "Dog walking can pass all three tests.", photo: "Dog walking" },
        ],
      },
    ],
  },

  "business.customers": {
    hook: {
      show: [
        { caption: "Thomas Edison became one of the most famous inventors ever.", photo: "Thomas Edison" },
        { at: "very first patented invention", caption: "His first patent was a machine for counting votes.", big: "Patent #1" },
        { at: "could not sell a single one", caption: "It worked perfectly. Nobody bought it. Why?", emoji: "⚙️✅🛒❌" },
      ],
      watch: { youtube: "HQ2RJC1a8T0", title: "Thomas Edison - Inventor | Mini Bio | BIO", channel: "Biography" },
    },
    teach: [
      {
        show: [
          { caption: "Your customer has the problem and would pay to solve it.", emoji: "🙋‍♀️💵" },
          { at: "electric vote recorder", caption: "Edison's vote recorder let lawmakers vote with a switch.", photo: "File:Edisonsfirstpatent.png" },
          { at: "the lawmakers liked slow voting", caption: "Lawmakers wanted time to argue, so a fast machine wasn't welcome.", emoji: "🏛️🗣️⏳" },
          { at: "A perfect machine, zero customers", caption: "Great invention, wrong customer.", big: "0 customers" },
          { at: "only invent things people actually wanted", caption: "Edison's new rule: find out what people want first.", emoji: "🔍➡️💡" },
        ],
      },
      {
        show: [
          { caption: "A customer interview is a friendly conversation with questions.", emoji: "🗣️👂📝" },
          { at: "open-ended questions", caption: "Open-ended questions can't be answered with just yes or no.", big: "Not yes/no" },
          { at: "most kind people say 'Sure!'", caption: "Polite people say yes to be nice, so you learn nothing.", emoji: "🙂👍🤷" },
          { at: "Tell me about the last time", caption: "Ask about real things people did, not what they might do someday.", photo: "Dog walking" },
          { at: "four or five questions", caption: "Have a few good questions ready before you start.", big: "4-5 questions" },
        ],
      },
      {
        show: [
          { caption: "Great entrepreneurs listen more than they talk.", emoji: "👂👂🤐" },
          { at: "Your job is to learn", caption: "In an interview you are a learner, not a salesperson.", big: "Learn, don't sell" },
          { at: "write down their exact words", caption: "Exact words hold feelings and surprises you'd forget later.", photo: "Notebook" },
          { at: "I feel terrible leaving Biscuit", caption: "The real problem was worry about the dog, not just a walk.", photo: "Golden Retriever" },
          { at: "always have a parent with you", caption: "Only interview people you know, with a parent along.", emoji: "👨‍👧✅" },
        ],
      },
      {
        show: [
          { caption: "A surprise answer is a valuable clue.", emoji: "😮💎" },
          { at: "someone to scoop the yard", caption: "She wanted yard help, not dog walks. Now you know!", emoji: "🐕🏡🧹" },
          { at: "sometimes called a pivot", caption: "A pivot means turning your plan toward what customers want.", big: "Pivot ↪️" },
          { at: "things you hear again and again", caption: "When several people say the same thing, pay attention.", emoji: "🗣️🗣️🗣️➡️📌" },
        ],
      },
    ],
  },

  "business.pricing": {
    hook: {
      show: [
        { caption: "A hot day and a lemonade stand: what could go wrong?", photo: "Lemonade stand" },
        { at: "50 cups of lemonade at 50 cents each", caption: "50 cups × $0.50 = $25 coming in.", big: "50 × $0.50 = $25" },
        { at: "the lemons, sugar, cups, ice", caption: "All those supplies cost money too.", emoji: "🍋🍬🥤🧊" },
        { at: "she lost $10", caption: "Selling a lot doesn't help if your costs are even bigger.", big: "−$10" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Cost per unit: what it costs you to make just one.", emoji: "🍪❓💵" },
          { at: "add up everything you spend", caption: "Count every ingredient and every little bag.", photo: "Chocolate chip cookie" },
          { at: "all of it costs $8", caption: "One batch costs $8 and makes 20 cookies.", big: "$8 ÷ 20" },
          { at: "equals $0.40 per cookie", caption: "Each cookie costs you 40 cents to make.", big: "$0.40 each" },
          { at: "Knowing this number is your superpower", caption: "Know your cost, and you can tell if a price earns money.", emoji: "🦸🧮" },
        ],
      },
      {
        show: [
          { caption: "Price is what the customer pays you.", emoji: "🙋💵➡️🍪" },
          { at: "The formula is price minus cost", caption: "This is the money you keep from each sale.", big: "Profit = Price − Cost" },
          { at: "your profit per cookie", caption: "Each cookie sold puts 60 cents in your pocket.", big: "$1.00 − $0.40 = $0.60" },
          { at: "20 times $0.60", caption: "Twenty cookies, sixty cents each.", big: "20 × $0.60 = $12" },
          { at: "below the cost", caption: "Price below cost means you lose money on every sale!", emoji: "📉😬" },
        ],
      },
      {
        show: [
          { caption: "Startup costs are paid once, no matter how much you sell.", emoji: "🪧🖍️🧺" },
          { at: "might cost $12", caption: "Sign, markers and tablecloth: a one-time $12.", big: "$12 startup" },
          { at: "Divide startup costs by profit per unit", caption: "This tells you how many sales pay back your startup costs.", big: "$12 ÷ $0.60 = 20" },
          { at: "That's your break-even point", caption: "Break-even: no loss, no profit, exactly zero.", emoji: "⚖️" },
          { at: "Cookie number 21", caption: "From here on, every sale is real profit!", big: "Cookie #21 🎉" },
        ],
      },
      {
        show: [
          { caption: "Three checks for choosing a smart price.", emoji: "🏷️✅✅✅" },
          { at: "higher than your cost per unit", caption: "Check 1: price must be above cost.", big: "Price > Cost" },
          { at: "what similar products sell for nearby", caption: "Check 2: look at what others nearby charge.", photo: "Farmers' market" },
          { at: "what customers told you in interviews", caption: "Check 3: remember what customers said the fix is worth.", emoji: "🗣️💭💵" },
          { at: "Milton Hershey's first candy business failed", caption: "Milton Hershey failed more than once before chocolate success.", photo: "Milton S. Hershey" },
        ],
      },
    ],
  },

  "business.pitch": {
    hook: {
      show: [
        { caption: "Edison was ready to show the world his electric light.", photo: "Incandescent light bulb" },
        { at: "Menlo Park, New Jersey", caption: "His laboratory at Menlo Park, rebuilt today in a museum.", photo: "File:Menlo Park Laboratory.JPG" },
        { at: "crowds came by train", caption: "People traveled just to see the lights for themselves.", emoji: "🚂👀💡" },
        { at: "see with their own eyes", caption: "Showing can be more powerful than telling.", big: "Show > Tell" },
      ],
      watch: { youtube: "XGMNMJdQ0JY", title: "Edison's Electric Light", channel: "American Experience | PBS" },
    },
    teach: [
      {
        show: [
          { caption: "Could you explain your business before the doors open?", photo: "Elevator" },
          { at: "The ride lasts about a minute", caption: "About one minute: that's all the time you get.", big: "⏱️ 60 seconds" },
          { at: "elevator pitch", caption: "An elevator pitch is a short, clear explanation of your idea.", emoji: "🛗🗣️💡" },
          { at: "plain words, not fancy ones", caption: "Talk like a friend, not like a TV commercial.", emoji: "😊💬" },
          { at: "what you do, who it's for", caption: "What you do. Who it's for. How to say yes.", big: "What · Who · How" },
        ],
      },
      {
        show: [
          { caption: "A strong pitch has four parts, in order.", emoji: "1️⃣2️⃣3️⃣4️⃣" },
          { at: "First, the problem", caption: "Problem → Solution → Customer → Why you.", big: "Problem → Solution → Customer → Why you" },
          { at: "people care about their own problems", caption: "Start with their problem and they'll lean in to listen.", emoji: "😟➡️👂" },
          { at: "dogs sit home alone", caption: "The example starts with a lonely dog at home.", photo: "Golden Retriever" },
          { at: "30-minute after-school walks for $5", caption: "A clear offer with a clear price.", big: "30 min · $5" },
        ],
      },
      {
        show: [
          { caption: "Saying 'I'm the best' doesn't convince anybody.", emoji: "🗯️🤷" },
          { at: "Proof is a real fact", caption: "Proof is a fact that shows you can do the job.", big: "Proof > Bragging" },
          { at: "every day for two years", caption: "Two years of daily dog walks is real proof.", photo: "Dog walking" },
          { at: "Real numbers help too", caption: "Prices and customer counts are proof people can check.", emoji: "🔢✅" },
          { at: "do a job for a family friend", caption: "No proof yet? Do one small job and ask for a kind word.", emoji: "🤝⭐" },
        ],
      },
      {
        show: [
          { caption: "Edison's lights did the talking for him.", photo: "Thomas Edison" },
          { at: "bring a sample, a photo", caption: "A sample lets people taste, touch or see your idea.", emoji: "🍪🧺👀" },
          { at: "Say it to a mirror", caption: "Mirror, then pet, then family: practice out loud.", emoji: "🪞🐶👨‍👩‍👧" },
          { at: "Stand tall, look people in the eye", caption: "Stand tall, smile, and speak slowly.", emoji: "🧍😊🐢" },
          { at: "by the fifth try", caption: "It gets easier every time you practice.", big: "Try #5 💪" },
        ],
      },
    ],
  },

  "business.launch": {
    hook: {
      show: [
        { caption: "Young Edison was a hard-working kid with a train job.", photo: "File:Young Thomas Edison.jpg" },
        { at: "passengers on a train", caption: "He sold newspapers and snacks to train riders.", photo: "File:February 23rd 1908 Boys Selling Newspapers on Brooklyn Bridge.jpg" },
        { at: "he brought extra newspapers", caption: "Big news meant more buyers, so he brought more papers.", emoji: "📰📰📰🚂" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Launch day: the first day you actually sell.", photo: "Lemonade stand" },
          { at: "selling is not tricking people", caption: "Selling means helping someone get what they want.", big: "Selling = Helping" },
          { at: "a thirsty person", caption: "A thirsty customer and a cold drink: everybody wins.", emoji: "🥵🥤😊" },
          { at: "Fresh cookies, a dollar each", caption: "Say what you sell and the price, clearly and kindly.", emoji: "👋🍪💵" },
          { at: "thank them anyway", caption: "A polite 'no thanks' can become a 'yes' next week.", emoji: "🙏😊" },
        ],
      },
      {
        show: [
          { caption: "Great service makes customers want to come back.", emoji: "😊🔁" },
          { at: "be on time", caption: "Be on time and do exactly what you promised.", emoji: "⏰✅" },
          { at: "walk for 30 minutes, not 20", caption: "Promised 30 minutes? Deliver 30 minutes.", big: "30 min means 30 min" },
          { at: "give a refund without arguing", caption: "Fixing a mistake builds trust worth more than a cookie.", emoji: "🍪💔➡️💵🤝" },
          { at: "your best advertising", caption: "Happy customers tell their friends.", emoji: "😊🗣️👫👫" },
        ],
      },
      {
        show: [
          { caption: "Honesty is the foundation every business is built on.", emoji: "🧱🏠" },
          { at: "If your cookies contain nuts", caption: "Always say what's inside. Allergies are serious.", emoji: "🥜⚠️" },
          { at: "Count change carefully and out loud", caption: "Count change out loud so the customer sees it's right.", photo: "Coin" },
          { at: "give the money back", caption: "Overpaid by accident? Give it back, every time.", emoji: "💵↩️😊" },
          { at: "One dishonest moment", caption: "Trust takes months to build and a moment to break.", big: "Trust is everything" },
        ],
      },
      {
        show: [
          { caption: "Track every sale: tiny habit, huge payoff.", emoji: "📒✏️" },
          { at: "Keep a notebook", caption: "Old shops tracked every sale with a cash register like this one.", photo: "Cash register" },
          { at: "what you sold, how many", caption: "What you sold, how many, how much money.", big: "What · How many · $" },
          { at: "add up the totals", caption: "Add it all up at the end of the day.", emoji: "➕🧮" },
          { at: "you're only guessing", caption: "Without records, you're only guessing.", emoji: "🤔❓" },
        ],
      },
    ],
  },

  "business.profit": {
    hook: {
      show: [
        { caption: "A light bulb needs a thin filament that glows without burning up.", photo: "Incandescent light bulb" },
        { at: "tested thousands of materials", caption: "Thread, plants and more: test after test after test.", emoji: "🧵🌿🔬" },
        { at: "carbonized bamboo worked well", caption: "Bamboo, baked into carbon, finally made bulbs last.", photo: "Bamboo" },
        { at: "Your launch-day numbers", caption: "Your numbers can teach you too.", emoji: "📊💡" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "After launch day, real entrepreneurs check the numbers.", emoji: "🧮🔍" },
          { at: "Revenue is all the money", caption: "Revenue: all the money customers paid you.", big: "Revenue 💵" },
          { at: "Costs are all the money you spent", caption: "Costs: everything you spent to run the business.", big: "Costs 🛒" },
          { at: "revenue minus costs", caption: "This one formula tells you how you did.", big: "Profit = Revenue − Costs" },
          { at: "margin", caption: "Margin: how much of each dollar you kept as profit.", emoji: "💵✂️🪙" },
        ],
      },
      {
        show: [
          { caption: "A P&L is one equation written out neatly.", big: "P&L" },
          { at: "sold 34 at $1.00 each", caption: "34 cookies sold at $1.00 each.", big: "Revenue: $34" },
          { at: "for a total of $28", caption: "$16 for ingredients + $12 for the sign and tablecloth.", big: "Costs: $28" },
          { at: "$34 minus $28 equals $6", caption: "Small, but real. And the sign is yours to reuse!", big: "Profit: $6" },
        ],
      },
      {
        show: [
          { caption: "Your P&L tells a story about your day.", emoji: "📖📊" },
          { at: "6 didn't sell", caption: "40 baked, 34 sold, 6 left over.", emoji: "🍪🍪🍪🍪🍪🍪" },
          { at: "cost you $2.40", caption: "6 leftover cookies × $0.40 each.", big: "6 × $0.40 = $2.40" },
          { at: "sell at a busier spot", caption: "A busier spot means more customers walking by.", photo: "Farmers' market" },
          { at: "That's double your real profit", caption: "Selling all 40 would have made $12, not $6.", big: "$6 → $12" },
        ],
      },
      {
        show: [
          { caption: "Three questions: What worked? What didn't? What will I change?", emoji: "✅❌🔄" },
          { at: "Be honest, even about mistakes", caption: "Honest answers are how you get better.", emoji: "🪞🙂" },
          { at: "carbonized bamboo worked well", caption: "Edison's many failed tests led to a bulb that lasted.", photo: "Thomas Edison" },
          { at: "Reinvesting means", caption: "Reinvest: put some profit back into your business.", emoji: "💵➡️🌱" },
          { at: "save some, reinvest some", caption: "A wise plan for your profit.", big: "Save · Reinvest · Improve" },
        ],
      },
    ],
  },

  "business.marketing": {
    hook: {
      show: [
        { caption: "Milton Hershey built one of America's best-known chocolate companies.", photo: "Milton S. Hershey" },
        { at: "until 1970", caption: "For decades, happy customers did most of the talking.", big: "1970" },
        { at: "nobody can buy it", caption: "Nobody knows about it? Nobody buys it.", emoji: "🤫🍪🛒❌" },
        { at: "the right people", caption: "Today: how to tell the right people, honestly.", emoji: "📣🎯" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Marketing: telling the right customers, clearly and honestly.", emoji: "📣🎯" },
          { at: "who has the problem I solve", caption: "Who has the problem, and where can you find them?", big: "Who? Where?" },
          { at: "Trying to talk to everybody", caption: "Talk to everybody, and nobody really listens.", emoji: "🗣️👥🙉" },
          { at: "owns a beagle", caption: "Picture one real customer, like a neighbor with a beagle.", photo: "Beagle" },
        ],
      },
      {
        show: [
          { caption: "Your message is what you say to customers.", emoji: "💬🪧" },
          { at: "Why should I care?", caption: "Three questions: What is it? Why care? How do I get it?", big: "What · Why · How" },
          { at: "Best cookies ever", caption: "Exciting, but it doesn't tell anyone anything useful.", big: "Best cookies ever!!!" },
          { at: "Fresh-baked cookies, $1 each", caption: "What, price, when, where: now a hungry person knows what to do.", photo: "Chocolate chip cookie" },
          { at: "in five seconds", caption: "The five-second test: can someone get it at a glance?", big: "⏱️ 5 seconds" },
        ],
      },
      {
        show: [
          { caption: "The channel is how your message travels.", emoji: "📣➡️👀" },
          { at: "a flyer on a community board", caption: "A community board can carry your flyer, with permission.", emoji: "📌📄📄📄" },
          { at: "word of mouth", caption: "Word of mouth: happy customers telling friends.", emoji: "😊🗣️👫" },
          { at: "go where your customers already are", caption: "The rule: go where your customers already are.", big: "Go where they are" },
          { at: "How did you hear about us?", caption: "Ask, keep a tally, and spend time on what works.", emoji: "📝✅✅✅" },
        ],
      },
      {
        show: [
          { caption: "Advertising asks people to buy.", emoji: "🪧📢" },
          { at: "Good advertising is honest", caption: "Tell the truth: what it is, what it costs, what's included.", big: "Honest ads" },
          { at: "hiding an extra fee", caption: "Tricks might win one sale, but customers never come back.", emoji: "🙈💸😠" },
          { at: "Federal Trade Commission", caption: "In the U.S., laws require ads to be truthful.", emoji: "⚖️📜" },
          { at: "as long as every fact is true", caption: "Be cheerful and excited, and keep every fact true.", emoji: "😄✅" },
        ],
      },
    ],
  },

  "business.sales-service": {
    hook: {
      show: [
        { caption: "Leon Leonwood Bean, an outdoorsman and shopkeeper from Maine.", photo: "Leon Leonwood Bean" },
        { at: "100 pairs", caption: "He sold 100 pairs of his new boots by mail.", big: "100 pairs" },
        { at: "90 pairs came back broken", caption: "Then 90 of them came back!", big: "90 returned 😬" },
        { at: "What do you think he did?", caption: "What would YOU do?", emoji: "🤔🥾" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Selling well starts with listening.", emoji: "👂😊" },
          { at: "Who is it for?", caption: "Friendly, open questions help you understand.", big: "Who is it for?" },
          { at: "A pushy seller", caption: "Pushy sellers push the priciest thing.", emoji: "💰👉😣" },
          { at: "A helpful seller asks", caption: "Helpful sellers ask, then suggest what fits.", photo: "Bracelet" },
          { at: "comes back", caption: "Trust today brings customers back tomorrow.", emoji: "🔁🤝" },
        ],
      },
      {
        show: [
          { caption: "A muddy spot after a car wash? Time to make it right.", photo: "Car wash" },
          { at: "First, listen", caption: "Step 1: listen to the whole complaint.", big: "1. Listen 👂" },
          { at: "Second, apologize", caption: "Step 2: say sorry, and mean it.", big: "2. Apologize 🙏" },
          { at: "Third, fix it", caption: "Step 3: redo, replace, or refund.", big: "3. Fix 🔧" },
          { at: "Fourth, thank", caption: "Step 4: thank them for telling you.", big: "4. Thank 😊" },
        ],
      },
      {
        show: [
          { caption: "Loyal customers come back again and again.", emoji: "🔁😊" },
          { at: "$6 a week for dog walks", caption: "One loyal dog-walking customer...", photo: "Dog walking" },
          { at: "or $72", caption: "...adds up week after week.", big: "$6 × 12 = $72" },
          { at: "a free $6 walk", caption: "A free walk to fix a mistake is a smart trade.", emoji: "🐕🎁" },
          { at: "hope to see for years", caption: "Treat every customer like someone you'll see for years.", emoji: "🤝📅" },
        ],
      },
      {
        show: [
          { caption: "A review is a customer's honest opinion.", big: "⭐⭐⭐⭐⭐" },
          { at: "people trust their friends", caption: "People trust friends more than any sign.", emoji: "👫💬👍" },
          { at: "Treat complaints as free advice", caption: "Complaints are free advice about what to fix.", emoji: "📝🔧" },
          { at: "add up all the stars", caption: "Average rating: add the stars, divide by the number of reviews.", big: "Total ÷ Reviews" },
          { at: "never write fake reviews", caption: "Fake reviews are lies. Never write or buy them.", emoji: "🚫⭐" },
        ],
      },
    ],
  },

  "business.teams": {
    hook: {
      show: [
        { caption: "Thomas Edison: a famous inventor, but not a lone one.", photo: "Thomas Edison" },
        { at: "John Kruesi built the first phonograph", caption: "The phonograph could record sound and play it back.", photo: "Phonograph" },
        { at: "nicknamed the muckers", caption: "His team called themselves the muckers.", emoji: "👷🛠️🔬📐" },
        { at: "all alone", caption: "Could one person build a big business alone?", emoji: "🤔🧍" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Some jobs are too big for one person.", emoji: "🧍➡️👥" },
          { at: "Menlo Park, New Jersey", caption: "Edison's Menlo Park lab, rebuilt today in a museum.", photo: "File:Menlo Park Laboratory.JPG" },
          { at: "Charles Batchelor", caption: "Batchelor ran experiments; Kruesi built the machines.", emoji: "🔬🛠️" },
          { at: "A team is a group", caption: "A team: one goal, everyone doing a part.", big: "One goal, many parts" },
          { at: "different strengths", caption: "Different strengths add up to more.", emoji: "💪🧠🎨➕" },
        ],
      },
      {
        show: [
          { caption: "A role is a job that one person owns.", big: "Role = my job" },
          { at: "At a car wash", caption: "Greeter, washers, dryer, cashier: each has a job.", photo: "Car wash" },
          { at: "nothing is forgotten", caption: "Clear roles: fast work, nothing forgotten.", emoji: "✅✅✅✅" },
          { at: "When roles are fuzzy", caption: "Fuzzy roles: two cashiers and nobody drying.", emoji: "💵💵🚗💧" },
          { at: "match it to the person", caption: "Match each role to someone's strengths.", emoji: "🧩🙋" },
        ],
      },
      {
        show: [
          { caption: "Delegate: hand a task to someone else.", emoji: "🤲📋" },
          { at: "Choose the right person", caption: "Choose the person, explain the task, give them the tools...", big: "Choose · Explain · Equip" },
          { at: "Check in partway through", caption: "...then check in to help, and say thanks.", big: "Check in · Thank" },
          { at: "you're still responsible", caption: "You hand off the task, not the responsibility.", big: "The leader owns it" },
          { at: "That's on me", caption: "A good leader owns mistakes and helps fix them.", emoji: "🙋🔧" },
        ],
      },
      {
        show: [
          { caption: "Pay helpers fairly, every time.", emoji: "🤝💵" },
          { at: "write it down", caption: "Agree on the pay first, and write it down.", emoji: "📝✍️" },
          { at: "by the hour", caption: "By the hour, by the job, or a share of the profit.", big: "Hour · Job · Share" },
          { at: "even on a slow day", caption: "Pay exactly what you promised, even on a slow day.", photo: "Coin" },
          { at: "3 times $6, or $18", caption: "3 hours at $6 an hour.", big: "3 × $6 = $18" },
        ],
      },
    ],
  },

  "business.bookkeeping": {
    hook: {
      show: [
        { caption: "Venice, a city of canals and busy merchants.", photo: "Venice" },
        { at: "Luca Pacioli", caption: "A mathematician wrote down the merchants' method.", emoji: "👨‍🏫📖" },
        { at: "every coin coming in and going out", caption: "Every coin in, every coin out, written down.", emoji: "🪙➡️📒" },
        { at: "More than 500 years later", caption: "Businesses still use the idea today.", big: "500+ years" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Bookkeeping: write down every dollar in and out.", emoji: "💵📒✏️" },
          { at: "In 1494", caption: "Pacioli's book was published in Venice.", big: "1494" },
          { at: "father of accounting", caption: "Luca Pacioli, often called the father of accounting.", photo: "Luca Pacioli" },
          { at: "Why does it matter?", caption: "Records show the truth: real profit, mistakes, honesty.", emoji: "🔍✅🤝" },
        ],
      },
      {
        show: [
          { caption: "A ledger: a book with columns for your money.", emoji: "📒📏✏️" },
          { at: "five columns", caption: "Date · What happened · Money in · Money out · Balance", big: "5 columns" },
          { at: "The balance is how much", caption: "The balance: what the business has after each line.", emoji: "💰" },
          { at: "so the balance is $35", caption: "Start with $20, plus $15 in.", big: "$20 + $15 = $35" },
          { at: "it drops to $29", caption: "Minus $6 out for flour.", big: "$35 − $6 = $29" },
        ],
      },
      {
        show: [
          { caption: "Good habits keep your records true.", emoji: "📒✅" },
          { at: "the same day", caption: "Write each entry the same day.", emoji: "📅✏️" },
          { at: "They keep receipts", caption: "Receipts prove what you bought and what you paid.", photo: "Receipt" },
          { at: "separate from their own", caption: "Business money stays separate from spending money.", emoji: "🏪💵 ↔️ 🐷" },
          { at: "something is $5 off", caption: "Ledger $42, box $37: find the missing $5 now.", big: "$42 ≠ $37" },
        ],
      },
      {
        show: [
          { caption: "Profit and cash are NOT the same thing.", big: "Profit ≠ Cash" },
          { at: "Profit is what you earned", caption: "Profit: what you earned, revenue minus costs.", emoji: "📈💵" },
          { at: "Cash is the money", caption: "Cash: the money actually in your hand right now.", photo: "Piggy bank" },
          { at: "owes you $10", caption: "Earned but not paid yet: profit without cash.", emoji: "🍂🧹⏳" },
          { at: "lends you $5", caption: "A loan: more cash, but no profit. Pay it back!", emoji: "👩💵↩️" },
        ],
      },
    ],
  },
};
