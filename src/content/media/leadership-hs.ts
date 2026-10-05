import type { CourseMedia } from "./types";

/** Slides and videos for the leadership-hs lessons, keyed by lesson id. */
export const leadershipHsMedia: CourseMedia = {
  "leadership-hs.stoics": {
    hook: {
      show: [
        { emoji: "🪂✈️", caption: "1965: a Navy pilot parachutes toward certain capture" },
        { at: "the world of Epictetus", photo: "Epictetus", caption: "Epictetus, as a later artist imagined him" },
        { at: "more than seven years", big: "7+ years", caption: "Stockdale spent more than seven years as a prisoner" },
        { at: "born a slave", emoji: "⛓️➡️📜", caption: "From slavery to one of Rome's great teachers" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Hierapolis", caption: "Ruins of Hierapolis in Turkey, where Epictetus was born" },
          { at: "the Enchiridion", emoji: "📖✋", caption: "The Enchiridion: a handbook small enough to carry" },
          { at: "In our power are", emoji: "🧠✅", caption: "Mine: judgments, choices, desires and aversions" },
          { at: "Not in our power", emoji: "🌦️👥❌", caption: "Not mine: body, property, reputation, others' choices" },
          { at: "dichotomy of control", big: "2 piles", caption: "Sort every situation into two piles" },
        ],
      },
      {
        show: [
          { emoji: "😤❓", caption: "What really upsets us?" },
          { at: "First, something happens", emoji: "⚡", caption: "1. Something happens" },
          { at: "Second, you make a judgment", emoji: "🧠💭", caption: "2. You decide what it means" },
          { at: "Third, you react", emoji: "🎬", caption: "3. You react" },
          { at: "pause and examine it", emoji: "⏸️🔍", caption: "The Stoic move: pause and check the judgment" },
        ],
      },
      {
        show: [
          { photo: "Marcus Aurelius", caption: "Marcus Aurelius, emperor and Stoic" },
          { at: "AD 161 to 180", big: "AD 161-180", caption: "Nineteen years of rule, many spent in army camps" },
          { at: "Begin the morning", emoji: "🌅✍️", caption: "Morning practice: expect trouble, choose calm" },
          { at: "an obstacle on the road", emoji: "🪨🛤️", caption: "The obstacle on the road helps us on the road" },
          { at: "a daily workout", emoji: "🏋️📓", caption: "A notebook for training, not for showing off" },
        ],
      },
      {
        show: [
          { emoji: "🏋️🧠", caption: "Stoicism was practice, not just theory" },
          { at: "Seneca, a Roman Stoic", emoji: "🪔📓", caption: "Seneca reviewed his whole day each night" },
          { at: "premeditatio malorum", emoji: "🌧️🧭", caption: "Picture setbacks before they arrive" },
          { at: "the archer's mindset", emoji: "🏹🌬️", caption: "Aim well. The wind is not yours." },
          { at: "steady mind", emoji: "⚓", caption: "A steady mind other people can lean on" },
        ],
      },
    ],
  },

  "leadership-hs.decisions": {
    hook: {
      show: [
        { photo: "File:Eisenhower d-day.jpg", caption: "Eisenhower talks with paratroopers on June 5, 1944" },
        { at: "150,000 soldiers", big: "150,000+", caption: "More than 150,000 soldiers waiting on one decision" },
        { at: "a short break in the storm", emoji: "⛈️🌤️", caption: "The forecast: a short break in the storm" },
        { at: "wrote a note", emoji: "📝🫡", caption: "His note took all the blame in advance" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🎲🧠", caption: "We decide before we know how things turn out" },
          { at: "called resulting", emoji: "🏆❓", caption: "A good result doesn't prove a good decision" },
          { at: "think in probabilities", emoji: "📊", caption: "What could happen, and how likely is each?" },
          { at: "expected value is", big: "0.6 x $500 = $300", caption: "Expected value: payoff times probability" },
          { at: "could the worst case be ruinous", emoji: "🧗⚠️", caption: "Could you survive the worst case?" },
        ],
      },
      {
        show: [
          { emoji: "🌊", caption: "Every choice sends out ripples" },
          { at: "In 1902", big: "1902", caption: "Hanoi pays a bounty for every rat tail" },
          { at: "rats without tails", emoji: "🐀✂️", caption: "Rats without tails: something went wrong" },
          { at: "Every rule, price and reward", emoji: "🎁🔄", caption: "Rewards change behavior, sometimes the wrong way" },
          { at: "two or three steps out", emoji: "1️⃣➡️2️⃣➡️3️⃣", caption: "Trace the chain: and then what?" },
        ],
      },
      {
        show: [
          { emoji: "🔬", caption: "A post-mortem looks back after the fact" },
          { at: "Gary Klein proposed", emoji: "🔄", caption: "Gary Klein turned it around" },
          { at: "the plan has failed badly", emoji: "📉💭", caption: "Imagine: it already failed" },
          { at: "writes down every reason", emoji: "📝📝📝", caption: "Everyone writes down why" },
          { at: "find the flaw on paper", emoji: "📄🔍", caption: "Better to find the flaw on paper than in real life" },
        ],
      },
      {
        show: [
          { emoji: "✅❌", caption: "Every yes is also a no" },
          { at: "the opportunity cost", big: "Opportunity cost", caption: "The value of the best option you give up" },
          { at: "a door you can walk back through", emoji: "🚪↔️", caption: "Two-way doors: decide, test, learn" },
          { at: "a one-way door", emoji: "🚪➡️", caption: "One-way doors: slow down and get advice" },
          { at: "write your options side by side", emoji: "📋⚖️", caption: "Lay out the options and name what matters" },
        ],
      },
    ],
  },

  "leadership-hs.crisis": {
    hook: {
      show: [
        { photo: "Endurance (1912 ship)", caption: "Endurance pushing through Antarctic ice, photographed by Frank Hurley" },
        { at: "28 men", big: "28", caption: "28 men with no way to call for help" },
        { at: "Ernest Shackleton", photo: "Ernest Shackleton", caption: "Ernest Shackleton, polar explorer" },
        { at: "bring every man home alive", emoji: "🏠🤝", caption: "The new mission: everyone home alive" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "File:Endurance trapped in pack ice.jpg", caption: "Endurance frozen into the pack ice of the Weddell Sea" },
          { at: "crushed her hull", photo: "File:Endurance Final Sinking.jpg", caption: "October 1915: the ice crushes the ship" },
          { at: "The only mission now", big: "All 28 home", caption: "One mission replaces every other goal" },
          { at: "strict daily routines", emoji: "⏰🍲⚽", caption: "Set meals, chores, watches and football on the ice" },
          { at: "gold coins", emoji: "🪙❄️", caption: "He dropped his own gold coins in the snow" },
        ],
      },
      {
        show: [
          { photo: "Elephant Island", caption: "Elephant Island from space: their first solid ground in 497 days" },
          { at: "his own mittens", emoji: "🧤🤝", caption: "Shackleton gave away his own mittens" },
          { at: "the James Caird", photo: "James Caird (boat)", caption: "The James Caird: less than 23 feet long, about 800 miles" },
          { at: "about 36 hours", big: "36 hours", caption: "Across South Georgia's unmapped mountains" },
          { at: "All 22 men", big: "22 of 22", caption: "Every man on Elephant Island was alive" },
        ],
      },
      {
        show: [
          { photo: "Valley Forge National Historical Park", caption: "The memorial arch at Valley Forge, Pennsylvania, today" },
          { at: "about 12,000 soldiers", big: "12,000", caption: "About 12,000 soldiers marched into camp" },
          { at: "Nearly 2,000 died", emoji: "🥶🏚️", caption: "Cold, hunger and disease: nearly 2,000 died" },
          { at: "Nathanael Greene", photo: "Nathanael Greene", caption: "Nathanael Greene fixed the supply system" },
          { at: "Baron von Steuben", photo: "Friedrich Wilhelm von Steuben", caption: "Baron von Steuben drilled the army" },
        ],
      },
      {
        show: [
          { emoji: "🧭", caption: "Two leaders, one pattern" },
          { at: "a clear mission", emoji: "🎯", caption: "1. One clear mission" },
          { at: "Second, presence", emoji: "⛺🤝", caption: "2. Stay present and share the hardship" },
          { at: "Third, structure", emoji: "🗓️🥁", caption: "3. Routines, drills and clear jobs" },
          { at: "Fifth, honest hope", emoji: "🌅", caption: "5. Tell the truth and show the way through" },
        ],
      },
    ],
  },

  "leadership-hs.persuasion": {
    hook: {
      show: [
        { photo: "Edward Everett", caption: "Edward Everett, the most famous orator of his day" },
        { at: "about two minutes", photo: "Abraham Lincoln", caption: "Abraham Lincoln spoke for about two minutes" },
        { at: "about 270 words", big: "About 270 words", caption: "Short enough to memorize, strong enough to last" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Aristotle", caption: "Aristotle, who wrote the Rhetoric" },
          { at: "Ethos is the character", emoji: "🛡️", caption: "Ethos: can we trust you?" },
          { at: "Logos is the reasoning", emoji: "📊", caption: "Logos: facts, evidence and logic" },
          { at: "Pathos is the emotion", emoji: "❤️", caption: "Pathos: why it matters to the heart" },
          { at: "a good person skilled in speaking", emoji: "🗣️✨", caption: "Quintilian: a good person skilled in speaking" },
        ],
      },
      {
        show: [
          { photo: "Gettysburg Address", caption: "The crowd at Gettysburg on November 19, 1863" },
          { at: "A score is twenty", big: "4 x 20 + 7 = 87", caption: "Four score and seven: back to 1776" },
          { at: "Now we are engaged", emoji: "⚔️🕯️", caption: "Present: the war and the soldiers buried there" },
          { at: "new birth of freedom", emoji: "🌅", caption: "Future: a new birth of freedom" },
          { at: "uses a tricolon", big: "of · by · for", caption: "Three parallel parts build rhythm" },
        ],
      },
      {
        show: [
          { photo: "Winston Churchill", caption: "Winston Churchill, Britain's wartime prime minister" },
          { at: "On June 18", big: "June 18, 1940", caption: "France has fallen. Britain stands nearly alone." },
          { at: "an honest account of the danger", emoji: "⚠️", caption: "Step 1: tell the hard truth" },
          { at: "reasons for confidence", emoji: "⚓✈️💪", caption: "Step 2: the navy, the air force and the people" },
          { at: "This was their finest hour", emoji: "⏳🏛️", caption: "How a thousand years from now will remember them" },
        ],
      },
      {
        show: [
          { photo: "Cicero", caption: "Cicero, Rome's most famous speaker" },
          { at: "Invention is", emoji: "💡", caption: "Invention, arrangement, style..." },
          { at: "Memory is", emoji: "🧠👀", caption: "...memory and delivery" },
          { at: "short broken lines", emoji: "📃〰️", caption: "Churchill's speech notes looked like poems" },
          { at: "rehearse out loud", big: "3x out loud", caption: "Rehearse out loud at least three times" },
        ],
      },
    ],
  },

  "leadership-hs.integrity": {
    hook: {
      show: [
        { big: "458 BC", caption: "A Roman army is trapped by an enemy" },
        { at: "named Cincinnatus", emoji: "📜🏃", caption: "Messengers from the Senate find Cincinnatus at his farm" },
        { at: "nearly unlimited power", emoji: "👑⏳", caption: "Nearly unlimited power, for up to six months" },
        { at: "returned to his plow", emoji: "🌾🐂", caption: "Then, after sixteen days, back to the plow" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏛️⏳", caption: "Rome's emergency office: dictator, for up to six months" },
          { at: "Lucius Quinctius Cincinnatus", photo: "File:Lucius Quinctius Cincinnatus P4280213.JPG", caption: "Cincinnatus statue in Cincinnati, Ohio, a city named for him" },
          { at: "on the sixteenth day", big: "Day 16", caption: "He resigned on the sixteenth day" },
          { at: "power is a tool lent for a duty", emoji: "🔧🤲", caption: "Power is lent for a duty, not kept as a prize" },
          { at: "what you do when you could keep it", emoji: "🪞", caption: "The real test: what you do when you could keep it" },
        ],
      },
      {
        show: [
          { emoji: "💰❌", caption: "Officers unpaid for months or years" },
          { at: "Newburgh, New York", photo: "Washington's Headquarters State Historic Site", caption: "Washington's headquarters at Newburgh, New York" },
          { at: "On March 15", big: "March 15, 1783", caption: "Washington walks into the officers' meeting" },
          { at: "a pair of glasses", emoji: "👓", caption: "Glasses most of his officers had never seen" },
          { at: "The threat collapsed", emoji: "🕊️", caption: "The army stayed loyal to civilian government" },
        ],
      },
      {
        show: [
          { photo: "General George Washington Resigning His Commission", caption: "John Trumbull's painting of Washington resigning his commission" },
          { at: "December 23, 1783", big: "Dec. 23, 1783", caption: "He hands his commission back to Congress" },
          { at: "Society of the Cincinnati", emoji: "🦅", caption: "Officers named their society after the Roman" },
          { at: "two terms", big: "2 terms", caption: "In 1797 he stepped aside again" },
          { at: "people beg you to stay", emoji: "🚪🏡", caption: "Giving power back on time" },
        ],
      },
      {
        show: [
          { emoji: "🤝", caption: "Keeping your word when it costs you" },
          { at: "An old Hebrew psalm", emoji: "📜", caption: "Psalm 15: keep your word, even to your own hurt" },
          { at: "Marcus Atilius Regulus", emoji: "⚓⛓️", caption: "Regulus kept his oath to his captors" },
          { at: "three excuses", emoji: "👥🔁🤫", caption: "Everyone does it. Just this once. No one will know." },
          { at: "decide their code", emoji: "📝🛡️", caption: "Decide your code before the pressure comes" },
        ],
      },
    ],
  },
};
