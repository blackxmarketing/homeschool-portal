import { k5Course } from "./base";

/**
 * soc-1: Grade 1 social studies with Ranger Clark. Families then and now,
 * community helpers, maps, good citizens, American symbols, landmarks and
 * holidays. Everything is read aloud, so sentences are short.
 */
export const soc1 = k5Course("soc", 1, [
  // 1. Families and communities then and now
  {
    id: "soc-1.then-now",
    title: "Long Ago and Today",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.1.1", "SS.1.2", "D2.His.1.K-2", "D2.His.2.K-2"],
    read: [
      "Long ago means many, many years ago. Your great-great-grandparents lived long ago. Life was very different then.",
      "Long ago, homes had no electric lights. Families used candles and oil lamps. They cooked on wood stoves. Many families got water from a well. People rode horses or walked. Kids helped with chores, like feeding the chickens. Some kids went to a school with just one room.",
      "Today, we flip a switch for light. We turn on a faucet for water. We ride in cars and buses. We can call Grandma on a phone.",
      "Some things have not changed. Families still eat together. They still work, play and help each other. Kids still go to school and learn to read.",
      "We can put events in order. Long ago comes first. Then comes the past, like when you were a baby. Now is today. Later is the future. A timeline shows events in order, from first to last.",
    ].join("\n\n"),
    keyIdeas: [
      "Long ago, people used candles, wells and horses. Today we have lights, faucets and cars.",
      "Some things stay the same: families still eat, work and play together.",
      "A timeline puts events in order: long ago, the past, now and later.",
    ],
    hook: {
      text: "Howdy, explorer! 🧭 Imagine a house with no lights and no TV. How would you read at night? Let's travel back to long ago!",
    },
    teach: [
      {
        title: "Homes Long Ago",
        teach:
          "Long ago means many, many years ago. Homes had no electric lights. 🕯️ Families used candles and oil lamps. They cooked on wood stoves. 🔥 Water came from a well, one bucket at a time. 🪣 People rode horses or walked. 🐴 Kids did lots of chores. They fed the chickens and carried wood. Many kids went to a school with just one room. 🏫",
        visual: {
          type: "compare",
          left: { title: "🕯️ Long ago", points: ["Candles and oil lamps", "Water from a well", "Horses and wagons", "One-room schools"] },
          right: { title: "💡 Today", points: ["Electric lights", "Water from a faucet", "Cars and buses", "Big schools with many rooms"] },
        },
        probe: {
          type: "sort",
          prompt: "Long ago or today? Sort each picture.",
          buckets: ["🕯️ Long ago", "💡 Today"],
          items: [
            { text: "🕯️ Candle", bucket: 0 },
            { text: "🪣 Water bucket from a well", bucket: 0 },
            { text: "🐴 Horse and wagon", bucket: 0 },
            { text: "💡 Light bulb", bucket: 1 },
            { text: "🚗 Car", bucket: 1 },
            { text: "📱 Phone", bucket: 1 },
          ],
          hint: "Long ago there was no electricity. Did it need a plug or gas to work? Then it is from today.",
          mistakes: [
            { match: "Candle sorted as today", coach: "We still have candles, but long ago candles were the main light at night." },
            { match: "Phone sorted as long ago", coach: "Long ago there were no phones. People wrote letters or visited instead." },
          ],
          seconds: 30,
        },
        think: {
          q: "How did families get light at night long ago?",
          choices: ["Light bulbs", "Candles", "Phones"],
          answer: 1,
          why: "Long ago homes had no electricity, so families lit candles and oil lamps.",
          hints: [
            "Light bulbs need electricity. Long ago homes did not have it.",
            "",
            "Phones are from today. They did not exist long ago.",
          ],
        },
        approaches: {
          analogy: "Long ago was like a camping trip every day. No plugs, no switches. You use a lantern and carry your water.",
          example: "Your great-great-grandma wanted a drink. She walked to the well. She pulled up a bucket. Then she carried it home. 🪣",
          simpler: {
            q: "Did homes long ago have electric lights?",
            choices: ["No", "Yes"],
            answer: 0,
            why: "Long ago homes had no electricity, so there were no electric lights.",
            hints: ["", "Think again. Long ago, families had to light candles to see at night."],
          },
        },
      },
      {
        title: "Life Today",
        teach:
          "Today, life is easier in many ways. We flip a switch, and the light comes on. 💡 We turn a faucet, and water flows. 🚰 We ride in cars and buses. 🚗 We call Grandma on a phone. 📱 But some things stay the same. Families still eat together. 🍽️ Kids still play games and help at home. People still help their neighbors.",
        visual: {
          type: "flip",
          cards: [
            { front: "🕯️ Then", back: "💡 Now: a light bulb" },
            { front: "🐴 Then", back: "🚗 Now: a car" },
            { front: "🪣 Then", back: "🚰 Now: a faucet" },
            { front: "🍽️ Then and now", back: "Families still eat together!" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each long-ago thing to what we use today.",
          pairs: [
            { left: "🕯️ Candle", right: "💡 Light bulb" },
            { left: "🐴 Horse", right: "🚗 Car" },
            { left: "🪣 Well bucket", right: "🚰 Faucet" },
            { left: "🧺 Washboard", right: "🌀 Washing machine" },
          ],
          hint: "Ask: what job did it do? A candle gives light. What gives us light today?",
          mistakes: [{ match: "Horse matched to faucet", coach: "A horse helped people go places. What do we ride in today?" }],
          seconds: 35,
        },
        think: {
          q: "What is the SAME long ago and today?",
          choices: ["We use candles for all our light", "Families eat together", "We get water from a well"],
          answer: 1,
          why: "Long ago and today, families sit down and eat together.",
          hints: [
            "Long ago people used candles. Today we mostly use light bulbs, so that changed.",
            "",
            "Long ago people used wells. Today most homes have a faucet, so that changed.",
          ],
        },
        approaches: {
          analogy: "Life changes like a tree grows. The tree gets new leaves, but the roots stay the same. Families are like the roots.",
          example: "Long ago, a family rode a wagon to church. Today, a family drives a car there. The car is new. Going together is the same!",
          simpler: {
            q: "What do we ride in today?",
            choices: ["A horse and wagon", "A car"],
            answer: 1,
            why: "Today most people ride in cars and buses.",
            hints: ["That was the way to travel long ago. Today we have something faster.", ""],
          },
        },
      },
      {
        title: "Putting Things in Order",
        teach:
          "A timeline puts events in order. The oldest comes first. The newest comes last. ➡️ Long ago is far back. Your great-great-grandma lived then. The past is closer. You were a baby in the past. 👶 Now is today. 🙂 Later is the future. 🚀 Words like first, next and last help us tell the order.",
        visual: {
          type: "flip",
          cards: [
            { front: "Long ago", back: "Many, many years ago, before your grandparents were born." },
            { front: "The past", back: "Time that already happened, like when you were a baby." },
            { front: "Now", back: "Today! Right this minute." },
            { front: "Later", back: "The future: time that has not come yet." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put these in order, from first to last.",
          steps: [
            "👴 Long ago: Great-grandpa is a little boy",
            "👶 The past: You are a baby",
            "🎒 Now: You are in first grade",
            "🎓 Later: You finish school",
          ],
          hint: "Start with the oldest time, long ago. End with later, the future.",
          seconds: 30,
        },
        think: {
          q: "On a timeline, what comes first?",
          choices: ["Now", "Later", "Long ago"],
          answer: 2,
          why: "A timeline starts with the oldest event, so long ago comes first.",
          hints: [
            "Now is today. Lots of things happened before today.",
            "Later is the future. It has not even happened yet!",
            "",
          ],
        },
        approaches: {
          analogy: "A timeline is like a line of kids from shortest to tallest. Here we line up events from oldest to newest.",
          example: "First you wake up. Next you eat breakfast. Last you go play. A timeline of your morning! 🌅🥣⚽",
          simpler: {
            q: "Which came first: you as a baby, or you today?",
            choices: ["Me as a baby", "Me today"],
            answer: 0,
            why: "You were a baby before you grew to be the age you are now.",
            hints: ["", "You grew up from a baby. So the baby time came before today."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Long ago, today, or both? Sort each one.",
      buckets: ["🕯️ Long ago", "💡 Today", "🤝 Both"],
      items: [
        { text: "🪣 Get water from a well", bucket: 0 },
        { text: "🏫 Learn in a one-room school", bucket: 0 },
        { text: "📱 Call Grandma on a phone", bucket: 1 },
        { text: "🚌 Ride a bus to the store", bucket: 1 },
        { text: "🍽️ Eat dinner as a family", bucket: 2 },
        { text: "🧹 Kids help with chores", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell how life long ago was different from today. Then tell one thing that is the same.",
      keyPoints: [
        "Long ago people used candles for light",
        "Long ago people got water from a well or rode horses",
        "Today we have electric lights, faucets and cars",
        "Families still eat, work and play together",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Long ago, people used {0} for light. Today we use {1}.",
        blanks: [{ answers: ["candles"] }, { answers: ["light bulbs"] }],
        bank: ["candles", "light bulbs", "rocks", "puddles"],
        hint: "Long ago there was no electricity. What did people light at night?",
        mistakes: [{ match: "rocks", coach: "Rocks don't make light. Think of something with a little flame." }],
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each long-ago way to today's way.",
        pairs: [
          { left: "🐴 Ride a horse", right: "🚗 Drive a car" },
          { left: "🪣 Pull water from a well", right: "🚰 Turn on a faucet" },
          { left: "🕯️ Light a candle", right: "💡 Flip a switch" },
        ],
        hint: "Find the two that do the same job, like getting water or going places.",
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put Grandma's life in order, from first to last.",
        steps: ["👶 Grandma is a baby", "🎒 Grandma goes to school", "👩 Grandma grows up", "👵 Grandma reads to you"],
        hint: "Everyone starts as a baby, then grows up.",
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Did it change, or stay the same?",
        buckets: ["🔄 Changed", "🤝 Stayed the same"],
        items: [
          { text: "💡 How we light our homes", bucket: 0 },
          { text: "🚗 How we travel", bucket: 0 },
          { text: "🍽️ Families eating together", bucket: 1 },
          { text: "📖 Kids learning to read", bucket: 1 },
        ],
        hint: "Lights and travel are new. Families and learning have been here all along.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What did families use for light long ago?",
        choices: ["Candles and oil lamps", "Light bulbs", "Phones"],
        answer: 0,
        why: "Long ago homes had no electricity, so families used candles and oil lamps.",
      },
      {
        q: "Where did many families get water long ago?",
        choices: ["A faucet", "A water park", "A well"],
        answer: 2,
        why: "Long ago, many families pulled water up from a well.",
      },
      {
        q: "What is still the same today?",
        choices: ["Riding horses everywhere", "Families eating together", "Reading by candlelight"],
        answer: 1,
        why: "Families still eat, work and play together, just like long ago.",
      },
      {
        q: "On a timeline, what comes last?",
        choices: ["Long ago", "The past", "Later"],
        answer: 2,
        why: "Later is the future, so it comes at the end of a timeline.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "Ask a grandparent or an older grown-up: What was it like when you were a kid? What games did you play? Then tell your parent one thing that changed and one thing that stayed the same.",
      rubric: [
        "Asks an older person about when they were young",
        "Tells one thing that changed",
        "Tells one thing that stayed the same",
        "Listens politely and says thank you",
      ],
    },
  },

  // 2. Community helpers, goods and services
  {
    id: "soc-1.helpers",
    title: "Community Helpers, Goods and Services",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.1.3", "SS.1.4", "D2.Civ.2.K-2", "D2.Civ.6.K-2", "D2.Eco.3.K-2", "D2.Eco.4.K-2", "D2.Eco.6.K-2"],
    read: [
      "A community is a place where people live, work and play together. Your town is a community.",
      "Community helpers are people whose jobs help us all. A firefighter puts out fires. A doctor helps sick people get well. A mail carrier brings letters. A farmer grows food. A teacher helps kids learn.",
      "People work to earn money. They use the money to buy what their families need.",
      "Some workers make goods. Goods are things you can touch and use, like bread, shoes and apples. Some workers give services. A service is work one person does for another, like cutting hair or fixing a car.",
      "Every job needs skills. A baker must know how to mix and bake. A doctor goes to school for many years.",
      "Everyone helps the community, not just the workers. Kids help when they pick up litter, are kind to neighbors and do their chores.",
    ].join("\n\n"),
    keyIdeas: [
      "Community helpers, like firefighters, doctors and farmers, have jobs that help us all.",
      "Goods are things you can touch. Services are work someone does for you.",
      "People work to earn money, and everyone, even kids, can help the community.",
    ],
    hook: {
      text: "Who brings the mail? 📬 Who puts out a fire? 🚒 Who grows the apples you eat? 🍎 Today, we meet the helpers in our town!",
    },
    teach: [
      {
        title: "Community Helpers",
        teach:
          "A community is where people live, work and play. 🏘️ Community helpers have jobs that help us all. A firefighter puts out fires. 🚒 A doctor helps sick people get well. 🩺 A mail carrier brings letters. 📬 A farmer grows our food. 🚜 A police officer keeps us safe. 👮 A teacher helps kids learn. 🍎 We thank them for their hard work!",
        visual: {
          type: "hotspots",
          title: "Helpers in our town",
          center: "Our town",
          spots: [
            { label: "Firefighter", icon: "🚒", detail: "Puts out fires and rescues people." },
            { label: "Doctor", icon: "🩺", detail: "Helps sick and hurt people get well." },
            { label: "Mail carrier", icon: "📬", detail: "Brings letters and packages to homes." },
            { label: "Farmer", icon: "🚜", detail: "Grows food like corn, wheat and apples." },
            { label: "Police officer", icon: "👮", detail: "Keeps people safe and helps them follow the law." },
            { label: "Teacher", icon: "🍎", detail: "Helps kids learn to read, write and count." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each helper to the job they do.",
          pairs: [
            { left: "🚒 Firefighter", right: "Puts out fires" },
            { left: "🩺 Doctor", right: "Helps sick people" },
            { left: "📬 Mail carrier", right: "Brings letters" },
            { left: "🚜 Farmer", right: "Grows food" },
          ],
          hint: "Look at the picture. A fire truck goes with fires. A tractor goes with farms.",
          seconds: 35,
        },
        think: {
          q: "Who helps sick people get well?",
          choices: ["A mail carrier", "A farmer", "A doctor"],
          answer: 2,
          why: "Doctors help sick and hurt people get well.",
          hints: [
            "A mail carrier brings letters, not medicine.",
            "A farmer grows food. Food helps us grow, but a farmer is not the one who treats sick people.",
            "",
          ],
        },
        approaches: {
          analogy: "A town is like a team. 🏈 Each player has a job. When everyone does their job, the whole team wins.",
          example: "A fire starts in a kitchen. 🔥 Someone calls for help. The firefighters race over in their truck. They spray water and put the fire out. 🚒",
          simpler: {
            q: "Who drives a big red truck to put out fires?",
            choices: ["A firefighter", "A teacher"],
            answer: 0,
            why: "Firefighters ride the fire truck and put out fires.",
            hints: ["", "A teacher helps kids learn. Who sprays water on fires?"],
          },
        },
      },
      {
        title: "Goods and Services",
        teach:
          "Some workers make goods. Goods are things you can touch. 🍞 Bread, shoes and apples are goods. Some workers give services. A service is work someone does for you. ✂️ A barber cuts your hair. 🔧 A mechanic fixes your car. Here is a trick. Can you hold it in your hands? Then it is a good!",
        visual: {
          type: "compare",
          left: { title: "🍞 Goods", points: ["Things you can touch", "Bread", "Shoes", "Apples"] },
          right: { title: "✂️ Services", points: ["Work someone does for you", "Cutting hair", "Fixing a car", "Teaching a class"] },
        },
        probe: {
          type: "sort",
          prompt: "Is it a good or a service? Sort each one.",
          buckets: ["🍞 Good (you can touch it)", "✂️ Service (work for you)"],
          items: [
            { text: "🍞 Bread", bucket: 0 },
            { text: "👟 Shoes", bucket: 0 },
            { text: "🍎 Apples", bucket: 0 },
            { text: "🧸 Teddy bear", bucket: 0 },
            { text: "✂️ A haircut", bucket: 1 },
            { text: "🔧 Fixing a car", bucket: 1 },
            { text: "🩺 A checkup at the doctor", bucket: 1 },
          ],
          hint: "Use the trick: can you hold it in your hands? Then it is a good.",
          mistakes: [{ match: "Haircut sorted as a good", coach: "You can't put a haircut in a bag. It is work the barber does for you, so it is a service." }],
          seconds: 40,
        },
        think: {
          q: "Which one is a service?",
          choices: ["A loaf of bread", "A haircut", "A pair of shoes"],
          answer: 1,
          why: "A haircut is work a barber does for you, so it is a service.",
          hints: ["You can hold bread in your hands. That makes it a good.", "", "You can hold shoes in your hands. That makes them goods."],
        },
        approaches: {
          analogy: "Goods are like toys in a toy box: you can pick them up. Services are like a friend pushing your swing: it is help, not a thing.",
          example: "At the store, Dad buys apples. 🍎 Those are goods. Then he gets the car washed. 🚿🚗 That is a service.",
          simpler: {
            q: "Can you hold an apple in your hand?",
            choices: ["Yes, so it is a good", "No, so it is a service"],
            answer: 0,
            why: "You can hold an apple, so it is a good.",
            hints: ["", "Picture an apple in your hand. You can hold it! Things you can hold are goods."],
          },
        },
      },
      {
        title: "Working and Helping",
        teach:
          "People work to earn money. 💵 They use it to buy what their families need. Every job needs skills. A baker must know how to mix and bake. 🧁 A doctor goes to school for many years. Kids are helpers too! 🙋 You help when you pick up litter. You help when you are kind to a neighbor. A town works best when everyone helps.",
        visual: {
          type: "flip",
          cards: [
            { front: "💵 Earn", back: "To get money for the work you do." },
            { front: "🧁 Skill", back: "Something you know how to do well, like baking." },
            { front: "🏘️ Community", back: "A place where people live, work and play together." },
            { front: "🙋 Helper", back: "Anyone who does something good for others. That means you too!" },
          ],
        },
        probe: {
          type: "cloze",
          text: "People work to earn {0}. A baker needs the {1} to mix and bake. Kids help the town when they pick up {2}.",
          blanks: [{ answers: ["money"] }, { answers: ["skills", "skill"] }, { answers: ["litter", "trash"] }],
          bank: ["money", "skills", "litter", "clouds", "naps"],
          hint: "Workers get paid. Bakers know how to bake. Kids can clean up trash.",
          mistakes: [{ match: "clouds", coach: "Clouds float in the sky. What do kids pick up to keep a park clean?" }],
          seconds: 35,
        },
        think: {
          q: "Why do people work at jobs?",
          choices: ["To earn money for what their families need", "Because they are bored", "To get out of chores"],
          answer: 0,
          why: "People work to earn money, and they use it to buy what their families need.",
          hints: [
            "",
            "Some people like their jobs a lot, but the main reason is to earn money for their family.",
            "Grown-ups still do chores at home! They work to earn money.",
          ],
        },
        approaches: {
          analogy: "Earning money is like filling a bucket. 🪣 Each day of work adds a little. Then the family uses it for food and a home.",
          example: "Mr. Lee bakes bread all morning. People buy his bread. 🍞 He earns money. He uses it to buy shoes for his kids. 👟",
          simpler: {
            q: "What does a worker get for doing a job?",
            choices: ["Money", "A nap"],
            answer: 0,
            why: "Workers earn money for their work.",
            hints: ["", "A nap is nice, but workers are paid something for their work. What is it?"],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Many helpers make your bread! Put the steps in order.",
      steps: [
        "🌾 A farmer grows wheat",
        "⚙️ A miller grinds the wheat into flour",
        "👨‍🍳 A baker bakes the bread",
        "🏪 A store sells the bread",
        "🥪 Your family eats it!",
      ],
    },
    explain: {
      prompt: "Tell what a good is and what a service is. Give one example of each.",
      keyPoints: [
        "A good is a thing you can touch",
        "An example of a good, like bread or shoes",
        "A service is work someone does for you",
        "An example of a service, like a haircut or fixing a car",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each helper to the tool they use.",
        pairs: [
          { left: "🚒 Firefighter", right: "🧯 Hose and water" },
          { left: "🩺 Doctor", right: "💊 Medicine" },
          { left: "🚜 Farmer", right: "🌱 Seeds" },
          { left: "🍎 Teacher", right: "📚 Books" },
        ],
        hint: "Think about what each helper needs to do the job.",
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "Good or service?",
        buckets: ["🍞 Good", "✂️ Service"],
        items: [
          { text: "🧢 A hat", bucket: 0 },
          { text: "🥕 Carrots", bucket: 0 },
          { text: "📬 Bringing the mail", bucket: 1 },
          { text: "🦷 Cleaning your teeth at the dentist", bucket: 1 },
        ],
        hint: "Can you hold it in your hands? Then it is a good.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Mia buys 2 apples 🍎🍎 and 1 loaf of bread 🍞. How many goods did she buy?",
        answer: 3,
        hint: "Count every thing she can hold: the apples and the bread.",
        mistakes: [{ match: "2", coach: "Don't forget the bread! Count the apples and the bread." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "A {0} grows food. A {1} brings the mail.",
        blanks: [{ answers: ["farmer"] }, { answers: ["mail carrier"] }],
        bank: ["farmer", "mail carrier", "baker", "dentist"],
        hint: "Who drives a tractor? Who brings letters to your box?",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What is a community?",
        choices: ["Only one house", "A place where people live, work and play together", "A kind of food"],
        answer: 1,
        why: "A community is a place, like a town, where people live, work and play together.",
      },
      {
        q: "Which of these is a good?",
        choices: ["A haircut", "Fixing a car", "A pair of shoes"],
        answer: 2,
        why: "You can hold shoes in your hands, so they are a good.",
      },
      {
        q: "Who grows food for us?",
        choices: ["A farmer", "A firefighter", "A mail carrier"],
        answer: 0,
        why: "Farmers grow food like wheat, corn and apples.",
      },
      {
        q: "How can a kid help the community?",
        choices: ["Drop trash on the sidewalk", "Pick up litter in the park", "Cut in line"],
        answer: 1,
        why: "Picking up litter keeps shared places clean for everyone.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Go on a helper hunt with a grown-up! On a walk or a drive, spot 3 community helpers at work. Draw one of them. Then say thank you to a helper, or make a thank-you card.",
      rubric: [
        "Finds 3 community helpers",
        "Tells what job each one does",
        "Draws one helper at work",
        "Thanks a helper in person or with a card",
      ],
    },
  },

  // 3. Map basics
  {
    id: "soc-1.maps",
    title: "Map Keys and Directions",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.1.5", "SS.1.6", "D2.Geo.1.K-2", "D2.Geo.2.K-2", "D2.Geo.3.K-2"],
    read: [
      "A map is a drawing of a place, as if you were a bird looking down. Maps help us find our way.",
      "Maps use symbols. A symbol is a small picture that stands for something real. A tiny tree can stand for a park. A blue line can stand for a river.",
      "The map key tells what each symbol means. It is a box on the side of the map. Always check the key first!",
      "There are four main directions: north, south, east and west. We call them cardinal directions. A compass rose shows them on a map. On most maps, north points up and south points down. East is to the right, and west is to the left.",
      "A globe is a round model of the whole Earth. Blue on a map or globe means water. You can even draw a map of your own room!",
    ].join("\n\n"),
    keyIdeas: [
      "A map is a drawing of a place seen from above.",
      "Symbols stand for real things, and the map key tells what they mean.",
      "The four cardinal directions are north, south, east and west. On most maps, north is up.",
    ],
    hook: {
      text: "Ranger Clark loves maps! 🗺️ A map is like a bird's view of a place. 🦅 With a map, you can find your way. Let's learn to read one!",
    },
    teach: [
      {
        title: "A Bird's-Eye View",
        teach:
          "A map is a drawing of a place. It shows the place from above. 🦅 Pretend you are a bird. You fly high over your house. You see the roof, the yard and the street. That is what a map shows! Maps can show a room, a town or the whole world. 🌎 A globe is a round model of Earth. Blue means water. 💧",
        visual: {
          type: "flip",
          cards: [
            { front: "🗺️ Map", back: "A flat drawing of a place, seen from above." },
            { front: "🌐 Globe", back: "A round model of the whole Earth." },
            { front: "🦅 Bird's-eye view", back: "Looking straight down from high above." },
            { front: "💧 Blue", back: "On maps and globes, blue means water." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each word to what it means.",
          pairs: [
            { left: "🗺️ Map", right: "A flat drawing of a place" },
            { left: "🌐 Globe", right: "A round model of Earth" },
            { left: "💧 Blue", right: "Water" },
            { left: "🦅 Bird's-eye view", right: "Looking down from above" },
          ],
          hint: "A globe is round like a ball. A map is flat like paper.",
          seconds: 35,
        },
        think: {
          q: "What is a globe?",
          choices: ["A flat drawing of a room", "A round model of Earth", "A kind of bird"],
          answer: 1,
          why: "A globe is round, like Earth, and shows the whole world.",
          hints: ["That sounds like a map. A globe is shaped differently.", "", "The bird helps us imagine looking down. A globe is a model of Earth."],
        },
        approaches: {
          analogy: "A map is like a photo taken from a helicopter. 🚁 You see the tops of things: roofs, trees and roads.",
          example: "Look down at a toy town on the floor. You see the tops of the little houses and the roads between them. Draw that, and you made a map!",
          simpler: {
            q: "Is a globe round or flat?",
            choices: ["Round", "Flat"],
            answer: 0,
            why: "A globe is round, just like Earth.",
            hints: ["", "Maps are flat. A globe is shaped like a ball."],
          },
        },
      },
      {
        title: "Symbols and the Map Key",
        teach:
          "Maps use symbols. A symbol is a small picture. It stands for something real. 🌳 A tree can mean a park. 🏫 A little school means a school. A blue line can mean a river. How do we know? We look at the map key! 🔑 The map key is a box on the map. It tells what each symbol means.",
        visual: {
          type: "hotspots",
          title: "A map key",
          center: "Map key",
          spots: [
            { label: "Park", icon: "🌳", detail: "A tree symbol stands for a park." },
            { label: "School", icon: "🏫", detail: "A little school stands for a school." },
            { label: "House", icon: "🏠", detail: "A little house stands for a home." },
            { label: "River", icon: "〰️", detail: "A wavy blue line stands for a river." },
            { label: "Store", icon: "🏪", detail: "A little shop stands for a store." },
          ],
        },
        probe: {
          type: "cloze",
          text: "On the map key, 🌳 means {0}. 🏫 means {1}. A blue line means a {2}.",
          blanks: [{ answers: ["park"] }, { answers: ["school"] }, { answers: ["river"] }],
          bank: ["park", "school", "river", "pizza", "cloud"],
          hint: "Each symbol looks like the real thing. A tree for a park, water for a river.",
          mistakes: [{ match: "pizza", coach: "No pizza on this map! Look at each symbol. What does it look like?" }],
          seconds: 30,
        },
        think: {
          q: "What does the map key tell you?",
          choices: ["How far away the moon is", "What each symbol means", "What time it is"],
          answer: 1,
          why: "The map key is a box that tells what each symbol on the map stands for.",
          hints: ["Maps of towns don't show the moon. The key helps you read the little pictures.", "", "A clock tells time. The key helps you read the map's pictures."],
        },
        approaches: {
          analogy: "A map key is like a secret code card. 🔑 It tells you what each little picture means.",
          example: "You see a 🌳 on the map. You check the key. It says 🌳 = park. Now you know where to play!",
          simpler: {
            q: "A tiny tree on a map can stand for a...",
            choices: ["Park", "Swimming pool"],
            answer: 0,
            why: "Parks have trees, so a tree symbol often stands for a park.",
            hints: ["", "A pool would look like blue water. A tree looks like a park."],
          },
        },
      },
      {
        title: "North, South, East, West",
        teach:
          "There are four main directions. They are north, south, east and west. 🧭 We call them cardinal directions. A compass rose shows them on a map. On most maps, north points up. ⬆️ South points down. ⬇️ East is to the right. ➡️ West is to the left. ⬅️ Here is a rhyme to help: Never Eat Soggy Waffles! 🧇",
        visual: {
          type: "hotspots",
          title: "The compass rose",
          center: "🧭",
          spots: [
            { label: "North", icon: "⬆️", detail: "Up on most maps. N is for Never." },
            { label: "East", icon: "➡️", detail: "To the right. E is for Eat." },
            { label: "South", icon: "⬇️", detail: "Down on most maps. S is for Soggy." },
            { label: "West", icon: "⬅️", detail: "To the left. W is for Waffles." },
          ],
        },
        probe: {
          type: "match",
          prompt: "On most maps, which way does each arrow point? Match them.",
          pairs: [
            { left: "⬆️", right: "North" },
            { left: "⬇️", right: "South" },
            { left: "➡️", right: "East" },
            { left: "⬅️", right: "West" },
          ],
          hint: "North is up and south is down. East is right and west is left.",
          seconds: 30,
        },
        think: {
          q: "On most maps, which way is north?",
          choices: ["Down", "Left", "Up"],
          answer: 2,
          why: "On most maps, north points up, toward the top.",
          hints: ["Down is south on most maps.", "Left is west on most maps.", ""],
        },
        approaches: {
          analogy: "The compass rose is like a clock with four big numbers. Start at the top with north and go around: north, east, south, west.",
          example: "Your house is in the middle of the map. The park is above it. So the park is north of your house! ⬆️🌳",
          simpler: {
            q: "How many cardinal directions are there?",
            choices: ["Four", "Ten"],
            answer: 0,
            why: "There are four: north, south, east and west.",
            hints: ["", "Count them: north, south, east, west. That's not ten!"],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the sentences that are TRUE about maps.",
      sentences: [
        "The map key tells what the symbols mean.",
        "On most maps, north points up.",
        "A symbol is a long story.",
        "West is on the right side of a map.",
        "A globe is a round model of Earth.",
      ],
      correct: [0, 1, 4],
    },
    explain: {
      prompt: "Tell a friend how to read a map. What is a map key? What are the four directions?",
      keyPoints: [
        "A map shows a place from above",
        "Symbols are small pictures that stand for real things",
        "The map key tells what the symbols mean",
        "The four directions are north, south, east and west",
      ],
    },
    mastery: [
      {
        type: "build",
        prompt: "Build the compass rose. Start at the top and go around to the right: Never Eat Soggy Waffles!",
        tiles: ["North", "East", "South", "West"],
        distractors: ["Middle"],
        hint: "Never = North, Eat = East, Soggy = South, Waffles = West.",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "The box that tells what map symbols mean is the map {0}. A round model of Earth is a {1}.",
        blanks: [{ answers: ["key"] }, { answers: ["globe"] }],
        bank: ["key", "globe", "door", "ball"],
        hint: "It unlocks the meaning of the symbols. And Earth's round model starts with g.",
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Up or down on most maps?",
        buckets: ["⬆️ Up", "⬇️ Down"],
        items: [
          { text: "North", bucket: 0 },
          { text: "South", bucket: 1 },
        ],
        hint: "North is at the top of most maps.",
        seconds: 15,
      },
      {
        type: "number",
        prompt: "Pip walks 2 blocks north. ⬆️⬆️ Then Pip walks 3 more blocks north. ⬆️⬆️⬆️ How many blocks north did Pip walk in all?",
        answer: 5,
        hint: "Count all the up arrows.",
        mistakes: [{ match: "3", coach: "That's just the second part. Add the first 2 blocks too!" }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What does a map key tell you?",
        choices: ["What the symbols mean", "Where to buy a map", "How old the map is"],
        answer: 0,
        why: "The map key explains what each symbol on the map stands for.",
      },
      {
        q: "Which is NOT a cardinal direction?",
        choices: ["North", "West", "Middle"],
        answer: 2,
        why: "The four cardinal directions are north, south, east and west. Middle is not one.",
      },
      {
        q: "On most maps, east is...",
        choices: ["Up", "To the right", "Down"],
        answer: 1,
        why: "On most maps, east is to the right and west is to the left.",
      },
      {
        q: "What does blue usually mean on a map?",
        choices: ["Roads", "Water", "Houses"],
        answer: 1,
        why: "Blue on maps and globes stands for water, like rivers, lakes and oceans.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a grown-up, draw a map of your bedroom from a bird's-eye view. Add a map key with at least 3 symbols, like a bed, a door and a window. Draw a compass rose too!",
      rubric: [
        "Draws the room as seen from above",
        "Makes a map key with at least 3 symbols",
        "Uses the symbols on the map",
        "Adds a compass rose with N, S, E and W",
      ],
    },
  },

  // 4. Being a good citizen
  {
    id: "soc-1.citizen",
    title: "Being a Good Citizen",
    minutes: 15,
    stage: "logic",
    standards: ["SS.1.7", "SS.1.8", "D2.Civ.1.K-2", "D2.Civ.3.K-2", "D2.Civ.7.K-2", "D2.Civ.8.K-2", "D2.Civ.12.K-2"],
    read: [
      "A citizen is a member of a community or a country. You are a citizen of your town and of the United States.",
      "Good citizens follow rules. Rules keep us safe and help things be fair. At home, you may need to wash your hands before dinner. At school, you raise your hand to talk. Rules for a whole town or country are called laws. A speed limit is a law that keeps drivers safe.",
      "Leaders help make and keep the rules. Parents lead a home. A principal leads a school. A mayor leads a town. The president leads our country. Good leaders are fair and honest.",
      "Good citizens tell the truth. They take turns and share. They help others. They take care of shared places, like parks and libraries. When you pick up litter, you are being a good citizen!",
    ].join("\n\n"),
    keyIdeas: [
      "Rules keep us safe and help things be fair. Rules for a town or country are called laws.",
      "Leaders like parents, principals, mayors and the president help make and keep rules.",
      "Good citizens tell the truth, take turns, help others and care for shared places.",
    ],
    hook: {
      text: "What if a soccer game had no rules? ⚽ Everyone would grab the ball! It would not be fair or fun. Rules help us all.",
    },
    teach: [
      {
        title: "Why We Have Rules",
        teach:
          "Rules tell us what to do. They keep us safe. 🦺 They help things be fair. ⚖️ At home, you wash your hands before dinner. At school, you raise your hand to talk. ✋ In a library, you use a quiet voice. 🤫 Rules for a whole town or country are called laws. A speed limit is a law. It keeps drivers safe. 🚗",
        visual: {
          type: "compare",
          left: { title: "🏠 Rules at home", points: ["Wash your hands before dinner", "Put your toys away", "Be kind to your family"] },
          right: { title: "🏫 Rules at school", points: ["Raise your hand to talk", "Walk in the hallway", "Take turns on the slide"] },
        },
        probe: {
          type: "match",
          prompt: "Match each rule to the reason we have it.",
          pairs: [
            { left: "🚦 Stop at a red light", right: "Keeps us safe from cars" },
            { left: "✋ Raise your hand", right: "Everyone gets a turn to talk" },
            { left: "🤫 Quiet voice in the library", right: "People can read in peace" },
            { left: "🧼 Wash your hands", right: "Keeps germs away" },
          ],
          hint: "Ask: what would go wrong without this rule?",
          seconds: 40,
        },
        think: {
          q: "Why do we have rules?",
          choices: ["To keep us safe and be fair", "To make everyone grumpy", "So nobody can have fun"],
          answer: 0,
          why: "Rules keep people safe and help things be fair for everyone.",
          hints: [
            "",
            "Good rules actually help us get along, so we are less grumpy.",
            "Rules make games MORE fun, because everyone plays fair.",
          ],
        },
        approaches: {
          analogy: "Rules are like the lines on a road. 🛣️ They show everyone where to go, so nobody bumps into each other.",
          example: "At recess, the rule is to take turns on the slide. Everyone waits. Everyone gets a turn. No one gets pushed. That is safe and fair!",
          simpler: {
            q: "Does stopping at a red light keep people safe?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Stopping at a red light keeps cars from crashing into each other.",
            hints: ["", "Think about what could happen if cars never stopped at red lights."],
          },
        },
      },
      {
        title: "Leaders",
        teach:
          "Leaders help make rules and keep them. Parents lead a home. 🏠 A principal leads a school. 🏫 A mayor leads a town. 🏛️ The president leads our whole country. 🇺🇸 A good leader is fair. A good leader is honest. We show respect when we listen to our leaders and follow fair rules.",
        visual: {
          type: "hotspots",
          title: "Who leads?",
          center: "Leaders",
          spots: [
            { label: "Parents", icon: "🏠", detail: "Parents lead the home and make family rules." },
            { label: "Principal", icon: "🏫", detail: "The principal leads the school." },
            { label: "Coach", icon: "⚽", detail: "A coach leads a team." },
            { label: "Mayor", icon: "🏛️", detail: "The mayor leads a town or city." },
            { label: "President", icon: "🇺🇸", detail: "The president leads the whole United States." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Who leads each place? Match them.",
          pairs: [
            { left: "🏠 A home", right: "Parents" },
            { left: "🏫 A school", right: "Principal" },
            { left: "🏙️ A town", right: "Mayor" },
            { left: "🇺🇸 Our country", right: "President" },
          ],
          hint: "Start small: a home, then a school, then a town, then the whole country.",
          seconds: 35,
        },
        think: {
          q: "Who leads a town?",
          choices: ["A principal", "A mayor", "A coach"],
          answer: 1,
          why: "A mayor is the leader of a town or city.",
          hints: ["A principal leads a school, not a whole town.", "", "A coach leads a team, not a town."],
        },
        approaches: {
          analogy: "Leaders are like the captain of a ship. ⛵ The captain helps everyone work together and stay safe.",
          example: "The mayor sees that a park needs new swings. She works with the town to fix them. That is a leader helping the community!",
          simpler: {
            q: "Who leads a school?",
            choices: ["A principal", "A farmer"],
            answer: 0,
            why: "The principal leads the school.",
            hints: ["", "A farmer grows food. Who is in charge at school?"],
          },
        },
      },
      {
        title: "Good Citizen Habits",
        teach:
          "A citizen is a member of a community. You are a citizen! 🙋 Good citizens tell the truth. They take turns and share. They help people in need. 🤝 They care for shared places, like parks. 🌳 When you pick up litter, you help everyone. 🗑️ Good citizens do the right thing, even when no one is watching.",
        visual: {
          type: "flip",
          cards: [
            { front: "🗣️ Honest", back: "You tell the truth, even when it is hard." },
            { front: "⚖️ Fair", back: "You take turns and share." },
            { front: "🤝 Helpful", back: "You help people who need it." },
            { front: "🗑️ Responsible", back: "You take care of things and clean up." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is it a good citizen choice? Sort each one.",
          buckets: ["👍 Good citizen", "👎 Not a good choice"],
          items: [
            { text: "🗑️ Pick up litter", bucket: 0 },
            { text: "🤝 Share the swing", bucket: 0 },
            { text: "🗣️ Tell the truth", bucket: 0 },
            { text: "🚶 Wait your turn in line", bucket: 0 },
            { text: "🍬 Drop a wrapper on the ground", bucket: 1 },
            { text: "😠 Cut in line", bucket: 1 },
          ],
          hint: "Ask: is it honest, fair, helpful and careful? Then it is a good citizen choice.",
          seconds: 35,
        },
        think: {
          q: "Which one is a good citizen choice?",
          choices: ["Cutting in line", "Telling a fib", "Helping a friend who fell down"],
          answer: 2,
          why: "Helping someone in need is what good citizens do.",
          hints: ["Cutting in line is not fair to the people waiting.", "A fib is not the truth. Good citizens are honest.", ""],
        },
        approaches: {
          analogy: "Being a good citizen is like being a good teammate. 🏀 You play fair, help others and do your part.",
          example: "Noah sees a candy wrapper at the park. No one is looking. He picks it up and throws it away anyway. 🗑️ That's a good citizen!",
          simpler: {
            q: "Is telling the truth a good citizen habit?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Good citizens are honest and tell the truth.",
            hints: ["", "Think again. Can people trust you if you don't tell the truth?"],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the kids who made good citizen choices.",
      sentences: [
        "Sam found a lost mitten and gave it to the teacher.",
        "Ava took two cookies when the rule was one.",
        "Leo held the door for his neighbor.",
        "Max yelled in the library.",
        "Mia told the truth about the broken cup.",
      ],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Why do we have rules? Tell one thing a good citizen does.",
      keyPoints: [
        "Rules keep us safe",
        "Rules help things be fair",
        "Leaders help make and keep rules",
        "Good citizens tell the truth, take turns or help others",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Rules for a whole town or country are called {0}. A {1} leads a town.",
        blanks: [{ answers: ["laws"] }, { answers: ["mayor"] }],
        bank: ["laws", "mayor", "games", "farmer"],
        hint: "Big rules for everyone have a special name. The town leader starts with m.",
        seconds: 25,
      },
      {
        type: "build",
        prompt: "Build the sentence: Good citizens tell the truth.",
        tiles: ["Good", "citizens", "tell", "the", "truth."],
        distractors: ["fibs"],
        hint: "Start with Good. End with truth.",
        seconds: 25,
      },
      {
        type: "sort",
        prompt: "Safe or not safe?",
        buckets: ["✅ Safe", "⚠️ Not safe"],
        items: [
          { text: "🚦 Stop at a red light", bucket: 0 },
          { text: "🚶 Walk in the hallway", bucket: 0 },
          { text: "🏃 Run across a busy street", bucket: 1 },
          { text: "🪑 Stand on a wobbly chair", bucket: 1 },
        ],
        hint: "Safety rules protect us. Which choices could get someone hurt?",
        seconds: 25,
      },
      {
        type: "match",
        prompt: "Match each leader to where they lead.",
        pairs: [
          { left: "Principal", right: "🏫 School" },
          { left: "Mayor", right: "🏙️ Town" },
          { left: "President", right: "🇺🇸 Country" },
        ],
        hint: "The president leads the biggest place of all.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What are rules for a whole country called?",
        choices: ["Games", "Laws", "Songs"],
        answer: 1,
        why: "Rules for a town, state or country are called laws.",
      },
      {
        q: "Who leads our whole country?",
        choices: ["The president", "The principal", "The mail carrier"],
        answer: 0,
        why: "The president is the leader of the United States.",
      },
      {
        q: "Which is a good citizen choice?",
        choices: ["Taking more than your share", "Yelling in the library", "Taking turns on the slide"],
        answer: 2,
        why: "Taking turns is fair, and good citizens are fair.",
      },
      {
        q: "Why do we raise our hands at school?",
        choices: ["So everyone gets a fair turn to talk", "To stretch", "To wave at friends"],
        answer: 0,
        why: "Raising hands lets everyone take turns talking, which is fair.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With your family, write or draw 3 family rules. Tell why each rule matters: is it to stay safe, to be fair, or to be kind? Then do one helpful thing for your family or a neighbor this week.",
      rubric: [
        "Makes 3 family rules with a grown-up",
        "Tells why each rule matters",
        "Does one helpful thing for someone",
        "Tells a parent what they did",
      ],
    },
  },

  // 5. American symbols
  {
    id: "soc-1.symbols",
    title: "American Symbols",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.1.9", "D2.Civ.7.K-2"],
    read: [
      "A symbol is a picture or a thing that stands for an idea. Our country, the United States of America, has many symbols.",
      "The American flag is red, white and blue. It has 50 stars, one for each state. It has 13 stripes, for the first 13 colonies. People call the flag the Stars and Stripes.",
      "The bald eagle is our national bird. It is big and strong, and it flies high. It stands for freedom and strength.",
      "The Liberty Bell is a big old bell in Philadelphia. It has a long crack. Liberty means freedom, so the bell is a symbol of freedom.",
      "When we say the Pledge of Allegiance, we face the flag. We put our right hand over our heart. We promise to be loyal to our country.",
      "Symbols help us remember what our country stands for.",
    ].join("\n\n"),
    keyIdeas: [
      "The flag has 50 stars for the 50 states and 13 stripes for the first 13 colonies.",
      "The bald eagle is our national bird, and the Liberty Bell stands for freedom.",
      "We say the Pledge of Allegiance facing the flag with our right hand over our heart.",
    ],
    hook: {
      text: "Look up! A flag waves in the wind. 🇺🇸 A great eagle soars in the sky. 🦅 What do they have in common? They are symbols of our country!",
    },
    teach: [
      {
        title: "The American Flag",
        teach:
          "A symbol stands for something. Our flag is a symbol of the United States. 🇺🇸 It is red, white and blue. It has 50 stars. ⭐ There is one star for each of our 50 states. It has 13 stripes. The stripes stand for the first 13 colonies. Long ago, those colonies became our first states. People call the flag the Stars and Stripes!",
        visual: {
          type: "hotspots",
          title: "The American flag",
          center: "🇺🇸",
          spots: [
            { label: "Stars", icon: "⭐", detail: "50 white stars, one for each state." },
            { label: "Stripes", icon: "〰️", detail: "13 red and white stripes, for the first 13 colonies." },
            { label: "Colors", icon: "🎨", detail: "Red, white and blue." },
            { label: "Nickname", icon: "🏷️", detail: "People call it the Stars and Stripes." },
          ],
        },
        probe: {
          type: "number",
          prompt: "How many stars are on the American flag? ⭐",
          answer: 50,
          hint: "There is one star for each state. We have 50 states.",
          mistakes: [{ match: "13", coach: "13 is the number of stripes! Count the stars: one for each of the 50 states." }],
          seconds: 15,
        },
        think: {
          q: "What do the 13 stripes on the flag stand for?",
          choices: ["The 50 states", "The first 13 colonies", "13 presidents"],
          answer: 1,
          why: "The 13 stripes stand for the first 13 colonies, which became the first states.",
          hints: ["The stars stand for the 50 states. The stripes stand for something older.", "", "The stripes are not about presidents. Think about the very first colonies."],
        },
        approaches: {
          analogy: "The flag is like a team jersey for our whole country. 👕 When you see it, you know which team it is.",
          example: "Count the flag at school. 50 stars, one for each state. 13 stripes, one for each first colony. ⭐ x 50, 〰️ x 13.",
          simpler: {
            q: "What colors are on the American flag?",
            choices: ["Red, white and blue", "Green and yellow"],
            answer: 0,
            why: "The American flag is red, white and blue.",
            hints: ["", "Picture the flag at school. It has no green or yellow."],
          },
        },
      },
      {
        title: "The Bald Eagle and the Liberty Bell",
        teach:
          "The bald eagle is our national bird. 🦅 It is big and strong. It flies high in the sky. It stands for freedom and strength. The Liberty Bell is a big old bell. 🔔 It is in the city of Philadelphia. It has a long crack. Liberty means freedom. So the bell is a symbol of freedom too!",
        visual: {
          type: "compare",
          left: { title: "🦅 Bald eagle", points: ["Our national bird", "Big, strong and flies high", "Stands for freedom and strength"] },
          right: { title: "🔔 Liberty Bell", points: ["A big old bell", "In Philadelphia, with a long crack", "Stands for freedom"] },
        },
        probe: {
          type: "match",
          prompt: "Match each symbol to what it is.",
          pairs: [
            { left: "🦅 Bald eagle", right: "Our national bird" },
            { left: "🔔 Liberty Bell", right: "A cracked bell in Philadelphia" },
            { left: "🇺🇸 Flag", right: "The Stars and Stripes" },
          ],
          hint: "The bird goes with the bird. The bell goes with the crack.",
          seconds: 30,
        },
        think: {
          q: "What does the word liberty mean?",
          choices: ["Freedom", "A bell", "A bird"],
          answer: 0,
          why: "Liberty means freedom. That is why the Liberty Bell stands for freedom.",
          hints: ["", "The bell is named after liberty, but liberty is the idea, not the bell.", "The bald eagle is a bird. Liberty is an idea."],
        },
        approaches: {
          analogy: "A symbol is like a picture on a sign. 🚻 You don't need words. The picture tells you the idea.",
          example: "You see a bald eagle on a coin or a stamp. It reminds you of our country and of freedom. 🦅",
          simpler: {
            q: "What is our national bird?",
            choices: ["The bald eagle", "The duck"],
            answer: 0,
            why: "The bald eagle is the national bird of the United States.",
            hints: ["", "Ducks are fun, but our national bird is big, strong and flies very high."],
          },
        },
      },
      {
        title: "The Pledge of Allegiance",
        teach:
          "The Pledge of Allegiance is a promise. 🤚 We promise to be loyal to our country. Loyal means you stick with it. To say the Pledge, we stand up tall. We face the flag. 🇺🇸 We put our right hand over our heart. ❤️ Then we say the words together. It shows respect for our country.",
        visual: {
          type: "flip",
          cards: [
            { front: "🤚 Pledge", back: "A promise." },
            { front: "🤝 Allegiance", back: "Being loyal: sticking with someone." },
            { front: "❤️ Right hand", back: "We put it over our heart." },
            { front: "🇺🇸 Face the flag", back: "We look at the flag while we say the Pledge." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the steps for saying the Pledge in order.",
          steps: ["🧍 Stand up tall", "🇺🇸 Face the flag", "✋ Put your right hand over your heart", "🗣️ Say the Pledge"],
          hint: "First stand, then face the flag, then hand on heart, then say the words.",
          seconds: 25,
        },
        think: {
          q: "Where do you put your right hand during the Pledge?",
          choices: ["On your head", "In your pocket", "Over your heart"],
          answer: 2,
          why: "We put our right hand over our heart to show respect.",
          hints: ["Not on your head. Think of where you feel your heartbeat.", "Hands stay out of pockets for the Pledge. Where does your hand go?", ""],
        },
        approaches: {
          analogy: "The Pledge is like a team cheer. 📣 Everyone says it together to show they care about the team.",
          example: "At the start of the day, the class stands up. They face the flag. Each kid puts a right hand over the heart. Then they say the Pledge together.",
          simpler: {
            q: "Is the Pledge of Allegiance a promise?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "A pledge is a promise to be loyal to our country.",
            hints: ["", "The word pledge means promise. Try again!"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which symbol is it? Sort each clue.",
      buckets: ["🇺🇸 Flag", "🦅 Bald eagle", "🔔 Liberty Bell"],
      items: [
        { text: "⭐ Has 50 stars", bucket: 0 },
        { text: "〰️ Has 13 stripes", bucket: 0 },
        { text: "🪶 Our national bird", bucket: 1 },
        { text: "☁️ Flies high and strong", bucket: 1 },
        { text: "⚡ Has a long crack", bucket: 2 },
        { text: "🏙️ Is in Philadelphia", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pick one American symbol. Tell what it looks like and what it stands for.",
      keyPoints: [
        "The flag has 50 stars for the states and 13 stripes for the colonies",
        "The bald eagle is our national bird",
        "The Liberty Bell stands for freedom",
        "Symbols stand for ideas about our country",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "The flag has {0} stars and {1} stripes.",
        blanks: [{ answers: ["50"] }, { answers: ["13"] }],
        bank: ["50", "13", "100", "7"],
        hint: "One star for each state. One stripe for each first colony.",
        mistakes: [{ match: "100", coach: "Too many! There is one star for each of the 50 states." }],
        seconds: 25,
      },
      {
        type: "number",
        prompt: "How many stripes are on the American flag? 〰️",
        answer: 13,
        hint: "One stripe for each of the first colonies.",
        mistakes: [{ match: "50", coach: "50 is the number of stars. The stripes are for the first 13 colonies." }],
        seconds: 15,
      },
      {
        type: "build",
        prompt: "Build the sentence: The bald eagle is our national bird.",
        tiles: ["The", "bald", "eagle", "is", "our", "national", "bird."],
        distractors: ["bell"],
        hint: "Start with The. End with bird.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each symbol to its clue.",
        pairs: [
          { left: "🔔 Liberty Bell", right: "Has a long crack" },
          { left: "🦅 Bald eagle", right: "Flies high and strong" },
          { left: "🇺🇸 Flag", right: "Red, white and blue" },
        ],
        hint: "A bell can crack. A bird can fly.",
        seconds: 25,
      },
    ],
    check: [
      {
        q: "What does each star on the flag stand for?",
        choices: ["A state", "A president", "A holiday"],
        answer: 0,
        why: "There are 50 stars, one for each of the 50 states.",
      },
      {
        q: "What is our national bird?",
        choices: ["The robin", "The bald eagle", "The owl"],
        answer: 1,
        why: "The bald eagle is the national bird of the United States.",
      },
      {
        q: "Where is the Liberty Bell?",
        choices: ["In Philadelphia", "On the moon", "In the ocean"],
        answer: 0,
        why: "The Liberty Bell is in the city of Philadelphia.",
      },
      {
        q: "What do we do during the Pledge of Allegiance?",
        choices: ["Sit and talk", "Run around", "Face the flag with our right hand over our heart"],
        answer: 2,
        why: "We stand, face the flag and put our right hand over our heart.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make your own American flag with paper and crayons. Count 13 stripes, red and white. Add a blue box with stars. Then show it to your family and tell what the stars and stripes stand for.",
      rubric: [
        "Draws 13 red and white stripes",
        "Adds a blue box with stars",
        "Tells that the stars stand for the 50 states",
        "Tells that the stripes stand for the first 13 colonies",
      ],
    },
  },

  // 6. Landmarks and holidays
  {
    id: "soc-1.landmarks",
    title: "Landmarks and Holidays",
    minutes: 20,
    stage: "rhetoric",
    standards: ["SS.1.10", "SS.1.11", "D2.His.1.K-2", "D2.His.3.K-2", "D2.Geo.2.K-2"],
    read: [
      "A landmark is a famous place or building that is easy to know.",
      "The Statue of Liberty stands in New York Harbor. It was a gift from France. The statue holds a torch high. For many years, it welcomed people coming to America by ship.",
      "Mount Rushmore is in South Dakota. Four giant faces of presidents are carved into the mountain. They are George Washington, Thomas Jefferson, Theodore Roosevelt and Abraham Lincoln.",
      "The White House is in Washington, D.C., our capital city. It is where the president lives and works.",
      "Holidays help us remember. On Independence Day, July 4, we celebrate our country's birthday. Our country began in 1776. On Thanksgiving, in November, we give thanks for what we have. On Memorial Day, we remember soldiers who died for our country. On Veterans Day, we thank everyone who served in the military. Presidents' Day honors leaders like George Washington.",
    ].join("\n\n"),
    keyIdeas: [
      "The Statue of Liberty, Mount Rushmore and the White House are famous American landmarks.",
      "Independence Day, on July 4, is our country's birthday. It began in 1776.",
      "Holidays help us give thanks and remember people who served our country.",
    ],
    hook: {
      text: "Pack your bags, explorer! 🎒 We are taking a trip across America. 🇺🇸 We will see giant faces in a mountain. And we will find out why we have fireworks! 🎆",
    },
    teach: [
      {
        title: "Famous Landmarks",
        teach:
          "A landmark is a famous place. 📍 The Statue of Liberty stands in New York Harbor. 🗽 It was a gift from France. She holds a torch up high. For many years, she welcomed people coming to America by ship. 🚢 The White House is in our capital city. 🏛️ The president lives and works there.",
        visual: {
          type: "timeline",
          events: [
            { year: 1776, label: "Our country is born", detail: "The Declaration of Independence is signed. July 4 becomes our country's birthday." },
            { year: 1800, label: "The White House gets its first family", detail: "President John Adams moves into the new White House." },
            { year: 1886, label: "The Statue of Liberty opens", detail: "The statue, a gift from France, is finished in New York Harbor." },
            { year: 1941, label: "Mount Rushmore is finished", detail: "Workers finish carving four presidents' faces in South Dakota." },
          ],
        },
        probe: {
          type: "cloze",
          text: "The Statue of Liberty was a gift from {0}. The {1} lives and works in the White House.",
          blanks: [{ answers: ["France"] }, { answers: ["president"] }],
          bank: ["France", "president", "Texas", "farmer"],
          hint: "The statue came from another country across the ocean. The leader of our country lives in the White House.",
          mistakes: [{ match: "farmer", coach: "Farmers live on farms. Who leads our country from the White House?" }],
          seconds: 30,
        },
        think: {
          q: "What does the Statue of Liberty hold up high?",
          choices: ["A flag", "A torch", "A bell"],
          answer: 1,
          why: "The Statue of Liberty holds a torch up high.",
          hints: ["Many people wave flags, but the statue holds something with a flame.", "", "The bell is the Liberty Bell in Philadelphia. The statue holds something else."],
        },
        approaches: {
          analogy: "A landmark is like a big sign that says: you are here! When you see it, you know just where you are.",
          example: "A ship sails into New York long ago. The people on board look up. They see the Statue of Liberty with her torch. 🗽 They know they have reached America!",
          simpler: {
            q: "Who lives in the White House?",
            choices: ["The president", "A farmer"],
            answer: 0,
            why: "The president lives and works in the White House.",
            hints: ["", "The White House is home to the leader of our whole country."],
          },
        },
      },
      {
        title: "Mount Rushmore",
        teach:
          "Mount Rushmore is in South Dakota. ⛰️ Workers carved four giant faces into the rock. They are four great presidents. George Washington was our first president. Thomas Jefferson wrote the Declaration of Independence. 📜 Abraham Lincoln kept our country together. Theodore Roosevelt saved land for parks and forests. 🌲 Each face is as tall as a six-story building!",
        visual: {
          type: "flip",
          cards: [
            { front: "George Washington", back: "Our very first president." },
            { front: "Thomas Jefferson", back: "Wrote the Declaration of Independence." },
            { front: "Theodore Roosevelt", back: "Saved land for parks and forests." },
            { front: "Abraham Lincoln", back: "Kept our country together." },
          ],
        },
        probe: {
          type: "number",
          prompt: "How many presidents' faces are carved on Mount Rushmore? ⛰️",
          answer: 4,
          hint: "Washington, Jefferson, Roosevelt and Lincoln. Count them!",
          mistakes: [{ match: "3", coach: "Count again: Washington, Jefferson, Roosevelt and Lincoln." }],
          seconds: 15,
        },
        think: {
          q: "Who was our first president?",
          choices: ["Abraham Lincoln", "Theodore Roosevelt", "George Washington"],
          answer: 2,
          why: "George Washington was the first president of the United States.",
          hints: ["Lincoln came many years later. He kept our country together.", "Roosevelt came later too. He saved land for parks.", ""],
        },
        approaches: {
          analogy: "Mount Rushmore is like a giant thank-you card carved in stone. 🪨 It honors four great presidents.",
          example: "Stand at the bottom of Mount Rushmore and look up. Washington's face is first. Then Jefferson, Roosevelt and Lincoln. Four faces! 1, 2, 3, 4.",
          simpler: {
            q: "Mount Rushmore has faces of...",
            choices: ["Presidents", "Animals"],
            answer: 0,
            why: "Mount Rushmore has the faces of four presidents.",
            hints: ["", "There are no animals carved there. The faces are of great leaders."],
          },
        },
      },
      {
        title: "Holidays to Remember",
        teach:
          "Holidays help us remember. 🎉 On July 4, we celebrate Independence Day. 🎆 It is our country's birthday. It began in 1776! On Thanksgiving, in November, we give thanks. 🦃 On Memorial Day, we remember soldiers who died for our country. On Veterans Day, we thank everyone who served. 🎖️ Presidents' Day honors leaders like George Washington.",
        visual: {
          type: "flip",
          cards: [
            { front: "🎆 Independence Day", back: "July 4: our country's birthday, from 1776." },
            { front: "🦃 Thanksgiving", back: "In November: a day to give thanks." },
            { front: "💐 Memorial Day", back: "In May: we remember soldiers who died for our country." },
            { front: "🎖️ Veterans Day", back: "November 11: we thank everyone who served in the military." },
            { front: "🎩 Presidents' Day", back: "In February: we honor presidents like George Washington." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each holiday to what we do.",
          pairs: [
            { left: "🎆 Independence Day", right: "Celebrate our country's birthday" },
            { left: "🦃 Thanksgiving", right: "Give thanks" },
            { left: "💐 Memorial Day", right: "Remember soldiers who died" },
            { left: "🎖️ Veterans Day", right: "Thank all who served" },
          ],
          hint: "Fireworks go with a birthday. Turkey goes with giving thanks.",
          seconds: 40,
        },
        think: {
          q: "Which holiday is our country's birthday?",
          choices: ["Thanksgiving", "Independence Day", "Veterans Day"],
          answer: 1,
          why: "Independence Day, July 4, is our country's birthday. It began in 1776.",
          hints: ["Thanksgiving is for giving thanks.", "", "Veterans Day is for thanking people who served."],
        },
        approaches: {
          analogy: "A holiday is like a birthday for an idea. 🎂 Once a year, we stop and remember something important.",
          example: "On July 4, a family goes to a parade. 🇺🇸 At night, they watch fireworks. 🎆 They are celebrating America's birthday!",
          simpler: {
            q: "On what date is Independence Day?",
            choices: ["July 4", "December 25"],
            answer: 0,
            why: "Independence Day is on July 4.",
            hints: ["", "December 25 is a different holiday. Our country's birthday is in the summer."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the holidays in order through the year, starting in winter.",
      steps: [
        "🎩 Presidents' Day (February)",
        "💐 Memorial Day (May)",
        "🎆 Independence Day (July)",
        "🎖️ Veterans Day (November 11)",
        "🦃 Thanksgiving (late November)",
      ],
    },
    explain: {
      prompt: "Pick one landmark and one holiday. Tell what each one is and why it matters.",
      keyPoints: [
        "The Statue of Liberty was a gift from France and welcomed people",
        "Mount Rushmore has four presidents' faces",
        "The White House is where the president lives and works",
        "Independence Day on July 4 is our country's birthday",
        "Holidays help us remember and give thanks",
      ],
    },
    mastery: [
      {
        type: "sort",
        prompt: "Landmark or holiday? Sort each one.",
        buckets: ["📍 Landmark", "🎉 Holiday"],
        items: [
          { text: "🗽 Statue of Liberty", bucket: 0 },
          { text: "⛰️ Mount Rushmore", bucket: 0 },
          { text: "🏛️ White House", bucket: 0 },
          { text: "🎆 Independence Day", bucket: 1 },
          { text: "🦃 Thanksgiving", bucket: 1 },
          { text: "🎖️ Veterans Day", bucket: 1 },
        ],
        hint: "A landmark is a place you can visit. A holiday is a special day on the calendar.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Independence Day is on July what? Type the number. 🎆",
        answer: 4,
        hint: "We call it the Fourth of July!",
        seconds: 15,
      },
      {
        type: "place",
        prompt: "Put each event on the timeline.",
        min: 1750,
        max: 1950,
        step: 10,
        tolerance: 10,
        items: [
          { label: "🎆 Our country is born", value: 1776 },
          { label: "🗽 Statue of Liberty opens", value: 1886 },
          { label: "⛰️ Mount Rushmore is finished", value: 1941 },
        ],
        hint: "Our country came first, in 1776. Mount Rushmore was finished last, in 1941.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Mount Rushmore is in South {0}. The White House is in our {1} city.",
        blanks: [{ answers: ["Dakota"] }, { answers: ["capital"] }],
        bank: ["Dakota", "capital", "Carolina", "farm"],
        hint: "Mount Rushmore's state starts with South. The city where our leaders work is called the capital.",
        mistakes: [{ match: "Carolina", coach: "There is a South Carolina, but Mount Rushmore is in South Dakota." }],
        seconds: 25,
      },
    ],
    check: [
      {
        q: "Which landmark was a gift from France?",
        choices: ["Mount Rushmore", "The White House", "The Statue of Liberty"],
        answer: 2,
        why: "France gave the Statue of Liberty to the United States.",
      },
      {
        q: "Who lives and works in the White House?",
        choices: ["The mayor", "The president", "A teacher"],
        answer: 1,
        why: "The White House is the home and office of the president.",
      },
      {
        q: "What do we celebrate on July 4?",
        choices: ["Our country's birthday", "Thanksgiving", "The first day of school"],
        answer: 0,
        why: "July 4 is Independence Day, our country's birthday, from 1776.",
      },
      {
        q: "On Veterans Day, we...",
        choices: ["Plant gardens", "Go back to school", "Thank everyone who served in the military"],
        answer: 2,
        why: "Veterans Day is a day to thank everyone who served in the military.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a grown-up, find New York, South Dakota and Washington, D.C. on a map of the United States. Point to each and name its landmark. Then make a thank-you card for a veteran or someone who serves our country.",
      rubric: [
        "Finds New York, South Dakota and Washington, D.C. on a map",
        "Names the landmark in each place",
        "Makes a thank-you card",
        "Tells why we thank people who served",
      ],
    },
  },
]);
