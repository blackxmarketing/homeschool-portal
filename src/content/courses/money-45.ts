import type { Course } from "./types";
import { money } from "./money";

const p = (...paras: string[]) => paras.join("\n\n");

/**
 * Money Basics: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const money45: Course = {
  ...money,
  id: "money-45",
  band: "sprout",
  title: "Money Basics",
  blurb: "Money for grades 4-5: needs and wants, earning, saving and smart spending.",
  lessons: [
    // ------------------------------------------------------------------
    {
      id: "money-45.needs-wants",
      title: "Needs and Wants",
      minutes: 25,
      stage: "grammar",
      read: p(
        `Every day, people decide what to spend money on. A smart way to start is to sort things into two piles: needs and wants.`,
        `A need is something you must have to live and stay safe and healthy. Food, clean water, a home, clothes that keep you warm, and medicine when you are sick are all needs. Without them, life gets hard or even dangerous.`,
        `A want is something that makes life more fun or more comfortable, but you could live without it. Toys, video games, candy, a new skateboard, and movie tickets are all wants. Wants are not bad! They make life fun. But they come second.`,
        `Sometimes the same kind of thing can be a need or a want. A plain winter coat that keeps you warm is a need. A second coat just because you like the color is a want. A glass of water is a need. A fancy smoothie is a want. To tell the difference, ask yourself: "Could I live safely without this?"`,
        `Smart savers follow a simple rule: pay for needs first, then use what is left for wants. If you have $20 and you need a $6 notebook for school, buy the notebook first. Then you have $14 left to spend or save.`,
        `Families make these choices all the time. Rent, groceries, and the electric bill get paid before fun things like a trip to the movies. When needs come first, everyone stays safe, and the wants are even more fun because you planned for them.`
      ),
      keyIdeas: [
        "A need is something you must have to live and stay safe.",
        "A want makes life more fun, but you could live without it.",
        "Pay for needs first, then use what is left for wants.",
      ],
      hook: {
        text: "You are packing for a three-day camping trip, and your backpack is small. On the bed are a water bottle, a warm jacket, a flashlight, a video game, a sleeping bag, a bag of candy and a comic book. Only some of it will fit. Which things go in first, and how did you decide?",
      },
      teach: [
        {
          title: "What is a need?",
          teach:
            "A need is something you must have to live and stay safe and healthy. Think about the camping trip. Without water, you get sick. Without a warm jacket and a sleeping bag, a cold night could be dangerous. Those are needs. At home, needs include food, clean water, a place to live, clothes that keep you warm, and medicine when you are sick. A good test is to ask: could I live safely without this? If the answer is no, it is a need.",
          visual: {
            type: "flip",
            cards: [
              { front: "Need", back: "Something you must have to live and stay safe, like food, water and a warm coat." },
              { front: "Want", back: "Something that makes life more fun, but you could live without it, like a toy." },
              { front: "The test", back: "Ask: could I live safely without this? If not, it is a need." },
            ],
          },
          probe: {
            type: "cloze",
            text: "A {0} is something you must have to live and stay safe. Food, water and a warm coat are all {1}.",
            blanks: [{ answers: ["need"] }, { answers: ["needs"] }],
            bank: ["need", "needs", "want", "wants", "toy", "treat"],
            hint: "Ask yourself: could you live safely without food or water?",
            mistakes: [
              { match: "want", coach: "A want is fun but you could skip it. Could you skip food or water?" },
              { match: "wants", coach: "Could you live without food and water? No way. So they are not wants." },
              { match: "toy", coach: "A toy is fun, but you do not need it to stay alive and safe." },
            ],
            seconds: 20,
          },
          think: {
            q: "Which item on the camping bed is a need?",
            choices: ["The video game", "The bag of candy", "The water bottle", "The comic book"],
            answer: 2,
            why: "You need water to live. The other items are fun, but you could get through the trip without them.",
            hints: [
              "A video game is fun, but could you stay safe for three days without it?",
              "Candy tastes great, but your body does not need it to stay healthy.",
              "",
              "A comic book is fun to read, but you could live without it.",
            ],
          },
          approaches: {
            analogy:
              "Think of a car. Gas and tires are needs, because without them the car cannot go. Stickers and a cool air freshener are wants. They make the ride nicer, but the car still runs without them.",
            example:
              "Jonah lists what his family buys: groceries, a coat for winter, cold medicine and a board game. He asks the test question for each. Groceries, the coat and the medicine are needs. The board game is a want.",
            simpler: {
              q: "Which one do you need to live?",
              choices: ["Food", "A toy car"],
              answer: 0,
              why: "Your body needs food every day to live and grow.",
              hints: ["", "A toy car is fun, but you could live without it. Which one keeps your body going?"],
            },
          },
        },
        {
          title: "What is a want?",
          teach:
            "A want is something that makes life more fun or more comfortable, but you could live without it. Video games, candy, comic books, a new skateboard and movie tickets are all wants. Wants are not bad! They make life enjoyable, and it is fine to have some. The trick is to know which is which. When you can sort needs from wants, you can make sure the important things are covered first.",
          visual: {
            type: "compare",
            left: { title: "Needs", points: ["Food and clean water", "A home", "Clothes that keep you warm", "Medicine when you are sick"] },
            right: { title: "Wants", points: ["Toys and games", "Candy and treats", "A new skateboard", "Movie tickets"] },
          },
          probe: {
            type: "sort",
            prompt: "Sort each item: is it a need or a want?",
            buckets: ["Need", "Want"],
            items: [
              { text: "Drinking water", bucket: 0 },
              { text: "A warm winter coat", bucket: 0 },
              { text: "Medicine when you are sick", bucket: 0 },
              { text: "Healthy food for dinner", bucket: 0 },
              { text: "A new video game", bucket: 1 },
              { text: "A bag of candy", bucket: 1 },
              { text: "Movie tickets", bucket: 1 },
              { text: "A shiny new skateboard", bucket: 1 },
            ],
            hint: "For each one, ask: could I live safely without this?",
            mistakes: [
              { match: "Put the coat in want", coach: "In a cold winter, a warm coat keeps you safe. That makes it a need." },
              { match: "Put the video game in need", coach: "A video game is fun, but you could live safely without it." },
            ],
            seconds: 35,
          },
          think: {
            q: "Why is a new skateboard a want?",
            choices: [
              "Because it costs a lot of money",
              "Because you could live safely without it",
              "Because grown-ups do not like skateboards",
            ],
            answer: 1,
            why: "A want is something fun that you could live without. A skateboard is fun, but you do not need it to stay alive and safe.",
            hints: [
              "Some needs cost a lot too, like a home. Price is not what makes it a want.",
              "",
              "Whether someone likes it does not matter. Think about whether you could live without it.",
            ],
          },
          approaches: {
            analogy:
              "Needs are like the bread in a sandwich. Without them, there is no sandwich. Wants are like the pickles and extra cheese. They make it tastier, but the sandwich still works without them.",
            example:
              "Grace makes a list: lunch, a new phone case, socks for winter and stickers. Lunch and warm socks are needs. The phone case and the stickers are wants, because she would be fine without them.",
            simpler: {
              q: "Which one is a want?",
              choices: ["A bag of candy", "A glass of water"],
              answer: 0,
              why: "Candy is a treat. You could live without it, so it is a want.",
              hints: ["", "Your body needs water to live, so water is a need. Which one is just a treat?"],
            },
          },
        },
        {
          title: "Needs first, then wants",
          teach:
            "Smart money users follow one simple rule: pay for needs first, then use what is left for wants. Say you have $20. You need a $6 notebook for school. Buy the notebook first. Now you have 20 minus 6, which is $14 left for wants or for saving. Families do the same thing. Food and the electric bill get paid before a trip to the movies. When needs come first, you never trade something important for something fun.",
          visual: {
            type: "budget",
            income: 20,
            categories: [
              { label: "Needs", pct: 50 },
              { label: "Wants", pct: 30 },
              { label: "Save", pct: 20 },
            ],
          },
          probe: {
            type: "number",
            prompt: "You have $15. You need to buy a $6 school notebook first. How many dollars are left for wants?",
            answer: 9,
            unit: "$",
            hint: "Pay for the need first. Take the notebook price away from the $15.",
            mistakes: [
              { match: "21", coach: "You added. Buying the notebook uses up money, so subtract." },
              { match: "6", coach: "That is the notebook price. How much is left after you pay it?" },
              { match: "15", coach: "You still need to pay for the notebook. Take $6 away first." },
            ],
            seconds: 20,
          },
          think: {
            q: "You have $10. You need $4 for lunch, and you want a $8 toy. What should you do?",
            choices: [
              "Buy the toy first, then figure out lunch",
              "Buy lunch first, then save the $6 left toward the toy",
              "Skip lunch so you can buy the toy",
            ],
            answer: 1,
            why: "Needs come first. After a $4 lunch you have $6, which can go toward the toy later.",
            hints: [
              "If you spend $8 on the toy, you only have $2 left. Is that enough for lunch?",
              "",
              "Lunch is a need. Skipping a need for a want is the opposite of the rule.",
            ],
          },
          approaches: {
            analogy:
              "Packing for a trip works the same way. You put the sleeping bag and water in first. If there is room left, then you add the comic book. Important things go in first so they never get left behind.",
            example:
              "Ella has $20. She needs $8 for a new pair of gym socks and a water bottle for sports. 20 - 8 = $12. She spends $5 on a book she wants and saves the other $7.",
            simpler: {
              q: "Which do you pay for first?",
              choices: ["Wants", "Needs"],
              answer: 1,
              why: "Needs come first, because they keep you safe and healthy.",
              hints: ["Wants are fun, but what happens if there is no money left for food?", ""],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort these into needs and wants.",
        buckets: ["Need", "Want"],
        items: [
          { text: "Groceries for the week", bucket: 0 },
          { text: "A doctor visit when you are sick", bucket: 0 },
          { text: "Shoes that fit your feet", bucket: 0 },
          { text: "A roof over your head", bucket: 0 },
          { text: "A toy robot", bucket: 1 },
          { text: "An ice cream cone", bucket: 1 },
          { text: "A second pair of sneakers in a new color", bucket: 1 },
          { text: "Stickers for your notebook", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain to a friend how you can tell a need from a want, and what to pay for first.",
        keyPoints: [
          "A need is something you must have to live and stay safe",
          "A want is fun but you could live without it",
          "Pay for needs first, then wants",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "You have $18. You need a $5 lunch and a $3 pack of pencils for school. How many dollars are left for wants?",
          answer: 10,
          unit: "$",
          hint: "Add up the two needs first, then take that away from $18.",
          mistakes: [
            { match: "13", coach: "You paid for lunch but forgot the pencils. Take away $3 more." },
            { match: "15", coach: "You paid for the pencils but forgot lunch. Take away $5 more." },
            { match: "8", coach: "That is what the needs cost. How much is left after you pay for them?" },
          ],
          seconds: 35,
        },
        {
          type: "match",
          prompt: "Match each item to the best description.",
          pairs: [
            { left: "Clean drinking water", right: "A need: you cannot live without it" },
            { left: "A new video game", right: "A want: fun, but you can live without it" },
            { left: "Pay for this first", right: "Needs" },
            { left: "Use what is left for this", right: "Wants or saving" },
          ],
          hint: "Use the test: could you live safely without it?",
          mistakes: [{ match: "Matched water to a want", coach: "Your body needs water every day. That makes it a need." }],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "To tell a need from a want, ask: could I live {0} without it? Always pay for {1} first.",
          blanks: [{ answers: ["safely"] }, { answers: ["needs"] }],
          bank: ["safely", "happily", "needs", "wants", "toys"],
          hint: "Think about the test question from the lesson and the order you pay for things.",
          mistakes: [
            { match: "happily", coach: "You might be less happy without a toy, but you would still be safe. The test is about being safe." },
            { match: "wants", coach: "Wants come second. What keeps you safe and healthy?" },
          ],
          seconds: 30,
        },
        {
          type: "sequence",
          prompt: "Put Nate's money steps in a smart order. He has $20.",
          steps: [
            "Make a list of what he needs and what he wants",
            "Pay for the needs first",
            "Count how much money is left",
            "Choose one want, or save the rest",
          ],
          hint: "You have to know your needs before you pay for them, and you count what is left before you pick a want.",
          seconds: 35,
        },
      ],
      check: [
        {
          q: "Which of these is a need?",
          choices: ["A video game", "A warm coat in winter", "A candy bar", "A toy drone"],
          answer: 1,
          why: "A warm coat keeps you safe in cold weather, so it is a need.",
        },
        {
          q: "Which of these is a want?",
          choices: ["Medicine when you are sick", "Clean water", "Movie tickets"],
          answer: 2,
          why: "Movies are fun, but you can live without them, so tickets are a want.",
        },
        {
          q: "You have $12 and need a $5 lunch. How much is left for wants?",
          choices: ["$7", "$17", "$5", "$12"],
          answer: 0,
          why: "Pay the need first: 12 - 5 = $7 left.",
        },
        {
          q: "What should you pay for first?",
          choices: ["Wants", "Whatever is on sale", "Needs"],
          answer: 2,
          why: "Needs keep you safe and healthy, so they always come first.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, look at your family's grocery list or walk through your kitchen. Make a chart with two columns, Needs and Wants, and write at least 5 things in each column. Then circle one want you would most like to save up for.",
        rubric: [
          "Lists at least 5 needs and 5 wants",
          "Each item is in the right column",
          "Circles one want and says why they chose it",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-45.earning",
      title: "Earning Money",
      minutes: 25,
      stage: "grammar",
      read: p(
        `Money does not grow on trees. People earn money by doing work that helps someone else. When you rake a neighbor's leaves, walk a dog, or water plants while a family is away, you make their life easier. That help has value, and people are happy to pay for it.`,
        `Some chores are simply part of being in a family, like making your bed, clearing your plate, or feeding the family pet. You do them because everyone helps out at home. Some families also let kids earn money for extra jobs, like washing the car or pulling weeds. And when you are a bit older, neighbors may pay you for jobs too.`,
        `Counting what you earn is simple math. If you walk a dog for $3 each time and you walk it 5 times, you earn 3 x 5 = $15. If you also water plants once for $4, your total is 15 + 4 = $19.`,
        `Doing a job well matters as much as doing it at all. Show up on time. Do the job carefully and finish it. Check your work before you say you are done. Be polite and say thank you. When you do a great job, people trust you, call you again, and tell their friends about you. That is called a good reputation, and it brings more work.`,
        `Benjamin Franklin, who started out as a young printer's helper, believed in hard work. He wrote, "Diligence is the mother of good luck." Diligence means working hard and carefully. Kids who do their jobs with care often find that good "luck" comes their way.`
      ),
      keyIdeas: [
        "People earn money by doing work that helps others.",
        "To find what you earn, multiply the pay for one job by the number of times you do it.",
        "Doing a job well builds a good reputation, and that brings more work.",
      ],
      hook: {
        text: "Two kids rake leaves for neighbors on the same street, and both charge $5. Sam rushes, leaves piles behind and forgets the back yard. Ava rakes every corner, bags the leaves and sweeps the sidewalk. Next fall, the neighbors only call one of them. Who do you think it is, and why?",
      },
      teach: [
        {
          title: "Work that helps others",
          teach:
            "People earn money by doing work that helps someone else. A busy neighbor may not have time to walk the dog or water the garden. When you do it, you make their life easier. That help has value, and they are glad to pay for it. Some chores, like making your bed or clearing your plate, are just part of being in a family. Extra jobs, like washing the car, are a way some kids earn money.",
          visual: {
            type: "compare",
            left: { title: "Family chores", points: ["Making your bed", "Clearing your plate", "Feeding the family pet", "Done because everyone helps"] },
            right: { title: "Extra jobs to earn", points: ["Washing the car", "Pulling weeds", "Walking a neighbor's dog", "Done for pay"] },
          },
          probe: {
            type: "cloze",
            text: "People earn money by doing work that {0} someone else. When your work makes their life easier, it has {1}.",
            blanks: [{ answers: ["helps"] }, { answers: ["value"] }],
            bank: ["helps", "bothers", "value", "luck", "noise"],
            hint: "Think about why a busy neighbor would be glad to pay you.",
            mistakes: [
              { match: "bothers", coach: "Nobody pays to be bothered! What does your work do for them?" },
              { match: "luck", coach: "Luck is not the reason. What does helpful work have that people will pay for?" },
            ],
            seconds: 20,
          },
          think: {
            q: "Why would a neighbor pay you $5 to water their plants while they are away?",
            choices: [
              "Because kids should always get money",
              "Because your help keeps their plants alive while they are gone",
              "Because plants are expensive to buy",
            ],
            answer: 1,
            why: "Your work solves a problem for them. That is value, and they are happy to pay for it.",
            hints: [
              "People pay for help that makes their life better, not just because someone is a kid.",
              "",
              "Plants may cost money, but think about what your work does for the neighbor.",
            ],
          },
          approaches: {
            analogy:
              "Earning is like a fair trade at lunch. You give your friend half your sandwich, and they give you their apple. Both of you are happy. With a job, you give your help and the other person gives you money.",
            example:
              "Mr. Reyes goes on a trip for a week. Lily feeds his cat every day so it is happy and healthy. When he gets home, his cat is fine and he pays Lily $10. Her help gave him peace of mind.",
            simpler: {
              q: "Which of these helps someone else?",
              choices: ["Watching TV alone", "Pulling weeds in a neighbor's garden"],
              answer: 1,
              why: "Pulling weeds saves your neighbor time and work.",
              hints: ["TV can be fun, but does it help anyone else?", ""],
            },
          },
        },
        {
          title: "Counting what you earn",
          teach:
            "Counting what you earn is easy math. Find the pay for one job, then multiply by how many times you do it. If you walk a dog for $3 each time and walk it 5 times, you earn 3 x 5 = $15. If you also water plants once for $4, add it on: 15 + 4 = $19. Writing your jobs and pay in a little notebook helps you keep track.",
          visual: {
            type: "flip",
            cards: [
              { front: "$3 dog walk x 5 walks", back: "3 x 5 = $15" },
              { front: "$4 plant watering x 2 times", back: "4 x 2 = $8" },
              { front: "$15 + $8", back: "$23 for the week" },
            ],
          },
          probe: {
            type: "number",
            prompt: "You water a neighbor's garden for $4 each time. You do it 6 times. How many dollars do you earn?",
            answer: 24,
            unit: "$",
            hint: "You earn $4 again every time you do the job. Multiply 4 by 6.",
            mistakes: [
              { match: "10", coach: "You added 4 and 6. You earn $4 six separate times, so multiply." },
              { match: "46", coach: "That is the numbers side by side. Multiply 4 x 6 instead." },
              { match: "20", coach: "That is 4 x 5. You did the job 6 times." },
            ],
            seconds: 20,
          },
          think: {
            q: "You feed a cat for $2 a day for 7 days. How much do you earn?",
            choices: ["$9", "$14", "$27", "$12"],
            answer: 1,
            why: "Pay for one day times the number of days: 2 x 7 = $14.",
            hints: [
              "You added 2 and 7. You earn $2 on each of the 7 days, so multiply.",
              "",
              "That is the numbers written side by side. Try 2 x 7.",
              "That is 2 x 6. Count all 7 days.",
            ],
          },
          approaches: {
            analogy:
              "It is like stacking blocks. Each job adds one block of the same size. Five dog walks means five $3 blocks stacked up: 3, 6, 9, 12, 15.",
            example:
              "Owen pulls weeds for $5 each Saturday. In 4 Saturdays he earns 5 x 4 = $20. He also washes the car once for $6, so his total is 20 + 6 = $26.",
            simpler: {
              q: "You earn $3 for each dog walk. You walk the dog 2 times. How much do you earn?",
              choices: ["$5", "$6", "$32"],
              answer: 1,
              why: "$3 for the first walk plus $3 for the second walk is $6.",
              hints: ["You added 3 and 2. Count $3 for each walk instead.", "", "That is the numbers side by side. Add $3 two times."],
            },
          },
        },
        {
          title: "Doing a job well",
          teach:
            "Doing a job well matters as much as doing it at all. Show up on time. Do the work carefully and finish every part. Check your work before you say you are done, and be polite. Remember Sam and Ava? Ava raked every corner and swept the sidewalk, so the neighbors trusted her. They called her again and told their friends. That trust is called a good reputation, and it brings you more work.",
          visual: {
            type: "flip",
            cards: [
              { front: "Reputation", back: "What people think of you based on how you have acted before." },
              { front: "Diligence", back: "Working hard and carefully until the job is done right." },
              { front: "Repeat customer", back: "Someone who hires you again because you did a great job." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each action: does it build a good reputation or hurt it?",
            buckets: ["Builds a good reputation", "Hurts your reputation"],
            items: [
              { text: "Showing up on time", bucket: 0 },
              { text: "Checking your work before you leave", bucket: 0 },
              { text: "Saying thank you", bucket: 0 },
              { text: "Finishing every part of the job", bucket: 0 },
              { text: "Leaving piles of leaves behind", bucket: 1 },
              { text: "Forgetting the job you promised to do", bucket: 1 },
              { text: "Rushing so you can go play", bucket: 1 },
              { text: "Complaining to the customer", bucket: 1 },
            ],
            hint: "Imagine you are the neighbor. Would this make you want to hire the kid again?",
            mistakes: [{ match: "Put rushing in builds", coach: "Rushing often leaves the job half done. Would the neighbor want that again?" }],
            seconds: 35,
          },
          think: {
            q: "Why did the neighbors keep calling Ava instead of Sam?",
            choices: [
              "Ava charged more money",
              "Ava was lucky",
              "Ava did careful, complete work, so they trusted her",
            ],
            answer: 2,
            why: "Doing a job well builds trust. People hire the worker they trust to do it right.",
            hints: [
              "They both charged $5. Look at how they did the work.",
              "Franklin said diligence is the mother of good luck. What did Ava actually do?",
              "",
            ],
          },
          approaches: {
            analogy:
              "A reputation is like a good review for a restaurant. If the food is great, people tell friends and come back. If the food is bad, they go somewhere else.",
            example:
              "Kai washes his neighbor's car. He cleans the windows, wipes the wheels and checks for missed spots. The neighbor is so pleased that she asks him every month and tells two other neighbors. One careful job turned into three customers.",
            simpler: {
              q: "Which worker would you hire again?",
              choices: ["One who is late and leaves a mess", "One who is on time and does careful work"],
              answer: 1,
              why: "People want to hire someone they can count on.",
              hints: ["Would you want someone who is late and leaves a mess to come back?", ""],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of doing a job well in order.",
        steps: [
          "Agree on the job and the price",
          "Show up on time",
          "Do the work carefully",
          "Check your work for missed spots",
          "Ask if the customer is happy",
          "Say thank you and get paid",
        ],
      },
      explain: {
        prompt: "Explain to a younger kid how they could earn money from a neighbor and get hired again.",
        keyPoints: [
          "Do work that helps someone else",
          "Multiply the pay for one job by how many times you do it",
          "Do the job well so people trust you and hire you again",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "This week you walk a dog 4 times for $3 each and wash a car once for $6. How many dollars do you earn in all?",
          answer: 18,
          unit: "$",
          hint: "First find the dog walking money (3 x 4). Then add the car wash.",
          mistakes: [
            { match: "12", coach: "That is just the dog walks. Add the $6 car wash too." },
            { match: "13", coach: "You added 3 + 4 + 6. The dog walks are 3 x 4, then add 6." },
            { match: "9", coach: "Count the dog walk pay for all 4 walks, not just one." },
          ],
          seconds: 40,
        },
        {
          type: "match",
          prompt: "Match each set of jobs to what you earn.",
          pairs: [
            { left: "$2 a day for feeding a cat, 5 days", right: "$10" },
            { left: "$5 for pulling weeds, 3 times", right: "$15" },
            { left: "$4 for watering plants, 2 times", right: "$8" },
            { left: "$6 for washing a car, 2 times", right: "$12" },
          ],
          hint: "For each one, multiply the pay for one job by the number of times.",
          mistakes: [{ match: "Added instead of multiplied", coach: "You earn the pay again every time, so multiply." }],
          seconds: 45,
        },
        {
          type: "highlight",
          prompt: "Tap every sentence that shows Ava doing a job well.",
          sentences: [
            "Ava showed up at 9 o'clock, just like she promised.",
            "She raked every corner of the yard.",
            "She left early to watch a show.",
            "She bagged the leaves and swept the sidewalk.",
            "She asked Mrs. Park if she was happy with the work.",
          ],
          correct: [0, 1, 3, 4],
          hint: "Look for being on time, careful work, finishing and being polite.",
          mistakes: [{ match: "Tapped leaving early", coach: "Leaving early means the job may not be finished. That is not doing it well." }],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "When you do careful work, people trust you. That trust is called a good {0}, and it brings more {1}.",
          blanks: [{ answers: ["reputation"] }, { answers: ["work", "jobs", "customers"] }],
          bank: ["reputation", "allowance", "work", "trouble", "noise"],
          hint: "What do people say about a kid who always does great work?",
          mistakes: [
            { match: "allowance", coach: "An allowance comes from family. What do neighbors think of you after a great job?" },
            { match: "trouble", coach: "Careful work does the opposite of causing trouble. What does it bring you?" },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "How do people earn money?",
          choices: [
            "By doing work that helps someone else",
            "By waiting for it to grow on trees",
            "By asking for it without doing anything",
          ],
          answer: 0,
          why: "Work that helps others has value, and people pay for value.",
        },
        {
          q: "You walk a dog 3 times for $4 each. How much do you earn?",
          choices: ["$7", "$34", "$12", "$10"],
          answer: 2,
          why: "Multiply the pay for one walk by the number of walks: 4 x 3 = $12.",
        },
        {
          q: "Which action builds a good reputation?",
          choices: ["Showing up late", "Leaving the job half done", "Forgetting to say thank you", "Checking your work before you leave"],
          answer: 3,
          why: "Checking your work shows you care about doing it right, so people trust you.",
        },
        {
          q: "What does diligence mean?",
          choices: ["Being lucky", "Working hard and carefully", "Charging high prices"],
          answer: 1,
          why: "Diligence means working hard and carefully until the job is done right.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, choose one extra job you could do at home or for a neighbor you know, like washing the car or pulling weeds. Agree on a fair price. Do the job, then write down what you did, how long it took, what you earned, and two things you did to do the job well.",
        rubric: [
          "Picks a real job and agrees on a price with a parent",
          "Finishes the job and writes down the time and the pay",
          "Names two specific things they did to do the job well",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-45.saving",
      title: "Saving for a Goal",
      minutes: 30,
      stage: "logic",
      read: p(
        `Saving means putting money aside now so you can use it later. When you save, you are choosing to wait for something bigger instead of spending a little bit at a time.`,
        `The best saving starts with a goal. A goal is a clear thing you want and its price, like a $48 bike or a $30 set of books. Write your goal down. Some kids tape a picture of it on a jar. A savings jar is a simple place to keep the money you set aside, so you can see it grow.`,
        `Next, count the weeks. Divide the price of your goal by the money you save each week. If the bike costs $48 and you save $6 a week, it takes 48 / 6 = 8 weeks. If you can only save $4 a week, it takes 48 / 4 = 12 weeks. Saving more each week gets you there sooner.`,
        `Watch out for leaks. A leak is small spending that slows you down. If you earn $6 a week but spend $2 on candy, you only save $4, and your goal takes 4 weeks longer. Small treats are fine, but know what they cost you.`,
        `A savings chart helps you stay on track. Draw one box for each week. Each time you put money in the jar, color a box. Watching the boxes fill up makes waiting easier, and on the last week you get to buy your goal with money you saved yourself.`,
        `There is an old saying, often linked to Benjamin Franklin: "A penny saved is a penny earned." Every dollar you do not spend is a dollar working toward your goal.`
      ),
      keyIdeas: [
        "Saving means putting money aside now to use later.",
        "Weeks to save = goal price divided by money saved each week.",
        "Small spending leaks make your goal take longer.",
        "A savings jar and a chart help you see your progress.",
      ],
      hook: {
        text: "Nora wants a used bike that costs $48. She earns $6 a week doing extra jobs. If she saves every dollar, how many weeks until she can ride it? And what happens to her plan if she spends $2 of it every week on candy?",
      },
      teach: [
        {
          title: "Pick a goal",
          teach:
            "Saving means putting money aside now so you can use it later. The best saving starts with a goal: a clear thing you want and its price, like Nora's $48 bike. Write your goal down. Many kids tape a picture of it on a jar. A savings jar keeps your money in one safe place, and you can watch it grow. A goal gives you a reason to wait instead of spending.",
          visual: {
            type: "flip",
            cards: [
              { front: "Saving", back: "Putting money aside now so you can use it later." },
              { front: "Goal", back: "A clear thing you want and its price, like a $48 bike." },
              { front: "Savings jar", back: "A jar where you keep the money you set aside, with a picture of your goal on it." },
            ],
          },
          probe: {
            type: "cloze",
            text: "{0} means putting money aside now so you can use it later. A good savings goal names the thing you want and its {1}.",
            blanks: [{ answers: ["saving"] }, { answers: ["price", "cost"] }],
            bank: ["Saving", "Spending", "price", "color", "size"],
            hint: "You cannot count the weeks unless you know how much your goal costs.",
            mistakes: [
              { match: "spending", coach: "Spending uses money now. Which word means keeping it for later?" },
              { match: "color", coach: "Color is nice to know, but what number do you need to plan your saving?" },
            ],
            seconds: 25,
          },
          think: {
            q: "Which is the best savings goal?",
            choices: ["Save some money someday", "Save $30 for a set of books", "Save as little as possible"],
            answer: 1,
            why: "A good goal is clear: it names the thing and its price, so you can plan.",
            hints: [
              "Someday is not clear. How would you know when you are done?",
              "",
              "Saving as little as possible will not get you anything bigger.",
            ],
          },
          approaches: {
            analogy:
              "A savings goal is like a finish line in a race. If you know where the finish line is, you know how far to run. Without one, you might run in circles.",
            example:
              "Theo wants a $20 kite. He draws the kite on a card, writes $20 on it, and tapes it on a jar. Every time he gets money, he looks at the card before deciding what to do.",
            simpler: {
              q: "What does saving mean?",
              choices: ["Spending money right away", "Putting money aside to use later"],
              answer: 1,
              why: "Saving is keeping money now so you can use it for something later.",
              hints: ["Spending right away is the opposite of saving.", ""],
            },
          },
        },
        {
          title: "Counting the weeks",
          teach:
            "How long will your goal take? Divide the price by the money you save each week. Nora's bike costs $48 and she saves $6 a week. 48 divided by 6 is 8, so she needs 8 weeks. If she could only save $4 a week, it would take 48 divided by 4, which is 12 weeks. Saving more each week gets you to your goal sooner.",
          visual: {
            type: "compare",
            left: { title: "Save $6 a week", points: ["$48 bike", "48 / 6 = 8 weeks", "Riding sooner"] },
            right: { title: "Save $4 a week", points: ["$48 bike", "48 / 4 = 12 weeks", "4 more weeks of waiting"] },
          },
          probe: {
            type: "number",
            prompt: "A set of books costs $30. You save $5 every week. How many weeks until you can buy it?",
            answer: 6,
            unit: "weeks",
            hint: "How many groups of $5 make $30? Divide 30 by 5.",
            mistakes: [
              { match: "150", coach: "You multiplied. Split the $30 into $5 pieces instead." },
              { match: "25", coach: "You subtracted. Count how many $5 weeks it takes to reach $30." },
              { match: "5", coach: "After 5 weeks you have $25. Keep going one more week." },
            ],
            seconds: 25,
          },
          think: {
            q: "A game costs $24. You save $3 a week. How many weeks will it take?",
            choices: ["21 weeks", "8 weeks", "27 weeks", "6 weeks"],
            answer: 1,
            why: "Divide the price by what you save each week: 24 / 3 = 8 weeks.",
            hints: [
              "You subtracted 3 from 24. Count how many $3 weeks fit into $24 instead.",
              "",
              "You added. Saving $3 a week, how many weeks to reach $24?",
              "That would be saving $4 a week. You save $3.",
            ],
          },
          approaches: {
            analogy:
              "It is like climbing stairs to the top floor. If each step is $5 and the top is $30, count the steps: 5, 10, 15, 20, 25, 30. That is 6 steps.",
            example:
              "Ruby wants a $40 scooter. She saves $8 a week. Week 1: $8. Week 2: $16. Week 3: $24. Week 4: $32. Week 5: $40. That is 40 / 8 = 5 weeks.",
            simpler: {
              q: "A toy costs $10. You save $5 a week. How many weeks?",
              choices: ["2 weeks", "5 weeks", "15 weeks"],
              answer: 0,
              why: "$5 the first week and $5 the second week makes $10. That is 2 weeks.",
              hints: ["", "After 5 weeks you would have $25. That is too much. Count again.", "You added 10 and 5. How many $5 weeks make $10?"],
            },
          },
        },
        {
          title: "Leaks and your savings chart",
          teach:
            "Watch out for leaks. A leak is small spending that slows you down. If Nora earns $6 a week but spends $2 on candy, she only saves $4. Now her bike takes 12 weeks instead of 8. A savings chart helps you stay on track. Draw one box for each week. Every time you put money in the jar, color a box. Watching the boxes fill up makes waiting much easier.",
          visual: {
            type: "budget",
            income: 6,
            categories: [
              { label: "Save for the bike", pct: 67 },
              { label: "Candy", pct: 33 },
            ],
          },
          probe: {
            type: "number",
            prompt: "You earn $8 a week. You spend $2 on snacks and save the rest. Your goal costs $36. How many weeks until you reach it?",
            answer: 6,
            unit: "weeks",
            hint: "First find what you save each week: 8 minus 2. Then divide 36 by that.",
            mistakes: [
              { match: "4.5", coach: "That would be saving all $8. You spend $2 first, so you save $6 a week." },
              { match: "18", coach: "That is 36 divided by 2. The $2 is what you spend. You save 8 - 2 = $6." },
            ],
            seconds: 40,
          },
          think: {
            q: "Nora saves $6 a week for a $48 bike. Then she starts spending $2 a week on candy. What happens?",
            choices: [
              "Her goal takes longer, 12 weeks instead of 8",
              "Nothing changes",
              "She reaches her goal sooner",
            ],
            answer: 0,
            why: "She now saves only $4 a week, and 48 / 4 = 12 weeks.",
            hints: [
              "",
              "Every dollar spent on candy is a dollar that does not go in the jar.",
              "Spending money does not add to her jar. Think again about how much she saves now.",
            ],
          },
          approaches: {
            analogy:
              "A leak in savings is like a small hole in a bucket. You keep pouring water in, but some drips out, so the bucket takes longer to fill.",
            example:
              "Max saves $5 a week for a $40 baseball glove: 40 / 5 = 8 weeks. He starts buying a $1 slushie every week, so he only saves $4: 40 / 4 = 10 weeks. One small treat added 2 weeks.",
            simpler: {
              q: "You get $5 and spend $1. How much can you save?",
              choices: ["$6", "$4", "$5"],
              answer: 1,
              why: "5 - 1 = $4 left to save.",
              hints: ["You added. Spending takes money away.", "", "You forgot to take away the $1 you spent."],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of saving for a goal in order.",
        steps: [
          "Choose a goal and find its price",
          "Decide how much to save each week",
          "Divide to count the weeks",
          "Draw a chart with one box for each week",
          "Put money in the jar and color a box each week",
          "Buy your goal with money you saved",
        ],
      },
      explain: {
        prompt: "Explain to a friend how to save for something you want, like a new bike.",
        keyPoints: [
          "Pick a clear goal with a price",
          "Divide the price by what you save each week to count the weeks",
          "Avoid small spending leaks",
          "Use a jar and a chart to track your progress",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A skateboard costs $42. You save $7 a week. How many weeks until you can buy it?",
          answer: 6,
          unit: "weeks",
          hint: "Divide the price by what you save each week.",
          mistakes: [
            { match: "35", coach: "You subtracted. Count how many $7 weeks make $42." },
            { match: "49", coach: "You added. Divide 42 by 7 instead." },
          ],
          seconds: 30,
        },
        {
          type: "place",
          prompt: "You save $5 every week in your jar. Place each week on the number line at how many dollars are in the jar.",
          min: 0,
          max: 50,
          step: 1,
          tolerance: 1,
          items: [
            { label: "After week 2", value: 10 },
            { label: "After week 5", value: 25 },
            { label: "After week 8", value: 40 },
          ],
          hint: "Multiply the week number by $5.",
          mistakes: [{ match: "Placed week 5 at 5", coach: "After 5 weeks of $5 each, you have 5 x 5 = $25." }],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build the rule for counting how many weeks it takes to reach a goal.",
          tiles: ["Weeks to save", "equals", "goal price", "divided by", "money saved each week"],
          distractors: ["plus", "times"],
          hint: "Start with what you want to find. Then split the price into weekly pieces.",
          mistakes: [{ match: "Used times", coach: "Multiplying makes a huge number. You want to split the price into weekly pieces." }],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "Small spending that slows down your saving is called a {0}. If you spend $1 more each week, your goal takes {1} weeks.",
          blanks: [{ answers: ["leak"] }, { answers: ["more"] }],
          bank: ["leak", "goal", "more", "fewer", "chart"],
          hint: "Think of a bucket with a small hole in it.",
          mistakes: [
            { match: "fewer", coach: "Spending more means less goes in the jar each week. Does that make it faster or slower?" },
            { match: "goal", coach: "The goal is what you are saving for. What is the name for small spending that slows you down?" },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "A puzzle costs $20. You save $4 a week. How many weeks will it take?",
          choices: ["16 weeks", "24 weeks", "5 weeks", "80 weeks"],
          answer: 2,
          why: "Divide the price by what you save each week: 20 / 4 = 5 weeks.",
        },
        {
          q: "What makes a good savings goal?",
          choices: ["It names the thing and its price", "It is kept secret from everyone", "It changes every day"],
          answer: 0,
          why: "A clear goal with a price lets you count the weeks and plan.",
        },
        {
          q: "You earn $5 a week and spend $2. How much do you save each week?",
          choices: ["$7", "$2", "$5", "$3"],
          answer: 3,
          why: "Take what you spend away from what you earn: 5 - 2 = $3.",
        },
        {
          q: "Why color a box on a savings chart each week?",
          choices: ["To make the jar heavier", "To see your progress and stay on track", "To spend money faster"],
          answer: 1,
          why: "Seeing the boxes fill up shows how close you are and makes waiting easier.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, pick a real savings goal and find its price. Decide how much you can save each week and count the weeks. Make a savings jar with a picture of your goal, and draw a chart with one box for each week. Color a box every time you add money.",
        rubric: [
          "Names a real goal and its price",
          "Shows the math for how many weeks it will take",
          "Makes a jar and a chart with the right number of boxes",
          "Colors the chart for at least two weeks",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-45.spending",
      title: "Spending Wisely",
      minutes: 30,
      stage: "logic",
      read: p(
        `Spending money is fun, but it is even better when you get a good deal. A wise shopper thinks before buying.`,
        `First, compare prices. The same thing can cost different amounts at different stores. If a puzzle costs $12 at one store and $9 at another, buying the cheaper one saves you 12 - 9 = $3. That is $3 you can save or spend on something else.`,
        `Second, find the price for one. Things often come in packs of different sizes. A pack of 2 notebooks for $6 means each notebook costs 6 / 2 = $3. A pack of 5 notebooks for $10 means each one costs 10 / 5 = $2. The bigger pack is the better deal for each notebook, but only if you will really use all five.`,
        `Third, think about value, not just price. Value means how much good you get for your money. A $5 ball that pops after one week is not a great deal. A $10 ball that lasts two whole years is a much better value, even though it costs more.`,
        `Finally, beware of spending traps. Stores put candy and toys near the checkout so you grab them without thinking. Ads try to make you want things you never thought about before. A smart trick is to wait a day before buying a want. If you still want it tomorrow, and it fits your plan, go for it. Ask yourself: is this a need or a want, and will I still use it next month?`,
        `Wise spending is not about never spending. It is about getting the most good from every dollar you worked hard to earn.`
      ),
      keyIdeas: [
        "Compare prices at different stores before you buy.",
        "Find the price for one item to compare packs of different sizes.",
        "Value means how much good you get for your money, not just a low price.",
        "Wait a day before buying a want.",
      ],
      hook: {
        text: "Two boxes of crayons sit on the store shelf. One box has 24 crayons for $6. The other has 48 crayons for $8. Which one is the better deal? And is the bigger box always the smarter choice?",
      },
      teach: [
        {
          title: "Compare prices",
          teach:
            "A wise shopper compares prices before buying. The same thing can cost different amounts at different stores, or even on different shelves in the same store. If a puzzle costs $12 at one store and $9 at another, buying the cheaper one saves you 12 minus 9, which is $3. That is $3 you can save or spend on something else. Checking two or three places is a habit that saves a lot over time.",
          visual: {
            type: "compare",
            left: { title: "Store A", points: ["Puzzle: $12", "Same puzzle", "Same size"] },
            right: { title: "Store B", points: ["Puzzle: $9", "Same puzzle", "You save $3"] },
          },
          probe: {
            type: "number",
            prompt: "A soccer ball costs $15 at one store and $11 at another. How many dollars do you save by buying the cheaper one?",
            answer: 4,
            unit: "$",
            hint: "Find the difference between the two prices. Subtract the smaller price from the bigger one.",
            mistakes: [
              { match: "26", coach: "You added the prices. To find how much you save, subtract." },
              { match: "11", coach: "That is what you pay. How much less is it than $15?" },
            ],
            seconds: 20,
          },
          think: {
            q: "A book costs $8 at one store and $6 at another. How much do you save at the cheaper store?",
            choices: ["$14", "$6", "$2"],
            answer: 2,
            why: "Subtract to find the difference: 8 - 6 = $2.",
            hints: [
              "You added. Saving is the difference between the prices, so subtract.",
              "That is the price you pay at the cheaper store. How much less is it than $8?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Comparing prices is like picking the shortest line at the store. You look at all the lines first, then choose the best one. A quick look can save you a lot.",
            example:
              "Ana needs a new backpack. One store sells it for $25. A second store sells the same backpack for $20. She buys it at the second store and saves $5, which goes into her savings jar.",
            simpler: {
              q: "The same toy costs $5 at one store and $3 at another. Which store is cheaper?",
              choices: ["The $5 store", "The $3 store"],
              answer: 1,
              why: "$3 is less than $5, so that store is cheaper.",
              hints: ["$5 is more money. Which price is smaller?", ""],
            },
          },
        },
        {
          title: "The price for one",
          teach:
            "Things often come in packs of different sizes. To compare them, find the price for one. Divide the pack price by how many are in it. A pack of 2 notebooks for $6 means each costs 6 divided by 2, which is $3. A pack of 5 notebooks for $10 means each costs 10 divided by 5, which is $2. The bigger pack is cheaper for each one, but only a good deal if you will really use them all.",
          visual: {
            type: "flip",
            cards: [
              { front: "2 notebooks for $6", back: "6 / 2 = $3 each" },
              { front: "5 notebooks for $10", back: "10 / 5 = $2 each" },
              { front: "Price for one", back: "Pack price divided by how many are in the pack." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each pack to the price for one item.",
            pairs: [
              { left: "4 markers for $12", right: "$3 each" },
              { left: "5 pencils for $10", right: "$2 each" },
              { left: "8 erasers for $8", right: "$1 each" },
              { left: "2 books for $10", right: "$5 each" },
            ],
            hint: "Divide each pack price by how many items are in the pack.",
            mistakes: [{ match: "Matched 4 markers to $4", coach: "Divide $12 by 4 markers. 12 / 4 = 3." }],
            seconds: 45,
          },
          think: {
            q: "A pack of 4 juice boxes costs $8. How much is one juice box?",
            choices: ["$4", "$2", "$12", "$32"],
            answer: 1,
            why: "Divide the pack price by how many are in it: 8 / 4 = $2.",
            hints: [
              "You subtracted 4 from 8. Split the $8 evenly among 4 juice boxes.",
              "",
              "You added. The price for one should be less than the whole pack.",
              "You multiplied. One juice box costs less than the whole pack.",
            ],
          },
          approaches: {
            analogy:
              "It is like sharing a pizza. If one pizza costs $12 and has 4 slices, each slice is worth $3. The price for one is just the price split into equal shares.",
            example:
              "Ben's family needs tennis balls. A can of 3 costs $6, so each ball is $2. A box of 6 costs $9, so each ball is less than $2. Since they play every week and will use them all, the box of 6 is the better deal.",
            simpler: {
              q: "2 apples cost $2. How much is one apple?",
              choices: ["$1", "$2", "$4"],
              answer: 0,
              why: "Split $2 between 2 apples: $1 each.",
              hints: ["", "$2 is the price for both apples. Split it in half.", "You doubled it. One apple costs less than two."],
            },
          },
        },
        {
          title: "Value and spending traps",
          teach:
            "Value means how much good you get for your money. A $5 ball that pops after one week is a poor value. A $10 ball that lasts two years is a much better value, even though it costs more. Also watch out for spending traps. Stores put candy near the checkout so you grab it without thinking. A smart trick is to wait a day before buying a want. If you still want it tomorrow, it may be worth it.",
          visual: {
            type: "compare",
            left: { title: "$5 ball", points: ["Cheaper price", "Pops in one week", "Poor value"] },
            right: { title: "$10 ball", points: ["Costs more", "Lasts two years", "Great value"] },
          },
          probe: {
            type: "sort",
            prompt: "Sort each choice: is it a wise spending habit or a spending trap?",
            buckets: ["Wise habit", "Spending trap"],
            items: [
              { text: "Checking prices at two stores", bucket: 0 },
              { text: "Waiting a day before buying a want", bucket: 0 },
              { text: "Picking the toy that will last longer", bucket: 0 },
              { text: "Asking: will I still use this next month?", bucket: 0 },
              { text: "Grabbing candy at the checkout without thinking", bucket: 1 },
              { text: "Buying something just because an ad made it look cool", bucket: 1 },
              { text: "Buying the biggest pack when you only need one", bucket: 1 },
              { text: "Spending all your money on the first thing you see", bucket: 1 },
            ],
            hint: "Does the choice involve thinking first, or buying without thinking?",
            mistakes: [{ match: "Put biggest pack in wise", coach: "A big pack is only a deal if you will use it all. If you need one, the rest is wasted." }],
            seconds: 40,
          },
          think: {
            q: "A $4 toy breaks in two days. A $8 toy lasts for years. Which is the better value?",
            choices: [
              "The $4 toy, because it is cheaper",
              "The $8 toy, because you get much more use from it",
              "They are the same value",
            ],
            answer: 1,
            why: "Value is how much good you get for your money. The $8 toy gives years of fun.",
            hints: [
              "A low price is nice, but two days of fun is not much for $4.",
              "",
              "One gives two days of fun and the other gives years. Is that really the same?",
            ],
          },
          approaches: {
            analogy:
              "Value is like picking shoes for a long hike. Cheap shoes that fall apart on the trail are no deal. Good shoes that last the whole hike are worth the extra money.",
            example:
              "Zoe sees a $6 toy near the checkout and wants it right away. She decides to wait a day. The next morning she does not care about it anymore, so she keeps her $6 for her bike goal.",
            simpler: {
              q: "What is a smart thing to do before buying a want?",
              choices: ["Buy it as fast as you can", "Wait a day and think about it"],
              answer: 1,
              why: "Waiting a day helps you see if you really want it.",
              hints: ["Buying fast is how spending traps work. What gives you time to think?", ""],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that shows a wise shopper.",
        sentences: [
          "Mia checks the price at two stores before she buys a puzzle.",
          "Leo grabs three candy bars at the checkout without thinking.",
          "Ana divides the pack price to find the price for one notebook.",
          "Kai buys a game because an ad on TV looked exciting.",
          "Zoe waits a day before buying a toy she wants.",
          "Ben picks the ball that will last two years instead of one week.",
        ],
        correct: [0, 2, 4, 5],
      },
      explain: {
        prompt: "Explain to a younger sibling three ways to be a wise shopper.",
        keyPoints: [
          "Compare prices at different stores",
          "Find the price for one to compare pack sizes",
          "Think about value, not just a low price",
          "Wait a day before buying a want",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A pack of 3 tennis balls costs $9. How many dollars is one tennis ball?",
          answer: 3,
          unit: "$",
          hint: "Divide the pack price by how many balls are in the pack.",
          mistakes: [
            { match: "6", coach: "You subtracted. Split the $9 evenly among 3 balls." },
            { match: "27", coach: "You multiplied. One ball costs less than the whole pack." },
            { match: "12", coach: "You added. One ball costs less than the whole pack." },
          ],
          seconds: 25,
        },
        {
          type: "number",
          prompt: "A board game costs $20 at one store and $14 at another. How many dollars do you save at the cheaper store?",
          answer: 6,
          unit: "$",
          hint: "Subtract the cheaper price from the higher price.",
          mistakes: [
            { match: "34", coach: "You added. Saving is the difference, so subtract." },
            { match: "14", coach: "That is the price you pay. How much less is it than $20?" },
          ],
          seconds: 25,
        },
        {
          type: "cloze",
          text: "{0} means how much good you get for your money. Before buying a want, it is smart to {1} a day.",
          blanks: [{ answers: ["Value"] }, { answers: ["wait"] }],
          bank: ["Value", "Price", "wait", "hurry", "spend"],
          hint: "One word is about the good you get from something. The other is the smart trick from the lesson.",
          mistakes: [
            { match: "price", coach: "Price is what it costs. Which word means the good you get for that money?" },
            { match: "hurry", coach: "Hurrying is how spending traps catch you. What gives you time to think?" },
          ],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "Which is the better deal for one item? Sort each pack.",
          buckets: ["Costs $2 or less each", "Costs more than $2 each"],
          items: [
            { text: "5 notebooks for $10", bucket: 0 },
            { text: "6 erasers for $6", bucket: 0 },
            { text: "2 notebooks for $6", bucket: 1 },
            { text: "4 markers for $12", bucket: 1 },
          ],
          hint: "Find the price for one first: divide the pack price by how many are in it.",
          mistakes: [{ match: "Put 2 notebooks for $6 in $2 or less", coach: "6 / 2 = $3 each. That is more than $2." }],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "A puzzle is $10 at one store and $7 at another. How much do you save at the cheaper store?",
          choices: ["$17", "$3", "$7", "$10"],
          answer: 1,
          why: "Subtract to find the difference: 10 - 7 = $3.",
        },
        {
          q: "A pack of 5 pens costs $5. How much is one pen?",
          choices: ["$5", "$10", "$25", "$1"],
          answer: 3,
          why: "Divide the pack price by the number of pens: 5 / 5 = $1.",
        },
        {
          q: "What does value mean?",
          choices: ["How much good you get for your money", "The lowest price on the shelf", "How big the box is"],
          answer: 0,
          why: "Value is about the good you get, not just how little you pay.",
        },
        {
          q: "Why do stores put candy near the checkout?",
          choices: ["Because candy is a need", "So shoppers grab it without thinking", "Because it is free there"],
          answer: 1,
          why: "Candy at the checkout is a spending trap. It tempts you while you wait.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Go to a grocery store with a parent. Find 3 items that come in two sizes or two brands, like cereal or apples. Write down both prices and how many are in each. Figure out which is the better deal, and decide which one your family would really use.",
        rubric: [
          "Writes down prices for 3 pairs of items",
          "Shows how they found the better deal for at least one pair",
          "Explains which one their family would choose and why",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-45.banks",
      title: "Banks and Interest",
      minutes: 30,
      stage: "logic",
      read: p(
        `A piggy bank is a fine place to start saving. But if you put $100 in a piggy bank, a year later you still have exactly $100. If you put $100 in a savings account at a bank, a year later you can have more than $100, without doing a single extra chore. How does that work?`,
        `A bank is a business that keeps people's money safe. When you put money into your account, that is called a deposit. When you take money out, that is called a withdrawal. The bank keeps a record of every dollar, so you always know how much is yours.`,
        `The bank does not just let your money sit in a vault. It lends some of it to other people, like a family buying a house or a baker opening a new shop. Those borrowers pay the bank extra money for using it. That extra money is called interest.`,
        `The bank shares part of that interest with you, because it is using your money. So when you save at a bank, the bank pays you interest. If a bank pays 5 percent a year, that means $5 for every $100. Save $200, and after one year you earn $10.`,
        `Here is the best part. Next year, you earn interest on your interest too. Your money grows a little faster every year, like a snowball rolling downhill. This is called compound interest. The longer you leave your money in the bank, the more it grows.`,
        `That is why starting to save early is so powerful. Even small amounts, left alone for many years, can grow into something big.`
      ),
      keyIdeas: [
        "A bank keeps money safe. Putting money in is a deposit; taking it out is a withdrawal.",
        "Banks lend money to borrowers, who pay extra called interest.",
        "The bank pays savers interest for using their money.",
        "With compound interest, you earn interest on your interest, so money grows faster over time.",
      ],
      hook: {
        text: "Put $100 in a piggy bank, and a year later you still have exactly $100. Put $100 in a savings account at a bank, and a year later you have more than $100. You did not do one extra chore. So where did the extra money come from?",
      },
      teach: [
        {
          title: "What a bank does",
          teach:
            "A bank is a business that keeps people's money safe. When you put money into your account, that is called a deposit. When you take money out, that is called a withdrawal. The bank keeps a careful record of every dollar, so you always know how much is yours. But the bank does not just let your money sit there. It lends some of it to people, like a family buying a house or a baker opening a shop.",
          visual: {
            type: "hotspots",
            title: "Inside a bank",
            center: "🏦",
            spots: [
              { label: "Deposit", icon: "⬇️", detail: "Putting money into your account." },
              { label: "Withdrawal", icon: "⬆️", detail: "Taking money out of your account." },
              { label: "Savings account", icon: "📒", detail: "A bank account for money you want to keep and grow." },
              { label: "Loans", icon: "🤝", detail: "Money the bank lends to people, like a family buying a house." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each bank word to what it means.",
            pairs: [
              { left: "Deposit", right: "Putting money into your account" },
              { left: "Withdrawal", right: "Taking money out of your account" },
              { left: "Loan", right: "Money the bank lends to someone" },
              { left: "Savings account", right: "A place at the bank to keep and grow your money" },
            ],
            hint: "Deposit sounds like drop it in. Withdrawal sounds like draw it out.",
            mistakes: [{ match: "Swapped deposit and withdrawal", coach: "A deposit goes in, like dropping a coin in a jar. A withdrawal comes out." }],
            seconds: 40,
          },
          think: {
            q: "You put $20 of birthday money into your savings account. What is that called?",
            choices: ["A withdrawal", "A loan", "A deposit"],
            answer: 2,
            why: "Putting money into your account is a deposit.",
            hints: [
              "A withdrawal is taking money out. You are putting money in.",
              "A loan is money the bank lends to someone else.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A bank is a bit like a library for money. You bring your money in, the bank keeps track of it, and other people can borrow some for a while, as long as they pay it back.",
            example:
              "Emma deposits $50 into her savings account. The bank writes down that she has $50. A month later she makes a $10 withdrawal to buy a book. Now her account shows $40.",
            simpler: {
              q: "What is it called when you take money out of the bank?",
              choices: ["A deposit", "A withdrawal"],
              answer: 1,
              why: "Taking money out is a withdrawal.",
              hints: ["A deposit is putting money in. You are taking it out.", ""],
            },
          },
        },
        {
          title: "Interest: the bank pays you",
          teach:
            "When people borrow from the bank, they pay back the money plus a little extra. That extra is called interest. It is like rent for using money. The bank shares part of it with savers like you, because it is using your money. If a bank pays 5 percent a year, that means $5 for every $100 you save. Save $200, and after one year the bank pays you $10 in interest.",
          visual: {
            type: "flip",
            cards: [
              { front: "Interest", back: "Extra money paid for using someone else's money." },
              { front: "5 percent", back: "$5 for every $100." },
              { front: "$200 at 5 percent for one year", back: "$5 + $5 = $10 in interest." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your bank pays $5 for every $100 you save each year. You save $300. How many dollars of interest do you earn after one year?",
            answer: 15,
            unit: "$",
            hint: "How many hundreds are in $300? You earn $5 for each one.",
            mistakes: [
              { match: "5", coach: "That is for just $100. You have three hundreds, so earn $5 three times." },
              { match: "305", coach: "You added $5 to $300. You earn $5 for each $100, and there are three hundreds." },
              { match: "315", coach: "That is how much you have in all. The question asks only for the interest." },
            ],
            seconds: 30,
          },
          think: {
            q: "Why does a bank pay you interest?",
            choices: [
              "Because it is using your money to make loans",
              "Because it prints extra money for savers",
              "Because savers have to do chores for the bank",
            ],
            answer: 0,
            why: "The bank lends your money to borrowers who pay interest, and it shares part of that with you.",
            hints: [
              "",
              "Banks do not print money. Think about who pays the bank extra.",
              "You do not work for the bank. What does the bank do with your money?",
            ],
          },
          approaches: {
            analogy:
              "Imagine you lend your bike to a neighbor for the summer, and they give you $5 as a thank you. Interest is like that thank you, but for lending money.",
            example:
              "Jack has $100 in a savings account that pays 5 percent a year. The bank lends money to a baker, who pays the bank interest. At the end of the year the bank pays Jack $5. Now he has $105.",
            simpler: {
              q: "A bank pays $5 for every $100. You save $100. How much interest do you earn in one year?",
              choices: ["$5", "$100", "$105"],
              answer: 0,
              why: "You have one $100, so you earn one $5.",
              hints: ["", "That is how much you saved, not the extra.", "That is your total, savings plus interest. The interest is only the extra part."],
            },
          },
        },
        {
          title: "Interest on your interest",
          teach:
            "Here is the magic part. If you leave your interest in the bank, next year you earn interest on it too. Your money grows a little faster every year, like a snowball rolling downhill and picking up more snow. This is called compound interest. Try the sliders. Start with $100 at 10 percent. Real banks usually pay less, but this makes the growth easy to see. The longer you wait, the faster it grows.",
          visual: { type: "compound", principal: 100, rate: 10, years: 10 },
          probe: {
            type: "target",
            prompt: "Use the sliders. A pretend bank pays 10 percent a year. How many years until $100 grows to at least $200?",
            goal: { sim: "compound", principal: 100, rate: 10, target: 200 },
            hint: "Slide the years up one at a time and watch the total. Stop at the first year it reaches $200.",
            mistakes: [{ match: "10", coach: "With simple interest it would take 10 years. Interest on interest gets you there sooner." }],
            seconds: 60,
          },
          think: {
            q: "Why does money in a savings account grow faster each year?",
            choices: [
              "Because you earn interest on your interest",
              "Because the bank adds the same $5 forever no matter what",
              "Because you have to deposit more every day",
            ],
            answer: 0,
            why: "Each year's interest gets added to your money, so next year you earn interest on a bigger amount.",
            hints: [
              "",
              "If it were always the same $5, it would not grow faster. What gets added each year?",
              "Adding more helps, but even without new deposits the growth speeds up. Why?",
            ],
          },
          approaches: {
            analogy:
              "Compound interest is like a snowball rolling downhill. As it gets bigger, it picks up more snow with each roll, so it grows faster and faster.",
            example:
              "Sofia saves $100 at 10 percent. After year 1 she has $110. In year 2 she earns 10 percent of $110, which is $11, so she has $121. She earned $1 more than the first year without adding anything.",
            simpler: {
              q: "You have $100 and earn $10 in interest. You leave it in the bank. How much do you have now?",
              choices: ["$100", "$110", "$10"],
              answer: 1,
              why: "Your $100 plus $10 interest is $110, and next year you earn interest on all of it.",
              hints: ["You forgot to add the interest.", "", "That is just the interest. Add it to your $100."],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps in order to show how your savings grow at a bank.",
        steps: [
          "You deposit $100 in a savings account",
          "The bank lends some money to a baker opening a shop",
          "The baker pays the bank back with interest",
          "The bank pays you part of that interest",
          "Your account grows to more than $100",
        ],
      },
      explain: {
        prompt: "Explain to a friend why money in a bank savings account can grow, but money in a piggy bank does not.",
        keyPoints: [
          "The bank lends money to borrowers",
          "Borrowers pay extra called interest",
          "The bank pays savers interest for using their money",
          "You earn interest on your interest over time",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A bank pays $5 for every $100 each year. You save $400. How many dollars of interest do you earn in one year?",
          answer: 20,
          unit: "$",
          hint: "Count the hundreds in $400, then earn $5 for each one.",
          mistakes: [
            { match: "5", coach: "That is for just one $100. You have four hundreds." },
            { match: "420", coach: "That is your total. The question asks only for the interest." },
            { match: "405", coach: "You earn $5 for each $100, and there are four hundreds." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "Putting money into a bank account is a {0}. Taking it out is a {1}. The extra money a bank pays you is called {2}.",
          blanks: [{ answers: ["deposit"] }, { answers: ["withdrawal"] }, { answers: ["interest"] }],
          bank: ["deposit", "withdrawal", "interest", "loan", "allowance"],
          hint: "Deposit goes in, withdrawal comes out. What is the extra money called?",
          mistakes: [
            { match: "loan", coach: "A loan is money the bank lends to someone. Which word means putting money in?" },
            { match: "allowance", coach: "An allowance comes from family. What does the bank pay you?" },
          ],
          seconds: 35,
        },
        {
          type: "target",
          prompt: "Use the sliders. A pretend bank pays 10 percent a year. How many years until $100 grows to at least $150?",
          goal: { sim: "compound", principal: 100, rate: 10, target: 150 },
          hint: "Move the years slider one step at a time. Stop at the first year the total reaches $150.",
          seconds: 60,
        },
        {
          type: "match",
          prompt: "Match each place to what happens to $100 left there for a year.",
          pairs: [
            { left: "Piggy bank", right: "Still exactly $100" },
            { left: "Savings account paying 5 percent", right: "Grows to $105" },
            { left: "Savings account paying 10 percent", right: "Grows to $110" },
          ],
          hint: "A piggy bank does not pay interest. For the bank, 5 percent is $5 for every $100.",
          mistakes: [{ match: "Matched piggy bank to a bigger amount", coach: "A piggy bank just holds your money. Nobody pays you interest there." }],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "What is it called when you take money out of your bank account?",
          choices: ["A deposit", "Interest", "A loan", "A withdrawal"],
          answer: 3,
          why: "Taking money out is a withdrawal.",
        },
        {
          q: "A bank pays $5 for every $100 each year. You save $200. How much interest do you earn in one year?",
          choices: ["$5", "$10", "$205", "$100"],
          answer: 1,
          why: "There are two hundreds in $200, so you earn $5 two times: $10.",
        },
        {
          q: "Where does the bank get the money to pay you interest?",
          choices: [
            "From borrowers who pay interest on their loans",
            "From a magic money tree",
            "From your piggy bank",
          ],
          answer: 0,
          why: "Borrowers pay the bank interest, and the bank shares part of it with savers.",
        },
        {
          q: "What is compound interest?",
          choices: [
            "Interest you pay to a store",
            "Earning interest on your interest",
            "Money that stays the same forever",
          ],
          answer: 1,
          why: "With compound interest, each year's interest is added on, so you earn interest on a bigger amount.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, look up the interest rate on a real savings account, on a bank's website or by asking at a bank. Write down the rate. Then figure out about how much interest $100 would earn in one year at that rate, and compare it with keeping $100 in a piggy bank.",
        rubric: [
          "Finds and writes down a real savings interest rate with a parent",
          "Estimates the interest on $100 for one year",
          "Explains why the bank account grows and the piggy bank does not",
        ],
      },
    },
  ],
};
