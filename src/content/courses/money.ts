import type { Course } from "./types";

const p = (...paras: string[]) => paras.join("\n\n");

export const money: Course = {
  id: "money",
  title: "Money & Personal Finance",
  icon: "💰",
  hue: 140,
  track: "life",
  subject: "Math",
  blurb:
    "Earn it, save it, grow it, and borrow wisely. Real math for real money decisions you will make for the rest of your life.",
  teacher: {
    name: "Ben the Banker",
    avatar: "🎩",
    inspiredBy: "Benjamin Franklin, printer, inventor and saver",
    voice:
      "Practical, witty, loves proverbs; connects everything to real decisions with real money.",
  },
  lessons: [
    {
      id: "money.earning",
      title: "Earning Money",
      minutes: 25,
      stage: "grammar",
      read: p(
        `Money does not grow on trees, but it does grow from work. When you do something useful for another person, like mowing a lawn, watching a pet, or fixing a squeaky bike, you create value. Value means the person is better off because of what you did, and they are willing to pay you for it. Money is simply the way people trade value with each other.`,
        `There are two common ways to get paid. A wage is pay by the hour. If you earn $12 an hour and work 6 hours, you earn 12 x 6 = $72. Per-job pay means you get a set price for finishing a task, no matter how long it takes. If you charge $24 to mow a lawn and it takes you 1.5 hours, you really earned 24 / 1.5 = $16 an hour. If you get faster and finish in 1 hour, the same job now pays $24 an hour. With per-job pay, working smarter raises your hourly rate.`,
        `Why do some people earn more than others? Usually it is because they have skills that are hard to find. Anyone can carry boxes, but fewer people can wire a house or write computer code, so those skills pay more. Every skill you learn makes your time worth more.`,
        `Here is a true-to-life example. Twelve-year-old Leo started washing neighbors' cars for $10 each. He noticed people asked about cleaning the insides too, so he watched videos, practiced on his family's van, and offered a full detail for $35. Same customers, same Saturday, but more skill meant more pay.`,
        `Benjamin Franklin wrote in Poor Richard's Almanack, "Diligence is the mother of good luck." People who show up, work hard, and keep learning tend to find that "luck" follows them.`
      ),
      keyIdeas: [
        "Work creates value, and money is how people trade value.",
        "Hourly pay = rate x hours; per-job pay rewards working faster and better.",
        "Skills that are useful and rare raise what your time is worth.",
      ],
      hook: {
        text: "Leo washed cars for $10 each. A month later the same neighbors were paying him $35 on the same Saturday mornings. He did not raise his prices out of nowhere and he did not get lucky. So what changed?",
      },
      teach: [
        {
          title: "Work creates value",
          teach:
            "Think about the last time someone helped you in a way that really mattered, like a friend lending you a charger when your phone was at 2 percent. You were better off because of what they did. That is value. When you do something useful for another person, like walking their dog while they are at work, you create value for them. If your help is worth more to them than the money, they are happy to pay. Money is just the tool people use to trade value back and forth. So the secret to earning is not asking for money. It is finding ways to make people better off.",
          visual: {
            type: "flip",
            cards: [
              { front: "Value", back: "How much better off someone is because of what you did for them." },
              { front: "Wage", back: "Pay for each hour you work." },
              { front: "Per-job pay", back: "A set price for finishing a task, no matter how long it takes." },
              { front: "Skill", back: "Something you have learned to do well. Rare, useful skills raise your pay." },
            ],
          },
          think: {
            q: "Why would a busy neighbor gladly pay you $15 to walk their dog?",
            choices: [
              "Because kids deserve money for trying hard",
              "Because a walked, happy dog and a free hour are worth more to them than $15",
              "Because paying people is required by law",
              "Because dogs cost a lot of money",
            ],
            answer: 1,
            why: "People pay when what they get is worth more to them than what they give up. You are trading your time and effort for their money.",
            hints: [
              "Effort matters, but people pay for results that help them, not for effort alone. What does the neighbor actually get?",
              "",
              "Nobody has to hire you. Think about why they would choose to.",
              "Dogs can be expensive, but that does not explain why they would pay you. Focus on what your walk does for them.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a lunchroom trade. You give your friend an apple and they give you cookies, and both of you walk away happier. Money works the same way, just with dollars standing in for the cookies. A trade happens when both sides think they are getting a good deal.",
            example:
              "Mrs. Lopez works until 6 and her dog gets restless. You walk him for 30 minutes and charge $8. To her, a calm dog and not rushing home is worth at least $10, so she happily pays $8. She gained value, and you earned $8. Both sides win.",
            simpler: {
              q: "Which of these creates value for someone else?",
              choices: [
                "Playing a video game alone",
                "Raking a neighbor's leaves",
                "Sleeping in on Saturday",
              ],
              answer: 1,
              why: "Raking leaves saves your neighbor time and work, so they are better off.",
              hints: [
                "Gaming can be fun for you, but does it help anyone else?",
                "",
                "Rest is good for you, but it does not make anyone else better off.",
              ],
            },
          },
        },
        {
          title: "Hourly pay: rate times hours",
          teach:
            "The most common way to get paid is a wage, which is pay by the hour. The math is one step: multiply your hourly rate by the number of hours you work. At $12 an hour for 6 hours, you earn 12 x 6 = $72. Hourly pay is steady and easy to predict. If you work longer, you earn more. But notice something: getting faster does not help you here. If you finish the job early, you simply work fewer hours and earn less. Hourly pay rewards your time. Keep that in mind, because the next kind of pay rewards something different.",
          visual: {
            type: "compare",
            left: {
              title: "Hourly pay",
              points: ["Pay = rate x hours", "Easy to predict", "Working longer earns more", "Working faster does not earn more"],
            },
            right: {
              title: "Per-job pay",
              points: ["One set price per task", "Hours can change", "Working faster raises your hourly rate", "Rewards skill and speed"],
            },
          },
          think: {
            q: "You earn $9 an hour and work 5 hours. How much do you earn?",
            choices: ["$14", "$54", "$45", "$95"],
            answer: 2,
            why: "Hourly pay is rate times hours: 9 x 5 = $45.",
            hints: [
              "You added 9 + 5. Hourly pay multiplies, because you earn $9 again for every one of the 5 hours.",
              "Close! Double-check your times table: 9 x 6 is 54, but you worked 5 hours.",
              "",
              "That looks like the digits 9 and 5 stuck together. Try multiplying 9 by 5 instead.",
            ],
          },
          approaches: {
            analogy:
              "Hourly pay is like a meter in a taxi. Every hour that ticks by adds the same amount to the total. Stop the clock, and the money stops too.",
            example:
              "Mia helps at a bakery for $11 an hour. On Saturday she works 4 hours: 11 x 4 = $44. On Sunday she works 3 hours: 11 x 3 = $33. Her weekend total is 44 + 33 = $77.",
            simpler: {
              q: "You earn $10 an hour and work 2 hours. How much do you earn?",
              choices: ["$12", "$20", "$102"],
              answer: 1,
              why: "$10 for the first hour plus $10 for the second hour is $20, which is 10 x 2.",
              hints: [
                "You added the hours to the rate. You get paid $10 for each hour, so count $10 twice.",
                "",
                "That is the digits written side by side. You earn $10 one time for each hour.",
              ],
            },
          },
        },
        {
          title: "Per-job pay and your real hourly rate",
          teach:
            "With per-job pay, you charge one price for the whole task. Mowing a lawn might be $24, whether it takes you 2 hours or 1. To see how good the deal really is, find your real hourly rate: divide the price by the hours it took. At $24 for 1.5 hours, that is 24 / 1.5 = $16 an hour. Now here is the exciting part. If practice makes you faster and you finish in 1 hour, the same $24 job now pays $24 an hour. With per-job pay, every bit of skill and speed you gain goes straight into your pocket.",
          think: {
            q: "You charge $30 to wash a car. It takes you 2 hours at first. Later you finish in 1.5 hours. What is your new real hourly rate?",
            choices: ["$20 an hour", "$15 an hour", "$45 an hour", "$30 an hour"],
            answer: 0,
            why: "Divide the price by the hours: 30 / 1.5 = $20 an hour, up from 30 / 2 = $15 when you were slower.",
            hints: [
              "",
              "That was your rate when it took 2 hours. The question asks about the faster 1.5 hours.",
              "You multiplied 30 x 1.5. To find pay per hour, divide the price by the hours instead.",
              "That is the price of the whole job. Since the job takes more than one hour, each hour earns less than $30.",
            ],
          },
          approaches: {
            analogy:
              "Think of a pizza you share by the hour. If the job is one pizza and you spend 3 hours on it, each hour gets a small slice. Finish in 1 hour, and that hour gets the whole pizza. The pizza is the same size; you just cut it into fewer pieces.",
            example:
              "Jade charges $40 to clean out a garage. The first time takes 4 hours: 40 / 4 = $10 an hour. She makes a system with bins and labels, and the next garage takes 2.5 hours: 40 / 2.5 = $16 an hour. Same price, same customer type, but $6 more for every hour she works.",
            simpler: {
              q: "You get $20 for a job that takes 2 hours. How much is that per hour?",
              choices: ["$40", "$22", "$10"],
              answer: 2,
              why: "Split the $20 evenly across 2 hours: 20 / 2 = $10 an hour.",
              hints: [
                "You multiplied. The $20 is for the whole job, so split it between the 2 hours.",
                "You added the hours. Try sharing the $20 equally across 2 hours.",
                "",
              ],
            },
          },
        },
        {
          title: "Skills raise what your time is worth",
          teach:
            "Why does an electrician earn more per hour than someone handing out flyers? Both work hard. The difference is that almost anyone can hand out flyers, but few people can safely wire a house. When a skill is useful and hard to find, people will pay more for it. That is exactly what happened to Leo. Washing the outside of a car is a common skill, worth about $10. Cleaning the inside like a pro, with vacuuming, wiping, and stain removal, took practice. That rarer skill was worth $35. Every skill you learn, from cooking to coding, makes your hours more valuable.",
          visual: {
            type: "compare",
            left: {
              title: "Common skill",
              points: ["Many people can do it", "Customers have lots of choices", "Lower pay", "Example: washing the outside of a car, $10"],
            },
            right: {
              title: "Rare, useful skill",
              points: ["Few people can do it well", "Customers seek you out", "Higher pay", "Example: a full interior detail, $35"],
            },
          },
          think: {
            q: "Which plan is most likely to raise how much you can charge for your time?",
            choices: [
              "Work the same job for more hours",
              "Ask customers to pay more without changing anything",
              "Wait for luck to bring better jobs",
              "Learn a skill that customers want and few kids offer",
            ],
            answer: 3,
            why: "A useful, rare skill gives customers a reason to pay you more, so each hour is worth more.",
            hints: [
              "More hours means more total money, but each hour is worth the same. The question is about raising the value of your time.",
              "Customers might say no, since nothing new is being offered. What would give them a reason to pay more?",
              "Franklin said diligence is the mother of good luck. What could you do so better jobs come to you?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of trading cards. Common cards are everywhere, so nobody pays much for them. A rare card that everyone wants can be worth a lot. Skills work the same way: rare and wanted means valuable.",
            example:
              "Leo washed 4 cars on a Saturday at $10 each: 4 x 10 = $40. After learning to detail interiors, he did 2 full details at $35 each: 2 x 35 = $70. He did fewer cars and earned $30 more, all because of a new skill.",
            simpler: {
              q: "Which skill is rarer, so it would probably pay more?",
              choices: ["Fixing bikes", "Carrying grocery bags"],
              answer: 0,
              why: "Fixing bikes takes knowledge and practice, so fewer people can do it.",
              hints: [
                "",
                "Almost anyone can carry bags. Which one takes special know-how?",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each job offer: is it hourly pay or per-job pay?",
        buckets: ["Hourly pay", "Per-job pay"],
        items: [
          { text: "$11 for each hour of babysitting", bucket: 0 },
          { text: "$25 to mow a lawn", bucket: 1 },
          { text: "$8 an hour helping sort a neighbor's garage", bucket: 0 },
          { text: "$15 to wash one car", bucket: 1 },
          { text: "$40 to paint a fence", bucket: 1 },
          { text: "$10 an hour tutoring a younger kid in reading", bucket: 0 },
          { text: "$5 for each dog walk", bucket: 1 },
          { text: "$12 an hour helping at a bakery", bucket: 0 },
        ],
      },
      explain: {
        prompt:
          "Explain to a younger sibling how you could earn more money per hour mowing lawns without raising your price.",
        keyPoints: [
          "Per-job pay is a set price for the whole job",
          "Real hourly rate = price divided by hours",
          "Getting faster or more skilled means fewer hours, so more money per hour",
        ],
      },
      check: [
        {
          q: "You earn $10 an hour and work 4 hours. How much do you earn?",
          choices: ["$14", "$40", "$25", "$400"],
          answer: 1,
          why: "Hourly pay is rate times hours: 10 x 4 = $40.",
        },
        {
          q: "You charge $30 to clean a garage and it takes you 3 hours. What is your pay per hour?",
          choices: ["$33", "$90", "$27", "$10"],
          answer: 3,
          why: "Divide the job price by the hours: 30 / 3 = $10 an hour.",
        },
        {
          q: "Which choice pays more for a 2-hour job: $20 for the whole job, or $12 an hour?",
          choices: ["$12 an hour", "$20 for the job", "They pay the same"],
          answer: 0,
          why: "At $12 an hour for 2 hours you earn $24, which is more than $20.",
        },
        {
          q: "Why do electricians usually earn more per hour than someone handing out flyers?",
          choices: [
            "They work outdoors more",
            "Their skill is harder to learn and fewer people have it",
            "They are lucky",
            "The government picks their pay",
          ],
          answer: 1,
          why: "Skills that are useful and hard to find let workers charge more for their time.",
        },
        {
          q: "What does it mean that work creates value?",
          choices: [
            "The person you help is better off, so they will pay for it",
            "Working always makes you rich",
            "Money is printed when you work",
          ],
          answer: 0,
          why: "Value means your work makes someone better off, which is why they trade money for it.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a short plan for earning money this month. List three jobs you could do for neighbors or family, decide whether each would be hourly or per-job, set a price, and calculate how much you would earn if you did each job twice. Finish with one skill you could learn to earn more.",
        rubric: [
          "Names three realistic jobs a kid could actually do",
          "Says whether each is hourly or per-job and gives a fair price",
          "Shows correct math for doing each job twice, plus a total",
          "Names one specific skill and explains how it would raise pay",
        ],
      },
    },
    {
      id: "money.saving",
      title: "Saving and Budgeting",
      minutes: 25,
      stage: "grammar",
      read: p(
        `Once you earn money, the next question is what to do with it. The answer starts with knowing the difference between needs and wants. A need is something you must have to live and work, like food, a coat for winter, or shoes that fit. A want is something nice to have, like a new video game or a fancy drink. Wants are fine, but needs come first.`,
        `A budget is a plan that tells your money where to go before you spend it. Many adults use the 50/30/20 rule: 50 percent of take-home pay goes to needs, 30 percent to wants, and 20 percent to savings. Kids usually have parents covering most needs, so a simple kid version is spend, save, give. Try 60 percent to spend, 30 percent to save, and 10 percent to give. If you earn $40, that means $24 to spend, $12 to save, and $4 to give or share.`,
        `The smartest budgeting trick is called paying yourself first. The moment money comes in, move your savings into a separate jar or account before you buy anything. If you wait to save whatever is left over, there is usually nothing left over.`,
        `Consider Ava, who wanted a $120 bike. She earned about $40 a week pet sitting. Every Friday she put $12 into a jar labeled BIKE before spending a cent. After 10 weeks she had exactly $120, and she bought the bike with cash. Her friend, who planned to save "whatever was left," was still waiting months later.`,
        `Franklin warned, "Beware of little expenses; a small leak will sink a great ship." A $3 snack every day does not feel like much, but over 30 days it adds up to $90. Watching the small leaks is how savers build big goals.`
      ),
      keyIdeas: [
        "Needs come before wants.",
        "A budget tells money where to go: try spend 60%, save 30%, give 10%.",
        "Pay yourself first by saving the moment money comes in.",
      ],
      hook: {
        text: "A $3 snack does not feel like much. Buy one every day for a month, though, and you have spent $90, enough for a good pair of shoes. Where is your money quietly leaking?",
      },
      teach: [
        {
          title: "Needs come before wants",
          teach:
            "Before you can plan your money, you need to sort what you buy into two piles. A need is something you must have to live, stay healthy, or do your work: food, a winter coat, shoes that fit, school supplies. A want is something that makes life nicer but you could live without: a new game, a fancy drink, a third hoodie. Wants are not bad. Life would be dull without them. But needs get paid first, every time. A tricky part is that the same thing can be either. Shoes that fit are a need. A second pair of name-brand sneakers is a want.",
          visual: {
            type: "compare",
            left: {
              title: "Needs",
              points: ["Food and water", "A coat when it is cold", "Shoes that fit", "Supplies for school or work"],
            },
            right: {
              title: "Wants",
              points: ["A new video game", "A fancy smoothie", "A third hoodie", "The newest phone case"],
            },
          },
          think: {
            q: "Your only pair of shoes has a hole in the bottom. You also want a new skateboard. What should come first?",
            choices: [
              "The skateboard, because you want it more",
              "Whichever costs less",
              "Replacing the shoes, because they are a need",
            ],
            answer: 2,
            why: "Shoes that work are a need. Once the need is covered, you can save for the skateboard.",
            hints: [
              "Wanting something a lot does not make it a need. What would happen if you skipped each one?",
              "Price is worth checking, but it does not decide what is a need. Which one do you actually have to have?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of a video game character. Health has to be refilled before you buy a cool new costume. The costume is fun, but without health you cannot keep playing. Needs are your health bar; wants are the costumes.",
            example:
              "Noah has $50. He needs new gym shoes for school that cost $35, and he wants a $25 game. If he buys the game first, he has only $25 left, not enough for the shoes. If he buys the shoes first, he has $15 left and can save $10 more for the game.",
            simpler: {
              q: "Which one is a need?",
              choices: ["A new video game", "Lunch to eat"],
              answer: 1,
              why: "You need food to stay healthy. A game is nice, but you can live without it.",
              hints: [
                "Games are fun, but could you get through the day without one?",
                "",
              ],
            },
          },
        },
        {
          title: "A budget tells money where to go",
          teach:
            "A budget is a plan you make before you spend, so your money goes where you decide instead of disappearing. For kids, a simple plan is spend, save, give. Try 60 percent to spend, 30 percent to save, and 10 percent to give. To find each amount, turn the percent into a decimal and multiply. If you earn $40: spend 0.60 x 40 = $24, save 0.30 x 40 = $12, give 0.10 x 40 = $4. Check that they add back up: 24 + 12 + 4 = $40. Try moving the sliders to see how changing the plan changes each pile.",
          visual: {
            type: "budget",
            income: 40,
            categories: [
              { label: "Spend", pct: 60 },
              { label: "Save", pct: 30 },
              { label: "Give", pct: 10 },
            ],
          },
          think: {
            q: "You earn $60. Using spend 60%, save 30%, give 10%, how much do you save?",
            choices: ["$30", "$6", "$36", "$18"],
            answer: 3,
            why: "Save is 30 percent: 0.30 x 60 = $18.",
            hints: [
              "That treats 30 percent as $30. Percent means out of 100, so find 30 percent of $60 instead.",
              "That is the give amount, 10 percent. Saving is 30 percent.",
              "That is the spend amount, 60 percent. Look for the save slice.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A budget is like a lunch tray with sections. Before the food arrives, you already know where the main dish, the fruit, and the dessert go. Money that arrives already has a spot waiting for it, so nothing spills.",
            example:
              "Priya earns $50 babysitting. Spend: 0.60 x 50 = $30. Save: 0.30 x 50 = $15. Give: 0.10 x 50 = $5. Total: 30 + 15 + 5 = $50, so every dollar has a job.",
            simpler: {
              q: "What is 10 percent of $40?",
              choices: ["$10", "$4", "$40"],
              answer: 1,
              why: "10 percent means 10 out of every 100, which is one tenth. One tenth of $40 is $4.",
              hints: [
                "10 percent is not the same as $10. Ten percent means one tenth of the amount.",
                "",
                "That is all of the money. 10 percent is just a small slice, one tenth.",
              ],
            },
          },
        },
        {
          title: "The adult version: 50/30/20",
          teach:
            "Adults have to cover their own needs, like rent, groceries, and electricity, so their budget looks different. A popular plan is the 50/30/20 rule. Take-home pay is the money left after taxes. Half of it, 50 percent, goes to needs. Then 30 percent goes to wants, and 20 percent goes to savings. On $3,000 of take-home pay a month, that is $1,500 for needs, $900 for wants, and $600 for savings. You will use this someday. For now, notice the pattern both plans share: savings get a real slice that is planned on purpose, not leftover crumbs.",
          visual: {
            type: "budget",
            income: 3000,
            categories: [
              { label: "Needs", pct: 50 },
              { label: "Wants", pct: 30 },
              { label: "Savings", pct: 20 },
            ],
          },
          think: {
            q: "An adult takes home $2,000 a month. Using 50/30/20, how much goes to savings?",
            choices: ["$400", "$1,000", "$600", "$20"],
            answer: 0,
            why: "Savings is 20 percent: 0.20 x 2,000 = $400.",
            hints: [
              "",
              "That is the needs slice, 50 percent. Savings is the 20 percent slice.",
              "That is the wants slice, 30 percent. Look for the 20 percent part.",
              "20 percent does not mean $20. Find 20 out of every 100 dollars.",
            ],
          },
          approaches: {
            analogy:
              "Picture cutting a pizza into 10 slices. Five slices go to needs, three to wants, and two to savings. No matter how big the pizza is, the slices keep the same shares.",
            example:
              "Marcus takes home $2,400 a month. Needs: 0.50 x 2,400 = $1,200. Wants: 0.30 x 2,400 = $720. Savings: 0.20 x 2,400 = $480. Check: 1,200 + 720 + 480 = $2,400.",
            simpler: {
              q: "In the 50/30/20 rule, which number is for needs?",
              choices: ["20", "30", "50"],
              answer: 2,
              why: "Needs get the biggest share, 50 percent, because they must be paid.",
              hints: [
                "20 is the savings slice. Needs are the most important, so they get the biggest share.",
                "30 goes to wants. Which share is biggest?",
                "",
              ],
            },
          },
        },
        {
          title: "Pay yourself first",
          teach:
            "Here is the single best trick savers know. The moment money comes in, move your savings into a separate jar or account before you buy anything. That is called paying yourself first. Why does it work? Because if you plan to save whatever is left over, there is almost never anything left over. Little purchases nibble it away. Ava wanted a $120 bike. Every Friday she put $12 into a jar labeled BIKE before spending a cent. To find how long a goal takes, divide the goal by what you save each week: 120 / 12 = 10 weeks.",
          visual: {
            type: "compare",
            left: {
              title: "Pay yourself first",
              points: ["Save the moment money arrives", "Savings happen every time", "Spend what is left with no guilt", "Ava: bike in 10 weeks"],
            },
            right: {
              title: "Save what is left",
              points: ["Spend first, save later", "Small buys eat the leftovers", "Often nothing gets saved", "Ava's friend: still waiting"],
            },
          },
          think: {
            q: "You save $8 every week before spending. How many weeks until you reach $96?",
            choices: ["8 weeks", "88 weeks", "12 weeks", "104 weeks"],
            answer: 2,
            why: "Divide the goal by the weekly savings: 96 / 8 = 12 weeks.",
            hints: [
              "That is how much you save each week, not how many weeks. Try dividing the goal by $8.",
              "That came from subtracting 8 from 96. You need to know how many groups of $8 fit into $96.",
              "",
              "That came from adding. Count how many $8 deposits it takes to build up to $96.",
            ],
          },
          approaches: {
            analogy:
              "Paying yourself first is like taking your piece of birthday cake before the plate gets passed around the table. If you wait until everyone else has had theirs, the plate often comes back empty.",
            example:
              "Liam earns $30 a week. He moves $9 into savings right away and keeps $21 to spend. His goal is a $90 pair of headphones: 90 / 9 = 10 weeks. Saving leftovers, he usually ended the week with about $2, which would have taken 45 weeks.",
            simpler: {
              q: "You save $5 a week. How much have you saved after 4 weeks?",
              choices: ["$9", "$20", "$54"],
              answer: 1,
              why: "Four deposits of $5 make 5 x 4 = $20.",
              hints: [
                "You added 5 and 4. You put in $5 four separate times.",
                "",
                "That is the numbers written side by side. Count $5, $10, $15...",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each item: is it a need or a want?",
        buckets: ["Need", "Want"],
        items: [
          { text: "Groceries for the week", bucket: 0 },
          { text: "A winter coat when you do not own one", bucket: 0 },
          { text: "Shoes that fit your growing feet", bucket: 0 },
          { text: "Notebooks and pencils for school", bucket: 0 },
          { text: "A new skin in a video game", bucket: 1 },
          { text: "A $6 iced drink from a cafe", bucket: 1 },
          { text: "A third hoodie in a new color", bucket: 1 },
          { text: "Concert tickets", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain to a younger sibling how to save up for something they want, and why paying yourself first works better than saving whatever is left.",
        keyPoints: [
          "Needs come before wants",
          "Split money with a plan, like spend, save, give",
          "Move savings aside first, before spending, because leftovers usually disappear",
          "Weeks to a goal = goal divided by weekly savings",
        ],
      },
      check: [
        {
          q: "Which of these is a need?",
          choices: [
            "A second pair of name-brand sneakers",
            "A new phone case",
            "A warm coat when you do not own one and it is winter",
            "Concert tickets",
          ],
          answer: 2,
          why: "A coat in winter protects your health, so it is a need; the others are wants.",
        },
        {
          q: "Using spend 60%, save 30%, give 10%, how much do you save from $50?",
          choices: ["$5", "$30", "$20", "$15"],
          answer: 3,
          why: "30 percent of $50 is 0.30 x 50 = $15.",
        },
        {
          q: "What does paying yourself first mean?",
          choices: [
            "Setting aside savings before you spend anything",
            "Buying yourself a treat every payday",
            "Charging higher prices for your work",
          ],
          answer: 0,
          why: "Paying yourself first means saving comes out right away, before spending.",
        },
        {
          q: "You save $8 every week. How many weeks until you reach $96?",
          choices: ["8 weeks", "12 weeks", "10 weeks", "16 weeks"],
          answer: 1,
          why: "Divide the goal by the weekly savings: 96 / 8 = 12 weeks.",
        },
        {
          q: "In the adult 50/30/20 rule, what does the 20 percent go to?",
          choices: ["Wants", "Needs", "Savings"],
          answer: 2,
          why: "The rule puts 50 percent to needs, 30 percent to wants, and 20 percent to savings.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Pick something you want that costs real money. Write a savings plan: how much it costs, how much you can earn each week, how you will split that money into spend, save, and give, and how many weeks it will take to reach your goal. End with one small expense you could cut to get there faster.",
        rubric: [
          "States a specific goal and its real price",
          "Splits weekly money into spend, save, and give with amounts that add up",
          "Correctly calculates the number of weeks to reach the goal",
          "Names one small expense to cut and how much it would save",
        ],
      },
    },
    {
      id: "money.interest",
      title: "Interest and Compounding",
      minutes: 30,
      stage: "logic",
      read: p(
        `When you put money in a savings account, the bank pays you for letting it use your money. That payment is called interest, and it is usually a percentage of what you have saved each year.`,
        `Simple interest is paid only on the money you first put in, called the principal. Put $1,000 in an account paying 5 percent simple interest, and you earn $50 every year. After 3 years you have $1,000 + $150 = $1,150.`,
        `Compound interest is more powerful because you earn interest on your interest too. Start with the same $1,000 at 5 percent, compounded once a year. Year 1: $1,000 x 1.05 = $1,050. Year 2: $1,050 x 1.05 = $1,102.50. Year 3: $1,102.50 x 1.05 = about $1,157.63. That is $7.63 more than simple interest. It seems small at first, but the gap grows every year, like a snowball rolling downhill and picking up more snow.`,
        `There is a handy shortcut called the rule of 72. Divide 72 by the yearly interest rate, and you get roughly how many years it takes your money to double. At 6 percent, 72 / 6 = 12 years. At 9 percent, 72 / 9 = 8 years. It is an estimate, but a very good one for everyday rates.`,
        `Benjamin Franklin believed in compounding so much that he tested it after his death. In his will he left 1,000 pounds each to Boston and Philadelphia, to be lent out at interest to young tradesmen for about 200 years. By the time the funds were finally paid out in the 1990s, they had grown to millions of dollars.`,
        `The lesson for you is simple: time is the secret ingredient. Money saved at age 12 has decades to double and double again. Starting early beats starting big.`
      ),
      keyIdeas: [
        "Simple interest is paid only on the principal.",
        "Compound interest pays interest on interest, so growth speeds up over time.",
        "Rule of 72: 72 divided by the rate is about how many years to double.",
      ],
      hook: {
        text: "When Benjamin Franklin died, he left 1,000 pounds each to Boston and Philadelphia with one strange rule: do not spend it for about 200 years. By the 1990s, those gifts had grown into millions of dollars. Nobody added more money. So how did it grow?",
        visual: { type: "compound", principal: 1000, rate: 5, years: 50 },
      },
      teach: [
        {
          title: "Interest: getting paid to save",
          teach:
            "When you put money in a savings account, the bank does not just let it sit in a vault. It lends that money to other people and charges them for it. Part of what the bank earns comes back to you as a thank-you for letting it use your money. That payment is called interest. The money you put in is called the principal. The interest rate is a percent that tells you how much you earn each year. At 4 percent a year, every $100 earns $4. On $500, you earn 0.04 x 500 = $20 in one year, just for leaving it alone.",
          visual: {
            type: "flip",
            cards: [
              { front: "Interest", back: "Money a bank pays you for letting it use your savings (or that you pay when you borrow)." },
              { front: "Principal", back: "The money you first put in." },
              { front: "Interest rate", back: "The percent you earn each year, like 4 percent." },
              { front: "Balance", back: "How much is in your account right now, principal plus any interest added." },
            ],
          },
          think: {
            q: "You put $500 in a savings account that pays 4 percent a year. How much interest do you earn in one year?",
            choices: ["$4", "$20", "$504", "$200"],
            answer: 1,
            why: "4 percent of $500 is 0.04 x 500 = $20.",
            hints: [
              "That is what $100 would earn. You saved $500, which is five hundreds.",
              "",
              "You added 4 to 500. The 4 is a percent, so find 4 out of every 100 dollars.",
              "That would be 40 percent. Check your decimal: 4 percent is 0.04, not 0.4.",
            ],
          },
          approaches: {
            analogy:
              "Interest is like rent for your money. If a neighbor borrows your bike for the summer and gives you a few dollars for it, that is rent. The bank borrows your dollars and pays you rent, called interest.",
            example:
              "Sofia deposits $300 at 3 percent a year. Interest for one year is 0.03 x 300 = $9. At the end of the year her balance is 300 + 9 = $309.",
            simpler: {
              q: "At 5 percent interest, how much does $100 earn in one year?",
              choices: ["$5", "$50", "$105"],
              answer: 0,
              why: "5 percent means $5 for every $100.",
              hints: [
                "",
                "That would be 50 percent. Percent means per hundred, so 5 percent of $100 is just $5.",
                "That is the new balance, principal plus interest. The question asks only for the interest.",
              ],
            },
          },
        },
        {
          title: "Simple interest: the same amount every year",
          teach:
            "With simple interest, you earn interest only on your original principal. The amount never changes from year to year. Put $1,000 in at 5 percent simple interest, and you earn $50 every single year. After 3 years: 50 x 3 = $150 of interest, so your balance is $1,000 + $150 = $1,150. A quick way to think about it: simple interest grows in a straight line, like climbing stairs that are all the same height. Find one year's interest, multiply by the number of years, then add it to the principal. Watch the simple-interest line in the simulator climb at a steady slope.",
          visual: { type: "compound", principal: 1000, rate: 5, years: 3 },
          think: {
            q: "You save $400 at 5 percent simple interest for 3 years. What is your balance at the end?",
            choices: ["$420", "$460", "$60", "$415"],
            answer: 1,
            why: "One year's interest is 0.05 x 400 = $20. Three years is 20 x 3 = $60. Balance: 400 + 60 = $460.",
            hints: [
              "That is only one year of interest added. Simple interest pays $20 every year, and there are 3 years.",
              "",
              "That is the interest alone. The question asks for the whole balance, so add the principal back.",
              "You added the 5 percent and 3 years as dollars. First find $20 for one year, then times 3.",
            ],
          },
          approaches: {
            analogy:
              "Simple interest is like a weekly allowance that never changes. You get the same $5 every week, no matter how much you already have in your piggy bank.",
            example:
              "Owen saves $200 at 6 percent simple interest. One year earns 0.06 x 200 = $12. Over 4 years he earns 12 x 4 = $48, so his balance is 200 + 48 = $248.",
            simpler: {
              q: "You earn $10 of simple interest each year. How much interest after 3 years?",
              choices: ["$13", "$30", "$10"],
              answer: 1,
              why: "Simple interest is the same each year: 10 x 3 = $30.",
              hints: [
                "You added 10 and 3. You get $10 three separate times.",
                "",
                "That is only one year. You keep getting $10 every year.",
              ],
            },
          },
        },
        {
          title: "Compound interest: interest on your interest",
          teach:
            "Compound interest is where things get exciting. Each year, the interest you earned gets added to your balance, and next year you earn interest on that bigger balance. Start with $1,000 at 5 percent. Year 1: 1,000 x 1.05 = $1,050. Year 2: 1,050 x 1.05 = $1,102.50. Year 3: 1,102.50 x 1.05 = about $1,157.63. Why multiply by 1.05? It keeps the whole balance (the 1) and adds 5 percent (the 0.05) in one step. After 3 years, compounding is only $7.63 ahead of simple interest. But slide the years higher and watch the gap explode.",
          visual: { type: "compound", principal: 1000, rate: 5, years: 30 },
          think: {
            q: "You save $200 at 10 percent interest compounded yearly. What is your balance after 2 years?",
            choices: ["$240", "$220", "$420", "$242"],
            answer: 3,
            why: "Year 1: 200 x 1.10 = $220. Year 2: 220 x 1.10 = $242. The extra $2 is interest earned on year 1's interest.",
            hints: [
              "That is simple interest, $20 each year. With compounding, year 2's interest is figured on $220, not $200.",
              "That is only after 1 year. Do the multiplication one more time for year 2.",
              "You may have added the year 1 balance to the principal. Each year, just multiply the current balance by 1.10.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Compound interest is like a snowball rolling downhill. A small ball picks up a little snow. The bigger it gets, the more snow it grabs with every roll, so it grows faster and faster.",
            example:
              "Grace saves $1,000 at 10 percent. Simple interest would give her $100 a year, so $1,300 after 3 years. With compounding: 1,000 x 1.10 = $1,100, then 1,100 x 1.10 = $1,210, then 1,210 x 1.10 = $1,331. She ends up $31 ahead, and that lead grows every year.",
            simpler: {
              q: "Your balance is $110 and you earn 10 percent interest. How much interest do you earn this year?",
              choices: ["$10", "$11", "$121"],
              answer: 1,
              why: "Interest is figured on the whole balance: 0.10 x 110 = $11.",
              hints: [
                "That is 10 percent of $100. With compounding, interest is figured on your whole current balance of $110.",
                "",
                "That is the new balance after adding interest. The question asks only for the interest.",
              ],
            },
          },
        },
        {
          title: "The rule of 72 and the power of time",
          teach:
            "Want a quick way to see how fast money grows? Use the rule of 72. Divide 72 by the yearly interest rate, and you get roughly how many years it takes your money to double. At 6 percent, 72 / 6 = 12 years. That means $100 becomes about $200 in 12 years, about $400 in 24 years, and about $800 in 36 years. Look at that last step: the jump from $400 to $800 is bigger than all the growth before it. This is why time is the secret ingredient. Money saved at age 12 gets more doublings than money saved at 30.",
          visual: { type: "compound", principal: 100, rate: 6, years: 36 },
          think: {
            q: "Using the rule of 72, about how many years does it take money to double at 12 percent a year?",
            choices: ["12 years", "84 years", "6 years", "60 years"],
            answer: 2,
            why: "72 / 12 = 6, so money doubles in about 6 years.",
            hints: [
              "That is the interest rate, not the years. Divide 72 by the rate.",
              "That came from adding 72 and 12. The rule says to divide.",
              "",
              "That came from subtracting. Try dividing 72 by 12 instead.",
            ],
          },
          approaches: {
            analogy:
              "Think of a lily pad that doubles every day and will cover a pond in 30 days. On day 29, the pond is only half covered. Most of the growth happens at the very end, so the longest-waiting pond wins. Your savings work the same way.",
            example:
              "Two friends each save $1,000 at 8 percent. 72 / 8 = 9, so the money doubles about every 9 years. Kai starts at 12 and leaves it until 48: that is 36 years, or 4 doublings: $2,000, $4,000, $8,000, $16,000. Dana starts at 30, so she gets 18 years, or 2 doublings: $4,000. Starting 18 years earlier gave Kai 4 times as much.",
            simpler: {
              q: "Your $50 doubles. How much do you have now?",
              choices: ["$52", "$100", "$75"],
              answer: 1,
              why: "Doubling means two times as much: 50 x 2 = $100.",
              hints: [
                "Doubling means multiplying by 2, not adding 2.",
                "",
                "That adds half. Doubling adds the whole amount again.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that shows compound growth, where interest earns interest.",
        sentences: [
          "Maya puts $500 in a savings account that pays 4 percent a year.",
          "She decides not to touch the money for a long time.",
          "In year 2, she earns 4 percent on $520, not just on her original $500.",
          "Her year 2 interest is $20.80, a little more than the first year's $20.",
          "Maya keeps her bank card in a safe drawer at home.",
          "Each year, the interest she already earned starts earning interest of its own.",
        ],
        correct: [2, 3, 5],
      },
      explain: {
        prompt:
          "Explain to a younger sibling why someone who starts saving at 12 can end up with much more than someone who starts at 30, even if they save the same amount.",
        keyPoints: [
          "Compound interest pays interest on the interest already earned",
          "Growth speeds up the longer money is left alone",
          "Rule of 72: 72 divided by the rate is about the years to double",
          "Starting earlier means more doublings",
        ],
      },
      check: [
        {
          q: "You save $200 at 10% simple interest for 2 years. How much interest do you earn?",
          choices: ["$20", "$40", "$42", "$220"],
          answer: 1,
          why: "Simple interest is $20 a year (10% of $200), so 2 years earns $40.",
        },
        {
          q: "You save $100 at 10% interest compounded yearly. How much do you have after 2 years?",
          choices: ["$120", "$110", "$121", "$200"],
          answer: 2,
          why: "Year 1: 100 x 1.10 = $110. Year 2: 110 x 1.10 = $121.",
        },
        {
          q: "Using the rule of 72, about how long does money take to double at 8% a year?",
          choices: ["9 years", "8 years", "6 years", "12 years"],
          answer: 0,
          why: "72 / 8 = 9, so it takes about 9 years to double.",
        },
        {
          q: "What makes compound interest different from simple interest?",
          choices: [
            "It is only paid by banks overseas",
            "It pays a lower rate",
            "You earn interest on the interest you already earned",
          ],
          answer: 2,
          why: "Compounding adds earned interest to your balance, so future interest is figured on a bigger amount.",
        },
        {
          q: "Why does starting to save early matter so much?",
          choices: [
            "Banks only accept young savers",
            "More years give compounding more time to grow your money",
            "Interest rates are always higher for kids",
            "Money saved early can never be spent",
          ],
          answer: 1,
          why: "Compound growth depends on time, so the earlier you start, the more doublings you get.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, look up the real interest rate on a savings account at your family's bank or a local bank. Then pick a starting amount and make a table by hand showing how it grows with yearly compounding for 5 years. Use the rule of 72 to estimate when it would double, and show your parent your table.",
        rubric: [
          "Finds a real savings interest rate with a parent",
          "Builds a 5-year compounding table with correct math for each year",
          "Uses the rule of 72 correctly to estimate doubling time",
          "Explains to a parent in their own words why starting early helps",
        ],
      },
    },
    {
      id: "money.investing",
      title: "Investing Basics",
      minutes: 30,
      stage: "logic",
      read: p(
        `Saving keeps your money safe. Investing puts your money to work so it can grow faster, but with some risk. One of the most common investments is a stock.`,
        `A stock, also called a share, is a tiny piece of ownership in a company. If a company is split into 1,000,000 shares and you own 100, you own 100 / 1,000,000 = 0.01 percent of that business. When the company earns more profit and grows, your shares can become worth more. Some companies also pay owners a share of profits called a dividend. If the company struggles, your shares can lose value, and if it fails, they can become worthless.`,
        `That is the trade-off of risk and reward. A savings account pays a small but steady return. Stocks can grow much more over many years, but they can also drop sharply in a bad year. Higher possible rewards almost always come with higher risk.`,
        `Smart investors handle risk with diversification, which means not putting all your eggs in one basket. Suppose you invest $1,000 by putting $100 into each of 10 different companies. If one company fails completely, you lose $100, which is 10 percent, not everything. Many people diversify with index funds, which hold small pieces of hundreds of companies at once.`,
        `Patience matters too. Over long stretches of history, the U.S. stock market has grown, even though it fell hard in some years. People who stayed invested for decades usually did far better than those who panicked and sold.`,
        `Finally, beware of anyone who promises fast, guaranteed riches. In 1920, a man named Charles Ponzi promised investors a 50 percent return in just 45 days. He was really paying early investors with money from newer ones, and when the new money stopped, thousands of people lost their savings. Today such frauds are still called Ponzi schemes. If it sounds too good to be true, it probably is.`
      ),
      keyIdeas: [
        "A share of stock is a small piece of ownership in a company.",
        "Higher reward comes with higher risk; diversify so one loss cannot sink you.",
        "Think long term and run from guaranteed get-rich-quick promises.",
      ],
      hook: {
        text: "In 1920, a man promised to turn every $100 into $150 in just 45 days, guaranteed. Thousands of people lined up to hand him their savings. Within months, most of that money was gone. How can you tell a real investment from a trap?",
      },
      teach: [
        {
          title: "A share is a piece of a company",
          teach:
            "Saving keeps money safe. Investing puts money to work so it can grow faster. One common investment is a stock, also called a share. A share is a tiny slice of ownership in a real company. If a company is split into 1,000,000 shares and you own 100, you own 100 / 1,000,000 = 0.01 percent of the business. That sounds small, but it means you truly own part of it. If the company earns more and grows, your shares can become worth more. Some companies also mail owners a slice of their profits, called a dividend.",
          visual: {
            type: "flip",
            cards: [
              { front: "Stock (share)", back: "A small piece of ownership in a company." },
              { front: "Dividend", back: "A share of a company's profits paid to its owners." },
              { front: "Risk", back: "The chance that an investment loses value." },
              { front: "Index fund", back: "One investment that holds small pieces of hundreds of companies at once." },
            ],
          },
          think: {
            q: "A company is split into 10,000 shares. You own 50 of them. What percent of the company do you own?",
            choices: ["50 percent", "5 percent", "0.05 percent", "0.5 percent"],
            answer: 3,
            why: "50 / 10,000 = 0.005, and 0.005 x 100 = 0.5 percent.",
            hints: [
              "That treats your 50 shares as 50 out of 100. The company has 10,000 shares, so your slice is much smaller.",
              "Close, but check the decimal. 50 / 10,000 = 0.005. Now turn that into a percent by multiplying by 100.",
              "You divided correctly but forgot to turn the decimal into a percent. Multiply 0.005 by 100.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Imagine a giant pizza cut into 10,000 thin slices. Each slice is a share. Owning 50 slices means you own a small part of the pizza, and if the pizza somehow gets bigger, your slices get bigger too.",
            example:
              "A lemonade company is split into 200 shares, and you buy 20. You own 20 / 200 = 0.10, or 10 percent. If the company earns $500 in profit and pays it all out as dividends, your share is 0.10 x 500 = $50.",
            simpler: {
              q: "A business has 10 shares and you own 1. What fraction do you own?",
              choices: ["One tenth", "One half", "All of it"],
              answer: 0,
              why: "1 share out of 10 is one tenth of the business.",
              hints: [
                "",
                "One half would be 5 shares out of 10. You have just 1.",
                "There are 10 shares, and you own only one of them.",
              ],
            },
          },
        },
        {
          title: "Risk and reward travel together",
          teach:
            "Why not just leave money in a savings account? Because savings accounts pay a small return. Stocks have grown much more over long periods. But here is the catch: stocks can also fall, sometimes sharply. A company might lose customers or make a bad decision, and its shares drop. If it fails completely, the shares can be worth nothing. This is the trade-off called risk and reward. The bigger the possible gain, the bigger the possible loss. There is no such thing as a high reward with zero risk. Remember that sentence. It will protect you for life.",
          visual: {
            type: "compare",
            left: {
              title: "Savings account",
              points: ["Small, steady growth", "Very low risk", "Good for money you need soon", "Will not make you rich fast"],
            },
            right: {
              title: "Stocks",
              points: ["Can grow much more over many years", "Can drop sharply in a bad year", "Better for money you will not need for a long time", "Higher reward comes with higher risk"],
            },
          },
          think: {
            q: "You need your money in 3 months to pay for summer camp. Where does it make most sense to keep it?",
            choices: [
              "In one exciting new company's stock",
              "In a savings account",
              "Spread across many stocks",
            ],
            answer: 1,
            why: "Money you need soon should be safe. Stocks can drop right before you need the money, with no time to recover.",
            hints: [
              "One company could grow, but it could also fall right before camp. Is that a risk you want with money you need soon?",
              "",
              "Spreading out lowers risk, but the whole market can still dip in a few months. For money needed soon, what is safest?",
            ],
          },
          approaches: {
            analogy:
              "Risk and reward are like choosing a sledding hill. The gentle hill is safe but slow. The steep hill is thrilling and fast, but you are more likely to wipe out. Nobody gets the steep hill's speed with the gentle hill's safety.",
            example:
              "You have $1,000. A savings account at 4 percent gives you about $1,040 after a year, almost certainly. A stock might end the year at $1,200, a $200 gain, or at $800, a $200 loss. The stock has a bigger possible reward and a bigger possible loss.",
            simpler: {
              q: "Which usually has more risk?",
              choices: ["A savings account", "A single company's stock"],
              answer: 1,
              why: "A single company can struggle or fail, so its stock can lose value. Savings accounts are very steady.",
              hints: [
                "Savings accounts grow slowly but are very safe. Which one could drop in value?",
                "",
              ],
            },
          },
        },
        {
          title: "Diversify: do not put all your eggs in one basket",
          teach:
            "Smart investors cannot remove risk, but they can shrink it. The tool is diversification, which means spreading money across many different investments. Suppose you invest $1,000 by putting $100 into each of 10 companies. If one fails completely, you lose $100, which is 10 percent, not everything. Meanwhile, the other nine might grow. Many people diversify the easy way with an index fund, a single investment that holds small pieces of hundreds of companies. If you own a tiny bit of everything, no single disaster can sink you.",
          visual: {
            type: "compare",
            left: {
              title: "All eggs in one basket",
              points: ["$1,000 in one company", "If it fails, you lose $1,000", "Your whole result depends on one business"],
            },
            right: {
              title: "Diversified",
              points: ["$100 in each of 10 companies", "If one fails, you lose $100", "Winners can make up for losers"],
            },
          },
          think: {
            q: "You put $100 into each of 6 companies. One fails and drops to $0. The rest stay the same. How much do you have now?",
            choices: ["$500", "$0", "$100", "$600"],
            answer: 0,
            why: "You started with 6 x 100 = $600 and lost one $100 piece, so you have $500.",
            hints: [
              "",
              "Only one company failed, not all six. That is the whole point of spreading out.",
              "That is how much you lost, not how much you have left.",
              "That is what you started with. One of the companies went to $0.",
            ],
          },
          approaches: {
            analogy:
              "If you carry a dozen eggs in one basket and trip, they all break. If you carry them in six small baskets and trip with one, you lose only two. Spreading out turns a disaster into a small setback.",
            example:
              "Jonah invests $1,000: $250 in each of 4 companies. One goes to $0, two stay at $250, and one doubles to $500. His total is 0 + 250 + 250 + 500 = $1,000. Even with a failure, he broke even, because the winner made up for the loser.",
            simpler: {
              q: "You put $50 into each of 2 companies. One fails. How much did you lose?",
              choices: ["$100", "$50", "$0"],
              answer: 1,
              why: "Only the $50 in the failed company is lost.",
              hints: [
                "That is all your money, but only one of the two companies failed.",
                "",
                "One company did fail, so you lost the money you put into it.",
              ],
            },
          },
        },
        {
          title: "Be patient and spot the traps",
          teach:
            "Over long stretches of history, the U.S. stock market has grown, even though it fell hard in some years. People who stayed invested for decades usually did far better than people who panicked and sold during a drop. Patience is a big part of investing. So is spotting traps. In 1920, Charles Ponzi promised a 50 percent return in 45 days. He was really paying early investors with money from newer ones. When new money stopped coming in, the whole thing collapsed. Big promises, guarantees, and pressure to hurry are warning signs. If it sounds too good to be true, it probably is.",
          visual: {
            type: "compare",
            left: {
              title: "Honest investment",
              points: ["Explains the risks clearly", "No guarantee of big returns", "Grows over years, not weeks", "No pressure to decide today"],
            },
            right: {
              title: "Red flags",
              points: ["Guaranteed huge returns", "Says there is no risk", "Fast riches in days or weeks", "Hurry, the deal ends soon"],
            },
          },
          think: {
            q: "Which offer is the biggest red flag?",
            choices: [
              "An index fund that warns its value can go down",
              "A savings account paying 4 percent a year",
              "A stock that grew a lot over 20 years but dropped in some years",
              "A guaranteed 30 percent return every month with no risk",
            ],
            answer: 3,
            why: "No honest investment can promise huge returns with no risk. That is the classic sign of a scam.",
            hints: [
              "A warning about risk is actually a sign of honesty. Look for the offer that promises too much.",
              "4 percent a year is a normal, modest return. Which offer sounds too good to be true?",
              "Ups and downs over many years are normal for real investments. Which one promises no downs at all?",
              "",
            ],
          },
          approaches: {
            analogy:
              "A Ponzi scheme is like a game of musical chairs where chairs keep disappearing. While the music plays and new people keep joining, everyone seems fine. When the music stops, most people are left with nothing.",
            example:
              "Suppose a scammer takes $100 each from 10 people, collecting $1,000. To pay 50 percent returns, he owes each early investor $150. He collected $1,000 but owes 10 x 150 = $1,500, so he must find 5 new investors at $100 each just to cover the gap. Now he owes those 5 people $150 each, too. The amount he needs keeps growing until it collapses.",
            simpler: {
              q: "Someone says, 'Give me $20 and I guarantee you $200 next week.' What should you think?",
              choices: [
                "Great deal, sign up fast",
                "That sounds too good to be true",
              ],
              answer: 1,
              why: "Turning $20 into $200 in a week, guaranteed, is not how real investing works.",
              hints: [
                "Ask yourself how anyone could honestly promise 10 times your money in a week.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of a Ponzi scheme in the order they happen.",
        steps: [
          "A promoter promises huge, guaranteed returns in a short time.",
          "Early investors hand over their money.",
          "The promoter pays early investors using money from newer investors.",
          "Early investors brag about their profits, and many more people join.",
          "New money slows down, and there is not enough to pay everyone.",
          "The scheme collapses, and most investors lose their savings.",
        ],
      },
      explain: {
        prompt:
          "Explain to a younger sibling what it means to own a share of stock, and why spreading money across many companies is safer than putting it all in one.",
        keyPoints: [
          "A share is a small piece of ownership in a company",
          "Higher possible reward comes with higher risk",
          "Diversifying means one failure cannot wipe you out",
          "Guaranteed fast riches are a red flag",
        ],
      },
      check: [
        {
          q: "What do you own when you buy a share of stock?",
          choices: [
            "A small piece of the company",
            "A loan to the company's workers",
            "A coupon for the company's products",
          ],
          answer: 0,
          why: "A share is a slice of ownership in the business.",
        },
        {
          q: "What does diversification mean?",
          choices: [
            "Buying only the stock that went up most last year",
            "Selling whenever prices drop",
            "Keeping all your money in cash",
            "Spreading your money across many different investments",
          ],
          answer: 3,
          why: "Diversifying spreads risk so one bad investment cannot wipe you out.",
        },
        {
          q: "You put $100 into each of 5 companies. One fails and goes to $0 while the others stay the same. How much do you have left?",
          choices: ["$0", "$100", "$400", "$500"],
          answer: 2,
          why: "You started with 5 x 100 = $500 and lost $100, leaving $400.",
        },
        {
          q: "Which offer is the biggest red flag?",
          choices: [
            "An index fund that holds hundreds of companies",
            "A guaranteed 30% return every month with no risk",
            "A savings account paying 4% a year",
          ],
          answer: 1,
          why: "No honest investment can guarantee huge returns with no risk; that is a classic sign of fraud.",
        },
        {
          q: "Investments that might grow the most usually come with...",
          choices: [
            "No chance of loss",
            "A government guarantee",
            "Higher risk",
            "Lower fees",
          ],
          answer: 2,
          why: "Risk and reward go together: bigger possible gains mean bigger possible losses.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "With a parent, pick three companies whose products your family actually uses. For each one, find out what it sells, how it makes money, and one thing that could hurt its business. Then explain to your parent which one you would most want to own a piece of and why, and how owning all three would be safer than owning just one.",
        rubric: [
          "Researches three real companies the family uses",
          "Explains what each sells and how it makes money",
          "Names a real risk for each company",
          "Explains diversification using the three companies as an example",
        ],
      },
    },
    {
      id: "money.credit",
      title: "Credit and Debt",
      minutes: 30,
      stage: "rhetoric",
      read: p(
        `Sometimes people want something before they have the money for it, so they borrow. Borrowed money is called debt, and the lender charges interest for it. When you save, interest works for you. When you borrow, interest works against you.`,
        `Here is how it adds up. Borrow $300 for one year at 10 percent simple interest, and you must pay back $300 + $30 = $330. The $30 is the price of not waiting.`,
        `Credit cards are a common way to borrow. Each purchase is a small loan from the card company. If you pay the full balance by the due date, most cards charge no interest on purchases. But if you carry a balance, rates are often 20 percent a year or more. At 24 percent a year, that is about 2 percent a month. Owe $1,000, and you pay about $20 in interest in a single month, and that interest can compound if you do not pay it off.`,
        `Not all debt is equal. Borrowing can make sense when it helps you build value or earn more, like a reasonable loan for a home your family will live in for years, or for tools that let a small business earn money. Debt for things that lose value fast, like the latest gadget or fancy clothes, is usually a bad deal because you keep paying long after the excitement is gone.`,
        `Consider Sam, who put a $1,200 TV on a credit card and paid only a little each month. Two years later he was still paying, and the TV had cost him far more than its price tag. His sister saved $100 a month for a year and bought the same TV with cash, owing nothing.`,
        `The skill that protects you is delayed gratification: choosing to wait for something now so you can have something better later. Franklin put it bluntly: "He that goes a borrowing goes a sorrowing." Wait, save, and buy with cash whenever you can.`
      ),
      keyIdeas: [
        "Debt costs interest, so borrowing makes things cost more.",
        "Pay credit cards in full; carrying a balance at 20%+ gets expensive fast.",
        "Delayed gratification turns waiting into a superpower.",
      ],
      hook: {
        text: "Two siblings bought the exact same $1,200 TV. One paid $1,200. The other paid far more and was still making payments two years later. Same TV, same store. What made the difference?",
      },
      teach: [
        {
          title: "Debt: when interest works against you",
          teach:
            "Sometimes people want something before they have the money, so they borrow. Borrowed money is called debt, and the lender charges interest for it. Remember how interest grew your savings? Flip it around. When you borrow, you are the one paying interest, so it works against you. Borrow $300 for one year at 10 percent simple interest, and you pay back $300 + $30 = $330. That extra $30 is the price of not waiting. Every time you borrow, ask: is having it now worth paying more for it?",
          visual: {
            type: "compare",
            left: {
              title: "Saving",
              points: ["You lend money to the bank", "The bank pays you interest", "Things cost you their price", "Interest works for you"],
            },
            right: {
              title: "Borrowing",
              points: ["A lender gives you money", "You pay the lender interest", "Things cost more than their price", "Interest works against you"],
            },
          },
          think: {
            q: "You borrow $500 for one year at 8 percent simple interest. How much do you pay back in total?",
            choices: ["$540", "$40", "$508", "$580"],
            answer: 0,
            why: "Interest is 0.08 x 500 = $40, so you repay 500 + 40 = $540.",
            hints: [
              "",
              "That is the interest alone. You also have to pay back the $500 you borrowed.",
              "You added 8 dollars instead of 8 percent. Find 8 out of every 100 dollars of $500.",
              "Check your decimal: 8 percent is 0.08, so the interest is $40, not $80.",
            ],
          },
          approaches: {
            analogy:
              "Borrowing is like renting a movie instead of waiting for it to be free. You get it now, but you pay extra for the privilege. Debt is renting money, and interest is the rental fee.",
            example:
              "Ella borrows $200 at 15 percent simple interest for one year to buy a bike. Interest: 0.15 x 200 = $30. She repays 200 + 30 = $230. If she had saved for the bike first, it would have cost $200.",
            simpler: {
              q: "You borrow $100 and must pay back $110. How much did borrowing cost you?",
              choices: ["$110", "$10", "$100"],
              answer: 1,
              why: "You paid back $10 more than you borrowed, so the cost of borrowing was $10.",
              hints: [
                "That is the total you repaid. How much more is it than what you borrowed?",
                "",
                "That is what you borrowed. The cost is the extra on top.",
              ],
            },
          },
        },
        {
          title: "Credit cards: a loan with every swipe",
          teach:
            "A credit card lets you buy now and pay later. Each swipe is a small loan from the card company. Here is the important part. If you pay the full balance by the due date, most cards charge no interest on purchases. But if you carry a balance, rates are often 20 percent a year or more. At 24 percent a year, that is about 2 percent a month. Owe $1,000, and you pay about $20 in interest in just one month. If you do not pay it off, next month you pay interest on the interest too. That is compounding, working against you.",
          visual: { type: "compound", principal: 1000, rate: 24, years: 5 },
          think: {
            q: "Your credit card charges about 2 percent a month. You carry an $800 balance. About how much interest do you owe this month?",
            choices: ["$2", "$160", "$16", "$80"],
            answer: 2,
            why: "2 percent of $800 is 0.02 x 800 = $16.",
            hints: [
              "That treats 2 percent as $2. Find 2 out of every 100 dollars of $800.",
              "That would be 20 percent. Check the decimal: 2 percent is 0.02.",
              "",
              "That is 10 percent of $800. The card charges 2 percent a month.",
            ],
          },
          approaches: {
            analogy:
              "A credit card is like a library book with late fees. Return it on time and it is free. Keep it past the due date, and fees pile up every day, and if the fees themselves get fees, the bill snowballs.",
            example:
              "Ryan owes $1,000 at 2 percent a month and pays nothing. Month 1: 1,000 x 1.02 = $1,020. Month 2: 1,020 x 1.02 = $1,040.40. The extra 40 cents in month 2 is interest charged on last month's interest.",
            simpler: {
              q: "If you pay your whole credit card balance by the due date, how much interest do most cards charge on purchases?",
              choices: ["About 2 percent", "About 24 percent", "None"],
              answer: 2,
              why: "Most cards charge no interest on purchases when the full balance is paid on time.",
              hints: [
                "That is the monthly charge when you carry a balance. What if you pay it all off?",
                "That is a yearly rate for carrying a balance. What happens if there is no balance left?",
                "",
              ],
            },
          },
        },
        {
          title: "Not all debt is equal",
          teach:
            "Is borrowing always bad? Not exactly. Ask one question: will this help me build value or earn more? A reasonable loan for a home a family will live in for years can make sense. So can a loan for a lawn mower that lets a teen start a mowing business, if the business earns more than the loan costs. But borrowing for things that lose value fast, like the newest gadget, trendy clothes, or a vacation, is usually a bad deal. The excitement fades in weeks, while the payments and interest go on for months or years.",
          visual: {
            type: "compare",
            left: {
              title: "Debt that can make sense",
              points: ["Builds value or earns money", "Lasts longer than the loan", "A reasonable amount you can repay", "Example: tools for a small business"],
            },
            right: {
              title: "Usually a bad deal",
              points: ["Loses value fast", "Fun fades before payments end", "Easy to borrow too much", "Example: the newest phone on a credit card"],
            },
          },
          think: {
            q: "Which is the best example of debt that can make sense?",
            choices: [
              "Putting a vacation on a credit card you cannot pay off",
              "Borrowing for the newest phone every year",
              "Buying trendy shoes with a loan",
              "A small loan for a pressure washer that lets you earn money cleaning driveways",
            ],
            answer: 3,
            why: "The pressure washer helps you earn money, which can pay back the loan and more. The others lose value and earn nothing.",
            hints: [
              "A trip is a great memory, but it will not earn money to pay the card back. Which choice helps you earn?",
              "Phones are useful, but a new one every year loses value quickly. Look for something that pays you back.",
              "Shoes go out of style and wear out. Which purchase could earn money to cover the loan?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Good debt is like borrowing a fishing rod so you can catch fish to sell. Bad debt is like borrowing money to buy fish you eat tonight. Tomorrow the fish is gone, but you still owe the money.",
            example:
              "Ana borrows $300 at 10 percent for one year to buy a pressure washer, so she owes $330. She cleans 11 driveways at $40 each: 11 x 40 = $440. After repaying $330, she is $110 ahead and still owns the machine.",
            simpler: {
              q: "Which purchase could help you earn money?",
              choices: ["A video game", "A lawn mower"],
              answer: 1,
              why: "A lawn mower lets you mow lawns for pay. A game is for fun.",
              hints: [
                "Games are fun, but they do not usually earn money. Which one could you use for a job?",
                "",
              ],
            },
          },
        },
        {
          title: "Delayed gratification: the power of waiting",
          teach:
            "Sam put a $1,200 TV on a credit card and paid only a little each month. Two years later he was still paying, and the interest made that TV cost far more than its price tag. His sister saved $100 a month instead: 1,200 / 100 = 12 months. Then she bought the same TV with cash and owed nothing. The skill she used is called delayed gratification: choosing to wait now so you get something better later. Waiting is hard, but it is a superpower. Franklin warned, 'He that goes a borrowing goes a sorrowing.' Wait, save, and pay with cash whenever you can.",
          visual: {
            type: "compare",
            left: {
              title: "Sam: buy now on credit",
              points: ["TV today", "Small monthly payments", "Interest adds up for 2+ years", "Pays far more than $1,200"],
            },
            right: {
              title: "His sister: save, then buy",
              points: ["Saves $100 a month", "Waits 12 months", "Pays exactly $1,200 in cash", "Owes nothing"],
            },
          },
          think: {
            q: "A $600 game console tempts you. You can save $50 a week. How many weeks until you can buy it with cash?",
            choices: ["6 weeks", "12 weeks", "550 weeks", "50 weeks"],
            answer: 1,
            why: "Divide the price by what you save each week: 600 / 50 = 12 weeks.",
            hints: [
              "Check the division: 50 x 6 is only $300. How many $50s make $600?",
              "",
              "That came from subtracting 50 from 600. You need to know how many $50 deposits fit into $600.",
              "That is how much you save each week, not how many weeks it takes.",
            ],
          },
          approaches: {
            analogy:
              "Delayed gratification is like waiting for cookies to finish baking. Pull them out early and you get gooey, raw dough. Wait the full time and you get the real thing. A little patience gives you a much better result.",
            example:
              "Borrowing $600 at about 2 percent a month costs around 0.02 x 600 = $12 in interest for the first month alone. If paying it off takes a year, the interest could add up to more than $70. Saving $50 a week for 12 weeks costs exactly $600 and nothing more.",
            simpler: {
              q: "What does delayed gratification mean?",
              choices: [
                "Never buying anything fun",
                "Waiting for something now to get something better later",
                "Paying bills late",
              ],
              answer: 1,
              why: "It means choosing patience now for a bigger or better reward later.",
              hints: [
                "It is not about never having fun. It is about waiting so the fun costs less or is better.",
                "",
                "Paying late usually costs extra fees. Delayed gratification is about waiting before you buy.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each kind of borrowing: can it make sense, or is it usually a bad deal?",
        buckets: ["Can make sense", "Usually a bad deal"],
        items: [
          { text: "A small loan for a lawn mower to start a mowing business", bucket: 0 },
          { text: "A reasonable home loan for a house a family will live in for years", bucket: 0 },
          { text: "Borrowing for a sewing machine to make and sell bags", bucket: 0 },
          { text: "Using a credit card and paying the full balance every month", bucket: 0 },
          { text: "Putting the newest phone on a card and paying the minimum", bucket: 1 },
          { text: "Borrowing for trendy clothes that will be out of style soon", bucket: 1 },
          { text: "Putting a vacation on a credit card you cannot pay off", bucket: 1 },
          { text: "Borrowing to buy snacks and video game skins", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain to a friend why buying a $600 console on a credit card and paying it off slowly costs more than saving up first.",
        keyPoints: [
          "Borrowing means paying interest on top of the price",
          "Carrying a credit card balance at about 2 percent a month adds up and can compound",
          "Saving first means paying only the price",
          "Delayed gratification: waiting now pays off later",
        ],
      },
      check: [
        {
          q: "You borrow $300 for one year at 10% simple interest. How much interest do you owe?",
          choices: ["$3", "$30", "$330", "$10"],
          answer: 1,
          why: "10 percent of $300 is $30.",
        },
        {
          q: "A credit card charges 24% a year, about 2% a month. About how much interest is one month on a $500 balance?",
          choices: ["$2", "$24", "$120", "$10"],
          answer: 3,
          why: "2 percent of $500 is 0.02 x 500 = $10.",
        },
        {
          q: "Which is the best example of debt that can make sense?",
          choices: [
            "A reasonable loan for tools that help a small business earn money",
            "Borrowing for the newest phone every year",
            "Putting vacation trips on a credit card you cannot pay off",
          ],
          answer: 0,
          why: "Borrowing that helps you build value or earn more can pay for itself; borrowing for things that lose value does not.",
        },
        {
          q: "What is delayed gratification?",
          choices: [
            "Never buying anything fun",
            "Paying a bill late",
            "Waiting for something now to get something better later",
            "Asking someone else to pay for you",
          ],
          answer: 2,
          why: "Delayed gratification means choosing patience now for a bigger reward later.",
        },
        {
          q: "How can you use a credit card and usually pay no interest on purchases?",
          choices: [
            "Pay only the minimum each month",
            "Pay the full balance by the due date every month",
            "Use the card only on weekends",
          ],
          answer: 1,
          why: "Most cards charge no interest on purchases when the full statement balance is paid on time.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "A friend wants to put a $600 game console on a credit card at 24% a year and pay it off slowly. Write a short, friendly letter persuading them to save up instead. Use real numbers to show what borrowing could cost, offer a simple savings plan, and include one proverb or saying about money.",
        rubric: [
          "Takes a clear position and stays friendly and respectful",
          "Uses correct math to show the cost of interest (for example, about $12 a month on $600 at 2% a month)",
          "Offers a realistic savings plan with a weekly or monthly amount and a timeline",
          "Includes a proverb or saying and connects it to the argument",
        ],
      },
    },
  ],
};
