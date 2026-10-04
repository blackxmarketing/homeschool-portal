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
