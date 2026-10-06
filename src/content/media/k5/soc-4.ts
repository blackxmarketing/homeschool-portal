import type { CourseMedia } from "../types";

/** Slides for soc-4, by lesson id. */
export const soc4Media: CourseMedia = {
  "soc-4.latlong": {
    hook: {
      show: [
        { emoji: "⛵🌊🌊🌊", caption: "A ship alone in the middle of the ocean" },
        { at: "no roads, no signs", emoji: "🚫🛣️🚫🪧", caption: "No roads, no signs, no street names" },
        { at: "an invisible grid", emoji: "🌐", caption: "An invisible grid wrapped around the Earth" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🪜🌍", caption: "Latitude lines run east and west, like ladder rungs" },
          { at: "The equator is 0 degrees", big: "0°", caption: "The equator is 0 degrees latitude" },
          { at: "Northern Hemisphere and the Southern", emoji: "⬆️🌍⬇️", caption: "The Northern and Southern Hemispheres" },
          { at: "90 degrees north at the North Pole", big: "90°N", caption: "The North Pole is 90 degrees north" },
          { at: "also called parallels", emoji: "〰️〰️〰️", caption: "Parallels never touch each other" },
        ],
      },
      {
        show: [
          { emoji: "🍊", caption: "Longitude lines run pole to pole, like orange sections" },
          { at: "the prime meridian", big: "0°", caption: "The prime meridian is 0 degrees longitude" },
          { at: "Greenwich, England", emoji: "🇬🇧", caption: "It runs through Greenwich, England" },
          { at: "Eastern Hemisphere and the Western", emoji: "⬅️🌍➡️", caption: "The Western and Eastern Hemispheres" },
          { at: "180 degrees east", big: "180°", caption: "Longitude counts up to 180 degrees east and west" },
        ],
      },
      {
        show: [
          { emoji: "➕📍", caption: "Where two lines cross, you get coordinates" },
          { at: "latitude first, then longitude", emoji: "1️⃣ ↕️  2️⃣ ↔️", caption: "Latitude first, then longitude" },
          { at: "Washington, D.C., is at about", big: "39°N, 77°W", caption: "Washington, D.C." },
          { at: "New Orleans, Louisiana, is at", big: "30°N, 90°W", caption: "New Orleans, Louisiana" },
          { at: "The letters matter", emoji: "🧭", caption: "N or S, E or W: the letters tell the side" },
        ],
      },
      {
        show: [
          { emoji: "🗺️", caption: "Every good map carries three tools" },
          { at: "The compass rose shows", emoji: "🧭", caption: "The compass rose shows directions" },
          { at: "The map key", emoji: "🔑⭐〰️", caption: "The map key explains the symbols" },
          { at: "The scale is a small bar", emoji: "📏", caption: "The scale matches map distance to real distance" },
          { at: "really 150 miles apart", big: "3 × 50 = 150", caption: "3 inches × 50 miles = 150 miles" },
        ],
      },
    ],
  },

  "soc-4.regions": {
    hook: {
      show: [
        { emoji: "🚗🛣️🇺🇸", caption: "A road trip across the whole country" },
        { at: "lobster boats", emoji: "🦞⛵", caption: "Monday: lobster boats in a rocky harbor" },
        { at: "cornfields stretch flat", emoji: "🌽🌽🌽", caption: "Wednesday: cornfields as far as you can see" },
        { at: "edge of a canyon", emoji: "🏜️", caption: "Friday: a canyon more than a mile deep" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🗺️", caption: "A region is an area whose places share something" },
          { at: "five regions", big: "5", caption: "Five regions of the United States" },
          { at: "The Northeast is in the top right", emoji: "↗️🦞", caption: "The Northeast: top right, on the Atlantic" },
          { at: "The Midwest sits in the middle", emoji: "🌽", caption: "The Midwest: the middle of the country" },
          { at: "The West stretches", emoji: "🏔️🌊🌺", caption: "The West: to the Pacific, plus Alaska and Hawaii" },
        ],
      },
      {
        show: [
          { emoji: "⛰️", caption: "The Appalachian Mountains: old, low and rounded" },
          { at: "the Rocky Mountains are taller", emoji: "🏔️🏔️", caption: "The Rocky Mountains: tall, jagged and snowy" },
          { at: "the Great Plains", emoji: "🌾🌾🌾", caption: "The Great Plains: wide, flat grasslands" },
          { at: "The Mississippi River flows south", emoji: "🏞️⬇️", caption: "The Mississippi River flows south to the Gulf" },
          { at: "five Great Lakes", emoji: "💧💧💧💧💧", caption: "Five Great Lakes full of fresh water" },
        ],
      },
      {
        show: [
          { emoji: "🌦️📅", caption: "Climate is the usual weather over many years" },
          { at: "Natural resources are useful things", emoji: "🌱💧🌲🐟", caption: "Natural resources come from nature" },
          { at: "rich in fish and lobster", emoji: "🦞🐟", caption: "Northeast: fish and lobster" },
          { at: "grows cotton, peanuts and oranges", emoji: "🍊🥜", caption: "Southeast: cotton, peanuts and oranges" },
          { at: "The dry Southwest", emoji: "🐄🛢️", caption: "Southwest: cattle, copper and oil" },
        ],
      },
      {
        show: [
          { emoji: "⚓🏙️", caption: "Cities grew at harbors, rivers and lakes" },
          { at: "Chicago grew on Lake Michigan", emoji: "🚢🚂", caption: "Chicago: where boats and railroads met" },
          { at: "gold was found in California", big: "1848", caption: "Gold in California, 1848!" },
          { at: "usually have fewer people", emoji: "🏜️🏔️❄️", caption: "Deserts, ice and high mountains have fewer people" },
          { at: "air conditioning", emoji: "❄️🏠☀️", caption: "Air conditioning helps people live in the desert" },
        ],
      },
    ],
  },

  "soc-4.first-nations": {
    hook: {
      show: [
        { emoji: "🏗️❓", caption: "Build a home from only what is nearby" },
        { at: "In a forest", emoji: "🌲🪵", caption: "A forest gives wood and bark" },
        { at: "In a desert", emoji: "🏜️🧱", caption: "A desert gives mud and stone" },
        { at: "snowy Arctic", emoji: "❄️🏠", caption: "The Arctic gives snow" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌎", caption: "Hundreds of nations lived here long before Europeans came" },
          { at: "its own language", emoji: "🗣️📖", caption: "Each with its own language, leaders and stories" },
          { at: "built longhouses", emoji: "🏠🌲", caption: "Haudenosaunee longhouses of poles and elm bark" },
          { at: "corn, beans and squash", emoji: "🌽🫘🎃", caption: "The Three Sisters: corn, beans and squash" },
          { at: "Great Law of Peace", emoji: "🤝", caption: "Five nations joined under the Great Law of Peace" },
        ],
      },
      {
        show: [
          { emoji: "🌾🦬🦬", caption: "Bison herds on the Great Plains" },
          { at: "Tipis could be packed up", emoji: "⛺", caption: "Tipis could be packed up and moved" },
          { at: "used dogs to pull loads", emoji: "🐕", caption: "No horses yet: dogs pulled the loads" },
          { at: "the Ancestral Puebloans were farmers", emoji: "🏜️🌽", caption: "Ancestral Puebloans farmed the dry Southwest" },
          { at: "At Mesa Verde", emoji: "🧱🏘️", caption: "Cliff villages at Mesa Verde, Colorado" },
        ],
      },
      {
        show: [
          { emoji: "🌧️🌲🐟", caption: "Rain, cedar trees and salmon in the Northwest" },
          { at: "split cedar into wide planks", emoji: "🪵🏠", caption: "Cedar plank houses and canoes" },
          { at: "totem poles", emoji: "🗿", caption: "Tall carved totem poles" },
          { at: "the Inuit had almost no trees", emoji: "❄️🦭", caption: "The Inuit hunted seals in the Arctic" },
          { at: "built snow houses", emoji: "🧊🏠", caption: "Snow houses for winter hunting trips" },
        ],
      },
      {
        show: [
          { emoji: "🤝🔁", caption: "Nations traded from hand to hand" },
          { at: "Seashells from the Gulf", emoji: "🐚", caption: "Seashells traveled hundreds of miles inland" },
          { at: "Copper from near Lake Superior", emoji: "🪙", caption: "Copper from near Lake Superior" },
          { at: "called Cahokia", emoji: "⛰️🏘️", caption: "Cahokia, a great town of earthen mounds" },
          { at: "canoes were the trucks", emoji: "🛶", caption: "Rivers were the highways, canoes the trucks" },
        ],
      },
    ],
  },

  "soc-4.explorers": {
    hook: {
      show: [
        { emoji: "⛵🌊", caption: "Weeks at sea on an unknown ocean" },
        { at: "Your map ends", emoji: "🗺️❓", caption: "The map ends at the edge of the water" },
        { at: "Land!", emoji: "🏝️", caption: "Land!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌶️🧵", caption: "Europeans wanted spices and silk from Asia" },
          { at: "cost a fortune", emoji: "💰💰💰", caption: "Long land routes made them cost a fortune" },
          { at: "Christopher Columbus", emoji: "🧭⛵", caption: "Christopher Columbus planned to sail west" },
          { at: "In 1492 he sailed", big: "1492", caption: "The Niña, the Pinta and the Santa María" },
          { at: "an island in the Bahamas", emoji: "🏝️", caption: "An island in the Bahamas" },
        ],
      },
      {
        show: [
          { emoji: "🌊🧭", caption: "Other explorers sailed for other countries" },
          { at: "In 1497, John Cabot", big: "1497", caption: "John Cabot sails for England" },
          { at: "probably near Newfoundland", emoji: "🌲🪨🌊", caption: "He reached North America near Newfoundland" },
          { at: "In 1609, sailing for the Dutch", big: "1609", caption: "Henry Hudson sails the Half Moon for the Dutch" },
          { at: "called the Hudson River", emoji: "🏞️", caption: "The Hudson River in New York" },
        ],
      },
      {
        show: [
          { emoji: "🏰🌲", caption: "Jamestown, Virginia, 1607" },
          { at: "first lasting English settlement", big: "1607", caption: "The first lasting English settlement" },
          { at: "The water was bad", emoji: "🤒🍞❌", caption: "Sickness and hunger" },
          { at: "would not work would not eat", emoji: "🪓🌽", caption: "John Smith: no work, no food" },
          { at: "began growing tobacco", emoji: "🌿💰", caption: "Tobacco, a money crop, saved the colony" },
        ],
      },
      {
        show: [
          { emoji: "⛵🙏", caption: "The Pilgrims sail on the Mayflower, 1620" },
          { at: "signed the Mayflower Compact", emoji: "📜✍️", caption: "The Mayflower Compact: fair laws for all" },
          { at: "They built Plymouth", emoji: "🏠🌊", caption: "Plymouth, in what is now Massachusetts" },
          { at: "showed them how to plant corn", emoji: "🌽🐟", caption: "Squanto shows them how to plant corn" },
          { at: "made peace with them", emoji: "🤝", caption: "Massasoit makes peace with the Pilgrims" },
        ],
      },
    ],
  },

  "soc-4.state-government": {
    hook: {
      show: [
        { emoji: "🚗💨", caption: "Who decides the speed limit?" },
        { at: "which bird is your state bird", emoji: "🐦", caption: "Who picks the state bird?" },
        { at: "your state capitol", emoji: "🏛️", caption: "Your state capitol" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "📜", caption: "Every state starts with a state constitution" },
          { at: "three branches", big: "3", caption: "Three branches of government" },
          { at: "The legislative branch makes", emoji: "📜✍️", caption: "Legislative: makes the laws" },
          { at: "The executive branch carries out", emoji: "🏛️", caption: "Executive: carries out the laws" },
          { at: "The judicial branch decides", emoji: "⚖️", caption: "Judicial: decides what the laws mean" },
        ],
      },
      {
        show: [
          { emoji: "🧑‍⚖️🗳️", caption: "Lawmakers elected from all over the state" },
          { at: "except Nebraska", emoji: "1️⃣", caption: "Nebraska has just one house" },
          { at: "The governor leads", emoji: "🏛️👤", caption: "The governor leads the executive branch" },
          { at: "signs or vetoes bills", emoji: "✍️❌", caption: "The governor signs or vetoes bills" },
          { at: "state supreme court", emoji: "⚖️", caption: "The state supreme court" },
        ],
      },
      {
        show: [
          { emoji: "💡", caption: "A law starts as an idea" },
          { at: "writes the idea down as a bill", emoji: "📝", caption: "A legislator writes a bill" },
          { at: "called a committee", emoji: "👥🔍", caption: "A committee studies the bill" },
          { at: "the whole house debates and votes", emoji: "🗳️🗳️", caption: "Both houses vote" },
          { at: "If the governor signs it", emoji: "✍️✅", caption: "The governor signs it: now it's a law!" },
        ],
      },
      {
        show: [
          { emoji: "🧑‍🤝‍🧑", caption: "State government belongs to the people" },
          { at: "vote to elect the governor", emoji: "🗳️", caption: "Grown-up citizens vote" },
          { at: "Kids can take part too", emoji: "✉️", caption: "Kids can write a polite letter" },
          { at: "visit your state capitol", emoji: "🏛️👣", caption: "Visit the state capitol" },
          { at: "Good citizens also obey the laws", emoji: "🤝🏘️", caption: "Good citizens obey laws and help their community" },
        ],
      },
    ],
  },

  "soc-4.state-economy": {
    hook: {
      show: [
        { emoji: "🥣🥛🧃", caption: "What's on your breakfast table?" },
        { at: "How many states", emoji: "🗺️❓", caption: "How many states helped make it?" },
        { at: "follow the trail of goods", emoji: "🚚👣", caption: "Let's follow the trail of goods" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🛒💵", caption: "An economy: making, buying, selling and using" },
          { at: "Natural resources come from nature", emoji: "🌾💧🌲", caption: "Natural resources come from nature" },
          { at: "Human resources are the people", emoji: "👷👩‍🍳", caption: "Human resources are people and their skills" },
          { at: "Capital resources are things", emoji: "🚜🏭", caption: "Capital resources are tools and machines" },
          { at: "Think about a bakery", emoji: "🍞", caption: "A bakery needs all three" },
        ],
      },
      {
        show: [
          { emoji: "🏭🚜🎣", caption: "An industry: businesses making the same kind of thing" },
          { at: "Iowa has deep, rich soil", emoji: "🌽", caption: "Iowa: the top corn state" },
          { at: "Idaho is famous for potatoes", emoji: "🥔🍎🧀", caption: "Idaho potatoes, Washington apples, Wisconsin cheese" },
          { at: "Texas pumps oil", emoji: "🛢️", caption: "Texas: oil" },
          { at: "center of America's car industry", emoji: "🚗", caption: "Michigan: cars" },
        ],
      },
      {
        show: [
          { emoji: "🎯", caption: "Specialize: focus on a few things you do well" },
          { at: "Then states trade", emoji: "🌽🔁🚗", caption: "Iowa corn for Michigan cars" },
          { at: "are called exports", emoji: "📦➡️🌍", caption: "Exports go out" },
          { at: "are called imports", emoji: "🌍➡️📦", caption: "Imports come in" },
          { at: "import bananas", emoji: "🍌", caption: "Bananas grow best in tropical places" },
        ],
      },
      {
        show: [
          { emoji: "🔗", caption: "Interdependence: depending on each other" },
          { at: "a box of cereal", emoji: "🥣", caption: "Look at a box of cereal" },
          { at: "The sugar might come", emoji: "🍬", caption: "Sugar from Louisiana or Minnesota" },
          { at: "Trucks, trains and ships", emoji: "🚚🚂🚢", caption: "Trucks, trains and ships carry it all" },
          { at: "If a drought ruins a harvest", emoji: "☀️🌾📈", caption: "A drought can raise prices everywhere" },
        ],
      },
    ],
  },
};
