import type { Course } from "./types";
import { money } from "./money";

const p = (...paras: string[]) => paras.join("\n\n");

/**
 * Personal Finance: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const moneyHs: Course = {
  ...money,
  id: "money-hs",
  band: "strategist",
  title: "Personal Finance",
  blurb: "High school personal finance: paychecks, budgets, investing, credit and protecting what you build.",
  lessons: [
    // ------------------------------------------------------------------
    {
      id: "money-hs.paycheck",
      title: "Your Paycheck: Gross, Net and the Pay Stub",
      minutes: 35,
      stage: "grammar",
      read: p(
        `When you get your first job offer, you will hear a number like $15 an hour. That is your pay rate, and it leads to your gross pay: everything you earned before anything is taken out. Work 40 hours at $15 and your gross pay is $600. Under federal law, most hourly workers who work more than 40 hours in one workweek earn overtime, one and a half times their regular rate for each extra hour.`,
        `The money that actually lands in your bank account is your net pay, often called take-home pay. The difference between gross and net is deductions. The biggest deductions are taxes your employer withholds, meaning it holds them back from your check and sends them to the government for you.`,
        `Two taxes come out of nearly every paycheck. Together they are called FICA: Social Security at 6.2 percent and Medicare at 1.45 percent, for 7.65 percent in total. Your employer pays a matching 7.65 percent on top. Federal income tax is withheld too, and the amount depends on how much you earn and on the Form W-4 you fill out when you are hired. Most states also withhold a state income tax, though a few states have none.`,
        `Some deductions are your choice. Money you put into a traditional 401(k) retirement plan, and health insurance premiums through work, are usually taken out before income tax is figured, which lowers the income tax withheld now.`,
        `Every paycheck comes with a pay stub, a receipt that lists your hours, rate, gross pay, each deduction, net pay, and year-to-date totals. Read it every payday. Payroll mistakes happen, and you are the person most likely to catch one. After the year ends, your employer sends a Form W-2 that sums it all up, and you use it to file your tax return. If too much was withheld, you get a refund. If too little, you owe the difference.`,
        `Benjamin Franklin once wrote that nothing in this world is certain "except death and taxes." Taxes are certain, but surprises about them are not. Knowing how your paycheck works means no surprise when your first deposit is smaller than you expected.`
      ),
      keyIdeas: [
        "Gross pay is what you earn; net pay is what you take home after deductions.",
        "FICA is 7.65 percent: 6.2 percent Social Security plus 1.45 percent Medicare.",
        "Income tax withholding depends on your earnings and your Form W-4; pre-tax deductions lower it.",
        "Net pay = gross pay minus all deductions. Read your pay stub every payday.",
      ],
      hook: {
        text: "Maya landed her first job at $15 an hour. In her first two weeks she worked 40 hours, so she was expecting $600. Her deposit was $510. Nobody stole $90 from her, and nobody made a mistake. So where did the money go?",
      },
      teach: [
        {
          title: "Gross pay and overtime",
          teach:
            "Your gross pay is everything you earned before a single dollar is taken out. For hourly work, it is your rate times your hours. At $15 an hour for a two-week pay period of 80 hours, gross pay is 15 x 80 = $1,200. There is one important twist. Under the federal Fair Labor Standards Act, most hourly workers earn overtime for hours past 40 in a single workweek, at one and a half times their regular rate. If you earn $16 an hour, your overtime rate is 16 x 1.5 = $24. Work 45 hours in a week, and you earn 40 x 16 = $640 for regular time plus 5 x 24 = $120 for overtime, a gross of $760. Salaried workers are paid a set yearly amount instead, split evenly across paychecks. A $52,000 salary paid every two weeks is 26 checks of $2,000 gross.",
          visual: {
            type: "flip",
            cards: [
              { front: "Gross pay", back: "Everything you earned in a pay period before any deductions." },
              { front: "Net pay", back: "Take-home pay: what is left after taxes and other deductions." },
              { front: "Overtime", back: "Hours past 40 in one workweek, paid at 1.5 times the regular rate for most hourly workers." },
              { front: "Pay period", back: "The stretch of time one paycheck covers, such as one week or two weeks." },
              { front: "Salary", back: "A set yearly amount, split evenly across the year's paychecks." },
            ],
          },
          probe: {
            type: "number",
            prompt: "You earn $18 an hour. This week you work 46 hours. What is your gross pay for the week, including overtime?",
            answer: 882,
            tolerance: 0.01,
            unit: "$",
            hint: "Split the week in two: the first 40 hours at $18, then the extra hours at one and a half times $18.",
            mistakes: [
              { match: "828", coach: "That is 46 x 18, with no overtime. The 6 hours past 40 earn time and a half, $27 each." },
              { match: "774", coach: "You added only the extra half ($9) for the overtime hours. Overtime hours earn the full $27, not just $9 on top of nothing." },
              { match: "1242", coach: "You paid every hour at the overtime rate. Only the hours past 40 earn $27." },
            ],
            seconds: 60,
          },
          think: {
            q: "You earn $20 an hour and work 44 hours in one week. What is your gross pay?",
            choices: ["$880", "$920", "$1,320", "$960"],
            answer: 1,
            why: "40 x 20 = $800 regular, plus 4 overtime hours at 20 x 1.5 = $30 each, which is $120. Total: $920.",
            hints: [
              "That is 44 x 20 with no overtime. The 4 hours past 40 pay time and a half.",
              "",
              "You paid all 44 hours at the overtime rate. Only hours past 40 earn $30.",
              "You doubled the overtime hours. Overtime is time and a half, so $30 an hour, not $40.",
            ],
          },
          approaches: {
            analogy:
              "Overtime is like a late-night delivery fee. The same pizza costs more when the shop has to stay open past closing time. Your hours past 40 cost your employer extra for the same reason: they are asking for time beyond a normal week.",
            example:
              "Jonah earns $14 an hour and works 43 hours. Regular pay: 40 x 14 = $560. Overtime rate: 14 x 1.5 = $21. Overtime pay: 3 x 21 = $63. Gross pay: 560 + 63 = $623.",
            simpler: {
              q: "You earn $10 an hour. What is your overtime rate at time and a half?",
              choices: ["$15", "$11.50", "$20"],
              answer: 0,
              why: "Time and a half means 1.5 times the rate: 10 x 1.5 = $15.",
              hints: [
                "",
                "Time and a half is not $1.50 extra. It is one and a half times the whole rate.",
                "That is double time. Time and a half is 1.5 times, not 2 times.",
              ],
            },
          },
        },
        {
          title: "FICA: Social Security and Medicare",
          teach:
            "Two taxes come out of nearly every paycheck in America, and they are a fixed percent. Together they are called FICA, after the Federal Insurance Contributions Act. Social Security takes 6.2 percent of your gross pay, and Medicare takes 1.45 percent, for 7.65 percent in total. Social Security pays monthly benefits to retired workers, disabled workers and some of their families. Medicare helps pay for health care for people 65 and older. To find your FICA, turn each percent into a decimal and multiply. On a $1,200 paycheck, Social Security is 0.062 x 1,200 = $74.40 and Medicare is 0.0145 x 1,200 = $17.40, for $91.80 in total. Your employer pays a matching 7.65 percent that never shows up on your stub. Social Security tax stops once your earnings for the year pass a cap set above $170,000, so it applies to almost every worker's whole paycheck.",
          visual: {
            type: "hotspots",
            title: "Where FICA goes",
            center: "7.65% FICA",
            spots: [
              { label: "Social Security", icon: "👵", detail: "6.2 percent of gross pay. Funds monthly benefits for retired and disabled workers and some of their families." },
              { label: "Medicare", icon: "🏥", detail: "1.45 percent of gross pay. Helps pay for health care for people 65 and older." },
              { label: "Employer match", icon: "🏢", detail: "Your employer pays another 7.65 percent on top of your pay. It does not come out of your check." },
              { label: "Yearly cap", icon: "🧢", detail: "Social Security tax stops after a high yearly earnings cap. Medicare has no cap." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your gross pay this period is $850. How much is taken out for FICA (Social Security plus Medicare)? Round to the nearest cent.",
            answer: 65.03,
            tolerance: 0.01,
            unit: "$",
            hint: "FICA is 7.65 percent in total. Turn 7.65 percent into the decimal 0.0765 and multiply by the gross pay.",
            mistakes: [
              { match: "52.7", coach: "That is only Social Security (6.2 percent). Add Medicare's 1.45 percent too." },
              { match: "12.33", coach: "That is only Medicare (1.45 percent). Add Social Security's 6.2 percent too." },
              { match: "6502.5", coach: "Check the decimal: 7.65 percent is 0.0765, not 7.65." },
            ],
            seconds: 60,
          },
          think: {
            q: "Your gross pay is $1,000. How much FICA is withheld?",
            choices: ["$62.00", "$76.50", "$14.50", "$765.00"],
            answer: 1,
            why: "FICA is 7.65 percent: 0.0765 x 1,000 = $76.50 ($62.00 Social Security plus $14.50 Medicare).",
            hints: [
              "That is Social Security alone. Medicare comes out too.",
              "",
              "That is Medicare alone. Social Security comes out too.",
              "Check the decimal: 7.65 percent of $1,000 is much smaller than $765.",
            ],
          },
          approaches: {
            analogy:
              "Think of FICA like a club's dues that every working member pays. A fixed slice of each paycheck goes in, and the club pays out to members who are retired, disabled or need medical care in old age.",
            example:
              "Ana's gross pay is $640. Social Security: 0.062 x 640 = $39.68. Medicare: 0.0145 x 640 = $9.28. FICA total: 39.68 + 9.28 = $48.96. Shortcut check: 0.0765 x 640 = $48.96.",
            simpler: {
              q: "What is 7.65 percent of $100?",
              choices: ["$7.65", "$76.50", "$0.77"],
              answer: 0,
              why: "Percent means per hundred, so 7.65 percent of $100 is exactly $7.65.",
              hints: [
                "",
                "That would be 76.5 percent. Percent means out of each hundred.",
                "That is 7.65 percent of $10. Try it with $100.",
              ],
            },
          },
        },
        {
          title: "Income tax withholding and pre-tax choices",
          teach:
            "Federal income tax works differently from FICA. It is not one flat percent. The tax uses brackets, so higher slices of income are taxed at higher rates, and it is figured on your whole year of income. Your employer cannot know your whole year in advance, so it withholds an estimate from each check, using the Form W-4 you fill out when you are hired. Most states withhold a state income tax too, though a handful have no income tax on wages. Some deductions are your choice. Money you put into a traditional 401(k) retirement plan, and premiums for health insurance through work, are usually taken out before income tax is figured. That lowers your taxable pay. If you earn $1,200 and put 5 percent, or $60, into a 401(k), income tax is figured on $1,140. Each spring you file a tax return to settle up: too much withheld means a refund, too little means you owe.",
          visual: {
            type: "compare",
            left: {
              title: "FICA",
              points: ["Flat 7.65 percent", "Same rate for almost every worker", "Applies to gross pay", "Funds Social Security and Medicare"],
            },
            right: {
              title: "Income tax withholding",
              points: ["An estimate, set by your Form W-4", "Uses brackets: rates rise on higher slices", "Lowered by pre-tax deductions", "Settled each spring on your tax return"],
            },
          },
          probe: {
            type: "number",
            prompt: "Your gross pay is $1,500. You put 6 percent into a traditional 401(k), which is taken out before income tax. On how much pay is your income tax figured?",
            answer: 1410,
            tolerance: 0.01,
            unit: "$",
            hint: "First find 6 percent of $1,500. Then subtract it from gross pay, because pre-tax money is removed before income tax is figured.",
            mistakes: [
              { match: "90", coach: "That is the 401(k) contribution itself. Subtract it from the gross pay to find what is taxed." },
              { match: "1590", coach: "You added the contribution. Pre-tax savings come out first, so taxable pay goes down." },
              { match: "1494", coach: "You subtracted 6 dollars instead of 6 percent. Find 0.06 x 1,500 first." },
            ],
            seconds: 50,
          },
          think: {
            q: "Why does putting money into a traditional 401(k) lower the income tax withheld from your paycheck now?",
            choices: [
              "Because retirement savers are not allowed to pay taxes",
              "Because it also removes Social Security and Medicare",
              "Because the money is taken out before income tax is figured, so taxable pay is smaller",
              "Because your employer pays the income tax for you",
            ],
            answer: 2,
            why: "Pre-tax contributions come out first, so income tax is figured on a smaller amount. Income tax is generally owed later, when the money is withdrawn in retirement.",
            hints: [
              "Everyone with income may owe tax. The question is which dollars are counted right now.",
              "A traditional 401(k) lowers income tax, but FICA is still figured on your full pay.",
              "",
              "Your employer only sends in what it withheld from you. Think about what happens to your taxable pay.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a pizza being sliced for taxes. Before the tax collector picks up a knife, you move two slices to a box labeled retirement. The tax is figured only on the slices still on the table.",
            example:
              "Leo's gross pay is $2,000. He contributes 5 percent, $100, to a traditional 401(k) and $40 for health insurance, both pre-tax. Income tax is figured on 2,000 - 100 - 40 = $1,860. FICA is still figured on $1,960, because the 401(k) does not lower FICA.",
            simpler: {
              q: "Gross pay is $1,000 and $50 goes to a pre-tax 401(k). How much pay is income tax figured on?",
              choices: ["$1,050", "$950", "$50"],
              answer: 1,
              why: "Pre-tax money comes out first: 1,000 - 50 = $950.",
              hints: [
                "Pre-tax savings come out, so the taxable amount gets smaller, not bigger.",
                "",
                "That is the savings. What is left after the savings are removed?",
              ],
            },
          },
        },
        {
          title: "Reading your pay stub",
          teach:
            "Every paycheck comes with a pay stub, a receipt for your work. A typical stub has three parts. Earnings shows your hours, rate and gross pay. Deductions lists everything taken out: federal income tax, state income tax, Social Security, Medicare, and any choices like a 401(k) or health insurance. Net pay is what is left, the amount that actually lands in your account. The rule is simple: net pay equals gross pay minus all deductions. Most stubs also show YTD, or year-to-date, totals, which add up everything since January 1. Read your stub every payday. Check that your hours are right, that overtime was paid at time and a half, and that nothing strange appears. Payroll mistakes happen, and you are the person most likely to notice. Keep your stubs until your Form W-2 arrives after the year ends, and compare them.",
          visual: {
            type: "hotspots",
            title: "A pay stub",
            center: "Pay stub",
            spots: [
              { label: "Earnings", icon: "⏱️", detail: "Hours, pay rate, overtime and gross pay for this pay period." },
              { label: "Taxes", icon: "🏛️", detail: "Federal income tax, state income tax, Social Security and Medicare." },
              { label: "Other deductions", icon: "🩺", detail: "Choices like 401(k) savings and health or dental insurance." },
              { label: "Net pay", icon: "💵", detail: "Gross pay minus all deductions. This is what you take home." },
              { label: "YTD", icon: "📅", detail: "Year-to-date: running totals since January 1." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your stub shows: gross pay $1,200; federal income tax $84; state income tax $38; Social Security $74.40; Medicare $17.40; health insurance $45. What is your net pay?",
            answer: 941.2,
            tolerance: 0.01,
            unit: "$",
            hint: "Add up every deduction first, then subtract that total from the gross pay.",
            mistakes: [
              { match: "258.8", coach: "That is the total of the deductions. Net pay is what is left after you subtract them from $1,200." },
              { match: "1458.8", coach: "You added the deductions to gross pay. Deductions come out, so subtract." },
              { match: "1116", coach: "You subtracted only the federal income tax. Every line in the deductions section comes out." },
            ],
            seconds: 70,
          },
          think: {
            q: "What does a YTD column on a pay stub show?",
            choices: [
              "Your pay for yesterday only",
              "Your pay before you were hired",
              "Your bank account balance",
              "Running totals since January 1 of this year",
            ],
            answer: 3,
            why: "YTD stands for year-to-date: everything earned and withheld since January 1.",
            hints: [
              "Stubs cover whole pay periods, not single days. What does the Y stand for?",
              "You were not paid before you were hired. Think about the letters Y, T and D.",
              "Your employer does not see your bank balance. YTD is about your pay this year.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A pay stub is like a store receipt in reverse. A receipt starts with a total and lists what you bought. A pay stub starts with what you earned and lists everything taken away, so you can see exactly how the total shrank.",
            example:
              "Gross $900. Deductions: federal $63, state $27, Social Security $55.80, Medicare $13.05. Total deductions: 63 + 27 + 55.80 + 13.05 = $158.85. Net pay: 900 - 158.85 = $741.15.",
            simpler: {
              q: "Gross pay is $500 and deductions total $80. What is net pay?",
              choices: ["$580", "$80", "$420"],
              answer: 2,
              why: "Net = gross minus deductions: 500 - 80 = $420.",
              hints: [
                "Deductions come out of your pay, so the total should go down.",
                "That is what was taken out, not what you keep.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each line from a pay stub into the right section.",
        buckets: ["Earnings", "Taxes withheld", "Deductions you chose"],
        items: [
          { text: "Regular hours x pay rate", bucket: 0 },
          { text: "Overtime at time and a half", bucket: 0 },
          { text: "Holiday pay", bucket: 0 },
          { text: "Federal income tax", bucket: 1 },
          { text: "Social Security", bucket: 1 },
          { text: "Medicare", bucket: 1 },
          { text: "State income tax", bucket: 1 },
          { text: "401(k) contribution", bucket: 2 },
          { text: "Health insurance premium", bucket: 2 },
          { text: "Dental insurance premium", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "A friend just got hired at $15 an hour for 40 hours a week and is planning to spend $600 every Friday. Explain why their deposit will be smaller and how to figure out what they will really take home.",
        keyPoints: [
          "Gross pay is earned before deductions; net pay is what you take home",
          "Social Security and Medicare (FICA) take 7.65 percent",
          "Income tax is withheld based on earnings and the W-4",
          "Net pay equals gross pay minus all deductions",
          "Read the pay stub to check hours and deductions",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "You earn $17 an hour, paid every two weeks. In week 1 you work 42 hours; in week 2 you work 38 hours. Overtime is figured week by week. What is your gross pay for the two weeks?",
          answer: 1377,
          tolerance: 0.01,
          unit: "$",
          hint: "Figure each week on its own. Only week 1 has hours past 40, and those earn 1.5 x $17.",
          mistakes: [
            { match: "1360", coach: "That is 80 x 17 with no overtime. Overtime is figured each workweek, and week 1 went 2 hours past 40." },
          ],
          seconds: 90,
        },
        {
          type: "number",
          prompt: "Your gross pay is $2,400. How much in total is withheld for Social Security and Medicare?",
          answer: 183.6,
          tolerance: 0.01,
          unit: "$",
          hint: "FICA is 6.2 percent plus 1.45 percent. Multiply the gross pay by 0.0765.",
          mistakes: [
            { match: "148.8", coach: "That is only Social Security. Add Medicare's 1.45 percent." },
            { match: "34.8", coach: "That is only Medicare. Add Social Security's 6.2 percent." },
          ],
          seconds: 50,
        },
        {
          type: "match",
          prompt: "Match each paycheck term to what it means.",
          pairs: [
            { left: "Form W-4", right: "Tells your employer how much income tax to withhold" },
            { left: "Form W-2", right: "Your employer's yearly summary of your pay and taxes" },
            { left: "Withholding", right: "Tax held back from each check and sent in for you" },
            { left: "Pre-tax deduction", right: "Money removed before income tax is figured" },
            { left: "Tax refund", right: "Money returned when too much was withheld" },
            { left: "Net pay", right: "What lands in your account after all deductions" },
          ],
          hint: "W-4 happens when you are hired; W-2 arrives after the year ends. Pre-tax means before income tax is figured.",
          mistakes: [
            { match: "Swapped W-4 and W-2", coach: "The W-4 is a form you fill out at the start. The W-2 is the summary your employer sends after the year ends." },
            { match: "Matched refund to withholding", coach: "Withholding is taken out during the year. A refund comes back when too much was taken." },
          ],
          seconds: 70,
        },
        {
          type: "build",
          prompt: "Build the rule for finding your take-home pay.",
          tiles: ["Net pay", "equals", "gross pay", "minus", "all deductions"],
          distractors: ["plus", "times 7.65 percent"],
          hint: "Start with what you take home. Then think about what you start with and what comes out of it.",
          mistakes: [
            { match: "Used plus instead of minus", coach: "Deductions come out of your pay, so net pay is smaller than gross pay." },
          ],
          seconds: 35,
        },
        {
          type: "cloze",
          text: "Social Security takes {0} percent of gross pay and Medicare takes {1} percent. Hours past {2} in one workweek usually earn overtime.",
          blanks: [{ answers: ["6.2"] }, { answers: ["1.45"] }, { answers: ["40", "forty"] }],
          bank: ["6.2", "1.45", "40", "7.65", "10", "35"],
          hint: "The two FICA pieces add up to 7.65 percent. The bigger piece is Social Security.",
          mistakes: [
            { match: "7.65", coach: "7.65 percent is the two taxes together. Each blank asks for one piece." },
            { match: "35", coach: "Overtime begins after a standard full-time week. How many hours is that?" },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What is gross pay?",
          choices: [
            "What you take home after deductions",
            "Everything you earned before any deductions",
            "Only your overtime pay",
            "The taxes your employer pays",
          ],
          answer: 1,
          why: "Gross pay is the full amount earned. Net pay is what is left after deductions.",
        },
        {
          q: "You earn $12 an hour and work 50 hours in one week. What is your gross pay?",
          choices: ["$600", "$900", "$660", "$540"],
          answer: 2,
          why: "40 x 12 = $480, plus 10 overtime hours at $18 = $180. Total: $660.",
        },
        {
          q: "What percent of gross pay goes to FICA for most workers?",
          choices: ["7.65 percent", "6.2 percent", "1.45 percent", "15.3 percent"],
          answer: 0,
          why: "FICA is 6.2 percent for Social Security plus 1.45 percent for Medicare. Your employer pays another 7.65 percent separately.",
        },
        {
          q: "Which form tells your employer how much federal income tax to withhold?",
          choices: ["Form W-2", "A pay stub", "Form W-4", "A bank statement"],
          answer: 2,
          why: "You fill out a Form W-4 when you are hired. The W-2 is the yearly summary that comes later.",
        },
        {
          q: "Gross pay is $1,000 and deductions total $230. What is net pay?",
          choices: ["$1,230", "$230", "$700", "$770"],
          answer: 3,
          why: "Net pay = gross minus deductions: 1,000 - 230 = $770.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make a mock pay stub. Find a real entry-level job listing near you with an hourly rate. Build a two-week pay stub where week 1 has 44 hours and week 2 has 36 hours. Show gross pay with overtime figured by week, Social Security, Medicare, an estimated 5 percent for federal income tax, your state's income tax (look up whether your state has one; estimate 3 percent if it does), and net pay. Finish with one sentence on what surprised you.",
        rubric: [
          "Uses a real job listing and its hourly rate",
          "Figures overtime correctly, week by week, at time and a half",
          "Shows Social Security (6.2 percent) and Medicare (1.45 percent) correctly",
          "Lists every deduction and subtracts them all to get net pay",
          "Lays the stub out clearly in earnings, deductions and net pay sections",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-hs.budget",
      title: "Budgeting: Give Every Dollar a Job",
      minutes: 35,
      stage: "logic",
      read: p(
        `A budget is a plan for your money made before you spend it. It starts with your net monthly income, the take-home pay that actually arrives. Budget from net pay, not gross, because you cannot spend money that was withheld. If you are paid every two weeks, there are 26 paychecks a year, so multiply one check by 26 and divide by 12 for a true monthly figure.`,
        `Next, list your expenses. Fixed costs stay the same each month: rent, a car payment, insurance, a phone plan. Variable costs change with your choices: groceries, gas, eating out, entertainment and clothes. Fixed costs are hard to change quickly, so variable costs are where you have the most control.`,
        `A popular starting guideline is 50/30/20: about 50 percent of net income to needs, 30 percent to wants, and 20 percent to savings and paying down debt. On $2,800 a month, that is $1,400 for needs, $840 for wants and $560 for savings. It is a guideline, not a law. In expensive cities, rent alone can eat half a starting paycheck, so people find roommates or cut wants to keep saving.`,
        `Most budgets do not fail on rent. They fail on small costs nobody tracks. A $6 coffee five workdays a week is $1,560 a year. Track every dollar for a month, then decide on purpose where each one goes. Many people use a zero-based budget, giving every dollar of income a job, savings included, and they pay themselves first by moving savings out on payday.`,
        `The first savings goal is an emergency fund: cash set aside for true surprises like a car repair or a lost job. A common guideline is three to six months of essential expenses. Start with $1,000, then build. Keep it in an insured savings account, not in stocks, because emergencies often arrive when markets are down.`,
        `Franklin warned, "Beware of little expenses; a small leak will sink a great ship." A budget is how you find the leaks before the water gets in.`
      ),
      keyIdeas: [
        "Budget from net income; fixed costs stay the same, variable costs are where you have control.",
        "The 50/30/20 guideline: needs, wants, and savings plus debt payoff.",
        "Track spending, give every dollar a job, and pay yourself first.",
        "Build an emergency fund of three to six months of essential expenses.",
      ],
      hook: {
        text: "Jordan is 19 and takes home $2,600 a month. Rent, gas and groceries are covered, and there's usually a little left over. Then the car's transmission fails: a $1,400 repair. With nothing saved, it goes on a credit card at 24 percent interest, and the surprise keeps costing Jordan money for the next year. What could Jordan have done differently?",
      },
      teach: [
        {
          title: "Income, fixed costs and variable costs",
          teach:
            "A budget starts with one number: your net monthly income, the take-home pay that actually arrives. Budget from net, not gross, because you cannot spend money that was withheld. If you are paid every two weeks, remember there are 26 paychecks a year, not 24, so multiply one check by 26 and divide by 12 for a true monthly figure. Next, list your expenses in two groups. Fixed costs stay the same each month: rent, a car payment, insurance, a phone plan. Variable costs change with your choices: groceries, gas, eating out, entertainment, clothes. Fixed costs are hard to change quickly, because you signed a lease or a contract. Variable costs are where you have the most control month to month, which makes them the first place to look when a budget does not balance. Some costs, like car repairs or yearly fees, are irregular, so smart budgeters set aside a little each month for them.",
          visual: {
            type: "compare",
            left: {
              title: "Fixed costs",
              points: ["Same amount every month", "Rent, car payment, insurance, phone plan", "Set by a lease or contract", "Hard to change quickly"],
            },
            right: {
              title: "Variable costs",
              points: ["Change from month to month", "Groceries, gas, eating out, clothes", "Set by your daily choices", "The first place to trim"],
            },
          },
          probe: {
            type: "sort",
            prompt: "Sort each monthly expense: fixed or variable?",
            buckets: ["Fixed cost", "Variable cost"],
            items: [
              { text: "Apartment rent on a 12-month lease", bucket: 0 },
              { text: "Car loan payment", bucket: 0 },
              { text: "Car insurance premium", bucket: 0 },
              { text: "Phone plan at a set monthly price", bucket: 0 },
              { text: "Groceries", bucket: 1 },
              { text: "Gas for the car", bucket: 1 },
              { text: "Eating out with friends", bucket: 1 },
              { text: "Clothes", bucket: 1 },
            ],
            hint: "Ask: is this the same dollar amount every month no matter what I do, or does it change with my choices?",
            mistakes: [
              { match: "Put groceries in fixed", coach: "Groceries are a need, but the amount changes with what and where you buy. Need and fixed are not the same thing." },
              { match: "Put car insurance in variable", coach: "Your premium is set in your policy and stays the same each month, so it is fixed." },
            ],
            seconds: 45,
          },
          think: {
            q: "Your take-home pay is $1,150 every two weeks. What is your true monthly income?",
            choices: ["$2,300.00", "$2,491.67", "$2,760.00", "$1,150.00"],
            answer: 1,
            why: "There are 26 biweekly paychecks a year: 1,150 x 26 = $29,900, and 29,900 / 12 = $2,491.67 a month.",
            hints: [
              "That counts two checks a month, but some months have three. Use 26 checks a year divided by 12 months.",
              "",
              "That is too high. Multiply by 26 paychecks a year, then divide by 12 months.",
              "That is one paycheck. You are paid twice or more each month.",
            ],
          },
          approaches: {
            analogy:
              "Fixed costs are like the rails of a train track: set in place and slow to move. Variable costs are the steering wheel of a car: you turn it every day with your choices. When you need to change direction fast, grab the wheel.",
            example:
              "Kai takes home $2,700 a month. Fixed: rent $950, car payment $280, insurance $130, phone $45, for $1,405. Variable: groceries $350, gas $160, eating out $220, other $175, for $905. Total: $2,310. That leaves $390 a month to plan for savings.",
            simpler: {
              q: "Which of these is a fixed cost?",
              choices: ["Rent on a lease", "Groceries", "Movie tickets"],
              answer: 0,
              why: "Rent on a lease is the same every month until the lease changes.",
              hints: [
                "",
                "Groceries change each month depending on what you buy.",
                "Movie tickets depend on how often you choose to go.",
              ],
            },
          },
        },
        {
          title: "The 50/30/20 guideline",
          teach:
            "One popular starting point is the 50/30/20 guideline. Split net income three ways: about 50 percent to needs, 30 percent to wants, and 20 percent to savings and paying down debt. Needs are what you must pay to live and work: housing, utilities, basic groceries, transportation, insurance and minimum debt payments. Wants are everything else: eating out, streaming, travel, upgrades. On $2,800 a month, that is 0.50 x 2,800 = $1,400 for needs, 0.30 x 2,800 = $840 for wants and 0.20 x 2,800 = $560 for savings. It is a guideline, not a law. In expensive cities, rent alone can eat half of a starting paycheck, so many people live with roommates or cut wants to protect the 20 percent. The real point is the order of priorities: cover needs, protect savings, then enjoy wants with what remains. Move the sliders to try other splits.",
          visual: {
            type: "budget",
            income: 2800,
            categories: [
              { label: "Needs", pct: 50 },
              { label: "Wants", pct: 30 },
              { label: "Savings and debt payoff", pct: 20 },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your net income is $3,150 a month. Using 50/30/20, how much should go to savings and debt payoff each month?",
            answer: 630,
            tolerance: 0.01,
            unit: "$",
            hint: "Savings is the 20 percent slice. Multiply the net income by 0.20.",
            mistakes: [
              { match: "945", coach: "That is the 30 percent slice for wants. Savings is the 20 percent slice." },
              { match: "1575", coach: "That is the 50 percent slice for needs. Savings is the 20 percent slice." },
              { match: "63", coach: "Check the decimal: 20 percent is 0.20, not 0.02." },
            ],
            seconds: 40,
          },
          think: {
            q: "Net income is $2,400. Rent $1,050, utilities $150, groceries $300, car insurance $140 and gas $120 are all needs. How do these needs compare with the 50 percent guideline?",
            choices: [
              "They fit: needs are under $1,200",
              "They are exactly 50 percent",
              "They total $1,760, about 73 percent, well over the guideline",
              "The guideline only counts rent",
            ],
            answer: 2,
            why: "1,050 + 150 + 300 + 140 + 120 = $1,760. Half of $2,400 is $1,200, and 1,760 / 2,400 is about 73 percent.",
            hints: [
              "Add all five needs, not just one or two. Then compare with half of $2,400.",
              "Half of $2,400 is $1,200. Add up all five needs and compare.",
              "",
              "Needs include utilities, groceries, insurance and transportation too, not just housing.",
            ],
          },
          approaches: {
            analogy:
              "Think of 50/30/20 like a plate at dinner: half vegetables and protein you need, a smaller portion of dessert you want, and a slice saved in a container for tomorrow. You can adjust portions, but you never skip the container.",
            example:
              "Priya takes home $3,000. Needs: 0.50 x 3,000 = $1,500. Wants: 0.30 x 3,000 = $900. Savings: 0.20 x 3,000 = $600. Her rent is high, so needs are really $1,700. She trims wants to $700 and keeps savings at $600.",
            simpler: {
              q: "What is 20 percent of $1,000?",
              choices: ["$200", "$20", "$2,000"],
              answer: 0,
              why: "20 percent is 0.20, and 0.20 x 1,000 = $200.",
              hints: [
                "",
                "That is 2 percent. Twenty percent is ten times bigger.",
                "That is more than the whole $1,000. A part must be smaller than the whole.",
              ],
            },
          },
        },
        {
          title: "Find the leaks and give every dollar a job",
          teach:
            "Most budgets do not fail on rent. They fail on small variable costs nobody tracks. A $6 coffee five workdays a week sounds harmless, but 6 x 5 x 52 = $1,560 a year. Three subscriptions at $12, $15 and $11 a month add up to $38 a month, or $456 a year. To find your leaks, track every dollar for one month using a notebook, a spreadsheet or your bank's transaction list. Then sort each expense into needs and wants and compare with your plan. You are not trying to ban every treat; you are deciding on purpose. Many people use a zero-based budget, where every dollar of income gets a job, savings included, until income minus planned spending and saving equals zero. Then they automate. Savings moves out on payday before any spending starts. That habit is called paying yourself first, and it works because you cannot spend what you never see.",
          visual: {
            type: "flip",
            cards: [
              { front: "Tracking", back: "Writing down every dollar you spend for a month so you see where it really goes." },
              { front: "Zero-based budget", back: "Income minus planned spending and saving equals zero. Every dollar has a job." },
              { front: "Pay yourself first", back: "Move savings out on payday, before any spending starts." },
              { front: "Money leak", back: "A small, repeated cost that adds up to a lot over a year." },
            ],
          },
          probe: {
            type: "number",
            prompt: "You buy lunch out for $9 four workdays a week. Packing lunch costs about $3. How much would you save in a year (52 weeks) by packing lunch on those days?",
            answer: 1248,
            tolerance: 0.01,
            unit: "$",
            hint: "Find the savings per lunch, multiply by lunches per week, then by 52 weeks.",
            mistakes: [
              { match: "1872", coach: "That is the full cost of buying lunch out. Packing still costs $3, so you save $6 per lunch." },
              { match: "24", coach: "That is the savings for one week. Multiply by 52 weeks." },
              { match: "624", coach: "That is the cost of packed lunches. You want the difference: $6 saved per lunch." },
            ],
            seconds: 60,
          },
          think: {
            q: "Your income is $2,500. You have planned $2,350 for bills, spending and savings. What does a zero-based budget tell you to do next?",
            choices: [
              "Nothing; $150 left over is fine to spend as it comes",
              "Give the remaining $150 a specific job, like extra savings",
              "Cut your savings so the numbers look smaller",
              "Spend $150 more than you earn",
            ],
            answer: 1,
            why: "In a zero-based budget, income minus every planned dollar equals zero. The last $150 needs a job too.",
            hints: [
              "Unplanned money tends to disappear. A zero-based budget gives every dollar a purpose.",
              "",
              "Cutting savings moves you away from your goals. What should happen to the extra $150?",
              "Spending more than you earn means borrowing. The goal is exactly zero left unplanned.",
            ],
          },
          approaches: {
            analogy:
              "A zero-based budget is like a coach assigning every player a position before the game. Nobody wanders the field. Money with no job wanders off too.",
            example:
              "Maria tracks a month and finds $64 on snacks, $45 on rideshares and $38 on subscriptions she forgot. She cancels one $15 subscription and plans $30 for snacks. That frees $49 a month, or $588 a year, which she automates into savings on payday.",
            simpler: {
              q: "You spend $5 a day, seven days a week. How much is that per week?",
              choices: ["$12", "$35", "$57"],
              answer: 1,
              why: "5 x 7 = $35 a week.",
              hints: [
                "You added 5 and 7. You spend $5 again on each of the 7 days.",
                "",
                "That is the digits side by side. Multiply 5 by 7.",
              ],
            },
          },
        },
        {
          title: "Your emergency fund",
          teach:
            "An emergency fund is cash set aside only for true surprises: a car repair, a medical bill, a lost job. Without one, a $1,400 repair goes on a credit card, and the surprise keeps costing you interest for months. A common guideline is to save three to six months of essential expenses, meaning needs only, not your whole spending. If rent, utilities, groceries, insurance and transportation cost $1,800 a month, three months is $5,400 and six months is $10,800. That sounds huge, so start with a first goal of $1,000, then keep building. Keep it somewhere safe and easy to reach, like a savings account at an FDIC-insured bank, where deposits are insured up to $250,000 per depositor, per bank, for each type of account ownership. Do not invest your emergency fund in stocks, because emergencies often arrive when markets are down. A sale or a concert is not an emergency. If you use the fund, refill it first.",
          visual: {
            type: "compare",
            left: {
              title: "True emergency",
              points: ["Car repair you need to get to work", "Unexpected medical bill", "Losing your job", "A broken furnace in winter"],
            },
            right: {
              title: "Not an emergency",
              points: ["A great sale", "Concert tickets", "A new phone when the old one works", "A last-minute trip"],
            },
          },
          probe: {
            type: "number",
            prompt: "Your essential expenses are $2,150 a month. You want an emergency fund covering 4 months. If you save $430 a month, how many months will it take to reach your goal?",
            answer: 20,
            tolerance: 0,
            unit: "months",
            hint: "First find the goal: 4 months of essential expenses. Then divide the goal by what you save each month.",
            mistakes: [
              { match: "8600", coach: "That is the goal in dollars. Now divide it by $430 a month to find how many months." },
              { match: "5", coach: "That is how many months of saving cover one month of expenses. Your goal is four months of expenses." },
            ],
            seconds: 60,
          },
          think: {
            q: "Which is the best use of an emergency fund?",
            choices: [
              "A half-price sale on a TV you have wanted",
              "Concert tickets that are about to sell out",
              "Fixing your car's brakes so you can get to work",
              "Buying stocks after the market drops",
            ],
            answer: 2,
            why: "An emergency fund is for necessary, unexpected costs. Safe brakes and getting to work are both.",
            hints: [
              "A sale is a want, even a good one. Emergencies are necessary and unexpected.",
              "Tickets are a want. Would missing them hurt your health, safety or income?",
              "",
              "Emergency money should stay safe and ready, not be invested in something that can fall.",
            ],
          },
          approaches: {
            analogy:
              "An emergency fund is like a spare tire. You hope you never need it, you never use it for fun, and when a tire blows out on the highway, it turns a disaster into a 20-minute delay.",
            example:
              "Tess's essentials are $1,600 a month. Her first goal is $1,000, which she reaches in 5 months by saving $200. Her full goal, three months, is 3 x 1,600 = $4,800. At $200 a month, the remaining $3,800 takes 19 more months.",
            simpler: {
              q: "Your essential expenses are $1,000 a month. How much is three months' worth?",
              choices: ["$300", "$1,000", "$3,000"],
              answer: 2,
              why: "Three months: 3 x 1,000 = $3,000.",
              hints: [
                "That is less than one month of expenses. Multiply by 3.",
                "That covers only one month. You need three.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps for building your first budget in order.",
        steps: [
          "Figure out your monthly net income",
          "List your fixed costs",
          "Track your variable spending for a month",
          "Set your savings amount and pay yourself first",
          "Give every remaining dollar a job, wants included",
          "Review and adjust at the end of each month",
        ],
      },
      explain: {
        prompt:
          "A friend says budgets are only for people who are broke. Explain what a budget really does, and walk them through setting one up on their first paycheck.",
        keyPoints: [
          "A budget tells money where to go before you spend it",
          "Start from net income, then list fixed and variable costs",
          "The 50/30/20 guideline: needs, wants, savings",
          "Pay yourself first and track spending to find leaks",
          "Build an emergency fund for real surprises",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Your take-home pay is $1,240 every two weeks. What is your true monthly income? Round to the nearest cent.",
          answer: 2686.67,
          tolerance: 0.01,
          unit: "$",
          hint: "There are 26 biweekly paychecks a year. Find the yearly total, then divide by 12 months.",
          mistakes: [
            { match: "2480", coach: "That counts exactly two checks a month. A year has 26 checks, so some months have three." },
            { match: "32240", coach: "That is your yearly income. Divide by 12 for a month." },
          ],
          seconds: 60,
        },
        {
          type: "sort",
          prompt: "Sort each item in a 50/30/20 budget.",
          buckets: ["Needs (50)", "Wants (30)", "Savings and debt payoff (20)"],
          items: [
            { text: "Rent", bucket: 0 },
            { text: "Electric bill", bucket: 0 },
            { text: "Basic groceries", bucket: 0 },
            { text: "Minimum payment on a student loan", bucket: 0 },
            { text: "Streaming service", bucket: 1 },
            { text: "Weekend trip", bucket: 1 },
            { text: "Dinner out", bucket: 1 },
            { text: "Emergency fund deposit", bucket: 2 },
            { text: "Retirement contribution", bucket: 2 },
            { text: "Extra payment above the minimum on a credit card", bucket: 2 },
          ],
          hint: "Minimum debt payments are needs. Anything extra you pay toward debt counts as savings and debt payoff.",
          mistakes: [
            { match: "Put the minimum payment in savings", coach: "The minimum is required to stay in good standing, so it is a need. Only payments above the minimum go in the 20 percent." },
            { match: "Put dinner out in needs", coach: "Food is a need, but dinner out is a choice. Basic groceries cover the need." },
          ],
          seconds: 70,
        },
        {
          type: "cloze",
          text: "Under 50/30/20, a net income of $2,600 means about ${0} for needs, ${1} for wants and ${2} for savings and debt payoff.",
          blanks: [{ answers: ["1300", "1,300"] }, { answers: ["780"] }, { answers: ["520"] }],
          hint: "Multiply $2,600 by 0.50, then by 0.30, then by 0.20. The three answers should add back to $2,600.",
          mistakes: [
            { match: "1560", coach: "That is 60 percent. Needs are 50 percent: 0.50 x 2,600." },
            { match: "260", coach: "That is 10 percent. Savings is 20 percent: 0.20 x 2,600." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "Your essential expenses are $1,950 a month. You have $2,100 saved. How much more do you need to reach a 3-month emergency fund?",
          answer: 3750,
          tolerance: 0.01,
          unit: "$",
          hint: "Find the full goal (3 months of essentials), then subtract what you already have.",
          mistakes: [
            { match: "5850", coach: "That is the full goal. Subtract the $2,100 you already saved." },
            { match: "150", coach: "That compares one month to your savings. The goal is three months of expenses." },
          ],
          seconds: 50,
        },
      ],
      check: [
        {
          q: "Why should you build a budget from net pay instead of gross pay?",
          choices: [
            "Net pay is always bigger",
            "Gross pay includes money withheld that you never receive",
            "Banks require it",
            "Gross pay is only for salaried workers",
          ],
          answer: 1,
          why: "Taxes and other deductions are withheld before you are paid, so only net pay is available to spend.",
        },
        {
          q: "Which is a variable cost?",
          choices: ["Rent on a lease", "A car loan payment", "A set monthly phone plan", "Eating out"],
          answer: 3,
          why: "Eating out changes month to month with your choices. The others are fixed amounts.",
        },
        {
          q: "Your net income is $3,000. Using 50/30/20, how much goes to wants?",
          choices: ["$900", "$600", "$1,500", "$300"],
          answer: 0,
          why: "Wants are 30 percent: 0.30 x 3,000 = $900.",
        },
        {
          q: "What does paying yourself first mean?",
          choices: [
            "Buying something for yourself every payday",
            "Paying your bills before your friends",
            "Moving money into savings as soon as you are paid, before spending",
            "Asking your employer for a raise",
          ],
          answer: 2,
          why: "Saving first, automatically, means savings happen before the money can be spent.",
        },
        {
          q: "Essential expenses are $2,000 a month. What is a full six-month emergency fund?",
          choices: ["$6,000", "$2,000", "$10,000", "$12,000"],
          answer: 3,
          why: "6 x 2,000 = $12,000.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Build a realistic first-apartment budget. Pick a real entry-level job in your area and estimate monthly net pay (use about 80 percent of gross). Look up a real local rent for a one-bedroom or a room with roommates, and estimate utilities, groceries, transportation, insurance and phone. Lay it out as a 50/30/20 budget in a spreadsheet or on paper, show how long it would take to save a 3-month emergency fund, and explain one trade-off you would make to keep saving 20 percent.",
        rubric: [
          "Uses a real job and a real local rent, with sources noted",
          "Separates fixed and variable costs and counts all major needs",
          "Shows correct 50/30/20 math from net income",
          "Calculates months to reach a 3-month emergency fund",
          "Explains one clear trade-off and why it is worth it",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-hs.investing",
      title: "Investing: Owning a Piece of the Future",
      minutes: 40,
      stage: "logic",
      read: p(
        `Saving keeps money safe. Investing puts it to work. The two most common investments are stocks and bonds. A stock is a small piece of ownership in a company. Owners can earn money when the share price rises and when the company pays dividends, a share of its profits. A bond is a loan to a government or company, which pays you interest and returns your money on a set date. Stocks swing more in price than bonds, but over long periods they have usually grown faster. Owners take more risk than lenders and have usually been paid more for it.`,
        `Picking a few winning stocks is very hard, even for professionals. Diversification means spreading your money across many investments so one failure cannot sink you. An index fund buys every company in a market index, such as about 500 large U.S. companies, in a single fund. Because nobody is paid to pick stocks, index funds usually charge very low fees, and fees matter: 1 percent a year on $50,000 is $500, while 0.05 percent is $25.`,
        `Risk means your investment can fall, sometimes a lot. From late 2007 to early 2009, the broad U.S. stock market lost more than half its value, then recovered over the next several years. Money you need within a few years belongs in safe savings. Money you will not touch for decades can ride out the swings. Past results never guarantee future results.`,
        `Time is the investor's greatest tool. Over long periods, broad U.S. stock indexes have averaged roughly 7 percent a year after inflation. At 7 percent, money doubles about every 10 years, by the rule of 72. Emma invests $200 a month from age 22 to 32 and then stops. Ethan starts at 32 and invests $200 a month until 65. Emma puts in $24,000 and Ethan $79,200, yet at 7 percent Emma ends with more. Her money had ten extra years to grow.`,
        `The lesson is not to chase hot tips. It is to start early, diversify, keep costs low, and stay patient.`
      ),
      keyIdeas: [
        "A stock is ownership; a bond is a loan. Owners take more risk and have usually earned more over time.",
        "Diversify with low-cost index funds instead of betting on a few companies.",
        "Match risk to time: short-term money stays safe, long-term money can ride out swings.",
        "Compound growth rewards starting early. The rule of 72 estimates doubling time.",
      ],
      hook: {
        text: "Emma invests $200 a month from age 22 to 32, then never adds another dollar. Ethan waits until 32, then invests $200 a month all the way to 65. Ethan puts in more than three times as much money. At 65, using the same 7 percent growth, Emma has more. How is that possible?",
      },
      teach: [
        {
          title: "Stocks and bonds: owners and lenders",
          teach:
            "A stock is a small piece of ownership in a company. If a company has 10 million shares and you own 100, you own a tiny slice of the whole business. You can make money two ways: the share price rises as the company becomes more valuable, and some companies pay dividends, a share of their profits, to their owners. If the company struggles, the price can fall, even to zero. A bond is a loan. When you buy a bond, you lend money to a government or a company, and it promises to pay you interest and return your money on a set date, called maturity. A $1,000 bond paying 4 percent pays $40 a year in interest. Bond prices usually swing less than stock prices, but over long periods bonds have usually grown more slowly. Owners take more risk than lenders, and over the long run they have usually been paid more for it.",
          visual: {
            type: "compare",
            left: {
              title: "Stock (owner)",
              points: ["A piece of ownership in a company", "Earn from rising price and dividends", "Can fall a lot, even to zero", "Higher long-run growth, bigger swings"],
            },
            right: {
              title: "Bond (lender)",
              points: ["A loan to a government or company", "Earn set interest payments", "Money returned at maturity", "Smaller swings, usually slower growth"],
            },
          },
          probe: {
            type: "number",
            prompt: "You buy 25 shares of a company at $40 each. A year later the price is $46, and during the year the company paid dividends of $1.20 per share. What is your total gain in dollars?",
            answer: 180,
            tolerance: 0.01,
            unit: "$",
            hint: "Add two kinds of gain: the price rise on all 25 shares, plus the dividends on all 25 shares.",
            mistakes: [
              { match: "150", coach: "That is the price gain only. Add the dividends: 25 x $1.20." },
              { match: "30", coach: "That is the dividends only. Add the price gain: 25 x ($46 - $40)." },
              { match: "1150", coach: "That is what your shares are worth now. The question asks how much you gained." },
            ],
            seconds: 60,
          },
          think: {
            q: "Which best describes a bond?",
            choices: [
              "A share of ownership in a company",
              "A guaranteed way to double your money",
              "A loan you make to a government or company in exchange for interest",
              "A savings account at a bank",
            ],
            answer: 2,
            why: "A bondholder is a lender: they receive interest and get their money back at maturity.",
            hints: [
              "Ownership describes a stock. A bondholder lends money instead.",
              "No investment guarantees doubling. Think about what you actually do when you buy a bond.",
              "",
              "A savings account is a bank deposit. A bond is a loan to a government or company.",
            ],
          },
          approaches: {
            analogy:
              "Imagine a friend opening a lemonade stand. If you chip in for a share of the stand, you are an owner: big summer, big payout; rainy summer, maybe nothing. If you lend her $20 for 5 percent, you are a lender: you get your $21 back either way, unless the stand fails completely.",
            example:
              "Nina buys 10 shares at $50, or $500. The price rises to $56 and she receives $2 per share in dividends. Price gain: 10 x 6 = $60. Dividends: 10 x 2 = $20. Total gain: $80, a 16 percent return on $500.",
            simpler: {
              q: "When you buy a stock, what are you?",
              choices: ["A part owner of the company", "A lender to the company", "A customer of the company"],
              answer: 0,
              why: "A share of stock is a small piece of ownership.",
              hints: [
                "",
                "Lenders buy bonds. Stock buyers get something different.",
                "Customers buy products. Stock buyers buy a piece of the company itself.",
              ],
            },
          },
        },
        {
          title: "Index funds, diversification and fees",
          teach:
            "Picking a few winning stocks is very hard, even for professionals. Diversification means spreading your money across many investments so one failure cannot sink you. If you own one company and it goes bankrupt, you can lose everything. If you own 500 companies and one fails, you lose a small fraction. A mutual fund or an exchange-traded fund pools money from many investors to buy many stocks or bonds at once. An index fund simply buys every company in a market index, such as the S&P 500, a list of about 500 large U.S. companies. Because nobody is paid to pick stocks, index funds usually charge very low fees. Fees matter more than they look. A fund's yearly fee is called its expense ratio. An expense ratio of 1 percent on $50,000 costs $500 a year, while 0.05 percent costs $25. Over decades, that gap can grow to tens of thousands of dollars.",
          visual: {
            type: "hotspots",
            title: "Inside an index fund",
            center: "One fund",
            spots: [
              { label: "Many companies", icon: "🏢", detail: "One share of the fund owns small pieces of hundreds of companies." },
              { label: "Diversified", icon: "🧺", detail: "If one company fails, it is a small part of the whole." },
              { label: "Low fees", icon: "🪙", detail: "No one is paid to pick stocks, so expense ratios can be tiny." },
              { label: "Follows the market", icon: "📈", detail: "It aims to match the index, not beat it." },
            ],
          },
          probe: {
            type: "number",
            prompt: "You have $30,000 invested. Fund A charges an expense ratio of 0.75 percent a year. Fund B, an index fund, charges 0.04 percent. How many more dollars per year does Fund A cost?",
            answer: 213,
            tolerance: 0.01,
            unit: "$",
            hint: "Find each fund's yearly fee (percent as a decimal times $30,000), then subtract.",
            mistakes: [
              { match: "225", coach: "That is Fund A's whole fee. Subtract Fund B's fee to find the difference." },
              { match: "12", coach: "That is Fund B's fee. Find Fund A's fee too, then subtract." },
              { match: "21300", coach: "Check the decimals: 0.75 percent is 0.0075, and 0.04 percent is 0.0004." },
            ],
            seconds: 70,
          },
          think: {
            q: "Why does diversification lower risk?",
            choices: [
              "It guarantees you will never lose money",
              "It means one company's failure is only a small part of what you own",
              "It puts all your money in the safest single company",
              "It removes all fees",
            ],
            answer: 1,
            why: "Spreading money across many companies means no single failure can wipe you out.",
            hints: [
              "Diversified investments can still fall when the whole market falls. What does it protect against?",
              "",
              "Putting everything in one company is the opposite of diversifying.",
              "Fees are a separate question. Think about what happens when one company fails.",
            ],
          },
          approaches: {
            analogy:
              "Diversification is like not carrying all your eggs in one basket. Trip with one basket and every egg breaks. Spread them across 500 baskets and a stumble costs you a few eggs.",
            example:
              "Sam puts $5,000 in one company's stock; it goes bankrupt and he loses $5,000. Lia puts $5,000 in an index fund holding 500 companies. If that same company is about 0.2 percent of her fund, her loss from it is about 0.002 x 5,000 = $10.",
            simpler: {
              q: "Which is more diversified?",
              choices: ["Stock in one company", "A fund holding 500 companies"],
              answer: 1,
              why: "500 companies spread your risk far more than one.",
              hints: [
                "One company means one failure could hurt you badly.",
                "",
              ],
            },
          },
        },
        {
          title: "Risk and time",
          teach:
            "Risk in investing means your money can go down, sometimes a lot, before it goes up. From late 2007 to early 2009, the S&P 500 lost more than half its value. People who sold in a panic locked in their losses. People who held on saw prices recover over the next several years. That is why your time horizon, how long until you need the money, matters so much. Money you need within a few years, like an emergency fund, a car down payment or next year's tuition, belongs in insured savings or other safe places. Money you will not touch for decades, like retirement savings, can ride out the swings of stocks, which have historically grown faster than bonds or savings accounts over long periods. Past results never guarantee future results, and any single year can be negative. The longer your money can stay invested, the more short-term ups and downs you can afford to live through.",
          visual: {
            type: "timeline",
            events: [
              { year: 2007, label: "Market peak", detail: "U.S. stocks reached a high in October 2007." },
              { year: 2008, label: "Financial crisis", detail: "Banks failed and stock prices fell sharply through the year." },
              { year: 2009, label: "The bottom", detail: "By March 2009, the S&P 500 had lost more than half its value from the peak." },
              { year: 2013, label: "Back to the old high", detail: "Patient investors saw the index climb back past its 2007 peak." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Where should the money for each goal go?",
            buckets: ["Safe savings (needed within a few years)", "Stock index funds (10+ years away)"],
            items: [
              { text: "Your emergency fund", bucket: 0 },
              { text: "A car down payment next year", bucket: 0 },
              { text: "College tuition due in 18 months", bucket: 0 },
              { text: "Rent money for next month", bucket: 0 },
              { text: "Retirement savings at age 20", bucket: 1 },
              { text: "Money you won't need for 30 years", bucket: 1 },
              { text: "A long-term fund for a house in 15 years", bucket: 1 },
            ],
            hint: "Ask: if the market dropped by half next month, could I wait years for it to recover before I need this money?",
            mistakes: [
              { match: "Put the emergency fund in stocks", coach: "Emergencies often come when markets are down. This money must be safe and ready." },
              { match: "Put retirement at 20 in savings", coach: "Retirement is over 40 years away. That long horizon can ride out drops and benefit from stocks' growth." },
            ],
            seconds: 50,
          },
          think: {
            q: "You are 25 and investing for retirement in a stock index fund. The market drops 30 percent this year. What is usually the most sensible move?",
            choices: [
              "Sell everything right away to stop the losses",
              "Move it all into one stock that is going up",
              "Stop saving until prices recover",
              "Keep investing on your plan; you have decades for prices to recover",
            ],
            answer: 3,
            why: "With a decades-long horizon, selling locks in losses. Staying the course has historically let investors recover and grow.",
            hints: [
              "Selling after a drop turns a temporary paper loss into a real one.",
              "Chasing one hot stock gives up diversification and adds risk.",
              "Stopping means you miss buying at lower prices. Your goal is still decades away.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Investing in stocks is like a long road trip through the mountains. There are steep drops, but the road climbs overall. If you jump out at the bottom of a valley, you never reach the summit. If you only have a short drive, take the flat highway instead.",
            example:
              "Two investors each had $10,000 in an S&P 500 index fund in October 2007. By March 2009, each was down to under $5,000. One sold. The other held on and kept adding, and by 2013 the index was back above its 2007 high. Only the one who held recovered.",
            simpler: {
              q: "You need money for a car in 6 months. Where should it go?",
              choices: ["Stocks", "Safe savings", "One risky company"],
              answer: 1,
              why: "Six months is too short to wait out a market drop.",
              hints: [
                "Stocks can fall a lot in six months, and you might have to sell low.",
                "",
                "One company is even riskier than the whole market.",
              ],
            },
          },
        },
        {
          title: "Compound growth over decades",
          teach:
            "Compound growth means your earnings start earning too. Over long periods, broad U.S. stock indexes have averaged roughly 7 percent a year after inflation, with big ups and downs along the way. At 7 percent, money doubles about every 10 years, by the rule of 72: divide 72 by the rate, and 72 / 7 is about 10. That makes starting early enormously powerful. Emma invests $200 a month from age 22 to 32, then stops forever: $24,000 in total. Ethan waits, then invests $200 a month from 32 all the way to 65: $79,200 in total. Growing at 7 percent a year, Emma ends up with about $330,000 at 65 and Ethan with about $305,000. Emma put in less than a third as much and still came out ahead, because her money had ten extra years to double. Time in the market is the one ingredient you cannot buy later.",
          visual: { type: "compound", principal: 10000, rate: 7, years: 40 },
          probe: {
            type: "target",
            prompt: "At 20, you invest $10,000 in an index fund and never add more. Assume it grows 7 percent a year. Slide the years to find the first year the balance reaches at least $100,000.",
            goal: { sim: "compound", principal: 10000, rate: 7, target: 100000 },
            hint: "Use the rule of 72 to estimate: about 10 years per doubling. $10,000 to $100,000 is a bit more than three doublings. Then check in the simulator.",
            mistakes: [
              { match: "34 years", coach: "So close! After 34 years you have about $99,781, just short of $100,000. One more year does it." },
              { match: "30 years", coach: "After 30 years you have about $76,000. Keep going." },
            ],
            seconds: 70,
          },
          think: {
            q: "Using the rule of 72, about how long does money take to double at 9 percent a year?",
            choices: ["About 8 years", "About 9 years", "About 72 years", "About 81 years"],
            answer: 0,
            why: "Divide 72 by the rate: 72 / 9 = 8 years.",
            hints: [
              "",
              "That is the rate itself. Divide 72 by the rate.",
              "That is the rule's number, not the answer. Divide it by 9.",
              "You added 72 and 9. The rule divides 72 by the rate.",
            ],
          },
          approaches: {
            analogy:
              "Compound growth is like a snowball rolling downhill. At first it picks up only a little snow. But the bigger it gets, the more snow it grabs with every turn. Start it at the top of a long hill, and it arrives at the bottom enormous.",
            example:
              "$10,000 at 7 percent: after 10 years, about $19,672. After 20 years, about $38,697. After 30 years, about $76,123. After 40 years, about $149,745. Each decade adds more than the last, because each year's growth is figured on a bigger balance.",
            simpler: {
              q: "$1,000 grows 10 percent in a year. How much is it after one year?",
              choices: ["$1,010", "$1,100", "$2,000"],
              answer: 1,
              why: "10 percent of $1,000 is $100, so the balance is $1,100.",
              hints: [
                "That is 1 percent growth. Ten percent of $1,000 is $100.",
                "",
                "That would be 100 percent growth. Ten percent is one-tenth.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each description: stock, bond or index fund?",
        buckets: ["Stock", "Bond", "Index fund"],
        items: [
          { text: "A share of ownership in one company", bucket: 0 },
          { text: "May pay dividends from one company's profits", bucket: 0 },
          { text: "Could fall to zero if that one company fails", bucket: 0 },
          { text: "A loan to a government or company", bucket: 1 },
          { text: "Pays set interest and returns your money at maturity", bucket: 1 },
          { text: "Owns every company in a market index", bucket: 2 },
          { text: "Instant diversification with very low fees", bucket: 2 },
          { text: "Aims to match the market instead of beating it", bucket: 2 },
        ],
      },
      explain: {
        prompt:
          "Your cousin just turned 18, has $2,000 saved, and thinks investing is gambling. Explain how investing works, how to lower risk, and why starting now matters.",
        keyPoints: [
          "A stock is ownership and a bond is a loan",
          "Diversify with low-cost index funds",
          "Money needed soon stays in safe savings; long-term money can be invested",
          "Compound growth means earnings earn more over time",
          "Starting early gives money more years to grow",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "You invest $5,000 and add nothing more. It grows 7 percent a year. Find the first year it reaches at least $20,000.",
          goal: { sim: "compound", principal: 5000, rate: 7, target: 20000 },
          hint: "$5,000 to $20,000 is two doublings. At 7 percent, each doubling takes about 10 years. Check the exact year in the simulator.",
          mistakes: [
            { match: "20 years", coach: "After 20 years you have about $19,348, just short. One more year." },
            { match: "14 years", coach: "That only gets you to about $12,900. Two doublings take about 20 years at 7 percent." },
          ],
          seconds: 70,
        },
        {
          type: "number",
          prompt: "Using the rule of 72, about how many years does it take money to double at 6 percent a year?",
          answer: 12,
          tolerance: 0,
          unit: "years",
          hint: "Divide 72 by the yearly percent.",
          mistakes: [
            { match: "432", coach: "You multiplied. The rule of 72 divides 72 by the rate." },
            { match: "66", coach: "You subtracted. Divide 72 by 6 instead." },
          ],
          seconds: 30,
        },
        {
          type: "match",
          prompt: "Match each investing term to its meaning.",
          pairs: [
            { left: "Dividend", right: "A share of company profits paid to owners" },
            { left: "Maturity", right: "The date a bond pays back your money" },
            { left: "Diversification", right: "Spreading money across many investments" },
            { left: "Expense ratio", right: "A fund's yearly fee as a percent of your money" },
            { left: "Time horizon", right: "How long until you need the money" },
          ],
          hint: "Think about which words belong to stocks, which to bonds, and which to funds.",
          mistakes: [
            { match: "Matched dividend to interest on a bond", coach: "Bonds pay interest. Dividends come from a company's profits to its owners." },
          ],
          seconds: 60,
        },
        {
          type: "cloze",
          text: "A stock makes you an {0} of a company, while a bond makes you a {1}. Spreading money across many companies is called {2}.",
          blanks: [{ answers: ["owner"] }, { answers: ["lender"] }, { answers: ["diversification", "diversifying"] }],
          bank: ["owner", "lender", "diversification", "customer", "borrower", "speculation"],
          hint: "When you buy a bond, you are the one handing over money to be paid back with interest.",
          mistakes: [
            { match: "borrower", coach: "The company or government is the borrower. You, the bond buyer, are the lender." },
            { match: "customer", coach: "Customers buy products. A shareholder owns part of the business." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "What does owning a share of stock mean?",
          choices: [
            "You lent money to the company",
            "You own a small piece of the company",
            "The company owes you a fixed payment",
            "You work for the company",
          ],
          answer: 1,
          why: "Stock is ownership. Bonds are loans.",
        },
        {
          q: "Why do index funds usually have low fees?",
          choices: [
            "They only buy one stock",
            "They are guaranteed by the government",
            "No one is paid to pick stocks; they just buy the whole index",
            "They never go down",
          ],
          answer: 2,
          why: "Index funds follow a list of companies instead of paying managers to pick stocks.",
        },
        {
          q: "Where does money you need in 6 months belong?",
          choices: ["Safe, insured savings", "A single hot stock", "A stock index fund", "Under your mattress"],
          answer: 0,
          why: "Short-term money should not be exposed to market drops. Insured savings keeps it safe and earning a little.",
        },
        {
          q: "At about 7 percent a year, roughly how often does money double?",
          choices: ["Every year", "Every 50 years", "Every 72 years", "About every 10 years"],
          answer: 3,
          why: "Rule of 72: 72 / 7 is about 10 years.",
        },
        {
          q: "Why did Emma end up with more than Ethan even though she invested less?",
          choices: [
            "She picked better stocks",
            "Her money had more years to compound",
            "She paid higher fees",
          ],
          answer: 1,
          why: "Starting ten years earlier gave her money an extra doubling.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Make a compound-growth projection. In a spreadsheet or on paper, show what $100 a month invested from your current age to 65 could grow to at 5, 7 and 9 percent a year. Then show the same plan starting 10 years later. Use a table with one row per 5 years. Finish with a short paragraph on what you learned about time and rate, noting that real returns are never guaranteed.",
        rubric: [
          "Builds a correct year-by-year or 5-year table for each rate",
          "Compares starting now with starting 10 years later",
          "Shows total contributions versus total growth",
          "States clearly that returns vary and are not guaranteed",
          "Draws a clear conclusion about starting early",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-hs.credit",
      title: "Credit and Debt: Borrowing Without Getting Trapped",
      minutes: 40,
      stage: "logic",
      read: p(
        `Borrowing is not good or bad by itself. It is a tool, and like any tool it can build or wreck. When you borrow, interest is the price of using someone else's money. Lenders state it as an APR, or annual percentage rate. Credit cards charge interest monthly, so divide the APR by 12. At 24 percent APR, that is 2 percent a month. If you pay your full statement balance by the due date each month, most cards charge no interest on purchases at all.`,
        `The trap is the minimum payment. Pay only a small amount and most of it goes to interest. Owe $2,000 at 24 percent and pay $50 a month, and it takes nearly seven years to pay off, with about $2,060 in interest: more than the original purchase. Pay $200 a month and you finish in a year with about $250 in interest.`,
        `Your credit score is a three-digit number, usually from 300 to 850, that tells lenders how likely you are to repay. The biggest factors are paying on time and how much of your credit limits you use. Keep card balances low, ideally under 30 percent of your limits. A strong score means lower rates on car loans and mortgages, which can save thousands of dollars.`,
        `Some loans are built to keep you paying. Payday loans often charge $15 for every $100 borrowed for two weeks, which works out to an APR of about 390 percent. Rent-to-own deals and very long car loans can cost far more than the item is worth. Buy-now-pay-later plans make it easy to stack up small payments.`,
        `The rules are simple. Borrow only for things that last or grow in value. Compare the total cost, not the monthly payment. Pay every bill on time. Keep an emergency fund so a surprise never becomes a debt. Franklin put it bluntly in Poor Richard's Almanack: "He that goes a borrowing goes a sorrowing."`
      ),
      keyIdeas: [
        "APR is the yearly cost of borrowing; divide by 12 for a card's monthly rate.",
        "Minimum payments stretch debt out for years and multiply the interest.",
        "Credit scores reward on-time payments and low balances compared with limits.",
        "Avoid debt traps: compare total cost, not the monthly payment.",
      ],
      hook: {
        text: "Riley and Casey each buy the same $2,000 laptop with a credit card charging 24 percent APR. Riley pays $200 a month and is done in a year, paying about $250 in interest. Casey pays $50 a month. It takes him nearly seven years, and he pays about $2,060 in interest, more than the laptop cost. Same laptop, same card. What happened?",
      },
      teach: [
        {
          title: "Interest rates and APR",
          teach:
            "When you borrow, interest is the price you pay for using someone else's money. Lenders state it as an APR, or annual percentage rate: the yearly cost of the loan, including certain fees. Credit cards charge interest monthly, so divide the APR by 12 to get the monthly rate. At 24 percent APR, that is 2 percent a month. On a $2,000 balance, one month's interest is about 0.02 x 2,000 = $40. Cards actually figure interest daily on your average balance, but the monthly shortcut gets you close. Rates vary a lot. Mortgages and car loans are backed by the house or car, so they usually have lower rates. Credit cards are backed by nothing but your promise, and they often charge 20 percent or more. Most cards also give a grace period: if you pay the full statement balance by the due date every month, you pay no interest on purchases at all.",
          visual: { type: "compound", principal: 2000, rate: 24, years: 5 },
          probe: {
            type: "number",
            prompt: "You carry a $1,800 balance on a card with a 21 percent APR. About how much interest is charged for one month?",
            answer: 31.5,
            tolerance: 0.01,
            unit: "$",
            hint: "Divide the APR by 12 to get the monthly rate, turn it into a decimal, then multiply by the balance.",
            mistakes: [
              { match: "378", coach: "That is a whole year of interest. Divide the APR by 12 for one month." },
              { match: "21", coach: "That is the APR as a number. Find the monthly rate (21 / 12 = 1.75 percent) and apply it to $1,800." },
              { match: "3150", coach: "Check the decimal: 1.75 percent is 0.0175, not 1.75." },
            ],
            seconds: 50,
          },
          think: {
            q: "A card has an 18 percent APR. What is its monthly interest rate?",
            choices: ["18 percent", "6 percent", "0.18 percent", "1.5 percent"],
            answer: 3,
            why: "Monthly rate = APR / 12 = 18 / 12 = 1.5 percent.",
            hints: [
              "18 percent is the yearly rate. A month is one-twelfth of a year.",
              "That divides by 3. There are 12 months in a year.",
              "You moved the decimal instead of dividing by 12.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Borrowing is like renting money. A car rental charges you by the day; a card charges you rent on the money by the month. The APR is the rental price for a whole year, so a month costs one-twelfth of it.",
            example:
              "Dev owes $1,500 at 24 percent APR. Monthly rate: 24 / 12 = 2 percent. Interest this month: 0.02 x 1,500 = $30. If he pays the full balance by the due date instead, he owes $0 in interest on those purchases.",
            simpler: {
              q: "What is 24 divided by 12?",
              choices: ["12", "2", "288"],
              answer: 1,
              why: "24 / 12 = 2, so a 24 percent APR is about 2 percent a month.",
              hints: [
                "That is 24 minus 12. Try dividing.",
                "",
                "That is 24 times 12. We want to split 24 into 12 equal parts.",
              ],
            },
          },
        },
        {
          title: "The minimum payment trap",
          teach:
            "Your card statement shows a minimum payment, often a small percent of the balance or a set amount like $25 to $40. Paying it keeps your account in good standing, but very little goes toward the actual debt. Look at Casey. He owes $2,000 at 24 percent APR and pays $50 a month. In the first month, interest is $40, so only $10 of his $50 shrinks the balance. At that pace, it takes him about 82 months, nearly seven years, to pay off the laptop, and he pays about $2,060 in interest. Riley pays $200 a month on the same debt and finishes in 12 months, paying about $250 in interest. Federal law requires card statements to show how long payoff will take if you pay only the minimum. Read that box. A good rule of thumb: if you cannot pay something off within a month or two, you probably cannot afford it on a card.",
          visual: {
            type: "compare",
            left: {
              title: "Casey: $50 a month",
              points: ["First month: $40 interest, $10 to the balance", "About 82 months to pay off", "About $2,060 in interest", "Total paid: over $4,000 for a $2,000 laptop"],
            },
            right: {
              title: "Riley: $200 a month",
              points: ["First month: $40 interest, $160 to the balance", "12 months to pay off", "About $250 in interest", "Total paid: about $2,250"],
            },
          },
          probe: {
            type: "number",
            prompt: "You owe $1,200 on a card with an 18 percent APR and make a $45 payment. How much of that first payment actually reduces your balance?",
            answer: 27,
            tolerance: 0.01,
            unit: "$",
            hint: "First find one month's interest (18 / 12 = 1.5 percent of $1,200). The rest of the payment goes to the balance.",
            mistakes: [
              { match: "18", coach: "That is the interest for the month. Subtract it from $45 to see what reduces the balance." },
              { match: "45", coach: "Not all of the payment reduces the balance. Interest is paid first." },
              { match: "1155", coach: "That is what you would owe if the whole $45 went to the balance. Interest takes its share first." },
            ],
            seconds: 60,
          },
          think: {
            q: "Why does paying only the minimum keep you in debt so long?",
            choices: [
              "Because minimum payments are illegal",
              "Because most of each small payment goes to interest, so the balance barely shrinks",
              "Because the card company adds a new laptop each month",
              "Because the APR drops when you pay less",
            ],
            answer: 1,
            why: "When interest takes most of a small payment, only a little reduces what you owe, and next month's interest is figured on a balance that barely moved.",
            hints: [
              "Minimum payments are legal and keep you in good standing. What part of the payment goes where?",
              "",
              "No new purchases are needed. Look at how the $50 is split between interest and balance.",
              "The APR does not drop when you pay less. Think about the interest part of each payment.",
            ],
          },
          approaches: {
            analogy:
              "Paying the minimum is like bailing a leaky boat with a teaspoon. You are working every month, but the water keeps coming in almost as fast as you scoop it out. A bucket, a bigger payment, actually empties the boat.",
            example:
              "Balance $3,000 at 20 percent APR. Monthly interest is about 3,000 x 0.20 / 12 = $50. Pay $60, and only $10 reduces the debt. Pay $300, and $250 reduces the debt. The same $50 of interest is a small slice of a big payment and most of a small one.",
            simpler: {
              q: "You pay $50. Interest this month is $40. How much goes toward the balance?",
              choices: ["$90", "$50", "$10"],
              answer: 2,
              why: "Interest is paid first: 50 - 40 = $10 goes to the balance.",
              hints: [
                "You added them. The interest comes out of your payment.",
                "Part of the $50 goes to interest first.",
                "",
              ],
            },
          },
        },
        {
          title: "Credit scores and how to build one",
          teach:
            "A credit score is a three-digit number that tells lenders how likely you are to repay. The most widely used scores run from 300 to 850. A higher score makes it easier to get approved and earns lower interest rates on car loans and mortgages, and landlords often check credit too. The company behind the most common score says five things drive it: payment history, about 35 percent; amounts owed, about 30 percent; length of credit history, about 15 percent; new credit, about 10 percent; and credit mix, about 10 percent. Paying every bill on time is the single biggest factor. Amounts owed is largely measured by credit utilization: your card balances divided by your credit limits. A $600 balance on a $2,000 limit is 30 percent utilization. Many experts suggest staying under 30 percent, and lower is better. You can check your credit reports free at AnnualCreditReport.com, the official site set up under federal law.",
          visual: {
            type: "hotspots",
            title: "What drives a credit score",
            center: "300 to 850",
            spots: [
              { label: "Payment history (35%)", icon: "✅", detail: "Paying every bill on time, every month. The biggest factor." },
              { label: "Amounts owed (30%)", icon: "📊", detail: "Mostly utilization: card balances divided by credit limits. Lower is better." },
              { label: "Length of history (15%)", icon: "⏳", detail: "How long your accounts have been open. Older is better." },
              { label: "New credit (10%)", icon: "🆕", detail: "Opening many accounts quickly can lower your score for a while." },
              { label: "Credit mix (10%)", icon: "🧩", detail: "Handling different kinds of credit, such as a card and an installment loan." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Card A has a $450 balance and a $1,500 limit. Card B has a $300 balance and a $3,500 limit. What is your overall credit utilization, as a percent?",
            answer: 15,
            tolerance: 0.1,
            unit: "%",
            hint: "Add both balances, add both limits, then divide total balance by total limit and turn it into a percent.",
            mistakes: [
              { match: "30", coach: "That is Card A alone. Overall utilization combines both cards." },
              { match: "38.57", coach: "You added the two cards' percents. Instead, divide total balances by total limits." },
              { match: "0.15", coach: "Right idea! Now turn the decimal into a percent by multiplying by 100." },
            ],
            seconds: 70,
          },
          think: {
            q: "Which habit has the biggest effect on a credit score?",
            choices: [
              "Paying every bill on time",
              "Opening many new cards at once",
              "Checking your own credit report",
              "Carrying a balance to show you use the card",
            ],
            answer: 0,
            why: "Payment history is the biggest factor, about 35 percent of the most common score.",
            hints: [
              "",
              "Opening many accounts quickly can actually lower your score for a while.",
              "Checking your own report does not hurt or help your score. It just lets you catch errors.",
              "You do not need to carry a balance or pay interest to build credit. Paying in full works.",
            ],
          },
          approaches: {
            analogy:
              "A credit score is like a reputation at school. Turn in your work on time all year and teachers trust you with a big project. Miss deadlines and they hesitate, even if your work is good when it arrives.",
            example:
              "Jada has one card with a $1,000 limit. She uses it for gas, about $150 a month, and pays the full statement balance on time every month. Her utilization stays near 15 percent, she pays no interest, and her payment history grows month by month.",
            simpler: {
              q: "A $200 balance on a $1,000 limit is what utilization?",
              choices: ["2 percent", "20 percent", "200 percent"],
              answer: 1,
              why: "200 / 1,000 = 0.20, which is 20 percent.",
              hints: [
                "Check the decimal: 200 out of 1,000 is 0.20, not 0.02.",
                "",
                "The balance is smaller than the limit, so utilization must be under 100 percent.",
              ],
            },
          },
        },
        {
          title: "Debt traps to avoid",
          teach:
            "Some kinds of borrowing are built to keep you paying. A payday loan lends a few hundred dollars until your next paycheck for a fee, often $15 for every $100 borrowed for two weeks. That sounds small, but there are 26 two-week periods in a year, so the APR is about 15 x 26 = 390 percent. Many borrowers cannot repay in two weeks and roll the loan over, paying the fee again and again. Rent-to-own stores let you pay weekly for furniture or electronics, but the total can be far more than the store price. Car loans of six or seven years lower the monthly payment while raising the total interest, and you can end up owing more than the car is worth. Buy-now-pay-later plans split purchases into small payments that are easy to stack up. The protection is simple: borrow only for things that last or grow in value, compare the total cost instead of the monthly payment, and keep an emergency fund.",
          visual: {
            type: "flip",
            cards: [
              { front: "Payday loan", back: "A short loan against your next paycheck. Fees often equal an APR near 400 percent." },
              { front: "Rollover", back: "Paying a fee to extend a payday loan instead of repaying it, so fees pile up." },
              { front: "Rent-to-own", back: "Weekly payments for an item. The total often far exceeds the store price." },
              { front: "Upside down", back: "Owing more on a car loan than the car is worth." },
              { front: "Total cost", back: "Every payment added up. Compare this, not the monthly payment." },
            ],
          },
          probe: {
            type: "number",
            prompt: "A payday lender charges a $20 fee for every $100 borrowed for two weeks. If you kept borrowing this way for a full year, what APR is that, in percent?",
            answer: 520,
            tolerance: 0,
            unit: "%",
            hint: "The fee is 20 percent for two weeks. Count how many two-week periods are in a year (26) and multiply.",
            mistakes: [
              { match: "20", coach: "That is the cost for just two weeks. APR is the yearly rate: there are 26 two-week periods in a year." },
              { match: "240", coach: "You multiplied by 12 months. Payday loans run two weeks, and a year has 26 two-week periods." },
              { match: "40", coach: "That is about one month. APR covers a whole year: 26 two-week periods." },
            ],
            seconds: 50,
          },
          think: {
            q: "A dealer offers a car loan with a lower monthly payment by stretching it from 4 years to 7. What should you check before saying yes?",
            choices: [
              "Only whether the monthly payment fits",
              "The color of the car",
              "Whether the dealer is friendly",
              "The total cost of all payments over the life of the loan",
            ],
            answer: 3,
            why: "A longer loan usually means more total interest, even with a smaller monthly payment.",
            hints: [
              "A smaller monthly payment can hide a much bigger total. What should you compare instead?",
              "Color does not change what the loan costs you.",
              "Friendliness does not change the math. What number shows the full cost?",
              "",
            ],
          },
          approaches: {
            analogy:
              "A debt trap is like a fishing lure. It looks like a small, tasty snack: just $15, just $25 a week. The hook is hidden underneath: fees and interest that keep pulling long after the snack is gone.",
            example:
              "A $600 TV at a rent-to-own store costs $20 a week for 78 weeks. Total: 20 x 78 = $1,560, which is $960 more than the price. Saving $20 a week for 30 weeks would buy it outright for $600.",
            simpler: {
              q: "You pay $20 a week for 10 weeks. What is the total cost?",
              choices: ["$30", "$200", "$2,000"],
              answer: 1,
              why: "20 x 10 = $200.",
              hints: [
                "You added 20 and 10. Each week you pay $20 again.",
                "",
                "That is ten times too much. Multiply 20 by 10.",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each habit: does it build strong credit, or is it a debt trap?",
        buckets: ["Builds strong credit", "Debt trap or credit damage"],
        items: [
          { text: "Paying the full statement balance every month", bucket: 0 },
          { text: "Setting up automatic payments so you never miss a due date", bucket: 0 },
          { text: "Keeping card balances under 30 percent of the limit", bucket: 0 },
          { text: "Checking your free credit reports for errors", bucket: 0 },
          { text: "Paying only the minimum month after month", bucket: 1 },
          { text: "Rolling over a payday loan again and again", bucket: 1 },
          { text: "Choosing a 7-year car loan for the lowest payment", bucket: 1 },
          { text: "Maxing out a card to buy gifts", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Your friend just got their first credit card and plans to pay the minimum each month to build credit. Explain what will really happen and what they should do instead.",
        keyPoints: [
          "APR divided by 12 is the monthly interest rate",
          "Minimum payments go mostly to interest and stretch debt for years",
          "Paying the full balance by the due date avoids interest on purchases",
          "On-time payments and low utilization build a credit score",
          "Compare total cost, not monthly payment",
        ],
      },
      mastery: [
        {
          type: "target",
          prompt: "Suppose $2,500 of card debt is left unpaid at a 20 percent yearly rate, compounding once a year in this simple model. Find the first year the debt reaches at least $5,000.",
          goal: { sim: "compound", principal: 2500, rate: 20, target: 5000 },
          hint: "The rule of 72 says 72 / 20 is about 3.6 years to double. Check the exact year in the simulator.",
          mistakes: [
            { match: "3 years", coach: "After 3 years the debt is $4,320, still short of $5,000. One more year." },
            { match: "5 years", coach: "It happens sooner. Check one year earlier: it has already passed $5,000." },
          ],
          seconds: 60,
        },
        {
          type: "number",
          prompt: "You owe $2,400 on a card with a 22.5 percent APR. About how much interest is charged for one month?",
          answer: 45,
          tolerance: 0.01,
          unit: "$",
          hint: "Monthly rate = 22.5 / 12 = 1.875 percent. Multiply $2,400 by 0.01875.",
          mistakes: [
            { match: "540", coach: "That is a full year's interest. Divide by 12 for one month." },
          ],
          seconds: 50,
        },
        {
          type: "place",
          prompt: "Place each credit score factor at its approximate weight in the most common score (in percent).",
          min: 0,
          max: 40,
          step: 5,
          tolerance: 2,
          items: [
            { label: "Payment history", value: 35 },
            { label: "Amounts owed", value: 30 },
            { label: "Length of credit history", value: 15 },
            { label: "New credit", value: 10 },
          ],
          hint: "Paying on time is the biggest factor, and how much you owe is close behind.",
          mistakes: [
            { match: "Swapped payment history and amounts owed", coach: "Both are big, but paying on time is the single largest factor." },
          ],
          seconds: 60,
        },
        {
          type: "build",
          prompt: "Build the best rule for using a credit card without paying interest on purchases.",
          tiles: ["Pay the", "full statement balance", "by the", "due date", "every month"],
          distractors: ["minimum payment", "when you can"],
          hint: "The grace period only protects you when you pay everything you owe, on time.",
          mistakes: [
            { match: "Used minimum payment", coach: "Paying the minimum leaves a balance that is charged interest. The rule needs the full statement balance." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "A card's APR is 24 percent. About what is its monthly interest rate?",
          choices: ["24 percent", "12 percent", "2 percent", "0.24 percent"],
          answer: 2,
          why: "24 / 12 = 2 percent a month.",
        },
        {
          q: "What happens when you pay only the minimum on a card balance?",
          choices: [
            "Most of the payment goes to interest and payoff takes years",
            "The balance is paid off in one month",
            "The APR drops to zero",
            "Your credit limit doubles",
          ],
          answer: 0,
          why: "Small payments mostly cover interest, so the balance shrinks slowly and total interest grows.",
        },
        {
          q: "What is credit utilization?",
          choices: [
            "How many cards you own",
            "Your card balances divided by your credit limits",
            "The interest rate on your card",
            "How long you have had credit",
          ],
          answer: 1,
          why: "Utilization compares what you owe on cards with your total limits. Lower is better.",
        },
        {
          q: "A payday loan charges $15 per $100 for two weeks. Its APR is closest to:",
          choices: ["15 percent", "30 percent", "180 percent", "390 percent"],
          answer: 3,
          why: "15 percent every two weeks times 26 periods a year is about 390 percent.",
        },
        {
          q: "What is the best way to compare two loan offers?",
          choices: [
            "Pick the lowest monthly payment",
            "Compare the total cost of all payments",
            "Pick the longest loan",
          ],
          answer: 1,
          why: "A low monthly payment can hide a much higher total cost.",
        },
      ],
      task: {
        kind: "project",
        prompt:
          "Run the numbers on a real credit offer. Find a real student or starter credit card disclosure (the table of rates and fees) and note its purchase APR. Then, in a spreadsheet or on paper, figure how long it would take to pay off a $1,000 balance at that APR paying $30 a month versus $100 a month, and how much total interest each costs. Finish with three personal rules you will follow when you get your first card.",
        rubric: [
          "Records a real card's purchase APR and where it came from",
          "Figures the monthly rate correctly (APR / 12)",
          "Shows month-by-month or summary math for both payment plans",
          "Compares total interest paid in each plan",
          "Writes three clear, practical rules for using credit",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "money-hs.protect",
      title: "Protecting What You Build",
      minutes: 40,
      stage: "rhetoric",
      read: p(
        `Building wealth is half the job. Protecting it is the other half. Three threats can undo years of saving: a big unexpected loss, a scam, and slowly drifting habits.`,
        `Insurance protects against big losses. Many people each pay a premium into a pool, and the few who suffer a large loss are paid from it. When you file a claim, you first pay your deductible, then often a share called coinsurance, up to an out-of-pocket maximum. The rule is to insure what you could not afford to replace yourself: health, a car's liability, renters coverage for your belongings, and later disability and life insurance when others depend on your income. Skip insurance on small things you could replace from savings.`,
        `Scams are the second threat. The Federal Trade Commission reported that Americans lost more than $10 billion to fraud in 2023. Nearly every scam uses the same red flags: urgency, a caller pretending to be from your bank or the government, a demand for gift cards, wire transfers or cryptocurrency, a prize that requires a fee, and a request to keep it secret. A real bank will never ask for your password or the code it just texted you. When in doubt, hang up and call the number on the back of your card.`,
        `Protect your identity too. Use long, unique passwords and two-factor sign-in. A credit freeze, free at each of the three national credit bureaus, stops anyone from opening new credit in your name.`,
        `The third threat is quiet: habits. Wealth usually comes from ordinary choices repeated for decades. Spend less than you earn. Automate your saving. Take any employer retirement match, which is free money. When you get a raise, save at least half of it before your spending quietly rises to match. Be suspicious of anything promising fast, guaranteed riches.`,
        `Franklin built his fortune slowly, as a printer who saved, invested and avoided debt. The wealthy are often not the people who earn the most, but the people who keep and grow what they earn.`
      ),
      keyIdeas: [
        "Insurance trades a small certain cost for protection against large losses: know premium, deductible and coinsurance.",
        "Scams share red flags: urgency, fake authority, unusual payment and secrecy. Stop and verify.",
        "Protect your identity with strong passwords, two-factor sign-in and a free credit freeze.",
        "Wealth comes from habits: spend less than you earn, automate, take the match, avoid lifestyle creep.",
      ],
      hook: {
        text: "Your phone buzzes: \"This is your bank's fraud team. Someone is trying to empty your account. To stop it, read us the code we just texted you.\" Your heart races. They know your name and your bank. You have saved for three years. What do you do in the next ten seconds?",
      },
      teach: [
        {
          title: "Insurance: sharing the risk",
          teach:
            "Insurance is a way to share risk. Thousands of people each pay a premium, a regular price for the policy, into a pool. The few who suffer a big loss that year are paid from the pool. You trade a small, certain cost for protection against a large, uncertain one. Three words decide what you pay when something happens. The deductible is what you pay first, before insurance starts paying. Coinsurance is the share you keep paying after that, such as 20 percent. The out-of-pocket maximum is the most you would pay for covered care in a year. Say you have a $1,000 deductible and 20 percent coinsurance, and you get a $6,000 covered hospital bill. You pay the first $1,000, then 20 percent of the remaining $5,000, which is $1,000, for $2,000 in total. Insurance pays $4,000. A higher deductible usually lowers your premium, which works well if you have an emergency fund to cover it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Premium", back: "The regular price you pay to keep a policy, monthly or yearly." },
              { front: "Deductible", back: "What you pay first on a claim before insurance starts paying." },
              { front: "Coinsurance", back: "Your percent share of costs after the deductible, such as 20 percent." },
              { front: "Out-of-pocket maximum", back: "The most you pay for covered care in a year. Insurance pays the rest." },
              { front: "Claim", back: "A request asking your insurance company to pay for a covered loss." },
            ],
          },
          probe: {
            type: "number",
            prompt: "Your car insurance has a $500 deductible. After an accident, the covered repair costs $4,200. How much does the insurance company pay?",
            answer: 3700,
            tolerance: 0.01,
            unit: "$",
            hint: "You pay the deductible first. Insurance pays the rest of the covered cost.",
            mistakes: [
              { match: "500", coach: "That is your share, the deductible. The question asks what the insurer pays." },
              { match: "4700", coach: "You added the deductible. Your deductible comes out of the cost, so the insurer pays less than $4,200." },
              { match: "4200", coach: "That is the whole repair. You pay the deductible first, so the insurer pays the rest." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why might someone with a solid emergency fund choose a higher deductible?",
            choices: [
              "A higher deductible always means insurance pays more",
              "A higher deductible usually lowers the premium, and their savings can cover the deductible",
              "A higher deductible removes the need for any insurance",
              "Higher deductibles are required by law",
            ],
            answer: 1,
            why: "Raising the deductible lowers the regular premium. With savings ready, they can handle the bigger first payment if something happens.",
            hints: [
              "A higher deductible means you pay more first, so insurance pays less on each claim.",
              "",
              "You still need insurance for big losses. The deductible only sets how much you pay first.",
              "Deductibles are a choice in most policies. Think about what happens to the premium.",
            ],
          },
          approaches: {
            analogy:
              "Insurance is like a neighborhood pitching in for a fire fund. Each of 1,000 families puts in $100 a year. If one house burns, the $100,000 fund rebuilds it. No family could afford that alone, but together it is easy.",
            example:
              "Ana's plan: $1,500 deductible, 20 percent coinsurance, $4,000 out-of-pocket maximum. A $20,000 covered surgery: she pays $1,500, then 20 percent of $18,500, which would be $3,700. That brings her total to $5,200, over the maximum, so she pays only $4,000. Insurance pays $16,000.",
            simpler: {
              q: "A covered repair costs $2,000 and your deductible is $250. What do you pay?",
              choices: ["$250", "$1,750", "$2,000"],
              answer: 0,
              why: "You pay the deductible, $250. Insurance pays the other $1,750.",
              hints: [
                "",
                "That is what the insurance pays. You pay the deductible.",
                "That is the whole bill. Insurance covers most of it.",
              ],
            },
          },
        },
        {
          title: "Which insurance you actually need",
          teach:
            "The rule is simple: insure against losses you could not afford to pay yourself, and skip insurance on small things you could replace. Auto insurance comes first for drivers. Nearly every state requires liability coverage, which pays for damage or injuries you cause to other people. Health insurance protects against medical bills that can reach tens of thousands of dollars after a single accident or illness. Renters insurance, often less than $20 a month, covers your belongings if they are stolen or destroyed by fire, and pays if a guest is hurt in your apartment. Disability insurance replaces part of your income if illness or injury keeps you from working, and for a young worker, future earnings are often the most valuable thing they have. Life insurance matters once other people depend on your income, like a spouse or children. A teenager with no dependents usually does not need it. An extended warranty on a $40 gadget protects against a loss you could easily cover from savings.",
          visual: {
            type: "compare",
            left: {
              title: "Insure it",
              points: ["Damage or injuries you cause while driving", "Large medical bills", "Losing your income to injury", "Your family's needs if you die while they depend on you"],
            },
            right: {
              title: "Usually skip it",
              points: ["Extended warranty on a cheap gadget", "Life insurance with no dependents", "Small losses you can cover from savings", "Coverage you already have through another policy"],
            },
          },
          probe: {
            type: "match",
            prompt: "Match each situation to the insurance that covers it.",
            pairs: [
              { left: "You back into someone's car in a parking lot", right: "Auto liability insurance" },
              { left: "Your laptop is stolen from your apartment", right: "Renters insurance" },
              { left: "You need surgery after a soccer injury", right: "Health insurance" },
              { left: "A back injury keeps you from working for six months", right: "Disability insurance" },
              { left: "A parent dies and the family loses their income", right: "Life insurance" },
            ],
            hint: "Ask what was lost in each case: someone else's property, your belongings, your health, your income, or a family's support.",
            mistakes: [
              { match: "Matched the stolen laptop to auto", coach: "The laptop was in the apartment, not the car. Renters insurance covers belongings at home." },
              { match: "Swapped disability and life insurance", coach: "Disability replaces income while you are alive but cannot work. Life insurance supports others after a death." },
            ],
            seconds: 60,
          },
          think: {
            q: "Which insurance is the least important for an 18-year-old with no children and no one depending on their income?",
            choices: [
              "Health insurance",
              "Auto liability insurance if they drive",
              "Renters insurance for their apartment",
              "A large life insurance policy",
            ],
            answer: 3,
            why: "Life insurance replaces income for people who depend on you. With no dependents, there is no one who needs that income replaced.",
            hints: [
              "A single hospital stay can cost tens of thousands of dollars. That is a loss few could pay alone.",
              "Nearly every state requires liability coverage, and damage you cause can be huge.",
              "Renters insurance is cheap and protects everything you own.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Choosing insurance is like packing for a hike. You always bring water and a first-aid kit, because the trouble they solve is serious. You skip the umbrella for a 10-minute walk, because a little rain is easy to handle.",
            example:
              "Marcus is 19, drives, and rents an apartment. He carries auto liability (required in his state), stays on a health plan, and buys renters insurance for $14 a month to protect $6,000 of belongings. He declines a $12 warranty on $30 earbuds; if they break, his savings can cover it.",
            simpler: {
              q: "Which loss would be hardest to pay for on your own?",
              choices: ["A broken $15 phone case", "A $40,000 hospital bill", "A lost $10 water bottle"],
              answer: 1,
              why: "A $40,000 bill is far beyond most savings. That is exactly what insurance is for.",
              hints: [
                "You could replace a phone case from your own savings easily.",
                "",
                "A water bottle is cheap to replace. Which loss could ruin your finances?",
              ],
            },
          },
        },
        {
          title: "Spotting scams and protecting your identity",
          teach:
            "Scammers do not need to break into your account if they can talk you into opening the door. The Federal Trade Commission reported that Americans lost more than $10 billion to fraud in 2023. Nearly every scam uses the same red flags. Urgency: act now or your account will be closed. Authority: a caller pretending to be your bank, the IRS or the police. Unusual payment: gift cards, wire transfers or cryptocurrency, which are very hard to reverse. Too good to be true: you won a prize, but must pay a fee first. Secrecy: do not tell anyone. A real bank will never ask for your password or the code it just texted you. The defense is to stop and verify: hang up, then call the number on the back of your card or on the official website. Protect your identity too: use long, unique passwords and two-factor sign-in, and know that a credit freeze is free at each of the three national credit bureaus.",
          visual: {
            type: "hotspots",
            title: "Scam red flags",
            center: "Stop and verify",
            spots: [
              { label: "Urgency", icon: "⏰", detail: "\"Act now or lose everything.\" Pressure keeps you from thinking." },
              { label: "Fake authority", icon: "🎭", detail: "A caller claiming to be your bank, the IRS or police. Caller ID can be faked." },
              { label: "Odd payment", icon: "🎁", detail: "Gift cards, wire transfers or crypto. Real agencies do not ask for these." },
              { label: "Too good to be true", icon: "🏆", detail: "A prize or job that requires you to pay a fee first." },
              { label: "Secrecy", icon: "🤫", detail: "\"Don't tell your parents.\" Scammers fear a second opinion." },
              { label: "Codes and passwords", icon: "🔐", detail: "Never share a password or a one-time code, with anyone." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap every message that shows a scam red flag.",
            sentences: [
              "\"Your account will be closed in 30 minutes unless you verify your password at this link.\"",
              "\"Your monthly statement is ready. Sign in through the app as usual to view it.\"",
              "\"This is the IRS. Pay your back taxes today with gift cards or you will be arrested.\"",
              "\"Congratulations, you won a new car! Just wire a $300 processing fee to claim it.\"",
              "\"Reminder: your dentist appointment is Tuesday at 3 p.m. Call the office to reschedule.\"",
              "\"Please read me the six-digit code we just texted you so we can stop the fraud.\"",
            ],
            correct: [0, 2, 3, 5],
            hint: "Look for urgency, a demand for passwords or codes, unusual payment methods, or a fee to claim a prize.",
            mistakes: [
              { match: "Tapped the statement message", coach: "It asks you to use the app as usual and asks for nothing. That is normal." },
              { match: "Missed the six-digit code", coach: "A real bank never asks you to read back a code it texted. That code unlocks your account." },
            ],
            seconds: 50,
          },
          think: {
            q: "A caller says they are from your bank's fraud team and need the code just texted to you. What should you do?",
            choices: [
              "Read them the code quickly to stop the fraud",
              "Ask them to prove it by telling you your address",
              "Hang up and call the number on the back of your card",
              "Text the code instead of saying it",
            ],
            answer: 2,
            why: "Hang up and contact the bank through a number you know is real. A real bank will never ask for that code.",
            hints: [
              "The code is the key to your account. The urgency is the scam.",
              "Scammers often already know your address from data leaks. That proves nothing.",
              "",
              "Sharing the code in any form gives the scammer access.",
            ],
          },
          approaches: {
            analogy:
              "A scammer is like a stranger knocking at your door in a delivery uniform, saying you must let him in right now. A real delivery can wait while you call the company. Anyone who will not let you check is telling you who they are.",
            example:
              "Mia gets a text: \"Your package can't be delivered. Pay $2.99 at this link.\" She is expecting a package, but she does not click. She opens the shipper's official app herself and sees nothing is wrong. The link was a fake site built to steal card numbers.",
            simpler: {
              q: "Which request is a scam red flag?",
              choices: ["Pay a fine with gift cards", "Pick up your order at the front desk", "Your library book is due Friday"],
              answer: 0,
              why: "Real agencies and companies do not ask for payment in gift cards.",
              hints: [
                "",
                "Picking up an order is normal. Look for an unusual payment request.",
                "A library reminder asks for nothing unusual. Which one wants money in a strange form?",
              ],
            },
          },
        },
        {
          title: "Habits that build lasting wealth",
          teach:
            "Wealth is usually built by ordinary habits repeated for decades, not by one lucky break. First, spend less than you earn, every month. Second, automate: have savings and retirement contributions move out on payday so you never see them. Third, take free money. Many employers match part of your 401(k) contributions, such as 50 cents for each dollar you put in, up to 6 percent of your pay. On a $50,000 salary, contributing 6 percent, or $3,000, earns a $1,500 match: an instant 50 percent return before any investment growth. Fourth, avoid lifestyle creep. When you get a raise, save at least half of it before your spending quietly grows to match. Fifth, protect what you build with an emergency fund, the right insurance, a credit freeze and healthy suspicion of anything promising fast, guaranteed riches. None of these habits is exciting, and that is the point. Boring and steady, repeated for forty years, is how ordinary earners become wealthy.",
          visual: {
            type: "budget",
            income: 4000,
            categories: [
              { label: "Needs", pct: 50 },
              { label: "Wants", pct: 25 },
              { label: "Retirement (automatic)", pct: 15 },
              { label: "Other savings", pct: 10 },
            ],
          },
          probe: {
            type: "number",
            prompt: "You earn $42,000 a year. Your employer matches 100 percent of your 401(k) contributions up to 4 percent of your pay. If you contribute 4 percent, how many dollars does your employer add each year?",
            answer: 1680,
            tolerance: 0.01,
            unit: "$",
            hint: "Find 4 percent of $42,000. A 100 percent match means the employer adds the same amount you do.",
            mistakes: [
              { match: "3360", coach: "That is your contribution plus the match together. The question asks only for the employer's part." },
              { match: "840", coach: "That is a 50 percent match. This employer matches 100 percent, dollar for dollar." },
              { match: "168", coach: "Check the decimal: 4 percent is 0.04." },
            ],
            seconds: 50,
          },
          think: {
            q: "You get a $300-a-month raise. Which choice best avoids lifestyle creep?",
            choices: [
              "Lease a nicer car with a $300 monthly payment",
              "Spend it on whatever comes up each month",
              "Stop saving because you earn more now",
              "Automatically save at least $150 of it and enjoy the rest",
            ],
            answer: 3,
            why: "Saving at least half of each raise lets you enjoy some of it while your savings rate keeps climbing.",
            hints: [
              "That locks the whole raise into a new bill. Your savings rate stays the same.",
              "Unplanned money tends to disappear. How could you protect part of it?",
              "A raise is a chance to save more, not less.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Lifestyle creep is like a goldfish that grows to fit its bowl. Give your spending a bigger bowl every time you get a raise, and it fills it. Move half of each raise into a separate tank first, and savings grow instead.",
            example:
              "Jess earns $45,000 and her employer matches 50 percent up to 6 percent. She contributes 6 percent: 0.06 x 45,000 = $2,700. Match: 0.50 x 2,700 = $1,350. Each year, $4,050 goes in for a $2,700 cost to her. If she had contributed only 3 percent, she would have left $675 of free money behind.",
            simpler: {
              q: "Your employer matches 100 percent of what you contribute, up to $1,000. You put in $1,000. How much does the employer add?",
              choices: ["$0", "$500", "$1,000"],
              answer: 2,
              why: "A 100 percent match adds a dollar for each dollar you contribute, up to the limit: $1,000.",
              hints: [
                "You contributed, so you earn the match.",
                "That would be a 50 percent match. This one is 100 percent.",
                "",
              ],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each choice: does it protect your wealth, or put it at risk?",
        buckets: ["Protects your wealth", "Puts it at risk"],
        items: [
          { text: "Freezing your credit at all three bureaus", bucket: 0 },
          { text: "Using two-factor sign-in on your bank account", bucket: 0 },
          { text: "Carrying renters insurance for your belongings", bucket: 0 },
          { text: "Contributing enough to get the full employer match", bucket: 0 },
          { text: "Reading a texted security code to a caller", bucket: 1 },
          { text: "Using the same password on every site", bucket: 1 },
          { text: "Raising spending by the full amount of every raise", bucket: 1 },
          { text: "Paying a fee to claim a prize you never entered to win", bucket: 1 },
        ],
      },
      explain: {
        prompt:
          "Imagine you are 25 and have saved $15,000. Explain to a younger sibling the three biggest threats to that money and exactly how you protect against each one.",
        keyPoints: [
          "Insurance protects against big losses you could not pay yourself",
          "Deductible and premium decide what insurance costs you",
          "Scams use urgency, fake authority and odd payments; stop and verify",
          "Strong passwords, two-factor sign-in and a credit freeze protect identity",
          "Habits like automating savings and taking the match build wealth",
        ],
      },
      mastery: [
        {
          type: "number",
          prompt: "Your health plan has a $1,000 deductible and 20 percent coinsurance, with a $5,000 out-of-pocket maximum. You get a $9,000 covered hospital bill. How much do you pay?",
          answer: 2600,
          tolerance: 0.01,
          unit: "$",
          hint: "Pay the deductible first. Then pay 20 percent of what is left of the bill. Check that the total is under the maximum.",
          mistakes: [
            { match: "1800", coach: "You took 20 percent of the whole bill. Pay the $1,000 deductible first, then 20 percent of the remaining $8,000." },
            { match: "1600", coach: "That is the coinsurance only. Add the $1,000 deductible you paid first." },
            { match: "5000", coach: "That is the maximum, but your share does not reach it on this bill." },
          ],
          seconds: 70,
        },
        {
          type: "target",
          prompt: "You and your employer's match put $4,500 into a retirement account. If it grows 8 percent a year, find the first year it reaches at least $9,000.",
          goal: { sim: "compound", principal: 4500, rate: 8, target: 9000 },
          hint: "Doubling at 8 percent: the rule of 72 says about 72 / 8 = 9 years. Check closely in the simulator.",
          mistakes: [
            { match: "9 years", coach: "So close! After 9 years you have about $8,995.52, just $4.48 short. One more year." },
            { match: "8 years", coach: "That is the rate, not the years. Use the rule of 72 for a first guess." },
          ],
          seconds: 60,
        },
        {
          type: "highlight",
          prompt: "Tap every habit that builds or protects long-term wealth.",
          sentences: [
            "Saving half of every raise automatically.",
            "Buying a warranty on every small purchase.",
            "Contributing enough to get the full employer match.",
            "Clicking a texted link to fix a problem with a package.",
            "Keeping an emergency fund so a surprise does not become debt.",
            "Investing in a scheme that promises to double your money in a month.",
          ],
          correct: [0, 2, 4],
          hint: "Look for steady, automatic, protective habits. Skip anything rushed, pricey for small risks, or promising fast riches.",
          mistakes: [
            { match: "Tapped the warranty habit", coach: "Small losses are cheaper to cover from savings. Warranties on cheap items usually cost more than they return." },
            { match: "Tapped the doubling scheme", coach: "No honest investment promises to double money in a month. That is a classic scam red flag." },
          ],
          seconds: 45,
        },
        {
          type: "match",
          prompt: "Match each threat to its best defense.",
          pairs: [
            { left: "A caller demanding gift-card payment", right: "Hang up and call the official number yourself" },
            { left: "Someone opening credit in your name", right: "Freeze your credit at all three bureaus" },
            { left: "A $30,000 medical bill", right: "Health insurance" },
            { left: "Spending that rises with every raise", right: "Save at least half of each raise automatically" },
            { left: "A password stolen in a data leak", right: "Unique passwords and two-factor sign-in" },
          ],
          hint: "For each threat, ask: what would stop this loss before it happens?",
          mistakes: [
            { match: "Matched the gift-card caller to insurance", coach: "Insurance does not cover being tricked into paying. The defense is to stop and verify." },
          ],
          seconds: 60,
        },
      ],
      check: [
        {
          q: "What is a deductible?",
          choices: [
            "The monthly price of a policy",
            "What you pay first on a claim before insurance pays",
            "The most insurance will ever pay",
            "A discount for safe drivers",
          ],
          answer: 1,
          why: "The deductible is your first share of a covered loss. The premium is the regular price of the policy.",
        },
        {
          q: "Who most needs life insurance?",
          choices: [
            "A teenager with no dependents",
            "A retiree whose children are grown and independent",
            "Someone with no income",
            "A parent whose children depend on their income",
          ],
          answer: 3,
          why: "Life insurance replaces income for people who depend on you.",
        },
        {
          q: "Which payment request is a strong sign of a scam?",
          choices: [
            "Gift cards to pay a government fine",
            "A bill from your doctor's office for a visit you had",
            "A monthly statement from your bank's app",
          ],
          answer: 0,
          why: "Government agencies and real businesses do not ask for gift cards. Scammers do, because gift cards are hard to trace or reverse.",
        },
        {
          q: "What does a credit freeze do?",
          choices: [
            "Lowers your interest rate",
            "Closes all your accounts",
            "Stops new credit from being opened in your name",
            "Raises your credit score",
          ],
          answer: 2,
          why: "A freeze blocks lenders from pulling your report to open new accounts. It is free and can be lifted when you need it.",
        },
        {
          q: "Your employer matches 50 percent of contributions up to 6 percent of pay. You earn $40,000 and contribute 6 percent. What is the match?",
          choices: ["$2,400", "$1,200", "$600", "$3,600"],
          answer: 1,
          why: "6 percent of $40,000 is $2,400; half of that is a $1,200 match.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write your personal wealth protection plan, one page long. Cover three parts: (1) the insurance you will need at 18 to 22 and why, with one real premium or price you looked up; (2) your scam defense rules, including exactly what you will do if someone calls or texts claiming to be your bank; and (3) five money habits you will follow for life, with a number attached to each (for example, save 50 percent of every raise).",
        rubric: [
          "Names the right insurance for a young adult and explains why each matters",
          "Includes at least one real, looked-up insurance price",
          "Gives clear, specific scam defense steps, including stop and verify",
          "Lists five habits, each with a concrete number or rule",
          "Writes clearly and organizes the plan in three parts",
        ],
      },
    },
  ],
};
