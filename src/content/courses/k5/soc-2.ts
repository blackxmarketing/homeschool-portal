import { k5Course } from "./base";

/**
 * soc-2: Grade 2 social studies with Ranger Clark, in Riverbend Valley.
 * Communities, maps and the world, producers and consumers, saving and
 * spending, citizenship and voting, and inventors who changed our lives.
 * Written for the ear: everything is read aloud.
 */
export const soc2 = k5Course("soc", 2, [
  // 1. Rural, suburban and urban communities
  {
    id: "soc-2.communities",
    title: "Country, Suburb and City",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.2.1", "D2.Geo.2.K-2", "D2.Geo.6.K-2", "D2.Civ.2.K-2", "D2.Civ.6.K-2"],
    read: [
      "A community is a place where people live, work and play together. There are three kinds of communities.",
      "A rural community is out in the country. Homes are far apart. There are farms, fields and woods. People often drive a long way to the store.",
      "An urban community is a city. Lots of people live close together. There are tall buildings, busy streets, buses and trains. Many families live in apartments.",
      "A suburban community is near a city. It has houses with yards, schools, parks and stores. Many grown-ups drive into the city to work.",
      "Every community needs helpers. Farmers, firefighters, teachers and store workers all help. Everyone has a part to play. Together, people make a community a good place to live.",
    ].join("\n\n"),
    keyIdeas: [
      "A rural community is in the country, with farms and homes far apart.",
      "An urban community is a city, with tall buildings and many people close together.",
      "A suburban community is near a city, with houses, yards and quiet streets.",
      "Every community needs people who help.",
    ],
    hook: {
      text: "Picture a red barn with a cow. 🐄 Now picture tall towers and busy streets. 🏙️ Both places are communities! Let's explore how they are different.",
    },
    teach: [
      {
        title: "Rural: Out in the Country",
        teach:
          "A rural community is out in the country. 🌾 Homes are far apart. There are farms, fields and woods. Farmers grow food like corn and wheat. 🌽 Some families raise cows and chickens. The nearest store may be miles away. So people drive a long way to shop. Rural places are quiet. At night you can see lots of stars! ⭐",
        visual: {
          type: "flip",
          cards: [
            { front: "🏘️ Community", back: "A place where people live, work and play together." },
            { front: "🌾 Rural", back: "Out in the country. Farms, fields and homes far apart." },
            { front: "🏙️ Urban", back: "A city. Tall buildings and lots of people close together." },
            { front: "🏡 Suburban", back: "Near a city. Houses with yards and quiet streets." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is it out in the country, or in a big city? Sort each picture.",
          buckets: ["🌾 Country (rural)", "🏙️ City (urban)"],
          items: [
            { text: "🚜 A tractor in a field", bucket: 0 },
            { text: "🐄 Cows in a barn", bucket: 0 },
            { text: "🌽 A big corn field", bucket: 0 },
            { text: "🏢 A tall office tower", bucket: 1 },
            { text: "🚕 Lots of taxis on a busy street", bucket: 1 },
            { text: "🚇 A train under the ground", bucket: 1 },
          ],
          hint: "Rural places have farms and open land. Cities have tall buildings and busy streets.",
          mistakes: [
            { match: "Tractor sorted as city", coach: "Tractors work on farms, and farms are out in the country." },
            { match: "Taxis sorted as country", coach: "Lots of taxis and busy streets mean a city." },
          ],
          seconds: 30,
        },
        think: {
          q: "Where are homes far apart, with farms and fields all around?",
          choices: ["A big city", "A rural community", "A busy downtown street"],
          answer: 1,
          why: "Rural means out in the country, where there are farms and homes are far apart.",
          hints: [
            "In a big city, homes are packed close together, often in tall buildings.",
            "",
            "A downtown street is busy and crowded, not full of farms and fields.",
          ],
        },
        approaches: {
          analogy:
            "Think of a rural community like a big quilt with lots of space between the patches. Each farm is a patch, with fields all around it.",
          example:
            "A farm family wakes up early to feed the chickens. Their nearest neighbor lives down a long dirt road. To buy groceries, they drive 20 minutes to town. That is rural life.",
          simpler: {
            q: "Where do you find farms and tractors?",
            choices: ["In the country", "On top of a skyscraper"],
            answer: 0,
            why: "Farms need lots of open land, and that is in the country.",
            hints: ["", "A skyscraper is a tall city building. There is no room for a farm up there!"],
          },
        },
      },
      {
        title: "Urban: The Big City",
        teach:
          "An urban community is a city. 🏙️ Lots of people live close together. The buildings are tall. Some are skyscrapers! Many families live in apartments. 🏢 Streets are busy with cars, buses and taxis. 🚌 Some cities have trains under the ground, called subways. Stores, museums and jobs are close by. In a city, you can often walk to the store!",
        visual: {
          type: "hotspots",
          title: "A walk around the city",
          center: "🏙️ City",
          spots: [
            { label: "Skyscraper", icon: "🏢", detail: "A very tall building with many floors. Some have offices, some have homes." },
            { label: "Apartments", icon: "🏬", detail: "One building with many homes inside, stacked on top of each other." },
            { label: "Bus", icon: "🚌", detail: "A big ride for many people. It stops all over the city." },
            { label: "Subway", icon: "🚇", detail: "A train that runs in tunnels under the ground." },
            { label: "Museum", icon: "🏛️", detail: "A building full of art, history or science to explore." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each city picture to its name.",
          pairs: [
            { left: "🏢", right: "skyscraper" },
            { left: "🚇", right: "subway train" },
            { left: "🚌", right: "city bus" },
            { left: "🏛️", right: "museum" },
          ],
          hint: "Look closely. Which one is under the ground? Which one carries lots of riders on the street?",
          mistakes: [
            { match: "Mixed up subway and bus", coach: "A subway runs under the ground. A bus drives on the street." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which is true about an urban community?",
          choices: ["Homes are miles apart", "There are no stores", "Lots of people live close together"],
          answer: 2,
          why: "Urban means city, and cities have lots of people living close together.",
          hints: [
            "Homes miles apart sounds like the country. Cities are crowded.",
            "Cities have lots of stores, often close enough to walk to.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A city is like a beehive. 🐝 Lots of bees live close together and buzz around all day, each one busy with a job.",
          example:
            "A boy lives on the 10th floor of an apartment building. He rides the elevator down, walks one block to school, and takes the bus to the museum on Saturday. That is city life.",
          simpler: {
            q: "What is another word for a city community?",
            choices: ["Rural", "Urban"],
            answer: 1,
            why: "Urban means city.",
            hints: ["Rural means out in the country, with farms.", ""],
          },
        },
      },
      {
        title: "Suburban: In Between",
        teach:
          "A suburban community is near a city. 🏡 It is in between the city and the country. Houses have yards. Kids ride bikes on quiet streets. 🚲 There are schools, parks and shopping centers. Many grown-ups drive into the city to work. 🚗 Then they drive home at night. A suburb is not as busy as a city. But it is not as open as a farm.",
        visual: {
          type: "compare",
          left: { title: "🏡 Suburb", points: ["Houses with yards", "Quiet streets", "Near a city", "People often drive to work"] },
          right: { title: "🏙️ City", points: ["Tall buildings and apartments", "Busy streets", "Buses and subways", "People often walk or ride"] },
        },
        probe: {
          type: "cloze",
          text: "A suburb is near a {0}. 🏡 Houses have {1}. Many grown-ups drive into the city to {2}.",
          blanks: [{ answers: ["city"] }, { answers: ["yards"] }, { answers: ["work"] }],
          bank: ["city", "yards", "work", "farm", "subways"],
          hint: "Suburbs are next to cities. Think of grass around each house, and a job to go to.",
          mistakes: [
            { match: "farm", coach: "Farms are out in the country. A suburb sits close to a city." },
            { match: "subways", coach: "Subways run under big cities. In a suburb, houses have grass all around them." },
          ],
          seconds: 30,
        },
        think: {
          q: "Where is a suburban community?",
          choices: ["Near a city", "In the middle of the ocean", "Far out on a farm"],
          answer: 0,
          why: "A suburb is a community near a city, in between the city and the country.",
          hints: [
            "",
            "People don't build towns in the middle of the ocean!",
            "Far out on a farm is rural. A suburb is closer to the city.",
          ],
        },
        approaches: {
          analogy:
            "A suburb is like the middle seat between two friends. On one side is the busy city, and on the other side is the quiet country.",
          example:
            "A girl lives in a house with a backyard and a swing. Her street is quiet. Her mom drives 30 minutes into the city to work at a bank. That is suburban life.",
          simpler: {
            q: "Do houses in a suburb usually have yards?",
            choices: ["Yes", "No, they are all skyscrapers"],
            answer: 0,
            why: "Most suburban homes are houses with yards.",
            hints: ["", "Skyscrapers are in cities. Suburbs have houses with grass around them."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Rural, suburban or urban? Sort each one.",
      buckets: ["🌾 Rural", "🏡 Suburban", "🏙️ Urban"],
      items: [
        { text: "🐓 Chickens and a big red barn", bucket: 0 },
        { text: "🚜 A tractor on a dirt road", bucket: 0 },
        { text: "🌲 Woods and fields for miles", bucket: 0 },
        { text: "🏡 A house with a yard near the city", bucket: 1 },
        { text: "🚲 Kids biking on a quiet street", bucket: 1 },
        { text: "🛝 A neighborhood park and a cul-de-sac", bucket: 1 },
        { text: "🏢 Skyscrapers downtown", bucket: 2 },
        { text: "🚇 A subway station", bucket: 2 },
        { text: "🚕 Taxis honking on a crowded street", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell a grown-up about the three kinds of communities. How are they different?",
      keyPoints: [
        "Rural communities are in the country, with farms and homes far apart",
        "Urban communities are cities, with tall buildings and many people close together",
        "Suburban communities are near a city, with houses and yards",
        "Every community has people who help",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Sort the homes and places.",
        buckets: ["🌾 Rural", "🏡 Suburban", "🏙️ Urban"],
        items: [
          { text: "🐑 A sheep farm", bucket: 0 },
          { text: "🌻 A farmhouse with fields all around", bucket: 0 },
          { text: "🏡 A street of houses with yards", bucket: 1 },
          { text: "🚗 A driveway and a garage", bucket: 1 },
          { text: "🏢 An apartment on the 20th floor", bucket: 2 },
          { text: "🚌 A crowded city bus", bucket: 2 },
        ],
        hint: "Farms are rural. Houses with yards near a city are suburban. Tall buildings are urban.",
        mistakes: [
          { match: "Apartment sorted as suburban", coach: "An apartment on the 20th floor is in a tall building. That means a city." },
          { match: "Sheep farm sorted as suburban", coach: "Farms need lots of open land, out in the country." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each word to its picture.",
        pairs: [
          { left: "Rural", right: "🚜🌾" },
          { left: "Suburban", right: "🏡🚲" },
          { left: "Urban", right: "🏙️🚕" },
        ],
        hint: "Rural is country, suburban is houses near a city, urban is the city.",
        mistakes: [{ match: "Mixed up rural and urban", coach: "Rural is the country with farms. Urban is the big city." }],
        seconds: 20,
      },
      {
        type: "number",
        prompt: "🚗 A farm family drives 9 miles to the store. Then they drive 9 miles back home. How many miles do they drive in all?",
        answer: 18,
        unit: "miles",
        hint: "They drive there and back. Add 9 and 9.",
        mistakes: [{ match: "9", coach: "That's only the trip to the store. They have to drive home too!" }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build the sentence.",
        tiles: ["A city", "is an", "urban", "community."],
        distractors: ["rural"],
        hint: "Which word means city?",
        mistakes: [{ match: "Used 'rural'", coach: "Rural means the country. A city is urban." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What kind of community has farms and homes far apart?",
        choices: ["Urban", "Rural", "Suburban"],
        answer: 1,
        why: "Rural communities are in the country, where there is lots of open land.",
      },
      {
        q: "Where would you most likely ride a subway?",
        choices: ["In a city", "On a farm", "In the woods"],
        answer: 0,
        why: "Subways are trains under the ground in big cities.",
      },
      {
        q: "A house with a yard near a city is in a...",
        choices: ["rural community", "urban community", "suburban community"],
        answer: 2,
        why: "Suburbs are near cities, and many homes have yards.",
      },
      {
        q: "What is a community?",
        choices: ["Only a farm", "A kind of car", "A place where people live, work and play together", "A tall building"],
        answer: 2,
        why: "A community is people living, working and playing together in one place.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, draw a picture of your own community. Is it rural, suburban or urban? Draw 3 things that show which kind it is, like a farm, a yard or a tall building. Then draw one helper in your community.",
      rubric: [
        "Names the kind of community: rural, suburban or urban",
        "Shows 3 things that fit that kind of community",
        "Draws one community helper",
        "Tells a grown-up about the drawing",
      ],
    },
  },

  // 2. Maps, globes, continents and oceans
  {
    id: "soc-2.maps",
    title: "Maps, Continents and Oceans",
    minutes: 20,
    stage: "grammar",
    standards: ["SS.2.6", "SS.2.7", "D2.Geo.1.K-2", "D2.Geo.3.K-2"],
    read: [
      "A map is a flat picture of a place, seen from above. A globe is a round model of the whole Earth.",
      "Maps have helpers. Small pictures on a map are called symbols. The map key tells what each symbol means. A tree symbol might mean a park.",
      "The compass rose shows directions. The four cardinal directions are north, south, east and west. North is usually at the top of a map. South is at the bottom. East is on the right, and west is on the left.",
      "Earth has seven continents. A continent is a huge piece of land. They are North America, South America, Europe, Asia, Africa, Australia and Antarctica. Asia is the biggest. We live in North America, in the United States.",
      "Earth also has five oceans. An ocean is a huge body of salt water. They are the Pacific, Atlantic, Indian, Southern and Arctic Oceans. The Pacific is the biggest. Most of Earth is covered by water!",
    ].join("\n\n"),
    keyIdeas: [
      "The map key tells what the symbols on a map mean.",
      "The compass rose shows north, south, east and west.",
      "Earth has seven continents and five oceans.",
      "We live in North America, between the Atlantic and Pacific Oceans.",
    ],
    hook: {
      text: "A treasure map has a big X. ❌ But how do you find the X? You need map skills! Grab your compass, explorer. 🧭",
    },
    teach: [
      {
        title: "Map Keys and Symbols",
        teach:
          "A map is a picture of a place from above. 🦅 It is like a bird looking down. Maps use small pictures called symbols. A tree symbol can mean a park. 🌳 A blue line can mean a river. The map key tells what each symbol means. Always read the key first! 🔑 Then the whole map makes sense.",
        visual: {
          type: "hotspots",
          title: "Parts of a map",
          center: "🗺️ Map",
          spots: [
            { label: "Title", icon: "🏷️", detail: "Tells what place the map shows, like 'Riverbend Town'." },
            { label: "Symbols", icon: "🌳", detail: "Small pictures that stand for real things, like a tree for a park." },
            { label: "Map key", icon: "🔑", detail: "A box that tells what each symbol means." },
            { label: "Compass rose", icon: "🧭", detail: "Shows the directions north, south, east and west." },
          ],
        },
        probe: {
          type: "match",
          prompt: "You are making a map key. Match each symbol to what it means.",
          pairs: [
            { left: "🌳", right: "park" },
            { left: "🏫", right: "school" },
            { left: "🏥", right: "hospital" },
            { left: "🛤️", right: "railroad" },
          ],
          hint: "Look at each little picture. What real place does it look like?",
          mistakes: [{ match: "Mixed up school and hospital", coach: "The building with a red cross is a hospital. The one with a bell is a school." }],
          seconds: 30,
        },
        think: {
          q: "What part of a map tells what the symbols mean?",
          choices: ["The map key", "The title", "The edge of the paper"],
          answer: 0,
          why: "The map key lists each symbol and what it stands for.",
          hints: [
            "",
            "The title tells what place the map shows, not what the symbols mean.",
            "The edge of the paper is just where the map stops.",
          ],
        },
        approaches: {
          analogy:
            "A map key is like the answer sheet for a secret code. 🔐 Each symbol is a code, and the key tells you what it means.",
          example:
            "On a town map, you see three little tree pictures. You look at the key. It says 🌳 = park. Now you know there are three parks in town!",
          simpler: {
            q: "On a map, a small picture that stands for a real thing is called a...",
            choices: ["symbol", "song"],
            answer: 0,
            why: "Small pictures on a map are called symbols.",
            hints: ["", "A song is music. On a map, the little pictures are symbols."],
          },
        },
      },
      {
        title: "The Compass Rose",
        teach:
          "The compass rose shows directions. 🧭 There are four cardinal directions. They are north, south, east and west. North is usually at the top of a map. South is at the bottom. East is on the right. West is on the left. Here is a trick: Never Eat Soggy Waffles! 🧇 Start at the top and go around: N, E, S, W.",
        visual: {
          type: "hotspots",
          title: "The compass rose",
          center: "🧭",
          spots: [
            { label: "North", icon: "⬆️", detail: "Usually at the top of the map." },
            { label: "East", icon: "➡️", detail: "On the right. The Sun rises in the east." },
            { label: "South", icon: "⬇️", detail: "At the bottom of the map." },
            { label: "West", icon: "⬅️", detail: "On the left. The Sun sets in the west." },
          ],
        },
        probe: {
          type: "cloze",
          text: "On most maps, north is at the {0}. South is at the {1}. East is on the {2}. West is on the {3}.",
          blanks: [{ answers: ["top"] }, { answers: ["bottom"] }, { answers: ["right"] }, { answers: ["left"] }],
          bank: ["top", "bottom", "right", "left", "middle"],
          hint: "Remember Never Eat Soggy Waffles: N at the top, then E, S and W going around.",
          mistakes: [
            { match: "middle", coach: "The middle of the compass rose is where the lines cross. Each direction points out to an edge." },
          ],
          seconds: 35,
        },
        think: {
          q: "On most maps, which direction is at the top?",
          choices: ["South", "West", "North", "East"],
          answer: 2,
          why: "Maps usually put north at the top.",
          hints: [
            "South is at the bottom, the opposite of the top.",
            "West is on the left side.",
            "",
            "East is on the right side.",
          ],
        },
        approaches: {
          analogy:
            "A compass rose is like a clock with only four numbers. North sits where the 12 is, east at the 3, south at the 6 and west at the 9.",
          example:
            "On a map, the school is at the top and your house is at the bottom. To walk from your house to the school, you walk north. To walk home, you walk south.",
          simpler: {
            q: "How many cardinal directions are there?",
            choices: ["Two", "Four", "Ten"],
            answer: 1,
            why: "North, south, east and west: that's four.",
            hints: ["Count them: north, south, east, west. That's more than two.", "", "There are only four main directions: north, south, east and west."],
          },
        },
      },
      {
        title: "Continents and Oceans",
        teach:
          "A globe is a round model of Earth. 🌍 Earth has seven continents. A continent is a huge piece of land. They are North America, South America, Europe, Asia, Africa, Australia and Antarctica. Asia is the biggest. We live in North America. Earth also has five oceans. An ocean is a huge body of salt water. 🌊 The Pacific Ocean is the biggest.",
        visual: {
          type: "hotspots",
          title: "The seven continents",
          center: "🌍 Earth",
          spots: [
            { label: "North America", icon: "🦅", detail: "Where the United States, Canada and Mexico are. We live here!" },
            { label: "South America", icon: "🦜", detail: "Home of the huge Amazon rainforest." },
            { label: "Europe", icon: "🏰", detail: "A continent with many countries and old castles." },
            { label: "Asia", icon: "🐼", detail: "The biggest continent. Pandas live in China, in Asia." },
            { label: "Africa", icon: "🦁", detail: "Home of lions, elephants and the Sahara Desert." },
            { label: "Australia", icon: "🦘", detail: "The smallest continent. Kangaroos live here." },
            { label: "Antarctica", icon: "🐧", detail: "The coldest continent, covered in ice. Penguins live here." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Land or water? Sort each name.",
          buckets: ["🏔️ Continent (land)", "🌊 Ocean (water)"],
          items: [
            { text: "Asia", bucket: 0 },
            { text: "Africa", bucket: 0 },
            { text: "Antarctica", bucket: 0 },
            { text: "Europe", bucket: 0 },
            { text: "Pacific", bucket: 1 },
            { text: "Atlantic", bucket: 1 },
            { text: "Arctic", bucket: 1 },
            { text: "Indian", bucket: 1 },
          ],
          hint: "The continents are North America, South America, Europe, Asia, Africa, Australia and Antarctica. The oceans are the Pacific, Atlantic, Indian, Southern and Arctic.",
          mistakes: [
            { match: "Arctic sorted as continent", coach: "The Arctic is an icy ocean at the top of the world. Antarctica is the icy continent at the bottom." },
            { match: "Antarctica sorted as ocean", coach: "Antarctica is land covered in thick ice. It is a continent." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which continent do we live on?",
          choices: ["Africa", "Australia", "Europe", "North America"],
          answer: 3,
          why: "The United States is on the continent of North America.",
          hints: [
            "Africa is across the Atlantic Ocean, far to the east.",
            "Australia is far away, across the Pacific Ocean.",
            "Europe is across the Atlantic Ocean.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Think of Earth like a giant bathtub. 🛁 The water is the oceans, and the seven continents are like big islands of land floating up out of the water.",
          example:
            "Spin a globe and stop it with your finger. Most of the time, your finger lands on blue. That's because most of Earth is covered by ocean water!",
          simpler: {
            q: "Is an ocean land or water?",
            choices: ["Land", "Water"],
            answer: 1,
            why: "An ocean is a huge body of salt water.",
            hints: ["Land is a continent. An ocean is something you could swim in.", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every sentence that is TRUE.",
      sentences: [
        "🧭 North is at the top of most maps.",
        "🌍 Earth has seven continents.",
        "🌊 The Atlantic is the biggest ocean.",
        "🔑 The map key tells what the symbols mean.",
        "🦁 We live in Africa.",
        "💧 An ocean is a huge body of salt water.",
      ],
      correct: [0, 1, 3, 5],
    },
    explain: {
      prompt: "Pretend you are a map guide. Tell a grown-up how to read a map, and name some continents and oceans.",
      keyPoints: [
        "The map key tells what the symbols mean",
        "The compass rose shows north, south, east and west",
        "North is usually at the top of the map",
        "Earth has seven continents and five oceans",
        "We live in North America",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🌍 How many continents does Earth have?",
        answer: 7,
        unit: "continents",
        hint: "Count them: North America, South America, Europe, Asia, Africa, Australia, Antarctica.",
        mistakes: [{ match: "5", coach: "5 is the number of oceans. Count the big pieces of land instead." }],
        seconds: 15,
      },
      {
        type: "sequence",
        prompt: "Start at the top of the compass rose and go around to the right. Put the directions in order.",
        steps: ["⬆️ North", "➡️ East", "⬇️ South", "⬅️ West"],
        hint: "Never Eat Soggy Waffles!",
        mistakes: [{ match: "South second", coach: "Going around to the right from the top, you reach east before south." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "We live on the continent of {0}. The ocean to our west is the {1} Ocean. The biggest continent is {2}.",
        blanks: [{ answers: ["North America"] }, { answers: ["Pacific"] }, { answers: ["Asia"] }],
        bank: ["North America", "Pacific", "Asia", "Africa", "Arctic"],
        hint: "The United States sits between the Atlantic Ocean in the east and the Pacific Ocean in the west.",
        mistakes: [
          { match: "Africa", coach: "Africa is across the Atlantic Ocean. We live in North America." },
          { match: "Arctic", coach: "The Arctic Ocean is far up north. The big ocean to our west is the Pacific." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each direction to its arrow.",
        pairs: [
          { left: "North", right: "⬆️" },
          { left: "South", right: "⬇️" },
          { left: "East", right: "➡️" },
          { left: "West", right: "⬅️" },
        ],
        hint: "North is up, south is down, east is right, west is left.",
        mistakes: [{ match: "Mixed up east and west", coach: "East is on the right. West is on the left." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What does a compass rose show?",
        choices: ["What the symbols mean", "Directions", "How old the map is"],
        answer: 1,
        why: "A compass rose shows north, south, east and west.",
      },
      {
        q: "How many oceans does Earth have?",
        choices: ["Two", "Seven", "Five"],
        answer: 2,
        why: "The five oceans are the Pacific, Atlantic, Indian, Southern and Arctic.",
      },
      {
        q: "Which is the biggest ocean?",
        choices: ["Pacific", "Arctic", "Indian"],
        answer: 0,
        why: "The Pacific Ocean is the biggest ocean on Earth.",
      },
      {
        q: "On most maps, where is south?",
        choices: ["At the top", "On the right", "On the left", "At the bottom"],
        answer: 3,
        why: "North is at the top, so south is at the bottom.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, draw a map of your kitchen or bedroom from above. Add a map key with 3 symbols and a compass rose. Then look at a globe or world map together. Point to the seven continents and find where you live.",
      rubric: [
        "Map is drawn from above",
        "Map key shows at least 3 symbols",
        "Compass rose shows north, south, east and west",
        "Points to North America and where the family lives",
      ],
    },
  },

  // 3. Producers, consumers, goods and services
  {
    id: "soc-2.producers",
    title: "Producers, Consumers, Goods and Services",
    minutes: 20,
    stage: "grammar",
    standards: ["SS.2.2", "SS.2.3", "D2.Eco.3.K-2", "D2.Eco.4.K-2", "D2.Eco.6.K-2"],
    read: [
      "A producer is someone who makes things or does work for others. A consumer is someone who buys and uses things. You are a consumer when you eat an apple or get a haircut.",
      "Producers make goods or give services. Goods are things you can touch, like bread, shoes and toys. Services are jobs people do for you, like cutting hair, fixing teeth or teaching.",
      "People work to earn money. The money you earn from work is called income. A baker earns income by selling bread. Then the baker uses that money to buy things from other producers. So the baker is a producer and a consumer too!",
      "Some goods are made right in our town. Others come from far away, by truck, train, ship or plane. Every job needs skills. A baker learns to bake. A dentist goes to school for many years. Every worker helps the community.",
    ].join("\n\n"),
    keyIdeas: [
      "Producers make goods or give services. Consumers buy and use them.",
      "Goods are things you can touch. Services are jobs people do for you.",
      "People work at jobs to earn money, called income.",
    ],
    hook: {
      text: "Mmm, smell that fresh bread! 🍞 The baker made it early this morning. Now a family is buying it. Who is the producer, and who is the consumer?",
    },
    teach: [
      {
        title: "Producers and Consumers",
        teach:
          "A producer makes things or does work for others. 🧑‍🍳 The baker is a producer. She makes bread. A consumer buys and uses things. 🛒 The family who buys the bread are consumers. You are a consumer too! You use food, clothes and books. Here is a surprise. The baker buys flour and eggs. So the baker is a consumer too!",
        visual: {
          type: "compare",
          left: { title: "🧑‍🍳 Producer", points: ["Makes goods", "Or gives a service", "Sells to others", "Earns money"] },
          right: { title: "🛒 Consumer", points: ["Buys goods", "Or pays for a service", "Uses what they buy", "Spends money"] },
        },
        probe: {
          type: "sort",
          prompt: "Is this person being a producer or a consumer? Sort them.",
          buckets: ["🧑‍🍳 Producer (makes or does)", "🛒 Consumer (buys or uses)"],
          items: [
            { text: "🧑‍🌾 A farmer grows apples", bucket: 0 },
            { text: "🧑‍🍳 A baker bakes bread", bucket: 0 },
            { text: "🪚 A carpenter builds a table", bucket: 0 },
            { text: "🍎 A boy eats an apple", bucket: 1 },
            { text: "🛒 A dad buys a loaf of bread", bucket: 1 },
            { text: "🪑 A family buys a table", bucket: 1 },
          ],
          hint: "Producers make or do. Consumers buy or use.",
          mistakes: [
            { match: "Farmer sorted as consumer", coach: "The farmer grows the apples. Making something means being a producer." },
            { match: "Boy sorted as producer", coach: "The boy is eating the apple, not growing it. Using something makes him a consumer." },
          ],
          seconds: 35,
        },
        think: {
          q: "A girl buys a new pair of shoes. What is she?",
          choices: ["A producer", "A consumer", "A shoemaker"],
          answer: 1,
          why: "She is buying and using the shoes, so she is a consumer.",
          hints: [
            "A producer makes the shoes. She is buying them.",
            "",
            "A shoemaker makes shoes. She is the one buying them.",
          ],
        },
        approaches: {
          analogy:
            "Producers and consumers are like a pitcher and a catcher. 🥎 The producer throws out something useful. The consumer catches it and uses it.",
          example:
            "A beekeeper collects honey and puts it in jars. 🍯 She is a producer. Grandma buys a jar for her tea. Grandma is a consumer.",
          simpler: {
            q: "Someone who makes things is a...",
            choices: ["consumer", "producer"],
            answer: 1,
            why: "Producers produce, which means they make things.",
            hints: ["A consumer buys and uses things. Who makes them?", ""],
          },
        },
      },
      {
        title: "Goods and Services",
        teach:
          "Producers make goods or give services. Goods are things you can touch. 🍎👟🧸 Apples, shoes and toys are goods. Services are jobs people do for you. ✂️ A barber cuts your hair. That is a service. A dentist checks your teeth. 🦷 A mail carrier brings letters. 📬 You can't hold a haircut in your hand. But it is still something you pay for!",
        visual: {
          type: "flip",
          cards: [
            { front: "📦 Goods", back: "Things you can touch, like bread, shoes and toys." },
            { front: "🛎️ Services", back: "Jobs people do for you, like cutting hair or fixing a car." },
            { front: "🍞 Bread", back: "A good. You can hold it and eat it." },
            { front: "✂️ A haircut", back: "A service. Someone does the job for you." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Good or service? Sort each one.",
          buckets: ["📦 Good (you can touch it)", "🛎️ Service (a job done for you)"],
          items: [
            { text: "🧸 A teddy bear", bucket: 0 },
            { text: "👟 Sneakers", bucket: 0 },
            { text: "🥕 Carrots", bucket: 0 },
            { text: "✂️ A haircut", bucket: 1 },
            { text: "🦷 A teeth cleaning", bucket: 1 },
            { text: "🚒 Putting out a fire", bucket: 1 },
          ],
          hint: "Can you hold it in your hands? Then it's a good. Is it a job someone does for you? Then it's a service.",
          mistakes: [
            { match: "Haircut sorted as good", coach: "You can touch your hair, but the haircut is a job the barber does for you. That's a service." },
            { match: "Carrots sorted as service", coach: "You can hold carrots and eat them. They are goods." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which one is a service?",
          choices: ["A ball", "A sandwich", "A vet checking a sick puppy"],
          answer: 2,
          why: "The vet is doing a job for you. That is a service.",
          hints: [
            "You can hold a ball. Things you can touch are goods.",
            "You can hold and eat a sandwich. It's a good.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Goods go in a shopping bag. 🛍️ Services can't go in a bag. They are help that someone gives you.",
          example:
            "At the car shop, you buy new windshield wipers. Those are goods. Then the mechanic puts them on the car for you. That is a service.",
          simpler: {
            q: "Can you hold a good in your hands?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Goods are things you can touch and hold.",
            hints: ["", "Goods are things like toys and food. You can hold those!"],
          },
        },
      },
      {
        title: "Working to Earn Money",
        teach:
          "Why do people work? To earn money! 💵 The money you earn is called income. A baker earns income by selling bread. A teacher earns income for teaching. Every job needs skills. A baker learns to bake. A pilot practices flying for a long time. ✈️ Then workers use their income to buy goods and services. Money goes round and round in a community. 🔄",
        visual: {
          type: "hotspots",
          title: "Jobs and the skills they need",
          center: "💼 Jobs",
          spots: [
            { label: "Baker", icon: "🧑‍🍳", detail: "Makes goods: bread and pies. Needs to measure, mix and bake." },
            { label: "Farmer", icon: "🧑‍🌾", detail: "Makes goods: food. Needs to know about soil, plants and weather." },
            { label: "Dentist", icon: "🦷", detail: "Gives a service: healthy teeth. Goes to school for many years." },
            { label: "Mail carrier", icon: "📬", detail: "Gives a service: brings letters and packages. Needs to know every street." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Follow the money! Put the baker's story in order.",
          steps: [
            "📚 The baker learns how to bake",
            "🍞 The baker bakes fresh bread",
            "💵 A family pays the baker for bread",
            "👟 The baker uses that money to buy new shoes",
          ],
          hint: "First the baker needs a skill. Then she makes something, sells it, and spends the money.",
          mistakes: [
            { match: "Shoes before the family pays", coach: "The baker needs to earn the money first before she can spend it." },
          ],
          seconds: 30,
        },
        think: {
          q: "What is income?",
          choices: ["Money you earn from work", "A kind of bread", "A place to buy shoes"],
          answer: 0,
          why: "Income is the money people earn from their jobs.",
          hints: [
            "",
            "Bread is a good the baker makes. Income is what she earns when she sells it.",
            "A shoe store is a place. Income is money you earn.",
          ],
        },
        approaches: {
          analogy:
            "Money in a community is like a ball passed around a circle. 🔄 The family pays the baker, the baker pays the farmer, and the farmer pays the shoe store.",
          example:
            "A teen mows 3 lawns on Saturday. Each neighbor pays $10. The teen earned $30 of income for doing a service. Then the teen buys a book. Now the teen is a consumer.",
          simpler: {
            q: "Why do most grown-ups go to work?",
            choices: ["To earn money", "To take a nap"],
            answer: 0,
            why: "People work to earn money so they can buy what they need.",
            hints: ["", "Naps are nice, but people go to work to earn money."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap each sentence that tells about a SERVICE.",
      sentences: [
        "🐶 A vet checks a sick dog.",
        "🧥 Mom buys a new coat.",
        "⚽ A coach teaches kids soccer.",
        "🥚 A farmer sells a carton of eggs.",
        "🔧 A plumber fixes a leaky sink.",
        "🍎 Grandpa buys a bag of apples.",
      ],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Tell a grown-up the difference between a producer and a consumer, and between goods and services.",
      keyPoints: [
        "A producer makes goods or gives services",
        "A consumer buys and uses goods and services",
        "Goods are things you can touch",
        "Services are jobs people do for you",
        "People work to earn money called income",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each worker to what they produce.",
        pairs: [
          { left: "🧑‍🌾 Farmer", right: "🌽 corn" },
          { left: "🧑‍🍳 Baker", right: "🥧 pies" },
          { left: "💈 Barber", right: "✂️ haircuts" },
          { left: "🧑‍🏫 Teacher", right: "📚 lessons" },
        ],
        hint: "Think about what each worker makes or does all day.",
        mistakes: [{ match: "Mixed up baker and farmer", coach: "The farmer grows corn in a field. The baker bakes pies in an oven." }],
        seconds: 30,
      },
      {
        type: "cloze",
        text: "A {0} makes goods or gives services. A {1} buys and uses them. Money you earn from work is called {2}.",
        blanks: [{ answers: ["producer"] }, { answers: ["consumer"] }, { answers: ["income"] }],
        bank: ["producer", "consumer", "income", "compass", "continent"],
        hint: "Producers produce. Consumers consume, which means use.",
        mistakes: [
          { match: "compass", coach: "A compass is for directions on a map. This is about making and buying." },
          { match: "continent", coach: "A continent is a big piece of land. Look for the money words." },
        ],
        seconds: 35,
      },
      {
        type: "number",
        prompt: "🧑‍🍳 The baker sells a loaf of bread for $4 and a pie for $9. How many dollars of income did she earn?",
        answer: 13,
        unit: "dollars",
        hint: "Add the two prices together: 4 + 9.",
        mistakes: [{ match: "5", coach: "That's 9 minus 4. She earned money for both, so add them." }],
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Good or service?",
        buckets: ["📦 Good", "🛎️ Service"],
        items: [
          { text: "📕 A book", bucket: 0 },
          { text: "🚲 A bike", bucket: 0 },
          { text: "🔧 Fixing a flat bike tire", bucket: 1 },
          { text: "📚 Teaching a class", bucket: 1 },
        ],
        hint: "Goods you can hold. Services are jobs done for you.",
        mistakes: [{ match: "Fixing a tire sorted as good", coach: "The bike is a good, but fixing it is a job someone does. That's a service." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which one is a good?",
        choices: ["A haircut", "A pair of mittens", "A doctor's checkup"],
        answer: 1,
        why: "Mittens are things you can touch, so they are goods.",
      },
      {
        q: "A boy buys a juice box at the store. He is a...",
        choices: ["consumer", "producer", "farmer"],
        answer: 0,
        why: "He is buying and using the juice, so he is a consumer.",
      },
      {
        q: "What do we call money people earn from working?",
        choices: ["A service", "A map key", "Income"],
        answer: 2,
        why: "Income is money earned from work.",
      },
      {
        q: "A firefighter puts out a fire. What is that?",
        choices: ["A good", "A continent", "A toy", "A service"],
        answer: 3,
        why: "Putting out fires is a job done for the community, so it's a service.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Go to a store or market with a grown-up. Find 3 goods and look at their prices. Then find 1 service someone is doing, like a cashier helping people. Tell your grown-up who the producers and consumers are.",
      rubric: [
        "Names 3 goods and their prices",
        "Names 1 service",
        "Tells who is a producer and who is a consumer",
      ],
    },
  },

  // 4. Saving and spending
  {
    id: "soc-2.saving",
    title: "Saving and Spending",
    minutes: 20,
    stage: "logic",
    standards: ["SS.2.4", "SS.2.5", "D2.Eco.1.K-2", "D2.Eco.2.K-2", "D2.Eco.5.K-2"],
    read: [
      "Money can be spent or saved. When you spend money, you trade it for something now. When you save money, you keep it for later.",
      "We can't have everything we want. Money runs out, and so does time. This is called scarcity. So we must make choices. When you choose one thing, you give up the other. The thing you give up is the cost of your choice.",
      "Saving helps you get bigger things. Say a kite costs $10, and you earn $2 each week. If you save it all, you can buy the kite in 5 weeks!",
      "A plan helps. Many families use three jars: one to spend, one to save and one to share. Put some money in each jar. Wait for the things you really want. Saving takes patience, but it feels great when you reach your goal!",
    ].join("\n\n"),
    keyIdeas: [
      "Spending trades money for something now. Saving keeps money for later.",
      "We can't have everything, so we make choices. What we give up is the cost.",
      "A savings plan with a goal helps you buy bigger things.",
    ],
    hook: {
      text: "You have $5. 💵 A big kite costs $10. 🪁 Can you buy it today? Not yet, but saving can help!",
    },
    teach: [
      {
        title: "Spend or Save?",
        teach:
          "You can do two things with money. You can spend it. 🛍️ That means you trade it for something now. Or you can save it. 🐷 That means you keep it for later. A piggy bank is a good place to save. A bank is too! 🏦 A bank keeps money safe. Spending is fun now. Saving is fun later!",
        visual: {
          type: "compare",
          left: { title: "🛍️ Spend", points: ["Trade money for something", "You get it now", "The money is gone"] },
          right: { title: "🐷 Save", points: ["Keep money for later", "It adds up over time", "You can buy bigger things"] },
        },
        probe: {
          type: "sort",
          prompt: "Spending or saving? Sort each one.",
          buckets: ["🛍️ Spending", "🐷 Saving"],
          items: [
            { text: "🍦 Buys an ice cream cone", bucket: 0 },
            { text: "🎮 Buys a game today", bucket: 0 },
            { text: "🍿 Buys popcorn at the movies", bucket: 0 },
            { text: "🐷 Drops coins in a piggy bank", bucket: 1 },
            { text: "🏦 Puts birthday money in the bank", bucket: 1 },
            { text: "🫙 Keeps $1 a week in a jar for a bike", bucket: 1 },
          ],
          hint: "Spending means you get something now. Saving means you keep the money for later.",
          mistakes: [
            { match: "Bank sorted as spending", coach: "Putting money in the bank keeps it safe for later. That's saving." },
            { match: "Popcorn sorted as saving", coach: "Buying popcorn trades your money for a snack right now. That's spending." },
          ],
          seconds: 30,
        },
        think: {
          q: "Mia puts her $3 in her piggy bank. What is she doing?",
          choices: ["Spending", "Saving", "Selling"],
          answer: 1,
          why: "She keeps the money for later, so she is saving.",
          hints: [
            "Spending means trading money for something. Mia still has her money.",
            "",
            "Selling means giving away a thing for money. Mia is keeping her money.",
          ],
        },
        approaches: {
          analogy:
            "Saving is like planting a seed. 🌱 You don't eat the seed today. You wait, and later it grows into something bigger.",
          example:
            "Sam gets $2. He could buy a pack of gum now. Instead he saves it. Next week he gets $2 more. Now he has $4, enough for a cool ball.",
          simpler: {
            q: "Where can you save money?",
            choices: ["In a piggy bank", "In a candy shop"],
            answer: 0,
            why: "A piggy bank keeps your money for later.",
            hints: ["", "In a candy shop, money gets spent, not saved."],
          },
        },
      },
      {
        title: "Choices and Scarcity",
        teach:
          "We can't have everything we want. 🙅 There is only so much money and time. That is called scarcity. So we make choices. Say you have $3. You can buy a book or a ball. Not both! If you pick the book, you give up the ball. ⚽ The thing you give up is the cost of your choice. Think before you choose! 🤔",
        visual: {
          type: "flip",
          cards: [
            { front: "🙅 Scarcity", back: "There is not enough money or time for everything we want." },
            { front: "🤔 Choice", back: "Picking one thing instead of another." },
            { front: "⚖️ Cost", back: "The thing you give up when you make a choice." },
            { front: "🎯 Goal", back: "Something you want and plan to save for." },
          ],
        },
        probe: {
          type: "cloze",
          text: "We can't have everything, so we make {0}. Not having enough for everything is called {1}. The thing you give up is the {2} of your choice.",
          blanks: [{ answers: ["choices"] }, { answers: ["scarcity"] }, { answers: ["cost"] }],
          bank: ["choices", "scarcity", "cost", "maps", "oceans"],
          hint: "Scarcity means not enough. When there's not enough, we choose, and what we give up is the cost.",
          mistakes: [
            { match: "maps", coach: "Maps help us find places. This is about money and choosing." },
            { match: "oceans", coach: "Oceans are big bodies of water. Look for a money word." },
          ],
          seconds: 35,
        },
        think: {
          q: "You have time to play soccer OR go swimming, not both. You pick soccer. What did you give up?",
          choices: ["Soccer", "Swimming", "Nothing"],
          answer: 1,
          why: "You gave up swimming. That is the cost of choosing soccer.",
          hints: [
            "Soccer is what you picked. What didn't you get to do?",
            "",
            "Every choice gives something up. You only had time for one.",
          ],
        },
        approaches: {
          analogy:
            "Choosing is like a fork in a trail. 🥾 You can go left or right, but not both. The path you don't take is the cost.",
          example:
            "Lily has $5. A puzzle costs $5 and a stuffed bunny costs $5. She buys the puzzle. She can't buy the bunny too. The bunny is the cost of her choice.",
          simpler: {
            q: "Can we always have everything we want?",
            choices: ["Yes, always", "No, so we make choices"],
            answer: 1,
            why: "Money and time run out, so we must choose.",
            hints: ["Money and time run out. That means we can't get everything.", ""],
          },
        },
      },
      {
        title: "Making a Savings Plan",
        teach:
          "Saving works best with a plan. 📝 First, pick a goal. Say a kite costs $10. 🪁 Next, see how much you earn. Say you earn $2 each week for chores. Then save it every week. Week 1: $2. Week 2: $4. Week 3: $6. Week 4: $8. Week 5: $10! 🎉 You did it! Some families use three jars: spend, save and share. 🫙",
        visual: {
          type: "budget",
          income: 10,
          categories: [
            { label: "Save", pct: 50 },
            { label: "Spend", pct: 30 },
            { label: "Share", pct: 20 },
          ],
        },
        probe: {
          type: "place",
          prompt: "You save $2 every week. 🐷 Drag each marker to how many dollars you have.",
          min: 0,
          max: 12,
          step: 1,
          tolerance: 0,
          items: [
            { label: "After week 1", value: 2 },
            { label: "After week 3", value: 6 },
            { label: "After week 5", value: 10 },
          ],
          hint: "Count by 2s: week 1 is $2, week 2 is $4, week 3 is $6...",
          mistakes: [{ match: "Put week 3 at 3", coach: "You save $2 each week, not $1. Count by 2s: 2, 4, 6." }],
          seconds: 35,
        },
        think: {
          q: "A ball costs $6. You save $2 each week. How many weeks until you can buy it?",
          choices: ["2 weeks", "6 weeks", "3 weeks"],
          answer: 2,
          why: "Count by 2s: $2, $4, $6. That's 3 weeks.",
          hints: [
            "After 2 weeks you have $4. That's not enough yet.",
            "After 6 weeks you'd have $12. You can buy it sooner!",
            "",
          ],
        },
        approaches: {
          analogy:
            "A savings plan is like climbing stairs. 🪜 Each week you save, you go up one step. When you reach the top, you get your goal!",
          example:
            "Ava wants a $8 book. She earns $2 a week feeding the cat. Week 1: $2. Week 2: $4. Week 3: $6. Week 4: $8. In 4 weeks she buys the book!",
          simpler: {
            q: "What is the first step of a savings plan?",
            choices: ["Pick a goal", "Spend all your money"],
            answer: 0,
            why: "You need to know what you are saving for.",
            hints: ["", "If you spend it all, there's nothing left to save!"],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps of a savings plan in order.",
      steps: [
        "🎯 Pick a goal: a $10 kite",
        "🧹 Earn $2 by doing chores",
        "🐷 Put the $2 in your save jar",
        "🔁 Do it again every week",
        "🪁 Buy the kite after 5 weeks",
      ],
    },
    explain: {
      prompt: "Tell a grown-up the difference between saving and spending. Why do we have to make choices?",
      keyPoints: [
        "Spending trades money for something now",
        "Saving keeps money for later",
        "We can't have everything, so we make choices",
        "What you give up is the cost of your choice",
        "A plan with a goal helps you save",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "📕 A book costs $8. You save $2 each week. How many weeks until you can buy it?",
        answer: 4,
        unit: "weeks",
        hint: "Count by 2s until you reach 8: 2, 4, 6, 8. How many numbers did you say?",
        mistakes: [
          { match: "8", coach: "8 is the price. Count by 2s to find how many weeks it takes." },
          { match: "16", coach: "That's too many weeks. Count by 2s: 2, 4, 6, 8. That's 4 weeks." },
        ],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Spend now or save for later?",
        buckets: ["🛍️ Spend", "🐷 Save"],
        items: [
          { text: "🍭 Buys a lollipop", bucket: 0 },
          { text: "🧃 Buys a juice box", bucket: 0 },
          { text: "🫙 Puts $2 in the save jar", bucket: 1 },
          { text: "🏦 Puts $5 in the bank", bucket: 1 },
        ],
        hint: "Spending gets you something now. Saving keeps the money.",
        mistakes: [{ match: "Save jar sorted as spend", coach: "Money in the save jar stays there for later. That's saving." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "Keeping money for later is called {0}. Trading money for something now is called {1}.",
        blanks: [{ answers: ["saving"] }, { answers: ["spending"] }],
        bank: ["saving", "spending", "voting", "mapping"],
        hint: "Save means keep. Spend means trade it away.",
        mistakes: [{ match: "voting", coach: "Voting is how we choose leaders. This is about money." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build a sentence about choices.",
        tiles: ["We can't have", "everything we want,", "so we", "make choices."],
        distractors: ["buy it all."],
        hint: "Scarcity means we can't have it all.",
        mistakes: [{ match: "Used 'buy it all.'", coach: "We can't buy it all. Money runs out, so we choose." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does saving mean?",
        choices: ["Spending all your money", "Keeping money for later", "Giving money away"],
        answer: 1,
        why: "Saving means keeping money for later.",
      },
      {
        q: "You pick a puzzle instead of a ball. What is the cost of your choice?",
        choices: ["The ball", "The puzzle", "Nothing"],
        answer: 0,
        why: "The cost is what you give up: the ball.",
      },
      {
        q: "What is scarcity?",
        choices: ["Having a lot of toys", "A kind of bank", "Not having enough for everything we want"],
        answer: 2,
        why: "Scarcity means we can't have everything, so we make choices.",
      },
      {
        q: "A toy costs $10. You save $5 each week. How many weeks until you can buy it?",
        choices: ["1 week", "5 weeks", "10 weeks", "2 weeks"],
        answer: 3,
        why: "$5 + $5 = $10, so it takes 2 weeks.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a grown-up, make three jars: Spend, Save and Share. Pick a savings goal and find its price in a store or ad. Draw the goal on your Save jar. Make a plan: how much will you save each week, and how many weeks will it take?",
      rubric: [
        "Makes three jars: spend, save and share",
        "Picks a goal and finds its price",
        "Plans how much to save each week",
        "Figures out how many weeks it will take",
      ],
    },
  },

  // 5. Good citizens and voting
  {
    id: "soc-2.citizens",
    title: "Good Citizens and Voting",
    minutes: 20,
    stage: "logic",
    standards: [
      "SS.2.8",
      "SS.2.9",
      "D2.Civ.1.K-2",
      "D2.Civ.3.K-2",
      "D2.Civ.5.K-2",
      "D2.Civ.7.K-2",
      "D2.Civ.8.K-2",
      "D2.Civ.11.K-2",
    ],
    read: [
      "A citizen is a member of a community and a country. Good citizens follow rules and laws. They are honest, kind and helpful. They take care of their community, like picking up litter.",
      "Rules keep us safe and fair. At home, a rule might be to wash your hands. Laws are rules for everyone in a town, state or country. A law might say to stop at a red light. The government is the group of leaders who make laws. It also runs things we all share, like roads, parks and schools. Police officers help keep us safe.",
      "How do we pick leaders? We vote! Each person gets one vote. The choice with the most votes wins. This is called majority rule. In the United States, citizens who are 18 or older can vote. Every four years, they vote for a President. Voting is a big responsibility.",
    ].join("\n\n"),
    keyIdeas: [
      "Good citizens are honest, kind and helpful, and follow rules and laws.",
      "Rules and laws keep us safe and help us be fair.",
      "When we vote, each person gets one vote and the choice with the most votes wins.",
    ],
    hook: {
      text: "Your class must pick a class pet. 🐹 Some kids want a hamster. Some want a fish. 🐠 How can you choose fairly?",
    },
    teach: [
      {
        title: "What Good Citizens Do",
        teach:
          "A citizen is a member of a community. You are a citizen! Good citizens are honest. They tell the truth. They are kind and helpful. 🤝 They take turns and share. They take care of their community. They pick up litter and help neighbors. 🧹 They also take responsibility. That means doing your part, like finishing your chores.",
        visual: {
          type: "hotspots",
          title: "A good citizen is...",
          center: "⭐ Good citizen",
          spots: [
            { label: "Honest", icon: "🗣️", detail: "Tells the truth, even after a mistake." },
            { label: "Kind", icon: "💛", detail: "Treats others the way they want to be treated." },
            { label: "Helpful", icon: "🤝", detail: "Helps neighbors, family and friends." },
            { label: "Responsible", icon: "✅", detail: "Does their part, like chores and homework." },
            { label: "Fair", icon: "⚖️", detail: "Takes turns, shares and follows the rules." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is this kid being a good citizen? Sort each one.",
          buckets: ["⭐ Good citizen", "🚫 Not a good citizen"],
          items: [
            { text: "🗑️ Picks up litter at the park", bucket: 0 },
            { text: "🤝 Helps a neighbor carry bags", bucket: 0 },
            { text: "🗣️ Tells the truth after breaking a cup", bucket: 0 },
            { text: "🧸 Grabs a toy without asking", bucket: 1 },
            { text: "🍬 Drops a wrapper on the ground", bucket: 1 },
            { text: "🏃 Cuts in front of the line", bucket: 1 },
          ],
          hint: "Good citizens are honest, kind, fair and helpful.",
          mistakes: [
            { match: "Cutting in line sorted as good", coach: "Cutting in line isn't fair to the people waiting. Good citizens take turns." },
            { match: "Telling the truth sorted as not good", coach: "Telling the truth after a mistake is honest and brave. That's a good citizen!" },
          ],
          seconds: 30,
        },
        think: {
          q: "Which one shows a good citizen?",
          choices: ["Leaving trash on the playground", "Helping a friend who fell down", "Skipping your chores"],
          answer: 1,
          why: "Helping others is what good citizens do.",
          hints: [
            "Leaving trash makes the playground messy for everyone.",
            "",
            "Skipping chores means not doing your part.",
          ],
        },
        approaches: {
          analogy:
            "A community is like a team. ⚽ Every player has to do their part and play fair, or the whole team has a hard time.",
          example:
            "On the way to the park, Leo sees a candy wrapper on the sidewalk. He picks it up and throws it in the trash can. Leo is being a good citizen.",
          simpler: {
            q: "Is telling the truth part of being a good citizen?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Good citizens are honest.",
            hints: ["", "Being honest is one of the most important things a citizen does."],
          },
        },
      },
      {
        title: "Rules and Laws",
        teach:
          "Rules help us stay safe and be fair. 🦺 At home, a rule might be: wash your hands. At school: raise your hand to talk. ✋ Laws are rules for a whole town, state or country. Stop at a red light. 🚦 Wear a seatbelt. Leaders in the government make laws. Government also runs parks, roads and schools. Police officers help keep us safe. 👮",
        visual: {
          type: "compare",
          left: { title: "🏠 Rules", points: ["For a home, school or game", "Made by parents, teachers or a group", "Example: raise your hand to talk"] },
          right: { title: "🏛️ Laws", points: ["For a whole town, state or country", "Made by leaders in the government", "Example: stop at a red light"] },
        },
        probe: {
          type: "match",
          prompt: "Why do we have each rule? Match the rule to its reason.",
          pairs: [
            { left: "🚦 Stop at a red light", right: "so cars don't crash" },
            { left: "🧼 Wash your hands", right: "so germs don't spread" },
            { left: "✋ Raise your hand", right: "so everyone gets a turn to talk" },
            { left: "🪖 Wear a bike helmet", right: "to protect your head" },
          ],
          hint: "Every rule keeps someone safe or helps things be fair. Think about what could go wrong without it.",
          mistakes: [{ match: "Mixed up hands and helmet", coach: "Soap washes germs off your hands. A helmet protects your head." }],
          seconds: 35,
        },
        think: {
          q: "Why do we have laws?",
          choices: ["To make life boring", "To keep people safe and be fair", "So nobody can have fun"],
          answer: 1,
          why: "Laws keep everyone safe and help us treat each other fairly.",
          hints: [
            "Laws aren't there to be boring. Think about a red light at a busy corner.",
            "",
            "You can still have fun with laws! They keep us safe while we play.",
          ],
        },
        approaches: {
          analogy:
            "Rules are like the lines on a soccer field. ⚽ Without them, nobody would know where to play, and the game would be a mess.",
          example:
            "At a busy corner, the light turns red. Every car stops. The kids on the sidewalk cross safely. That traffic law kept them safe.",
          simpler: {
            q: "Laws are rules for...",
            choices: ["just one family", "a whole town, state or country"],
            answer: 1,
            why: "Laws are rules everyone in a place must follow.",
            hints: ["A family has its own rules. Laws are for everyone in a place.", ""],
          },
        },
      },
      {
        title: "Voting",
        teach:
          "How does a group choose fairly? We vote! 🗳️ Each person gets one vote. Then we count the votes. The choice with the most votes wins. That is called majority rule. Say 7 kids vote for a hamster and 4 vote for a fish. 🐹 The hamster wins! In our country, citizens 18 and older vote for leaders. They vote for a President every four years.",
        visual: {
          type: "flip",
          cards: [
            { front: "🗳️ Vote", back: "Telling your choice so the group can decide. Each person gets one vote." },
            { front: "📝 Ballot", back: "The paper or card where you mark your vote." },
            { front: "🏆 Majority", back: "More than half. The choice with the most votes wins." },
            { front: "🇺🇸 President", back: "The leader of our country. Citizens vote for one every four years." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Class pet vote! 🐹 Hamster got 7 votes. 🐠 Fish got 4 votes. How many kids voted in all?",
          answer: 11,
          unit: "kids",
          hint: "Each kid voted once. Add the hamster votes and the fish votes.",
          mistakes: [{ match: "3", coach: "That's how many MORE votes the hamster got. Add to find everyone who voted." }],
          seconds: 25,
        },
        think: {
          q: "In a vote, which choice wins?",
          choices: ["The one with the fewest votes", "The one the teacher likes", "The one with the most votes"],
          answer: 2,
          why: "Majority rule: the choice with the most votes wins.",
          hints: [
            "Fewest votes means the fewest people wanted it.",
            "In a fair vote, every person's vote counts the same.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Voting is like a tug-of-war with hands instead of ropes. ✋ Whichever side has more hands up wins.",
          example:
            "A family votes on dinner. 3 people vote for tacos. 2 people vote for pizza. Tacos got more votes, so tacos win!",
          simpler: {
            q: "How many votes does each person get?",
            choices: ["One", "Ten"],
            answer: 0,
            why: "In a fair vote, each person gets one vote.",
            hints: ["", "If one person had ten votes, it wouldn't be fair to everyone else."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "How does a class vote work? Put the steps in order.",
      steps: [
        "📋 Pick the choices: hamster or fish",
        "✋ Each kid votes one time",
        "🔢 Count the votes",
        "🏆 The choice with the most votes wins",
      ],
    },
    explain: {
      prompt: "Tell a grown-up what a good citizen does, and how voting works.",
      keyPoints: [
        "Good citizens are honest, kind and helpful",
        "Good citizens follow rules and laws",
        "Rules and laws keep us safe and fair",
        "Each person gets one vote",
        "The choice with the most votes wins",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Is it a home or school rule, or a law for everyone?",
        buckets: ["🏠 Home or school rule", "🏛️ Law for everyone"],
        items: [
          { text: "🛏️ Make your bed", bucket: 0 },
          { text: "✋ Raise your hand in class", bucket: 0 },
          { text: "🚦 Cars stop at red lights", bucket: 1 },
          { text: "🚗 Wear a seatbelt in the car", bucket: 1 },
        ],
        hint: "Laws are for everyone in a town, state or country. Rules can be just for a home or school.",
        mistakes: [{ match: "Red light sorted as home rule", coach: "Every driver in the country must stop at red lights. That's a law." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "In a vote, each person gets {0} vote. The choice with the {1} votes wins.",
        blanks: [{ answers: ["one", "1"] }, { answers: ["most"] }],
        bank: ["one", "most", "fewest", "ten"],
        hint: "A fair vote: one each, and the biggest number wins.",
        mistakes: [
          { match: "fewest", coach: "The fewest votes means the fewest people chose it. The most votes wins." },
          { match: "ten", coach: "Each person gets just one vote, so it's fair." },
        ],
        seconds: 25,
      },
      {
        type: "number",
        prompt: "🍕 Pizza party got 9 votes. 🎨 Art party got 5 votes. How many more votes did the pizza party get?",
        answer: 4,
        unit: "votes",
        hint: "Take away: 9 minus 5.",
        mistakes: [{ match: "14", coach: "That's how many voted in all. How many MORE votes is 9 than 5?" }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build a sentence about good citizens.",
        tiles: ["Good citizens", "follow rules", "and help", "others."],
        distractors: ["break rules"],
        hint: "What do good citizens do with rules?",
        mistakes: [{ match: "Used 'break rules'", coach: "Good citizens follow rules, they don't break them." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "Which one shows a good citizen?",
        choices: ["Telling a lie", "Pushing in line", "Throwing litter away in a trash can"],
        answer: 2,
        why: "Throwing litter away keeps the community clean.",
      },
      {
        q: "Who makes laws for a town, state or country?",
        choices: ["Leaders in the government", "Kids at recess", "Store workers"],
        answer: 0,
        why: "Leaders in the government make laws for everyone.",
      },
      {
        q: "A vote is 6 for apples and 8 for oranges. Which wins?",
        choices: ["Apples", "Oranges", "It's a tie"],
        answer: 1,
        why: "Oranges got more votes, so oranges win.",
      },
      {
        q: "How old must citizens be to vote for President?",
        choices: ["8 years old", "12 years old", "18 years old", "100 years old"],
        answer: 2,
        why: "In the United States, citizens who are 18 or older can vote.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Hold a family vote! Pick two choices, like which game to play or which park to visit. Everyone votes one time. Count the votes together, and the choice with the most votes wins. Then tell your family one way you will be a good citizen this week.",
      rubric: [
        "Sets up two choices",
        "Everyone votes once and the votes are counted",
        "Says which choice won and why",
        "Names one way to be a good citizen",
      ],
    },
  },

  // 6. Inventors who changed our lives
  {
    id: "soc-2.inventors",
    title: "Inventors Who Changed Our Lives",
    minutes: 20,
    stage: "rhetoric",
    standards: ["SS.2.10", "SS.2.11", "D2.His.1.K-2", "D2.His.2.K-2", "D2.His.3.K-2"],
    read: [
      "Long ago, life was very different. There were no electric lights, no cars and no airplanes. People read by candlelight. They traveled by horse or by boat.",
      "Benjamin Franklin lived in the 1700s. He was curious about lightning. In 1752, he did a famous kite test. It showed that lightning is electricity. He invented the lightning rod to keep buildings safe. He also helped start a library and a fire company in his city, Philadelphia.",
      "Thomas Edison worked in a lab in New Jersey. He tried thousands of ideas. In 1879, he made a light bulb that could glow for many hours. Soon homes could have electric light at night.",
      "Orville and Wilbur Wright fixed bicycles in Ohio. They dreamed of flying. They tested gliders again and again. On December 17, 1903, they flew the first airplane with an engine. The first flight lasted only 12 seconds!",
      "These inventors did not give up. Their hard work changed how we live today.",
    ].join("\n\n"),
    keyIdeas: [
      "Benjamin Franklin showed that lightning is electricity and invented the lightning rod.",
      "Thomas Edison made a long-lasting light bulb in 1879.",
      "The Wright brothers flew the first airplane with an engine in 1903.",
      "Inventors solve problems, keep trying and change how we live.",
    ],
    hook: {
      text: "Flip a switch, and the lights come on! 💡 Long ago, kids read by candlelight. 🕯️ So who changed that? Let's meet some amazing inventors!",
    },
    teach: [
      {
        title: "Benjamin Franklin",
        teach:
          "Benjamin Franklin lived long ago, in the 1700s. He was very curious. ⚡ He wondered: is lightning electricity? In 1752, he flew a kite in a storm to find out. It was a famous test, but very dangerous. Never try it! Then he invented the lightning rod. 🏠 It keeps buildings safe when lightning strikes. He also helped start a library for his city.",
        visual: {
          type: "flip",
          cards: [
            { front: "💡 Inventor", back: "Someone who makes something new to solve a problem." },
            { front: "🪁 The kite test", back: "In 1752, Franklin used a kite to show that lightning is electricity." },
            { front: "⚡ Lightning rod", back: "A metal rod on a roof. It carries lightning safely into the ground." },
            { front: "📚 A library", back: "Franklin helped start a library in Philadelphia so people could share books." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Ben Franklin flew a {0} to learn about lightning. He invented the lightning {1}. He also helped start a {2} for his city.",
          blanks: [{ answers: ["kite"] }, { answers: ["rod"] }, { answers: ["library"] }],
          bank: ["kite", "rod", "library", "airplane", "bulb"],
          hint: "Franklin's test used something that flies on a string. His invention sits on a roof.",
          mistakes: [
            { match: "airplane", coach: "Airplanes came much later, with the Wright brothers. Franklin used a kite." },
            { match: "bulb", coach: "The light bulb was Edison's work. Franklin invented the lightning rod." },
          ],
          seconds: 35,
        },
        think: {
          q: "What did Ben Franklin's kite test show?",
          choices: ["Kites can fly to the Moon", "Lightning is electricity", "Rain is warm"],
          answer: 1,
          why: "Franklin's kite test showed that lightning is a kind of electricity.",
          hints: [
            "Kites can't fly to the Moon! His test was about the storm.",
            "",
            "The test wasn't about rain. It was about the flash in the sky.",
          ],
        },
        approaches: {
          analogy:
            "A lightning rod is like a slide at the playground. 🛝 Lightning slides safely down the rod into the ground, instead of crashing into the house.",
          example:
            "Before lightning rods, lightning could start fires on roofs. After Franklin's invention, people put a metal rod on top of their buildings. When lightning hit, it went down into the ground, and the building stayed safe.",
          simpler: {
            q: "What did Franklin fly in his famous test?",
            choices: ["A kite", "A rocket"],
            answer: 0,
            why: "Franklin flew a kite in a storm.",
            hints: ["", "Rockets came much, much later. Franklin used something on a string."],
          },
        },
      },
      {
        title: "Thomas Edison",
        teach:
          "Thomas Edison was an inventor with a big lab. 🔬 He worked in New Jersey. He wanted a light bulb that would glow for a long time. He tried thousands of materials. Many did not work! But Edison kept going. In 1879, his bulb glowed for many hours. 💡 Soon homes and streets had electric lights. Edison also invented the phonograph, which recorded sound. 🎵",
        visual: {
          type: "compare",
          left: { title: "🕯️ Long ago", points: ["Candles and oil lamps", "Dark streets at night", "Riding horses", "Writing letters by hand"] },
          right: { title: "💡 Today", points: ["Electric lights", "Bright streets at night", "Cars and airplanes", "Phones and computers"] },
        },
        probe: {
          type: "sort",
          prompt: "Long ago or today? Sort each picture.",
          buckets: ["🕯️ Long ago", "💡 Today"],
          items: [
            { text: "🕯️ Reading by candlelight", bucket: 0 },
            { text: "🐴 Riding a horse to town", bucket: 0 },
            { text: "🪶 Writing with a feather pen", bucket: 0 },
            { text: "💡 Flipping on a lamp", bucket: 1 },
            { text: "✈️ Flying on an airplane", bucket: 1 },
            { text: "📱 Calling Grandma on a phone", bucket: 1 },
          ],
          hint: "Before Edison's light bulb and the Wright brothers' airplane, life was slower and darker at night.",
          mistakes: [
            { match: "Candlelight sorted as today", coach: "Long ago there were no electric lights, so people read by candles." },
            { match: "Airplane sorted as long ago", coach: "The first airplane flew in 1903. Long before that, people traveled by horse or boat." },
          ],
          seconds: 30,
        },
        think: {
          q: "What did Edison do when his ideas didn't work?",
          choices: ["He gave up", "He kept trying new ideas", "He went to sleep for a year"],
          answer: 1,
          why: "Edison tried thousands of materials until his bulb worked.",
          hints: [
            "If he gave up, we might not have had his light bulb!",
            "",
            "Edison worked very hard, often late into the night.",
          ],
        },
        approaches: {
          analogy:
            "Inventing is like learning to ride a bike. 🚲 You wobble and fall many times, but each try teaches you something, until one day you ride!",
          example:
            "Edison tested lots of materials inside his bulbs. Some burned out in minutes. He kept testing. In 1879, one glowed for many hours. His not giving up lit up the world.",
          simpler: {
            q: "What famous invention made light from electricity?",
            choices: ["The light bulb", "The candle"],
            answer: 0,
            why: "Edison's light bulb glows with electricity.",
            hints: ["", "Candles use fire, not electricity. They were around long before Edison."],
          },
        },
      },
      {
        title: "The Wright Brothers",
        teach:
          "Orville and Wilbur Wright were brothers. 👬 They fixed and sold bicycles in Dayton, Ohio. 🚲 They dreamed of flying. First they built gliders, airplanes with no engine. They tested and fixed them again and again. On December 17, 1903, they flew the first airplane with an engine. ✈️ The first flight lasted just 12 seconds! Today, planes fly people all over the world.",
        visual: {
          type: "timeline",
          events: [
            { year: 1706, label: "Benjamin Franklin is born", detail: "He was born in Boston and grew up to be a printer, inventor and leader." },
            { year: 1752, label: "Franklin's kite test", detail: "Franklin used a kite in a storm to show that lightning is electricity." },
            { year: 1847, label: "Thomas Edison is born", detail: "He was born in Ohio and became one of America's greatest inventors." },
            { year: 1879, label: "Edison's light bulb", detail: "Edison made a light bulb that glowed for many hours." },
            { year: 1903, label: "The first airplane flight", detail: "The Wright brothers flew the first airplane with an engine, near Kitty Hawk, North Carolina." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the Wright brothers' story in order.",
          steps: [
            "🚲 They fixed bicycles in Ohio",
            "💭 They dreamed of flying",
            "🪁 They built and tested gliders",
            "✈️ They flew the first airplane with an engine",
          ],
          hint: "They started with bikes and a dream. The big flight came last.",
          mistakes: [{ match: "Flight before gliders", coach: "They practiced with gliders first, then added an engine." }],
          seconds: 30,
        },
        think: {
          q: "What did the Wright brothers do in 1903?",
          choices: ["Made the first light bulb", "Flew the first airplane with an engine", "Flew a kite in a storm"],
          answer: 1,
          why: "On December 17, 1903, the Wright brothers flew the first airplane with an engine.",
          hints: [
            "The light bulb was Thomas Edison's work in 1879.",
            "",
            "The kite in a storm was Ben Franklin, long before.",
          ],
        },
        approaches: {
          analogy:
            "The Wright brothers built up to flying like you build a block tower. 🧱 First the bottom blocks, bikes and gliders, then the top: a plane with an engine.",
          example:
            "The brothers flew gliders on windy hills. When a glider tipped, they changed the wings and tried again. After many tries, they added an engine. On December 17, 1903, Orville flew for 12 seconds!",
          simpler: {
            q: "What did the Wright brothers fix in their shop?",
            choices: ["Bicycles", "Light bulbs"],
            answer: 0,
            why: "The Wright brothers had a bicycle shop in Dayton, Ohio.",
            hints: ["", "Light bulbs were Edison's work. The Wrights had a bike shop."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Who did it? Sort each one to the right inventor.",
      buckets: ["🪁 Ben Franklin", "💡 Thomas Edison", "✈️ Wright brothers"],
      items: [
        { text: "⚡ Invented the lightning rod", bucket: 0 },
        { text: "📚 Helped start a library", bucket: 0 },
        { text: "💡 Made a long-lasting light bulb", bucket: 1 },
        { text: "🎵 Invented the phonograph", bucket: 1 },
        { text: "🚲 Fixed bicycles in Ohio", bucket: 2 },
        { text: "✈️ Flew the first airplane with an engine", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pick one inventor. Tell a grown-up what problem they solved and how it changed life.",
      keyPoints: [
        "Names an inventor: Franklin, Edison or the Wright brothers",
        "Tells what they invented or discovered",
        "Tells how life was different before",
        "Inventors kept trying and did not give up",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Put each event on the timeline.",
        min: 1700,
        max: 2000,
        step: 1,
        tolerance: 10,
        items: [
          { label: "🪁 Franklin's kite test", value: 1752 },
          { label: "💡 Edison's light bulb", value: 1879 },
          { label: "✈️ First airplane flight", value: 1903 },
        ],
        hint: "Franklin came first, in the 1700s. Edison's bulb was 1879. The Wright brothers flew in 1903.",
        mistakes: [{ match: "Airplane before light bulb", coach: "Edison's bulb came in 1879. The airplane flew later, in 1903." }],
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each inventor to their invention.",
        pairs: [
          { left: "Ben Franklin", right: "⚡ lightning rod" },
          { left: "Thomas Edison", right: "💡 light bulb" },
          { left: "Wright brothers", right: "✈️ airplane" },
        ],
        hint: "Franklin studied lightning. Edison made light. The Wrights flew.",
        mistakes: [{ match: "Mixed up Franklin and Edison", coach: "Both worked with electricity! Franklin studied lightning, and Edison made the light bulb." }],
        seconds: 20,
      },
      {
        type: "number",
        prompt: "✈️ The first flight lasted 12 seconds. Later that same day, Wilbur flew for 59 seconds. How many seconds longer was Wilbur's flight?",
        answer: 47,
        unit: "seconds",
        hint: "Subtract: 59 minus 12.",
        mistakes: [{ match: "71", coach: "That's 59 plus 12. To find how much longer, subtract." }],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build a sentence about inventors.",
        tiles: ["Inventors", "solve problems", "and keep trying."],
        distractors: ["give up fast."],
        hint: "What did Edison and the Wright brothers do when things didn't work?",
        mistakes: [{ match: "Used 'give up fast.'", coach: "Great inventors don't give up! They keep trying." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "Who invented the lightning rod?",
        choices: ["Thomas Edison", "Orville Wright", "Benjamin Franklin"],
        answer: 2,
        why: "Benjamin Franklin invented the lightning rod after studying lightning.",
      },
      {
        q: "What did Thomas Edison make in 1879?",
        choices: ["A light bulb that glowed for hours", "An airplane", "A kite"],
        answer: 0,
        why: "Edison made a long-lasting light bulb in 1879.",
      },
      {
        q: "How long was the Wright brothers' first flight?",
        choices: ["12 hours", "12 seconds", "12 days"],
        answer: 1,
        why: "The very first flight lasted only 12 seconds, but it changed the world.",
      },
      {
        q: "How did people light their homes at night long ago?",
        choices: ["With phones", "With electric lamps", "With TV screens", "With candles"],
        answer: 3,
        why: "Before electric lights, people used candles and oil lamps.",
      },
    ],
    task: {
      kind: "speak",
      prompt:
        "Find 3 inventions in your home, like a lamp, a fridge or a phone. Ask a grown-up: What did people do before this was invented? Then ask a grandparent or older grown-up one question: What was different when you were a kid?",
      rubric: [
        "Names 3 inventions at home",
        "Tells what people did before each one",
        "Asks an older grown-up a question about long ago",
        "Shares one thing that was different back then",
      ],
    },
  },
]);
