import type { Course } from "./types";

export const entrepreneurship: Course = {
  id: "business",
  title: "Entrepreneurship: Build a Business",
  icon: "🚀",
  hue: 25,
  track: "life",
  subject: "Other",
  blurb:
    "Start your own real mini-business: find a problem, meet your customers, set a price, pitch, launch, and learn from the numbers.",
  teacher: {
    name: "Coach Edison",
    avatar: "💡",
    inspiredBy: "Thomas Edison, inventor and business builder",
    voice:
      "Energetic builder who loves testing ideas fast, learning from failure, and serving customers.",
  },
  lessons: [
    {
      id: "business.problems",
      title: "Problems Are Opportunities",
      minutes: 30,
      stage: "grammar",
      read: `Every business you have ever bought something from exists for one reason: it solves a problem for someone. A grocery store solves the problem of "I need food but I can't grow it all myself." A plumber solves "water is spraying out of my wall." Even a candy shop solves a problem: "I want a treat right now." An entrepreneur is a person who spots a problem, builds a way to solve it, and offers that solution to other people.

That means the best place to find a business idea is not inside your head. It is all around you. Whenever you hear someone complain, sigh, or say "I wish somebody would...", you just heard a possible business.

In the winter of 1902, a woman named Mary Anderson rode a streetcar in New York City. Snow and sleet kept piling up on the front window, and the driver had to keep opening it or leaning out to see. Passengers froze. Most people just grumbled. Mary went home and designed a hand-operated arm with a rubber blade that wiped the glass from inside the vehicle. She received a patent for it in 1903, and today nearly every car in the world has windshield wipers.

You can train your eyes to notice problems the same way. Watch your family for a week. Does your neighbor struggle to get the trash cans to the curb? Do younger kids on your street need help learning to ride bikes? Are the plants at your church wilting because nobody remembers to water them? Do busy parents wish someone would wash their car or walk their dog?

Not every problem makes a good business for you. A good one is a problem that real people have, that they would happily pay a little to fix, and that you can actually solve with your skills, time, and a parent's okay. Start by collecting many problems. Then pick the one that fits you best.`,
      keyIdeas: [
        "Every business exists to solve a problem for someone.",
        "Complaints and \"I wish...\" sentences are clues to business ideas.",
        "Pick a problem people will pay to fix that you can actually solve.",
      ],
      hook: {
        text: "Around 1920, a man named Earle Dickson noticed that his wife kept getting small cuts in the kitchen, and the big bandages of the time kept falling off. He stuck little squares of gauze onto strips of tape so she could put one on by herself. That tiny fix for one person's problem became the Band-Aid.",
      },
      teach: [
        {
          title: "Every business solves a problem",
          teach:
            "Pick any business you know: a grocery store, a pizza place, a car wash. Each one stays open for one reason: it solves a problem for someone. The grocery store solves 'I need food but I can't grow it all myself.' The pizza place solves 'I'm hungry and too tired to cook.' The car wash solves 'My car is filthy and I don't have time.' People happily hand over money because their problem goes away. An entrepreneur is a person who spots a problem, builds a way to solve it, and offers that solution to others. So the first question for any business idea is never 'What can I sell?' It is 'Whose problem am I solving?'",
          visual: {
            type: "flip",
            cards: [
              { front: "Grocery store", back: "Solves: I need food, but I can't grow it all myself." },
              { front: "Plumber", back: "Solves: Water is spraying out of my wall!" },
              { front: "Dog walker", back: "Solves: My dog is home alone all day and needs exercise." },
              { front: "Entrepreneur", back: "A person who spots a problem, builds a way to solve it, and offers it to others." },
            ],
          },
          probe: {
            type: "cloze",
            text: "A bike repair shop stays open because customers say, 'My bike is {0} and I can't fix it myself.' An entrepreneur spots a {1}, builds a way to solve it, and offers it to others.",
            blanks: [
              { answers: ["broken"] },
              { answers: ["problem"] },
            ],
            bank: ["broken", "problem", "shiny", "product", "famous", "cheap"],
            hint: "Think about what is going wrong for the customer before they walk into the shop.",
            mistakes: [
              {
                match: "shiny",
                coach: "Nobody brings a bike to a repair shop because it's shiny. What's wrong with it?",
              },
              {
                match: "product",
                coach: "Entrepreneurs start with what's going wrong for people, not with a thing to sell.",
              },
              { match: "famous", coach: "Fame doesn't keep a shop open. Fixing something people need does." },
            ],
            seconds: 30,
          },
          think: {
            q: "What problem does a bike repair shop solve?",
            choices: [
              "People want shiny new helmets",
              "My bike is broken and I can't fix it myself",
              "Bikes are too cheap",
              "The shop needs more customers",
            ],
            answer: 1,
            why: "A repair shop exists because people have broken bikes they can't or don't want to fix themselves.",
            hints: [
              "Some shops sell helmets too, but that's a side product. Think about what the word 'repair' means.",
              "",
              "That isn't a problem anyone needs solved. Ask what is going wrong for the customer.",
              "That's the shop's worry, not the customer's. A business solves the CUSTOMER'S problem.",
            ],
          },
          approaches: {
            analogy:
              "A business is like a key, and a problem is like a locked door. Nobody pays for a key just because it is shiny. They pay because it opens a door they need to get through. Find the locked door first, then make the key.",
            example:
              "Maya notices that the neighbors near her grandmother struggle to carry heavy groceries up their steep driveways. That's the problem. Her solution: with her dad's help, she offers to carry groceries in for $3 a trip. Her customers are the neighbors with steep driveways. Problem, solution, customer: that's a business.",
            simpler: {
              q: "A business exists mainly to...",
              choices: ["solve a problem for someone", "look cool", "keep the owner busy"],
              answer: 0,
              why: "Customers pay because a business makes a problem go away for them.",
              hints: [
                "",
                "Looking cool doesn't bring customers back. What makes people willing to pay?",
                "Being busy doesn't help anyone unless you are fixing something for them.",
              ],
            },
          },
        },
        {
          title: "Listen for complaints and wishes",
          teach:
            "Business ideas don't usually arrive like lightning inside your head. They show up in other people's sentences. Whenever someone sighs, complains, or says 'I wish somebody would...', they just told you about a problem. 'Ugh, the trash cans are so heavy.' 'I never have time to water the garden.' 'I wish my little brother could learn to ride a bike.' Each of those is a clue. Happy sentences like 'What a nice day!' are wonderful, but they don't point to a problem. Try carrying a small notebook for a week and writing down every complaint or wish you hear. You will be surprised how many you collect.",
          visual: {
            type: "sort",
            prompt: "Which sentences are clues to a business idea?",
            buckets: ["Business clue", "Not a clue"],
            items: [
              { text: "I wish someone could mow my lawn while I'm away.", bucket: 0 },
              { text: "This sunny weather is great!", bucket: 1 },
              { text: "My trash cans are too heavy to drag to the curb.", bucket: 0 },
              { text: "That movie was so funny.", bucket: 1 },
              { text: "I never remember to water my plants.", bucket: 0 },
              { text: "Dinner was delicious tonight.", bucket: 1 },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "You overheard these at a family picnic. Tap every sentence that is a clue to a possible business.",
            sentences: [
              "I wish someone would pull the weeds in my garden. My back hurts too much.",
              "These burgers are delicious!",
              "Ugh, I never have time to wash the car anymore.",
              "What a beautiful sunset.",
              "My little brother still can't ride his bike, and I don't know how to teach him.",
              "I love this song.",
            ],
            correct: [0, 2, 4],
            hint: "Listen for sighs, complaints, and 'I wish' sentences: they describe something someone wants changed.",
            mistakes: [
              {
                match: "Tapped a happy sentence",
                coach: "Happy sentences are nice, but nothing needs fixing. Look for something going wrong.",
              },
              {
                match: "Missed the bike-riding sentence",
                coach: "It doesn't say 'I wish,' but it describes a problem a kid could help with.",
              },
            ],
            seconds: 35,
          },
          think: {
            q: "Your neighbor says, 'I wish someone would pull the weeds in my garden. My back hurts too much.' What did you just hear?",
            choices: [
              "Just a bad mood you should ignore",
              "A complaint about the weather",
              "A clue to a possible business",
              "A reason to give advice about backs",
            ],
            answer: 2,
            why: "An 'I wish someone would...' sentence describes a real problem that someone might pay to have solved.",
            hints: [
              "Complaints can sound grumpy, but entrepreneurs listen closely because they point to problems.",
              "Read it again: she's talking about weeds and her back, not the weather.",
              "",
              "Being kind is great, but the bigger idea is that she described a problem someone could help solve.",
            ],
          },
          approaches: {
            analogy:
              "Think of a detective. A detective doesn't wait for the answer to fall from the sky. She listens to what people say and notices small details. Complaints and wishes are an entrepreneur's clues.",
            example:
              "In one week, Leo writes down what he hears: 'The dog keeps tracking mud in.' 'I wish someone could carry in our firewood.' 'I never have time to wash the car.' 'Our yard is covered in leaves.' 'My little sister needs help with spelling.' Five sentences gave Leo five possible businesses: wiping muddy paws, stacking firewood, washing cars, raking leaves, and spelling tutoring.",
            simpler: {
              q: "Which sentence is a wish?",
              choices: ["The sky is blue.", "I wish my car was clean.", "I ate lunch."],
              answer: 1,
              why: "It starts with 'I wish,' which tells you about something the person wants changed.",
              hints: [
                "That's just a fact about the sky, not a wish.",
                "",
                "That's something that already happened, not a wish.",
              ],
            },
          },
        },
        {
          title: "Train your eyes like Mary Anderson",
          teach:
            "In the winter of 1902, Mary Anderson rode a streetcar in New York City. Sleet kept piling up on the front window, so the driver had to keep opening it to see, and the passengers froze. Most riders just grumbled. Mary did something different. She went home and designed a hand-operated arm with a rubber blade that cleared the glass from inside. She received a patent in 1903, and today nearly every car has windshield wipers. The difference between Mary and the grumblers wasn't luck. She noticed a problem, thought about who was suffering, and imagined a fix. You can practice that same habit every single day.",
          visual: {
            type: "sequence",
            prompt: "Put Mary Anderson's way of thinking in order.",
            steps: [
              "Notice something that isn't working",
              "Ask who is having the problem",
              "Imagine a way to fix it",
              "Build or sketch the solution",
              "Offer it to the people who need it",
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put Mary Anderson's story in order, from problem to invention.",
            steps: [
              "Sleet piles up on the streetcar's front window",
              "The driver struggles to see, and passengers freeze",
              "Mary notices the problem while other riders grumble",
              "She designs an arm with a rubber blade to clear the glass",
              "She receives a patent in 1903",
            ],
            hint: "Start with the weather, and remember that noticing comes before designing.",
            mistakes: [
              {
                match: "Put the design before noticing the problem",
                coach: "Mary couldn't design a fix until she noticed what was wrong. Noticing comes first.",
              },
              {
                match: "Put the patent before the design",
                coach: "A patent protects an invention that already exists, so the design comes first.",
              },
            ],
            seconds: 40,
          },
          think: {
            q: "What made Mary Anderson different from the other passengers?",
            choices: [
              "She had more money than everyone else",
              "She was the driver",
              "She complained louder",
              "She turned a problem she noticed into a solution",
            ],
            answer: 3,
            why: "Everyone saw the problem, but she took the next step and designed a fix.",
            hints: [
              "Money didn't clear the window. Think about what she DID after the ride.",
              "She was a passenger, not the driver. She still noticed the driver's problem.",
              "Everyone was grumbling. Complaining alone doesn't fix anything.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Spotting problems is like learning to spot birds. At first you only see 'a bird.' After practice you notice colors, songs, and nests everywhere. Your eyes get trained, and the same thing happens when you practice noticing problems.",
            example:
              "Try Mary's steps on your own street. Notice: the tomato plants in the community garden are wilting. Who has the problem: the garden volunteers, who are busy on weekdays. Imagine a fix: a weekday watering schedule. Build it: you make a chart and, with a parent's okay, plan to water on Tuesdays and Thursdays. Offer it: you ask the garden leader if they'd like your help.",
            simpler: {
              q: "What problem did Mary Anderson notice?",
              choices: [
                "The driver couldn't see through the sleet on the window",
                "The streetcar had no seats",
                "The tickets cost too much",
                "The streetcar was painted the wrong color",
              ],
              answer: 0,
              why: "Sleet covered the window, so the driver couldn't see clearly.",
              hints: [
                "",
                "The story never mentions seats. Think about the weather.",
                "Tickets aren't part of her story. What did the sleet cover up?",
                "Color wasn't the issue. What made driving hard?",
              ],
            },
          },
        },
        {
          title: "Is it a good fit for you?",
          teach:
            "Not every problem makes a good business for YOU. Run each idea through three tests. First, is it real? Other people, not just you, actually have this problem. Second, would they pay a little to fix it? Some problems are annoying but not worth money to anyone. Third, can you solve it with your skills, your time, and a parent's okay? Fixing a car engine fails test three for now. Walking a neighbor's friendly dog might pass all three. That's why smart entrepreneurs collect lots of problems first. The more you collect, the better your chances of finding one that passes every test.",
          visual: {
            type: "compare",
            left: {
              title: "Good fit",
              points: [
                "Many neighbors have the problem",
                "They'd happily pay a few dollars",
                "You can do it safely with a parent's okay",
                "You enjoy doing it",
              ],
            },
            right: {
              title: "Poor fit",
              points: [
                "Only you care about it",
                "Nobody would pay to fix it",
                "Needs a factory or a driver's license",
                "You'd dread doing it",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Run each idea through the three tests: real problem, worth paying for, and you can solve it. Where does it go?",
            buckets: ["Passes all three", "Fails a test"],
            items: [
              { text: "Rolling neighbors' trash cans to the curb each week", bucket: 0 },
              { text: "Building cars in your garage", bucket: 1 },
              { text: "Watering plants for families on vacation", bucket: 0 },
              { text: "Selling stickers that only you think are cool", bucket: 1 },
              { text: "Opening a restaurant next week", bucket: 1 },
              { text: "Walking a friendly neighbor dog after school", bucket: 0 },
            ],
            hint: "For each idea ask: do real people have it, would they pay a little, and can a kid do it safely with a parent's okay?",
            mistakes: [
              {
                match: "Put cars or the restaurant in passes",
                coach: "Those need big money, licenses, or adult skills, so they fail the 'can you solve it?' test.",
              },
              {
                match: "Put the stickers in passes",
                coach: "If only you want it, it fails the first test: real people must have the problem.",
              },
            ],
            seconds: 50,
          },
          think: {
            q: "Which idea passes all three tests for a 12-year-old?",
            choices: [
              "Building cars in your garage",
              "Opening a restaurant next week",
              "Selling something only you want",
              "Helping neighbors take trash cans to the curb for a small weekly fee",
            ],
            answer: 3,
            why: "Neighbors really have this problem, many would pay a little, and a kid can do it with a parent's okay.",
            hints: [
              "Cars need big skills, tools, and money. That fails the 'can you solve it?' test.",
              "A restaurant needs licenses, lots of money, and adults. That fails test three.",
              "If only you want it, it fails test one: real people must have the problem.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Choosing a business problem is like choosing shoes. A pair might be beautiful, but if it doesn't fit your feet, you can't walk in it. The right problem has to be real, worth paying for, AND fit you.",
            example:
              "Ava lists three ideas. Baking fancy birthday cakes: people pay for them, but she can't bake well yet, so it fails test three for now. Building a robot butler: far too hard, fails test three. Watering plants for neighbors on vacation: three neighbors said they need it (real), two said they'd pay $5 a week (worth paying for), and she can do it with her mom nearby (can solve). The plant-watering idea wins.",
            simpler: {
              q: "Test one asks: do real people have this problem? Which one passes?",
              choices: [
                "Only I am bothered by it",
                "Lots of busy parents on my street mention it",
                "Nobody has ever mentioned it",
              ],
              answer: 1,
              why: "When many people mention the same problem, you know it's real.",
              hints: [
                "If only you have it, there are no customers.",
                "",
                "If nobody mentions it, it may not be a real problem for anyone.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item: is it a PROBLEM someone has, or a SOLUTION a business offers?",
        buckets: ["Problem", "Solution"],
        items: [
          { text: "My dog is alone all day", bucket: 0 },
          { text: "After-school dog walks", bucket: 1 },
          { text: "Snow covers the streetcar window", bucket: 0 },
          { text: "Windshield wipers", bucket: 1 },
          { text: "My plants wilt while I'm on vacation", bucket: 0 },
          { text: "A plant-watering service", bucket: 1 },
          { text: "My trash cans are too heavy", bucket: 0 },
          { text: "Weekly trash-can curb service", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "In your own words, explain how an entrepreneur finds a good business idea. Use an example from your own life.",
        keyPoints: [
          "Businesses exist to solve problems for people",
          "Complaints and wishes are clues to problems",
          "A good problem is real, worth paying for, and something you can solve",
          "Collect many problems before choosing one",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each business to the problem it solves.",
          pairs: [
            { left: "Grocery store", right: "I need food, but I can't grow it all myself." },
            { left: "Windshield wipers", right: "Sleet covers the window and the driver can't see." },
            { left: "Band-Aid", right: "Big bandages keep falling off small kitchen cuts." },
            { left: "Dog walker", right: "My dog is home alone all day and needs exercise." },
            { left: "Trash-can curb service", right: "My cans are too heavy to drag to the street." },
          ],
          hint: "For each business, ask: what was going wrong for the customer before it existed?",
          mistakes: [
            {
              match: "Mixed up wipers and Band-Aid",
              coach: "Mary Anderson's wipers came from a snowy streetcar ride. The Band-Aid came from kitchen cuts.",
            },
          ],
          seconds: 50,
        },
        {
          type: "build",
          prompt: "Build the definition of an entrepreneur.",
          tiles: [
            "An entrepreneur",
            "spots a problem,",
            "builds a way to solve it,",
            "and offers it to other people.",
          ],
          distractors: ["copies the most popular store,", "and waits for an idea to strike."],
          hint: "It starts with noticing something that's wrong for people.",
          mistakes: [
            {
              match: "Used 'copies the most popular store'",
              coach: "Copying skips the most important step: finding a problem real people have.",
            },
            {
              match: "Used 'waits for an idea to strike'",
              coach: "Ideas come from noticing complaints and wishes, not from waiting.",
            },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Before choosing a business, run three tests: the problem must be {0} (other people actually have it), people must be willing to {1} a little to fix it, and you must be able to {2} it with your skills, time, and a parent's okay.",
          blanks: [
            { answers: ["real", "true", "common"] },
            { answers: ["pay", "spend"] },
            { answers: ["solve", "fix", "handle", "do"] },
          ],
          hint: "Remember the three questions: is it real, is it worth money, and can you do it?",
          mistakes: [
            {
              match: "fun",
              coach: "Enjoying it helps, but the first test is whether other people really have the problem.",
            },
            { match: "sell", coach: "The second test is about the customer: would they pay to fix it?" },
          ],
          seconds: 45,
        },
        {
          type: "sort",
          prompt: "Sort each item: a PROBLEM someone has, or a SOLUTION a business offers?",
          buckets: ["Problem", "Solution"],
          items: [
            { text: "My garden dries out every time we travel", bucket: 0 },
            { text: "A vacation plant-watering service", bucket: 1 },
            { text: "My little brother can't ride a bike yet", bucket: 0 },
            { text: "Weekend bike-riding lessons", bucket: 1 },
            { text: "Our car is always dusty and I'm too busy", bucket: 0 },
            { text: "A driveway car wash", bucket: 1 },
          ],
          hint: "A problem is something going wrong for someone. A solution is what a business offers to fix it.",
          mistakes: [
            {
              match: "Put a service or lesson in Problem",
              coach: "Services and lessons are offers that fix things, so they're solutions.",
            },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "What is the main reason every business exists?",
          choices: [
            "To make the owner famous",
            "To solve a problem for someone",
            "To use up extra money",
            "To beat other businesses",
          ],
          answer: 1,
          why: "Businesses earn money only because they solve problems that people care about.",
        },
        {
          q: "What problem did Mary Anderson notice that led to the windshield wiper?",
          choices: [
            "Streetcar drivers could not see through snow and sleet on the window",
            "Cars were too slow in winter",
            "Passengers could not find their seats",
          ],
          answer: 0,
          why: "She watched a driver struggle to see through a snowy window and designed a way to clear it.",
        },
        {
          q: "Which sentence is the best clue to a possible business idea?",
          choices: [
            "\"I love this sunny weather.\"",
            "\"That movie was fun.\"",
            "\"I wish somebody would walk my dog while I'm at work.\"",
            "\"Dinner was delicious.\"",
          ],
          answer: 2,
          why: "A wish for help points straight to a problem someone might pay to have solved.",
        },
        {
          q: "Which of these makes a problem a GOOD business for you?",
          choices: [
            "Only you have the problem",
            "Nobody would pay to fix it",
            "It needs a factory and a million dollars",
            "Real people have it, would pay a little to fix it, and you can solve it",
          ],
          answer: 3,
          why: "A good business problem is real, worth paying for, and something you can actually handle.",
        },
        {
          q: "What is the smartest first step when looking for an idea?",
          choices: [
            "Collect many problems, then choose the best fit",
            "Pick the very first idea and never change it",
            "Copy whatever business is most popular",
          ],
          answer: 0,
          why: "Gathering lots of problems first gives you more choices and a better chance of a great fit.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Spend a day or two noticing problems around your home, neighborhood, and community. List 5 real problems you observed. For each one, write who has the problem. Then pick ONE to build your business around and explain in a few sentences why you chose it: who would pay, and how you could solve it.",
        rubric: [
          "Lists 5 specific, real problems (not vague ideas)",
          "Names who has each problem",
          "Clearly picks one problem to work on",
          "Explains why it is a good fit: people would pay, and the student can solve it",
        ],
      },
    },
    {
      id: "business.customers",
      title: "Know Your Customer",
      minutes: 35,
      stage: "logic",
      read: `When Thomas Edison was about 21 years old, he earned his very first patent. It was an electric vote recorder that let lawmakers vote with the flip of a switch instead of calling out their names one by one. It worked perfectly. There was just one problem: the lawmakers did not want it. Slow voting gave them time to argue and change minds, and they liked it that way. Edison could not sell a single one.

He learned a lesson he never forgot. From then on, he said he would only invent things that people actually wanted. He had built a great solution without asking the customer first.

Your customer is the person who has the problem and would pay to solve it. Before you spend money or time building anything, you need to know that customer well. Who are they? Busy parents? Elderly neighbors? Kids your age? What bothers them most about the problem? What do they do about it now? How much would solving it be worth to them?

The best way to find out is a customer interview, which is simply a conversation where you ask good questions and then really listen. Good questions are open-ended, which means they cannot be answered with just "yes" or "no." Instead of asking "Would you buy my dog-walking service?" (people often say yes just to be nice), ask "Tell me about the last time you couldn't walk your dog. What did you do?"

Listening is the secret skill. Let the person talk. Do not argue or try to sell. Write down their exact words, because those words often hold surprises. You might learn that your neighbor does not care about a dog walk at all, but would love someone to scoop the yard. That is not bad news. That is gold, because now you are building something a real person wants.

Always interview people you know or who your parents know, and always have a parent with you.`,
      keyIdeas: [
        "Your customer is the person who has the problem and would pay to solve it.",
        "Ask open-ended questions about real past experiences, not \"Would you buy this?\"",
        "Listen more than you talk, and write down customers' exact words.",
      ],
      hook: {
        text: "Thomas Edison's very first patented invention worked perfectly, and he could not sell a single one. The machine wasn't broken. So what went wrong? By the end of this lesson, you'll know the secret he learned the hard way.",
      },
      teach: [
        {
          title: "Who is your customer?",
          teach:
            "Your customer is the person who has the problem and would pay to solve it. That sounds simple, but beginners often skip it. They fall in love with their idea and build it before asking anyone. Edison did exactly that with his electric vote recorder, which let lawmakers vote with the flip of a switch. But the lawmakers liked slow voting, because it gave them time to argue and change minds. A perfect machine, zero customers. After that, Edison said he would only invent things people actually wanted. Before you build anything, find out who exactly your customer is and what they really want.",
          visual: {
            type: "flip",
            cards: [
              { front: "Customer", back: "The person who has the problem and would pay to solve it." },
              { front: "Customer interview", back: "A conversation where you ask good questions and really listen." },
              { front: "Open-ended question", back: "A question that can't be answered with just yes or no." },
              { front: "Feedback", back: "What customers tell you, good or bad, that helps you improve." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Edison's vote recorder worked {0}, but the lawmakers liked {1} voting because it gave them time to argue. The lesson: find out what the {2} wants before you build.",
            blanks: [
              { answers: ["perfectly", "well", "fine"] },
              { answers: ["slow", "slower"] },
              { answers: ["customer", "customers"] },
            ],
            bank: ["perfectly", "slow", "customer", "badly", "fast", "inventor"],
            hint: "Remember: the machine itself was fine. The trouble was what the buyers wanted.",
            mistakes: [
              { match: "badly", coach: "The machine actually worked. Its problem was something else." },
              {
                match: "fast",
                coach: "If the lawmakers liked fast voting, they would have bought it! What did they prefer?",
              },
              { match: "inventor", coach: "Edison already knew what HE wanted. Who should he have asked?" },
            ],
            seconds: 35,
          },
          think: {
            q: "Why did Edison's vote recorder fail?",
            choices: [
              "It broke every time it was used",
              "It cost too much to build",
              "He built it before learning that his customers didn't want it",
              "The lawmakers couldn't figure out the switch",
            ],
            answer: 2,
            why: "The machine worked, but the lawmakers liked slow voting, so they had no reason to buy it.",
            hints: [
              "It actually worked perfectly. The problem wasn't the machine.",
              "Price wasn't the issue. Even a free one wouldn't have been wanted.",
              "",
              "Flipping a switch is easy. The trouble was that they didn't WANT faster voting.",
            ],
          },
          approaches: {
            analogy:
              "Imagine baking a giant coconut birthday cake without asking the birthday girl, who hates coconut. The cake is perfect, but it isn't what she wanted. Always ask the customer before you bake.",
            example:
              "Sam wants to sell homemade bird feeders. Before building 20 of them, he talks with 5 neighbors about their yards. Only 1 feeds birds. But 4 of them say squirrels keep digging up their flower bulbs. By asking first, Sam avoided building about 19 feeders nobody wanted, and he found a new problem to explore.",
            simpler: {
              q: "Who is your customer?",
              choices: [
                "Anyone you meet",
                "The person who has the problem and would pay to solve it",
                "Your best friend",
                "Yourself",
              ],
              answer: 1,
              why: "A customer is defined by having the problem and being willing to pay to fix it.",
              hints: [
                "Not everyone has the problem you solve. Customers are specific people.",
                "",
                "Your friend might be a customer, but only if they have the problem.",
                "You might have the problem too, but a business needs other people who will pay.",
              ],
            },
          },
        },
        {
          title: "Ask open-ended questions",
          teach:
            "The best way to understand your customer is a customer interview: a conversation where you ask good questions and listen. The trick is asking open-ended questions, which can't be answered with just yes or no. If you ask 'Would you buy my dog-walking service?' most kind people say 'Sure!' just to be nice, and you learn nothing. Instead, ask about real past experiences: 'Tell me about the last time you couldn't walk your dog. What did you do?' Stories about what people actually did are far more honest than guesses about what they might do someday. Prepare four or five questions like that before each interview.",
          visual: {
            type: "sort",
            prompt: "Sort these interview questions.",
            buckets: ["Open-ended (great)", "Yes or no (weak)"],
            items: [
              { text: "Tell me about the last time your lawn got too long.", bucket: 0 },
              { text: "Would you buy my service?", bucket: 1 },
              { text: "What's the hardest part of getting your dog walked?", bucket: 0 },
              { text: "Do you like dogs?", bucket: 1 },
              { text: "How do you handle this problem right now?", bucket: 0 },
              { text: "Is five dollars okay?", bucket: 1 },
            ],
          },
          probe: {
            type: "sort",
            prompt: "You're preparing to interview a neighbor about leaf raking. Sort each question.",
            buckets: ["Open-ended (great)", "Yes or no (weak)"],
            items: [
              { text: "Tell me about raking leaves last fall.", bucket: 0 },
              { text: "Do you have trees?", bucket: 1 },
              { text: "What's the hardest part of keeping your yard clean?", bucket: 0 },
              { text: "Would you hire me?", bucket: 1 },
              { text: "What did you do the last time the leaves piled up?", bucket: 0 },
              { text: "Is my idea good?", bucket: 1 },
            ],
            hint: "Try answering each one yourself. If 'yes' or 'no' is a complete answer, it's a weak question.",
            mistakes: [
              {
                match: "Put 'Would you hire me?' in open-ended",
                coach: "Kind neighbors often say yes just to be nice, and it only needs one word.",
              },
              {
                match: "Put a 'Tell me' or 'What' question in yes or no",
                coach: "Questions that start with 'Tell me' or 'What did you do' invite a whole story.",
              },
            ],
            seconds: 45,
          },
          think: {
            q: "Which question will teach you the MOST?",
            choices: [
              "Do you have a dog?",
              "Would you pay me to walk your dog?",
              "Is my idea good?",
              "What happened the last time your dog needed a walk and you were busy?",
            ],
            answer: 3,
            why: "It asks for a real story from the past, which shows how big the problem is and what they actually did.",
            hints: [
              "That's a yes-or-no question. Useful to know, but it doesn't give you a story.",
              "People often say yes just to be polite, so the answer may not match what they'd really do.",
              "Friends and neighbors usually say yes to be kind, so you learn very little.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A yes-or-no question is like a flashlight that lights up one small spot. An open-ended question is like turning on all the lights in the room. Suddenly you see things you didn't know were there.",
            example:
              "Closed question: 'Do you need help with leaves?' Answer: 'Yes.' Open question: 'Tell me about raking leaves last fall.' Answer: 'It took us three weekends, and in the end we paid a company $80 because we ran out of time.' The open question revealed how big the problem is, what they did about it, and that they already paid $80 to solve it.",
            simpler: {
              q: "Which question can be answered with just yes or no?",
              choices: [
                "Do you like pizza?",
                "Tell me about your favorite meal.",
                "How do you make dinner on busy nights?",
              ],
              answer: 0,
              why: "'Do you like pizza?' only needs a yes or a no.",
              hints: [
                "",
                "This one invites a whole story, so it's open-ended.",
                "This one needs an explanation, so it's open-ended.",
              ],
            },
          },
        },
        {
          title: "Listen more than you talk",
          teach:
            "Listening is the secret skill of great entrepreneurs. During an interview, your job is not to sell, argue, or explain your idea. Your job is to learn. Let the person talk, even when there's a quiet pause. Nod, ask 'What happened next?' and write down their exact words. Exact words matter because they hold surprises and feelings you'd forget later. If a neighbor says 'I feel terrible leaving Biscuit alone all day,' you learn that the real problem is worry about her dog, not just a missed walk. Always interview people you or your parents know, and always have a parent with you.",
          visual: {
            type: "compare",
            left: {
              title: "Selling interview",
              points: [
                "Talks mostly about the product",
                "Argues when the person disagrees",
                "Asks 'Would you buy this?'",
                "Remembers almost nothing later",
              ],
            },
            right: {
              title: "Listening interview",
              points: [
                "Lets the customer do most of the talking",
                "Says 'Tell me more' instead of arguing",
                "Asks about real past experiences",
                "Writes down exact words",
              ],
            },
          },
          probe: {
            type: "match",
            prompt: "Match each interview moment to what a great listener does.",
            pairs: [
              { left: "The customer starts a long story", right: "Listen and write down their exact words" },
              { left: "There's a quiet pause", right: "Wait patiently; they may keep going" },
              {
                left: "The customer disagrees with your idea",
                right: "Say 'Tell me more' instead of arguing",
              },
              { left: "The customer finishes one part of the story", right: "Ask 'What happened next?'" },
            ],
            hint: "In every moment, your job is to learn, not to sell or argue.",
            mistakes: [
              {
                match: "Matched the disagreement to writing exact words",
                coach: "Notes are always good, but when someone disagrees, invite them to explain more.",
              },
              {
                match: "Mixed up the pause and the story",
                coach: "A pause isn't a signal to jump in. Silence often brings out the best details.",
              },
            ],
            seconds: 45,
          },
          think: {
            q: "During an interview, a customer starts telling a long story about their problem. What should you do?",
            choices: [
              "Interrupt and explain your product",
              "Listen and write down their exact words",
              "Change the subject to your price",
              "Tell them their problem isn't a big deal",
            ],
            answer: 1,
            why: "Their story is exactly the information you came for, so listening and taking notes matters most.",
            hints: [
              "Interrupting cuts off the very information you came to get.",
              "",
              "Price can come later. Right now their story is more valuable.",
              "Their feelings about the problem are important clues. Never brush them off.",
            ],
          },
          approaches: {
            analogy:
              "An interview is a bit like bird watching. If you crash around and shout, the birds fly away. If you stay quiet and patient, they come close. Quiet listening brings out the best information.",
            example:
              "Notes from Jade's interview with Mr. Lopez: 'My knees hurt, so the garden gets away from me by July.' 'I used to love my tomatoes.' 'My grandson helped, but he moved away.' From those exact words, Jade learns the real problem is weeding and watering in summer, and that Mr. Lopez misses having a helper, not just a tidy garden.",
            simpler: {
              q: "In a customer interview, who should do most of the talking?",
              choices: ["You", "The customer", "Nobody"],
              answer: 1,
              why: "You are there to learn, so the customer should do most of the talking.",
              hints: [
                "If you're talking, you aren't learning. Let them share.",
                "",
                "Silence won't teach you anything. Someone needs to share their story.",
              ],
            },
          },
        },
        {
          title: "Surprises are gold",
          teach:
            "Sometimes interviews bring news you didn't expect. You planned a dog-walking service, but your neighbor says she doesn't care about walks. She'd love someone to scoop the yard. That can feel disappointing, but it's actually gold. You learned what a real customer wants before spending time and money on the wrong thing. Smart entrepreneurs adjust their idea, which is sometimes called a pivot. Talk to several people, look for things you hear again and again, and let those patterns shape your plan. Changing your plan isn't quitting. It's listening, serving your customer, and staying persistent.",
          visual: {
            type: "sequence",
            prompt: "Put the customer interview steps in order.",
            steps: [
              "Ask a parent to help choose and arrange interviews",
              "Write 4 or more open-ended questions",
              "Ask your questions and listen",
              "Write down the customer's exact words",
              "Look for patterns and adjust your idea",
            ],
          },
          probe: {
            type: "build",
            prompt: "Three of four neighbors want garage cleanup, not car washes. Build the smart entrepreneur's next move.",
            tiles: [
              "Notice the pattern",
              "in what customers said,",
              "then adjust your idea",
              "toward what they need.",
            ],
            distractors: ["ignore them", "and give up."],
            hint: "Changing your plan isn't quitting. Start with what you heard, then decide what to do about it.",
            mistakes: [
              {
                match: "Used 'ignore them'",
                coach: "Ignoring three of four customers is how Edison ended up with zero sales.",
              },
              {
                match: "Used 'and give up.'",
                coach: "Surprises are useful information. Persistence means adjusting, not quitting.",
              },
            ],
            seconds: 35,
          },
          think: {
            q: "Three of the four people you interview say they don't need car washes, but they do need help cleaning out their garages. What's the best move?",
            choices: [
              "Ignore them and start the car wash anyway",
              "Give up on business forever",
              "Consider adjusting your idea toward garage cleanup",
              "Argue until they agree car washes matter",
            ],
            answer: 2,
            why: "When most customers point to a different need, adjusting toward it means serving what they actually want.",
            hints: [
              "Ignoring three out of four customers is how Edison ended up with zero sales.",
              "This isn't failure; it's useful information. Persistence means adjusting, not quitting.",
              "",
              "Arguing doesn't change what people actually need.",
            ],
          },
          approaches: {
            analogy:
              "It's like using a map app. When you miss a turn, the app doesn't give up. It finds a new route. Customer surprises are your business's moment to find a new route.",
            example:
              "Noah interviewed 4 neighbors about a window-washing idea. Only 1 was interested. But 3 said they wanted help rolling their recycling bins to the curb, and 2 said they'd pay $2 a week. Noah switched to recycling-bin service. Two customers at $2 each is $4 a week, or $16 over 4 weeks, from people who told him exactly what they wanted.",
            simpler: {
              q: "If customers want something different from your plan, that information is...",
              choices: ["useless", "valuable", "a reason to quit"],
              answer: 1,
              why: "It saves you from building the wrong thing and points you toward what people want.",
              hints: [
                "It's the opposite of useless. It keeps you from building the wrong thing.",
                "",
                "Good entrepreneurs don't quit. They adjust and keep going.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every OPEN-ENDED question in this interview plan.",
        sentences: [
          "Tell me about the last time you couldn't walk your dog.",
          "Would you buy my service?",
          "What do you do now when you're too busy?",
          "Do you like dogs?",
          "What's the most frustrating part of this problem?",
          "Is five dollars okay?",
        ],
        correct: [0, 2, 4],
      },
      explain: {
        prompt:
          "Explain to a friend how to find out what a customer really wants, and why Edison's vote recorder is a warning.",
        keyPoints: [
          "The customer is the person with the problem who would pay to solve it",
          "Ask open-ended questions about real past experiences",
          "Listen more than you talk and write down exact words",
          "Learn what customers want before building, and adjust if needed",
        ],
      },
      mastery: [
        {
          type: "highlight",
          prompt: "Jada is planning interviews for a pet-sitting idea. Tap every OPEN-ENDED question.",
          sentences: [
            "Do you have a cat?",
            "Tell me about the last time you went away overnight. Who cared for your pets?",
            "Would you pay me $5 a visit?",
            "What worries you most when your pets are home alone?",
            "Is my idea good?",
            "How do you handle pet care right now when you travel?",
          ],
          correct: [1, 3, 5],
          hint: "An open-ended question can't be fully answered with just yes or no. It invites a story.",
          mistakes: [
            {
              match: "Tapped 'Would you pay me $5 a visit?'",
              coach: "People often say yes to be polite, and it's a yes-or-no question.",
            },
            {
              match: "Missed 'How do you handle pet care...'",
              coach: "'How do you...' asks for an explanation, so it's open-ended.",
            },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Your customer is the person who has the {0} and would {1} to solve it. In an interview, ask about real {2} experiences instead of 'Would you buy this?'",
          blanks: [
            { answers: ["problem"] },
            { answers: ["pay"] },
            { answers: ["past"] },
          ],
          hint: "A customer is defined by two things: what's bothering them and whether they'd spend money on it.",
          mistakes: [
            {
              match: "future",
              coach: "Guesses about the future are less honest than stories about what really happened.",
            },
            { match: "product", coach: "Customers have problems first. Your product comes later." },
          ],
          seconds: 40,
        },
        {
          type: "sequence",
          prompt: "Put Sam's customer research in the right order.",
          steps: [
            "Ask a parent to help pick neighbors to interview",
            "Write open-ended questions about yards and gardens",
            "Interview neighbors and let them do most of the talking",
            "Write down their exact words, like 'Squirrels dig up my bulbs!'",
            "Spot the pattern: 4 of 5 mention squirrels, only 1 feeds birds",
            "Adjust the idea away from bird feeders",
          ],
          hint: "You can't find a pattern until you have notes, and you can't take notes until you've interviewed.",
          mistakes: [
            {
              match: "Put adjusting the idea before spotting the pattern",
              coach: "Adjust only after you see what many customers are saying.",
            },
            {
              match: "Put writing questions after the interviews",
              coach: "Good questions are prepared ahead of time.",
            },
          ],
          seconds: 55,
        },
        {
          type: "match",
          prompt: "Match each idea to what it means.",
          pairs: [
            { left: "Customer", right: "The person with the problem who would pay to solve it" },
            { left: "Open-ended question", right: "A question that can't be answered with just yes or no" },
            { left: "Pivot", right: "Adjusting your idea toward what customers really want" },
            { left: "Edison's vote recorder", right: "A perfect machine nobody wanted to buy" },
          ],
          hint: "Think back through the lesson: who, how to ask, what to do with surprises, and the warning story.",
          mistakes: [
            {
              match: "Mixed up pivot and open-ended question",
              coach: "A pivot is a change in your plan. An open-ended question is a way of asking.",
            },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "Why couldn't Edison sell his electric vote recorder?",
          choices: [
            "It broke all the time",
            "It cost too much to build",
            "The lawmakers did not actually want faster voting",
          ],
          answer: 2,
          why: "The machine worked, but it solved a problem the customers did not feel they had.",
        },
        {
          q: "Which is an open-ended interview question?",
          choices: [
            "\"Would you buy my service?\"",
            "\"Tell me about the last time your lawn got too long. What did you do?\"",
            "\"Do you like dogs?\"",
            "\"Is five dollars okay?\"",
          ],
          answer: 1,
          why: "It invites a story about a real experience instead of a quick yes or no.",
        },
        {
          q: "Why is asking \"Would you buy this?\" a weak interview question?",
          choices: [
            "People often say yes just to be polite",
            "It is too long",
            "It is against the law",
            "Customers never answer questions",
          ],
          answer: 0,
          why: "Friendly people tend to say yes, so the answer does not tell you what they will really do.",
        },
        {
          q: "During a customer interview, what should you mostly do?",
          choices: [
            "Explain your product as fast as possible",
            "Argue when they disagree",
            "Talk about yourself",
            "Listen and write down their exact words",
          ],
          answer: 3,
          why: "The point of an interview is to learn from the customer, so listening matters most.",
        },
        {
          q: "An interview shows customers want something different from your idea. What is the best response?",
          choices: [
            "Ignore it and build your original idea",
            "Quit entrepreneurship",
            "Adjust your idea toward what real customers want",
          ],
          answer: 2,
          why: "Surprises from customers are valuable because they steer you toward something people will buy.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent's help and presence, interview 3 people who might have the problem you chose (family friends, neighbors, or relatives your parent knows). Prepare at least 4 open-ended questions ahead of time. During each interview, listen and take notes using their exact words. Afterward, write a short summary: what you learned, what surprised you, and whether you will change your idea.",
        rubric: [
          "A parent arranged and was present for all 3 interviews",
          "Prepared at least 4 open-ended questions in advance",
          "Took notes during each interview, including customers' own words",
          "Wrote a summary of what was learned and any change to the idea",
        ],
      },
    },
    {
      id: "business.pricing",
      title: "Costs, Price and Profit",
      minutes: 40,
      stage: "logic",
      read: `Many young businesses fail for a simple reason: the owner never did the math. They sell lots of stuff, feel busy and successful, and then discover they spent more than they earned. Let's make sure that never happens to you.

Start with cost. Your cost per unit is how much it costs you to make one item. Imagine you want to sell cookies. One batch makes 20 cookies. The flour, sugar, butter, chocolate chips, and little bags for the batch cost $8 in total. Divide the cost by the number of cookies: $8 divided by 20 equals $0.40 per cookie.

Next comes price, which is what the customer pays you. Say you charge $1.00 per cookie. Your profit per unit is the price minus the cost per unit: $1.00 minus $0.40 equals $0.60 of profit on each cookie.

Some costs happen only once, no matter how many cookies you sell. Maybe you buy a poster board, markers, and a tablecloth for your stand for $12. These are called startup costs. Your cookie profits have to pay them back first. How many cookies until you are even? Divide the startup cost by the profit per cookie: $12 divided by $0.60 equals 20 cookies. That is your break-even point. Cookie number 21 is where you start making real profit.

How do you choose a price? Look at three things. First, it must be higher than your cost per unit, or you lose money on every sale. Second, check what similar products sell for nearby. Third, remember what customers told you in your interviews about what the solution is worth to them.

Milton Hershey learned these lessons the hard way. His first candy business in Philadelphia failed, and so did another attempt. He kept working, built a successful caramel company, and later created the Hershey chocolate company. Mistakes with money are normal. Doing the math ahead of time helps you make fewer of them.`,
      keyIdeas: [
        "Cost per unit = total cost of a batch divided by the number of items.",
        "Profit per unit = price minus cost per unit.",
        "Break-even = startup costs divided by profit per unit.",
      ],
      hook: {
        text: "A kid sells 50 cups of lemonade at 50 cents each on a hot Saturday and feels rich. Then she adds up the lemons, sugar, cups, ice, and her sign, and discovers she lost $10. How can you sell a lot and still lose money? Play with the calculator, then let's find out.",
        visual: { type: "profit", price: 0.5, cost: 0.6, fixed: 5, units: 50 },
      },
      teach: [
        {
          title: "Cost per unit",
          teach:
            "Your cost per unit is how much it costs you to make one item. Here's how to find it: add up everything you spend to make one batch, then divide by how many items the batch makes. Say one batch of cookies needs flour, sugar, butter, chocolate chips, and little bags, and all of it costs $8. The batch makes 20 cookies. So $8 divided by 20 equals $0.40 per cookie. Knowing this number is your superpower. Without it, you can't tell whether a price will earn money or lose it. Many young businesses fail simply because nobody did this math.",
          visual: {
            type: "flip",
            cards: [
              { front: "Cost per unit", back: "Total batch cost divided by items made. Example: $8 / 20 = $0.40." },
              { front: "Price", back: "What the customer pays you for one item." },
              { front: "Profit per unit", back: "Price minus cost per unit. Example: $1.00 - $0.40 = $0.60." },
              { front: "Startup costs", back: "One-time costs, like a sign, that you pay no matter how many you sell." },
              { front: "Break-even point", back: "How many sales it takes to pay back your startup costs." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A batch of 16 muffins costs $8 in ingredients and paper cups. What is the cost per muffin?",
            answer: 0.5,
            tolerance: 0.01,
            unit: "$",
            hint: "Share the batch cost across all the muffins: divide the total cost by how many the batch makes.",
            mistakes: [
              {
                match: "2",
                coach: "That's 16 divided by 8, with the numbers flipped. Divide the COST by the number of muffins.",
              },
              { match: "8", coach: "That's the whole batch. How much is just one muffin?" },
              { match: "128", coach: "That multiplied. Splitting a cost among items means dividing." },
            ],
            seconds: 30,
          },
          think: {
            q: "A batch of 12 brownies costs $6 to make. What is the cost per brownie?",
            choices: ["$2.00", "$0.50", "$6.00", "$0.72"],
            answer: 1,
            why: "$6 divided by 12 brownies is $0.50 each. Check: 12 x $0.50 = $6.",
            hints: [
              "That's 12 divided by 6, with the numbers flipped. Divide the COST by the number of items.",
              "",
              "That's the cost of the whole batch, not one brownie.",
              "That looks like 6 times 12 with the decimal moved. Divide instead: $6 / 12.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a pizza that costs $12 and is cut into 8 slices. Each slice really costs $12 / 8 = $1.50. Cost per unit is just figuring out the price of one slice of your batch.",
            example:
              "Bracelet batch: beads $4 plus string $1 makes a total of $5. The batch makes 10 bracelets. Cost per bracelet = $5 / 10 = $0.50. Check it: 10 bracelets x $0.50 = $5, which matches the batch cost.",
            simpler: {
              q: "A pack of 10 pencils costs $10. How much does one pencil cost?",
              choices: ["$10", "$1", "$100"],
              answer: 1,
              why: "$10 shared across 10 pencils is $1 each.",
              hints: [
                "$10 is the price of the whole pack, not one pencil.",
                "",
                "That's multiplying instead of dividing. Share the $10 across 10 pencils.",
              ],
            },
          },
        },
        {
          title: "Price and profit per unit",
          teach:
            "Price is what the customer pays you. Profit per unit is what you keep from each sale after paying for what went into it. The formula is price minus cost per unit. If each cookie costs you $0.40 to make and you sell it for $1.00, your profit per cookie is $1.00 minus $0.40, which equals $0.60. Sell 20 cookies and that's 20 times $0.60, or $12 of profit, before any one-time costs. Try the calculator: slide the price up and down and watch what happens to profit. What happens if the price drops below the cost?",
          visual: { type: "profit", price: 1, cost: 0.4, fixed: 0, units: 20 },
          probe: {
            type: "target",
            prompt: "Each cup of lemonade costs you $0.25 to make, and you expect to sell 20 cups. Slide the price until you earn at least $15 profit.",
            goal: { sim: "profit", cost: 0.25, fixed: 0, units: 20, minProfit: 15 },
            hint: "You keep price minus cost on every cup. How much do you need to keep per cup so 20 cups add up to $15?",
            mistakes: [
              {
                match: "Price at or below $0.25",
                coach: "At that price you keep nothing (or lose money) on each cup. The price must be above the cost.",
              },
              {
                match: "Price around $0.75",
                coach: "Careful: $0.75 is the profit you need per cup, not the price. Add the $0.25 cost back on.",
              },
            ],
            seconds: 45,
          },
          think: {
            q: "You sell lemonade for $1.00 a cup, and each cup costs $0.25 to make. What is your profit per cup?",
            choices: ["$1.25", "$0.25", "$0.75", "$4.00"],
            answer: 2,
            why: "Profit per unit is price minus cost: $1.00 - $0.25 = $0.75.",
            hints: [
              "That adds the cost instead of subtracting it. Profit is price MINUS cost.",
              "That's the cost of a cup, not what you keep.",
              "",
              "That's $1.00 divided by $0.25. Subtract the cost from the price instead.",
            ],
          },
          approaches: {
            analogy:
              "Think of a bucket with a small hole. The price is the water you pour in, and the cost per unit leaks out through the hole. Profit per unit is the water that stays in the bucket.",
            example:
              "Bracelets: price $3.00, cost $0.50. Profit per bracelet = $3.00 - $0.50 = $2.50. Sell 8 bracelets: 8 x $2.50 = $20.00 profit before startup costs. Check another way: revenue 8 x $3.00 = $24.00, costs 8 x $0.50 = $4.00, and $24.00 - $4.00 = $20.00.",
            simpler: {
              q: "Price $2, cost $1. What is the profit per item?",
              choices: ["$3", "$1", "$2"],
              answer: 1,
              why: "$2 - $1 = $1 of profit on each item.",
              hints: [
                "That added them. Profit is price minus cost.",
                "",
                "That's the price. Part of it pays for the item itself.",
              ],
            },
          },
        },
        {
          title: "Startup costs and break-even",
          teach:
            "Some costs happen only once, no matter how many items you sell. A poster board, markers, and a tablecloth for your stand might cost $12. These are startup costs, and your profits must pay them back first. How many cookies until you're even? Divide startup costs by profit per unit: $12 divided by $0.60 equals 20 cookies. That's your break-even point. At 20 cookies, the calculator shows exactly zero profit. Cookie number 21 is where real profit begins. Try sliding the units below 20 and then above 20, and watch the loss turn into profit.",
          visual: { type: "profit", price: 1, cost: 0.4, fixed: 12, units: 20 },
          probe: {
            type: "place",
            prompt: "Each stand has $12 in startup costs. Drag each one to its break-even point (number of items sold).",
            min: 0,
            max: 40,
            step: 1,
            tolerance: 0,
            items: [
              { label: "Cookies: $0.60 profit each", value: 20 },
              { label: "Bracelets: $1.20 profit each", value: 10 },
              { label: "Lemonade: $0.40 profit each", value: 30 },
            ],
            hint: "Break-even = startup costs divided by profit per item. Smaller profit per item means more sales needed.",
            mistakes: [
              {
                match: "Bracelets placed past cookies",
                coach: "Bracelets earn more per sale, so they pay back the $12 faster, with fewer sales.",
              },
              {
                match: "Multiplied instead of dividing",
                coach: "Ask: how many times does the profit per item fit into $12? That's division.",
              },
            ],
            seconds: 60,
          },
          think: {
            q: "Your startup costs are $15 and you make $0.50 profit per item. How many must you sell to break even?",
            choices: ["30", "7.5", "15", "75"],
            answer: 0,
            why: "$15 divided by $0.50 equals 30. Check: 30 x $0.50 = $15.",
            hints: [
              "",
              "That's $15 times 0.5. Dividing by one half makes the number bigger, not smaller.",
              "That would be right only if each item earned $1.00. You earn half that, so you need twice as many.",
              "Too many. Check: 30 x $0.50 = $15, which already covers the startup costs.",
            ],
          },
          approaches: {
            analogy:
              "Break-even is like climbing out of a hole before you can walk on flat ground. Startup costs dig the hole. Each sale's profit is one step up. Once you're out, every step after that is real profit.",
            example:
              "Car wash: a bucket, sponges, and soap cost $18 in startup costs. You charge $5 per car and use $0.50 of soap and water per wash, so profit per car = $5.00 - $0.50 = $4.50. Break-even = $18 / $4.50 = 4 cars. After car 4 you've earned 4 x $4.50 = $18, exactly the startup cost. Car 5 brings your first $4.50 of real profit.",
            simpler: {
              q: "Startup costs are $10 and you make $1 profit per item. How many items to break even?",
              choices: ["1", "10", "100"],
              answer: 1,
              why: "$10 / $1 = 10 items.",
              hints: [
                "One item only pays back $1 of the $10.",
                "",
                "That's far more than needed: 10 items x $1 already equals $10.",
              ],
            },
          },
        },
        {
          title: "Choosing a smart price",
          teach:
            "How do you choose your price? Check three things. First, the price must be higher than your cost per unit, or you lose money on every single sale. Second, look at what similar products sell for nearby, so your price feels fair. Third, remember what customers told you in interviews about what solving the problem is worth to them. An honest, fair price serves the customer and keeps your business alive. Don't panic if you get it wrong at first. Milton Hershey's first candy business failed, and so did another. He kept going, built a successful caramel company, and later the famous Hershey chocolate company.",
          visual: {
            type: "compare",
            left: {
              title: "Price too low",
              points: [
                "Below or barely above your cost",
                "Busy, but losing money",
                "Can't afford new supplies",
                "Business closes fast",
              ],
            },
            right: {
              title: "Smart price",
              points: [
                "Higher than cost per unit",
                "Fair compared to similar products",
                "Matches what customers say it's worth",
                "Pays back startup costs and grows",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "A smart price is higher than your {0} per unit, fair compared to {1} products nearby, and close to what {2} told you it's worth.",
            blanks: [
              { answers: ["cost"] },
              { answers: ["similar", "other", "comparable", "competing"] },
              { answers: ["customers", "customer", "buyers", "people"] },
            ],
            bank: ["cost", "similar", "customers", "profit", "fancy", "friends"],
            hint: "Think of the three checks: your own math, the shop down the street, and your interviews.",
            mistakes: [
              {
                match: "profit",
                coach: "Profit is what you keep after the price. The price must beat what each item costs you to make.",
              },
              {
                match: "fancy",
                coach: "The comparison is with products like yours, so your price feels fair.",
              },
              {
                match: "friends",
                coach: "Friends are kind, but the real test is what customers said in interviews.",
              },
            ],
            seconds: 35,
          },
          think: {
            q: "Your cookies cost $0.40 each. Similar cookies nearby sell for $1.00, and neighbors said they'd pay about $1. Which price makes the most sense?",
            choices: ["$0.30", "$5.00", "$0.40", "$1.00"],
            answer: 3,
            why: "$1.00 is above your cost, matches similar cookies, and fits what customers said they'd pay.",
            hints: [
              "That's below your cost, so you'd lose $0.10 on every cookie.",
              "Customers said about $1, and similar cookies sell for $1. At $5 almost nobody would buy.",
              "That's exactly your cost, so you'd make zero profit per cookie.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Pricing is like Goldilocks' porridge. Too low and you go broke. Too high and nobody buys. Just right covers your costs and feels fair to customers.",
            example:
              "Rock-painting kits cost Ana $1.20 each to put together. A similar craft kit at the store is $5, and three customers said they'd pay '$3 or $4.' Ana picks $4. Profit per kit = $4.00 - $1.20 = $2.80. Her startup costs are $14, so break-even = $14 / $2.80 = 5 kits. Check: 5 x $2.80 = $14.",
            simpler: {
              q: "Your item costs $2 to make. Which price would LOSE money?",
              choices: ["$1", "$3", "$4"],
              answer: 0,
              why: "At $1 you'd collect less than the $2 it cost you, losing $1 per sale.",
              hints: [
                "",
                "$3 is more than $2, so you'd earn $1 on each one.",
                "$4 is more than $2, so you'd earn $2 on each one.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for finding your break-even point in order.",
        steps: [
          "Add up the cost of one batch",
          "Divide the batch cost by the number of items to get cost per unit",
          "Choose a price higher than your cost per unit",
          "Subtract cost per unit from price to get profit per unit",
          "Divide startup costs by profit per unit to get the break-even point",
        ],
      },
      explain: {
        prompt:
          "Explain how you would figure out whether a cookie stand will make money. Use real numbers in your explanation.",
        keyPoints: [
          "Cost per unit is batch cost divided by the number of items",
          "Profit per unit is price minus cost per unit",
          "Break-even is startup costs divided by profit per unit",
          "The price must be higher than the cost per unit",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Beads cost $4 and string costs $2. Together they make 12 bracelets. What is the cost per bracelet?",
          answer: 0.5,
          tolerance: 0.01,
          unit: "$",
          hint: "Add up the whole batch cost first, then divide by the number of bracelets.",
          mistakes: [
            {
              match: "0.33",
              coach: "That's only the beads ($4 / 12). Add the string to the batch cost first.",
            },
            {
              match: "2",
              coach: "That's 12 divided by 6, flipped. Divide the cost by the number of bracelets.",
            },
            { match: "6", coach: "That's the whole batch. How much is one bracelet?" },
          ],
          seconds: 40,
        },
        {
          type: "target",
          prompt: "Ana's rock-painting kits cost $1.20 each to make, and her startup costs are $14. She expects to sell 10 kits. Slide the price until she earns at least $10 profit after paying back startup costs.",
          goal: { sim: "profit", cost: 1.2, fixed: 14, units: 10, minProfit: 10 },
          hint: "She needs $14 + $10 = $24 from her 10 kits after paying for each kit. What must each kit earn?",
          mistakes: [
            {
              match: "Price around $2.40",
              coach: "$2.40 per kit is what she needs to KEEP. The price must also cover the $1.20 each kit costs.",
            },
            {
              match: "Price that only covers startup costs",
              coach: "Breaking even isn't the goal here. She wants $10 of real profit on top.",
            },
          ],
          seconds: 60,
        },
        {
          type: "build",
          prompt: "Build the break-even formula.",
          tiles: ["Break-even", "=", "startup costs", "÷", "profit per unit"],
          distractors: ["x", "price"],
          hint: "Break-even tells you how many sales it takes to pay back one-time costs. How many times does each sale's profit fit into them?",
          mistakes: [
            {
              match: "Used 'x'",
              coach: "Multiplying makes the number huge. You want to know how many profits fit into the startup costs, so divide.",
            },
            {
              match: "Used 'price'",
              coach: "Part of the price pays for the item itself. Only the profit per unit pays back startup costs.",
            },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "A cookie stand: batch of 20 costs $8, price $1.00, sign and tablecloth $12. Match each term to its number.",
          pairs: [
            { left: "Cost per unit", right: "$0.40" },
            { left: "Profit per unit", right: "$0.60" },
            { left: "Startup costs", right: "$12" },
            { left: "Break-even point", right: "20 cookies" },
          ],
          hint: "Work in order: cost per unit first, then profit per unit, then break-even.",
          mistakes: [
            {
              match: "Swapped cost per unit and profit per unit",
              coach: "Cost per unit is $8 / 20. Profit per unit is the price minus that.",
            },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "A batch of 10 bracelets costs $5 in beads and string. What is the cost per bracelet?",
          choices: ["$0.50", "$2.00", "$5.00", "$0.20"],
          answer: 0,
          why: "$5 divided by 10 bracelets is $0.50 each.",
        },
        {
          q: "You sell each bracelet for $3.00, and each costs you $0.50 to make. What is your profit per bracelet?",
          choices: ["$3.50", "$3.00", "$2.50", "$0.50"],
          answer: 2,
          why: "Profit per unit is price minus cost: $3.00 minus $0.50 equals $2.50.",
        },
        {
          q: "Your startup costs are $10 and you earn $2.50 profit per bracelet. How many bracelets must you sell to break even?",
          choices: ["2", "4", "10", "25"],
          answer: 1,
          why: "$10 divided by $2.50 equals 4 bracelets.",
        },
        {
          q: "What happens if your price is LOWER than your cost per unit?",
          choices: [
            "You make extra profit",
            "You break even right away",
            "Nothing changes",
            "You lose money on every sale",
          ],
          answer: 3,
          why: "If it costs more to make than you charge, each sale takes money away from you.",
        },
        {
          q: "Which is a startup cost for a cookie stand?",
          choices: [
            "The chocolate chips in each batch",
            "A tablecloth and sign you buy once",
            "The bag for each cookie",
          ],
          answer: 1,
          why: "A startup cost is paid once no matter how many items you sell, like a sign or tablecloth.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a pricing plan for your business. Include: (1) a list of your supplies with real prices (ask a parent to help you look them up), (2) your cost per unit or per job, (3) your price and why you chose it, (4) your profit per unit, and (5) your startup costs and break-even point. Show all your math.",
        rubric: [
          "Lists supplies with realistic prices",
          "Correctly calculates cost per unit and profit per unit",
          "Explains the chosen price using cost, similar products, and customer feedback",
          "Correctly calculates the break-even point with the math shown",
        ],
      },
    },
    {
      id: "business.pitch",
      title: "The Pitch",
      minutes: 30,
      stage: "rhetoric",
      read: `Imagine you step into an elevator with someone who could become your best customer. The ride lasts about a minute. Could you explain your business before the doors open? That short, clear explanation is called an elevator pitch, and every entrepreneur needs one.

A strong pitch answers four questions in order. First, the problem: what is wrong that people care about? Second, the solution: what do you offer that fixes it? Third, the customer: who exactly is it for? Fourth, why you: what makes you the right person to do it?

Here is an example. "Lots of families in our neighborhood are busy, and their dogs sit home alone all afternoon. I offer 30-minute after-school dog walks for $5. It's perfect for working parents who want their dog happy and tired by dinnertime. I'm reliable, I've walked our own dog every day for two years, and my mom checks in with every family I work with." That is under a minute, and the listener knows exactly what you do.

Notice what makes it work. It uses plain words, not fancy ones. It includes a real number, the price. It gives proof, like two years of daily dog walks, instead of only saying "I'm awesome." Proof is far more convincing than bragging.

Edison was a master at showing instead of telling. On New Year's Eve in 1879, he invited the public to his laboratory in Menlo Park, New Jersey, and lit the area with his electric lamps. Crowds came by train to see it. Nobody needed a long speech after that. If you can, bring a sample, a photo, or a quick demonstration to your pitch.

Finally, practice out loud. Say it to a mirror, then to a pet, then to your family. Stand tall, look people in the eye, smile, and speak slowly. The first try will feel awkward. By the fifth try, you will sound like a business owner, because you are one.`,
      keyIdeas: [
        "A pitch covers four parts: problem, solution, customer, and why you.",
        "Proof, numbers, and demonstrations convince better than bragging.",
        "Practice out loud many times until it sounds natural.",
      ],
      hook: {
        text: "On New Year's Eve 1879, Thomas Edison didn't give a big speech about his electric light. He lit up the area around his lab in Menlo Park, New Jersey, and crowds came by train to see it. Sometimes the best pitch is one people can see with their own eyes.",
      },
      teach: [
        {
          title: "What is an elevator pitch?",
          teach:
            "Imagine stepping into an elevator with someone who could become your best customer. The ride lasts about a minute. Could you explain your business before the doors open? That short, clear explanation is called an elevator pitch. Every entrepreneur needs one, because people are busy, and if you can't explain your idea quickly, they'll lose interest. A good pitch uses plain words, not fancy ones. It sounds like a friendly conversation, not a TV commercial. And it leaves the listener knowing exactly what you do, who it's for, and how to say yes.",
          visual: {
            type: "flip",
            cards: [
              { front: "Elevator pitch", back: "A short, clear explanation of your business that takes about one minute." },
              { front: "Proof", back: "A real fact that shows you can deliver, like 'I've walked our dog every day for two years.'" },
              { front: "Demonstration", back: "Showing your product or service working instead of only describing it." },
              { front: "Ask", back: "Telling the listener how to say yes, like 'Can I walk Max on Monday?'" },
            ],
          },
          probe: {
            type: "cloze",
            text: "An elevator pitch takes about one {0}, because busy listeners lose interest. It uses {1} words and leaves the listener knowing how to say {2}.",
            blanks: [
              { answers: ["minute"] },
              { answers: ["plain", "simple", "everyday"] },
              { answers: ["yes"] },
            ],
            bank: ["minute", "plain", "yes", "hour", "fancy", "no"],
            hint: "Picture a short elevator ride with a busy person who might become your customer.",
            mistakes: [
              { match: "hour", coach: "An hour is a speech! An elevator ride is much shorter." },
              {
                match: "fancy",
                coach: "Fancy words make listeners work harder. A pitch should sound like a friendly conversation.",
              },
              { match: "no", coach: "A good pitch makes saying YES easy, like 'Can I walk Max on Monday?'" },
            ],
            seconds: 30,
          },
          think: {
            q: "Why should an elevator pitch be short?",
            choices: [
              "Short pitches are easier to fake",
              "Busy listeners lose interest if you can't explain your idea quickly",
              "Long pitches are against the rules",
              "So you can avoid saying the price",
            ],
            answer: 1,
            why: "People's attention is limited, so a quick, clear pitch respects their time and keeps them listening.",
            hints: [
              "Pitches should always be honest. Being short is about respecting the listener's time.",
              "",
              "There's no rule. It's about how people pay attention.",
              "A good pitch actually includes a real number, like the price.",
            ],
          },
          approaches: {
            analogy:
              "A pitch is like a movie trailer. A trailer doesn't show the whole movie. It shows just enough, in about a minute, to make you say 'I want to see that!'",
            example:
              "Too long: a five-minute story about how you got the idea, every kind of cookie you might bake someday, and your favorite recipe. Elevator pitch: 'Families leaving soccer practice want a quick snack. I sell homemade oatmeal cookies for $1 at the field on Saturdays. I've baked them for my family every week for a year.' Three sentences, about 15 seconds.",
            simpler: {
              q: "About how long should an elevator pitch be?",
              choices: ["About one minute", "About one hour", "About one second"],
              answer: 0,
              why: "It should fit inside a short elevator ride, about a minute.",
              hints: [
                "",
                "An hour is a speech, not an elevator ride.",
                "One second isn't enough to explain anything.",
              ],
            },
          },
        },
        {
          title: "Four parts in order",
          teach:
            "A strong pitch answers four questions in this order. First, the problem: what's wrong that people care about? Second, the solution: what do you offer that fixes it? Third, the customer: who exactly is it for? Fourth, why you: what makes you the right person? Starting with the problem matters, because people care about their own problems before they care about your product. Here's an example: 'Busy families' dogs sit home alone all afternoon. I offer 30-minute after-school walks for $5. It's perfect for working parents. I've walked our own dog every day for two years.'",
          visual: {
            type: "sequence",
            prompt: "Put the four parts of a pitch in order.",
            steps: ["The problem", "The solution", "The customer", "Why you"],
          },
          probe: {
            type: "match",
            prompt: "Match each line of a plant-watering pitch to its part.",
            pairs: [
              { left: "Lots of gardens dry out while neighbors are on vacation.", right: "The problem" },
              { left: "I water indoor and outdoor plants for $4 a visit.", right: "The solution" },
              { left: "It's for families on our street who travel.", right: "The customer" },
              { left: "I've kept our family's 15 houseplants alive for a year.", right: "Why you" },
            ],
            hint: "Ask of each line: is it what's wrong, what I offer, who it's for, or why I'm the right person?",
            mistakes: [
              {
                match: "Swapped problem and customer",
                coach: "The problem line describes what's going wrong. The customer line names who it's for.",
              },
              {
                match: "Swapped solution and why you",
                coach: "The solution is what you offer. 'Why you' is proof about you.",
              },
            ],
            seconds: 40,
          },
          think: {
            q: "Which part of a pitch is this sentence? 'Lots of neighbors' gardens dry out while they're on vacation.'",
            choices: ["Why you", "The solution", "The customer", "The problem"],
            answer: 3,
            why: "It describes what's going wrong, so it's the problem, the part that comes first.",
            hints: [
              "'Why you' is about your skills or proof. This sentence doesn't mention you at all.",
              "A solution is what you offer. This sentence only describes what's going wrong.",
              "It mentions neighbors, but its main point is what's going wrong for them.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A pitch works like a good hero story. First the town is in trouble (problem). Then the hero arrives with a plan (solution). We see who gets helped (customer). Finally we learn the hero's special skills (why you). Tell it out of order and it gets confusing.",
            example:
              "A plant-watering pitch in four parts. Problem: 'Families on vacation come home to dead plants.' Solution: 'I water indoor and outdoor plants for $4 a visit.' Customer: 'It's for families on our street who travel.' Why you: 'I've kept our family's 15 houseplants alive for a year, and my dad comes with me on every visit.'",
            simpler: {
              q: "Which part comes FIRST in a strong pitch?",
              choices: ["Why you", "The problem", "The price"],
              answer: 1,
              why: "Starting with the problem helps listeners care before you share your solution.",
              hints: [
                "That comes last, after people already care.",
                "",
                "The price belongs inside the solution, but it isn't the first part.",
              ],
            },
          },
        },
        {
          title: "Proof beats bragging",
          teach:
            "Anyone can say 'I'm awesome' or 'I'm the best.' Those words don't convince anybody, because they're just claims. Proof is a real fact that shows you can deliver. 'I've walked our own dog every day for two years' is proof. 'My mom checks in with every family I work with' is proof. Real numbers help too, like your price or how many customers you've helped. Proof is also more honest than bragging, because it lets people judge for themselves. If you don't have much proof yet, start small: do a job for a family friend and ask if you can share what they say.",
          visual: {
            type: "sort",
            prompt: "Sort each line: proof or just bragging?",
            buckets: ["Proof", "Bragging"],
            items: [
              { text: "I've mowed our lawn every week for a year.", bucket: 0 },
              { text: "I'm the best mower ever.", bucket: 1 },
              { text: "Mrs. Kim says her dog loves our walks.", bucket: 0 },
              { text: "Trust me, I'm amazing.", bucket: 1 },
              { text: "I've sold 40 bracelets this summer.", bucket: 0 },
              { text: "Nobody does it better than me.", bucket: 1 },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "You're pitching a spelling-tutoring service. Tap every line that gives PROOF.",
            sentences: [
              "I'm super smart.",
              "My little brother went from 6 to 18 out of 20 on spelling tests after I helped him.",
              "I'm the greatest tutor in town.",
              "I've won our school spelling bee two years in a row.",
              "Trust me, you'll love it.",
            ],
            correct: [1, 3],
            hint: "Proof is a specific fact someone could check. Claims about how great you are don't count.",
            mistakes: [
              {
                match: "Tapped 'I'm super smart.' or 'greatest tutor'",
                coach: "Those are claims anyone could say. How would a listener check them?",
              },
              {
                match: "Missed the spelling bee line",
                coach: "Winning a spelling bee twice is a real, checkable fact, so it counts as proof.",
              },
            ],
            seconds: 30,
          },
          think: {
            q: "Which line gives the best proof that you're good at tutoring spelling?",
            choices: [
              "I'm super smart.",
              "Spelling is easy.",
              "My little brother went from 6 to 18 out of 20 on spelling tests after I helped him.",
              "I'm the greatest tutor in town.",
            ],
            answer: 2,
            why: "It's a specific, checkable result that shows your tutoring actually works.",
            hints: [
              "That's a claim with no evidence. How would a listener know it's true?",
              "That's an opinion about spelling, not proof about you.",
              "",
              "Big claims sound like bragging. A specific result convinces more.",
            ],
          },
          approaches: {
            analogy:
              "Saying 'I'm a great swimmer' is bragging. Jumping in and swimming two laps is proof. Proof in a pitch is like letting people watch you swim.",
            example:
              "Weak: 'I'm a really good baker and you'll love my cookies.' Strong: 'I've baked for my family every Sunday for a year, and here's a sample to try.' The strong version gives a fact (every Sunday for a year is about 52 times) plus a sample, so the listener doesn't have to just take your word for it.",
            simpler: {
              q: "Which one is a FACT, not a brag?",
              choices: [
                "I'm the coolest kid ever.",
                "I've walked my dog every day for two years.",
                "Everyone loves me.",
              ],
              answer: 1,
              why: "It's a specific fact someone could check, not just an opinion.",
              hints: [
                "That's an opinion nobody can check.",
                "",
                "That's a big claim, not something you can prove.",
              ],
            },
          },
        },
        {
          title: "Show it, then practice it",
          teach:
            "Edison was a master at showing instead of telling. When he lit up his Menlo Park lab on New Year's Eve 1879, nobody needed a long speech. If you can, bring a sample, a photo, or a quick demonstration to your pitch. Then practice out loud, many times. Say it to a mirror, then to a pet, then to your family. Stand tall, look people in the eye, smile, and speak slowly. The first try will feel awkward, and that's completely normal. Persistence is the secret: by the fifth try, you'll sound like a business owner, because you are one.",
          visual: {
            type: "compare",
            left: {
              title: "Telling",
              points: [
                "'My bracelets are really pretty.'",
                "The listener has to imagine it",
                "Easy to forget",
              ],
            },
            right: {
              title: "Showing",
              points: [
                "Hands the listener a bracelet to try on",
                "The listener sees and feels it",
                "Hard to forget",
              ],
            },
          },
          probe: {
            type: "sequence",
            prompt: "Put Lily's pitch practice plan in order, from easiest audience to a real customer.",
            steps: [
              "Write the pitch: problem, solution, customer, why you",
              "Say it out loud to the mirror",
              "Pitch to the cat and trim extra words",
              "Pitch to the family with a sample bracelet",
              "Pitch to a family friend and ask for the sale",
            ],
            hint: "Practice builds up: start alone, then add friendly listeners, then a real customer.",
            mistakes: [
              {
                match: "Put the family friend before practicing",
                coach: "Practice first with easy audiences so you're ready for a real customer.",
              },
              {
                match: "Put the mirror before writing",
                coach: "You need words to practice. Writing comes first.",
              },
            ],
            seconds: 40,
          },
          think: {
            q: "You're nervous about giving your pitch. What's the best plan?",
            choices: [
              "Read it silently once and hope for the best",
              "Speak super fast so it's over quickly",
              "Skip the pitch",
              "Practice out loud several times, slowly, with eye contact",
            ],
            answer: 3,
            why: "Practicing out loud builds confidence, and speaking slowly with eye contact makes you clear and trustworthy.",
            hints: [
              "Silent reading doesn't train your voice. Pitches are spoken out loud.",
              "Fast talking makes you hard to understand and sounds nervous.",
              "Skipping means customers never hear about your business. Practice makes it easier.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Practicing a pitch is like practicing free throws. Nobody sinks every shot on the first day. After many tries, your arms just know what to do. After many practices, your words flow the same way.",
            example:
              "Lily's practice plan. Day 1: she reads her pitch aloud 3 times to the mirror; it takes 70 seconds and has lots of 'ums.' Day 2: she pitches to her cat twice and cuts one sentence; now it's 55 seconds. Day 3: she pitches to her family with a sample bracelet, and they say 'great eye contact, speak a little louder.' Day 4: she pitches to a family friend and makes her first sale.",
            simpler: {
              q: "What did Edison do to show people his electric light?",
              choices: [
                "Wrote a long letter about it",
                "Lit up the area around his lab so people could see it",
                "Kept it a secret",
              ],
              answer: 1,
              why: "A live demonstration let people see it working with their own eyes.",
              hints: [
                "A letter only tells. Edison wanted people to see it.",
                "",
                "A secret can't win any customers.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap the sentences that give PROOF or a REAL NUMBER.",
        sentences: [
          "Lots of families in our neighborhood are busy, and their dogs sit home alone all afternoon.",
          "I offer 30-minute after-school dog walks for $5.",
          "It's perfect for working parents who want a happy, tired dog by dinnertime.",
          "I've walked our own dog every day for two years.",
          "I'm the most amazing dog walker in the whole world.",
        ],
        correct: [1, 3],
      },
      explain: {
        prompt:
          "Explain how to build a great one-minute pitch, as if you were coaching a younger kid.",
        keyPoints: [
          "Cover the problem, solution, customer, and why you, in that order",
          "Use proof and real numbers instead of bragging",
          "Show a sample or demonstration if you can",
          "Practice out loud many times",
        ],
      },
      mastery: [
        {
          type: "build",
          prompt: "Build a strong pitch by putting its parts in order.",
          tiles: ["The problem", "The solution", "The customer", "Why you"],
          distractors: ["Your favorite color", "A long story about your day"],
          hint: "Start with what people care about most: their own problem.",
          mistakes: [
            {
              match: "Started with 'Why you'",
              coach: "People care about their problems before they care about you. Proof comes last.",
            },
            {
              match: "Used a distractor",
              coach: "Every part of a pitch must help the listener say yes. Extra stories just use up the minute.",
            },
          ],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "You're pitching a lawn-mowing service. Sort each line.",
          buckets: ["Proof or a real number", "Just bragging"],
          items: [
            { text: "I've mowed our lawn every week for two summers.", bucket: 0 },
            { text: "I'm the best mower in the universe.", bucket: 1 },
            { text: "It's $10 for a front and back yard.", bucket: 0 },
            { text: "Mr. Patel says his yard has never looked better.", bucket: 0 },
            { text: "Nobody works harder than me.", bucket: 1 },
            { text: "Trust me, you won't regret it.", bucket: 1 },
          ],
          hint: "Could the listener check it? Then it's proof. If it's just a big claim, it's bragging.",
          mistakes: [
            {
              match: "Put the price in bragging",
              coach: "A price is a real number. It helps listeners decide, so it belongs with proof.",
            },
            {
              match: "Put 'Nobody works harder than me.' in proof",
              coach: "It sounds strong, but nobody can check it. That makes it a claim.",
            },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "On New Year's Eve {0}, Edison lit up the area around his lab in Menlo Park instead of giving a long speech. That's showing instead of {1}. You can do the same by bringing a {2} to your pitch.",
          blanks: [
            { answers: ["1879"] },
            { answers: ["telling", "talking"] },
            { answers: ["sample", "photo", "demonstration", "demo", "picture"] },
          ],
          hint: "Think about what the crowds saw with their own eyes, and how you could let customers see or touch what you offer.",
          mistakes: [
            {
              match: "1903",
              coach: "1903 is when Mary Anderson got her wiper patent. Edison's light show was earlier, in the 1800s.",
            },
            {
              match: "bragging",
              coach: "Bragging is the opposite of proof. The contrast here is showing versus telling.",
            },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each pitch tip to the reason it works.",
          pairs: [
            { left: "Keep it to about a minute", right: "Busy listeners stay interested" },
            { left: "Start with the problem", right: "People care about their own problems first" },
            { left: "Give proof, not brags", right: "Listeners can judge the facts for themselves" },
            { left: "Practice out loud many times", right: "Your words flow and you feel confident" },
            { left: "End with a clear ask", right: "The listener knows exactly how to say yes" },
          ],
          hint: "For each tip, imagine the listener: what does it do for them, or for you?",
          mistakes: [
            {
              match: "Mixed up practice and keep it short",
              coach: "Practice is about your confidence. Short is about the listener's attention.",
            },
          ],
          seconds: 55,
        },
      ],
      check: [
        {
          q: "What is an elevator pitch?",
          choices: [
            "A sales pitch you give only in elevators",
            "A short, clear explanation of your business that takes about a minute",
            "A long written business report",
            "A baseball term",
          ],
          answer: 1,
          why: "It is called an elevator pitch because it should fit into a short elevator ride.",
        },
        {
          q: "Which order do the four parts of a strong pitch follow in this lesson?",
          choices: [
            "Price, logo, slogan, website",
            "Why you, price, problem, goodbye",
            "Problem, solution, customer, why you",
          ],
          answer: 2,
          why: "Starting with the problem helps listeners care before you explain your solution.",
        },
        {
          q: "Which line gives the best PROOF that you are reliable?",
          choices: [
            "\"I've walked our own dog every day for two years.\"",
            "\"I'm the best dog walker ever.\"",
            "\"Trust me.\"",
            "\"Dogs are cool.\"",
          ],
          answer: 0,
          why: "A specific fact shows reliability instead of just claiming it.",
        },
        {
          q: "How did Edison show the public his electric light on New Year's Eve 1879?",
          choices: [
            "He mailed out letters",
            "He gave a three-hour speech",
            "He lit up the area around his Menlo Park lab and invited people to see it",
            "He kept it a secret",
          ],
          answer: 2,
          why: "A live demonstration let people see the solution working with their own eyes.",
        },
        {
          q: "What is the best way to get better at pitching?",
          choices: [
            "Read it silently once",
            "Memorize big fancy words",
            "Speak as fast as possible",
            "Practice out loud many times, slowly and with eye contact",
          ],
          answer: 3,
          why: "Speaking out loud repeatedly builds confidence and makes your pitch sound natural.",
        },
      ],
      task: {
        kind: "speak",
        prompt:
          "Write your elevator pitch covering the problem, your solution, your customer, and why you. Practice it out loud at least 3 times. Then give your 1-minute pitch to your family, with a parent present. Bring a sample, photo, or demonstration if you can. Afterward, ask your family for one thing you did well and one thing to improve.",
        rubric: [
          "Pitch clearly covers problem, solution, customer, and why you",
          "Stays at about one minute and includes a price or other real number",
          "Speaks clearly with eye contact and good posture",
          "Asks for feedback and names one thing to improve",
        ],
      },
    },
    {
      id: "business.launch",
      title: "Launch Day",
      minutes: 40,
      stage: "rhetoric",
      read: `All your planning leads to this moment: launch day, the first day you actually sell. It can feel scary. That is normal. Every business owner felt nervous the first time they asked someone to buy.

When Thomas Edison was about 12 years old, he got a job selling newspapers, candy, and snacks to passengers on a train running between Port Huron and Detroit, Michigan. He learned to move fast, talk to strangers politely, and figure out what riders wanted. When big news broke, he brought extra papers, because more people wanted them that day. That young salesman was learning to serve customers.

Selling is not tricking people. It is helping someone get something they want. Greet every person with a smile. Say clearly what you offer and the price. If they say no, thank them anyway. A kind "no thanks" today can turn into a "yes" next week.

Customer service means treating people so well they want to come back and tell their friends. Be on time. Do exactly what you promised. If a cookie breaks or you make a mistake, fix it or give a refund without arguing. Happy customers are the best advertising there is.

Honesty is the foundation of every good business. Never say your product is something it is not. If your cookies have nuts, tell people. Count change carefully and out loud so the customer can see it is correct. If someone overpays by accident, give the money back. One dishonest moment can destroy trust that took months to build.

Finally, track every sale. Keep a notebook or a simple sheet. Each time you sell something, write down what you sold, how many, and how much money you received. Also write down any money you spend that day, like more bags or ice. It may feel tiny and boring, but these records are how you will know whether your business really made money. Without records, you are only guessing.

Always run your business with a parent nearby, and only with customers your family approves.`,
      keyIdeas: [
        "Selling means helping people get something they want, politely and clearly.",
        "Great customer service and complete honesty bring customers back.",
        "Write down every sale and every cost, every time.",
      ],
      hook: {
        text: "When Thomas Edison was about 12, he sold newspapers, candy, and snacks to passengers on a train between Port Huron and Detroit, Michigan. When big news broke, he brought extra newspapers because he knew more riders would want them. He was learning to serve customers long before he invented anything.",
      },
      teach: [
        {
          title: "Selling is helping",
          teach:
            "Launch day is the first day you actually sell, and it's normal to feel nervous. Here's a secret that makes it easier: selling is not tricking people. It's helping someone get something they want. When you sell a cold drink to a thirsty person, you both win. Greet every person with a smile. Say clearly what you offer and the price, like 'Hi! Fresh cookies, a dollar each.' If they say no, thank them anyway. A kind 'no thanks' today can become a 'yes' next week, and they might tell a friend how polite you were.",
          visual: {
            type: "compare",
            left: {
              title: "Pushy selling",
              points: [
                "Keeps pressuring after a no",
                "Hides or mumbles the price",
                "Talks only about yourself",
              ],
            },
            right: {
              title: "Helpful selling",
              points: [
                "Smiles and greets everyone",
                "States the offer and price clearly",
                "Thanks people even when they say no",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "Launch day at your cookie stand. Sort each response.",
            buckets: ["Helpful selling", "Pushy selling"],
            items: [
              { text: "'Okay, thanks anyway! Have a great day.'", bucket: 0 },
              { text: "'Are you sure? Please, please buy one!'", bucket: 1 },
              { text: "'Hi! Fresh cookies, a dollar each.'", bucket: 0 },
              { text: "Following someone down the sidewalk to keep explaining", bucket: 1 },
              { text: "Mumbling the price so nobody hears it", bucket: 1 },
              { text: "Smiling and greeting everyone who walks by", bucket: 0 },
            ],
            hint: "Helpful selling respects the customer's choice and is clear about the offer and price.",
            mistakes: [
              {
                match: "Put 'Are you sure? Please...' in helpful",
                coach: "Begging after a no makes people uncomfortable. Respect the no and thank them.",
              },
              {
                match: "Put mumbling the price in helpful",
                coach: "Hiding the price makes people trust you less. Say it clearly.",
              },
            ],
            seconds: 45,
          },
          think: {
            q: "A man walks by and says, 'No thanks, not today.' What's the best response?",
            choices: [
              "'Are you sure? Please, please buy one!'",
              "'Okay, thanks anyway! Have a great day.'",
              "Say nothing and frown",
              "Follow him and keep explaining",
            ],
            answer: 1,
            why: "A polite thank-you respects his choice and leaves the door open for a future sale.",
            hints: [
              "Begging makes people uncomfortable and less likely to come back.",
              "",
              "Frowning leaves a bad memory. Kindness keeps the door open.",
              "Following someone is pushy and not safe. Respect the no.",
            ],
          },
          approaches: {
            analogy:
              "Selling is like recommending a great book to a friend. You're not tricking them; you're sharing something you think will help or delight them. If they say no thanks, you're still friends.",
            example:
              "A lemonade stand script: 'Hi! Would you like some fresh lemonade? It's $1 a cup.' If yes: 'Great! Here you go, and here's your change.' If no: 'No problem, thanks for stopping! Have a great day.' Short, clear, friendly, and honest about the price.",
            simpler: {
              q: "Selling is mostly about...",
              choices: [
                "tricking people",
                "helping people get something they want",
                "talking as much as possible",
              ],
              answer: 1,
              why: "Good selling matches what you offer with what someone actually wants.",
              hints: [
                "Tricks destroy trust. Good businesses help.",
                "",
                "Listening and being clear matter more than talking a lot.",
              ],
            },
          },
        },
        {
          title: "Service that brings people back",
          teach:
            "Customer service means treating people so well they want to come back and tell their friends. It starts with simple things: be on time, and do exactly what you promised. If you said the dog walk is 30 minutes, walk for 30 minutes, not 20. When something goes wrong, like a cookie that breaks or a mistake you made, fix it or give a refund without arguing. That might cost you a little today, but it earns trust that's worth much more. Happy customers become your best advertising, because people believe their friends more than any sign.",
          visual: {
            type: "sort",
            prompt: "Sort each action: great service or poor service?",
            buckets: ["Great service", "Poor service"],
            items: [
              { text: "Arriving right on time", bucket: 0 },
              { text: "Showing up 20 minutes late", bucket: 1 },
              { text: "Replacing a broken cookie with a smile", bucket: 0 },
              { text: "Arguing about a broken cookie", bucket: 1 },
              { text: "Walking the dog the full 30 minutes you promised", bucket: 0 },
              { text: "Cutting the walk short without telling anyone", bucket: 1 },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each launch-day problem to the great-service fix.",
            pairs: [
              {
                left: "A bracelet broke on the first day",
                right: "Fix it, replace it, or refund it without arguing",
              },
              { left: "A cookie crumbles as you hand it over", right: "Replace it right away with a smile" },
              { left: "You promised a 30-minute dog walk", right: "Walk the full 30 minutes" },
              { left: "You're scheduled to start at 4:00", right: "Arrive right on time" },
            ],
            hint: "Great service means keeping your promises and making mistakes right quickly and kindly.",
            mistakes: [
              {
                match: "Mixed up the bracelet and the cookie",
                coach: "Both get made right, but a crumbled cookie is easiest to simply replace on the spot.",
              },
            ],
            seconds: 40,
          },
          think: {
            q: "A customer says the bracelet you sold her broke on the first day. What should you do?",
            choices: [
              "Tell her she must have been too rough with it",
              "Pretend you've never seen her",
              "Offer to fix it, replace it, or refund her without arguing",
              "Charge her to fix it",
            ],
            answer: 2,
            why: "Making it right quickly and kindly keeps her trust and shows you stand behind your work.",
            hints: [
              "Blaming the customer makes her feel bad and less likely to return, even if you're unsure what happened.",
              "Ignoring a problem never fixes it, and she'll tell others.",
              "",
              "It broke on day one, so it's fair for you to cover the fix.",
            ],
          },
          approaches: {
            analogy:
              "Customer service is like being a good host at a party. A good host greets guests, makes sure they have what they need, and cleans up spills quickly. Guests leave happy and want to come again.",
            example:
              "Ben sells cookies for $1. One customer's cookie crumbles, so Ben replaces it right away, which costs him $0.40 in ingredients. That customer comes back every Saturday for 5 weeks and buys 2 cookies each time: 5 x 2 = 10 cookies, or $10 in sales. Spending $0.40 to make it right helped bring in $10.",
            simpler: {
              q: "Being on time is part of...",
              choices: ["good customer service", "bad customer service", "nothing important"],
              answer: 0,
              why: "Showing up when you promised is one of the simplest ways to earn trust.",
              hints: [
                "",
                "Being on time is a promise kept, so it's good service.",
                "Customers care a lot about whether you show up when you said you would.",
              ],
            },
          },
        },
        {
          title: "Honesty is the foundation",
          teach:
            "Honesty is the foundation of every good business. Never say your product is something it isn't. If your cookies contain nuts, tell people, because someone could have an allergy. Count change carefully and out loud so the customer can see it's correct. If someone overpays by accident, give the money back, even if they've already started walking away. It might feel like nobody would ever know, but you would know, and trust is everything. One dishonest moment can destroy trust that took months to build. An honest business owner keeps customers for years.",
          visual: {
            type: "flip",
            cards: [
              { front: "Your cookies contain nuts", back: "Tell every customer clearly. Someone might have an allergy." },
              { front: "A customer pays $5 for a $1 item and walks away", back: "Call them back and give them their $4 in change." },
              { front: "You made a mistake on an order", back: "Admit it, apologize, and fix it." },
              { front: "Someone asks if your bracelets are real silver, and they aren't", back: "Tell the truth: 'They're silver-colored beads.'" },
            ],
          },
          probe: {
            type: "number",
            prompt: "A cup of lemonade and a cookie cost $2.25 together. A customer hands you a $5 bill. How much change do you count out?",
            answer: 2.75,
            tolerance: 0.01,
            unit: "$",
            hint: "Count up from the price to $5: a quarter gets you to $2.50, then keep going.",
            mistakes: [
              { match: "3.25", coach: "Check by adding: $2.25 + $3.25 = $5.50. That is 50 cents too much." },
              { match: "2.25", coach: "That's the price, not the change. Subtract the price from $5.00." },
              {
                match: "7.25",
                coach: "That added the price to $5. Change is what's left AFTER paying, so subtract.",
              },
            ],
            seconds: 35,
          },
          think: {
            q: "A cookie costs $1.50. A customer hands you $5. How much change should you count out?",
            choices: ["$4.50", "$3.00", "$5.00", "$3.50"],
            answer: 3,
            why: "$5.00 - $1.50 = $3.50. Count up to check: $1.50 + $3.50 = $5.00.",
            hints: [
              "That would be the change for a 50-cent item. Subtract $1.50 from $5.00.",
              "That's $0.50 short. Count up: $1.50 plus $3.50 makes $5.00.",
              "That's the whole amount they gave you. They only get back what's left after paying $1.50.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Trust is like a glass vase. It takes a long time to make, and you can carry it carefully for years. But drop it once and it shatters, and gluing it back together is very hard.",
            example:
              "Counting change out loud: an item costs $2.25 and the customer gives you $5. Count up from the price: '$2.25 plus a quarter makes $2.50, plus two more quarters makes $3.00, plus two dollar bills makes $5.00.' The change is $0.25 + $0.50 + $2.00 = $2.75. Check: $5.00 - $2.25 = $2.75.",
            simpler: {
              q: "Your cookies have nuts in them. What should you do?",
              choices: [
                "Tell customers clearly",
                "Keep it a secret",
                "Only tell people who ask twice",
              ],
              answer: 0,
              why: "Being upfront protects people with allergies and builds trust.",
              hints: [
                "",
                "Hiding ingredients could make someone sick and breaks trust.",
                "Some people won't think to ask. Honesty means telling everyone.",
              ],
            },
          },
        },
        {
          title: "Track every sale",
          teach:
            "The last launch-day skill seems tiny, but it's huge: track every sale. Keep a notebook or a simple sheet. Each time you sell something, write what you sold, how many, and how much money you received. Also write down any money you spend that day, like extra bags or ice. At the end of the day, add up the totals. These records are how you'll know whether your business really made money. Without them, you're only guessing, and guesses are often wrong. Always run your business with a parent nearby, and only with customers your family approves.",
          visual: {
            type: "compare",
            left: {
              title: "No records",
              points: [
                "'I think we did pretty well?'",
                "Forget what you spent on ice",
                "Can't tell what sold best",
                "Guess again next time",
              ],
            },
            right: {
              title: "Sales log",
              points: [
                "'We took in $34 and spent $4 today.'",
                "Every cost written down",
                "See which item sold most",
                "Plan next time with facts",
              ],
            },
          },
          probe: {
            type: "cloze",
            text: "Every time you sell something, write down what you sold, how {0}, and how much {1} you received. Also write down every {2} you pay, like extra ice or bags.",
            blanks: [
              { answers: ["many"] },
              { answers: ["money", "cash"] },
              { answers: ["cost", "costs", "expense", "expenses"] },
            ],
            bank: ["many", "money", "cost", "guess", "color", "friend"],
            hint: "A sales log needs both sides: the money coming in and the money going out.",
            mistakes: [
              {
                match: "guess",
                coach: "The whole point of a log is to stop guessing and write down the facts.",
              },
              {
                match: "color",
                coach: "The color doesn't help you know if you made money. What did you spend?",
              },
            ],
            seconds: 30,
          },
          think: {
            q: "Which of these should go in your sales log?",
            choices: [
              "Only the sales you remember",
              "Only the money you spent",
              "Every sale and every cost",
              "Nothing; just count the cash box at the end",
            ],
            answer: 2,
            why: "You need both sales and costs, written as they happen, to know your true results.",
            hints: [
              "Memory is easy to fool. Write everything down as it happens.",
              "Costs are only half the story. You also need every sale.",
              "",
              "The cash box doesn't tell you what sold, what you spent, or whether you made a mistake with change.",
            ],
          },
          approaches: {
            analogy:
              "A sales log is like a scoreboard. Without one, everybody argues about who's winning. With one, you know the exact score and can see what to improve.",
            example:
              "Mia's log: 10:00, sold 3 cookies, $3. 10:20, sold 5 cookies, $5. 11:00, bought ice, spent $2. 11:30, sold 4 cookies, $4. Totals: 3 + 5 + 4 = 12 cookies sold, $12 taken in, and $2 spent that day.",
            simpler: {
              q: "Why write down each sale?",
              choices: [
                "So you know the facts instead of guessing",
                "To make your hand tired",
                "Because customers ask to see it",
              ],
              answer: 0,
              why: "Records give you the true numbers so you can learn and improve.",
              hints: [
                "",
                "Writing has a real purpose: knowing your true numbers.",
                "Customers don't need it. YOU do, to know how your business is doing.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put these launch-day steps in order.",
        steps: [
          "Get a parent's okay and set up your stand",
          "Greet a customer with a smile",
          "Tell them what you offer and the price",
          "Take payment and count the change out loud",
          "Write the sale in your sales log",
          "Add up your totals at the end of the day",
        ],
      },
      explain: {
        prompt:
          "Explain what makes a launch day go well, and why honesty matters so much in business.",
        keyPoints: [
          "Selling means politely helping people get what they want",
          "Good service: be on time, keep promises, and fix mistakes",
          "Be completely honest about products and money",
          "Record every sale and every cost",
        ],
      },
      mastery: [
        {
          type: "sequence",
          prompt: "Put one sale at a lemonade stand in order.",
          steps: [
            "Set up the stand with a parent nearby",
            "Smile and say, 'Hi! Fresh lemonade, $1 a cup.'",
            "Pour the cup and take the customer's money",
            "Count the change out loud",
            "Write the sale in your sales log",
          ],
          hint: "Follow the customer's experience from walking up to walking away, then the record-keeping.",
          mistakes: [
            {
              match: "Put the sales log before the sale",
              coach: "You can only write down a sale after it happens, but do it right away so you don't forget.",
            },
            {
              match: "Put the change before taking money",
              coach: "You can't make change until you know how much they handed you.",
            },
          ],
          seconds: 45,
        },
        {
          type: "number",
          prompt: "Two cookies and a lemonade cost $3.60. The customer pays with a $10 bill. How much change do you give back?",
          answer: 6.4,
          tolerance: 0.01,
          unit: "$",
          hint: "Count up from $3.60: 40 cents gets you to $4.00, then how many dollars to reach $10?",
          mistakes: [
            { match: "7.4", coach: "Check by adding: $3.60 + $7.40 = $11.00. That's a dollar too much." },
            { match: "6.6", coach: "Close! Count up: $3.60 + $0.40 = $4.00, not $0.60." },
            { match: "13.6", coach: "That added. Change is what's left after paying, so subtract." },
          ],
          seconds: 40,
        },
        {
          type: "sort",
          prompt: "Sort each launch-day choice.",
          buckets: ["Honest", "Dishonest"],
          items: [
            { text: "Telling every customer your cookies contain nuts", bucket: 0 },
            { text: "Keeping an accidental overpayment as a 'tip'", bucket: 1 },
            { text: "Saying silver-colored beads are real silver", bucket: 1 },
            { text: "Counting change out loud so the customer can see it", bucket: 0 },
            { text: "Admitting you mixed up an order and fixing it", bucket: 0 },
            { text: "Leaving a sale out of your log because it was small", bucket: 1 },
          ],
          hint: "Ask: would the customer feel fooled if they knew exactly what happened?",
          mistakes: [
            {
              match: "Put the overpayment in honest",
              coach: "Money paid by accident isn't yours. Call them back and return it.",
            },
            {
              match: "Put skipping a small sale in honest",
              coach: "Your records should tell the whole truth, even about small sales.",
            },
          ],
          seconds: 50,
        },
        {
          type: "highlight",
          prompt: "Read Ben's launch day. Tap every moment of great customer service or honesty.",
          sentences: [
            "Ben set up his cookie stand at 9:00, right when his sign said he'd open.",
            "A girl's cookie crumbled, and Ben handed her a new one with a smile.",
            "When a man said 'no thanks,' Ben followed him to keep explaining.",
            "A woman asked about nuts, and Ben told her two kinds had walnuts.",
            "Ben didn't bother writing down the last few sales.",
          ],
          correct: [0, 1, 3],
          hint: "Look for kept promises, mistakes made right, and the truth told clearly.",
          mistakes: [
            {
              match: "Tapped following the man",
              coach: "Following someone after a no is pushy. Great service respects the no.",
            },
            {
              match: "Tapped skipping the sales log",
              coach: "Skipping records means guessing later. Every sale should be written down.",
            },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What did young Edison sell on the train?",
          choices: [
            "Newspapers, candy, and snacks",
            "Light bulbs",
            "Train tickets",
          ],
          answer: 0,
          why: "As a boy he sold newspapers, candy, and snacks to train passengers in Michigan.",
        },
        {
          q: "A customer says \"no thanks.\" What should you do?",
          choices: [
            "Keep pushing until they buy",
            "Ignore them",
            "Thank them politely anyway",
            "Lower the price to zero",
          ],
          answer: 2,
          why: "Polite treatment leaves the door open for a future sale and a good reputation.",
        },
        {
          q: "A customer accidentally pays you $5 for a $1 item and walks away. What is the honest thing to do?",
          choices: [
            "Keep it as a tip",
            "Say nothing unless they notice",
            "Spend it on more supplies",
            "Call them back and give them their $4 change",
          ],
          answer: 3,
          why: "Honesty means returning money that isn't yours, which also builds trust.",
        },
        {
          q: "Why should you write down every sale?",
          choices: [
            "So you know for sure whether your business made money",
            "Because writing is fun",
            "To impress your customers",
            "It is not important",
          ],
          answer: 0,
          why: "Records replace guessing with facts about your sales and costs.",
        },
        {
          q: "Which is an example of good customer service?",
          choices: [
            "Showing up late but with a smile",
            "Arguing when a customer gets a broken cookie",
            "Replacing a broken cookie without arguing",
            "Hiding that your cookies contain nuts",
          ],
          answer: 2,
          why: "Fixing problems quickly and kindly keeps customers happy and coming back.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Launch your business! With a parent present and helping, run your business for at least one day (or complete at least one job for a customer your parent approves). Use a sales log to record every sale (what, how many, how much money) and every cost you paid. At the end of the day, write down your totals and one moment of good customer service or honesty.",
        rubric: [
          "Ran the business for at least one day with a parent present",
          "Kept a sales log recording every sale and every cost",
          "Treated customers politely and handled money honestly",
          "Wrote end-of-day totals and one customer service or honesty moment",
        ],
      },
    },
    {
      id: "business.profit",
      title: "Profit & Loss and Lessons Learned",
      minutes: 35,
      stage: "rhetoric",
      read: `Your launch day is over. Now comes the step that separates real entrepreneurs from people who just had a fun afternoon: checking the numbers and learning from them.

Business owners use a report called a profit and loss statement, or P&L. It sounds fancy, but it is just one simple equation: revenue minus costs equals profit. Revenue is all the money customers paid you. Costs are all the money you spent to run the business. Profit is what is left over. If the answer is negative, that is called a loss.

Let's try it with a cookie business. You baked 2 batches of 20 cookies, which is 40 cookies, and sold 34 of them for $1.00 each. Your revenue is 34 times $1.00, or $34. Your costs were $16 for ingredients and bags (two batches at $8 each) plus $12 for your sign and tablecloth, for a total of $28. Your profit is $34 minus $28, which equals $6. Not huge, but it is real profit, and you already own the sign for next time.

The numbers also tell a story. You made 6 extra cookies that did not sell. Next time, maybe bake fewer, or sell at a busier spot. That is how a P&L turns into lessons.

Edison was famous for this kind of learning. When his team searched for a long-lasting filament for the light bulb, they tested thousands of materials, from cotton thread to many kinds of plants, before carbonized bamboo worked well. Each failed test was information, not a disaster.

So ask yourself three questions. What worked? What did not? What will I change next time? Then think about reinvesting, which means putting some of your profit back into the business, like buying supplies for a bigger batch or a better sign. Many great companies grew by reinvesting small profits again and again. Save some, reinvest some, and keep improving.`,
      keyIdeas: [
        "Revenue minus costs equals profit (or a loss if it is negative).",
        "A P&L tells a story that shows what to improve next time.",
        "Reinvesting part of your profit helps a business grow.",
      ],
      hook: {
        text: "Edison's team tested thousands of materials, from cotton thread to many kinds of plants, searching for a light bulb filament that would last. Most tests failed. Edison treated each failure as information, until carbonized bamboo worked well. Your launch-day numbers can teach you in the very same way.",
      },
      teach: [
        {
          title: "Revenue, costs, and profit",
          teach:
            "After launch day comes the step that separates real entrepreneurs from people who just had a fun afternoon: checking the numbers. Three words matter most. Revenue is all the money customers paid you. Costs are all the money you spent to run the business. Profit is what's left: revenue minus costs. If the answer is negative, it's called a loss. One more useful word is margin, which tells you how much of each dollar of revenue you kept as profit. These words are the language every business owner speaks, from a lemonade stand to a giant company.",
          visual: {
            type: "flip",
            cards: [
              { front: "Revenue", back: "All the money customers paid you." },
              { front: "Costs", back: "All the money you spent to run the business." },
              { front: "Profit", back: "Revenue minus costs, when the answer is positive." },
              { front: "Loss", back: "When costs are bigger than revenue, so the answer is negative." },
              { front: "Margin", back: "The share of revenue you kept as profit. $5 profit on $20 of revenue is a 25% margin." },
            ],
          },
          probe: {
            type: "number",
            prompt: "You sold 12 bracelets at $3 each. What is your revenue?",
            answer: 36,
            tolerance: 0.01,
            unit: "$",
            hint: "Revenue is all the money customers paid: number sold times the price.",
            mistakes: [
              { match: "15", coach: "That added 12 and 3. Revenue is number sold TIMES price." },
              { match: "4", coach: "That divided. Each of 12 customers paid $3, so multiply." },
              { match: "9", coach: "That subtracted. Revenue comes from multiplying: 12 x $3." },
            ],
            seconds: 25,
          },
          think: {
            q: "You sold 10 cups of lemonade at $2 each. What is your revenue?",
            choices: ["$12", "$5", "$20", "$8"],
            answer: 2,
            why: "Revenue is the number sold times the price: 10 x $2 = $20.",
            hints: [
              "That adds 10 and 2. Revenue is number sold TIMES price.",
              "That's 10 divided by 2. Multiply instead.",
              "",
              "That's 10 minus 2. Revenue comes from multiplying: 10 x $2.",
            ],
          },
          approaches: {
            analogy:
              "Think of a cookie jar. Revenue is every coin that goes in. Costs are the coins you take out to pay for things. Profit is what's still in the jar at the end.",
            example:
              "Car wash day: 6 cars at $5 each = $30 revenue. Costs: soap $3 and sponges $4, for $7 total. Profit = $30 - $7 = $23. Margin = $23 / $30, about 77%, so you kept about 77 cents of every dollar customers paid.",
            simpler: {
              q: "Revenue is...",
              choices: ["money you spent", "money customers paid you", "money you hid away"],
              answer: 1,
              why: "Revenue is all the money that comes in from customers.",
              hints: [
                "Money you spent is called costs.",
                "",
                "Saving comes later. Revenue is what comes in from sales.",
              ],
            },
          },
        },
        {
          title: "Building a P&L",
          teach:
            "Business owners put these numbers into a report called a profit and loss statement, or P&L. It's really just one equation written out neatly. Let's build one. You baked 2 batches of 20 cookies, 40 in all, and sold 34 at $1.00 each. Revenue: 34 times $1.00 equals $34. Costs: two batches at $8 each is $16, plus $12 for your sign and tablecloth, for a total of $28. Profit: $34 minus $28 equals $6. Not huge, but it's real profit, and you already own the sign for next time.",
          visual: {
            type: "sequence",
            prompt: "Put the steps for building a P&L in order.",
            steps: [
              "Gather your sales log",
              "Add up all sales to find revenue",
              "List and add up every cost",
              "Subtract total costs from revenue",
              "Label the answer a profit or a loss",
            ],
          },
          probe: {
            type: "build",
            prompt: "Revenue was $40 and costs were $28. Build the P&L equation with its answer.",
            tiles: ["$40 revenue", "minus", "$28 costs", "equals", "$12 profit"],
            distractors: ["plus", "$12 loss"],
            hint: "Profit starts with the money that came in, then takes away what went out.",
            mistakes: [
              {
                match: "Used 'plus'",
                coach: "Adding costs to revenue makes no sense: costs are money that LEFT. Subtract them.",
              },
              {
                match: "Used '$12 loss'",
                coach: "Revenue is bigger than costs, so the leftover is a profit, not a loss.",
              },
            ],
            seconds: 35,
          },
          think: {
            q: "Revenue was $40 and costs were $28. What is the result?",
            choices: ["$68 profit", "$12 loss", "$28 profit", "$12 profit"],
            answer: 3,
            why: "$40 - $28 = $12, and since revenue is bigger than costs, it's a profit.",
            hints: [
              "That adds revenue and costs. Profit SUBTRACTS costs from revenue.",
              "Revenue is bigger than costs, so it's a profit, not a loss.",
              "$28 is your costs, not what's left over.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A P&L is like a report card for your business. It doesn't care how busy you felt. It shows the real result in one clear line at the bottom.",
            example:
              "Bracelet P&L. Revenue: 15 bracelets x $3 = $45.00. Costs: beads and string, 15 x $0.50 = $7.50, plus a display board for $10.00, for total costs of $17.50. Profit = $45.00 - $17.50 = $27.50.",
            simpler: {
              q: "Revenue $10, costs $4. What is the profit?",
              choices: ["$14", "$6", "$4"],
              answer: 1,
              why: "$10 - $4 = $6.",
              hints: [
                "That added them. Subtract costs from revenue.",
                "",
                "That's the costs, not the profit.",
              ],
            },
          },
        },
        {
          title: "The numbers tell a story",
          teach:
            "A P&L isn't just a score; it tells a story. In the cookie example, you baked 40 cookies but sold only 34, so 6 didn't sell. At $0.40 each, those 6 cookies cost you $2.40 in ingredients. Next time, maybe bake fewer, or sell at a busier spot. The calculator shows what would have happened if you had sold all 40: revenue $40, ingredients $16, startup costs $12, profit $12. That's double your real profit! Try changing the units, the price, or the cost, and see which change helps the most.",
          visual: { type: "profit", price: 1, cost: 0.4, fixed: 12, units: 40 },
          probe: {
            type: "number",
            prompt: "You baked 30 cookies at $0.40 each but sold only 24. How much did the unsold cookies cost you in ingredients?",
            answer: 2.4,
            tolerance: 0.01,
            unit: "$",
            hint: "First find how many cookies didn't sell, then multiply by what each one cost to make.",
            mistakes: [
              { match: "6", coach: "6 is how many didn't sell. Now multiply by the $0.40 each one cost." },
              {
                match: "9.6",
                coach: "That's the cost of the 24 you sold. Find the cost of the leftovers instead.",
              },
              { match: "0.4", coach: "That's the cost of one cookie. How many were left over?" },
            ],
            seconds: 35,
          },
          think: {
            q: "Each cookie cost $0.40 to make, and 6 cookies didn't sell. How much did the unsold cookies cost you?",
            choices: ["$2.40", "$6.00", "$0.40", "$4.60"],
            answer: 0,
            why: "6 x $0.40 = $2.40 of ingredients that didn't turn into sales.",
            hints: [
              "",
              "That's what they would have earned at $1 each, not what they cost to make.",
              "That's the cost of just one cookie. Multiply by 6.",
              "Check the multiplication: 6 x $0.40 = $2.40.",
            ],
          },
          approaches: {
            analogy:
              "A P&L is like footprints in the snow. You can look back and see exactly where you went, where you slipped, and where to step next time.",
            example:
              "Two Saturdays, after the startup costs were already paid off. Saturday 1, at a quiet park: baked 40, sold 20, revenue $20, ingredients $16, profit $4. Saturday 2, outside the soccer field: baked 40, sold 38, revenue $38, ingredients $16, profit $22. Same cookies and same costs, but the busier spot made $18 more. The numbers told the story.",
            simpler: {
              q: "You baked 20 cookies and sold 15. How many were left over?",
              choices: ["35", "5", "15"],
              answer: 1,
              why: "20 - 15 = 5 cookies left over.",
              hints: [
                "That added them. Subtract the number sold from the number baked.",
                "",
                "That's how many you sold, not how many were left.",
              ],
            },
          },
        },
        {
          title: "Learn, save, and reinvest",
          teach:
            "Now ask three questions. What worked? What didn't? What will I change next time? Be honest, even about mistakes, because that's how you improve. Edison's team tested thousands of filament materials before carbonized bamboo worked well, and each failed test was information, not a disaster. Then decide what to do with your profit. Reinvesting means putting some profit back into the business, like supplies for a bigger batch or a better sign. Many great companies grew by reinvesting small profits again and again. A wise plan: save some, reinvest some, and keep improving.",
          visual: {
            type: "compare",
            left: {
              title: "Spend it all",
              points: [
                "All profit goes to treats",
                "Next time starts from zero",
                "Business stays the same size",
              ],
            },
            right: {
              title: "Save and reinvest",
              points: [
                "Some profit saved for the future",
                "Some buys better supplies",
                "Business can grow each time",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "You made $20 profit. Sort each way of using it.",
            buckets: ["Reinvesting in the business", "Not reinvesting"],
            items: [
              { text: "Supplies for a bigger batch next week", bucket: 0 },
              { text: "A sturdier sign for your stand", bucket: 0 },
              { text: "Snacks for yourself", bucket: 1 },
              { text: "A cooler to keep lemonade cold", bucket: 0 },
              { text: "Putting $10 in your savings jar", bucket: 1 },
              { text: "A new video game", bucket: 1 },
            ],
            hint: "Reinvesting means the money buys something that helps the business improve or grow.",
            mistakes: [
              {
                match: "Put the savings jar in reinvesting",
                coach: "Saving is wise, but money in a jar doesn't help the business grow. It's saving, not reinvesting.",
              },
              {
                match: "Put the sign or cooler in not reinvesting",
                coach: "A better sign or a cooler helps you sell more, so it's reinvesting.",
              },
            ],
            seconds: 45,
          },
          think: {
            q: "You made $20 profit. Which plan best helps your business grow while still being wise?",
            choices: [
              "Spend all $20 on snacks",
              "Save $10 and spend $10 on supplies for a bigger batch",
              "Throw away your sales log",
              "Give up because $20 isn't much",
            ],
            answer: 1,
            why: "Saving part and reinvesting part protects your money and helps the business grow.",
            hints: [
              "A treat now and then is fine, but nothing is left to grow the business.",
              "",
              "Your sales log is your best teacher. Keep it!",
              "Small profits add up. Many big companies started tiny and kept going.",
            ],
          },
          approaches: {
            analogy:
              "Reinvesting is like planting some of your seeds instead of eating them all. The seeds you plant grow into a bigger harvest next season.",
            example:
              "Profit after launch: $24. Plan: save half, which is $12. Reinvest a quarter, $6, in supplies for a bigger batch. Keep the last quarter, $6, to spend or give. Check: $12 + $6 + $6 = $24.",
            simpler: {
              q: "Reinvesting means...",
              choices: [
                "putting some profit back into the business",
                "spending all of it on fun",
                "hiding the money under your bed",
              ],
              answer: 0,
              why: "Reinvested profit buys things that help the business improve or grow.",
              hints: [
                "",
                "Spending it all doesn't help the business grow.",
                "Hidden money is saved, but it doesn't help the business grow.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item into revenue or cost.",
        buckets: ["Revenue (money in)", "Cost (money out)"],
        items: [
          { text: "A customer pays $1 for a cookie", bucket: 0 },
          { text: "Buying chocolate chips", bucket: 1 },
          { text: "A neighbor pays $5 for a dog walk", bucket: 0 },
          { text: "Buying poster board for your sign", bucket: 1 },
          { text: "Selling 3 bracelets for $9", bucket: 0 },
          { text: "Buying ice for lemonade", bucket: 1 },
          { text: "A family pays $4 to have plants watered", bucket: 0 },
          { text: "Buying little bags for cookies", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain how to tell whether your business made money, and what you would do with the results.",
        keyPoints: [
          "Profit equals revenue minus costs, and a negative answer is a loss",
          "Use real records from your sales log",
          "Look for lessons: what worked, what didn't, and what to change",
          "Save some profit and reinvest some to grow",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "Next Saturday you expect to sell 34 cookies again. Each costs $0.40 to make, and you still owe $12 for your sign and tablecloth. Slide the price until your P&L shows at least $10 profit.",
          goal: { sim: "profit", cost: 0.4, fixed: 12, units: 34, minProfit: 10 },
          hint: "Your revenue has to cover the ingredients for 34 cookies, the $12 startup costs, AND $10 of profit.",
          mistakes: [
            {
              match: "Price at $1.00",
              coach: "At $1.00 the P&L shows only $8.40 profit. Nudge the price up a little.",
            },
            {
              match: "Price below $0.40",
              coach: "Below cost, every cookie loses money. The price must be above $0.40.",
            },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "Bracelet P&L: you sold 15 bracelets at $3 each. Beads and string cost $0.50 per bracelet, and you bought a $10 display board. What is your profit?",
          answer: 27.5,
          tolerance: 0.01,
          unit: "$",
          hint: "Find revenue (15 x $3), then total costs (15 x $0.50 plus $10), then subtract.",
          mistakes: [
            {
              match: "35",
              coach: "You forgot the bead-and-string cost for each bracelet: 15 x $0.50 = $7.50.",
            },
            { match: "37.5", coach: "You forgot the $10 display board. Every cost goes on the P&L." },
            { match: "45", coach: "That's revenue. Profit is what's left after subtracting all the costs." },
          ],
          seconds: 60,
        },
        {
          type: "place",
          prompt: "Drag each day's result onto the profit line. Left of zero is a loss.",
          min: -10,
          max: 30,
          step: 1,
          tolerance: 0,
          items: [
            { label: "Revenue $12, costs $15", value: -3 },
            { label: "Revenue $40, costs $28", value: 12 },
            { label: "Revenue $30, costs $7", value: 23 },
            { label: "Revenue $20, costs $20", value: 0 },
          ],
          hint: "For each day, subtract costs from revenue. If costs are bigger, the answer is below zero.",
          mistakes: [
            {
              match: "Placed the $12/$15 day at +3",
              coach: "Costs were bigger than revenue, so that day was a $3 LOSS: left of zero.",
            },
            { match: "Added revenue and costs", coach: "Profit is revenue MINUS costs." },
          ],
          seconds: 60,
        },
        {
          type: "match",
          prompt: "Match each P&L word to its meaning.",
          pairs: [
            { left: "Revenue", right: "All the money customers paid you" },
            { left: "Costs", right: "All the money you spent to run the business" },
            { left: "Loss", right: "When costs are bigger than revenue" },
            { left: "Margin", right: "The share of each revenue dollar you kept as profit" },
            { left: "Reinvesting", right: "Putting some profit back into the business" },
          ],
          hint: "Picture a cookie jar: coins going in, coins going out, and what's left.",
          mistakes: [
            {
              match: "Swapped revenue and costs",
              coach: "Revenue is money coming IN from customers. Costs are money going OUT.",
            },
            {
              match: "Swapped margin and reinvesting",
              coach: "Margin measures how much you kept. Reinvesting is what you do with it.",
            },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "What is the profit and loss equation?",
          choices: [
            "Costs minus revenue equals profit",
            "Revenue plus costs equals profit",
            "Revenue minus costs equals profit",
          ],
          answer: 2,
          why: "Profit is what remains after subtracting all costs from the money you took in.",
        },
        {
          q: "You sold 15 bracelets at $3 each. What is your revenue?",
          choices: ["$18", "$45", "$30", "$5"],
          answer: 1,
          why: "Revenue is 15 times $3, which equals $45.",
        },
        {
          q: "Your revenue was $45 and your total costs were $20. What is your profit?",
          choices: ["$25", "$65", "$20", "$2.25"],
          answer: 0,
          why: "$45 minus $20 equals $25 of profit.",
        },
        {
          q: "Revenue was $12 and costs were $15. What happened?",
          choices: [
            "A $27 profit",
            "A $3 profit",
            "You broke even",
            "A $3 loss",
          ],
          answer: 3,
          why: "$12 minus $15 is negative $3, which means a $3 loss.",
        },
        {
          q: "What does reinvesting mean?",
          choices: [
            "Spending all profit on toys",
            "Putting some profit back into the business to help it grow",
            "Giving up after a loss",
            "Raising prices every day",
          ],
          answer: 1,
          why: "Reinvesting uses profit to buy things that help the business improve or grow.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Using your sales log from launch day, build a simple P&L: list your revenue (each sale or a total), list every cost, and calculate revenue minus costs = profit (or loss). Show your math. Then write 3 lessons learned: what worked, what didn't, and what you will change. Finish by saying how much of your profit you will save and how much you will reinvest, and on what.",
        rubric: [
          "Lists revenue and all costs from real launch-day records",
          "Correctly calculates profit or loss with the math shown",
          "Gives 3 specific, honest lessons learned, including what to change",
          "Explains a plan to save and reinvest part of the profit",
        ],
      },
    },
  ],
};
