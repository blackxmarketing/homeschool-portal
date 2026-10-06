import type { CourseMedia } from "../types";

/** Slides for soc-2, by lesson id. */
export const soc2Media: CourseMedia = {
  "soc-2.communities": {
    hook: {
      show: [
        { emoji: "🐄🏠🌾", caption: "A red barn and a cow out in the country" },
        { at: "picture tall towers", emoji: "🏙️🚕", caption: "Tall towers and busy streets in the city" },
        { at: "Both places are communities", emoji: "🏘️", caption: "Both are communities!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌾🚜", caption: "Rural means out in the country" },
          { at: "Homes are far apart", emoji: "🏠 ... 🏠", caption: "Homes are far apart" },
          { at: "Farmers grow food", emoji: "🌽🌾🐄🐔", caption: "Farmers grow corn and wheat and raise animals" },
          { at: "drive a long way", emoji: "🚗🛣️", caption: "A long drive to the store" },
          { at: "At night you can", emoji: "🌌⭐", caption: "Quiet nights full of stars" },
        ],
      },
      {
        show: [
          { emoji: "🏙️", caption: "Urban means city" },
          { at: "Some are skyscrapers", emoji: "🏢🏢🏢", caption: "Skyscrapers are very tall buildings" },
          { at: "Streets are busy", emoji: "🚗🚌🚕", caption: "Busy streets with cars, buses and taxis" },
          { at: "trains under the ground", emoji: "🚇", caption: "Subways: trains under the ground" },
          { at: "walk to the store", emoji: "🚶🏪", caption: "In a city, you can often walk to the store" },
        ],
      },
      {
        show: [
          { emoji: "🏡", caption: "Suburban means near a city" },
          { at: "in between the city", emoji: "🏙️ ↔️ 🏡 ↔️ 🌾", caption: "In between the city and the country" },
          { at: "Kids ride bikes", emoji: "🚲🌳", caption: "Yards and quiet streets for riding bikes" },
          { at: "drive into the city", emoji: "🚗➡️🏙️", caption: "Many grown-ups drive into the city to work" },
        ],
      },
    ],
  },

  "soc-2.maps": {
    hook: {
      show: [
        { emoji: "🗺️❌", caption: "A treasure map with a big X" },
        { at: "You need map skills", emoji: "🧭", caption: "Grab your compass, explorer!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🦅⬇️🗺️", caption: "A map shows a place from above, like a bird looking down" },
          { at: "called symbols", emoji: "🌳🏫🏥", caption: "Symbols are small pictures that stand for real things" },
          { at: "A blue line", emoji: "〰️💧", caption: "A blue line can mean a river" },
          { at: "The map key", emoji: "🔑", caption: "The map key tells what each symbol means" },
        ],
      },
      {
        show: [
          { emoji: "🧭", caption: "The compass rose shows directions" },
          { at: "four cardinal directions", big: "N E S W", caption: "Four cardinal directions: north, east, south, west" },
          { at: "North is usually at the top", emoji: "⬆️", caption: "North is usually at the top" },
          { at: "Never Eat Soggy Waffles", emoji: "🧇", caption: "Never Eat Soggy Waffles: N, E, S, W" },
        ],
      },
      {
        show: [
          { emoji: "🌍", caption: "A globe is a round model of Earth" },
          { at: "seven continents", big: "7", caption: "Seven continents: huge pieces of land" },
          { at: "We live in North America", emoji: "🦅🇺🇸", caption: "We live in North America" },
          { at: "five oceans", big: "5", caption: "Five oceans of salt water" },
          { at: "The Pacific Ocean is the biggest", emoji: "🌊🐋", caption: "The Pacific is the biggest ocean" },
        ],
      },
    ],
  },

  "soc-2.producers": {
    hook: {
      show: [
        { emoji: "🍞", caption: "Fresh bread from the bakery" },
        { at: "The baker made it", emoji: "🧑‍🍳", caption: "The baker made it early this morning" },
        { at: "a family is buying it", emoji: "👨‍👩‍👧🛒", caption: "A family is buying it" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🧑‍🍳🍞", caption: "A producer makes things or does work for others" },
          { at: "A consumer buys", emoji: "🛒", caption: "A consumer buys and uses things" },
          { at: "You are a consumer too", emoji: "🍎👕📚", caption: "You use food, clothes and books" },
          { at: "The baker buys flour", emoji: "🧑‍🍳🛒🥚", caption: "The baker buys flour and eggs, so she is a consumer too!" },
        ],
      },
      {
        show: [
          { emoji: "📦🛎️", caption: "Producers make goods or give services" },
          { at: "Goods are things you can touch", emoji: "🍎👟🧸", caption: "Goods: things you can touch" },
          { at: "Services are jobs", emoji: "✂️💈", caption: "Services: jobs people do for you" },
          { at: "A dentist checks", emoji: "🦷📬", caption: "A dentist and a mail carrier give services" },
        ],
      },
      {
        show: [
          { emoji: "💵", caption: "People work to earn money" },
          { at: "called income", big: "Income", caption: "Income: money you earn from work" },
          { at: "Every job needs skills", emoji: "🧑‍🍳✈️", caption: "Every job needs skills" },
          { at: "round and round", emoji: "🔄💵", caption: "Money goes round and round in a community" },
        ],
      },
    ],
  },

  "soc-2.saving": {
    hook: {
      show: [
        { big: "$5", caption: "You have $5" },
        { at: "A big kite costs", emoji: "🪁", caption: "A big kite costs $10" },
        { at: "saving can help", emoji: "🐷💵", caption: "Saving can help!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💵", caption: "Two things you can do with money" },
          { at: "You can spend it", emoji: "🛍️", caption: "Spend: trade it for something now" },
          { at: "you can save it", emoji: "🐷", caption: "Save: keep it for later" },
          { at: "A bank is too", emoji: "🏦", caption: "A bank keeps money safe" },
        ],
      },
      {
        show: [
          { emoji: "🙅", caption: "We can't have everything we want" },
          { at: "That is called scarcity", big: "Scarcity", caption: "Scarcity: not enough for everything" },
          { at: "a book or a ball", emoji: "📕 or ⚽", caption: "A book or a ball. Not both!" },
          { at: "The thing you give up", emoji: "⚖️", caption: "What you give up is the cost of your choice" },
        ],
      },
      {
        show: [
          { emoji: "📝", caption: "Saving works best with a plan" },
          { at: "pick a goal", emoji: "🎯🪁", caption: "Step 1: pick a goal" },
          { at: "$2 each week", big: "$2 a week", caption: "Earn $2 each week for chores" },
          { at: "Week 5: $10", big: "$10", caption: "Week 5: you have $10. You did it!" },
          { at: "three jars", emoji: "🫙🫙🫙", caption: "Three jars: spend, save and share" },
        ],
      },
    ],
  },

  "soc-2.citizens": {
    hook: {
      show: [
        { emoji: "🐹", caption: "Your class must pick a class pet" },
        { at: "Some want a fish", emoji: "🐹 or 🐠", caption: "A hamster or a fish?" },
        { at: "choose fairly", emoji: "🤔⚖️", caption: "How can you choose fairly?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⭐", caption: "A citizen is a member of a community" },
          { at: "Good citizens are honest", emoji: "🗣️", caption: "Good citizens tell the truth" },
          { at: "kind and helpful", emoji: "🤝💛", caption: "They are kind and helpful" },
          { at: "They pick up litter", emoji: "🧹🗑️", caption: "They take care of their community" },
          { at: "take responsibility", emoji: "✅", caption: "They do their part" },
        ],
      },
      {
        show: [
          { emoji: "🦺", caption: "Rules help us stay safe and be fair" },
          { at: "raise your hand", emoji: "✋", caption: "A school rule: raise your hand to talk" },
          { at: "Laws are rules", emoji: "🚦", caption: "Laws are rules for a whole town, state or country" },
          { at: "Leaders in the government", emoji: "🏛️", caption: "Leaders in the government make laws" },
          { at: "Police officers", emoji: "👮", caption: "Police officers help keep us safe" },
        ],
      },
      {
        show: [
          { emoji: "🗳️", caption: "We vote to choose fairly" },
          { at: "Each person gets one vote", big: "1 person = 1 vote", caption: "Each person gets one vote" },
          { at: "the most votes wins", emoji: "🏆", caption: "The choice with the most votes wins" },
          { at: "7 kids vote", big: "🐹 7 · 🐠 4", caption: "7 votes for the hamster, 4 for the fish" },
          { at: "18 and older", emoji: "🇺🇸🗳️", caption: "Citizens 18 and older vote for leaders" },
        ],
      },
    ],
  },

  "soc-2.inventors": {
    hook: {
      show: [
        { emoji: "💡", caption: "Flip a switch, and the lights come on" },
        { at: "read by candlelight", emoji: "🕯️📖", caption: "Long ago, kids read by candlelight" },
        { at: "meet some amazing inventors", emoji: "⚡💡✈️", caption: "Let's meet some inventors!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1700s", caption: "Benjamin Franklin lived long ago, in the 1700s" },
          { at: "is lightning electricity", emoji: "⚡❓", caption: "Is lightning electricity?" },
          { at: "In 1752", emoji: "🪁⛈️", caption: "In 1752, his kite test showed it is" },
          { at: "Never try it", emoji: "🚫🪁⛈️", caption: "Very dangerous. Never fly a kite in a storm!" },
          { at: "the lightning rod", emoji: "🏠⚡", caption: "The lightning rod keeps buildings safe" },
        ],
      },
      {
        show: [
          { emoji: "🔬", caption: "Thomas Edison had a big lab in New Jersey" },
          { at: "tried thousands of materials", emoji: "🔁🧪", caption: "He tried thousands of materials" },
          { at: "In 1879", big: "1879", caption: "In 1879, his bulb glowed for many hours" },
          { at: "electric lights", emoji: "🏠💡", caption: "Soon homes and streets had electric lights" },
          { at: "the phonograph", emoji: "🎵", caption: "He also invented the phonograph, which recorded sound" },
        ],
      },
      {
        show: [
          { emoji: "👬", caption: "Orville and Wilbur Wright" },
          { at: "Dayton, Ohio", emoji: "🚲🔧", caption: "They fixed and sold bicycles in Dayton, Ohio" },
          { at: "they built gliders", emoji: "🪁", caption: "First, gliders with no engine" },
          { at: "December 17, 1903", big: "1903", caption: "December 17, 1903: the first airplane with an engine" },
          { at: "just 12 seconds", big: "12 seconds", caption: "The first flight lasted just 12 seconds!" },
        ],
      },
    ],
  },
};
