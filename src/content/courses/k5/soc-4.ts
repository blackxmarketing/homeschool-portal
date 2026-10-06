import { k5Course } from "./base";

/**
 * soc-4: Grade 4 social studies with Ranger Clark. Map skills, the five U.S.
 * regions, the first nations of North America, explorers and the first
 * English colonies, state government, and a state's economy.
 */
export const soc4 = k5Course("soc", 4, [
  // 1. Latitude, longitude and map tools
  {
    id: "soc-4.latlong",
    title: "Latitude, Longitude and Map Tools",
    minutes: 30,
    stage: "grammar",
    standards: ["SS.4.7", "SS.4.8", "D2.Geo.1.3-5", "D2.Geo.3.3-5"],
    read: [
      "Explorers have always needed a way to say exactly where a place is. Today we use an invisible grid of lines that wraps around the globe. The lines are not painted on the Earth, but mapmakers draw them on every globe and world map.",
      "Lines of latitude run east and west, like the rungs of a ladder. They measure how far north or south a place is. The most important one is the equator, at 0 degrees. It circles the middle of the Earth and splits it into the Northern and Southern Hemispheres. The North Pole is at 90 degrees north, and the South Pole is at 90 degrees south.",
      "Lines of longitude run north and south, from pole to pole. They measure how far east or west a place is. The prime meridian, at 0 degrees, runs through Greenwich, England. It splits the Earth into the Eastern and Western Hemispheres. Longitude counts up to 180 degrees east and 180 degrees west.",
      "Where a latitude line and a longitude line cross, you get an exact address called coordinates. We always say latitude first. Washington, D.C., is at about 39 degrees north, 77 degrees west. The United States sits in the Northern and Western Hemispheres.",
      "Maps have other tools too. A compass rose shows north, south, east and west, plus in-between directions like northeast. A map key, or legend, explains the symbols. A scale shows how distance on the map matches distance on the land. If one inch stands for 50 miles, then three inches stand for 150 miles. With these tools, you can read any map like a true explorer.",
    ].join("\n\n"),
    keyIdeas: [
      "Latitude lines run east and west and measure how far north or south of the equator a place is.",
      "Longitude lines run from pole to pole and measure how far east or west of the prime meridian a place is.",
      "Coordinates give latitude first, then longitude, and point to one exact spot.",
      "A compass rose, a map key and a scale help you read any map.",
    ],
    hook: {
      text: "Imagine a ship's captain far out in the middle of the ocean. There are no roads, no signs and no street names, just water in every direction. Yet sailors still found tiny islands out there. Their secret was an invisible grid wrapped around the whole Earth. Today you will learn to use it, explorer.",
    },
    teach: [
      {
        title: "Latitude: North and South",
        teach:
          "Lines of latitude run east and west around the globe, like the rungs of a ladder. They measure how far north or south of the equator a place is. The equator is 0 degrees latitude. It circles the wide middle of the Earth and splits it into two halves, the Northern Hemisphere and the Southern Hemisphere. As you climb north, the numbers grow: 10 degrees, 20 degrees, all the way to 90 degrees north at the North Pole. Head south and you reach 90 degrees south at the South Pole. Latitude lines are also called parallels, because they never touch each other.",
        visual: {
          type: "hotspots",
          title: "Lines of latitude",
          center: "Earth",
          spots: [
            { label: "Equator", icon: "🌍", detail: "0 degrees latitude. It circles the middle of the Earth." },
            { label: "North Pole", icon: "🧊", detail: "90 degrees north, as far north as you can go." },
            { label: "South Pole", icon: "🐧", detail: "90 degrees south, as far south as you can go." },
            { label: "Northern Hemisphere", icon: "⬆️", detail: "The half of the Earth north of the equator. The United States is here." },
            { label: "Southern Hemisphere", icon: "⬇️", detail: "The half of the Earth south of the equator. Australia is here." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Place each spot on the latitude line. North of the equator is above 0, and south is below 0.",
          min: -90,
          max: 90,
          step: 5,
          tolerance: 5,
          items: [
            { label: "The equator", value: 0 },
            { label: "The North Pole", value: 90 },
            { label: "The South Pole", value: -90 },
            { label: "Chicago, about 42°N", value: 42 },
            { label: "Buenos Aires, Argentina, about 35°S", value: -35 },
          ],
          hint: "Start at the equator, 0. North (N) goes up toward 90, and south (S) goes down toward -90.",
          mistakes: [
            { match: "Buenos Aires placed north", coach: "The S means south of the equator, so Buenos Aires goes below 0, at about -35." },
            { match: "Poles swapped", coach: "The North Pole is the top of the line, 90. The South Pole is the bottom, -90." },
          ],
          seconds: 50,
        },
        think: {
          q: "What is the latitude of the equator?",
          choices: ["90 degrees north", "0 degrees", "180 degrees", "45 degrees south"],
          answer: 1,
          why: "The equator is the starting line for latitude, so it is 0 degrees.",
          hints: [
            "90 degrees north is the North Pole, the very top of the Earth, not the middle.",
            "",
            "Latitude only goes up to 90. The number 180 belongs to longitude.",
            "45 degrees south is halfway between the equator and the South Pole.",
          ],
        },
        approaches: {
          analogy:
            "Think of latitude lines as the rungs of a giant ladder leaning on the Earth. The bottom rung in the middle is the equator, 0. Each rung you climb north adds degrees until you reach the top at 90.",
          example:
            "Miami, Florida, is at about 26 degrees north. That means it is 26 degrees up from the equator, a little less than a third of the way to the North Pole at 90.",
          simpler: {
            q: "Which way do latitude lines run?",
            choices: ["East and west, like ladder rungs", "North and south, from pole to pole"],
            answer: 0,
            why: "Latitude lines run east and west, but they measure how far north or south you are.",
            hints: ["", "Lines that run from pole to pole are longitude lines. Latitude lines circle the globe like rungs."],
          },
        },
      },
      {
        title: "Longitude: East and West",
        teach:
          "Lines of longitude run north and south, from the North Pole to the South Pole, like the sections of an orange. They measure how far east or west a place is. The starting line is the prime meridian, 0 degrees longitude. Long ago, mapmakers agreed it would run through Greenwich, England, near London. The prime meridian splits the Earth into the Eastern Hemisphere and the Western Hemisphere. Longitude counts up to 180 degrees east and 180 degrees west, which meet on the far side of the world. Longitude lines are also called meridians. Unlike latitude lines, they all come together at the poles.",
        visual: {
          type: "compare",
          left: { title: "Latitude", points: ["Runs east and west", "Measures north or south", "Starts at the equator, 0°", "Goes up to 90°", "Also called parallels"] },
          right: { title: "Longitude", points: ["Runs from pole to pole", "Measures east or west", "Starts at the prime meridian, 0°", "Goes up to 180°", "Also called meridians"] },
        },
        probe: {
          type: "sort",
          prompt: "Latitude or longitude? Sort each clue.",
          buckets: ["Latitude", "Longitude"],
          items: [
            { text: "Runs east and west, like ladder rungs", bucket: 0 },
            { text: "Measures how far north or south", bucket: 0 },
            { text: "Starts at the equator (0°)", bucket: 0 },
            { text: "Also called parallels", bucket: 0 },
            { text: "Runs from pole to pole", bucket: 1 },
            { text: "Measures how far east or west", bucket: 1 },
            { text: "Starts at the prime meridian (0°)", bucket: 1 },
            { text: "Also called meridians", bucket: 1 },
          ],
          hint: "Latitude starts at the equator and tells north or south. Longitude starts at the prime meridian and tells east or west.",
          mistakes: [
            { match: "Equator sorted as longitude", coach: "The equator is 0 degrees latitude. The prime meridian is 0 degrees longitude." },
            { match: "Runs east and west sorted as longitude", coach: "Careful: latitude lines run east and west, but they measure north and south." },
          ],
          seconds: 45,
        },
        think: {
          q: "The prime meridian splits the Earth into which two halves?",
          choices: ["Northern and Southern Hemispheres", "Eastern and Western Hemispheres", "Land and ocean", "Day and night"],
          answer: 1,
          why: "The prime meridian runs from pole to pole, so it splits east from west.",
          hints: [
            "The equator splits north from south. The prime meridian runs the other way.",
            "",
            "Hemispheres are halves of the globe, and both halves have land and ocean.",
            "Day and night come from the Earth spinning, not from a line on a map.",
          ],
        },
        approaches: {
          analogy:
            "Peel an orange and look at its sections. Each one runs from the top to the bottom and they all meet at the ends. Longitude lines are like those sections, meeting at the North and South Poles.",
          example:
            "Denver, Colorado, is at about 105 degrees west. That means it is 105 degrees west of the prime meridian in England, more than a quarter of the way around the world.",
          simpler: {
            q: "Where does the prime meridian run?",
            choices: ["Around the middle of the Earth", "Through Greenwich, England"],
            answer: 1,
            why: "The prime meridian, 0 degrees longitude, runs through Greenwich, England.",
            hints: ["The line around the middle of the Earth is the equator, which is latitude.", ""],
          },
        },
      },
      {
        title: "Coordinates: An Address for Anywhere",
        teach:
          "Where a latitude line crosses a longitude line, you get a point with an exact address called its coordinates. Mapmakers always say latitude first, then longitude. Washington, D.C., is at about 39 degrees north, 77 degrees west. New Orleans, Louisiana, is at about 30 degrees north, 90 degrees west. The letters matter. N or S tells which side of the equator, and E or W tells which side of the prime meridian. The United States sits in the Northern and Western Hemispheres, so most American coordinates end in N and W. To find a spot, find its latitude line, then slide along it to its longitude line.",
        visual: {
          type: "flip",
          cards: [
            { front: "Coordinates", back: "A latitude and a longitude together. They point to one exact spot." },
            { front: "Washington, D.C.", back: "About 39°N, 77°W" },
            { front: "New Orleans, Louisiana", back: "About 30°N, 90°W" },
            { front: "N or S", back: "Tells which side of the equator a place is on." },
            { front: "E or W", back: "Tells which side of the prime meridian a place is on." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Coordinates give {0} first and {1} second. A place at 30°N is in the {2} Hemisphere, and a place at 90°W is in the {3} Hemisphere.",
          blanks: [{ answers: ["latitude"] }, { answers: ["longitude"] }, { answers: ["Northern"] }, { answers: ["Western"] }],
          bank: ["latitude", "longitude", "Northern", "Western", "Southern", "Eastern"],
          hint: "Latitude always comes first. N means north of the equator, and W means west of the prime meridian.",
          mistakes: [
            { match: "Southern", coach: "N stands for north, so 30°N is in the Northern Hemisphere." },
            { match: "Eastern", coach: "W stands for west, so 90°W is in the Western Hemisphere." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which coordinates could be a place in the United States?",
          choices: ["40°S, 100°W", "40°N, 100°E", "40°N, 100°W", "0°, 0°"],
          answer: 2,
          why: "The United States is north of the equator and west of the prime meridian, so its coordinates read N and W.",
          hints: [
            "S means south of the equator, but the United States is north of it.",
            "E means east of the prime meridian. That spot is in Asia, not America.",
            "",
            "0°, 0° is where the equator meets the prime meridian, out in the Atlantic Ocean near Africa.",
          ],
        },
        approaches: {
          analogy:
            "Coordinates work like finding a seat in a stadium. The row tells you how far up to go, and the seat number tells you how far along. Together they point to one exact seat.",
          example:
            "To find New Orleans at 30°N, 90°W: start at the equator and go up to the 30 degrees north line. Then slide west along that line until you meet the 90 degrees west line. Where they cross is New Orleans.",
          simpler: {
            q: "In coordinates, which number comes first?",
            choices: ["Latitude", "Longitude"],
            answer: 0,
            why: "Mapmakers always give latitude first, then longitude.",
            hints: ["", "Longitude is the second number. The first number tells north or south."],
          },
        },
      },
      {
        title: "Map Tools: Compass Rose, Key and Scale",
        teach:
          "Besides the grid, every good map carries three tools. The compass rose shows the cardinal directions, north, south, east and west, and the in-between directions, like northeast and southwest. The map key, also called a legend, tells what each symbol means, such as a star for a state capital or a blue line for a river. The scale is a small bar that shows how distance on the map matches distance on the land. Say one inch on the map stands for 50 miles, and two towns are three inches apart. Then they are really 150 miles apart. Measure, then multiply.",
        visual: {
          type: "hotspots",
          title: "Map tools",
          center: "A map",
          spots: [
            { label: "Compass rose", icon: "🧭", detail: "Shows north, south, east, west and the in-between directions." },
            { label: "Map key", icon: "🔑", detail: "Also called a legend. It tells what each symbol on the map means." },
            { label: "Scale", icon: "📏", detail: "Shows how distance on the map matches real distance, like 1 inch = 50 miles." },
            { label: "Grid", icon: "🌐", detail: "Lines of latitude and longitude that give every place an address." },
          ],
        },
        probe: {
          type: "number",
          prompt: "On a map, 1 inch stands for 50 miles. Two towns are 4 inches apart on the map. How many miles apart are they really?",
          answer: 200,
          unit: "miles",
          hint: "Each inch is 50 miles. Count 50 four times, or multiply 4 × 50.",
          mistakes: [
            { match: "54", coach: "You added 4 and 50. Each inch is a whole 50 miles, so multiply: 4 × 50." },
            { match: "150", coach: "That's 3 inches. These towns are 4 inches apart." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which map tool tells you what a star symbol means?",
          choices: ["The scale", "The compass rose", "The map key", "The equator"],
          answer: 2,
          why: "The map key, or legend, explains what each symbol stands for.",
          hints: [
            "The scale is for measuring distance, not for explaining symbols.",
            "The compass rose shows directions, like north and east.",
            "",
            "The equator is a line of latitude, not a map tool for symbols.",
          ],
        },
        approaches: {
          analogy:
            "A map scale is like a shrinking machine run backward. The mapmaker shrank the land to fit on paper, and the scale tells you how to grow each inch back to its real size.",
          example:
            "On a map where 1 inch stands for 100 miles, a river that is 2 and a half inches long on the map is really 250 miles long, because 2.5 × 100 = 250.",
          simpler: {
            q: "If 1 inch stands for 50 miles, how far is 2 inches?",
            choices: ["52 miles", "100 miles"],
            answer: 1,
            why: "Two inches is two groups of 50 miles, which is 100 miles.",
            hints: ["Don't add the 2 to the 50. Each inch is a whole 50 miles.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps for finding a place by its coordinates in order.",
      steps: [
        "Read the coordinates: latitude comes first",
        "Find the equator and check: N or S?",
        "Move up or down to the right latitude line",
        "Find the prime meridian and check: E or W?",
        "Slide along to the right longitude line",
        "Put your finger where the two lines cross",
      ],
    },
    explain: {
      prompt: "Explain to a friend how latitude and longitude work together to find a place on a globe.",
      keyPoints: [
        "Latitude lines run east and west and measure north or south of the equator",
        "Longitude lines run pole to pole and measure east or west of the prime meridian",
        "The equator and the prime meridian are both 0 degrees",
        "Coordinates give latitude first, then longitude",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each map word to its meaning.",
        pairs: [
          { left: "Equator", right: "0° latitude, splits north from south" },
          { left: "Prime meridian", right: "0° longitude, runs through Greenwich, England" },
          { left: "Compass rose", right: "Shows the directions" },
          { left: "Map key", right: "Explains the symbols" },
          { left: "Scale", right: "Matches map distance to real distance" },
        ],
        hint: "The equator and prime meridian are the two starting lines. The other three are map tools.",
        seconds: 45,
      },
      {
        type: "number",
        prompt: "How many degrees of latitude is it from the equator to the North Pole?",
        answer: 90,
        unit: "degrees",
        hint: "The equator is 0 degrees and the North Pole is as far north as latitude goes.",
        mistakes: [{ match: "180", coach: "180 is the biggest longitude. Latitude only goes up to 90." }],
        seconds: 20,
      },
      {
        type: "place",
        prompt: "Place each spot on the longitude line. East of the prime meridian is above 0, and west is below 0.",
        min: -180,
        max: 180,
        step: 5,
        tolerance: 5,
        items: [
          { label: "The prime meridian", value: 0 },
          { label: "Washington, D.C., about 77°W", value: -77 },
          { label: "Denver, about 105°W", value: -105 },
          { label: "Cairo, Egypt, about 31°E", value: 31 },
        ],
        hint: "W means west, so it goes on the negative side. E means east, so it goes on the positive side.",
        seconds: 50,
      },
      {
        type: "build",
        prompt: "Build the coordinates of New Orleans, latitude first.",
        tiles: ["30°N", "90°W"],
        distractors: ["30°S", "90°E"],
        hint: "New Orleans is north of the equator and west of the prime meridian, and latitude comes first.",
        seconds: 25,
      },
      {
        type: "number",
        prompt: "On a map, 1 inch stands for 25 miles. A lake is 6 inches across on the map. How many miles across is it really?",
        answer: 150,
        unit: "miles",
        hint: "Multiply the inches by the miles each inch stands for: 6 × 25.",
        mistakes: [{ match: "31", coach: "You added 6 and 25. Each inch is 25 miles, so multiply." }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Lines of latitude measure...",
        choices: ["how far east or west a place is", "how far north or south a place is", "how tall a mountain is"],
        answer: 1,
        why: "Latitude measures how far north or south of the equator a place is.",
      },
      {
        q: "The prime meridian runs through...",
        choices: ["Greenwich, England", "Washington, D.C.", "Chicago, Illinois"],
        answer: 0,
        why: "Mapmakers agreed long ago that 0 degrees longitude would run through Greenwich, England.",
      },
      {
        q: "Which two hemispheres is the United States in?",
        choices: ["Southern and Eastern", "Northern and Eastern", "Southern and Western", "Northern and Western"],
        answer: 3,
        why: "The United States is north of the equator and west of the prime meridian.",
      },
      {
        q: "On a map where 1 inch stands for 10 miles, two towns are 5 inches apart. How far apart are they really?",
        choices: ["15 miles", "50 miles", "5 miles"],
        answer: 1,
        why: "5 inches × 10 miles for each inch = 50 miles.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a parent, find your home on a globe, a world map or an online map. Write down its latitude and longitude, rounded to whole degrees, and name the two hemispheres you live in. Then draw a map of your street or neighborhood with a compass rose, a map key with at least three symbols, and a scale.",
      rubric: [
        "Gives the home's latitude and longitude, latitude first, with N or S and E or W",
        "Names the correct two hemispheres",
        "The map has a compass rose that points the right way",
        "The map key explains at least three symbols used on the map",
        "The map has a scale",
      ],
    },
  },

  // 2. The five regions of the United States
  {
    id: "soc-4.regions",
    title: "The Five Regions of the United States",
    minutes: 30,
    stage: "grammar",
    standards: ["SS.4.1", "SS.4.2", "SS.4.3", "D2.Geo.2.3-5", "D2.Geo.6.3-5", "D2.Geo.8.3-5"],
    read: [
      "The United States is a big country, with 50 states stretching from the Atlantic Ocean to the Pacific Ocean, plus Alaska in the far north and Hawaii out in the Pacific. To study it, geographers often group the states into five regions. A region is an area whose places share features, such as land, climate or the way people live.",
      "The Northeast includes states such as Maine, New York, Massachusetts and Pennsylvania. It has rocky coasts, thick forests and the old, rounded Appalachian Mountains. Good harbors made it a home for fishing, shipping and some of the nation's biggest cities.",
      "The Southeast includes states such as Virginia, Georgia, Florida and Louisiana. It has warm weather, long growing seasons, wide coastal plains and swamps. The mighty Mississippi River ends here, flowing into the Gulf of Mexico. Farmers grow cotton, peanuts and oranges.",
      "The Midwest includes states such as Ohio, Illinois, Iowa and Kansas. Its flat, fertile plains make it one of the best farming areas on Earth, so it is often called America's breadbasket. The Great Lakes sit along its northern edge.",
      "The Southwest includes Arizona, New Mexico, Texas and Oklahoma. Much of it is dry desert and canyon land. The Colorado River carved the Grand Canyon in Arizona. Ranchers raise cattle, and the ground holds oil and copper.",
      "The West includes states such as California, Colorado, Washington, Alaska and Hawaii. The tall Rocky Mountains run through it, and the Pacific coast has forests of giant trees. People there cut timber, grow fruits and vegetables, and mine metals.",
      "Land, water and climate shape how people live and work. Fertile soil draws farmers, good harbors draw traders, and rich mines draw miners. Where people settle often depends on what the land offers.",
    ].join("\n\n"),
    keyIdeas: [
      "Geographers group the 50 states into five regions: the Northeast, Southeast, Midwest, Southwest and West.",
      "Each region has its own landforms, like the Appalachians, the Great Plains, the Rockies and the Grand Canyon.",
      "Climate and natural resources shape the work people do in each region and where they choose to live.",
    ],
    hook: {
      text: "Picture a road trip across the whole country. On Monday you watch lobster boats in a rocky harbor. By Wednesday, cornfields stretch flat to the sky. On Friday you stand at the edge of a canyon more than a mile deep. Same country, very different places! Let's sort them into regions.",
    },
    teach: [
      {
        title: "What Is a Region?",
        teach:
          "A region is an area whose places share something important, like their land, their climate or the work people do. The United States has 50 states, so geographers group them into five regions to make them easier to study: the Northeast, the Southeast, the Midwest, the Southwest and the West. Each region is named for where it sits on the map. The Northeast is in the top right corner, along the Atlantic Ocean. The Midwest sits in the middle of the country. The West stretches all the way to the Pacific Ocean and includes Alaska and Hawaii. Learning the regions is like learning the neighborhoods of a big city.",
        visual: {
          type: "hotspots",
          title: "Five regions of the United States",
          center: "USA",
          spots: [
            { label: "Northeast", icon: "🦞", detail: "Maine, New York, Massachusetts, Pennsylvania and more. Rocky coasts, old mountains and big harbor cities." },
            { label: "Southeast", icon: "🍊", detail: "Virginia, Georgia, Florida, Louisiana and more. Warm, rainy, with swamps and long growing seasons." },
            { label: "Midwest", icon: "🌽", detail: "Ohio, Illinois, Iowa, Kansas and more. Flat, fertile farmland and the Great Lakes." },
            { label: "Southwest", icon: "🌵", detail: "Arizona, New Mexico, Texas and Oklahoma. Deserts, canyons, ranches and oil." },
            { label: "West", icon: "🏔️", detail: "California, Colorado, Washington, Alaska, Hawaii and more. The Rocky Mountains and the Pacific coast." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each state into its region.",
          buckets: ["Northeast", "Southeast", "Midwest", "Southwest", "West"],
          items: [
            { text: "Maine", bucket: 0 },
            { text: "New York", bucket: 0 },
            { text: "Florida", bucket: 1 },
            { text: "Georgia", bucket: 1 },
            { text: "Iowa", bucket: 2 },
            { text: "Ohio", bucket: 2 },
            { text: "Arizona", bucket: 3 },
            { text: "New Mexico", bucket: 3 },
            { text: "California", bucket: 4 },
            { text: "Washington", bucket: 4 },
          ],
          hint: "Picture the map. Northeast is top right, Southeast is bottom right, Midwest is the middle, Southwest is bottom middle, and the West runs to the Pacific.",
          mistakes: [
            { match: "Washington sorted as Northeast", coach: "This is Washington State, on the Pacific coast in the West, not Washington, D.C." },
            { match: "Ohio sorted as Northeast", coach: "Ohio is east of the middle, but it belongs to the Midwest, with Iowa and Illinois." },
          ],
          seconds: 60,
        },
        think: {
          q: "Which region is in the top right corner of a map of the United States?",
          choices: ["Southwest", "West", "Midwest", "Northeast"],
          answer: 3,
          why: "Top means north and right means east, so the top right corner is the Northeast.",
          hints: [
            "The Southwest is at the bottom of the map, near Mexico.",
            "The West is on the left side, along the Pacific Ocean.",
            "The Midwest is in the middle of the country, not the corner.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A big city is easier to learn in neighborhoods: downtown, the river district, the hills. The country is the same. Five regions are like five big neighborhoods with their own look and feel.",
          example:
            "Kansas sits in the middle of the country on flat farmland. It shares that land and its wheat and corn farming with Iowa and Nebraska, so all three belong to the Midwest.",
          simpler: {
            q: "Which ocean does the West region touch?",
            choices: ["The Atlantic Ocean", "The Pacific Ocean"],
            answer: 1,
            why: "The West runs all the way to the Pacific Ocean.",
            hints: ["The Atlantic Ocean is on the east side of the country.", ""],
          },
        },
      },
      {
        title: "Mountains, Plains and Rivers",
        teach:
          "Each region has its own landforms. In the East, the Appalachian Mountains run from Alabama up through Maine and into Canada. They are very old, and millions of years of wind and rain have worn them low and rounded. In the West, the Rocky Mountains are taller and more jagged, with snowy peaks. Between them lie the Great Plains, wide, flat grasslands across the middle of the country. The Mississippi River flows south through the middle, all the way to the Gulf of Mexico. In the north, the five Great Lakes hold a huge share of the world's fresh water. In the Southwest, the Colorado River carved the Grand Canyon.",
        visual: {
          type: "flip",
          cards: [
            { front: "Appalachian Mountains", back: "Old, low, rounded mountains in the East, from Alabama to Maine and into Canada." },
            { front: "Rocky Mountains", back: "Tall, jagged, snowy mountains in the West." },
            { front: "Great Plains", back: "Wide, flat grasslands across the middle of the country." },
            { front: "Mississippi River", back: "A great river flowing south through the middle of the country to the Gulf of Mexico." },
            { front: "Great Lakes", back: "Five huge freshwater lakes: Superior, Michigan, Huron, Erie and Ontario." },
            { front: "Grand Canyon", back: "A canyon in Arizona carved by the Colorado River, more than a mile deep." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each landform to its description.",
          pairs: [
            { left: "Rocky Mountains", right: "Tall, jagged, snowy peaks in the West" },
            { left: "Appalachian Mountains", right: "Old, low, rounded mountains in the East" },
            { left: "Great Plains", right: "Wide, flat grasslands in the middle" },
            { left: "Mississippi River", right: "Flows south to the Gulf of Mexico" },
            { left: "Great Lakes", right: "Five huge freshwater lakes in the north" },
            { left: "Grand Canyon", right: "Carved by the Colorado River in Arizona" },
          ],
          hint: "Old mountains are worn down and rounded. Young mountains are tall and jagged.",
          mistakes: [{ match: "Rockies and Appalachians swapped", coach: "The Rockies are the tall, snowy western mountains. The Appalachians are older and lower, in the East." }],
          seconds: 50,
        },
        think: {
          q: "Why are the Appalachian Mountains lower and rounder than the Rocky Mountains?",
          choices: ["People flattened them to build farms", "They are much older, and wind and rain wore them down", "They are made of sand", "They are under the ocean"],
          answer: 1,
          why: "The Appalachians are very old. Over millions of years, wind, rain and ice wore them down.",
          hints: [
            "People could never flatten a whole mountain range. Nature did the wearing down.",
            "",
            "The Appalachians are made of hard rock, not sand.",
            "The Appalachians are on dry land in the eastern United States.",
          ],
        },
        approaches: {
          analogy:
            "Old mountains are like a bar of soap that has been used for weeks. It started with sharp corners, but over time the water rounded it off. The Appalachians have been worn for far longer than the Rockies.",
          example:
            "If you floated a raft from Minnesota down the Mississippi River, you would pass farms and river towns in the Midwest and the South, then reach the Gulf of Mexico below New Orleans.",
          simpler: {
            q: "Which mountains are taller and snowier?",
            choices: ["The Rocky Mountains", "The Appalachian Mountains"],
            answer: 0,
            why: "The Rocky Mountains in the West are taller and more jagged, with snowy peaks.",
            hints: ["", "The Appalachians are old and worn down, so they are lower and rounder."],
          },
        },
      },
      {
        title: "Climate and Resources",
        teach:
          "Climate is the usual weather of a place over many years. Natural resources are useful things that come from nature, like soil, water, trees, fish and minerals. Together they shape the work people do. The Northeast's cold, rocky coast is rich in fish and lobster. The warm, rainy Southeast grows cotton, peanuts and oranges. The Midwest's deep, rich soil grows corn, soybeans and wheat. The dry Southwest has cattle ranches, copper mines and oil wells. The West has thick forests for timber, sunny valleys for fruits and vegetables, and mountains with gold, silver and copper.",
        visual: {
          type: "compare",
          left: { title: "Northeast", points: ["Cold winters", "Rocky coast and good harbors", "Fish and lobster", "Old factory and trading cities"] },
          right: { title: "Southwest", points: ["Hot and dry", "Deserts and canyons", "Cattle ranches", "Oil and copper"] },
        },
        probe: {
          type: "sort",
          prompt: "Which region is famous for each resource?",
          buckets: ["Northeast", "Southeast", "Midwest", "Southwest", "West"],
          items: [
            { text: "Lobster from a cold, rocky coast", bucket: 0 },
            { text: "Oranges from warm, sunny groves", bucket: 1 },
            { text: "Peanuts and cotton", bucket: 1 },
            { text: "Corn and soybeans in deep, rich soil", bucket: 2 },
            { text: "Wheat on the flat plains of Kansas", bucket: 2 },
            { text: "Copper mines in the desert", bucket: 3 },
            { text: "Oil wells and cattle ranches in Texas", bucket: 3 },
            { text: "Timber from giant Pacific forests", bucket: 4 },
          ],
          hint: "Think about the climate. Warm and rainy grows oranges, flat and fertile grows grain, dry desert means ranches and mines.",
          mistakes: [{ match: "Oranges sorted as Southwest", coach: "Oranges need warm weather and plenty of rain. Think Florida, in the Southeast." }],
          seconds: 50,
        },
        think: {
          q: "A region with deep, rich soil and flat land is best for which kind of work?",
          choices: ["Fishing", "Mining copper", "Farming", "Logging"],
          answer: 2,
          why: "Flat land with rich soil is perfect for plowing and growing crops.",
          hints: [
            "Fishing needs oceans, lakes or rivers, not soil.",
            "Copper comes from rocks in mountains and deserts, not rich farm soil.",
            "",
            "Logging needs forests, and flat farmland is usually cleared for crops.",
          ],
        },
        approaches: {
          analogy:
            "A region's resources are like what grows in a family's backyard. If you have an apple tree, you make applesauce. If you have a creek, you go fishing. People work with what their land gives them.",
          example:
            "Iowa has deep, dark soil and good summer rain. That is why its farmers grow more corn than any other state.",
          simpler: {
            q: "What is a natural resource?",
            choices: ["Something people build in a factory", "Something useful that comes from nature, like soil or fish"],
            answer: 1,
            why: "Natural resources come from nature: soil, water, trees, fish and minerals.",
            hints: ["Things built in factories are made by people, not by nature.", ""],
          },
        },
      },
      {
        title: "Why People Live Where They Do",
        teach:
          "Geography helps decide where people settle. Long ago, cities grew where travel was easy, at good harbors and along rivers and lakes. New York City grew around one of the best natural harbors in the world. Chicago grew on Lake Michigan, where boats and later railroads met. Farm towns spread across the fertile Midwest. When gold was found in California in 1848, thousands of people rushed west. Places that are very dry, very cold or very steep, like deserts and high mountains, usually have fewer people. Today, dams, canals and air conditioning help people live in harder places, like the desert cities of Arizona.",
        visual: {
          type: "compare",
          left: { title: "Places that draw people", points: ["Good harbors", "Rivers and lakes", "Fertile soil", "Rich mines", "Mild weather"] },
          right: { title: "Places with fewer people", points: ["Very dry deserts", "Very cold lands", "Steep, high mountains", "Little fresh water"] },
        },
        probe: {
          type: "highlight",
          prompt: "Tap the TWO sentences that explain why a city grew where it did.",
          sentences: [
            "New York City grew around a deep, sheltered harbor where ships could dock.",
            "Many people in New York City ride the subway.",
            "Chicago grew where boats on Lake Michigan met the railroads.",
            "Chicago has many tall buildings.",
          ],
          correct: [0, 2],
          hint: "Look for sentences that connect the city to geography, like water and travel routes.",
          mistakes: [{ match: "Tall buildings", coach: "Tall buildings came after the city grew. They don't explain why people first settled there." }],
          seconds: 35,
        },
        think: {
          q: "Why do deserts and high mountains usually have fewer people?",
          choices: ["They are too far from the ocean", "Laws keep people out", "Life there is harder: little water, steep land or harsh weather", "Nobody has ever visited them"],
          answer: 2,
          why: "People settle where water, food and travel are easier. Deserts and high mountains make all three harder.",
          hints: [
            "Lots of cities are far from the ocean, like Chicago and Denver.",
            "There are no laws against living in deserts or mountains.",
            "",
            "People have visited and lived in deserts and mountains for thousands of years.",
          ],
        },
        approaches: {
          analogy:
            "Think of families at a picnic. They spread their blankets near shade and water fountains, not out on the hot parking lot. People settle the same way, near water, food and easy travel.",
          example:
            "Chicago sits where Lake Michigan touches the Midwest. Grain and lumber came in by boat and train, and goods went out again. Trade made the city grow into one of the biggest in the country.",
          simpler: {
            q: "Where did many early cities grow?",
            choices: ["Near good harbors and rivers", "On the tops of mountains"],
            answer: 0,
            why: "Harbors and rivers made travel and trade easy, so cities grew there.",
            hints: ["", "Mountaintops are steep and cold, which makes building and travel hard."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which region would you visit to see each place?",
      buckets: ["Northeast", "Southeast", "Midwest", "Southwest", "West"],
      items: [
        { text: "The rocky lobster coast of Maine", bucket: 0 },
        { text: "The harbor of New York City", bucket: 0 },
        { text: "The Everglades swamp in Florida", bucket: 1 },
        { text: "Where the Mississippi meets the Gulf in Louisiana", bucket: 1 },
        { text: "The Great Lakes shore in Michigan", bucket: 2 },
        { text: "The wheat fields of Kansas", bucket: 2 },
        { text: "The Grand Canyon in Arizona", bucket: 3 },
        { text: "The oil fields of Texas", bucket: 3 },
        { text: "Rocky Mountain peaks in Colorado", bucket: 4 },
        { text: "The volcanoes of Hawaii", bucket: 4 },
      ],
    },
    explain: {
      prompt: "Pick one region. Explain its land, its climate and the natural resources people use there.",
      keyPoints: [
        "Names a region and some of its states",
        "Describes a landform such as mountains, plains, rivers or lakes",
        "Describes the climate",
        "Names a natural resource and the work it supports",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each region to something it is known for.",
        pairs: [
          { left: "Northeast", right: "Lobster boats and old harbor cities" },
          { left: "Southeast", right: "Oranges, cotton and warm swamps" },
          { left: "Midwest", right: "Cornfields and the Great Lakes" },
          { left: "Southwest", right: "Deserts, canyons and cattle ranches" },
          { left: "West", right: "Rocky Mountains, timber and the Pacific coast" },
        ],
        hint: "Think about each region's climate: cold coast, warm and rainy, flat farmland, dry desert, tall mountains.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "The {0} Mountains are old and rounded, the {1} Mountains are tall and snowy, and the {2} River flows south to the Gulf of Mexico.",
        blanks: [{ answers: ["Appalachian"] }, { answers: ["Rocky"] }, { answers: ["Mississippi"] }],
        bank: ["Appalachian", "Rocky", "Mississippi", "Hudson", "Andes"],
        hint: "The eastern mountains are older. The western mountains are taller. The great river through the middle ends at the Gulf.",
        mistakes: [
          { match: "Hudson", coach: "The Hudson River is in New York and flows into the Atlantic, not the Gulf of Mexico." },
          { match: "Andes", coach: "The Andes are in South America, not the United States." },
        ],
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Midwest or Southwest? Sort the states.",
        buckets: ["Midwest", "Southwest"],
        items: [
          { text: "Kansas", bucket: 0 },
          { text: "Iowa", bucket: 0 },
          { text: "Illinois", bucket: 0 },
          { text: "Texas", bucket: 1 },
          { text: "Arizona", bucket: 1 },
          { text: "Oklahoma", bucket: 1 },
        ],
        hint: "The Southwest has just four states: Arizona, New Mexico, Texas and Oklahoma.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "How many Great Lakes are there?",
        answer: 5,
        hint: "Superior, Michigan, Huron, Erie and ... count them all.",
        seconds: 15,
      },
    ],
    check: [
      {
        q: "Which region is often called America's breadbasket?",
        choices: ["Northeast", "Southwest", "Midwest", "West"],
        answer: 2,
        why: "The Midwest's flat, fertile land grows huge amounts of corn, wheat and soybeans.",
      },
      {
        q: "Which river carved the Grand Canyon?",
        choices: ["The Colorado River", "The Mississippi River", "The Hudson River"],
        answer: 0,
        why: "Over millions of years, the Colorado River cut the Grand Canyon in Arizona.",
      },
      {
        q: "Which state is in the Southeast?",
        choices: ["Oregon", "Georgia", "Minnesota", "Maine"],
        answer: 1,
        why: "Georgia is a warm Southeast state. Oregon is in the West, Minnesota in the Midwest and Maine in the Northeast.",
      },
      {
        q: "Why did New York City grow so big?",
        choices: ["It is high in the Rocky Mountains", "It is in the middle of a desert", "It sits on a great natural harbor"],
        answer: 2,
        why: "Its deep, sheltered harbor made it a busy port for ships and trade.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Draw or trace a map of the United States. Color the five regions in five different colors and label at least two states in each. In each region, draw one landform and one natural resource. Mark your own state with a star and tell a parent which region you live in.",
      rubric: [
        "All five regions are colored and labeled",
        "At least two states are labeled correctly in each region",
        "Each region shows a landform and a natural resource that really belong there",
        "Your own state is marked, and you can name its region",
      ],
    },
  },

  // 3. The first nations of North America
  {
    id: "soc-4.first-nations",
    title: "The First Nations of North America",
    minutes: 35,
    stage: "logic",
    standards: ["SS.4.4", "D2.Geo.4.3-5", "D2.Geo.7.3-5", "D2.His.2.3-5"],
    read: [
      "Long before any ship from Europe reached America, the land was home to millions of people. They belonged to hundreds of nations, each with its own language, leaders, beliefs and stories. Historians learn about them from objects they left behind and from the stories and knowledge passed down by their people.",
      "Geography shaped how each nation lived. In the Northeast woodlands, the Haudenosaunee, also called the Iroquois, lived in long, bark-covered houses called longhouses, with several related families under one roof. They grew corn, beans and squash, which they called the Three Sisters, and hunted deer in the forests. Five Haudenosaunee nations joined together under the Great Law of Peace.",
      "On the Great Plains, peoples such as the Blackfeet followed huge herds of bison. They used the bison for food, clothing, tools and the covers of their tipis, which could be packed up and moved. There were no horses yet, so people walked and used dogs to pull loads.",
      "In the dry Southwest, the Ancestral Puebloans built homes of stone and adobe, a sun-dried mud brick, stacked several stories high. Some built villages right into cliffs, like the ones at Mesa Verde in Colorado. Their descendants, the Pueblo peoples such as the Hopi, still live in the Southwest today.",
      "In the Pacific Northwest, nations such as the Tlingit and Chinook lived by rivers full of salmon and forests of tall cedar trees. They built large plank houses and carved canoes and totem poles. Far north in the Arctic, the Inuit hunted seals and whales and built snow houses for winter hunting trips.",
      "Nations also traded across long distances. Seashells from the coasts and copper from near the Great Lakes passed from hand to hand across the continent. Near the Mississippi River, the great town of Cahokia drew traders from far away.",
    ].join("\n\n"),
    keyIdeas: [
      "Hundreds of Native American nations lived in North America long before Europeans arrived, each with its own language and way of life.",
      "Geography shaped each nation's homes and food: longhouses and the Three Sisters, tipis and bison, adobe and desert farms, cedar houses and salmon.",
      "Nations traded goods like shells and copper across long distances, often along rivers.",
    ],
    hook: {
      text: "Suppose you had to build a home with only what you could find nearby. In a forest, you might use wood and bark. In a desert, maybe mud and stone. In the snowy Arctic, maybe snow itself! For thousands of years, the first nations of North America did exactly that. Let's visit some of them.",
    },
    teach: [
      {
        title: "Many Nations, Many Ways of Life",
        teach:
          "Thousands of years before ships came from Europe, North America was already home to millions of people in hundreds of nations. Each nation had its own language, leaders, beliefs and stories. Geography shaped how each one lived. In the forests of the Northeast, the Haudenosaunee, also called the Iroquois, built longhouses of wooden poles covered with elm bark. Several related families shared one longhouse. Women farmed fields of corn, beans and squash, called the Three Sisters, while men hunted deer and fished. Five Haudenosaunee nations formed a league and agreed to settle disagreements by talking, under the Great Law of Peace.",
        visual: {
          type: "hotspots",
          title: "A Haudenosaunee village",
          center: "Longhouse",
          spots: [
            { label: "Longhouse", icon: "🏠", detail: "A long home of wooden poles covered with elm bark, shared by several related families." },
            { label: "Three Sisters", icon: "🌽", detail: "Corn, beans and squash, planted together. The beans climbed the corn, and squash leaves shaded the soil." },
            { label: "Forest", icon: "🦌", detail: "The woods gave deer to hunt, wood and bark to build with, and nuts and berries." },
            { label: "Great Law of Peace", icon: "🤝", detail: "The agreement that joined five Haudenosaunee nations and helped them settle disagreements by talking." },
          ],
        },
        probe: {
          type: "cloze",
          text: "The Haudenosaunee lived in bark-covered {0}. They grew corn, beans and {1}, which they called the Three {2}. Five nations joined together under the Great Law of {3}.",
          blanks: [{ answers: ["longhouses", "longhouse"] }, { answers: ["squash"] }, { answers: ["Sisters"] }, { answers: ["Peace"] }],
          bank: ["longhouses", "squash", "Sisters", "Peace", "tipis", "rice", "Rivers", "Gold"],
          hint: "Think of the forest village: long homes of bark, three crops planted together, and a law that kept five nations at peace.",
          mistakes: [
            { match: "tipis", coach: "Tipis were movable homes on the Great Plains. In the Northeast forests, families lived in longhouses." },
            { match: "rice", coach: "The Three Sisters were corn, beans and squash." },
          ],
          seconds: 40,
        },
        think: {
          q: "Why did the Haudenosaunee build their homes with wood and bark?",
          choices: ["They bought wood from Europe", "Their forests had plenty of trees", "There was no snow there", "Stone was against their laws"],
          answer: 1,
          why: "They lived in thick forests, so wood and bark were the best materials close at hand.",
          hints: [
            "This was long before Europeans arrived, so nothing came from Europe.",
            "",
            "The Northeast has cold, snowy winters, so that isn't the reason.",
            "There was no law against stone. They used what their forests gave them.",
          ],
        },
        approaches: {
          analogy:
            "We still build with what is nearby. A town near a stone quarry has stone houses, and a town near big forests has wooden ones. The Haudenosaunee lived in the forest, so they built with wood and bark.",
          example:
            "Inside a longhouse, each family had its own space along the walls. Fires ran down the middle, and two families across from each other shared each fire. Smoke rose out through holes in the roof.",
          simpler: {
            q: "What were the Three Sisters?",
            choices: ["Three rivers in New York", "Corn, beans and squash"],
            answer: 1,
            why: "The Three Sisters were the three crops planted together: corn, beans and squash.",
            hints: ["The Three Sisters were crops in a field, not rivers.", ""],
          },
        },
      },
      {
        title: "Bison Hunters and Desert Farmers",
        teach:
          "On the wide grasslands of the Great Plains, peoples such as the Blackfeet followed great herds of bison. A bison gave them almost everything: meat for food, hides for clothing and tipi covers, and bones for tools. Tipis could be packed up quickly to follow the herds. There were no horses yet, so people walked and used dogs to pull loads on poles. Far to the southwest, in a dry land of mesas and canyons, the Ancestral Puebloans were farmers. They built homes of stone and adobe, sun-dried mud bricks, stacked like apartments. At Mesa Verde, in Colorado, they built villages right into the cliffs. They saved rainwater to grow corn.",
        visual: {
          type: "compare",
          left: { title: "Great Plains (Blackfeet)", points: ["Wide grasslands", "Followed the bison herds", "Tipis that could be moved", "Dogs pulled loads on poles"] },
          right: { title: "Southwest (Ancestral Puebloans)", points: ["Dry mesas and canyons", "Farmed corn, beans and squash", "Stone and adobe homes that stayed put", "Cliff villages at Mesa Verde"] },
        },
        probe: {
          type: "sort",
          prompt: "Plains bison hunters or Southwest farmers? Sort each clue.",
          buckets: ["Plains bison hunters", "Southwest farmers"],
          items: [
            { text: "Tipis that could be packed up and moved", bucket: 0 },
            { text: "Followed the herds across the grasslands", bucket: 0 },
            { text: "Dogs pulled loads on poles", bucket: 0 },
            { text: "Hides made clothing and home covers", bucket: 0 },
            { text: "Bricks of sun-dried mud called adobe", bucket: 1 },
            { text: "Villages built into cliffs", bucket: 1 },
            { text: "Saved rainwater to grow corn", bucket: 1 },
            { text: "Homes stacked like apartments", bucket: 1 },
          ],
          hint: "Hunters who follow animals need homes that move. Farmers stay by their fields and build homes that last.",
          mistakes: [{ match: "Tipis sorted as Southwest", coach: "Tipis moved with the bison hunters on the Plains. Desert farmers built stone and adobe homes that stayed put." }],
          seconds: 45,
        },
        think: {
          q: "Why were tipis a smart choice for Plains peoples?",
          choices: ["Tipis were warmer than stone", "Adobe had not been invented", "The Plains had too much stone", "Tipis could be packed up and moved to follow the bison"],
          answer: 3,
          why: "The bison herds kept moving, so the people needed homes they could take with them.",
          hints: [
            "Warmth wasn't the main reason. Think about what the bison herds did.",
            "The Ancestral Puebloans were already building with adobe in the Southwest.",
            "The Plains are mostly grassland, not stone.",
            "",
          ],
        },
        approaches: {
          analogy:
            "A tipi is like a camping tent for a family that travels with its food. An adobe pueblo is like a farmhouse built to stay right next to the fields.",
          example:
            "After a bison hunt, a family could eat the fresh meat, dry strips of extra meat to save, scrape and tan the hide for robes and tipi covers, and carve bones into scrapers and other tools.",
          simpler: {
            q: "Which animal did Plains peoples depend on most?",
            choices: ["The bison", "The salmon"],
            answer: 0,
            why: "Great herds of bison gave Plains peoples food, clothing, tools and home covers.",
            hints: ["", "Salmon swim in rivers of the Pacific Northwest, far from the Plains."],
          },
        },
      },
      {
        title: "Salmon, Cedar and Snow",
        teach:
          "In the Pacific Northwest, rain falls often, giant cedar trees grow tall, and rivers fill with salmon every year. Nations such as the Tlingit and Chinook caught and dried so much salmon that they could live in one village most of the year. They split cedar into wide planks to build large houses, carved canoes from single logs, and carved tall totem poles that showed family crests and stories. Far to the north, in the icy Arctic, the Inuit had almost no trees and short summers. They hunted seals, walruses and whales from boats such as kayaks, made warm clothing from animal skins, and built snow houses for shelter on winter hunting trips.",
        visual: {
          type: "flip",
          cards: [
            { front: "Salmon", back: "Fish that swim up Northwest rivers every year. Nations dried them to eat all winter." },
            { front: "Cedar", back: "Tall trees that split into planks for houses and big logs for canoes." },
            { front: "Totem pole", back: "A tall carved cedar pole showing a family's crests and stories." },
            { front: "Kayak", back: "A light Arctic boat made of a frame covered with animal skins." },
            { front: "Snow house", back: "A dome of snow blocks the Inuit built for shelter on winter hunting trips." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each nation to the land and resources its life was built around.",
          pairs: [
            { left: "Haudenosaunee", right: "Northeast forests and fields of corn" },
            { left: "Blackfeet", right: "Bison herds on the Great Plains" },
            { left: "Ancestral Puebloans", right: "Stone, adobe and desert farms" },
            { left: "Tlingit", right: "Salmon rivers and cedar forests" },
            { left: "Inuit", right: "Seals, whales and Arctic snow" },
          ],
          hint: "Picture where each nation lived: forest, grassland, desert, rainy coast or Arctic ice.",
          seconds: 45,
        },
        think: {
          q: "Why could Pacific Northwest nations stay in one village most of the year?",
          choices: ["They traded with Europeans for food", "It never rained there", "Salmon and other food were plentiful nearby", "They lived in tipis"],
          answer: 2,
          why: "Rivers full of salmon and forests full of food meant they didn't have to move to find meals.",
          hints: [
            "This was before Europeans arrived, so there was no trade with Europe.",
            "The Pacific Northwest is actually one of the rainiest places in the country.",
            "",
            "Tipis were movable homes of the Plains. Northwest nations built big cedar plank houses.",
          ],
        },
        approaches: {
          analogy:
            "A full pantry lets a family stay home all winter. For Northwest nations, the salmon rivers filled the pantry every year, so there was no need to move to find food.",
          example:
            "In summer, a Tlingit family might catch many salmon, split them, and hang them to dry and smoke on wooden racks. The dried fish kept for months and fed the family through the winter.",
          simpler: {
            q: "Which tree did Northwest nations use for planks and canoes?",
            choices: ["Palm", "Cedar"],
            answer: 1,
            why: "Tall cedar trees split well into planks and made big, strong canoes.",
            hints: ["Palm trees grow in warm, tropical places, not the rainy Northwest.", ""],
          },
        },
      },
      {
        title: "Trading Across a Continent",
        teach:
          "Nations did not live alone. They traded with their neighbors, and goods passed from hand to hand across huge distances. Seashells from the Gulf of Mexico and the Atlantic coast have been found hundreds of miles inland. Copper from near Lake Superior was made into tools and ornaments far away. Near the Mississippi River, in what is now Illinois, the Mississippian people built a great town called Cahokia, with giant earthen mounds. About 900 years ago, it was the largest town north of Mexico, and traders came from far away. Rivers were the highways, and canoes were the trucks.",
        visual: {
          type: "hotspots",
          title: "Trade across North America",
          center: "Rivers",
          spots: [
            { label: "Seashells", icon: "🐚", detail: "Shells from the Gulf and Atlantic coasts were traded hundreds of miles inland." },
            { label: "Copper", icon: "🪙", detail: "Copper from near Lake Superior was hammered into tools and ornaments." },
            { label: "Canoes", icon: "🛶", detail: "Canoes carried people and goods along rivers and lakes, the highways of the time." },
            { label: "Cahokia", icon: "⛰️", detail: "A great town of earthen mounds near the Mississippi River, in what is now Illinois." },
          ],
        },
        probe: {
          type: "highlight",
          prompt: "Tap the TWO sentences that are evidence of long-distance trade.",
          sentences: [
            "Seashells from the Gulf of Mexico were found hundreds of miles inland.",
            "The Haudenosaunee lived in longhouses.",
            "Copper from near Lake Superior was made into tools far away.",
            "Plains peoples hunted bison.",
          ],
          correct: [0, 2],
          hint: "Evidence of trade is something found far from where it came from.",
          mistakes: [{ match: "Longhouses", coach: "Longhouses were built from local forests. Nothing had to travel far for that." }],
          seconds: 30,
        },
        think: {
          q: "Why were rivers so important for trade?",
          choices: ["Rivers had roads beside them", "Only rivers had fish", "Canoes could carry heavy goods along them quickly", "Traders were not allowed to walk"],
          answer: 2,
          why: "A canoe on a river could carry far more, far faster, than a person walking through forests.",
          hints: [
            "There were trails, but no roads like ours. The river itself was the road.",
            "Lakes and oceans have fish too. Think about moving goods.",
            "",
            "Traders could walk, but carrying heavy loads on foot was slow and hard.",
          ],
        },
        approaches: {
          analogy:
            "Trade worked a bit like a game of telephone with objects. Each trader passed something along to the next, so a shell could travel a thousand miles even though no one person carried it the whole way.",
          example:
            "A shell picked up on the Gulf coast might be traded to a village up the Mississippi, then to a village on the Ohio River, and then traded again, until it ended up as a necklace far to the north.",
          simpler: {
            q: "What were the highways for trade?",
            choices: ["Rivers", "Railroads"],
            answer: 0,
            why: "Canoes carried goods along rivers and lakes.",
            hints: ["", "Railroads did not exist yet. They came thousands of years later."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which nation does each clue describe?",
      buckets: ["Haudenosaunee (Northeast)", "Blackfeet (Plains)", "Ancestral Puebloans (Southwest)", "Tlingit (Northwest)", "Inuit (Arctic)"],
      items: [
        { text: "Longhouses covered with elm bark", bucket: 0 },
        { text: "The Great Law of Peace", bucket: 0 },
        { text: "Followed bison herds on foot", bucket: 1 },
        { text: "Movable tipis", bucket: 1 },
        { text: "Cliff villages at Mesa Verde", bucket: 2 },
        { text: "Adobe homes stacked like apartments", bucket: 2 },
        { text: "Cedar plank houses and totem poles", bucket: 3 },
        { text: "Dried salmon for the winter", bucket: 3 },
        { text: "Hunted seals from kayaks", bucket: 4 },
        { text: "Snow houses on winter hunts", bucket: 4 },
      ],
    },
    explain: {
      prompt: "Pick two nations from different regions. Explain how geography shaped their homes and their food.",
      keyPoints: [
        "Names two nations from different regions",
        "Connects their homes to materials found nearby",
        "Connects their food to the land, water and animals around them",
        "Mentions trade between nations",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each home to the nation that built it.",
        pairs: [
          { left: "Longhouse of elm bark", right: "Haudenosaunee" },
          { left: "Tipi with a bison-hide cover", right: "Blackfeet" },
          { left: "Adobe village in a cliff", right: "Ancestral Puebloans" },
          { left: "Cedar plank house", right: "Tlingit" },
          { left: "Snow house", right: "Inuit" },
        ],
        hint: "Each home was made from what the land gave: bark, hides, mud and stone, cedar, or snow.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Peoples of the Great {0} hunted {1}, while the Ancestral Puebloans grew {2} in the dry Southwest.",
        blanks: [{ answers: ["Plains"] }, { answers: ["bison"] }, { answers: ["corn"] }],
        bank: ["Plains", "bison", "corn", "Lakes", "salmon", "rice"],
        hint: "Grasslands had bison herds. Desert farmers grew one of the Three Sisters.",
        mistakes: [{ match: "salmon", coach: "Salmon fed the Northwest nations. The Plains peoples hunted bison." }],
        seconds: 30,
      },
      {
        type: "highlight",
        prompt: "Tap the TWO sentences that show geography shaping a home.",
        sentences: [
          "The Inuit built snow houses because the Arctic had snow but few trees.",
          "Cahokia was a large town.",
          "The Tlingit built plank houses from the tall cedar trees around them.",
          "Many nations told stories in the evenings.",
        ],
        correct: [0, 2],
        hint: "Look for a home built from something the land around it gave.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "How many Haudenosaunee nations first joined together under the Great Law of Peace?",
        answer: 5,
        unit: "nations",
        hint: "Think back to the league of the Haudenosaunee in the Northeast forests.",
        mistakes: [{ match: "6", coach: "A sixth nation joined much later. The league began with five." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What were the Three Sisters?",
        choices: ["Corn, beans and squash", "Three Haudenosaunee leaders", "Three rivers in New York"],
        answer: 0,
        why: "The Three Sisters were three crops planted together: corn, beans and squash.",
      },
      {
        q: "Why did Plains peoples use tipis?",
        choices: ["They lasted for hundreds of years", "They were made of cedar planks", "They were easy to move while following the bison"],
        answer: 2,
        why: "The bison herds moved, so Plains peoples needed homes they could pack up and carry.",
      },
      {
        q: "What did the Ancestral Puebloans build their homes from?",
        choices: ["Bison hides", "Stone and adobe", "Snow"],
        answer: 1,
        why: "In the dry Southwest they used stone and adobe, bricks of sun-dried mud.",
      },
      {
        q: "Which is evidence of long-distance trade?",
        choices: ["A longhouse in a forest", "Gulf seashells found far inland", "A bison hunt on the Plains"],
        answer: 1,
        why: "Shells from the coast could only get far inland by being traded from hand to hand.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "Pick one nation from this lesson. Build a small model of its home with things from around the house, like sticks, clay, paper, cloth or cotton balls. Then show it to a parent and explain what it is made of, why those materials made sense where that nation lived, and what the people ate.",
      rubric: [
        "The model looks like the nation's real kind of home",
        "Explains which materials the real home was made from",
        "Connects the materials to the land where the nation lived",
        "Names the main foods of that nation",
      ],
    },
  },

  // 4. Explorers and the first English colonies
  {
    id: "soc-4.explorers",
    title: "Explorers and the First English Colonies",
    minutes: 35,
    stage: "logic",
    standards: ["SS.4.5", "SS.4.6", "D2.His.1.3-5", "D2.His.3.3-5", "D2.His.14.3-5", "D2.Civ.4.3-5"],
    read: [
      "About 600 years ago, people in Europe wanted spices, silk and other goods from Asia. Those goods traveled over long, slow land routes and cost a fortune. Kings and queens hoped sailors could find a faster way to Asia by sea. Explorers also hoped for gold, land and fame.",
      "In 1492, Christopher Columbus, a sailor from Genoa in Italy, sailed west for the king and queen of Spain with three ships, the Niña, the Pinta and the Santa María. He believed Asia lay just across the Atlantic. After about ten weeks, his crew sighted an island in the Bahamas. Columbus thought he had reached the Indies, near Asia, but he had reached lands most Europeans did not know existed.",
      "In 1497, John Cabot sailed for England and reached the coast of North America, probably near Newfoundland. His voyage gave England its claim to land in North America. In 1609, Henry Hudson, sailing for the Dutch, explored the river in New York that now carries his name.",
      "Settlers followed. In 1607, about 100 English colonists founded Jamestown in Virginia, the first lasting English settlement in America. The first years brought sickness and hunger. Captain John Smith made the rule that those who would not work would not eat. Trade with the Powhatan people and a money crop, tobacco, helped the colony survive.",
      "In 1620, the Pilgrims crossed the Atlantic on the Mayflower so they could worship God in their own way. Before landing, the men signed the Mayflower Compact, promising to make fair laws and obey them. They founded Plymouth, in what is now Massachusetts. About half of them died that first winter. In spring, a Patuxet man named Squanto taught them to plant corn, and the Wampanoag leader Massasoit made a peace agreement with them. In the fall of 1621 they shared a harvest feast.",
    ].join("\n\n"),
    keyIdeas: [
      "Europeans explored to find a sea route to Asia's riches, and for gold, land and fame.",
      "Columbus sailed for Spain in 1492, Cabot for England in 1497, and Hudson for the Dutch in 1609.",
      "Jamestown (1607) survived through hard work, trade and tobacco; the Pilgrims founded Plymouth (1620) to worship freely.",
      "The Mayflower Compact was an early promise of self-government: make fair laws and obey them.",
    ],
    hook: {
      text: "Imagine sailing for weeks across an ocean no one in your country has crossed. Your map ends at the edge of the water. Food is running low, and the crew is nervous. Then one night a sailor shouts, Land! What would you find? Real explorers faced exactly that.",
    },
    teach: [
      {
        title: "Why Europeans Sailed West",
        teach:
          "About 600 years ago, Europeans wanted spices like pepper and cinnamon, plus silk and other goods from Asia. Those goods came over long, dangerous land routes and cost a fortune. Rulers hoped a sea route would be faster and make them rich. Christopher Columbus, a sailor from Genoa, Italy, believed he could reach Asia by sailing west. The king and queen of Spain paid for his voyage. In 1492 he sailed with three ships: the Niña, the Pinta and the Santa María. After about ten weeks, his crew spotted an island in the Bahamas. Columbus thought he was near Asia. He was wrong, but his voyages connected Europe and the Americas for good.",
        visual: {
          type: "flip",
          cards: [
            { front: "Spices", back: "Pepper, cinnamon and more from Asia. Europeans paid a fortune for them." },
            { front: "Sea route", back: "A way to sail to Asia, skipping the long land routes and their many traders." },
            { front: "Columbus, 1492", back: "Sailed west for Spain and reached an island in the Bahamas." },
            { front: "Three ships", back: "The Niña, the Pinta and the Santa María." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Europeans wanted {0} and silk from Asia. In {1}, Columbus sailed west for the king and queen of {2}. He landed in the {3}, but he thought he was near Asia.",
          blanks: [{ answers: ["spices"] }, { answers: ["1492"] }, { answers: ["Spain"] }, { answers: ["Bahamas"] }],
          bank: ["spices", "1492", "Spain", "Bahamas", "potatoes", "1776", "England", "Alaska"],
          hint: "In fourteen hundred ninety-two, Columbus sailed the ocean blue, for Spain, to an island in the Bahamas.",
          mistakes: [
            { match: "1776", coach: "1776 is when the Declaration of Independence was signed, almost 300 years later." },
            { match: "England", coach: "England paid for John Cabot. Columbus sailed for Spain." },
          ],
          seconds: 40,
        },
        think: {
          q: "Why did European rulers pay for explorers' voyages?",
          choices: ["They hoped to find a faster sea route to Asia's riches", "They wanted to move to the Americas themselves", "They were looking for the South Pole", "They wanted to test new sails"],
          answer: 0,
          why: "A sea route to Asia meant spices and silk without paying all the traders along the land routes.",
          hints: [
            "",
            "Most rulers stayed home. They wanted riches brought back to them.",
            "The South Pole wasn't reached until hundreds of years later.",
            "Voyages cost a lot. Rulers paid because they hoped to get rich.",
          ],
        },
        approaches: {
          analogy:
            "If the only road to the best store is long and has tolls every mile, you'd look for a shortcut. Europe's tolls were all the traders along the land routes, each raising the price.",
          example:
            "Pepper grown in India passed through many traders' hands before it reached Europe, and each one raised the price. A ship that sailed all the way could carry it straight home and skip the middlemen.",
          simpler: {
            q: "Which way did Columbus sail to try to reach Asia?",
            choices: ["East, over land", "West, across the Atlantic"],
            answer: 1,
            why: "Columbus sailed west across the Atlantic Ocean, hoping to reach Asia.",
            hints: ["The old way was east over land. Columbus tried something new.", ""],
          },
        },
      },
      {
        title: "Cabot and Hudson Search the North",
        teach:
          "Other explorers sailed for other countries. In 1497, John Cabot, an Italian sailor working for England, crossed the North Atlantic and reached the coast of North America, probably near Newfoundland, in what is now Canada. Because of his voyage, England later claimed land in North America. More than a hundred years later, Henry Hudson searched for a northern shortcut to Asia. In 1609, sailing for the Dutch on a ship called the Half Moon, he explored a wide river in New York. Today it is called the Hudson River, and the Dutch soon built trading posts along it. He never found a shortcut to Asia.",
        visual: {
          type: "timeline",
          events: [
            { year: 1492, label: "Columbus reaches the Bahamas", detail: "Sailing for Spain with the Niña, the Pinta and the Santa María." },
            { year: 1497, label: "Cabot reaches North America", detail: "Sailing for England, probably landing near Newfoundland." },
            { year: 1609, label: "Hudson explores the Hudson River", detail: "Sailing for the Dutch on the Half Moon." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each explorer to his voyage.",
          pairs: [
            { left: "Christopher Columbus", right: "Sailed for Spain in 1492 and landed in the Bahamas" },
            { left: "John Cabot", right: "Sailed for England in 1497 and reached Newfoundland" },
            { left: "Henry Hudson", right: "Sailed for the Dutch in 1609 and explored a river in New York" },
          ],
          hint: "Columbus came first, for Spain. Cabot sailed for England. Hudson sailed for the Dutch and has a river named after him.",
          seconds: 30,
        },
        think: {
          q: "Why was John Cabot's voyage important to England?",
          choices: ["It found a shortcut to Asia", "It gave England a claim to land in North America", "It discovered the Pacific Ocean", "It started the city of London"],
          answer: 1,
          why: "Because Cabot reached North America for England, England later claimed land there.",
          hints: [
            "No explorer of that time found a shortcut to Asia across North America.",
            "",
            "Cabot sailed the North Atlantic, not the Pacific.",
            "London was already an old city long before Cabot sailed.",
          ],
        },
        approaches: {
          analogy:
            "Planting your towel on the beach says this spot is ours. European rulers used explorers' voyages the same way, to say we got here first, this land is ours to claim.",
          example:
            "Because Hudson sailed for the Dutch, the Dutch claimed the land along his river. They built a colony called New Netherland, with a town called New Amsterdam on the island of Manhattan. Later the English took it over and renamed it New York.",
          simpler: {
            q: "Which river is named after Henry Hudson?",
            choices: ["The Mississippi River", "The Hudson River"],
            answer: 1,
            why: "Hudson explored the river in New York in 1609, and it carries his name.",
            hints: ["The Mississippi runs through the middle of the country, far from Hudson's voyage.", ""],
          },
        },
      },
      {
        title: "Jamestown, 1607",
        teach:
          "Exploring is not the same as staying. In 1607, about 100 English men and boys sailed up a river in Virginia and built a fort they named Jamestown, after King James. It became the first lasting English settlement in North America. The early years were very hard. The water was bad, many settlers fell sick, and some cared more about hunting for gold than planting food. Captain John Smith made a strict rule: whoever would not work would not eat. The colonists traded with the Powhatan people for corn, though the two sides also fought. Around 1612, John Rolfe began growing tobacco to sell in England, and that money crop helped the colony survive.",
        visual: {
          type: "hotspots",
          title: "Jamestown",
          center: "The fort",
          spots: [
            { label: "The fort", icon: "🏰", detail: "A wooden fort on the James River in Virginia, built in 1607." },
            { label: "John Smith", icon: "🧭", detail: "A tough captain who made the rule: whoever will not work will not eat." },
            { label: "The Powhatan", icon: "🌽", detail: "The Native nations of the area, led by Chief Powhatan. They traded corn with the colonists, but the two sides also fought." },
            { label: "Tobacco", icon: "🌿", detail: "John Rolfe's money crop, sold in England, which helped Jamestown survive." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the Jamestown story in order.",
          steps: [
            "English settlers sail up a river in Virginia and build a fort (1607)",
            "Bad water, sickness and hunger strike the colony",
            "John Smith makes the rule: no work, no food",
            "John Rolfe begins growing tobacco to sell in England",
            "Tobacco money helps Jamestown survive and grow",
          ],
          hint: "First they arrive, then hard times, then a strict leader, then a money crop that saves the colony.",
          seconds: 40,
        },
        think: {
          q: "What helped Jamestown finally survive?",
          choices: ["Finding lots of gold", "Moving back to England", "Hard work, trade and selling tobacco", "A new king"],
          answer: 2,
          why: "Smith's work rule, trading for corn, and Rolfe's tobacco crop kept the colony going.",
          hints: [
            "The colonists hoped for gold, but they never found any at Jamestown.",
            "If they had all moved back, there would be no colony left.",
            "",
            "King James stayed king. The change came from the colonists' own work.",
          ],
        },
        approaches: {
          analogy:
            "A new colony is like a new lemonade stand. Excitement is not enough. You need a plan, hard work, and something people will pay for. For Jamestown, that something was tobacco.",
          example:
            "John Rolfe planted a sweeter kind of tobacco that English buyers loved. It sold so well that colonists planted it almost everywhere they could, and money from England flowed back to Virginia.",
          simpler: {
            q: "Which country did the Jamestown settlers come from?",
            choices: ["England", "Spain"],
            answer: 0,
            why: "Jamestown was an English settlement, named after King James of England.",
            hints: ["", "Spain paid for Columbus, but Jamestown was English."],
          },
        },
      },
      {
        title: "Plymouth and the Mayflower Compact",
        teach:
          "In 1620, a group we call the Pilgrims sailed from England on the Mayflower. They wanted to worship God in their own way. After more than two months at sea, they landed far north of where they had planned. Before going ashore, the men signed the Mayflower Compact. They promised to make fair laws for the good of the colony and to obey them. It was an early step toward self-government in America. They built Plymouth, in what is now Massachusetts. About half of them died that first winter. In spring, Squanto, a Patuxet man who spoke English, showed them how to plant corn. The Wampanoag leader Massasoit made peace with them.",
        visual: {
          type: "compare",
          left: { title: "Jamestown", points: ["Founded 1607", "In Virginia", "Came hoping for riches", "Saved by hard work and tobacco"] },
          right: { title: "Plymouth", points: ["Founded 1620", "In Massachusetts", "Came to worship freely", "Mayflower Compact: fair laws for all"] },
        },
        probe: {
          type: "sort",
          prompt: "Jamestown or Plymouth? Sort each fact.",
          buckets: ["Jamestown", "Plymouth"],
          items: [
            { text: "Founded in 1607", bucket: 0 },
            { text: "In Virginia", bucket: 0 },
            { text: "John Smith's rule: no work, no food", bucket: 0 },
            { text: "Tobacco became a money crop", bucket: 0 },
            { text: "Founded in 1620", bucket: 1 },
            { text: "Pilgrims came to worship freely", bucket: 1 },
            { text: "The Mayflower Compact", bucket: 1 },
            { text: "Squanto taught them to plant corn", bucket: 1 },
          ],
          hint: "Jamestown came first, in Virginia. Plymouth came 13 years later, with the Pilgrims on the Mayflower.",
          seconds: 45,
        },
        think: {
          q: "What did the men promise in the Mayflower Compact?",
          choices: ["To find gold for the king", "To return to England in a year", "To build a fort called Jamestown", "To make fair laws and obey them"],
          answer: 3,
          why: "They agreed to make fair laws for the good of the colony and to obey them, an early kind of self-government.",
          hints: [
            "The Pilgrims came to worship freely, not to hunt for gold.",
            "They planned to stay and build a new home, not to go back.",
            "Jamestown was founded 13 years earlier, in Virginia.",
            "",
          ],
        },
        approaches: {
          analogy:
            "The Mayflower Compact was like a class writing its own rules on the first day and everyone signing them. Because they agreed together, the rules belonged to everyone.",
          example:
            "With no king's governor nearby, the Pilgrims needed rules right away. By signing the Compact, they agreed to choose leaders and make laws together, and to follow those laws, even when they did not like every one.",
          simpler: {
            q: "Which ship carried the Pilgrims?",
            choices: ["The Half Moon", "The Mayflower"],
            answer: 1,
            why: "The Pilgrims crossed the Atlantic on the Mayflower in 1620.",
            hints: ["The Half Moon was Henry Hudson's ship.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put these events in order, from earliest to latest.",
      steps: [
        "Columbus reaches the Bahamas (1492)",
        "Cabot reaches North America for England (1497)",
        "Jamestown is founded in Virginia (1607)",
        "Hudson explores the Hudson River (1609)",
        "The Pilgrims sign the Mayflower Compact (1620)",
        "The Pilgrims and the Wampanoag share a harvest feast (1621)",
      ],
    },
    explain: {
      prompt: "Explain why Europeans explored, and compare how Jamestown and Plymouth got started.",
      keyPoints: [
        "Europeans wanted a sea route to Asia's spices and riches",
        "Columbus sailed for Spain in 1492",
        "Jamestown (1607) survived through hard work, trade and tobacco",
        "The Pilgrims came to Plymouth (1620) to worship freely",
        "The Mayflower Compact promised fair laws that everyone would obey",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Place each event on the timeline.",
        min: 1480,
        max: 1630,
        step: 1,
        tolerance: 3,
        items: [
          { label: "Columbus reaches the Bahamas", value: 1492 },
          { label: "Cabot reaches North America", value: 1497 },
          { label: "Jamestown is founded", value: 1607 },
          { label: "Hudson explores his river", value: 1609 },
          { label: "Plymouth is founded", value: 1620 },
        ],
        hint: "The two explorers came in the 1490s. The settlements and Hudson came more than a hundred years later, in the 1600s.",
        seconds: 50,
      },
      {
        type: "match",
        prompt: "Match each person to what he did.",
        pairs: [
          { left: "Christopher Columbus", right: "Sailed west for Spain in 1492" },
          { left: "John Cabot", right: "Reached North America for England in 1497" },
          { left: "Henry Hudson", right: "Explored a New York river for the Dutch" },
          { left: "John Smith", right: "Made the Jamestown rule: no work, no food" },
          { left: "John Rolfe", right: "Grew tobacco to sell in England" },
          { left: "Squanto", right: "Taught the Pilgrims to plant corn" },
          { left: "Massasoit", right: "Wampanoag leader who made peace with Plymouth" },
        ],
        hint: "Three explorers, two Jamestown men, and two Native leaders who helped Plymouth.",
        seconds: 60,
      },
      {
        type: "number",
        prompt: "Jamestown was founded in 1607 and Plymouth in 1620. How many years apart were they founded?",
        answer: 13,
        unit: "years",
        hint: "Subtract: 1620 − 1607.",
        mistakes: [{ match: "23", coach: "Check your subtraction: 1620 − 1607 = 13." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "Before landing, the Pilgrims signed the {0} Compact. They promised to make fair {1} and obey them.",
        blanks: [{ answers: ["Mayflower"] }, { answers: ["laws"] }],
        bank: ["Mayflower", "laws", "Jamestown", "ships", "Half Moon"],
        hint: "The Compact was named for their ship, and it was about rules for the colony.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What were Europeans hoping to find by sailing west?",
        choices: ["The North Pole", "A sea route to Asia", "A new ocean to fish in"],
        answer: 1,
        why: "They wanted a faster sea route to Asia's spices, silk and riches.",
      },
      {
        q: "Which was the first lasting English settlement in North America?",
        choices: ["Plymouth", "New Amsterdam", "Jamestown"],
        answer: 2,
        why: "Jamestown, founded in Virginia in 1607, came 13 years before Plymouth.",
      },
      {
        q: "In 1609, Henry Hudson, sailing for the Dutch, explored...",
        choices: ["the coast of Florida", "a river in New York", "the Grand Canyon"],
        answer: 1,
        why: "Hudson sailed the Half Moon up the river in New York that now carries his name.",
      },
      {
        q: "Why did the Pilgrims come to America?",
        choices: ["To worship God in their own way", "To grow tobacco", "To find a route to Asia"],
        answer: 0,
        why: "The Pilgrims wanted the freedom to worship in their own way.",
      },
    ],
    task: {
      kind: "write",
      prompt:
        "Imagine you are a settler at Jamestown in 1607 or at Plymouth in 1620. Write a diary entry of 6 to 10 sentences about one day. Tell about your work, the weather, the food, and the people you meet. Use at least three real facts from the lesson.",
      rubric: [
        "Clearly set at Jamestown or Plymouth, in the right year",
        "Uses at least three real facts from the lesson",
        "Describes work, food and the people met",
        "Written in the first person, like a diary, in 6 to 10 sentences",
        "Shows how hard life was for the settlers",
      ],
    },
  },

  // 5. How a state government works
  {
    id: "soc-4.state-government",
    title: "How a State Government Works",
    minutes: 30,
    stage: "logic",
    standards: ["SS.4.9", "SS.4.10", "SS.4.11", "D2.Civ.1.3-5", "D2.Civ.3.3-5", "D2.Civ.5.3-5", "D2.Civ.12.3-5"],
    read: [
      "The United States has a national government in Washington, D.C., but each of the 50 states also has its own government. A state government handles many things close to home. It builds state highways, runs state parks, sets rules for schools, gives out driver's licenses and keeps the peace with state police.",
      "Every state has a constitution, a written plan that sets up its government and lists the rights of its people. Like the U.S. Constitution, a state constitution divides power among three branches, so that no one person or group holds too much power.",
      "The legislative branch makes laws. It is called the legislature, and its members are elected by the people. In every state but Nebraska, it has two parts, often called the Senate and the House of Representatives. The executive branch carries out the laws. It is led by the governor, who is elected by the people of the state. The judicial branch is made up of the state courts. Judges decide what laws mean and settle disagreements, and the state supreme court is usually the highest court in the state.",
      "A new law starts as an idea. A legislator writes the idea as a bill. A committee studies it, holds hearings and may change it. Then one house votes. If it passes, the other house votes. If both agree, the bill goes to the governor, who can sign it into law or veto it. Even after a veto, the legislature can still pass it with a larger vote.",
      "Citizens are part of state government too. Grown-ups vote for the governor and legislators, and anyone, even a kid, can write a letter to a legislator or speak at a hearing about an idea.",
    ].join("\n\n"),
    keyIdeas: [
      "A state constitution is the written plan for a state's government and the rights of its people.",
      "The legislature makes laws, the governor carries them out, and the courts decide what they mean.",
      "A bill becomes a law after committees study it, both houses pass it and the governor signs it.",
      "Citizens take part by voting, writing to leaders and speaking up at hearings.",
    ],
    hook: {
      text: "Who decides how fast you can drive on the highway, how many days kids go to school, or which bird is your state bird? Not the president. Those choices are made in your state capitol. Let's find out how your state's government works.",
    },
    teach: [
      {
        title: "A State Constitution and Three Branches",
        teach:
          "Each of the 50 states has its own government, and each one starts with a state constitution. A constitution is a written plan for government. It says what the government may do, how leaders are chosen, and what rights the people have. Like the U.S. Constitution, every state constitution splits power into three branches. The legislative branch makes the laws. The executive branch carries out the laws. The judicial branch decides what the laws mean. Splitting power works like a three-legged stool: each leg holds up the seat, and no single leg carries all the weight. That way no one person or group grows too powerful.",
        visual: {
          type: "hotspots",
          title: "A state government",
          center: "State constitution",
          spots: [
            { label: "Legislative branch", icon: "📜", detail: "The legislature. Elected lawmakers who write and pass the state's laws." },
            { label: "Executive branch", icon: "🏛️", detail: "Led by the governor. Carries out the laws and runs state agencies." },
            { label: "Judicial branch", icon: "⚖️", detail: "The state courts. Judges decide what laws mean and settle disagreements." },
            { label: "The people", icon: "🗳️", detail: "Citizens elect the governor and the legislators, and they can speak up about ideas." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each part of state government to its job.",
          pairs: [
            { left: "Legislative branch", right: "Makes the laws" },
            { left: "Executive branch", right: "Carries out the laws" },
            { left: "Judicial branch", right: "Decides what the laws mean" },
            { left: "State constitution", right: "The written plan for the state's government" },
          ],
          hint: "Legislative sounds like legislate, which means to make laws. Judicial sounds like judge.",
          mistakes: [{ match: "Executive and judicial swapped", coach: "Judges are in the judicial branch, deciding what laws mean. The executive branch, led by the governor, carries out the laws." }],
          seconds: 35,
        },
        think: {
          q: "Why is power split into three branches?",
          choices: ["So the government can work faster", "So no one person or group grows too powerful", "So there are more buildings", "Because the state is big"],
          answer: 1,
          why: "Each branch has its own job and can check the others, so power stays balanced.",
          hints: [
            "Splitting power can actually slow things down, and that's on purpose.",
            "",
            "The number of buildings has nothing to do with it. Think about power.",
            "Small states have three branches too. The reason is about balance of power.",
          ],
        },
        approaches: {
          analogy:
            "Think of a three-legged stool. Each leg holds up the seat, and if one leg tried to do it all, the stool would tip over. Three branches share the weight of governing.",
          example:
            "Suppose the legislature passes a law that kids must wear helmets when riding bikes. The governor's agencies carry it out and spread the word. If someone disagrees about what the law covers, a judge decides what it means.",
          simpler: {
            q: "Which branch makes the laws?",
            choices: ["The judicial branch", "The legislative branch"],
            answer: 1,
            why: "The legislative branch, the legislature, makes the laws.",
            hints: ["The judicial branch is the courts. Judges decide what laws mean.", ""],
          },
        },
      },
      {
        title: "The Legislature, the Governor and the Courts",
        teach:
          "Now meet the people in each branch. The legislature is a group of lawmakers elected by voters from different parts of the state. In every state except Nebraska, the legislature has two houses, often called the Senate and the House of Representatives. The governor leads the executive branch. Voters elect the governor, who signs or vetoes bills, plans how the state spends its money, and is in charge of state agencies like the highway department and the state police. The judicial branch is the state courts. Judges hear cases and decide what the laws mean. The highest court in most states is called the state supreme court.",
        visual: {
          type: "flip",
          cards: [
            { front: "Legislature", back: "The state's lawmakers, elected by voters from different parts of the state." },
            { front: "Senate and House", back: "The two houses of the legislature in 49 states." },
            { front: "Nebraska", back: "The only state with a one-house legislature." },
            { front: "Governor", back: "The elected leader of the executive branch." },
            { front: "Veto", back: "When the governor says no to a bill." },
            { front: "State supreme court", back: "The highest court in most states." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Which branch does each job belong to?",
          buckets: ["Legislative", "Executive", "Judicial"],
          items: [
            { text: "Writes and votes on bills", bucket: 0 },
            { text: "The Senate and the House", bucket: 0 },
            { text: "The governor signs or vetoes bills", bucket: 1 },
            { text: "Runs the state police and highway department", bucket: 1 },
            { text: "Judges hear cases", bucket: 2 },
            { text: "The state supreme court", bucket: 2 },
            { text: "Decides what a law means", bucket: 2 },
          ],
          hint: "Lawmakers are legislative, the governor is executive, and judges are judicial.",
          mistakes: [{ match: "Governor sorted as legislative", coach: "The governor signs or vetoes bills, but leads the executive branch. Lawmakers write the bills." }],
          seconds: 40,
        },
        think: {
          q: "Who leads a state's executive branch?",
          choices: ["A judge", "The president", "The governor", "The mayor"],
          answer: 2,
          why: "Each state's voters elect a governor to lead the executive branch.",
          hints: [
            "Judges work in the judicial branch, the courts.",
            "The president leads the national government, not a state.",
            "",
            "A mayor leads a city or town, not a whole state.",
          ],
        },
        approaches: {
          analogy:
            "Think of a soccer league. One group writes the rules of the game, the league office makes sure games happen by those rules, and referees decide what a rule means when there's a dispute.",
          example:
            "Nebraska is the only state with a one-house legislature, often called the Unicameral. Every other state has two houses, which must both pass a bill before it goes to the governor.",
          simpler: {
            q: "Which state has a legislature with only one house?",
            choices: ["Nebraska", "Texas"],
            answer: 0,
            why: "Nebraska is the only state with a one-house legislature.",
            hints: ["", "Texas has two houses, a Senate and a House of Representatives."],
          },
        },
      },
      {
        title: "How a Bill Becomes a Law",
        teach:
          "A law starts as an idea, and the idea can come from anyone, even a student. A legislator writes the idea down as a bill. Next, a small group of lawmakers called a committee studies the bill. They hold hearings where citizens can speak, and they may change the bill. Then the whole house debates and votes. If most members vote yes, the bill goes to the other house, which studies it and votes too. If both houses pass it, the bill goes to the governor. If the governor signs it, it becomes a law. If the governor vetoes it, the legislature can still make it a law by passing it again with a larger vote.",
        visual: {
          type: "flip",
          cards: [
            { front: "1. Idea", back: "Anyone, even a student, can suggest an idea for a law." },
            { front: "2. Bill", back: "A legislator writes the idea down as a bill." },
            { front: "3. Committee", back: "A small group of lawmakers studies the bill, holds hearings and may change it." },
            { front: "4. Both houses vote", back: "First one house, then the other, must pass the bill." },
            { front: "5. Governor", back: "Signs the bill into law, or vetoes it." },
            { front: "Veto override", back: "After a veto, the legislature can still pass the bill with a larger vote." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps in order to turn an idea into a state law.",
          steps: [
            "A citizen has an idea for a law",
            "A legislator writes it as a bill",
            "A committee studies the bill and holds a hearing",
            "The first house votes yes",
            "The second house votes yes",
            "The governor signs it into law",
          ],
          hint: "Idea, bill, committee, then two votes, then the governor's signature.",
          seconds: 45,
        },
        think: {
          q: "What happens if the governor vetoes a bill?",
          choices: ["It can never become a law", "The courts automatically make it a law", "The legislature can still pass it with a larger vote", "The bill goes back to being just an idea"],
          answer: 2,
          why: "A veto can be overridden if enough lawmakers vote for the bill again.",
          hints: [
            "A veto is strong, but it is not the final word. Lawmakers have one more chance.",
            "Courts don't make laws. They decide what laws mean.",
            "",
            "The bill stays a bill. The legislature can still vote on it again.",
          ],
        },
        approaches: {
          analogy:
            "Making a law is like a recipe going into a family cookbook. Someone suggests it, a few cooks test it and tweak it, the whole family tastes it, and finally the head cook approves it.",
          example:
            "Suppose a class wants the honeybee to be the state insect. The students write to their legislator, who writes a bill. At the committee hearing, the students explain why. Both houses vote yes, and the governor signs it. Now it is the law.",
          simpler: {
            q: "Who signs a bill into law in a state?",
            choices: ["A judge", "The governor"],
            answer: 1,
            why: "After both houses pass a bill, the governor signs it into law.",
            hints: ["Judges decide what laws mean. They don't sign bills.", ""],
          },
        },
      },
      {
        title: "Citizens Have a Part to Play",
        teach:
          "State government belongs to the people of the state. Grown-up citizens vote to elect the governor and the legislators, and if leaders do a poor job, voters can choose someone else at the next election. Citizens can also write letters or emails to their legislators, speak at committee hearings, and serve on juries in state courts. Kids can take part too. You can learn the names of your governor and your legislators, write a polite letter about an idea, and visit your state capitol, the building where the legislature meets. Good citizens also obey the laws, pay their taxes, and help their communities.",
        visual: {
          type: "compare",
          left: { title: "Grown-up citizens can", points: ["Vote for the governor and legislators", "Serve on juries", "Speak at hearings", "Write to their legislators"] },
          right: { title: "Kids can", points: ["Learn their leaders' names", "Write a polite letter with an idea", "Visit the state capitol", "Obey the laws and help their community"] },
        },
        probe: {
          type: "highlight",
          prompt: "Tap the THREE ways a kid can take part in state government.",
          sentences: [
            "Write a polite letter to a legislator about an idea.",
            "Vote for governor in the next election.",
            "Visit the state capitol to watch the legislature.",
            "Learn the names of the governor and local legislators.",
            "Sign a bill into law.",
          ],
          correct: [0, 2, 3],
          hint: "Voting is for grown-up citizens, and only the governor signs bills. The rest are open to kids.",
          mistakes: [{ match: "Vote for governor", coach: "Voting is for citizens 18 and older. Kids can still write letters, visit the capitol and learn about their leaders." }],
          seconds: 35,
        },
        think: {
          q: "How can voters change leaders who do a poor job?",
          choices: ["Elect someone else at the next election", "Ask a court to pick a new governor", "Write a new constitution every year", "Nothing can be done"],
          answer: 0,
          why: "Elections let the people choose new leaders.",
          hints: [
            "",
            "Courts decide what laws mean. Voters choose the governor.",
            "Constitutions are meant to last. Elections are the regular way to choose leaders.",
            "Voters have real power: every election is a chance to choose.",
          ],
        },
        approaches: {
          analogy:
            "It's like a team choosing its captain each season. If the captain doesn't lead well, the team can pick someone else next season. Elections let the people pick their leaders again and again.",
          example:
            "A girl notices her town's park has no bike rack. She writes a polite letter to her state representative, explains the problem and suggests a fix. The representative writes back and asks the state parks department to look into it.",
          simpler: {
            q: "Where does the state legislature meet?",
            choices: ["The White House", "The state capitol"],
            answer: 1,
            why: "Each state's legislature meets in the state capitol building.",
            hints: ["The White House is the president's home in Washington, D.C.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Who does each job: the legislature, the governor or the courts?",
      buckets: ["Legislature", "Governor", "Courts"],
      items: [
        { text: "Writes bills", bucket: 0 },
        { text: "Holds committee hearings", bucket: 0 },
        { text: "Votes to override a veto", bucket: 0 },
        { text: "Signs bills into law", bucket: 1 },
        { text: "Vetoes a bill", bucket: 1 },
        { text: "Leads the state police and highway department", bucket: 1 },
        { text: "Hears cases", bucket: 2 },
        { text: "Decides what a law means", bucket: 2 },
        { text: "The state supreme court", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Name the three branches of your state's government and explain how an idea becomes a state law.",
      keyPoints: [
        "The legislature makes laws, the governor carries them out, and the courts decide what they mean",
        "A legislator writes the idea as a bill",
        "A committee studies the bill",
        "Both houses of the legislature vote",
        "The governor signs it or vetoes it",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "The {0} leads the executive branch. The {1} makes the laws. The state {2} court is usually the highest court.",
        blanks: [{ answers: ["governor"] }, { answers: ["legislature"] }, { answers: ["supreme"] }],
        bank: ["governor", "legislature", "supreme", "president", "mayor", "small"],
        hint: "A state is led by a governor, not a president. Its highest court has a word meaning highest.",
        mistakes: [{ match: "president", coach: "The president leads the whole country. A state's executive is the governor." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each word to its meaning.",
        pairs: [
          { left: "Bill", right: "An idea for a law, written down" },
          { left: "Veto", right: "When the governor says no to a bill" },
          { left: "Committee", right: "A small group of lawmakers who study a bill" },
          { left: "Constitution", right: "The written plan for the government" },
          { left: "Capitol", right: "The building where the legislature meets" },
        ],
        hint: "A bill is a would-be law. A veto is a no. The capitol is a building.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put these steps in order.",
        steps: ["A legislator writes a bill", "A committee studies it", "Both houses pass it", "The governor signs it"],
        hint: "Write it, study it, vote on it, sign it.",
        seconds: 25,
      },
      {
        type: "number",
        prompt: "How many branches does a state government have?",
        answer: 3,
        unit: "branches",
        hint: "One makes laws, one carries them out, and one decides what they mean.",
        seconds: 15,
      },
    ],
    check: [
      {
        q: "What sets up a state's government and lists the rights of its people?",
        choices: ["The state flag", "A committee", "The state constitution"],
        answer: 2,
        why: "A state constitution is the written plan for the state's government.",
      },
      {
        q: "Which branch decides what laws mean?",
        choices: ["Judicial", "Legislative", "Executive"],
        answer: 0,
        why: "The judicial branch, the courts, decides what laws mean.",
      },
      {
        q: "What can the governor do with a bill that both houses passed?",
        choices: ["Hold a trial about it", "Sign it or veto it", "Add it to the U.S. Constitution"],
        answer: 1,
        why: "The governor either signs the bill into law or vetoes it.",
      },
      {
        q: "Which state has a one-house legislature?",
        choices: ["Ohio", "Florida", "Nebraska", "Maine"],
        answer: 2,
        why: "Nebraska is the only state whose legislature has just one house.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a parent, look up your state's governor, your state senator, your state representative, and the city where your state capitol is. Then write a short, polite letter to one of your legislators about an idea that would help your community. You don't have to send it. Read it aloud to a parent.",
      rubric: [
        "Names the governor, a state senator, a state representative and the capital city",
        "The letter is polite and addressed to a real legislator",
        "The letter explains a clear idea and why it would help",
        "Read aloud clearly to a parent",
      ],
    },
  },

  // 6. A state's economy
  {
    id: "soc-4.state-economy",
    title: "A State's Economy: Resources, Industries and Trade",
    minutes: 30,
    stage: "rhetoric",
    standards: ["SS.4.12", "SS.4.13", "D2.Eco.1.3-5", "D2.Eco.3.3-5", "D2.Eco.4.3-5", "D2.Eco.14.3-5", "D2.Geo.11.3-5"],
    read: [
      "An economy is the way people in a place make, buy, sell and use goods and services. Every state has its own economy, and much of it grows out of geography.",
      "To make anything, people need resources. Natural resources come from nature: soil, water, forests, fish, oil and minerals. Human resources are the people who do the work, with their skills and knowledge. Capital resources are the tools, machines and buildings people use, like tractors, ovens and factories.",
      "An industry is a group of businesses that make the same kind of goods or services. Farming, fishing, mining, manufacturing and tourism are all industries. A state's natural resources often shape its industries. Iowa's rich soil makes it the top corn state. Idaho is famous for potatoes, Washington for apples, and Wisconsin for cheese from its dairy farms. Texas pumps oil from under its land. Michigan became the center of the American car industry, building cars in and around Detroit. Florida's sunshine and beaches draw visitors, so tourism is a big industry there.",
      "Because each state is good at certain things, states specialize. To specialize means to focus on making a few things well. Then they trade. Iowa sells corn to other states and buys cars from Michigan and oranges from Florida. States trade with other countries too. Goods sold to another country are exports, and goods bought from another country are imports.",
      "Trade makes states depend on each other. A cereal box in your kitchen might hold grain from Kansas, sugar from Louisiana and cardboard from trees in Georgia. Trading lets everyone enjoy more goods than any one state could make alone. Every choice has a cost, too: a farmer who plants corn on a field can't plant wheat there the same year.",
    ].join("\n\n"),
    keyIdeas: [
      "Making goods takes natural, human and capital resources.",
      "A state's geography and resources shape its industries.",
      "States specialize and trade, with each other and with other countries (exports and imports).",
      "Trade makes states depend on each other, so faraway places reach our kitchen table.",
    ],
    hook: {
      text: "Look at your breakfast. The cereal, the milk, the orange juice, even the box. How many states do you think helped make it? Probably more than you'd guess! Today we follow the trail of goods and find out what makes a state's economy tick.",
    },
    teach: [
      {
        title: "Three Kinds of Resources",
        teach:
          "An economy is how people in a place make, buy, sell and use goods and services. To make anything, you need resources, and there are three kinds. Natural resources come from nature, like soil, water, trees, fish, oil and minerals. Human resources are the people who do the work, with all their skills and know-how. Capital resources are things people make and then use to make other things, like tractors, ovens, computers and factories. Think about a bakery. The wheat in the flour is a natural resource. The baker is a human resource. The oven is a capital resource. Every business needs all three.",
        visual: {
          type: "hotspots",
          title: "Resources in a bakery",
          center: "Bakery",
          spots: [
            { label: "Wheat", icon: "🌾", detail: "A natural resource. It grows from the soil and becomes flour." },
            { label: "Water", icon: "💧", detail: "A natural resource. Every loaf of bread needs it." },
            { label: "The baker", icon: "👩‍🍳", detail: "A human resource. Her skill and hard work turn flour into bread." },
            { label: "The oven", icon: "🔥", detail: "A capital resource. A tool people made to help make other things." },
            { label: "Delivery truck", icon: "🚚", detail: "A capital resource. It carries the bread to stores." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Natural, human or capital? Sort each resource.",
          buckets: ["Natural resource", "Human resource", "Capital resource"],
          items: [
            { text: "Oil under the ground", bucket: 0 },
            { text: "Fish in a lake", bucket: 0 },
            { text: "A forest of pine trees", bucket: 0 },
            { text: "A skilled carpenter", bucket: 1 },
            { text: "A farmer's know-how", bucket: 1 },
            { text: "A tractor", bucket: 2 },
            { text: "A factory building", bucket: 2 },
            { text: "A fishing boat", bucket: 2 },
          ],
          hint: "Ask: did nature make it (natural), is it a person's work and skill (human), or is it a tool people built (capital)?",
          mistakes: [
            { match: "Fishing boat sorted as natural", coach: "The fish are natural, but the boat was built by people to help catch them. That makes it capital." },
            { match: "Tractor sorted as human", coach: "The farmer driving it is a human resource, but the tractor is a machine, a capital resource." },
          ],
          seconds: 45,
        },
        think: {
          q: "A tractor on a farm is which kind of resource?",
          choices: ["Natural", "Human", "Capital", "Money"],
          answer: 2,
          why: "A tractor is a machine people made to help produce other goods, so it is a capital resource.",
          hints: [
            "Nature doesn't make tractors. People build them in factories.",
            "Human resources are people and their skills. The tractor is a machine.",
            "",
            "Money buys things, but a tractor is a tool used to make goods.",
          ],
        },
        approaches: {
          analogy:
            "Making a sandwich takes all three. The bread and lettuce came from nature, you are the worker, and the knife and cutting board are your tools.",
          example:
            "At a lumber mill, the trees are natural resources, the workers who cut and stack the boards are human resources, and the saws and forklifts are capital resources.",
          simpler: {
            q: "Is a forest a natural resource?",
            choices: ["Yes, it comes from nature", "No, people build forests"],
            answer: 0,
            why: "Forests grow in nature, so they are natural resources.",
            hints: ["", "People can plant trees, but forests grow by nature. They are natural resources."],
          },
        },
      },
      {
        title: "Industries Grow from Geography",
        teach:
          "An industry is a group of businesses that make the same kind of goods or give the same kind of services. Farming, mining, fishing, manufacturing and tourism are all industries. A state's geography often decides its biggest industries. Iowa has deep, rich soil, so it grows more corn than any other state. Idaho is famous for potatoes, Washington for apples, and Wisconsin for cheese from its dairy farms. Texas pumps oil from deep underground. Michigan, with Great Lakes ports for shipping iron ore and coal, became the center of America's car industry. Florida's sunshine and beaches make tourism one of its biggest industries.",
        visual: {
          type: "flip",
          cards: [
            { front: "Iowa", back: "Corn. Deep, rich soil makes it the top corn state." },
            { front: "Idaho", back: "Potatoes, grown in its rich volcanic soil." },
            { front: "Washington", back: "Apples, from orchards east of the mountains." },
            { front: "Wisconsin", back: "Cheese, made from the milk of its many dairy farms." },
            { front: "Texas", back: "Oil, pumped from deep underground." },
            { front: "Michigan", back: "Cars, built in and around Detroit, the Motor City." },
            { front: "Florida", back: "Tourism. Sunshine and beaches bring millions of visitors." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each state to an industry it is famous for.",
          pairs: [
            { left: "Iowa", right: "Corn" },
            { left: "Idaho", right: "Potatoes" },
            { left: "Wisconsin", right: "Cheese" },
            { left: "Texas", right: "Oil" },
            { left: "Michigan", right: "Cars" },
            { left: "Florida", right: "Tourism" },
          ],
          hint: "Think about each state's land: rich farm soil, dairy pastures, oil underground, Great Lakes ports, sunny beaches.",
          seconds: 40,
        },
        think: {
          q: "Why is tourism a big industry in Florida?",
          choices: ["It has the tallest mountains", "It has the most snow", "It makes the most cars", "Its sunshine and beaches draw visitors"],
          answer: 3,
          why: "Warm weather and beaches bring millions of visitors who spend money on hotels, food and fun.",
          hints: [
            "Florida is mostly flat. The tallest mountains are out West and in Alaska.",
            "Florida is warm, and it almost never snows there.",
            "Michigan is the famous car state.",
            "",
          ],
        },
        approaches: {
          analogy:
            "It's like setting up a lemonade stand. You'd put it on a hot, busy corner, not on a snowy day in a quiet alley. States build industries that fit their land and weather.",
          example:
            "Wisconsin has cool summers and green pastures, which are great for dairy cows. Lots of cows means lots of milk, and lots of milk turned into cheese made Wisconsin famous for it.",
          simpler: {
            q: "What is an industry?",
            choices: ["A group of businesses that make the same kind of thing", "A single store"],
            answer: 0,
            why: "An industry is many businesses making the same kind of goods or services, like all the car makers.",
            hints: ["", "One store is a business. An industry is a whole group of them."],
          },
        },
      },
      {
        title: "Specialize and Trade",
        teach:
          "No state can make everything its people want, so states specialize. To specialize means to focus on making a few things you are good at. Then states trade. Iowa farmers sell corn to people in other states and use the money to buy cars from Michigan and oranges from Florida. States also trade with other countries. Goods a country sells to another country are called exports. Goods it buys from another country are called imports. For example, American farmers export soybeans to countries across the ocean, and Americans import bananas, which grow best in warm, tropical places like Central America. Trade gives everyone more choices.",
        visual: {
          type: "compare",
          left: { title: "Exports (sold to other countries)", points: ["Soybeans", "Corn", "Airplanes", "Machines"] },
          right: { title: "Imports (bought from other countries)", points: ["Bananas", "Coffee", "Cocoa for chocolate", "Some toys and clothes"] },
        },
        probe: {
          type: "cloze",
          text: "When a state focuses on making a few things well, it {0}. Goods sold to another country are {1}, and goods bought from another country are {2}.",
          blanks: [{ answers: ["specializes", "specialize"] }, { answers: ["exports"] }, { answers: ["imports"] }],
          bank: ["specializes", "exports", "imports", "votes", "taxes", "budgets"],
          hint: "Exports go EXit, out of the country. Imports come IN.",
          mistakes: [
            { match: "imports", coach: "Imports come in. Goods sold and shipped out are exports." },
            { match: "taxes", coach: "Taxes are money paid to the government, not goods that are traded." },
          ],
          seconds: 35,
        },
        think: {
          q: "Bananas grown in Ecuador and sold in Ohio are, for the United States, an...",
          choices: ["Export", "Import", "Industry", "Natural resource of Ohio"],
          answer: 1,
          why: "The bananas are bought from another country and brought in, so they are imports.",
          hints: [
            "Exports go out of the country. These bananas are coming in.",
            "",
            "An industry is a group of businesses, not a product being traded.",
            "Bananas don't grow in Ohio's climate. They came from far away.",
          ],
        },
        approaches: {
          analogy:
            "Two friends at lunch: one has extra apples, the other has extra crackers. They swap, and both end up with a better lunch than either had alone. That's trade.",
          example:
            "An Iowa farmer grows far more corn than her family could ever eat. She sells it, and the money buys a car made in Michigan, oranges from Florida and a banana from Central America.",
          simpler: {
            q: "What does specialize mean?",
            choices: ["Make everything yourself", "Focus on making a few things well"],
            answer: 1,
            why: "To specialize is to focus on a few things you do well, then trade for the rest.",
            hints: ["Making everything yourself is the opposite of specializing.", ""],
          },
        },
      },
      {
        title: "States Depend on Each Other",
        teach:
          "Because states specialize and trade, they depend on each other. This is called interdependence. Look at a box of cereal at breakfast. The grain might come from farms in Kansas or North Dakota. The sugar might come from sugarcane in Louisiana or sugar beets in Minnesota. The cardboard box might be made from pine trees in Georgia. Trucks, trains and ships carry it all across the country, and many workers help along the way. If a drought ruins a harvest in one state, prices can rise in stores everywhere. Trade connects your kitchen table to farms, forests and factories far away.",
        visual: {
          type: "hotspots",
          title: "Where breakfast comes from",
          center: "Cereal box",
          spots: [
            { label: "Grain", icon: "🌾", detail: "From wheat or corn farms in states like Kansas and North Dakota." },
            { label: "Sugar", icon: "🍬", detail: "From sugarcane in Louisiana or sugar beets in Minnesota." },
            { label: "The box", icon: "📦", detail: "Cardboard made from pine trees in states like Georgia." },
            { label: "Transport", icon: "🚚", detail: "Trucks, trains and ships carry every part across the country." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the journey of a cereal box in order.",
          steps: [
            "A farmer grows wheat in Kansas",
            "A train carries the grain to a factory",
            "The factory makes cereal and fills the boxes",
            "A truck carries the boxes to a store",
            "A family buys the cereal for breakfast",
          ],
          hint: "Follow the grain from the field, to the factory, to the store, to your bowl.",
          seconds: 35,
        },
        think: {
          q: "If a drought ruins the wheat harvest in Kansas, what might happen in stores far away?",
          choices: ["Nothing at all, since the stores are far away", "Bread and cereal might cost more", "Stores would have more wheat", "Kansas would export more wheat"],
          answer: 1,
          why: "Less wheat means it is harder to get, so things made from wheat can cost more everywhere.",
          hints: [
            "Stores far away buy wheat from Kansas, so they feel the drought too.",
            "",
            "A ruined harvest means less wheat, not more.",
            "With less wheat, Kansas would have less to sell, not more.",
          ],
        },
        approaches: {
          analogy:
            "Interdependence is like a relay race. Each runner carries the baton part of the way. If one runner trips, the whole team slows down.",
          example:
            "When orange groves have a bad freeze, fewer oranges are picked. Juice factories get less fruit, and a carton of orange juice can cost more in stores in Maine, Ohio and Oregon.",
          simpler: {
            q: "Do states depend on each other for goods?",
            choices: ["No, every state makes everything it needs", "Yes, they trade for things they don't make"],
            answer: 1,
            why: "States specialize, so they trade with each other for the rest.",
            hints: ["No state makes everything. Think of where your cereal and juice come from.", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the THREE sentences that show specializing and trading.",
      sentences: [
        "Iowa farmers sell corn to other states and buy cars from Michigan.",
        "Washington grows apples and ships them all over the country.",
        "A family plants a small garden to feed itself.",
        "The United States imports bananas from tropical countries.",
        "A kid builds a birdhouse to keep in the backyard.",
      ],
      correct: [0, 1, 3],
    },
    explain: {
      prompt: "Pick a state. Explain one of its natural resources, an industry that uses it, and how trade connects it to other places.",
      keyPoints: [
        "Names a natural resource of the state",
        "Names an industry that grows from it",
        "Explains that states specialize in what they do well",
        "Explains trade, exports or imports",
        "Says that states depend on each other",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Natural, human or capital? Sort each resource.",
        buckets: ["Natural", "Human", "Capital"],
        items: [
          { text: "Copper in a mountain", bucket: 0 },
          { text: "River water", bucket: 0 },
          { text: "A nurse's training", bucket: 1 },
          { text: "A truck driver", bucket: 1 },
          { text: "A computer in an office", bucket: 2 },
          { text: "An oven in a bakery", bucket: 2 },
        ],
        hint: "Nature made it, a person does it, or people built it as a tool.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each word to its meaning.",
        pairs: [
          { left: "Economy", right: "How people make, buy, sell and use goods and services" },
          { left: "Industry", right: "A group of businesses making the same kind of thing" },
          { left: "Specialize", right: "Focus on making a few things well" },
          { left: "Export", right: "A good sold to another country" },
          { left: "Import", right: "A good bought from another country" },
          { left: "Interdependence", right: "Depending on each other for goods" },
        ],
        hint: "Exports exit; imports come in. Interdependence means depending on each other.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "Iowa's rich {0} helps it grow corn, and Michigan is famous for making {1}.",
        blanks: [{ answers: ["soil"] }, { answers: ["cars"] }],
        bank: ["soil", "cars", "oranges", "snow", "potatoes"],
        hint: "Corn needs good dirt to grow. Detroit is called the Motor City.",
        seconds: 20,
      },
      {
        type: "number",
        prompt: "A farm sells 50 bushels of corn for $4 a bushel. How many dollars does the farm earn?",
        answer: 200,
        unit: "dollars",
        hint: "Multiply the number of bushels by the price of each one: 50 × 4.",
        mistakes: [{ match: "54", coach: "You added. Each of the 50 bushels earns $4, so multiply." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which is a capital resource?",
        choices: ["A river", "A tractor", "A farmer's skill"],
        answer: 1,
        why: "A tractor is a tool people built to help make goods.",
      },
      {
        q: "Goods a country sells to other countries are called...",
        choices: ["imports", "taxes", "exports"],
        answer: 2,
        why: "Exports are goods sent out and sold to other countries.",
      },
      {
        q: "Why do states specialize?",
        choices: ["They can make a few things well and trade for the rest", "A law says each state may make only one thing", "They have no natural resources"],
        answer: 0,
        why: "Focusing on what they do best, then trading, gives everyone more and better goods.",
      },
      {
        q: "Which state is famous for its car industry?",
        choices: ["Idaho", "Hawaii", "Arizona", "Michigan"],
        answer: 3,
        why: "Michigan, around Detroit, the Motor City, became the center of the American car industry.",
      },
    ],
    task: {
      kind: "project",
      prompt:
        "With a parent, look at five foods or products in your kitchen. Use the labels to find where each one was made or grown. Make a chart with four columns: product, where it came from, the natural resource behind it, and whether it came from your state, another state or another country. Then tell a parent about one big industry in your own state.",
      rubric: [
        "The chart lists five real products from the kitchen",
        "Each product has where it came from and a natural resource",
        "Each product is marked as from our state, another state, or an import",
        "Names a real industry in your own state and explains why it is there",
      ],
    },
  },
]);
