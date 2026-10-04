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
          probe: {
            type: "cloze",
            text: "When you do something useful for another person, you create {0}. They gladly pay you when what they get is worth {1} to them than the money they hand over.",
            blanks: [{ answers: ["value"] }, { answers: ["more"] }],
            bank: ["value", "more", "less", "effort", "luck", "the same"],
            hint: "Think about why the neighbor would choose to trade their money for your dog walk.",
            mistakes: [
              { match: "effort", coach: "Effort matters, but people pay for how much better off they are, not for how hard you tried." },
              { match: "less", coach: "If your help were worth less to them than the money, would they still pay? Flip it around." },
              { match: "luck", coach: "Luck does not make someone better off. What does your work actually give them?" },
            ],
            seconds: 25,
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
          probe: {
            type: "number",
            prompt: "You help at a farm stand for $13 an hour and work 7 hours on Saturday. How much do you earn?",
            answer: 91,
            tolerance: 0.01,
            unit: "$",
            hint: "Hourly pay means you earn the same rate again for every hour you work.",
            mistakes: [
              { match: "20", coach: "You added 13 and 7. You earn $13 seven separate times, so multiply." },
              { match: "84", coach: "Close! Check your multiplication: that is 12 x 7. Your rate is $13." },
              { match: "137", coach: "That looks like the numbers stuck together. Multiply the rate by the hours instead." },
            ],
            seconds: 25,
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
          probe: {
            type: "match",
            prompt: "Match each job to its real hourly rate (job price divided by hours).",
            pairs: [
              { left: "$30 car wash that takes 2 hours", right: "$15 an hour" },
              { left: "$30 car wash that takes 1.5 hours", right: "$20 an hour" },
              { left: "$24 lawn mowed in 1 hour", right: "$24 an hour" },
              { left: "$40 garage cleanout that takes 4 hours", right: "$10 an hour" },
            ],
            hint: "For each job, split the price evenly across the hours it took.",
            mistakes: [
              { match: "Matched the 1.5-hour wash to $15", coach: "$15 an hour was the slower 2-hour wash. Finishing faster means each hour earns more." },
              { match: "Multiplied price by hours", coach: "Multiplying makes the number bigger than the price. To find pay per hour, divide the price by the hours." },
            ],
            seconds: 45,
          },
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
          probe: {
            type: "sort",
            prompt: "Sort each skill: is it common (lower pay) or rare and useful (higher pay)?",
            buckets: ["Common skill", "Rare, useful skill"],
            items: [
              { text: "Handing out flyers", bucket: 0 },
              { text: "Carrying grocery bags", bucket: 0 },
              { text: "Washing the outside of a car", bucket: 0 },
              { text: "Raking leaves", bucket: 0 },
              { text: "Fixing bike brakes and gears", bucket: 1 },
              { text: "A full interior car detail with stain removal", bucket: 1 },
              { text: "Safely wiring a house", bucket: 1 },
              { text: "Building a website for a small shop", bucket: 1 },
            ],
            hint: "Ask yourself: could almost anyone do this today, or does it take practice and know-how?",
            mistakes: [
              { match: "Put washing the outside of a car in rare", coach: "Almost anyone with a bucket and sponge can wash the outside. Leo earned more only after learning interior detailing." },
              { match: "Put fixing bikes in common", coach: "Fixing gears and brakes takes knowledge and practice, so fewer people can do it well." },
            ],
            seconds: 40,
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
      mastery: [
        {
          type: "number",
          prompt: "You charge $36 to paint a fence, and it takes you 2.5 hours. What is your real hourly rate?",
          answer: 14.4,
          tolerance: 0.01,
          unit: "$",
          hint: "The $36 is for the whole job, so share it across all 2.5 hours.",
          mistakes: [
            { match: "90", coach: "You multiplied 36 by 2.5. Pay per hour means dividing the job price by the hours." },
            { match: "33.5", coach: "You subtracted the hours from the price. Divide the price by the hours instead." },
            { match: "18", coach: "That would be the rate if the job took 2 hours. It took 2.5 hours, so each hour earns a bit less." },
          ],
          seconds: 50,
        },
        {
          type: "build",
          prompt: "Build the rule for finding your real hourly rate on a per-job task.",
          tiles: ["Real hourly rate", "equals", "job price", "divided by", "hours worked"],
          distractors: ["times", "plus"],
          hint: "Start with what you want to find, then think about splitting the price across the time.",
          mistakes: [
            { match: "Used times instead of divided by", coach: "Multiplying the price by hours makes the number bigger than the price. You want to split the price across the hours." },
            { match: "Put hours before job price", coach: "Hours divided by price gives a tiny number. The price goes first, then divide by the hours." },
          ],
          seconds: 35,
        },
        {
          type: "place",
          prompt: "Place each job on the number line at its real pay per hour.",
          min: 0,
          max: 40,
          step: 1,
          tolerance: 1,
          items: [
            { label: "$20 for a 2-hour job", value: 10 },
            { label: "Babysitting at $12 an hour", value: 12 },
            { label: "$24 lawn mowed in 1 hour", value: 24 },
            { label: "$35 car detail done in 1.25 hours", value: 28 },
          ],
          hint: "Hourly jobs already tell you the rate. For per-job pay, divide the price by the hours.",
          mistakes: [
            { match: "Placed the $35 detail at 35", coach: "The detail took longer than an hour, so each hour earns less than $35. Try 35 divided by 1.25." },
            { match: "Placed the $20 job at 20", coach: "That job took 2 hours, so split $20 into two equal parts." },
          ],
          seconds: 70,
        },
        {
          type: "cloze",
          text: "Hourly pay rewards the {0} you put in. Per-job pay rewards skill and {1}, because finishing faster raises your real hourly rate. Skills that are useful and {2} let you charge more.",
          blanks: [
            { answers: ["time", "hours"] },
            { answers: ["speed", "being faster", "efficiency", "working faster"] },
            { answers: ["rare", "hard to find", "uncommon", "scarce"] },
          ],
          hint: "Think about what makes each kind of pay go up: more hours, or getting quicker and better?",
          mistakes: [
            { match: "effort", coach: "Both kinds of pay take effort. Hourly pay grows only when you add more time." },
            { match: "common", coach: "If lots of people can do it, customers have plenty of choices. Which kind of skill makes them seek you out?" },
            { match: "money", coach: "Every job pays money. What does a per-job worker get better at to earn more per hour?" },
          ],
          seconds: 50,
        },
      ],
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
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that describes a need.",
            sentences: [
              "Maya has to replace her only pair of shoes, which now has a hole in the sole.",
              "She would love a glow-in-the-dark skateboard.",
              "Her family needs groceries for the week.",
              "A new game skin is on sale for $5.",
              "Her math class requires a calculator, and she does not own one.",
              "She is thinking about a third hoodie in a new color.",
            ],
            correct: [0, 2, 4],
            hint: "For each sentence, ask: what would happen if she skipped it? Could she still live, stay healthy, and do her schoolwork?",
            mistakes: [
              { match: "Tapped the skateboard", coach: "A skateboard is fun, but she can get through life without it. That makes it a want." },
              { match: "Tapped the third hoodie", coach: "She already has two hoodies. A third one is nice to have, so it is a want." },
              { match: "Missed the calculator", coach: "School requires it and she does not have one, so it is a supply she needs for her work." },
            ],
            seconds: 35,
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
          probe: {
            type: "number",
            prompt: "You earn $70 pet sitting. Using spend 60%, save 30%, give 10%, how many dollars go into savings?",
            answer: 21,
            tolerance: 0.01,
            unit: "$",
            hint: "Turn the save percent into a decimal and multiply it by what you earned.",
            mistakes: [
              { match: "30", coach: "30 percent is not the same as $30. Find 30 out of every 100 dollars of $70." },
              { match: "42", coach: "That is the spend slice, 60 percent. Savings is the 30 percent slice." },
              { match: "7", coach: "That is the give slice, 10 percent. Savings is three times as big." },
            ],
            seconds: 30,
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
          probe: {
            type: "place",
            prompt: "An adult takes home $2,500 a month. Using the 50/30/20 rule, place each slice at its dollar amount.",
            min: 0,
            max: 2500,
            step: 50,
            tolerance: 50,
            items: [
              { label: "Needs (50%)", value: 1250 },
              { label: "Wants (30%)", value: 750 },
              { label: "Savings (20%)", value: 500 },
            ],
            hint: "Find each slice by multiplying $2,500 by the percent written as a decimal. Half is a good place to start.",
            mistakes: [
              { match: "Placed savings at 20", coach: "20 percent is not $20. It is 20 out of every 100 dollars, so 0.20 x 2,500." },
              { match: "Swapped wants and savings", coach: "Wants get 30 percent and savings get 20 percent, so the wants marker should sit further right." },
            ],
            seconds: 55,
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
          probe: {
            type: "cloze",
            text: "Moving savings aside the moment money arrives is called paying {0} first. Ava's cousin puts $15 in a jar every week before spending. Her $90 goal will take {1} weeks.",
            blanks: [{ answers: ["yourself"] }, { answers: ["6", "six"] }],
            hint: "For the weeks, count how many $15 deposits it takes to build up to $90.",
            mistakes: [
              { match: "75", coach: "That came from subtracting 15 from 90. You need how many groups of $15 fit into $90." },
              { match: "15", coach: "That is how much she saves each week, not how many weeks. Divide the goal by $15." },
              { match: "last", coach: "Saving last usually means nothing is left. The trick is to save before you spend anything." },
            ],
            seconds: 35,
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
      mastery: [
        {
          type: "match",
          prompt: "Match each money idea to what it means.",
          pairs: [
            { left: "Need", right: "Something you must have to live, stay healthy, or do your work" },
            { left: "Want", right: "Something nice to have that you could live without" },
            { left: "Budget", right: "A plan that tells your money where to go before you spend it" },
            { left: "Pay yourself first", right: "Move savings aside the moment money comes in" },
            { left: "50/30/20 rule", right: "An adult plan: half to needs, then wants, then savings" },
          ],
          hint: "Start with the pairs you are sure of, then match the rest by what is left.",
          mistakes: [
            { match: "Mixed up need and want", coach: "A need is something you cannot do without. A want makes life nicer but is optional." },
            { match: "Matched budget to saving first", coach: "A budget is the whole plan for every dollar. Paying yourself first is one trick inside that plan." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "You earn $45 a week and save 30 percent of it the moment you get paid. How many weeks until you have $108 for a goal?",
          answer: 8,
          tolerance: 0,
          unit: "weeks",
          hint: "Two steps: first find how much you save each week, then see how many of those fit into $108.",
          mistakes: [
            { match: "3.6", coach: "You divided by 30 as if you saved $30 a week. First find 30 percent of $45." },
            { match: "2.4", coach: "You divided by your whole paycheck. Only the savings slice goes toward the goal." },
            { match: "13.5", coach: "That is how much you save each week. Now divide the $108 goal by that amount." },
          ],
          seconds: 70,
        },
        {
          type: "build",
          prompt: "Build the rule for figuring out how long a savings goal will take.",
          tiles: ["Weeks to goal", "equals", "goal amount", "divided by", "savings each week"],
          distractors: ["times", "minus"],
          hint: "Ask how many weekly deposits fit into the goal. Which operation answers 'how many fit'?",
          mistakes: [
            { match: "Used times", coach: "Multiplying the goal by weekly savings gives a huge number, not a count of weeks. Divide instead." },
            { match: "Used minus", coach: "Subtracting one deposit tells you what is left after one week, not how many weeks you need." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "A small leak can sink a great ship. If you buy a $2.50 drink every day for 30 days, how much do you spend in total?",
          answer: 75,
          tolerance: 0.01,
          unit: "$",
          hint: "The same small amount is spent again every single day, so multiply.",
          mistakes: [
            { match: "32.5", coach: "You added 2.50 and 30. You spend $2.50 thirty separate times." },
            { match: "60", coach: "That would be $2 a day. Do not forget the extra 50 cents each day, which is $15 more." },
            { match: "7.5", coach: "Check your decimal. 2.50 x 30 is the same as 25 x 3, which is 75." },
          ],
          seconds: 35,
        },
      ],
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
          probe: {
            type: "match",
            prompt: "Match each savings word to its meaning.",
            pairs: [
              { left: "Principal", right: "The money you first put in" },
              { left: "Interest", right: "What the bank pays you for using your money" },
              { left: "Interest rate", right: "The percent you earn each year" },
              { left: "Balance", right: "Everything in the account right now, interest included" },
            ],
            hint: "Principal is where you start, interest is what gets added, and the rate tells you how fast it is added.",
            mistakes: [
              { match: "Mixed up principal and balance", coach: "Principal is only what you first deposited. The balance also includes any interest added since." },
              { match: "Mixed up interest and interest rate", coach: "The rate is a percent, like 4 percent. Interest is the actual dollars you get." },
            ],
            seconds: 35,
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
          probe: {
            type: "number",
            prompt: "You save $600 at 5 percent simple interest for 4 years. What is your balance at the end?",
            answer: 720,
            tolerance: 0.01,
            unit: "$",
            hint: "Find one year's interest on the principal, multiply by the number of years, then add the principal back.",
            mistakes: [
              { match: "120", coach: "That is the interest alone. The balance also includes the $600 you put in." },
              { match: "630", coach: "That adds just one year of interest. Simple interest pays $30 every year for 4 years." },
              { match: "729.3", coach: "That is compound interest. Simple interest is figured only on the original $600 each year." },
            ],
            seconds: 45,
          },
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
          probe: {
            type: "target",
            prompt: "You put $1,000 in an account paying 10 percent a year, compounded yearly. Slide the years to find the first year your balance reaches at least $1,500.",
            goal: { sim: "compound", principal: 1000, rate: 10, target: 1500 },
            hint: "Each year multiplies the balance by 1.10. Keep going until you pass $1,500, and stop at the first year that does.",
            mistakes: [
              { match: "4 years", coach: "So close! After 4 years you have about $1,464, still just short of $1,500. One more year does it." },
              { match: "6 years", coach: "You get there earlier than that. Check the balance a year sooner: it has already passed $1,500." },
            ],
            seconds: 45,
          },
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
          probe: {
            type: "place",
            prompt: "Use the rule of 72 to place each interest rate at about how many years it takes money to double.",
            min: 0,
            max: 30,
            step: 1,
            tolerance: 1,
            items: [
              { label: "3 percent a year", value: 24 },
              { label: "6 percent a year", value: 12 },
              { label: "9 percent a year", value: 8 },
              { label: "18 percent a year", value: 4 },
            ],
            hint: "For each rate, divide 72 by the rate. A higher rate should double faster, so it sits further left.",
            mistakes: [
              { match: "Placed each rate at its own number", coach: "The rate is not the doubling time. Divide 72 by each rate to get the years." },
              { match: "Put 18 percent furthest right", coach: "A bigger rate grows money faster, so it doubles in fewer years, not more." },
            ],
            seconds: 55,
          },
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
      mastery: [
        {
          type: "target",
          prompt: "You save $500 at 6 percent a year, compounded yearly, and never add more. Slide to the first year your balance reaches at least $1,000.",
          goal: { sim: "compound", principal: 500, rate: 6, target: 1000 },
          hint: "Doubling $500 gets you to $1,000. The rule of 72 gives a great first guess, then check the balance in the simulator.",
          mistakes: [
            { match: "11 years", coach: "After 11 years you have about $949, not quite there yet. Try one more year." },
            { match: "6 years", coach: "That is the interest rate, not the years. Divide 72 by 6 for a first guess." },
            { match: "17 years", coach: "That is how long simple interest would take. Compounding gets there sooner because interest earns interest." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "You save $2,000 at 5 percent a year, compounded yearly. What is your balance after 2 years?",
          answer: 2205,
          tolerance: 0.01,
          unit: "$",
          hint: "Multiply by 1.05 once for each year, using the new balance each time.",
          mistakes: [
            { match: "2200", coach: "That is simple interest, $100 each year. In year 2, the interest is figured on $2,100, not $2,000." },
            { match: "2100", coach: "That is only after 1 year. Multiply by 1.05 one more time." },
            { match: "205", coach: "That is the total interest. The question asks for the whole balance." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "With {0} interest you earn the same amount every year, because interest is figured only on the {1}. With {2} interest, the interest you already earned starts earning interest too.",
          blanks: [
            { answers: ["simple"] },
            { answers: ["principal", "original amount", "starting amount"] },
            { answers: ["compound", "compounding", "compounded"] },
          ],
          bank: ["simple", "principal", "compound", "balance", "rate", "dividend"],
          hint: "One kind of interest grows in a straight line and the other grows like a snowball. Which is which?",
          mistakes: [
            { match: "balance", coach: "The balance includes interest already added. Simple interest ignores that and uses only what you first put in." },
            { match: "rate", coach: "The rate is the percent. The question asks what amount the interest is figured on." },
          ],
          seconds: 40,
        },
        {
          type: "sort",
          prompt: "Sort each statement: does it describe simple interest or compound interest?",
          buckets: ["Simple interest", "Compound interest"],
          items: [
            { text: "Earns the exact same dollars every year", bucket: 0 },
            { text: "Grows in a straight line, like even stairs", bucket: 0 },
            { text: "$1,000 at 5 percent earns $50 in year 1 and $50 in year 10", bucket: 0 },
            { text: "Interest earns interest of its own", bucket: 1 },
            { text: "Grows like a snowball rolling downhill", bucket: 1 },
            { text: "$1,000 at 5 percent becomes $1,050, then $1,102.50", bucket: 1 },
          ],
          hint: "Check whether each year's interest stays the same or gets bigger as the balance grows.",
          mistakes: [
            { match: "Put $1,050 then $1,102.50 in simple", coach: "Year 2 earned $52.50, more than year 1's $50. Growing interest means compounding." },
            { match: "Put straight line in compound", coach: "Compound growth curves upward and speeds up. A straight line means the same amount every year." },
          ],
          seconds: 45,
        },
      ],
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
          probe: {
            type: "number",
            prompt: "A bike company is split into 25,000 shares. You own 250 of them. What percent of the company do you own?",
            answer: 1,
            tolerance: 0.001,
            unit: "%",
            hint: "Divide your shares by the total shares, then turn that decimal into a percent.",
            mistakes: [
              { match: "0.01", coach: "You divided correctly but stopped at the decimal. Multiply by 100 to turn it into a percent." },
              { match: "10", coach: "Check the decimal places. 250 out of 25,000 is one out of every hundred." },
              { match: "250", coach: "That treats your 250 shares as if the company had only 100. It has 25,000 shares." },
            ],
            seconds: 40,
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
          probe: {
            type: "sort",
            prompt: "Sort each pile of money: should it sit safely in a savings account, or could it be invested in stocks for the long haul?",
            buckets: ["Savings account", "Long-term investing"],
            items: [
              { text: "Summer camp payment due in 3 months", bucket: 0 },
              { text: "Money for a friend's birthday gift next month", bucket: 0 },
              { text: "Emergency money in case your bike needs repairs", bucket: 0 },
              { text: "Money you will not touch until you are 40", bucket: 1 },
              { text: "Birthday money you plan to leave alone for 20 years", bucket: 1 },
              { text: "Savings for when you retire many decades from now", bucket: 1 },
            ],
            hint: "Ask: if stocks dropped next month, would there be time to wait for them to recover before you need this money?",
            mistakes: [
              { match: "Put camp money in investing", coach: "Stocks can drop right before camp is due, with no time to bounce back. Money needed soon should stay safe." },
              { match: "Put retirement money in savings", coach: "Savings is safe, but over decades it grows slowly. Money you will not need for a long time can ride out the ups and downs." },
            ],
            seconds: 40,
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
          probe: {
            type: "number",
            prompt: "You invest $1,200 by putting $150 into each of 8 companies. Two of them fail and drop to $0. The rest stay the same. How much do you have now?",
            answer: 900,
            tolerance: 0.01,
            unit: "$",
            hint: "Figure out how much was in the companies that failed, then take that away from what you started with.",
            mistakes: [
              { match: "1050", coach: "Two companies failed, not one. Subtract $150 twice." },
              { match: "300", coach: "That is how much you lost. The question asks what you have left." },
              { match: "0", coach: "Only two companies failed. Spreading out means the other six still hold their value." },
            ],
            seconds: 40,
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
          probe: {
            type: "highlight",
            prompt: "You found an ad online. Tap every sentence that is a red flag.",
            sentences: [
              "Turn $100 into $500 in just 30 days, guaranteed!",
              "Our fund holds small pieces of hundreds of companies.",
              "There is zero risk. You simply cannot lose.",
              "This offer ends tonight, so decide right now.",
              "Values can go down in some years, so invest only money you will not need soon.",
            ],
            correct: [0, 2, 3],
            hint: "Look for promises that are too good, claims of no risk, and pressure to hurry.",
            mistakes: [
              { match: "Tapped the warning that values can go down", coach: "Warning you about risk is a sign of honesty. Scammers hide the risks." },
              { match: "Missed the deadline pressure", coach: "Rushing you so you cannot think it over is a classic trick. Honest investments do not need you to decide tonight." },
            ],
            seconds: 35,
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
      mastery: [
        {
          type: "match",
          prompt: "Match each investing word to what it means.",
          pairs: [
            { left: "Stock", right: "A small piece of ownership in a company" },
            { left: "Dividend", right: "A slice of company profits paid to its owners" },
            { left: "Diversification", right: "Spreading money across many different investments" },
            { left: "Index fund", right: "One investment holding pieces of hundreds of companies" },
            { left: "Ponzi scheme", right: "Paying early investors with money from newer ones" },
          ],
          hint: "Think about which words describe owning, which describe spreading out, and which describe a trap.",
          mistakes: [
            { match: "Mixed up diversification and index fund", coach: "Diversification is the idea of spreading out. An index fund is one tool that does it for you." },
            { match: "Mixed up stock and dividend", coach: "The stock is what you own. The dividend is cash the company sends you for owning it." },
          ],
          seconds: 50,
        },
        {
          type: "number",
          prompt: "A lemonade company is split into 800 shares, and you own 40. This year it pays out $2,000 of its profits as dividends to all its owners. How much is your share?",
          answer: 100,
          tolerance: 0.01,
          unit: "$",
          hint: "First find what fraction of the company you own, then take that same fraction of the $2,000.",
          mistakes: [
            { match: "5", coach: "That is the percent of the company you own. Now take 5 percent of $2,000." },
            { match: "40", coach: "That is how many shares you own. Your dividend depends on your fraction of the company." },
            { match: "50", coach: "Check the fraction: 40 out of 800 is one twentieth. One twentieth of $2,000 is how much?" },
          ],
          seconds: 60,
        },
        {
          type: "place",
          prompt: "You split your money evenly among some companies, and exactly one fails and goes to $0. Place each plan at the percent of your money you lose.",
          min: 0,
          max: 100,
          step: 1,
          tolerance: 2,
          items: [
            { label: "1 company out of 2", value: 50 },
            { label: "1 company out of 4", value: 25 },
            { label: "1 company out of 10", value: 10 },
            { label: "1 company out of 20", value: 5 },
          ],
          hint: "If you split evenly, each company holds the same slice. Losing one company means losing one slice.",
          mistakes: [
            { match: "Placed more companies further right", coach: "The more companies you own, the smaller each slice. One failure hurts less, not more." },
            { match: "Placed 1 out of 4 at 4", coach: "One out of 4 is a quarter of your money. What percent is a quarter?" },
          ],
          seconds: 55,
        },
        {
          type: "build",
          prompt: "Build the rule that protects every investor.",
          tiles: ["Bigger possible rewards", "always come with", "bigger risk"],
          distractors: ["zero risk", "a guarantee"],
          hint: "Remember the sledding hill: the fast hill is also the one where you might wipe out.",
          mistakes: [
            { match: "Used zero risk", coach: "No real investment offers big rewards with zero risk. That promise is a red flag." },
            { match: "Used a guarantee", coach: "Honest investments cannot guarantee big gains. What always travels with a bigger reward?" },
          ],
          seconds: 25,
        },
      ],
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
          probe: {
            type: "number",
            prompt: "You borrow $700 for one year at 9 percent simple interest. How much do you pay back in total?",
            answer: 763,
            tolerance: 0.01,
            unit: "$",
            hint: "Find the interest first, then remember you must also return every dollar you borrowed.",
            mistakes: [
              { match: "63", coach: "That is the interest alone. You also have to pay back the $700 you borrowed." },
              { match: "709", coach: "You added 9 dollars instead of 9 percent. Find 9 out of every 100 dollars of $700." },
              { match: "1330", coach: "Check your decimal: 9 percent is 0.09, so the interest is far less than the loan itself." },
            ],
            seconds: 40,
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
          probe: {
            type: "cloze",
            text: "Your card charges about 2 percent a month. If you carry a $900 balance, this month's interest is about ${0}. To pay no interest on purchases with most cards, pay the {1} balance by the due date.",
            blanks: [{ answers: ["18", "18.00"] }, { answers: ["full", "whole", "entire", "total"] }],
            hint: "For the interest, find 2 out of every 100 dollars. For the second blank, think about what leaves no balance to charge interest on.",
            mistakes: [
              { match: "2", coach: "2 percent is not $2. Multiply $900 by 0.02." },
              { match: "180", coach: "That would be 20 percent. Check the decimal: 2 percent is 0.02." },
              { match: "minimum", coach: "Paying only the minimum leaves a balance, and interest is charged on it. What would leave nothing owed?" },
            ],
            seconds: 40,
          },
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
          probe: {
            type: "highlight",
            prompt: "Tap every borrowing choice that can make sense because it helps someone earn money or build value.",
            sentences: [
              "Borrowing $200 for a pressure washer to clean driveways for pay.",
              "Putting concert tickets on a credit card you cannot pay off.",
              "A small loan for a sewing machine to make and sell pillows.",
              "Borrowing for a phone upgrade when your current phone works fine.",
              "A loan for baking pans for a cupcake business that already has orders.",
            ],
            correct: [0, 2, 4],
            hint: "For each one, ask: will this purchase earn money or last long enough to be worth the interest?",
            mistakes: [
              { match: "Tapped the concert tickets", coach: "The concert is fun for one night, but the payments and interest keep going. It earns nothing back." },
              { match: "Tapped the phone upgrade", coach: "The old phone still works, and a new one loses value fast. That loan does not pay for itself." },
              { match: "Missed the cupcake pans", coach: "The business already has orders, so the pans can earn money to repay the loan." },
            ],
            seconds: 35,
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
          probe: {
            type: "place",
            prompt: "You decide to wait and pay cash. Place each goal on the line at how many weeks of saving it takes.",
            min: 0,
            max: 24,
            step: 1,
            tolerance: 0.5,
            items: [
              { label: "$600 console, saving $50 a week", value: 12 },
              { label: "$240 headphones, saving $30 a week", value: 8 },
              { label: "$400 tablet, saving $20 a week", value: 20 },
            ],
            hint: "For each goal, divide the price by how much you save each week.",
            mistakes: [
              { match: "Placed the tablet at 10", coach: "At $20 a week, 10 weeks only gets you $200. How many $20s make $400?" },
              { match: "Placed by weekly savings amount", coach: "The weekly amount is not the number of weeks. Divide the price by it." },
            ],
            seconds: 50,
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
      mastery: [
        {
          type: "target",
          prompt: "Compounding can work against you. You owe $1,000 on a card charging 24 percent a year and pay nothing. Slide to the first year the debt reaches at least $2,000.",
          goal: { sim: "compound", principal: 1000, rate: 24, target: 2000 },
          hint: "Each year the debt is multiplied by 1.24, interest on interest. Watch for the first year it crosses $2,000.",
          mistakes: [
            { match: "3 years", coach: "The rule of 72 says about 3, but check the simulator: after 3 years you owe about $1,907, just short. One more year." },
            { match: "5 years", coach: "It happens sooner than that. Look at the balance one year earlier: it has already passed $2,000." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "You owe $400 on a card that charges 2 percent a month, and you pay nothing for 2 months. Interest is added each month. How much do you owe after 2 months?",
          answer: 416.16,
          tolerance: 0.01,
          unit: "$",
          hint: "Multiply the balance by 1.02 for month 1, then multiply that new balance by 1.02 again for month 2.",
          mistakes: [
            { match: "416", coach: "That is $8 each month on the original $400. In month 2 the interest is charged on $408, so it is a bit more." },
            { match: "408", coach: "That is only after 1 month. Do month 2 on the new balance." },
            { match: "16.16", coach: "That is the interest alone. The question asks for the whole amount you owe." },
          ],
          seconds: 70,
        },
        {
          type: "match",
          prompt: "Match each borrowing idea to what it means.",
          pairs: [
            { left: "Debt", right: "Borrowed money you must pay back" },
            { left: "Interest on a loan", right: "The extra you pay for using someone else's money" },
            { left: "Carrying a balance", right: "Not paying the full card bill by the due date" },
            { left: "Debt that can make sense", right: "Borrowing that helps you earn money or build value" },
            { left: "Delayed gratification", right: "Waiting now so you get something better later" },
          ],
          hint: "Match the easy ones first, like debt and delayed gratification, then fit the rest.",
          mistakes: [
            { match: "Mixed up debt and interest", coach: "Debt is the amount you borrowed. Interest is the extra fee charged on top of it." },
            { match: "Mixed up carrying a balance and delayed gratification", coach: "Carrying a balance means owing money after the due date. Delayed gratification is about waiting before you buy." },
          ],
          seconds: 50,
        },
        {
          type: "sequence",
          prompt: "Put the steps of a smart, debt-free purchase in order.",
          steps: [
            "Notice something you really want to buy.",
            "Ask yourself whether it is a need or a want.",
            "Make a savings plan: price divided by weekly savings gives the number of weeks.",
            "Each payday, move your savings aside before spending anything.",
            "Buy it with cash when you reach the goal, and owe nothing.",
          ],
          hint: "You cannot save toward something until you have a plan, and you cannot plan until you know what you want.",
          mistakes: [
            { match: "Buying before saving", coach: "Buying first means borrowing, which adds interest. The cash purchase comes at the very end." },
            { match: "Saving before making a plan", coach: "A plan tells you how much to save each week and for how long. Make it before you start saving." },
          ],
          seconds: 40,
        },
      ],
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
