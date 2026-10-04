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
