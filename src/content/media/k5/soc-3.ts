import type { CourseMedia } from "../types";

/** Slides for soc-3, by lesson id. */
export const soc3Media: CourseMedia = {
  "soc-3.landforms": {
    hook: {
      show: [
        { emoji: "🧭🗺️", caption: "A mapmaker heading west, like the explorers of 1804" },
        { at: "You climb tall mountains", emoji: "⛰️🌾🛶", caption: "Mountains, flat land and rivers" },
        { at: "You would need words", emoji: "🗺️✏️", caption: "Words for every shape, and a good map" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "⛰️🌄", caption: "Landforms: the natural shapes of the land" },
          { at: "you find a valley", emoji: "🏞️", caption: "A valley: low land between hills or mountains" },
          { at: "A plain is wide", emoji: "🌾🚜", caption: "A plain: wide, flat land for farms" },
          { at: "A plateau is high land", emoji: "🟫", caption: "A plateau: high land with a flat top" },
          { at: "The Grand Canyon in Arizona", emoji: "🏜️", caption: "The Grand Canyon, carved by the Colorado River" },
        ],
      },
      {
        show: [
          { emoji: "🌊", caption: "An ocean: a huge body of salt water" },
          { at: "A river is moving water", emoji: "🏞️", caption: "A river flows downhill from source to mouth" },
          { at: "called a tributary", emoji: "〰️➡️🌊", caption: "A tributary joins a bigger river" },
          { at: "An island has water", emoji: "🏝️", caption: "An island: water all around" },
          { at: "Florida is a peninsula", big: "Florida", caption: "Florida is a peninsula: water on three sides" },
        ],
      },
      {
        show: [
          { emoji: "🗺️", caption: "Every good map has tools" },
          { at: "The map key, also called", emoji: "🔑", caption: "The map key tells what symbols mean" },
          { at: "The compass rose shows", emoji: "🧭", caption: "N, S, E, W, plus NE, NW, SE and SW" },
          { at: "The map scale tells", emoji: "📏", caption: "The map scale: 1 inch = 10 miles" },
          { at: "Just multiply", big: "2 × 10 = 20", caption: "2 inches = 20 miles" },
        ],
      },
      {
        show: [
          { emoji: "🇺🇸", caption: "A region: places that share features" },
          { at: "The Northeast has old cities", emoji: "🍁🏙️", caption: "Northeast: old cities and a rocky coast" },
          { at: "The Midwest has flat plains", emoji: "🌽🌾", caption: "Midwest: flat plains and big farms" },
          { at: "The Southwest is hot", emoji: "🌵☀️", caption: "Southwest: hot, dry deserts and canyons" },
          { at: "The West has the tall", emoji: "🏔️🌊", caption: "West: the Rocky Mountains and the Pacific" },
        ],
      },
    ],
  },

  "soc-3.settle": {
    hook: {
      show: [
        { emoji: "🐴🛒", caption: "200 years ago, choosing a spot for a home" },
        { at: "a dry, rocky hilltop", emoji: "🪨⛰️", caption: "A dry, rocky hilltop..." },
        { at: "a green valley next to a river", emoji: "🏞️", caption: "...or a green valley by a river?" },
        { at: "the secret behind where", emoji: "🏙️💧", caption: "The secret behind where cities are" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🚰🍞🏠", caption: "Everyone needs water, food and shelter" },
          { at: "rivers were also highways", emoji: "🛶📦", caption: "Rivers were the highways of long ago" },
          { at: "spin a water wheel", emoji: "⚙️💧", caption: "Rushing water ran the mill" },
          { at: "Pittsburgh grew where two rivers", big: "Pittsburgh", caption: "Two rivers meet to form the Ohio River" },
          { at: "New Orleans grew", big: "New Orleans", caption: "Near the mouth of the Mississippi River" },
        ],
      },
      {
        show: [
          { emoji: "🌦️⛰️", caption: "Land and climate shape the work people do" },
          { at: "Natural resources are things", emoji: "🌳🐟💧", caption: "Natural resources come from nature" },
          { at: "people grow corn and wheat", emoji: "🌽🌾", caption: "Rich, flat soil: farming" },
          { at: "people cut lumber", emoji: "🌲🪵", caption: "Thick forests: lumber" },
          { at: "people fish and build ships", emoji: "🎣⛵", caption: "The coast: fishing and ships" },
        ],
      },
      {
        show: [
          { emoji: "🧥❄️", caption: "To adapt: change how you live to fit a place" },
          { at: "build steep roofs", emoji: "🏠❄️", caption: "Steep roofs let the snow slide off" },
          { at: "They build bridges over rivers", emoji: "🌉", caption: "Changing the land: bridges and canals" },
          { at: "They build dams", emoji: "🧱💧", caption: "Dams store water and make power" },
          { at: "The Erie Canal opened in 1825", big: "1825", caption: "The Erie Canal links the Hudson River and Lake Erie" },
        ],
      },
    ],
  },

  "soc-3.economics": {
    hook: {
      show: [
        { big: "$10", caption: "You have $10 at the county fair" },
        { at: "A kite costs", emoji: "🪁📕🥨🎡", caption: "A kite, a book, or a pretzel and a ride?" },
        { at: "You can't have all three", emoji: "🤔", caption: "You can't have all three!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🛍️💭", caption: "People want many things" },
          { at: "This problem is called scarcity", big: "Scarcity", caption: "Not enough for everything we want" },
          { at: "only 24 hours in a day", emoji: "⏰", caption: "Time is scarce too: 24 hours a day" },
          { at: "called the opportunity cost", big: "Opportunity cost", caption: "The next-best thing you give up" },
          { at: "You can go fishing", emoji: "🎣 or 🌳🏠", caption: "Fishing or a tree fort?" },
        ],
      },
      {
        show: [
          { emoji: "🏭🛒", caption: "Producers make; consumers buy and use" },
          { at: "A baker is a producer", emoji: "🥖", caption: "A baker is a producer and a consumer" },
          { at: "Natural resources come from nature", emoji: "🌾💧🪵", caption: "Natural resources: wheat, water, wood" },
          { at: "Human resources are the workers", emoji: "👩‍🍳", caption: "Human resources: workers and their skills" },
          { at: "Capital resources are tools", emoji: "🔥🛠️", caption: "Capital resources: tools, machines, buildings" },
        ],
      },
      {
        show: [
          { emoji: "👞🌽", caption: "Specialize: focus on work you do well" },
          { at: "people bartered", emoji: "🥚↔️👞", caption: "Barter: trading goods for goods" },
          { at: "Money makes trade easier", emoji: "💵", caption: "Everyone accepts money" },
          { at: "Sellers hope to earn a profit", emoji: "💰", caption: "Profit: money left after costs" },
          { at: "Bananas grow in warm countries", emoji: "🍌🚢", caption: "Trade connects us to faraway places" },
        ],
      },
    ],
  },

  "soc-3.our-story": {
    hook: {
      show: [
        { emoji: "🧳📷", caption: "A faded photo in an old attic trunk" },
        { at: "a dirt road, a horse", emoji: "🐴🏚️", caption: "A dirt road, a horse and a wooden store" },
        { at: "history detectives", emoji: "🕵️🔍", caption: "Let's be history detectives!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏹🏕️", caption: "Native American peoples lived on the land first" },
          { at: "Ohio and Mississippi", big: "Ohio", caption: "Ohio and Mississippi: names from Native American words" },
          { at: "Later, settlers came", emoji: "🪓🏠", caption: "Settlers built towns near water and farmland" },
          { at: "railroads crossed the country", emoji: "🚂", caption: "New towns grew along the railroad tracks" },
          { at: "named for its founder", emoji: "🏷️", caption: "Named for a founder, a landform or another place" },
        ],
      },
      {
        show: [
          { emoji: "🕵️", caption: "Historians are like detectives" },
          { at: "A primary source was made", emoji: "📜", caption: "Primary: made at the time" },
          { at: "Letters, diaries, old photos", emoji: "✉️📔📷", caption: "Letters, diaries, photos, maps, newspapers" },
          { at: "A secondary source was made later", emoji: "📘", caption: "Secondary: made later, like a history book" },
          { at: "Good detectives check more", emoji: "🔍🔍", caption: "Check more than one source" },
        ],
      },
      {
        show: [
          { emoji: "🛣️", caption: "Places change over time" },
          { at: "Horses and wagons gave way", emoji: "🐴➡️🚗", caption: "Horses and wagons, then cars" },
          { at: "Candles and oil lamps", emoji: "🕯️➡️💡", caption: "Candles and lamps, then electric lights" },
          { at: "A timeline helps us see", emoji: "📏", caption: "A timeline puts events in order" },
          { at: "When a railroad came", emoji: "🚂🏘️", caption: "Cause and effect: the railroad brings growth" },
        ],
      },
      {
        show: [
          { big: "50", caption: "The United States has 50 states" },
          { at: "Delaware was the first state", big: "1787", caption: "Delaware: the first state" },
          { at: "Hawaii became the 50th", emoji: "🌺🏝️", caption: "Hawaii: the 50th state, in 1959" },
          { at: "Every state has a capital city", emoji: "🏛️", caption: "The capital: where state laws are made" },
          { at: "Every state also has symbols", emoji: "🚩🐦🌸", caption: "A flag, a seal, a bird, a flower, a motto" },
        ],
      },
    ],
  },

  "soc-3.government": {
    hook: {
      show: [
        { emoji: "🕳️🚗", caption: "A big pothole on your street!" },
        { at: "Who fixes it", emoji: "🚧👷", caption: "Who fixes it, and who pays?" },
        { at: "your local government", emoji: "🏛️", caption: "Your local government" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏛️", caption: "Government makes laws, carries them out and settles disagreements" },
          { at: "Laws keep people safe", emoji: "📜🛡️", caption: "Laws keep people safe and protect rights" },
          { at: "Local government runs a town", emoji: "🏘️", caption: "Local: a town, city or county, led by a mayor" },
          { at: "State government runs a whole state", emoji: "🗺️", caption: "State: led by the governor" },
          { at: "National government runs the whole country", emoji: "🇺🇸", caption: "National: led by the President" },
        ],
      },
      {
        show: [
          { big: "3 branches", caption: "Power is split three ways" },
          { at: "The legislative branch makes the laws", emoji: "📜", caption: "Legislative: council, legislature, Congress" },
          { at: "The executive branch carries out", emoji: "🏛️", caption: "Executive: mayor, governor, President" },
          { at: "The judicial branch is the courts", emoji: "⚖️", caption: "Judicial: judges and courts" },
          { at: "called checks and balances", emoji: "🤝", caption: "Checks and balances" },
        ],
      },
      {
        show: [
          { emoji: "🚒📚🌳", caption: "Local services: fire, police, libraries, parks" },
          { at: "State governments build highways", emoji: "🛣️🪪", caption: "State: highways, state parks, driver's licenses" },
          { at: "The national government runs", emoji: "🇺🇸✉️", caption: "National: military, mail, money" },
          { at: "with taxes", emoji: "💵🏛️", caption: "Taxes pay for government services" },
          { at: "buy a fire truck", emoji: "🚒", caption: "Together we can buy what one family can't" },
        ],
      },
    ],
  },

  "soc-3.citizen": {
    hook: {
      show: [
        { big: "1736", caption: "Benjamin Franklin worries about fires in Philadelphia" },
        { at: "There was no fire department", emoji: "🔥🏠", caption: "No fire department like today's" },
        { at: "So he gathered his neighbors", emoji: "🪣🪣🪣", caption: "Neighbors working together" },
        { at: "You don't have to be grown up", emoji: "🧒⭐", caption: "Kids can make a community better too" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🇺🇸", caption: "A citizen belongs to a community and a country" },
          { at: "The Bill of Rights is", emoji: "📜", caption: "The Bill of Rights protects our freedoms" },
          { at: "At 18, citizens can vote", emoji: "🗳️", caption: "At 18, citizens can vote" },
          { at: "But rights come with responsibilities", emoji: "⚖️", caption: "Rights come with responsibilities" },
          { at: "serve on a jury", emoji: "🧑‍⚖️", caption: "Serving on a jury helps courts be fair" },
        ],
      },
      {
        show: [
          { emoji: "🌟", caption: "Civic virtues help a community thrive" },
          { at: "Honesty means telling", emoji: "😇", caption: "Honesty and responsibility" },
          { at: "Courage means doing", emoji: "🦁", caption: "Courage: doing right when it's hard" },
          { at: "Service means helping", emoji: "🙋", caption: "Service: helping without being asked" },
          { at: "helped start a library", emoji: "📚", caption: "Franklin's library (1731) and fire company (1736)" },
        ],
      },
      {
        show: [
          { emoji: "👀🗑️", caption: "Step 1: notice a problem" },
          { at: "Next, learn the facts", emoji: "🔍", caption: "Step 2: learn the facts" },
          { at: "Groups often vote", emoji: "🗳️", caption: "Choose together, often by voting" },
          { at: "sometimes compromise", emoji: "🤝", caption: "Compromise: each side gives a little" },
          { at: "Finally, look back", emoji: "✅", caption: "Act, then look back: did it work?" },
        ],
      },
    ],
  },
};
