import type { Course } from "./types";
import { entrepreneurship } from "./entrepreneurship";

/**
 * Kid Business: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const business45: Course = {
  ...entrepreneurship,
  id: "business-45",
  band: "sprout",
  title: "Kid Business",
  blurb: "Business for grades 4-5: what a business is, customers, costs and profit.",
  lessons: [
    // ------------------------------------------------------------------
    {
      id: "business-45.goods-services",
      title: "What Is a Business?",
      minutes: 25,
      stage: "grammar",
      read: `A business is a way of earning money by giving people something they want or need. The bakery down the street gives people bread. The barber gives people haircuts. A kid with a lemonade stand gives thirsty neighbors a cold drink on a hot day. In return, the customers pay money. Both sides are happy: the customer gets what they wanted, and the business owner earns money for their work.

Businesses sell two kinds of things. Goods are things you can hold, touch and take home. Lemonade, cookies, a bracelet, a toy and a loaf of bread are all goods. Services are jobs you do for someone. Walking a dog, washing a car, raking leaves and cutting hair are all services. When you buy a service, you don't carry a thing home. You pay someone to do work for you.

Here is a quick test. After you buy it, could you put it in a bag? If yes, it is a good. If no, it is probably a service.

Some businesses sell both. A pizza shop sells pizza, which is a good, and it may also bring the pizza to your door, which is a service. A bike shop sells new bikes and also fixes old ones.

Kids can run real businesses too. A bake sale sells goods. Dog walking, plant watering and pulling weeds are services. Before you start, ask yourself three questions. What will I offer? Is it a good or a service? Who will want it?

Every business, big or small, starts with the same simple idea: find something people want, and offer it in a way that makes them glad they paid.`,
      keyIdeas: [
        "A business gives people something they want, and they pay money for it.",
        "Goods are things you can hold. Services are jobs you do for someone.",
        "Some businesses sell both goods and services.",
      ],
      hook: {
        text: "Picture three kids on one summer Saturday. One sells lemonade from a table in her yard. One walks a neighbor's dog around the block. One sells beaded bracelets at a craft fair. They are doing very different things, but all three are running a business. What do they have in common?",
      },
      teach: [
        {
          title: "A business trades for money",
          teach:
            "A business is a way of earning money by giving people something they want or need. The bakery gives people bread. The barber gives people haircuts. A kid's lemonade stand gives thirsty neighbors a cold drink on a hot day. In return, the customer pays money. A good trade makes both sides happy. The customer gets what they wanted, and the owner earns money for their work.",
          visual: {
            type: "flip",
            cards: [
              { front: "Business", back: "A way of earning money by giving people something they want or need." },
              { front: "Customer", back: "The person who pays to get what the business offers." },
              { front: "Owner", back: "The person who runs the business and earns the money." },
              { front: "A good trade", back: "Both sides are glad: the customer gets what they wanted, and the owner gets paid." },
            ],
          },
          probe: {
            type: "cloze",
            text: "At Lily's lemonade stand, a thirsty neighbor gets a cold {0}, and Lily gets {1}. The neighbor who pays is the {2}.",
            blanks: [
              { answers: ["lemonade", "drink"] },
              { answers: ["money", "dollars", "paid"] },
              { answers: ["customer", "buyer"] },
            ],
            bank: ["lemonade", "money", "customer", "owner", "homework", "stickers"],
            hint: "Think about the trade: what does each side get? And what do we call the person who pays?",
            mistakes: [
              { match: "owner", coach: "Lily is the owner because she runs the stand. What do we call the person who pays?" },
              { match: "homework", coach: "Nobody trades homework for lemonade! What does Lily get for her work?" },
              { match: "stickers", coach: "Lily's business earns something else. What do customers hand over?" },
            ],
            seconds: 30,
          },
          think: {
            q: "What happens in a good business trade?",
            choices: [
              "Only the owner is happy",
              "Both the customer and the owner are glad",
              "The customer pays and gets nothing",
              "Nobody pays any money",
            ],
            answer: 1,
            why: "In a good trade, the customer gets what they wanted and the owner earns money, so both are glad.",
            hints: [
              "If only the owner is happy, the customer won't come back. Who else should be glad?",
              "",
              "That wouldn't be fair! The customer should get something they want.",
              "A business earns money. Somebody does pay.",
            ],
          },
          approaches: {
            analogy:
              "A business trade is like trading lunch snacks with a friend. You give an apple, your friend gives crackers, and you both walk away happy because you each got something you wanted.",
            example:
              "Sam bakes 12 cookies and sells them for $1 each. Mrs. Lee buys 2 cookies for $2. Mrs. Lee gets a treat for her grandkids, and Sam gets $2 for his baking. Both are happy, so it's a good trade.",
            simpler: {
              q: "Who pays money in a business trade?",
              choices: ["The customer", "The owner", "The sign"],
              answer: 0,
              why: "The customer pays the owner to get what the business offers.",
              hints: [
                "",
                "The owner receives the money. Who hands it over?",
                "A sign can't pay! Think about the person buying.",
              ],
            },
          },
        },
        {
          title: "Goods: things you can hold",
          teach:
            "Businesses sell two kinds of things. The first kind is goods. Goods are things you can hold, touch and take home. Lemonade is a good. So are cookies, bracelets, books, toys and a loaf of bread. Here is a quick test: after you buy it, could you put it in a bag? If the answer is yes, it's a good. A bake sale and a craft table both sell goods.",
          visual: {
            type: "hotspots",
            title: "A bake sale table",
            center: "🧁",
            spots: [
              { label: "Cupcakes", icon: "🧁", detail: "A good: you can hold a cupcake and take it home." },
              { label: "Cookies", icon: "🍪", detail: "A good: cookies fit right in a bag." },
              { label: "Lemonade", icon: "🍋", detail: "A good: you can hold the cup in your hand." },
              { label: "Bracelets", icon: "📿", detail: "A good: you can wear it home." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every item that is a GOOD (something you can hold and take home).",
            sentences: [
              "A cup of lemonade",
              "A dog walk around the block",
              "A beaded bracelet",
              "Raking a neighbor's leaves",
              "A box of cookies",
              "Washing a car",
            ],
            correct: [0, 2, 4],
            hint: "Use the bag test: could you put it in a bag and carry it home?",
            mistakes: [
              { match: "Tapped a job like the dog walk", coach: "Can you put a dog walk in a bag? No. That's a job someone does, not a thing." },
              { match: "Missed the lemonade", coach: "You can hold a cup of lemonade in your hand, so it's a good." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which one is a good?",
            choices: ["A haircut", "A dog walk", "A chocolate chip cookie", "Washing a car"],
            answer: 2,
            why: "You can hold a cookie and take it home, so it's a good.",
            hints: [
              "A haircut is work someone does for you. Can you carry a haircut in a bag?",
              "A dog walk is a job, not a thing you can hold.",
              "",
              "Washing a car is work someone does. Look for a thing you can hold.",
            ],
          },
          approaches: {
            analogy:
              "Think of a backpack. Anything you could zip inside a backpack, like a book, a snack or a bracelet, is a good. A dog walk would never fit in there!",
            example:
              "At Nora's craft table she sells painted rocks for $2 and friendship bracelets for $3. A customer picks up a rock, pays $2, and carries it home in her pocket. The painted rock is a good.",
            simpler: {
              q: "Can you hold a cookie in your hand and take it home?",
              choices: ["Yes, you can hold it", "No, you can't hold it", "Only on Tuesdays"],
              answer: 0,
              why: "A cookie is a thing you can hold, so it's a good.",
              hints: [
                "",
                "Picture it: can your hand pick up a cookie?",
                "Cookies don't change by the day of the week. Can you hold one?",
              ],
            },
          },
        },
        {
          title: "Services: jobs you do for someone",
          teach:
            "The second kind is services. A service is a job you do for someone. Walking a dog is a service. So are washing a car, raking leaves, watering plants and cutting hair. When you pay for a service, you don't carry a thing home. You pay someone for their time and work. Use the bag test again. Can you put a dog walk in a bag? No! That's how you know it's a service.",
          visual: {
            type: "compare",
            left: {
              title: "Goods",
              points: ["Things you can hold", "You take them home", "Lemonade, cookies, bracelets", "Pass the bag test"],
            },
            right: {
              title: "Services",
              points: ["Jobs you do for someone", "You pay for time and work", "Dog walking, car washing, raking", "Won't fit in a bag"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each one: is it a GOOD or a SERVICE?",
            buckets: ["Good", "Service"],
            items: [
              { text: "A cup of lemonade", bucket: 0 },
              { text: "Walking a neighbor's dog", bucket: 1 },
              { text: "A homemade bracelet", bucket: 0 },
              { text: "Raking leaves", bucket: 1 },
              { text: "Birthday cupcakes", bucket: 0 },
              { text: "Watering plants while a family is away", bucket: 1 },
              { text: "A painted rock", bucket: 0 },
              { text: "Washing a car", bucket: 1 },
            ],
            hint: "Ask: is it a thing you can hold, or a job someone does for you?",
            mistakes: [
              { match: "Put watering plants in Good", coach: "Plants are things, but here you're paying for the job of watering them. That's a service." },
              { match: "Put a job in Good", coach: "If someone is doing work for you, it's a service." },
            ],
            seconds: 40,
          },
          think: {
            q: "Mia waters her neighbor's garden while the family is on vacation. What is she selling?",
            choices: [
              "A good, because plants are things",
              "A service, because she does a job",
              "Nothing, because watering is free",
              "A good, because water is wet",
            ],
            answer: 1,
            why: "Mia is paid for her time and work, so she is selling a service.",
            hints: [
              "The plants belong to the neighbor. Mia isn't selling plants. What is she doing?",
              "",
              "The neighbor pays Mia for her time. That isn't free!",
              "Being wet doesn't make something a good. Is she selling a thing or doing a job?",
            ],
          },
          approaches: {
            analogy:
              "A service is like asking a friend to help carry your heavy box. You don't get a new thing, but the work gets done. If you pay for that help, you've bought a service.",
            example:
              "Jack offers to wash cars in his driveway for $5, with his dad helping. Mr. Brown pays $5, and Jack washes his car. Mr. Brown drives away with the same car he came with, just clean. He paid for work, so it was a service.",
            simpler: {
              q: "Is walking a dog something you can hold, or a job you do?",
              choices: ["Something you can hold", "A job you do", "A kind of food"],
              answer: 1,
              why: "Walking a dog is a job, so it's a service.",
              hints: [
                "You can hold the leash, but can you hold the walk itself?",
                "",
                "A walk isn't something you eat! Is it a thing or a job?",
              ],
            },
          },
        },
        {
          title: "Goods, services or both",
          teach:
            "Some businesses sell both. A pizza shop sells pizza, which is a good. It may also bring the pizza to your door, which is a service. A bike shop sells new bikes and also fixes old ones. Kids can mix them too. Maybe you sell lemonade and also help carry groceries. Before you start a business, ask three questions. What will I offer? Is it a good or a service? Who will want it?",
          visual: {
            type: "flip",
            cards: [
              { front: "Pizza shop", back: "Good: the pizza. Service: bringing it to your door." },
              { front: "Bike shop", back: "Good: new bikes. Service: fixing flat tires." },
              { front: "Question 1", back: "What will I offer?" },
              { front: "Question 2", back: "Is it a good or a service?" },
              { front: "Question 3", back: "Who will want it?" },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each business to what it sells.",
            pairs: [
              { left: "Bake sale", right: "Goods: cookies and brownies" },
              { left: "Dog walker", right: "A service: exercise for pets" },
              { left: "Bike shop", right: "Both: new bikes and repairs" },
              { left: "Car wash", right: "A service: making cars clean" },
              { left: "Lemonade stand", right: "A good: cold drinks" },
            ],
            hint: "For each business, ask: do customers take home a thing, pay for a job, or both?",
            mistakes: [
              { match: "Mixed up bike shop and car wash", coach: "The bike shop sells bikes AND fixes them, so it sells both." },
            ],
            seconds: 45,
          },
          think: {
            q: "A bike shop sells new bikes and fixes flat tires. What does it sell?",
            choices: ["Only goods", "Only services", "Both goods and services", "Neither one"],
            answer: 2,
            why: "New bikes are goods and fixing tires is a service, so it sells both.",
            hints: [
              "New bikes are goods, but fixing a tire is a job. What does that make it?",
              "Fixing is a service, but what about the new bikes you can take home?",
              "",
              "It definitely sells something! Look at the bikes and the repairs.",
            ],
          },
          approaches: {
            analogy:
              "A business can be like a lunchbox with two sides: one side holds things to take home, and the other holds jobs it can do for you. Some lunchboxes use both sides.",
            example:
              "Grace sells homemade dog treats for $1 a bag (a good) and walks dogs for $5 a walk (a service). One neighbor buys treats AND a walk. Grace's business sells both goods and services.",
            simpler: {
              q: "Fixing a flat tire is a...",
              choices: ["good", "service", "toy"],
              answer: 1,
              why: "Fixing is a job someone does for you, so it's a service.",
              hints: [
                "Can you put 'fixing' in a bag? Goods are things you can hold.",
                "",
                "A toy is something you play with. Fixing a tire is a job.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put Ben's dog-walking business in order.",
        steps: [
          "Ben notices his neighbors are at work all day",
          "Ben decides to offer dog walks, which is a service",
          "With his mom's okay, he tells the neighbors about it",
          "Mrs. Park hires Ben to walk her dog",
          "Ben walks the dog, and Mrs. Park pays him $5",
        ],
      },
      explain: {
        prompt:
          "In your own words, explain what a business is and the difference between goods and services. Give one example of each.",
        keyPoints: [
          "A business gives people something they want and they pay for it",
          "Goods are things you can hold",
          "Services are jobs you do for someone",
          "Some businesses sell both",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Sort each one: GOOD or SERVICE?",
          buckets: ["Good", "Service"],
          items: [
            { text: "A bag of muffins", bucket: 0 },
            { text: "Mowing a lawn", bucket: 1 },
            { text: "A handmade greeting card", bucket: 0 },
            { text: "Carrying a neighbor's groceries", bucket: 1 },
            { text: "A jar of homemade jam", bucket: 0 },
            { text: "Feeding a neighbor's cat", bucket: 1 },
          ],
          hint: "Use the bag test: could you carry it home in a bag? Then it's a good.",
          mistakes: [{ match: "Put a job in Good", coach: "Mowing, carrying and feeding are jobs someone does. Jobs are services." }],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Things you can hold and take home are called {0}. Jobs you do for someone are called {1}. The person who pays is the {2}.",
          blanks: [{ answers: ["goods"] }, { answers: ["services"] }, { answers: ["customer", "buyer"] }],
          bank: ["goods", "services", "customer", "owner", "prices", "toys"],
          hint: "Two kinds of things businesses sell, and the name for the person who buys.",
          mistakes: [
            { match: "owner", coach: "The owner runs the business and gets paid. Who does the paying?" },
            { match: "toys", coach: "Toys are one kind of good, but the word for ALL things you can hold is bigger." },
          ],
          seconds: 35,
        },
        {
          type: "build",
          prompt: "Build the meaning of a business.",
          tiles: ["A business", "gives people", "something they want,", "and they pay", "money for it."],
          distractors: ["for free,", "and hides it."],
          hint: "Start with 'A business' and remember the trade: something people want, for money.",
          mistakes: [{ match: "Used 'for free'", coach: "A business earns money. If it's free, it's a gift, not a business." }],
          seconds: 35,
        },
        {
          type: "highlight",
          prompt: "Tap every SERVICE.",
          sentences: [
            "Pulling weeds in a garden",
            "A box of brownies",
            "Walking a dog after school",
            "A painted flower pot",
            "Washing a neighbor's windows",
          ],
          correct: [0, 2, 4],
          hint: "A service is a job you do for someone. Look for the jobs.",
          mistakes: [{ match: "Tapped a thing you can hold", coach: "Brownies and flower pots fit in a bag. Those are goods." }],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What is a business?",
          choices: [
            "A place where everything is free",
            "A way of earning money by giving people something they want",
            "A game you play with friends",
            "A kind of homework",
          ],
          answer: 1,
          why: "A business gives people something they want or need, and they pay money for it.",
        },
        {
          q: "Which one is a service?",
          choices: ["A cookie", "A bracelet", "Walking a dog", "A cup of lemonade"],
          answer: 2,
          why: "Walking a dog is a job you do for someone, so it's a service.",
        },
        {
          q: "Which one is a good?",
          choices: ["A jar of homemade jam", "Raking leaves", "A haircut"],
          answer: 0,
          why: "You can hold a jar of jam and take it home, so it's a good.",
        },
        {
          q: "A pizza shop makes pizza and also brings it to your house. What does it sell?",
          choices: ["Only goods", "Only services", "No goods or services", "Both goods and services"],
          answer: 3,
          why: "The pizza is a good, and bringing it to your door is a service.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, walk down a street of shops or look around a farmers' market. Find 3 businesses that sell goods and 3 that sell services. Write down each one and what it sells. Then pick one good or service YOU could offer as a kid, and write who might want it.",
        rubric: [
          "Lists 3 businesses that sell goods",
          "Lists 3 businesses that sell services",
          "Sorts each one correctly as a good or a service",
          "Names one good or service the student could offer and who would want it",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "business-45.customers",
      title: "Customers and Their Problems",
      minutes: 30,
      stage: "logic",
      read: `A customer is a person who buys something from a business. Without customers, there is no business. That's why smart business owners spend lots of time thinking about the people they want to help.

Customers buy things to fix a problem or meet a need. A thirsty person on a hot day needs a drink. A family going on vacation needs someone to feed their cat. A busy parent wishes someone would wash the car. Each of these is a problem a business could solve.

In 1873, a 15-year-old boy named Chester Greenwood lived in Farmington, Maine. He loved ice skating, but his ears got painfully cold. Instead of just putting up with it, he bent some wire into loops and asked his grandmother to sew fur onto them. He had made a pair of earmuffs. Other people wanted them too, and a few years later he got a patent and started a business making them.

You can find problems the same way. Listen for sighs, complaints and sentences that start with "I wish." "I wish someone could walk my dog." "Ugh, these leaves take forever to rake." Each one is a clue.

Next, think about who your customer is. Lemonade sells best to thirsty people, like neighbors working in their yards or families at a soccer game. A dog-walking service needs customers who own dogs and have busy days.

Finally, ask before you build. With a parent, talk to a few possible customers. Ask about their problem and listen closely. If lots of people have the same problem, you may have found a great business.`,
      keyIdeas: [
        "A customer is the person who buys from a business.",
        "Customers buy to solve a problem or meet a need.",
        "Complaints and \"I wish\" sentences are clues to what people need.",
        "Ask real people about their problem before you build.",
      ],
      hook: {
        text: "In 1873, a 15-year-old boy in Farmington, Maine, loved ice skating, but his ears got painfully cold. He bent wire into loops and asked his grandmother to sew fur onto them. His name was Chester Greenwood, and he had just made earmuffs. Soon other people wanted a pair too.",
      },
      teach: [
        {
          title: "Who is the customer?",
          teach:
            "A customer is the person who buys from a business. Without customers, there is no business at all. Different businesses have different customers. A lemonade stand's best customers are thirsty people, like neighbors working in their yards or families at a soccer game. A dog walker's customers are people who own dogs and have busy days. Smart owners always ask one question: 'Who is my customer?'",
          visual: {
            type: "flip",
            cards: [
              { front: "Lemonade stand", back: "Customers: thirsty neighbors and families at a hot soccer game." },
              { front: "Dog walking", back: "Customers: people who own dogs and have busy days." },
              { front: "Plant watering", back: "Customers: families going away on vacation." },
              { front: "Bake sale", back: "Customers: people who love a sweet treat." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each kid business to its best customer.",
            pairs: [
              { left: "Lemonade stand", right: "Families at a hot soccer game" },
              { left: "Dog walking", right: "A busy neighbor with a puppy" },
              { left: "Plant watering", right: "A family leaving on vacation" },
              { left: "Leaf raking", right: "A neighbor with a yard full of leaves" },
            ],
            hint: "For each business, ask: who has the problem this business fixes?",
            mistakes: [
              { match: "Mixed up plant watering and dog walking", coach: "Plant watering helps people who are away from home. Dog walking helps people who own a dog." },
            ],
            seconds: 35,
          },
          think: {
            q: "Who is the best customer for a dog-walking business?",
            choices: ["A family with no pets", "A busy neighbor who owns a dog", "A cat that lives indoors", "A store that sells shoes"],
            answer: 1,
            why: "A dog walker helps people who own dogs and don't have time to walk them.",
            hints: [
              "If they have no pets, they have no dog to walk!",
              "",
              "Cats don't go on walks, and cats don't pay! Who owns a dog?",
              "A shoe store doesn't need a dog walked. Who has a dog?",
            ],
          },
          approaches: {
            analogy:
              "Finding your customer is like fishing. You catch more fish when you go where the fish are. You sell more lemonade when you go where the thirsty people are.",
            example:
              "Owen has two spots for his lemonade stand: a quiet dead-end street, or next to the park on a hot Saturday soccer morning with a parent nearby. At the park there are dozens of thirsty players and parents. Those are his customers, so the park is the better spot.",
            simpler: {
              q: "A customer is the person who...",
              choices: ["buys from a business", "runs the business", "makes the sign"],
              answer: 0,
              why: "The customer is the buyer.",
              hints: [
                "",
                "That's the owner. Who pays the owner?",
                "Anyone can make a sign. Who hands over the money?",
              ],
            },
          },
        },
        {
          title: "Problems and needs",
          teach:
            "Customers buy things to fix a problem or meet a need. A thirsty person on a hot day needs a drink. A family going on vacation needs someone to feed the cat. A busy parent wishes someone would wash the car. Before anyone pays, something is bugging them. Your job as a business owner is to spot that problem and make it go away. Problem first, then solution.",
          visual: {
            type: "compare",
            left: {
              title: "The problem",
              points: ["I'm so thirsty!", "Who will feed our cat?", "My car is dirty and I'm busy.", "These leaves are everywhere!"],
            },
            right: {
              title: "The business",
              points: ["A lemonade stand", "Pet feeding while you're away", "A driveway car wash", "Leaf raking"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each one: is it a PROBLEM someone has, or a BUSINESS that solves it?",
            buckets: ["Problem", "Business"],
            items: [
              { text: "I'm thirsty after the game", bucket: 0 },
              { text: "A lemonade stand by the field", bucket: 1 },
              { text: "Nobody can feed our cat next week", bucket: 0 },
              { text: "Cat feeding while you're away", bucket: 1 },
              { text: "My garden is full of weeds", bucket: 0 },
              { text: "Weed pulling for $5 an hour", bucket: 1 },
            ],
            hint: "A problem is something bugging a person. A business is what someone offers to fix it.",
            mistakes: [{ match: "Put an offer in Problem", coach: "If it sounds like something for sale, it's the business, not the problem." }],
            seconds: 35,
          },
          think: {
            q: "Mr. Diaz says, 'My car is dirty and I have no time to wash it.' What business could help him?",
            choices: ["A bracelet stand", "A lemonade stand", "A dog-walking service", "A car wash service"],
            answer: 3,
            why: "His problem is a dirty car, so a car wash solves it.",
            hints: [
              "Bracelets are nice, but they won't clean his car.",
              "Lemonade might cheer him up, but his car is still dirty!",
              "He didn't mention a dog. What is his problem?",
              "",
            ],
          },
          approaches: {
            analogy:
              "A business is like a doctor for small problems. First the doctor asks, 'What's wrong?' Then the doctor helps. A good business also starts by finding out what's wrong.",
            example:
              "Ruby hears her aunt say, 'Every time we go away, I worry about my tomato plants.' The problem: plants dry out while the family travels. Ruby's business idea: water plants for families on vacation for $3 a day, with her mom's okay.",
            simpler: {
              q: "Which one is a problem?",
              choices: ["Our cat needs feeding while we're away", "A pet-feeding business", "A lemonade stand"],
              answer: 0,
              why: "A hungry cat with nobody home is a problem someone needs solved.",
              hints: [
                "",
                "That's the business that fixes the problem. What's bugging the family?",
                "That's a business. Look for something going wrong for someone.",
              ],
            },
          },
        },
        {
          title: "Chester's cold ears",
          teach:
            "In 1873, Chester Greenwood was 15 years old and lived in Farmington, Maine. He loved ice skating, but his ears got painfully cold. Lots of people just put up with cold ears. Chester bent wire into loops and asked his grandmother to sew fur onto them. He had made earmuffs! Other people wanted them too. A few years later he got a patent and started a business making earmuffs.",
          visual: {
            type: "timeline",
            events: [
              { year: 1873, label: "Chester makes earmuffs", detail: "At 15, he bends wire into loops, and his grandmother sews fur onto them." },
              { year: 1877, label: "Chester gets a patent", detail: "A patent says the invention is officially his. He goes on to make earmuffs in a factory." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put Chester Greenwood's story in order.",
            steps: [
              "Chester's ears get painfully cold while ice skating",
              "He bends wire into loops",
              "His grandmother sews fur onto the loops",
              "Other people want earmuffs too",
              "He gets a patent and starts a business",
            ],
            hint: "Start with the problem. The business comes last, after other people want them.",
            mistakes: [{ match: "Put the business before the problem", coach: "Every business starts with a problem. What was bugging Chester first?" }],
            seconds: 35,
          },
          think: {
            q: "What turned Chester's earmuffs into a business?",
            choices: [
              "He stopped skating",
              "He complained loudly",
              "Other people had the same problem and wanted earmuffs too",
              "He moved somewhere warm",
            ],
            answer: 2,
            why: "Lots of people had cold ears, so lots of people wanted to buy earmuffs.",
            hints: [
              "He kept skating! What did other skaters want?",
              "Complaining doesn't make a business. What did other people want?",
              "",
              "He stayed in Maine. Think about who else had cold ears.",
            ],
          },
          approaches: {
            analogy:
              "Chester's idea was like a key that fit many locks. It fixed his cold ears, and it also fixed everyone else's cold ears. When a fix works for lots of people, it can become a business.",
            example:
              "Chester's problem: cold ears while skating. His fix: fur on wire loops. His customers: other people in snowy Maine with cold ears. Problem, fix, customers. That's how earmuffs became a business.",
            simpler: {
              q: "What problem did Chester have?",
              choices: ["His ears got cold while skating", "His skates were too big", "He was hungry"],
              answer: 0,
              why: "Cold ears on the ice were Chester's problem.",
              hints: [
                "",
                "The story never says anything about his skates. What got cold?",
                "Food isn't part of the story. Think about his ears.",
              ],
            },
          },
        },
        {
          title: "Listen, then ask",
          teach:
            "You can find problems the way Chester did. Listen for sighs, complaints and sentences that start with 'I wish.' 'I wish someone could walk my dog.' 'Ugh, these leaves take forever!' Each one is a clue. Then ask before you build. With a parent, talk to a few neighbors. Ask about the problem and listen closely. If many people have the same problem, you may have found a great business.",
          visual: {
            type: "flip",
            cards: [
              { front: "Clue", back: "\"I wish someone could...\"" },
              { front: "Clue", back: "\"Ugh, this takes forever!\"" },
              { front: "Good question to ask", back: "\"What chore bugs you the most?\"" },
              { front: "Good question to ask", back: "\"Tell me about the last time that happened.\"" },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "You heard these at a family cookout. Tap every sentence that is a clue to a business idea.",
            sentences: [
              "I wish someone could walk my dog after school.",
              "What a pretty day!",
              "Ugh, these leaves take forever to rake.",
              "I love this song.",
              "We need someone to feed our cat next week.",
              "That was a fun game.",
            ],
            correct: [0, 2, 4],
            hint: "Look for wishes, complaints and needs: something someone wants fixed.",
            mistakes: [{ match: "Tapped a happy sentence", coach: "Happy sentences are nice, but nothing needs fixing. Look for a problem." }],
            seconds: 30,
          },
          think: {
            q: "Your neighbor says, 'I wish someone could water my plants while I'm away.' What is that?",
            choices: ["A clue to a business idea", "Just a weather report", "A joke", "Something to ignore"],
            answer: 0,
            why: "An 'I wish someone could...' sentence tells you about a problem someone might pay to fix.",
            hints: [
              "",
              "She's talking about her plants, not the weather.",
              "She isn't joking. She has a real problem.",
              "Entrepreneurs listen closely to wishes like this!",
            ],
          },
          approaches: {
            analogy:
              "Finding problems is like a treasure hunt. Wishes and complaints are the clues on the map. Follow the clues, and you may find a business idea.",
            example:
              "Zoe and her dad visit 4 neighbors. She asks, 'What chore bugs you the most?' Three neighbors say, 'Pulling weeds!' Now Zoe knows the problem is real and shared, so a weed-pulling business might work.",
            simpler: {
              q: "Which sentence starts with a wish?",
              choices: ["The grass is green.", "I wish my car was clean.", "We ate lunch."],
              answer: 1,
              why: "It starts with 'I wish,' which tells you what the person wants changed.",
              hints: [
                "That's just a fact about grass, not a wish.",
                "",
                "That already happened. It's not a wish.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for finding a business idea in order.",
        steps: [
          "Listen for complaints and wishes",
          "Pick a problem that many people have",
          "Think about who your customer is",
          "With a parent, ask a few possible customers about it",
          "Plan a way to solve it",
        ],
      },
      explain: {
        prompt:
          "Explain what a customer is and how you can find out what customers need. Use Chester Greenwood or your own neighborhood as an example.",
        keyPoints: [
          "A customer is the person who buys",
          "Customers buy to solve a problem or meet a need",
          "Listen for complaints and wishes",
          "Ask people before you build",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each problem to the kid business that could solve it.",
          pairs: [
            { left: "My dog is home alone all day", right: "Dog walking" },
            { left: "We're going away and our plants will dry out", right: "Plant watering" },
            { left: "I'm so thirsty at this soccer game", right: "A lemonade stand" },
            { left: "Our yard is covered in fall leaves", right: "Leaf raking" },
          ],
          hint: "Read each problem and ask: what job or thing would make it go away?",
          mistakes: [{ match: "Mixed up dog walking and plant watering", coach: "A lonely dog needs a walk. Dry plants need water." }],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "A {0} is the person who buys from a business. People buy to solve a {1}. A sentence that starts with 'I {2}' is a clue to a business idea.",
          blanks: [{ answers: ["customer", "buyer"] }, { answers: ["problem", "need"] }, { answers: ["wish"] }],
          bank: ["customer", "problem", "wish", "owner", "sing", "toy"],
          hint: "Who buys? Why do they buy? And which word starts a wish?",
          mistakes: [
            { match: "owner", coach: "The owner runs the business. Who buys from it?" },
            { match: "toy", coach: "People buy toys, but the reason they buy anything is to fix a problem or need." },
          ],
          seconds: 35,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that is a clue to a business idea.",
          sentences: [
            "My little brother needs help learning to ride a bike.",
            "That sunset is beautiful.",
            "I wish someone would wash my windows.",
            "I never remember to bring in the trash cans.",
            "This pizza is tasty.",
          ],
          correct: [0, 2, 3],
          hint: "Look for something that isn't working for someone, or something they wish for.",
          mistakes: [{ match: "Missed the trash-can sentence", coach: "It doesn't say 'I wish,' but forgetting the trash cans is a problem someone could help with." }],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "Your lemonade stand is next to a hot soccer field. Who is a likely customer?",
          buckets: ["Likely customer", "Not likely"],
          items: [
            { text: "A thirsty player after the game", bucket: 0 },
            { text: "A parent cheering in the hot sun", bucket: 0 },
            { text: "A neighbor gardening on a hot afternoon", bucket: 0 },
            { text: "A car speeding by on the highway", bucket: 1 },
            { text: "Someone who just finished a big drink", bucket: 1 },
            { text: "A dog", bucket: 1 },
          ],
          hint: "A customer has the problem (thirst!) and can stop to buy.",
          mistakes: [{ match: "Put the speeding car in Likely", coach: "A car on the highway can't stop at your stand. Look for thirsty people nearby." }],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What is a customer?",
          choices: [
            "The person who buys from a business",
            "The person who owns the business",
            "The sign in front of the stand",
            "The money in the cash box",
          ],
          answer: 0,
          why: "A customer is the buyer: the person who pays for what the business offers.",
        },
        {
          q: "What did Chester Greenwood make at age 15?",
          choices: ["Ice skates", "Mittens", "Earmuffs", "Snowshoes"],
          answer: 2,
          why: "His ears got cold while skating, so he made earmuffs from wire and fur.",
        },
        {
          q: "Which sentence is the best clue to a business idea?",
          choices: ["What a sunny day!", "I love pizza.", "I like your shoes.", "I wish someone could rake my leaves."],
          answer: 3,
          why: "A wish for help points to a problem someone might pay to have solved.",
        },
        {
          q: "Why should you talk to possible customers before you build?",
          choices: [
            "To make them buy right away",
            "To find out if they really have the problem",
            "To tell them their problem isn't real",
          ],
          answer: 1,
          why: "Asking first shows you whether many people really have the problem.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, talk to 3 neighbors, relatives or family friends. Ask each one: 'What chore or problem bugs you the most?' Listen closely and write down each answer. Then pick one problem a kid your age could safely help solve, and write who your customer would be.",
        rubric: [
          "Talks to 3 real people with a parent's help",
          "Writes down each person's problem",
          "Picks one problem a kid could safely help with",
          "Names who the customer would be",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "business-45.profit",
      title: "Costs, Price and Profit",
      minutes: 35,
      stage: "logic",
      read: `Every business has to answer three money questions. What does it cost me? What price will I charge? And how much will I have left over?

Costs are the money you spend to run your business. For a lemonade stand, your costs might be lemons, sugar and paper cups. Say lemons cost $4, sugar costs $2 and cups cost $3. Add them up: $4 + $2 + $3 = $9. Your costs are $9.

Price is the amount a customer pays for one thing. If you charge $1 for a cup of lemonade, your price is $1.

Revenue is all the money customers pay you. If you sell 15 cups at $1 each, your revenue is 15 x $1 = $15.

Profit is the money left over after you pay your costs. Profit = revenue minus costs. Your lemonade stand took in $15 and spent $9, so your profit is $15 - $9 = $6. That $6 is yours to save, spend or share.

If your costs are bigger than your revenue, you have a loss instead of a profit. Suppose it rains and you sell only 5 cups. Your revenue is $5, but you still spent $9. That is a $4 loss.

Choosing a price takes thinking. If your price is too low, you may sell a lot but have little left over. If your price is too high, people may walk right past your stand. A good price is fair to your customers and still leaves you a profit.

Smart business owners write down every cost and every sale. Then they can see whether the business is really making money.`,
      keyIdeas: [
        "Costs are the money you spend to run your business.",
        "Revenue is all the money customers pay you.",
        "Profit = revenue minus costs.",
        "A good price is fair to customers and still leaves a profit.",
      ],
      hook: {
        text: "Two kids open lemonade stands on the same hot day. Jade sells 30 cups for $1 each. Max sells 20 cups for $2 each. Jade sold more cups, but who took in more money? And who got to keep more of it? To find out, you need three words: costs, price and profit.",
      },
      teach: [
        {
          title: "Costs: money going out",
          teach:
            "Costs are the money you spend to run your business. For a lemonade stand, your costs might be lemons, sugar and paper cups. Say lemons cost $4, sugar costs $2 and cups cost $3. Add them all up: $4 plus $2 plus $3 equals $9. Your costs are $9. Every dollar you spend is a cost, so write each one down in a notebook.",
          visual: {
            type: "flip",
            cards: [
              { front: "Costs", back: "Money you spend to run your business. Lemons $4 + sugar $2 + cups $3 = $9." },
              { front: "Price", back: "What a customer pays for one thing. Example: $1 a cup." },
              { front: "Revenue", back: "All the money customers pay you. 15 cups x $1 = $15." },
              { front: "Profit", back: "Money left over: revenue minus costs. $15 - $9 = $6." },
            ],
          },
          probe: {
            type: "number",
            prompt: "For your bake sale, flour costs $3, chocolate chips cost $4 and paper bags cost $2. What are your total costs?",
            answer: 9,
            unit: "$",
            hint: "Add up every single thing you spent money on.",
            mistakes: [
              { match: "7", coach: "That's the flour and chips. Don't forget the $2 paper bags!" },
              { match: "24", coach: "That multiplied. To find total costs, add the costs together." },
              { match: "6", coach: "Check your adding: $3 + $4 = $7, then add the $2 bags." },
            ],
            seconds: 25,
          },
          think: {
            q: "Which of these is a cost for a lemonade stand?",
            choices: ["Money a customer pays you", "The paper cups you buy", "The profit you keep", "A happy customer"],
            answer: 1,
            why: "You spend money on cups to run your stand, so cups are a cost.",
            hints: [
              "Money coming IN from customers is revenue, not a cost.",
              "",
              "Profit is what's left over. Costs are money going OUT.",
              "Happy customers are great, but they aren't money you spend.",
            ],
          },
          approaches: {
            analogy:
              "Costs are like the money you spend on supplies before a school project. You buy the poster board and markers first. That money is gone, so you need to keep track of it.",
            example:
              "Liam wants to sell bracelets. He buys beads for $5 and string for $1. His costs are $5 + $1 = $6. He writes '$6 spent' in his business notebook before he sells a single bracelet.",
            simpler: {
              q: "Lemons cost $4 and sugar costs $2. What do they cost together?",
              choices: ["$2", "$6", "$8"],
              answer: 1,
              why: "$4 + $2 = $6.",
              hints: [
                "That subtracted. Together means add them up.",
                "",
                "That multiplied. Together means add: $4 + $2.",
              ],
            },
          },
        },
        {
          title: "Price and revenue: money coming in",
          teach:
            "Price is what a customer pays for one thing. If a cup of lemonade costs a customer $1, your price is $1. Revenue is all the money customers pay you in total. To find it, multiply how many you sold by the price. If you sell 15 cups at $1 each, your revenue is 15 times $1, which is $15. Sell 15 cups at $2 each, and your revenue is $30.",
          visual: {
            type: "hotspots",
            title: "Money at the lemonade stand",
            center: "🍋",
            spots: [
              { label: "Price sign", icon: "🪧", detail: "\"$1 a cup\" is your price: what one customer pays for one cup." },
              { label: "Cash box", icon: "💵", detail: "All the money that goes in here is your revenue." },
              { label: "Cups sold", icon: "🥤", detail: "Each cup you sell adds the price to your revenue." },
              { label: "Notebook", icon: "📒", detail: "Write down every sale so you can add up your revenue." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Ava sells 8 bracelets at $3 each. What is her revenue?",
            answer: 24,
            unit: "$",
            hint: "Revenue = how many sold times the price.",
            mistakes: [
              { match: "11", coach: "That added 8 and 3. Each of the 8 customers paid $3, so multiply." },
              { match: "5", coach: "That subtracted. Revenue comes from multiplying: 8 x $3." },
              { match: "3", coach: "That's the price of one bracelet. She sold 8 of them!" },
            ],
            seconds: 25,
          },
          think: {
            q: "You sell 10 cookies at $2 each. What is your revenue?",
            choices: ["$12", "$20", "$8", "$5"],
            answer: 1,
            why: "10 x $2 = $20.",
            hints: [
              "That added 10 and 2. Each cookie brings in $2, so multiply.",
              "",
              "That subtracted. Revenue means multiply: cookies sold times price.",
              "That divided. Multiply the number sold by the price.",
            ],
          },
          approaches: {
            analogy:
              "Revenue is like filling a jar with marbles. Every sale drops the price into the jar. At the end of the day, the whole jar is your revenue.",
            example:
              "Ella sells muffins for $2 each. She sells 7 muffins. Her revenue is 7 x $2 = $14. She counts the cash box, and sure enough, there's $14 inside.",
            simpler: {
              q: "Price is...",
              choices: ["what a customer pays for one thing", "the lemons you buy", "the money left over"],
              answer: 0,
              why: "Price is the amount one customer pays for one item.",
              hints: [
                "",
                "Lemons you buy are a cost, not the price.",
                "Money left over is profit. Price is what one item sells for.",
              ],
            },
          },
        },
        {
          title: "Profit: what's left over",
          teach:
            "Profit is the money left over after you pay your costs. Profit equals revenue minus costs. Your lemonade stand took in $15 and spent $9, so your profit is $15 minus $9, which is $6. That $6 is yours to save, spend or share. But watch out! If it rains and you sell only 5 cups, your revenue is $5. You still spent $9. That's a $4 loss.",
          visual: { type: "profit", price: 1, cost: 0, fixed: 9, units: 15 },
          probe: {
            type: "place",
            prompt: "Drag each day onto the money line. Left of zero is a loss.",
            min: -10,
            max: 20,
            step: 1,
            tolerance: 0,
            items: [
              { label: "Revenue $15, costs $9", value: 6 },
              { label: "Revenue $20, costs $8", value: 12 },
              { label: "Revenue $5, costs $9", value: -4 },
              { label: "Revenue $10, costs $10", value: 0 },
            ],
            hint: "For each day, take the costs away from the revenue. If the costs are bigger, you land below zero.",
            mistakes: [
              { match: "Put $5 revenue, $9 costs at 4", coach: "Costs were bigger than revenue, so that's a $4 LOSS. It goes left of zero." },
              { match: "Added revenue and costs", coach: "Profit means take away: revenue minus costs." },
            ],
            seconds: 45,
          },
          think: {
            q: "Revenue is $12 and costs are $7. What is the profit?",
            choices: ["$19", "$5", "$7", "$12"],
            answer: 1,
            why: "$12 - $7 = $5.",
            hints: [
              "That added them. Profit means take the costs away.",
              "",
              "That's the costs. What's left after you subtract them?",
              "That's the revenue. Subtract the costs to find what's left.",
            ],
          },
          approaches: {
            analogy:
              "Profit is like a pizza after everyone who helped gets their slice. The costs are slices you have to give away. Whatever slices are left are yours.",
            example:
              "Noah's bake sale: he spent $8 on supplies. He sold 10 brownies at $2 each, so his revenue is $20. Profit = $20 - $8 = $12. Noah puts $12 in his savings jar.",
            simpler: {
              q: "Profit is the money...",
              choices: ["left over after paying costs", "you spend on lemons", "written on the price sign"],
              answer: 0,
              why: "Profit is what you keep after the costs are paid.",
              hints: [
                "",
                "Money spent on lemons is a cost.",
                "That's the price. Profit is what's left at the end.",
              ],
            },
          },
        },
        {
          title: "Picking a fair price",
          teach:
            "Choosing a price takes thinking. If your price is too low, you might sell a lot but keep very little. If your price is too high, people may walk right past your stand. A good price is fair to your customers and still leaves you a profit. Try it! Change the price and watch what happens to your profit when each cup costs you $1 to make.",
          visual: { type: "profit", price: 2, cost: 1, fixed: 0, units: 10 },
          probe: {
            type: "target",
            prompt: "Each cup of lemonade costs you $1 to make, and you expect to sell 10 cups. Slide the price until you make at least $10 profit.",
            goal: { sim: "profit", cost: 1, fixed: 0, units: 10, minProfit: 10 },
            hint: "To get $10 from 10 cups, you need to keep $1 on every cup. Then add back the $1 each cup costs you.",
            mistakes: [
              { match: "Price at $1", coach: "At $1 you only get back what the cup cost you. You keep $0." },
              { match: "Price below $1", coach: "Below $1, you lose money on every cup. The price must be above your cost." },
            ],
            seconds: 45,
          },
          think: {
            q: "What can happen if your price is way too high?",
            choices: [
              "Customers may walk past without buying",
              "You always make more money",
              "Lemons get cheaper",
              "More people stop to buy",
            ],
            answer: 0,
            why: "If the price feels unfair, many people won't buy at all.",
            hints: [
              "",
              "Not always! If nobody buys, you make nothing.",
              "Your price doesn't change what lemons cost at the store.",
              "A very high price usually makes fewer people stop, not more.",
            ],
          },
          approaches: {
            analogy:
              "Picking a price is like Goldilocks and the porridge. Too low, and you keep almost nothing. Too high, and nobody buys. You want the price that's just right.",
            example:
              "Each cup costs Emma $1 to make. At $1 a cup she keeps $0. At $10 a cup nobody buys. At $2 a cup she sells 10 cups and keeps $1 on each, so her profit is 10 x $1 = $10.",
            simpler: {
              q: "A cup costs you $1 to make. If you sell it for $1, how much do you keep?",
              choices: ["$0", "$1", "$2"],
              answer: 0,
              why: "$1 price minus $1 cost leaves $0.",
              hints: [
                "",
                "The customer pays $1, but you already spent $1 making it. What's left?",
                "Price minus cost: $1 - $1. Can that be $2?",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for finding a lemonade stand's profit in order.",
        steps: [
          "Buy your supplies and write down each cost",
          "Sell lemonade on a sunny afternoon",
          "Count how many cups you sold",
          "Find revenue: cups sold times the price",
          "Subtract costs from revenue to find profit",
        ],
      },
      explain: {
        prompt: "Explain how to figure out whether a lemonade stand made a profit. Use numbers in your example.",
        keyPoints: [
          "Costs are money you spend",
          "Revenue is money customers pay",
          "Profit is revenue minus costs",
          "If costs are bigger than revenue, it's a loss",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Bake sale: you sell 12 cupcakes at $2 each. Your costs were $10. What is your profit?",
          answer: 14,
          unit: "$",
          hint: "First find revenue (12 x $2). Then subtract the costs.",
          mistakes: [
            { match: "24", coach: "That's your revenue. Now take away the $10 in costs." },
            { match: "34", coach: "That added the costs. Profit means subtract them." },
            { match: "4", coach: "That used $12 - $10 at $1 a cupcake. Multiply 12 x $2 first." },
          ],
          seconds: 40,
        },
        {
          type: "target",
          prompt: "Each bracelet costs you $1 to make, and you bought a $4 display board. You plan to sell 12 bracelets. Slide the price until your profit is at least $20.",
          goal: { sim: "profit", cost: 1, fixed: 4, units: 12, minProfit: 20 },
          hint: "You need $20 profit plus $4 for the board: $24 from 12 bracelets, which is $2 each. Then add the $1 each bracelet costs.",
          mistakes: [
            { match: "Price at $2", coach: "At $2 you keep $1 per bracelet: $12, minus the $4 board, is only $8. Go higher." },
            { match: "Price at $1 or less", coach: "At that price you don't even cover what each bracelet costs to make." },
          ],
          seconds: 60,
        },
        {
          type: "match",
          prompt: "Match each money word to what it means.",
          pairs: [
            { left: "Cost", right: "Money you spend to run the business" },
            { left: "Price", right: "What a customer pays for one thing" },
            { left: "Revenue", right: "All the money customers pay you" },
            { left: "Profit", right: "Money left over after paying costs" },
            { left: "Loss", right: "When costs are bigger than revenue" },
          ],
          hint: "Think about which money goes out, which comes in, and what's left.",
          mistakes: [{ match: "Mixed up revenue and profit", coach: "Revenue is ALL the money coming in. Profit is only what's left after costs." }],
          seconds: 45,
        },
        {
          type: "build",
          prompt: "Build the profit rule.",
          tiles: ["Profit", "equals", "revenue", "minus", "costs."],
          distractors: ["plus", "price"],
          hint: "Profit is what's left after you take the costs away from the money coming in.",
          mistakes: [{ match: "Used 'plus'", coach: "Adding costs would make profit bigger than it really is. Costs get taken away." }],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Lemons cost $5, sugar costs $2 and cups cost $3. What are the total costs?",
          choices: ["$8", "$10", "$5", "$15"],
          answer: 1,
          why: "$5 + $2 + $3 = $10.",
        },
        {
          q: "You sell 6 cups of lemonade at $2 each. What is your revenue?",
          choices: ["$8", "$4", "$12"],
          answer: 2,
          why: "6 x $2 = $12.",
        },
        {
          q: "Revenue is $20 and costs are $8. What is the profit?",
          choices: ["$28", "$8", "$20", "$12"],
          answer: 3,
          why: "$20 - $8 = $12.",
        },
        {
          q: "Revenue is $6 and costs are $9. What happened?",
          choices: ["A $3 loss", "A $3 profit", "A $15 profit"],
          answer: 0,
          why: "Costs were $3 more than revenue, so the stand had a $3 loss.",
        },
      ],
      task: {
        kind: "lab",
        prompt:
          "With a parent, plan a lemonade stand or bake sale. Find out what your supplies really cost (check a store ad or ask a parent) and add up your costs. Choose a price for each item and explain why it's fair. Then figure out your revenue and profit if you sold 20 items.",
        rubric: [
          "Lists every supply and its cost",
          "Adds up the costs correctly",
          "Picks a fair price and explains why",
          "Shows the revenue and profit math for selling 20",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "business-45.advertising",
      title: "Getting the Word Out",
      minutes: 30,
      stage: "rhetoric",
      read: `You could make the best lemonade on your whole street. But if nobody knows about it, nobody will buy it. Telling people about your business is called advertising. An advertisement, or ad, is any message that tells people what you sell and why they might want it.

The simplest ad for a kid business is a sign. A great sign answers a few questions fast. What are you selling? How much does it cost? When and where? It must also be easy to read. Use big letters, bright colors and only a few words. Someone walking or driving past has just a second or two to read it.

There are other ways to get the word out. With a parent, you can make flyers, which are small paper ads, and hand them to neighbors. You can tell family and friends. Some of the best advertising is free: when happy customers tell other people about you, that's called word of mouth.

Most important of all, an ad must be honest. Only say things that are true. If your lemonade is made from a powder mix, don't call it fresh-squeezed. If your cookies came from the store, don't say homemade. Customers who feel tricked won't come back, and they may tell their friends.

Honest ads build trust. Trust means people believe what you say. A customer who trusts you will come back again and again. That's why good business owners would rather lose one sale than tell one lie.

So make your sign big and clear, tell people about your business, treat every customer well, and always tell the truth.`,
      keyIdeas: [
        "Advertising tells people what you sell and why they might want it.",
        "A great sign shows what, how much, and when or where, in big clear letters.",
        "Happy customers spread the word for free.",
        "Honest ads build trust, and trust brings customers back.",
      ],
      hook: {
        text: "Imagine you make the best lemonade on your whole street. You set up your stand on a hot Saturday, but it's tucked behind a big hedge with no sign. Cars zoom by. People walk right past. How many cups do you sell? Probably zero. Great lemonade is not enough. People have to know about it!",
      },
      teach: [
        {
          title: "People can't buy what they don't know about",
          teach:
            "Telling people about your business is called advertising. An advertisement, or ad, is any message that says what you sell and why someone might want it. Ads can be signs, flyers, posters or even a friendly hello. Without ads, even the best lemonade stays in the pitcher. With good ads, the right customers find you. Every business, from giant stores to the smallest bake sale, needs to get the word out.",
          visual: {
            type: "flip",
            cards: [
              { front: "Advertising", back: "Telling people about your business." },
              { front: "Ad", back: "A message that says what you sell and why someone might want it." },
              { front: "Flyer", back: "A small paper ad you hand out." },
              { front: "Word of mouth", back: "When happy customers tell other people about you." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Telling people about your business is called {0}. A small paper ad you hand to neighbors is called a {1}.",
            blanks: [{ answers: ["advertising", "marketing"] }, { answers: ["flyer", "flier"] }],
            bank: ["advertising", "flyer", "cooking", "receipt", "profit"],
            hint: "One word means 'getting the word out.' The other is a piece of paper you hand out.",
            mistakes: [
              { match: "profit", coach: "Profit is money left over. What's the word for telling people about your business?" },
              { match: "receipt", coach: "A receipt shows what someone paid. A paper ad you hand out has a different name." },
            ],
            seconds: 25,
          },
          think: {
            q: "Why does a business need to advertise?",
            choices: [
              "So people know what it sells",
              "So the owner can stay home",
              "To make the lemonade colder",
              "Because every ad has to be long",
            ],
            answer: 0,
            why: "Customers can only buy from you if they know you're there and what you sell.",
            hints: [
              "",
              "Ads don't run the business for you. What do ads tell people?",
              "Ads don't change the lemonade. They tell people about it.",
              "Short ads often work best. Think about why ads exist at all.",
            ],
          },
          approaches: {
            analogy:
              "A business without ads is like a birthday party with no invitations. The cake might be amazing, but if nobody is invited, nobody comes.",
            example:
              "Ethan sets up a cookie stand with no sign and sells 2 cookies in an hour. The next day he adds a big sign that says 'COOKIES $1' and waves to people walking by. He sells 15 cookies in an hour.",
            simpler: {
              q: "An ad tells people...",
              choices: ["what you sell", "your bedtime", "the weather"],
              answer: 0,
              why: "An ad's job is to tell people what you sell and why they'd want it.",
              hints: [
                "",
                "Your bedtime isn't part of your business! What do customers need to know?",
                "That's a weather report. An ad is about your business.",
              ],
            },
          },
        },
        {
          title: "Make a sign people can read fast",
          teach:
            "The simplest ad for a kid business is a sign. A great sign answers questions fast. What are you selling? How much does it cost? When and where? Use big letters, bright colors and only a few words. Someone walking or driving past has just a second or two to read it. 'LEMONADE $1' in giant letters beats a long sentence in tiny writing.",
          visual: {
            type: "compare",
            left: {
              title: "Great sign",
              points: ["Big, bold letters", "Bright colors", "Says what and how much", "Just a few words"],
            },
            right: {
              title: "Hard-to-read sign",
              points: ["Tiny writing", "Light colors that fade away", "No price", "A long paragraph"],
            },
          },
          probe: {
            type: "highlight",
            prompt: "Tap every tip that makes a sign better.",
            sentences: [
              "Use big, bold letters",
              "Write a long story in tiny print",
              "Show the price",
              "Use bright colors that stand out",
              "Use light yellow marker on white paper",
              "Say what you are selling",
            ],
            correct: [0, 2, 3, 5],
            hint: "Picture someone walking past. What helps them understand your sign in two seconds?",
            mistakes: [
              { match: "Tapped the long story", coach: "Nobody walking past has time to read a story. Keep it short." },
              { match: "Tapped light yellow marker", coach: "Light yellow on white is very hard to see from far away." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which sign is best for a stand by the sidewalk?",
            choices: [
              "A long paragraph in small pencil",
              "LEMONADE $1 in big bright letters",
              "A blank piece of paper",
              "A sign facing away from the street",
            ],
            answer: 1,
            why: "Big, bright, short and showing the price: people can read it in a second.",
            hints: [
              "Small pencil is too hard to read from the sidewalk.",
              "",
              "A blank sign tells people nothing at all!",
              "If people can't see it, it can't help. Face it toward the street.",
            ],
          },
          approaches: {
            analogy:
              "A good sign is like a stop sign: big, bright and only a few words. Drivers understand a stop sign in a blink. Your sign should work the same way.",
            example:
              "Lucy's first sign said 'Come try some of my delicious homemade lemonade that I made this morning' in thin pencil. Nobody stopped. Her new sign says 'LEMONADE $1' in thick blue marker. Now people read it from across the street.",
            simpler: {
              q: "Should a sign have big letters or tiny letters?",
              choices: ["Big letters", "Tiny letters", "No letters"],
              answer: 0,
              why: "Big letters can be read quickly from far away.",
              hints: [
                "",
                "Tiny letters are hard to read when people are walking by.",
                "Without letters, nobody knows what you sell!",
              ],
            },
          },
        },
        {
          title: "Flyers and word of mouth",
          teach:
            "Signs aren't the only way to get the word out. With a parent, you can make flyers, small paper ads, and hand them to neighbors. You can tell family and friends. And some of the best advertising is free! When a happy customer tells a friend, 'Try the cookies at Ella's stand,' that's called word of mouth. Treat every customer well, and they'll help spread the news.",
          visual: {
            type: "hotspots",
            title: "Ways to get the word out",
            center: "📣",
            spots: [
              { label: "Sign", icon: "🪧", detail: "Big words by your stand so people walking by can see what you sell." },
              { label: "Flyer", icon: "📄", detail: "A small paper ad you hand to neighbors, with a parent's help." },
              { label: "Family and friends", icon: "👨‍👩‍👧", detail: "Tell the people you know what you're offering." },
              { label: "Word of mouth", icon: "🗣️", detail: "Happy customers tell their friends. It's free!" },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each one: is it a SIGN, a FLYER, or WORD OF MOUTH?",
            buckets: ["Sign", "Flyer", "Word of mouth"],
            items: [
              { text: "A poster taped to the front of your lemonade table", bucket: 0 },
              { text: "A big board by the sidewalk that says COOKIES $1", bucket: 0 },
              { text: "A small paper ad you hand to a neighbor", bucket: 1 },
              { text: "A half-page ad you and your dad give out at the door", bucket: 1 },
              { text: "A happy customer tells her friend about your cookies", bucket: 2 },
              { text: "A neighbor tells his brother your dog walks are great", bucket: 2 },
            ],
            hint: "Signs stay by your stand. Flyers are handed out. Word of mouth is people talking.",
            mistakes: [{ match: "Put a customer telling a friend in Flyer", coach: "No paper there! When people talk about you, it's word of mouth." }],
            seconds: 40,
          },
          think: {
            q: "A happy customer tells his friends about your dog-walking service. What is this called?",
            choices: ["A flyer", "A sign", "Word of mouth", "A cost"],
            answer: 2,
            why: "When people tell other people about you, that's word of mouth.",
            hints: [
              "A flyer is a piece of paper. He's talking to his friends.",
              "A sign stays in one place. He's telling people himself.",
              "",
              "It didn't cost you anything! What's it called when people talk about you?",
            ],
          },
          approaches: {
            analogy:
              "Word of mouth is like a game of telephone, but the good kind. One happy customer tells two friends, they each tell two more, and soon lots of people know about you.",
            example:
              "Mrs. Allen loves how carefully Kai walks her dog. She tells two neighbors at the mailbox. Both call Kai's mom the next week to sign up. Kai didn't make a single new flyer.",
            simpler: {
              q: "What makes customers want to tell their friends about you?",
              choices: ["Great service and a good product", "Being grumpy", "Running out of cups"],
              answer: 0,
              why: "When people are happy with you, they want to share it.",
              hints: [
                "",
                "Grumpy service makes people stay away, not tell friends.",
                "Running out makes people disappointed. What makes them happy?",
              ],
            },
          },
        },
        {
          title: "Tell the truth in every ad",
          teach:
            "Most important of all, an ad must be honest. Only say things that are true. If your lemonade comes from a powder mix, don't call it fresh-squeezed. If your cookies are from the store, don't say homemade. Customers who feel tricked won't come back. Honest ads build trust, which means people believe what you say. People who trust you come back again and again.",
          visual: {
            type: "compare",
            left: {
              title: "Honest ad",
              points: ["Every word is true", "The price on the sign is the real price", "Customers trust you", "They come back"],
            },
            right: {
              title: "Tricky ad",
              points: ["Says things that aren't true", "Surprise prices", "Customers feel tricked", "They stay away and tell friends"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Read each ad and what's really true. Is the ad HONEST or NOT HONEST?",
            buckets: ["Honest", "Not honest"],
            items: [
              { text: "'Homemade cookies $1' (you baked them with Dad)", bucket: 0 },
              { text: "'Fresh-squeezed lemonade' (it's made from powder mix)", bucket: 1 },
              { text: "'Dog walks: 30 minutes for $5' (you walk 30 minutes)", bucket: 0 },
              { text: "'Bracelets $2' (but you charge $4 at the table)", bucket: 1 },
              { text: "'Free cookie with every lemonade' (you really give one)", bucket: 0 },
              { text: "'Made with real strawberries' (there are none)", bucket: 1 },
            ],
            hint: "Compare the ad with what's really true. Do they match?",
            mistakes: [{ match: "Put the powder-mix lemonade in Honest", coach: "Fresh-squeezed means squeezed from real lemons. Powder mix isn't that." }],
            seconds: 45,
          },
          think: {
            q: "Your lemonade is made from a powder mix. What should your sign say?",
            choices: ["Fresh-squeezed lemonade", "Lemonade $1", "Made from lemons picked today", "Lemonade from a secret farm"],
            answer: 1,
            why: "'Lemonade $1' is true, clear and shows the price.",
            hints: [
              "It wasn't squeezed from lemons, so that wouldn't be true.",
              "",
              "Nobody picked lemons today. That isn't true.",
              "There is no secret farm! Ads should only say true things.",
            ],
          },
          approaches: {
            analogy:
              "Trust is like a glass vase. It takes time to make, and one lie can crack it. Honest ads keep the vase in one piece.",
            example:
              "Two kids sell lemonade. Kate's sign says 'Fresh-squeezed!' but it's powder mix. A customer notices and never comes back. Ben's sign says 'Lemonade $1,' which is true. His customers trust him and come back every Saturday.",
            simpler: {
              q: "Honest means...",
              choices: ["telling the truth", "making things up", "being loud"],
              answer: 0,
              why: "Being honest means only saying things that are true.",
              hints: [
                "",
                "Making things up is the opposite of honest.",
                "You can be loud and still not tell the truth. Honest is about truth.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for getting the word out about your stand in order.",
        steps: [
          "Decide what you're selling and the price",
          "Make a big, clear, honest sign",
          "Put the sign where people walking by can see it",
          "Greet customers and serve them well",
          "Happy customers tell their friends",
        ],
      },
      explain: {
        prompt: "Explain how you would get the word out about a kid business, and why honesty matters in ads.",
        keyPoints: [
          "Advertising tells people what you sell",
          "A good sign is big, clear and shows the price",
          "Word of mouth comes from happy customers",
          "Ads must be honest to build trust",
        ],
      },
      mastery: [
        {
          type: "highlight",
          prompt: "Each ad says what's really true in parentheses. Tap every HONEST ad.",
          sentences: [
            "'Car wash $5' (you charge $5)",
            "'Homemade brownies' (they came from the store)",
            "'Leaf raking: whole front yard, $8' (you rake the whole front yard)",
            "'Best lemonade in the world!' (you made it from powder for the first time)",
            "'Plant watering while you're away' (you water every day they're gone)",
          ],
          correct: [0, 2, 4],
          hint: "An ad is honest only when it matches what's really true.",
          mistakes: [{ match: "Tapped the store-bought brownies", coach: "Store-bought isn't homemade. That ad isn't true." }],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build the rule about ads.",
          tiles: ["Honest ads", "build trust,", "and trust brings", "customers back."],
          distractors: ["trick customers,", "and lies bring"],
          hint: "Start with 'Honest ads.' What do they build, and what does that bring?",
          mistakes: [{ match: "Used 'trick customers'", coach: "Tricking customers makes them leave. Honest ads do the opposite." }],
          seconds: 30,
        },
        {
          type: "match",
          prompt: "Match each way of getting the word out to what it is.",
          pairs: [
            { left: "Sign", right: "Big words by your stand" },
            { left: "Flyer", right: "A small paper ad handed to neighbors" },
            { left: "Word of mouth", right: "A happy customer tells a friend" },
            { left: "Advertising", right: "Telling people what you sell" },
          ],
          hint: "Which one is paper, which one is people talking, and which stays by your stand?",
          mistakes: [{ match: "Mixed up sign and flyer", coach: "A sign stays by your stand. A flyer gets handed out." }],
          seconds: 35,
        },
        {
          type: "sort",
          prompt: "Sort each sign tip: does it make a sign BETTER or WORSE?",
          buckets: ["Better", "Worse"],
          items: [
            { text: "Thick, dark marker", bucket: 0 },
            { text: "Tiny pencil writing", bucket: 1 },
            { text: "Shows the price", bucket: 0 },
            { text: "A long paragraph", bucket: 1 },
            { text: "Only true words", bucket: 0 },
            { text: "Facing away from the street", bucket: 1 },
          ],
          hint: "A better sign is easy to read in two seconds and tells the truth.",
          mistakes: [{ match: "Put the long paragraph in Better", coach: "People walking by won't stop to read a paragraph. Short is better." }],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "What is advertising?",
          choices: ["Counting your money", "Telling people about what you sell", "Making lemonade"],
          answer: 1,
          why: "Advertising gets the word out so customers know about your business.",
        },
        {
          q: "Which sign is easiest to read from the sidewalk?",
          choices: ["Tiny pencil writing", "A long story", "COOKIES $1 in big bright letters", "Light yellow marker on white paper"],
          answer: 2,
          why: "Big, bright and short is easy to read in a second or two.",
        },
        {
          q: "What is word of mouth?",
          choices: ["Happy customers telling others about you", "Eating your own cookies", "Shouting very loudly"],
          answer: 0,
          why: "Word of mouth is when people tell other people about your business.",
        },
        {
          q: "Why should every ad be honest?",
          choices: ["Because honest ads cost more", "So you can charge any price", "Because it doesn't matter", "Because trust brings customers back"],
          answer: 3,
          why: "Customers who trust you come back. Customers who feel tricked stay away.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make a real sign for a kid business you could run, like lemonade, a bake sale or dog walking. It should say what you're selling, the price, and when or where, in big clear letters. Make sure every word is true. Then ask a parent to stand across the room and tell you if they can read it.",
        rubric: [
          "Says clearly what is being sold",
          "Shows the price",
          "Uses big letters that are easy to read from far away",
          "Everything on the sign is true",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "business-45.teamwork",
      title: "Running the Stand: Teamwork and Service",
      minutes: 30,
      stage: "rhetoric",
      read: `Running a business is easier and more fun with a team. In 1913, Henry Ford changed the way his factory built cars. Instead of a few workers doing every step, each worker did one job as the car moved past on a line. Building a car went from about 12 hours to about an hour and a half. When each person has a clear job, the work goes faster and better.

A lemonade stand can work the same way. One person can be the maker, who pours drinks and keeps the pitcher full. One can be the cashier, who takes money and counts change. One can be the greeter, who smiles, waves and invites people over. Someone also needs to be the cleaner, who keeps the table neat and picks up trash. Each job is called a role.

Good teams plan ahead. Before you open, make a checklist: table, sign, cups, ice, napkins, and a cash box with some coins and small bills for change. Decide who does each job. Agree to help each other when it gets busy.

Great service is what makes customers come back. Say hello and smile. Look people in the eye. Say please and thank you. Count change carefully. If a customer pays $5 for a $2 lemonade, give back $3. If something goes wrong, like a spilled cup, stay calm, say sorry and make it right with a fresh one.

A good leader on a team doesn't boss people around. A good leader makes sure everyone knows their job, pitches in where help is needed and thanks teammates for their work.

When the day is over, clean up together, count the money with a parent, and talk about what went well and what to do better next time.`,
      keyIdeas: [
        "Give each teammate a clear role, like maker, cashier, greeter or cleaner.",
        "Plan ahead with a checklist before you open.",
        "Great service means smiling, saying thank you and counting change carefully.",
        "A good leader helps the team and thanks everyone.",
      ],
      hook: {
        text: "In 1913, Henry Ford's car factory tried something new. Instead of a few workers doing every step, each worker did one job as the car moved past on a line. Building a car went from about 12 hours to about an hour and a half. What happens when everyone on a team has a clear job?",
      },
      teach: [
        {
          title: "Every teammate gets a role",
          teach:
            "Henry Ford's workers each had one clear job, and the cars got built much faster. A lemonade stand can work the same way. Each job on a team is called a role. The maker pours drinks and keeps the pitcher full. The cashier takes money and counts change. The greeter smiles, waves and invites people over. The cleaner keeps the table neat. When everyone knows their role, nobody bumps into each other.",
          visual: {
            type: "hotspots",
            title: "The lemonade stand team",
            center: "🍋",
            spots: [
              { label: "Maker", icon: "🥤", detail: "Pours drinks and keeps the pitcher full." },
              { label: "Cashier", icon: "💵", detail: "Takes the money and counts change carefully." },
              { label: "Greeter", icon: "👋", detail: "Smiles, waves and invites people over." },
              { label: "Cleaner", icon: "🧽", detail: "Keeps the table neat and picks up trash." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each role to its job.",
            pairs: [
              { left: "Maker", right: "Pours drinks and keeps the pitcher full" },
              { left: "Cashier", right: "Takes money and counts change" },
              { left: "Greeter", right: "Smiles, waves and invites people over" },
              { left: "Cleaner", right: "Keeps the table neat" },
            ],
            hint: "Think about what each name means: a maker makes, a cashier handles cash, and so on.",
            mistakes: [{ match: "Mixed up greeter and cashier", coach: "The cashier handles the cash. The greeter says hello." }],
            seconds: 30,
          },
          think: {
            q: "Which teammate counts the change?",
            choices: ["The greeter", "The cashier", "The maker", "The cleaner"],
            answer: 1,
            why: "The cashier handles the money, so the cashier counts change.",
            hints: [
              "The greeter says hello and waves people over.",
              "",
              "The maker pours the drinks.",
              "The cleaner keeps the table neat.",
            ],
          },
          approaches: {
            analogy:
              "A team with roles is like a soccer team. The goalie guards the net, defenders protect, and forwards try to score. If everyone ran after the ball at once, nobody would guard the goal.",
            example:
              "Three cousins run a stand. Ava is the maker, Leo is the cashier, and little Sam is the greeter. When a family walks up, Sam waves, Ava pours three cups, and Leo takes the money. The line moves quickly and nobody bumps into each other.",
            simpler: {
              q: "A role is...",
              choices: ["a job on the team", "a kind of bread", "a price"],
              answer: 0,
              why: "A role is the job one person does on a team.",
              hints: [
                "",
                "That's a 'roll,' a different word! A role is a job.",
                "A price is what something costs. A role is a person's job.",
              ],
            },
          },
        },
        {
          title: "Plan before you open",
          teach:
            "Good teams plan ahead. Before you open, make a checklist of everything you need: a table, a sign, cups, ice, napkins and a cash box with some coins and small bills for making change. Decide who will do each job. Set up together, check the list, and then open. A few minutes of planning saves a lot of running around when customers start lining up.",
          visual: {
            type: "compare",
            left: {
              title: "With a plan",
              points: ["Everything is ready", "Everyone knows their job", "Change is in the cash box", "Customers are served fast"],
            },
            right: {
              title: "No plan",
              points: ["Out of cups!", "Two people pouring, nobody taking money", "No change for a $5 bill", "Customers wait and leave"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Packing for your lemonade stand: does it go on the checklist or stay home?",
            buckets: ["On the checklist", "Stays home"],
            items: [
              { text: "Paper cups", bucket: 0 },
              { text: "A sign with the price", bucket: 0 },
              { text: "A cash box with coins and small bills", bucket: 0 },
              { text: "A bag of ice", bucket: 0 },
              { text: "Your pillow", bucket: 1 },
              { text: "A board game", bucket: 1 },
              { text: "Your winter boots", bucket: 1 },
            ],
            hint: "Ask: will this help me make, sell or serve lemonade?",
            mistakes: [{ match: "Put the cash box at home", coach: "Without coins and small bills, you can't make change for customers!" }],
            seconds: 30,
          },
          think: {
            q: "Why make a checklist before you open?",
            choices: [
              "So you don't forget important things",
              "So the lemonade tastes sweeter",
              "So you can skip setting up",
              "So nobody has a job",
            ],
            answer: 0,
            why: "A checklist makes sure you have everything before customers arrive.",
            hints: [
              "",
              "A list doesn't change the taste! What does a list help you remember?",
              "You still have to set up. The list helps you set up right.",
              "Planning gives everyone a job, not no job.",
            ],
          },
          approaches: {
            analogy:
              "A checklist is like packing for a trip. If you check your list before you leave, you won't get to the beach and find you forgot your swimsuit.",
            example:
              "Mia's team writes a list: table, sign, 30 cups, ice, lemonade, napkins, cash box with $10 in coins and small bills. They check each item off. When the first customer pays with a $5 bill, Mia has change ready.",
            simpler: {
              q: "Which one does a lemonade stand need?",
              choices: ["Cups", "A snowboard", "A fishing pole"],
              answer: 0,
              why: "You need cups to serve lemonade.",
              hints: [
                "",
                "A snowboard won't help you sell lemonade!",
                "A fishing pole is for the lake, not the lemonade stand.",
              ],
            },
          },
        },
        {
          title: "Great service",
          teach:
            "Great service is what makes customers come back. Say hello and smile. Look people in the eye. Say please and thank you. Count change carefully. If a customer pays $5 for a $2 lemonade, give back $3. If something goes wrong, like a spilled cup, stay calm, say sorry and make it right with a fresh one. Customers remember how you made them feel.",
          visual: {
            type: "compare",
            left: {
              title: "Great service",
              points: ["Smile and say hello", "Please and thank you", "Careful, correct change", "Fix mistakes kindly"],
            },
            right: {
              title: "Poor service",
              points: ["Looking at the ground", "No thank-you", "Wrong change", "Blaming the customer"],
            },
          },
          probe: {
            type: "number",
            prompt: "Cookies cost $2 each. A customer buys 2 cookies and pays with a $10 bill. How much change do you give back?",
            answer: 6,
            unit: "$",
            hint: "First find what 2 cookies cost. Then count up from that to $10.",
            mistakes: [
              { match: "8", coach: "That's the change for only one cookie. The customer bought 2 cookies, which cost $4." },
              { match: "4", coach: "$4 is what the cookies cost. Change is what's left from the $10." },
              { match: "14", coach: "That added. Change is what's left after paying, so subtract." },
            ],
            seconds: 30,
          },
          think: {
            q: "A customer spills her lemonade. What should you do?",
            choices: ["Laugh at her", "Charge her again", "Stay calm, say sorry and give her a fresh cup", "Close the stand"],
            answer: 2,
            why: "Making it right kindly turns a bad moment into a reason to come back.",
            hints: [
              "Laughing would hurt her feelings. How would you want to be treated?",
              "Charging again would feel unfair to her. How can you make it right?",
              "",
              "One spill is no reason to close! How can you fix it?",
            ],
          },
          approaches: {
            analogy:
              "Great service is like being a good host when friends come over. You say hi, make them comfortable, and thank them for coming. Customers feel the same way.",
            example:
              "A man buys a $2 lemonade with a $5 bill. Leo smiles, says 'Thank you!', and counts the change out loud: '$2... $3, $4, $5.' He hands back $3. The man says, 'I'll be back next Saturday.'",
            simpler: {
              q: "A lemonade costs $2. A customer pays with $5. How much change?",
              choices: ["$3", "$7", "$2"],
              answer: 0,
              why: "$5 - $2 = $3.",
              hints: [
                "",
                "That added. Change is what's left, so subtract.",
                "That's the price. What's left from the $5?",
              ],
            },
          },
        },
        {
          title: "Lead by helping",
          teach:
            "Every team needs a good leader. A good leader doesn't boss people around. A good leader makes sure everyone knows their job, pitches in wherever help is needed and thanks teammates for their work. When the day is over, the whole team cleans up together. Then count the money with a parent and talk about what went well and what to do better next time.",
          visual: {
            type: "flip",
            cards: [
              { front: "Knows the plan", back: "Makes sure each person knows their job." },
              { front: "Pitches in", back: "Jumps in to help wherever the team is busiest." },
              { front: "Says thanks", back: "Thanks teammates for their hard work." },
              { front: "Gets better", back: "Asks: what went well, and what can we do better next time?" },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap everything a good team leader does.",
            sentences: [
              "Helps the cashier when the line gets long",
              "Yells at teammates who make mistakes",
              "Thanks everyone at the end of the day",
              "Makes sure each person knows their job",
              "Sits in the shade while others work",
              "Asks the team what to do better next time",
            ],
            correct: [0, 2, 3, 5],
            hint: "A good leader serves the team. Look for helping, thanking and planning.",
            mistakes: [
              { match: "Tapped yelling", coach: "Yelling makes teammates feel bad. A good leader stays calm and helps." },
              { match: "Tapped sitting in the shade", coach: "A good leader pitches in instead of watching others work." },
            ],
            seconds: 30,
          },
          think: {
            q: "The line is long and the cashier is overwhelmed. What does a good leader do?",
            choices: ["Tells the cashier to hurry up", "Goes home", "Pitches in to help", "Takes a nap"],
            answer: 2,
            why: "A good leader jumps in where the team needs help most.",
            hints: [
              "Hurrying someone doesn't help them. What could the leader DO?",
              "Leaving makes things worse for the team.",
              "",
              "A nap won't help the line move!",
            ],
          },
          approaches: {
            analogy:
              "A good leader is like the captain of a rowing boat who also picks up an oar. Everyone rows together, and the captain keeps them pulling in the same direction.",
            example:
              "Grace leads her stand team. When the line gets long, she grabs cups and helps pour. At the end, she says, 'Thanks, Ben, for great greeting!' Then they count $18 with Mom and agree to bring more ice next time.",
            simpler: {
              q: "A good leader...",
              choices: ["helps the team", "bosses everyone around", "does nothing"],
              answer: 0,
              why: "Good leaders help their team succeed.",
              hints: [
                "",
                "Bossing people around makes teammates unhappy.",
                "A leader who does nothing isn't leading.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put a lemonade stand day in order.",
        steps: [
          "Make a checklist and pick roles",
          "Set up the table, sign and supplies",
          "Greet customers and serve them well",
          "Clean up together",
          "Count the money with a parent and talk about what to improve",
        ],
      },
      explain: {
        prompt: "Explain how a team can run a great lemonade stand. Talk about roles, planning and service.",
        keyPoints: [
          "Each teammate has a clear role",
          "Plan ahead with a checklist",
          "Great service: smile, thank you, careful change",
          "A good leader helps and thanks the team",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each moment at the stand to the teammate who handles it.",
          pairs: [
            { left: "A family is walking past and hasn't noticed the stand", right: "Greeter" },
            { left: "The pitcher is almost empty", right: "Maker" },
            { left: "A customer hands over a $5 bill", right: "Cashier" },
            { left: "Used cups are piling up on the table", right: "Cleaner" },
          ],
          hint: "Think about which role's job fits each moment.",
          mistakes: [{ match: "Mixed up maker and cleaner", coach: "The maker fills the pitcher. The cleaner takes care of the mess." }],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "Lemonade is $1 a cup. A customer buys 3 cups and pays with a $5 bill. How much change do you give back?",
          answer: 2,
          unit: "$",
          hint: "3 cups cost $3. Count up from $3 to $5.",
          mistakes: [
            { match: "4", coach: "That's the change for only 1 cup. The customer bought 3 cups." },
            { match: "8", coach: "That added. Change is what's left after paying, so subtract." },
            { match: "3", coach: "$3 is what the 3 cups cost. What's left from the $5?" },
          ],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "Sort each one: GREAT service or POOR service?",
          buckets: ["Great service", "Poor service"],
          items: [
            { text: "Smiling and saying hello", bucket: 0 },
            { text: "Counting change out loud so it's right", bucket: 0 },
            { text: "Saying thank you", bucket: 0 },
            { text: "Playing on a tablet while a customer waits", bucket: 1 },
            { text: "Arguing with a customer about a spill", bucket: 1 },
            { text: "Giving the wrong change and not checking", bucket: 1 },
          ],
          hint: "Great service makes the customer feel welcome and treated fairly.",
          mistakes: [{ match: "Put arguing in Great", coach: "Arguing makes customers leave. Say sorry and make it right instead." }],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "Each job on a team is called a {0}. The {1} takes money and counts change. Before opening, make a {2} so you don't forget anything.",
          blanks: [{ answers: ["role", "job"] }, { answers: ["cashier"] }, { answers: ["checklist", "list", "plan"] }],
          bank: ["role", "cashier", "checklist", "greeter", "nap", "price"],
          hint: "Think about the word for a team job, who handles the money, and what you write before opening.",
          mistakes: [
            { match: "greeter", coach: "The greeter says hello. Who handles the money?" },
            { match: "nap", coach: "A nap won't help you remember the cups! What do you write before you open?" },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What does the greeter do at a lemonade stand?",
          choices: ["Counts the money", "Smiles, waves and invites people over", "Squeezes the lemons", "Takes out the trash"],
          answer: 1,
          why: "The greeter welcomes people and invites them to the stand.",
        },
        {
          q: "A lemonade costs $3. A customer pays with a $5 bill. How much change?",
          choices: ["$8", "$3", "$2"],
          answer: 2,
          why: "$5 - $3 = $2.",
        },
        {
          q: "What did Henry Ford's factory show in 1913?",
          choices: [
            "When each worker has one clear job, work can go much faster",
            "Cars are easy to build alone",
            "Factories don't need workers",
          ],
          answer: 0,
          why: "Giving each worker one job on a moving line cut the time to build a car from about 12 hours to about an hour and a half.",
        },
        {
          q: "What does a good team leader do?",
          choices: ["Bosses everyone around", "Does all the work alone", "Keeps all the money", "Helps where needed and thanks the team"],
          answer: 3,
          why: "A good leader serves the team: helping, organizing and saying thanks.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent's okay, run a real mini-business for one afternoon with a sibling or friend: a lemonade stand, a bake sale or a yard-helper day. Give each person a role, make a checklist before you open, and serve every customer with a smile and a thank-you. Afterward, count the money with a parent and write 3 things that went well and 1 thing to do better next time.",
        rubric: [
          "Each person had a clear role",
          "Used a checklist to get ready",
          "Showed great service: greetings, thank-yous and careful change",
          "Wrote 3 things that went well and 1 thing to improve",
        ],
      },
    },
  ],
};
