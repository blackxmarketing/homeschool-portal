import type { CourseMedia } from "./types";

/** Slides and videos for the money-hs lessons, keyed by lesson id. */
export const moneyHsMedia: CourseMedia = {
  "money-hs.paycheck": {
    hook: {
      show: [
        { emoji: "💵📩", caption: "Maya's first paycheck. She knew exactly what to expect. Or did she?" },
        { at: "she was expecting $600", big: "$600 → $510", caption: "Forty hours at $15 should be $600. The deposit said $510." },
        { at: "So where did the money go?", emoji: "🤔💸", caption: "Nobody stole it. Let's follow the missing $90." },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Time clock", caption: "Hourly pay starts with counting your hours." },
          { at: "15 x 80 = $1,200", big: "$15 × 80 = $1,200", caption: "Gross pay for a two-week, 80-hour pay period." },
          { at: "Fair Labor Standards Act", emoji: "⚖️⏰", caption: "Federal law: most hourly workers earn overtime past 40 hours a week." },
          { at: "16 x 1.5 = $24", big: "$16 × 1.5 = $24/hr", caption: "Time and a half: one and a half times your regular rate." },
          { at: "Salaried workers are paid", big: "$52,000 ÷ 26 = $2,000", caption: "A salary is split evenly across the year's paychecks." },
        ],
      },
      {
        show: [
          { emoji: "🏛️🧾", caption: "Two taxes come out of nearly every paycheck in America." },
          { at: "Social Security takes 6.2 percent", big: "6.2% + 1.45% = 7.65%", caption: "Social Security plus Medicare: together they are FICA." },
          { at: "Social Security pays monthly benefits", emoji: "👵👴🏥", caption: "Benefits for retired and disabled workers, and health care at 65." },
          { at: "turn each percent into a decimal", emoji: "🧮", caption: "Percent to decimal, then multiply. 7.65% becomes 0.0765." },
          { at: "On a $1,200 paycheck", big: "$1,200 × 0.0765 = $91.80", caption: "FICA on a $1,200 paycheck." },
        ],
      },
      {
        show: [
          { big: "Brackets", caption: "Income tax is not one flat percent: higher slices pay higher rates." },
          { at: "using the Form W-4", emoji: "📝🏢", caption: "The W-4 you fill out when hired sets how much is withheld." },
          { at: "traditional 401(k) retirement plan", emoji: "🏦🌱", caption: "Pre-tax savings come out before income tax is figured." },
          { at: "income tax is figured on $1,140", big: "$1,200 − $60 = $1,140", caption: "A 5% 401(k) contribution shrinks your taxable pay." },
          { at: "Each spring you file", emoji: "🌷📝", caption: "Your tax return settles up: a refund, or a bill." },
        ],
      },
      {
        show: [
          { emoji: "🧾🔍", caption: "Every paycheck comes with a receipt: the pay stub." },
          { at: "A typical stub has three parts", big: "Earnings · Deductions · Net", caption: "Three sections tell the whole story of your paycheck." },
          { at: "net pay equals gross pay minus all deductions", big: "Net = Gross − Deductions", caption: "The one rule to remember." },
          { at: "YTD, or year-to-date", emoji: "📅➕", caption: "Year-to-date: running totals since January 1." },
          { at: "Payroll mistakes happen", emoji: "✅⏱️", caption: "Check your hours and overtime every payday." },
        ],
      },
    ],
  },

  "money-hs.budget": {
    hook: {
      show: [
        { emoji: "🧑💵🏠", caption: "Jordan, 19: $2,600 a month take-home, bills covered." },
        { at: "the car's transmission fails", emoji: "🔧🚗", caption: "A surprise repair: $1,400 that Jordan doesn't have." },
        { at: "24 percent interest", big: "$1,400 at 24%", caption: "No savings means the surprise goes on a credit card." },
        { at: "What could Jordan have done differently?", emoji: "🤔🛟", caption: "A budget and a safety net. Let's build both." },
      ],
    },
    teach: [
      {
        show: [
          { big: "Start with NET", caption: "Budget from take-home pay, not gross pay." },
          { at: "26 paychecks a year", big: "Check × 26 ÷ 12", caption: "Paid every two weeks? This gives your true monthly income." },
          { at: "Fixed costs stay the same", emoji: "🏠🚗📱", caption: "Rent, car payment, insurance, phone: the same every month." },
          { at: "Variable costs change with your choices", emoji: "🛒🥦⛽", caption: "Groceries, gas and eating out change with your choices." },
          { at: "Some costs, like car repairs", emoji: "🔧📆", caption: "Set aside a little each month for irregular costs." },
        ],
      },
      {
        show: [
          { big: "50 / 30 / 20", caption: "Needs, wants, and savings plus debt payoff." },
          { at: "50 percent to needs", emoji: "🏠🍞💡", caption: "Needs: housing, utilities, groceries, transportation, insurance." },
          { at: "On $2,800 a month", big: "$1,400 · $840 · $560", caption: "50/30/20 on $2,800 of take-home pay." },
          { at: "It is a guideline, not a law", photo: "Apartment", caption: "In pricey cities, rent can eat half of a starting paycheck." },
          { at: "cover needs, protect savings", emoji: "1️⃣2️⃣3️⃣", caption: "Needs first, savings second, wants with what remains." },
        ],
      },
      {
        show: [
          { photo: "Coffee", caption: "A small daily treat. Harmless, right?" },
          { at: "6 x 5 x 52 = $1,560", big: "$6 × 5 × 52 = $1,560", caption: "One workday coffee habit, added up over a year." },
          { at: "Three subscriptions", big: "$38/mo = $456/yr", caption: "Forgotten subscriptions are quiet leaks." },
          { at: "zero-based budget", big: "Income − Plan = $0", caption: "Every dollar of income gets a job." },
          { at: "paying yourself first", emoji: "💵➡️🐷", caption: "Savings move out on payday, before spending starts." },
        ],
      },
      {
        show: [
          { emoji: "🛟💵", caption: "An emergency fund: cash for true surprises only." },
          { at: "three to six months of essential expenses", big: "3–6 months", caption: "Of essential expenses, needs only." },
          { at: "start with a first goal of $1,000", big: "First goal: $1,000", caption: "Small first goal, then keep building." },
          { at: "FDIC-insured bank", photo: "Bank vault", caption: "Keep it safe and easy to reach, in an insured account." },
          { at: "A sale or a concert is not an emergency", emoji: "🎟️🛍️🚫", caption: "If you use it, refill it first." },
        ],
      },
    ],
  },

  "money-hs.investing": {
    hook: {
      show: [
        { emoji: "👩🌱", caption: "Emma starts at 22 and stops at 32." },
        { at: "Ethan waits until 32", emoji: "👨⏳", caption: "Ethan starts later but keeps going until 65." },
        { at: "more than three times as much", big: "$24,000 vs $79,200", caption: "Ethan puts in far more money." },
        { at: "How is that possible?", emoji: "🤔📈", caption: "Yet Emma ends up with more. The secret is time." },
      ],
    },
    teach: [
      {
        show: [
          { photo: "New York Stock Exchange", caption: "Shares of ownership in companies are bought and sold here." },
          { at: "some companies pay dividends", emoji: "🏢➡️💵", caption: "Dividends: a share of the profits paid to owners." },
          { at: "A bond is a loan", photo: "Bond (finance)", caption: "A 1622 Dutch bond: lending money for interest is centuries old." },
          { at: "$1,000 bond paying 4 percent", big: "$1,000 × 4% = $40/yr", caption: "Steady interest, and your money back at maturity." },
          { at: "Owners take more risk", big: "More risk ⇄ More reward", caption: "Owners have usually been paid more over the long run." },
        ],
      },
      {
        show: [
          { emoji: "🎯❓", caption: "Picking winners is hard, even for professionals." },
          { at: "Diversification means spreading", photo: "Basket", caption: "Don't carry all your eggs in one basket." },
          { at: "An index fund simply buys", emoji: "📦🏢🏢🏢", caption: "One fund, hundreds of companies." },
          { at: "its expense ratio", big: "1% vs 0.05%", caption: "A fund's yearly fee is its expense ratio." },
          { at: "costs $25", big: "$500 vs $25 a year", caption: "Fees on $50,000. Low costs leave more for you." },
        ],
      },
      {
        show: [
          { photo: "Roller coaster", caption: "Investing has steep drops and long climbs." },
          { at: "lost more than half its value", big: "−50%+", caption: "Late 2007 to early 2009: a frightening drop." },
          { at: "People who held on", emoji: "🧘📈", caption: "Patient investors saw prices recover over several years." },
          { at: "time horizon", emoji: "⏳", caption: "How long until you need the money changes everything." },
          { at: "Money you will not touch for decades", emoji: "🧓💼", caption: "Decades-long money can ride out the swings." },
        ],
      },
      {
        show: [
          { photo: "Snowball", caption: "Compound growth: earnings that earn more." },
          { at: "by the rule of 72", big: "72 ÷ 7 ≈ 10 years", caption: "At 7%, money doubles about every 10 years." },
          { at: "Emma invests $200 a month", big: "Emma: $24,000 in", caption: "Age 22 to 32, then she stops for good." },
          { at: "Ethan waits", big: "Ethan: $79,200 in", caption: "Age 32 to 65, every single month." },
          { at: "about $330,000", big: "$330K vs $305K", caption: "Emma wins: ten extra years of growth." },
        ],
      },
    ],
  },

  "money-hs.credit": {
    hook: {
      show: [
        { emoji: "💻💳", caption: "One $2,000 laptop, two very different stories." },
        { at: "Riley pays $200 a month", big: "$200/mo → 1 year", caption: "Riley: done in 12 months, about $250 in interest." },
        { at: "Casey pays $50 a month", big: "$50/mo → ~7 years", caption: "Casey: about $2,060 in interest, more than the laptop." },
        { at: "What happened?", emoji: "🤔💳", caption: "Same laptop, same card. Let's find out why." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💵⏳", caption: "Interest is the price of using someone else's money." },
          { at: "APR, or annual percentage rate", big: "APR ÷ 12 = monthly", caption: "Cards charge monthly, so divide the APR by 12." },
          { at: "0.02 x 2,000 = $40", big: "2% × $2,000 = $40", caption: "One month's interest at 24 percent APR." },
          { at: "Mortgages and car loans", emoji: "🏠🚗", caption: "Loans backed by a house or car usually cost less." },
          { at: "grace period", emoji: "✅📅", caption: "Pay the full statement balance on time: no interest on purchases." },
        ],
      },
      {
        show: [
          { emoji: "🥄🚤", caption: "Paying the minimum is like bailing a boat with a teaspoon." },
          { at: "only $10 of his $50", big: "$40 interest + $10", caption: "Casey's first payment: most of it is interest." },
          { at: "about 82 months", big: "82 months · $2,060", caption: "Nearly seven years and more interest than the laptop cost." },
          { at: "Riley pays $200 a month", big: "12 months · $250", caption: "A bigger payment ends the debt fast." },
          { at: "Federal law requires", emoji: "📄🔎", caption: "Your statement shows how long the minimum would take. Read it." },
        ],
      },
      {
        show: [
          { emoji: "📊🤝", caption: "A credit score tells lenders how likely you are to repay." },
          { at: "run from 300 to 850", big: "300 → 850", caption: "Higher scores mean easier approval and lower rates." },
          { at: "payment history, about 35 percent", big: "On time = 35%", caption: "Paying every bill on time is the biggest factor." },
          { at: "measured by credit utilization", big: "$600 ÷ $2,000 = 30%", caption: "Utilization: balances divided by limits. Lower is better." },
          { at: "AnnualCreditReport.com", emoji: "🆓📄", caption: "Check your credit reports free on the official site." },
        ],
      },
      {
        show: [
          { photo: "Fishing lure", caption: "Some loans are like a lure: a tasty bait with a hidden hook." },
          { at: "A payday loan lends", emoji: "💵⏱️", caption: "A short loan against your next paycheck, for a fee." },
          { at: "15 x 26 = 390 percent", big: "≈ 390% APR", caption: "$15 per $100 every two weeks, for a whole year." },
          { at: "Rent-to-own stores", emoji: "🛋️📺💸", caption: "Small weekly payments, a much bigger total." },
          { at: "Car loans of six or seven years", photo: "Used car", caption: "Long car loans: smaller payment, bigger total cost." },
        ],
      },
    ],
  },

  "money-hs.protect": {
    hook: {
      show: [
        { emoji: "📱⚠️", caption: "A text from your bank's fraud team. Or is it?" },
        { at: "read us the code", big: "\"Read us the code\"", caption: "They want the code your bank just texted you." },
        { at: "You have saved for three years", emoji: "💰⏳", caption: "Years of saving could be gone in seconds." },
        { at: "in the next ten seconds", emoji: "⏱️🤔", caption: "What's the right move? Let's learn how to protect it all." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "☂️🤝", caption: "Insurance: many people share the cost of a few big losses." },
          { at: "The deductible is what you pay first", big: "Deductible first", caption: "You pay this much before insurance starts paying." },
          { at: "Coinsurance is the share", big: "Then 20%", caption: "After the deductible, you may pay a share like 20 percent." },
          { at: "$6,000 covered hospital bill", photo: "Hospital", caption: "A $6,000 bill with a $1,000 deductible and 20% coinsurance." },
          { at: "Insurance pays $4,000", big: "You $2,000 · Insurer $4,000", caption: "Insurance turns a big loss into a manageable one." },
        ],
      },
      {
        show: [
          { emoji: "🛡️❓", caption: "Insure what you could not afford to replace yourself." },
          { at: "Auto insurance comes first", emoji: "🚗💥", caption: "Liability pays for damage or injuries you cause others." },
          { at: "Health insurance protects", emoji: "🚑", caption: "One accident can bring tens of thousands in medical bills." },
          { at: "Renters insurance", emoji: "🏢🔒", caption: "Often under $20 a month to protect everything you own." },
          { at: "Life insurance matters", emoji: "👨‍👩‍👧", caption: "Needed once others depend on your income." },
        ],
      },
      {
        show: [
          { emoji: "🎣📧", caption: "Phishing: fake messages built to steal passwords and money." },
          { at: "more than $10 billion", big: "$10 billion+", caption: "Reported fraud losses in the U.S. in 2023, per the FTC." },
          { at: "Urgency: act now", emoji: "⏰🎭🎁🤫", caption: "Urgency, fake authority, odd payments, secrecy." },
          { at: "stop and verify", emoji: "✋📞", caption: "Hang up and call the number on the back of your card." },
          { at: "credit freeze", emoji: "🧊🔒", caption: "A free credit freeze blocks new accounts in your name." },
        ],
      },
      {
        show: [
          { photo: "Benjamin Franklin", caption: "Franklin built his fortune slowly: work, thrift and no debt." },
          { at: "spend less than you earn", big: "Earn > Spend", caption: "Habit one, every single month." },
          { at: "$1,500 match", big: "$3,000 → +$1,500", caption: "An employer match is free money. Always take it." },
          { at: "avoid lifestyle creep", emoji: "🐟🫙", caption: "Save at least half of every raise before spending grows." },
          { at: "Boring and steady", emoji: "🐢🏁", caption: "Steady habits for forty years build real wealth." },
        ],
      },
    ],
  },
};
