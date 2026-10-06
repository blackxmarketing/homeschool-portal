import { k5Course } from "./base";

/**
 * soc-3: Grade 3 social studies with Ranger Clark. Landforms, regions and
 * maps; how geography shapes where people live; scarcity, choices and trade;
 * the story of your town and state (written to fit any state); local and
 * state government and its three branches; and being an active citizen.
 */
export const soc3 = k5Course("soc", 3, [
  // 1. Landforms, water, map tools and regions
  {
    id: "soc-3.landforms",
    title: "Landforms, Maps and Regions",
    minutes: 30,
    stage: "grammar",
    standards: ["SS.3.1", "SS.3.2", "SS.3.3", "D2.Geo.1.3-5", "D2.Geo.2.3-5", "D2.Geo.3.3-5", "D2.Geo.12.3-5"],
    read: [
      "The surface of the Earth has many shapes. These shapes are called landforms. A mountain is very high land with steep sides, and a hill is lower and rounder. A valley is low land between hills or mountains. A plain is wide, flat land. A plateau is high land that is flat on top, like a giant table. A canyon is a deep valley with steep rock walls, often carved by a river.",
      "Water has shapes too. An ocean is a huge body of salt water. A lake is water with land all around it. A river is moving water that flows downhill. It starts at its source and ends at its mouth, where it empties into a lake, a larger river or the ocean. A smaller river that flows into a bigger one is a tributary. An island is land with water all around it, and a peninsula is land with water on three sides.",
      "Maps help us find all of these. The map key, or legend, tells what each symbol means. The compass rose shows north, south, east and west, plus in-between directions like northeast and southwest. The map scale tells how far a real distance is. If 1 inch stands for 10 miles, then 3 inches on the map is 30 miles.",
      "A region is an area that shares features, like land, climate or the work people do. The United States is often split into five regions. The Northeast has old cities and a rocky coast. The Southeast is warm, with long beaches. The Midwest has flat plains and big farms. The Southwest is dry, with deserts and canyons. The West has tall mountains and the Pacific coast.",
    ].join("\n\n"),
    keyIdeas: [
      "Landforms are the shapes of the land: mountains, hills, valleys, plains, plateaus and canyons.",
      "Bodies of water include oceans, lakes and rivers; islands and peninsulas are land shaped by water.",
      "A map key, a compass rose and a map scale help us read any map.",
      "A region is an area with shared features, like the five regions of the United States.",
    ],
    hook: {
      text: "Imagine you are a mapmaker on a long trip west, like the explorers of 1804. You climb tall mountains, cross wide flat land and paddle up rivers. How would you tell people back home what you saw? You would need words for every shape of land and water, and a good map!",
    },
    teach: [
      {
        title: "The Shapes of the Land",
        teach:
          "Landforms are the natural shapes of the land. A mountain is very high land with steep sides. A hill is like a smaller, rounder mountain. Between hills or mountains you find a valley, a low place where rivers often flow. A plain is wide, flat land, great for farms. A plateau is high land with a flat top, like a giant table. A canyon is a deep, narrow valley with steep rock walls. The Grand Canyon in Arizona was carved by the Colorado River over a very long time.",
        visual: {
          type: "flip",
          cards: [
            { front: "⛰️ Mountain", back: "Very high land with steep sides." },
            { front: "🌄 Hill", back: "Raised land that is lower and rounder than a mountain." },
            { front: "🏞️ Valley", back: "Low land between hills or mountains, often with a river." },
            { front: "🌾 Plain", back: "Wide, flat land. Good for farming." },
            { front: "🟫 Plateau", back: "High land with a flat top, like a table." },
            { front: "🏜️ Canyon", back: "A deep, narrow valley with steep rock walls, often carved by a river." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each landform to what it looks like.",
          pairs: [
            { left: "Mountain", right: "Very high land with steep sides" },
            { left: "Valley", right: "Low land between hills or mountains" },
            { left: "Plain", right: "Wide, flat land" },
            { left: "Plateau", right: "High land with a flat top" },
            { left: "Canyon", right: "A deep valley with steep rock walls" },
          ],
          hint: "Think high or low, flat or steep. A plateau is high AND flat. A plain is flat but not high.",
          mistakes: [
            { match: "Plain matched to high land with a flat top", coach: "A plain is flat, but it is low. High land with a flat top is a plateau." },
            { match: "Valley matched to a deep valley with steep rock walls", coach: "A canyon is a special, deep kind of valley with rock walls. A regular valley is just low land between hills." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which landform is high land with a flat top?",
          choices: ["A valley", "A plain", "A plateau", "A canyon"],
          answer: 2,
          why: "A plateau is high land with a flat top, like a table.",
          hints: [
            "A valley is low land, not high land. Look for something high.",
            "A plain is flat, but it is low. This one is high AND flat.",
            "",
            "A canyon is a deep cut into the land, not a high flat top.",
          ],
        },
        approaches: {
          analogy:
            "Think of a bedroom with a blanket. The bumps where your knees are look like hills and mountains. The dips between them are valleys. A flat part of the blanket is a plain, and a flat-topped box under the blanket makes a plateau.",
          example:
            "Picture a drive across the country. Kansas is mostly wide, flat plains with farms. Then in Colorado, the Rocky Mountains rise high and steep. Between the peaks are valleys with rivers. That one trip shows three landforms.",
          simpler: {
            q: "Is a mountain high land or low land?",
            choices: ["High land", "Low land"],
            answer: 0,
            why: "A mountain is very high land with steep sides.",
            hints: ["", "Low land between mountains is a valley. A mountain itself goes up high."],
          },
        },
      },
      {
        title: "Water Shapes",
        teach:
          "Water has shapes too. An ocean is a huge body of salt water. A lake has land all around it. A river is moving water that flows downhill. It begins at its source, often high in the mountains. It ends at its mouth, where it empties into a lake, a bigger river or the ocean. A smaller river that joins a bigger one is called a tributary. Land can be shaped by water too. An island has water all around it. A peninsula has water on three sides. Florida is a peninsula!",
        visual: {
          type: "hotspots",
          title: "Parts of a river and the land around water",
          center: "Water",
          spots: [
            { label: "Source", icon: "⛰️", detail: "Where a river begins, often in hills or mountains." },
            { label: "Tributary", icon: "〰️", detail: "A smaller river that flows into a bigger one." },
            { label: "Mouth", icon: "🌊", detail: "Where a river empties into a lake, a bigger river or the ocean." },
            { label: "Lake", icon: "💧", detail: "A body of water with land all around it." },
            { label: "Island", icon: "🏝️", detail: "Land with water all around it, like Hawaii's islands." },
            { label: "Peninsula", icon: "🗺️", detail: "Land with water on three sides, like Florida." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A river begins at its {0} and ends at its {1}. Land with water all around it is an {2}. Land with water on three sides is a {3}.",
          blanks: [{ answers: ["source"] }, { answers: ["mouth"] }, { answers: ["island"] }, { answers: ["peninsula"] }],
          bank: ["source", "mouth", "island", "peninsula", "plateau", "valley"],
          hint: "A river starts at its source and ends at its mouth. Count the sides with water: all around is an island, three sides is a peninsula.",
          mistakes: [
            { match: "plateau", coach: "A plateau is high, flat land. These blanks are about rivers and land surrounded by water." },
            { match: "valley", coach: "A valley is low land between hills. Think about where a river starts and ends." },
          ],
          seconds: 40,
        },
        think: {
          q: "Where does a river end?",
          choices: ["At its source", "At its mouth", "At its tributary"],
          answer: 1,
          why: "A river ends at its mouth, where it empties into a lake, a bigger river or the ocean.",
          hints: [
            "The source is where a river begins, not where it ends.",
            "",
            "A tributary is a smaller river that joins a bigger one. Where does the water empty out?",
          ],
        },
        approaches: {
          analogy:
            "A river is like a slide at the playground. You start at the top, the source. You zoom downhill. You land at the bottom, the mouth. A tributary is like a second slide that joins the first one halfway down.",
          example:
            "The Missouri River is a tributary of the Mississippi River. The two rivers meet near St. Louis, Missouri. The Mississippi keeps flowing south until its mouth at the Gulf of Mexico.",
          simpler: {
            q: "Land with water all around it is called what?",
            choices: ["A peninsula", "An island"],
            answer: 1,
            why: "An island has water on every side.",
            hints: ["A peninsula has water on only three sides. One side is still joined to land.", ""],
          },
        },
      },
      {
        title: "Map Tools",
        teach:
          "Every good map has tools to help you read it. The map key, also called the legend, tells what each symbol means. A star may stand for a capital city, and a blue line for a river. The compass rose shows the four cardinal directions: north, south, east and west. It also shows in-between directions. Halfway between north and east is northeast. The map scale tells real distance. If 1 inch on the map stands for 10 miles, then 2 inches stands for 20 miles. Just multiply!",
        visual: {
          type: "flip",
          cards: [
            { front: "🔑 Map key (legend)", back: "Tells what each symbol on the map means." },
            { front: "🧭 Compass rose", back: "Shows north, south, east and west, plus in-between directions like northeast." },
            { front: "📏 Map scale", back: "Tells how far a real distance is. Example: 1 inch = 10 miles." },
            { front: "↗️ Northeast", back: "The in-between direction halfway from north to east." },
            { front: "↙️ Southwest", back: "The in-between direction halfway from south to west." },
          ],
        },
        probe: {
          type: "number",
          prompt: "On a map, 1 inch stands for 10 miles. Two towns are 4 inches apart on the map. How many real miles apart are they?",
          answer: 40,
          unit: "miles",
          hint: "Each inch is 10 miles. Count by tens four times: 10, 20, 30, ...",
          mistakes: [
            { match: "14", coach: "Don't add 4 and 10. Each of the 4 inches is worth 10 miles, so multiply: 4 × 10." },
            { match: "4", coach: "4 is the map distance in inches. Use the scale to turn inches into real miles." },
          ],
          seconds: 30,
        },
        think: {
          q: "Which map tool tells you what the symbols mean?",
          choices: ["The compass rose", "The map scale", "The map key", "The title"],
          answer: 2,
          why: "The map key, or legend, explains every symbol on the map.",
          hints: [
            "The compass rose shows directions, not symbols.",
            "The map scale helps you measure distance, not read symbols.",
            "",
            "The title tells what the whole map is about, not what each symbol means.",
          ],
        },
        approaches: {
          analogy:
            "A map key is like the answer key to a secret code. A tiny tree symbol means a forest. A star means a capital. Without the key, the symbols are a puzzle. With it, the map talks to you.",
          example:
            "A park map says 1 inch = 100 feet. The pond is 3 inches from the parking lot on the map. Multiply 3 × 100. The pond is 300 feet away, an easy walk.",
          simpler: {
            q: "If 1 inch on a map is 10 miles, how far is 2 inches?",
            choices: ["12 miles", "20 miles"],
            answer: 1,
            why: "Two groups of 10 miles is 20 miles.",
            hints: ["Don't add 2 and 10. Each inch is a whole 10 miles, so it's 10 + 10.", ""],
          },
        },
      },
      {
        title: "Regions of the United States",
        teach:
          "A region is an area where places share features. They might share land, climate or the kind of work people do. The United States is often split into five regions. The Northeast has old cities, cold winters and a rocky coast. The Southeast is warm, with long beaches on the Atlantic Ocean and the Gulf of Mexico. The Midwest has flat plains, rich soil and the Great Lakes. The Southwest is hot and dry, with deserts and canyons. The West has the tall Rocky Mountains and the Pacific coast.",
        visual: {
          type: "hotspots",
          title: "Five regions of the United States",
          center: "USA",
          spots: [
            { label: "Northeast", icon: "🍁", detail: "Old cities, cold winters, colorful fall leaves and a rocky Atlantic coast." },
            { label: "Southeast", icon: "🌴", detail: "Warm weather, long beaches and the Florida peninsula." },
            { label: "Midwest", icon: "🌽", detail: "Flat plains, rich soil, big farms and the Great Lakes." },
            { label: "Southwest", icon: "🌵", detail: "Hot, dry deserts and canyons, like the Grand Canyon." },
            { label: "West", icon: "🏔️", detail: "The tall Rocky Mountains, forests and the Pacific coast." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each region to a feature it is known for.",
          pairs: [
            { left: "Midwest", right: "Flat plains and big farms" },
            { left: "Southwest", right: "Dry deserts and canyons" },
            { left: "West", right: "The Rocky Mountains and the Pacific coast" },
            { left: "Southeast", right: "Warm beaches and the Florida peninsula" },
            { left: "Northeast", right: "Old cities and a rocky Atlantic coast" },
          ],
          hint: "Picture each region: farms in the middle, deserts in the dry south and west, big mountains in the far west.",
          mistakes: [
            { match: "Midwest matched to dry deserts", coach: "The Midwest has rich soil and lots of farms. The dry deserts are in the Southwest." },
            { match: "West matched to Florida", coach: "Florida is in the Southeast. The West has the Rocky Mountains and the Pacific Ocean." },
          ],
          seconds: 45,
        },
        think: {
          q: "What makes a group of places a region?",
          choices: ["They all have the same name", "They share features like land or climate", "They are all big cities", "They all have the same number of people"],
          answer: 1,
          why: "A region is an area where places share features, like land, climate or work.",
          hints: [
            "Places in a region have different names. Something else ties them together.",
            "",
            "A region can have farms and small towns too, not just big cities.",
            "Regions are about shared features, not counting people.",
          ],
        },
        approaches: {
          analogy:
            "Think of a grocery store. The fruit is in one aisle, the bread in another. Each aisle is like a region: things that are alike are grouped together.",
          example:
            "Iowa, Illinois and Kansas are different states. But all three have wide, flat land, rich soil and huge corn and wheat farms. That shared farm land is why they are all part of the Midwest region.",
          simpler: {
            q: "Which region is hot and dry, with deserts?",
            choices: ["The Southwest", "The Northeast"],
            answer: 0,
            why: "The Southwest has hot, dry deserts and canyons.",
            hints: ["", "The Northeast has cold winters and a rocky coast, not deserts."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it a landform, or a body of water?",
      buckets: ["⛰️ Landform", "🌊 Body of water"],
      items: [
        { text: "Mountain", bucket: 0 },
        { text: "Plateau", bucket: 0 },
        { text: "Valley", bucket: 0 },
        { text: "Plain", bucket: 0 },
        { text: "Ocean", bucket: 1 },
        { text: "Lake", bucket: 1 },
        { text: "River", bucket: 1 },
        { text: "Tributary", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Pretend you're a mapmaker. Tell a friend about three landforms or bodies of water, and how a map key, compass rose and scale help someone read your map.",
      keyPoints: [
        "Names and describes landforms like mountains, plains or plateaus",
        "Names a body of water like a river, lake or ocean",
        "The map key tells what symbols mean",
        "The compass rose shows directions",
        "The map scale shows real distance",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "A map scale says 1 inch = 50 miles. A lake is 3 inches from the city on the map. How many real miles away is the lake?",
        answer: 150,
        unit: "miles",
        hint: "Each inch is 50 miles. Count by fifties three times.",
        mistakes: [
          { match: "53", coach: "Don't add 3 and 50. Three inches means three groups of 50 miles." },
          { match: "100", coach: "That's only 2 inches. Add one more 50 for the third inch." },
        ],
        seconds: 35,
      },
      {
        type: "cloze",
        text: "Hawaii is made of {0}, with water all around. Florida is a {1}, with water on three sides. The wide, flat land of the Midwest is called a {2}.",
        blanks: [{ answers: ["islands"] }, { answers: ["peninsula"] }, { answers: ["plain", "plains"] }],
        bank: ["islands", "peninsula", "plain", "canyon", "mountain"],
        hint: "Water all around makes an island. Water on three sides makes a peninsula. Wide, flat land is a plain.",
        mistakes: [
          { match: "canyon", coach: "A canyon is a deep valley with rock walls. Look for a word that means wide, flat land." },
          { match: "mountain", coach: "Mountains are high and steep. The Midwest is mostly flat." },
        ],
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Sort each in-between direction: is it closer to north, or closer to south?",
        buckets: ["⬆️ Has north in it", "⬇️ Has south in it"],
        items: [
          { text: "Northeast", bucket: 0 },
          { text: "Northwest", bucket: 0 },
          { text: "Southeast", bucket: 1 },
          { text: "Southwest", bucket: 1 },
        ],
        hint: "Listen to the first part of each word: north-east, south-west.",
        seconds: 20,
      },
      {
        type: "build",
        prompt: "Build the meaning of a region.",
        tiles: ["A region", "is an area", "where places", "share features"],
        distractors: ["have the same name"],
        hint: "Places in a region are alike in some way, like their land or climate.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which landform is wide, flat land?",
        choices: ["A plain", "A canyon", "A mountain"],
        answer: 0,
        why: "A plain is wide, flat land, often used for farms.",
      },
      {
        q: "What is a small river that flows into a bigger river?",
        choices: ["A mouth", "A tributary", "A source", "A peninsula"],
        answer: 1,
        why: "A tributary is a smaller river that joins a bigger one.",
      },
      {
        q: "On a map, 1 inch = 20 miles. How far is 3 inches?",
        choices: ["23 miles", "40 miles", "60 miles"],
        answer: 2,
        why: "3 × 20 = 60, so 3 inches stands for 60 miles.",
      },
      {
        q: "Which region has tall mountains and the Pacific coast?",
        choices: ["The Midwest", "The Southeast", "The Northeast", "The West"],
        answer: 3,
        why: "The West has the Rocky Mountains and the Pacific Ocean.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Draw a map of an imaginary land with at least three landforms (like a mountain, a plain and a valley) and two bodies of water (like a river and a lake). Add a map key, a compass rose and a map scale. Show your map to a parent and explain each part.",
      rubric: [
        "Shows at least three landforms and two bodies of water, each labeled",
        "Has a map key that explains the symbols",
        "Has a compass rose with north, south, east and west",
        "Has a map scale, and the child can use it to tell a distance",
      ],
    },
  },

  // 2. How geography shapes where people live
  {
    id: "soc-3.settle",
    title: "Why People Live Where They Do",
    minutes: 30,
    stage: "logic",
    standards: ["SS.3.4", "SS.3.5", "D2.Geo.4.3-5", "D2.Geo.5.3-5", "D2.Geo.6.3-5", "D2.Geo.8.3-5"],
    read: [
      "Why is a town built in one spot and not another? Long ago, people chose where to live by asking a simple question: what does this place give us? Every person needs fresh water, food and shelter. So the first towns were often built next to rivers, lakes and coasts.",
      "Rivers were especially useful. They gave water for drinking and for farms. Boats carried people and goods along them, long before there were cars or trains. Rushing water could turn the wheels of mills that ground grain into flour. Pittsburgh, Pennsylvania, grew where two rivers meet to form the Ohio River. New Orleans grew near the mouth of the Mississippi River.",
      "The land and climate shape the work people do. Natural resources are things from nature that people use, like soil, trees, fish, water and minerals. Where the land is flat and the soil is rich, people farm. Where there are thick forests, people cut lumber. Along the coast, people fish and build ships. In the mountains, people may dig mines.",
      "People adapt to where they live. They wear warm coats where winters are cold. They build steep roofs so heavy snow slides off. People also change the land to meet their needs. They build bridges across rivers, dig canals, and build dams that store water. The Erie Canal opened in 1825 and linked the Hudson River to Lake Erie, so boats could carry goods between New York City and the Great Lakes. Towns along the canal grew fast.",
      "So when you look at a map, notice where the cities are. Most sit by water, on good land, or where roads and railroads meet. Geography helps explain why.",
    ].join("\n\n"),
    keyIdeas: [
      "People settle where they can get fresh water, food and shelter, so many towns grew by rivers, lakes and coasts.",
      "Land, climate and natural resources shape the jobs people do, like farming, fishing, lumber and mining.",
      "People adapt to their surroundings, and they also change the land with bridges, canals, dams and farms.",
    ],
    hook: {
      text: "Pretend it's 200 years ago, and your family is choosing a spot for a new home. One spot is a dry, rocky hilltop. The other is a green valley next to a river. Which would you choose, and why? Your answer is the secret behind where most cities are!",
    },
    teach: [
      {
        title: "Water Comes First",
        teach:
          "Every person needs fresh water, food and shelter. So long ago, people built towns near rivers, lakes and coasts. Rivers gave water for drinking and for crops. Before cars and trains, rivers were also highways. Boats carried people, food and goods up and down them. Fast water could spin a water wheel to run a mill, which ground grain into flour. That's why so many big cities sit on water. Pittsburgh grew where two rivers meet to form the Ohio River. New Orleans grew near the mouth of the Mississippi.",
        visual: {
          type: "hotspots",
          title: "Why build a town by a river?",
          center: "River town",
          spots: [
            { label: "Drinking water", icon: "🚰", detail: "People and animals need fresh water every day." },
            { label: "Farms", icon: "🌱", detail: "River water helps crops grow, and river valleys often have rich soil." },
            { label: "Travel", icon: "🛶", detail: "Before trains and cars, boats carried people and goods along rivers." },
            { label: "Power", icon: "⚙️", detail: "Rushing water turned water wheels to run mills." },
            { label: "Food", icon: "🐟", detail: "Rivers and lakes are full of fish to catch." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Long ago, many towns were built next to {0}. People used the water for drinking and growing {1}. Boats on the river carried {2} to trade, and rushing water turned wheels to run a {3}.",
          blanks: [{ answers: ["rivers"] }, { answers: ["crops"] }, { answers: ["goods"] }, { answers: ["mill"] }],
          bank: ["rivers", "crops", "goods", "mill", "deserts", "airplanes"],
          hint: "Think of everything a river gives: water, travel and power.",
          mistakes: [
            { match: "deserts", coach: "Deserts are very dry. Towns needed lots of fresh water, so they were built by rivers." },
            { match: "airplanes", coach: "Airplanes weren't invented long ago. Boats carried goods on the river." },
          ],
          seconds: 40,
        },
        think: {
          q: "Why were so many early towns built next to rivers?",
          choices: ["Rivers were good places to hide", "Rivers gave water, travel and power", "People liked the sound of water", "Rivers kept away the cold"],
          answer: 1,
          why: "Rivers gave fresh water, a way to travel and trade, and power for mills.",
          hints: [
            "Towns didn't need to hide. Think about what people need every day to live.",
            "",
            "A nice sound wouldn't build a city. What useful things does a river give?",
            "Rivers don't make a place warmer. Think about water, boats and mills.",
          ],
        },
        approaches: {
          analogy:
            "A river was like a store, a road and a power plant all in one. It gave people water and fish, carried their boats and turned their mill wheels. No wonder people wanted to live right next to it!",
          example:
            "Picture a family in 1800 with a wagon. They need water for their cows, a way to sell their corn and a mill to make flour. A river valley gives all three. A dry hilltop gives none of them.",
          simpler: {
            q: "What does every person need to live?",
            choices: ["Fresh water", "A tall building"],
            answer: 0,
            why: "Everyone needs fresh water, plus food and shelter.",
            hints: ["", "People lived for thousands of years without tall buildings. They can't live without water."],
          },
        },
      },
      {
        title: "Land, Climate and Natural Resources",
        teach:
          "The land and the climate shape the work people do. Climate is the usual weather of a place over many years. Natural resources are things from nature that people use, like soil, trees, fish, water and minerals. Where land is flat and soil is rich, like the Midwest, people grow corn and wheat. Where there are thick forests, people cut lumber to build houses. Along the coast, people fish and build ships. In some mountains, people dig mines for coal, copper or silver. A place's resources help decide its jobs.",
        visual: {
          type: "compare",
          left: { title: "Natural resource", points: ["Rich, flat soil", "Thick forests", "Ocean and fish", "Minerals in mountains"] },
          right: { title: "Work people do", points: ["Farming", "Cutting lumber", "Fishing and shipbuilding", "Mining"] },
        },
        probe: {
          type: "match",
          prompt: "Match each natural resource to a job it creates.",
          pairs: [
            { left: "Rich, flat soil", right: "Farmer" },
            { left: "Thick forests", right: "Lumber worker" },
            { left: "Ocean full of fish", right: "Fishing boat captain" },
            { left: "Copper in the mountains", right: "Miner" },
          ],
          hint: "Ask: what would a person DO with that resource?",
          mistakes: [
            { match: "Thick forests matched to farmer", coach: "Farmers need open, rich soil. Trees from a forest are cut by lumber workers." },
          ],
          seconds: 35,
        },
        think: {
          q: "A town sits beside the ocean. What job would you most expect there?",
          choices: ["Coal miner", "Wheat farmer", "Fisher", "Desert guide"],
          answer: 2,
          why: "The ocean's natural resource is fish, so many people work at fishing.",
          hints: [
            "Coal comes from mines, usually in hills or mountains, not the ocean.",
            "Wheat grows best on wide, flat plains, not by the sea.",
            "",
            "Deserts are dry. This town is next to lots of water.",
          ],
        },
        approaches: {
          analogy:
            "Natural resources are like the ingredients in a kitchen. If your kitchen has flour and eggs, you bake. If it has fish, you cook fish. A place's resources are its ingredients, and they decide what people make.",
          example:
            "In the 1800s, the thick forests of Michigan and Wisconsin had huge pine trees. Many people there became lumberjacks, and sawmill towns grew along the rivers that floated the logs.",
          simpler: {
            q: "Which one is a natural resource?",
            choices: ["Trees", "A toy car"],
            answer: 0,
            why: "Trees come from nature. A toy car is made by people.",
            hints: ["", "A toy car is made in a factory, not found in nature."],
          },
        },
      },
      {
        title: "Adapting and Changing the Land",
        teach:
          "People adapt to where they live. To adapt means to change how you live to fit a place. In cold places, people wear thick coats and build steep roofs so snow slides off. In hot, dry places, thick walls help keep homes cool. People also change the land to meet their needs. They build bridges over rivers and dig canals for boats. They build dams to store water and make power. The Erie Canal opened in 1825 and linked the Hudson River to Lake Erie. Goods moved faster and cheaper, and towns along the canal grew.",
        visual: {
          type: "compare",
          left: { title: "Adapting (changing how we live)", points: ["Wearing warm coats in winter", "Steep roofs so snow slides off", "Thick walls to stay cool in the desert"] },
          right: { title: "Changing the land", points: ["Building a bridge over a river", "Digging a canal for boats", "Building a dam to store water", "Clearing land for farms"] },
        },
        probe: {
          type: "sort",
          prompt: "Is it adapting to a place, or changing the land?",
          buckets: ["🧥 Adapting to the place", "🏗️ Changing the land"],
          items: [
            { text: "Wearing snow boots in winter", bucket: 0 },
            { text: "Building a steep roof so snow slides off", bucket: 0 },
            { text: "Planting crops that grow well in dry weather", bucket: 0 },
            { text: "Building a bridge across a river", bucket: 1 },
            { text: "Digging a canal", bucket: 1 },
            { text: "Building a dam to make a lake", bucket: 1 },
          ],
          hint: "Adapting changes how people live. Changing the land changes the land or water itself.",
          mistakes: [
            { match: "Bridge sorted as adapting", coach: "A bridge changes the land: people build something new across the river." },
            { match: "Snow boots sorted as changing the land", coach: "Snow boots don't change the land. They help people fit the cold place they live in." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which is an example of people changing the land?",
          choices: ["Wearing a sun hat", "Building a dam on a river", "Drinking more water on a hot day", "Wearing a thick coat"],
          answer: 1,
          why: "A dam changes the river itself, holding back water to make a lake.",
          hints: [
            "A sun hat helps a person fit a sunny place. The land stays the same.",
            "",
            "Drinking water helps your body adapt. It doesn't change the land.",
            "A coat is a way to adapt to cold. The land doesn't change.",
          ],
        },
        approaches: {
          analogy:
            "Adapting is like putting on a raincoat when it rains. Changing the land is like building a roof over the playground. One changes you, the other changes the place.",
          example:
            "Hoover Dam was built on the Colorado River in the 1930s. It holds back the river to make Lake Mead, a huge lake that stores water for farms and cities and makes electricity. That's people changing the land.",
          simpler: {
            q: "Does building a bridge change the land?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A bridge is something new people build across a river or valley.",
            hints: ["", "Before the bridge, people had to swim or take a boat. The bridge changed the place."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the story of a river town in order.",
      steps: [
        "A family finds a green valley beside a river.",
        "They build a cabin and plant crops in the rich soil.",
        "More families come, and someone builds a mill by the rushing water.",
        "Boats stop to trade, so stores and a school open.",
        "A bridge is built, and later a railroad comes to town.",
        "The town grows into a busy city.",
      ],
    },
    explain: {
      prompt: "Look at where your town or a nearby city is. Explain why you think people first settled there, and one way people changed the land.",
      keyPoints: [
        "People need fresh water, food and shelter",
        "Rivers, lakes or coasts gave water and travel",
        "Natural resources shape the jobs people do",
        "People change the land with bridges, canals, dams or farms",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each place to the reason people settled there.",
        pairs: [
          { left: "A valley beside a river", right: "Fresh water and rich soil for farms" },
          { left: "A harbor on the coast", right: "Ships could dock to trade and fish" },
          { left: "Mountains with copper", right: "Jobs in mining" },
          { left: "Where two railroads cross", right: "Trains brought goods and travelers" },
        ],
        hint: "Each place gives something different. Ask what people could DO there.",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Is it a natural resource, or something people made?",
        buckets: ["🌳 Natural resource", "🏭 Made by people"],
        items: [
          { text: "Fresh river water", bucket: 0 },
          { text: "Rich soil", bucket: 0 },
          { text: "Pine trees", bucket: 0 },
          { text: "A canal", bucket: 1 },
          { text: "A bridge", bucket: 1 },
          { text: "A railroad", bucket: 1 },
        ],
        hint: "Natural resources come from nature. People built canals, bridges and railroads.",
        mistakes: [{ match: "Canal sorted as natural", coach: "A river is natural, but a canal is a waterway people dig." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A canal town had 400 people. After the canal opened, it grew to 3 times as many. How many people lived there then?",
        answer: 1200,
        unit: "people",
        hint: "3 times as many means 400 + 400 + 400.",
        mistakes: [
          { match: "403", coach: "Don't add 3. Three times as many means three groups of 400." },
          { match: "800", coach: "That's 2 times as many. Add one more 400." },
        ],
        seconds: 35,
      },
      {
        type: "cloze",
        text: "In cold places, people {0} by wearing warm coats. People {1} the land when they build dams and canals.",
        blanks: [{ answers: ["adapt"] }, { answers: ["change"] }],
        bank: ["adapt", "change", "forget", "sleep"],
        hint: "Fitting how you live to a place is adapting. Building dams changes the land.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Why did many early towns grow next to rivers?",
        choices: ["Rivers kept towns warm", "Rivers gave water, travel and power", "Rivers had no animals"],
        answer: 1,
        why: "Rivers gave drinking water, a way to move goods by boat, and power for mills.",
      },
      {
        q: "What is a natural resource?",
        choices: ["Something people build in a factory", "A rule made by a town", "Something from nature that people use", "A kind of map"],
        answer: 2,
        why: "Natural resources come from nature: soil, water, trees, fish and minerals.",
      },
      {
        q: "Which job fits a place with flat land and rich soil?",
        choices: ["Farming", "Fishing", "Mining"],
        answer: 0,
        why: "Flat land and rich soil are great for growing crops.",
      },
      {
        q: "What did the Erie Canal do when it opened in 1825?",
        choices: ["It made a new mountain", "It ended all river travel", "It dried up Lake Erie", "It linked the Hudson River to Lake Erie for boats"],
        answer: 3,
        why: "The Erie Canal let boats carry goods between the Hudson River and the Great Lakes.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "With a parent, look at a map of your state. Find three cities and notice what is nearby: a river, a lake, the coast, mountains or railroads. Tell your parent why you think each city grew where it did.",
      rubric: [
        "Finds three cities on a map of the state",
        "Names a geographic feature near each city",
        "Gives a reason each feature helped the city grow (water, travel, resources, jobs)",
      ],
    },
  },

  // 3. Economics: scarcity, choices, producers and consumers, trade
  {
    id: "soc-3.economics",
    title: "Scarcity, Choices and Trade",
    minutes: 30,
    stage: "logic",
    standards: ["SS.3.6", "SS.3.7", "SS.3.8", "D2.Eco.1.3-5", "D2.Eco.2.3-5", "D2.Eco.3.3-5", "D2.Eco.4.3-5", "D2.Eco.5.3-5", "D2.Eco.7.3-5", "D2.Eco.14.3-5", "D2.Geo.11.3-5"],
    read: [
      "People want many things, but there is never enough money, time or resources for all of them. This problem is called scarcity. Because of scarcity, every person, family and business has to make choices.",
      "Every choice has a cost. When you choose one thing, you give up the next-best thing you could have had. That next-best thing is called the opportunity cost. If you spend your $10 on a kite instead of a book, the book is your opportunity cost. Smart choosers think about what they gain and what they give up.",
      "Producers make goods or provide services. Consumers buy and use them. Most people are both. A baker is a producer when she bakes bread and a consumer when she buys flour. To make anything, producers need three kinds of resources. Natural resources come from nature, like wheat, water and wood. Human resources are the people who do the work, with their skills. Capital resources are tools, machines and buildings made to help produce things, like an oven or a tractor.",
      "Most people don't make everything they need. Instead, they specialize, which means they focus on one kind of work they do well. Then they trade. Long ago, people bartered, trading goods for goods, like eggs for shoes. But barter only works if each person wants what the other has. Money makes trade much easier, because everyone accepts it.",
      "Sellers hope to earn a profit, the money left after paying their costs. Profit rewards people for making things others want. Trade also connects us to faraway places. Bananas grow in warm countries, and they travel by ship to our stores.",
    ].join("\n\n"),
    keyIdeas: [
      "Scarcity means we can't have everything we want, so we must choose.",
      "The opportunity cost of a choice is the next-best thing you give up.",
      "Producers use natural, human and capital resources to make goods and services for consumers.",
      "People specialize and trade, and money makes trade easier than barter.",
    ],
    hook: {
      text: "You have $10 at the county fair. A kite costs $10. A book costs $10. A giant pretzel and a ride cost $10 together. You can't have all three. Welcome to the biggest idea in economics!",
    },
    teach: [
      {
        title: "Scarcity and Choices",
        teach:
          "People want many things. But there is never enough money, time or resources for everything. This problem is called scarcity. Even a king can't have everything, because there are only 24 hours in a day! Because of scarcity, we must make choices. Every choice has a cost. When you pick one thing, you give up the next-best thing. That next-best thing is called the opportunity cost. Say you have one Saturday afternoon. You can go fishing or build a tree fort. If you choose fishing, the tree fort is your opportunity cost.",
        visual: {
          type: "flip",
          cards: [
            { front: "Scarcity", back: "Not having enough money, time or resources for everything we want." },
            { front: "Choice", back: "Picking one thing when you can't have them all." },
            { front: "Opportunity cost", back: "The next-best thing you give up when you make a choice." },
            { front: "Benefit", back: "What you gain from a choice." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Sam has $8. He wants a $8 model rocket and an $8 puzzle. Not having enough money for both is called {0}. Sam buys the rocket, so the puzzle is his {1}.",
          blanks: [{ answers: ["scarcity"] }, { answers: ["opportunity cost"] }],
          bank: ["scarcity", "opportunity cost", "profit", "barter"],
          hint: "Not enough for everything is scarcity. The next-best thing you gave up is the opportunity cost.",
          mistakes: [
            { match: "profit", coach: "Profit is money a seller earns after costs. Sam is a buyer giving something up." },
            { match: "barter", coach: "Barter is trading goods for goods. Sam isn't trading here; he's choosing." },
          ],
          seconds: 35,
        },
        think: {
          q: "Lily can either play soccer or go swimming on Saturday. She picks soccer. What is her opportunity cost?",
          choices: ["Soccer", "Swimming", "Nothing at all", "The soccer ball"],
          answer: 1,
          why: "Swimming is the next-best choice she gave up.",
          hints: [
            "Soccer is what she chose. The opportunity cost is what she gave up.",
            "",
            "Every choice gives something up. She couldn't do both.",
            "The ball is something she uses. The cost is the activity she gave up.",
          ],
        },
        approaches: {
          analogy:
            "Your stomach after dinner has room for just one dessert. Pick the pie, and the ice cream you didn't eat is your opportunity cost. Your stomach space is scarce, so you choose.",
          example:
            "A farmer has one field. She can plant corn or pumpkins, but not both. She plants corn. The pumpkins she could have grown and sold are her opportunity cost.",
          simpler: {
            q: "Can a person with $5 buy two toys that cost $5 each?",
            choices: ["Yes", "No, she has to choose"],
            answer: 1,
            why: "Two $5 toys cost $10, but she only has $5, so she must choose one.",
            hints: ["Two toys at $5 each cost $10 total. Does she have $10?", ""],
          },
        },
      },
      {
        title: "Producers, Consumers and Resources",
        teach:
          "Producers make goods or provide services. Consumers buy and use them. Most people are both! A baker is a producer when she bakes bread. She is a consumer when she buys flour. To make anything, producers need three kinds of resources. Natural resources come from nature, like wheat, water and wood. Human resources are the workers and their skills, like the baker's know-how. Capital resources are tools, machines and buildings that people made to help produce things, like an oven, a mixer or the bakery itself.",
        visual: {
          type: "hotspots",
          title: "Resources in a bakery",
          center: "Bakery",
          spots: [
            { label: "Wheat flour", icon: "🌾", detail: "A natural resource: wheat grows in a field." },
            { label: "Water", icon: "💧", detail: "A natural resource from rivers, lakes and wells." },
            { label: "The baker", icon: "👩‍🍳", detail: "A human resource: a worker with skills." },
            { label: "Oven", icon: "🔥", detail: "A capital resource: a tool made by people to produce bread." },
            { label: "Delivery truck", icon: "🚚", detail: "A capital resource: it helps get bread to stores." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "A furniture maker builds tables. Sort each resource she uses.",
          buckets: ["🌳 Natural", "🧑‍🔧 Human", "🔨 Capital"],
          items: [
            { text: "Oak wood from trees", bucket: 0 },
            { text: "Iron for the nails", bucket: 0 },
            { text: "The furniture maker's skill", bucket: 1 },
            { text: "Her helper who sands the wood", bucket: 1 },
            { text: "A power saw", bucket: 2 },
            { text: "Her workshop building", bucket: 2 },
          ],
          hint: "Natural comes from nature. Human is people and their skills. Capital is tools and buildings people made.",
          mistakes: [
            { match: "Saw sorted as natural", coach: "A saw doesn't grow in nature. People made it as a tool, so it's capital." },
            { match: "Workshop sorted as human", coach: "A building is a capital resource. Human resources are the people doing the work." },
          ],
          seconds: 45,
        },
        think: {
          q: "A farmer's tractor is which kind of resource?",
          choices: ["Natural", "Human", "Capital"],
          answer: 2,
          why: "A tractor is a machine people made to help produce crops, so it's a capital resource.",
          hints: [
            "Tractors don't grow in nature. Someone built it in a factory.",
            "Human resources are people and their skills. A tractor is a machine.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Making a pizza is like a team. The flour and tomatoes are from nature. The cook is the human. The oven and pizza cutter are the tools, the capital. All three work together.",
          example:
            "A fisher catches salmon. The salmon is a natural resource. The fisher and her crew are human resources. The boat and nets are capital resources. People who buy the fish at the market are the consumers.",
          simpler: {
            q: "Who is the consumer: the person who bakes the cake, or the person who buys and eats it?",
            choices: ["The person who bakes it", "The person who buys and eats it"],
            answer: 1,
            why: "Consumers buy and use goods. The baker is the producer.",
            hints: ["The baker makes the cake, so she is the producer here.", ""],
          },
        },
      },
      {
        title: "Specialize, Trade and Profit",
        teach:
          "Most people don't make everything they need. Instead, they specialize. That means they focus on one kind of work they do well. A shoemaker makes shoes, and a farmer grows food. Then they trade. Long ago, people bartered, trading goods for goods, like eggs for shoes. But barter only works if each person wants what the other one has. Money makes trade easier, because everyone accepts it. Sellers hope to earn a profit: the money left after paying their costs. Trade even connects us to faraway places. Bananas grow in warm countries and travel by ship to our stores.",
        visual: {
          type: "compare",
          left: { title: "Barter", points: ["Trade goods for goods", "Both people must want what the other has", "Hard to trade a cow for one loaf of bread"] },
          right: { title: "Money", points: ["Everyone accepts it", "Easy to carry and count", "You can save it for later", "Makes prices easy to compare"] },
        },
        probe: {
          type: "number",
          prompt: "Your lemonade stand sells 20 cups for $1 each. The lemons, sugar and cups cost $8. How many dollars of profit do you make?",
          answer: 12,
          unit: "dollars",
          hint: "Profit is the money you take in minus your costs: $20 minus $8.",
          mistakes: [
            { match: "20", coach: "$20 is all the money you took in. Subtract the $8 you spent on supplies." },
            { match: "28", coach: "Don't add the costs. Profit is what's left AFTER you pay them: subtract." },
          ],
          seconds: 35,
        },
        think: {
          q: "Why does money make trading easier than barter?",
          choices: ["Money is shinier than goods", "Everyone accepts money, so you don't need to find someone who wants your goods", "Barter is against the law", "Money never runs out"],
          answer: 1,
          why: "With money, you don't have to find someone who wants exactly what you have.",
          hints: [
            "How money looks isn't the point. Think about what makes a trade work.",
            "",
            "Barter isn't against the law. It's just harder.",
            "Money is scarce too! Think about why everyone is happy to take it.",
          ],
        },
        approaches: {
          analogy:
            "Trading lunch at school is barter. You want my cookie, but I don't want your carrot, so no trade. If you had a coin I could spend on anything, I'd say yes. Money is like a trade everyone agrees to.",
          example:
            "A farmer has a cow and wants one loaf of bread. The baker doesn't want a whole cow! With money, the farmer sells milk for $5, then pays $3 for bread and keeps $2.",
          simpler: {
            q: "A seller takes in $10 and spends $4 on supplies. What is left?",
            choices: ["$6", "$14"],
            answer: 0,
            why: "$10 minus $4 is $6. That's the profit.",
            hints: ["", "Don't add. Take the $4 of costs away from the $10."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is the person acting as a producer or a consumer?",
      buckets: ["🛠️ Producer", "🛒 Consumer"],
      items: [
        { text: "A farmer grows tomatoes", bucket: 0 },
        { text: "A barber gives a haircut", bucket: 0 },
        { text: "A boy sells birdhouses he built", bucket: 0 },
        { text: "A family buys groceries", bucket: 1 },
        { text: "A girl buys a ticket to a ball game", bucket: 1 },
        { text: "A man pays for a haircut", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Explain scarcity and opportunity cost using a choice you made this week. Then tell why people specialize and trade, and why money helps.",
      keyPoints: [
        "Scarcity means we can't have everything we want",
        "Every choice has an opportunity cost, the next-best thing given up",
        "People specialize in work they do well",
        "People trade for what they don't make",
        "Money makes trade easier than barter",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "Mia grows flowers. She spends $5 on seeds and sells her flowers for $23. How many dollars of profit does she make?",
        answer: 18,
        unit: "dollars",
        hint: "Profit = money taken in minus costs: $23 − $5.",
        mistakes: [{ match: "28", coach: "Subtract the cost of the seeds; don't add it." }],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each word to its meaning.",
        pairs: [
          { left: "Scarcity", right: "Not enough for everything we want" },
          { left: "Opportunity cost", right: "The next-best thing you give up" },
          { left: "Specialize", right: "Focus on one kind of work" },
          { left: "Barter", right: "Trade goods for goods without money" },
          { left: "Profit", right: "Money left after paying costs" },
        ],
        hint: "Say each word in a sentence. Which meaning fits?",
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "A pizza shop: sort each resource.",
        buckets: ["🌳 Natural", "🧑‍🍳 Human", "🔨 Capital"],
        items: [
          { text: "Tomatoes", bucket: 0 },
          { text: "Wheat for the dough", bucket: 0 },
          { text: "The pizza cook", bucket: 1 },
          { text: "The delivery driver", bucket: 1 },
          { text: "The pizza oven", bucket: 2 },
          { text: "The delivery car", bucket: 2 },
        ],
        hint: "Natural comes from nature, human is people, capital is tools and machines people made.",
        seconds: 40,
      },
      {
        type: "build",
        prompt: "Build a sentence that explains why money helps trade.",
        tiles: ["Money makes trade easier", "because everyone", "accepts it"],
        distractors: ["because it is heavy"],
        hint: "Think about why a seller is always happy to take money.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What is scarcity?",
        choices: ["Having more than enough of everything", "Not having enough to get everything we want", "A kind of money", "A store that sells toys"],
        answer: 1,
        why: "Scarcity means wants are bigger than the money, time and resources we have.",
      },
      {
        q: "Ben chooses a movie instead of a baseball game. What is his opportunity cost?",
        choices: ["The movie", "His popcorn", "The baseball game"],
        answer: 2,
        why: "The baseball game is the next-best choice he gave up.",
      },
      {
        q: "Which is a capital resource?",
        choices: ["A hammer", "A tree", "A worker"],
        answer: 0,
        why: "A hammer is a tool people made to produce things.",
      },
      {
        q: "Why is barter harder than using money?",
        choices: ["Barter is always unfair", "Goods can't be traded", "Money is only used by banks", "Each person must want what the other one has"],
        answer: 3,
        why: "In barter, you must find someone who has what you want AND wants what you have.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Plan a small business with a parent, like a lemonade stand or selling cookies. List the natural, human and capital resources you need, figure out your costs and price, and work out how much profit you'd make if you sold 10. Then name your opportunity cost: what else could you do with that time?",
      rubric: [
        "Lists natural, human and capital resources for the business",
        "Writes down the costs and a price for each item",
        "Correctly figures the profit for selling 10 (money in minus costs)",
        "Names an opportunity cost of running the business",
      ],
    },
  },

  // 4. The story of your town and state
  {
    id: "soc-3.our-story",
    title: "The Story of Your Town and State",
    minutes: 30,
    stage: "logic",
    standards: ["SS.3.9", "SS.3.10", "SS.3.11", "D2.His.1.3-5", "D2.His.2.3-5", "D2.His.3.3-5", "D2.His.9.3-5", "D2.His.10.3-5", "D2.His.14.3-5", "D2.Geo.5.3-5"],
    read: [
      "Every town and every state has a story. Long before there were states, Native American peoples lived on the land. They hunted, fished, farmed and traded, and many places still carry names from their languages. The names of states like Ohio and Mississippi come from Native American words.",
      "Later, settlers came. They often built towns near water, good farmland or a road. When railroads were built in the 1800s, new towns sprang up along the tracks. A town might be named for a founder, a landform like a river or hill, or another town far away.",
      "How do we know what happened long ago? Historians are like detectives, and their clues are called sources. A primary source was made by someone who was there at the time: a letter, a diary, an old photo, a map or a newspaper. A secondary source was made later by someone who studied the past, like a history book. Looking at more than one source helps us check the facts.",
      "Towns change over time. Dirt roads became paved streets. Horses and wagons gave way to cars. One-room schoolhouses grew into big schools. A timeline puts events in order so we can see how a place changed and what caused what.",
      "Your state has a story too. Delaware was the first state, in 1787. Hawaii became the 50th state in 1959. Every state has a capital city, where its leaders meet to make laws. Every state also has symbols, like a flag, a state bird, a state flower and a motto. Each symbol tells something about what the people of that state value.",
    ].join("\n\n"),
    keyIdeas: [
      "Native American peoples lived on the land first, then settlers built towns near water, farmland, roads and railroads.",
      "Primary sources were made at the time; secondary sources were made later by people who studied the past.",
      "A timeline shows how a place changed over time.",
      "Every state has a capital and symbols, like a flag, bird, flower and motto.",
    ],
    hook: {
      text: "In an old attic trunk, you find a faded photo. It shows your street, but with a dirt road, a horse and a wooden store. Is that really the same place? Let's become history detectives and find out how towns change!",
    },
    teach: [
      {
        title: "How Towns Begin",
        teach:
          "Every town has a beginning. Long before there were states, Native American peoples lived across the land. They hunted, fished, farmed and traded. Many places still have names from their languages. Ohio and Mississippi are names that come from Native American words. Later, settlers came and built towns. They chose spots near water, good farmland or a road. In the 1800s, railroads crossed the country, and new towns sprang up along the tracks. A town might be named for its founder, for a nearby river or hill, or for another town far away.",
        visual: {
          type: "flip",
          cards: [
            { front: "🏹 First peoples", back: "Native American peoples lived on the land long before states, and many place names come from their languages." },
            { front: "🛶 Settlers", back: "People who came to live in a new place and build homes and towns." },
            { front: "🚂 Railroad towns", back: "In the 1800s, many new towns grew up along railroad tracks." },
            { front: "🏷️ Town names", back: "Towns are often named for a founder, a landform, or another place." },
          ],
        },
        probe: {
          type: "cloze",
          text: "Long before there were states, {0} peoples lived on the land. Later, {1} built towns near water and farmland. In the 1800s, many new towns grew along the {2} tracks.",
          blanks: [{ answers: ["Native American"] }, { answers: ["settlers"] }, { answers: ["railroad"] }],
          bank: ["Native American", "settlers", "railroad", "airplane", "astronauts"],
          hint: "Think about the order: first peoples, then settlers, then trains.",
          mistakes: [
            { match: "airplane", coach: "Airplanes came in the 1900s, and they don't run on tracks. Trains do." },
            { match: "astronauts", coach: "Astronauts didn't build early towns! Think about the people who came to farm and build homes." },
          ],
          seconds: 35,
        },
        think: {
          q: "Why did many new towns grow up in the 1800s along railroad tracks?",
          choices: ["Trains brought people and goods to trade", "Railroads made the weather warmer", "People liked the noise", "Tracks were made of gold"],
          answer: 0,
          why: "Trains carried people, mail and goods, so towns along the tracks could trade and grow.",
          hints: [
            "",
            "Railroads don't change the weather. Think about what trains carry.",
            "Noise doesn't help a town grow. What useful things arrive by train?",
            "Tracks are made of iron and steel. What did trains bring to a town?",
          ],
        },
        approaches: {
          analogy:
            "A railroad was like a new river made of steel. Just as towns grew beside rivers, towns grew beside the tracks, because that's where people and goods could come and go.",
          example:
            "When the first railroad across the country was finished in 1869, towns appeared along its route where trains stopped for water and fuel. Stores, hotels and homes soon followed.",
          simpler: {
            q: "Who lived on the land in America long before there were states?",
            choices: ["Native American peoples", "Nobody at all"],
            answer: 0,
            why: "Native American peoples lived across North America for thousands of years.",
            hints: ["", "People lived here for thousands of years before any states existed."],
          },
        },
      },
      {
        title: "Clues from the Past",
        teach:
          "How do we know what happened long ago? Historians are like detectives, and their clues are called sources. A primary source was made by someone who was there at the time. Letters, diaries, old photos, old maps and newspapers are primary sources. So are objects, like a settler's butter churn. A secondary source was made later by someone who studied the past. A history book or an encyclopedia article is a secondary source. Good detectives check more than one source. If a diary and a newspaper tell the same story, we can trust it more.",
        visual: {
          type: "compare",
          left: { title: "Primary source (made at the time)", points: ["A letter written in 1850", "An old photo of Main Street", "A newspaper from the day the bridge opened", "A pioneer's diary"] },
          right: { title: "Secondary source (made later)", points: ["A history book about your state", "An encyclopedia article", "A website about the 1800s", "A museum poster explaining old tools"] },
        },
        probe: {
          type: "sort",
          prompt: "Sort each clue: primary source or secondary source?",
          buckets: ["📜 Primary (made at the time)", "📘 Secondary (made later)"],
          items: [
            { text: "A diary a settler wrote in 1840", bucket: 0 },
            { text: "A photo taken when the town hall opened", bucket: 0 },
            { text: "A newspaper from the day the railroad came", bucket: 0 },
            { text: "A history book written last year", bucket: 1 },
            { text: "An encyclopedia article about pioneers", bucket: 1 },
            { text: "A video made today about life in 1900", bucket: 1 },
          ],
          hint: "Ask: was this made by someone who was there, at that time? If yes, it's primary.",
          mistakes: [
            { match: "History book sorted as primary", coach: "The book's writer wasn't there. They studied the past later, so it's a secondary source." },
            { match: "Diary sorted as secondary", coach: "The settler wrote the diary while living through it, so it's a primary source." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which is a primary source about the day a town's first bridge opened?",
          choices: ["A history book written 100 years later", "A newspaper printed that same day", "A movie made last year", "A map of today's highways"],
          answer: 1,
          why: "The newspaper was made at the time by people who were there.",
          hints: [
            "The book was written long after, by someone who wasn't there.",
            "",
            "A movie made last year was made long after the bridge opened.",
            "Today's map doesn't show what happened on that day long ago.",
          ],
        },
        approaches: {
          analogy:
            "If you tell your friend about your own birthday party, you're a primary source: you were there. If your friend tells someone else about it later, that's a secondary source.",
          example:
            "Imagine studying a town's big flood in 1913. A photo of the flooded street and a letter from someone who lived there are primary sources. A book written in 2010 about the flood is a secondary source.",
          simpler: {
            q: "Was a diary written by a pioneer made at the time, or later?",
            choices: ["At the time", "Later"],
            answer: 0,
            why: "The pioneer wrote it while living through those days, so it was made at the time.",
            hints: ["", "The pioneer wrote about their own days as they happened. That's at the time."],
          },
        },
      },
      {
        title: "Then and Now on a Timeline",
        teach:
          "Places change over time. Dirt roads became paved streets. Horses and wagons gave way to cars. Candles and oil lamps gave way to electric lights. Small one-room schoolhouses grew into big schools. A timeline helps us see these changes. It puts events in order, from earliest to latest, along a line like a ruler. On a timeline, we can spot causes and effects. When a railroad came to a town, more people moved in. Then new stores, schools and churches were built. One change often leads to the next.",
        visual: {
          type: "timeline",
          events: [
            { year: 1776, label: "Declaration of Independence", detail: "The thirteen colonies declared they were a free nation." },
            { year: 1787, label: "Delaware becomes the first state", detail: "Delaware was the first state to approve the U.S. Constitution." },
            { year: 1825, label: "Erie Canal opens", detail: "Boats could travel between the Hudson River and the Great Lakes." },
            { year: 1869, label: "Railroad crosses the country", detail: "The first railroad across the United States was finished." },
            { year: 1903, label: "First airplane flight", detail: "The Wright brothers flew the first powered airplane." },
            { year: 1959, label: "Hawaii becomes the 50th state", detail: "Alaska became the 49th state and Hawaii the 50th, both in 1959." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each event to its year on the timeline.",
          min: 1750,
          max: 2000,
          step: 1,
          tolerance: 6,
          items: [
            { label: "Declaration of Independence (1776)", value: 1776 },
            { label: "Railroad crosses the country (1869)", value: 1869 },
            { label: "First airplane flight (1903)", value: 1903 },
            { label: "Hawaii becomes the 50th state (1959)", value: 1959 },
          ],
          hint: "Earlier years go on the left, later years on the right. Each event shows its year.",
          seconds: 40,
        },
        think: {
          q: "On a timeline, where does the earliest event go?",
          choices: ["At the far right", "In the middle", "At the far left", "Anywhere at all"],
          answer: 2,
          why: "Timelines go from earliest on the left to latest on the right.",
          hints: [
            "The right end is for the latest events, not the earliest.",
            "The middle is for events in between. Where does a timeline start?",
            "",
            "A timeline only works if events are in order.",
          ],
        },
        approaches: {
          analogy:
            "A timeline is like a line of kids ordered by birthday. The oldest stands first and the youngest stands last. Events line up the same way, oldest first.",
          example:
            "Here's a town's story in order: 1850, a family builds a mill. 1880, the railroad comes. 1885, a bank and a school open. 1920, the main street is paved. Each step helped cause the next one.",
          simpler: {
            q: "Which came first: horse and wagon, or cars?",
            choices: ["Horse and wagon", "Cars"],
            answer: 0,
            why: "People traveled by horse and wagon long before cars were invented.",
            hints: ["", "Cars became common in the 1900s. Horses carried people long before that."],
          },
        },
      },
      {
        title: "Your State and Its Symbols",
        teach:
          "The United States has 50 states. Delaware was the first state, in 1787. Hawaii became the 50th, in 1959. Every state has a capital city, where the state's leaders meet to make laws. The capital is often not the biggest city. Every state also has symbols. There's a state flag, a state seal, a state bird, a state flower and a state tree. Many states have a motto too, a short saying about what people there believe. Symbols help people feel proud of their state. Do you know your state's capital and its state bird?",
        visual: {
          type: "hotspots",
          title: "State symbols",
          center: "Your state",
          spots: [
            { label: "Capital", icon: "🏛️", detail: "The city where the state's leaders meet to make laws." },
            { label: "Flag", icon: "🚩", detail: "A flag with colors and pictures that stand for the state." },
            { label: "Seal", icon: "🔵", detail: "An official stamp used on important state papers." },
            { label: "State bird", icon: "🐦", detail: "A bird chosen to stand for the state, often one that lives there." },
            { label: "State flower", icon: "🌸", detail: "A flower chosen to stand for the state." },
            { label: "Motto", icon: "💬", detail: "A short saying about what the people of the state value." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each state symbol to what it is.",
          pairs: [
            { left: "Capital", right: "The city where state leaders make laws" },
            { left: "Seal", right: "An official stamp for important papers" },
            { left: "Motto", right: "A short saying about what people value" },
            { left: "State bird", right: "A bird chosen to stand for the state" },
          ],
          hint: "The capital is a place, the seal is a stamp, and the motto is a saying.",
          seconds: 35,
        },
        think: {
          q: "What happens in a state's capital city?",
          choices: ["All the state's farms are there", "The state's leaders meet to make laws", "Only the biggest sports teams play there", "Nothing special"],
          answer: 1,
          why: "The capital is where the state government meets and works.",
          hints: [
            "Farms are spread all over a state, not in one city.",
            "",
            "Sports teams don't make a city the capital. Think about government.",
            "The capital has a special job. Think about where laws are made.",
          ],
        },
        approaches: {
          analogy:
            "A state capital is like the principal's office of a school. It's where the leaders meet and decisions are made for everyone.",
          example:
            "New York City is the biggest city in New York, but the capital is Albany. In California, the capital is Sacramento, not Los Angeles. The capital is chosen for the government, not for its size.",
          simpler: {
            q: "How many states are in the United States?",
            choices: ["13", "50"],
            answer: 1,
            why: "There are 50 states. Hawaii became the 50th in 1959.",
            hints: ["13 was the number of colonies that first formed the country. More states joined later.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put this town's story in order, from earliest to latest.",
      steps: [
        "Native American peoples hunt and fish along the river.",
        "Settlers build log cabins and a mill by the river.",
        "The railroad arrives, and the town grows quickly.",
        "Electric lights and paved streets come to Main Street.",
        "Today, families drive cars to a big new school.",
      ],
    },
    explain: {
      prompt: "Tell how a town like yours probably began and changed over time. Explain how historians use primary and secondary sources to learn the story.",
      keyPoints: [
        "Native American peoples lived on the land first",
        "Settlers built towns near water, farmland, roads or railroads",
        "Towns change over time, like roads, travel and schools",
        "Primary sources were made at the time by people who were there",
        "Secondary sources were made later",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Primary or secondary source?",
        buckets: ["📜 Primary", "📘 Secondary"],
        items: [
          { text: "A letter from a soldier in 1863", bucket: 0 },
          { text: "An old map drawn by a settler", bucket: 0 },
          { text: "Your grandparent's old school report card", bucket: 0 },
          { text: "A textbook chapter about the 1800s", bucket: 1 },
          { text: "A website summary of your state's history", bucket: 1 },
        ],
        hint: "Primary sources were made by people who were there, at the time.",
        seconds: 35,
      },
      {
        type: "place",
        prompt: "Put these on the timeline.",
        min: 1750,
        max: 2000,
        step: 1,
        tolerance: 6,
        items: [
          { label: "Delaware becomes the first state (1787)", value: 1787 },
          { label: "Erie Canal opens (1825)", value: 1825 },
          { label: "Alaska and Hawaii become states (1959)", value: 1959 },
        ],
        hint: "Earliest on the left, latest on the right.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "The city where a state's leaders make laws is its {0}. A short saying about what the state values is its {1}. Delaware was the {2} state.",
        blanks: [{ answers: ["capital"] }, { answers: ["motto"] }, { answers: ["first", "1st"] }],
        bank: ["capital", "motto", "first", "seal", "last"],
        hint: "Laws are made in the capital. A saying is a motto. Delaware joined in 1787, before any other state.",
        mistakes: [
          { match: "seal", coach: "A seal is an official stamp. A short saying is a motto." },
          { match: "last", coach: "Delaware joined in 1787, before every other state. Hawaii was the last, in 1959." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match the change from then to now.",
        pairs: [
          { left: "Horse and wagon", right: "Car" },
          { left: "Oil lamp", right: "Electric light" },
          { left: "Dirt road", right: "Paved street" },
          { left: "One-room schoolhouse", right: "Big school with many classrooms" },
        ],
        hint: "Each old thing on the left was replaced by something newer that does the same job.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which is a primary source?",
        choices: ["A history book written this year", "An encyclopedia article", "A diary written by a pioneer"],
        answer: 2,
        why: "The pioneer wrote the diary at the time, so it's a primary source.",
      },
      {
        q: "Who lived on the land before states and settlers' towns?",
        choices: ["Native American peoples", "Nobody", "Astronauts"],
        answer: 0,
        why: "Native American peoples lived across the land for thousands of years.",
      },
      {
        q: "What is a state capital?",
        choices: ["The biggest city in every state", "The city where state leaders make laws", "The oldest farm in the state", "A kind of flag"],
        answer: 1,
        why: "The capital is where the state government meets; it isn't always the biggest city.",
      },
      {
        q: "Which state became the 50th state, in 1959?",
        choices: ["Delaware", "Ohio", "Texas", "Hawaii"],
        answer: 3,
        why: "Hawaii became the 50th state in 1959, a few months after Alaska became the 49th.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Be a history detective with a parent. Find out when your town and state began, your state's capital, and three state symbols (like the bird, flower and motto). Find one primary source, like an old family photo or an old newspaper online. Make a timeline with at least four events from your town or state.",
      rubric: [
        "Names the state capital and at least three state symbols",
        "Finds and describes one primary source",
        "Makes a timeline with at least four events in the right order",
        "Explains one way the town changed over time",
      ],
    },
  },

  // 5. Local and state government and its three branches
  {
    id: "soc-3.government",
    title: "Local and State Government",
    minutes: 30,
    stage: "grammar",
    standards: ["SS.3.12", "SS.3.13", "SS.3.14", "D2.Civ.1.3-5", "D2.Civ.3.3-5", "D2.Civ.4.3-5", "D2.Civ.5.3-5", "D2.Civ.11.3-5", "D2.Civ.12.3-5", "D2.Civ.13.3-5", "D2.Eco.10.3-5"],
    read: [
      "Imagine a town with no rules and no one in charge. Who would fix the potholes? Who would put out fires? Government is the group of people with the power to make laws, carry them out and settle disagreements. A good government protects people's rights, keeps them safe and provides services that people can't easily provide alone.",
      "In the United States, government has three levels. Local government runs a town, city or county. State government runs a whole state. National government, also called federal government, runs the whole country.",
      "Each level splits its power into three branches, so no one person or group has too much power. The legislative branch makes the laws. In a town, that's usually the city council. In a state, it's the state legislature. In the nation, it's Congress. The executive branch carries out the laws. A town often has a mayor, a state has a governor, and the nation has the President. The judicial branch is the courts. Judges decide what laws mean and whether they were broken, and they settle disagreements fairly.",
      "Governments provide services. Local governments run police and fire departments, libraries, parks, trash pickup and local streets. State governments build highways, run state parks and give out driver's licenses. The national government runs the military, the mail and makes our money. All of these are paid for with taxes, money that citizens and businesses pay to the government.",
      "When a town needs a new rule, citizens can speak at a council meeting. The council talks it over and votes. Then the mayor and town workers carry it out. That's the three branches at work, right in your hometown.",
    ].join("\n\n"),
    keyIdeas: [
      "Government makes laws, carries them out and settles disagreements, and it protects people's rights.",
      "There are three levels: local, state and national.",
      "Each level has three branches: legislative (makes laws), executive (carries them out) and judicial (courts).",
      "Taxes pay for government services like police, fire, parks, libraries and roads.",
    ],
    hook: {
      text: "A big pothole opens on your street. Cars bump. Bikes swerve. Who fixes it, and who pays? The answer is your local government. Let's meet the people who run your town and your state!",
    },
    teach: [
      {
        title: "Why We Have Government",
        teach:
          "Government is the group of people with the power to make laws, carry them out and settle disagreements. Laws keep people safe and protect their rights. Government also provides services people can't easily provide alone, like roads and fire trucks. In the United States, government has three levels. Local government runs a town, city or county. Its leader is often a mayor. State government runs a whole state, and its leader is the governor. National government runs the whole country, and its leader is the President. Each level has its own jobs.",
        visual: {
          type: "hotspots",
          title: "Three levels of government",
          center: "Government",
          spots: [
            { label: "Local", icon: "🏘️", detail: "Runs a town, city or county. Leaders include a mayor and a city council." },
            { label: "State", icon: "🏛️", detail: "Runs a whole state. Leaders include the governor and the state legislature." },
            { label: "National", icon: "🇺🇸", detail: "Runs the whole country. Leaders include the President and Congress." },
            { label: "Laws", icon: "📜", detail: "Rules that everyone must follow, made to keep people safe and protect their rights." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each level of government to its main leader.",
          pairs: [
            { left: "Local (a town or city)", right: "Mayor" },
            { left: "State", right: "Governor" },
            { left: "National (the whole country)", right: "President" },
          ],
          hint: "Smallest to biggest: the town has a mayor, the state has a governor, the country has a President.",
          mistakes: [
            { match: "State matched to mayor", coach: "A mayor leads a town or city. The leader of a whole state is the governor." },
          ],
          seconds: 25,
        },
        think: {
          q: "Who is the leader of a state's government?",
          choices: ["The mayor", "The President", "The governor", "The principal"],
          answer: 2,
          why: "Every state has a governor who leads the state's executive branch.",
          hints: [
            "A mayor leads a town or city, which is smaller than a state.",
            "The President leads the whole country, not just one state.",
            "",
            "A principal leads a school, not a state government.",
          ],
        },
        approaches: {
          analogy:
            "Government levels are like nesting boxes. Your town is a small box inside your state, a bigger box. Your state sits inside the biggest box, the country. Each box has its own leader.",
          example:
            "Your home sits in a town, so the mayor and city council make town rules. Your town is in a state, so the governor and state legislature make state laws. And the whole country follows national laws from Congress and the President.",
          simpler: {
            q: "Which is bigger: a town or a state?",
            choices: ["A town", "A state"],
            answer: 1,
            why: "A state has many towns and cities inside it.",
            hints: ["A town is one community. A state holds many towns.", ""],
          },
        },
      },
      {
        title: "The Three Branches",
        teach:
          "Each level of government splits its power into three branches, so no one person or group gets too much power. The legislative branch makes the laws. In a town, that's usually the city council. In a state, it's the state legislature. In the nation, it's Congress. The executive branch carries out the laws. That's the mayor, the governor or the President. The judicial branch is the courts. Judges decide what laws mean and whether someone broke a law. They settle disagreements fairly. The branches check each other. This idea is called checks and balances.",
        visual: {
          type: "hotspots",
          title: "Three branches of government",
          center: "Power is shared",
          spots: [
            { label: "Legislative", icon: "📜", detail: "Makes the laws: city council, state legislature, Congress." },
            { label: "Executive", icon: "🏛️", detail: "Carries out the laws: mayor, governor, President." },
            { label: "Judicial", icon: "⚖️", detail: "The courts: judges decide what laws mean and settle disagreements." },
            { label: "Checks and balances", icon: "🤝", detail: "Each branch can limit the others, so no one has too much power." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each leader or group into its branch.",
          buckets: ["📜 Legislative (makes laws)", "🏛️ Executive (carries out laws)", "⚖️ Judicial (courts)"],
          items: [
            { text: "City council", bucket: 0 },
            { text: "State legislature", bucket: 0 },
            { text: "Congress", bucket: 0 },
            { text: "Mayor", bucket: 1 },
            { text: "Governor", bucket: 1 },
            { text: "President", bucket: 1 },
            { text: "A judge", bucket: 2 },
            { text: "The state supreme court", bucket: 2 },
          ],
          hint: "Groups that vote on laws are legislative. One leader who carries out laws is executive. Courts and judges are judicial.",
          mistakes: [
            { match: "Governor sorted as legislative", coach: "The governor carries out the state's laws, so the governor is in the executive branch." },
            { match: "City council sorted as executive", coach: "The city council votes to make town laws, so it's legislative." },
          ],
          seconds: 50,
        },
        think: {
          q: "Which branch makes the laws?",
          choices: ["The legislative branch", "The executive branch", "The judicial branch"],
          answer: 0,
          why: "The legislative branch, like a city council or state legislature, makes laws.",
          hints: [
            "",
            "The executive branch carries out laws, but doesn't make them.",
            "The judicial branch decides what laws mean, but doesn't write them.",
          ],
        },
        approaches: {
          analogy:
            "Think of a soccer league. One group writes the rules (legislative). The coaches and league officers run the games by the rules (executive). The referees decide if a rule was broken (judicial). Nobody gets to do all three.",
          example:
            "A city council votes on a law: no parking by fire hydrants. The mayor's police department puts up signs and writes tickets. If a driver says the ticket was unfair, a judge listens and decides.",
          simpler: {
            q: "Who works in the courts and decides if a law was broken?",
            choices: ["A judge", "A mayor"],
            answer: 0,
            why: "Judges work in the courts, the judicial branch.",
            hints: ["", "A mayor carries out laws. Courts are where judges decide."],
          },
        },
      },
      {
        title: "Services and Taxes",
        teach:
          "Governments provide services, jobs done for everyone. Local governments run police and fire departments, public libraries, parks, trash pickup and local streets. State governments build highways, run state parks and give out driver's licenses. The national government runs the military, the post office and prints our money. Who pays for all of this? We do, with taxes. Taxes are money that people and businesses pay to the government. When many families each pay a little, the town can buy a fire truck that no single family could afford.",
        visual: {
          type: "compare",
          left: { title: "Local services", points: ["Police and fire departments", "Public library", "Parks and playgrounds", "Trash pickup and local streets"] },
          right: { title: "State services", points: ["Highways between cities", "State parks", "Driver's licenses", "State police"] },
        },
        probe: {
          type: "number",
          prompt: "A small town wants a new playground. 100 families each pay $20 in taxes for it. How many dollars does the town collect?",
          answer: 2000,
          unit: "dollars",
          hint: "100 groups of $20. Think: 20 × 100.",
          mistakes: [
            { match: "120", coach: "Don't add 100 and 20. Each of the 100 families pays $20, so multiply." },
            { match: "200", coach: "That's only 10 families. Each of 100 families pays $20: 20 × 100." },
          ],
          seconds: 35,
        },
        think: {
          q: "How do governments pay for services like parks and fire trucks?",
          choices: ["With taxes paid by people and businesses", "The money grows on trees", "Firefighters pay for them", "They are always free to make"],
          answer: 0,
          why: "Taxes from citizens and businesses pay for government services.",
          hints: [
            "",
            "Money doesn't grow on trees! Someone has to pay for these services.",
            "Firefighters are paid workers. The money comes from everyone in town.",
            "Fire trucks and parks cost a lot to build and run. Who pays?",
          ],
        },
        approaches: {
          analogy:
            "Taxes are like a class party where everyone brings $1. Alone, $1 buys almost nothing. Together, the class has enough for snacks and games that everyone shares.",
          example:
            "A town of 5,000 families needs a new fire truck. No single family could pay for it. But if every family pays a small part in taxes, together they can buy the truck that protects them all.",
          simpler: {
            q: "Who runs a public library: the government or a shoe store?",
            choices: ["The government", "A shoe store"],
            answer: 0,
            why: "Public libraries are a local government service paid for by taxes.",
            hints: ["", "A shoe store sells shoes. Public libraries are run by the town or county."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "How does a town make a new rule? Put the steps in order.",
      steps: [
        "Citizens notice a problem: cars speed past the school.",
        "Citizens speak at a city council meeting.",
        "The city council talks it over and votes on a lower speed limit.",
        "The mayor and town workers put up new speed limit signs.",
        "If someone says a speeding ticket was unfair, a judge decides.",
      ],
    },
    explain: {
      prompt: "Explain the three levels of government and the three branches. Name a leader in each branch of your town or state, and tell how taxes are used.",
      keyPoints: [
        "Three levels: local, state and national",
        "The legislative branch makes laws",
        "The executive branch carries out laws (mayor, governor, President)",
        "The judicial branch is the courts and judges",
        "Taxes pay for government services",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Which level of government usually provides each service?",
        buckets: ["🏘️ Local", "🏛️ State", "🇺🇸 National"],
        items: [
          { text: "Fire department", bucket: 0 },
          { text: "Town library", bucket: 0 },
          { text: "Driver's licenses", bucket: 1 },
          { text: "Highways between cities", bucket: 1 },
          { text: "The army and navy", bucket: 2 },
          { text: "Printing money", bucket: 2 },
        ],
        hint: "Local is your town. State covers the whole state. National covers the whole country.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "The {0} branch makes the laws. The {1} branch carries out the laws. The {2} branch is the courts.",
        blanks: [{ answers: ["legislative"] }, { answers: ["executive"] }, { answers: ["judicial"] }],
        bank: ["legislative", "executive", "judicial", "national"],
        hint: "Legislative makes, executive carries out, judicial judges.",
        mistakes: [{ match: "national", coach: "National is a level of government, not a branch." }],
        seconds: 30,
      },
      {
        type: "number",
        prompt: "A city council has 9 members. 5 vote yes on a new park rule, and the rest vote no. How many vote no?",
        answer: 4,
        hint: "Start with all 9 members and take away the 5 who voted yes.",
        mistakes: [{ match: "14", coach: "Don't add. Some of the 9 voted yes; the rest voted no. Subtract: 9 − 5." }],
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build the sentence about why power is split into three branches.",
        tiles: ["Power is split", "into three branches", "so no one", "has too much power"],
        distractors: ["so the mayor", "makes every law"],
        hint: "Checks and balances: sharing power keeps it safe.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What are the three levels of government?",
        choices: ["Small, medium and large", "Local, state and national", "Mayor, governor and judge"],
        answer: 1,
        why: "Government works at the local, state and national levels.",
      },
      {
        q: "Who leads the executive branch of a state?",
        choices: ["The governor", "A judge", "The city council", "The mayor"],
        answer: 0,
        why: "The governor carries out the state's laws.",
      },
      {
        q: "What does the judicial branch do?",
        choices: ["Makes the laws", "Collects the trash", "Decides what laws mean and settles disagreements", "Prints money"],
        answer: 2,
        why: "Judges in the courts decide what laws mean and whether they were broken.",
      },
      {
        q: "What pays for a town's police, parks and library?",
        choices: ["Bake sales only", "Nothing; they're free", "Money from other countries", "Taxes"],
        answer: 3,
        why: "Taxes paid by citizens and businesses pay for government services.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, find out who leads your town and state: your mayor (or town leader), your city or county council, your governor and your state's capital. Then make a poster of the three branches for your town or state, with one job each branch does.",
      rubric: [
        "Names the town or county leader and the governor",
        "Shows all three branches with the right names",
        "Gives one correct job for each branch",
        "Names one service paid for with taxes",
      ],
    },
  },

  // 6. Being an active citizen
  {
    id: "soc-3.citizen",
    title: "Being an Active Citizen",
    minutes: 30,
    stage: "rhetoric",
    standards: ["SS.3.15", "SS.3.16", "D2.Civ.2.3-5", "D2.Civ.6.3-5", "D2.Civ.7.3-5", "D2.Civ.8.3-5", "D2.Civ.9.3-5", "D2.Civ.14.3-5"],
    read: [
      "A citizen is a member of a community and a country. Citizens of the United States have rights, which are freedoms that belong to them. The Bill of Rights, the first ten amendments to the Constitution, protects freedoms like speaking your mind, worshiping as you choose and gathering peacefully. When citizens turn 18, they gain the right to vote.",
      "Rights come with responsibilities, things citizens should do. Good citizens obey the laws, pay their taxes, tell the truth, respect other people and their property, and stay informed about their community. Grown-up citizens may also serve on a jury, helping a court decide a case fairly.",
      "Good citizens practice civic virtues, habits that help a community thrive. Honesty means telling the truth. Responsibility means doing your part. Respect means treating others well, even when you disagree. Courage means doing what is right when it is hard. Service means helping others without being asked.",
      "Benjamin Franklin is a great example of an active citizen. In Philadelphia, he helped start a library where people could borrow books, in 1731, and a volunteer fire company, in 1736. He saw a problem and gathered neighbors to solve it.",
      "You can be an active citizen too, even as a kid. Active citizens solve problems step by step. First, notice a problem, like litter in a park. Next, learn the facts. Then think of solutions, and choose one together, often by voting. Make a plan and act on it, like a clean-up day or a polite letter to the city council. Finally, look back: did it work? When people listen, take turns and work together, a community gets better for everyone.",
    ].join("\n\n"),
    keyIdeas: [
      "Citizens have rights, like freedom of speech, and responsibilities, like obeying laws and telling the truth.",
      "Civic virtues like honesty, responsibility, respect, courage and service help a community thrive.",
      "Active citizens solve community problems step by step: notice, learn, plan, act and look back.",
    ],
    hook: {
      text: "In 1736, a young printer named Benjamin Franklin worried about fires in his city, Philadelphia. There was no fire department like the ones we have today. So he gathered his neighbors, and together they made one. You don't have to be grown up to make your community better. Let's learn how!",
    },
    teach: [
      {
        title: "Rights and Responsibilities",
        teach:
          "A citizen is a member of a community and a country. Citizens have rights, which are freedoms that belong to them. The Bill of Rights is the first ten amendments to the Constitution. It protects freedoms like speaking your mind, worshiping as you choose and gathering peacefully. At 18, citizens can vote. But rights come with responsibilities, things a good citizen should do. Citizens obey the laws, pay taxes and respect other people and their property. Grown-ups may serve on a jury to help a court decide a case fairly. Rights and responsibilities go together, like two sides of a coin.",
        visual: {
          type: "compare",
          left: { title: "Rights (freedoms we have)", points: ["Speak your mind", "Worship as you choose", "Gather peacefully", "Vote at age 18"] },
          right: { title: "Responsibilities (things we should do)", points: ["Obey the laws", "Pay taxes", "Respect others and their property", "Serve on a jury when called"] },
        },
        probe: {
          type: "sort",
          prompt: "Is it a right or a responsibility?",
          buckets: ["🗽 Right (a freedom)", "🧹 Responsibility (a duty)"],
          items: [
            { text: "Speaking your mind", bucket: 0 },
            { text: "Worshiping as you choose", bucket: 0 },
            { text: "Gathering peacefully with others", bucket: 0 },
            { text: "Obeying the laws", bucket: 1 },
            { text: "Paying taxes", bucket: 1 },
            { text: "Serving on a jury when called", bucket: 1 },
          ],
          hint: "A right is a freedom you have. A responsibility is something you should do for the community.",
          mistakes: [
            { match: "Paying taxes sorted as a right", coach: "Paying taxes is a duty citizens owe, so it's a responsibility." },
            { match: "Speaking your mind sorted as a responsibility", coach: "Freedom of speech is protected by the Bill of Rights. It's a right." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which is a responsibility of a citizen?",
          choices: ["Freedom of speech", "Obeying the laws", "Freedom to worship", "Gathering peacefully"],
          answer: 1,
          why: "Obeying the laws is something citizens should do, a responsibility.",
          hints: [
            "Freedom of speech is a right protected by the Bill of Rights.",
            "",
            "Freedom to worship is a right, a freedom citizens have.",
            "Gathering peacefully is a right protected by the Bill of Rights.",
          ],
        },
        approaches: {
          analogy:
            "Having a library card gives you the right to borrow books. But you have the responsibility to return them on time and keep them clean. Rights and responsibilities always come together.",
          example:
            "Ella has the right to speak at a town meeting about the park. She also has the responsibility to wait her turn, tell the truth and listen politely when others speak.",
          simpler: {
            q: "Is freedom of speech a right or a responsibility?",
            choices: ["A right", "A responsibility"],
            answer: 0,
            why: "Freedom of speech is a right, protected by the Bill of Rights.",
            hints: ["", "A responsibility is a duty, like obeying laws. Free speech is a freedom you have."],
          },
        },
      },
      {
        title: "Civic Virtues",
        teach:
          "Civic virtues are good habits that help a community thrive. Honesty means telling the truth, even when it's hard. Responsibility means doing your part and keeping your promises. Respect means treating others well, even when you disagree. Courage means doing what is right when it isn't easy. Service means helping others without being asked. Benjamin Franklin lived these virtues. In Philadelphia, he helped start a library where people could borrow books, in 1731. In 1736, he started a volunteer fire company. He saw problems and gathered neighbors to fix them.",
        visual: {
          type: "flip",
          cards: [
            { front: "🤥➡️😇 Honesty", back: "Telling the truth, even when it's hard." },
            { front: "✅ Responsibility", back: "Doing your part and keeping promises." },
            { front: "🤝 Respect", back: "Treating others well, even when you disagree." },
            { front: "🦁 Courage", back: "Doing what's right when it isn't easy." },
            { front: "🙋 Service", back: "Helping others without being asked." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each action to the civic virtue it shows.",
          pairs: [
            { left: "Owning up after you break a neighbor's window", right: "Honesty" },
            { left: "Feeding the class fish every day like you promised", right: "Responsibility" },
            { left: "Listening politely to someone you disagree with", right: "Respect" },
            { left: "Standing up for a kid who is being teased", right: "Courage" },
            { left: "Raking an elderly neighbor's leaves for free", right: "Service" },
          ],
          hint: "Ask: is this person telling the truth, doing their job, being polite, being brave or helping?",
          seconds: 50,
        },
        think: {
          q: "Benjamin Franklin started a volunteer fire company. Which civic virtue does that show most?",
          choices: ["Service", "Self-interest", "Silliness", "Laziness"],
          answer: 0,
          why: "He helped his whole city without being asked: that's service.",
          hints: [
            "",
            "The fire company protected everyone's homes, not just his own.",
            "Fighting fires is serious work, not silliness.",
            "Starting a fire company is hard work, the opposite of laziness.",
          ],
        },
        approaches: {
          analogy:
            "Civic virtues are like the rules of a good team. A team wins when players are honest, do their part, respect each other, are brave and help each other. A community works the same way.",
          example:
            "Before public libraries were common, books were expensive. Franklin and his friends each put in money to buy books and shared them. That was the Library Company of Philadelphia, started in 1731, which still exists today.",
          simpler: {
            q: "Telling the truth is which virtue?",
            choices: ["Courage", "Honesty"],
            answer: 1,
            why: "Honesty means telling the truth.",
            hints: ["Courage is being brave. Telling the truth has its own name.", ""],
          },
        },
      },
      {
        title: "Solving Problems Together",
        teach:
          "Active citizens don't just notice problems. They help solve them, step by step. First, notice a problem, like litter in the park. Next, learn the facts. Where does the litter come from? Then think of solutions. Maybe more trash cans, or a clean-up day. Choose one together. Groups often vote, and the choice with the most votes wins. Good groups listen to everyone and sometimes compromise, which means each side gives a little. Then make a plan and act, like holding a clean-up day or writing a polite letter to the city council. Finally, look back: did it work?",
        visual: {
          type: "flip",
          cards: [
            { front: "1️⃣ Notice", back: "Spot a problem in your community." },
            { front: "2️⃣ Learn", back: "Find the facts. Ask questions." },
            { front: "3️⃣ Choose", back: "List solutions and choose one together, often by voting." },
            { front: "4️⃣ Act", back: "Make a plan and do it: volunteer, or write a polite letter to leaders." },
            { front: "5️⃣ Look back", back: "Did it work? What would you do better next time?" },
            { front: "🤝 Compromise", back: "Each side gives a little so the group can agree." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps for solving a community problem in order.",
          steps: [
            "Notice a problem: the park is full of litter.",
            "Learn the facts: count the trash cans and see where litter piles up.",
            "List ideas and vote on the best one: a clean-up day.",
            "Act: hold the clean-up day and write a polite letter asking for more trash cans.",
            "Look back: check the park a month later to see if it worked.",
          ],
          hint: "You can't fix a problem before you notice it, and you can't look back before you act.",
          seconds: 45,
        },
        think: {
          q: "Your club can't agree: half want a bake sale, half want a car wash. What's a good compromise?",
          choices: ["Stop talking to each other", "Let one person decide everything", "Do a bake sale and car wash on the same day", "Give up on raising money"],
          answer: 2,
          why: "A compromise means each side gives a little, so both ideas get a part.",
          hints: [
            "Not talking won't solve the problem. Good citizens keep listening.",
            "That isn't fair to the group. A compromise lets both sides give a little.",
            "",
            "Giving up means no one gets anything. Look for a way both sides win a little.",
          ],
        },
        approaches: {
          analogy:
            "Solving a community problem is like fixing a flat bike tire. First you notice it's flat. Then you find the hole. Then you choose a patch, put it on, and pump it up to check it worked.",
          example:
            "A class notices the crosswalk by school is faded. They count how many kids cross there each morning. They vote to write a polite letter to the town. The town repaints the crosswalk, and the class checks it the next week.",
          simpler: {
            q: "What's the first step in solving a community problem?",
            choices: ["Notice the problem", "Look back to see if it worked"],
            answer: 0,
            why: "You have to notice a problem before you can solve it.",
            hints: ["", "Looking back is the last step, after you've acted."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every sentence that shows an active citizen.",
      sentences: [
        "Noah picks up trash at the park on clean-up day.",
        "Ava writes a polite letter to the city council about a broken swing.",
        "Leo throws his juice box on the sidewalk.",
        "Grace listens to every idea before her club votes.",
        "Max yells and interrupts at the town meeting.",
        "Mr. Lee serves on a jury when he is called.",
      ],
      correct: [0, 1, 3, 5],
    },
    explain: {
      prompt: "Pick a problem in your neighborhood or town. Explain how you and others could solve it as active citizens, and name the civic virtues you would use.",
      keyPoints: [
        "Notices a real problem and learns the facts",
        "Lists solutions and chooses one together, like by voting",
        "Acts, like volunteering or writing a polite letter to leaders",
        "Names civic virtues like honesty, responsibility, respect, courage or service",
        "Looks back to see if it worked",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Freedom of speech is a {0}. Obeying the laws is a {1}. When each side of a disagreement gives a little, that's a {2}.",
        blanks: [{ answers: ["right"] }, { answers: ["responsibility"] }, { answers: ["compromise"] }],
        bank: ["right", "responsibility", "compromise", "tax", "mayor"],
        hint: "Freedoms are rights. Duties are responsibilities. Giving a little to agree is a compromise.",
        mistakes: [
          { match: "tax", coach: "A tax is money paid to government. Look for the word for a duty or a freedom." },
          { match: "mayor", coach: "A mayor is a town leader, not a freedom or a duty." },
        ],
        seconds: 35,
      },
      {
        type: "number",
        prompt: "A club of 15 kids votes on a project. 9 vote for a park clean-up, and the rest vote for a food drive. How many vote for the food drive?",
        answer: 6,
        unit: "kids",
        hint: "Take the 9 park votes away from all 15 kids.",
        mistakes: [{ match: "24", coach: "Don't add. Some of the 15 voted for the park; subtract to find the rest." }],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each civic virtue to its meaning.",
        pairs: [
          { left: "Honesty", right: "Telling the truth" },
          { left: "Respect", right: "Treating others well, even when you disagree" },
          { left: "Service", right: "Helping others without being asked" },
          { left: "Courage", right: "Doing what's right when it's hard" },
        ],
        hint: "Say each virtue in a sentence about someone you know.",
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build a polite opening for a letter to your city council.",
        tiles: ["Dear City Council,", "thank you for", "our town parks.", "I would like to share", "an idea to keep them clean."],
        distractors: ["You never do anything!"],
        hint: "A good letter to leaders is polite, starts with thanks and shares a helpful idea.",
        seconds: 40,
      },
    ],
    check: [
      {
        q: "What does the Bill of Rights protect?",
        choices: ["Freedoms like speech and worship", "The price of bread", "The rules of baseball"],
        answer: 0,
        why: "The Bill of Rights protects freedoms like speech, worship and gathering peacefully.",
      },
      {
        q: "Which is a responsibility of citizens?",
        choices: ["Freedom to worship", "Obeying the laws", "Freedom of speech", "Choosing your favorite color"],
        answer: 1,
        why: "Obeying the laws is something citizens should do.",
      },
      {
        q: "Benjamin Franklin helped start a library and a volunteer fire company. What does that show?",
        choices: ["He wanted to be famous", "He didn't like books", "He was an active citizen who served his community"],
        answer: 2,
        why: "He saw problems in Philadelphia and gathered neighbors to solve them.",
      },
      {
        q: "What is a compromise?",
        choices: ["One person gets everything", "Nobody talks", "A kind of tax", "Each side gives a little to agree"],
        answer: 3,
        why: "In a compromise, each side gives up a little so the group can agree.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, choose a small way to serve your community this week, like picking up litter at a park, helping a neighbor or donating books. Do it, then tell what problem you helped with, what steps you took and which civic virtue you showed.",
      rubric: [
        "Chooses and completes a real act of service",
        "Explains the problem it helped with",
        "Describes the steps taken",
        "Names a civic virtue shown, like service, responsibility or respect",
      ],
    },
  },
]);
