import type { Course } from "./types";
import { entrepreneurship } from "./entrepreneurship";

/**
 * Entrepreneurship Lab: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const businessHs: Course = {
  ...entrepreneurship,
  id: "business-hs",
  band: "strategist",
  title: "Entrepreneurship Lab",
  blurb: "High school entrepreneurship: finding problems worth solving, unit economics, pricing, marketing, financial statements and pitching.",
  lessons: [
    // ------------------------------------------------------------------
    // 1. Problems worth solving
    // ------------------------------------------------------------------
    {
      id: "business-hs.validation",
      title: "Problems Worth Solving",
      minutes: 35,
      stage: "logic",
      read: `In 1869, a young Thomas Edison patented an electric vote recorder. It worked perfectly and sold nothing, because the lawmakers it was built for did not want faster voting. Edison never forgot that lesson. About a decade later, when he set out to light part of New York City with electricity, he did not start alone in the lab. His team went building by building through lower Manhattan, counting gas lamps and noting how long they burned. Before he laid a single wire, he knew who his customers were and what they already spent on light.

That is the first job of any founder: find a problem worth solving. A problem is worth solving when it is painful, frequent, and already costing people time or money. The surest sign is that people are already trying to solve it, with a clumsy workaround, a competitor, or money spent.

The tool for finding out is the customer interview. The goal is not to pitch your idea. It is to learn the truth about someone's life. Ask about specific past events: "Tell me about the last time this happened. What did you do? What did it cost you?" Avoid hypothetical questions like "Would you buy this?" People are kind, and compliments are cheap. Facts about the past are reliable.

Then measure. Count how many people you interviewed, how many had the problem, and how many have already spent money on it. Stronger still is commitment: a deposit, a preorder, a signed agreement, or a request to be called the day you launch. Compliments are noise. Commitments are signal.

Finally, estimate the size of the opportunity. Multiply the number of potential customers you can reach by the share who have the problem and by what they would pay. A small number is not a failure. It is information that saves you months of building the wrong thing.`,
      keyIdeas: [
        "A problem worth solving is painful, frequent, and already costing people time or money.",
        "Interview for facts about the past, not compliments about your idea.",
        "Commitments (deposits, preorders) are real evidence; compliments are not.",
        "Size the opportunity: reachable customers x share with the problem x price.",
      ],
      hook: {
        text: "Around 1880, Thomas Edison had a working light bulb and a huge dream: electric light for a whole district of New York City. Instead of guessing, he sent his team through lower Manhattan, counting gas lamps building by building and noting how long they burned. Why would a famous inventor bother with a survey before building anything?",
      },
      teach: [
        {
          title: "Problem first, product second",
          teach:
            "Many new businesses fail because they build something nobody needs badly enough to pay for. Edison learned this the hard way when his first patent, a vote recorder, worked perfectly and sold nothing. So when he planned electric lighting for New York, he studied the market first. His team canvassed lower Manhattan, counting gas lamps building by building and noting how long they burned. That told him who his customers were and what they already spent on light. A problem worth solving has three marks. It is painful: people care when it happens. It is frequent: it happens often enough to matter. And it is already costing people time or money. The strongest clue of all is a workaround, a clumsy fix people use today because nothing better exists.",
          visual: {
            type: "flip",
            cards: [
              { front: "Problem worth solving", back: "Painful, frequent, and already costing people time or money." },
              { front: "Workaround", back: "A clumsy fix people use today because nothing better exists. A strong sign of real demand." },
              { front: "Customer interview", back: "A conversation to learn the truth about someone's life, not a pitch." },
              { front: "Validation", back: "Collecting evidence that real customers want something before you build it." },
            ],
          },
          probe: {
            type: "cloze",
            text: "A problem worth solving is {0}, {1}, and already costing people time or {2}. The strongest clue is a {3}: a clumsy fix people already use because nothing better exists.",
            blanks: [
              { answers: ["painful"] },
              { answers: ["frequent", "common"] },
              { answers: ["money"] },
              { answers: ["workaround"] },
            ],
            bank: ["painful", "frequent", "money", "workaround", "trendy", "rare", "logo"],
            hint: "Think about Edison's survey: people already spent money on gas light every night.",
            mistakes: [
              { match: "trendy", coach: "Trends come and go. A problem worth solving hurts, and it hurts often." },
              { match: "rare", coach: "A rare problem doesn't happen often enough to support a business." },
              { match: "logo", coach: "A logo is branding. The clue we want is what people already do to cope." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which is the strongest sign that a problem is worth solving?",
            choices: [
              "Your friends say it's a cool idea",
              "People are already paying for a clumsy workaround",
              "Nobody has ever tried to solve it",
              "You personally find it annoying",
            ],
            answer: 1,
            why: "If people already spend time or money on a poor fix, the problem is real and they value solving it.",
            hints: [
              "Friends are kind. Compliments don't prove anyone will pay.",
              "",
              "Sometimes that means nobody cares enough. Look for evidence people already spend on it.",
              "One person's annoyance isn't a market. Do many people already spend money on it?",
            ],
          },
          approaches: {
            analogy:
              "A good doctor examines the patient before writing a prescription. A founder who builds before studying the problem is prescribing medicine for an illness nobody has checked.",
            example:
              "Ella wants to start a bike repair service. Before buying tools, she asks 10 cyclists about their last breakdown. Seven describe a flat tire on the way to school, and five say they paid a shop $15 or more and waited days. Painful, frequent, and already costing money: that problem is worth solving.",
            simpler: {
              q: "People already pay $20 a month for a clumsy fix to a problem. What does that tell you?",
              choices: ["The problem is real and worth money to them", "Nobody cares about the problem", "The problem is already solved perfectly"],
              answer: 0,
              why: "Spending money on a workaround proves people value a solution.",
              hints: [
                "",
                "People don't pay every month for things they don't care about.",
                "A clumsy fix isn't a perfect one. There's room for something better.",
              ],
            },
          },
        },
        {
          title: "Interview for facts, not compliments",
          teach:
            "A customer interview is a conversation to learn the truth about someone's life, not a chance to pitch. The trap is that people are polite. Ask 'Would you buy an app that plans your meals?' and most will say yes to be nice. That answer is nearly worthless. Instead, ask about specific past behavior: 'Tell me about the last time you planned meals for the week. What was hard? What did you try? What did it cost?' Past facts are reliable. Future promises and compliments are not. Three rules keep you honest. Talk about their life, not your idea. Ask about specifics in the past, not opinions about the future. And listen far more than you talk. Write down exact words, especially when someone mentions money or time they already spent.",
          visual: {
            type: "compare",
            left: {
              title: "Fishing for compliments",
              points: [
                "Would you buy this?",
                "Do you think this is a good idea?",
                "How much would you pay someday?",
                "Founder talks most of the time",
              ],
            },
            right: {
              title: "Digging for facts",
              points: [
                "Tell me about the last time this happened.",
                "What did you try? What did it cost?",
                "What do you use right now?",
                "Customer talks most of the time",
              ],
            },
          },
          probe: {
            type: "sort",
            prompt: "You're validating a homework-help service for busy families. Sort each interview question.",
            buckets: ["Reveals facts", "Invites a polite guess"],
            items: [
              { text: "Tell me about the last evening homework turned into a struggle.", bucket: 0 },
              { text: "Would you sign up for my service?", bucket: 1 },
              { text: "What have you already tried, and what did it cost?", bucket: 0 },
              { text: "Don't you think tutoring is important?", bucket: 1 },
              { text: "How many evenings last month did this happen?", bucket: 0 },
              { text: "How much would you pay for something like this someday?", bucket: 1 },
            ],
            hint: "Facts are about what already happened. Guesses are about the future or about your idea.",
            mistakes: [
              {
                match: "Put 'How much would you pay someday' in facts",
                coach: "Someday is the future. People guess generously about money they haven't spent.",
              },
              {
                match: "Put 'Don't you think tutoring is important' in facts",
                coach: "That question leads the person toward a yes. It tells you their manners, not their behavior.",
              },
            ],
            seconds: 50,
          },
          think: {
            q: "Which interview question gives the most reliable information?",
            choices: [
              "Would you buy my meal-planning app?",
              "Do you like the idea?",
              "How much would you pay for it?",
              "What did you do last week when you ran out of time to plan meals?",
            ],
            answer: 3,
            why: "It asks about specific past behavior, which is fact rather than a polite guess.",
            hints: [
              "People often say yes to be nice. That's a guess about the future.",
              "Liking an idea costs nothing. You learn their manners, not their needs.",
              "Prices people imagine are usually much higher than what they really pay.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A detective trusts evidence over opinions. 'Where were you at 8 p.m.?' is more useful than 'Do you think you're innocent?' Interview questions work the same way: ask what happened, not what people think.",
            example:
              "Weak: 'Would you pay for a dog-walking app?' Answer: 'Sure!' Strong: 'What did you do the last time you worked late?' Answer: 'I paid my neighbor's son $15 and texted three people first.' The strong question revealed the price they already pay ($15) and the hassle of the workaround (three texts).",
            simpler: {
              q: "Which question asks about the past?",
              choices: ["Would you use this?", "What did you do the last time this happened?", "Will you tell your friends?"],
              answer: 1,
              why: "'What did you do the last time' asks about something that already happened.",
              hints: [
                "'Would you' asks about a guess in the future.",
                "",
                "'Will you' is about the future, not something that already happened.",
              ],
            },
          },
        },
        {
          title: "Commitment is the real signal",
          teach:
            "After a round of interviews, count. Suppose you talk with 25 potential customers about a weekend tutoring service. Twenty say it sounds great. That feels exciting, but compliments are cheap. Now ask for a commitment: a $10 deposit to hold a spot in the first session. If 6 of the 25 pay, your commitment rate is 6 divided by 25, or 24 percent. That number means far more than the twenty compliments, because people put real money behind it. Commitments come in different strengths. Asking to be called at launch is weak. Giving you more time, like a second meeting, is stronger. A deposit, preorder, or signed agreement is strongest. Track every interview in a simple table so your evidence is in numbers, not feelings.",
          visual: {
            type: "sort",
            prompt: "Sort each response by how strong a signal it is.",
            buckets: ["Compliment (noise)", "Commitment (signal)"],
            items: [
              { text: "What a great idea!", bucket: 0 },
              { text: "Here's a $10 deposit to hold my spot.", bucket: 1 },
              { text: "I'd probably use that.", bucket: 0 },
              { text: "Can we meet again next week to see a sample?", bucket: 1 },
              { text: "My friends would love it.", bucket: 0 },
              { text: "I'll sign up for the first three sessions now.", bucket: 1 },
            ],
          },
          probe: {
            type: "number",
            prompt: "You interview 40 parents about a summer coding camp. 32 say it's a great idea, and 10 pay a $25 deposit. What percent made a real commitment?",
            answer: 25,
            tolerance: 0.5,
            unit: "%",
            hint: "Commitment rate = people who paid a deposit divided by people interviewed, times 100.",
            mistakes: [
              { match: "80", coach: "That's the compliment rate (32 of 40). Count only the people who paid." },
              { match: "31.25", coach: "You divided by the 32 who liked it. Divide by everyone you interviewed: 40." },
              { match: "10", coach: "That's the number of people. Turn it into a percent of the 40 interviewed." },
            ],
            seconds: 45,
          },
          think: {
            q: "Of 30 people interviewed, 25 say 'great idea' and 3 prepay. What's the best evidence of demand?",
            choices: [
              "The 3 prepayments, a 10 percent commitment rate",
              "The 25 compliments, an 83 percent approval rate",
              "Both count the same",
              "Neither tells you anything",
            ],
            answer: 0,
            why: "Money on the table is a real commitment; compliments cost nothing to give.",
            hints: [
              "",
              "Compliments are cheap. How many put money behind their words?",
              "A deposit costs the customer something; a compliment doesn't. They aren't equal.",
              "Prepayments tell you a lot. Real customers spent real money.",
            ],
          },
          approaches: {
            analogy:
              "Saying 'I'll come to your party' is easy. Buying a plane ticket to get there is a commitment. Founders count tickets, not polite RSVPs.",
            example:
              "Marcus interviews 20 neighbors about a gutter-cleaning service. 15 say it's a good idea. He asks for a $20 deposit for a fall cleaning and 5 pay. Commitment rate = 5 / 20 = 0.25, or 25 percent. He now has $100 in deposits and five real customers, which is far better evidence than fifteen compliments.",
            simpler: {
              q: "Which response is a real commitment?",
              choices: ["Sounds great!", "I'd maybe try it.", "Here's a deposit for the first order."],
              answer: 2,
              why: "A deposit means the customer put money behind their words.",
              hints: [
                "That's a compliment. It costs nothing to say.",
                "'Maybe' is a polite guess, not a commitment.",
                "",
              ],
            },
          },
        },
        {
          title: "Size the opportunity",
          teach:
            "Even a real problem can be too small to support a business. A quick estimate tells you whether the opportunity is worth your time. Multiply three numbers: how many potential customers you can reach, the share who have the problem badly enough to pay, and what each would pay over a period. Suppose your town has 3,000 households. Your interviews suggest about 10 percent struggle to keep up with yard work and would pay $40 a month. That is 3,000 times 0.10, or 300 households, times $40, which is $12,000 a month of possible spending. You will never win all of it, but now you know the ceiling. If the number is tiny, that isn't failure. It's information that saves you months of building the wrong thing.",
          visual: {
            type: "hotspots",
            title: "Sizing the opportunity",
            center: "💰 Market",
            spots: [
              { label: "Reach", icon: "🏘️", detail: "How many potential customers can you actually reach? Example: 3,000 households in town." },
              { label: "Share", icon: "📊", detail: "What fraction have the problem badly enough to pay? Your interview numbers guide this. Example: 10 percent." },
              { label: "Price", icon: "🏷️", detail: "What would each pay per month or per year? Example: $40 a month." },
              { label: "Ceiling", icon: "📈", detail: "Multiply them: 3,000 x 0.10 x $40 = $12,000 a month of possible spending." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your county has 6,000 high school students. Interviews suggest 5% would pay $30 a month for a study-skills coaching service. How much possible spending is that per month?",
            answer: 9000,
            tolerance: 0,
            unit: "$",
            hint: "Customers = students x share. Then multiply customers by the monthly price.",
            mistakes: [
              { match: "300", coach: "That's the number of customers. Now multiply by what each pays per month." },
              { match: "180000", coach: "You skipped the 5%. Not every student has the problem." },
              { match: "900", coach: "Check your decimal: 5% is 0.05, so 6,000 x 0.05 = 300 students." },
            ],
            seconds: 50,
          },
          think: {
            q: "A town has 2,000 households. 5 percent would pay $50 a month for pet sitting. What's the monthly ceiling?",
            choices: ["$100,000", "$100", "$10,000", "$5,000"],
            answer: 3,
            why: "2,000 x 0.05 = 100 households, and 100 x $50 = $5,000 a month.",
            hints: [
              "That skips the 5 percent: not every household has the problem.",
              "That's the number of households with the problem, not dollars.",
              "That used 10 percent instead of 5 percent. Recheck: 2,000 x 0.05 = 100.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Before you open a lemonade stand, you'd want to know how many thirsty people walk by. Sizing the market is counting the thirsty people and what they'd spend.",
            example:
              "A school has 1,200 students. Interviews suggest 15 percent would pay $8 a month for a used-textbook swap service. Customers: 1,200 x 0.15 = 180. Ceiling: 180 x $8 = $1,440 a month. A nice side business, but not enough to hire a staff. Knowing that early shapes your plans.",
            simpler: {
              q: "100 customers each pay $20 a month. What's the monthly total?",
              choices: ["$120", "$2,000", "$200"],
              answer: 1,
              why: "100 x $20 = $2,000.",
              hints: [
                "That added 100 and 20. Each of the 100 customers pays $20, so multiply.",
                "",
                "Count the zeros again: 100 x 20 = 2,000.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each piece of evidence: does it show strong demand or weak demand?",
        buckets: ["Strong evidence", "Weak evidence"],
        items: [
          { text: "8 of 20 people paid a deposit", bucket: 0 },
          { text: "Everyone at dinner said it was clever", bucket: 1 },
          { text: "Customers already pay $30 a month for a clumsy workaround", bucket: 0 },
          { text: "You personally would love it", bucket: 1 },
          { text: "A local shop signed an agreement to order 50 units", bucket: 0 },
          { text: "People said they'd 'probably' buy it someday", bucket: 1 },
          { text: "Interviewees describe the problem happening every week", bucket: 0 },
          { text: "Nobody has ever mentioned the problem", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Explain how you would test whether a business idea solves a problem worth solving before building it. Use numbers in your answer.",
        keyPoints: [
          "Look for problems that are painful, frequent, and already cost time or money",
          "Interview people about specific past behavior, not hypothetical questions",
          "Count commitments like deposits or preorders, not compliments",
          "Estimate the market size by multiplying customers, share with the problem, and price",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "A city has 12,000 households. Your interviews suggest 4% would pay $25 a month for weekly bike maintenance. What's the monthly market ceiling in dollars?",
          answer: 12000,
          tolerance: 0,
          unit: "$",
          hint: "Households x share with the problem x monthly price.",
          mistakes: [
            { match: "480", coach: "That's the number of customers. Multiply by $25." },
            { match: "300000", coach: "You left out the 4%. Only some households have the problem." },
          ],
          seconds: 50,
        },
        {
          type: "highlight",
          prompt: "These are notes from five interviews about a meal-prep service. Tap every note that is real evidence of demand.",
          sentences: [
            "Ms. Park: 'Last month I spent about $200 on takeout because I had no time to cook.'",
            "Mr. Diaz: 'Sounds like a cool idea!'",
            "Mrs. Owens paid a $20 deposit for the first week.",
            "Coach Reed: 'I'd probably try it someday.'",
            "Mr. Lee: 'I tried two meal-kit services last year and quit both because the recipes took too long.'",
          ],
          correct: [0, 2, 4],
          hint: "Real evidence is money already spent, workarounds already tried, or a commitment.",
          mistakes: [
            { match: "Tapped 'Sounds like a cool idea!'", coach: "A compliment costs nothing. It's not evidence." },
            { match: "Missed Mr. Lee", coach: "He already spent money on two workarounds. That's a strong clue." },
          ],
          seconds: 50,
        },
        {
          type: "sequence",
          prompt: "Put the validation process in order.",
          steps: [
            "Notice a problem and list who might have it",
            "Write open questions about specific past behavior",
            "Interview potential customers and record exact words",
            "Ask for a commitment, like a deposit or preorder",
            "Count the results and estimate the market size",
            "Decide: build, adjust the idea, or move on",
          ],
          hint: "You can't ask for a commitment before you've talked to anyone, and you can't count until you've collected.",
          mistakes: [
            { match: "Put the commitment before the interviews", coach: "Learn about their problem first; then ask them to put money behind it." },
            { match: "Put the decision before counting", coach: "Decide only after the numbers are in." },
          ],
          seconds: 55,
        },
        {
          type: "match",
          prompt: "Match each term to its meaning.",
          pairs: [
            { left: "Workaround", right: "A clumsy fix people already use because nothing better exists" },
            { left: "Commitment", right: "A deposit, preorder, or signed agreement" },
            { left: "Compliment", right: "Polite praise that costs the speaker nothing" },
            { left: "Market ceiling", right: "Reachable customers x share with the problem x price" },
          ],
          hint: "Think about which ones are evidence, which are noise, and which is a calculation.",
          mistakes: [
            { match: "Mixed up commitment and compliment", coach: "A commitment costs the customer something. A compliment doesn't." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "Why did Edison's team count gas lamps in lower Manhattan before building an electric system?",
          choices: [
            "To sell gas lamps",
            "To learn who the customers were and what they already spent on light",
            "Because the city required it",
            "To find a place to live",
          ],
          answer: 1,
          why: "He studied existing demand first, so he knew the market before investing in wires and power stations.",
        },
        {
          q: "Which interview question is most useful?",
          choices: [
            "Would you buy this?",
            "Isn't this a great idea?",
            "What did you do the last time this problem happened?",
          ],
          answer: 2,
          why: "Questions about specific past behavior get facts instead of polite guesses.",
        },
        {
          q: "Which is the strongest evidence that customers want your product?",
          choices: [
            "Several people paid a deposit",
            "Your family likes it",
            "Many people said 'great idea'",
            "You've worked on it a long time",
          ],
          answer: 0,
          why: "Deposits are commitments: people put money behind their interest.",
        },
        {
          q: "A town has 4,000 households; 10 percent would pay $15 a month. What is the monthly market ceiling?",
          choices: ["$60,000", "$400", "$1,500", "$6,000"],
          answer: 3,
          why: "4,000 x 0.10 = 400 households, and 400 x $15 = $6,000 a month.",
        },
        {
          q: "Your interviews show the problem is real but very rare. What's the smartest response?",
          choices: [
            "Build it anyway and hope",
            "Treat it as useful information and consider a different problem",
            "Stop interviewing and start advertising",
          ],
          answer: 1,
          why: "A small market is information that saves time and money; adjust or move on.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: with a parent's okay (and a parent present for anyone outside your family's circle), interview 5 potential customers about a problem you think is worth solving. Prepare at least 5 questions about specific past behavior. Record exact quotes. Then ask each person for a small commitment (a deposit, a sign-up, or a second meeting). Build a table showing who had the problem, what they already spend, and who committed. Finish with a market-size estimate and your decision: build, adjust, or move on.",
        rubric: [
          "Interviewed 5 real people with a parent's okay",
          "Questions ask about specific past behavior, not hypothetical opinions",
          "Includes a table with exact quotes, money already spent, and commitments",
          "Calculates a commitment rate and a market-size estimate correctly",
          "States a clear decision backed by the evidence",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 2. Unit economics
    // ------------------------------------------------------------------
    {
      id: "business-hs.unit-economics",
      title: "Unit Economics",
      minutes: 40,
      stage: "logic",
      read: `In 1908 Henry Ford introduced the Model T at about $850, more than many working families could afford. Ford was obsessed with one number: what it cost to build a single car. In 1913 his Highland Park plant began using a moving assembly line, and the time to assemble a chassis fell from more than 12 hours to about an hour and a half. As the cost per car dropped, Ford cut the price again and again. By the mid-1920s a basic Model T cost less than $300, and Ford had sold millions of them.

Ford understood unit economics: the money a business makes or loses on one unit, whether that unit is a car, a candle, or a customer.

Start with the cost per unit, sometimes called variable cost. These are the costs that rise with every sale: materials, packaging, shipping, and payment fees. Fixed costs, like equipment or rent, stay the same no matter how many you sell.

Next is gross margin, the share of each sale left after paying for the unit itself. The formula is price minus cost per unit, divided by price. A candle that sells for $20 and costs $5 to make leaves $15 of gross profit, a 75 percent gross margin.

Then there's the cost of finding customers. Customer acquisition cost, or CAC, is your marketing spending divided by the number of new customers it brought in. Spend $600 on a fair booth and flyers, win 40 customers, and your CAC is $15.

Finally, lifetime value, or LTV, is the gross profit a typical customer brings over the whole time they buy from you. If a candle customer orders four times a year for two years and each order earns $15 of gross profit, their lifetime value is $120.

A rule of thumb many founders use: LTV should be at least three times CAC. If it costs more to win a customer than that customer will ever earn you, growing faster only loses money faster.`,
      keyIdeas: [
        "Cost per unit (variable cost) rises with every sale; fixed costs don't.",
        "Gross margin = (price - cost per unit) / price.",
        "CAC = marketing spending / new customers won.",
        "LTV = gross profit per order x orders per year x years; aim for LTV at least 3x CAC.",
      ],
      hook: {
        text: "In 1908, Henry Ford's Model T cost about $850. Ford kept cutting the price, until by the mid-1920s a basic Model T cost less than $300. He charged less and less and still built a fortune. How can charging less make a business richer? The answer is hidden in one number: what it cost to build one car.",
      },
      teach: [
        {
          title: "Cost per unit",
          teach:
            "Unit economics means the money you make or lose on a single unit. Start with the cost per unit, also called variable cost: everything you spend that rises with each sale. For a hand-poured candle that might be wax at $2.10, a wick at $0.15, a glass jar at $1.25, a label at $0.30, and a shipping box at $0.70. Add them: $4.50 per candle. Don't forget payment fees. If a card processor keeps 3 percent of a $20 sale, that's another $0.60. Fixed costs are different. A $200 melting pot or a monthly website fee stays the same whether you sell 10 candles or 1,000. Henry Ford's genius was attacking cost per unit. His moving assembly line, begun in 1913, cut the time to build a car dramatically, and lower costs let him cut prices.",
          visual: {
            type: "flip",
            cards: [
              { front: "Unit economics", back: "The money you make or lose on one unit: one product, one order, or one customer." },
              { front: "Variable cost (cost per unit)", back: "Costs that rise with every sale: materials, packaging, shipping, payment fees." },
              { front: "Fixed cost", back: "Costs that stay the same no matter how many you sell: equipment, rent, a website plan." },
              { front: "Payment fee", back: "The slice a card processor keeps. 3 percent of a $20 sale is $0.60." },
            ],
          },
          probe: {
            type: "number",
            prompt: "You sell printed T-shirts for $25. Each one needs a blank shirt ($4.50), ink ($1.20), and a mailer bag ($0.80), and the card processor keeps 3% of the sale price. What is the total cost per unit?",
            answer: 7.25,
            tolerance: 0.01,
            unit: "$",
            hint: "Add the three material costs, then add 3% of the $25 price.",
            mistakes: [
              { match: "6.5", coach: "You forgot the payment fee: 3% of $25 is $0.75." },
              { match: "6.62", coach: "The 3% fee comes from the $25 sale price, not from your costs." },
              { match: "28", coach: "That's not a cost per unit. Add up only what you spend on each shirt." },
            ],
            seconds: 60,
          },
          think: {
            q: "Which of these is a variable cost for a cookie business?",
            choices: [
              "A $300 stand mixer",
              "A yearly business license",
              "Flour and butter for each batch",
              "A website subscription",
            ],
            answer: 2,
            why: "Ingredients rise with every batch you bake, so they are variable costs.",
            hints: [
              "You buy the mixer once, whether you bake 10 cookies or 10,000. That's fixed.",
              "The license costs the same no matter how many you sell. That's fixed.",
              "",
              "A subscription is the same each month regardless of sales. That's fixed.",
            ],
          },
          approaches: {
            analogy:
              "Think of a road trip. Gas is a variable cost: the more miles you drive, the more you buy. The car itself is a fixed cost: you paid for it whether you drive 10 miles or 1,000.",
            example:
              "Soap bars: oils $1.40, fragrance $0.35, wrapper $0.25, and a 3 percent fee on an $8 sale ($0.24). Cost per unit = 1.40 + 0.35 + 0.25 + 0.24 = $2.24. The $150 soap mold isn't included, because it's a fixed cost you pay only once.",
            simpler: {
              q: "Materials cost $3 and packaging costs $1 per item. What's the cost per unit?",
              choices: ["$3", "$4", "$2"],
              answer: 1,
              why: "$3 + $1 = $4 for each item.",
              hints: [
                "That leaves out the packaging. Every item needs both.",
                "",
                "That subtracted. Costs add up.",
              ],
            },
          },
        },
        {
          title: "Gross margin",
          teach:
            "Gross margin tells you what share of each sale is left after paying for the unit itself. The formula: price minus cost per unit, divided by price. A candle that sells for $20 and costs $5 leaves $15 of gross profit, and $15 divided by $20 is 0.75, a 75 percent gross margin. That leftover pays for everything else: equipment, marketing, a website, and eventually your own profit. Low margins aren't automatically bad. A grocery store may keep only a small slice of each sale but sell enormous volumes. A handmade product sold in small numbers usually needs a high margin to survive. Slide the price in the calculator and watch how quickly profit disappears as price creeps toward cost.",
          visual: { type: "profit", price: 20, cost: 5, fixed: 200, units: 30 },
          probe: {
            type: "number",
            prompt: "Your T-shirt sells for $25 and costs $7.25 per unit. What is your gross margin, as a percent?",
            answer: 71,
            tolerance: 0.5,
            unit: "%",
            hint: "Gross margin = (price - cost) / price. Then multiply by 100.",
            mistakes: [
              { match: "17.75", coach: "That's gross profit in dollars. Divide it by the $25 price to get a percent." },
              { match: "29", coach: "That's the cost as a share of the price. Margin is what's left over." },
              { match: "245", coach: "You divided by the cost. Margin divides by the price." },
            ],
            seconds: 50,
          },
          think: {
            q: "A mug sells for $16 and costs $4 to make. What is its gross margin?",
            choices: ["75 percent", "25 percent", "$12", "300 percent"],
            answer: 0,
            why: "($16 - $4) / $16 = $12 / $16 = 0.75, or 75 percent.",
            hints: [
              "",
              "That's the cost's share of the price. Margin is the part left over.",
              "$12 is the gross profit in dollars. Divide it by the price to get a percent.",
              "That divided by the cost instead of the price.",
            ],
          },
          approaches: {
            analogy:
              "Gross margin is like the share of a paycheck left after paying for your bus fare to work. The bigger the share left over, the more you have for everything else.",
            example:
              "A notebook sells for $12 and costs $3. Gross profit = 12 - 3 = $9. Gross margin = 9 / 12 = 0.75 = 75 percent. If the price drops to $6, gross profit = $3 and margin = 3 / 6 = 50 percent. Cutting price by half cut profit per notebook by two-thirds.",
            simpler: {
              q: "An item sells for $10 and costs $4. What is the gross profit in dollars?",
              choices: ["$14", "$4", "$6"],
              answer: 2,
              why: "$10 - $4 = $6 left after paying for the item.",
              hints: [
                "That added the cost. Gross profit subtracts it.",
                "That's the cost, not what's left.",
                "",
              ],
            },
          },
        },
        {
          title: "Customer acquisition cost",
          teach:
            "A product nobody hears about sells nothing, and getting heard costs money. Customer acquisition cost, or CAC, is your total marketing and sales spending divided by the number of new customers it brought in. Suppose you spend $350 on a booth at a craft fair and $250 on printed flyers, and those efforts bring in 40 new customers. Your CAC is $600 divided by 40, or $15 per customer. Measure CAC for each channel separately. If the fair produced 30 customers for $350 and the flyers produced only 10 for $250, the fair's CAC is about $11.67 and the flyers' CAC is $25. Now you know where your next dollar should go. Founders who never measure CAC often spend heavily on the channel that feels busiest, not the one that works.",
          visual: {
            type: "compare",
            left: {
              title: "Craft fair",
              points: ["Spent $350", "30 new customers", "CAC = $350 / 30 = about $11.67"],
            },
            right: {
              title: "Printed flyers",
              points: ["Spent $250", "10 new customers", "CAC = $250 / 10 = $25"],
            },
          },
          probe: {
            type: "number",
            prompt: "Last month you spent $900 on online ads and won 36 new customers from them. What was your customer acquisition cost (CAC)?",
            answer: 25,
            tolerance: 0.01,
            unit: "$",
            hint: "CAC = marketing spending divided by the new customers it brought in.",
            mistakes: [
              { match: "0.04", coach: "You flipped the division. Divide the dollars by the customers." },
              { match: "864", coach: "That subtracted. CAC divides spending by customers." },
            ],
            seconds: 40,
          },
          think: {
            q: "Channel A: $400 spent, 20 customers. Channel B: $300 spent, 30 customers. Which has the lower CAC?",
            choices: [
              "Channel A, because it spent more",
              "Channel B, at $10 per customer",
              "They are the same",
              "Channel A, at $10 per customer",
            ],
            answer: 1,
            why: "A: $400 / 20 = $20. B: $300 / 30 = $10. B wins customers for half the cost.",
            hints: [
              "Spending more isn't the goal. Divide spending by customers for each.",
              "",
              "Do the division for each: they come out different.",
              "Check A again: $400 / 20 = $20, not $10.",
            ],
          },
          approaches: {
            analogy:
              "CAC is like the cost of bait per fish caught. If one bait catches a fish every time and another catches one fish per bucket, you know which bait to buy next time.",
            example:
              "A tutoring founder spends $120 on school-newsletter ads and gets 4 students (CAC $30), and $60 on printed flyers at the library and gets 6 students (CAC $10). Next month she shifts most of her budget to library flyers and tracks the results again.",
            simpler: {
              q: "You spend $100 and win 10 customers. What's the cost per customer?",
              choices: ["$1,000", "$10", "$110"],
              answer: 1,
              why: "$100 / 10 customers = $10 each.",
              hints: [
                "That multiplied. Share the $100 across the 10 customers.",
                "",
                "That added. Divide the spending by the customers.",
              ],
            },
          },
        },
        {
          title: "Lifetime value and the 3-to-1 rule",
          teach:
            "Lifetime value, or LTV, is the gross profit a typical customer brings over the whole time they buy from you. Multiply gross profit per order by orders per year by the number of years they stay. If a candle customer orders four times a year for two years and each order earns $15 of gross profit, their LTV is 15 times 4 times 2, or $120. Now compare LTV to CAC. Many founders use a rule of thumb: LTV should be at least three times CAC. With an LTV of $120 and a CAC of $15, the ratio is 8 to 1, which is very healthy. But if winning each customer cost $150, every new customer would lose you money, and growing faster would only lose money faster. That's why loyal, returning customers are so valuable.",
          visual: {
            type: "hotspots",
            title: "Lifetime value",
            center: "🧑 One customer",
            spots: [
              { label: "Profit per order", icon: "💵", detail: "Gross profit on each order. Example: $15 per candle order." },
              { label: "Orders per year", icon: "🔁", detail: "How often a typical customer buys. Example: 4 times a year." },
              { label: "Years", icon: "📅", detail: "How long a typical customer keeps buying. Example: 2 years." },
              { label: "LTV vs CAC", icon: "⚖️", detail: "LTV = 15 x 4 x 2 = $120. With a $15 CAC, the ratio is 8 to 1. Aim for at least 3 to 1." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A coffee-bean subscription earns $6 of gross profit per month. A typical subscriber stays 10 months. It costs $20 in marketing to win each subscriber. What is the LTV-to-CAC ratio (LTV divided by CAC)?",
            answer: 3,
            tolerance: 0.01,
            hint: "First LTV = $6 x 10 months. Then divide LTV by the $20 CAC.",
            mistakes: [
              { match: "60", coach: "That's the LTV. Now divide it by the $20 CAC." },
              { match: "0.33", coach: "You divided CAC by LTV. Put LTV on top." },
              { match: "40", coach: "That subtracted. The ratio divides LTV by CAC." },
            ],
            seconds: 55,
          },
          think: {
            q: "A customer brings $40 of gross profit a year and stays 3 years. CAC is $60. Is this healthy by the 3-to-1 rule?",
            choices: [
              "No, LTV is only 1 times CAC",
              "Yes, LTV is $40, which is close to $60",
              "Yes, LTV is $120, which is exactly 2 times CAC, more than enough",
              "No, LTV is $120, only 2 times CAC",
            ],
            answer: 3,
            why: "LTV = $40 x 3 = $120. $120 / $60 = 2, which is below the 3-to-1 target.",
            hints: [
              "Multiply by all 3 years first: the LTV is larger than $60.",
              "LTV covers the whole time a customer stays, not just one year.",
              "2 times is below the 3-to-1 rule of thumb, so it isn't enough.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Planting a fruit tree costs money once, but it gives fruit year after year. CAC is the cost of planting; LTV is all the fruit the tree will ever give. You want far more fruit than planting cost.",
            example:
              "A lawn service earns $25 gross profit per mow, mows each customer 20 times a season, and keeps customers 2 seasons. LTV = 25 x 20 x 2 = $1,000. Door hangers cost $200 and bring 4 customers, so CAC = $50. Ratio = 1,000 / 50 = 20 to 1. Excellent.",
            simpler: {
              q: "A customer earns you $10 profit per order and orders 5 times in total. What is their lifetime value?",
              choices: ["$15", "$2", "$50"],
              answer: 2,
              why: "$10 x 5 orders = $50.",
              hints: [
                "That added. Each of the 5 orders earns $10.",
                "That divided. Multiply profit per order by the number of orders.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "A small candle company has these costs. Sort each one.",
        buckets: ["Variable cost per unit", "Fixed cost", "Customer acquisition"],
        items: [
          { text: "Wax for each candle", bucket: 0 },
          { text: "Glass jar for each candle", bucket: 0 },
          { text: "3% card fee on each sale", bucket: 0 },
          { text: "A $200 melting pot", bucket: 1 },
          { text: "Monthly website plan", bucket: 1 },
          { text: "Craft fair booth to meet new buyers", bucket: 2 },
          { text: "Printed flyers advertising the shop", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Explain unit economics to a friend who wants to start a business. Walk through cost per unit, gross margin, CAC and LTV, with numbers from an example.",
        keyPoints: [
          "Cost per unit includes every cost that rises with each sale",
          "Gross margin is price minus cost per unit, divided by price",
          "CAC is marketing spending divided by new customers",
          "LTV is gross profit per order times orders over the customer's lifetime",
          "LTV should be well above CAC, about three times or more",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "Your shirts cost $7.25 each. You paid $300 for a heat press and expect to sell 60 shirts this season. Slide the price until profit is at least $600.",
          goal: { sim: "profit", cost: 7.25, fixed: 300, units: 60, minProfit: 600 },
          hint: "You need $600 profit plus $300 to pay back the press: $900 across 60 shirts. Add that to the cost per shirt.",
          mistakes: [
            { match: "Price around $15", coach: "$15 per shirt covers the $900 but forgets the $7.25 each shirt costs." },
            { match: "Price around $17", coach: "Close, but that covers the press and costs without the full $600 goal." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "A phone stand sells for $30. Materials cost $9, packaging $2, and shipping $4. What is the gross margin, as a percent?",
          answer: 50,
          tolerance: 0.5,
          unit: "%",
          hint: "Add the three costs, subtract from the price, then divide by the price.",
          mistakes: [
            { match: "15", coach: "That's the gross profit in dollars. Divide it by the $30 price." },
            { match: "70", coach: "You only counted materials. Include packaging and shipping too." },
          ],
          seconds: 55,
        },
        {
          type: "match",
          prompt: "Match each measure to how you calculate it.",
          pairs: [
            { left: "Cost per unit", right: "Add every cost that rises with one sale" },
            { left: "Gross margin", right: "(Price - cost per unit) / price" },
            { left: "CAC", right: "Marketing spending / new customers" },
            { left: "LTV", right: "Gross profit per order x number of orders over time" },
          ],
          hint: "Margins are about one sale. CAC and LTV are about one customer.",
          mistakes: [
            { match: "Mixed up CAC and LTV", coach: "CAC is what you spend to win a customer. LTV is what they earn you over time." },
          ],
          seconds: 45,
        },
        {
          type: "sort",
          prompt: "Use the 3-to-1 rule. Which businesses have healthy unit economics?",
          buckets: ["Healthy (LTV at least 3x CAC)", "Unhealthy"],
          items: [
            { text: "LTV $300, CAC $50", bucket: 0 },
            { text: "LTV $90, CAC $60", bucket: 1 },
            { text: "LTV $120, CAC $40", bucket: 0 },
            { text: "LTV $45, CAC $45", bucket: 1 },
            { text: "LTV $1,000, CAC $80", bucket: 0 },
            { text: "LTV $200, CAC $250", bucket: 1 },
          ],
          hint: "Divide LTV by CAC for each one. 3 or higher is healthy.",
          mistakes: [
            { match: "Put LTV $90, CAC $60 in healthy", coach: "90 / 60 = 1.5. That's profitable per customer, but well below 3 to 1." },
            { match: "Put LTV $120, CAC $40 in unhealthy", coach: "120 / 40 = 3 exactly, which meets the rule." },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "How did Henry Ford lower the price of the Model T and still prosper?",
          choices: [
            "He used cheaper paint",
            "He stopped advertising",
            "He cut the cost to build each car, especially with the moving assembly line",
            "He sold fewer cars at higher prices",
          ],
          answer: 2,
          why: "Lower cost per unit let him cut prices, sell millions more cars, and still earn a profit.",
        },
        {
          q: "Which is a FIXED cost for a bakery?",
          choices: ["The oven", "Flour", "Boxes for each cake", "Card fees on each sale"],
          answer: 0,
          why: "The oven costs the same whether you bake a little or a lot.",
        },
        {
          q: "A bracelet sells for $20 and costs $8. What is the gross margin?",
          choices: ["40 percent", "$8", "250 percent", "60 percent"],
          answer: 3,
          why: "($20 - $8) / $20 = $12 / $20 = 0.60, or 60 percent.",
        },
        {
          q: "You spend $500 on marketing and win 25 customers. What is your CAC?",
          choices: ["$12.50", "$20", "$525", "$475"],
          answer: 1,
          why: "$500 / 25 = $20 per customer.",
        },
        {
          q: "Why is it dangerous when CAC is higher than LTV?",
          choices: [
            "Customers will complain",
            "It means prices are too low to advertise",
            "Each new customer loses money, so growing faster loses money faster",
          ],
          answer: 2,
          why: "If winning a customer costs more than they'll ever earn you, every sale makes the hole deeper.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Pick a real product or service you could sell (or the idea from your interviews). Research real prices for every input. Write up its unit economics: list each variable cost and total the cost per unit, choose a price and calculate the gross margin, estimate CAC for one marketing channel, and estimate LTV. Finish with the LTV-to-CAC ratio and one change that would improve it.",
        rubric: [
          "Lists every variable cost with realistic prices and totals the cost per unit",
          "Calculates gross margin correctly from a stated price",
          "Estimates CAC for a specific marketing channel and shows the math",
          "Estimates LTV with stated assumptions and computes the LTV-to-CAC ratio",
          "Suggests a specific, sensible improvement",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 3. Pricing strategy and break-even
    // ------------------------------------------------------------------
    {
      id: "business-hs.pricing",
      title: "Pricing Strategy and Break-Even",
      minutes: 40,
      stage: "logic",
      read: `In 1945 Sam Walton took over a small variety store in Newport, Arkansas. He soon noticed something that shaped the rest of his career. If he bought an item for 80 cents and priced it at $1.20, it sold steadily. Priced at $1.00, it sold about three times as many. He made only half as much on each one, but because volume tripled, his total profit went up. Walton later built a chain of discount stores on that idea.

Every business must choose a price, and there are three main ways to think about it.

Cost-plus pricing starts with your cost per unit and adds a markup. A bracelet that costs $8 to make, with a 50 percent markup, sells for $12. It's simple and covers your costs, but it ignores what customers will pay. Be careful: a 50 percent markup is not a 50 percent margin. The $4 profit is 50 percent of the cost but only about 33 percent of the price.

Competitive pricing looks at what similar products sell for. You can price below competitors to win volume, as Walton did, match them and compete on service, or price above them if you offer something clearly better. Walton was famous for walking through competitors' stores and taking notes.

Value-based pricing starts with the customer. What is solving this problem worth to them? If a service saves a small-business owner ten hours a month and her time is worth $30 an hour, that's $300 of value. You might charge $150, and both sides win.

Whatever price you choose, know your break-even point: the number of units you must sell to cover your fixed costs. Divide fixed costs by contribution per unit, which is price minus variable cost. With a $450 heat press, a $30 shirt price, and a $12 variable cost, each sale contributes $18, so you need 450 divided by 18, or 25 shirts, before you earn a profit.

Good founders use all three views: cost sets the floor, value sets the ceiling, and competitors show where customers will compare you.`,
      keyIdeas: [
        "Cost-plus: price = cost + markup. Markup (on cost) is not the same as margin (on price).",
        "Competitive pricing compares you with alternatives; lower prices only win if volume rises enough.",
        "Value-based pricing asks what solving the problem is worth to the customer.",
        "Break-even units = fixed costs / (price - variable cost per unit).",
      ],
      hook: {
        text: "Sam Walton once bought an item for 80 cents. Priced at $1.20, it sold steadily. Priced at $1.00, it sold about three times as many, even though he earned half as much on each one. Did lowering the price make him more money or less? Grab a pencil, because the answer changed how he ran his stores.",
      },
      teach: [
        {
          title: "Cost-plus pricing",
          teach:
            "The simplest pricing method is cost-plus. Take your cost per unit and add a markup, a percentage of the cost. A bracelet costs $8 to make. With a 50 percent markup, you add $4 and charge $12. Cost-plus is easy and makes sure every sale covers its own costs. But it has two weaknesses. It ignores what customers would happily pay, so you might leave money on the table. And it confuses many founders, because markup and margin are different. Markup compares profit to cost: $4 divided by $8 is 50 percent. Margin compares profit to price: $4 divided by $12 is about 33 percent. If a supplier or investor asks for your margin and you give them your markup, your business will look healthier than it really is.",
          visual: {
            type: "flip",
            cards: [
              { front: "Markup", back: "Profit as a share of COST. $4 profit on an $8 cost = 50 percent markup." },
              { front: "Margin", back: "Profit as a share of PRICE. $4 profit on a $12 price = about 33 percent margin." },
              { front: "Cost-plus pricing", back: "Price = cost per unit + a markup. Simple, but it ignores what customers value." },
              { front: "Price floor", back: "Your cost per unit. Price below it and you lose money on every sale." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A wooden cutting board costs you $14 to make. You use cost-plus pricing with a 40% markup. What price do you charge?",
            answer: 19.6,
            tolerance: 0.01,
            unit: "$",
            hint: "Markup is a percent of the cost. Find 40% of $14, then add it to $14.",
            mistakes: [
              { match: "5.6", coach: "That's the markup amount. Add it to the $14 cost to get the price." },
              { match: "23.33", coach: "That price gives a 40% MARGIN. Markup is figured on cost: $14 x 1.40." },
              { match: "54", coach: "Markup is a percent of the cost, not $40 added." },
            ],
            seconds: 45,
          },
          think: {
            q: "An item costs $10 and sells for $15. Which statement is correct?",
            choices: [
              "Markup is 33 percent and margin is 50 percent",
              "Markup and margin are both 50 percent",
              "Markup is 150 percent",
              "Markup is 50 percent and margin is about 33 percent",
            ],
            answer: 3,
            why: "Profit is $5. $5 / $10 cost = 50 percent markup. $5 / $15 price = about 33 percent margin.",
            hints: [
              "You swapped them. Markup divides by cost; margin divides by price.",
              "They use different bottoms: cost for markup, price for margin.",
              "That's price divided by cost. Markup only counts the profit part: $5.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Markup and margin are like measuring the same fence from two different starting posts. The fence (your $4 profit) doesn't change, but measured against cost it looks bigger than measured against price.",
            example:
              "Candles cost $6. A 50 percent markup adds $3, so the price is $9. Margin = $3 / $9 = 33 percent. If you wanted a 50 percent MARGIN instead, the price would need to be $12, because $6 profit / $12 price = 50 percent.",
            simpler: {
              q: "An item costs $20. With a 50 percent markup, what's the price?",
              choices: ["$30", "$10", "$70"],
              answer: 0,
              why: "50 percent of $20 is $10. $20 + $10 = $30.",
              hints: [
                "",
                "That's just the markup amount. Add it to the $20 cost.",
                "Markup is a percent of the cost, not $50 added.",
              ],
            },
          },
        },
        {
          title: "Competitive pricing and volume",
          teach:
            "Competitive pricing looks outward: what do similar products sell for? You have three choices. Price below competitors to win more customers, match them and compete on service or convenience, or price above them if you offer something clearly better. Sam Walton chose low prices and high volume. He bought an item for 80 cents. At $1.20 he earned 40 cents each. At $1.00 he earned only 20 cents each, but he sold about three times as many. If he sold 100 at the higher price, that's $40 of profit. At the lower price, 300 sales at 20 cents is $60. Lower price, more profit. That only works when lower prices truly bring many more buyers and costs stay under control. Walton studied competitors constantly, walking their aisles and taking notes.",
          visual: {
            type: "compare",
            left: {
              title: "Price $1.20",
              points: ["Cost 80 cents", "Profit 40 cents each", "Sells about 100", "Total profit about $40"],
            },
            right: {
              title: "Price $1.00",
              points: ["Cost 80 cents", "Profit 20 cents each", "Sells about 300", "Total profit about $60"],
            },
          },
          probe: {
            type: "number",
            prompt: "A shop buys phone cases for $6. At $10 it sells 50 a month. At $9 it sells 90 a month. How much MORE profit per month does it make at $9?",
            answer: 70,
            tolerance: 0,
            unit: "$",
            hint: "Profit = (price - cost) x units. Work out both prices, then subtract.",
            mistakes: [
              { match: "270", coach: "That's the total profit at $9. Subtract the profit at $10 ($200)." },
              { match: "200", coach: "That's the profit at $10. Find the profit at $9 and compare." },
              { match: "40", coach: "That's the extra cases sold. Turn both choices into dollars of profit." },
            ],
            seconds: 60,
          },
          think: {
            q: "Lowering your price raises profit only when...",
            choices: [
              "competitors also lower their prices",
              "you have no fixed costs",
              "the price is above $1",
              "sales volume rises enough to make up for the smaller profit per unit",
            ],
            answer: 3,
            why: "Each sale earns less, so total profit rises only if you sell enough extra units.",
            hints: [
              "If competitors match you, you may not win any extra customers at all.",
              "Fixed costs don't decide this. Compare profit per unit times units sold.",
              "The size of the price doesn't matter. What matters is how many more you sell.",
              "",
            ],
          },
          approaches: {
            analogy:
              "It's like choosing between a few big fish and many small ones. Many small fish can outweigh a few big ones, but only if you really catch a lot more of them.",
            example:
              "Granola bars cost $1. At $3, 100 sell: profit = $2 x 100 = $200. At $2.50, 160 sell: profit = $1.50 x 160 = $240. The lower price wins. But if only 120 sold at $2.50, profit = $180, and the lower price would lose.",
            simpler: {
              q: "You earn $2 profit each on 50 sales. What's the total profit?",
              choices: ["$52", "$25", "$100"],
              answer: 2,
              why: "$2 x 50 = $100.",
              hints: [
                "That added. Each of the 50 sales earns $2.",
                "That divided. Multiply profit each by the number sold.",
                "",
              ],
            },
          },
        },
        {
          title: "Value-based pricing",
          teach:
            "Value-based pricing starts with the customer instead of your costs. Ask: what is solving this problem worth to them? Suppose you offer bookkeeping help to a small bakery. The owner says it would save her 10 hours a month, and she values her time at $30 an hour. That's $300 a month of value. Your cost might be only $40 in software and supplies, but you don't have to charge $50. You could charge $150: she keeps $150 of value beyond the price, and you earn a strong profit. Your interviews are where you find these numbers. Listen for time lost, money wasted, and what people already pay for clumsy workarounds. Cost sets the floor for your price. Value sets the ceiling. The best price lives somewhere between.",
          visual: {
            type: "hotspots",
            title: "Where your price lives",
            center: "🏷️ Your price",
            spots: [
              { label: "Floor: cost", icon: "⬇️", detail: "Price below your cost per unit and you lose money on every sale." },
              { label: "Ceiling: value", icon: "⬆️", detail: "No one pays more than solving the problem is worth to them." },
              { label: "Competitors", icon: "🏪", detail: "Customers compare you with alternatives, so know what they cost." },
              { label: "Interviews", icon: "🗣️", detail: "Customers' own numbers (hours lost, money spent) reveal the value." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your lawn crew saves a homeowner 4 hours every week. She values her time at $25 an hour. How much value does your service create for her in a 4-week month?",
            answer: 400,
            tolerance: 0,
            unit: "$",
            hint: "Hours per week x value per hour x weeks in the month.",
            mistakes: [
              { match: "100", coach: "That's one week. Multiply by the 4 weeks in the month." },
              { match: "33", coach: "Add up the value of all the hours saved: multiply, don't add." },
            ],
            seconds: 45,
          },
          think: {
            q: "Your service costs you $40 to deliver and saves a client $300 of time. Which price fits value-based pricing best?",
            choices: ["$35", "$150", "$400", "$45"],
            answer: 1,
            why: "$150 is well above your cost and well below the $300 of value, so both sides win.",
            hints: [
              "That's below your $40 cost, so you'd lose money on every job.",
              "",
              "That's more than the $300 it's worth to her. Why would she pay it?",
              "That's cost-plus thinking. It ignores the $300 of value you create.",
            ],
          },
          approaches: {
            analogy:
              "A locksmith who opens your car in two minutes isn't selling two minutes of work; he's selling the relief of getting home. Value pricing charges for the relief, not just the minutes.",
            example:
              "A teen offers to set up online booking for a piano teacher. It costs him about $20 in software. The teacher spends 5 hours a month on scheduling calls and values her time at $40 an hour, or $200 a month. He charges a $75 setup fee and $40 a month. She saves $160 a month after his fee, and he earns well above his cost.",
            simpler: {
              q: "A service saves someone 2 hours, and their time is worth $20 an hour. How much value is that?",
              choices: ["$22", "$40", "$10"],
              answer: 1,
              why: "2 hours x $20 = $40 of value.",
              hints: [
                "That added. Each of the 2 hours is worth $20.",
                "",
                "That divided. Multiply hours by value per hour.",
              ],
            },
          },
        },
        {
          title: "Break-even analysis",
          teach:
            "Every pricing decision should be tested with a break-even analysis. Break-even is the number of units you must sell to cover your fixed costs. First find contribution per unit: price minus variable cost per unit. That's what each sale contributes toward fixed costs. Then divide fixed costs by contribution. Suppose you buy a $450 heat press to print custom shirts. Each shirt sells for $30 and costs $12 in materials. Each sale contributes $18, so you need $450 divided by $18, or 25 shirts, to break even. Shirt 26 is where real profit begins. Notice how price changes everything. At $24, each shirt contributes only $12, and you'd need 37.5, which rounds up to 38 shirts. Try the calculator: change the price and watch the break-even point move.",
          visual: { type: "profit", price: 30, cost: 12, fixed: 450, units: 25 },
          probe: {
            type: "number",
            prompt: "You spend $2,400 on equipment for a mobile car-detailing service. Each detail sells for $40 and uses $16 of supplies. How many details must you sell to break even?",
            answer: 100,
            tolerance: 0,
            unit: "details",
            hint: "Break-even = fixed costs / (price - variable cost).",
            mistakes: [
              { match: "60", coach: "You divided by the price. Divide by the contribution: $40 - $16 = $24." },
              { match: "150", coach: "You divided by the variable cost. Each detail contributes $24, not $16." },
              { match: "24", coach: "That's the contribution per detail. Now divide the $2,400 by it." },
            ],
            seconds: 55,
          },
          think: {
            q: "Fixed costs are $600. Price is $25 and variable cost is $10. What is the break-even point?",
            choices: ["24 units", "60 units", "40 units", "15 units"],
            answer: 2,
            why: "Contribution = $25 - $10 = $15. $600 / $15 = 40 units.",
            hints: [
              "That divided by the price. Use the contribution: price minus variable cost.",
              "That divided by the variable cost. Each sale contributes $15.",
              "",
              "$15 is the contribution per unit, not the number of units.",
            ],
          },
          approaches: {
            analogy:
              "Break-even is like filling a bucket with a cup. The bucket is your fixed costs; the cup is how much each sale contributes. Bigger cup, fewer trips.",
            example:
              "A snow-cone cart costs $300. Each cone sells for $4 and costs $1.50 in ice, syrup and cup. Contribution = $2.50. Break-even = 300 / 2.50 = 120 cones. Raise the price to $5 and contribution becomes $3.50: break-even = 300 / 3.50 = 85.7, so 86 cones.",
            simpler: {
              q: "Each sale contributes $10 toward a $100 cost. How many sales to cover it?",
              choices: ["10", "110", "1,000"],
              answer: 0,
              why: "$100 / $10 = 10 sales.",
              hints: [
                "",
                "That added. How many $10s fit into $100?",
                "That multiplied. Divide the cost by the contribution.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which pricing approach is each founder using?",
        buckets: ["Cost-plus", "Competitive", "Value-based"],
        items: [
          { text: "Adds 60 percent to what each mug costs to make", bucket: 0 },
          { text: "Doubles the material cost of each birdhouse", bucket: 0 },
          { text: "Sets the price 10 percent below the shop across the street", bucket: 1 },
          { text: "Checks five similar tutors' rates and matches the average", bucket: 1 },
          { text: "Charges based on the 8 hours a month the client saves", bucket: 2 },
          { text: "Prices a repair by how much it saves the customer on a replacement", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "You're advising a friend who wants to sell custom phone cases. Explain how they should set a price using all three methods, and how to find their break-even point.",
        keyPoints: [
          "Cost-plus adds a markup to cost; markup is not the same as margin",
          "Competitive pricing compares with similar products and depends on volume",
          "Value-based pricing uses what the solution is worth to the customer",
          "Cost is the floor and value is the ceiling",
          "Break-even equals fixed costs divided by price minus variable cost",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "Your heat press cost $450 and each shirt costs $12 to make. You expect to sell 40 shirts. Slide the price until profit is at least $270.",
          goal: { sim: "profit", cost: 12, fixed: 450, units: 40, minProfit: 270 },
          hint: "You need $270 + $450 = $720 across 40 shirts, plus the $12 each shirt costs.",
          mistakes: [
            { match: "Price around $18", coach: "$18 per shirt covers the $720 but forgets the $12 materials cost." },
            { match: "Price around $23", coach: "That pays back the press, but doesn't reach $270 of profit." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "A mobile phone-repair kit costs $900. Each repair sells for $60 and uses $24 of parts. How many repairs to break even?",
          answer: 25,
          tolerance: 0,
          unit: "repairs",
          hint: "Find the contribution per repair first, then divide the fixed cost by it.",
          mistakes: [
            { match: "15", coach: "You divided by the price. Use $60 - $24 = $36." },
            { match: "37.5", coach: "You divided by the parts cost. Each repair contributes $36." },
          ],
          seconds: 50,
        },
        {
          type: "match",
          prompt: "Match each pricing idea to what it means.",
          pairs: [
            { left: "Cost-plus", right: "Add a markup to your cost per unit" },
            { left: "Competitive", right: "Set price relative to similar products" },
            { left: "Value-based", right: "Price by what solving the problem is worth to the customer" },
            { left: "Break-even point", right: "Units needed to cover fixed costs" },
            { left: "Markup", right: "Profit as a share of cost" },
          ],
          hint: "Two methods look at you or your rivals; one looks at the customer's gain.",
          mistakes: [
            { match: "Mixed up markup and break-even", coach: "Markup is a percent. Break-even is a number of units." },
          ],
          seconds: 55,
        },
        {
          type: "build",
          prompt: "Build the break-even formula.",
          tiles: ["Break-even units", "=", "fixed costs", "÷", "(price - variable cost)"],
          distractors: ["x price", "+ markup"],
          hint: "Divide what you must pay back by what each sale contributes.",
          mistakes: [
            { match: "Used 'x price'", coach: "Break-even divides by contribution; it doesn't multiply by price." },
            { match: "Used '+ markup'", coach: "Markup belongs to cost-plus pricing, not the break-even formula." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "Sam Walton cut a price from $1.20 to $1.00 on an item that cost 80 cents. Why did his profit rise?",
          choices: [
            "His cost went up",
            "Customers paid tips",
            "He made less per item",
            "He sold about three times as many, which more than made up for the smaller profit each",
          ],
          answer: 3,
          why: "20 cents x 300 = $60 beats 40 cents x 100 = $40.",
        },
        {
          q: "An item costs $20 and sells for $30. What is the markup?",
          choices: ["33 percent", "50 percent", "150 percent"],
          answer: 1,
          why: "Profit $10 / cost $20 = 50 percent markup. (The margin is $10 / $30, about 33 percent.)",
        },
        {
          q: "Which price sets the CEILING in good pricing?",
          choices: [
            "What the solution is worth to the customer",
            "Your cost per unit",
            "Your fixed costs",
            "The cheapest competitor",
          ],
          answer: 0,
          why: "No one will pay more than the solution is worth to them; cost sets the floor.",
        },
        {
          q: "Fixed costs are $1,000. Price is $50 and variable cost is $30. What's the break-even point?",
          choices: ["20 units", "33 units", "50 units", "40 units"],
          answer: 2,
          why: "Contribution = $20. $1,000 / $20 = 50 units.",
        },
        {
          q: "What happens to the break-even point if you raise your price (and variable cost stays the same)?",
          choices: [
            "It goes up",
            "It goes down, because each sale contributes more",
            "It doesn't change",
          ],
          answer: 1,
          why: "A higher price means more contribution per sale, so fewer sales cover the fixed costs.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Choose a product or service you could really sell. Price it three ways: cost-plus (show your markup and the resulting margin), competitive (find at least three real competitor prices), and value-based (estimate what it's worth to a customer, using interview numbers if you have them). Pick a final price and explain why. Then calculate your break-even point using a real fixed cost.",
        rubric: [
          "Cost-plus price with correct markup and margin math",
          "At least three real competitor prices, with the source of each",
          "A value-based estimate with stated assumptions",
          "A final price with a clear reason that uses all three views",
          "A correct break-even calculation",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 4. Marketing and sales
    // ------------------------------------------------------------------
    {
      id: "business-hs.marketing",
      title: "Marketing, Sales and Trust",
      minutes: 35,
      stage: "rhetoric",
      read: `On New Year's Eve 1879, Thomas Edison opened his Menlo Park laboratory in New Jersey to the public. Extra trains brought visitors, and thousands of people walked through grounds lit by his electric lamps. Many experts had doubted his claims for months. Now people could see for themselves. Edison understood that a great invention still has to be noticed, believed, and chosen.

Marketing is the work of getting the right people to notice and trust you. Sales is helping them decide. Together they form a funnel. At the top is awareness: people learn you exist. Next comes interest: they want to know more. Then decision: they compare and consider. Then purchase. The best funnels add a final stage, repeat and referral, where happy customers come back and bring friends.

At every stage, some people drop out. The share who move from one stage to the next is the conversion rate. If 1,000 people see your flyer, 100 visit your page, and 20 buy, the flyer-to-visit rate is 10 percent and the visit-to-purchase rate is 20 percent. Overall, 2 percent of the people who saw the flyer became customers.

Measuring each stage shows where the funnel leaks. If many people visit but almost nobody buys, more advertising won't help much. Fix the decision stage first: a clearer offer, better photos, honest answers to common questions. Small improvements near the bottom of the funnel often add the most profit.

Underneath every stage is trust. Customers buy from people they believe. Trust is built with demonstrations like Edison's, honest testimonials from real customers, a clear guarantee, and promises kept every time. It is destroyed by exaggeration, hidden fees, and fake reviews. A business can survive a bad month. It rarely survives a reputation for dishonesty.`,
      keyIdeas: [
        "The funnel: awareness, interest, decision, purchase, then repeat and referral.",
        "Conversion rate = people who reached the next stage / people at the stage before.",
        "Find and fix the biggest leak before buying more attention.",
        "Trust underlies every stage: demonstrate, keep promises, never exaggerate.",
      ],
      hook: {
        text: "On New Year's Eve 1879, trains full of curious visitors rolled into a tiny New Jersey village. Thomas Edison had invited the public to see his electric lamps glowing in the winter dark. Why would an inventor throw open his lab to thousands of strangers instead of just telling reporters that his lamp worked?",
      },
      teach: [
        {
          title: "The marketing funnel",
          teach:
            "Marketing gets the right people to notice and trust you. Sales helps them decide. Picture the whole journey as a funnel, wide at the top and narrow at the bottom. Awareness: people learn you exist, through a flyer, a sign, or a friend. Interest: they want to know more, so they visit your page or stop at your booth. Decision: they compare you with other options and weigh the price. Purchase: they buy. Then comes the stage many beginners forget: repeat and referral, when happy customers come back and tell their friends. Edison's 1879 open house worked the whole funnel at once. News stories built awareness, the trip to Menlo Park built interest, and seeing the lamps glow with their own eyes moved doubters toward a decision.",
          visual: {
            type: "hotspots",
            title: "The marketing funnel",
            center: "🔻 Funnel",
            spots: [
              { label: "Awareness", icon: "👀", detail: "People learn you exist: a flyer, a sign, a friend's mention." },
              { label: "Interest", icon: "🤔", detail: "They want to know more: they visit your page or stop at your booth." },
              { label: "Decision", icon: "⚖️", detail: "They compare you with alternatives and weigh the price." },
              { label: "Purchase", icon: "🛒", detail: "They buy. Make this step simple and clear." },
              { label: "Repeat and referral", icon: "🔁", detail: "Happy customers return and bring friends: the cheapest growth there is." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put this customer's journey with a bike-tune-up service in funnel order.",
            steps: [
              "Sees your flyer on the library bulletin board",
              "Visits your page to read what a tune-up includes",
              "Compares your price with the bike shop downtown",
              "Books and pays for a tune-up",
              "Comes back in the spring and tells a friend",
            ],
            hint: "Awareness, interest, decision, purchase, then repeat and referral.",
            mistakes: [
              { match: "Put comparing prices before visiting the page", coach: "People usually look into you before they compare you." },
              { match: "Put the referral before the purchase", coach: "Customers recommend you after they've had a good experience." },
            ],
            seconds: 45,
          },
          think: {
            q: "A customer who loved your service brings two friends next month. Which funnel stage is that?",
            choices: ["Awareness", "Decision", "Repeat and referral", "Interest"],
            answer: 2,
            why: "Happy customers returning and recommending you is the repeat-and-referral stage.",
            hints: [
              "The friends become aware, but the customer's action is after a purchase.",
              "Decision comes before a purchase. This customer already bought.",
              "",
              "Interest is early. This customer is already past buying.",
            ],
          },
          approaches: {
            analogy:
              "A funnel is like tryouts for a team. Many people hear about tryouts, fewer show up, fewer make the cut, and the best players keep coming back each season and bring friends.",
            example:
              "A car-wash fundraiser: 400 neighbors see the sign (awareness), 80 slow down to read the prices (interest), 50 compare it with washing at home (decision), 40 pull in (purchase), and 12 come back the next month (repeat).",
            simpler: {
              q: "What is the very first stage of the funnel?",
              choices: ["Awareness", "Purchase", "Referral"],
              answer: 0,
              why: "No one can buy from you until they know you exist.",
              hints: [
                "",
                "Purchase comes near the end. What must happen first?",
                "Referral is the last stage, after buying.",
              ],
            },
          },
        },
        {
          title: "Conversion rates",
          teach:
            "At every stage of the funnel, some people drop out. The share who move from one stage to the next is called the conversion rate. Divide the number who reached the next stage by the number at the stage before, then multiply by 100. Suppose 1,000 people see your flyer and 100 visit your web page. That's a 10 percent conversion rate. If 20 of those visitors buy, the visit-to-purchase rate is 20 divided by 100, or 20 percent. Overall, 20 out of 1,000, or 2 percent, of flyer readers became customers. Notice how quickly the numbers shrink. That's normal, and it's why the top of the funnel has to be wide. Writing these numbers down turns marketing from guesswork into something you can measure and improve.",
          visual: {
            type: "flip",
            cards: [
              { front: "Conversion rate", back: "People who reached the next stage / people at the stage before, x 100." },
              { front: "1,000 see flyer -> 100 visit", back: "100 / 1,000 = 10 percent." },
              { front: "100 visit -> 20 buy", back: "20 / 100 = 20 percent." },
              { front: "Overall", back: "20 / 1,000 = 2 percent of flyer readers became customers." },
            ],
          },
          probe: {
            type: "number",
            prompt: "At a farmers market, 800 people pass your salsa booth, 120 taste a sample, and 36 buy a jar. What percent of tasters bought?",
            answer: 30,
            tolerance: 0.5,
            unit: "%",
            hint: "Divide buyers by tasters (the stage just before buying), then multiply by 100.",
            mistakes: [
              { match: "4.5", coach: "That's buyers out of everyone who passed. The question asks about tasters." },
              { match: "15", coach: "That's the share of passers-by who tasted. Now look at tasters who bought." },
            ],
            seconds: 45,
          },
          think: {
            q: "500 people visit your page and 25 buy. What is the conversion rate from visit to purchase?",
            choices: ["25 percent", "20 percent", "2 percent", "5 percent"],
            answer: 3,
            why: "25 / 500 = 0.05, or 5 percent.",
            hints: [
              "25 is the number of buyers, not a percent of visitors.",
              "That flipped the division: 500 / 25 = 20. Put buyers on top.",
              "Recheck the decimal: 25 / 500 = 0.05.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Conversion rate is like a free-throw percentage. Shots made divided by shots taken. It tells you how well each stage turns tries into results.",
            example:
              "A car-wash sign is seen by 600 drivers. 60 pull in to ask the price (60 / 600 = 10 percent). 45 of those buy a wash (45 / 60 = 75 percent). Overall, 45 / 600 = 7.5 percent of drivers became customers.",
            simpler: {
              q: "10 people taste a sample and 5 buy. What fraction bought?",
              choices: ["Half", "A tenth", "All of them"],
              answer: 0,
              why: "5 out of 10 is one half, or 50 percent.",
              hints: [
                "",
                "A tenth would be 1 out of 10. Count again: 5 bought.",
                "Only 5 of the 10 bought.",
              ],
            },
          },
        },
        {
          title: "Find the leak",
          teach:
            "Measuring each stage shows you where the funnel leaks. Imagine your online shop gets 5,000 visitors a month and 2 percent buy, so you have 100 customers. You could spend money to double your visitors. Or you could fix the page itself: clearer photos, an honest description, answers to common questions, and a simple checkout. If that lifts the purchase rate from 2 percent to 3 percent, you gain 50 customers a month without spending another dollar on ads. At $20 of gross profit each, that's $1,000 more per month. The lesson: look for the stage with the worst drop-off before you pour more people into the top. Pouring water faster into a leaky bucket mostly makes a bigger puddle.",
          visual: {
            type: "compare",
            left: {
              title: "Buy more attention",
              points: ["Costs money every month", "Doubles visitors to 10,000", "Same 2 percent buy", "Leaky page stays leaky"],
            },
            right: {
              title: "Fix the leak",
              points: ["Clearer photos and honest answers", "Simple checkout", "2 percent becomes 3 percent", "50 more customers, no ad spending"],
            },
          },
          probe: {
            type: "number",
            prompt: "Your booth gets 600 visitors a month and 5% buy. You add free samples and a clear price sign, and now 8% buy. Each sale earns $12 of gross profit. How much MORE gross profit do you earn per month?",
            answer: 216,
            tolerance: 0,
            unit: "$",
            hint: "Extra buyers = 600 x (8% - 5%). Then multiply by $12.",
            mistakes: [
              { match: "18", coach: "That's the number of extra buyers. Multiply by the $12 each one earns." },
              { match: "576", coach: "That's the total at 8%. The question asks how much MORE than before." },
              { match: "360", coach: "That's the gross profit at 5%. Find the difference between 8% and 5%." },
            ],
            seconds: 60,
          },
          think: {
            q: "2,000 people visit your page each month, but only 4 buy. What should you fix first?",
            choices: [
              "The decision and purchase stage: offer, photos, checkout",
              "Buy ads to bring 4,000 visitors",
              "Change your logo",
              "Nothing: 4 sales is normal",
            ],
            answer: 0,
            why: "Plenty of people arrive; almost none buy. The leak is at the bottom of the funnel.",
            hints: [
              "",
              "More visitors into a leaky page means more people leaving without buying.",
              "Branding won't fix why interested visitors aren't buying.",
              "A 0.2 percent purchase rate is a signal something is wrong at the decision stage.",
            ],
          },
          approaches: {
            analogy:
              "If your bike tire keeps going flat, pumping harder every morning isn't the fix. Find the hole and patch it. Then every pump of air stays in.",
            example:
              "A tutoring founder gets 200 inquiries a month but only 10 sign up (5 percent). Parents keep asking the same three questions about scheduling. She adds a clear schedule and a free first session, and sign-ups rise to 30 (15 percent). Same inquiries, triple the customers.",
            simpler: {
              q: "1,000 visitors and 1 percent buy. How many customers is that?",
              choices: ["100", "1", "10"],
              answer: 2,
              why: "1 percent of 1,000 is 0.01 x 1,000 = 10.",
              hints: [
                "That would be 10 percent. 1 percent is smaller.",
                "That's the percent, not the number of customers.",
                "",
              ],
            },
          },
        },
        {
          title: "Trust is the foundation",
          teach:
            "Under every stage of the funnel is trust. People buy from businesses they believe. Edison didn't just claim his lamps worked; he let thousands of people see them burning. Demonstration is still one of the most powerful trust builders. Others include honest testimonials from real customers, a clear guarantee that lets people try you without fear, transparent prices with no surprise fees, and simply keeping every promise you make. Trust breaks quickly. Exaggerated claims, hidden charges, fake reviews, and pressure tactics might win one sale, but they lose the customer and everyone that customer talks to. Honesty is the right thing to do, and it is also good business, because repeat customers and referrals cost almost nothing to win. A reputation takes years to build and one bad decision to damage.",
          visual: {
            type: "compare",
            left: {
              title: "Builds trust",
              points: ["A live demonstration", "Real customer testimonials", "A clear guarantee", "Prices stated up front", "Promises kept"],
            },
            right: {
              title: "Breaks trust",
              points: ["Exaggerated claims", "Fake reviews", "Hidden fees", "High-pressure tactics", "Missed promises"],
            },
          },
          probe: {
            type: "sort",
            prompt: "You run a window-washing business. Sort each move.",
            buckets: ["Builds trust", "Breaks trust"],
            items: [
              { text: "Washing one window free so the customer can see the result", bucket: 0 },
              { text: "Adding a surprise 'ladder fee' to the bill", bucket: 1 },
              { text: "A guarantee: if a window streaks, we return and redo it", bucket: 0 },
              { text: "Writing reviews of your own business under fake names", bucket: 1 },
              { text: "Showing a real customer's comment, with permission", bucket: 0 },
              { text: "Saying 'Only two spots left today!' when that isn't true", bucket: 1 },
            ],
            hint: "Ask: would the customer feel respected if they knew everything you know?",
            mistakes: [
              { match: "Put the free window in breaks trust", coach: "A demonstration lets people see the result for themselves, like Edison's open house." },
              { match: "Put the fake urgency in builds trust", coach: "A false deadline is a lie. Once noticed, it destroys trust." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why is honesty also good business?",
            choices: [
              "Because customers never check anything",
              "Because the law requires every business to give refunds",
              "Because it lets you charge any price",
              "Because trusted businesses earn repeat customers and referrals that cost almost nothing",
            ],
            answer: 3,
            why: "Trust brings people back and brings their friends, which is the cheapest growth there is.",
            hints: [
              "Customers do check, and they talk to each other.",
              "The bigger reason is what trust does for repeat business and referrals.",
              "Trust doesn't let you charge anything. Customers still compare value.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Trust is like a bridge built plank by plank. Every kept promise adds a plank; one big lie can drop the whole bridge into the river.",
            example:
              "Two lawn services charge $40. One shows up on time every week and texts photos of the finished yard. The other is late twice and adds a 'fuel fee.' By summer's end, the first has 6 referrals and the second has lost 3 customers. Same price, very different results.",
            simpler: {
              q: "Which builds trust with a new customer?",
              choices: ["A hidden fee", "A fake review", "A free demonstration"],
              answer: 2,
              why: "A demonstration lets the customer see the result for themselves.",
              hints: [
                "Surprise fees make customers feel tricked.",
                "Fake reviews are dishonest and destroy trust when discovered.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Which funnel stage is each marketing action aimed at?",
        buckets: ["Awareness", "Decision", "Repeat and referral"],
        items: [
          { text: "Flyers on the community center board", bucket: 0 },
          { text: "A sign at the end of the street", bucket: 0 },
          { text: "A free sample at the booth", bucket: 1 },
          { text: "A clear guarantee next to the price", bucket: 1 },
          { text: "A thank-you note with a 'bring a friend' card", bucket: 2 },
          { text: "A reminder to returning customers each season", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Explain how you would measure and improve the marketing for a small business, and why trust matters at every step.",
        keyPoints: [
          "The funnel moves from awareness to interest, decision, purchase, and repeat",
          "Conversion rate divides people at the next stage by people at the stage before",
          "Fix the stage with the biggest drop-off before buying more attention",
          "Trust comes from demonstrations, honest testimonials, guarantees, and kept promises",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "2,500 people see your poster, 250 scan the code to visit your page, and 50 order. What percent of page visitors ordered?",
          answer: 20,
          tolerance: 0.5,
          unit: "%",
          hint: "Use the stage just before ordering: page visitors.",
          mistakes: [
            { match: "2", coach: "That's orders out of everyone who saw the poster. Divide by page visitors." },
            { match: "10", coach: "That's the poster-to-visit rate. Look at visitors who ordered." },
          ],
          seconds: 45,
        },
        {
          type: "sequence",
          prompt: "Put the funnel stages in order.",
          steps: ["Awareness", "Interest", "Decision", "Purchase", "Repeat and referral"],
          hint: "Start with learning you exist; end with coming back.",
          mistakes: [
            { match: "Put decision before interest", coach: "People get curious before they seriously compare." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "If many people visit your page but few buy, the leak is at the {0} stage. Instead of buying more {1}, fix the offer and checkout. Under every stage of the funnel is {2}.",
          blanks: [
            { answers: ["decision", "purchase"] },
            { answers: ["ads", "advertising", "attention", "visitors"] },
            { answers: ["trust"] },
          ],
          bank: ["decision", "ads", "trust", "awareness", "logos", "luck"],
          hint: "Where do people drop off: before they arrive, or after they look?",
          mistakes: [
            { match: "awareness", coach: "People are arriving, so awareness is working. They drop off later." },
            { match: "luck", coach: "Customers buy from businesses they believe in. That's trust, not luck." },
          ],
          seconds: 40,
        },
        {
          type: "sort",
          prompt: "Sort each practice.",
          buckets: ["Builds trust", "Breaks trust"],
          items: [
            { text: "Posting the full price, including delivery", bucket: 0 },
            { text: "Claiming 'best in the state' with no evidence", bucket: 1 },
            { text: "Fixing a mistake for free and apologizing", bucket: 0 },
            { text: "Hiding a cancellation fee in tiny print", bucket: 1 },
            { text: "Letting customers try before they buy", bucket: 0 },
          ],
          hint: "Would the customer feel respected if they saw everything?",
          mistakes: [
            { match: "Put the 'best in the state' claim in builds trust", coach: "An exaggerated claim without evidence makes careful customers suspicious." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Why did Edison open his Menlo Park lab to the public in 1879?",
          choices: [
            "So people could see his electric lamps working for themselves",
            "To sell train tickets",
            "Because he was moving away",
            "To hire new workers",
          ],
          answer: 0,
          why: "A public demonstration built trust in a claim many experts doubted.",
        },
        {
          q: "1,200 people see an ad and 60 visit your page. What is the conversion rate?",
          choices: ["20 percent", "60 percent", "5 percent"],
          answer: 2,
          why: "60 / 1,200 = 0.05, or 5 percent.",
        },
        {
          q: "Your page gets plenty of visitors but almost no one buys. What's the best first move?",
          choices: [
            "Double your advertising",
            "Improve the offer, photos and checkout",
            "Lower prices to zero",
            "Close the business",
          ],
          answer: 1,
          why: "The leak is at the decision stage, so fix that before paying for more visitors.",
        },
        {
          q: "Which stage of the funnel is often the cheapest source of new customers?",
          choices: ["Awareness ads", "Billboards", "Cold calls", "Repeat and referral from happy customers"],
          answer: 3,
          why: "Customers who already trust you return and bring friends at almost no cost.",
        },
        {
          q: "Which practice damages trust?",
          choices: ["A clear guarantee", "A real testimonial", "A surprise fee at checkout"],
          answer: 2,
          why: "Hidden or surprise fees make customers feel tricked.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: with a parent's okay, run a one-week marketing test for a real offer (a service, a bake sale, a product from your earlier lessons). Choose one channel, like flyers on a community board or a table at a family or church event. Count each funnel stage: how many saw it, how many asked about it, how many bought. Calculate the conversion rate at each stage, find the biggest leak, change one thing, and run it again for a second week to compare.",
        rubric: [
          "Ran a real test with a parent's okay and used one clear channel",
          "Counted people at each funnel stage for both weeks",
          "Calculated conversion rates correctly",
          "Identified the biggest leak and made one specific change",
          "Used honest, trust-building marketing with no exaggerated claims",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 5. Financial statements and pitching
    // ------------------------------------------------------------------
    {
      id: "business-hs.financials",
      title: "The Numbers That Run a Business",
      minutes: 40,
      stage: "rhetoric",
      read: `In 1922, a young Walt Disney ran a small cartoon studio in Kansas City called Laugh-O-Gram. He landed what looked like a great deal: a distributor agreed to pay $11,100 for a series of six cartoons. But the distributor paid only $100 up front and then went out of business. Disney had already spent money on salaries, rent, and supplies. By 1923 Laugh-O-Gram was bankrupt, and Disney moved to California to start over.

The lesson of Laugh-O-Gram is that profit and cash are different. To run a business you need to understand both, and to grow it you need to explain both to investors.

A profit and loss statement, or P&L, shows whether a business made money over a period. Start with revenue, all the money from sales. Subtract cost of goods sold, the direct cost of the units you sold, to get gross profit. Subtract operating expenses, like rent, software, marketing, and wages, to get operating profit. Andrew Carnegie, who built a giant steel company, was known for tracking the cost of every step in his mills, so he always knew where profit came from.

A cash flow forecast tracks when money actually comes in and goes out. A sale counts as revenue on the P&L when you make it, but the cash may not arrive for months, while suppliers and rent must be paid now. A business can be profitable on paper and still run out of cash. Founders watch their runway: cash on hand divided by the amount they burn each month.

When you need money to grow, you pitch investors. A strong pitch covers the problem, your solution, evidence that customers want it, your unit economics, your financial projections, and your ask. If an investor puts in $50,000 for 20 percent of the company, they are valuing the company at $250,000.

In 1953, Walt's brother Roy carried a detailed drawing of an imagined park to New York to find backers. A television network agreed to invest in exchange for part ownership and a weekly Disney TV show. Disneyland opened in July 1955.`,
      keyIdeas: [
        "P&L: revenue - cost of goods sold = gross profit; - operating expenses = operating profit.",
        "Profit is not cash: a sale can be on the books long before the money arrives.",
        "Runway = cash on hand / monthly burn.",
        "A pitch tells a clear story backed by numbers and ends with a specific ask.",
      ],
      hook: {
        text: "In 1922 a young cartoonist landed a deal worth $11,100, a fortune for his tiny studio. Within about a year the studio was bankrupt. The cartoonist was Walt Disney. How can a business win a big contract and still go broke? The answer is the difference between profit and cash.",
      },
      teach: [
        {
          title: "The profit and loss statement",
          teach:
            "A profit and loss statement, or P&L, answers one question: did the business make money during a period, such as a month or a year? It reads from top to bottom. Revenue is all the money from sales. Subtract cost of goods sold, or COGS, the direct cost of the units you sold, and you get gross profit. Subtract operating expenses, the costs of running the business like rent, software, marketing, and wages, and you get operating profit. Suppose a small screen-printing shop has $12,000 of revenue in a month, $4,800 of COGS, and $5,000 of operating expenses. Gross profit is $7,200, and operating profit is $2,200. Andrew Carnegie, who built a giant steel company, was known for tracking the cost of every step in his mills. He always knew which line needed work.",
          visual: {
            type: "hotspots",
            title: "Reading a P&L, top to bottom",
            center: "📄 P&L",
            spots: [
              { label: "Revenue", icon: "💵", detail: "All the money from sales in the period. Example: $12,000." },
              { label: "COGS", icon: "📦", detail: "Direct cost of the units sold: materials, packaging. Example: $4,800." },
              { label: "Gross profit", icon: "➖", detail: "Revenue - COGS. Example: $12,000 - $4,800 = $7,200." },
              { label: "Operating expenses", icon: "🏢", detail: "Rent, software, marketing, wages. Example: $5,000." },
              { label: "Operating profit", icon: "✅", detail: "Gross profit - operating expenses. Example: $7,200 - $5,000 = $2,200." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A bakery's month: revenue $8,500, cost of goods sold $3,400, operating expenses $3,900. What is the operating profit?",
            answer: 1200,
            tolerance: 0,
            unit: "$",
            hint: "Revenue - COGS = gross profit. Then subtract operating expenses.",
            mistakes: [
              { match: "5100", coach: "That's gross profit. Now subtract the $3,900 of operating expenses." },
              { match: "4600", coach: "That subtracted only operating expenses. Take out COGS too." },
              { match: "15800", coach: "Costs are subtracted from revenue, not added." },
            ],
            seconds: 50,
          },
          think: {
            q: "Which line on a P&L is revenue minus cost of goods sold?",
            choices: ["Operating profit", "Operating expenses", "Cash on hand", "Gross profit"],
            answer: 3,
            why: "Gross profit is what's left after paying the direct cost of the units sold.",
            hints: [
              "Operating profit comes after also subtracting operating expenses.",
              "Operating expenses are a cost line, not a result.",
              "Cash belongs on a cash flow forecast, not the P&L.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A P&L is like a scoreboard for one game. It doesn't show every play, but it tells you who won: did the money coming in beat the money going out?",
            example:
              "A lemonade cart's summer: revenue $3,000. COGS (lemons, sugar, cups) $900, so gross profit = $2,100. Operating expenses: a $200 permit and $400 of advertising = $600. Operating profit = $2,100 - $600 = $1,500.",
            simpler: {
              q: "Revenue is $1,000 and COGS is $400. What's the gross profit?",
              choices: ["$1,400", "$600", "$400"],
              answer: 1,
              why: "$1,000 - $400 = $600.",
              hints: [
                "That added. Subtract the cost from revenue.",
                "",
                "That's the COGS. What's left after subtracting it?",
              ],
            },
          },
        },
        {
          title: "Profit is not cash",
          teach:
            "A P&L can show a profit while the bank account empties. That's because revenue is counted when you make a sale, but cash arrives only when the customer pays. Walt Disney learned this painfully. His Laugh-O-Gram studio signed a deal worth $11,100 for six cartoons, but the distributor paid only $100 up front and then went out of business. Disney had already spent money on salaries and rent, and by 1923 the studio was bankrupt. Here's a smaller example. You start a month with $2,500 in the bank. You complete a $3,000 order, but the customer will pay in 60 days. Meanwhile you pay $1,800 for supplies and $400 for rent. On paper you earned $800 of profit. In the bank, you have only $300 left. Cash keeps the doors open.",
          visual: {
            type: "compare",
            left: {
              title: "On the P&L this month",
              points: ["Revenue $3,000", "Supplies $1,800", "Rent $400", "Profit $800"],
            },
            right: {
              title: "In the bank this month",
              points: ["Started with $2,500", "Customer pays in 60 days: $0 in", "Paid out $2,200", "Ending cash $300"],
            },
          },
          probe: {
            type: "number",
            prompt: "You start the month with $3,000 in the bank. You deliver $4,000 of catering orders, but customers will pay in 30 days. You pay $2,200 for food and $600 for kitchen rental. How much cash is in the bank at month's end?",
            answer: 200,
            tolerance: 0,
            unit: "$",
            hint: "Cash only counts money that actually came in or went out this month.",
            mistakes: [
              { match: "4200", coach: "The $4,000 hasn't arrived yet. Don't count it as cash." },
              { match: "1200", coach: "That's the profit on paper. The question asks about cash in the bank." },
              { match: "2400", coach: "Don't forget the $600 kitchen rental also left your account." },
            ],
            seconds: 55,
          },
          think: {
            q: "A business shows a profit every month but runs out of cash. What is the most likely reason?",
            choices: [
              "Customers pay slowly while bills must be paid now",
              "The P&L was printed wrong",
              "It has too many customers who pay right away",
              "Profit and cash are always the same, so this can't happen",
            ],
            answer: 0,
            why: "Sales count as revenue right away, but the cash may arrive much later.",
            hints: [
              "",
              "The P&L can be perfectly correct and still not show when cash arrives.",
              "Customers who pay right away would help cash, not hurt it.",
              "This happens often, which is exactly why founders track cash separately.",
            ],
          },
          approaches: {
            analogy:
              "Being owed $100 by a friend who pays you next month doesn't help you buy lunch today. Profit is what you're owed and earned; cash is what's in your wallet right now.",
            example:
              "A landscaping teen finishes $1,500 of jobs in May, but two clients pay in July. In May he spent $600 on mulch and $200 on a mower repair. May profit: $1,500 - $800 = $700. May cash: he started with $500 and spent $800, so he's $300 short and must borrow from savings until July.",
            simpler: {
              q: "You have $100. You make a $50 sale, but the customer pays next month. How much cash do you have today?",
              choices: ["$150", "$100", "$50"],
              answer: 1,
              why: "The $50 hasn't arrived, so you still have $100 in cash.",
              hints: [
                "The $50 hasn't arrived yet, so it's not cash today.",
                "",
                "The sale didn't take money away; it just hasn't paid yet.",
              ],
            },
          },
        },
        {
          title: "Cash flow and runway",
          teach:
            "Because profit and cash differ, founders keep a cash flow forecast: a month-by-month table of cash expected in and cash expected out. It shows trouble before it arrives. A key number is burn rate, how much more cash goes out than comes in each month. Another is runway: cash on hand divided by burn rate. If you have $9,000 in the bank and burn $1,500 a month, your runway is 6 months. That's how long you have to reach profit or raise more money. You can extend runway in several ways: ask customers for deposits, collect payments faster, buy supplies in smaller batches, and delay big purchases until sales justify them. Running out of cash, not running out of ideas, is one of the most common reasons young businesses close.",
          visual: {
            type: "flip",
            cards: [
              { front: "Cash flow forecast", back: "A month-by-month table of cash expected in and out." },
              { front: "Burn rate", back: "How much more cash goes out than comes in each month." },
              { front: "Runway", back: "Cash on hand / burn rate. $9,000 / $1,500 a month = 6 months." },
              { front: "Ways to extend runway", back: "Deposits, faster collection, smaller supply orders, delaying big purchases." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your startup has $14,000 in the bank. Each month, $3,250 comes in and $5,000 goes out. How many months of runway do you have?",
            answer: 8,
            tolerance: 0,
            unit: "months",
            hint: "Burn rate = cash out - cash in. Runway = cash on hand / burn rate.",
            mistakes: [
              { match: "2.8", coach: "You divided by everything going out. Use the burn: $5,000 - $3,250." },
              { match: "1750", coach: "That's the monthly burn. Now divide your $14,000 by it." },
              { match: "4.3", coach: "Burn is the difference between cash out and cash in, not cash in alone." },
            ],
            seconds: 55,
          },
          think: {
            q: "Which action EXTENDS your runway?",
            choices: [
              "Buying a year of supplies in advance",
              "Letting customers pay 90 days later",
              "Asking customers for a deposit up front",
              "Hiring a new employee before sales grow",
            ],
            answer: 2,
            why: "Deposits bring cash in sooner, which lowers your burn and stretches your runway.",
            hints: [
              "That spends cash now on supplies you won't use for months.",
              "That delays cash coming in, so your runway gets shorter.",
              "",
              "That raises your monthly burn before sales can pay for it.",
            ],
          },
          approaches: {
            analogy:
              "Runway is like the fuel gauge on a long drive with no gas stations. Divide the fuel left by how much you burn per hour, and you know how far you can go.",
            example:
              "A food-truck founder has $18,000. Each month she takes in $6,000 and spends $9,000, so she burns $3,000. Runway = 18,000 / 3,000 = 6 months. She switches to smaller weekly supply orders and catering deposits, cutting burn to $2,000. Runway grows to 9 months.",
            simpler: {
              q: "You have $600 and burn $100 a month. How many months of runway?",
              choices: ["6", "60", "500"],
              answer: 0,
              why: "$600 / $100 per month = 6 months.",
              hints: [
                "",
                "Check the division: 600 / 100 = 6.",
                "That subtracted. Divide the cash by the monthly burn.",
              ],
            },
          },
        },
        {
          title: "Pitching to investors",
          teach:
            "When a business needs money to grow, the founder may pitch investors. A strong pitch is a clear story backed by numbers. It covers the problem and who has it, your solution, evidence that customers want it, your unit economics, your financial projections, and your ask: how much money you need and what the investor gets in return. Investors who buy part of the company receive equity, a share of ownership. If an investor offers $50,000 for 20 percent, they are valuing the company at $50,000 divided by 0.20, or $250,000. Walt Disney's Disneyland pitch shows the power of a clear picture. In 1953, his brother Roy carried a detailed drawing of the imagined park to New York to find backers. A television network agreed to invest in exchange for part ownership and a weekly Disney TV show.",
          visual: {
            type: "hotspots",
            title: "A strong pitch",
            center: "🎤 Pitch",
            spots: [
              { label: "Problem", icon: "❗", detail: "Who has it, how painful it is, and what they spend today." },
              { label: "Solution", icon: "💡", detail: "What you offer and why it's better than the workaround." },
              { label: "Evidence", icon: "📋", detail: "Interviews, deposits, and early sales: proof customers want it." },
              { label: "Unit economics", icon: "🧮", detail: "Gross margin, CAC and LTV, showing each sale makes sense." },
              { label: "Financials", icon: "📈", detail: "A projected P&L and cash flow forecast." },
              { label: "The ask", icon: "🤝", detail: "How much money, what it's for, and what the investor gets." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put the parts of a pitch in a logical order.",
            steps: [
              "The problem and who has it",
              "Your solution",
              "Evidence customers want it",
              "Unit economics and financial projections",
              "The ask: how much money and what the investor gets",
            ],
            hint: "Start with why anyone should care. End with what you're asking for.",
            mistakes: [
              { match: "Put the ask first", coach: "Investors need to understand the problem and see evidence before they hear the ask." },
              { match: "Put the solution before the problem", coach: "A solution only makes sense once listeners feel the problem." },
            ],
            seconds: 45,
          },
          think: {
            q: "An investor offers $30,000 for 15 percent of your company. What valuation does that imply?",
            choices: ["$45,000", "$4,500", "$200,000", "$450,000"],
            answer: 2,
            why: "$30,000 / 0.15 = $200,000.",
            hints: [
              "That added 15 thousand. Valuation = investment / ownership share.",
              "That multiplied by 0.15. Divide instead.",
              "",
              "That multiplied by 15. Divide by 0.15.",
            ],
          },
          approaches: {
            analogy:
              "A pitch is like a closing argument in court: state the problem, present the evidence, and then ask for a specific verdict. Evidence before the ask.",
            example:
              "Maya's pitch for a bike-repair service: Problem: 7 of 10 students she interviewed waited days for shop repairs. Solution: same-day repairs at school. Evidence: 12 deposits. Unit economics: 65 percent gross margin, CAC $8, LTV $90. Ask: $2,000 for tools in exchange for 10 percent, a $20,000 valuation.",
            simpler: {
              q: "Which part of a pitch says how much money you need?",
              choices: ["The problem", "The evidence", "The ask"],
              answer: 2,
              why: "The ask states how much money you need and what the investor receives.",
              hints: [
                "The problem explains why anyone should care, not the money.",
                "Evidence shows customers want it, not how much you need.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "A T-shirt business has these items on its P&L. Sort each one.",
        buckets: ["Revenue", "Cost of goods sold", "Operating expenses"],
        items: [
          { text: "Money from shirts sold at the fair", bucket: 0 },
          { text: "Online shirt orders", bucket: 0 },
          { text: "Blank shirts used for the orders", bucket: 1 },
          { text: "Ink for each printed shirt", bucket: 1 },
          { text: "Monthly website plan", bucket: 2 },
          { text: "Booth rental at the fair", bucket: 2 },
          { text: "Flyers advertising the shop", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Explain to a new founder the difference between profit and cash, and what they should include when pitching investors. Use the Laugh-O-Gram story or your own numbers.",
        keyPoints: [
          "A P&L subtracts COGS and operating expenses from revenue to show profit",
          "Profit is counted at the sale, but cash arrives only when customers pay",
          "Runway equals cash on hand divided by monthly burn",
          "A pitch covers problem, solution, evidence, numbers, and a specific ask",
          "Valuation equals investment divided by the ownership share",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "An investor offers $40,000 for 16% of your company. What valuation does that imply?",
          answer: 250000,
          tolerance: 0,
          unit: "$",
          hint: "Valuation = investment / ownership share (as a decimal).",
          mistakes: [
            { match: "6400", coach: "That multiplied by 0.16. Divide instead." },
            { match: "2500", coach: "Check the decimal: 16% is 0.16, not 16." },
          ],
          seconds: 45,
        },
        {
          type: "build",
          prompt: "Build the bottom line of a P&L.",
          tiles: ["Operating profit", "=", "revenue", "- cost of goods sold", "- operating expenses"],
          distractors: ["+ cash in the bank", "+ money customers still owe"],
          hint: "Start with sales, then take out the direct costs, then the costs of running the business.",
          mistakes: [
            { match: "Used '+ cash in the bank'", coach: "Cash is tracked on the cash flow forecast, not added into profit." },
            { match: "Used '+ money customers still owe'", coach: "That's already counted in revenue. Adding it again double-counts it." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Laugh-O-Gram had a big sale on paper but ran out of {0}. Revenue is counted when you make the sale, but cash arrives when the customer {1}. Runway equals cash on hand divided by monthly {2}.",
          blanks: [
            { answers: ["cash", "money"] },
            { answers: ["pays"] },
            { answers: ["burn"] },
          ],
          bank: ["cash", "pays", "burn", "ideas", "orders", "revenue"],
          hint: "Disney's problem wasn't a lack of customers or ideas.",
          mistakes: [
            { match: "ideas", coach: "Disney had plenty of ideas. What he lacked was money in the bank." },
            { match: "orders", coach: "Cash arrives when the customer pays, not when they place an order." },
          ],
          seconds: 40,
        },
        {
          type: "sort",
          prompt: "Does each action increase or decrease your runway?",
          buckets: ["Extends runway", "Shortens runway"],
          items: [
            { text: "Collecting a 50 percent deposit before starting work", bucket: 0 },
            { text: "Buying a year's supplies up front", bucket: 1 },
            { text: "Sending invoices the day work is done", bucket: 0 },
            { text: "Letting customers pay in 90 days", bucket: 1 },
            { text: "Delaying a big equipment purchase until sales grow", bucket: 0 },
            { text: "Signing a pricey office lease before your first sale", bucket: 1 },
          ],
          hint: "Runway grows when cash comes in sooner or goes out later.",
          mistakes: [
            { match: "Put buying a year's supplies in extends", coach: "That spends a lot of cash right now, shrinking runway." },
          ],
          seconds: 45,
        },
      ],
      check: [
        {
          q: "Why did Walt Disney's Laugh-O-Gram studio go bankrupt even after a large deal?",
          choices: [
            "Its cartoons were never finished",
            "The distributor paid only $100 up front and went out of business, so cash never arrived",
            "It made too much profit",
            "Disney gave the cartoons away",
          ],
          answer: 1,
          why: "The deal looked profitable on paper, but the cash never came in while expenses kept going out.",
        },
        {
          q: "Revenue $20,000, COGS $8,000, operating expenses $9,000. What is operating profit?",
          choices: ["$3,000", "$12,000", "$11,000", "$37,000"],
          answer: 0,
          why: "$20,000 - $8,000 = $12,000 gross profit; $12,000 - $9,000 = $3,000.",
        },
        {
          q: "You have $12,000 in the bank and burn $2,000 a month. What is your runway?",
          choices: ["24 months", "10 months", "6 months"],
          answer: 2,
          why: "$12,000 / $2,000 = 6 months.",
        },
        {
          q: "An investor puts in $25,000 for 10 percent. What valuation is that?",
          choices: ["$2,500", "$35,000", "$100,000", "$250,000"],
          answer: 3,
          why: "$25,000 / 0.10 = $250,000.",
        },
        {
          q: "What should come LAST in a strong pitch?",
          choices: ["The ask", "The problem", "Your solution"],
          answer: 0,
          why: "Investors need the problem, solution, evidence and numbers before they hear what you're asking for.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Field mission: build the numbers for a real business idea (your idea from earlier lessons is perfect). Make a 12-month projected P&L in a spreadsheet or on paper, showing revenue, cost of goods sold, gross profit, operating expenses, and operating profit each month. Add a 6-month cash flow forecast that shows when cash really comes in and goes out, and calculate your runway. Then give a 3-minute pitch to your family: problem, solution, evidence, numbers, and a specific ask.",
        rubric: [
          "A 12-month P&L with every line calculated correctly",
          "Realistic assumptions written down (prices, units, costs)",
          "A 6-month cash flow forecast that shows timing differences from the P&L",
          "A correct runway or a clear statement that cash stays positive",
          "A clear 3-minute pitch ending with a specific ask and the valuation it implies",
        ],
      },
    },
  ],
};
